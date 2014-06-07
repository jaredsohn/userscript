// Copyright (c) 2008, retaggr
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Version 0.1 - 2008.07.07
// - Adds retaggr card to twitter profile page if available
//
// Contact: feedback [at] retaggr [dot] com
//
// ==UserScript==
// @name           Retaggr card on twitter
// @namespace      http://www.retaggr.com/Scripts/GreaseMonkey/twitter
// @description    Adds a retaggr card to twitter profile page, if available
// @include        http://twitter.com/*

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

function addRetaggrCard(twitterUsername)
{
	GM_xmlhttpRequest({
      method: 'GET',
	  url: 'http://script.retaggr.com/API/RetaggrUsernameFromId?service=twitter&username=' + twitterUsername,
	  onload: function(result) 
	  {
		if (result.status == 200){
			try{
			var resp = eval("(" +  result.responseText + ")" );
			if(resp.success){
				$('#side').css('width','360px');
				
				var css = { background: "transparent", width: "390px",height: "300px",border:"none",margin:"0",padding:"0",overflow:"hidden", frameborder: "0px" };
				
				$('#side ul.about').append('<li><iframe id="retaggrCard" src="http://script.retaggr.com/Embed/' + resp.message + '"></iframe></li>');
				$('#retaggrCard').css(css);
			}
		  }catch(e){}
		  }
	  }
	}
    );
}

function runScript() 
{
	try{
	if($('#content h2.thumb'))
	{
		var username = $.trim($('#content h2.thumb').text());
		if(username.length != 0)
		{
			addRetaggrCard(username)
		}
	}
	}catch(e){}
}