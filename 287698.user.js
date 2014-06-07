// ==UserScript==
// @name        yTChanges
// @namespace   youTrackIssue
// @include     http://maxymiser.myjetbrains.com/youtrack/issue/*
// @version     1.02
// @grant       none
// @run-at document-end
// ==/UserScript==


var $ = window.jQuery;

var publishInstructions = $('.fsi-properties tr:contains("Publish Instructions")');
(function(box){
	box.css({
		'background': '#0066CC'
	});
	box.find('.fsi-property-label').css('color', '#fff');
	box.find('.fsi-property .attribute').attr('style', 'color:#fff !important;');
})(publishInstructions);
