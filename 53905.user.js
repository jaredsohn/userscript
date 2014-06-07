// ==UserScript==
// @name	 Auto Spymaster
// @description  An iMacros script that will automate spymaster tasks and bank deposits.
// @require	 http://userscripts.org/scripts/show/52444
// ==/UserScript==

/* Save this code in a file called autospymaster.js in your macros directory */

var macrohead;
var macro;
var jsLF = "\n";
var i, retcode, errtext;
var delay;
var task;
var job;

var d = new Date();
var time = d.getHours();

/* During the off hours (11pm - 6am) wait 30 minutes, loop */ 
while ( time>=23 || time<6 ) {

/* Assign a random job (listed below) */ function getcase() {
     return Math.round(3*Math.random())+1; } job = getcase();

/* Create the Macrohead */
macrohead = "CODE:";
macrohead += "SET !ERRORIGNORE YES" + jsLF;

/* Create the Macro */
switch(job)
{
case 1: /* Wait 30 minutes */
   macro = "WAIT SECONDS=1800" + jsLF;
   break;
case 2: /* Wait 30 minutes */
   macro = "WAIT SECONDS=1800" + jsLF;
   break;
case 3: /* Deposit Monies, Wait 30 minutes (Requires GreaseMonkey Script
http://userscripts.org/scripts/show/52444) */
   macro = "URL GOTO=http://playspymaster.com/dashboard" + jsLF;
   macro += "WAIT SECONDS=" + delay  + jsLF;
   macro += "TAG POS=1 TYPE=A ATTR=TXT:Swiss<SP>Bank" + jsLF;
   macro += "WAIT SECONDS=" + delay  + jsLF;
   macro += "TAG POS=1 TYPE=INPUT:IMAGE FORM=ID:transaction-form ATTR=ID:deposit-button" + jsLF;
   macro += "WAIT SECONDS=1800" + jsLF;
   break;
default: /* Wait 30 minutes */
   macro += "WAIT SECONDS=1800" + jsLF;
}

retcode = iimPlay(macrohead+macro);
if (retcode < 0) {              // an error has occured
     errtext = iimGetLastError();
     alert(errtext);
}

     if (retcode < 0) {          // an error has occured
         errtext = iimGetLastError();
         alert(errtext);
         break;
     }

}

/* Loop between the hours of 6am and 11pm */ 
while ( time>=6 && time<23 ) {

/* Assign a random delay time */
delay = Math.round(10*Math.random());

/* Assign a random task (Only used if a task is selected from jobs) */ function gettask() {
     return Math.round(4*Math.random())+1; } task = gettask();

/* Assign a random job (listed below) */ function getcase() {
     return Math.round(4*Math.random())+1; } job = getcase();

/* Create the Macrohead */
macrohead = "CODE:";
macrohead += "SET !ERRORIGNORE YES" + jsLF; 

/* Create the Macro */
switch(job)
{
case 1: /* Wait 2 minutes */
   macro = "WAIT SECONDS=120" + jsLF;
   break;
case 2: /* Perform a Task */
   macro = "URL GOTO=http://playspymaster.com/dashboard" + jsLF;
   macro += "WAIT SECONDS=" + delay  + jsLF;
   macro += "TAG POS=1 TYPE=A ATTR=TXT:Tasks" + jsLF;
   macro += "TAG POS=" + task + " TYPE=A ATTR=TXT:Perform<SP>Task" + jsLF;
   macro += "WAIT SECONDS=" + delay  + jsLF;
   break;
case 3: /* Task again, so it happens more often */
   macro = "URL GOTO=http://playspymaster.com/dashboard" + jsLF;
   macro += "WAIT SECONDS=" + delay  + jsLF;
   macro += "TAG POS=1 TYPE=A ATTR=TXT:Tasks" + jsLF;
   macro += "TAG POS=" + task + " TYPE=A ATTR=TXT:Perform<SP>Task" + jsLF;
   macro += "WAIT SECONDS=" + delay  + jsLF;
   break;
case 4: /* Deposit Monies (Requires GreaseMonkey Script
http://userscripts.org/scripts/show/52444) */
   macro = "URL GOTO=http://playspymaster.com/dashboard" + jsLF;
   macro += "WAIT SECONDS=" + delay  + jsLF;
   macro += "TAG POS=1 TYPE=A ATTR=TXT:Swiss<SP>Bank" + jsLF;
   macro += "WAIT SECONDS=" + delay  + jsLF;
   macro += "TAG POS=1 TYPE=INPUT:IMAGE FORM=ID:transaction-form ATTR=ID:deposit-button" + jsLF;
   macro += "WAIT SECONDS=" + delay  + jsLF;
   break;
default: /* Go to the dashboard */
   macro = "URL GOTO=http://playspymaster.com/dashboard" + jsLF; }

retcode = iimPlay(macrohead + macro);
if (retcode < 0) {              // an error has occured
     errtext = iimGetLastError();
     alert(errtext);
}

     if (retcode < 0) {          // an error has occured
         errtext = iimGetLastError();
         alert(errtext);
         break;
     }

}
