// ==UserScript==
// @name        WoWhead to 178
// @namespace   http://www.wowhead.com
// @include     http://www.wowhead.com/*
// @description	Give wowhead a link to 178 WoW database. 让WoWhead连接回178魔兽数据库.
// @version		1.1
// @author		twitter: @Mini_Dragon_CN
// @grant       none
// ==/UserScript==
var myurl=document.URL;
var patttype=/\b\w+(?==\b)/g;
var pattid=/\d+/g;
type=myurl.match(patttype);
id=myurl.match(pattid);
if ((type!='null') && (type!='user') && (id!='null'))
{
	newurl='http://db.178.com/wow/cn/'+type+'/'+id+'.html';
	myhtml='<a class="button-red" href="'+newurl+'" target="_blank"><em><b><i>Go to 178</i></b><span>Go to 178</span></em></a>';
	document.getElementsByClassName('text')[0].innerHTML=myhtml+document.getElementsByClassName('text')[0].innerHTML;
};