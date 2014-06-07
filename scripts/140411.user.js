// ==UserScript==
// @name        URL Shortener Unshortener
// @namespace   Smiths
// @description	Adds small button next to shortened URLs (t.co/bit.ly/goo.gl) on Twitter and other sites that will replace the shortened URLs with their real locations and vice-versa. Useful for when you don't want to blindly click links.
// @include     *
// @version     1.0.5
// @grant	       GM_getValue
// @grant   	   GM_setValue
// @grant		   GM_addStyle
// @grant  		   GM_xmlhttpRequest
// @grant  		   GM_registerMenuCommand
// @attribution	changes [d:03.05.14][u:<ul><li>Fix for oversized buttons; needed to specify size. Oops.</li></ul>]
// ==/UserScript==

//note to self: gotta make sure to update the one in the metadata too!
var v = "1.0.5";
var scriptNum = "140411";
var scriptName = "URL Shortener Unshortener";

//<--Updater Stuff
var isFireFox = navigator.userAgent.indexOf("Firefox") > -1 || navigator.userAgent.indexOf("Iceweasel") > -1;
GM_addStyle("#smgm_bgdiv{ text-align: center;position:fixed;top:0px;left:0px;z-index:9991;width:100%;height:100%;background-color:black;opacity:0.7;display:block;visibility:visible;}");
GM_addStyle("#smgm_dialogbox { vertical-align:middle;left:40px;top:15px;border:3px solid #000 !important;text-align:center !important;background-color:#fff !important;color:#000 !important;font-family:arial,verdana !important;z-Index:9999;position:fixed;width:18%;height:50%;margin-left:auto;margin-right:auto;display:block;visibility:visible;}");
GM_addStyle(".smgm_buttons { color:#000 !important;font: 90% 'arial','trebuchet ms',helvetica,sans-serif !important;background-color:#B2CCFF !important;border:2px solid !important;border-color: #E0EBFF #000 #000 #E0EBFF !important;vertical-align: top !important;}");
GM_addStyle(".smgm_table { margin-bottom:10px !important;border:0px !important;border-collapse:collapse !important;margin-left:auto;margin-right:auto; }");
var remindLaterV = GM_getValue('remindLaterV', remindLaterV);
if (!remindLaterV) { remindLaterV = 0; GM_setValue('remindLaterV',remindLaterV); }

var homepageURL = "http://userscripts.org/scripts/show/" + scriptNum ;
var metaURL = "http://userscripts.org/scripts/source/" + scriptNum + ".meta.js";
var scriptJSURL = "http://userscripts.org/scripts/source/" + scriptNum + ".user.js";

function doremindLater(clicked,span)
{
	if (clicked) 
		remindLaterV = span;
	else
		remindLaterV--;
	GM_setValue('remindLaterV',remindLaterV);
}

function hideUpdate()
{
	document.body.removeChild(document.getElementById('smgm_bgdiv'));
	document.body.removeChild(document.getElementById('smgm_dialogbox'));
}

