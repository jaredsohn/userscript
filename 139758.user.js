// ==UserScript==
// @name        Google site: Tool (Site results / Exclude sites)
// @namespace   JeffersonScher
// @version     1.1.7
// @copyright   Copyright 2013 Jefferson Scher
// @license     CC BY http://creativecommons.org/licenses/by/3.0/
// @description Easily add site: or -site: to modify your current Google query. v1.1.7 2013-09-22
// @include     http*://www.google.tld/*
// @include     http*://encrypted.google.tld/*
// @grant       GM_getValue
// @grant       GM_setValue
// @require     http://www.jeffersonscher.com/gm/AnotherAutoUpdater.php?id=139758&days=3&var=GsT&show&v117
// @grant       GM_registerMenuCommand
// @grant       GM_xmlhttpRequest
// ==/UserScript==
// DISCLAIMER:     Use at your own risk. Functionality and harmlessness cannot be guaranteed.

var gst_sty = document.createElement("style");
gst_sty.setAttribute("type", "text/css");
gst_sty.appendChild(document.createTextNode(".ghhpane{position:absolute;color:#333;background-color:#fcfcfc;border:1px solid #ccc;" +
  "border-radius:4px;padding:0.25em 1.5em;font-size:13px;display:none} .ghhd{position:relative;line-height:1.2em;cursor:pointer;} " +
  "#gstSiteForm input[type='radio']{vertical-align:bottom;margin-top:5px;margin-bottom:1px} "));
document.body.appendChild(gst_sty);

// Get preferences from browser
var defaultPrefs = {
  "seemore":["Y-N","Add See More Results links (Y|N), Open in a new window (Y|N)"],
  "subdomain":["N","Strip leftmost subdomain (Y=all|N=www only)"],
  "reserved2":["X","Y"]
};
var gstPrefs = GM_getValue("gstPrefs");
if (!gstPrefs || gstPrefs.length == 0){
  var gstPrefO = defaultPrefs;
} else {
  if (gstPrefs.indexOf("reserved1")>-1){ // update with new preferences
    var gstPrefO = convertPrefs(defaultPrefs, gstPrefs);
    GM_setValue("gstPrefs",JSON.stringify(gstPrefO));
  } else {
    var gstPrefO = JSON.parse(gstPrefs);
  }
}
var seemorelink = gstPrefO.seemore[0];
var stripany = gstPrefO.subdomain[0];

// == == == Detect added nodes / attach MutationObserver == == ==
if (document.body){
  // Add click events
  gst_checkNode(document.body);
  // Create form
  if (!document.getElementById("gstSiteForm")) gst_addSiteForm();
  // Watch for changes that could be new instant or AJAX search results
  var MutOb, chgMon, i, httpels, opts;
  var MutOb = (window.MutationObserver) ? window.MutationObserver : window.WebKitMutationObserver;
  if (MutOb){
    chgMon = new MutOb(function(mutationSet){
      mutationSet.forEach(function(mutation){
        for (i=0; i<mutation.addedNodes.length; i++){
          if (mutation.addedNodes[i].nodeType == 1){
            gst_checkNode(mutation.addedNodes[i]);
          }
        }
      });
    });
    // attach chgMon to document.body
    opts = {childList: true, subtree: true};
    chgMon.observe(document.body, opts);
  }
}

