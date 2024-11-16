import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    {/* 메인 카드 컨테이너 */}
    <div className="w-[800px] relative">
      {/* 상단 노란색 카드 */}
      <div className="bg-yellow-400 rounded-xl px-8 py-6 mb-4"> {/* px-8로 수정 */}
        <div className="flex justify-between items-center mb-4">
          <span className="bg-yellow-200 px-3 py-1 rounded-full text-sm">1/5</span>
          <span className="text-lg">Total Timer 0:40:00</span>
        </div>
        <p className="text-2xl font-medium w-full">
          'Your brain has amazing abilities, but it did not come with an instruction manual.'
        </p>
      </div>

      <div className="flex gap-4">
        {/* 하단 텍스트 영역 */}
        <div className="flex-1">
          <div className="bg-white rounded-xl border-2 border-gray-300 border-dashed p-8">
            <div className="relative">
              <label className="absolute -top-3 left-4 bg-white px-2 text-sm text-gray-500">Text Box</label>
              <div className="border-2 border-gray-300 rounded-lg p-6">
                <div className="space-y-6 text-gray-700">
                  <p className="leading-relaxed">
                    'Your brain has amazing abilities, but it did not come with an instruction manual. You'll find that manual in A Mind for Numbers. Whether you're a novice or an expert, you will find great new ways to improve your skills and techniques for learning, especially related to math and science.'
                  </p>
                  <p className="leading-relaxed">
                    Henri Poincaré was a nineteenth-century mathematician who once described how he cracked a difficult mathematical problem that he had been intensively working on for weeks without success. He took a vacation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽 컨트롤 버튼 영역 */}
        <div className="flex flex-col gap-2">
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-1 rounded-md text-sm w-[70px] text-gray-700">
            START
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-1 rounded-md text-sm w-[70px] text-gray-700">
            PAUSE
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-1 rounded-md text-sm w-[70px] text-gray-700">
            RESET
          </button>
          <div className="bg-gray-100 px-4 py-1 rounded-md text-sm w-[70px] mt-2">
            <div className="text-xs text-gray-600">Speed</div>
            <div className="text-center text-gray-700">160</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
