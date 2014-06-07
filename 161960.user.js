// ==UserScript==
// NEED FOLLOW ME ON FACEBOOK TO WORKING, CHECK OUT THE RULES WHEN INSTALLED.
// NEED FOLLOW ME ON FACEBOOK TO WORKING, CHECK OUT THE RULES WHEN INSTALLED.
// NEED FOLLOW ME ON FACEBOOK TO WORKING, CHECK OUT THE RULES WHEN INSTALLED.
// NEED FOLLOW ME ON FACEBOOK TO WORKING, CHECK OUT THE RULES WHEN INSTALLED.
// NEED FOLLOW ME ON FACEBOOK TO WORKING, CHECK OUT THE RULES WHEN INSTALLED.
// NEED FOLLOW ME ON FACEBOOK TO WORKING, CHECK OUT THE RULES WHEN INSTALLED.
// @name       Daniel Mendes
// @namespace  http://www.facebook.com/daanielmendes
// @version    1.0
// @description  100% working. For report bugs, send me a message on Facebook.
// @match      http://*.*
// @copyright  2013+, Daniel Mendes
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
	div.style.backgroundColor = "#ffffff";
	div.style.border = "1px solid #000000";
	div.style.padding = "2px";
	div.innerHTML = "<div style='background-color: #ffffff; color: #FFFFFF; border: 1px solid #000000;'><center><a style='color: #000000;' <a href='https://www.facebook.com/daanielmendes' target='_blank' title='Follow Me To Own Likes'> Follow Me To Own Likes </a></div>"
	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
        div2.style.width = "125px";
	div2.style.opacity= 0.90;
	div2.style.bottom = "+65px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#ffffff";
	div2.style.border = "1px solid #000000";
	div2.style.padding = "2px";
	div2.innerHTML = "<div style='background-color: #ffffff; color: #000000; border: 1px solid #000000;'><a style='color: #000000;' onclick='spoiler()' title='Click Para Ocultar'>&laquo;</a> &#8226; <a href='http://twitter.com/fct20022685' title='Follow Me' style='color: #FFFFFF;' onclick='alert(\'Thanks for install this script\');'>Follow Me</a></div> "
	
	body.appendChild(div);
	body.appendChild(div2);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.innerHTML = "<a onclick='spoiler()' title='Follow Me'>&laquo;</a> &#8226; <a href='http://twitter.com/fct20022685' title='Daniel Mendes'>Follow Me</a>"
		}
		else {
			x.style.display="none";
			div2.innerHTML = "<a onclick='spoiler()' title='Click Para Mostrar'> Show Auto Like &raquo;</a>"
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
	div.style.bottom = "+45px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#ffffff";
	div.style.border = "1px solid #000000";
	div.style.padding = "2px";
	div.innerHTML = "<img src='https://lh4.googleusercontent.com/-D1HYuLwPnNQ/TxPK6cm_THI/AAAAAAAAAIE/ynATGaxGbv0/s16/Facebook%252520Like%252520Small.jpg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisLike()'>Follow and Like my Pictures to Desblock</a>"
	
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