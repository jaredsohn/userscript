// ==UserScript==
// @name           wz Quick Search Mod
// @description    Add option to search only titles
// @namespace      LocalHost
// @include        *warezakias.info/*
// ==/UserScript==

if(!$('_checked'))
{
var element=document.getElementById('gbl-search-forums');
var e=create('input', {id:'_topicSearch', type:'hidden',name:'search_in',value:'titles'});
element.parentNode.insertBefore(e, element.nextSibling);
var a=firstXPathResult("//a[.='More Search Options']");
a.parentNode.replaceChild(create("div", {kids:new Array(
create("a", {href:a.href,textContent:"Advance"}),
document.createTextNode("| "),
create("a", {textContent:"Title Search: ",onclick:function(){$("_checked").checked=!$("_checked").checked;}}),
create("input", {type:'checkbox',id:'_checked',checked:true,onclick:function(){setTopic($("_checked").checked)}})
)}), a);
$('ipb-tl-search-box').style.margin='3px';
$('ipb-tl-search_menu').style.width='181px';
}

function setTopic(value)
{
value=value?'titles':'posts';
$('_topicSearch').value=value;
}

function $(id){return document.getElementById(id)};

function firstXPathResult(xpath, against)
{
against = (typeof against == 'undefined')?document:against;
return document.evaluate(xpath, against, null, 9, null).singleNodeValue;
}

// Created by avg, modified by JoeSimmons
function create(a,b) {
	if(!a || a=="" || !b) return;
	var ret=typeof a=='object'?a:document.createElement(a);
	for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(prop=="kids" && (prop=b[prop])) for each(var p in prop) ret.appendChild(p);
		else if(",style,accesskey,id,name,src,href".indexOf(","+prop)!=-1) ret.setAttribute(prop, b[prop]);
		else ret[prop]=b[prop];
	return ret;
}