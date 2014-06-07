// ==UserScript==
// @name           Friendfeed Refresh Homepage Button
// @namespace      http://userscripts.org/user/63840
// @description    Adds a refresh button to friendfeed home page
// @include        http://friendfeed.com/
// ==/UserScript==

function _userscript_63840_getChildByClass(root,classname,descend) {
  for (var _i = 0; _i < root.childNodes.length; _i++) {
    if (root.childNodes[_i].className == classname) {
      return root.childNodes[_i];
    }
    if (descend) {
      var res = _userscript_63840_getChildByClass(root.childNodes[_i],classname,descend);
      if (res) return res;
    }
  }
  return null;
}

var _fs = document.getElementById('main');
if (_fs) {
  var _sl = _userscript_63840_getChildByClass(_fs,'sharelinks',true);
  if (_sl) {
    var _c = document.createElement('SPAN');
    _c.style.marginLeft = "10px";
    _c.innerHTML = '<a href="http://friendfeed.com/">Refresh</a>';
    _sl.appendChild(_c);
  }
}
