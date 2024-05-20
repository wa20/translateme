import React from "react";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, UserButton } from "@clerk/nextjs";

function Header() {
  const { userId } = auth();

  return (
    <header className="flex items-center justify-between px-8 border-b mb-5 shadow-md static">
        <div className="flex items-center justify-center overflow-hidden h-20">
            <Link href='/'>
            <Image 
             src='https://links.papareact.com/xgu'
             alt="logo"
             width={200}
             height={100}
             className="object-contain h-32 cursor-pointer"
            />
        </Link>
        </div>
        
        {userId ? (
            <div>
                <UserButton />
            </div>
        ) : (
            // TODO fix redirect 
            <SignInButton 
            signUpForceRedirectUrl="/translate"
            mode="modal" >
                <button className=" flex items-center px-3 py-2 rounded-md shadow-md bg-blue-700 text-white font-semibold hover:shadow-xl active:scale-90 duration-150 ease-out">Log In</button>
            </SignInButton>
        )
        
    }
    </header>
  );
}

export default Header;
