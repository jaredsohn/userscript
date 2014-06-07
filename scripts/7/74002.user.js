// ==UserScript==
// @name           Xeno ADD Remover
// @namespace      kdmmoscr
// @description    remove xeno game adds.
// @include        http://www.supremestrategy.com/masters/*
// ==/UserScript==
var foodProd = 0;
var metalProd = 0;
var deuteriumProd = 0;
var iridiumProd = 0;
var moneyProd = 0;

var startfood = 0;
var startmetal = 0;
var startdeuterium = 0;
var startiridium = 0;
var startmoney = 0;

var updateTimer = 0;
var timer_is_on = 0;

var resBar = "";

function dontShow(c)
{
	c.style.visibility='hidden';
	c.innerHTML="";
	c.parentNode.removeChild(c);
}
function setvars()
{
	var res = resBar.getElementsByTagName('a');
	var production = resBar.getElementsByTagName('font');
	
	foodProd = production[0].innerHTML ;
	foodProd = Math.round(foodProd.substring(1,(foodProd.length-2)));	
	metalProd = production[1].innerHTML ;
	metalProd = Math.round(metalProd.substring(1,(metalProd.length-2)));
	deuteriumProd = production[2].innerHTML ;
	deuteriumProd = Math.round(deuteriumProd.substring(1,(deuteriumProd.length-2)));
	iridiumProd = production[3].innerHTML ;
	iridiumProd = Math.round(iridiumProd.substring(1,(iridiumProd.length-2)));
	moneyProd = production[4].innerHTML ;
	moneyProd = Math.round(moneyProd.substring(1,(moneyProd.length-2)));	
	for (var i=0;i<res.length;i++)
	{	
		res[i].id = "res" + i;
		
	}
	startfood = res[0].innerHTML ;
	startfood = Math.round(startfood.substr(startfood.lastIndexOf(">") + 1));
	startmetal = res[1].innerHTML ;
	startmetal = Math.round(startmetal.substr(startmetal.lastIndexOf(">") + 1));
	startdeuterium = res[2].innerHTML ;
	startdeuterium = Math.round(startdeuterium.substr(startdeuterium.lastIndexOf(">") + 1));
	startiridium = res[3].innerHTML ;
	startiridium = Math.round(startiridium.substr(startiridium.lastIndexOf(">") + 1));
	startmoney = res[4].innerHTML ;
	startmoney = Math.round(startmoney.substr(startmoney.lastIndexOf(">") + 1));
	
}
function updateResDisplay()
{
	startfood = startfood + (foodProd / 3600);
	startmetal = startmetal + (metalProd / 3600);
	startdeuterium = startdeuterium + (deuteriumProd / 3600);
	startiridium = startiridium + (iridiumProd / 3600);
	startmoney = startmoney + (moneyProd / 3600);
	
	var res = resBar.getElementsByTagName('a');
	
	for (var i=0;i<res.length;i++)
	{	
		if (res[i].id == "res0") 
		{
			res[i].textContent = Math.round(startfood);
		}
		if (res[i].id == "res1") 
		{
			res[i].innerHTML =  Math.round(startmetal);
		}
		if (res[i].id == "res2") 
		{
			res[i].innerHTML = Math.round(startdeuterium);
		}
		if (res[i].id == "res3") 
		{
			res[i].innerHTML = Math.round(startiridium);
		}
		if (res[i].id == "res4") 
		{
			res[i].innerHTML = Math.round(startmoney);
		}
	}	
	updateTimer = setTimeout(updateResDisplay,1000);
}
function main()
{
	var divs=document.getElementsByTagName("div");	
	for (var i=0;i<divs.length;i++)
	{	
		if (divs[i].className=="allSize") 
		{
			divs[i].id="mainWin";
		}
		if (divs[i].className=="gameView") 
		{
			divs[i].id="clientWin";
		}
		if (divs[i].className=="adds") 
		{
			dontShow(divs[i]);
		}
		if (divs[i].className=="addhoriz")
		{
			dontShow(divs[i]);
		}
		if (divs[i].id=="resurse") 
		{
			resBar = divs[i];
			setvars();
				
		}
	}
}

window.addEventListener('load', main, false);
updateTimer = window.setTimeout(updateResDisplay,1000);
GM_addStyle("div#mainWin { margin-left:auto;width:790px; }");
GM_addStyle("div#clientWin { margin-left:0px;width:790px; }");