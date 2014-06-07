// ==UserScript==
// @id             GAC
// @name           Gelbooru autocopy
// @version        1.0
// @namespace      0
// @author         Delta-chan
// @description    Gives ur ultimate ability to copy gelbooru image links!
// @description    Warning!!! Scriptish requre instead of greasemonkey!
// @include        *gelbooru.com*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @run-at         document-idle
// ==/UserScript==
function setcookie(name, value, expires, path, domain, secure)
{
    document.cookie =    name + "=" + escape(value) +
                        ((expires) ? "; expires=" + (new Date(expires)) : "") +
                        ((path) ? "; path=" + path : "") +
                        ((domain) ? "; domain=" + domain : "") +
                        ((secure) ? "; secure" : "");
}
function getcookie(name)
{
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    
    if (cookie.length > 0)
    {
        offset = cookie.indexOf(search);
        
        if (offset != -1)
        {
            offset += search.length;
            end = cookie.indexOf(";", offset)
            
            if (end == -1)
            {
                end = cookie.length;
            }
            
            setStr = unescape(cookie.substring(offset, end));
        }
    }
    
    return(setStr);
}

function _copy()
{
	setcookie('action', 'copy', '/', 10000);

}
function _open()
{
	setcookie('action', 'open', '/', 10000);
}
function _disable()
{
	setcookie('action', '0', '/', 10000);
}

$('body').prepend('<div style="background:#006ffa; border: solid 1px black; color:#fff; font: normal normal 11px Tahoma; padding:3px; position: fixed; top: 2px; right:0px; z-index: 9999"><a href="#" id="_copy" style="color: white;">Copy image links</a><br><a href="#" style="color: white;" id="_open">Open image links</a><br><a href="#" style="color: white;" id="_disable">Disable</a><br></div>');

$("#_copy").click(_copy);
$("#_open").click(_open);
$("#_disable").click(_disable);

var link = document.documentElement.innerHTML.match(/<img.*src="(.*?)" id="image"/)[1];
if(getcookie('action') == 'copy')
{
	if(link)
	{
		GM_setClipboard(link);
	}
}
if(getcookie('action') == 'open')
{
	if(link)
	{
		window.location = link;
	}
}