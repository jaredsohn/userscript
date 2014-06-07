/**

This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/ or send a letter to Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.

**/
// ==UserScript==
// @name         Boards popularity counter
// @namespace    http://anopensmile.ru/boards_popularity_counter/
// @author       Noway
// @version      0.6.2
// @description  Counts boards speed/posts and make top of boards on 2ch.so
// @icon         http://2ch.hk/logo.gif
// @icon64       http://2ch.hk/logo.gif
// @homepage     http://userscripts.org/scripts/show/114478/
// @match        http://2ch.hk/
// @match        http://2ch.pm/
// @match        http://2ch.re/
// @match        http://2ch.tf/
// @match        http://2ch.wf/
// @match        http://2ch.yt/
// @match        http://2-ch.so/
// @match        http://2-ch.ru/
// @include      http://2ch.hk/
// @include      http://2ch.pm/
// @include      http://2ch.re/
// @include      http://2ch.tf/
// @include      http://2ch.wf/
// @include      http://2ch.yt/
// @include      http://2-ch.so/
// @include      http://2-ch.ru/
// @exclude      /^http://2ch.hk/(.+)$/
// @exclude      /^http://2ch.pm/(.+)$/
// @exclude      /^http://2ch.re/(.+)$/
// @exclude      /^http://2ch.tf/(.+)$/
// @exclude      /^http://2ch.wf/(.+)$/
// @exclude      /^http://2ch.yt/(.+)$/
// @exclude      /^http://2-ch.so/(.+)$/
// @exclude      /^http://2-ch.ru/(.+)$/
// @run-at       document-end
// @copyright    2011+, Noway
// ==/UserScript==

