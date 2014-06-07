// ==UserScript==
// @name          Highlight AutoModerator SPAM. Made by: /u/jij, /u/dumnezero
// @description   Highlights automoderator activity in spam
// ==/UserScript==

$("#siteTable .thing").each(function(index, node){
    if($(node).text().indexOf("removed by AutoModerator") > -1){ 
        $(node).addClass("automod-removed");
		$(node).attr('style', 'background-color: Khaki;  color: crimson; font-weight: bolder; font-size: 120%;');
    }
});