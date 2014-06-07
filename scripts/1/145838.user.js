// ==UserScript==
// @name        SuMo Forum Tweaks for Contributors
// @namespace   JeffersonScher
// @include     https://support.mozilla.org/*/questions*
// @include     https://support.mozilla.org/*/user/*
// @version     0.9.7 BETA
// @copyright   Copyright 2014 Jefferson Scher
// @license     CC BY http://creativecommons.org/licenses/by/3.0/
// @description Tweak the display of threads and thread listings on the Mozilla Support site. Updated 2014-04-01.
// ==/UserScript==

// To identify your posts on the forum, please enter your real name as it appears in your profile
var realname = "Jefferson Scher";

// Site search form
var myUsername, myLang, myForm;
myUsername = document.querySelector('.user').textContent;
myLang = document.documentElement.lang || "en-US";
myForm = document.createElement("form");
myForm.id = "jfsSearchForm";
myForm.setAttribute("action", "https://www.google.com/search");
myForm.setAttribute("target", "_blank");
myForm.style.position = "fixed";
myForm.style.bottom = "0";
myForm.style.right = "0";
myForm.style.zIndex = "999";
myForm.innerHTML = '<div style="background:#f0f0f0; padding:6px; float:right;"><p style="margin:0" id="jfsSortBy">Find by:&nbsp;' + 
  '<label><input type="radio" name="radSortby" value="rel" checked="checked">&nbsp;Relevance</label>&nbsp;' +
  '<label><input type="radio" name="radSortby" value="dat">&nbsp;Date</label></p>' +
  '<p style="margin:0;"><label title="Answered By"><input type="checkbox" name="chkUsername" checked="checked">&nbsp;<span id="jfsUser">' + myUsername + '</span></label>' +
  '<span style="float:right;"><button type="submit" id="sitesrch">SuMo</button>&nbsp;' +
  '<button type="submit" id="goog" name="Go" title="Google site:support.mozilla.org">Google</button></span></p>' +
  '<p style="margin:0"><label id="jfsQuery"><input type="text" name="q" size="24" style="width:100%"></label><br />Mine: ' + 
  '<a href="https://support.mozilla.org/'+myLang+'/questions/all?show=all&owner=mine#filters" onclick="if(window.location.href==this.href){window.location.reload();return false;}">All</a>&nbsp;&bull;&nbsp;' +
  '<a href="https://support.mozilla.org/'+myLang+'/questions/all?show=needs-attention&owner=mine#filters" onclick="if(window.location.href==this.href){window.location.reload();return false;}">ATTN</a>&nbsp;|&nbsp;Other: ' +
  '<a href="https://support.mozilla.org/'+myLang+'/questions/all?show=all&owner=all#filters" onclick="if(window.location.href==this.href){window.location.reload();return false;}">All</a>&nbsp;&bull;&nbsp;' +
  '<a href="https://support.mozilla.org/'+myLang+'/questions/all?show=needs-attention&filter=new&owner=all#filters" onclick="if(window.location.href==this.href){window.location.reload();return false;}">New</a></p></div>';
document.body.appendChild(myForm);
document.getElementById("goog").addEventListener("click", addParams, false);
document.getElementById("sitesrch").addEventListener("click", addParams, false);
document.getElementById("jfsSearchForm").addEventListener("submit", addParams, false);

// Home link
var bcli = document.querySelector("#breadcrumbs li:last-child");
if (bcli){
  if (bcli.innerHTML == "Support Forum") bcli.innerHTML = '<a href="/questions">Support Forum</a>';
}

