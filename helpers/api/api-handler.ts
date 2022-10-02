import { errorHandler, jwtMiddleware } from ".";

export { apiHandler };

function apiHandler(handler: {
  (
    req: { method: any; body: any },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        end: { (arg0: string): any; new (): any };
        json: {
          (arg0: any): any;
          new (): any;
        };
      };
    }
  ): any;
  (arg0: any, arg1: any): any;
}) {
  return async (
    req: any,
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: { (arg0: { message: any }): any; new (): any };
      };
    }
  ) => {
    try {
      // global middleware
      await jwtMiddleware(req, res);

      // route handler
      await handler(req, res);
    } catch (err: any) {
      // global error handler
      errorHandler(err, res);
    }
  };
}
