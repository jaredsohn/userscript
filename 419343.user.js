// ==UserScript==
// @name			Linkbuks Proxy Unblock And Skip
// @namespace		linkbuksunblockandskip
// @author			Oshada
// @version			2014.04.01
// @updateURL		http://userscripts.org/scripts/source/419343.user.js
// @downloadURL 	http://userscripts.org/scripts/source/419343.user.js
// @homepage   	 	https://userscripts.org/scripts/show/419343
// @description		[EN] Unblock linkbuks links with anonymouse proxy, skip multiple wait pages in single link and skip waiting for linkbuks.com,ultrafiles.net,allanalpass.com,adf.ly,etc....
// @match			http://linkbucks.com/*
// @match			http://www.linkbucks.com/*
// @match			*linkbucks.com/*
// @match			*.linkbucks.com/
// @match			http://*.linkbucks.com/
// @match			http://www.*.linkbucks.com/
// @match			http://www.ultrafiles.net/*
// @match			*.ultrafiles.net/*
// @match			http://ultrafiles.net/*
// @match			*ultrafiles.net/
// @match			http://www.*.ultrafiles.net/
// @match			http://www.ultrafiles.net/*
// @match			http://*.allanalpass.com/*
// @match			http://adf.ly/*
// @match			http://anonymouse.org/cgi-bin/anon-www.cgi/http://www.linkbucks.com/*
// @match			http://anonymouse.org/cgi-bin/anon-www.cgi/http://www.linkbucks.com/*/
// @match			http://anonymouse.org/cgi-bin/anon-www.cgi/http://linkbucks.com/*
// @match			http://anonymouse.org/cgi-bin/anon-www.cgi/http://*.linkbucks.com/
// @match			http://anonymouse.org/cgi-bin/anon-www.cgi/http://www.*.linkbucks.com/
// @match			http://sh.st/*
// @match			http://bc.vc/*
// @match			http://www.urlbeat.net/*
// @match			*.urlbeat.net/*
// @match			http://urlbeat.net/*
// @match			*urlbeat.net/
// @match			http://www.*.urlbeat.net/
// @match			http://www.urlbeat.net/*
// @match			http://www.dyo.gs/*
// @match			http://www.theseblogs.com/*
// @match			https://reducelnk.com/*
// @run-at			document-start
// ==/UserScript==

(function() {
      unsafeWindow.onbeforeunload = null;

      unsafeWindow.onunload = null;

      //unsafeWindow.alert = null;

      //unsafeWindow.confirm = null;

      //unsafeWindow.prompt = null;

      //unsafeWindow.open = null;  
})();


var flag=false;
var href=null;
var url=null;
var element = false;
url = window.location.href;//.toLowerCase();
var proxy =   ['http://anonymouse.org/cgi-bin/anon-www.cgi/'];
href = proxy + url;
var link = null;

if (url.indexOf('/http://')!=-1 && url.indexOf('anonymouse.org')==-1) {
	link = url.split("/http://");
	url=link[1];
	href = 'http://' + url;
	window.location.replace(href);
}
if (url.indexOf('/https://')!=-1 && url.indexOf('anonymouse.org')==-1) {
	link = url.split("/https://");
	url=link[1];
	href = 'https://' + url;
	window.location.replace(href);
}

if (url.indexOf('ultrafiles.net')!=-1 && url.indexOf('anonymouse.org')==-1  ) {
	url = url.replace("ultrafiles.net","linkbucks.com");
	href = proxy + url;
	window.location.replace(url);
}
if (url.indexOf('dyo.gs')!=-1) {
	url = url.replace("dyo.gs","linkbucks.com");
	href = proxy + url;
	window.location.replace(url);
}
if (url.indexOf('theseblogs.com')!=-1) {
	url = url.replace("theseblogs.com","linkbucks.com");
	href = proxy + url;
	window.location.replace(url);
}
if (url.indexOf('urlbeat.net')!=-1 && url.indexOf('anonymouse.org')==-1  ) {
	if (url.indexOf('/verify/url/')!=-1 ) {
		url = url.replace("/verify/url/","");
	}
	url = url.replace("urlbeat.net","linkbucks.com");
	href = proxy + url;
	window.location.replace(url);
}
if (url.indexOf('adf.ly')!=-1 && url.indexOf('ad/locked?url=')!=-1) {
	url = url.replace("ad/locked?url=","");
	url = url.replace("&t=s","");
	window.location.replace(url);
}

