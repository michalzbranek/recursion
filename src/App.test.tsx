import { test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// Mock out the async data fetch so tests don't need a real server
vi.mock("./prepare/prepareInitialData", () => ({
  default: () => ({
    root: { parentUUID: "", data: {}, childrens: [], showChildrens: false },
  }),
}));

import dataReducer from "./redux/data";
import App from "./components/App";

const testStore = configureStore({ reducer: { data: dataReducer } });

test("renders without crashing", () => {
  render(
    <Provider store={testStore}>
      <App />
    </Provider>
  );
  expect(screen.getByRole("heading")).toBeInTheDocument();
});
