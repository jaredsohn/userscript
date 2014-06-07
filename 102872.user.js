// ==UserScript==
// @name           Dalsi skript moj
// @namespace      idem
// @description    pokusim sa olajkovat vsetko
// @include        http://www.facebook.com/*
// ==/UserScript==

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+72px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoLike()\">Like all Statuses</a>"
	
	body.appendChild(div);
	
function pauseJS(timeInMilliS) {
var date = new Date();
var curDate = null;
do { curDate = new Date(); }
while(curDate-date < timeInMilliS);
}

	unsafeWindow.AutoLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0){
				if(buttons[i].getAttribute("name") == "like") {
                                        pauseJS(1500);
                                        buttons[i].click();
                                }
                        }
		}
		
	};
}