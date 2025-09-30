"use client";

import Image from "next/image";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between">
      <div className="flex gap-3">
        <Image src="/assets/menu.svg" width="15" height="5" alt="" />
        <Image src="/assets/logo.svg" width="20" height="15" alt="" />
      </div>
      <Image src="/assets/search.svg" width="20" height="20" alt="" />{" "}
    </div>
  );
};

export default Navbar;
