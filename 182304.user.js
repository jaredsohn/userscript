// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://tx3.travian.ru/dorf1.php
// @copyright  2012+, You
// @run-at         document-end
// @include	       http://sx800.xtravianx.net/*
// @include	       http://travian-hell.ru/*
// @include        http://finals.travian.com/*
// ==/UserScript==
var obj = document.getElementsByTagName('img');
var len = obj.length;
for(var i = 0;i<len - 1;i++)
{
    
    if(obj[i].getAttribute('class') != null)
    {
    	if(obj[i].getAttribute('class') == 'map1')
    	{
    	    obj[i].setAttribute('src','https://pp.vk.me/c419821/v419821844/8ccd/LyJtZgh5osw.jpg');
    	    obj[i].style.zIndex = 1;
    	}
    	else
    	{
    	    var asd = obj[i].getAttribute('class');
    	    if(asd != null)
    	    {
    	    	if(asd.indexOf('building') != -1)
    	    	{
                    if(asd.indexOf('iso') != -1)
                    {
                     	obj[i].setAttribute('src','http://dbwap.ru/7883941.gif');   
                    }
    	    		obj[i].style.zIndex = i+2;
    	    	}
    	    }
   		}
    }
}
var doc = document.getElementById('map2');
var lenn = doc.children.length;
for(var q = 0;q<lenn;q++)
{
 	doc.children[q].style.zIndex = q + 40; 
}

