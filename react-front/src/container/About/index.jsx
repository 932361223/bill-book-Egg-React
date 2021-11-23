import React from 'react'
import Header from '@/components/Header'

import s from './style.module.less'

const About = () => {
  return <>
    <Header title='关于我们' />
    <div className={s.about}>
      <h2>关于项目</h2>
      <article>这个项目的初衷，是想学习React和Node，进入全栈领域</article>
    </div>
  </>
};

export default About;