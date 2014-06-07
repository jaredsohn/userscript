// ==UserScript==
// @name		GK Filter
// @namespace	GK
// @description	Filter posts & comments on govnokod.ru
// @include	http://govnokod.ru/*
// @include	http://www.govnokod.ru/*
// @version	3.2.0
// @updateURL	http://userscripts.org/scripts/source/393166.meta.js
// @downloadURL	http://userscripts.org/scripts/source/393166.user.js
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
	'.comment-text.transparent * {color: transparent !important;}',
	'.entry-content.transparent pre * {color: transparent !important;}',
	'.description.transparent * {color: transparent !important;}',
	'.hentry.entry-post-hidden .entry-content {display:none !important;}',
	'.hentry.entry-post-hidden .description {display:none !important;}',
	].join('\n'));

addCSS([
	'#GKFSettings {\
		position:fixed; z-index:1000; top:0;\
		height:80%; width:80%; margin:10%;\
		overflow-x: auto; overflow-y: scroll;\
		border:solid 2px brown;\
		background-color:rgb(242, 240, 227);\
		}',
	'#GKFSettings p {margin:0;padding:0;}',
	'#GKFSettings label {font-weight:bold;margin: 0 5px 0 0}',
	'#GKFSettings .GKFSgroupform {margin:20px;}',
	'#GKFSettings #GKFSglobalsform {margin:20px;}',
	'#GKFSettings .GKFSbuttons {text-align:center;}',
	'#GKFSettings input {width:100%;}',
	'#GKFSettings input[type="checkbox"] {width:auto;}',
	'#GKFSettings input.GKFSgrouptitle {width:auto;}',
	'#GKFSettings .GKFSdeletegroup {width:30px;}',
	'#GKFSettings option.GKFSgood {background-color: #CCFFCC;}',
	'#GKFSettings option.GKFSneutral {background-color: #FFFFFF;}',
	'#GKFSettings option.GKFSevil {background-color: #FFCCCC;}',
	].join('\n'));

//============================================================================================================
var Group = function () {
	if (typeof this == 'undefined')
		throw "Use 'new', Luke!";
	Group.prototype.init.call(this);
}
$.extend(Group, {
	ACTION_NONE : 0,
	ACTION_HIDECONTENT : 1,
	ACTION_HIDETHREAD : 2,
	ACTION_WHITESPACE : 3,
	ACTION_SPOILER : 4,
	ACTION_UNSPOILER : 5,
	VOTE_NONE : 0,
	VOTE_UP : 1,
	VOTE_DOWN : -1,
});
Group.prototype = {
	init: function() {
		this.active = true;
		this.title = '';
		this.chapters = [];
		this.users = [];
		this.comment_action = this.ACTION_NONE;
		this.comment_vote = this.VOTE_NONE;
		this.post_action = this.ACTION_NONE;
		this.post_vote = this.VOTE_NONE;
		this.color = '';
		return this;
	},
	serialize: function() {
		return JSON.stringify({
			"active" : this.active,
			"title" : this.title,
			"chapters" : this.chapters,
			"users" : this.users,
			"comment_action": this.comment_action,
			"comment_vote" : this.comment_vote,
			"post_action": this.post_action,
			"post_vote" : this.post_vote,
			"color" : this.color,
		});
	},
	unserialize : function(str) {
		var obj = JSON.parse(str);
		this.active = obj.active;
		this.title = obj.title;
		this.chapters = []
		for (var i=0;i<obj.chapters.length;i++)
			this.chapters.push(obj.chapters[i].toLowerCase());
		this.users = [];
		for (var i=0;i<obj.users.length;i++)
			this.users.push(obj.users[i].toLowerCase());
		this.comment_action = obj.comment_action;
		this.comment_vote = obj.comment_vote;
		this.post_action = obj.post_action;
		this.post_vote = obj.post_vote;
		this.color = obj.color;
		return this;
	},
	toString: function() {
		return this.serialize();
	},
	matchUser: function(user, chapter) {
		return (this.active) && (
			(this.chapters.length == 0) || 
			(chapter.length == 0) || 
			(this.chapters.indexOf(chapter.toLowerCase()) != -1)
			) && (this.users.indexOf(user.toLowerCase()) != -1);
	},
};
Group.unserialize = function(str) {
	var group = new Group()
	group.unserialize(str);
	return group;
};

