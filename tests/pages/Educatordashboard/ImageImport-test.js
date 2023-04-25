import { render } from "@testing-library/react";
import Home from "../pages/index";

test("Home page renders correctly", async () => {
  const { getByText } = render(<Home />);

  expect(getByText(/hello, world!/i)).toBeInTheDocument();
});


test("Home page renders correctly", async () => {
  const { getByText } = render(<Home />);

  expect(getByText(/hello, world!/i)).toBeInTheDocument();
});