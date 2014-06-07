// ==UserScript==
// @name           AutoFood
// @namespace      byAzaret
// @description    AutoFood
// @include        http://*.erepublik.com/*
// ==/UserScript==

// URL Setup
var currURL = location.href;
var arrURL = currURL.split('/');

//Donate page
if(arrURL[2]=="economy.erepublik.com"&&arrURL[5]=="donate")
{
	var available_items = document.getElementById('available_items').value;
	var own_items = ((document.getElementById("own").childNodes.length)-1)/2;
	var max = (available_items<10)?available_items:10;
	var i = 1;
	var p = 1;
	
	while(i<=max)
	{
		var type = document.getElementById("own").childNodes[(p*2)-1].childNodes[5].alt;
		if(type=="Food")
		{
		Nitem = document.createElement("li");
		Nitem.id = document.getElementById("own").childNodes[(p*2)-1].id;
		Nitem.innerHTML = document.getElementById("own").childNodes[(p*2)-1].innerHTML;
		document.getElementById("other").appendChild(Nitem);
		document.getElementById("own").childNodes[(p*2)-1].style.display = "none";
		i++;
		}
		p++;
		if(p>own_items) i=max+1;
	}
	
	var r = document.createElement("a");
		r.style.margin = "0px 10px";
		r.href = "#";
		r.className = "fluid_blue_light_big";
		r.id = "linkautodonate";
		r.innerHTML = "<span onClick=\"javascript:document.getElementById('other').innerHTML='';for(var i=1;i<="+own_items+";i++){document.getElementById('own').childNodes[(i*2)-1].style.display = '';}\">Annuler Auto-Drag Food</span>";
	document.getElementById('donationlink').parentNode.insertBefore(r,document.getElementById('donationlink'));
}