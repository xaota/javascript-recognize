import Component from '/material/script/Component.js';

import MaterialButtonTooltipIcon from '/material/components/button-tooltip-icon/material-button-tooltip-icon.js';
import MaterialButtonUploadTooltipIcon from '/material/components/button-upload-tooltip-icon/material-button-upload-tooltip-icon.js';

const component = Component.meta(import.meta.url, 'x-syncronize');
/**
  *
  */
  export default class XSyncronize extends Component {
  /**
    *
    */
    constructor(api) {
      super(component);
      if (api && !api.prefix) api.prefix = '';
      if (api && api.import) this.dataset.apiImport = api.prefix + api.import;
      if (api && api.export) this.dataset.apiExport = api.prefix + api.export;
    }

  /** */
    mount(node) {
      node
        .querySelector('#import')
        .addEventListener('file',  file => importData.call(this, file.detail.data));

      node
        .querySelector('#export')
        .addEventListener('click', () => exportData.call(this));

      return this;
    }
  }

Component.define(component, XSyncronize);

// #region [Private]
/** / importData
  * @this {XSyncronize} текущий элемент
  */
  async function importData(file) {
    const method = this.dataset.apiImport;
    if (!method) return;
    const data = JSON.parse(file);
    const result = await api(method, data);

    this.event('import', result);
  }

/** / exportData */
  async function exportData() {
    const method = this.dataset.apiExport;
    if (!method) return;
    const result = await api(method);
    download(JSON.stringify(result), 'data.json', 'text/plain');

    this.event('export', result);
  }

/** / download */
  function download(content, fileName, contentType) {
    var a = document.createElement('a');
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

/** запрос к серверу /api @async */
  async function api(method, data = null) {
    const options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: data === null
        ? data
        : JSON.stringify(data)
    };

    return await fetch(method, options)
      .then(response => response.text())
      .then(text => JSON.parse(text));
  }
// #endregion
