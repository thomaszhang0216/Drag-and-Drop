"use client";
import Head from "next/head";
import Card from "./ui/Component/Card/page";
import { useState } from "react";
import data from "./ui/data";

export default function Home() {
  const [cards, setCards] = useState(data);
  const [draggingCardId, setDraggingCardId] = useState(null);
  const [dragImage, setDragImage] = useState(null);
  const [dragOverCardId, setDragOverCardId] = useState(null);

  const handleDragStart = (e, id, title, image) => {
    setDraggingCardId(id);
    const dragImage = document.createElement("div");
    dragImage.id = "drag-image";
    dragImage.style.position = "absolute";
    dragImage.style.width = "250px";
    dragImage.style.height = "80px";
    dragImage.style.display = "flex";
    dragImage.style.alignItems = "center";
    dragImage.style.justifyContent = "start";
    dragImage.style.backgroundColor = "#f9f9f9";
    dragImage.style.border = "0px solid rgba(0,0,0,0.1)";
    dragImage.style.borderRadius = "8px";
    dragImage.style.paddingLeft = "8px";
    dragImage.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
    dragImage.style.pointerEvents = "none";
    dragImage.innerHTML = `
      <img src="${image}" alt="${title}" class="w-8 h-8 rounded-sm" />
      <h2 class="text-[0.9rem] font-bold ml-2">${title}</h2>
    `;
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 50, 25);
    setDragImage(dragImage);

    const moveDragImage = (event) => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 769) {
        dragImage.style.top = `${event.pageY - 25}px`;
        dragImage.style.left = `${event.pageX - 25}px`;
      } else {
        dragImage.style.top = `${event.pageY - 25}px`;
        dragImage.style.left = `${event.pageX - 50}px`;
      }
    };

    document.addEventListener("dragover", moveDragImage);

    e.target.addEventListener(
      "dragend",
      () => {
        document.removeEventListener("dragover", moveDragImage);
        if (dragImage) {
          dragImage.remove();
          setDragImage(null);
        }
      },
      { once: true }
    );
  };

  const handleDragEnd = () => {
    if (dragImage) {
      dragImage.remove();
      setDragImage(null);
    }
    setDraggingCardId(null);
    setDragOverCardId(null);
  };

  const handleDragOver = (e, id) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (id === draggingCardId) return;
    setDragOverCardId(id);
  };

  const handleDrop = (e, id) => {
    e.preventDefault();
    if (id === draggingCardId) return;

    const newCards = [...cards];
    const draggedIndex = newCards.findIndex(
      (card) => card.id === draggingCardId
    );
    const targetIndex = newCards.findIndex((card) => card.id === id);

    const [draggedCard] = newCards.splice(draggedIndex, 1);
    newCards.splice(targetIndex, 0, draggedCard);

    setCards(newCards);
    handleDragEnd();
  };

  return (
    <div className="container mx-auto py-4 w-[80%] sm:w-[60%] lg:w-[50%] xl:w-[45%] bg-white my-4">
      <Head>
        <title>Drag and Drop App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="space-y-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            image={card.image}
            subLocation={card.subLocation}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
            handleDragOver={handleDragOver}
            handleDrop={(e) => handleDrop(e, card.id)}
            isDragging={draggingCardId === card.id}
            isDraggedOver={dragOverCardId === card.id}
          />
        ))}
      </div>
    </div>
  );
}
