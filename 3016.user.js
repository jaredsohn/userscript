// ==UserScript==
// @name           OpenU's Sheilta - Remember my ID
// @namespace      grease1 DOT daniboy AT antichef DOT com
// @description    This script will remember your ID when you login to the Israeli OpenU
// @include        https://sso.apps.openu.ac.il/login?*
// @date           2007-05-09
// @version        0.3
// @GM_version     0.6.8
// ==/UserScript==


window.addEventListener("load", bootScript, false);


function bootScript() {
  
  // Get the correct <input> for the ID
  var nodeInputID = $x("//input[@name='p_mis_student']")[0];
  nodeInputID.style.background = "white url(\"data:image/gif;base64,R0lGODlhEAAPALMPAP/PzqxIAAAAANaYk+uwscp+Z6diOINkW5ZPIbtyUvzGxpY+ApmYmLNUEstdEAAAACH5BAEAAA8ALAAAAAAQAA8AAAR68EmJlkUzzxW6x9qTDIMRGGRyaAkBKIThKoqRSElQADwwKL3CAmNo7HrAYIdhSvAEAgCUVwgsGI9FYyCNTgeOwGFldPV6hIIDgeWez8ASlkAQuHsDewxbUByggFAHAAUHWDZ3ZwMJCCsURgN0BANqjRoHDR4dDQZYEhEAOw==\") no-repeat center right";
  
  // Gets the ID from GM memory, and set it to field (if defined)
  var strStudentID = GM_getValue("OpenU.ID");
  if (strStudentID) {
    nodeInputID.value = strStudentID;
  }
  
  // Save the ID in the input field to GM memory every time the field blurs
  nodeInputID.addEventListener("blur", idChanged, false);
  
}


function idChanged(e) {
  
  GM_setValue("OpenU.ID", this.value);
  
}




/* ----- Helper function -------------------------------------------- */


// XPath helper
function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}
