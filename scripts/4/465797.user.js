// ==UserScript==
// @name        DazeyMod
// @namespace   www.lucky13games.com
// @description Allows changes to various BGG pages
// @include     http://www.boardgamegeek.com/*
// @include     http://boardgamegeek.com/*
// @version     0.7
// @grant       none
// @grant       GM_registerMenuCommand
// @grant       GM_xmlhttpRequest
// ==/UserScript==


// Changelog
// v0.7 - 4/16/2014
//  - Added icon refreshing after saving the settings
//  - Added option to move QuickBar down
//  - Prettied up the settings window
//  - Redid popup text for settings and manual buttons to use simpler title attribute
//  - Code Cleanup
// v0.6 - 4/15/2014
//  - Added "loading" icons and text so page wouldn't change size when loading
//  - Added Setting to enable/disable context menu
//  - Fixed Manual load duplication bug


if(typeof localStorage["DazeyMod.showLoginText"]==='undefined'){
  localStorage["DazeyMod.showLoginText"]="always";
}
if(typeof localStorage["DazeyMod.showLoginTextGeeklists"]==='undefined'){
  localStorage["DazeyMod.showLoginTextGeeklists"]=true;
}
if(typeof localStorage["DazeyMod.showLoginTextTrades"]==='undefined'){
  localStorage["DazeyMod.showLoginTextTrades"]=true;
}
if(typeof localStorage["DazeyMod.showLoginTextForums"]==='undefined'){
  localStorage["DazeyMod.showLoginTextForums"]=true;
}
if(typeof localStorage["DazeyMod.showLoginIcon"]==='undefined'){
  localStorage["DazeyMod.showLoginIcon"]="always";
}
if(typeof localStorage["DazeyMod.showLoginIconGeeklists"]==='undefined'){
  localStorage["DazeyMod.showLoginIconGeeklists"]=true;
}
if(typeof localStorage["DazeyMod.showLoginIconTrades"]==='undefined'){
  localStorage["DazeyMod.showLoginIconTrades"]=true;
}
if(typeof localStorage["DazeyMod.showLoginIconForums"]==='undefined'){
  localStorage["DazeyMod.showLoginIconForums"]=true;
}
if(typeof localStorage["DazeyMod.showLoginIconHover"]==='undefined'){
  localStorage["DazeyMod.showLoginIconHover"]=true;
}

if(typeof localStorage["DazeyMod.iconPack"]==='undefined'){
  localStorage["DazeyMod.iconPack"]="D10";
}
if(typeof localStorage["DazeyMod.iconDays"]==='undefined'){
  var tmpDays=new Array(0, 1.5, 7, 30, 180, 365);
  localStorage["DazeyMod.iconDays"]=JSON.stringify(tmpDays);
}
var tmp=localStorage["DazeyMod.iconDays"];
var loginDays=JSON.parse(tmp);

if(typeof localStorage["DazeyMod.showContextMenu"]==='undefined'){
  localStorage["DazeyMod.showContextMenu"]="false";
}

if(typeof localStorage["DazeyMod.moveQuickBar"]==='undefined'){
  localStorage["DazeyMod.moveQuickBar"]="false";
}

var loginIconD10=new Array("1990299.png","1990300.png","1990303.png","1990301.png","1990302.png","1990298.png","1992653.png");
var loginIconHex=new Array("1990348.png","1990349.png","1990350.png","1990352.png","1990353.png","1990354.png","1992652.png");
var loginIconHour=new Array("1992646.jpg","1992647.jpg","1992648.jpg","1992649.jpg","1992650.jpg","1992651.jpg","1992654.png");
if(localStorage["DazeyMod.iconPack"]=="D10") {
  loginIcons = loginIconD10;
}
if(localStorage["DazeyMod.iconPack"]=="Hex") {
  loginIcons = loginIconHex;
}
if(localStorage["DazeyMod.iconPack"]=="Hour") {
  loginIcons = loginIconHour;
}
var showText = false;
var showIcon = false;

var uList;
var avatarAdded=0;
var now = new Date();
var days;

if(localStorage["DazeyMod.showLoginText"]=="always") {
  console.log("Always Text");
  showText = true;
}
if(localStorage["DazeyMod.showLoginIcon"]=="always") {
  console.log("Always Icon");
  showIcon = true;
}

if(document.baseURI.indexOf("/geeklist/") > -1) { // Geeklist
  console.log("Page is in Geeklists");
  if(localStorage["DazeyMod.showLoginTextGeeklists"]=="true" && localStorage["DazeyMod.showLoginText"]=="selected") {
    showText = true;
  }
  if(localStorage["DazeyMod.showLoginIconGeeklists"]=="true" && localStorage["DazeyMod.showLoginIcon"]=="selected") {
    showIcon = true;
  }
}

