// ==UserScript==
// @name        Google Cache Highlight Search Query Terms for HTTPS
// @namespace   JeffersonScher
// @copyright   Copyright 2013 Jefferson Scher
// @license     CC BY http://creativecommons.org/licenses/by/3.0/
// @description Restore highlighted search terms in Google cache for secure searches. For Firefox+Greasemonkey or Chrome+Tampermonkey. v0.6.4 2013-10-29
// @include     https://www.google.tld/webhp*
// @include     https://www.google.tld/search*
// @version     0.6.4
// @grant       GM_log
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_registerMenuCommand
// @require     http://www.jeffersonscher.com/gm/AnotherAutoUpdater.php?id=154167&days=3&var=GCHSQTfH&show&v064
// @grant       GM_xmlhttpRequest
// ==/UserScript==

// Make "Cached" link persistently visible -- not essential to functionality
var mysty = document.createElement("style");
mysty.appendChild(document.createTextNode(".vshid{display:inline;margin-left:6px;}")); // old layout
document.body.appendChild(mysty);

// Get/set preferences
var defaultPrefs = {
  "ssl":["Y","Use HTTPS for cache page for privacy &mdash; linked files may fail to load","(Y|N)"],
  "phrases":["Y","Keep quoted phrases together &mdash; do not highlight the words appearing alone","(Y|N)"],
  "pref3":["Y","TBD","TBD"],
  "actionstyle":["N","Convert action menu to show Cached and Similar links inline","(Y|N)"],
  "pref5":["0","TBD","TBD"]
};
var prefs = GM_getValue("prefs");
if (!prefs || prefs.length == 0){
  prefs = JSON.stringify(defaultPrefs);
  GM_setValue("prefs", prefs);
}
var oPrefs = JSON.parse(prefs);

// Convert drop-down action menu to inline v0.6.4
if (oPrefs.pref4) oPrefs = GCHSQTfH_convertPrefs(defaultPrefs, oPrefs);
if (oPrefs.actionstyle[0] == "Y"){
  mysty.appendChild(document.createTextNode(".action-menu {vertical-align:baseline !important;} .action-menu .clickable-dropdown-arrow {display:none !important;} .action-menu-panel, .action-menu-panel ul, .action-menu-item {display:inline !important; visibility: visible !important; border:none !important; box-shadow:none !important; background-color:transparent !important; margin:0  !important; padding:0 !important; top:0 !important; height:auto !important; line-height:auto !important;} .action-menu-item a.fl, .action-menu-button {padding:0 0 0 6px !important; display:inline !important;}  .action-menu-panel {position:static;} .action-menu-item a.fl:hover {text-decoration:underline !important;}"));
}

// Add menu item
GM_registerMenuCommand("Preferences for Google Cache Highlight", openPrefs);

