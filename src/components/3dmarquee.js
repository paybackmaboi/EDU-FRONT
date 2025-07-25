"use client";

import { motion } from "framer-motion";
import React from "react";


export const ThreeDMarquee = ({
  images,
  className = "",
  onImageClick,
}) => {
  const groupSize = Math.ceil(images.length / 4);
  const imageGroups = Array.from({ length: 4 }, (_, index) =>
    images.slice(index * groupSize, (index + 1) * groupSize)
  );

  const handleImageClick = (image, globalIndex) => {
    if (onImageClick) {
      onImageClick(image, globalIndex);
    } else if (image.href) {
      window.open(image.href, image.target || "_self");
    }
  };

  return (
      <section
      className={
      'mx-auto block h-[600px] overflow-hidden rounded-2xl max-sm:h-[400px] bg-white dark:bg-black ' +
      className
      }
      >
      <div className="flex w-full h-full items-center justify-center">
      <div className="w-[1520px] shrink-0 scale-50 sm:scale-75 lg:scale-100">
      <div
      style={{
      transform: 'rotateX(55deg) rotateY(0deg) rotateZ(45deg)',
      }}
      className="relative grid w-full h-full origin-center grid-cols-4 gap-6 transform-3d place-items-center"
      >
      {imageGroups.map((imagesInGroup, idx) => (
      <motion.div
      key={'column-' + idx}
      animate={{ y: idx % 2 === 0 ? 100 : -100 }}
      transition={{
      duration: idx % 2 === 0 ? 10 : 15,
      repeat: Infinity,
      repeatType: 'reverse',
      }}
      className="flex flex-col items-center gap-6"
      >
      <VerticalGridLine extraStyles="-left-4" spacing="80px" />
      {imagesInGroup.map((image, imgIdx) => {
      const globalIndex = idx * groupSize + imgIdx;
      const isClickable = image.href || onImageClick;

      return (
        <div key={'img-' + imgIdx} className="relative">
          <HorizontalGridLine extraStyles="-top-4" spacing="20px" />
            <motion.img
            whileHover={{ y: -10 }}
             transition={{ duration: 0.3, ease: 'easeInOut' }}
             src={image.src}
              alt={image.alt}
              width={970}
              height={700}
            className={
          'aspect-[970/700] rounded-lg object-cover ring ring-gray-300/30 dark:ring-gray-800/50 shadow-xl dark:shadow-gray-900 hover:shadow-3xl dark:hover:shadow-gray-800 transition-shadow duration-300 ' +
        (isClickable ? 'cursor-pointer' : '')
      }
        onClick={() => handleImageClick(image, globalIndex)}
      />
        </div>
        );
       })}
       </motion.div>
        ))}
          </div>
        </div>
       </div>
    </section>
    );
};

const HorizontalGridLine = ({
      extraStyles = "",
      spacing = "200px",
}) => {
      const lineStyles = {
    "--background": "#ffffff",
    "--color": "rgba(0, 0, 0, 0.2)",
    "--height": "1px",
    "--width": "5px",
    "--fade-stop": "90%",
    "--offset": spacing,
    "--color-dark": "rgba(255, 255, 255, 0.2)",
    maskComposite: "exclude",
  };

  const baseClasses = [
    "absolute",
    "left-[calc(var(--offset)/-2)]",
    "h-[var(--height)]",
    "w-[calc(100%+var(--offset))]",
    "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
    "[background-size:var(--width)_var(--height)]",
    "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)]",
    "[mask-composite:exclude]",
    "z-30",
    "dark:bg-black",
    extraStyles,
  ].join(" ");

  return <div style={lineStyles} className={baseClasses}></div>;
};
const VerticalGridLine = ({
  extraStyles = "",
  spacing = "150px",
}) => {
  const lineStyles = {
    "--background": "#ffffff",
    "--color": "rgba(0, 0, 0, 0.2)",
    "--height": "5px",
    "--width": "1px",
    "--fade-stop": "90%",
    "--offset": spacing,
    "--color-dark": "rgba(0, 0, 0, 0.2)",
    maskComposite: "exclude",
  };

  const baseClasses = [
    "absolute",
    "top-[calc(var(--offset)/-2)]",
    "h-[calc(100%+var(--offset))]",
    "w-[var(--width)]",
    "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
    "[background-size:var(--width)_var(--height)]",
    "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)]",
    "[mask-composite:exclude]",
    "z-30",
    "dark:bg-black",
    extraStyles,
  ].join(" ");

  return <div style={lineStyles} className={baseClasses}></div>;
};

export default ThreeDMarquee;
