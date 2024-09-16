/* eslint-disable @next/next/no-img-element */
"use client";

import { DynamicWidget } from "@/lib/dynamic";
import { useState, useEffect } from "react";
import DynamicMethods from "@/app/components/Methods";
import "./page.css";

const checkIsDarkSchemePreferred = () => {
  if (typeof window !== "undefined") {
    return window.matchMedia?.("(prefers-color-scheme:dark)")?.matches ?? false;
  }
  return false;
};

// General
// Dynamic seems to be pricier if your app scales => In Dashboard its said that standard pricing plan offers the first 200 MAUs (Monthly Active Users) for free, followed by 99$ for up to 2000 MAUs and then charges additional 0.05$ per MAU thereafter, but on on the pricing page it says that standard plan is first 1000 MAUs free and then again after 2000 MAUs every new user is additional 0.05$
// Functionality seems ok, also good customization, but would it be worth the extra price?
// The web dashboard of dynamic is extensive, more functionality compared to wallet connect, particularly when it comes to user management, but as mentioned the price is also greater
// Dynamic might make more sense if you are building a serious app, where there could be a lot of user's and you need more advanced user management
// Dynamic works as SIWE (sign in with ethereum) by default, no need for another library like next-auth, which we need with appkit?

// Links
// https://demo.dynamic.xyz/ => Demo of wallet usage
// https://docs.dynamic.xyz/introduction/welcome => Docs

export default function Main() {
  const [isDarkMode, setIsDarkMode] = useState(checkIsDarkSchemePreferred);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    const handleChange = () => setIsDarkMode(checkIsDarkSchemePreferred());

    darkModeMediaQuery.addEventListener("change", handleChange);
    return () => darkModeMediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className={`container ${isDarkMode ? "dark" : "light"}`}>
      <div className="header">
        <img
          className="logo"
          src={isDarkMode ? "/logo-light.png" : "/logo-dark.png"}
          alt="dynamic"
        />
        <div className="header-buttons">
          <button
            className="docs-button"
            onClick={() =>
              window.open(
                "https://docs.dynamic.xyz",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            Docs
          </button>
          <button
            className="get-started"
            onClick={() =>
              window.open(
                "https://app.dynamic.xyz",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            Get started
          </button>
        </div>
      </div>
      {/* Not modal, just flex column styling */}
      <div className="modal">
        {/* Widget that allows you to connect with your wallet and later on shows wallet address and enables disconnect */}
        <DynamicWidget />
        {/* This is just an example component for the data you can get by using certain Dynamic methods, not relevant for implementation */}
        <DynamicMethods isDarkMode={isDarkMode} />
      </div>
      <div className="footer">
        <div className="footer-text">Made with ❤️ by dynamic</div>
        <img
          className="footer-image"
          src={isDarkMode ? "/image-dark.png" : "/image-light.png"}
          alt="dynamic"
        />
      </div>
    </div>
  );
}
