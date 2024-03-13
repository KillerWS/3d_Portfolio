import {Suspense, useEffect, useState} from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'

import CanvasLoader from '../Loader'


const Computers = ({isMobile}) => {
  //引入模型
  const computer = useGLTF('./desktop_pc/scene.gltf')
  
  return (
    <mesh>
      <hemisphereLight
        intensity={0.15}
        groundColor="black"/>
      <pointLight intensity={1}/>
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      
     


      {/* 控制位置 */}
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0,-3,-2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01,-0.2,-0.1]}
      />
    </mesh>
  )
}

const ComputersCanvas =() =>{
  const [isMobile, setIsMobile] = useState(false)

  //useEffect：每次挂载组件的时候检测屏幕尺寸来判断是否是移动端设备
  useEffect(()=>{
    
    //创建了一个媒体查询对象，用于检测当前屏幕宽度是否小于或等于500像素。（是否为移动端设备）
      const mediaQuery = window.matchMedia(
      '(max-width: 500px)');
      
      setIsMobile(mediaQuery.matches)
      
      //事件处理函数，当屏幕尺寸变化时更新state状态
      const handleMediaQueryChange = (event) =>{
        setIsMobile(event.matches);
      }

      //添加事件处理函数
      mediaQuery.addEventListener('change',
      handleMediaQueryChange);
      
      //seEffect的返回函数，它在组件卸载或useEffect重新运行之前执行。这个清理函数移除之前添加的事件监听器，以避免内存泄漏。
      return () => {
        mediaQuery.removeEventListener('change',
        handleMediaQueryChange);
      }
  }, [])

  return (
    <Canvas
      frameLoop='demand'
      shadows
      camera={{position:[20,3,5], fov:25}}
      gl={{preserveDrawingBuffer: true}}
    > 

      {/* react的Suspense，加载模型时显示loader */}
      <Suspense fallback={<CanvasLoader/>}>
        {/* 允许移动视角 禁止缩放，PolarAngle控制可旋转的角度*/}
        <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile}/>

      </Suspense>

      <Preload all/>
    </Canvas>
  )
}

export default ComputersCanvas