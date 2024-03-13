import React from 'react'
import { Tilt } from 'react-tilt'
import {motion} from 'framer-motion'
import { styles } from '../styles'
import { services } from '../constants'
import {fadeIn, textVariant} from '../utils/motion'
import {SectionWrapper} from '../hoc'

const ServiceCard = ({index, title, icon}) => {
  return(
    
    <Tilt className='xs:w-[250px] w-full'>
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className='w-full green-pink-gradient p-[1px]
        rounded-20[px] shadow-card'
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450
          }}
          className='bg-tertiary rounded-[20px]
          py-5 px-12 min-h-[280px] flex justify-evenly
          items-center flex-col'
        >
          <img src={icon} alt={title}
          className='w-16 h-16 object-contain'/>
          <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
        </div>
      </motion.div>
    </Tilt>
  )
}

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-17[px]
        max-w-3xl leading-30[px]'
      >
        I'm a skilled software developer.
        I'm a skilled software developer.As a programmer with a focus on AIGC (AI-Generated Content), I specialize in crafting immersive digital experiences. Proficient in React and Vue for dynamic frontend development, my expertise extends to backend systems with Spring and Flask. My JavaScript skills are complemented by a strong grasp of full-stack development, ensuring efficient and innovative solutions.
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10 '>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index}
          {...service}/>          
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(About, 'about')