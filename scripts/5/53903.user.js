// ==UserScript==
// @name	 Auto Assassin
// @description  A script that will automate spymaster assassinations using Delicious
// @required     http://userscripts.org/scripts/show/52659
// ==/UserScript==

/* Save this code in a file called autoassassin.js in your macros directory */

/* Setup: 
   Install the Greasemonkey script http://userscripts.org/scripts/show/52659
   Create a new Delicious.com account. 
   (Do not use your spymaster name - use something completely random.)
   Add targets to Delicious as (private) bookmarks, tagged with SpyTarget
   The title of the new bookmark should be only the target's name.
   Use the URL 'http://playspymaster.com/assassination?autoselect=TARGET_NAME'
   Add your account USERNAME to the line containing 'http://delicious.com/USERNAME/SpyTarget'
   Set the target max on the two lines containing 'target<=XX'
   On your Delicious page set 'Sorted by' to reverse order, so newest targets are 
   at the bottom of the list. Set 'Showing bookmarks per page' to 100 
   (at the bottom of the list).

   How it works:
   The script looks for name in the SpyTarget tag and attacks targets 3 at a time, with
   20ish minute wait in between.
   Once the script runs through all targets it will wait for an hour, then start over.
   Between the hours of 11pm and 6am the script does nothing.
   
   Things to be aware of:
   This script will pull information from the results page and add a (private) 
   bookmarks to the Delicious account, tagged SpyResults. This is a good way to 
   monitor how much experience you're gaining from each attack. The resutls can be
   reviewed at any time. 
   
   If you see the error #EANF# it means something went wrong. This will happen 
   when someone is dead and cannot be attacked, you're out of energy, or the name
   doesn't exist anymore. If you lose a battle you will see #EANF# in place of your 
   experience.
   
   You have to be logged in to both Spymaster and Delicious before running this script.
   
   Enjoy! 
   ~Auto Spy
*/

var macro;
var jsLF = "\n";
var retcode, errtext;
var delay, longdelay, hourdelay;

var d = new Date();
var time = d.getHours();

