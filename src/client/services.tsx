export interface UrlVars {
  [key: string]: string;
}

export interface IRespPayload {
    message: string;
    details?: unknown;
}

export function getInitLinkedInAuthRequest(): string {

    // GET https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id={your_client_id}&redirect_uri=https%3A%2F%2Fdev.example.com%2Fauth%2Flinkedin%2Fcallback&state=fooobar&scope=r_liteprofile%20r_emailaddress%20w_member_social
    const urlVars: UrlVars = {
      response_type: "code",
      client_id: "78ptrco7dxu9rj", // @TODO inject this in build step from a secret
      redirect_uri: window.origin + "/auth/linkedin",
      scope: encodeURIComponent("r_liteprofile r_emailaddress"), // @TODO request for the `r_fullprofile` scope
      // state: "someSessionAwareRandom" // @TODO add value here & check later in /auth/linkedin to prevent CSRF
    };

    let url: string = "https://www.linkedin.com/oauth/v2/authorization?";
    const keys: string[] = Object.keys(urlVars);
    for (const key of keys) {
      url += `${key}=${urlVars[key]}&`;
    }
    url = url.substr(0, url.length - 1); // trim last `&` char

    return url;
}
