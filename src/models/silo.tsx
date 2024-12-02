import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    ['Silo_Cylinder007-Mesh']: THREE.Mesh
    ['Silo_Cylinder007-Mesh_1']: THREE.Mesh
    ['Silo_Cylinder007-Mesh_2']: THREE.Mesh
    ['Silo_Cylinder007-Mesh_3']: THREE.Mesh
    ['Silo_Cylinder007-Mesh_4']: THREE.Mesh
  }
  materials: {
    LightRed: THREE.MeshStandardMaterial
    White: THREE.MeshStandardMaterial
    DarkRed: THREE.MeshStandardMaterial
    Brown: THREE.MeshStandardMaterial
    Grey: THREE.MeshStandardMaterial
  }
}

export function Silo(props: any) {
  const { nodes, materials } = useGLTF('/Silo.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Silo_Cylinder007-Mesh'].geometry}
        material={materials.LightRed}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Silo_Cylinder007-Mesh_1'].geometry}
        material={materials.White}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Silo_Cylinder007-Mesh_2'].geometry}
        material={materials.DarkRed}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Silo_Cylinder007-Mesh_3'].geometry}
        material={materials.Brown}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Silo_Cylinder007-Mesh_4'].geometry}
        material={materials.Grey}
      />
    </group>
  )
}

useGLTF.preload('/Silo.glb')