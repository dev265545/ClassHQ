import { render, fireEvent } from "@testing-library/react";
import MyForm from "../components/MyForm";

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
