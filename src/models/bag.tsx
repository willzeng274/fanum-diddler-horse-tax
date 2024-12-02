import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    bag: THREE.Mesh
  }
  materials: {
    brownLight: THREE.MeshStandardMaterial
  }
}

export function bag(props: any) {
  const { nodes, materials } = useGLTF('/bag.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bag.geometry}
        material={materials.brownLight}
      />
    </group>
  )
}

useGLTF.preload('/bag.glb')