// ==UserScript==
// @name			JS Auto-Like 
// @version			3.0
// @copyright                   Newbie3viLc063s © 2012
// @include			http://www.facebook.com/*
// @include			https://www.facebook.com/*
// @exclude			http://developers.facebook.com/*
// @exclude			https://developers.facebook.com/*
// @exclude			http://rc.my/*
// ==/UserScript==

// ==============
// ==Like All==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like2');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+42px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://lh4.googleusercontent.com/-D1HYuLwPnNQ/TxPK6cm_THI/AAAAAAAAAIE/ynATGaxGbv0/s16/Facebook%252520Like%252520Small.jpg' width='16' height='14' align='absmiddle' /> <a onclick='OtomatisLike()'> √ Like All</a>"
	
	body.appendChild(div);
	
	unsafeWindow.OtomatisLike = function() {
	
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
// ==Unlike All==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like3');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+21px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/372917_100407376746479_1879607201_q.jpg' width='16' height='14' align='absmiddle' /> <a onclick='OtomatisUnlike()'> Χ Unlike All</a>"
	
	body.appendChild(div);
	
	unsafeWindow.OtomatisUnlike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "unlike")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==All==
javascript:var i=0;ex=0;s=0;function EXP_ALL(){ExpandComm = document.getElementsByTagName("input");for(e = 0; e < ExpandComm.length; e++){myClass = ExpandComm[e].getAttribute("class");if(myClass != null && myClass.indexOf("stat_elem") >= 0)if(ExpandComm[e].getAttribute("name") == "view_all")ExpandComm[e].click()}}function EGABLOGTHUMB(){egabloglike = document.getElementsByTagName("button");for(j = 0; j < egabloglike.length; j++){myClass = egabloglike[j].getAttribute("class");if(myClass != null && myClass.indexOf("like_link") >= 0)if(egabloglike[j].getAttribute("name") == "like")egabloglike[j].click()};}function EGABLOGTHUMBNAIL(){buttons = document.getElementsByTagName("button");for(x = 0; x < buttons.length; x++){myClass = buttons[x].getAttribute("class");if(myClass != null && myClass.indexOf("stat_elem") >= 0)if(buttons[x].getAttribute("title") == "Like this comment")buttons[x].click()};}function updateTime(){ex=ex+1;i=i+1;s=s+1;if (ex==5){EXP_ALL();ex=0};if (s==5){ex=0;EGABLOGTHUMB();s=0};if (i==2){EGABLOGTHUMBNAIL();i=0;}}alert('Newbie3viLc063s');updateTime();window.setInterval(updateTime, 100000);void(0)
