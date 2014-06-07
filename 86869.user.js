// ==UserScript==
// @name           Monkey Protection Link Resolver
// @description    Decodes short URLs of rsmonkey.com, safeurl.me, safelinking.net and oneddl.canhaz.it.
// @author         kuehlschrank
// @version        2012.8.20
// @include        http*
// @exclude        http://*.canhaz.it/*
// @exclude        http://*.rsmonkey.com/*
// @exclude        http://safeurl.me/a/*
// @exclude        http*://*.google.tld/*
// ==/UserScript==

function processLinks() {
	var list = document.querySelectorAll('a[href^="http://safeurl.me/d/"], a[href*="//safelinking.net/d/"], a[href*="oneddl.canhaz.it"], a[href*=".rsmonkey.com"]');
	var len = list.length;
	if(len > 0) {
		GM_addStyle('a.mplr-loading { background: url(data:image/gif;base64,R0lGODlhDAAMAKU8AAAAABAQEBISEj09PT4+PkBAQEJCQkNDQ0lJSUpKSktLS01NTU5OTk9PT1FRUVNTU1tbW2hoaGlpaW1tbW9vb3BwcIODg4SEhIWFhYaGhoeHh4mJiYuLi42NjY6OjpCQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm6Ojo6SkpKqqqqurq6ysrK6urq+vr7CwsLq6ury8vL29vb+/v8HBwcLCwsPDw8XFxczMzP///////////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgA/ACwAAAAADAAMAAAGLMCfcEgsGo/IZBGXRAASTQBCSVEpf4gGEXcbjhqOlumku3WHld8q01HSRMUgACH5BAkKAD8ALAAAAAAMAAwAAAYzwJ9wSCRCIEWjQIBMCgNM50/jkf4ihIvVUohYfx3Z9ycSoaQpDkaFwzl3P93t5pbibsUgACH5BAkKAD8ALAAAAAAMAAwAAAYwwJ9QiEAMj6MfBQA4CisNhuiQwDl/i8Z1yEpthSbQ6fsrXUhk4S39w1nJtzV7/g0CACH5BAkKAD8ALAAAAAAMAAwAAAYzwJ9QaIkMj6hfp1AY/SDDk0gki1w8AQFUyMEcBVphbmc6Qra42+3IVq/ZRxx8Tq/b7/MgACH5BAkKAD8ALAAAAAAMAAwAAAYtwJ9QaDINj8PMZvWrHG84W03kcjRGQ+ixgUB6UxTvEQHoin+J8vmHW7vf8HMQACH5BAkKAD8ALAAAAAAMAAwAAAYxwJ9QiMMNj8LbDZf7nZDE244jQkGFJozoeoR5uMILwQKWGCLg0IgLEQTAbQEEPgcfgwAh+QQJCgA/ACwAAAAADAAMAAAGLsCfcEgsGo/E2w0pxOGYQhv0V9OYmKMLiRmbMRULIy6BeC0eIyMAMPmljQhEMQgAIfkEAQoAPwAsAAAAAAwADAAABjHAn3BILBqPyKRyeFPebrgkDiqEQIioU64qEBBFqCFEEPhELq4LxiT+jQwDYeoYsRSDADs=) right center no-repeat; padding-right: 15px; } a.mplr-error { background: transparent url(data:image/gif;base64,R0lGODlhDAAMAMQAAP3f3/RfX/Vvb/7v7/E/P/ePj/mvr/Z/f/q/v/vJyfzPz/ifn+8fH/NTU/NZWe8jI/iWlv3k5P///+4PDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAMAAwAAAVIoCRFUPM8DRSJUuJMcOwk4xvfDgkfCsEgC1gJxgAoCpIAzBQTiIKwU/MZQxEHikVyCYEZBj4FgDFRvcgxcq5lw9FEJBNKJQoBADs=) right center no-repeat; padding-right: 15px; }');
		for(var i = 0; i < len; i++) {
			request(list[i]);
		}
	}
}


function request(a) {
	a.classList.add('mplr-loading');
	GM_xmlhttpRequest({
		method:	'GET',
		url:	a.href,
		ignoreRedirect: true,
		onload:	function(req) {
			var status = parseInt(req.status);
			if(status > 299 && status < 400 && (req.responseHeaders.match(/^Location:\s+(.+)/mi))) {
				setUrl(a, RegExp.$1);
				if(a.href.match(/canhaz\.it|safelinking\.net/)) {
					request(a);
				}
			} else if(req.responseText.match(/(iframe |location).+"(https?:\/\/.+)"/i)) {
				setUrl(a, RegExp.$2);
			} else {
				a.className = a.className.replace('mplr-loading', 'mplr-error');
				GM_log('Target could not be resolved: ' + a.href);
				setUrl(a);
			}
		},
		onerror: function(req) {
			GM_log('Request failed: ' + a.href);
			setUrl(a);
		}
	});
}


function setUrl(a, url) {
	if(url) {
		a.innerHTML = url;
		a.href = url;
	}
	a.classList.remove('mplr-loading');
}


window.setTimeout(processLinks, 200);