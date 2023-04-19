import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SessionProvider } from "next-auth/react";
import App from "../../../pages/_app";

describe("App", () => {
  it("renders the App component with SessionProvider", () => {
    const mockSession = { user: { name: "Test User" } };

    const { getByText } = render(
      <SessionProvider session={mockSession}>
        <App Component={() => <div>Test Component</div>} pageProps={{}} />
      </SessionProvider>
    );

    expect(getByText("Test Component")).toBeInTheDocument();
    expect(getByText("Test User")).toBeInTheDocument();
  });
});
