import { ChangeEvent } from "react";

export const handleTextChange = (setText: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    // 영어 알파벳, 숫자 및 모든 특수문자만 허용
    const regex = /^[a-zA-Z0-9\s\W]*$/;

    if (regex.test(value) && value.length <= 500000) {
        setText(value);
    }
};

export const inputTextToArray = (text: string) => {
    const array = text.split(/(?<=[.?!])\s*/).map(sentence => { // 정규 표현식으로 문장 구분 기호 기준으로 쪼갬
        const trimmedSentence = sentence.trim();
        return trimmedSentence ? trimmedSentence : trimmedSentence; // 문장이 비어있지 않으면 그대로 반환
    }).filter(sentence => sentence);
    return array;
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