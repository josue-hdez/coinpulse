"use client";

import { useState, ReactNode } from "react";
import { Button } from "./ui/button";

const ReadMore = ({ children }: { children: ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const arr = Array.isArray(children) ? children : [children];

  return (
    <>
      {arr[0]}
      {isExpanded && arr.slice(1)}
      {arr.length > 1 && (
        <Button
          className="font-bold hover:text-positive h-fit p-0 m-0"
          variant="link"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? "Read less" : "Read more"}
        </Button>
      )}
    </>
  );
};

export default ReadMore;
