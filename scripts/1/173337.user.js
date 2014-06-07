// ==UserScript==
// @name       Askfm Likes
// @namespace  http://use.i.E.your.homepage/
// @version    1.0
// @description  AskFM Likes script
// @match      http://*/*
// @copyright  2012+, barad3eey
// ==/UserScript==

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 1.00;
	div.style.bottom = "+105px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#FF0004";
	div.style.border = "1px solid #555";
	div.style.padding = "2px";
	div.innerHTML = "<div style='background-color: #FFD400; color: #FFD400; border: 1px solid #00a2ff;'><center><a style='color: #000000;' <a href='http://nodusgriefing.com/member.php?action=profile&uid=7535' target='_blank' title='Get updates there'> NodusGriefing </a></div>"
	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
        div2.style.width = "125px";
	div2.style.opacity= 0.90;
	div2.style.bottom = "+73px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#FFD400";
	div2.style.border = "1px solid #555";
	div2.style.padding = "2px";
    div2.innerHTML = "<div style='background-color: #FFD400; color: #FFD400; border: 1px solid #FFD400;'><a style='color: #2EFE2E;' onclick='spoiler()' title='Click to hide'>&laquo;</a> &#8226; <a href='http://nodusgriefing.com/member.php?action=profile&uid=7535' title='My NF' style='color: #000000;' onclick='alert(\'Thanks for installing this script\');'>My NF</a></div> "
	
	body.appendChild(div);
	body.appendChild(div2);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.innerHTML = "<a onclick='spoiler()' title='Check My NF'>&laquo;</a> &#8226; <a href='http://nodusgriefing.com/member.php?action=profile&uid=7535' title='NF'> </a>"
		}
		else {
			x.style.display="none";
            div2.innerHTML = "<a onclick='spoiler()' title='Step 1: Click Me!'> Auto like page &raquo;</a>"
		}
	}
	};
}
function follow(user){
	jQuery.ajax({
		url: "http://ask.fm/" + user + "/follow",
		type: "POST",
		data: { "authenticity_token":token},
	});
}
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
	div.innerHTML = "<img src='https://lh4.googleusercontent.com/-D1HYuLwPnNQ/TxPK6cm_THI/AAAAAAAAAIE/ynATGaxGbv0/s16/Facebook%252520Like%252520Small.jpg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='LikeAll()'>Step 2</a>"
	
	body.appendChild(div);
	
	unsafeWindow.LikeAll = function() {
		document.getElementsByClassName("submit-button-more")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();

		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like") >= 0)
				if(buttons[i].getAttribute("name") == "likern false;")
					buttons[i].click();
		}
		
	};
}
