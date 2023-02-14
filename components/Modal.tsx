import { useEffect, useState } from "react";
import { modalState, movieState } from "@/atoms/modalAtom";
import { Element, Genre, Movie } from "@/typings";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import {
    ThumbUpIcon,
    VolumeOffIcon,
    VolumeUpIcon,
} from "@heroicons/react/outline";
import MuiModal from "@mui/material/Modal";
import { useRecoilState } from "recoil";
import ReactPlayer from "react-player/lazy";
import { FaPlay } from "react-icons/fa";

function Modal() {
    const [showModal, setShowModal] = useRecoilState(modalState);
    const [movie, setMovie] = useRecoilState(movieState);
    const [trailer, setTrailer] = useState("");
    const [genres, setGenres] = useState<Genre[]>([]);
    const [muted, setMuted] = useState(false);

    useEffect(() => {
        if (!movie) return;

        async function fetchMovie() {
            const data = await fetch(
                `https://api.themoviedb.org/3/${
                    movie?.media_type === "tv" ? "tv" : "movie"
                }/${movie?.id}?api_key=${
                    process.env.NEXT_PUBLIC_API_KEY
                }&language=en-US&append_to_response=videos`
            )
                .then((response) => response.json())
                .catch((error) => console.log(error));

            if (data?.videos) {
                const index = data.videos.results.findIndex(
                    (element: Element) => element.type === "Trailer"
                );
                setTrailer(data.videos?.results[index]?.key);
            }

            if (data?.genres) {
                setGenres(data.genres);
            }
        }

        fetchMovie();
    }, [movie]);

    const handleClose = () => {
        setShowModal(false);
    };

    console.log(trailer);

    return (
        <MuiModal
            open={showModal}
            onClose={handleClose}
            className="fixed !top-7 left-0 right-0 mx-auto w-full max-w-5xl z-50 overflow-hidden
            overflow-y-scroll scrollbar-hide rounded-md"
        >
            <>
                <button
                    className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-neutral-900 
                    hover:bg-neutral-900"
                    onClick={handleClose}
                >
                    <XIcon className="h-6 w-6" />
                </button>

                <div className="relative pt-[56.25%]">
                    <ReactPlayer
                        style={{ position: "absolute", top: "0", left: "0" }}
                        url={`https://www.youtube.com/watch?v=${trailer}`}
                        width="100%"
                        height="100%"
                        playing
                        muted={muted}
                    />
                    <div className="absolute flex bottom-10 w-full items-center justify-between">
                        <div className="flex space-x-2">
                            <button
                                className="flex items-center rounded gap-x-2 bg-white 
                            text-black text-xl font-bold px-8 transition hover:bg-neutral-200"
                            >
                                <FaPlay className="modalIcon text-black" />
                                Play
                            </button>

                            <button className="modalButton">
                                <PlusIcon className="modalIcon" />
                            </button>

                            <button className="modalButton">
                                <ThumbUpIcon className="modalIcon" />
                            </button>
                        </div>
                        <button
                            className="modalButton"
                            onClick={() => setMuted(!muted)}
                        >
                            {muted ? (
                                <VolumeOffIcon className="modalIcon" />
                            ) : (
                                <VolumeUpIcon className="modalIcon" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex space-x-12 rounded-b-md px-10 py-8 bg-neutral-900">
                    <div className="space-y-5 text-lg">
                        <div className="flex items-center space-x-2 text-sm">
                            <p className="font-semibold text-green-600">
                                {movie!.vote_average * 10}% Match
                            </p>
                            <p className="font-light">
                                {movie?.release_date?.substring(0, 4) || movie?.first_air_date.substring(0, 4)}
                            </p>
                            <div
                                className="flex items-center justify-center h-4 rounded border
                            border-white/50 text-xs px-1.5"
                            >
                                HD
                            </div>
                        </div>

                        <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
                            <p className="w-5/6">{movie?.overview}</p>
                            <div className="flex flex-col space-y-3 text-sm">
                                <div>
                                    <span className="text-neutral-500">Genres:</span>
                                    {genres.map((genre) => genre.name).join(', ')}
                                </div>
                                <div>
                                    <span className="text-neutral-500">Rating: </span>
                                    {movie?.vote_average}
                                </div>
                                <div>
                                    <span className="text-neutral-500">Original language: </span>
                                    {movie?.original_language}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </MuiModal>
    );
}
export default Modal;
