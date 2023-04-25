import { render, fireEvent } from "@testing-library/react";
import MyForm from "../components/MyForm";
import MyComponent from "../components/MyComponent";

test("MyComponent renders correctly with props", () => {
  const props = {
    title: "My Title",
    items: ["Item 1", "Item 2", "Item 3"],
  };
  const { getByText } = render(<MyComponent {...props} />);

  expect(getByText(/my title/i)).toBeInTheDocument();
  expect(getByText(/item 1/i)).toBeInTheDocument();
  expect(getByText(/item 2/i)).toBeInTheDocument();
  expect(getByText(/item 3/i)).toBeInTheDocument();
});

test("MyForm submits data correctly", () => {
  const { getByLabelText, getByText } = render(<MyForm />);

  fireEvent.change(getByLabelText(/name/i), { target: { value: "John" } });
  fireEvent.change(getByLabelText(/email/i), {
    target: { value: "john@example.com" },
  });
  fireEvent.click(getByText(/submit/i));

  expect(mockSubmitFunction).toHaveBeenCalledWith({
    name: "John",
    email: "john@example.com",
  });
});
