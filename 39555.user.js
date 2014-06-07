// ==UserScript==
// @name           Tweezr - Tweet Squeezr
// @namespace      martin ruiz
// @description    Automatically Squeezes tweet into less characters as you type using TweetShrink.com
// @include        http://twitter.com/*
// @include        http://*.twitter.com
// ==/UserScript==

window.addEventListener('load',function() {
const url = "http://tweetshrink.com/shrink?text=";//one wonders why
const SPACE = 32;

var status = document.getElementById('status');
var chars = document.getElementById('status-field-char-counter');

if (!status || !chars) { return; }

status.addEventListener('keyup',function(e) {
	if (e.keyCode!=SPACE) return;
	translate(status.value, function(t) {
		if (t.difference>0) {
			var re = RegExp('^'+t.original_text);
			status.value = status.value.replace(re,t.text)
			chars.textContent = 140 - status.value.length;
		}
	});
},false);

function translate(phrase,callback) {
	var rurl = url + encodeURIComponent(phrase);
	GM_xmlhttpRequest({
		method: 'GET',
		url: rurl,
		headers: {"Content-Type": "application/atom+xml"},
		data: "",
		onload: function(detail){
			if (detail.status==200 || detail.status==201){
				GM_log(detail.responseText);
				var translation = eval('('+detail.responseText+')');
				return callback(translation)
			}else{
				GM_log("error: "+detail.responseText);
				return null;
			}
		},
		onerror: function(detail){
				GM_log("error2: "+detail.responseText);
				return null;
		}
	});
}

},false);