// Contrib status
var qs, j, meta, lrb, replyer, op, s, sty, reps; 
qs = document.querySelectorAll('.questions section');
if (qs.length > 0){
  for (j=0; j<qs.length; j++){
    if (qs[j].querySelector(".thread-meta") && qs[j].querySelector(".thread-meta").children[1].className == "thread-contributed highlighted"){
      meta = qs[j].nextElementSibling;
      if (meta.nodeName == "ASIDE"){
        lrb = meta.children[1].querySelector("a");
        replyer = lrb.textContent;
        replyer = replyer.substr(replyer.indexOf("Last reply by ")+14);
        replyer = replyer.substr(0, replyer.indexOf("\n"));
        op = meta.children[0].textContent;
        op = op.substr(op.indexOf("Posted by ")+10);
        op = op.substr(0, op.indexOf("\n"));
        s = document.createElement("p");
        if (replyer == myUsername || replyer == realname){
          qs[j].style.background = "#ccc";
          s.innerHTML = "<a href=\"" + lrb.href + "\">You made the last reply</a>";
        } else {
          qs[j].style.background = "#ffc";
          if (replyer == op) s.innerHTML = "<a href=\"" + lrb.href + "\" class=\"lrblink\">Last reply by original poster</a>";
          else s.innerHTML = "<a href=\"" + lrb.href + "\" class=\"lrblink\">Last reply by " + replyer + "</a>";
        }
        s.style.cssFloat = "right";
        s.style.marginTop = "-12px";
        qs[j].querySelector(".content").insertBefore(s, qs[j].querySelector(".content").firstChild);
      }
    } else {
      try {
        reps = qs[j].querySelector(".replies h4").textContent;
        if (reps == "0") qs[j].style.background = "#efe";
      } catch(e){
      }
    }
  }
}
sty = document.createElement("style");
sty.setAttribute("type", "text/css");
sty.appendChild(document.createTextNode("h2>a:link{font-weight:bold;}h2>a:visited{font-weight:normal;color:#333;}a.lrblink:link{font-weight:bold;color:red;text-decoration:underline;}a.lrblink:visited{color:#888;}a.lrblink:hover{background:#ff0;}"));
document.body.appendChild(sty);

// User post search
var tgts, i, uname, elNew, divNew, pNew;
//tgts = document.querySelectorAll('.user-section .asked-by, .user-meta .asked-by, aside .user-meta');
tgts = document.querySelectorAll('aside .user-meta'); // INDEX PAGES ONLY
for (i=0; i<tgts.length; i++){
  if (tgts[i].firstElementChild.nodeName == "A") uname = tgts[i].firstElementChild.textContent;
  else {
    uname = tgts[i].textContent;
    uname = uname.substr(uname.indexOf("Posted by ")+10);
    uname = uname.substr(0, uname.indexOf("\n"));
  }
  if(tgts[i].parentNode.nodeName == "ASIDE"){
    elNew = document.createElement("div");
    pNew = document.createElement("span");
    if (tgts[i].parentNode.children.length == 3){
      divNew = tgts[i].parentNode.insertBefore(elNew, tgts[i].parentNode.lastElementChild);
    } else {
      divNew = tgts[i].parentNode.insertBefore(elNew, tgts[i]);
    }
    divNew.setAttribute("style", "background:#f0f8f8;float:right;margin-left:1em;padding:0 4px;");
  } else {
    if(tgts[i].parentNode.className == "user-section"){
      elNew = document.createElement("div");
      divNew = tgts[i].parentNode.appendChild(elNew);
      divNew.setAttribute("style", "background:#eff;border:1px solid #8dd;border-radius:6px;margin-top:1em;padding:3px 6px;float:right;text-align:left");
      pNew = document.createElement("p");
    } else {
      elNew = document.createElement("ul");
      divNew = tgts[i].appendChild(elNew);
      divNew.setAttribute("style", "padding-left:12px;margin-top:4px");
      pNew = document.createElement("li");
    }
  }
  elNew = document.createElement("a");
  elNew.href = "https://support.mozilla.org/"+myLang+"/search?sortby=1&a=1&w=2&asked_by=" + uname;
  elNew.appendChild(document.createTextNode(uname + '\'s Q\'s'));
  elNew.setAttribute("target", "_blank");
  pNew.appendChild(elNew);
  if (pNew.nodeName == "SPAN"){
    pNew.appendChild(document.createTextNode(" | "));
  } else {
    if (pNew.nodeName == "P"){
      elNew = document.createElement("br");
      pNew.appendChild(elNew);
    } else {
      divNew.appendChild(pNew);
      pNew = document.createElement("li");
    }
  }
  elNew = document.createElement("a");
  elNew.href = "https://support.mozilla.org/"+myLang+"/search?sortby=1&a=1&w=2&answered_by=" + uname;
  elNew.appendChild(document.createTextNode(uname + '\'s A\'s'));
  elNew.setAttribute("target", "_blank");
  elNew.setAttribute("title", "Shift+click to specify keywords");
  elNew.addEventListener("click",kwchk,true); // check for shift+click
  pNew.appendChild(elNew);
  divNew.appendChild(pNew);
}

