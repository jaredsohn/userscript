// ==UserScript==
// @name           OLX bigger items
// @namespace      http://userscripts.org/users/442183
// @include        http://*.olx.com.*/
// @include        http://*.olx.com/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js
// ==/UserScript==

var instances=[];
(function($){
	$.fn.magnifier = function(conf){
		// already constructed --> return API
		var elem = this.data("magnifier");
		if (elem){return elem;}

		//Creates an object for each element and adds them to instances and data
		this.each(function(){
			elem = new Magnifier($(this), conf);
			instances.push(elem);
			$(this).data("magnifier", elem);
		});
		return elem; 
	}

	var Magnifier = function($list, conf){
		//Private vars
		var $this = this,       						// the main list
		     size = parseFloat($list.css('font-size').replace(/px/, '')); 	//original size

		$list.find('li').hover(function(){
			if (conf.factor2) $(this).prev().stop().animate({fontSize: size*conf.factor2 + 'px'},200);
			$(this).stop().animate({fontSize: size*conf.factor1 + 'px'},200);
			if (conf.factor2) $(this).next().stop().animate({fontSize: size*conf.factor2 + 'px'},200);
		},function(){
			if (conf.factor2) $(this).prev().stop().animate({fontSize: size + 'px'},200);
			$(this).stop().animate({fontSize: size + 'px'},200);
			if (conf.factor2) $(this).next().stop().animate({fontSize: size + 'px'},200);
		});

	}

})(jQuery);

$('.city-column').magnifier({factor1: 1.2});
$('.state-column').magnifier({factor1: 1.2});
$('.column').magnifier({factor1: 1.3, factor2: 1.2});
