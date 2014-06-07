// ==UserScript==
// @name           vk.bookmarks
// @description    prints a list of boorkmarked clubs and people
// @run-at         document-end
// @include        http://vk.com/fave*
// @include        https://vk.com/fave*
// @version        1
// @author         kourb
// @encoding       utf-8
// ==/UserScript==

VERSION = '1';
AUTHOR  = 'kourb';

$ = function(q) {
	return document.getElementById(q);
}

w = window.location;

function initialize() {
	if(w.pathname != '/fave') {
		clearInterval($init);
	} else if(!$('b_save')) {
		if(w.search == '?section=users') {
			if(typeof $k != 'undefined') {
				$('head_communities').style['display'] = 'block';
				$('head_people').style['display'] = 'block';
			} else {
				html('people');
			}
		} else if(w.search == '?section=links') {
			if(typeof $k != 'undefined') {
				$('head_communities').style['display'] = 'block';
				$('head_people').style['display'] = 'block';
			} else {
				html('clubs');
			}
		} else if(typeof $s != 'undefined') {
			$('head_communities').style['display'] = 'none';
			$('head_people').style['display'] = 'none';
			$k = 1;
		}
	}
}

$init = setInterval(initialize, 800);

function html($q) {
	$('head_communities').innerHTML = '<div style="padding: 0 10px 15px" onclick="alert(\'Version: ' + VERSION + ';   Author: '+ AUTHOR + '\')">Author</div>';
	$('head_communities').href = '';
	$('head_people').innerHTML = '<div style="padding: 0 15px 15px" onclick=save_' + $q + '()>Save</div>';
	$('head_people').href = '';
	$s = 1;
}

function save_clubs() {
	$a = document.querySelectorAll('[id^="link2_'+vk.id+'_"]');
	$b = '';
	for($i=0; $i<$a.length; $i++) {
		$b += 'http://vk.com/club' + $a[$i].id.substr($a[$i].id.lastIndexOf('_')+1) + '\n';
	}
	alert($b);
}

function save_people($all) {
	$b = '';
	if($all == true) {
		$a = document.querySelectorAll('#users_content [id^="fave_user_div"]');
		for($i=0; $i<$a.length; $i++) {
			$b += 'http://vk.com/id' + $a[$i].id.substr($a[$i].id.lastIndexOf('div')+3) + '\n';
		}
	} else {
		$a = document.querySelectorAll('#users_online_content [id^="fave_user_div"]');
		for($i=0; $i<$a.length; $i++) {
			$b += 'http://vk.com/id' + $a[$i].id.substr($a[$i].id.lastIndexOf('onl')+3) + '\n';
		}
	}
	alert($b);
}