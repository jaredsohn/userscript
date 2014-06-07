// ==UserScript==
// @name			Ask.fm
// @namespace                   http://userscripts.org/scripts/show/999999
// @version			1.0
// @copyright		        
// @description		        Ask.fm
// @author			
// @include			http://ask.fm/*
// @icon			http://s3.amazonaws.com/uso_ss/icon/138450/large.gif?1342345458
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
	div.style.right = "+6px";
	div.style.backgroundColor = "#ff00ae";
	div.style.border = "1px solid #555";
	div.style.padding = "2px";
	div.innerHTML = "<div style='background-color: #00a2ff; color: #FFFFFF; border: 1px solid #00a2ff;'><center><a style='color: #000000;' <a href='https://www.facebook.com/RG4LDC' target='_blank' title='Agregame  para agradecerme :)'> Mi Facebook </a></div>"
	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "absolute";
        div2.style.width = "125px";
	div2.style.opacity= 0.90;
	div2.style.bottom = "+65px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#ff00ae";
	div2.style.border = "1px solid #555";
	div2.style.padding = "2px";
	div2.style.z-index = "99";
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
	div.style.right = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='https://lh4.googleusercontent.com/-D1HYuLwPnNQ/TxPK6cm_THI/AAAAAAAAAIE/ynATGaxGbv0/s16/Facebook%252520Like%252520Small.jpg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='OtomatisLike()'>Me Gusta Todo!</a>"
	
	body.appendChild(div);
	
	unsafeWindow.OtomatisLike = function() {
		document.getElementsByClassName("submit-button-more")[0].click();
		document.getElementsByClassName("askFriends-block askFriends-friend")[0].click();
		document.getElementsByClassName("askFriends-block askFriends-friend")[1].click();
		document.getElementsByClassName("askFriends-block askFriends-friend")[2].click();
		document.getElementsByClassName("askFriends-block askFriends-friend")[3].click();
		document.getElementsByClassName("askFriends-block askFriends-friend")[4].click();
		document.getElementsByClassName("askFriends-block askFriends-friend")[5].click();
		document.getElementsByClassName("askFriends-block askFriends-friend")[6].click();
		document.getElementsByClassName("askFriends-block askFriends-friend")[7].click();
		document.getElementsByClassName("askFriends-block askFriends-friend")[8].click();
		document.getElementsByClassName("askFriends-block askFriends-friend")[9].click();
		document.getElementsByClassName("askFriends-block askFriends-friend")[10].click();
		document.getElementsByClassName("askFriends-block askFriends-friend")[11].click();
		document.getElementsByClassName("askFriends-block askFriends-friend")[12].click();
		document.getElementsByClassName("askFriends-block askFriends-friend")[13].click();
		document.getElementsByClassName("askFriends-block askFriends-friend")[14].click();
		document.getElementsByClassName("askFriends-block askFriends-friend")[15].click();
		document.getElementsByClassName("askFriends-block askFriends-friend")[16].click();
		document.getElementsByClassName("askFriends-block askFriends-friend")[17].click();
		document.getElementsByClassName("askFriends-block askFriends-friend")[18].click();
		document.getElementsByClassName("askFriends-block askFriends-friend")[19].click();
		document.getElementsByClassName("askFriends-block askFriends-friend")[20].click();
		document.getElementsByClassName("askFriends-block askFriends-friend")[21].click();
		document.getElementsByClassName("askFriends-block askFriends-friend")[22].click();
		document.getElementsByClassName("askFriends-block askFriends-friend")[23].click();
		document.getElementsByClassName("askFriends-block askFriends-friend")[24].click();
		document.getElementsByClassName("askFriends-block askFriends-friend")[25].click();

		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like") >= 0)
				if(buttons[i].getAttribute("name") == "likern false;")
					buttons[i].click();
		}
		
	};
}