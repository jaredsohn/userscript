// ==UserScript==
// @name           VKontakte resizeable textarea
// @namespace      VK
// @description    Resize textarea to fit user typing
// @include        http://vkontakte.ru/mail.php?*
// @include        http://vk.com/mail.php?*
// ==/UserScript==

function FitToContent(id, div, maxHeight, minHeight) {
	div.innerHTML = id.value.escapeHTML().replace(/\n/g, '<br>') + "<br>&nbsp;";
	var newHeight = div.offsetHeight;
	var curHeight = parseInt(id.style.height);
	if ((newHeight > curHeight && newHeight <= maxHeight) ||
		(newHeight < curHeight && newHeight >= minHeight)) {
		id.style.height = newHeight + "px";
	} else if (newHeight < minHeight) {
		id.style.height = minHeight + "px";
	}
}

function $(id) {
	return document.getElementById(id);
}

String.prototype.escapeHTML = function() {
	return (this.replace(/&/g, '&amp;')
				.replace(/>/g, '&gt;')
				.replace(/</g, '&lt;')
				.replace(/"/g, '&quot;'));
};

var field = 'reply_field';
var div = document.createElement('div');
var styles = document.defaultView.getComputedStyle($(field), '');
var params = [ 'width', 'margin', 'padding', 'fontSize', 'fontFamily', 'border' ];
for (x in params)
	div.style[params[x]] = styles[params[x]];
div.style.visibility = 'hidden';
document.body.appendChild(div);

$(field).addEventListener('keyup', function() {
	FitToContent(this, div, 500, 100)
}, false);