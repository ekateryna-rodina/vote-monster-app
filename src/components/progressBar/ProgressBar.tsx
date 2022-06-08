import React from "react";

const data = [...Array.from({ length: 100 }, (x, i) => i)] as const;
type ProgressBarProps = {
  progress: typeof data[number];
};

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <div className={`w-11/12 m-auto bg-black h-4 rounded-md`}>
        <div
          className="relative h-4 rounded-md bg-indigo-500"
          style={{
            width: `${progress}%`,
          }}
        >
          <span className="absolute top-1/2 left-1/2 -translate-y-1/2 text-[9px] -translate-x-1/2 font-semibold text-light">{`${progress}%`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
