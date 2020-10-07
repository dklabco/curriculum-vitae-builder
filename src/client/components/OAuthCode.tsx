import * as React from "react";
import { H5, Callout, Intent } from "@blueprintjs/core";
import { LS_KEY_SSID, authLinkedInWithCode } from "../services";
import { IAuthRes } from "shared/types";

export const OAuthCode: React.FunctionComponent = () => {
  
  const [error, setError] = React.useState<string>("");
  
  React.useEffect(() => {

    const url: URL = new URL(window.location.href);
    const code: string | null = url.searchParams.get("code");
    if (code) {
      authLinkedInWithCode(code)
        .then(handleSuccessApiCall)
        .then(success => {
          if (!success) {
            setError("Invalid session. Apologies for the inconvenience.");
          }
        })
        .catch(err => setError(err.message));
    } else {
      setError("Please go back to the home page and try again!");
    }

  }, []); // on mounted
  
  return <>
    {error && <Callout intent={Intent.DANGER}>{error}</Callout>}
    <p>&nbsp;</p>
    <H5>You are getting there.</H5>
    <p>We are building this section. Please come back soon!</p>
  </>;
  
};

function handleSuccessApiCall({ sessionId }: IAuthRes): boolean {
  if (sessionId) {
    window.localStorage.setItem(LS_KEY_SSID, sessionId);
    return true;
  }
  return false;
}