//============================================================================================================
var Comment = {
	find: function(context) {
		if (typeof context === 'undefined')
			context = document;
		return $(context).find('.hcomment');
	},
	getAuthor: function($comment) {
		return $comment.find('.entry-author:eq(0)').find('a').text().trim();
	},
	getChapter: function($comment) {
		return $comment.closest('.hentry').find('a[rel="chapter"]').text().trim();
	},
	hideContent: function($comment) {
		$comment.find('.entry-comment-wrapper:eq(0)').hide();
	},
	hideThread: function($comment) {
		$comment.hide();
	},
	whitespace: function($comment) {
		$comment.find('.comment-text:eq(0)').addClass('transparent');
	},
	spoiler: function($comment, text='показать всё, что скрыто', hint=false) {
		var $ec = $comment.find('.entry-comment:eq(0)');
		var $lnk;
		if (!$ec.hasClass('entry-comment-hidden')) {
			$lnk = $('<span class="hidden-text"><a class="ajax" href="#">'+text+'</a></span>');
			$ec
				.addClass('entry-comment-hidden')
				.find('.comment-text:eq(0)')
				.before($lnk);
			}
		else {
			$lnk = $ec.find('.hidden-text:eq(0)').find('a.ajax');
			$lnk.text(text);
			}
		if (hint)
			$lnk.attr('title', $comment.find('.comment-text:eq(0)').text());
	},
	unspoiler: function($comment) {
		var $ec = $comment.find('.entry-comment:eq(0)');
		if ($ec.hasClass('entry-comment-hidden'))
			$ec
				.removeClass('entry-comment-hidden')
				.find('.hidden-text:eq(0)')
				.remove();
	},
	voteUp: function($comment, delay=10.0) {
			var id = $comment.find('.entry-comment-wrapper:eq(0)').attr('id');
			var $links = $comment.find('a.comment-vote-on')
				.filter(function(){
					return $(this).parentsUntil('#'+id, '.hcomment').length == 0; //jQuery 1.4 >_<
					});
			if ($links.length == 1) //чтобы не наломать дров в случае чего
				//$links.css('border','solid 1px blue');
				setTimeout(function(){$links.click()}, Math.floor(Math.random()*delay*1000+100) );
	},
	voteDown: function($comment, delay=10.0) {
			var id = $comment.find('.entry-comment-wrapper:eq(0)').attr('id');
			var $links = $comment.find('a.comment-vote-against')
				.filter(function(){
					return $(this).parentsUntil('#'+id, '.hcomment').length == 0; //jQuery 1.4 >_<
					});
			if ($links.length == 1) //чтобы не наломать дров в случае чего
				//$links.css('border','solid 1px blue');
				setTimeout(function(){$links.click()}, Math.floor(Math.random()*delay*1000+100) );
	},
	mark: function($comment, color) {
		$comment.find('.entry-author:eq(0)').find('a').css('color', color);
	},
};
//============================================================================================================
var Post = {
	find: function(context) {
		if (typeof context === 'undefined')
			context = document;
		return $(context).find('.hentry');
	},
	getAuthor: function($post) {
		return $post.find('.author').find('a:not(has(img))').text().trim();
	},
	getChapter: function($post) {
		return $post.find('a[rel="chapter"]').text().trim();
	},
	hideContent: function($post) {
		$post.find('.entry-content:eq(0)').hide();
		$post.find('.description:eq(0)').hide();
	},
	hideThread: function($post) {
		$post.hide();
	},
	whitespace: function($post) {
		$post.find('.entry-content:eq(0)').addClass('transparent');
		$post.find('.description:eq(0)').addClass('transparent');
	},
	spoiler: function($post, text='показать всё, что скрыто', hint=false) {
		if (!$post.hasClass('entry-post-hidden')) {
			$lnk = $('<span class="hidden-text"><a class="ajax" href="#">'+text+'</a></span>');
			if (hint)
				$lnk.attr('title', $post.find('.entry-content:eq(0)').text());
			$lnk.click(function(event){
				$(this).closest('.hentry').removeClass('entry-post-hidden');
				$(this).remove();
				});
			$post
				.addClass('entry-post-hidden')
				.find('.entry-content:eq(0)')
				.before($lnk);
			}
	},
	voteUp: function($post, delay=10.0) {
			var $links = $post.find('a.vote-on:eq(0)');
			if ($links.length == 1) //чтобы не наломать дров в случае чего
				//$links.css('border','solid 1px blue');
				setTimeout(function(){$links.click()}, Math.floor(Math.random()*delay*1000+100) );
	},
	voteDown: function($post, delay=10.0) {
			var $links = $post.find('a.vote-against:eq(0)');
			if ($links.length == 1) //чтобы не наломать дров в случае чего
				//$links.css('border','solid 1px blue');
				setTimeout(function(){$links.click()}, Math.floor(Math.random()*delay*1000+100) );
	},
	mark: function($post, color) {
		$post.find('.author').find('a').css('color', color);
	},
};
//============================================================================================================
function processPosts(groups, $context) {
	Post.find($context).each(function(){
		var $post = $(this);
		var user = Post.getAuthor($post);
		var chapter = Post.getChapter($post);
		for (var i=0;i<groups.length;i++)
			if (groups[i].matchUser(user, chapter)) {
				switch (groups[i].post_action) {
					case Group.ACTION_HIDECONTENT: Post.hideContent($post); break;
					case Group.ACTION_HIDETHREAD: Post.hideThread($post); break;
					case Group.ACTION_WHITESPACE: Post.whitespace($post); break;
					case Group.ACTION_SPOILER: Post.spoiler($post, Options.globals.spoilertext, Options.globals.spoilerhint); break;
					default: ; break;
				};
				switch (groups[i].post_vote) {
					case Group.VOTE_UP: Post.voteUp($post, Options.globals.votedelay); break;
					case Group.VOTE_DOWN: Post.voteDown($post, Options.globals.votedelay); break;
					default: ; break;
				};
				if (!!groups[i].color)
					Post.mark($post, groups[i].color);
			};
	});
}

