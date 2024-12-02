import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { Html, useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    styrofoamDinner_1: THREE.Mesh
    styrofoamDinner_1_1: THREE.Mesh
    styrofoamDinner_1_2: THREE.Mesh
    styrofoamDinner_1_3: THREE.Mesh
    styrofoamDinner_1_4: THREE.Mesh
    lid: THREE.Mesh
  }
  materials: {
    brownLight: THREE.MeshStandardMaterial
    brownDark: THREE.MeshStandardMaterial
    green: THREE.MeshStandardMaterial
    _defaultMat: THREE.MeshStandardMaterial
    greenDark: THREE.MeshStandardMaterial
  }
}

function getRandomColor() {
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  return randomColor;
}

export function Food(props: any) {
  const { nodes, materials } = useGLTF('/food.glb') as GLTFResult
  const [colors, setColors] = React.useState<[string, string, string, string]>([getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor()]);

  useEffect(() => {
    setColors([getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor()]);
  }, [props.food]);

  return (
    <group {...props} dispose={null}>
      <Html
        position={[0, 0.5, 0]}
        center
      >
        <div className="p-4 bg-white bg-opacity-50 pointer-events-none">
          <h1 className="text-2xl text-center">{props.food ? props.food.name : "None"}</h1>
        </div>
      </Html>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.lid.geometry}
        material={materials._defaultMat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.styrofoamDinner_1.geometry}
        // material={materials.brownLight}
        material={new THREE.MeshStandardMaterial({ color: colors[0] })}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.styrofoamDinner_1_1.geometry}
        // material={materials.brownDark}
        material={new THREE.MeshStandardMaterial({ color: colors[1] })}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.styrofoamDinner_1_2.geometry}
        // material={materials.green}
        material={new THREE.MeshStandardMaterial({ color: colors[2] })}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.styrofoamDinner_1_3.geometry}
        material={materials._defaultMat}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.styrofoamDinner_1_4.geometry}
        // material={materials.greenDark}
        material={new THREE.MeshStandardMaterial({ color: colors[3] })}
      />
    </group>
  )
}

useGLTF.preload('/food.glb')