// ==UserScript==
// @name           WarezBB search
// @namespace      LocalHost
// @include        http://www.warez-bb.org/*
// @exclude        http://www.warez-bb.org/search.php
// @exclude        http://www.warez-bb.org/search.php?sid=*
// ==/UserScript==


if(!$('GM_search') && $('wadio')){
if(GM_getValue('auto', 'not')=='not') GM_setValue('auto', false);
var a=create('input', {type:'text', value:GM_getValue('auto', false)?GM_getValue('search',''):'', id:'GM_txt'})
var button=create('input', {type:'button', value:'Search', onclick:function(){search()}});
var option=create('input', {type:'checkbox', id:'chebo', onclick:function(){GM_setValue('auto', this.checked);GM_setValue('search', $('GM_txt').value)}, checked:GM_getValue('auto', false)});
var obj=$('wadio');
obj.appendChild(a);
obj.appendChild(button);
obj.appendChild(option);
if(GM_getValue('auto', false)) search(); //if nothing found it auto redirect you to the next page
}

function search()
{
var found=false,o=$('GM_txt');
if(GM_getValue('auto')) GM_setValue('search', o.value);
if(!o.value || $('alreadyexecuted')) return;
var reg=new RegExp(o.value, "i");
var elements=document.querySelectorAll('span[class="topictitle"]>a:nth-last-child(1), a[class="topictitle"], td[class=postbody]>div[class="postbody_div"]');
for(var i=0;i<elements.length;i++){
var e=elements[i];
if(reg.test(e.innerHTML)){
e.innerHTML+=' !Found!';
e.style.color='blue';
found=true
}
}
if(found) document.body.appendChild(create('div', {id:'alreadyexecuted'}));
if(!found && GM_getValue('auto', false)) document.location.href=firstXPathResult('//a[contains(.,"Next") and contains(@title, "Page")]').href;
}

function $(id){return document.getElementById(id)};

function create(a,b) {
	if(!a || a=="" || !b) return;
	var ret=typeof a=='object'?a:document.createElement(a);
	for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(prop=="kids" && (prop=b[prop])) for each(var p in prop) ret.appendChild(p);
		else if(",style,accesskey,id,name,src,href".indexOf(","+prop)!=-1) ret.setAttribute(prop, b[prop]);
		else ret[prop]=b[prop];
	return ret;
}

function firstXPathResult(xpath, against)
{
against = (typeof against == 'undefined')?document:against;
return document.evaluate(xpath, against, null, 9, null).singleNodeValue;
}