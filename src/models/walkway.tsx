import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    ['walkway-stone']: THREE.Mesh
  }
  materials: {
    ['Texture-base.014']: THREE.MeshStandardMaterial
  }
}

export function Walkway(props: any) {
  const { nodes, materials } = useGLTF('/walkway.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['walkway-stone'].geometry}
        material={materials['Texture-base.014']}
        scale={100}
      />
    </group>
  )
}

useGLTF.preload('/walkway.glb')