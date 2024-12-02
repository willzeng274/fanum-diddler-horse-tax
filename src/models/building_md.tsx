import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    large_buildingF_1: THREE.Mesh
    large_buildingF_1_1: THREE.Mesh
    large_buildingF_1_2: THREE.Mesh
    large_buildingF_1_3: THREE.Mesh
    large_buildingF_1_4: THREE.Mesh
  }
  materials: {
    border: THREE.MeshStandardMaterial
    _defaultMat: THREE.MeshStandardMaterial
    door: THREE.MeshStandardMaterial
    window: THREE.MeshStandardMaterial
    roof: THREE.MeshStandardMaterial
  }
}

export function BuildingMd(props: any) {
  const { nodes, materials } = useGLTF('/building_md.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.large_buildingF_1.geometry}
        material={materials.border}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.large_buildingF_1_1.geometry}
        material={materials._defaultMat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.large_buildingF_1_2.geometry}
        material={materials.door}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.large_buildingF_1_3.geometry}
        material={materials.window}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.large_buildingF_1_4.geometry}
        material={materials.roof}
      />
    </group>
  )
}

useGLTF.preload('/building_md.glb')