if(document.baseURI.substr(-10) == "fortrade=1") { // Trades Collection page
  console.log("Page is in Trades");
  if(localStorage["DazeyMod.showLoginTextTrades"]=="true" && localStorage["DazeyMod.showLoginText"]=="selected") {
    showText = true;
  }
  if(localStorage["DazeyMod.showLoginIconTrades"]=="true" && localStorage["DazeyMod.showLoginIcon"]=="selected") {
    showIcon = true;
  }
}
if(document.baseURI.indexOf("/article/") > -1) { // Forums
  console.log("Page is in Forums");
  if(localStorage["DazeyMod.showLoginTextForums"]=="true" && localStorage["DazeyMod.showLoginText"]=="selected") {
    showText = true;
  }
  if(localStorage["DazeyMod.showLoginIconForums"]=="true" && localStorage["DazeyMod.showLoginIcon"]=="selected") {
    showIcon = true;
  }
}

console.log("showText: "+showText);
console.log("showIcon: "+showIcon);
if(showText || showIcon) { 
  showLoginDates("automatic");
}

function showLoginDates(src) {
  //Only let them display the date or icon once so it doesn't duplicate
  console.log("Source: "+src);
  if (src == "manual") {
    if(localStorage["DazeyMod.showLoginText"]=="manual") {
      console.log("Manual Text");
      showText = true;
    }
    if(localStorage["DazeyMod.showLoginIcon"]=="manual") {
      console.log("Manual Icon");
      showIcon = true;
    }
  }
  avatarAdded=0;
    uList = document.getElementsByClassName("avatarblock js-avatar ");
	console.log("uList.length: "+uList.length);
	if(uList.length > 0) {
	  if(showText || showIcon) {
	    ShowDateTemp();
		window.setTimeout(getLast, 1000);
	  } else {
	    getLast();
	  }
	}
}
function getLast() {
  // Loop through the detected avatars and display text or icons as chosen in settings
  console.log("getLast()" + avatarAdded);
  var uName=uList[avatarAdded].getAttribute("data-username");
  
  if(typeof localStorage["DazeyMod."+uName+".lastLogin"]==='undefined' || (now.getTime() - localStorage["DazeyMod."+uName+".lastChecked"]) > (3600000*6)){
    localStorage["DazeyMod."+uName+".lastChecked"]=now.getTime();
    console.log("Request User via XMLAPI2");

  var oReq = new XMLHttpRequest();
  oReq.onload = function(){
  
    var lastLogin=oReq.responseXML.getElementsByTagName("lastlogin")[0].getAttribute("value");
    if(lastLogin==""){
	  lastLogin="2000-01-01";
	}
	localStorage["DazeyMod."+uName+".lastLogin"]=lastLogin;
	var then = new Date(lastLogin);
    days = (((now.getTime()-(now.getTimezoneOffset()*60000))-then.getTime())/(86400000));  //Get number of days between now and then
	console.log("Days since "+uName+"'s last login: "+days);
	if (showText) {
	  showDateText(avatarAdded, lastLogin);
    }
	if (showIcon) {
      showDateIcon(avatarAdded, lastLogin, days);
	}
    avatarAdded++;
	if(avatarAdded<uList.length){
	  console.log("Get more users after XMLAPI");
	  window.setTimeout(getLast, 250);
	}
  }
  oReq.open("get", "/xmlapi2/user?name="+uName, true);
  oReq.send();
  
  } else {
    console.log("get local storage " + uName);
    lastLogin = localStorage["DazeyMod."+uName+".lastLogin"];
	var then = new Date(lastLogin);
    days = (((now.getTime()-(now.getTimezoneOffset()*60000))-then.getTime())/(86400000));  //Get number of days between now and then
	console.log("Days since "+uName+"'s last login: "+days);
	if (showText) {
	  showDateText(avatarAdded, lastLogin);
    }
	if (showIcon) {
      showDateIcon(avatarAdded, lastLogin, days);
	}
    avatarAdded++;
	if(avatarAdded<uList.length){
	  console.log("Get more users after Localstorage");
	  window.setTimeout(getLast, 10);
	}
  }
} // End getLast()

function showDateText(av, ll) {
  console.log("Function showDateText "+av+ "|"+ll);
  if(document.getElementById('DazeyMod.AvaText.'+av).getAttribute("data-DazeyMod")!="done") {
    // Display the user's last login date under their name
	if(ll == "2000-01-01") {
	  ll = "Unknown";
	}
    uList[av].childNodes[1].setAttribute("data-DazeyMod", "done");
	document.getElementById('DazeyMod.AvaText.'+av).childNodes[0].data=ll;
  }
} // End showDateText()

