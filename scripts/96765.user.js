// ==UserScript==
// @name           WSL New Posts Forum List
// @namespace      JeffersonScher
// @version        0.4.4
// @copyright      © 2012 Jefferson Scher
// @license        CC BY http://creativecommons.org/licenses/by/3.0/
// @description    Adds overlay highlighting forums with new posts. Updated 2012-05-21. 
// @include        http://windowssecrets.com/forums/*
// @include        http://www.thailandqa.com/forum/*
// ==/UserScript==
GM_addStyle(".npfl{position:absolute;top:1em;left:1em;width:90%;z-index:101;color:#333;background-color:#fcfcfc;" +
  "border:1px solid #ccc;border-radius:4px;-moz-border-radius:4px;-webkit-border-radius:4px;padding:0.5em 1em;font-size:13px;line-height:18px;" +
  "text-align:left;max-width:900px;} #npflist fieldset{border:1px solid #ccc;border-radius:4px;-moz-border-radius:4px;-webkit-border-radius:4px;" +
  "padding:0.25em 0.5em;margin-bottom:0.75em} #npflist span{margin:0.25em 0;padding:0 1em 0 0;font-size:13px;line-height:18px;} " +
  "#npflist a{text-decoration:none;} .npflhide{margin-left:5px;display:none;} .npflbtn{color:#555;background-color:#eee;" +
  "font-size:0.85em;margin:auto 2px;border:1px solid #ccc;border-radius:4px;-moz-border-radius:4px;-webkit-border-radius:4px;padding:2px 3px;}" +
  "#npflist legend{font-weight:bold;} .npflbtn:hover{color:#000;background:#ff8;} #npflClose{position:absolute;top:3px;right:3px;}");
GM_addStyle("@media print {.npfl{display:none}}");

// Globals
var lso, prefNT = "Y", prefAS = "Y", prefHide = "", prefAllPg = "N", prefDefer = "Y", isIndex = "N", popDone = "N";

if (document.getElementsByClassName("welcomelink").length > 0) {
  // Retrieve stored preferences from DOM localStorage
  lso = unsafeWindow.localStorage;
  if (lso){
    if (lso.prefNewTab) prefNT = lso.prefNewTab;
    if (lso.prefAutoShow) prefAS = lso.prefAutoShow;
    if (lso.prefHideList) prefHide = lso.prefHideList;
    if (lso.prefAllPages) prefAllPg = lso.prefAllPages;
    if (lso.prefDeferFetch) prefDefer = lso.prefDeferFetch;  
  }
  // Check we're on an index page and call setup
  if (document.querySelector("ol#forums")) isIndex = "Y";
  if (prefAllPg == "Y" || isIndex == "Y") setup();
}

