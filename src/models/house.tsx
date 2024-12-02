import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    house: THREE.Mesh
  }
  materials: {
    None: THREE.MeshStandardMaterial
  }
}

export function House(props: any) {
  const { nodes, materials } = useGLTF('/House.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.house.geometry} material={materials.None} />
    </group>
  )
}

useGLTF.preload('/House.glb')