// ==UserScript==
// @name       nyaa.se newest separator
// @namespace  http://www.nyaa.se
// @version    1.1
// @match      http://www.nyaa.se/?page=torrents&cats=1_37&filter=1
// @copyright  nixx1338
// @include     http://www.nyaa.se
// ==/UserScript==

var mainTable = document.getElementsByClassName('tlist');
var t = document.getElementsByClassName('tlistname');

var found = false;

for (var i = 0; i < t.length; i++)
{
    if (!found)
    {
        if (t[i].innerHTML.replace(";","") == getCookie("topmost"))
    	{
            if (i != 0)
        		t[i].parentNode.style.borderTop = "thick solid red";
                
            found = true;
    	}
    }
}

var cdate = new Date();
cdate.setFullYear(cdate.getFullYear()+1);
var fix = cdate.toUTCString();
document.cookie="topmost="+t[0].innerHTML.replace(";","")+"; expires="+fix;

function getCookie(cname)
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) 
    {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
}