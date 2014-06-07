// ==UserScript==
// @name           Facebook - Delete All Messages By: azzalife
// @namespace      http://userscripts.org/scripts/show/112793
// @description    Delete all facebook msg's at ones!
// @author         Azzalife dnd
// @version        1.0
// @homepage       http://www.f-aq.info/facebook-delete-all-messages-at-ones/
// @include        http*://www.facebook.com/messages*
// ==/UserScript==

/*
	BUGS:
	- Delete only visible msg's
*/

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