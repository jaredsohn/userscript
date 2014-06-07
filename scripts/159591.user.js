// ==UserScript==
// @name           zwijacz menu
// @namespace      http://www.fotka.pl/profil/suchar
// @include        http://www.fotka.pl/profil/*
// @version        2.0
// @copyright      2013+, suchar
// ==/UserScript==

var u = unsafeWindow
var $ = u.$;
var arrUp = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAxQTFRFI6UAWMA8////////9pgPSAAAAAR0Uk5T////AEAqqfQAAAA/SURBVHjapI8xDgAgCANr/f+f1QIqJE52ae8WAjpSFrYrKCzzEGQWpBsXZBgTEwAzui3epZUb0Wf8pr4/BBgAZZoAlUxAe1EAAAAASUVORK5CYII=";
var arrDown = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAxQTFRFI6UAWMA8////////9pgPSAAAAAR0Uk5T////AEAqqfQAAAA9SURBVHjaYmBmQAEgLiMSYEDjg0WwCDDBeEwwAagIE0KACcKHCUCYEGGo7UxggOwedD5IhIGKAN37AAEGAGa7AJeuJivtAAAAAElFTkSuQmCC";

var b = $("<img/>");
b.attr("src","http://www.ladiva.pl/kreaimages/layout/icons/arrow-up.gif");
if(GM_getValue("zwijacz_menu", "up") == "up"){
	b.attr("slide_dir","up");
	b.attr("src", "data:image/png;base64,"+arrUp);
}else{
	b.attr("slide_dir","down");	
	b.attr("src", "data:image/png;base64,"+arrDown);
	$("#profile-navi, #menu, #header").hide();
}

b.click(function(){
	if(b.attr("slide_dir") == "up"){		
		$("#profile-navi, #menu, #header").slideUp("fast");	
		b.attr("src", "data:image/png;base64,"+arrDown);
		b.attr("slide_dir","down");		
		setTimeout(function(){
			GM_setValue("zwijacz_menu", "down");
		}, 0);
	}else{
		$("#profile-navi, #menu, #header").slideDown("fast");
		b.attr("src", "data:image/png;base64,"+arrUp);
		b.attr("slide_dir","up");		
		setTimeout(function(){
			GM_setValue("zwijacz_menu", "up");
		}, 0);
	}
});

b.css({"position":"absolute", "right":"0", "top":"0", "cursor":"pointer"});
$("#siteContainer").prepend(b);