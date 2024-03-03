import React, { useEffect } from 'react';
import { Layout, Input, message } from 'antd';
import axios from 'axios';

const { Header } = Layout;
const { Search } = Input;
const headerStyle: React.CSSProperties = {
  color: '#fff',
  height: 70,
  paddingInline: 48,
  lineHeight: '70px',
  backgroundColor: '#ffffff',
  borderBottom: '1px solid #ededed',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
const searchStyle: React.CSSProperties = {
  width: '20%',
  height: '40px',
};

function headerComponent(props: any) {
  const { changeData } = props;
  const [messageApi, contextHolder] = message.useMessage();

  const onSearch = (value: string) => {
    axios.get(`https://api.web.finmindtrade.com/v2/taiwan_stock_analysis_plot?stock_id=${value}`).then(({ data }: any) => {
      console.log(data, 'data');

      if (data.msg !== 'success') return messageApi.error('未找到该股票数据');
      changeData(data.data, value);
    });
  };

  useEffect(() => {
    onSearch('1102');
  }, []);

  return (
    <>
      {contextHolder}
      <Header style={headerStyle} className="headerTitle">
        <Search style={searchStyle} placeholder="输入台/美股代號，查看公司價值" onSearch={onSearch}></Search>
      </Header>
    </>
  );
}

export default headerComponent;