/* During the off hours (11pm - 6am) wait 30 minutes, loop */ 
while ( time>=23 || time<6 ) {

/* Create the Macro */
   macro = "CODE:";
   macro += "SET !ERRORIGNORE YES" + jsLF;
   macro += "WAIT SECONDS=1800" + jsLF;
   break;

retcode = iimPlay(macro);
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

/* Set target<=XX to the total number of targets.
   After attacking total target list wait 1 hour. */

 var target = prompt("Enter target number to start with.", "1");
 while (target<=XX){

/* Attack three targets, then wait 20ish minutes */
   var i=1;
   while (i<=3 && target<=XX){

/* Assign a random 20ish second delay time */
   delay = Math.round(10*Math.random()+20);

/* Get the time of day */
  var currentTime = new Date()
  var hours = currentTime.getHours()
  var minutes = currentTime.getMinutes()

  var suffix = "AM";
  if (hours >= 12) {
  suffix = "PM";
  hours = hours - 12;
  }
  if (hours == 0) {
  hours = 12;
  }

  if (minutes < 10)
  minutes = "0" + minutes

  var curtime = (hours + ":" + minutes + "<SP>" + suffix);

/* Get your target */
   gettarget = "CODE:";
   gettarget += "SET !ERRORIGNORE YES" + jsLF;
   gettarget += "TAB T=1" + jsLF;
   gettarget += "TAB OPEN" + jsLF;
   gettarget += "TAB T=2" + jsLF;     
   gettarget += "URL GOTO=http://delicious.com/USERNAME/SpyTarget" + jsLF;
   gettarget += "TAG POS=" + target + " TYPE=H4 ATTR=* EXTRACT=TXT" + jsLF;
   gettarget += "SET !VAR1 {{!EXTRACT}}" + jsLF;
   gettarget += "TAB CLOSE" + jsLF;

retcode = iimPlay(gettarget);
  if (retcode < 0) {              // an error has occured
     errtext = iimGetLastError();
     alert(errtext);
     }

     if (retcode < 0) {          // an error has occured
         errtext = iimGetLastError();
         alert(errtext);
         break;
     }

/* Remove spaces and from target name */   
  targetname = iimGetLastExtract()
  targetname = targetname.replace(/\s+/g,"");
   
/* Attack target and record results */
   macro = "CODE:";   
   macro += "TAB T=1" + jsLF;  
   macro += "SET !EXTRACT NULL" + jsLF;   
   macro += "URL GOTO=http://playspymaster.com/assassination?autoselect=" + targetname + jsLF;
   macro += "SET !VAR1 NULL" + jsLF;
   macro += "WAIT SECONDS=4" + jsLF;
   macro += "TAG POS=1 TYPE=A ATTR=ID:assassinate-spymaster-button" + jsLF;
   macro += "WAIT SECONDS=4" + jsLF;
   macro += "SET !VAR1 {{!URLCURRENT}}" + jsLF;
   macro += "TAG POS=1 TYPE=SPAN ATTR=TXT:*. EXTRACT=TXT" + jsLF;
   macro += "SET !VAR2 {{!EXTRACT}}" + jsLF;
   macro += "SET !EXTRACT NULL" + jsLF;
   macro += "TAG POS=1 TYPE=STRONG ATTR=TXT:*% EXTRACT=TXT" + jsLF;
   macro += "SET !VAR3 {{!EXTRACT}}" + jsLF;
   macro += "SET !EXTRACT NULL" + jsLF;
   macro += "TAB OPEN" + jsLF;
   macro += "TAB T=2" + jsLF;
   macro += "URL GOTO=http://delicious.com/" + jsLF;
   macro += "SET !TIMEOUT 10" + jsLF;
   macro += "TAG POS=1 TYPE=A ATTR=ID:saveBookmark" + jsLF;
   macro += "TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:http://delicious.com/save ATTR=ID:url CONTENT={{!VAR1}}" + jsLF;
   macro += "TAG POS=1 TYPE=BUTTON ATTR=NAME:next" + jsLF;
   macro += "TAG POS=1 TYPE=TEXTAREA FORM=ACTION:http://delicious.com/save ATTR=ID:notes CONTENT=Your<SP>odds<SP>of<SP>winning<SP>were<sp>{{!VAR3}}<SP>-<SP>Target:<SP>" + target + ".<SP>Time:<SP>" + curtime + jsLF;
   macro += "SET !VAR3 NULL" + jsLF;
   macro += "TAB T=1" + jsLF;
   macro += "TAG POS=2 TYPE=SPAN ATTR=CLASS:positive EXTRACT=TXT" + jsLF;
   macro += "SET !VAR3 {{!EXTRACT}}" + jsLF;
   macro += "SET !EXTRACT NULL" + jsLF;
   macro += "TAB T=2" + jsLF;
   macro += "TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:http://delicious.com/save ATTR=ID:tags CONTENT=SpyResults" + jsLF;
   macro += "TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:http://delicious.com/save ATTR=ID:title CONTENT=Assassination<SP>Results:<SP>{{!VAR2}}<SP>Experience<SP>{{!VAR3}}" + jsLF;
   macro += "TAG POS=1 TYPE=INPUT:CHECKBOX FORM=ACTION:http://delicious.com/save ATTR=ID:share CONTENT=NO" + jsLF;
   macro += "TAG POS=1 TYPE=BUTTON ATTR=NAME:submit" + jsLF;
   macro += "TAB CLOSE" + jsLF;
   macro += "TAB T=1" + jsLF;
   macro += "WAIT SECONDS=" + delay + jsLF;

  retcode = iimPlay(macro);
  if (retcode < 0) {              // an error has occured
     errtext = iimGetLastError();
     alert(errtext);
     }

     if (retcode < 0) {          // an error has occured
         errtext = iimGetLastError();
         alert(errtext);
         break;
     }
 i++;
 target++;    
 }
/* 20ish minute wait after assassinations */

 longdelay = Math.round(10*Math.random()+1220);
 macro = "CODE:";
 macro += "WAIT SECONDS=" + longdelay + jsLF;
 
  retcode = iimPlay(macro);
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

/* Hour wait after entire target list completed */
 hourdelay = Math.round(10*Math.random()+3620);
 macro = "CODE:";
 macro += "WAIT SECONDS=" + hourdelay + jsLF;
 
  retcode = iimPlay(macro);
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

