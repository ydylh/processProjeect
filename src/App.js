import React, { useEffect, useRef, useState, colorRef } from 'react';
import { Graph, Addon } from '@antv/x6';
import './compnents/registerNode';
import { nodeTypes } from './compnents/nodeType';
import { bindEvents } from './compnents/graphEvents';
import { grapgConfig } from './compnents/graphConfig';
import SelectColorView from './compnents/selectColor';
import { Button } from 'antd';
import html2canvas from 'html2canvas';
import './App.scss';

function App() {
  const [graph, setGraph] = useState(null);
  const [stencil, setStencil] = useState(null);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [bgc, setBgc] = useState(''); // 节点填充
  const [transparent, setTransparent] = useState(1); // 透明度调整
  const [colorVisible, setColorVisible] = useState(false); // 填充弹窗
  const [beforeVal, setBeforeVal] = useState('');
  const [type, setType] = useState(''); // 设置修改文字/填充类型
  const [txtColor, setTxtColor] = useState('#333'); // 设置文字颜色
  const [txtVisible, setTxtVisible] = useState(false); // 文本颜色弹窗
  const [isSelectModal, setIsSelectModal] = useState(false); // 选择样式弹窗
  const [selectedNode, setSelectNode] = useState({});
  let colorRef = useRef();

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
    graph.on('node:click', ({ node }) => {
      setSelectNode(node);
      setIsSelectModal(true);
      setBgc(node?.attrs?.body?.fill || '#5F95FF');
      setTransparent(node?.attrs?.body?.opacity);
      setTxtColor(node?.attrs?.text.fill)
    });
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

  // 确定颜色
  const sureColor = () => {
    setBgc(colorRef?.current?.getFieldValue('color') || '#fff');
  };

  // 选择颜色
  const selectedColor = (color) => {
    if (colorVisible) {
      setBgc(color);
    }
    if (txtVisible) {
      setTxtColor(color)
    }
  }

  // 改变透明度
  const onChangeTransparent = (val) => {
    if (colorVisible) {
      setTransparent(val);
    }
  }

  // 打开颜色弹窗
  const openColorVisoble = (cusType) => {
    setType(cusType);
    switch (cusType) {
      case 'fill':
        setColorVisible(true);
        setBeforeVal(bgc);
        break;
      case 'text':
        setTxtVisible(true);
        setBeforeVal(txtColor);
        break;
      default:
        break;
    }
  };

  // 取消打开弹窗
  const cancelTooTip = () => {
    switch (type) {
      case 'fill':
        setColorVisible(false);
        setBgc(beforeVal);
        break;
      case 'text':
        setTxtVisible(false);
        setTxtColor(beforeVal);
        break;
      default:
        break;
    }
  };

  // 确定弹窗
  const sureTooTip = () => {
    switch (type) {
      case 'fill':
        setColorVisible(false)
        break;
      case 'text':
        setTxtVisible(false);
        break;
      default:
        break;
    }
  };

  // 确定选择样式弹窗
  const sureSelectModal = () => {
    selectedNode.attr('body/fill', bgc);
    selectedNode.attr('body/opacity', transparent); // 改变背景透明度
    selectedNode.attr('text/fill', txtColor);
    selectedNode.attr('text/fontSize', 12); // 改变字体大小
    setIsSelectModal(false);
  };

  // 取消选择样式弹窗
  const cancelSelectModal = () => {
    setIsSelectModal(false)
  };

  return (
    <div className="app">
      <div className='graph_container' id="graph_container" />
      <div id='graph_stencil' className='stencil' />
      {isSelectModal && <div className='graph_controlPanel'>
        <SelectColorView
          sureColor={sureColor}
          bgc={bgc}
          type={type}
          colorRef={colorRef}
          transparent={transparent}
          selectedColor={selectedColor}
          colorVisible={colorVisible}
          openColorVisoble={openColorVisoble}
          onChangeTransparent={onChangeTransparent}
          cancelTooTip={cancelTooTip}
          sureTooTip={sureTooTip}
          txtColor={txtColor}
          txtVisible={txtVisible}
          cancelSelectModal={cancelSelectModal}
          sureSelectModal={sureSelectModal}
        />
      </div>}
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
