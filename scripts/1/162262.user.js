// ==UserScript==
// @name	Tumblr Overquote Trimmer
// @namespace	the.vindicar.scripts
// @description	Hides excessive nested quotes that keep breaking your dashboard.
// @updateURL	http://userscripts.org/scripts/source/162262.meta.js
// @downloadURL	http://userscripts.org/scripts/source/162262.user.js
// @version	1.0.5
// @include	http://www.tumblr.com/dashboard
// @include	http://www.tumblr.com/dashboard/*
// @include	http://www.tumblr.com/show/*
// @include	http://www.tumblr.com/blog/*
// @include	https://www.tumblr.com/dashboard
// @include	https://www.tumblr.com/dashboard/*
// @include	https://www.tumblr.com/show/*
// @include	https://www.tumblr.com/blog/*
// @grant	unsafeWindow
// ==/UserScript==

(function(){

//how many levels of quotes should be shown by default
var QUOTESALLOWED = 3;
//placeholder for hidden quotes
var PLACEHOLDER = 
	'<div class="quotes_placeholder"><blockquote>%QUOTES% more quote(s). '+
	'<i>Click here</i>'+
	' to show.</blockquote></div>';

if (typeof unsafeWindow.Tumblr == 'undefined')
	return;
$ = unsafeWindow.jQuery;

$('#posts').on('click','.quotes_placeholder i',function(event){
	event.preventDefault();
	unsafeWindow.jQuery(this).closest('.quotes_placeholder').next().show().prev().remove();
	});

function processPosts() {
	if (QUOTESALLOWED < 0) return;
	//we should only process unmarked posts.
	$('#posts').find('li .post:not(#new_post):not([data-quotes-trimmed])').each(function(){
		var $this = $(this);
		//mark the post as processed.
		$this.attr('data-quotes-trimmed','');
		//let's find quotes...
		var $quotes = $this.find("blockquote").filter(function(){
			//that are nested at specific depth
			return $(this).parentsUntil('.post','blockquote').length==QUOTESALLOWED;
			});
		$quotes.each(function(){
			var $this = $(this);
			//insert placeholder before each quote
			var $placeholder = $(PLACEHOLDER.replace('%QUOTES%',$this.find('blockquote').length+1));
			$this.before($placeholder);
			//and hide the quote itself
			$this.hide();
			});
		});
	}

//process posts that are loaded already
processPosts(); 
//and ensure we are notified whenever new portion of posts is loaded
unsafeWindow.AfterAutoPaginationQueue.push(processPosts);

})();