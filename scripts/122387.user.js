// ==UserScript==
// @name           Bnet jsFiddler
// @namespace      jsfiddler@apocalypex.net
// @include        http*://*bungie.net*posts.aspx*
// ==/UserScript==
/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */ 


var $ = unsafeWindow.$telerik.$; //BNet jQuery
var reg = /http(?:s)?:\/\/(?:www\.)?jsfiddle\.net\/(?:[a-zA-Z\d]+)?(?:\/)?([a-zA-Z\d]{5})/i; //http|https://(www.)jsfiddle.net/(username/)hash

$(".forumpost p a").filter(function(){
	return this.href.match(reg);
}).each(function(i){
	console.log(i+": Js Post");
	var h = reg.exec(this.href);
	$(h[1]+'<iframe style="background:#DDD; width: 100%; height: 300px" src="http://jsfiddle.net/'+h[1]+'/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>').insertAfter(this);
});

