import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Haystack_mesh: THREE.Mesh
  }
  materials: {
    lambert2SG: THREE.MeshStandardMaterial
  }
}

export function Haystack(props: any) {
  const { nodes, materials } = useGLTF('/Haystack.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Haystack_mesh.geometry}
        material={materials.lambert2SG}
      />
    </group>
  )
}

useGLTF.preload('/Haystack.glb')