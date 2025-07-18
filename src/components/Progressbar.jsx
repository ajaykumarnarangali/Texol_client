
function ProgressBar({ currentQn }) {
    const total = 10;
    const percentage = ((currentQn + 1) / total) * 100;

    return (
        <div className="flex items-center justify-between w-full mt-5">
            <div className="flex items-center w-full max-w-[735px]">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-2 bg-buttonColor rounded-full"
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
                <span className="ml-2 text-sm font-medium">{`${currentQn+1}/${total}`}</span>
            </div>

            <div className="ml-4 w-[82px] h-[36px] flex items-center gap-1 text-sm bg-orangeButton text-gray-800 font-medium rounded justify-center cursor-pointer">
                <i className="fa-regular fa-clock"></i>
                <span>5 Min</span>
            </div>
        </div>
    );
}

export default ProgressBar;
