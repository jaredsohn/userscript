// ==UserScript==
// @name          Paticik iş yeri mavisi
// @namespace     kzlsakal / doruk
// @description   Sıkıcı iş yeri mavisiyle patiyi yeniden keşfedin
// @include       http://*.paticik.com/*
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle('.bos { background-color: #838FA0; color: #000000 ! important; }');
addGlobalStyle('.kutu { background-color: #6CA1D8; color: #000000 ! important; }');
addGlobalStyle('.ichead { background-color: #1B538C ! important; }');
addGlobalStyle('.icfoot { background-color: #1B538C ! important; }');
addGlobalStyle('.odd { background-color: #C2D0D6 ! important; }');
addGlobalStyle('.icalan { background-color: #7BB2EB ! important; }');
addGlobalStyle('.even { background-color: #ADC0C9 ! important; }');
addGlobalStyle('.menu { background-color: #6CA1D8 ! important; }');
addGlobalStyle('BODY { background-color: #838FA0; ! important; }');
addGlobalStyle('input,textarea,select { border: 1px solid #1B538B ! important; }');
addGlobalStyle('a:hover { color: #1b538c ! important; }');
addGlobalStyle('td.pati_paging { background-color: #C2D0D6; ! important; }');
addGlobalStyle('.pati_phorum table th { background-color: #57727F; border: 1px solid #000000; ! important; }');
addGlobalStyle('.pati_phorum table td { border: 1px solid #000000; ! important; }');
addGlobalStyle('.pati_breadcrumbs tr td { background-color: #C2D0D6; border: 1px solid #000; ! important; }');
addGlobalStyle('div.pati_banner2 { background-color: #C2D0D6; border: 1px solid #000; ! important; }');
addGlobalStyle('blockquote.bbcode { background-color: #C2D0D6;! important; }');
addGlobalStyle('div.information { background-color: #C2D0D6; border: 2px solid #000000; ! important; }');
addGlobalStyle('div.pati_notification { background-color: #C2D0D6; border: 2px solid #000000; ! important; }');
addGlobalStyle('table.pati_breadcrumbs { border: 1px solid #000000; ! important; }');

var allImgs,thisImg;
allImgs = document.evaluate('//img[@src]',
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
for (var i=0;i<allImgs.snapshotLength;i++) {
 var thisImg = allImgs.snapshotItem(i);
 var src = thisImg.src;
	var srcMatch = src.match('^http://forum.paticik.com/templates/paticik-test/images/message_new.gif');
	if (srcMatch != null) {
  thisImg.src = 'http://i.imgur.com/8YutK.png';
	}
	var srcMatch = src.match('^http://forum.paticik.com/templates/paticik-test/images/message_sticky_new.gif');
	if (srcMatch != null) {
  thisImg.src = 'http://i.imgur.com/VDfn6.png';
	}
	var srcMatch = src.match('^http://forum.paticik.com/templates/paticik-test/images/message_sticky_locked.gif');
	if (srcMatch != null) {
  thisImg.src = 'http://i.imgur.com/5OgDj.png';
	}
	var srcMatch = src.match('^http://forum.paticik.com/templates/paticik-test/images/message_sticky.gif');
	if (srcMatch != null) {
  thisImg.src = 'http://i.imgur.com/aPim0.png';
	}
	var srcMatch = src.match('^http://forum.paticik.com/templates/paticik-test/images/message_locked.gif');
	if (srcMatch != null) {
  thisImg.src = 'http://i.imgur.com/5QUiA.png';
	}
}
var elmDeleted = document.getElementById("banner");
	elmDeleted.parentNode.removeChild(elmDeleted);