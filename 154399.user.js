// ==UserScript==
// @name           Tumblr Notifications/Notes Enhancer
// @namespace      the.vindicar.scripts
// @description    Fixes inability to select text in notifications and notes.
// @grant	unsafeWindow
// @updateURL      http://userscripts.org/scripts/source/154399.meta.js
// @downloadURL    http://userscripts.org/scripts/source/154399.user.js
// @version	1.1.4
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/dashboard#*
// @include        http://www.tumblr.com/dashboard/*
// @include        http://www.tumblr.com/show/*
// @include        http://www.tumblr.com/blog/*
// @include        https://www.tumblr.com/dashboard
// @include        https://www.tumblr.com/dashboard#*
// @include        https://www.tumblr.com/dashboard/*
// @include        https://www.tumblr.com/show/*
// @include        https://www.tumblr.com/blog/*
// ==/UserScript==

(function(){
if (typeof unsafeWindow.Tumblr == 'undefined')
	return;
$ = unsafeWindow.jQuery; //using jQuery lib used by Tumblr. Not quite safe, but it's better than copy-pasting it here.

//Reply button HTML code. nothing too fancy.
var REPLYBTN = '<span class="quickreply">reply</span>';

//short function for adding custom CSS rules. Why use Greasemonkey specific GM_setStyle() just for that?
function addCSS(rule) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	if (typeof styleElement.styleSheet !== 'undefined')
		styleElement.styleSheet.cssText = rule;
	else
		styleElement.appendChild(document.createTextNode(rule));
	document.getElementsByTagName("head")[0].appendChild(styleElement);
	}

//dirty, DIRTY hack to wait for certain element to appear. -_- 
//But I have no idea how to do it right.
function waitForSelector(selector, mustexist, callback) {
	if (($(selector).size()>0) != mustexist)
		{
		setTimeout(function(){waitForSelector(selector, mustexist, callback)}, 10);
		return false;
		};
	callback();
	}

//Append REPLY buttons to those notifications that don't have one yet.
function appendButtons() {
	var $notifications = $('.notification:not([data-reply-button])');
	$notifications.data('reply-button','1');
	$notifications.each(function(){
		var $this = $(this);
		if ($this.hasClass('notification_follower'))
			$this.find('.notification_follow').prepend(REPLYBTN);
		else
			$this.find('.control.notification_right').prepend(REPLYBTN);
		});
	}

//reaction to clicking REPLY button
function replyBtnClick(e) {
	e.preventDefault(); //stop default action
	var $notification = $(this).parents('.notification'); //notification that has been clicked
	if ($notification.hasClass('notification_reply') || $notification.hasClass('notification_reblog') || $notification.hasClass('notification_follower')) {
		//replies and reblogs have additional text we should include
		var $text = $notification.find('.notification_sentence');
		var text = '<blockquote>'+$text.html()+'</blockquote>\n<p>&nbsp;</p>';
		}
	else {
		//everything else can be stripped down to bare minimum
		var $text = $notification.find('div.hide_overflow');
		var text = '<blockquote>'+$text.html()+'</blockquote>\n<p>&nbsp;</p>';
		}
	var $newtextpost = $('#new_post_label_text'); //new text post button 
	//calling for text post editor
	//vvv taken from posts.js on Tumblr
	var urlparams = unsafeWindow.Tumblr.PostForms.parse_url_params($newtextpost.attr('href'));
	unsafeWindow.Tumblr.PostForms.create({
			type: $newtextpost.data('post-type'),
			endpoint: $newtextpost.data('post-endpoint'),
			attach_to: '#new_post',
			previous_content_selector: '#post_buttons',
			mode: unsafeWindow.Tumblr.PostForms.mode,
		}, urlparams);
	//^^^ taken from posts.js on Tumblr
	//I have no idea how to pre-add text to editor, so we'll have to wait for it to appear...
	waitForSelector('.mceIframeContainer iframe', true, function() {
		//and add the text into it
		var $post = $('.mceIframeContainer iframe').contents().find('#tinymce');
		$post.html(text);
		});
	}
	
//CSS table
var rules = [
	//making text selectable again
	".notification {-moz-user-select:text;-webkit-user-select:auto;cursor:default;}",
	".notes .note {-moz-user-select:text;-webkit-user-select:auto;}",
	//basic CSS for quickreply button (copied from IGNORE button)
	".notification .quickreply {"+
	"border-radius: 2px 2px 2px 2px; background: none repeat scroll 0 0 rgba(255, 255, 255, 0.38); color: #3D546B; "+
	"right: 60px; top: 7px;opacity: 0;visibility: hidden;position: absolute;height: 12px;padding: 0px 2px; "+
	"font-size: 9px !important;line-height: 12px;font-weight: bold;text-decoration: none;text-transform: uppercase; "+
	"text-shadow: none;letter-spacing: 0px; transition: opacity 0.035s linear 0s;cursor:pointer}",
	".notification_follow .quickreply {top: 15px;}",
	//hover styles for quickreply button (copied from IGNORE button)
	".notification:hover .quickreply {opacity:1; transition-delay:0.4s; visibility:visible;}",
	".notification .quickreply:hover {background-color: rgba(255, 255, 255, 0.75)}",
	];
//applying our styles
addCSS(rules.join("\n"));
//appending buttons to the notifications already on page
appendButtons();
//ensuring we will append them to any notifications loaded by pagination mechanics
unsafeWindow.AfterAutoPaginationQueue.push(appendButtons);
//setting reaction to REPLY button being clicked
$('#posts').on('click', '.quickreply', replyBtnClick);

})();