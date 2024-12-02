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
  | "NORMAL"
  | "GLUTEN"
  | "LACTOSE"
  | "VEGAN"
  | "VEGETARIAN"
  | "HALAL"
  | "NUT";
//   | "KOSHER";

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
    NORMAL: [
      {
        name: "Normal",
        restriction: "NORMAL",
      },
    ],
    GLUTEN: [
      {
        name: "Gluten",
        restriction: "GLUTEN",
      },
    ],
    LACTOSE: [
      {
        name: "Lactose",
        restriction: "LACTOSE",
      },
    ],
    VEGAN: [
      {
        name: "Vegan",
        restriction: "VEGAN",
      },
    ],
    VEGETARIAN: [
      {
        name: "Vegetarian",
        restriction: "VEGETARIAN",
      },
    ],
    HALAL: [
      {
        name: "Halal",
        restriction: "HALAL",
      },
    ],
    NUT: [
      {
        name: "Nut",
        restriction: "NUT",
      },
    ],
    // KOSHER: [
    //   {
    //     name: "Kosher",
    //     restriction: "KOSHER",
    //   },
    // ],
  },
  setFoods: (foods: { [K in Restriction]: Food[] }) => set({ foods }),
  currFoods: {
    NORMAL: {
      name: "Normal",
      restriction: "NORMAL",
    },
    GLUTEN: {
      name: "Gluten-free",
      restriction: "GLUTEN",
    },
    LACTOSE: {
      name: "Lactose",
      restriction: "LACTOSE",
    },
    VEGAN: {
      name: "Vegan",
      restriction: "VEGAN",
    },
    VEGETARIAN: {
      name: "Vegetarian",
      restriction: "VEGETARIAN",
    },
    HALAL: {
      name: "Halal",
      restriction: "HALAL",
    },
    NUT: {
      name: "Nut-free",
      restriction: "NUT",
    },
    // KOSHER: {
    //   name: "Kosher",
    //   restriction: "KOSHER",
    // },
  },
  regenCurrFoods: () =>
    set((state) => ({
      currFoods: {
        NORMAL:
          state.foods["NORMAL"][
            Math.floor(Math.random() * state.foods["NORMAL"].length)
          ],
        GLUTEN:
          state.foods["GLUTEN"][
            Math.floor(Math.random() * state.foods["GLUTEN"].length)
          ],
        LACTOSE:
          state.foods["LACTOSE"][
            Math.floor(Math.random() * state.foods["LACTOSE"].length)
          ],
        VEGAN:
          state.foods["VEGAN"][
            Math.floor(Math.random() * state.foods["VEGAN"].length)
          ],
        VEGETARIAN:
          state.foods["VEGETARIAN"][
            Math.floor(Math.random() * state.foods["VEGETARIAN"].length)
          ],
        HALAL:
          state.foods["HALAL"][
            Math.floor(Math.random() * state.foods["HALAL"].length)
          ],
        NUT: state.foods["NUT"][
          Math.floor(Math.random() * state.foods["NUT"].length)
        ],
        // KOSHER:
        //   state.foods["KOSHER"][
        //     Math.floor(Math.random() * state.foods["KOSHER"].length)
        //   ],
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
  popHorse: (fate: -1 | -2 | -3) => void;
  removeServedHorse: (id: string) => void;
  setCurrFood: (food: Restriction) => void;
  clearCurrFood: () => void;
}

const useHorseStore = create<HorsesStore>((set) => ({
  health: 5,
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
        const frames1: HorseFrame[] = [
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
        return frames1;
      // break;
      case -2:
        const frames2: HorseFrame[] = [
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
        return frames2;
      // break;
      case -3:
        const frames3: HorseFrame[] = [
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
        return frames3;
      // break;
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
            "NORMAL",
            "GLUTEN",
            "LACTOSE",
            "VEGAN",
            "VEGETARIAN",
            "HALAL",
            "NUT",
            // KOSHER is no longer a restriction
            // "KOSHER",
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
  popHorse: (fate: -1 | -2 | -3) => {
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
