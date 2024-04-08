import { useContext, useEffect, useState } from "react";
import "./Modal.css";
import Confirmation from "./Confirmation";
import { UserContext } from "../hooks";
import ConfirmationCancel from "./ConfirmationCancel";


export const Modal = ({
  open,
  setOpen,
  days,
  selecteDay,
  times,
  setTimes,
  courtConfirmation,
  courtBooked,
  setCourtBooked
}) => {
  const [timeSelected, setTimeSelected] = useState([]);
  const [confirmation, setConfirmation] = useState(false);
  const timeIntervals = [
    "8:00 - 8:30 am",
    "8:30 - 9:00 am",
    "9:00 - 9:30 am",
    "9:30 - 10:00 am",
    "10:00 - 10:30 am",
    "10:30 - 11:00 am",
    "11:00 - 11:30 am",
    "11:30 am - 12:00 pm",
    "12:00 - 12:30 pm",
    "12:30 - 1:00 pm",
    "1:00 - 1:30 pm",
    "1:30 - 2:00 pm",
    "2:00 - 2:30 pm",
    "2:30 - 3:00 pm",
    "3:00 - 3:30 pm",
    "3:30 - 4:00 pm",
    "4:00 - 4:30 pm",
    "4:30 - 5:00 pm",
    "5:00 - 5:30 pm",
    "5:30 - 6:00 pm",
    "6:00 - 6:30 pm",
    "6:30 - 7:00 pm",
    "7:00 - 7:30 pm",
    "7:30 - 8:00 pm",
    "8:00 - 8:30 pm",
    "8:30 - 9:00 pm",
  ];
  const { userId } = useContext(UserContext);
  const [cancelTime, setCancelTime] = useState();

  const toggle = (time) => {
    console.log("Clicked");
    const booker = courtBooked[
      courtConfirmation + " -> " + days[selecteDay].dayOfMonth
    ]?.get(timeIntervals[time]);
    if (booker) {
      if (booker.userBooked === userId) {
        if (cancelTime === time) setCancelTime();
        else setCancelTime(time);
      }
      return;
    }

    const tempSet = new Set([...times]);
    if (tempSet.has(time)) {
      tempSet.delete(time);
    } else if (times.size < 3) {
      tempSet.add(time);
    }
    setTimes(tempSet);
  };

  console.log(courtConfirmation, selecteDay, courtBooked, timeIntervals);

  return (
    <div className="modal" onClick={() => setOpen(false)}>
      <div className="content-container" onClick={(e) => e.stopPropagation()}>
        <div className="times-container">
          {timeIntervals.map((timeName, index) => {
            const booker = courtBooked[
              courtConfirmation + " -> " + days[selecteDay].dayOfMonth
            ]?.get(timeName)
            return <button
              key={index}
              className={
                "time" +
                (booker
                  ? (
                    booker.userBooked === userId
                      ? " user-booked booked"
                      : " booked"
                  )
                  : times.has(index)
                    ? " selected"
                    : ""
                )
              }
              onClick={() => toggle(index)}
            // disabled={courtBooked[
            //   courtConfirmation + " -> " + days[selecteDay].dayOfMonth
            // ]?.has(timeName)}
            >
              {timeName}
            </button>
          })}
        </div>
        <div className="price">
          <div className="total"></div>

          <button
            disabled={times.size === 0}
            className={confirmation ? "cancel" : "book"}
            onClick={() => setConfirmation(!confirmation)}
            type="button"
          >
            {confirmation ? "Cancel" : "Book"}
          </button>
        </div>
        {confirmation && (
          <Confirmation
            time={timeSelected}
            courtNumber={selecteDay}
            setConfirmation={setConfirmation}
            days={days}
            selecteDay={selecteDay}
            timeIntervals={timeIntervals}
            times={times}
            courtConfirmation={courtConfirmation}
            setTimes={setTimes}
          />
        )}
        {!isNaN(cancelTime) ? (
          <ConfirmationCancel
            courtBooked={courtBooked}
            cancelTime={cancelTime}
            setCancelTime={setCancelTime}
            courtNumber={selecteDay}
            setConfirmation={setConfirmation}
            days={days}
            selecteDay={selecteDay}
            timeIntervals={timeIntervals}
            times={times}
            courtConfirmation={courtConfirmation}
            setTimes={setTimes}
            setCourtBooked={setCourtBooked}
          />
        ) : <></>}
      </div>
    </div>
  );
};

