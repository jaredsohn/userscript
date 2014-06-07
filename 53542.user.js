// ==UserScript==
// @name           Pravoslavie-no select
// @namespace      http://www.pravoslavie.bg/*
// @description    disable selection when move the slider ot bottom of the page
// @include        http://www.pravoslavie.bg/*
// ==/UserScript==

function setMouseDown()
{
	var but = document.getElementById('imageflow_slider');
	but.setAttribute('onmousedown',"imf.dragstart(this); return false;");
}

function isActive()
{
var hid = document.getElementById('imageflow_loading');
	if(hid.style.display == 'none')
		setMouseDown();
	else
		window.setTimeout(isActive,100);	
}

window.setTimeout(isActive,10);