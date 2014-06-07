// ==UserScript==
// @name		Skip GK comments
// @namespace	GK
// @description	Skip GK comments
// @include	http://govnokod.ru/*
// @include	http://www.govnokod.ru/*
// @include	http://govnokod.im/*
// @include	http://www.govnokod.im/*
// @version	2.2.2
// @updateURL	http://userscripts.org/scripts/source/135571.meta.js
// @downloadURL	http://userscripts.org/scripts/source/135571.user.js
// @grant	unsafeWindow
// @grant	GM_registerMenuCommand
// @grant	GM_getValue
// @grant	GM_setValue
// ==/UserScript==

(function(){
$ = unsafeWindow.jQuery;
//dirty, DIRTY hack to wait for certain element to appear. -_- 
//But I have no idea how to do it right.
function waitForSelector(selector, context, mustexist, callback) {
	if (($(selector, context).length>0) == mustexist)
		callback();
	else
		setTimeout(function(){waitForSelector(selector, context, mustexist, callback)}, 50);
	}
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

addCSS([
	'.comment-text.comment-transparent {color: transparent !important;}',
	].join('/n'));

//============================================================================================================
options = {
		//константы (коды операций) для удобства
		IGNORE : 0,
		VOTE_DOWN : 1,
		HIDE : 2,
		HIDE_THREAD : 3,
		SPOILER : 4,
		TRANSPARENT : 5,
		//настройки
		blacklist : ';'+GM_getValue('hide','')+';',
		post : GM_getValue('postmethod', 0),
		comment : GM_getValue('method', 5),
		vote : GM_getValue('vote', false),
		//обработка комментариев в jQuery объекте $context
		processComments : function ($context) {
			var method;
			switch (this.comment) {
				case this.VOTE_DOWN:   method = function($comment){}; break;
				case this.HIDE:        method = this.doHideComment; break;
				case this.HIDE_THREAD: method = this.doHideThread; break;
				case this.SPOILER:     method = this.doHideCommentSpoiler; break;
				case this.TRANSPARENT: method = this.doHideCommentTransparent; break;
				case this.IGNORE:      
				default:               return;
				};
			//внутри .each() будет свой this, так что сохраним наш this как that.
			var that = this;
			$context.find('.hcomment').each(function(i,e){
				var $this = $(this);
				var author = $this.find('.entry-author:eq(0)').find('a').text().trim();
				if (that.blacklist.indexOf(';'+author+';')!=-1)
					{
					if (that.vote)
						that.doVoteDownComment($this);
					//всем обработчикам передаётся jQuery-объект - узел комментария для обработки
					method($this);
					}
				});
			},
		//обработчики комментариев
		doHideComment: function ($comment) {$comment.find('.entry-comment-wrapper:eq(0)').hide();},
		doHideThread: function ($comment) {$comment.hide();},
		doHideCommentSpoiler: function ($comment) {
			var ec = $comment.find('.entry-comment:eq(0)');
			if (!ec.hasClass('entry-comment-hidden'))
				ec
					.addClass('entry-comment-hidden')
					.find('.comment-text').
					before('<span class="hidden-text"><a class="ajax" href="#">показать всё, что скрыто</a></span>');
			},
		doHideCommentTransparent: function($comment) {$comment.find('.comment-text:eq(0)').addClass('comment-transparent');},
		doVoteDownComment: function($comment) {
			var id = $comment.find('.entry-comment-wrapper').attr('id');
			var $links = $comment.find('a.comment-vote-against')
				.filter(function(){
					return $(this).parentsUntil('#'+id, '.hcomment').length == 0; //jQuery 1.4 >_<
					});
			if ($links.length == 1) {
				setTimeout(function(){$links.click()}, Math.floor(Math.random()*5000+100) );
				}
			},
		//обработка постов на странице
		processPosts: function() {
			var method;
			switch (this.post) {
				case this.VOTE_DOWN:   method = function(){}; break;
				case this.HIDE:        method = this.doHidePost; break;
				case this.IGNORE:      
				default:               return;
				};
			//внутри .each() будет свой this, так что сохраним наш this как that.
			var that = this;
			$('body').find('.hentry').each(function(i,e){
				var $this = $(this);
				var author = $this.find('.author').find('a:not(has(img))').text().trim();
				if (that.blacklist.indexOf(';'+author+';')!=-1)
					{
					if (that.vote)
						that.doVoteDownPost($this);
					//всем обработчикам передаётся jQuery-объект - узел комментария для обработки
					method($this);
					}
				});
			},
		//обработчики постов
		doHidePost: function($post){$post.hide();},
		doVoteDownPost: function($post) {
			var $link = $post.find('a.vote-against');
			if ($link.length)
				setTimeout(function(){$link.click()}, Math.floor(Math.random()*5000+100) );
			},
		};

//============================================================================================================
//настройки посредством меню Greasemonkey
function setUsernamePattern() {
	var hide = GM_getValue('hide', options.blacklist.substring(1,options.blacklist.length-1));
	hide = prompt('Enter usernames separated by ";":', hide);
	if (hide!=null) {
		//нормализуем список
		var lst = hide.split(';');
		var res = [];
		var name;
		for (var i=lst.length-1;i>=0;i--) {
			name = lst[i].trim();
			if (name.length>0)
				res.push(name);
			}
		GM_setValue('hide', res.join(';'));
		}
	}

function setCommentHidingMethod() {
	var method = GM_getValue('method', options.comment);
	method = prompt([
		'What should be done to comments?',
		options.IGNORE.toString()+     ' - do nothing',
		options.VOTE_DOWN.toString()+  ' - just vote it down (if enabled)',
		options.HIDE.toString()+       ' - hide comment entirely',
		options.HIDE_THREAD.toString()+' - hide entire thread',
		options.SPOILER.toString()+    ' - hide comment under spoiler',
		options.TRANSPARENT.toString()+' - make comment transparent',
		].join('\n'), method);
	if (method != null) {
		var value = parseInt(method.trim(),10);
		if (!isNaN(value) && (value>=0) && (value<=5)) {
			GM_setValue('method', value);
			location.reload();
			}
		else
			alert('Invalid value.');
		}
	}
	
function setPostHidingMethod() {
	var method = GM_getValue('postmethod', options.post);
	method = prompt([
		'What should be done to posts?',
		options.IGNORE.toString()+     ' - do nothing',
		options.VOTE_DOWN.toString()+  ' - just vote it down (if enabled)',
		options.HIDE.toString()+       ' - hide post entirely',
		].join('\n'), method);
	if (typeof(method) != null) {
		var value = parseInt(method.trim(),10);
		if (!isNaN(value) && (value>=0) && (value<=2)) {
			GM_setValue('postmethod', value);
			location.reload();
			}
		else
			alert('Invalid value.');
		}
	}
	
function setVoting() {
	var enable = !!GM_getValue('vote', false);
	GM_setValue('vote', !enable);
	location.reload();
	}

//============================================================================================================
function hijackComments() {
	//перехват загрузки комментариев
	var oldLoadComments = unsafeWindow.comments['load'];

	function newLoadComments(aElemTrigger) {
		var $parent = $(aElemTrigger).closest('.entry-comments');
		oldLoadComments.call(this,aElemTrigger);
		waitForSelector('.hcomment', $parent, true, function(){
			options.processComments($parent);
			});
		}

	unsafeWindow.comments['load'] = newLoadComments;
	}

//============================================================================================================

//регистрируем пользовательские команды
GM_registerMenuCommand('Set username pattern', setUsernamePattern);
GM_registerMenuCommand('Set comment hiding method', setCommentHidingMethod);
GM_registerMenuCommand('Set post hiding method', setPostHidingMethod);
GM_registerMenuCommand((options.vote ? '[X]' : '[ ]')+' Enable voting', setVoting);

//делаем дело
if (/govnokod\.ru\/\d+/.test(location))
	//мы на странице поста, обрабатываем все комментарии на странице
	options.processComments($('body'));
else {
	//мы на главной или где-то еще
	//исключение: не обрабатываем посты в профиле пользователя, иначе мы можем их так и не увидеть.
	if (!/govnokod\.ru\/user\/\d+\/codes/.test(location))
		options.processPosts();
	//тем не менее, перехватим загрузку комментариев
	hijackComments();
	}
})();