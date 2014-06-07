// ==UserScript==
// @name           Minimalist deviantART
// @namespace      http://bob23646.deviantart.com/
// @description    minimalistic version of deviantart
// @include        *deviantart.com*
// ==/UserScript==

(function() {
var css = ".oh-hl,.browse-limits { display:none !important; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();

(function() {
var style=".smshadow,.smshadowbg {background:none}";
var head=document.getElementsByTagName("HEAD")[0];
var el=window.document.createElement('link');
el.rel='stylesheet';
el.type='text/css';
el.href='data:text/css;charset=utf-8,'+escape(style);
head.appendChild(el);
})();


(function() {
function contentEval(source) {
  if ('function' == typeof source) {
    source = '(' + source + ')();'
  }
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;
  document.body.appendChild(script);
  document.body.removeChild(script);
}
contentEval(function() {
    jQuery('div.moarbuttons i.i18').parent().contents().filter(function(){return this.nodeType == Node.TEXT_NODE;}).remove();
});
})();


(function() {
var links = document.getElementsByTagName('a');
for(var i = 0; i < links.length; ++i) {
	if(links[i].href.indexOf('http://www.deviantart.com/users/outgoing?') > -1) {
		links[i].setAttribute("href", links[i].href.replace('http://www.deviantart.com/users/outgoing?', ''));
	}
}
if (window.location.pathname == '/users/outgoing') {
      window.location = window.location.search.substring(1);
}
})();