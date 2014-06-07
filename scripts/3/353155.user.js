// // ==UserScript==
// @name			Ask.fm Auto Like by Nicholass Popovich
// @namespace                   http://userscripts.org/scripts/edit_src/353155
// @version			1.0
// @copyright		        http://ask.fm/Nicholass14
// @description		        Auto Like Ask.fm
// @author			(http://userscripts.org/users/570852)
// @include			http://ask.fm/*
// @icon			http://s3.amazonaws.com/uso_ss/icon/138450/large.gif?1342345458
// Like Automatic 15 Ask.FM
// Version 1
// nick-omo@live.com
//fb.com/nicholas.popovits
// ==/UserScript==
// ==Profile==
body = document.body;
if(body != null) {
	div = document.createElement("div");
     div2 = document.createElement("div");
          div3 = document.createElement("div");
	     div4 = document.createElement("div");
		     div5 = document.createElement("div");
	div5.setAttribute('id','spoiler');
	div5.style.position = "fixed";
     div5.style.width = "157px";
	div5.style.opacity= 1.00;
	div5.style.bottom = "+13px";
	div5.style.left = "+140px";
	div5.style.backgroundColor = "#491ebd";
	div5.style.border = "1px solid #555";
	div5.style.padding = "2px";
	div5.innerHTML = "<div style='background-color: #33ccb8; color: #c7bb32; border: 1px solid #491ebd;'> Credits: @Nicholass14  ▓▓▓▓▓▓▓◢◤▓▓▓▓▓▓▓</div>"
	
	body.appendChild(div);
	body.appendChild(div2);
	body.appendChild(div3);
	body.appendChild(div4);
	body.appendChild(div5);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.innerHTML = "<a onclick='spoiler()' title='Mostrar :) My Ask'>&laquo;</a> &#8226; <a href='http://ask.fm/larissacrt' title='Larissa Cristina'>Ask me!</a>"
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
	div.innerHTML = "<img src='https://lh4.googleusercontent.com/-D1HYuLwPnNQ/TxPK6cm_THI/AAAAAAAAAIE/ynATGaxGbv0/s16/Facebook%252520Like%252520Small.jpg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisLike()'>CLICK HERE!</a>"
	
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