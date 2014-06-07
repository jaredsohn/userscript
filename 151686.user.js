// ==UserScript==
// @name           Facebook LOLitics
// @namespace     
// @version 0.11.4.12
// @description    Hides statuses about politics.
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @copyright  2012+, GJacobsG
// ==/UserScript==
jQuery.expr[":"].icontains = jQuery.expr.createPseudo(function (arg) {                                                                                                                                                                
    return function (elem) {                                                            
        return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;        
    };                                                                                  
});
function politics() {
    
	$('li.uiUnifiedStory:icontains("Romney"),li.fbTimelineUnit:icontains("Romney")').remove();	// Romney
    $('li.uiUnifiedStory:icontains("Obama"),li.fbTimelineUnit:icontains("Obama")').remove();	// Obama
    $('li.uiUnifiedStory:icontains("politics"),li.fbTimelineUnit:icontains("politics")').remove();	// Politics
    $('li.uiUnifiedStory:icontains("Democrat"),li.fbTimelineUnit:icontains("Democrat")').remove();	// dem
    $('li.uiUnifiedStory:icontains("Republican"),li.fbTimelineUnit:icontains("Republican")').remove();	// republican
    $('li.uiUnifiedStory:icontains("Fox News"),li.fbTimelineUnit:icontains("Fox News")').remove();	// fox news
}
window.addEventListener("load", function() { politics(); }, false);
window.addEventListener("DOMNodeInserted", function() { politics(); }, false);