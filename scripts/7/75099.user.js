// ==UserScript==
// @name           jqueryli-scroller
// @description    jqueryliscroller modded by DDCUnderground
// ==/UserScript==

/*!
 * liScroll 1.0
 * Examples and documentation at: 
 * http://www.gcmingati.net/wordpress/wp-content/lab/jquery/newsticker/jq-liscroll/scrollanimate.html
 * 2007-2010 Gian Carlo Mingati
 * Version: 1.0.2 (30-MARCH-2009)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Requires:
 * jQuery v1.2.x or later
 * 
 */

jQuery.fn.liScroll = function(settings) {
	settings = jQuery.extend({
		travelocity: 0.07,
		liRightPadding: 60 // I added this
	}, settings);
	return this.each(function(){
		var $strip = jQuery(this);
		$strip.addClass("newsticker")
		var stripWidth = 0;
		var $mask = $strip.wrap("<div class='mask'></div>");
		var $tickercontainer = $strip.parent().wrap("<div class='tickercontainer'></div>");
		var containerWidth = $strip.parent().parent().width(); //a.k.a. 'mask' width
		liNum = 2; // I added this (starts at 2 for IE6)
		$strip.find("li").each(function(i){
			stripWidth += jQuery(this, i).width();
			liNum++ // I added this
				$(this).css("paddingRight", settings.liRightPadding+"px") // I added this
		});
		$strip.width(stripWidth+(liNum*settings.liRightPadding)); // I changed this
		var defTiming = stripWidth/settings.travelocity;
		var totalTravel = stripWidth+containerWidth;
		function scrollnews(spazio, tempo){
			$strip.animate({left: '-='+ spazio}, tempo, "linear", function(){$strip.css("left", containerWidth); scrollnews(totalTravel, defTiming);});
		}
		scrollnews(totalTravel, defTiming);
		$strip.hover(function(){
			jQuery(this).stop();
		},

		function(){
			 var offset = jQuery(this).offset();
			 var residualSpace = offset.left + stripWidth;
			 var residualTime = residualSpace/settings.travelocity;
			 scrollnews(residualSpace, residualTime);
		});
	});
};


