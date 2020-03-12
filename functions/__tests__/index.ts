import { isAuthenticated, isAuthorized } from "../src/auth";
import { auth } from "firebase-admin";

jest.mock("firebase-admin", () => {
  const mock = {
    auth: jest.fn()
  };
  return mock;
});
describe("Authentication", () => {
  describe("IsAuthenticated", () => {
    test("should not pass the authentication if headers doesn't contain authorization", async () => {
      const next = jest.fn();
      const req: any = {
        headers: ""
      };
      const sendMock = jest.fn().mockResolvedValue({});
      const res: any = {
        status: jest.fn().mockImplementation(() => {
          return {
            send: sendMock
          };
        })
      };

      await isAuthenticated(req, res, next);
      expect(sendMock).toHaveBeenCalledTimes(1);
      expect(sendMock).toHaveBeenCalledWith({
        message: "user is not authenticated"
      });
      expect(auth).toHaveBeenCalledTimes(0);
    });

    test("should not pass the authentication if headers include valid token", async () => {
      const next = jest.fn();
      const req: any = {
        headers: {
          authorization: "Bearer 1234"
        }
      };
      const verifyIdTokenMock = jest.fn().mockResolvedValue({
        email: "test@test.com"
      });
      (auth as jest.Mock).mockImplementationOnce(() => {
        const mock = {
          verifyIdToken: verifyIdTokenMock
        };
        return mock;
      });
      const sendMock = jest.fn().mockResolvedValue({});
      const res: any = {
        status: jest.fn().mockImplementation(() => {
          return {
            send: sendMock
          };
        })
      };

      await isAuthenticated(req, res, next);
      expect(sendMock).toHaveBeenCalledTimes(0);
      expect(next).toHaveBeenCalledTimes(1);
      expect(auth).toHaveBeenCalledTimes(1);
      expect(verifyIdTokenMock).toHaveBeenCalledTimes(1);
      expect(verifyIdTokenMock).toHaveBeenCalledWith("1234");
    });
  });

  describe("IsAuthorized", () => {
    test("should not pass if user is basic", async () => {
      const next = jest.fn();
      const req: any = {};
      const sendMock = jest.fn().mockResolvedValue({});
      const res: any = {
        locals: {
          basic: true
        },
        status: jest.fn().mockImplementation(() => {
          return {
            send: sendMock
          };
        })
      };

      await isAuthorized({
        hasRole: ["admin"]
      })(req, res, next);
      expect(sendMock).toHaveBeenCalledTimes(1);
      expect(sendMock).toHaveBeenCalledWith({
        message: "user is not authorized"
      });
      expect(next).toHaveBeenCalledTimes(0);
    });

    test("should pass if user is admin", async () => {
      const next = jest.fn();
      const req: any = {};
      const sendMock = jest.fn().mockResolvedValue({});
      const res: any = {
        locals: {
          admin: true
        },
        status: jest.fn().mockImplementation(() => {
          return {
            send: sendMock
          };
        })
      };

      await isAuthorized({
        hasRole: ["admin"]
      })(req, res, next);
      expect(sendMock).toHaveBeenCalledTimes(0);
      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
