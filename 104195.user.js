// ==UserScript==
// @name           no-short-url
// @namespace      http://userscripts.org/users/tianji
// @description    Expand short urls on every webpages
// @include        *
// ==/UserScript==

var Expander = "http://www.innovation-china.org/longurl/l.php";
// use this if you always have international internet connection (not in China EDU net..)
//var Expander = "http://api.longurl.org/v2/expand";

// add short url provider to here:
//var surl_regex = /http\:\/\/rrurl\.cn\/[a-zA-Z0-9]+|http\:\/\/alturl\.com\/[a-zA-Z0-9]+|http\:\/\/tinyurl\.com\/[a-zA-Z0-9]+|http\:\/\/bit\.ly\/[a-zA-Z0-9]+|http\:\/\/is\.gd\/[a-zA-Z0-9]+|http\:\/\/t\.cn\/[a-zA-Z0-9\.\?\=]+|http\:\/\/4sq\.com\/[a-zA-Z0-9]+|http\:\/\/goo\.gl\/[a-zA-Z0-9]+|http\:\/\/lnkd\.in\/[a-zA-Z0-9]+|http\:\/\/sinaurl\.cn\/[a-zA-Z0-9]+|http\:\/\/t\.co\/[a-zA-Z0-9]+|http\:\/\/nyt\.ms\/[a-zA-Z0-9]+/;
var surl_regex = /http\:\/\/(rrurl|alturl|tinyurl|bit|is|4sq|goo|lnkd|sinaurl|nyt|t)\.[a-zA-Z]{2,3}\/[a-zA-Z0-9]{1,8}|http\:\/\/t\.cn\/[a-zA-Z0-9\.\?\=]+/;
var surl_regex_looklike = /(http\:\/\/)?[a-zA-Z0-9]{1,7}\.[a-zA-Z]{2,3}\/[a-zA-Z0-9]{1,8}|http\:\/\/t\.cn\/[a-zA-Z0-9\.\?\=]+/;
var img_lurl = '<img src="data:image/png;base64,R0lGODlhEAAQALMPAI6OjtTU1PX19aWlpfHx8a6ursTExHx8fPv7+7q6umhoaJycnGdnZ4WFhWZmZv///yH5BAEAAA8ALAAAAAAQABAAAASB8MlQQLsNlCAlAY6jMGHpAIIEiplihsAThEoTBAD5UvRCCAPXq7AIMRYCQUFnWhQdjEFy+XI4S1Ils3QNSREJYfMZFYAVaHG3jAgYDAmAcFHgEhB4fOAQ2pQOBkkCBAQJfA4BCA00B06OBy4NCA8Eh1AMmEIHBB0IBgsYGAsGkw8RADs=" alt="Expand"/>';
var img_loading = '<img src="data:image/gif;base64,R0lGODlhFAAUAJEDAMzMzLOzs39/f////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgADACwAAAAAFAAUAAACPJyPqcuNItyCUJoQBo0ANIxpXOctYHaQpYkiHfM2cUrCNT0nqr4uudsz/IC5na/2Mh4Hu+HR6YBaplRDAQAh+QQFCgADACwEAAIADAAGAAACFpwdcYupC8BwSogR46xWZHl0l8ZYQwEAIfkEBQoAAwAsCAACAAoACgAAAhccMKl2uHxGCCvO+eTNmishcCCYjWEZFgAh+QQFCgADACwMAAQABgAMAAACFxwweaebhl4K4VE6r61DiOd5SfiN5VAAACH5BAUKAAMALAgACAAKAAoAAAIYnD8AeKqcHIwwhGntEWLkO3CcB4biNEIFACH5BAUKAAMALAQADAAMAAYAAAIWnDSpAHa4GHgohCHbGdbipnBdSHphAQAh+QQFCgADACwCAAgACgAKAAACF5w0qXa4fF6KUoVQ75UaA7Bs3yeNYAkWACH5BAUKAAMALAIABAAGAAwAAAIXnCU2iMfaRghqTmMp1moAoHyfIYIkWAAAOw==" alt="loading"/>';
var img_fin = '<img src="data:image/gif;base64,R0lGODlhEAAQALMPAHTWWe/67Kjll1rPO7jqq5viiEDHG9Pyy9v11YjccirAAS7BBlTNM2jTSynAAP///yH5BAEAAA8ALAAAAAAQABAAAAR78L2QxnLYrZGCfIeRjZhiHJNIZstiGEGxskYiDAUwa4NwEAxAY7ZgEA63RWNI2ghijMtyY7gUj4IqZmkQECyMpyCamTYI4wKSoRgtTQWEAPFtu3VKBOIAUI0AAg5wCAl+I08iJgMGdiMwIIkLjRkGCB8xDQyamw0FHg8RADs=" alt="powered by longurl.org & AOI"/>';
var img_caution = '<img src="data:image/png;base64,R0lGODlhEAAQALMPAP78/PHHx8ouLuSVlcQYGP339/vu7tloaPXZ2cEMDO22ttBGRtZcXPjj48AGBv///yH5BAEAAA8ALAAAAAAQABAAAARQ8MkpTQio0P3KSYQwGNw0OCgYlI8hoKkClAYBOwTC1vcylwUbbMUCvFA+1gOwSBGLDEfi8FMGGIOGUnJl6LZGFEGrbCRggy0PpQArBFMNJQIAOw==" alt="stop"/>';

