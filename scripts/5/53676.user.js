// ==UserScript==
// @name           done bal display
// @namespace      #aVg request by jiguda
// @include        http://www.google.com/firefox
// ==/UserScript==
var home = "http://www.donecard.com/Index-1.aspx";
var info = document.createElement("div");
info.setAttribute("style", "border: 1px solid black;position:absolute;right:2px;top:2px;background:white;padding:2px;");
document.body.appendChild(info);
GM_xmlhttpRequest({
	url : home,
	method : "GET",
	onload : function(B) {
		GM_xmlhttpRequest({
			url : home,
			method : "POST",
			data : "__LASTFOCUS=&__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE="+encodeURIComponent(B.responseText.match(/VIEWSTATE" value="([^"]+)/)[1])+"&txtCardNo=30993749394151&txtPwd=1916&btnGo.x=15&btnGo.y=8",
			headers : {
				"Content-Type" : "application/x-www-form-urlencoded"
			},
			onload : function(A) {
				try {
					info.textContent = "DoneCard(Rs.): " + A.responseText.match(/g" class="standard-header" style="display:inline-block;width:112px;">([^<]+)/)[1];
				} catch(e) {
					info.textContent = "Something went wrong!\n\n" + e;
				}
			}
		});
	}
});