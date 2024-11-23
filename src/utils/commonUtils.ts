import { inputTextToArray, getTotalWords } from "./textUtils";

export const onTextInputCompleted = (text: string,
    speed: number,
    setNeededSeconds: React.Dispatch<React.SetStateAction<number>>,
    setTotalWordsNumber: React.Dispatch<React.SetStateAction<number>>,
    setSentenceArray: React.Dispatch<React.SetStateAction<string[]>>) => {


    const sentenceArray = inputTextToArray(text);
    const totalWordsNumber = getTotalWords(text);
    const neededSeconds = Math.ceil(totalWordsNumber / speed) < 60 ? 60 : Math.ceil(totalWordsNumber / speed);

    setNeededSeconds(neededSeconds);
    setTotalWordsNumber(totalWordsNumber);
    setSentenceArray(sentenceArray);
}