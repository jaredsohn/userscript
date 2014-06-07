// ==UserScript==
// @name           Auto Like Google+
// @namespace      OtomatisLike ver.1.0
// @description    Auto Like for google pluser
// @include        https://plus.google.com/*
// ==/UserScript==

// ==============
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','+1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+62px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://t2.gstatic.com/images?q=tbn:ANd9GcQfTmxR1ix3EpGZJrJ2W6dzcIkGuujtYWDtVsRT1EoEWUMARoY1' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='Otomatis+1()'>harry</a>"
	
	body.appendChild(div);

//buat fungsi tunda
	function tunda(onehundredSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + onehundredSeconds); 
}

	
	unsafeWindow.Otomatis+1 = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("+1_link") >= 0)
				if(buttons[i].getAttribute("name") == "+1")
					buttons[i].click();
		}
		
	};
}
