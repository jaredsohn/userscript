// ==UserScript==
// @name           BBC IPlayer Send to XBMC
// @namespace      http://userscripts.org/users/218421
// @include        http://www.bbc.co.uk/iplayer/episode/*
// ==/UserScript==

GM_registerMenuCommand("Change XBMC Host for IPlayer",set_xbmc_host);
if (GM_getValue("XBMC_HOST")==undefined) {
		set_xbmc_host;
}

function hasClass(ele,cls) {
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele,cls) {
	if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}

function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
    	var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}

getpid = function(){
	return pid = document.location.toString().split('/')[5];
}

play = function(e){
	e.preventDefault();
	var xbmc_host = GM_getValue("XBMC_HOST");
	var i = new Image();
	i.src = 'http://'+xbmc_host+'/xbmcCmds/xbmcHttp?command=PlayFile(plugin://video/IPlayer/?pid='+getpid()+')';
}

init = function(){
	var tools = document.getElementById('episodeTools');

	var list = tools.getElementsByTagName('ul')[0];
        removeClass(list,'no-badge');

	var a = document.createElement('a');
	a.setAttribute('href','#');
	a.addEventListener('click', play, false);
	var p = document.createElement('p');
        p.setAttribute('class','hd-link');	
	p.appendChild(a);
        
        a.style.backgroundImage = "url('data:image/png;base64,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')";

	tools.appendChild(p);
}

setTimeout(init,2000);

function set_xbmc_host() {
	GM_setValue("XBMC_HOST",window.prompt("Enter your XBMC IP address", "192.168.0."));
}