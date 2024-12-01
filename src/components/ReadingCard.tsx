import { useState, useEffect } from "react";
import { handleTextChange, inputTextToArray } from "../utils/textUtils";
import { onTextInputCompleted } from "../utils/commonUtils";
import { secondsToHMS, startTimer } from "../utils/timeUtils";

const ReadingCard = () => {
    const [text, setText] = useState('');
    const [speed, setSpeed] = useState(160);
    const [sentenceArray, setSentenceArray] = useState(['']);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [totalWordsNumber, setTotalWordsNumber] = useState(0);
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [progressWidth, setProgressWidth] = useState('100%');
    const [currentSentenceTimeLeft, setCurrentSentenceTimeLeft] = useState(0);
    const [sentenceStartTime, setSentenceStartTime] = useState(0);

    const onTextChange = handleTextChange(setText);

    const handleStart = () => {
        if (isRunning || sentenceArray.length === 0) {
            return;
        }

        // 전체 시간을 문장 수로 나누어 각 문장당 시간 계산
        const timePerSentence = Math.ceil(totalSeconds / sentenceArray.length);
        setCurrentSentenceTimeLeft(timePerSentence);
        setSentenceStartTime(timePerSentence);

        // Total Timer를 위한 타이머
        const totalTimerInterval = setInterval(() => {
            setTotalSeconds(prev => {
                if (prev <= 0) {
                    clearInterval(totalTimerInterval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // 문장별 타이머 (프로그레스 바용)
        const progressInterval = setInterval(() => {
            setCurrentSentenceTimeLeft(prev => {
                if (prev <= 0) return 0;
                return prev - 1;
            });
        }, 1000);

        // 문장 변경 타이머
        const id = setInterval(() => {
            setCurrentSentenceIndex(prevIndex => {
                if (prevIndex >= sentenceArray.length - 1) {
                    clearInterval(id);
                    clearInterval(progressInterval);
                    clearInterval(totalTimerInterval);
                    setIsRunning(false);
                    return prevIndex;
                }
                // 새로운 문장으로 넘어갈 때 타이머 리셋
                setCurrentSentenceTimeLeft(timePerSentence);
                return prevIndex + 1;
            });
        }, timePerSentence * 1000);

        setIntervalId(id);
        setIsRunning(true);
    };

    const handlePause = () => {
        // 모든 활성 타이머를 중지
        const intervals = window.setInterval(() => {}, 0);
        for (let i = 0; i <= intervals; i++) {
            clearInterval(i);
        }
        setIsRunning(false);
        setIntervalId(null);
    };

    const handleReset = () => {
        // 모든 활성 타이머를 중지
        const intervals = window.setInterval(() => {}, 0);
        for (let i = 0; i <= intervals; i++) {
            clearInterval(i);
        }
        setCurrentSentenceIndex(0);
        setIsRunning(false);
        setIntervalId(null);
        setCurrentSentenceTimeLeft(0);
        setSentenceStartTime(0);
        onTextInputCompleted(text, speed, setTotalSeconds, setTotalWordsNumber, setSentenceArray);
    };

    useEffect(() => {
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [intervalId]);

    useEffect(() => {
        if (!sentenceStartTime) return;
        
        const progress = (currentSentenceTimeLeft / sentenceStartTime) * 100;
        setProgressWidth(`${progress}%`);
    }, [currentSentenceTimeLeft, sentenceStartTime]);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            {/* 메인 카드 컨테이너 */}
            <div className="w-[800px] relative">
                {/* 프로그레스 바 추가 */}
                <div className="w-full h-4 bg-yellow-200 rounded-t-xl overflow-hidden">
                    <div
                        className="h-full bg-gray-500 rounded-r-xl"
                        style={{ width: progressWidth }}
                    />
                </div>

                {/* 상단 노란색 카드 */}
                <div className="bg-yellow-400 rounded-b-xl px-12 py-8 mb-4">
                    <div className="flex justify-between items-center mb-6">
                        <span className="bg-yellow-200 px-3 py-1 rounded-full text-sm">
                            {currentSentenceIndex + 1} / {sentenceArray.length}
                        </span>
                        <span className="text-lg">Total Timer {secondsToHMS(totalSeconds)}</span>
                    </div>
                    <p className="text-3xl font-medium w-full min-h-[100px]">
                        {sentenceArray[currentSentenceIndex]}
                    </p>
                </div>

                <div className="flex gap-4">
                    {/* 하단 텍스트 영역 */}
                    <div className="flex-1">
                        <div className="bg-white rounded-xl border-2 border-gray-300 border-dashed p-8">
                            <div className="relative">
                                <label className="absolute -top-3 left-4 bg-white px-2 text-sm text-gray-500">Text Box</label>
                                <textarea
                                    className="w-full min-h-[200px] border-2 border-gray-300 rounded-lg p-6 text-gray-700 leading-relaxed resize-none focus:outline-none focus:border-yellow-400"
                                    value={text}
                                    onChange={onTextChange}
                                    onBlur={() => onTextInputCompleted(text, speed, setTotalSeconds, setTotalWordsNumber, setSentenceArray)}
                                    maxLength={500000}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 오른쪽 컨트롤 버튼 영역 */}
                    <div className="flex flex-col gap-3 w-[100px]">
                        <button className="bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-md text-sm border border-gray-300"
                            onClick={handleStart}
                        >
                            START
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-md text-sm border border-gray-300"
                            onClick={handlePause}
                        >
                            PAUSE
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-md text-sm border border-gray-300"
                            onClick={handleReset}
                        >
                            RESET
                        </button>
                        <div className="relative bg-gray-100 rounded-md border border-gray-300 px-6 py-2">
                            <span className="absolute -top-2.5 left-4 bg-gray-100 px-2 text-xs text-gray-500">
                                Speed
                            </span>
                            <input
                                type="number"
                                defaultValue={160}
                                step="1"
                                min="1"
                                max="300"
                                onKeyDown={(e) => {
                                    // 소수점(.) 입력 방지
                                    if (e.key === '.') {
                                        e.preventDefault();
                                    }
                                }}
                                onChange={(e) => {
                                    // 입력된 값을 정수로 변환
                                    let value = parseInt(e.target.value);
                                    // 유효한 양의 정수가 아니거나 범위를 벗어나면 조정
                                    if (isNaN(value) || value < 1) {
                                        e.target.value = '100';
                                    } else if (value > 500) {
                                        e.target.value = '500';
                                    } else {
                                        e.target.value = value.toString();
                                    }

                                    value = parseInt(e.target.value);
                                    setSpeed(value);
                                    onTextInputCompleted(text, value, setTotalSeconds, setTotalWordsNumber, setSentenceArray);
                                }}
                                className="w-full text-center font-medium pt-1 bg-transparent focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReadingCard;