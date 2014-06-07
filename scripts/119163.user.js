// ==UserScript==
// @name           MOeBiH Tracker
// @namespace      http://www.erepublik.com
// @description    Tracks stuff.
// @include        http://*.erepublik.com/*
// @include        http://www.erepublik.com/*
// @include        http://www.erepublik.com/en/military/battlefield/*
// ==/UserScript==

function $x(){function g(a){var b=[],c;while(c=a.iterateNext()){b.push(c)}return b}var a="";var b=document;var c=0;var d=true;var e=0;var f;while(f=arguments[e++]){switch(typeof f){case"string":a+=a==""?f:" | "+f;continue;case"number":c=f;continue;case"object":b=f;continue;case"boolean":d=f;continue}}if(d){if(c==6)c=4;if(c==7)c=5}if(!/^\//.test(a))a="//"+a;if(b!=document&&!/^\./.test(a))a="."+a;var h=document.evaluate(a,b,null,c,null);if(d){switch(c){case 1:return h.numberValue;case 2:return h.stringValue;case 3:return h.booleanValue;case 8:case 9:return h.singleNodeValue}}return d?g(h):h}

function Main()
{
	var idRegexp = /overview\/(\d+)"/;
	var Match = idRegexp.exec(document.body.innerHTML);
	var soldierId = Match[1];
			
	var main, orderElements;
	main = document.getElementById('container');
	if (main) {
		orderElement = document.createElement('div');
		orderElement.style.width = "100%";
		orderElement.style.height = "32px";
		orderElement.style.backgroundImage = "url(http://mafioso.nihplod.com/arbih/scanline_2.png)";
		orderElement.style.fontFamily = "Arial,Helvetica,sans-serif";
		orderElement.style.fontWeight = "bold";
		orderElement.style.fontSize = "15px";
		orderElement.style.lineHeight = "32px";
		orderElement.style.color = "#39839c";
		orderElement.style.textAlign = "center";
		orderElement.innerHTML = "Prio 1: <a style='color: #415ccf;' href='#'>Here, there and everywhere</a>";
		main.parentNode.insertBefore(orderElement, main);
		
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://mafioso.nihplod.com/arbih/naredbe.php?id=" + soldierId,
			onload: function(response) { orderElement.innerHTML = "<div style='a:hover { color: blue; }'>" + response.responseText + "</div>";}
		});	
	}

	document.addEventListener("click", function(event) 
	{
		if(event.target.id == "add_damage_btn")
		{
			var influenceMade = document.getElementById("war_influence").innerHTML.replace("+ ", "");
			var battleName = $x("//html/body/div[4]/div[4]/div/div/h2", XPathResult.FIRST_ORDERED_NODE_TYPE).innerHTML;
			var foughtFor = $x("//html/body/div[4]/div[4]/div/div/div/div/h3", XPathResult.FIRST_ORDERED_NODE_TYPE).innerHTML;
			var foughtAgainst = $x("//html/body/div[4]/div[4]/div/div/div[4]/div/h3", XPathResult.FIRST_ORDERED_NODE_TYPE).innerHTML;			
						
			idRegexp = /battlefield\/(\d+)" method/;
			Match = idRegexp.exec(document.body.innerHTML);
			var battleId = Match[1];
						
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://mafioso.nihplod.com/arbih/register_kill.php?id=" + soldierId + "&inf=" + influenceMade + "&battle_id=" + battleId + "&battle_name=" + battleName + "&fought_for=" + foughtFor + "&fought_against=" + foughtAgainst,
				onload: function(response) { }
			});	
		}
		
	}, true);
}

window.addEventListener('load', function()
{
	Main();
}, false);