var about=function() {
	var win = open("","","");
	var htm = "";
	htm +='<html>';
	htm +='<head><title>About LongURL Userscript</title></head>';
	htm +='<body><h1 style="color:white;background-color:#222;">LongURL Userscript</h1>';
	htm +='Powered by <a href="http://longurl.org/"><img src="http://assets.longurl.org/static/images/longurl-logo.png" alt="longurl.org"/></a> and <a href="http://innovation-china.org/"><img src="http://gallery.innovation-china.org/var/albums/AOI-logo/aoi_100.png" alt="Association of Innovation"/></a> <br/>';
	htm +='Program by the729 &lt;longurl@wu' + 'tj.info&gt;';
	htm +='</body></html>';
	win.document.write(htm);
	win.document.close();
};

var caution=function() {
	alert("CAUTION: The actual target of this link do not match what it appears.");
};

var do_longurl = function()
{
	var target = this.lurl.link;
	var ctrl = this.lurl.ctrl;
	
	if (target.getAttribute("no-short-url-expanded")>0) return;
	target.setAttribute("no-short-url-expanded", 2);
	
	var textcont = target.textContent.replace(/^\s+|\s+$/g,"");
	var linktgt = target.href;
	ctrl.innerHTML = img_loading;
	ctrl.removeEventListener("click", do_longurl, false);
	GM_xmlhttpRequest({
	  url: Expander + "?title=1&url=" + encodeURIComponent(linktgt),
	  method: "GET",
	  onload: (function(lurlobj) {
	  	return function(response) {
			var xmlDoc = response.responseXML;
			if (!xmlDoc || !xmlDoc.getElementsByTagName) {
				xmlDoc = new DOMParser().parseFromString(response.responseText, "text/xml");
			}
			if (!xmlDoc) {
				//error
				lurlobj.ctrl.innerHTML = img_lurl;
				lurlobj.link.setAttribute("no-short-url-expanded", 0);
				return;
			} else {
				var lurl, title;
				try {
					lurl= xmlDoc.getElementsByTagName("long-url")[0].childNodes[0].nodeValue;
					title = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
				} catch(err) {
					if (!lurl) {
						lurlobj.ctrl.innerHTML = img_lurl;
						lurlobj.link.setAttribute("no-short-url-expanded", 0);
						return;
					}
				}
				var host = lurl.replace(/^http\:\/\/(([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.[a-zA-Z]+)(\/\S*)*$/ig, "$1");
				if (!title) title = "Link to "+host;
				if (title.length > 20) {
					title = title.substr(0,17) + "...";
				}
				lurlobj.link.innerHTML = lurlobj.ori_text + " " + title;
				lurlobj.ctrl.title="powered by longurl.org & AOI";
				lurlobj.ctrl.addEventListener("click", about, false);
				lurlobj.ctrl.innerHTML=img_fin;
				lurlobj.link.href = lurl;
				if (!lurlobj.link.title)
					lurlobj.link.title = "Link to "+host;
				else
					lurlobj.link.title += "| Link to "+host;
				lurlobj.link.setAttribute("no-short-url-expanded", 1);
			}
		};
	  })({link: target, ctrl: ctrl, ori_text: textcont.replace(surl_regex_looklike, "")}),
	  onerror: (function(lurlobj) {
	  	return function(response) {
		  	lurlobj.link.setAttribute("no-short-url-expanded", 0);
		  	lurlobj.ctrl.innerHTML=img_lurl;
	  	};
	  })({link: target, ctrl: ctrl})
	});
};

function process()
{
	var xpath, targets, regex;
	
	xpath = '//a[not(@no-short-url-processed)]';
	targets = document.evaluate(xpath, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i=0; i<targets.snapshotLength; i++) {
		var target = targets.snapshotItem(i);
		
		if (target.getAttribute("no-short-url-processed")) continue;
		target.setAttribute("no-short-url-processed", 1);
		
		var textcont = target.textContent.replace(/^\s+|\s+$/g,"");
		textcont = textcont.replace(/\u200B/g, "");
		textcont = textcont.replace("\n", "");
		var linktgt = target.href;
		
		if (surl_regex.test(linktgt)) {
			var nelem = document.createElement("span");
			nelem.style.cursor = "pointer";
			nelem.title="Find Long URL";
			nelem.addEventListener("click", do_longurl, false);
			nelem.innerHTML=img_lurl;
			nelem.lurl = {link: target, ctrl:nelem};
			target.lurl = {link: target, ctrl:nelem};
			target.parentNode.insertBefore(nelem, target.nextSibling);
			target.addEventListener("mouseover", do_longurl, false);
		} else 
		if (/^http\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]+(\/\S*)*$/ig.test(textcont)) {
			if (textcont != linktgt && textcont + '/' != linktgt && textcont != linktgt + '/') {
				var nelem = document.createElement("span");
				nelem.style.cursor = "pointer";
				nelem.title="Caution! Actual link to " + linktgt;
				nelem.addEventListener("click", caution, false);
				nelem.innerHTML += img_caution;
				target.parentNode.insertBefore(nelem, target.nextSibling);
				target.style.backgroundColor="#FCC";
			}
		}		
	}
}

var delayed_call = function(func, delay) {
	var timer;
	return function() {
		if (timer) window.clearTimeout(timer);
		timer = window.setTimeout(func, delay);
	}
};
document.body.addEventListener("DOMNodeInserted", delayed_call(process, 500), false);
