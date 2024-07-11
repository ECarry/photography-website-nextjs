"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import ShuffleGrid from "./ShuffleGrid";

const ShuffleHero = () => {
  const { onOpen } = useModal();

  return (
    <section className="w-full px-0 md:px-8 py-4 md:py-8 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-8xl mx-auto">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-sky-500 font-medium">
          Better every day
        </span>
        <h3 className="text-4xl md:text-5xl font-semibold">
          Photography is an art that captures moments, emotions, and stories.
        </h3>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
          Keep exploring and creating!{" "}
        </p>
        <Button variant="primary" onClick={() => onOpen()}>
          + New Photo
        </Button>
      </div>
      <ShuffleGrid />
    </section>
  );
};

export default ShuffleHero;