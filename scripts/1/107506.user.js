// ==UserScript==
// @name           Ekko Custom Background
// @namespace      http://www.ekko.com
// @version		   1.3.3.7
// @author         http://ekko.com/#!/marijnnn
// @description    Get your custom background on ekko! hell yeah!
// @include        http://*ekko.com*
// @icon           http://ekko.com/static/m/i/icon_l.png
// @updateURL      http://userscripts.org/scripts/source/107506.user.js
// ==/UserScript==

var urls = new Array();
urls['add'] = "url(http://ekko.com/static/img/bg.jpg)";
urls['settings'] = "url(http://ekko.com/static/img/bg.jpg)";
urls['male'] = "url(http://www.deolv.be/various/growup2.png)";
urls['female'] = "url(http://www.deolv.be/various/babies2.png)";
urls['default'] = "url(http://www.deolv.be/various/lousybg2.png)";
urls['profile'] = new Array();
urls['profile']['Frank'] = "url(http://ekko.com/static/img/bg_female.jpg)";
urls['ekko8'] = "url(http://www.deolv.be/various/babe.jpg)";


document.getElementById('backdrop').style.MozBackgroundSize = 'cover';
document.getElementById('backdrop').style.background = 'no-repeat center center fixed';


function genderBG()
{
	if (document.body.className.indexOf('female') !== -1)
	{
       	document.getElementById('backdrop').style.backgroundImage = urls['female'];
	}
	else if (document.body.className.indexOf('male') !== -1)
	{
       	document.getElementById('backdrop').style.backgroundImage = urls['male'];
	}
}

if ("onhashchange" in window)
{// does the browser support the hashchange event?
        var le_window = (typeof(unsafeWindow)!=='undefined')?unsafeWindow:window;
        le_window.onhashchange = function () {
    	var parts = null;

       if (window.location.hash.indexOf('#!/add') === 0)
       {
       		document.getElementById('backdrop').style.backgroundImage = urls['add'];
       }
       else if (window.location.hash.indexOf('#!/settings') === 0)
       {
       		document.getElementById('backdrop').style.backgroundImage = urls['settings'];
       }
       else if ((parts = window.location.hash.match(/^#!\/([^\/]+)$/)) !== null)
       {
       		if (urls['profile'][parts[1]])
       		{
       			document.getElementById('backdrop').style.backgroundImage = urls['profile'][parts[1]];
       		}
       		else
       		{
       			setTimeout(genderBG, 400);
       		}
       
       }
       else if (window.location.hash.match(/^#!\/i\/8$/) !== null)
       {
       		document.getElementById('backdrop').style.backgroundImage = urls['ekko8'];
       }
       else 
       {
       		document.getElementById('backdrop').style.backgroundImage = urls['default'];
       }
       
    }
}