function gst_checkNode(el){
  if (el.nodeName == "LI") var liels = [el];
  else var liels = el.querySelectorAll('li');
  if (liels.length > 0){
    var i, cite, ael;
    for (var i=0; i<liels.length; i++){
      var cite = liels[i].querySelector('cite');
      if (cite){if (!cite.hasAttribute("sitelistener")){
        if (cite.parentNode.nodeName == "A"){
          // TODO - this is for cites under bunches of news articles; need to exclude Google
        } else {
          var ael = liels[i].querySelector("h3 a");
          if (!ael) ael = liels[i].querySelector("a");
          if (ael){
            if(ael.hasAttribute("href")){
              if (ael.getAttribute("href").indexOf("http")==0 || ael.getAttribute("href").indexOf("/interstitial")==0){
                cite.setAttribute("sitelistener", ael.getAttribute("href").substr(ael.getAttribute("href").indexOf("http")));
              } else {
                cite.setAttribute("sitelistener", cite.textContent);
              }
            } else {
              cite.setAttribute("sitelistener", cite.textContent);
            }
          } else {
            cite.setAttribute("sitelistener", cite.textContent);     
          }
        }
        if (cite.hasAttribute("sitelistener")){
          cite.style.cursor = "pointer";
          cite.setAttribute("title","Limit search to this site or exclude this site");
          cite.addEventListener("click", gst_showSiteForm, false);
        }
        if (seemorelink.split("-")[0] == "Y"){
          var divmas = liels[i].querySelector("div.s div.mas");
          if (divmas){
            divmas.style.marginLeft = "22px";
            var citehost = cite.textContent;
            if (citehost.indexOf("http://") == 0) citehost = citehost.substr(7);
            if (citehost.indexOf("https://") == 0) citehost = citehost.substr(8);
            if (citehost.indexOf("ftp://") == 0) citehost = citehost.substr(6);
            if (citehost.indexOf(" ") > 0) citehost = citehost.substr(0, citehost.indexOf(" "));
            if (citehost.indexOf("/") > 0) citehost = citehost.substr(0, citehost.indexOf("/"));
            var locnew = gst_reQry("+site:"+citehost, false);
            if (locnew != "cancel"){
              var pnew = document.createElement("p");
              pnew.setAttribute("style", "margin:0.3em 0 0 0;");
              var linknew = document.createElement("a");
              linknew.innerHTML = "More results from " + citehost + "&nbsp;»";
              linknew.href = locnew;
              pnew.appendChild(linknew);
              divmas.appendChild(pnew);
              // v1.1.3 fix links where the URL bar isn't updated until the link is created
              linknew.setAttribute("citehost", citehost);
              linknew.addEventListener("mouseover", gst_refreshLink, false);
              // v1.1.4 add target attribute to open in a new window/tab
              if (seemorelink.split("-")[1] == "Y"){
                linknew.setAttribute("target", "_blank");
                linknew.innerHTML += "»";
              }
            }
            // v1.1.6 hide (duplicate) link Google adds under some results
            var googmore = divmas.querySelector("div.mas-sc-row");
            if (googmore) googmore.style.display = "none";
          }
        }
      }}
    }
  }
}

