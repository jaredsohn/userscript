// ==UserScript==
// @name           kaixin001::truth
// @namespace      xilou.us
// @include        http://www.kaixin001.com/!truth/*
// ==/UserScript==


// auto select the text area to make the user input directly
var btn = document.getElementById('btn_fb2');
if (btn != null) {
	btn.addEventListener('click', function() {
		var ta = document.getElementById('truth');
		if (ta != null) {
			ta.focus();
		}
	}, false);
}

// auto check for shared to all
var inputs = document.getElementsByTagName('input');
for (var i = 0; i < inputs.length; i ++) {
	var input = inputs[i];
	if (input.name == 'privacy' && input.value == '0') {
		input.checked = true;
	}
}

// shared to all friends which has already answered this question
var f = document.getElementById('form1');
if (f != null) {
	try {
		f.addEventListener('submit', function() {
			frame = document.getElementById('iframe_parent');
			if (frame != null) {
				frame.addEventListener('load', function() {
					var inputs = frame.contentDocument.getElementsByTagName('input');
					for (var i = 0; i < inputs.length; i ++) {
						var input = inputs[i];
						if (input.name == 'notify_uids') {
							input.checked = true;
						}
					}
				}, false);
			}
		}, false);
	} catch (e) {
	}
}



// create links for the hot questions
if (document.location.href == 'http://www.kaixin001.com/!truth/recommend.php') {
	var ptn = /^javascript:answer\("(.*)"\)/;
	var as = document.getElementsByTagName('a');
	for (var i = 0; i < as.length; i ++) {
		var a = as[i];
		var href = a.href;
		var result = href.match(ptn);
		if (result != null) {
			var question = result[1];
			question = question.replace(/\\"/g, '"');
			question = question.replace(/=/g, '%3D');
			question = question.replace(/\+/g, '%2B');
			question = question.replace(/\?/g, '%3F');
			question = question.replace(/&/g, '%26');
			a.href = '/!truth/index.php?topic=' + question;
		}
	}
}



