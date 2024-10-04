// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import { easing } from "maath";

// const HeroCamera = ({ children, isMobile }) => {
//   const groupRef = useRef();

//   useFrame((state, delta) => {
//     easing.damp3(state.camera.position, [0, -1.5, 32], 0.25, delta);

//     if (!isMobile) {
//       easing.dampE(
//         groupRef.current.rotation,
//         [-state.pointer.y / 3, -state.pointer.x / 5, 0],
//         0.25,
//         delta
//       );
//     }
//   });

//   return (
//     <group ref={groupRef} scale={1}>
//       {children}
//     </group>
//   );
// };

// export default HeroCamera;
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

const HeroCamera = ({ children, isMobile }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    // Smoothly damp the camera position
    easing.damp3(state.camera.position, [0, -1.5, 32], 0.25, delta);

    if (!isMobile) {
      // Smoothly damp the rotation based on pointer movement
      easing.dampE(
        groupRef.current.rotation,
        [-state.pointer.y / 3, state.pointer.x / 5, 0],
        0.25,
        delta
      );
    }
  });

  return (
    <group ref={groupRef} scale={1}>
      {children}
    </group>
  );
};

export default HeroCamera;
