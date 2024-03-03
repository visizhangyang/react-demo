
import { useState } from 'react';
import Headers from './components/headers';
import SiderBar from './components/siderBar';
import Content from './components/content';

import { Layout } from 'antd';

function LayoutComponent() {
  const [currentTitle, setCurrentTitle]: Array<any> = useState('0');
  const [optionsData, setOptionsData]: Array<any> = useState({});

  const changeData = (data: any, value: string) => {
    setCurrentTitle(value);

    let option = {
      tooltip: {
        formatter: function (params: any) {
          console.log(params, 'params');

          return `${params[0].axisValue}的月均價: ${params[1] ? (params[0].data / params[1].data - 1).toFixed(2) : params[0].data.toFixed(2)}`;
        },
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999',
          },
        },
      },
      legend: {
        data: [
          {
            name: data.TaiwanMonthRevenue.title,
            itemStyle: {
              color: '#e8af00',
            },
          },
          {
            name: '單月營收年增率(%)',
            itemStyle: {
              color: '#cb4b4b',
            },
          },
        ],
      },
      xAxis: [
        {
          type: 'category',
          data: data.TaiwanMonthRevenue.data.labels.splice(data.TaiwanMonthRevenue.data.labels.length - 5, data.TaiwanMonthRevenue.data.labels.length - 1),
          axisPointer: {
            type: 'shadow',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: data.TaiwanMonthRevenue.title,
          axisLabel: {
            formatter: '{value}',
          },
        },
        {
          type: 'value',
          name: '單月營收年增率(%)',
          axisLabel: {
            formatter: '{value}',
          },
        },
      ],
      series: [
        {
          name: data.TaiwanMonthRevenue.title,
          type: 'bar',
          itemStyle: {
            color: '#e8af00',
          },
          tooltip: {
            valueFormatter: (value: number | string) => value,
          },
          data: data.TaiwanMonthRevenue.data.series[0].splice(data.TaiwanMonthRevenue.data.series[0].length - 5, data.TaiwanMonthRevenue.data.series[0].length),
        },
        {
          name: '單月營收年增率(%)',
          type: 'line',
          itemStyle: {
            color: '#cb4b4b',
          },
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: (value: number | string) => value,
          },
          data: data.EPS.data.series[0].splice(data.EPS.data.series[0].length - 5, data.EPS.data.series[0].length),
        },
      ],
    };
    setOptionsData(option);
  };

  const setData = (value: any) => {
    setOptionsData(value);
  };

  return (
    <>
      <Layout className='Layout'>
        <Headers changeData={changeData}></Headers>
        <Layout className='within_layout'>
          <SiderBar></SiderBar>
          <Content currentTitle={currentTitle} optionsData={optionsData} setOptionsData={setData}></Content>
        </Layout>
      </Layout>
    </>
  );
}

export default LayoutComponent;
