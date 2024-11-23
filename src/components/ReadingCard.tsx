import { useState, ChangeEvent } from "react";

const ReadingCard = () => {

    const [text, setText] = useState('');

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;

        // 영어 알파벳과 모든 특수문자만 허용
        const regex = /^[a-zA-Z\s\W]*$/;
        
        if (regex.test(value) && value.length <= 5000) {
            setText(value);
        }
    };

    const inputTextToArray = () => {
        const array = text.split('.').map(sentence => {
            const trimmedSentence = sentence.trim();
            return trimmedSentence ? `${trimmedSentence}.` : trimmedSentence; // 문장이 비어있지 않으면 마침표 추가
        }).filter(sentence => sentence);
        return array;
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            {/* 메인 카드 컨테이너 */}
            <div className="w-[800px] relative">
                {/* 프로그레스 바 추가 */}
                <div className="w-full h-4 bg-yellow-200 rounded-t-xl overflow-hidden">
                    <div
                        className="h-full bg-gray-500 rounded-r-xl"
                        style={{ width: '60%' }} // 진행률에 따라 조절
                    />
                </div>

                {/* 상단 노란색 카드 */}
                <div className="bg-yellow-400 rounded-b-xl px-12 py-8 mb-4">
                    <div className="flex justify-between items-center mb-6">
                        <span className="bg-yellow-200 px-3 py-1 rounded-full text-sm">1/5</span>
                        <span className="text-lg">Total Timer 0:40:00</span>
                    </div>
                    <p className="text-3xl font-medium w-full">
                        'Your brain has amazing abilities, but it did not come with an instruction manual.'
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
                                    onChange={handleTextChange}
                                    onBlur={inputTextToArray}
                                    maxLength={5000}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 오른쪽 컨트롤 버튼 영역 */}
                    <div className="flex flex-col gap-3 w-[100px]">
                        <button className="bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-md text-sm border border-gray-300">
                            START
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-md text-sm border border-gray-300">
                            PAUSE
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-md text-sm border border-gray-300">
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
                                    const value = parseInt(e.target.value);
                                    // 유효한 양의 정수가 아니거나 범위를 벗어나면 조정
                                    if (isNaN(value) || value < 1) {
                                        e.target.value = '1';
                                    } else if (value > 300) {
                                        e.target.value = '300';
                                    } else {
                                        e.target.value = value.toString();
                                    }
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