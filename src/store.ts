import { create } from "zustand";
// import { MutableRefObject } from "react";
// import * as THREE from "three";
import { v4 as uuid } from "uuid";
import Dave from "./horses/dave";
// import Dan from "./horses/dan";
import Dolly from "./horses/dolly";
import Denis from "./horses/denis";

export interface HorseFrame {
  position: [number, number, number];
  rotation: [number, number, number];
  action: string;
  duration: number;
}

export type Restriction =
  | "GRIMANCE NUTS"
  | "SKIBIDI PIE"
  | "LUNCHLY"
  | "LIVVY DUNNE CHIPS"
  | "MEWING STEAK"
  | "GLIZZY"
  | "BETA TO SIGMA SANDWICH";
//   | "SUSSY 69420 WRAP";

export interface Food {
  name: string;
  restriction: Restriction;
}

export interface FoodStore {
  foods: {
    [K in Restriction]: Food[];
  };
  setFoods: (foods: { [K in Restriction]: Food[] }) => void;
  currFoods: {
    [K in Restriction]: Food;
  };
  regenCurrFoods: () => void;
}

const useFoodStore = create<FoodStore>((set) => ({
  foods: {
    "BETA TO SIGMA SANDWICH": [
      {
        name: "Beta to Sigma Sandwich",
        restriction: "BETA TO SIGMA SANDWICH",
      },
    ],
    "GRIMANCE NUTS": [
      {
        name: "Grimance Nuts",
        restriction: "GRIMANCE NUTS",
      },
    ],
    "SKIBIDI PIE": [
      {
        name: "Skibidi Pie",
        restriction: "SKIBIDI PIE",
      },
    ],
    "LUNCHLY": [
      {
        name: "Lunchly",
        restriction: "LUNCHLY",
      },
    ],
    "LIVVY DUNNE CHIPS": [
      {
        name: "Livvy Dunne Chips",
        restriction: "LIVVY DUNNE CHIPS",
      },
    ],
    "MEWING STEAK": [
      {
        name: "Mewing Steak",
        restriction: "MEWING STEAK",
      },
    ],
    "GLIZZY": [
      {
        name: "Glizzy",
        restriction: "GLIZZY",
      },
    ],
    // "SUSSY 69420 WRAP": [
    //   {
    //     name: "Sussy 69420 Wrap",
    //     restriction: "SUSSY 69420 WRAP",
    //   },
    // ],
  },
  setFoods: (foods: { [K in Restriction]: Food[] }) => set({ foods }),
  currFoods: {
    "BETA TO SIGMA SANDWICH": {
      name: "Beta to Sigma Sandwich",
      restriction: "BETA TO SIGMA SANDWICH",
    },
    "GRIMANCE NUTS": {
      name: "Grimance Nuts",
      restriction: "GRIMANCE NUTS",
    },
    "SKIBIDI PIE": {
      name: "Skibidi Pie",
      restriction: "SKIBIDI PIE",
    },
    "LUNCHLY": {
      name: "Lunchly",
      restriction: "LUNCHLY",
    },
    "LIVVY DUNNE CHIPS": {
      name: "Livvy Dunne Chips",
      restriction: "LIVVY DUNNE CHIPS",
    },
    "MEWING STEAK": {
      name: "Mewing Steak",
      restriction: "MEWING STEAK",
    },
    "GLIZZY": {
      name: "Glizzy",
      restriction: "GLIZZY",
    },
    // "SUSSY 69420 WRAP": {
    //   name: "Sussy 69420 Wrap",
    //   restriction: "SUSSY 69420 WRAP",
    // },
  },
  regenCurrFoods: () =>
    set((state) => ({
      currFoods: {
        "BETA TO SIGMA SANDWICH":
          state.foods["BETA TO SIGMA SANDWICH"][
            Math.floor(Math.random() * state.foods["BETA TO SIGMA SANDWICH"].length)
          ],
        "GRIMANCE NUTS":
          state.foods["GRIMANCE NUTS"][
            Math.floor(Math.random() * state.foods["GRIMANCE NUTS"].length)
          ],
        "SKIBIDI PIE":
          state.foods["SKIBIDI PIE"][
            Math.floor(Math.random() * state.foods["SKIBIDI PIE"].length)
          ],
        "LUNCHLY":
          state.foods["LUNCHLY"][
            Math.floor(Math.random() * state.foods["LUNCHLY"].length)
          ],
        "LIVVY DUNNE CHIPS":
          state.foods["LIVVY DUNNE CHIPS"][
            Math.floor(Math.random() * state.foods["LIVVY DUNNE CHIPS"].length)
          ],
        "MEWING STEAK":
          state.foods["MEWING STEAK"][
            Math.floor(Math.random() * state.foods["MEWING STEAK"].length)
          ],
        "GLIZZY":
          state.foods["GLIZZY"][
            Math.floor(Math.random() * state.foods["GLIZZY"].length)
          ],
      },
    })),
}));

