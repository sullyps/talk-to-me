import React, { PropsWithChildren } from "react";

/**
 * The state of the background particles
 */
export enum ParticalFadeState {
    FadingIn,
    FadingOut,
    Visible,
    Invisible
}

type ParticleWrapperProps = PropsWithChildren & {
    /**
     * The React state hook that controls the animation state
     * of the background particles
     */
    fadeStateController: [
        React.SetStateAction<ParticalFadeState>,
        React.Dispatch<ParticalFadeState>
    ],

    /**
     * The dynamic states used in the app that should be updated by
     * Child "useMemo"'s of the particle wrapper
     */
    // deno-lint-ignore no-explicit-any
    dynamicState?: Array<React.SetStateAction<any>>;
}

export default ParticleWrapperProps;