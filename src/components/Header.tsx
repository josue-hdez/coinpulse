"use client";

import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="h-24 border-b border-accent-deep">
      <div className="container h-full px-4.5 mx-auto flex justify-between items-center">
        <Link href="/">
          <Image
            src="/assets/logo.svg"
            alt="CoinPulse logo"
            width={122}
            height={30}
            loading="eager"
          />
        </Link>
        {/* TODO: Implement <SearchBar /> component */}
      </div>
    </header>
  );
};

export default Header;
