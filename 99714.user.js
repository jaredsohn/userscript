// ==UserScript==

// @name          TestIng

// @namespace     http://www.wazzap.no

// @description   Testing 

// @include       *

// ==/UserScript==


<SCRIPT LANGUAGE = "JavaScript">
/* 
This source code is released to the public domain with the provision that 
the copyright information remains in the source code.
Copyright (c) by: Robert N Bovara All Rights Reserved.
*/
var outMsg = "";
var i = 0;
var lineNo = 1;
var timerDM=null;
var msg = " ";
function araVob() {
}
var ScreenLine = new araVob();
ScreenLine[1]  = "Doesn't this look better than status bar displays?"
ScreenLine[2]  =  "Isn't this easier to read than \"sideways\" scrollers?"
ScreenLine[3]  = " ";
ScreenLine[4]  =  "How many lines can you display on the status bar?"
ScreenLine[5]  =  "Here, you can not only display more than one line,\f ";
ScreenLine[6]  = "But, you can also display more than one \"page\" !"
ScreenLine[7]  = " ";
ScreenLine[8]  =  "Aren't you glad your browser interprets JavaScript (JScript)?"
ScreenLine[9]  = " ";
ScreenLine[10] =  "Enjoy!....\f";
ScreenLine[11] = "P.S.\t'Tis better to have no moving text at all ....."
ScreenLine[12] = "\t... than to have a \"sideways\" scroller.";
ScreenLine[13] = " \f";
/*
To change or add messages, just replace values of or add to ScreenLine[n]
above.   Each ScreenLine[n] is a separate line.  To change the "page" before 
the defined page length is reached, insert a \f character at the end of the 
line where you want the break.    Use \" for quotes and \t for tabs in the 
message text.
*/
var msgNum = 1;          // set to first message to display
var msgCnt = 13;         // set to number of last message "page" to display.
var typeSpeed = 70;      // the typing rate, in milliseconds. (Higher number is slower)
var pageLen = 5;         // set to page size, usually number of ROWS in TEXTAREA
var delay=typeSpeed;
var r = 0;
var cr="\r\n"
if ("3" <=navigator.appVersion.charAt(0)) {
 var cr="\n"
}
for (x = 1; x<=(msgCnt); x++) {
  ScreenLine[x] = ScreenLine[x] + cr;
}
msg = ScreenLine[1];

function DisplayMsg() {
  if (msg.length <= i || msg.charAt(i) == "\f") {
    r=i;
    i=0;
    ChangeMsg();
  }
  outMsg = outMsg + msg.charAt(i);
  i++; 
  if (msg.charAt(i) == "\f" || (lineNo == pageLen && i==msg.length)) {
    delay = 4000; }
  else {
  if (msg.charAt(i) == cr && msg != " "+cr) {
    delay = 2000; }
  else {
    delay = typeSpeed; } 
  }
  self.document.forms[0].elements[0].value=outMsg;
  timerDM = setTimeout("DisplayMsg()",delay);
}

function ChangeMsg() {
 msgNum++;
 if (msgCnt < msgNum) {
   msgNum = 1;
 }
 lineNo++;
 if (pageLen < lineNo || msg.charAt(r) == "\f") {
  outMsg=ScreenLine[msgNum].charAt(i);
  i++;
  lineNo = 1;
 }
  msg = ScreenLine[msgNum];
}

function quitDisplay() {
  self.document.forms[0].elements[0].value = "Type yourself a Note today!";
}
// -->
</SCRIPT>
