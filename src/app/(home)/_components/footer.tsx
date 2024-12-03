import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import FooterNav from "./footer-nav";

const Footer = () => {
  return (
    <div className="flex flex-col p-16 pb-12 gap-16 rounded-xl font-light relative flex-1 bg-primary text-white dark:text-black">
      <div className="flex gap-4 items-center">
        {/* AVATAR  */}
        <Avatar className="size-[60px]">
          <AvatarImage src="https://avatars.githubusercontent.com/u/16572906?s=400&u=a304af70d12572524d540553425d78ff4d1a101a&v=4" />
          <AvatarFallback>EC</AvatarFallback>
        </Avatar>

        {/* NAME  */}
        <div className="flex flex-col gap-[2px]">
          <h1 className="text-lg">ECarry</h1>
          <p className="text-sm opacity-60">Photographer</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-14">
        <FooterNav
          title="Pages"
          links={[
            { title: "Home", href: "/" },
            { title: "About", href: "/about" },
            { title: "Contact", href: "/contact" },
          ]}
        />
        <FooterNav title="CMS" links={[{ title: "Blog", href: "/blog" }]} />
        <FooterNav title="Utility" links={[{ title: "404", href: "/404" }]} />
      </div>

      {/* Attribution */}
      <div className="text-sm">
        <p>
          <span className="opacity-60">© Design by </span>
          <a
            href="https://templates.gola.io/template/hanssen"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            Pawel Gola
          </a>
          <span className="opacity-60">. Powered by </span>
          <a
            href="https://github.com/ecarry"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            ECarry
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;