function showDateIcon(av, ll, dy) {
  // Display an icon representing the user's last login date to the right of their menu bar
  console.log("Function showDateIcon "+av+"|"+dy);
  if(document.getElementById('DazeyMod.AvaIcon.'+av).getAttribute("data-DazeyMod")!="done") {
    loginImg = loginIcons[0];
	var li = 0;
    if (dy >= loginDays[1]) {
      li = 1;
    }
    if (dy >= loginDays[2]) {
      li = 2;
    }
    if (dy >= loginDays[3]) {
      li = 3;
    }
    if (dy >= loginDays[4]) {
      li = 4;
    }
    if (dy >= loginDays[5]) {
      li = 5;
    }
	loginImg = loginIcons[li];
	avDiv=document.getElementById('DazeyMod.AvaIcon.'+av);
	avDiv.src="http://cf.geekdo-images.com/images/pic"+loginImg;
	avDiv.title=ll;
	avDiv.setAttribute("data-DazeyMod", "done");
	avDiv.setAttribute("data-iconLevel", li);
  }
} // End showDateIcon()

function ShowDateTemp() {
  console.log("Inserting Temp Dates");
  for (av=0; av<uList.length; av++) {
    if(showText && uList[av].childNodes[1].getAttribute("data-DazeyMod") != "done") {
	  console.log("Inserting Temp Text");
	  uList[av].childNodes[1].appendChild( document.createElement('br') );
      tmpSpn=document.createElement('span');
	  tmpSpn.id = "DazeyMod.AvaText."+av;
	  tmpSpn.appendChild( document.createTextNode("Loading...") );
      uList[av].childNodes[1].setAttribute("data-DazeyMod", "temp");
	  uList[av].childNodes[1].appendChild(tmpSpn);
	}
	if(showIcon && typeof uList[av].childNodes[7].childNodes[1].childNodes[1].childNodes[0].childNodes[7] === 'undefined') {
      console.log("Inserting Temp Icons");
	  dCell = uList[av].childNodes[7].childNodes[1].childNodes[1].childNodes[0].insertCell(-1);
	  dCell.setAttribute("data-DazeyMod", "temp");
      tmpImg=document.createElement('img');
	  tmpImg.id = "DazeyMod.AvaIcon."+av;
	  tmpImg.src = "http://cf.geekdo-images.com/images/pic"+loginIcons[6];
	  tmpImg.title = "Loading...";
      dCell.appendChild(tmpImg);
    }
  }
} //End ShowDateTemp

function createContextMenu() {
// Create a context menu to manually load the dates.
  myMenu=document.createElement('menu');
  myMenu.id = "DazeyModMenu";
  myMenu.setAttribute("type", "context");
  myMenuItem=document.createElement('menuitem');
  myMenuItem.id = "menubtn";
  myMenuItem.setAttribute("label", "Show Login Dates");
  myMenuItem.addEventListener("click", function(){showLoginDates("manual");}, false);
  myMenu.appendChild(myMenuItem);
  document.getElementById('container').appendChild(myMenu);
  document.getElementById('container').setAttribute("contextMenu", "DazeyModMenu");
}
if(localStorage["DazeyMod.showContextMenu"]=="true") {
  createContextMenu();
}

function refreshIcons() {
  console.log("Refreshing the icons");
  for (i=0; i<uList.length; i++) {
    document.getElementById('DazeyMod.AvaIcon.'+i).src="http://cf.geekdo-images.com/images/pic"+loginIcons[document.getElementById('DazeyMod.AvaIcon.'+i).getAttribute('data-iconLevel')];
  }
  document.getElementById('DazeyMod.ManualIcon').src="http://cf.geekdo-images.com/images/pic"+loginIcons[0];
  for (i=0; i<6; i++) {
    document.getElementById('Dazeymod.DayRangeIcon.'+i).src="http://cf.geekdo-images.com/images/pic"+loginIcons[i];
  }
} //End refreshIcons()

// Make the Settings DIV
var tmpDiv=document.createElement('div');
tmpDiv.id = "settingsDiv";
tmpDiv.style.visibility="hidden";
tmpDiv.style.backgroundColor="#EAFFFF";
tmpDiv.style.border="2px solid black";
tmpDiv.style.position="absolute";
tmpDiv.style.left="146px";
tmpDiv.style.top="157px";
var tmpElm=document.createElement('p');
tmpElm.appendChild( document.createTextNode("DazeyMod Settings") );
tmpElm.style.textAlign="center";
tmpElm.style.margin="0em";
tmpDiv.appendChild(tmpElm);
tmpDiv.appendChild( document.createElement('br') );

// Settings - Form
var tmpFrm=document.createElement('form');

//Settings - Table
var tmpTbl=document.createElement('table');
var tmpTr=document.createElement('tr');

