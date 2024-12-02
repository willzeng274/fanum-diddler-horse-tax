import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    ['OpenBarn_Cube045-Mesh']: THREE.Mesh
    ['OpenBarn_Cube045-Mesh_1']: THREE.Mesh
    ['OpenBarn_Cube045-Mesh_2']: THREE.Mesh
    ['OpenBarn_Cube045-Mesh_3']: THREE.Mesh
    ['OpenBarn_Cube045-Mesh_4']: THREE.Mesh
  }
  materials: {
    DarkRed: THREE.MeshStandardMaterial
    White: THREE.MeshStandardMaterial
    LightRed: THREE.MeshStandardMaterial
    Brown: THREE.MeshStandardMaterial
    RoofBlack: THREE.MeshStandardMaterial
  }
}

export function Barn(props: any) {
  const { nodes, materials } = useGLTF('/barn.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['OpenBarn_Cube045-Mesh'].geometry}
        material={materials.DarkRed}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['OpenBarn_Cube045-Mesh_1'].geometry}
        material={materials.White}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['OpenBarn_Cube045-Mesh_2'].geometry}
        material={materials.LightRed}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['OpenBarn_Cube045-Mesh_3'].geometry}
        material={materials.Brown}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['OpenBarn_Cube045-Mesh_4'].geometry}
        material={materials.RoofBlack}
      />
    </group>
  )
}

useGLTF.preload('/barn.glb')