import { useState, useCallback, useRef, useEffect } from "react";
import { parseISO, isBefore, isAfter, isEqual } from "date-fns";
import { LotStatus } from "../types";

export const useConfigureCounter = ({ start, end }: { start: any; end: any }) => {
  const [status, setStatus] = useState<LotStatus | undefined>();

  const timerNow = useRef(new Date());

  const [countdownHeader, setCountdownHeader] = useState<string>("");
  const [countdownDate, setCountdownDate] = useState<any>();
  const [countdownKey, setCountdownKey] = useState<LotStatus>();

  const configureCounter = useCallback(() => {
    timerNow.current = new Date();

    const parsedNow = parseISO(timerNow?.current?.toISOString());
    const parsedStart = parseISO(start?.toISOString());
    const parsedEnd = parseISO(end?.toISOString());

    switch (true) {
      case isBefore(parsedNow, parsedStart):
        setCountdownDate(start?.toISOString());
        setCountdownHeader("Starting in");
        setStatus(LotStatus.AWAITING);
        setCountdownKey(LotStatus.AWAITING);
        break;
      case isAfter(parsedNow, parsedStart) && isBefore(parsedNow, parsedEnd):
        setCountdownDate(end?.toISOString());
        setCountdownHeader("Closing in");
        setStatus(LotStatus.STARTED);
        setCountdownKey(LotStatus.STARTED);
        break;
      case isEqual(parsedNow, parsedEnd) || isAfter(parsedNow, parsedEnd):
        setCountdownDate(end?.toISOString());
        setCountdownHeader("Completed");
        setStatus(LotStatus.COMPLETED);
        setCountdownKey(LotStatus.COMPLETED);
        break;
    }
  }, [end, start]);

  useEffect(() => {
    configureCounter();

    const interval = setInterval(() => {
      configureCounter();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [configureCounter]);

  return {
    countdownDate,
    countdownHeader,
    countdownKey,
    status,
    start,
    end,
  };
};