// Functions relating to the siteForm
function gst_addSiteForm(){
  var sfd = document.createElement("div");
  sfd.id = "gstSiteForm";
  sfd.className = "ghhpane";
  sfd.setAttribute("style","z-index:105;top:-2.75em;")
  sfd.innerHTML = "<form onsubmit=\"return false;\"><p id=\"gstButtons\">" +
    "<button id=\"gstsf1\" title=\"This site only\">&nbsp;&nbsp;+&nbsp;&nbsp;</button> " +
    "<button id=\"gstsf2\" title=\"Exclude this site\">&nbsp;&nbsp;-&nbsp;&nbsp;</button> " +
    "<button id=\"gstsf3\" title=\"Close pane\">&nbsp;&nbsp;x&nbsp;&nbsp;</button></p>" +
    "<p id=\"gstRadios\"></p><p style=\"padding-top:3px;cursor:pointer;color:#00f\" onclick=\"document.getElementById('gstOptions').style.display='block';this.style.display='none';\">Edit Script Options</p>" +
    "<p id=\"gstOptions\" style=\"padding-top:3px;display:none\">Script Options:<br><label title=\"Show 'More results from' link after selected hits\"><input type=\"checkbox\" name=\"chkseemore\" id=\"chkseemore\"> Add " +
    "'More results from' link</label><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label title=\"Open in a new window or tab\"><input type=\"checkbox\" name=\"chksmtarget\" id=\"chksmtarget\"> Open in new window</label><br>" +
    "<label title=\"List domain without leftmost subdomain\"><input type=\"checkbox\" name=\"chkstripany\" id=\"chkstripany\"> First&nbsp;option&nbsp;always&nbsp;omit&nbsp;leftmost&nbsp;subdomain</label></p>" +
    "<p style=\"padding-top:3px\"><strong>Google site: Tool</strong> v1.1.7 (<a href=\"http://userscripts.org/scripts/show/139758\" target=\"_blank\">About</a>)<span style=\"font-size:0.8em;color:#aaa\">" +
    "<br>Copyright &copy; 2013 Jefferson Scher</span></p></form>";
  document.body.appendChild(sfd);
  fixseemore();
  fixsubdomain();
  document.getElementById("gstsf1").addEventListener("click",gst_reQuery,false);
  document.getElementById("gstsf2").addEventListener("click",gst_reQuery,false);
  document.getElementById("gstsf3").addEventListener("click",gstcloseform,false);
  document.getElementById("chkseemore").addEventListener("change",updtseemore,false);
  document.getElementById("chksmtarget").addEventListener("change",updtseemore,false);
  document.getElementById("chkstripany").addEventListener("change",updtsubdomain,false);
  document.getElementById("gstSiteForm").addEventListener("click",ghhkillevent,false);
}
function gst_showSiteForm(e) {
  var r1=window.getSelection().getRangeAt(0);
  if (!r1.collapsed){ // Don't show dialog if user selected part of the cite (v1.0.0)
    var r2=document.createRange();
    r2.selectNode(e.currentTarget);
    if (r2.compareBoundaryPoints(r2.END_TO_START, r1)<1 && r2.compareBoundaryPoints(r2.END_TO_END, r1)>-1) return;
  }
  var citetxt, sitecomp, radp, path, k, z, sfrm;
  if (!document.getElementById("gstSiteForm")) gst_addSiteForm();
  // Build radios
  citetxt = e.currentTarget.getAttribute("sitelistener");
  e.preventDefault();
  e.stopPropagation();
  if (citetxt.indexOf("http://") == 0) citetxt = citetxt.substr(7);
  if (citetxt.indexOf("https://") == 0) citetxt = citetxt.substr(8);
  if (citetxt.indexOf("ftp://") == 0) citetxt = citetxt.substr(6);
  sitecomp = citetxt.split("/");
  radp = document.getElementById("gstRadios");
  radp.innerHTML = "";
  for (var k=0; k<sitecomp.length-1; k++){
    // TODO: do not duplicate a site or -site parameters already in the query?
    if (k == 0){ // check for removing leftmost subdomain
      if (stripany == "Y"){ // try to remove anything
        if (sitecomp[k].split(".").length > 2){
          radp.innerHTML += "<label style=\"white-space:pre\"><input type=\"radio\" name=\"sitestr\" value=\"" + k + "w\" checked=\"checked\"> <span>" +
            sitecomp[k].substr(sitecomp[k].indexOf(".") + 1) + "</span></label>"
          radp.innerHTML += "<br><label style=\"white-space:pre\"><input type=\"radio\" name=\"sitestr\" value=\"" + k + "\"> <span>" +
            sitecomp[k] + "</span></label>"
        } else {
          radp.innerHTML += "<label style=\"white-space:pre\"><input type=\"radio\" name=\"sitestr\" value=\"" + k + "\" checked=\"checked\"> <span>" +
            sitecomp[k] + "</span></label>"
        }
      } else { // try to remove www only
        if (sitecomp[k].substr(0, sitecomp[k].indexOf(".")).toLowerCase() == "www"){
          radp.innerHTML += "<label style=\"white-space:pre\"><input type=\"radio\" name=\"sitestr\" value=\"" + k + "w\" checked=\"checked\"> <span>" +
            sitecomp[k].substr(sitecomp[k].indexOf(".") + 1) + "</span></label>"
          radp.innerHTML += "<br><label style=\"white-space:pre\"><input type=\"radio\" name=\"sitestr\" value=\"" + k + "\"> <span>" +
            sitecomp[k] + "</span></label>"
        } else {
          radp.innerHTML += "<label style=\"white-space:pre\"><input type=\"radio\" name=\"sitestr\" value=\"" + k + "\" checked=\"checked\"> <span>" +
            sitecomp[k] + "</span></label>"
        }
      }
    } else {
      if(sitecomp[k+1] != ""){
        path = "";
        for (z=0; z<k; z++){
          path += sitecomp[z] + "/";
        }
        path += sitecomp[k];
        radp.innerHTML += "<br><label style=\"white-space:pre\"><input type=\"radio\" name=\"sitestr\" value=\"" + k + "\"> <span>" +
          path + "</span></label>"  
      }
      if (k == 3) break; // let's not go overboard...
    }
  }
  // Position form
  sfrm = document.getElementById("gstSiteForm");
  tdiv = document.getElementById("ghhtemp");
  if (!tdiv){
    tdiv = document.createElement("div");
    tdiv.id = "ghhtemp";
  }
  lt = e.currentTarget.offsetLeft + 20; 
  tdiv.setAttribute("style", "position:relative;left:" +  lt + "px;top:0;z-index:100;width:500px;");
  e.currentTarget.parentNode.appendChild(tdiv);
  tdiv.appendChild(sfrm);
  // Add link if user clicked part of the cite that's a link
  if (e.target.nodeName == "A"){
    var pnew = document.createElement("p");
    pnew.id = "gstlink";
    var anew = e.target.cloneNode(true);
    pnew.appendChild(anew);
    sfrm.insertBefore(pnew, sfrm.firstChild);
  }
  sfrm.style.display = "block";
  document.getElementById("gstsf1").focus();
  fixseemore();
}
function gstcloseform(e){
  if (!e) return;
  var sfrm = document.getElementById("gstSiteForm");
  var tdiv = document.getElementById("ghhtemp");
  sfrm.style.display = "none";
  var plink = document.getElementById("gstlink");
  if (plink) plink.parentNode.removeChild(plink);
  document.body.appendChild(sfrm);
  tdiv.parentNode.removeChild(tdiv);
}
// Misc functions
function ghhkillevent(e){
  if (e.target.nodeName.toLowerCase() == "button" || e.target.nodeName.toLowerCase() == "input") return;
  e.stopPropagation();
}
function gst_reQuery(e){
  // build site string
  if (e.target.id == "gstsf1") var ss = "+site:"; 
  else var ss = "+-site:";
  var rads = e.target.form.querySelectorAll('#gstRadios input[type="radio"]');
  for (var i=0; i<rads.length; i++){
    if(rads[i].checked){
      ss += rads[i].nextElementSibling.textContent;
      gst_reQry(ss, true);
      break;
    }
  }
}
function gst_reQry(d, go){
  // compute new URL
  if (!d) return;
  var cancel = false;
  var qa = window.location.href.substr(window.location.href.indexOf("?")+1).split("&");
  var updated = false;
  for (var j=qa.length-1; j>=0; j--){
    if (updated == false){
      if (qa[j].split("=")[0] == "q"){
        if (qa[j].indexOf(d) > -1 || qa[j].indexOf(d.replace(":", "%3A")) > -1) cancel = true;
        else var ipq = qa[j];
        qa[j] += d;
        updated = true;
        var substqry = qa[j];
      } else {
        if (qa[j].indexOf("#q=") > -1){
          if (qa[j].indexOf(d) > -1 || qa[j].indexOf(d.replace(":", "%3A")) > -1) cancel = true;
          else var ipq = qa[j].substr(qa[j].indexOf("#q=")+1);
          qa[j] += d;
          updated = true;
          var substqry = qa[j].substr(qa[j].indexOf("#q=")+1);
        }
      }
    } else {
      if (qa[j].split("=")[0] == "q"){
        if (go) qa[j] = ipq;
        else qa[j] = substqry;
      } else {
        if (qa[j].indexOf("#q=") > -1){
          if (go) qa[j] = qa[j].substr(0, qa[j].indexOf("#q=")+1) + ipq;
          else qa[j] = qa[j].substr(0, qa[j].indexOf("#q=")+1) + substqry;
        }
      }
    }
  }
  if (cancel != true) var locnew = window.location.href.substr(0, window.location.href.indexOf("?")+1) + qa.join("&");
  else locnew = "cancel";
  if (go) window.location.href = locnew;
  else return locnew;
}
function updtseemore(e){ // Store settings for See More preference
  var chk = e.target;
  var smparts = seemorelink.split("-");
  if (chk.checked){
    if (chk.id == "chkseemore") smparts[0] = "Y";
    if (chk.id == "chksmtarget"){
      smparts[1] = "Y";
      fixexistinglinks(true);
    }
  } else {
    if (chk.id == "chkseemore") smparts[0] = "N";
    if (chk.id == "chksmtarget"){
      smparts[1] = "N";
      fixexistinglinks(false);
    }
  }
  seemorelink = smparts.join("-");
  gstPrefO.seemore[0] = seemorelink;
  GM_setValue("gstPrefs",JSON.stringify(gstPrefO));
  fixseemore();
}
function fixseemore(){  // Check boxes for See More preference
  if (seemorelink.split("-").length == 1) seemorelink = seemorelink + "-N";
  var chk = document.getElementById("chkseemore");
  if (seemorelink.split("-")[0] == "Y"){
    chk.setAttribute("checked","checked");
    chk.checked = true;
  } else {
    chk.removeAttribute("checked");
    chk.checked = false;  
  }
  var chk = document.getElementById("chksmtarget");
  if (seemorelink.split("-")[1] == "Y"){
    chk.setAttribute("checked","checked");
    chk.checked = true;
  } else {
    chk.removeAttribute("checked");
    chk.checked = false;  
  }
}
function fixexistinglinks(blnTargetBlank){
  var seemores = document.querySelectorAll("a[citehost]");
  for (var i=0; i<seemores.length; i++){
    if (seemores[i].hasAttribute("target")){
      seemores[i].removeAttribute("target");
      seemores[i].innerHTML = seemores[i].innerHTML.substr(0, seemores[i].innerHTML.length-1); //»
    }
    if (blnTargetBlank){
      seemores[i].setAttribute("target", "_blank");
      seemores[i].innerHTML += "»";
    }
  }
}
function updtsubdomain(e){ // Store settings for subdomain stripping pref
  var chk = e.target;
  if (chk.checked){
    stripany = "Y";
  } else {
    stripany = "N";
  }
  gstPrefO.subdomain[0] = stripany;
  GM_setValue("gstPrefs",JSON.stringify(gstPrefO));
  fixsubdomain();
  // TODO: Need to close and re-open dialog to regenerate domain list...
}
function fixsubdomain(){  // Check box for subdomain stripping pref
  var chk = document.getElementById("chkstripany");
  if (stripany == "Y"){
    chk.setAttribute("checked","checked");
    chk.checked = true;
  } else {
    chk.removeAttribute("checked");
    chk.checked = false;  
  }
}
function gst_refreshLink(e){
  if (e.target.nodeName != "A") return;
  var locnew = gst_reQry("+site:"+e.target.getAttribute("citehost"), false);
  if (locnew != "cancel") e.target.href = locnew;
}
function convertPrefs(arrPrefs, oldPrefs){
  var gstPrefOtemp = arrPrefs;
  var oldPrefsOtemp = JSON.parse(oldPrefs);
  if (oldPrefs.indexOf("seemore")>-1) gstPrefOtemp.seemore[0] = oldPrefsOtemp.seemore[0];
  if (oldPrefs.indexOf("subdomain")>-1) gstPrefOtemp.subdomain[0] = oldPrefsOtemp.subdomain[0];
  return gstPrefOtemp;
}
