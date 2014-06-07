// Copyright (c) 2008, retaggr
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Version 0.1 - 2008.07.07
// - Adds retaggr card to Flickr profile if available
//
// Contact: feedback [at] retaggr [dot] com
//
// ==UserScript==
// @name           Retaggr card on flickr
// @namespace      http://retaggr.com/Scripts/GreaseMonkey/Flickr
// @description    Adds a retaggr card to Flickr profile page, if available
// @include        http://www.flickr.com/people/*
// @include        http://flickr.com/people/*

// ==/UserScript==



function addRetaggrCard(username)
{
	GM_xmlhttpRequest({
      method: 'GET',
	  url: 'http://script.retaggr.com/API/RetaggrUsernameFromId?service=flickr&username=' + username,
	  onload: function(result) 
	  {
		if (result.status == 200){
			try{
				var resp = eval("(" +  result.responseText + ")" );
				if(resp.success){
					var ele = document.getElementById('Left');
					ele.innerHTML  +=  '<br clear="all"/><h3>retaggr card</h3><iframe style="background:transparent;width: 390px;height: 300px;border:none;margin:0;padding:0;overflow:hidden;frameborde:0px" id="retaggrCard" src="http://script.retaggr.com/Embed/' + resp.message + '/GM"></iframe>'
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
	var username;
	var spans = document.getElementsByTagName('span');
	for(var i=0; i < spans.length;i++){
		if (spans[i].className ==  'nickname'){
			username = spans[i].innerHTML;
			break;
		}
	}
	
	if(username)
	{
		addRetaggrCard(username)
	}
	}catch(e){}
}

runScript();