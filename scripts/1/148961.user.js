// ==UserScript==
// @name           Youtube auto unblocker (using a proxy list)
// @namespace      http://userscripts.org/users/421568
//
// @description	   If YouTube blocks a video in your country, the script will automatically load a proxy player from a regularly updated list of proxies
//
// @include        http://*.youtube.com/watch?*
// @include        https://*.youtube.com/watch?*
//
// @grant		   GM_xmlhttpRequest
//
// @version		   0.0.9
// ==/UserScript==
/*-------- If you prefer specific proxies, set random to false and order the list according your priorities ---------*/
/*-------------------------------------------------------------------------------------------------------------------*/
var random = true;
var proxylist = [{site: 'http://proxy.n3n.co/', form: 'includes/process.php?action=update', input: 'u'},
                 {site: 'http://proxy-http.com/', form: 'includes/process.php?action=update', input: 'u'},
                 {site: 'http://geek-proxy.com/', form: 'includes/process.php?action=update', input: 'u'},
                 {site: 'http://resurf.net/', form: 'includes/process.php?action=update', input: 'u'},
                 {site: 'https://www.unblockerssl.com/', form: 'includes/process.php?action=update', input: 'u'},
                 {site: 'http://tubed.info/', form: 'includes/process.php?action=update', input: 'u'},
                 {site: 'http://proxy-secure.com/', form: 'includes/process.php?action=update', input: 'u'},
                 {site: 'https://sslsecureproxy.com/', form: 'includes/process.php?action=update', input: 'u'},
                 {site: 'https://www.unblockyoutube.co/', form: 'includes/process.php?action=update', input: 'u'}];
/*-------------------------------------------------------------------------------------------------------------------*/
var not_avail_warning = document.getElementById("watch7-player-unavailable");
var content_container = document.getElementById("body-container");
var header = document.getElementById("header");
var proxyinfo = null;
var proxy = null;
var proxypointer = [];
function next()
{
	if (proxypointer.length == 0)
	{
		for (var i = 0; i < proxylist.length; ++i)
			proxypointer.push(i)
			
		if (random && proxylist.length > 2)
			for (var i = proxypointer.length; i > 0; --i)
			proxypointer.push(proxypointer.splice(Math.floor(Math.random()*i),1)[0]);
	}
	proxy = proxylist[proxypointer.shift()];
	proxyinfo.innerHTML = proxy.site.match(/^https?:\/\/(www\.)?(\S*)\//i).pop();
	loadProxy();
}
/*
**
* Original written by Cruse_Car: Youtube auto proxy player (https://userscripts.org/scripts/show/98840)
*/
function loadProxy()
{
	var sentproxy = proxy.site;
	GM_xmlhttpRequest({
		method: 'POST',
		url: proxy.site+proxy.form,
		data: proxy.input + '=' + encodeURIComponent(window.location.href),
		headers: {
			'User-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:13.0) Gecko/20100101 Firefox/13.0',
			'Accept': 'application/xml,text/xml',
            		'Referer': proxy.site,
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(responseDetails) {
			if (sentproxy == proxy.site)
			{
				var res = responseDetails.responseText;
                
                //var proxy_content = res.match(/<!--\[proxied\]-->([\S\s]*)<!-- CONTENT END -->/m);
                var proxy_content = res.match(/<div id="body-container">([\S\s]*)<\/body><\/html>/m);
                
                if (proxy_content)
                {
                    proxy_content = proxy_content[0].replace(/((href|src)=")\//g, "$1"+proxy.site);
                    var p =  document.getElementById("proxytext");
                    content_container.innerHTML = proxy_content;
                    var header =  document.getElementById("header");
                    header.insertBefore(p, header.firstChild);
                    document.getElementById("switchproxy").addEventListener('click', next, false);
                    
                }
                else
                {
                    proxyinfo.innerHTML += ' [<span style="color:red">Error</span>]';
                }
			}
		}
	});
}
if (not_avail_warning != null)
{
    var header =  document.getElementById("header");
    header.innerHTML = "<div id=\"proxytext\" style=\"text-align: left; font-size: 15px; margin-top:5px; position:relative; left:250px;\">Using proxy: <span id=\"ytproxy-info\" style=\"font-style: italic;\"></span> - <a href=\"#\" id=\"switchproxy\">Switch proxy</a></div>"+header.innerHTML;
	proxyinfo = document.getElementById("ytproxy-info");
	document.getElementById("switchproxy").addEventListener('click', next, false);
	document.getElementsByClassName("message")[0].innerHTML += "<br><br>Please wait a few seconds while the proxy player loads...";
	next();
}
