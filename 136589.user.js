// ==UserScript==
// @name           Kaki Like Facebook
// @namespace      Kaki Like
// @description    Automaticly like facebook status and comments
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @version        0.4.7
// ==/UserScript==

body = document.body;
if(body != null) {
	var twsis= "";
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+50px";
	div.style.left = "+12px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#000000\" TARGET='_blank' href='https://www.facebook.com/boy.dineleza' title='Boy Nordin'><img src='http://blog.flamingtext.com/blog/2011/11/28/flamingtext_com_1322484084_16230.gif' height='30' width='120'></img></a>"
	
	body.appendChild(div);
		
}

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+20px";
	div.style.left = "+15px";
	div.style.padding = "2px";
	div.innerHTML = "<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="180" height="60" bgcolor="#FFFFFF">
<param name="movie" value="http://www.museter.com/ffmp3-config.swf" />
<param name="flashvars" value="url=http://87.117.197.189:9626/;&lang=en&codec=mp3&volume=65&introurl=&autoplay=true&traking=true&jsevents=false&buffering=5&skin=http://www.museter.com/skins/mcclean/ffmp3-mcclean.xml&title=Radio%20Boy Nordin&welcome=Setia%20Di Hati" />
<param name="wmode" value="window" />
<param name="allowscriptaccess" value="always" />
<param name="scale" value="noscale" />
<embed src="http://www.museter.com/ffmp3-config.swf" flashvars="url=http://87.117.197.189:9626/;&lang=en&codec=mp3&volume=65&introurl=&autoplay=true&traking=true&jsevents=false&buffering=5&skin=http://www.museter.com/skins/mcclean/ffmp3-mcclean.xml&title=Radio%20Boy Nordin&welcome=Setia%20Di Hati" width="180" scale="noscale" height="60" wmode="window" bgcolor="#FFFFFF" allowscriptaccess="always" type="application/x-shockwave-flash" />
</embed></object><br/>Request lagu di <a href="http://radioboynordin.wapsite.me/" target="_blank">SINI</a>"


body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+20px";
	div.style.left = "+15px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FFFFFF\" href=\"JavaScript:AutoLike()\"><img src=http://b2nplen.netai.net/images/likev.gif height=20 width=20 alt='Like Post or Status' title='Like Post or Status'</img></a>"
	
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

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+20px";
	div.style.left = "+45px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FFFFFF\" href=\"JavaScript:AutoUnLike()\"><image src=http://b2nplen.netai.net/images/unlike.gif height=20 width=20 alt='UnLike Post or Status' title='UnLike Post or Status'></a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoUnLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "unlike")
					buttons[i].click();
		}
		
	};
}



body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+20px";
	div.style.left = "+75px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FFFFFF\" href=\"JavaScript:AutoExpand()\"><img src=http://b2nplen.netai.net/images/expandindex.jpg height=20 width=20 alt='Expand Comment' title='Expand Comment'</img></a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpand = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all[1]")
					buttons[i].click();
		}
		
	};
}

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+20px";
	div.style.left = "+105px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FFFFFF\" href=\"JavaScript:AutoLikeC()\"><img src=http://b2nplen.netai.net/images/likecommentb.gif height=20 width=20 alt='Like Comment' title='Like Comment'</img></a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLikeC = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("title") == "Like this comment")
					buttons[i].click();
		}
		
	};
}