import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
    nodes: {
        Wall_1: THREE.Mesh
        Wall_2: THREE.Mesh
    }
    materials: {
        Highlights: THREE.MeshStandardMaterial
        Main: THREE.MeshStandardMaterial
    }
}

export function Wall(props: any) {
    const { nodes, materials } = useGLTF('/wall.glb') as GLTFResult
    materials.Highlights.emissive = new THREE.Color(0xFFFFFF);
    materials.Highlights.emissiveIntensity = 0.05;
    // materials.Highlights.color = new THREE.Color(0xFFFFFF);
    materials.Main.emissive = new THREE.Color(0xFFFFFF);
    materials.Main.emissiveIntensity = 0.05;
    // materials.Main.color = new THREE.Color(0xFFFFFF);
    return (
        <group {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Wall_1.geometry}
                    material={materials.Highlights}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Wall_2.geometry}
                    material={materials.Main}
                />
            </group>
        </group>
    )
}

useGLTF.preload('/wall.glb')