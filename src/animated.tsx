import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useHorseStore, { Horse, useFoodStore } from './store';
// import { MathUtils } from 'three';

function playAudio(audioPath: string) {
    console.log("Playing audio")
    const audio = new Audio(audioPath);
    audio.play();
}

const Animated = ({ Component, horse }: { Component: React.ComponentType<any>, horse: Horse }) => {
    const FRAME_DURATION = 2000; // Change this value to adjust frame duration (in milliseconds)
    const SERVE_FRAME_DURATION = 800; // Change this value to adjust frame duration for served horses (in milliseconds)
    const [action, setAction] = useState("Walk");
    const [position, setPosition] = useState([-18, 0, -6]);
    const [rotation, setRotation] = useState([0, 0, 0]);
    const daveRef = useRef<THREE.Mesh | undefined>();
    const startTimeRef = useRef(0);
    const currentFrameRef = useRef(0);
    const prevIndex = useRef(horse.index);
    const needsToTransition = useRef(false);
    const isDoneAnimating = useRef(false);
    const getFrames = useHorseStore((state) => state.getFrames);
    const getServedFrames = useHorseStore((state) => state.getServedFrames);
    const removeServedHorse = useHorseStore((state) => state.removeServedHorse);
    const setDialogueActive = useHorseStore((state) => state.setDialogueActive);
    const popHorse = useHorseStore((state) => state.popHorse);
    const dialogueActive = useHorseStore((state) => state.dialogueActive);
    const currFood = useHorseStore((state) => state.currFood);
    const regenCurrFoods = useFoodStore((state) => state.regenCurrFoods);
    const clearCurrentFood = useHorseStore((state) => state.clearCurrFood);
    const incrementScore = useHorseStore((state) => state.incrementScore);
    const decrementHeatlh = useHorseStore((state) => state.decrementHealth);
    
    useFrame((state, delta) => {
        if (!startTimeRef.current) startTimeRef.current = state.clock.getElapsedTime();
        if (horse.index < 0) {
            /// startTimeRef should be reset because the horse is not in the queue anymore
            const frames = getServedFrames(horse.id, horse.index);
            if (!frames) return;
            const elapsed = (state.clock.getElapsedTime() - startTimeRef.current) * 1000;
            const frameIndex = Math.floor(elapsed / SERVE_FRAME_DURATION);
            if (frameIndex < frames.length - 1) {
                const alpha = (elapsed % SERVE_FRAME_DURATION) / SERVE_FRAME_DURATION;
                const currentFrame = frames[frameIndex];
                const nextFrame = frames[frameIndex + 1];
                if (daveRef.current) {
                    const newPos = currentFrame.position.map((start, i) => 
                        THREE.MathUtils.lerp(start, nextFrame.position[i], alpha)
                    );
                    const newRot = currentFrame.rotation.map((start, i) => 
                        THREE.MathUtils.lerp(start, nextFrame.rotation[i], alpha)
                    );
                    setAction(currentFrame.action);
                    
                    daveRef.current.position.set(newPos[0], newPos[1], newPos[2]);
                    daveRef.current.rotation.set(newRot[0], newRot[1], newRot[2]);
                    
                    if (frameIndex !== currentFrameRef.current) {
                        currentFrameRef.current = frameIndex;
                        // setAction(currentFrame.action);
                    }
                }
            } else if (frameIndex === frames.length - 1) {
                // clean itself
                // console.log("Removing served horse", horse.id);
                removeServedHorse(horse.id);
            }
            return;
        }
        const frames = getFrames(horse.id);
        if (!frames) return;
        if (prevIndex.current !== horse.index) {
            prevIndex.current = horse.index;
            // since index is updated, we need to play the last frame
            startTimeRef.current = state.clock.getElapsedTime() - 5.999;
            // console.log("UPDATED", startTimeRef.current);
            needsToTransition.current = true;
            return;
        }
        const elapsed = (state.clock.getElapsedTime() - startTimeRef.current) * 1000;
        const frameIndex = Math.floor(elapsed / FRAME_DURATION);
        // console.log(frameIndex);
        if (frameIndex < frames.length - 1) {
            const alpha = (elapsed % FRAME_DURATION) / FRAME_DURATION;
            const currentFrame = frames[frameIndex];
            const nextFrame = frames[frameIndex + 1];
            
            if (daveRef.current) {
                const newPos = currentFrame.position.map((start, i) => 
                    THREE.MathUtils.lerp(start, nextFrame.position[i], alpha)
                );
                const newRot = currentFrame.rotation.map((start, i) => 
                    THREE.MathUtils.lerp(start, nextFrame.rotation[i], alpha)
                );
                
                daveRef.current.position.set(newPos[0], newPos[1], newPos[2]);
                daveRef.current.rotation.set(newRot[0], newRot[1], newRot[2]);
                
                if (frameIndex !== currentFrameRef.current) {
                    currentFrameRef.current = frameIndex;
                    // console.log("Setting action to", currentFrame.action);
                    setAction(currentFrame.action);
                }
            }
        } else if (frameIndex === frames.length - 1) {
            // being in the last frame means u are done animating
            if (horse.index === 0) isDoneAnimating.current = true;
            const currentFrame = frames[frameIndex];
            if (daveRef.current) {
                // if needsToTransition is true, we need to move from current position to the new last frame. We will set it to true after the last frame is played
                if (needsToTransition.current) {
                    // console.log("Needs to transition");
                    setAction("Walk");
                    // constant speed until you reach the destination, then just set the position
                    const speed = delta * 3;
                    const newPos = daveRef.current.position.toArray().map((start, i) => 
                        start + Math.sign(currentFrame.position[i] - start) * speed
                    );
                    // get newRot x, y, z into a single array and update
                    const newRot = [daveRef.current.rotation.x, daveRef.current.rotation.y, daveRef.current.rotation.z].map((start, i) => 
                        start + Math.sign(currentFrame.rotation[i] - start) * speed
                    );

                    // if newPos exceeds the destination, we need to snap it to the destination
                    if (Math.sign(currentFrame.position[0] - newPos[0]) !== Math.sign(currentFrame.position[0] - daveRef.current.position.x)) {
                        newPos[0] = currentFrame.position[0];
                    }
                    if (Math.sign(currentFrame.position[1] - newPos[1]) !== Math.sign(currentFrame.position[1] - daveRef.current.position.y)) {
                        newPos[1] = currentFrame.position[1];
                    }
                    if (Math.sign(currentFrame.position[2] - newPos[2]) !== Math.sign(currentFrame.position[2] - daveRef.current.position.z)) {
                        newPos[2] = currentFrame.position[2];
                    }
                    // if newRot exceeds the destination, we need to snap it to the destination
                    if (Math.sign(currentFrame.rotation[0] - newRot[0]) !== Math.sign(currentFrame.rotation[0] - daveRef.current.rotation.x)) {
                        newRot[0] = currentFrame.rotation[0];
                    }
                    if (Math.sign(currentFrame.rotation[1] - newRot[1]) !== Math.sign(currentFrame.rotation[1] - daveRef.current.rotation.y)) {
                        newRot[1] = currentFrame.rotation[1];
                    }
                    if (Math.sign(currentFrame.rotation[2] - newRot[2]) !== Math.sign(currentFrame.rotation[2] - daveRef.current.rotation.z)) {
                        newRot[2] = currentFrame.rotation[2];
                    }
                    // if newPos is equal to the destination, we need to stop the transition
                    if (newPos[0] === currentFrame.position[0] && newPos[1] === currentFrame.position[1] && newPos[2] === currentFrame.position[2]) {
                        needsToTransition.current = false;
                        setAction("Idle");
                        // ignore rotation transition, directly set to frame rotation
                        daveRef.current.rotation.set(currentFrame.rotation[0], currentFrame.rotation[1], currentFrame.rotation[2]);
                    }

                    daveRef.current.position.set(newPos[0], newPos[1], newPos[2]);
                    setPosition(newPos);
                }
                if (frameIndex !== currentFrameRef.current) {
                    currentFrameRef.current = frameIndex;
                    // console.log("Setting action to", currentFrame.action);
                    setAction(currentFrame.action);
                }
            }
        } else if (daveRef.current) {
            if (needsToTransition.current) {
                const currentFrame = frames[frames.length - 1];
                // console.log("Needs to transition");
                setAction("Walk");
                // constant speed until you reach the destination, then just set the position
                const speed = delta * 3;
                const newPos = daveRef.current.position.toArray().map((start, i) => 
                    start + Math.sign(currentFrame.position[i] - start) * speed
                );
                // get newRot x, y, z into a single array and update
                const newRot = [daveRef.current.rotation.x, daveRef.current.rotation.y, daveRef.current.rotation.z].map((start, i) => 
                    start + Math.sign(currentFrame.rotation[i] - start) * speed
                );

                // if newPos exceeds the destination, we need to snap it to the destination
                if (Math.sign(currentFrame.position[0] - newPos[0]) !== Math.sign(currentFrame.position[0] - daveRef.current.position.x)) {
                    newPos[0] = currentFrame.position[0];
                }
                if (Math.sign(currentFrame.position[1] - newPos[1]) !== Math.sign(currentFrame.position[1] - daveRef.current.position.y)) {
                    newPos[1] = currentFrame.position[1];
                }
                if (Math.sign(currentFrame.position[2] - newPos[2]) !== Math.sign(currentFrame.position[2] - daveRef.current.position.z)) {
                    newPos[2] = currentFrame.position[2];
                }
                // if newRot exceeds the destination, we need to snap it to the destination
                if (Math.sign(currentFrame.rotation[0] - newRot[0]) !== Math.sign(currentFrame.rotation[0] - daveRef.current.rotation.x)) {
                    newRot[0] = currentFrame.rotation[0];
                }
                if (Math.sign(currentFrame.rotation[1] - newRot[1]) !== Math.sign(currentFrame.rotation[1] - daveRef.current.rotation.y)) {
                    newRot[1] = currentFrame.rotation[1];
                }
                if (Math.sign(currentFrame.rotation[2] - newRot[2]) !== Math.sign(currentFrame.rotation[2] - daveRef.current.rotation.z)) {
                    newRot[2] = currentFrame.rotation[2];
                }
                // if newPos is equal to the destination, we need to stop the transition
                if (newPos[0] === currentFrame.position[0] && newPos[1] === currentFrame.position[1] && newPos[2] === currentFrame.position[2]) {
                    needsToTransition.current = false;
                    setAction("Idle");
                    // ignore rotation transition, directly set to frame rotation
                    daveRef.current.rotation.set(currentFrame.rotation[0], currentFrame.rotation[1], currentFrame.rotation[2]);
                }

                daveRef.current.position.set(newPos[0], newPos[1], newPos[2]);
                setPosition(newPos);
            } else {
                // console.log("Done animating");
                if (horse.index === 0) isDoneAnimating.current = true;
            }
        } else {
            // console.log("Done animating");
            if (horse.index === 0) isDoneAnimating.current = true;
        }
    });

    return (
        <Component
            ref={daveRef}
            action={horse.horseType === "Dolly" ? (action === "Eating") ? "Idle_Eating" : action : action}
            position={position}
            scale={horse.horseType === "Dolly" ? 0.8 : 0.5}
            rotation={rotation}
            onClick={() => {
                if (horse.index === 0) {
                    // serve food
                    if (!isDoneAnimating.current) return;
                    // console.log("Set dialogue active");
                    if (!dialogueActive) {
                        setDialogueActive(true);
                    } else if (currFood !== undefined) {
                        regenCurrFoods();
                        clearCurrentFood();
                        setAction("Eating");
                        setTimeout(() => {
                            if (horse.restriction === currFood || horse.restriction === "NORMAL") {
                                // pop the horse
                                // depending on the restriction, the horse will have different fate
                                incrementScore();
                                popHorse(-3);
                            } else {
                                // pop the horse
                                // depending on the restriction, the horse will have different fate
                                decrementHeatlh();
                                playAudio("/incorrect_buzzer.mp3");
                                switch (horse.restriction) {
                                    case "GLUTEN":
                                        popHorse(-1);
                                        break;
                                    case "LACTOSE":
                                        popHorse(-1);
                                        break;
                                    case "VEGAN":
                                        const chance3 = Math.random() > 0.8;
                                        if (chance3) {
                                            popHorse(-2);
                                        } else {
                                            popHorse(-1);
                                        }
                                        break;
                                    case "VEGETARIAN":
                                        const chance4 = Math.random() > 0.8;
                                        if (chance4) {
                                            popHorse(-2);
                                        } else {
                                            popHorse(-1);
                                        }
                                        break;
                                    case "HALAL":
                                        popHorse(-1);
                                        break;
                                    case "NUT":
                                        const chance6 = Math.random() > 0.1;
                                        if (chance6) {
                                            popHorse(-2);
                                        } else {
                                            popHorse(-1);
                                        }
                                        break;
                                }
                            }
                        }, 2500);
                    }
                }
            }}
        />
    );
};

export default Animated;