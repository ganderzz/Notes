import * as React from "react";
import { Slate } from "slate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NodeType } from "../../Utilities/Editor/nodeType";
import { MarkType } from "../../Utilities/Editor/markType";
import { MarkButton } from "./MarkButton";
import { NodeButton } from "./NodeButton";
import { hasBlock } from "../../Utilities/Editor/utils";

interface IProps {
  onChange: (change) => void;
  value: Slate.Value;
  style?: {};
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
          type={MarkType.Bold}
          value={value}
          onClick={this.handleMarkClick}
          title="Bold (ctrl+b)"
        >
          <FontAwesomeIcon icon="bold" />
        </MarkButton>

        <MarkButton
          type={MarkType.Italic}
          value={value}
          onClick={this.handleMarkClick}
          title="Italic (ctrl+i)"
        >
          <FontAwesomeIcon icon="italic" />
        </MarkButton>

        <NodeButton
          type={NodeType.Header}
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