export { useFoodStore };

export interface Horse {
  id: string;
  index: number;
  restriction: Restriction;
  component: React.ComponentType<any>;
  horseType: "Dave" | "Dolly" | "Denis";
  //   ref: MutableRefObject<
  //     | THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>
  //     | undefined
  //   >;
  frame: HorseFrame;
}

export interface HorsesStore {
  health: number;
  decrementHealth: () => void;
  score: number;
  incrementScore: () => void;
  dialogueActive: boolean;
  setDialogueActive: (active: boolean) => void;
  currFood: Restriction | undefined;
  horses: Horse[];
  servedHorses: Horse[];
  getFrames: (id: string) => HorseFrame[] | undefined;
  getServedFrames: (
    id: string,
    serve_result: number
  ) => HorseFrame[] | undefined;
  queueNewHorse: () => void;
  popHorse: (fate: -1 | -2 | -3 | -4) => void;
  removeServedHorse: (id: string) => void;
  setCurrFood: (food: Restriction) => void;
  clearCurrFood: () => void;
}

const useHorseStore = create<HorsesStore>((set) => ({
  health: 15,
  decrementHealth: () => set((state) => ({ health: state.health - 1 })),
  score: 0,
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  dialogueActive: false,
  setDialogueActive: (active: boolean) => set({ dialogueActive: active }),
  currFood: undefined,
  setCurrFood: (food: Restriction) => set({ currFood: food }),
  clearCurrFood: () => set({ currFood: undefined }),
  horses: [],
  servedHorses: [],
  getServedFrames: (id: string, serve_result: number) => {
    // get current horse index so we know which one it is
    const index: number = useHorseStore
      .getState()
      .servedHorses.findIndex((h) => h.id === id);
    if (index === -1) return undefined;
    // -1 is going to the toilet
    // -2 is dying
    // -3 is walking away peacefully
    switch (serve_result) {
      case -1:
        { const frames1: HorseFrame[] = [
          {
            position: [-4, 0, 0],
            rotation: [0, Math.PI / 2, 0],
            action: "Walk",
            duration: 3000,
          },
          {
            position: [-4, 0, 5],
            rotation: [0, Math.PI / 4, 0],
            action: "Walk",
            duration: 3000,
          },
          {
            position: [2, 0, 5],
            rotation: [0, Math.PI / 2, 0],
            action: "Idle",
            duration: 0,
          },
        ];
        return frames1; }
      // break;
      case -2:
        { const frames2: HorseFrame[] = [
          {
            position: [-4, 0, 0],
            rotation: [0, Math.PI / 2, 0],
            action: "Death",
            duration: 0,
          },
          {
            position: [-4, 0, 0],
            rotation: [0, Math.PI / 2, 0],
            action: "Death",
            duration: 0,
          },
        ];
        return frames2; }
      // break;
      case -3:
        { const frames3: HorseFrame[] = [
          {
            position: [-4, 0, 0],
            rotation: [0, Math.PI / 2, 0],
            action: "Walk",
            duration: 0,
          },
          {
            position: [-4, 0, -4],
            rotation: [0, Math.PI, 0],
            action: "Walk",
            duration: 0,
          },
          {
            position: [-4, 0, -8],
            rotation: [0, Math.PI, 0],
            action: "Walk",
            duration: 0,
          },
          {
            position: [0, 0, -8],
            rotation: [0, Math.PI / 2, 0],
            action: "Walk",
            duration: 0,
          },
        ];
        return frames3; }
      // break;
      case -4:
        { const frames4: HorseFrame[] = [
          {
            position: [-4, 0, 0],
            rotation: [0, Math.PI / 4, 0],
            action: "Walk",
            duration: 0,
          },
          {
            position: [-4, 1, 0],
            rotation: [Math.PI / 2, Math.PI / 2, 0],
            action: "Death",
            duration: 0,
          },
          {
            position: [-4, 2, 0],
            rotation: [0, 3 * Math.PI / 4, Math.PI / 2],
            action: "Death",
            duration: 0,
          },
          {
            position: [-4, 4, 0],
            rotation: [0, Math.PI, 0],
            action: "Death",
            duration: 0,
          },
          {
            position: [-4, 8, 0],
            rotation: [Math.PI / 2, 5 * Math.PI / 4, 0],
            action: "Death",
            duration: 0,
          },
          {
            position: [-4, 14, 0],
            rotation: [0, 3 * Math.PI / 2, 0],
            action: "Death",
            duration: 0,
          },
          {
            position: [-4, 36, 0],
            rotation: [0, 7 * Math.PI / 4, Math.PI / 2],
            action: "Death",
            duration: 0,
          },
          {
            position: [-4, 64, 0],
            rotation: [3 * Math.PI / 2, 0, 0],
            action: "Death",
            duration: 0,
          },
          {
            position: [-4, 80, 0],
            rotation: [0, Math.PI / 2, 0],
            action: "Death",
            duration: 0,
          },
          {
            position: [-4, 100, 0],
            rotation: [0, Math.PI / 2, 0],
            action: "Death",
            duration: 0,
          },
        ];
        return frames4; }
    }
  },
  getFrames: (id: string) => {
    // get current horse index so we know which one it is
    const index: number = useHorseStore
      .getState()
      .horses.findIndex((h) => h.id === id);
    if (index === -1) return undefined;
    const frames: HorseFrame[] = [
      {
        position: [-18, 0, -6],
        rotation: [0, 0, 0],
        action: "Walk",
        duration: 3000,
      },
      {
        position: [-18, 0, 0],
        rotation: [0, Math.PI / 2, 0],
        action: "Walk",
        duration: 3000,
      },
      // the third frame should depend on the current horse queue... it needs to be after the last horse
      // so we calculate its position from the last horse
      {
        position: [-4 + index * -3.5, 0, 0],
        rotation: [0, Math.PI / 2, 0],
        action: "Idle",
        duration: 0,
      },
    ];
    return frames;
  },
  queueNewHorse: () => {
    // cannot queue if there are 3 horses already
    if (useHorseStore.getState().horses.length >= 4) return;
    const seed = Math.floor(Math.random() * 3);
    const component = [Dave, Dolly, Denis][seed];
    const horseType = ["Dave", "Dolly", "Denis"][seed] as
      | "Dave"
      | "Dolly"
      | "Denis";

    set((state) => ({
      horses: [
        ...state.horses,
        {
          id: uuid(),
          // randomly get a restriction
          restriction: [
            "GRIMANCE NUTS",
            "SKIBIDI PIE",
            "LUNCHLY",
            "LIVVY DUNNE CHIPS",
            "MEWING STEAK",
            "GLIZZY",
            "BETA TO SIGMA SANDWICH",
            // "SUSSY 69420 WRAP",
          ][Math.floor(Math.random() * 7)] as Restriction,
          component,
          horseType,
          index: state.horses.length,
          // ref will be set by the component
          // ref: { current: undefined },
          // initial frame
          frame: {
            position: [-18, 0, -6],
            rotation: [0, 0, 0],
            action: "Walk",
            duration: 3000,
          },
        },
      ],
    }));
  },
  removeServedHorse: (id: string) =>
    set((state) => ({
      servedHorses: state.servedHorses.filter((h) => h.id !== id),
    })),
  popHorse: (fate: -1 | -2 | -3 | -4) => {
    set((state) => {
      const [servedHorse, ...horses] = state.horses;
      // update the index of the remaining horses
      const horsesWithNewIndex = horses.map((h, i) => ({
        ...h,
        index: i,
      }));
      const servedHorseWithIndex = {
        ...servedHorse,
        // -1 is going to the toilet
        // -2 is dying
        // -3 is walking away peacefully
        index: fate,
      };
      console.log("updated served horse", servedHorseWithIndex);
      return {
        dialogueActive: false,
        horses: horsesWithNewIndex,
        servedHorses: [...state.servedHorses, servedHorseWithIndex],
      };
    });
  },
}));

export default useHorseStore;
