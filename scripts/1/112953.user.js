// ==UserScript==
// @name           Facebook - Selecionar Amigos
// @namespace      http://userscripts.org/scripts/show/112953
// @description    Seleciona facilmente mútiplos amigos para um evento
// @author         Ravan (facebook.com/rscafi)
// @version        0.01
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==

GM_addStyle('#select { color: #fff }');

function check() {
	if(/\/event.php\?/.test(window.location.href)) {
		if(active) {
			if(document.getElementsByClassName('pop_container_advanced').length) {
				appendButton();
			}
		}
	} else {
		active = true;
	}
}

var dispatchMouseEvent = function(target, var_args) {
	var e = document.createEvent("MouseEvents");
	e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
	target.dispatchEvent(e);
};

function selectFriends() {
	var a = document.getElementsByClassName('checkableListItem');
	for(i = 0, l = a.length; i < l; i++) {
		if(!/\bdisabledCheckable\b/.test(a[i].className)) {
			if(a[i].click) {
				a[i].click();
			} else {
				dispatchMouseEvent(a[i], 'click', true, true);
			}
		
		}
	}
}

function appendButton() {
	var btnstr = ' (<a href="#" id="select">Selecionar Todos</a>)'
	var a = document.getElementsByClassName('dialog_title')[0];
	a.firstChild.innerHTML += btnstr;
	
	var btn = document.getElementById('select');
	btn.addEventListener('click',selectFriends,false);
	active = false;	
}

var active = true;
var interval = setInterval(check, 1000);