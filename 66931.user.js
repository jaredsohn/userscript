// ==UserScript==
// @name           COSMiQ - RetroAvatar
// @namespace      http://userscripts.org/scripts/show/66931
// @description    User ohne eigenen Avatar bekommen ein Retro Avatar zugewiesen.
// @version        20100121
// @include        http://www.cosmiq.de/qa/srch*
// @include        http://www.cosmiq.de/exp/show*
// @include        http://www.cosmiq.de/qa/show*
// @include        http://www.cosmiq.de/exp/friends*
// @include        http://www.cosmiq.de/lili/expsharing*
// @include        http://www.cosmiq.de/
// @include        http://www.cosmiq.de


// ==/UserScript==

(function(d){
	var avatarImages = d.getElementsByClassName("avatarImage");
	if (!avatarImages.length>0)
		avatarImages = d.getElementsByClassName("avatar");
	for each (var img in avatarImages) {
	   if (typeof img != 'function' && img.src && img.title!='') {
	    var fact = ( /\/_1_thumb.jpg$/.test(img.src)) 
	    	? 3 : ( /\/_1_orig.jpg$/.test(img.src)) 
	    	? 10 : ( /\/_1.jpg$/.test(img.src)) 
	    	? 5 : null;
	    if (fact) 
	    	img.src = 'http://retroavatar.appspot.com/api?name='+encodeURIComponent(img.title)+'&fact='+fact;
	   }
	}
}(document));