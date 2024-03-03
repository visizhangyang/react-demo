import { Layout, message } from 'antd';
const { Sider } = Layout;
const siderStyle: React.CSSProperties = {
  width: '100px',
  color: '#000',
  backgroundColor: '#ededed',
  boxSizing: 'border-box',
};

const leftList: Array<{ title: String; message: String; style: any }> = [
  {
    title: 'B',
    message: '最新動熊',
    style: {},
  },
  {
    title: 'F',
    message: '股票健診',
    style: {},
  },
  {
    title: 'C',
    message: '財務報表',
    style: {
      custom: {
        borderLeft: '3px solid #0386f4',
      },
      p: {
        color: '#0386f4',
      },
    },
  },
  {
    title: 'D',
    message: '獲利能力',
    style: {
      span: {
        color: '#ca0813',
      },
    },
  },
  {
    title: 'E',
    message: '安全性分析',
    style: {
      span: {
        color: '#198420',
      },
    },
  },
  {
    title: 'q',
    message: '成長力分析',
    style: {
      span: {
        color: '#e67820',
      },
    },
  },
  {
    title: 'J',
    message: '價值評估',
    style: {
      span: {
        color: '#345ba7',
      },
    },
  },
  {
    title: 'G',
    message: '董監與籌碼',
    style: {
      span: {
        color: '#434343',
      },
    },
  },
  {
    title: 'H',
    message: '關鍵指標',
    style: {
      span: {
        color: '#743079',
      },
    },
  },
  {
    title: 'I',
    message: '產品組合',
    style: {
      span: {
        color: '#526fd7',
      },
    },
  },
];

const rightList: Array<{ msg: String; style?: any }> = [
  {
    msg: '每月營收',
    style: {
      borderLeft: '3px solid #0386f4',
      boxSizing: 'border-box',
      color: '#0386f4',
    },
  },
  { msg: '每股盈餘' },
  { msg: '每股淨值' },
  { msg: '損益表' },
  { msg: '總资座' },
  { msg: '負债和股束權益' },
  { msg: '現金流量表' },
  { msg: '股利政策' },
  { msg: '電子書' },
];

function siderbarComponent() {
  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = () => {
    messageApi.error('此功能正在开发......');
  };

  return (
    <Sider width="30%" style={siderStyle}>
      {contextHolder}
      <div className="siderBox">
        <div className="leftBox">
          {leftList.map((item, index) => (
            <div key={index} className="leftBoxBody" style={{ ...item.style.custom }}>
              <span className='customSpan' style={{  ...item.style.span }}>{item.title}</span>
              <p className="customP" style={{ ...item.style.p }}>
                {item.message}
              </p>
            </div>
          ))}
        </div>
        <div className="siderBoxRight">
          {rightList.map((item, index) => (
            <div key={index} style={{ ...item.style }} className="rightBoxBody" onClick={showMessage}>
              {item.msg}
            </div>
          ))}
        </div>
      </div>
    </Sider>
  );
}

export default siderbarComponent;