var tmpTd=document.createElement('td');
tmpTd.style.verticalAlign="top";
tmpTd.style.padding="0px 10px";
tmpTd.style.borderRight="1px dotted black";
// Settings - Text Date
var tmpHdr=document.createElement('div');
tmpHdr.style.textAlign="center";
tmpHdr.style.paddingBottom="5px";
tmpHdr.style.fontWeight="bold";
tmpHdr.appendChild( document.createTextNode("Display Date") );
tmpTd.appendChild(tmpHdr);
// Settings - Text - Never
var tmpFld=document.createElement('input');
tmpFld.setAttribute("type", "radio");
tmpFld.setAttribute("name", "radioText");
tmpFld.id = "radioTextNever";
if(localStorage["DazeyMod.showLoginText"] == "never") {
  tmpFld.checked=true;
}
tmpFld.addEventListener("click", showHideTextSelected, false);
tmpTd.appendChild(tmpFld);
tmpTd.appendChild( document.createTextNode("\u00A0Never") );
tmpTd.appendChild( document.createElement('br') );
// Settings - Text - Manual
tmpFld=document.createElement('input');
tmpFld.setAttribute("type", "radio");
tmpFld.setAttribute("name", "radioText");
tmpFld.id = "radioTextManual";
if(localStorage["DazeyMod.showLoginText"] == "manual") {
  tmpFld.checked=true;
}
tmpFld.addEventListener("click", showHideTextSelected, false);
tmpTd.appendChild(tmpFld);
tmpTd.appendChild( document.createTextNode("\u00A0Manual") );
tmpTd.appendChild( document.createElement('br') );
// Settings - Text - Always
tmpFld=document.createElement('input');
tmpFld.setAttribute("type", "radio");
tmpFld.setAttribute("name", "radioText");
tmpFld.id = "radioTextAlways";
if(localStorage["DazeyMod.showLoginText"] == "always") {
  tmpFld.checked=true;
}
tmpFld.addEventListener("click", showHideTextSelected, false);
tmpTd.appendChild(tmpFld);
tmpTd.appendChild( document.createTextNode("\u00A0Always") );
tmpTd.appendChild( document.createElement('br') );
// Settings - Text - Selected
tmpFld=document.createElement('input');
tmpFld.setAttribute("type", "radio");
tmpFld.setAttribute("name", "radioText");
tmpFld.id = "radioTextSelected";
if(localStorage["DazeyMod.showLoginText"] == "selected") {
  tmpFld.checked=true;
}
tmpFld.addEventListener("click", showHideTextSelected, false);
tmpTd.appendChild(tmpFld);
tmpTd.appendChild( document.createTextNode("\u00A0Selected Sites:") );
tmpTd.appendChild( document.createElement('br') );
// Settings - Text - Selected - Geeklist
tmpFld=document.createElement('input');
tmpFld.setAttribute("type", "checkbox");
tmpFld.id = "checkTextGeeklists";
tmpFld.checked=(localStorage["DazeyMod.showLoginTextGeeklists"]=="true");
tmpFld.style.marginLeft="15px";
tmpTd.appendChild(tmpFld);
tmpTd.appendChild( document.createTextNode("\u00A0Geeklists") );
tmpTd.appendChild( document.createElement('br') );
// Settings - Text - Selected - Trades
tmpFld=document.createElement('input');
tmpFld.setAttribute("type", "checkbox");
tmpFld.id = "checkTextTrades";
tmpFld.checked=(localStorage["DazeyMod.showLoginTextTrades"]=="true");
tmpFld.style.marginLeft="15px";
tmpTd.appendChild(tmpFld);
tmpTd.appendChild( document.createTextNode("\u00A0Trade Lists") );
tmpTd.appendChild( document.createElement('br') );
// Settings - Text - Forums
tmpFld=document.createElement('input');
tmpFld.setAttribute("type", "checkbox");
tmpFld.id = "checkTextForums";
tmpFld.checked=(localStorage["DazeyMod.showLoginTextForums"]=="true");
tmpFld.style.marginLeft="15px";
tmpTd.appendChild(tmpFld);
tmpTd.appendChild( document.createTextNode("\u00A0Forums") );
tmpTr.appendChild(tmpTd);

