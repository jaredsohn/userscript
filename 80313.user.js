// ==UserScript==
// @name           Revert Order Comments (RuTor.Org)
// @namespace      userscripts.org
// @author         Release
// @version        1.3
// @history        1.3 Fixing support IE, Safari and others.
// @history        1.2 Fixing support Opera.
// @history        1.1 Initial version.
// @description    (EN)Changes the display order of comments to the opposite.
// @description    (RU)Меняет порядок отображения комментариев на противоположный.
// @include        http://rutor.org/torrent/*
// ==/UserScript==

function process()
{
    if (arguments.callee.done) return;
    arguments.callee.done = true;
	//process comments begin
	var trs = document.getElementsByClassName('c_h');
	var tbody = trs[0].parentNode;
	var count = tbody.childElementCount - 6;
	for(var i = count; i > -1; i = i - 3)
	{
		tbody.appendChild(tbody.childNodes[i]);
		tbody.appendChild(tbody.childNodes[i]);
		tbody.appendChild(tbody.childNodes[i]);
	} //process comments end
}

// Set event for firefox, opera
if (document.addEventListener)
{
    document.addEventListener("DOMContentLoaded", process, false);
}

// Set event for ie
/*@cc_on @*/
/*@if (@_win32)
document.write("<script id=__ie_onload defer src=javascript:void(0)>");
document.write("<\/script>");
var script = document.getElementById("__ie_onload");
script.onreadystatechange = function()
{
    if (this.readyState == "complete")
    {
        process();
    }
};
/*@end @*/

// Set event for safari
if (/WebKit/i.test(navigator.userAgent))
{
    var _timer = setInterval(function()
    {
        if (/loaded|complete/.test(document.readyState))
        {
            clearInterval(_timer);
            delete _timer;
            process();
        }
    }, 10);
}

// Set event for other browsers
window.onload = process;
