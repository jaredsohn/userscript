// ==UserScript==
// @id             SafeNET Signature
// @name           SafeNET
// @version        Beta 1.0
// @namespace      http://www.xeminem313x.weebly.com
// @author         FiXeR
// @description    Replaces Inap. Pictures, Changes "Headache Making" Webpage Backgrounds, And Replaces Swears (Replaces Only The Word "Fuck," As Of Right Now.
// @include        http://*
// @include        https://*
// @exclude        xat.com/thesinned
// @exclude        xat.com/thesinned2
// @exclude        xeminem313.weebly.com
// @exclude        userscripts.com
// @run-at         document-start
// ==/UserScript==
document.body.style.background = "#ffffff";
function addCss(cssString) {
	var head = document.getElementsByTagName('head')[0];
	return unless head;
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	head.appendChild(newCss);
}
addCss (
	'* { background-color: #ffffff ! important; }'
	var allImgs,thisImg;
allImgs = document.evaluate('//img[@src]',
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
var searchRE = new RegExp('Fuck','gi');
var replace = 'Removed';
for (var i=0;i<textNodes.snapshotLength;i++) {
  var node = textNodes.snapshotItem(i);
  node.data = node.data.replace(searchRE, replace);
