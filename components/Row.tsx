import { Movie } from "@/typings";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import Thumbnail from "./Thumbnail";
import { useRef, useState } from "react";

type Props = {
    title: string;
    movies: Movie[];
};

function Row({ title, movies }: Props) {
    const [isMoved, setIsMoved] = useState(false);
    const rowRef = useRef<HTMLDivElement>(null);

    const handleClick = (direction: String) => {
        setIsMoved(true);

        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo =
                direction === "left"
                    ? scrollLeft - clientWidth
                    : scrollLeft + clientWidth;

            rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <div className="h-40 space-y-1 md:space-y-2">
            <h2
                className="w-50 cursor-pointer text-sm text-neutral-300 font-semibold transition
                duration-200 hover:text-white md:text-xl"
            >
                {title}
            </h2>
            <div className="group relative md:-ml-2">
                <ChevronLeftIcon
                    className={`rowChevron left-2 ${!isMoved && "hidden"}`}
                    onClick={() => handleClick("left")}
                />

                <div
                    ref={rowRef}
                    className="scrollbar-hide flex items-center space-x-0.5 overflow-x-scroll md:space-x-2 
                    md:p-2"
                >
                    {movies.map((movie) => (
                        <Thumbnail key={movie.id} movie={movie} />
                    ))}
                </div>

                <ChevronRightIcon
                    className="rowChevron right-2"
                    onClick={() => handleClick("right")}
                />
            </div>
        </div>
    );
}

export default Row;
