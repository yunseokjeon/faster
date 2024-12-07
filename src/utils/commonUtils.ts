import { inputTextToArray, getTotalWords } from "./textUtils";

export const onTextInputCompleted = (text: string,
    speed: number,
    setTotalSeconds: React.Dispatch<React.SetStateAction<number>>,
    setTotalWordsNumber: React.Dispatch<React.SetStateAction<number>>,
    setSentenceArray: React.Dispatch<React.SetStateAction<string[]>>) => {

    const sentenceArray = inputTextToArray(text);
    const totalWordsNumber = getTotalWords(text);
    
    // 분당 단어 수(speed)를 기반으로 초 단위 계산
    const calculatedSeconds = Math.ceil((totalWordsNumber / speed) * 60);

    setTotalSeconds(calculatedSeconds);
    setTotalWordsNumber(totalWordsNumber);
    setSentenceArray(sentenceArray);
};