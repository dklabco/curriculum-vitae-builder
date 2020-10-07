import { Request, Response } from "restify";
import somnus, { ISomnus } from "somnus";
import { outputView } from "./helper";
import { authLinkedIn, exchangeCodeForAccessToken } from "./route-handlers/authlinkedin";

declare global {
  var somnus: ISomnus;
}
globalThis.somnus = somnus; // so that we can use e.g. `somnus.logger` everywhere

async function main(): Promise<void> {

    process.chdir(__dirname);

    somnus.server.use(somnus.restify.plugins.bodyParser());

    somnus.start({
        routeConfig: {

            "get  /": (req: Request, res: Response) => outputView(req, res, "./view-templates/index.html"),
            "get  /privacy-policy": (req: Request, res: Response) => outputView(req, res, "./view-templates/index.html"),
            "get  /terms-of-service": (req: Request, res: Response) => outputView(req, res, "./view-templates/index.html"),
            
            "get  /auth/linkedin": authLinkedIn, // the page redirected to from LinkedIn auth platform
            "post /auth/linkedin": exchangeCodeForAccessToken,

            // just during dev, for prod, a reverse proxy is better
            "get  /js/*": somnus.restify.plugins.serveStatic({ directory: "../public/" }),
            "get  /css/*": somnus.restify.plugins.serveStatic({ directory: "../public/" })

        }
    }, (addr) => {
        somnus.logger.info({ app_message: `server listening on port ${addr.port}`});

        // just so it's extra clear where to access the app
        console.log(`app accessible at http://localhost:${addr.port}`);

    });

}

somnus.logger.info({ app_message: `starting up...`});
main();
