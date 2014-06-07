// ==UserScript==
// @name           wykop quizer
// @description    umożliwia przeprowadzanie quizów na mikroblogu wykop.pl
// @namespace      http://www.neatgroup.pl/ciepol/wykop/quizer/
// @author         ciepol@wp.pl
// @homepage       http://www.wykop.pl/ludzie/ciepol/
// @version        1.0
// @include        http://*.wykop.pl/wpis/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
// @history        1.0 first version
// ==/UserScript==


var wq = function() {
	COOKIE: 'wykopquizer',
	quiz: {
		step: 0,
		checked: 0,
		prompts: 0,
		len: 0,
		interval: 3000,
		data: []
	},
	init: function() {
		this.id = parseInt(document.location.pathname.replace('/wpis/', ''), 10);
		this.operator = $('nav.main .avatar ul > li:first-child > a').text();
		var cookie = this.readCookie(this.COOKIE);
		if (cookie != null) {
			console.info('quiz in progress.');
			this.quiz = $.parseJSON(cookie);
			if (this.id !== this.quiz.id) {//not in current quiz
				console.info('not in current quiz');
				if (confirm('Rozpocząłeś już inny quiz.\nCzy przejść do niego?')) {
					document.location.href = document.location.host + '/wpis/' + this.quiz.id;
				}
			} else {//quiz in progress
				console.info('restoring game');
				this.check();
			}
		} else {
			console.info('no quiz in progress.');
			$('.stream').before('<a id="wq_start_game" class="button margin20_0" href="#"><span>rozpocznij quiz</span></a>'));
			document.getElementById('wq_start_game').addEventListener('click', wq.setGame(); return false, true);
		}
	},
	setGame: function() {
		this.showDialog('<p>Pytanka <textarea id="wq_data"></textarea></p><p><a href="#" id="wq_dialog_close">Anuluj</a><a href="#" class="button marginleft5" id="wq_dialog_start"><span>Start</span></a></p>');
		$('#wq_dialog_close').click(function() {
			this.hideDialog();
			return false;
		});
		$('#wq_dialog_start').click(function() {
			this.start($('#wq_data').val());
			this.hideDialog();
			return false;
		});
	},
	start: function(data) {
		this.quiz.id = this.id;

		data = data.split(';');
		var len = data.length;
		if (len % 2 != 0) {
			alert('błąd danych');
			return false;
		}
		for (var i = 0; i < len; i+= 2) {
			var q = data[i];
			var a = data[i+1];
			if ( q == '' || a == '') {
				alert('żadna z danych nie może być pusta');
				return false;
			}
			wq.quiz.data[Math.floor(i/2)] = {'q' : data[i], 'a' : data[i+1]};
		}
		this.quiz.step = 0;
		this.quiz.len = this.quiz.data.length;
		this.play();
	},
	play: function() {
		var step = this.quiz.step;
		var hStep = step + 1;
		var len = this.quiz.len;
		this.store();
		this.say('Pytanie ' + hStep + '/' + len + ': ' + this.quiz.data[step].q);
	},
	store: function() {
		this.createCookie(this.COOKIE,JSON.stringify(this.quiz),30);
	},
	showDialog: function(content) {
		var dialog = $('<div id="wq_dialog" class="bgfff" style="position: absolute; top: 50%; left: 50%; padding: 20px; border: 1px solid #dadada; z-index: 1000; box-shadow: 0 0 3px #999;">' + content + '</div>').prependTo('body').hide();
		$('#wq_dialog_close').click(function() {
			wq.hideDialog();
			return false;
		});
		var scrollTop = $('body').scrollTop();
		if (scrollTop === 0) {scrollTop = $('html').scrollTop();}
		var dialogHeight = dialog.outerHeight();
		var dialogWidth = dialog.outerWidth();
		dialog.css({'margin-top' : -(dialogWidth/2), 'margin-left' : -(dialogHeight/2)}).fadeIn(500);
	},
	hideDialog: function() {
		$('#wq_dialog').fadeOut(500, function() {
			$(this).remove();
		});
	},
	check: function() {
		console.info('checking for proper answer');
		var step = this.quiz.step;
		var properAns = this.quiz.data[step].a;
		var subcomments = $('.subcomments .subcomment').not('.replyform');

		for (var i = 0, len = subcomments.length; i < len; i++) {
			var self = subcomments.eq(i);
			var ans = $('blockquote > p', self)[0].firstChild.data.replace(/\s+/g, '');
			if (ans === properAns) {
				var winner = $('blockquote > h5 > a:first-child', self).text();
				console.info('we have a winner: '+winner+'!');
				this.next(winner);
			}
		};
		console.info('no winner detected');
		var checked = this.quiz.checked;
		if (checked != 0 && checked % 4 == 0) {
			this.quiz.checked = 0;
			this.store();
			this.showPrompt();
			return false;
		} else {
			wq.refresh();
			console.info('not showing prompt. checked: '+this.quiz.checked);
		}
		this.quiz.checked++;
		this.store();
	},
	showPrompt: function() {
		console.info('showing prompt');
		var num = this.quiz.prompts;
		var a = this.quiz.data[this.quiz.step].a;
		var aLen = a.length;
		if (num >= aLen) {
			this.next(''); //no winner
		} else {
			var text ='';
			for (var i = 0; i < aLen; i ++) {
				if (i < num) {
					text += a[i];
				} else {
					text += '-';
				}
			}
			this.quiz.prompts++;
			wq.store();
			this.say(text);
		}
	},
	next: function(winner) {
		this.quiz.step++;
		this.quiz.checked = 0;
		this.quiz.prompts = 0;
		this.store();
		var txt = '';
		if (winner === '') {
			txt = 'Nikt nie odgadł hasła.';
		} else {
			txt = 'Hasło odgadł(a) @' + winner +':';
		}
		this.say(txt + ' Następne za ' + Math.floor(this.quiz.interval/1000) + ' sekundy.');
	},
	say: function(text) {
		var form = $('.replyform form');
		$('textarea', form).val(text);
		form.submit();
		wq.refresh();
	},
	refresh: function() {
		setTimeout('document.location.href = document.location.href', wq.quiz.interval);
	},
	createCookie: function(name,value,mins) {
		if (mins) {
			var date = new Date();
			date.setTime(date.getTime() + (mins * 60 * 1000));
			var expires = '; expires=' + date.toGMTString();
		}
		else var expires = '';
		document.cookie = name + '=' + value+expires + '; path=/';
	},
	readCookie: function(name) {
		var nameEQ = name + '=';
		var ca = document.cookie.split(';');
		for(var i=0, len = ca.length; i < len; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	},
	eraseCookie: function(name) {
		createCookie(name,'',-1);
	}
}

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);


console.info('init');
wq.init();
