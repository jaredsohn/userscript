// ==UserScript==
// @name        Youtube Awesome
// @namespace   http://userscripts.org/users/431923
// @include       http://www.youtube.com/watch*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require		  http://malsup.github.com/jquery.corner.js
// @version     1.0
// ==/UserScript==
$(document).ready(function(){
$('#watch-description-toggle').remove();
//$('#watch-description-extras, #watch-description-text >*').hide();
$('#watch-description').removeClass('yt-uix-expander-collapsed');
var heads = $('#watch-headline-container');
var actions = $('#watch-actions>*');
var muchmore = $('#watch-more-from-user');
var YTactions = $('#watch-actions-right>*');	
	var button = '<button id="muchmore" class="yt-uix-button yt-uix-button-default" role="button" type="button">Hide description</button>';
	var button2 = '<button id="lotless" class="yt-uix-button yt-uix-button-default" role="button" type="button">Show description</button>';
	
	$('button#muchmore').live('click',function(){
		$('#watch-description-extras, #watch-description-text >*').css('display','none');
		$('#watch-description-text').prepend(button2);
		$('#muchmore').remove();
	})
	$('button#lotless').live('click',function(){
		$('#watch-description-extras, #watch-description-text >*').css('display','block');
		$('#watch-description-text').prepend(button);
		$('#lotless').remove();
	})
	$('#ytmp3procom, #ytmp3procomArrow').removeClass();
	$('#ytmp3procom, #ytmp3procomArrow').addClass('start yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip');
	$('#ytmp3procomArrow').corner('tr br 4px');
	$('#ytmp3procomArrow').corner('tl bl 1px');
	$('#watch-description-text').prepend(button);
	$('#watch-headline-title').corner('5px');
	$('#watch-video').css('bacground-color','#171717');
	$('#watch-actions-right').hide();
	$('#watch-headline').css('color','#E9E9E9');
	$('#watch-headline-user-info').append(actions);
	$('#watch-video-container').append(muchmore);
	$('#watch-video-container').append(heads);
	$('#watch-description-extra-info').prepend(YTactions);

})