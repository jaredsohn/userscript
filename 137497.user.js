// ==UserScript==
// @name        	Rai TV cleaned
// @namespace   	http://userscripts.org/users/burn
// @author      	Burn 
// @description 	Improves visualization of italian tv channels on rai.tv
// @require     	http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @include     	http://www.rai.tv/dl/RaiTV/dirette/PublishingBlock*.html?channel=*
// @exclude     	http://www.rai.tv/dl/RaiTV/dirette/PublishingBlock*.html?channel=*&iframe&time=*
// @grant               none
// @version     	1
// ==/UserScript==


// first, remove useless elements
if($(".barraSipra")) {$(".barraSipra").remove();}
if($(".Header")) {$(".Header").remove();}

// then, make bigger player and move channels list to the top
if($(".boxDiretta")) {$(".boxDiretta").css("width","962px");}
if($(".Spalla .boxSpalla .top")) {$(".Spalla .boxSpalla .top").css("display","none");}
if($(".boxDiretta .mid")) {$(".boxDiretta .mid").css("width","100%");}
if($(".Player")) {$(".Player").css({'width':'962px','height':'540px'});}
if($(".boxDiretta .Info")) {$(".boxDiretta .Info").css("width","962px");}
if($(".scroll-pane")) {$(".scroll-pane").css("width","962px");}
if($(".jspContainer")) {$(".jspContainer").css("width","962px");}
if($(".jspPane")) {$(".jspPane").css("width","962px");}
if($(".Spalla")) {$(".Spalla").css({'float':'none','width':'962px','clear':'both'});}
if($(".Player")){$(".Player").css({'width':'962px','height':'540px'});}
if($("#DiretteSpalla")){$("#DiretteSpalla").css({'position':'absolute','top':'0','left':'0','float':'none','width':'100%','clear':'both'});}
if($(".Spalla .boxSpalla .mid")){$(".Spalla .boxSpalla .mid").css({'padding':'0','width': '100%', 'height':'40px','display':'block','clear': 'both'});}
