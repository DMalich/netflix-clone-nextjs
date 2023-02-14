import { modalState, movieState } from "@/atoms/modalAtom";
import { baseUrl } from "@/constants/movie";
import { Movie } from "@/typings";
import { InformationCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { useRecoilState } from 'recoil';

type Props = {
    netflixOriginals: Movie[];
};

function Banner({ netflixOriginals }: Props) {
    const [randomMovie, setRandomMovie] = useState<Movie | null>(null);
    const [showModal, setShowModal] = useRecoilState(modalState);
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

    useEffect(() => {
        setRandomMovie(
            netflixOriginals[
                Math.floor(Math.random() * netflixOriginals.length)
            ]
        );
    }, [netflixOriginals]);

    console.log(randomMovie);

    return (
        <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[95vh] lg:justify-end lg:pb-12">
            <div className="absolute top-0 left-0 h-[100vh] w-screen -z-10">
                <Image
                    src={`${baseUrl}${
                        randomMovie?.backdrop_path || randomMovie?.poster_path
                    }`}
                    layout="fill"
                    objectFit="cover"
                    alt="Banner of a random movie"
                />
            </div>

            <h1 className="text-2xl font-bold md:text-3xl">
                {randomMovie?.title ||
                    randomMovie?.original_name ||
                    randomMovie?.name}
            </h1>
            <p className="max-w-s text-s md:max-w-lg md:text-lg lg:max-w-xl lg:text-xl">
                {randomMovie?.overview}
            </p>

            <div className="flex space-x-3">
                <button className="bannerButton bg-white text-black">
                    <FaPlay className="h-4 w-4 text-black md:h-6 md:w-6" />
                    Play
                </button>
                <button
                    className="bannerButton bg-[gray]"
                    onClick={() => {
                        setCurrentMovie(randomMovie);
                        setShowModal(true);
                    }}
                >
                    <InformationCircleIcon className="h-4 w-4 md:h-6 md:w-6" />
                    More info
                </button>
            </div>
        </div>
    );
}

export default Banner;