function checkNew(version)
{
	var upgrade = 0;
	var verstring = "";
	var theHTML = "";
	GM_xmlhttpRequest({
		method:"GET",
		url:metaURL,
		onload:function(content){
			var aResponse = content.responseText;
			var USversion = aResponse.match(/@version.*?(\d[^<]+?)\n/);
			aResponse = aResponse.replace(/ \/>/g,'>');
			aResponse = aResponse.replace(/\n/g,'');
			var changeDate = aResponse.match(/\[d:([0-9]+?\.[0-9]+?\.[0-9]+?)\]/i)[1];
			var theChanges = aResponse.match(/\[u:(.*?)\]/i)[1];
			vSplit = version.split(".");
				vmain = Number(vSplit[0]);
				vvsub = Number(vSplit[1]);
				vrsub = Number(vSplit[2]);
			USsplit = USversion[1].split(".");
				USvmain = Number(USsplit[0]);
				USvsub = Number(USsplit[1]);
				USrsub = Number(USsplit[2]);
			verstring = "<div style='padding:5px;border-bottom:1px dotted #000;'>Latest Version on Userscripts: <a href='" + homepageURL + "' target='_new' title='Click to visit script's page'><b>" + USvmain + "." + USvsub + "." + USrsub + "</b></a><br>Your Installed Version: <b>" + vmain + "." + vvsub + "." + vrsub + "</b></div>";
			if (USvmain > vmain) upgrade = 1;
			if ( (USvsub > vvsub) && (USvmain >= vmain) ) upgrade = 1;
			if ( (USrsub > vrsub) && (USvsub == vvsub) && (USvmain >= vmain) ) upgrade = 1;
			if (upgrade == 1) //upgrade available, pop a box
			{
				theHTML += "<div style='padding:5px;border-bottom:1px dotted #000;'>New version of " + scriptName + " available.</div>";
				theHTML += verstring + "<p>";
				theHTML += "<table class='smgm_table'><tr><td><input type='button' class='smgm_buttons' id='smgm_installButton' onMouseUp=\"document.location.href=\'" + scriptJSURL + "\';\" value='Install'></td>";
				theHTML += "<td style='width:25px;'>&nbsp;</td><td><input style='' class='smgm_buttons' type='button' id='smgm_remindButton' value='Remind Me Later'></td>";
				theHTML += "</tr></table><div style='background-color:white !important;overflow:auto !important;height:50%;text-align:left;border-top:1px dotted #000;padding:7px;' colspan='5'>Changes (" + changeDate.replace(/\./g,"/") + "):<br><span style='font-style:italic;'>" + theChanges + "</span></div>";
				div1 = document.createElement('div');
				div1.id = 'smgm_dialogbox';
				div1.style.display = "none";
				div1.innerHTML = theHTML;
				document.body.appendChild(div1);
				div2 = document.createElement('div');
				div2.id = 'smgm_bgdiv';
				div2.style.display = "none";
				div2.addEventListener("click",function(){doremindLater(true,15);hideUpdate();},false);
				document.body.appendChild(div2);
				document.getElementById('smgm_bgdiv').style.display='block';
				document.getElementById('smgm_dialogbox').style.display='block';
				document.getElementById('smgm_remindButton').addEventListener("click", function(){doremindLater(true,60);hideUpdate();},false);
				document.getElementById('smgm_installButton').addEventListener("click", function(){hideUpdate();},false);
			}
		}
	})
}

if (isFireFox) //only do update on FFox, Chrome/Tampermonkey are weird
{
	doremindLater(false);
	if (remindLaterV < 1) 
		checkNew(v);
}
//end updater stuff-->


var b1 = "data:image/gif;base64,R0lGODlhCAAIANUAAAAAAP///xa9JhKcHxKaHw56GQ1wFwxnFR3zMRzoLxrbLBnSKhjMKRa5JRWuIxKXHg9/Gh/9NCP9OCX9OS79QTH9RDv9TT79UEr9Ww4sERQ+GBI4FhlNHhtSIBZDGlf+Z13+bGH+cGn+dy1iMnn+hXv+h37+iob+kU97U1N+V3mbfIKihYOihgsjDQ0oDxI2FQwkDg8sET1uQW2ScHCUc////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADUALAAAAAAIAAgAAAY3wFptpZqhhDXWqRS6jGo0E0mEoUQ4KdDHMkkwNLKKBKFwDF4dxUJAgBgyNU/jUTi0kJuYCyYMAgA7";
var b2 = "data:image/gif;base64,R0lGODlhCAAIANUAAAAAAP///703FpwuEpotEnokDnAhDWceDPNHHehEHNtAGtI+Gcw8GLk2Fq4zFZcsEn8lD/1LH/1OI/1QJf1XLv1ZMf1hO/1kPv1tSiMQCywUDj4cFDgaEk0jGVImG0MfFjYZEiQRDP54V/58Xf6AYf6GaWI3Lf6Tef6Ve/6Xfv6ehn5cU5J0bZR3cJuAeaKJgygSDSwUD25GPXtXT6KIgv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADUALAAAAAAIAAgAAAY3wFotBItxhLXMofBofGoaA4QgWCg8oIFDgZBUZBtGYmIRjVadCAVTOqVaNdOFhFK9kDOWiyYMAgA7";
var b3 = "data:image/gif;base64,R0lGODlhCAAIAPYEAKKUh5uLfZKAcXtlUv7Ejf67gf6xaP2dRGJIMJSDdP6/hP66f/61cP2kUf2WNf2OJk0zG35pVv6uZP6rXv2cQf2RLOiCI8xyHj4pFm5VQP2XOP2QKvOII9t6IK5fGpxXFjYjE1I2HdJ1Hr1pG5pWFn9HEnA+ECwdD0MsGLlnG5dSFnpEEWc6DyMXDDglFCwdECgaDiQYDaGifJubc5KSZ3t7SqGiffz+ff7+cfv+V/r9NGFiKZSUavz+dP7+b/v+X/r9QPn9JPn9FUxNFn1+Tvv+U/v+Tfr9Mfn9G+ToE8nMED0+Em5uOfn9J/n9Ge/zE9jbEa6uDpqcDDY2EFJSGM/SELq9D5iaDH1/Cm5wCSssDENDE7a5D5eXDHh6CWVnCCMjCjc4ECwrDSgoCyQkCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgBlACwAAAAACAAIAAAHPIBlZQAAAgOCgwQKBg2HAAQEDA0aFQgRBhIHFRYXLhkaGxwdHiQgIR0iKSQlJi9lCB4qKywtiC4vL2KCgQAh+QQFCgBlACwAAAAACAAIAAAHO4BlZTY2NDWCgzc9OUCHNjc3P0BNSDtEOUU6SElKYUyUT1BRV1NUUFVWV1hZWmVUXF1eX2SIU2JkU4KBADs=";

