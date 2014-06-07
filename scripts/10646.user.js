// ==UserScript==
// @name           OpenU's Sheilta - Automatic login
// @namespace      grease1 DOT daniboy AT antichef DOT com
// @description    Automatically logs you in to the OpenU (Complements Remember my ID script)
// @include        https://sso.apps.openu.ac.il/login?*
// @date           2007-07-14
// @version        0.1
// @GM_version     0.6.8
// ==/UserScript==

window.addEventListener("load", bootScript, false);


function bootScript() {
  
  // Get the login <input> fields
  var nodeInputID = $x("//input[@name='p_mis_student']")[0];
  var nodeUsername = $x("//input[@name='p_user']")[0];
  var nodePassword = $x("//input[@name='p_sisma']")[0];
  
  // Checks that the user, password and ID fields are populated
  if (nodeUsername.value.length > 0 && nodePassword.value.length > 0 && nodeInputID.value.length > 0) {
    
    // Get the form and submit it
    var nodeForm = $x("//form[@name='form1']")[0];
    nodeForm.submit();
    
  }
  
}




/* ----- Helper function -------------------------------------------- */


// XPath helper
function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}
