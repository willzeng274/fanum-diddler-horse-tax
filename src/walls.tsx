import { Wall } from "./models/wall";

export default function Walls(props: any) {
    return (
        <group {...props} dispose={null}>
            {/* 2 per tile */}
            <Wall position={[1, 0, 4.5]} />
            <Wall position={[1, 2, 4.5]} />
            <Wall position={[-1, 0, 4.5]} />
            <Wall position={[-1, 2, 4.5]} />
            <Wall position={[3, 0, 4.5]} />
            <Wall position={[3, 2, 4.5]} />
            {/* modify the 3rd position, -2 every tile */}
            <Wall position={[4, 0, 3.3]} rotation={[0, Math.PI / 2, 0]} />
            <Wall position={[4, 2, 3.3]} rotation={[0, Math.PI / 2, 0]} />
            <Wall position={[4, 0, 1.3]} rotation={[0, Math.PI / 2, 0]} />
            <Wall position={[4, 2, 1.3]} rotation={[0, Math.PI / 2, 0]} />
            <Wall position={[4, 0, -0.7]} rotation={[0, Math.PI / 2, 0]} />
            <Wall position={[4, 2, -0.7]} rotation={[0, Math.PI / 2, 0]} />
            <Wall position={[4, 0, -2.7]} rotation={[0, Math.PI / 2, 0]} />
            <Wall position={[4, 2, -2.7]} rotation={[0, Math.PI / 2, 0]} />
            <Wall position={[4, 2, -4.7]} rotation={[0, Math.PI / 2, 0]} />
            <Wall position={[4, 0, -4.7]} rotation={[0, Math.PI / 2, 0]} />
            {/* 2 per title */}
            <Wall position={[1, 0, -4.5]} />
            <Wall position={[1, 2, -4.5]} />
            <Wall position={[-1, 0, -4.5]} />
            <Wall position={[-1, 2, -4.5]} />
            <Wall position={[3, 0, -4.5]} />
            <Wall position={[3, 2, -4.5]} />

            <Wall position={[-5.02, 0, 5]} rotation={[0, Math.PI / 2, 0]} />
            <Wall position={[-5.02, 2, 5]} rotation={[0, Math.PI / 2, 0]} />
            <Wall position={[-4, 2, 6.2]} rotation={[0, 0, 0]} />
            <Wall position={[-4, 0, 6.2]} rotation={[0, 0, 0]} />
            <Wall position={[-2, 2, 6.2]} rotation={[0, 0, 0]} />
            <Wall position={[-2, 0, 6.2]} rotation={[0, 0, 0]} />




        </group>
    );
}