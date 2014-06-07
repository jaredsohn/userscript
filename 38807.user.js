// ==UserScript==
// @name	Page Info Panel
// @namespace	http://userscripts.org/users/mstm
// @description	Adds a small panel onto the bottom-right corner of the window that contains the document title, URL, refferrer, and last modification date, allowing you to quickly find and copy these information.
// @version	0.5
// @include	*
// @grant	GM_addStyle
// ==/UserScript==

(function () {
  if (document.designMode == 'on' || document.body instanceof HTMLFrameSetElement || document.URL.indexOf(location.protocol) != 0) return;

  const generalName = GM_info.script.name;
  const containerID = GM_info.script.namespace.concat(generalName).replace(/\W/g, '');

  GM_addStyle('#' + containerID + ' { position: fixed !important; right: 0 !important; bottom: 0 !important; width: 0 !important; height: 0 !important; font: normal small/1 sans-serif !important; color: black !important; background: url(chrome://global/skin/icons/information-16.png) 50% 50% no-repeat !important; margin: 2px !important; padding: 8px !important; z-index: 65535 !important; overflow: auto; opacity: 0.25 !important; } #' + containerID + ' > span { display: none !important; margin: 0 !important; padding: 0 !important; list-style-type: none !important; text-align: left !important; line-height: 1.25 !important; white-space: nowrap !important; cursor: pointer !important; } #' + containerID + ':hover { background: white !important; width: auto !important; height: auto !important; max-width: 100% !important; max-height: 25% !important; border: 1px outset black !important; opacity: 1 !important; -moz-border-radius: 8px !important; -moz-box-sizing: border-box !important; } #' + containerID + ':hover > span { display: block !important; }');

  const panel = document.body.appendChild(document.createElement('DIV'));

  panel.id = containerID;
  panel.title = generalName;

  const setup = function (info, name) {
    var o = panel.appendChild(document.createElement('SPAN'));

    o.title = name + ' - ' + generalName;
    o.appendChild(document.createTextNode(info || '(No ' + name + ')'));
    o.setAttribute('onmouseover', 'window.getSelection().selectAllChildren(this)');
  };

  setup(document.title, 'Title');
  setup(document.URL, 'URL');
  setup(document.referrer, 'Referrer');
  setup(document.lastModified, 'Last Modified');
  setup((document.title || document.URL).link(document.URL), 'Link to This Page');
})()

