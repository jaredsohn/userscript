// ==UserScript==
// @name			Ask.fm Auto Curtidas João Marcelo Matos
// @namespace                   http://userscripts.org/scripts/show/155135
// @version			1.0
// @copyright		        http://ask.fm/joaomarcelomatos188
// @description		        Auto Curtidas JoãoMarceloMatos
// @author			http://www.facebook.com/Djmarcelosz
// @include			http://ask.fm/*
// @icon			http://s3.amazonaws.com/uso_ss/icon/138450/large.gif?1342345458
// Like Automatico Para Ask.FM
// Version numero 1
// Não Copiar demorei muito filho da desgraça
// http://www.facebook.com/Djmarcelosz
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
	div.style.backgroundColor = "#EE0000";
	div.style.border = "1px solid #555";
	div.style.padding = "2px";
	div.innerHTML = "<div style='background-color: #4EEE94; color: #FFFFFF; border: 1px solid #00a2ff;'><center><a style='color: #000000;' <a href='http://www.facebook.com/Djmarcelosz' target='_blank' title='Assinem Para agradecer :)'> Meu Facebook </a></div>"
	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
        div2.style.width = "125px";
	div2.style.opacity= 0.90;
	div2.style.bottom = "+80px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#ff00ae";
	div2.style.border = "1px solid #555";
	div2.style.padding = "2px";
	div2.innerHTML = "<div style='background-color: #00a2ff; color: #FFFFFF; border: 1px solid #00a2ff;'><a style='color: #FFFFFF;' onclick='spoiler()' title='Click Para Ocultar'>&laquo;</a> &#8226; <a href='http://ask.fm/joaomarcelomatos188' title='Perguntar' style='color: #FFFFFF;' onclick='alert(\'Thanks for install this script\');'>Perguntar</a></div> "
	div3 = document.createElement("div3");
	div3.setAttribute('id','Spoiler');
	div3.style.position = "fixed";
	div3.style.display = "block";
	div3.style.width = "125px"; 
	div3.style.opacity= 1.00;
	div3.style.bottom = "+130px";
	div3.style.left = "+6px";
	div3.style.backgroundColor = "#00FFFF";
	div3.style.border = "1px solid #555";
	div3.style.padding = "2px";
	div3.innerHTML = "<div style='background-color: #00FFFF; color: #FFFFFF; border: 1px solid #00a2ff;'><center><a style='color: #000000;' <a href='http://www.facebook.com/groups/zsssssss/' target='_blank' title='Grupo Para Divulgação :)'> Grupo</a></div>"
	body.appendChild(div);
	body.appendChild(div2);
        body.appendChild(div3);
	
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.innerHTML = "<a onclick='spoiler()' title='Mostrar :)Meu ask JoãoMarceloMatos'>&laquo;</a> &#8226; <a href='http://ask.fm/JoaoMarceloMatos188' title='JoãoMarceloMatos'>Pergunte!</a>"
		}
		else {
			x.style.display="none";
			div2.innerHTML = "<a onclick='spoiler()' title='Click Para Mostrar'> Mostrar auto curtir &raquo;</a>"
		}
	}
	};
}

// ==============
// ==Curtir Tudo==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like2');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+60px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='https://lh4.googleusercontent.com/-D1HYuLwPnNQ/TxPK6cm_THI/AAAAAAAAAIE/ynATGaxGbv0/s16/Facebook%252520Like%252520Small.jpg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisLike()'>Curtir Tudo!</a>"
	
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