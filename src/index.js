import css from './style.css'
import {
  TableauViz
} from './tableau.embedding.3.latest.beta.js'

// https://embedding.tableauusercontent.com/preview/tableau.embedding.3.latest.beta.js

const doTableau = (el, config) => {
  const viz = new TableauViz()
  viz.src = config.url
  viz.toolbar = config.toolbar || 'hidden'
  // viz.addEventListener(TableauEventType.MarkSelectionChanged, handleMarkSelection)

  el.appendChild(viz)
}

const block = function (el, config) {
  const child = document.createElement('div')
  child.classList.add(css.tableau)

  if (config.url) doTableau(el, config)
}

export default block

block.install = Presenta => {
  Presenta.addBlock('tableau', block)
}

if (typeof window !== 'undefined' && window.Presenta) {
  window.Presenta.use(block)
}
