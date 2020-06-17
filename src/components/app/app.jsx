import React from "react";
import { Tabs } from 'antd';
import './app.scss';
import 'antd/dist/antd.css';
import Timer from '../timer';
import Countdown from '../countdown';

const App = () => {
  const {TabPane} = Tabs;

  return (
    <Tabs defaultActiveKey="2">
      <TabPane tab="Timer" key="1">
        <Timer />
      </TabPane> 
      <TabPane tab="Countdown" key="2">
        <Countdown />
      </TabPane> 
    </Tabs>
  );
  // return <div className="blackBox" />;
};

export default App;