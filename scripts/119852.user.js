// ==UserScript==
// @name           tester 2000
// @namespace      post-interceptor.user.jspost-interceptor.user.js
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.js
// @description    you must use chrome
// @version        4.25 alpha test
// @include        *batheo.clapalong.com/*
// @include        *www.clapalong.com/*
                   
// ==/UserScript==

var version = "4.25 alpha test";


var decodeResponse_url_Stack = [ 
"http://ekhof.net46.net/getResponse.php",
"http://ekhof.freeiz.com/getResponse.php",
"http://ekhof.host22.com/getResponse.php" ];


var boturl_Stack = [ 
"http://ekhof.net46.net/transbot_for_batheo.user.js",
"http://ekhof.freeiz.com/transbot_for_batheo.user.js",
"http://ekhof.host22.com/transbot_for_batheo.user.js" ];


// TODO:

// Bugs:
// none known

// Feature:
// Make garden run in a certain time of a day or at a certain amount of div available?
// Getting Aide divs
// Show how many daily quests left
// Display free comission if any
// Display activity if any to take (like "hegemony", "stock up" etc.)

// Auto invest?
// Auto league tech invest?
// Auto tech invest when there is enough laurels (always the cheapest?)
// Auto transc apply to lowest Xp hero?
// auto fight free fights + gui etc.
// Banner search for trader
// Player search
// During update or other critical operation, disable all controls?

// Auto refine
// Auto Training
// Auto levy by individual settings

// Add auto garden join
// Add auto legion join
// Position recognition and continuation of broken garden anywhere
// Add nearest enemy path mapping
// Auto farm
// Auto Silver mine
// Auto comission?
// One click equipment swap between heroes?
// One click complete degrade?

// Investigate Flash commanding
// Portrait swaps?


//4.10
// now should work with EU servers

//4.09
// work with EU servers? (no)

//4.08
// minor tweaks

//4.07
// countdowns display only once now, if they are not zero

//4.06
// Auto conscription improved

//4.05
// multiple garden runs should work
// Auto conscription added
// Checkbox behaviour fixed

//4.04
// Another overhaul of update system, should be ok now...

//4.03
//Fixed long standing bug of countdown 0 remained red
//Fixed garden bug, properly finishing runs in Thalassa should be ok

//4.02
//update process and initialization completely overhauled
//Made update check on every run + in every 3 hours if bot still running

//4.01
//version update process improved

//4.00
// bot commands look like normal game commands on the network
// Add value refresher gui
// Add auto crop selling
// Add auto garden recognition
// it saves settings



//General Global Variables
var fightcountdown_is_on = false;
var welcome ="Do 'Launch Attack',\nthen when you see:\n'Battle initializing'\nTHEN IMMEDIATELY\nclick 'Start Garden'!";


var headers_get;

var headers_post;





// BOT ENGINE URLS
//var getvalueurl = "http://ekhof.freeiz.com/getValue.php";
//var getvalueurl2 = "http://ekhof.net46.net/getValue.php";







//"Get levels" defaults
var show_levels = true;
var tl;

//Trans bot
var str;
var firstsecond = true;
var movecounter = 0;
var t,t1,t2,t3;
var fight_is_on = false;
var runs = 1;
var maxruns = 1;
var timeZone = 0;
var server;


/**********************************/
/****** COMMON UTILS SECTION ******/
/**********************************/







function leadzero(i)
{
  if (i<10)
  {
    i="0" + i;
  }
  return i;
}


function msec2time(ms)
{


  var Hours = ms / (1000*60*60);
  var Minutes = (ms % (1000*60*60)) / (1000*60);
  var Seconds = ((ms % (1000*60*60)) % (1000*60)) / 1000;
  var time = leadzero(Math.floor(Minutes)) +":"+ leadzero(Math.floor(Seconds));

  return time;
}

function msec2fulltime(ms)
{


  var Hours = ms / (1000*60*60);
  var Minutes = (ms % (1000*60*60)) / (1000*60);
  var Seconds = ((ms % (1000*60*60)) % (1000*60)) / 1000;
  var time = leadzero(Math.floor(Hours)) + ":" + leadzero(Math.floor(Minutes)) +":"+ leadzero(Math.floor(Seconds));

  return time;
}





function leftOfThirtyMin(minutes, seconds) 
{
    return ((((30 - (minutes % 30) - ((seconds>0)?1:0)) * 60) + (60 - seconds)) * 1000);
}



function data_string(data) // Generates binary data string from character / multibyte data
{
        var data_string='';
        for(var i=0,il=data.length;i<il;i++)data_string+=String.fromCharCode(data[i].charCodeAt(0)&0xff);
        return data_string;
};


function about()
{
   jAbout("Bot for Batheo\n\n\n(Version: "+version+")\n\n\nby Janosinus 2011.", 'About');
}



function info()
{

    jInfo('Do "Launch Attack",then when you see:\n"Battle initializing..."\nTHEN IMMEDIATELY click "Start Garden"!\n\n<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank"><input type="hidden" name="cmd" value="_donations"><input type="hidden" name="business" value="boba.fatt@rocketmail.com"><input type="hidden" name="lc" value="GB"><input type="hidden" name="currency_code" value="GBP"><input type="hidden" name="bn" value="PP-DonationsBF:btn_donate_SM.gif:NonHosted"><input type="image" src="'+donate_datauri+'" border="0" name="submit" alt="PayPal - The safer, easier way to pay online."><img alt="" border="0" src="'+pixel_datauri+'" width="1" height="1"></form>\nPlease donate, if you want to see\nthis project to develop further! :)', 'Info', function(r)
    {
      if(r)
      {
        setTimeout(function(){about();},1000);
      }
    });
   
   //<input id="about" type="button" value="About" />
}


function status(st,bx)
{
  var textbox ="";
  var nl = "";
  if(bx==1) { var textbox = document.getElementById("txtbx"); }
  if(bx==2) { var textbox = document.getElementById("txtbx2"); }
  if(st=="clearbox") { textbox.value = ""; }
  else 
  { 
    if(textbox.value != "") { nl = "\n"; }
    textbox.value = textbox.value + nl + st; 
  }
textbox.scrollTop=textbox.scrollHeight;  
}


function toggle_visibility(id) {
var e = document.getElementById(id);
if(e.style.display == 'none')
e.style.display = 'inline';
else
e.style.display = 'none';
}

/************************************/
/****** INITIALIZATION SECTION ******/
/************************************/


function resetall()
{

  var m = "Revert to the default settings will also\nautomatically refresh this page/tab!";
  jConfirm(m, 'Confirmation', function(r) 
  {
    if(r)
    {
      show_levels=false;
      //GM_deleteValue("notfirstbotrun");
      GM_deleteValue("timeZoneDiff");
      GM_deleteValue("UpgradeTime");
      GM_deleteValue("server");
      GM_deleteValue("gameSwfReferer");
      GM_deleteValue("crdesiprice");
      GM_deleteValue("updatelastchecked");
      GM_deleteValue("crdesiprice");
      GM_deleteValue("consdesipercent");
      GM_deleteValue("refdesiprice");
      GM_deleteValue("reflevel");
      status("All settings are default now.",1);
      status("Refreshing browser in 5 sec!",1);
      setTimeout(function(){ window.location.href=window.location.href; }, 5000);
    }
  });
}



window.addEventListener("load", function(e) {

GM_addStyle("#popup_container {	font-family: Arial, sans-serif;	font-size: 12px;	min-width: 300px; max-width: 600px; background: #FFF;	border: solid 5px #999;	color: #000;	-moz-border-radius: 5px;	-webkit-border-radius: 5px;	border-radius: 5px;} #popup_title {	font-size: 14px;	font-weight: bold;	text-align: center;	line-height: 1.75em;	color: #666; background: #CCC url("+ title_datauri +") top repeat-x;	border: solid 1px #FFF;	border-bottom: solid 1px #999;	cursor: default;	padding: 0em;	margin: 0em;} #popup_content { background: 10px 10px no-repeat url("+ alert_datauri +");padding: 1em 1.75em; margin: 0em;} #popup_content.alert { background-repeat:no-repeat; background-image: url("+ alert_datauri +");	margin: 0em;} #popup_content.confirm{ background-repeat:no-repeat; background-image: url("+ confirm_datauri +"); margin: 0em;} #popup_content.prompt { background-repeat:no-repeat; background-image: url("+ prompt_datauri +"); margin: 0em;} #popup_message {	padding-left: 64px;} #popup_panel {	text-align: center;	margin: 1em 0em 0em 1em;} #popup_prompt {	margin: .5em 0em;}");


//#popup_content.about { background-position:5px 5px; background-repeat:no-repeat; background-image: url(" + drachma_datauri + ");padding: 1em 1.75em;	margin: 0em;}

 
addButtons();
     
}, false);


function addButtons(){
 var buttonElems = document.getElementsByTagName('ul');
 buttonElems[1].innerHTML = '<input style="vertical-align:middle;" type=checkbox id="tickAll" checked /><span style="color: rgb(255, 186, 0);vertical-align:middle;">&nbsp;Show Transbot v'+version+'</span><br /><div id="controls"><input id="gardenButton" type="button" value="Start Garden"/><input id="stopButton" type="button" value="Stop!"/><input id="runButton" type="button" value="Runs"/><span>&nbsp;&nbsp;</span><img src="'+ tiny_red_spin_datauri +'" id="indicator1" style="vertical-align:middle; display: none" /><br /><textarea id="txtbx" cols="20" rows="7"></textarea><span>Action cd:&nbsp;&nbsp;</span><span id="actionCd"></span><br /><input id="info" type="button" value="Info" /><input id="serverButton" type="button" value="Server"/><input id="resetButton" type="button" value="Defaults" /><input id="update" type="button" value="Update"/><br /><br /><input style="vertical-align:middle;" type=checkbox id="tickLevels" checked/><span style="color: rgb(255, 186, 0);vertical-align:middle;">&nbsp;Refreshing values&nbsp;</span><span id="indicator2"><span>(in&nbsp;</span><span id="thirtyMinLeft"></span><span>min)&nbsp;</span><img src="'+ tiny_red_spin_datauri +'"  style="vertical-align:middle;filter:alpha(opacity=80);opacity:0.8;" /></span><br /><table width=160 style="table-layout:fixed"><col width=50><col width=25><col width=35><col width=40><col width=10>  <tr>    <th>Value</th>    <th>Dir</th>    <th>Cd</th>    <th>Left</th>    <th>Auto?</th>  </tr>  <tr>    <td><span id="pg">PG: %</span></td>    <td><span id="pgdir">()</span></td>    <td><span id="pgcd" style="color: rgb(181, 181, 181)">00:00</span></td>    <td id="pgleft"></td>    <td> <input style="vertical-align:middle; display:none" type=checkbox id="tickpg" /></td>  </tr>  <tr>    <td><span id="ref">RF: %</span></td>    <td><span id="refdir">()</span></td>    <td><span id="refcd" style="color: rgb(181, 181, 181)">00:00</span></td>    <td><span id="refleft"></span></td>    <td><input style="vertical-align:middle;" type=checkbox id="tickref"/></td>  </tr>  <tr>    <td><span id="crop">CR:</span></td>    <td><span id="cropdir">()</span></td>    <td><span id="crdesiprice" style="color: rgb(181, 181, 181)" >n/a</span></td>    <td><span id="cropleft"></span></td>    <td><input style="vertical-align:middle;" type=checkbox id="tickcrop"/></td>  </tr>  <tr>    <td >Conscript</td> <td id="consdesipercent">n/a</td>       <td id="cncd">00:00</td> <td id="cnleft"></td>   <td><input style="vertical-align:middle;" type=checkbox id="tickcn"/></td>  </tr></table> <br /><br />' + buttonElems[1].innerHTML;
 
 /*
 // CURRENT!!!
 <table width=160 style="table-layout:fixed"><col width=50><col width=25><col width=30><col width=40><col width=15>
  <tr>
    <th>Value</th>
    <th>Dir</th>
    <th>Cd</th>
    <th>Left</th>
    <th>Auto?</th>
  </tr>
  <tr>
    <td><span id="pg">PG: %</span></td>
    <td><span id="pgdir">()</span></td>
    <td><span id="pgcd" style="color: rgb(181, 181, 181)">00:00</span></td>
    <td id="pgleft"></td>
    <td><input style="vertical-align:middle;" type=checkbox id="tickpg"/></td>
  </tr>
  <tr>
    <td><span id="ref">RF: %</span></td>
    <td><span id="refdir">()</span></td>
    <td><span id="refcd" style="color: rgb(181, 181, 181)">00:00</span></td>
    <td><span id="refleft"></span></td>
    <td><input style="vertical-align:middle;" type=checkbox id="tickref"/></td>
  </tr>
  <tr>
    <td><span id="crop">CR:</span></td>
    <td><span id="cropdir">()</span></td>
    <td><span id="crdesiprice" style="color: rgb(181, 181, 181)" >n/a</span></td>
    <td><span id="cropleft"></span></td>
    <td><input style="vertical-align:middle;" type=checkbox id="tickcrop"/></td>
  </tr>
  <tr>
    <td colspan="2">Conscript under</td>
    <td id="consdesipercent">n/a</td>
    <td id="cnleft"></td>
    <td><input style="vertical-align:middle;" type=checkbox id="tickcn"/></td>
  </tr>
</table>
 */
 
 
 
 /*
 // DEPRECATED!!!
 <table width=160 style="table-layout:fixed"><col width=50><col width=25><col width=40><col width=35><col width=10><tr><th>Value</th><th>Dir</th><th>Left</th><th>Cd</th><th>Auto?</th></tr><tr><td><span id="pg">PG: %</span></td><td><span id="pgdir">()</span></td><td id="pgleft"></td><td><span id="pgcd" style="color: rgb(181, 181, 181)">00:00</span></td><td><input style="vertical-align:middle;" type=checkbox id="tickpg"/></td></tr><tr><td><span id="ref">RF: %</span></td><td><span id="refdir">()</span></td><td><span id="refleft"></span></td><td><span id="refcd" style="color: rgb(181, 181, 181)">00:00</span></td><td><input style="vertical-align:middle;" type=checkbox id="tickref"/></td></tr><tr><td><span id="crop">CR:</span></td><td><span id="cropdir">()</span></td><td><span id="cropleft"></span></td><td><span id="crdesiprice" style="color: rgb(181, 181, 181)" >n/a</span></td><td><input style="vertical-align:middle;" type=checkbox id="tickcrop"/></td></tr><tr><td colspan="2">Conscript under</td><td id="cnleft"></td><td id="consdesipercent">n/a</td><td><input style="vertical-align:middle;" type=checkbox id="tickcn"/></td></tr></table>
 
 <table width=160 style="table-layout:fixed"><col width=50><col width=25><col width=40><col width=35><col width=10>
  <tr>
    <th>Value</th>
    <th>Dir</th>
    <th>Left</th>
    <th>Cd</th>
    <th>Auto?</th>
  </tr>
  <tr>
    <td><span id="pg">PG: %</span></td>
    <td><span id="pgdir">()</span></td>
    <td id="pgleft"></td>
    <td><span id="pgcd" style="color: rgb(181, 181, 181)">00:00</span></td>
    <td><input style="vertical-align:middle;" type=checkbox id="tickpg"/></td>
  </tr>
  <tr>
    <td><span id="ref">RF: %</span></td>
    <td><span id="refdir">()</span></td>
    <td><span id="refleft"></span></td>
    <td><span id="refcd" style="color: rgb(181, 181, 181)">00:00</span></td>
    <td><input style="vertical-align:middle;" type=checkbox id="tickref"/></td>
  </tr>
  <tr>
    <td><span id="crop">CR:</span></td>
    <td><span id="cropdir">()</span></td>
    <td><span id="cropleft"></span></td>
    <td><span id="crdesiprice" style="color: rgb(181, 181, 181)" >n/a</span></td>
    <td><input style="vertical-align:middle;" type=checkbox id="tickcrop"/></td>
  </tr>
  <tr>
    <td colspan="2">Conscript under</td>
    <td id="cnleft"></td>
    <td id="consdesipercent">n/a</td>
    <td><input style="vertical-align:middle;" type=checkbox id="tickcn"/></td>
  </tr>
</table>
 */
 //<tr><td></td><td></td><td></td><td></td><td></td></tr>
 //<textarea id="txtbx2" cols="20" rows="5"></textarea>
 
 
 
 
 
 
 
 
addButtonListeners();

}
 
 
 
function addButtonListeners(){
  var gardenbutton = document.getElementById("gardenButton");
  gardenbutton.addEventListener('click',function(){startGarden()},false);
  var stopbutton = document.getElementById("stopButton");
  stopbutton.addEventListener('click',function(){stopCount()},false);
  var runbutton = document.getElementById("runButton");
  runbutton.addEventListener('click',function(){setMaxRuns()},false);

  var infobutton = document.getElementById("info");
  infobutton.addEventListener('click',function(){info()},false);
  var serverbutton = document.getElementById("serverButton");
  serverbutton.addEventListener('click',function(){setServer()},false);
  var resetbutton = document.getElementById("resetButton");
  resetbutton.addEventListener('click',function(){resetall()},false);

  var updatebutton = document.getElementById("update");
  updatebutton.addEventListener('click',function(){update()},false);

  var tickall =  document.getElementById("tickAll")
  tickall.addEventListener("click",function(){toggle_visibility("controls")}, false);
  var ticklevels =  document.getElementById("tickLevels")
  ticklevels.addEventListener("click",function(){leveltimer_toggle();}, false);


  var tickpg =  document.getElementById("tickpg")
  tickpg.addEventListener("click",function(){ if(tickpg.checked==true)jAlert("Sorry, currently only auto garden, crop sell and conscripting work!"); }, false);
  
  var tickref =  document.getElementById("tickref")
  tickref.addEventListener("click",function(){ refine_toggle(); }, false);
  
  var tickcrop =  document.getElementById("tickcrop")
  tickcrop.addEventListener("click",function(){ cropsell_toggle();}, false);

  var tickcn =  document.getElementById("tickcn")
  tickcn.addEventListener("click",function(){ conscript_toggle();}, false);


  server = GM_getValue("server");
if(!server) { setServer(); }
  else { status("Server="+server,1); switchServer(attempt); update(); }
  
}

var firstbotrun = false;

function setServer()
{

  // Setting default option in prompt
  var lastserver = GM_getValue("server");
  if(!lastserver) { firstbotrun = true; lastserver = "b8"; GM_setValue("server","b8"); }
  
  // First bot run OR Set server
  jPrompt("Please enter the server number as b1, b2 etc.!\n\nFor Euro server please type eub1, eub2 etc.",lastserver, 'Prompt', function(r) 
  {
    if(r) // Clicked OK!  // Need to load bot when change AND when first run
    {
      if(r.length < 2) { r = 'b'+r; }
      GM_setValue("server",r);
      server = GM_getValue("server");
      status("Server="+server,1);
      if((firstbotrun) || (GM_getValue("server")!=lastserver))
      {
        firstbotrun = false; 
        switchServer(attempt);
        update(); 
      }
    }
    else if(firstbotrun) // Clicked CANCEL! // Need to load when first run!  // Display server satus if first run!
    { 
      firstbotrun = false; 
      status("Default server="+server,1);
      switchServer(attempt);
      update(); 
    }

  
   
  });

  
  
}




var isuptodate = false;


var decodeResponse_url = decodeResponse_url_Stack[0];
var boturl = boturl_Stack[0];

var attempt = 0;

function switchServer(attempt)
{
    if(attempt < boturl_Stack.length)
    {
      status("Trying bot php server "+(attempt+1)+"/"+boturl_Stack.length+"...",1); 
      boturl=boturl_Stack[attempt];
      decodeResponse_url=decodeResponse_url_Stack[attempt];
    }
    else
    {
      status("Trying 1st botserver again...",1); 
      attempt = 0;
    } 
}

function update()
{
  
  GM_xmlhttpRequest(
  {  
    method: "POST",
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    url: decodeResponse_url,
    data: "task=version",
    onerror: function(e) { status("Task=version",1); status("Connection to bot server failed.",1); attempt++; switchServer(attempt); setTimeout(function(){ update();}, 2000); }, 
    onload: function(e) 
    { 
      var responseEnd = e.responseText.indexOf("ENDRESPONSE");
      var responseParams;
      if(responseEnd!=-1) 
      { 
        responseParams = e.responseText.split(":",responseEnd);
        //status(e.responseText.slice(0,responseEnd-1),1);
    
       if(responseParams[0] =="OK")
       { 
          status("Update server was found.",1);
          if(!responseParams[1].match(version))
          {
            var m = "Your Transbot version is: "+version+"\nThere is a new version: "+responseParams[1]+"\n\nWould you like to update?\n(Please refresh the page after bot update!)";
            jConfirm(m, 'Confirmation', function(r) 
            {
              if(r)
              {
                status("clearbox",1);
                setTimeout(function(){window.location.href=boturl;}, 2000);
              }
              else {status("Version is old.",1); checkTimezone(); }
            });
          }
          else {status("Version is up to date.",1); checkTimezone(); }
          
          var now = new Date().getTime().toString();
          GM_setValue("updatelastchecked", now );
        }
 
      } 
      else 
      { 
        var responseStart = e.responseText.indexOf("<title>");
        var responseEnd = e.responseText.indexOf("</title>");
        status("Update server is OK, but its response is not="+e.responseText.slice(responseStart+5,responseEnd),1); 
        attempt++; switchServer(attempt);
        setTimeout(function(){ update();}, 2000);
      }    
    }
  });
}


function checkTimezone()
{

  /* GET TIMEZONE */
  var timeZoneDiff = GM_getValue("timeZoneDiff");
  if(!timeZoneDiff) { getRequest_decode("time"); }
    else { status("Timezone diff="+Math.round(timeZoneDiff/1000/60/60),1); setGameSwfReferer(); } 

/* getRequest_decode("time") will call makeTimeZoneDiff(serverTime) */
}



function makeTimeZonediff(serverTime)
{
/*Deprecated solution:
var diff;
if (timeZone > 8) { diff = 8 - timeZone; }
if (timeZone < 8) && (timeZone>0) { diff = 8 - timeZone; }
if (timeZone < 8) && (timeZone<0) { diff = 8 + (timeZone*-1);}
timeZoneDiff = diff*60*60*1000;*/

/* NEW LOGIC:
----------------------------------------
diff   server   now
1111 =  8888  - 7777;

now    diff   server
7777 + 1111 = 8888
----------------------------------------
diff   server   now
1111 =  8888  - 9999;

now    diff   server
9999 + -1111 = 8888
*/


var now = new Date().getTime();

diff = serverTime - now;

var hours = diff;

hours = Math.round(hours/1000/60/60);

diff = (hours*60*60*1000)-25000;

GM_setValue("timeZoneDiff",diff);

status("Timezone diff="+hours,1);


setGameSwfReferer();

}



//GET TESTSPEED.JS VERSION:
//http://b8.clapalong.com//?action=gameapi!authlogin&gid=1&sid=8&gotogame=1",
//<script language="JavaScript" type="text/javascript" src="testSpeed.js?version=1.3">

//GET RESUS VERSION:
//http://b8.clapalong.com/testSpeed.js?version=1.3
//urlList[1] = "http://static.koramgame.com/as/resus_en_42/";

//GET zs_en LANGUAGE VERSION
//http://b8.clapalong.com/Config.xml?version=v13075141457050.7697645695880055
//var ver = new Date().getTime().toString() + Math.random();
//<language content="zs_EN" />

//GET GAME.SWF VERSION TO BE REFERER FOR SOME BOT OPERATIONS:
//http://static.koramgame.com/as/resus_en_42/assets/zs_EN/xml/ResConfig.xml?version=v13075141466360.7947745220735669
//<version>11.05.19.1_yad</version>

//http://static.koramgame.com/as/resus_en_42/game/module/core/Game.swf?version=11.05.19.1_yadv1


function setGameSwfReferer()
{
 
 headers_get = {
      "Host":server+".clapalong.com",
			"User-agent":navigator.userAgent, 
			"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", 
			"Accept-Language":"en",
			"Accept-Encoding":"gzip,deflate",
			"Accept-Charset":"ISO-8859-1,utf-8;q=0.7,*;q=0.7",
			"Keep-Alive":"115"
		};


 
  var gamereferer = GM_getValue("gameSwfReferer");
  if(!gamereferer) 
  { 
    GM_xmlhttpRequest(
    {
      method: "GET",
      headers:headers_get,
      url: "http://"+server+".clapalong.com/?action=gameapi!authlogin&gid=1&sid=8&gotogame=1", //PLAIN BROWSER CALL
      onerror: function(response) { status("GET testspeed.js="+response,1);},
      onload: function(response) 
      {
        var match = "testSpeed.js?version=";
        var pos = response.responseText.indexOf(match);
        if(pos!=-1)
        {
          var testSpeedjs = response.responseText.slice(pos,pos+match.length+3);
          status("testSpeed.js="+testSpeedjs,1);
          //jAlert(testSpeedjs+"\n\n"+(GM_getValue("UpgradeTime")/60/60/1000));
          GM_xmlhttpRequest(
          {
            method: "GET",
            headers:headers_get,
            url: "http://"+server+".clapalong.com/"+testSpeedjs, //PLAIN BROWSER CALL
            onerror: function(response) { status("GET resus="+response,1);},
            onload: function(response) 
            {
              match = 'urlList[1] = "http://static.koramgame.com/as/';
              pos = response.responseText.indexOf(match);
              if(pos!=-1)
              {
                match2 = '/";';
                pos2 = response.responseText.indexOf(match2,pos);
                var resus = response.responseText.slice(pos+match.length,pos2);
                //jAlert("->"+resus+"<-");
                status("Resus="+resus,1);
                var ver = new Date().getTime().toString() + Math.random();
                GM_xmlhttpRequest(
                {
                  method: "GET",
                  headers:headers_get,
                  url: "http://"+server+".clapalong.com/Config.xml?version=v"+ver,   //HEADER CHECKED
                  onerror: function(response) { status("GET lang="+response,1);},
                  onload: function(response) 
                  {
                    match = '<language content="';
                    pos = response.responseText.indexOf(match);
                    if(pos!=-1)
                    {
                      match2 = '" />';
                      pos2 = response.responseText.indexOf(match2,pos);
                      var lang = response.responseText.slice(pos+match.length,pos2);
                      //jAlert("->"+lang+"<-");
                      status("Language="+lang,1);
                      ver = new Date().getTime().toString() + Math.random();
                      var refurl = "http://static.koramgame.com/as/"+resus+"/assets/"+lang+"/xml/ResConfig.xml?version=v"+ver;  //HEADER CHECKED
                      var headers_get_koramgame = {
                        "Host":"static.koramgame.com",
                        "User-agent":navigator.userAgent, 
                        "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", 
                        "Accept-Language":"en",
                        "Accept-Encoding":"gzip,deflate",
                        "Accept-Charset":"ISO-8859-1,utf-8;q=0.7,*;q=0.7",
                        "Keep-Alive":"115", };
                      GM_xmlhttpRequest(
                      {
                        method: "GET",
                        headers:headers_get_koramgame,
                        url: refurl,
                        onerror: function(response) { status("GET swf version="+response,1);},
                        onload: function(response) 
                        {
                          match = '<version>';
                          pos = response.responseText.indexOf(match);
                          if(pos!=-1)
                          {
                            match2 = '</version>';
                            pos2 = response.responseText.indexOf(match2);
                            var refererVersion = response.responseText.slice(pos+match.length,pos2);
                            status("Referer="+refererVersion,1);
                            //jAlert("->"+refererVersion+"<-");
                            GM_setValue("gameSwfReferer", "http://static.koramgame.com/as/"+resus+"/game/module/core/Game.swf?version="+refererVersion+"v1");
                            status("Referer recorded.",1);
                            init();
                          }
                          else
                          {
                            //jPrompt("Fatal error!\n\nresponse\n\nTry Again?",
                            status("GET swf ver="+response,1);
                            status("Trying again",1);
                            setTimeout(function(){ setGameSwfReferer(); }, 3000);
                          }
                        }
                      });
                    }
                    else
                    {
                      //jPrompt("Fatal error!\n\n\n\nTry Again?",
                      status("GET lang="+response,1);
                      status("Trying again",1);
                      setTimeout(function(){ setGameSwfReferer(); }, 3000);
                    }
                  }
                });
              }
              else
              {
                //jPrompt("Fatal error!\n\n\n\nTry Again?",
                status("GET resus="+response,1);
                status("Trying again",1);
                setTimeout(function(){ setGameSwfReferer(); }, 3000);
              }
            }
          });
        }
        else
        {
          //jPrompt("Fatal error!\n\n\n\nTry Again?",
          status("GET testSpeed.js="+response,1);
          status("Trying again",1);
          setTimeout(function(){ setGameSwfReferer(); }, 3000);
        }
      }
    });
  }
  else 
  { 
    status("Referer="+gamereferer,1); 
    init();
  }

}



function init()
{
  
  headers_post = {
      "Host":server+".clapalong.com",
			"User-agent":navigator.userAgent, 
			"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", 
			"Accept-Language":"en-us,en;q=0.5",
			"Accept-Encoding":"gzip,deflate",
			"Accept-Charset":"ISO-8859-1,utf-8;q=0.7,*;q=0.7",
			"Keep-Alive":"115",
			"Referer": GM_getValue("gameSwfReferer"),
			"Content-Type":"application/x-www-form-urlencoded"
		};

    
  clearTimeout(t_all);
  t_all = setTimeout(function(){ checkupdate();}, 3600000);

  
  status("Runs="+maxruns,1);
  
  var crdesiprice = GM_getValue("crdesiprice");
  if(crdesiprice) 
  { 
    document.getElementById("tickcrop").checked = true; 
    el = document.getElementById("crdesiprice"); 
    while(el.childNodes.length > 0) el.removeChild(el.firstChild); 
    el.appendChild(document.createTextNode("@"+crdesiprice) ); 
  }
  else 
  {
    document.getElementById("tickcrop").checked = false;
  }  
  
  
  var consdesipercent = GM_getValue("consdesipercent");
  if(consdesipercent) 
  { 
    document.getElementById("tickcn").checked = true; 
    el = document.getElementById("consdesipercent"); 
    while(el.childNodes.length > 0) el.removeChild(el.firstChild); 
    el.appendChild(document.createTextNode(consdesipercent+"%") ); 
  }
  else 
  {
    document.getElementById("tickcn").checked = false;
  }  
  
 
  
  var reflevel = GM_getValue("reflevel");
  if(reflevel) 
  { 
    document.getElementById("tickref").checked = true; 
  }
  else 
  {
    document.getElementById("tickref").checked = false;
  }  
  
  

  status(welcome,1);
  
  if (firstcycle) { leveltimer(); }
}




var t_all;

function checkupdate()
{
  var now = Date().getTime();
  var lastupdate = GM_getValue("updatelastchecked");

  if ((parseInt(lastupdate)+10800000)<now) 
  {
    update();
    clearTimeout(t_all);
    t_all = setTimeout(function(){checkupdate();}, 3600000);
  }
}








/*****************************************/
/****** PG AND PRICE LEVELS SECTION ******/
/*****************************************/


function refine_toggle()
{
  var reflevel = GM_getValue("reflevel");
  var checked;
  if(document.getElementById("tickref").checked == true) { checked = true; } else { checked = false }

//\n(Thank you MerKaBah for the 100-110 Id-s!)
  if((!reflevel)&&(checked))
  { 
    jPrompt("Please enter the Id number of substance!\n\n* 1: Copper Slag\n* 2: Copper Splinters\n* 3: Mixed Copper\n* 4: Rusty Copper\n* 5: Shining Copper\n* 41: Gold Slag\n* 6: Pure Copper\n* 42: Mixed Gold Powder\n* 7: Tin Slag\n* 43: Fine Gold Powder\n* 71: Purple Phantom Crystal\n* 91: Small Pure Diamond\n* 8: Tin Chips\n* 9: Mixed Tin\n* 44: Low Purity Gold\n* 10: Rough Tin\n* 11: Shining Tin\n* 45: Medium Purity Gold Particles\n* 12: Pure Tin\n* 46: High-Purity Gold Particles\n* 72: Black Rutilated Quartz\n* 92: Large Rough Diamond\n* 13: Bronze Slag\n* 14: Mixed Bronze 47: Solidified Gold\n* 15: Bronze Splinters\n* 16: Faulty Bronze\n* 48: Huge Gold Nugget\n* 17: Low-Hardness Bronze\n* 49: Velvet Gold\n* 73: Blue Rutilated Quartz\n* 93: Large Opaque Diamond\n\n(110+ will come as I level up!)", "1", 'Prompt', 
    function(r) 
    {
      if( r ) 
      {
        jPrompt("Please enter the minimum price % for refining!", "130", 'Prompt', 
        function(s) 
        {
          if( s ) 
          {
            GM_setValue("reflevel",r); 
            GM_setValue("refdesiprice",s); 
            status("Refining active! (Id"+r+" @"+s+"%)",1);

          }
          else if(checked)
          {
            document.getElementById("tickref").checked = false;
          }
        });
      }
      else if(checked)
      {
        document.getElementById("tickref").checked = false;
      }
    });
  }
  else
  { 
    
    GM_deleteValue("reflevel"); 
    GM_deleteValue("refdesiprice"); 
    status("Refining inactive!",1);
  }
  
}


function cropsell_toggle()
{
  var crdesiprice = GM_getValue("crdesiprice");
  var checked;
  if(document.getElementById("tickcrop").checked == true) { checked = true; } else { checked = false }

  if((!crdesiprice)&&(checked))
  { 
    jPrompt("Please enter the desired price for crop sale!\nit will be checked in every 30min", "1.9", 'Prompt', 
    function(r) 
    {
      if( r ) 
      {
        status("Cropsale active!",1);
        GM_setValue("crdesiprice",r); 
        el = document.getElementById("crdesiprice"); 
        while(el.childNodes.length > 0) el.removeChild(el.firstChild); 
        el.appendChild(document.createTextNode("@"+GM_getValue("crdesiprice") ) );
      }
      else if(checked)
      {
        document.getElementById("tickcrop").checked = false;
      }
    });
  }
  else
  { 
    
    GM_deleteValue("crdesiprice"); 
    status("Cropsale inactive!",1);
    el = document.getElementById("crdesiprice"); 
    while(el.childNodes.length > 0) el.removeChild(el.firstChild); 
    el.appendChild(document.createTextNode("n/a") );
  }

  
}

function conscript_toggle()
{
  var consdesipercent = GM_getValue("consdesipercent");
  var checked;
  if(document.getElementById("tickcn").checked == true) { checked = true; } else { checked = false }

 
  if((!consdesipercent)&&(checked))
  { 
    jPrompt("Please enter the percent where to conscript!\nIt will be checked in every 30min", "84", 'Prompt', 
    function(r) 
    {
      if( r ) 
      {
        status("Conscript active!",1);
        GM_setValue("consdesipercent",r); 
        el = document.getElementById("consdesipercent"); 
        while(el.childNodes.length > 0) el.removeChild(el.firstChild); 
        el.appendChild(document.createTextNode(GM_getValue("consdesipercent")+"%" ) );
      }
      else if(checked)
      {
        document.getElementById("tickcn").checked = false;
      }
    });
  }
  else
  { 
    GM_deleteValue("consdesipercent"); 
    status("Conscript inactive!",1);
    el = document.getElementById("consdesipercent"); 
    while(el.childNodes.length > 0) el.removeChild(el.firstChild); 
    el.appendChild(document.createTextNode("n/a") );
  }

}



var timer = 1000;
var firstcycle = true;

// This controls so there will be only 1 error message, even if 10 different requests fail
var error = false;



function getValues()
{
  getRequest_decode("pg");
  getRequest_decode("ref");
  getRequest_decode("crop");
  getRequest_decode("cons");
}

function leveltimer()
{
//status("firstcycle="+firstcycle+", Error="+error+", Timer="+timer,1);

  if(show_levels)
  {
  
    var now = new Date();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var minsleft = Math.round(leftOfThirtyMin(minutes,seconds)/60/1000);
    var el = document.getElementById("thirtyMinLeft"); 
    while(el.childNodes.length > 0) el.removeChild(el.firstChild); 
    el.appendChild(document.createTextNode(minsleft));
    //status(minutes+"-"+seconds+"-"+minsleft,1);

    var timeZoneDiff = GM_getValue("timeZoneDiff");
    if(timeZoneDiff)
    {
      if(firstcycle||(minsleft==30))
      {
       firstcycle = false;
        done = true;
        getValues();
        
        
      }
      
      tl=setTimeout(function(){leveltimer(); }, timer);
    }
    else {firstcycle = true; status("TZ diff="+timeZoneDiff,1); status("Retrieving timezone",1); checkTimezone(); }

    
  }
  else{  clearTimeout(tl); }
}


function leveltimer_toggle()
{
  
  if (!show_levels)
  {
   firstcycle = true;
    show_levels=true;
    leveltimer();
    toggle_visibility("indicator2");    
  }
  else 
  {
    show_levels=false;
    toggle_visibility("indicator2");
  }
}


function countdown(seconds,dilation, stepparam1,stepparam2,endparam1,endparam2, stepcallback,endcallback)
{
  var timerID;
  var over = false;
  if (seconds==0) { over = true; }
  stepcallback(seconds,stepparam1,stepparam2);
  if(over) { clearTimeout(timerID); endcallback(seconds,endparam1,endparam2); return; }
  else
  {
    timerID = setTimeout(function(){ countdown(seconds,dilation, stepparam1,stepparam2,endparam1,endparam2, stepcallback,endcallback); },1000+dilation);
    
   // status(stepparam1+" / "+timerID,1);
  } 
  seconds--;
}



function startcd(seconds,elementId)
{
  countdown(seconds, 0, elementId,0,elementId,0,

  /*STEP FUNCTION HERE*/
  function(secs,elemId,sparam2) {  var el = document.getElementById(elemId); 
  while(el.childNodes.length > 0) el.removeChild(el.firstChild); el.appendChild(document.createTextNode(msec2time(secs*1000)) ); },  
  
  /*ENDRESPONSE FUNCTION HERE*/
  function(secs,elemId,eparam2) { var el = document.getElementById(elemId); el.style.color = 'rgb(181,181,181)'; });

}

var welcome_is_displayed = true;



function getRequest_decode(task)
{
  var timeZoneDiff = GM_getValue("timeZoneDiff");
  
  var img = document.createElement("IMG");
	img.src = loading_datauri;
	img.setAttribute('width', '30px');
  img.setAttribute('height', '12px');


  if(task =="time") 
  { 
    clapurl = "http://"+server+".clapalong.com/root/server!getServerTime.action?";  // HEADER CHECKED
    status("Getting timezone...",1); 
    timeZoneDiff = 0;
  }



  if(task =="pg") 
  { 
    clapurl = "http://"+server+".clapalong.com/root/equip!getUpgradeInfo.action?";  //HEADER CHECKED
    
    var el = document.getElementById("pgleft"); 
    while(el.childNodes.length > 0) el.removeChild(el.firstChild);
    el.appendChild(img) ;
    el = document.getElementById("pg"); while(el.childNodes.length > 0) el.removeChild(el.firstChild); el.appendChild(document.createTextNode("PG:") );
    el = document.getElementById("pgdir"); while(el.childNodes.length > 0) el.removeChild(el.firstChild); el.appendChild(document.createTextNode("(-)") );
    el = document.getElementById("pgcd");
    el.style.color = 'rgb(181, 181, 181)';   
	}
  if(task =="ref") 
  { 
    clapurl = "http://"+server+".clapalong.com/root/make.action?";   //HEADER CHECKED
    var el = document.getElementById("refleft"); 
    while(el.childNodes.length > 0) el.removeChild(el.firstChild);
    el.appendChild(img) ;
    el = document.getElementById("ref"); while(el.childNodes.length > 0) el.removeChild(el.firstChild); el.appendChild(document.createTextNode("RF:") );
    el = document.getElementById("refdir"); while(el.childNodes.length > 0) el.removeChild(el.firstChild); el.appendChild(document.createTextNode("(-)") );
    el = document.getElementById("refcd");
    el.style.color = 'rgb(181, 181, 181)';
	}
  if(task =="crop") 
  { 
    clapurl = "http://"+server+".clapalong.com/root/mainCity!preFoodBandC.action?";  //HEADER CHECKED
    var el = document.getElementById("cropleft"); 
    while(el.childNodes.length > 0) el.removeChild(el.firstChild);
    el.appendChild(img) ;
    el = document.getElementById("crop"); while(el.childNodes.length > 0) el.removeChild(el.firstChild); el.appendChild(document.createTextNode("CR:") );
    el = document.getElementById("cropdir"); while(el.childNodes.length > 0) el.removeChild(el.firstChild); el.appendChild(document.createTextNode("(-)") );

	}


	if(task =="cons") 
  { 
    clapurl = "http://"+server+".clapalong.com/root/mainCity.action?";
    var el = document.getElementById("cnleft"); 
    while(el.childNodes.length > 0) el.removeChild(el.firstChild);
    el.appendChild(img) ;

	}
	
	if(task =="forces") 
  { 
    clapurl = "http://"+server+".clapalong.com/root/server!getPlayerInfoByUserId.action?";    
	}	
	
	
  if(task =="conscript") 
  { 
    clapurl = "http://"+server+".clapalong.com/root/mainCity!rightArmy.action?";
	}


  if(task =="refine") 
  { 
    clapurl = "http://"+server+".clapalong.com/root/make!make.action?";
	}



  if(task =="refineinfo") 
  { 
    clapurl = "http://"+server+".clapalong.com/root/make!getInitTeam.action?";
	}

  
  GM_xmlhttpRequest({  
    method: "GET",  
    url: clapurl+(new Date().getTime() + timeZoneDiff), 
    headers:headers_get,
    overrideMimeType: 'text/plain; charset=x-user-defined',
    onerror: function(e) 
    { 
      if(error == false)
      {
        error = true;
        status("No Batheo server.\nTry later please.",1); 
      }    
    }, 
    onload: function(responseDetails) 
    { 
      //status("Server connected.",1); 
      var data = data_string(responseDetails.responseText);
      var base64_data = btoa(data);

      GM_xmlhttpRequest({
        method: "POST",
        headers:{'Content-type':'application/x-www-form-urlencoded'},
        url: decodeResponse_url,
        data: "transferdata="+base64_data+"&task="+task,
        onerror: function(e) 
        { 
          if(error == false)
          {
            error = true;
            status("No bot-engine php server.",1); 
          }
        }, 
        onload: function(e) 
        { 
          //if(task =="forces") { alert(e.responseText); }
          var responseEnd = e.responseText.indexOf("ENDRESPONSE");
          
          var responseParams;
           
          if(responseEnd!=-1) 
          { 
            responseParams = e.responseText.split(":",responseEnd);
            if(responseParams[0] =="OK")
            { 
              /*if(!responseParams[1])
              { 
                status(task+" has no value currently.",1); 
                if(error == false)
                {          
                  error = true; 
                 firstcycle=true; 
                  timer = 5000;
                  status(e.responseText.slice(0,responseEnd-1),1); 
                  status('Empty response from bot server, are you not logged in Batheo?',1);
                  
                }
              }
              else 
              { */
                //alert(e.responseText);
                error = false;
                timer = 30000;
                if(task =="time") { status("Servertime="+responseParams[1],1); makeTimeZonediff(responseParams[1]); }
                if(task =="pg") { pg(responseParams); }
                if(task =="ref") { ref(responseParams); }
                if(task =="crop") { crop(responseParams); }
                if(task =="cons") { cons(responseParams); }
                if(task =="forces") { forces(responseParams); }
                if(task =="conscript") 
                { 
                  
                  status("Faculty="+responseParams[1],1);  
                  
                  var el = document.getElementById("cnleft"); while(el.childNodes.length > 0) el.removeChild(el.firstChild); el.appendChild(document.createTextNode(responseParams[3])) ;
                  if(document.getElementById("cncd").innerHTML == "00:00")
                  {
                    //status("startcd at task=cons",1);
                    startcd(Math.round(responseParams[2]/1000),"cncd");
                  }
                }
                
                if(task =="refine") 
                { 
                  if(responseParams[1]==1)
                  {
                    getRequest_decode("refineinfo");
                  }
                }
                
                if(task =="refineinfo") 
                {
                  var red = parseInt(responseParams[3]);
                  var cd = parseInt(responseParams[2]);
                  //status("refcd="+msec2time(cd,1);
                  el = document.getElementById("refleft"); 
                  while(el.childNodes.length > 0) el.removeChild(el.firstChild); 
                  el.appendChild(document.createTextNode(responseParams[1])) ;
                  if(responseParams[1] > 0)
                  {
                    if(red == 0)
                    {
                      postRequest_decode("refineteam");
                    }
                    else if((red == 1)&&(cd == 0))
                    {
                      postRequest_decode("refineteam");
                      document.getElementById("refcd").style.color = 'rgb(181, 181, 181)';
                    }
                    else
                    {
                      setTimeout(function(){getRequest_decode("refineinfo");},(cd-500));
                      status(responseParams[1]+" ref left due cd!\nContinue ref in "+msec2time(cd-500),1);
                      if(document.getElementById("refcd").innerHTML == "00:00")
                      {
                        //status("startcd at task=ref",1);
                        startcd(Math.round(cd/1000),"refcd");
                        document.getElementById("refcd").style.color = 'rgb(255, 0, 0)'; 
                      
                      }
                    }
                    
                  }
                  else
                  {
                    status("No more ref left!",1);
                    if(document.getElementById("refcd").innerHTML == "00:00")
                    {
                      startcd(Math.round(cd/1000),"refcd");
                      
                      
                      
                    }
                  }
                  
                }
              //}
            }
            
          } 
          else 
          { 
           firstcycle=true; 
            if(error == false)
            {          
              error = true; 
              timer = 5000;
              status("Task="+task,1);
              var responseStart = e.responseText.indexOf("<title>");
              var responseEnd = e.responseText.indexOf("</title>");
              //alert(e.responseText);
              status("Invalid bot server response",1); 
              //status("Invalid bot server response="+e.responseText.slice(responseStart+5,responseEnd),1);  
              status('WARNING, ARE YOU NOT LOGGED IN BATHEO?\nLog in then wait a few sec OR untick+tick "Refreshing values"!',1);
              welcome_is_displayed = false;
              //setTimeout(function(){getRequest_decode(task);},5000);
            }
          }    
        }
      });
    }
  });
}








function pg(responseParams)
{

 // if (!welcome_is_displayed) { status("clearbox",1); status(welcome,1); welcome_is_displayed = true; }
  var pg = responseParams[1];
  var direction = responseParams[2];
  if(responseParams[2] == 1) { direction = "(Up)" }
  if(responseParams[2] == true) { direction = "(Up)" }
  if(responseParams[2] == "true") { direction = "(Up)" }
  if(responseParams[2] == -1) { direction = "(Dn)" }
  if(responseParams[2] == 0) { direction = "(Dn)" }
  if(responseParams[2] == false) { direction = "(Dn)" }
  if(responseParams[2] == "false") { direction = "(Dn)" }
  
  var pgcd = responseParams[3];

  var red = "";
  if(responseParams[4] == 1) { red = "R" }
  if(responseParams[4] == true) { red = "R" }
  if(responseParams[4] == "true") { red = "R" }
  if(responseParams[4] == -1) { red = "W" }
  if(responseParams[4] == 0) { red = "W" }
  if(responseParams[4] == false) { red = "W" }
  if(responseParams[4] == "false") { red = "W" }
  
  var el = document.getElementById("pg"); while(el.childNodes.length > 0) el.removeChild(el.firstChild); el.appendChild(document.createTextNode("PG:"+pg+"%") );
  el = document.getElementById("pgdir"); while(el.childNodes.length > 0) el.removeChild(el.firstChild); el.appendChild(document.createTextNode(direction) );
  el = document.getElementById("pgleft"); while(el.childNodes.length > 0) el.removeChild(el.firstChild); el.appendChild(document.createTextNode("") );
  el = document.getElementById("pgcd");

 
  if(red=="R") { el.style.color = 'rgb(255, 0, 0)'; }
  if(red=="W") { el.style.color = 'rgb(181, 181, 181)'; }


                  if(document.getElementById("pgcd").innerHTML == "00:00")
                  {
//status("startcd at task=pg",1);
  startcd(Math.round(pgcd/1000),"pgcd");
                  }


  
}






function ref(responseParams)
{
  if (!welcome_is_displayed) { status("clearbox",1); status(welcome,1); welcome_is_displayed = true; }
  var price = responseParams[1];
  var direction = responseParams[2];
  if(responseParams[2] == 1) { direction = "(Up)" }
  if(responseParams[2] == true) { direction = "(Up)" }
  if(responseParams[2] == "true") { direction = "(Up)" }
  if(responseParams[2] == -1) { direction = "(Dn)" }
  if(responseParams[2] == 0) { direction = "(Dn)" }
  if(responseParams[2] == false) { direction = "(Dn)" }
  if(responseParams[2] == "false") { direction = "(Dn)" }
  var num = responseParams[3];
  var max = responseParams[4];

  var pcd = responseParams[5];
  var mcd = responseParams[6];

  var red = ""; 
  if(responseParams[7] == 1) { red = "R" }
  if(responseParams[7] == true) { red = "R" }
  if(responseParams[7] == "true") { red = "R" }
  if(responseParams[7] == -1) { red = "W" }
  if(responseParams[7] == 0) { red = "W" }
  if(responseParams[7] == false) { red = "W" }
  if(responseParams[7] == "false") { red = "W" }  
  
  var el = document.getElementById("ref"); while(el.childNodes.length > 0) el.removeChild(el.firstChild); el.appendChild(document.createTextNode("RF:"+price+"%") );
  el = document.getElementById("refdir"); while(el.childNodes.length > 0) el.removeChild(el.firstChild); el.appendChild(document.createTextNode(direction) );
  el = document.getElementById("refleft"); while(el.childNodes.length > 0) el.removeChild(el.firstChild); el.appendChild(document.createTextNode(num)) ;

  el = document.getElementById("refcd");
  if(red=="R") { el.style.color = 'rgb(255, 0, 0)'; }
  if(red=="W") { el.style.color = 'rgb(181, 181, 181)'; }
 
 
  if(document.getElementById("refcd").innerHTML == "00:00")
  {
    //status("startcd at task=ref",1);
    startcd(Math.round(mcd/1000),"refcd");
  }
  
  
  var refdesiprice = GM_getValue("refdesiprice");
  if(refdesiprice)
  {
    if(parseInt(price) >= parseInt(refdesiprice))
    {
      
      
      getRequest_decode("refineinfo",0,0);
     
    }
  }
  
  
  
}

var cropprice;
function crop(responseParams)
{
  
  if (!welcome_is_displayed) { status("clearbox",1); status(welcome,1); welcome_is_displayed = true; }
  cropprice = responseParams[1];
  var direction = responseParams[2];
  if(responseParams[2] == 1) { direction = "(Up)" }
  if(responseParams[2] == true) { direction = "(Up)" }
  if(responseParams[2] == "true") { direction = "(Up)" }
  if(responseParams[2] == -1) { direction = "(Dn)" }
  if(responseParams[2] == 0) { direction = "(Dn)" }
  if(responseParams[2] == false) { direction = "(Dn)" }
  if(responseParams[2] == "false") { direction = "(Dn)" }
  var num = responseParams[3];
  var max = responseParams[4];

  var bsmax = responseParams[5];

  var el = document.getElementById("crop"); while(el.childNodes.length > 0) el.removeChild(el.firstChild); el.appendChild(document.createTextNode("CR:"+cropprice) );
  var el = document.getElementById("cropdir"); while(el.childNodes.length > 0) el.removeChild(el.firstChild); el.appendChild(document.createTextNode(direction) );
  var el = document.getElementById("cropleft"); while(el.childNodes.length > 0) el.removeChild(el.firstChild); el.appendChild(document.createTextNode(max-num)) ;




  
  if((max-num)>0)
  {
    var crdesiprice = GM_getValue("crdesiprice");
    //status(parseFloat(cropprice)+"-"+parseFloat(crdesiprice),1);
    if(crdesiprice)
    {
      if(parseFloat(cropprice) >= parseFloat(crdesiprice))
      {
        postRequest_decode("cropsell",(max-num),0);
      }
    }
  }

}



var tcn;

function cons(responseParams)
{
  
  status(responseParams[0]+"--"+responseParams[1]+"--"+responseParams[2]);
  
  if (!welcome_is_displayed) { status("clearbox",1); status(welcome,1); welcome_is_displayed = true; }
  var cnleft = responseParams[1];
  var cncd = responseParams[2];
  
  var el = document.getElementById("cnleft"); while(el.childNodes.length > 0) el.removeChild(el.firstChild); el.appendChild(document.createTextNode(cnleft)) ;

  if(cnleft>0)
  {
    if(cncd>0) 
    {
    
      var now = new Date();
      var minutes = now.getMinutes();
      var seconds = now.getSeconds();
      var minsleft = Math.round(leftOfThirtyMin(minutes,seconds)/60/1000);
      
      tcn = setTimeout(function(){getRequest_decode("forces");}, cncd);

                     //status("el.cncd="+document.getElementById("cncd").innerHTML+"=",1);
                   if(document.getElementById("cncd").innerHTML == "00:00")
                  {
      //status("startcd at task=cons",1);
      startcd(Math.round(cncd/1000),"cncd");

                  }
        
      
        
    }
    else getRequest_decode("forces");
  }
  ///status("No more conscript left for today",1);
  
}

function forces(responseParams)
{
  
  if (!welcome_is_displayed) { status("clearbox",1); status(welcome,1); welcome_is_displayed = true; }
  
  var force = parseInt(responseParams[1]);
  
  var maxforce = parseInt(responseParams[2]);
  
  var conscriptamount = Math.round(((maxforce/100) * 15));
  
  
  //status("force="+force+" tocons="+conscriptamount+" max="+maxforce,1);
  if((force+conscriptamount) < maxforce)
  {
    //status((force+conscriptamount)+" < " + maxforce,1);
    var consdesipercent = GM_getValue("consdesipercent");
    if(consdesipercent)
    {
      if( (force/maxforce * 100) < parseInt(consdesipercent))
      {
        
        getRequest_decode("conscript");
      }
      else
      status("Forces are not low enough!",1);
    }
    else
    status("Conscript % is not set?",1);
    
  }
  //else  status("Too large force, can't conscript!",1);
}



function postRequest_decode(task,param1,param2)
{

//status("post started",1);

  var timeZoneDiff = GM_getValue("timeZoneDiff");
  

 var clapurl = "";
 var data = "";


  if(task =="cropsell") 
  { 
  //status("cropsell task",1);
    clapurl = "http://"+server+".clapalong.com/root/mainCity!foodBandC.action?";  //HEADER CHECKED
    data = "sell="+param1;
	}

 if(task =="refineteam") 
  { 
    clapurl = "http://"+server+".clapalong.com/root/make!createTeam.action?";  //HEADER CHECKED
    data = "rule=4%3A0&makeId="+GM_getValue("reflevel");
    status("Refining...",1);
	}




  GM_xmlhttpRequest({  
    method: "POST",  
    url: clapurl+(new Date().getTime() + timeZoneDiff), 
    headers:headers_post,
    data:data,
    
    
    overrideMimeType: 'text/plain; charset=x-user-defined',
    onerror: function(e) 
    { 
        error = true;
        status("No Batheo server.\nTry later please.",1); 
    }, 
    onload: function(responseDetails) 
    { 
      //status("Batheo connected.",1); 
      var data = data_string(responseDetails.responseText);
      var base64_data = btoa(data);

      GM_xmlhttpRequest({
        method: "POST",
        headers:{'Content-type':'application/x-www-form-urlencoded'},
        url: decodeResponse_url,
        data: "transferdata="+base64_data+"&task="+task,
        onerror: function(e) 
        { 
            //status("clearbox",1);
            status("\nNo bot-engine php server?",1); 
        }, 
        onload: function(e) 
        { 
          
          var responseEnd = e.responseText.indexOf("ENDRESPONSE");
          
          status(e.responseText.slice(0,responseEnd-1),1);
          var responseParams;

          if(responseEnd!=-1) 
          { 
            responseParams = e.responseText.split(":",responseEnd);
            //status(e.responseText.slice(0,responseEnd-1),1); 
            
            if(responseParams[0] =="OK")
            { 
              //alert(e.responseText);
              if(responseParams[1]==1)
              {
                if(task =="cropsell") { status("Crop was sold for "+Math.round(param1*cropprice),1); }
                if(task =="refineteam") 
                { 
                  status("Refine team created!",1); 
                  getRequest_decode("refine");
                  
                }
                
              }
            }
            else 
            { 
                /* offer retry/cancel? */
            }

          } 
          else 
          { 
            status("Task="+task,1);
            var responseStart = e.responseText.indexOf("<title>");
            var responseEnd = e.responseText.indexOf("</title>");
            //status("Bot server error="+e.responseText.slice(responseStart+5,responseEnd),1);  
            status("Invalid bot server response!",1); 
            //setTimeout(function(){postRequest_decode(task);},5000);
          }    
          
        }
      });
    }
  });
}


/**********************************/
/****** TRANS FIGHTS SECTION ******/
/**********************************/

var actionNum = 0;

var gardenActions=[
  "move:y=4:x=1:10000",  
"attack:y=4:x=2:30000",  
  "move:y=3:x=2:10000",  
  "move:y=3:x=3:10000",  
  "move:y=3:x=4:10000", 
 "attack:y=2:x=4:30000", 
 "move:y=2:x=5:10000", 
  "move:y=2:x=6:10000", 
"attack:y=2:x=7:30000", 
   "move:y=2:x=8:10000", 
"attack:y=2:x=9:30000", 
"move:y=1:x=9:10000", 
"move:y=1:x=8:5000",  
"token:index=0:0:5000",
"attack:y=0:x=8:0"];

 
var labActions=[
  "move:y=4:x=0:10000",
  "move:y=4:x=1:10000",
"attack:y=3:x=1:30000",
  "move:y=2:x=1:10000",
  "move:y=2:x=2:10000",
"attack:y=2:x=3:25000",
"token:index=0:0:5000",
  "move:y=2:x=4:5000",
  "move:y=2:x=5:5000",
"attack:y=3:x=5:30000",
  "move:y=3:x=6:5000",
"attack:y=3:x=7:30000",
  "move:y=2:x=7:5000",
  "move:y=2:x=8:5000",
"attack:y=1:x=8:0"];





function setMaxRuns()
{
  var last = maxruns;
  jPrompt("Please enter the number of runs!\n\nWARNING!!!\nYou can only do multiple runs during reservoir times!\n\nNo reservoir during:\n03:25-04:00, 09:55-10:30, 11:55-12:30 and 23:25-00:00", maxruns, 'Prompt', function(r) 
  {
    if( r ) maxruns = r;
    if(maxruns!=last) status("Runs="+maxruns,1);
  });
}



/* Retrieve current campaignId */  //DONE

/* and position and change fight/actionNum accordingly? */
/* Calculate path of nearest enemies at the beginning, or on the fly?*/
function startGarden()
{
toggle_visibility("indicator1");


var timeZoneDiff = GM_getValue("timeZoneDiff");


  
  var gardenbutton = document.getElementById("gardenButton"); 
  gardenbutton.disabled = true;



var fight = "";

    GM_xmlhttpRequest({  
      method: "POST",  
      url: "http://"+server+".clapalong.com/root/server!getPlayerInfoByUserId.action?" + (new Date().getTime() + timeZoneDiff), 
      headers:headers_post,
      data: "",
      
      overrideMimeType: 'text/plain; charset=x-user-defined',
      
      onerror: function(e) { status("No Batheo server.\nTry later please.",1); }, 
      onload: function(responseDetails) 
      { 
        status("Looking for a Garden",1);
        
        var data = data_string(responseDetails.responseText);
        var base64_data = btoa(data);
        GM_xmlhttpRequest({
          method: "POST",
          headers:{'Content-type':'application/x-www-form-urlencoded'},
          url: decodeResponse_url,
          data: "transferdata="+base64_data+"&task=getcampaignid",
          onerror: function(e) { status("No bot-engine php server.",1); }, 
 
          onload: function(e) 
          { 
            var responseEnd = e.responseText.indexOf("ENDRESPONSE");
            //status("clearbox",1);
            //status(e.responseText.slice(0,responseEnd+3),1);
            //alert(e.responseText);
            var responseParams;

          if(responseEnd!=-1) 
          { 
            responseParams = e.responseText.split(":",responseEnd);
            //status(e.responseText.slice(0,responseEnd-1),1); 
          } 
          else 
          { 
            var responseStart = e.responseText.indexOf("<title>");
            var responseEnd = e.responseText.indexOf("</title>");
            //status("Bot server error="+e.responseText.slice(responseStart+5,responseEnd),1);  
            status("Bot server error",1);  
            status("Stopping...",1); 
            fight_is_on=false;
            fightcountdown_is_on = fight_is_on;
            setTimeout(function(){stopGracefully();}, 1000);            
          }    
            
            if(responseParams[0] =="OK")
            { 
              var state = responseParams[1];
              if(state==1)
              {
              
                var campaignId = responseParams[2];
                if(campaignId)
                {
                  if(campaignId ==1) { status("GoH was detected!",1);}
                  else if(campaignId ==2) { status("LoT was detected!",1);}
                  else 
                  { 
                    status("Sorry, this campaign has not been implemented yet!",1); 
                    status("Stopping...",1); 
                    fight_is_on=false;
                    fightcountdown_is_on = fight_is_on;
                    setTimeout(function(){stopGracefully();}, 1000);
                  }

                  var campaignstate = responseParams[3];
                  
                  if(campaignstate==2) 
                  { 
                    fight_is_on = true;
                    fightcountdown_is_on = fight_is_on;
                    actionrequest(campaignId,0);
                  }
                  else  //Launch was not pressed yet
                  {
                    status('Have you launched the fight?',1);
                    status("Stopping...",1); 
                    fight_is_on=false;
                    fightcountdown_is_on = fight_is_on;
                    setTimeout(function(){stopGracefully();}, 1000);
                  }
                }
                else
                {
                  status('Have you launched the fight?',1);
                  status("Stopping...",1); 
                  fight_is_on=false;
                  fightcountdown_is_on = fight_is_on;
                  setTimeout(function(){stopGracefully();}, 1000);
                }              

              }
              else
              {
                status('Have you launched the fight?',1);
                status("Stopping...",1); 
                fight_is_on=false;
                fightcountdown_is_on = fight_is_on;
                setTimeout(function(){stopGracefully();}, 1000);
              }              

            }
            else 
            { 
              status('Are you not logged in?',1);
              status('Please log in to Batheo and restart the last operation!',1);
              status("Stopping...",1); 
              fight_is_on=false;
              fightcountdown_is_on = fight_is_on;
              setTimeout(function(){stopGracefully();}, 1000);
            }
          }
        });
      }
    });

}


function stopCount()
{

  //status("Fight="+fight_is_on,1); 
  if(fight_is_on==false)
  {
    status("No runing automation currently",1);
    // fight_is_on=true;//newrun("Lab"); //for testing reruns
    // var now = new Date().getTime().toString();
    // jAlert(GM_getValue("gameSwfReferer"));
    // alert($().jquery); 
    //fight_is_on = true;
    //status("Fight="+fight_is_on,1); 
    //actionrequest(1,0);
  }
  else
  { 
  
    var m = "If you suspect the automation has gone wrong, you can finish the fight manually.";
    jConfirm(m, 'Confirmation', function(r) 
    {
      if(r)
      {
        status("Stopping...",1); 
        fight_is_on=false;
        fightcountdown_is_on = fight_is_on;
        setTimeout(function(){stopGracefully();}, 1000);
      }		
    });
  }
}


function stopGracefully()
{
    //Fight stopped
    foundtoken = false;
    actionNum = 0;
    runs = 1;
    status("Auto fight was stopped!",1);
    setTimeout(function()
    {
      status("clearbox",1)
      status(welcome,1);
      status("Runs="+maxruns,1);
      status("Server="+server,1);
      toggle_visibility("indicator1");
      var gardenbutton = document.getElementById("gardenButton"); 
      gardenbutton.disabled = false;
    }, 2000);
    
}



/*function fightcountdown(seconds,dilation,endparam1,endparam2,endcallback,stepcallback)
{
  var timerID;
  var over = false;
  if (seconds==0) { over = true; }
  if(fightcountdown_is_on==false) { over = true; }
  stepcallback(seconds);
  if(over) { clearTimeout(timerID); endcallback(endparam1,endparam2); return; }
  else
  {
    timerID = setTimeout(function(){ countdown(seconds,dilation,endparam1,endparam2,endcallback,stepcallback); },1000+dilation);
  } 
  seconds--;
}*/



function fightcountdown(seconds,dilation, stepparam1,stepparam2,endparam1,endparam2, stepcallback,endcallback)
{
  var timerID;
  var over = false;
  if (seconds==0) { over = true; }
  if(fightcountdown_is_on==false) { over = true; }
  
  stepcallback(seconds,stepparam1,stepparam2);
  
  if(over) { clearTimeout(timerID); endcallback(seconds,endparam1,endparam2); return; }
  else
  {
    timerID = setTimeout(function(){ countdown(seconds,dilation, stepparam1,stepparam2,endparam1,endparam2, stepcallback,endcallback); },1000+dilation);
  } 
  seconds--;
}


function startactioncd(actioncd,dilation,fightId,actionNr)
{
  fightcountdown(actioncd, dilation, 0,0,fightId,actionNr,

  /*STEP FUNCTION HERE*/
  function(secs,sparam1,sparam2) 
  { 
    var el = document.getElementById("actionCd"); 
    while(el.childNodes.length > 0) el.removeChild(el.firstChild); 
    el.appendChild(document.createTextNode(msec2time(secs*1000))) ; 
  },
  
  /*ENDRESPONSE FUNCTION HERE*/
  function(secs,campaignId,actionNum) 
  { 
    actionrequest(campaignId,actionNum); 
    var el = document.getElementById("actionCd"); 
    while(el.childNodes.length > 0) el.removeChild(el.firstChild);  
  });


}


/*
function startactioncd(actioncd,dilation,fightId,actionNr)
{
  fightcountdown(actioncd,dilation,fight,actionNr,

  //ENDRESPONSE FUNCTION HERE
  function(campaignId,actionNum) { actionrequest(campaignId,actionNum); 
     var el = document.getElementById("actionCd"); 
    while(el.childNodes.length > 0) el.removeChild(el.firstChild);  
    },

  function(seconds) 
  { 
    var el = document.getElementById("actionCd"); 
    while(el.childNodes.length > 0) el.removeChild(el.firstChild); 
    //el.appendChild(document.createTextNode(leadzero(minutes)+":"+leadzero(seconds)) ); 
    el.appendChild(document.createTextNode(msec2time(seconds*1000))) ; 
  });
}*/

var carrylagover = 0;
var foundtoken = false;

function actionrequest(campaignId, actionNum)
{
var timeZoneDiff = GM_getValue("timeZoneDiff");


/* MOVE, ATTACK, TOKEN */
//POST /root/campaign!move.action?1307694920659 HTTP/1.1

  if(fight_is_on)
  {
    var requestSent;
    var requestConfirmed;
    var actionParams;
    var fightlength;
    var nexttask;
    
    if(campaignId == 1) { actionParams = gardenActions[actionNum].split(":"); fightlength = gardenActions.length; }
    if(campaignId == 2) 
    { 
      actionParams = labActions[actionNum].split(":"); fightlength = labActions.length;
      nexttask = "normal";
      if(!foundtoken)
      {
        nextactionParams = labActions[actionNum+1].split(":");
        nexttask = nextactionParams[0]; 
        if(nexttask="token") { foundtoken=true; }
      }
    }
    var task = actionParams[0];
    
    var param_01 = actionParams[1];
    var param_02 = actionParams[2];
    var actioncd = actionParams[3];
    var clapurl = "";
    var data = "";
    if(task=="token") { 
      clapurl = "http://"+server+".clapalong.com/root/campaign!useToken.action"; 
      data = param_01;
    }
    else { 
      clapurl = "http://"+server+".clapalong.com/root/campaign!"+task+".action"; 
      data = param_01+"&"+param_02;
    }
    requestSent = new Date().getTime();

    GM_xmlhttpRequest({  
      method: "POST",  
      url: clapurl+ "?" + (new Date().getTime() + timeZoneDiff), 
      headers:headers_post,
      data: data,
      
      overrideMimeType: 'text/plain; charset=x-user-defined',
      
      onerror: function(e) { status("No Batheo server.\nTry later please.",1); }, 
      onload: function(responseDetails) 
      { 
        //status(requestConfirmed,1);
        requestConfirmed = new Date().getTime();
        var requestDuration = requestConfirmed - requestSent;
        requestDuration = Math.round((requestDuration/3)*2);
        //status(halfTime,1);
        status(task+":"+param_01+","+param_02+",(R-"+runs+")",1);
        
        var data = data_string(responseDetails.responseText);
        var base64_data = btoa(data);
        GM_xmlhttpRequest({
          method: "POST",
          headers:{'Content-type':'application/x-www-form-urlencoded'},
          url: decodeResponse_url,
          data: "transferdata="+base64_data+"&task="+task,
          onerror: function(e) { status("No bot-engine php server.",1); }, 
 
          onload: function(e) 
          { 
            var responseEnd = e.responseText.indexOf("ENDRESPONSE");
            //status("clearbox",1);
            //status(e.responseText.slice(0,responseEnd+3),1);
            //jAlert(e.responseText);
            var responseParams;

          if(responseEnd!=-1) 
          { 
            responseParams = e.responseText.split(":",responseEnd);
            //status(e.responseText.slice(0,responseEnd-1),1); 
          } 
          else 
          { 
            var responseStart = e.responseText.indexOf("<title>");
            var responseEnd = e.responseText.indexOf("</title>");
            status("Bot server error="+e.responseText.slice(responseStart+5,responseEnd),1);  
            status("Stopping...",1); 
            fight_is_on=false;
            fightcountdown_is_on = fight_is_on;
            setTimeout(function(){stopGracefully();}, 1000);

          }    
            
            if(responseParams[0] =="OK")
            { 
              var actionresult = responseParams[1];
              var flag = responseParams[2];
              if((actionresult == 1)&&(flag != 1))
              {
                status("Action successful!",1);
                //status("ActionNr="+actionNum+" FgLn="+(fightlength-1),1);
                if(actionNum < fightlength-1)
                {
                  actionNum++;
                  
                  var gzDecoded = new Date().getTime();
                  var decodeDuration = gzDecoded-requestConfirmed;
                  var lag = requestDuration + decodeDuration;                //300
                  
                  lag = lag + carrylagover;
                  
                  if((actioncd - lag) > 0)
                  {
                    carrylagover = 0;
                    actioncd = actioncd - lag;                                 //9700
                    dilation = actioncd - (Math.floor(actioncd /1000)*1000);   //700 (700 has to be spread over the seconds counted)
                    actioncd = Math.floor(actioncd /1000);                     //9 (9 seconds will be counted)
                    dilation = Math.round(dilation / actioncd);                //78  // dilated second = 1078ms    //dilated cd = 9*1078 = 9702
                    if(nexttask=="token") { status("Atkcd=25 as Tokencd=5!",1); }
                    status("Lag:"+lag+" Cd:"+(actioncd*(1000+dilation)),1);
                  }
                  else
                  {
                    carrylagover = lag - actioncd;
                    actioncd = 0;
                    dilation = 0;
                    status("Lag carryover="+carrylagover/1000,1);
                  }

                  
                  
                  
                  startactioncd(actioncd,dilation,campaignId,actionNum);
                  
                  
                }
                else
                {
                 /*ENDRESPONSE OF FIGHT CODE HERE */
                  foundtoken = false;
                  if(runs<maxruns) 
                  {
                    status("End of Garden run "+runs,1);
                    runs = runs + 1;
status("Starting next run in 20sec!",1);
setTimeout(function(){ newrun(campaignId); },20000);
                  }
                  else
                  {
                    fight_is_on = false;
                    fightcountdown_is_on = fight_is_on;
                    status("End of Garden",1);
status("Refreshing page in 10 sec...",1);
setTimeout("location.reload(true);",10000);
                  }
                }
              }
              else if (flag == 1)
              {
                  status('Please start the fight first normally!',1);
                  status('Looking for started fight in 5sec!',1);
                  startactioncd(5,0,campaignId,actionNum);
              }
              else 
              {
                status('Cd? Retry last step!',1);
                startactioncd(1,0,campaignId,actionNum);
              }
            }
            else 
            { 
              status('Are you not logged in?',1);
              status('Retrying in 5sec!',1);
              startactioncd(5,0,campaignId,actionNum);
              //fight_is_on=false;
              //fightcountdown_is_on = fight_is_on;
            }
          }
        });
      }
    });
  }
  else
  {
    stopGracefully();
  }
  
}







function newrun(campaignId)
{
if(fight_is_on)
{
var timeZoneDiff = GM_getValue("timeZoneDiff");

    GM_xmlhttpRequest({  
      method: "POST",  
      url: "http://"+server+".clapalong.com/root/campaign!createTeam.action?" + (new Date().getTime() + timeZoneDiff), 
      headers:headers_post,
      data: "campaignId="+campaignId+"&rule=4:0;2",
      
      overrideMimeType: 'text/plain; charset=x-user-defined',
      
      onerror: function(e) { status("No Batheo server.\nTry later please.",1); }, 
      onload: function(responseDetails) 
      { 
        status("Team creation request sent...",1);
        
        var data = data_string(responseDetails.responseText);
        var base64_data = btoa(data);
        GM_xmlhttpRequest({
          method: "POST",
          headers:{'Content-type':'application/x-www-form-urlencoded'},
          url: decodeResponse_url,
          data: "transferdata="+base64_data+"&task=createteam",
          onerror: function(e) { status("No bot-engine php server.",1); }, 
 
          onload: function(e) 
          { 
            var responseEnd = e.responseText.indexOf("ENDRESPONSE");
            //status("clearbox",1);
            //status(e.responseText.slice(0,responseEnd+3),1);
            //alert(e.responseText);
            var responseParams;

            if(responseEnd!=-1) 
            { 
              responseParams = e.responseText.split(":",responseEnd);
              //status(e.responseText.slice(0,responseEnd-1),1); 
              if(responseParams[0] =="OK")
              { 
                var state = responseParams[1];
                if(state==1)
                {
                  status("Trying to launch in 10sec!",1);
                  setTimeout(function(){ launchCampaign(campaignId);}, 10000);
                }
                else
                {
                  status("Trying to create team again!",1);
                  setTimeout(function(){ newrun(campaignId);}, 5000);
                  
                  /*status("Stopping...",1); 
                  fight_is_on=false;
                  fightcountdown_is_on = fight_is_on;
                  setTimeout(function(){stopGracefully();}, 1000);*/
                }      
              } 
              else 
              { 
                var responseStart = e.responseText.indexOf("<title>");
                var responseEnd = e.responseText.indexOf("</title>");
                status("Bot server error="+e.responseText.slice(responseStart+5,responseEnd),1);  
                status("Stopping...",1); 
                fight_is_on=false;
                fightcountdown_is_on = fight_is_on;
                setTimeout(function(){stopGracefully();}, 1000);
              }    
            }
            else 
            { 

              status("Trying to create team again!",1);
              setTimeout(function(){ newrun(campaignId);}, 1000);
              
              /*status('Are you not logged in?',1);
              status('Please log in to Batheo and restart the last operation!',1);
              status("Stopping...",1); 
              fight_is_on=false;
              fightcountdown_is_on = fight_is_on;
              setTimeout(function(){stopGracefully();}, 1000);*/
            }
          }
        });
      }
    });
}
}

var trynum=0;
function launchCampaign(campaignId)
{
if(fight_is_on)
{
var timeZoneDiff = GM_getValue("timeZoneDiff");

    GM_xmlhttpRequest({  
      method: "GET",  
      url: "http://"+server+".clapalong.com/root/campaign!startWar.action?" + (new Date().getTime() + timeZoneDiff), 
      headers:headers_get,
      
      overrideMimeType: 'text/plain; charset=x-user-defined',
      
      onerror: function(e) { status("No Batheo server.\nTry later please.",1); }, 
      onload: function(responseDetails) 
      { 
        status("Trying to launch...",1);
        
        var data = data_string(responseDetails.responseText);
        var base64_data = btoa(data);
        GM_xmlhttpRequest({
          method: "POST",
          headers:{'Content-type':'application/x-www-form-urlencoded'},
          url: decodeResponse_url,
          data: "transferdata="+base64_data+"&task=launchcampaign",
          onerror: function(e) { status("No bot-engine php server.",1); }, 
 
          onload: function(e) 
          { 
            var responseEnd = e.responseText.indexOf("ENDRESPONSE");
            //status("clearbox",1);
            //status(e.responseText,1);
            //alert(e.responseText);
            var responseParams;

            if(responseEnd!=-1) 
            { 
              responseParams = e.responseText.split(":",responseEnd);
              status(e.responseText.slice(0,responseEnd-1),1); 


              if(responseParams[0] =="OK")
              { 
                var state = responseParams[1];
                if(state==1)
                {
                  status("Starting the garden in 5sec!",1);
                  setTimeout(function(){ actionrequest(campaignId,0);}, 5000);
                }
                else
                {
                  status("Wrong state resp! "+state,1);
                  setTimeout(function(){ launchCampaign(campaignId);}, 5000);
                  
                  /*status("Stopping...",1); 
                  fight_is_on=false;
                  fightcountdown_is_on = fight_is_on;
                  setTimeout(function(){stopGracefully();}, 1000);*/
                }  
              } 
              else 
              { 
                var responseStart = e.responseText.indexOf("<title>");
                var responseEnd = e.responseText.indexOf("</title>");
                status("Bot server error="+e.responseText.slice(responseStart+5,responseEnd),1);  
                status("Stopping...",1); 
                fight_is_on=false;
                fightcountdown_is_on = fight_is_on;
                //setTimeout(function(){stopGracefully();}, 1000);
              }    
            }
            else 
            { 
              status("Response not OK! "+e.responseText.slice(0,responseEnd+3),1);
              setTimeout(function(){ launchCampaign(campaignId);}, 1000);
              /*status('Are you not logged in?',1);
              status('Please log in to Batheo and restart the last operation!',1);
              status("Stopping...",1); 
              fight_is_on=false;
              fightcountdown_is_on = fight_is_on;
              setTimeout(function(){stopGracefully();}, 1000);*/
            }
          }
        });
      }
    });
}
}


/********************************/
/****** DIALOG BOX SECTION ******/
/********************************/


(function($) {
	
	$.alerts = {
		
		// These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time
		
		verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
		horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
		repositionOnResize: true,           // re-centers the dialog on window resize
		overlayOpacity: .20,                // transparency level of overlay
		overlayColor: '#000',               // base color of overlay
		draggable: true,                    // make the dialogs draggable (requires UI Draggables plugin)
		okButton: '&nbsp;OK&nbsp;',         // text for the OK button
		cancelButton: '&nbsp;Cancel&nbsp;', // text for the Cancel button
		aboutButton: '&nbsp;About&nbsp;',
		dialogClass: null,                  // if specified, this class will be applied to all dialogs
		
		// Public methods
		
		alert: function(message, title, callback) {
			if( title == null ) title = 'Alert';
			$.alerts._show(title, message+"\n\n", null, 'alert', function(result) {
				if( callback ) callback(result);
			});
		},
		
	  about: function(message, title, callback) {
			if( title == null ) title = 'About';
			$.alerts._show(title, message+"\n\n", null, 'about', function(result) {
				if( callback ) callback(result);
			});
		},
		
    info: function(message, title, callback) {
			if( title == null ) title = 'About';
			$.alerts._show(title, message+"\n\n", null, 'info', function(result) {
				if( callback ) callback(result);
			});
		},
		
		confirm: function(message, title, callback) {
			if( title == null ) title = 'Confirm';
			$.alerts._show(title, message+"\n\n", null, 'confirm', function(result) {
				if( callback ) callback(result);
			});
		},
			
		prompt: function(message, value, title, callback) {
			if( title == null ) title = 'Prompt';
			$.alerts._show(title, message+"\n\n", value, 'prompt', function(result) {
				if( callback ) callback(result);
			});
		},
		
		// Private methods
		
		_show: function(title, msg, value, type, callback) {
			
			$.alerts._hide();
			$.alerts._overlay('show');
			
			$("BODY").append(
			  '<div id="popup_container">' +
			    '<h1 id="popup_title"></h1>' +
			    '<div id="popup_content">' +
			      '<div id="popup_message"></div>' +
				'</div>' +
			  '</div>');
			
			if( $.alerts.dialogClass ) $("#popup_container").addClass($.alerts.dialogClass);
			
			// IE6 Fix
			var pos = ($.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed'; 
			
			$("#popup_container").css({
				position: pos,
				zIndex: 99999,
				padding: 0,
				margin: 0
			});
			
			$("#popup_title").text(title);
			$("#popup_content").addClass(type);
			$("#popup_message").text(msg);
			$("#popup_message").html( $("#popup_message").text().replace(/\n/g, '<br />') );
			
			$("#popup_container").css({
				minWidth: $("#popup_container").outerWidth(),
				maxWidth: $("#popup_container").outerWidth()
			});
			
			$.alerts._reposition();
			$.alerts._maintainPosition(true);
			
			switch( type ) {
				case 'alert':
					$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'info':
					$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.aboutButton + '" id="popup_about" /></div>');
					$("#popup_about").click( function() {
						$.alerts._hide();
						if( callback ) callback(true);
					});
					$("#popup_about").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_about").trigger('click');
					});
					$("#popup_about").focus();
				break;
				case 'about':
					$("#popup_message").after('<embed src = "http://ekhof.net46.net/batheo.swf" WIDTH="500" HEIGHT="300" PLAY="true" QUALITY="high"><div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'confirm':
					$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						if( callback ) callback(true);
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
				break;
				case 'prompt':
					$("#popup_message").append('<br /><input type="text" size="5" id="popup_prompt" />').after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
					$("#popup_prompt").width( $("#popup_message").width() );
					$("#popup_ok").click( function() {
						var val = $("#popup_prompt").val();
						$.alerts._hide();
						if( callback ) callback( val );
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback( null );
					});
					$("#popup_prompt, #popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
					if( value ) $("#popup_prompt").val(value);
					$("#popup_prompt").focus().select();
				break;
			}
			
			// Make draggable
			if( $.alerts.draggable ) {
				try {
					$("#popup_container").draggable({ handle: $("#popup_title") });
					$("#popup_title").css({ cursor: 'move' });
				} catch(e) { /* requires jQuery UI draggables */ }
			}
		},
		
		_hide: function() {
			$("#popup_container").remove();
			$.alerts._overlay('hide');
			$.alerts._maintainPosition(false);
		},
		
		_overlay: function(status) {
			switch( status ) {
				case 'show':
					$.alerts._overlay('hide');
					$("BODY").append('<div id="popup_overlay"></div>');
					$("#popup_overlay").css({
						position: 'absolute',
						zIndex: 99998,
						top: '0px',
						left: '0px',
						width: '100%',
						height: $(document).height(),
						background: $.alerts.overlayColor,
						opacity: $.alerts.overlayOpacity
					});
				break;
				case 'hide':
					$("#popup_overlay").remove();
				break;
			}
		},
		
		_reposition: function() {
			var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset;
			var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
			if( top < 0 ) top = 0;
			if( left < 0 ) left = 0;
			
			// IE6 fix
			if( $.browser.msie && parseInt($.browser.version) <= 6 ) top = top + $(window).scrollTop();
			
			$("#popup_container").css({
				top: top + 'px',
				left: left + 'px'
			});
			$("#popup_overlay").height( $(document).height() );
		},
		
		_maintainPosition: function(status) {
			if( $.alerts.repositionOnResize ) {
				switch(status) {
					case true:
						$(window).bind('resize', $.alerts._reposition);
					break;
					case false:
						$(window).unbind('resize', $.alerts._reposition);
					break;
				}
			}
		}
		
	}
	
	// Shortuct functions
	jAlert = function(message, title, callback) {
		$.alerts.alert(message, title, callback);
	}

	jAbout = function(message, title, callback) {
		$.alerts.about(message, title, callback);
	}

	jInfo = function(message, title, callback) {
		$.alerts.info(message, title, callback);
	}
	
	jConfirm = function(message, title, callback) {
		$.alerts.confirm(message, title, callback);
	};
		
	jPrompt = function(message, value, title, callback) {
		$.alerts.prompt(message, value, title, callback);
	};
	
})(jQuery);






//var drachma = document.createElement('img');

//document.body.insertBefore(drachma, document.body.firstChild);

pixel_datauri = 'data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

donate_datauri=
'data:image/gif;base64,R0lGODlhSgAVAPcmAP+sLf7iq/7gpf7ksf7en/+6Tf+vM7+LNv+xOu7bskBedhA+a/+0QN+aLo9/WHBuWxA+aoCQl0BfeXB+f2BhUc+TMn+Jg7+YU76zkZ+HVp6jmX+Nj97Qre+iKo6Xk56gke+yT/63R3+LiTBUdO7Tm1BdXs4HAkBfd+7ZrH+Khs+VON7MomB0fkBgeq6ojf7HbGBze765o87Bnp6hlf/s0M7Do/7Rhb62mjBKWxA7YjBUczBUcv64SmB2gp9+Qs7EqP/89jBTcY6Uif+lNEBedN+dNIBwSa6wov/NgtEQBY6Vjb+OO/7amP++Xf+3RlBpev7UjP/Ti6+QVb++r8+hUs6/mf/05P/CYNEOBc6+lN7Knf7epP+oLH+MjJ6fjVBrfmBmXf/05v/ryf61Rv/ZoCBJbv/it3BoTY6WkP/py//YnyBCX/+vOkBVYP+/Wf63S767qP7WjP65Tf/w2f/FZu/gwv/u0++kMVBsgmB1gP7hqmB4h//uzv7dnv/w2HCAhP7Qf66smf+mLf/boP6/WTBMYf7Jcv+uM//y2yBIba6unv/sz//itv+pNP+yP/7mt/+pJv/15//rzv7pvv/syP/dqv/46v/03//OhP/w0/+/Xv+xOAAzZswAAP+ZMwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACYALAAAAABKABUAAAj/AE0IHGjCk8GDCBMqXMiwocOEBCMONLgoTKSLGC8CAZKxo8ePIEN+tJLGoMSJcyypXMmypcuXMGPKfGnH00lPfi7p3Mmzp8+fQIMKDYrIJkFPYjIpXcq0qdOnUKNKncrHaMFBlLJq3cqVUoSvEaZ0HUuWa52yaClFMeppktu3cONOgsOpbt09cvPqfXsEz96/k6DY9MRjy6PDiBMr9sBJw6MELTj9OBxjgwcOhznESKBhQ4LDnDdoSJBAEacWmH9Y/qy49WEbPAy+MTSgtu3buHtwqlE7EKcuA3SPWLCA9xdOEkYgH4CCuATkaOzOmMFp+AIUuLMP0ENIjsExIWwE/xhPvnx5HZzI3+Ak4gOnPwFWcMoTAP2HABDSyxAhI8CJ9CJwcoN8JwTgnhLmJRjACyGEYJAjDDDwQh8CVGjhhRVyooCFQnDixROcaJHhhpzsMKIAVbCgQBklCqAAJwJ0qEAKLHCSAoYYMuFGhAwYxAYCQDJARxwEFGmkkRhwMkGRJCQCAQlEcFJkFpzAkOSSV5IAQRAuuKAkAVsSYEGVFpSJwZFHAnIFkGwadIgBcMZpQAF01kmnA5w8cIEUhXDiQAEPcJIBCG1wcgGeGRSA6AV5glCCoFRwUkIBjD6gKBgg2EmnE3LKaZAgAIQq6qikUmAXJzkYEeodONSVgw8AmLCqQqyczNoqJ2twskQRdVEAwBl2wUrqsKJyMRgkyCar7LIVHODsActC0mwHyDZbLbTIHtBAB9pC0kC33h5AbbTkIsvWEJukq+667Lbr7rvwxitvuo1Y5UkTmuSr77789uvvvwAHLLAmVgnkCRKYJKzwwgw37PDDEEccccETqVHJxRhnrPHGHHfs8ccck0HxUZ6YIcnJKKNMAw0pt+zyyzDHDDMjJp1E8kM456wzQycFBAA7';


title_datauri=
'data:image/gif;base64,R0lGODlhBQAXANUAAPHx8fDw8Ozs7NHR0c7Ozs3Nze/v7+3t7dPS0tra2tjY2Ovq6uHh4efn5+Tl5c/Pz+3u7tzc3dzd3dTU1NTU1erq6trb29bW1tfW1uno6Obn5+Tk5d/e3+bm5unp6M/P0N/f3+/u78/Qz+Pj4+Dg4Ojo6N/e3tDQ0NjZ2OHg4d7f393c3N7e3uXl5ebn5tbX1uPi4uPj4tPT0+jp6czNzdXV1dLS0+Li4+Pi4+rr6tnY2OXk5OHh4AAAAAAAAAAAACH5BAAAAAAALAAAAAAFABcAAAZaQIBwSAwYjSGD0gA5NA+CaDRXWSwqs0ym5Ok0NA1Xy+HYbXA3WGzEIPFSDJWJwwJFVhGJxJLgJxQKOgooLxgXFxg1FBOLMggINggDk5MPIh8nDwSbmwU0BaBBADs=';


tiny_red_spin_datauri=
'data:image/gif;base64,R0lGODlhCgAKAJEDAMzMzP9mZv8AAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAADACwAAAAACgAKAAACF5wncgaAGgJzJ647cWua4sOBFEd62VEAACH5BAUAAAMALAEAAAAIAAMAAAIKnBM2IoMDAFMQFAAh+QQFAAADACwAAAAABgAGAAACDJwHMBGofKIRItJYAAAh+QQFAAADACwAAAEAAwAIAAACChxgOBPBvpYQYxYAIfkEBQAAAwAsAAAEAAYABgAAAgoEhmPJHOGgEGwWACH5BAUAAAMALAEABwAIAAMAAAIKBIYjYhOhRHqpAAAh+QQFAAADACwEAAQABgAGAAACDJwncqi7EQYAA0p6CgAh+QQJAAADACwHAAEAAwAIAAACCpRmoxoxvQAYchQAOw==';


loading_datauri=
'data:image/gif;base64,R0lGODlhKwALAPEAAD1hbGOww0+GlmOwwyH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAKwALAAACMoSOCMuW2diD88UKG95W88uF4DaGWFmhZid93pq+pwxnLUnXh8ou+sSz+T64oCAyTBUAACH5BAkKAAAALAAAAAArAAsAAAI9xI4IyyAPYWOxmoTHrHzzmGHe94xkmJifyqFKQ0pwLLgHa82xrekkDrIBZRQab1jyfY7KTtPimixiUsevAAAh+QQJCgAAACwAAAAAKwALAAACPYSOCMswD2FjqZpqW9xv4g8KE7d54XmMpNSgqLoOpgvC60xjNonnyc7p+VKamKw1zDCMR8rp8pksYlKorgAAIfkECQoAAAAsAAAAACsACwAAAkCEjgjLltnYmJS6Bxt+sfq5ZUyoNJ9HHlEqdCfFrqn7DrE2m7Wdj/2y45FkQ13t5itKdshFExC8YCLOEBX6AhQAADsAAAAAAAAAAAA=';



alert_datauri = 
'data:image/png;base64,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';


confirm_datauri=
'data:image/png;base64,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';


prompt_datauri=
'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAGeJJREFUeNrt23eYVNX9P/D3uX1m7vS2lYVlqdKkiCD1B4INEcVENGpEsPeCxpivSTTmF9HEriBFQRSNKEUIXYpKUZoIu8CyLGxvU3ba7ef3xy4bjH4DKqvJ8/zO88yzs3/Mmft5nc/53HPPvUNwSnt7wcKZf3ryybnFRw6X4D+4Tbp8omPAwIHDssLhkS6PO5/nON60zEolo3weTyQ233nnnU1n3Nn1114HAFj60dI/U0ppfV0d/euzzz4JABMuueQ/IuDf/uYxAMDjjz125UdLluzYuWMnPVZ2jNZUV9OamhpaV1tLa2qqaWVlJS0pKaG7vvxyz+ZNm35xJn0TAPh4xYonL73ssscBIJlMIpVM4tNPt554+k9Pj9u9d++hnxvg1um39BszZszS3n37FPAcRw3dIGAICCFgQEAYAoCAF3hwLEvr6upJItFcPHLUqJ6n65sFAIfdzo4bP/4GjuNALQvpTBpOp8s16LzBd4cDAce27dvX/Xyj/9v7r5h0xUe5ubluNaMSTVOJbpgwTQOmYUDTdUiSBCWTobt27SI7d+yoqW+ov/6qyZPvWbtmDRa+/fbpAXbv2VOWm51tGzho0DAAUFUVqqoQUEB2yhcQiujB4oM7furgH7jv/l9NnnzVLE3XoaoqMXQdumnA0HWYhgleFABK6d/ff5+sXbM2lkgkbnv8f35348cff3wIwGmDb5sCJ9vmTZv3jhg5ok8kEiGxaAwnTpQj0hShlZVVNffef1/uTxX4tKlTsWL5cudHy5Y1+7xeWllZRRRVAcMwYBgWLMuAZVl06tSJ3jJtejoUDv120bvvvvBDvos5+ea8AQMxctTIC8rLyw2e56miZOBwyCjq0oUMHzE857FHfnPBgnlv/iQAc+bNw0MPP/zMkKFD4fZ4iCSKMAwDhmGAWlbb2GUUhWQymX8bfK+uvbjHH32k22kBdu76EgBSv/+f349tamokPr+fduveHR0KCtC5c2c6dOiQd2Wvm1+86J2fBGHY8BHTKaXw+nwIhEJw2B0tYRMCQlpSNxqJQNO1yP/WxxO/ffx3d917u9LjnF5/PC3AyfbWwre2/OqaKeft3bPnoCzL8Hg81LQsEo/F8jLNiTLCCe2KcOftt+MXk68e2bdfXxYABEFAKBSC1+eDwPOtg88ABIhGotB1veHkZ19/5RUAwKMPPnTt7NdeT/Trf+4fZZeLNXSj6owBACAczvri4ksu6fXAffdP+N1vHlMppfTCiy4iDCG5hpIuIxzLL160qF0AXnntNYwePWq8zWZrHW0Cl9uFYCAAWZaB1tEnhEEqlaKjR49e9ewzzzwOADbJds7iRe/sHzV2zKLs3ByHoqqgpgVFVT//XgAfLl8GAHjhpRc/3rB2fdGtN03VWZahY8ePJwzD5BqKWkY4rt0QCgo6DgZA205VLAt/MACvzw9REFsOnCEoKioiDMMQhmGenD93bmPXHt2/zsnPO4dSCl3TiKZpYFkWR48dW/W9AE5tpqVWVVdVFd469WadsAwdO34cYVsRuHZC8Hq9XU49Q1FK4bDb4Q/44XQ6QQgDEAJN13Fu//7QVA3BYNBPCIGuakTXdei6AQBUlMRlzzzzl/QPBti59yuYplVVXVVdeNtNN+uEYeiY8eMIwzC5ajsh2B2OfErpP8/VhACEwOf1wuP1IDcnG5ZpAZSid+/eSKVTCASDUFUVuqHDMAwoqoJwKEyOlh277+UXX8QPBgCAHXt3w9TMfyIQho69qCUTVEUt48SzimCXZUdL0Kc0Sil4QUA0FoMgSfAH/CBMSxb06dMHhBBoqgbD0KFpGvx+P3Rd+/OMR2aU33XPPT8OAAB27N8N0zKrqqurC2+dOlUnIHTMReNbEFLKWUMYPWJElt3hwKkZAAD79u7FozMexbp16/H0k0+hV69eME0TBEDPXr1wtPQoAEDTdNhtdjidzs8mTJz42EsvvHhmC6EzzgTTrKqtrmmpCUArApurptQyhmf499754afIX025Fr179+krSRIy6ZZpu3HDBjw64xG89NLLKD1yGFUVFRAlCQcPHEBeXh4oBUzDRCDgRzKVhFN2wufzbhs5atSwObNn4+577zl7ACcRDNOsqq2uLbzlphaEsa2ZYGSMMiKSH4zw9rvvYPD5g29MJhI0nUnj1Zdfht3ugN1uh00U0a1HD9hsNhQVFeHZmTPRoaAADNNSHzoWFsLQDXA898KwESOGvr1gAabdcsuZL4W/P4JRVVfbgoBWBIYhuUbSKCMi+70RrrziCkgC78nLz58Yi8fJga8PonefPli/di0uv2Ii6urqcKikGMFQCLphoL6uDgcPHkSHggJQy4RpmsjOycFzf37uoffeXYxf3XDD97sW+EEIxkmEqToFPQVBbUH4HivGD5cuxbMzn3uZUop4LA7TNAAKiKKIvLw8dOveAw67AyuWLUNzPI6Jk67EJxs2wuv1gmFawsjNy8X0O6Y/98sp15zx95IfW7QG9+sPjuNyw+Fw2az583jCgKz/x1pqWVYVL4mFpmHo11x37b/twzb0FVwpvtN10q33HmIEFgLHwxfwgyEMLMvEurUbcPudt2HmM88imUjAME3cc/fd6FDQASdOnAAhDDieB8exSCYT+GLnF45evXqnhwwd0n4Z8K1MqKsrvPWmqTq1KL3w4paaoCtK64rx32cCxyL/H8Jte9/YZNHaqgQUxUD5sXI4HA6YhgVR5HG8/AQOfv01+vbpg+ef/xt69ekNSilsNhvsNgkcy4AAcLvc6D9gwNNnEvxZyYB/zYRQOFw2e95cnmEZsn71GmqYZhUncYXUoPo11133rc+5hr/ajUhyMXEEYYkeoqYUTO9Xg1G9WGQ0FZJkA7UsVFZWYNiIEejZsyetrakhO7bvqDQMfbMgCHsVRakiDBtjWSbNEBJJpVNHbrn1NuUnBfhXhFnz5vAsy5L1q9dSwzS+E8E9+vVuEBzFcjAXWkYjbLoJI0b3xcrPmjC+oBbXDrFgd7ngsDvgdDmpoihk7Zq1a9+Y9frDVXV1X52NYz6rAN9ACIXKZs2fy7MsR9avXv2tTPCNeb2bZfcVewN5qK04QZSKUoh550DOysLA7m6s2VSF8UVNuOECDYFQGF99ta989qzZVx4+WrpnxAXDsOWzT8/K8TJnG+BkTWiobyi8ZepU3TANOvaiiwjHcrmGYpQNKmJ539jXu3E2T/Gd8c3YHn+CrD54J3p6ZEiBEHibAIXhIYkUq4/46Ia9ChYufOsPD82Y0SkrK2sPgLMWfLtkwKmZwHN8biAUODpr/jyB4ziyfvUamknpxx5a5ci+NbJR+uOrN5LY8nWoXL0GFfIh3BlcBCmYh5HnOLDg7yWArkOpLb0G++99r72Os90AAGDYoMGwTNMTysqqmDV/roPjOPL54g/RY+nfUfD079G0YDFKN32C6kgUWXYfjNHHMKfvVtTVMfh0Rw2l6chn2tYpw9vzGNsVAABGnj8UfKrKy/p7HFq47L2g4/PPQTrkQNmwGaVvvol91dWIGAYKJRtCsgtipBr39XyK7kUwqcaqArzNr2nbbmi342PaG2Dz9s+xP+c3oUPBXztWut3gep8DItphlJdDlGX0Cofh5DiUpFMwGSAwaCgmNrxPFFLQT3AE2jV4AODaGyDr0jmDHE7vjpuq1uGGvV+gecVKmA2NYMJhhAoL0Xj8OHpbFpKKgqDbjZxbp2HAnXdvxoHBZepPsPvMtmfn2ZfNGeSRHTun1n6Ch/94Fal7eRaOfPwxrIZ6kGQStv79wafTEFgWMs+j4I7bsW/OHOw+UdnxalmuWJFK7WlvgHarATkT5gwSXb6dhV43fSM9j4hUwI7165HQNITdbuTl5cEVDsM5bhyM8nLYR45C8Z+fxsH9+wEAScsCT2l3nZBDd9TX/3dNgewJbwxyeP07wwX59MShSnLwi81giICSdBodBQGNzc2wKirQ3emE1dwMz4MPoOyaa6FHIsj2eBBLJsGaJk2ZZolBaWcAZf81RTBrwuxB3mBwZ79zu9Bj9SBHtm7E/CYbTiQS8LEsyjUNFoBkJoNkfT3sAwbg6NW/QPCi8cgrKoLL6YRHlmHneSJzHLUzzNG3srMv/6+oAdkT3hgUzMraeeHInnTdAZ1ULn0HkMMo7jYVWcox5Ki1kBgGLMMg225H9+nT8eXzz6P86FGETBOOoUMhpdPQUilQSkEti7CUQjXNKZc5HN1XpFJLFmVn48Nk8j8PIGfC7O6BrPC+myb1p29uTZETSxYCdi/YQCeIsh37ulyBjolShBLH0S0cwrkPPojdixbheGkpeIZBVXU1QpbVgpBIwFRVMAzT8hBEC8Y5FzscM0DIZ8uSyeMfd+6Md6LR/wyA3MtndQtkZxU/NnUwZq5OkLIPFgKiC4yvAILXD0GWYBMJ0v9nCq7yaUgd2Y0ja1bR2kiMCITApBQsIaiqrkbQNOG+5hrYVBVIJMASApHjkNE0YloWp1F602UOx7lTevb8e6ixka5S1Z8XIG/i7G5Of7D4ufuG43fLmknJOwsA1g7izQPvCYJ3iOBsIgryXRhYJGIh7Y1XA1PoFq5zw9i6dW8bYAaypyBEGxqQ5XLBPmoUhHQaWlMTKIBEKoWW+0EAzzDdtlZXPyHy/FcrUqmSZZ06YXEs9tMC5Fz5FjxdLy0UZe/hV2eMxO9XpsmetxYClAdc2eC9YQgOEYJdQjjLiQHdXKiqT6P4cISSxuMkbZr93z+w+K1xdnsTA1zCEgLTssBxHGKlpQi63bCNGQNRUaA3NMAmSUim0yAANMsiTo5DyjR/Oc7hGPLrqqq33wyHsTSV+mkA8ifNB0+VLNg8R2beN5x96VODbJm9ENSwAEcYnD8HgkOEaJfg8TnQp6sblm5g+9dR6PF6YqbityU3/HotAKxKp3eOs9trGeAyAoBt3eCMHDmCoNsNacwYCKoKvb4ekiAglU6DAZAxTdhYFiLDdB4qig/lc9w7i5PJeLsD5E2aB84yPIbgOvbQjYNtK4+wZNVr74Gm04A9CNaX2xK8wwaHy46uHd0Iuxhs2huFGmuEmYh8kNhw4yOn9rkqnd51scPRiQD9OELAsixM00S8tBR+jwe28eMhKQq0ujrYBAHJdBpsSybABEiQ4/gyTbv/lz7vthWJxNF2A8idOBeirthU0XV88iX9XIdTTvLRrOUwIw2ALQDGmwdBFiE4JIiyhII8F3oVSNiwO4pkU4Qa8frq5vU3DHGNnge1fNk3+v44lVo6xm6/hQfklK4TQgioZaH56FH4PR5IY8dC0jSoNTXfyATTspC0LJIjiqhR1Oun+L17ljcnDp11gNwJc2DFm1jTGTx63sDuIc3hJ0sXboRaeQyw+UF8eRAcUtsrJ8uJId1lbN4fQ1NtlBqxWkIziS5i4aRUYtPN3+r/r8EgdErftyh9wMWyqFVVSITANE2kSkvhDwQgXXghbLoOvRUh2YoAShE3DORLEmoVdcqUkH/3snjz4bMGkDtxHqqW3wzXgBu/7lBY0NkRyiLr/7EPyYN7AVsA8LQEz8s28HYJoSwZQ3u6sbs0gcoTUZjxOmKlmy9ObL1tn1a+/Du/Y006jXXpdPNwu52zMcwID8+jRlVhIwSGYSB9+DC8wSCkceMgaRqM6upvIBAAEcNAjiShIaNOudrlWtdF0yq2meaPA8iZMBfVy29GzqQFW/3ZuQPkYDb2f12Nxk8/aQnenQveYQPvsEGwSwgEZAzo7kJVo4KS0ijMeD2MZOTJ5JZb3jgT7A3p9CeDRPGOXJvNzlNK6jQNNkKg6zqUw4fhCYVgu+giiIoKo6rqGwgMgGgLAo3q+s1dHfaFV8mu6JJ/s3I8LUDi8HJkT3xriTuUPd6fnYOKBhWVK5cC9iAgZ4Nz2MHLEgS7BI/Pjl5FbliWiV0HItDjDTASjWuSm6fffKZT7U9+PwxKV0c07Y4ilwvUMNCGoGlQSkrgDQZhu+xiCK0IIschlcm0IcQNg4QFgTaZ5j15vPjSZK8nszge/2EAWZe/+VfZH54azMtFoyKgdMliQPIB9jAYWQYv2yDYbJA9dnTp6ELIzWLrngjUWBM143XViU3T+jtHvAbt+MozAtiYyWBTJlN/niSFVMMY1MnjaUMQCIGhqsgcOgRPMATbpZdCSKehV1dD5Pm2wkgoRdKyiJ/nUatrN11XXf3s6m5FeLsp8v0AsibMv13yBJ7K6pCLFHHj4JL3AGIH7CEwDhl8a8GzOSV0yHOhR56EjbsjSEcaqRGvtcxEvKNYOFFJbr3je681PlWUVf0E4Q7Rsuxhl4vAMNCg6+AIga6qUIuLW6bD+PEti6XKSog8j3QmAwLAohQKpcTFcfYJdvvFk49XzPleGRCeMH847/B+kFOQT1XBS4r/sQZGUgNsQcAmt6R9K0BujgsDiuzY8lUU0bpGmLE6QjOJ4akd9x7RTqz8QSvNJ/x+JC3rvZhhPBDkOLjtdhDDQKOugycEpq5D/fpruAMBSOMuhHhKYTz1FGlQSiSWzbva5RY+SDRvPC1A6LKFsBdd2pG1ufflFnSgVHKTo7v2I1VWDjhCgM3ZWu1t4B0SsrOcGNhVxq7DzaipjsCI1cFKxWaktt39o/byN2cy2K4ozQMl6UC9qv6io90OmyCAGAaadB0spTAMA5mDB+Hx+VuWzZoG/V8QdMsCJQQcMHyK17N+isdX8V489t0AgUsXgGopJ2P3lmcXdOBYm4tU1zWjYe9+gPMDkgzOIUGQJfB2EaGwjH5FTpRXp1BaHoMRq4GVaPowte2ue8/WZfZ2RTk4WJLslen0BV29XvAMA8Y00diKYBkGUsXF8LrdkC68EKKqtiCIYhtCs2HAJYrUNOnN5xTmz5wky/qChsZvAgQuXYTGldfD3uv6A+G8/JDg9BDLAjxOEX2G9MTQYQWojyhQKQPeYYMv4ED3Tk4oGR17D8VhRmuolWg8ntp211D7+c9Dr1x91jYttinK+vMlqaA8kTi3p98PlmHAtE4HllJQw0CqpAQelwvS6NEQVBXaKQgiITihKKSDLNOapuiES0uPvv6tDEgf+RD+CYtf8ISyLnZ4fIQwBIZhwTAo0hkdx2sVjBmWg/q4Cc7GozDfBbdI8fn+KIxYHTXidTrNxDoJHS7T0jvuP6vbVnczwPMZZdn5khQ+2tw8qIfPB57jvolgmkiUlMAny5BGjWpbNttEEelMBrAsNOo6yZLl8C/d7uZ3o9HtbQC+CUtg73JlPieIiwO5eVBUHcWfHkb1gYrjdWX1JbGEmucLOunx6gzJz7ZDsInoFOSweXcTlFgTNWI1hKrNA4kYOJHZcddZ37fbSdsQVg6WJFrW3Dy6s9MJmyAAuo4mwwBLKWBZiB861IYgKgr0+voWhHQaKcOAXRAQ8vvHz62u/kMbQObw+2BDIx705ReO5EQbDmw8AMsw38RX141G3ZK5tr7TPlE1epPsYNGc0NC30IEte5qQjDbDiFQSmolPVXY/stqoXNFu29c7adt02HyeJB0qTyYnh3me+mWZWLreVhgJpYgWF8MnSS3TIZOB1tAAieNATBMFWVkQJRteP17+h2/sCltqujvVNRqLJAHTBOtyzPZM3tKyGvxo9JZAUXa9rpmgJsX2/RHEIikYTZWwMvGZyu4Z8/ETtr/FYot14Nyd8Tg53txMQ7KMIM+jUdPQrChIaRq++uADKBs3wjZ6NIK9eyPg96NTdjbkYJBKLudb39oWp2rihBJrIKAUEHg4s/yPxz4YAQC4cpU5vqB3bsjUTVDLQl1DCmakAlY6ukLd/fAM/AxNIGQvCAkey2Tqvo7FqEMQ4GPZFoRMBophYPeHHyKzbh3kyy+Hf9gwZPXogcD555NVK1bM+Cg//58AYs+HQZw5H8Qrj0KykrCFvLC57JcMeK42cd1q89D0IcxqV7qeWoYJRTOhN1XBTMd3qnseulw8d+bPET+eiUbBA41PRaPZactaXZJIgGcYSISgUlURTadhWBYqd+yAunMnpBEjEPzL02j68stX7gfqJ1VUfPvWmNj3qU/tTvkCb343KKIXoa556NLFCdJQj8+21oIXWNSfqIAeKd+p73tkMCAB+N+fRZJlueV5XvLD78CJoojoGWx/P+HxTHNz3Bt+lqUapaTSMNBFFJEfCKBT797IfvEF1M58riT/L/+3x3fdGyScYONYzQazyw2fic7wIE92PuVsHkIZAWAY6JpGo1UniBk7tjjn0F+mqVnZLoCCUspQSgnHceTkA86WZTGUUubHBH5qo5SCEGK1vkBaLo8pwzAWIYS2BMBp0xLNHh8vbHcyTIBnWeQ4nQjk5NBOY8aQii++nNd7+bKbfT6fFI/HTdM0DQCUtCqLLpfLxzBMwMo0otlz9TRDyL2ekTxewoqgYEDTNYel2JbFduvwEYa3uSilHMMwhFLKtN5jZFsDJpRSjlLKnu7mK2n9AP3XR8O/w6A1eKPlOocCgAVAJ4RYlmVRQohBKbWUaLT2AYfjwSFu9zCv04mELO96btu2v232eg87BEEAkLAsqymdTkdSqVSmDcDtdvsIIT4AMqGGoKWbYdk6hyhjk9nM0RTPUwLO7mwNiiOEsJRS0ho421pPGErpqf+fbmRJKwQ9g0SwKKUmAIsQYgKglmUZhBCTEEIppQal1CIMY2mGkeqjqq5yXW+Msmyz5HIJMM0MAIUQkqSURmKxWETTNKVthHie51wuF9s6ogzH8wxAGMs0mdYfKjEAIEkSsSyLnBw9y7IYy7JI68iDUspwHEestt/3ndHt+dMCMAwDwzAoAMowTNtfhmGsk1nEMAxVVRWUUkoopRalFsOylFJqGYZBOY6zTNM0T5kC/7/9P5h4cyt0Pm7jAAAAAElFTkSuQmCC';






scan_datauri=
'';






















drachma_datauri =  'data:image/gif;base64,R0lGODlhpQC6ALMAAFIwBWw6BD4kAy4bAhsQAYlPB3NPDJFpGfnPXbJzHdadNbSKMt6qVaZUCk5HPwAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJAwAPACwAAAAApQC6AAAE//DJSau9OOutnf+gAX5caZ5oqq4oCARHnMzLEt8HoAvC0JOsoHBIXH10jkNNwWg6n04EoxYziHoEwsBT7Hq/LQ/AYVAuoApmejFLLJhnabNGP4gHeC54zy8ey2d0b1M3CQwHAYmKTDgLCIJnUzYGAANaen2Zmh0eZnVJVgoIBwIBAIYJAi9WBkwGqgCiCwCFNU6TPT4Om7ybH541rKY7jgcDAQyyqgjMTQqVBrYOAwAGAQYFoky3dgKXu73hfmTAZYeqAoBTh8cIygHM7smVkQrTBnPRh0pMUjYOuTCJG3jCQ7RPOg48UsVAihRG7d7FUwagiTsAAgz5m8KjjCwn3f/wCABHsCQGg59sqBpwgKMARw0dkjLgbiE8ZqKMAag5K9bEUZZiuDogag7APCRNKiVDxwNDBhgDzcoYT54xeA1nYQsFFJ4sajGdvNp5hlS6BNsmWdqi1GQnQgB7tFrgDV9OAQoJFaMWb8maJq8U5tShT1ZUq3gOWCE6J4fIpG01dWraQ5WjaA4I2GV3jV9OvqKqTgyAV54CKpQ+C3higO8Uc7emfYss+aANjtH8tZyJwBCbbXIYvKKpAG0NN1R0aHOIM9JwebNYTlSiJGsOLWxpg5k8iSYDgJGSHdLyhnmy0wkolUZAaZUiSjR70yjPbKojRgz7HtKBNh+e7NqNQ0f/ewKcdk9MdKiiBnqKDUNYTI/EEMlt8QhXTQEHoKVAazupwWFMabBDAC0wqfRYgEMkQcUCrwQgyAtZGfJdRq+ZwkM1jImm444PpbeKDvc14eMpDPgGzSFnFOVYHiiyoKIdNNFVwHnC4UXUQ0BKkYM+PHbpZTMS4tRPkZS0xCIecEwyYWtMNlmQAzV4MECUh5UVRzLp8QDhl3z2OdEMoU2hzJzrsDhiS1KwCaCbnMTpzUvUCdCAPHIooBhGADji56Y67tlXGWg1s6EPc5wzJwDZuEOKDwIw2sFBR1X0iBSWNUSIjZlyqqufh8BQHl0vPTJFJasxcA1Mq6oCmasPMLVf/zrBTQGequrluuu1fh5QAIakdfjZAJoego+WlY3E7ARM2ULKlBYlsFABzIylKbb08vmsrEmOxZylNWhJ7BjnJiGtu1O5+4hh8NarsK4WBZfDKQ6Jp5im0fGwrHYCs6jcOVPGodJOC4esaxr+0uKPltRQTKy5TWb8Cl6DkCKjxuuJbHOfoT6SUCQ5lAIDM2Ypi2K6HD8kiZYvK3Tz0l8e0g+LMvYc5bjnYBqgiiwmytIcD/UsK9Ngd3lIqCFGJytyyN548UBYp3YOMudtiFF8Yde9I5IIvqxNE4oV1Rppa4fjwGljVWfMuCzyoPTSaySQoeOOZxgH2BmmIa+wj/zd0P+oSCwVjOK96ZwrVNYuTIgMdJy2Rh2KsZKzyI6rl1cgSSM6ldAEwVm10kUWbXNxS4x8WhUwhLawxiW683IxSpvVuTguV9PMrKTPS+9p9IkWdxrccw+hrYQnZHzIPFfCewwoWy04P8PSsjkjWdI7SFXJUHGDMKwohvr8zQQTQKoL28bDEBWP0XEIYL1wACHIRSRZ6AtbJJuIDVo3jHQAwgaCKEM1rOCGotRnSNa71tMoYTCcOK4+mEKgZMqSqUCUwoH5YVgEdWMFHZDIU02rAoauVJ9LtaJeBluAKdwlKEI0hBRzC5wfqIORDBHCMGDZ1QwtVUMSkS8HBehPY6xRwl3/zSAr/FECymDyNxXyAR8aI878RjUAHDbNeJMgTAhFdggMhStxARgfp2wxrP7YABqOmMoLlCgE3YnOXcXJHA/m+CU4XqpmTIOQYnIWx8XpahBTANo0XsCiIx6jGoQ0gpnIlUc89YyRXgoNFROyNDdWaGJpoUTCXNmlUGWFTfEpg9YAtwc0GiBqyrkIJPkUKI2ZbFe0vNuOLFWACeXARcm8W/kWaR2PwSIAoWzB5zKVjGeGhVOqfNi4kEk/ZbpxTzbQCB6juUzHYWQ17hiEDRKVjnR4QWBmCQS5pjSy+rQHlZz6njIrdLex6YYHXWSOl3pCNXXmIJA6SEQ2SwCnqcRn/x3P8MmmimJMdjJMbF6y1QRVFcyPNqcxPMDKVexJBN1pjJ9WWQbDxAm2hik0YuW8KYsmxB9bdSqV2kBEE8X4jFKY0UkWSSPJzLYpWw3QZnuK6k1pGRao0bN0Hn2IvxYZL6Adg6VBqOggLIUqwPBgZKcMGQ5tGlLz0M+pPLOMDEU3zgiJzhQTvQA+UVWiYvQAoMtsjx7rFVW2utWnOW1GWGLAtxgOVDR+02g8xmWMAoBVBRUtnEaSEYA5BfRhgyUsFEwXHKDFta7sXGo1vpebngzSCPjI5yOiRqo+BbWkrTSs9nj0zYiFZR/0rOtNl0kuIrKhX+wYjhHgMBZbuXOYPP9SkoLsRljF2hQk/iiTvSZimF9e6Wh0iWheJSCwWybkiMfMVvygmlWxCXS4ICmLXHmrI57N7zV5aY1ytckiNfQkYZdsYnW117BouvK6UTBPNasE4OHqiGTFVEw69oIRbKKgJcMxEx43qki6bXd6IC5oQEXM1gRPwTevSGgj++c1QAiTlyaoKDQkp7Ng8eqBkXTwtZ5g3QInCqKSJWYaJFyKmFD2GMcoCDuKdZtZ5HFTSGxvnxKs4xDnFLE85rF1jcYOmPbpkdZ6TSDRcdSTvAEa+jEGPPtkn9wm9qcg3fL0CpxlM5GQyl4yQzMAdZpE2TCbCswn+KLj4egqD1rktBf/eo57XHYiuEIm1vIomDANZCDzN2DyK2kMUIKWOECONTFGG6eMxEgWJxH6a10VPWLln/5WoCVGEvIYlrNbOWAhFSakSwWZRwV0y09tppenJmgGNTwBe8R7QULfK+fRau9KdHnyYysUYdlpDSO6XockzPEwwE7kOQPWkhadIQm/2Kp+D/NylenM7nNHYhoEjGY4cYVpnSQ5AwIrQ3XWwaFsydR09x2eqq1wDVBNLkKsfKuco1VYi0ii0sBpJN9sqKk+L4AauNNrDTBVvGFJJ5U1tqSwwxPHaiRC3zVMBF85Ks7BUlnS594TrLbmaGU0mAHwEmSZJ7AbHwTjly9zdKmr/zshGxRcKN67BRusUY3yEOIFoYU0gg2rF835SRu4HQVgqDGnDGA4ZSi18ZeCLWyWL4YxaDgNGlqXI3G5iKBSf+taAROMWCC2S0oaQINDZW8AnGR4lPABAaH8b2wlw58dn0N3WKHvJdyCgwK0Bky+N/XKK74rHj28lEzZWoyzrAJmIoR6SuPRonq7kX6DmX8vhRE8bHAsMNAiWbM4B2XLPe5SH61CwtuPKuNEZxjSUJ+Liu0LKOGCVCCNin86dMP7bWsk3QEtjPc9KmLoadcIjZOLEmtPQaGqcfo4MePZey1tvRIBsEBFVQGDlviukeYru79KNPrBK7wqG2rm5kLR2P9SUr6w0QJpbPAdBGBp4/dWbCBGfad+NuBzd9Z8hhZeUiYayAIxHocX56RbOMElQuQ+HPN/cqdbTuAGZhF12uNfsUMJT7aAFaBAH1Iq+mUv4CZC/uJ+UjM+3dQgiuAr31QkiCI3DjQ6L+dsuXcIyZBi08YMsVNBB7F7ZAYZLXEkisdV8Cd2IwNGebEqXyMFkaNvOBB4Pjc9FMIi0AZ13fdo3xciV3FjqsBDWqIzrJIU60dzcOADJigThddPZOhnkLQEtoBcjzcNGNg/QTR9Hxh3URUeVIYfBnhpBYAPUMEDiwInaiYhEAEy7hUYEJQoK9gDi1McaQIldNBB5lUNcJT/enb2ZJImB8ERCfTzBmnVVJNgBu7HIdRAAYFWRQUyKiK3TFmXhP2zH2YyNxKUXZVQDe+0QWIkLrilWqW0LjCngQiYDPC2KZCjdooFFMdIAZAoCRISidbjRuGFLYHgPmaDIEpSCWuxFj9AGDMDWj+hMwSjChqRe62GOZIgHFEkZOWnF9p4izwna9swBbWVidA1ZXzjHUEnJsqDB1qQBVsAGZNBSsYTWXcxS9H4fZNjhKTQiCBXPwmoXRdXGSShBDbEQWeyE8lkIeEIgA+mM3dhYxDWGthxCa8iI1bnDoaxe0BChKVSbqUCNBxROvc4KyxSLTiyEDzAMnOoQTZElFMl/zre53B4ZjSMxTnBOCojYgmtwgHOojENgCCAoZCSgmdQwEf5SG7R0YvExVCT44RLCQ6UCHZJZWC4Vk7fh2eGgR8yGSE38gMFcSUdGRaD8RUNxnA/mZcTVBdTCVnuABBdBJfF1yz7UWHXN2WjgGilhZgFlhN2gWY6aSqt53ct0B+kQEDIATE9gYMaeSdosHEjklpbZ0ktQXzZoWGqFlF3KA+amI099lsRQyQliBPnAAuqsFw6M05+MyUbQhVbViq2oFj1oASZMWoSl1wQIiOYApBodGxnghUhtV7tBoKjYHf9Jiycc4zjRQFxNSnEmQP4gZFU+QSuSYhLtludAhH+d/8bUMF1pIlhqNNYWxhdv2hdrmkRroAMU+F+hmAWpPF5mPUOMeEbBZKZluZs9KlbgaAF3rdMFlJwrHAGrdED/6lzMFA1VIVrcxdpUSAcu5EfHuID2ygE7ncY4jEL7hJliMmZPdZzjXh31FZub7AGruCfElADf2VEOtFWS9opLEqfL6GPIKMMpaALKeIKzslvTiiEo/V9c4Yk0wAuigZpDGeLfldRPgeDnlWUFlpQr+ZwmWlWtiOlnWVhhQQR3eiZTIARBpOhzwmdSCJqrrhQrBM5jHEABFAZzdKA4KKmbEk/vQlnzuYKFQEs4fIMX3VZQTBmX8NCwfBxeRlzZ8mR1ET/TNbgIBFVFj7gA4sqqOQWqV0Cq05KZXXXgPAEBx1BDeuJAfMYLIdnDJ+6OBk6nrfgEqeXaTdgJ+xALK3qAwW3pwcpGrJKYLT6HRWhE5tTNX+zq8ZnrMQJHgtwDyE4hHDqQli1K+pipJR4doxxGHhnLKTnVrhnWiSSGVP6CNSwrUXAk2I6CuH6EuE6IgpFhLvVO6vyqJ2iLduiahChqLt2bO4aXZGoYh0qQbNAnRzKE8egX10wjP0aKWeQGfD0pgznm+Xoq420Q14oFMvKqhWFAzfgWLwVsS2qgeKxWtWZrVdBGgXQsfNgY5gxAK6QqBUbqk/Qc1HaWw9WrLq3qq0S/2giQaLrxVvgCGIrCQdNV53hsbN657M9QUbhujUGEJsZaLSkaoXnNJBpQQdSeouUSB500FRT2zSKl7UcmklX8QoN4LMZZV/wFrCQSLffFyn9GlKMkGohqo8OayhthJZTVqDuJQl220aHYKGv0LP7uhCNikHgCgCawYpNpXWCqmhLtqoeaKaUqRPvoYJ0O7fsZJKZorVGGG0FoHfcagE5kQWBYJKQ4g15saJU1xtLBqQe2qT1UaTbqECCwD3RlkxpED+vJjawG7CNagY60ABzcru4KAU5uw9fawwE4H7MNqoQoqoFwmyQxRlVgZPqWrPOMLfpK2BwF1LUGVt4sLv/2v8ApXAARCBfmsE3KoGxBHBwbnqWt7GkVYl/u7S+8+ADI5K6SXADe1q4Hjqt9CWUD0UK/1skYZsA/EEE1Hm/dEcKIau7MVfA9OlpWmBb9ESbF+i245GvrVC174qEgtsX+GqS//sIDVgGGaG9ixq2TEad5yuyonpgUCAhngsyznuELyA5vQMslbALgUa0xKl8fHKa90emb3U4gFsfSCoAtQsDQhAN4KtAgcoQs/C5v9lW5ea5gZtKp0NBAUChkkjFU2DF8WTBP7GGTeUMXwsQcINBaoZ+t6simTHAR9TDKoG2oEtg0jks4Wtbv/UG6VScFkOZF2edWIqwoVYKmBkFlFb/xDTivfYqF7ClEmT7cCyRkl6qYxppKvNSsfGESefWsJmsvLUlMdFaFc3bNEsLrAiQGXAjHKrsuRBKUWbsuYpcueEVrK2YwLk3gGZxbmyqGDvkCRDxH1RcA4L3S59xmDvCewXcKeX4otykF7KxFnnlAC4SsASAxgeMgXRRuKHqpk2RqL6nUMNjCosxtIp6pC4acevSukE2v9Q6GBirDy4atonaJhvwaURMtCO8WsJBHg23igZ6GkssjU0zgJwDkA8gGIP2VE1DQk5KrQiqMy5iFsbVhK6XRB1Qr97QzE0hpnQRvqtIsKLhse7Hpr2xLW6QnS9MmiPNw63zTp78ewUt/7gQ0mcyoxLduFP3Il4S+WlNWNOuGCm+RCr3/Mqi0aD3C2f0k4LvgSGaC5gSoBAckg5uuGJ+TLWxdh9maK/ONDxkIH1IYBD6M3Fa4H4vYnfg2415Oa8VIqJeTUxOIHCIIF+rShK3hqiY6A+7KaFuqtKjUJ7+W8wNTWyn2hloE0dpKi3yZWejXYQk68ufGsePHKTAWUSIys3ogq8tFDmQC1lQN6uYzR5jSQU9YIBQcUGKF51NwcwXhTc5QBRCrIjjutO98UdWCFKyZstakwu4iBvscw7uWcPOadibWSnDAggAgSrB0R7RECJOZQeVkAUKBCbUSQYQEZsl+5sEG35r5v/R2gAfKFebIyrSlGkpeiQlcC3GTk2mHMlX0N1C2+asONBZNd3KR0sdnzYglhAe8222xMlU+wwdOxMD5lgZi/IAk8cgNrGSLG2C5BoTNmgy54DRWwsfS9mGaKkX3zHhn9qo6xDN7jupcGh/vEUR1ScilgCFo8AKOtAEtz0RFrJ83z2EqpMDyLEk0DTj0UJyQuRSd6aPbKxlXlqsisiXu0mcVePLjACR8Qx62nglooDSICczut1jBg6JzyThS8nQZut2nkBCyQEWqc2ZivkaoIzQjtmclsS+IqF+jyDfeCjOjqkVa2WPcmYLliLjhJALbj2oVCDRtCjIuysXXNPGd97/GM8yqCCXRvNCMJ67FurnEuNDF8IVqxATuaIqnTaIUI3xaTeCqn/GGH/EElHzKLMuB64Y6hIiiJm3Ocb0S7/iDUPOgDS8DUn+e3QRlghNrlu2jBqTrJBQBdQBDB9zqNWSScKe2kb7YwebVb03Qc110bJtAWy9Nf3BHrEeudYQWtZeWnPgBqpCourgD2iZ6ZjC0L6mBd7BbqhttGZg7Fn1Gw63h1DxkANwEkBRHf6UXniXmdR+ewG4mY8nQEfh1lZADvfzTtQwOxJGKM1WeX4+u6C5KTZwfZeX082uV0aEE6zHwtuX0k1OebrhTFWgjv/heua9b2dCDXAw67cggPOp/3SJU6Ho6iv7Ftszz4CV8kjHKu2SErm4x24Y5IrdMQLefiveICssGsmvNnmP53EeuVBC8UoWmMhZoAG7V0PrISjjx5JUu/V0RkOhDQmCgG7XMSeDOnVtvPIHwSboHjtPrOLK8JBdKfHA8okevPbEBY06z/FLz4q9QhhnF8EGQfcT1j8p/39PqnimstQKXOltaISjkAXs3QGiABCCETPz/q5ys2zk+ZOaD6eKlKjqsaquf0ORFoyjn2VQgGJ4gO4DKXpcBc9xvwEKYQz80BdinFrJSVUGX9ig6+UgIEbbX75cjPlc3hi+LX7jxy+P5xML4Ppa4JWZU0yAcdAeuh/bTf+tcF76PL8R43/Cn172JUuVEHAOO2AAlPXmiqHKOBamJBmDUAnncV/YdbyPWSoFWYSE87OcAiBo/EqaY6ZUOy59SyiShLAxF8ok1UbVQmujhWEgyP1+V9TYIBqZAKtBTP5CHwwBgCHHAAQ+ZqSchb4rjr8uLKY/r8OlKS1EJ8RJRi+tA4+DgYEDQB8FQQGCCZS8koMVlrk5B50hgMKMAx5PDVAKgYAyo8Ymxi7FRyfJJGLjYq+2wYvDWoQ9MYHFBZKK1FVWEgNaoOe+3Y3mZwaFigIzSUhgZPZeYEp2pGGogwSbaHFPUB0BTiRMCqkEYJvTacc5WyAA9HD2TIcBAAj/nyRaVDFRuIq+NF7kSGUKlBvkoj1qGGTWAANKFthb4CBVC4IxHJQAAKsbCAEpS34YtHAix0rrsvhCM69XRnlNdLQ52amhLRMnddnINGDFwJhyrmiaUCaMgFjOaMzyGS4pUEVRsLw7hpbdiTDUKgwI8DSciHtDBDiY0PJlVjmt+GCikgCiTrt1CDWMVyltlLZo0QC7oeDGEAP5Gu4gQc3BGG1WVcQBLHPrngoAnN5ITKVCAIYYk0I+ZsnxJHhKo1azAECzpwRoboA54CDzoL+lZWq5bPNhWWdbKNSMrUR2JKO2jVLsaILLvWrbfNvNAFEArA8VHFCrJlB54CuDzicc/6TH7tjz1Q2lZbtdaLy1MiohAWV6y+e3DBKw7I0BGKqAFORWgOk9GASD6Ip9XIvoPnvK6aMII7hz7JfbcMvuFIAqEEAa8p7ZI4yaCrBhJRtcuopC+HAqwAOPnoFIP316YCCBIfz4SR3aRrxNrWGYk8CN8xA0Yx9qyFlmrwWqSg7HCqkQAQg7BPmGQ55eCeso/pRsi793QDAArgCibHFIDQuZiwwdbFRhQi5fWE+HDxSAyLlZZLRrSBPEKyKddjR6zD+1IikgABI8ZKZFQHHipDM7SNEEjj5Z+eKwbkoB8akhTSoSSAH7y06y7wY0wB4bTsoM0yzzJECaTiu14Q0JQ/8tyJWcNhBTl0NBmALGPMDBKM0kheroAErh2kYApzAV5LMB7HTOr2CFzVGTW0u9EFfCysFDNZLY+u/RJkHqNKpXnCXPg68oVYnWT1cQdxULibgpteh+KOeEcszT1y3rIKkNpDXaqHUblDANxzK5cqFVQVe2/LdCg6j7Qz6n7G1IghftqIndNbVzNFFs98nrUovVefOhTUbY1uOPK9yq2IeKnU4i8igIrgTLVD5PBBqYbDXRNQpow6PUVGPMjFnA8gjfN8AqQQxQewbYSwy30QkUiIi+d9YTbCDwjprOkxrlGUEZroBB8wgO4ctWLNfiVDWpGIRMmMaJZ7H97ARf8W7/glFt8obL0hG54F457ssDCEAEAqnRIuEh/KlZA45bugANvKqMcM/EsfkTBTn34Cnt0ZeS4GiQ2BtuBDCybNrKG/A4r13AgxvnhhUNurXGVEhrHeD0hvdqtRhrLyzivX9X82DDMJ/AeiWMHwR10KiqUTQCnH+elZRgX22bQnqCHPDLNr9dAt0lsEOEvHMivnYF0KolMdPVpk4hinCtD2CdQIEgzOaQ54QFfFZaQ94u94o7TA18PhDgterhGQd4bTqIU6BpmNO4gQ1gfhvsAI9YGCKonA9bZKvVKYDFuhLG5HViGI+5ZvhCIFqvcLkoRA2Pd8Nd5RAwM3CF1brRE0EU/wBIo5NSEA2RgZC8Rna+M4Ge0qfEJd5KPueARrE8FJEqWvGF3RPSCcQgoyUo6HxhA2NWjAMlp5DFCoOSoBqDSAHL5AdpuFiICfDlxQHwqY4EuaMreiCEGe6CWcjyo/WygIAEyDEMKAkUNVIAC9UhcpHv4QtPDoiBcXCMAoPKViWFKLHO/Mg1N7iDJkU5SlJmhicreqQr7EOO1IAjja5smLJeJEYiAnIpnUGi+nBZmkbmq4wACCDjBDC/SxLTDJObGHpMRylyeIQCt3wmhYwThHPJBw1yFENdQCDFYWrzePsbHu+SZ74R0rGc5nwTOVjCQ6gIwR8qqwlhYGjFvLRxlf9DsJNnrqlJayRwnzgyzglAsIlYZGJFJvBknAraRyRs0AZSI9A9MTSmS3ytd9sg4USV44BS/mp4gULBrsLpiP0NYYobTABJVWcBIXlJhZbQgVw+01KXkhJC1+rnMvpCgY/IZaiy+GCGGBNO0gUHX1U4CE15aFHV3cCLqkjqvypaKwtMIGvkWJD/LEPI8KzhggtLkP72Z4AC9CEt+fMSNZU1FwbizzNIxEpZPwZTZehBUBcYh+A8qVaMhpUaBJoFJe36wb1tYwICpGUehHocewZHsMVBH1kNKzaYdiYvlKoKBgZ0Ud9grEpQ2AYZb0EOiNkUGjXBC2S96Q3BtqSZijz/7WFZ5smILEh0IKipNBgX3JpioDOyvcHPEOM+lVADqA6hAFOOKtHiJs4BAFjPjOpBAYzawi++6cx58qAH9GLguRJYQw+gOI520gMX+tPdAJtH3PCKNw+dCU1OSFECl2RmBJ9UQg4qy4Ud5AEMNEjrkMKwq7bFhw26G28qTBvgHBpHGWGgmGpoorUFEaBcHoiGQyK8CIy5xDf20IRfnxGfEY+3tAAGsQJhyrJuKnhFRWSoBgpsXow2YQQy3kJPREtZ9kjAAkjtcQnHO2ACq3VF12ziIRxsRn4gBgjxraZ8Ntff4iDxw1V+JkwNPNvO+pZtf5gFYnYgZhcv7U0tQWyUhkPoYR6zGZdufjNcwnNBB9OFMBG2g+bWcA/+9vfHpU2koAPsZgn3d3fFmUAFe7u5Cu5PLmie9H8tLWiYjoG8G+7vjEataU1L4Mf9+G+gT31pbm2CvDDlC+9gvWle64XSML11sVkRQlqnz70XjNuKSjuavdja2NOuEKFzvQkVbJnX0qb2AyIAACH5BAkDAA8ALAAAAAClALoAAAT/8MlJq704652d/2D4cWRpnmiqoh8gvAAgOsZh1Eag6+Pq/8CgqgUw0A5I5GLJPCwUT4ZiukgkkLnAzSHser8sR+zmZC6SWJtawWBO3+0zNhATeMD4fBdUKyc9ZAdjWmRsBgUHCU+JVUtUSwYuA3ZcepaXGx8GZgceAEgCMQBQBgKEhQqlOlNZiIlsCghtNpJ2mLe3gEoLN6IvUC41SwADBW0MDAdQLwtSqQNaAAEFUMqPNg4CBAR3uN57R0tKDpMvmwoHAwRlC8TGyG3Lo7AuCQwIUG19ilDipdu2vglM4cGPjRrJoMXSR45AACbEDsDDlyzUFATtACyQJaViEYkK/640yQaw0sCTHRw4GSfKXjqNZtoNMPAmIgKOT1Thw2jxpjMDBAY0ardLXLYBk0yiXFrwjCd5fpBKdNZOgMuqRegESPAsAMUDpu5RVOBCIlcDk/aNVJd06UlATsXM5ClA3LMDN3mBJSDAGTs3d/Gl0sKIDdh5rCZVK2DvCS9iSJW6xdS0kwCkn84QM9AR7SctpKx2hMcGXlVrcarYSAyg42k2TOJQKYU04GQ9cJeQC9WMAU20BRAoEhYlMecqVhJduVJq1DF4Upqd7ni4NANFeqNoZtvt9hcP/tpYlI3g5RJnyKgIqouxlzStvQzcXO4oPdi6sDzfQ492JldkltUmmf93P9Dgz3EOELDJPaQoJtgSzOkgDXRo9IMEGz5FohYvobiWwyf3SAcAXwtQA0U1I0ZGIBCVRVIPLwrdpMwCzAiHBB3EZObTTTyKxVGPDIZ0UAF0xFKaajo0wAoz16GzYDKQtbUiQcI4gVYA/WSkyH8ZbURWKE6IhQyPO5b5I5ljylKfYNbx0thmGEGR4FazXSbllCWodEYNPGk0hW8CKBOdIBr1aKaPspCp6KKMpokOI828cV+kFc1kAD8cIjXAgHheoCctNLVDQGvYwbKnKBOZqSqjiS4qJqMKFIDIf1AKcJw+iiVDE4pBbdppSiu5YOtKYUUxi4sgIspqq8s26iz/mSUyBmNffkUEz4VSCKIpp51W5kKhXMkk0RMJIIvXmWkaqqiyzzYLpBQFuChdGwEM0JppZfCq4q8ThPOYRsg4hpZ86Hw7lbsIq5uwmIiKdYaXLgVDWrBRCNIrt94ZeB5YT5ZXEZb6SIRmwiSzO/KyaY55DDp0vBPuwE8UHBQ3v4KnVxvEBBCwiIUyS/LP7pp85o4q86PPR4tow9sUFu+7os2EihNDP/rwBvTVJ2e96ro+wsvlAQVIPYk+9tnpK4E2u7irbwMI+pitQmMdNMIm78c1Ov/lI5NQyayUrdkYfxPOx7BVAyAdgcYt98IKs6p4oq/AVkqgQ5XSWH93MiWO/xQDA1jtJBstLjrKjxNt6AIN5PQCXmfIDIA9z9Q2mQNSv/k6VeuNMrqrUFjh+3L8xEI31676FGK8EltImw0byXRZ4Jd8GoxhpsRyhcS7yyKkcjEx4XsSh4TZbrOv+iQIXiHh2ja9G2mbuTcG5h4nhw3IUgpepW9djSMY0h3dnoVwHJCIlip1xQwsMxnTair1AuiBQWMuIg2UnOOzrS2rEf3zyRvcwL8/tWpQB1HGuoDmoz+t51ayQIQs0iEg+NGuGYRKwE3eUApjiI48GuzHFbBwgx6ioVT9G9QNGOO4/aSrUZerHmmuEItpnS0XdikYnagQA/xhLR5iqsZBcESG7v/ppYeugIP2ynWD0CWKXQwz3nyaWArONMlJTSRGA3MRLGsIAmQLqNcAlJW/i8wQgMF4AtCUh4goaI8X0xBe/t7FJRc0QBF/m0o6LmObPMQvGLBLRNXYs8gZKhKQOsrenvJ1yEhQ413jYxAkE/A62OTOS2i5DAAsAUF7TQF2DRJKBZvlwWONwYw/Kx06EOHHx2yiZHbDB5ckBwMFPAQjcqzkdzZWFnxEanK9saCiikmLTwgvexw5Yt+MRYoA1E9rRTSkky6DP0QAyF72suRKDGEK2F2BnVcTXkjUdkVtqnFkctjILKRhD4UVsEz8OADippKc5glLmkLYxPnE8QLYVXH/l427yECL0El0/oiPjVOCke4ITNL1iBZWC4lhaFKeF4TCgSd4YY5m5KKFfDNhGHJSDEq6sGQaz4jEU9l+8KaeSJzzpyNE0/lGykz0eSaee7AS6DCoivIhTHiaKcLVhHoohqnso8lcyBn+QwsZhjNoXatCNSb3TBq5FKYkoB0Cp3IG8dQFjazCqrxIGE7ooEmCfgXqVxOViiOZsm5WLSFZhbUIZABFlkLQU45IozqQgXRRCynX1EqmRuiI01CpMqJQUzVWGcXgqH79K8PUE4DLhA4JPGkhEH4Tg7CFCBhzweg2VxiM4f1zIqMdWo8EajcM9aZ8TuiHUVNmUCDFUYn7/6EJ2yjJIsew0l6OmBZXlzXSMWw1ZaIF7kJSVpqPGg9Dfm0dzl5XJq+ui6xhSRNsacSXJ6pAoit1AQxdW0F2dTdQPX2XYAvYESAdt6/m3W7w7ggLBDN3hjJMhQAaYJoCOMB+fBmVD2RaSDkUDG7JPOIM8bGec6GsuZ5NrQahw4S+Fjg9nTWeFfDhmdCp2HRx8khDFUC72D5vBSuZRACSqzrd+RMWJWZce4MrYtPERsDhdXFfrcEh6abxoLLgSioAUMhsOYBzo9IwQYYxNoUyjZ1A3eV/TTy3f/Yvg6o9q2qjzNUUIwFnxfggUg31J7V6r17te8H7SBAsUzABEbEUp/+yFpLkAP9WgotyBFrdm1rTzHBGhBpvetLYIzgcTRSc4XF9ZxlTM7RWNNfpSd1GXCs2N4rTLr6xlLH808CiS7DioKhlrXpWLFIUKfY45gF6BVENbOJSe7pMx3i926rIx39IBe5gX01gKEdZyhgBkIigEdrt7scKkTBHM8ojn73ZNxNLMIUf6mWiM+qvPaFA5gApImdro7drd6Nzip9zHYoaGbzb3TLcrJkEx9ZXACagXX/IgCudDU/CRm4c8W79z+GGl9Yr1re0d3YPa3hGkQj2mTMu7ZgllEdT58aAZLGr0GZcKbSwqpVZ0dkwTm+3vyk2aa/3nRqfDKWa7h6aT/H/1ps9QXPUcT2DVGKymcSS6bmuzlrXgitcNSkiCVYwFsBHxnOvnkdN15HIYcYda58q01T/guEkBm0BJyRIKDBER0Ubtk3OxfvE0d46dArWB7D1cAfTgKTPueZVntf6DPgghxul8FcDBqybw2rpttCNwIeUPEciPxP12KO1dAE8zUIComMeAcpT6hnsDnbyvks+9hKm+YySE9ZU5MOAFIm5A3tqLTS4Mteb84iZz05qvfXOtPo8AjvYiZQ/PnLTW3e91hTSDbdDrqo3gVhGhpnZADZA5BtZRbsiXld1Xh1nivfblapRKCG04IpwLcIG5iT7B4PI8YD1XE1B1t3UYWWI/2KkCfEs5DQW8CmYUgY2AVY7AnU6V2nkJUhalAU3QBhZsAOFZCouIjLQpyZkx2KFNyP1AFrXZkLjkSHQNHkqp3SEIR2TlEGctiQA4FFTt3VckRc9dCki0Q9ZwhympEkbNXPd9mJ7B30X8hKaxhH3NkM4g2pw5BtIhwHHJhV0YAVwAmsMkoRRV3MxqEEO+Fj5Eh1ZAgdM000ixDIgAn1CJR3j5lloiGdTEVjlQ0PFICtJ0D4HxykyNRMqWAfZZFDU84KugoWFlz7HklzZAj5/VyGOQQtuE0NQpoUAV3QMYiWj8mAiZkI2eCTNAzieklUElR7GYl6/B00AllR8xFX5QP8Kt4MRSCAK39JDrXghichlrpQDIuOGm4YT9scwytB6OcdcTWQdayUFcgRVFfBCp/IC7zBYg2UY9vJ6v1VrPgcgHyEFmjUJmVFp/nAhyrU2jyFDjzhaseF16KAOOiNtQUcRzrBDGmIIYUZqFbASTUAoliVy6bEkbBZ+Pwh2LOM24RYo1tF1j8cYkiNdUtRL2Fh/KfYw6eBwsVYmFqJQrHhMj8UXkiFTNZB8OYOATyccPXFenhdyyKBl55Mt4QYw0rYmfQUFs6IPlqcZNsSAntVX59EGtmNjnyUWKGUrBWVyC4ByFal0plBGEuZGp1eFzSFgxzWTchYugrAg2nJXY7L/VjWoA8n1UbwAGzpwOQBAYf+4M3uohr3xBnPyWUEXdjb5KOKxdpIhia3hJjLBGaCohR9Yjwl5XHvHNN70NlZGYtISQhFIgYo0C81TA3EEMj/1dS42kyrjdiSibxWnPWrQCcI4CbcnAU4wItLlGDXyVY7Cka3hc+V1HkrpiDdTKeX4eAfUBE3gHhQ2MYbRSnKXjDCZGgflGzCyPp7HmZfGGEYDErE0CRSgJ8omHeMYcTHXRp3GMN0zEZdjR2UxMUV3EGKQXBu0F21jhL6ZlzHQGLkpmrmJmggUaoI1NCGhddnicvCEcP2CBKBDkzCiMwthJrABdO1VdJCoPQByDtpy/y/UiGTCghkaggRaBiO3EyIOVSgLWV4ayG9mKA6r6BBZGGlaeAVEghcvYS8moXChEAOW11oHY47MKAAK6nNmICbjFkf2wErjMQsrdRnboA5BQQlcFiYLkA3PFJLU41BWYTxPNmepwQnxtXUJSJPwVwcWuna28UI4cAPyYFZ0RxFX4mAxYUTnkR+hIkelMaAW0ytB0R0S0BRV8xD7cU3SlQ7GEI5okpS02XEJgZvuNaQZASaGkZY/JgGbsJxuZZPy6UwAFljhaKASJAhJkzjKdDQuJYADuCs2AF0iSA1uBUnKOZOKaaJJMwD2YIudWRUFdRNnOoyVIFkzWgb6AWs80v8leZdNHHcRqXAcmOcM62SNbFeMRNZaFKY90AQTaHFUYDelS/Z4FrN4zOUodqer4zKMpKYntREMJQZz7kYj/2aOpnGX7cB7TJIMDRIKc5Qnl+IRx5WjCWFZf6p3aCg1EHpx25QYDFkeU2CsX8oLQQFDaQBeP4Wu2vSjJ7plZHYvjjA5wgJX64muEkQUafkXMBcHXqmaCdIXCIgoJgQNZPIfQDEix+qubaOYVdcq/Ud7pJGma/hHiXMfl+oSsgQDQ6CZJlkT8+AOipaUXgQhXfGk4EU9h3AIRMKOStOudyQhgTdtfPYlGHhGJmqwf4QWZ9GM8eA8cuSv78gKEJplFeH/Eg4bTiUqtfwWIgkBMDvnWYbBPXYxXcD5AF8WMw7qoUD7QdFRrR3xJ1kkf8NRF713HYASCrEaVyJrWbAxYQlRF6KJmAzaMItgS6kFcrbqhhszKlAFj2AIFrJ5c87alaWBXvKHDl0ySZGCWzFAjCvwJutjTdNqV+GCjahKpUzwcUKaRW9wujuUt1/rBMiojQtZm61CIwwZg84oB99HDn54ZqYwtyXgcXmWLasqjKi2LlO6pq1DuVT3VY/iCkgQL+2DpGC7BEiBA8FmL1vjF1F7sXxErWegDbSXE/aSI0qLAdmnO3/CpDJRqzjRsk1wLePopszKIwlABzX4MKpLCUvA/xdi9QzBQUCE9QzAum+KEhtgoXQKUo85Yw5C0Bi2lGWP0SDvsL4x8RczeadoBlaXFWliB08y4ADooL+H9Jx0BqVuCgvWQbz9IAYUSztUxGWhYABCMC6X0RhXhyUw0r8Ga6/2ScDDAJWz9iqemIhHSkke8MEi6olzGWJBUk2kccIZuIoa8XbU+RJXMr4Y4IFYC0Pz8HJZcrCSGhOai4Fp5lk2ICuEoQZtmhQePGyIAQzshVHr2jOdFaHlETVv5wZUDA1WfAEeKBrlKQhsQA7l+Kec4MV9sxdtyCB3g0H8szFI6gFs40PyIH8FFMc89Yc+x54PccdV8K011AXFimoO1f9/g1yi9rozYYIEDXEwZruRjuvI4hu21tBnK9prISwa4cSCfsqem5Aim7OQrVUAoIxbl6rFRVvK4bicUIB/BhzAwFWqsyCgzKF2cgS2skEFcje7CebGdslHJ4JVrKsIvswL70mrw/yo9gcWUvWSP2rIZAwj6xCT6LVidzQG0kDN8cQZZLCk9AvE80cWhTKbi5ZujAl3UqUDAiDMMVwRnCQnQtEJm+saXxyuAbMMlhqTy8g00MBBEhGx8fRlj9VD2DFvQDvJqmJ25+WsnfCuqiHI7NYFUKt/UNy9JVy8FkshHzwAXfl6DWuYGAG+OWLNEYvSI9TEO3UoaHIk6qFuCfv/eHPCbntsAX/rFSTWlEqnS2Nqyqo3Lwe903YzVFcrX0Cdz0z4Og1QIcVjolYDiN38eGCSsGxwBbhbxUHgAGdhK+1hGTQxbNcpVryqw5Cw0vCLjlrbFf3DDzny0b5xkckhCDZUlodUrfMqa9akX+YhBywUAKMCw0DgcYnzMAmywXzDYhTtRYzZGl4trVdCK+GS2LN0YeYpHj4tcuu6o0MafhpYoyJKIxVLzm+nDu7oA9KhDkq60sf2rqI1qRc3rmO500QzGxqyAzMCA74yLtklHarWKLU9c6STGmc2jg7hoAkSZsVmAiAx3tlYFr9qcpC2pgmJW/jjz8KKmszhqJTk/ysgXQQ9JB5yPGBL4o17RlkzebcPChNqILHbwNkroNGjEti4mynjsnrj2s2FlsjednZU4Im7WA62ANINfrrbCYJi8d+Nh0UqhrI1yheiKthKE9VJMCLrsARDNjCCfWBCBRslGhu/JsY5xxFgM4cl+hJz9GVs/HsAzd3qQsqH15WHWb33tD560TTaENwJ53bKNojT2TRFt7BOFhMSBbjQOlrdBEZQS8TWPGwKKxgf6CzMeJqGR6KUQiNY4LCQAM8pMr4FoeWBzTF2HpZzHF4TnOJtmYajhdEQUkZM2OJn3sAkHHWdBgUxYmtS+2QnIg0WbRDTUi8ykHAqAdHckJ/aMv8c20A7A7agqzcOk1joNadWCppcT6WeHtyTBo6eXlE+USkPukzaiNkeUCIn2+AHujEqmm0EcfUJnq63CPDlepsiPU6pLQYdV4eZzY4m8aKzzJuvUPVCw0IrilviQ5UR3wSWlHzN7eAKw0kuTsGh0kDsKpflJBHjZpAgXx7Pue1Tp3wtFRHPXx2T1rRWBwEivF2nD7AIxBUarjZ19KSrmyZ/Pz2TVjIsCVtQqcBD3xIDXgq2YtAH784OwzEJqmy0B7suWWLaSPGPZWfiJyIOZS7wIFFUEcQs0tbmtXZv7m0/wNAHEiONaIAjrEgEZeTp8E7ONYqHvTepJoeUnCBVqP3/encpuTHzCHmbrQ9goX93jaRohG2gEBfX5Wl1QJ+dM03AfHIAgdVOHNoSFDR6xrYCCWPTxTujZ7pOLAk0GozHLCcSCUOGBmOdpOWh4mZk76BFBaGwqTHIt8+hBJb+DA0uNXkJGLrhBzAOE/Cq18yo7+5dimoYxeowFantSXlkL70wDdge3LANwmuFJTDvXGThf8QrtO2sD8DgCuRA9Lqx9sWB2R7gUpQTjxxyVxYDlQeLZcksuXeM0Z5HRX3KogFvX2E7CbOSNP2Lc8wY/dqTDwa2gUBq7JAh+afSBzgiaC+KP1KjG9sJJaCDg12+h3AeksOQ6jmHXiJoktQY9ZVU/9x+hBHT13gjJruaRrhGD68QoIww5xggwFndpwAgRq3qGGbBuCM7UmMgXvREU49B9h3vWMGAdiMSFccYgNiRDIICx0MqXaR0DMUiq1nwvKjdMdO4Fn3Vmm3xWgCEx9ZgYPDU7TmPoXJwAEyXIDq0uhvCr6o1FgKBshsEnUedozaBAoUrDgURgcWpqQOEjoQLg8uJBB7IVCyGg7krr8eTSJy0ExWAhA4DB5k5RKszD1ILPoAA3TY5pZyzpaqvGgsHTgOUy0YwnQSFBIMA8IKqgy2nAQBPKQeEAw0/7taBglT6660AaNraQui0VrYJfqYBIAiOgx0LegQIILegz7sfvv+w2bDFLx+tNQ4JDEBjxtGOBNfWYABQgJurhQOipHOQ4pyCHuzmwKT3BYmABqsmNaJIkZyCOBQ4pLhAMENKJ3oCmFiz9GBRLoOa+ViiKlKyTbM+fkSQAB6OUXSaPFnpyYGWhah6tAFAM9YjWa0qqfK4r1ZcLVkmnIP3o5geBw6e8nkY4KAKGYz2Tb3jSBVQoHKGsCISiaaFZJcyInaDLh0VBjFAhQmNMxaYHpc0CQgZaRXjfsEOJLuwlKDgw4kOA9KQaWQgNFmkqmm8ahRixZW3QpJWIZmWdubKpgN1gICSUJfazXtLT/uAANh6+LNYMcUoGiqCOAHgYA9gPyQ36IL/wYnh4o6EbOWgxcINHeXMCOMITAwoYChX5FDpM3VC4UsLBICiAK5oeJgkA7XGC8aWSIjDYjCoFPTjKDmEyosUNwTowq6emrkjn274cOKIS2jRZ4cFwAmgAWyI0muRRaYzSwxyZGkBgBW7owUO8Ji75pnY8usogfiKIUwgPbIcLoASG8JRSjBvseMKvaopo0flhKstAJOwGCfFcxj8JLsPSeqiOyex0CsXfXjqCL8aJCEJNyvtmMQbo84ZhJ/yhNlvUeTsqUy8R3rs5htwxEowCCGpM5Kk0VA7jS7tBAjPxro2LKKfDtwjKUsLElHhG06EcJM8FolrcczorNHGMdRY/9GihlGW0sscKORU5yaG1sIgp5icHJASMvJUtUXyZKlCgvVK1IMgGeYLblypGnW0DguObQvYrQYEKjMsvJLLHM+UfaCLGAwIg5sFTHXLNX3gMPXOJXliFFfXfJiGUP3GPfgu4cK0otUfFprMI4yyIMhAftGIQcFOPwOl31wgxAIDteiKhcYJCsjmzGBc5Ge8xq7IjzwPH3ZRv1YqoOacVM0gsB0BsiBGYwUHsHcKBy7xA5ss5LKmJm3wIigkj1SrKlebaw70aysiZBXM8hqzsheOUh0PrwkCsMyAk55YcGkpRoaJKFA04XNtuMAY2lSsG4kaL1x3/RMRNQrR+Rl+hv+wQxC0L64M4L9VRI1fAzaSI2QGW8KhqFLkmseqmCwrM7xfzciZKvO+7kmkcgv/sxaEfuhMbVQ1a9uRblLgZASl6VanildXTIEgt6Slhd8xAjZCytbFNpj1sbVlVNvDb4FBkKNmx5hMoja+OxNXNiKAczmrA8+tUsmosIioW0CmzxuixllMJyeBHlDqO+hQe/1cYCQymIyGBJSdRxxJHGs4nvmCJ7xlrSZDMGnDqd4SrBTA4RiBg1/XzMOfnO1MJA/bkHCgRJRdWCxoX0gNPIxWkO+YD33K0pcrAkCmCK1ASXRhADe4tS6hHWxnsYtZzkzYP7I17g+BqIsBKbSvoUj/KCRtGMEIZiinllDChxGS378oBIsbTDEgNClCpZJ4gohp736SOphmLAKMnlXsOmhSHvyGsoN0AYUc8ajiFbGoviIBxQU7jJYkxOiv+hlBcasL4etkZy489IwDGJBDGVAFrFDUxhKyOA4iRNBHCH4mi3TgYgZWBKGalK5SYjxGRypFICEyElKKGyGucnWCWK1hIUiyVjZSwS8FXqECMbRiKEWZt10gr5QWfKJypKeAACBSkY1q0US8B7YNwWZbPmBKCxZhPK6kDiSq0aW/2NEFKoLSmCxBQQs0IImbcOd9GpIXLpCRKmy56YzGy+ctYzZMXMyoEfTT0LDQ9arQlU8G/35cmmBk0pYI0YQtGSpkIb2ypx3VpZ8b3R/XhGWDAximYopq4uTCgE490IcznqwiAdaJRTFU4gh06mI0yniVFwAlBPhQnS1p51FsZo8VEbsAC+KghAMOlELw6JVvKoAFB7SUoXRzaDvUooKcboeFAINfSIBCEpdVKpuzG47ODsc4zYxEEO6cCd/yFA2mZgU9HpBQFR/4UlHCQXfKnKionvjFCOnihQPT06rKyjqgAhUXw8gAL+vRLnoigkuWO94e01lMvHZOX+GbUITY0UoeYuFGmNDCSAqSF3wedh9HtF5af2CCPS3kmsFSJWmaMAObpUsFLRVAZpV1Frk0y7YTgP9WKr/nFUQcaYMkHKsz9InWGnxjNxOggMrmCTCxIkYehWjIBFrqW3uVYjXyjFA8bhitC0orI5MIaUEs+9GtIdajuMgEDBqLBgO+9bE9ZEEvcoHCVnwSs+Dt3AsSINvhTqhq5e1bL0fBr7A0Fm6x0yZlrhVS6ZaWN1P7oi95iKMrbKAV1NiAbmOgTgJjETr+Uk07IOpXwHbYMrFir3xMFSuzbotAw9DAcT5HSRVxlXSnSQ1JaGM7OYi3fFVM8dKsoR4fuhOdy/0rBhusgzUgF29Q2aWBBJjGBYyiABLWw0+MhgHZ/op+N2XObPaiKf8wpK4obnKBYXAJKjULo1hLmPL/+tYDb8xmWGdWilEMfRQdHUPQ+rNACAjyAiWlF7vd0N11UNEGwQhmDQI+X50bmpevVnemgrynn0Vl3ToJOgdZQI+VUtrJQZ+ZIFxYBW1TyUKgpAEQ4dl0HaJaxd562skUbOwrEdG21gi5kFYhQrHg9hwawW4QEfOGfPww0BUGqFKWhVt9NqCCY8uAycJu6JPbtuNub7okZQxnrU9NlG94mcaCfnBCvrWQpybsRpGudWC14wZLNHAO/OqFVMlNVTZg6ENcCJ+IX1Y6K9toPDGyNjgMXYKDoHpUaj51KtAQByEkow+syULB6Xzw3wKkCnk2sMBQB4tLYtCSHd5KXpiA/10ir80xOj/g0FJEgz/8pB0GR7nwzkIjd+rL3/1ijSIhzvG/rqIeEjcuc3g+5K0+Tz0vB7eevHnyov8WQMp4cVeCeydxakjIMK5Qn93KbK5UdDkhtRVk1OMyAAe4pXcNe7krdh83jQUJAOAR2GRc26dHenIRlxZtfyWBUfQmzKX6RR6/Dry+G9M9KWx63ITADpLcc+0dl/jiZ27dfbu7mYCeTQOLFlGNzGGPl99I5te5efXIGTk2L0pJarRzbPMt57aG+MYVn4IDIc6dNPBPLjTIW9u/FPcTAMIbgIELRT989W7ts9WrLHU8NSKPggwJ0V4Qq3Tp3a7RxyvuG3K71/+e6BsEeRnM7e/L7Uedq1fnweT/cbWTURQGUhNO4zv2CyXckwskmYQkaIhN+7z7sySO8zOqsTq4w7odc6eoUA/wWIO9IroDbL+1woADaSA6OAyAIxYy8rCIuyDwe4yZCywO0JaRA7xiEAGRKhMQDMH2O4uRQAbkwAZ+CQJ8kB820YoDSjzhSy/vCzT5IZ4OuJoOEQS4mQSTGzAezKzAMCoJeYUEkhCGyIjaOAaTWMGbuiThY7xL8Y3/oJEmEK8fcK042MEs1EJB2AU5CBxdyJyiGYYwG0N8UDtnojp+C4U9sDmNWBd1yQzBsp29m6o6bChNU7enmQROWEA9oqs1aBL/WWiAYWnBUZkEmogYaXg/PkEyfFivUIO+SPQ092CBvbinBZCMvIAVlaK1BCgApcCUYkiZLQuHMTsVooIVU1ifRMBBr6ANN6DDVkyxPniKq5EQAOiKB6yA5DM/anO19lKLVvOKWEmCMHstNMuEGAjDhJuu3yEBSGxGBPSD+IsDfdGCzEkbYdGAiBHFiMkXabODqGoLliGsVtg0AsCHFmOsluo0diy6Z2Ss3ghAa9CadrghOEC/H9gtjmAChNgCJCmvGLghaUjE2RhGcVPHhOw7augmDCgFtnCLPVwE0eqXMhMg83rJv3gqLaLGqLKcHzieKsyDZQS7kkS5PuimSVIU/wtxiFcovyY5Am4IBVMBA7Z4ttLCwYCMKiEIjgRytZ/EwqDMvMAQCJ/UADaBCW5ZuUQEBqX0R98BPKCIPTEMgrzJpf6ihkfsSh4MDCh4iocQMb0xHtHoD4ucDQsAjorMSSbglgMplGkYyY1YR7sUNrzcwmLYPBcziVBQpqNMkKeAy4/TpZIxhT3Qy61szMdkx8A4B9zIiCwRMZLxITJBCTb8PKspM78Yhj5gzGQpzaD8mfbYDQE6EkcDh0vDuCg0FQM5EL0olNcaTYTUzcc8TdRMTd0gBTuhzhvcmITIjUQYuYPMTef8TrxciMBITRCxEvMklMEYT+b0zu9sT6aBzjNdGk/0NM+zkc8MYMzGdEz3tMvxDALgYY9DM4qF8M+DVInA2E8Evb3I7JakKRHx1M/2jAAAIfkECQMADwAsAAAAAKUAugAABP/wyUmrvTjrjZ33ACAI4ih8HqeubOu+sPuVYR06hl0KA3+msaBwSIyBariDUmlYOpeGaDRkIhkcxax2+zrimk5pDjkTP68hQwAQuGK58Hj2CGaaDaMa6eAYpA9jal9NC04FAW1vcouMHA5/UY8AfABRBwoJVpYJCgd+hAcCUgWWCwsJCwqnCQeHiY2wsCAOdiIiBqckk50jnKaAAgQAhQsGwgmslqpgyM1Kroqx0kUeUkw7vbzDhQYDA3VRAwQDSwDCp6aFvAYNzaiFrWqk0dP1LNVgV7jdlamFDuPq8DiQDhWAbwcMDgiQ7lcxPwcaFArg7BqbK/YybgCRb0oqYwz/4SkZccmUiEuqWGUzOaCAAlWYCh00gIlXgAIN2nFT0yMAPY0avzABdrLYOCWmVIn4FcpPDUAECNAaifCl1VACOC3zU6BrQlUmfQD4CTTWo3yVOi1kStJqgm7HHLJ6F2rYS0Bq1lRChQeA21sv3yLDhSmHDyBlZSUBtOamWnIJF4iQCMhgVqtJX/6C+K7gM1Yzr5LQGhMQWLw8epBNvOURFCqTgBEIeeBgAIKpMrXE5G7uW1GBOxfkJQClAn5WS4tK+NqbatZwqiEds6vTwwLEUIFlVRsAp7d59epF+aSZqW4CUmES4RJzgoOQmQJzvho6DNdLOrGh+1EYblPcSRHC/1XMmKfZXSG0gVZaqbTSVTuiIYRbGMGMg5h9RoBD0wIB+JFUMj34k4waNRCW3IkwoXiagH7VBGAChzSgnx+81VYcMkocNM4A9WGogXSA1JAMCf5cglVuYyynnnoqNtlkQ7xlxspH3pRUSDCT4FibON706KMF+H0kAEOovCdAA0jJ5N1dTaDIpJNwOtkVMky+R2M63UCWEI547OjllxIspoQ2dK1BkCpBFhfniQws6uSbmBSgxDt4KIqKjbjAQ1ef3ggA6I8LhiWjgTsFAJyjqKaaXCEFIGPqNluld9oll+bgnKefVgCkYQZcOiYyKeU4AkOqogppqjCykZt+ALSHKP8TdMHnx59lnWURTZdOVqNhay7aaLEKfAuuiskAIKOLHfb6i7Qn5OrBElcSW1Mo7dnonbjjpoqvisfWWdAhrf4SzI3rOjcWoO/Cm4Cp5+IYgj9tHpsvo3AiAG4C7XynRoMlPINnaj18mbBh2XpHp2TVqcjAvk6y7Ki4EvN7Vcan0HrQZQFHZqs3AGA4si1aFTDJL2OQVqzLR1uF9KJ0plQptoMpeqWf0CUs023oCMYNDzRN/DKcMSst84Ew8iVCAFGGQoDUeNDH2lSZ8rNstm3F+e3SL31r8cp858333U2ufKCjC0j6amCndIgQpSBTKwfcNxatHmh1hx34S3t/u4r/lpMaGG644rrcKN7JCU1YmW3TRtCWnTrOBeRVYUVrAXmMi2+jq+wpXEOct6Ld6OJa7KbSTGaWHJ3cqgdIwTxnhEMxeYiER3s5dI2qyzUbTziAz0DYt6PCf44Z4hzusSQhV/bAYz1JtO0XPGoarT3FKkfJb0P4Syx9q36TfiKk0WqWZt7yn7Y9xyy0GENIGnQeAfAvb+BCx6q4BwUzOOFkb6qZAXACOv89KoCXIkgpWHfARtDCYZUoyepCcKikSVAz8JDCGiwxKfk0gYbvOB4TZAS4Yq1CFUK7CW66oa7aRCVkJmSCKV6FpnLQKEXXqwlmmNCYQ30PAd8DXAwjs6od/3ICZqo6GSCgEAxyNNAbUmHE86bHhLawzjipOsUUGZNCBWQOgh2EU6O40zTN4OVc+QIWnWwUIqQcQHEWWsRUDsKGobDCVOSAIuGmSKJdYLGDgqMf4WoIQ0C4BF+Ww8wqiMYDu5hGJuNIYxwWWSXf7clUl9GXFHeirM8x4I6g0ySKsJcm5UWBhyxb0v+AOJER9Io7acpTl6LzmmYtIWqnGpwkJ8imMSxgdMLzYMvgNJcptsFo9YNUMSpVEnXlwEjm6BQcbkgQWGIHDDxAm6qWFKTqCE6bY7MborRDtF5N8nj9eFaO/OArt2lhkWBwJyb0AhP1LE1KgRBfLif2ppVdcv98x5NjYSjiplC6xSWJ+sR5bnXQ29wMDLaQSDryCUF66iUVmcSjTBcFKdx5lBVuUQMgxUbTaHljH0bywfqoIZtJEGJ6/JSm5lbFpjQobXT1exI1/4c/OH0lMDnY6TSbFK2BpINYHToMERZ5FCVixVl6PBA3HnY7icapX/MDS/iGeSKt1CwAWjUW9CiSGUnNaJlDSKA4GLI6lUhtkhNR1j15uj0YSlOUMNSexLr5FnNdbD0OXOl7qNQ6IUyllIZMyM3A+VZMaVKb/nBsijJTvKqudnBXZYxKH4vRZRGqEDAiTFPE4boL5ONV4KiSMB+1jJPEFJ+rbS1YoKTRLko0KTD/3U5gQoBWlkbJVJI6JlKOc6veUmAqCSFRS0Cztnka5hJtBRtTVQvdzODOF29CiT+G+yGi7ce6buFEbQJWs11siQfenUACweGdQ/ZAO28t7mVi+qjhSvNQrLWK8F7ontdGuKETYsMupeqLyHDDVBsyBpbu0wRzOLMY6TPR8NR63uT4T3+RRRSjEGAxh/gRN44lCAMuLN+sitJyxaunFRrUuC4AwhttoAhoQoTRJ5EzvXplr2sn2hBDEmZyqV2uKPmZA+yE7U0aM0xxzqOKsCLxHgONzRjzBEfa+hEw6n1s8RDnWCbd8sb0FCeUGrok5b2kL6R9FCmo4M/CmVJ97UIz/2NIkDMQNzfQHIsm0uYMWbAMLmZT1hvM5rvcORdkrc4ynsQOmRaB6lZarhNUorDWGamuiAT/vHSf6evQGl/zx3a2Y4w7XefJEWRhmVVtk+dMQDaNtJSKVrMafpXlrWKmUnGW5oUtLUUXP0uz0BXfXCscWVFTqtTO5pekcFPZoJrAcSUWhqTK1a3kqkh2eMvgsIVpvEzqeX6iznZ7qV3l4s52vW4S4xTGpJS1+UEFn53NGFnhDZd41LRupauUVUuaf7XBwzGWbEdZu9JOq4O7Y5b2sd4xpD10jR/CQPghj8Kq34zZweN7iF962FGA9zk4T4gHY/TCX2o/ieP8nm9u2v+I1mm7pbhO7YR+R7C2P03CHMUpLHrkC2PZCdu6N9/OngCEP+6QguetptieodQoCMMUp7KLqzS1gge0cfkU0urZj478DU2pzXrsxczZGFtpOdN73TltFefcgZc1BGzXUm6va+Fno6J/UD9ZycyhlImrDCRwWON+y9r01+dKVVztU2VtM+YIha4g4pllckUb6LnesS/+1yLUsMhRpJ1uOLxBNPEE1ToQGxKNZkuwChvEl4vj0A+3m4jCkjXUQCJECFF3pJYXXGfd8fyhBLsrBT066sIK0/slE6msz4AreCVFuVk0skJUOrYLdJ9f9RSjYA7skXlIRGxwdYx5YF057nr/pnCPH74gbfv3HknGHA7wElC3NpZnI7exOjKXQfJmJtYjEvizXVAkIkUyBRD2LIRXJtfQgJ0gW25idg1hUxR4FzIRS66GYdyRG4piDFyyGpMwMIYyUHi3YQ+RfimBYfiXdfsUQ1myIiSyQTT0H3TEX0GCNRtHff53GnyxFvwmbPRmCXiQe84xVLoCFQTQK7VhYLDCTbZhfBPSQp0WGeUmIpWkC2yACGs4bqvjfF1zSGMyfVphhOh1GiJRN7g2OGXySDXwDZhQRikHJlCxEL6hBsX3JEfCL2niBMUjRpWgW74nCghWgbWxQXPRHSixMHg1Qfw3dv8BP9MDcLjjFngR/wI9IEImkUqVRwG4QEchgGDh9jmSsRDrhUzwE4JThCjftFZ5UCaWdmGsIikatCYTwVFq9WPsZ30owQ8tBHNWwS3F51cwmEjfpTA7d3j3AxNYYVeSBwXPKF8dVh3AMBquh0Fdd0yJhShth2WR9YwOAT//NwLYsYOp8gxt0AmphIWBUgxDwxQs9FYy92N4tiQt6CKI6DAkkW25JQYbpBMy1nIj8hEhsFP5020nKFC2AVdcdUitwgSqwCX8+AAOYBSxsS7tBo12siG0B4+GJHlDQzl2sX5z4oGBgAgQyYGd4BjHSHX5dpHvmCPnwGvOhnqYcEqC2IoPgAtY4iBXkpJ01f+NWtZR+JdDMiF4sOQdRUKMKxIGjcEOaqUTtTGO7VF9DpEmHmcK7+Qhr8VVnVErIZFO43CNngCI28dk9FY8cjNVNxZayrMfLrdAhdNCfqgD5eB8dVg456GVtcFXQRaPojQh5zESKnh+MbETUzA01TgA32UUl/FVTwQ2t8A7l9aIacIXkec+MOEb8FcCV6iO8Fc0A/QOFxckobZ+HHcoflkSYRiMk3UcehCJlwCDgEWSJulrJ9FkJ1IXs/YfwUIMMNVAH3kzBeEMtpJKR/QDe5EtPzWG+lEmsUiUytiDTCJCxxCMlkYa+gURrFeXxVmS5qBkAmOMP9cN8uSJ3miBRxn/i/9FF7ViKyQAYPSwGBNRJdtxHvI0PXtGfPEoasdRiMaxb5DSjUyCNrrHWxOwDxt0E5QxGgD3F6KAb8GoY6Z4EMPJNYGxOuhRBT2SBIFIAF4GILxQMpxga4wXivlDDNwHjcejFC0RXRuSlIHigJvzEDfYZFZ3dR8KDycBfPxhIwE6LSowKN1xLnL0Hv2goOsHLxDYoEoAELMhHA1mDl5mMZkipMZZGdlnolslLnuZo832bEd2G2zGQIR0M72FC1jqmHKEB0ZiiL1EVZYoHwdxe0qKOEQ0KYewiuKAKwdIRHXQHYEGRUQUWXPRcasCI3hBFduwClmZBy9QK8GWFGNJ/xz/RotV1oOBanuag6mQEgWkkF2EIWIKSJLH4R+FF1AWlhx+Sk3upUOrsxxQt4nQ4weg2gU0ylr9IBlnoow36pzYJmLeeGn4Qm5+1B+NKgG4YA5H2lN6yHcjijwIUUa5IRM9gKdG4Cq70VB++hCE9QQ52iSSAhBmtIIVR3KDsplYQBAJghM5uSjch5FUlRzCcmRD+YQkUELI+pSyaJ85+ExfZn1NQK/1WFvHoyWkwBhGsjaJpJYJgSZfV11RCYUx91x66YzpRAtgwUilFGAUwByFmiKhQBFSeT+4mapMEBCJ2CThoQM0IWKqUZLNlRL3ZZn2uWugJCU5a1JrU0NYEf9WLvuyVLJASpF7IwBIW1pD0HkGBtsEsqh2gcoA+bojPFKSC8dPIgBpvAqIYPNrRbIlTdCU5eQUUjoErrI2dqUASwF+7GSa8EqB3DMQrSeQuuieZXurbNAVStFuW8WsbWaZy3BeYDoVyDATxlQE66mVNYEHBqFwXIqblYY7uFGooFdXDWB6G5QWhusBiHs8Hiqah0VcBCsZvZJOYPCUBQARRSBCqdhJP3q04pMKNYZ4v7B0s8Fco+YbexIFhXCFrBsAwuC6jHuBqvCtVwGn30G7RgQZr/gJ3xC1FUAr2VAaA7AV22CHgyKP0LkTwZApynl006QOnpAarBufBEuyK5b/CdOLW8xVJvD3Cek0FJDaEuDbmU3RHuM2AHxxDDm3XQ1sQ+LgvkbnIrljgGpxGAc4E7emFvfpJMwpcU6ieZUwrE5kGAUwByyBVp4wtdmDljbVwA4CFyaicQR7QzLkF57ASPWLEDnBwQB7J+/rZLMBF7RhKyacBcEaSejQDVvBkqDEfmnJHO0rb01SF6cXD7eKwcXwkdrhCR1cxWz5vlxXM+aZbplCClxzC0isDZ6RA9xAss1JCEqagm0mfERCsBesGhsyoQT3cww3k0LnYfQ3HQTQufmgNmtQHGucwyTnj+ZKhiIxFND6aU3xjCFMKKaYg3ocghVcPVLVIGG8pXB6/78q0bRjJA4i8A2L7CFaorrJyY45dwVhwBRvcWBECUBq0W5Tgh6qcQm3EAVseKTylsNZx2kyVTOiwClDYQ77WMAT8ISAPE7EEULoEwZCsTwhWMudOrsNBRMOm8nGoMO+PJTRxo2hCUaSRMsLsAckPAVRUSHO/AC/psGD5F9s2YJE86VhkCnqABDpkW9y1mUPkhPDKQwpN84tkhIwdjxhnHGRrDB6Wxy2aweoHBBEkMRURy9K4CFkHFr6LD1DxCH+QWluiUxCcx4G3TO+vBxLECNM87pB+bcoWIVTJxMOMDCoHFgIqxULfEMcTX/yQQs2JMChHIVgswAHWIsmJs+cTP+wffxBr+sZ+rkqrxh1JuqPV3BE1mgEaaYZUdALj1B3AkVuQyEfWqvBK6ZDJ+PVPspITD0/XhzERNus3TaCjhgKnVscYjAwUSF394FObMMHIdoHIaejoACOWyQSaG3Uq0IKBbI8WHEQWPCzkRqI00tVMSty/QQviOJMYBobt+HP8Rm1E0IkMmErQvnP6rc8Zh2KyDBoUXFlDkZfFYQ1TQFgtsoPUlC9l/0/mS2ojsgkNxSJ8STJ8XS5XUAlsQ0FB6Y2Ophz3PC5vLi9ztkJ+OVHF4zbjxq9mpO2LGV7/+PRGWRIyTww5KbUuVsA3iXUakMA13AFHqI22xzJ3JN90BX/tyzncxMEI3MCIUfJXTpsqwcQvRPm3XHixVmWPaLmiMxCFHWYmcGcapHAzL331QuhhYU21qHYSy8iGU0rdHFl0m3wdeYZ4Ac44MNwUQeRVxjFyGoli2NNKcDwhI4ZiTXgfNRiLfDReyMsDFcgt8THpWOdKU4wxeLEVbRcGyyx1AK+eZYG3g0WsMmVtfCIUsPJM+VgCQlyEeJ3FjuTHlRkK08XFSIU5PkzyDf0sAu6dgq9KiWpG7htnAsAEVwU18RVixXbRcG9pWbjzggxBa+oF2wwFgN602NxnVv4YV9dCX0wDr/gm3gY5FnOSJM8PNFthobUAyOgCHwByW0XJ094/5sC1Wd3nRCaAFrDvTqHkCD2Fwl54AY6IhWj++NWHRVCu4F4hmNU3ieFjakxZ5+NlLEyt+kTYCUpSmooMWlqgXe5A+JKRDTHkcw7DgauESAxnMhpMLHMLCHj1Ce9AhfuTaSP+Lf3PR/8XF/DZKRdKXN1+9YVVEfWlQl0fctNyI76dQtEceibGqFB8jzCIg5rAw5f+uHMLNR8qeGmmYPV1818tpLlqRBMLgFBlQZG82Lsod+pOqgi9HKKk0KOZAeRsEIVIuvlQBB94CFwMQAXCXT5zKVd3X7dvHQhGo3pE+eBksvXtEe+88k0zoho6X/nYTbXkAd3zbIJmwcDk0ACU//VnwCg0JUfMoujkcqFpQSUfAjNldi9YiVgptALNQMaX5zuUi7p8yXk8MItaNCoDVwCUTEOQ1P0ArIHb5SqXUNPHB4GRxZy+p0iqLOGEnGU7H4wFGAQJjM5MF2fKdmgTCHbhICaYwLrjeR/SwBeRJ4j1mDoOsM16otidXW7xAdP50CCvk58N4EIc6LUBxe+SjdB4flWCiqwkTwrkjkfWlkMiOnRZ6+icr8zQ2TeQJ+LpJe+S0R3/FxbYFYkybB6kT2Stprx0S6yxozJZmn2/Gt39RQZiVICibDvUmAFQ//2vN5L4k9Vf1sOLAfiydggz+Q0a7n131UYwLwmM5vWbzb/793G4VMi+UNUImNEaiATpRAgzDTOAWzSOmAMgTsW8jDJRVFXRTQNLumIASUTVk3RwwiOxMaUMBAERsdDuXSQBILAgqHD4HQ5Fc4ATelKI9tJYQIvghyA4AMwjHqGTI/tcGPir+0HTP6eujmXnpcBArCWQywvlZ6CtroBD4ClyYcRjwKFKZUtK02skqoVFCuUtjCbsQALuA8BALwJtwk6OTbHntbbrw0XFFG/kliPkLIWXxZG3mC31oEkSiUHBYMBg8yVAwHMK+6saW3jcBuOHWCTTduJJxAfO8eANNeAWJkJDwKAr75RPmTzVwcECMDo8ufYmAMFAiwsYOVEETXO/6BF4wBJigIcCQBEScQiRQcAvHLIMHdOhMMtthzAYRNPjR0MjYCQgfPST8mbpjzyeeHgSI0WykTZOJNgoY8fGjSCADExmqUBQEiF+oRow5YCO7wEMcRHXzk8K1e+gOfKEUkSSD04S5GgiQgeJS9iIyNjQZGBxw7qwLHHhMIfHNSoeebUGpwDK2Sw+eORhRBXVozd4EHuZIkdO1ICoBOoXNofAQhJuOm3jFcyHkmS6UGDHDeDWU7yqneVqUSnD6Sda1GrccegdwU08GKGRG83X0X8WulSFxk2M9JE7x1333Uxxd/gynsc1e8gW34EQdsBhJHcFJHXTAwc/JiNOFBNPv/tBy1y1hdsLYQSYLCdthKDiwOC7urMs9eG6mmwguYzCBRIDChgwhOyYaqw3BIDiQ1sDCAukQY3KAAKoegLwzR+BDngrUXeiK6N6jBqAiHregkkOY/uMuGIQswosRteshFAwGSMYkoADJ3aDZIDppDBqJCAO2QDjbQ5bjLvBmTtOJJuOQQuu2gMU0fk8MOOtRFyoImQfL678jGMRMvHCzcGwyc9JjZII6s0v9kGEIOEoIqoGm0M0BDMLAvTrjFNMklL1O5KkMo2tjDiIF8OgkwC7+yi5gPc8Kzkmz4/iq8qq64CB8tF0PLs0QYrNOU1t5D7Cqc+3FCxTwUKMEG0aib/C7MbjOrZqIGCYDBvMFGZWK43a+4C4ENUFzEDnqzcLC0nUjDz6wYYMEozzEd5Q+1c1rLwNY/AJpPSigQAawihaUANVVQH5KsHnr42+i0RGeCb9soblPHKhepsLK2tGReY0a4S3iIwrm3HrWcwca+YLyjZxIUjgAYa0ogGGpLE0xooMfgDDuL+JfgM8UQqmOI+uEIRLhrNCPe1AV09GN264KOhvQYBfawBIWRYaIRPPzAZz7f2VJOx3xprKwj/AlBmHHK+NQPNCnMKUB9bleuBYl1fcAPYAi0j+E3vZgpmMZLvbXZU8a7RgWUp6YwTgIa+Wy3Xr+u7lSCIxcBZYVyD/8mHiDSi2MtdURSaFyGbhTvybkqaSOAJUjYZ4E9xPukLHq0z/VlunuTqeeHCzQwGbQI5k8MVTLM0CAjL9U3okYiexpdpKDDKYov2QIRbCNS3ThxMn7f96ozpVwwKmFdpoiANEIzLbHLZvmbIoTpJFoBzaHar4iOWtOrIu2KVPrWyrgm/1TL7ti7DrUKz366DwZRhY+BpC7QWgrQREIEGTkNf55jWnh7gjmNDQdUZDtA8H9EGe607DT9uoDiT2CVttEODI/IgAJFgaRxWSYsOfrU0zbWigdCAQZCms4gDOkYUO7RgShoiwA12zXCFK1QIpUczkLwgHlxjFRYsCDjqdf9AWU2z2wzp0AKWWAMj0tIaIoiVqtoFwFeUOWKiFue61SHRBRKiyTAECL8cZSEjKQGhqj6AnhnSEA0S6Ji0sqWxCkpFIfH52jjKCAyIRY8gY5gVT0ogAUcMo025Aw4vtjAkcd0EACQjgPAa2JmYyUdDGEDWg973JCX6i1G3AuH+BFTI2e1jNW4oAAag8xK4fW9yNuTjCiZgG5J50ookCAWBrrKRUr1vSkVhiRhjMCBoesVV0HSbI2nygzYSom1FQ0TVGIkBL1Zok4SoYh6joaw9pCExkEvdmwChGvLUUh5egxTsYmm2AskBm3t0BdEy88WqoAFkx5EVqDppztx0Zhr/NUFZ7f64Q/ck5Co+mGfYDilAIozBbOKMjrGOUCBxFESHoiDFx+SjgYoIhAYITShBPqVF43Sgi7CJ4056GA/ALaNGCHGlEOujliGA5AmIAl9sulEOOGjgFWgQCCGEidCVEKGfy7TQH0UqpQ/GcyF2SEra9lfNBPbiV7boUk04JdJ/QXQFvZuCSeioM5UelKXp6UzWKnPJV2YKkHHkgMhmYlYooCmDbrOMuBYCj1+mcjryQav73qYYpc2LA72hmqWaOleoKSsmLohEW7zZEU+YwVd+mQA8YCLG0fbgSQq5oH/SMUt7BNZq75vtGDIi0zSJAKXZiOtTMTsWvKKhewvA/+AWKVgtjFAoiibAQH/K4oqNTIcCv+RBO54A0nBANK1y/IjOIrOJdPYWs816hRQHUQ0RoI44Gzhu377mq8B94YeNiIUGBJG41dRkqe4sjhe3mxVGyoINV0kgXgTi2/HqprxKU4OySlDcq45UhwSyr1QyQpkvkYc11h1AF6+6XRDJsV9RKbA8XEqIyya4WWMR7uOSc8HI/FMRAM3uIiYwoVuADRYwGfCXvAk3ZcbrdB9ow6b2wKMDq/huY2ktsmRwASGwZBvbBfE7dcuSlvA4AzDyon+p/E7FmKrB+pjAR5AsVyXjq7wf49MRllpaDhHLnVVW65SeWbXa8pXOjjFPVP94EJg6iDfNSy6vGM8LBAIdAASMJVid3UNjZXazy1aesDcyCazcvkFQgh70ktGE6T44gElG65uEQfzZT6AVVV2IFynhw1z06nbTKh1Apz9pwpcc4gTjHMLlJO1omkq41MCusWNWExMV+QRw25EWildq61vfrl1ksMnHkEbTL4N22BGesXY1NquRDelrrIhQoGkN7Twy2T9D4gqvVSvTHwy7pvKeNJj5GzdfBYUIIMAEcVfEpkeo9HzoTnckv6tofBSuUhuxqrBXDWbkroABnmgi5rC4ZkLCQT9M2+S5CW5O4NryLh8gBxE2vBDJ0JvYymN5sM1gYzUISDz24INlU/z/cZBPN4KY1KwgREsVh8vbfRAf6dXokwdIwCwXu7U5mnEO8vKaJyQiiARaqkStR0d66ImguAqm8JF5SPAFrgCwsZgkKGc7/elQXzgX6tUd6ASLuGJMeTdPLXF7W020EwrCnnQUwZb52wdgaLra185234x8ko9EL1lQW/c9d6zLv7HcGJnqZ1VNXaKWKTyCD7/i6AjikgXRAu4Y9ZcJ8T3ylOvbBiv13UcaQdPQOnM5P8/2tkepRZGAVl3q4QOY0vsPMmgEsrDkoqmn5AvjnEc60+7526PPJ7mXrIWiNQ0dgyQBU5BXARqANPa6sBHzoNDgi3U7O/Ql5qInjSU7rlLo/0df+lvm6iJwBwZ10mRHo/vgaFOP8hbxvfCQvVsaMB9hF58zhcVIu4GTv067AEhiCeJBmX8Lga/pCz0oj9WQKsnphy+AiLCihgBwIXuggTJTuDMzPAdMM/2olB1Zlbu4lGPIhjnBD9YYpxyrgBsTjKlLC3zQldcrMsd5vhXEOQsgjVp4hRZQp8mwBkWrQZPbkidEqu2JlkvwGCLbkrsIEvOIK9srwgc0CyVSFtyZOCyaAXYbg35SLTXUvc85K43apCGpFIALgmz5qzSIKxUEQ4LTDzoQBoajFroZkhf4wYKhBhRivAJpg4CohkgiAArJCZ8gQj6MviPkjJWgANSRrOZNijo5RJMiqIY3ALhEC8VFQgxQ5B5Oq0T5O0IxlIP2GTlHiME2oQmBeAV1+MG6ACAJCUDduodVZMUVtAAQsAUXYa6NCAwPIJqZWDSqiwq+wKIiS8UU/EJhdMBJdIVMXAUK2LnmawANiQwr2AKdY5r62p4UtIBrXEcmELVirAALyEQsW7MSoq7p6kaa0I9qjD92xEZRewJMtIAeEAt5jIU3MMgNYwk10EMk6UeHTKhJBAHoikd5XIWDpAB9vCMvVMeH7EiomcSmApUnGMl1sBc9RAJ+9EiVjAafcEd7uSOJRJKU7MgIAAAh+QQJAwAPACwAAAAApQC6AAAE//DJSau9OOutnfdAKIafx51oqq5su36AIAtjPc7z5+587+8gmchALBlgAKIhEBDhBjTTb0qtvhxCQ1IZmoW0W0Dz++XiZFKrej0FlbnJc8xwmNPrtNhIuYwJBgMAaWyEhR1YW3xvCwaBZQuMA0sJjAQ3cXk2f1GGnZ5uSmN0BnkHkQCUCQerAAOmrAQGC5QHqno1ZlCCnrxWoAd9AUSmjQG1dQQCoU0DBMbMzsDDpJIAq3nCYDKBR73eLg5vwMJddwCWqwcBUAWrCap/6Qd/iq0EkumtBwU0YCFMwhx8G8ghXCIiqpogVKXlXhJ4qCDNOgCF1jxX7/Y1uudgFKA7Bf+YgATY4IBAgignIEoiTQvDAcZWGUjQKKI6QMIUnuMGDOfMY+esFWgooICqdsfkhSxQ8mRKbwaV1CIljGYrZatmNRIgTKa7d5ECQFK1b0weKKZsoZP36k6Dt0sbOH1qyIMyPu+Kka2DalVOtBkzpksQ1NSCr7XUJrtDb686eEwbJGjAlEiBAnPpqkHEp0kAmjTagR5w2YDReQJSpUM6ytq7wK9lKjvcE2NsVoFqvZ1cOsBQzZvLjJuTMQSldkmQpqPxeigfIk0SX943GI8xhkzEiGb4B8CsBJczDvWNGXgbllnrBJB8LADXxIkzEqGRWAsfea9pcvEN5vaqoSEk1or/bQk0QVlZTLx1gHk8gPBcQkXFRpV/nWH1XX63XZiKYNO9U9JtQzknw0zFwQTXcOuZxCAL4dQjgEwAnJYXVxJqIcR2YGkIVi0SXTgWWP7BBxRgMypDGWue+ZbZih0kAox2acWAlC2o2DJiWkD+mKMqPZJFiY75qWOaO8d0910dgTQnGUNXBbAkkxa0aJ9VRR2zhJD9CAbkhrMsoMCP30kE1p8YYgiJAmQZUFIBA8a3FZbgAfNKKzG8CacELNlojRakxWYUeH1U2eeog/a55Zc5Bkrqnqp4uc9lxE1EKarszaSAOpvQcGkFctoYSDtUwYedey/6aKqghm3Z47Jaopoq/6pjqZffEkzt+eRPYEDBya5y+vGipDZ+qp8fWAKqpZ+Emrvsl6oKCq1qhWZE26vTXmWne4Bsy2SL6vyjFDA0gkdubIV2Ceip6io7arTqrrpmRkxAjBOZvuZraUq9PplNdSHUOtNYBgfKblbulsxswe06K/I74h5lpTKgHjUfIIBcPBC/EVMT0zRSvjaRoQb77GeXqYa858LnpqLqjqxS4x1ZTQBLyj1Q2NxLt6ERIYZUfF238J8ps0vq0NCWXHTRIDNLdLSO6tF2ReMIQMA9AgC36YB38YWtHyT6nF/a56ZNCaJiC9qsu4XHq3h+xB7DHWC4UQ0AXR1pHdp003AqSf+WYv9tOOJf/6nA6KMPrTboZZ/Mp18PvaappGw2UzPGWtNBKR3KmRXf0VmaLbTphe5mKOlE5wi2hjzy7mVslKZDR+w0W81Gi60AKENpfgnh+d+eN/zjYIqzdcCa6B6PtNpgKx1vvzFa9DzAc88OFTmAbH1VAYc57bfSah9NNtCmO92F0iGZ8h0Lac/S0XcQpTHCiYk266Ba3a5mjRh8xAy+oUnECqa483Xvcyg7HVmqZUBI8MiD3CvUONjTjq5YRXYDkB4VOhJBSWhNYJ/Z3QcL1yPCJc4x/xKfws60ndJJBGxGNN+GAtOAwzBhO+uoEpqgEMNPLGEb2RgGmpSTQi7/ocyBqFpNKLYgPplo8XfRukwDkEibDX1FaKwC1nWeBAg7DahqdRnj1qTxpNYZqmypYiC7ElW75xGPdIg8lAPfiKzwGHFZ5gNToU7ThH4ohxr1KwT1niSDjdnoRa3inQkXqC4zfsEUoktl+RKJSNHt5Yi0cWT6Poi416xJNswpkHLsIb81VO4uV8QHHuq0PwSubSLDsYbpVFm647ExgEMTpNheJZlIxmtdlGBPJV0zFD5ispdVqNyAjKGFmKwjEJI0Ff+2JA3iEE+RAiRbJE/3FYkAwyjQ7B+Q0gIrmMmjPwXaRBXVkIRz5k1SFrxOMZf4v4loTZlHNN88AbmuBfYu/zF+StQaSxfK/BAqMFp5niokwykC4A8Z0fOF5WIEHdmkSXmf01I7ZyO6PtU0n6s6n6AIt7A/3pOHfFon8nTDqCxQApPJCGeFYtSOoWxCh0tcZyosJ4tDGW6e2FSghnTKzpGp8X8ji89hYOOObFmDTOcEZw8qxx/3iAGXGN0eHGnhD8PEs6fOiuo1RTaRsfwJo/lT1EfrWUtWDXOOz6PGJtowH2B2ISZ6Ohw22fQQ4HUuYXpdWcEMI1ZWJYBQZWli4H63Pwgp9D+HsaBaXaC1uZmmNTKCauAuVFebXhVkPPXdl94YJh0asFw+As9njjc4L4FMhR3by1kbki8fdMQeL/8KCR0VKpjjKouTqPioZZOWV4YuD0OMTOIsh3bC0BYXsBycVoSGc4e0DhQcSThHLHCHmyq9xod8GqtVxHCqvFpXswQba3yERFqTyGJ04C3vEkQbXITZMiEx8s21AEbFyQFhCc140ShwxZzk8ZVCcwCc3wA8VjDxCHyI2R7J0nE41YyjuArM72RYZhrW0GiKq0UB9WjAH+rYC2XFBNhscPuj8e4VvC7WU0d7i9m55m+4xvoZvCiktTqC5h5JbUEiusCVFn5kynql6xw4erbAQRU2oYRdq4SoJ0m5o1nrVIdR8Nu5MLNuEwjBMQFkyKtqZMNfU5MivAbYnhFZtXuebWP/bJBJVjIlhbckm9cJW8U2e7ZPZIB9s4eG84fr3AGpFlZBi6DAB+TIAHzXdN2YVZky31JaXq8WEn4oTTYy7VOkyQPSXw30Yc/StZL0tQ9uUpqCFsnNGRu7iH09HK+iLtuuz8r1joS1lzYTeFAcfWNagAGofQRVJp+R5FyFK9Ln+IVm7z1B5ea2KQk3Kp231oPPjLhZN4I5Q0z2nBJZjChE4WheZPkTPrWAT5AuLj/Yu9aVM6yCTXXSOULuWxd3JG9k1fNvu0uxlBFeXXYh2CvOu4NGHBcpspiQs5PwHZi+MxT9fNIW6OZzR6QxBsTeYeK0PfWZvBLVaIWp4wQmmfHS/xVyO0Ln5o0mFIlMmKAzc3Aw2gDMN2UurXEk6N5AK1JVGfLpE8L5Nkj+Lo8eKSl7itXWabaINLmUv/ccHHkywzMwYN7cgvTkW+BmSlxxjqbU7PY5IgU62CntaHc8jBaCKaNdPwp2VOLaffwFbWa9uN+u8Ny90nMAMpzxqZtQ98gczrTjio7ma5f1Msp51TbX8z38nHCW1/5JptmEz5WZ8I/uOU0thhIJYmuADnJLjbfR9BlEs50RI0KyPc29PN6Ch4u7rY4cq5X4v9XUP9b+rMkTEu7jShtDpOiLnegOhQ1o3gCudVWn/7jPd8wqwLNwjrlJ3tEOFc2M2rZcipKSI/9opxk/JkQHtHVptAZkrCAAJfEfroF5HYAMoOQ6dSRuWEIsJMJioGIZLRF4siYaA9QIMKEUkfIfSyAS/Ad/ZPU+jOYltxICqSdbBJN7S8EorxBzGTBzjcE86ARghDcrfgI+8gd4fUMxPyEY1BKD5JENXYEUAMFF6pRgzVcdyRIug7RQjkIe7SELF8FwGKB5dTCCn7IOD5hCP+KBwHIAi9QSLuREA0YdIVdOn+c85EAeZVhOSPFfO4cYj4ZKkVJOGJIu+hVGstYEqUVFE3QBG3YUSHEVI+Y3iKI/HccyMZFxxccySVE7ULUae2EZT9ReT3Rip8IWiadpiJF7ALhkGGf/RmBADFSUbirBCjqEGh+zO2dyVGixO7V3iqFQgjR3J4fRVDlRUC1odSIHBgWXFaGYfcjEFqSAP6NTHd2FilwmDIexDQLwJudnCVyEfq4hbiXyNP/xCslCSNNwDA71PLQRKn4AEOU0DKzhheDGetsnL5ImiuKTWuH2Zhn1avlTA2U1iHXHK4SRDN+IK0OoWd9hL2zTTdsGhDe3j2OCHX6AHiSXgbJXTtQxgkI1bagGRGOnMwI4i5jmRMUnHa5xFeXHK8DnDJDnGqnWjcZ4csZIkRtmdKvRBSzhKq5yDEsBh+1jde1XfUFSikpAI8g0SjGWCqinBVNBiJnBhVvzMOqk/1/ARRNfpmKiAS5alB4syDp84xgW4Wjyck8zoRBIonetl3FsNkLXQEw4uT6v8j6usRV4RAEOsBeoR31bpTzvN2sWkRfDcF4K1y9X8miXARCGGYzhQQfugYVg8DGu42Iix398REcN6YmBopNNVRxYuA2sOBMCKB4bpIOxcT3JuJEM8VkWNwfZkxtJESIPCSLVooxsMpKeASmhCIBlZGr4wzSj4omuQk781XcnKQEztzkSgoBTuCpUCVHnKHId5S4Agg8hMQODkZRr6A88xhTJKBjtIzC3+JW4CXIoFjCwNmjvcCtN5QR9YZKh9gB1qY2rsCatEITcMykvxTQASDQtcf9quMKa/8FFGjEGByEC7DFCEAaJACBa8iEP+fNPUiEf1+OMZ4YoekAfjFALJlmI7hmQEVEcxVKeyHNq1cVZCSQf9ONwkKMOqHhFueItNtmdZHEkVWEd+HliIDeOOxKdkfhdtlcMC9AOP6qKV+EUMyE3DoAsuWF7uVYTu/OXhwYfSzUz3wIqMNIF2kIz1fihhNFlBfohLrGlEdFGZ/JpUsE2+SAJUgYplwkeN9YWkbAJREoR+PAdNeFf79IKI8litYAojMZHVFJl+BCCgqktaNCUppEXLKgnUoOeMZIsNyoVpeNmw5gbi6MjfMEes+AdBUCD7mkaSToW89mEe4caqHT/Jj1ybUQIE1NjnHsYAoRajQ04FdWjGkbhEqn1bKD4V1mpjKQQITy6Pj0Tn96RhQN1flxhGvJpG3kJgSzZX8coH3xjDwQgJJ+EA5mXWPVzcxj6GVpzS4NRmpNZdHhghpp1iTpRYwOQWlg2QUc6fPChc1/HrAEnSSKYF+RgCVMjkIlyFXCqAs9zThWIP6TQAFojI27UEv/kGR9JfGTSVF7HcdI1GekakMEnAVhoVxORJmsDKfM5hWGCLBCDL9BAqbjBme2JAmViUtVWByXBh7fpFXjxW33wgRvih9cEOxSBocmQZbKAFYFBChLHVxPBHDLlp7SmFU2Ar/J1SqOxDSer/2PnNonuwAS3yh7/5Kf2BEQiEonvkywWlxCKUgDTSrE8uwAXxDOyEFR8UhNS1ovOs5FVVlI2dKY0MJcs4JkxYLWU0AQzonemCURdpxHnQEzf9z3yFwNMAEqDmwwesAp1lD74yI116mtrxnW6FyDydVAeOKRAYFoJaAr8MAq+CneS6pn4Zzvo4JWmSFlLMBO8t7jVWJcHoK9oc55N+BKO2baFZSfcIDfcYA6B0B18hgH5kKCBwRfXYLwvS6ZSMQwnSlYGV0u0kVqVkGEewAgSdpefYl2sMqtpt1d0GhTQ1Qd3x7kNcoAG24XT2KjteB/hOmu96nQHJ2chIRboJzvXa/+MzLOb6rNEaLKG8heMriM3IcBu5EsplDK8GSAZ6zCJ3GclwShEfAmhvkpthvIqqHct1csR7+lhhwETvXZfqJFgkUmR5FQ/vssF1LAVBvADS3lWZkgYZ+W9cHR78yhGHuicz0loKEYEGxxDdamaJ6axt7sjRGs4wiI+ntm7a9Evv5IbLgwPvkqh+OC9ildGWgQsf4AjSpZg1eHD91szsnAOIvfB4aY8GaGx2BdK5qIKVRwLMELA69ANPlAmdZIYc0x8P5g586dFigkI2wGWkHYfrVu9YrwAoQo2FHHGhbWc/nvFrkcaU4OE9sApC/IDsttpX9EIuEFOw+hNfDyOEYT/dN+mNOGHC4YcQ0WKpmDTCFsnbnrRW2g4ggXFrdXQDFuQtLFwam0gxQWUFwMAc/jTYNjHZqRabal2CmEiC2EcQ7VAD6bjykU8LTDRW1Ijk2TiDEsLHfYAhi2MyVRJGo6DfrAAWTmZdgB2Eai5WwulzMnDzFTjzAmwxdS8dGEWFu1HJieDTNVgwCIAQ5YwBXbsRuSMDPE1BOtIprMmDR+Rh9Gbxg+YP6mseYQRiapYVUcZFhsLig66yPYQBrzEbgJNlRUMMMiBD405ClkZmXBwbI/3vcz6ZtzWzBQdaVqBpscSYHrBw++4NVxzrJqcLckgNwEw0to4VU8izOgCk9yc/0VAuBMfSVFjCBPhASqV8AfOPL0SEiOCUyixDKVAyHOQgQzG4ARUYwkKnAHuZwluxF8e+ZeD01MrWk6Dm5WmOIZSExJJcNVVMxUgMR6iwjRME8trxmYaUrCrKghdED8c4VxK3U1A+8HR1RrCAZQEHXxn1EFeLF2IbAmMi6Fze3Hq0yzhB5XfBbjDYNb4OgYZ1tg9sJRT+kIw1xetobD4B4XgEguEdtqWuqAcitamoA84VWcDlEuY5qA+3V4icA/ZkbiW0AxFfb4kTR3cwRBsvU8WKJNcY9C4VoJAghTTMXIOGNDB3Sm88VWUO7Qd+n+hYNeCywy/e9JiABNpXQEpm/8aThR+o6GtYeU8BQWEBDzBQENzmxgTQRHQslAVYbLXDnae84yciSd/HD0Oy7hF3AkIDYAWQLCUwpQRs/FjFiF/TNCGgFfJC809SWMn1xAIe/YAF7ss81B80yzMFOJ6pYsctUofrMA3UVPfErAc9/C2pEAJs6IRY9SYsvYcUK1tB+etWuHGLC4Q7Sok60u5obQOLdNoZpRs41Abd1EDjGIMLVA5K+wzyKtsrAsMIFA53zoRAHIP5cZ+8XeXCcJ7m1tFR2ofSrCCytu/sdHApfVPEmm5eeC7Bz0CAJHWM3d3QyPfwLc5CLsKJSAc0uaAePhz/nsU+7DX6IfVUh4WY7f/pb9sezPSfTs3f3bCGDSA1eQwBDwmBsNL0aCBFbT8EUnADlzHM0hABoeIDEH4h0smSQ/R6XiU59V8PO6hoJnu4Q4sjljcOm6FN2QAnGIA6+o2JHD+UPOJGiRriVpgBAaRKaILx2kB7JAyd+Azw54Nq1x47BIxsH3SWcyjvOJK4ivNDQPyBdGhDp6xNRfjAbXuWs8F30MhO+nhvkWQKVHhFT9WinDE5zW26SUbCMS5lqWKfLsZY7IC4YJsStqa2uaUCf4C2IY5CO6pB77iz2ZdQRnGJRQpDfwCIG81d4OLYslMqq+170LwXsC3XrQQITYcLz3jN/ZeiYda4fiSBw7A/7WtyxRObxdewGWk5iYj0NBLK2BKMHNLEPPc7BUEfNr15Cj3qRWngAYTMMYKZULk2cgB1X2huN0wn1jdYUHHapGoEp2vWgN/EORD6aqWEAdwfhiBteitGyAELn8ErIFsp0N1SluVYL4uPr1jahwgi1wO/LbKGOkwdxZ0w7Qyfwv+UEl7z9zJFAPJsNyWIBapzi+t68czD8yxTXIbB3MfE386GxROcaQ0EXKUH6/zXqAcKYIr7Zlz76osxQWSgO+tQY1z8/eM4QSFnmFLMC/zp9gwfCvARwQCKb/gRwPkUyD1RfGt2IVIPlvrk3v/92jjCG7LL0wj2LJmEJEz0/yOIP8VN6AMps/34tdHZFTCqZ7/ECBOopXOZU/hpdFgMQZBGJwnfZzjEIAgUZalTejr1pPJEIJPjtc6GAzDorFVaAUCRAPs04pGTYMBAEB6OYxRgMF5NW4JBAAV+bXx2MXJISw4PycaiyUz5AQMIjQSFBUWF4GCDKKAggocHg0XgKBEKiWqJKK4IoCXMM4SASOH0S+DntIWTtOoAbQiOoIB0yKku8ykrzWAM9m2xzydO4rENMBdgUGVI04mC60Gmr0bjKEAyb3M1UpLOB6tq6wwKy0AB3Kx1bIyVTmsUDneMKajtg0/ogL0MjiDs3c8ShY43NkDoMYxNCqUiTgS7UaAQ9L/huHxwejCLSjcciUgx4lEmFfgXjgBaSWLNTA+wrE6M+tCDWH5LFH4okXJrl5IgF3UYaCZtxruTihM4UCIDRGH9AisIEdSLVullLCh0FELgRebPpG78o2TuG8nwZowOG1WIgtSsxkJ5QPrkKZEgu1cUsBgPxPIiK44VepgjGEBadyByEjumlm4MiUoAJEclgF+YNgc17ZjGXeJx3XDBTNHknu3xHCKdWtYC2kZnDSYpDoVGjTJFC57YWqBggTWoO2YW6HAiyAXMUFJU2lBPirfRnZsQi6VVZvEW0mQM+vLnhqmhqitZEYW3F8vsXVYVMGgCxJZ9qY4UjHaDB+7pSG9/8gpeLZM5jQDviHiMisT/LCmNjBsYoI4E7CyQ44nZOKNm+qiuISVXmzxZaK4kujgjxHykk0hoyLpj4YoDMugtaYSiAIwjNxAZxvbVOQqOmu2CKcELZzwiQ0wAphOm+QOfEIDPzQz4olV6KDuMGF6qye513YpZz2+DDkAh79+wYEISg6w5kCMFMPFJX3AqG1MDozIJ83kjMDinHTmAamb0/SBQrJ8tpAAPCGAqc4XOVrIKyEqHzClsF+coiuwR3wAYrExYXRJpnLMRFIuODJFp0YzqLPkU24yoGSfjMCKxSU+40irBCMuWiUWLD4kKkntKLArjf4Ym+jJZ2zAB1QxLv9RsUcIS8kzlXW0+DHY4cQ4kFkMsDkS11T8oGMAYQ6LKy0SJpxFytgKrTJGrc477RGJGHF0CnzWssQPFUNb7AvHfJwjnFbQKW4q65ygokhqmkIFWR9d0e5CPLzJog3kRkhPVqK80GS0PWuYaL48vHwqzEg3OQLDZq2jdbQJWFCxEFC3+bdWnkpJI8lTtW0yRRWxGNLWVz0UN4V9rfi4iN30kJmx1Th+AxfhKtlgTu1+mwC5QHMTeeU2iygyMC/vlJCl4lStx4IPWCnuAjuUxGrnop6LgRLdgiEo400WwZQ7Y6uI1O6sefD021OqxtsAia3+eJrQFqiRrdLC3FYDMRb/CeJZyIZCW2KIYpDLUTwCtqUxGER74/NPQ/N36ThwtcSLg6Z2qruMGmGspANOIkPxhBn3w4PcBMXqbLTZe+Xm0oHgAeNcLwDDMKUzmkUmumfx1w2aJmig1QO8cLFqwSvB0E4zz+j6kZl1SqCBS7zUsYjIIaZS4lbdaEIpVUWleYMVyU++fBhDdr5pk9un/n+m8Ss0H0tEmlzWCmxhShO84cmabDU6PQmid0UZEnGOYJdHAQMbFLCfozaUv46BznlXakAA+meUBITieh7DXpkGJzBxuKVCvrJQxjgQvTuhDzIAmCAheuAVwnQOIE0ZT+WgRj+RaSRlTYgDvOgUBTeE/2FY1gkgVaiBLE/kC1Jc4lNjHIcEJhwIJ7FQX6HYx6r5fEkuEgGZPWDwrOEgURFJvN89APcxqNmFiiuTSi5wM5gqeGRhmEraNDLhRQ88zSc6fFMPFfKy2sSlRFrKAzY2YDUAJNKA7hITkCwhE6QNKyN+41FK/gCXUsBibFDJ1mdo4oSBZA0ekCmjuAqRozjMIzI7cZ0G+vDGTN2tk0ZaQspEqTKr5U8d1CMaZrDCsRr6ZgOMkAks7YhA3jlSBZCE17cGycudkM8uP4Da/pAZx08aMxed7JoIyVUkj3yPLjODEj5Q8hosEKCWOzNHOzKZBLKA70rglCQn5EZMMXmJHv+gpN8oGfO//aRDKgBjDKVKgK1UrTFzYpvYQSMnAG1G7GVz8tE3F5MDNiKhRgMEVWgao7qGUqF/wKoEkkopinfl5WW51M6WmjQFiEQmjAy9FhlDGrHQkaU5LMKNqubZhxfMQzNzQmdijgg4nCVxjyH0wcFstKQFQmIHNlAJAC7QBypARp9HFem3AlQEzklCEynlpcZGQsdzKjGvVNTG+froA08FFawEOWkbAWSRYr4ifWxFahkG2Jyn/ISgGRASjvql1XOWU0JNEFk7b2qVdWRlQknoU3h4YI1HTQyfsWJsW1f0UEsYNAi+0qBAQJOjPuB1YOjsmgktqMwCUQwUiaH/5/xMazXhnXYVCCRBa/dijpW+rz3MIOiuIGG1Tthht9x4KXGgUIgksGAVJWHVkS76jgspMEXSmC0iSRsFWEnOubNZZjswerwbvHAn87nTV5inETs007synaN4MTkZsNioay2iYSVZwzhE2sFGrJ2va+36j8Y5wbTVhUrjcnS0IzK0qvwAHGjuqo7h8qm6e+hDctmlx+XGIhYVXo8X2IKFW8yBWrWtZFzAZKY3bhKZR6tCOshBkiJ/YpCm4ZjrNkA0DwREoa+QsXxpTIiadK4HiqUWffTgCLRcshqVc0KZPdsMIrtsJHb0cF5oaCGExa9JjcHdKClE4Su3Nboq0iF1/4wrEfllzCd8xqRYPIycMgtopZRBYoFIkBiaqbi0iKXsaoyXCpHkeX1hsFd33iQgW/Ryw3m4IT7yUSSS/CDVOUJtKIo0lcd8sxasbNKTtOeGoj2rqFbWNCHGYhgzpIEkFtnvZG8gYgUGi143va1khtvgUBOvSQUk257+NTr4nmGtva6xJ1Togpilgc72K+1Ae0zqo+USjGAy30trVIIFXVdbxTbkdtgRB7uZBM/cfi6nN2ECAZZZsrXjZQ3Gc2o1rcknBvQJpwg07/AEmsOWBKzXYirD5vK7UJSx0ZXs8GpYjnpRkXaEmpIFgwFZthkI6xNtOcwbrUi2MVC4Alb2yf9t6G4GF+JocXDOPTwGQiIaKQ11PdBSO1HxN9KNsBgNMGi/DDDLLdq+Ob/1YwXL2Yi4X5r4zxlV1y8PwRHo4gk9W1kni9zmIEq59CaYW3WNXz0MBzkVD+bxA5qN/edgDh+fYJItlmOHwwMlDyNmEEXhSd07vNa4LT1RBtFqotNixRDWGIgdvQfd7G47ujDoyhh8J5esKO/aLqjeeEc6wDI/uJJn4LGnL4adx2TnsUPcBvP+hJqBTarVEtRoiy3sizStgDvqfc2VtcFEJaZIU3LpbYEZHP3lQUfpDiT+iw4Y7+7FyA5VC3aG4hufEJ2IqlnIkh17AOEDny9eaq4vkb7/X7HvwECOrZjxb0TEy6utAL/4j6r6jsi/ESCAj2GWDvA5v5M+ehu7gNgWMPO6prAGLEgMLTiW5OC/bfO/kDIHr1CY4siO0Rk3n9sgCmgqcJq/6ps/SpCsf3u0TPCRSKKy09NAtgJALQiJLRuB9vgCLzK3sJM+QGMjzYkW8NgckggBqYknjPABapm6/qNBxgLAcVgbOQgopbGPo9M7urqNwDC49aoF/rKjW8kTyViY7biU7ICFJ4TCKKwNckAEQMgJKJhAW+EABEyaLuGJjHEygbkhi8GJOdmCBVmRTDC9GWTD1uLAc1g7DhkSEZhAG1gTOyy445qZLjmA9TONYbGL/24Zgq+AJ81IEF4IP0Q0o6+gjCxQO+gZAbPKlGc5wLGKltTwJSYoodEgtuQoAfw7CGUhgQEijUMsxQqzwXP4gMN7AinxKVTzCRgwnkU4tdvxOXe7HcaIjNIBB7PSGyR5gWv5J8XStgwURhpTvU5AuUWIumC7g4OpBICzkIUjD/Kxu7DykkerCWu0BbLoiDOxAnAEKXHsNXNwQ9zyhlgIjS0gLoeRKE2gAtYTjnWgkFCkB4B6k31pQXAkxX9MPRzhigk4hnXAConUm2wEDanwyAL5RLlhhkRgwuQYEKpyu37MSNQbhXCIDlahn2v5myw4DZ5bpA6hQDihiSVzmFAoif+pEsVRlEnxI0erOB94iKEycAWhnJMLeAGe/I41mMAvQKAyEw4zAMdwVErjc4CPYDXMEABDQhxXg6/BAixdu0d77AJvux1NUBawxEixnK9R2EiuOAnEcgtPII22sEc0+AI6iCHJ8AfTQUgJxEDGy0sNpEnLAiyQALb7covBBINWCMzpkBenOJBaMAlwfEzIhELJLEebkLA0aAD4kAWfGsB2IoBnvCFCK5WvpDq8LM24cwfoyJFAzKQDnIEKhMMSmSYo6I6a0zbS1M2MpEkuIAcbswkYaJ61kBQzQUqjYk7tHL+Pyi4dcSySgJOJUo7kTMrtPM+IUT3lBIXebE8lA8skWECG3ERPpRwFssRAXogc/QRLQZhP+kRP+wQFAQUF+/zPkIoAACH5BAkDAA8ALAAAAAClALoAAAT/8MlJq704682f+2AYdmRpnmiqbiEgvLALzzMAgGuu7/z52bGAbUgsDmmxT2/JbJJ+L6PUiBQcq0qndrv7xGyGQMAQto3HBgF5Ha1NZQNBlkuvY7yuoQGwPhQAaGgJBy5kg4VEewNvNA52j3UOMnx9hGuDaQVkB5xpApwHaQOgnINWmntRQjIwc5CvOpJRlJeEagacAAMGqGECBLd7BLt7mwZxhp5ARQJxN7DQPg5WtGt7AAWEA9l/zYB7AZqLYaEvoXm6wKWiZMtAzc6O0fMZkma1ZtgJfwPhnWqgEiQ4FgBUGgCDDghMQ4CPkF+fzrlw9i6KPHoYZa2hVLBbNl7l/woI5Ffwmo2GQgJABKnwQDNcioBtwtSMGpx4GKPZa8drlYACBVQWaKAwqIAzYgCFy6YN10igYpIOAMaUEMo82QLsYlbzWc5HGtthO6By6T5A+/4VHEnKD7+Wm/yQAoASTZyPQgZMbdjOJjwbF79qmUbpSDhd2w408DiU7NFBmqqGulYKMlBN5QgYWPirn8FfBBr+I/ICp+AmYStyBER08RigagVaJvOxUFFesDfyadnpXuZFhT/5/BL4dI6dYvdADaV1DCamvNKIgZrUyhmWvdZoslEqKMzhyMioHAbznV5AxY2j2CnkXFTaQIAK7LRmFShU89vql7ud1PyEuYQ2yv85U/1UlBFiGJCeehxIkpQLATSg1TidlAMAUZOtYgZkpfgBYED7GSQXWUBhOFlXH50XBi4GlYFNAQsyeIdSNsRx1CpArSiRSEZZt1lCQFbmH2/3DVlVZC3p8sl2NeVYSX3hLBajjBRIcs1D16k0Tji+HHVZNhyy1GFb+X3IVkCyGbSUb2SdRx85odwnRgNEUVmPYakA4tBSk5nEyz4DVZUfmvsB+GGHA5EJ2UzMJbVWn8V8GQadB9hpgZUTAVJagmSFUZ05BgUJIploGgrkoUTeJ5JbJgalCwCcbBeHQItRV6elEoABx42vkkPdRCymNUiQYCqEaojGmnksiGA2kBD/dUxlmgCdkuaIKxF6LRJVk9xMwqKg+qVJaLinVibuocuKiRsa3sQaVI7vNmCAnboGMUSbkSnyomRDhlsqoYMK6d+y5cr3XDmg9jZUUFEBJaMZY0CY0hiORfhRY+f2a664xg7s8cdCEjsiN3PpFaxjL0ZlcQHq5XOYNyoHhUxJ7oI77KAcJ1umxrL9Nya6qOIir5awwqXkwp5G6OxpDlzzQkq9oqFHoS1Z9rO/yHIY8Kik8jbsmI4B1Js51GqSEmxf2YNYP77QcgSsm4j0rVxfp0ruxngfW27BpMAmlxhfd6PGtH4QdWU4U9rh4EN6nrGayTabyy+5PVfu7LSVZ07k/9ZdB4wZNxq2xI2TrwaQOBeYlnHjUrxMdFTfXNs9cM8mcs7JYnT2bPepOXsdsh+0Xb4PVEUracXpTmCqBuPTuRrFZVQDKWia02KYeeXJEkln7tRzbPt9kF3+pbP8kbFAAkRbAQ0frlcHiB8T8iFqWv7+hzPviuqseazC23997/m5HPwiFKuHYAIxL0DeEgjzF4apBBvtKAjsYhW7jnXMZ8iiHPbuIzwLZk1gCiEfcwyCGFx0Qy8JBAs1CuSpMqwMeJsBmc/OxTkooYFF1ojL/9y1wX59L4SQ2YdPKHYOeBwvEkdJRz8cQqDXkGx4bhEdiOp2n/pQYmP/A1oCzpcfg//RUFkcK1F+8sQJiqUiW4uog3WUFLGkvYpIhigWBkXlFvGAQX87zGKpuMhDcU0uayNJhYGW0zolDkCBKrAH45QSiKd9LntFodsGUYGjvGXxkt7TXeE0+S8pjugsVsANVKwwEBcMQy+I9AFwkiiD6bRvRLfx0CcDZ7Z77VBneMTkufi4yd59jH7QGt0ZS2JIAGhhCFNxXGFQKDoTMqVup6JkIW5Wpmr6T5M3yyXeWPVDH0JvRGXQSwAOARpUooYPe3FIGFyFDODRr5vMgVA1vWZNLO7Mfng0l7vIN8dlVWUxRQylc2IylUMukH0obGFfjhIXd8EOQPWxAtd0R8NxZaz/atksVQIU0MUOsmhc/xpJ6IACq4E045Sp5MBqvPS+YbYIfM8ak9NEUi4P3s+ihrpaP6n5LJpiME6IAmogp6OQdhyioObsAvvCMbGPROGhIuKX0xDSvZyCjZ6+qyBFf5bRUNA0f8OSYylcow/gjSUvpzTmDtinmUZxCRXQ4xG/PiTIH4HxqnrTzzNhmVd6psmLYOUP+MpIwJ6UpzNJXUHTjgGMWk0HQ9/846CcdkFT4S9VUNRrh+bG19nxdDL7u2yycgSI3JhRicA4Dh9AwwuibIdP6KJg38gYK6fMs1i4VZVDjcRZpvi2q5oEbGX+CBtM+IN4SzJltlJaAYSqQz7d//BHBi9YxKIFdWewBFOiigTLOA2vRG2BTbGKqs0/cVGsGA0fJghrys3wAxhpTMFiC+pMJll3urWVJ4AwQy6/jexI3PXu6L7rFpJlzVkL6MSq8iofyYnFOuN0zCnlIN9Q3IV+bVqELIXkX1BKFBM5rOCqRvZRAEdxH7gBXs0UtTVxhYN6XXNL9TwlTxIRKA4G9YEdPUUtUUQkR1V7IvyeqqZA8EYyq/rmt8DE36o0NG7+tWDOBMJR5ggwdoeyr1s4ZeFsqdUEDrBEGQ2wGEUMzkMEDhgZn0njBH21Y0eCzm41cTBUKIY2USQUGcSGpvMVsIvjpVuH7OxVs0UHsTl+Av8ZNFwzUcBKsuKtrkPRB68E/XXOODQwoUEC16C86Zt9EqqgO2aITHaxQgUGnQuygcD4PsEqbV2HkkwoSaCWgnFHci9vAgGSuDhZwSjmxpKBlyMJitJvdgaxB5M1qWx+z7fOfEg/TIpjCndgsZ35KPraieEYl9AgDYafi+7YZN8OGEnizXQd74akyTDrmfNp9s72+u5a1iTCdFnuqx9IZlI8cMN5RrNRNAwd065CCNfAzbDd7Td1x4XTLI73WlBMmxYn2FOyiTIkb+eHd6BBIVoZRmob9J1JmUg5o44pTR19GafkZgiOAsPFoGjnhovbq1ndGB83Yd2KB2xQEfr5fhr/fKVe1waNyAuzr8VYJFSN18xNjiFeNOSt3X60tvACtXYFsgAuZlkMQ1qnbAkFOCoGmn+u+YmwJdjqL2cAVh/GuggpCD1h1TXYy+nNg1jUHgXnGSoL+1KJ+pcmY8BcPDFsCdhVnJAfwY+mAA5r1YhSljKTJRc1iQMLyBCazZBPOUQRFt0k42hjmU1usiNhFR8f6RhTR0yLLyWL7tgJ6XYnWFUOQ4sFKxvD2WBoCCdQTRIX5nwLjSYSHLpPof50LgcyQ/YpeCVwtlnauAobGLIGznNRBGfWVtvnA8d+3yy6bFBeKdvhAz/0nQFcQCR7b9wcqSYkQW6AGIcaOvj7BG/r//AagCrM0XIMM3faQXTX0G6TIWykBjh9k1snBkP+kAa40GoCUA9dZlsmxWdSx136sii+piMuAjVRUWikkEOMZGjyAVBTl24hZnZJ1nJOMTJBRyirIiZCBBXiARBaUhMWSBe7MR9aUVJxZhlncWHEpkOfEzETc0VwZEcv4m5bxlRDASU24CRMtmA95W4+B1qlFGF/Zzc1aBLtogjsZwG44Gbi0wzjtF+TRm1jcRvNQ3epkBQNdX8sYQh8hReu0jAOFCHGECy6cxkRWIP8ZVzC419zVWztM3tIdwFhBlRidAwGglVjcjSyZVj+tQe2BlFLRWh98hpc0hNmswpldn25Mf9XK0ZEluBbXUciZjJ0ZgVhNOMLIjcAjghaxkIU8Td+XlN6BXZ7/OUxjZccMOEkVEd1YpcVr9ETfJiJjgd40BEdQHZADOUvUtVwDyJhnXEBuLAIfvQSYQQ+/DBIpMVZPfQmZoCDZhAF1ncxkRGBUJIvVViI4WVuSKJDZnUh8+FbGSSIEQM3a5NoEtA0B9B5VXMQI5ZlRdUuCQY9OpQuYtEPxPQO6peAxwaD0eFCpFVayTcoDRcdtgeF4keEIfJdTJUc65dYAxkK5MGJidcWMeQsWsFnGFU1siVNmuIZqoMMX5JqFNRrtLEu02FHRDQ9hpORodB4P9iFIjQ5QTRgwTH/gY1IARN4FPyECT81RfwAN1jIi70Gc0DQToI0lGX0jky1FO7okAdoili3j+2IHXGzWfqITSOjH7qyCxmGQhUAE860PTBGNTNpV7yYasIUHehwBJ7xJUsRii2HlkDWmKUVQSNRVvmCGyDGX5aZYPJzk0kmaOBANNzBEBBRJe7WU43hNZGnDcn3TU/xB0QFF5pADWR4CxkCgyFSLWeIGWVxFjNIeupiZyuiXShTmWPHQ7aQHWsCDMBwEcVXUvnBgH3DIQvzEp+ECm+oeN+xCueBQGoAOmbEJW8iBjZBZoGSYuk4ih2EajAEKf5HirqlRY7Bl0AVkMzZFMxGSt1BKuIw/4nPsiJQtl/auUqhsSTERjp2NAukwRqupXAuFIAApR85xCgZEkNCYCKd0yHNoYVnOJUP4H54uQ7eaHrSEy2LoGnQVh+kBgQNMRGh8WiY4YRV8AVFwCNcIkRnNjEBYYXBKETaV0ZeQkHzUyJAoWFxs6HwcBEW9gmF5xlnoirUtmSFqHJEJG3AsRcEt5FG1Ayu4AHskylTGCfEc0BglxY72iLa8SRoAWwTpBh+YAUSwlQIcQwoJA9KJxpp4gI/M2LGcgzWRUkpNltgt2cCOgwS1ROs0Aoa4ABAaJWLknarIgQA5nLZcaYUMx9pSmzdNVwpMxQqwQmZp1bFZ6fz8QLzFP92uzBGSeNmMjUajNWiVRhQSUByZ1FaWZcSC+AqofchjRmhGOgYxCAmILSPdEdEdPELoGoLZJY7B+F0sqULifc14oEUV0cWdBEGe0ENcTIhf2ECZDaH47cHNhphw8igOiJLVrRqpTZo0/pd61I8cTBy8rlJxxBD3QZRL4BkKSaU90BSKFROZgCrUeAD8KMLj1pmJZUHoQeSwKmnK6IUmHeF4WWT1hAI7sqDHepdY3SqP8dmEjVbwEodKWEVVnCt97KDc7oerNYQBecd6PN7C1GMQMWr2qcvxxYrXqlM/6oNSuII6vkZy2aXiVlHN8QSEGVhDeGvYOBjw5dImRFK/ab/EgfEZFe3ETn0HhvxOrlBa/tRpHkWhIvwARY2rZpok8JCU1pRYr9yeJs4k+nAF4jgDHHAXBWQC7OSagIgppAFKVUrFoJQDgaQYJGUWRHLIZYniXGrdB/6fYCybKuiCzbpJOPmDjCBl8VqQmGZKXJLlTo7NLNnnf02qTTWpfp5ECUoZJFULa4yucOHuBh4MzxSnOSkT10zbgVBsAzhNl2xnLEwEIvgWqBwQ6wBuR+BQ8tmDbOWYiLDrqK4GLshiQmkdNi3Pdxjk5H0D0vSetEBQnKhCyG3oip6tF+7AxmINIQlEQ9ajxPaCx93ELVSc2NnODPnEqr7vCqmGI4lQk5n/1IIUSFl4IQfRwreUCCkoQ58wQNDxjoCIQSHcCFmSrUOrH2x+WMf8YCV0WvENLk7G2ZyBBmbeWQGRroXE7lv4BIjexU1wheakbmX0qZvKBJ95wJlVh8yPLE3dEMvoG0bjCbKUQwqsRl8+rUTqG0m9ZLkIh114x21ZLw2fBIEoDbpcBIKwgOHljKdMA4w3Ask5Z95cAYCdbVyZm5Bor/eMUJ8mkCwUggzkQlhNaIL+bdNiF/SASwPcVInpcKXQlIMDBeUKwChN2oYi7FAoplKCkwlacSfM79yUHwRIRtqnGXFRRCW4WQZeaY5GMEdVxoN0aI94AA9AmTlQE7wYnRvwv+XDzfHeDY6ATcalpcbi0C/HcvIPzFHciUOEvQcIiwFQpEOc8xaoVEpPOAAi3Gv2SDIoJyqxtulLVTDefCBBQiTbooZEtImeUCQ5tAzalxBVdwRxZZ/RbC+RwEaNNCiw2DHcyszLnpUUomcMCc10pogqgM3FDxoNHEh0AwrXnsD7jfInPG6ejpiZfF31jDBHPjN24lMyjlyO1BU44CH3GsLNcQTD/KPGxEeDPcj4GVcDMOp9rwIcet+0bvPgCIowWLEfiRspEyU3+yqBn1SbpcDRbiGScJQeIpn8qdgQIlw8cdhRYE5T+lEOlhtBImHe8rH5wgm13yJSmwE0kF/PGz/rMbaAwHChIRQECqhBhDzDcQLQ2LrrLMxN9jTuGRWAJRrI3KgbSVYVn5sLJUneG60xQxVHqzmGaDgg81Bziv5FvulYbtZS3qA1TL7u9MGO5EBXs0a1gQQIA6wnCVxden3NWw4CJXnLiaREszcoKXDBsPQAKKxA9EhTkTnGT4IoXx7DwrVsHJdJBqn1b8XAIdtFYn9ARPIEdO3j/7lLNKRav75UUHZ1yOLQoh5IZ6R0CLrXmsA2nXxR6NNhxlirHgRRdNjpg6xG7/w2hdrG8sSY9LRx7BJw0dQRq1cINQAA4fRAOSsdMZaQAeoCA/itGLbJ2BATLvwJSjGxv7haUDl/w1N7AHH2XsNllF/6ppXli/rTdpVPBGrZAXW8QeaoFjeDRC99jrsUF3/+D6iLR70ZY/gUjOuYTFwcx4G1ZwWGhRzZ48HksdbJhZTc9I20q+t/M1JASMq4BZHM7wEaxX94JsQg3ghIqc6Ylp79V2d1h5yqqUPcM42ean+NI8w2Dh/GDEAoX6uE94H+A0Vtn5MRFt0TXu68Q1Dq8ME93HSyRStAhsG9H+l4QiPeHWHUMtk2oCrJimvcYT/2LFCngezcH0pwVyc/BvEvWcdBzkRbdHjhni5/SrCem57Fa9lwJJLq3Ro6V42cCwj5hE+ObzRStmMiEz9egtLaDol0DSxKf9O67Rnn8B8MHpHw0gFLE289Ah//zvGPhi3+k0Ql/AHJk4mZB7LqpIdiYCiiAEHy8CMNOLpDeI4bqJiEmgLJfpV1eFEf0gEETMV36DVOfo1zpogwUcXiU1h5v0okG3iKodDaC20/4gGDBOa3nBSLQ43MZMgU0KQtZEwtVc0NSFK09obu7FZPjEMqlgzeroPzcC/cDPd+e0Be+acCczHgxaMscIadRStV7QiB+erve0MoeSWQ7E9B1AcoE4fMqDbYdtlj4Z1o+zODUW3wKCq6AsX5kBnhMC7HE2nHu1T6EPUxckNujgWoxhi4KAUMsy9YvFa4Xk2SQEFFHlSMoEOf0H/hobqF4lg63qQcKLpzvXbbUkqaOM0k0QuAbEt5i2raQHnqMJr6b2+IpCxeOAgL29TGiuOQjaCmKHhvXau0hAxShAW3s072Wgf8AopYx3zRtE4EMCQQlxPCG8I0phVM2URWda5d8kxECF4JWqvnTFwEAg+AzhGEbMADwfv2S5yteyI791MFykPbgVWLhwZhiIr67kChYvCaOoqXrGZx+oLNcfcvAYe3gzl5DMQ25ivFwKiOqVBx3lxHrVxD1Xd+30w2ivha5gKCuQDOoLoqZlsbQYPptJ0MiRzhbiq1f1rWDnuVGz/BWs0/CZj4NkiIFZcIwauGQxBFd/B2zDg21Nr/9DVIFv1tE+LPuQFP5CkvAoQYE6S55Qyb8LHCMwIg6AwxEAAgvP0AEAQhkE1UjhWYVmnCdru5JsBBSwBgRCwHEi5oUzaE0gkhZQScMpcMolLUxz2BAAU48DxYD8cImgBjMnIMyJv51Nqccu5LROzF52kga2UmRopKIOcnUbGIqoBApCOJxuzmIEogE7Hiw8glgymjjqwBDCuLiwJAMuatbYHWAC5gwbBBrAxshCYhtaLJ5gWY1ErRVAZmhrALcdGnc1CqqLDjoNHRJ4qx56hkJkKC7xtMd/zu62DpCQA2jYAjyO6l4AGjabtDhg6dG40mpZjQpcPirao6GGG0QkVh/8c0djCg6IPJTvyPDrhUEYUG45uGMLlJUy6gwUa9OLQzkMQAvPodXRlwcy+cxVMWGinbwQJEh0fsUBxTQYJhhWd7XA2wBq4T5WqpKgEZKSXgpq+DeFBtMAnAvXE4CPDk87KL47QKJLJ5o0HhBLM3BnT0tVNEx2JDswR1ASgh4lUOEkaDkq3D0GGVA07EG64kDiOZWVRz1ALD3j6Ndlnl8RKF/AstXXDxFHeZfrMnQyIZUWfPtZekyCE7YhDGgM/3qhxyCO0KTyUWEJkhSuUTbs/qXhiQGpmUZvF4OyHYZBzS2Fr1ZJWmMIKCmHCd/GyCXVmR5uEnsHNsMdXGDVwI1r/9EgcX06WbnS0ghrzjTJEkAuPiRojzyzyEujFhHV0geGlGmLabqYPVrAADDNY4AkYL4bJMIQyMnxtGgGKIcqM/zDDogSgQhABtTta0KECFxDKoz/XNOTCmIkuQdCEdFahoIoOVumEGyBoIM0tiCwMIz1XUNLJPGWsIQqQAzm8AkgXSBBEL9geoWi/EGnkaZoTYdjrOIV0CkgD8vb5BBcJdhnAnuwEmLANB5TSsKdhNNsQlYH4qGyFK9VkAUUZA4nhCdfG+aqyqZhrSqJpuGLCgybSC4SvEls4hDFBy8qj00829aLEAJ5RY882Kt3LtZK+8KWmYOh8gkW+FlWPL6Fa/6gUIq4ydW7UGgYSUCux6jAFigsAk7EqIvFBpYt1jlXVCVh6E2DJmRKhKbESBjVVpZFwAUpZRdfzRDd1iVTTBkoWkeiYDyvkSowbngVoxRgqcmQ4aTQDEqXvtOHHtCAOgZXPFUZMDgR0zhVomlf0Um9RQNSjFQ5HX5S3ImlWyFFZNOHj151CieImEi1eTAmlL5xYoRcNXIjlGXAhlmZRKdDxZzNnzeOP0Rt+BXYTolTAgMgUDGjAnaid6ERNlLEeRBX4GkXasCTC4vJF8hK8FYOVwKhnFEN6pqdkTgIpIYQ6fuFpV0GaWy/RkhmNQeRoA6mCsGJFwiIkNXe6kBsbCP+RO+JnwCE7HZTSzmOlqSEM4uFa+jwOGYDmOMkkC3YZieOg3NX080wPj3ZZqRn1u2RwcFD8bqzxa5Ra9OIaugKWSl8RFiCAcJu7iPfpNxzVzlycjF1sFynp5g5FRD3Cbcblq2VN+xmq2SbDeoKWprnzuILbFJCuEziwCdsNhOSG4ewA4Hy7jlFo9A5VyULQ9kUVzhjqSlw4UOC0AgxuD4crShQS9a4GwedBuuPEIbjlInMobg44u9Aq3mGBnSnpfp1DExNwQBifXOEXUUrIiQSYoT64oxFVi1oDosZA+FDKG0dIl9Q65Tg+6CsxnThYHTJ4Ievow4NIDJUhgDBC/OH/q0cvAAE7SPcjgG0PEEP42msiJYi1/SsF1iGSscQ3GH1xTWKyq0JUMKUT6MCPUGgL3iACULxXQdFnJFJYCnxSHemUjhAlyJ01hBIqZQGMEKYI1a/E9xpqiIUnk5ENH0HhLCegogkUiJIg5ECBZeRJj52zj+QSkAMMJGBbJlFFeRqyF6Vt4g+nSB3GIsWXQRZEdygSA6NO+YkoSGVSyuAJJ1HBARdkhg4acqOERumzkHBqDyYzmCtAKZBqoA8ZSONl0vbXNWCZEXFYKwnu6rEQSEilDxtiJx0URIgxTMMernomKTMxt0MdqWy4GoMxODYbpoHOCiOq0F8eB7fjWC9i/9ky5JyEI7m6HYydZqEKCzzoHOJVIo/1dMsKjjKOGSiwVBMVHq14VJCCRUxGpShoIh0JycNIxgDuE4VsKpgsHa3TJEY8x3JcgMy1OVFPHIWYQ4JBFYk4D5AqfJJDcocmocByTVBLgeM6wkNxCmEshzsGWKyyvHOMZTXtGBNCrlQ8ZxK1o48yATMaYRKZyU90YHSa7jQmoNTFASmqwwHrAuYOJFYoKRl50aasILropCQqr2mCjp6hHbXySQgQiVnEVELTXNTFFXs7Kcry1qjM/A1lS4vkMZS51x6o0zQvwhG/NvCTYXSBUczYaGTd4A1OiERdKqkbnFI5My7tCoZX3f8RQUVrrL4Wy0rRMEd6wpGkn7E2mSgxCU4ytJLXccNVxxulA5hSg/chippuIik7QSkFX+mNgQ8sHEHI2dW/XqFQ+XFKjegGF1ZkiY7D8wltsCMV206oT11BD5oYW1672QQpJltRLcfIIonJ4A8pbaPSeGAyEUXlNvwR0OQwmQcjXgEopnFibQPMhm6AsKs0aee5zMUBE9pUL1Nh3nrASGHdnpFIhHFPibDQmiL2thWfMd2ZRtRM7nJ0wA/SrkR8tYtTmWqTgATKUUqxsY2R9m9KgZuYtlRBEHipmtUZK9k+sxM6WMiNNTgxrJa8GKfQ7WY7pW51zpJE4Y6vej0kUY7/d6gmYCZNB9sTc9K+9OGZCWjOZ2oaHpNMVO9+4wjQOSCuajaWumClsA5pUV/8KkXJRAVFg74wbD5ctkFdTC4MTuIQlFCJR6s10n/zhYj/ZudUP49TxDzJXJCygxErKhpOHWApMeWfFyGzNUy19fYE/cU1D7XND/OuFD7Z2BlIsizwM0umlUk3f0bswk4VdoUzlJw3zi1KtAnyQeBqBqcoLz1eyoJGY23bQxxlH3kR9Yv23UlR2IofdVhU77jntYjJ7krFhkaH6easA6F6DstcTlqc6+ok3du21VYTKxTRnxJwEIlT5tDikNmHsdmMe5Zll5jqm5e83Ii1Dyeb0HRT/0WBiHnNGg9wpMGLpxJx6wYidzcg+dGg6sASBQE0o3AIsiWBvAnEMkOY9koB7itpNK3ThuKs36VimqRN6uJRR8Ui7oRDBVvciOLDrlthLQy+qeoXih4udpHzqxZP2lzXIyR6EFZTX1YdY6iJyTtlrbD+MMgq1GRrlAFxNAOXt+RLGna9GQ6Nmpjv95u1CnBGMmWKALsBT0XN1rFEYMyh1kXfpF0CQjazEGNxZIH5mVcBMDxDJPM853uk/76AIQ6oX8OYKOrzS7p1APzSZKimJkt+atnXbeg4yYuXqLbzzUP6EDE4R0gNWzKBs1MENE0+Kyf+BSHnokgIInwxS85+gv/r4wL7huHhtpt9WaPXMN/paQxsVHwOoKlAqpuJyxnpkKhb2Sop66WLYYWQoxFKyoatw796cgDgOIKLkgAKeA4OIDrFI4vk4ynS2YZkKjojupaJQj8SVAsY2x4TEZb7o8DIssCAUSIHfAke6hDqcL4VWr59qo7yszN/iJIE47cqiJ7PCBPsk8GNgwS744CKOIRrApLRsxv9IgNl+yGy26kF9J/ZY4UoyKBwGokYZMImHDQ7iAEtWAWHQ5tb4QP4QawrOjwr0qzyugvBuz2/OAcHPLJs0Dwz1D5IkAOwsCBQQhq0ubacARLyIanxYyUpawnkA7EfY4kFULnbWZdgyrj/QJy2avs7A9CCklCLfFgR6hidJ6mA1VtA5gOxVJMotGMJtTmCYWAFk6GiyOG9TnSzKUgM3Mq2g8AN2Qo51LudKDMYOCq8fpgb6tOLfXPGfIghrdPFXaS2RWAOdGkVICgnJAmLZkki6lo/8mgfLZw6VyyG9CmFniqcxXg1aqxGaisERKGs7TMsC/qiTVOJDjrGFATHD+EauqKYOekMwngjzHNHeKRAC+wBi6idrlqCnvqT+SsXuPgxlbCh3xqXCoCUzJiYZOGKixItIxyOb0lIGfzEpgiAPgQLJlAbY4GIKtopv8gUBGuVI/irhkumBZpHZfCqCTTJ7PvEuPmkkdjG/6AaHH7LDWKoEQtwmpQIlsUqmWQBvGOxAT3wSUAEyqC8xnu4A3h4BKvYiSFpJIasQUMQkSmolJj0xRh5jWiiouH4Sa08yZC6CBA6kgKpLxeokFrrmEwABd1AERirIsj4xcqgkcQgyXecS0gLKYakRbWRir6AN22TsEHxv3MYo4xkjoBRhMlCjfwYjsVkTFlbSCfcAjAoBzbRjyeogcjTru8ro78IgrrcRi7YnbgcTdLcOAusj8mATDZUw76Yk0LBvPQJC2OIHKawSk9gDLncTZN0gN58TC/CgEuMhTcokJv8ru2LD6Ncu9tcE4sYjqyETq2UTiOIBtN6GcFzjkUBI4DJzIF6NKwQs6S4LEnzzM/O8Uz1PIb2tDt3Yk/EHDuQeCzy1E39ZELpdJXTlJyCkRlOWUFV+wbnNJ4EvVDOWdAkuUBIABPYAJ2JYYb7RFAMBUoNTZLgYIRvKITe+IG4VAMSLVHolE7vctG43FCte7XRkE4Z7VH8o1EgBVIfta0IAAAh+QQJAwAPACwAAAAApQC6AAAE//DJSau9OOvNqftgJ45kaZ5oCToAILxCC8/ymt54rp+fO7yuWUwWiwV8tFZox2w6RT3gD9iqVo+AAJYICyY/z7BY9xkOrQCDumA4GALqtiHd2gKFQgB4zO9nykVWcAZscWsHAQJrCXODcnNoXnh6fpV9LFSQao4HBS2eaYgDBgkFbmmMagduim6JU1N5e5a0OQ5UdHWndGwuBWy9AwG7A2mGc6O/bsVBsbK10CaYLZBWinMCBQFsR6aE2gKrvwDF1a8EcJ3kAG7YeAI/lNHzf4J0itRqPgC/DUcNDQowcrFq1ypDAQYQiIGMQKiD5N4BcUCvogQWWdD0IrQJzj9xif+2bUOGKIsAdNq2HVjXjpzDKm1WGqHyIh5Fi7UwooGhbQCzNKDKmdLSr8EbAKVKiVy6L52BF2+AqIEHsUjNiTgr6Yx0ZMuaN1i2CST6qxfSst/isBKmpSa7qgpHHZzixWbWMRixQD2S7UhULVniCAgQ0A2wNVkSiCNUUHA2gZ5+qJxLQJgceFzgDbl5l8lWGML2ZSwCx1jIBgeMFmoZ2NTiTvpivjGljdqyclV8Tn0nrzOOW1VqxsudLY0WjoNcAK29hRrtrn4hGlP8jfZThfw8wVsYJ0izGJx98ziDhu8Rn0SPD9JiHhgcYI2ruzYUuCDsQwbihsq/cH9EeD5tJp7/NOUphwY2RHXEF0PawMbGfYx1gtZBtKHFmECCOcTNeUP8oM9wXfQ24AZbKZcIFdEl9AshzTnVjmxldSKjMjRKaGMhh6jD0FrlYMNOfs5gJuKIFwBHBHp8CfKXaiHNptZ89sVYFm2LwXfjihx9Qoorkp0SF26g2UVkkUNs0dV1WagX0RGISDlldbAdFJM3BblWpzhTYpndAamME9hTBAR6jSQ/jVlBieadORhY5Tk4UoUSKiOOfXW6Bp8qUVpoiECl/JKkGgpxh8wMPqVh6EXMYGZmFitV00UcU0aaJ42QUmpnhFVGKcdBbQIUaUQB5mMVOXQZ6kCqAR5lBIvKCrUa/0dt2BkjnjLKFpMb9kVLaVqy5olaIaH+qBc/Rw5BpJHbDQYYTFGV6siK1L4oZ4TTUlqlWnV+M+mdMxbQQCkNgRkXKzTEMOCxMgSb5lGePqXIMMCsuJqkqswpqZ2GSWqvjfZGe8w3hIkyyhtTBYqKTD8M55sDLwWxrjF1+NOwfNFezHGkd158ra0ba9zvjXhaoQ+AGbFTAGiDDUkPwsHVkSZgSJIsFrQS4/lchavJiDOcGnuzc7bPSjz1Yi5lA5a17DWIE8JEE8FeNaF4Y6nWF8aqtbRf2zp3jZnanfOlIK/rUVewFf1LeNAYGahDZpa2j5ObpBQxfPVuvApAACn2b/8CimUL44X7Vmrpm6mhVR/D7mkBUAGIW3JLaQEK3m6pHEkZZXyWF7Q6xqilhnnmnOduL98eX+yrp+SM1F1AZSXwb+uXPGxFbXPo48OFcBpi2N379i7895gHf7fP/PLcDoQqWf8YiwBkDo1xLzAXXVQv+DWb8g96jev3/OcOfOeikxDoMpaj1BhmNr2ABymY149h0MIBcDjJABCRtnEAiGrWwZjXKOUrfmGsfz3zl/hmxLGL3SoOitGGPvhSDN+lZxsNgN4TWDAHQa2oG90xWjum9p5CUCl3EkPIcT62M84Z0Vabq5QSP5ivfhjmRIqImHxkJkPP0CEuagjIbEoBm/f/cGSJcbLdYeKAhQKCkE9HzNS/lli8ieVLi8gQxpS6oY06sqEP+IiL8hiRCBytwT1fdASm5pVDoJzxe2nEUxK/NzpMGYVYbwEJP4zSQ9bh5UOE8SMkIuYgOFkNUlg6iiH7x0ThGRGA/QBgY+a2Lx9W41q1MQJ7xGLJGXokTUHUzmDyVDu0VM6PymFlnLR2u0OicYQiTGHPcFWh2WRrQZnsir/u6IRbaKI2q5vdH0PpSze9yAX7k5YGi2nMY3YulUocHrbyJ0V3lCUg7MFcFVHgAFBN0JXY0A0BaVXCxSiLH3oLILwsV0pTLuCcIszXnMD2oBmJshUZq037BNKEegLK/yEU+lAy2qSK53DtINDM2CfZOE5iGjORyXxNG6kFDKUY4F/d9EcdlLEDFqwkHm3gYj75IR+RpAVvgIFotWBps25Nq6Txyt1BKyU+pGpQIBnroArJmLZ5jqCeniAK81YRkewMQz5UitDQoMIrk+LsZvy8GVr7h0xO3Sd0Z11FCrWxO7NMhRlW7YBFjfEGgEQrEXui5dUqJh0GrcIjJLOaAC0lG1lNCleNNWtB0viLps6JmZJyHjemqT2u0iWvGwgHOT75LchJ6FEPuqw7oNWJMvqlm+fL2iEmFyN9bc+UTXVr+azkCoHAc47UKEVXB3MDi2JHs1t866ykVSciQCsmkf+oGcWk6zVvqKRq0/Kk5SgL1VyJDkqabe15FuKlz6aAXCbjUxfr2g5a4aiLEfmKD285096ytmodbehsfdjektqJsmuUk1kXyrlCJo2rAAICPUFVmZgophuFgVXttnkKGGAqcv3SROg6+sdtrnSgPpwVXJEZYDBmtBN8PM9XgcJCzYDWAsWpTCS9lB0ppYNOL7IwwzwSqSyN0kI3bMONpThHj4FMYsSTa/AIIb5BJvk5UAHZj4iVshd7YDfpAAlmTPimGI2LZM/ycSSokaC0VOy5WCqL0d71065ZKnjNS+EgKUQjMsJqI/TzyQ+sLIE1EyLAo1IGAiNapxMBlGRnfuj/TmDWWm5+paM95LCE8Xlb++RWle2dV3vBOrQ2+EDPfLaoU/yFmjXROdMXe8U1Dnuc7MBt0Xf24hoibWdEfGUQDfPj9jSIyjX+MEd7q+1RFFKSLw2ABOyIwe3QVKM783e1k3vtXztEg1kzC0f4JONQZg2UTSDnK2W9Fpxf2rk57yp/cNRLDEzhElBDoQ2BQqM44ltnQT8J2toDRRass4nAkMPOU01sxbwoFoKb+dHydeVkEYppjDHmGwVe0AoT0IJAlQoKK2mwetditOVqLI7DoKAhvV3nA+4izYKkGpg7/FxC8HVT5KNUU0t8M66tjixZ6sR24pJXiwLB0hqW1X6H/4IZ1ZIlbc2hw1Fuje1jbPo9CVKP/RBdOc+hmDqkQOgwHcQGLapOvC9tt0967goYeq96OEOyfjXDSUj0MD1jlsGtST7rpeA56o4WImMvTCXqVFbAi70tF+l6Q8JcxycL4QBfI0Vzj+OXWNDiYWvq+OoDlaXgIvGU5reKH5V8NZSwagnhcAZnUp/apKowymwomSAq71kDe+0uOic1OU9CsrVUoyCuJUqeKuxwJGS5krdUT7c72wrRgJeUAtp7TiViig0A2/eKwpFPd/8h41kHyTQPa9T5sH0xgIk8rJomtF5aSLKiW2T/GkHE1spVgGu07WUd9FvTCfkklSnGH+76Fv/qZKEw80E6wTAyEkZyJqUzldYzMrdx/lRZmNYz0VESwDZQrYV1C4UnjOF3KcEXXlIZlXF9+SFUolBj1QIhCNZC2GI+IGRkzgYY4ScSBNBvm1A/3eFyuHY23XYcEJJTFVhu6XMtqYcjwTEA7AYgY4cBbXASD6EOxUAxi5VamBFQwhd6vvQI7PcuoIAcUaQFfHJ0uAQK3gAE4XdhDxErnNNS6ZQ1tMF6ykEyjJBgAwA9xoWCfOIwIVdbvARJkHNwBQh6t9QVgQF8Acg9hUAYADNrvXM27Id2qUUWebJkhNE7rDQhrcUQ3FZemFEkrGCInbMOe/NTchARlPNEhIQQ3mH/BvUDfCv3MRlGS8wDFq+4KRUmVq2BQDkVOeVWJdg2NVjyNnGkGZq4Td+SPK1UXUxoGaPjFT42NY1gIDQ4ErmQdEMUMSLRPgoiFiJ3g2WySay2TOVmZlDycNs0REDiYhbAWo8VP6MzK2/YhGHmKURRLcvxIgtiGupWfuvhFz4FHbOkJbMUj+4wU7FSiClkiA4SLxRTe2V0eEfoAafQMS0kN0gmGx4SZE8iOIc1DmUETpEgFYjWEVKjbSnRAqyHeRVDJ42AhUv3fslFJWLUgOwRBGwAhwBwKDeVU504GN91kMgQSYwCbN7WGAtSKspRbWCxFB+DWNgjfTE5REO0bLT0/za0AYlyhm2LBTEbwkKkQCyZ6JD/ti2TMSv6ch1Y2VpXYG9otwtc6QKVUXTrcZSzIjPHkJXQqDrcsD8C9G0tdwALoA4wVTei4zH3qAaMoBDmOAGEsG6q1FEqlSfrgJWNGBaC+QnN0B/b0WBCtG9L8Y+h5BQueJSqKGieMz+4JlfMYYHWsWvThEPrkQAJkX9xOAGi9lKYky0bZiNkGWtClDYgFRRteZkaQlXpQXcbspqPIoP91jAQIQdT9R7GEB8sEgDKpF+0BU/7Rkbl1ZAP4ADn0wkBkTl0E1EPR4PwmHKilGVa2CGL0yNENAc+M0e9eHlwpzpZZiV3+ZRCCFVvsP+YFmMj8DQYqvcGmBibEiBkO+Mp3lMQvDgXOrSBfyIHZuINQdAQghJFu5kRu4l08NgPIHkUOmgxlHdvf/J3/9AnFLJOcKBF/3c/npUyNVmgRzMMAJSWP7RO4yAMhfZqg3BYE5ouLlGh1yBKXOAdMhAcDPEvVLdJ1ZBaeXIcOKKPhkAd2/CNz/Io35Ie4OBpAaJ/BfoUkaQY4DQ+N3Z/17B3PmIEMUINANCWofKb3ZYwMzALF2ENwgAQHqFCT9MNvWk135aPi/BgpPAIOFYjm6UeDLEPXGpcIadeLXA7csMYgKVyLzJWhiUKbLo4bTiDmgEP8zQNMUNJoZgNJQFVemr/OqURG4ypDnVwY7rIS4MDKvCTMgJAEdyZH+IGCoPHnFLyb6H0cg/nBaGwpgCyOK/iDnHKAT0QD9EEfFEXMvnli94GhKYonVQIStqCnMqGqLO6nTc5WZDwN1UjEwfkOGlSH1wFE//2mi8RZUhwcSPQl57oDwIaFeLiL3dylPlFVYEBMAaZX1xXHf1WpIiAGeDBrQTBkorQfCyyIqWgbNlSpERgDKG0bvxxDQnRYgpGAtwpE5k0cK0Ai6xVScCQD5uiFPxQlUQ2RtaQEWsBAxRhg6SGGolQhySkcjHQKQOXQBGLKQnxo8yQZ7CwrSrQsJO0WWDBRzDhWB1qZ/jSktiT/0E91gs8dh3m+Ai6M7DUgQjd9xSfJ2ktJwk9GSrFUAR6dhV8RgEuFwOqRxhtARF6yix1gGhjqApnOKV6I46dJLU45HofUDuU0gJ9+ajwAk9EeBiOMI1pIXfKERddILYSdLYVUBInGzhvYYtPlHLvAldd8Ypys07F84+JoFGculdfw4XU8lMVhj5x9yeNUQSCYiD6IWM44HI/IFzIwWqyd5cTgpaKqBxra7UneUPUA06jMrqgQkRxkz8eg7Rz5QpFegfDsQnCQDQzYDJrqjQqwAbY8VeJtbmgNDNLt6qscgrSKaG6el+qoKYws6UfIBN4OU6+9EjS2URvaaREyg8Jgf8PmmGY6AG5FsCEstQwFKe2xROtq/qREpYYJcdL1rJ0oRsZxRCH3OkLtblVeQlzIdEnCDeXxxAYSogyYisoOtAGpZIKquqaLdA5jjNEgegIZCa5qVA3pNOFaXIHw/AfcfgjL2UKzONrjucPOvmkkpkciwcJiMcCsCBjC+G/53hTX+UIAsCvXPSW+ngmL2cKwhUAfcmIF9i6SFE9zgkL9dSdhaZ1aicKgSo1Hbm6PkAAtwAD1uvGTBy5B1A/fER0lPQjkwov7JSC19IV5xRyHtNfgDUQkdNVcYiOrcunfuQpCcsszTEsEewCgMVz1evGCjHHh3I0g8EIp0UuR4CzRGT/xR5qINdDjix3ZjeLEKLgsi63hCXBJ3OTe0+RKZPannEwChd0ycdCoLbQFkgxP+1TBfxqPdWjprERt2bBRxhYo7DRyfczDPnrAliVGFoTyhcsHwP7SebZu4xiFMoGCdvRy5rsActsJ4kwEMFcGjE5Zq9ERi9QKQ9nNQ/2f0d3U0UAQd/6fqFchQoZDpPaauTXAspqNvGMGLrRYDvAIgCqgy4gXGdhbxsBTncghvfADoi1adUBR5oHCjcVBHv1pacwV/BCS1ExM+xcLkYJC6ERB5VxNOywA5X4VTERupAQw6yFt4kWLZQcw+lQlm4iRazSsy9QzZNRz8rEdZTnC/To/86+SjBGmCqBkgDw0AAyjQw0rSO5gMJFg5wk67enYADLZ4XzrLybYqv4XNTs/E4rcRZGZncD61dO18FyC6vUKxwC0ACJsQOeYhkVoyWJoQma4NRd7TK4Kai7+20b8dF7Zhw1U2rUan5NihSd4keIBYgu4zB3fRXjEEO2AMQEuJysoMeHUTRXQAeO8yGOrRb5NV2C/RbrUAwswFsn/FeFmHn/EKD99jJcAI2/uKloClA5cBBCEnK+oB3R6WGDgAv+Bo1yUZr0IpHiCBZegjAQFFtqFqSOBw69yNvrsCx/PYOE0g1EMdzMllrJgwzW89WytRswcR7cy1cTUzt11SDIcP8sHzA4hSixLslhjmx4pXwgg4NDh0q2Fg0YtURPwdAaNIYNO1QgSndbx6zeBegk+gOf44BJsYnabkTIjcwNu4SvyCvO17ClehY7WJBVBnADLIIeceKlC1JnPjJmbyMjA0F9J3klkDpLN6rVG84wTQQrInsYAIrLlccQqka9kuGh7MHEWbIQ78GEwZA0EisdQlMe3QHQtiZoWLNBN9aoDnMLFGEcNXZD33IY8JIlHSs15IoLUrOp+vGMlAkHPBAMGqInZkPJDhO3v8oV+UDQV3xA2mJAkKYOHFE/22oaEwJheIht2CScK2sa740ZZTsFKyFNWXC2Y6xqPJ0G8ZMQOGr/Fh4pjkmnPje4ewMpE56iDtI8tonOIm/lnhEGjt/wCU55BX5hDQkb1qLkMNbF41ZmUSAHZuZRQ+VwH6b8pl9x2grEcuphe3IBM1pq3dupD/Ii64VId9ZTknzeauQhRGUHDvPrCquDGnrFPpqByjoJKDEgFPSB5XHTjLpxS9yLZEx4WEJW3RK8nbnAso1AfEJeHXSklB2xlgtTfUKjb1IXswdQRcJefQxDBAMYQRYGTNv4oMXGUyxnywnkCrAetjexV8HXCDidWgJ/ne8OrPYIKkZ4BgFhv6LYD3Ja7S5IZWWm3qxQGcbt5oVgD0pHuzTdYdr3HATxkWuRECHv6Tjk/7y6zVEdtqJH2TQK8uefFgumXfVlWz96AJRBYbG8XRtEeToBaYXl5zRypAqO+IjMQXyesAz5fBFJg7hL7891x7ZC+t52ID1hovVUYJnIkjLBEuJDU7n0MUE7pfD9dgYsZyLNEuVqEY82TnmMHg49+3rbiQ+I654f02UuKHULk/fOIRiGORpHkiz5lGB7j3irpj+tQNDl8GUVVq7dZg5xZBqPL2R8bL7UExnrwBl59PmfkBLmN3CaOUt3TxdQR7u0g8Ox4CFUBoeALyjM8LNeugpugZ4uiu6WR0Z6pvF6yZx/5hqvFQAEwHFc2mcHfBxbNnQhluJym3QHbKzE8tKul/9gzrilmrEQVgHcw/r6AeJoEACGAKAcE2oNxtwiGAjqM7DgKNZLZY8gWAEBEwbJefaH9jqNgQbwFE4rTzFUQXo2z1jFSbkJqrHbhEoZdKwDcBhMpGWtWZzAkI3JjAcVJlkUPomXtTpm7HzeyiaNFQoYsBsdHgc1ISwroiIZExOkNj4NuyirjDNOHI0vgM8zsi9DR6FSLQLPobGQrCE5jKGkobJQiRShIhgiOCOWldkPtQMAEjDEHQepspIMlEnh4MulS6iKmwIJs1FngU/DRy0cZ7IJQ7DVbHQ9GnFHjo0kI9ssAt85uRAQl4Z/Qds8CCBBQtkDRRwadAi158e+E33/QgQAdw2XRSn12MX7oobbhIYSSAwcI0HMiHVrVk2QYbHRlTqhPMCJiXLRTHowXlCTkUCIEUMEDu4YEmDhHhpGjSiZ9CHKDJkaMD6S9OPOuy4Ub4Q6AwbLGFRabpCgQJHAyJa3UHVkyInMlBHPfrhR4QcJH7sUjaEbMBThBiAMKzSYCQzQiqdELFKQJ4HDrpkwFoPJwK2xprAguXVd5adOvHejajEGLJKEr6Vu8MBpgAFvr0UEZftNCLkEB7wSVS8JxecJ4yi0NpQIss+lmGwmhagjoaGdTRizki/nSzy5lIHrFB/RdySBsZYXnNtYtYrHeWYXy/Qy+rMui8KVLlHE/0aFVFlRQWJk2M+bCJpQwqjonjEo4Ie+rTKzqY+1mqFsIgY9C8anGyKrAwMx/CLKDivqEaAJz+wy4KiKoLiGtA1w2ERF/QaojD+nEMtGFBXfOQufpJb6BpduYDnBiXDOKuYPP1z7gCYrJMrAifL6Og+96+hhYqk5mlAhuFcqw2We4RZRSwJiNgGSvwitGu5Glihacq0aSzmnCki4EJIeel6Dj5sl68GwSQ3/4mCPFAhwyIQO4PMsKUamykQTURRjVA93uAJHijI3Kgq7Ka4oAyyTPFHjlbM8gewHQOCwgUWaANhLHQGeRK+sJKHBDcZgqJzBwEtiKk24eZZTzMU66P/LNZffRCN11E2quA+kcLpYIwmC0KKzziORrOhHC4RYyUlXeRhuPzJoqZNKf4IDApXSgLvktgk+8OGTDLpI0rHQtsqVETqAyEYTx+ZlKwhUUvphqRZcMHWiYGY5NYxuocwxCJOoaqJWF+rw8FITp8sDCOJwCMHFTyrIqqxmbpMCoiTAZWvTrM70mNBxJ2kNA8kKACiibftMRItHLE2Z4Df609IiLYF7wgkWRXD3UxpecXSqgSbVBCKpIBGMOpYeMSPlaZGg2eZfrFZVJZR0TqQskniOsFY6fgCt5zKkOlpkt0Gm1EDHnAt5vo2ziYgFrRbhuwh5Jh0BWBNgkIRi197/462QJht+MiEpCPK0vxSm0byBbf6M6RQea6HUsXidwjtSdFHJZMvECX8s5Dmw4+osBvcrlOAj4HMhgSVOsHwVs8/e1535OJ8jA9xt1pK3JAUj7l7nkJZhiG3c8YhdUiQt0nZmRWHss3NWKdMu3P2ZeQXeNdjz8OC9nfECxYDgfc0XDEYCt7wZAQz8ym57JtYKUcRFl2IRyVCTJfAZ4QyxcwScACEiYNTKZg1IQAdUUAFj8ElyrkrIM7TWEENNrGIykhqP/BauR9zrBi3BFaMKtyXGrLBU9OlfzzqSnBvhIxJz2E+RgOECigmBPOzboKtIc4JmgFAiVDpC48DnvF4d/y0mUWNh9rS0HHewYoD2EwH2bOgI59xoEXc5Fx1ekLuJ/MMXASgPCYrIwe9tI2uV8EOhvvYaLGFEX9i5RuqWk6lGxMArAuRRCUDQoIHY4hLlMABKRMUUYejEhzIYYe8aqcE3Pkkzy8HHLmRAGCW4Jhg8bEzWohQcK2olU2tphAmdYyD4iCJTKdwKDUIVFSUZihfSAeIKCIDEULkxk5PzhhMUFwLCTIx8ExqasHRlJhsqxge+QtfqCBkvcOjyHW7jV4rUsR3yrcmH96tQCxoAJrIBb5jEdMQhJWGBK5lRmSAIGetmxB8+YsZvqRPWLfYFO1MtCXboColp9MC1Hv7Qa//18NgF/uGlYLZqnZMLQwC+cyCKZO548LkLofImN7QNdIGwg92lQMcRVQlDTd9al//CEL8qtSCCForYC0QAuRu1T3KKWGELIuKDio0rYegDzx46d61P9OEUggyO/0p4ny15TQQojKZWOEWr19ApoEWRqUA4mYyJdounoSCMUtt1vHAaiQ6SKajKSiaqCnGlZJOyRV17Azi0lYGgIvOYTAR6rJi2Jhj/+IX6sAKGsIoVHaoyhjOEdiTDSGMSveBGGxa5C71GrSHfs8Vea5lSEnopQSnSjjgB+8MqUfBKNvuObTCZWHbmw3IoWIHxyBcHmt2RNw4pjXN61q56fsZ7fM3/SB2j1E03cc0wEVKNXQ4gWBaoEWnlkShsXVWO1anKdjaLoGGYKCEyTS8pPBrgK2town11qQRxmEhdNWNLVmSrJfyJbC//QVQgqk8lK9HpMB3As3wosA0UrN9GewmCELBSIL0tyt7y0KXfFBcxhEwOOk4ThcAssTCO6wnnDpAA3nUOaUS0bsOeUIDvFOpnnJNgwSjGUakAaryVGaBjWXkdc8C0Uf85nCfoeJcILnEPklEtHBJAGBfhVJglVixI4MclNwiWQSD628/4MJF4QAw0b0NRsQwpo/TaqEZREWgkAgHkBCPzO8/Vb7TO0t+w8rQYa3iQzHT3Hty62AigzG5L//oosrn+h3TG2q0tbSQ7KvVhvmluIqksQUExfVUoTC6islZEiBj/Y3Fn5PQhyUhXTKyrcKQBDUuc8pvDedAJ9NgN8uoICQyi4JMFEBxKlkzphv2XI0hE4h0iu9YdilJEkBAdcNzSEOwqy5ZKqKsZaqfiQqmYiYjRkSYQjIUf/Y5buN4pz1T7LPCQ9RcGy20/OArk2JFhquoCY2VFJrhXAroyVTuWoofNttB4AMTxGttYRgBnJo/Coq3VRU+BNo0TAPEXuqQfuEyEhWYPp3uhYQiMLIu5iDSXKc16xHPrMGJ1cvuNchb3T/YL2roQKuUzTXDbYCQ6qzACRTI3Wq886f8GtLL6dnMwXoxvZ0mR/Fvk/uUZihfMqNp6uB9fE/a4ucOPRKesLaiUijcsi6wo5KlKEoqlSsnqGYCZZgJDX6euKUCYoGs3Rix+Q3Scuziup1nRHBqeFC+Ozzscr4fibLkbPlmZCUKlLWIg+0SrgIO9nCWllr3vtKkVSjn8DGVz8WS9Absb+Qw78rEcGIvzpJTiCDAMACc7ybV1GprkaYLsRbBC3yMJmojyjGhtOQ+lTqfAKBfuBFPKxjGcHRIXvuymAI0x9cNaJgpbCcGmvdUSPL4yPXvv3zUj8s6FsMIMLSz8FX5iFTGG9jhmAtL5wH0F+oeDMyXhir7Lan+29bn/+P20B4f6UyyWTBmZdfTdh+1/u7dfNfiOhjCKg0m5gFqKhZMFC5kwwKkKmOEh5rI35GEbeAmvK3ur/eO//lM2WzqNbPMKvCAVO1ImFeOOh0gNSsCDqlgivEg/asuNW7gSGZOJw9o2DUwsk0CDGkuptOMHD0u53MEJmfqRzPGacKIyYLid13ux2ioaj0m9LRm8DLxB69qMCUCxKSKdn2OxuugDPOO9Hxkl76I+ERmfEPk7o2sDrfONx6hB0qNCV/mILoA0b4oEPjIqx2sbqgEvKmsblqMWS4iu8uMP2yqU1+lAsIJDStM1jwGIoEu4jAAcsAFC1Eq91sODhVI/+ru2/91AJvRBGNuaN7gwhDdUxCZTEQUKlU/Rl3EhjLChCXKRJ14QBsjqmlEyKmmYNc4BISDxK7GrLlPENf/zCm1BkQqRtTaIPM/DPUbjB7hriiOUoGiYMON5PqiAG8uxwWAURrFIEhATM1+AAR9hwMBDwC7EiSSIhqejNi78LouirYXowt9bEe7bxtKrgu+hkBuRCfjZpDeQO7CxFe9ynAmkBqNLPav4EFlLJsqKisMCRnssPXHIh1STnU/ZGAsMO0DxMxDxu1skLIKzGKfAxWAZvPIoxYgkusVaDl2wB2CRjnnggxrwtDoKiHUEwp74sFmwmZYorAFMmYdEyZT0L3xMEv/WohDLwaDq4Q9HAAO3+yE5CAWaWUE1bA+NAABQioP+STc0EMqhnCizA44RSQD4KhzEWRoBoJyZ6yL64JCDupa5ULrwEgysCLmvhMPviyGp3AtUg0vpaC1/MpwuGAIORJpsIbhr9KtMCRWvvMv+gwe44a6xII1CeYa/vINLAKV3sB2p+w6fQJA/6QN2sEvHtEf/24LeIDCCaAUqOCun8QkQ+DrqABHf8A1m+atsEKPGLM1FJL5PqQejYDEB6qRzGBsTaJrhYUOGUBvFhJaxMAje5M3TnMifQwLZIEzgsY8xMIU0EDjCHJ/cFJLdjM57FIt5GLLGSrB3G57tJBB1wRdxl7ORNyNP+kSP00QR9osk65MVz8nBvTOt7RPP+hzQyRnG98KUmHInw+iVq5EUW9NGAo3QZVCEleCEtQRPOygW0xBQCe3Qnfo+AREH8+yKEBUDNHGA8fRQ6UTR6USTULG1F01LFFVRGi09FmXRGrWuCAAAIfkECQMADwAsAAAAAKUAugAABP/wyUmrvTjrzaf7XyeOZGme6AkCQjsM7tu2QA06aa7vPPqxMwFgAKQJYLBiUAgA9Z7QKOnHSjJr2KwWu3QdbTipeNyjAreGgBpgqBkKb4N8Ls8GYbNmmMzvaxwsWzUBgQBqAW+EiAYHbQUFB5EHi2lcNUIyTX6bfh9CV4U1BYSQhouEjHIBAgEJbHA1km2EXDMvepy5T55aV1ejrKO0VQGjbYaNcSxwB6MAwpddNrrUKqFnLZUBDYRHrEyIoo+TzwlpbdmporI1eEeZIdXyGYCgXaxJq4aG3HIHl5HgEDpgrtEqRN1awHkTSZ+SPPHmSTSDhdawTwpZXSoAigUgVc//RhW49ObREHByYBV7CHGPRF2AtqwxhamdgJFsKqoBmWDbyGIFGjRigcrisDVCUnlbMu0lp5iWgKwykgVGGmeLDNUBUDBNsUS0BA4ZEGfWOwGMGuGRkUeTUz4OQBllNaximptgd55CBunRnGIHm00yCmDoAAJE6jA5GwTX2ygO8BRBZ0ijt0GHBPRbeAjhwZRxGjnrO0cYrTZEuNxKtrSty8c6Iqt+cVSRKEXh8ALWGgghmzqHVAkpNqns17OMCBEgkHSoFxpuYaeInNoFYjbdsOA8ZOrMM9yU4ixMeYpOgQQBkxm4zAp1EKVIGkeXPuXWJWz7Ko7EqiUrYFWHGPNV/1kl/QUUIwsN8VsR4Vil1iVrNUWfCNBF8x04atBVSS37mHfOeKU9AuKHdCRiAHqzlDTSC3RkM4Ri8r024QVxMfFCaoMwgVUDP+Wx01+qxDGgMQuJ6A8cfgWZTCNJ1fHGMgkiRkQzgcg3Iz04CrAcAbTQlZ+CeiHkFSXqhUegkGeGOKCBjCRQJE6QrLIcG2oxJeGVEsSVk3e1cTeWKRaVFuR4SCJZlpEjGlqgokg286FDmRS2nhGu4ZknWlKp4YxO+2T3iGcCCUqieYSCKBpoCBpXIiIBgaYlc3dBGE2lV340BHODqUEWb1UwByipAhL5qYh07pQkiIwudOqx/qB4zP9hZHH0AqyTtjUfbER0s5wAuS5iEISICCQmdt6ec2iB/qREaIlFligqHZL82YYcr/5WbYUyvpTUrQS8YlqCVWg0ZkrNDEvmVeqyi6yIyUBSonoMueuwGxsyxghLd+qLnZaJpdHAVTzSG4y5Yoq5aKjIuitxkqgey7LK5sIHQzeJsfWFAPlW0552Qnn1aTEfC0OHVu4iRCTM6aKb5sNIgwbij6mkYRVlqLnDRM652PrbI/1wN5xnlPy4k2BoHui0oqKtyy66aY/D8imhmgNUe6ixwR50WHeS0wsGbcOjWEQTSMnLMYco4jgFQ3JAA0JJEgnMajctsZtbNYgYpu5gkTf/GbYeRoB4PHZ5i5lDn7NmWUsmLlRfIv7NOOMJoGekyog2QvaiqgTVd1Kv9ouOtZtL8dExYxsquskrG2+6eG4zzLrjDBf8euyPCzoiqsmf97cBa82JTuY1wJRTgCGLiBRaPzdNuorKHi4Y4o5LwkxAsMsOubrXmycUIt5kvp7VhAjeE9ASALKkpAHmUIcLxDYvRSWvYAXzR+LkF78KVpBrCHRWykI0B4ilAT3KQQzxfreEAAhwBw6gV7+kxzilNOlHG+Qg6/JnIKiZx3HouSDXErA6yZ3JUHFqzDFooA9KnXA6OdnW4lqXDBgiz2g2RBz2QBIexbnPgZLIYfx2mEO//0SwgzR0RlIQMq0BkINWY4gLakR4nrSZQ1z/kaHDEHS48cyEYBFMUnqaZ6RIUE9+GIzdD+tYtMHtqVchAd+1oIAdaIWLIF5xlngAlJWYBURoG9ra+/zCsra5LS3pIcgf6YfAVuFPYpNEVRVwZBIiZqwMVHwTLLiiKBuqbBKOqpghCAex6tERjxKMnh//2Lo/AsuBdAgXUhIziJEs5ZUoXNAbEJikMwDJQw97W0IeOckA5DJVR2pU9S7Zl/TETotBoV7kUqm/QrnhNP8AXhQK4wbRME4g3riKHYOjF9bNQiqrsp7LlFWaPG5SMAgVpfwyODtsMmqaSBLbOmaxDURAIf+F3DNj4lrJIs6sDW0Ao8E1j9EhpTGLYJyUHx3nN0x0lrJU2CSRw0zyOXT4BVBBOeIGMAqA5Zzokv+LVrCMM7i/2IR2JMWCwtqVsGA2yn0UJGY6v9kydWmqJMoETHkUIZIyrMhB9hvLIpgRpMEVzDZfOEe3cBIKIHkUUeP5Zh2jN45RppNyhANiB1EkDLG0oWH3PAAKPWMABLZpErdoV3DQRZoukWtewRFQFgoULhKxSm2FmqvisjhKhrrMrYcqDsmwwA0R8TABOr2AvUrCOHagj2VJWuwsv/CpQaFCaUnBpJN8lr9CsY8h5RRlFzOYtlNysLDFGUTAGAeYoCAwBxj/RcslqYmyogUJVTQzhUpIpg3suIFwYfshaBpWPWEKZgE5hF3DmhrbkqhHVm9wE1C40YDUUqAO/epiOg8nKhimKiFoyV0m9aKEQrDvaI8Kb8v0yIw6HgC99FNALht6vY99L8BX4apzBasCOSQ2dsVkp8oGFDAhjfWdYrEWQMvzr8KFp7IdTFpCFeCmxanTcGDMHTA65permq8AHf6fdAkylPNgtXAAmtgMKqtUtr5iKtDByPi8ApLrXte/7FWR4xYgP+p56GWcwY57P/UdoPHIviksYGLIpqAYTpFmGDbxXipLC7bgIRzXFFvYxDVShTEki5Ig7hQn/JfMGpW5dTSB/8jo1CraBtTPJU4ySalYNAh9jTwK/g3UXowwhx7uj+r1JLtYleMNDWANQHmETjGqKWNKpaFlNVSJDWIuuxwjk6vqmFb0fGU6l67H1msYJEDt5SMdV8CmyxQ3QuIXEiistVN5hnpCdbBVloY7/vENCYfzmxdqFUgMBItROTMkWDdDdned47tm1zd9tC4srzshq9MyjrotTTzhmgxkg7Sg226lEL44BWFvG24qVyIvVmbvsCMRalER7kQiMWwifuY3oYjAAf8wo34nNbhQAcgr+VypeFYr5ovcJxBsIjCoJCruK3MXVQUDdSnhtW7nlsRN1R0EjxLQgehOycsoT5Nuq/8m5mPCOlbMsUfJCZvMKg9MK1iBccx8+wYuNyODfmbseYr5M5PsMqccwOia/bgd88HMOVPrc1Vvt5VPUGzlZktwkgmOmY8PymVEPncC10bZVggkKIfbiXYhwYEkq7MZpFjnVSbxjqIa49HmWtcssdNXKP6Y4AKnNKU78/gkCXKqQBWUMgGvKWrvehAG2OndX+dbZA7KPSz+94ilbjhC7sWqw9ou5gVOtMWGa6ZEdq6E70cHEPK3eAWkQd5SSKfDITBkk/ToXxw9pgW9k3gERmWhEufnYUE/RRRFtcChJpoJXjKHar0ecYJW/RqgBz/0oBdXANlG8kT0UISwSo8pFsv/Wc7BO6bQdBJkQeWFQT6jCF6haQWXO2M1XBJ2Ug50HlkBIWbkHkQRf8l3IvYTdyaCOr/zDKBhF98CdfzXJXKBgL9nGsNETkCzd8pUawGISuqiTvUXNUqTCoh3H3XQDIyxSHmCGqwCSUQhbI+nVquQLcnkZFiFCqI1INnhI50xC8DgJYpDbztEVU0XhcKEOug2c6BxOiTTJAd3YS2QM/zTHuxgLy4zVlO4ax93FORWTb3HIFRmQwaBT8/AAvqjXx7EJrCVS3n3COiXNDb4RN92YYFAIyIDSuQwVkMTUc4BgmPCT0oFEiBoghWRDr+iBtwXQbtRCuSyOltUTiByH7QW/18BQYNNZVwNtSA3chIy4gDOtA3yQxRCMiK+0QJf8ROBkoBv5wZV8opZ0Bky0Wlpowb7AxhiGISbJRZrMC8lAmJv8IDM04HlFmbo8w4yICNJpl63hjRMNhyUNYwTiGFagQSZ4AIAxwTVd1315jPyFYW39goBoQ8x5k3qIQvngXOQUy5AAgSuoI0D8Bop1D66cxB6ZXeUATfAYU2KETg0cznWgQQdEii+wXmJEBLls2F6iA7/t0sp4m+CKD1vZDacsRAgZBEzEE83AgMVwGqh5Ey1hW8CBiZlxW9p9SRBVwfucCPeE4AxSC6dUTKH0BMT51f/kx/QyH/GIEoH5DC7OP9FFFcUAXYWzFEBe5J3QyEpE0eUTGIvgld01UIJR3Bh37Ml1EJJQ2kk3JFhxwBHgOckFXF9G6IiBMNaj8NUhmNh//EjZwEDLmE3weA4X2cwI0IUiiUVRCMvTnIE19E7UjI+xNhcpddjxmIaQ6lni4k+5AGSP6I6GhRjehQyfrMhGSclA+kB8hcx6oCLwmJvgnJy38U9usiTqOk5l2NAT/NxgAIUYEOavjmUOrGanXmDgLR31iUMQQM0lSAArgAtL7AHPOVc6GZc5EEetXld3aaO/1eW64GaaBkfk8hP0AhHPgEqsxA6mtIAmEExRISHHXhYqAgLJ2UQH7Oe3PExN/L/BROghhgEfXDFkDtpcFkRA/bSbUSAlkknBONBjqYwiqU3QgHCeUVxNN6xjJTAV5/XaRLTiJh5F7dABP0JRqCZZzT3GX4yDDgphqihQsuxnyUzK95xZc7ne5qCGxYGKLbDPUE3dChSDG9EO6SwOPr0iUdIBCL6ADwFSlAZpK65KbNjguI4B3ngYVxwHVDmizYTEXkyjMc3fmNCceNVQzDkRbljP3b5gkGRha4YHzgQXWkhO7HgQ4iJLgAGHR+5K0iwJWOULas0A8sXDYW1bHT2FVwFQ9xXh+S2g6blgecCBxY2iehzK97wpmMoiMfgKHZUIraoF/xWBKPTmJjAp9Vh/2mA2nNVAACGVajhwA+2lJcvVokEgZKUUx7LE6WWsCLMEZ1KKjXqQg6pcFJXpRBqeVt78g4UoyCeIwNE0D9rIQAkwAV+sw/QEKaOoJNlIn5FlUCtgJyvp5145hWMx6w4kJV/NqTg9noMKpz9YVTX4JiP2QIv2pLQWgInUQ4HFxaTKF7Vt1WoYD9eeDImSmWxcIQuUK6zUH7kgIVMgwxgYRMdQXLLIGSMMa+X02E0YGQHOhNO+DJDOULNgnhbh1SrMqEgeRlkYSuFxTX/wBXv8mI38UU4gQnsoR3Ec69F8KJnYV8SEAlH0AoJGwjisjpmIpxqhTvz4q2kIy6B9yN/Mv+QDmA0rTMLCfQ0DXoTTxMe98EW+VFGFAgtWoIzOfAgjBOAV8UP5vBd6fMu3QEklFNVeSY0pwF7UNuBRsIGLkigW9EtuFGCQ1Qh04IY4BmeOhAJMLCmWUUuGusvWVsbKVG1CsB3dhRbfkIvIfoBJEpmDZG1uyYE3SII5AgcSJqbLfmiy8GzFCCLOpc7gXCHVUtJylWRgSM3BqAAk+uWR+O0tvi0H0EKnAqWspUgQNuqVWILWlA5YNs9zDEnqEsBjKeqo3EIfdMV/0d3FPUrchMAtpuEHvQzeahUGYekveuyQmenMWpkZZUd8eGT+jEEumId/XIdPNCc6AsN7aaGR9H/IasVsnJAjYUYrPvXE8ERvpExvoDXXg5XJIQgccsjePMyWafRkREJA4jRvPfVBlyStmzlKHkogDFFILGVt9cKFgEMJAQ8kN6lWfv0sXeBeOzatyIpZCziiknHHBbsAV8VJz+TvetVhATbHZOlHfubEmJ2Uy77jF81BMOzJiJRtQomDNwCDXUBuu8UAwPJoGPxP6nHA2k2M70pKWrgLMQ4WaYTHtkbuR9cjWEcJs40kFesChBjCEq7qbEADVtgH97gK8n3ilbAHAnACjzHxSvinHXIFYqwgasAu0lVdNPLsH5GoXQyFgWMKbsoLgsgOC5GS2NcJbK5a+iIFjHAHArQ/y8LUAYZN7w8oSB8NWK++CvqEACX7HDYw4teUwzvUMA5UZ5UO1K+R77WNWVzOy/eoGaNlwBmVMqCbBULgHqE0BPuF1GbSiqhdcY01HHVu5CwiMIPnC5y7Kl16BvZK5xTfAlnKEZjMcw9cR49cBeAfG2a4RUL4L3tCcGeCpXaC1vEB432mM16ksvqcCKkQ1ixACh24HY2cmpJiRnPWlHqzAMIEQwguUtFCRzh1x/F2Loipj6typM488ZllhfFMThh4359awlnQcbMegu5SQrIuM7dUEnt500Z6YtJhYIR3c3Gcm8Gshg7dglQ0U/S63Jaq6rjbNJfUjXayDHcthIFcP/DvdoNRDIUG2JkUNOgFq1ddYC+DhtH6TqPPW0DVxAcDxpe3rzAy0NFnWwZSEobjcdVz+DUvqgSjLeVcXIUcqkqRVGXQcqQDJhq4MEk1SEb10s8ArxYtuV3Yn3Hxpsc8Cueh1oMO8DRyMctlSDPUQGMgmI7OOFDkZeZqFAFshEZwPHZU+PNyYSMdowF6IgjJdggMcCLw2LBzNcbaRCJb0m52QG6CCg3hSHVMONNTOslmNI/ODNGxFt3aeIZ3/ElBRa7lSPTqPCzFCU0Y5vECTOXHz00nfxPFSIEXTHEDoVWOXEEBawnytgbEyp9Mt1MVLwngdKSoagPHioiqKuT0LH/3roB0cMoYG4XCgVKyQ0UNe7ju7zyVQX8ABnrCuHHZyajTLtk0SYHBOy8n1/HAo/jm3AQZPLCKrTgHHOmVPy3HifBjnfhTW9HMqmDkDTRIOL7APoxmT+RcEQs0Rc5K7Yw3AKpi9wgjjvUWiUQtSDaIbCQGFMxNr4hmxgGMHVWGGQ1e5/SziV1r6npSpDFoHIrMYdwn3VxB0mwIEl9ZzM7HOmEQEeEUUTXLgoiNRqBev92vIFzMbr4sXoJFqzQskvpDuWKErHbQgGtVSBY0COOIUND4Y5FswrRE+jRcxl5GBrykeM9E2xOUouBBrNEa7YqzUMAC7v1BYDp4mGth83E/8tlDMQPIRPWBLbMzRaReVVYY+Y0c2qlSECv1pyVyJO6nQWIV9kjFScscJ9ZnZRE8KYdwS2rW1KbVtJUYQfMtL4ykNtf/skawaVPDRIhN4b7grMtIhdtx20b0zFl83dW9XVfgaAKcinKZaxEDZZTFyDD2AszzOwy4B5WnARBdQt0kxet2tbLsBi5sQ+p0Z0AVxptVTdAKW7XSGakR3SpqaR0gYBbEamQw97jvARVs59pNRYygJrjvdqn5tcmSBvQqBg7Ee/OlA5tfgXqoOxwdM2cZ7U4kXEHa+5E1O8CwiaY5ueFIBm/SNwd/6eY0Kz5R69ewKnDLGa5itQHKlLbfv+8edoehj1o6mdAyiq2EuB24qxNCsPugI4GPBkpXtC1P3ukHJPSUYZhW94kAZPmqvDvH1khWJC2JG5w8Yk6IrHZ7tHpVZ+xaCXWcs97X9Ll7h7i3FYTs0Ibf2o1Y8GnAmhrQcU/t9CdU9rJ+suZ/wdZUndVxMGJ3+kNFHDfD9zsT28eYVFEW6Bi18eSZKFm9jEVFAyenxAha9Zt3nXSlnvv7c4beCpEMf6o3ajpD4rxSWruO2Ej6fBi3oyY3G7juggEaTcp/WKw2SItdkbhOd7lJDVL9oFyVQL5zr3IhRDQYPaf0gf8LtHPjo8c/MTXHCEKgmAPBsoFF5MjePwJiJH/EF1uxc6aBKXgBbnddrrm9hBgJABBDFHlDqaXrSgCkiyapjMADHMe+HEyQLAwagCkjuRBUclDCdSMFUotU7wIbJIRa0CSDqYkq67YsjqtBILW0LL1lBNnZsJKJg+Ui3itMoAOhru5zpRc2LEYGg0DwRKfjYkAkCJFxrQkCy+kuIoiDx+kLqetLs6srLCkgZVOD7wxK7yjHbRVkRqdjQqQSrqCvIORvVhUqxfAhySbkY6yhh8oukaKkTRBOCckFpqbAoohxRoCGq+yuM8vGhy/ocUVge0dtqRFtpVJVpUPw5A7gRNF61HSpl/AmRodKgEYgcIUvTo82jxaeMFRNCpa/5iVyVckR5NzTWB18TBgW5OIOljxY4Xj2pA2OUbK25ELBJRzBAHkOsnGBTAZOOpcY0HimDx5UKwtgQRtlRIbsAR4yNBAjaV5lDiF2ijSox8q3zZxoLNK4Y4bvHaqEHFQ1rB4YJsM8AfM5LlEjQ4JDUGFijA/woyEREJgx9J3jOxq+SYKQxqPo8wwzNuq1ck+GayMNFX5YJ6AlqxNINP2X5pzU2q95ACzDrFsSrqkXLLl6YUh94jkNRSWWxYvYXq8oz0tbzQ0NDiAmYKy8iwRIg6QaA12ZsabOHNuHbKizrFLPZRFGXiYtXBYzq9Mexd4E0uiF8CE8bLZosaqEiE7W/9KazJYHpdMKef+Kn/oCzxzC4MAsANLhAaIQSQhD2hh5r6FtGDiPPJu+GsUCg5IBTJhPCIuh92M+O0TNTSCAiluyojHsjxgqsiE4zqTLobwGmixB3z+Q8QEi77LwAmUgGTCry3AkkgcJuBoCD7FiuFih8SyYMW3HYaqwi9aalvwpbKWmwUFwNYSYMYYHJjslhFQIyg7HXechTeG3gNMqdiGUGyyAESKJi/nhNEuEkqqAmNOhtTJbRuFFFmBrA+E8nKPp54kMwYcCmywR9La3LEEa5BSx6jY5twGi6XWOSKaI2LhCSyBvNBTvTBCscika2AVQ1GFTEPkliJeIYCzLAT/xEmSPATCoDQhtkygtmmI0CvICkAqkhRRjCIiknN8MEQrOL44LBTOUGWBODUOmmvN00jzKQC/Ovpk0jJ1igm4/GBc8BQqhnrmkdgqwYpdb0QSUeAl7lsiv25NAkWcLmgBjZR04mFEguVCQNDGd1L4lZQvhJWOXm2WMiFTy5JhylmeQIMnExUlsoIJDNPLQYeHgYKGkCfDkvfH3D4dhI4tGzzBmtT6iJUteOPds6brdDEH6DqW26RTJQdC1UI77VSHQKzyUnjK7HxGJ9DCajj5C0T1QzbNsngooYEErNMnVo+lA2gHjBM54acd9Wv0wB5Feu9arKaBOatuE1eiAh0q/1ZI3pkZJjAgiMFAYsFGQ0gIqOQKEBmdxOr+mEAbVbimgASw05zBS1CLgpokpSHQQov8Wjy8qlEtd4KMBooWmk7KHTediSn7Tznr9kuS4y6SBmaGDG456QO4NVdmD16LAo9PKQfnhGPGBR5ncgYJB1LJEkDXU3ZZqShNP7atRB4Wo0N3Hpg4TgGvaV2Tzef1pLRBcIuLjWLccbsR/Ug0mHsCY46FiZREgiNB4cAgSEYOAySgGQKJ1Tbu9zydWCAMy1EE3BYBtXsFZhmwYIQ2BtIupUzIWgkcyStURQ4pUMNZS4jDwXg3l0yVJTy9moA91oO0D8bLJIDZycV0FMS6LP8qBaa6SFYI5rJMWIUwOimLa4zCHNj4jDdXQQR+9nOvIEgLUhNYjweT+A8coM4eUShQ3O6VLCjk4hLc6FEYccZDiIxIT1uMntsISMVAqQQOYfAb7yyDIyHWIgB3uEae2ig6eEGvAgnQYIbqg525JOQl2oIUWmAmCNqI6ze6Gx+6ziK+QN6HDEq51qIOkTlHCaUstODMejCZNE2egJIOmqTbUrijIDBjTWl4z8uUIo4URWM1QAKCdcIDnazo0EPg2tQxNZcAPfokbhmqgi/eiBMzkS5u98BZMXVVMrpUzHfPYMMpO9StaMJhR95wiGruCaUj/sybxnvJAfLQOQHY4xP/v3SemaI3znOAoRG7qma9hCInaRxOcReJHD4pJ4tXtewZS/zQSsIWykYMLWrJqMk2B3BOMlFCas5YgUpbBxMgAO0lAZkFLVWjBghNczKFfBwqO4TKFlAFCUJgVSihgAIUJCduFlnONgnA0Ps5NEyJ+YFNeUeattniPYJBJZ+YtKcmMJEHJurE7ULDnom5TafwTBfqlpXBZrBxPWOCaUxfNgbiZOM0eXORLUyTnH41RyMKRBGKdscdhW3CVK7CkwZWNJdDACE5/6NY8oYXBqx+cAbTVMMJ97YrRZnDmECTYTZPNQ60eqewuIPPj/DZI0nakk2VCUIxiVE9s4nQl33N/+SZjmHZzUC1b6xV1346RYhmSYO2CVTDLJgTWbx8A0MaUAYKj1kDDW7AIKLaK3GLq4Uo0Kwcp2WQEHRhMq6swbbXuiJsxXIXg9GqMJeQpCUWdUfLhGeXea1cGMwLTKwwTwDLmkXqLAbgkmWuapWolE+lkkwLrEJK6uGhOuo1kL49+AaAMegI2mVJ4oS2r1qVzKAyyIwTxIVkGyjW+6oTuIB0LQ4jm7B3wFELIjRyEKvLo8MmA4XUHYsQlzxwQ7UL27EQxCW7rdduBDLRMi7EWkeG1EJCgQ72vKMSsgByd39ogATdlEEj2Mdn+dpkYB7GBuNEC5eJ/AMUVvPKgyAKa/8q5UXV0IonJRiz8tQGtQ4Y1CXVG2WbrQpn0WahjuXZiMiAAl+LwtMQRRn0XqClyDG3IUS1NIuu9qacOyAovP6FBd0g/UFKoK4BR60pguK7m27ekqXW5GlKfG2XFtrFFPjRllx8QLRGVC+DqYZbCqqrHnO+Oqv5S1Cri6MZFOiRLu/cSetI6ciB3MVZAlmqsO/yH+1URh7VtCsewHmxcoEZDCqWdjp1MLdQcIdTpDEpVPLTXCGY4U/hhkS6UXKIpqbbsOo6QXg5mUzxuFrab7T3X8KAAQclA1dk6SzrZOHt2gTcv7fkrmCyk6w3PZLkurQR6giMM4lPnOI9bMmpkP3/2xmj26LEOKF1Qh7uRMnCv6s91/vu0sVJi4CJAGCyzGHqAPYQRINx2AYl/6c6ZClqopmax5/Uzd9NF/q/6sasvUJ1DyBAlQ8FprfTAQE6ZhwAVsOgGq4WUdCgYBZzuCZlf62s65G/123tQIoE3p1GkA7X7cRdS0kG9SZK8CDNpXaRjiiIsDI38uSXP/lPkF7wA0wVSL2c9+IPnFYlFEN4eLp7mi8veJVf+tAox6NZul7CFCBdQTDZyg1ibnriahVv4IRIr4VWxxQcxIxE9l+DVC5XIHKFR/yjY4y5Ahjfgxb4cBa+IjjpKuzfKtnJF3xmcRViY9oY+qPU+sjwkS+V/y4vohdv+/ZnxGLvW3tNR6iNQT6e9zsCwJBDI46DOO2IAs3ChyRAg8QQgPqzv/uTM0WQO/Z4gl6rEs8pt7YpNTOjK3Qzu92zCL3JPbmanqp4QAgkk9ECjlPZiCkpvMFLkwlUPxRirZPLkSm6i+gxAewgvHiwFRRMwUlhsQqAm5/6GSnIENPqnFuyO49DDc5CkIIghtRDs4NQEB+yNgcUQrfDP2Fiuo+YHh4aOpqwl5H5Hym8KKdJhhRIEJ9IgQ/QhdQoHiegPy40PehBB0TYEwJhig9YHJKzI9fJqYbLh8qTiwQ5ADh8Px7xF+66ki28Q+CrOCIwoTHwp+dYBTB6g/8tYTgNuoN7cT2DgMMC6TmLEIxAQyJJ3L48DLK9cYrV6BM18QWICDkTACdwchOD4sFsOEPf2TR5i8RVhMBW1AwQAJ3zIapOmSRPkYaDiJtcLEVGWZdRegVRK6AUG8Y7dACHgoSME5FRqRLrsCNYcAB9ogLHibseIKFS3ANCC7JZyUZtXEVuXA1GaJtx8Q4mwJUmkCfe4DeCmDWKuTsICjKUQBtunMd5rEdUaRBKmg1XuQgCsaMK4iSD8gBG44prKbj3kEeF/Mh6pJUP5ITIqS4TTJBkejFfGzJCm7sg/MjFs7dCECUVkoKPKBT5eJJwIzQdDJaXhMlJ7AZqCBoFwy1ZP6CnTQOKeNyGnwTKFMxDQbMyjnzHkbMo01ENpmxKp9xGmUSMZ9AS48Ec6GAPrdxKhQxJb3EGveAJlMDKLihLszRLbhwtl0ortKG/uYxLvSTGuczLvYSzCAAAIfkECQMADwAsAAAAAKUAugAABP/wyUmrvTjrzav7TieOZGme6AkCgDC47yDLriCAYarvfI9+LVeLFRwGbYCXjcb6+J7QqOmjJBqtxEBWa7XBmE6pePz8eLFEAUtt5QICcDQr5lWHyfj8xszGnrNtBgVaBwaGh3CHa15VAHd6kHgOcm1pagJuDW9wAQmFBgGGLAUHB4Oic3WYOZGtZTJoSJujBmstAwAHQTK1bwCgLIenpYZaqm+PrsojVC+UvpeYu4sFmFy9RDFawAIFpMRdSqGsy+UYHwTOln3dBb4sbkcJ7wELoYLAvwGDo/eFAAV6MXqRzJw5B0wWwZg1K4AXY0NeYGsRYIAWhy0EkeIS8F5GUwL/ozkiZ9AVwj6L3rCJ88YdHJT7agUo5JITJ1v3tHg7ZWymKZYKR5Zs5cAGpy9G+cGDp9PhIIwvZ+7jBCwUx5gOrf4zauAnQC412JAcKsUMQxcE+rxkenHfpjioGiTY5y1RTjXeDuis+9SaTYBbByIjK6aovit/l46CN9duqDeg1MDpGDAgqIs7Oe10JzngkVDg/jQZS/jHylsDirnlMvXdmwSXGWKZfFHUITUavQmaCnVmLXFd9R75Q7o0CcO10KbTO1lyQ4EWE6G5rIg3KESa8fGUHBuxIV1rlOByZPzHL2AE0v96WpfqxfNJ3t5TbRngbqzXB9GM2UD3qLpCdMSd/wHdDNdHceVdgJwbugkzWUCfQFPFblWphs8h110YyiCnGMIhP3R11BYqQXRiTB1NJMhBUaJY1JVcTwXQACgFNPAYWMFctqGHHxazG4c7WnaIXhRWhd+H9iWRTi66KEGcihlMwg0BXXnTwIw00pVAXSVuc1+Hut1jWZga8lWZhzxuBlt717SgHj5OPgmlBzm5aV+NCfR3kzU+dnVddp5NVkxlG5qpUUx5jbkhonmC5NYStkxEgywIloaJTPvAWEqNHXVnk3v5aWbKU2gWemaVm2mkqm6spvkJgTSIAulvThJRqUEItfidXP0R+l4Nq84n02ZWkcJXmjzWYuhOF7LKbP9lsCU3Xi4OpSOAn5MemKADVP5GwEx4rtleePJph2Z7h9JYGbPJfsKes0JiWJefBWzJUS+wOjPTcFbcalJq3lK55ZVbHmAjuZkp6mBmuRGqaogNr6vqkM+uqp075wlSgy+4aCwaC6Wx6K2Lvcq1ZUAPZUlVhhTG9EmhiYwppGfONivMs5sJufJjFnWES0B0UErYtVVB5s3Jcu0Hs84XXjxv04iw22qDq0Loam5Oe3hAtJoI0GtGyR1DXklEb1PvqMaCcmWnOX2I6Jkx90lXbpvCS4rFEbvbbp9DfnJwfwY4Q3QScpZz7QG4mQIjs/8pGq+IWFGNpjCuXtnrpp+A9F3/mnennXnOlm2p7npKvgDbx/4WJkpantS4uEDrnZkZxGxWRpMpaIO+meW8o31zg6mOKe+Fok91rZLfFiJLv8o40GJ6W7vOJbD42KRaTpM7rru7uetOcAOlbIqh1oLgTtPdwsj1HQDpyGA24SiNDckkgYLmyajSAqR7ssAnUn7ODZsY2syXqJ0Q7H6/m5jWdKO570wvPaj4DYqIEAkpiSlpNYpQgCzjPx1lSHYfqhnW6BW+b2CubgY0me8KOLzxCWlrgRMcZ9QwLZSkjgfOI1D5CEYK2CTBRUUKHgcHlZlXdRBDwpJX+O4XvhKGS3wNy133hpcVl+QrNQ6J3w1TkMP4/7TOZMZKQojYNT4aXQhtMSlGQ2LWRJzZbmtMRNsBidE0qYlQJkjkWFoEUQQrSKJFpvPE92bGrE/taFE7MaJVrBDA/61wM7j7RgLiaLlJ4q+AZBwUy7qSxbCc5wxc2KIJfnGLw31xccAj5PYkx5LO3GxyqBIhCiVpyRLO8XGJwt+PTpEZJPwmF0VwgyiZYQgYBGdrNMnT/khlyNxs40SQsVCROEmvERorL6OCIyVVGC8X1uxDuvAGXmClhbSgoSyLpEvdenEyqg0RaoUEC3d2lB+MQcZ3/3NgIptYikky0XWThNDd8BkxUIjuWEkwxKSYB4XqGYCbnkGCw85lLjLK0/8+N9FRa5YSQHbNUnxN9Gf4bimM3CFRTe3hR8c86ccy+Mh1izuRzPQGJEF1JCUPyglzpMMao8nMMpdcJz+1uSkVXrKk6LvYyTA1gCXBginy24EDHiMAW07vWomyChWxZoyfycsu9CEUEao3xontQ4rY7KclrSTSVJVxXqFYmyZSI4D0EGAObAnAMDHwyWvdzz82sGbCChq2S4lIjdFsW30wkbDGUoyB+zRfLQ2GQQgRQ2KneuhTxJOeR7FlrxbookTgKCDGCo9tD/LPLTJ200WR0ipucEuO6qmuZRbQfESl7Fp51EZcwqYiaXFS2LYAWgpgFE/93MqdGGaquUmrZ/T/0dEgrHHV5dElZryc2e8g+Y0e1pKk+WwVj7bEgs4SSBoJSREXMXTAb+BLatpRbFcBttOYbMIzwZguithg1vxcxp05655a7wfeak5OUPHR4TMbYasUkDI4AE3l0zzUzBNdy3+aYU1srnuELsSOTJSZ2k8hucTvJkABr7qmhLG3Cdhd4rM/iAwATsmrY7FLTHmEBXPzgYpFmksLjeAK9hxLuYiZELcmhg1IHtcs4XlpBgNA3DlPQMoX1OuUohuhWcO0WnVd9jF8jCZkovlcWIA5VDnFse5yWWJBctNcsURineaQFn7YcArFvBQyOdRO2Q3KH10lmgtx55hF5ZnMq53F/0uzUyj/jvjIcCwFSdPGWxC+ZCHnUQcFS1Dlw4kvv03mEN+6nKx6ilcfNz2CGQNbLP9iGDvC6yiSCXziLFPutOWjS0aMoYvlRXVFh24ij9dFqhFCc4gT9YcuETsdfFGng4sSVhprC9S0RhqOKK4Y1HZTMlJFEwlxEOVX9lFL/L5N21g5QphywhpcXhMj0yoCbv4L7bC6mp7EhrQl/flPBqIRH2jkUi42tokbTpUyBPvJvCXXIXwsAlGfklUZS3qbIbBh3vRm96IxLKafQhhzKMa27xrY2MrYKDX8CLM0fp2B8/jESv9oSYhDiCbCzUfgoua49YzlFXbMhzawjS6jHf9Uan+rVZuiAwkd5zYZvdRIOgNYt4zg0IGpyqTfFMGZJs0YzAwZb0f5rQZV7IjfflioTkI/lLTVda5ZG6zWI+9c+QQBuF6lvCoG9Jc+rLzb2RaSYZeR6H38R4S7wcMbYibz3GuxS/zIbZrFBoZbgxe+kE8y5EVfMo94E3nphmIPpEwcHIf11uxwA6tsSgxo4IKxYoBbzT9KrXP/+2xox44658LmvuFObFhqZE0Yzu9kbFSAPYhCRq0zfIimnUScqB0eiE0jHIiECFBORZ8ancq6AyVdUrHJaSS+3+VJnuJ1zah+a1AXrxJQqRzSBYwbyfeD1JXF9dBzrJ4KM+NiIwv/DKOwF6nlK9dTbMxEIUJ0ZdjWOmhiUqDwKpYAEMR3ZZMUJRkzKpbzU4iUJWWHPYgwBHPWGlgxTxeXI+pUQjeTKR2SYTr3J2mUKsklcrjzSt8xN6QmCO0kI/USJaLQW/Vid1PjXBihIYynCAMiRlxyepfygIZkbeLTbbVRIXFgev/FLKZQS3B3VksWayxRJk/RHwNTHPpgSnXzOps3PkBGNFwGfRKED0lxHQayFLgBdM1USxqxNminRkHHgWf0guOXOS6UJQY4Ow9iOQegIKF3Vp4wLPH0c3Z2KX/mgRsiBJw0W0AWA0GmD7DFHslBbslnJXqygjxBZjtSN7sXcjOD/08Athn/0SszoSDFFDsK51xUA2hDYEb2dQUt4oi8oAgzEA3SAFuZqHwOAT7JZzn0Z0g7g12scgALgHRZWDV8ATEDmCnKdAFhCBqG92G8JC9KwRuvVhEbBCyc4QaMMBDxwxSJVCVZUQhjGC3swRI61za5QWvZtnnwsm1xgAkR6DokISWNAw7n5lB/cngcVC4V4T4eg1WgMAPQ8AVLkgWMF4XEpgU2UlWeuFT34XLZl10M5GYohiHPqB2fCBGfAlP9iIm9gxkCOYBdUkiMxA0dkxxh2FTOMAN2dVf1k33nETyEcAhyYYrdlIyNlkhfFFCElHv1QiMzEiI2MkaFaFw/0v8w/2GGfGMUWsV/4KZGjrgNpeOQ6UED0vZMtec98/B+f2WG7tFNkYUnIac5y7hDF3ko0yUjvVIBrOVMLVFquZdF7IY9KHIPvmQVQmCTdhUDGLWEzKQZNfIjEZgITiRnpsI0XeFmClh+D2N3MeWN9VIvrGBBPHeEsfZnu3EpyHgXKXMisgIHTVWYjKCCsQUHV4KYSjkXiEdmJ2QhRyYzf2VJtHU3UpEzykR/AJEnnjABk4AZJkQLAnldwzYuWxAKSwBECRUfv1BXXzkp2ecj2gebTWkX7iA9dGcjkXFM4YMsc7cT9EhHbjk5esIpKcUFlrMAEwAZhqUqO9kh8rEW9mj/C2pYifBxRTKQDi/xAsLyFtjRFq7jeZOxJoQINj6xbNdARwhYIx+pefDkCcuHLi3RH0/5AIcBnnhTLDGyiSuDWNYHOy1yC3aVhB3zTM/ZMv8FOBr4BksJUy4BHlWSDxeRGtzTTpOUPUDlIT4IV2+xmE9pQUzJigGkmHlWmotEcJiIC1m0munxEC6QDwohC9+xKdq3lJmSZgnKeNVgf2pYCNP2UJLGm2cEQrHZKdfxMtQlAUgaYlfCMnATiuN2EwYKZEawSHpUpWegDkvgBcngPJFkJRyUqIPoH7/EGj/REZoHPopTj37yh4vpQWqATGK0Cg9gQRIKm+6IiWSyF24o/wc+wpARRCuWCAPRuQQFYZwXxCmYMXwRJx0MoSzP5BvlgzTZ9ozuIihAkRF2FkoeCgz/EygCOICSl3O2MEFHsTyDGh4vcJ104C+TsKGxiWHZ+qUQiV8ZonjlUzf1KESDh0cOJyu/GAIX1mIi4lbXhadu+nPlKB8UQUNfOaWrCWUvQAJr0IM8QX9KiTEjYgNLxhF8gUxVmHwNU1awhhmYNhIW4Qt5hCXvNHj94KQWhgtxiBr5CmXUigujZAM96B5yCCI38hvm4lO/l0wnMzdO5i7E0hrLYwaYUnMAsJRDqJ149ylLQXiVKBmYYJ00QJg3KQAqcAtXFjO0saFXKRVsAP+Q6JKjV7YRu6RAzmSs+eMQQPAeFDacSQRWyxqslRAMQKETP6SvVGpXxXWtN6sAbgNWsmoTZgputfg019QA2RakfoIo54OH7sAEN2AYbBEjDbdxwIAlevqAKsEyGeGBNUClq1lcEoAEMFKycYAuZ9UV8OOIDfdXeHtrRPdQTfmtXwG4kxAdyNggawd0iIsd5XgG8xYWQLQEVVqlO4A4+tgYwIgZo3tkG6Z2/pB8bvtWzuKNEhIZMoAQyLFGeRm67NYSN/FqpGRxBAqOvUhV+ZoekiunByCl9gKPMaIJE5NUqfsdvOoov3oxTVkvPuYQyTsAyPEnMmamhfa8iJe4ibv/YTwDA9bCM+nwldsrAYVgEeR1XashI7FDCJrTggEmvGECWe/aHoj7Se9bFIx1srVYklrFD7UZDyOoEoXXC70oBNWiBkvSA6ZgEVfSEh64CednMy81RPOxU3lbNXKJUhUCA8qbdfPQBv7TI7xEkU/RBRcnqLgRDD8krepREXqFwmOqPsBIv63jspDTFhCZC/iwW8BDYSmViDpBKzvMAnIBZjYhat10GfYiv9xwBQGSUO57tjT5twUQwHKKMUmJFRmlAGmMlk+IVO2EeZNHW7AZI/uAFtwiuNE7f0dUe53gQTcSD1wbQz07tAT8CwngA1PFGFYchwYwScgZI0XKFoYQ/y0GoMeQujkG6KUx0g51Bb8EYBhWrIi1imad0BCVgBGMxLF2IB6YMA852APOQxEKQB+AAQeJqI120bPWs1QLYGvUxlXRSMHwC7/OgS+MgatyFiNlSY6Pmy1AS8k3EFw/Mw8NIJ/AXAt35Y6XyxytQxNW+0ohNSp63CzR9n6lwsHuO82Ce4ij8Ft2Crw9TMQTVCLKY4m/wATGfFaYvJBRpgs3Qb8vzEFwIb0z3BEfiSxbbHfJXEwVfBouyr5bNyaboLvv8RYmLa+tfC1m9hrDudCEYzRx4BU5W8U9ZaAZ8xpn/Cy0YSEsoBc6TM2w+WzDGZEHqs0DKbb0YKzQCQsrPf91pOADHA0Q+Um/7nAhysy1K+ObAXDRbvp3lDGQ09XRolwVcyENZjjEvxUP8iYSMTROwcALKtgAPuDT7bCRnLAmvhcbMiHK7jK8ZmQzQekRypMOystfnAAejQw1aeQLmuAHBgIscwALPunGOTXHOFQNuDAjeXlWLYHXJVp0Ek0M+zC8MCs5nqcUBa3PbMAlBRAduhu6OnIwHYYEExQ2DBlXDhFWMYFDEPF99jFagxdbz0E3ol0AC+BC+BaMXGI85kTNbHHQmSI3LcgJB7NfcmBfUOZKatAY7ll8OyCYqDaawtEOqvhatXEYtXEmSYNID6w2fbkyG3MDK0EgKjF9LMj/iBch266x39Zztl5QIy0gR1ayvVPVE3DRCyIScKXSFnlItqMwKlR8zy2jYbCyBohM3y890a9GuEOsGAhTBPkCbpzxBpRljDoQePd1oIDSYltXtiDZJme3S4vY4Qw9BBdO20KW3GpXm2xMu5ExqCl9GCIhgSe2tmvMemYLfd6WV2boC6CBxiAULEz3FVbwt9WKErD7YEiknZjhB1VwxL2Y3SYdH1K6fh16HKdAwhjSD8pZ1TwLkYtHYcbslgoTN01BFU2CCwRxCeCSFQmVnWXc5Xh1jhzdPgsBgNWS3exbnMexG/pii5ggHN6IHftd31oj2p2sXRMncKS8IT9UEQDw/wB8jn6100FAQqMWNxvzXUowUMhFDAvtQ91b1EWlhGNZgXdOLr2AgAXBQSPObDHrkt83QQoLAb+izl/BQF1bx40YIbCUUAOCyZDiVAf6CinwkDoFTitOrkHHI3MTkWHYkMxkqxMQrkmyiHDvgTLtY+wivg1YVbmOc0gbJdCiga6zIKjtU2VgyannMB8dNiTOxho/l49ZYKZrhK5balGUg5itYYkhYMFhOAg9g7OGllMMQY4KQY4AmA3RweplBgj9aIuocX0RZV/WwBREWAkF6SWz6l++J3VA0WtO8vDO8IrD4o64F3vQCw19agSzgniYQKDAoOdvQMlWtjYaFYqtfP9E7iuYpNmtkMxIs0iqZlOpuHR8PaHtBNGpzuAfCMri1SMiLKyxMJEGTzV9nVRYn57PQ/sf1oOVjPUnYR16m0C/s4XhF/+gPQEhJB4kQDqEUMGqICsBNGB4YiqjW0xhzvFifrAQrVQgbmzQ0hAWwbVBRTMNyfwYY1V/arjxN43liUN6iGCPee0R8DG0rFADmxnDEo1jDicbgPCXgZapNsGqxhMW0WlmROj4UQEwu7YG4E2mOLEvnVTpZ3VziEAkKej5nAFlqc93nqF+by8mmglVF0e3qLGu9zEDbTG0hq6xSiAroVzV0KD5ko2lps/r4u8RLiAm+lNkHuGeWeER+tr/mUZhL+9Iylwce0sbFB4OKRAQAhAmFDnAHAIMQhAGkgQ+ghiuwzA2CT6ryaMqy74s6gSsgusU4Pl+l6DLhQliLpICRkgaCRwPrGMEaD19QQlRaWBavKKScTYK33jLWIfqQndm8pMyFvB4lB+Ngh4lkTy6mYkfsiKNAwmzpaRHl7awgBbALayswqCNF48nvR0LsomLKp9EHx0Kk8QXJCo2iZGOGtsONsGXDQExUBOymUWb30O1H8xCpCSgyCa435rgkqvNBzuh360xSmcmS2YZVhlbmN+G6QuAEN+S0I9cKkUiijFXjUBQnF5VjA8bBhUx8yiJlCYFDmxYKFBDMBUD/65tEuEHkD1KlsZIClPEBqAhNTTIIFCLCBQ+rs7xoQIPzS8flO48ZLPtk79Q7GAKtGHAUcdFzoh4EgDmDYcSA7BxulkKSgOnUbyBudAgUaFCZlTK1BDD0bogdX7kA5GUhAoPUa6awCHM3x9VDFfZu4XPGZm7fHCcLMrS2tIHDm4lSPBCUFWrY4C5KIzkaqFPa46deDiBQJEwgmzlsDUPRB8Rh6qAOiJCTA9Fybj0ihNqkT21kcyYjjWhGomJm7SkdVLgV4EGjY1OTcihp8AbR5Dm6PAmYBg/AeSMFBCx66CKXf0BAGhIByXIhlgd0xiJlEJBK3rFemEWMJYqCm9yD/+eWI/5glbDPz5C+fqt9LaDoZakZurqHJVO8okYAk/7CDkj/qhrEkq+Mc+PUl5gLo33AmtOCDGAI+w+U0IEKAY1+vhEJPBokG6sS0zjKw3/tkDBAxMAcqYbvSqDzLYeYCGtQkVKkWKH3hrgxTbpksoNG8EwHC2ABqoMMSiq9POCJ2Y8QpEAdAZgrobDbBKJHkDsaCM0e7ZYqA8h4hpmCKy4U8xIqYCIYk8JrOQizQ46xOIVDf8UUSongKEqiiqN0CGGVl7hgDt5OIDFHlZcKusIHnKpR5suXRhpPkf9WGgYI5GQzRLg7AP0yaV6KIAwQRwRsTHFUFKrqkTUhFSHLeL/WEEvSClDRKQU0IpPDL2qGIGQT0a1SQffUgqywtcMgkaSKO5p8i9BtfiBMEfGEpFExfaEQRAKTrlqiOSYg2FUNlCzY6xUWDKD3ZUuKlHUmDizjV9CXWjBFESlKOWAaKSji0NBB02rAUwEOZS4PF/rYQVzcpo0DnyvM+ZBVWqg7CRP/PNBl9TE+GibRIioaIiMHlFVjz2TOKAB8ZyMGL5AEqh4AyUVlIrVJk7pTiRybhGptQblKTm0WAZ5JKBUyLKDxwhXgRfD9bQ9aKhWrRqKiK+S+jmLroIzoC/XnFhiESW4VeuOkNIgkCcx24MpnlBM81Y5fs5526yxxOsJszUI/0dbozx7axWM1EogANYOdZHviBzpVqIFbhnuk+dKuewYUo5RYwayW7oUpw5jrPMjK34MsZYKZp84iUI+Wa1SYbMwfy/KP435cKi6SUn+RMHPRLGydhyywYTSt6b66ipCWKtAzn7AYGYhQqB9GAUZVhgvJDa4ewp41tYNVBBCcELJus/fE44gva6XxacPh+mW6jnkNFpxlnHilwIcxOtNWeGDCk6yIhN5zhQASAATvpfA6QivQ1KrjgMtVp99vQYhUjnBrvLhLhB0CoCrE9n/NtAcXkAiOX75zGce45oE3cA1NhsOEIDRLqsw7ANKSIoA3AclEmyJUmU72Ai5ZQCrzP9PM6NiiaP+E48D3atO59tDu9LkDpBMIUIvEcaK5GaQ+8nkNwGo4DHaA64jDmoFbvMeEIJTnKCYwjwCMVmmRtIsh5jOFSuDyZXosqJ29CsNYcHK20aQghX8pDYK0tPRUnIKIYBHDkaM4/uKopkiUWlEq4JCxpwguK+t8F6DVInKXGGboIQkWL3QxZlI0KKVnUV7GflGwxAFqT3o6I246aRu6uXIExxAAFVKAFTOZjdDhgRFzxIJFqnDumFVQVGaqR1rbAQomlUkfAiMjBQWgjK6UYVXfKFEEYuJDXnYAJI/YWbSknelJfCxW98EycrGU4EbZKArOfMNDYKVHC6VEaD/qssXVfTgPYTgpXfMUqMcNLi2KLUkiQkg2og4AgejqMoIevmnEei1NerZoWH9HAcDwXnJG+gSRLuDgU+QFxSK8YBKSkpNFSTyzqUIZgiFEYEnzqUnbdGNQl57DPyMNz0t2umhB3UajyyAu3YRCJK2q6OJ6hi5AygTCfphThUu6j7BkGBWDaFUn4R4U6fokWxoUB/e7JoJySCiYd18To+y6qgBdbAriqKoBPFCPz06oW/yICZQg7pRBVwKhj7RED4RFiJ4mdSKhJyJisYWMmPAqzmJM5kjxRKzDAHjPJGoEsX6JIjLXFVtjg1qddgoNIt0cCNlmNvReunPFFkPMp1R/x8+xDRI44TiLDzxxZnAdJ/dYUkMDKvf706gJDB9ryw/pe1jBwAc03aDO6qVBLZ4V4sZhERqCH1JWhRjI6pGZ2byuIx/kriYIqV2Erz1Yc7ukR4VXK677ykBHeK3FyXRzyBns1lBFqQGkDWOMuIUCntDo8O1+OKbn8mQg22mqI0YppQjSksDk3XWd+4GoPHrT1WEJrdnxLgMCoqZjZBCSKqVKIwtvTCaHhmCezm4QmSLRsZAIUl1lSZZAh7w8FjGijhJNHJ3Ql4P/fHH7Ohwh7pDLu5u/LQTLBlsMtGQkEdYiuTwiTJTOHGTO5TWXyRAAW+LzLbqJpvzweHDxqrOTv8MN2RczMQ4qcxFCgzRYY2oFs+9oI3Q9DVMErg5XO4wAEcrAlApYyuuMdZzGzQ7k3Xd7RxZNpYV8TDSmnnjzgiTBEgmsKcSdzAFKB5wKuiQLC6UEjh5OWNIn+EuFK0MTKXU7PRUkN48zKQkGqlpQYCymJylqpSJ8MSSaT1gLdzyBbgmXxQqqOpofOOZD0TthA0ywxmOQ8tlhNG+LPFuSiLJ22RIsEgxmCxOSjpiUXrQ4oYKXRCvencYGZDJoNNv6lAvFzuBxYDWhSf7Yclg5hPlMtgMyWu7md/AmbNpfOMWuQpBYRjxISVl8Owg5cO+4lMFed4N6AZ3OFEXK1rZhij/2wBnXNJpJozVtHmBbxuMWbbSs4fhLU3AxiMm6s1D7jqS35f/q1W0SlgUKpC2nOu7kyybVQL2U0ILxtxoJIJ3QUYaGdLuAUWQ6MjAlQaO2GzrVkCfjcvKwmStH1HF9Fk4HUp5R0qyGqRXc/aHY5ZsgdTGRaF8emEhAe4RtpYIFeTDjPCd92LyewcHplQg+hR0y55Xd20nfcF1mjs0cyrVIVatan+gpD3Bvhct+HEIMJ9iXRhYG/7IDHhJrmgfArrwZCb9u+vhrhk/UIJpxEXOgmPpyl3+9rhnBnAA23TEeG5sQ/YGvC0BQQgajaKZEZs6JZph8LaKzpg4YL6nn/la/wanRx+qgFrAQbjXCNntR3e6g4+vu0RZNDC4n0EKgrDqln1AAUh6P9pSMfTwFJfpA3sghcXwCYeaBMMrPjIrCPODAhJZl9/ZtecrjCSokupQhNpzPwZMsVkygLLYoep4CDuCijNSNR5yugbTwA/Di6hgsKdoJuBgmOe7Hwzom8ORvhVswJkhAqgYjcIpkWm7k48CQF7KQNQrjw4LNYmSs3m7FTB4FuZosyTEth9prUFol/XYF0bhiMJyu5B6NrHTtFHYQRcrDKHZGS4MGJYQwzEkw5xoFcYKhFdCH8fAmdTKFaeIrjsZhVGwv0qgtzs6gAqSPAxxhazrQ0n7EQREC/8HoZkn4AjwMqxEJBtn87VEoZKS87RmeD5JLJpDAwSMw0StI54daAfxwQx3KaGMIKiMIcWzsYs/eLddEym8kYrgUABGoRlaukRZnMXdqyvmshkE2RVd48XdOcXYAEBdAY5mIKFPmERaqYU/qD2da8Y42o08kAo00J5a3JpPCDsXO8VurIqk8UDfCcEwMBvGWMOBaA98K0dz7CR0RB5b3D1Y6ivtm5WE4BP7s5IL7L1W2YPfqZ/S0iRmDMjp2zuZwBtq2waPsYQ7VJiRYxTH+L62ohJ5qxKZQK1t+EeMHENa1JU0gYlgeBkoEBqhUTX0qaBdwYz5ocGEsApkG8f44a7/l4RJqaEoQJmOxSsIOzSfg4EitcBHUXqEJvolUTs0DuDDo8RE4nlH0sgEN3IKDzgVM6A8Qryj3kgAbWkGcnANrogfgOxKfcu2aXC2dpgFPWSjjeyCbHFI9WmMDMwsZvEPFZhLusy7tAqYq4IkXSCPtRJMXFkUEjxLVjGHZuuVWExMzvxKQkO2gHCELiiABciZLnCbLkBJhxuQjFjHEEBMzmRAB8iHjzDJeGqchhjMmPGagvuVsnAA2IzNJARONDm6Uru0r8sJCMvBO0Cg4BROWcy2VRqLmvE+9fq+tvOIF3xO6MRI4pTACpxDTNKKmUqvzgDO7kzPzAPOmGLN7qvOHVUwK/RUT/rsLuC0guyYmcekDuCcz/r8TwAN0AgAACH5BAkDAA8ALAAAAAClALoAAAT/8MlJq7046827/2AojmSJOagzrMLKCjAgp2Zt37iIwq4AwD6ZcPDztYA+VG7JbH5QA8JKGBBaqddqseUaCJTOsNgGJUiJP+xVZlyrt9yvY0yva3YstJttLVS1gGkAf2teRmB2iWIORzJaV0iDfwUCgA2DjoABm0EGBlo8QXOKpDdQPgGfnEioMJuWRj4GbWmpAQWqn56YW14AiKXBHoydBpBRMQENmo6Um45tjX9VBQ2e148APb+jwt4XxADXbETPBZibfpmOxgFB51YxadLX9Z9wM93f3sTX514ubm1a9igblSrGgsQIde6ZlU2eICY4YEyQK2D7EqEQt0uSO1kF//woyxbyzz2I8J6l+whqEEGDtw5Q3BXpV0ZFjAzgqjJgYIIEuEJ+EomuoJaQ6l4J+VTpVkMiAurxGBTRAEWe8gLou9mEUaqSLQgcqPZTpM6BDUS+UjkowTJcumyZA5CULSFJ9+jKhAdkEEauZIhETAeUbsgGbuESrKYzoiRcrpTGteVy56uk83TuZHdgYpW+m7YCLuGAwFltdBEnHptAAdCVZNemYhegnECPHLWhFNnQ8Y+vJjVfFZJM9OgQOdVFAXBANdAEBtw6VVsAqDo3Ti+vVfVsrEC4qprKzQ68MZzQx3VUuhc2qtvWCjQvM1aVyk7ujalt1pyd/6u02DRTkv8MQVHGHEVsyGNceidEhRRP4nRGFlDN+aEKH7J9RZ0fQXFYklNDTSfQOCKK6BgqMj0zlU0MbuDAgYNMKF8DiLnW3F2opPOgLXDpyKOHSGlWElIFjAXPjodZoyJVlhEnxIItOtBYC0X+VFZIz7UmVBsxcfiVZhF9+KCQHd4yVEgHQCSQU2kRGRI6uuxyXRAztFjBi2eFVeSERMonVCr88fagh9NxaKSIQg16JmwdEvnKO7OYc50hddr5QHLjDNCZc0Fe9mE6IQr6naNr9hckXKgWauGZbj4kUDIpFiEIlBnhSV91rW16JS4YOjrkmEJ5wluaiD54lZu+ethYY9a5Y5j/JNoI1tlnfbF43Iu8RtVZrtW0WVEL4iCbbKHCipusuWbu6aZVX/qXHWpU6HTAFo5YyxW2CQ0QnXOb8vpDT26+QiaS57Z77q+nmktRUMOl605Pu4A6T460kmLrv/pO9JON0P1rWMLBbljmn9mBXGzCARiZKJqN9qnTW7aARBxoFduBb7T6bsspZPqSqiGQhJJs8qhhroysdwEjNe+v0CUtiDgfVVszHVI2aZVMGv/UJstEqqyWqt/97PVOSpsLcsvmCpkYUrlRmkCCdE4dBl1hqrYXkTT26euoiQKqqFVujrU1LkbenTSa8pYraJ+I9Q21AFKkTIk8TwojpS5F0rg2/6+3DK43dWvOZOFYopuNrOZpjW200oCv3nVQcEN8TrWOyJ2DlBT5MBGNNI6VUCWmD/yr5GSquqfwbvLewF6+M7yu2SlHBxfGswFqCJ321nEzDJvmTRQRIxdf6usKByWvuAsbmZbmP5HefNeKHwxUvj9UREW1VdheA7aCbnuoDAAjn97cJbyFKctCgeOa19bHu4kYCXlKM17i6mcM5XjBGL7wiP5KEJWI1EhjvgMg2BAWvz85alm5cIwt7CGTFgpOcElqn8rIZEBx8Sdc8MAgAbSljSC8YoM62MXV7CahIkyHVSDyEo8aEyw1uaqECTxMkVqYuQY6EH2tU9190rGQGP9YRVYCGwO2nLU71aDJHcYbFLk4xB/fHARQwirXXjzhwq61z4HKk2GnCge41pEJOrcAlx+IkDsfomdungCX1thnOgsBylPIyosgyPMJ3/kNaFMMkgvbt7xuWemBZAIT1xIFHRoJgG0dBM0PnXC5NFilLKgzWhrP5sgEgag851BFmb6SpqspbFt4ZJ/q0lekEgbAOmlRRkhytgW5AJEDDnhVT1o4ESy9xoafItuDhtAUgsFmLW/iTOvQhzUZNsduqxNODZnoO4JYQzCzSEZEnpmBm6Wijrxp0wwLdEIzqeiCK9Pl187ylYdE6FCZlJfKPim4TzovZMwzX/MWU5v7iSf/FUvA3SeIKBQhHOxUy5oNAAHmHR/FKCn3+RQ6jibAKsnQimOTSSgfGJu0CCBNR9BURddCTwu86FjC3MzH9Ba2IzJlBYH62oaoIrByPQKCaFLZJl+KzkSNTXjWKBI0omCVWWTikDXITSa9pwXhgeqEmzmCsBY2GJ2wY3ZxVIl5hhpJw02xnMHkVvmel6LasAAhXn2kAXo6gWjODgCcTKaAaDmmE4EPgTIlikMICqrPEKgiEOxS16aaVwUUjorYjM68YCAFdWQrRtcg7ANO+RHmtO86SQTRWXQZIBj4A2EzCdckJuGHWGBPSKryHR0NR83E5qqGiDuTPWYxgIakYXao/xiKAUyAu845sCy7fZ4EteAFgqHqjONryINiUYsi6WhINI1pccuYK1GWbUgpPE08+XDST9CTf8rQHGuIdVsEBoxdCSLVuWbCHcsQClxWAFyhjOc15uH1nNwiHQ3/ViBx4CzBQbmvPwSHmNSdF21qyQ+4mDhQ7fjSLF56TG3k4QOizvJo1FwAe6spOS0CC0EA3GEigdcYII7xpjJRHoAMuGAdXagWP5NNPEN2PA3JKk/Xo0ribvliF5YzyA2wkVCuqrLOgQVcHXRlhkWQG3G8liyHW3Bc+NCpFIdIyrqg4mn4kB9DyCWlZGuekBxc3HLaaJgDOyaWcsmTQjpMf2OU1v9rzYiyHc0ZJJ8CFEhyoaa1QmYNBc1RZZO158C5z3+q8Sw5r9K6BBzT1ClDzQFiECxEdyRlVNQPkwd1YFmAKUO81Q93zusJAsSDLu6IC0HFFCz3RvWuB5AxhB3oR5chBZluYUolfMHE6Q7jcQf1zmKHF7SCnOVDHqkIydwKzrvGg04dXBR5PlSuAn5a2RurJtfYeSZkKgli4BrRYIchl97JlLe7bOOFWkxQYQFChZTlFeZWZhBb05bKxAYxsvEaanln0ncLu4VbaPSK7jaiHnIzDJt6l4tzxYUorjjjw2lzmTC14zoti8eiCp5SXv+sbA6+I3z4nMmWpSUBLUZGD+H/bG0XwfF1kxCSsf/0mzheZxyoeLqozGNbSxOCjcB55LojztKpbkvLhMNmdXbSE8jtEDVw3PcGOgjrbqEUWP4tkLOwftqYrSchKUMIreWhOOmu6T5V0WZJxumUu3F2YwpoacKWh8F/Ra68nqgYnqjRuGy6rFQG6s9KDuIJgKIRLAOijG2UCKQ14Uegr7DkzZXWZ/hYnKV+YLwBkOHFwJpvA1QRUHPa0V9/gMp+mvenV2P03NHeJlviSYbfutwtiDz8U/4Z2PnuaqWdB6ndtG7tKdGu/MhrAGou0Sd9WMXPYCFZROHegk5aYCCy0asj7JBj0IDlo/pHUl3U15gCwF5M/3WFMpeukhVg5VPMgRbeYz7shkR1V3oFMTnTNHs9oxu7MAVeZBDXAFqXASCoVzzFM0pWVn379z73lyoygFnxhApUkQEE8jO8gyrfVnpzhmt8YWv/4lYtVgDdNRsvkAxAUG6dUVIckkylEiJJ1nfqgleuB0roIhd0UQTfghvGkROb0CzdMh9o9TWAsCOVZgRqYlv/MCIl+DBRZkTTkA5VVQ1oSFn4gSRL50KuAR+eZVeuMxQlyAUYklrgYGERgjfXVCJKlIUqxVRPlhC5cUqf4ALcZEt0s26d84N4QxDuAm7PE1Wtt39XtGUg8xJGsEOp9hDG0QoE8j998x3KpQmFIv+Av5NKwEMN0SIFmIAEU8BUvOEjuKI+8OUpu+FIDIY1nbF/oqZAmmQAbXIJmgYPuRcAPtUTgHghJnJeXegRJmVI9MMeAoMzU5AHK8CJ0Fg0adIWFpc3uLgb5TYwSBiCR7guwlEdkEgNlDOAl4IOUmZaz3N6WYhrT8gRK2YmLWZZXOACZvCP4DMeHLE8Y0Eg1aE+HKchzmcWH7ZZd2SJDQZZbOJ2gwEZKJg90HB3/vJdCBRbJ2WPqQAa0kYX+oJ3nyAF/3gGI6ZUUCMcmgEA6NSCKSRZupRGeOWLgAYsL7MJxBKS0ZU9XnAUbrYYdBMw9RhOhCB6HvUZmRKU2pCS/dj/M+0iGzikbQfpSS8Bbo/xOawHgnF4PjTkCQBiaobIjraBUYUFMdC4HaZCaQ7xI+yRYBVhG7MnCUCADEJ3BBUIOmSzei6BWA1EKAIzfw1Zi/EmguOEFMuwPnlhkehAAS9SPdNwetggFyoEkrKCF77wlneZkhyhl1ioEl52Z2hYDRHiHPkxmONRmLx4mBwZUgWSTG8XCFoxAb+BdRXBIyVDSV9lj0WABh3HdpgQBf+YDD3kDylkDvWXCp4jlq1BhaF5SYXCi70Yh+SDNIwxiyAiCXlzALYJPI6Um9LVlymEWmzxVQCUI4T4DIlEnPRyQS7XVF7iduA0jG8THXoFbiix/2us5z8bI1MG5DU7qZ1dlYHLIwEvQiAEYZfAthIveHw94hCZ0BEsIA4oeD08ABB9wYzbgSSd8xLpgob5pUezBR6y8V4/eJgK1WxAEicL9x8pg6A+1FFxkiEo9pYCI6FqMDsrYHfZqGPREgfn9jQhchL0KVuN02EEKVyDcaLKVSXN8ZwAWjpgonqS5DUUgqD1ohLhSWuAV4bbwR6xCFhGRA7EaQh5sENxAAMYgTv8hBji2GH7wpNz1KQVuXq785+lo0YWAkZf8RY0ogBZJgFvtBYctzgFchrRWY0W8UiYMAtmgI0AsUNR4AK04gA/KB8jghZAwTs6Uqclx5FKk6fWWf844yIoZ+E9WdYac6Bp7aAfLecywyaaSTkOvxlALWaNUVmpKlkzDtBzjAFJifGcCudCBaY37kOqDySC2FRu1XBMWead0tgUlRF8u7YSOkov0AgEh9gTtdAFxAmVTzByCTkSYyeMWuNVyGZg15esrOEa4IFcQ7J6D/JzqeMVeAF+x4Q5mxpezvcI5FUUVBGVsoAzKWkGAoAchNE44ymbdkMgejFH/alNFCKl65Q0aaQjzrEAkVkUETMfmDOr2Op8UKeXGLZiXaCKZ4qwIxCZqpGVOzmiu8BfcnhsmoFHx1U2UMVwhXKvnEcZwWo+4lMqvACNfMAFjtEFrqhDKTkA9yX/A1aSo8IIqG3Ckz6wF2tRgoaDswtAEQKaPJC4ZiWBOgfACCtoDPPiEtPQbdqhoyhoirlqYS8gGE+JkgRAWD9QAPBapOWKrV+Io4MAZM+mrOSnQA6bm50zoohRCwtal4gxGQnXtg4Bi5QjZS3QraHwA1JgdglLXT/QGhSVVOUKfI9BRxEiLJx0XNMXWWKZJIknYB2WtusATiVHiqWiJNwxM11UsFOwCeBaqT5ABKqVoIilAGpif6ZmHychSnQkLKoqau6DOHmXN4GKNzryHDkyO86iTCGrLFx6rU6ku76LiJUQB8iAgz2hWg8gBFn2FtrZOVvqVuA3LxGxQOf0i2E3/4mH8bop5nar1gyO4AvgESo78izniQVK4RQ91ANoWg6UUCQ3cADd9Rp/p0uodgu5d1Ny96QHGaisC5YdsjWvO7IdtgB0Ml9cAjWeErmvCDfnByhpAhC+kAcERxfq+wA4dWrHe2fzEzr1kyY9GSiOGK0zkT4KhmZF9iHtqwDFkJsleK0ICKMuDAfkxXs8cUFd4CMNcMOYCj7xMYT/oVQ4NmWIAlp/Foxk4jm/QiCJx8T1UxiB25LIQh4jISu+xQod1KMhSYFBSQ3pgAOYKgNZFr4nQcFDcRVXKzJogkf8t2WK4zl/5wgLcExcGAireETDk7hZmwU+lC/wFAS9O4UxAf/IDeADcKpbt+tfLtTH9UNsyNTIBrQs3lIyHlEdx4QGEYNGasKQfvMKqGZQSrGVt6rCq6YvvqxxgAwPcAooYTgQrOJClrWV8bq/1gE9yjR4cZYL0AF0MoAgrxq0tBjMl0AcDScePPNXygB0zRUjplYdyUwgr8GMkiCg5NKQ06E+iZcm6yI5g9dU3SwT9SMOuFxB7lANiTdCtwGT5XyXrJUJXcDO+yjKEGwKR4FqxEIy1mEehqOan4pl1tlVXfUr+XFDKeIKUeELCJIKAANII7NNx+QsUBENaqlWa0oXb3NTZngYgPwZy8yhGifSXWZ6RuaIehvLc3zU6tCNrQCBiFX/GHoHSPyKOWkwzk/zEBjE0DsYAAvwA0gzjDigEz1qDTGYDp5VuIh6NNUUrfFzxAizJsBmnMwlABNBH8D2NlqXHx8CSAaxUhAow5sLNb1FrjSivpcDOQVYKscCx0Mrg9b0rsKF1BjLzD34BT2KXeeAJSUEXBKDaXcYpAARhvMAk0pqDWRACX+Vu9EzmppFlaIpzQZtXiCtOlujqL8TuCpQCe0DbJgN2WGcwHAzYidohzVZC67nGjaAIDskXuYgUPgXaUaGnNjwuPBlXmOzywgxL7H4CyjdkwJxwZCU0G/CCed2wn4FLstAfJADA9XhGvtHWL+KGkyXegOCQ43iTxYm/zD7dRivl1xBWGLhYoczIMCkZ8vi2CeZEANQ8WvrUASmSa00fEyCOhEmELiX3KEnYYgv2XL1oGTydmZMxh+QfBQrot2D4M2NuSoIg5TOgj1FmxlLcViccI26Y9D3hcHm+XdK1jxZK5+k82zMsjxrdDbkUYc59QWslgsvDklqlA7Y4SwY43CP8jgyLEiG0bLB/K+q0I337C4QAS1vxYtYYknM96JJklLma+RPXKYlU6Kj+Kxenp4Ajt8u4QUpgoiWhUYbFE1LMhsvCdY3eCxTqWQ5/mxs1V8MmIbTYIdeEA5jl3VV8SPzCr8zgw9OFGwDa9P/wNU9pBC2o+dGsSqwuv8eWnh0kIvlYfJ646mYllG1Uq6h66veXQstyjQec7wSoYBg4mGmBXuMq6AvT+4MRXcHs5VvescbobpNr3pPcYIXxZTT/yd4oqIdZ34pj4UQ4Qcd5KfZGLyDavARiAiT0sVidIumEQ0lUvJIdnZ0CRyOJpohiZMLWJs3JMaV9T0JT2mp1M5MqSazgWZwSmFIgUDp7IkUNaGDUYmGy7MVKOB85CBYdQEnSaE4/nwZnzUU89NGjbY363HvKzAHt91V+IjE0F6iCQnaVgAVWesgNtW7/sIClHpSzt220dJUjmEZCilSkrvD2WbxXmqUzsaTV4zvt/2ZgN2+ZnJbEk0jTkL/DudHDqwlEH28THObU7ehHTYPGquSFyoEfdsI8v4cIzNBI0snLl9yGzhFw6MQlNNTQR12i+KSFrp7BP+quQ5skP8+CFPO0NC3ZkFKikIVFbvF0QkcVxzx6GKp4yQE21kHD2ffAxPgCu1TD+nKs4PCcZteDP/UCXDlI3e5HOaLdloJN0e/KknuUZyjI3qICT4DYE+sz/PZKc4YyZU6BY9fCWodLoy2OiUDFAjW2tQzGCvQjULhivCJMWjghfaTb1gHHLaFY3gRMXDWmzh0gTXpTwwzc22rDm41+05bWC1WTcBmRvq2I6iGlGqAYIPhhOI2EpsJ9R+HM10+smv7OyJF/603fhSA+xiHMhCFPn8DPt8QUAwYZFz3tBOgpGMqvCYpAsOQArZYg6YJAGAGOmGoDfYmBF4AGGwYdLNcskYbJAOHF4vVkdBovE7tMGudrLRVDcUtHLYtqMqlVrvcXWkq17xoNrpPwiAY5dcpl5YAl5KEBoEpAcWOFBuBHxUfLCkvuqYxxYummjCxlJQbKSREAJUelIkvlBNRsrOyFTe1wcHAlqAdIYscADuNTRNE1kBAt7cCmRIZGsWrRuajmYtSrq4bJ6SmOUUCUdIxoTFmDxtUGtSCjvLnXNGGtDaJkyBbTh5OIc2BDN9mOVB1xNbUegOjwQgKV6R8+SRkiI0Rwv/yDehRQZ8mKqXEWGEB6oYOU1e82DigqmMUhIgMmAEUz1igcwtBXUjCz46DJicUSaM4UEUQgifcNKvGTN2ETAu7lZMC8pomC3QUfZpQ7dM2h1V23DsHsEeplTyedZEV6GUYWnH20Gzi6w6iAPrEbBEI5WUXdeJucPwIRho5sHClzNGGsQkkUD/DPOoZSo6zL6UOZFniwdYqerLEvrz3Z8aWiwLcPsA5QI6FJywOtglK0ECMZV+JVhQjDUg+Jh0n0pw4hwLIy0i1eUj1c2cnZ0Yil0FSS0TZn4qHiVoZ15JNXxfy7J3QQAEIecNMrUR2ULYOarZpAfgxKAnSMxPkMsH/6Gi98JwUQgowwxBp1ypUgqyjlSwbhA3WCOrIsm3aGo00ihJIYIZICjHvwDXKGiSGp4q6pradptiIIgL3WkIuR27L4oIpUmgCILDGWSmLHkKwIhWVQqBKqOjaAGrDeeKKSocHIRRgwhsUS+A7u+RpKTyYdjrno2g+GuyIa5pD4QoqQ3xPiCy3zAikPezxb0qwvJjJtDIsCySEDIWKAolICNunyAfQYwE4GBRQwJjWjAGqsmwEszKVS5BYgjKPtlkxC14E8YITRriK5IsQwOzhUr5oCesYHs7SjQr5MMLzgd8Qoak7Pw+CElCYykOTRa7ySugedUxMaIoKdiFMsFMk/yhJmBv/G8SkySqLkQI+gIpTnlowm0cCRn7TBLvROLCCsdSWNGEQKE4KTwUZaMmEoo1ywAXLHBJRBYyPIMVDkI/EMsI0RbVaBU0VSLECITE0g3K87qDdckR9sHULpxpKKLMBD7w15YmzfgKSyjjqvSdRXdntQcBce4r2KYrkcEpdrsShLEAbbmTFuWJskRM2LvCxlshTH1hEwohW8NYzs3hkBa5cTyTRIQEv6cuhE+9xhJz1SKbCOmqn2oOylmnYIhdeTBkmPNd+FM+cixTOtgPvFOjKoCIAESTmNXKtxrdFvcRykyyZtWESelqept4tGKExophS6WrKRRSUgLVxzf8iC5OLcr5jgCUVEMIjGGL5Oq1A4Brh40SRrruGaf76K8xGFnr0RCBGimurcCgEsyukVILjyTdUOCMEQwFKWHIN2v3OMfaEeQXsTKOdARmHXhwlV15IJ3Gv05tZfMFF/mZCnS3qdIZRhEiSTyK1ohU0pJe1vPlO4HFqNrJNWsJMrCdCdX0EpW2bkmMpI/VyiEFlbxPW0cemABaSmACsaGBBxSwyNIuPjQEpvrsW8OxgvZttaXEP/MMDxzI7aEAPPb9hnVHyUT9U2IYmNbAT3shUrF15IDLN0FFnvhanRhxFHBuzCAHMhif3MYMABEiPIa7XPcahAArM+AqzgGAFvCn/YWl548M8BqUJ0KFoHQzRlEbGsZdY2Kti5HHIwVIRkd9Z0A6beMcEZwCbIigOVsfKC8Dix4RtUaZ07aJQ4z6mxxZqpFIm8siN6AOXRtAvKFZkRW2oESN9+FCNN8GDn/zSsBKEK2ic65sj8WaddN2NaEewi8UioiXCDHGI1NgJFpyRtdoF5FVCcc1ZOLQenaRxkqQhogEk1MoWxGAgclqc/VzAQkiZKHp0S5X+XAIvHaaSDr0cBR1F8q5KhQoccqqlMcoVt4roY5e+4EAVk/BEN7hKUBvknAKVJUW6ZQIHR+CMSnAAORLy5I+SWQQ10JU4+qWnEXeJRxtKsLzdsG+c/0YiTq8GQBd18iANK3BbdCKzzw4Mx4kyApQ0xHQbFvJmIqgYYe0CQ8RpNIRHzvEgJVZTns+ViiYLJWczfECmDcUgCNJhZJBSdgK8fahLuREUrxa1EdKRwk5yWFni8JcoNtDiZXcBkqj8YqcfqjGIMSiJFlRTgg1qk6JUGZmi8vgF7R1oFlgQpbsqM4cfACBwlMnoWakjiAOtQiDl+ZYZsrKWCtK0pqXwTjp2wAkThDU+1YEgVwaYDaPgbZ1caiV3TrixHLQnRji4BmE0wrlFBs1g5ZFBdUqRy8AKdo1gWFIo0lGpP/jIU7Q0R0ygEVJ/EPO1wgmpGPyxJ02Uggq/hf8KakoyhumYT2CZEaYUbKRL1W5gJ5lM2rwoiqHxiEs2h8yj9Zxk1kxgIS+ZUAhvqKcDfFFgiJVqhW4UdxIeHASTB+GPfCzwg+iOZhHIECqNAmAIr63iQHRJy0L0tqhLDNQLkQoTeeXzWVXYahHneiVy4QCn3HnkW8hQEw8uMESF5le6pCKMBgnxJlNaOGNc+YJvUsyrr6R3Kvkg4hRGYdvi8gEMsUChPOgCtOacGExVsEiIRTziLVlEuHo1DzdpqUhxLEi9gmku6DTCIieqzigsFC4UQUyhe/wozGPExdR0yqdfHflB/XyahzP3AVZkN0Npod8znKe8PxJNwqbJ3vb/CFCVzvomDsUcazy6mQhKHDdu0FXziCOWgJhU478TElprCjynUNQCftOYJ1yCGy+lwkVq6YkDhoj5CrjJbDNVWVMFsnpkDgwAGZDeS+JqcSHlSrW9m0ohmOgKxb85AYq+rYCXGdiSOov5hrYkRApJRUAjN9oXzAqEJTQilINOJ4y6/lH5FjjC4bzOtstUZVxrMx57pDo63iREHCO2RLl62FTSxlPXJrDeGHGYZ0JzUkFKLelTIIGI23un4Zqhj7wAZTPgoERehTUMsPqSQjRjYIPofapynpZwYgL4tMZDyzmJYglSpiuWtmWUSLWMKhPrW14HDcGcJjaYLpjXzV59/3FtDUJCzOIh1IKkV5DTFsq6eaTB7coJhbTiBanD61kct8FZl0uY7AkJoy/+IG3xNRxopPJL1wpfHjecUGs7rDdwcVcxAz2Rsh1mWJuduUdUPbVXP1VMYAO9qmDbVQ20BdPdq2mGyyTga/s7HNLnI1NG9UBedYMR9bM1q9O9SNQrQhIuAArzNXl+vU5fezspcitus3zI1eagCWQWZDNjWrBJyDF7KBrJW9C7qTpsydL5jg76pPO7/nsiTV9gSYmiIGHkDEyuoTta4gEpqoR97NunQ9rjakNf5eROZ4vX5VWF9y1HqHs98/GyWBUbH8BRvNW7XudPUluEjU3LZNdsi/8l0snuVTheuQ+H0ctC+MUIlatMUIg4c4OEeC7mS79dyrih+JCvOCMeI4bSCw7dYLkFsZ+GE4/oADqPEwNl0B04coFwoRACRD8DPMBW0okvgxxgMYjvGj7vazimuyH8A4eJeRWykJA/4bAYkBAdmQoiU6UBGMGFyrhGsAiJsDwDSafcizPgcxbho4RpeUK9WjknbDwJSSwXqEKgIg5pKEAgDEKOgIE9Oa2aEQZiaq7kIpBbSMMXjDOFIygHUp6DSBu9O7N4o7EhurkuzBnqeQOskQB6siV1yp2CaAiVehwKbCfN0b8ZMAEJMQ8QMAUgsJHMcrU8jC4HCBhq+TTpiwf/ANykOHHCBvKaRFSiloEpf/uIdlOGeviJj7gvPKxEyblETkAtC4CGoymGC4FBOVKwLrg/4fMOOKKvF8FBb+GITDk/C3hFWIzFEqwGhFsIl+oow2uyy5iq+/MmLMxBP7FCM8jBq0GhzLrDZWw0DhA7mkAk4UMGM5gWSYkB4Lu0g5KqlwGEyoGFEvgOWDgAYfKHrQlHSRpHcjwKkwmuXuOEA7DCp4OpzJAUDnvHWazHdfSWJjmBXlocZGw+gCRHQrqZLAgCRAoXM5hImPomsTHFSfmXPOAZQ6gc8/iNlvgNVVLGjAzC6FFAx1CN5GGpJgGreXRC2DgLkSAEHTSEeyQc/zHcQhGcSbqLtS98FxhgCTAwpiusspNkhXhcnglpAUb0E32kGX7EFR+USaVUrYxrhe1hgQ8sF/OxQtXIyhmcELGIOAnYyg0buethAhATy7HML4YxSzabOSg4g/+SmYPSnQ2hNL5yFfKYOjD6g1ZMxr2sxPU7hVorHbDIFDh7GYdBy1vjRD0oNe6Qn8eMtsgcQQfIOZcDNhpRA7bMnFIjhM04plqjnbt8hPXSy9K8OllMgUwZlKZMOtfEh8GQDZtKk8VwKNzMzdg7TZVoCJFTlCbKmqwpmtNLHfr4gdNUTu08TdrxO5GLDJNoBSm0gQ8TgOzUTvS8id20l9TxO59aOy1ciKwmOM/0rM9s4c5Isz401ItAUwT6tE8AzZnTHFDwPLkOGNDkDFAFXVB6iwAAIfkECQMADwAsAAAAAKUAugAABP/wyUmrvTjrzbv/YCiOZJk5KCoIQ+sOaWrOdG2LKUvsLf8KgBWL1RsIZLekctlBuYSAqHQ6DQCs16hwG0Uxv+CaQ0AwAgxng9oQYGffVSuWGjSaveG8/jRMGwoFaHNXfVB0UoNXAUBSKwB4e5FfTldqgQFti0JGVkBmQJiMmKNyh6VAjg6SqzYOnICAWKBtQVF/mAWYUQGAu3OkirtwtUZAkKzIHg4EAn+XuAAtgAkJCrCxAQ2jUb3BwrWKup3fRCvHyegVY2exQQK8DQkHAA0F8Qm8+dBVvljiU6C8hevERVW6g+sMHMgVZcCOhdQSwLo3KlY7XZfolJJlqF8pLUP/zh3c44DbgT8Sow04k6BBPGsLGyhQUI9XrmwntyECRsjRGxbc2rg5Q9CdwZF6SgKAtUumNTUHWlazFiieNlwT9f3TyUsQF5CibgYa6skY0jBjAixctDLqTAUxJb6sZ6+iWJlCb2pdqi3XO73RhGiSco0NFjOPjp5txS1Q3TIRZ0os0PKlvJpWABnOFotNgSuBmlYc9Y7XEFJ9nIUGe0XxYhMlFaJBqWBB1JcKJMKzjG0z0V3YdKVpgUsrT0LhamFSIzywudczSi5E0+zAW6lTrzmmdpGKzZu3lsvJ1ftWLFA3g/wZyjx8C5+uoTc5c7IhAQPUJNvjDov597GeXfMd/y71LCWWXmsUd8VVXq1wiy8AHFCfO1LEJ98JS9VHhEL5zWQVLDqBZhGI2pH4jImekfJHEF2RUoobjqh1QFFZWHihOhE6FloBEnaYm0sZUVhiLjUdqF1XYtlkGIhXKWJierpwoiQaFLZx4wmyWRKRhPdMJRd1K8GjHV3kPfkfVjb9Z6RmJp4ix2aYaDiLATbKRx+VPVYjDyBu5caUgYDUs9CaR45o6IBPXqIXZ+QxF02aWFDGRjG71HlWbBoOEFVEk7EJ5Kdk6jWkgEOqGSh5dNEV4DWqGpZFGwxdEdU8HVmKUHX9qVVZpxlxFmqJppYpbKFXldnXgYyOKNRQ+jCUT/9Un1X5yIWurEcbXNS4NB0bLASbKDb2oBrLr6QiW5eho84oIpSdPSgKJrayMsaDB9yTG7TYuDMqsFihK6y39RRJblajZgYiImJ5Fgedi83r1wD4dUkZZo+Gu2+h3p6pWZqsngoux0SO+282LmWyjYRa+BLvHuwQNPFcLlHXzJg88stvX76CXLDFFw9sMZkuaUNWAAnIXFoAK4PhMFsC8JjtXN0UVmipFysJy6ChImlRquGqdmjHp0KzgoyyVHiQrJtJ2KNLTwcctD0+D3vgp4FIaM8fg060MYg6FzawTVl/5g+suqyw0rTJOEB2NtTYzWrJFgPe5r79fswQqUHXY8D/33RfPJ3HpP0FWohmy7vUGmz7ufF/cSdaHN/lXqw3kOHSXqrPjAL56lL9xBpQ0oytVtk9B78Tqs9knrmk8iXmbY/zE3UONs9gqxHzeLAyEiGVVQAf3en6Dl+8t/yqWbmOCY61pkLQg5qtx1/THLaIvgxxtzvaR0Jfv09n9Jfe8Cufdqy1BsMkaBQFxFuguLbAD5UrVXRJVuTGEoABjAMlFCodWtLENnm0JEh/IFewtHKkTMTBLgFyhiWuthCsZc4q0NMM7qb2KDfgpBbwQcvpdgND3TTmW2EbYIvIAgrPRDA4o6JLjyACt6Bxx3ayIxEE8yEIWvhEg0pwWBQuMxcJ/1kBdUP61XLYRJaVeG1nmIigM2yntrZljj8A5JlqyMSrXNgwVv0wwBdaFoVZOdFfpMpHkmDlKqCQaEZlIlAih5U3vAnKKqC6h93OWLckfrAu4ljNTpC2hJL4pTpPfBvXyFeYBNUhDfAgHKrGgyBRoctt4XLjPQbWAEpOjyHcygJ1duI9DmgRCG10Yh0DaJExFnIlOhIT30hYLNg5yxm7CdemGlAvYZ4kbr8KGCyaxjRNeQdxNhidTRx3CdsFTpBGyoIRJmiRQWHFSa5E005mRE3tbMqNcIzevuohkRVJYQfZ4F44eomhtbCNdsKhHiAV5QbiTK18d4yWK2spDl6QM/96knwjTZr3HXJNxx0rCZMBtEcKMcwshHA7GKBkh8BCwhOTsetFL9IkIv90Qw5ciuN+3tfBevUnhjzrZx0g9kVaFRFeNPBkG1wYHK8ViUmJjJKpruKiiaSoOHYRTj4Ik9IFepVT1Wxcf/QG1NA0YyNqiFEBCUqB2MhheDUBDjFL2A4WUW00o2OTXdY1jtGtS59Xg1vjrPK+nglInrtsBGjUwNYJgKYWL1sUSxclnL+EEE6X40UQ2gkuIy0iZZ0IFpmwNo22VaN9KoSeyUb6MCMY4BVraOwYLPJBINnFTHT9LJIIqSJW3rZcHIzWFc/XVep1iUsy2VPtSvQrRO6CDBb/PIAjZFOAxgIzjR8q0HK8xgZbFg5Q/bLhNjC5XTGtajyJBQ7OmGvPPNULO3kbLVA/F1IpqMGMg2JYCGLzmQYKqoBCLKY+IBs2BTnJt0PkU95kkY/DEeapj2Nunjh1Lz6x6aKOOUlLOLMItdi1hQR9Bxoog1EddRZYvlkKB3VxEio5KpUZWqxa4poyNWQQCDSz6ONeyCmosdB6v1LIflKK41rI5iT7PSswXagbYHnWVSLiGJWWw6KqjoYUKp1CLN6DzK7Jzb+BumdknBfDk1h4YiRehMxkBAjvhcnIk6QI1dQ4CGUq6KjoqYgbZooVuiDmwDESF3Gl915ObWlfZ6wl/4m1geORArNoRftASbSq15UGkTxjHEfHxOmLz/wlUgfK69UEiuMChKkzhNIpl+5pr8lgmLmQxodfACEE/NgtaaBQq3/+iiisahWdz/wDel6LSj4qC211jVGVsxo5ZZaYn0/TE2C1yarNNUAAJzGjFojmwZW54g1H4jWyMJNJysYKF4IpgIMYXRdLe/pMAAGCJZQ01Wy+cFOb8tMtyKWqDDcDDXagEmVm1QF5Y7muI1SNydQr2VDgmC0qtqBfDBTlfBSRR+ra9nrQ5Ex73zsBC6AwtcN2xqJhYiXQVYh65CEhWyXEygbDhXnMpdt+VdUdK2IBj7ol0SQte2x8gnIiw//jTBMT2r0dspuZa6ZXIV/BIeHwi64ktYF1PEMR4m2RiYsJnMqpdRwN5p3EK7hbKBCkz83sLJrWbkuMY7xx+ZFHop9qhRmFSbNnYNGsJGIp5ZDIRZZY4b+cJWCLz2m61BF200x9VueMbTDo5PDHBgSpfVazjfmGi2bKvAbtIGdGOG7cAeq0DnHiXc8tunJCCx8iK3769ZoFBir+LYy81MS2zWrPJdqeUrWJWTI+lZ21bGHwse1djxgoPRXT0OmxQqo5UX1TKGwBcCWzwxbT5xalaPGmM+tN5lk9kwQt3KOQT4Uq6XoSN8ABWYnwHQMQ0sdmRPU68AxOnuGQWRp4/tn/2RzmcOXweIEGZERSMuFReTEFQWrTJV4iKNMTKupyci1gXyw3ehfwcrF3NwFycM/nEXiFCJOyCyP1WGeVC0VgQZoABUCBZeQUTXZEKDpGM/XSQpExE4MSfKPifv/HO7LSbRcYdcURNBozeNjjIl0BDjZGGJqgbk0DIy9AELPXdVhxG1tDd8/HdDvWQhN2HUrkZNNANNZgRbkUFfiBfBUQELRAFLb1ZS4iVxUle/1wd2rmLoRgBwFoOAcGLvewKhFEeYgCZk10T2+RNzjoKXKRGw2mFqFXhq6RFm3oD6lmR2nYW78WChPYBmplQQ2FTAFQBi/wiWmQTIADR0JYebw3/ybaEhkMABcttFyywUMR8TC0IiMthyNgJxQEUn+ldH8IxIufwQkw8irjQAZa4BA+YAeamBd/GA8xsYZJAmFJRE1dch0dA0W8IBfcwRaDwSMK4Ro+URx3NBqDtFVGKB4kFTqhAxgv4IkotwndsiLYUyiV4VWqBytDEnypmB+r+DMDFD0RYQUoaAYYh2QUoGWZQHiuYxyU1YsqYV9Mo41ywBY7sAMiphJ4mBMHaBMSMQ/0sCeluExtx0YdVA2r2D7RmAADoG4oCBRHZoYPoHxUFFqp5mvBEQwIBA5vsoLfBZA+4CAp6IGYZhfasCBcxDO/lST2pC32oh8Xs0b2QACfwf8MIwVbjDUBjmhxI8gZ8GQ+vtYcvsAtggGWDvcehgOAFkQEKkaTC7lg8RAo1PBbB5cuI6kAq9g6bjl9nUgAdSBv7HMUBlka3JQwHLeQqJcy74KEEGI4FAlw7xEYAAYnLthn5DFYuBcuY6RQjyOIJcknf6OBYeIQ9VUJVSkB2uMscpUwCleOgFdZ/RAYR3hyZdCTXCZSzNEuUFITgtdfTwRHVUVu/zGDgsiUUcQtzIBzVTYWBqF8U2YG4IhpAjYQJ6QJb6YTAIeJn/gDl7gNBUQ42RCTiBIw+UFRL1VeNENNmXcva5FEq7EITNgGtKkGErAO/yMMAeEvJmMciqUT2pP/BSaIGJ6AjEZQBltwRaEoIKUoJi4hAIbmWdLHOhMRnHABRXPFOwB5dgUUn4zgDLWnKLooWd0VOoKBfafRWk8AkNepA0RwDg4ATcsllJqDG7IGGFEnN/l4foQoP2KjVVXSXargE1IXCrf1H7ummo3QmKHjKp94Vp84kRNpKQ4giUNWER2kEG9hHKpkKEAyYVMRExYTQ9CQSYGBfQwzXYIjURQVLBkZf+JRFKKQhFNZBGPJpDwQLw6wFtHEP08xFZgRifc4K9TINZ25HD75ja3xAGYAj2T3RcTFFDbxDd6xDVAwKc1gkSuoEnIqAJIGLfCgG6OYAAAwFQuQNUZIKIXW/4BxVDJ9eAqM8C6cVJwyZSziKH5bhT9R2JqlMVQSaIcAd6n7ZTdC+IIFMBP2MIju1GFxCWt9onmBRT4gUQkZylhjsBLU1F0p2Zbm40z6GYUxgkAqeYlDNYGgaYyYigNNdD3k4SHBOjz5ZS2e83vKmqUeE19Y1Q2ioALSql2gAY3LlEZw0qyGIGK38ANl6QLFeQckEEIRkSLDCm0K9jkvWFV6Q2HKipmoOKQklRicIHdC2SisMqt49A0cMTazwZhJ+gJBoJeNJQHX6CH8g421xD5mpprfEVbvZYMxlDwEgyA+wQYqwBJ2iiirkkh+xYutN3EM0Ziz+VhWAhtgmBsb+P+WTqEqk9SLi5ot+fFqY0JPi5ATmpWhj2A4aYZ2HzqYLNIAjsp+ndYJIuUCKvEe28BJsHEFb7E8kBOLdbdg9thZeLMrEws/AdIXRZIZO/u1QHdwdvlu6kYhA6qTvYCWk8JlsyAWNRAE0iZz2HBQJmGeS8ImEetB1cBA3+cYvhIrKlkJZ8AIHJoPErpI7+QPitUCD5KrtMcWKGiTLlkCaaE6zyAwPoRIwSdagoIdrOh2QjYmzVIxkHe677AQaYkJk3GsUBKRrguCIGFqbAsP0TCjvJCybUW5NPE6kPMhmgWzcoNSThM0NDEdDjs5A7FxufZZ+wOP7DA1JIRHgzM6xWD/QW0LGp5KVGjSANxrlaBQDeJhmTYnbEJ2PDL0PFY7vCXCohq6ez+bDWfACdP6Dm44mHVVk4kAGuWAjI5gD9iHVQ1gAwcQJgQ8jiFjQP8jLGrzgn4kEy/cij6znRQ0ZAngCI3TN1sHIgGBwaiguKXxBKBpP57KTWlkEyb8WoxDeXdhf7NgrMtxUYNyWpvnZEIhmgA2CtrQAK/gcydin9wwoPEWwhVkOGZHNJSrSDzSCidMDwrAdlzsKo+oE1i4d6f1OdeExdu1gUnsxZ8WDHDTiw+8D2j7Bjm5CaeWBdg2OwfgxsgUhkuyGWe6dm2gObPhOObpEqxoZmXlKTqCD+BJ/xmulROCwzbzF0hJDIc6mgkm269R8Efx0ArREg9rmrfP63NY8YqEODyah7WHdVipoicLUMpoYMrxMHPlM5Rv65WokFYWVEuNAVmzRE028AfRzCDlSFViwQ1sYLZjsXSQZMVzREmDaXMyIROw1TLDKjd+OJTN6njlgMgmSBp6qaCSMRM24CwlAyvJ0Z0sGAR4CxUTgY3pO1UxdSR0IRHFfAUsRxTt3Cwl1J126Ahb4GCo1LWKUAxN8xYzEcAqy56aYzJ6yHEc2XnF4TyfAhMBBEGaM9Ek436RLA8exsksBakgtTCAlx7L+6ZAcH5wkVTiwCBTFn56M4LFmmhh9ctMZ/+S3wFNsEhNGQsXEcI4dfSH8ACZEYnI+NNfpvap0pW/+AEXtUEDDUUZ4BcclzmQtLI5ogK40aZcTvbNCwQngMojGSsPalgNUSQm/mBDjVCW3eKsBoCIZGkF2Mi9ivNaKanWuKg1LAR6NtlecbEn65FjckE8kOOW2oJMINdfHYl+QTkkVLKfgW0Iy9Ji3FEMEdkoJmBjUIdIEyelFnHM7rRtfr0fVcxybk2xguU2xeI2J/wOb9k0fBGGdqRwqCLNN2YGKDfCsMKpLaEFuRSRstWfOjeqabQnAcU+zoRSGhlWcl03QgYrwyyqJOMSrrACv6hZUMOdykJiQ2DRGNxShcP/IddGca5Fq2o2AorzkIDxRWLBqXG0qOEcKH0bjbAwj+1wKgAskN4cZY5BdLmAD5wBFMJgQIVjh6X1eP1HqYn7yCAwacqRpmohaC2MrSfGKnJx1EvX0smzICXzANlLHZiYZyOkm2YLDG1IBBO4b2ZLlQ1xSpUiaQZGmEikKKJqMwr2QjTa0sHMxWzzACxpCF0WtCPSJVvdHGiMZWomERJXF//JtuAs4lVnYPM6CrfNF6ELsRaDEtXEjPRUMHctYPsxy91SNIb0GceSKAEzE/pZjCK4a2aESYLQtmjcNE5Eev/dHAoyyZXVw4syEDMbfPkUMn8Y32/rRC8JMQS8WWkE/0Rswh100KZtyAwijEm5ZoeUklL10IiKg2kI8xnzlpFLtUIcE35YoVzMeIpFctmi+ypK1OncVmVwzCvjV1pmG6ZYB2VDsGuwUAaWisaU4puVOBZ1qFm0nlmnWazcGuACUry9PkBHFDt3YhhdrAqugHcU9xYP/C9Asq2w7Lg3MTMiXF+wjXLS4CyqKTiuaUKxO9s183yEvCjma97PqxrFu0+2jZTqXgyeNhZ6ukjknhuU7swQTbt3EWiexrZhLo7J7XCllheuVAlTA5nchQuOkyzJolrOJhYnYdEAMAGhKW/Dqrte6BT2xxHUZxgrGPGBcKsNgZa1MMHOPoH2Z+Ib6/9KC5kG8vWgMdTb3yJ9ijvzpPkGSB+susvDs0Q61IvG86a9iwshbSFQUiCQmBZ4ivq2RikOtj5/7xU95PRfWSFCXVErEzA2IIcnAeDunGsoY40PZ8+qe/lpbMHPn3UaabgJSdh8OENIRotZruQfu3zLcWJbQeNdgxflKghO63BaQaAN2RGDr1QydUC1EKcgrmXjDKH4n/SEAw9zLfNdzzAggpCamTZ/ywE0uFnu/LhdO/JJQdxWFiQZQeEUnULbxjsLcMDxAL72J0d7hdCYOyRIvTNl3RWODKl6DJomS1JPUdSPI2ZUUED8AECXCtBpTEn6BJON4YDGAzGidTApNub/eidKBgGOHDT1FznRGNwKsRBgwqSnyFDs1MX7rAnEIhtLLgACY3AF2HnmWQASJYHRpv/K32eUEFFUgoHACBAQUkiAgWkMwJAu7Is1WUWjlxVsCyBzUClK9IDBsD6HTaERBHrmp4wdBCghrQIZmoedBCa+lhUQxbq8jISEArKrKAyApLFLFpsSCRgsz5ckgUipKoNTKaUUSS43Lg+vFYMLCokVuLWQCzq6uTpflcgrLMEZB6XOMgACvgOzvKDGo0wuJtXplaPs0+EBss+X07NsFRMusYCD7LOJ0/KJDZY2OA5foWg5Id1XpiyB4gcOMg1TMmoWh1l1flBAtwrJmIfn/wZMEOAOShk/fpK4i0IBSLWJ5Wg9K+OMHLR2pCwkvAftB7A8PrJ1GxComLd0TZiV4KPvnoQ9S7JZIlCx0kRbNsgYGiPx07eTGWYl82NCFs90S8m4q5bQTakQJBTSOUHWBE2bgnYoUKBOyYpHH6YCOYjiA7lJaZqo6qfJxhGOlrB0YQVCHpcBRQvskJKoXKUyDcB6XMnz6j1eLheOipQlCUBjExMwWLBpBdsEGOqwlIOhh4p+XY7YOGWoC4ylyKpkVOWJ0tbcos5alUeuwV+Eq9JdUP1MhFhe+UIkkpI4MYG0N28UUoICh4IilVu26eOCnLW//d6iK/PuqQrztW/b2P+E5MKmxY6XWl5HJZEzDtZYpIPoXHomCwJqAq0Go3bbogEciGAEH1s0CWk2pShCpyoHA/CmuiS+8Sa39jJgQp0BDlKjii+WKo6coIIBMAMLFsrMDLtUWEOwTxY0hjYDMnJEwrGgmcWkNJQJcagQ4fsLN/g6mqKKS8hjZwpEwBjlAFX4+w22PCRoI0APWNLsow/uyBEtH2uQRadRhvDhxrsiOscPJXGqghknJ8hENmtagu052LhMUZgxZAlyPzDJAMGiRMoMwhd77ErTrn6yaJNBA3LgkpICiLCnRrlQAqoPK0qJ7c5zurikvSlgEcIaVxwVCTZYSnqrRaUcFRNM6cj/WoQ1w4qzzoXsQDtmCAVu7aGHU02QNA9AV0WMMPNmiwI3ppKTxhoX8nChklm2imQp+bJBkaKDjACq0mikwuyM8hJMMFnQaMPh00hC9cGNH7ySiikxZjLvG27x7FaMNdpIxhJPDHooFRP/aowMdYYq1tFzexIzCGKl0YeDTF/YlIZjbsjBND7mfLTMmExsVCs7rZAkW4KRGikp+pbszkMAUDSoDP62uIa4EgHuycaAUYj0VqKsw1fZTR6hbTdQ50KjLjBbUU8SDqvqC2h62sEwLyo92MHBxgbuKIOQqJPyQwHHGnChpL+gcrCT1VpBMij32kVeNKXdQqRVRcxtQ5zM/yXpj4Nv/pJFPoBm6C8ky2hbEgNy2aWEShNSsSd3QcRi6gVT7vyKgv/mBCXmFvGoAPN6HpFHP3EidSH4XlAliRcqz+AvL2ErSRkpxZDCnXkFpdcVFniEou9icKsuwejlINJwToRoA8r5SFQKT2IHdxI5HrHYog+zZYm+UOMpAVOEj/ERVjouyvUMdR+P6U6YKAwgH76oy7SkEaU79Yp1UGEBvBKhDOSAgnWAyc8hGmcLzbXnLeaAmf3CpIh6oGAN3fgH9aqnBAgdJ3otew3XmMYJ2aDqdgoTA7xE0J2HbIVKJLxWx8qFrnOVA1ZJAGGZZlEpXfAuZrXZnwmL4b9HsP/IFgaYQxTF0QhBscIQjQMet26kQ+ulAkGJQYbmhKglx7BLPlAyjFfuZyC9bOFYn3Fi9QRYgtsRrQEKiN0BCyeR9AhGKfn4HAigIIFMSKEoSFhkUU6BEwzKokQVDFoq4rQPyRAQMxOYw1zYx5Mm1lEQqlsM2uzQyU1+xCFH+wPp8Hat2SwhLxAz2m9oIwwxLSqQuqkF4XYBkxE8SyVYSp+CRHnCjpDRRDwoQmZAWI3FjehMwhAGbWgJpibtjVUdswq6XGQNAbXjir4Mkzlk0opOhPKYKHMUhFhEgWdBYkK0sNGLJtiuO2gjFU5IReXEEEH1WfIQSjmI9SRhDY+JUHb/CzGTOXlSm27wz4kO+NsjLBGGypVqQubgaJDCFRPQSeQ2KQLaTHQDLixcQJqlTNGigKMecY4gWtOE3h2Wphd/rJNqFU2AnrJ5JsNRoVWnepYR2IMcadJKQy5IkMTQRSXCCHFK5UxBdEbCExFEJZ3WwY5OlZUIdx5CMEF9YbGW8AxZWsx6u+mNND2kBZL1SjCV80bEjGiCGokFXoeDDVfeKcbTeXVBf5lDDnsVFksVMajQ0wqGlhIuESGmIib9UBWqiVBv3Ad4envf7OYlLZ5cDQy2zKlgdwoL4E2kX3KS1N2E+gSaXYStrMIGNG8TBm6BbSkJqh8cgQCvaXlTkpjI/4JEdUpRoyWoI/8j5AGx+NquaWMFm7UFEceHEZD8xRsttcIn2PAM0LkSZAV6UVKu01XT+ohoqLrNS9D0sjYSp30XZUJTbTcR3Cnsp/SJHlM3oo525cgIcqHnpF5DHMAiK71tSpkcAJeGsAgTJRMek0emIVlXLelr+W3F+WxwMOjt4lR60ExVbXSHTeyNAAla8KaWJQfKAQsI8twodNswFIq8ClawwS8DW6XijYikwuAlJO8cfORTcifHxW3xpqYgGUGSIyGo9K1QDTMUDFbEeFL90Fx59gfkyAwEzjAMvcYiDgdLaMp90N+xjNvilMlxxTjGkREt9VoUVChJhPmmIf9ssGJmfA0NHimFlbD4WamEgAg0Cu1ZmNzkk8W5YrqxAgd98jKOcpAKQ9bh7UShVVQQWsRLeANiRVJIYVoABp3bm4Ih3bc4+6KyE6yHmuqZ6UGfJw2V4KvZzuBCCw+ofNBKyQQgwclFFzt9JXw1rCOFR/mwKE32QMMzB31Wo/rVygRegujGVGpbcwIogwKdMCuyI4I0e6JP+3TFWOOyeB3GHORxGK4HnWcB54hpZmCJwPZzSjZD1DrMVjf1aAO4TxzBJcI08uEELNSPoXXANUarpexRPt6tLQCLNgQTAW3MgpuQaLuJT6wICW9fV1uV3bMwFRJr5rHkM9juHaAP2FD/2P9RKUEgD7kJkWGY1IbrJTmIFzuqWol8B0Pfrjz1e61aa+09qwgJ4Vh5XvDmnj+ReHhsZS1CFZeFltnCzSlzUGjRLj/aT1DIhoQBUlMPi1SEFt3I+jopGinfmW3ANi3yJudt6T/CHKSN8KQSp/0IOIBVQvhJZ1Pr7tWLwmfFeioFwBXhsl4+/IUuaShoo1MEftshLu2Q+s9Nx/PHH9OwuXU5gSa17+deWiEqt4sb8ZHoQzi4AX97zUZQMAysp57BuxrqX8WzkH/RoYCat9SIuwfcgHUlLKISQbg2UN/EBF/4DC7RU81WoxpBA0JvLOdMi3zoWVVUD6H9kOijuIzl/9TL1ds37bKSJJJccPIAwGC4yvnd0AEBmCAaMNTIhwiBEXnqAdyok0/QPvpzsaPZoUZYr90Bpm1rDuUQmYnzgO/gI+1hi2YKlcvxCqJYMQd8QGdLlC7RtyKjNg30F3uDJyIRlj0qwA+EBJsLEvw4AkBDLxSENIr6njCDsZjzCZd7jXxLk0ewOXnjQBsMlQJEJEfJhRIsih8sOAdwgG8RBTSzCx/Ip1CLMPQzAwjho6LKjQ8ED0VDjbeSux1hKhO8wp4LwivLFlYDr7CYnR6gsTwTpxpMM7YYsTI0wypqFt+bu/MiODnEwi8INRdhCZhwMKpCwlKJlO/4wgh5Aygkuv+QOjdaqELUW8SQQy7muD87CDBKZKYBS4CUuMH9K0NIsID9u8QM6bd+ALQTFMX64yyheDbDqQt3ehdWxJEIOYBH+I5pg5ZUWYlpwEVd/EEHEIcxiUD8UQ0Do7F4YgtjHETL8BDrWQkxcsZnlMNopIQxcRFgmR2AGb9TgsVgiqLuaqnOYY5bvJdxfMYszKXDIRE6q7ori4mschpumcc9YKQVA4R7TMiAUJQK0woSMR6b2RUo+BDRyb+bmbxcVMjUy0JSFB2h4jOaKZG5gINS9DOM1EiUVJa7M8dQ66AuJEgBQYWLaYIkyMKUvEkGy0JlOBw2kEn/QI+azEicREmO1EkOhzxKACjKoVxKpkzICAAAIfkECQMADwAsAAAAAKUAugAABP/wyUmrvTjrzbv/YCiOZHk5qCAMA0Gw8CA4M2reeK6LKPvGAoBKqFrBXi5ZbcdsOj+9JCAQMBQM1msWi6UCvsbYS2V7ms+4ngyQbRTeb2pgaphP2fK5V8j6+gZlaIKDGGpsBgdwe3JgU3NBRV8BKl57jnwtBDOEnIIOQmwHogYNCXZGVwUNBgJYqqZflyuRd5J2c3+Bnbs3n1OqWkEBCQoHoACJpQttpQUBcM61Q7GOdrEqaw682zx0iVamlAUJDAwHrgkN6grQ6s+pVHGgz7axlmDC2tz7GZ/P31QMkDsgYJwCBggWJFNXKkGBhQ6dOYuX55etPPfwBdHHr6O/h3X/HiEjh0BBw4MmVTFMYOpNKXbQ4kyTFKSWxUWPpnHsuMufqDdEZAgkVvIkg5QBVkYElqdBPKeX9OixV8+azS87eaJBAQAkFpYFWj1kedDhS3bxXLJMJnFizCuOJtqkMo3R1JxYtW5lA5IvMQUJDjQ4QLYoy6XtwL6xkvadO4ySalW8GJIaEQBZ9eag0dUdKMIKQqsbR9QkYjghgbntwjipmyyVqjCqd1nOTAADYmXWTIIGIrUN2JAV7UbVQQbpiocM+FTL8kNCkj6TE+2UAD01QdW0lnPIbt4gPsV51iC06bOrsvyNWIca9XZtA7rVUuBXpfiR6FK6+EgJZvA8XJfI/yOghXYYS1ksRl5x9b3DlEtvqabIdHIwNoVTdHkx0xDMaagTgFAUdEVOhK1XymiovTcaQxDG5JQqacXkYBxYsIARhSLlN9F1+AjxHYgU0LAYH10RVl5o4xTHSBAJwoFiW1DONyOGMHbVoFsBHGCbM0UMcV11BlyzBpAZBJFIi6KUaOIqGloJX4RQzhiljBK5kZRE01X2zCwiyXFOe7l5R2aQX474SmCipPMXO+eIw6Iib8nJYKRwxjceNLK1SQ0lWzSywn+D+nbOF4KRlY6Th412p4stVkrppJHKeel04+VGha21Ddidj2SKWt8KRjYEjRWPqoQirbBOqCydETpm5f879r3z1CE1hfmLPJflBeAnv7n2CkMJtkdeqy4xKCcVyb5lp4RRSqqInUGMh0tFzDUiyY/c+LbYK8Ww9GQdKqiWLrlwMjgwuwXPSNFEGNX3RTR4yEaktlrR8EyYxoJ16ojRvZlujHFUKi2MrsVorqtvkZIsGxfJA8NGFYtlbZIvJSqXm+TKCunHKD/o5Lt1SqdaHW69OB7L2zlEBCQA8GRxNLkZeeA44qorMKSUzndpces6wxjWjr1odLNxOsIkbl9qmS2o+X4p0qErKRjy3DC+GXKyOk96cM+YevzajlIF1N52bPNy7ZvJnUiwGwPrLO2N76m7ykMEx2en3iOv2tr/Cq1VAdcxAeBrRrx1+sv1t1fLuqo7MjYMqc6YjoviugvG/jO5lfE3xzh9ziF6E+LVGbe8diMcsoM4mozylO0w/iTy7I4cobUU3ixK7wZ0ou8Xpz5/C7OuPv5OglWExIUr8FgtMIvjNgfMwaToMastomQbOiFPT1JQ4kzt3rjWtMoDpMwXuDuUD30JOt2KWHQyZzBOZF2DTVyeoTTL/A4HQbCTaxiiwd0VL2vUqYMVnhMd8/XNTiPswpnKBSEGYgpWsIudHcZjIfdcsAT6Ig9YVBU5CcVwRI+rjDAc9Bq9gc1zqPmJk4a3QOOx6l2Xa0xtCge8VoRkJYxbTviAdiNs/4njeHeSXtc6+JaFGIuDB4PdlHgoGyzYow43DIEDctOeBS5FcH0LXwr3IAPHzG1Vx9uatFYIDcEosCHpcsqTWKcSY1FED6OyRQHi+AFK6C9LDnzSnJTVGHQxDDfImBP0tIQnhs0qj8BA1OSwOLvbvYpBRCPRr64jwiq2KUsLcUeTbNc6HIEyb+6LXfyoI0CQ2TEiHNwY2Jr1QDxpiIKzdAQlNzDHKXDohC1ZFiplIxdLpiJWUbJTNZ6yO+nEsBQlSqYyUdnCci2pKx2qR/Z0YLFbcAFaTpRe9eSxAkCGMYDEnFEsoxWj5lSBa4MxnTrIwpYWaVJ4DRLGlWzDoWkWgv+W7mvNw+ymuopIdEIdjMe1FoYhqEynGlKSRPMQqc6HNtJq1AuO/LpgLyqOQBzUedEtHNOY2z0yQ7ESXxUKNQnktUZe+4TYSBu5UHXCSVIlexYeHCEuRli0ApxJHr0UZimKWOgRYYwDhk46zs5ciVgMSx4Kw4jSDY5GoQ0RTOVcci75HUNt47zqBLbDyYC2Lk7SmkfmTnoxqUSDZGkZzPyQ9zCnXGcObjgT1+C6FvVtEk8DwEVmV2EPKuj1AZyxTyztkrmvKaKshxMnPwPCpOq4YZztu5RMPmqNxZ3IkIiEEyHHFofcqDQBRMjDVbPqoIFWaIQXk208CXra8TyWFY//fU8ngRFLsU4iuJ8jlt6UshLAONRovH2f0cKUFGtVY7hDJM8c3CgHDKHvr9yhKzHt0yDbPE657yDkYR02j+icjoVwoKx+94bMutHSvBWaZlZHG0YRCrQpf0wvUiEWj5q8ITf4TQpVVbMILmVHpS4y2EITRwwj/hdVzqNHZNJ7v/DwyHOJ9evftJpWAGJkCLN8hlCod7dxVsk9YfEtiC0rihFzF6H/Rag7rzsdiXaBkiwOUx3K4xDk9VResXgdHIYYlnhNIrO/YozboKW8FU9nDZIwscEylhxirNNozOPaALhEViROEgrXoAMekkREK6f1ezIEGB3AGqYMBmCzk3gI/2S1Bo1j8AWUsWBkipnqhgORxVy7fWlxElAQVlA1zYup5IcrpNIeApbCgK3QdnBhJdxcGJ5uw1l16Jod2cwiYJVy4YgPVIwn3o5Bl5DBnEEBjQuGdoJaZDQIYQsHW7SnGsIIU9SEMlE3vQPXQLmGdIrgR2XBajDpfEmBr8Yqq7ggS9Ya4RU6UGsayu/KE5qNVpsslXl0udPx8i+uA0uPQl0BEl62Fa2wlix1lKhUxPhGMyM0mEK7ICwB+UK4REdcCj0bNewkmj2QShHBlvDLWPDyl1bQ6M5KQoL2UAHR6lS0EKtTTcqEZaxoUuiQT+EnB6A4X6Vi4UeCseM+xogbo/99aD2DWeUO+5UXWMChtzFFI5lqzC6XyEBLp8ShTrpvtjeK48AkYJ5lsjArMsTvc/0ZcjjpE4KvS+ewVMNsSnisN8U55NS0HEorQhWvr84gueLt0FxCWlfWkvN+8AjWYC3mwH+KdnnLYQ366Xe/Jf7MQhfBCvZmCDFlK0pfD6YhwznNXOtTgDnr7xpDIcyPOEM6a0Z3NR1lPGSqUYc+9o4SBNjzl230ZaLHBWjahF65vq2Uw4jmZ1bQb5ZUjAtNGCBqCglMBtB8J1k8a+DxaXwxuV0Fj9NS4tfHzcswgePOGiv7nE+s5NQZ+kL+TEnJ4DTaRo4MwLBkN9W0D228wCz/7VuCOpB2B5l1K0xjITURBtfRJcLwRt81XcTDcGgEesPhKn1nHBtjJkIgEAtwfyfgW0ABLWLhc5iyHF2UI7MBbbjSCh6FYYemgLdxTedQLDgSfEQUgUa2HgDmKqKhNFY0AAIBGMVwAZCnNvyHQpynIJDTVrV2XRn4ZU64JEZwK0zXB12SZRWySFU2PgWVN1wDcwaSCq3EKm5WZfTnZoAhhBhmDHuyKiDzOopnFbMxRB7nW4QlfjCACUnAdJ/CYKogV41UWFvoSu0Qf8MBEw60RG/yhc/XCAcAGBuYFTRgKw5hBSJiSpHyHMnjHv3xMDlxK7KQWayQBC5QE2ugBDbi/wpyEnNK4jl253lnoibmYRaCCA1fhyT6AzCtoAAbuACQ2EevMQVzpkmxB1tLgiv2Qhe4oiFMBwZJEG1GgA109E2XshZPoUGW6G3D9xCJUiApoV9o5QznwA4sYyWUYIYHUAFr0Icd1jWqcy1V0R2tkGeyIA+99wNxNwSWhw3J5VdvgCC1o3XspEmJQhZHURwrJFkxYQpNFnJBkHBBOAFzhGGDERtYU5GQkXb9QYf6s2psFwYvIG3C5gf+UTLycIjo0gwAtoXGpGRjURgIEBiH+FJaMArPF3iC1ohuxhE0QDpeIzRJFW83szZvR32nBxR9kJEvM35GwFyQAk90tUOaZ/9lbbhSSnEQJeF3pzM+iMAGBygUD+OICcAR3FYdgbhy8fY4SwNwb9d09oGAQSFsSbkG9wRvaZEcFIRGWsdVEMV+ClASFHhYniZw6NYKC7CLYkk6JGU8i6c7OTITHjJoAhgDXAmXpmgr9zRhZKRog+c8EZGYLvcksFgUWPdUh3Vy1+GQ5ygBvnU9WCIhkxJYl0AVaZleF/EpdugCLBMDPrBqXDAisKESV6gHO3Qqm6ds56dOffmSC3dimBIEKTgMxfCQ1fQPMOZJlwUXsdY7AlgXIrWUhyaZIKmbChgL59M5/cM1w4CXZ/lDyIkAoulEWGINXxIdB6AQ0kkJ6iBlBpT/RyPTMY4GOUUQjfVxh7v3Kf3hAgiKoLoAWuSjXkTkDFCZDhRyOLlWfAhxdZTjEiqjCiNkNl1Bn/YXlqBFRw1XWL/5VB13evmxB5wiG5Jph30kfgnqAvjiAIiIhLSoKIBhWCgTgcbnnmF4oqvCF2cTMAeiDUrQofu0eGxYCbE5m00XEqAYBpVpIyswo4DAAQ7QGlE5I/7iZuqHJ/Q1O1XpnjDZTgk5DBHnH6eZKEiKYVcyUnqJhHVmFdDYGHu4e7q5p5kQRzYaNgzDOApACn/xmszhRLjlkojRTEZjCsTgMF52c276AH1UP9HQpXQzJAR1FcFFJbvXfVQ4hZnwjAp2/zdZ2I8KkCU42EUuRHUjZpXFYEQ7YxDNVhDEligGMEcCEibn8I+RoyTRER1FVUAnFS/PWCOiuox0YVMd4ACkFJXAYRC26DgDJ2IE+Z4utUS9FhymFy/ncA5ZNZFdoBJHNXMiEayW8QZdoqdIs6dR0WIiQBhqMREL1Wt9iRxBJUDNQxqlIatWozi4YXMgAa5fkhzXgpIIM4OxgGaXMXL+YYcRI37RJVw41F1UIq3DgBCmMFaV0IrDB3p9iaHTUy6HwWrXhQgoyxlJ4mCvcJ2mlBEaMYB6CI2/wK2PFRlUcAPEAqZ1EhoAUB5+eXamtiKw2JeE9I3No5B8AnmpAF2dof8lRKM4mQqUs2cbppmsfaQKAQs5nyUBNnokaPEOxGAFKMGOUyc5xnd8o/c+BDCgyEgHXICfWbhBeqRSF4Fa66U/LaCHrdZ9PpcDz2AeznQQ60Ac7LR+CQW23yYjj+GDAEAAQ2WZcZtBShMmTXW4N3aAkWEZVZCsd/BaaAd2JjAF5qFTBuEG9sc+kEOVTbUmCTMkvvWRkFchSvBajos6IuMhtwZwB7iAkum3k9AFI9O1EAkAxIAcCXQqp+KHZCldIaajgMG8lYIFBBAmL7A0g/Z8dIQb9NCy+gQhQMcHvAuNTLKUuYOYMUG8XtsVBrIwUJkKP+EKHusiUvOFCzc9bOD/uL6VHVLGAm7UFZaLsFPLcjcim9zRMdRTW61CT0Jgl+UjMOmQfN8wwL/Ga7I4YD1WH4U2VFVhe5FaIZZCO832Rv5nQgaaExwEBww8AP6SXOPRVHWgRF3EcIriZpqENw2ysMB4cp1bEKfnadIDRMsij7F5C1SFHTcrALnnVoPBwK0goau7UOt1JmhHvzUMGGsmkwwzgMHKISKUG82AdJV4LquoDthrGZfxMpXAKWiTWetxhptREywhggsCFYhAxT+1PidyaSuUxXLjw7JQLZ37s1+3b6VEKfIzC0uzBl0Skiq1YxIrAORgHgqgAwcgiS1hUBCCMaQgGB7bHK2bcAj5/0dKImVFJW2OeXSWtD+vMjKDwblF3FkC1JBfV4oFYCChYclC8CCdFCM/2xnWeITaeBJKZJDAuYp0UKTT4JyUMGZu1qNSPBnLIUKjdQVQm3AxcMslcRSWXFQSOmHOWwWG5LJjUa9yRQo9uimu5yXzB3Fx8MwflBSAQYz0YhmtQBhaUh4NoCP2pwDq66yHlp4+F2MiBcwVShrm7DEVCRUM42l59mKtZRCi50MNcYL2TKV0VGIFMc8SR6ikIbq9UXo/yyZVbEq7vLiZ1I+G5C/L8zMKK6w9DBLx8oMwYU51oxawYM+MvIB4sA77TBqgpIZcA9IjIC6P4VUBxXMzuMmq4f91cdVQebRCUnUKcaerDSEExiC4iJxJULHMznZA9MgSbuxY/1tvXesARSi0Lp3UMJ18d5Oo6fCt30quw9IALDBWZ4wZuQGmAhAcWh00dMMSskzNJOgh0Om/CFJoStBlqUkCe9A/VeU+0lXA/9AWgTFi3zDBueZAzEELeh0AfbkAnPgXvuYk00rP16ACzmccJ1lBjEwXdzYCaD1D9DgZCst81DUJAqkS0atffZPPMoS9G5EbBtKEhTouCy0ajLcpmXAIQJGfmEWlCxgAss0ymmCN5DnZtDJ2pOcSBq2NvK0+6mU7HaPIoFBNPosrk2wuslIeR5ERXr1ye1AKYBVkAbr/10UiR12gxEFEWkvKoWCWJ9Ko0vXacKSAzjAEFDLRbzdL3WZS34N3RwPimqKR2qPWm/1REAyhCZgABITch1DQBTGQyVRV2C4iZfBQPhMMbpg9Ob7tIBMuXWgDCg/AxnpGVD06z4ocOJbwjMgCCv4RdxeyUI2tAaFl3qbEYuF0Dm4nX/XRx5cdVz16MfL7D7kTCzWuzCL5R79mgfUWdRmJUXS2CoECu7MwAGgU2yfgDzsFRCUdE2lCEBo+EVhASIljEg31QJMWEH+CshN0PzRQn9o7cidKJ/JsEjs1FTuOlmnBiVwSd217sVcAiZLkMPPWUzw0EXLVMXReMLf1oLNY/1y/eSdNPEcNoLFMkmiLByclNhm39nsZSa9Kdea5EeDFNBfzZbfz9RssJC2I8Ivtxjo+yqHL40dNAoB3JiQIIee7Axhniyl/IZ/KGlhROCLX4RT3+LB8EVAGVD3PJFJ5YJ7Z5iQrtI7vU2QjVjyTQqFZF0heS9ysAIrGexQYF5/AgZSw5Qdf9D16S5R2wI59Qw+9B3TJZonKsyxoRR5p8gpKlKF6bpzqxUoTYCtdRg+nvqMdtUQbCebkJy1F8El9IFVL2asN8xxHSXp8QefFalaKWa2TsvDoREqgnoOVI4F7JSCg4Aoo0XkSMdL1FRepHXWKvIi/su34EJIcMxULK/9RuE3nJCRrtCN8afEVRUZ4UwdjC60k74xOE0AqIPklZWspMUGoJmW1TDcbvEd2HbeUEHvgs/ehKp/y62Xp8sHk4Ftj2vQbTWXMrhmTZCMdiqSTBcEAy4BhP9iZdDM+30JRTKdR3rl0pAQ1u7uUfd2aL2QHDerx10JIQsWjBz32di9WKrFOYbNQhHLLPgtPhRopWt8GYsJifhCx/J23jSyenJMavwcx7xUVDZ2veQkyPxGBt1PoZ+Qzl/MQFXCaqX9Qaks2fyITR1mMtreRteBGQLCnY1Zh7tGgUyW8BOM6vTwuuMVBgBpiJJuS76PmEtCQ7z1EX1hXFxMcMvF2u/L/vwYaXLWXpHbIJwcc0L0MShBQTKAglNZKoZjTjrO2CzsyLDkOY3O31tUw1KUy3Hn23QEKhsIwqCSMn9elVAAILAFAFCqgOivUJ2Bg/Umv20G4Eo0Ol9DsZUKJhUDtNynEMaxohxfHs5m9cC8LHA0eHgeBAIWCLQMDp708JZuYjyaBLa+mrSsup4mJTDAAgh9GNAm5AKoLloo5EIlPNRA2jQkXRhqVlpkAjTMZQd4RlANCHsfGQwOtAdwWVyQoksoBsoqwQygxNEzmsLCoQxLPUjJlCQqnhtmA5Yv1uHaQH98CFts/mTwS4L7pXoA6jD2wcqBSJlJ6+Okp0S6LJQsP/6tdmzilVaYqESuxAyHOTapsqD64ckOqAzE/NvaR6OPL30hBA3s40kKACJpeSZQ0bCQF4hNtmtIRyIaFQrVG2AB8CreUHcNZEC9YeNZhFio2a17Zy1PjEQaALyGJoNGgmExDABIoSNDEVIMESFSOG8MNjaq7eLVk0+IUXERLSNGVKJeuIkCr0ka2G7lUzoc6KfHw2TB5yb4+XeiZkLmDyloFbgPBfSzjjBQRU5SGu3Q34mErUzoxkqI1qJMR0rZC2SkF3s4Ga1i29Ddjkgt6M2qxOtmrc48BDRQ0WJSqLEMbv1qpvimbkyZmEWchlAfUHG4BGzwCTVwm1k7heNhcNv+rpyVlXmV9LWX+4vkDQ3oZogwKEiAtEpUi2Wqv87BgzQqj3BJBE5FGEmGCZgpwhLdpaBvBtqquOsVCO3ZZKKyc9vBllcUCEOg5KzQkI4oM1pJHLoUq+OCvKLbALSjAHtquNAunUoaI1JZxzD3eygDqMTZYsGwlykyjkiwlqnDivx5yG8Am1NaKZqFbpsiCtWosoGIi8vY64yRKmuCgATIU+YFDPF+ZcZ0n0oMsSoW+su/KfawKp4oXn/MBALgaUMU+FBScg44fGzQHm3RiE2wwQw+9SYQfLJEgChZmq5O3hlp5zIL+CJ0r0IZ+YCIjJxJ9LooCbOxE1gMT1KlODjL/UjMjIE1hbr6DLFE2SyNbkFPDDsjwsIwWYSjlOFfrmZNMQ7XckssuDYCrrUOW+sON/HpTEyEyvin3r8gsBNVBiCDiACkOUatTyQ5isy2QUzjEYBeArOQDmnEM8lYAW/8Tx4hG0vmAF3/e/MTHNNesxgkHsU1iL405CbYZad0BdSoyDHKKUVSXYmQN3xoiTp+FhDnKRyzAJSRAuFJh5KeGdJJUmxGccJdjJDXwKkeQ3M0CSVFTGUACU6GYtpwRFgNAvsRWEivgSX1mRsuGuVRHw2aCQjAJSJjCqRKjBKUsN8PSXIq1LgSYgIpRR7DGIKuprqCqrLciM9D8HouUKo2x/9HZGB9G3djurtl+RQ2NlMX1SiMvUKUJ876hsE9l8EzZi15E23qZ97BdQmmv9cnAaqlFL5tLH+QJRa5Ig4YqqsA6IWwsovculy9Q3IVHRmZPnpaUogZPJWtuXaXB8mREH+DxgXJXj01e4/IYq3YwTfGy1Axz6NFMwXA/G89ziw3VYC8fQ+t3ArV+Tn9y8yaM24GLZxoQjZ+ux7YxXeEZNHiTFjYBmNIFRnutEUdtuGGB1kDrcvt6Ay70pyKsiOVD/wsD92SCKwLO43XL0x9HnKK0GmTqePjCCxrcZxMwGc9DSjBPyviCMjTEgkivS5GFIgWWhliCAEskQAB15gAirP+jUsmJ4Vw4ogRtjSRClugI8gLgtMA4pBudG8+dpKCRvX1IXJMqFAxe4ZV2HCAo7jJhZ3xQir+cpEaw4gdHQIUJo6jGeHdShfm+qLdllC4if4zfkqxxQSLgYYGEkgVm+EQbCQKwjmiJ4BL92IedJIgduDlUx2o4CtKhijtXKE9tQOesHrqyL6zTQxteVaE3zSeTA3CiCb1HJy7cCSxy2Ukor9ijH33jgWaCWeMu5jLc/OwJWuxLOurym8sUDBKpEtrFtNdLEw6jfhdEIPnsNwbVgQSCysjEGtwnhlmJwwo7lAcWbFMFftQjcQi0haoWs7cvfamJm/xP5FDgkS/B70T/3Kxcjxo0tUz1iQgjIEoYbGIkvzFJPJfQmwiqoCAYtHGbjCzmhAJKFIJyCYVfbCVe9vAREYlHbN7wGxfVVJGkbGNroHPKo5Kht3IRiIuwGl453cjDVLlBiQEF5yZ5pohLmJEPvRJaewa3jNbUbmrnEaM9dUPKZAyLCkrSyESq4hI5vEQ70eiNN7/RVILecWSa4Jt+xoIdq8rmGg7yRpPGsyv0hAcn5eGYI8z5QZVUzDTzAKjoBJDSxxUuPE04joFy1MdztjIWM8LI2DyFnlCAgVmZq0gfW1CVxPLRA2+8EBO0xzDIPlEcG+gLsHBg2UJFi62qlNZrcPMNjHCCEw7k/wABmuanDqyBhZfd5mZKkwH5WVSTsX1i1twFjuvlQ2hMwBI7NDKGimTibV28k48kOk/sZAcqWeRmPtQlUdtRl3s8U1YgSzAuy5X0iqqch7SwoRXhtWYIIZtFG7SiD/T9ijFTpQALLFiTt8rXhGP1RukYAxpQdu2KLfKZGkBLAEzOaGHmRQwxoZJY5ag3tVZzSyky+VgJzzdjwH0KaQSl4f1asy4ybIqIH/kE1LZsTrL6BST8d8T91HOCcI1xl+xyRvTBKZdDmw8ucsyRfl6lcKy1Cnf5R7x+4ioV97VaYyPcZF+yB3RX0ada+zgmtnK4y3FYDBKybDjfpaQ03LDNdv+SN100p3k89aQeMPL7uyIV83KmnaQbEti1IzItpIwMs3tAgUMmB5oQ7FEkoPyQYZgyzY+LrlxiJtEBOa42wau1ZGPa0ZN5ZDLTmt50fx0RnPG5N6mhhHPldDIOKO1WpAcr9FQTQA5T1O3MtHYqgTZSihvIxwVH4Ka8TjTNqeCy2tY+jokAMYy4oKAemINfJjDNbMjeMQ3PQE0f1hKXlaxNtfP5CJWyaYJezAwnwMAtHwwEko5YdImzRvdA+okbrKhodoMqMo5ShVqyvIqNE9vWP37RqPvioIbMOHfBqQsHlypEsdVGWJcnjWBKrtoGT0LcwoXR0drZhJcel7BjEjn/EWDnFsFwSK+dibRnKonFFupNwA0ysMYqPCMwNoEtzSXsADlshEwxfJNRJ17vnIuUT3LzaMH2ODj5LHXmTm+yA05rl8GMNBo4wPoLPMiP8RnZN9PxwBHmp58v8mdWJyU42XF3asMdLoSzE9FuyOTtrgy2A6DZgBHeDRnLWsQeZh6739Fs9sZkDdcZB46qXQiwd+xmKysKPGjiEm4jsGFgynqZNpgIY8vTGurpm+bQx21XBC6+6H/ERK6ME1LhSEcBieDuu9ldaNfbpO+xn2/rB2vFtCu2ZjYu6bSHX6UCN54tr8DwFzcVrNcvn/m+hLaIsiPHG9Q7BDVamh8UEIQZ/0DsIBKQTtHz/W6IxCv5lR+/x81e/mkqEgbaCk+YEzGJlLPDgPdjixRgAAb4DT4YvkSAIUvwoKFQPvHrv7hyPs4iEtp4B6rwtwnEAXcIgBNIAAZAAMuSDgawvwswENCAAqbTu2uQuQzUwJRygP/rL/boCrZbP9LAA7iYjvxBQSLcgAW8nlSLCzCxg2kQKP7DwdjTwdPivR6cKpppFBiiO+trwXxTAARgQDoAAQpZESVSPilMQx1kDKY4lBWathSYDhg0gj44gQUkDSN0LaKYJ17YvxtMw8tzgOG5AjUbvQOsETGkgQV8NTFxlzhijiZgoigEREo0u10rpWi6nnzDL4QQyAAFWIDaCha9O4Wbk8Q/pMSC00GXoQsbKqyPijVagZtqeIF74I4lmkRUzEXIWZSXuQWtaBcIOoiXaYHJgIW7gEId1EVlFCBV7MXJsAMpsQdJWoFihAWmWDo0XEZtnC9VBLJetEbnszUJYphT3EZl1MFu5Cn0ICUqQMdyNEd4jEePiwAAIfkECQMADwAsAAAAAKUAugAABP/wyUmrvTjrzbv/YCiOZGk5qDMQbOsS6yCkZm3feIgKgywIgKAwEAAQhTzYCjZz5J7QqGf3AwIMhexhm+16C4ZwofjrLWfStBpHNWK52bDB2GgQj8ZxACseB5MsAyhrhIUaVHsFDQdxBokNP3kJCWRAd0JGRHJHgARNhqCEDpFYWmCYVw0KCUYHCQqrRX1ZAFa1lnuOQUsyAE6hwGw/pWBiqwC9Bq4KDAkNk8wLYoyKDV1Ep7aXPGY9v8HgOjLKB3VHWQoICqWur6t1qrBd8PDz5pV/eNw9n+H+GDuuZEkEK4CAcukQJNhSx12CAtBgWaP37Iu1Lrp4DMEngAWafyD/H4wCUIDRESzpFDxThUAhPYfWHI7JAo/SxToDAww0wsPKETI9PH0LGUqFgFJ4BhhgqdAZM4XzYE6idKcaPDENc97RabBKpiJEuBEYRLTQqKOMrBkccAVaS2fPYB24E/fdxS80nVG7ew1bkVqZglz6E3Ro2SijdF5T9HCRswQM1D2blKgLzLvE8k60w9UvLUuZCgj+a6RWUEGHoYyMI0sRrIVb3CqAiNfexGJywujkq6c3NtGY8HAq/Yfbx9Q1HOSxNmdAgKlyGTmVjDMOmFw0rblxtOe32t4zvQwGHHz8rSCGkYNY7WUlxDoSHbmWrGjrEHs02+Mlpng359HmfUVa/z4BkKXeB4nFkYo7K61UGWNw2eEGXnbMY6FiM6nVXW92cGcfKj/9NZwR6R0IkAD91VIONAvBhZd/N2XIV3UUfoHhQKIJgKMegQUHGGlhReKLiYcEgRQPAZQT10POfKFLf9lZtGNtiozxnYU5zbTVh8ThIhhPQpRI5GpqDcNYXe+NkRFJ+r2IZW1shgeenDd2Nh4eAhKHiZjIqcDmbk1mAdcrdRyQ0Y35LVbNm1RmGd5vWXbmxx88DejGT+cNSaRIKGLUUGPZuecHhndd2aapNqaqqKp3MJJHTphEcgmQ6I3ZKXARThJeQ6VmSCpvq7o5JaLBijfGAYLpARQSVtgipP+mfTpXpo4U8bcosFTyhmpfwwZLbFWiGbQVEMAh0WNxf/AZToJ6VBRhX8kmmqGNxIoHJbZUYvjtQJzJCRwQXo12ixXqAuMAATpxN1moF/2V2ZUV1lanvhI3Wk29Wu7IlbJcAezTNrYUbIifulilK06D5dumnKjuRueqGAcALKT9+XVOAD7IGm4lVoSkQndIpiXqrBa3W7TG/qq6KkkyK22lo7DqlDMuYJ0HxD8HByZDkqGyFqe8Li+G6Ldb9nVPlXWiLR5vin2l5RFbI8P0l0KKLMXBlmikmNB8gZvx32Jr/GWIW/4Wdq9IF8sqGV1+FUZxbNn9hJ9Q6iFffhg3Cqn/hqVtpazEksqbeKJ+tdxXEQXkzVbCjlTBg+Q4yO1hdZ6Zo3J4xGgY4ufWTUl6bfX4m7m+neXBSVhbX/fscaL8EPp3RE/M2qM2AjgQMX2IIYeUVbY3M79qJ70Tl3OQe4pgbAEwcvqGc8Vd5ytnTsur4GoS4OO58GFs39Xd1XR9OEqbfYiwuqrMBV2oWcNIqOYb4djIf48iHs149CP5YeRBD7MSPYBnpcqB50oGmduXbvEX2I1AZ1ppoN8MJz6O2ekv5vPO/sKGu5KkxTb9E545InaN5UjQErr40RXUMJKfnK1HfvNd93inLG08DWa+khmpvECNROEkeFJqmlq+pxVc/0xqCCZEUAFtZr/C+eaMxjNjEbYGwSzeqGHzAs80rFKTh0xQURWKkR+AIy5HzAVnIYuC88Cyx3uE5m3UE49AtmQJjbmMeEuEY824pYz+TcQZkITjF5hmRz8MIEc/2ALO+AEtYRBnD6/S0BkzQz1C8kgG4cuJKl/opt1gQ3ePkNcGcdQ3JTYCLGTYQwLK16wwHqIHxdndKhDJmo01TEBBUky/3kbLqvESPPULnWU2s8tsAa6Za3zhef6Sg2dBkySY5BYROKOvNIpoVymsCjBHRQsveMhznrGIkugYoylajDSdShbjwGLMC/hJoAP0GzsdaThKnY5bwBnfrHSSSmUli/+dkvoVNyuSQ83VpxYTxcYcBHSDQTb0SVCD5Ph2giKa+cV4FQQQ/XRUOcFgNKOheojJArUyY2HTnSUZZ4GSk74/XcptX4No4VzZvpd2pqXBpKcf+sWVmUbQe4pgSF54WiN68Y40wwQpWGpQVCyEMIS3ghSVvnKfOX1ORBS9g0npVzrd8agBTFshhpyBhU9h61uqtGgekDXGgkpgJEZKHUWpZrNaVlWg9hrVcHRCNai+SkAPvcQHmcgYJfkVP//LF0WNBxEDfMwAJejFZYP5m6SqFZhwbapcjdQVqRmvU+AC6iwP2c7EZudkvPLpjNzaJCkmYiNDFcFBH4kzaLrVhV//1ErbgCmrqAJmDLgFalVAOLGmvdMeEZpMoPSlre41hCQCBVAARtALO7X0PlCa5EvjVTbYnjUsHfukaR/71jhRVZFBqA9UZdSgySigisXKo8lGsxMAhTFrqXAlchu7SeHgM0/AFGtzUTkAazgHu/LdiqnapjNxibQeFJkMjYClYJosVbKOQC0IepKkOTz2TxTD5lKXelvQANF5zckCW0BcyLL5D6a3mB8dvPcMJU0FeHok3ZZIYuOEFQB2KtjaMBf7ChWmasc8/kp1gXzdEDZga+LC7vxkqCdO/GCli/LCJOoIZXpBT67OQRaDZdyBnpCEOXiljY7pteOd3SksbpCd/wFgmWZy2XiqbtUOEhYbK/9qq0l+xZdFvkMpncwFiHuwG4TRZoQOp9CnLqxv4aAawiuQZtEt7RQPspBdr3Zh0qJJn0/ww89cLfNoinSeZCuY3A2M4sOw+nNgvxzSqqiXsT0YTupizTSlLDqvtyayIp7lCNW+ikI3aRA0NH0NtVwWpBzDTQd8wNxvMxNeO4YpLky7OtNCdchppm2nVtdFO5jvi2wiz5I3/YU5s8ijF1rzhy0choIdVLpV4Y4vB2jRqlQBbkPAhZd0BJi49SgS1PYCKroNsNBWaUa8Eu8NXbyX+rBT1huDZsGsUBIWBlBpCeUSNmwxKQ7LFZVAIIB6qf/rg9tWBq1skkEvdnQb/Mx5STOSpot1d8or0JXPBhU6Sf5otAZKLDT2LQ8+Wh3NViOsNVUls1eGg5TyAMzdqQq3r4eL8ExoxA/Y45NRPG1Wf24sglM+Jym6ovGArs55t/IQMvhBzGHUFsCTzicN43zJhrzDQtiKkRMf3QU+VQEihlIGXV4kQQqe0s1gqe5907fwS/QiCcjsir5bijLCsOVyf+YWtqbCoFOVd2htu4KhDAUQT/yZ6+eYOHTdLFONmKs0nqgt/QYWazMgD4hfoYfDtqdXXf6W97/mHpNRBhZWCL8kVzZotKfH2bFRcMquC4yfgcS4N88WkBqhN8hdh6L/IGowadm0L9nRDhFBDTFzLSqBSqgkfFxQIncnIcaVYDUjMALTLO81Zj4mctywB7CnFIvHDZliYVo0TSvUVXQEEY8hEd5EIXYESMHkCq6AdROwNVuQBwMXOmPjJUNQHNowULKHZKYhJGZgfPuQM8wyIUukVO7HMC/RDuEXJVgyEQqQTDmCTgYwTCeQPHNxQA3xWvHlbO8lfwMjV6CRRkiyFh2hdEpXeD1RBhtREkuxQe1Deph3F+CnEqfCPQnwSWn2F6D3EIYRCVlVY/6RRPbyIUJiH2s3dtiweM6xFmdAeGdYBTlTQDgSh7dRM6WHRaVyhzplReJHU0DwPig4CYaB/0xpsiH34DmY8yH1N1eJWDjQR0rIoAT8oIbXVwZDJgYGtEXkV3pxtmniBQt4SBNL8TR9k2hWYGOvkAALcAAUYBToJBqmlR3a1D3vBFfU93H89i+s1w0Ao4anEY6U2FJgAG6/5YUW9BLQUYwxcozVAxgwMFrNeGDRuDqFwnFnInVOQmx4wjMatx3NEXtDKHQDGQNmoIuWWCEuxRigw4pJlGIG9hqN4j/lI1YBBwAHcGCr8A2ftxCyIDMVIVpBREIjhARoljAG0W2xV4RWh5C32F5IYS84diZWIV2no1EU0Y6zYU9JeE0Y9xcbORXfoHS/eJNQA3GyV4aop4FKMUpbY/8cq9MNQ5gMurFdYtOJ8lERAVgvKcaTvcJK9sIWAVkAC7AAzliU47AWqCMqVIJScGOB8EVIi9c6CemIr1eEKbk9fQc2yuIgi9JUPeU9YMlB8YgiiTUMr2GPIrF+g0QHXFUnHmJ6R2iDF7d4pUGV4AiJL8AERtJXHGNXm4FptsNZFlMoThEZn/hPalJtlHUUkAEZ0NiYoigpKFMx2pgnPEgSbQiJlsAPUukDS/ACBiISDoAb9nAHoMJRXKlWumcbJRER6tBy+TIXqTMGBQQEsdkMEpB/6LZOpTk2sjgaG+c8H2gayERv4qiZLqAux9l3Rxkug1KaSimMWTUVkTEbfcX/G1XECLNBBkQIAJCxAAqwAE6AJJI2UvWTSBQEnIzVXJngoGZgdXoJjqQkMsepFYEVBE9HI2ZUKjOyIq/QEuUGiqbADFQRYNrJAASqAE7QA++Bbrz1dwHUiPEXHIiJPGsYezo6oXqCZbwUWH3VGHP2VhYUFSMKFeU1JSj6ECp6EAxQoC7qJ35gJkd3c9SUbG1oTkB3Gu1Fazy6JQ8GhZqwKCmISZ7TRrwWnUxhR9bJQ/bEDMtUC62zkQXKAAcgjTHFFXA6QSHFLPuXmZqJW9W1ETI4BXmEpiKJguJ1pFFSKAbWEv9JnVICGc2gZjhTALCwAHh6bFeAWzKzmvlyLmyF/5KkpJ4OqghD9xOG5QD+QRX5oSvucIjOuUF1lBDFyCjhARkJ6HxH8Rqduoy4BRG/hoNV9Rmysqr54IiDw0fQVGzK9aZoWiV3eFPO2TVaMBWSWg6i4ySvAH2lhiIEKpt6s1/n6JZfV33PIhyCdykiwmpbUgN/NBm3pArP+ArNcEjAtggEKKmGaWXHSFNKMW3P0Qx4WgXPYFphoGKKUi9LWQbO4kSEBFABtlSGNQGuACHeUaAQkZ9SR24MMwmRgQAgy3dzgJ20pp0HhqewFAt8GBe+mC0N8D5CgExeAYKutkarQyCNdQNwIRG3VKBXmJ+Ax4rjF6kkWzREgCwFwIdHcf+Rr7CRB9ADzWgQojGr9hIx4GloYDFSuwCxn/R8t4Bsl3gDWOAQbckMxKoOhNMd92JJSBtlxlJjCiqsAsqRUysAr1GxWCssgoJRz+qKelKJvUAj6WcDS8Egv5EO/tkS1oqtKIe0n6hHEwElT0llQQCDz8gWlPFmABAPEOWT5oAKE3aVg4FMu8APFHG4yXGFKLpHsRkA6cAAIKtJ7JgQgYIvNzI3WJC5LXIAhveIzyEPaQM46GILlKJ6NuZozBoPU8EGwxulG4tXvZdqRttrSSqqxrhEy9KSGvm7a0kuRNCMuhoHOGGE/FehPPAGYYBJwum8BcoGn/saIhYLMhF4ZcP/ZE6hgieHarMlO4CRsQtxeyH0OHGGTwA0Z2A2K+OUuI5AGbaoqSqxCvIrwVQxvst0vy9kiDkVD8WKlA1rd4ulE8P0EEoxTEDWSKMzE1VbODF2B5vQNN8qoJTgFbzKq8LwHJTxK8/BsI5yrcGzv7kqt6ZAjeaKbsO3aJrKAE3bf5/EoDwkpwsMZgLKACqbOkJgpxu5AKYEFzbTTy7yXFiFmh6MOPsTE7kwinJDGw+hI+nACjqSOrzIMnKmEqRLuje7AlXMubPRA2e7CrEZO8hQXKrYQzR5rYTZjiVrGfoQTee4aLILvK8nM2YlfsQKx/EnJICQPu1rxQdxYIl2hQ+h/xIXSwFA0GEMaS1nY4BmpB+oGREgm44d03Py0UfI8F6EwqBa0oyZQrr2oxs0sQ7Duw4KyhmAaAMj0WEXbGS2wwi1fL1fWRexfHJ2gFePKBgvLL7iK7uXWjQp4UL3ZD9NJLslDAsjhWZ6MJsmcBahKhrQFZi25kvi1bf50nQXgQzYJSCQHAZWmhLyU7AKEFvwh5jGoakLIE23vLPpjLi1cDEcwiEz2wqnVpHVumJPFGVrVIVbUY3NkH8G8M3x5RuWuswCB7FEeBTE6jx2QJWISSLrnCO0YayYw4DWSyWDMglKkjmVawVxw1ijUAD5CUTf3LB+4Q4DArGJmLM4UsPYVf90PgAJB2ECjzONZbQl5iZl+dsesUG+rFkh6OMctywgP52fFSun0IM0DUCg0waODHY6gmHCMNQTvYBJCdCqYXExL3YzG2MSZKRPIrpMTac5LXV7Yb0nzkHWTJMSIIQXACAPJZfXkHN2HhZgn+YVtPEMI6Acf7GKrdwwFLUIvmQhDAGz/dsoYZA+nkBvO1ggKJISYsWravoFe0vFqbs1lTxNMyvXkNlkIlAa1LJ8hIRR18kFLgUjo53LwLYHT5naqLsnra0Q0VbFeIgxfXUMF1bbuzYpo/vVXtGECOJqMzrFjagUBniaseHDrKkmR4EkRYcJD6CdqTNkJEGRJneJoIv/J2s4ijgiRKpKlkX4AztkDepcJGHhCeyEueBy4MEU2GtaEnVkxmwzBxJuJDcaBCIhEMIWYJoUuig4bR04dLUtcdSXyUmpd5q9RgjDMRW7oPalUGPMEM0YbkpkKRl9o2iwGoBBTNe6MVJUEfvwoLaXCSOFnaoFw6AqJwZgGMrxmEGhiQ6TTQ2UD1GyqKD3WYlinR20c3H5g2HCKaXlo3GCUylSJYylJyF4B/g2SIrgtRqpY5egHPcxMKtKCwFITy1uXhfhWcgNblI0EyLEM3vCKbKLAMBLU2D3Mn5uVIFRCTHgtkiQMTQLsaInXRPm5BvsbHldVQ31SNWg5zs0dYjj/2zg3d618t6DrgDINGTFhaV7ZUe+zX852xXR1lAQG4TW5oVGShqCpekvtiPbfB2pEB6jvRIrx0N96mr9V+Hq052NPYVTuSR8arS3BEptiFypu+itU461TWVZ7ejj9H6d08rtAclygizKQEVOBhegaRFshgf2psnLzik1TC46wtUUo1K7KVOktICjSHjg6Gd84MKfesuekY30062LAJe+AY+m8FmVpDTEkEbv7t/fkCBCwB3k+3d9roBw43FuVqhewc8JiZAlF0DvIy7wyjgcM5O3ORMMcSuWc+5dwAXB5ZPdWqM7d7PHodn5LASKOycYIlOBN39AgbyglJlyvXDoJf9A7pPjHoIUaaMd+SF05OdH53rc2vuWNIFvFP4jV2PKsrsOUekaAU0n/cF5tfUX/OB6s04p4TzyabUzhDYEfee2X/UqDz9tWrGw86DnC3GO+7rNpJEzMqiyCmBS8TCHjxLOQDHrnNBe9Pc+xnFxPEJZiBganu05P7It18BYFOLp3zEXmtQfDLlH5fgDSj6/Yl+mI3lzX4iszQ05F1jmP37LUJU35AFqYoNEiDaYsPJv/GnlefjD9SELcg4ESo4izbizvFLwkE4H/lbkkJiSehNM6NkNyHBcwDRG1SNhQj6T3bqglQu3emFybTRdk4JdNxvvYL/8f2AVuK6Sal9UI+7/Y0yurubpMMWQaId4kQrKIxBgyiyBtho0Lbjf4mjGJumsCfNSCwOmAHgBobadJ9cfAShpjUAT8FhQxoqBBtDIagNoLfYUxqBGwUBmYQIGRkOYY9x6JRpDDAUbw4aU1icuGiVUEtZqtD5vKoMeGQCcnRwHn4CsCS8ptjWjpqEYmizAsqiuGqamnqHAnjRJTi+tgrSJM6aOFbcN0Ue/iYODVTsQDlwYCdrHrECAQp3DACUtp6/TNccMIRibX0pAzt/OIRpAITzRaiY8t0248IyY1li/XdqSETzaW9yNA/bQX8JgnpcAQAKBgkDxDDhNBGURNCXKtE1AJtkAECbMJgtn/8ahGlWBAjg1rSyq2sBKTK1ZuUSSG0HBQLxXAeoFk1GigLREcR4FzEDJ5jGGU6Rcq1JwzBCHYlxNezPuTaiIkgAqNWUKjzpWIt1c8OhHhT1h/PZY4tfBRCyLGZRIURPNkoyDiaqgsqjm6KslS0RxJJZG1cRIJzi+YEUi6jtluTw0IAMUqw4hI7bErEP4CM1Jkq5BiYuJGDxToj7gXcSkR4GWGbu9YUpaaSiAVP3+BRE4hUXCGJCstCfDlBZid0tKBaqkjK+4OwO7VWrNduF+M/hlRFOB7tAjTeQQAZ1ORUnX7zgMxrW6wWFh3eTa9juz3KRoOTvuHomQ0logL7ngg//o6jmkV0qS6mrXoR31qMBaJQXCwlIngQPAQ8wIKHAjgoTowoGkEk1sk4q395x4Yq+GSnHLQnKQsiaAA/DTzLHMUrDDmxVIXKOBp3bbowLZEgggAQXD68AAsviC8LGpgqgCDyIvNM0XG6JoJKaXlmvGQhkess03IjQT8QNtVuEONja6I+E1I7hLMMcHhilJCx7X+ynIJmIUkKb4mmiwQSHi88ICUNIETRWIthCRC0iWqsubC+UQjEACUfCrA9rAY4KEuIpyRBlJTmmMug0Wo4SLOrGpMAjlBKqgGSa7mK++iCAKklBZpjo0LNUAi40YMnXEoJpA/ADSKGII3E0gmHz/GbUKYyTLh587pVPDLjKaCaSPXokrJyr2qP1nNZpKGqFRBRPLh8ErYA3IROcwImqsTmwiDi1APBzgoQFMOS7KyJKD7gWxGnLhlO0K7VK1RcdZwYBadzjkD9w8a+Zf0yTJVSBN1Ap2SZ0qOagfYrII47M9c/OzoCtDPim1Ivztrl/H8KWA2xxJbXC+1zRKqSwhIzboMpg0mNPiKMapYeOEYvBNhgMc5HWphprCDDZWshOpiBhaLLiQg/fc504VHYvORIcZodeLTdoFluedfRbv7IbQSy6UK53qAaXWctnVuc3qrlIDbVnO0cwJNFn4x59eKVchK8iKGLQ6KyGAgAYT/+objS0aWELKZudFI2V8ddWOtSG+rHsGH0eYOpiqSRFks18nxU/DPrPwpJN+Oj1rgH3kzLiuRkBezN6tJ2HW6ROCl6NAX2W7sQu+GB2d6h4aEGCfJ1qoY03TbKOmh3RJ6bTOxfJB0wk8E1pMAKQwwt6HecJw+EXtWGDjKURjQCkWgpenOl7gNNHSpS65ds6uOckGG7n5mXEqQUDIWU5ISRtSmmhAi9PxilKpuQBpbqG1kVlQbwVzwBdIkTNfyc0o5XpIhTKBK9fVLC1A+F3HBKKKKlzmhapKDfAO9SY3OAQ9g7CfPYYRDaaoQxwpGUdcitGgPUFBP8eiUxr0V6+ylP/vAAmRAFou87vhnOwf5oBD5ipWgw2ODlVBK0ACzNgGybRFICW0gcfANoR2LY4Aw2qIEaEoiCkWJBFYk4zKeMMbfhXFPs8AYw+xMgxm6LE9XDPWXNTAEORRiGg8+swescAhfGAvV8cRxR64qAKR9AEwvCBkDwx5GAf0kYYTCQvXUBWZTACiJk5wXD6OAzvCrQsbpvpQ0lqAN5PpCixtUgshw2g/RO7RiXeR3lIE5UihuccXcyHfHjchBSz6pl25co7O8CXKP/bLS8Z7pKcKeUpUjqiFEvDcuCQ4szcyUUP6i0tDGjE0GkAvMtF8Y+Yo+KI4/At1EIrSZJ6BTgWlMgj/aEqClyRExEbyKCHPSwQm2FUhTMyJETVoBfcyhQTgUYo57LmITuY0gGOeUqE64QKLAtY7cnUPPZSJSVk21C7KLCFhPjHIF1DEShEOEW8kdYFsnjCnlKJzpX56gx6g9kzofOOaBEhbJPboQSoQ413iSxtalgNS2bThH2pU0xr40tMGJRWhDpAXDVLxyw9gB6QNeydL0VOzMOxyAsWaxj3/KVB/FSVgNSSbABA6tYY4UXAXUIAC/jmUtngRnkKrUOywORBuvEVzGtkiGe5Cla+QaFS0kyNKD8vBVHQCNRRIgAJMQBM11nVmkEOPJi1BHG3gpxxqTJ04zHWLfSouraed/xpbAbgwq2wmi8J8J2jOU8QXkus0kB1r+x4HXahJ5qSmJW5xLwK7j4zBB2EFbIssmITm8AocgmpLBXgxwbGKFAaKfMtkhtvd0bG1MJdpDSzkRhqMcBYJ7MWLK9obIdfIVYQNOxLtSKtW/BqsJmjoCFte9NPHcnZSznRm51hplYCKS3Xbwc4InUjaxRk2wvaDVtKEGlRhbi2y/qvhXDUnIJJO5XRN691ossA42ql4xSwuFywkwsqSxZZNgbKgOaJqXtjgcE+qECJA1HFX+0ZhyKcUETMHTLLQgmkZ4gXMkltZYSl38bNe0RqBWOi9nW0ZnRJYZqBOEKgSC7h/dx6iF//nq9uxtmjKTF4FE1ACvtEiVc5rRY2kAMJOOUCEqNTNTqUp0B/eoGA0Vv6VxyRDNggvGpXlm2CFyclcCv71J03bjA9GUsFHgCNysuEknO8rakbbhcoADjGTI9SeLhnPVdJr2hKc6hzVmoNeElM0rk/rgFSgSmA3nsqM1nShJP/LBW180Gt9ZQ2jVKOiJw21sxOqvnpx2jRgtpGrgjmgd5hQUVAhUGgvY7OFNNvc+DXuPkVKP2K/dkS7+28RlcsU2JiRO2GNRPmES4By77tW0J5lgOU7VG+rNw7bhiQTzghsr3yFnfyjhPreo2+JR9gBbC2yUr60AXZ+/NWtPQ8kGtD/2MFADQCvVcdTaE5TYKE44inPb24VgihO22IPWSoBzsXKWgYwwARNt1EnClQCE/TnWK1DsQCGTvSiz7d7uOAFvLEjhqYrgDsytEACGIAAx9pBAQxwbFOxblRNpBYKi+Mu2J1NcbGPfTB2sI4diEGL1qp9Aq0tUV06oAC4w8DtCgCKHSCEG29YQeh+JzrgIbZerIegFrhorOLLiHMDz10Bm3C71EdeE9y04xhyXDnnwb5yIumEytoiQcZP79gUoN4Pqu9V67/iCy1k4xtd/7rtn51KbQhCLlqSOeIby1jXsvbmCECA5W+u9ucxzo/I3rzzzV8maNN5HjQd0LwTb/n3pY9h8qDRgI3Y/w4v8L325+d/mcLrFCUhJCJIvF75vpYrAMfiO/IBBcAIP8Zpvv6Ts5XrlRCIviSRBtNpOzgTv8IhH0zLjIrSPwiMQFzDvZOYBVpwiII6qsT5BT+gA/OajAckQRpMqChxCKloAFrojw8EQU7YO0AYwRrkvJUbBlcICqcIClWqgdLavyF8wuUpwnkKjmeIApQqQijMQn4rQi4UwhqMAAAh+QQJAwAPACwAAAAApQC6AAAE//DJSau9OOvNqftfJ45kaZ6oCTqDMLxwTBCvIIRpru88+rm0AWAYKBqPgaFrMGsOcL2odDr6MGnEgnbL7W4NYPDw1YRSz2ieYyk0aA+NxqEQTtADYUOggA83unoAAk4OaYaHHVZCeFxFBQp8fQkMB0NEewUCRH9GblqBVwRmiKRpLIued0UAeAoICQBurgiRmAkJlXoNdkmXdHpJV0+lxFJWAoxbcb2CcLNyB7N2Wgm7Cgpy1gmBrEmOdIJkooXF5SosrAV/wGAJCge2DdLV0urZ7thw+HnAzIxJQMaZG7jhRzplBprJu1ZgDj0Er+LU0xLH3Z+K1+Z4KWCpCBiAhP8IipxgJdYWR+4SBKDH8IBLeRDjwITkyJqCauquTVMmE48lVh8BiBs1shQ6TJEA5GRYDd80ZzElVupUAN+fqjevUpSpNSnQhIOukCtKigWykwFsANCnEyPNWDAjblSHT53dI1t3/bLXwN+qQUHGkj2zRggXTkrtOT1wSyXVeleRUnRntxEmrpI5FVG7mUkNAIIH9ziq5TLlrU7tbdyFc+fquYfXeVqGyZINgDFuiB7tInGgybd4XoPkmksqdd4+JpNMp0vFO3Q14wGoiXru0LtLOCBwsLTSi8H50GV4VXmW0sy9RD7O07n0I4IusXmBPXuHQSaBseZLe0/FadwYAZv/F+md9Alz36AnIHXdaCIUDfXZh4FZ3SThhjX8pRfHgAQ2AltXzjXniEd7GKHEbb2kFUOEEpKExSovzPGfapYlaCCH30hWYGkngdFXidPtIdRP3bBiZFjDtHgBhdRpokxwkZnY3Vw6wrYjj2g1pBGWtTlYZIW4QahkBaTxUd1Jz4mY4oBXciheFzs64oYedzHz5XREPCjKmBLYYJgR/eUV2XkblUhloTdaFsmbNhr6nm0oEhmQAGO6cNuidw1B54YKwvlmh0B6iCWbPCJl6lkJgbkKkbYJ06INDiJhVzfiaYaph1VykRimpiL6Ka+9jlhLifFVJ6WfLdjX20GOpFNh/y2/4gqsp6J2iN61N2IioHjaIuFlOnbCCsBuveEFLXxr5vqroYl+aqq22Gar47bnIhEfkXbaNi5ZRwm4YagmFngEMNwmym7B3boJ763zerqqvileAlpR/TK7Sj8p5hpqP1zWu22CC1cL57tZKggfpD9RVwSLiFAYX5D2nExvjosuzO6Cl2S8YMnR+oqtqSf+tEiK4k5sjssve9OTrADXy2iNuKl1J7o5jhjy0z8LeEBCQgIE0JesOKhbMaf41Yl/NZdqqLDpEcuZucOaLOtdHRssdyROrpJWWmoFYmcALFNRbhE/RrzLj8PqQTDbXCb9bq84WsvlzXED6U2e4hqr9/9PxBx1UF8Sh8pw1XwUvpmqpdEJBnRffIGglbcy/HSzgmTiZXWYDxH4aEKc503AeFke/Lo5L3j2qhj3oTiVl0WGY6hKsQ262EXnabQpBGiiiRuxmv2x8TR/Lbx3RGAcL7R7zfUvvCBLyzgf8bXA6iW754BOdX5zxB0ycFuLVPHD8oXNDHaz1b1GJmkr2BYSI7rg+YlV4qqfD+TnH9AFY1jGq1EtBAgf/rGvU6Pi1sI8sSWeRIlLfcEVJvL3AkF0TwmWkKB2sPAdLQgiAANAQhLiliUjnMmGMExgwwhYNx5pBG2qIdm1gGa1v8BKcy6MIRUoZIA/DGGDxfsetrIovm7/ebGBIBugAl+jji2RLACcsAzBnqg5Bl2Pdy20IhrjcC/oocWLxesI+r7XRAx6g4BV0gin9IKcEMauauEImg+lJsMOBAFV4NLj7yrnLW0FkYfBiyS4fjdJdzVqDyXkCqfCeMduSW0M/DuS9valhhYgsYqaYMjw+Kg3mYHPi/AjH/xyRitPJow5V0Hgodr3LAEUoAXGyp3uWnkp8inFDosT1q00mYXgbatCvMxhLXuRlMeB8BvBvMi/lFEqD22SOyragxhO2UgMILOGwLBBlHCZLWxykGqn+4sPK+TBHa4CLcaE3+MMUA1xHk5aRCySAbSpFq/0pp0WQAcr1peFq3RH/5rAW5UOaWWkvzTIWUdARiACuje09ROjhAvnfug1RmF1BBkuBJIQlgBRCiDTEyOakjRHxkl8bjNjb7uNAZLpwSsK1GpHFWgmUhhMxaTQQGiEKqP2QMF0gOUnNZUAhRryjU1+zF1e0agOgZeJIhGVqnkrasJKZxJuWpBwsREUz4h4EkH0oxLWeyMJkPkGnEYVfYAVXsrGajZjDe2GtjMmDi1nwyNopppXjN62piETXkTihIb0D4kkFsWxaUd+ZcSpotoHpKKqqqc665srg6GUIXHkLH/kyB5je0WkglOl7TJkZZDDiqreawgngIF/cjHGwDbxp5wEk3K3N6SvmUlIZ/+B7DetZkzJ0uugle0K5EYHXShqrp1bzdrB1kossZq3e5p72yJiikOluACIlmtAL6t2XGBSdj+5tdGifku7jgagBJbiakrNRV+T2fNkH20Q7lyQTxzyz0lC0cL2GpuJM3LwQ3kJD+y8YNffiYFIMtzqVKZ7yPJKSbkSM9bgVmuJhT6YqgwtrxxXKKRdcRcphLQGiHpG498JRQAGgMey9KqB3tCFWFVRidNutsmOYC6Z8iECZ+Jju83sYXtpiV5Ac1bOUu6SWVWREX4JRDMF1TEAW3sicBPxAjQ+JSGsmdt4dZavzURqylHmmz73ZrvnmqmxLF2iJbxzFtTwBRtuEs//NiyRw11+TQn1M8seeOEv08XrxCl+m57deK+hdmNoL34tRxpt1J1ezlmwKpGx3nS4GSHUZrwkaoUM0AFX2oVrFaTkHZPWEb5NmTODe1m5QF0E+UFYm5+kSJYRy6DnSrPVrHENbQjEwKS5IctHCFzZ9IKX9fVvgw+Tsva81Dsl7DMYyOhNDbDA4jAG7BMQ87UxuWZVilSlsq45mAIfBi28ZnsDS5jj5fhSZqgJyZW/FVdnpCzuYmuihYto40YHXdaTrJIPyFSsHt2DkZ1chlpM8wZeZ62BU3jQWAi8EtWMRMEm3W7BLEclg2NbqrApQX4KFlG59dA7sU3J3viGhORG/6VDTWzthkZg0Snc4NrvLEO3UipvsSQVVHEfqbkoNatQLeWk11qye8Z20GEaoZdo77Znzum1DUUKBhbVwOvgoMsdocbrPL3TzrL2NdbBt4TshcPvV+363uZUx1F3b+ySKegthC6ysd9bWCpBFRgm5EqwXDvXXcbjicKtcL49OWyr9uFnLIVwGMB0lac7iL4wHisOIZA1IGqbXSqSwisOdTp0oPx3LJQQubevlE78mwsXjOeOJsXYLQwGDEad/B/XtuuEzlsNkKEVHIeTLqchlTKw0Xmrtv0Cbd5FlqcyXoPnVOE/8dPpQ28k5reB60qgAQES8s5wOOiqc/yygm0d6P/DNMUiiTZ78uULHOEbBYAdklYsJrY25fRTqOQ4QrFaA5Nlt4EknREW4VADvjZ92uM3c7QNPic1awUbincTQ3dZcuMRWTAnEaWBP1RgKOVjMAVDp7RJYYUsY6CBETgDNldVLTBTrac0cZaBHoR2IYILNvE8dNNHFlIeFqBwsDVRAGMjwKBKHYUy48NaOCRcEWh6XfiDQOhyXuIPW5EiYcA01PIkrGGCiWY6diYGVbQhoaGBaYEet6Bvv2QE06cvwwdkCriFnVF6ZKBNMWB6pbcEanZ44tSALJUgXaF4GgZW6+J5cpIOMiEYp6AUCXFtsEd0wtMl04cELohMxRZxMJD/g5bCc6EgDEfyg1xXUs0zbTxkPurjFmlURN7xTwJiVFqAiS1AF7WVJvuGQRukZr0QK11IhCpiiKeYFk0wA17IdWzAXOqhXbTUJveWGo2XKA+XTJiwNRTAYO7gabrAKT1EOw/jcq4EU0UQBF+IijJQA4WITDDwSP6lTotyIc8xM/qlW7igjXaTQjCCev/kEg1hUwOwELB4UB9kSarWaydSbp8GccK1hUBQj+NWiDTQPSUSB9d2eW8gSvSlcv7HGMOxYeVVHbCFErdwAORgFoejKQCAX0PkXD+GOzeXcZ82H222UPNIQ+IAjd2QB+AEWNGRFyYzMiHyBot3DTs2TO61/0KsMAcu8ZJC0Bc1AGfiN3dkJo29pnykKA6mV2PzWI/PCI3bMyfKMUoMhERxBjdIhZRMaRPFUSB98QcDIFCxABdaYpUw1WZJMGYao2wogy96kIo8aWvuN4+kJxAe0BysBjrogV/9QVj2Fht/8I86kTpod5cKcIw51HstCY4P0DdIxwqN0VIKsgxGcnOoZ1ZgOZZmkhtg41lLMgdFeSs5Vpn90xWP2JSMNyAX4ZT5EwsJsACMQWsP0AZw90zVQErwQke1FEXDp1xeuEOvxUVJEGmqMEfFswvw4Hs6pCgb0RgnaSWEwxKOAVLuEA0HIAHcIQ+exhHYyEN3UiQZVy5lNf+dDRZuRJYBDmBAMTMiFeEfzwmXv8cFjOEODPAOAYgVjoEMeOWe72AFK3ENdnV7IlRm/ZB+XDQfJ8VwN8RF4HVt4mkHmZkh9RVor7d4DfqUc2EReBBda3ETN2GhDNFhNpiUOcJGY2gvqQia37KXY3UCDrCaHqEMYqZkflSNWnE4CtCgdfkalMEGlhANx5kAFqp8R/ILB+M8MkF1UsM/HTp8d1dNOpRVJtofkmkHKQFurscFD/EKPnMSdjBuNhcNC6AAC2AQo9aad1hc6rQSzzk/PqoqDsKBLeRHWfUAR0pwhBOYTWGC/ecmcxqcuSUeXwIOxsSnx7kGEopYSsGG0bP/GilBWEL6GTOKiMhylVClA/AwR4hDDZD4VOJFgrfAAAiAqWwCFJoCFo9go2sAALcgqvIwDfomp1Z0WkXnGesXka5kjgeoAw4waXdYE632pn5UqVvQGLqKqcexQrsEFnhyAAzAAAvAALcXpQvAXAmwq3aDFHc4P8WjHEhAJxmYQ6JUADwADwuxKP/BoLDwR9xaRkw5CfC6BVsTZDoyUt3oE4/AAJNwAMjgCgqgKQEQpdiAUQZSDfnKRoPlf5e1hXF0C+DZr5O2sQaaFToxngHIGhCBACWEdv4xVBq6rhJLCTn0rbWlsWmjI5MACWBzL8ZoCeKHDHaQG9GGC/26FIgj/xH00KCNtyPQcAsxuzWJtk9TZgBROrE7u6tp6bMIUzOTAAuDJSmhAI3yUId9ASv6ShxaqgYScRM1MbHuAK+M9W1dsKC6SgvYaGf06CVcm7MUawC6mgCV57McWyJB64Y6pByKQ1AMcJUq8U4EZaMKMBo5IbWY4ApYAa9FQmA4pqC5ChGHwi23N383NFRA1rWU0KkGMAP807UigxIS+zLmlo7ROQktMI4t0A43kRKai7Cf6QhRWkUWu63VqKSs0bftwj7hqVhnYQOD67UD6Q2Ke0h8ULZ9OKaJ+GANwACxEKVT0Q4S257D27XfcLx3i2huYo5xwLem6yYXkgCKZRh25f+6B/AneUOslDo7pcG9IGp6rdoEAjAJyCuxq2IRlDEaaLSZHoHA8sC5V5OpDVG6tCAiIXQZlGBnSlC9r1sVWZY/G9wFGhswrWlPgeAGk5CyiKsW4neHDrwQjrEH5PsIeHta5/MGLoHBMzsXyHsTh4kHA2AAezqxxrSrzod0PzswQQtDlkl0LSwA8tAArphkdjEaxBocBKoAsrCrqDphoxK/i7erPxwtD0yp/FPER6yzBQAR9ptKLSUg5ksT9jKdrJKxS5W0dHgVcbsDgpCaJiJ+F/qZUrWNf7CgyfuyENw7bPwO7zAAB4AADBAAG6mYlGMop0qvZhqUo7q/NiSPebP/B41KEkKRciyZsoyXGcKpJe2rMNQgpc5WxBkRyQ0RgeGAFZemLQrptrnxQPfXrYjLCPYnPwOonPbjAhcRW2VXF/Q5VurjysMBox/zpnxDfwS1AO3ZBg7mDXVhW5r6CJXrhV/pSTNpv8PVhZqgZAmwAw+3Pr9ROrAHpNDcBZrJhojiEQRVYYNwegT1j1xDB1hGrFK7ocIjfih2xwySl45xEhknq3/sA+8skPpROikFfHNzmfdcHGSmEQpGHf/MGA7ACpGcJ2L7RfjolLjrn606NJHXKhqoF7eQAws1BNf6VblEntxKe06hFaKVFIozb9FFvf+opRX7CjjXuJl8IIeT/y9PBIZDw4nL5rawcji3kFUBSrmOO2C7orerYdWb6QU4lUJMBwZA9lrG9I8uSdJgC1M0nIV8oAsey3UZ94Ox4C1a9tTrlq0NYKQ8N5PyJViySjgLS4DRsiH3wBCwDNQYS9R9Wa1PzD8wUcOlxDV/4Ms+N3EMhnE4R4OIncgmsJfUJ5AWc5kHMp470sPODAhMJU15yXtOsjVb8wH++5lufars45AS9hlfeYw2QAP/0EkmwiMXgcyJYGXeRjLr8wlNWo2qrdhktjY+lEvz2QBBRmsjjQ83iRU0MVWMpZfFo36WAian7Uz69geJkCcCN1a0sg6Ftq39GGYASU7SHXMuZP/W+ZF7I70L5ZLWdCvd0nPZUBaB431ipdXJV+kvW8AyI92as8KsHxMLc2A+5sIpjLGGHF0tPoEMgNlec6LfM5lOBahZ4JM6XbXQe7gq432YVJ2DaxFNJWIAoWEQ/dlNqFpiXs3Da3jGNxKenxY9thYG5CBSQqGHvCjd3OJ0G6iqi1R/LI6IOWldE/cDybcKwB1AUcc+y5OCc/ESqZmpmRELGtpccQ04fYJGDqYW/NPESLUMUA5BzdhipEfAi0ow+kedQoMf4IZaltNaQbbV/QgH2pCGntIXZg1daXrmvpsOyNaQWITLcA7lThR4D8JGd/OJxOJCv7hyFrOCo10z/ff/Ejr2oHGQSns5NEZgyvJAsQ89Sir0MqlCPchCVBypgnR+efyIMHoTVsiFHJujr77OIaKuYf3IyqZOf2CCzPtduQ/3gSNp4z5hHfmJn72DWgT+drfkRy+D5dgEzb/TaLe6twEbOaJjJqKdMmMx0nRAbLQXl1h0Fb5MipCSXk5E14UmuqcjcVeHxyNZXoWiX8Puvg+KHhE3pIJxJ/phso3C7d2LjFb6FwzlhZ+xoQxEjK31WjkEm3zeWp/oJsOOE8OkDD5GiDUoGLCF6nwxd0CqPRIJrSpW5XMOcXgCUs8eNi33NwbeLJiGjYIumLY6jC+H1kRCJufcz5bIbTwFPzMl/5FzTlQ3L43eAGQaNVhEQ+C1hTzNLWiq8tMKqxggb9Gc0FR3kJc/hndYRfR6gXSyClaCXeq+lj1VjudWp/Nd5189p2YEeK+6xWFrjj4X0vX/cYvVJyq1wwQOV/Jo7+Z/tFK3BCRa9sviVlUSlyof3E1DosOlZDE18SZVVBqkNqgmsbeCbrIlPFUCHQszwHo1eAGfXu251pCazYEsD5jVyQyYXYQCyjOW9CxK5TS4GfpvAmS4uVuu5j/X4l4+mQmdbQkXMFHHlErFjtJqnp8+qpItl4NV9UUNsaHokbuQ5STziSlCBh9Md3YNkV2n65Cb8VpDtfz/ud+LxdnPYk1HcP8Fp3RumhIJH25AskGUx3J6EACAGCDMUG7gMusvO4oCIzl0JAvjOBo4OVd63lBOAIxB0HWJ4zEkPhwCQ2AwyC1xGRyoA1gZkjXs6XmxbKHcC6XLBBlOFussexKEAgbA6EOLNdZ2WjLX8RV6PgmdosEdjSUmJR01FCnGAphGG7zGqBUOEqs0MxwzDcwzi5q5LDAuDTmshgQZljVLqS4AxApAHaFBIgeqBiUCCYIMmEtKlKS6YVcbryhHtM40lg5kLaxRvi7PPJKYquQ3PRQJCwqfH4BbXKPdBgCCJYFHSGLOeFXX4Uu+cnFxzw0dcPxCjVIjhdhAKslisKJB8EQnDkn/Yv0Bci5dkTaGfEnYtqoSo3DBeOHwAKJkB4qBAJm0gOFGvi8aQoGYh69gNhEwVOHp1OrVDF5I4FiRtc/WxVwC2LkDsk2YGy9AvgTw4eRCj1hXy1Ulx0ZpH6rSSrzZoqHN1LLTanSqU+DAFVIa4I4tRq4WAKS5mIiZQKYtzif8PgTq8abvWQztDh2SxUQivB5mZWaQIBFFG3CR+Dh0GC+BChIH5uTzJ5PS1gkW8w5pU3RCxoU0a25Ive81oDCtt/4JRBlgBZmWvchMuOzl1GytdMoQncyTHl6ILpQoV6ECury6+hI46zQBr0WXKatMnRtYbiAVW+4xQOFNBTiIvVAR/wvSvmx80HTisTZpER76aNsKkNVyaam3YXSKiRkuxLmsPTH0mS6k1GRJwj2qdpiAhYw2mIwuLUIKUa03VNCpm5/Ce2S0KV4LC7vVZiphvXqsgWLGlirAgTeUdNRHh8UGMKMHy0oYgEOyEJIGJrQmcySDNEZQRQ47JuEMogCeoqK6HioosAhdiKvokVV+WkYwwibyocHFKDgkI+A8iI8EHaJwsEiQPgRnDv1O9MfKalYszgOqBhQAxgIHylBG/pgkCY3GepMAK98IC3KJLXdwD44uzgoson7CoQumPHraz4Z7qoCLKjoNxetLMD/w8UlL5iOJsZEYywGIQwhwZwnupP/YFCBTwhgvK8M8/IiEHcw4NVDn5JKDgwZ44M0HRAvUZcnymCU1LT6EbIOdfajC6k0Kfl1TnyTgK6UkqUSNAo77OABNHlEaaggeT0YwxpAK+IEVFwckLGYdmmDyFAx4CPMUt3eZEisQiWKBtFOOaKMkErnUUmGUnpLzEN8R3roqENUGzoXTlYbKUsEFl7nwHSEteLPFX6RTpKl3OYpXTjux2TMJiOJhYRPnpvGzBWEFVnmQgiX68AM/DZJZIBD4GodLDbGakTLgGiwAiAs5OnDjS5y5qbNq3kjluxFxyHZgBzZxcJSqGSTpXTbrLIC7xVDw0cHU4jP7BmxE/GjDVKn/qYIRK/DGo9pKWHg6nbr3+HpyYfyZLxZ6DyNUiSDjq1PsBsM6tuIuOJm3tRRDjHYufM2U+3KCNxl8l5chMQ6tcMTIetLFzHIMjLE9le4GHAO8AOnCqSGoszl4Eql2oGiY+3IHZDqdWu/iLssDcWghvaXTqXDRcMNah7ipdSdDCDgs+bQmuVpNladzqr9TBXekhOB7j3iEAhQgg9YBbw9kaU0iEsiIbkGMH5zaAfOUYAKSNDBhNooWaZyyAjvkSQYJ2B7uulexLzjLgCGslX22UBnRpadO5WnAmi7kN3Hs6Q0azE1lpiMbnKQqBMmpHQ5CaIcDADA7Z/BgiozzwMK9/8Nc7+gU2WyYoYiQTUQHKkqHntATtQQxGyysx04Go4H9wECJq5kWlGz0Q+lNxXlN0NDdCiUVSr2EgmYpSWMC5iF/KGIN08jSHcoIngmBRwMlXGP3wqGHhqxjOPLKYAWXxBVehe1nN7DOmxwTC9kNcRGjLKSyQFgjLpyoWmss0CZY1RBHqEiBn0pdhqwjAHX1BStuAlaXHORFHE1PGWJc0WTsgTdBWWASBmDll/Qgo/sYjZDKAF4Xbog+xvDSB0xhQsDkM6EpcAZ/ZtqYn/xDHP8wsplGgEUonRJCFv0uJEQBhOE++YMMCQ900sAaPoZIPfG90z9MUqQ612kEFBqkVv9ta2GAPHcwQgHJNxRSVDGMdSQxCrM4jnNS9YRBhWf2rgFJPOiXMic7WFZpJI4qzTyeeSBiJTBjLQKIMQbyoXydUxRhlEdEpAGJBpR0YAGJGU0MCBhatnCWr6kjoSq0nm+RBYhDHMkasBG7iLiSNAYVKkKF81BqwQ0ZLFXgHG9ghgSilBkPxV8IWPjGJ4HPn1YrAFe7yk4wwJMRjWrSWMuimRs9IRI6jKO+oDXIPC10LLfB1l1VlrnE+TQYHFPqMI0Dj0naR6ukWmhM2hpGAoYohIY6lGOf5sh+ROMSKwWB7zrrrQ0ySYdogYsAROPXfOEWeZPdz2UqyNjGmva0z6T/hl5bKjIGwZI0gp1aCBLiOGEGKq+Te6dZuECRfQjXhMSJ5Q9vhB+bxBawszTISmMJy4xWSCQ10Eks3MSVV2mXe96L7ExYtKLvxhUKxXHhK8Y6yow243QCpZo/VMJLL8kXgKh9ICBlY0ZUKbQgX+CvKM+b0akO2KNW4hfKgiQABTcSFNhob/WMBl4AixKp0ruJYcc6OkecCh+vcYe6QszK7nG3wBatB2UBDMRxYjVfSIUSYDiyjTO0IAyL8ZVdb4yUuuk4tHLxDDUvTCLwBVHFil1yRszUuofyI12+avKT1xnl1GVBFQyhhIyGbNgIS1d0u2CzNMcnDjf9agBONvNq/yKHskugYhKKFK1O44LknQ7jLnvt6WR/V5Ug8bnPq0EzxMLnlJCRiRVPZW6txOzljqLqmKE4ZgdcKQsyl3nSXY2yWeoUG++YKgFHfZRKCikT7L6aJ8oFoR3oYzTRNWEAZN7zqh3bak6tNjTL6fWs2eyFBihAr3ZUhbRF0iIgFmJHM9zOmyRtbLq14IawSSMdnK0NSzSAAQhgReUycG4SrIIdPlWmDGj6WwQv4dvgfuwzzJUQbtDBgKw4JiQTsG4FrNdxs1YACFfIBbj4GsaWAlZp+a3gurnACn7D3po94fFvFODgCGh4tRPwTBlEu+HXc91ldPTMSxX74jeuWwveQv8eZKzC3lkqUz7UzW63RJvkq+X5yg1gci24ZnTk6KXMZ27mKH9sQGQ6apXkLQV1MyABHlCA1pekcoIbMOET4A5laJpnpz990jV3i/d88bJsMHzQI0/AJRQwdGrBYOAEtIevsPJSSA+bAPtWu1Br/gyKO2bNlzBDAhBA8njcveH6+w6C8jiF6vid8IW/qwNajQmH+eZmBVg3Owqo9dcwoQu+wgwaiJN6Mluc85z3vEOema5hA0cB7XAHAD4DrN6Pw/WergqxNz/7ENc+IlkQTmOIJcULRy43wJc98q1PMO1k9ROZjpant8Mdz19f/JT2vHqLIX0sZCJ4vPT88cdP+/ITY/KppD1U+99/f8O3X//4X2MEAAAh+QQJAwAPACwAAAAApQC6AAAE//DJSau9OOvNu/9gKI5kWTmoMKxE67pDuwqoY954roNoDAsAIGBIDBCJKhVhQLPtntAoxyGAFQuGgna7bXC3hoAxuIoNUNK0+tZbAsXZbyFhqIvF87q+UQeLgzBoa4OEGA5mb3FbdEZhCQljQwEFCgthjgd6fVtGSi2ChaFSVG54X3gKCgECWQoMqnAHCQwIkFquBwB3l3FhAC80osI5hwRvXQV/QAcNCggKBszOClsHsgjPBbLTYXd/AJvJnmfD5SEObrpcYg0NRpPS2QnN2NWU2AnWCdjUYAVeRbxoMeKDgBNzCC+gM4bHy7t/CRQkqEaPmpdpFKe1m4PPXoNHyf/emdJC5lPCkw/QMQGnJczAABM/TtQSj1rNPzX/3WMwUxtEBQ0OaGnXTQ9BFwdRhio2gOUfdiCHRtVWkaqqI/8wCk01UVE7kPpAdlIXpoqMpErToDAmqdMKoR8tfoU2xEBVoS/hRMwG19skiPN8yjSgS2SAbp7Qpn1yaIW6Akl0wY0osF2RAM1S+ZRzS6KcO1KBDpXZ0o4k04EWMz4kAEhed3+1PKp8OKRUW5yRbU7GRWZPmQKxdHuqzIdi1SMatyYL4B/s2LNzd4E9fJfLobmBj24XvDfhugVKLjmO3IPKtt5G/8ny0V3ebkOk2+Y0kPPGvLG3w0Y/hIXB8udEBhr/bLwB9AZm92Hh12ch5TffS/VFeEps3Hnhy4GdIAWgeWwZNgkkhIkhAGiTODSJKaBxduJfDkpIn07ZtTPgSxf6EMyGGShXWGHOgVYYHij6ld+J9QEZW3oTysebc8lcJ2Nb4v2HowUqCTFDdUaE580RJOa2IpLzDfmgi1ywR1R1JkJZxnhTUtDYKkfoEp+MHta5JCdEphjhSLwZmaR9MzVEpzhvALIEOW2yxuNz73DXpIgj8vklfg8uCGGLQJ6yzl99fNVgJG4tEQR5aUUmSY9jNNTgj0ZmuuCKDV4aJot7roMngxttCQATq8zQGqknVSEES5wsN6c7P/Y56ZdIphgk/56W0jqhtHriF0SkKpRxo2roACFEMnF+wyyrQkYrpG3pvcoimF1Cm0WrQgYxRGtlIJpWt6eStKO4f+DnV3PlArxiFjweua6yRH7aLG/M9KmgrisRVC+wolSpy1ci7Trsj6z6++md5foLK4m0UgvuniMtKG9ry63C8goUE6JSU+sG0Suo5yrcqsMKx+oscUvm3G7C7Ba5HMtyzltGzGrMDIRD6oh4x74jp0juQMlu6fLG+Ya8LskI0zcJeyEZ+6/EMJujIx4hchduv5Yi/PWq2fpq7NFvQ/hx2D+X/M83l0lChLblNMYrJ8NdW6fQYIekNBMYNhswudWaO3efO8Z52f8YZjExTBIjxpFlAANQ4l65X6P+h6+UJ5wXtKjfGvSrIoNrGNLi7mrSUhEPtvoc87zTuuTeCJiunu0iXpvjP1/aN+2uh3eEECOaIeUg3bICI+elq+79lmZTGq+cdWRdprOw+10p5swSirfSZ2FfRnMHoHigicwe71fE6SZ97vMKUsSmxgSvO33MSKxCWpzGMYgqBIEmj0kW8/KHOnmN62oHLNe7qqUgOZgIXSQLEjv8YiwoPe56UagSZrTxrsf8T2coshlx5uXCEI4sVnqDEF4cJiNbyS6DT9Fc5q6lAqaJQDklogMA6nekrHltaqzikupwqD/YoUso4fgM8uY2KTn/ReJaC5TXKA63kajZ8IW6Itfmzqg/geXPZ1nIAl5M0UMgAcx53kCWnI7WFCECwIgfUBQL2YE/GPoMfPyRov4oWMO4Cc2DjvJT6ixVmLtxDUqA7IBj4KEOOllOZMIDHL9GGUU8nCpV3puddDw5rfZ50XFNKaEUDbCDN7UjEw3iQ/vktqIDvc1D/BGeL4foOCgdzIy78UIkd3kyNwJMXjT8BvUCkMkcQQ5BWMgFACICif+lDJWAK+XUwHcHmnXiDioQpe1g9ag7CKRE7XFJytzooyLYrGXTI0IOZtDEEM0mdiEUXODSGE44lRNbBxomOuVUpLgVyFGHlJSrkAC5pnzH/57VpNIMYDSiTuJPkqOTYiKHKEpQKW5rxHEZOtGYMg9OJFpbEOfoIDdMwQXgBjMAAFFWQRj1EC9PUdwceoTAL43pojWQOuqBzGkYHu0NNHjZyDu7RDSfychKkRpiRifQmOYoqKPwhOGQxlnQglqQdIJrWcRsZoCWoVUZf4mU+MA0kI/Urxu30pre4JQtpNqzBBslTGtC5BxGVQ6KIxViJ6jXloi1LJ29AodBxzCQY9hugoDqCQV5UzBTkIGmmtvqm8LjmlUUFn0gVEbmFutLouKzj0a9GemwZdF0+mJFyQpRJKA1nY+8DmX9m0S9kha5EThGX8jNlYTmWVQkuJVeX/80AkPaSjNeqZQgwo3UQ7Y7CY6RiEcvrZD6utvQbxhDBQscVjVt2YD4mHaZjItXCbcmCccuR7BHpZkFd3VUAiTDnKfULqzask4xNKywU/2LV7mIzvmORZ8gOC6k2uZJeP0rvfPaWqGMBTkwRtOCtkUq6U5UWvTUzIU7CkNwPHVAQzaIZW6F5hAAabjpPYyK6hqLuExFROoNwC3z0i7N0FsA6wKBMD8mbcec1TX0GPArL0UXFTFHL9xxjgiA7PB3WOTE70EzVWb7bKFWsl8Oy+nHKmXrCiB1IjNyWVfH+4JM0tVijg0rp4uF8BSuNGKSiPCb45MlEYPM4epKQsTW1W//R9GcUNxOQq46027PZjJnPvFSS6ZdAkM4p94OtIYA3RWAn+v4xKKmc3oKBN2HNywGx/DXZaRtdXNsJr02i9Bx4dEZjCq0KVdpbRXnrWSegTAFNxDFqzp9hA2VJdRBO/cNoEuqhwmQ3/4AYc27anV2kQtOdAnOxVJtj882lUBo1rTTGuhWe3bVDYyBzGCBUxpjYaxUaEMbttfWtKabEgNv/dgATRGHrQPqRALrhjvsbHF3uWTB76A7AyowQERI6xKER3QXqZKxs+W9cT5emwnnNTTpYqnoqdVubzmUszKX+ToiXewdb+CVL+KU7hU4Z78QOSQv3VIoQu+Rn9mq98g3/5lVb4hOr8uVFB4tLBvniGWsskpGAyIzInCRYVTWHEBZ/AoRhyjcMKTtcI8vqeOpEfWbWhw4AjtmOyKI41RnxY7Tg/MsBsWaOT++FqmI7pi2YgxFclOjqp/tVBtGLhJ1iyXLIFXCaa6CRd5yDRHbjKE5hEZs0HKhTsZ50SMYYtMxtvi0iikiwqdVxG7PM01bbYaS9LGij2PFbOf1X69Kr8zLAdcxSlS/rEQZZLZnEZ1ia1MAGCLgbZVsc9oTMk7AfWN47s+ao92rEdXt03yHbL1ExOcOH6bhSlY0y2KdKcE8ghoGW5af/5uO6a3iOEiNiHuT/VKqfsne+BTzl+vWav9qD53adXNmr1YFMcB6a0ZfmPF4ceUts9ZhbZci7REX3ZEkQFIHAKhdGqcYjUEJCsBubUNAYLM63kdo88V/u4JmLLBoYucfQaZ1J2hkivN2CoY76NVaEmR5UPYiEcVZsGVK6EFLJ8AEeSBDBAZoJmcg9EZRoAVsjnEouqAtvcICr0d0SUBf1lYXcGJnCaV4uONBgKFZDkMrifMUWLA5QEgB6CUxwqZrVuQOPjZfYsZ9M6AtL+gtbsAQL8gEekg9MGYs+BUcK3NmSBMpAoQM2qEpfqIwGlM+XkRNFXA4aSgvdmB/zKMvwrQSW8grelgvmsiJwxWFnJiGSQBa4IBUMNL/Y2GAiU6lg8rETaewYLZRP/lFWW+HZW4ScJCRVRL3HLoGV1l4BI5RKFE4cjJgFk+4Jvumhy8gA/OjYYO2Tr4ViP9FVDrICdwREf2AQ9PybWOQCz2YFFQAEwlwZEbwdHnSa2OxeMVTZXCVLTKwBHLIiS3gCTDQjEPXYU/TL8zHgG7BBIrARTgYEXPkIHpVHLyiccbHVTqVCjxFGP9EZ+UnDnajhVYGilAokchIbXkYiiRIU7jTSUoEYxUlanLzBTHhirxVfnIYY/yBhtvEkB3FgaezSD2yR3gzNXRogPVSdVFYj/TiiZ7ob2ageD9SRv7WiL/lhXERKCnXS2skg3pw/xBNgY2Cg42GpUoINz1ityNKAG1ChJE+II8FMYcvo19a9iN1oExidTBKEhfDUSvvUB04dGRRKQGHEABcYVEw4RkgZWmUQwYs6X3d9Q2kBTqWlHgroQnX0RJwEBtwgXABEz2y04qiwTOH9V0BkAucUgBOQAWUkAAacxhcIVax0l7DkjH6lzRhlGFulUYzhhYOEEcNETxB0xKndUEJ91vzsJRFokXT4T/aNDacaZeRggiTkAofFYax4WEmhjat9ZN8eJpfNGPp9jr7kUO8RlaA51BBwZuW9kMP6YPCCYRIBXBDlhkEIjeOABRi5mAiuGGAiQR18ZdM4wD0MXy9wQwY4/9kU2QfqYB+RyJltwGaWiKLdvEP5LlEbYUtVtmXIQESbdGHZydYMSB9O6mHjegNNCYUf/EkRBIUPpV+dKVycQGgN+QPcyARNFQHrJAPQSEBI1IJx9AcgbEwoEEZDzZ2rSkSe/iT8Fgu64VXf7MglVFhI1qNloeNYVhei5AAnMhQE5EPElA62HAAR9acygkVetRUsZc1IfJzkCMyyTEcrAQRk9FNTqYiDhKlyGkrl6MvJkajlpcSA7APCFBkHXU17bKQpsk1Gdc5pgg14CKFKLNVD4BXHvoXU2FYy/Kmc1Ci9RcmEjJrPkOjsnAAPfAIJ8iPLJUMszB1hslUEGMMfzP/Im6oLUziDoaaEu1mpL7FJN+TiNWwDZ5Rm/IUoG5UhnNwqSnAfdcmasl5Lq4AmrqzkxUJB8nmVtoiarMxETdApu1lex+hYsHTn9KhD6PpQ9KCMHXRU/kwDyjAEhEzAJnRTQXUCgwwdacXlFcgcU7KlV35qHbFBrZBHU7nqWKBQUqCrbWKpJylnSQBPI8QrgpwADQDGbMAFKBxq7XBADwRXeGUh2/wCE0hFKP4NKD5CDkwGpEqG0IRng51rduQDS1Sm8tpdDT6CAlAsAhgpbOWsME6IK9we96DBPCoop8JRoehbBKRA/UDmZiBCYARq9+pDSNrogNEZWtic7qgsivL/wrTQGYYsSrMVgAzm4SKtCV2IREBsACvAAdZwE0CSQxJBEIggY2xmlo0cbQ694o9CltNq7Lh6Azj2FEYEUJa0hwMubSY+D5R0wAMUD8JixUS0QwNsKoUkJZc0ZjNMA+uAAvgRDtfgK3ZIKBj9afj9AiyMLfPIGKzcKeDeS6Z4TJzyIxA+TQM0Faf2mGf2gwFoAOxSQkPqw4CWa6MMyZcQLnZCEK9kYBJ8xLlqgDhSAsKcJB22ovgArhXsVoZB5hJALirsLoz8BHieFPE0BmQ4FWuqKQDVLS5ew3ZsJgG9DfNIGoPkWtcUbCixgAL8Au8krDP406p0HlrRCLvArhDkP8A7Ts/3NQesCsND4sHs+C4zwBQIWu0dop+45tLcxDA5SlqEqG/DuBVOfVjj5taWzK6d+NH/NIMQyAL1wc8MgG7WTG7shG4zfAK/hMvkonA/KCcXjgL6TpDYvu0qzOY3ARSWJOziOmRQQnBBqaierhCK0TCKdxNJ3wTZ8NBcga+CrxX/iDDVvcHEbEAEUEF0ZBtW5aAy5Yl84CYP9lvQRcxL5XDQXcYdkDCCZu96Hq0jrqvB+AMJOs8EiLDpfcHyrsAwls6EjGIp6Sdu6CpfsxwUITGdGCq4bGsjCC8OUCjmlEXmSFxtGCuRliyRivHu8si/3jCqgAZyHoAr5AKnjn/vwB2qxnUCqpAdpHZKGj1OELYrAeAAxMssDcqERI3rAJFOSKLyfXRBwbjqR3YV3ICynosvFBLDaKySYBHOVBTdKjWh2vmhoMDha6rsWygU5WGCtrQoIgluSYZxx0BeLJjF8uRU/nLE5Uwt+5bBghCQW0GPNJzNGG8iWl4InZDh82aADgQBBWyKAWboqLhzkdqFdiwAMLxLr1JJNiyR9uEzjY8e/LiO4BWGCAxilI4kZuje5V0bckmE4hLBQKwTNQqG5ohUbk5ufRQCwJUG+cILmVBYg09CwsQjvg1BhI4LiGhWxsZS/EWJyiqS7tSWIFhAssBtHNynAxpTN47ueCM/wDpqa2NqQ5JBiezAMor6wAJqJeYgZxPlHqCBiVlKWJkWIZBcKBSZai25GeC0qJcG0otVbLWUBVKV5JXxqJ4GbiBmxJ7+VZluzNaS9YM2GNDiTRbB1rXVCDOkRxksHnutXkpOpNw5r26669waX26QBgGMKw8odezcT8qu5aPZxkt2MOot9FVJn3kVSGxzAMAtytG+hjO0Q/x5VD6QLyaYrJb82N0GaM8kdcTLBOFIsJ+PU4ksYmhKIzRxJEnuEQehaCB9ITM2l4wdQtTbGk7M6vYGGVikjhAQG10CLW9Hcu//cUbVWmgREMas6yn2WNlXVEVvAJCOhpnmG5n1s4YtP8i+JOhlozdo1lV59iOjEUJVlywKYHNrgYOnlKzNdi3aUVEayU8gDCShwFTwDLBOgYQJQXTEyJD+00TmVGZ4uwNPytZ5LgMEmHFTiBq/HVbKfkpR4VYqLaTSo2TNVhaDGYAsKko8oIqNNsoyIKOqcTfmuGmt9IKE36lQMBNEpHirVacTLVz38cOkWfROak0/vOC/SEwq5JPPRB9VfcSV/DjopdjB8yvPdFQl2K4M6dkcdzmThA1ZHaA3kRWYEnPC4RnoGM3AoZXZnd9EZovNnU2PWKbi4O7NAHQvwfVUgcUutRRIyKQBC4BF+MOm2ZdsQqMxy1NUNiPYc3FvtbNztX/AuPTzbA6NvzSvd9bor2ZPvjqW49nM5prCQpJFEurUxi8Jb6i5zEunSOX57wyfG/kclUGahcWOw6BfGnL1Kpeja8SwV4wWIOVD7Jwhp45dYcCasoUqx7J3te3YVhFda0RND/YmIoo1ugNyIXsL6vIGR+LkgitMy4RwVpgUf4o7ZjKVd3TAhnWdV72jz+i54zXc//CCtb3zoOpyuN0dqrZKuBwdLEjB9bwExZSNTRSIv8ODgEXpcM5AbqNoSBJycUOT+IrStdXUkljGimVt2fjRRlGhBJkcgtmramusospT2AeU/21aEuk8RVwlGQAT4wC7whSf0WjWwGfatpw5TJF/6ly6PJFOJ1ZAkpFOxn9yuzJ0Hvma2SukQl8cAKPcyoJXkGE1EPtFJHC8Q3u7VW3ZW779Xj04gbCaFAFUwSEtZbsrp8Tt1x6n5nd828xuAWwmU+CUq35Y1PU+1tfc9+MWCTJd+fs2ogyVkH9IaIDfaaJnpLpIQD1I2oAZ4pxFPhv9vFsdOG9WDJFBbai00oR+5cnNTz1nT5MHPESCDIJnR47ggUt0ycXYEZg5XQW1s2DGYij/2f66jGt5EsmP2tjLWVT73RnLiZOeRi6uKANj8YKsSKrB7TauS/6wn9Qn+GwUh2vRkB5AX6X7k1AtLaA4XWWJk8NLj24HznHgdXFTf9UCc4+MwRGp83pHEOKBmcaEADkGCIEIYHI4IbiCguyDL9PA0nUdJskcUXwK68NG4CQC4xfwPEgFh8OD2AnKjVOqJQmydlJOIIKLlmhXFW1ggGI6WDLSUmtNbqxOFZPe1U61GEJJ+s0AodDW4sApYyPISMjNC0aNSgpwSxBi42uqQGdiisuj5bNIBIPoDjBmg2e0ZU5A6xOJrbWg4KGOxMbPjaABpGcyKXCQyOHSEkJg4K4J6iPCh40LEglpUuK6VUtydTikmyWzZwenj+WgJ29UXE9E1m8ths1vgaAYomeZRyh36JgYVIL8UatLzqqCatyxRkmAiLeYGDVKoygTcX/VkhkVGKeMVLg5miLNWvGxj6xLBjwcACaFAn4jIg5xRCErFyMkowCskqJpQvOCClCucSYJEsFMhhrWIvWHIdCA4EwFY8NR5gy5NCaikGLsSpSDKk8EiqSqY4x7eEg+mgHIUA7IapIk6FmPAohlqQRtOfjmhnkSPU49wJGHjAgjblCRcgMSq75xvTSA1PmqG42c03ysfYgFSo5g1bocZVuN1OoXCEbiuwYEzEdY/Rl1ycAvBQ4D2vYmlhi0GOqGaGYglbWTUhvDk6bpvnC3EDEPrewsQkZt6U4tmkrpk4qEBejzy0VQEDoBuEAanN18PYPLhKykPE+NcaKTTIWuBDv/3Jc0shdnbqlqJksmYYOkoAFterUAUywqWq6z60uwksMmDHUysaxfxq6KTMcDqOAAA6JCwQnuoayaqw06GIvhf9YeYKE1GACjCpUGDFpACCywMoLCcaz7Y+dYglLrLEAssaJCbDQjAoCNpTtJ6CYieOz/f6wJzkm3GknGzEKlCo7dGIMg5gBErLvjVIePMSB9ULArgEFnPDPHjTSIKqelpRIsjILBooDzyhb8vNE0fwBITXVWnvqKRTFSFIuTDLIQMcHUzuxAAXaxOg/OCFaaxkPcKSgKDwDUUvITtZDscqp7Cq0GOxsseW4C0iCSwBVCDCoTDPPHOMTcNKzAdMghf8h8zjibP1gKPCO2wStEjsAVtNFpFT1hybUSy0bpPSAE6NSDKDEUfFy/eWJUtd4NqdNLYFtAvoy3MFbKHMaJjnQVCy1zzUIdZFFaoHANkYbAvnpETI1EPeXYAJqR5Q3M4XvvQ3vlHeeXkpZSxGGpmAG2FKR8bfaPPaQ6Cj/IqOVmjIgFTcUjdiD4TmMo8ABuWkI6BQSl8bp5wu0HCUJUxXI3U1fmLR1rR3mohBALjO8OBif8hp+yU1Ao1COzhCPtCYnULp1xLmZIBtDEK9oCGWbokdmB2YRYiJq2UbBU/lglrlZ40D29vuBi+g0wKqXDr55b+kAVSlRv+bMEcUftEP/VjPQ0TzhixiBvMjgaZWiXsHEqWX49QRQs7jwU5LeUIWQ00eR5LtlOWdKcecWAQVkdFg8VFDZ/5gx7kcxV2nssBsjkgY+9ptEwWHjA2Ehlzyo4qttp5AyGT3kTIeWVkcGOIgVKl6eGtp8zzwUgY32kQYLeYsn5qY73SlAMuKhq3RW1pcOxbfncDzVwGjZxE1aQasLy+id+PAhBtf14WVSO5EVZjasZJEEaxRLA7zqx54nMG8jXNIWVZDWQU0NwgwVmJv4ouYBWaAAO5UC0uaWc0Fh5eAKE2NK4J6XsUxdihSQoIgJesiC6ZDMSylsSyauUEIDau58LYhBC1tSDii8/8USO6CGV4gxw58dqxTckknTNlilkBwKKUZp21jOcgYkGpBlu/HRinbDQBpO4lNwqJc1eDCM52wgSZT7Ih826MekiUJSEJmTTkhoQDOd8DUxyQ0hS/Yn9cVjhI6ixlc28by3yQ9JZ1nfOZKyCDaKhiGxuMCA6gIPgxwRkblC0ymKYg43Uq9kmgzVCDnUoTB5IUlhwiVb3GEUpFnpIaaaWsjWNI5GvWGVK8ufEJvwwVP5h1YaEIMlfOCh7tBnQ3TkHhhT8TlDNSw9FKJFg96QxmUS4QDQ481T3OQPYjZCKSOxBGgo8IhklQGD6POmqsrxnGDqDwal5FFWwpVOVk4PdP8tSw8gE5c3rimHJGvkAfBc+StUzASQ/hTlR5yTDvWATlgCQCdCidBKV8ppTUKMFhyl1A1/jY0UZCNXI4/2y4kgaizj3FJD3wQAkz4NgUvJDg1SCIU0QWFp0cxIIrrWqSDBKJS//CdeivYCpI6gpEElAsuOQaROFiABCoil1OL5Jj/uoR8tkClOq0pVUHakWoGCwla5eoQvfRSp6kgrRsXJQKEpDqMwI0zkAmOlfaWjFuqRhV3v2hVNGa1tVAMlUv9h2TolDX8Mg+YMurSihhrIfxfIhYsc+1jIbvE5f9FhLB0KybqoyK8Y4WjSjgKzeXhunAvcaWlJcADUmtCrtOD/K6qc6ddoepJsZKlFrKjq2Z/+b6AgdZNzQtqA0wb3pHlF1TtxRz0ooquyf2VOx7ZXETdY1zEscIzf3JSL7Gp3u6eLA1//Bd438nN6p4CnfwzbXIDicLIhfYoKHBdf+c5XTqwt0G0pS9c3fuK76PVStIpqSS79hXhrQQeCE3xSWCTLLy+KxTruYo6QyFKU+G2HoFwMWscsdac18PCHt9sDCzhhX/prokKzxZxpASxNSW1K7Mr6GtHM5CIlqLGNbxxZ0aajiWuhy4v7OtibNowyz61qROxXXxI02ckgDoMP+GqXMyutyn/MqmGT+odcEsIxOqZQC2DzEBWKecwnNcAB/2RVmneMtaeRbGM/7WLbabWvVAQOi+oAMKAzaGXPd+0zj5wjhrS1ZhRjPcEIlxNdDQaECUUDg3rAUwkjknTSqEWTGwix27bhQaZjbZNl6NOrv9GnH1e2cwqzQ6ampVLPq0YYq3TAA+ucwDFZohQCyFpTA+NhYgtBYQysZA+e2m154KEGNYZNbKixCAB7ZHSdSaAAZ08IUZRSQAIYqI5SA0mx7i0SFYjzbXCPb1DAGQkMLGUOBTCArAdg04HOXakmRPElUplswzIwIG4XawD4znfmWo1jn7xMG2xqk1MCLhYnVOrZlHL3YhdYX9icqhQQq1mSKF7xxJTnBtBQRGoSIP9weHgg4CV/DbsVsAKRf+Bn1R0Bb+vE8lty6OUwT2QrpHHPANy83SHgeM43QWsRCJrKyHa3snOhE4rIMWK2WjrTWfkDLNlpCQ0Q+ApuzoAE7IpNAs+G1oU+ta2HiVME2SWHVG32ijsgGMzmkQCcECYPSP2dsgi4ArIhcqqRpARkUgpo7J10wQNe80iIR5bkEbEBHMDd1CCB1kOA9WkMApkjuRhwajbxsmsekUgQ+szl16FbbkAWiF9aArpzS/x8AUDaJLvsjY8wzlEHJZ1vVDEUbbzhD+eQx6c+1BzgLBdgKQye3z5LrOaoTOg989UnP3kE/4UgisM9GQKP9Eka+/IX71nwnF85gAYn/fnDP/6bz3//9Q/uCAAAIfkECQMADwAsAAAAAKUAugAABP/wyUmrvTjrzZ/7INiNZGmeaEp+gkC8cCy/Q/upeK7v6DfIg2BLACgaiYJacia48Z7Q6OoHExYD2EChYNh6DWAuOFBMBmlNh3TN5jmohMEV2902Gts6uJEAd+9hfgZkAElmTm2JihlvMEQAAXUFeFkBd4RZCQwJRgUKBZWReYOFZgOIi6lsjQRDWKCDrw1FXQkKCVldCggIDZENDAxklV9+ZC1CaqrLOx80NZCgRwJYfLgHBbZ9YNi7vVvefXRa2355x0GnzOsnDi5xrqBbAEoAeLYKWtm2ft28Df4QlMOmbYyBBmFAmTqljJ1DDO+gXZkHYFIBSPq0BSCo4NOgAw3/dikwEPBAGJAdR+5JAKsOoR8MH8qU4CCOHEjRQGWZ5OuVAY1bEiSYVQQkAwT5/Hmsg68Px5GRzBmgR6PhzGWNoGGChKdixUuvLN3S12AIkWxHR6JcMBXSUzwoO1bCGJVqHKtX2zirZwTjJFwXLZVNQk6ovlCRNAm0c7HvpJRemnLJgrPL1Hd38+q1CQlJEgCDeHYKIDGx4S36dD5mWQBbl1AhxwbtyHqUNNCDMBPAq3mHi9L6jAzTQpfITi2XJH2x0xObF9TZOsKN/UkUc18TwWBW11tHzVaPitihTO2OTmrEkA/TiTgUl+d2Oua5A8mgHVtc5kjDzLt7iZpKDBHa/yXCCdbTYZS1h1gsCNr33GEMWnfHUOfspJAj/vUAzxyRDEdaC34FRopxCpZoYodkoVZJGNZExRNC49i1W4YjZPWIJUMFAOIxfQlGWV90mcieFkK+shwsPFEoDx+B1UcGFdzRyMgz1EhCFBZAhnhFkOkpOORxCtIFH3JM1jFhY1eAIWN/UnoATwtYHICljtRQxWGBHoYSDSbuJchleqo9NyFCf9wBI5Z0rdlmBQDWEFZbFpWCU48eYjTpnF+eSCSYiMGCTXLMsUTkiMXBwGZ3AMIZFTH0zYHTjxwmqGl7Q2YaFoLs1XpghCj+NmObNX2GY08C5EdIncKReKKlwyTa3v+fCsZS60bweWEkapbCcepMqYL2IiH02MPSq4g+G6uffM7Z6ay0jukTWa1ausSvqG64UYSFBPGtunOV+Ce0YSIGcLTv4WrofrgVYmq9QVTU2lSRGifNnAM/mydOtvIrq5d96uPcTgeTN+m822K1oaFjbKEqguzONXDFLWsaqGrmpeeqtlelSiYuAMgpXmD9qgtzmBnHzK9qXuKxL8g95QZlyYl0ay2Y1jq7sb96YumZWSCSOzS78CUnJiVbzhslM416HA1YnFptIpdlwJGOEHPXfeNwAH+toKFB0wOlQ+lwZSxPXQocsJ5npHP3uYiCaAieGi/bnplsg5svFQKsY8b/2mI0pqLR7cGkFactH6E32JVUTk+dptC7yBv6Kj2MAQLEljW7OD1OOsufWysPuukGveDFxBDeF+sw2ZBKo/bAGJ5YuESu6eokklvu1ePkAnrRXLY2c2NY3pS8HK/TQNYxpCH3ueFhDnFugXC/rdz6ATNLaxaUvNJjKU8GCHUOvwHNsZBFptud6DPvg1yiXEW6ltCvREXDGxmm1p5HKI4I/0sBgASIDOKQ6UD3u9jdELWlOwmPfZ1STsdiFqguxW0Ic8vcGr7zFR15Szx8m5WlyrDA/cGPcemCloPYUxGWSY9joTCEFfyWjgya4Adro0VuCohCgT3Phwzc4aRclTcv/6nIC5WTVQ+18BoVrU5xl2tiFGAnByQMYIo8iaDAEkhCLZLweuC6Y/As9LHUcO9+S8KCIdx3DGTUAAqNQlYhIvGV/OGOUqUwDpDySEnhFEJee7rV5CYjqC9qUniucl8P/daEJ5jBOMbJn0tKd0kgdU1rGLnbK+FUBDng8U5CdI48CLeu+A0nPCXsi+jcYBPiDCA155LjJXnkSleiUlWusGFnoLGjSP7ok1owSWjUh723OZOWcfuBEzUAE8H4JRq8wtokR1YGUboiXIK80Y6UgAVHSeqaeKSD72qmP/cEKUheuNyP5jbOCwBoHzp6TQCEYitbZWma7htkOx/RtZtQo/9h91zdNHNnSQa+4mOMyRiHApMr7CzzWDYpqAUaJpRZyAFifGBlRj0jqcflC5UWlaRWdrQ5OsWSi5ua2CqXNits6c+Q4YmISicAu4PMIglTEUz0LHZNHnamlu5Do9/aCVGsQkIiq+MRLH8KQaUlSY7qMimRLohKDGnInpLCoSOXVcLPwJCiZuHqh9xYJ4ns9Jg+/Sp6PpSn33mMLFPNEwSzIARgGlKcGkLP42hHVBM9Dx1Xjasp+IoM9GilYaQBbBDqacuwilVT2PjgcJCmqa5VDxk2QUEcvEIYQuQQa5ZrHEVfyNla8javGLWncG0pLPRd6mr75OcBifTQYIquoG//gAQnSFQetimzbGlEwk0nWkslSCQ83+2rZEULWP4J0oAPkqov0NNF4mixa+0MQkEbFpID4Ka6icXmJDvL20tu7nJEsIJwjfNZC/YVNPBEn9b6FStBMambAJ0GDMFqlv8E4SecOOYBisUHECo2cv+d6ITdGF46bQ2ehtBRaY9pgNHeErB6pEtq/xK9+GHMa5GkpiudmGI6lVc9G+MVLhsr4v7yxXFIrueBQ6tkLLQixgAlQyy29LDKUpViKrYCfI1Qo4bRzlGCFOIc51DRQeY1X29yrYHz1b98tVPF02Tka212PDHBhyXpvN0RqAlMV/3PHRX5ciUGq0M5XCSpfCEl/18BfNPHucCroHWUqly8oz3Ka7VGqoZhSlSnQVu1z34xQAccxZLqLZSRRcUJkRXNW5dpGRrBbcGbxHfVJ6nabZps5TXByFBU+6szNK1mKyHBgegKJQHUKAARNg2zn2UZo6W4CRMjt0A4xIEGVXjBV+NMp175Wif3PJrSrPEl8QitXHQ7Zk2LUDI44cfQHO6JAE8YxUjCl62jtQK/AIxA7wa4jbPttg1j7DK/8ElwOBLVETGxJOqhMlkA2EANoqPrDkduSBPxKdcei8CvCgEdp2ywrOA0WzNEwsWLVJnBK2VJWVwHULeayJ78q8hXacDYt7DnPjzcvlobYYkq3vLcVP/cCocfLTVWXCt7Lx2j4kiyiKkZ1LT2LS1f1AC0sTpVCyIF5r+glTxnVjSJaWmTi8ahf7COARpTk+cFMzN7jbNepmm8b2gdeh6YWRm7M/DZgGfDPENDTWMRTcjAPdsu04RSFWpJAzf/iYIUy+Qdl26hv1RnJ5JfVxWW2BcMRHcqWO8wa724nwDJC76bS0crOKMjGHR3uLacW+7W80Dt1XGBqbtPfoHHrGccU5RG6M8b8D6pli6caa0M+2b7FwCb2G35ilZy7K8+DVvWcYXmgg0oWsTgfg3J9EeoRH9qwI9kU8P4kiuXf/nyJNcy3vk/+LekY5jGL4P2lPHk4R6pCtD/UB3IsN3DWFsWVwHAG28QALRxFlwxV9DidEHyX4K0dn7zDGdHSnUTf2iHVQRAWi0wCFpBVqRAKScybr22XMdydU9nVRbwBvhAWCZkIuZhZkDSWC9xf74XcEwEE87ncfF3RqCXDh74CNIAZiZ2FtLUPYJSgrjDNewUfBWwSEwkghXTSFn2SugAVukQWqoHWq2XOMnzevBnUVzoPpNAGhhxGdVEhrpWDS8CQoalJ8kSEVy1dxRAIgIGYyGEP+sFUYsTctG2TGc0WDlobTNwQTllOoamMrkAHqUVTT6FP7qXK3M0cDJSD/BlFW9wEN1GGHMlJNihZq9UBkV3hOpXREwE/wTzsnmyF4iOY0dBmIaVVmlR92DsAiVYZ1VFQAHuEBJtQTsLJRfLUoYDyIThU3RYpTvicYpq93pnAH8QBX4h+IDRpETApiyWcB88Byasw0Mp2Iq6CAAioYCesAndJAvrNYD2tiUYOGF8plFbeIEXCCegIHtdcxnN0yEBQgaMGGYjZRLQY1QQpGuFcBvA1BDUIBLUFBvZCBsK4FKDN4P09BJBt2rIgCeqZgZooFXZ5T6XgRxjQEhGd4RRlQeW9yUN9QridXsA0BDHtAsJQE0KwACXB4MNiQTO142ztUPNOHju13Lgwo7011mucCVx1GjtZ2YrIwqfYgs9EUEN5xkqyf+SBXAUL4keMZkPErQinlCTOPWQuQMPdLA1dnNwQIIKHjAiwaU4H/gVPAOSprcjgyAJLHEHY/E2xOEFFtUhZUkTApAASEFYCPiXh2M7uDiIgugCybYVC2E9lrItDmAMDrNZw/YXTwUiX6ZdQWIZdnAQx9Z2gMI29fFzQ0ATANAHVBISgmkx9nALApk7hnQnA0B8jVF2YdIBDuCPFqFWJ1UYehVD7lErNLYNiwUdXWFD9gguEqCOAQIMDCBvYaIJDUBkQaQw9WAkH6eFrUA/TuQAkzEsCaIiNfNYV5eIFlJ5llc6RPKaLSdDyRYul6EJDXki41gA8XhZpQCWlrBXzFj/Q6gBXexBH1LGdkujZrOCB3wwk+syDlygdtJWCRIgAAYwElVSCNx3bnMiHySWZiNESgvVMJ6RhUxyCT2gEzUjQA5TKAtZjpCokAzSULFAN7vVGVOhBgPAnMk3QUCUCTKpbE8nOtTHRUJxFhehegQgLvuwVA8gJwaSLu9xWy0DHUt5C/hioeHji42DKD7QAH9JXDk6aAcgk3EFiJdjLwk3LBZ4fkFxACrgAHooDWBkoLToMqSXTZa3e+2hpPoTaMIRlyzADzCRYJWyFb9YFtK5Q/3zAkQQEqDQgjsUEn2ZADnAIJ0YoobSXJ3yJQaqDb0zPenDSN7SBR/gFc4XcMdX/5oNWZ99BnbAsGw1KRzZ8BdqigNsSkV+YVZdEXgmWafTU0KA1Z5kBKoOwFFsFqf2kwmf4KMxZBaI0REtmQ/5OG4FgKQUEAsEQiSvamVPOht2in0S1BZ0YACh2geNGBtAkzW68AnaxY7wV1wKsACxeQumsFC4MBSipgPUOhRikgBLmVgWaXetARL40KJvMzc0cGgG8QEIqACGRgYKeWXy+mWRxI1yUDdFkHMHcKxZ2JAFsADRugOSeiXkICcTkiWbVC0HALDy4ZmxBI+ERAcfsJXRaQQNq2cVIR8d5TUkZEsKYF/aoDghwQcL0ADSqovmGBZ8ILI5MivS4iKPAYwlEv+XYrRF3ekOg3oT0NM3q4Whm4OOlOIJctIRC3BGO3cLQ8tU2DhBjyEnCLU93kMdwMlaETIkbQEQrUG173YF+BBBgrMQ8IiC4eEJDCsUTPR32RCr3oEFDEULsCoWWMk+AxMf8mGX78FarcEVJ3sA7uAJ9AkDv7h7r3IF9EGwLHuB2QAneBCvbVuvhwuz16Kv0VFjsCJ3vxkb29onITFVbgEa+goQmbu5HUSudomv/jW87tRKpeswTLR1ClARkNoMB0EbYeG1r0tJ3KpPJ2sLf5ln7DEIwIslU/ETHRas7Xde+5ApkyS8YRdMezoJSyR7+HELPMC9wQCy9bWVjetF16L/lAeADwjKMd0bmgtlKOLLo2EWFnDDLPQxYoYIo0Jqhvv5s7bAAyYBn0ShCwxgFOSIOqPAEYshM2KxAM9zEeArFOLbB7RUWoeTLH37jorDhkYCYC1FwjsADkihE8/7CQrZXJDjRyRxsbygcJtyHKiBEBQLMQtwbCWMC0+WlHD4c+G0whHVgZRhPPQgr8dmuGtaCzI5HORKwUazSwEhDo9yqVdFSAJwsQlwxFRLH/CgbVSKN/O4Nek7MmhotTYUm4YyFFisQbUgF/UREhwrEil6IiThCT+8WHPHmD2zs2R7TNEpA/dYjjUEfJgpYtRwV/4mOObRADoAGgeKHX+ws+OY/w9fY8MnYci9UDjF4zu5UAS2cLFqqm6I+hlxNImYwqPj6V3pRk9KlJboEUdCK6ueTCDR8MohAaYd1S4mi5oIMHVX1qLSxchqyldaQZlY02kE2zpfeCPR9lkTVw1wigNnwTcYcbuPIRD895vPYRS8wCDp5FDrEc2w/ABOvEx057jUtMKJdlzdRWL29UHB3APVRTbIkQ9Ny3PM0n8ftb+8ABW3UnudgSk1ews76wGimXIWh3snKH9+u0XdTGgAMGsw1oac3A6cGC9cwQnTG2WrwjteEBD9qyAYKXtTcbEUrabia2vmuK3Gi5ZbO1H0txWWSASh0YYFYAJvkAQhwzScOf8Wk9QyYRy3YXJTcwMxYFvRwWoRN3LPfqIfk9AW8fV8qKfLFoQiKdKxNQI713gg5Yy0m5Zb0RKXXBDGHTMkSrpIYLXItrAAajDA0qRp+QU5+0IKz7dfahkgBCDVYKS6Nye2ZOMYPXFsDjt38IESNYxEPoELl/wjwKANfe0tPraAtTsRLQI3wvY4yfo425sgoQGujU09YKEfp/sTfnw6YtAFDI0U0hILvOIFsiF5moDGyhANv+EovIRllvQXeYNmvDye+FetcjoMZskCgoUjilWGbPmJ+zc53JANDc3btrdLj8EAt9EFkBCTmtC89Bx0ss3WyH1JZRhBNPWTwObI2KH/T4OGVD7wp0VQpLH91Mjx1nDdJTY816icX+9cDTGp3TqylcE9ASGIJW9qy/qnVk+bBVaoNYFkbnNhSDeJV4JTQpkmVZ5LenHZ3SKx2g2EFlhZQmicxg0RrCj2Mr9EvtR7QBhFQDj7rXW0OIuEIOzUJQpn2gptECeLmjMJ3oYFDptwVW2R3mTLVLC0Hqp5cOlpb+YiL4kGR7OwIlCXf7J2wFalLsrmMAPeLtbhPU2xTaMXvTG5H6iW3psQ4xGSG4QBbnn0aR96nVnOXPRkEsV6dFpzSgxCshSRn0Rd6Du8IC8dHfG5Lqt9B23kKL64AJuwCUSrI/o4iqApqD3yb093/1mlKGdkRIn/xDj9LWTWSAjGo+pbTSvcEBcOHUGxQGA7FQALcNMV8KKVZmVBAkXMlGN8Hiv1kRD/3KnY808/Al/8KAvv8rmPx0mNvuYJ3ieShVeeIBR8vetPIuHbB93QToY/KZkUI4spZI/Diy77ZVcFlyLv8mFcMj9P0QdFA24RwmKXBMtqzCjdPgy+MCH41Cx8omy5LElwslnWaGdEtF2/pzWJ45MNphAQOuVYdqmFfKAxnSk2TAvtKQevvLN48ZgHx2seBu1itYogN+kXlB2rTEQeXoiuVUjKgklTaiLK8Sm0AQsE/ixvhO/np69ssYJT9irfDkKX8pVddQV+mP/acDkG6FNuYd2KsCJJmvTLBqTO1ZK3Uj1HMfpS4qGv+9sfQ38cTiqnN7WBPxmU+jw71/etbxg0NEXslrJNeLMlsN62BZGHIvNdkUAEB7AA+4u5F0D3Em4gE9MvynqNr1dcwr6Fq9WdPWWtDoWYgGjALQdugX6pzvHJNgx3xBBnuiMHga+vwidkawPdAu8soatvdm/JYMY/p8dolsNfIi40ZHYYXWqydarxCxIa6kagQrG/jF0BSEMi0VGcFd8s1Vek1ViovgUa1URGOi+GlqjslsNFpWAZwfMn5nAfGhvEhRMayDaksAS+J3sqUbWbQKbIgdVYcLVVMSRgsXRgre3/9ArmquUZ7J/LYuVGMJM7IRCQigk0lBv01q1loRIEoDiMo3Aetm2dABi4DdgKmw5IoB9xm2AwIA2Nx1lgaBtqQpVCdALtXTA6bC40wdVyN2nYI7FgOZRCwrozGEaBQ8NkcNUfDsrXrMv1/J0eoyIkJDeimIGgpK+wqw0hPb4+jTyvyDYDqTG1m70Mj4IPJQC3LakVO5cyGgCSqJqYqthZDKGmnSEC3SNFRScBg1abSL1WDb9IDlnPjczMqIYEhVcaR50Ej483GVIuA9RUFpie17+AaGvlna8RmRnkQILcRKX3Q+GYEGMzCrR9yih5RrRjBvBZtAQJVq06ZgONHFFE/wwsueAsnAs8Vhr8OydHko9YrQbyEDlsVxMZsUjgcjJsUsEKOzLUW/mGFQ1MbUIltEaNIakLPdpwk0EiJ7iLD4L90hNKVMNZHIYICPWkHpEBu2wCE/Jk20pZ8MxYc4YP1sxOFTBB48kwpo42TihAwuUwJtKLMNZxwLBTlDl1ib60QqILrEuKKUvVCDYsxliDE964gWXBUcC1Yxq4RYtzKSKHROx+S1pn7qULHh5b8gNWCYkRSJ4Q1oC1Ze0+LqH+yUG2ttUr5LDkZCvBUzoNBaiOciI6JunSL6IOs+yRVe4q7WrJ21WFgJDf+sDeA+tV93RWSa7HlZJc56YJlvkdq/9Rq42tlZSiY1yqmka2m1Z7LLYZgCDsna6C2GoGN7CbbrDHHFOmwLlEeMsnnZwyrrM93sBgkQ+d2wCv6CqJIpIGpvGiIWRscSy75t4ZZZj8tjrmsNxCCqnFHMnB4AviNEMOMgjzwGEqPfarYxwbPvijAAUU+IsPlejBT7RgprpxJecGyoeHdpChzwky6ROmCoemSE6tTIRciMNOgrFKqAQdI3E/Iz2oApqnxlwmljxKqikx2BAxj0bzoEJPnRr0iSGuMzKLRo4ykHsTqnbuEw0ZJe3Agxwxy7lOQpcsyGEuIp4Q0SyCMi3UHDRnAWkPzt6bVM01KTEDgKeKGsq5Ye7/VDLQZKLaNUIdj5lKn1QNhS1TwV4Dc7Y+ZoOMVj55GpLW1IBRbrauSAKg01Q+XUmK1s7pQpmXkN3h2RA2zcelr9C0t1gq06qmGT4pla+vfNcs0BV3gAVA2E4DZdeGMEbt8NVAaiQp2mcnaqUxe6klU2NunQKlJx22NZOULAfilNxyL1M0NeuKPS+2165SNkyCRALNJQd9IPVHvo7JMBt/OxMZjVzBK8VkEhAmVyAW+dITJhoR01Kk8mpCkweMySzGkWIbg8Lj+OaDs4P8isIFNp1RzkvO1Zry76ZkZLGFHq2ZIEjEmvGBNSwBGwUjmyksI/rYmP7JKp9N/VAa5Uye//TIAjmoIXzeifAjTFwvhRFvm732brfRNPttr5l+1hjyACEEMgqrdpJWu7TTrPixOicDLAYZetxx1Y8G0RTsM1Ik5AsoRElu8+PS39rjCmCCCIIAhq80+fXSmFzjMTSkGbKYWQp9N0FIstM771jLL2GDVGXR5BWGKt01kSsGwOG7xgVBe3Hqh2qS63N4ilsdLXhoBpDIiiC4YbUfiKlUsLhc6EIhBfYAKWTJwVkHlGOIGKXPddSrnsKCk5y3nWUPLrkgogRhGBwRj2GMeZc8SPKMRgREV/sinITkxBV5pGp6HIyOA2pRgimAzVhZoI9VZiGQJhyBOzlEW+sEoAsoyv8LDJKDVK5gQgNTcGMiOjQZ/nioFLa9BUAyuSIrHOW14BWBQLuAYhsLSJIMvKI9MJxgHVfEIZFsUTRd/OKwssYnvoyub1SK2+BkIgzBxAZzzUiOIDMxQ0gWRH0buQBJjrQsYXixj3fAgStu1TNBBoiITYsQENr2GK5dQZWO4EwZAYguEfRhKqwjwSY75cPXhEItQhOZCIWHHpL1DAxxdGR8ejlDQzLqHDzwU1eQtEFb4qmTHYGcdRo2uVGqo0LnEyZlIinKOEFNdoeIxQGuMhJoRrOH9asIn+TYyCuScE6LMiIl+rHCgIkTC33pC/G8Yr9MqpNcPqyQx0ShymjkM1b/ABShz3ByxV6uYlsnugA2VIIIA6ZToPtxwAmIoKFV7kQNyAEYH9Y1pmN0wSH4dKUrhXGFYDjFQBjFzwg0uVGMnMAYkgOhRckIzvKtTEAQaikjPQEPp0ABLQoaiA5vilOMTGBPgUTHXsrICGUStajHycAkq8o1bSyLj1B9XVlcEUSEKA9f1eCe8uCyPDsyAzAs+8AjO3KlVA3gqWQ1DbFiIlO1/sml+FprQfj3iKZoQjUZOudI9srXvtbFoL1ZxZ/42RQrwhUt6TjmUhsJOA1p4AQ0dSxkv+iMJ/JqUj2tYgl8ej1wbhWbx/mYYmsXsTM91rR2KIs84tgBD1QxRVNy/2lDjZtPgjSyEcp1ipjQqdvdekqqXjqeKOKSIil9ySz66iwNvdvANHwAIqvVCAZuexboRtdTj6SLXwAVAGmoqDXpK6w+GXWg/KS1L2MAGP94NiL1RhMPv2JYXR0RXzPOrb4otZ0eavoFhKyyqrdhmBxVEGCBwmAKZzpVRaV0kOukoVGukevZFsZNjajGtvPqTUc8kF4MJ2XAWUJSmxTACQOkSJDY/ZER2vgdGmTlx/ArKXP3K4EpZCNz7YkcjGMs45zojgII7gGPOZAABmS3SgQCYgZ1WIKEgsyrOIBcSZq0Bjo8max6iQtFpMGJisI5BQlAgJaHlFYG3wAdilVZe/+AA5LRQUfNfGVzPoJSYWlspBVRUECWX6Gi/0hjJsgBXIrh3AlT7khyTh70Le0ZDO7MALt9CkCjFeCQRj+lLwn5hHX07OqkVnAjjjoXDjDA6U4PlGF5KOBw/6aAOicH2Ar4G0+Sw+q/qRiQgViDUBoSBlznWm0OSFOVBFFRBgQ7E6nmTXOrAApGjLET+NGuYKMt7dc5gNpQmMsSQzDq1DSaE45JaE9PKrt0NSBcs8xrqtSN7lyru8KBMgKUCkCPBmR73g8hQ5t8ChghQINqRxjJEP4NcICvm01LOXhWfsCABJAbzE4q8Nn25KJf9BsJF8d4yzXuDFMJ4wAAGPJHaZ5kqvlFkVgiUaISBXDulkNV4xDExLxYJwIjxESshyFQLtzI8qBH3VPUrm/UwsKb1hFCyHoFutTVK/Aw4QwemmsHVghxEqh7Xe0cVbcDFIlOqjWVED9P+9rtnu62510IeW/73ckVAQAh+QQJAwAPACwAAAAApQC6AAAE//DJSau9OOudnRdgGHoeZ55oqq4s6w1ELM90PQhlq+98vzuCWmxAvN1EgiLRRvI5n9DVa6YUAK6BgGFrKGgN2mz2CkjCZrmoev10nAlEpBgsFjcSYG+jUehvxWVBaA5shYYnQDJHZHVeAV4iVwUJDQBZk45bBQYNfwGBimmHo4YOinGWqQF8YwB+IVsJCgqbq7MGWJZ7XHRlbzikwVGmcDdkV1aMrJd7WJuyCo8G0I5fswUAYJ1bVzDehMLhLcQEIVhZIAOWj3zZrnufX9CPAdRZWw0KCAqpCXieoIiIEkcQA7kjyQSwCwBCTAF4nx5WshRrVoADkyxemsaAQYJHk/8YVPuCrMjAggUPGkPGrN0nZwHUuWI4BMysj33mZcGoTwHGjPvq3Gtl5iRKUm6GEHHG58/DApGeZsuiZIAtBQ1ANjBj5WHPLtMQIPgI6F4vMwPAHQ1mqipFTncYyoy5dJU/SyBUXboW5mWZbAkYjL1YQB+CA3OyNL1X8obatWyIFVm302EydHGsrMJ2zqHirH2FclSAx2tQs5MocQnTTeBjyG2G5BXKUNLcvMgU9qEo1ItUkFpqdVHAIFrFBIhRz8P1BYyvJK9h/1Cqzi5oZVl9wWF0iXMr2i+b9xnvL6vvYxQfytoWHIxztNGlS5Gtu0vcMvQeGpjN3S/6Y2WFVwf/Po7U0ko2nMiCk30JbMIFAEY4Jl8LQUz2yAF0QEKGOlZUFw+AlJ3DHWUCgteeJ/fkQwtYd5DW3HsmTZhCUnGs0hQuEkG41FMJ/XdZeCSaKOQ94xmo3kea2EObjgLJaIJkVjBIFjtMrtNMPC8Zo1Au/32HpVBBooaRXVhJ0yKSftVxRlpOatCWhxh2EQ8uIXiWihWXkbiOiHx6+eWSc/wUV5KyVOMcFnTKIECbF7yp0B4H4MeKd2MA8l8q6KUJZIhf6llHkHQM5ZShoSJYRiiMTvDmOo5Y4lUjB36HaW2adgkilrlUGiZ4nQzohSZ7YKMZhKgyKsgNT40x6p+XYrrn/6fghajKrAHitWs8foiWxx0fdfYGm04eKwAnjjS0HwDLVFqrrIy0y2W1uHIaLaDZJibRPwzRs1+x8lWoThcP+YIMAAp+GiSf06rr38If9nntkEU6tAdZKAKiyITEKITLhrnpQomzztZKbaci6gpkWZgmczCYIG17R1Zc9AEaOhfD1lZ9SXQVSHdedClgybP6DOI6mq278p/gjbcHaHQsHZog5UCW8UIwaSZzz7k+G6DBDUvr35a26qnXkGJgBFFLePRnBgHxsVWMTIG4h6xEWA+dZtb+3clkMcXgNmK8Y49dInguw5PrJ2u2fYhk1aUyABhWL5MpvEGnvIQQVSkCh//KWh+odedCyjxzrWiIc5A7urUi+oea4hrvh8ei4q6PcVQxbMNkK+xQNQ8ZPCzUA4jjjQB9xKRLduyMZOmt+OWCljl7dmais+lAf3jQQq4zplZg7vmLMG3ZSGm5uoY8ZMo53547cEuSUX3RD0Pbm5HFC/mG4lDczC2EM73DsqWxYt1zcKO7ACKNfb5T2clc9zks1Yt342nYEsBViDfB5TnMWc+0dhWmQCgwb4Fw37D6QyKAhQodPTrc+lpGD3YECz2JO4Q3LAc29XgOdx203qd+hxu/NUtrxavGu+QXQE/Vz4XL8Nv9Kri5T0QCC04rkaf8YwyE3Al6nPtL2IA2vZX/PeuLSSuQ4dw3lSTIIDKb24IZtFCG1akLQCzTYgi1+MRIZPFHnRHcRSpmMD0OiQ8SWVjzTgUH/OkgCArxB38edbZOlU+EWexY+nKTkB5eRoEkXIcJT9i9A+7qiA6kogwMKQUi2GIiTnzH6P63QUq6DyHpWIQ5GNJDRvBnRBsMjsKw5qc3Io07MmOOL4qQvxrtRh1QcWGrAJjHVHYsN7AsAhI6ZEkycgl0gHDQL893QAf6RkBmbJIT3GAVJybBHdaZXtfm+MoQHuGdWjIH9BbBTkxysTsn3M278ggqrRjuazXrATndURd0AAdvv/wL/KQZy3NKc5gdgludIJQQDynU/5mVqhcCuTYy6d2BUkS7HClNEIJJ5Aw45fQa3n6Ip3imDy3wbKlMRdgamhrwJXLKqPK29qVQBRILuJkg23hATlvk62fdVJgcPRjTvORsmFVESFTzggquUDR614ogSIp3PflZAjGqFJYZWvMNHsSBWzeg0yQmMjBf3hQAfXteCDKjBB258qo6aqlMzulBzfyobLz7J+tQ5gxWVSKFUB3qOEyZj7hZASLNrFwI/TKZAc4Vnkuha2bLEdGZ2tWDNyQRBJHHLGYZaWCoHR4FV8BYf6xEleUrLV48lD6GyrWqVSUAWZ8zzJr2Vi5WmVxZMNQd5IExTEJEj0M3d4PFpvSkx/+rxGAFJwn8TNK2mbmtZrlSPd+uZKwxUZnf7maA7dmQWdLSZOuciLi9jtQC5wTuXGwoL720FRK202x29dvQ2p6zQt1IRl2WsqE8uauFq5siAFtoqXlqCQClfJwBLBRWAaLXGcKqq1y5+zzcRjTAEP3sWClayXPg0TPMwIbJDuibVhUhBrGMw3snEIR67MevNrpOHEH2CBJXlrt5TQdzV0LgpZy0qgKO6l5fOxvaFIC4gVxxsy6RpSpAtbkocIMAFBSlNgbLdYDqhjljLIL93sCcEOWulqIK4s8WgSoSXQnX6hfl2MaKSzBdsxJm7IaMNACZ0V1xacUwyc5eNkJn3pP/mt/54atWtsi6lQsPB0eZwM6so9AKBCy3VJUZn9mJiRZfpo97iaok+dA5k8lrtVg7Y2znqkcuB004HedbOdmFU7IvQl8KIjyZARHDkl3RHPnJdoAgrmY0x0MjaoyuXVZgAC7ykuF8RYWg455BfJnuEja7Wr4SBCMFwSZGrEX2zq5LUNEr3LAru7rOkZZrGjJv41sjRF4RENZe3leZMaWkYutTmXllHDjgBoIlYN2PU7EK3+g8X08ywEleiVKACwch0MAILQUxXa6oaA8xLNsfw96cU1w9yp6B4AJQES5wMQD6Zg2rLXw4k6j60NyiYk3DgyTfYLxGen+6TmjWd6W3/9Vvkh2jZyARQaXgswF1BEYBSYjHPBr4n6cMT2UBn3mVXgy853ya0LEkVnUSXZeTonBsfx2KXYpOtsJiXOBYNohVbmLk1CRAhbviQwg2x2pZMpRDFX8DATBTF/z0kcjViS94xWzfcvrHQROj0+vm5QWcC3gIbkr5NcpRBgXxkmF+2Q2eNod1aQcceG/LgsVhTGVawvVfOoIzvrnNudshRj2XBhkc1/G20xdDcVa4CV9tQZb6AhXsZbZeu9t9CmlSwYyyebMQqTn2T7fVYXhihBiL30H2JpPXLKlQ1BpVzjW18SYHPlnxrMrsHvIdLTShQvSL0Q36x2TiXzBnj2WN0f/+nD1IvvFC0nNnYuVthxY8jRJxjDUL0mVQB2Z1D9UYSqRncHUKQ3AFfdNeQTUZ8dUILDcGDUEVfPJUeVQLOTFq+ZIKdKJ75uQNilUBV/ARa1YPs3B822YjAZFd4Adg/FNmiuA4EQJTePFUqdY5PWNKZ4dvTfYSw4Z7KDNqRIMEA3Ms8fE4pKExEKIidzc7ArI/70R/mrZ82Vc0z+M4FWeBqnZmRZhKySMiBHRDIKgKm3AkPHVn1TZWvkZMFeAGDVAcf8EQqYF0m4IXNlIbEcc5MIB1upVXcrRQZ+gNpmcV/gJJyVMHH1Qb6GNtkqAHcSFo7rMw0Hd66WABQPB0/PP/h8LiJZRBPJTwUuqmiFjHVLIThS92OXoGA4hTY/LFKtJDBhtDFJZEZamxSgJkOZYnT4HwGolkADJgCXOxT7mSIAXgbo3BfA3BbBqmbqunOW9zjZnhTHgUPWNGRp4hEbnXi7kQTb6GHq+Rhi82eDB3Mokkg914DOF0DK9GF/RBVupgcZdDBUswLg8lF46DaXKQbyg2MZTDQBn3O+xIAUAACXrlNQuUBQryF2viQ1aFgZqYZ60WY3wTUQD5NlClBaiQgo6nb1tyUxOzU18EVLIkNAEAkVt2cI5zSq/jPASDFbBWIcrHd75QN8OkFO8WhkrQfD9GW8YgehaFkELnDAyS/x3dBxOrEAev9oePQAGWQBxQATla+DnRs1Ykln31uCGy5j3BFnioxU9rUxVv93Dp4Aoy6HjQ4zsAojSyQBtgQys4Unk/pkBqoRAM2Dh9yJMO0w9YYVtOBYmKuIlv9gmBJ4nXhFoOwCQMxUa1o2z+43EzF0BNqAd5aV+dspIFmELJoBYtZxFz8XTMwXDrUChuuVQBeSfqUAlA6YKcyY6vQU72hw2ZCTcoRRmMlotZ9QiysDEPMxWu4JtV1S7gAAT5cHcyMQ0ucj17UhjR4JGrJnZd9hCMiRZwwGBigD+VyVAzR4JwmFeJ940AyA4NIi8r6TyrsItYqQUSUJl3NwPEc/8TfZQy0TmWpuZgnCcVaLkE/lM8BvAkLPdqiolCPYYZIxZL/7cRdPiEzOQqFzeA91l/GKciqERYMUgalhVLcUWbrOgqfQCeVhEXe8BnzqFn5lB5/gNq9SZNKPQjoMl2BkUyF1dQYiABrhJ1f4GdDZh+NJgA8oQEkLgIL+EPgyeWYfgUd3AAKuAA9BOQtfkSyRJeBPY8Y/B1cjIxIaNgNJpZPgRhD2AJH2FtuuEPyoM+BkcXWUdGS3oF+RATOOhXIPAxyOECOMIKtqOl94FxkGkhk/Rv3HIoXHMyFMVk6CEB43IXwYWQXKSCktp7ViRCqCALyNIgpCcJd3cHM1YBGXL/H8+ELv4Ab0WWDmd3O5vQkv5mYh6UMiRCCC2nSIsYak/ZRgtwdyS6pPQEYqRBANMAFVWAYAk6Dk3znlqQJ+oxjSUHU+tIIhjihP/jFx0Zl8+UBS9gUkqxHTvmPtH5PjG2pONFCwBwAAsQAHwjWjO5A07RDpVmB+/JqnRRPQNpbYgxDZTQSZ8oYJoGNrqpEILHej+zey+Dr0paiyvRh5awAB4BiZsxn6PaKJyYFRoDHBLBchK3aXniGZzgIm5liblxhtN6BR8gLtvxUeLIhPjhl4o5TS5Yk4LJk5vzMsFSsaSILaTlKtpwB0YZgVmVExrhSIQGmUJgPQDgARCXF3RD/3XZx5xuqYOu5Fr1gAdjpSD+QKU90DTZQZpaEEUD9JihIzN5STk0RJJOdQxMm0pW46a7+gl7oJ2Q2I0gAAYNworGiotu6g/JygOhIq8tZh/N4CPDZiJzGJ25Q4s7s1QoW5lf+rLrwUDoMQm0xBWZE5vTwD8wqw4H0CCUoLONkmKd0RRLgzAlw2Jd4A9Fh1WcsiFEwbbHYzyuYqrnhqLwZkfJhwq9k1J1VRiPoACiu7Mu1BC6gCEKCaLpuTt2F2Yjg0r/AkKQu35QxLIspYm2k32o1WTL0Lk0qCLjdAkhF4C3V7jbq4kPQ7Q6ijIqpnd2Jb0o2oNk8qYmV41Ty2hNlv8KOTIZ6yEL4asYWyi+t3cXU0Y25CGy1+pAWbFXYxoA0xt/VvGszeJwe0MdkdmNtXFmQHsqV8st/3u6+usTV8FNZZsR0aBOrdeJhic9kFuBMuCenGEtmSKR95u9VAVk78QtrOsE2sAXM5EPiNEiW2TAq1u0PMUl8npLWOIAGlgnP7WrcMGx2TWr/4FonZVjL+MEdlqdxJMRXlAePwRHThayIgtUntI06VZ4kokDnxgRLjSZ9/VlJZGkDideFmJMdNMAw0uqNBgNV7C6ePC9uue6A/iq/HmDiLJ/VPCyYVCZ16cVdeM5tRtycHa/spGO1WdtebzHqmITxYEtqTEcIjr/gOujBwzYdkRRDu7GYA7QC0ebaXlTGwlrYu9oaoywLx1SDu3LBw3AtT+QBehHGS7ydFJJkUOCIdCQHDfYehASXm1lHgbQwg+aKfZoXTtzJTtkZNYzGy8VAwdAPEuzB13bx6noCiI8C34cSX5UBxiRzKyETbQSeq6wtL0geBH8SDL8KDvlsnN1amWYVi3Roj9QEX6cDRnBE37oI5MDKn2Azvu8PCuZb5uAH9U6k3RAkrObgtWcL/rEQebaYV36OAF9BztgJZRMfGR8d4TFMADY0KdRh1vjV+6QDbycoEwspJThNAp9Ge57uLBzc383V6JljsNbmQxCKdFJnei6zgVU/1w9gcogVBuRkjyd8ABMvMK1AMIgNK0Y59Oec1lWxUlX0wcuoBtPDDA+URgJbSu58wyzsK7xU38AOS5fxQcJQAhMTCkXkWPXJLBgo6II86VO1VCb8cct8RC+jAINITO0RK+inGs0FT+EkQD7QIzTA5IxsDEHgBEHgNcEaCPch2dFWIYX1hoISQRi6ZTFo8dZxrk/xSrIsXYq1j3+Jxo8IRbK3Eu8AYy+Vg9P1tlWTVgByH1fkxddoFAOhyulRwZQsZw6JmUjRU4tB8KGVRoXKcYr1AUH8NQknAcL9scfgSGeDSbD3WApiCeEdmUWglHaqgrGpna0QZ5jpdOouBWiPP8R47VCOSEYJxw/hMJgnPG50xDNEtCaOxpllzJCj1DD6sxxU+HGkaWbewgE/gJIrZMJ3HKhkg1YlD0YK6QiIxEpBve5BTABzOGXXZEsrVRRBMuwdyReJrmi+0E1ame/AtFQTDKxnEMlUQk/lzIkaC0WD20ppsyTY4AN/CrgJg5xhsUKG1RRe/VqY7hmPn7iv5gwwjSUGZpXODiFKf4OqZrfcBhG2/3SgMBJYfB0DYMjpOEPagE5f4XgCY6vMQx36mBlc2JCXXFD0zdNQubcggQSkkDfS7hCyMzf2fMnCrCu2ccNhcG6anHV84qtQ9MuFqlQsekvs7g7d0IPhGiJtcT/vYZYuQu8dsp9iWRz2x6e6ErIFc6x3dvN2vcJKFJEq8NiH3JqOzqCbPDTMh4HerkIA7jLLrmhOi9Tnz4jJPbB3YPjZNVGBBuzHj5RAQdb7P05R4g3p/rYe8aNLRjy4x1lfWjWMa0HwFv4hsCeNNT5yU3dG9NsjwZwE9NOASd+WDVivpnC4nLlTJqGqbvNQiB0fAqBvl5OTx8iMyfssgcTPw1dHN0C0yMzElew3QnQq69x4ngF5geCjNBEU5mpbt7wb+xVKnOFiXfUV2qjyejyprVNyhuRD8WB5ij8J9HuE6Sxm1RBQLM7pttrnAr4ekiWiOFxKOPSYFamvdKKo4ws/25xeFOprtQPn8CgqCwzLguwToqSRxsC6Lp3qxn2/ne2PHzmkt47BH2YYwSGezz8NCJpRzgNPQu5nT2WqUBs7g8L8LcU0OycCNkDk2gpQ38eKW/t5SzGlM3fUjts32S9s/Dp5fJ5QMYJTzZ0grkAjS4+YfEXsDEdzW8Mc/K5zGo2UCOgJW7byyrlc/J3tVU7Vuj+7dYIXECF5bZvpqakcfOj+w56TaCCBJNV1IiHb0qMSFHtgTjg+tBsCmShhFN584b+XcSRvz4Y68x4Ee+1n9gQGR65fzZpvxRzW2DIMARNNGJIOC5cAOVy1hikt5fq4qM+PoCgwiKHTOvlmPDZSv/xbp4BzhEwWnRe6zRH+VaNECAEIaOCQLHFYmAjNAJgkLzBSs0ScAMYxkhhdiU3f2M+LoxCQqEo9Ga9WEORKAKAJIBQ6nhUrVYHqdCguZQKaC6sc5lWZ0slFfDc1iUBLVD4kWC12osMleEA8YCRmLw9pMDAkAYpu5gjJIPFvzkSyIQDy6vMh6wZPAC6Bq49so6POQ+KVBYJtjjPv4+/vEA6uhpDGZkcnLidsUZGRxggICGFEUdhmKKCoQZPmqCEaSrNK4MbwkZfvuySlM8SVZabP1hTuOxWu5Dlorl3GsJymIFtddweEcWlfIwZQUoSdOgU4FKQA9WsVRnBapIuG3r/yKCwV+QEhzIeeq0oY08WPT2MTiDZVa5Fo1tilPEQIe1YrnwyIDX4h+6TpSAGFl7h5Kvku4k60AFy08rMBnAk0K1KqcwczG1hwAkSwygmoi1CRF2ldMcjCwM1FF1KuPOaDyg4thTQkWuX0ouszknSuPEWiy7mqhqJdQ+QKWSkVrJMpCgBMmwxPymFCyJOEMgKzQZuYgre1mC9XGArFwsFIRN5kmrs4MokHztPeaj0KXgwIiCGqZI08q/ULVaWGhzQaRYLH2iXuei6lTrMQwBqdskdGSA0G8/zUAuTtFp1t72GWhoejusfrrC4WfE+UECyb2RNfYTSxaYtG/fwPuc5/4EH70i9655ys86jbnHb3tOusGm4uucfAQywBxu1fvjBt0yycIgOHtizDaK2EPzmruc2dCOOvvYTrZAYRmgohYuOkCif7aYRhDbrcIDOuRDgMAgI8yDkiUEM6NghFJpqS22zNoryEDrx6GNKw26KM8QElJK5qkUm/BGGMxvbwMYUB3vT0YqGPmmilzkaACpANCWA0hwURfMjNDc2wGMWSVhbLak6k3ltO0XiuQoEO6BsjpUXz9PRAc4CGO6IrI67UIeRTOFInmxQdI45UuTQay+NpuNvJT4LfM2QcFwBC4cnijBUxzApFOOLIQMkpKlvwIHlBDjczMgjAG2LpaoSrP+7jsUQtjCMK2UMeIZB0D4gJscvI2RQ0eOM9cm9iTZq0w0UbwXxo/pwvQHbvOyzARAAwaNyNSMegUGUIoZipctVv2xojheNZcst4NLKwQxAWnkKhWzoo4s50+axzQ/QDmG3B1BcNJAPbHxswjG8TKz3S0Tz+4Q91H4xSQ88/2vlTUkZlqg0+lKCS7qYRIitwIlVopbaP0boloeNvzzgqVoWrcit7wg6GUE4O2KFHFlaNi1AbMnENrvBYlOkO6hw0YzC4dbEK4aeOWbLHiDbq8UqR+WJQ8Ea7lPz5XKeJkgzqQdzgiurE8Dan9VMDItCW3cGO9rJ5FjUh7XGcA0KAwj/+CYjMTyDbpWBlzOYKO/aHcbYKmHkl+IN4MnyaxjCjtYBtuIwE61lugtpyGCk2rbpOOk+rSpouHFqB6tX74/UR3awNbmvMSAcwhoFiCdxePw8ENLi2uZIo1iSHtc9ul2JL1NhNze2gRf/jOiFsHReUEE47TCdcETjKzMUQc62AT5ZM/xMHPzUjFtkOqmOMQcchaJzE1uN4+qgvGA1hAB+cMH6jtexipQNYs5T0XfSBiI0dCYM89DMCzAHjD5UBRQgIyBUPgGEPNVDcBhw4PGSp6juxIOE7REMme7GLBSpYE3jAonNSPIRgIzQdyC0UonONYfNhGVb6jve6S5GoR4I/5CGn+uA4gLzARRQ4Cg7YE117kCDJbpDXw9TDLs6sTYahGAFDGxhEx/QDtVB7Go/RNPzVCSwBaZBi/+BlCzScJQSjZAO4RuVlGxwMYEFYj46aKMbXxhDY3VBa32kH2qwZJdUZFKT44DZCGoxSIdljYjAYFQBEoQ+5Y2tWzlopBs7xsUy6U0Oo5wfmsSwNifk0iRqQgPTAFGs5kExlCuZXxk98AMTpGeVDXSjK7cUsLNZiSi1HNcsUhOPBPnLOIb45CDDB7tRhtMHepLBGsnQzGYigwDvCxIBQxIwR1VxGfCQQR3i101hZs5z3gHBYsKhlHCs0WCtROcmauS4UCzvc//Ai6eTrmcbmQVzGU8oUShFeVEy2oEtwbLIGpCEqxoQtKCb6GjAMDBDQ2bUlrAThpPKWEKG8lCJPMDIf+oj0pEaNJHrMUI+zQiTOkkSbWizW3vESaqicVQzRytFm06A05zqVEb6AtRJEyAk7mluHSGLiFH5o08YkQEUOVsBvijCNKhGdRP1qEEkfXGsfR7IKlxckQmPOtTMcc+fxKPFWUNTA7XmFI6PAWFWRKGeh5GzjF9lKLI2yI3HcAFPavgrDgKbU0SFoEgRkcbFBHQhrU6HjMTU3KhC+AKg0NQJqHCqZS+L2UOk426KohlxGJsdz+kOqFFprLDEYAtF0sOv9QH/wGvVmgVkWAqG7SQOcYtqICnxE6PBECEe7nALmqghXIA17nFn2xetAIKE9ABnbYrpWLwWs6uImGcG6jq5bUkgrd2VVjlVV6X7DvF9vR3tV+8YstqQBi1i2tdHUoeGm9LXuFm4Qw+ZtwxnhBCoApprzUALxJMGyQXSUJtXECxfBXcXuc6xgHhDgVpFOeMcK7QTRj0ozeG9SxHDKFPqlHQG4s43xAthMHQMeLUb/CABDCACcTL4O8bKlTramIFhH2KHGwsUBzreMY/Ptc7xwkABRDZi08CxL6NCJGu7gBJvm/e+qwYmCn+grJSpXOWdOKDHGVggqlK8hB5d1T8fk4Em/82pCz3ukc9+6mYsuRAQ+FJEI2+Gs1napxQVJCgIRN6XQIDRDAWIIgWbtMcg2nyLRgUwmsyYI45M2UtZMLrRvpkzm02xZTDAwBjv8KQQzuRlsmm4h7Eswsz0TE+3JlegKFL1qiHUaihp5RBaAWAxipy5GUPsId9LQrTbayYG5vCpxuZ2FRhcoxlw4M4D0Yul3zXA1nGB0LRe7iSyAuYkbOpSuCp2tznGXljU+Qui6EAQnrHhfjAikulO7RwKRGoLyciHdaq3vdlH42wEgcSbuXMvjrWDgRu6nvsluDlR2wQZNNzhTZxzIJKTSVMAeQQCsaaTZaxhxLGBGQXgSJNrTKwHkY/clSU/BwUkMGPx4hnjzNOXuB6TnL+Fyx30zLnOC+oAeFKqHj6/iSn9EKUendpZisrV/ug5OKeH3dGbgl5SEjCBVIA6Ax7ZAtopkJ6FoVh9TRf7caEeLm9sCeUxSIUne2mGMn+cEnSv+4Lvbg5evEJGeOfl33EFBTkXXvI7T7xN23CRv+OYeiaI/OQ9j045Qx3wmT+DFjUf+s+nPrChl3O4eikA1qu+iREAACH5BAkDAA8ALAAAAAClALoAAAT/8MlJq704652dHyAhjoMgeA6nrmzrvrDrCWNt33bpxXzv/7wPDkQsEkJH3OgEbDqfMMfgBhJUAViAyZTtagFE6g5KLjuludL2iw0A3AZDIFAAxOdxuVuLJKXMgIEqHmlqXAJzdVZYAgANDQEGiAV7b3INeox9BEyCnp5oJERfc1l0DQVWiG8FDY2TDWAlWA0JeHd8UyIDf5++ZzVEr3asCXoBj6kml7WrrQlscgkJkG6ocpo1Y7/cLw7BIG2leQXUWa0Bw2+odgLPX5cKCtDSCnK4JjWd3fwa36KN3lDbQ3COiQFtqpigEwChu0dZ6imgZKCAPGh2IpWysqRXv48P//4duRKpYoKJWbi4QfgGzIh17NxQUpXxpAKNDS6aYrWnzz6Qv0KRfETHwLpUJayhCghgZDhkCeoYDDZHJyWbdbAYNYBJz8FdHoEKorGrUcla1d4Y1GK0VYMis/gAQIdFoSpk8iBVlKfAVDy92Fwe+SmWjMgqdArIKZdK5iNd4epq4eKlQNY5pUzZxJxz3p548iJi4wgibOEmZAdjpmi2TqYwCOmAUVswUTo7dzDHo8cwrkaskeZS6rmL1+kmh0FYptQFahw+lDmn8uJlC1PaiZlnniwA9M3FtTS6OVj6uI/DsLLCgyq1zbG16oatYWTd1ByE7+0Dv5oX80aFppmnAv9kiOjRykGNSIIZIv5Vt8UsVqihBn0UptQaRW4kYlNGFsmTYYNgqBKggBiI1Ihl6QQ0IWLs0CZXhfMxQuF1bcjoF4pzdBYLJZ1h1FxPVYxIIgX/TMGgIiDIpgoiaHURkHWU2UijjFFSx0ZJFdViSxzlyGOUVh8GFiEAQ3YgShcscSXLkXSlZKODM0Z53ZNWNscVJBmhgqJWi1mWCZRCmoeefbGtxGB24x3i5mQV1jkfZVVSVwkWzO2UEVfU5KaJCYEWVqQ7kViBWTtJLcfcGq/QySgbkTopJ6tTNjdXJu5pOA0xLZFHmHm6PITJbFAVtNweqX7xZKxzrlqdsm/WmQj/Lpaccmspo+aya2FTJJkMGKtBMsmwUqrTLFPihtvoq816kVhg0toSHB6ZWddpN9niN9MUGbFyqJUxGgspv/zWJyUbi7YkY0XDSetaIo/8uca8vnwTWRZXaFGOj+PCaDB3BFOJ6rKKthowpZQ8E0u305S0EoCeqoZUyExOkyzHrjJ7iKr0VUkuqxl3HJFl4Wn0jD18JlqFWEVCFWFvAyS2lL9OOspopP06qKp8q+psabV6PDLQZ5kJA5LETdeiSK7uuFUJ1j5Tdyx3uigxoc9T4lwndhm+o5aMK5fHD9mW1EFAKdoSVXAbIkPNhxIkyA0zwLK2Pat/iu10nVMQQzGK/1EP2lEqRHcn7iQScEGpaAlhkFB3sle7qjIelfu3NubcSIGQYohV4lYs6SpuIXnCCLxxtXtPBlvVsapbPEO6JbycVlosEdRgrRSQJDonGh5161cLMyGIH8ouvoVFIAu5pIqF77QtTo6Q+XkjPaMSZkk1uijrwB+70Nq/7yT+Rg+aW7EUdTc7pC9vzzgVI7ThCSIECwScmxXAaFQu61TMVRGCkOloIo6EkS8uUoucKZz3CDytRC3BeF8UtBUVxJggJ7x7xXiotD272AxBGdxghP6Ft7Xx0GPMGl7JvEYQ+wSAgWawnVnWNBlknKpcboqRIXKWi/IJgztcMITwLBGYKP9ukSA4k8nuGiQ7LCCRDBW7Yhu21TZkQahjCkGd9+wSPB1CCTte/GEBCbIncZwiLakZQBkkFqoLSitRbaSRQwgGvCpYMXhXsCMV3VM5Ro3nNr4r4N6cdjLCuQ8KaJDfLNLhtEkZK2DzGc8cG+lIuFzBLkuyEIWKUsTWhdB/DGvY/JrySSeISktLREgyZlhBccWyJfXKYCtd2cg1pepBrzKLeCpxQrs5Cxt/NKUqjXSGJFUkRMowVe82lpJ0NM2cyiRNHOU4x1lAckWQihH4ajTAgTVnOECT1AKPoEINgFCNTsxK8ty2Ck04cjA5DIEr2SnHV9AxnjubnBZApMnrHLD/ev1LBwmAIIW5NCQpKToFsdoYNdvUi6HKZKgVB8PEOlbsUQGJhHZoUzdLdbBbPtzDGXlQAgNAYxE9iRoGCbo3hRphoaV7JDt11QiFhIiHMsyNf6Dqs2cxbFLk2mgPpBCAk/BOLl/KmjFj2sQ1rXSh6Vwp8KzF1B3WswvPUUulJhpFdeHTiPHa6QtK0CEwGKVprbjf4fjWt5RWMZ0J9d5IRkKew8pCg/2ahH0qBUX0USs7w3lDtjgRhKZN4y0seYgxoPjFROSwkadFqlE5kr9sNXWZhgBhKuOaGExKrgva+aO30JStfkqgo1o6ohrocJLzRfRA6pQQWlNaFsXCxZlu/3XrBWlGqfecbaA3dVql4lIc34YEsIKbUAmnw8iCxROlyUXqV5IK21FcMY0QmttID5iYIC5LOBhF05O02gIpvKIsEy2hUPt3IoM4MrWMda1CKZZaNQymCI997GuVC8J7InCkMyOsDy0ZPRH0k6sukdBcwqOsNfAPGRJu5mNR6k6HKriVZiXLawPozshwUCuValMmNamW0CrTBQiZRjjukpMEPKp/jAisOmmMWiuGmMZofWc+4ktlJAfkm05z245pxpCU1Ot9UvBpX4gB2JNg9W11WUgdUIfQ/NHgCk5Z3MS28OBlSjiSLI3uFCtjIIhQUHkGo9xcOUKA971wHouwWP8JCUhdQqGONA9C6FmbmgSHPGmZY9qhM0cB3U67CZvh+bMX+9wieoZhBVz9FUvXwT5ytWpB3svhYRPrYMZGOM3C4ET03PxKpwZvkrlxy86SRxASz+nLg/jvSCRjENaRog2UKB9qU/xIQh+hw04h3Q6NlMEQO/bXWPzCAfpsWy2fSCrlmKGXGauCBC2JNPcb9gjfsmQ3PxnSDkmCvhmnjzdPucMO1XV0mcg3fNZiYDNrjLAJSGhBbsAB7jCychEhJzTLRUlsbqchJC2CSCthynJsHCekGxd81SUusrYRNhLYsQoiMBaE9nihN9CIkzQmRHeKbLEmGm3U8VLSV/S3v7H/fYOTvzQfCVZuXXT9ZKNXaQ8Gh/mAf0QpdNKAlQLYQNPkYb37iFnqjVaJZeoI6fwtbq2FACmEP2TWjrc0MpzuNs/gMZxQ2zRn0zzIjIzqDwF0piEB0ZHdaISiZHKhOOultIRSI3LG5W4lbQ4Hp7Pl5TeS9Rw5Al3yYophTVTRbxeo+USG4qEYoSp7rmi4dRAv4+hpkTxUiNtiSUC/pauIJZSHm36XeA6jICMtNbOPJAiKdCIIiUGqm8tJMEazVDFEFXGL7S5c/9+GajYYS38lOA6V6F3fWsIM3h4rWKG9P1/5shQz44PJdAGIazQMAMAKSQNSeMUyNvFTbmqKU7oK/0dqNujhIAfVRzElFxkpMjEVkj4Xc0qMJENdtmIz9gUYQAtNcXJd5RlQI08QIW1kEUlGskCWdlBwV1ScwExLRz0r02MCp0bQZzU8pzDOIiUzlDqa1ggBggjUwCBmsXwUpCrV82axVmnKJiEEkAX7xnQMsjiF8H9upxG4dnvkMl1Tg3nEFUNadj+yh1amIQUW8VO3wR6CdQjOkYVrkExylg+rEEhZpFxDMH0IcnGVgA3L5mWrokrz0zW30oN1AxnvVT4WIAUwZHLnZEpzF3GxEHL3V3zKxggAJG1w4Xi4J4hzQ3651zkM2H1wNWK2oCIkZVbWF2sWIEw/94Y7l1Fe9f9Iidh0H0g4oWVUucY4lCYCRndO2NGKAiRLb9MdrPZVvUMZWsRbRRAWX3EDPSglnmUL7gUbdMRSuTN95iQKRuB4+iAYsbE/7DAmDMZ70HEIeMg+V8gF7cEsFOYREEeNvTJSsEIZ6VYcWuSK6yUj1rNqjFdndKY6sgcQR5AoTOItLHFykbJ4anZIs1EzXOB79TdkOUOOadhtaPExz6QF0xCP2bZ6AOZ9vXF/OUBdz8hmOfBg28RXoOOPx2ZD57CLgxU5idFtLlYCRDJ+zfFZBPYkATAPucCOBViRtyNQAVQDzmJgqeMUSeA5/pcjGDQnpmMwePhVriYrRyJH9FEcFLD/jw3BczaHZqiiJdCROr+mUE2FYodyRPvmIlbiAbIQDMrUFBc0eK4WJfqIE5rngjWiL0cXIQQQlQ+0RlwXhluADB/VTpUmfWaBCroWWD7BPKOyDb/1ZjYJdOf0FEeHNkZpYsVAiF4QG9AWSF8QjL+1DikSmHm4lk/yTUmVQU5BY+VwF/ChC44ACUQRKLbzXgEUHE8xkPHxQShHG2ZjbsPwJWDZbyv2Bw4wYgbwPcAkMKmEjLOncfUiI1Gha3PAjMoBCa1wAMnGWEpSgsjEEsSCP24GjlmiAErJKP3YDiv2XB0InO7wc4PTJRihQxMlZFrJgSdlMX2hg66ld+6SANSJ/2ouwSQNUZoIomQV5nSWlmhJeZKvwDlHeQhiExKC8RJfZzXqiAqupG8cuGwyI1N8GA7M0QD7yQLB6WsTCU4tNJ5GuWdgAhXQgEnONndRpFUcs0MXo49Qoxw9t1DbRx4GcBN+5xmLtT8FEgX/6WI1OGLW04/TZZTQpqKhM0vl1ZlFIAGaICx2lzMBtE/s9ZNJ4ggJUALABGAZ8gbe9QB/hXvrh3kDaVAVdpRypT2LYmmsYp7rVZcPEKbU4hbkhUWMplCIF1vP1VVdF2ojQUZjGhJh1ZeSiThdkG1FSVgsN4XxliohIKlJ4KDiYES/c0fC0ZeNY0Vr5VPcgpyDgSlAU/+oZEp+YHkX1lNgFFOa0GGlBZZARfQmDIoDFjQFIUEtfJNIB+EYEveI0OiUysctgpMEv3cnppqrwuEKwmAZC9EihuVWzTJE5sAULCoj9+iq0EeWGmUDyFIfvwdzSLUL7KgVvGMZvBQOB4AKqJCsDpAhOXGACxFgMVQ+n2cldUeTNLJhSwJJp0eW9eIUXXYz4IqVBnWrrrQTd4KoHdJVCQAEBuKNWQMVs+gQ9lolXUOTCNdUKvJuk4QFHrASlwQTxCQfW1Ccs2hHAzCcvZoyo1Bk8vChPUBuiMMUC3iWIWZj35OU6MKJ1AKuPhOyChI+TXJ6IZIUj3AdfcCBHEsTiqD/Cst3EskqAV+SDPOaGa3QF+bJqNYSLSpqrXFZVijmlGALANxKG3V3jVCCcnzpNtHHhxzbhzQgZjYxtZaaT91hGwKhtX3Yt/3IGSkjWOVEMrJGf3TgAL5XTocEUajyfIpUoat2ay87DZSLHLnELaxgFA0pd88FflUHFbw4I4xYdZxrmQGAuC5yKCQ2NU07Yp0podJaI6PUceGKFpabI8qQN5qbtO+VbY8GKfcgYHRDH5e0ZnB3Hag7KqrrjdBEsMYTK61ULPcxC6pxCkBzu+XAO6uReT9Fmr57RQWBKTFEJxa3gTb0JMmrQALZgKanRu1Tmg6Elo1wBAbJrg3QBF+C/w710wrM4Aon57vbNgwl8QztWR2XRBAZqRJiqiA/B1jlt0Fthn3V4ZeyJgJVW0L3C7ECERVXiwm/pwyUem3D61FgyHvlpovquQTSNAeIW29S6S+LEJrGS5I1c1YWCBMlZLfwuoktwb/i67YgdTe+51U8loZlKYSyg7rWmkspAsOhRThGi4UAiXJNQ34lJLMx8K5Mqp3hYTLky2Hqsr3seWaS0hNjQhJqgbp+pF1UZJwLwn+y9HYJ1RLS4jU/AHEdAnMZkjIzukWNsh0BMG61oAAHMLjPJEMfi4lmG5wush0xajqR4bu2tioIuUOyQccYnMEz6wiesQycfAB4waOQ3P8spsQjNtc7lQBZ8zo/c2CpdBBZsBrAbrBvpWOlRVhUw9pBydAApqrFNrEF9QAaI7NHOOEhcfmFQ1W4+KERDpqSm1VQ6QhNRRhHilwfSyKyB1coH+yhm3yB2ktctnAxqSc61yRmYyY11Cty0NwFp9qt1nmNMLwQDGJkA7RBU1M/BrRbeYPBY4q6wZUgdEDIc1F6mhqDk7V8PLZPRcdDDgp9NlutpzdkcwANFFZt+hfDCrIUtOi63OwNagFDe+kORLMZsSwyWEtcGrs9YIuIZbFEp9vQq6A7zaCnkgGOaAkOI+dajHg9JSlNcsXCL2AKoRbTXawToRMd6gLKPRJClqn/d0P2PWKaq1/ZLf4by9uoWhk3CglSNg3xe/uDtpahQrqcenKln3gRFfZFTFbCEPLHY+jmUGnm0n+Q0VTaapHpL1xpQds3UTIFddZzqeoDMRAXG8/QxJoYBwhd0OfjHuYMOWAbWOOhvpjxB6SUtNK0utZMQDppzRsqXwVwAPuTp6/bBa75eDAnTdUDzuOr2MUDV3sRGjwGr5DwaE38IXPdGj6NPWvLB1/YpazEhvYKr3Z6JQe7BYgZEmhwPXTx1V11CdValFCkqzxyERtRVhrWDBxbEC0xAaWAXM6wFKzTj+hKl4vVSgDh14DnuCjsvR0HceSt3N5SJekjeFVzkuIA/8pt/Y2YbNca5gYTcMGyQCkh2YutWj59ejzEUF/7Aiz/ka0Zt566jdqowL3bSc40wiV8oU/65ESeRxB60AvvikxrkL2wWyHJtFkJBm9JWBT2YR30g7ATJkzxEh04ojaRGR38Iw6gwXxlWyjsAGFLGgcgbk6GkCPPbbKLkIwyV94cEQ1vkLfFow4GhrCcgLvh5kfntLk6k0rOwh+ETE0GPY+h9eR14BHohFc0bSw+x5fv5uBBp4OXajDP1Gwi3EEz8UyzgK4Mg9bHNHWtjRsWwQA3kdCB8ZNfgCJ1UAERBCKwbJwelZm1Fgy3/FjsElZqnqazkTCwZpwnUr9Pk+Z3c/9Z040A5+woe2kQH1UfCsh+/x3nN6MxAgN4yoh00yh3cUwfU7RIHsPZNjsTI8a7SkrMRZPfFVUjtpUUURHWFcDIlywMl6w/ZVgom/WTbteBHFumSWg8sFSjduSfhE0UC0rOmYHhxixCvVPFC7IOjvDSRHIbSDEhy61Dzu4K/OZOIrwLAJQRQMKOzYt1rq6iPnTXcS585sx8R81wa4EOoPyHQNJ9P7iWn3cg9/hcufeB0MNs/8Fvich5pJBAMFWMA88nHUI097UxyVUXqJ4MxnABkjBKS/QOeqjAPglgZRhwkeiELtPg4HBgl0rjZlOK9f0jHh7Kg+7YCxl9utgd1ED/DQHyVz0ULLtnYg5Ufbcaw9hYMV0EUv8BfbpemWSFDGFleuJCTbJzB8S+R5WnCwYZFVERIO+6wuJQfllDVwF0M0AO5DSxCOmzYo1cV9skdqSAVQNq0mj72qVOTkKvHUV6AAfw2QZQIrfhZwyyaKe0SFMCd/aK9089SgLoce92gIYX97b18QlNG3lw9gEjExPhyMj+2QcgJLwZQ46BJyo9G/aiSm7I9x3mj010QHpdCDe2Gi3nvGu91t7RpD/yd5p+IqAMykLy9m17KPkVhiN0pLZmdtiYaRCSknqIonQcpuQEUyXvyKcfs8gP0BeIEc9Sc42fAK7p7k9rB1718QJs/5uXRsUF6Oh2rrysgn63lysQAMQUIIBRweb8hsAImkRROguVrKsxGw0wpCI5bOfRd/6ZhcLFUypUjBtN5ZLZDJgYJ1Pg1FCRxtgGBCoURFuhZNJ0dijT7HGrMrRLikInrNp2V2ODYJSoFXK9np+YgK6ChhUkMUWJDL0ApqixqacopIGrLDKWizOjxjGzJwoVFjmZNhKFBNIUuZDOMU6DBJsEA0BAhzwlkIaGOBSsxYlLxCjKMqhiK8lkjkFM2MympEVT17YakzlWxC3YGRk+HFzAmUvDX6E06yOkkEhP5sozxudELTQzCkq9fdgwWcK0GfGCDj4zhNZRyAPgRo1b5f8CBZhgKCAAO2KqJaIIZRIHKpfQiJzniRUadvyYcKqHyQOKLQS1ndDSqpuHICgGzLrR4I/EHbom+ILZpeM+kRXiJaGiUkrTRvYQ3RRD8hIIjaOeQZND0ECqcFQtZRFxr8aNAz+B6vgxwgMXot2elil7rFElZYySknRnJoXWYguxTHuLNQSXEqvEPnvqoe0ByGnX9tBV9IPFRFoxraT4idgoAlE/RY1mcwLWrTVbbqQTU4QhWqS4rQj3UdGur7nVThZ6lZAvLhklAXamF9SkS57xjppyRfYV0iytyV4T4nWq2d1Qo2TyA2OXAxEn8xCRIV2Dw4Ryqqh3VZ+iY0o/Lm3/5tzbXwKhrQwTRv2CV7AW42AGQsawoiEDwjvAj/Eoa0udTbo4hB2/DCBAM+SSK4kvjToEpYMy+HFHK8IMI2gPPrSjzhc9mntmhF8aEK/BHUTQYz0ZLMAMkb50GkCIDJIJTZ5lpBjOs2dCCyUTzVxxDa7YWMnuA3XC0iiABHzxiUYHaThEi15SPEnEJD+hJsQgO8Sgk9KgAMk+v16C6UTY0JuKqi+0FCIEewwxZEYu2VoBx9/EvIcYD5dAaTADRdPnOCmyKs65dZ4z8Ys6g8Fzg3Q6uqQsPWJkMFAehNIRTC1bOYLNYZoiY66khsPCyFmLUSSWe6SUAQQD6szOJtnU/xGGIiXaaINUc9YU4jxO/BrxQ0bk0SekqmZ1jp87RoPzpg9i8iXLOfbkNoUfH8lAUUJ6HRXZoCgioA7MpiDE2URszdHcltKsFoMV8Mrs1RgIyLWmwmLyVUAzzvmxQ2LBCGA3dn0wN50i3sIRpHrO4DNIWpcBJSqlbv1n2F/DAOMrEoAhWMBmF+nM4YcjpuwCgYFzMqcYGB0ujLs4zupn5hCdRgPUUDtIx29VPok9IwLibCURDIBYZhvRKYyFOKRLzdYPGl3uUWNcHJEqwrqCLYEPELbkLwEMWMnNk2XGpbLTlrVzE6YH7uCcKYYcqV6X+p1Obay/vVtFYJtV1ANizv/dYmq5q+ZlhC/AYM+YOyRA7S79/EE0cwM1Ldu+4LS0kmxTlHA8gx8mhVxuB0AoA0aKulXozsy3UsKCKgbIbz9hWkQI91JasqBXLbN+rht/WHCi0iXevkBuoGLnF8YV9ozrTub4+88SJ/L7PU7ERQQFXj0J50gLlbXqDFcAXqf+AeuvGrgGxVbOmbQqvsjWd/H9TiRS0Uj4mkK00qnjV3LaxwbCEYS2SSUPT+CA/OYXuyUEa3uZ6VEStFI58AEwgCMkIWnAhDxfBGGBYrEXBLESmElMLgDz4w2QGFcoapCPP82bigoJNpLw6SceNyuEAoG1mEwsiwstU4bjQGBBGtL/DwRowApsoHcTJn2oWK+pTqVaA4YieqFbyyMbL3aFEU58Cjm7i1kUJ6OFJ0goO0xqkxZNoa4gGKVyIQhCr/BYCKMhDmFp24mdlKSMD0HRjVLUBAkaYD+YEI6CHAEjIAtxSTEa5ohHE8sHMcDHAAwJA37rwCIb5IC17eh2dmQeKaAVyS4WbYUru4YrkSAwYCzMI0ohZQVNecop7gcd6GEJa4anPgbSMh8DW+DoltWFCczgQukSQOc6oMhf6qB+s+MUMTsATVsy5nLIZBnq7gQGJZzGC9V01QawmU1t3vJHgDQjbPRWtixqCiGjG5cy++I5PaCtAnXpXAzeCU8d4AdG/xNyBABcAANzDo2ZZBSX2viJMzCo0YBZOChC6afQ7SBGATBYDRJ1SM5IDvIRddldEynYUY9KcQkXgpYLFLCQSeaNcQ0Mp/q4EYuGNsxtwxxlJHwZU1JhEApDIhAtDrEdkDUpcJwUywo3ooYLAKNSZuybCQGAVHbpAki+SQwHcmKX0RmTqv3E4iRkN8EbNS5HTWQOTMFKnrFipARfcujhqLi0nqaOjj/lUSfUI59C9C2dvmOGO+8KO6xMwYpa2Ot2/CRRXSXzmMwzkzplRAAbieFCr3JVBez62Jl1jYoLtV0BDFJNUbaypcRLq0dwBwSKuE1JwOhqDFdwWtSmlhFKwv/SSBlCCBPkMoBIyh7xaEuY7m3uN6N8l0UYe8AxADe4wuWHa0dqj4LcdIp9C2DOGJdE/oQPGnX7BhgfQTQAiI8+2t1uLowWqqNQVhUpiGxXb0fdSExKhCG50a7QKZIMmksG5EXrBOhb37nxrLyUFSgI+LCdvlaMhL8zGna1YLNuKQ0f0JQvfeIH4V+icqzi24BNOVFcFWIlZbzL0LlIEFkGZopKaFPT8QaMXQE8GMXVA5HvhqIKf+BPXLDxIZg8cGOYARJFaBwBBD9yAGKExm/1EPKQiewSAZBAc8VNAAWyChyH5RFKKvTTJa+zCgK98EjXPWAGuuxl3mQuD78LKJL/62ZFuCgw0FmbMqd+owD/tfgMPw5wkPH8WFTCIgp7IFaSxXxmHm8iZVsgQf7yuGle2SKIQsSuA+78aBo5QBoOLQAAkwEjR3TKgWFSsyMHFGg0BsGAdvmEqVENYVXna4RgajXSSMqLFPojVU42BL8s4GpeO/jUvw5rVviRH07FV2DzfOR+jLKT38Bg0hiJYZYb7GhqozrSQcKWu/JzHW1Ps8AEiEMXBjwY+HDMztNONw1N7dJFO46ErwGg5uLjvlD8tt8LL5Wqef3we0NlTYtaQ0aeyG+GI9TUNYY4qdlGNCl/R2oYz/hdN34MLT+8bjqK8cN8XXKYJ9XUDveMO2b+BfKYjycCACH5BAkDAA8ALAAAAAClALoAAAT/8MlJq704662dF0NIjMQgnJ7DrWzrvnDsfgNp3/htenLv/0CZp5bDEYtFgSrIbDpfDgHSFjKdrgDQVYQc8J7gMNNxpFatJwBgoM6u2+qA+sTNecX4/CpaDGEDgIEGAAENBWpsBYcCbQJyjTVlI196lXlkOn6OgIMGCQmPAIMFDQkAh4oNVYwCpIqDjyBGS5a1Y5lshKKlAQaApYttAYqOp6V0woZyrYehkgS0ttIzUjpxwwW9DQoFg4QNAVpahFXYWLugWcxxBt6Sd9PxGw46jIDZaoMCBsGE2SFtFK0BEadKlkKm4jQw5IcQoDWSosmbSM+GPWMN3LByhO8XuBoK/xsYYESOhJ9hAQaEKwQOmUqRy8rAmzgNUwkC9roxIkXHhJwCCQ7ByoRSSz2WKbOQMpVmJClfD2WRUEKzFh+TOB2CMAEx66gEDRydIZJGCxETq4CmU2roihxPn3T5ylJGYlUwFU2mIbT1BCA6BN4AUgnnGgBDOGNteRlWzuCGcrYpyBjuFd0jM+82uZqYkxs5uUiljOSTmMOHgQKlCaQrzj+IZeIkUKDgNK9edE3a1dwjL05ShrIEHgyLNEmWBS7G4ot23LVAwRhZAXmKdsZBkpvpw0yJtxAbpwSKQ8ica2pFi670VH9G3RbYKtstczu7diDJbtrNobLb+4pqADnUlf9rQf2BjSLzsWfWGeutQseDp8FRCljFADXZHMLkNkJm/nFgkwndnBRJa+RAh6B7C2qi3hbsoaXiKpz8FJdDkoUizHY29NdhBXmpBJQBDaGoEoX+RNXXiuIomOSSfryYU1GjGHJIfv7M1ZUfO3awYSIUEkTMSbMlwCKSD6Lx4JEvqtiTOpq0wYZiJInyzSesSWVClhfQE+A1gcWxlT8LaXSmkmSud2SLaTRJph/ezMEIVGqFVdhZVOEpQUWJAMmVCSOdhF42hm40nZnNFXoooiuimEY28+myVEIHxVTCDpZiOoxIJ61kHnDhjMnVoEsyOWahDQFb1qNWKkSnnBHK4of/jjTZCpQqINz6Ga9kumfmir+Ksy2TpCL5LbKPDDNbWJAu9BAAW3J4l63A1HBcNoEBp2q2wbJCF6EK3mvquOS+KqBapkTFILTSYOpPARvuwxWQJCHpr6nibrSouGzwm68owGUkJ0IKlOvoKghbojAipNEVwGzcYvEeQQC3nC+3pDo4qJp7rQtLKQocgGEsTQLwbiS9SAEQGwC5Ih0W29Ys87DEoqGoWWWhMVC2n6EDayNuYlGVvMAZXcyb6F02jtWLEettHUYwCHVf01GsjoDswKFPa5qULIbRCBVghaO3ZmTsHKUaO90UiDftrcXbothGsrgxy1rXlSYMWUp9aoGN/+BXZ5zq3+C2y+BYY9nRnOI4p0quMDov1M3IKFieC3xLH7jv2y0fPutYhhYGyRn1UL246hGfIF+Gcyagn6NX2EJGpiXYsyqrbL6sOCuruN1mnBHS3chWZshcuKm92Aic8lzfrncQSVPo02DGJIeM2mo3vtf3Ep+2LuGUwv20i45SAz6SF4q9rGh9PnjeykBhMefgzkxCstk5LlOF3ZFuK+9DDQWjZyzhQWgO5UvFWhq1rr4gMAYKBMYIBvGbsIzpXu5RlUHwV0ELWnB0buteT77lJCWpgx8TCocu7pEstAhNDClcSCTcQorqPU1JAZqdhmpIugpWkXQ6xCCqUiWoz/8MI0OBA0eCYhcG5wgHgEtRj9koZkaSAG93N7ShJrTXpmatYmJJmtv9lCMwUYwRACdkARmwNys6bG4k9LtYhM7CBSpacVaiy56DrFBCuT3NcUPs2Bz0c6RAriAEvVgi4FzHxo0N5DEmaaQqqxhJF0nyb5X04Mbi5BZYkKcRczmTJzvAhmNIbScLERXUQJc1DLKNkax0JO+WaTM/+itcEPyelQpRQO4ZZDMgCiZzBPiJ3jGtZRG6ISNTSRoRlO6COJwjQHJ5jmMRCw6RsxYk3CSCXV6AIPIpgcoQ0qsnjmM8yTEn8Bx5EzhCkjStdOWozNMq5hWuW/cbIDa+R08tBGH/kFLh4DcYIqpfaosvKFtlOZFZzi2lcktGU+jprOYNd5YqbgHkiGMgZ6Mz2JMC1WJXm94UzAYpKBerSU4c4XjOVbbLpDfc4UJZdAp97CWaS3LU8uB5ov1U4QdkOExK2IMTR0isTE89AaiMY0WjGrSsIz2rMRXKIjaw00j2c9lOQrG5oEBiVjd9QDaTYzZEnApgl0NrWg16UIISFXxXfKmKvKcLgrwzTrbs2HJOYJLeMIZhoNnEVtMmzI04xpgoNU5KG3lSpKqykOWkHWzKQqI4vAF3EetGKtpCOFbkSAZcUkVWfBTM1DF1NeEQnQ3jaM4NRe8spW2ks6poTOw9iq6j/3HnVzHiMTjMjgoodIQ+NMpPtcEuPHZC7EAFetqu9uSoxoUkB9M6yb/dTSsQ/WYMfQdP4ZDAk7ozL0LEtBgnQUSAo0koWlDbMNGJTbCFBZBynTU8ktytKP5UFYbyMbkjCAAKhGkXMNsSVV+p5DEiXSKDkbk7BRvVBJEUr0B3yJ7IFeliauTeadCzrtu24AQclUUrFuLC3D3VtUMl6oDVO+Am6WW5CC2rnYp8RffEcxjjc66BOAIcvspqEi2gx8o8Fo5e0mlmCgoEScmZPaSqN6McxKBJ0VnI0DqILnRZnmpI5YbXahdQ4FAZIirLAhBMqwZJOQVYvuVEgBRiDXpR7v8yj7vmd6Cp0SVltCYKib0gLcMfMvwnFprBEkyy6757cCuiuwqozbbob7kATR3Mgt4hr7Iaiaa0YYtMWbVq0YDx5Mk/r7YRZ5qLoigbwYU9dEwRULTBnpXDcAmr5AIf9x3WIChaYy1OrrhnLr/oVczqdqspOfAM/6l1PeLmYbcMRrjLVm7DyPKMLiC3q2TlIEqbe6xTuCagHVRPR3raFzUYF2FRIEckSIDHn2LaDORVN6MPijj1UkHB8l44GqYSqjvfo59sxM1f+jVqaGzgIN6WgiP4bbb27OQfMnl1Sa0Q2j7oE9E1TC4jl0vz/u5lSrean6ns3U84bITPGWBEoPr/NKewNI3cnR54KmHt6hGLE+E+gc+QiQyg8PaP3qvxBoQtCSrWVdjGeRp5RmD5CfmB1SCl8dsb141Svay76ntO3O/GGXGWlxjrV1gESzirOtQcaID+BjUGBIhyktTI5mr6IrWpfbgKstgPpjNCnERr6/6NdFsaF82xwjXXAzXUvjgJ+mHoRZBCKIApN9sUMwIAdXKauMAZS6+Q91ParMCm5brL/SubIsDevkyuRRJSR0uAgYAzfSdlr1iSgKL21rc8esKWQmPrMRBdGKfjJfhLw2AOGPNS6mgmR00p7kVu4lkRybuJgiTUgB81jS48o0l5zFEs7z0y3UyskZdPJGGP/27Ji+mgJzUSlAilFjOLEi6g53EWUD1ksV98h2qbMHDFdn/OAhFjo06jomatNx3TB1QidnxrZW1akC7U4i3+slpu1AiCRwEO4CbfYyFm93gkgQ9khhngI2+ecwomEVJm1ge/MiJdRggjsV4No1QuMkGOMX7/ggwBJCAdFQIWEHCsAR1KKIBotzJ+gwuY0XTjcG4ngWZ0hwSBp0/aJmtFqFTAsklzkh74ohwoMVHqYFxRCHIghC2EggYsEXPpRkUQ8RCi1W4NFz1XIiD61Cnbh3fWsw/34EswJj2B03OAUQMS4VoDYW0YZ4QiJxp6iF5H9TeHAFTipgMNt1BWI0RtEP99axUxb1ZLcyIsi8FzzCcObFJPLJiAwiZDrmQUEYgVWthKhxY9DyF765VfD2dhiFYM+yI1KEVBMfY4c2JqHTYAIxE470FBmdGCKWURz8RFwYVuZLZ9ndEwIWIEc+NzW8g20hEk+fCJH7hDabYizaA0Z9N3vWd0BmRFtWiK6kFNZzIWCoE5uBCQ+jRy/6ds6Lg/9ZWN5LglwsATh4iG92gF3mAvsqQJqMETd5RRA0ABsCAgSdgS/WUQOyYmpqOHjkdNAERxGzJRCAlIXQaImPEXpyGIC8Ies/gHxsAUDrUemfRpFFcHFOAY14IOXeY/pcdjaOZ863YYiBR3z2YCriP/Gt3xAC1YbAWmir+gLZMkV6Vib2qxVb/Ua9NIOnKkgC3ohIQRNj41HqVgdDC5dmxRLU2EFX4QHAsBLZzhcEQ3DkojQTHWXEqxhoZTFmYnSWdUBUtwlusijRixNkfoZX4Tie9wQVpVAmFDBfUSGQcQat9HcGu1d3tyO8x4DrAwLcJnKC1FS55TQYkJYD/UmKe2KYdhChNXZgiXBfxgaJ9oXH5xEAaQZSvGbs9mDEK0BebFPO50H13yVX+yLopRRYkpU+Uwm/KDgUhzGD3GCDW4hezXANnXjZSmRlAAd21mbS8Gkb2Wio+glnp0KInwCACETEuASDfwCwwEN/GJDdsC/3X+2FT2AJAb4g+PgkIN8xcnCWeblUMW2CSwlJM1OT5Tw5BVxwYS0Cm8gxSpt48fsZ/86TnrmRHGRTbfYE8VYQwKhhtkmCaqeEH4JGi1cTsUwzbw9itHVI5xQh7+kz1V434l+QZvwAvGkRoBcFN88CYKxhcpioAhuFhREjIaczYuR6MS4EXn0VsrhUH0hDOl85N/AhRXsjIhUwp5BSQDGaJrAjRGNJrNuDMMBDo04yzp5TaMQJUB4Rj3MCXQhGIEsXRayaLp+CbtMSGzsZkJ9F+sZ0FbwY//J2UxdgbNwAuOgygviU5jQafwtzZG2R4+cqhHdgUa9jc6ZVsoBgDnMv8beVWhBDFqZ8MYIoacS8opc4JI+fIwfAF8kmSp4LmVDUKjBimn3Xd3j4Gk8iKopxcEWgeQmmYADGF7fco7bgEoFkoxKwEq9zNSdAprFjEfr2REg3EqXEU6oZQYSwQXn5AAhPoDOwMOwmaewSg+ctocjsF85Ac6QjSX62VMVImfJwGSaWNFgVdODWRk8vJp0pEVHXOXxtp7h6o5veJXNmeEDgIVpeAzsKUSIipKxbORTVlA1NmPrpQYPvlwHiuBojQCASElDXCqFcpNAQUQH9F/O7qVxLQPgvlEUSegxqYRVvAAE8kqH1qdKbI09Nc2R/JsDPZppWkIC8EE2OZLfvD/ibNZFgYmZWjwqAWCKIrSkFhqnFB4lvy2iBinUAfBUUymTnDTVbYXAkCCHEubsPGjiiB0DN3XjvgpVkXnsIy6DxcBHmxyE7hKLR8GDCH5J98Qf1F2Jk8piNkndsDBtN0ZhADhF+MHc2RxazbzkTG4eRkDJNhnskqFq5FZDG15JrTznoklSYSLObIZEjw2BgqbU42gFmd0E1x4KJhLPNpioUQLbiOBnUGiebf2J5PmbnFDSaznCPylLAuRAI57K6MxCuvZTVgkXg1UDAjRY4qlc0tKWVc1kbo1HJq4rUakkXQ5Yi6ibALAC3FysCr7APE6dqzwRYKWAErXeLPSnq1g/wwKsB0+ZZH4U2hdmxt3JI+LczQHkXBr91KbFCipVmUNcK698RNyW4eE8AmawiDWoGk8NxuQ2Gtxs1WFkQZyOAjOip2XyKD1qgo6apLIYHsjF2jP+MBAcJbAEXXDECXsaJtnsUb5UMH7m0dOIr7w4bckDFQ0gnpt5ViFoHb0JnnSiBPYhnIr0ZalAASPEC+plmdLAZCNNyK808MWokd69JhbmoxYQkJCWlsqpS9O6Y0l1gYiIbmgFBJAkVcOIMG0yReF4Atp5HS0K5lY8BVi8lLVG7Lg4SKzAroMaLYLcjWcyot10B5F4mWCoVk37ANK8QkqfLIeEbqZUG3xew/dxP80ZByK4WM0xIeN9oaIbYViXIFwtXe/hOcXn4iM2DAMJJrJbSobqKC+/dWJEiSxM/I5H7SlIvYs16ps2fqSIZiqY2d35GQGUxwr8qPHf4dC4aCsG8oXpSDIl7hklGk86JAe1YckmUWKpKIC2AiwYrc0VOOhz7yJCVyv02ighZEageQAiCS7c7xA9qnCp5YVNrkXUaI8n+M5IDCNgnOPrKXOFlh9gKJSkixm59U22xev7AJebvSfgIBAZ8kRHAbH3OCiaud+ETPGDjab6dBOMEqHGWmegCQBIIwaYmdqDKpFXUFYa7YVE9m7TWQeaqQGenOWeKY5zwgyzSpdMiaEs1n/Gz7WhdJZufdzRO77JhrUXXe4rynXB9JRLsFQNAFyKjGdAQEXEv81tiMBF6GLKtFkNxU8yt2ilXHLeiMCXIAwAfvcY5Fxny4xdYUAbTiQKFH3KIZBSZfRLlM5BIbmvMUyctw0yBmp1Cfdw2DqM3VWW5qGEua0L4KA15L7rKSUIl1JDA3njgRwac5ZPar2DFdgE2TYbYTLfmyKvWpScALU1KlJPrO8w4aWD3g9ts8qjw9VPOfWBUvGPfGEt0UJiFRgIrCRDI+qhIPLRuxgei9acCpRsBaRqm1AC9ioqCHxpqi2f/dnTkt21pdtjtXimFSUfZ9yGRmiH3bIQ24qMV9x/3rV0zntlJQ5+AjenRJfZBAIIV1oE4cikCRcOBUXjCHghGQC9Ru3zCAYIhIbBdmAFdQBhB20Qc4XQxg5PRVW3dEcmYaSgeBlog7aFzc39OFPJWr9KLyzYyACIdc/k7QL7a087Dv3QRsOFUNUw4ObLaQVoCn6soiyupan9A+/6mbHfNp1hqZspT9vaLiRmxMUjhHQyMr5c98JUUqp89yp8ZsjHuKuUJQv/k85J3+hqDt4g4xWJzwYGLxP8pFuWTNWQzkEfRgb3oYeeyQxkSESQcLxM0atvI/WVYxwOox4GKoGinDszWJ9IWb3VoJy3pWu6kdg6tSN6GoWhKCBIBF3/P8S3vaFPwU61nZ3iT63Z6oRLSV/qGveXWiKgWOBoXKTlw1Z1YHfkSo8hjwVfZgNvhCFiMRvtBy2wGIe7XV3sH4GuNGchz2Kd1QneHaTfJeG8AQI9dHBgoLsMro0Q7Qb+vB56JGj7xwfV6NhgGy5oqBFfiijrcREhho2S2VzyDlhXhkmzOOqvQlaRVgY4C5yx/GRyudAXoVM7rgpqAVKTnUSXbPGBoIy4cHAR+dD+SMKvlAfrb4vcNab8nvTb6ILxccu/ykQztvhGeMQBn/cVadFbjWpNIlxT65qanS9kA5b9ueMFqIAFSNhvZeC/eYY/XHHa/B3ErwI9E07Z7hi9Db/R4Q9KksXkW6ziG3ByN7KRbj0C7RBsfv9wRt1bdWHzxkQ7nlGs3tXianTEC9SSLRjubwKV8QbmthJ7TaDNlaP8/Wh7xKzEoPWnHY9pGE/9NX1vif8U9mHSCOlZmy1ipo1MswFS2Z3ae5pNYs1QY+D7bTRu1XTMsugFjwZ4nLQAeoAktBt8jCym5GU8JiaOuXD4Ok5Yz56OyraWcBWN56A33IVsNariYTL0X5P1ohUCMhN7CYO01JXXPPeXh1VJFN4DRdho8jPWZ52PxJLGx1c8flgoY1dPr6AML/fDzT/pHo73ocjDn8sazDFWhImS9wT+YTShBkuI6fHRWpUBThy/1A13gtiDvpxjeWL4jgDCfsQMKQQhMw6qNTUbwHYJs6zBkAcO4FtPzWVgcAAikRRZGr2RIAmILpYLgFKoFALOB5PaPTpQBJkgUYWqQKtWiIJwDa4lDgdMwYTymjApPPLoyl1P6HYLGXD5gr5n5SfnqGUMiuhlCEpRigbAoEAyYK/wY80t6S3ujMyzJa1u8s4FLw5urAglx4ePQMbHIUEQTbLFLqfIbSkhhoDp0ZGhyCCgqyg2xsgljpTtTBPuOddDMDRXa6K054OWjw9MRuDBh2ewZha5kiZCSVl4OAoB4OXhjwaStG5H1zVljI6AOOAUpUJxKZ/kLyBArHKFDhFfP8a5EAC4w4YNmo8GKh441UBePGi2EjSUZGxILUaZlrz6UxBVLgcOguIQpC0VSwgXuET68A9VrREVPyH5haKPzZCipxiTdLJAnea8UMxBGAIEl4YgurXiku3m6gaqtwJpOfEWRZN3SG5YgLJcAYKGGDaSJcbGr1O3nwRqtRRrgndcGpZx0enb4H9sgoKRAbHG2jNPZRKg8aQEZDoRaJEaWndB1ReKKFUaJK+rV/83dpQhiszsSOknpgQVmMPGPccQx5HMRuQWlwKTZTEVdCNuXNBC0uGpYGmSVtUUNuApMQmNLVrb21G5sJr2XL25d75Kq9v3KKOihmCI8ESzMaXcPz/vHxYkOLIFCmB0TIow6NagkQxM7i74KsBYUNNtxkgU8IPdAK5iIZIJIukkHY4+mW5Ru4TopYtiBMFGhdSeu07UnCRAxOFNEAkp6wmLG8IJSaqhA2IcLPshgR6+YsjIWgEoD4OPaTwmz6Ac4FED+56KTAoC8zOIL6umbAxnk6y8bhW9NFgDAklGCOcGogsUigQjXlOve7aaW1KsdTZJ8aVVEqNy28eswGfLS1B7cpSmgxACA2b4DAeIwWp0R6p7MjumwRj1IkT8V5jMpsrZ9TyvYt0XOiDGibczJdXzDyUCi4uQ2kDb6rp66CMrns1SlcHUuW4SvPUo5A9sngvQuDS/9uGkGzAVEIJug4V6b4DsyjAphCKG2XF3yryTsHxxpJKAoU6Da4sPhNIoBAd9cFoNSDiu+kySUxV9oGjnMPPsfgusTKRgk5YkR+CaqtyMmHB1XIiXCdzrJXN+PJhNA3dfddDli5jhSg/u+lmi4S+S2mwF/wp1xyhuNypBl+j+i3kkzcDMKXi3Hil1HfrGoYglm+87CsAzRVDBSO+Ew/TXPfxygdwauwRs2CBQ0c4RUz8YIyqJDE0ZqY8VGgovRwTdsRQatikZ53sXPAhgPMkeUugz8kokLxMxIseN2h0mOrQwLCCNCR4tczOtAN5arqeAcLUG68WvGLRP1AuF8cf9v9kl56rrYtW6rnpnhkSNf3NK6ppt8Ur2j37Cpy2Ja+ZCo8a1OwlvQhZv4NX0ojGavJ26bYPs7tHGK4Bzs1V75LUzfFudOKNCOVwSrLIum8ctQYEnz/okDYMJja03T7AYshbC7G3HlvqJRY6Q6CBzJ5E+cR/+1a31/ej5a3VpE72euwDU8G5Buj41N7uG5eLI6kV7GCHA1/yeMcr9QDrT0GRAH809gZ2TY1+y3nfjowxi9WoZS2dY9skOlMoqckvdXJJHnxC5ik04Slb61FYQaKVgspNcAoYqsoFpdMf/vlucMeRBAk780Mg/q0swSHiAiuwoxbGqio0iKEMZ/iGPjz/ZygjWIj6OGiR5w0RHBLyE2UWhDQgCcAAtXnFF9LTRCc+8QvHkMESUnO63zVKRkQLlve62LxU8Y01GJqdxPw1BDSmUY0cUNQxhNa3slliO93AjUG4+DwjyogVDYyKFW5igaBIUJCHwownTMNGjEhLkWpRoLeK+MiypRCHrZBEKlgDN31dIZCbrNt0kJIF1aRATUYMFiNdxxi+AZN1zFugxKooCJ/haJa0DE18rDCR56QiADlYk0EcSRZTgiyPuVncn6YTrZIM5S40GINrZrBMZtYyF3OgEUWKki0u3nFt3MTmKU1Jnqe44yC6cI0y02m7+wgGA1iQRSQEE8mtEW6b/2ga5ga5dr/7VdOSdjsQK9D5z6ZQtKLOIRe39BU09bUOmLjCYuuoxDJ6DIoz9vCEGK8VNyZilH73UYXGoGmTlg3PYqeoYxdFKkygrSJdKBmAaYgxmGhUJRIXlSkUAsqVPjxLBFp4AyQ6Gcx4Toeh2RwbXrw2gHIalKKyGlJTnZhH5+DIRk+hgDGIwpLS1bNR2YCWBksyGnuAIS+Qo02emGpWKThgNEfVZY/SlQIbuch4cRSbSe20BjTlJwRyGdRjBmU8vJQVsIIU7PjCQI4ESC8y4zrK6OJ6Lrt2oh08QCBYO1JZuL00KH/dbIe2gQIRtWAIaFlHZoywNwoQL1ABIf/dBFDCF70B4ECUuAVmZ1tbZs6sNuGrhnOexQcedAALJiueUg1BJ6QY4x8CKM1WxBA9sGXWAbSFLqI6ptNSRFURvDMhYg07qJho9w93yQUPjEEA0yzBCGJkB2bV216ZCpYrPeOFPWi0pRBCWA+EoKpp8omVyIQlBJgUY8aSKYL1Irip65WJBYZCiaKO1iTWVVV0HvyrvBUHEinOSwCM5w67wRcG7BUx9uCAD5plbmLEefABjxXFQq5JE0W1ihBwQIziZkKzPa6tAwZyLV48S0znySc0xSlfWIgrPPElMFYCV74QU7m9JFZtVXDJrRM7mMuE6EMCOkyaTgBBvB5Nb4moeKxmqg1DtQYNHH5QPN+0XOhBdqbHULLiuOH1uRp/BjRArQwQ4sFCwO0x5AvVtLMHWYrPUWZBmit9ajZzK9LRMkJK7dEzTttY05E+c5soQOlTc7YoHDgBbaw6OkV4h9XFIx8GTJ1rZAe2s23GCK+v0uZaI8YNx052tTu0bH9NiTxzKHYJ1otra0N3vfcLYblpZJq+dODb4Wb39b5dKg1d5n/fXne7DxUBACH5BAkDAA8ALAAAAAClALoAAAT/8MlJq704662dF8MAhqHgeVyqrmzrvu03EHRt3zg9oHDv/0CYZ5YrGos7R3DJbMaIRwJUqosWec6sNuiY5koCAWAAKJfJ5tKMFMVu3/BM90sKB+6BQsAAKDT0BgIGCXp4IABhYSJGO3GOjg5IZoGDDQGIZXwFCQkDmpwkfAB5ZYeKXjVuj6s+HnQEYnhkmyQiYwF/AgEDuA0kl7gJoryXYoiosEqsyy6RNmhmxgGwsHnPIndjIHg1h5ujZXkFYaXIUsrM6XI4o36F2NMCUiE2Zn6BZX7TarEEiL0AdGBCVMSEuoMT5ugI0a7AmEW8CogQ843eJQANFDjMt4uGmWxU/zA2ACFlTJ+LyAwiXKZQhyADaKa57NMAHIBAN7CNO5ZTVwNLImLOQ+SzgQF8yNCtjONMoIGf+3QRsUeIaE4punaOwCHAj5hYBD1mNUqGWNhnSpc6aUkma4KHDOVBy7NLbltj7XxJK2cqoJprPhOcInUGR1q1XGqQCXDgUAB528jWOunvI547+kIA2wxsJDWuOndhKqBn1CUcjRADYZvnz5owBB7znBcMZju6eMrVGXiyz4xS81zikvg1mN9sXlKrFqI4rwEqWT2RxGq6wVsSRGtp176QjeZiI2YlaABr1k96/r4aXv6i6eKf8srTPFbiMmm/2/Nvn8eGP7hi5snGy/9PcClyx3TdsMdCU0QB51E4llSGGWmP1cKffhii590MsQBDWnon7VJfLAZcktxhCloQX1bPBUeDGNgERJMl4WVoo40XlhDOIejxd9FPlpiYE4opPuDAin5EWJI2a1QCRo03Rpnjfvz5GJ5A/2TUSTRTKFekBAot9iEIunSkk2tRpqkmlZOVuFV6wQgG44FeEKmaM2gkIk8pD4XzzhprBiooQ9mMEIYfCeyCD11j3GDnUs6w6FIILS7WmohrTjnohlSWdJEYT40HTZJu0kPPowfNQYZ1ElVDXGh0mrrprJpyWo0oQNoRmGCjTEcCqsyoGsyrZQZ0mYlSzqosd4S2dsv/WNeViaAIwK4yx1i+wKJNGf7oA+Wy4GYYXH0V2sPqbhUq5mWqr7Wj2HOzPHSlfrXimF+9y5aEbXh6+prMUms8RMWF84GL737KHlyNnmfYQs5sL64E2R5ElFWHcZwm3CMSBtfKB8OILFpoxeuyEklE2WorIh5ohmtFFPRuehNRJGZJYFi/pnOyOKJtdSamGld8jbrmdGdhstrd9NjDeQmji8A5m1xHUNpiVRRc4WLI77cciyurfjPr2YswEyUCqADL6KjYiypbt0/GalLzJMiJRFP3lTkdLaggmOTBiW3b+kxAtUGQucc8X1mKC9DKJs50v3V89RE4iaB2I74zt0Z2/ylgkRQ1HF1khal6ASJ8by1kYkf5KeYkZwsw2eU9601JiiabARQKTCbhQmhGoT/5YV3FwaknDk7RLytWLH3XxJyhaY5RZN1bSy/E+wvbkFaAWNrCpKGa/IbDfPIv6zgyFEE5byOfcW5D3+drgaGhN0BhaLQaE9niEPLkfyHQp11SFj4QJZj6ZKcE11NBF8hgg/DkoyaAiqB+HCgbBPUvecmxCYJYtyZBkKMiquNXyYDgGOUlojUSSRNWhiKLC7qQZJMBEOLs4h18fQxUozMbmcKQwA1Eog/j8E4srCNBW+Gvbg5xoRID2A2U0IODadpD3/bHl2NIjgk7y0VhsuIV0/9thz5mENgzlHjBHjFEN7YQ1FHIIUWacQ47PcTAnqwCPBHUroj5OUWH4oMaMpIPfagDkI68uB9ByKZQpimUDrmwsZnQJIUII5jV8oA8/vlxeEV82tYC1QdMsJFUNEtEHCtApqtUpotRomBHYKauS8IsgpoEA9aitEY7JClRutAhD1uRRlTkj5PGcOUSx9jKHPHFGIESheZG4rB+qQQGjwug1y7kqdMQs4/CRMLQ7gcgPZ0ueLgD0rbk1S8A9KALQAyI506iJvxQ5o9ry6bliFaLbsJoTTMiUxV1OUo7UMxqM8IRVnTELVNqM56MsCQT6VnPUM4SfJwLx8eYhLZmzCL/ifq61OUM1Sv/oW+bA0uoJUWao1zaYhSDiiju7uPMHv6jMNrqg6huxFFrvuKgr1wIBvN2P2zos0JrWlpeCAQeRZhzQRb8TWAgaT/H3CGn/oPq8BAKUhdJsCSBOGkyY5GkFPaKHGK4nhi7URRfeG1ieigfTjlm0P6ZMT97+OmaJgpCnz6Jd0dShK+64jZ6IQ47rcJmMduKQYWuTZqwRFaZ2nnI+mmGPmRaAToBWBLrmDVmJAkHK3U61Y9SVXaCtQIML9Y3oNJ0J60JZEtT4ACitLEUGLvXpHpzTapqqJhdOmh/2uo6hp4RL4zLEF0hqEfWHdWHeJFXiZIkJYpsT7S4/yVZaGvbyKmG1Lr6Ac/xonQTrtLsSbUAlhi1Iws2gcFTIzXobT8r1bVabjse7JDXSOCQXDozOyNAVWvjAwUo9idp0EgvJj1rqhcKuJHfU93rHgq2QNQtkVbBDnKX1qVvSTcoghhHGREqtLf+ERlm5Klvg3gTz9B0onhwRzkQt4GXmmgEebAwINFQE+hyWGhV2k2CB2pj2844aYfUQ5pKhJmf6KFf/LFTa78aDYB4kQqLaZFbPbuiRl03B+qZp3VfyamPpTaVK/0DOc1GBSXLVwSUsA7XmFXQnXJWVsbgY2FdxFbq4pEMi9pfKnVjtrIpJgMio4cmzqO3GpgEYmqN5/86x9e87qBGES6xM2+142DM7M2b+bMBivJKlzP2gqmcChlGyYi6WHh2hkzz5QFDLFLEouE9DNaaMxOn6QvkdcWPiS2VbGmUS0IEHM/gyS9h1zpI09nHrg6FHVq2vlAW6yK1tkBLavAY5urtNXz1jB8Ntb+F0DoK+kRfWILJ2XIb7ULF+PKNipFInkFsABeASz2GJVvEWVbAPXGVXETYPxgF+011rgKGuuusKB1IHFDJk5yl/bAaBWNe6INMX6trBb901FNnce9gXy2Qt/pytMq+DXcDoVEO0ZEGabl1biB02Q15ZFXZ2m1h+8DHiATEj6bSJ3VuXqVG+zbdfkiTQ1D/OBljD64CMMFMh3ohonFNLSKMI59cSOHISibPuMI7toVkhx3ZoNJGiyJ0XHgOiwpkCZJgYVbFvAFqQB7BJMiqA3tPcWXU8DyXHsmqz7lei3H4JLj58bLYHYY+Cuw32aYrT5lyNPPTWGoK07IbmengK5TikGjzzJgorL2+XItdX28yvJyf4bnTxbTmMkeCrgTyoY0zKowwbTR6ZlbgnjO0eXlS9/NInvVfhsDw562Yb9TONh7Rs+IR2bdv+tgVCt0njDbdurc7uhgE15ChufRbrCnt37JBAR22UaQdIejygXYS962bJExgYXSB9+YPqnAATk6dniWJydXv7TtFEhUl/78/Tq/R9gC38AeGgBHXwSxiARLoZwR94kauE2ej8ChHYlCw0UwTcW6ZR2kP1HZwZRkrBxsJIgEmQRbZp2bE9wtPxXUFARlORXbepk/AskDEBGcNAjT5l10QwoGBl2Kl8RUbBCaj8RCeB0lQBigvskqaUgR+kVkEgknSsgeSJWcW9CCgAkE3+DUhxHk3gkZjV3hGsmx9km2R9GsywXd5s0MlEXTqEgtZ8QTKc1i9UmJlWCvHVxmCkAAKkDBktgYS4GC0EBfuIH1TQQ2j11OAIRXU0WE0wQsG0B5rF3ENww1JiH4lQHJEFDcDs3ZyIQV9yHH6khkICCJ/0DUhBSgoFf9TAjcseDhKqgKCBAATp7CI9dZTyhYMgPdFo/VmItCJXNEaPtMfbBQha8BTtfcb6/c0VSAA02MdB3BOZzOIwdEV10EHYBcY21dPNRKLZiQBZpI01iFvBTYCGEF2vYUKYvAiVgYL08MJCTBKIigQ/BVpfLV+AoeF/zUA46BrWiMb7ANWCyeAdxMTg3dbJOFvfIdjROA554gVAcCOnNCMrXCEMfca2MBsgeJ1jrWPzrUZVjSMRnILnFFyR/MiftY1OLZvLrEiZfUT7jgBE1NjUMYnpGFeahcKG9h/+wdUeuWRrRUvT5d4wHMLrDSMclNlU1cUvRAE8HKKIcEHZ6R10pf/I7hCCAYXEfw3SJ5DAB9JDL5ybRfiDQlQd51FD0ySiHb4aQ0AkT9wjDjjD4/hKTmmJlOpg+Q1IOSXRln5hVM4UJ0CIgUgZXQmTexnJiBoEknCkkqpT/FYFq5Ci4TkCflAles2RAXCJCTwhUVACn51aC6YUD6yD5TUFq0BJC05ATfUlqgzCviCXY/lN3SJjek0ExvyhfKTCKBYfvrUmWKJP28pjXHRC0CyBMqkYTEJGUFXk63DC2JwLpP5lsG2MbRpGtFwm9wBZXuZUIrpCZeYJeNhHcL5QDcXMHtCRLdHjcopU68ZChQHcFqZV34Ae4FoRKMxh6IFG5LjB2IhEogi/5zSIxOQ4Vo/4Vs3YomSaSMUJogF9gCVdlmIsAmgFlKHoCRi2RPGYhuElmvu4AffiZ5sk3tpdTD6wQe1ATcx5El6JHBamVW4QFDUSZSiKSQTegNfQRrSoFSu6Z2JKVNIeDxmAKJ4RKC3uB3ZcBHysh16uaInlXB+FXzphQZHMX57sn8/0Y5B4HnMZBEpRDr3yAhSAKRGSFP4M5K0eZxoQJ2ZGBIp+Ef/4HebMA2wxSoJoJbnZDNx0UuLU52CaDQi+o2C0kCPiDZZNRsPZIPSlxVl5HnwYDhchAtyKgTO1SoNOH7yBlp5VG2XeFYFIV3mpHdJE5/ldwutV1hJNxJcNP92i5MHQICRIhI44sGetweJboGJoGE1YqCg+1Y2xkGHdXE4hdUWJ8FGmsFVf9AALblfvXCUB8JXnQBiBnoJm7Cs9tMWMGMGSpBVT5NIFomL2NCrcwEvuKCYo2AJpOEDSxOfruV1omKeNWkG02NwUOSEu+SUzZcba1Zq5BCj1KQtWREGT9ERdZFIBcCKmEAgmjEL+GAdgFlVwxhyzGmgbPhLNEQtW4kL17gf49RjNVBpU4SVQ9qIzbA0DRlza1ptoPBelEgpgeE9BnpRj5MjSrBfAHCAQyFjHIJmGmZEviRUQSYXBSIbCdSTeWFxFHGwoTpYmIeNtoinqWkefASCGAb/hOkzGTNJL7Z5lyJ2P2z0D453T3kCAHilooGoLQPyGKFCn7sJXw06kCMptu7SDUUEJjIROWOBgDoiOqK1MX1TWuKINaLEWioqDnL7nvlUVQI6KmqbR3D3XCTJOhX1ACICXEVRr+njiiqYE0DVINzCEP91Dj50BmKIjj6xp/VjtI52IXs6U85TaR/6cj6ICKa5DRMiPRWrMleRevxxT2cgPkMBlYcxBHVTcAXLVw9UQBSHgbWwpwqgsnQIOF1imSEAfrbEjzQRpL9Gj9cHWrFxCKcZPsWbBHu1bNp2F/cgPUzlmdfQK4OgADKGbtVVFvEIvfhoVk/TouFoKXZBUk2E/xd6FZ59Vp9+wkwPEq4H8EATabvUeBGbkIf2Mql+eiXowGmX1RkpNCWgdwdFk3pn9FuGkpBF9AUfAR+I41pHRm8YeATHG64FaiNxtjFhCm8JQQ7kZ6V+9YrQQIqyZyYNc320lkEpFnev5pP5dI8wxHUEx6dpYjfAiDqGZ5j/Kj00C2eCib0PsmCPGMKK5FS4QYMntKBXKsQ0SSmRCa0kKis7RxAVeHQJEYYXc6nfFBeMh3tE82IrplOpyYNcMi41+JfgO8FKqz6eh7oqbIQpyZgzkBa9aT5aWJ1QRjEGzMIVQ5jv9j3jUo9ye0JAd7hfgzmWeoBAuQg5IDyFjHQ82/8QuVCT0FGRuonB4laZALdeTtcdjKvHXJSeQ1YG7Wov11lH2sFwUoAbpkVIkmNT9aiCZPk+sWdKW3dE7fZBBOuYYBYYZkVNuFh3EOfCSzwD+vCVKlwXEGHCHvcdk4Fo3hzCIWJLqESLPloMz1qxhCI4awgovfuvWWo4wYV5bGhu5vZWoBw7FxxIvcnMJrYsHoQLCiDGzzML3Dw/kDFCfVIhhkOm5WcxqmlV+fxjuiGbUEJPkzMRy9zGY1xPzoqH1GuKPolpehUGGHAk2oFEd3lt4thtV9tzMLRdJDMQ3vQwyfo6nxZB0gw+lqgACryFTNwNVoQXRNKT+mITnZYhD1b/iL4kewaUjg2cOBjWLqPZdNfGSZGZvEesGTBJkidVBkctLyk2Gi3H0wwxFAtVbt/MIR8zUkBGGq5hVR/N1CSHhwatNaNBnKybXBoQqJ02RaAMxU95bNRYK8XCOmPpacD5ix5NS1s90hbhDem4v3jgsSl9Qg0ocmiNOonYvq2GtpSjDTukv4802OqzhZTAju3kquXBEA5hABJ4DMgCIqEZM2bMlKSbyW8czkQKFnTSKziLRz7KNxgB1OxMBUCVb2EdABxgRZgCoAxGMHmSHCYpW/e4QwqnPnQ8KAiM13FDDl6wv5gQg0blTQYYdRtyjmmEzwtlj8SnMI/NSX+svsny/9ln+B8xeAy6gcJP/AsEtWW95XRLunHJ3NmDYtwJTL1x+YzzcxmY3WKlLT0tTUiVOeAyfWezWLgJtinXGipnzdSCXKfVdAeEo9LVVMpLejY865w+Fl1eDHJZI1x/TLwaDuAe/J+XceKNErklUBmplDqS3EqCvJpaZ2E+anAkt+CPqWMeTFBijVTtLLa64JTw3XHndaaZWGCyal7dnVLoqhFB5dpgtOMLAhdFbQslsuJtgTq3xWpJLuMRDd8jByEFPeaLBXk/tQcuxVGEkqhBjo7k2GHr1ZfozNt0vj7KND3/nZoUIRuUnFw9hNTpQwokEq3Y4XvSpYsUrK5yPjuLzv8JjR7OGZZrLRxGcbRfHtEZOsvOdfoXxbjphh3jI+52+CR4nODqCkYT/BV3wCWwM6BRfIJSyPlE4HiCRZjhse7RcY4duM7Je7ZsQaQD1qrfczoxOLwXaeJvYcrpX9zhM24WbgHt3GVLVv4ihnIRAVCsjdIwZwnRbfw+PFZoV0XB4X4xjZXrgfKK0yJ8uRnlrUAQUVuumOzSphWXPd2+Nz4rfMNVeKjrRphl/eG5sFeaHymODKOkKjTHUfvKnQLu4BI2KEzuHeSCvSTpXJAdwi0SIY7p1ZeJpZfsptfs28xu7RM3p15QdQrcx7UaRT1UGPY+NDXHzb7l4NI50NLF7TT/NWL7dJLzTIk5de5A5Tlcy9My6qMOPtqlObQcPAXCUXz722sBF71AeA9zkXH35fe+0nbTNJJdqVAyGGiea16bBXoHI+fN0VnfdYwW5zTP0RGlOTZe8mAVPPsGOxZva8JmIr9at4ECKuL89yoseaPwFBr/+HQl9KYWF8bwBj05dgVTNyl1FAzM4ds+a5WPKEEkM8xcX8fbLtQKB7FzG56UwXvTRu2XgbKG+nug+hDv9eZRE8KdP/5k4kzBEyLhny9NswdzEyUi77064TgdTmIGLoH6ntQRebEPCZAFNRha4YJyG+ARlc4M+EUGFb//PDs0/HzjSGVgMl35G/8ACvZS/+xqfhTZwDl9VjYPZhpyTYAQMOSk1d4hDMjAk8wYQEEATOdRV7Z1X3h1TgmczCYJagHzMUEgYCgYhkKkB4BkFgqNRoDzo1amnk6vpDQISEpAKjYmjx2lEYgjeDYGHFKtOjcJiU583pnszf11iSWOJYmtri8lsbJFRpWziqCCHZORQr9LCzCPPsxOrIwSr7e1JdE6IcVGVbKpiYCnAAKaGgK0zgqbW90fkxPKQJG3UC8SqYDU1WSYvp7XgowMKVro3WrrC8ESoZHetYAeAjWPY+XymEfq2sGGgr7wt+t4680tqdleDdE3JANz/5dHIMLVg/KpljR5CS/9iiTkg7ohxP86SEH2zyI6HgGgaKEBS+HHKpuWOPzS4YSNbgAsrmzhoJKXIFFsnACQYxJInBQ4ovkVDksJlIkqsvznMtA3ALlOPEkQ6l1Oeb+kXXGSJgS4iXaIbpVRyaoaHOwG7EiTC+otfNGeCdti6pvXkUO4zn1g9KuwNmnLPj1L5Yutfd9k9SFE6akgcnTn2k3TA0CbsUFohBvYqu+FYYU+BUGjzsAGqxPDKFbMuNYbJ2D2zBor6TLmVnWuvEoaqtTLaChIkzZa+VWsExoTSJJiosDwDJTN4tSixaE2Xz+7TANFc+huomfegRPH1PmSHF2IKed7DU2plEG+mShGc+8WDw6uY9//2puy4ydrIwu/vXfgW1rIK88HAAwQywAQNCLrhiVAo0yz+OiTsK4AadLopW80cmOD9TgJLDkBHyTMAhMiaeALA595hyY4ROxmvgm50m5FhxrzIIcGetmjOOPEiuUdIBOMYixL1ONoB5FOeucQ5RgUQL4Yo3QpxEBiikIJHIUo4Mbh8rHlyzsG6CK6EbxJQISkDiqkMxFZhDHK0vyjbBAnJKsJubG4bCe4JOwJSyBZisvzlNPAa8e/QMaBEk5G6wqxCyQG4y9R4bbUxjVo6CxAltYamAKofUYZCVEIR2v0VPkALSlBNqBwBbwEBLlTPzEjSYBI48aDyYBYPyDVJFNPuRW2LnfIw2tICThsQAGR9oBrHxVXHM+eiORkMMJhs3WkWDmkIC/DJ0QSYrzTShSotQVpaLFJUHp5U1s45bthAgE50NDLx5KqhBRLgxvyQSpLfRfeRuXbgt4mg0hD2R0OM8EIXEJ88IYtBiZ4WPn89HCvDuTMRWJ2darY4ovhdeCzI+ih12OQA6Y4DJJLllk+IxzikdyWBxR5UZl7Vka+kzf45ILlIHmSZ5+TvgjoGXgapgSmY1ZahQgAACH5BAkDAA8ALAAAAAClALoAAAT/8MlJq704652dF+AwECIoeA6nrmzrvvD7EXRt33h9pnHv/8CYQ5ArGo0DT3DJbMpGx6gUl+Q5r9igA5oT0aCAMAA0DgvG3ilJmW27N55jOEAPD8gBw7mQMAQAAQV/AoMCXEhWb4ptW10DdgAFgmV4IncBDQU2ZQWZBgB3aUZsi6VahyQigJ0ABGcBNSOPAV6PBa01AYQNCWKRk5aIpsMwjTazeoEJICSEOiSBtaI0RJENBHoAvJ9/uKg6icTiF8Zfr50GJJEkzbA0tJG92Xy4roaAsK3xRNCuoN9fwo0TF+dYoE6wZJ1x5QoTP1qYlhmYVY8ApwYTQQG6Rm1MIF2G/4qcGDjOwbExZwxo+qKuwKNXoL7MusaPyqMGCgb9cufKVoIDC0PmEEiSERdCgbzVVMUKTQ5Cmmo+DUQAnqR6Iwj1OjPLEECiRZuYZGmtAb87NVBiosXF0p4GNM2ICbEnH7tNJQBVBfHxjFRwYa8Yu3QHQDoohFqFevTJoglA+FjRwEenMh3JMW9olCRrwEHFTnGADVws1kGFkym2XduwsqBuhwrjuexubmxM12ThjpVZNOkfQ8xFdKmOyEShJSLiOjNGDRJ8oS0KstgSazWASX4XQ0wHLpHvVJe+qlzRuZTCkMuEScW8omI6Qo+N1k7uZDRqlxrfqyOJlvn/vNXRgP8sqdxAFyaf/EXDfPRNMNZLMukAWivkDQLghTcEQ51Ns3D2yTQLNqjBWHsoBUUtmJBwFUAYtugPKrLE00o1vekg4gX8IFXAWXqZ1omLQEZhRluz/GGRKhYaeKODZ6HX0ywKWcNTkFQaiBIYnUQFClJm4CDAko3csVQz9gUyYJVo4jCkT9811IlsXooYpmHeeFHnKrekqWeGZnx0pC0NuOOZggwSMyd8Mfon5nB7NqoZZOpckslJhP7WyDmweMWVRfg0UJ6joFLjz6Y6lHAMAYUuchYZHUXoWSYshtpoeVw051csIqTqBhFoeVmdrMDmYAeujj0CWVtrkMRrj5HqkFT/sNDa8Mdq90jiaY0iDDQWPidyVZhDacYabVqZhWJNAhBVNIKuYk1W2SMnFoZQkBqOO8W07OyCrj292sDuKafa88Uck7ZoyTcHs3cwgUhUCch+vGTKli4Z/vsDr464mSeG9bpVgl9iDmmCV3c5OoiZmW7JrZKqptJWjm99qkYoMqkCsm0L54VGCCyCCOBlgTZ0CTo1oqrIFi9NAwYmMp8nzUt4xDezsf/47LN5m8ILVQK9GFmzxS4McQnFADHzH82mPSyuc7KRSiyQWpu5jCt64PplG+D1mAYhayPR7WNNw51Y0Vc794/cNX34dRZI12GDIQIYEPTZq/rSd5CJSY02/4BoXFLRrYs7EVzC5gCqYBTI8eVftMz9VTjq/7zSbb33XPEpYoCuNLVMr5weLMjH+B7FtN+O2qzLYI8IeYbVwmVeGlQLD62x8b2ORGNFxk7IX3drMeOWpa5ilnMhJUecvSLh+8x/huUF+Srqe5E8Oe/Hv8vkU8QrBvpReNbb5mogHpKG0xzezY8CYvPI90RgJt1JgVfouRz/hmWOs+kBSZ3wlNBC54P/gSEMGZRglAAhQf45Rjzs68ZwshIChXVPCGaLkEXMJL3HfaEyJvwP6NTxHwP4IWKTiQnJLHHAB2ikeuULnK8swawcGq5cCzHPR7IiwNCUoAdDMAHFFIa1Zv+Q0IkXoqCYMCQy8sQrOzDICBqcMgvytcNrYAQQqSDEPq+IL1BCqUYxNEKHIALqcnlsYhzZFxMGlnAvY+PFgOyQlTuAjY9e80sGp9CkAg4SQ14zlnnWGJF0QKN8qghbtXhiFfz5DRpFu+TZtkjHKZBwD570Ywly1QKkRYg5uOmbQqiiShdlzW39u+AqKHWwkazAAYSDB1yUKCp/TKSXQFpP8QJIC6gsB2SzfCEcxHQIjzgPdV5oITSBRDZgHmEAwvQhc+JlD2Ny4B9DuuEy+6eR6IyzRXwLmXPoQBGezVI2qdrCeAYhKY4cYT8bu2c0v2NOI0SOmzpjpF8CUKgt/EL/H92Y1zmHNj6Fwi1261HDBfNykFvkjEHIXFhaNHpOiwAxXCyJ43rao4aH6QguntJFyM6wTSrE4oHQ4MUhndYw9LEFELEMJtBg9Q7IPWY+EwGR9Wy4C2aybSloc0sqM6QnEkJpZhlc3cjcAoLRpPRYATpPSxzoopddqX9dkFqQLsgcDLWOd34xqyHWotOGGLRhAuAMlSq31Y3GZqgHVcz2dPjWZuwUAB24RAI896oEUNJ/9JJJl8JIODTpFB/k82d7qgY5sGypj8WZZEtZBSQeqS8WZvMY+iBxnyk881t+gI8JHEm/V7mDDJLxm5hqSD4xHoVkjm2dXDOE2C5UE1L3/5pNBtXmVMhaQKB84AcodnNQV0zHl81IqBeXa59UTvVCOt1DAC+yMTtA7g4XYEtbQKHahkGXY0jCyh0EIUKE9Ya8jG0NcTnFmMk667HhQKZNAmtKnzbEqg5VR7ladaF69YQ9VIrqfQ+aEQP0wlnvO0OCl+uZH7W0jXa1mYQKu0mpABiT1eClFI6DIGlpqqwVOI4YDsbdIqBljBXez4lWERuOBW9gAz4oPMA14706j4k35ikFtvSabkipu3NIspq8yLspxTRgak1LouYqKS8XgZ/Ujdd7X5hSpHixxyKZiV3NAcEXm2NNYd7gl2EMFbambzGi+Cd8mWQsxGalYGfrTP8Q7eyPpJgBuXFWhTdY7Eo+/vV60tjte4nooObe0pJdDEaJk3qMoZnJh8iMp0jOkpC6umjJHY2CHsgwB4Jm0wqk3kQNY6Rl5iKHyaUerogTTMGn3FCxED4CjTUoBcp85Crg47QEFFu9FMnhxxXWM5D5BBKKjqhGJI4lqAE0a0z4+cyWWRUzmDgBSIIEUIYFwE9apLeQlporkaiousb0Sbqd+4mvujTlhjjoBOLRDmba6C56baAcrY47y/RhC9TlJX66mozbNfHUFuMyAt1NbEybzP26+4psQy+KschgJxIQtiLjhzAyvBDfrLFxlbqKBBJonEG322CuFsbkCkGOS7n/xgeWP+Gn+JEwNP4tUtPdK9CyZccAJHAcE4uJpV1oBsMZcuGfp+JccEnA/MZCJpYUpkMuykhwZf0xWpszBekI7G9vEmtHRCLZj4NXRx5SYpz+BIu8OeyW9I6hqPppxkWyDPH89YCE5N0asbJEyBNdLiFexExFrIlcPbMovOOg3D3PwY428pqzSyUFMoM3YPl5NlRqPTUB78QBgKMD7nUb0T/jS+hx4BLSB/70KQV0QZ229e/gguZHaiBciiiBboVPp+amt+4FLiyf6A5eh/jA2NLDBzNTQZCuFNgA+KCJUOAmg0FYFRQyEhLQ8hnORshGjQc2De2vxdneP1WJf9aQ/5j1hMGZ0ACzBwQPkhlNonqcNXJSoAuGgRG/xwUOcEEB8GFSVGJMZwT54BIM9h37lQBhN4C0Jx2exE7xQG/eRH04wICN8Xv+IkyrYzitIUdQIWdHYg0ZxHw5NxnfhDtDJ30KODz9knen90xTgTpchjWqE1Sp0UCdsASjE1KzU4JkBAIr93RI4BW5QoQGEgjCA2UMZwIFkBG8sITkxwtOuCxn0Rr7hYKutAdcU2kj00Iasi5RpVx7sCPCZU/5YwhhKB0coRG8sHJLUDd0NAJ0og75Z1u6d4GmoXiPxnULomPpZg1dyEBwpAZalA7DdCSBhS5mGASzNkcvonQwZg25Zv8EYkAettKCIiAJZOB/PqZ7iSgSHpER1nZaAWh0QGCLD1d2blZ4bsiIqANpBPAAUSUJd7Z2VCCLZ5Nx6vCHHSIIBYCDjVcVGocantMiakeBHEOMxjg01ACLGQNANVVidyA5+lBQnYCDKRV9jwMa4tVDgAJhTRMKUvGNuxCOlLhRD0Nun1RioAEomACCPVBuHmh2zYFOdfc8ExERxIVyCyZ1jWeJH7OPDYNZ7HMJozQZfmUmQGBpgqJ1PoFPEDGGzVY1CFMgX0KImcYaDuUZfiBH31IksBcJ3VFEIPdNIGaBJtiJltVstIYSinUIK8kwedEJ0hM7s1gEQsmL4YiISNX/QZKyEg/hEoUmfYDwhk22C7dAQijBeGESlPXFlDN0isMYKVzyDpKnCwYwds2jXa53di3CgOT3dFlplWNUC0YTJq4BDHBlKvyXNHMQjllRBgawR/JClWjoV692E9x4BBnIbGSil3AHOXj0PO2AXkhSGERYJ6UVNvDEC9qlT68ijA5VkgYGO32neW2SCikgNpFTJyXjY9TwgqHFGCEWc2jhThzgAOnlkvBiIQ24lHIwBlV4kgjoWHqZc8aHhUjSP7ZAnDnwXEq5PjXDmx3QOdqwc2Ozhj85hfHwnXKwV5fonKmQc1gRIGwYKTYZRsviPkiHK1XQASk1Q0yGb/wVD2YZ/0DWZ1sWBnvFhJ52AzFJqU8A8ggSFnUFwlykkHPIpClmMmlFonsK4Gkk0JCi6UosgjHsYAWFlIq6p0RRgklIUmdX5QEf4y6CUBOHY1IN5CJmcJwnSYxSx3hUh1BD4pKR9kUHOiGIIR6XczAbEWt0EYa2gIyNyZWG0w3ESJntxhS5wJOnhJE/w2vxWRzEd2VpATlJ0Xf72XRaOjPt8V5mV4xMwhdilnByQDcHwDHIdlybwBbLKF3u8R75KQmmKQdsmQAKsHWloyBTd6aDkhobIS5bApF15EVEohl1ABO+8Cy8waVGej8W2lQ+iYk9UyDrgkAhQDa4qERJ5KdqqahvU/8mtVZsezc0Loh7heeY0lk40CNtT8opJFNVf2lvB/o3lUpniSJMWGdX3tSn0RVnP6VNRqRShcELzMQriEo5sCWqhOkWxDOku1oVgLKe0nI1umpdCHRc4iOMIXFx7glbhrZpzOEHVIQJ1co3KFNpSWM1ZSAQwQEN3bFFzUaTMCoVuPqXT3MsHFWtexGe/AmQ5PgSACCvdrR251VIjAaUL9OwUvcYiHIOC8kxYpgAeWqnrRZDboEBQsQT9risxiedQoIt3hJ5s9E5fZan0eUZfDpgcXM+PNRxYDEnZAoVNcSslFZT46Z1KNl2KqszOkovF4utW4p2tVc6aHRd5dMkdQH/Tog4WHr4p4+xW8XUQACbC2MgOXNjW27iHjWTLRhQn1JHW8S5LFrYWp0DV3ileFn7BWrHqqjoVNPArOaiAQxbi99SQ51zXljDSGtjLEBjmw5DhRmaPywiRCMzH2JjjV1JZV86sw0VTY9Gt8NFGSsyKyUpt1cIEIqxMHAQE6zHieDnJZ0BrecUlCBBsZcJKvMgVH9bNBBkIxvwsWLWO0CFpaAiaKoWKtAXiLkKaYK2tJE1S4TpfgdVkR4Fo6WUmvnTcLHasb0JUi8ipUJCVstbYQapAHgndAMjRAejK1UjQAwmnetGeNk7M6A3b5iKispJSyogNnk5pIbjfOnLsz5R/6H7tKGz+wUsEHwSliV79hx3dr/IeS54h6qbcHP/khnU6jI7+75+u7yGAQJcG7kn0X9LBLq11H6CZSv7ypSrYsBMub5Gq2u2QKZ555ovUEj2qFWEy5SLSsI6IIG84LwPNCOOw001ww7FUD46tRgldx5YEcHQVMEl9rIV2IpTUkD+lDzBtxiQAnMPdCKzmb6R0zxdi7/jF4/M+lQxEBrMESiFSbIoF4QU/Fkr53l/slsrTDUHi0VAjJRt3LMiDKce5RlqfLib5HLiN1pFVDWRkCNMRLKcQq4KlTlvscXPQ14fyg3M17iQSB1dYTjIgcaDRCccxcg6BCNNCxmH+ZHsxP+ekIqJHvS2cDOxyvCYG3ellByU1Ci/Uid5Oglwj4O6DpMgMwEXiOXCpfJTj8UEg8EMb+GnWRxsJoQU9QO8nJOeSXtnf+BtZ+gyiBg0ilZcm4fKRExQUPFSKQQjYvZmYUCN3Vq2rnhh6LxP9trDstJPnKlIzeUtJPbJYkDOFFBnzxJDMbSk5qXNvLEm4rMvFfZZ69wsCIYFYTJGmgJbB+oH5PW26KGd3cHLbrofDPgy3/sH9mwB3vB6i/WUcqTLexLRPHNTktmjvMKFjsU8vrDRFTAYWsVfdGZXfvAPBtN2Y0VSYbVQi4KHIhc8ZuDS16VoFihO20Y5jdpfwpbTJKX/EnBhyJA5QH9RefG6CNZBx0eydK2VB4UgLjmTM7iUQbsncy52y3cmBqUQlugLL9tJJcjQqOYZbBUZGWEFsN00Ox3RGXIh1JEFZpvBuQaDVLnlC3LxqH2ZCQXtSwxVdjXjwn4Rx8NAdnfRqRT9n2pL11ztQyXVH5foMIK8LP98ulUtDlIxS1dmIo6y1OKU2sOSF6lBf+xRz9oSPGt4DZZEjjT8OEGsP699F23DrSVxRhtxD4G2z7mdqrIz02u9ZoHxIBNag9jiz9GidzFzunKpdX5hKbzTdvc3X8ftR/fDgLyhha0D2aThOs0DG79iwBhNET99PNmEnYGhr35FlVTm/4BXDE3e0hzp1T5Jl2ktfSNYRWRpmqFYOE7UE7U/tlnoRJSyvSQPwKKOE46X6kGXFDKIASk741Ur2BFoDeESgN5qaQ1l4FPS/URYiByg4UUVPKDEC+KS7TJONlll4F/JvDD96N4gVUDuY94g7iDM411kvF1JMhkdPt1KgTN1pTVQFOA/fl03YIuawF5VZCQTnGh0sUCpCBLLYQd1gyti0JZPPrbzVdM1GDFQIiWYLDglzRga8XWaV8YXBFsPPuZjG+Mix2DfiaG9YMfWmd/Q2zGGERUMZEoqc9sUIc12PiKoELc8weeciB0LgcZCaohEwhUlF7LusTx0XueLrjwZcv8aezdJ+cCkaUBzW3WkdfyI3vXmGomIpR3RfE0atiQwBcIJGMsVB8EXnfojh2GUkeM8xwE4XB6TMeLQNv3PgNCgn35Mq21jMoLrK6EK3kXoG84MNKcbZCwwJRcChtFXvFNrsy4neshzlsVHPv0ifjIh8NQS2JAS+JMoZABAMOzjzY5F4J4KiPJcUxKck+IRGreNmM6j/0cnxi3j43zvwuybNk0tatrYfZSuadEO0GNv+PbQ7cHsCk+ADC81KRHdPCwhSLdO1RIVJuBjOqPxG++EvrlDZZNxUaXHsQQ5HpYMBCtcIaPyKy86Dv1iksYv83dCxMOhKD8y9r7zb+ABfl43VPqHuJJ2sOOO9HAgyakNtDov9YYSxW5NVlAf9ViPRdoXq1n31cyBAl+/6CjwAf5EVjtg9l8fAQAh+QQJAwAPACwAAAAApQC6AAAE//DJSau9OOutnRPCQIwkMQiex61s675w/Hpiad/4oMp87/+8D25IHOocwKRyGXPUijmoEcmsWpfO4ukEEgC8gTDgWws9tburer0R5k7jgMFbaBQKp0AhHAAECF5jAAOEUjpsiIluJIRdfnd7BiYADSAmAgFPmXEAc35jhGc3VImlSg43A35yg52SI2V/ApeZjHmyqgUJYmRFKKbATaiMIK13tZeMlwCAI5hlI36zIgK6sH4Goje/wd1tJYSP2Zh/InAkrQENBJt1s+xgeDUDYSUCc2EhRNze/RLD1x7ZmUdt0isCxhIQyAaKRDY9CaR1sdGnU4MDfXz585YFVjgDDf8CzGKm6k8mcmaYVVvHbBu9Bgof6moZDaGuOeO0kSC1ERHAktMsOQOkbkC2QjYwFQCkE5Afpl88AgrxyOgYAwWi5uDZs0rHknrmvUMIQo8+W43ULfVS7EuxOiqHeNLzh+FNkU0FdPU6NgSYs15qDCI6yK+jqw1IruLDp8E6VWNLDFKXwG+uBNR64eC6N0iZMcpOADKQjVjGioL0NCTmKJBg1EhNUF6Yp8BBLyZ0cu48AxaYP8nYTXpSMqTsimel4FjcxwydLzLxODSs8xDvGe8CmTUHmqazLwDqNFWu5XccPUyVAh+ODYTu6y2yhAIzVNVRj9rVRSbPH53AWetJNYv/UpUJNQp8HAwDmTIImfOOW49ktV9/FC6X3AhzTGKbKsHZsBuC/wTU14BBDdhHHchUqOIQgUTWiiAIFaZVUiBakN0q+pxwEFHrsJPVikAW8UlySkn34h4XOvPhXotINZgq8+nRY5BUaiFIjuqUQ9Qd4E1oHXxfpfLOfI8EWOWZy/XBhUomNvAKlKks2c8HocRWyDzgoYjmnvuI9CNTcKQIpw1fdkUnHO5d4wxYd0zI56O+wTLJaouasA1v03DSjKRkhbcHpKD6sg81SQKy1yBwzEichpWE6ioOBkrqXkne7dRTRx1uuuCrvA4x46KB2jaYh/4IQdwTftEVamy9Eopq/2h+GGdArSPIqQadFzoXjjrUAlmnpc0SoVkjqwz3HjAOoNqFWH55auaK31I5noq9kJMRh7uCg25hYIC2KB12yFvqnZbV6SihaJKBScAN5vFrtaYM20hwtSXmrRkMNpLSRF1Ms0VTzK4IXlgfc/IwAdYm8cFZW0xV8bvkfezRx6r4Md+d4XAx63jzKrfrYACHIBKNbKQL5arsPLKLinbmFggZIUOhc7xonele0N+tmnIPRjsiFiFhGFchy1s83TN5bEWdW5CiBVJAZBmBs7UMdI4xkcZDVRgKfoKcPbYZIasd85ibkhCYMnpZga3NLodzsBRjakzpsokivOK9FKt7IP8T6RJVzwgnKUshQWv6vWdgZ+yt99CNpDrJWObMHV+U87RjcX99CdJtr1wwKzgUh09q2OeSyr4CncTIVlwDpq9tKT0phksoW+CUKgVeja+yB01mGL9BYam7JeXj2/iWtvRQ2E2c9VZOMwllbwuqisrt5p6L2Mqx/An6PmuWK3mdSEsdIjIpcBSKbkfCHlXqMCXIzexk/NtHclrWn9QwMDOqsxQAfrAyPSylIeFxjOnMARnyRRBWw7pE846jp5oNiCah8F4FOoe3GAFsd6lYFPFOyJ/KqbA/NTOHmgIFO4RwLXWxUIvPcgczHhoihaKhl8LEUasDxgd8xOAODm3Arwz/OnF0qjIhCreljpAMrQQylMBR8lG1HhJxhV901voodBKBtApz5mhCYeACmDMawnOfiiOQKMU+uWwLf/fAmRUTtMA/gCIXTUxKNPQkyCCNa4s3wIsXMgSLaTlofi5wQOik06CVRDJ5L2lgJUUGGEzaQ5PEKwlB+HE8oTEMSpSojAOLA8dVpkIrFFSOJ+lALgpuYYMsEGVaHhSPpUiNFqT0ZZCCxyEAHqUTzcnOLOfWpNxMRoQxM4s0z+SvmvFnDojSFjAJMbf72OMEdXCmqDo2zjMtKA+mAwXg+uVHESCzDV20RQhN6LFq1rNKhzuHz9BZszCgSGIQa8O2HomQLDlw/3+u6uWjgAlBHKDGg3agSuRoiYHChOVK4dGlFo7jSr0R7ov0cFBLRxO2kNTpjGVrQ7u4FzZ5GgEWcuBTFNFSSF6paTSmI0dLECWa1iUuAwDh1Psc6BQxxsxOGjOm83LIp4T6C4hXmpnT5LS7EZIJTWRr0Xhi9aqoKDRmV6pTL2IIVeqAo6UjkUaV1ocJ/wnyaIEI56z4OawBZWCNQ3SGAU6ZG/uokmky9eM4NdkJtNUxQnZ4ll8+NA642G1hjM3Un4BUosnZia2GKGoP1RW9PpWEgW+jhz66sJu6BTIdtyPCWaepsQvJtE6kG9gs7ZkJ1xliDgBDikiCAsoZhqNVDf+SUvpqCK+NIW0qHW2smOZYpSky1iGtAMnaGjKfC0hiAHW4RiqB1ylLBoQYX+2fXw2o0aTwq7VDCAMvLYW6j3Gla/56C/5gFY47kBY/BAmPVZ11MHOcqbgwgtw4VOM0qG12hhP6JvPmiR54zUMqXtRbebpLlQ5L4W2YmNa6dnYCrpQmKUXKH248rDq3LFjEUplmHfGLA3TamGyt+6caSXWnaJ1yTCkcnVNqt8O9MmJcVbqmZIkwROC2Dg7NfUDXeCFg8rXru+mDYTX8NjXgfe07VMJLhNNX3MP0LQ+YIAWdsrSKaPl0u5S4MxjHhFpOpYUP8+WqCsNBJX0+BXIfdej/HooLmQCQYsKYMRzjgMfGsUWqgOUphhym5ZZ8Ro5tdXybcsLjwUV/oc3ueTS4cDxUJdsJondFTRr+ob6fKup/FVouheWbupMUgx+RTGp8e5jjYD6ZS36QU7oehyctBmm55RpdxxTGFmQazYv02GLbgqo3Y874edEKCUxS5oEGk4sk36ZXssBsvo6REMvW7kI2wRZIXzn2xtCS6UillABdJCCUqUMHuRi0osA8AoAsnmW1/yG0RTdHdL7SkIpGUgsufEcpjnHMAWAQmb4A1dkFZ4iJoXCU3hZjTV4YMnofk6cB34AkRhmb42hRg3G4qw4yVJDFwaEm+gDJ5qKWms3P/1ORsoGysz1qOQ511uf0/TCl/lxgSHBOt+Rx6tCtrtCEc1sEkZe66K0AARI6C5w8RfqnkOmlLCrCwGjcT9wbp9t1DfeK4KlI1y4fAh7G0O/aXa3FnVMK6DDui1vAEUok49YlMH6HBqRxAjA8VgAh+fOyuEk5b/NDv/m73Kt5AOaFODXD8nu/CqWDIY5xewjtcBEfRJXPcDauutUjTMs7UwSUVUW5xaTEUYXQ9PaZxudaARPHJODxFLB6FMtZX7LkQs89tr2kKOuF3T+PFqOH1eKBD4AD2LIcp0YRTICA5A+XxCCDNAb0b4BcChcCL5ABAA1e5wi4aIFWuabHUtC7NP9NO0Ydced6voFE4aUQImMMjxV9CSUYziF2R1ENfeBQeSdJ5kRH+hco/vR2VMdB3PFhw1EW6acKqScF6PQ8x6Iz1yYACQg8z7FnYSFdpaQLxod8FKAgsSJLIHiAhHc9qAJcToOCqBIeFBIY1ANWgpcLqqcLlKEy5vMvNhMt6beDUoMacUUd7FQa2pB1CJMLM+UbeWITBrgJWTJ+QKAgWiEjVAETIehBAMQYgLZP7FRWQphaLgVPl4Eh9xM2TGgTzsRcFbV+ozYZ6RUF6YM66eEAWAhc0aJtS/Y3z7AwSch6/wYEr0AJwEE6B3c53wSIhChpTXWF9YMJYMB1LMJjmRb/QFBYSmpRB0lQdzilXWVUefoHZjRjMBgTQ2QAaHi3dGnYhVnzDNGWLHagDjQ4AXUHUU0Vi5czimCmKvT1PMsGPeajeCwiejsCQOzBRmTgLo7HQRB2ib/Ye3fnWGBWciSESiaAiCXmhdQIKyXmixjygazwgeERHgbwA8hVhNQgB3kwgeSxd+24D+PQMdriYDogPpc4iq7kQ/wROu8IOo2QFeGBj2DxYX2lIfVlFJexkF53JXY3Ag8wRYu3MFuUDvBIFuRQG24HNn1gADRoNDD4PDlyaBMnEhAxajYJF2LQHPqiLjsDWqJyfhSiMJflDEEhEvLXA+13eeCCFBcJRP4h/4VCEn4N5Bb2EJI4YzgWRWWjwYnV+DpwVhNZlZRNsEAEJJOZYorKgXcraAMqNhsksFxX6Qbz4QUwQT4y4pU5BH47lTf0qEcVgzhPQpNK5gm6oJfwsDA74ldIYCxPIyWYBHMnmZg2Q2h+Nh/ec21SYn5N5SneYhdnSXIAsx5ph0ZaJlpIaVXOoZYSpCMNmGONRVIdoGai8xm2M5nO0A5n5wsMsR9HY5qO6R2/IyDZpVvgRxMwRF+LZAHRmFw1wQ7tZ2BA8nBqCDllhTEkwHChoC4Dp1sqMWzk0WZP0nRrM2szFI33kx3Ch25JpnV0sHlPFGKAUgK05iBrkwt4SRTXiP82QQg7YjEF/4WexbFU7AlyP7eR4emRJzgPkOdg+LFr9iaUWpcWDgI75HMEv0YqJIkOrbEluBkNOblhbchlN5Mbj/ZJQVSPQoJBE1ehVucUUtMy4fAIY7GN9xJCzQcPIWSAQzgk2BlRD4CFOymGp7Rt7FY+wzGAT8YzBqM9yCIjakZJ8AKa+8kiUgWWZyBnZqCN/eh0b7VC+BJMzDJpVnZujSIZXxZeI0haoqdSZpZDPUifE3AoyGBSImqlOlJfwBQZIVNnPxYHZwpf72OnbrqM0cKjWmCKz8IINcgvLeEIccMiH4Gbvxk4YpIaEdieaQNJtZEAVQpEuglmhugSkcH/FerSEnaDUUbAnhfzn3tlN06RD0VypFTWpn4DbT+qXTXgYsuEOpkoLsswTf6ZhWizqXQAbWWUoxjynohJG0o1ESBmAsxpXWnhj4ZTooO0Poe3LhojB7TZZAX3TUsjBaCQUpkqM7Ezre8GB+4gNUjGNknGkDl0M0iRB57Uj9BFJUuJqEWga9Ywkq3GGZ0zKXbmNy/0YtWVOrmaCsB1NerzWkFHJWwBEbQohtk3K3JqARUnJchwNldDnj3km6NKKFb2CUATbnuCd/y6D3YKO3F6CRiAhViXEvOCG3lgNWyVVR9zGP3Sg4xyOhbLbu23Q0dzJx+CPFAyWJEaofkCr8JV/0JTxK2aFqhoorKmUw5Ig7GWAlWnCjiBAjwEqqySZj3nCCzk4lCsaXqZAD8N6Si1mBsa4LPF9BfsNXOnszNvIDmAmrZ3Z3m7aZ1Jgq7sFLc5omnrJjU9iG/8+Vn7VG2pka8b1aafKi4Pe6360gGzxRiK8V0Vl2780TObeh6LgSRi61qHqlH0RHCm8j37WAspMWXbUFA4BlcV0RylS4JU2YWBCzj3iTIcoFlfE1jTlTVQeVBcZDttiaQ5UEQiUEtl2zBz6Aseo1rw4kSJtDCF6gvB5qAiMDf7FA15KWPYak/8IwpGYUue2rZNkZzdywKJSzObOWp1iSa3GySelFIrS/+5pVk9aCE7TjAf32F//eOqkDWcGVUC+hVuNxaE8AcOhgMIxuM+3tSu/LGniltPNoO9uqsYe2BsIylkx0MwfFAQBmyU42u8QhKd2Xc9yUJKP4pLmUlCpOZ2kzDAToPCbFYWbdeQUOodQtE7IOy+YlWpxemJSorDL+djydof4DdyDTIzyylRscm7bwW2CIbEknG/A+SLn7hqU0FUPDBSNLd9o5YjO4fEnVAMIJG9+QOsJhjFCcIp8VB+xXpmKAw9JQYTkymvC/KTPuCyjVK4XUhIbutEZbBY/headXhXsdlirtc6YVHDScprjTxOnQAhWyxtZ5AtzVAGHHh9hpOWFbT/qB5syGJQMaSYWh7IFO9UPGVoCxz6fEB0PkfsRJdcYv7WSx1lIMBVjBRQUFFXHLR6cdoaQdSwWAwME9HEw+bLgJ2cR6cwxbh8p7hzrwb0KDUrBl8GE8MMvqwcu41VCL5cAdO7LXfgVGBaa22UUc8aLI5xwUsGPeb7JFfJOZGyMCzXgbOsYgwLKmABNdgAE5MLtn8mpmXbvl7BjqL2JBMDRgxFsl68UlnJjjbWUDJIvbACf3q1Vbrqu4pToYMBNU0YM5wXaOF8pQ5cr23xWakiJaM1ccK3tLxMHGvwE47jGiMNlSYrOHtTpibnkc4BqI7xoQJXOlz0bibKBha6QB18/9LP5MX2YbtZ2LAEWdVBjQ3xRNStrLpmXCfjLMXJ8B8M3Z5DSaI+TdUJlx8MBLsSG3BfrLdfHccVds7mEm3wygoVfda2eB6wpdWS5jxI9IlPE9fHk5s7JD4rvFJWorm6s9K6EwZY8X8YDUDjuco75zBhQNgrUMyvQ7Ec/Ue69RuQ7YaQYBunjM2VtmqxYcai6GjdEFVwYhep93eQwh2/Rtao/bLBwTIVJnZzUj3y5g4zVsp/NTaP9AzaxzdjoNm9Ecp5SBvXfMeAO6P+4zggfRWGEssOhZITVMLG+5ui2NCvA1/L3RkA0Vd1hMcKi8UWsiafs8kKl3KYwhrxl9V9wf9JWOyy7xXKkuJPgsDcP8CnuajHobu0B4VlrCwxtSKcLgTg5OcRtnN7Imcx8hlHqRIUbKJesdxuY1AjEoCdGBcL2PvN9YtQUk0LJPLA+TKj8u3hpzmSZ2F2eHCN3t1WUNOw6BYQ41JCDs4XSUEI+HCXJi1UoBpZBKoSvzUztOXi6npXYyCD7IDgcvQqvdM2m0sXQV3DWOUIPX4tSRaq5Vp0fAWb8nJuJiU0wXIO1o3fTlMMXV7TiwA2qWc7dSRakjDZ1lnRtCAJsFR2MlWCNzy4TJ4g4/lZuMVnOswMS0eyZbqSDcuuFkcHkSLlP+jbg348UwYh8RWEu8DWwVq0JQv/IO8GBrZNG2FJFt8szW8eDJ/3BCMDuWJ4eyJ9DeiB21tSSiudlh+UFuHFp6lClpc+A6thNpJxh0t14fqnEHIrV+IFc2nziE/hsMjhLMu96htRbtXRWOVik1gBwJ2gEJvArd+JC8f6wERBFakS2G4e7Bxk69RmD1jhEMeBEO9TbRqiPqr6utPy0Eq+7uyuMtXRjyyTHA+ReqAZl7XxLBJKhOpcPf/9715RHfpgUtHEHSbRpcBCPSbSh4nkwXAN8Vcwfz+VUoVbQHgSGuQQ5Y/wY1M92CBfNLjSiaNxDwmwDhOeRa5wvbPO6G1h7S+vnfkTROcLgDtVQlpIsqlhnj+vNggxzysEEwhKv/SsvrBCVZfy5/NSn0z/K7brWu1Zz+TYDqa9dfVY//VYkAIrY9UogPZmTwERAAAh+QQJAwAPACwAAAAApQC6AAAE//DJSau9OOvNnRdgGHoOZ55oqq4s+w1ELM90PZBtru+87sG1oHB4K/WOyKTqN2w6hUWldJr0NGEgwACQBXi/A8EA+Ix5qOj0yREcj0GGbWBuEAAMh/n8YDcE7mFcZFBGaoZqDgI0bnZeAQUFcXYNIDEDATJhBAIGDYAAelpPZ4elSA6DYY1iAo8BiooEW7KWsbSyXpubj42igzUChabDS2RvW45AYzIAsna6YZgxsVuKMMjMrIJDwcTeHcZZ1l5klTHNrQ0Eko/M0ZLXueeBoPJC3d/5E6iWqmD9BJphixHnTgECBXq5KVggAYFXdl5l2gQqIBdbQQTo+8Ymk7Y/y//CwJAEwOEYTK0OYsy0pYC6grzm7ULZsoAoIcI2IsrkhRoQgRW1qPo1q9nEWnMC3pJRB1SBa5sMJAAl5pelnDqVoLrWpVyMAGMAPF1ZS+zBniKyPEIX5NWjBJp2PY12swbWrDysWLIkKJ4io5rcMNJmUxbELk7VVXPjMUADSvDMhY1DCO+RrSEnbgmLCQiIsKy6OAZbKwRaMc7+9BTc6kvKg5n+fMZpeQdmwSwf9mMkFtOXRzaFtlmWmyIo1U4Phj1urOkc1DZqu/DV1TNbWaxjIrNF/IpV3nNcNjPqEcvJhiBpS19TVZU5a7NEimyU1Oqio/j3zsACuM4ibK0kAJf/f+qtp0EiqRhTgxa9QALYfzZcwxh23WEXoR2zMaWWb3WYY5eBGSA44VLdYRFRARL9l2AZKhozSD1csCRWA5i8YlBdM9xloIjHOBPLZxGdM0eFJRKVHxG72YCLbMo4BtdnYiVgAHk0aATiPu2tUstQKamjn2ZF2kechLiNKWY/9RAGRyAuhWWflSAiKMMz1FWVBYpfQkHUd8WxtKeRxjnVTId/JORGjNHtyIqEQgn0xmvS3AIVhUkOd6R+yiiz3y+t/LGJGGZFeglZ06xXx3yDPcTbjFTal+dS+0lKpoSxWkiLpkHcVA0zQpEKZ1YOMLhcLRQ14lJntd4HUJ+3poJp/56ujsgXdM742EiFpQIbWi5CIYOMY5Sw+CqsR/6J6YqulmZMjFsYYBO1c+oULD2kbRYIZ6RBQa6ty76aIJFffufqakwd2pAqQeh4CI+tQPcKPfsSIW2Jso75rJ9gtsHNNthxAUog/MqgcBrzKiMZWCnlK+6mmx6DW7LJ4mopERyD4gdBsNg38hQltycYynN4ouDKLFU1rrgTT3oxfuRs0qYz9Hy3sxJxLMcoRKA0AJukXF/hIbmZhiStskrHfKTHm+kSUNCI5mgKgseB5GZEWqf7RHv3CUbcoozYjS3FsnJ9iTSVyCF02yIvLFCQdoCntZJPvNzyG2gNVtVFFJJqa/9mgEo8X2G4WDW1bcJBbVE0Lj11qZ4u6k2O3XmHIPHkIdcOTRaDfJ0tGr2avFzWyq08sWnwEl1ejy2DaXG/51TKk+hozNsaozAAf3QbkglGlfGRh/C3zCwLIY/SHH8oRckA0NhtXLp3v5+W3K/8mbnMS+wLhezCi8UUVdsxVnuvg52zAAKy+HFPb36alMy+4wu9Wc18p2CQYzzDinYIjzv2MqAGP0UUzTmhcXuh15QSdRmhjMYdNcEWN4zGGdhtsHsdpJALz+GTaNBoAARy2xEos6zGzQhZd9OG6V5IRMmNTYX7EUUvPPWQVslidB3A0aHk4BLIQYgeOCLiC+VTHqL/beY1flEhFDfQvxehTnW288g0BKXFNm7pfWXTmDO8EAn++GURY8QAglpjC1A1hEpEQM0lHuNBNxrQaPW7Hl+4kqWm7SWPFkDfu0LiFJU1gRozKqQhDwkd5EVoXLvCIhNvBUkKYOYZgQABcFikDKfMcJPckx12OjlAXMknEI7RggE2VUoJBKtK/MmaJqeBFEdFDJYaBCGxagWoGBkrIV/hziZaICJmisWJuZKQh+KIzBcq81Phy88zOrYfHmKnlOijVlxWlxsgWbGbWlSmSI5WIf+EhQYpogUAVgA3FGHka3ySVD3yBk9DzqZHnZtBAAvnDzymwAFVSx+GrmFBZRVn/3AFzeg5ALNOmN3iYW6iyohgkMc94okiLWnAAGkAmG8uTaNbRBTCyMbSbrlmGtIcQAqqNsHqnRF2lwuImF4JU1ZSR1crik1o7CQHXrInGtIY1SNU6re/CAB0KtpiUbOhRn0RZ0iM/EIOq3cCcy7jIuDSDDCmAYkrwJKoBpSp7ox0EvckZg4tlYUJfrkILkxVk0a7arqQ6EVFvlU442SWhWyUmIjykBVTq9qEcEkjJ9gLkV494NLgqsHXgRNyjDkRig7VExltwAFg2Y512kRYpQTGO16Ez0sJiiTjZXAW/trUOOXQLc2cVgvpU00F2zpYbSigkNz06p5kqFnujU+muf/1iGumGMKR8TQBFaSj0C6JC6y69W7/Osb8OLtBXUWKebljknsI5AaFoZZlqDsvtMoST7GlJUPvbCOnfCER8O1mMaahA3n2h4EcJpCdapunZT/oMxEQtbWGjVx/GZrVrzDoRFpLSnUL7LJwglIbgHQuUwkLVDkS8bkqFNvp6JZaTqTiLtJbTTxUNrRZ5lJ4i6BWYsHmIlZqMW0Dqd0yOBECsI5EkGa4QD+FazgT82Rr8aOlOsd0LUptNSDjiCp8gTCldwimy5m7AE+p2pPwlMGTB7RYKrZ35Ut2q179CsmQ/Ke9erEikuyYS5lv6N/AiGWL6hTk2CQ2zC2CNBdHnDH/my6ypmmEISdwq+yoQDGVS6HsOAa0TjlKm2bvkBefvbLkgXGIxYtMdgw58c/HojlVJ6CjosbrI5WuGmL5qbMvLnVur9B4pnXclzVk2icF7DknR7SVG4eSL475heb4DQWnxXb2IuliOzmvLy3U2YIpH4RTVqVLWIhbGUd5UmtnZ3GRzcXysPZVZ8TUIz26ELYvUdPgGR1TKbLEMQJLg2DLDrYfhW4ColuRG1pZYkpxgwReNXUDLIFGBPZeYUQCrixEvsGjuk2Lmfz96Rk0LkgMb1nc1DsqRzdcAo3yxBeyVu55pOTT42hpubXXE0cEwA/Fg5l9NXgJVcA7hGX6bwjY/wuCQqR8xqM9mh+9RLRK7FbBt+uSHkixj/J9MnSgyfSpWkNbSvljNdnT9gN++WwFRYsr3GZRZwKjTB8GTWsuOcCBrK7QO/IcNLhMJGtcc9CQgGreszO4ZlbtxVeDqhOs6FDWtNaAA0wtWDknEXlarlx1BylCeuuQz9wDNWEnwl9IXVBqRNyKgnRil5cFjljkjoJwM+0N+Yw1gyrSuqKhzDQeQ6qVRLT5eqQLJlCOHGh8bxYTUZFGBWB9Cmaejawf8OMVCdhuWoGM4yj8JrBAOahqTrfS/UJYHkRikUlSWaFK3SXo1Jx1+m1ZkqSIMSomcjpQBNzU4lv7g4MD3SJ/K/+xoH6GMIAyo/Vy7jFVkNAAvTR2yUINhEN5njMWYoFBFqIMiic0sHdWAeEBgpAe9cd0C5RIZQAWEThIsAE0jxF3OtBjm/AG/RN7Z7YQnCEQF3MNCTEJ3dIwPgUAHyAGD6MqEedVBJdZi+AW7OAJn+I/jJcACSgB1DBO88Murld5hgEqcuN1ZFKD/scIPQhZItKDHjNBERML0SduqgR8X3F8j6B81NRKmCJTHfcQVDhggXNk/pNa0bB5L9A4J9ElgrdInMB04mIjeIJpmxElkKCEPGAyCxJq7LeIUHUuXKN4jMaDTBUMcqI9KeNf65BSxmNCwIUnDZM+CeAkPSBNxLT/NoGwS/FTc8c2g2PQIcDmI/PxAUfBJvKVOxShbBhnfhBxY2glIAGQAGqYAx1RO9G3Y7AVG1+4NWbyZZtHZStYBDUEe9uFPUcoPF/Ui5QwacARjMNITRfFGbOENMEmQaqTKRO4Hb8mO5CVP4yWPirFbFvCdfLjMc7hJR14gEtoSnMihqloQ63lLD8hQaKSPCdhc65xaHYwL8aBGFW1Cw5oAybUZL42Iy6RAJcRbWpDfXbgEPEDEk7xXwiUbL9BB5ezkG9mS5nxPn4UkVUiECJoQa82ig1xGRSkHy4WYfoiCISoQLQiNtnRYBA1ZLMCFc5yOYWRYiP1cTEJG2MxGjXZ/wMdkTaNAXuFtVFU1DUqZjkicHsXMZTnAjKDFovCA1xmyIvIh5FS+Ua34kNSASGgRVpIqDyZUTneUw3ioIOUYSb+4zNhSX1NZ4/IUIJhgSKOcQSOoj/koEqYN1QH6T+wsZUSAlIjaSdFlz+Pkg4NVCWwEIWXlFokARu79gcI2AOLQx7Z1VBeFICqVDfwl0CG4kDW8pUSwUfaiDeSQm+eSUCxEU24czqXMCUFsI+Alw5rJAdZcDNXCTQnlTdukBBosRrvuJAScYyfGH5m6SivRBIVFBqcUXo8QBlX5SWW2S5S0jUs8pRJCX8M5xyGqQcQUQ06+DBB6EPeFUIcOUqBqP9Ks/cjqdEH4TktkOhKHgZam8hy9XMozjEVcgkqYfAAp4JbGJI+xvR9uEBxlpBaYKWHNqUFAbCPDJlYYROSzwcTcCF97RYlNOcP2hahpDGhQ9Ist/BqqrgyL2qHD2JHOkiMkjU+xEKCrFQmH6OiMsqeQ6KiyyAbi7JPe4Q1X1gvVtEoung9gtAwNAQ1mYkP/ARcGaKI6YB62HgJfvU0BpcpR8parPko2sZ7e4cnrmINnNCIB5dKuCCHmdNLqEVFrcIcRGplaqdKrbhlOORXcnNkqWQHY+cTNmaEP4lCf+ZFJLGZYfloS3AqJNp/llpFw6FiNZBnBZmOsgCLBqeQO0r/IEBSSWSyKaE2TKlgJ/Xihgk0RpAnBwnAjD4yDfqJeQtoeuHiiqH6jFf6RSXQM/CZTxOzgkPkZEVzoXwxJ5P1RHtVpVOlkkjBXE5WZza0OSKpjrgpH5A1dqv6X4olH/awi2hCOfxWLc2Cau41q3xIQIVjpdbKOjIgG63GTF6HHKYmi99aMj03FPERR5cwR+y3oghzcSAIrRWggb3iFNbQloARfa3TawdHN5H5LLMSEXilcXeGcpTTYNC0XHBaNQsmI9Q1Ivw3DQw7UbgETZgiSHcQkd8TBjCxXZw6kqGFNnYyTfjnQI84LhdxB8ilJONllJt2SbLjOLagRFThP3DR/4caozf2iqbWqk3PeC/moaW653Z2KJEnqS+0ZX9T9jx/YrU1oVDWcHNUaIQvKDn3GI8/CX8uho6plLWF8Hl4+TERYXY8sSRwaUUz1VEV0gtXG2DNKaaHAqdjyDqciqsshrGZJxyZ4T26oKUiQnyFGUJf0hlBWLK0IrkrUSIY0mAaW64AJksFlB8v8y9T64Eq+Yp3Kbea8itsanIjWDbVMy2vtGbiqljiAJ90hyENmRoum46SAwX3GDybSmTTJWiDIAw8YjL8qYmnKmr0tKxsmbBXIGPTY0O3eLzHRBVRYkxXVHN4JZ3wkhM3uCVNxXAUiK75VbXqmqyxZWq4lFqJ0f+7fkMDhHIwYZNA/YtdK5dF6nsoxXISquiTdeV8HMc1+kNxq3KDG2tDVOWn/qZPTXEsQzVLTSEVkgWHGKFTCzsYdcZrVsYl6yRAlfI1+KUiSzU/xtFlfdAAJwq2Z0eHTmI2aCKI2DVkEKFDpoRAw3VuxhBVvZWM/CJFSOSzYXUHINEpj7C/itQuhhNVG3crU8KHZ1U6SbawUoagKeasEBO/6IlTnPKaPlsWfhC0icFZYpLF02qF7VQQfXFWxYMB8CEHuRor8PeOZLxvyfM+F6Zgj7JyrrpwZ2ZRtEB9M1LBCbR3f2J1v0IBiSkP46W5mdGjIbyp7MmSYZIl7lbH9BH/LgCoJGRAKDSsTviRuNgyUUA8woxQp3akrf0oRGlUcMNxLdGicW1qgcJHYtXzhbWquQGDdvuKUyEcImabJUB0s3sJw4psrodKSy7DlXFTY/c2aM5QhE8bMc0YERyDsLtzAfARr7C3yQCBa0RcslCwCt5DPEtkE2/YBF12B3x2UTjZx9sgzgQwMmwwoo3CbURCn31Riz7mJwhpyMfhe9GMNEcRimnlnGMCq3UqLIt8WuviewucVMD5TQuUXEBXmRN6xDNjW+XUmqPoPCvpUoxR0ImzAeUMiqS1rpgCUhQWpEyMjmC7080lG5R2AKkqOGkaIVzcxRqQmK0Ev31oR2qK/zGe8zcIpolhmitfSMNKE3Tb/GxJRCR7FdRCdS98vC52UheJdmB/C0rszMn3EMD3A6qnDFwuLYuvrAGMpLv0OJaLAdaKpVYH3dDsBmGpkMV0JCpFgiZwrTX4JbgokCVYewnyHI68kSroJad+TbFpzNP13AkeecL/0Yt/1AjMBQSyyhqXYxa38sikRcI6XaC7SLHhc2q1hYrpwKC0U1OGE5keI2g8iwJcQTnAYZRCrVSZecW9+12BI32XAr5+4tNTBUT6W7H7xxMtDEn/nGyMerXOo4dqGjbKzdOrXHCFLXwG0L+P8b8xQw4253GYFQP8FFbV2TsqKLfXZrTarHNyxP/R3E1APjveagEJI9UiWHbc6pYZeEpf3kI5V33aCE7CYBPbZQw4sH3Cz2oYitcJ8RjNJaLEKFUi4DhLLJsqaCwrAQSwxf1Oq03cV3xqasbf7ZLK4QUtxrdmFtfPOdCEp6q4qy1DeAfiOBvWywIwsAKUsxLSr6h4TsKey5NUi0G2zeIDfliH8eB9Qs4bDZbTy7PK7hvknYyzjJDFdINdZPMdfqnVE06cPgGZC5U0RMJpCGW8xwvhm2PezehAMUtZF15hE/F+5bBSNG4bazRQA66HWu5A2o2lSC6bbh7aQl4p+62kb0e32CwkZ0cNmUCcTEhfHRODQz40H5spwJrGU27/5YeeJO3SYsBzrPUjUmcHQX7OltnIZ2FSJCzLvqLu5jmt4znNCUp6HDcU5+Bbt3SHrItQBQaOVgeDy3E7ZJ5F67Uu6qFO6OPNk1nDoPltKYjGZn2ruZZeAdJr7Cm9lWkkl7Hu7M6O69mBcy2bANvoUStJEKEWm31yDdu+sMVGWb5xl+u6uloY1+Te7z7bB0pKHy7xwagtM68Dzo6GefKmBD+ytmfRK0g26NNXORPr71auShv7EalztZ0MJg2rnygLXPMeScacFNo9U7iOMftetBbPxGqRJmN9c4+xPs6zOtoJLyL6lSTDF9yCNiA+OftGkixP6C7zwr3Ad5TD6xa4/7q+/iYqGDoIbQjckZfpUe4xI/Qcf19afxpAIvBaQ/M6Hl1eN7ZUeaeGwA9LwiY2e3EtX2enQehaz8u4Fx4NYE/6HuZ7g5uKKVvyXgqnBKg3tD79hclBT+gLPYnPGPclCQldJpmj3ofh7Bloi+sj39V8MRpT1BJrV6TbOucaq6/YNsDhAQn+hOhZnlC8xUxksD6H4g1boRb9AHxKPOQSTt/0UqyjjyKGyfoCI5tGlNqAEhcTwxH/VBWtC8hxZrS23vaOP5LhNLgHT9b+SOon5/pTf4dRIoKGXiZYPYEhXcxA7v1ziOomQ5k/p7sJprD58HmxTzcqZazLJf5WDnTaqv/vly2uW149RlNa/6REZFL5EPDkpLU6QbQAIrRE4DKNGE6zPFdWYwdzVeG4dWX6Rcs0J8STJwBQlQSwncZhYTadzycGOQB8DIPr4MhDvVzcpK2mIyNTsV4Oh9auRFzSlLeE1u33h1QbKDSonaotsB05L68xGbCiwUIaFQCiLpIfnh81Rzo8zU0KqRiOAKq+IUETgEKumzK5GUSdGzYuyNOfSMckoJqUTM5eTU+NK9CCDdq9uFS0mVsy3VjVri8ToQ6XLceejikWXl9vOwdago6j0Eeqj9PXysRWRFU2M0Pr2fZbo5EXEYHub/+oawD6GJCFjlgSRolsKCwD74wccm7/IKnIQEhckFn9/m1kgkFaqQBHBBQoIIAguzAodTHchvDZj1BI9hFZdE1NlSoaOe7sNAnWOIMwjriUxk7lO0NdIgo9JTJAzEkrxNUYAUAnT6x5sE3bIrDBuB9DZ7ypxEgZDkInZmmjcoQWB3FRIaXVIgJAVrxOfAZzO1edyGseiOQ6dOZhC6mQgEgNANQao6kYIV3Ni9dBJbdPjQQwAFWEgQYFqLR8VXdovq7q9AkMYqpxiWphTFutXLtjWbhKSwY5YSXXIA6m6g5XGypm3blqM5gz7GEvcquUbVveq0Gb3RJZnJMbuoPD15CutAgc1/dpeHRUXPhVBweQ9OmVL5fd/1OAJoFQAhNQYrFvjx/VJBqvgXpy4yCIxrSYhpTn7IIvvto8YieQQvggwABQ/BAJpq/+auvAaeoax4ADYDhOm7/EGouDByG0zYGtMKtoolP0W0EYD4Aa7zS1CggpFA5OMgYnc7YKgkUXk4xivrLGgQS0kGSaJL8A9hMmHeua0mww8sIqrr1lHFRyTICaXLBGu4YwwjX+PFCDzaYAMAAQ7Yx0Y4AWyUxSQjPLkzOB+zIApc2S1quFmDjXKgUMt/LUc0w+zWzjyCuq8ANIAAiMQRicMNxn0TCRfHRUcGDss6waUQTFU1BM667PI6MjdVY8gDmVvjQuOXU1Bxyl9dc8QCu9dVj6JOsVWGR96VVYYlGSKDpfk5XWgl712LULY4+ddtusqvX2W2+59ScCACH5BAkDAA8ALAAAAAClALoAAAT/8MlJq704682p++DXjWRpnmhKggLhvnAMC6Jq33h+fsIg/0DggKYrGo8lRy/48jGfrkENSa3ePs6mb8Dt9gTgIRgg7mWhU6t6jXGcu0MuOQwwDAEBfKBgEOABdWBLUFJshmtYMFxfXYAuAgFcUXMEXgZ5AH6XgF9PaYegNm6Ki5mVfmZNBC2nL0txkgMABYABl3FMhaG7JkpdUZV3Wo+LPgGVji4Ap8tZgwSAeH1nMrq8121kcDHbrX53y3aQBV3iAA3QW2SuyAkGfJJCDtj0Eg7acL8xkUN2dUN7BogLwO9fHXLmyEXZAimdH0DUmsyrF+oemGBeWrAaQsCOLHJ+/5AtY8VtVcA+ehplXIWsQJ6ILyZSZGOxWzxop/wxzPKrGTU52iphFOCP4C+Aq0wFkTkTSc0t8aJu9Imx0TtZZorJCtBAULVMexoMiCRyEskfApo6zXQ0jLBHqtzC8fMyjNytIAPIbXJObx8wZJV9eRaDqVoV9/CZJStr58I4bgGTA6onmlEfmexmnSUw0yx0Wsas+2H4cC+2bee0KKO5rmiCerfdjDVXECc8LoU6gdOMrsCzikyj8AWL7UNZj+RCaqCNU9aqVfNJL1XLY+Amt7b6+AuTQGnh2bKKgbio49wyl49Kj05b3/R8bGOg1LPqzvXC4Dc8BSdnkV6IgvhRAP8t7xUYlYG6TZdHGMnNkkAnyxUAXEz5ZaMPedAIsmBmuL3UnoFQncdePqTIwokkfjQgIWNcHUdahRXc40UpKPIDiYl7xAZigdDtCGI0tkViAGrfADThKjDag09j+UDyBR6LiDcij7KF6GOVlO2xjGcELXMKKj8MAKOM9uloonG4vTfllViyOd0fxdXh5Sm2CJGfjJNEYtyCY2i542NWPoYRoG6qWcl1YjgRCGFNCEcmVHOoBo6fhbpHG6GVWnneN024dZtS3BxGJqfFDYZHA/wUuqaabK66W4aDiHEMNHv0gVZTT2kZzJOSMadeLD1qOmIwmGZqE1DPDClHAQ+CCsP/dxXh0xc+33g2IIglAdvmh79qyuqPLwkWTWa2voiNAzb6WSSTkKSqDzBQCaUKsfIa2mqlkIw2TlcdTQMTtIikeo5PaC6JYL2D1kvlsbsZ+16+XXBlzkOj4VfRNMP0B5BCDQND7E3zlkdimFsg7Kp04qG84UsAznLAfVHsMk2sZuyJKrdRKcLNc1DoLG/I3o6MM1C0QDMzVweEJAPAa0V5FIdciWXvyFF4Vc1Pb+QcYokOw/daJAwubcijXSragx4SVumxz90spAUsWt2RSnkJY7pqdBjFNk4BQ/2LiEfaRQZQA1L/OcOcawui1RNQ3QXyyT4qhRVfjFayRrlV3wFO/wFdrVfNQmEn2HbP3NQGE4nYNjlaY8rYAQTTVyx5CmZjXNst6sMycyTpQXgFbLF/NjInZKj57ZRHqDRsIufelhSMl2W8y/v0oHMkb8ps5vvCP+BU7AoVRxeduYnrPe7KKw/lQf36MXBaeqbum3LHgJXDvkNzzC25rnrwftwWVxJin/OEgJZsYe9PydDKHhQnAyM4AHkuodFHlBcvetUHdJQSoM8ICAQpzW46w5IDWdK3mvhYLAdHk1pS6KJC3L3qIkKBU8k0SMPxdWpoBdLGcpoxJAtSCAf3qJq0ajeZQM2Qf7gYnQDNxztY3PBKu6oWQ2TXPiC6DlB6octkEsRBuf9tRIlNnBcHc/EuuE1NN/pajW0iYr8NKKsbt+GKweK1m+Flhmvsm40Y17cXMwZNeclRhx4YlRbEIA816TjVFkG4vd085H3dYdwGI9mzsMXNcK2AA1eO4SwXtBEDMxtQfHplr/GpcW1gzGMNZ7CRD/roeV9y0hZgVsgdHEMWXUkeCw/IxSX0gA8kY2IQTjfMPN7kIhQEIXJ25TFQbeGTFSiXVjKzyfLdZHXXCiYlSfeGYnKTZlAsCy4ShDhP2nI1KrPd1s5wF+/BS3qEEOM2BXiXAxpIMRthYHBM4C9LUiljBtsj3sLoMT2GaX1i6NuUoFPP5BlvBGQ6USxegaVO0Qn/NHukGvVetbafeXR64tnfwuZIUZ3VsgPTmAWfFuGvhEnleQEcZioJ0TGPRnKeT/zSK1dhhnz2JzSffCAXuIKsU2Gvl5CKSNbgyc2a8mSV5/tjtyaBMgEhzgefDGVBwBKQbfEURbvDozFR2VGcPmFdbmGPoIxTs5tdUTcdeGALzlEOLQa0jP6ZVReZmouQyROqMZCfH7/VHIK8oocesx+eePMfZqXuEQscoMI+StCcdRSwpGLSwURoFGY4CzMcsNVN/lNN1P1OHTT9nSQ5ciCyXraG8UlU6tRznDIiSQPo8sHc9EKQwmkrYoLsGf9kWlK2TRKwZmHG7ZBoIga9RSIa/8BY8bTorkBlJkWrea2gmBglynLUrKtcV/G+pbuq3OiEF9AhcwJ0KgQhZwi5EULHArWr8ULxJwJdIpHmmMOUtSsZcM1GS7o3i0U+LjJ8Q6gMnlHVPzLKPbkTriPkMDdWyU8yYDOAKqwRTTVuJizKnNHZwtrXGbyhct6cnjBJtg7N/XF7qSpSJa7YBWjBbKda6cQqpQfDMdIQp/EgjyxPBrh1dYQkoLXAYpf6rbFsBWbxfKoP8Ytct8WTqsr9k46MrD5gnHQCxMGefUum2/lpeKPXc0XFZuPchPaOpusr3l39Bw0duoso7CBCBdjyh8h4iJElFJ+KhYLkHuPtcbQBzv+KtQuFGwHFiPESL5BYpxvD1MSwTgJEBA+kPN8t+n0wNJ/2UkzZq9V0o1vmL+pmdt1iuM3SYdARaX1lWpyYBMlNZGTVUCxZ0qUMoVhRx9S4oCzB8VQVAOgwfIH7GQPdqBafY9wypedmDX6a0dpEhjo8+CHysMZEcdmzRnRorSK2LU4HzcVFwGTRDbOP1xu8ciMfvVxksZcgl2CHNfC0GRa6i6EmUQhCNUy3LymCxNucp8KBIOTq5rDchv0HvGQSxKrM2nNegCVfhSDYEJ0FvMMMawU/F8nzCqCIg5rOQ8QjcYfIRJoMEZC5Z1PHj/PkPMIDDPL2cMP8NpFmPc+jo4P/HeIP9clJoJOJ5Oai0ns+wp11ExQBSJu0jzzoDn8ZV476PGmab2+INAI2hcd+qfJR7EQ9lsME1oGKIHVuoALZmHxZzKUs5kiETwKgSxpwAEsPSTkkAScySAzJRtSsulMCkuIKrlsl6TY2tbgZhLd9ji3OXT4AIbhKqSpCWrgMt7H99HPTbT7yacdHf9HMVsL9AH63+F7aE70r9JS2WqjkIaIckGKXXkzNLbFIJzftNhbF3pTApZAYwyESwbbM7Zo6Q9I4FKoGr0WXFOAAJZBftBP0YOEOFbg4vHWfYGOAK2pEAtIEVFa4PRI8kLw7RNFEpBTinKjtoQCnqdzNXe1z/1P/Zqiqlg+p5xI9RWOVMA964T/+oTYRUxby9Ti3kRcBhBWalgBckQDQBGZQlw6y1XyppUlmEC4KI4CCQAsF+CqFkICRUTtHVQqaoFcy9Qt2oXmTEUeowhUZ6AFHgg860kkH9SYh6HDTISECgjxEoS3zoA2YdnFqol5BkVpgwzIRFH+ngip8ZwPDI0a8t314NVRBiHpjUH5Rknxc8AFKuA4D4VuysRlW5kOBRU2A4SttxywXmIMxQknWk4dcdHnkASU7knV8Agbl8gVmOGLGsDEosz058YDSwyFESFe/AQkJYIEJgH2iIGXXU1jY9j51Zh/CBwd/FyB0wAqEqAQ9EP8u4mAAhTOCzeB+0gaKRXUVFJgjAYCBOICJdQQUKqZJkSKETfJ33+ZqNUYmRZRF8KAmtwRg3ucRUKMnYME595cDgUeKkMUOkkQoRiEgPuIhPTUjGMEDToMKKWFNKHEZ0zMQdKGCcWiFlngFwkM7gjgJ8mRZ0tEy//YwqhEgY+FTclVmxLNp5XNLXQYLv8YTKDEfaZN1hIM0OTAKSaFt/cBS8faDj+YbkaMHsOES0tQDcgUoSUEgD1NChKcy/VA71AdAtagDDmk9GzEreAZs9mgsZkCGUgBzXkBU5fNVRAGDKRYSkYiTUYgqzKKSw1AvZ1ZqZFSRfgg5PRUGyedJovX/B5ZhTzsxarzjk4B4KHJwgw1AlFXjMUcoB01lcZ7hhzsSiCcyiGDQj04mVYnmH4RXUPV3NrNSEMzBFV7phnGnjSnXWgrCJTPXLXggipoRSOjyBTFGlV6QGSApJRTFdJrQJ98HDbSAlw3pCk5QQrfUEE3Fi7IgiyBSbE4zO/UhBUSSY/xFaIgZl+0zB5PBmTrkeV0pjdvDCgORhbt4KHQZFAZChKqXKPVBAx03F2nDXCqhYo7gaI5mZ3mAf7TZCplUF++wURGzmyp3FI9YloDhS0NgEdFRO7zZJCE4kiECJUjnZFUBJQFgh0rGF9wghYDjddtVnQDhi1rxiA1wCbCR/4AsIZxqRGFWVSDI5IMo2Bbo6IW0ASUAwJ4xAjqkoJZccywWd3SuEn8pcl2DqVurwG8voTcgKTSN4IsIAxVRWDO94YJ4gAPQMwjolIAeOHfTUY60dk9/UYsYGhs4kWzSUpUgyVCDuZPXthCRwnZIFiV+wKD2oEblJDengpT+95m4FznlmACJMpjIAA0PcJqzc3KpmRQU1n+AQm4ixFCEaANndnIJtid8Zm5OqjDfkCLb+B9XEWsXJgtZmnErRBQB2JauGIO8gZgqcUmLwKCINQtoeHSDYWIQljGdgReo12qe8np2Si1yAxB7yow8OWyyhBoQUZrwMRyipTSZKY6zkP9thBIMgHhLnAaKOiRb0zWpYJUoRBGf7uElnIlxpNACNiItbtMeOdiPD1lQiOlYN2UggLinOad6OlWmbkBmpfChZQc2nEFtkJQhGpNEj1mmEDUzk1NQzxpQfspSLISscCmKK8Gs3JImBpJFQ+Y8+DgjBWdzaxlXyiINgTc+uHFwG/cYtkAXVPqJcwEbk0YkG9p6ifZfZ2miU8Ywk0lpobY7TGOGvZhg/rMaAOR/H5UPG8I8kMN0+1kzdmqw75g9HOI9SgQfgUqa1SY2MZIYz/ogcREIVpcK2UJzoFg7tCqgtdEDwOgkAWAPItKBAqqq0HMUP9MN7gN0ycEENJAYEjX/rtboGzKnURk1F0UBrQ8HN4LAHahgAEBbG5z6I8HwbzVLW40DSCtUOoqTGYvZIkWZh267K9z1JnrCFQqIMmnTlEYiHjKxftLxZ0AoiE/IZG8yqqKza/b0nepKR7PRqW/DVNKRdepEo+IJoOLYt2UXgnvqHHsBPCpnQ65UqZaCPhl0IBQ1YfWmVOJ6KvYJiuy6eF/VGAu6dqaLqT8ima0lOuvxsPsHOvUUJbpSR75bNYwxOrgaov6qmF1ggpyrt3GQbGDGWH54hGuSepJ6RN74NI7UTQozLkCydM31dC0GJadarZErGSgnoPOhIlxHB5nAFM3qRHuimC5aPEAjqDb0/6Ky8TH8G0PkeyhZ13SWYrxvcrUOxx79WgcJoBoZSoHwKyWyCrgVyyEYc7SV2x6xgmgzdLSdIlHdZR8Ed24jNyJ/16So11hU6r4gq2cTYHjPI0KhqSEi7HGeQxiqdbdg+7TAWQoR+ri6uwXMOLm9GYcgwbPXdTYWwAitWFggojcYMlBSxxOGhkTm1T2Cs3L1taTJ9Idc0jk7Egi4kY9cewdKJjxsa5FDOx4LVTql84ShG5L+RRc9VWBNdiVUeH+pC4C/+6OQURoOEEtKDJAF4i/jRS8gY7QZwWmMYFohtVLVZ8eLXCVGcSrkiizrsSCaM7t3SJBERF5EJ1L7h2tHC/+76rc1WdwlT8K6zlaQD1OOzLMwLti5/TSvFxBSlZHHRiK6DKtURTpOI9iU6cO50cA5BqO8SzWTXGKBbqJ4LFpC3YkBvUEXrXqR4+E5/XvIj6FLmkGYi8caukJGHpXBkOLKangliqdb3cjCmywMW/EkIBJ/TkM17qE4v0kx9Iy/8IHKH3hzP3wAz+jFkdMkeiM40HsBo8CkxYOj1iRkqmZlRkqQquMcsuVfGLnB3gRPfyunKmLHogW2jsM0HmZfoPyLtlHIFgQ/Y0DPfVIL6HRtHxKhs1A7V3fCitx2VRGx2mYqCyiDEW0b65ddxaKADp3ND80wcCZ1gFLCEmPHWCv/RI9Z0G1AZnRxSMbcT/qzf4dsypdCZ9bkUutEwPt3C1W4LRqLEnexQhqqzhgQc1xHb/dEJCGVuL36uFsNooaMi9aceJIL0GStp+PCQAmFInH1PNATYztSW0LrOPI8X3UtobkLzjbLUl3cugI4ayv1wQc42MzwPHP8zrKkywvTho3NuH3ZhjFowZLNQuXcJlwqIA9yHGm1BSQwFSXUi4ftUCONvVo92sapNqnVl3rKQjPtbMRm2ZrEnz+k2cLAJ+11kc5bdCNnTbXGgAn31VFAILixwGwCxiDGi8CRgVNkjzOqs4jdzcEj1JZy1xJKkV4tEFmnioaNQywTDbxhQo/Q/wtPVwql9Sfbmcj3VW+lvSoMlpNwcwmAsd91vI9t4R+d9Kv+uC9kwLYPkxESrhzudS/QbVtlV9ZhmACrfdtvYt+3hd/oERusdttPq9hdA+CGUnjlADWEY8y/0nZRcUfPMhyCNBJ/1kcCOl0yHjy4nNd03Q+A2ADDDbDwCg6pkDw3ngJzoiHdXMmi8dM/DsuZ8qQ7aRv0o9tYQr5x4kuG5h2IYQkl29kTXgwebN4rfuXvJAfFhhuB2WTKYkq/ltxO7s525d9UMuUZoY8os+bE/YvMXYt8/agDnnPHBETrp0jepuKDESUSHY6CA+gCSih1kKob/dI5lHr6wCvf3ZD6Df+S7lLJ1PEc5l3lMinQBp4+mX7hz8NqNCsYh6yS6IRWzVGcPrJyFRY9qJ7kdvyZbx4Wc+AmEKNp9+jG5kTrL6zH2EXsNL6z5hpSvx6SWxGKqk3qMrgyLWI1KyvmRtBi3xBxsAE/kY5zfn5JVKmYl46hCjxzHbvqO9RdzPQ9R1BxeIcbH47irVZVqift1K46m1Cywu4w0irART1xVBBmpMUsniG0vo4ynAvH3XzFfgvptmBY46FILH5PtYERJ4LwVYA886PdLjpYF3nEhFnU+vjorCENmFB899fr+zdmlnwGSBpX5CZHY4FIga5y9szNQB/0tZAHLw/zooThODeaxeD/UDxBE3kXCXVhOvjy80HPXmfnvdxsGewL5O9x7OgkEo9z8ySwX8w9uA4jGihf9UFvpLXAOcAY5JLsOuNEszLW5DQxvnNwf2a/4me39t9GmG3vEjQvNHc7YyKeOcRADWJ/GmMnIJEsqM6e8VKp9hRDEAOSRZQOMdazYaeW7BWR46OeVJQu+RhJ9PspsMrbscBA374XMpXzZaBALQDWH2gMP6sMzJOuKhvOG28PJ+1TeoufAkrQKSQB46Mv86OvseuXHnzxUNfwxz0Xdx9xDOme/Mm/sJzcZT+DYsF/BQdnF/mKOTic68gP6MSCTKNnWeff/UCkCKawHHMV2Zn/66qP/yK8+bDtAxzaqhbQL+t0gRMQIMQYxFKc9aaTfzDUAIAiMOAyT7K6SsB5Zrq2bzzXdce6BBIBqFqpTqKOB7k0hQCBQCp5JAInvsFEINt1vV+eTwgwuJ4BjwqQPjI/EveGSlo3KwLLlbUWY7ZgwMCvnr6Uk4CCpKwnJKWOOEiMKLgsjAsqirqVOy5Bz88aQh8Dj6tHsoTFyNWQEwsSU4mSn7uKrDa/TtBdT9EXKJ8WgIKGgVlcVsgjtoAM2UojvoxLAV5rUN/DY1KJqBYiu+QTvGktOqnHTD6ql/UiAt1rebBscILhBAlKV780cedzLRaN84EHyw9TLmzFm9ewiwMXhf9sMSozzh+QEsYqQXK0BpYGIJZY9Cllq8gAhg5V6jAohtsTWUAMNMuiBdGAMiAd1dS3xhGaDf7yFIwIR8zRaiuVDjqaidgtAQEaNNMCpAApmhyiUkCjj9LWjLYmuJNSEI8VhREtpFza1gbEpuMMvJBEzieloAXovEmkSdUtTArp6BF5gq1bxDTq3fMYJRgQqUZ1Wv34yFwBK3mOHTMxy5g/kIcTj34A96gQAwmaDbVK4CVQjVmiTOoJGyi5rbVehGSnQpYD0aRJL8aib1yAe4saXMkI1hwMD5OaG3rVQWCfPWSCCxcO/LQYWGduyfbRddgTGAf6ZhT2Q0VWNiBJbOemXt9By6aypMue++o42qhgYC+F5gzwSKB3rAOCvvoaLA2/74zxqICsaAqwjqiQC0k2nFCoTK02fnNwRHqIqwJDAV7S6y4oMunAm6qmyW9BBkm08cHvTqvLihRlOeclTVzJsaYYbjQyEOBAHDIor/QxKUcsFgHuSCoFAU4PKLPU8hLrpqzyy0+uVHLLJWsCrkYw09zhzPs0iNAZNtWUMzE260RzzhwiAAAh+QQJAwAPACwAAAAApQC6AAAE//DJSau9OOvNu/9gKI5kaTmoM6xE677vgJp0bd8gKgxw7/8twQxHLBo5KFaLt1w5n05gT+Y4Wq803e7ZfAK2XvAALG0Nsej0xQEYQ5W8+CBAgAZ2gh3gLmYCz2qBRjpfO3WHMS5RLQB1foVbkGNtflNVgpg1hHlQXSsCigSgdY2iXH4CAKoABZJSl5mxHyiFi45BTHlLoAafASu/Y6ClA20uhXt5xj8yss4YKHdcu5zCn1sCv73FBcW9qdp4dEGjrAIGtUDNz8+0ZIcrX6rxlGN12anxv/NzBeeT3XgYi6IngDQgQtjFYmMIiqo8Br/cazTJBagtiYTly/bt36RFAv8OPKwEA5ZCNAyjfJIXLB/FPDBHsQj2pqGfOAFYNijGxF6xAL3+nLxCi0XDeXpWDtgWE0+qNpTEpErwVEkXAAbubOPpwoABTsxMDrWRksUXek74mPt6zUmqVm5YGDVo7U0QfwaVGVB0ESjJF2LHlmADJVvLeujyoJP2pl+kh0/3KHXrVJUpcPVkAjjgdVQPAYJNsKl37049lpByVnsasZ41qXExgxHQYJ8iJ5ZJtfnquUfg0EgY8/wIGetZgHr25GxTLe6nms+vZSsQbKsif5xeTlpWEvgs18niQVQGU1gA7NgaP+mj3m3bYs0ZPYULagxQ7oC9b3CAzgv1qG3wIVX/Xuyth8dzUqVXV2ExubEEKztJZN9TP/ym3wMOCMfKL9mY9xQnb6lWYHvuxVbiiNKBVUwDqgRVUUU+DHBhBRkaUgdd4ikDlX3/qYeijwrOVqKBkIGzlDySLXEHMzNKUKNKzqVSEI/SjNhcYUBGJyRllMG0RzeXYfVLV/X9JeOFZeXTlpSTVInNbAf6+F50JDL4I3y3NQSijTHol+ETebk1Eo901tlYgicOOedra+ooh1KOFFMKDGcKRphb++AGSTYs3mnooX0o6NyCpIbRkzdx4JMbpZaOud5rlQXA4qif1qoodLcuat88N6YGCl0+gHbSn+K1hZR9s9qq7KuKvvlq/6ggrsSYMufRodFfBFgoCH/1seLaRxAlS2Kktf64JaLLrtJtAQ0cWJUP2qbBbTzUuapRiFbaZestdYqaZXpXfpiHP7lx4w+8snBLCnULnqVcoVDqK9c9cS6LpRsBl7eneV8qNpCs+SCMicJjMIzWRxbLJVd5z92yRKSeqFQxxFxG+eEkIWODXxCZ9EcNbjCdl7LKN5fBDCJWtcfyeyM6jNVOE43ZXSA+Myvihl2O+2hUthg9RcyHYuwUrE55SUzIokgpMkpfkYJRNqn5MzRYpliFdHNiMCNHzEEyW9OSFKeKFbbxksVWP8dBAuGoM48bcxN8ShFXRouY2Gx7OfUElv9x2AprBX8UAcDiSEgWIPfF5K7cmyPK7ew10pOTC8+90a6msX1LaqRu5C4UbkLVuivO7sWnPGqjHK3b87rk/Iricuq6Hlr1OY1EtnoLn7Nlu5QQdeOpey8rcpzdMYaiDl8+JQ1bzQxmTgBWkRjQQFAweI7DvPC9KSW7DaoH+TII8pvXyHcTRDjCXxTTWMAalrvybCgVa7tBf7ghHC8JqE4/E9/xAsg8eNwmFAVMVexsVTvV6IZh55AaDIhwKdGpC2gkYs+V0ra69byOJCEEoUVmyDT3rA9u8WgAmLziumzdgGQEGokA4EKzmhyvQ7i4jYMGmAgdNg9yEYtNnLYoKMz/bOc4PpAgJURntqe061NuewSLYoSx5VXijTnswi5A4jdc0UMP2lvFX3wXHM3g4SuqEFodHdIH0oTPOV8r3wdh9rI4CoMic2pc0yaYCiFO6gU1aBvsEtMxWrWHdXy6iQh5Z0ADvnGRTZDiTWzSKCfWBCkwMR3a8jOYMdEtGXuojSdHRQxvjON5kcKD+RJpSlFWUXaHrJzSCoQPfcgNJhEMwUFqMYf5BCRX4tFgMVUZymGeMpWMtEXXRIku4jnkNJnRxdREQCza1IJaZ4xeLlYGzudJ55gFrCccjCnHGKwSI3XZUk3ahjJR8GqdIGibYbgHjk6hMW2mQ2XS6uLNU+lT/6L+xNYLqkEOOvkLLRSrQ2f2yE7uPGZgO2mcFzaqQnvmQkHhMyVGwylKOAarnFwsjCYltYdLrjAE6ICZRgxyulzt4WcTrSIizcTGXeiTn42cAqlWs0udLaE/KvJNDiS0Qen0izmVjAOljOmWmDLVrDNlJDAXuUCMMQhQD0pVeVj1AcaMjxzuas9AzJG6isYGrS7L5z4latNh8gVOtNPV4GA2HYkgVAM1ep+INOWps9zIM9Owm4EASz7YgTOpnshI/cTwrV1O6B5tUgZJ+PiAw10taBVszPhmSTmVgY9SiRwsv/YJVcMe9oBXsmNDzvOSg2Kyj5J1AyBdOLbGdEQX3/80H3Q+i0POWrSepcTWxN6KN2f5YorU66zvCPM+p6VCfir1oXKAGV1PALQnY01mFHfL22PaN0qlDWgnSIEy8tkPAwQ9EG9ExwcMzqFd2W2vHCVmQ+fl1raojKkUjrO0Hx2QwtNQxH7s5Yvz7qSJxbgwAXGbUbFaBDLFky91I1zKFjdhtm41LXTliqfH0qiX4lEFCnfJ1XFMcYBwQF9jjkbd6xq2s6oDLohXurLkhQIAGWCIexu6tCkuJbVSBLLy5EBKVe4twdhl71lTpyZXPmEvkSIdZusQZWMEjBVFLYzzfCFVYoY2afFd8CmyTMDq6o2GxWKfc5YkTEGB0EKHKxL/sjJzqIWZSaMZvcd9r1fihvjz0iRW5HDAJU/4LMgQKuQBosvxGFnxoW6o4wlGfJtdq4pPwQ+OXG+XtwtG14o5n0jzmv/rJHvNkU1gwVspsjHHIGMabMcGcolFuFY/k7iaOLucqeJxDcfC4wJBdbCBQJy5GvfTxXmSSdey7FT7ShWRLu7sbSj8reCmsdrpaGRgGpg6atKKALwB2Vg1p7wYnCO0+8bPrI1mF1b7s8zjg9hEiBfNyEIXGzQp0EsE+UYyQAwfrMPh8coQXXUj+8FMYHf0wEAToeL5v2zolR6UgR29whDJFYf3ASlVQ47PMdl//hpJ1NQhO+ImxVwJgigq/6C90wESZMFVCjjIvdFVAsOCFa8fpO3Zm36rw9lTiEq3P+kgL+REk4dIyARcqw8KfhRPkjpVhtmrGh0r7pd8oXWwCD5wpNnV1uxDDcknFQdYRDY8bW9F/0gOE7ADHJX/8KI3HLp2uU89z2tVJT828imO+gLNtMTQGDmhlg97EoLnSIBKIo0+AqglqD8JiGJ483hIjxu1fJacoL5rLgY9xLIvg7IE2BLMfHseVHEgjWa7Bg5w0IQVqVLNtV4vOVJei256e8Nh8ms5SZEnwwIZe310BpELCokmrgJoiRUxYLbkkvvrMYj6I9Jlmh9ZrWyULR7C8ywxFBhKnrmI9lErKP/BRyktpQFHq9YFFyEPWRFL21AkxhdIBiAWDtB+EtY50RdwWudDotJzj2JQINRrj4Ip8VQxyqAb8adZK7cCBWBQOUEKAtJYrNCAbdZlVldnyaRdk9FzVKVTf5Mk8FAFUiYwIeJWcdJ2B2FYHOUCyocjS1QQQWM6XzJeiZFh1kY536ZzHfZ0WsIsWyEbVyZvGAJqXXR21CYK6OFxRSggncchagEhonMAW4UxxDBNajd6VwcoW7B12+YErFdm+KZ2VYBhPgQrDnENFpFr57YD33CA5/BhuARnXxICl9IyaXNHBTWCEJM4rvFRAsIPPLBTK9CHZaIl3jVowLAX8DUq/mT/GUfyg/jwFrXBLqxFAY+oXWA1hOcWZC+niZ+WFg7TEvgmbs2QO38jXHVoLThEJ0YYCQ11R6EHFAnwijQifrkFOIC1b4EmGUpzMqu4AtnmBO5AZm/RFJTBGLlzdWKQbyyBhvPBIgmQAIMRhZyFio23bGlnHwoHKADCJoCDG5dSDcjgPRAzYPE0bmpXfOfwFNpjGrLShKJBaZJXRErlEMEwOLjCebwBjurkBgBAXrXABxQ3JFFxTU6xWy6TOQX5FtRWSbXRAOwoGnxnEVIEQXOoHtaYhDUTLYMCiqEgBJGQFsCwgvi1ErXVB1fFA6voF0sBEQlgEM2YScMUcYL4kF/1/13VFxcJRxCTMgx+OBxekSsRGQxHsybmVwhZAS4BQBUFsJJZwFZSGWL+A0fpR3uhqDPqkYJCp4n3uES4JkPk0Egmlkp4CBHMIQ2Zo4YNwIaaoGlVsg3gdmmY8gnXFDZAE0jql21hZ2uQQB3RYg83c1Qe9GwqOAYVKTdV8h+FSRZKdQzi1kHQEx7IFzZ4Y4GUiZUWKA62dlJL5H1TqSli+EeXNQa1AQBLeZjShZrzdUgmB5F4oHoKNDZNQR7bOAwbBwZkJGh2lTeDtB2gKZURySJleURyQQzHOCGjVzzMAj8ls0y+sArqSSE05D4gNB0BBHGB+S30tR6JUZD0qGreEv8AhqkJuMGLLZCYHQiZEOmYLLNFSticwnAV7/VI9+dWaRReBadMcKMYdPY+wtAKm+GdQRCRW4BmIeZG63EWSxRD2igJMvNkiPV/OVUP+dg8h8IcEimRmNIiRxR3+YMVYSZ7XjBGj/lWqSiUdMkCDxhJfXMvgbcntaNFDLUVUUGbWHEDmJULn/kTGVg+b8APrZkxf4QMq5ATBxMpKtAlSXciZvg9F8YcCeiUkREAN4AK8FVepLAVFtNtMwmKhVcIQFEeYcqNwbYmsYUp4mBxDLYdFpqfPZoNzggNqABC+Vh1A1p/4WUkVbUDgncO6IGfYrpx6/FMjLKKQFR5HjIczcT/j1CxqGsQdzHAex43Vvpzn0gILSaIgDGxU3UwppXgMD9aF4nDSh6FIL3oaUC0PalQA/lXDnGAHofzeNBTdFkJlixnhvTTd7PxBWrxmBXTq14lJ1Y4eaHzLKgKi6qaeAZxD3SaYl4WbTTJLDEBPz7IEdv1AN5Fotg6orwxUllkJ9PySPEQiVsQrhNwNr5IPeUGNjFUJLv6ShXZIIulmQ+wEsg4MHkZHclQFRBmW3FhV0OyRaIAsA6ARYdUkXRZi3qFDGz6fOfVnPMXfMXwsNeXdnh5OxijFjSBsV7FCGPEJdoWE+GaciHlb9/gQszHl9dyn/RnJ0GTIumBWlAGIjI6/59AqBHll68GAnE1+ZSoJXaz4CLId0icOQf7pTdNgR436Zoo6ixiKq/whhQkKTY82V+lsm0IR2NBZ2NRlm1L5CI9YVmhJJQg1KnKkCxKmliRMRJ0+a9quzHpebXVlLJzZWaVIU8MyUegs300gVUiIkjySCKSYZKgmCK0wxqahAdVkF6yErVnJpbt1oH6s2mXGAkVAllZwbc2sicFZg7qRjx1GJgcsiaFISJNAT+M0LEYEjHKgaDBq6fUlyKBYzsrw5MV4oAZYn5hKHS6kR1y9Wfpo41BQ0364yULWx4mFHZOMqIwxpxuMWAPaqRLs1fPC7HKdA+0sDttAndOZ3z+1v9+9/IT3cslGxOzCuo+RlG+6po/65O+XmJOoPtyXYe06KsjwgYs8+V1CbAz7PGSuJOMARRjSaigMMIJlzCmOvJC7/S/VeKT+7V8P0eUU3qdC/xIsoR40hInUpdZUMBJguQs6bGnCtQWlwEL0oGiitacxdFusjZDcxuHc9JX/UcJUYQzKniCIFtpzxKaCaekikGz48NVxCsBRImyxfe5iqEXzAJ7uCAzAgQ9LAM7hmFItWuee1DB/zR8fpNE7eJdcCJ4T6OeicG0FFAf5EKi3negFXk4C+SLW8NvcIq08DFZWXNYkzA/P1Zw4fah1FKzbqsRIlFJCws86+Ak/GIY8aD/PYwCDF7KPgdCLq17xjVlKKgWheJEcQM4oV3irj3VKBuzp6pQweBraZ+MIRPhNLvyqbiRR4IGJXxziQL5KXoEybtwENFhsFiSQuBwgplZNiWDkHfcfeXQxaC8HbqRWoQ7xuTRXPz3ZXpyxYaSIIH0XheJMk9kw665yXDGpMwZs5viMd3yPhYQfMTYEXkJglfzTlgSOF+sZLYlSe1Kvw8iwP0VXLNcR7eXkOyqMe76v7xHuhZguSoYNM4rNhVZwguSQP3jw8EUnyq7Gm5TGVuZtQlyxFqEHU/jLwADqgwLOBcRGB+7K+hgsvfcFEYLVtAVTCndru/gWZEIJHRTMt+A/zoIDTkQtw/eAsbNxVANwiYOewJEuTvhwsHBm4kbc9JAqLKbEs2tnH539bOZtWpNFBMyLTQ1bZEj3D8kqgcYIBBlwylCLTZOEdJ17cGuqTtFvT2BJA8DInCnUGVK0xmVxCEzU9PBoz8/jAGQtBKYCbkroTjLWdKQic15vdDruRq5tLz+416daoABuT1D9dlIgg3eTCNfvFCcJlB5CsHfQzQe1Vb+WzZfUmCtCyREXY460RKIVauY3MsXYdeMWqVigjPuoqRFQtCmRUJDJpPqp7QyeydbxMPn59UpQh8pEijwkZEacI9crUTjHL6Aza0F/Sx20lPGFdwq+2nMpMcUvf/bDcLY4HiU3TIH8fKAHpPPwBa6hnp9B6osZZo1WD208IDFn22RY/mDhbKcm6ygpncluhdl82fUJfi9tarZg4srZJYo/cLg0pwoQL1c55FXG3sOA1bWvFoMvpOFLAcgTKOkfp3XZvarQ9Oq0sxKhWTfuiSr90LPZYlizgEVHVCkBVEbeaS4thPdV01VOOVzGLSY1Qd7cnuAOhZn11x4yyVEI4xhWrsBAPK0j+S8zZmHknDgB+w3t81vEU3L0MLlEHLNCIINmBnHm/KEPEHeHZCFs+i2UO6gTlvUDOKN2FTa5uSrQpa+NMvLbn7Vuiw6mSreMPGKRerc5inKiG7b48z/pXG7ZKZYiLr9j+qrS0ya5/pMrPeJMc5I48YRS717oHvy6oN9gQes64XSfJXjzpxARA0FkqWcV5NFDe5KlY5IcmmYw3KrO8oXul9upD6HQL6uOgwi7Ci5wT/N4VLh5xoNVPqgI/xzLoNHkLmei9L2mqUefTJkn5zECpLORVNuNq7QTG44AoRhQWJOefs75Uie0mSj4wGFzQQefcXTHNp+58yktAqIYgb1c4DuiMQtK70gkTyHvGXk4XJdO81V8K5UbCJEK9kxu6wRkNuaIsIb2U+Z6e3YJruxdRVW7wKD3ZttkXdYpg3K2SAoJuSe2szk1l4p2MsX7vp+5hEuJB6P/8UBn+sKupw3frMY3B4GcKk61in7neeOyXrBbW+dmAVj9OrptChkbW9OP+W4/NvQ1+A5v/AMHyr0jakwHszBdqtgf6L1S9uDJzZILu3pLvAlfZGP7gWIuApijqcy9BZI4gpQvINk0Vze8rqQfc+KZvNnj986zsYOYfIn37sqrOB5K7qPWwhphgMAQpJldjmeXc7Eevbd9e9Z71FVv7DyjslOdNUFkOovRENcyKFhGGgGfNVVa9utP9+ITtVe1a5E5KUNcMeErvMuPtwGnlVGRAT5Bx6aMs2wT/y27vrdn8ldsvxe0thx/XnWEO/9Lg5D2HdFoALUMBH9W+yDLeA37//0lm/RQHGf1CJL28s4UI6fEDCGoHSEAATh3D0wFEeyDJ1u0ARDAoBCkGRamiaLptaq131gTtgDBAyGDO8VaBhkuOGzZsO9nlBBUdPxmLxf0oDj+jUAt+ssCLSu3e9qEYnUYGGxm+1ameWzOSs9igwZrgEwRDCUDqcJmI1GKKo8Kr4dnre3lyUjjDYiphgLyrQctQGknzabQC6Cj8TYkkWCswkjGVuCvqk1wSxMH8zNTYyMpOCKogbRPskeXio6sbzWPzEuWNltkQ0OvtrJ3TQ1IEmoz8wVjeDfuwDoyUpyKIOCutPrWgpXbe5/WgRYbADw7ck4S0PkJQQWqFQmNIP/PMnDcU5PxQrTRpWTUijFP5AnDHkzJWHXrx9u/CjbtJGimiIFDDikR2oSOQEY4hy8sapfSKDeOBgY86hQJT82VWK5tKSYMajJKkZEQ7EjADp/AuCh4jOFP6DcHGAbd4pUAGfOMsVjutZcPkrPbEqYSWMZD2ptfoYFGlDFzDF/lliF5hLjPLVRGO55m/ZlFihbn9TZRTkbX75+twx1VKDA1IsdfRx+Nkq0Qrk32catgLY14op7MYcNWJaFiwSbHhfulZLPVNMp8/3mqToQmYuV8MmeHVZo4DNZMlzw9hjpaCxmo5yTcr3kJFxlVezpqe9y89nPCTip3GBHzbYJmSY3/6UjIuO4iXMVIHTqhSAVlttlF7DQc46LFQJkQaArTnrpvrZW6mi4qn6hSKCWjhpwH5OAOeg8A5sTqrMGFDSLFaoKS3E01NgSArSKjPgvtjEqw6YV5kJMbyQVZmAiOjWmW8i+m4ZjsRyUjuoqwRnOSKEPG8kao0AdMVNvPW+MGk+Fe3oE0K1ekEpRzEls0QMDjwakxBUCq6yyNnh2KCoXJga6ITCMuiuNtJo2AqaaPoqQwhAc2BTITURr47KADqarBR60LuSFPFLwYy2O/gCsjIsRLcsR0RBrQ0iM6IwKrjcWa5iCTD20WAdAJ+8cAxt+DKUSVAPHYhO0R1p4MCcXEP8L07cJKlvlJiDLSkHDXW/FNcQrsXThDCdcUiaGmbLb6BNiAl3ulG8YnLWKNMd19lkdRV2nmQkMKPGWW2KAh6Ngb3vvj13i1PCiwASCLsGRsjgX3XSl/Oa/SL308lGsCEMmuVbPwMc0QQRixVNzCdZYBFHHqRYGbAjJiR0/K7hnRge7KpSDgk6qjtQNFH5ShYE3dtOBK6s4AkUK7pnXQ31PJodBasSozslwxznOBkJrthlUXV1RCxUfUWHnALR+TuJGM2POwt9vyLoCYENfefpsEjpOWRSQXWNBA5FPjk5IyMYBezyl0zhJaqfRJjhqNnOSSPAsPqNukBnxTtrio4iF2ajsV/r2W2PAl0VDUOmQI5wafoyezAqE9C7bAckntxnnsn28FxUaIH1CJwqqHa9z0Zs1/XZESDd45h6qBWbe2VtKS81dJyAdd+QTIT1aQpEkjx7IGQTg+OSrj2X53aNXM/viBS7devBBwF578p/0Pnz0Mxu/fKVJ/z59+GVxf3734w8rAgAh+QQJAwAPACwAAAAApQC6AAAE//DJSau9OOvNu/9gKI5keTmooA5E677DoKJmbd94mMqC7MfA2GvoGtByyKSygwIIAE6nqhcEEqpWouu47HprTah0xWoJidYYOYt2fN9wTVia7cHKZu0gQMXiX1xxgl1hK2hlanZnBAJFPldCA1B9em6DlzgOk0B2jpNPUYlAAEVXLmQGZGtEgZiuHppOWQAskk8DBnwCBgYAATFQiWaksoyILVMBdJWvzXKbi7hTqSrKwLrAtDxqv9QCvz/Ie1OUQ0bO6BIOvbTiMlCp7yuykk7g9E7ITtQADT3x4Vp86sQqnSsHygiOq/aNCp0AugL0AkdOhZkeDg1I0vhOUhExof+YGYSzrtgpiLSegFLhy1cuFbwgVpxSi1E7F/RkarzSLgavKSJHKkGREFFLUO+g8PGlbMy3iX54LKUXDaJEbi9UqtRCwJLQHLHs9JH1RJevXRWD7IrC9ektHjRZNKJXoICQngB6WWzz9QZCgvQqmuVDbdGVAAVYgpISRddetd+01eLD4+bZAzcL9iVRMs1RxQwZ5itS1mnamaAjCSigNNraUTyX8d0MojMkeRoxliWnlxbThKjJwU20gqXSlHTKoK1GSqxerl5pb/g7zKHKa1T7TRlIM7hu4TOJB6sC6Zu/0QR4mRwSXbqFdamGUbY18EeMApS9iwLvvThcctrQcwX/frsYxUgvf2zh3gkIDoOfZP+sAQyBfYTHX3/9+bCdUzF0A9AvyPykx4IUlHRSFJJFUSFKqKmxzX//xYUheMT10I9vyXDUwk8JmtHeZusoUs+GNtLxTVHdpTXci8UFp6GT/h2pGCTJVWaIZrSJaIw8RWKUEkoxVgjji1WcZuaFTQ6HYC3EDROPFj8axCMj2KgxEACJoblNd2RSgZGLM5r5Q5JidLIRIhL1MmJfLwlUgF7YFVdXk9/JeCEn+w06nKBpolZoI+kVc0tePV7xlYgdLoVRUcD4Y6GfElqqm1p9JvnkjHAtQ44yAgGFxkg85lqWLfOwBuWfxGGqbB9MAkpp/6f7PQuNDAE0kBInOw0hQDqN7jGGPYIZe+mTkPnBLK2DRjnrmcEdx5O1DbmZLSDOBMkThblyg42esEqorItYnPvsnv0ey5IkCeWiXDegsvcKdQTcCKmVeP6SZKxk2hfjtMgGcZt+foYpa2QyFDZOR3BiYqIM8B4lz2cXdwwwJ98l6wibkZhb6c7PmpnSE6xdpI05l9i2h2PAQXPxpv6V2YjHW5ZaSlTk3srvf8FQ2UmBWmwbh9Hi6fVNnlBqaq5hXKVtBqa3EeynaeElMp88LPBqisNwKMwIrHmNQWHN6gqJstRtrl1qTVPXGCh/1pR3nUMpf/EXC+NFLDZTLWrMrP9ihBsnmzk5m9M2zez2dxaVO43ScBGSK8oIa7IkPanBmq9ieM4hw3CH4aJDsvbi6kpExXPZZKZgFw0OADtjLBXgappmj9K4tpIgsh8aeTiye9u/QwZgz5GlthUUkScB8RWes4TY0jSOMrSb1v9Ojtq64xHO2Ys7lRdFY8vlurZDsYbTgrEasuHqLQmqnDHk9wjtrW1qN4vKRUDWs7w8rVo/uxLectC4t+ztFhhUUs1oBgPKPNB36BOO7laIwhOij22Oy9DG7DGVkPVoAEholJRUsxJKMU0smfFWw2RQig/uhYUoZIMS05AGNM3IGrtI3ZF6FKcRIEQbKBmPyEQWF8T/vTAaeBALTe52wjNEgncPxJnAnJi5ZCgCTw0aAg6ec5Yehi9zTJqXJOziQtf8J3uHKCIayYM+yUywRf1xjBhvgaUSUEeIMJGCuCykFru5AESDtF9aAAlGF7YQasbQhqG4aJpE7EQFjyqk8VpggwYJBzjVouB2qHAYUJpxiH8s4/aywMslBsGQbnOSVEiRQjvxoZEieGQQZPKEBigyVrMsA55IwYYj3nKMuhQkGJXTSaOsQT8i80UttpKUHpmAfC66gjdmp4qZKPBkUbsIIkC1SU7GD5Dou93tjCIgLr5qijYhiwWR+QGEjNMhUoglIoMAkMOsrpfzTGFcPnlPP5bH/35L9Bfw3gGQ8T1qdS4gQXwiZiSWOLNn9ulOPv7gMV4W7G5mjOlFfofGTJbJezAKDkTGOZHpbbCgIJKGadg5rp7sIgAtJGM6kcGnJPbRgS79wygpobFg/mkma+KRgIgggjgWJ3bw4g8nVnqgp2EUBptrUjajIc/btJV7o2PTJyS6uJ3ioico+ykHlCk0KJwUcIYYqE32Brrd1YgHbvWdTF9Ynrfej5Duo5nV2hWfBlbrf6cAwZqm2sMxNQthB0UiGS96JZmaEaqgQmwfIYszDXGoP3p7x1QwSS8mHPMtBbuaZMZBGpA68GZkgGlFy3hL6xnXMDdVXaBQVsCU8IKKHv9QlLeYBDcmlTZodzhcgjLFRC/e8zEKMWtL9bk37+WPO+opFRPis5pZhkaE2ZBnA5kayOwKjE3Zyxk36dtWGGLhIzHD0JIkUqjRtqCKJcpHQzbSPB8Kx5VIZexbf/tF/ALqGIqNKGPTCcOPJeg6wBAwVjdLS71eQLp5kgbQ2OFDKwFNk6PsnSk0hM/OyiV+qjVEAzmxT5aGWLn5A85YaRtSObDXMdRQ6NLegb4GHCC8GP7thdPYznIQRBFbO67hCBLBdvqzIuNxyKOOaWIKJA8IwHnJP7O2nFHec7VA2fE2Q5dEQwlJIWq4mVvtU9JObQccCGMMMWvLoKf5KR43iib/rCgCaKpWWQ9/Qg/9knjWFHqYvBflZXaAB5AwP+FXGHikbsA6Mp8QU5zjXISONRhDIqoNuVC75gS13NrtfvOfFdlsfhhZ5gesyWmrKaUY/UbLmZWxOH3F53wXGEFb8jCCPV6hLRQ3sBwV8m2+jdMjk1MNA3p5pQVIgBKDS1hxFAcinOTKdh1hEViTZrtsuJ0q4Oad1AWjb1xmxAnyUUethNU7QU3OjFUr4W2IAQ+rpJ+P//TumsK12QBbLhAqq7BNgLoCZ7aTHX32NFQza4Ldc1xh8KkHtInOV4iLd2L3mZWxsHGW6pwVdCxQ2bSK2ACQMKHGQC6X1FowGQmPtSZ3/8lrh+fZsB9O0asARaodi0OvmmiERg0mPGqdURQHjShaePCTh94QrdvTB3k0Ce+yg5iAFAxqGIuOjApogk3C4Y5w6DZNs3ZvnnZmJr7Rh5hBi5YIvvWYm33My9vdCXzh2TJwplaBlQrURt4YoS/MYLGPF/OgoLpc8nxBNqn6trAkrzBLPalfm/iA3j7LRo2m5pWo26RLUqLkeHhFJt+h/PRINivJjKOjSTOCvK0tbVIhPrNPCBtWhm8KlhywyCEFm0bbUUNieGj3DyoHGgdgdIoRlgtJp83V5V55pocvQes/TpiD+tL7CM18yhGRMtp5VdO/Md44Z31HK+DFB1ljJ/+qmFwPd+N34JcH2NRjLKUKz4RIt/BVoNR2EhAY3NAD6xM3WnFUfmB9eNdDeAIqeGJMW+Vwf2cOfncHxTZ2hodQAsZk7XYGQ2QqDyg4n4Afk3UwLFMlwqVR0/caQPNnVQISSmFCnsRCI2gOXQQ6y5RBx7I31CSCIIVDD8B8mzMG/4YaHFE9MHKDzJIXLVB1/TAYCJgQEtEeDiA1RfR/2vJ5+lUPSXEssoVCkUFmd+MG7fcxxfI9FRIgtNUxdDg8VIA0efJzEsgaiGEACDaGalNi9JNvGRZZ1CJD1WB+XnIM57B+hjOB4ZE103Z1GTNWiMYY/hBoycAHiIFgE6AJaXP/REh0dAZYSREITh2yJH0oiW4gBdwjA/yHSGSTLThjblggNvyQZrLQD6xRAAdQG4HnEUToZgaoVCfjfGzEbY+giywwixpXPGMgMhGRgxIEixyhd3ZxV1PQANbSAAmgA5g1U4BUgeeicoaDDwloHzzBgGiWWtPYfgEjYqgmd0y0h7mwI1KgZgnBed9Qjsn0a/uVjljnRYegeqClgFxyiS0IAFB4Y1alJGIjQKRTVUAgLvxgFzoYAAkAEQ1Ais8QfTwhSA33fWWSNM8UI+U0VgczUxIpRrBoOtK3jpjSNMvBkszBMuNIkFaUIqeWWmX4ec3mJXjIhkgBK7bECGN4XDaS/4C8gRFVeDYxAkXGcjJ2BZJ5AZScMRYCkR/2w2ynZZVhJpXgQRWfNDWfEzESGHkzgRk72F1Us3XttUc9KQDi2A9eGZSgFIzE9C9UYy6itC8LZZRsNW1aUUeT5E78AJcyUwU/dxZqeJd6qQwJQJIdUAxj+Xod4i8mFzCVVxgoZSP3CIeGtiQxiHqxNy3UliR/SBkBGTviBpI3EEddwxJvEoQQR3+2iHhhAoHzMhfu1UO3GJwJxRE46SnTYAcB6QPrQ4x+MYQteCAJl0ZR8SGiBE6ROVK/ByABIkk8wzmZGHHkQSRb14HVg0q9MJLTWYanwHeBSZflQpUrABzupFKLuf+DpRBpCWVSoJFrCbVbF0gcaUaVMQI7DZAJ1RlT1LJbgpMp50YFjWkrjSho8hCf+/EpG1hvYiCXwLMWMBGJewI7BcCg8UlScLcVw2dPy7QqZBE3VoeTYWREOQWIqAFLFgpY6jOieHkdHYgnmdCZb3EtiqhNotmH1RV3vact8UlVVhB7ZsKRMxMV4EmD9BdpS2EAmSBtatBpkghr5gJoz5RBldGkpzBoN5Zve8SaItpeoAls4bMHHAUeW9ql2UQA+QFoVUqj1QinO+MiP1cZINGfLoYiMxIPvnlT4wkpjAYMEegLOAAUj1EdW2il6dIvFvSbAdaH2OAN3mKo5VQp/tT/G97GcUrqftXQEYQaAJOKZj1BeVGWiuYlEz/qZTQxEI5xV/G5nYvhptMQBQYUMGMyH46BHF81AzZgiA7lKwv2aQNHeAEzHhsYJkzHGLs6UqeXCIi6hsHRGwCRk69JmUq3gAcjAJq5Vx9BJ+0gQApDRIMpmnhYkcEalTSRGO3oLN+BliUTBWIzd+OJW/OAhD8AADZQaTFYC1ShCoMJo9eAa6j0jgSAXUDwlMmolwELkP5HbVjzkkWaQlGQrhnArL/XjroIOssJGcaKlgIKZj3ARzPmAKPTECMKcF8SYIQ6HPhgJ5CqD08gshgwREQpEPOqbtECIOt0jeviXjfKTega/4GNeKuekmSQOYPzYB0bOjXo+pU4gWG4MBl8GpoxpJsY4W1Hy0j3qBxOyQ3qBzT0VqduMTCEaiQBUiE2Uj61AQPzKRA4JxAUqXLBVw3w55EpqJbDoLY4pC/e+q/88YegWoBKQqc/9kLQ2msjO0Q9MVLE43WbWJ9FsYELq45YUyj/I3UPIBfipIFyxxv/GLksmJZYa3r1gLfT0bf8RSwdOl1jWaX1+SEsuzhP9kAGS00t0RTMAVv/KUK01CmiBCHQqYjpai/oWAWuIw3smGkwsql6CYEx028Agq+34QYdtxih6B34dkcjI3qZGLZIiTZbG2rqcRERZg7Td5LGhgZUGP8gOVhlxfGvKtKB7iCHppeFU+heBPYEjLt6GUMGC8utEuIjYhgTluFMiHs0zQNjtnMKLYswuCI8AVoyCisDcpgGDvK7CEy2IhQ1EScqdjueZdIEErF48YhsZkBx04dRHwdsdYe+pfq2aEsLrvqEnsEiM3K+3iBKS+K016G+gOM9PkhAqRYiVTg9aYKym7NMjlHA30qLD6RjwKAOkVWcyGscYiwm5UU3NPZFXeTCarF+syJk5FNM+GtVkNKhI9M8A4oK9HgOEvBn3OcbburBd7LASWIT2LAeVhOvlLNTu0SZkpAAV0Zu8oNV97lr9dYbLeMSsjgBKJJF2Go6v1gRbYP/noaWHQ6akZBmFVJlP9CgSL2FitSGn2b7rRHxPFGktu/ra0ViGt7rspfzLcwJEpHWL71kQ2C2Cbi0cMwBcgx0j1OQlb3sHRxpQPznOwZbijbEJfhZnGrmvcc3S8YnV3GKLsmCZXaXLs4jtFyWLvthidsMcOD6LU+GM9Fhj1QiLp8QTkecgvm5xBq3jgCNU9bDZhxcWqzGzrxhFp0HW3DJddp6Be3RvGLwi1/2yykYThZnozT6HadjGC3BDQUwa7PWXZrqDQZwqrTcIs+VB05IAYzWnO81td+iInjEv5ExGpjnXigCEmXHCRiUgRpczIIRyi8XoKKccddsZmxbsxvn/5jMcxqkQ8wbco01QSyKMQkJp0F78G8izYsryhh1vKvMKUOjgRE/8nZDgm8PucVkvKO3VjBYrUJqXKVpmm8fvQ1dTbkhMw2wxJrCQsqDQwxnragu8bnviLRlTIHQ5MCJN2n1EMfVkakrGlNncpHfWNTcsQmTkE9JjXG6KWTKY8JvanxtVGVna4d8stZuhRRJ/NZMxDmC+8ws+x8vIR4uQUxUUEUI8ikII9qYY9QZcnmygpzCLHAfkZVj0kW8m73QPKxl3HcX0ijfWUV/gYD40i66KWi4kixuk8QSxSHIxb+sOnfLTdt+884W0nUWaVQRowFVGULnZ77M1NSu62XWFf8Q0eoatpqBCanc5lUNiooYX7YdFToP1RsDpHiREYEg5kpZwFzGGWkpR6uWOMMU3IF3PSfQel0R2ffMwDoNjNsdZFYLpPh2oBDDjwfcoajdBjNCOKtSuJtbC4WBw0FXvCE2dZFTMdPhcfs28tTZGIBo3Xe0/nS+5JshsLu0OVkp0cqdF7Ynv7Qr3gDfNlJv4lIXyFzWTrlX/5AcEILaAIKfNB2ikoWrTE5pTOskTBVxBO6JioohABCSLJEAWL13p8cEP2NMV5uoMz3myyVWtjI/A8duKr7GF1IxyYDSfx1FkpQYkxC/xpDLG3At1yBA6ujg/bw4Nck0cNGiryxiF/L/UdVgywELNGbBDhONSaYLC9IDtT/kKUiSPpeO5FItc/DI0m/94SDuiUpb6G/qwHMiBEDLrLjFMXz+VX7e1mzI6RhBV2do6Gu9MyftiSjdzzDzHdIt2CDgc34yH0FGt8Ks7DFDr3h9SDy0wMEp4pNkAKRO6+GeEe2wAkCrDmlajQUN50KmEpkN6lC9bK98352uOP84SUpGKGPtgxaREAIRMfPex5Htv/QGNy6TK7pO605H6BKOLvwx7atS7TZL8bOHV5JgRePUGu/Q7qbDKldd8d/sK7rU2nYbTBwfBVrcHx81utE03SQfIoLq8TYbGMrOy2Duwuq22GV+40hT814C/2b4Mrd1VF5Anrc8objmOuClUVL6c6WaHlzKbN/UBkff8m+vCSAHEHnEoR4cyPCOFD/XgRnRbr68TSSCVvGbhO7KsrBjMIh5/1dWz56I2h217ZaSbkVFwCupPdbuVB9XLeu+jho2nlNjvwsPkuiiPUt9t9N0cBR0sgcN/x5kp5wtHCjGe8z6zjxZD06Pz7BhoveMkc6l7k5lL0mo3iVr2vknYCBExG3nFe6j2+enQW+LeMXMawCxT+A+D9xgDxN0Xih0Mw9DWsNC89av7zkR/+CJbWMYbsxnKsHJ8FcHtOtzPhXMA6kSCRYaTLQI1Pfg+SmIB+Zv+998IvlE3G0+jP8h+DwpIBH48p4EmAsiIKb+ECCkALVOOcYEuHNvw0SMCwzj44qgHF03zcTLCACNGgLn8X9gUDh8OAYEJAW5Ud1IMJjFUmJKOipX5xk9oS6kQuMCJVOst5nZKzjiAD1iXP4TIJN1gmHl2oI41yuztDKrLA8UmzE2gYCGlrI+M0UAtEUKGwmCCbi5ziEjO5GTnIKCiUhCRQqsLKwLV0qbgNlHto0AFipCDwBTkpsPgoHEuo2BN89kIQc7TZXjhlXUEtZVV17rD0CLLkSpmdsCmV2yXr2cilkczRQNzQ1OZfkHPGGDo52G4xZh8nItatvS0ToxS9Y3cIxOEMpxytgEA+L/Pmj4gOZYByRu4s1TBkoYxh0d2i2ZRm7MFoFTpGDRgK7UM0hlcMnQQmIMRk0SNnLseKRfLxz3wE2rBuUVvpYwSLR0x4QWlIb+BESsVAkdpQr42CDjydOjphYA9ORsKjXVFDbN1DajiKLSi0K6TrkoVWvqRCZTkmja2VVZPXsNvzAt6aGMipXaVr4lk6OwIAlrrDRgMVivMGF9/Sb7OrVYI7wUze4qqspMH1QPyRVA3EAP1jqr8MTWvJmzTwI1+VCwO9r3b4ZF9UyY9QcEyQG1bXNmC+AAgJ9aelkqNzfm9d0Mybw9Cfli1iUZly9n1kyHvY8SWzyG7A+g1MJbMP1C/2zCic8248eXt6PjgjBT2mEKOAIzaO8wCQI4wKJjeAPoCnUA00Q//SQ8DZpAmOoHuAapgco3GsQBxpYMrOINDbUEoJBCCc85xhRWCDOkQOoaK4mS4kaw6ZG81jFvxRUBa+ISrUrY0EB/HqNhorlEUE2AyibqzgocvsMNCeWA9CqUW4YDwUkqaVTKOh1rPMUqUoaj6IoqriQgSy23ZKtBisRo6BY3zNyFhj1rXNISATVQZ7AeM1ALzjjlbMaXi0SZgDVKWjqSPfieoKXKMLdCTIvcxlAruUQT/So3KxhdL7doxlkkKjKRRDIqVqnEKivDtqJunYvSMg/RULtyADCnbP/5wgqhqACTIdTSOMYLLH6ShqItSFiL11434w85K5gQY7AXKrIlWriyqTWhppgwpr6Jpq123SI+pSiAj1owxaE9vLTm1WymcCwrd5bwETO87v23P3YL/vXTcYobrpd9EgyQiv+Ie6WQpHRA6oslNPVJ37VALfjj8vDRJoUvcJFthxvO6cfJXHkkDB1GhP3WFmFySALjQz/W2YeDkWvJSxksAqZKdxvFybxF3BCZ5n/vJPpTande8auGzpkuJAlY4IcsZ1Y9reaGkmDZUGMyPmUtLKVW+wf+WmJph0UCGKYiHM7+NmOfZnZIRnf4RfvNtQPn+dqKE9yqgGNakltQTOuhPsLixKHdoOZtZvgbcMEzL4Lwqqkcxu2adU0qYy6RqzJXy/+OWvNqHbg29CWtForOnDJxJvSZ+XUI7RxWZ51d190EG+4OI5POAnSWhPnbfucUwPXfo/9EwpeX0j3bSKr/u3fpu49jVC4dG1BSY6rHj/fnvVd/jp63N5984TuGfn36Own+cvwv12D++vvvyHXw6U8nAPRfASkEQATyz4DziAAAIfkECQMADwAsAAAAAKUAugAABP/wyUmrvTjrzbv/YCiOZIk5qCMAwOC+ROymjmnfeC6iLLD2QKBg+BrEZCidcsn88HrDqGAwlUp91KLxSBgkm+DwDWUQEl8C7jErI5ypU5ea8BXb7ydHOcCKy49Ec2lcbDJaczE1eIt2egF8Z4B/BGUufVMGcS1DbYRwfoSKjKM4DgB8WIgBUXxlQwaoBq6nAJkug0a5t1GTXaKkwCB6fVtTMkO1PgKrtsvKxAEFtVUBaFsv01i9v8HdFmSQW10tVKuv1AKuPz58lj7kp1EtxwObUr2+3voSjvMw9dWoKEunjFkfVAIKQEIV8BQcAJL+WImjRgC3fXj0VDqCZUU6Vqz/lJUpw+LRI1gsFFaCY4nIsnq4Nj0KpOYiRjAa5wFq1orIM3V8IAXxCKABAGlvYI4rcwDeFnO85ti8mSPnoBjLAqh755PWpaDKbhVJtlUeRxaZVhQA5YaXOKxTqZbQaCyXV1sP3wmBI80HIjczV32S0salgQbI5CwjaKym3FKy/BLoCEXbj7RFjgQwumKXPK/airhsQW6yD1cuqn3s/DbfYxJ015QNuSIovnoK1z1Dpnud24SnBMv2qRobudZxX5+InMZINNR5ga5Ys9iM3kuXPguh9cOjtXoJ+shA2ZhLcuUUcnoOYok8srQloXzWPhBZ9vn3PVIcYKBpGazV9HDb/3nKOTATgM8kU1tYXRSQwBW8TVQfUVZMWKF8vKU2gFZx/EeFLFeZh94J0hSjVYIzMYgVZxHWZ6GE2F2oV3dhUdFAgEQcJg6I5R1B4E2RcdQKVGilMg4q2L0o4UT6uVjZFVyp1Y4RAhyA1xQFIfKjNzlx1NeJWIrXhUlR+qYflEzuJg+MXGXHwoc6rWfXf1KN6MggVegFS559cOdihGcyWcWagqaZ30DqdLFUYwYopJOIr91pxJv19LAVkn1WaOagVghU6Kdr9plkfUcUYIBiLXCo5WOxAebHMuossxZ+hIZa6CeVLilqoNthaV9UvBzVHk2QYnSnDKZqwxyVff0KYf92g90T6EOgXnfmjLshGVMCxT3UGh3GPgJRDD0INSVAFqoJYafS8hIHqLxl2l2TUIo3QAFrZXJEf6UV2w1KbXkKGjV95eepS9Ei/Ma77Sa8bm/zQTlmNbJc00q/PnoDsGma1CJYOeaM6uvDYrGE66cOa0ojjVHqtdkrfm2YRjLfbrmEgeMG925JljQrqJKsubsLGmfcI9bD89rTpMC/vhmFqXOO69goOFOp7S7sFHwd0C5JSCUn1nQRVWZEa9ryvLqeKjZmLlj57QBUb5TQZR31dvbWLGkCaF1viYOrIXXRYyu9QyVpSxcmE/StG4scuyEUsWpL6CcWZhFcaH8hMon/Fpm5IdCEMK07UHy6ePf31I2soqjAqCnYMoYThc5a5mp4ho8hf+Ri39n0wtjO2ld9VHPqEJW8AmoC3PgkvC11TsiruKC5OJWc3wK7btd9LiAlkk1maogyiDEMVqkwVk8DWnP9BgGq/+WdIVglFhXi19SvxchchZ7gdTN9Ej9/j8oYGGCRi/49rgrJCsKfrKA6fNTmGtGLHrTWkDv7JSVUr1OTpQIyrC5UbFVMAFEMxKWuAiAmP+66AgFrd4hj0K90M/KE/TxHNs+0iCgzso++JmMU0M0BbjfbyDiclZAe/gxQlyAEC47RGE6ITXfQ8ptEICgHXSCOiPi5T0cWcpx6/wxPCa5oyzGmdBhRXS9iXOhMedZYF2Ngr2+5U9QLdZGF9TTtT9gJiAixIgtEKEEPaejMMd60GXnVKk+HkwExqkAP3TFRf8WTIwzohzs6+mEsODRTm+oTxiHuMI1V8dC5rOcVZ8WoU2vgYB0bGTCx7c4fuUAcBSlYvza6kXeEy0s7wIaFJdbpBmEsSv60RzijvSOWeRPH2OIEwd7IEnezfGIb7tcYgTnJNwI51zSs9y0BjMFDNxoCJOz2ol62z4PFCxFLXEkPse3lmfDMHbE455aWZDFiD7ReXYzkrxHsiX1IAc4USHgJmNSnUhD0S4++48Q6DqUY0ZuhaCopOOiNDv9i16nEmtDZTRMA0g1I2VDIwoOtvVFhdUFbaEQX5g4oQBSalIxp2Fy5iWbGSIuXCWST1AZCf8LyacpoQA9RODK/VYN8fuuRIJ+Iw9IUYnP2q2UzsxAIalXmqu85lUA0GkhBwEZfrBEpJh50vbDUggvCkkg1W+O/vHinjfVrpzT/B7g6rtKaWjTcJj7IkS8Kw0PZqQQAuJUgCkVBiB35R0Nr1xyVjYtv7STbGicZNnvqc3++gUKK+FmpX4Lgn8UcQAPCg70ldYxKkoGD5uSpKWnyDa5yRcP/XksMNOzGOkDQ6DWyNIcQVI0AjgoVadXFMsQd4ACxNBKxAPe8NX3NkZT/bSIuVMtUqdqDlIWVV0mO6j1yfMSzHTBQIEPWEfTJp1IDCUd391PVHsWUibyJKd/iys5dPFKqO3MjRrFVkiqgpBw8BeUHNkK0g5xQk3BQ1WRU095Xtca9VK2n7iZMSequ0zN13WcqWppDBdYGGeMMoAA5gLOAXRazFjIHSL17ScjKsLnBEssTLxzBKzbHfxW1sTZuirakrcBtt5BjPzMwpdrqE3tt8sg4bnRSkw3mUZS14Y2BdUms6M6WVw6RS+g3L+wiuV7seJQT1RBe1VXnDLvK4XvkYIAHVdF0HFPyXLkZszdXj44yliaOiWZJTxV4eRjCECC+B94TkAMh0FiF/xmaxF1hre+CpPxhk94LkypW9qRtSSdNjMZnhmENdoE2AJcn44wHb8AUcYCKOri1u66lQ9Q2ckodw1qP+JXHnvPYjz6taNc3R3CqokGYG2r6SgW2SW0A4dO3Tu2XPIqTrEmSAmo49FzoIU4y+rGxYanjaTrOdTqu/HWwGYkNd53STafJbzbBB64MmJUI40RfJuvDBze0mZowiEJk82efPEczcdRRJJ765eQIWxq9gTTkISv2OUs8AjkZQLUlBTPY5UVIq8A1R74XluuiHXtctxPEphP6yHCP+5J11LhBFd6naPApTNxdQ8TBZpwh4EuTb+RPAYaohQ2/4Tgg9qXm2P/9naTaxZY3/tv9jmao0UGhRBmqxSdHXIENk3IFpG01K9RW8XLj274mhtWbZklfScTWbz5f69juHK1zZ4odASAfM/Y45Aeo4LXeKeTbpX3oAgRZwu/TN6nF6sTAZQ7Tj2RjlgFX1aNN8uf8Zdnx9goWETPuG0WzRlEUHWgBYb2L3CybO5sjdYocpXuHh+PafT3dSDB0c3V75eCSMZn/yLm3Fkhv13Czv4L+jl9JwRVqdwYnTTCH3bTrhOy4PWWa8Dmu7vAJmJtGwEK4EHX8iMS1F0Qf0iyGCms52MYLf5z4pFowV7ErY6VIndRaeH42JPuuD5ZZ+WjlhwfCvt3B1uL/JGdvGuMQfpaFSbY1KVOSDgEBCOLSHOsXTYZQU81VS9pXYfO3MqVlFuQiFA6hf/rmap9DIVHSFC6AF7oAeqYjEABUBQcgHB+YIc/zFmDzQpzlfEoXbPdDGXdUTjMCEDF3BOmhDNqWJ632DAv4MiXTFu/SPLcQUgNgJavjclegFcokadRxdHzGeAdXdFPVJEMhKAJjJZYnCneXOPBmLYu0Eo1SI6+ihmcghSPYPouhHVrRSckXZALXN26xOiXzNjvWe0mGQ5ExhwxYLO8GM7EGgpcAH34XIcYjNJYyCCCSGmvxDiT0K4sjcmkkHK5UQVo4TZbFMrvyGUPighAnAS0H/wdpkYZvVy4EwzA1UjZo8E/cwT6csV0qAk9/IVvKlHnqNDTQ1HMXRU5RCBWxhIvt9gARk4iYIh8KkoLSYoL6sSGzEA56tyD8RAh1iAvPRDSSlIeVlDfRaEZ3tCC90Fm1k31hIk7KgBS98mPvIID1dCaW4wPhJ1ArwCLNOEhf5j6/VkldJHgvWD324GE9lhWiQQsBFj52N2vqeI/xQiN7IisDIXzOgopclxbJoycbFg+wUgcLeXikRkviJ0V7+A8VhVma4oal9gPL9gDH9DnmEA2F0wcRGWKvGGH10RQ2t44HoI7aIJOnYABx4QDXp0S0VHLfiHLTZDqjYmy1cAtbEf+GyDgaEUJQIBiHp4cmDMMpHiNOMfkg3OcC+LIhBUAgDjBJh3drvTZfkuVc1eGH0kYNvSSVNPguBbMyaHFkHGc08oBcvAd+qfgMuREAB+AElyhkATQ0aFk96uYMFtgpyOYQ6yAVd7c+R2I3HsEh+fQz0BKUI2gLRQEyVSBUyVOYwoB8kmR5JvOLd2aThGIheCEUJOE3dHCWH0iETXkZkJAsrmY2PZAbwCGWqDArCfEgozUCKjB0aMlYa9VrJVNTzFiQ3yU8tVUTZ3lDW2OGCuKYi5Z5QMB5GLmI1KgAtaAANlMBprAGd5iNmUdP1COXm8SMFYNmGAMI14k/LRKdVfL/jim0N/Uyeamxm+RAmgmwACZAJw+ojYcXGpyzOovEeZg5mRXUCVW4CTsYn8eGDAEVYd03eTtZfOOZDuZ5oDzFjSzEnC/0jbmSbI8Ze/xYEdDDQDfVJ6CpNJ+iF+wImuHHYCYkAAlgmnMxTkmonigIOFIjQweJQDfabyYDBSyEeNFHULeVhq8WNGT4kCRxgIomD0YRAAlwnhige5agnvZ2SczEdh/mkz5WUNHjTkI3cRa6jltDFGASGQRZBblCj2EGMxWCGISJA3hBKdwlDpUjGob6EETChXeqmN1BpLfwcIxhj2a4J9tZKAoEJujXLFjAIUJZCt5VPO3DVm9FVUsn/xYMFjLS2TRYMk6OWnyuc0JXxQJWcjxCmjBmcCL88TTS5wxHAaaGpn2Q4AZEuj41NEf88ai3dQXe4lDH0aqrwRhHgWSWIhKBxiZvOFDvoTDDWRV1dodSM1Psx4mpUYZY9Bla1VjOQ0FYOQt3eVXm8htcKS8rcap+Vh0GUBWh6ok75IuU5Yla8DFC8ZjvIWRpRKTjEB/mMpO0mhLb0Xk0KhIg1iIBcq+lEHe1cxbpiHJslzc8EXkuEnfN+aZXlJ3WCDFVomjpk0HxQiRHlqi1UBXphxWAQBudMmvgmK02V65m5C0U8qQaK42r2AcrqBYL9ErotWOrikTvUBW0KaxWBv9+DFo2g/JkGAkVgcIJNMKhY6eHiyNMTimr5uAzoKawMuNnTrcMTHt9UtNY4QdT/vpkp9o7E9ll1yWyxLcO2rJJHhqHXWYcDWsJjyo/KAgAORCzMbCvPaOUP0RNHPmW50ZEATFQ3zpEWOkkc5oM6WaJgbA30KAJKHibvvoNTTt4UYinNoumufJhtzUhbGqqk9sdJHE53ZdbsYApn6GXHyYzXDknKxC66NlEuLMaRaqYQzO1yRhQrxl0MaoUsvQmxiZOiLhBrzALOFg8E9IQONhebuC7FBAs/jAevcR+wVso8xor+ZmmW7lUctCUuLm6aOEK5BEWRFG8GcKU7/BD3Lv/kFCZa5pREBorklJmPo3LNY24SvQjcblDk3v3DsyxgBOphokFDeW2VHKUvxJBnCYSSBjsnHcGVEkLisnqCTI1A5ylWSR7GtS7aGyIp4KqN8eDv7AhDuinE7/DBsKHug5HDux4wmpSjFDqCxQ3rT45k66DaCvznJYYGiFRir4VPBYLgCnoRSLZMIOBLlAbL70XO5kZJ0DscLWRFnmrQDq5nbHni3nyMZZxWO4Fpiogw4PwFVpVFKarWCkjuXKplZpis8JDJdt7KtaomZtVOOoQu5RCOZSRbJOSvsSgfxpwd2dRSVViF9dlwIw3EeFQSioTsbt3L1NIuD1ZDo8orZVB/6kogVvscWjoh6f1sg3hdaQJYXa1twUgJ2H0BCUlQnjjSK1yi1yAMBkPoJNZIQvjZLtBwCPc8WUPVQ8alXZaJxpDiaDjQGEglWoBFi1rORjUdi+8syuLyCkIpZ6ezMCljCUpS6PwYcpOt0jEYC+DE3weaXfCjHayrBOwsCLNOrMI04hZgSW1uEDv8Mm1fA35IF5d1iA9+byyysANm1ftqLvwBS28CA6RYXSK1EvSwEdVnEZ1zKfKDDQFgRlzsLYD3S1rgLlEnJUEobDP8p3OFW6MCGYERagxJxobWqKuh89pEpt3QyjkITvmKKwWYXeamBXLSE5dmRXWcaP9dbDVhP80MkIscUih/MFBBfDJOP0PJ+aVSnpuB3MpfNfL3iQB8GGT7jvKs0C9V6u0NBN9Uut6DfqCSJgZ0cos96AotCwWfRJSQKkX2iPE+5wjMUu4Yk0aeyALcZxmGllsONU1Grm+r2i8IRfNk0AQa4C852qZ1tx2MmlzVsu+PMKdLzxNYigSgSgTpfWwQ2xxrpYgJEEutGarHvdwjFXIsl0lfmlyaXSje3I+m3K2n/0M0sgR2zsBqBa7T/a176vYGEItzxKsQuiejE0Y3AY4/1SmypWHASwP1Oh33akb5usHTUEPgs0Pw+TaCOdhUueHM8orWczc7BU7Vmd9Y7JjsEZdLp3/wBjSP8mDELL3E4Ua3vQz3qZ4a9sEiiwTlU7ZZZrbhVQ1TMZrOjHYfm6kkwKX2xe0NXqNj7Prn07DU4HEDTf2E7OLLczxtQr+Voo6EEztKwqEZ9FVVaQybLoGr7sTiQkxw+i2SHkMbicV1OlBPljSOtn5ncCM3EXbHdl0Xg1+2vDDBR+DDX63iSZ3chISUnKsSckqeXoj3qK74vFwm4pNEqLM3viktxPZae5V0jW8YBsZQWMWfVZwfLmh2lj1RgBIQxdxlge7VVT5tcdn4r0djJsSjcm3iTYMHDx3sCWNcuTUOiSVZpmlDn3tNuQy3BaAJyHjsqJMxgnuUmd0tX1d/yODFA6tkZVIRT7fyi5msoD3ssO5mRBi7nE9yeUXoOfoFTkN690InutaxyuqLozey1Z+kl+2VkW7YU1gwtuHpEDpwwvRUAwzcAKSzJGpYeJ+jcwiA+yc5t5sgYdRV346YWS4+wPAud9K/b5mhAUEBhEAEBeQuAmaMStEvLDKneAseUOx47b4VzeU8an7FI/ZRZibOlSF9Uq8KTrzoAzJgSfpF7DpXszp3CuLbVIkI6pbGaf+vmu4Defv+AxGJLeQs4L0SIyCtCH1kBxEiZgMhsVJg+71rsKCvqRNlR2oTiF+Jn40NSjy8dmkGfHYA4af9xX+gCWnRqiNtcybjhZkjf/QzHhKjkVrEBM/c2nzNcvhaBFQhbTsGRVQDpJba/G0BPKtLZAJZ4vcyZ702uX0BX+TbvUnCMWkVWxHmZkbNrKlHRYEQD9YsVsl+lJr7U5ixUAacX0wfh4OaJ/twRiMKXqbEN3vLFY0qnoU01YweToq0aCBXt9xXhBeshxIRnAlRl4kYNbpSdKCLlo9w9ad6PWB2Y1wr1YQw1V/lxrrnzGrlf73HdCmAieEpL8sL69mLW9SJvZ4g+6WtdV0tWDl4YRRv89JIjhsm+8Bei5JCMHxM6/0jh/6aIMdfxON9NSFz6jOWHz12mBembXpX4YJh8Pu5+nEgcsnKEa72Y/cBp7/Qmqla4QPavfd14dF9xvy8RAgBACzUmxBwGCMwiMmwXlONFVPh3AJ0RqEWetuwKBoG8elnUVCexFmlc+xMuwAabWhcBc46GiABvNG6gSsvWVAYAwMAKZVGuUYvCbGjVbT03CWYN8yCNy5Pu6lIye+DBIuLQqDEKSArLmgpokqiZomirYdA7XNE4CXSgNDMTxLrx2lPB+njqQkIymeQMqtyA7FUbMEMUuwiYLFKA2DUJcAggA0zjQ2wMsZAw6uny67qNTpQmejVrNTwyPUu4yLX1ysUGtCLYMDu7uhYc+RCk3lTSICnZHiAkPDaQvVEP3g84hEq20fvkUBF+4duQK4/wQAk7bDR5ULhZ6JKTYAmb1NzGCMGRFCQIAyiEhREEjoWp4nE7gdrBSTR0U9AQpAQ4IlY60f5Vwy0oGpwgGQnETM+NDl5ktqe4bSGodB4alKSATFSmeDio6eDXZdGOSDXTQACXh6OMnxmJlkSVewaVPSQ7VXK3GgLDQV6pOmFoeY2Tqo4AQqEbViifYolQG1Sw4k6Fuh2IS4cleQfJXIDGA6L90Fg9qklbqFsvbYqsIhCQBgL23sXAIZR9ERZQxk1pxC5IhQlrVu3WIDD+nSbE+LQy4Hg6J4lDyi+ykNj0kJtJ9DG+PxJO/evl/k2LZhuBSgFlXFSg74M5Pmj3RGjP/WNKKQgtgsgI3ZAWMxCsALLwWSZDJiLSJQUam9p1LBr5t3ykJEp3iG00k9By1hia8GaWtDAAMG2G1ATn4zw5gHP9OvNCGy6qUqa9jKD7adeHoCBsUiJMsxDNzhS5Zh3ArxIxI54QwGETzLTsNe9IrQLzqCicKLYarEyowc1fsnFSrY2tAb2lzAAKkiS6xLTB7QwVIPDNtThc3keoTuR61yw26V4wpqJJSsTLkCtxwEOEDAMtc4U0VjcvnimtAiwcMdH+ygEpog0aLEhbZocWlLWxr44qocRonjQI8ILdRQQIY4JoSicPrpTake3QAllCqslYPR/oCDQ+Pi3KC1Fh3/QuIYzE61xwHOQEwCMhjKUEivFyNx8VFIg3AFU1odxU/Dqr6awpsJqiTiOWNBEumzkuZYLk+YtphJymB0/WTWqqjaFM4cPHUGwQ+s/FA3U8tF9aoG6NmqDQjrbddBfIpw2I+ABErv1Zegu6MAXazoNxrgQAxYYFQxPWQEhgJLD702fWXJPFjE0Ra5oL4QoIFFuJOAYxE9BlmuI3NWaJFA5nGyV9nwJWiogahKRTEaFCnuFCRL2Fmu30AkQicnsrog4adl65XHV5FOGioOhbURk2Knprquz8xooBIxsGx04a5nnOMw9FBjJemIlDjbhiDHreBjtVU4120k8DOgYJlS/8ZG4YzUWS3yp8fuNAQl/CQEmrijJrxwww8NJsRcqLSJYk0Z9bWiuyWn4JdPI14s8A8HB31AE6c1T+a8YI1Sy8i3xRfsPGC31GTu+k2eZKlvx72IphJNawN0pGvKVVisoxwSPWLMPuX5+BMx8Q2vQIkISj53fhluNHZ60UC0ljxa1wGKNXhCtIvp70JcE7n59ZEIWQizCGW8YBhKbClp1jFMm/BkHO2NRXMf0Amv6nCJ/6kvgGpgBhTM05j7TMkd4eAaVSCEN9ZtKh41KNtEJGWFeVgFUx/Q4AbvkZAZ1Gd6E8FACLxwmii5SkvwiREkvLCTuO3HZc/xgBlgiKkR1P/QhiHxQ7+WQJvznaRg1WNIV5iTlRMqgTS04pxVusErJgnhEzOQ4hRD0ooCSiB5fOFivP7xHh2xyTkV8IIFZaIE7IwjWyJIyBncCLIOlgxESyiYaz5UkLZZi4iFQQxfAsOfG62mLfAJVX2g18ZDKgNZEJtFT1jFjSTwYCwO3IqfPsiVfpwJOOagXgLpRchPgDKUx6qiHBkhhlGc5A+JGwsnm7hHvP0kergiX6CWOawi6HKX5mIbfnbxhPN5oJlxA+JrTuIehVxlW8H0xtYQYxmHDUCa00xKC3pJCT7VQAkfCows/8eShomMnpoEAjpiWIiHrZOdVOOMPPkEG6b88SDjaxTazb4JRHR6E09YGYc9ozjQKbqzkFe4yY1SWbtUFogwcLDJVTyixy5CLZ0CxejzqhjOZTVROfq8XlPadlPCwDEGUgimRdXZ0mk6QKOoPEkYDDRSTCikDE2UZ1PWOAORmeZhRmApUAsl1DUm8CZte6hNwwkareDjNWLMZzSralVjYTWrPICpVj0SUm6OA30RktdK0XrXkL10JvI8CB/EOYimTjWXeCWsb37zVHCGVKvWq6tgAVhYyK5hlIJFZWUbS1mhRlazIRmgYD3r2RJkdrOjbadQ6fJZP5j2rKRlbWuNFQEAIfkECQMADwAsAAAAAKUAugAABP/wyUmrvTjrzbv/YCiOZIk5aOoAbAsIguqYdG3fY+oGgeu7MNhgmMIZj8gPqsX7sYJQQUs6FRIIA1Ryy7WhDAZe7ykcXs+CoVk6DPpgZ4K2S69nUAFws4wexK8DAGZXAWlnbVRTg1kzdo5dDmBgT4eGWC8DUmkCYWktBmmDV5swL3yAjY+qNZGSmH8DhZksoLOlBqZiuFKgpH6AmUGicqvFIq2Tar9YAnmbPb2aLAVB0Lm4PQWYggSYUMNzxuIXyIICgNtM2rwAvUC7ze3pLQct2ix+asLLBDHj/w/KWcKyx0ctTYU8PbkHQFuBHvFePImVoCE3Q/oGjgJYLFKeF8z/SuXZBURWIE6mdkh0yMTUrkAshwRQM+rUmVQc6TgogGuZPF5NhpCB16OeE4nZfBSFyNATtVD5NGkklnNLqx6HAAR4KIUH0SbwcMErBeUjQ5VaK/aMFQ0kMzL8cFb1oofbFa1Fc1nsOobMmEVxBDzUGizREwMHEG8iiY8QqElT5c4lcTVqpjEfS8kDAtVAA0pYlDVrqixYJp5gQgFi40fAAaGJ+FGdTHnSGYiBPjHOPAxAAlBHf/Qtc1nsmH0JBxw40C+0C35ZaIe4eu7uulm0SI6JY+uoYSDBtdL6sQ+AAvG/jL6KI1n6iTCYhOYx2Q4+0ha5WfR9Er6/E81TXFFA/z2JneMbdnbd5N4GrQAQ0mU/NQTfJg18ph94hZCnIX/+kZFIP6+hBMNvfmRW3SELvueWeArhIt56vrmYyH4c1kjFd2/0J4RrBRTmmgI7ahZZihRMeNdHbdSH3ygdgscfjf/VGB4MAXzGwyYKAGdXgH+0N1eD+YzxEhXaRNWEcE2SMcWaEqV5YTuyhCaYW3rEyd6CYF5y4ZiE9XNmh4YJmWGbN27YpDSWOJNGAK/9JJuX/3gkiBmBiInPjDQadlyhnEklVUr4gMpmlGgZKIRv5ijS5WQNhkRKMxPihVZwn0p0I45CStnmrsFlmo95B0jhnJ0K5tSKIfGcEwhkQ/AEKP+vuybihrSc3hqFjsKFckBFWF3B7KocJUPQmBPKNJh3uHJqK1nXVquuNE5AOVEzrzF6UQK8gTuOuP3I2pU3BZw1ZY7ssvHNpzuakytZObb0wwAGnJdsJgkU0M1af/xjWz+kvLjNuW5GC8W63yRJlo+E9rdfrTcGk0ACUfUEiziROEhAD7+wE8pW8r4BYBXCdBUFa6a1YcvItropbUO/GLBAfATwNJUAHckMwGf64BfLQ5kGKmXQNc7ki9HKIpLRtdA2CZmc3sDzx2x27FRIPw1ANGkiAXuMrrXExRdIJmssY0lhGWVk6MA+/JKbLDDg8jakRxyLRd36MX5Uz+R1ZYD/Gm697Tl3ou1TmIdOegdEzrUAAoZscHOR2uRccQJRRKMSXHpjWHwODOvc3br76LziOOpfBKT2i5JvD1BHzfl0d514mOntM5V9ZfJ5MA4SHtIhiATxO/bBD9wMkuV5AsrjkJTZDVR7nQblrWq6gfOJgHAciuhw9EOpG/gIDngl34GXVgL4Iuc8ZAjGe5RVOuGnu0ktEA3g2hugdBJTWGE1hLngLGpyPziA70bcK80lhPeE6DmhNc6a1lQIYBWcDWAwVJhfhd40JYilDjrewF5rMBKMB72FQwPhIU0qmDahDfA4lXqBzPo1pMitZYaJE0ADKmI7ePFvGbG4W1RMISdk//FQWT+blAhDI4pgDOd9u7IGvewyABIpEAceKVsAX0hF/zSDaH3wRnV2KEYr5K+HgXLhahS3idJ4LWm1MwhGxjMMFsJxfh3EjQF+M6v4oYQfmujX/3JXCs6FojGmOeEiFoERqCDoSeHpAQ9Mc8eLNZEV8+sfhJqBr55x6nWAMIktYCE6bvQQQStTjT5Ks0Pi/Ix2JFydUMqEwM297QZXutlfkkQrW9rFDTRhAfc8uIn4+NFhYhylaKznqay9YDi308pabNGGJRbLBCtwEKomcsquIVKb8jGEKVrjlpP0gWggOSU9g0jM/QGOkBeyG6mccbZAHGAm6CtBPIdwgHv8hf92UYphL1Coyzj1kGOY9Ns8/FVQmsiJkPcTja6UkggGYqdxCUIDPDExSU0ko0rx2gE7cna63HDOZsnThCfzo6pNHnR3gwzdFkl4lDAwYy3CiOgx9lmPapgiAerxWLr8MMCTCeUiKwRkqr5jJysoo4vNMxrZPhmyK9mQfriT6Qgm0sVO/EhH2UBWwAzmTW9qxGw//A8392hMHnLROXyYBeaexFDQ9MOd71TCPtkniwBkqWEzSl03qsrWUymrc6vJX2DbJJST/u5BPkqrB/+nqf4os5SNm5oI5nU/eCygjqbjSWgM0KN9spOdUzlqJYDIDMAa1aw7AkYHzZo2nX6iOuP/a009WDcdC4rqBQc4z8B4s5VuFvJSuREqAEHHshEazbTnVWtoDxrVfqXyTdU4jjw8BzkL7HNAoJKCArJaQtpBVDDB+iTYEkYWDjbvLVYdZnEBG1XtuWqpUJlRc6cgCziVbGYeiOei+DqEBDxNekrhxjy7Vwap/M2nIN0dy0q8Q+MiV4OdJKOtTAbOdCqHmefV1wb2mbuvSmEBLqJhm3okkwRQqcTfvJ/NZKnaxJ3kf79EbkMR+0VsIssvaDqnM3B5FwNIVQMOCBr7OiSmg5DIq78F5UXWgwi7neNaLTaND+XcPZS+KqBMvRAVxoLB1zyTAysIEiuF3KnZCQCrPYRL/3h36b38bLGnBDYbnVWTSVcRdmxPFqhr+3ip8+kYAyOb1ldzatNJZdeC2MkaW3VI1JdSQs5MLBpsM4JBX56k0UejZod6IiTsJI9BbNjKriBUSZRsg4oHy+G84uONQUXxgmjYB6X3+OoYo0xxCNI1mjILvuxp888Z4A+yO/FC/rIpD23AqpBIocvGNKYMTBjJZ1VDRhgXbpc+YtsfTRYNTQeH11QQijM/TYEwr4RMErlstqDRk5qy1RyxBi4+N6e5JbWBl75QMRgH570f7pFwURh1vPrC2w9eUjZUO0EwUuOvKdIKTufMUmnAm2vCzIKr6gyy7pDqYCR7MaCpBqC0+/93OShRozhKpF8cwk2cTMCDkuCEyHTbuADGeRLed2O2IJTU3vqBrncpZdKV8bwkTnZTHzjTE436IqYMvVZZX56Awe8GU1qmcnYRe06J+3qqeZRLdefLB/dgwePVoOOaZR9a2YhNzT+tPTVBiUMA4i6BMPNPPyMy94vsRbEAe6qz/NOM0+nKlkkAdedsO7C+mcTmkHdRaArplQuCtUnV/doCQ18TFfdD8l1EbGioXnTLyJR2G16qOTtHhIERarOWhbbpR7tjN1XyLyZ42n6xBbfcwecjwVjocgxZgOfzq1KGleIeBkrMpFAP9sD4cnsvFbohP1+0ksjqP2wR49w+bfn/8ZlYMLynFLtgWVcCfHtnQWNwQDIxXScicoJXPyZ1BuA1XIMlVGcTfMKXUy0Be7PjDHFnQdNXYxrII50SegDSTQeEBYOBRWcSQ2V0cbnjHOsRa4FlSCnRdJPVJKoEFLfAOik3AQUTgtLDdrWAKpcHfNYlEerXTJy2dUQEET12c0ilSaKBQfs2NIYUXmH0PvHwGG/HOsqzfWzAHw8ngsbTXWoyWSeoGVLDDiABgL3SLT6EDifCJSGBO9QkOmeDG29iQgqlJWwUg0snhrGXhuFxLr+hECaISEHAE/nwUB9jEPbBSF63O9kjgf0EQq/nNzaIQM2WZUAQIgNxYvoyfR/k/zFQImy0tClJSDp7VlVRAw+bUTk04mjXI0Z0CDiNpkLEpHhBImEaUhRw1xofIVXPQHHJImz/5ntawofBQ0RGASuYYC/WpwgzB3e6c1CLNlwBcjZYiAj3tFLt8Ek4gxdvFGaX4XYLEWRO8HTy1Sk5Mh9I1zjINh+Fx0u8A4Fs4CcNaGKqdTLEMUKeoFD/Ninj+C+yEYYO0AYMsQ4N4WwGMV2ziDQTsXVM4HkNUAuW5QL3gFLBs0J/ICx3IUZ09XwpUVI+RWwaOBLttHWrg2ELKQVPsRc4pRJisg68VSi1YohcBxm+gRm40UBdUQRyp3Qadwi4YT0maRMFRTq7tjmjV/8pjpMxD+AgATcN56QNvKdK6gcAFYUboSZkNPISL3NO8JBEEAM5DlCJ5jUIA8Q9HkIp4zRMZKiDPUIlEsEvCqKI0TMa0KMU6vF9f4KEn7COjbMAuXEdgkENW1FfATEMZlVvQeJbvRhyR0hU/UEN7rUsU3knDDNBAfgJRqGK8lMFaWQRtLAJlASAnlAhUpQASnBWUdhxvziM8+eLFghiTlAmssMJxtMl6Hhn9hB145MQ9ughh+QCvicLBbAAFUcxFeFh0wGD9YOHSSKI3qiHZrBPuvkDDceMMXUFKNBgyoCaejMavcCOeoYjZfYCvIkvQjMEDQAk85kDjdQvffBbKNP/dKHRY63oHxIJEo7FHoEmIkhxFlDSleeiQknzJw7ZEw1xKxDDAA3BAI6pctwxCtEWe99IRiWlJotVmP2JelkgJtV3ObM3BlYSTIIFGQkhRU8hDftlHgsgUQ/oORcUcEMkeGqFdVbVJMnjT9wxgD6DJpjxUDLpH8MhO4IQDd8nBL+XXTSwkEE6kiiFReyFmx4SovGYl+EJMRbZEvlhQvpRVeaZnLy3FgmBmlLhmlg1pZPndZTybalnSiUjZlWARqYTKh7IHS/qM6moG/dRSXhxI0gyEWdSQdwCmzXgaXNKCoeQixV4VqqGlyIYjLzAQH/QC11UQmeiSvoBGaZXpGsC/xZKpBctE6GMYgMvKWMYEal6UkglJZk/mkj24BUMB1mEAJAvop7QMxLZsYHlGQa1eGt3xCKxUAgGcKEc8JuexJY9to8F1UFa6F/h4SJ2E5R+OpDj4Z7RA6qMwowrQwl4wXsbdmQHKSsBwKwMEpdCmo+Z1ovdM0AyQajKOTY8tKnpOB5uWDnQo36+uZ7mmETCymsKBSAFcAMFanOBCK3C53PkWKuuFVZGqZEJOJyg6gMAO4nXRWy9xjjGGTYKmypFqDh0OKLI2X2nYjcCIy/dVX+r9DblOJxY6a+g6qJMIEBWmTQvUYTOhpecoLB/6geOOgou9FO3+Sq3wqXqtBhIsf9/kkc9rqBlf9kEwDqLs8Mf3XEhCDQt4JUQBjCyiTWVJzJNAeehJRUF75g57cCQSDFwSEmLmwKU4GF653JG8yBqWcQwk1dxYesFc6OUMoOlb/A9c7mlA7SBOwCVl1R2SLmGQiGYegMZd/uR1oIbztgMXOUif8sKDStUDehe2mk2FGmpLxcG7cStCUksaFAxSqFK4ToNqgRw1HpriLozEnE8jXMD1wdAdJqHuBlhL7Us53St3maQcWW0/yl7WgGJTOovSAMbWlMLewtREMiudwBU2NZlacVkdeaLbjWL1+pl9LoZKNcLH0Fh3cl1jicG8bZ1fBFbo+aoyoK9J3Ai+cr/RHcoRGhLYv5nuv6hSS2zvV31EUvaEhm7sfBBt6HqZuWbMLQAqwBQA/h7EXbWgtqIkkaTtWmyeCn5KHkpBo0VYoIasH+iEkGWrM/gXZwwOFhgvxVApXdxPPkpISAIfdPawiKhI1QAC6p3E4WATubAjt/qothAaLTokgbptX36CzBMAfkjGKPgTAd1NX4Fgjlcd+NjR74kROFZoKakFw4jJqNJrHtqYRb2f4X5RsdgBQ+BWGbzstkZvECbrNiiR/KBh+JJbyO5w3/5ryGcSADyqYQSq+gRGDkAFQEAMxcYBKlhShrnKSnBOL4KRLFxgIGYBZ+VIUGRU1wZyIMJgtWI/3edhayUYr8LmTNAVjYEMTtHd2G/c3kWBhP9sTjnBS+Rqjzelp7agcAX6XbuizigGltgRB7KwK7oeAaTdHzeUlkQxWpQ8XpuQBQCg6KDZiuRSjV3g74+u3mbt7EnLFiVg7q2aCOmFB2ANhBe+VU5MztYM63x6r/REM5pQ2RXBqn1o81TfAtivAOzSxILnDmybDwiAo7uGhWQMp5YVA+EYL2o2w1GFjTNY5nXEg3V/B9ERkiyKYGP+VheOshJDKxAQc+4Qgtic8hbi4F+EA6V99CH4KgtcDGmpjDaiSihVoDmqSG2DG2joEBUGhF70Fq/ai8jDSgtJaAmcUzI6QYOMP8SGHMbQOUJMikLkxRa3ms4IEjNPOyK8GKy0UGlYIoNVgW74MooEFEn9CzK1egtr2C7lhxvevBX51w22nAJWdJ07JJW3bYXAUtCnDwv3YG//TADYA0cwjBPvlwU4krSrXgLjpO78zqZT2uHg2Slt+FpA4Jmo6OlTZsJFpJnLIKu5xS6YfgA/GRSAxBBIugVAE3IaxJAmhNLbQ1EoVNIgfHMCGS9EbooMMNE4mU/NwwF8EHLTLVnkywM+7edQFiJBOvJVwsnIgw0nEFhYElP2GOB2Xi2+5sJwXIXMnd46YUgDCpJF40hyfFoA6cGqaC9Uq0ZmGPWT5vWoY0hFXkyAkn/LYr2K7ZtQN2iGC9Gfy9VFu4cotSSVt1gvW+WCjKsuTtFVvcHGXzRh5hHQP4KbxaIKBS2Rxg0eYMwJ0LAKKO2SFgYRhNjxaCtJpJGpwZScMeTdBAamuIB4eoUzGvLk/AI2NEHGqoFBtWZgjfzNBC2oT63uJOSN4eii96QiYHA4t4iFChDqPCdqVab1kfoMJ/pi239vW4Bh2+GfvoEfSSDNA+E2HfMTUXT0+i83N3QGt3wif78z5MswkwrPFWeMhoMgWIQJq+RanloTnyjFddRAN9XOjqJ3cJllXIB1j5hOcIBu0jKF8GMxGsLP2rtOwUVksS6R1VlMmsgbZrGg4Gg/10NY4iDFmMaOsExDB2X3Ie8B7ARnrHifMaUicOfc2RZ81vtZawdI4CYUAC4VWyoW4FLxDkWIMMQI3DX5c85N8loHc56mk7RnN03/AtynEl8vt2yPMtkDi1CQxJ0dnRclQntQW0GslGz8qmuXq6R7q+Y9dpscs50uUraiDBfZYURptafcB3bYqs7QA2W5BqKM3nregFRbQ4FuDTvK9KQTuNIjN/rMj0iIaunkH96wulchT/hWCUkoQC2dCsFUpttyyRpnupiZ8ZhtHmzm7Vyrq7hMyVKq1L5GA+xZu2kZ4Eip5zX4XLUB0R8PUy/bQ5ekspYIBYIyBB+uOwiQdbR3f/u757f+Xjb24Fi72bdcUlA5LaR/F7CLxRhfzR5y5oB0LU5vpTTNqlO6S7n624jpMIiUFMJ5qQf7EwQ2bNo0pvtDzkp6pZOyiluVeBldwEDaslVcbq5a+fNwdpNxCrfRlSqb4A91XPdoqej7gZ0TKaTHPkSp4ZK6mLDMKDahwFUXjbwdxB2YAp7mGKzzFKcsHt/SFw7ZNP4nHLS6bBqJqNkOcJb28DxzXWiBRIIdcQOIt+5YB/wbyuErM/aKo/2MB5isdGjHnPzFTY/aWfz0i0cKdRGZuofqa9nrbp1jgnWmZXkrc9wSa7873vGsvr2aQi0AVdgxgo8i6Ocf7HvaXL/xGLmGjYDMcXz/YqTHblprxAAgjFAXBl0AN3/D+uGYSRPTQqFjm1dgHQFWeBgDigqOlDAFvA2ew0IFOOxc3g0nc8ngEAYFCxSCw2W8aQkFMvApjFwcsDrLUxqnYws73Wg9ohohLbsCjpUYoAEvyC0OkKjvreDgQMHKEcnB6MBAwGqkgCaEqEcM4qhsY4UwRSXs0pJlkwxthwMV5iLGbHQWDQDq6yEA0LCDSAtxSkwpsfiSoKLKS690I+4ibIs0I0zFTQ3qlS3C986DYyhopnSD4MGnqoE3uYWsK2XjqnFxcbix8gpAg48AErmjDMBPWUB2I2LkBgnqJiY1aVaHRsx/16JKOThVqsA6taByIgpU7NLSYbZK+bgGLKEKjK9C8gJDEFqzR52WXNHVogvOO3MikURxy10Bn6AgEOoD8RZGnYlEsCIZMkkJWh0oEQxoMMv0aRNMOMlTgg3ejANgvO1YRh4Fr5Z3IE2gamNOtqCZdHnmCdiTx2ZzNduhA1B1lSYyaA1lq8JNIHICLuFCFU/Adh4OIuV6g5MJRrMXGegDyeIAJYiSzAgQT29e6OC1IxwcEEKfmoZFPyh4bbQ0hSPePHu9YECrQBsjgtCFw+iVQyIVJq65MmqpzbTYXcw1EDd3Z61kSVmHKxUArTuCTLTc7SpxIuHAn7Dh6ALFYwAEv+wALVzKPgm3RnOwkrlwb7iqpWpvOKElAs0IU8yn1QibD3PrEhwOM46O4oFBRaowL0YSAMkL/zyW0kL95Y768EHCytjiKQE/GZCa7a4TaqkOHJGhQIwSym4Cm/04DMLElCgGzCM8CyABUK0JxJJdIhBthNqC7ClOCb0SrAEa4QjFZVccabCCRqwwqMScCnOqwPU+EyUNN9IQIDTlLTnjmy+0OQOBWkyqJMqRaBmrJoGSWurLfa8rK0EBcjRNx+/7OeTss47Jk0DkpQTqnxsiIWfldbpKhTQ8iiIKCzHssM39wLKMbgsyoyMl7FSeIZAFw4YLSMALL0UKiMlI8GLTjn/IqwaWZOLlJ1quCQP1TQoKKCPaKKUjairQHgVmlab2qWS+uC8b1cRJ5svWWZQtObARuE58CsJ7uxxsAhf+ig4VAHlqK40uYHmBjHsmoJSXcG9RxISbjmsVT2rS5HdZK2qkKLqsgKKxV8Ds24jAwIJo5QiEzMigF0CFvgROu+8BDkzI5YyJlgFbdmhAHaA1rAm323hIVHOgTQrtToEJNdvRw7XEmVHKEAj0LoKdbfZ9HSxi9gm2CE2+FS5GI2kq8mYVQQjokoyD+MUmiQHqLCEqoSEEm7pjXypRSYDVyzDkw1eKmKKMWzGupwEWBWPVrkq+Nczkcce+ATxuAwE5JR2/0tYscRGhBjuq9fI5xK9XwZZlyF4bANbZUI2PLUsJ9BCF0U5QNzxczcBVpWeYo8lrMtZGG+9G2XNCD04NXTnCPnw2EXs0cn+KIwD1DG9VQVTvDnd1+ogIR/qqz9RZefj4kTHCxJ4CxoMyuBWHaeK1yuSnoTKaRwZOGN7b8siRuxT3Ft/XAK/00EMVEl28cx85zBpdeKbg/TyBD9zeYp+C6tfLwoCmoGwom6/IwClQATApwhQDDywwVDaoDJk2UhK0CtKA+tHAXC4o0YxQ6EwylA4DJJEC7bLxQHAIyEJMMp9IGwb6+ISmT8FQEy+Kgy/4ACtu0zggjHUS+NokDzb3f8geRXp4QjbNrkRZi4FR0NUUgYylandpQJLZGIGZ3gBXJgOQxoowOpqQ6xmlLCBmdsIcOxGImzRIDY+G2MZ5WSSGsiAXotQBwdRYcI0YI1RgnrXgwrQACCNQQv9cMejpICHPvrxj6ewEgZ+kBhpHO9lK0MkFTszNROosCzXOUY/RKPJXQHSO+hogPJmJ403PMZHdFxPvUA1HPSIIUeqZCE68MCBoMESPwKMSAl+QAFlnIVEvyAELEbZsqsEhlW/wowntLDHVrIgmcpcpuSCEAu79IQnRTMlTuKCA17cYgcF4t2fCJhHZYiTnEI7hXcm0SH1TSUWd/wHN8jzTproUJ7/mEkhAYv4ohRIAhMBGOc+lVQ27ygKeZToGRohMrtX3KgocuQFDBa6x/LELBzRGIjqqIAJA1TUohe1hCYmoYAEuZQc50SYO6mZrvGc547yORkHLQJOvFnAATKd6UURxxhl/apnGXXBZMDTznPtaw8ERYZRySAf2+0xCalgalM3mY3GJKSAazhkouCZt8aJZkVk+KAl8YS/cHDlm96UxxXKatZLYXQVbKDES0uQBLbCKBwgmIzublTULFAjmHYVDwVXsVTAxlA/ibqZH2Tgjzt5bWPegYd4QkmiqZRBQqDgmZ9Acjkx/DWzAisbMgIpUGUwSBv6iAid8NY+a1QvhwbF/0XeOIDChmzgJDLA7Gz9uNnZ2VRTlsiMVCywkCgdTzjXMaoO1LDd1OYgCbYFgGydO7baMmawNshoQjSVGfa6gmB5TagmIocDL3j2csgw73lHl97GuCEMyJiKHiZkk5uUAy1zQ8sDB0y9AfTXv8VbqjzUe7wzqjVLNbFmOTwCjknGZLyXk/CEAVjhmq53Y7K4yfQmQ5DIJoMlpBixPEpsYibiQx6Jau9HspQJC3eIqodllG+p11wcm5gvsIWq7MKjXvduwWLJqJ6Nk3zlJ6AYwohz8mPe0Z0qZ+rGWDbrUmts4ahIIsXYCDOEkUxmOJdkyW2mc5sj/OY45zmAS6UynQpjgWc9B1rQ/o0AACH5BAkDAA8ALAAAAAClALoAAAT/8MlJq7046827/2AojmSJOWjqAGwLqI4pz3RNpgYQ7LvBszudCyAYCAQpm3LJ/KAM0Kg0MKxaWccsqsnt0p7SKPE4IAzO5uL5TD5es+etd07XOHxS1ppgLvP/WH4CAGhrbINVAnxIdY1zdwYFUFh9fgQ6RVmDOUVEVJl+A3pGbliUBIyOql8BUVSWqJ8skwJBVAdjVAVEA1REALt7olkuimYxq8khdwe0f3xGPp6RnAA+t7+7u54tAbuDBb2EpIinBMjK6SdSRYuZPJIBtZGv5Tvv1i05LAXytQ0ADgRgc6iYHznq1DnoIe9Zv2mtmv0SM0iWPCNAcrX4JoDeNwAN/9qhAnLxD7qEqiBxEgbsYj5qE2n9aPVrB0dT2wTs8nHEQIJPlzC2EHkOZSMwVPgE0jFJFJVW/SpOIplxXqQqNGslaFkECs1gfbAQHXDSKBNIr6AFqZjVKi2m0hLV+oGViIEG9FgAbCGwSDihav4IMHsWEiFom3IIxWVNUg6LrUAZErV3TLmhDaBuFCKto4JfpYgWJfwlSmAjDHN54+FL04F+A6EZArltHDkyAbY+HLppzIIF0ti0gFWWtAgxadQwbfVKh6RADhXs80VVSEbQh57XdnFVlHQoauRB/0PWuAi0xhCVYiHRqWLyg+ZSt+XrafUg3Z7am8UpwVbwvSRwm/8xJpnnhFcEWnMRIhTNNQ5bdNlHl3U6zEedEGtdhoUBDCBoBHCTHfHMaAba8Zwl8/AygFef6BQPa/tUWN+M3ZBknwv4tUbMGAkAt9UZBXymIkawmFFiBqaZoQeGdnVWBgDfVaggflfgOF+VVbqxonSSdCJdOYqIwsszAxxpAYJKJZWGNL6U4d5TEl64HI4UUtlaPtdNSFVfROojiBCwlGemSmEy1U5ilDgVoXVX1qhhndfVFWkQ1+ymBpF/PAbUM8UR5sCJZkzYSWRsMMeolBSmGumkWGJJX32UQJebEc8RyEenKBkWJl08YTQjTRhSWWWjF1742FByqopVaxf1sgD/ACMNNSKu6RhmSC3ZuMQaQ8nGWF2NrQ4VLp2QVrHIAoytAei0ntKkJC9uFPDQPNvOoqCkq477y7BWJItqC3wU8Cx4fPRABJlmWXvJPWcAs5JOM93nL6xv0GnPoxX1S3GqReR2RDOKCLCAfoEa1dQlmQ1VK2qsvRRXnuLpO4ZYYj16hXhwDrHPloSoJ0ACB0QzJnkJ5aOGhjQ1DFvOct5YI3W1wBEfYEOAWVNFNv/LaoY/f9ZVr5ym0xQpQtl3hjcV5jBJzOD6i0WzDe9IRkHEaJi1q0C8ZwBwpgBhK4mOLHRYEMLt0/HSMOdTX2/7WgitmJm4oUkW8PUdX9/55bfx/8FpYFJGR4eFHXisK4viA2rPyeh2VZYZbYqbZCQn9SCwXztzxuH+ylw7AwgU+smi07HCwQLs9YlQUsZlKsUZ90TzGG6OOCKKl1JeiZgyZ94DT5esFAvBzwwm/HACCKR2s5A22q9lwYAiPZnwv2+Em4fEvW9GwjJVFzkNQwvx39SywXB6ESNadGQf13BazNTTmmG8LzlLakMnEBMKNGiCfpe7GZ1gtZY0yMsNhmNXF4YXussFJyAtYxP+8MSecZhhRFOLT92gMUBEGII881tDJmY2BIpdQ0aYCNVuMPIeonFhBXO71L2O0IBtFKsYVjDA38hGu/iE5RedO5qIyCEb4f/AAXnrY1I3RtWTAhhjRQ0JnhJIiJGj9QoACaiNqRTHJGDN7xmBQM3U0HC8uF1xDQYIka9U1DkNUkwW1jjAEboEDeAVaAlINAIuEEG4n/2EhcnCD3gIVMVhKCd0fVBP/fp3iKO9oYtIQxWccoatdYnDkUZaYyAOsJWqFe8nETtVslCkmLNBTwc4DE3/dvi4PVJSXPSz4PpWxw+CAKNn3FPjDH4RivsV4QDPkhKlFMeD4KTnfsMMZxa/6I9L2IZ2wsnRYahYuA1SxRd4AAscpdiwIv7BBmxMYiAKkIAf6ultSfODEOR2hl5asY2f2+En1UVMPYVJE+Tp4Tvx9BROFFL/DWATzBd4MyRT9FObtqiTJNAQKiny8JOdOBjZwiJKYy4phQMJ0aVouME4YYWmWQBZkQLoAejlpA3gAuJM4JkWyA0FcsK04gv7EK0HqTRY23rFtQ5Vvf1sjgo//KYOVjSG6clgeIMQklgUJSHl6WydPquZWnlYJMTkMRCUjOqQSrmIPbzrCgjUR1EfcggDSI+nG1APuqomJg6WlT9jeiZQNbGUceiBTF6cmx7kU58chBKDvLtgIY8Fz1lQpylJA0TQpFcCB9COQ/pQDBw5mLYanS5UC5QcL9QKh+nxD52yuMYPH1QI/pUyh0QMlnU05dlOiMR0oLzVCMD6sxhFRWQj/1thD6JmnbOZ8Qj+CI0wY1SkCwqHXLwZZUIvBdzT1AVODpJRJSQbSNKeJ49E/EQCGLDKOr4EXh88rYqgBzns9ZKhJG1qxLwHXPHeFnqde2Kq1AYtJdUDQCIEAZiIwYkAdGjAdWzTAPgpRdqZAruO7VkVVVpbpmIvqEq0Ddl0uAcwfVedU8IfGcAFoJKBgLnI8kePWlZRTwRApxs2I298ltYHBXJFft1jiHS2IKdqcW6kQKt3B2kvvXZDbT1RjAx3KuH4sI0THIqRwegyLwIYYJLqGQM9JYdQ2nUvcqNM80AbllC0qri2pQzMXb2lD+5QB2SyOXL4nJAFAyjgMmGNbv99saqZjwmoDQ9bq1Da/Fgdric/KF2xeNlcP04LZbfTASlnQOkN0RDgA5qYyiwZMCdNYdVJueHEjC0TNe0+r6AsWC/uxBU55ZxxTHSNbFVL5Vkgqo4a1pufPZXLAdO61AUfDenyznwRQ9uLsdCrhw2jhlQsR/kegNIjplxaVVMiOG6zMeSV6YmacZBqRB0IjYpaWZ3p9EBeY1DAJK0hORludyCIUJIb7mQxcswMdqbU4pBmqC7PxWK4+JtPMABjOlPz1AEGD29rgejqnPhHzs8jZifoaY0ydPhpBonscEZCTDede8vrHYXLdVnZvLH7qFDo7gac3RHcpVS62wzOATr/dL+aiYOgYmlOTTQ51xta0ZgiYrkOLWPpySUxf4b9sf9EGYkA8yGwGDl0MUCnOppUVBYd4vMmiEFwYTZne51FTOzwSAi4znvhVM+zyD9HLJjlfJjlo2eELcBzfjLIE5ecE6N90rMe9VmGk5U35grrmBp9jkheH2cppg67poeGpuu00Y3YZBrkOi/z4rsAzz/aEiL451c2OpG1uQNFeGEuNHgwnPviJ/fJ+BahFP8usL9rStaqMhJfG7Z7L/AOsWt9EHwbKoZ8BwAGTDK3oMHEo6pBjRYJYu1smF4MQ6HPzqu0jbGLskHskTNVfoRzSrG46lM6qm8IjNE0CghPhl6N/9sjehYDl0htoiRi4BXRYwkyVUHepR6FBB3EVwvzUw7KQ1z8YVeLsGyAMwGmxW8b4gtAkzz5oWpElxWm0H810yLe0EsF0wz+MAzrhIBjMTTjVg7Cd0ZI5W+212diJA1+tQhO1V4IYwF1J1G18BnM0U1PoVNDR3tFZwUZ82PvgWQ8oWdMJT3dtXCRU2mfp37CBHx4Ym9WYgoaBj7PQHi0RhUdkRndZA2PcWb7wDdvY4K1xx0sGDJ50VaV8EAIKC00dFBdeGnn54Utcy8UNRwVkhiZVxZI1BHqpxcvcoTwsA8HIFbiYoJyKIB9kFXk5xRD0FYsZkMRxTsZQT+deD0+U/82QVVAenAVA7dUjzQBtAAQWxYAAIF/lOKGLKAA/XSJ4nJtTCERZhAPnIMqNpN5YuJy7kOKfWQ3mBVXxHQfVVGAD0OF0FABzsWJZceGBgMFvjN7wHIZUDNcZyYWtfIO9FEFEAYNI4EihNSAf3JUMWcZLfKEthBqeVMRsJBcX6eB/gAacWUfCcQfOsZ6bIg5wEIS1EZEK4E9o4cf5XA9K/UnJMWJn9OJtYODt0Nl9oZArcBu4eMDf6WBVVJYrZVAbjgI/3EnbkMpjaZ/s2VWLCIsagJBYUI/UkUQDQhscmZD/dMzjJJ/25NEhdaDwWM4dFI2rqYg1GYNtXQz4AgXKrP/EiDBHZWXCK/lDsIgWTJ4GRNpN7wTXA3DY1bmHHIDQiEpAbJ2aSnCkqwhEZbUGbsmLq+GNk0yDshXWTryZOtiW2LSSCJBb8lEZFDGdrYXFyY5HTehZY8VhA9AclcCMUj4Az6xD/00Rx82UTmwG7SwIomHNscDWVP3N6HkQuaUcOY3ZFWHI2vmIEiYHyN1eqbzPhKwENi1CymoFyYJieOoFUMlJ/QyFWgWFWbWlKsxd8/zS6QZPqSJRqAkfPBiaVUzUGxBiMrzaqRQD4tZhg8QnJXCF0mZe7VCbU1TLJMABbXCVwEAHD12NNllDSeBAu1ohYIQGzlpgzsydvtCmJpz/2wnx31zVyB9ATE+cH0PgQfMwY2ckDrfkjZr0Rji0T76tgnfYF2bEEAr4ImX1QsptpgFkQgdFR6Ooz9syBhvYRvsgmbw9A1XkXswIhGr9U6/slsu2Uq9k01rQStmdGaAZVpFMhuKcFRulnGJcEdcSJL30pFwggs8sEMPFAPfACOfcJB4wBl9oX/tN3BeMVxVSnL0xRuo0EQ6kQBOED2olEb2BEZj53ua0IKityiJRHV4tFOfkjdmBxHbk0AH0Bcw8QNARQtt2BBGg02WA0cJ8DMLsAxe10aAYGdDKkhcqJJ1YiHu8j5EKRi0CYiLdKdIepsd8RAk+GAxuTsQGFbecv8ECXBoPbJcAbZHfvlz5BVKVtdvDQpjquQ3/dUTPSo45BUeSgqJWBWea5ha2LWp/OYgHVFLw7BhDKATDABYGGCi6ecHvfKfsmM5VpcPqAGG9eY6BgWE5LGlY/cc20il+7A0JnUdm2Asropv4qJv1XcApeVAEEl/wXSf0Ul1xkVvdAosHdkkIESf5IFELZEaZ3enCMoPutU3quUthLNm27AzQfIzDCADPRNMdteTFSMZ1YMsIjolmoRAHQY6VniJA3egJsuN4iEQY4YJS0KEoAMO1/YzuKBvXxUoZiBFveePbUA/XWQ7XrYqjQKyRCSaK9IbIYU8DKE24yiAHclVGfL/NvywL/VUDLmhA2I6AwSyByU0PwAHkbehaWFZaPn3k2cmSqTgiouKFaOSNlParwfUkSc3qxcSDMfDEwORDbUAr9PkimSKCtd5GpaGfkJpNL0wI/ZYgaaWeagglDIUkHCbB/SiP0Q2h13BC76JCQHgrM3WYJDlDtp1G7ejXQF4P0/0sfUTLW1VKDNnFzJCXGc2SWIAt0Mqhh2jBwvkYzqhuTtHlBYkULzDTNdKLv8IlaT3F6BjOjgLQ2cjHrJ2oOWpNm45BWxIeiRHFUcnDlvFDbVQAw4wWqiQBoDESTVzNIGbZ6OQIyEaEaRQDZEhPeEhRVrnY3BRgC4aD2wyE00B/79SdXPy4FfuYQ3cuwuysWVAKBwT6ai9JQ7L+y2wgnxCQ0BpFD6wFbXpipCMVr+ucL/z23PSaUbt9ljPdGbcG4VJZbFTVW4EgT3OMyy/ur7M662CUVDMq2Yeq5S4qI2qVFnewhGOuXKi0D3c24nY0rfVhK9pFrxZsDk0Fki9kRhTFDL4EaA6fIS4+La0yh+btBLoMwuCoCRBPHCKyrdXpCX9VjeiS4FylYKZoBhJ0rnY2xZKSRNeMZlYzCJ4FUgKUrnI473KUQPNy8Shg4BTx1+xuiMtImaqYx0jdYjYArCy8XDHEoAgiwfRG5M3MxUA0p7N9MipJwMddowQqI7qOP9zNWlg36YaEVcFi2y3sMRUbwN55rocEQFmlrw+sesJ9xmFbqK7GXAHsxWWPNswS3WMBZZExPeTWuNZ7YZkQxPDiysMG4ZL2ph7lcwtbWNzWXE8DJK8uzwDtBkqfACSJrZV6UZrcIZOjHVI+VJMw4S254CHvaCyt2iglVzL9yq7c/Fz2DpoMoALLmdy7SUSY/OA4wtykmwwyaxiEDkt3xQtrUTFR1jPAXmv09t/a5vHoszLZvgH9JkoaRs581jIAbi2EcJaV+KCf5UeJ8d+20LN/RsGYpk53THE0RJaB2ECQFg+A6xUfnuUslPIc4a/C+qQBSR4S4VxSkEIgaRa9aj/ONwYE7UcUqoJcNwThpOh0RpIIDn3vbiGlSJKXgQhNx18ZevME5MFgORxK8aQZPkJVeeDslhMsHOYNsP6INNJXgCgqoCwABaUKQ3GQzoL1hLEiTB7KljBkVYBf7u8K+ArhvrDojcM006zHkHAJ6/FkF8UB8sQdQTQT3VFU7RCkfcp0n3COHklkw87DR5ZhrzzDIqJVR47y03iCsyUWtDCbxibKN3sAc42OAnQSN+HXZUhUyE3OSqZSS3TJZDnPQgTyGsyM2XVTW4Jt/0ahnK5yAzjX9llCM7qbPMDAAugHDibQ3DEGHmnd9eKgqq2LCg0U6yKRw8QOm9XEy9B3VAI/9VZCtE91K/9dWIpxwbUggJ2Bd7j/XQYJSQTxmIGZ6+ZClP/4s/GdEdhg9ROYXr0lsEduaWuIFSylSNTmEc2A2VGoIg8ioD4BgrrcQToonDQo0VC+kZ7UZ0rpEiZioihoFwUviRGWVF5kEiTzKLqdJDFxhYuR3Ctw0No8b2h2F/QkBPWtrG0lsKhGRW94EQ2ojNHVj42l7U4jgZxCN0MNgVVHAZrc+WH/Qred0xFV48DvYfKURLdwyMhe0GkbXDN2zQ6iK2i8KRbPcqzKVA+YJszw5EZ7JYVzTT5I47ZZxvrB42mtriy0b6o0CsC03Bzhzw4OKzxoiyREjTLC0LNef8JsxkmMSJDW9FNugUV3Efbqa4+mQNCWmnOMySfXQkwGxYbFnZ3lrHTxd0iz6TE8nALO+RyRo0G6LDG4ReMtYTqSEptWTbHG35ljqN7O2M/DaS4vudJcXNAj/OBRrxlHXpWfrEdUs0dp5dmaS0o8b17ZyNm0H6ghk7mL5MvROV/q+soAxyIGloIgccLtCRsNQidVpIJeLFCWpMUkLfri4AK6IDUjW0l3KJbDULmTKNqMsmxY4W0N9lwymRZjRQbvXNooAdlQ4Zt7R0gSsw6W9cTCyIYoq6BOhRqr/241LzqrJ4ameMomJPxZrtkUgPC7XEJ5p1wevlhl8ER3l7b8/b/LnqmBu/JnnLMQzxudlU8vc5b0o5TL5j6n5MRCwHgteMYFriAuqG5s/hZXChpfCpve5/YxeouAe3Ab/pbsgwKI7JW0SzCsOrzmNDdVdnOtT0oCMKoFP1UKNjhYiCtyv5OnIZtkeRAHS6fCjBPAK3gSS4xaqYSBW55QDefyAmtg3Wjpl3vZkqh3IVitkZHNSaP9uC9kq51eTQENkbw8hSAcRhBHiGLkOeT4X8cqp7P6WQ9NTjke/CTrXAODJ/kVPylwiaPNot06k5TJ6eTfkmcHkVQHA5PHlnBkNKIVTqF96kOXniz/BgaUVN6R4gPHah5Nw7zCwogR4fkC0GzbX0j/1CX0CkE0hxSuUoSL9sgJO8QEAIAkt47sRZDCGoYCMIDRE8DSAIouqsDuxKkvg+7qSLoCoXKYglVAp7OoHL6kJSEwEM6lZ5IFWXAIDMauhKD9rD1GMzn8JC4pAhvs4+SLJPgZiOnTXQzAZJKP78cHZAwQQUvHSIvkAmcGkEaghkHKioHAaetQr8ULTOwNIMxQQC0tFAhDbclHBQQlL0TDxEWU6YJkU2YTtlInYzOgyDgjTaOgALaPbwTgErLqUwSR0Nno88J1NG5UwmwVSILmzcbyVqWdKeKQV4uGnMR8hgdQyXEY2DVTsad6ScA0ahYaVEhEYgGYJZ4AfWJURlQZ//WaAkXTEYOeyXwsADEj0mIGSUuyBOEpFibAl5EJFgQjE0bGwV2JCCX64ofaAIfOMCTaIWIZNuyURTDqJDDht/CzZNnx8wbPo0mHCkoy6qsJDFwnDSQskMAfG2wrTHlaMCBA+YmsDAwwEBOgZh0zaLm89vTMKJAMTmVCFybMORg2JGTCKgPsbey8MLKpZPgmhtSMlFw4KURzBYlqYV3woDOgU2vbFG8REvZbU9xnMpgSKnWAWa3HszShVOfEl4m8ekYh16+CpM7JFBQTIPrqXw0FsaD+ADoKTxHmJhhBoaFvBTznikl8e7xqWYbX3wa6JjfTqZGaCH5+E0f48JjM0D/f0sfTEeuCKgscWBAAbhAowE+e7JQKjvtuPsgG4mOWaWtWNihpQU0YLrlttLIACSr9y5DqQcYwmJjlZPgiKotaiZ4Drro8ADEJy5Cyc4LGSMBpzxUAHMFKySOUoETsWoDahZAUNDKQxcaMCqBBE4qC0moSlmhhATOChA0uVp4gYL9eiGKxltkfEgANL5Tw6gmyLxoQWsCsUvKxjZ0TJEM5BvmtQ1INGWOx3pszosEWLTEj/00bMEm07QBB6n89qSRqHziiENOGz7BgEyLYqhtkCjrmaoHfoixD8980prUnDuoFAAtQS/hYro93TvQITEbbYi7ISL5g54hyvMjsLKY/+qto0BUaE0+AEQEDjEVxrhjhBxkamaLBVq15Jw6gvREqUVRMySHuwxpCBci5UjMoDaraTS9qC40KDkXSIEhgR5eUyOzUY6kwTo8LBvFWldh7a4XbMq6cTvVCtmL1q16MVBPigi5ELJy7APsAm7SS8Cy08QZq40DfJiBN2lHAKDJagGm4o8NXRBZAG4X/cbRg3wMN5AF2R3nJUs95RTcTUxphAJDUrLAgwYs88NYRYo2zLxo/2npgJRVlkIurGqeOQ3UuPXOxgS1GPm0i4vFYGE3HdEKZhXq06IBUOeVCTM1mLXA6ECKGzkEEvKt2uoqOhMbqAbyQWVWb7x0aGIbrP9Zdwdt2oCPU66EoDeqpB1M7F5TlLxhgZakHHABATYG/JJZVr2hhQTIfjSvscK1BoYG0Yw1g6GB9LXSD3wqu2ADkpat3nPzmTk4y35gAPcwWEDLgL9Pf2CWwd2SqSu+iHbU6zLLsVQcY7dAzKjj9nKyNbq7miw9UF1yfCFtvl0VRuuuIH2BKwHnKZ5kJvBKllkpKkHjSo+4gJMYmB2kCE/ykDi4xoMDCGdBxAtGrsSCI6OYIBFjwMMCRhE96e0ECbEpXMQIxhALmsY7baLdUM4GuRdqTiHaC89p1KeaFMhET3mKmeZKYoMITiMALWFACKOBtT0EQGkjSUHs/hKu4+H/TGHGYtobyBKxiWRGCwVQUoFgdp/N/YVoSeGALizjhPvlL4T7ox3kfCAPooSHIYfDEbyuwwrwFC9+8ELXVCLItayEp2CkSl+TFtQtEYyBBQkwAwiNGLgPgMgDeOMQ3bCTqGx87EgpJFtmMIMjjJlhDGMQGbTA50kSeY2Rv7BUB0YxDegBAH+PjEsby8CxKL3pcIt6YOx+k6fWPIhoydliAYxWIAOBMQMCNAgjaUMmX23BfgKYJS3jQh0BTCZivQvTvbbxrp0N04fgapsqZGdMY7IQjuLsoWse5UejlTGBBpnSADzIEmsKaISNO0gDDDkq43nsLjCcyjtNOCKapTOd/wmDVbb06MMzbUxc30oBWnxAguc5Mp9Xa8oeQJRNRLgtZjMS5i+xE4ounCIlEumli94Fzpn1KqBaoNdBzPcVZ1GjJdXc6DVHaI9khaFkx6lg+QqGLl2RIxE00st2NFWLZPLMifQsaHbolZ8DtG4cZ7GMyXaqxp5ytHf5qUywjAQ8c96uoMn5gx2KAYc/5OGozBQaiZCzqHSKLKsV+kBXqXQyjYZVGtzsQFZ7NiljvE5RphFLgt4Ti42ogyRV9BQWDwRTUJDyV87EVf0IMAboCZZF0llNk6wzMklx64KWRKi9suMk8J1SkyMS4AO/t02FZTYw/elKYEXbohG+yGRwOP9rRWy4R3iJY2jYcJzvWFtU7QEUOMY8j/wc9TxYhsy3v43OJOIgkxyETlObY+wiIKo925IqpmAa5hUPNKO87LVYXRmTGQqQ0xakJQFg5e7KTKISeyZPU5yM3GUehS9BjsgnB25gTI23y1EYMxeNUJASJEoDAFjmAPztr3/jwaR5zGsHPJtjoo7KXo8dFaFa9OVElVIAicovgaDIBDcwrGEOdzg6F1GC0kLMpCU0kbG0hZhfEuy446n2SUk2kyglGr8C0jjDZMhvhnOs4xZNag+NMBk+SrkbtZH3MikmW5LRM5FUgHOiG5PPXjCyVP5g6i1YVplctKwpUpTxFRgzDg//B8mKjxk1UawxCGjNMuUxbW8aGLsynQM2Kf4kq3gl6QhizmVcB2OSiuEYynsdIq/erRSHFRpNhh19Ojt/5aJooU4fYAHA6LqEzIto2zJjS6stHkECEkTKU5Rw34seSgCNPvURZUAdsIxE2IWQgXMrQjeMJZhnI10YGNBC3RTQly/d21OwL0DsYgvkHbR49QA2tk/4uCeMK+7mXO31Xi7mVRBhADXNKtQMCoA73NfcEd+S5ZsQ5OplOFDbs3vltfKhNIL3TUp3ynOUG0pTJDDT977jUgPGlE4ZW4lkOBMjZPC4t4aq/QRn82MPaNY74tOAGZkqbnGf9ttUKcjEfzBF/7m11KYfZxv5dtApslwr5yxGMYW83MIdfD8D5hvFWlxFwgd2iAc+JshkmqVy7YUKZ08hCyQa3syIbExjEkp4+dKhw0anH0EEc7NCL2AxtLnV7SNBYSkHyhKytImS6BgkSA7KbvbRrgmOdIgNX0QG9Z7RKbeEIBPQM5bbxx9dQSzwO+C5S1qAI1sGLxiEyZ5Uc3moRNGR5fqMAwNNvm6PIEj4u+WthQmMJ6HzNN/ydNgGtQTSDnvmkYC8tl4Nd46REZT3QOtdDzCexD4HcRjHs3yQnyFo3X9uyovW9X6Nvgwf40o/vqOT36NTRegVX8R5wQOQEOGHHfVRvjdHTmD87q1L7/t2IMyEvDsOYpKvf7/STunFAvk34ogPgL/4M6LvA7+tmA7P+wqMAa9bKL3wmYVgcLONkAcCLEBagj2NuIhSyAQrGD8mIiwlkIqCcyqxc4Liw8D4S750aApU6cA7oBgHQQrl4IgUVEEcZMEWbJgsYrHs6wV1qAEHuEAc1LEhjCwBbBhl0o8gLIEhLEIoPDsdbEIqrMJJeMIozELkw4QTtMIBJEItDEMxfKQIAAAh+QQJAwAPACwAAAAApQC6AAAE//DJSau9OOvNu/9gKI5kaTkoCgDG6r6pY850bY8pEBjGzv9AYGC4EggAqJtyyfykfMFoixdgSYnGgTHZ7HppKuiPBRiYBwQtIZ0+C7QvHdGl5X7veAxKzAO80WuBawMtfwRVhm5xQ1V+ZjJ5kXd7QlmCO2VHRwENjVUHAUZ/ZohmRy6NWQKQkq01DkGhgEWmDYVQBwctAQUGuis9Vbx+AmkrcGR0BKyuzSCwQG+ChIg7uka4BaE7vY29Pb1lQwIGb6KnRUYEq87tGrDfZWaDm+EC3IVWBvb4xHIBCQod+PbGkRYjOoihGcDMXTt4fRYa1MFDW8EAv470yWitgB8Wjf/ydbI4YBiyTS6kMXToDCKPYoMK3fuhTZyvFvr23eKFE8u4AQA8evRTE1godCkXNmT5RWeLhWnu/QK6gudHX9qEYCKnE1WViDvmAGggx9dRf6lgCmA6qSsgn/tk3bOWzxcosUWC6hRGBMvIKkC1DeGYAGijpGuWsgXjFKaWXsU2PeUTiuLRUebi5ovzMQGnzVU9Gkng+YC8OIBWLn5V4Fcgw0+NYYKCRUC8M6YKhgN8EKGRfUHjvLEHwHPrTB9TBVK82omDcGXWzO2RriIjWYAMBKTCN6yP68T+HKmJM469A8aL7ENW6HVzHGOMZaKuN9MwS1Ep9uBOxcqQXcH4YJT/HC/0tY0C+4gGgAKiUaVMYu858QNMVhRU1VRWAEBPWVTw98N/fYQ1hn7XiVKgHw0EZIsf2k14SkTLRciBAz6oxQt2vDRQ00z0fecdI9T9yIhllv2oX3gpBYBgV8V5NIQ2ZgDjRyBryXgBCn2MQlFeBRQ12jdS7Cfmf0AKE8yZfAEYpEzDdbLiClnpEFBkQJUDSBpWVuAARcUkBEcw/klDwFge/vePkEMWeug/RX6X0HWdJAVMROW8ABOeeT6w5zFrmPSnoQtJhkkfIHnXKCMamenJV3OQed2rZJbHIiK2JfARLYIwx9Sm0WkR1h+OonGKjx9yZyisYVXVF4GMBnho/5kgldVIQGUs+Mut0cX4Hq8SgVRIneXIdh2auyC6rFfIrjrbHICWVVV5yUImwEA3mdPIncs0x6taL5A0l7JoEluVUUSQGuSrPQmjbJGyltudC4DOa2twfb4gSL5sbXoEbkVYBS6QimZIqo/LdldyQswe1mqrACYqiwEMZqnFAQhN6d6uKZ0ikamE6OLqmX30mKyZ7w49ZMpbJhOiybN9eC9AA805cwEW2jwIS9yuQwu4jsx7BazlFohTwydzVuCQKqOcrqFlXWNGAROLl6107uy7Dl4vRekd0MkC+mqpLCI18D3nmI0IuqhEayCIHYJSkGl0IHOxrl/wmu09pT4V2P9+roIX4NhSJqdJMlKmBtRFh0GMtIFbsopPe1qnokW4ubriADqimMIoKWDyDTirQYY+E1qczVOpFr2ZjbTD1DEP4kR+pgG7tpF8ZA6n4NrL97pl7tJ6UJexkEVKmZhzSlQIKaJ8SAS6HuDzxZx+JxmXYprHnpNR94ccge09xZhkIJYnnmI+091pHuhbBzk2lgjyLSx1TGOc/lIyiAzhq0qT0NkwZFcnhnHufwCKlj5uVb+LIbANr1lI8qznmIGxji/tA9nRskCVNIQDX5R7BR0AADkCFYRzEtzPo9zFPhpe7Bx1qtox8IObg8xNayda1OK+A6hB7OCHL7nYHSSlMCr/XIRcQQvaqsawMUFo4iQXQcfpFkjDO6nCFIqAoMLKhDYhruFIf6Id3bqwKexQRSe66RDj2GYwXxjkNQjRXDqSeIwouSA/KxjEPNaYmmok7WzswkmUZneNTsWGekq4naX2t6OxCEZEQBAhyAxwQpSNkn5JbOICsZMOnUlnFPPYBEoGRqRFyeENJrkjdbTIBN8MzjZPIZSYihVG4GUCEJooz/B+cxo74eYU+9uaMpCXO90pzJVrA1lSHNSDCy5BlEa4C9GMoKNijSpEk6KZIxSIDpxQkxiKNIjuIqfNRgJFWJpQydmY9Y/+/MciunlZKCZ3g9tF01bwE0ADOuE0EZFB/4x2ioqDfnOZtHyrCJBMCjbReLpeKaQNXonhuH42pXkNpYP4IsANbrWzhBgBbuX6YBhTKdCriCIfGhFOScI1Uvlh7npI0mfucrcIgnUnlbTbqIBw+ApshGejhPDM5zrUPG5gz5ULLJ74cGfLg5wBLeNb4hlPckxkpLRpIaoI7chxFvERcwYmguVQ4QQiYjkNkBIhFYvSQb5y/KZqMXWiSKuAPuihQn/CSql/Oiem6BgyOuTQUO1M4ICDOAstdEQl0C4bP/blJXwm0mQyDylJvS2RFod1YudwhQx11TFNhcjSICDDUBLsCSHU2srsKtpMPuwvdfZEWVDvSQ1/NtGRbP9q5CZ8Jc6+CAoOnngWM7MkCknCiEolcOi8FrAJLDxqmR7CykQgg08H/rS9NRPfGTSKTbXyRm1R2FKo5PaCz8UKCirpZic3G4LbwQFB+ilEJ6g4Jh+0xk50pV9yrGfYzFKzZha+pkjlMY5hCSGMkQuoI4fot57odh1Zqg9VRSBeX2gEFEQJSBAFaRZ8DjAv+SAEUn7oyFjGl4bYTCZXr9BNJEZJsGCkT7WODBgKCoLFNE2DNT4Ss0FOQQzVulbo8LkxmUiYlZtAcbUiJ8mF5cR3tVRfA5X1vJ9to1K9yE0LeuuE5TrCFqOR8QdFGzfbQCdx8NVIIn1KB8xRBZdn5dD/VomQG1wWWRrDetbe2MUCXdzJNPgaQAjy4krRwKxgQ95PLuZjGsHy0s72lEldzNADc+QmNwCToEKo8s/k7Y+Gz5ps34SIK+npEUIeoJEf0jSHBYBimbS5SW4L2d+UeNlOPICpDu7ZBrNG+jA8lVsbTXTWa/7rf+/UB6bdoJsnatoDGaFWqcixnViQ6cF+QA8vZTXWzCaOK7Mbc1BZqVhGQSwi/JQuHJBIuMvB8H+l+gqUpCeXAYMyA7CoSgJ23CRkF4telUkAdMaWOnSkoi7DBrNh/xNfR/27kf7cWm/eeA51/BFtK2WUfByRNwJrYDNMHrZWv6beI1DL1JhQ3aBV/3kVFJd3jONwF2yXbhDfYKaWTc9cX1rWH2G1+m1PlCkHerL0SfOBJtSSmJpQlmJ4JWxgSQyryR77rZFKap7YxAzB52mYRG0JnrHZ6xHcZvMrjbHQP+OqD8J+gAXMu2EDZVZdULLKw+R1n4Q9jVKd68Tjwr1ZQcc77QgUF0FdTQOmwQaQHBGrWPBg1DpQwC9CwnXSiYXjRnHSh9g+zwpyWrr9NF99VYgU6BqqskEDhRkyYu+YvoNqJZlY2f3K1WslQBcjm5TqAJ2MgkF/DAMMF7kdw+T4MX3ysI0v7h3FuQzp5TcZHU5MdeU4iS44S3BjMOMyArMQZtfslWEZReAN2/9GywMh2GFGr4VyWxNfGuZ0O8M3S2NRtPYaE3dEGSB8xbEf0KFxYfID6rYAI2JqpJNiYpMLmgNNRiJdG3NCdzRm/wdSDhJ15FNUj8J8W9ILKFRBmHZXemIRnOADjlN/F2gXoXAACgAeveQfEBMSgwF92aIDDwYoE4I8rTVfK/hjkCceOwZHuJYhXyElIdFCcvFJDycBAzFsFyIaB2ALouVg6qZ6PWJm74IuP0AviuAUrBQ+CcEGB1RUATVOReVWa4VhR1Z+HDd6tyITlmZOFmAaMMRDjaCB2/WGoQeEI4KFSgY2p9cHaxAXwlVtsIYbiFRLbYCHKhd3joY7viJ9NAb/QiG0AoVogxPgJHzAIrZiehhYKcYmBE0lNiByHOPTJZA1DevgBk2kUdxkUo7FX4vkf3pVMMDzFQ3GQ6KRYaz4AGH4LkJkG8emD7hwDS2yJvTGeWEyH9ARYK4EVoOgia8Bd4Wje3qlZkv1h8yYE1h2fsJyOnQGho53TBZoenRRBc8Hc6aiKkHgJRKVEdIBMERHEZl2QCA1cylYFXLHGX4IG5YhSBThGZl1QBn1cOMAEIfzBgZgC2FCF/ewJIPkj7HAQ1xiiXdDYiKSKIZlQLOwUFAEa0RAD4JDdxQUVKoiIJUWgBWEfDYYcfeQFYXUgyAodmNiUBdIKMAQhpGhhUWj/1wvYk2TZHnyoD425VYvIEtZGWFedyaQ4UjmQDPGNwF9RFjM+HVAoG4WCAVic5Is0CVH4TbYhV9OI5XdpGalmBqW8oknd10eZxDE9iNiMm5ZGXp0hj9hQ3NqSQUgKCdAYynwSB9IOC+AMSjqkhUkkzqRpIm2NCjZglX9RnewVjywgSxAg2kogX4lxArYkhAE5C1ScJQFAJIjckVcEYg3UQYRQQhToITAkRYel4WIhE12+C0o5FZYoFhzYCKlIGmRKVd16ZEZuUcPcD3kBEyjFQTOd31K8xS7GXwvsZz3IVdb84RIoUd6eEeycEvl5VziZzbjEzDRqROmQCs1dzMGRv8N1MVOUYBKbClIqsIi34h1wwFR/RBgBbFyiWQA5fhcZ8BvFcRo5MZmW8lNgOFhaRktgMVdfPdkmjKWjdBDFIVepwdjODUGOVUOlAEWeeEZDskpcRcAdqApoiShKXRoOjpcuORLpNkb99U8QMSN49FwAWCCWtdZ6wA5hjQeRikQ11cOKspKCQcMCPGMzyc+yqADvkI5EXdCuqN9iDANwzJDsnQOsrNrHPId8hSCJ1U7UzIWwCAaDIZe6halcxg0s8IusoAFcDOOVlUnOaQp1Zkf6nAIR7ohQqhPWMkoX1Qoz0OWh1qQ6/cAHMaky4aKa4kT28GTIhRA2aVLPncvmmP/EQUwqGYpD2SqBlImHmLhalP4So5Td+NyJhnCfRX0a8uwnxuUEb0TBUepbKnEGQdDHTClHcxyU6FgAKhKAZ0VU9KRHV6WO55JUK9JK96IMHcHgPA1OQYWVrdKlP+ZC1WwhOjFGdgGnsSgZ7RShgOJAyb4XHaVQrukPOOUMyWJJkQYKFxRQgwhlt6DDU/6CWDSmK8JckChfMegHezWrBZgCK0VUBLqILBCWJZAk2gxpLbKkxOEmNPwrOphUxMZateCp3+VJQcDTEdxHKnQJMVxAOHleeOzUC3bKgpBcC0nsH26JumyD362eImFWXBEc91goi2iisjmkqE3oIRQBEMh/wz3MHEFsAB4hUBuhQYREXemk7M3CVnyZ36OuSUm4nmB0Cvxg1Lf0JjBFaUWCmBX1qcf4SQp0SXzArOcZQhZKR266nTxSX0VAhv6ukpUowmSBLFUEhnJdHQX+JjCWlGT8pvAgRL9kxYQlQA1cEZrtRAZVVvoaq9J80eayh3yElM4SiVoMG3kQA0z5ojLiqeAFgTk4Gk7e0VwQDUYcbk2A4xo0CCMQpiea1UE+mFa8RJ8Oy+aZUZYSwol0aBhQq6xqxXoCn+WxFHTNijA0RpV5UZvlDevFB44S4W0UFAIl2BUE3IIYRomZC+guUAfM5u51TsVO0J/i58OuQ7hcAAO+/8OBzRih/agkwRHjZaOpYAo6aUdp0O882pGxjAoG7VV3Alj/ylDohWG1CB6V9SqtmEDzxqt63uCCuS9hcNCeYUyp8l8b3jAhsUCSOoYKNUxQaSDOPGriwok3mlhmMNDs2AMGjw3UeIYDPRA42g4YjhskyZ9DiYK2Fq60uHBvplIahvDEdxxg0RCKHMAEqHDr8BK/jsLyOO597Zj9jYXonWyoUcGyACtFEKl5mW0PKBuv8of4EEbx8QINLPEQKHBBQBNwRgepWBtedW3PLQTCNM9xzEGTcuqvlgnmxNyF6huX7M35FsIHkFdGKFZ+2MDuXDFyHO67XWmvQHAOUt6gof/MPtAMz+Qb06ISEe2d8RQetyZqR9mW1/Rfsj3Lwt3yTUwEGqRPlJGesKpe1zLX+i3oZMWbTojP2iMBld0RSH3xMEbwWZjFvlWMzXyoDZgrMaUSI6hZN0rUvHZYFwlMipkRv4aPyDUMU/6zLM3jqvEmphpyHaYv3pgT2dxOMerS1FkNslzFi0ja95SGf6kxdNQLVIqJZLRvDv4nyNDyqF3deeFWcDGWWcxcTMRP6nhGwF8exarwkChTqDWH7PHXbaRWBbCTR4ZJ7O5g/D7yC5gaWb8cppTEDSQahR9mdq7h97mD/11OLsRV/5TKSGYukckHgPtM4ub0FfAHYvgNpNM/129+QfyrCeECNCmc0eRVUvAXJo+pF22+s9cQTzrJzfktErA6jhnts52uZsEMKtD1DWPYAIAl8clkXUMDEz+EFBG5gap0FfSUibKp2q6ugz7Azo96IhAPbxg45IsmqH+ZoVRDYaTTADllFnRGllnVSkomDNAhp9JBrbylMQ8nBjiAbl1tbhjk9RwibQ0RU4xHSXwkRpWPDNqEaGGYGGZ/Zrc+hjb01c1chCU6kZpYGCSXa4StrqVqM7fiC7dUNG1xUFv/Qx6FNPa530TxzH/h2HCccN7J8HvUy9wULiXshDXmW/iUxdk/Yaw/DUAs0zUpDeswqgOu593JNespiGCgv+sHCMXDEqs6Iyar2JpTlonMmmHlnq6kSHZBG201lDGjyzBLZ1bXXMu8N0B8p0GNVgQ+CHZeWMK9sS1+yQTRduzgwFmKDkpMQUABX5Ez9g9D1wZSd142QfQXWOtjqYrKHA+nYIZbUA1emvbxwR16gjiDbZSO2Arv1G+p8xQSorghLDiX6eD13DWUsBLYUEc1nRttIIZDYECsObBxpBLPI7gOsldOcNp01kflAggg4tM0pcaEHI7wjSU/NyYu5mbS3le1GHlBIiujocQsIBoiXYGjBXng5LHA9J0Y2vmuHMjaxMMdNvRYwOU6xDcIdrjfyvlQJARmM6zm4myvHHDYrP/pnE6X1aUoZT9wW8AwbKyffbqeEUbMP+dwkcRH0tcJXAuZhaUYF/nvJveeJOSLKs52nhBJDpuQmZcM8LIbrAExivH5x9RomSiUrbim6dxweWI4hKgEi3gEc/WmEdp58Nbfgyz15pUirVBW6Seo01LhQC8IPEAvjmDjERcLeIKx32BaUjGKSjkmqc7BQHFE+msEe5miybHU463T6gCrdOgQhWcGh3ej0IFeXc9cCBxU0bN6WuizTwJTevACgaWY6ebj7Rxfbx+ga83iaP3nqogQlDocpzI4UcqrQtr5FppjGWOHIfjGc9DhK+C4QJfe5Hh8TXjRsad6dcA7ifJk3HM/2sRH4o9tsn2lajWayfFsWFY/cfYTWGxOKR1JFhIZbUagu0SUOFG59OmneConTC35YEysaqJJh6HbCG+1oVYT1ZUSHHNKZejTMonN3AXrRoT4HLTJqUiZ5TtV9gHszLS92O4+hpQlFpXebpdglmzulFIxbXO7nPF+j4gk03k4Bq13hBXeVGYMFwh+WBYFJIVazT9IXeAzuFXeerSA2Pep9l6OEoh7EMDkKJcPSTkYU0VUraDsuV/EEJUX/R1jvRKbSQc+46x33LXxJ/kJmVTYQyxGb55md15dUMLsme1GgyQY7NCvcBLsSeBQQfPZvhUr/q0ofTjAuTV1ka0ZrUf+f+M3dKQ3rtIFNcvgIGsCQdPEBBMOAUAc2UGghAhdB6yfIQBQwciCIBBMGa6no8stKcd2LSJ6zLsXFaEGOszUIIMhVlAmUIJjClXKDasEr0TY6LgCtIuHEDCEDL+mB8AATAykTrvjyzDxPBqmwMcNhuyqDMOHi6MDpRFLSuPJSsXqDUtuBe+AC2jRy42DSKLDoMEl9PTIB+JA0YDvpzIGLm6EgcUEKOoxkIJXxoc152owoxTmJjBta2qmJcqqxqrqYuUO6shaxivoqEXH7AQMVRyCXBBqwTGkBC4GLraW6bJyT2BjeGbGeUdso1jNtjA2VvBhxG3Jixk3HmGxQgRdo7/uFG6UwpVkBdkMFCoUurQHThy4NW6kwJRDpP5gNnDR2zYOkfKMuH6gITdpZpyLGXzcfCKw4hCvFCwpybjPyHGKEiJoWbgqyVxDNQyIc+ZBguNaLSsgSNHn3ypkMWI1QFftzdM0qr1oaNIw29krwg8CIbIDEYHTPkrc+xFghUAWkXb407AyHglfbR6BgDKryiRDQTj108jO20RzZjE5iuTBJPbGt/JJgfiJG5EAoy6p6BYuW8UseWJ0iRAC8QkqxwQotYMIRuBYoWFjHkhZmmLwL3Yo0KPW2sRGWl7+E31kDGMEvD2DPtb80ywaE6bSrWqDkse7klmv3XyPsJ/inXS/4oZLBAzMjZJtGRvLkpuULtuNZQsIkeVVb4DZUGQWkghN6oE8mCAjPYxRyV9GOHqnwkgmcY5dvDxx5w+otmmv1e02eIKLyaxbognGjPqQMg+MsjEaZaQojzzznuEOQKZGIYrr4Rpr6wfYQBlK6FOgk4GXly5piyhvBkKCu1MIYZEMF48CJbpPvgGQqpuCSyDAriDhasdKjHSBmHmwRG/2NY7BD0hpXAks8xCGSq2x1AopUtilgOyMEiiawcJAwgwgEyqppPBzU22cO9ILJV8CZtYoqmwhlDwMqTEAWZYsRFFenrrT0p6S0MoDo3pcgwW3kAtR9MEOKDHMrUYdZF5/P+4tAd2/kDjnpnW+wWsDrusstIJgvVpWkjs8ibGTNLILsF/VKNgHSX0eKGmVx7lNULCrhmjiteEXaks96zDC0ZDwNiqDyDypdCSUjfBkS56hZCgAUGYIPiiCsXyAQqH5tEkkrZ2PTceExXKj6x4fyCkLlDZ8OxXQpU6Sd89k/1mEG+6Ww1LJgrIlAfYOHAhGSXbohCGDw4oFdIezUTmjI00HaglNjuFMwSk0AhaxCaV1rC6aWH07gmWByiggY9H1Gho+kqGeA2JJ44nGSxafWvLI/9Yx4+hj7IO1i3zDQXpxk4GJ2W/qMar5b0OxMgc5vCS4QABcdXZXLHH9uQJMCj/TLqfTTGGk1uz3nYpXU/p9im2jA4BtIF1mQgA65h7wSqcAXjrpBo4wE7cPHAd48CKl7PGcPb4ENT9GVF5QK+b6l6pBwiB0XY5vNVWsfdvZx2La7JQ4mJ059d7HSQLCsdAJEF3wyKNSeZ68sWsDO69R4WJ0JgXqWIqqXRSrYPmNm6hFwIWjgvCrr4OMwXfd+ETbShWPWAIRrp0N4jAiQwmuhaMNNALMgQCSx0Zww++I6IzhI91SEiZrQh3AJ4lzmcMeUzo+pUKBQJHCCtYFuDkJTP6AQ1vQBqfS9LUOBBUcERoQ9B3gKUWaxTGUYvZX8/sYwEzlERrQ3LJDzjhlz5c//BTI4redwj1sRlUAiUp0GHImJRB5aUGF/tona5CWL2bOGMwPelCGWDWrQFahxdTNBQKMbjEk1xEOKhzXCpqCKSnTGAwAkLJQmpFOMQV0TwOoILjroENjynPJW6EGfiuEUU/XsSNbTsLJdOUqcAcBWiAK1/ghFAwZqjqfEowh/4UGSl2mHAVioGMiMD3mx98gnuTjCJe2JcxHLjMEBPaSC/slUFQXSBN2TAI8CKhq9SdsYg+K4zAmHmISoJFI4aI1SxlchbbMS0yLoPCtlaALE1qTWDjo0AwwtPMhiABkdJUJCOnRAq70E1WO4wMX9QHM1UBD3J2JIPLvDLBc3LLH//iK8RyolCBHMiRDwX7wENfmTjMNFNVzuDLhYr5xpZcy5/cvAsMswgFiCYCZxxUZy2z1h2IZosLQspBGUF4UbGZ6Zz7aYuuRqHJUt6nPQ9xqEoqIUxybuwSWyjdhWJWhgM0oHECGEUnWpGWNSQSp+eyZ2B+6JFYrPONm3xc3VB4u3t1ghq7vEgV0eaZNKkuBTjw0jKEhAFXbpVXRejC95RJGhTiq3xNVM6opPNAUZ6GJjSLoqEmmTaAbkZXyeSAEhaRV70a8UNrkKdSQKIsY3Koo74s1CPkpAUgImEeW+uld55qwMD5R3dCVMFNMyvCoKBgNQwsCWr8Rsmh+eGXioX/BOUks8OkIVecSoXFYONAGzPetnr2JE0DdPmTm3XypYUCaiaJ5rbXfPdutuzeDQqglYt1RhBLyCo9pWuLRN2IBc5kqVjrKKqkte2t7Nsmab8rn75IoADbCWvHhLReRsnAve8tQSNYqBZdWWm+GjlGMfmJMCwyzYX9BVVfzFBLYKR0SqCSgxoi0QIrLJjBDfbQJuTpL77q56PK7ac/F9ot0howwJVU5zASQOCL9WEwqWtFTTKi4hU3OBlacBl1GGHdtcXmuMb8W4/L0cQadq9ok9njfvaWEiDQZAhITjIJfDaPdUgIdCtEgil/WWXHiky4CmUTFo2VReHAJVBkWRln//E3hzJf9BZhWtFMtDRTZ9irxx7GL0E1xqR84IsrBJ6SFislGIrKIcWBxumZ09IQA1hXaYlaCDkwyehM8vBxvcvHumgAhUZoUXC6ynQRyMzpqoBLDkxJAwIDigzvStmUmCzrHdEaCN6khGV6UJtg/EwFQONarw6OjtXOm6zO8FopsaKwrNwoQJW0JK6U0QNdK2MDWWzj1tKm2EFCcG3SAAY1ojNGEYTLbWYNK9wbSNN2RKyVG2oqxEKkggPWzW7FoVZ0d6iAx9gwhuxEBLRMbM+GLoVsEc86Q+gVzkptjXAG+yy3KVDHaRhngXKkjD3FKG8KBzUvQQGIy8toJ4JB8P8OkK9YHhJHQQV8wgK2/bGA3B2pseIK61INajpcROgN/NVxWfDh4DnnFSM95LC3sJCqXjoFL97zkj58UoIGtQQr4KUPGNfL5lWYOtW5uuQw5YqLVusavsrdJlhHQwx6S2K50dGVYJBFmDVdAs7djmurg6uRZWsMlAXjL5QWzcsvT+BXnkCZ4BRQOCeeR9sPj1tmpLEF3lwNJbIiu2B84SROKYi17f2e19/r6ytVi8E/n3MHgGBBeDDH1sVCGNUpHPOwr8dk8o72+HClAzXp/O0Pn3ubJMo0MXCf4PqANWXSgPUbB0vA/V52qrkpJ7V3/u1vIQlQ1ApVLMPA8bI/A6nD4pMyzGL9fdYTV8Kr9jDl5//58/CJgui9k9oPLaIMVhAEZiG3JNoKmtA/2+M/CPS/XICI6NA9wWmJ4QuEyWMbPRi8/HNACAxB/qkJj+mcoCCNktoGfGGqhjqaJlCtBxRBGbSFKUCPhaIPgWgIbsCQTMgJm/C8GZQ2/0MzyQssZimaK/DBBwHCIAQ5g/PBHESrJGIEH1yCGGxCLMypE1NChcuoFxy/w7jCLBzD1zG4BqxCNBwAgxNDMmzDzFpDOHTDi4oAACH5BAkDAA8ALAAAAAClALoAAAT/8MlJq7046827/2AojmRpOSigrmwrAKhjznRth7EaBEbvH71CwTD09QIAgRJ1azqfnhygB6T+jFhj1ZdcyqDgMA3FGxYO6J5KORgI2nCCnKDUXbkAN1PM72scQWdHSm9zcwBIA3ICBgFvcG0CcohZKnp+mH0oQlsGeXIDlnAvai8ABQ0GL4kDAQVJkXVGSG8CX5m4NYBoVYWGdJ5KPD0JQIxorwIBVQUJBUgBbrRuU2qwA3u52h+bacGKBAPPwoIqRAdniWXJrufOKkDoeWymR7B0t9v6Fw48VdGGlDVwxIiIo1Y72iVphCZPuzNA4DULpiqWnW/49mmUAIiLpEKh/3YYOPBJRbJWRxIEE6JyoQ9njkamUZEq2A4WpRRh26it37Akizy5MSJqR8RqVhai8vQTwDsBnBq92CKEYD1P9/LxFONgypA1oAKkesMDUcSCQIZhceksy9kh70JpeRWqjg4knwho3dokRVlFlpSNPKjMH90pnTyVqpbYyAu4K9UYaDlAch4792zxddL175xnl+09RnW2DN4u9MqoalFqZNUVhPC+SHV2xU2gejfr8mkJlICI0uwJKUKLCyRIp4QItdhl+L/bJMkOOXCQlo7e4fbq5rbC0xxSaqQNUQ07lJlGlHwMV38Er3gijURipa6k0Xgl40whApt7Ow7Y98hlH/9BrhRxDRxeBXFOEUXAxx4WxN3FQ1mMPIOVMs/ghVcwkmTkHwcpgPXCI93RJ9dJ4chynoMPZgFhJdQgYl0DyjVnhBBJ3NbhTh9m0NUUuDHyiWCuhbZcekQoR4VI/yg4nlrrHGHQGiO28gxlpxxRjoDTyKFdjz9OsSN6tSSJXmUNqgZfg2syqB6bLr44WB1MrtGGjGeFkiNG/fU4QZhVhtOIZKIRAAA6N6qnppSVwAdlO2olmpAPw+jYBo5vnCLhPX2CCaQiptxZzU+jqCUIpeuphSSlcSbIooJWzBLfaV/ht6R+uA3gJws6TeFIOKoOiZScRmXIanyDHltppXGKFKn/hsLZVOw8E+alq3+8xohVcAWAhCSDi/rqqGryJdsepZEqdi6zgyxrExA1xngTOAJsZ04e1Ey4Q6aN3Dnhq8qpOuijjK7lqLnOohqwrEwlNBoa1mFlDb2bdfcJSgPOo8YwblaaloFpQYksU4SeOzB70MxKroIruKEcjQfBd1WHdGzlgDL7kVgGdUaOF6uC6b5ibnrDnjJpFv8OnLB9x0qZI3VbDltfMHNcuw+gMsKSIL5Bx9kkUZVUahKQIs8i30+MJpQuey09Fqkdv3p5tSmZVovmkXK+CvYdrFbThZgsCJy22ioXzKqFr3UhZQIEhTfHl3zc3LIpoLmSCJGKRonu/9pDq5tEEq/8/fkaTFGCRLKmI83xK1V91cXOqhiqhiGQg3EzKUM6SRjnI7lYoHxH/RRNDyMWJAuA+MaY+qQXMVtp6x5B5cNH1dDcaR84USl2LRznXdWN5RJhzoVCZUpl1moDYAgltjFs7sjsogex6CzQbLUmqPndxjB1+4w00KgSCY7WAItagCMcdEDQ6MQUCzfQQVz3IhkW0FawQ9HFPFiZ1+P80BU2nO1zxJPRseBkmR9E6hFt+EUKF3FASIRDfas4UGWAZA59Lc1w4aub+OpHu8h1QS6IqJWABjWchwTiJyRJSkXysghCCEZxyDvgI+jmRMCo7V8iGVWyiFMrzP8BR0jWq90YCOErJPWMRUpi2R0o5AvfFGQ/bLwQIwhiJ1DVAhEvQNBttMiutUWjFYgyyEcct4gwdHCBsNrT2hjkJhNeqGqGwsnp7rUQ2BDqOmx44ORAlTIbJu1si5FJnh4olR4+oYPEu5NMhOIqeKWxQVVAFHZEhTvMuIR0qphay/T0qRTVTxKV2VgWUdeOLQahbaIKJhMJAAXSlUcs5TMTe0ionC20sCwrIMn4usMh4uEOEm8YVB2maBclvNBX+lJXCQPxFFV+jhYB4YxUapgEeZBDPa40w+qq0AVQbBNI2qThP6uHOxSGc3KfS9G2/IkeZKFzQPgEjp7YiB252cD/AeNBSADrM55GwmkZaTAnHTbkt3q2oDgZXAwr3CAMKq2iIuN8xCSuqDSmFdNBHRrfHa13vxlYQ1OuygOLGuOW2WnyKG806TtxyU2XkHN80agHGQ16jfY1zBXDgtCvMCa6A16PBP1YzSAp9RhYramo39AT6kC4n/i0oKQ/7YEq0QMkWbD0m3ryRWHINkxjzQVfBR2KV5lJA+okBBY/cVuc2ASROpblJnQtqUBbgxXAzS5GbCAgLeySy7we0DZ8NNmbEmEnUNDFlCXox0W0trFpxsk1JLFi79qKE/LJgiIpxWQcUtQKYWzrXix1aalIdrSbsug6TDTqHGagTYy5pyCJ/2JGJ9LwR/AQ6l+UnOE/48oDFILzMsi1y2XoxstHVGtQ6aHmIET6wtiiVgS1Qdw3VOPR73lDY4oR2+lOQz5oOVU/B/AuS/V4k/p0tx5VLa0IzxY+NanPjZfyjiFKwDj8WEiQ1XgGnBrUDBORgmdrlaw1QkjZ+pjUu7Wox2arEYlf6sdbkzoscThWlkME4xTGeO8H0BENANTkDOOwnN6ke4C4FIRZ8KBrZeO63dUIJZUtxowcYXM88VIpEp1MmosOpL/qGaKnHqDMOmYiPVgpaRhF9mbCnuS3SQ5Uybdk4EiU52a63YuMHFqFhqZRmGQdLWy5hFgkgOBVMZ4ANK9rBv874HVWJwG5cST5ZEP3Q0N91ZWy5qjDAUJC5cy+s3wsLgwoQWO+9Bj3YFQAnVDkMASehsCw1VJGhQ+1BapUs22C2cI2T1fZgLYGL6EjXncBWU4Bw/HGpluV/9IqoWcpy3W5GsmDNxiFgZRLIVDphBnSWIyKLIMhElSnxEY8H4mND4j6o0cVxbWhG330hKCaYPwolSeLCCGMH7DGs/AyELOeBw1tEyDaeN1QexQ82TQkMTx2wBxChORw6yEqpZIXknQyik3dfWF4Wv2LKMzT2h4xohWqWWRjHAqAoSPPsqplQ3MXRJm+KsBdXfpSf5OQKFsdxfIstLLGapwip6X2Bkr/w8/yNcDW2yZCt00iy+tmmQtNkYw2kzGOEbsCVxdhGIPQkcZS0ONA2LXPhfFpgF71Cz5eBfMFKovfXDqI0TdKc32YkeyvyKfJnkv4JPWDxaP57C6+ozLNxauzhPA8SRz2jjKha72vVqAreODX+xhd626XNQiGLdndueDW1joLNO1hzRX/PAsaOpGATsRVi6V0arMS4NusXaYYJee0RzhoOnybyclRNatRnc7uGdKXhjkhcbre0VSV+HTyqDzz8ih0VsQpKrrBQbx4+ohETyzfMpSzonMsIDq9aw+kxNV5ZAmQCrwgty3Fr7VdxpDwqtxsLMibycp83lTloksm5aBc/4vyw/alw0o3BXfnYHLUhXjOM3rfE3HeIBWRoHPjk1ZVw3c3VmC+NQ9kVB6e9XADsmxEUTUI4l5CZwEFxDg69Rsd1Tu4l2ag4w3VZDY7IF+BsErhgRzqdFg05wZmh1yClzOn52K75HuHp0bW4nUiWEj/tz+ZxzNOgXi9w2iW52NtcmGkxyaB1DuhwiWwxXmZNlGckoGyoXrKM3g4Y04PJ2QAlBZiklRY2HH8gC84MhkUQYC1VnJI8EoqlShAJinfoAzIUHpyISQ1uEsBMQjU0IcvVTwZCBuTwHprAilqYAzhoT86xhG10BKzVWYK0glLFwBtEX5Zk2FdJw/LYIGocP9mP7RTLvFH4ORVDBRD+dNpVoYa1BM/GuYJSmIWsRVDhXYC5oUs0fFtTogF31dPKrEkimFyNFh1uEdAEMEhKeRCD2gOu3UcoLAaBcZLm/WD5VFHQcQsVIh5OkV9sVM1vkgNkYAj4sAM3FcEuveJgyF2qzETU7JKzdEQuaItTlNAnQUOmHVOlEYn0xBcLlYYJGIQhoMq0cEpBFB9E/Z4JiaIkXF75zASxRATXHcGD1UWq1RM6fc5mLIj1oWGGRKQOkgvdSUqBJQts1hApsBnGdY0REQdOgEJ/Xc982Ax1sFhiceCu3cOA5AY5oAo7pgWU1FKvqROmjJ2QAJlT/VDBMn/RtqigVbGCqaGMllgRYkgPr34J4DFd3vCSGdleZPBjgUhNKowhUkBHkPyRDx3E7LRHWoBTiIpUrhCRntEIm/VjfP2LK12iJ+TY99BAV2xPxh4GalwHitih7TGfdrkIBF4LHA4kJCVXqU4cQXUDmwQCaCgJ6BCc+HVfJHljWqCfFqyHF7HcQ9pieHQarSomEkSSy3hibGihgmXX3cnDNMgQqKIkPsmCilpjXTzQng5OXaBTT0ITM4mk7GDEopTEav5ACVhXk1JkXtYlmnpDIF0KlaFTpbzBkIkI+tQIwvUPLSYPAbUiA8mL59zR+xTPy2WGmvGeYNCaLyUZLLHEfhi/wAvJCpyUk3FSGuBMB3R5yzLslRGgk1lKGBRaQ3AZEBV0kt7VUBy6QLNZyeUQIBFdZQ6ABymdDNyUReMQBZmpgUt4RTM8CCc4AjQ4A9QxC9+A0bfkXqnV5luBB4kmpOHCXi0mGJWxi9dNwvnUUuBZX0380CVgRAcpYfEl4ypgnL0oWRC8RdzhE1ptZkwkA8ogDOrpklnIijTdp+JdVeL2FTBkYCM1S3kFSNpJwF5AUPiEJgPIZaWhwzrISsh1VogCQsjI6E5WTudIWEItkISBgzQUB64skcWihDskiWnmWJVI1duOCS7SB+WsyLnUQwqUAyNFCn0qCrKZB6mYZW1kP8NPqIpUkQPgPENApVitnEaweJY7gMhF3OS2fYLzASihhJgXrEnm/gDPtlt48Is9BgExWEj70lLMMANyzGBOgimOzJ/r0oUMtSNTfMxicQ+UzNYWyoJ3RWjeohPmJiRaXI0BwgazkkKWfQ6l2FojwedTUReXepEFicbDzhzVJpVrzViz9lGeqGrO/QWLlIFdfqHJAQ8ioGu42B/j3UZ0cADI9BB/qhWZHEQI5Uk60qjBLlNwbGv1For3+avWwqth7IC3ccmF0lrGfk+yRIRO4RVLmMhI6oMpOCuSVg1dQUMrOV1EBo46PE2Q+GxO5MguiSyhUk86HV5jUYE34cEvPD/h8zJSA7Bp2mxGkoaADbLDyu0CATBankRrSopnjj4qlzDOz5Din1IEIVmMU0JkrDJfSfKC0mnb2oRD3SxWYalf6cwFTOALyD4rPP6kjGWLm2WNSpyOJ4aOrgBDP4qon8DRjEIH3ardPNhpwsTVyqYS0MwFAUmO0JzADPgAFubWXIwbCjhM+VaP7GoPQkZKeroVTP7ZYBVk3SCBQabp+hgp6M1KwvSMEZCNSU7GTXAXnd1J/khQiGUgwY1IjmTKFICS7sIIAHGU5lVWTV3VgyYlumHMiIzHONgSUYBFIfSkKBLA75QF3mFquHQQAk0f2WaIweBvC/iD9HxRFPBXv0J/0QcGa4OQpaWS0LkJxMsShFOWxLqs6xj8LXjCJ1UhEfHaR3XEWtDxLKBsIvIGR1fZns6QLO9ib3+K7eSKSFFIgADsT+pBhhkkbV/sJlEoQikJrbOQn7vuSm+RUReY8E3hsEBQQpJBV7RxRKSCMJHtHJWgB8awwMJUBL7c1EM5MDgABz6Sq1EgxPGICCXyyoNIQ0FpMPfEYieA10eVZYYSa7eG6SCYGBldSh/hC8AcFEvwEIs5bWfiRoX+lZ7hlgeK45vpARn8QtTRAfGA11U0I4XWSFPG0gN2B5nYZ8ZusYj5cb+eGUEcFpkep75s5n5sgZBw1ipxj9H2bg5BUxSIf/IruG9EHMMUIsHLBdEsbWL8gVMd3JRKxRchcAzjDq2e7mX82KaLSJtvqJpFjuB/BdgvgzGZmIGpyxKWPkkdUsSBGAMOKOZKWIobgxMXGMJVcw5o4fLQTSlvYxqZVclWgzK/Ke9BFKiVFDIMuEcZjWMDfHMMLU101wvNeBeA2YiGMoareJsC2sq3WfDyfMd8Oob5YwYbtfL8RClcmu58sYk/FnFRYOObVzPD4ZCDAwUmMy8+sx2piMdM4i6RnFJ1BBgadch0haygsx9TxjEdprKKuPQT1Rx6zUPKowBDpDEKMyZk/A6Yeiq74ssf7kovqMcjFch0+YbijButNA9Kp3/fsfgHOVKOFcAXESym5cQus78eqMAGKwlNm/1o8G1WSsjKw2yx0HbeNULQUaSorFkcmUMLt2TKGPDuROSKcJAA5f1uHZUsVb1swVJN9aRGBsGHyV1DIsbrz+FGiqavR+WkS69OQ0hGOYTsnGMwGA1ibyy06CzukhxqLpMWm8yoFuAiReyhr9wO3kUjXfjhIyNY0+rJNEHjK1WfYJcQFdNApHFdjBqxMtLgRw9bg7hgR61kOFMCg5EO5j8QHOEh+EXUogBwqci1U7IK2/0Ffda03/STU72ZBcjwYpYS9hEUg6hNx5YvzQznAiEDfyYlkfWzszQNuuMeSPzILDHwxMV/x/eNdE4QGq/gRmSoMChdz4JdlLkQ29ZgMyajEL8AQ4S2wo44dG4B7fgR64uMmOR+zRsvDEyhN2GSGnwtFvl6deyiCuz5aipQl/nMCLQJoI6IbFigiwkKk1mEtnJIcRd92euubBtRSGQkLUdgdE6WggyVRccMiq57FIt46hzwWODbAom5xRhWjO3U0KNc1autEqPwXVCLFrsYRKXEz4b3gGAwET00KWfZT6b+VKnIVz6YSVpCitpoCeE5mWgQM1T/jlKKhhvOx3KeMgYt28bIyQZzrYHohk2LbpthBzdwkL+BJg9Kl7eVJ5Qgbqv9eSgvUy5UZiz/CkxKZYTsRBPm//HYE6JGLIWha4VKOBCnQkHknqSgHw8BXnklGY0WAkhs2mxsYtAme5pJhFN3juMmjoVVPEmTxInc5SZIkM2LpXqq9dC1/BygBwJ4cy5LjBOAtJUijXYkptEmM0pLS4BZY6LzxC0m7htzu2YUF3sZC0tB6FW4abbEBoqnWlO5sNbwDDtMJfL7lkp4dQYN0fMciUkz5reX3ANktFqRPKCwOp2r/3r70N621Qm7CZcD+hdztpA5gMOJ+dwa6hnqhvWpXDFLMIsnBaIoUAvNaOfJuwVdHTMjHUWogS1+ce79mFy9opBy1HxWxsQV1ZaQXneB1ZlLamByLlFHugP0uZw4gz/Sbeg6ej0RWtClMdEH4hxpzwJ1FgveQZE8e2LqwyVkyJ4CvRSUGwl4Ee+L1ZCkUgTDwadQogASTzyAB1UZmWk5zyJzNDsGu42q+VSGgt1oymWdhYBauXIwynCljGGPCd1F/OQDgaxbw1iJCNSqMDU9B/mgzjvJqZcGmU8g4B2mjCVRxmc1gP2VH2I0Vnow0wp64m61NoGEfKhT/Yn5HsLSfQ8ASeoE3qugsN9GIjHCR5IwZkYn7sFyHWVgVjWj6mX/CyzH1G25qKDg5rIMDyGxLlfH9GKkz6vak5iBUTG8MAPJxHBO950n5uJsy4ZGMZDL5XVBuFX5JZ85Gw5G340/7doUNSCPrFxb4nHhzrTz0gQUMwxQICTpTHFTyMIq+sCJMAChkFwX7ZkB8B4hSAYCELgUpYolBO0UsfXURlQ/QaBQ+DD4Ww6mdXv4uT1eo5HOOywtKqf4qmznhoSBYsvQz14NpKcSvnTz0wtsyKWmpWYHZ8NQUI9JBymOKWjRwAmFw8RqxGqiQTIGI6iLoEesdIUFw4KkbQNiswJCpUpuw8pkqxJDBJQv0IamxYXIJ4nu7IYE8i8pGXhyJxHHLzNTauEg5cDAAIal50eFrDSMUuqlAqzVKq2upUaCVoqKBtvlKM5Exigne4ZbqMO00b1OJXsQjMakRSmyGPByit4mP8S0NPlo9K3bQLEjXOwpYKsQmpcFaCQCt+FOiQfgjg1gI8FcyWS0ItR5mDKEaO+mTmlMNqzaAcZVlITsMrRAiIaaLOApUaUUF4EjBPTsSW3ijSipCS5juUWnGvEIll0ruQRQDWc1RjRpkjUhGvP9aRU0GA+j3HoUBvCQWmBhBTkwNkZjqqYOIPeobNYBykdwRceOk6qBFWkDTBXYE3Gl+JOb2ppTPqYpvQSn6ueNEh6RpOQKwZazHuKjscojYfJrbC4RgcBDCXZmIzlAlOqzJF8lBZwdrm3ZGQPfSNG6FelhkoATjKRi8ijBn5BwNY0oUCJU1cCDPQCQPduYUcr/eD/CrvOHHcqzX+sm57/8h9+yEGLFrroIi0SKrFIhWYKYsgySYZiopjjopAiExEocGlCAmDZDJwBNtJNH/2aGO6K1mBJyjiShDsihO74S6GWdaahZ5csbCBEqF/ogmTHg3KRUIQ47kjqjr42SaE4YbTB6Iv3xnixg33esdCoM1okYTBzzqGohlywvIOJDnhia4uhGLqxoewoWa+7hU64KCDYbBSPCo9w+I+YUUTUrSMB8NhMz6Qwgcc15G5p4xEtUKmgTiWlGPAjbZabS88VlnlGRiEjPOKSImwplC8hjpOxOT6+wc3PEZ9TzC9pakSqxUpR2oDRys55RRUiOyBTx112/1mPSEfKCAGS0qBZ4iVfiwzh0AEvIe8jUGorg5tR3IuyqhcI+kECMyAVy4M6FPRqymgvYYtGNZgQzDpQLOrxUpeO3SKal9wcQlIgbLGFrylsEQTPVaIShNU/+9E3lkGO8qqVs9Lxa1p5KPHq2FGrrVRj3pyINzoT+PNr2TWAYAtgzwwID61f7O1iGwAQHtFBFHgBEEujVFoRFSNJ9dLQbye1AAp3sFkQzR4dFVlGPpg4bsKTU+bLKRJ20OXDGWT+Mz04Oi5jMVmzVKVIxyauuFSca66MWKLZakKvnjg9Vk1ociBpPYml3kSEiSjJVS/2Vt2WKhMk8GY03siDB0ly7f8N1IpJjxUBGhCUHFkLtdBEEyZzw3z0ZyYyC/UVlCfHYvOXQAtxcKqssq1lZA290A6+4rjZbiLZchqWigXFfEsY3WRQEqb70v3Ci/71LFr73nxRlQtehpL1UqxSJK9CLhSrCuHk04uaPEo+2Qq/106wtGpz1/2cuifP/a+LipLafXVeMNxtF/hcnXqOjnlx8rcIIRPsoMbAUgGmE+TqW+a4EN0254M45K43/2PUECzGmvhRzjPkq18aVnYaVU2Pf1VpCQTZ545JAW1x1djSEwKUQjIB7VH2gBX+7LUIRzgNTHUzB52+Rip5wAY2CYDONLpigdsUQWusY1ldllGMlLX/wWH2allbHtWrsQjhZ16Cydz6I6c8lCpy/8JbUex0K6FVQRG4gkoIczPC/tlEgqP5FfgOxbhUbUh7FuuLY4S2Qy7qi27uShIeJkW+Q0wLcj7jAE90ghysGQaOVEFLfxJJJLuxQQ0DpEZLwJbJaN2JWg1hlvk0OAKK4UcRQdQbtX7nC1RFpT1LpJ5VXBgKVBCBBik6kqmWV7XeyEeA3gOk23T1q7qhsRofQGIVy9NKWGHKQdeSCi35ZxUiYMtNeHvCMPfCS7XxZzRYEkLZRlYoGPrLVHYzZECmsJmW+RJ8aNOlUCz1Bz4RwJojzMds6HYMAR5pe68gjyc5Oa4hKFMe/ykip2840ADWVA04QtzeL6vwmx7M5xaBE+EkD2O9QYQJOn45lBVZuLdJVDEWZRtQScp5LOGss0a0g6fuoMlA8xwDK/gzmCQ9+h60AOcUBNkHBDd41IudplTdU0eWkjpFFcUkBgMS41P31iUOcSN11QHOT7dlPR8IgiAXmagAvSkPr1DsJ2Dby0mhWqOyXSuebTkkNez0JggKIh3UzMg+PWqVq3QnD0GgqENF6bvl/WgTYakcVM1JIKzUKUXKY2eSJuYOgyCuMPvz6raQoJiQ7aMvkYMqJ9VU0ZGlSYP2CYg5rzKaadBTnU8LZaOG5gRd3qarnR0cGY6RkAd1DHcjiP8aG45zqClVlHFG6ko8UsuPkBnKRhApZCbRAVxi4cBgHeXte3yLSz2UMYwUu5h1YyM3lK3DnMxEAp+ipsHWlISgpP0s8SLhRr9297uHqItpVLMciiFJuepgxGmfKaPfBkNfDykVB19jtvXpBHSPUJUSuztCFfCDwt184oaQSlA8QM4mNyDxW/iBDIsFTLq+EmUFxkUeLVbnEUQCDXDye2HAjkYQjGKZC6XGUAHb1Yu2S4JgywNj35A2bK9AIYGCQC9icPfCve3JeiZqsbkg6FniqYWAgww52iYZCqNa5AAhJ60wg2DH1PKFpALXghtPeTdVKtZBSnOdg6KttMs0myH/7zat2phtWsgbjkSY8hYuCgIFO+FGnOUMHxZcGTfKmehVHQbKQjdWnitpzZieVVJWRrFc1vFWNGh8Gzg/+qdgfYIcp5QtlKJWyOuUgioWq4oPkPlWG8QjG271oFX2N6tZU7VXVcAj4LJvdIcks8OoO8UvY2EWoUQyLUrqgTc4AQctiecw/sHZYnt0LaZZgjBE55JWsHAlj3kawMzomk7jjFT3qRodJ9SC4qjO0eEeR2aJ2l90N6thXLaF/IQ5nmrgemq5ntVNB1XQIuSbGD7lt1cBGxU3GZBXJbwY6Xrm5cVm6YwIPYOGWssYGN+DmvzYd8Vb108eZLBdqW2CqKLg/8472FqKvl5yU0F9gGt07CvO1KIvvt1yl7/cLsdw8dweVbV1fTpnzRbTFBgL72tnICXOq5zQXYlEVIM76bwF7LEzKic9KKkYkzmDqdY7i+aukA2u0LrWM2OGrgDjeTYwEMvH/uiOABe6mmoArrrogbSTa+c4yfVjaZczN2ighzsLzqJ3ybADSfnv3UU02Nm2jvDYKqaTWLFTUWR67hGGA9ewxyAYhgioEAAKgimMPjfPbwcYISRvsgJrVKD1lMFkJOq2+h3tngUtCUJPTGrXkpxkoEbfvuK5/7fVAI2IvM9UB1YKfgLr/n1FnaTWkmeQ9mwT5TdKH/eJXLm1AmUe0v/EZPynN4YLWa+fKriDE4qyQztaoCWwOxCkU78RcgCsqDfgiAwJ6Ju8egeHKIBrcKfYyJTIewk5uJHIawINQIHmwA/qiIEBJMACHDj/gYk3WBkAiKgAeAOHALpYKC7hO4lPiIz5QwXhSLcPmbgQFMFJMsC8iJ8LxAGuYECSuAa8KgLEkwN8SDFVCo7IYIu6IwHo06cd5MG/Ioh8YwEtMA8ATKCgu5kvhIIIlAytG8MTwAeXiEJq4gbNs8LN6whvaZrvMYmPwDYSoIUxnL0XhAXgMw4tiqoAZMOYcUNCfADqu5kW8pYXzIC+cUIX1BHgi0EP9DE6DERsqcJCxDH+6rqbSLgFAnPEJWTEYNEEL4lEWeoCB8DETJQzOJyNeZqQ+JhDWHiTDmI2CZiDSpjC9FtFXqwe/home7iUTbmty2mtOZAo6AsRVezF6TNAbYKMm4KMFhGxUySGVGRGbPwqZ8QWO+PD7wO+7lEQ6jgQjVjGbFS/VBzHHlC+ODkcdbxEczzHTExFsZpCe/yHVLxGedzHcMtHf8xHfuysCAAAIfkECQMADwAsAAAAAKUAugAABP/wyUmrvTjrzbv/YCiOZGk5qAOsgMC2LjAIdGreeK6DKRAEhoKwcCgaigeDcqlkCWaonXRK7aAMQKRWe1Ruv8ZmC+Coms851O/4NcBctOegNZjFgGykMLCqof+AGig+RGFNAwSJiSuIi3yNiXNvAF5ITXJlgZpng1mWdHOQBDMNBTI/BW6SY0kydZEueYcDmZu2OCo+Xm5wigCpc0dECbzDSQJ5RmMDDQeusVx0UbfUPCt4vIgCjz4NxC7RdZStyEgJxCtFCc5yM+OfTwK11fQnK0wyigQBx+8BM0ywPPlxIACNJUNk/FImQAgMOgDgQalH8YGKNW6UNApmZAYRLC3/ggxzE5EhkwSmBgQoZLCkOZL3kqgiIK/irUGUsvUBKOzYtiDOKKUq8K0cuiWUULYw1oKfuQYtx2TJRmCeTTQOkCFtREmGViUNDBw8kApIoSItC6mV2W+YqW2FzhXU6uNeF1BWr0q52ASIgFF0xXlB1xClLKTbiqQSBrTtOVPXgqwTu3DdmHFUa+rdMWjJ32BPIgoMBjTlSpl8XtBwCpOFkoEHHi/hE0BpYrlexyBGlHfziFyzaB4i1Kq0Q2TH6yhH9I5dJDtjyapdTFjWvRd46Izq7dsD3xaRhKpSuZjfbK9sxLoAcposGNQunZkVRiTtgVIGT8PE8ygR9+4ZZJVT/wH/CIcPQO6lAoNybAyhmBYNNHOWHmAY4I5Z5Kw0WWh5lCVePrQA6F1kvxgEkBBBqHfagnVAkwyFI2mBoowTkpPTGCPp1lMpUilhIk3/iWjReuABAVFjqkRUgBzQSFfjg0JsMdRkZ00HT3StuKbEOiau52M7QXYnIC+j/PIWcsrMQRYeRoARZZvruPfgnGt98VFpn0D0UW4+rGFiHWHqlYtozK1EoAtDqIIohXJKpxgRkBqwzlBoRWmlHo3V2QUTafExlhjZIRKikBKoFpRHZHmhoBwLQckFpI8WIhKkH1kqK60TZuoeKgkd4YpQtmEEJqmDiuNTe+S0yFqjcxrxkf9iqkaqFlBd4Ooks0DZlYRD7kg61xzzDQtgsZIoeCJILbY6YY3P0nnYENImId2siaKUKKa6HPcTiq6kFiqgYrJ4zUefsuqglAgno4SsXSS4iywOWtpgu3qY8gNseyQJ6mvKBbrJoKENSBaOlJ32JrMV7tKmM/IuvC1j8qZaCZ6PNjaybkS1Au5swr7iMSDAOVOHJyjSYC2MVdpJ352xNdyyUyv7mh6Ki7U5rUgLE5XSHLgS6FnHFTnQxCWLTsqKmzJiW20YDGd6xFQ+OmtIqjOy9SimBeCnZ5R6XwI2PQ50JJRB20zWL6W0vidv1VRT2wpGL/AsmsupOrrHYvCmmPj/XejlrMpWo4x601ZCQYbWr08qXvmmMbOHD1L3/HlQTg1OXee96U3tIysgDbSVqD9zJtNlhm7bpUsnW5J2esQ0TPvwAZVDWSxMisZWxJtWIrcRZhFo5nh1/TvDLUn826GiJicPK7RbZP/2Euy8QAldWk7CUyUoYr1wijZX3coe8ejCSl4TieDhYE2DYwW/ThQxO8UsYe+DyRxooI14uCMe1yERBve3v8UlDm8vC4KJ8oUOI/3FP4EIHDeKBpeUgCN1lnpPwzLCIlHpgyZPeA4sFHKjN8QiawiJlsMsMUCxcO1NFqLdCUVnBgck4BFcI4f0hIKwOpEFJepomUZy+AoK/3IqDE4BRSJWg4XdAWCMtKMXQvKnRZ2wISyKAt0o/pAqd5wMBqlLW8K00AcaKII0Y5uNTOCXmqD8JQYk+iM2qLW2/a1FIUNohk50IRZFGDAETlTUweZiJgq9SI/EkJkcyqStjLChkLvjXFCuo5z5tYMAOWFPKmQyywQ1kCwS+tX/ZoJCKmTyHzOQUn6iZDOEaeEcX2vRLroySP4sEzMZydJdMCgJqjzvTqpaY6zMJpgi0O6MkahCqn7QlCyqKHkVMgcSQAFINnRlU6LBBm04J8By0I5w2/ALg1ADP7b1ZFtN8xQVv9EFSFySA7/ckwsMF0VGqY57XDlC8x42DnJKE/8p9DSkN3mWRB/EQRyum83StpUKZN5Mer4aYD56mQaHUDEj6FCTHrlgjskYkQYLcV9BotkEfnrGfTDxZh9TwwhEBpAJtZqVUhfHi5w0bQUKUoQAdrCm1dyqqZ805jmQ2Y5NzVJlTCiO+9bAT6HmJA534McIMyIH/rTxZZXLHI4U+hGDtlQVy0rVQdj1HrmArxLWGyQ8BUsS81CSD7DbXRxkMLyH+IVVNMzfVy2HJAGwxYh4OGEicvBNcFALkk+K0zGNEA+4CdYZLuspM0miyp4GlReI7GwfWImINQwFIU6q0p24pB3p2dUEuRCqTI3YqofGhjAIohn8FgNUN5yWp87/NeVr1oORS3TlIaBgTEBoeTL6HAMwMamkIm4AA3zsFbHGjc0CLGOs6aQnZvAL5Ou22yexEjcgQYjcFv0Gy4DctlbXkgmT7mKk3/4GIhV1RYPSixucQm2i7mNuQfhg33QERZrG20kGeygayMQORIPzVUFkFrGtfSUontFHCRaEh8VAMr3HnUti3vswr91lu26YSknSwVov+JCCE9wPSFhA1FcQQISNRFwhHhIGZcxPHwe1yDN85GOOPHSr7EhMm7YU1hnOLI17GmSWLvzjxSJjYK1hT8gOGUQRJqqf2tsFh8ATThEwgjxAKcqCFefX0GhhKmybW0CgOWaeJoXHPpxt/1f0k5rZcIiClLAtB0eKBG8ky0DgZOmIQuO1plFmk+9ZgI2ScdsIpxYLtCyfMoojWM/2UX5p1G8/zrzS0gl2lvAyZx9gcYg/hgAUK/GEitK73gPglEZ2yx53l2uoLHQ6mojmB6x/gA1+2UUMXqIgTcqiTTzFhR2ium4qNFuVD6hAHE3ar51EG2OFVGxma4Q3WkQCN263ogiJyU9B0ojf14SXMjeKAZMwMqP05bqSpLFLpss9oq54sShQa4M6RK2QicUJUhjaqbLjO9a74NtXO76n/PpCSeLBzqMzaDbdjOOokQlGDLzcrBV0g9hxuPuBX0jAeoedIJpiLqz3Jqzdsv/gg2NQmRhRSTT9ftGab+qGDlqZDxA/eAyOYJXcHjt3NZlAxofuvJzNWgvV8se/cTJOgCnd9+MErOgx0KXZL7ARkftDO+aWuErosa4b9DHVDeQC3VhYFZq2wG5Rt8RN1R2KrfZsq8alMsfySQ8iyekaxRPVx0Q2ozakzsZc7ypdAt27iv2ej7Mig3ARD3U/XsQpVKRNt3Z6M/9a4uBEhY+o97A9Nh5XRh+lhkPds3usCEb5AK5U0xcwoh16qBIjsLumFNcyFypBEBg3qw0B8VQLqUxtLHSvcnezZdfKW++JuWxPHEvEuPkuiPKKKhZO7TkXdL769gE06M/vK3w5Nx//Lc625dCiPdbXGKGnOR50MPXhDpDgK6LQfsEgCWXyT9dXBF9XDi+BFp+QTjY1YvvGMbs2ednzBi0me7iVXlADW9Vmd7liCjdkLBYCZRkAHh6FYmqSRxN3DCcYNUgABH6FcZsSFtmxWD1EeZEBT6BFggIIQ04zC/xGdQkBCQ5nWeKFfBOgAocUEjnRUIrzda0iWtS3UcdVO+pgGE1lKNOyFlRGUXRAM6qDP7GhPL32FdqDgFkSXhZ2fAOAAecGS8aGKGLBDzZIfwaRB3EyUZ/ABs/nhTjzhv4EX/AhEJ+BRj0ySNcWaU2BUV7RSkBELbfiHjk2bphhQwxXASswCtIm/wwhgTJasHPgMFNB9A7FxEeLYgjYAWsZgXuwpQ26kB0woFK1CGsCtzMSdj1oaIE6gnX28Bc3QloWuIVG14Z9whiZkz8Y4z2uEDr6AB001AqwFCr9hWqN5iE4pQuwdg1Q9D1MVSMpMhVyQAQLlxd7aB5OYR8TIlo6RxI2aAhe5V9nhBzeo1ndwjqHsA1f8XJ05hq0wR76RVQ4NY6eYiApEmAx5GGa5SvZaA+S4IKp6EAUSFDtoyvsU2oZk3L/GDpfcXa51QfJBB2N8ENmFI0K4gT1QxJcg1SJ8ybrtxzlUCCWRIrpcB2clI/0Z2GKkwx1R4lzAITPIIdKlTU7yHvaof+AUjVNXiIGqlEX1wUeHAEvtXRMS0ITopEOX9mTVZiKy6hAW4gO8TF8s4RM/CZFftNOIkROv8cCd0Ig2vd+OTQKZON041iE2HZn40A12GcZfCkG3wCDZXkQZ+YriWGDoiYWLyJZlDIZg1QfRrNrXGMeuVUrColT/NNUOSRwidAX5oVI+DBtWhlEFfMFBRKE3DgKNEEBVhgKZLQaqjOUEZF/zCUZoRREJrIEusgafSItnCmOwVAILDkAXxNpvocd+IB7rlFUGPIsMeSJPJGKLOhrE/AGKWUwo7WKHhl7bERTqSID+bVBKRI7Q3Zt9NYl7oRWB/FXVhlr5UhkSxJAnff/IJRzAM03NjqjmLXpGiNGamAQmQ1BngHIiIB4KExXWvQ2AC7WDi3iYKioYIZkB6SEQdB5cvcZSIXSQOgkVIjhI6KYCVaYlQiiiuZAcbvJbtJSS5YhDCZiLj+hP9mwHMoRDy6JT36jbaRJXechcAhJedgmHE4yK5YQnztBE0kgCijaAsXhcGsJBt+QejLST+t0H6YxbvfjNVH5ftNQllgzCXDgR8FwRirRe6/WaJxCEvCXckJUMfzyGaJADFAqAVnBnD8pY1mFBKyIiKIlMf0UStYIFV7RPXXxfi0SJA7gOgGwCG6XD2cGUjLpnkihfT+UqN4VYIpRa3G3ndpQKof0/wTR5YfOyAdEkX+Y4gkXh57jwZmRxqMTgVCo9oKrAAc8cYUdmpptp3BDA2B7Rm+sxgveFAmz+QCU2ocRcQosSoEXJhdSIhIy8xKzgzHep3zxEDyPGgQnFAOI8V1Cyimvdg1aomZrujgAYJkceGP/5wzImod7GBHOtpHGcEwlNIaYglux+IcuBD8soICaYW4WyYcHMpCDVq7muAvdpzE9RykPNExvcRcnOq+oRQ4jCqgeKa1L2pvfpiDmIh6UIQ5g+RsJ4ArVxAjb9isMKZOLZErVVXGRAlAMA4Z9CDqNIGWI4Ct0BZkb6yb99oaFhXp7snwKEWUP4BzgxSLwurTR2P9vvuoEyYk4UZMz18EqQiObVbGHr9EFs6h6qnpcWCYl5dmBDro/CtYUSGsR/QGWAUsAKWGKHvtM9RkH+kRF7pI2XrGXzQql58ZaotGKzpgOY/sgg9o+LQBxXmAQpigcN8BLsbWzWIVjl3GVwIgqTVZLudaPQCZtfstj0tYWquOiqjOChIiPnRMbXHRIa6undOYOTsCEqvGX95l5eKQyjWKAHOI9DAhlVgi4/van6nVhbkIrb6qWAtFJJysO4pADe9kt7DAabtt21HZYIdU7WuF8WrRlXlEfmIF15wZpE/QTaOOWElWI5Jk/RyE0A0QUatqPrdudq9us6AER19tv1YX/WF/SjDBTS8IQD06WmJYEdQLlDsZFUOzGsXxmIebCJvDqAkCSBs+LVh6BV+siZvq4KWuwVxPTPsPQjx6yrlNYFUXljhx4ZeOZRekbJetwZOwQQ2fECAEQv677rW5XB87hdO8kmn1Eu6ZKKTCDc6ewIOtKZ/7RVJVLVmkpmcWLhBpiAATAXg7MuXOgA1mxRMEooZQKdUIYW5NAZGsoJ+8VM+4YllKqtP5hlkaSJKObwiuMNU0zAN+QrscKaVZ8kA+Bw/dVRtRGl33sx9HYFJdyNd5kWJhhxCRscweCpfjKxPr6HmexIY6ppAoRGnecQ5HzBC4HNVwpe5GCXxUnE6HU/3KQAn86gsgp+nTRm5tunHPvJivlQEbuJAnIcMd5txUF8XL+1clvynXpSky7lQTLawea+IJSBXXhNrGs7MhAG19m8Q1VVzxIvA13bCFMaaqUyqEiB7XZakTahU7EZM1+NAoLcHwkzGkUxg6MXFPMPK0xOgxXyr5oqxIhYcukBAPbhllE+GpoVblBREZcGSsfOckKsJdp7G6oJjRV2sjNqMAz5Yn2tKaz7FEGQMPKupdG5aTFkCgxWbsOqX3IIn/+C7jHZtCJrCapJVN99bOMqDgoMqNsjIopB0s0vIf37Ed9y5z405seinsXYya2AiV5AFXqERhQFtOn9Jipw1UvWv+475Y1lqELw3Usc0DD34JDwbgSSwS78Aa1tFEiL2QlEvOGh3zIUMoIOxw/gbgAlOHSHivUpscmimLJN5DL4HV6MsAt24CVoMfN2fQPIuMw9WhKLJAmvstjZfQWxaVOWUSUSsN6kld10PQPLlDVwHWyzyGln8MLAVAKe0BUdCld3ec9UeRdbtg0WSwGfvswZfRir5dFX8uq+3onlpUS/FbJtVwCqquLsyO5HDIr7FG95jggy6RlNCMr6lDUxzwTjQAcElRaV/bCMVZTAWiAgUTZSLW3lv0bRPAZ8hkeUDy9Xf3HmkoIFiwnmpLcZAQD+xavOMFF3QIrqWN4Df18mAP/BqpK2UVko3SNSYsRbn3EHJQALtrn195HedS2V3pkRerBOScLTqIiZb6zhF43F4SIN5vElWLhcjeKrtsqAsPjYL8nDkdCNuDq1X0sBl0zrWQ9n9C2RHMkNqlIZUuRm/3Q0mK9r+lxI+KATbDlBx+gWGCsHQG7w+2pJUhFYgSylaTcc+zVEACKyFOVC6eHa84qgewsuBNYM7oSEv8Kx8oHMLa6KmsayJv6E5R0HiPne/0E2ISIhpNBGIrmTcgYXLvALQt9TJ/2UIRJN894Xz6+IECuh2kCELqgMzZKTieefb16Hs2H3uvTBQ/ea7AUtz2pAtpFCO4WiNGLvhdXgiRG/+fY+7K70agVcAWwtUPOySeNEMInjhrVC9pey5x0MieIWHSwJUe9ZK4YlMt4e6CrrMIklaVueMp14GXlI7X+sae0CgmLlRkYLUDyQ+rlqGZwkUXpzXusRQ7uXSqg4CIrqn9tfbjYp7n15JguDltNSqFGJQqw66WAsUT8Jp1wAxLCjVV380F5sBrlxe2ymYfeXk4SpR4UQ3jfsNg4zl3XpyKlKIlLCQeJ9mR/hFa9CxgbQRdqbiSY6nsXw7+w8uk7qJnXBeN9J2WhDCmnEIiW0YwcOS8PozMx4OxS63YUrKF/1MNHcELaEe/XtUh9oiOcshhjwS6Ms07xST156ro4s/9Au7nlK7/OSOShPsahGC0/MH5DsCCf84lGVU+OPZKtdckfwfZifzotGzSIVaeYJo8mRcuZDhWG4LAOF7c+2DFPnLPXO78KHCMKgIFtDXlmYMnuudd06yjcWkLaBpexH8fcgYuso6isSvI21Clx7LyRrrJOhW0xmPF7iAQJpEGkDWnG9wBk46uLffQ2+5zm0plTCp482fRUQrWpGzFHFOCXyjIdFyy0gnuvO2isQcGDKMYno7QITfeXMiaFewnvfHj6qJVj+uWhrNRJsbcF6NVoQXFDJa/0KEscBbE+ygP3LO+FrT2EJeEGXgq7FET6OLJY2tcVXJG1i7BKnjU2017/n31iIpwcaIh7VgpHbo+/9hAgQDgmGCDO5obvpMiojwsCIAU8DN1EKxuGVJIMQZjT+cazGoHmERCEkgNKdVCtDDHV83k6/QqhQ6FwSHC22UQst8PkjAOj47FeO1a5y7OAE8y391LXCtpAqyumFJKKiRqbgRwPRMQLG4C5sSMJFTTECa2TiaQoqUwfCwOREa3QLK6tMI6EiRuAHgw0IyE2WkqLigodANMSVUIBgwS9ipOsQoqmjpUmWDIVYLrW2IEn1pmhuD45Qk4q1gm5MqcSD62sqy4bD5Q4HVkCNdq1t63lXdfdu6+83N2+CgzGUqyroawaEhmWdOSocQ2RhAsA/10x6rWNWCZB4JRwgkXhy5dS+7j8eBTIwAIc7+DJawMIQwZgAWYEwNOLSy5gXbStKMAuFIqAfQDB3CioqBKg5HggkjPnpRQgVYpKgQKOTjl9H/YJEzdHUwJ3QmaxfOCGkhBqZWjysgkQicENSAlRMbFOCSispc7xepLkmhFogl4ORAGxEzOocVAMMbfXi6/Bljy4koUGANl5OHoA2wDko8gvekZ0qJKELl4PffRteSoFFygRwPAVEcIMadWqVHQDmfKHqUhcj1+zyGDkDW1Z8ci6WQjKmA6awINz8KztRJhtjbWWmMMkBxxGDCtNY1jNiWAoU1RciNMkzhToWHCl6v/AgklqmEDMiB2gnKVZpvoKxZU6HGurq7a4+yAUp7hwyQlEAItFlu+caEUjqzZSz6pqzHsPn6zs+AigEFY5bxkawgIMMzbeoAGGOQK4AbQRlRFgkCxCCcmp7gCygIS1cKiHiGUCO8g89ZLMbUMn8BLEKzgY/GCYvj7wRhP9VPJvOViajIGG4GoKQSQZC3zBDhac06qnF4DcBQO7NuHmqU38QHKwCdgbqLcf23sROHNqOkiDCiwBYhoCBGCRDQDz/HIAEnpcc0EgzrTDx9SqJCYuEjSBM5A6W6jmgidjeMmHJpq8TSoUgdmnxhdCIjAwHWDRctEWMzCvkkc0NSW1iir/1aI7HaO7tAJi99EkqRQI+YmnZk1Nr7VUd+PwR6KQdawmc8IYaKIZKeNvS8wcAColtIh5ZETQgKXDo1h/zLFKvbZJSsa5nG3t3KfumpYdwsBB70ueArV0WD4enEGIniZcEdeWyjgjTxEYe+Fi4MrgTLWIsiitC3OqLMY7bwlST93eaDrVPCc07LMKTJrT7tVXR9q4hhQqvhXieRajgR0tCOQ2wV8KLCUkDDK+z+O1mj2As4H0lbG98/C6Dbc+LfCKEVQutkkLYXjjpKF3FOW5JRl/dsGC8rIK8wobXWWNtaBSu4ME10Sg4NOXuPG7J1RbRm+qKV4qM9JetCuli/ws/+lMxTTObjGlPHnTgZrtaqa0Vk11dA2Xjrf5VBC/qRVccMWqeFlV+P7UDqBh8WCcoX68W7gyyRmNAqZECW6sHOGshEmvJAS8KehMPyToTU/33HPUJE1TvZMTnEpb7gVp1q4wL39BdKXcy1ovrBthuTGJxxC+6Rzz9am33rVM07EkJfTtezDqAVr7x3L6ZE0GzrCLRt3yDhI+J4OyhY9RZbjGjfSECBH9qgPC0ZiI5gasJNihY/xqnuDUk7r3OId/VIkO236mGl58Jkc30dhkWFicd5DrbOZKiFFIsYOamII12yla/JD1KuC9xwUxmky0+FWMngDFep6jCuyU8Ju5Tf8qUB4Igw1kQ0XAqcRsCmyDz47Rglp1hxRtEZQMdgEy9d2hQ72RCHGYx5M14sUpUphjU7xCoHzA7RyrIcVHCFOEAQhjEw4DHxfFB0ANwQRhxNOhtn51qnW9zn1741+oQuUT/82xjkzsS08QGaLYHWwffFtIp5ATOUPqjjLlOwEgL4AHFswMIBc7CKT4kEMBVVJUxJifYm6xxE1OYVi22tgeaWapBX2oMNUgpAwVeKMiVA4N0NCbfYCFh1GChHss1Mm8hpma0hBDjQHATlOossnYiYEpxlQfLj6iI8P0LRcSi2Eq5UFDSC1GCK/MD3ded7CdQKcijekj7LRBCnplh47/RLQbA4eAzD3Gajq5mAFxhIJA3NlTHoUgpm4KkxYGCWqis9Rfrf4xsx79rkp9jJ37kBa7j76IeJ9JI4NEkx968WBnGtWdxCyhspf0DjQYI6pe7jijFPJCD3YjaHZaijAexawHxiKqDkO2jpH4SQgj4V09eXrPmDrKTw8NZeIWZBH43ICHErVqRA8ar/79ojYExRhU1fiCEDitTOejg0oG8FWyFEIXmeCaIdoJVbaw730HAYSBMgdLmiJ0H2WaqqDsGqgGxa2OutKpVwFLC7PoymcO/Oi6JHgm9u0FL2c6jGDauq0L/iiUBzkD3j7HFgtG0Hs3aiwO6Jmczy4nVbxS/51MqBEd3FZ1kj/ZI/WK4qUQhpR4L1nYi5qrPaaGDAwNcVXogvCOvwY3sE+szXvmsE5RGswLWfHXerGCUDrGC5sSIR9yj2WgmiEUDIuQaS47C1zx/qdIFUUPgewzRvcm1TGtuS2C2SUldSVkBxFBbKxEkqalXXR4IwuEuAAcYAE3g7QMBMQr14taq9IIkl7qHFWY5BCLFbSlXtMGCkPmvNoA67sUAjGL3KDPtBQHGgWEaDa3syOhfGcSS37G5RyiVt3qUEdrUikLuAfHy/lDrgnsMYueMRN9NtZnkswc8LrJR4nARMkVAsdTKdgg+RizLsjSDKSgMjxRnFIIzuzyIf/zA8CCDSpINHZbREPSAR6xk6A0hbCUOhlSjHnuDpQZQrSAsOMP93k5kwgCDdYlIDMmVb3pI/S22GqwwwYHg3Z1b1MwUkOnXRpyhdR0uX5GGzvfsTeVWrVjg9eHbgoHmzUakX1GuhcZ92QwftlnkjGa6Vrb+rt1WEygzQgo/JYVUJ8BGQapbE0Ev5d4JWQZ2QjVhGZGm2cOuEERVKaLqLoCR9JxLLdCg4pjLXLKJ0VxLmeZzloSQGDloe5O1Y0rB3hamk5ojEy0TO/EplCF3q5qqd+pINj1RaueLgc+mGnwgyMcpJXwCNyu0odE0FjBibvmxX1N1DDMzMW5FHEcSKH/K1t5NuTrTguuy9GAimlZDJwB2ZTI/DU+qJzKiQ1mgIxhnIaOysOo3Lnk2P1xW/6CivMqTDHpTXGk5/DlEUX1RPxBTBfbI91VD9/VGUiAuKg12FDJwfoifmLVLLWRRPOajrRpYFBcG5Oz5jPbF+X24jCTAlzhSX2yznezJn2tFv7HepN4Xk/vjUCsIrzhDcnuqnlGkDICRwfe4qzgBRvyEFcN3JySs+v1byLE0XN/PG/Pt6QEEafIGSEet3WsIdomjEzcpAegFErXsmU40GrZCn/7dUOjGaw5/U16j0Yf1S/pW/GFNuzWGTBxlVdUAbxXntB56PM04W48kiqq6A/V/w9TAjqZefvtbvdKCeWhsZp9mglJ6/SzJ9DbCcfhA+YThnLCoD1QPRM4n/v7h5MDv7NLszchL+cLwOBav7iLhRXQA6LzlufJhcVjQJRLjaUaDG85Hw/cGBfjBvTDwAx8qFNBhNkBPlepG6LDFNf4AS5IwSxjHDDRCY+jk0HRoueDwVS6uj5QgjviggVIgmLywGBgPCULBh4UJF2BDLljAkNJk2c7gyNEQgFELzsgEGpgnDNCwHlCQObrC654ixokh5TLBQLwIXQBOTHssYQrpmhgAThMgCcUEkHyLfeTpzgEgdmJriTTM3gIwzwELAcwAjcsni5prEDUAECcpx7EwrAzukRvg4XF0QZGbMRHrLo9bCxeMgQNKAMP8EREfMIs1IMhqIag0SPvUQlSLEXDS7jeIQfUYAh/GIH4qkRjsLNB6CaNwUUBcERd1DR2kwyKc7E7yoheiZJYQsSA+r/+YMZmVLdnnEWiCSn1waC5qyVC2sZubEZ2k4QmgbzhowRtXMZ0nEdGecYjeIhUSRUl+78zWEZupMdHdIBvxEWCrIz+kEeATEguEkiGbMh/TMgIAAAh+QQJAwAPACwAAAAApQC6AAAE//DJSau9OOvNqXNdKI5kaZ7n9wGsAAQvHMCCW6toru986rQAQ8BwKBYTiaOxWDAYWoOB4NOrWq+jlWDmPC6+32UxDE4skEUnTUrFut+81au7dD6dLIDr6QISjWUHagBRbXCHiBlyAXVpelEEA3wDBAROApGRUY82f2ZoT4+GiaRvPy9ioUGYlZEASXoGBbACdgGzBZSRQ3sHYI4CbKXDPXJ/gkSElUOEAEdoLAfQAr5ISAU1XU9RNc5mZ6GFxOMlK3bIwTQELgWCA87S0gY18diSYs2f8zbcQQZfSSaBIEdQkYNafyZVcmbgnZFmgo40rPVQQIF26NZJS+IinrZe1/+2DRhYsOSDH0OWBFsXJI3DiwEcPpvnDRaAWUrSxcsXaCKLf+BgiDM57pSdJ4KCHSsSk6LNJowS0ARlp0mDBQc6QhvASFqYZjY6njnwaCRRUkaJTErGNV4arWkuznyHZiMaJBM37guQ5ECDpDWlSiESkNBIkmexoLSzYGItqezi0ZLs9iHXumKK6OGLF080WA4/NY0WJkAws4mtfGD208ngnRSX6NFrJ4+ex1Jt+6M5q28aIb6ytsVbgxdpQYYRp85hdA01sjfRwPCkmRqtGlGyG7BG9jS3btYIY3ZX80BMb+ZbVhS2HMWPUMFAmt5et67I7cgRPrOWBMmZgPslMEf/RFu98pUk/E2G1TxDtZeFAynt05FEWxjRF3yb+IfGfwl+o2GH/3XXS1K4QWbRN/9NFxyDUjgoggN/8CUcPBtBB8oaUgR2F4gd8lfNjqD00Y1XyEXnH1Z6/PSWFFO4uIEDelGzjY7d4VSWjj1y2OMnCdp1ZHgtaSgIDOXxpiRy3Cjn5AQwotMWdLNg9RZnd5jh5ZY1fqklh2eEIRl/ACXQzoVBLJgNKPBsc8OaFUCZTJL00VTZZtxV2uGdYnJZI0Be3qllZzUSgSRdCigAWUt8LMroA0b8kaQSr+BlmhReWKOlXYFixV2ellrYH4eYBjWoR7SGCAABqGjGpJrLyWOa/zxa3ZUeNz9emuBYW4a4a4+99eftpSkRR9eFxSnJoKoOOpsOLd3SMtiHn/4HrK222vVMtb7ZCyiPEU1p15Q2ubpsukjMeuKpHhESbZaf0vtJZUtgJac0GN3ra6e8AvEjWVHQJ1WECjeZmgPiBtYdfrd57JWHSWC7b43BEQlzX4BWJm2Xve5nXhRRWdOEWiEzS0498XmJFVziARQvlx/S/Oeuz0w8HpA4+0gvkaEcw11X54pcEskHtENDNcZiuaXD23p7gAJKADnxvVNThum3N+cXJi0Rxuc1OQ7M4kQDp/ooKdPX4qyrrYfH3CojEXoi7Z9u0S35XYTld0sSMSHLdf8N6BIDZX44mcZZUnT9KTGee/4S0W5jHsXMHnb0lfjjcKs9hiDkpmGwEAJ3QxDQ7/RGFuDmBYMlGA3XK6ecSx3TmIXIHNXChK1SDnmnguOEMrWCyqXo3mipdahemBuvobz0BrqhGRgB6BEy0cOD6m8IYQIS9Df/2mXYSswTyTF3yE/nEPEeaKFHOuA524f2w6E/LOgo7+iGBHXDkNiJqGNL6I8SIucbLmHkXOJBzi3cMbBEwOgnuXHBw2ISGkApDUQLMJW31HKJ07CiEhGsQSZwaJozBSEWxnMcprA3Q0VVZkpdCRkATHjC13QnVo+QUZ/UZzXkjQEvUIBEL5zXqt//rIIbWcvbJsTwLTKOZ3CCUtY76AAWoVXhhEGEVoUIdKsy9OlIU2zVSnIkhufdTi35Yh4UtnibEVEmbZLR1kweAY+8dcONO4BRQ2hVB3oUDnmfON0LkVQWp9gJEEfxzT/OkS/Q7CEIQ9iLryoFrLbpzDA0Ag7HfOeGHxzEiYKihXjORwYXygsZ2qkG9IbphImNsgsXapVnfJiyDTqTV4/zV12aQLpgQNI9P+AZIALCDpbdcYoo6lN+XjNDDQLiN8+r3B+78EBHcKUdNYxNBpMwqIfBjURyo6aEwBdJFoyxVgDjUa6QpwAkxYcvurqd7ZTpFvycI3pU+c0dnCCVVGnt/2kcxEwBeujK3rlANQCQZFMoo7AATfEXyANHITeirQ5KJTP/gN9vuqjMB7rKH0n5X2YC1CnvxYI784Cn8fjpngBKiFgIYto3CToWCRHmdOeMasyK+dCIdLGd7VwSQ1ZiiWG2bX9R0t42PiiFd1wzBDA6SAXnAa1xOawM4TSoWHIGs6mmoYsxpUPsApIQA0CpMbWhiWEGYManAYl4+OmOFMRozTj4b43IAA16+LQ2O32hoAvaxLwUmpl87fSYAPRI5RjjR80oqRlL2WB9fFYHwzwnUUwKqQ5O6AqyyIaS3/SQL1KalWzgypVe9SxjCJSGrFaVndrQBmGR8z/qLNScH/9UWCwx0gzUpAAPnDtK8cZF2YddVqXFulRwN2RV+L30rnkdLUPlYZsk2uE0NDKnF/QlhKI5rV/9OKsiAsiK7dTQGXuKK/IYZKDZqW0sELuYQwlDB+IK4oGvKMIJUamN6TBypwHyUXFmBh00YUK/F2giESQopSdYNpPf2G0Mj0arwuWJpvddb3kj1de8tvYDeOgfQs5VXpnhb3Iuec4+2EMC2r7AGcdaWG6Xitl9xGpfPnpmjBPc0Afy9X2OkORxs6bYi5bXW8lLoRSouw7rviiklDgy7wjxNE1+oqAF5YOBCmcnzHTQYvVJA4CkVtWXchnDu2GLPCOnL7qhySEJKSv/UTVA23tEg2Me4+U3C8qxOe/WzlHOoMXkUZkF+YIObXpeRf3aJpj6lYZ4wKXNnKapWbVlQZApK4glYEvzMYRd6UPRNyhdUj7lK7Vyy7M6aRYQM1AUegkJ6Qq0XGOgpbJogMTfi4lDI3CkocwCyMIT1hFtwcBjX7mi9D5+9Aun7fK5m74dGYnLYAcsSAXwlmT0WusPnQxTg1QLRQHkVNFqmnkDl3hHuIpgPhcCqsnZGGjkvnBu/xjWs2/rnzRKDaMHqoDUyW2wZ9ChnsLuyCNz/LSrMrHEDmh5llHJC5RPSulDIU6h4fFKrvBE6BWJPAl/NY88JLmbFUBUM0exAyWE/4zvoqvt0c5ySXb063Oy4OFoW0BbSktVaQErIUTbwaRu5QXXmNETL8H5HHJRHfSLBj1+uwC20YHKkHgMgSNlPmtaEfIK5R4PcaVqzFwpq+4Frdik4fwkE7ThESRUnJ0yxbAyqwodPUSi5rWznigndKyhcwCOfaAqpaCMopbXgor2xLrMRfVSBPumYl60zV0BG1HtShUPzYvFNrqy6gy3LDf+pIgBcEiAa37AeNARn3WaNkVeu0Dr4KwDUF54zhGq88W/mVWi8LOA1mD8oa5f3EQholqcQNOdZX0B3D/M6FR9u4YI5RL6ViwpTN4p8cnjVDJleuzW0uDb0kilJOFNdv/ll32SjNA+tocoNmRzZLEOyFJ+9UYrMcVSeGQrxgcUVgNWqxV4dbVMKfNnhaEkfPV/bcJ4gQZhQ6cznhUlTvRpLZFkDWIBK4AkikIfRoNJpRI4cGU4LoMTnvVJqvACFxF0kFJ/fCAjYeOBM9WB2Od0hpFYqmU6XuBpM7AkK+gB20AgPzR8vtQnVDcbmBVldwEQXgZTkDJP3PEz8NE/eQAxZ3cvE9U80rNGFzWBXUJ7H4GA2RZiB4Es8hQL5AZO3zUPAVCDq+UVbNNgjUBgzrVT3tKDGtdMmbZL0UMdPlg8FnExk8M0rTIb22Y/zPIBlPAob+EJS/VdHZZSmSZzuCP/BvB0G7T3M7axBYSIKA4kIo5TSnmmBFxAdpSCO2u3P9j1eAd4GmrSaHdlIk91PrumdwCwYoEANSkWce4EQEJxQ63QD7cINBTFTcOHenPjM0QgF15ESZ1FNbh3GtzmDnHHgv5Td3ohE+BmBln4eaDHhWQAU76FDIPlip+VJE8YWBjyGAhmRnT2ayIhgJTYJa5FQzllPyx4h/4VJJxhjFh4NAUGiKqlOheyDzQ0WDRySIQ2Ufb4E8ogCULkUurXMPY4HCXYI5XWVwSXCf/GiX2AHi4HkQkwg/OwfKC3SmEAg8VDIxqpafj2Y+aRSvmBXR3DOzIHiOCmJZKiaVdEN+dR/zGycICUYGZp9ShPgIwOyGQSqWI0tyGiloqJcpDx8DwwMQO2QXodqCyoEkc9VitNYykpRJBiaCtNGRDMwHuIIW9WpRZudXtMdZPfNXNAZYpBMgCp+E96xIP8cxGrUCGiNEqL5WFmNwep5SOHo0tLqJIcIZKA4RqZsJdreIqE4DEzd1kCAo9dt0pNiAYFQAhkdg9RAhxLcZE0ICN+Ax2YkAdDp1eyIJVnl2J1wX2RN09PVIUMUZXr4AEHwTkwQCL0gT7HmBUARpEFGQagAX7xRU2pd4tm+Gj0FA5rxArq4QQfhAepRHhLoTBfSEb/wY+oMnSRQAE19Cg2AGCZxCdxpv+aKfWPURMokrJtb4IXqcg52ZF5w5IqUrkKLBGSn2MEPTgD6fmIteFPslmQVtMvGtMQLjkQmBdtuughd+SOemcAeQdOUPOf7CISEaYZ45QdVckkxZEQTQGDvIksLLAQi1cV/ueDUEB722gfe8AKAyAYHUpr25cjkUZ8vpCF1dkwgRAxxCE+MhE28uMdaaIcPzAsvdZ48XEJkRAQOAZs0hNozFClxGZo/qMJrdCSmuChbOQZnuRNZ9Byf0iKcslKK1p5nlAbMBqFjTKVBLYgreiXDMEIbGgHPFd2K1l7d3IslUB3YAOplACnidIv0bJUSLCf/4BZOWl7SSFUKlQYLFL/lUyXEL61gx3BIMAmCMv2fzWmFEI5MxdpKMpCcrSmVtHAF2gkTsVXov35KeuWGzJCnK5hQ5Ewa33zFi8gBw6QZrPXo4zabLUxiayZJU53CbCVCXUIIy5gGirkh4hzOu4oIE+qdTjzDEpSo2MQBLHVWFlAViJ5CvYzPRmnnuilVz+BCUA6gPSkh0+QcvJZh3I2jOJKkynGAjWplCq5EY8GEdbgeC6wDrPmAX7jCsu0CVPCeDv6fxbmEC5TNUVIFptDhyfhL3PxZCe1qUeDk8mTYS7IEY/BXrxHsSfwB7vpGRyKZJBlarDqOkbEanCTUDQEHhxalSdLCELIlgEGEJwK/waeeitkZCq6tw7t81iY8G9ZMH6PeCzJeanxA3s/CxUnGIMJIli6IABwZ6pNhKg7IQmE+R9P258Ne04EIA1K+wyZk7UlhwKduZFJ4Zc7Jj0/ew6y4E/fdjbqim3jk7XJOmEBG2Es0C2bxH4WgUl06zJe0RAGFUKVl7UVG2Ic07OAMbrpmX2pgJCGOiyPcy27Zx2RlRUdWmr9gnu44k2mMhvIJ7J26V/aFA/2Yzw8AKZ7QCYMWAPaqHgJYY+g2XAgIg8YNCZIUHmPq17+hbzeBIHmqmLqo1ouhRQNkbgHMHSbMLymwRKeEQXQKa1l90NB8B6smj8cJhXc5hmw0Aq9d/9CWVMLEJtrl2UjeApW5yR+DUF7gvEOyRoHMICxdxAMHMNt06FlqRRoaciq51SJgiEL8Su7usBzLgAJGutC5MY2CquMDCvCQSAgaOoTCdxPlecPa2COqBJ0zHavriKreSp4CfCERWIEjjsS2HVI2cJ11BlXPHIpKVyaovQOm1EMjocsjjKFQah4GCZKTaAUnyReEiGHxyCNOGZ95gmXupZiKhRmJZgT03uhlRYLTqwMTsEx0wK4VNyXH3EPaqOSchYOI9cKY1oVavB5X+IhVBd16HrG9UIReQsbNGAATswKU9DAhCWxAfSBZ6dXM6UTuzIW2FI8kcBVasvBlQolpUT/HlnijmxDyKBnxhzBCHqAg5AWDcWwbcjiVyFFD+l4FBfHAjWcVoHmWwqkF9UnPwrLwZWAY+jlErGysiSaFS6rzFPDEbOgh+70mhbRyJFKy68SreyLy//HfbJDgtLSgJXjxRPWDdshOpx3JFnxh1ErwMN0IolcMJJgGgXQAwwqkkIAEbPyD6U4eBQKewpTT+T2VXJWSKPkuPkrZ+ESvg6Yn2GAyiKLZy4KGVGBzPMRuhiQB811ZCLpxmJXV6i4o7dBRLYDC1wzG5CxQzg2IeHxl+nz0A+pQCoJW10hVDfBFRiNjpUWfRTBQkPAf7Vpaot5bxj6VGfyWNX7Uy3NGSNq/w2DjFDqY8bKtzP92spbkNON4gzAp0d+8w7Ew7wTJW8A5KfiW5L2kp5HjdA8FwRN0NXwwHWZdMoTiachMk8UNRVMwDFkUs868EMLcQ4xISjenC9k6ARp1ce+6w3SOR7S0A2c4Ls7dLLdWAfcxYfuCMB4Go78gRTU3DzfitPM4U9/zZsWkTm9pzW70taKSst3oLS98nF9sQmP0FVHO5+06xsxEdPXEkPmyjIg/TLA2w556xubsQc5AB04tEwEwBf28L4fiDHb7Nrqxh2bzCAnfb8uKdlCQCYKw9Qrx0megjgpGhzRcZdv8cGyZQIk88QhFbCYcL03MYQY11k+C2klXf+K+8xXuYG/2QZHMBomUV0t4EANfAIsEZcgD+tJzMrG5QB3jxsDDmxEMGPYqAtol/Ha37IALCRa2I1Dko2PZXQ2lrtvAuZwX9UyQdWTzgQWi6YIn+bIP8BxO6wLs/iIV9k8emTHtSJMHHIeqIYk+AsCkjRHFboygQwGglnIVVMv4tdbzydnLqCshAGptRDj7uC7a2TMCaaoOAU/Kqc/YgIrP8Qk+OHFH/4E1ETNQUrG6Xcp/umAScGWwgQMj2Ry3tPBIVWFjubVDdCDIfVZ0pNKkhWIIQsNdC4+QS7ZTGFVSlxF/kHCZlMv/0csCyjHqVLniqCIyjDBoo0QY4QEf5H/z61KdmTtTHm66PaoR4lu5czrDn/ovwlL4HD9DZW8nuP512IL5WygpTACT+eCKmi5WE7w10ugiBw7eLwThITzMpxkC/wMmq0wAdUKfAwt4gMeJ3pykbGiFrDBv3w7CEICCdM4Ba2R44NLJjkrfU1Au0xQ2DTlomi07GDmDkIylvg7ANIuIa8xOAGGIuKa2f1CY6Ii3FISkragZtPDDTLaisndBaw4yy/IFB0HodmHTMJdOmKy2EAloAwBqR6OpKnqwwAAOHD4CyXcE/03bwtyf9uQrNvHAtzdGrahCwzcl6uKkQA0IKioBkCamInrMGwTMx13BwrwxMXMJtuAH9PQ/xuZqTRnoLsSQ3+kdA5n8GyuaPDKxTlpObr3fmpqEHBa1WN40CaEPQijlXD4YjtPH5McqEN8zCZ6HRFicxlbeTVJrjgr4lcSJUzb0QwvwFXqcUu68B34S7EXVyRpJtqWgLoVjux0cB4Qk6ab3fGnkWqJjqTh22/kEaScIn7iFBGAVUwqDyC70/LIEj+z/R2OzdpjOXSKPwBy0uUSRYgd27+WGLLldYbMhb8V4BoTmhQ9UzO6hdKgsBE/Iw9UT6D1tdy6CUY0zJeGned5ABqucIc6Nfup1fiYWiJ4wh3TN1oeP59SaBE+iPF5+p644WnsY54AIoER8Tr8ewqO54YHcP9yrgofs3GAOGr080Oh0krfEBAGOMnams66aR0gBATqMByBUAnncV3HMI4iHG5h1nZr+fxPKHMwbQqyjUnm0cwMIZlgUhKkboAn1CQCBESyAUGUUgEcG6RSliau2QUNYJLpXBQVTsJQlRMG676VlpeHGJnAuR06Jh6LPQPGC6KCJKeND8gELyK5AQHOkZxOvlCSrVIuqbI1tTa3CiK1ADYJAbgeXMmkhdA2oacVFUKYKE9TGoOAxbqOAxIPH1y6oQ2Mps0nKSys2VNTL629sM+smyvDNkMNNaxYtbW4iY48yQsO5+OlreCBYZftP0oCeAnILE8eEDmirSPCLBcsV07/xpCgkEXZKSwGwniCNCKMGBBZYh2aUUTGGXeulIkLMK9eLj3aXC2IEmzQsDNytpUIIEDZy2ZNnvGI9cEdTGaURoKjyGdWJwIknBIh48dVu3ds3qV0IwGLPaSw9IS6qAOYTX+FoiRLs4dCozpDHunCcBRPSiauGq47kiwVHxkDAa3I4SqGOzdaWbUpQKkWpHsG9+p5KkXhvmBp1SYDEaKwlJ9gXdI0VfdeLGunKXnQERIrw5R2OVXBkbHJGkwmF0dM0xhEImuN7t0r+WSjkqosND8ITLCMCeBhJY1ombfJXjz34HzY/gR6T0sHus0wqsTjnKMJGi85gSQx4lfI/3yI/wSzUtkvfT+quOkvxvkJDDiiioboM8iR0oxSDzs8TFuHAxkw2cOnAKvIwjhPNiohNV0qiG+rrASM5606EBLLKCxqwOqQYAhYbjNPZpGBEurcoYceD8TzSawCGQqKodxoguSA/25QQRUjowqnpFYavI2N+JzwywQLg7okx4PKm9CAIBzYL6oXH5gFtCLa8AS1uOKCQpFqaOiRCAV9MMERLsssCYonwmNlRhO6aaUvxdgaaUZxAEAqmoWakCMDt8xrsb+0iqyITyl0sGcRRCdUihryElAgMtSUCNJOvbwjEiX32urKzxA/ZEWOT25sRixHppjUDQD4CbOQWW6YZaAj5P+wFEcM6NFxw9NaG0IPuZJAdcjipBxJLyUm4axJELNyc0CfHGpoWQjXkAI949DaFaAuKDHukx8R6gEW6hiJzVg412ENAAmv06O4aav1t69BE9ttCwFplMneHjhIFAOzPMqBRXPD/M+WQ8bdMAOFS7zgQkWg4VIBunwUtYh9FS1VwJN5UzlaJgO7Ux5cDnq3Ge/2xfOE5ATYlRjOnPvDkWU0MFaSRoNDE0iEixCSk2jbgEVVEw7Ddk+VlVBKo5+ZoYPYU57wc5tHd+YZmAAbe+wlYhVOiEQfTcyx5Uy+8hfuaaU9IeCqU40lABqvoNUhsBYYUyqssPiyH7E3szixeIP/e6nNbAwdOmQ3Z5q7uGep3fOw97C11gnHrvCW2GY8q2iEk3KNWGyAHr5Ix8KCnoe+bKpzvGNLSVbiNglduS0izQfezQ11tQG8mmIZSSYfN1BoMfEXHBhzgFkA/W1DjbmOHNOMr+t3ZKj9DWnafVkWuCSl+N6Co1lvB2t9Q9PgJRD+oH9hG74PoR66HOqzJujIWQBkcSmT+FoDt9/57nLmc1oBxbMSWE2mfXUhSjYeRp6EPM9+Y8vGFQQ0AgDAQXbIQ8j26IOjbzkQWuGDUtOo1STz4eoGmThQEh7kIXj5LQiqE8QG76e/VQgogMtA3qU8JAI4/YCCDdxdtRKomEEl/xB4JjgCFX0RI7gYTTgeCE1P/OYZXfmQZxGMRfFssQjZRUZRCiEKj/YCpUG9EAlPRNkU47i+/mVxdpEIFygiF4KwifEf0AkIn5yRNcBprQIF6MllDOS2dRzwjrqDYhlTsqkHOmFctktkXo5IoA8MZDZmOJwgo6e/wriBQJ2sB0QUJQTSMegu8PneHG2UnjiOZ13VIJ37LlALyeWpM3sIpCnVIoEAietMHatH9971NC/ksYbS4FR5RBgbbLqjLw1In2WWxcqHZOFmX6AfmIw5Ro6UK3ZsQ4pLVuMLWN7oNOWBCJxkk83YNGFTGMIeE9Lmrdd1IiPr0+A5YYAFEgyEDP8toRIFYnm8WxABHG/BWFGIKEvYZBSbKDPbJrFETezcrmYJOE9FUPAlSJ3zgiPwwxx3iTCNRcI3VxECNPzpkqTNqp6xqeJSvPk4BYWsdKY4BAjFU06dGZQQDuDGR0K4zypUZ2HeskAVGbY8duriNMcLFVfq2KdR0Ep2j5sOrPZQFr8kRzlKXSpCW4qXADITcNFwIDtIMIMBHspHFKxLY/w6knEVJnDeooYkolmYdsSBpatjayEeFoYQNlSia6JqKzfGhid1QTBjlSBD2ILJtPqqk50FyhYsVMCifimpjV2qKH5WKMB+5UeOy9jTckeDIwxEt7qdUV8okdvqFQyaJf3/ZiLViEYLxq9eYygoa5fKuDO5w6gV9V/yOiDMktSljMRzmV+V8j8L+o0oiZyG1vJ0jEvQxAxqTalzmTqDPgRkkRooDTjJSzBlpVC/5V2KDXBgKfvq8bp3WqWcINZD50aKHOMgoilQ2MleaiCabGFSV716WHMINsCzrctPvoU1A3zKUcFYbYL94wTxYkAnfHUmh+nSkLRyIQQDkXEVxuWJxGp3WSPsUFVrJ91GgbWUJl7OYQQayTOFsgvVJa+sgtMcqZjDHDNGmdFcyWRFlicesbJTDoL1pbUSWTMlyJUAEJQ1jIjGppMjL06B0gjStjmL08hAX/KRo4yUM8xijhQV/wbAiehgxElCG6vWAjzoHPkSjYWF6YdfJtggRLOYfNYMU99RhVtUEAqI2uOBDA1nabirjfZFI2zACi0Lyakyk6Z0pYfUBzNjYBYMEwEfhfZp66j5eFYG53676hcyFlUii0VwqyVWkXFlQlND6EkBgNBOyXyazpI4oS/bt1MfZcGbXQYEmNtr7Ei9+s9B6N8b+ydPPraYrx1CCH0ump55HM22nolugUJyAm+DO3ExGIu65CEnBFVnL4jqpRoPVd4luhmFuhumMDtDstNsg736hl7sfqMQHyjgDiNw9lieITN7yDPCpA4aXviSkIddsR1AcEO+KQ69GARBhwrTiKGuiv+6hAGhxX8zENrgLNbHiQcS/BxJBKORJ42w+uU7kxoyYxUHjCOEkUjUI8Z6ru5pS0e7feGtTpiWjTp1W+lLZzq0QuEpZzh0qxrI7dMXovOb6vpA7lJQQ9ZTdColEw13hYKev032XVlaPSOolc03DmAqcQngs51qTN+HFxi3DHVky65bQuA8fvwd8IGnqBAJpHHSDNRDHwdrN0KuboTFcg3giWRN/CCjFWNiJ2ot8eZ96CUuxcMTniIpG5XdrdPIYtZvf3uaBHI1r+cwnWa56zv8bnuDoiAJvfiAgzMeE8UvXLKyllH3lfXbfdYcIimoCHbkICOctWgAmoc+zGOlXkD/40vjIo5n6lVsc3pOoqFb/fBsikNGDAiWjCgXxmo/Y0IByWkDb8q4O/g4kHkPxYIGJ4sJm7sqkbieNEAdxHA+lzPAxkIBxTOtORCxqGs4LGhAtTM1WBgKqJOy3EKPEekTXSK2I2E/DxQjEIQcj0CQj6k+yVkAElS7zhABhqqpEakwsHMTWBEMQFCFFVi/GxQzBLyEPvE/ICSN7AtCD9i4AZw+dmkCRIqF8wMs9TmFDoxCKSwMOcEIfME+ICDBlgDCh4M7jjs64IMInfCNtrCBFhEAG0RDpXKAHKSrPTmtjKu+AACCtJNAqMu0tNtAU2EcJySMPwTED8xBCYQnLhi9ojhEQQl8QFuwwzxbEeebRP6oREtMMAQkD7qShb6pqaIpIZ/gDJ0YQMnroEdBxVQkspOKnYWAjz2ZgJ4QgsQTEYYjAkH0DLWCwl28wV58DZ2bp2zqubyQEFxUP0FsxlQ8KT9oPliIRpDTMfM4jxaJCl3URtsTRCSpjW0QmIkqBVNUAU/IRnSsx0hxHjArR33sRkE8R3u0x35URxvzw378R7GJAAAh+QQJAwAPACwAAAAApQC6AAAE//DJSau9OOutnf/gx41kaZ5oqj4f4L5wDAh07a14ru+pN78Gw2F4WBCLiUXyGAy4aDeedEol+QSA4HDB7XaLyoSYqyibFcaDwTkQRKvweM7nEnrTW3VQeJABimALZlxDBjMDb3KKixgebnxehk8Dfw4DAwQDagIEnZ2VNC6AZ0pqAJeJjKpVjllHhUmnl1h8lwalAgO3RkkGlwSVdVtmCYa5bqvJPD58Q72HQ6e7SkY0YAfWpAZY1AeXlzO3g5uoyuYoHgHNQQBcp6ILAbqCCkttRL4CgUnyAfTYfwxR8iCkjBKBiBycW9hBnR5juYT0o7bNX5le9xIowKbPCzZdaP8WbANwRgwAYH8MmsqViuE5B0eMzKAhRCO2AmawWaxnhNIXYQdsWit1KgCaQbIo2UFDLqHLlwU3GkAjjMsSAUYJYS1QUyQ3QkO4GujFDU2CGQWSdJvBJGWZPrkQPU1GJI2LBHDBHNWZpF5QMSEBCqJ3lJ4vkkzhMe1DQMDFPm3cyjymcK4cB3hLQQSk70w9ABY1dhETDetivM5Mml6iJoDrq8DIfJzp1lQ5y1WQ1MXm7LPRt7EAaETdxAkNkAqcvFC3hpLoQagFcfzrtd1GWv9kIcO9A3OaijLbddnWYIw74fWMHwt14IyeSbQY+DU/+h0DQtLGqWkvNW5l7itghkb/AYeQJJJ1NhURUjFYiGaIHYR5JqGE8YAGSTWdcZGPgvJpmMVgEAHwH4Am/MVgGzgJxV9IRqwx004hGTThjBSa4gpciKExUhc5vVOQEeqNSOIGMJmFo0Z7ZWFQizMpFSONUEap40wCIMmUJEiQJYAx/MGFhZBDXgBTKWIYYqUZZtYT4i3yySehm1LGSQw9gPn1oIY0meXBAgwwCEWYGYxZDHpnTTXIdUjOtGKEFMoZIaM0RiVVe5BZ9xYW7VUnIqAWOHDLJlsKkiY1XuE0I59ypppqHwUExeI2HTmoVKawbsqpBJ4CIspRhY4zw28zwnmGsGbcRyOjg5FyVE4BpPVW/34GwdoarVhsB6inQYja2VFjXRmKIMSqKu6jCoTrmRZqtEFYpW8FQK0LYOKWqwN/yGSRIEkMShOk4nrmprkTorpsuchutmQ+64qjabxPYesAeweeCSp6xZbhJgL9LkvGkoMRluzGh3qGl8ThWHwRhCPZKq8QD1MyxGeEIiROxvRASgaPGg9cGIUMAOzZAU6YWlJKC6/spXhgCVCAtpZO6LO4xkIJsoxTT22QaKbAuACBAYj2q8oMOZwL0jwdWPOb5ab9tNMhE9wxiwO/vTG/PyM56NKJYeXuRi64xrAq8/6As1po0SzjhFmqUQBXsBTRYcBsx5mWdN1O1g5XWrlmwP/fisxb2szj0SC0yf+mrewZCHSIVzOrM2GIOhb2FXXOHp/u2dbXPIuFSg7g6YQBL8FEbxEjtaeWMTkW23OUPbs5MmB6sTgYIEE1AYReZ+e884wvP+uTmy36DrYqQmxDQDN34TkAjKQP++Z9pHocVBgxORNIKe9hGnL2p5ZE2ikCeFsflDTANXCOCjDZxiW2IJKpeIUSbGvTmzBmFvd8Jwt+kIQh9JCZjdgIHl7Q2eG4RyAa2E1Hs6rG7w64DJZ9qy4aaoOh/GU6YS0Pbot5wXEyAQR2uKATNdhDMV5RPMftb4Sn6wPo1EQTNeDpQYzw3GwA0aKxBct0w8KY/FYyNgj/FcsL8OOFQLDgkGsgL1Nvkxq/luAL5GAOLn5bhPAGEIt7EEKBBpJg+wyix5pxMVSECaPbwBWIMArhGAEpQgL3NTfI6SxZ5LCUSDjDHBYGKAicQFcorgMaLLaPWI+7I234A7/C8CiEd0ClppZyFnAo6GY4o1s9PrOlgQ1RJAMogLvikKuTaMIfcKkcuGhUOgqqBFahspjAlMnHjsHvlV0Io6hAyI42qIVfN1PWGAaoFiMhIRx/gAPLbLGRIW5jhsqT4A0VkDptzASdhzvl3GBpBOlJLxJZ4MODvvIxbEIHP10LA1iqsYbNIfAAD4tNHnrSNE/qUY95S6ayakZPPt0v/w1hPIA071lAXbmsdjFa4/GU9kpWkYVAB5hCL+1oPCYCa4+kE5ZXuBGuQCZrSXBTJUUrOhhqjm1FE7XZNv/gDAW6qxr5tKQVjhAOfClAWhFUG5wmU8vbUY1P8uSCIL+QU3kOw4MbLMQ7+sI/2ymBKToKwDGCcNJwdmcPVKGFUCAYoTatc6rIA2lI+9mxVAbGnoTw62KIR9RNCKeRVEPiNSHjEw+Gx4A7KF878DGVVjrGX6DEa56kRK5lhnGr0QzsHVgUiA0CqUEiDOGhSCMzfLWqrSmdg20MoaEWWdOGEGVnTqAaJ7lRlGNf4KoRUtlXx91xLAf66P5sVsUGWYWNj/8NgFIz4EJ9wHA6FTMXnHDEKJle9Wx97apGCfHMvmI1DUt6heWyaTUJ/e4xbDzqNvoQWxUk8AVg+NQ7TGaxdWKRu3BqXscUNAiQzhOnXfUjRaE5XB0B4pynBG57rZIHtdZrgFyZrgUg8REHegmonpQQjiSkxTsE4kn9vKdHZANLBvuxpEq0LdkKXFarLAaPW/AFfe2LUAdK4g8McCLz3PMDEgf5cQhmLyyTvGTi7nR6L3tmH3qRCQjdlG6jUWCoErA0gOiyviZghz5ukQAsUKxikePb7t6k1Y2VMqhYLTBOQ6tV8ZKWwYvxQWMuGk9Uru4YaLTDfIWDDoTaYrIMMtT/TX1m2BC7jb8bweaS98oxpkzPvJbWCwMJ4a4RKxnBHOuD1jKDjTUUQMMPYIdC1XCdl/bX0dXhk3/Tdrb7tGfWV50zRZ/5zLfU04PQHAJM8iCeU5AVvBNibZXqBheUmmCOBBgF8cqitnLdEHw7ImYpKYqAdvZWnhyzNZT/MbdXMFC+2KkohYa6C7/keH1ZmC5MTjLZf+QiK1jENUA02igag6UMWkQzsnz7tiAriAh7JcSwY6Kh2fq1ak6NmBgmrisAOHsEnnoYNwJtTf7iVncG8LYaedSzgCPZ0RoLb4ND6Lg8jCkmvGLODJ6zXHLR1zxqIMuOMY6Pn6rZ1WgeREVg/x0wWaL1ac4Ed04zRQQP3O+iDjnnzuYZIdbky0bTZg6YqfuyBqrjqSZ0H0wF07zb1RrJ7dUY9RhO6ZUHokh4gCFxE1iEphKX1lcjq75ykS9wbl1M7OjgLvZ7RTcFE9cotnZIRfgYA7QKXYUo6Pykc+vubcHWR3D6iQObYxcIdkasPYQuouOLcx5QeGZmIHY5OxLFn67gCBiuusk0nA56pDXwgPFiLGpuhG4ahnY4xeblVhKIANKxAHHCAaPhnLAehl+l46SsfUYGBqTufncexmAmHp07S+I3XR8u5nuv+k1PciTXHGE2we4Wd+d3S/roAKg+FQ+1bgvS/PWKAcouNf/F73SwX/AQe1BGUSFKrnBeqFJ+6hV3McIH0qB0UUImz4VLphcoDxERAZhd5gIQ1kYsaUQPxnIHXMYatZJPB8AVi/Nj9VMrgaUSF8Vw5sckhjVaIIMsCVAe15QtAAEvXCcdWbBZaGYuC8AWzYN4U0NBfsQaP0BU6UcMkVcHarESS7MuF+VkgYEPq6MJqnRE9UBWhRAqOGItFZBA9DconndFpsOBiGc7PbMx0YEjY5ElIxM9x1QVHkI0g8VwVAcWeTAEEkV8ZeUXTYJc57QljYBQW3JU4XEmr2Y6Q6gP/OdvleZrXcgkW9KHLgIDe4A9Q+AEXZMY9QJs5GdiRjAmfJj/C8O3PcWFEMJBapTAgxsWTE1wHkAFSpdCEqkTiallMli1BGrVFV94DODgApHhRR5kcUx3F1cIFsPGh3LHaYwxDdvTNnyjDklwH122hPHih53xMquHf0K3Jbl1KOzFTqrDZXa3Eq6EfaLUadPDVkxyL7d3XWngW0CzOSZEfNP4LDshH9m4PnIxhukyYxzoPsQiGCJHIapFa/+jNKsjev7wMVMXEg9yDVmwBE2VXjC4admnBToGiDf1KughGxjRD51iaEgTQzmiTvzVeglZdCCIbRepPuuTTVEzWunFODKBN83mMXiwfQvWe16RFcgWN9LREYZhDz8gJPOGKWgELdV2/ztEeCykUH08MUCAoFYLNDd+sgaeuBRxhlzRsAvcVIM46YwIhwczN2mKxTdxaAqU0gZfUgHlYyNTwRGMGC4IKXbUeBR9ogRswXw+4RHnZIJ4oUt9kylXQlg9p2gp5oK7EVyGpoWohEOztB+tchCcQQkBiSuBUAjTljzXdgbnZH1I116D4lFVdRGLU4VX+ATotBuuoHG3Zk/+llUtglDn41tWxZv1OIScOSLDRhqyN3SNKJXtF4GxRFCCOQ1bYwerUz5aIBoHoowUGUPCBgzdY5lylofvNmMhCXpE4HkiAQyUQAGS5ZEygRwox0nl8pKnEglslS7zYBV2wEWzEAp8YP8WFkadePFUusB8zQBcvWlufDAUrnlTqHE09/BUjdEG/yEE0iAQ6tFdEjJ043g6SAY04sGCAOgl3xCi+pmDWMEjnNGNDVIXtlOVpDKeSNlkhwOiMrQfRpAJmRChAIEkucmIATNfrgeTtWNSsxEJehAX3yCGuOJ4NgEeV/gwRMUWOLmGwPWFjrl4P8ORfUIpwlgZ95WYIBaEjuh5ugik0SIe8rBsYAEfs8A5uTIZU6gm5lMJ9clTx9IFj+cctBOIyzOen2KkXKobjucaoEFzQXeL7Qlrg6EJ13F/tlUDf8IBMGET1pkchjZm99B16pWhTggr3cSdInOP01INbdAYntn/V6ihNHGiE2N6T1blC+6QCSbqCw8KoSVgiuDRM0HQMqrmjvXIZwHTkAS2kKSwTcQFQOfJAvtxXSVKTGUwX2UnpXGjJGWGlBphPjZKAKj2cjNna7ADDIagnVb4m2ZnEGhRmU9yEaTVIl3DGJwgAJ5JG47XEwEUgWxxqCo2GPOKMEgBRJ2AarhyUvCjDk5KDi5Wiua2TAcDSI3EKEsqZj7BGCfhrqmGlbxQHZx1hqoiG634DjbmDZmACZ15Ag8mHqbAJYxBlOQXmYdDFu1mShJSrcfxDYflAI3RGJqHKWEJQWhYkGtDIWuAIa+kAL7ECSF7At6hRHz6kb6AE8L2jKl0/z9kcVisKjIbERnXkAQ0u6bDhrM9tT5SUmp1epZUgRPPRwZl9rGkigNgYA2RZwntAB5ORk8HSzx2hFhW5Q1KE4DlCbJOVxxrEAv3FylbkotS6gVCUUcRWa2YQLT+OoZ1pE9BIEM7wlNrR37xVreB6B5DQQhU5glOtwTc94hfeqGQWITgiDgGAqU8kQ++1LgU4B0n0WlA02HBNI8pS0T4iJS2abiLCmMLQLOea4osN3MR6KPj8lREVbeqMROuWwGvCkz7IQ2QcVS3W70fgTdpJyOzkZ7lGbx6wBzlo7NSM6m9+XAHMgSDiQtY8ag5UIrpK6DAmZJxS4pqeXzE5INA8P+ABuAJ2No7rGuseHgsGPttFDkVh0GatDAQO6AGlpBMGEG3KXmvT9twHTaJL3tj5TMm++u55bOsA7M2QygcPfupKVG2dQSby5Au4AoIdDSEsSF7JhaZ8wgtIVl1avJgnvKq3usLBDg/jEcKLtCB9uorGCEeJVkULWQJ2nmPxubC1mW9vacFmzuu42BhYlYvJ7HDD8EVTjC6P7NmCnmb+NKh88AT8rAGhvhWskpU0nUSJ4yWUKwHHbZ+cfMWmNAYnACrjMHBkvlEzNpqYbu7Z2ES9bk0PBwOSYwJRCWhdARH8ytaBuqHXmulAZOsPabD/boONFq2UKITNHMW7pC3FJH/iGmsAxn3CaA5c3EKw48cwxWMhl/0SnAHvJk8QPqJS8nDPaaRsYRzUmZRKk7QADwgIsD7cgPUE3umXlW4YniAgcJKCkBTjL+Cydh6SFhhgs8XJWUGdGb3cBYXDzU5yotTJc2LnnssKEqEF0URgKNYhcEYrDSyOlGXe1lcy5urFQ2VbB48LoKGqle5JWU2BKbsLnkMmtvweKhIXHF8C4fhxVgUhSCiMPVczQswxWA3MzRyzP3TNl3QSToxGtyUt6a8OSDbtA/TnDQ4wXE3u/urhbSzWngQnfhxrb30okNpdFTBPsMiSLdjJqLWFzr3tzpQCZ2gT/RiXb6ksjzljMOl/68RiAZnrB5aaqMDgKxsq4Nf8cNUkc8Vo3oRgg3PoKMyMRZV8nfPJqGZQFmeBxkBlHmiZb70w7F2SyH09q3RVrVUjax1MJ05KiVmAlHgUz+atmzzNRpgl8448KT1mauXqECOiQeap9C8UClznVgujBgVK6udUNV0txsf7dcivDzgo7cq5nlS98s/LQAN4LrzktaBtQ2rU9QsipYKjRcR0ZclcR0EEJGZfceZwAJfwA5sYCCN0iGw/V1UZAQdcgfhABc+edBd3AObo8Sa4AxeEQtpbYoclbLDdb1I1Ch4e2EKssH9iqwu8g2ZoNOV3Bn3IU16C8NSsT4nOxoHgUHShf8CYtWvoHkTnzEPC8ofCm2g8gpitWNjD2IML0ze2Grer5hPOdXJ/rzc5IapBDaWiKgPCxceanXfS6XOQEQEbVzdAATgcXdg3f0KHLuiJdGrWOLhnous3tCKccejIraaS6d95GVwYRW7lGVYL2BJRQIZnQDiJB2HBd1i6nWvqVyTSMSwNDpQMsG/CrG1WeCJrpFLF/tS5TYMVFQuqCEKjk3kuRsK4zOGeGOtC9etm+kuvbNTC/i05LBE51ozI6FP15DHneCZSrQHeOIsUZImOIV5l1ZnIkGBldoMj2cJd7y4TJkrU30++70jA8kadOgRzZiuvKXiMjISxyFovk0AE8D/Ybth4xmt2jQm6Jkma93tlJxQWPEgWbngCRBKEM0SFNFQ1MO2C76AtZjgQKWg3fTdtJ85kGmHLExxH7DCBUq82RPwhIqSo2lneBZXdAymUYYnbC6jxNblDuBLL1SyJcCojs2QK613zvPEka4MC/Hrk0yGvB8C5RONo02SCeq8bIURLmfBzU+SGVskydievj8GeQKoTwB0IQ8yA9GWXGwerAsYUtTjgOzpT35hZu+QEntc3p5ZegtFHqx3ZozHVW1IPJuQweAA2ZHRptPt7YtOfwLY6sxnxAiF5E7rBXdaJYH0SMZCBPXeEdgg5ROQQDVJRYVNjjUOVNk7TLLRwfk0/0qZNwtPEBdSDnx7kEnEU9Q1kwB7Ij16GICtZCCShq7atznzo9l5/vN+GFDd4M9Gl++a3l3/4Ok30ror7e15POsriJGzgmPYEx0y/4Lr6Wp6dVZh9eS/y78SG+p4qfMVTdxS4wRW8mRHXwzrmRItYwslnmdze5/n9IU+0X0U9oILmAeouKICQw1kXhUXv+DmLHySBxd9QUPam5z0hDoKKVajV036uZ+Y73uQh4+a8AwfhT9XTx+uXI9O3UyPQho/JQuc4fOvawqteYevj9ts/2iyJyOh9DOT4ZHVlAmX6DpHfVgIdQreiogPa7bmRxrLXD+3rX7ndREPdA359ekn2f8M6sjV/DJlCSdnoQReuvErEGDOOg4IEO7gwPuFAgZiAByLJKhjClsnlJNWlttDMgbBXRTFT8EAAn8LAAFwdFUIT4LgMaU+JLRN1CBjHItfYAKwLQqJISAxKKT8EongQZNpGez1j86+PSRNJ4ORpwMgHJsao4U3H5sALBMhMLUgBbg+kzhCLCgChyoqHQESgS3FFjDUNQMBOJky1yJCoonCltacgMCxphwXBwOLDYFcYIGngZg1QyZGRZrmiQOBnlSjr4QF3d0aGpUnz88Hh5yBgJoCOx62VAbLMcpEV7VItLgQAJ+6Obu8HFESfnscGNMCrcaNZqYO4hgBIFG1VxL/+ojCF8IAJwLhpoyTBoCGxD4ey8ADk03kPEpEGJyxtmCWSwUtxlBYJCfQPwwjMPBB4YEgvgovEKJ5kZDFhDerBpB5xa6XRaUGaDjgBE6jBA8GCiDNRs1aSUp9DMRzFWmkEUJxYuKT0MZZHTxtTRIkhaMGjkwGfSg7UKBSwyKTIC4g9azXARoEv2nceLiOVGkBSH4xqyAQnK9rUNZrkykTBrGd2bwIBUXAD7vMDh0M8azsUaVpIcJzKXYPkx2cGDfGcbMHElbVvBSaWdLlpHprah05EshEID2956joQYjFOITWbbCxtX1BgUdLWj5UTqn1KpEUqJrePUXHiA4TVjWY/10E2yq/I3/MC3Gmf8y0aKEgCDtEmYaHA+OLhii71jjqkBiy8wGbrrxCpbK/TAhwm1Wqak8ccsyJBgtH6gvLA8zMG8LBIWAZ0B4H3eoFGBqto4wZAYdabTVuCLnEIRMT0WYb1BzwJqMPOcLgkK7ow5CkF4rLzBr/0DqgC1piYqIoFoSyAZ4uunSLSx29O4UcC4Wjp7d/SrGAEyk+tGIibAyRphSwKCNQgAKe5IyzCbDc0p4xI1zohtfs4QWa17KpU5Sx6lvnFBGmAcpID+UcZwdHsokGA2z0vHAtfNJYEQwXPAPQMxZglLGJMstYZpkySRMhiuFMpECqZ0ByAooB5P/kzYO+otHJLD8rEaHEUV1MS7R8thRTRianpdW7B4v6aBrZBnOpOQw0IOOjJKCwSlN/JPJtrCdRaQW6XB189hQAB91OO6N2TG3abI/iJRseus3zmrWe4/aF9aAQlopfDguAhAFosbHdlqAztSlEEXU1WtSkzWchRgyS0JYWRJHsrMGCuOC3CkTsA86FqQDKOQ0rWUVgKI1w5x0omfszQOtAzvjVojj2MrvVRLrktMle6SIe55ZotY4jzxVWyScC6LIPZnUl1a/RyIqRUDEpvTeaRcu8lrVd1Q0YIuRkHYiVL7GCOeaNlhhhCxooxI+8puEJKUvjmMnkkMM3HvpsbHf/DAGdR9KcLZLeiD2TnEzxBnEHPmENKUWUy3g3q1TQEFQZnw/3csGyWUvIdZLr5BznUYMIswn4yLAbWM0ZxgfFXT3qqs8gFYmD9BtHY5Asa30mc20eD7lj12kiDQwVwdSQKialqsPc3N4ZtjOA6kUoVcXx7Due59L/HJrtf/ltfP6nliaj3SextGsPhjgJNvyN8MEDAbuBlAYGjzeYT2tw888N4hGjo7luTNhaSFv8EbHa1S4kQBKLj6iWOQAChSJswAb58hM4VDRBFwJLjou8EyaiDOhoZeNXb2pwk6UEqSQ/ilQgrLO7J8QJgAEE2ALDEJNhgI4elXlRAnRBhnk0/1BeY/vS/MiELQJdIQc6kQ2yJseCOdgFBwlbzBAZRgFufaUjFCsdhRQIuvaJjUVW7Ne0DGCO4EFCh2BwjQg4UIo6KKYTZqzCLwAmkjoBZo9roEFRPgBH45Cnio26F7b4Rz1QLdI+H/FR9yqHEUJ+QkkRg4MYMHHEKYWuEgLaYgbo0ZQHTjKG7ruXRMj1RyYWD0DbyAF0YFC1UIqSAjn0B9OceD5J2QcxmQiAuLpFMVk6r3EFaKYKdQLJILWjV9XjpQTexJ5gFhJtTnxblLqmQxZQiFzEElV5huPCRvUlFySj2QKTM7lXZGMVv/Eh914GwnCKI0rqUI5JRNKsdnpKCP8fuSMdlvhQKlaxL+BJIA3IVzOvnYU5N2HXrpxYAWAGtJAxOAAHTnZEkxgRnXGQACNpQM0wUmhg3ulVALbCi4v+RpNH4I8/pOaCjwzEfyINB3Z2gA93jO6cpzogaa4QBIbaYR84SKBCWkDNO7yhJjhcyj01qRLcEYlA/wQfUT8hNRRVgnwlOuZBVTkYOWxlllfVCkybece73rQ7sLmolNg4JRIW4l08uF8OMFVWsxaSD3xDT8XYh0+Ncm+eObKBYWpSVav6hrAt+Ws1nDgMpNynIbtCQUgTK0rcTSOwkdFkQkPiKyyaRyENFcb28rQO9F0IjQSQTDvUNYwxCJV3p9X/SDI4Z71YDKOzGfxK8HKyB+hKdUj/QGprIxsG2XkAbC1Fzy/KhVjifqIUDZGFEVYRKUh6sXTCaYEGpvHef3BgJ8ssT8rWy8d0VkpdMKjAd8sY3qKO5UeRQI8bNHDCjF73Rmh5g3UPiEIKVeCHhG2bTDBiNQArdi3DCMMF5uUBlVpXvXp6Zc4cjMAEFkh4UbNLCgCaYdSuRTJdARJadIHN9S63nShM5W2Zs0kA7VMCIrqADlwMXhgXFzWfCs5X2mo9wSQzM+vQsXAAq1sk7POHLtCKYU2b5N0kA43lQIB5aWFRDyyyxERpbn2lzGPj8CONQM1iMYYKZnQVzCsdydIx/3Hc4ws9bcTemvKK3okIw5DiS0AwsiCGi+ckJeMS1imyWtaSgCgzF7KAJjQsW0NNRcvQh/0ps1hKezdIa0o8ObAIBphK40K09MSAY5GmAZffjoTKIuUYwiz24Oj/plrVG+UWAxAwDw/HWlzxsm8GvRov3FaCouehBgMYsoQu3CEQFxa25saxJw4buxBLstITdRw2N8PkCyxxXhC2go2P7IqtPgIAeHrxTSR3+2pBu4B49mQAlKwSrw7J9B6pTGWcPY6vJ9uBXAi0DeHmW99XI0MxSwmCWKSIegIreIJbCFW5IKaXPqHb5+ZxB5D6D8MTX5ghbSa1xhrBckLowwk7WP9i3aJsNHUoQJHbRnK+GQtoMAB2FFhuRpe3YSJXGrdHcnBx8bStoTf1VqMs2kx7761vaOyTA03SS28KcpBHR/q3jzeNd5FCMB2hjci10k80oAMdYE9VDvTqNuG9IIn3tE1/j4QMsgcz6VuktEeOXWbLcLiNkfnWVtABkpjL9QZtuUCdStbklZCG6F8OPCFRMC/5YGIl5rXQMmROjVBpVXagUvpjKsKpLq0C074GyQW43XmRNiwWK3MEst2KnjGALdnMMxY1Wi2KgnAO3mvxS19Qju9g4z6gFmAKFvptCVef/koyTDZUpHsP1CNBQy/AQpNJ5Uu/3176iR0IU4Inn+z/IxHbvm/FIR95CT7kQAn1wH7QbGOHI5O49SMq6uMObNCJSGG70VOZgwIO2UiKrnoUqQkDNBqDXVCXohu7Acyw0pI1lgIe9FgJNRCDBhw+ZVkFrUEN1msNEvGVgTgSDdzAJEMB0CAhF+g3pHKDtFKZHhhBGku0umgmPLIgYMjAlZPBGawewjmKDJgJPkukUDMF9LCLC8gFYtifiDuGI0RCPHvBuviTZ5CxDOgGHsgDEXi7+xCjOgjAINpCLkw1GnyOvRCdOrGZx7CDolHDNbQ9OHHDN5w4GrQUlNsOCMoYNQQGC0A+lftDRozDMhwD/tHDCgDAIswClfNDRpRBRywBHgSBLwThAIjxBvlCgUwsxauZGyMBRVV8LxTAxEyMAAAh+QQJAwAPACwAAAAApQC6AAAE//DJSau9OOuNnf+OIAwi6HFoqq5s67aeKAK0Yd8GkNPyQJ6voHBIDHoAAp3hcFg4nQrGgsFQWJ8Lpg3pGwCL4LB49VE2sejpIpGOUqvPQ070G9vvY4chsEQzmVJySwoLNAABNAcKTGwLblWEB4gjAg54l5gpegcJUYROgogABYR0AYs+STULBiQ6kVAMCIFzXpaZuLgOnE5Ui4oKcwJLBlk+UAciU1QHDA4EAzbGSX2ys1kGlLe53GFnjldyr4XRb1PJAI4MyQLLVQytAFLBPgDQ49aBAHXd/S8ObD7JIbSjWDABzXytS/IO3TJH5AzMi8fMABtpUxBECjDii7+PGf+YeMKGJEq2AlIWFkDAMsqBAQCsLErycOaAJmz2SWxJaB81KtcOcPEIsuiukZKQJHFZzqUAlC0XBmh4KEAATutIqEt2802UQsOuZlnAUkqBfV6KGsVKSEECHgY8SXmqce6SP1LrflrT6yUABGpo+nKUTd6VVbIYJMjmY5vaXLvUDAwWs6xTiQoAN5HJDKZGd2+otJJ4TtRmKTo1AqY07EBLoakcP76zKdKcBOsql0V96p25K9kw//nDRihCvVkk9WY3xWlMoQAcZJbCOO1s2sWaLBwEGIDrlhpzNCeUQNCOdCyhI9FBA6YsNqHbHpT3JPUsOQ4caYTN73oRD03I4Vr/Ibi9s0cVCXRCWQKA7WHICIdEYRlEf3BHHScByQKWa04NgBtPC+hBVoMjWOefECKGiERcrOyUmSTqwEEDg/AksRlLu+UIFI48ooMRPTHJlMxUXilmzyv3+VTJiS4AmIUDSokkVGZfLWMbDRnxGBqPXO74hpbUHVJYM8AdsowiWYiQw065ySAbkxs4KUxMKREYFS1KtWMNjvmUxSeXgH45C0usMHHnIjkE0MhLxxXXDIn9walBiiGIkBAkrEwFGElqkgXUnoEC6qeof4oa0CxuWYQaAe1sKlRc4bkp6aTZOWHDIyzhlkxzjCEEqpajkgrqjrP8WqpoIvnilK+ZsULC/yn7JVHJm7NGdkB+WRWooRoAMKiZp8F2SWq44xYr7DpLdELFW9EAtqw4ZM1EQwDUMhkZlNE4QYMsnKUJbbnmChsqsOcSy6ccnbCiTF1g7SQUjewgUu9198rAhL7AUMFKDYkRDPCoew7Lp7HidimIjRoRREJmhBaTZFUTq2XttenM0+JXxg3z8c5+GjyuwX0GumDKbSbUUiPpJWFVzB/tcq1EL5GW8FeM1Rwwzz+X+nFoxpKsF3SXvlPofQJYZQDT3TjtAEyLIEGWOllE6XXJXQZNt5chF/ylsYRovOZX0RbDTFgG+HevD30UghJEOWhFLtZdaw3mbh2HXHnHg+KoXf+YBSRsnDRV5FAAvbMd7tkTazNIWRKDzi0w5CL3XKzPOerYUgFwC77QMOtI1+AoBaB9ien0gdLiG01gzbMUyQ0nIBQSto55Yp8SS/I6nRANmzyfJV8IAA0ED5K12fSmxjndZq6+8jxG0kgazWshpiLmVi8u16QmOB1Y8kDSO1lCCUADGiA8MYhoM8nQHW6c9RfXiepXUmiEFTL3KVSFBicn0x3lpEdBy/FIf84SQLOoxrvcIKyAYMiO4IzTDNzMpFXs49IVWIYq+fACFGiCg7Lk5x03HGt65NLQHhZmBeqIoABkykECcJe2JgTnDEoMnaUit7O2xKd5NzCEFm9wsYf/BEIONoIg9fAnqmDAaoIK8xXufscEFKKoCZWyyDnIxBUDrA9rEyxLchxECRs4r0JKSUQXmQFGHdSvdfUb4wM9kY3jhIcsbymARdzYpGIozHwJSZMjY5jHLzbSRk6YXLhoQQ1LSmYHihCU3SiISNW0TWc4ygIzulWMTOQHgcN4URXY8R32dZJTw8gSsKg3uw0iAIx+7AWiEnG56nkpWEUUClT45LJMlecAw2OCd46ZCFelxoEydEMkAjmikikSkVsCjMZepR1bTRFk5yxjc4TyqJR9IjeLCRFt4BgNKNKFARzZifIkpA810XB9W1Kl9JwJlI39ARQ7KFDA+lTBWFJJ/zxEQ5do0lFLO+QnBP08hxJjyJOgKAVWIyNmBffGUmd6ap06+MbnZqdQoK3rK6+YTgKs8raYlicP2iRA/+CTQMy9DkcSQpRBy8XQVraUehkxx0YFhw3BPFBys1AXJ3CGBD7MkhULGEMx1qYnAHYHPY8rI6GMg1aAjVGRKuVaSmharEJcLDcRYuVKr9a3/c1BIuVBjUXYEIZbjoA0CnHIQO9TGG9dNVgrbepTafrWQsUBSwl9q8EmqFRHLiAA52gHaMEws+DEa3cSAWdd9rOeg4oss5GF62TNMbuoSiM8JLiU7LqmmLjRBETcskgT/iNL1KqhMLRT6+82GSjJbnBvC/+FKlQpO7vEFfJR0OWgNVYHK8XgLLSfDesQ7pWwuFmBOTxj2cbaaqwRyXWvLS1mQpdBV5piwwlro9N737ob+mlEXZRZnA7KI14jpEkHatDVilYJKPUW5qDNvdp+5bvfCmtsjFEVizZrttdDri9GccvXQsL7xhDRxCIk5N7HHFw2B9IuSxPGm4ZSQlupmiNLdjVJMCuqUjApM2dxaUYhhFtgGPiWNLxIwMJW3DIdXE+U+RDmexOZj+plBDRkZN4SpLA2lFQ5riNrVuMGMCLtJCMYCvjHN9ajhrPAkmcKs+O5JmeNUIJJlZqVLI2lqsde9IGFVZ6oXLnVw+0KeRS8aFL/FlxiiIQAAmsKU3GohrUjYTY3rpqlb2ZhzDy/FSdCeK4pAhQ0JfXhrkaFKLIm4ChTlOGRRJKum/1C0wumwpbCctVjlWvtN0ckI2wLFZpgv/SLUiAxAZQ0bEz1YbWsuRK5tiZmfbGaUsry98Iai2q265qFhGUDXNRVn/+mhKAEgSMbb1E1B+DIkGT9GpyJQQeEU/pMat9xZPCUrZU1SzkstE2/lLscqrh17CL2BSHdQqFhj7Pog8h5Z9/r5VXJSGUx0jnX+67vhftM3wTVCCp5DtZxG7HLLRfiKh1FQX4oopANMTnOWfsyj0AjbkFd2pl17fNutI2FxCx6Yz7kt5+K/4iUxhkE3elYdcOKhA7V1khTAsMbn9xRzEtHmLLajrIUasvp5OjLy/ib3nt8kRSLNePXk1Q5RBNxmJsMDKncbOvPKP7lsDPvefqpHc435fOtb6oXml2hhyZMWbeIox6eErISR7vuh2zhHD5woJiZK+va/cnu8WOE/GygKILKfK7Mi+oTaO0Ot4TIPVjOdZI6RfZUJkPJ6rZAfnohUpU9nKlNnzvF79z6b1wRC3KwikT3BmNNpzP0gBdQ6ip8yHXQD0E3VImimFaMHIjEDegtV7Ow5NYOehBVCQLGV2YIjmxjAxG6FfSsSY8G0fhL9fA1RwNO8/MaXGVSThwGMVTWQP+3ls/ZmTV1iVEeSCEO8+JHGAJ4qXII2CV6orct8DN6zmcMqZdOlJMg8IENRycASpYAk3Jgx2UDIyBxavU95RRtx6chm0ES9ncXFWI2K7hLNEAKOOaA19B+OLgGPRE2sEVrbgAK66ErT+EdE3NLqFQsArIzNXJ7vEdvXQI9BugdZ3AFmLJHfOAyYYJWvLaF7Yd8xdIIIQB4OmIwp9QeCIEmZbMH2HQBkUEL6KdasUQD81Y3Adc+yIBKGbgXTzBB6yQ6uXMIC+Rz9AU/FaYASLQ2PJhQH4QaEHImVoAEZ7GGsnca5+UgUeV/b+YxslN1cAMdKHZ3wZcoZiB6i+FHkfD/TukUgRLINdkBJXlmVCmjMNilGJ3waxzYAdiwOW3TAFQ0c25zVHRVacc1DOrCKSQAE1Zhht6hLlnoQtCxQMVnfmnwJTikMOBWh8XSFu9mDmcXDTpALdWHjPChAKOgWujAVHfWPl/BEbhjG3SAYAxlK97RiXxQIAEkUXUljV3Yc4emO9I2aIIVdAkjJt4xiWCBG4GlZDCkfUjgWDf3ee+wGIoChCUSF1nGUgjzg2ynEhUEeDcmgTkIdKCnegyDCJ5wAEgkj/Qke5qUEc5xb1ySe7pnPcqyMZ7DBanFUuelXce0ORvDK93yKbTHfufjkTr4EjwoaDwBD95xbAQGJANQ/wAsWRguSQ9M2GBLqISZVYlypDAw8VLg90lKgxWVs1XUQVUHoo8eSWNiiDxx0xuwWD/RZG4/CHkcER0VcAbBxwel0BUAY4IF04RiRidemZMag0QPZR6m4XnmhhrA8DDc1oU4xzVnEALaQpIX9ghxIGSqgJcT0IYCcXYM8THnqDdiF2/doi9qQmvJ9AjZtkxPsSO/gE8EURnZhny1hnVPEI45GXDEAg4QdRuMyBGOcUux8AbxAJPURHkPFFnNwoHUQQLa4nVwIAhdZCXi0CoaskC3cky+Mmg9R2u4GSBl45ohhyg7UJHeNgzDQAG3ND8D6XZ/yX1bsyWeIIcH8Z279P8Ei8EDMjCKVMN9GtMI3rFR0aOPatlzA6lfLxWXbFUNx0QYMBENFJB/SqAEozkuL8I6Whkfx0RmWdEu/AIKelAiXRAbUPKJlGGRWQWEh2E0kSlVowcajHMcmEmHdWVmE+qZkZENDXgxylkXwTGTTxg6SeQeNclWJKANsqEHpLBLLfaFhHEXOSB2gBeeWAdHBEAkdhdX5FEAiAl563ELRrge2oFHDYmCxPIVesIoVbkx0EAJntkBqXQQl3Jw7OYtFvaKtnJ66UBzU/YLGCgTbDoDZMqfS3AIh1BRpLIAS9GhvhAep0AO/VNE2QANA0AABCA8bXhyoZEwZXNgDAVbRbn/m0ygDFMWNAriFcXGP0vyALMHBwIRlBMFKAlkTufCLVPQSD+4EHEKDQpnZhw4KFcQhqcHH8F4g9NoPOQwi/ZDrOLUPAhWCKwCExLgRA8VGNPEYDVCgvQGNIyGGuXwDuT4q5vKAgARJlBlYqJpSTIXmeEJB85imOunPdl5WATBKqwiAcWQJzaQFXSifRg1ce+1fQziphf2EtUqVE3iFNOpTZOKJU8wbdamMaYXNYmkcc6xbOpQGNb6AE2gDMkBsK0EKICpe8WEUxJKJDj1qybCAmiCCIbWrKeXSeVkU76ppfo1qtkoFcIYDNUqALDqBKgKB8mZN+rjqLHmVvySG0Tb/xUNUQ+aSknuGVp6Olb5sjb0GnVpoLOAqndOAXXukhWUMLR+kVTwMK6SIwtDcnMeY7SiSSefEA/7AABDsEBOphnXMgCg9Qx/Gk9P6AfGwGGEpxon50N9wyiNcUtsMx5IgF33th0zaZ89savtkjJcwRGvGgRokgPYd6oIsTYiZn7cGhrZUbRjmDk4BXBrEKKLG2c30BPDylQ+2n1cgz6POK5WUBjxQLUVkB9ts0B/8Lh19BA9pze1+Lh7RpN1ogOIsAVM0QUeUCgCshn78CGksrvMuWLOJ7tk0pd3WThEcGhiAVbiQa0OIF0kmVIESrjMVyVeJweQJ73SAb9tRyOr9P+ICxl1+WASinC2daGQvVsEQuYDZwBa3xYiQrWntAOBj1uxghJ0dckU0LCp0sEJzgNtDCl3wShXMqEqLKcrMDHA4zsX+QJWy2cAW6qspUpfJpsmBAB2GbtdUDAW1PkSPrCp1UcHM6C8EOSLHGx5YyQTQdkKAZBVZFu3YDAgAkAAltRGBOBEfIubqtgz1TmCs5UPOFAD3LcAmZqpegAkY3EaR0WOuqE3YdYtQLIuaXsIZbPECgBSUKTA4cil4IkGYdYTUcmzqiQINWB9WVHBIkIRVBeXXPI9c7NnPZtqaetluGHEAbXE2vSdWhqO/cPANscwPpxlHjYqrauwU5t/oiD/AjzVYVOXoc01lH7iqLsam6OWtgWxxMYAtWygtazAKhX4XhKoyfqJZ+oTmsZzTJoaymMsvwqzEkyFyBX3kS7sqJ1gxBc2Guwoy2uzqWqQts2gwu2giqrYcpssdOuyeTsAecMcGV2oWGmlzP3GloK4fdlcQk4hSQLQAKR1elEMCkyJX1tKelRMiIEBteFmGYQKETaswuXsRFkUZEvxWrEUpb55PpTzotuxQ0/xer5rAWOlqQHSRhE7rnc8o2iwcliMmTO2F/LKDJi6qU3gE5oqQmebNx2ZV8a0bVLVE6cQNTWJYBwoiUaQqJqKQ0Piq2ewpxGItXryVMSGLhUiDUAr/8grfcKRwDZe4wsyPV+gp4AqQrQuYhIxMY9E4DRN/Kf81I0IQYgVhgVGjSvJtSw9EBMKPMwPgLVe9gSPaoE8IaCCcrz2aY1KKyGhtQhTQQRLUM3Ywk+EsdD9HK9sGSArk6p8whRlnRyE8AxfHNentzhX8FujZCDpw4lc6JJp8tTagVOK8BwlZg/3vA4mFjcLTJTdvE4M1KVcYxLQwI09UcEDYNlrMxX112yVY0EjdXlrudf0VLN7yJQM4NVBMNiZ+qcQ0UMK+7e6HIHIp8L9I240ZanuERS3ram5vXJ8uyadULSMWheQWTcPaGeqLR5RIxCOWQhx/A8Zfc9gtStpcv8TkunawGcrHp3JSFUF9sAmreuow/zdLXKdjnrUoZIZStZLMnYNc3UfCzHJwKxE0lBJMCzWHI0NJLCuq6jfp3vUYtc+4orfgRDILT20XbsDBHVHGlJCdEd1uhY1zvI+dzGDiNYCBdoKZGY8KZrht5vfMjrGx8CoeMOd52Ept1zOKk4Sx+h2cQlVuRTQMR436XC21RgCbiw+mmAtI3gNgx0krZDaQZ7fD3ERx4BroDISe/S4bz21ZssFIxwjNVdl5Pgv1gNl5+As/ASNBCa60qtyfxAC0IB9KtK5HT6UZT6j5nARrHJ5vmwr3+B1b36uINswpceH5Z0ynitr/l0naXL/utLdB5eaw3PKhovSxPQNBUp03zbrkfaFm3enE4oodQBlKcr33MNMABPQrwhRHnvQCgLg3/8tFO5VuDoCR3+qtftzFeKw67bwu3qQMFCiqaTBCgH51scu5GoJNeS96QezHvXQjbve6xvDB51THmYCi9vVHfhrY5v9LREHG0LmBHzwJPvAKqrwAckEGIRuzZIOLwvBt8PN7cinpXqSb6wE4W1iBc8wzELLr922h7VJIyUbh17mmwq/TlkxVonQF9Gx0VCif5J0MSQ0tZtp3JFGumV+1vp8yeUNFGaUt8wz2bu+DbOHQ39mo+hkUZ5r1zZnPcmbL2yFBTVgZg8FvzvV/9LAh7WW9PB3ymvMLJ69BRtytnc9IgmdGfI2z+QSUKY4mRUwqlYPk4I2FTL8TSei69wmNo/Oo/NcMOl6uQ/cAg00WvA4yDxoLuLYDa2BkAWaiyaoDedfT7RH3wlKBnK+/JzYa23pOCGy+CSIF3o5o0U9ABM+GSKdixAEIbJ335Zqqdqx/axdUiXm0IbJUOB5CRbGO2SuZVS7i8x1uGt7UhMOpeygNKONU+Ah32mCpQWxeXrfCfqht+igoMf1hPUWhHfHOeYpTgE7HIgXAXALzk3TsXtXA2Mu9ET8DQ1nmtggmUzVTiepPwDsR5QfzdgwlOfm4gYqnNDndvO/awxPev9w7843+MR86hdLylQ+QgZSEDDAYsteTNfh3ADpYI5gECyGQVIqdav2tY4NBFQV0fMd0UDDwiAYiBYAQpLgeDSbjs0geDAYBSJeT4dQCA3ZVWo1FucqDIUoDQhcDg4AgAhw0DCdQnXRHUoPXRABBRgZlBcYizC0KYErnrKxHYqDgSIWFEqlAScnh6A4vZmBALGtHZzBAwAFU5cenEeKFZqUBIPbUCq5ykYTkw47KoGA4IAkrEuci0PEmAsDk8GwyEOFQQOCkxULa2wlJs4nL7cPKbJp08GjhK2X11KWHA2oCpKAIDSPKqpbqK4NOL/cBFrmItElQ8oK2gHS7lQpHfP/AoC6AEjJknDiZqjiheyhKR3WSJSB6APiGUkqDiTglkAVsX20NsysAAeEiSAWPgiYkAyhooIG3fBpJK2dq2nqZgwhMECdgIsZn9DoU+lLPKTnuPgAwA7dQzPwZMGogmaBy4k8AdB4Y8ATx6YC6nBwQESKoQthEiJkptOCDaRgyChwSSHNEAMiBygRIPVBnSMhWgYQlDVwty8gFR0tlWjbin0aNuyMw0tCHAAx34A4RiiZ3hh8DxUeIoizw1YHBASxVnGBg4vgpEKBloCByz+qWCkqyaVCV82BIaLYppBN3n+2UOfkMCNgkgnb8MZm1uwQWxCkcLuj5gNX9xS6ozp+/8xhVAFazwuAgaXCmoJbzGgFq5TE22yED+wQCi+6vssmP58QKeSQgpbR7QRINJumMFlq2wPAixqjDzIACtiDkA/6AwmV54wrqT+hIhrLmRFSY8OODdiCAypfIDtINkLC6KIvFDaoABoA0MmKDFuIwLCmP34Ljr4mclInwRoXWO+RQQBcJbozFFJGIfEuUUUt1OTQhJ4MwpTwNYOIPGsPaAaQ5RTO/ONjpyu4qXFKKqH4baciANnvkZOcO2K/SJiL00AfZvRJAyqAmUmWNl0LEqsJhUrAOI4yg6WVdtjBoLZCf1ssCREDpcGGq/i4wRX+VkgFurD6S2jGFsbDKiGwzP/TSygKiZQhJ2gECOuoVoakxb04jDsCUCof+GIILW0FhJ0MHULjyDZgPASoMctEKUy8HhFvr11jo25BF2hIoxFkssj1uC52YymDDaBSotpORrBESC/VncaMWxNbsbwKZCyvV4g5DSsveOMEkthPn+Np2ZPE6EKBuna75Q8YgPsG4KkUiAOVW11sNNdBaixguTyHNVBTLSX+lTzyXNMAloJgO4sPE17UMKIji16AJ5JVoRbgazFM4MrdVmx0jC4/MK7mSMW8xFw3LXbt4J/ZdWYvFozQzZIl8UzBGgaSPWAbDrowmVWUO7FgtxOF0YZULXaQdiKvNnMU5zHF7pXY6Zb/CepxtLmTw4Crm0spshuqEwmJk/OuL241hPlSQxwahfuIAAofsIyx3Gzd4nYjHC/2io/bgyNlXxbwoWt4IgWG3rxJYhPPnzBLiEYyA3Du0vl7e5AE2HB5QEkK5PRsn2c/A/tOhUqD6tyZW6+dLjzgKQOnOy++jhrp3cYW9XCLrsuXCresWIm5hzhiIHv2X14hmCBbW9rdLLBwJr7Z7SLEK57xKBGEbaijK4LBk142Fx63PYxY1ZEQ7cLmLg++LXVHolfbDiQgIVDKBnuYlvoaSI8P/Od5Hxgg6ViXjziIYHVmeJ0MxMU9nP0siHjBT/mIMLfVBS4SrKhHMGyhk1Ul/6GB4fiCbkiWBlOVyHk7bIEqUgMPajBMcbCr0NmAiIF6sHBtoiIdbtbgCARdZQacS4JwpvgYOqkwAC2zYfPMEp8P7JEMuRKfO663vwjlz4zdIYoj3CY/hEUvBIAUzd2ackcqHm8IE8gadK5mtQjKqg0VpBXDhnU91/GMcSyowj9qg8SFxRIBU8tRIN0wx6dh0gGpaMToWHEEhb3iaCuY2pFAgSiSJNOHihTbm94kBBOR8AqA41gp/mMYSVqiN5ZkICadYAQp8ABuqlDdICGBg6lxgQTXEebhSilGtOEPEWnoTg0aka0CKlFPR1IH7qJUl1x6E4YC2JpzRjCMYVotPv9MFAIomEhId8Jzcew6TyuNKAGjxBKMxJRVLm6BHEu2ypuccMBz9vg2rkwTlFrpwdDIEoeZ3SaiwdLUw7pogGiOZnJJBCXCrjE5EjTNAg6IIgFGOhwRWNEaKc1cRodZOnWeSKdreSgzIipPm/KDZPZ0ZBsrF5FbNSI+q4BB+up41OFYYyK/3KQKFnAPmn0FTMcpZvk+kJoBivGq8lxAAYgBQGGEc1QUPBgqdHLPtO1LSppA63AcMEs1bJIVmwtmdIQphg0Usx53neAJxQhPKtzjQ6Nx0tbspYVacWEpWozHTIga0MZ+joThkYaXBHk0krQiAQXQ7GgMMJG19NCq1eD/wD3wwxK7ysGTclUXYUdwq66gIA01gG1sH5MKCWhpOZ08VEJziwMqsORtZ/Erau6xktFyo3yhDYBxP5RcphWQVjZ021aRpEM7hNS6jvEEFya3VCFcSYuAu6y9ECSv8SLnt+1lcIPbi5+VKHazfMLCgVAr1y0ooADBrUD50lO+xbpwvySdGzDZuhu2fjGhGt2BVvfShU/FOML8QsN6CdWTT7bHshnul0q7o4vCvFbEIyZpKozQ1tN9oAA5Plye3KqKkSH4Bf/pUm/Oogs5DEOHhlOoVyPl4dSB5sjoqS6RjcfKjYG1AgJg1Ep1DA+geTE1qgGGPm6RZb7Nt6fy+2Sb/+o3g1kAZIFmdhUXkFRDXgZgxaTa4iB12gg0oWYOI4vZhXELVX2OVib3Fc1QL4IRQo9IS8jLzFaQh0QayPLC5zTnSVi4jC1hmLntfARydZKYGoyiAkEuqh1DjdSUKrrFadZOqRnN6MGC5WDUC+MjcbswsYhEdD9OUHeEfNZfVwsKKVXYEbQhYFwRlnoweofhmstk9nxEn6cTxlVaKYT8+gvb2dY2K1QR2ap9qx45tGytdmfVDFIz3Twttzhvd8yypmKo8gY1vbWdGVp4cbI+mKx2RullPzq5jaktN7NXRIVf/kCOhsEAQBnj8Lx5gqE7newtYraBta64ecsOXKKaPf++3DrqymzuUnwIyiAamHx4KPecyt3DEyZGryvpXEM5wdTxJeVcOrEWEOs+BQjbcGFeZNV60BneTaIDzOjI0+4QmLcHrngFDc+WtQkLqyJkqogLtp4jEqc7BHashCoMF2nYUWb07x00cyE5KOVqhEH6fgXO/yakH8eVWaVcRRWUQgMcoiz0hvu96Nv2OUFBAqBpJnct+dwzTZmVWjDM6R+6+CXSK/KBuVw785pfX87OdNunfMk/LglkqvlM869W3ZAV1Ho/b0GvobKNLTrqNe0FioW38hs0VZusCw4TQ33uMOODNXBf2zvZpdwVC1OIw3qHSsd5O/+OYz9TieOAz7r/KUM3OXvbuKTzqEKqswDHxXsaX/IHk+CGe/sxzBsAX1O/KXIAznsiwcMas5MXroiphmov9GoBrZC7HjgACPuQwmOBtCOQlls+2TtABFw/9gnAhmi9zFkJriArC+C9O3u/QmAJDvArCKKriviHhqq+I+gJg8uR1fg0EixBXYKgo2Oz6aOckEAA3biBmDmeK0sNJsKF39oHyTKSYAivLFEt5KGZ4zgvuvi6ISRCXTrBwzACORgge0MopYiZf8ih46inHOkxtvCtOPC8pZG8FpmFkQEI9Js9MowtT8gWFDi0DAO9uUkYDtgXaPiCqXlCHQQBI1izHBqt8ls7ADEA3gsG/8yTi0AkNMvLljWYHEKUA3a4hhBYKwAxByPrAN6Ahv14ipP6I+U4hQHUETH8xGyDA5LBITlAQ7LSGLv7i3BKvl6iKmhoA7b4BY/hCiPYCO9gOEDURTNTQKp6m/DaOgBLQ0mIjCqSklkZASEggAlgiL9phwTpQ4CQxjGkxmrkxRaAm7tyhKUZHbNoRIpDEoNIA4z6FhrqxrgJhXUUQnekPWvMD9UKrwB6kjcMJ1S8im/pwep7wDy4hUt5A8ybxoIkOgXcjfyQoXkchpyQRHEkKojsjUpkiSFor9DwDjVZk40MxLpIDQiBMX7AtQ+wSHDkBxPxtkqMCTfYESFsx5g0yGmZDAUWKJ/VowKdmLN70EQgxBHvcBDGIMqiLMGQ4Ql15BeuvBT0wchdGMqrHMtOgDSeUMC5kEr0AUK0vIkF8kSyjMuMUMDF4IXdoAO0tIksq4SiMgEFlEvAFLu6ICq+LMzCbIS/DEwqiQAAIfkEBQMADwAsAAAAAKUAugAABP/wyUmrvTjrnZ33gCAM4mB+HqeubOu+cPsZNEDTznHgaDiSglRsSCwaYx7dIXFYKBjQBWMhpUKvVKrOETINhMeweCwzLBXoK4KBQFgXuqz1CV1H4SBTkMzvjx0GCQl0d1ZLOwtuNgE3iXAJVGtPbVE7P2B+mZoaSQeTUQkFBQEACQwHAiEHpyRmOpAHAwClU2ZOhFOWJ5u8vR4GUndTpLMiCQixAFOsAsEMTwYEAAumBnqMTXZQOwADBJi94UZJb3AGBc8BAsBsT7ECCApuqWzaqsvWygsGAqtN8pW6EdgjriAMclmgGJgFAJqAY23kLRAQIN68APWihEikcIABSgr/qHBpwjFXt10GU25Iso1bm4UHLKJq0EbmgIoSZdWTKOLZM1U1n0wkQGKVlDVwThJUyVQCQm7FpKCKybNATTaxcLph1AhZqnhTZiWShMzEFJGB5Lk5oNRB05RPuaTqtwzVR4k20Ay6aBHNE7+n1skUsQrsvptuAg80wybXpbfhEGqhOK0xz4/t0qbxCsCitp38qK49QCqA1BFGWQ3Yt27sMBJfIGsClIWGQgONKc1TBrKeJH6YBSkRlLQhWJDU3JE4u6Dbx624d7IlAU72uBwmUz1xIEAtSAVi10jSoiM8shAM0z8nPolS836DV18NqaPeYRFurR+hnYX7On8P1USN/0LwMbHDQsU0U5MkV2zjGwMGBFDAGTw180xZ8OykSGsRoYKffkXkIJIDUwToBIS4UfHJQscwoE4q9S0o44wymgRAAWaEcNczwNm3jQizxLRGAj4AkB+IMjighQMelYWRT2wFg9RCCjJI45VYLpidALnVEuSF731E0lj3LYUkB/xN51ET3Ek0BUAhRTjLc1nWaSeNkUxZSjzWwAMWF2T2aeaZGGC3AHckJGKUiVcowI0JwNwp6aRrFDBIYyeiMoBoEMpSmKMjDEooBSLCkQpuSIWloBb8pHIUpbDaCeGEY7nBT2dpvMdWNoFRN6oFpUplXB3+NAQFKbLUGuuydSpgRv8aqBhXhY6VRhoYkEeOqiQVkTb3JFLzQBSSssyWm+U+5QlGRywD+MZWPR7Oki2S21oCTFKOADQRRub2S+kCpDw37Tq+KQAJR/EaSaiSU/jXhEKmtcOWYP5WLGlG25jH4KFjJTwvZPWeMg2D2dgqAp0Wp2znJ2wBENMUlSa7RrQABPAxU9sCssYsbDghycSbqiy0rHvZemMW08HURrQ232yQiNw1ZGqLEk3M29BYY7lAAUc52iI/Te7TGCqkOC0O1CPYIvJRCbQqZNZw03jKXmo1t5wbWazBTwA2NyUiKgRgJs+ubbxHbsXPUAPLDXH4XKdvk55yVC30PCOUARLt3Tf/XEpOpwwWInuXcuJj+mU60jrQQJLKkMQ5Qs89W8MveIuYncm2CLZYuCJv+zuu43LXGI8WNjxrsTnh5erhDoVTZIbtfGyrqKu7B9ZZv2+KTglzcpwYkpbkRVhYv/vw5hNrI+swcz8BJHB2E+pDSHAijgJVbkjah2TgDTfMaYbqt8DYPsQHuX7Jw1mEqQnX9OYyM/iiWNNwB3xERrFloWFB9IEKemyBOvgh6AYXHA9bArCKAupGUgBpWe8QgDlFSOgA0NsPt0QAh7XMjFoW9A595DSnV93pLHMiCaZaZQpzXXAfARCd5JbGvgTEkAj1Sp4pMlZBSoXwLAjiEKxMWL5A/5DJEiPDkgm1BJHmoGp429DbQ0xzOyFOpDInClOsLoQUqEQqcpIaoBMcwY0SzmiMMgphc9Cxl1N0q2Zb8EPnXsakJxnsVrHyDhxIQReVQa5npPEEFBBYpVj5zJAnYgCRXIaVNS6gDzmrDKj4NZEz4jEe3IBP3GRkxikmpYr/0lfhqGQLBrbtlH+AH4xiwhqrWNA9H8TeHGsBiSlR5EEnzBJEdnmyNZAoXIF4IgtIZLe7XC6MVuzQnAA5R/EI7yonBOUmyXY4LcmNDqyRpaM4spB9AHM/TbgVpgZHkS3uUmOPO+eV6lCjS5oTXfQEKAqZgB7LSMQRAGgA17SJJgq+zP8OrEFZQG+Iyx9exaB/dGdBt8eYyYDTnHUiEsEKNzYSyS8BbByHVBaCDpIpdGUqpNQYQSq8naIUC/dKimmWGZG6tQyiE2oARTPgR/TBTFcXiwiC2lnO4IVUSwRFpz1tRNWV6cttJYzSNEJEBVuyxSqdut6kyscvZj2Ip1kCaUauwhjr1Yqc51TVqhzRj2wSAUDqgwNP5LNWSC6rgFkVaPAa9NG5QkgobMFcYpvF0ashAK31jOlBZhgHfeEwj4Y97Fu3mNXEErRBp1iFAphkzIHO6Ii0WFAkJrIDJ8YAQLwRG6jUeidn2QB7jI3rHzFG3OLCa1wsghVAFnLJl7FIszL/qMJCWFmeoMmKT1+ZpVULWtztlTZSvvXhynrmsqAwoWdrtK0LHma09i2tvBdrGV7NNd+BEte7MxoQK5I4WSwtVxkGg6feAtAAB0ZXsBqBb1TPY9ly9feV2sCveEq7vYNZAx31LaoiivaMbKCCSO5rAW7sEozy1XSt9gNuNK/70/t+prH2SVEIptnbeHinFkOdCI5guM0ZBmKKtNPeuZTmL2jKDZCnNWdpgxvhpRHPjyt+LQbbNgtGMDBKLBhxT+JhCtp1tUbAOawYxVhfxHrXsZd8bGCKiMIOU2lkzURFAR6yAhGFOSLMyDCD9azYPtMXxo3FaofdwIUH4ymW4GRC/zyKZ4AnRjEvmenolaAK4ZEWFA5KkEOZ3zpaGGMlTgOgsZ2mal44EKgALlMBqnJRT69054d782hcs+qoUSjh1jz0xFXT3N0zZ8QosxAySv3LXpjNRAAFQJOK6uAoaMgijzel7wFoFRLUSmKHs2AzmT8q6NMy58ORHIRaHEVMyjR6AzK2VIMm8mpZhSZlBntYo8ZVbQximsjb43a+A81pdPhW2P59FeWisxCYcAK3NJhiPiQVLYtN4VKVOFDBa/YsXJhjqC3W94s97TNwT0pfUOnH9OZ8AE5QASinmFC0X5viShfOGcirGVf+V4OEE4JbN+q0HQDdbdgdqsFZuuCjgv9msHkU3GwkgoqQDLlCLDVczAL66nQptIxGscoMkMBkzQCicyY3Rg0ROY2oxXiZ8SEjLDVL9QUY1mFKNr1ZLWcWnFQYyk2+yRmbbBsJ1SKyPWnc69beHjFrpmehEH5BmuQHqku+9mXPdCOTerpOAwkFvf9jk+agASNIuAQp1cKLWMn2vifMafFe4WFsEfIY1/UQ3xjCI8guFIrkHZYTw72TcjcJO1idoLQVr8oTGvdRC1czKUlYyfn9dYlODFeyyLkOolyUOjZXgVUwCZEQNXuWJE/aC+2gfX+JpafIhakDTc6Mk2iO35u882FHgaDEBNR2g3IRJkyoPuqXF7CoQEP/Q86j3XH1bm61S+0TBQthAtpHTuhSN6qTMTVlfGCHWlXnDOPCJNrnX7aiA2nQILKzDsDCCp+TGO9wJ2/EZ9G0XJJ1S5WEWBF4UHdUPqo1E0v2ICVmBRIIDA4gDeRHI3RACOOhHN0QABawCguHZ9bwdjNyZ8fEAMGGXToRSEygeV2gYPBCJlunCGEUeKg1OdYmTBbiVe7BKkOVDLIwL01wD43SDV/WDiu3Mu+VOdV0FffWOAcCJOPTMwzYQoPEZJ/xft4VDCRxhFdFS6zCECRgCm+UCtmyLTYQJKYQLfXFff7UHPSEgPPROBI4JQjSOz5xHgXgDpUxg+vmYnZ3AIGT/2G+NYVHAWxzsYh3kCNSEGuPI4CRxCfRsTzzYQgddHlYdHhhd0MQ5Ur5tm6eJyPS92WyxV5XoVrX5xGkciFYIAUBYF3n0oSRtA2RoilvkyuHUgMiACSMcCJroTHfMyuDYxz6JoHGN2FOMB1QNmwDZTA7tg03cRMUQISZphGEtX3ZVYvNMXjPVFReIguh4g0nwAXBB0vFtxPT4gjn0Gt9CHbuwSabYmg1Mm0cZAVOIgv32CngaAkVYSdTsYQ70BFXA08CQRREYSTzgpCAuFJLoxCfGDoRaVzFZQXWgDLkJEp7dHNSIQtl6BQnV5Ex1x7+BXn+ODLsNhawRQBEYZC2I/8iHYZsQQGK57h0Evh1XIhaABKS47U9O/SIQEAQ3HQy60iC9LBMp2AadhOSTwUAT+kNjqZrSCRJtUAVXMB3mViTalAF1DNeGcRDiDgXZGlIVCILC3QnZLMs0yKWAzBufOKUAuCUFOUAe6FjOwGKTAQRWclrWeUJrKE7QWcy3wgMiOgDBJEa4UMKAGeMsqRT7lAR8iMk6+INArFUD8B2qScgYSEUyGZczoBOgbQdFZlkr8UjHuEuPwGU+QE/crA+NDGLJ3UxCjE9VTItBEkCmzUPbxMM54Bzd5WVi2UFjdRbDtE7U9QNIwAAEnCGFMcOJVgn6teaAoUXzsYbcEgRHwL/AyXEXHYgQTNEY5nYmZWQVmWmHF6JAF2WDxz5APznEQUHgnYSn7CJDKwoJKehn6KyTfw0TY4QagzAJM/RXQR6BbhhDe3iUYsZdWnFkZ3Tf/jwbPLZT8LFXYGAIblhN8XAnn+1aEk0YbHgD0/YaSXqIB6SG/AIEl5hGrd2ny4KByQAT52CGfyYoMNlZs3hbCHJVxThK39FIJyZFOgwERVpX/3lcyNglPGYcrcWByDooo4SpXYniHVCiy+2lxYBMCHRDUIiljUTlFCkHMZ0FoUGHsmZe29UEkGHWj3YEeuZm8yQBWiAlFF2nlf6dWA3OCkyAhwxqdnJo0WgKDIqOUwi/xLJiWS+dnqmQo3nIkBRoBw/AKnTxRBPQKk8CCFUqGSMFYE0sBvtUCLrsJ9FUG7mQ5EUGR07VaLCRABISEsGgmuSRYZBwE3d4wQ0NGutJmHBxatCip+ckQ+4iQHAFoo4uCmHEjij13OoBQzaaJE10TKouQ6wih8ulT0dFqWPozGcBn032K3tUBZ/KoRH0J/keijmmoNcIpEsKIEkAZdvM1fvNJzMQK+GxAhzwhCyoq88p457kgx4lhXTKLBG0J9fsA0GyyZE4a5rajeuEWV1gnpj6QGdIgtVpmBxdVOAB33/mFYfexPqkGwDCwVweYumgrLtgqk1ihRDyRETGiGbp/95P+kFgOCRfJiv07lxwRUSBCM7EeEkPxsG5XaKEIIv55qieKqusKCGvVWtZaUcUnuinqJ5E1JfXnZkvhZ2NjClXbsvihcGosqs1dkmISoNnmZCDAulZeqyXStSpwcbQTBiEpc6MpqkbHi1LZZVJ4eyfsJPEhJ7R2CqqxG4jzm4Oqm4Zxa173glB4QGKgIHPxkqD5Ai6viXYtSGO/eZ6DK4FuKbJDQABRCuF0CRn+O6G2E3JbSrSaobpxCpNTZA/VMZpqgHkCoHD6N+yMiE6GimkEOE02CKu+tCCYBsjAdFIpGyeGM4S1mk5CSWXOJnUJIKJKQF0KCSAwCp8Bps4IH/e8OVrUm7O6gApRZyIguhAMh2T0PQOXCJn3HKpCLQHgSKJX4KgZVqPbKlECpJAPbrKZfXf3W6fqg6H/IzlGHlFVGoAOMQot5QQj8ppCnKXYFHRtZjnDy4pAuicF4gABncGe+ntv41myF1pqRzsKfasGe4WlCEsgRQBacRiymrsDVZI5BwfcI5w4GBMl2WgwaZw3VQDTZ7nHYhaGR2Fq2Rg9HhunnpMgb8Ajg4mZ9DElPbHGIrnoEGPnCMGXjFemZ3DM4yEAORm4gbDJY6ZisKK5DAM1lxBVEscg0BvLmJxIBosMegKSXRmX2IQWHBqhjoKHISv4uikm6xLYdYW4HR/1paE5A6xSZSsxGYpys2ML5loBjDKxLdMbhHC5yUvLe2CkhcR26WwFee7MdvxEFloVF4ApORQxIixyRsBj/d0My46QFJ4ZSFMRmDd6oL+8B5qh3CaUJGiQXZsAAG+Q2N7LrRaIEZ+6NgrDXb0b0BmQtQKg1EUZlQI5dWJ7gegnemtYWMGsNldgY2WHWm+JTN+W03sGXSeVfJ236JYYGHoiAtcRj062jQO5kJCyENI2OEy5f8WnWg0ylWGoAFBz/96ZSU2Z7lUwLScIG3mlwsVpXRcnKSVZ0N7ZTesKET4AAkVAsm8Mjloxzf4G1nob4hKsJzFEvORb83TcvsgEdy1v/S5kScikIAEXOXeDAQ6wkOncDMcurOIzFDCetDJdqH7MqpejZZp7AzSO0UEDIQd0AaxCw8OjaIVwoWuyIy1nwoJOE56QECEjIIsizNlODG07CqriGRGt0gFNm+soIjAaNJTzWZNZ3U3qs6kMC/R2l7Ca2woAgLJ4MFpHTRmscIE1JEeOANgFsIgBIW5huRhbuFoMZbQTcuLaMO0kLSfazWACNv60PKAxUh9Bllm8Qngx01L0PV3cO67cEatukMqAdp7PKOe6msl9ysgaQNtXGLNC3OQsmoQoEYo8kWY9dnaoAXbKmjMCcvbnoHoGLa9QohRuHbSaETCjugEfl6+qv/uuqtlVCQgyRNKv6QOoxQIm2luhtmX3PtBud4i8udEa2iiDTHD0RxvNwSiHDE35jqmV3CldwyEChkK66QEIpg29XnkTBSq+h8s8KocdoK0LQQ31VyegdI0q7Q0ZiGB63XK2fEhwO6rrdE3Rg0DzRbZZEM2dot2d49PCyNgbsp14ZNLNvAeXigIzaIz525DwczMVeuI/Odz7sqDOzy23hWFilqDtth2y25XzshMuH9482x5irefnMQWTEoEHDE0eoIExpBF6yQ0VW3PcGp0XuUD6hoknK432ZeAdz0hBgVICtzI7NmaRiVMUN1CojSCvXRIPSBfYVoSygqcKL46SY7/xQPO5rGexWnmdakIgXJIwXg8dbVveQHzn51QA1IUTMHk3lg4wXFwwi3/nOJQmgNBTPHR8lcqdMt3CyDs9N+vudyGbydwgSTkxeU1eZ2O8cRmBDFoTas9hSObeMwsj7mu+WtfeEyhskYaNenKsCH/oH/W35pKVwoMlzp3H6eXWJus0cgXgipgx7VOx1fKOufjk7MEQ2KLVz6Uj5dAGwivnZ4U0c+gIxdGyWz1nX2EQczM3HFk9cfcBIf3h+QEgVz3GQXjlqn7uo8CO254I57TtOF4ggq6OPuhCI7SfGY+ixD5AOtcBJ6YCTHW13WNd+N1bJZGegmAOaI1xpIwzD8Xf/S4spCQFIrguWGlHhknLbiM4MIGLUDh8A/jXN1nb1kww7ynekol2zyWnMDUqna/d0BblCmDwfesnIbPmXtGONduxJH9lGtWyAQHrGV7uFildyHmvQOfPbP1zL4pn3bsgceSdQ6esPbBA73j3NfEaiVqkOHW4ADIkDS1+Rtfn5mnvYZb+AckXeAWWgoS1/kjYerHHYeYN4Yvh3GVp9OYxNyKB0CNI0dlO/pEJkqXZIifaJnKmI15S1BC68BxOQagbV+pB5RyUqKnn+73gZDLDHlYFz5MwholQcg942BSnuAxZn6OLwSIEFlxmIbca/m1a7Q0a8GL4z9wo60Is/lHPf/iM5ReEjBMjNGaOtucufR2RCg0AELXZyxVCZYDWEupsRMcUzJsVRFlllM2k1fmwVbN5kPgeBFCmEsC4dhJjssFAwgQTp4VK3X62EyOAwZBsOweJEAC+IM6ra2tdWnEmi1prt4bZYSChBoxyGFsgEBg4NCECQpKQesRisHBgXCDIkFAIm/jRKKszGUnM/QG1A7uJhT1FEYhoQEGYABALS/SgcCAQRLANdcAEUCx2AHLQMBTASO3UxKEQOATg2cUBW3u7rpmmk46RkRha6FYqHljO6DAS6SA62vX8ZgR4dcgQSyC93j5Urn+j9S02qpqFmjM4dNjE2bgsjJpKKWAAB+/0pUEuAOXrwnAQIoQFQMALkTT3Q18CftlJ1qOVioKtXyoIsFB0TCMgCSUhxDAD7IKGHA4sV4EzaKsDTJJplNOhmmwZEGYUpSKAkWjDMq5r5Bsxom6PIKncxXP4FigSRDBIWI97qAjDQCbb+STtlkGyU1JcJtqwK4Cpf1aDk9r/r0/EVlbFAZzgSAUJBAmU0Lex57GjhwJUupdfGWYllgRt8BS8ktWBLTlQzSYRW9O0xWhANCLSR8GWpzNtoCDS/PRXkyambOo5ogEyd6GQWIfgytLWFLkYDW8bQs6IPsmCVo5FjFcba2ockVnFtiE48nTgKRxf/m8rrLbYWkYqNfkf+HwAF8ou/hai/tLEyIWQLCzK5rsqFhAiVyMeCr9TjKJSY+ZEGtuV+gm6+RYXJZ6xtlaMtnGbMS0+lDuS6D6sTyyOPqM/XWq4enxAZp4gkK5LvwETsgXKySZ0j0pz+d/IjGC1TGs6u34GDyjKhiQlsPAfQYSOKJPQi4RAbnFrlRurMiTIMTF28LYEQQi/yNtzukKoTKBQKAyMdlnNijDx9iWmeTARQxbEsMe6pug2Y+CJNJANLSzkAkU6yrhATWRIaCWLTKJBAFszKkNNW05NOR6QD4j4gvDP0rtUjQSvC7zY6kCyU7+wtCSBebGQSEA4bCsrBNhbEACInu4QNOEIf/Y6JQQU3Z7UTfamizic8MYfBJZBQy6jyFbMz1kWYmC8dTe9aDghcRdXpR0vDcWNSFWsFIIZwgPoW2krduCCRTAli7lqwjPOWgmJqg9JTcMWLqhokxPTVuwDSpiSmAQpqYCLkKoE0jDCggOi0SjrK85V54IJkgMiD6DYQTgItgxWFvai30GTmZquwT0mplGCyc+BhMYiI+VhCiz2ZwIM/VOIaHnVIL7ZbDAEo2eZ2BGzPEA2KZJU3OZg8oYMyZHcbJkFeV/mPb0zi6tQIaKwpaaF3P4hkGZB7lVuJvDIhyXa6exlqjggsFA4wZXeBo265xvuebwJl9+jONLUQ7bV3g/4pphA6e8XrpAPr2O5Kp61xnRiphikmxWA5ej+pibE2QI44W/GVxoDw2455i0CPuX8ETq1xqVVH6ex1nIvRO8MHtoGAvGfr5wWxNWRdGucicCcC62XMDHnadGl5H8wPqNkSjQiHSA/ghZIditgXha6vKs5XvmOiYINJknuenT+PzCFfuPghPmZ78KBlui0ikn5ENgNZSH4ZAtjYNUKBf8vPHvJ7AwNGIBDkNi8l9ZEIaje2pgBdxQL4EIL22KYAP7MgeBE0osbYAriZfmEEHYvYzAm4QQzx6m9o+oiCd7O+EJpQgH/rFhHtgEGjJk2HrRlAU6RXFAvsQ1w6daDKHfP8mItboGWxiWMR4HDEtXzDKBnKSnSfucFtdIR89bPA3JCCvXliMjgM8lhog3HBwhCoWgMIIN/TgAylx7MYC6mTF9LHxMElQgSUGUBPyGQAT3xiTDu/oiVY06zFT+9l0mAVIIgpykP9hV8Qm8KaBAWE/j3zSt+a1BGfchjQeiGQar6jJjjlgX5fYmR+c8Enp8YSU/POB2K4yD4qRRkOXHOIaYXkjN4JMIQskAb+y9b9dkoNN9ONLJSF3FiG+8pitkwMQFnOCXnyTI43SWzei+SiZICVuhepCO3MIpakhoZj22iYybdk7xszjI5hgAhjYSRkGOo0rH2RUL2iHGgitKGb/vtBmPccyDMjFMZ1c1EIlopgTOWjFkUzIXi+V2LYv/AddPXGYK5/jUI5NSQQJcFM9PtoTJXROlBioVfYeWCa2qYNpnZtBMfjJxYtNBAqImydKhZbMIyqyYs/jESH0R52I2c1+SimH9vD2mEB0jgn5smVMDkmDViJBY8Y06lE3FE6mfvKGwqSOEFAXs+sBwXTL6ShXCnVEnNCPHalkBQZl8SCFYpIAA6BnWe+VhG5wSABJo6gmzuFWNkyND2dwwt/sIMJ01GlvPkyNNR3Eq0O8sKiGVZ4bE8TRin3zHu2QRRmYFs+fCQEc8UzNghCpz+FcQAlyZdQeDNDBCjJUCgIo/yxp0WZBlCyIC7L5wiHhaQuI6Ku5H/nB3sBQttxArlBLiAMGjfGNmFFSuJk0bmkR2wLARUSKg8kYAVbox+amFap8o0hrvcLMtlHneqkR62jLi8X7BEZEsfGmnDArJB/YImmuOIccRcIznhRjKfuQWn8rVNz/bvA+HYRJ9mSQnM8sRBO2qEkXfCIEyL2ClhfglVrAEN4KwvA5GM5wEQNc0mZ5oJ3ouOkTbNu2c8TvBM5YIjD3tpypHeA+xSRujY16H/WWRmBQGMTM5FSMin4Sv59cx0womGQlq5GwTjYubIjLrDhA4WnEytgg9BBk3r3ZU4eocIwFUMwxk/m/bvTe1GX8BtdVHjlUeuPbUOscXDUOlsZ6Ji2fAZCE104IofwVWDw9p2Q3wuIXt1g0ozPM50E8+rebo22pN+fGTGv6wp5mNQfNfItQT9V+QUDHYPU0CDe2Wtdt5DNs0PFrYAcB1Z3edRUiAAA7';


function newrunOld(fight)
{
if(fight=="Garden") var clapurl = "http://"+server+".clapalong.com/root/campaign!createTeam.action?campaignId=1&rule=4:0;2";
if(fight=="Lab") var clapurl = "http://"+server+".clapalong.com/root/campaign!createTeam.action?campaignId=2&rule=4:0;2";

  GM_xmlhttpRequest({  method: "GET",  url: clapurl, onload: function(response) {  } });
  status("Team creation request sent...",1);
  setTimeout(function(){GM_xmlhttpRequest({  method: "GET",  url: clapurl, onload: function(response) {  } })}, 1000);
  setTimeout(function(){GM_xmlhttpRequest({  method: "GET",  url: clapurl, onload: function(response) {  } })}, 2000);
  clapurl = "http://"+server+".clapalong.com/root/campaign!startWar.action";
  setTimeout(function(){GM_xmlhttpRequest({  method: "GET",  url: clapurl, onload: function(response) {  } })}, 5000);
  setTimeout(function(){status("Garden launch request sent...",1)}, 5000);
  setTimeout(function(){GM_xmlhttpRequest({  method: "GET",  url: clapurl, onload: function(response) {  } })}, 5500);
  setTimeout(function(){GM_xmlhttpRequest({  method: "GET",  url: clapurl, onload: function(response) {  } })}, 6000);
  
  setTimeout(function(){actionrequest(fight,0)}, 20000);
  
  //setTimeout(function(){countstarter(fight,0)}, 20000);
}




/* Daily Salary */
//Get info about it: 
//<state>1</state>  <ss>1</ss>
//at http://b8.clapalong.com/root/secretary.action?1307710696208
//GET /root/secretary.action?1307734804664 HTTP/1.1
//Get it:
//Success means: <state>1</state>
//at http://b8.clapalong.com/root/officer!saveSalary.action?1307710491515
//GET /root/officer!saveSalary.action?1307734661171 HTTP/1.1

/* League Farm Harvest */
//Get info about it: 
//<state>1</state>  <lin>6</lin>
//at http://b8.clapalong.com/root/secretary.action?1307710696208
//GET /root/secretary.action?1307734804664 HTTP/1.1
//Get it:
//at http://b8.clapalong.com/root/world!impose.action?1307711701234
//POST /root/world!impose.action?1307711701234 HTTP/1.1
//POSTDATA: resId=7



/* Get bonusdiv */ //(token)
//Get info about it: 
//LEFT = <maxtokennum>3</maxtokennum> - <tokennum>3</tokennum>
//at http://b8.clapalong.com/root/secretary.action?1307710696208
//GET /root/secretary.action?1307734804664 HTTP/1.1
//Get it:  
//http://b8.clapalong.com/root/secretary!applyToken.action?1307737701439
//GET /root/secretary!applyToken.action?1307737701439 HTTP/1.1


/* INVEST */
//<state>1</state> look for <areaid>35</areaid> based on <isselfarea>1</isselfarea>, <investable>1</investable>
//http://b8.clapalong.com/root/world!getArea.action?1307740155258
//GET /root/world!getArea.action?1307740155258 HTTP/1.1
//Get it:
//http://b8.clapalong.com/root/world!investArea.action?1307738259800
//POST /root/world!investArea.action?1307738259800 HTTP/1.1
//POSTDATA: areaId=35&investType=3
//RESULT:  //SUCCESS: <state>1</state>   //NO MORE INVEST TODAY: <state>0</state>

/* Sell crops */
//Get info about it: 
//<state>1</state> LEFT = <maxtrade>5600</maxtrade> - <crutrade>0</crutrade>
//at http://b8.clapalong.com/root/mainCity!preFoodBandC.action?1307734996731
//GET /root/mainCity!preFoodBandC.action?1307734996731 HTTP/1.1
//Get it:  
//http://b8.clapalong.com/root/mainCity!foodBandC.action?1307735006811
//POST /root/mainCity!foodBandC.action?1307735006811 HTTP/1.1
//POSTDATA: sell=5600