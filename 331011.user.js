// ==UserScript==
// @name       Open feedspot links
// @namespace  http://splintor.userscripts.org
// @version    0.2
// @description  directly open links in feedspot.com in their original location
// @match      http://www.feedspot.com/*
// @include    http://www.feedspot.com/*
// @copyright  2014+, splintor@gmail.com
// ==/UserScript==

function checkPopupLink()
{
    if(!location.hash)
    {
        console.log("Open Feedpost script: location.hash is empty. Exiting...");
        return;
    }
    
	var linkHref = $(".share_node_ddpop_close").parent().find(".ext_link").attr('href');
	if(linkHref)
	{
        console.log("Open Feedpost script: Found link. opening " + linkHref);
    	location.href = linkHref;
	}
    else
    {
        console.log("Open Feedpost script: Didn't find link. Will try atain in 1 second");
        setTimeout(checkPopupLink, 1000);
    }
}

checkPopupLink();