tmpTd=document.createElement('td');
tmpTd.style.verticalAlign="top";
tmpTd.style.padding="0px 10px";
tmpTd.style.borderRight="1px dotted black";
tmpHdr=document.createElement('div');
tmpHdr.style.textAlign="center";
tmpHdr.style.paddingBottom="5px";
tmpHdr.style.fontWeight="bold";
tmpHdr.appendChild( document.createTextNode("Display Icons") );
tmpTd.appendChild(tmpHdr);
// Settings - Icon - Never
var tmpFld=document.createElement('input');
tmpFld.setAttribute("type", "radio");
tmpFld.setAttribute("name", "radioIcon");
tmpFld.id = "radioIconNever";
if(localStorage["DazeyMod.showLoginIcon"] == "never") {
  tmpFld.checked=true;
}
tmpFld.addEventListener("click", showHideTextSelected, false);
tmpTd.appendChild(tmpFld);
tmpTd.appendChild( document.createTextNode("\u00A0Never") );
tmpTd.appendChild( document.createElement('br') );
// Settings - Icon - Manual
tmpFld=document.createElement('input');
tmpFld.setAttribute("type", "radio");
tmpFld.setAttribute("name", "radioIcon");
tmpFld.id = "radioIconManual";
if(localStorage["DazeyMod.showLoginIcon"] == "manual") {
  tmpFld.checked=true;
}
tmpFld.addEventListener("click", showHideIconSelected, false);
tmpTd.appendChild(tmpFld);
tmpTd.appendChild( document.createTextNode("\u00A0Manual") );
tmpTd.appendChild( document.createElement('br') );
// Settings - Icon - Always
tmpFld=document.createElement('input');
tmpFld.setAttribute("type", "radio");
tmpFld.setAttribute("name", "radioIcon");
tmpFld.id = "radioIconAlways";
if(localStorage["DazeyMod.showLoginIcon"] == "always") {
  tmpFld.checked=true;
}
tmpFld.addEventListener("click", showHideIconSelected, false);
tmpTd.appendChild(tmpFld);
tmpTd.appendChild( document.createTextNode("\u00A0Always") );
tmpTd.appendChild( document.createElement('br') );
// Settings - Icon - Selected
tmpFld=document.createElement('input');
tmpFld.setAttribute("type", "radio");
tmpFld.setAttribute("name", "radioIcon");
tmpFld.id = "radioIconSelected";
if(localStorage["DazeyMod.showLoginIcon"] == "selected") {
  tmpFld.checked=true;
}
tmpFld.addEventListener("click", showHideIconSelected, false);
tmpTd.appendChild(tmpFld);
tmpTd.appendChild( document.createTextNode("\u00A0Selected Sites:") );
tmpTd.appendChild( document.createElement('br') );
// Settings - Icon - Selected - Geeklist
tmpFld=document.createElement('input');
tmpFld.setAttribute("type", "checkbox");
tmpFld.id = "checkIconGeeklists";
tmpFld.checked=(localStorage["DazeyMod.showLoginIconGeeklists"]=="true");
tmpFld.style.marginLeft="15px";
tmpTd.appendChild(tmpFld);
tmpTd.appendChild( document.createTextNode("\u00A0Geeklists") );
tmpTd.appendChild( document.createElement('br') );
// Settings - Icon - Selected - Trades
tmpFld=document.createElement('input');
tmpFld.setAttribute("type", "checkbox");
tmpFld.id = "checkIconTrades";
tmpFld.checked=(localStorage["DazeyMod.showLoginIconTrades"]=="true");
tmpFld.style.marginLeft="15px";
tmpTd.appendChild(tmpFld);
tmpTd.appendChild( document.createTextNode("\u00A0Trade Lists") );
tmpTd.appendChild( document.createElement('br') );
// Settings - Icon - Forums
tmpFld=document.createElement('input');
tmpFld.setAttribute("type", "checkbox");
tmpFld.id = "checkIconForums";
tmpFld.checked=(localStorage["DazeyMod.showLoginIconForums"]=="true");
tmpFld.style.marginLeft="15px";
tmpTd.appendChild(tmpFld);
tmpTd.appendChild( document.createTextNode("\u00A0Forums") );
//tmpTd.appendChild( document.createElement('br') );
tmpTr.appendChild(tmpTd);