function processComments(groups, $context) {
	Comment.find($context).each(function(){
		var $comment = $(this);
		var user = Comment.getAuthor($comment);
		var chapter = Comment.getChapter($comment);
		for (var i=0;i<groups.length;i++)
			if (groups[i].matchUser(user, chapter)) {
				switch (groups[i].comment_action) {
					case Group.ACTION_HIDECONTENT: Comment.hideContent($comment); break;
					case Group.ACTION_HIDETHREAD: Comment.hideThread($comment); break;
					case Group.ACTION_WHITESPACE: Comment.whitespace($comment); break;
					case Group.ACTION_SPOILER: Comment.spoiler($comment, Options.globals.spoilertext, Options.globals.spoilerhint); break;
					case Group.ACTION_UNSPOILER: Comment.unspoiler($comment); break;
					default: ; break;
				};
				switch (groups[i].comment_vote) {
					case Group.VOTE_UP: Comment.voteUp($comment, Options.globals.votedelay); break;
					case Group.VOTE_DOWN: Comment.voteDown($comment, Options.globals.votedelay); break;
					default: ; break;
				};
				if (!!groups[i].color)
					Comment.mark($comment, groups[i].color);
				break;
			};
	});
}
//============================================================================================================
function hijackComments(groups) {
	//перехват загрузки комментариев
	var oldLoadComments = unsafeWindow.comments['load'];

	function newLoadComments(aElemTrigger) {
		var $parent = $(aElemTrigger).closest('.entry-comments');
		oldLoadComments.call(this,aElemTrigger);
		waitForSelector('.hcomment', $parent, true, function(){
			processComments(groups, $parent);
			});
		}

	unsafeWindow.comments['load'] = newLoadComments;
	}

