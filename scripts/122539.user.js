// ==UserScript==
// @name           Facebook AutoLike
// @namespace      AutoLike
// @description    Autolike Facebook STATUS
// @include        http://www.facebook.com/*
// ==/UserScript==

// ==Credits==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+90px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"/lukmanlatopaz\">Created By Lukman's</a>"
	
	body.appendChild(div);
}
// ==============
// ==============
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+60px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:var i=0;ex=0;s=0;function EXP_ALL(){ExpandComm = document.getElementsByTagName("input");for(e = 0; e < ExpandComm.length; e++){myClass = ExpandComm[e].getAttribute("class");if(myClass != null && myClass.indexOf("stat_elem") >= 0)if(ExpandComm[e].getAttribute("name") == "view_all")ExpandComm[e].click()}}function JEMPOLERS(){jempol = document.getElementsByTagName("button");for(j = 0; j < jempol.length; j++){myClass = jempol[j].getAttribute("class");if(myClass != null && myClass.indexOf("like_link") >= 0)if(jempol[j].getAttribute("name") == "like")jempol[j].click()};}function JEMPOLERC(){buttons = document.getElementsByTagName("button");for(x = 0; x < buttons.length; x++){myClass = buttons[x].getAttribute("class");if(myClass != null && myClass.indexOf("stat_elem") >= 0)if(buttons[x].getAttribute("title") == "Like this comment")buttons[x].click()};}function updateTime(){ex=ex+1;i=i+1;s=s+1;if (ex==5){EXP_ALL();ex=0};if (s==5){ex=0;JEMPOLERS();s=0};if (i==2){JEMPOLERC();i=0;}}alert('-==[Like Seribu Status]==-\n\nScript by -lukmanlatopaz01@yahoo.com-');updateTime();window.setInterval(updateTime, 1000);void(0)\">Klik Like ALL Status</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "like")
					buttons[i].click();

		}
		
	};

}
// ==============
// ==============