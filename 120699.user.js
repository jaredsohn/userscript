// ==UserScript==
// @name           Funny FB
// @include        *facebook*
// @version        1.0
// ==/UserScript==

body = document.body;
if(body != null) {

        div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "300px";
	div.style.left = "0px";
	div.style.color = "#888";
	div.style.border = "0px solid #888";
	div.style.zIndex = "999999";
	div.style.padding = "0px";
        div.innerHTML = "<a target=\"_blank\" href=\"http://shiftdelete.net/facebook-mesaj-gonderme-numarasi-33870.html\"><img title=\"Good :)\" src=\"http://img.webme.com/pic/b/bedavasayfa/1z1h98y.gif\"></img>"
	
    body.appendChild(div); 
}