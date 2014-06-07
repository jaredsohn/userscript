// ==UserScript==
// @name           Vimeo 720p Resizer
// @require  	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @description    Sets Vimeo video player to display a full 720p resolution. This script only changes the size of the elements on page.
// @version        0.1
// @author         FattyMoBookyButt
// @license        MIT License
// @include        http://*.vimeo.*/*
// @include        http://vimeo.*/*
// @include        https://*.vimeo.com/*
// @include        https://vimeo.com/*
// ==/UserScript==
// unsafeWindow.console.log(args, ...);

var $everything = $('#everything');			// w: 980
var $main = $('#main');						// w: 980
var $video = $('div.video');				// w: 640
var $videoHolder = $('div.vimeo_holder');	// w: 640 h: 400
var $columns = $('div.columns');			// w: 980
var $columnB = $('div.columnB');			// w: 440

var diffHeight = 720 - $videoHolder.height();
var diffWidth = 1280 - $videoHolder.width();

if($videoHolder.length){
	document.getElementById("header").scrollIntoView(true);
	
	$everything.width($everything.width() + diffWidth);
	$main.width($main.width() + diffWidth);
	$video.width($video.width() + diffWidth);
	$videoHolder.width($videoHolder.width() + diffWidth).height($videoHolder.height() + diffHeight);
	$columns.width($columns.width() + diffWidth);
	$columnB.width($columnB.width() + diffWidth);
	
	var $scrollyContainer = $('div.scrolly_container');
	
	$scrollyContainer.each(function () {
		var $this = $(this);
		var $scrollyArea = $this.children('div.scrolly_area');
		var $scrollyContent = $scrollyArea.children('div.content');
		
		$this.data('tab', $this.parent().is('.add') ? 'add' : 'more');
		
		switch ($this.data('tab')) {
			case 'add':
				$this.height(648);
				$scrollyArea.height(648);
				$scrollyContent.height(648);
				break;
			case 'more':
				$this.height(612);
				$scrollyArea.height(612);
				$scrollyContent.height(612);
				break;
		}
	});
}