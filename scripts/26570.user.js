
// Connect6 Chessboard
// version 0.1 BETA!
// 2008-04-18
// Copyright (c) 2008, Taiwan Connect6 Association 
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Connect6 Chessboard", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Connect6 Chessboard
// @namespace     http://www.connect6.org/
// @description   Replace connect6 chessboard of LG web page in the client
// @include 	  http://www.littlegolem.net/jsp/game/game.jsp?*
// ==/UserScript==

// connect6 server
var nc6server = "www.connect6.org";

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Add jQuery XPath Plugin
var GM_JQ2 = document.createElement('script');
GM_JQ2.src = 'http://dev.jquery.com/view/trunk/plugins/xpath/jquery.xpath.js';
GM_JQ2.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ2);



function connect6chessboard() {
   // whether connect6 game page.
   var gametype = $("/html/body//tbody/tr/td/font/b:contains(connect6 game)");
   if (gametype==undefined) return;
   if (gametype.length<=0) return;
   
   var isProgress = gametype.html().indexOf("game in progress"); // not -1 means in proess.
   // alert("isProgress:" + isProgress);
   
   var tokens = gametype.html().split(' ');
   var gameid = tokens[2].split('(')[0];
   gameid = gameid.replace("#","");
   
   var history = $("td/p/a/font/b,td/p/font/span/b");

   var onestep;
   var history_a = new Array();
   for (var i=0; i<history.length; i++)
   {
   	  onestep = history.eq(i).html().split(".")[1];
	  if (onestep=="resign") continue;
	  onestep = onestep.replace("</SPAN>","");
          if (onestep.charAt(1)<'0' || onestep.charAt(1)>'9') continue;

	  // the highlight element..
	  if (i==history.length-1) 
	  {
	  	 var highlight_serial = parseInt(history.eq(i).html().split(".")[0])-1;
		 var old_length = history_a.length;
		 
		 // insert
		 var history_a_new = new Array();
		 for (var j=0; j<highlight_serial; j++)
		 {
		 	history_a_new.push(history_a.shift());
		 }
		 history_a_new.push(onestep);
		 for (var j=highlight_serial; j<old_length; j++)
		 {
		 	history_a_new.push(history_a.shift());
		 }
		 history_a = history_a_new;
	
		 // alert(highlight_serial+":"+onestep);
	  } else
	  	history_a.push(onestep);
   }


   // get final history string.
   var history_string = "";
   for (var i = 0; i < history_a.length; i++) 
   {
	  history_string += history_a[i];	
   }
   // alert(history_string);

   
   // whether user's turn!!   
   var player = $("/html/body/table:eq(1)/tbody/tr/td:eq(1)/table/tbody/tr/td/table/tbody/tr:eq(1)/td/table/tbody/tr/td:eq(1)/b").html();
   var blackplayer = $("/html/body/table:eq(2)/tbody/tr/td/table/tbody/tr/td:eq(1)/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr:eq(1)/td/table/tbody/tr:eq(2)/td:eq(0)/b/a").html();
   var whiteplayer = $("/html/body/table:eq(2)/tbody/tr/td/table/tbody/tr/td:eq(1)/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr:eq(1)/td/table/tbody/tr:eq(2)/td:eq(1)/b/a").html();

   
   var isWhom = 0; // 0: not user's game, 1: black, 2: white
   if (player==blackplayer) isWhom=1;
   if (player==whiteplayer) isWhom=2;

   var isUserTurn=0;
   if (isProgress!=-1 && isWhom==1 && history.length%2==0) isUserTurn=1;
   else if (isProgress!=-1 && isWhom==2 && history.length%2==1) isUserTurn=1;

   
   // get user's move
   var usermove = $("td/form/table/tbody/tr/td/b");
   if (usermove.length == 1) {
   	  history_string += usermove.eq(0).html();
	  isUserTurn = 0; // user had moved!!
   }
 
   // replace the chessboard.
   var srcstring = "";
   srcstring += "http://";
   srcstring += nc6server;
   srcstring += '/board_en/display.php?format=lgsimplesgf';
   if (isUserTurn==1) srcstring += "&click=2";
   srcstring += "&lggid=";
   srcstring += gameid;
   srcstring += "&input=";
   srcstring += history_string;

   var newboard = '<iframe width="500" height="550" frameborder="0"';
   newboard += 'scrolling="no" marginheight="0" marginwidth="0"';
   newboard += 'src="';
   newboard += srcstring;
   newboard += '"></iframe>';
   $("tbody/tr/td/table/tbody/tr/td/table/tbody//td/table").eq(1).parent().html(newboard);
}


// All your GM code must be inside this function
function letsJQuery() {
   // alert($); // check if the dollar (jquery) function works
   connect6chessboard();
}

Browser = navigator.appName;
Net = Browser.indexOf("Netscape");
var count=0;

function pausecomp(millis)
{
   var date = new Date();
   var curDate = null;

   do { curDate = new Date(); }
   while(curDate-date < millis);
} 

window.GM_wait = function() {
   if(Net >= 0) {
      if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
      else { $ = unsafeWindow.jQuery; letsJQuery(); }
   } else {
      while  (count<30 && typeof window.jQuery=='undefined') 
      { 
 	 pausecomp(200);
	 count += 1;
      }
      window.setTimeout(letsJQuery,100);
   }
}
GM_wait();
