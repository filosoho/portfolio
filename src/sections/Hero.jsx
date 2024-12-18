import React, { useState, useEffect, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
const HeroImage = React.lazy(() => import("../components/HeroImage"));
import CanvasLoader from "../components/CanvasLoader";
import { calculateSizes } from "../constants/calculateSizesData.js";
import { useMediaQuery } from "react-responsive";
import HeroCamera from "../components/HeroCamera";
import Button from "../components/Button";
import BtnShowMatrix from "../components/BtnShowMatrix.jsx";
import BtnPlayStop from "../components/BtnPlayStop.jsx";
import Matrix from "../components/Matrix";
import MatrixControls from "../components/MatrixControls";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { CSSPlugin } from "gsap/CSSPlugin";
import ErrorBoundary from "../components/ErrorBoundary";
import "../styles.css";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, CSSPlugin);

const Hero = () => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [text, setText] = useState("");
  const fullText = "Hi, I'm Anna";
  const [isTyping, setIsTyping] = useState(true);
  const typingSpeed = 150;
  const delayBetweenLoops = 1300;

  const [fontSizeMin, setFontSizeMin] = useState(12);
  const [fontSizeMax, setFontSizeMax] = useState(16);
  const [speed, setSpeed] = useState(250);
  const [colorSet, setColorSet] = useState("default");
  const [analogousColors, setAnalogousColors] = useState([]);
  const [hueColors, setHueColors] = useState([]);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [heroImageVisible, setHeroImageVisible] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [displayMode, setDisplayMode] = useState("words");
  const [columnSpacing, setColumnSpacing] = useState(20);
  const [columnSpacing2, setColumnSpacing2] = useState(40);
  const [charLimit, setCharLimit] = useState(100);
  const [animationState, setAnimationState] = useState("play");

  const cameraRef = useRef();
  const controlsRef = useRef();
  const floatingRef = useRef();
  const heroImageRef = useRef();

  const isSmall = useMediaQuery({ query: "(max-width: 480px)" });
  const isMedium = useMediaQuery({ query: "(max-width: 640px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "( min-width: 768px) and (max-width: 1024px)",
  });

  const isDesktop = useMediaQuery({ query: "(min-width: 1200px)" });

  const sizes = calculateSizes(isSmall, isMedium, isMobile, isTablet);

  useEffect(() => {
    if (isMedium) {
      setFontSizeMin(6);
      setFontSizeMax(10);
    } else {
      setFontSizeMin(12);
      setFontSizeMax(16);
    }
  }, [isMedium]);

  const handleButtonClick = () => {
    setIsButtonClicked(true);
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleHeroImageClick = () => {
    setControlsVisible(true);
  };

  const handleClickOutside = (event) => {
    if (
      controlsVisible &&
      controlsRef.current &&
      !controlsRef.current.contains(event.target)
    ) {
      setControlsVisible(false);
    }
  };

  useEffect(() => {
    let timeout;
    if (isTyping) {
      timeout = setTimeout(() => {
        setText((prev) => {
          const nextText = fullText.slice(0, prev.length + 1);
          if (nextText === fullText) {
            setIsTyping(false);
          }
          return nextText;
        });
      }, typingSpeed);
    } else {
      timeout = setTimeout(() => {
        setText("");
        setIsTyping(true);
      }, delayBetweenLoops);
    }

    return () => clearTimeout(timeout);
  }, [text, isTyping]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [controlsVisible]);

  const handleAnalogousColorsChange = (newColors) => {
    setAnalogousColors(newColors);
  };

  const handleHueColorsChange = (newColors) => {
    setHueColors(newColors);
  };

  useEffect(() => {
    if (!isSmall && heroImageRef.current) {
      gsap.to(heroImageRef.current.position, {
        y: isSmall
          ? controlsVisible
            ? 3.5
            : 5
          : isMedium
          ? controlsVisible
            ? 1
            : 3
          : isMobile
          ? controlsVisible
            ? -2
            : 0
          : isTablet
          ? controlsVisible
            ? -4
            : -2
          : controlsVisible
          ? -4
          : -2,
        duration: 0.5,
        ease: "power1.inOut",
      });
    }

    if (controlsRef.current) {
      gsap.fromTo(
        controlsRef.current,
        {
          y: controlsVisible ? 0 : 0,
          ease: "power1.inOut",
        },

        {
          y: controlsVisible ? -18 : 0,
          opacity: controlsVisible ? 1 : 0,
          duration: 0.5,
          ease: "power1.inOut",
        }
      );
    }
  }, [controlsVisible, isMobile, isMedium, isMobile, isTablet]);

  useEffect(() => {
    if (isDesktop && floatingRef.current) {
      gsap.to(floatingRef.current, {
        y: "-10px",
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        duration: 1.5,
      });
    }
  }, [controlsVisible, isDesktop]);

  useEffect(() => {
    if (controlsVisible) {
      setHeroImageVisible(false);
    } else {
      setHeroImageVisible(true);
    }
  }, [controlsVisible]);

  const handlePlay = () => {
    setAnimationState("play");
  };

  const handleStop = () => {
    setAnimationState("stop");
  };

  return (
    <>
      <section className="flex justify-center items-center">
        <section id="home" className="relative w-full">
          <div className="absolute inset-0 -z-10">
            <div style={{ marginTop: "70px" }}>
              <ErrorBoundary>
                <Matrix
                  fontSizeMin={fontSizeMin}
                  fontSizeMax={fontSizeMax}
                  speed={speed}
                  colorSet={colorSet}
                  analogousColors={analogousColors}
                  hueColors={hueColors}
                  displayMode={displayMode}
                  animationState={animationState}
                  style={{
                    cursor: "pointer",
                    opacity: controlsVisible ? 0 : 1,
                    visibility: controlsVisible ? "hidden" : "visible",
                    transition: "opacity 2s ease, visibility 1s ease",
                  }}
                />
              </ErrorBoundary>
            </div>
          </div>
          <div className="flex items-center justify-center hero-container ">
            <section
              className={`w-full flex flex-col relative header ${
                isHeaderVisible ? "visible" : "hidden"
              } `}
            >
              {isHeaderVisible && (
                <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
                  <p className="hi-tag typing-effect">
                    {text}
                    <span className="caret"></span>
                  </p>
                  <h1 className="hero_tag text-gray_gradient">
                    A Curious Front End Developer
                  </h1>
                </div>
              )}
              {!controlsVisible && (
                <div
                  ref={floatingRef}
                  className="matrix-arrow-container inline-flex justify-center items-center relative"
                >
                  <p className="matrix-arrow-text text-white text-sm absolute top-10">
                    Control The Matrix
                  </p>
                  <div className="w-[85px] sm:w-[115px] inline-block overflow-hidden ml-10 mr-8 justify-center items-center">
                    <img
                      className="w-full h-auto scale-x-[-1] rotate-[-10deg]"
                      src="/assets/click-me.png"
                      alt="Click me arrow"
                    />
                  </div>
                </div>
              )}
              <div
                className={`hero-image  ${
                  heroImageVisible ? "visible" : "hidden"
                } w-full h-full absolute inset-0`}
              >
                {isSmall ? (
                  <div className="flex justify-center  items-center  w-full h-full">
                    <img
                      ref={heroImageRef}
                      src="/assets/hero.png"
                      alt="Small Screen Image"
                      className="small-screen-image"
                      onClick={handleHeroImageClick}
                      style={{
                        width: "80px",
                        height: "auto",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                ) : (
                  <ErrorBoundary>
                    <Canvas className=" hero-canvas w-full h-full ">
                      <Suspense fallback={<CanvasLoader />}>
                        <PerspectiveCamera
                          ref={cameraRef}
                          makeDefault
                          position={[0, 0, 30]}
                        />
                        <HeroCamera isMobile={isMobile}>
                          <HeroImage
                            ref={heroImageRef}
                            camera={cameraRef.current}
                            position={sizes.deskPosition}
                            rotation={sizes.deskRotation}
                            scale={sizes.deskScale}
                            onClick={handleHeroImageClick}
                            style={{
                              cursor: "pointer",
                            }}
                          />
                        </HeroCamera>
                        <ambientLight intensity={1} />
                        <directionalLight position={[5, 2, 5]} intensity={2} />
                      </Suspense>
                    </Canvas>
                  </ErrorBoundary>
                )}
              </div>
              <section
                className="flex justify-center  items-center "
                style={{ position: "relative" }}
              >
                {controlsVisible && (
                  <>
                    <div
                      className="controls"
                      ref={controlsRef}
                      style={{
                        zIndex: 100,
                        backgroundImage: `url("/assets/header/controls.png")`,
                        backgroundSize: "cover",
                        backgroundBlendMode: "overlay",
                        backgroundRepeat: "no-repeat",
                        borderRadius: "15px",
                        position: "relative",
                      }}
                    >
                      <div className="controls-container">
                        <MatrixControls
                          fontSizeMin={fontSizeMin}
                          setFontSizeMin={setFontSizeMin}
                          fontSizeMax={fontSizeMax}
                          setFontSizeMax={setFontSizeMax}
                          speed={speed}
                          setSpeed={setSpeed}
                          colorSet={colorSet}
                          setColorSet={setColorSet}
                          onAnalogousColorsChange={handleAnalogousColorsChange}
                          onHueColorsChange={handleHueColorsChange}
                          isHeaderVisible={isHeaderVisible}
                          setIsHeaderVisible={setIsHeaderVisible}
                          displayMode={displayMode}
                          setDisplayMode={setDisplayMode}
                          setColumnSpacing={setColumnSpacing}
                          setColumnSpacing2={setColumnSpacing2}
                          columnSpacing={columnSpacing}
                          columnSpacing2={columnSpacing2}
                          charLimit={charLimit}
                          setCharLimit={setCharLimit}
                        />
                      </div>
                    </div>
                  </>
                )}
              </section>
              <div className="hero-btn  absolute bottom-7 left-0 right-0 w-full z-10 c-space">
                <Button
                  name="Let's work together"
                  isBeam
                  containerClass="button-container sm:w-fit w-full sm:min-w-96"
                  onClick={handleButtonClick}
                />
              </div>
            </section>
          </div>
        </section>
      </section>
      <div className="flex justify-center md:justify-between flex-col  md:flex-row items-center max-w-[1300px] mx-auto">
        <BtnShowMatrix
          isHeaderVisible={isHeaderVisible}
          setIsHeaderVisible={setIsHeaderVisible}
        />
        <BtnPlayStop handlePlay={handlePlay} handleStop={handleStop} />
      </div>
    </>
  );
};

export default Hero;
