import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Cinema_mesh: THREE.Mesh
  }
  materials: {
    blinn1SG: THREE.MeshStandardMaterial
  }
}

export function Cinema(props: any) {
  const { nodes, materials } = useGLTF('/Cinema.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cinema_mesh.geometry}
        material={materials.blinn1SG}
      />
    </group>
  )
}

useGLTF.preload('/Cinema.glb')