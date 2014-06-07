// ==UserScript==
// @name           Ask.fm like 'BOT' by PLCKY
// @namespace      PLOCKY
// @include        http://ask.fm/*
// @icon           http://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/SuitHearts.svg/220px-SuitHearts.svg.png
// ==/UserScript==
// Erstellt von Plocky (ask.fm/Plocky)
// DO NOT COPY THIS CODE!
// ORIGINAL FROM ask.fm/Plocky


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
	
	div.style.padding = "2px";
	div.innerHTML = "<img style='cursor:pointer;' onclick='Like()' src='http://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/SuitHearts.svg/220px-SuitHearts.svg.png' onclick='OtomatisLike()' width='100' height='100' align='absmiddle' /><a ' style='cursor:pointer;' href='http://ask.fm/Plocky'>Script By Plocky</a>" //ORIGINAL FROM ask.fm/Plocky
	
	body.appendChild(div);
	
	unsafeWindow.Like = function() {
	    

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
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click(); //ORIGINAL FROM ask.fm/Plocky
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


    

//ORIGINAL FROM ask.fm/Plocky 













































//ORIGINAL FROM ask.fm/Plocky   
    