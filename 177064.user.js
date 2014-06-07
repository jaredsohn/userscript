// ==UserScript==
// @name			Ask.fm Auto Like De @Biieel97
// @namespace                   http://userscripts.org/scripts/show/176918
// @version			3.0
// @copyright		        http://ask.fm/Biieel97
// @description		        Auto Like Ask.fm
// @author			(http://userscripts.org/users/Biieel97)
// @include			http://ask.fm/*
// @icon			http://s3.amazonaws.com/uso_ss/icon/138450/large.gif?1342345458
// Like Automatico Para Ask.FM
// Version 7.2.4
// Biieell97@gmail.com
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
	div.style.backgroundColor = "#ffffff";
	div.style.border = "1px solid #555";
	div.style.padding = "2px";
	div.innerHTML = "<div style='background-color: #00a2ff; color: #FFFFFF; border: 1px solid #00a2ff;'><center><a style='color: #000000;' <a href='https://www.facebook.com/Biieel97' target='_blank' title='Mee ADD'> Meu Face </a></div>"
     div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
        div2.style.width = "125px";
	div2.style.opacity= 0.90;
	div2.style.bottom = "+65px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#ffffff";
	div2.style.border = "1px solid #555";
	div2.style.padding = "2px";
	div2.innerHTML = "<div style='background-color: #00a2ff; color: #FFFFFF; border: 1px solid #00a2ff;'><a style='color: #FFFFFF;' onclick='spoiler()' title='Click Para Ocultar'>&laquo;</a> &#8226; <a href='http://ask.fm/Biieel97' title='' style='color: #FFFFFF;' onclick='alert(\'Thanks for install this script\');'>Clique aqui se tiver Erros</a></div> "
          div3 = document.createElement("div");
	div3.setAttribute('id','spoiler');
	div3.style.position = "fixed";
     div3.style.width = "175px";
	div3.style.opacity= 1.00;
	div3.style.bottom = "+211px";
	div3.style.left = "+6px";
	div3.style.backgroundColor = "#ffffff";
	div3.style.border = "1px solid #555";
	div3.style.padding = "2px";
	div3.innerHTML = "<div style='background-color: #00a2ff; color: #FFFFFF; border: 1px solid #00a2ff;'> Obrigado por usar meu Script</div>"
	     div4 = document.createElement("div");
	div4.setAttribute('id','spoiler');
	div4.style.position = "fixed";
     div4.style.width = "240px";
	div4.style.opacity= 1.00;
	div4.style.bottom = "+155px";
	div4.style.left = "+6px";
	div4.style.backgroundColor = "#ffffff";
	div4.style.border = "1px solid #555";
	div4.style.padding = "2px";
	div4.innerHTML = "<div style='background-color: #00a2ff; color: #FFFFFF; border: 1px solid #00a2ff;'>Qualquer duvida add no face</div>"
		     div5 = document.createElement("div");
	div5.setAttribute('id','spoiler');
	div5.style.position = "fixed";
     div5.style.width = "157px";
	div5.style.opacity= 1.00;
	div5.style.bottom = "+13px";
	div5.style.left = "+140px";
	div5.style.backgroundColor = "#ffffff";
	div5.style.border = "1px solid #555";
	div5.style.padding = "2px";
	div5.innerHTML = "<div style='background-color: #00a2ff; color: #000000; border: 1px solid #00a2ff;'> Creditos: Gabriel Lima - @Biieel97</div>"
	
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
		div2.innerHTML = "<a onclick='spoiler()' title='Mostrar :) Meu Ask'>&laquo;</a> &#8226; <a href='http://ask.fm/Biieel97' title='Biieel'>Pergunta aii!</a>"
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
	div.innerHTML = "<img src='https://lh4.googleusercontent.com/-D1HYuLwPnNQ/TxPK6cm_THI/AAAAAAAAAIE/ynATGaxGbv0/s16/Facebook%252520Like%252520Small.jpg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisLike()'>Clique Aqui!</a>"
	
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