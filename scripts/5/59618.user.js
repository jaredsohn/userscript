// ==UserScript==
// @name           MythMonger AutoTurn Revamped
// @namespace      rickyok.net
// @description    MythMonger AutoTurn Revamped
// @include        http://apps.facebook.com/mythmonger/*
// ==/UserScript==

// set this to "false" (without quote) if you don't want the auto turn
var __adsColumn = document.getElementById('sidebar_ads');
var __doh_ =
       '<div>' +
       '<div><b><u><font color="red">Auto Timer</font></u></b></div>'+
       '<div><b>Messages:</b><br/><span id="__doh_Info__"></span></div><br/>' +
       '<div><b>Next Auto:</b><br/><span id="__doh_Time__">00:00</span></div>' +
       '<div><b><a href="#" id="pauselink">Pause the counter</a></b></div>' +
       '<hr/><div><b><u><font color="red">Elemental List</font></u></b></div>'+
       '<div><b>Fire -> Wood / Metal</b></div>'+
       '<div><b>Wood -> Water / Earth</b></div>'+
       '<div><b>Water -> Fire / Metal</b></div>'+
       '<div><b>Metal -> Wood / Earth</b></div>'+
       '<div><b>Earth -> Fire / Water</b></div>'+
       '<hr/><div><b><u><font color="red">Auto sell</font></u></b></div>'+
       '<div><b><a href="#" id="sellallminreq">Sell All Min Req</a></b></div>' +
       '<hr/><div><b><u><font color="red">Change Attractor</font></u></b></div>'+
       '<div><form action="http://apps.facebook.com/mythmonger/attractors.php">'+
	   '<select name="aat">'+
	   '<option value="2">Basic</option>' +
	   '<option value="5">Heroic</option>' +
	   '<option value="1">Nature</option>' +
	   '<option value="8">Tech</option>' +
	   '<option value="3">Magic</option>' +
	   '<option value="12">Dream Catcher</option>' +
	   '<option value="9">Requietory</option>' +
       '</select><input type="submit" value="Go"/></form></div>'+
       '<hr/><div><b><u><font color="red">Fast Travel</font></u></b></div>'+
       '<div><form action="http://apps.facebook.com/mythmonger/travel.php">'+
	   '<select name="qt">'+
	   '<optgroup label="City">'+
	   '<option value="3"> Town of Essert</option>' +
	   '<option value="10">Ivory City</option>' +
	   '<option value="2">Ecorae</option>' +
	   '<option value="12">New Feron</option>' +
	   '<option value="9">Fontis Sapienta</option>' +
	   '<option value="14">Kurston</option>' +
	   '</optgroup>'+
	   '<optgroup label="Other">'+
	   '<option value="1">Daphne Cove</option>' +
	   '<option value="7">Mangled Forest</option>' +
	   '<option value="18">Temple of Five</option>' +
	   '<option value="4">Teds Farm</option>' +
	   '<option value="8">Forest Hideout</option>' +
	   '<option value="6">Hedge Valley</option>' +
	   '<option value="5">Grevel Nub Arbor</option>' +
	   '<option value="13">Green Leaf Bridge</option>' +
	   '<option value="16">Troll Pit</option>' +
	   '<option value="15">Yorricks Requietory</option>' +
	   '</optgroup>'+
       '</select><input type="submit" value="Go"/></form></div>'+
       '</div><hr/><br/>';

__adsColumn.innerHTML = __doh_ + __adsColumn.innerHTML;

var __doh_ElementInfo = document.getElementById('__doh_Info__');
var __doh_ElementTime = document.getElementById('__doh_Time__');
var __doh_RemainingTime = -1;
var __doh_TimeOut = -1;
var __doh_Minute = '00';
var __doh_Second = '00';
var __doh_Counter = 0;
var __doh_Timer = 0;
var __timer_handle;
var __write_time_handle;

autoTurn();

function breakTime() {
       clearTimeout(__timer_handle);
       clearTimeout(__write_time_handle);
       __doh_ElementTime.innerHTML = "NOT RUNNING (PAUSED)";
}

function sellAllMinReq() {

       var __allA = document.getElementsByTagName('a');
       for (i in __allA) {
               var elem = __allA[i];
               if (elem.innerHTML == 'Min Req') {
                       // Trigger the event
		       triggerClick(elem);
               }
       }

       // Sell all
       //var __submitButton = document.getElementsByName('doSale').item(0);
       //triggerClick(__submitButton);
}

function triggerClick(elem) {
	var evObj = document.createEvent('MouseEvents');
	evObj.initEvent( 'click', true, true );
	elem.dispatchEvent(evObj);
}

document.getElementById('pauselink').addEventListener('click',breakTime,false);
document.getElementById('sellallminreq').addEventListener('click',sellAllMinReq,false);

function autoTurn() {
       if ((document.title.toLowerCase().indexOf("puzzle") > -1) || (document.getElementById('app79378246206_mainContent').innerHTML.indexOf('>x0</span>') != -1)) {
               __doh_ElementTime.innerHTML = "NOT RUNNING (PUZZLE / NO CARD)";
               return;
       }

       __doh_RemainingTime = unsafeWindow.a79378246206_remainingActiveTurnWaitSeconds;
       // some null is usually occurs, due it's generated on the onReload stuff... oh well...
       if (__doh_RemainingTime == null) {
               __doh_ElementInfo.innerHTML = 'timer is null!<br />going to retry again in 5 seconds - tries #' + __doh_Counter + ' (will retry 10x)';
               __doh_Counter++;

               if (__doh_Counter == 11) {
                       document.location = 'http://apps.facebook.com/mythmonger/';
               } else {
                       setTimeout(autoTurn, 5000);
               }
               return;
       }

       __doh_ElementInfo.innerHTML = "";

       // set the time, add a random 30 seconds, so it will think you're the one who click
       __doh_TimeOut = (parseInt(__doh_RemainingTime) + Math.round(Math.random() * 10) + 5) * 1000;


       // the "click"
       __timer_handle = setTimeout(function() { document.location = 'http://apps.facebook.com/mythmonger/turn.php'; }, __doh_TimeOut);

       // decoration, timer
       __doh_Timer = parseInt(__doh_TimeOut / 1000);

       // force refresh the time
       writeTime();
}

// this is just the decoration, it will show you how much time untill it will err... explode
function writeTime() {
       __doh_Minute = parseInt(__doh_Timer / 60).toString();
       __doh_Second = parseInt(__doh_Timer - (__doh_Minute * 60)).toString();

       if (__doh_Minute.length == 1) __doh_Minute = '0' + __doh_Minute;
       if (__doh_Second.length == 1) __doh_Second = '0' + __doh_Second;
       __doh_ElementTime.innerHTML = __doh_Minute + ':' + __doh_Second;

       // reduce time
       __doh_Timer -= 1;

       // repeat
       __write_time_handle = setTimeout(writeTime, 1000);
}
// END OF AUTOHUNT FEATURE
