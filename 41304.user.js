// ==UserScript==
// @name           itu sözlük başlıklar aksın
// @namespace      http://www.itusozluk.com/userinfo.php?user=togisama 
// @include        http://www.itusozluk.com/listele.php
// ==/UserScript==

var reftime=10000;

var onoff=0;
var usttaraf,alttaraf,sure;
var ust= document.getElementById("lstu");
var alt= document.getElementById("lsta");
var intrvl;

addScript();
saveUst();
butonEkle();

function addScript()
{
	var scripts=document.getElementsByTagName("SCRIPT");
	var heads=document.getElementsByTagName("HEAD");
	var newCell = document.createElement("SCRIPT");
	newCell.innerHTML = scripts[1].innerHTML;
	newCell.firstChild.nodeValue="var xmlHttp;"+createXMLHttpRequest.toString()+"createXMLHttpRequest();"+akit.toString()+handleAkit.toString()+parseAkit.toString()+ removeReklam.toString();
	heads[0].insertBefore(newCell,scripts[1]);
}

function createXMLHttpRequest() {

	if (window.ActiveXObject) 
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");

	else if (window.XMLHttpRequest)
		xmlHttp = new XMLHttpRequest();
	
}

function akit(){
	
	var url = "http://www.itusozluk.com/listele.php";

	xmlHttp.open("GET", url, true);
	xmlHttp.overrideMimeType('text/html; charset=iso-8859-9');
	xmlHttp.onreadystatechange = handleAkit;
	xmlHttp.send(null);
}

function handleAkit() {

	if(xmlHttp.readyState == 4) 
		if(xmlHttp.status == 200) 
			parseAkit();
}

function parseAkit() 
{
	
	var liste=document.getElementById("lst");
	var listealt=document.getElementById("lsta");
	var listeust=document.getElementById("lstu");

	//alert(xmlHttp.responseText.indexOf("<div id=\"lst\">"));
	liste.innerHTML=xmlHttp.responseText.substring(xmlHttp.responseText.indexOf("<div id=\"lst\">")+14,xmlHttp.responseText.indexOf("<div class=\"posts\" id=\"lsta\">")-6);

	var temp=xmlHttp.responseText.substring(xmlHttp.responseText.indexOf("id=\"lsta\"><br")+16,xmlHttp.responseText.length);
	var tarih=temp.substring(0,temp.indexOf("<br"));
	var sayi=temp.substring(temp.indexOf("<br")+6,temp.length);
	sayi=sayi.substring(0,sayi.indexOf("<br"));

	listeust.childNodes[0].nodeValue=tarih;
	listeust.childNodes[2].nodeValue=sayi;
	listealt.childNodes[0].nodeValue=tarih;
	listealt.childNodes[2].nodeValue=sayi;

	 removeReklam();
}

function removeReklam()
{
	giriler=document.getElementById('lst');
	var sil;

	for(var i=0;i<giriler.childNodes.length;i++)
		if(!giriler.childNodes[i].firstChild)
			sil=i;

	giriler.removeChild(giriler.childNodes[sil-1]);
}
function saveUst()
{
	
	usttaraf=document.getElementById("go1");
	alttaraf=document.getElementById("go2");
}

function butonEkle()
{
			element = document.createElement("input");
			element.setAttribute("id", "akitBut");
		    	element.setAttribute("class", "but");
		    	element.setAttribute("type", "button");
			element.setAttribute("value", "AKIT");
			element.setAttribute("title", "başlıklar aksın!");
			element.setAttribute("style", "font-size:11px;float:center;width:50px;");
			element.addEventListener('click',myhen,false);
			ust.insertBefore(element, ust.childNodes[ust.childNodes.length-1]);

			element = document.createElement("input");
			element.setAttribute("id", "refText");
		    	element.setAttribute("type", "text");
			element.setAttribute("value", "10");
			element.setAttribute("title", "saniyede bir aksın");
			element.setAttribute("style", "font-size:9px;float:center;width:20px;");
			ust.insertBefore(element, ust.childNodes[ust.childNodes.length-2]);

			sure=document.getElementById("refText");
}

function myhen(event)
{
	var i;
	if(onoff==0)
	{
		if(document.getElementById("go1"))
			ust.removeChild(document.getElementById("go1"));
		if(document.getElementById("go2"))
			alt.removeChild(document.getElementById("go2"));
		document.getElementById("akitBut").attributes[3].value="DUR";
		i=parseInt(document.getElementById("refText").value);
		if(i>0 && i<1000)
			reftime=i*1000;
		ust.removeChild(document.getElementById("refText"));
		onoff=(onoff+1)%2;
		intrvl=setInterval("akit()", reftime);
	}
	else
	{
		if(usttaraf)
			ust.insertBefore(usttaraf, ust.childNodes[ust.childNodes.length-3]);
		ust.insertBefore(sure, document.getElementById("akitBut"));
		if(alttaraf)
			alt.insertBefore(alttaraf, alt.childNodes[alt.childNodes.length-3]);
		document.getElementById("akitBut").attributes[3].value="AKIT";
		onoff=(onoff+1)%2;
		clearInterval(intrvl);
	}	

}