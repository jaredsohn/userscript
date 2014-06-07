// ==UserScript==
// @name           FT Unread posts
// @namespace      DScript
// @description    Quick navigation link mockup to unread forum posts
// @include        http://nyheter24.se/filmtipset/forum/forum.cgi*thread=*
// ==/UserScript==

function cOffset(element) {
    // stolen from prototype.js
    var t = 0, l = 0;
    do {
      t += element.offsetTop  || 0;
      l += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);

    var result = [l, t];
    result.left = l;
    result.top = t;
    return result;
}

function safe(o) { return o.wrappedJSObject || o; }

function getTopButton() {
	return document.getElementById('ft-unread-topbutton');
}

function hideTopButton() {
	var btn = getTopButton();
	if(btn) btn.style.display = 'none';
}

function showTopButton() {
	var a = getTopButton();

	if(!a) {
		a = document.createElement('a');
		a.style.display = 'block';
		a.style.padding = '10px';
		a.style.backgroundColor = 'white';
		a.style.border = '4px solid #5F7655';
		a.style.position = 'fixed';
		a.style.MozBorderRadiusBottomleft = '14px';
		a.style.MozBorderRadiusBottomright = '14px';
		a.style.MozBoxShadow = '0px 0px 5px #000';
		a.style.borderTop = '0';
		a.style.top = '0';
		a.style.textAlign = 'center';
		a.style.paddingTop = '3px';
		a.id = 'ft-unread-topbutton';
		a.href = 'javascript:void(0);';
		a.innerHTML = '&#9650;<br/>Nya inlägg';
		a.style.left = '375px';

		document.body.appendChild(a);		
		a.addEventListener('click', function() { findAboveSelf(newposts, true); }, false);
	}

	a.style.display = 'block';
}

function getBottomButton() {
	return document.getElementById('ft-unread-bottombutton');
}

function hideBottomButton() {
	var btn = getBottomButton();
	if(btn) btn.style.display = 'none';
}

function showBottomButton() {
	var a = getBottomButton();

	if(!a) {
		a = document.createElement('a');
		a.style.display = 'block';
		a.style.padding = '10px';
		a.style.backgroundColor = 'white';
		a.style.border = '4px solid #5F7655';
		a.style.position = 'fixed';
		a.style.MozBorderRadiusTopleft = '14px';
		a.style.MozBorderRadiusTopright = '14px';
		a.style.borderBottom = '0';
		a.style.bottom = '0';
		a.style.textAlign = 'center';
		a.style.paddingBottom = '3px';
		a.style.MozBoxShadow = '0px 0px 5px #000';
		a.id = 'ft-unread-bottombutton';
		a.href = 'javascript:void(0);';
		a.innerHTML = 'Nya inlägg<br/>&#9660;';
		a.style.left = '375px';

		document.body.appendChild(a);		
		a.addEventListener('click', function() {  findBelowSelf(newposts, true); }, false);
	}

	a.style.display = 'block';
}

function findAboveSelf(items, navigate) {
	for(var i = 0; i < items.length; i++) {
		var item = safe(items[i]);
		var offset = cOffset(item);
		if(offset.top < html.scrollTop) {
			showTopButton();

			if(navigate)
				item.scrollIntoView(true);

			return;
		}
	}

	hideTopButton();
}

function findBelowSelf(items, navigate) {
	for(var i = 0; i < items.length; i++) {
		var item = safe(items[i]);
		var offset = cOffset(item);
		if(offset.top > html.scrollTop + html.clientHeight) {
			showBottomButton();

			if(navigate)
				item.scrollIntoView(true);

			return;
		}
	}

	hideBottomButton();
}

var newposts = document.getElementsByClassName('headnew');
var html = safe(document.getElementsByTagName('html')[0]);

function check() {

	findAboveSelf(newposts, false);
	findBelowSelf(newposts, false);
}

check();
window.addEventListener('scroll', check, false);