// coding: utf-8
// ==UserScript==
// @name          heroofwarlocsol
// @namespace     
// @description   descript
// @version       2.6
// @include       http://www.playflyfish.com/heroofwar/*
// @include       http://www.playflyfish.com/heroofwar_hu/*
// @include       http://heroofwar.heronow.com/heroofwar/*
// @include       https://heroofwar.heronow.com/heroofwar/*
// @include       http://heroofwar2.heronow.com/heroofwar/*
// @include       https://heroofwar2.heronow.com/heroofwar/*
// @include       http://m.heronow.com/heroofwar/*
// @include       http://warofhero.heronow.com/heroofwar/*
// @include       https://warofhero.heronow.com/heroofwar/*
// @include       https://m.heronow.com/heroofwar/*
// @include       http://heroofwarhu.heronow.com/*
// @include       https://heroofwarhu.heronow.com/*
// @include       https://heroofwara.heronow.com/heroofwar/*
// @include       http://heroofwara.heronow.com/heroofwar/*
// @include       https://heroofwarb.heronow.com/heroofwar/*
// @include       http://heroofwarb.heronow.com/heroofwar/*
// ==/UserScript==

GM_addStyle('.moveDialog {left : 100px !important; top : 100px !important;}');

var friend = new Array();
var speedupclick = new Array();
var j = 0;
var k = 0;
var maxk = 0;
var jelent = 0;
var friendnum;

setTimeout(run, 1000);

function run(){
	var miele = document.getElementById('youlong');
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id','zcontainer');
if ( newdiv != null) {
	newdiv.innerHTML = '<div id="locsol" style="right:0px; top:0px; color:#000;"><input id="autolocsol" type="button" value="Locsol :)" /><input id="többetgy" type="button" value="Többet gyárt"/><input id="aji" type="button" value="Aji beta" style="display:inline"/><input id="ajidol" type="button" value="Dolgozom" style="display:none"/><span id="zdebug"></span></div>';
	miele.parentNode.insertBefore(newdiv,miele);
	addButtonListener();
}
}

