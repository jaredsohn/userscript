// ==UserScript==
// @name Fuska+
// @description Fuska+ är till för att fullända den svenska spelfusksajten Fuska.nu. Skriptet använder sig av cookies och JavaScript!
// @include http://*.fuska.nu/*
// @include http://www.fuska.nu
// @include http://fuska.nu/*
// ==/UserScript==

// Skapat av The_new_cake, http://www.fuska.nu/medlem/The_new_cake/

echo "Testing";

var tidigare=getCookie("tidigare");
if (tidigare!=null && tidigare!="")
{
	Layout();
	Reklam();
	Citat();
}
else
{
	document.cookie="tidigare=1; expires="+1000*60*60*24*365*10;
	echo "<div style=\"margin-left:30%;margin-top:10%;background:black;color:white;\width:500px;height:300px;position:relative;z-index:1000000;\"><div id=\"header\">Inställningar</div><p>Steg 1: Layout | Steg 2: Reklam | Steg 3: Citat</p>";
}

function Layout()
{
	var layout=getCookie("layout");
	if (layout=="polka")
		echo "<link rel=\"stylesheet\" type=\"text/css\" href=\"http://www.temporar.net79.net/fuska/polka.css\" />";
	else
		echo "";
}

function Reklam()
{
	var reklam=getCookie("reklam");
	if(reklam==0)
		echo "<link rel=\"stylesheet\" type=\"text/css\" href=\"http://www.temporar.net79.net/fuska/reklam.css\" />";
}

function Citat()
{
	var temp;
	var output;
	temp=document.getElementByClass('tmlquotetable').innerHTML;
	document.getElementByClass('tmlquotetable').setAttribute('style','overflow:hidden;height:17px;');
	document.getElementByClass('tmlquotetable').innerHTML="<input type=\"button\" value=\"Visa\" onClick=\"VisaCitat();\" />"+temp;
}