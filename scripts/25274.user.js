// ==UserScript==
// @name           OpenU's Sheilta - Remember me + Auto login
// @namespace      tag:OrgadS
// @description    This script will remember your Name, Password and ID when you login to the Israeli OpenU and will login automatically
// @include        https://sso.apps.openu.ac.il/login?*
// @include        https://sso.apps.openu.ac.il/SheiltaPortalLogin?*
// @date           2011-05-15
// @version        0.3
// @GM_version     0.6.8 
// ==/UserScript==

// Google Chrome support
if (!this.GM_getValue || this.GM_getValue.toString().indexOf("not supported")>-1) {
  this.GM_getValue=function (key,def) {
    return localStorage[key] || def;
  };
  this.GM_setValue=function (key,value) {
    return localStorage[key]=value;
  };
}

// Uncomment the next line for changing password
// GM_setValue("OpenU.p_sisma", "");

var id = register("p_mis_student");
var u = register("p_user");
var p = register("p_sisma");

if (id > 0 && u > 0 && p > 0) {
  // Get the form and submit it
  var nodeForm = $x("//form[@name='form1']");
  nodeForm.submit();
}


function register(field) {
  // Get the correct <input> for the ID
  var nodeInput = $x("//input[@name='" + field + "']");
  nodeInput.style.background = "white url(\"data:image/gif;base64,R0lGODlhEAAPALMPAP/PzqxIAAAAANaYk+uwscp+Z6diOINkW5ZPIbtyUvzGxpY+ApmYmLNUEstdEAAAACH5BAEAAA8ALAAAAAAQAA8AAAR68EmJlkUzzxW6x9qTDIMRGGRyaAkBKIThKoqRSElQADwwKL3CAmNo7HrAYIdhSvAEAgCUVwgsGI9FYyCNTgeOwGFldPV6hIIDgeWez8ASlkAQuHsDewxbUByggFAHAAUHWDZ3ZwMJCCsURgN0BANqjRoHDR4dDQZYEhEAOw==\") no-repeat center right";

  // Gets the ID1 from GM memory, and set it to field (if defined)
  var val = GM_getValue("OpenU." + field);
  if (val)
    nodeInput.value = val;

  // Save the ID in the input field to GM memory every time the field blurs
  nodeInput.addEventListener("blur",
                             function () { GM_setValue("OpenU." + field, this.value); },
                             false);

  return nodeInput.value.length;
}

/* ----- Helper function -------------------------------------------- */

// XPath helper
function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr[0];
}
