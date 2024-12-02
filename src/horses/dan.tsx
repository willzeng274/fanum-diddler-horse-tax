import * as THREE from 'three'
import React, { forwardRef, useEffect, useMemo, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF, SkeletonUtils } from 'three-stdlib'
import { useGraph } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    Horse_1: THREE.SkinnedMesh
    Horse_2: THREE.SkinnedMesh
    root: THREE.Bone
  }
  materials: {
    ['Material.003']: THREE.MeshStandardMaterial
    ['Material.006']: THREE.MeshStandardMaterial
  }
}

type ActionName =
  | 'Armature|Death'
  | 'Armature|Idle'
  | 'Armature|Jump'
  | 'Armature|Run'
  | 'Armature|Walk'
  | 'Armature|WalkSlow'

/* add these code to all horse animations */
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

interface MyGLTFResult extends GLTFResult {
  animations: GLTFAction[];
}
/* add these code to all horse animations */

export default forwardRef<THREE.Group>(function Dan(props: any, ref: React.ForwardedRef<THREE.Group>) {
  // const group = useRef<THREE.Group>()
  const { materials, animations, scene } = useGLTF('dan.glb') as MyGLTFResult
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes }: { nodes: any } = useGraph(clone);
  const { actions } = useAnimations(animations, ref as React.MutableRefObject<THREE.Group>);
  const [action, setAction] = React.useState<ActionName>('Armature|Idle');

  function transitionTo(nextActionKey: string, duration = 1) {
      // console.log("Called", nextActionKey, action)
      const currentAction = actions[action];
      const nextAction = actions['Armature|'+nextActionKey as ActionName];
      if (!nextAction || currentAction === nextAction) return;
      // console.log(nextActionKey)
      // Function inspired by: https://github.com/mrdoob/three.js/blob/master/examples/webgl_animation_skinning_blending.html
      nextAction.enabled = true;
      if (currentAction) {
          currentAction.crossFadeTo(nextAction, duration, true);
      }
      // Not sure why I need this but the source code does not
      nextAction.play();
      setAction('Armature|'+nextActionKey as ActionName);
  }

  useEffect(() => {
      if (props.action) {
          const action = actions['Armature|'+props.action as ActionName];
          if (!action) return;

          transitionTo(props.action, 0.2);
          // action.reset().play();
      }
  }, [props.action]);
  /* add these code to all horse animations */
  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Root_Scene">
        <group name="RootNode">
          <group name="Armature" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <primitive object={nodes.root} />
          </group>
          <group name="Horse" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh
              name="Horse_1"
              geometry={nodes.Horse_1.geometry}
              material={materials['Material.003']}
              skeleton={nodes.Horse_1.skeleton}
            />
            <skinnedMesh
              name="Horse_2"
              geometry={nodes.Horse_2.geometry}
              material={materials['Material.006']}
              skeleton={nodes.Horse_2.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  )
});

useGLTF.preload('/dan.glb')