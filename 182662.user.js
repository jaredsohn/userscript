// ==UserScript==
// @name			auto follow
// @namespace                   http://userscripts.org/scripts/show/9099999
// @version			1.0
// @copyright		        http://ask.fm/r0ka
// @description		        Auto follow ask.fm
// @include		http://ask.fm/*
// @icon			http://s3.amazonaws.com/uso_ss/icon/138450/large.gif?1342345458
// Like Automatico  Ask.FM
// Version numero 2

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
	div.style.backgroundColor = "#ff00ae";
	div.style.border = "1px solid #555";
	div.style.padding = "2px";
	div.innerHTML = "<div style='background-color: #80a0ff; color: #FFFFFF; border: 1px solid #00a2ff;'><center><a style='color: #000000;' <a href='https://twitter.com/la_yaleeq' target='_blank' title='Agregame  para agradecerme :)'> My twitter</a></div>"
	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
        div2.style.width = "125px";
	div2.style.opacity= 0.90;
	div2.style.bottom = "+65px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#000020";
	div2.style.border = "1px solid #555";
	div2.style.padding = "2px";
	div2.innerHTML = "<div style='background-color: #80a0ff; color: #ffffff; border: 1px solid #ffffff;'><a style='color: #ffffff;' onclick='spoiler()' title='Click Para Ocultar'>&laquo;</a> &#8226; <a href='http://ask.fm/r0ka' title='Preguntame :)' style='color: #0000ff;' onclick='alert(\'Thanks for install this script\');'>  r0ka </a></div> "
	
	body.appendChild(div);
	body.appendChild(div2);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.innerHTML = "<a onclick='spoiler()' title='Mostrar :) Mi Ask Azizan-alfhd'>&laquo;</a> &#8226; <a href='http://ask.fm/r0ka' title='Azizan-alfhd'>!</a>"
		}
		else {
			x.style.display="none";
			div2.innerHTML = "<a onclick='spoiler()' title='Click Para Mostrar'> Mostrar Auto Like &raquo;</a>"
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
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://upload.wikimedia.org/wikipedia/commons/1/13/Facebook_like_thumb.png' width='18' height='16' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisLike()'>أضغط هنا !</a>"
	
	body.appendChild(div);
	
	unsafeWindow.OtomatisLike = function() {
		document.getElementsByClassName("submit-button-more")[0].click();
		document.getElementsByClassName("javascript:void(0)")[0].click();
		document.getElementsByClassName("javascript:void(0)")[0].click();
		document.getElementsByClassName("javascript:void(0)")[0].click();
		document.getElementsByClassName("javascript:void(0)")[0].click();
		document.getElementsByClassName("javascript:void(0)")[0].click();
		document.getElementsByClassName("javascript:void(0)")[0].click();
		document.getElementsByClassName("javascript:void(0)")[0].click();
		document.getElementsByClassName("javascript:void(0)")[0].click();
		document.getElementsByClassName("javascript:void(0)")[0].click();
		document.getElementsByClassName("javascript:void(0)")[0].click();
		document.getElementsByClassName("javascript:void(0)")[0].click();
		document.getElementsByClassName("javascript:void(0)")[0].click();
		document.getElementsByClassName("javascript:void(0)")[0].click();
		document.getElementsByClassName("javascript:void(0)")[0].click();
		document.getElementsByClassName("javascript:void(0)")[0].click();
		document.getElementsByClassName("javascript:void(0)")[0].click();
		document.getElementsByClassName("javascript:void(0)")[0].click();
		document.getElementsByClassName("javascript:void(0)")[0].click();
		document.getElementsByClassName("javascript:void(0)")[0].click();
		document.getElementsByClassName("javascript:void(0)")[0].click();
		document.getElementsByClassName("javascript:void(0)")[0].click();
		document.getElementsByClassName("javascript:void(0)")[0].click();
		document.getElementsByClassName("javascript:void(0)")[0].click();
		document.getElementsByClassName("javascript:void(0)")[0].click();
		document.getElementsByClassName("javascript:void(0)")[0].click();

		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like") >= 0)
				if(buttons[i].getAttribute("name") == "likern false;")
					buttons[i].click();
		}
		
	};
}