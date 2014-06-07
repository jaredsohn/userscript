// ==UserScript==
// @name        	URL Shortener Unshortener MOD
// @namespace   	Smiths - Modded by CODYQX4
// @description	Adds small button next to shortened URLs (t.co/bit.ly/goo.gl) on Twitter and other sites that will replace the shortened URLs with their real locations and vice-versa. Useful for when you don't want to blindly click links.
// @include     	*
// @version     	1.0.5
// @grant	       	GM_getValue
// @grant   	   	GM_setValue
// @grant		   	GM_addStyle
// @grant  		GM_xmlhttpRequest
// @grant  		GM_registerMenuCommand
// @attribution	changes [d:03.05.14][u:<ul><li>Fix for oversized buttons; needed to specify size. Oops.</li></ul>]
// ==/UserScript==

//note to self: gotta make sure to update the one in the metadata too!
var v = "1.0.5";
var scriptNum = "456615";
var scriptName = "URL Shortener Unshortener MOD";

//<--Updater Stuff
var isFireFox = navigator.userAgent.indexOf("Firefox") > -1 || navigator.userAgent.indexOf("Iceweasel") > -1;
GM_addStyle("#smgm_bgdiv{ text-align: center;position:fixed;top:0px;left:0px;z-index:9991;width:100%;height:100%;background-color:black;opacity:0.7;display:block;visibility:visible;}");
GM_addStyle("#smgm_dialogbox { vertical-align:middle;left:40px;top:15px;border:3px solid #000 !important;text-align:center !important;background-color:#fff !important;color:#000 !important;font-family:arial,verdana !important;z-Index:9999;position:fixed;width:18%;height:50%;margin-left:auto;margin-right:auto;display:block;visibility:visible;}");
GM_addStyle(".smgm_buttons { color:#000 !important;font: 90% 'arial','trebuchet ms',helvetica,sans-serif !important;background-color:#B2CCFF !important;border:2px solid !important;border-color: #E0EBFF #000 #000 #E0EBFF !important;vertical-align: top !important;}");
GM_addStyle(".smgm_table { margin-bottom:10px !important;border:0px !important;border-collapse:collapse !important;margin-left:auto;margin-right:auto; }");
var remindLaterV = GM_getValue('remindLaterV', remindLaterV);
if (!remindLaterV) {
    remindLaterV = 0;
    GM_setValue('remindLaterV', remindLaterV);
}

var homepageURL = "http://userscripts.org/scripts/show/" + scriptNum;
var metaURL = "http://userscripts.org/scripts/source/" + scriptNum + ".meta.js";
var scriptJSURL = "http://userscripts.org/scripts/source/" + scriptNum + ".user.js";

function doremindLater(clicked, span) {
    if (clicked)
        remindLaterV = span;
    else
        remindLaterV--;
    GM_setValue('remindLaterV', remindLaterV);
}

function hideUpdate() {
    document.body.removeChild(document.getElementById('smgm_bgdiv'));
    document.body.removeChild(document.getElementById('smgm_dialogbox'));
}

