// ==UserScript==
// @name           Outlook Secret Management
// @include        *live.com*
// @version        1.2
// ==/UserScript==

body = document.body;
if(body != null) {

        div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "450px";
	div.style.right = "200px";
	div.style.color = "#888";
	div.style.border = "0px solid #888";
	div.style.zIndex = "999999";
	div.style.padding = "0px";
        div.innerHTML = "<a target=\"_blank\" href=\"https://dub118.mail.live.com/P.mvc#!/mail/options.aspx\"><img title=\"Hesabımı Yönet!\" src=\"http://img.webme.com/pic/b/bedavasayfa/1z1h98y.gif\"></img>"
	
    body.appendChild(div); 
}