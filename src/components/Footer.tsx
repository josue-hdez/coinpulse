import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="h-24 border-t border-accent-deep">
      <div className="container h-full px-4.5 mx-auto flex flex-col xs:flex-row justify-center xs:justify-between items-center gap-1.5">
        <Link href="/">
          <Image
            src="/assets/logo.svg"
            alt="CoinPulse logo"
            width={122}
            height={30}
            loading="eager"
          />
        </Link>
        <p className="text-sm">
          © {currentYear} CoinPulse. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
