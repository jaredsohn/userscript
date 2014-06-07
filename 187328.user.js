// ==UserScript==
// @name       Game Tab Store Button
// @namespace  mF4dUS.GameTabStoreButton
// @version    0.2
// @description  at Game Tab all, will add Store Page Button Directly, no two clicks anymore
// @match      http://steamcommunity.com/id/*/games?tab=all
// @copyright  2014, mF4dUS
// ==/UserScript==

function gameTabStoreButton()
{
    var divGameListRow = document.getElementsByClassName("gameListRow");
    
    for (var i in divGameListRow)
    {
    	var divId = divGameListRow[i].getAttribute("id");
        var appId = divId.split("_").pop();
        
        divGameListRow[i].innerHTML = divGameListRow[i].innerHTML + 
    		"<div class=\"apphub_OtherSiteInfo\" style=\"margin-left:310px; margin-top: -40px\">" +
			"<a style=\"position: relative; z-index: 1;\" class=\"btn_darkblue_white_innerfade btn_medium\"" + 
            "href=\"http://store.steampowered.com/app/"+appId+"\"><span>Store Page</span></a></div>";
    }
}
gameTabStoreButton();