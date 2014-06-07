// ==UserScript==
// @name           Google Search Link Copier
// @namespace      tgr
// @description    A simple script to clean urls of the result links on the Google Search page
//                 An onmousedown event handler changes those urls to point to www.google.*/url?... to count clicks
//                 which can be extremely annoying because it messes up right-click "copy link location" functionality. This is based on http://userscripts.org/scripts/show/9482, but allows google web history. 
//                 This script installs a second event handler which instantly restores the original url
// @include        http://www.google.co*/search?*
// ==/UserScript==

var linkList = document.getElementsByClassName("l");
for(var i = 0; i < linkList.length; i++) {
    var link = linkList[i];
    link.setAttribute("title", link.getAttribute("href"));
    link.addEventListener("mousedown", function(e){
        var link = e.currentTarget;
        if (e.button === 0){
            link.setAttribute("syndicateUrl", link.href);
            link.setAttribute("href",link.getAttribute("title"));
            link.addEventListener("click", function(e){
                e.currentTarget.href = e.currentTarget.getAttribute("syndicateUrl");
            },false);
        }
        link.href = link.title;
    }, false);
}


function scriptCheckVersion() {
	var scriptPage = "24200";
	var scriptVersion = "2";

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