function addButtonListener(){
if (document.getElementById("autolocsol") != null) {
  var button = document.getElementById("autolocsol");
  button.addEventListener('click',vetstart,true);
  var button = document.getElementById("többetgy");
  button.addEventListener('click',gyartas,true);
  var button = document.getElementById("aji");
  button.addEventListener('click',autoaji,true);
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////



var bustcachevar=0 ;//bust potential caching of external pages after initial request? (1=yes, 0=no)
var loadedobjects="";
var rootdomain="http://"+window.location.hostname;
var bustcacheparameter="";
var ajilist = document.createElement('div');
var ajibutton = "";
var ajidb=0;
var pattern = /getOneGift/;

function ajaxpage(url)
{
	var page_request = false
	if (window.XMLHttpRequest) // if Mozilla, Safari etc
		page_request = new XMLHttpRequest()
	else if (window.ActiveXObject)
	{ // if IE
		try 
		{
			page_request = new ActiveXObject("Msxml2.XMLHTTP")
		}
		catch (e)
		{
		try
		{
			page_request = new ActiveXObject("Microsoft.XMLHTTP")
		}
		catch (e)
		{}
		}
	}
	else
	return false

	page_request.onreadystatechange=function()
	{
		loadpage(page_request)
	}
	
	if (bustcachevar) //if bust caching of external page
		bustcacheparameter=(url.indexOf("?")!=-1)? "&"+new Date().getTime() : "?"+new Date().getTime()

	page_request.open('GET', url+bustcacheparameter, true)
	page_request.send(null)
}

function loadpage(page_request)
{
	if (page_request.readyState == 4 && (page_request.status==200 || window.location.href.indexOf("http")==-1))
	{
	ajilist.innerHTML=page_request.responseText;
	document.getElementById('zdebug').innerHTML = "ajilista megkapva";
	ajifogad(ajilist);
	}
}

function ajaxaji(url)
{
	var page_request = false
	if (window.XMLHttpRequest) // if Mozilla, Safari etc
		page_request = new XMLHttpRequest()
	else if (window.ActiveXObject)
	{ // if IE
		try 
		{
			page_request = new ActiveXObject("Msxml2.XMLHTTP")
		}
		catch (e)
		{
		try
		{
			page_request = new ActiveXObject("Microsoft.XMLHTTP")
		}
		catch (e)
		{}
		}
	}
	else
	return false

	page_request.onreadystatechange=function()
	{
		loadpageaji(page_request)
	}
	
	if (bustcachevar) //if bust caching of external page
		bustcacheparameter=(url.indexOf("?")!=-1)? "&"+new Date().getTime() : "?"+new Date().getTime()

	page_request.open('GET', url+bustcacheparameter, true)
	page_request.send(null)
}

function loadpageaji(page_request)
{
	if (page_request.readyState == 4 && (page_request.status==200 || window.location.href.indexOf("http")==-1))
	{
	ajidb++;
	document.getElementById('zdebug').innerHTML = ajibutton.length + " aji / " + ajidb;
	if (ajidb<ajibutton.length)
	{ajaxaji(ajibutton[ajidb].getAttributeNode("onclick").nodeValue.split("'")[3]);}
	else
	{
	document.getElementById('aji').style.display="inline";
	document.getElementById('ajidol').style.display="none";
	}
	}
}

function autoaji()
{
	var ajiurl=document.getElementById('giftbutton').innerHTML.split('"')[1].replace(/&amp;/g,"&");
	document.getElementById('aji').style.display="none";
	document.getElementById('ajidol').style.display="inline";
	document.getElementById('zdebug').innerHTML = "ajilista kérés";
	ajaxpage(ajiurl);
}

function ajifogad(list)
{
	ajibutton.length=0;
	ajibutton=list.getElementsByTagName('input');//.getAttributeNode("onclick").slice(52,-108);
	/*
	alert(list.innerHTML);
	alert(ajibutton[0].getAttributeNode("onclick").nodeValue.slice(52,-108));
	alert(ajibutton.length);
	*/
	ajidb=0;
	document.getElementById('zdebug').innerHTML = ajibutton.length + " aji / " + ajidb;
	if (ajibutton.length>0 && pattern.test(ajibutton[0].getAttributeNode("onclick").nodeValue.split("'")[3])){
	ajaxaji(ajibutton[0].getAttributeNode("onclick").nodeValue.split("'")[3]);
	}
	else
	{
	document.getElementById('aji').style.display="inline";
	document.getElementById('ajidol').style.display="none";
	}
}



function vetstart() {
	j=0;
	var ilist = document.getElementById('friendlist_slider').getElementsByTagName('img');
	for(var i = 0; i < ilist.length; i++){
		img=ilist[i];
		if (img.getAttributeNode("onclick") != null){
			friend[j] = img.getAttributeNode("onclick").nodeValue.slice(14,-17);
			j++;
		}
	}
	if (jelent==0){alert("Nekikezdek :) "+j);jelent=1;}
	friendnum = j;
	j=0;
	setTimeout(vetdolgoz, 200);
}

function vetdolgoz(){
	if (j<friendnum){
		location.href = "javascript:void(loadPage('"+friend[j]+"'));";
		j++;
		setTimeout(keres, 500);
	}
}

function keres(){
if (document.getElementById("loader").style.display!="none") {setTimeout(keres, 500);}
else{
	var ilist = document.getElementById('gamecontent').getElementsByTagName('img');
	for(var i = 0; i < ilist.length; i++){
		img=ilist[i];
		if (img.src == "http://imgcache.heronow.com/hero2web/images/icons/help.gif?v=1"){
			speedupclick[k] = img.parentNode.getAttributeNode("href").nodeValue;
			k++;
		}
	}
	maxk = k;
	k=0;
	setTimeout(dolgoz, 500);
}
}

function dolgoz(){
if (document.getElementById("loader").style.display!="none") {setTimeout(dolgoz, 500);}
else{
	if (k<maxk){
		if (speedupclick[k]!="undefined"){location.href = "javascript:void(loadPage('"+speedupclick[k]+"'));";}
		k++;
		setTimeout(dolgoz, 500);
	}
	else {
		k=0;
		setTimeout(vetdolgoz, 500);
	}
}
}

function gyartas(){
	if (document.getElementById("produce_list") != null){
		var lista = document.getElementById("produce_list").getElementsByTagName("select");
		for (i=0;i<lista.length;i++){
			if (lista[i].id == "amount"){
				lista[i].innerHTML='<option selected="selected" value="1000">1000</option><option value="2000">2000</option><option value="5000">5000</option><option value="10000">10000</option><option value="20000">20000</option><option value="50000">50000</option>';
			}
		}
		if (document.getElementById("g_dialog2").style.display=="none"){alert("Nem találtam megvehető egységeket! \nHasználat előtt valamelyik egységképzőt meg kell nyitnod.");}
	}
	else alert("Nem találtam megvehető egységeket! \nHasználat előtt valamelyik egységképzőt meg kell nyitnod.");
}
