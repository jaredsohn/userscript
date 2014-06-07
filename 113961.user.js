// ==UserScript==
// @name            Hide Facebook Sidebar
// @description     Hides the sidebar
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// @include http://apps.facebook.com/inthemafia/*
// @include http://facebook.mafiawars*/mwfb/remote/html_server.php*
// @include http://www.facebook.com/plugins/serverfbml.php*
// @include https://apps.facebook.com/inthemafia/*
// @include https://facebook.mafiawars*/mwfb/remote/html_server.php*
// @include https://www.facebook.com/plugins/serverfbml.php*
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

addGlobalStyle(".uiStreamBoulderStyle .uiUfi{width:90%;}");	

function blub()
{
	
	contentcol=document.getElementById("contentCol");
	if(contentcol.className!="noRightCol")
	{
		document.getElementById("rightCol").innerHTML="";
		contentcol.className="noRightCol";
		
	}
}
document.addEventListener("DOMNodeInserted", blub, true);

javascript:(function(){
$('#LoadingBackground').hide();
$('#LoadingOverlay').hide();
$('#LoadingRefresh').hide();