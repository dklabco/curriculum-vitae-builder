import "jest";
import * as React from "react";
import { act, Simulate } from "react-dom/test-utils";
import { Classes } from "@blueprintjs/core";
import { render, unmountComponentAtNode } from "react-dom";
import App from "../src/client/App";

describe("App", () => {
    
    let container: HTMLDivElement | null;

    let defaultFetch: any = window.fetch;
    let mockFetch = jest.fn((entry) => Promise.resolve({
        json: () => Promise.resolve({ message: `Yay`, details: { foo: "bar" } })
    }));

    beforeAll(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        act(() => {
            render(<App />, container);
        });
        window.fetch = mockFetch as any;
    });

    afterAll(() => {
        unmountComponentAtNode(container!);
        document.body.removeChild(container!);
        container = null;
        window.fetch = defaultFetch;
    });

    it("should render the dialog DOM as specified", () => {
        const dialog = document.querySelector("." + Classes.DIALOG)!;
        expect(dialog.innerHTML).toMatchSnapshot();
    });

    it("should not show any error in the beginning", () => {
        const calloutErrors = document.querySelector(".co-errors");
        expect(calloutErrors).toBeNull();
    });

});
