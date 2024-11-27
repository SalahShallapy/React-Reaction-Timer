import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const resultDialog = forwardRef(function ResultModal(
  { targetTime, remaningTime, onReset },
  ref
) {
  const dialog = useRef();

  const userLost = remaningTime <= 0;
  const formattedTimeLeft = (remaningTime / 1000).toFixed(2);
  //   const score = 1 - Math.round((remaningTime / (targetTime * 1000)) * 100);
  const score = Math.round(
    ((targetTime * 1000 - remaningTime) / (targetTime * 1000)) * 100
  );

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog className="result-modal" ref={dialog} onClose={onReset}>
      {userLost ? <h2>You Lost</h2> : <h2>Your Score {score}</h2>}
      <p>
        The Target Time was <strong>{targetTime} Seconds.</strong>
      </p>
      <p>
        You Stopped Timer With <strong>{formattedTimeLeft} seconds left</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default resultDialog;
