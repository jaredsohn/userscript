// ==UserScript==
// @name           Dead Frontier AD Blocker
// @include        http://fairview.deadfrontier.com/*
// @exclude        http://fairview.deadfrontier.com/onlinezombiemmo/index.php?page=21
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$("body").live("mouseover mouseout", function(){  
 $("#DFAdBoxData").parent().parent().parent().parent().css("display", "none");
 $("#fancybox-overlay").css("display", "none");
});