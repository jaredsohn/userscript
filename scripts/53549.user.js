// Created by Graziano
// ngx_graz@hotmail.com
//
// Version 1.1a
//
//**************************************************************//
// ==UserScript==
// @name           Nexopia NoDP
// @description    Hide display pictures in the forum
// @include        http://www.nexopia.com/forumviewthread.*
// @include        https://www.nexopia.com/forumviewthread.*
// ==/UserScript==
//**************************************************************//

function removeDPs()
{
	x=document.getElementsByTagName('a');
	for(i=0;i<x.length;i++)
	{
		if (x[i].getAttribute('name') && x[i].getAttribute('name').match(/^p\d+$/)) // Post id
		{
			var online = x[i].nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;
			var dp = null;
			//GM_log("online '" + online.data);
			if (online.data.match(/- Online -$/))
			{
				//GM_log("***User online***");
				dp = online.nextSibling.nextSibling.nextSibling.childNodes[0];	
			}
			else
			{
				// User offline
				dp = online.nextSibling.childNodes[0];
			}
			
			if (dp)
			{
				dp.style.display = 'none';
			}
			//GM_log("dp:" + dp);
		}
	}
}

removeDPs();