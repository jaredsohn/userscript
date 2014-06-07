// ==UserScript==
// @name	Page Width Resizer
// @namespace	http://userscripts.org/users/mstm
// @description	Adds translucent borders to both sides of the page. By dragging one of the borders, you can change the width of each page without resizing the window (preserving the page sizes in other tabs).
// @version	0.4
// @include	*
// @grant	GM_addStyle
// ==/UserScript==

(function () {
  if (document.designMode == 'on' || document.body instanceof HTMLFrameSetElement || document.URL.indexOf(location.protocol) != 0) return;

  const generalName = GM_info.script.name;
  const containerID = GM_info.script.namespace.concat(generalName).replace(/\W/g, '');

  GM_addStyle('#' + containerID + ' { opacity: 0 !important; } #' + containerID + ':hover { opacity: 1 !important; } #' + containerID + ' div { position: fixed !important; top: 0 !important; width: 8px !important; height: 100% !important; background: #808080 !important; z-index: 65535 !important; opacity: 0.5 !important; } #' + containerID + ':active div { background: #ff8080 !important; } #' + containerID + ' .L { left: 0 !important; cursor: e-resize !important; } #' + containerID + ' .R { right: 0 !important; cursor: w-resize !important; }');

  const panel = document.body.appendChild(document.createElement('DIV'));

  panel.id = containerID;
  panel.title = generalName;

  const lEdge = panel.appendChild(document.createElement('DIV')); lEdge.className = 'L';
  const rEdge = panel.appendChild(document.createElement('DIV')); rEdge.className = 'R';

  var activeNode;

  document.addEventListener('mousedown', function (e) {
    activeNode = e.target;
  }, true);

  document.addEventListener('mouseup', function (e) {
    activeNode = null;
  }, true);

  document.addEventListener('mousemove', function (e) {
    if (activeNode != lEdge && activeNode != rEdge) {
      return true;
    }

    var d = document.documentElement;
    var s = d.style;
    var m = Math.min(e.pageX - lEdge.offsetWidth / 2, d.offsetWidth + (parseInt(s.marginLeft) || 0) + (parseInt(s.marginRight) || 0) - e.pageX - rEdge.offsetWidth / 2);

    s.marginLeft = s.marginRight = lEdge.style.marginLeft = rEdge.style.marginRight = m + 'px';
    e.preventDefault();

    return false;
  }, true);
})()

