// ==UserScript==
// @name           uso Thread Previews
// @namespace      JeffersonScher
// @version        0.9.2
// @copyright      Copyright 2013 Jefferson Scher
// @license        CC BY http://creativecommons.org/licenses/by/3.0/
// @description    Show thread previews on userscripts.org forum list pages. For Firefox with Greasemonkey. v0.9.2 2013-08-22
// @include        http*://userscripts.org/forums/*
// @include        http*://userscripts.org/topics
// @include        http*://userscripts.org/topics/
// @include        http*://userscripts.org/topics?page*
// @include        http://userscripts.org/scripts/discuss*
// @grant GM_registerMenuCommand
// @grant GM_addStyle
// @grant GM_log
// ==/UserScript==

function showPreviews(e){
  var i, getYN, threadnum, elDiv;
  var topicTbl = document.querySelector('div#content > table');
  var pform = document.getElementById("previewForm");
  if (topicTbl){
    var topicRows = topicTbl.rows;
    if (topicRows.length > 0){
      for (i=1; i<topicRows.length; i++){
        getYN = true;
        if (pform.elements["optReplies"][0].checked && topicRows[i].cells[2].textContent != "0") getYN = false;
        if (pform.elements["optRead"][0].checked && topicRows[i].cells[0].firstElementChild.className.indexOf("green") == -1) getYN = false;
        if (getYN){
          threadnum = topicRows[i].cells[1].firstElementChild.getAttribute("href");
          if (threadnum){
            threadnum = threadnum.substr(threadnum.lastIndexOf("/")+1);
            if (document.getElementById("thread_preview_" + threadnum)){
              elDiv = document.getElementById("thread_preview_" + threadnum);
            } else{
              elDiv = document.createElement("DIV");
              elDiv.id = "thread_preview_" + threadnum;
              elDiv.className = "threadPreview";
              topicRows[i].cells[1].appendChild(elDiv);
            }
            elDiv.innerHTML = "<p><em>Preview:</em></p>"; 
            fetchPreview(threadnum);
          } else {
            GM_log("threadnum undefined or null for row "+i+" (not counting the header row)");
          }
        }
      }
    }
  }
  // TODO Save Form Preferences
}

function fetchPreview(topicNo){
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var dest = document.getElementById("thread_preview_" + topicNo);
    if (this.responseXML != null){
      var xht = this.responseXML.querySelector('html');
    } else {
      var xht = makeDoc(this.responseText).querySelector('html');
    }
    if (document.getElementById("previewForm").elements["optWhich"][0].checked) var thepost = xht.querySelector('td.entry-content');
    else {
      var allposts = xht.querySelectorAll('td.entry-content');
      var thepost = allposts[allposts.length-1];
    }
    if (thepost) var firstp = thepost.querySelector('p');
    if (firstp && firstp.innerHTML != "") {
      var secondp = firstp.nextElementSibling;
      if (document.getElementById("previewForm").elements["optHowMuch"][0].checked){
        if (secondp){
          dest.replaceChild(firstp.cloneNode(true), dest.lastElementChild);
          if (firstp.textContent.length < 15) dest.appendChild(secondp.cloneNode(true));
          else dest.lastElementChild.innerHTML += "<br>...";
        } else {
          dest.replaceChild(firstp.cloneNode(true), dest.lastElementChild);
          dest.lastElementChild.innerHTML += "{END OF POST}";
        }
      } else {
        var dPost = document.createElement("div");
        dPost.appendChild(firstp.cloneNode(true));
        while (secondp) {
          dPost.appendChild(secondp.cloneNode(true));
          secondp = secondp.nextElementSibling;
        }
        dest.replaceChild(dPost, dest.lastElementChild);
      }
      var agreeBtn = thepost.querySelector('input[value="Agree"]');
      if (agreeBtn){
        var sform = agreeBtn.parentNode;
        sform.setAttribute("target", "_blank");
        sform.style.cssFloat = "right";
        sform.lastElementChild.style.fontSize = "0.8em";
        var captxt = document.createElement("span");
        captxt.appendChild(document.createTextNode("Poll: "));
        captxt.style.fontSize = "0.8em";
        sform.insertBefore(captxt,sform.lastElementChild);
        dest.insertBefore(sform, dest.firstElementChild);
        sform.addEventListener("click", flagSpam, false);
      } else {
        var sform = thepost.previousElementSibling.querySelector("form[action='/spam']");
        if (sform) {
          sform.setAttribute("target", "_blank");
          sform.style.cssFloat = "right";
          sform.lastElementChild.style.fontSize = "0.8em";
          if (secondp) sform.lastElementChild.setAttribute("multipara", "multipara");
          dest.insertBefore(sform, dest.firstElementChild);
          sform.addEventListener("click", flagSpam, false);
        }
      }
    } else {
      var ch = xht.querySelector('center > h1');
      if (ch) {
        dest.replaceChild(document.createTextNode("(" + ch.textContent + ")"), dest.lastElementChild);
        dest.style.background = "#ccc";
      } else {
        dest.replaceChild(document.createTextNode("(Not Available)"), dest.lastElementChild);
        dest.style.background = "#ccc";
      }
    }
  }
  xhr.onerror = function() {
    var dest = document.getElementById("thread_preview_" + topicNo);
    dest.replaceChild(document.createTextNode("Error: " + this.statusText), dest.lastElementChild);
  }
  xhr.ontimeout = function() {
    var dest = document.getElementById("thread_preview_" + topicNo);
    dest.replaceChild(document.createTextNode("Whoops: Timeout after 30 seconds"), dest.lastElementChild);
  }
  xhr.open("GET", window.location.protocol+"//userscripts.org/topics/" + topicNo);
  try {xhr.responseType = "document";}
  catch(e) {xhr.responseType = "";}
  xhr.timeout = "30000"; // 30 second timeout
  var d = new Date();
  xhr.send();
  // The following probably should be implemented with onreadystatechange
  var t = ("00" + d.getHours()).substr(-2) + ":"+ ("00" + d.getMinutes()).substr(-2) + ":" + ("00" + d.getSeconds()).substr(-2) + "." + d.getMilliseconds();  
  document.getElementById("thread_preview_" + topicNo).innerHTML += "<p>(Request sent at " + t + ")</p>";
}