function setup(){
  // Create button to display pane
  var tl, ulist, npfli, npflb;
  var tl = document.getElementById("toplinks");
  if (tl){
    var ulist = tl.getElementsByClassName("isuser");
    if (ulist.length>0){
      var npfli = document.createElement("li");
      var npflb = document.createElement("button");
      npflb.className = "npflbtn";
      npflb.setAttribute("title","Show New Posts Forum List pane");
      npflb.appendChild(document.createTextNode("NPFL"));
      npfli.appendChild(npflb);
      ulist[0].insertBefore(npfli,ulist[0].firstChild);
      npflb.addEventListener("click",showpane,true);
    }
  }
  // Create pop-up pane
  var dNew, pttl;
  dNew = document.createElement("div");
  dNew.id = "mainpane";
  dNew.className = "npfl";
  pttl = document.getElementById("pagetitle");
  if (pttl) pttl = pttl.firstElementChild.textContent;
  if (!pttl){
    pttl = document.getElementsByTagName("title")[0].textContent;
    if (pttl.indexOf("-") > -1) pttl = pttl.substr(pttl.indexOf("-") + 1);
  }
  // Auto-open the pane on the index page unless user has turned it off
  if (prefAS != "Y" || isIndex != "Y") dNew.style.display = "none";
  dNew.innerHTML = "<p style=\"font-size:1.2em;text-align:center;font-weight:bold\"><span id=\"mainfname\">" +
    pttl + "</span>: Forums with New Posts Highlighted</p>\n" +
    "<div id=\"npflist\"></div>\n" +
    "<div style=\"text-align:left;margin-bottom:0.25em;border-top:1px solid #333;padding-top:0.5em;\">Settings: " +
    "<label title=\"Open forums in a new window or tab\"><input type=\"checkbox\" id=\"npfltgt\"> New window/tab</label> " +
    "<span id=\"lsoopts\">&nbsp;|&nbsp; <label title=\"Open this pane automatically when displaying the forum index\">" +
    "<input type=\"checkbox\" id=\"npfldisp\"> Auto-open</label> " +
    "&nbsp;|&nbsp; <button id=\"npfledit\" class=\"npflbtn\" title=\"Choose forums to display\">Edit Forum List</button></span> " +
    "&nbsp;|&nbsp; <button id=\"npflclso\" class=\"npflbtn\">Clear Settings</button> " +
    "&nbsp;||&nbsp; <label><input type=\"checkbox\" id=\"npflallp\"> NPFL Everywhere (Fx only)</label> ( " +
    "<label title=\"On pages other than the index, do not retrieve forum list until this pane is opened\">" +
    "<input type=\"checkbox\" id=\"npfldfr\"> Defer load</label> )</span>" +
    "<button id=\"npflClose\" class=\"npflbtn\" onclick=\"document.getElementById('mainpane').style.display='none';\">Close</button></div>";
  // Insert pop-up
  document.body.insertBefore(dNew, document.body.firstChild);
  // Retrieve forums from this page -- for index page -- otherwise left blank
  if (isIndex == "Y") populateList(document.getElementById("toplinks"), document.getElementById("forums"));
  else if (prefDefer == "N") doXHR();
  // Set checkbox defaults
  if (lso){
    if (prefNT != "Y") document.getElementById("npfltgt").checked = false;
    if (prefAS == "Y") document.getElementById("npfldisp").checked = true;
    if (prefAllPg == "Y") document.getElementById("npflallp").checked = true;
    if (prefDefer == "Y") document.getElementById("npfldfr").checked = true;
  } 
  else document.getElementById("lsoopts").style.display = "none";
  // Add event listeners
  document.getElementById("npfltgt").addEventListener("click",chgtarget,true);
  document.getElementById("npfldisp").addEventListener("click",togglehide,true);
  document.getElementById("npflist").addEventListener("click",listclick,true);
  document.getElementById("npfledit").addEventListener("click",toggleedit,true);
  document.getElementById("npflclso").addEventListener("click",flushlso,true);
  document.getElementById("npflallp").addEventListener("click",toggleallp,true);
  document.getElementById("npfldfr").addEventListener("click",toggledefer,true);
}

