import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    large_buildingA_1: THREE.Mesh
    large_buildingA_1_1: THREE.Mesh
    large_buildingA_1_2: THREE.Mesh
    large_buildingA_1_3: THREE.Mesh
  }
  materials: {
    border: THREE.MeshStandardMaterial
    _defaultMat: THREE.MeshStandardMaterial
    window: THREE.MeshStandardMaterial
    door: THREE.MeshStandardMaterial
  }
}

export function BuildingLg(props: any) {
  const { nodes, materials } = useGLTF('/building_lg.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.large_buildingA_1.geometry}
        material={materials.border}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.large_buildingA_1_1.geometry}
        material={materials._defaultMat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.large_buildingA_1_2.geometry}
        material={materials.window}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.large_buildingA_1_3.geometry}
        material={materials.door}
      />
    </group>
  )
}

useGLTF.preload('/building_lg.glb')