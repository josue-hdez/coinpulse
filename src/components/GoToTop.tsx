"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ArrowUpToLine } from "lucide-react";

const GoToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 150) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <Button
      className="font-medium text-sm text-white h-10.5 py-1.5 px-3 rounded-md fixed bottom-28 right-6 bg-bg-primary cursor-pointer"
      onClick={scrollToTop}
    >
      <ArrowUpToLine />
    </Button>
  );
};

export default GoToTop;
