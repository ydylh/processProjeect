import React, { Fragment } from 'react';
import { Input, Form, Slider, Button, Select } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import './index.scss';

const oftenColorList = ['#000000', '#434343', '#cccccc', '#d9d9d9', '#ffffff', '#980000', '#ff0000', '#ff9900',
  '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff', '#9900ff', '#ff00ff', '#e6b8af',
  '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#c9daf8', '#cfe2f3', '#d9d2e9',
  '#ead1dc', '#dd7e6b', '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#a4c2f4',
  '#9fc5e8', '#b4a7d6', '#d5a6bd', '#cc4125', '#e06666', '#f6b26b', '#ffd966', '#93c47d',
  '#76a5af', '#6d9eeb', '#6fa8dc', '#8e7cc3', '#c27ba0', '#a61c00', '#cc0000', '#e69138',
  '#45818e', '#3c78d8', '#3d85c6', '#674ea7', '#a64d79', '#1c4587', '#073763', '#20124d',];

const txtSizeList = [
  {
    label: '12px',
    value: '12'
  }, {
    label: '13px',
    value: '13'
  }, {
    label: '14px',
    value: '14'
  }, {
    label: '15px',
    value: '15',
  }, {
    label: '16px',
    value: '16'
  }
];

function SelectColorView(props) {
  const { bgc, sureColor, colorRef, selectedColor, onChangeTransparent,
    transparent, openColorVisoble, colorVisible, cancelTooTip, sureTooTip,
    type, txtColor, txtVisible, cancelSelectModal, sureSelectModal, txtSize,
    selectTxtSize } = props;

  const commonView = <Fragment>
    {type === 'fill' && <div className='selectColor_silder'>
      <Slider value={transparent} min={0} onChange={onChangeTransparent} max={1} step={0.01} />
    </div>}
    <div className='selectColor_list'>
      {oftenColorList.map((item, index) => {
        return <span onClick={() => selectedColor(item)} key={index} style={{ background: item }} className='selectColor_list-item' />
      })}
    </div>
    <div style={{ textAlign: 'center' }}>
      <Button size='small' onClick={cancelTooTip} style={{ marginRight: '10px' }}>取消</Button>
      <Button size='small' type="primary" onClick={sureTooTip}>确定</Button>
    </div>
  </Fragment>

  return <div className='selectColor'>
    <div>
      <Fragment>
        <div className='selectColor-title'>填充颜色选择</div>
        <div className='selectColor_styles'>
          <span onClick={() => openColorVisoble('fill')} className='selectColor-showColor' style={{ backgroundColor: bgc, opacity: transparent }} />
          <Form ref={colorRef}>
            <Form.Item
              name="color"
            >
              <Input
                className='selectColor-selectSty'
                size='small'
                placeholder='请输入颜色'
                addonAfter={
                  <CheckOutlined onClick={sureColor} className='selectColor-icon' />
                }
              />
            </Form.Item>
          </Form>
          {colorVisible && <div className='selectColor_styles_modal'>
            {commonView}
          </div>}
        </div>
      </Fragment>
      <div className="selectColor_text">
        <div className='selectColor-title'>文本样式选择</div>
        <div className="selectColor_text-example">
          <span style={{ marginRight: '5px', color: txtColor }}>示例</span>
          <span onClick={() => openColorVisoble('text')} className='selectColor-showColor' style={{ backgroundColor: txtColor }} />
          <Select
            value={txtSize}
            style={{marginLeft: '5px'}}
            options={txtSizeList}
            size="small"
            placeholder="请选择字体大小"
            onChange={selectTxtSize}
          />
          {txtVisible && <div className='selectColor_styles_modal'>
            {commonView}
          </div>}
        </div>
      </div>
    </div>
    <div style={{ textAlign: 'center' }}>
      <Button size='small' onClick={cancelSelectModal} style={{ marginRight: '10px' }}>取消</Button>
      <Button size='small' type="primary" onClick={sureSelectModal}>确定</Button>
    </div>
  </div >;
}

SelectColorView.defaultProps = {
  bgc: '#c3c3c3',
  sureColor: () => { },
  selectedColor: () => { },
  onChangeTransparent: () => { },
  transparent: 1,
  sureTooTip: () => { },
  cancelTooTip: () => { },
  type: 'fill',
  txtColor: '#333',
  colorVisible: false,
  txtVisible: false,
  cancelSelectModal: () => { },
  sureSelectModal: () => { },
  txtSize: '12',
  selectTxtSize: () => { },
};

SelectColorView.propTypes = {
  bgc: PropTypes.string,
  sureColor: PropTypes.func,
  txtSize: PropTypes.string,
  selectTxtSize: PropTypes.func,
}

export default SelectColorView;
