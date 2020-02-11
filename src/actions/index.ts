export const BASIC_SETUP = "BASIC_SETUP";
export type BASIC_SETUP = typeof BASIC_SETUP;

export interface BasicSetupAction {
    type: BASIC_SETUP;
    hello: string;
}

export const basicSetupAction = (hello: string): BasicSetupAction => ({
    type: BASIC_SETUP,
    hello
});

export type BasicActions = BasicSetupAction;