function populateList(root1, root2){
  // root1 and root2 are elements in the current document
  var dList, username, forums, fnum, fset, hasVis, frows, i, icon, lastpostbydiv, flink, fspan, fstr, tstr;
  dList = document.getElementById("npflist");
  // Capture username to work around problem with your own post being the latest
  username = root1.getElementsByClassName("welcomelink")[0].getElementsByTagName("a")[0].textContent;
  // Create node list of forums
  forums = root2.children;  // <li> for each forum category
  // Extract list from each group and highlight forums with new posts
  for (fnum = 0; fnum < forums.length; fnum++){
    // Create container
    fset = document.createElement("fieldset");
    fset.innerHTML = "<legend>&nbsp;" + forums[fnum].getElementsByClassName("forumhead")[0].getElementsByClassName("forumtitle")[0].textContent + "&nbsp;</legend>\n";
    hasVis = "N";
    frows = forums[fnum].getElementsByClassName("forumrow");
    if (frows){
      for (i = 0; i < frows.length; i++){
        icon = frows[i].getElementsByClassName("forumicon")[0];
        if (frows[i].getElementsByClassName("lastpostby").length>0) lastpostbydiv = frows[i].getElementsByClassName("lastpostby")[0].textContent;
        else lastpostby = "";
        flink = frows[i].getElementsByClassName("forumtitle")[0].firstElementChild; //getElementsByClassName("a")[0];
        if (icon.getAttribute("src").indexOf("statusicon/forum_new")>-1){
          if (lastpostbydiv.indexOf(username) < 0) flink.style.backgroundColor = "#ff6";
          else{
            flink.style.backgroundColor = "#cf6";
            flink.setAttribute("title","Could be yours, you made the last post");
          }  
        }
        flink = flink.cloneNode(true);
        if (prefNT == "Y") flink.setAttribute("target","_blank");
        else flink.setAttribute("target","_self");
        fspan = document.createElement("span");
        fspan.appendChild(flink);
        tstr = "<input type=\"checkbox\" class=\"npflhide\" ";
        fstr = flink.href.substr(0,flink.href.indexOf("-")+1);
        if (fstr.lastIndexOf("/")>-1) fstr = fstr.substr(fstr.lastIndexOf("/"));
        tstr += "f=\"" + fstr + "\""; // should be similar to "/25-"
        if (prefHide != ""){
          if (prefHide.indexOf(fstr)<0){
            tstr += " checked=\"checked\" />";
            hasVis = "Y";
          }
          else {
            tstr += " />";
            fspan.setAttribute("style","display:none");
          }
        }
        else {
          tstr += " checked=\"checked\" />";
          hasVis = "Y";
        }
        fspan.innerHTML += tstr;
        fset.appendChild(fspan);
      }
      dList.appendChild(fset);
      if (hasVis == "N") fset.style.display = "none";
    }
  }
  popDone = "Y";  
}

