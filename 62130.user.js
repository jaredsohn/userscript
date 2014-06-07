// ==UserScript==
// @name          Destroy The Internet!
// @description   Removes everything on the internet! Why? Because you want to tick someone off, or because you are a parent and think the interwebs are evil!
// @include       *
// @require http://sizzlemctwizzle.com/updater.php?id=62130
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
'* {' +
'  display:none !important;' +
'}');
alert('Oh man...you have been de-internet-ed.');{
	if(close)
	alert('You cannot get rid of me! D:<');{
		if(close)
		alert('You cannot get rid of me! D:<');
}