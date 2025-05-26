"use client";
import { useEffect, useRef } from "react";
import Head from "next/head";
import Script from "next/script";
import useCheckSliderLoaded from "@/hooks/useCheckSliderLoaded";
import SR7Loader from "./SR7Loader";
import { cn } from "@/app/utils";

interface AISR7SliderProps {
  moduleAlias?: string;
  moduleId?: string;
}

declare global {
  interface Window {
    _tpt: any;
    SR7: any;
  }
}

export default function MainSlider({
  moduleAlias = "Modern-Restaurant-Slider-Design",
  moduleId = "4",
}: AISR7SliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const moduleIdentifier = `SR7_${moduleId}_1`;

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initialize global objects as in the original inline script.
    window._tpt = window._tpt || {};
    window.SR7 = window.SR7 || {};
    window._tpt.R = window._tpt.R || {};
    window._tpt.R.fonts = window._tpt.R.fonts || {};
    window._tpt.R.fonts.customFonts = window._tpt.R.fonts.customFonts || {};

    window.SR7.devMode = false;
    window.SR7.F = window.SR7.F || {};
    window.SR7.G = window.SR7.G || {};
    window.SR7.LIB = window.SR7.LIB || {};
    window.SR7.E = window.SR7.E || {};
    window.SR7.E.gAddons = window.SR7.E.gAddons || {};
    window.SR7.E.php = window.SR7.E.php || {};
    window.SR7.E.nonce = "507e577ae8";
    window.SR7.E.ajaxurl = "";
    window.SR7.E.resturl = "";
    window.SR7.E.slug_path = "revslider/revslider.php";
    window.SR7.E.slug = "revslider";
    window.SR7.E.plugin_url = "";
    window.SR7.E.wp_plugin_url = "";
    window.SR7.E.revision = "6.7.29";
    window.SR7.E.fontBaseUrl = "";
    window.SR7.G.breakPoints = [1240, 1024, 778, 480];
    window.SR7.E.modules = [
      "module",
      "page",
      "slide",
      "layer",
      "draw",
      "animate",
      "srtools",
      "canvas",
      "defaults",
      "carousel",
      "navigation",
      "media",
      "modifiers",
    ];
    window.SR7.E.libs = ["WEBGL"];
    window.SR7.E.css = ["csslp", "cssbtns", "cssfilters", "cssnav", "cssmedia"];
    window.SR7.E.resources = {};
    window.SR7.JSON = window.SR7.JSON || {};

    // Prepare module height similar to your inline script.
    window.SR7.PMH = window.SR7.PMH || {};
    window.SR7.PMH[moduleIdentifier] = {
      cn: 100,
      state: false,
      fn: function () {
        if (window._tpt && window._tpt.prepareModuleHeight) {
          window._tpt.prepareModuleHeight({
            id: moduleIdentifier,
            el: [900, 900, 768, 960, 720],
            type: "standard",
            shdw: "0",
            gh: [900, 900, 768, 960, 720],
            gw: [1240, 1240, 1024, 778, 480],
            vpt: ["-100px','-100px','-100px','-100px','-100px"],
            size: { fullWidth: true, fullHeight: true },
            fho: "#masthead,",
            mh: "0",
            onh: 0,
            onw: 0,
            bg: {
              color:
                '{"type":"solid","orig":"#0c0c0c","string":"rgba(12, 12, 12, 1)"}',
            },
          });
          window.SR7.PMH[moduleIdentifier].state = true;
        } else if (window.SR7.PMH[moduleIdentifier].cn-- > 0) {
          setTimeout(window.SR7.PMH[moduleIdentifier].fn, 19);
        }
      },
    };

    window.SR7.PMH[moduleIdentifier].fn();

    // Additional resource configuration
    window.SR7.E.resources.mousetrap =
      "/revslider-mousetrap-addon/public/js/mousetrap.js";
    window.SR7.E.resources.transitionpack =
      "/revslider-transitionpack-addon/public/js/transitionpack.js";
    window.SR7.E.resources.tpackURL = "/revslider-transitionpack-addon/";
    window.SR7.JSON[moduleIdentifier] = "/assets/SR7_4_1.json";

    // Initialize slider when all scripts are loaded.
    const initializeSlider = () => {
      if (window.SR7.F.init) {
        window.SR7.F.init();
      } else {
        window.SR7.shouldBeInited = true;
      }
    };

    if (document.readyState === "complete") {
      initializeSlider();
    } else {
      window.addEventListener("load", initializeSlider);
    }

    return () => {
      window.removeEventListener("load", initializeSlider);
    };
  }, [moduleIdentifier]);

  const { isInitializing, isLoaded, isTransitioning } = useCheckSliderLoaded();

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>SR7 - EXPORT</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          id="sr7css-css"
          href="/public/css/sr7.css"
          media="all"
        />
      </Head>

      {/* Load external scripts before the component initializes */}
      <Script
        src="/public/js/libs/tptools.js"
        strategy="beforeInteractive"
        id="_tpt-js"
      />
      <Script
        src="/public/js/sr7.js"
        strategy="beforeInteractive"
        id="sr7-js"
      />
      <Script
        src="/public/js/page.js"
        strategy="beforeInteractive"
        id="sr7-page-js"
      />

      <div
        ref={sliderRef}
        className="revslider-container relative w-full h-screen font-[family-name:var(--font-geist-sans)"
        style={{}}
      >
        {(isInitializing || !isLoaded || isTransitioning) && <SR7Loader />}

        <div
          className={cn(
            "slider-wrapper",
            isLoaded && !isTransitioning ? "opacity-100" : "opacity-0",
            "transition-opacity duration-500 ease-in-out"
          )}
        >
          <sr7-module
            data-alias={moduleAlias}
            data-id="4"
            id={moduleIdentifier}
            className="rs-respect-topbar rs-ov-hidden"
            data-version="6.7.29"
            style={{
              visibility: isLoaded && !isTransitioning ? "visible" : "hidden",
              display: "block",
              width: "100%",
              height: "100%",
            }}
          >
            <sr7-adjuster></sr7-adjuster>
            <sr7-content>
              {/* Slide 1 */}
              <sr7-slide id="SR7_4_1-9" data-key="9">
                <sr7-bg id="SR7_4_1-9-39" className="sr7-layer">
                  <noscript>
                    <img src="/assets/b1.jpg" alt="b1.jpg" title="b1.jpg" />
                  </noscript>
                </sr7-bg>
                <sr7-txt id="SR7_4_1-9-4" className="sr7-layer">
                  Welcome to Plates of Perfection, where every dish is a
                  masterpiece crafted to tantalize your taste buds.
                </sr7-txt>
                <sr7-txt id="SR7_4_1-9-5" className="sr7-layer">
                  Gluten-Free / High-Protein / Sustainable
                </sr7-txt>
                <sr7-txt id="SR7_4_1-9-12" className="sr7-layer">
                  Gluten-Free / Dairy-Free / High-Protein
                </sr7-txt>
                <sr7-txt id="SR7_4_1-9-25" className="sr7-layer">
                  Gluten-Free / Dairy-Free / High-Protein
                </sr7-txt>
                <sr7-txt id="SR7_4_1-9-26" className="sr7-layer">
                  A Symphony of Flavors
                </sr7-txt>
                <sr7-txt id="SR7_4_1-9-36" className="sr7-layer">
                  Duck Confit with Cherry Reduction
                </sr7-txt>
                <sr7-txt id="SR7_4_1-9-37" className="sr7-layer">
                  Seared Ahi Tuna with Avocado Purée
                </sr7-txt>
                <sr7-txt id="SR7_4_1-9-38" className="sr7-layer">
                  Lobster Risotto with Saffron
                </sr7-txt>
              </sr7-slide>

              {/* Slide 2 */}
              <sr7-slide id="SR7_4_1-10" data-key="10">
                <sr7-bg id="SR7_4_1-10-39" className="sr7-layer">
                  <noscript>
                    <img src="/assets/b2.jpg" alt="b2.jpg" title="b2.jpg" />
                  </noscript>
                </sr7-bg>
                <sr7-txt id="SR7_4_1-10-4" className="sr7-layer">
                  Experience the best of each season with our menu, featuring
                  fresh, locally sourced ingredients. Savor the vibrant tastes
                  of nature&apos;s bounty.
                </sr7-txt>
                <sr7-txt id="SR7_4_1-10-5" className="sr7-layer">
                  Vegan / Gluten-Free / Organic
                </sr7-txt>
                <sr7-txt id="SR7_4_1-10-12" className="sr7-layer">
                  Vegetarian / Organic / Locally-Sourced
                </sr7-txt>
                <sr7-txt id="SR7_4_1-10-25" className="sr7-layer">
                  Gluten-Free / Dairy-Free / High-Protein
                </sr7-txt>
                <sr7-txt id="SR7_4_1-10-26" className="sr7-layer">
                  Seasonal Delights
                </sr7-txt>
                <sr7-txt id="SR7_4_1-10-36" className="sr7-layer">
                  Summer Citrus Grilled Salmon
                </sr7-txt>
                <sr7-txt id="SR7_4_1-10-37" className="sr7-layer">
                  Autumn Butternut Squash and Sage Ravioli
                </sr7-txt>
                <sr7-txt id="SR7_4_1-10-38" className="sr7-layer">
                  Spring Garden Risotto
                </sr7-txt>
              </sr7-slide>

              {/* Slide 3 */}
              <sr7-slide id="SR7_4_1-11" data-key="11">
                <sr7-bg id="SR7_4_1-11-39" className="sr7-layer">
                  <noscript>
                    <img src="/assets/b3.jpg" alt="b3.jpg" title="b3.jpg" />
                  </noscript>
                </sr7-bg>
                <sr7-txt id="SR7_4_1-11-4" className="sr7-layer">
                  Indulge in the artistry of our chef’s specialties, where
                  culinary expertise meets innovative flair.
                </sr7-txt>
                <sr7-txt id="SR7_4_1-11-5" className="sr7-layer">
                  Gluten-Free / Locally-Sourced
                </sr7-txt>
                <sr7-txt id="SR7_4_1-11-12" className="sr7-layer">
                  Gluten-Free / Dairy-Free / High-Protein
                </sr7-txt>
                <sr7-txt id="SR7_4_1-11-25" className="sr7-layer">
                  Gluten-Free / Dairy-Free / Low-Carb
                </sr7-txt>
                <sr7-txt id="SR7_4_1-11-26" className="sr7-layer">
                  Chef’s Creations
                </sr7-txt>
                <sr7-txt id="SR7_4_1-11-36" className="sr7-layer">
                  Seared Scallops with Truffle Foam
                </sr7-txt>
                <sr7-txt id="SR7_4_1-11-37" className="sr7-layer">
                  Duck Breast with Blackberry Gastrique
                </sr7-txt>
                <sr7-txt id="SR7_4_1-11-38" className="sr7-layer">
                  Herb-Crusted Lamb with Pomegranate Glaze
                </sr7-txt>
              </sr7-slide>

              {/* Slide 4 */}
              <sr7-slide id="SR7_4_1-12" data-key="12">
                <sr7-bg id="SR7_4_1-12-39" className="sr7-layer">
                  <noscript>
                    <img src="/assets/b4.jpg" alt="b4.jpg" title="b4.jpg" />
                  </noscript>
                </sr7-bg>
                <sr7-txt id="SR7_4_1-12-4" className="sr7-layer">
                  Complete your dining experience with our decadent desserts.
                  From rich chocolate delights to delicate pastries, treat
                  yourself to our sweet indulgences.
                </sr7-txt>
                <sr7-txt id="SR7_4_1-12-5" className="sr7-layer">
                  Gluten-Free / Vegetarian / Non-GMO
                </sr7-txt>
                <sr7-txt id="SR7_4_1-12-12" className="sr7-layer">
                  Gluten-Free / Dairy-Free / Vegetarian
                </sr7-txt>
                <sr7-txt id="SR7_4_1-12-25" className="sr7-layer">
                  Gluten-Free / Vegetarian / Organic
                </sr7-txt>
                <sr7-txt id="SR7_4_1-12-26" className="sr7-layer">
                  Sweet Indulgence
                </sr7-txt>
                <sr7-txt id="SR7_4_1-12-36" className="sr7-layer">
                  Lavender Honey Panna Cotta
                </sr7-txt>
                <sr7-txt id="SR7_4_1-12-37" className="sr7-layer">
                  Passion Fruit and Coconut Pavlova
                </sr7-txt>
                <sr7-txt id="SR7_4_1-12-38" className="sr7-layer">
                  Chocolate Hazelnut Dome
                </sr7-txt>
              </sr7-slide>

              {/* Slide 5 (Navigation/Links) */}
              <sr7-slide id="SR7_4_1-13" data-key="13">
                <a
                  id="SR7_4_1-13-13"
                  className="sr7-layer"
                  href=""
                  target="_blank"
                  rel="noopener"
                >
                  book a table
                </a>
                <sr7-txt id="SR7_4_1-13-16" className="sr7-layer">
                  <i className="material-icons">chevron_left</i>
                </sr7-txt>
                <sr7-txt id="SR7_4_1-13-17" className="sr7-layer">
                  <i className="material-icons">chevron_right</i>
                </sr7-txt>
                <a
                  id="SR7_4_1-13-19"
                  className="sr7-layer"
                  href=""
                  target="_blank"
                  rel="noopener"
                >
                  about
                </a>
                <a
                  id="SR7_4_1-13-20"
                  className="sr7-layer"
                  href=""
                  target="_blank"
                  rel="noopener"
                >
                  menu
                </a>
                <a
                  id="SR7_4_1-13-21"
                  className="sr7-layer"
                  href=""
                  target="_blank"
                  rel="noopener"
                >
                  contact
                </a>
                <a
                  id="SR7_4_1-13-22"
                  className="sr7-layer"
                  href=""
                  target="_blank"
                  rel="noopener"
                >
                  catering
                </a>
                <sr7-txt id="SR7_4_1-13-27" className="sr7-layer">
                  20
                  <br />
                  25
                </sr7-txt>
                <a
                  id="SR7_4_1-13-28"
                  className="sr7-layer"
                  href="https://www.instagram.comrevolution"
                  target="_blank"
                  rel="noopener"
                >
                  <i className="fa-instagram"></i>
                </a>
              </sr7-slide>
            </sr7-content>
          </sr7-module>
        </div>
      </div>
    </>
  );
}
