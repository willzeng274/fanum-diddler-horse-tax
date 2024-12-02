import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Character: THREE.SkinnedMesh
    Root: THREE.Bone
  }
  materials: {
    Atlas: THREE.MeshStandardMaterial
  }
}

type ActionName =
  | 'CharacterArmature|CharacterArmature|CharacterArmature|Death'
  | 'CharacterArmature|CharacterArmature|CharacterArmature|Duck'
  | 'CharacterArmature|CharacterArmature|CharacterArmature|HitReact'
  | 'CharacterArmature|CharacterArmature|CharacterArmature|Idle'
  | 'CharacterArmature|CharacterArmature|CharacterArmature|Idle_Attack'
  | 'CharacterArmature|CharacterArmature|CharacterArmature|Idle_Hold'
  | 'CharacterArmature|CharacterArmature|CharacterArmature|Jump'
  | 'CharacterArmature|CharacterArmature|CharacterArmature|Jump_Idle'
  | 'CharacterArmature|CharacterArmature|CharacterArmature|Jump_Land'
  | 'CharacterArmature|CharacterArmature|CharacterArmature|No'
  | 'CharacterArmature|CharacterArmature|CharacterArmature|Punch'
  | 'CharacterArmature|CharacterArmature|CharacterArmature|Run'
  | 'CharacterArmature|CharacterArmature|CharacterArmature|Run_Attack'
  | 'CharacterArmature|CharacterArmature|CharacterArmature|Run_Hold'
  | 'CharacterArmature|CharacterArmature|CharacterArmature|Walk'
  | 'CharacterArmature|CharacterArmature|CharacterArmature|Walk_Hold'
  | 'CharacterArmature|CharacterArmature|CharacterArmature|Wave'
  | 'CharacterArmature|CharacterArmature|CharacterArmature|Yes'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export function dude(props: any) {
  const group = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF('/Cube Guy Character.glb') as GLTFResult
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Root_Scene">
        <group name="RootNode">
          <group name="CharacterArmature" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <primitive object={nodes.Root} />
          </group>
          <skinnedMesh
            name="Character"
            geometry={nodes.Character.geometry}
            material={materials.Atlas}
            skeleton={nodes.Character.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('dude.glb')