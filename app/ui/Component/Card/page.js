"use client";
import Image from "next/image";
import React, { useState } from "react";

const Card = ({
  id,
  title,
  image,
  subLocation,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleDragEnd,
  isDragging,
  isDraggedOver,
}) => {
  const [dragged, setDragged] = useState(false);
  const onClickHandler = () => {
    setDragged(true);
  };

  const onMouseLeaveHandler = () => {
    setDragged(false);
  };
  return (
    <div
      id={`card-${id}`}
      className={`card items-center p-4 pl-0 sm:pl-6 lg:pl-8 flex gap-4 lg:gap-8  cursor-pointer ${
        isDragging ? " bg-[#F4F5F6]" : "bg-white"
      } ${isDraggedOver ? "border-b-2 border-[#1E9BF0]" : ""}`}
      draggable
      onDragStart={(e) => handleDragStart(e, id, title, image)}
      onDragOver={(e) => handleDragOver(e, id)}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
      onMouseOver={onClickHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <div className="flex flex-col">
        <Image
          src={image}
          alt={title}
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
          width={100}
          height={100}
        />
      </div>

      <div className="flex flex-col w-[60%]">
        <h2 className="font-primary text-[#292B36] font-bold text-base sm:text-[1.2rem] lg:text-[1.3rem] xl:text-[1.5rem] font-bold">
          {title}
        </h2>

        <div className="flex gap-2 items-center">
          <div>
            <Image
              src={`/images/location.png`}
              alt={title}
              className="w-[100%] h-6 sm:w-[100%] sm:h-8 lg:w-[100%] lg:h-8"
              width={20}
              height={20}
            />
          </div>

          <p className="text-[#A8A9AE] font-secondary text-lg pt-2">
            {subLocation}
          </p>
        </div>
      </div>
      <div className={`${dragged ? "show" : "hidden"} flex flex-col`}>
        <svg
          width="16"
          height="4"
          viewBox="0 0 16 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.22222 2.05557C2.23756 2.05557 2.25 2.04313 2.25 2.02779C2.25 2.01245 2.23756 2.00002 2.22222 2.00002C2.20688 2.00002 2.19444 2.01245 2.19444 2.02779C2.19444 2.04313 2.20688 2.05557 2.22222 2.05557ZM0.75 2.02779C0.75 1.21471 1.40914 0.555571 2.22222 0.555571C3.03531 0.555571 3.69444 1.21471 3.69444 2.02779C3.69444 2.84088 3.03531 3.50002 2.22222 3.50002C1.40914 3.50002 0.75 2.84088 0.75 2.02779ZM8 2.05557C8.01534 2.05557 8.02778 2.04313 8.02778 2.02779C8.02778 2.01245 8.01534 2.00002 8 2.00002C7.98466 2.00002 7.97222 2.01245 7.97222 2.02779C7.97222 2.04313 7.98466 2.05557 8 2.05557ZM6.52778 2.02779C6.52778 1.21471 7.18691 0.555571 8 0.555571C8.81309 0.555571 9.47222 1.21471 9.47222 2.02779C9.47222 2.84088 8.81309 3.50002 8 3.50002C7.18691 3.50002 6.52778 2.84088 6.52778 2.02779ZM13.7778 2.05557C13.7931 2.05557 13.8056 2.04313 13.8056 2.02779C13.8056 2.01245 13.7931 2.00002 13.7778 2.00002C13.7624 2.00002 13.75 2.01245 13.75 2.02779C13.75 2.04313 13.7624 2.05557 13.7778 2.05557ZM12.3056 2.02779C12.3056 1.21471 12.9647 0.555571 13.7778 0.555571C14.5909 0.555571 15.25 1.21471 15.25 2.02779C15.25 2.84088 14.5909 3.50002 13.7778 3.50002C12.9647 3.50002 12.3056 2.84088 12.3056 2.02779Z"
            fill="#292B36"
          />
        </svg>
      </div>
    </div>
  );
};

export default Card;
