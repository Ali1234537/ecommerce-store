"use client";

import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import {
  ShoppingCart,
  CircleUserRound,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

function Navbar() {
  const router = useRouter();
  const Pathname = usePathname();

  const [loginOptions, setLoginOptions] = useState(false);
  const [customerLoggedIn, setCustomerLoggedIn] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    setCustomerLoggedIn(
      localStorage.getItem("Customer") === "true"
    );
  }, [Pathname]);

  useEffect(() => {
    setMobileMenu(false);
    setLoginOptions(false);
  }, [Pathname]);

  function handleLogout() {
    localStorage.removeItem("Customer");
    localStorage.removeItem("CustomerEmail");
    localStorage.removeItem("CustomerPassword");
    localStorage.removeItem("CustomerId");

    setCustomerLoggedIn(false);
    setLoginOptions(false);
    setMobileMenu(false);

    router.push("/");
  }

  const link = (path: string) =>
  Pathname === path
    ? "flex items-center whitespace-nowrap rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-black"
    : "flex items-center whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-black";

  const CartItems = useAppSelector(
    (state) => state.cart.items
  );

  const cartCount = CartItems.length;

  function closeMenus() {
    setMobileMenu(false);
    setLoginOptions(false);
  }

  return (
    <nav className="relative z-50 w-full border-b border-gray-200 bg-white shadow-md">
      <div className="relative mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6 lg:px-8">

         
        <Link
          href="/"
          onClick={closeMenus}
          className="flex shrink-0 items-center"
        >
          <Image
            src="/logoed1.png"
            alt="Logo"
            width={120}
            height={100}
            priority
           className="h-auto w-28 shrink-0 object-contain sm:w-24 lg:w-28"
          />
        </Link>

         
        <div className="hidden items-center gap-1 md:flex lg:gap-4">
          <Link href="/" className={link("/")}>
            HOME
          </Link>

          <Link href="/products" className={link("/products")}>
            PRODUCTS
          </Link>

          <Link
            href="/cart"
            className={`relative gap-2 ${link("/cart")}`}
          >
            <ShoppingCart size={19} />

            <span>Cart</span>

            {cartCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-800 px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

         
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">

           
          <div className="relative">
            <button
              type="button"
              onClick={() => setLoginOptions(!loginOptions)}
              aria-expanded={loginOptions}
              className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-gray-400 bg-blue-500 px-2 py-2 font-semibold text-white"
            >
              {customerLoggedIn ? (
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-white text-black"
                  title="USER"
                >
                  <CircleUserRound size={18} />
                </span>
              ) : (
                "LOGIN"
              )}
            </button>

            {loginOptions && (
              <div className="absolute right-0 top-full z-[60] mt-2 w-48 overflow-hidden rounded-lg border bg-blue-300 shadow-lg">

                {customerLoggedIn ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    title="Logout"
                    className="block w-full cursor-pointer px-4 py-3 text-left text-black hover:bg-blue-400"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={closeMenus}
                    title="Login as Customer"
                    className="block cursor-pointer px-4 py-3 font-sans font-bold text-gray-700 hover:bg-blue-400"
                  >
                    Login as Customer
                  </Link>
                )}

                <Link
                  href="/isAdmin"
                  onClick={closeMenus}
                  title="Login as Admin"
                  className="block cursor-pointer border-t px-4 py-3 font-sans font-bold text-gray-700 hover:bg-blue-400"
                >
                  Login as Admin
                </Link>
              </div>
            )}
          </div>

          
          <button
            type="button"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label={
              mobileMenu ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileMenu}
            className="flex shrink-0 items-center justify-center rounded-lg border border-gray-300 bg-gray-100 p-2 text-gray-800 md:hidden cursor-pointer"
          >
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

       
      {mobileMenu && (
        <div className="absolute right-3 top-full z-50 flex w-56 flex-col gap-2 rounded-xl border border-gray-200 bg-white p-3 shadow-lg sm:right-6 md:hidden">
          <Link
            href="/"
            onClick={closeMenus}
            className={link("/")}
          >
            HOME
          </Link>

          <Link
            href="/products"
            onClick={closeMenus}
            className={link("/products")}
          >
            PRODUCTS
          </Link>

          <Link
            href="/cart"
            onClick={closeMenus}
            className={link("/cart")}
          >
            <ShoppingCart size={19} className="mr-2" />
            Cart ({cartCount})
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;