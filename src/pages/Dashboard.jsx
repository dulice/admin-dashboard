import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Linechart from '../components/chart/Linechart'
import { summary } from '../config/constant'
import { BarChart, MapChart, PolarChart } from '../components/chart'
import {Tooltip} from 'react-tooltip';
import { overview, products, sale, view } from '../data/chart/data';
import Table from '../components/table/Table';
import { customers } from '../data/table/customers';
import { customerTHead } from '../data/table/thead';
import { columns } from '../data/table/column';
import { fadeAnimation } from '../config/motion';

const Dashboard = () => {
  const [tooltipContent, setTooltipContent] = useState("");
  return (
    <div>
      <div className='grid lg:grid-cols-4 grid-cols-2 gap-2 text-center pt-4 px-4'>
        {summary.map(item => (
          <div key={item.name} className="card hover:-mt-4">
            <motion.div {...fadeAnimation}>
              <item.icon size={25} className='w-full'/>
              <p className='text-2xl font-bold'>{item.amount}</p>
              <p>{item.name}</p>
            </motion.div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-12 gap-4 mx-4">
        <div className='lg:col-span-8 col-span-12'>
          <div className="card">
            <Linechart labels={overview.labels} data={overview.data} title={overview.title} tooltip={overview.tooltip}/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="card lg:col-span-1 col-span-2">
              <BarChart labels={sale.labels} data={sale.data} title={sale.title} tooltip={sale.tooltip}/>
            </div>
            <div className="card lg:col-span-1 col-span-2">
              <BarChart labels={view.labels} data={view.data} title={view.title} tooltip={view.tooltip}/>
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <div className="card">
            <PolarChart labels={products.labels} data={products.data} title={products.title} tooltip={products.tooltip}/>
          </div>
          <div className="card">
            <p className='text-center font-bold text-sm text-gray-500'>Customers</p>
            <MapChart setTooltipContent={setTooltipContent}/> 
            <Tooltip id="my-tooltip-1" place='top' content={tooltipContent}/>
          </div>
        </div>
      </div>
      <div className="card mx-4">
        <Table data={customers} columns={columns(customerTHead)}/>
      </div>
    </div>
  )
}

export default Dashboard