// Icon Packs
tmpTd=document.createElement('td');
tmpTd.style.verticalAlign="top";
tmpTd.style.padding="0px 10px";
tmpTd.style.borderRight="1px dotted black";
var tmpHdr=document.createElement('div');
tmpHdr.style.textAlign="center";
tmpHdr.style.paddingBottom="5px";
tmpHdr.style.fontWeight="bold";
tmpHdr.appendChild( document.createTextNode("Choose Icon Style") );
tmpTd.appendChild(tmpHdr);
// Icons - D10
var tmpFld=document.createElement('input');
tmpFld.setAttribute("type", "radio");
tmpFld.setAttribute("name", "radioPack");
tmpFld.id = "radioIconPackD10";
if(localStorage["DazeyMod.iconPack"] == "D10") {
  tmpFld.checked=true;
}
//tmpFld.addEventListener("click", showHideTextSelected, false);
tmpTd.appendChild(tmpFld);
tmpTd.appendChild( document.createTextNode("\u00A0") );
for(i=0; i<loginIconD10.length; i++) {
  tmpImg=document.createElement('img');
  tmpImg.src="http://cf.geekdo-images.com/images/pic"+loginIconD10[i];
  tmpTd.appendChild(tmpImg);
}
tmpTd.appendChild( document.createElement('br') );
// Icons - Hex
var tmpFld=document.createElement('input');
tmpFld.setAttribute("type", "radio");
tmpFld.setAttribute("name", "radioPack");
tmpFld.id = "radioIconPackHex";
if(localStorage["DazeyMod.iconPack"] == "Hex") {
  tmpFld.checked=true;
}
tmpTd.appendChild(tmpFld);
tmpTd.appendChild( document.createTextNode("\u00A0") );
for(i=0; i<loginIconHex.length; i++) {
  tmpImg=document.createElement('img');
  tmpImg.src="http://cf.geekdo-images.com/images/pic"+loginIconHex[i];
  tmpTd.appendChild(tmpImg);
}
tmpTd.appendChild( document.createElement('br') );
tmpTr.appendChild(tmpTd);
// Icons - Hour
var tmpRow=document.createElement('div');
var tmpFld=document.createElement('input');
tmpFld.setAttribute("type", "radio");
tmpFld.setAttribute("name", "radioPack");
tmpFld.id = "radioIconPackHour";
if(localStorage["DazeyMod.iconPack"] == "Hour") {
  tmpFld.checked=true;
}
tmpRow.appendChild(tmpFld);
tmpRow.appendChild( document.createTextNode("\u00A0") );
for(i=0; i<loginIconHour.length; i++) {
  tmpImg=document.createElement('img');
  tmpImg.src="http://cf.geekdo-images.com/images/pic"+loginIconHour[i];
  tmpImg.title="Art by Floodgate";
  tmpRow.appendChild(tmpImg);
}
tmpTd.appendChild(tmpRow);
tmpTr.appendChild(tmpTd);

// Icon Day Ranges
tmpTd=document.createElement('td');
tmpTd.style.verticalAlign="top";
tmpTd.style.padding="0px 10px";
tmpTd.style.borderRight="1px dotted black";
tmpHdr=document.createElement('div');
tmpHdr.style.textAlign="center";
tmpHdr.style.paddingBottom="5px";
tmpHdr.style.fontWeight="bold";
tmpHdr.appendChild( document.createTextNode("Custom Days") );
tmpTd.appendChild(tmpHdr);
// Ranges
for (i=0; i < loginDays.length; i++) {
  tmpImg=document.createElement('img');
  tmpImg.src="http://cf.geekdo-images.com/images/pic"+loginIcons[i];
  tmpImg.id="Dazeymod.DayRangeIcon."+i;
  tmpTd.appendChild(tmpImg);
  tmpTd.appendChild( document.createTextNode("\u00A0:\u00A0") );
  tmpFld=document.createElement('input');
  tmpFld.setAttribute("type", "text");
  tmpFld.id = "checkIconDays"+i;
  tmpFld.value = loginDays[i];
  tmpFld.size="3";
  tmpTd.appendChild(tmpFld);
  tmpTd.appendChild( document.createTextNode("\u00A0+ days") );
  tmpTd.appendChild( document.createElement('br') );
}
tmpTr.appendChild(tmpTd);

// Other Settings
tmpTd=document.createElement('td');
tmpTd.style.verticalAlign="top";
tmpTd.style.padding="0px 10px";
tmpHdr=document.createElement('div');
tmpHdr.style.textAlign="center";
tmpHdr.style.paddingBottom="5px";
tmpHdr.style.fontWeight="bold";
tmpHdr.appendChild( document.createTextNode("Other Settings") );
tmpTd.appendChild(tmpHdr);
// Context Menu Option
tmpFld=document.createElement('input');
tmpFld.setAttribute("type", "checkbox");
tmpFld.id = "checkContextMenu";
tmpFld.checked=(localStorage["DazeyMod.showContextMenu"]=="true");
tmpTd.appendChild(tmpFld);
tmpTd.appendChild( document.createTextNode("\u00A0Enable right-click menu") );
tmpTd.appendChild( document.createElement('br') );
// Move QuickBar Option
tmpFld=document.createElement('input');
tmpFld.setAttribute("type", "checkbox");
tmpFld.id = "checkQuickBar";
tmpFld.checked=(localStorage["DazeyMod.moveQuickBar"]=="true");
tmpTd.appendChild(tmpFld);
tmpTd.appendChild( document.createTextNode("\u00A0Move QuickBar down") );
tmpTr.appendChild(tmpTd);


// End the first TR
tmpTbl.appendChild(tmpTr);


