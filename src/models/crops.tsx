import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Farm_Dirt_Level3_1: THREE.Mesh
    Farm_Dirt_Level3_2: THREE.Mesh
    Farm_Dirt_Level3_3: THREE.Mesh
    Farm_Dirt_Level3_4: THREE.Mesh
    Farm_Dirt_Level3_5: THREE.Mesh
    Farm_Dirt_Level3_6: THREE.Mesh
  }
  materials: {
    Dirt: THREE.MeshStandardMaterial
    Lettuce: THREE.MeshStandardMaterial
    Red: THREE.MeshStandardMaterial
    Green: THREE.MeshStandardMaterial
    Orange: THREE.MeshStandardMaterial
    Watermelon_DarkGreen: THREE.MeshStandardMaterial
  }
}

export function Crops(props: any) {
  const { nodes, materials } = useGLTF('/Crops.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Farm_Dirt_Level3_1.geometry}
          material={materials.Dirt}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Farm_Dirt_Level3_2.geometry}
          material={materials.Lettuce}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Farm_Dirt_Level3_3.geometry}
          material={materials.Red}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Farm_Dirt_Level3_4.geometry}
          material={materials.Green}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Farm_Dirt_Level3_5.geometry}
          material={materials.Orange}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Farm_Dirt_Level3_6.geometry}
          material={materials.Watermelon_DarkGreen}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/Crops.glb')