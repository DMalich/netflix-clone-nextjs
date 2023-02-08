import { BellIcon, SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { VscAccount } from "react-icons/vsc";

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={`${isScrolled && "bg-neutral-900"}`}>
            <div className="flex items-center space-x-2 md:space-x-10">
                <img
                    src="https://rb.gy/ulxxee"
                    className="cursor-pointer object-contain"
                    width={100}
                    height={100}
                />

                <ul className="hidden space-x-6 md:flex">
                    <li className="headerLink">Home</li>
                    <li className="headerLink">TV Shows</li>
                    <li className="headerLink">Movies</li>
                    <li className="headerLink">New & Popular</li>
                    <li className="headerLink">Favorites</li>
                </ul>
            </div>

            <div className="flex items-center space-x-4 text-sm font-light">
                <SearchIcon className="hidden sm:inline h-6 w-6" />
                <p className="hidden text-white lg:inline">Kids</p>
                <BellIcon className="h-6 w-6" />
                <Link href="/account">
                    <VscAccount className="h-6 w-6 cursor-pointer" />
                </Link>
            </div>
        </header>
    );
}

export default Header;