/**
	TODO:
		+ Rebuild structure
		+ Delete jQuery
		- Fix interface appending
		- Delete querySelector in boards scaning
		- Smooth sliding
**/
(function () {

	"use strict";

	if ((window.location.path || window.location.pathname) !== '/') {
		console.warn("Boards popularity counter must start only on main page");
		return false;
	}


	/* Declaring vars */
	
	var board_speed_regexp = /<!--<div class="speed">-->\[[а-яё\w]+ [а-яё\w]+: ([0-9]+) [а-яё\w\.\/]+\]<!--<\/div>-->/im;
	var board_posts_regexp = /<div id="thread_[0-9]+" class="thread">(<div id="post_([0-9]+)" class="oppost">(.*?<img alt="[а-яё\s]+" title="[а-яё\s]+" src="\/sticky\.png">)?.*?<\/div>)<script type="text\/javascript">.*?<\/script>(<table id="post_([0-9]+)" class="post">.*?<\/table>)*<\/div><br style="clear:left;" \/>/gim;
	var interface_html = '<style type="text/css">#BPC {-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:-moz-none;-ms-user-select:none;-o-user-select:none;user-select:none;background:#f6f6f6;border:1px solid #eaeaea;border-right:none;border-top:none;float:right;padding:0 10px 10px;position:absolute;right:0;text-align:left;top:0;vertical-align:middle;z-index:9000}#BPC button {padding:1px 6px}#BPC div {display:none;margin-left:13px;margin-right:20px;margin-top:15px;padding-bottom:10px}#BPC div.opened {display:block}#BPC h3 {background:#FFF;border:1px solid #eaeaea;font-size:15px;height:30px;line-height:30px;margin-top:10px;padding:0 0 0 12px;width:235px}#BPC h3 .spinner {-webkit-transition:-webkit-transform 0.3s;-moz-transition:-moz-transform 0.3s;-o-transition:-o-transform 0.3s;transition:transform 0.3s;display:inline-block;height:22px;position:relative;width:22px}#BPC h3 .spinner:after {border:5px solid transparent;border-bottom-color:#505050;content:"";display:block;height:0;left:6px;position:absolute;top:3px;width:0}#BPC h3 > span {background:#FFF;border:1px solid #EAEAEA;border-radius:5px;cursor:pointer;display:inline-block;float:right;height:22px;margin-left:20px;margin-right:3px;margin-top:3px;width:22px}#BPC h3 > span.opened .spinner {-webkit-transform:rotate(180deg);-moz-transform:rotate(180deg);-ms-transform:rotate(180deg);-o-transform:rotate(180deg);transform:rotate(180deg)}#BPC textarea {-webkit-user-select:auto;-khtml-user-select:auto;-moz-user-select:text;-ms-user-select:auto;-o-user-select:auto;user-select:auto;border:1px solid #eaeaea;height:170px;margin-bottom:10px;resize:vertical;width:100%}#BPC_boards_main_boards,#BPC_boards_additinal_boards {height:100px}#BPC_boards_rescan {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEPSURBVDiNpdO9SkNBEAXgbyKWxipJp5AidvoIYu0j2Cn4BNEIVoJ2QR/CF7CytBIbY6VpBGvBSkEUYvBa3HvlGsyfDiwss+ecmd09I0kSxYUGjtHBc7Zu0EZ9EF9SiIho4RLv2MICFrGNT1xHRDsiZjL8bLHyHu5QGaxSwJRxhnOs4z4/aKKL6jByQWQJT+ihnydXUZuAXMYV+kjQG0kYIhLYxAuSyJJTR0TM4+DPAnmUxkPGCETERkT8S+gVD1ib9kHz679JvyTBzoSkWl6whA+pdR9xOq7diKjiAst5roU5qZW7Rlu5gls0v3MDgP2sk0OsSJ1XzvZHUgvv/uD8UqWOE+kI5+PckY54YxD/BZ4GRwB5SwmyAAAAAElFTkSuQmCC);cursor:pointer;display:block;float:right;height:16px;width:16px}#BPC_boards_reset {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADfSURBVDiNpdEvS8RBEMbxz55JREwiCoIvQTBcEQTBIhbfgdluNp5gs5tsF01GLReuCDaTCiIYFE2CZQy3J+vfY3838MAyw3zn2ZkUEVJK4e94wlVWNyJ6X6oR8a8whw3s4Q4nWPisjwJ8g03hAA+YrwYUoH1cYCLlRFWklBLOcNqq7h7sLXCM9UYOsotF9Bs5yPGK6XEAbfTH+cIRXpqecRs3mC2TS+iMaGxhB49YHrqfRAfvuP+laQar2MUlzrFS1B0ist6K91DP6BncfevHgExZwzVuq/dRWEnYrAV8AIGlVJRJkmn4AAAAAElFTkSuQmCC);cursor:pointer;display:block;float:right;height:16px;width:16px}</style><div id="BPC"><h3>Boards speed counter<span id="BPC_speed_toggle" class="opened"><span id="BPC_speed_spinner" class="spinner"></span>​​​​​</span></h3><div id="BPC_speed" class="opened"><p id="BPC_speed_message">Result:</p><p><textarea id="BPC_speed_area" readonly="readonly"></textarea></p><p id="BPC_speed_inform"></p><p><button id="BPC_speed_start">Start count</button></p></div><h3>Boards posts counter<span id="BPC_posts_toggle"><span id="BPC_posts_spinner" class="spinner"></span>​​​​​</span></h3><div id="BPC_posts" ><p id="BPC_posts_message">Result:</p><p><textarea id="BPC_posts_area" readonly="readonly"></textarea></p><p id="BPC_posts_inform"></p><p><button id="BPC_posts_start">Start count</button></p></div><h3>Boards list<span id="BPC_boards_toggle"><span id="BPC_boards_spinner" class="spinner"></span>​​​​​</span></h3><div id="BPC_boards"><p><span>Boards:</span><span title="Rescan" id="BPC_boards_rescan"></span></p><p><textarea id="BPC_boards_main_boards"></textarea></p><p><span>Additinal boards:</span><span title="Reset" id="BPC_boards_reset"></span></p><p><textarea id="BPC_boards_additinal_boards"></textarea></p><p><button id="BPC_boards_save">Save</button></p></div></div>';
	var additinal_boards = ['/i/', '/bb/', '/rf/', '/dev/', '/test/', '/dr/'];
	var ajax_objects = [];



	/* Additinal methods */

	var $ = function(id) {
		if (typeof id == 'string') {
			return document.getElementById(id);
		}
		return id;
	}

	/* Initialising functions */



	var blockInsteed = function (str){
		$('BPC_speed_toggle').className = '';
		$('BPC_posts_toggle').className = '';
		$('BPC_boards_toggle').className = '';
		$(str+'_toggle').className = 'opened';

		$('BPC_speed').className = '';
		$('BPC_posts').className = '';
		$('BPC_boards').className = '';
		$(str).className = 'opened';
	}

	var scanBoardsOnPage = function() {
		var scanned_boards = [];
		var elements = document.querySelectorAll('.togglediv a');
		for(var i = 0; i < elements.length; i++){
			var tmp = elements[i].getAttribute('href').match(/^\/?([\w]+)\/?$/i);
			if (tmp != null && tmp[1] !== 'cp') {
				var board = "/" + tmp[1] + "/";
				var already_in_array = false;

				for (var j = 0; j < scanned_boards.length; j++) {
					if (scanned_boards[j] === board) {
						already_in_array = true;
						break;
					}
				}
				if (!already_in_array) {
					scanned_boards.push(board);
				}
			}
		}
		return scanned_boards;
	};

	var buildBoardsArray = function() {
		var return_array = (window.localStorage.BPC_mainBoards + ' ' + window.localStorage.BPC_additinalBoards).split(' ');
		return_array.sort(function (a, b) {
			return a - b;
		});
		for (var i = return_array.length - 1; i > 0; i--) {
			if (return_array[i] === return_array[i - 1]) {
				return_array.splice(i, 1);
			}
		}
		return return_array;
	};

	var getBoardPosts = function(html) {
		var thread_tmp = [];
		var last_threads_posts = [];
		var sticky_last = true;

		while ((thread_tmp = board_posts_regexp.exec(html)) != null) {
			if(sticky_last === false){
				break;
			}

			var last_post = (thread_tmp[5] != null) ? parseInt(thread_tmp[5], 10) : parseInt(thread_tmp[2], 10);
			sticky_last = (thread_tmp[3] != null) ? true : false;

			last_threads_posts.push(last_post);
		}
		board_posts_regexp.lastIndex = 0;

		last_threads_posts.sort(function (a, b) {
			return b - a;
		});
		return last_threads_posts[0];
	};

	var getBoardSpeed = function(html){
		var tmp = board_speed_regexp.exec(html);
		return (tmp != null) ? parseInt(tmp[1], 10) : NaN;
	};

	var countBoardsSpeed = function() {
		var cell = 0;
		var offset = 0;
		var results = [];
		var boards = buildBoardsArray();
		
		$('BPC_speed_inform').innerHTML = '0/' + boards.length + ' checked';
		ajax_objects = [];


		var speedReadyStateChange = function(){
			if(this.readyState == 4){
				if(this.status == 200 || this.status == 304) {
					results.push({
						'board': boards[this.board_cell],
						'speed': getBoardSpeed(this.responseText)
					});
				} else {
					if (this.statusText === 'abort') {
						return;
					}
					console.log(this.statusText + ": " + this.status);
					console.log(this);
				}

				if ($('BPC_speed_start').innerHTML === 'Start count') {
					return;
				}

				offset++;
				$('BPC_speed_inform').innerHTML = offset + '/' + boards.length + ' checked';

				if (offset >= boards.length) {
					var results_string = "";

					results.sort(function (a, b) {
						if (isNaN(a.speed)) {
							return 1;
						} else if (isNaN(b.speed)) {
							return -1;
						} else {
							return b.speed - a.speed;
						}
					});

					for (var i = 0; i < results.length; i++) {
						var buff = (isNaN(results[i].speed)) ? 'N/A' : results[i].speed;
						results_string += (+i + 1) + ") " + results[i].board + " - " + buff + " p/h\n";
					}

					$('BPC_speed_start').innerHTML = 'Start count';
					$('BPC_speed_inform').innerHTML = 'Completed';
					$("BPC_speed_area").innerHTML = results_string;
				}
			}
		};
		for (cell = 0; cell < boards.length; cell++) {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", boards[cell]+'?'+((new Date()).getTime()), true);
			xhr.onreadystatechange = speedReadyStateChange;
			xhr.board_cell = cell;
			xhr.send(null);
			ajax_objects.push(xhr);
		}
	};

	var countBoardsPosts = function() {
		var cell = 0;
		var offset = 0;
		var results = [];
		var boards = buildBoardsArray();

		$("BPC_posts_inform").innerHTML = '0/' + boards.length + ' checked';

		ajax_objects = [];

		var postsReadyStateChange = function(){
			if(this.readyState == 4){
				if(this.status == 200 || this.status == 304) {
					results.push({
						'board': boards[this.board_cell],
						'posts': getBoardPosts(this.responseText)
					});
				} else {
					if (this.statusText === 'abort') {
						return;
					}
					console.log(this.statusText + ": " + this.status);
					console.log(this);
				}
				if ($("BPC_posts_start").innerHTML === 'Start count') {
					return;
				}
				offset++;
				$("BPC_posts_inform").innerHTML = offset + '/' + boards.length + ' checked';

				if (offset >= boards.length) {
					var results_string = "";

					results.sort(function (a, b) {
						if (isNaN(a.posts)) {
							return 1;
						} else if (isNaN(b.posts)) {
							return -1;
						} else {
							return b.posts - a.posts;
						}
					});

					for (var i = 0; i < results.length; i++) {
						var tmp = (isNaN(results[i].posts)) ? 'N/A' : results[i].posts;
						results_string += (+i + 1) + ") " + results[i].board + " - " + tmp + " posts\n";
					}

					$("BPC_posts_start").innerHTML = 'Start count';
					$("BPC_posts_inform").innerHTML = 'Completed';
					$("BPC_posts_area").innerHTML = results_string;
				}
			}
		}
		for (cell = 0; cell < boards.length; cell++) {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", boards[cell]+'?'+((new Date()).getTime()), true);
			xhr.onreadystatechange = postsReadyStateChange;
			xhr.board_cell = cell;
			xhr.send(null);
			ajax_objects.push(xhr);

		}
	};


	/* Initialising script */


	/*
	delete window.localStorage.BPC_mainBoards;
	delete window.localStorage.BPC_additinalBoards;
	*/

	if (window.localStorage.BPC_mainBoards == null) {
		window.localStorage.BPC_mainBoards = scanBoardsOnPage().join(' ');
	}
	if (window.localStorage.BPC_additinalBoards == null) {
		window.localStorage.BPC_additinalBoards = additinal_boards.join(' ');
	}


	var elem = document.createElement('div');
	elem.innerHTML = interface_html;
	document.body.appendChild(elem);


	$('BPC_boards_main_boards').value = window.localStorage.BPC_mainBoards.split(' ').join('\r\n');
	$('BPC_boards_additinal_boards').value = window.localStorage.BPC_additinalBoards.split(' ').join('\r\n');




	/* Buttons */
	$('BPC_speed_start').onclick = function () {
		if ($('BPC_speed_start').innerHTML === 'Stop') {
			$('BPC_speed_inform').innerHTML = 'Canceled';
			$('BPC_speed_start').innerHTML = 'Start count';
			for (var i = 0; i < ajax_objects.length; i++) {
				ajax_objects[i].abort();
			}
			ajax_objects = [];
			return;
		}

		$('BPC_speed_start').innerHTML = 'Stop';
		countBoardsSpeed();
	};

	$('BPC_posts_start').onclick = function () {
		if ($('BPC_posts_start').innerHTML === 'Stop') {
			$('BPC_posts_inform').innerHTML = 'Canceled';
			$('BPC_posts_start').innerHTML = 'Start count';
			for (var i = 0; i < ajax_objects.length; i++) {
				ajax_objects[i].abort();
			}
			ajax_objects = [];
			return;
		}

		$('BPC_posts_start').innerHTML = 'Stop';
		countBoardsPosts();
	};

	$('BPC_boards_rescan').onclick = function () {
		$('BPC_boards_main_boards').value = scanBoardsOnPage().join('\r\n');
		$('BPC_boards_save').focus();
	};

	$('BPC_boards_reset').onclick = function () {
		$('BPC_boards_additinal_boards').value = additinal_boards.join('\r\n');
		$('BPC_boards_save').focus();
	};

	$('BPC_boards_save').onclick = function () {
		var additinal_boards_tmp = $('BPC_boards_additinal_boards').value.replace(/\r/gi, '').replace(/\n{2,}/g, '\n').replace(/^\s+/, '').replace(/\s+$/, '');
		var main_boards_tmp = $('BPC_boards_main_boards').value.replace(/\r/gi, '').replace(/\n{2,}/g, '\n').replace(/^\s+/, '').replace(/\s+$/, '');

		var boards_tmp = main_boards_tmp + '\n' + additinal_boards_tmp;
		if (boards_tmp.search(/[^\w\/\n]+/m) !== -1) {
			alert('Error: unalowed symbols');
			return;
		}

		window.localStorage.BPC_additinalBoards = additinal_boards_tmp.split('\n').join(' ');
		window.localStorage.BPC_mainBoards = main_boards_tmp.split('\n').join(' ');
	};




	/* Area changes */
	$('BPC_boards_main_boards').onchange = function () {
		$('BPC_boards_save').focus();
	};

	$('BPC_boards_additinal_boards').onchange = function () {
		$('BPC_boards_save').focus();
	};



	/* Toggles */
	$('BPC_speed_toggle').onclick = function(){
		if ($('BPC_speed_start').innerHTML !== 'Stop' && $('BPC_posts_start').innerHTML !== 'Stop') {
			blockInsteed('BPC_speed');
		}
	};
	$('BPC_posts_toggle').onclick = function(){
		if ($('BPC_speed_start').innerHTML !== 'Stop' && $('BPC_posts_start').innerHTML !== 'Stop') {
			blockInsteed('BPC_posts');
		}
	};
	$('BPC_boards_toggle').onclick = function(){
		if ($('BPC_speed_start').innerHTML !== 'Stop' && $('BPC_posts_start').innerHTML !== 'Stop') {
			blockInsteed('BPC_boards');
		}
	};


	console.warn("Boards popularity counter started");
})();