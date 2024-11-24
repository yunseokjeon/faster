export const secondsToHMS = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export const startTimer = (
    setTotalSeconds: React.Dispatch<React.SetStateAction<number>>,
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setIsRunning(true);
    const intervalId = setInterval(() => {
        setTotalSeconds(prev => {
            if (prev > 0) {
                return prev - 1;
            } else {
                clearInterval(intervalId); // 타이머가 0에 도달하면 정지
                setIsRunning(false);
                return 0;
            }
        });
    }, 1000);

    return intervalId;
};