// ==UserScript==
// @name           Filter recent contests for the Nankai OJ
// @namespace      https://sites.google.com/site/boyouepii/
// @description    Filter exams, local department contests, etc.
// @license        http://creativecommons.org/publicdomain/zero/1.0/
// @copyright      Bo You
// @version        1.0
// @include        http://acm.nankai.edu.cn/recent_contests.php
// ==/UserScript==


///////////////////////////////////////////////////////////////////////
//
// The following part is executed in content page scope
//

function filter_contest() {
	var match = function(name, pattern) {
		return name.toLowerCase().indexOf(pattern.toLowerCase()) != -1;
	};
	var is_filtered = function(name, patterns, match) {
		for (var i = 0; i < patterns.length; ++i) {
			if (match(name, patterns[i])) {
				return true;
			}
		}
		return false;
	};
	var filter_oj_pattern = [
		'hrbeu'
	];
	var filter_name_pattern = [
		'学院', '考试', '考', '模拟', '上机', '实验', '练习'
	];
	var contest_table = document.getElementById('contest_body').children[0];
	var filters = new Array();
	var cnt = 0;
	for (var i = 1; i < contest_table.children.length; ++i) {
		var filtered = false;
		var contest_oj = contest_table.children[i].children[0].innerHTML;
		filtered = filtered || is_filtered(contest_oj, filter_oj_pattern, match);
		var contest_name = contest_table.children[i].children[1].children[0].innerHTML;
		filtered = filtered || is_filtered(contest_name, filter_name_pattern, match);
		if (filtered) {
			filters[cnt++] = contest_table.children[i];
		}
	}
	for (var i = 0; i < cnt; ++i) {
		contest_table.removeChild(filters[i]);
	}
}

///////////////////////////////////////////////////////////////////////
//
// The following part is executed in userjs scope.
//

script = document.createElement('script');
script.setAttribute("type", "application/javascript");
script.textContent = '$(document).ready(' + filter_contest + ');';

document.body.appendChild(script);
document.body.removeChild(script);
