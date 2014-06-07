// ==UserScript==
// @name           Netlog Topbar
// @description    Puts the netlog top bar always on the top of your screen
// @copyright      Klaas Cuvelier & Lode Vanhove (klaas@netlog.com, lode@netlog.com)
// @version        1.1
// @match http://*.netlog.com/*
// @match http://*.staging.comcore.be/*
// @include http://*.netlog.com/*
// @include http://*.staging.comcore.be/*
// ==/UserScript==


var scripts = document.getElementsByTagName('script');
var version = 0;
for(var i = 0; i < scripts.length; i++)
{
  s = scripts[i];
  if (s.getAttribute('src'))
  {
    if (s.getAttribute('src').indexOf('v.netlogstatic.com/v4.00') > -1)
    {
       version = 4;
       break;
    }
    else if (s.getAttribute('src').indexOf('v.netlogstatic.com/v5.00') > -1)
    {
       version = 5;
       break;
    }
  }
}


if (version == 5)
{
	hw = document.getElementById('headerWrapper');
	ts = document.getElementById('topshadow');
	db = document.getElementById('devBar');

	if (hw)
	{
		hw.style.position = 'fixed';
		hw.style.zIndex   = 50;
		hw.style.top      = 0;
		hw.style.width    = '100%';
	
 		hw.nextSibling.nextSibling.style.paddingTop = '51px';
	}

	if (ts)
	{
	  ts.style.position =  'fixed';
	  ts.style.zIndex   = 50;
	  ts.style.width    = '100%';
	  ts.style.top      = '51px';
	}

	if (db)
	{
	  db.style.marginTop = '51px';
	  db.style.width     = '100%';
	  db.style.zIndex    = 50;
	}
}