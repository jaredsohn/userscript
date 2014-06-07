// ==UserScript==
// @name           Castle Age Tools Scriptlet
// @namespace      apps.facebook.com/castle_age
	var d=document;
	var catbx=d.getElementById('CA-Tools');
	if(!catbx)
	{
		var s=d.createElement('script');
		s.setAttribute('src','http://cage.northcornwall.com/hoots/catbox.asp');
		s.setAttribute('type','text/javascript');
		d.body.appendChild(s);
		catbx=d.createElement('div');
		catbx.setAttribute('id','CA-Tools');
		var d2=d.getElementById('app_content_46755028429');
		d2.parentNode.insertBefore(catbx,d2);
	}
	else catboxpoop();
// ==/UserScript==
