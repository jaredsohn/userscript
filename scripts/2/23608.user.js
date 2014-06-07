// ==UserScript==
// @name           OpenU's Sheilta - Remember my Name, Password and ID (originally by daniel Rozenberg)  modified By Ezer 
// @namespace      tag:Roy E
// @description    This script will remember your Name, Password and ID when you login to the Israeli OpenU
// @include        https://sso.apps.openu.ac.il/login?*
// @date           2008-03-06
// @version        0.1
// @GM_version     0.6.8 
// ==/UserScript==


window.addEventListener("load", bootScript1, false);
window.addEventListener("load", bootScript2, false);
window.addEventListener("load", bootScript3, false);

function bootScript1() {
  
  // Get the correct <input> for the ID1
  var nodeInputID1 = $x("//input[@name='p_mis_student']")[0];
  nodeInputID1.style.background = "white url(\"data:image/gif;base64,R0lGODlhEAAPALMPAP/PzqxIAAAAANaYk+uwscp+Z6diOINkW5ZPIbtyUvzGxpY+ApmYmLNUEstdEAAAACH5BAEAAA8ALAAAAAAQAA8AAAR68EmJlkUzzxW6x9qTDIMRGGRyaAkBKIThKoqRSElQADwwKL3CAmNo7HrAYIdhSvAEAgCUVwgsGI9FYyCNTgeOwGFldPV6hIIDgeWez8ASlkAQuHsDewxbUByggFAHAAUHWDZ3ZwMJCCsURgN0BANqjRoHDR4dDQZYEhEAOw==\") no-repeat center right";
  
  // Gets the ID1 from GM memory, and set it to field (if defined)
  var strStudentID1 = GM_getValue("OpenU.ID1");
  if (strStudentID1) {
    nodeInputID1.value = strStudentID1;
  }
  
  // Save the ID1 in the input field to GM memory every time the field blurs
  nodeInputID1.addEventListener("blur", id1Changed, false);
  
}

function bootScript2() {
  
  // Get the correct <input> for the name
  var nodeInputID2 = $x("//input[@name='p_user']")[0];
  nodeInputID2.style.background = "white url(\"data:image/gif;base64,R0lGODlhEAAPALMPAP/PzqxIAAAAANaYk+uwscp+Z6diOINkW5ZPIbtyUvzGxpY+ApmYmLNUEstdEAAAACH5BAEAAA8ALAAAAAAQAA8AAAR68EmJlkUzzxW6x9qTDIMRGGRyaAkBKIThKoqRSElQADwwKL3CAmNo7HrAYIdhSvAEAgCUVwgsGI9FYyCNTgeOwGFldPV6hIIDgeWez8ASlkAQuHsDewxbUByggFAHAAUHWDZ3ZwMJCCsURgN0BANqjRoHDR4dDQZYEhEAOw==\") no-repeat center right";
  
  // Gets the name from GM memory, and set it to field (if defined)
  var strStudentID2 = GM_getValue("OpenU.ID2");
  if (strStudentID2) {
    nodeInputID2.value = strStudentID2;
  }
  
  // Save the ID2 in the input field to GM memory every time the field blurs
  nodeInputID2.addEventListener("blur", id2Changed, false);
  
}

function bootScript3() {
  
  // Get the correct <input> for the ID3
  var nodeInputID3 = $x("//input[@name='p_sisma']")[0];
  nodeInputID3.style.background = "white url(\"data:image/gif;base64,R0lGODlhEAAPALMPAP/PzqxIAAAAANaYk+uwscp+Z6diOINkW5ZPIbtyUvzGxpY+ApmYmLNUEstdEAAAACH5BAEAAA8ALAAAAAAQAA8AAAR68EmJlkUzzxW6x9qTDIMRGGRyaAkBKIThKoqRSElQADwwKL3CAmNo7HrAYIdhSvAEAgCUVwgsGI9FYyCNTgeOwGFldPV6hIIDgeWez8ASlkAQuHsDewxbUByggFAHAAUHWDZ3ZwMJCCsURgN0BANqjRoHDR4dDQZYEhEAOw==\") no-repeat center right";
  
  // Gets the ID3 from GM memory, and set it to field (if defined)
  var strStudentID3 = GM_getValue("OpenU.ID3");
  if (strStudentID3) {
    nodeInputID3.value = strStudentID3;
  }
  
  // Save the ID3 in the input field to GM memory every time the field blurs
  nodeInputID3.addEventListener("blur", id3Changed, false);
  
}


function id1Changed(e) {
  
  GM_setValue("OpenU.ID1", this.value);
  
}
function id2Changed(e) {
  
  GM_setValue("OpenU.ID2", this.value);
  
}
function id3Changed(e) {
  
  GM_setValue("OpenU.ID3", this.value);
  
}



/* ----- Helper function -------------------------------------------- */


// XPath helper
function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}
