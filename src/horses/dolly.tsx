
import * as THREE from 'three'
import React, { forwardRef, useEffect, useMemo, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF, SkeletonUtils } from 'three-stdlib'
import { useGraph } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    Horse: THREE.SkinnedMesh
    All: THREE.Bone
    Root: THREE.Bone
  }
  materials: {
    AtlasMaterial: THREE.MeshStandardMaterial
  }
}

type ActionName =
  | 'AnimalArmature|AnimalArmature|AnimalArmature|Death'
  | 'AnimalArmature|AnimalArmature|AnimalArmature|Headbutt'
  | 'AnimalArmature|AnimalArmature|AnimalArmature|Idle'
  | 'AnimalArmature|AnimalArmature|AnimalArmature|Idle_Eating'
  | 'AnimalArmature|AnimalArmature|AnimalArmature|Jump_Loop'
  | 'AnimalArmature|AnimalArmature|AnimalArmature|Jump_Start'
  | 'AnimalArmature|AnimalArmature|AnimalArmature|Run'
  | 'AnimalArmature|AnimalArmature|AnimalArmature|Walk'

/* add these code to all horse animations */
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

interface MyGLTFResult extends GLTFResult {
  animations: GLTFAction[];
}
/* add these code to all horse animations */

export default forwardRef<THREE.Group>(function Dolly(props: any, ref: React.ForwardedRef<THREE.Group>) {
  // const group = useRef<THREE.Group>()
  const { materials, animations, scene } = useGLTF('/dolly.glb') as MyGLTFResult
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes }: { nodes: any } = useGraph(clone);
  const { actions } = useAnimations(animations, ref as React.MutableRefObject<THREE.Group>);
  const [action, setAction] = React.useState<ActionName>('AnimalArmature|AnimalArmature|AnimalArmature|Idle');

  function transitionTo(nextActionKey: string, duration = 1) {
    // console.log("Called", nextActionKey, action)
    const currentAction = actions[action];
    const nextAction = actions[('AnimalArmature|AnimalArmature|AnimalArmature|' + nextActionKey) as ActionName];
    if (!nextAction || currentAction === nextAction) return;
    // console.log(nextActionKey)
    // Function inspired by: https://github.com/mrdoob/three.js/blob/master/examples/webgl_animation_skinning_blending.html
    nextAction.enabled = true;
    if (currentAction) {
      currentAction.crossFadeTo(nextAction, duration, true);
    }
    // Not sure why I need this but the source code does not
    nextAction.play();
    setAction(('AnimalArmature|AnimalArmature|AnimalArmature|' + nextActionKey) as ActionName);
  }

  useEffect(() => {
    if (props.action) {
      const action = actions['AnimalArmature|AnimalArmature|AnimalArmature|'+props.action as ActionName];
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
            <primitive object={nodes.All} />
            <primitive object={nodes.Root} />
          </group>
          <skinnedMesh
            name="Horse"
            geometry={nodes.Horse.geometry}
            material={materials.AtlasMaterial}
            skeleton={nodes.Horse.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
      </group>
    </group>
  )
})

useGLTF.preload('/dolly.glb')