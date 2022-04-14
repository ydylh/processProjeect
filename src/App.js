import React, { useEffect, useState } from 'react';
import { Graph, Addon } from '@antv/x6';
import './compnents/registerNode';
import { nodeTypes } from './compnents/nodeType';
import { bindEvents } from './compnents/graphEvents';
import { grapgConfig } from './compnents/graphConfig';
import { Button } from 'antd';
import html2canvas from 'html2canvas';
import './App.scss';

function App() {
  const [graph, setGraph] = useState(null);
  const [stencil, setStencil] = useState(null);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);

  useEffect(() => {
    const graph = new Graph(grapgConfig('graph_container'))
    // #region 初始化 stencil
    const stencil = new Addon.Stencil({
      title: '流程图',
      target: graph,
      stencilGraphWidth: 200,
      stencilGraphHeight: 180,
      collapsable: true,
      groups: [
        {
          title: '基础流程图',
          name: 'group1',
        }
      ],
      layoutOptions: {
        columns: 2,
        columnWidth: 80,
        rowHeight: 55,
      },
    })
    document.getElementById('graph_stencil')?.appendChild(stencil.container);
    setGraph(graph);
    setStencil(stencil);
    // 绑定事件
    bindEvents(graph);
  }, []);


  // 绑定节点
  nodeTypes(graph, stencil);

  // 保存图片
  const saveImage = () => {
    setIsLoadingBtn(true);
    html2canvas(document.getElementById('graph_container')).then(canvas => {
      let tempImg = new Image();
      tempImg.src = canvas.toDataURL();
      downLoaclMethods(tempImg.src, '流程图');
    })
  }

  const downLoaclMethods = (src, name) => {
    const eleLink = document.createElement('a');
    eleLink.href = src;
    eleLink.download = name;
    document.body.appendChild(eleLink);
    eleLink.click();
    document.body.removeChild(eleLink);
    setIsLoadingBtn(false);
  }


  return (
    <div className="app">
      <div className='graph_container' id="graph_container" />
      <div id='graph_stencil' className='stencil' />
      <Button
        type='primary'
        className='graph_save'
        onClick={saveImage}
        loading={isLoadingBtn}
      >保存文件</Button>
    </div>
  );
}

export default App;
