//opera:config#UserPrefs|UserJavaScriptonHTTPS
// ==UserScript==
// @name           vk.save_pics
// @description    adds photos to your 'Saved photos' album
// @run-at         document-end
// @include        http://vk.com/*
// @include        https://vk.com/*
// @version        4
// @author         kourb
// @encoding       utf-8
// ==/UserScript==

$photos   = 48;
$alert    =  0;

VERSION = '4';
AUTHOR  = 'kourb';

$ = function(q) {
	return document.getElementById(q);
}

w = window.location;

function initialize() {
	if(!$('pv_photo')) {
	} else if(!$('s_html')) {
		$('pv_date').innerHTML += ' | <a id=s_html onclick="save_show()">Save mode</a>';
	}
}

if(w.search == '?i') { $s = 1; }
$init = setInterval(initialize, 800);

function save_show() {
	clearInterval($init);
	if(typeof $s == 'undefined' && ((w.pathname.indexOf('photo')==1) || (w.pathname.indexOf('album')==1) || (w.pathname.indexOf('tag')==1)) && confirm('save in the same order')) {
		alert('click on the first image after reload');
		Photoview.hide(0);
		setTimeout(
			function() {
				w.replace(w.protocol + '//' + w.host + w.pathname + '?i');
			},
			700
		);
	} else {
		$i       = 0;
		$j       = 0;
		$k       = 0;
		$photo   = cur.pvIndex;
		$html    = new Array();
		$html[0] = '<button id=k1 onclick="start()">Save pictures</button>';
		$html[1] = '<button id=k2 onclick="interrupt(true)"><h1>Interrupt</h1></button>';
		$html[2] = '<button onclick="alert(\'Version: ' + VERSION + ';   Author: '+ AUTHOR + '\')">Info</button>';
		s_replace();
		$('k2').style['display'] = 'none';
	}
}

function s_replace() {
	$('pv_desc').style['display']      = 'none';
	$('pv_place').style['display']     = 'none';
	$('pv_tags').style['display']      = 'none';
	$('pv_like_wrap').style['display'] = 'none';
	$('pv_date_wrap').innerHTML = $html[0] + ' | ' + $html[1] + ' | ' + $html[2];
}

function start() {
	$interval = setInterval(save_all, 1001);
}

function interrupt($alert) {
	clearInterval($interval);
	if($alert == true) {
		alert('photos saved total: ' + $i + '\n' +
					'photos saved      : ' + $j + '\n' +
					'photos skipped    : ' + $k);
	} else {
		$('k1').style['display'] = 'inline';
	}
	$j = 0;
	$('k2').style['display'] = 'none';
}

function interrupt_last() {
	interrupt(true);
	$('k1').style['display'] = 'none';
	$('k2').style['display'] = 'none';
}

function save_all() {
	if($j == $photos) {
		interrupt(false);
		if($alert != 0) {
			alert('wait for 10 seconds, please');
		}
		setTimeout(start, 10000);
	} else {
		if((cur.pvIndex != $photo) || ($i == 0)) {
			if(Photoview.savePhoto() == undefined) {
				if(Photoview.show(false, cur.pvIndex+1, event) == false) {
				} else {
					for($step=2; $step<100; $step++) {
						if(Photoview.show(false, cur.pvIndex+$step, event) == false) {
							break;
						}
					}
					$k = $step - 1;
				}
				setTimeout(
					function () {
						s_replace();
						$('k1').style['display'] = 'none';
						$i++;
						$j++;
					},
					100
				);
			}
		} else {
			interrupt_last();
		}
	}
}