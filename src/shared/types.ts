export type UrlVars = {
  [key: string]: string;
}

export interface IAuthRes {
  sessionId: string;
}

export interface IRespPayload {
  message: string;
  details?: unknown;
}
