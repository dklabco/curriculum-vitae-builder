import { Request, Response } from "restify";
import fetch from "node-fetch";
import { URLSearchParams } from 'url';
import { persistSessionData } from "../services";
import { outputView } from "../helper";
import { UrlVars } from "shared/types";
import { buildUrlSearchParams } from "shared/utils";

interface ILinkedInTokenExchangeRes {
  access_token: string;
  expires_in: number; // in seconds
}

// example landing url: /auth/linkedin?code=<very_long_string>
export const authLinkedIn = (req: Request, res: Response) => outputView(req, res, "./view-templates/index.html");

// from the above landing url, the `code` is sent to this server-side route handler
export const exchangeCodeForAccessToken = async (req: Request, res: Response): Promise<void> => {

  const { code } = req.params;

  if (!code) {
    return res.json(400, { message: "`code` required" });
  }

  let sessionId: string = "";

  try {

    const urlVars: UrlVars = {
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.LINKEDIN_APP_REDIRECT_URI!,
      client_id: process.env.LINKEDIN_APP_CLIENT_ID!,
      client_secret: process.env.LINKEDIN_APP_CLIENT_SECRET!
    };

    const searchParams: URLSearchParams = new URLSearchParams(buildUrlSearchParams(urlVars));

    // https://www.linkedin.com/oauth/v2/accessToken
    // call LinkedIn API, get accessToken, store accessToken, save user obj,
    // populate & return sessionId
    const resp: ILinkedInTokenExchangeRes =
      await fetch(`https://www.linkedin.com/oauth/v2/accessToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: searchParams
      }).then(resp => resp.json());

    const { access_token: accessToken, expires_in: expiresIn } = resp;

    if (accessToken == null) {
      const errMsg = "Unexpected LinkedIn /accessToken API call";
      somnus.logger.error({ message: errMsg, details: resp });
      throw new Error(errMsg);
    }

    const accessTokenExpTS = Date.now() + expiresIn * 1000;

    // @TODO consider concatenating user's email (retrieved from LinkedIn or FE?)
    const rawSessId: string = `${Math.random() * 1000000}|${accessTokenExpTS}`;
    sessionId = Buffer.from(rawSessId).toString("base64");

    await persistSessionData({ sessionId, accessToken, accessTokenExpTS });

  } catch (e) {
    // @TODO log error
    return res.json(500, { message: e.message });
  }

  return res.json(200, { sessionId });

}
