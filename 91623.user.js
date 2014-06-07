// ==UserScript==
// @name           Wootoff Percent Display
// @namespace      woot.com
// @include        *woot.com/
// @include        *.woot.com/#
// ==/UserScript==

//edit this to change the time between updates (in ms)
var refresh_interval = 10000;
//change to false if you don't want a pop-up when a new item is added.
var new_item_alert = true;





var ISWOOTOFF = 0;
var textdiv;
var barpercent = 100;
var itemname;
var percentDiv;
var prevPercent;
//check to see if a wootoff is in progress
if (document.getElementById('ctl00_ctl00_ContentPlaceHolderLeadIn_ContentPlaceHolderLeadIn_SaleControl_PanelWootOff')!=null)
{
ISWOOTOFF = 1;
}

//setup the % display for later use
function setup(){
if (document.getElementById ('ctl00_ctl00_ContentPlaceHolderLeadIn_ContentPlaceHolderLeadIn_SaleControl_PanelWootOffProgressBar')==null)
{
//item is sold out
document.title = "OOS";
itemname="OOS";
startAutoUpdate();
return;
}
//create the percent div etc.
percentDiv = document.getElementById ('ctl00_ctl00_ContentPlaceHolderLeadIn_ContentPlaceHolderLeadIn_SaleControl_PanelWootOffProgressBar').children[0];
textdiv = percentDiv.appendChild(document.createElement('div'));
	textdiv.style.position = 'absolute';
	textdiv.style.top = '0px';
	textdiv.style.height = '17px';
	textdiv.style.width = '100%';
	textdiv.style.textAlign = 'center';
	textdiv.style.fontSize = '15px';
barpercent=percentDiv.getAttribute('style').match(/\d+/)[0],10;
prevPercent=barpercent;
//set initial percent
textdiv.innerHTML=(100-barpercent)+"% Sold";
document.title = barpercent+"%";
//find the name of the item
itemname = document.getElementById('ctl00_ctl00_ContentPlaceHolderLeadIn_ContentPlaceHolderLeadIn_SaleControl_HyperLinkWantOne').href
if (itemname.substring(0,21)=="http://shirt.woot.com")
	itemname="IHateShirts";
startAutoUpdate();
}

//handles the xmlhttprequest, refreshes or updates percent as necessary
function handler() {
 if(this.readyState == 4 && this.status == 200) {
  // so far so good
  try
  {
	if (itemname != this.responseText.split('ctl00_ctl00_ContentPlaceHolderLeadIn_ContentPlaceHolderLeadIn_SaleControl_HyperLinkWantOne" href="')[1].split('"')[0] && itemname!="IHateShirts")
	{//item changed, reload and alert
	if (new_item_alert)
	alert("New Item Added!");
	new_item_alert=false;//just in case
	window.location.reload(true);
	}
	else if (itemname=="IHateShirts")
	itemname = this.responseText.split('ctl00_ctl00_ContentPlaceHolderLeadIn_ContentPlaceHolderLeadIn_SaleControl_HyperLinkWantOne" href="')[1].split('"')[0];
	barpercent = this.responseText.split('<div class=\'wootOffProgressBarValue\' style=\'width:')[1].split('%')[0]
	if (prevPercent!=barpercent)
	{
	textdiv.innerHTML=(100-barpercent)+"% Sold";
	percentDiv.setAttribute('style','width:'+barpercent+'%');
	document.title = barpercent+"%";
	}
	prevPercent = barpercent;
  }
  catch(e)
   {
   if (document.title!="OOS")
   {
   document.title = "OOS";
   try{
   textdiv.innerHTML="100% Sold";
   percentDiv.setAttribute('style','width:0%');
   }
   catch(dontworryaboutit)
   {}
   }
   }
 } else if (this.readyState == 4 && this.status != 200) {
  // fetched the wrong page or network error...
 }
}

//creates/sends xmlhttprequest
function update(){

var client = new XMLHttpRequest();

client.onreadystatechange = handler;
client.open("GET", window.location.href.replace(/#.*/, ''));
client.setRequestHeader('Content-Type', "text/html");
client.send();

}

//starts autoupdating
function startAutoUpdate(){
window.setInterval(update, refresh_interval);
}

//starts the program
if(ISWOOTOFF)
{
window.onload=setup;
}