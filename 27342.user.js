// ==UserScript==
// @name		Travian local village renamer
// @namespace	Travian
// @description	Various Travian Modifications
// @include	*travian*
// @version	0.0.1
// ==/UserScript==

// global variables
var imgpath = '';
var Prefs = '';
var infoDIV = addDiv('TMpopup','TMpopup','',false);
var User, Server, UniqueID, Page, ActiveVillage, VillageNumber;
var VillageIDs = new Array();
var VillageLinks = new Array();
var VillageNames = new Array();
var VillageCoords= new Array();
var abr= new Array();

abr[0] = 'Bosque';
abr[1] = 'Hierro II';
abr[2] = 'Bosque II';
abr[3] = 'Castigo';
abr[4] = 'Hierro';
abr[5] = 'Venganza';
abr[6] = 'Torida';
abr[7] = 'Plaza fuerte';
abr[8] = 'Ochenta';
abr[9] = 'Caballería';
abr[10] = 'Arcilla II';
abr[11] = 'Siete';
abr[12] = 'Ninguna parte II';
abr[13] = 'Ninguna parte';
abr[14] = 'Jerarquía';
abr[15] = 'Arcilla';
abr[16] = 'Almacén';
abr[17] = 'Caracoles';
abr[18] = 'Guarida del Dragón';


var Xnull = "";
var Xdone = "";
var Xon = "";
var XonX = "";
var XRed = "";
var Xarrow = "";
var Xg0 = "";
var Xg1 = "";
var Xg4 = "";
var Xg2 = "";
var Xg3 = "";
var Bulldozer1 = "";
var Bulldozer0 = "";
var Xadd = "";

var O = 0;
var T = A();
var Timer = new Object();var TimerCount = 1;
var RelayTimer = new Object();var RelayTimerCount = 1;

// ›› Event listener starts things off once the page is done loading.
window.addEventListener("load",init,false);

// ›› Execution logic loop
function init() {
		if (GM_getValue("InActive")){						inactivestub();}else{
		if (!(/travian/.exec(document.domain))) {	offsitestub();}else{
		var SS1 = TM_searchDOM('//a[@class="active_vl"]');
		var SS2 = TM_searchDOM('//a[@href="logout.php"]')
		if (SS1.snapshotItem(0) && SS2.snapshotItem(0)){
			var X1 = /(\d+)/.exec(SS2.snapshotItem(0).previousSibling.getAttribute("href"));
			var X2 = /newdid=(\d+)/.exec(SS1.snapshotItem(0).getAttribute("href"));
			User = X1[1];
			ActiveVillage = X2[1];
			Server = document.domain;
			UniqueID = Server + '.' + User + '.';
			Page = window.location.href;
			var SS3 = TM_searchDOM('//td[@class="nbr"]//a')
			var SS4 = TM_searchDOM('//table[@class="dtbl"]//td[@class]')
			var Miestas = 'pimpis';
			VillageNumber = SS3.snapshotLength;
			for ( var i=0 ; i < SS3.snapshotLength; i++ ) {
				var X3 = /newdid=(\d+)/.exec(SS3.snapshotItem(i).getAttribute("href"));
				var X4 = /(-*\d+)/.exec(SS4.snapshotItem(i*3).innerHTML);
				var X5 = /(-*\d+)/.exec(SS4.snapshotItem(i*3+2).innerHTML);
				VillageIDs[i] = X3[1];
				VillageLinks[i] = SS3.snapshotItem(i).getAttribute("href");
				VillageNames[i] = SS3.snapshotItem(i).innerHTML;
				VillageCoords[i] = X4[1] + '|' +  X5[1];
			}
			var SS5 = TM_searchDOM('//link[@rel="stylesheet"]')
			for (var i=0;i<SS5.snapshotLength;i++){var str=SS5.snapshotItem(i);var pos=str.href.indexOf('unx.css');if(pos!=-1){imgpath=str.href.substring(0,pos);}} // tnx MexoaN =]
			if (!GM_getValue(UniqueID+ActiveVillage+".TimedEvents")){GM_setValue(UniqueID+ActiveVillage+'.TimedEvents','9/9999/2185000000/NULL/0');}
			if (!GM_getValue(UniqueID+"Prefs")){GM_setValue(UniqueID+"Prefs",'0.1.1.0.0.T.S');}
			Prefs = GM_getValue(UniqueID+"Prefs").split('.');
			makeDefaultCSS();
			scripts();
			}}}}
			// ›› Inactive stub.
			function inactivestub (){alert('Bad news =[  No place to save preferences.  Firefox required.  If you have Firefox, your version of Greasemonkey might be too old.  If this is the case... UPGRADE NOW. There are SERIOUS security issues with older versions of Greasemonkey!');}
			// ›› Offsite stub.

			function redirect() {}
