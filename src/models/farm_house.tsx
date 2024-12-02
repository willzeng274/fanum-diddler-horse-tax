import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
    nodes: {
        FarmHouse_Mesh: THREE.Mesh
    }
    materials: {
        FarmHouse_Mat: THREE.MeshStandardMaterial
    }
}

export function FarmHouse(props: any) {
    const { nodes, materials } = useGLTF('/farm_house.glb') as GLTFResult
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.FarmHouse_Mesh.geometry}
                material={materials.FarmHouse_Mat}
            />
        </group>
    )
}

useGLTF.preload('/farm_house.glb')