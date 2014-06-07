// Copyright (c) 2008, retaggr
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Version 0.1 - 2008.07.07
// - Adds retaggr card to FriendFeed user page if available
//
// Contact: feedback [at] retaggr [dot] com
//
// ==UserScript==
// @name           Retaggr card on FriendFeed
// @namespace      http://www.retaggr.com/Scripts/GreaseMonkey/FriendFeed
// @description    Adds a retaggr card to FriendFeed profile page, if available
// @include        http://friendfeed.com/*
// @exclude        http://friendfeed.com/settings/*
// @exclude        http://friendfeed.com/account/*
// @exclude        http://friendfeed.com/rooms/*
// @exclude        http://friendfeed.com/public/*
// ==/UserScript==

function GM_wait() 
{
	if(typeof unsafeWindow.jQuery == 'undefined') 
	{ 
		window.setTimeout(GM_wait,100); 
	}
	else 
	{ 
		$ = unsafeWindow.jQuery; 
		runScript(); 
	}
}
GM_wait();

function addRetaggrCard(ffUsername)
{
	GM_xmlhttpRequest({
      method: 'GET',
	  url: 'http://script.retaggr.com/API/RetaggrUsernameFromId?service=friendfeed&username=' + ffUsername,
	  onload: function(result) 
	  {
		if (result.status == 200){
			try{
			var resp = eval("(" +  result.responseText + ")" );
			if(resp.success){
				$('#infobox').css('width','360px');
				$('#infobox .body').css('padding','5px');
				
				var css = { background: "transparent", width: "390px",height: "300px",border:"none",margin:"0",padding:"0",overflow:"hidden", frameborder: "0px" };
				
				$('#body .section:eq(0)').before('<iframe id="retaggrCard" src="http://script.retaggr.com/Embed/' + resp.message + '"></iframe>');
				$('#retaggrCard').css(css);
			}
		  }catch(e){  }
		  }
	  }
	}
    );
}

function runScript() 
{
	try{
	var username = $('head link[type=application/atom+xml]').attr('href');
	if(username.length != 0)
	{
		var i = username.indexOf('?');
		if (i > 1){
			username = username.substring(1,i);
			addRetaggrCard(username)
		}
	}
	}catch(e){}
	
}