// ›› Individual scripts.
function scripts() {
//	TM_ShowTotalProduction();
//	TM_GetBuildInfo();
//  TM_RemoveOldEvents(ActiveVillage);
//	TM_AddListener();
	TM_ShowEvents();
//	TM_ShowMainBuildingNumbers();
//	TM_CreateMenu();
// 	TM_AddManualListeners(TM_searchDOM('//span[@id="timer1"]'));
//	TM_AddManualListeners(TM_searchDOM('//span[@id="timer2"]'));
//	TM_AddTroopListener(TM_searchDOM('//span[@id="timer1"]'))
	//TM_CalculateMarket();
	//TM_FillMarket();
}

// DISPLAY /////////// These functions visibily alter the page.
// ›› Settings menu.
// ›› Modifies the Village list by adding the event information.
function TM_ShowEvents(){
	var IMG = new Array();
	var SS1 = TM_searchDOM('//div[@id="lright1"]/table/tbody/tr')

	// These 3 lines are for determining the number of columns in a finished table row in order to set the colspan for the timer rows.
	var L=1;for (var i=1;i<5;i++) {if (Prefs[i]=="1"){L++;}}
	var SS2 = TM_searchDOM('//div[@id="lright1"]/table/tbody/tr/td');							
	var Colspan = (SS2.snapshotLength/VillageNumber) + L;if (Prefs[0]=='M'){Colspan--;}

	// [--1--] For every table row.
	
	
	for ( var i=0 ; i < SS1.snapshotLength; i++ ) {
		var TimersPerRow = 0; 			// ued to determine start and end numbers for the timers in this row
		var xTR = SS1.snapshotItem(i);
		var xTD = SS1.snapshotItem(i).firstChild;
		// xTD.removeChild(xTD.firstChild);xTD.removeChild(xTD.firstChild); // remove the span with the small indicator dot
//		var TD = document.createElement('TD');if (VillageIDs[i]==ActiveVillage){TD.innerHTML = '<img src="'+Xarrow+'">';}xTR.insertBefore(TD,xTD); // replace it with the arrow

		var TD = document.createElement('TD'); TD.innerHTML = abr[i]; xTR.insertBefore(TD,xTD); // replace it with the arrow

		// [--2--] show a column for each active display
		for (var j=1;j<5;j++){
			if (Prefs[j]=='1'){
				var m=j;
				if((Prefs[0]=='M')&&(j==2)&&(Prefs[1]=="1")){m=j-1;}
				if (m==j){
					var TD = document.createElement('TD');
					IMG[m] = document.createElement('IMG');
					IMG[m].src = Xnull;
					if((!GM_getValue(UniqueID+VillageIDs[i]+".Dorf1")&&j==1)||(!GM_getValue(UniqueID+VillageIDs[i]+".Dorf2")&&j==2)){IMG[m].src = XRed;Prefs[6]='0'}
					IMG[m].setAttribute('TMsrcDefault',Xnull);
					IMG[m].setAttribute('TMsrcOn',Xon);
					IMG[m].setAttribute('TMsrcOnMore',XonX);
					IMG[m].setAttribute('TMsrcDone',Xdone);
					IMG[m].addEventListener('mouseover',function(e){TM_ShowEventPopup(e,this);},true);
					IMG[m].addEventListener('mouseout',function(e){infoDIV.innerHTML='';infoDIV.style.visibility = 'hidden';},true);
				}
					
				// [--3--] Loop through timed events to see if this image should be activated and assigned a timer.
				OOO = GM_getValue(UniqueID+VillageIDs[i]+".TimedEvents")
				if(OOO){
					OO = OOO.split(':');
					var VCETimer = false;
					var VCERelayTimer = false;
					for (var k=0;k<OO.length;k++) {
						var O = OO[k].split('/');
						//if (parseInt(O[0]) == 0){TM_ShowDemolish(O)};
						if (parseInt(O[0]) == j){
							// [--4--] Create or update timers for this event.  Reassign pass-control based on duration.
							var Duration = pI(O[1])+pI(O[2])-A(); // duration of the timer adjusted for the current time
							if(Duration>0){
								if (!VCETimer){
									if(pI(O[0])>2){	TM_Timer(TimerCount,VillageIDs[i],m,true,Duration,pI(O[3]),IMG[m],false,false,false,false);VCETimer=true;TimersPerRow++;}
									else{				TM_Timer(TimerCount,VillageIDs[i],m,true,Duration,false,IMG[m],false,false,false,false);VCETimer=true;TimersPerRow++;}
									IMG[m].src = IMG[m].getAttribute('TMsrcOn');
									IMG[m].setAttribute('TMsrcDefault',IMG[m].getAttribute('TMsrcOn'));
									IMG[m].id = 'TMtimer' + TimerCount;
									IMG[m].setAttribute('TMinfo',OO[k]);
								}else{
									IMG[m].setAttribute('TMinfo',IMG[m].getAttribute('TMinfo') + ':' + OO[k]); 			//update the build info
									if(!VCERelayTimer){
										Timer[TimerCount-1].pass_control_duration = Timer[TimerCount-1].duration; //register a pass control duration
										Timer[TimerCount-1].relay_timer = TM_RelayTimer(RelayTimerCount,parseInt(O[1]),false);VCERelayTimer=true;
									}else{
										RelayTimer[RelayTimerCount-1].relay_timer = TM_RelayTimer(RelayTimerCount,parseInt(O[1]),false);
									}
									Timer[TimerCount-1].duration = Duration; 														//update the total timer for this column
								}
							}else{
								IMG[m].src = IMG[m].getAttribute('TMsrcDone');
								IMG[m].id = 'TMtimerexpired' + TimerCount;
								IMG[m].setAttribute('TMinfo',OO[k]);
							}}}}
				if (m==j){
					TD.appendChild(IMG[m]);
					xTR.insertBefore(TD,xTD);
				}}}
		// if timers are shown add a row
		 if (Prefs[5]=='T'){
			var ST = 36000000; //Shortest Timer
			var STC =false;		// Shortest Timer Count
			if (TimersPerRow!=0){
				for (var g=TimerCount-TimersPerRow; g<TimerCount; g++) {if(Timer[g].duration<ST && Timer[g].duration>0){ST=Timer[g].duration;STC=g;}}
				if(STC){
					var TR = document.createElement('TR');
					var TD =  document.createElement('TD');
					TD.setAttribute('colspan',Colspan);
					TM_CreateTimerRow(STC,TD);
					Timer[STC].pass_column = TimerCount-TimersPerRow + ':' + TimerCount;
					TR.appendChild(TD);
					xTR.parentNode.insertBefore(TR,xTR.nextSibling);
				}}}}
	setInterval(TM_ActivateTimers,1000);
}

