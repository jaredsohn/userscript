// ==UserScript==
// @name        anthony testing tui tools
// @description   testing
// @include      http://*.tuitui8.com/*
// @version      v1
// ==/UserScript==


function addGlobalStyle(css)
{
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) return;

	style = document.createElement('link');

	style.type = 'text/css';
	style.rel = 'stylesheet';
	style.href = css;
	head.appendChild(style);
}

function addInlineJavascript(content)
{
	var head, script;
	head = document.getElementsByTagName('head')[0];
	if (!head) return;

	script = document.createElement('script');
    script.innerHTML = content.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
	head.appendChild(script);
}

function addJavascript(src)
{
	var head, script;
	head = document.getElementsByTagName('head')[0];
	if (!head) return;

	script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = src;
	head.appendChild(script);
}

function init() {

alert ("init()");
    
//taBuy();

removeAds();
    
        window.setTimeout("init()", 3000);
        return;

}

function taBuy() {
    alert("taBuy()");
    
    
}

function removeAds() {
    alert($('kl_topbg'));
}



addInlineJavascript(addJavascript);
addInlineJavascript(taBuy);
addInlineJavascript(removeAds);
addInlineJavascript(init);
init();