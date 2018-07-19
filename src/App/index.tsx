import * as React from "react";
import * as S from "slate";
import { Editor } from "slate-react";
import NoEmpty from "slate-no-empty";
import { Toolbar } from "./Components/Toolbar";
import Plain from "slate-plain-serializer";
import { INITIAL_STATE } from "./Utilities/Editor/initialState";
import { NodeType } from "./Utilities/Editor/nodeType";
import { MarkType } from "./Utilities/Editor/markType";
import { hasBlock } from "./Utilities/Editor/utils";

const plugins = [NoEmpty("paragraph")];

interface IState {
  value: S.Slate.Value;
}

function serialize(value) {
  return serializeNode(value.document);
}

function serializeMarks(node): string {
  return node.leaves.map(p => {
    const text = p.text;

    if (!p.marks || p.marks.count() <= 0) {
      return text;
    }

    return p.marks.toArray().reduce((j, t) => getMarkMarkdown(t.type, j), text);
  }).join("");
}

function getMarkMarkdown(type: MarkType, text: string): string {
  switch (type) {
    case MarkType.Bold:
      return `**${text}**`;

    case MarkType.Italic:
      return `*${text}*`;
  }

  return text;
}

function getBlockText(node) {
  if (node.nodes.count() > 0) {
    return node.nodes.map(serializeMarks).join("");
  }

  return node.text;
}

/**
 * Serialize a `node` to plain text.
 *
 * @param {Node} node
 * @return {String}
 */

function serializeNode(node) {
  if (
    node.object == "document" ||
    (node.object == "block" && (S as any).Block.isBlockList(node.nodes))
  ) {
    return node.nodes.map(serializeNode).join("\n");
  }

  const text = getBlockText(node);

  if (node.type === NodeType.Header) {
    return `# ${text}`;
  }

  return text;
}

const value = (S as any).Value;

export default class App extends React.Component<{}, IState> {
  public readonly state: IState = {
    value: value.fromJSON(INITIAL_STATE),
  };

  private handleChange = ({ value }: { value: S.Slate.Value }) => {
    this.setState({ value });
  };

  private renderMark = ({ children, mark, attributes }) => {
    switch (mark.type) {
      case MarkType.Bold:
        return <strong {...attributes}>{children}</strong>;
      case MarkType.Code:
        return <code {...attributes}>{children}</code>;
      case MarkType.Italic:
        return <em {...attributes}>{children}</em>;
      case MarkType.Underline:
        return <u {...attributes}>{children}</u>;
    }
  };

  private renderNode = ({ node, children, attributes }) => {
    switch (node.type) {
      case NodeType.Header:
        return <h1 {...attributes}>{children}</h1>;
    }
  };

  private handleKeyboardDown = (event, change: S.Slate.Change) => {
    if (event.ctrlKey && event.key === "b") {
      event.preventDefault();
      return change.toggleMark(MarkType.Bold);
    }

    if (event.ctrlKey && event.key === "i") {
      event.preventDefault();
      return change.toggleMark(MarkType.Italic);
    }

    if (event.ctrlKey && event.key === "u") {
      event.preventDefault();
      return change.toggleMark(MarkType.Underline);
    }

    if (event.ctrlKey && event.key === "h") {
      event.preventDefault();

      if (hasBlock(change.value, "h1")) {
        return change.setBlocks(NodeType.Paragraph);
      }

      return change.setBlocks(NodeType.Header);
    }
  };

  public render() {
    console.log(serialize(this.state.value));
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
