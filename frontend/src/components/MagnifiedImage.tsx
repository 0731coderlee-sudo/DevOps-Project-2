"use client";

import React, { useState, useRef, MouseEvent, TouchEvent } from "react";
import Image, { ImageProps } from "next/image";

interface MagnifiedImageProps extends Omit<ImageProps, "className"> {
    zoomLevel?: number;
    className?: string;
}

export default function MagnifiedImage({
    src,
    alt,
    zoomLevel = 2.5,
    className = "",
    ...props
}: MagnifiedImageProps) {
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
    const imgRef = useRef<HTMLImageElement>(null);

    const handleMouseEnter = () => {
        setShowMagnifier(true);
    };

    const handleMouseLeave = () => {
        setShowMagnifier(false);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!imgRef.current) return;

        const { left, top, width, height } = imgRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        setPosition({ x, y });
        setImgSize({ width, height });
    };

    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        e.preventDefault(); // Prevent scrolling while magnifying
        setShowMagnifier(true);
        updateTouchPosition(e);
    };

    const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
        updateTouchPosition(e);
    };

    const handleTouchEnd = () => {
        setShowMagnifier(false);
    };

    const updateTouchPosition = (e: TouchEvent<HTMLDivElement>) => {
        if (!imgRef.current || e.touches.length === 0) return;

        const { left, top, width, height } = imgRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - left;
        const y = touch.clientY - top;

        // Check if touch is within image bounds
        if (x >= 0 && x <= width && y >= 0 && y <= height) {
            setPosition({ x, y });
            setImgSize({ width, height });
        } else {
            setShowMagnifier(false);
        }
    };

    // Magnifier size
    const magnifierSize = 150;

    return (
        <div
            className={`relative inline-block overflow-hidden cursor-crosshair ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <Image
                ref={imgRef}
                src={src}
                alt={alt}
                className="block w-full h-auto"
                {...props}
            />

            {showMagnifier && (
                <div
                    style={{
                        position: "absolute",
                        pointerEvents: "none",
                        height: `${magnifierSize}px`,
                        width: `${magnifierSize}px`,
                        top: `${position.y - magnifierSize / 2}px`,
                        left: `${position.x - magnifierSize / 2}px`,
                        opacity: "1",
                        border: "1px solid lightgray",
                        backgroundColor: "white",
                        backgroundImage: `url('${typeof src === "string" ? src : ""}')`, // Note: This assumes src is a string URL. If it's a static import, this might need adjustment.
                        backgroundRepeat: "no-repeat",
                        backgroundSize: `${imgSize.width * zoomLevel}px ${imgSize.height * zoomLevel
                            }px`,
                        backgroundPositionX: `${-position.x * zoomLevel + magnifierSize / 2}px`,
                        backgroundPositionY: `${-position.y * zoomLevel + magnifierSize / 2}px`,
                        borderRadius: "50%",
                        boxShadow: "0 0 10px rgba(0,0,0,0.25)",
                        zIndex: 50,
                    }}
                />
            )}
        </div>
    );
}
