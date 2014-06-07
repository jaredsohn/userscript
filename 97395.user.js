// ==UserScript==
// @name          Outlook redirect to the right site
// @include       http://www.southampton.ac.uk/isolutions/*
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
function msgBox()
{
	var msgbox = document.createElement("div");
	msgbox.setAttribute('id' , 'msgbox'); 
	msgbox.innerHTML = 'Redirecting...';
	msgbox.style.display = "block";
	document.getElementsByTagName("body").item(0).appendChild(msgbox);
}
style = " #msgbox { position: absolute; left: 50%; top: 40%; margin-left: -115px; width: 230px; height: 25px; padding: 12px; text-align: center; color: white; display: none; background-color: gray; } "

wrongLocation = 'http://www.southampton.ac.uk/isolutions/computing/email/outlook/owaunavailable.html';
if (window.location.href == wrongLocation){
	addGlobalStyle(style);
	msgBox();
	window.location = "http://www.outlook.soton.ac.uk/";
}
