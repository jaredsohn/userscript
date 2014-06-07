// ==UserScript==
// @name			Ask.fm Auto Like by Miotix
// @version			1.0
// @copyright		        http://ask.fm/Miotix
// @description		        Auto Like Ask.fm
// @author			Daniel Miotto!
// @include			http://ask.fm/*
// @icon			http://www7.pic-upload.de/09.12.13/yhd3dbr1qyp.gif
// Version 1.0
// ==/UserScript==
// ==Profile==
 /*Copyright Daniel Miotto 2013
  */
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
	div.style.backgroundColor = "#C0C0C0";
	div.style.border = "1px solid #555";
	div.style.padding = "2px";
	div.innerHTML = "<div style='background-color: #C0C0C0; color: #FFFFFF; border: 1px solid #C0C0C0;'><center><a style='color: #000000;' <a href='https://www.facebook.com/miotix' target='_blank' title='To follow me :)'> My Facebook </a></div>"
	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
        div2.style.width = "125px";
	div2.style.opacity= 0.90;
	div2.style.bottom = "+65px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#C0C0C0";
	div2.style.border = "1px solid #555";
	div2.style.padding = "2px";
	div2.innerHTML = "<div style='background-color: #C0C0C0; color: #000000; border: 1px solid #C0C0C0;'><a style='color: #000000;' onclick='spoiler()' title='Click to ask :)'>&laquo;</a> &#8226; <a href='http://ask.fm/miotix' title='me :)' style='color: #000000;' onclick='alert(\'Thanks for install this script\');'>Follow me & send gift :D</a></div> "
	body.appendChild(div);
	body.appendChild(div2);
	
	unsafeWindow.spoiler = function() {
		var i;
                  i=0;
	while(i<=20) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.innerHTML = "<a onclick='spoiler()' title='Like something :) Mein Ask Miotix'>&laquo;</a> &#8226; <a href='http://ask.fm/Miotix' title='Miotix'>Preguntame!</a>"
		}
		else {
			x.style.display="none";
			div2.innerHTML = "<a onclick='spoiler()' title='Click to watch'> watch Auto Like &raquo;</a>"
		}
                i++;
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
	div.innerHTML = "<img src='http://www7.pic-upload.de/09.12.13/7kyjapcylb9.jpg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisLike()'>Like all!</a>"
	
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


