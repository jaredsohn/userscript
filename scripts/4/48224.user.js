// ==UserScript==
// @name                Nukezone What's Next Changer
// @namespace           Nukezone
// @description         Makes it easier on the eyes and we dont need help
// @include             http://www.nukezone.nu/game.asp?Action=Main*
// ==/UserScript==

addGlobalStyle('ul#quickLinks { text-transform: none; list-style-type: disc; font-size: 8pt; }' );
addGlobalStyle('ul#quickLinks li { padding: 0px; }' );

var bs = document.getElementsByTagName('b');
for (var i=0; i < bs.length; i++)
{
	var b = bs[i];
	if (b.innerHTML == "For help")
	{
		var li = b.parentNode.parentNode;
		li.parentNode.removeChild(li);
	}
}


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}