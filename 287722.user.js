// ==UserScript==
// @name        Helper
// @namespace   BW
// @description Help me to play in a game
// @include     http://*.botva.ru/
// @version     1.3.1
// @grant		null
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js
// ==/UserScript==
var event = new MouseEvent('click', {
	'view': window,
	'bubbles': true,
	'cancelable': true
});
var actions = {
	'fight_arena' : 'Сразиться на арене',
	'send_pier' : 'Отправить',
	'fight_monster' : 'Страшилка в бодалке',
	'zoo_event' : 'Приключение',
	'carier' : 'Спуститься',
	'pick_award' : 'Забрать награду'
}
var availables_actions = ['horror', 'mine'];
var min_extract_percent = 50;
$(function(){
	if (getCookie('confirm_mine') == '') {
		setCookie('confirm_mine', confirm('Работать в шахте?'), 30);
	}
	var $timers = $('#rmenu1').find('.timers');
	var $menu = $('#menu');
	var $accordion = $('#events_scroll');

	//	Спуск в подземелье
	if (getCookie('s_action') == 'horror') {
		var wait_horrors = (random(1, 12) == 6) ? random(60, 120) * 1000 : random(1, 4) * 1000;
		setTimeout(function() {
			// Выйть из подземелье
			var $horrors_leave = $('form[action*="monster.php?a=leave_accept"]');
			if ($horrors_leave.length) {
				setCookie('s_action', '', 30);
				$horrors_leave.find('input[type="submit"]').click();
				return false;
			}

			// Нападать на страшилки
			var $horrors_attack = $('form.inline[action*="?a=attack"]');
			if ($horrors_attack.length) {
				$horrors_attack.find('input[type="submit"]').click();
				return false;
			}
			
			// Спуститься по лебедке
			var $horrors_msg = $('#body').children('.message');
			if ($horrors_msg.length && $horrors_msg.text().match('На уровне нет никого')) {
				var $shelter_msg = $('#body').find('.bar_brown');
				if ($shelter_msg.length && $shelter_msg.text().match('Идти к Пристанище')) {
					var $horrors_leave = $('form[action*="monster.php?a=leave"]');
					if ($horrors_leave.length) {
						$horrors_leave.find('input[type="submit"]').click();
						return false;
					}
				}
				var $horrors_next = $('form[action*="monster.php?a=continue"] > input[value="ПО ЛЕБЕДКЕ"]');
				if ($horrors_next.length) {
					var rand_next = random(0, $horrors_next.length - 1);
					$horrors_next[rand_next].click();
					return false;
				}
			}
			
			// Бродить по уровню
			var $horrors_search = $('form.inline[action*="monster.php?a=search"]');
			if ($horrors_search.length) {
				$horrors_search.find('input[type="submit"]').click();
				return false;
			}
			
			// Выйть из подземелье
			if (!$timers.text().match('Спуск в подземелье')) {
				setCookie('s_action', '', 30);
				return false;
			}
			
			// Прочитать почту
			if (random(1, 10) == 6) {
				var $post = $menu.find('a[href*="post.php"]');
				if ($post.hasClass('active')) {
					setCookie('s_action', '', 30);
					$post[0].dispatchEvent(event);
					return false;
				}
			}
		}, wait_horrors);
	}
	
	// Копить кристалы в шахте
	if (getCookie('s_action') == 'mine') {
		var wait_mine = (random(1, 12) == 6) ? random(60, 120) * 1000 : random(1, 4) * 1000;
		setTimeout(function() {
			if (getCookie('mine_count') > 10 && random(1, 5) == 5 && $timers.text().match('Я свободен!')) {
				setCookie('s_action', '', 30);
				setCookie('mine_count', 0, 30);
				$menu.find('a[href*="index.php"]')[0].dispatchEvent(event);
				return false;
			}

			var $mine_form = $('form#mine_form');
			if ($mine_form.length) {
				$mine_form.find('input[type="submit"]').click();
				return false;
			}

			var line_mine = parseInt($('#body').find('.red_line_mine').children('b').text());
			if (line_mine < min_extract_percent) {
				var $reset_btn = $('a[href*="mine.php?a=open&m=reset"]');
				if ($reset_btn.length) {
					$reset_btn[0].dispatchEvent(event);
					return false;
				}
			} else {
				var $dig_btn = $('a[href*="mine.php?a=open&m=dig"]');
				if ($dig_btn.length) {
					var mine_count = getCookie('mine_count') ? getCookie('mine_count') : 0;
					setCookie('mine_count', ++mine_count, 30);
					$dig_btn[0].dispatchEvent(event);
					return false;
				}
			}
		}, wait_mine);
	}

	var wait_actions = random(1, 4) * 1000;
	setTimeout(function() {
		// Сразится на арене
		if (getCookie('s_action') == 'fight_arena') {
			var $enemys = $('.arena_enemy');
			if ($enemys.length) {
				var reputation = [];
				$enemys.each(function(){
					var value = parseInt($(this).find('.arena_enemy_stat > div:first').text().replace('.',''));
					reputation.push(value);
				});
				var min = Math.min.apply(null, reputation);
				setCookie('s_action', '', 30);
				$enemys[reputation.indexOf(min)].dispatchEvent(event);
				return false;
			}
			var $arena_container = $('.corner3');
			var $arena_btn = $arena_container.find('a[href*="do_cmd=search"]');
			if ($arena_btn.length) {
				$arena_btn[0].dispatchEvent(event);
				return false;
			}
		}
		
		// Сразится с страшилками
		if (getCookie('s_action') == 'fight_monster') {
			var $monster_form = $('form.inline[action*="?a=monster"]');
			if ($monster_form.length) {
				$monster_form.find('input[type="submit"]').click();
				return false;
			}
			var $monster_attack = $('form.inline[action*="?a=attack"]');
			if ($monster_attack.length) {
				setCookie('s_action', '', 30);
				$monster_attack.find('input[type="submit"]').click();
				return false;
			}
		}
		
		// Отправить летуна в приключение
		if (getCookie('s_action') == 'zoo_event') {
			var $flying_block = $('#flying_block');
			if ($flying_block.length) {
				$flying_block.find('form').each(function(){
					if ($(this).find('input[name*="do_cmd"]').val() == 'do_big') {
						setCookie('s_action', '', 30);
						$(this).find('input[type="submit"]').click();
						return false;
					}
				});
			}
		}
		
		// Отправить летуна в малое приключение
		if (getCookie('s_action') == 'zoo_event_min') {
			var $flying_block = $('#flying_block');
			if ($flying_block.length) {
				$flying_block.find('form').each(function(){
					if ($(this).find('input[name*="do_cmd"]').val() == 'do_small') {
						if (!$(this).find('b.cmd_blocked').length) {
							$(this).find('input[type="submit"]').click();
							return false;
						} else {
							setCookie('s_action', '', 30);
							$menu.find('a[href*="index.php"]')[0].dispatchEvent(event);
							return false;
						}
					}
				});
			}
		}
		
		// Отправить причал
		if (getCookie('s_action') == 'send_pier') {
			var $pier_form = $('form.inline[action*="harbour.php?a=pier"]');
			if ($pier_form.length) {
				setCookie('s_action', '', 30);
				$pier_form.find('input[type="submit"]').click();
				return false;
			}
		}
		
		// Спуститься в подземелье
		if (getCookie('s_action') == 'carier') {
			var $carier_form = $('form[action*="monster.php?a=start"] > input[value*="ПО ЛЕБЕДКЕ"]');
			if ($carier_form.length) {
				setCookie('s_action', 'horror', 30);
				$carier_form.click();
				return false;
			}
		}

		// Забрать награду
		if (getCookie('s_action') == 'pick_award') {
			var $pick_award = $('a[href*="do_cmd=get_all_prizes"]');
			if ($pick_award.length) {
				setCookie('s_action', '', 30);
				$pick_award[0].dispatchEvent(event);
				return false;
			}
		}
	}, wait_actions);
	
	// Проверить все доступные напоминаний
	var s_action = getCookie('s_action');
	if (s_action == '' || $.inArray(s_action, availables_actions) != -1) {
		var wait_reminders = random(2, 10) * 1000;
		setTimeout(function() {
			var $link_actions = shuffle($accordion.find('a'));
			var flag = true;
			$link_actions.each(function(){
				var self = this;
				$.each(actions, function(index, value) {
					if ($(self).text().match(value)) {
						setCookie('s_action', index, 30);
						self.dispatchEvent(event);
						flag = false;
						return false;
					}
				});
				return flag;
			});

			// Прочитать почту
			if ($timers.text().match('Я свободен!')) {
				var $post = $menu.find('a[href*="post.php"]');
				if ($post.hasClass('active')) {
					$post[0].dispatchEvent(event);
					return false;
				}
			}

			// Отправиться в шахте
			if ($timers.text().match('Я свободен!') && getCookie('confirm_mine') == 'true') {
				var $mine_btn = $('a[href*="mine.php?a=open"]');
				if ($mine_btn.length) {
					setCookie('s_action', 'mine', 30);
					$mine_btn[0].dispatchEvent(event);
					return false;
				}
			}
		}, wait_reminders);
	}
	
	// Редирект на странице спуска
	var wait_redirect = random(10, 25) * 1000;
	setTimeout(function() {
		if ($timers.text().match('Спуск в подземелье') && getCookie('s_action') == '') {
			setCookie('s_action', 'horror', 30);
			if (!location.href.match('http://g3.botva.ru/monster.php')) {
				$timers.find('a[href*="monster.php?a=working"]')[0].dispatchEvent(event);
				return false;
			}
		}
		if ($timers.text().match('Работа в карьере') && getCookie('s_action') == '') {
			setCookie('s_action', 'mine', 30);
			if (!location.href.match('http://g3.botva.ru/mine.php')) {
				$timers.find('a[href*="mine.php?a=open"]')[0].dispatchEvent(event);
				return false;
			}
		}
	}, wait_redirect);

	// Если ничего не происходит в течение 15-20 мин то делать рефреш
	var wait_refresh = (random(15, 20) * 60 * 1000) + (random(1, 60) * 1000);
	setTimeout(function() {
		$menu.find('a[href*="index.php"]')[0].dispatchEvent(event);
		return false;
	}, wait_refresh);
});

function random(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function setCookie(cname,cvalue,exdays) {
	var d = new Date();
	d.setTime(d.getTime()+(exdays * 24 * 60 * 60 * 1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	}
	return "";
}

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}