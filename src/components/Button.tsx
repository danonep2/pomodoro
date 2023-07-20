import React from "react";

interface Props {
  text: string;
  callback: () => void;
  className: string;
}

function Button(props: Props): JSX.Element {
  return (
    <button onClick={props.callback} className={props.className}>
      {props.text}
    </button>
  );
}

export default Button;
