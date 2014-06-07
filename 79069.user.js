// ==UserScript==
// @name           Yahoo Mail Options - Selectable Lists
// @description    Change Style of Lists in Yahoo Mail Options.
// @version        1.0
// @date           13.06.2010
// @author         Volkan KIRIK
// @namespace      http://userscripts.org/users/volkan
// @include        http://*.mail.yahoo.com/*
// @include        https://*.mail.yahoo.com/*
// ==/UserScript==

window.addGlobalStyle = function(css)
{
    var head, style;
    head = document.getElementById('mailoptions').contentDocument.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.getElementById('mailoptions').contentDocument.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

window.helloworld = function()
{
	if (document.getElementById('mailoptions') && document.getElementById('mailoptions').contentDocument)
	{
		addGlobalStyle('.mailoptions_listEditorLine  { -moz-user-select: text !important; }');
	}
}

window.addEventListener("DOMFrameContentLoaded", function(event) {
	if ( event.target && ( event.target.id == 'mailoptions' ) )
	{
		helloworld();
	}
}, true);
