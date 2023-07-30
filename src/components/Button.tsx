import React from "react";

interface ButtonProps {
  text: string;
  callback: () => void;
  className: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { callback, className, text } = props;

  return (
    <button onClick={callback} className={className}>
      {text}
    </button>
  );
};

export { Button };
