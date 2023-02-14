import { useEffect, useState } from "react";
import { modalState, movieState } from "@/atoms/modalAtom";
import { Element, Genre, Movie } from "@/typings";
import { XIcon } from "@heroicons/react/solid";
import MuiModal from "@mui/material/Modal";
import { useRecoilState } from "recoil";

function Modal() {
    const [showModal, setShowModal] = useRecoilState(modalState);
    const [movie, setMovie] = useRecoilState(movieState);
    const [trailer, setTrailer] = useState('');
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        if (!movie) return;

        async function fetchMovie() {
            const data = await fetch(
                `https://api.themoviedb.org/3/${
                    movie?.media_type === "tv" ? "tv" : "movie"
                }/${movie?.id}?api_key=${
                    process.env.NEXT_PUBLIC_API_KEY
                }&language=en-US&append_to_response=videos`
            ).then((response) => response.json())
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
        <MuiModal open={showModal} onClose={handleClose}>
            <>
                <button
                    className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-neutral-900 
                    hover:bg-neutral-900"
                    onClick={handleClose}
                >
                    <XIcon className="h-6 w-6" />
                </button>

                <div>
                    
                </div>
            </>
        </MuiModal>
    );
}
export default Modal;
