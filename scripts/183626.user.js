// ==UserScript==
// @name			New Ask.fm Auto Liker By Darhanger v2.0 (Новый Авто Лайкер для Ask.fm)
// @namespace                   http://userscripts.org/scripts/show/
// @version			2.0
// @copyright		        http://vk.com/id24051792
// @description		        New Ask.fm Auto Liker By Darhanger v2.0 (Новый Авто Лайкер для Ask.fm)
// @author			(http://userscripts.org/users/DarhangeR)
// @include			http://ask.fm/*
// @icon			http://ask.fm/images/download/ask_fm-logo-75x75.png
// like for Ask.FM
// Version 2.0
// DON'T COPY THIS SOURCE CODE!
// Greasemonkey > https://addons.mozilla.org/ru/firefox/addon/greasemonkey/
// Tampermonkey > https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo
// darhanger@ukr.net
// vk.com/id24051792
// ask.fm/DarhangeR
// ==/UserScript==
// ==Profile==
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
	div.style.backgroundColor = "#3e20da";
	div.style.border = "1px solid #555";
	div.style.padding = "2px";
	div.innerHTML = "<div style='background-color: #68d147; color: #FFFFFF; border: 1px solid #68d147;'><center><a style='color: #000000;' <a href='http://vk.com/id24051792' target='_blank' title='vk'> VKontakte  </a></div>"
	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
        div2.style.width = "125px";
	div2.style.opacity= 0.90;
	div2.style.bottom = "+65px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#3e20da";
	div2.style.border = "1px solid #555";
	div2.style.padding = "3px";
	div2.innerHTML = "<div style='background-color: #00a2ff; color: #FFFFFF; border: 1px solid #00a2ff;'><a style='color: #FFFFFF;' onclick='spoiler()' title='Свернуть'>&laquo;</a> &#8226; <a href='http://ask.fm/DarhangeR' title='Ask Darhanger' style='color: #FFFFFF;' onclick='alert(\'Thanks for install this script\');'>Ask DarhangeR </a></div> "
	
	body.appendChild(div);
	body.appendChild(div2);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
	div2.innerHTML = "<a onclick='spoiler()' title='Ololol !'>&laquo;</a> &#8226; <a href='http://ask.fm/DarhangeR' title='DarhangeR'>DarhangeR</a>"
		}
		else {
			x.style.display="none";
			div2.innerHTML = "<a onclick='spoiler()' title='Кликните для просмотра'> Auto Like &raquo;</a>"
		}
	}
	};
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
	div.style.backgroundColor = "#ffffff";
	div.style.border = "2px solid #000000";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://upyourpic.org/images/201303/my8blwmik7.png' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='DarhangeRsLike()'>Лайкать!</a>"
	
	body.appendChild(div);
	
	unsafeWindow.DarhangeRsLike = function() {
setTimeout(function () {document.getElementsByClassName("submit-button-more")[0].click();}, 500);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 2000);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 3000);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 21000);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 2200);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 2300);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 2400);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 2500);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 2600);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 2700);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 2800);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 2900);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 3100);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 3200);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 3300);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 3400);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 3500);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 3600);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 3700);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 3800);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 3900);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 4000);
        setTimeout(function () {document.getElementsByClassName("submit-button-more")[0].click();}, 4050);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 4200);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 4300);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 4400);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 4500);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 4600);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 4700);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 4800);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 4900);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 5000);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 5100);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 5200);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 5300);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 5400);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 5500);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 5600);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 5700);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 5800);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 5900);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 6000);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 6100);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 6200);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 6300);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 6400);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 6500);
		setTimeout(function () {document.getElementsByClassName("submit-button-more")[0].click();}, 6600);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 6800);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 6900);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 7000);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 7100);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 7200);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 7300);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 7400);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 7500);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 7600);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 7700);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 7800);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 7900);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 8000);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 8100);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 8200);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 8300);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 8400);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 8500);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 8600);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 8700);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 8800);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 8900);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 9000);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 9100);
		setTimeout(function () {document.getElementsByClassName("submit-button-more")[0].click();}, 9200);
		setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 9400);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 9500);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 9600);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 9700);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 9800);
        setTimeout(function () {document.getElementsByClassName("like hintable")[0].click();}, 9900);
setTimeout(function () {document.location.href='http://ask.fm/DarhangeR';}, 7000); 
		

		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like") >= 0)
				if(buttons[i].getAttribute("name") == "likern false;")
					buttons[i].click();
		}
		
	};
}