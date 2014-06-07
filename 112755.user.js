// ==UserScript==
// @name           Reddit - Overlay Parent Post
// @namespace      reddit
// @copyright      2011+, Thomas Schüßler (http://www.idontblog.de)
// @include        http://www.reddit.com/r/*
// ==/UserScript==
//

var $ = unsafeWindow.jQuery;
$('body').append('<div id="vindolin_imageparent_container" style="position:absolute;left:0px;top:0px;display:none;width:100px;height:100px;border-radius:10px;z-index:100;background:-moz-linear-gradient(top,rgba(20,15,10,0.95) 100%,rgba(20,15,10,0.95) 100%);color:white !important;box-shadow:3px 3px 5px rgba(0,0,0,0.2);padding:10px;"></div>');
var $parent_container = $('#vindolin_imageparent_container');

$('a.bylink:contains(parent)').mouseenter(function(event) {
	var $this = $(this);
	var post = $this.parents('.thing').first();
	var parent_post = post.parents('div.thing').first().find('div.entry').first();
	var parent_post_md = parent_post.find('div.md').first();
	with($parent_container) {
		hide();
		width(parent_post_md.width());
		height(parent_post.height());
		css('top', $this.position().top - ($this.height() * 1.5 ) - $parent_container.height() + 'px');
		css('left', $this.position().left + 'px');
		html(parent_post.clone());
		fadeIn('fast');
	}
});
$('a.bylink:contains(parent)').mouseout(function(event) {
	$parent_container.fadeOut('fast');
});
