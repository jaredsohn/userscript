// ==UserScript==
// @name           Google Custom Search Helper
// @namespace      com.blogspot.dy-verse
// @description    Adds a Google Custom Search box on the right of normal search results
// @include        http://www.google.com/search*
// @include        http://www.google.co.in/search*
// ==/UserScript==

// Checks if there is a new script version according to the version information in the script homepage
// The version information is in a line in the full description of the script: "<p>#[V:00000000]#</p>" (00000000 is the version number)
// If the request is successful and there is a new version available, a message to the user is displayed

function scriptCheckVersion() {
var scriptPage = "43542";
var scriptVersion = "1";

var scriptHomepageURL = "http://userscripts.org/scripts/show/__SCRIPT__".replace(/__SCRIPT__/g,scriptPage);
var scriptFileURL = "http://userscripts.org/scripts/source/__SCRIPT__.user.js".replace(/__SCRIPT__/g,scriptPage);
GM_xmlhttpRequest({
method: "GET",
url: scriptHomepageURL,
onload: function(evt) {
if ((evt.readyState == 4) && (evt.status == 200)) {
var responseMatch = evt.responseText.match(/<p>#\[V:(\d+)]#<\/p>/);
var remoteVersion = (responseMatch === null) ? NaN : parseInt(responseMatch[1], 10);
if (isNaN(remoteVersion)) return;
if (remoteVersion <= scriptVersion) {
return;
}
var messageDiv = document.getElementById("gsscriptVersionMessage");
if (messageDiv) {
messageDiv.style.display = "";
}
else {
messageDiv = document.createElement("div");
messageDiv.id = "gsscriptVersionMessage";
messageDiv.style.border = "SOLID 1px BLACK";
messageDiv.style.backgroundColor = "RED";
messageDiv.style.fontSize = "1.2em";
messageDiv.style.padding = "10px";
messageDiv.style.left = 0;
messageDiv.style.top = 0;
messageDiv.style.zIndex= 1000000;
messageDiv.style.position = "absolute"
messageDiv.innerHTML = "<center>A new version is available<br><br>" +
"<a id='gsscriptVersionMessageInstall' href='" + scriptFileURL + "' title='Install the script update'>Install</a>" +
"&nbsp;|&nbsp;<a href='" + scriptHomepageURL + "' target='_blank' title='Go to homepage'>Go to web page</a>" +
"&nbsp;|&nbsp;<a id='gsscriptVersionMessageHide' href='javascript:void(null)' title='Hide the notice for this session'>Hide</a></center>";
document.body.appendChild(messageDiv);
document.getElementById("gsscriptVersionMessageHide").addEventListener("click", function(evt) {
var messageDiv = document.getElementById("gsscriptVersionMessage");
if (messageDiv){
messageDiv.style.display = "none";
}
}, false);
}
}
}
});
}


scriptCheckVersion();


var cseId = "015234417013400136983:od9d_pobr4q"
var csResults = document.createElement("div");
resultsDiv = document.getElementById("center_col");
document.getElementById("cnt").maxWidth = window.innerWidth + "px";
resultsDiv.parentNode.insertBefore(csResults, resultsDiv);
csResults.style.position = "absolute";
csResults.style.width = "400px";
csResults.style.marginLeft = (window.innerWidth - 562) + "px";

var cseUrl = "http://www.google.com/cse?ie=UTF-8&sa=Search&"
var qs = location.search.substring(1);
var nv = qs.split('&');
var url = new Object();
for (i = 0; i < nv.length; i++) 
{
    eq = nv[i].indexOf('=');
    url[nv[i].substring(0, eq).toLowerCase()] = unescape(nv[i].substring(eq + 1));
}

cseUrl = cseUrl + ["start=" + url.start, "q=" + url.q, "cx=" + cseId].join("&");

GM_xmlhttpRequest(
{
    method: "GET",
    "url": cseUrl,
    headers: 
    {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails)
    {
        csResults.innerHTML = responseDetails.responseText.replace("id=res", "id=cse_res").replace("id=navbar", "id=cse_navbar");
        csResults.innerHTML = document.getElementById("cse_res").innerHTML;
        var ads = document.getElementById("mbEnd")
        if (ads != null ) 
        {
            ads.innerHTML = ""
        }
    }
});



