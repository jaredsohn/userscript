// ==UserScript==
// @name           Real nickname
// @namespace      FriendFeed
// @include        http://friendfeed.com/*
// ==/UserScript==

window.ff_realNicknames_format = '<%login%>';
// Альтернативный формат вывода логинов: серым цветом в скобках.
// window.ff_realNicknames_format = '<%name%> <span style="color:grey;font-weight:normal;">(<%login%>)</span>';

function ff_realNicknames() {
	var elements = document.getElementsByClassName('l_profile');
	for (var i=0; i<elements.length; i++) {
		if (elements[i].childNodes[0].nodeName != 'IMG') {
			var href = elements[i].getAttribute('href');
			if (href) {
				var link;
				if (true && (!elements[i].nextSibling || elements[i].nextSibling.className != 'tell-to')) {
					var nick = href.replace('/', ''), name = elements[i].innerHTML;
					elements[i].innerHTML = window.ff_realNicknames_format.replace('<%login%>', nick).replace('<%name%>', name);
					link = unsafeWindow.document.createElement('a');
					link.href = '#';
					link.innerHTML = ' *';
					link.className = 'tell-to';
					if (elements[i].nextSibling) {
						elements[i].parentNode.insertBefore(link, elements[i].nextSibling);
					} else {
						elements[i].parentNode.appendChild(link);
					}
					elements[i].setAttribute('_ff_changed', 'true'); 
				} else {
					link = elements[i].nextSibling;
				}
				(function(n){
					try {
						link.onclick = function() {
							var elm = unsafeWindow.$('.commentform textarea')[0];
							elm && (elm.value += '@' + n + ': ') && elm.focus();
							return false;
						};
					} catch(e) {}
				})(nick);
			}
		}
	}
}
ff_realNicknames();
var tmpAjax = unsafeWindow.$.ajax;
unsafeWindow.$.ajax = function(object){ 
	var success = object.success;
	object.success = function() { success && success.apply(this, arguments); unsafeWindow.setTimeout(ff_realNicknames, 100); };
	tmpAjax.call(this, object);
};