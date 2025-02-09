
import * as THREE from 'three'
import React, { forwardRef, useEffect, useMemo, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF, SkeletonUtils } from 'three-stdlib'
import { useGraph } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    Horse_1: THREE.SkinnedMesh
    Horse_2: THREE.SkinnedMesh
    Horse_3: THREE.SkinnedMesh
    Horse_4: THREE.SkinnedMesh
    Horse_5: THREE.SkinnedMesh
    Horse_6: THREE.SkinnedMesh
    Horse_7: THREE.SkinnedMesh
    Body: THREE.Bone
    IKBackLegL: THREE.Bone
    IKFrontLegL: THREE.Bone
    IKBackLegR: THREE.Bone
    IKFrontLegR: THREE.Bone
  }
  materials: {
    Main: THREE.MeshStandardMaterial
    Hair: THREE.MeshStandardMaterial
    Muzzle: THREE.MeshStandardMaterial
    Hooves: THREE.MeshStandardMaterial
    Main_Light: THREE.MeshStandardMaterial
    Eye_Black: THREE.MeshStandardMaterial
    Eye_White: THREE.MeshStandardMaterial
  }
}

type ActionName =
  | 'Attack_Headbutt'
  | 'Attack_Kick'
  | 'Death'
  | 'Eating'
  | 'Gallop_Jump'
  | 'Gallop'
  | 'Idle_HitReact_Left'
  | 'Idle_HitReact_Right'
  | 'Jump_toIdle'
  | 'Walk'
  | 'Idle_Headlow'
  | 'Idle_2'
  | 'Idle'
  | 'AnimalArmature|Attack_Headbutt'
  | 'AnimalArmature|Attack_Kick'
  | 'AnimalArmature|Death'
  | 'AnimalArmature|Eating'
  | 'AnimalArmature|Gallop'
  | 'AnimalArmature|Gallop_Jump'
  | 'AnimalArmature|Idle'
  | 'AnimalArmature|Idle_2'
  | 'AnimalArmature|Idle_Headlow'
  | 'AnimalArmature|Idle_HitReact_Left'
  | 'AnimalArmature|Idle_HitReact_Right'
  | 'AnimalArmature|Jump_toIdle'
  | 'AnimalArmature|Walk'

/* add these code to all horse animations */
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

interface MyGLTFResult extends GLTFResult {
  animations: GLTFAction[];
}
/* add these code to all horse animations */

export default forwardRef<THREE.Group>(function Denis(props: any, ref: React.ForwardedRef<THREE.Group>) {
  // const group = useRef<THREE.Group>()
  const { materials, animations, scene } = useGLTF('/denis.glb') as MyGLTFResult
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes }: { nodes: any } = useGraph(clone);
  const { actions } = useAnimations(animations, ref as React.MutableRefObject<THREE.Group>);
  const [action, setAction] = React.useState<ActionName>('Idle');

  function transitionTo(nextActionKey: ActionName, duration = 1) {
      // console.log("Called", nextActionKey, action)
      const currentAction = actions[action];
      const nextAction = actions[nextActionKey];
      if (!nextAction || currentAction === nextAction) return;
      // console.log(nextActionKey)
      // Function inspired by: https://github.com/mrdoob/three.js/blob/master/examples/webgl_animation_skinning_blending.html
      nextAction.enabled = true;
      if (currentAction) {
          currentAction.crossFadeTo(nextAction, duration, true);
      }
      // Not sure why I need this but the source code does not
      nextAction.play();
      setAction(nextActionKey);
  }

  useEffect(() => {
      if (props.action) {
          const action = actions[props.action as ActionName];
          if (!action) return;
          transitionTo(props.action, 0.2);
          // action.reset().play();
      }
  }, [props.action]);
  
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Root_Scene">
        <group name="RootNode">
          <group name="AnimalArmature" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <primitive object={nodes.Body} />
            <primitive object={nodes.IKBackLegL} />
            <primitive object={nodes.IKFrontLegL} />
            <primitive object={nodes.IKBackLegR} />
            <primitive object={nodes.IKFrontLegR} />
          </group>
          <group name="Horse" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh
              name="Horse_1"
              geometry={nodes.Horse_1.geometry}
              material={materials.Main}
              skeleton={nodes.Horse_1.skeleton}
            />
            <skinnedMesh
              name="Horse_2"
              geometry={nodes.Horse_2.geometry}
              material={materials.Hair}
              skeleton={nodes.Horse_2.skeleton}
            />
            <skinnedMesh
              name="Horse_3"
              geometry={nodes.Horse_3.geometry}
              material={materials.Muzzle}
              skeleton={nodes.Horse_3.skeleton}
            />
            <skinnedMesh
              name="Horse_4"
              geometry={nodes.Horse_4.geometry}
              material={materials.Hooves}
              skeleton={nodes.Horse_4.skeleton}
            />
            <skinnedMesh
              name="Horse_5"
              geometry={nodes.Horse_5.geometry}
              material={materials.Main_Light}
              skeleton={nodes.Horse_5.skeleton}
            />
            <skinnedMesh
              name="Horse_6"
              geometry={nodes.Horse_6.geometry}
              material={materials.Eye_Black}
              skeleton={nodes.Horse_6.skeleton}
            />
            <skinnedMesh
              name="Horse_7"
              geometry={nodes.Horse_7.geometry}
              material={materials.Eye_White}
              skeleton={nodes.Horse_7.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  )
});

useGLTF.preload('/denis.glb')