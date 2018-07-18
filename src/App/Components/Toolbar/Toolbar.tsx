import * as React from "react";
import { Slate } from "slate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
  onChange: (change) => void;
  value: Slate.Value;
  style?: {};
}

export function hasMark(value: Slate.Value, type: string) {
  return value.activeMarks.some(
    (mark?: Slate.Mark) => (mark && mark.type == type) || false
  );
}

export function hasBlock(value: Slate.Value, type: string) {
  return value.blocks.some(
    (mark?: Slate.Block) => (mark && mark.type == type) || false
  );
}

function MarkButton({ children, value, type, onClick, ...rest }: any) {
  const isActive = hasMark(value, type);

  return (
    <button
      style={{
        padding: "10px 15px",
        textAlign: "center",
        background: "#FFF",
        border: 0,
        fontSize: "0.9rem",
        cursor: "pointer",
        ...(isActive ? { opacity: 1, fontWeight: 600 } : { opacity: 0.55 }),
      }}
      onClick={e => onClick(e, type)}
      {...rest}
    >
      {children}
    </button>
  );
}

function NodeButton({ children, value, type, onClick, ...rest }: any) {
  const isActive = hasBlock(value, type);

  return (
    <button
      style={{
        padding: "10px 15px",
        textAlign: "center",
        background: "#FFF",
        border: 0,
        fontSize: "0.9rem",
        cursor: "pointer",
        ...(isActive ? { opacity: 1, fontWeight: 600 } : { opacity: 0.55 }),
      }}
      onClick={e => onClick(e, type)}
      {...rest}
    >
      {children}
    </button>
  );
}

export class Toolbar extends React.Component<IProps> {
  private handleMarkClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    type: string
  ) => {
    event.preventDefault();

    const { value } = this.props;
    const change = value.change().toggleMark(type);

    this.props.onChange(change);
  };

  private handleNodeClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    type: string
  ) => {
    event.preventDefault();

    const { value } = this.props;
    let change = value.change();

    if (hasBlock(value, type)) {
      change = change.setBlocks("paragraph");
    } else {
      change = change.setBlocks(type);
    }

    this.props.onChange(change);
  };

  public render() {
    const { style = {}, onChange, value, ...rest } = this.props;

    return (
      <div style={{ fontSize: "1rem", ...style }} {...rest}>
        <MarkButton
          type="bold"
          value={value}
          onClick={this.handleMarkClick}
          title="Bold (ctrl+b)"
        >
          <FontAwesomeIcon icon="bold" />
        </MarkButton>

        <MarkButton
          type="italic"
          value={value}
          onClick={this.handleMarkClick}
          title="Italic (ctrl+i)"
        >
          <FontAwesomeIcon icon="italic" />
        </MarkButton>

        <MarkButton
          type="underline"
          value={value}
          onClick={this.handleMarkClick}
          title="Underline (ctrl+u)"
        >
          <FontAwesomeIcon icon="underline" />
        </MarkButton>

        <NodeButton
          type="h1"
          value={value}
          onClick={this.handleNodeClick}
          title="Header (ctrl+h)"
        >
          <FontAwesomeIcon icon="heading" />
        </NodeButton>
      </div>
    );
  }
}
