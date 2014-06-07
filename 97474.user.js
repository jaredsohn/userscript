// ==UserScript==
// @name           Fixed Position Breadcrumbs for WSL vBulletin
// @namespace      JeffersonScher
// @version        0.3.2
// @description    Breadcrumb trail always available for easy access. Updated 2011-02-20.
// @include        http://windowssecrets.com/forums/showthread.php/*
// ==/UserScript==
var bcd, lso, prefBC = "oldbox";
bcd = document.getElementById("breadcrumb");
lso = unsafeWindow.localStorage;
if (lso){
  if (lso.bcstyle) prefBC = lso.bcstyle;
}
if (bcd) setup();

function setup(){
  if (prefBC != "newbox"){
    var dNew, btn, aels, ael;
    dNew = bcd.cloneNode(true);
    dNew.setAttribute("style","position:fixed;left:0;bottom:0;z-index:101;width:100%;background:#ffe;" +
      "padding:0.5em 0;border-top:1px solid black;");
    // Create toggle button
    btn = document.createElement("button");
    btn.textContent = "Box Style";
    btn.id = "FPBCBoxStyle";
    btn.setAttribute("style","float:right;margin-right:2px;padding:0 4px");
    btn.addEventListener("click",toggleStyle,true); 
    dNew.insertBefore(btn,dNew.firstChild);
    // Add Access Key for one level up
    aels = dNew.getElementsByTagName("a");
    ael = aels[aels.length-1];
    ael.setAttribute("accessKey", "b");
    if (navigator.userAgent.indexOf("WebKit")>0) {
      ael.textContent += " (Alt+b)";
      ael.setAttribute("title","Chrome AccessKey: Alt+b");
    } else {
      ael.textContent += " (b)";
      ael.setAttribute("title","Firefox AccessKey: Shift+Alt+b");
    }  
    document.body.appendChild(dNew);
  } else {
    var dNew, s, ulist, newlist, litems, j, ael, aknum;
    // Create a copy of the breadcrumb trail
    dNew = bcd.cloneNode(true);
    dNew.id = "fpbc";
    // Set up new styling for it -- please customize as desired!!
    s = document.createElement("style");
    s.setAttribute("type", "text/css");
    s.appendChild(document.createTextNode("#fpbc{text-align:left;position:fixed;left:0;bottom:0;background:#eef;border-width:1px 1px 0 0;" +
      "border-style:solid;border-color:#ccc;border-top-right-radius:4px;-moz-border-radius-topright:4px;-webkit-border-top-right-radius:4px;} " +
      "#fpbc ul{list-style-type:none;margin:0;padding:0;} #fpbc li{margin:0;padding:2px;} " +
      "#fpbc a{display:block;padding:0.25em} #fpbc a:hover{background:#ff8;text-decoration:none}"));
    document.getElementsByTagName("head")[0].appendChild(s);
    // Copy list elements to a new list in reverse order
    ulist = dNew.getElementsByTagName("ul")[0];
    newlist = document.createElement("ul");
    litems = ulist.children;
    for (j=0; j<litems.length; j++){
      if (j==litems.length-1) break; // Ignore current post title
      litems[j].removeAttribute("class");
      if (j==0) newlist.appendChild(litems[j].cloneNode(true));
      else newlist.insertBefore(litems[j].cloneNode(true), newlist.firstChild);
    }
    // Add Access Key for one level up
    ael = newlist.firstChild.getElementsByTagName("a")[0];
    ael.setAttribute("accessKey", "b");
    if (navigator.userAgent.indexOf("WebKit")>0) {
      ael.textContent += " (Alt+b)";
      ael.setAttribute("title","Chrome AccessKey: Alt+b");
    } else {
      ael.textContent += " (b)";
      ael.setAttribute("title","Firefox AccessKey: Shift+Alt+b");
    }  
    // Switch the lists
    dNew.innerHTML = "";
    dNew.appendChild(newlist);
    // Create toggle button
    var btn = document.createElement("button");
    btn.textContent = " Bar Style ";
    btn.id = "FPBCBarStyle";
    btn.setAttribute("style","margin-left:4px;padding:0 4px");
    btn.addEventListener("click",toggleStyle,true); 
    dNew.appendChild(btn);
    // Add the new element to the body
    document.body.appendChild(dNew);  
  }
}
function toggleStyle(e){
  var btn = e.target;
  if (btn.id == "FPBCBoxStyle"){
    prefBC = "newbox";
    lso.bcstyle = prefBC;
    // Remove duplicate bread crumbs
    document.body.removeChild(btn.parentNode);
    // Set up box-style breadcrumbs
    setup();
  } else {
    prefBC = "oldbox";
    lso.bcstyle = prefBC;
    // Remove box
    document.body.removeChild(btn.parentNode);
    // Set up bar-style breadcrumbs
    setup();
  }
}
