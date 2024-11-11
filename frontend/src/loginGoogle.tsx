import React, { useState } from "react";
import ParticleWrapper from "./particleWrapper.tsx";
import ParticleWrapperProps from "./types/ParticleWrapperProps.ts";
import {
    CredentialResponse,
    GoogleLogin,
    GoogleOAuthProvider } from "@react-oauth/google/dist/index.js";
import { useViewTransitionState } from "react-router-dom";
import axios from "axios";


// TODO: Move this somewhere better
const GOOGLE_CLIENT_ID = "849272429801-oniuepolebt3j7o369mlh5q6fcu2mk45.apps.googleusercontent.com";
const BACKEND_URL = "http://localhost:8080/api/auth";

async function authenticate(credentials: CredentialResponse) {

}

function LoginGoogle(props: ParticleWrapperProps) {
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    return (
        <GoogleOAuthProvider
            clientId={GOOGLE_CLIENT_ID}
        >
            <ParticleWrapper fadeStateController={props.fadeStateController}>
                <div
                    className='flex flex-row h-screen w-screen justify-center items-center gap-12'
                >
                    <div className='flex flex-col'>
                        <h1 className='text-3xl text-white font-semibold italic'>PROJECT</h1>
                        <h1 className='text-6xl text-white font-bold'>Talk To Me</h1>
                    </div>

                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />;
                </div>
            </ParticleWrapper>
        </GoogleOAuthProvider>
    )
}

export default LoginGoogle;