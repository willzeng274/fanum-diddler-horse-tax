import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    group608660897: THREE.Mesh
    group1204059893: THREE.Mesh
    group841063562: THREE.Mesh
    group153087096: THREE.Mesh
    group1835225068: THREE.Mesh
    group1016547447: THREE.Mesh
    group1622200872: THREE.Mesh
    group1851563766: THREE.Mesh
    group1567181315: THREE.Mesh
    group820961849: THREE.Mesh
    group1246398489: THREE.Mesh
    group871577473: THREE.Mesh
    group2135879951: THREE.Mesh
    group1208972114: THREE.Mesh
    group944352548: THREE.Mesh
    group970152486: THREE.Mesh
    group260323638: THREE.Mesh
    group2009348988: THREE.Mesh
    group1090509279: THREE.Mesh
    group678170416: THREE.Mesh
    group149604568: THREE.Mesh
  }
  materials: {
    mat21: THREE.MeshStandardMaterial
    mat22: THREE.MeshStandardMaterial
    mat23: THREE.MeshStandardMaterial
  }
}

export function Table(props: any) {
  const { nodes, materials } = useGLTF('/table.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group608660897.geometry}
        material={materials.mat21}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1204059893.geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group841063562.geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group153087096.geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1835225068.geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1016547447.geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1622200872.geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1851563766.geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1567181315.geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group820961849.geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1246398489.geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group871577473.geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group2135879951.geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1208972114.geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group944352548.geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group970152486.geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group260323638.geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group2009348988.geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1090509279.geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group678170416.geometry}
        material={materials.mat23}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group149604568.geometry}
        material={materials.mat23}
      />
    </group>
  )
}

useGLTF.preload('/table.glb')