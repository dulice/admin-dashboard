import React from 'react'
import { motion } from 'framer-motion';
import { slideAnimation } from '../config/motion'
import Table from '../components/table/Table'
import { members } from '../data/table/members'
import { columns } from '../data/table/column'
import { memberTHead } from '../data/table/thead'

const Members = () => {
  return (
    <motion.div {...slideAnimation("up")}>
      <div className='card m-4'>
        <Table data={members} columns={columns(memberTHead)} itemPerpage={20}/>
      </div>
    </motion.div>
  )
}

export default Members