// Add MutationObserver to catch AJAX results
var GCHSQTfH_MutOb = (window.MutationObserver) ? window.MutationObserver : window.WebKitMutationObserver;
if (GCHSQTfH_MutOb){
  var GCHSQTfH_chgMon = new GCHSQTfH_MutOb(function(mutationSet){
    mutationSet.forEach(function(mutation){
      for (var i=0; i<mutation.addedNodes.length; i++){
        if (mutation.addedNodes[i].nodeType == 1){
          GCHSQTfH_checkNode(mutation.addedNodes[i]);
        }
      }
    });
  });
  // attach chgMon to document.body
  var opts = {childList: true, subtree: true};
  GCHSQTfH_chgMon.observe(document.body, opts);
}
// Check added element for probable Cached links
function GCHSQTfH_checkNode(el){
  var clinks = el.querySelectorAll("span.vshid a:first-child, li.action-menu-item a.fl, span.flc a");
  if (clinks.length > 0) GCHSQTfH_fixlinks(clinks);
}
// Edit the Cached links
function GCHSQTfH_fixlinks(spanarray){
  // Add a mouseover listener to fix the href
  for (var j=0; j<spanarray.length; j++){
    spanarray[j].addEventListener("mouseover", GCHSQTfH_addQryTerms, false);
  }
}
function GCHSQTfH_addQryTerms(e){
  if (e.target.nodeName != "A") return;
  var qry = GCHSQTfH_getQuery();
  var savedQry = e.target.getAttribute("GCHSQTfH");
  if (!savedQry) savedQry = "";
  if (savedQry == qry) return;
  // v0.6.2 Remove incorrectly embedded query terms in heirloom serp mode 
  var qsp = window.location.href.indexOf("?");
  var q0 = "";
  if (qsp > 0){
    var qs = window.location.href.substr(qsp+1);
    var qa = qs.split("&");
    for (var j=0; j<qa.length; j++){
      if (qa[j].split("=")[0] == "q"){
        q0 = qa[j].split("=")[1];
      }
      if (qa[j].indexOf("#q=") > -1){
        q0 = qa[j].split("=")[1];
      }
    }
    if (q0 != ""){
      var qryEnc = "%2B" + q0 + "&";
      e.target.setAttribute("href", e.target.getAttribute("href").replace(qryEnc, "+&"));
    }
  }
  // Update href to use HTTPS cache (per user preference) and include query terms in the link
  if (savedQry != ""){
    e.target.setAttribute("href", e.target.getAttribute("href").replace(savedQry+"&", qry+"&"));
  } else {
    if (oPrefs.ssl[0] == "Y"){
      e.target.setAttribute("href", e.target.getAttribute("href").replace("http://webcache.", "https://webcache."));
    }
    e.target.setAttribute("href", e.target.getAttribute("href").replace("+&", "+"+qry+"&"));
  }
  e.target.setAttribute("GCHSQTfH", qry);
  if (e.target.hasAttribute("onmousedown")) e.target.removeAttribute("onmousedown"); // v0.5.4
}
// Try to get the best set of query terms for matching
function GCHSQTfH_getQuery(){
  // Find current query terms
  // Check for corrected spelling first, then query form
  var spell_mod = document.querySelector("span#taw a.spell");
  if (spell_mod && spell_mod.parentNode.querySelector("span.spell_orig")){
    return GCHSQTfH_cleanQuery(spell_mod.textContent.replace(/\+/g, "%2B").replace(/\s/g, "+"));
  } else {
    var qbox = document.querySelector("form[action='/search'] input[name='q']");
    if (qbox){
      var q = qbox.value.replace(/\+/g, "%2B").replace(/\s/g, "+");
      if (q.length > 0) return GCHSQTfH_cleanQuery(q);
    }
    var qsp = window.location.href.indexOf("?");
    if (qsp > 0){
      var qs = window.location.href.substr(qsp+1);
      var qa = qs.split("&");
      for (var j=0; j<qa.length; j++){
        if (qa[j].split("=")[0] == "q"){
          var q0 = qa[j].split("=")[1].replace(/\s/g, "+").replace(/%22/g, '"');
        }
        if (qa[j].indexOf("#q=") > -1){
          var q0 = qa[j].split("#q=")[1].replace(/\s/g, "+").replace(/%22/g, '"');
        }
      }
      if (q0) return GCHSQTfH_cleanQuery(q0);
      else return "";
    }
  }
}
function GCHSQTfH_cleanQuery(s){
  var pos1 = s.indexOf('-"');
  var pos2, tmp = "", t2 = "", ret;
  while (pos1 > -1){
    pos2 = s.indexOf('"', pos1+2);
    if (pos2 == -1) break;
    if (pos2 > pos1){
      if (pos1 > 0) tmp = s.substr(0, pos1);
      if (pos2 < s.length-2){
        if (tmp.length>0) tmp += s.substr(pos2+1);
        else tmp += s.substr(pos2+2);
      }
      s = tmp;
    }
    pos1 = s.indexOf('-"');
  }
  var pos1 = s.indexOf('"');
  while (pos1 > -1){
    pos2 = s.indexOf('"', pos1+1);
    if (pos2 == -1) break;
    if (pos2 > pos1){
      if (pos1 > 0) tmp = s.substr(0, pos1);
      t2 = s.substr(pos1+1, pos2-pos1-1);
      if (oPrefs.phrases[0] == "Y"){
        t2 = t2.replace(/\+/g, "-"); //sticks phrase together
      }
      if (pos2 < s.length-2){
        if (tmp.length>0) tmp += t2 + "+" + s.substr(pos2+1);
        else tmp += t2 + "+" + s.substr(pos2+2);
      } else {
        tmp += t2;
      }
      s = tmp;
    }
    pos1 = s.indexOf('"');
  }
  s = s.replace(/"/g, "");
  var terms = s.replace(/\++/g, "+").split("+");
  for (var k=0; k<terms.length; k++){
    if (terms[k].indexOf("-")==0 || terms[k].indexOf("site:")==0 || 
        terms[k].indexOf("inurl:")==0 || 
        terms[k].toLowerCase()=="or" || terms[k]=="&") terms[k] = "";
  }
  while (terms[terms.length-1]=="") ret = terms.pop();
  s = terms.join("+");
  return s.replace(/\++/g, "+").replace("&", "%26").replace("#", "%23"); // 0.6.3 fix #
}
// Initial run to add event listeners
GCHSQTfH_checkNode(document.body);

function openPrefs(e){
  var pform = document.getElementById("GCHSQTfH_pform");
  if (pform){
    pform.display = "block";
  } else {
    pform = document.createElement("div");
    pform.id = "GCHSQTfH_pform";
    pform.setAttribute("style", "position:fixed;bottom:0;background:#00f;color:#fff;font-weight:bold;font-size:20px;width:100%;z-index:999");
    pform.innerHTML= "<form onsubmit=\"return false;\"><button style=\"float:right\" id=\"btncacheClose\">X</button>" +
    "<label title=\"Switch between HTTP and HTTPS cache views\"><input " +
    "type=\"checkbox\" name=\"chkcacheSSL\" id=\"chkcacheSSL\"> " + oPrefs.ssl[1] + "</label><br>" +
    "<label title=\"Switch between phrases and separate words\"><input type=\"checkbox\" name=\"chkcachePhrases\" " +
    "id=\"chkcachePhrases\"> " + oPrefs.phrases[1] + "</label><br>" +
    "<label title=\"Convert action menu to inline display\"><input type=\"checkbox\" name=\"chkcacheActionStyle\" " +
    "id=\"chkcacheActionStyle\"> " + oPrefs.actionstyle[1] + " (reload after changing)</label></form>";
    document.body.appendChild(pform);
  }
  GCHSQTfH_fixssl();
  GCHSQTfH_fixphrases();
  GCHSQTfH_fixactionstyle();
  document.getElementById("btncacheClose").addEventListener("click", GCHSQTfH_closeprefs, false);
  document.getElementById("chkcacheSSL").addEventListener("change", GCHSQTfH_updtssl, false);
  document.getElementById("chkcachePhrases").addEventListener("change", GCHSQTfH_updtphrases, false);
  document.getElementById("chkcacheActionStyle").addEventListener("change", GCHSQTfH_updtactionstyle, false);
}
function GCHSQTfH_updtssl(e){ // Store setting for HTTP vs. HTTPS cached pages
  var chk = e.target;
  if (chk.checked){
    oPrefs.ssl[0] = "Y";
  } else {
    oPrefs.ssl[0] = "N";
  }
  GM_setValue("prefs", JSON.stringify(oPrefs));
  GCHSQTfH_fixssl();
}
function GCHSQTfH_fixssl(){  // Adjust checkbox for HTTP vs. HTTPS cached pages
  var chk = document.getElementById("chkcacheSSL");
  if (oPrefs.ssl[0] == "Y"){
    chk.setAttribute("checked","checked");
    chk.checked = true;
  } else {
    chk.removeAttribute("checked");
    chk.checked = false;  
  }
}
function GCHSQTfH_updtphrases(e){ // Store setting for phrases vs individual words
  var chk = e.target;
  if (chk.checked){
    oPrefs.phrases[0] = "Y";
  } else {
    oPrefs.phrases[0] = "N";
  }
  GM_setValue("prefs", JSON.stringify(oPrefs));
  GCHSQTfH_fixphrases();
}
function GCHSQTfH_fixphrases(){  // Adjust checkbox for phrases vs individual words
  var chk = document.getElementById("chkcachePhrases");
  if (oPrefs.phrases[0] == "Y"){
    chk.setAttribute("checked","checked");
    chk.checked = true;
  } else {
    chk.removeAttribute("checked");
    chk.checked = false;  
  }
}
function GCHSQTfH_updtactionstyle(e){ // Store setting for drop-down vs inline action links v0.6.4
  var chk = e.target;
  if (chk.checked){
    oPrefs.actionstyle[0] = "Y";
  } else {
    oPrefs.actionstyle[0] = "N";
  }
  GM_setValue("prefs", JSON.stringify(oPrefs));
  GCHSQTfH_fixactionstyle();
}
function GCHSQTfH_fixactionstyle(){  // Adjust checkbox for drop-down vs inline action links v0.6.4
  var chk = document.getElementById("chkcacheActionStyle");
  if (oPrefs.actionstyle[0] == "Y"){
    chk.setAttribute("checked","checked");
    chk.checked = true;
  } else {
    chk.removeAttribute("checked");
    chk.checked = false;  
  }
}
function GCHSQTfH_closeprefs(e){
  e.target.parentNode.parentNode.style.display = "none";
}
function GCHSQTfH_convertPrefs(oDefault, oUser){ // Conform old objects to new defaults preserving values v0.6.4
  oDefault.ssl[0] = oUser.ssl[0];
  oDefault.phrases[0] = oUser.phrases[0];
  if (oUser.pref4){
    oDefault.actionstyle[0] = oUser.pref4[0];
  } else {
    oDefault.actionstyle[0] = oUser.actionstyle[0];
  }
  GM_setValue("prefs",JSON.stringify(oDefault));
  return oDefault;
}