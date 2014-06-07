// ==UserScript==
// @name          Bangumi Progress System Enhancement
// @description   本脚本可将Bangumi首页『我的收视进度』栏目分为上下两栏，并将指定的番组置顶。
// @version       0.1
// @include       http://bangumi.tv/
// @include       http://bgm.tv/
// @include       http://chii.in/
// ==/UserScript==

// 在此处定义新番名称
var new_bangumi = new Array(
'フラクタル',
'魔法少女まどか☆マギカ',
'GOSICK -ゴシック-',
'とある魔術の禁書目録Ⅱ',
'君に届け 2ND SEASON',
'放浪息子',
'レベルE',
'ドラゴンクライシス！',
'みつどもえ 増量中!',
'お兄ちゃんのことなんかぜんぜん好きじゃないんだからねっ!!'
);

var idBadger = document.getElementById('idBadger');
var idBadger_As = document.getElementsByTagName('a');
var loggedin = false;
for (var i = 0; i < idBadger_As.length; i++) {
	if (idBadger_As[i].innerHTML == '[登出]') {
		loggedin = true;
	}
}
if (loggedin) my_new_bangumi();

function get_firstchild (n) {
	//check if the first node is an element node
	x = n.firstChild;
	while (x.nodeType != 1) {
		x = x.nextSibling;
	}
	return x;
}

function in_array (needle, haystack, argStrict) {
	// http://kevin.vanzonneveld.net
	// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +   improved by: vlado houba
	// +   input by: Billy
	// +   bugfixed by: Brett Zamir (http://brett-zamir.me)
	// *     example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);
	// *     returns 1: true
	// *     example 2: in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'});
	// *     returns 2: false
	// *     example 3: in_array(1, ['1', '2', '3']);
	// *     returns 3: true
	// *     example 3: in_array(1, ['1', '2', '3'], false);
	// *     returns 3: true
	// *     example 4: in_array(1, ['1', '2', '3'], true);
	// *     returns 4: false
	
	var key = '', strict = !!argStrict;
	
	if (strict) {
		for (key in haystack) {
			if (haystack[key] === needle) {
				return true;
			}
		}
	} else {
		for (key in haystack) {
			if (haystack[key] == needle) {
				return true;
			}
		}
	}
	
	return false;
}

function my_new_bangumi() {
	var j = 0, k = 0, my_new_bgms = new Array(), my_old_bgms = new Array();
	var my_bgm_prgs = document.getElementById('my_bgm_prg');

	for (var i = 0; i < my_bgm_prgs.childNodes.length; i++) {
		thisprg = my_bgm_prgs.childNodes[i];
		if (thisprg.nodeType == 1) {
			var thisprgtitle = get_firstchild(thisprg).title;
			if (in_array(thisprgtitle, new_bangumi)) {
				my_new_bgms[j] = document.createElement('li');
				my_new_bgms[j].innerHTML = thisprg.innerHTML;
				j++;
			} else {
				my_old_bgms[k] = document.createElement('li');
				my_old_bgms[k].innerHTML = thisprg.innerHTML;
				k++;
			}
		}
	}
	
	while (my_bgm_prgs.hasChildNodes()) {
		my_bgm_prgs.removeChild(my_bgm_prgs.lastChild);
	}
	
	for (var i = 0; i < j; i++) {
		if (i % 2 == 0) {
			my_new_bgms[i].className = 'prg odd';
			my_new_bgms[i].innerHTML = my_new_bgms[i].innerHTML.replace("prg_even", "prg_odd")
		} else {
			my_new_bgms[i].className = 'prg even';
			my_new_bgms[i].innerHTML = my_new_bgms[i].innerHTML.replace("prg_odd", "prg_even")
		}
		my_bgm_prgs.appendChild(my_new_bgms[i]);
	}
	
	if (j > 0 && k > 0) {
		var clear = document.createElement('div');
		clear.className = 'clear';
		my_bgm_prgs.appendChild(clear);
		var section_line = document.createElement('div');
		section_line.className = 'section_line';
		my_bgm_prgs.appendChild(section_line);
	}
	
	for (var i = 0; i < k; i++) {
		if (i % 2 == 0) {
			my_old_bgms[i].className = 'prg odd';
			my_old_bgms[i].innerHTML = my_old_bgms[i].innerHTML.replace("prg_even", "prg_odd")
		} else {
			my_old_bgms[i].className = 'prg even';
			my_old_bgms[i].innerHTML = my_old_bgms[i].innerHTML.replace("prg_odd", "prg_even")
		}
		my_bgm_prgs.appendChild(my_old_bgms[i]);
	}
}