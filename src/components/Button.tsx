import React from "react";

interface ButtonProps {
  text: string;
  callback: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { callback, text } = props;

  return <button onClick={callback}>{text}</button>;
};

export { Button };
