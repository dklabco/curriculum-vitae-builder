import { Request, Response } from "restify";
import { outputView } from "../helper";

// example landing url: /auth/linkedin?code=<very_long_string>
export const authLinkedIn = (req: Request, res: Response) => outputView(req, res, "./view-templates/index.html");
