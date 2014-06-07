// ==UserScript==
// @name       	Funmily QMR Clean Page
// @version    	1.1
// @description Remove top banner and side bar on screen, and to maximize game playing area
// @match      	http://apps.funmily.com/qmr?action=Launcher&sid=*
// ==/UserScript==

function CleanPage() {
   $("#header").css({"display":"none"});
   $(".aside-btn-close").css({"display":"none"});
   $("#zone").css({"width":"100%", "height":$(window).height()+"px", "position":"absolute"});
}

$(window).resize(function() {
   CleanPage();
});

CleanPage();