// Link to Answer, Quote button
var pes, linkNew, srch;
tgts = document.querySelectorAll('ul.sidebar-nav');
srch = window.location.search;
for (i=0; i<tgts.length; i++){
  pes = tgts[i].parentNode.previousElementSibling; // question or answer
  if (pes && pes.className.indexOf("answer") > -1){
    // Link to Answer
    elNew = document.createElement("li");
    linkNew = document.createElement("a");
    var pg = "";
    if(srch != ""){
      var intStart = srch.indexOf("page=");
      if(intStart > -1) pg = "?" + srch.substr(intStart);
      if(pg.indexOf("&") > -1) pg = pg.substr(0, pg.indexOf("&"));
    }
    linkNew.href = window.location.protocol + "//" + window.location.host + window.location.pathname + pg + "#" + pes.getAttribute("id");
    linkNew.appendChild(document.createTextNode("LINK TO ANSWER"));
    linkNew.setAttribute("title", "Right-click to copy link location");
    linkNew.setAttribute("onclick", "window.prompt('LINK TO ANSWER', this.href); return false");
    elNew.appendChild(linkNew);
    tgts[i].appendChild(elNew);
    // Quote button
    elNew = document.createElement("li");
    linkNew = document.createElement("a");
    linkNew.href = "#id_content";
    linkNew.appendChild(document.createTextNode("QUOTE IN REPLY"));
    linkNew.setAttribute("answerid", pes.getAttribute("id"));
    elNew.appendChild(linkNew);
    tgts[i].appendChild(elNew);
    linkNew.addEventListener("click",quotePost,false);
  }
}

function addParams(e){
  var f = document.getElementById("jfsSearchForm");
  if (f){
    var q = document.querySelector('#jfsQuery input');
    if (q.value.length == 0){
      alert("Blank query? Please try again.");
      return false;    
    }
    var username = document.getElementById("jfsUser").textContent;
    if (e.target.id == "sitesrch"){  // SuMo search
      var rads = document.querySelectorAll("#jfsSortBy input[type='radio']");
      for (var i=0; i<rads.length; i++){
        if (rads[i].checked){
          if (rads[i].value == "rel"){
            var sortparam = "sortby=0";
            break;
          } else {
            var sortparam = "sortby=1"; // date
            break;
          }
        }
      }
      var url = "https://support.mozilla.org/"+myLang+"/search?" + sortparam + "&a=1&w=2&q="+q.value.replace(/\s/g, "+");
      if (document.querySelector('#jfsUser').previousElementSibling.checked){
        window.open(url+"&answered_by="+username, "_blank");
      } else {
        window.open(url, "_blank");
      }
    } else { // Google search (click or Enter)
      var rads = document.querySelectorAll("#jfsSortBy input[type='radio']");
      for (var i=0; i<rads.length; i++){
        if (rads[i].checked){
          if (rads[i].value == "rel"){
            var sortparam = "";
            break;
          } else {
            var sortparam = "&tbs=qdr:y,sbd:1"; // date, over latest year
            break;
          }
        }
      }
      if (e.type == "click"){
        var url = "https://www.google.com/search?q="+q.value.replace(/\s/g, "+");
        if (document.querySelector('#jfsUser').previousElementSibling.checked){
          window.open(url+" +"+username+"+site:support.mozilla.org/questions+-inurl:filter+-inurl:tagged" + sortparam, "_blank");
        } else {
          window.open(url+"+site:support.mozilla.org/questions+-inurl:filter+-inurl:tagged" + sortparam, "_blank");
        }
      } else { // form submitted
        if (document.querySelector('#jfsUser').previousElementSibling.checked){
          q.value += " " + username;
        }
        q.value += " site:support.mozilla.org/questions -inurl:filter -inurl:tagged";
      }
    }
  }
  e.preventDefault();
  e.stopPropagation();
  return false;
}
function kwchk(e){
  if (e.shiftKey != true) return true; // no keywords
  var kw = prompt("Keywords", "");
  if (kw.length == 0) return true; // no keywords
  e.target.href += "&q=" + encodeURIComponent(kw);
  return true;
}
function quotePost(e){
  var ansid, ansdiv, uname, strQuote = "", pars, j, temp;
  ansid = e.target.getAttribute("answerid");
  if (ansid){
    ansdiv = document.getElementById(ansid);
    if (ansdiv){
      uname = ansdiv.querySelector('.user-meta .asked-by a');
      if (uname) strQuote = "Hi " + uname.textContent + ", you wrote:\n\n";
      pars = ansdiv.querySelectorAll('.main-content p');
      if (pars.length > 0){
        strQuote += "<blockquote>";
        for (j=0; j<pars.length; j++){
          strQuote += pars[j].innerHTML;
          if (j+1 < pars.length) strQuote += "<br><br>";
        }
        strQuote += "</blockquote>\n\n";
      }
      document.getElementById("id_content").value = strQuote + document.getElementById("id_content").value;
    }
  }
  e.cancelDefault();
  e.stopPropagation();
}