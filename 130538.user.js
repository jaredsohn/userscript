// ==UserScript==
// @match http://*.facebook.com/*
// @match http://www.facebook.com/*
// @match https://*.facebook.com/*
// @match https://www.facebook.com/*
// @name Érettségi visszaszámlálás 2012
// @description Visszaszámlálás Facebookon a 2012-es májusi érettségiig.
// @version 1.0.2
// ==/UserScript==

dateErettsegi = new Date(2012,4,7,8,00,00);

function GetCount(ddate){
	var prev=document.getElementById("q").value;
	if(prev.length>25 || prev=="Keresés" || prev=="Search")
	{
		dateNow = new Date();
		amount = ddate.getTime() - dateNow.getTime();
		//delete dateNow;

		if(amount < 0){
			dateFinal = new Date(2012,4,10,00,00,00);
			if(dateFinal.getTime() > dateNow.getTime()) {
				document.getElementById("q").value="Sok sikert az érettségihez!";
			}
		}
		else{
			days=0;hours=0;mins=0;secs=0;out="Még: ";

			amount = Math.floor(amount/1000);

			days=Math.floor(amount/86400);
			amount=amount%86400;

			hours=Math.floor(amount/3600);
			amount=amount%3600;

			mins=Math.floor(amount/60);
			amount=amount%60;

			secs=Math.floor(amount);

			out+=days+" nap "+hours+" óra "+mins+" perc "+secs+" másodperc az érettségiig!";
			document.getElementById("q").style.color = '#F00';
			document.getElementById("q").value=out;

			setTimeout(function(){GetCount(ddate)}, 1000);
		}
	}
	else
	{
		document.getElementById("q").style.color = '#777';
		return
	}
}

GetCount(dateErettsegi);


