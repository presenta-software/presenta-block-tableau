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

const logo = '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.3 59.5"><path d="M28.5 40.2h3.3v-9h8.3V28h-8.3v-9h-3.3v9h-8.2v3.2h8.2z" fill="#e8762d"/><path d="M13.2 53.2H16v-8h7.4v-2.5H16v-8.1h-2.8v8.1H5.8v2.5h7.4z" fill="#c72037"/><path d="M44.3 24.3h2.8v-8h7.5v-2.4h-7.5V5.8h-2.8v8.1h-7.4v2.4h7.4z" fill="#5b879b"/><path d="M29 59.5h2.4v-5.7h5.1v-2.1h-5.1V46H29v5.7h-5v2.1h5z" fill="#5c6692"/><path d="M13.3 24.3h2.6v-8.1h7.5v-2.3h-7.5V5.8h-2.6v8.1H5.8v2.3h7.5z" fill="#eb9129"/><path d="M52.8 36.3h2.4v-5.6h5.1v-2.2h-5.1v-5.6h-2.4v5.6h-5v2.2h5z" fill="#5c6692"/><path clip-rule="evenodd" d="M44.3 53.2h2.8v-8h7.5v-2.5h-7.5v-8.1h-2.8v8.1h-7.4v2.5h7.4z" fill="#1f457e" fill-rule="evenodd"/><path d="M36.1 7.2V5.5h-5V0h-1.8v5.5h-5v1.7h5v5.5h1.8V7.2zM5 35.9h1.8v-5.5h5v-1.7h-5v-5.4H5v5.4H0v1.8l5-.1z" fill="#7199a6"/></svg>'

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

    const previewMode = config._mode === 'preview'

    if (previewMode) {
      const parser = new DOMParser()
      const frag = parser.parseFromString(logo, 'text/html').body.childNodes[0]
      child.append(frag)
      child.classList.remove(css.loading)
      child.classList.add(css.svg)
      return
    }

    if (config.url) {
      const options = {
        hideTabs: config.hideTabs || false,
        hideToolbar: config.hideToolbar || false,
        device: config.device,
        width: '100%',
        height: '100%',
        onFirstInteractive: () => {
          child.classList.remove(css.loading)
          // el.remove(loader)
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