function checkNew(version) {
    var upgrade = 0;
    var verstring = "";
    var theHTML = "";
    GM_xmlhttpRequest({
        method: "GET",
        url: metaURL,
        onload: function (content) {
            var aResponse = content.responseText;
            var USversion = aResponse.match(/@version.*?(\d[^<]+?)\n/);
            aResponse = aResponse.replace(/ \/>/g, '>');
            aResponse = aResponse.replace(/\n/g, '');
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
            if ((USvsub > vvsub) && (USvmain >= vmain)) upgrade = 1;
            if ((USrsub > vrsub) && (USvsub == vvsub) && (USvmain >= vmain)) upgrade = 1;
            if (upgrade == 1) //upgrade available, pop a box
            {
                theHTML += "<div style='padding:5px;border-bottom:1px dotted #000;'>New version of " + scriptName + " available.</div>";
                theHTML += verstring + "<p>";
                theHTML += "<table class='smgm_table'><tr><td><input type='button' class='smgm_buttons' id='smgm_installButton' onMouseUp=\"document.location.href=\'" + scriptJSURL + "\';\" value='Install'></td>";
                theHTML += "<td style='width:25px;'>&nbsp;</td><td><input style='' class='smgm_buttons' type='button' id='smgm_remindButton' value='Remind Me Later'></td>";
                theHTML += "</tr></table><div style='background-color:white !important;overflow:auto !important;height:50%;text-align:left;border-top:1px dotted #000;padding:7px;' colspan='5'>Changes (" + changeDate.replace(/\./g, "/") + "):<br><span style='font-style:italic;'>" + theChanges + "</span></div>";
                div1 = document.createElement('div');
                div1.id = 'smgm_dialogbox';
                div1.style.display = "none";
                div1.innerHTML = theHTML;
                document.body.appendChild(div1);
                div2 = document.createElement('div');
                div2.id = 'smgm_bgdiv';
                div2.style.display = "none";
                div2.addEventListener("click", function () {
                    doremindLater(true, 15);
                    hideUpdate();
                }, false);
                document.body.appendChild(div2);
                document.getElementById('smgm_bgdiv').style.display = 'block';
                document.getElementById('smgm_dialogbox').style.display = 'block';
                document.getElementById('smgm_remindButton').addEventListener("click", function () {
                    doremindLater(true, 60);
                    hideUpdate();
                }, false);
                document.getElementById('smgm_installButton').addEventListener("click", function () {
                    hideUpdate();
                }, false);
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

function checkNew2(version) {
    GM_xmlhttpRequest({
        method: "GET",
        url: metaURL,
        headers: {
            "User-Agent": "monkeyagent"
        },
        onload: function (content) {
            var upgrade = 0;
            var USversion = content.responseText.match(/@version.*?(\d[^<]+?)\n/);
            content.responseText = content.responseText.replace(/ \/>/g, '>');
            content.responseText = content.responseText.replace(/\n/g, '');
            var changeDate = content.responseText.match(/\[d:([0-9]+?\.[0-9]+?\.[0-9]+?)\]/i)[1];
            var theChanges = content.responseText.match(/\[u:(.*?)\]/i)[1];
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
            if ((USvsub > vvsub) && (USvmain >= vmain)) upgrade = 1;
            if ((USrsub > vrsub) && (USvsub == vvsub) && (USvmain >= vmain)) upgrade = 1;
            document.getElementById('versioncheck').innerHTML = "<br>" + verstring + "<br><b>" + (upgrade ? "<a href=\"" + homepageURL + "\" target=\"_blank\">UPGRADE AVAILABLE</a>" : "You have the latest release");
        }
    })
}

// Custom Options
var urllistdefault = 'bit.ly db.tt dlvr.it fb.me goo.gl img.ly is.gd j.mp ow.ly po.st sdrv.ms t.co tinyurl.com youtu.be';
var urllistunsupported = 'adf.ly bc.vc rdlnk.co';
var urllist = urllistdefault.replace(' ', '\n');
if (!GM_xmlhttpRequest) {
    alert('Please upgrade to the latest version of Greasemonkey to use the full features of this script.');
    return;
} else {
    urllist = String(GM_getValue('urllist', urllist));
    GM_registerMenuCommand('URL Shortener Unshortener MOD Options', smgm_usu_showOptions);
}

function setOptions() {
    document.getElementById("urls").value = urllist;
}

function saveOptions() {
    GM_setValue('urllist', document.getElementById("urls").value);
    urllist = document.getElementById("urls").value;
}

function hideOptions() {
    document.body.removeChild(document.getElementById("smgm_optionsDiv"));
    document.body.removeChild(document.getElementById("smgm_modalDiv"));
}
//full thanks to "Google Anonymizer" code for visual options - http://userscripts.org/scripts/review/10448
function smgm_usu_showOptions() {

    var div1 = document.getElementById("smgm_modalDiv");
    if (div1 == null) {
        GM_addStyle("#smgm_modalDiv{position:fixed; top:0px; left:0px; z-index:200; width:100%; height:100%; background-color:black; opacity:0.75;}");
        GM_addStyle(".smgm_hidden{display:none; visibility:hidden;}");

        div1 = document.createElement("DIV");
        div1.id = "smgm_modalDiv";
        div1.className = "smgm_hidden";
        div1.title = "Click to cancel and close";
        document.body.appendChild(div1);

        div1.addEventListener("click", hideOptions, false);
    }
    var div2 = document.getElementById("smgm_optionsDiv");
    if (div2 == null) {
        GM_addStyle(".smgm_optionsTable{vertical-align:middle !important;border-spacing: 2px !important; border: 1px solid #000 !important; border-collapse: collapse !important;padding-left:10px !important;margin-bottom:3px !important;color:#000 !important;}");
        GM_addStyle("#smgm_optionsDiv{overflow:auto;position:fixed !important; top:3%; left:20%; z-index:210; width:50%; height:60%; background-color:white !important; border:solid 3px #0033CC !important;}");
        GM_addStyle("#USU ul{padding-left:0;}");
        GM_addStyle("#USU li{list-style:none;}");
        GM_addStyle("#urls{width:100%;min-height:530px;}");

        div2 = document.createElement("DIV");
        div2.id = "smgm_optionsDiv";
        div2.className = "smgm_hidden";
        div2.setAttribute("style", "text-align:justify !important;padding:10px !important;font-family:verdana,arial !important;font-size:10pt !important;");

        var text1 = "";
        text1 += "<center><font size=\"+1\"><a href=\"" + homepageURL + "\" target=\"_blank\">URL Shortener Unshortener</a> Options</font><span id=\"versioncheck\" style=\"font-size:10px;\"><br><br>ver. " + v + " (Checking for updates...)</span></center>";
        text1 += "<form id=\"USU\" name=\"titleform\">";
        text1 += '<ul>';
        text1 += '<li>URL Shortener Services to Search for (One per Line):<br><textarea id="urls"></textarea></li>';
        text1 += '</ul>';
        text1 += "<center><input type=\"button\" value=\"Ok\" id=\"okButton\" /><input type=\"button\" value=\"Cancel\" id=\"cancelButton\" /></center></form>";
        div2.innerHTML = text1;

        document.body.appendChild(div2);

        document.getElementById("okButton").addEventListener("click", function () {
            saveOptions();
            hideOptions();
            location.reload(true);
        }, false);
        document.getElementById("cancelButton").addEventListener("click", function () {
            hideOptions();
        }, false);
    }
    document.getElementById("smgm_optionsDiv").className = "";
    document.getElementById("smgm_modalDiv").className = "";
    setOptions();
    checkNew2(v);
    div1.className = "";
    div2.className = "";
}

var b1 = "data:image/gif;base64,R0lGODlhCAAIANUAAAAAAP///xa9JhKcHxKaHw56GQ1wFwxnFR3zMRzoLxrbLBnSKhjMKRa5JRWuIxKXHg9/Gh/9NCP9OCX9OS79QTH9RDv9TT79UEr9Ww4sERQ+GBI4FhlNHhtSIBZDGlf+Z13+bGH+cGn+dy1iMnn+hXv+h37+iob+kU97U1N+V3mbfIKihYOihgsjDQ0oDxI2FQwkDg8sET1uQW2ScHCUc////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADUALAAAAAAIAAgAAAY3wFptpZqhhDXWqRS6jGo0E0mEoUQ4KdDHMkkwNLKKBKFwDF4dxUJAgBgyNU/jUTi0kJuYCyYMAgA7";
var b2 = "data:image/gif;base64,R0lGODlhCAAIANUAAAAAAP///703FpwuEpotEnokDnAhDWceDPNHHehEHNtAGtI+Gcw8GLk2Fq4zFZcsEn8lD/1LH/1OI/1QJf1XLv1ZMf1hO/1kPv1tSiMQCywUDj4cFDgaEk0jGVImG0MfFjYZEiQRDP54V/58Xf6AYf6GaWI3Lf6Tef6Ve/6Xfv6ehn5cU5J0bZR3cJuAeaKJgygSDSwUD25GPXtXT6KIgv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADUALAAAAAAIAAgAAAY3wFotBItxhLXMofBofGoaA4QgWCg8oIFDgZBUZBtGYmIRjVadCAVTOqVaNdOFhFK9kDOWiyYMAgA7";
var b3 = "data:image/gif;base64,R0lGODlhCAAIAPYEAKKUh5uLfZKAcXtlUv7Ejf67gf6xaP2dRGJIMJSDdP6/hP66f/61cP2kUf2WNf2OJk0zG35pVv6uZP6rXv2cQf2RLOiCI8xyHj4pFm5VQP2XOP2QKvOII9t6IK5fGpxXFjYjE1I2HdJ1Hr1pG5pWFn9HEnA+ECwdD0MsGLlnG5dSFnpEEWc6DyMXDDglFCwdECgaDiQYDaGifJubc5KSZ3t7SqGiffz+ff7+cfv+V/r9NGFiKZSUavz+dP7+b/v+X/r9QPn9JPn9FUxNFn1+Tvv+U/v+Tfr9Mfn9G+ToE8nMED0+Em5uOfn9J/n9Ge/zE9jbEa6uDpqcDDY2EFJSGM/SELq9D5iaDH1/Cm5wCSssDENDE7a5D5eXDHh6CWVnCCMjCjc4ECwrDSgoCyQkCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgBlACwAAAAACAAIAAAHPIBlZQAAAgOCgwQKBg2HAAQEDA0aFQgRBhIHFRYXLhkaGxwdHiQgIR0iKSQlJi9lCB4qKywtiC4vL2KCgQAh+QQFCgBlACwAAAAACAAIAAAHO4BlZTY2NDWCgzc9OUCHNjc3P0BNSDtEOUU6SElKYUyUT1BRV1NUUFVWV1hZWmVUXF1eX2SIU2JkU4KBADs=";

function getRealURL(urlID) {
    var theURL, link;
    link = document.querySelector('a[slID="' + urlID + '"]');
    theURL = link.getAttribute('data-full-url');
    var plusBox = document.getElementById('bsl' + urlID.substr(2));
    plusBox.innerHTML = '<img title="Click to fetch full URL" style="width:8px;height:8px;padding:2px;border:none" src="' + b3 + '" alt="[+]">';
    GM_xmlhttpRequest({
        method: "HEAD",
        url: theURL,
        headers: {
            "User-Agent": "monkeyagent",
            "Accept": "text/monkey,text/xml"
        },
        onload: function (content) {
            var minusBox = document.createElement('a');

            link.setAttribute('smgm_origURL', link.innerHTML);
            link.setAttribute('smgm_origfURL', theURL);
            var newLink = link.cloneNode(true);

            // URL Fix
            content.finalUrl = urlFix(content.finalUrl)

            newLink.href = content.finalUrl;
            newLink.innerHTML = content.finalUrl;
            link.parentNode.replaceChild(newLink, link);

            minusBox.innerHTML = '<img title="Click to collapse back to shortened URL" style="width:8px;height:8px;padding:2px;border:none" src="' + b2 + '" alt="[-]">';
            minusBox.href = "javascript:void(0);";
            minusBox.id = 'bsl' + urlID.substr(2);
            minusBox.addEventListener("click", function () {
                this.innerHTML = '<img title="Click to fetch full URL" style="width:8px;height:8px;padding:2px;border:none" src="' + b1 + '" alt="[+]">';
                var aLink = document.querySelector('a[slID="' + this.id.substr(1) + '"]');
                aLink.setAttribute('data-full-url', aLink.getAttribute('smgm_origfURL'));
                aLink.innerHTML = aLink.getAttribute('smgm_origURL');
                aLink.href = aLink.getAttribute('smgm_origfURL');
                aLink.target = "_blank";
                this.addEventListener("click", function () {
                    getRealURL(this.id.substr(1));
                }, false);
            }, false);
            plusBox.parentNode.replaceChild(minusBox, plusBox);
        }
    })
}

// Fixes for URL Shortener Services
function urlFix(url) {
    // OneDrive
    if (url.indexOf("onedrive.live.com/pagenotfounderror.aspx?cid=") != -1) {
        url = url.replace("onedrive.live.com/pagenotfounderror.aspx?cid=", "onedrive.live.com/?cid=");
        url = url.replace("&resid=", "&id=");
    }
    if (url.indexOf("onedrive.live.com/pagenotfounderror.aspx?page=") != -1) {
        url = url.replace("onedrive.live.com/pagenotfounderror.aspx?page=", "onedrive.live.com/");
        url = url.replace("&resid=", "?resid=");
    }
	 if (url.indexOf("onedrive.live.com/pagenotfounderror.aspx?resid=") != -1) {
        url = url.replace("onedrive.live.com/pagenotfounderror.aspx", "onedrive.live.com/view.aspx");
        url = url.replace("&resid=", "?resid=");
    }
	return url;
}

function unescapeHTML(s) {
    return s.replace('&amp;', '&').replace('&lt;', "<").replace('&gt;', '>').replace('&quot;', '1"').replace('&#39;', '\'');
}

// Scan and Process All Links
function LinkHunter(event) {	
	// Get Node
	if (!event)
		var node = document.body;
	else
		var node = event.target;
		
	// Verify that Node is DOM Element
	if (node && node.getElementsByTagName)
	{
		var links = node.getElementsByTagName("a");
		for (var i = 0; i < links.length; i++) 
		{
			LinkProcesser(links[i]);
		}
	}	
}

// Match Link URL Against URL Shortener Services and Add URL Toggle
var lc = 0;
var LinkProcesser = function (node) {
    var urls = GM_getValue("urllist", urllistdefault).split('\n');
    for (var i = 0; i < urls.length; i++) {
        if (node.href.match("/" + urls[i].replace(".", "\.") + "/")) {
            if (node.className.match(/\bsmgm_usTitle\b/) == null && node.innerHTML.indexOf('<img') < 0) {
                lc++;
                var plusBox = document.createElement('a');
                node.setAttribute('slID', 'sl' + lc);
                if (node.getAttribute('data-full-url') == null) node.setAttribute('data-full-url', node.href);
                plusBox.innerHTML = '<img title="Click to fetch full URL" style="width:8px;height:8px;padding:2px;border:none" src="' + b1 + '" alt="[+]">';
                plusBox.href = "javascript:void(0);";
                plusBox.id = "bsl" + lc;
                plusBox.addEventListener("click", function () {
                    getRealURL(this.id.substr(1));
                }, false);
                node.parentNode.insertBefore(plusBox, node.nextSibling);
                (node.className == "") ? node.className = "smgm_usTitle" : node.className = node.className + " smgm_usTitle";
            }
        }
    }
};

// Add Event When a DOM Element is Added
document.addEventListener('DOMNodeInserted', LinkHunter, false);

// Parse All DOM Elements Present on Page Load for Links
LinkHunter();