function flagSpam(e){
  var tgt = e.target;
  if (tgt.hasAttribute("multipara")) if (!confirm("Are you sure?")) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
  var thisdiv = tgt.parentNode.parentNode.id;
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (this.responseXML != null){
      var xhrdoc = this.responseXML;
    } else {
      var xhrdoc = makeDoc(this.responseText);
    }
    var notice = xhrdoc.querySelector('#content > p.notice');
    if (notice){
      document.getElementById(thisdiv).innerHTML = "";
      document.getElementById(thisdiv).appendChild(document.importNode(notice, true));
    }
    else {
      document.getElementById(thisdiv).lastElementChild.innerHTML = "<strong>Flagging failed, please try again.</strong>";
      document.getElementById(thisdiv).querySelector('input[name="commit"]').disabled = false;
    }
  }
  xhr.open("POST", tgt.parentNode.action);
  try {xhr.responseType = "document";}
  catch(e) {xhr.responseType = "";}
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  var els = tgt.parentNode.getElementsByTagName("input");
  var params = els[0].name + "=" + els[0].value;
  for (var i=1; i<els.length; i++){
    params += "&" + els[i].name + "=" + els[i].value;
  }
  xhr.send(params);
  tgt.disabled = true;
  e.preventDefault();
  e.stopPropagation();
  return false;
}

function makeDoc(strXHR){ // see http://userscripts.org/guides/9
  var xdt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
  var xdoc = document.implementation.createDocument("", "", xdt);
  var elHtml = xdoc.createElement("html");
  elHtml.innerHTML = strXHR;
  xdoc.appendChild(elHtml);
  return xdoc;
}

GM_registerMenuCommand("Show Previews for New Threads", showPreviews);

// Insert button 
var sbar = document.querySelector('#right');
if (sbar){
  var btn = document.createElement("button");
  btn.appendChild(document.createTextNode("Show Thread Previews"));
  btn.id = "btnShowPreviews";
  sbar.appendChild(btn);
  btn.addEventListener("click", showPreviews, false);
  // Position lower on /topics
  if (window.location.href.indexOf("/topics") > -1) btn.style.marginTop = "4em";
  // Form controls
  var elf = document.createElement("form");
  elf.id = "previewForm";
  elf.onsubmit = "return false";
  sbar.appendChild(elf);
  var elp = document.createElement("p");
  elp.id = "previewOptions";
  elp.innerHTML = 
    "Replies: <label title=\"New only (0 replies)\"><input type=\"radio\" name=\"optReplies\" value=\"zero\" checked=\"checked\"> None yet</label> " +
      "<label title=\"All threads\"><input type=\"radio\" name=\"optReplies\" value=\"all\"> Any</label><br>" +
    "Status: <label title=\"Unread only (green icon)\"><input type=\"radio\" name=\"optRead\" value=\"unread\"> Unread only</label> " +
      "<label title=\"Read and unread posts\"><input type=\"radio\" name=\"optRead\" value=\"all\" checked=\"checked\"> All</label><br>" +
    "Which Post: <label title=\"First in thread\"><input type=\"radio\" name=\"optWhich\" value=\"first\" checked=\"checked\"> First</label> " +
      "<label title=\"Last in thread\"><input type=\"radio\" name=\"optWhich\" value=\"last\"> Last</label><br>" +
    "How Much: <label title=\"First paragraph\"><input type=\"radio\" name=\"optHowMuch\" value=\"first\" checked=\"checked\"> 1st Para</label> " +
      "<label title=\"Full post\"><input type=\"radio\" name=\"optHowMuch\" value=\"full\"> Full</label></p>";
  elf.appendChild(elp);
  // TODO Restore Saved Form Preferences
  // Check login status
  var lis = document.querySelector('ul.login_status');
  if (lis.textContent.indexOf("Logout") == -1){
    var warn = document.createElement("p");
    warn.style.color = "#f00";
    warn.style.fontWeight = "bold";
    warn.innerHTML = "To flag spam, you need to " + lis.lastElementChild.innerHTML;
    sbar.appendChild(warn);
  }
}
GM_addStyle(".threadPreview{background:#cff;padding:2px;min-height:33px;}.threadPreview p{margin:0;}#previewOptions>label>input{position:static!important;width:auto!important;}");
