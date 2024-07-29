"use client"
import { NAV_LINKS } from "@/app/constants"
import Image from "next/image"
import Link from "next/link"
// import Button from "./Button"
import React from "react"

const Navbar = () => {
  const [showLinks, setShowLinks] = React.useState(false);

  const toggleLinks = () => {
    console.log("clicked +" + showLinks);
    setShowLinks(!showLinks);
  };

  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5 bg-slate-900">
      <Link href="/" >
        
      </Link>
    
        <ul className={" h-full gap-12 lg:flex " + (showLinks ? "block" : "hidden")}>
        <Image src="/images/bankSymbol.jpg" alt="bank-logo" width={64} height={29} className="px-3 pt-0" />
          {NAV_LINKS.map((link)=> (
            <Link href={link.href} key={link.key} className="regular-16 pt-2 text-gray-50 flexCenter cursor-pointer  transition-all hover:font-bold">
              {link.label}
            </Link>
          ))}
        </ul>
        <div className="lg:flexCenter hidden">
          {/* <Button 
            type="button" 
            title="login" 
            icon="/user.svg"
            variant="btn_dark_green"
           /> */}
        </div>
        <Image 
          src="/images/burger-menu.svg"
          alt="menu"
          width={52}
          height={32}
          className="inline-block cursor-pointer lg:hidden bg-indigo-50 rounded-md mr-4 px-2 float-end"
          onClick={toggleLinks}
        />
      </nav>
  )
}

export default Navbar