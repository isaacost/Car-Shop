const response = (s: number, m: unknown) => ({ status: s, message: m });
const responseError = (s: number, m: unknown) => ({ status: s, message: { message: m } });

export { response, responseError };