tmpTr=document.createElement('tr');
tmpTd=document.createElement('td');
tmpTd.setAttribute("colspan", "2");
tmpDv2=document.createElement('div');
tmpDv2.style.cssFloat="left";
tmpDv2.style.padding="10px";
// Add a Save button
tmpFld=document.createElement('input');
tmpFld.setAttribute("type", "button");
tmpFld.setAttribute("value", "Save");
tmpFld.addEventListener("click", saveDazeyModSettings, false);
tmpDv2.appendChild(tmpFld);

tmpDv2.appendChild( document.createTextNode("\u00A0\u00A0") );

// Add a Close button
tmpFld=document.createElement('input');
tmpFld.setAttribute("type", "button");
tmpFld.setAttribute("value", "Close");
tmpFld.addEventListener("click", showHideSettings, false);
tmpDv2.appendChild(tmpFld);
tmpTd.appendChild(tmpDv2);

// Status box
tmpSts=document.createElement('div');
tmpSts.id="DazeyMod.SettingsStatus";
tmpSts.style.padding="10px";
tmpSts.style.cssFloat="left";
tmpSts.style.fontWeight="bold";
tmpSts.appendChild( document.createTextNode("") );
tmpTd.appendChild(tmpSts);

tmpTr.appendChild(tmpTd);
tmpTbl.appendChild(tmpTr);
tmpFrm.appendChild(tmpTbl);

// Add the Form & Settings Div to the page
tmpDiv.appendChild(tmpFrm);
document.getElementById('maincontent').appendChild(tmpDiv);
// Disable the Blue 0 field
document.getElementById('checkIconDays0').disabled=true;


// Make a "bluebox" at the top of the content for our use
tmpDiv = document.createElement('div');
tmpDiv.id = "DazeyModSettings";
tmpDiv.setAttribute("class", "bluebox");
tmpDiv.appendChild(document.createTextNode("DazeyMod\u00A0\u00A0\u00A0"));
// Add a settings button
tmpElm=document.createElement('a');
tmpElm.addEventListener("click", showHideSettings, false);
tmpImg=document.createElement('img');
tmpImg.src="http://cf.geekdo-images.com/images/pic1991213.png";
tmpImg.style.cursor="pointer";
tmpImg.title="DazeyMod Settings";
tmpElm.appendChild(tmpImg);
tmpDiv.appendChild(tmpElm);
tmpDiv.appendChild(document.createTextNode("\u00A0\u00A0\u00A0"));
// Add a manual button
tmpElm=document.createElement('a');
tmpElm.addEventListener("click", function(){showLoginDates("manual");}, false);
tmpImg=document.createElement('img');
tmpImg.src="http://cf.geekdo-images.com/images/pic"+loginIcons[0];
tmpImg.style.cursor="pointer";
tmpImg.id="DazeyMod.ManualIcon";
tmpImg.title="Manually Load Last Login Data";
tmpElm.appendChild(tmpImg);
tmpDiv.appendChild(tmpElm);
// Stick our bluebox at the top of main_content
document.getElementById('main_content').insertBefore(tmpDiv, document.getElementById('main_content').childNodes[0]);


// Move QuickBar if needed
document.getElementById('quickbar_status').parentNode.parentNode.id="QBParent";
quickBar = document.getElementById('quickbar_status').parentNode;
if(localStorage["DazeyMod.moveQuickBar"]=="true"){
  document.getElementById('main_content').insertBefore(quickBar, document.getElementById('main_content').childNodes[0]);
}


