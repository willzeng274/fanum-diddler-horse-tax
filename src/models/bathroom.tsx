import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    ['Bathroom_Details_Signs-Toilet_01']: THREE.Mesh
  }
  materials: {
    ['Metal-Simple-Marked_01']: THREE.MeshStandardMaterial
  }
}

export function BathroomSign(props: any) {
  const { nodes, materials } = useGLTF('/Bathroom_Details_Signs-Toilet_01.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Bathroom_Details_Signs-Toilet_01'].geometry}
        material={materials['Metal-Simple-Marked_01']}
        position={[0.584, 0.001, 0]}
      />
    </group>
  )
}

useGLTF.preload('/Bathroom_Details_Signs-Toilet_01.glb')