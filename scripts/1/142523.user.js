// ==UserScript==
// @name	Tumblr Savior
// @namespace	bjornstar
// @description	Saves you from ever having to see another post or notes about certain things ever again (heavily modified by Vindicar).
// @updateURL	http://userscripts.org/scripts/source/142523.meta.js
// @downloadURL	http://userscripts.org/scripts/source/142523.user.js
// @version	2.4.3
// @grant	unsafeWindow
// @grant	GM_getValue
// @grant	GM_setValue
// @grant	GM_registerMenuCommand
// @include	http://www.tumblr.com/*
// @include	https://www.tumblr.com/*
// @exclude	http://www.tumblr.com/inbox
// @exclude	http://www.tumblr.com/help
// @exclude	https://www.tumblr.com/inbox
// @exclude	https://www.tumblr.com/help
// ==/UserScript==

(function(){
if (typeof unsafeWindow.Tumblr == 'undefined') {
	return;
	}
$ = unsafeWindow.jQuery;
//If we have no access to Greasemonkey methods, we will need dummy replacements
if (typeof GM_getValue == 'undefined') 
	GM_getValue = function (target, deflt) { return deflt; };
if (typeof GM_setValue == 'undefined') 
	GM_setValue = function (target, value) { alert('Can not save value of "'+target+'" - GM_setValue not found.'); };
if (typeof GM_registerMenuCommand == 'undefined') 
	GM_registerMenuCommand = function () {};

// =======================DEFAULT VALUES=======================
//you can edit these if you are using the script without Greasemonkey
//black list
var blk = GM_getValue('blacklist', /*default goes here >>>*/'');
//gray list
var gry = GM_getValue('graylist', /*default goes here >>>*/'');
//white list
var wht = GM_getValue('whitelist', /*default goes here >>>*/'');
//process notes
var nts = GM_getValue('notes', /*default goes here >>>*/false);
//process HTML code, not text
var html = GM_getValue('inhtml', /*default goes here >>>*/true);
// ===================END OF DEFAULT VALUES===================
rules = {
	UNAFFECTED	: -1,
	WHITELISTED	: 0,
	GRAYLISTED	: 1,
	BLACKLISTED	: 2,
	notes		: nts,
	inhtml		: html,
	blackList	: parseList(blk),
	grayList	: parseList(gry),
	whiteList	: parseList(wht),
	check		: function ($item){
		if (this.inhtml) {
			var theStr = '';
			$item.each(function () {
				theStr += $(this).html().toLowerCase();
				});
			}
		else {
			var theStr = $item.text().toLowerCase();
			}

		for (var i=0;i<this.whiteList.length;i++) {
			if(theStr.indexOf(this.whiteList[i])>=0) {
				//console.log('White:'+this.whiteList[i]);
				return {status:this.WHITELISTED, array:[this.whiteList[i]]};
			}
		}

		for(var i=0;i<this.blackList.length;i++) {
			if(theStr.indexOf(this.blackList[i])>=0) {
				//console.log('Black:'+this.blackList[i]);
				return {status:this.BLACKLISTED, array:[this.blackList[i]]};
			}
		}

		var graylisted = new Array();
		for(var i=0;i<this.grayList.length;i++) {
			if(theStr.indexOf(this.grayList[i])>=0) {
				//console.log('Gray:'+this.grayList[i]);
				graylisted.push(this.grayList[i]);
			}
		}
		if (graylisted.length>0) 
			return {status:this.GRAYLISTED, array:graylisted};
		else
			return {status:this.UNAFFECTED, array:[]};
		}
	};
  
function processPosts() {
	$('#posts').find('.sponsored_post').hide();
	var posts = $('#posts').find('.post.not_mine:not([data-saviour-status])');
	//console.log(posts.length);
	posts.each(function(){
		var $el = $(this);
		var $check = $([])
				.add($el.find(".post_header"))
				.add($el.find(".post_content"))
				.add($el.find(".post_tags"));
		var savedfrom = rules.check($check);
		$el.attr('data-saviour-status',savedfrom.status);
		//console.log($el.attr('id')+' '+savedfrom.status+': '+savedfrom.array.join(';'));
		switch (savedfrom.status) {
			case rules.UNAFFECTED: 
				break; 
			case rules.WHITELISTED: 
				break;
			case rules.GRAYLISTED: { 
				var id = $el.attr('id').substring(5);
				//content wrapper
				var $div_filtered = $('<div style="display:none;"></div>');
				//post content
				var $post_content = $el.find('.post_content_inner');
				// spoiler message
				var $div_notice = $('<div class="saviour_placeholder">You have been saved from this post because of: '+savedfrom.array.join(';')+'. <i onclick="window.jQuery(this).closest(\'.saviour_placeholder\').hide().next().show();return false;">Click here</i> if you cannot resist the temptation.</div>');
				$div_notice.insertBefore($post_content);
				$div_filtered.insertBefore($post_content);
				$div_filtered.append($post_content);
				}; break;
			case rules.BLACKLISTED: { 
				//look for the next post
				var $next = $el.next('li');
				var $prev = $el.prev('li');
				if (!$el.children('.post').hasClass('same_user_as_last') && $next.children('.post').hasClass('same_user_as_last')) //if current post is the first one in the chain
					// if there is next post and it's of the same author
					$next.children('.post').removeClass('same_user_as_last'); //we mark next post as being first in the chain
				if (($next.hasClass('post_container') && $prev.hasClass('post_container')) &&
					($next.find('.post_avatar').data('blog-url')==$prev.find('.post_avatar').data('blog-url')))
					$next.children('.post').addClass('same_user_as_last');
				//workaround: removing the element causes conflicts with ImgLikeOpera extension.
				$el.hide();
				$el.removeClass('.post');
				}; break;
			}
		});
		//Asking Tumblr keyboard control script to regenerate it's positions.
		if (typeof unsafeWindow.Tumblr.KeyCommands != 'undefined')
			unsafeWindow.Tumblr.KeyCommands.update_post_positions();
	}

function processNotifications() {
	$('#posts').find('li.notification:not([data-saviour-status])').each(function(){
		var $el = $(this);
		var savedfrom = rules.check($el);
		$el.attr('data-saviour-status',savedfrom.status);
		if (savedfrom.status==rules.BLACKLISTED) {
			var $prev = $el.prev('li');
			var $next = $el.next('li');
			if ($el.hasClass('first_notification') && $next.hasClass('notification')) {
				if ($next.hasClass('last_notification'))
					$next.addClass('single_notification').removeClass('last_notification');
				else
					$next.addClass('first_notification');
				}
			else if ($el.hasClass('last_notification') && $prev.hasClass('notification')) {
				if ($prev.hasClass('first_notification'))
					$prev.addClass('single_notification').removeClass('first_notification');
				else
					$prev.addClass('last_notification');
				}
			$el.hide();
			}
		});
	}

function processNotes(context) {
	var notes = $('li.note', context);
	notes.each(function(){
		var $el = $(this);
		var savedfrom = rules.check($el);
		if (savedfrom.status==rules.BLACKLISTED) {
			$el.hide();
			}
		});
	}

function parseList(list) {
	var lst = list.split(';');
	var res = [];
	var term;
	for (var i=lst.length-1;i>=0;i--) {
		term = lst[i];
		if (term.trim().length>0)
			res.push(term.toLowerCase());
		}
	res.sort();
	return res;
	}

	
function setList(target,description,deflt) {
	return (function() {
		var list = GM_getValue(target, deflt);
		list = prompt(description, list);
		if (list!=null) {
			var res = parseList(list);
			GM_setValue(target, res.join(';'));
			location.reload();
			}
		});
	}

function setNotes() {
	GM_setValue('notes', !rules.notes);		
	location.reload();
	}

function setHTML() {
	GM_setValue('inhtml', !rules.inhtml);		
	location.reload();
	}


GM_registerMenuCommand('Edit blacklist', setList('blacklist','Enter blacklisted words(delimiter is ";"):',blk));
GM_registerMenuCommand('Edit graylist', setList('graylist','Enter graylisted words(delimiter is ";"):',gry));
GM_registerMenuCommand('Edit whitelist', setList('whitelist','Enter whitelisted words(delimiter is ";"):',wht));
GM_registerMenuCommand((rules.notes?'[X]':'[ ]')+' Apply blacklist to notifications&notes', setNotes);
GM_registerMenuCommand((rules.inhtml?'[X]':'[ ]')+' Check HTML code instead of text', setHTML);

//console.log ('White list: "'+rules.whiteList.join('";"')+'"');
//console.log ('Black list: "'+rules.blackList.join('";"')+'"');
//console.log ('Gray list: "'+rules.grayList.join('";"')+'"');

// if we're going to process notifications, he have to do it first, because post chains are dependent on them
if (nts) { 
	//filter notifications that are rendered already
	processNotifications(); 
	}

//process posts that are loaded already
processPosts(); 
//and ensure we are notified whenever new portion of posts is loaded
unsafeWindow.AfterAutoPaginationQueue.push(processPosts);
//also posts are loaded whenever new post is made. we should know about it.
(function () {
	var render = unsafeWindow.Tumblr.PostForms.RenderPost.prototype;
	var _render_posts = render.render_posts; //this method is called when new post is ready and upcoming posts should be added to the dashboard
	render.render_posts = function (URL, insertPos, htmlAndDomHandler, domHandler) {
		return _render_posts.call(this, 
			URL, 
			insertPos, 
			function(){ //this function is called after the posts are added
				if (nts) 
					processNotifications();
				processPosts();
				if (typeof htmlAndDomHandler == 'function')
					return htmlAndDomHandler.apply(this,arguments);
				},
			domHandler);
		};
	})();
if (nts) { //we should process notes as well
	//installing filter for the notes
	var notes = unsafeWindow.Tumblr.Notes.prototype;
	// we have to replace the function called whenever notes are to be loaded with our own
	var _load_notes = notes.load_notes;
	notes.load_notes = function(post,options,fn){
		//the idea is to allow Tumblr engine to load notes...
		_load_notes.call(this,post,options,(function(data){
			//...and render those notes...
			var res = fn(data);
			//...but also to filter them immediately ourselves
			processNotes(post);
			return res;
			}) );
		};
	}
	
})();