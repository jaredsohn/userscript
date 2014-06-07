// ==UserScript==
// @name				 #frfpoll
// @namespace			http://userscripts.org/users/26596
// @description			Friendfeed polls
// @include				http://friendfeed.com/
// @include				http://friendfeed.com/*
// ==/UserScript==

if (document.getElementById("feed")) {

	var $ = unsafeWindow.jQuery,
		console = unsafeWindow.console,
		Frfpoll = {};

	$.extend({
		parseJSON: function( data ) {
			if ( typeof data !== "string" || !data ) {
				return null;
			}
			data = unsafeWindow.jQuery.trim( data );
			if ( /^[\],:{}\s]*$/.test(data.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
				.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
				.replace(/(?:^|:|,)(?:\s*\[)+/g, "")) ) {
				return window.JSON && window.JSON.parse ?
					window.JSON.parse( data ) :
					(new Function("return " + data))();
			} else {
				unsafeWindow.jQuery.error( "Invalid JSON: " + data );
			}
		}
	});
	// в френдфидике используется старая джейквери, в которой ещё нет parseJSON

	Frfpoll.style = document.createElement("STYLE");
	Frfpoll.style.type = "text/css";
	Frfpoll.style.innerHTML = "\
		.frfpoll {}\
		.frfpoll-loading {}\
		.frfpoll-loading:before { content:''; width: 16px; height: 16px; position: absolute; display: block; background: url(/static/images/loading.gif); margin-left: -20px; margin-top: 1px; }\
		.frfpoll-answers { font-size: 13px; margin-top: 3px; line-height: 16px; padding: 5px 0 5px 30px; border-left: 3px solid #eee; }\
		.frfpoll-answer { margin-bottom: 4px; padding: 1px 3px; }\
		.frfpoll .comment:nth-child(1) { display: block; max-height: 50px; overflow: auto; }\
		.frfpoll-count { cursor: default; background: #fafafa; border: 1px solid #eee; border-bottom-color: #ccc; padding: 0px 4px; -moz-border-radius: 3px; -webkit-border-radius: 3px; border-radius: 3px; margin-left: 10px; }\
		.frfpoll-answer-text { }\
		.frfpoll-radio { margin-right: 5px; }\
		.frfpoll-submit { font-size: 12px !important; margin: 0 0 20px 30px; }\
		.frfpoll-new { color: #000088; cursor: pointer; margin-right: 7px; }\
		#attachlinks { display: inline; }\
		.frfpoll-newanswers { margin: 5px 0 0 40px; color: #999; }\
		.frfpoll-newanswers textarea { height: 60px !important; font-size: 12px; }\
	";
	document.body.appendChild(Frfpoll.style);
	// добавляю необходимые мне стили

	Frfpoll.getCookie = function(name) {
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = $.trim(cookies[i]);
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	};
	Frfpoll.at = Frfpoll.getCookie('AT');
	// аутентификационный токен

	Frfpoll.me = $("#profile .l_profile").attr('href').substr(1);
	// ник текущего юзера

	Frfpoll.getAnswers = function(i, eid, cid) {
		this.getComment(i, eid, cid, this.drawAnswers, this.fail);
	};
	// получить список ответов к опросу (фактически, текст первого коммента)

	Frfpoll.getVotes = function(i, eid) {
		this.getComments(i, eid, this.drawVotes, this.fail);
	};
	// получить все голоса к опросу (фактически, текст всех комментов)

	Frfpoll.getComment = function(i, eid, cid, callback, failback) {
		var url = 'http://friendfeed.com/a/getcomment',
			data = {
				'_nano': 1,
				'at': this.at,
				'comment': cid,
				'entry': eid,
				'fullhtml': 1
			};
		$.ajax({
			type: 'post',
			url: url,
			data: data,
			success: function(result){callback(result,i)},
			error: function(result){failback(result,i)}
		});
	};
	// получить конкретный коммент к записи

	Frfpoll.getComments = function(i, eid, callback, failback) {
		var url = 'http://friendfeed.com/a/comments',
			data = {
				'_nano': 1,
				'at': this.at,
				'entry': eid,
				'fullhtml': 0
			};
		$.ajax({
			type: 'post',
			url: url,
			data: data,
			success: function(result){callback(result,i)},
			error: function(result){failback(result,i)}
		});
	};
	// получить все комменты к записи

	Frfpoll.drawAnswers = function(data, i) {

		var ol = $("<ol>").addClass('frfpoll-answers'),
			rawAnswers = $.parseJSON(data).full_html,
			answers = rawAnswers.split(' | ');

		if (answers.length > 1 && answers[0].indexOf("Варианты ответа") === 0) {

			answers[0] = answers[0].replace(/Варианты ответа\: /,"");

			for (var a = 0, l = answers.length; a < l; a++) {
				answers[a] = answers[a].replace(/\d+\. /,"");
				var li = $("<li>").addClass('frfpoll-answer').html($("<span>").html(answers[a]).addClass('frfpoll-answer-text'));
				ol.append(li);
				Frfpoll.entries[i].answers.push({
					'element': li,
					'votes': 0,
					'voters': []
				});
			}

			Frfpoll.entries[i].body.append(ol);
			Frfpoll.entries[i].ol = ol;

			Frfpoll.getVotes(i, Frfpoll.entries[i].id);

		} else {
			Frfpoll.fail(data, i);
		}

	};
	// нарисовать список вопросов

	Frfpoll.drawVoteBar = function(element, value, total) {
		var width = parseInt((value * 100)/total, 10);
		element.attr('style','background: -moz-linear-gradient(left, #C7D3E5 0%, #C7D3E5 ' + width + '%, #FFFFFF ' + width + '%); background: -webkit-gradient(linear, left top, right top, color-stop(0%,#C7D3E5), color-stop(' + width + '%,#C7D3E5), color-stop(' + width + '%,#FFFFFF)); background: -o-linear-gradient(left, #C7D3E5 0%,#C7D3E5 ' + width + '%,#FFFFFF ' + width + '%)');
	};
	// нарисовать полоску под вопросом

	Frfpoll.drawVotes = function(data, i) {

		var rawVotes = $.parseJSON(data),
			tmp = $("<div>").html(rawVotes.html).css('display','none'),
			comments = $('.comment',tmp),
			votes = {},
			sum = [],
			iVoted = false,
			total = 0;

		for (var j = 1, l = comments.length; j < l; j++) {
			var c = comments[j],
				author = $('.l_profile', c).attr('href').substr(1),
				vote = parseInt($('.content', c).html().substr(0, 4), 10);
			if (vote && vote > 0 && vote <= Frfpoll.entries[i].answers.length) {
				votes[author] = vote;
				if (author == Frfpoll.me)
					iVoted = true;
			}
		}
		tmp = comments = false;

		for (voter in votes) {
			var vote = votes[voter] - 1;
			total++;
			Frfpoll.entries[i].answers[vote].votes++;
			Frfpoll.entries[i].answers[vote].voters.push(voter);
		}
		Frfpoll.entries[i].total = total;

		for (var a = 0, l = Frfpoll.entries[i].answers.length; a < l; a++) {
			var answer = Frfpoll.entries[i].answers[a],
				count = $("<strong>").html(answer.votes).attr('title',answer.voters.join(' ')).addClass('frfpoll-count');
			answer.element.append(count);
			if (answer.votes > 0)
				Frfpoll.drawVoteBar(answer.element, answer.votes, total);
			if (Frfpoll.me && !iVoted) {
				var radio = $("<input>").attr('type','radio').attr('name','frfpoll-radio-' + Frfpoll.entries[i].id).val(a+1).addClass('frfpoll-radio');
				answer.element.prepend(radio);
			}
			Frfpoll.entries[i].answers[a].count = count;
		}

		if (Frfpoll.me && !iVoted) {
			var submit = $("<input>").attr('type','submit').val('Vote').addClass('frfpoll-submit');
			Frfpoll.entries[i].body.append(submit);
			Frfpoll.entries[i].submit = submit;
			submit.bind('click', {i:i}, Frfpoll.vote);
		}

		Frfpoll.stopLoading(Frfpoll.entries[i].element);

	};
	// посчитать голоса

	Frfpoll.vote = function(event) {
		var entry = Frfpoll.entries[event.data.i],
			checked = $('input[type=radio][checked=true]',entry.element);
		if (checked && checked[0]) {
			answer = checked[0].value,
			c = $(Frfpoll.entries[event.data.i].answers[answer-1].count),
			old = parseInt(c.html(),10);
			c.html(old + 1);
			Frfpoll.drawVoteBar(entry.answers[answer-1].element, old+1, entry.total + 1);
			entry.submit.attr('disabled','true');
			Frfpoll.startLoading(entry.element);
			Frfpoll.postComment(entry.id, answer, function() {
					Frfpoll.stopLoading(entry.element);
					entry.submit.remove();
					$('input[type=radio]',entry.ol).remove();
				})
		}
	};
	// голосование

	Frfpoll.postComment = function(eid, body, callback) {
		var url = 'http://friendfeed.com/a/comment',
			data = {
				'_nano': 1,
				'at': Frfpoll.at,
				'entry': eid,
				'body': body
			};
		$.ajax({
			type: 'post',
			url: url,
			data: data,
			success: callback
		});
	};
	// отправить коммент

	Frfpoll.startLoading = function(entry) {
		$(entry).addClass('frfpoll-loading');
	};
	// показать лоадинг
	Frfpoll.stopLoading = function(entry) {
		$(entry).removeClass('frfpoll-loading');
	};
	// спрятать лоадинг
	Frfpoll.fail = function(data, i) {
		Frfpoll.stopLoading(Frfpoll.entries[i].element);
	};
	// ничего не получилось, накрываемся и лежим

	Frfpoll.newPollForm = function() {
		var form = $("#page .sharebox form"),
			title = $("div.title",form),
			textarea = $("textarea.title",title),
			button = $("input[type=submit]",form),
			answersTextarea = $("<div class='frfpoll-newanswers'><small>Варианты ответа (по одному на строку)</small><div class='textbox'><textarea class='title frfpoll-newanswers-textarea' cols='40' rows='2'>Первый вариант ответа\nВторой вариант</textarea></div></div>");
		textarea.val('#frfpoll Текст нового опроса').focus();
		title.append(answersTextarea);
		button.bind("click", function(){
			Frfpoll.newPoll = {
				q: textarea,
				question: textarea.val(),
				a: answersTextarea,
				answers: $("textarea", answersTextarea).val().split("\n")
			};
			Frfpoll.waitForAjaxSuccess(Frfpoll.onASNewPoll)
		});
	};
	// открыть форму нового опроса

	Frfpoll.waitForAjaxSuccess = function(callback) {
		$('#feed').bind('ajaxSuccess', callback);
	};
	// ждём возвращения данных от сервера
	Frfpoll.stopForAjaxSuccess = function(callback) {
		$('#feed').unbind('ajaxSuccess', callback);
	};
	// прекращаем ждать возвращения данных от сервера

	Frfpoll.onASNewPoll = function(e,r,s) {
		if (r) {
			var response = $.parseJSON(r.responseText);
			if (response.success && response.id && response.html && response.html.indexOf("frfpoll")) {
				Frfpoll.stopForAjaxSuccess(Frfpoll.onASNewPoll);
				Frfpoll.startLoading($("e-" + response.id));
				var formattedAnswers = 'Варианты ответа: ';
				for (var i = 0, l = Frfpoll.newPoll.answers.length; i < l; i++) {
					if (i > 0)
						formattedAnswers += ' | ';
					formattedAnswers += (i+1) + '. ' + Frfpoll.newPoll.answers[i];
				}
				Frfpoll.newPoll.a.remove();
				Frfpoll.postComment(response.id, formattedAnswers, function(){});
				window.location = window.location;
			}
		}
	};
	// новый опрос пришёл от сервера

	Frfpoll.onASInitPoll = function(e,r,s) {
		if (r) {
			var response = $.parseJSON(r.responseText);
			if (response.id && response.html && response.html.indexOf("Варианты ответа")) {
				Frfpoll.stopForAjaxSuccess(Frfpoll.onASInitPoll);
				//window.setTimeout("Frfpoll.init",500);
			}
		}
	};
	// опрос готов, инициализируемся заново

	Frfpoll.entries = [];
	Frfpoll.init = function() {
		var feed = $('#feed'),
			entries = $('.entry',feed),
			pattern = /#frfpoll/i,
			attachlinks = $('#attachlinks');
		if (attachlinks && attachlinks[0]) {
			$(attachlinks[0].parentNode).prepend($('<span class="frfpoll-new">Poll</span><span>-</span>'));
			var newPoll = $('.frfpoll-new', attachlinks[0].parentNode);
			newPoll.click(this.newPollForm);
		}
		for (var i = 0, l = entries.length; i < l; i++) {
			var e = entries[i],
				eid = $(e).attr('eid'),
				b = $('.ebody',e),
				t = $('.text',b).html(),
				h = $('.date',e).attr('href'),
				p = pattern.test(t),
				c = $('.comments .comment', e);
			this.entries.push({
				'id': eid,
				'element': e,
				'text': t,
				'body': b,
				'href': h,
				'poll': p,
				'comments': c,
				'answers': [],
			});
			if (p && c) {
				$(e).addClass('frfpoll');
				this.startLoading(e);
				this.getAnswers(i, eid, $(c[0]).attr('cid'));
			}
		}
	};
	// инициализация

	Frfpoll.init();

}
