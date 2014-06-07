// ==UserScript==
// @name          PH! navkeys
// @namespace     http://prohardver.hu
// @description   Adding Google Reader like navigation
// @include       http://prohardver.hu/teszt/*
// @include       http://mobilarena.hu/teszt/*
// @include       http://gamepod.hu/teszt/*
// @include       http://logout.hu/cikk/*
// @require 	  http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// ==/UserScript==

//Prohardver / Mobilarena part
var toc1, pageNumber, keresoPh, menu;

if ((window.location.host == 'prohardver.hu' || window.location.host == 'mobilarena.hu') && document.getElementById('toc1') !== null)
{
	toc1 = document.getElementById('toc1');
	pageNumber = toc1.getElementsByClassName('open')[0].innerHTML.charAt(0);
	keresoPh = document.getElementById('ssearch').getElementsByClassName('iti')[0];
	menu = toc1.getElementsByClassName('menu')[0].firstChild.getElementsByTagName("li");
	
    window.addEventListener('load', function()
    {
	    if (pageNumber !== undefined)
	    {
			keresoPh.addEventListener("focus", removeShortcut, true);
			keresoPh.addEventListener("blur", addShortcutPh, true);
            addShortcutPh();
	    }
    }, true);
}

function addShortcutPh()
{
	if (pageNumber>=2)
	{
	    shortcut.add("J",function() 
	    {
		    window.location = menu[pageNumber-2].firstChild.href;
	    });
	}
	var maxPageNumber = menu.length;
	if (pageNumber != maxPageNumber)
	{
	    shortcut.add("K",function()
	    {
		    window.location = menu[pageNumber].firstChild.href;
		});
	}
}

//Logout part
var select, pageIndex, keresoLogout;

if(window.location.host == 'logout.hu' && document.getElementsByClassName('toc') !== null)
{
	select = document.getElementsByClassName('toc')[0].getElementsByTagName('select')[0];
	pageIndex = select.selectedIndex;
	keresoLogout = document.getElementById('balhcontent').getElementsByClassName('iti')[0];
	
    window.addEventListener('load', function()
    {
		if (pageIndex !== undefined)
		{
			keresoLogout.addEventListener("focus", removeShortcut, true);
			keresoLogout.addEventListener("blur", addShortcutLogout, true);
			addShortcutLogout();
		}
    }, true);
}

function addShortcutLogout()
{
	var maxPageIndex = select.length-1;
	var evt = document.createEvent('HTMLEvents');
	evt.initEvent('change', true, true);
	
	if (pageIndex >= 1)
	{
		shortcut.add("J",function() 
		{
			select.selectedIndex=pageIndex-1;
			select.dispatchEvent(evt);
		});
	}
		
	if (pageIndex < maxPageIndex)
	{
		shortcut.add("K",function() 
		{
			select.selectedIndex=pageIndex+1;
			select.dispatchEvent(evt);
		});
	}
}

//Gamepod part
var selectGamepod, pageIndexGamepod, keresoGamepod;

if(window.location.host == 'gamepod.hu' && document.getElementsByClassName('toc') !== null)
{
    selectGamepod = document.getElementsByClassName('toc')[0].getElementsByTagName('select')[0];
    pageIndexGamepod = selectGamepod.selectedIndex;
    keresoGamepod = document.getElementById('balh').getElementsByClassName('iti')[0];

    window.addEventListener('load', function()
    {
		if (pageIndexGamepod !== undefined)
		{
			keresoGamepod.addEventListener("focus", removeShortcut, true);
			keresoGamepod.addEventListener("blur", addShortcutGamepod, true);
			addShortcutGamepod();
		}
    }, true);
}

function addShortcutGamepod()
{
	var maxPageIndex = selectGamepod.length-1;
	var evt = document.createEvent('HTMLEvents');
	evt.initEvent('change', true, true);
	
	if (pageIndexGamepod >= 1)
	{
		shortcut.add("J",function() 
		{
			selectGamepod.selectedIndex=pageIndexGamepod-1;
			selectGamepod.dispatchEvent(evt);
		});
	}
		
	if (pageIndexGamepod < maxPageIndex)
	{
		shortcut.add("K",function() 
		{
			selectGamepod.selectedIndex=pageIndexGamepod+1;
			selectGamepod.dispatchEvent(evt);
		});
	}
}

function removeShortcut()
{
    shortcut.remove("J");
	shortcut.remove("K");
}
