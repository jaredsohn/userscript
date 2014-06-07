// ==UserScript==
// @name           MinPizzeria spammer
// @namespace      Kuzmin @ userscripts.org
// @description    This shit spams messages. YEAH
// @include        http://weazear.com/minpizzeria/default.asp?page=view_member*
// ==/UserScript==

// SET THESE VARIABLES
modsId=["1","3","11","358","212"]; //The id values of mods.. so you don't send a message to them.. 

// DONT TOUCH THE CODE UNDER THIS POINT
url=window.location.href
id=url.split("&")[1].split("=")[1];
mod=false;

message = GM_getValue("message", false);
gmId = GM_getValue("id", 1);

if (!message) {
	GM_setValue("message", prompt("Vilket meddelande vill du spamma?",""));
	message = GM_getValue("message", false);
}

for (i in modsId) {
	if (id==modsId[i]) {
		mod=true;
	}
} 

if (!mod) {
	a = document.getElementsByTagName("a");
	for (i=0;i<a.length;i++) {
		url=a[i].href
		url=url.split("?");
		if (url[1]) {
			url=url[1].split("&");
		}
		if (url[0]=="page=answer") {
			whoTo=url[1].split("=")[1];
			var objHTTP;
			objHTTP = new XMLHttpRequest();
			objHTTP.open('POST',"save_gb.asp",false);
			objHTTP.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			objHTTP.send("till="+whoTo+"&text="+message);
		}
	}
}

gmId++;
GM_setValue("id",gmId);
window.location.href= "http://weazear.com/minpizzeria/default.asp?page=view_member&id="+gmId;