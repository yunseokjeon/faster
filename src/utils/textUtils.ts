import { ChangeEvent } from "react";

export const handleTextChange = (setText: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    // 영어 알파벳, 숫자 및 모든 특수문자만 허용
    const regex = /^[a-zA-Z0-9\s\W]*$/;

    if (regex.test(value) && value.length <= 500000) {
        setText(value);
    }
};

export const inputTextToArray = (text: string): string[] => {
    // 문장의 끝을 기준으로 분리 (마침표, 물음표, 느낌표)
    const sentences = text.split(/([.!?]+)/)
        .reduce((acc: string[], current: string, index: number, array: string[]) => {
            // 마지막 요소가 아니고, 다음 요소가 구두점인 경우
            if (index % 2 === 0 && index < array.length - 1) {
                // 현재 문장과 구두점을 합쳐서 배열에 추가
                acc.push(current + array[index + 1]);
            }
            return acc;
        }, [])
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 0); // 빈 문장 제거

    return sentences;
};

export const getTotalWords = (text: string) => {
    let wordCount = 0;

    text.split('.').map(sentence => {
        sentence.split(' ').map(word => {
            if (word.length > 0) {
                wordCount++;
            }
        });
    });

    return wordCount;
}