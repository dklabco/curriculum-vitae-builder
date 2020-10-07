import { IAuthRes, UrlVars } from "shared/types";
import { buildUrlSearchParams } from "shared/utils";

export const LS_KEY_SSID: string = "_rb.ssid";

// step 1: get code (client-side)
export function getInitLinkedInAuthRequest(): string {

  // GET https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id={your_client_id}&redirect_uri=https%3A%2F%2Fdev.example.com%2Fauth%2Flinkedin%2Fcallback&state=fooobar&scope=r_liteprofile%20r_emailaddress%20w_member_social
  const urlVars: UrlVars = {
    response_type: "code",
    client_id: process.env.LINKEDIN_APP_CLIENT_ID!,
    redirect_uri: window.origin + "/auth/linkedin",
    scope: encodeURIComponent("r_liteprofile r_emailaddress"), // @TODO request for the `r_fullprofile` scope
    // state: "someSessionAwareRandom" // @TODO add value here & check later in /auth/linkedin to prevent CSRF
  };

  return "https://www.linkedin.com/oauth/v2/authorization?" + buildUrlSearchParams(urlVars);

}

// step 2: exchange code for access token, do custom auth, return final result (server-side)
export async function authLinkedInWithCode(code: string): Promise<IAuthRes> {

  const authResp: Response = await window.fetch(`/auth/linkedin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ code })
  });

  return await authResp.json();

}
