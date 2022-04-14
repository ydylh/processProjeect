export const nodeTypes = (graph, stencil) => {
  const r1 = graph?.createNode({
    shape: 'custom-rect',
    label: '开始',
    attrs: {
      body: {
        rx: 20,
        ry: 26,
      },
    },
  })
  const r2 = graph?.createNode({
    shape: 'custom-rect',
    label: '过程',
  })
  const r3 = graph?.createNode({
    shape: 'custom-rect',
    attrs: {
      body: {
        rx: 6,
        ry: 6,
      },
    },
    label: '可选过程',
  })
  const r4 = graph?.createNode({
    shape: 'custom-polygon',
    attrs: {
      body: {
        refPoints: '0,10 10,0 20,10 10,20',
      },
    },
    label: '决策',
  })
  const r5 = graph?.createNode({
    shape: 'custom-polygon',
    attrs: {
      body: {
        refPoints: '10,0 40,0 30,20 0,20',
      },
    },
    label: '数据',
  })
  const r6 = graph?.createNode({
    shape: 'custom-circle',
    label: '连接',
  })
  stencil?.load([r1, r2, r3, r4, r5, r6], 'group1')
};