import { render } from "@testing-library/react";
import { useQuery } from "react-query";
import MyPage from "../pages/myPage";

jest.mock("react-query");

test("MyPage renders correctly with mock data", async () => {
  useQuery.mockReturnValueOnce({
    data: { id: 1, name: "John" },
    isLoading: false,
    isError: false,
  });

  const { getByText } = render(<MyPage />);

  expect(getByText(/john/i)).toBeInTheDocument();
});