// ›› Popup Info
// DISPLAY \\\\\\\\\\\


// ›› Store a new event.

// ›› Update an existing event. Replaces all events of that type with the new value at that index.
// ›› Filter on time left less than 5 seconds to remove any completed or almost completed events.

// ›› Not functional yet. Need to work on interface




// TIMER ///////////
function W(i){Timer[i].image_element.src = Timer[i].image_element.getAttribute('TMsrcOnMore');}
function A(){return Math.round(new Date().getTime()/1000);}
function Z(FormattedTime){
	p = FormattedTime.split(":");
	aY=p[0]*3600+p[1]*60+p[2]*1;
	return aY;}
function Y(Seconds){
	if (Seconds<0){Seconds = Seconds*-1;}
	az=Math.floor(Seconds/3600);
	an=Math.floor(Seconds/60)%60;if(an<10){an="0"+an;}
	af=Seconds%60;						if(af<10){af="0"+af;}
	t=az+':'+an+':'+af;
	return t;}



// UTILITY + CSS \\\\\\\\\\\
// ›› Wrappers.
function TM_searchDOM(X){return document.evaluate(X,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}
function pI(X){return parseInt(X);}

// ›› Adds a generic div.
function addDiv(id,style,html,parent){
	var body, div;
	if (!parent){body = document.getElementsByTagName('body')[0];}else{body = document.getElementById(parent);}
	if (!body) {return false;}
	div = document.createElement('DIV');
	if (id)		{div.id = id;}
	if (style)	{div.className = style;}
	if (html)	{div.innerHTML = html;}
	body.appendChild(div);
	return div;
}

// ›› Adds a generic image.
function addImg(id,style,src,parent){
	var body, img;
	if (!parent){body = document.getElementsByTagName('body')[0];}else{body = document.getElementById(parent);}
	if (!body) {return false;}
	img = document.createElement('IMG');
	if(id)		{img.id = id};
	if(style)		{img.className = style};
	if(src)		{img.src = src};
	body.appendChild(img);
	return img;
}

// ›› Add generic CSS 
function addCSS(cssString) {
	var style = document.createElement('STYLE');
	style.type = 'text/css';style.innerHTML = cssString;
	document.getElementsByTagName('HEAD')[0].appendChild(style);
}

// ›› Make default CSS.
function makeDefaultCSS(){
	var cssString = "";
	addCSS('.TMnull{position:relative;}');
	cssString = '.TMpopup{' +
		'background-color:white;' + 
		'border:thin solid #000000;' +
		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
		'font-size:8pt;' +
		'font-weight:bold;' +
		'padding-bottom:3px;' +
		'padding-left:3px;' + 
		'padding-right:3px;' + 
		'padding-top:3px;' + 
		'position:absolute;' +
		'visibility:hidden;' +
		'z-index:200;}';
	addCSS(cssString);
	cssString = '.TMdisplay{' +
		'cursor:pointer;' +
		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
		'font-size:8pt;' +
		'float:left;' + 
		'margin:3px;' +
		'padding:3px;' + 
		'position:relative;}';
	addCSS(cssString);
	cssString = '.TMmain{' +
		'border:thin solid #000000;' +
		'bottom:5px;' +
		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
		'font-size:8pt;' +
		'font-weight:bold;' +
		'padding-bottom:5px;' +
		'padding-left:5px;' + 
		'padding-right:5px;' + 
		'padding-top:5px;' + 
		'position:fixed;' +
		'right:8px;' +
		'z-index:50;}';
	addCSS(cssString);
	var cssString = '.TMbuildingtags{' +
		'background-color:#FDF8C1;' + 
		'border:thin solid #000000;' +
		'cursor:pointer;' +
		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
		'font-size:8pt;' +
		'font-weight:bold;' +
		'height:14px;' +
		'position:absolute;' +
		'text-align:center;' +
		'visibility:hidden;' +
		'width:21px;' +
		'z-index:50;}';
	addCSS(cssString);
	cssString = '.TMtimers{' +
		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
		'font-size:8pt;' +
		'float:left;' + 
		'padding-bottom:1px;' +
		'padding-left:15px;' +
		'position:relative;' +
		'z-index:50;}';
	addCSS(cssString);
	cssString = '.TMleftmenu{' +
		'background-color:white;' + 
		'cursor:pointer;' +
		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
		'font-size:7pt;' +
		'font-weight:bold;' +
		'padding-bottom:5px;' +
		'padding-left:15px;' +
		'padding-right:15px;' +
		'position:absolute;' +
		'width:100px;' +
		'top:-17px;' + 
		'z-index:4;}';
	addCSS(cssString);
	cssString = '.TMdemo{' +
		'position:fixed;' +
		'top:108px;' +
		'right:8px;' + 
		'z-index:50;}';
	addCSS(cssString);
}
