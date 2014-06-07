// ==UserScript==
// @name        imasnews765.com collapse goods information
// @revision    1
// @author      KID the Euforia a.k.a. blueberrystream
// @description アイドルマスター情報まとめサイトに表示されている「近日発売のアイマスグッズ」を伸縮できるようにします
// @namespace   http://kid0725.usamimi.info
// @include     http://imasnews765.com/*
// ==/UserScript==

void(function() {

var ID_AREA = '__icgi-area__', ID_EXPAND = '__icgi-expand__', ID_COLLAPSE = '__icgi-collapse__', block, title, area, expandIcon, collapseIcon, expandIconData, collapseIconData, script;
expandIconData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAARJJREFUeNpi/P//P0NcX2oCAwNDJhCbMRAGp4B4+qKi2QsYY3tT6hTFVRrdTQIYZETkCep88uYhw84zGxjuv7xTzwSyMdo5mUFRQpGBlYWJIAapA6kH6WMBEhIifAIMpAB2VrB6CSYIhwkrLqzrxSkHAiCbGViZmXDagk8OrJnhPx434pEDa/77DyGQUdmJoiC1HMGf0V6OqfnPH4TAlGaEgpzaThQ+sjq45p+//+F0Gj45sObvP3/jVIBPDqz587cfWCXLczNwysE0P3329rk0Nwcf0Ynk649PIOops767Eefrjy+dBLllGP79YwT68Q9e/OHrR4ZD1zYxfP7xvosRmqvqoLlKggiLX0BzVRNAgAEAJkJ1yu0zs+kAAAAASUVORK5CYII=';
collapseIconData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAOxJREFUeNpi/P//P0NcX2oCAwNDJhCbMRAGp4B4+qKi2QsYY3tT6hTFVRrdTQIYZETkCep88uYhw84zGxjuv7xTzwSyMdo5mUFRQpGBlYWJIAapA6kH6WMBEhIifAIMpAB2VrB6CRYIh4mBHADWzMpMgWaG/wzka/77DyGQUdmJU/GM9nJMzX/+IASmNJfj1IysDq755+9/5Dv7+8/f5Gv+/O0H2ZqfPnv7XJqbg49oTV9/fAJRT5n13Y04X3986STILcPw7x8j0P9/8OIPXz8yHLq2ieHzj/ddjNBcVQfNVRJEWPwCmquaAAIMAGYuZD5GuUOeAAAAAElFTkSuQmCC';
block = byId('header3');
title = byClass('widgettitle', block)[0];
area = byClass('textwidget', block)[0];

// まず非表示にしておく
area.style.display = 'none';

// idを振っておく
area.id = ID_AREA;
area.setAttribute('id', ID_AREA);

// アイコンを作る
expandIcon = document.createElement('img');
expandIcon.id = ID_EXPAND;
expandIcon.alt = 'Expand';
expandIcon.src = expandIconData;
expandIcon.style.verticalAlign = 'bottom';
expandIcon.setAttribute('onclick', 'icgiExpand()');
collapseIcon = document.createElement('img');
collapseIcon.id = ID_COLLAPSE;
collapseIcon.alt = 'Collapse';
collapseIcon.src = collapseIconData;
collapseIcon.style.display = 'none';
collapseIcon.style.verticalAlign = 'bottom';
collapseIcon.setAttribute('onclick', 'icgiCollapse()');

// 伸縮スクリプトを作る
script = document.createElement('script');
script.type = 'text/javascript';
script.innerHTML = ["var ID_AREA = '__icgi-area__', ID_EXPAND = '__icgi-expand__', ID_COLLAPSE = '__icgi-collapse__'", byId, icgiExpand, icgiCollapse].join('\r\n');

// アイコンとスクリプトを埋め込む
appendElement(script, title);
appendElement(expandIcon, title);
appendElement(collapseIcon, title);

function icgiExpand() {
	var area = byId(ID_AREA), expandIcon = byId(ID_EXPAND), collapseIcon = byId(ID_COLLAPSE);
	expandIcon.style.display = 'none';
	collapseIcon.style.display = 'inline';
	area.style.display = 'block';
}
function icgiCollapse() {
	var area = byId(ID_AREA), expandIcon = byId(ID_EXPAND), collapseIcon = byId(ID_COLLAPSE);
	expandIcon.style.display = 'inline';
	collapseIcon.style.display = 'none';
	area.style.display = 'none';
}

function byId(id, parent) {
	if (!id) return null;
	var e = parent ? parent : document;
	return e.getElementById(id);
}
function byClass(className, parent) {
	if (!className) return null;
	var e = parent ? parent : document;
	return e.getElementsByClassName(className);
}
function appendElement(element, parent) {
	if (!element) return null;
	var e = parent ? parent : byTag('body')[0];
	return e.appendChild(element);
}

})();