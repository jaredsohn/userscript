// Copyright (c) 2008, retaggr
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Version 0.1 - 2008.07.07
// - Adds retaggr card to tumblr profile page if available
//
// Contact: feedback [at] retaggr [dot] com
//
// ==UserScript==
// @name           Retaggr card on tumblr
// @namespace      http://www.retaggr.com/Scripts/GreaseMonkey/Tumblr
// @description    Adds retaggr to tumblr profile when available
// @include        http://*.tumblr.com/

// ==/UserScript==


runScript();

function addRetaggrCard(username)
{
	
	GM_xmlhttpRequest({
      method: 'GET',
	  url: 'http://script.retaggr.com/API/RetaggrUsernameFromId?service=tumblr&username=' + username,
	  onload: function(result) 
	  {
		if (result.status == 200){
			try{
			var resp = eval("(" +  result.responseText + ")" );
			if(resp.success){
				var ele = document.getElementById('description').getElementsByTagName('div')[0];
				ele.innerHTML  +=  '<iframe  style="background:transparent;width: 390px;height: 300px;border:none;margin:0;padding:0;overflow:hidden;frameborder:0px" id="retaggrCard" src="http://script.retaggr.com/Embed/' + resp.message + '/GM"></iframe>'
			}
		  }catch(e){
		  }
		 }
	  }
	}
    );
}


function trim(str) {return str.replace(/^\s+/, '').replace(/\s+$/, '');}


function runScript() 
{
	try{
	var username = window.location.host.replace('.tumblr.com','');
	if(username.length != 0)
	{
		addRetaggrCard(username)
	}
	}catch(e){}
	
}