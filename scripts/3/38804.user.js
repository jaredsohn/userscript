// ==UserScript==
// @name	Google Cache Mapper
// @namespace	http://userscripts.org/users/mstm
// @description	Adds a navigation bar along the left border of the window that provides a quick way to find highlighted terms on a Google's cached page.
// @version	0.4
// @include	http://webcache.googleusercontent.com/search?q=cache:*
// @grant	GM_addStyle
// ==/UserScript==

(function () {
  const generalName = GM_info.script.name;
  const containerID = GM_info.script.namespace.concat(generalName).replace(/\W/g, '');

  GM_addStyle('#' + containerID + ' { position: fixed !important; left: 0 !important; top: 0 !important; width: 16px !important; height: 100% !important; background: gray !important; border: none !important; margin: 0 !important; padding: 0 !important; opacity: 0.25 !important; z-index: 65535 !important; -moz-border-radius: 0 !important; -moz-box-sizing: content-box !important; } #' + containerID + ':hover { opacity: 0.75 !important; } #' + containerID + ' > div { position: absolute !important; right: 0 !important; width: 100% !important; height: 8px !important; margin: 0 !important; padding: 0 !important; cursor: pointer !important; opacity: 1 !important; z-index: 0 !important; } #' + containerID + ' > div:hover { background-color: red !important; z-index: 1 !important; }');

  const panel = document.body.appendChild(document.createElement('DIV'));

  panel.id = containerID;
  panel.title = generalName;

  const elements = document.evaluate('/descendant::B[contains(string(@style), "background-color")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  const rootNode = document.compatMode == 'BackCompat' ? document.body : document.documentElement;

  for (var i = 0; i < elements.snapshotLength; ++i) {
    (function (o) {
      var a = panel.appendChild(document.createElement('DIV'));
      var s = a.style;
      var d = (function (o, d) {
        return o == null ? d : arguments.callee(o.offsetParent, d + o.offsetTop);
      })(o, 0);

      s.backgroundColor = o.style.backgroundColor;
      s.top = d / rootNode.scrollHeight * 100 + '%';
      a.title = o.textContent + ' - ' + o.parentNode.textContent;
      a.addEventListener('click', function(e) {
        rootNode.scrollTop = d - (panel.offsetHeight - o.offsetHeight) / 2;
      }, false);
    })(elements.snapshotItem(i));
  }
})()

