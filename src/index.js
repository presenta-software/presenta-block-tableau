import css from './style.css'
import tableau from 'tableau-api'
// import {
//   TableauViz, TableauEventType
// } from './tableau.embedding.3.latest.beta.js'

// https://embedding.tableauusercontent.com/preview/tableau.embedding.3.latest.beta.js

// const doTableauV3 = (el, config) => {
//   console.log(TableauEventType)
//   const viz = new TableauViz()
//   viz.src = config.url
//   viz.toolbar = config.toolbar || 'hidden'
//   viz.hideTabs = config.hideTabs || true
//   viz.device = config.device
//   viz.width = '100%'
//   viz.height = '100%'

//   // viz.addEventListener(TableauEventType.MarkSelectionChanged, handleMarkSelection)
//   viz.addEventListener(TableauEventType.FirstInteractive, function (e) {
//     console.log('onFirstInteractive')
//   })

//   el.appendChild(viz)
// }

// const doTableauV2 = (el, config) => {
//   // const vizUrl = 'https://public.tableau.com/views/VacationHome/VacationHome?:embed=y&:display_count=yes'

// }

const block = function (el, config) {
  let viz = null

  const that = this

  that.destroy = () => {
    if (viz) viz.dispose()
  }

  return new Promise((resolve, reject) => {
    const child = document.createElement('div')
    child.classList.add(css.tableau, css.loading)
    el.append(child)

    if (config.url) {
      const options = {
        hideTabs: config.hideTabs || false,
        hideToolbar: config.hideToolbar || false,
        device: config.device,
        width: '100%',
        height: '100%',
        onFirstInteractive: () => {
          child.classList.remove(css.loading)
          setTimeout(() => resolve(that), 500)
        }
      }

      viz = new window.tableau.Viz(child, config.url, options)
    } else {
      resolve(that)
    }
  })

  // if (config.url) doTableauV3(el, config)
}

export default block

block.install = Presenta => {
  Presenta.addBlock('tableau', block)
}

if (typeof window !== 'undefined' && window.Presenta) {
  window.Presenta.use(block)
}