//============================================================================================================
var Options = {
	COLORS : {
		"":"[нет]",
		"silver":"silver",
		"gray":"gray",
		"black":"black",
		"maroon":"maroon",
		"red":"red",
		"orange":"orange",
		"yellow":"yellow",
		"olive":"olive",
		"lime":"lime",
		"green":"green",
		"aqua":"aqua",
		"blue":"blue",
		"navy":"navy",
		"teal":"teal",
		"fuchsia":"fuchsia",
		"purple":"purple",
	},
	$wnd : undefined,
	magic : undefined,
	globals : {},
	installOnSaveListener: function() {
		if (typeof Options.magic === 'undefined') {
			window.addEventListener("message", Options.handlerOnSave, false);
			Options.magic = Math.random().toString(36).slice(2);
			}
	},
	handlerOnSave: function(event) {
		var messageJSON;
		try {
			messageJSON = JSON.parse(event.data);
		}
		catch (zError) {
			// Do nothing
		}
		if ( !messageJSON || (typeof messageJSON.GKFILTER === 'undefined') )
			return; //-- Message is not for us.
		else { 
		if (messageJSON.GKFILTER === Options.magic) {
			GM_setValue('groups',JSON.stringify(messageJSON.groups));
			GM_setValue('globals',JSON.stringify(messageJSON.globals));
			}
		}
	},
	load: function() {
		var arr = JSON.parse(GM_getValue('groups','[]'));
		Options.groups = [];
		for (var i=0;i<arr.length;i++)
			Options.groups.push(Group.unserialize(arr[i]));
		var glb = JSON.parse(GM_getValue('globals','{}'));
		Options.globals = {
			spoilertext: (typeof glb.spoilertext === 'undefined') ? 'показать всё, что скрыто' : glb.spoilertext.toString(),
			spoilerhint: (typeof glb.spoilerhint === 'undefined') ? true : Boolean(glb.spoilerhint),
			votedelay: (typeof glb.votedelay === 'undefined') ? 10.0 : parseFloat(glb.votedelay),
			};
	},
	save: function(){
		var grp = [];
		for (var i=0;i<Options.groups.length;i++)
			grp.push(Options.groups[i].serialize());
		var msg = {'GKFILTER':Options.magic,groups:grp,globals:Options.globals};
		window.postMessage(JSON.stringify(msg), "*");
	},
	buildGroupForm: function(group) {
		var $form = $('\
		<fieldset class="GKFSgroupform">\
			<legend>\
				<input type="text" value="" placeholder="Название группы" class="GKFSgrouptitle"/>\
				<button class="GKFSdeletegroup">X</button>\
			</legend>\
			<p><input type="checkbox" value="" class="GKFSgroupactive"/><label>Группа используется</label></p>\
			<p><label>Участники (обязательно):</label><input type="text" value="" placeholder="Введите имена участников, разделенные ;" class="GKFSuserlist"/></p>\
			<p><label>Разделы (по умолчанию во всех):</label><input type="text" value="" placeholder="Введите названия разделов, разделенные ;" class="GKFSchapterlist"/></p>\
			<p><label>Посты:</label><select rows="1" class="GKFSpost GKFSactions">\
				<option value="'+Group.ACTION_NONE+'" class="GKFSneutral">ничего не делать</option>\
				<option value="'+Group.ACTION_HIDECONTENT+'" class="GKFSevil">скрыть содержимое</option>\
				<option value="'+Group.ACTION_HIDETHREAD+'" class="GKFSevil">скрыть целиком</option>\
				<option value="'+Group.ACTION_WHITESPACE+'" class="GKFSevil">закрыть белым</option>\
				<option value="'+Group.ACTION_SPOILER+'" class="GKFSevil">закрыть спойлером</option>\
			</select>, <select rows="1" class="GKFSpost GKFSvotes">\
				<option value="'+Group.VOTE_NONE+'" class="GKFSneutral">не голосовать</option>\
				<option value="'+Group.VOTE_UP+'" class="GKFSgood">плюсануть</option>\
				<option value="'+Group.VOTE_DOWN+'" class="GKFSevil">минусануть</option>\
			</select></p>\
			<p><label>Комменты:</label><select rows="1" class="GKFScomment GKFSactions">\
				<option value="'+Group.ACTION_NONE+'" class="GKFSneutral">ничего не делать</option>\
				<option value="'+Group.ACTION_HIDECONTENT+'" class="GKFSevil">скрыть коммент</option>\
				<option value="'+Group.ACTION_HIDETHREAD+'" class="GKFSevil">скрыть ветку</option>\
				<option value="'+Group.ACTION_WHITESPACE+'" class="GKFSevil">закрыть белым</option>\
				<option value="'+Group.ACTION_SPOILER+'" class="GKFSevil">закрыть спойлером</option>\
				<option value="'+Group.ACTION_UNSPOILER+'" class="GKFSgood">убрать спойлер</option>\
			</select>, <select rows="1" class="GKFScomment GKFSvotes">\
				<option value="'+Group.VOTE_NONE+'" class="GKFSneutral">не голосовать</option>\
				<option value="'+Group.VOTE_UP+'" class="GKFSgood">плюсануть</option>\
				<option value="'+Group.VOTE_DOWN+'" class="GKFSevil">минусануть</option>\
			</select></p>\
			<p><label>Выделение цветом:</label><select rows="1" class="GKFScolors"></select></p>\
		</fieldset>');
		var coloropts = [];
		for (var color in Options.COLORS)
			coloropts.push('<option value="'+color+'" style="color:'+color+'">'+Options.COLORS[color]+'</option>');
		$form.find('.GKFScolors').append(coloropts.join('\n'));
		$form.find('.GKFSgroupactive').attr('checked', group.active ? 'checked' : '');
		$form.find('.GKFSgrouptitle').val(group.title);
		$form.find('.GKFSuserlist').val(group.users.join(';'));
		$form.find('.GKFSchapterlist').val(group.chapters.join(';'));
		$form.find('.GKFSpost.GKFSactions').val(group.post_action);
		$form.find('.GKFSpost.GKFSvotes').val(group.post_vote);
		$form.find('.GKFScomment.GKFSactions').val(group.comment_action);
		$form.find('.GKFScomment.GKFSvotes').val(group.comment_vote);
		$form.find('.GKFScolors').val(group.color);
		return $form;
	},
	parseGroupForm: function($form) {
		var group = new Group();
		group.active = !!$form.find('.GKFSgroupactive')[0].checked;
		group.title = $form.find('.GKFSgrouptitle').val();
		var arr;
		arr = $form.find('.GKFSuserlist').val().split(';');
		for (var i=0;i<arr.length;i++) {
			var s = $.trim(arr[i]).toLowerCase();
			if (s.length > 0)
				group.users.push(s);
		}
		arr = $form.find('.GKFSchapterlist').val().split(';');
		for (var i=0;i<arr.length;i++) {
			var s = $.trim(arr[i]).toLowerCase();
			if (s.length > 0)
				group.chapters.push(s);
		}
		group.post_action = parseInt($form.find('.GKFSpost.GKFSactions').val(),10);
		group.post_vote = parseInt($form.find('.GKFSpost.GKFSvotes').val(),10);
		group.comment_action = parseInt($form.find('.GKFScomment.GKFSactions').val(),10);
		group.comment_vote = parseInt($form.find('.GKFScomment.GKFSvotes').val(),10);
		group.color = $form.find('.GKFScolors').val();
		return group;
	},
	addGroup: function() {
		var $form = Options.buildGroupForm(new Group());
		$('.GKFSdeletegroup', $form).bind('click', function(e){Options.delGroup($(this).closest('.GKFSgroupform'));});
		Options.$wnd.find('p.GKFSgroups').append($form); 
	},
	delGroup: function($group) {
		if (confirm('Удалить группу "'+$group.find('.GKFSgrouptitle').val()+'"?'))
			$group.remove();
	},
	buildGlobalsForm: function() {
		var $form = $('\
		<fieldset id="GKFSglobalsform">\
			<legend>Глобальные настройки</legend>\
			<p><label>Текст спойлера:</label><input id="GKFSspoilertext" type="text" value=""/></p>\
			<p><input id="GKFSspoilerhint" type="checkbox"/><label>Показывать скрытый текст во всплывающей подсказке.</label></p>\
			<p><label>Интервал голосования, сек</label><input id="GKFSvotedelay" type="input" value=""/></p>\
		</fieldset>');
		$form.find('#GKFSspoilertext').val(Options.globals.spoilertext);
		$form.find('#GKFSspoilerhint').attr('checked', Options.globals.spoilerhint ? 'checked' : '');
		$form.find('#GKFSvotedelay').val(Options.globals.votedelay);
		return $form;
	},
	parseGlobalsForm: function($form) {
		var res = {};
		res.spoilertext = $form.find('#GKFSspoilertext').val();
		res.spoilerhint = $form.find('#GKFSspoilerhint')[0].checked;
		res.votedelay = parseFloat($form.find('#GKFSvotedelay').val());
		return res;
	},
	accept: function() {	
		Options.groups = [];
		Options.$wnd.find('.GKFSgroupform').each(function(){
			Options.groups.push(Options.parseGroupForm($(this)));
		});
		Options.globals = Options.parseGlobalsForm(Options.$wnd.find('#GKFSglobalsform'));
		Options.save();
		Options.hide();
	},
	cancel: function() {
		Options.hide();
	},
	show: function() {
		if ($('#GKsettings').length > 0)
			return;
		Options.$wnd = $('<div id="GKFSettings">\
			<p class="GKFSbuttons">\
				<button class="GKFSaccept">Сохранить</button>\
				<button class="GKFScancel">Отменить</button>\
			</p>\
			<hr class="GKFSseparator" />\
			<p class="GKFSgroups"></p>\
			<p class="GKFSbuttons"><button class="GKFScreategroup">Добавить группу</button></p>\
			<hr class="GKFSseparator" />\
			<p class="GKFSbuttons">\
				<button class="GKFSaccept">Сохранить</button>\
				<button class="GKFScancel">Отменить</button>\
			</p>\
			</div>');
		var $place = Options.$wnd.find('p.GKFSgroups');
		for (var i=0;i<Options.groups.length;i++)
			$place.append(Options.buildGroupForm(Options.groups[i]));
		Options.$wnd.find('.GKFSbuttons:eq(1)').after(Options.buildGlobalsForm());
		$('.GKFSaccept', Options.$wnd).bind('click', function(e){Options.accept();});
		$('.GKFScancel', Options.$wnd).bind('click', function(e){Options.cancel();});
		$('.GKFSdeletegroup', Options.$wnd).bind('click', function(e){Options.delGroup($(this).closest('.GKFSgroupform'));});
		$('.GKFScreategroup', Options.$wnd).bind('click', function(e){Options.addGroup();});
		$('body').append(Options.$wnd);
	},
	hide: function() {
		if (typeof Options.$wnd !== 'undefined') {
			Options.$wnd.remove();
			Options.$wnd = undefined;
		};
	},
};
//регистрируем пользовательские команды
GM_registerMenuCommand("GK Filter settings", function(){Options.show();}, 'f');
//============================================================================================================

Options.installOnSaveListener();
Options.load();
if (Options.groups.length > 0)
	//делаем дело
	if (/govnokod\.ru\/\d+/.test(location))
		//мы на странице поста, обрабатываем все комментарии на странице
		processComments(Options.groups, $('body'));
	else {
		//мы на главной или где-то еще
		//исключение: не обрабатываем посты в профиле пользователя, иначе мы можем их так и не увидеть.
		if (!/govnokod\.ru\/user\/\d+\/codes/.test(location))
			processPosts(Options.groups);
		//тем не менее, перехватим загрузку комментариев
		hijackComments(Options.groups);
		}
})();