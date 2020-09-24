import * as React from "react";
import { FunctionComponent } from "react";
import { useState, useEffect } from "react";
import { Classes, Dialog, AnchorButton, Intent, H5, Callout } from "@blueprintjs/core";
import { LinkedInSignIn } from "./components/LinkedInSignIn";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { TermsOfService } from "./components/TermsOfService";
import { UrlVars } from "./services";
import { getInitLinkedInAuthRequest } from "./services";

enum AppSection {
  LinkedInSignIn = "/",
  OAuthCode = "/auth/linkedin?code",
  PrivacyPolicy = "/privacy-policy",
  TermsOfService = "/terms-of-service"
}

const dialogMinWidths: { [viewName: string]: number } = {
  [AppSection.LinkedInSignIn]: 600,
  [AppSection.TermsOfService]: 900
};

const App: FunctionComponent = () => {

  // a super naive alternative to react-router
  const [viewName, setViewName] = useState<AppSection>(AppSection.LinkedInSignIn);
  useEffect((): void => {

    const url: URL = new URL(window.location.href);
    const urlVars: UrlVars = {};
    url.searchParams.forEach((val, key) => urlVars[key] = val);

    // provided by LinkedIn via its callback mechanism which lands on our /auth/linkedin route
    const oAuthCode: string = urlVars["code"];

    if (oAuthCode != null) {
      // special handling for /auth/linkedin?code=<code>
      return setViewName(AppSection.OAuthCode);
    } else {
      // all other cases e.g. `/` , `/privacy-policy` , etc.
      return setViewName(url.pathname as AppSection);
    }

  }, []); // on mounted

  const [errors, setErrors] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>("");

  // const [isSubmitting, setIsSubmitting] = useState<boolean>(false);  
  // function validateAllFields(): true | string[] {
  //     const validationIssues: string[] = [];
  //     if (someState == null) validationIssues.push("missing some state");
  //     return validationIssues.length ? validationIssues : true;
  // }

  return <div>
    <Dialog
      isOpen={true}
      title={"Resume Builder"}
      isCloseButtonShown={false}
      transitionDuration={0}
      style={{ minWidth: dialogMinWidths[viewName] }}
    >
      <div className={Classes.DIALOG_BODY}>
        <MainView viewName={viewName} />
        {feedback !== "" && <Callout style={{ marginTop: 10 }} className="co-feedback">
            <span>{feedback}</span>
        </Callout>}
        {errors.length > 0 && <Callout intent={Intent.DANGER} icon={null} style={{ marginTop: 10 }} className="co-errors">
            <ul style={{ padding: "0 0 0 20px", margin: 0 }}>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
        </Callout>}
      </div>
      <div className={Classes.DIALOG_FOOTER} style={{ textAlign: "right" }}>
          <FooterView viewName={viewName} />
      </div>
    </Dialog>
  </div>;

}

interface ViewProps { viewName: AppSection; }

const MainView: FunctionComponent<ViewProps> = ({ viewName }) => {
  
  switch (viewName) {

    case AppSection.OAuthCode:
      return <>
        <H5>You are getting there.</H5>
        <p>We are building this section. Please come back soon!</p>
      </>;

    case AppSection.PrivacyPolicy:
      return <PrivacyPolicy />;
      
    case AppSection.TermsOfService:
      return <TermsOfService />;

    case AppSection.LinkedInSignIn:
    default:
      return <LinkedInSignIn />;

  }
  
};

const FooterView: FunctionComponent<ViewProps> = ({ viewName }) => {
  switch (viewName) {
    case AppSection.LinkedInSignIn:
      // return <AnchorButton type="button" text={"Log In"} intent={Intent.PRIMARY} href={getInitLinkedInAuthRequest()} />;
      return <AnchorButton type="button" text={"Service Not Yet Available"} intent={Intent.PRIMARY} disabled />;
    default:
      return null;
  }
};

export default App;
