// ==UserScript==
// @name           Nemexia Color
// @namespace      Evil Coding
// @description    4 nice res look :)
// @include        http://*game.nemexia.ru/*
// ==/UserScript==


function chcol(p) {
	col = '#4CFF00';
	if (p>33) col = '#FFD800';
	if (p>66) col = '#FF0000';
	return col;
}

function addElem(elem, html, attributes, style, parent){
	var aElem = document.createElement(elem);
	if (html) aElem.innerHTML = html;
	if (attributes)	for (a in attributes) aElem.setAttribute(a, attributes[a]);
	if (style) for (a in style) aElem.style[a] = style[a];
	parent=$('resources');
	if (!parent) parent = $tags('body')[0];
		else parent = (typeof(parent) == 'string') ? $(parent) : parent;
	if (!parent) return false;
	parent.appendChild(aElem);
	return aElem;
}

function $tags(tag){
	return document.getElementsByTagName(tag);
}

function $(id){
	return document.getElementById(id);
}

function oaLoad () {
	var w = window.wrappedJSObject
	obj = document.getElementById("boxResMetal");
	obj.style.color = '#2699FF';
	pr=w.PLAYER['metal']/w.PLAYER['max_metal']*100;
	pr= Math.round(pr);
	obj.style.color = chcol(pr);
	obj.innerHTML=w.PLAYER['metalFormat'] + '/<br>' + w.PLAYER['maxMetalFormat']+'(' + pr+'%)';

	obj = document.getElementById("boxResCrystal");
	obj.style.color = '#2699FF';
	pr=w.PLAYER['crystal']/w.PLAYER['max_crystal']*100;
	pr= Math.round(pr);
	obj.style.color = chcol(pr);
	obj.innerHTML=w.PLAYER['crystalFormat'] + '/<br>' + w.PLAYER['maxCrystalFormat']+'(' + pr+'%)';

	obj = document.getElementById("boxResGas");
	obj.style.color = '#2699FF';
	pr=w.PLAYER['gas']/w.PLAYER['max_gas']*100;
	pr= Math.round(pr);
	obj.style.color = chcol(pr);
	obj.innerHTML=w.PLAYER['gasFormat'] + '/<br>' + w.PLAYER['maxGasFormat']+'(' + pr+'%)';
	
	var el = document.createElement( 'div' );
	el.setAttribute("id","Crap");
	el.setAttribute("class","resourceBox");
	el.style.padding="1px";
	el.setAttribute("onmouseover", "Tip('Обломки<br>' + PLAYER['recycle']);");
	el.setAttribute("onmouseout","UnTip();");
	el.innerHTML='<div class="thumbnail"><img src="http://img.nemexia.ru/img/buildings/race3/thumb_216.jpg" width="55"></div><br>Обломки:<br>'+w.PLAYER['recycle'];
	obj = document.getElementById("resources");
	obj.style.width='550px';
	obj.appendChild( el );

}

addEventListener("load", oaLoad, false);