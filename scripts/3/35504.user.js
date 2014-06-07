// ==UserScript==
// @name           Habrahabr.ru Reader Mode
// @namespace      habr
// @include        http://habrahabr.ru/*
// @include        http://*.habrahabr.ru/*
// ==/UserScript==

var prevWidth = null;

SwitchReaderMode(GM_getValue('readerModeEnabled', false));

function SwitchReaderMode(enabled)
{
	var mainContent = document.getElementById('main-content');
	var sidebar = document.getElementById('sidebar');
	
	if (mainContent && sidebar)
	{
		if (enabled)
		{
			sidebar.style.display= 'none';
			prevWidth = mainContent.style.width;
			mainContent.style.width = '100%'
		}
		else
		{
			if (prevWidth == null)
				return;
			sidebar.style.display= 'block';
			mainContent.style.width = prevWidth;
		}
	}
}

GM_registerMenuCommand("Habr -> Reader Mode", function(){
	SwitchReaderMode(true);
	GM_setValue('readerModeEnabled', true)
});

GM_registerMenuCommand("Habr -> Normal Mode", function(){
	SwitchReaderMode(false);
	GM_setValue('readerModeEnabled', false)
});