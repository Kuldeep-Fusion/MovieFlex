"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import MovieCard from './MovieCard.jsx'

const MovieCarousel = ({ movies }) => {
  if (!movies?.length) return null;

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-3 md:-ml-4">

        {movies.map((movie) => (
          <CarouselItem
            key={movie.id}
            className="basis-[45%] pl-3 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 md:pl-4"
          >
            <MovieCard movie={movie} />
          </CarouselItem>
        ))}

      </CarouselContent>
      <CarouselPrevious className="text-black " />
      <CarouselNext className="text-black" />
    </Carousel>
  );
};

export default MovieCarousel;