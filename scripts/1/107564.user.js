// ==UserScript==
// @name           Ekko Custom Background
// @namespace      http://www.ekko.com
// @version		   1.3.3.7
// @description    Get your custom background on ekko! hell yeah!
// @include        http://*ekko.com*
// @icon           http://ekko.com/static/m/i/icon_l.png
// @require        https://raw.github.com/odyniec/MonkeyConfig/master/monkeyconfig.js
// ==/UserScript==

var urls = new Array();
urls["profile"] = new Array();

var cfg = new MonkeyConfig({
    title: 'Ekko Custom Background Configuration',
    menuCommand: true,
    params: {
        backgrounds: {
        	type: 'text',
        	default: 'urls["add"] = "url(http://ekko.com/static/img/bg.jpg)";\
urls["settings"] = "url(http://ekko.com/static/img/bg.jpg)";\
urls["male"] = "url(http://www.deolv.be/various/growup2.png)";\
urls["female"] = "url(http://www.deolv.be/various/babies2.png)";\
urls["default"] = "url(http://www.deolv.be/various/lousybg2.png)";\
urls["profile"]["Frank"] = "url(http://ekko.com/static/img/bg_female.jpg)";',
			long: true
		}
    },
    onSave: function (values) {
    	eval(values.backgrounds);
    }
});

eval(cfg.get('backgrounds'));

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
    window.onhashchange = function () {
    	var parts = null;
		document.getElementById('backdrop').style.MozBackgroundSize = 'cover';
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