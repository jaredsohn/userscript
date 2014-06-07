// Copyright (c) 2011, Yohan -- friendfeed/yoh4n
// ==UserScript==
// @name           Friendfeed Direct Messages
// @namespace      http://userscripts.org/users/360750
// @include        http://friendfeed.com/*
// @include        http://beta.friendfeed.com/*
// @include        https://friendfeed.com/*
// @include        https://beta.friendfeed.com/*
// @exclude	http://friendfeed.com/share/bookmarklet/*
// @exclude	http://beta.friendfeed.com/share/bookmarklet/*
// @exclude	https://friendfeed.com/share/bookmarklet/*
// @exclude	https://beta.friendfeed.com/share/bookmarklet/*
// @version 1
// ==/UserScript==
var allHTMLTags = new Array();
function getElementByClass(theClass) {
	var allHTMLTags=document.getElementsByTagName("*");
	for (i=0; i<allHTMLTags.length; i++) {
		if (allHTMLTags[i].className==theClass) {
			allHTMLTags[i].innerHTML=dm;
		}
	}
}
function GM_wait()
{
    if(typeof unsafeWindow.jQuery == 'undefined')
    {
        window.setTimeout(GM_wait,251);
    }
    else
    {
        $ = unsafeWindow.jQuery; letsJQuery();
    }
}
GM_wait();

function letsJQuery()
{
	    $.ajax(
	    {
	        dataType: "html",
	        url: "http://friendfeed.com/api/",
	        success: function(data, textStatus) {
	            dmfull = new RegExp(/<div class="section">([\S\s]*?)<\/div>/ig).exec(data);
	            if(dmfull)
	            {
					dm = $.trim(dmfull[1].toString());
					window.setTimeout(GM_setValue, 0, "dm", dm);
					getElementByClass('section');
	            }
	        }
	    });
		startInterval();
}


function startInterval()
{

	setTimeout(letsJQuery, 10000);
}