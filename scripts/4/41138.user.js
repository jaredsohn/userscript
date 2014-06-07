// Post Link
// version 1.0
// created by littlerat
// 2008-06-26
// Copyright (c) 2005
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// 
//
// --------------------------------------------------------------------
//
// Making bungie.net an easier place.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Better Links for Bungie.net
// @namespace     http://coke.soffish.com
// @description   Replaces the group link in the title bars of each post with a link for the post(eg. "...postID=32155#2525")
// @include       http://*bungie.net/Forums/posts.aspx*
// @include       http://*bungie.net/fanclub/*Forums/posts.aspx*
// ==/UserScript==



(function() 
{		
	//replaces the groups link with a link for the post
	var divArray = document.getElementsByTagName("div");
	for (var i = 0; i<divArray.length; i++)
	{
		if(divArray[i].getAttribute("class") == "forumpost")
		{
			if (!(divArray[i].innerHTML.match(/<empty.*>/i))) {
			} else{			
				divArray[i].innerHTML = divArray[i].innerHTML.replace(/<empty.*>/i,"</span></p>");			
			}
			//find post ID			
			var tempexp = new RegExp("postID.*act=msg", 'gi');
			var msgStr = String(divArray[i].innerHTML.match(tempexp)); 
			if (msgStr == 'null')
			{	
				tempexp = new RegExp("postID.*act=reply",'gi');
				msgStr = String(divArray[i].innerHTML.match(tempexp));
			}
			if (!(msgStr == 'null'))
			{
				//alert(divArray[i].innerHTML.match(/>.*.more.*.</));
				//return(0);
				var postID = msgStr.substr(msgStr.indexOf('=')+1, (msgStr.indexOf('&')-(msgStr.indexOf('=')+1)));			
				//narrow down stuff
				divArray[i].innerHTML = divArray[i].innerHTML.replace(/li class=.author_header_links.>.*.more.*.<.li/gi, "li class='author_header_links'>&nbsp;|&nbsp;<a href='#"+postID+"'>link</a>&nbsp;</li");
			}
		}
	}
})();