function saveDazeyModSettings() {
  console.log("saveDazeyModSettings()");
  if(document.getElementById('radioTextNever').checked) {
    localStorage["DazeyMod.showLoginText"]="never";
  }
  if(document.getElementById('radioTextManual').checked) {
    localStorage["DazeyMod.showLoginText"]="manual";
  }
  if(document.getElementById('radioTextAlways').checked) {
    localStorage["DazeyMod.showLoginText"]="always";
  }
  if(document.getElementById('radioTextSelected').checked) {
    localStorage["DazeyMod.showLoginText"]="selected";
  }
  localStorage["DazeyMod.showLoginTextGeeklists"]=document.getElementById('checkTextGeeklists').checked;
  localStorage["DazeyMod.showLoginTextTrades"]=document.getElementById('checkTextTrades').checked;
  localStorage["DazeyMod.showLoginTextForums"]=document.getElementById('checkTextForums').checked;
  
  console.log("Save Icon Settings");
  if(document.getElementById('radioIconNever').checked) {
    console.log("Show Icon Never");
	localStorage["DazeyMod.showLoginIcon"]="never";
  }
  if(document.getElementById('radioIconManual').checked) {
    console.log("Show Icon Manual");
	localStorage["DazeyMod.showLoginIcon"]="manual";
  }
  if(document.getElementById('radioIconAlways').checked) {
    console.log("Show Icon Always");
	localStorage["DazeyMod.showLoginIcon"]="always";
  }
  if(document.getElementById('radioIconSelected').checked) {
    console.log("Show Icon Selected");
	localStorage["DazeyMod.showLoginIcon"]="selected";
  }
  console.log("Save Icon Selections");
  localStorage["DazeyMod.showLoginIconGeeklists"]=document.getElementById('checkIconGeeklists').checked;
  localStorage["DazeyMod.showLoginIconTrades"]=document.getElementById('checkIconTrades').checked;
  localStorage["DazeyMod.showLoginIconForums"]=document.getElementById('checkIconForums').checked;
  
  console.log("Save Icon Pack");
  var oldPack = localStorage["DazeyMod.iconPack"];
  if(document.getElementById('radioIconPackD10').checked) {
    console.log("Icon Pack: D10");
	localStorage["DazeyMod.iconPack"]="D10";
  }
  if(document.getElementById('radioIconPackHex').checked) {
    console.log("Show Icon Manual");
	localStorage["DazeyMod.iconPack"]="Hex";
  }
  if(document.getElementById('radioIconPackHour').checked) {
    console.log("Show Icon Always");
	localStorage["DazeyMod.iconPack"]="Hour";
  }
  if(oldPack != localStorage["DazeyMod.iconPack"]) {
    if(localStorage["DazeyMod.iconPack"]=="D10") {
      loginIcons = loginIconD10;
    }
    if(localStorage["DazeyMod.iconPack"]=="Hex") {
      loginIcons = loginIconHex;
    }
    if(localStorage["DazeyMod.iconPack"]=="Hour") {
      loginIcons = loginIconHour;
    }
	refreshIcons();
  }
  
  console.log("Save Day Ranges");
  tmpDays = new Array();
  for (i=0; i<6; i++) {
    tmpDays[i] = document.getElementById("checkIconDays"+i).value;
  }
  localStorage["DazeyMod.iconDays"]=JSON.stringify(tmpDays);
  
  console.log("Save Other Settings");
  console.log("Save Context Menu");
  if(localStorage["DazeyMod.showContextMenu"]=="false" && document.getElementById('checkContextMenu').checked){
    createContextMenu();
  }
  if(localStorage["DazeyMod.showContextMenu"]=="true" && !document.getElementById('checkContextMenu').checked) {
    var tmpMnu = document.getElementById("DazeyModMenu");
    tmpMnu.parentNode.removeChild(tmpMnu);
  }
  localStorage["DazeyMod.showContextMenu"]=document.getElementById('checkContextMenu').checked;
  
  console.log("Save QuickBar Option");
  if(localStorage["DazeyMod.moveQuickBar"]=="false" && document.getElementById('checkQuickBar').checked){
    document.getElementById('main_content').insertBefore(quickBar, document.getElementById('main_content').childNodes[0]);
  }
  if(localStorage["DazeyMod.moveQuickBar"]=="true" && !document.getElementById('checkQuickBar').checked) {
    document.getElementById('QBParent').insertBefore(quickBar, document.getElementById('QBParent').childNodes[0]);
  }
  localStorage["DazeyMod.moveQuickBar"]=document.getElementById('checkQuickBar').checked;
  
  // Show "Saved" status
  document.getElementById('DazeyMod.SettingsStatus').childNodes[0].data="Saved"
  window.setTimeout(function(){ 
    document.getElementById('DazeyMod.SettingsStatus').childNodes[0].data=""
  }, 2500);
  
  
} // End saveBBGmodSettings


function showHideTextSelected() {
  if (document.getElementById('radioTextSelected').checked == true) {
    document.getElementById('checkTextGeeklists').disabled=false;
	document.getElementById('checkTextTrades').disabled=false;
	document.getElementById('checkTextForums').disabled=false;
  } else {
    document.getElementById('checkTextGeeklists').disabled=true;
	document.getElementById('checkTextTrades').disabled=true;
	document.getElementById('checkTextForums').disabled=true;
  }
} // End showHideTextSelected
showHideTextSelected()

function showHideIconSelected() {
  if (document.getElementById('radioIconSelected').checked == true) {
    document.getElementById('checkIconGeeklists').disabled=false;
	document.getElementById('checkIconTrades').disabled=false;
	document.getElementById('checkIconForums').disabled=false;
  } else {
    document.getElementById('checkIconGeeklists').disabled=true;
	document.getElementById('checkIconTrades').disabled=true;
	document.getElementById('checkIconForums').disabled=true;
  }
} // End showHideIconSelected
showHideIconSelected()

function showHideSettings() {
  console.log("showHideSettings()");
  if (document.getElementById('settingsDiv').style.visibility == "hidden") {
    document.getElementById('settingsDiv').style.visibility = "visible";
  } else {
    document.getElementById('settingsDiv').style.visibility = "hidden";
  }
}