function getRealURL(urlID) {
	var theURL,link;
	link = document.querySelector('a[slID="'+urlID+'"]');
	theURL = link.getAttribute('data-full-url');
	var plusBox = document.getElementById('bsl'+urlID.substr(2));
	plusBox.innerHTML = '<img title="Click to fetch full URL" style="width:8px;height:8px;padding:2px;border:none" src="'+b3+'" alt="[+]">';
	GM_xmlhttpRequest({
		method:"HEAD",
		url:theURL,
		headers:{ "User-Agent":"monkeyagent", "Accept":"text/monkey,text/xml" },
		onload:function(content){
			var minusBox = document.createElement('a');
			
			link.setAttribute('smgm_origURL',link.innerHTML);
			link.setAttribute('smgm_origfURL',theURL);
			var newLink = link.cloneNode(true);
			newLink.href = content.finalUrl;
			newLink.innerHTML = content.finalUrl;
			link.parentNode.replaceChild(newLink,link);

			minusBox.innerHTML = '<img title="Click to collapse back to shortened URL" style="width:8px;height:8px;padding:2px;border:none" src="'+b2+'" alt="[-]">';
			minusBox.href="javascript:void(0);";
			minusBox.id = 'bsl'+urlID.substr(2);
			minusBox.addEventListener("click",function(){
				this.innerHTML = '<img title="Click to fetch full URL" style="width:8px;height:8px;padding:2px;border:none" src="'+b1+'" alt="[+]">';
				var aLink = document.querySelector('a[slID="'+this.id.substr(1)+'"]');
				aLink.setAttribute('data-full-url',aLink.getAttribute('smgm_origfURL'));
				aLink.innerHTML=aLink.getAttribute('smgm_origURL');
				aLink.href=aLink.getAttribute('smgm_origfURL');
				aLink.target="_blank";
				this.addEventListener("click",function(){getRealURL(this.id.substr(1));},false);
			},false);
			plusBox.parentNode.replaceChild(minusBox,plusBox);
		}
	})
}

function unescapeHTML(s){return s.replace('&amp;', '&').replace('&lt;',"<").replace('&gt;','>').replace('&quot;','1"').replace('&#39;','\'');}

var lc = 0;
document.addEventListener('DOMNodeInserted',function(e){
	window.setTimeout(function(){
		var newLinks = document.querySelectorAll('a[href*="po.st/"],a[href*="img.ly/"],a[href*="bit.ly/"],a[href*="goo.gl/"],a[href*="t.co/"],a[href*="db.tt/"],a[class*="extLink"],a[class*="url-ext"],a[class*="twitter-timeline-link"]');
		if (newLinks.length > 0)
		{
			for (var i = 0; i < newLinks.length; i++) {
				if (newLinks[i].className.match(/\bsmgm_usTitle\b/) == null && newLinks[i].innerHTML.indexOf('<img') < 0)
				{
					lc++;
					var plusBox = document.createElement('a');
					newLinks[i].setAttribute('slID','sl'+lc);
					if (newLinks[i].getAttribute('data-full-url') == null) newLinks[i].setAttribute('data-full-url',newLinks[i].href); 
					plusBox.innerHTML = '<img title="Click to fetch full URL" style="width:8px;height:8px;padding:2px;border:none" src="'+b1+'" alt="[+]">';
					plusBox.href="javascript:void(0);";
					plusBox.id = "bsl" + lc;
					plusBox.addEventListener("click",function(){getRealURL(this.id.substr(1));},false);
					newLinks[i].parentNode.insertBefore(plusBox,newLinks[i].nextSibling);
					(newLinks[i].className == "") ? newLinks[i].className = "smgm_usTitle" : newLinks[i].className = newLinks[i].className + " smgm_usTitle";
				}
			}
		}
		}, 200);}
	, false);
