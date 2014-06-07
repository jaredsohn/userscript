// Copyright (c) 2008, retaggr
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Version 0.1 - 2008.07.07
// - Adds retaggr card to disqus profile page if available
//
// Contact: feedback [at] retaggr [dot] com
//
// ==UserScript==
// @name           Retaggr card on diqsus
// @namespace      http://www.retaggr.com/Scripts/GreaseMonkey/Disqus
// @description    Adds retaggr to disqus profile when available
// @include        http://www.disqus.com/people/*

// ==/UserScript==



function GM_wait() 
{
	if(typeof unsafeWindow.$ == 'undefined') 
	{ 
		window.setTimeout(GM_wait,100); 
	}
	else 
	{ 
		$ = unsafeWindow.$; 
		$$ = unsafeWindow.$$; 
		runScript(); 
	}
}
GM_wait();

function addRetaggrCard(username)
{
	
	GM_xmlhttpRequest({
      method: 'GET',
	  url: 'http://script.retaggr.com/API/RetaggrUsernameFromId?service=disqus&username=' + username,
	  onload: function(result) 
	  {
		if (result.status == 200){
			try{
			var resp = eval("(" +  result.responseText + ")" );
			if(resp.success){
				var ele = document.getElementById('profile-extended');
				ele.innerHTML  +=  '<br clear="all"/><h2><span>retaggr card</span></h2><ul><li style="text-align:right"><iframe  style="background:transparent;width: 390px;height: 300px;border:none;margin:0;padding:0;overflow:hidden;frameborder:0px" id="retaggrCard" src="http://script.retaggr.com/Embed/' + resp.message + '/GM"></iframe></li></ul>'
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
	var username = trim($$('#user-comments h1')[0].innerHTML);
	if(username.length != 0)
	{
		addRetaggrCard(username)
	}
	}catch(e){}
	
}