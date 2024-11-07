import { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "@tsparticles/slim";
import { loadStarsPreset } from "@tsparticles/preset-stars"
import { useLocation } from "react-router";
import ParticleWrapperProps, { ParticalFadeState } from "./types/ParticleWrapperProps";

// NOTE: This is based off a hook version of the example
// implementation at https://github.com/tsparticles/tsparticles

// NOTE: ts-ignore statements are due to mismatch of types between
// tsparticles-slim & regular tsparticles libraries
const ParticleWrapper = (props: ParticleWrapperProps) => {
  const [particlesLoaded, setParticlesLoaded] = useState(false);
  const [isDeveloperPage, setDeveloperPage] = useState(false);
  const particleScreenRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    switch (props.fadeStateController[0]) {
      case ParticalFadeState.FadingOut:
        return particleScreenRef.current?.classList.add(
          "animate__animated",
          "animate__fadeOut",
        );
    }
  }, [props.fadeStateController[0]]);

  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname === "/particlesTest") {
        console.log('setting isDeveloperPage=true');
        setDeveloperPage(true);
    }

    initParticlesEngine(async (engine) => {
        console.log("loading particles...");

        await loadSlim(engine);
        {/*@ts-ignore*/}
        await loadStarsPreset(engine, true);
        await engine.load({ id: "tsParticles" });

        setParticlesLoaded(true);
    });
  }, []);

  if (isDeveloperPage) return (
    <div className="text-white text-3xl">
        <h1>TSParticles Testing Page</h1>
        <h1>isDeveloperPage: {isDeveloperPage.toString()}</h1>
        {/*@ts-ignore*/}
        {
            particlesLoaded ?
                <Particles
                    className="h-screen w-full -z-10 absolute"
                    id="tsparticles"
                    options={{
                        preset: "stars"
                    }}
                />
                :
                <h1 className="animate-pulse">TSParticle engine loading...</h1>
        }
    </div>
  )

  return useMemo(() => (
    <div
      className="w-screen h-screen flex justify-center absolute -z-10"
    >
        {props.children}
        {
        particlesLoaded ?
        <Particles
            className="h-screen w-full -z-10 absolute animate__animated animate__fadeIn animate__slower"
            id="tsparticles"
            options={{
                preset: "stars"
            }}
        />
        :
        <div />
        }
    </div>
    // TODO: Redesign this?
    // If children have dynamic state that needs to be re-rendered,
    // do that here
  ), [particlesLoaded, (props.dynamicState ?? props.dynamicState)]);
}

export default ParticleWrapper;