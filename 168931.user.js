// ==UserScript==
// @name			Clear Yaplakal Lenta
// @version			0.3.1
// @namespace		http://forum.sources.ru/
// @description		Remove ads from yaplakal.com 'lenta' pages
// @match			http://*.yaplakal.com/*
// @exclude			http://*.yaplakal.com/go/*
// @updateURL		http://userscripts.org/scripts/source/168931.meta.js
// @installURL		http://userscripts.org/scripts/source/168931.user.js
// @require			http://code.jquery.com/jquery-2.0.0.min.js
// @copyright		2013-2014, Sunny
// ==/UserScript==

// run it!
(function(){
    // each news titles
    $(".newshead").each(function(){
        // find div with rating
    	if($(this).find(".rating-short-value").length === 0){
            // clear it!
            $(this).closest("tr").nextAll("tr").slice(0, 2).remove();
            $(this).closest("tr").remove();
        }
    });
    
    // check admin's revenge
    if($(".lenta").length > 0){
        if($(".lenta .rating-short-value").length === 0){
            alert("Please, disable userscript: Clear Yaplakal Lenta and reload page. Thank you.");
            return;
        }
    }
    
    // find and remove "click" adv layers
    $("[href*='/click/']").remove();
})();