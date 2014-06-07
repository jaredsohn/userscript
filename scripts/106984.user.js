// ==UserScript==
// @name           Remove Facebook Chat Sidebar
// @author         Ectrian
// @version        1
// @description    Removes the new facebook chat sidebar.
// @include        *facebook.com*
// @namespace      tag:ectrian
// @require        http://code.jquery.com/jquery-1.3.min.js
// ==/UserScript==

rmfb();

function rmfb()
{
	$("div[class^=fbChatSidebar]").hide();
	$("div[class=ego_column]").hide();
	$("div[id=pageSidenavFooter]").hide();
	$(".ticker_container").css('height',(window.innerHeight - 100) + 'px');
	$(".ticker_container").css('border-left','1px solid #B3B3B3');
	$(".ticker_container").css('border-bottom','1px solid #B3B3B3');
}

document.addEventListener("DOMNodeInserted", rmfb, true);
