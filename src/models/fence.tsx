import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
    nodes: {
        Fence: THREE.Mesh
    }
    materials: {
        Wood: THREE.MeshStandardMaterial
    }
}

export function Fence(props: any) {
    const { nodes, materials } = useGLTF('/Fence.glb') as GLTFResult
    materials.Wood.emissive = new THREE.Color(0xFFFFFF);
    materials.Wood.emissiveIntensity = 0.02;
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Fence.geometry}
                material={materials.Wood}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={100}
            />
        </group>
    )
}

useGLTF.preload('/Fence.glb')