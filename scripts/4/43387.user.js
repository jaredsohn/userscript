// ==UserScript==
// @name           Quake Live Queue Timer
// @version        1.0.0
// @namespace      http://userscripts.org/users/38506
// @include        http://www.quakelive.com/queue.php
// ==/UserScript==

(function() {

var q_pos_parent = document.getElementById('q_pos').parentNode;
q_pos_parent.innerHTML = '<p style="position: absolute; ' +
	'color: rgb(255, 255, 128); font-family: Arial; ' +
	'font-style: italic; font-size: 22px; left: 150px; ' +
	'top: 66px;" id="q_timer">?m:??s</p>' + q_pos_parent.innerHTML;


var last_position, last_time;

function check_queue_position() {
	var new_time = new Date().getTime() / 1000;
	var q_pos;
	if ( q_pos = document.getElementById('q_pos') ) {
		var matches;
		if ( matches = q_pos.innerHTML.match(/Position\ in\ queue:\ (-?\d+)/) ) {
			var new_position = matches[1];
		}
	}
	if ( new_position ) {
		if ( last_position && last_time ) {
			if ( last_position != new_position ) {
				var seconds_per_position = (new_time - last_time)/(last_position - new_position);
				var time_left = seconds_per_position * new_position;
				var minutes_left = Math.floor(time_left / 60);
				var seconds_left = Math.floor(time_left % 60);
				var q_timer = document.getElementById('q_timer');
				q_timer.innerHTML = minutes_left + 'm:' + seconds_left + 's';
			}
		}
		if ( !last_time || last_position != new_position ) {
			last_position = new_position;
			last_time = new_time;
		}
	}
}

check_queue_position();
var q_pos = document.getElementById('q_pos');
q_pos.addEventListener("DOMSubtreeModified", check_queue_position, true);

})();
