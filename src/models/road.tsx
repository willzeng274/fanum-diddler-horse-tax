import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Road: THREE.Mesh
  }
  materials: {
    Mat: THREE.MeshStandardMaterial
  }
}

export function Road(props: any) {
  const { nodes, materials } = useGLTF('/Road.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Road.geometry} material={materials.Mat} />
    </group>
  )
}

useGLTF.preload('/Road.glb')