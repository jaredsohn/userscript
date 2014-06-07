// ==UserScript==
// @name           LeetCode Progress Reminder
// @namespace      http://leetcode.com/onlinejudge/prog
// @author         ashi009
// @include        http://leetcode.com/onlinejudge*
// ==/UserScript==

function checkListener(evt) {
	localStorage[evt.target.name] = evt.target.checked;
}
[].forEach.call(document.querySelectorAll('#problemset .question-title'), function(title) {
	var checkBox = document.createElement('input');
	checkBox.type = 'checkbox';
	checkBox.name = title.id;
	checkBox.checked = localStorage[title.id];
	checkBox.addEventListener('change', checkListener, false);
	title.insertBefore(checkBox, title.firstChild);
});
