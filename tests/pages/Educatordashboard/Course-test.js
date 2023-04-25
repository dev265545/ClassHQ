import { createMocks } from "node-mocks-http";
import handler from "../pages/api/myApiRoute";

test("myApiRoute returns expected response", async () => {
  const { req, res } = createMocks({
    method: "GET",
    query: { id: "1" },
  });

  await handler(req, res);

  expect(res._getStatusCode()).toBe(200);
  expect(JSON.parse(res._getData())).toEqual({ id: 1, name: "John" });
});
