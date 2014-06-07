// ==UserScript==
// @version        1.0.3 //this is required for the autoupdate script to work
// @name           AutoUpdateTest
// @namespace      AUT100
// @description    just testing an auto update script
// @include        http://*
// @include        https://*
// ==/UserScript==

var CheckForUpdates = function(name,version,id) {
	var today = new Date();
	today = today.getDate();
	var lastupdate = GM_getValue('lastupdate',1000);
	var dif = today - lastupdate;
	var updatedays = 7; //how many days between update checks (set to 0 to check every time you visit userscripts.org)
	var uurl = 'http://userscripts.org/scripts/review/'+id+'?format=txt';
	
	this.init = function()
	{
		if(dif>=updatedays || dif<=-updatedays)
		{
			GM_setValue('lastupdate',today);
			this.check();	
		}
	}

	this.check = function()
	{
		GM_xmlhttpRequest({method:"GET",url:uurl,onreadystatechange:this.doupdate});
	}

	this.doupdate = function(o)
	{
		if(o.readyState == 4)
		{
			checkver = o.responseText.substr(0,100);
			checkver = checkver.split('@version')[1];
			checkver = parseInt(checkver.replace(/\./g,''))+100;
			thisver = parseInt(version.replace(/\./g,''))+100;
			if(checkver>thisver)
			{
				if(confirm('Update '+name+'?'))
				{
					window.location = 'http://userscripts.org/scripts/source/'+id+'.user.js';
				}
			}
			
		}
	}

this.init();
}

wloc = ''+window.location;
pattern = /userscripts/;
result = wloc.match(pattern);
if(result)//check for updates
CheckForUpdates('AutoUpdateTest','1.0.3',16338);//CheckForUpdates(scriptname,scriptversion,scriptnumber);