function chgtarget(e){
  var ch, aels, i, lso;
  if (!e) return;
  ch = e.target.checked;
  aels = document.getElementById("npflist").getElementsByTagName("a");
  for (i=0;i<aels.length;i++){
    if (ch) aels[i].target = "_blank";
    else aels[i].target = "_self";
  }
  lso = unsafeWindow.localStorage;
  if (lso){
    if (ch) lso.prefNewTab = "Y";
    else lso.prefNewTab = "N";
  }
  e.target.blur();
}
function togglehide(e){
  var lso, ch;
  lso = unsafeWindow.localStorage;
  if (lso){
    ch = e.target.checked;
    if (ch) lso.prefAutoShow = "Y";
    else lso.prefAutoShow = "N";
  }  
  e.target.blur();
}
function toggleallp(e){
  var lso, ch;
  lso = unsafeWindow.localStorage;
  if (lso){
    ch = e.target.checked;
    if (ch) lso.prefAllPages = "Y";
    else lso.prefAllPages = "N";
  }  
  e.target.blur();
}
function toggledefer(e){
  var lso, ch;
  lso = unsafeWindow.localStorage;
  if (lso){
    ch = e.target.checked;
    if (ch) lso.prefDeferFetch = "Y";
    else lso.prefDeferFetch = "N";
  }  
  e.target.blur();
}
function hideelement(e){
  if (!e) return;
  var el = e.target.getAttribute("el");
  document.getElementById(el).style.display = "none";
}
function showpane(e){
  var mp, iurl;
  e.target.blur();
  mp = document.getElementById("mainpane");
  if (!mp) return;
  mp.style.display = "block";
  if (popDone == "N") doXHR();
}
function listclick(e){
  if (!e) return;
  var tgt;
  tgt = e.target;
  if (tgt.nodeName.toLowerCase() != "input") return;
  if (tgt.checked){  // Remove from pref string
    var reptn = new RegExp(tgt.getAttribute("f"),"g"); // Fixed 10/21/2011
    if(prefHide.indexOf(tgt.getAttribute("f")>-1)) prefHide = prefHide.replace(reptn,"");
    tgt.previousElementSibling.style.textDecoration = "none";
    tgt.parentNode.style.display = "";
  } else {  // Add to pref string
    if(prefHide.indexOf(tgt.getAttribute("f")<0)) prefHide += tgt.getAttribute("f");
    tgt.previousElementSibling.style.textDecoration = "line-through";
    tgt.parentNode.style.display = "none";
  }
  var lso = unsafeWindow.localStorage;
  if (lso){
    lso.prefHideList = prefHide;
  }  
  e.target.blur();  
}
function toggleedit(e){
  if (!e) return;
  var str, forums, i, sty;
  str = e.target.textContent;
  if (str == "Edit Forum List"){
    forums = document.getElementsByClassName("npflhide");
    for (i=0; i<forums.length; i++){
      if (!forums[i].checked) forums[i].previousElementSibling.style.textDecoration = "line-through";
    }
    sty = document.createElement("style");
    sty.id = "npfledsty";
    sty.type = "text/css";
    sty.appendChild(document.createTextNode(".npflhide{display:inline !important;} #npflist span{display:inline !important;} #npflist fieldset{display:block !important;}"));
    document.body.appendChild(sty);
    e.target.textContent = "Done Editing";
  } else {
    sty = document.getElementById("npfledsty");
    sty.parentNode.removeChild(sty);
    e.target.textContent = "Edit Forum List";
  }
  e.target.blur();
}
function flushlso(e){
  if(!confirm("Are you sure you want to delete all your New Post Forum List saved preferences for this site?")) return;
  var lso = unsafeWindow.localStorage;
  if (lso){
    lso.removeItem("prefNewTab");
    lso.removeItem("prefAutoShow");
    lso.removeItem("prefHideList");
    lso.removeItem("prefAllPages");
    lso.removeItem("prefDeferFetch");
    alert("Okay, reload page to return to default settings.");
  } else {
    alert("Sorry, unable to access localStorage object at the moment.");
  }
}
function doXHR(){
  if (popDone == "N" && navigator.userAgent.indexOf("Firefox")>-1) {
    document.getElementById("npflist").innerHTML = "<p style=\"margin:1em 0;color:red;font-style:italic;font-weight:bold\">Retrieving Forum List</p>";
    var iurl = document.getElementById("header").getElementsByTagName("a")[0].href;
    // Call index and populate set list
    GM_xmlhttpRequest({
      method: "GET",
      url: iurl,
      onload: function(response) {
        var strBig, pos, pgtitle, dNew, toplinx, forumlist;
        strBig = response.responseText.replace(/>\s+</g, "><");
        // Update #mainpane with true name of these forums
        pos = strBig.indexOf('id="pagetitle"><h1>') + 19;
        pgtitle = strBig.substr(pos);
        pos = pgtitle.indexOf('</h1>');
        pgtitle = pgtitle.substr(0, pos);
        document.getElementById("mainfname").textContent = pgtitle;
        // Create some hidden divs for the HTML fragments
        dNew = document.createElement("div");
        dNew.style.display = "none";
        dNew.id = "fragTopLinks";
        pos = strBig.indexOf('<div id="toplinks"');
        toplinx = strBig.substr(pos);
        pos = toplinx.indexOf('</div>')+6;
        toplinx = toplinx.substr(0, pos);
        dNew.innerHTML = toplinx;
        document.body.appendChild(dNew);
        dNew = document.createElement("div");
        dNew.style.display = "none";
        dNew.id = "fragForumList";
        pos = strBig.indexOf('<ol id="forums"');
        forumlist = strBig.substr(pos);
        pos = forumlist.indexOf('<div class="navlinks">');
        forumlist = forumlist.substr(0, pos);
        dNew.innerHTML = forumlist;
        document.body.appendChild(dNew);
        populateList(document.getElementById("fragTopLinks"),document.getElementById("fragForumList").firstChild);
        document.getElementById("npflist").removeChild(document.getElementById("npflist").firstChild);
      }
    });
  } else {
    document.getElementById("npflist").innerHTML = "<p style=\"margin:1em 0;color:red;font-style:italic;font-weight:bold\">NPFL Everywhere only works on Firefox at the moment</p>";
  }
}
