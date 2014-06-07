// ==UserScript==
// @name		UserScript.org Advanced UserScript Admin Options
// @author		Erik Vold
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated	2009-10-22
// @lastupdated	2009-10-24
// @namespace	usoAdvAdminOptions
// @include		http://userscripts.org/scripts/show/*
// @match		http://userscripts.org/scripts/show/*
// @version		0.1
// @description	Adds additional admin options to those displayed on the about page for userscripts at userscripts.org which you added.
// ==/UserScript==

(function(){
	var usoAdvAdminOptions={
		init:function(){
			var admin=document.evaluate("//div[@id='script_sidebar']/h6[contains(text(),'Admin for script')]",document,null,9,null).singleNodeValue;
			if(!admin) return;

			var list=admin.nextSibling;
			if(!list.tagName || list.tagName.toLowerCase()!="ul") list=list.nextSibling;
			if(!list.tagName || list.tagName.toLowerCase()!="ul") return;

			var scriptID=window.location.href.match(/\/show\/(\d+)/);
			if(!scriptID) return;
			scriptID=scriptID[1];

			// rearragne
			var listItems=list.getElementsByTagName('li');
			list.insertBefore(listItems[3],listItems[2]);
			var temp,a;

			//add overview link
			temp=document.createElement('li');
			temp.innerHTML='<a title="Overview" href="/scripts/admin/'+scriptID+'">Overview</a>';
			list.insertBefore(temp,listItems[1]);

			//add 'upload new icon' link
			temp=document.createElement('li');
			a=document.createElement('a');
			a.title="Upload New Icon";
			a.innerHTML=a.title;
			a.href="/images/new?icon=true&script_id="+scriptID;
			a.setAttribute('rel','facebox');
			temp.appendChild(a);
			list.appendChild(temp);
			try {
				unsafeWindow.jQuery(a).facebox();
			} 
			catch (e) {
			}

			//add 'upload new screenshot' link
			temp=document.createElement('li');
			a=document.createElement('a');
			a.title="Upload New Screenshot";
			a.innerHTML=a.title;
			a.href="/images/new?script_id="+scriptID;
			a.setAttribute('rel','facebox');
			temp.appendChild(a);
			list.appendChild(temp);
			unsafeWindow.jQuery(a).facebox();
		}
	}
	usoAdvAdminOptions.init();
})();