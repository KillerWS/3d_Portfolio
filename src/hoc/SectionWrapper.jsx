import React from 'react'
import {motion} from 'framer-motion'

import { styles } from '../styles';
import { staggerContainer } from '../utils/motion';

//制定一些加载动画
const SectionWrapper = (Component, idName) => 
function HOC() {
    return (
        //制定一些加载动画，relative+margin设为auto实现居中
        //具体的加载动画效果在staggerContainer中定义
        <motion.section
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{once:true, amount:0.5}}
            className={`${styles.padding} max-w-7xl
            mx-auto relative z-0`}
        >   

            <span className="hash-span" id={idName}>
                &nbsp;
            </span>
            <Component />
        </motion.section>
    )
}

export default SectionWrapper