if (url.indexOf('linkbucks.com')!=-1 && url.indexOf('anonymouse.org')==-1  ) {
	if (url.indexOf('http://')!=-1 ) {
		url = url.replace("http://","");
	}
	if (url.indexOf('/verify/url/')!=-1 ){
		url = url.replace("/verify/url/","");
	}
	
	href = proxy + 'http://' + url;
	window.location.replace(href);
}
if (url.indexOf('linkbucks.com')!=-1 && url.indexOf('anonymouse.org')!=-1) {
	if (url.indexOf('.linkbucks.com/')!=-1 && url.indexOf('//www.')==-1 ){
		url = url.replace("http://anonymouse.org/cgi-bin/anon-www.cgi/http://","");
		url = url.replace(".linkbucks.com/","");
		href = proxy + 'http://www.linkbucks.com/' + url;
		window.location.replace(href);
	}
    element = document.getElementById('skiplink');
} 
if (url.indexOf('allanalpass.com')!=-1) {
    if (url.indexOf('verify/')!=-1) window.location.href = window.location.href.replace('verify/','');
    element = document.getElementById('skiplink');
} 
if (url.indexOf('adf.ly')!=-1 ) {
    document.getElementById('sitebar').style.display = 'none';
    document.getElementById('Interstitual').style.height = '0px';
    element = document.getElementById('skip_button');
} 	
if (url.indexOf('reducelnk.com')!=-1 ) {
    element = document.getElementById('urlholder');
	window.location.replace(element.value);
} 
if (url.indexOf('sh.st')!=-1) {
    document.getElementById('intermediate-ad').style.display = 'none';
	document.getElementById('sandbox_iframe').style.display = 'none';
	element = document.getElementById('skip_button');
	flag=false;
}

if (element) {
    var div = document.createElement('div');
    div.innerHTML = '<div style="position:absolute;top:0px;top:0px;width:100%;height:100%;background:#fff;z-index:10000000000"><div style="margin:10% auto;width:100%;padding:10px;background:#F8EDF6;border:#3981AB 3px solid;-moz-border-radius:10px;-webkit-border-radius:10px;border-radius:10px;text-align:center;font-size:26px;font-family:Arial;font-weight:bold;color:#3981AB">Please wait...<div id="counterhack" style="font-size:38px;color:#000">0</div></div></div>';
    document.body.appendChild(div);
    var count = 0;
    if (typeof(element) != 'undefined' && element != null) {
        setInterval(function(){
			count++; document.getElementById('counterhack').innerHTML = count;
			if (url.indexOf('sh.st')==-1 || flag==true) {
            	if (element.href.length && element.href.toLowerCase()!=url) {
                	document.body.innerHTML = '';
                	if (element.href.indexOf(window.location) != -1) element.click();
                	else window.location = element.href;
            	}
			}
			if (url.indexOf('http://anonymouse.org/cgi-bin/anon-www.cgi/http://')!=-1) {
				if (url.indexOf('linkbucks.com')!=-1) {
					element = document.getElementById('skiplink');
				}
			}
			if (url.indexOf('adf.ly')!=-1) {
					element = document.getElementById('skip_button');
			}
			if (url.indexOf('sh.st')!=-1 && count > 10) {
					element = document.getElementById('skip_button');
					flag=true;
			}
			
        },1000);
		
    }
}