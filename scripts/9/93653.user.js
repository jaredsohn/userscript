// ==UserScript==
// @name           ma-trialcourts firefox calendar fix
// @namespace      http://web.mit.edu/jhawk
// @description    Patch ma-trialcourts.org bugs that affects firefox. The civil and criminal calendars try to execute history.go(0), which in Firefox makes the page reload and become useless. Simply remove that line. Also update courtroom locations in Middlesex and Suffolk.
// @include        http://*ma-trialcourts.org/tcic/*app_ctx=calendar_search*
// ==/UserScript==
//
// By John Hawkinson, jhawk@mit.edu, 27 Dec 2010

// from http://wiki.greasespot.net/Content_Script_Injection
function contentEval(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}

var fixCourtRooms = function() { 
  var n;
  if (Values[8][3] == "Crim 2 (12B Cambridge)") {
    n = {}; // Middlesex Criminal
    n[2]  = "Crim 1 Ct Rm 430";
    n[3]  = "Crim 2 Ct Rm 530";
    n[4]  = "Crim 3 Ct Rm 540";
    n[5]  = "Crim 4 Ct Rm 630";
    n[6]  = "Crim 5 Ct Rm 640";
    n[7]  = "Crim 6 - Ct Rm 730";
    n[8]  = "Crim 7- (Lowell)";
    n[Values[8].length]== "Magistrate- Ct Rm 440";
    for (var i in n) Values[8][i] = Sessions[8][i] = n[i];
  }
  if (Values[8][2] == "Cr 1 (6B Cambridge)") {
    n = {}; // Middlesex Civil
    n[7]  = "Civil A - Ct Rm 710 (Woburn)";
    n[9]  = "Civil B CtRm 720 (Woburn)";
    n[10] = "Civil C CtRm 610 (Woburn)";
    n[11] = "Civil D CtRm 620 (Woburn)"; 
    n[12] = "Cv E";
    n[13] = "Civil F CtRm 510 (Woburn)";
    n[14] = "Civil G CtRm 420 (Woburn)";
    n[16] = "Civil H CtRm 520 (Woburn)";
    n[18] = "Civil J CtRm 420 (Woburn)";
    n[Values[8].length]="Civil L2 CtRm 740 (Woburn)";
    for (var i in n) Values[8][i] = Sessions[8][i] = n[i];
  }
  if (Values[12][2] == "Crim 1 Ctrm 21- 15th Fl.") {
    n = {}; // Suffolk Criminal
// suffolk civil
   n[2] = "Criminal 1 Ctrm 704";
   n[3] = "Criminal 2 Ctrm 806";
   n[4] = "Criminal 3 Ctrm 808";
   n[5] = "Criminal 4 Ctrm 815";
   n[6] = "Criminal 5 Ctrm 817";
   n[7] = "Criminal 6 Ctrm 906";
   n[8] = "Criminal 7 Ctrm 907";
   n[9] = "Criminal 8 Ctrm 914";
  n[10] = "Criminal 9 Ctrm 713";
  n[11] = "Magistrate Ctrm 705";
    for (var i in n) Values[12][i] = Sessions[12][i] = n[i];
  }
  if (Values[12][2] == "Asbestos Session (Boston)") {
    n = {}; // Suffolk Civil
   n[3]  = "Civil A, 3 Pemberton Sq, Boston";
   n[4]  = "Civil B, 3 Pemberton Sq, Boston";
   n[5]  = "Civil C, 3 Pemberton Sq, Boston";
   n[6]  = "Civil D, 3 Pemberton Sq, Boston";
   n[7]  = "Civil E, 3 Pemberton Sq, Boston";
   n[8]  = "Civil F, 3 Pemberton Sq, Boston";
   n[9]  = "Civil G, 3 Pemberton Sq, Boston";
   n[10] = "Civil H, 3 Pemberton Sq, Boston";
    n[Values[12].length]  ="CtRm 1309, 3 Pemberton Sq, Boston"; //BLS
    n[Values[12].length+1]="CtRm 1017, 3 Pemberton Sq,Boston";
    for (var i in n) Values[12][i] = Sessions[12][i] = n[i];
  }

}

if (unsafeWindow.BuildSessions) {
  //  Patch this out of BuildSessions:
  //    if(navigator.appName == "Netscape")
  //      history.go(0);
  oldBuildSessions = unsafeWindow.BuildSessions.toString();
  newBuildSessions = oldBuildSessions.replace("history.go(0);",
    'var commented_out_by_userscript = "$&";');
  contentEval("BuildSessions = "+newBuildSessions);

  // Repair broken courtrooms for some countys
  contentEval(fixCourtRooms);

}
