import * as React from "react";
import * as S from "slate";
import { Editor } from "slate-react";
import NoEmpty from "slate-no-empty";
import { Toolbar } from "./Components/Toolbar";
import { hasBlock } from "./Components/Toolbar/Toolbar";

const plugins = [NoEmpty("paragraph")];

interface IState {
  value: S.Slate.Value;
}

const value = (S as any).Value;

export default class App extends React.Component<{}, IState> {
  public readonly state: IState = {
    value: value.fromJSON({
      document: {
        nodes: [
          {
            object: "block",
            type: "paragraph",
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    text: "Enter text here!",
                  },
                ],
              },
            ],
          },
        ],
      },
    }),
  };

  private handleChange = ({ value }: { value: S.Slate.Value }) => {
    this.setState({ value });
  };

  private renderMark = ({ children, mark, attributes }) => {
    switch (mark.type) {
      case "bold":
        return <strong {...attributes}>{children}</strong>;
      case "code":
        return <code {...attributes}>{children}</code>;
      case "italic":
        return <em {...attributes}>{children}</em>;
      case "underline":
        return <u {...attributes}>{children}</u>;
    }
  };

  private renderNode = ({ node, children, attributes }) => {
    switch (node.type) {
      case "h1":
        return <h1 {...attributes}>{children}</h1>;
    }
  }

  private handleKeyboardDown = (event, change: S.Slate.Change) => {
    if (event.ctrlKey && event.key === "b") {
      event.preventDefault();
      return change.toggleMark("bold");
    }

    if (event.ctrlKey && event.key === "i") {
      event.preventDefault();
      return change.toggleMark("italic");
    }

    if (event.ctrlKey && event.key === "u") {
      event.preventDefault();
      return change.toggleMark("underline");
    }

    if (event.ctrlKey && event.key === "h") {
      event.preventDefault();

      if (hasBlock(change.value, "h1")) {
        return change.setBlocks("paragraph");
      }

      return change.setBlocks("h1");
    }
  }

  public render() {
    return (
      <div
        style={{ width: "65vw", margin: "0 auto", height: 500, padding: 20 }}
      >
        <Toolbar
          onChange={this.handleChange}
          style={{ marginBottom: 20 }}
          value={this.state.value}
        />

        <Editor
          value={this.state.value}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyboardDown}
          plugins={plugins}
          renderMark={this.renderMark}
          renderNode={this.renderNode}
          style={{ height: "inherit", lineHeight: "1.6rem" }}
          autoFocus
          spellCheck
        />
      </div>
    );
  }
}
