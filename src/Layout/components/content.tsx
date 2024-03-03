import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import { Layout, Card, Row, Button, Select, Table } from 'antd';
import axios from 'axios';
const { Content } = Layout;

const columns = [
  {
    dataIndex: 'date',
    key: 'date',
  },
  {
    dataIndex: 'fear_greed',
    key: 'fear_greed',
  },
  {
    dataIndex: 'fear_greed_emotion',
    key: 'fear_greed_emotion',
  },
];

function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    const cloneArray: any[] = [];
    obj.forEach(item => {
      cloneArray.push(deepClone(item));
    });
    return cloneArray as any;
  }

  const cloneObj = {} as T;
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloneObj[key] = deepClone(obj[key]);
    }
  }

  return cloneObj;
}

function contentComponent(props: any) {
  const { currentTitle, optionsData } = props;
  const [tableData, setData] = useState([]);

  const getTableData = () => {
    axios.get(`https://api.finmindtrade.com/api/v4/data?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyNC0wMy0wMyAxNjozMToyNiIsInVzZXJfaWQiOiJXWlkiLCJpcCI6IjE4My4xNjAuNzUuNDEifQ.7EoCZgfTBPcBZI8Xf0EerA6xDNbGplBRmRARQksrLrk&dataset=CnnFearGreedIndex&start_date=2021-01-01&end_date=2021-01-10`).then(({ data }: any) => {
      console.log(data.data, 'data.data');
      data.data = data.data.map((item: Object, index: number) => ({ ...item, key: index + 1 }));
      setData(data.data);
    });
  };

  const chartRef: any = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeChart = () => {
      chartRef.current.resize();
    };
    resizeChart();
    getTableData();

    window.addEventListener('resize', resizeChart);

    return () => {
      window.removeEventListener('resize', resizeChart);
    };
  }, []);

  const handleChange = (value: number) => {
    const data = deepClone(optionsData);

    data.xAxis[0].data.splice(value, data.xAxis[0].data.length);

    // 设置新的数据和配置
    chartRef.current.dispose();
    const echartsDom = echarts.init(chartRef.current.ele);
    echartsDom.setOption(data);
  };

  const changeTheme = () => {
    let theme = document.documentElement.getAttribute('theme');

    document.documentElement.setAttribute('theme', theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Content className="contentStyle">
      <Card bodyStyle={{ padding: '10px' }} className="customCard">
        <Row align={'middle'} justify={'space-between'}>
          {currentTitle}
          <Button type="primary" onClick={changeTheme}>
            切换主题
          </Button>
        </Row>
      </Card>
      <Card bodyStyle={{ padding: '10px' }} className="customCard setCard">
        <Row justify={'space-between'}>
          <Button type="primary">每月營收</Button>
          <Select
            defaultValue={5}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: 5, label: '近 五 年' },
              { value: 3, label: '近 三 年' },
              { value: 2, label: '近 两 年' },
              { value: 1, label: '近 一 年' },
            ]}
          />
        </Row>
        <div style={{ width: '500px !important' }}>
          <ReactEcharts ref={chartRef} style={{ width: '500px !important', height: '450px' }} className="reactEcharts" option={optionsData} />
        </div>
      </Card>

      <Card bodyStyle={{ padding: '10px' }} className="customCard">
        <Button type="primary">詳細數據</Button>
        <Table showHeader={false} bordered={true} className="customTable" pagination={false} dataSource={tableData} columns={columns} />
      </Card>
    </Content>
  );
}

export default contentComponent;
