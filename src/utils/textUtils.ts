import { ChangeEvent } from "react";

export const handleTextChange = (setText: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    // 영어 알파벳과 모든 특수문자만 허용
    const regex = /^[a-zA-Z\s\W]*$/;

    if (regex.test(value) && value.length <= 5000) {
        setText(value);
    }
};

export const inputTextToArray = (text: string) => {
    const array = text.split('.').map(sentence => {
        const trimmedSentence = sentence.trim();
        return trimmedSentence ? `${trimmedSentence}.` : trimmedSentence; // 문장이 비어있지 않으면 마침표 추가
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