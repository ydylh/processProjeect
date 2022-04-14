// 控制连接桩显示/隐藏
const showPorts = (ports, show) => {
  for (let i = 0, len = ports.length; i < len; i = i + 1) {
    ports[i].style.visibility = show ? 'visible' : 'hidden'
  }
}

const bindEvents = (graph) => {
  graph.bindKey(['meta+c', 'ctrl+c'], () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.copy(cells)
    }
    return false
  })
  graph.bindKey(['meta+x', 'ctrl+x'], () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.cut(cells)
    }
    return false
  })
  graph.bindKey(['meta+v', 'ctrl+v'], () => {
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 })
      graph.cleanSelection()
      graph.select(cells)
    }
    return false
  })
  graph.on('node:mouseenter', ({ node }) => {
    const container = document.getElementById('graph_container');
    const ports = container.querySelectorAll('.x6-port-body');
    showPorts(ports, true);
    node.addTools({
      name: 'button-remove',
      args: {
        x: '100%',
        y: 0,
        offset: { x: -5, y: 10 },
      },
    })
  })
  graph.on('node:mouseleave', ({ node }) => {
    const container = document.getElementById('graph_container');
    const ports = container.querySelectorAll('.x6-port-body');
    showPorts(ports, false);
    node.removeTool('button-remove');
  })
  graph.on('cell:dblclick', ({ cell, e }) => {
    const isNode = cell.isNode()
    const name = cell.isNode() ? 'node-editor' : 'edge-editor'
    cell.removeTool(name);
    cell.removeTool('button-remove');
    cell.addTools({
      name,
      args: {
        event: e,
        attrs: {
          backgroundColor: isNode ? '#EFF4FF' : '#FFF',
        },
      },
    })
  })
};

export { bindEvents };