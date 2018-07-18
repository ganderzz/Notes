import * as React from "react";
import { render } from "react-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBold,
  faItalic,
  faUnderline,
  faHeading,
} from "@fortawesome/free-solid-svg-icons";

library.add(faBold);
library.add(faItalic);
library.add(faUnderline);
library.add(faHeading);

import App from "./App";

window.onload = () => {
  render(<App />, document.getElementById("app"));
};
