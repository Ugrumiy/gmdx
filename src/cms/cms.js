import { MdxPreview } from "netlify-cms-widget-mdx"
import React, { Component } from "react"
import CMS, { init } from 'netlify-cms';
import FileSystemBackend from './components/FileSystemBackend';
import Components from '../components';

const MdxControl = require("netlify-cms-widget-markdown").default.controlComponent; // import from netlify-cms-widget-mdx doesnt work v 0.3.2

// rewrite config to use file-system instead
if (process.env.NODE_ENV === 'development') {
  // override certain ascpects of the config:
  window.CMS_ENV = 'development_overrides';
  CMS.registerBackend('file-system', FileSystemBackend);
}

// The preview window which renders MDX content.
// Docs: https://www.netlifycms.org/docs/customization/

class MDXWidget extends Component {
  render() {
    return (
      <div>
        eqweqwe
      </div>
    )
  }
}
const PreviewWindow = props => {
  const iframe = document.getElementsByTagName("iframe")[0];
  const iframeHeadElem = iframe.contentDocument.head;
  
  const mdxProps = {
    // This key represents html elements used in markdown; h1, p, etc
    //components: LayoutComponents,
    // Pass components used in the editor (and shared throughout mdx) here:
    scope: {
      ...Components,
    },
    
    mdPlugins: [],
  }
  
  return (
    <div>
      <MdxPreview mdx={mdxProps} {...props} />
    </div>
  )
}

// Netlify collections that set `widget: mdx` will be able to use this custom
// widget. NOTE: The StyleSheet manager can *only* be injected into the Preview.
// Docs: https://www.netlifycms.org/docs/widgets/

CMS.registerWidget("mdx", MdxControl, PreviewWindow);
// do manual init (accepts a config object)
// init({ config: {...} }) that would be merged with
// the config.yml settings, but this doesn't currently work
// as expected. instead setting window.CMS_ENV and including
// development_overrides in config.yml
init();

// another option would be to render the config as json and
// add it to the page via:
// window.CMS_CONFIG = { /* JSON */ }

// const fs = require('fs')
// const yaml = require('js-yaml')
// function getConfig() {
//   const file = `${__dirname}/static/admin/config.yml`
//   obj = yaml.load(fs.readFileSync(file, { encoding: 'utf-8' }))
//   // override obj as neccessary
//   window.CMS_CONFIG = JSON.stringify(obj);
// }
