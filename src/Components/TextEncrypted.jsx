import React, { useState, useEffect } from 'react';


const chars = "-_~`!@#$%^&*()+=[]{}|;:,.<>?";

const TextEncrypted = ({ text, interval = 50 }) => {
  const [outputText, setOutputText] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let timer;

    if (outputText !== text) {
      timer = setInterval(() => {
        if (outputText.length < text.length) {
          setOutputText((prev) => prev + text[prev.length]);
        } else {
          clearInterval(timer);
        }
      }, interval);
    }

    return () => clearInterval(timer);
  }, [text, interval, outputText]);

  const remainder =
    outputText.length < text.length
      ? text
          .slice(outputText.length)
          .split("")
          .map(() => chars[Math.floor(Math.random() * chars.length)])
          .join("")
      : "";

  if (!isMounted) {
    return <span> </span>;
  }

  return (
    <span className="text-white text-lg flex justify-center font-bold pb-10 ">
      {outputText}
      {remainder}
    </span>
  );
};

export default TextEncrypted;