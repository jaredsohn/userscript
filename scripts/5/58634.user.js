// ==UserScript==
// @name          Forum be gone
// @namespace     forum_be_gone
// @description	  Script to remove discussion forums from derstandard.at, diestandard.at, diepresse.com, kurier.at, orf.at, sueddeutsche.de, faz.net and many others
// @author        Dominik Grafenhofer, http://www.grafenhofer.at
// @homepage      http://www.grafenhofer.at
// @include       http*://*.derstandard.at/*
// @include       http*://derstandard.at/*
// @include       http*://diestandard.at/*
// @include       http*://dastandard.at/*
// @include       http*://diepresse.com/*
// @include       http*://kurier.at/*
// @include       http*://*.oe24.at/*
// @include       http*://*.orf.at/*
// @include       http*://*.sueddeutsche.de/*
// @include       http*://*.faz.net/*
// @include       http*://*.welt.de/*
// @include       http*://*.wirtschaftsblatt.at/*
// @include       http*://taz.de/*
// @include       http*://*.nachrichten.at/*
// @include       http*://*.spiegel.de/*
// @include       http*://*.zeit.de/*
// @include       http*://*.kleinezeitung.at/*
// @include       http*://*.handelsblatt.com/*

// ==/UserScript==

// Version 0.2.14, License: GPL v2 or GPL v3 at your choice

var domain = window.location.hostname;
var tmpelements;
var tmpelementsarray = [];

function myframename() {                  // find out in which iframe we are on derstandard
  var myframe = this.window;
//  var topframes = parent.top.frames;
  var topframes = top.frames;
  for(var i = 0; i < topframes.length; i++)
  if (topframes[i] == myframe){
    return topframes[i].name;
  }
}

if (domain == "derstandard.at" || domain == "diestandard.at" || domain == "dastandard.at") {                  // der-/die-/dastandard.at forum
  tmpelements = document.getElementsByClassName("communityCanvas");
  if (tmpelements[0]) {
    if (location.href.indexOf("#forumstart") === -1 && location.href.indexOf("#pid") === -1) {    // forum nicht ausblenden, wenn wir uns auf posting seite x > 1 befinden
      var get_forum_back = document.createElement("a");                                          // link zum wiedereinblenden des forum erstellen
      get_forum_back.setAttribute("class", "lnkcol");
      get_forum_back.setAttribute("style", "font-variant: small-caps; letter-spacing: 1px; text-transform:uppercase;");
      get_forum_back.title = 'Diskussion einblenden';
      get_forum_back.id = 'Diskussioneinblenden';
      var script = document.createElement("script");
      script.type = "application/javascript";
      script.textContent = 'function show_derstandard_forum() { var click_tmpelements = document.getElementsByClassName("communityCanvas"); click_tmpelements[0].style.display = "block"; document.getElementById("Diskussioneinblenden").parentNode.style.display = "none";}';
    document.body.appendChild(script);
      get_forum_back.href = 'javascript:show_derstandard_forum()';
      var txt = document.createTextNode('> Diskussion einblenden');
      get_forum_back.appendChild(txt);      
      var get_forum_back_span = document.createElement("span");
      get_forum_back_span.appendChild(document.createElement("br"));
      get_forum_back_span.appendChild(document.createElement("br"));
      get_forum_back_span.appendChild(get_forum_back);
      get_forum_back_span.appendChild(document.createElement("br"));
      get_forum_back_span.appendChild(document.createElement("br"));
      var tmptoolselement = document.getElementById("articleTools");
      if (tmptoolselement) {
        tmptoolselement.appendChild(get_forum_back_span);
      }
    tmpelements[0].style.display = "none";                                       // hide immediately
    }
    var h4_elements = document.getElementsByTagName("h4");
    var h4_small;
    for(i = 0; i < h4_elements.length; i++) {
      h4_small = h4_elements[i].getElementsByTagName("small");
      if (h4_small[0]) {
        tmpelementsarray.push(h4_small[0]);
      }
    }
  }

// from here on old stuff...
  tmpelements = document.getElementsByTagName("h3");
  var tmpsmall;
  for(i = 0; i < tmpelements.length; i++) {
    tmpsmall = tmpelements[i].getElementsByTagName("small");
    if (tmpsmall[0]) {
      tmpelementsarray.push(tmpsmall[0]);
    }
  }
  tmpelements = document.getElementsByTagName("a");
  for(i = 0; i < tmpelements.length; i++) {
    tmpsmall = tmpelements[i].getElementsByTagName("small");
    if (tmpsmall[0]) {
      tmpelementsarray.push(tmpsmall[0]);
    }
  }
  tmpelements = document.getElementsByTagName("h6");
  var tmpstring;
  for(i = 0; i < tmpelements.length; i++) {
    tmpstring = tmpelements[i].innerHTML;
    cutoff = tmpstring.indexOf(" | ");
    if (cutoff > 0) {
      tmpelements[i].innerHTML = tmpstring.substring(0,cutoff);
    } else {
      if (tmpstring.indexOf("Posting") > 0) {
        tmpelementsarray.push(tmpelements[i]);
      }
    }
  }
}

if (domain == "mobil.derstandard.at") {                  // mobil.derstandard.at
  tmpelements = document.getElementsByClassName("info context");
  for(i = 0; i < tmpelements.length; i++) {
    tmpelementsarray.push(tmpelements[i]);
  }
  tmpelements = document.getElementsByClassName("p context");
  for(i = 0; i < tmpelements.length; i++) {
    tmpelementsarray.push(tmpelements[i]);
  }
  tmpelements = document.getElementsByClassName("button forum");  // nur ersten link auf forum entfernen...
  if (tmpelements[0]) {
    tmpelementsarray.push(tmpelements[0]);
  }
  if (tmpelements[1]) {
    tmpelementsarray.push(tmpelements[1].firstChild.firstChild);
    tmpelements[1].firstChild.lastChild.innerHTML = "Zeige Postings";
  }
}

if (domain == "diepresse.com") {                                                   // diepresse.com forum
  tmpelements = document.getElementById("newcommentform");
  if (tmpelements) {
    tmpelementsarray.push(tmpelements);
  }
  tmpelements = document.getElementById("commentbox");
  if (tmpelements) {
    tmpelementsarray.push(tmpelements);
  }
  tmpelements = document.getElementsByTagName("a");
   for(i=0; i < tmpelements.length; i++) {
     if (tmpelements[i].getAttribute("title") === "Artikel kommentieren") {
       tmpelementsarray.push(tmpelements[i]);
     }
   }
  tmpelements = document.getElementById("comments");
  if (tmpelements) {
    tmpelementsarray.push(tmpelements);
  }
  tmpelements = document.getElementsByClassName("comments-form");
  for(i = 0; i < tmpelements.length; i++) {
    tmpelementsarray.push(tmpelements[i]);
  }
  tmpelements = document.getElementsByClassName("commentsLink");
  for(i = 0; i < tmpelements.length; i++) {
    tmpelementsarray.push(tmpelements[i]);
  }
}

if (domain == "kurier.at") {                                                       // kurier.at forum
  tmpelements = document.getElementById("userkommentare");
  if (tmpelements) {
    tmpelements.style.display = "none";
  }
  tmpelements = document.getElementsByClassName("kommentieren");
  for(i = 0; i < tmpelements.length; i++) {
    tmpelementsarray.push(tmpelements[i]);
  }
}

if (domain == "www.oe24.at") {                                                     // www.oe24.at forum
  tmpelements = document.getElementsByClassName("posting");
  if (tmpelements[1]) {
    tmpelementsarray.push(tmpelements[1].parentNode);
    tmpelementsarray.push(tmpelements[1].parentNode.previousSibling.previousSibling);
  }
}

if (location.host.search("orf.at") != -1) {                                        // www.orf.at forum
  tmpelements = document.getElementsByClassName("posting");
  for (i = 0; i < tmpelements.length; i++) {
    tmpelementsarray.push(tmpelements[i]);
  }
  tmpelements = document.getElementsByClassName("rightCol infoboxPad disclaimer");
  if (tmpelements.length > 0) {
    tmpelements[0].parentNode.style.display = "none";
  }
  tmpelements = document.getElementById("forum");
  if (tmpelements) {
    tmpelements.style.display = "none";
  }
  tmpelements = document.getElementById("forum_disclaimer");
  if (tmpelements) {
    tmpelements.style.display = "none";
  }
  tmpelements = document.getElementsByTagName("a");
   for (i = 0; i < tmpelements.length; i++) {
     if (tmpelements[i].getAttribute("text") === "ältere Kommentare") {
       tmpelementsarray.push(tmpelements[i]);
     }
   }
  tmpelements = document.getElementsByClassName("forum_online_open");
  for (i = 0; i < tmpelements.length; i++) {
    tmpelementsarray.push(tmpelements[0]);
  }
  tmpelements = document.getElementsByClassName("time");
  var tmpchildren;
  for (i = 0; i < tmpelements.length; i++) {
    tmpchildren = tmpelements[i].childNodes;
    if (tmpchildren[0].tagName == "A") {
      tmpelementsarray.push(tmpchildren[0]);
      tmpelementsarray.push(tmpchildren[1]);
    }
    if (tmpchildren[1].tagName == "A") {
      tmpelementsarray.push(tmpchildren[1]);
      tmpelementsarray.push(tmpchildren[2]);
    }
  }
}

if (domain == "www.sueddeutsche.de") {                                                     // www.sueddeutsche.de forum
  tmpelements = document.getElementsByClassName("kommentare");
  if (tmpelements[0]) {
    tmpelementsarray.push(tmpelements[0]);
  }
  tmpelements = document.getElementsByClassName("comments");
  if (tmpelements[0]) {
    tmpelementsarray.push(tmpelements[0]);
  }
}

if (domain == "www.faz.net") {                                                     // www.faz.net forum
  tmpelements = document.getElementsByClassName("ModulLesermeinungenFooter");
  if (tmpelements[0]) {
    tmpelementsarray.push(tmpelements[0]);
  }
}

if (domain == "www.welt.de") {                                                     // www.welt.de forum
  tmpelements = document.getElementById("readcomments");
  if (tmpelements) {
    tmpelementsarray.push(tmpelements);
  }
  tmpelements = document.getElementsByClassName("commentLink");
  for (i = 0; i < tmpelements.length; i++) {
    tmpelementsarray.push(tmpelements[i]);
  }
}

if (domain == "taz.de") {                                                     // taz.de forum
  tmpelements = document.getElementsByClassName("sect sect_commentlinks box");
  for (i = 0; i < tmpelements.length; i++) {
    tmpelementsarray.push(tmpelements[i]);
  }
  tmpelements = document.getElementsByClassName("topiconnavi_mitte");
  for (i = 0; i < tmpelements.length; i++) {
    if (tmpelements[i].parentNode.title == "Artikel kommentieren") {
      tmpelementsarray.push(tmpelements[i].parentNode);
    }
  }
}


if (domain == "www.wirtschaftsblatt.at") {                                                     // wirtschaftsblatt.at forum
  tmpelements = document.getElementsByClassName("block commentbox clear");
  for (i = 0; i < tmpelements.length; i++) {
    tmpelementsarray.push(tmpelements[i]);
  }
}

if (domain == "www.nachrichten.at") {                                                     // nachrichten.at forum
  tmpelements = document.getElementsByClassName("anz_postings");
  for (i = 0; i < tmpelements.length; i++) {
    tmpelementsarray.push(tmpelements[i].parentNode);
  }
  tmpelements = document.getElementsByClassName("artikeldiskussion");
  for (i = 0; i < tmpelements.length; i++) {
    tmpelementsarray.push(tmpelements[i]);
  }
  tmpelements = document.getElementsByClassName("artikelcontent4");
  for (i = 0; i < tmpelements.length; i++) {
    tmpelementsarray.push(tmpelements[i]);
  }
  tmpelements = document.getElementsByClassName("navtaboff lasttab");
  for (i = 0; i < tmpelements.length; i++) {
    if (tmpelements[i].innerHTML.indexOf("Kommentare") > 0)  {
      tmpelementsarray.push(tmpelements[i]);
    }
  }
  tmpelements = document.getElementsByClassName("zusatz_kommentaranzahl");
  for (i = 0; i < tmpelements.length; i++) {
      tmpelementsarray.push(tmpelements[i].parentNode);
  }
}

if (domain == "www.spiegel.de") {                                                     // spiegel.de forum
  tmpelements = document.getElementsByClassName("spCommunityBox spArticleBottomBox spClearfix");
  for (i = 0; i < tmpelements.length; i++) {
    tmpelementsarray.push(tmpelements[i]);
  }
}

if (domain == "www.zeit.de") {                                                     // www.zeit.de forum
  tmpelements = document.getElementById("comments");
  if (tmpelements) {
    tmpelementsarray.push(tmpelements);
  }
  tmpelements = document.getElementsByClassName("comments");
  for (i = 0; i < tmpelements.length; i++) {
    tmpelementsarray.push(tmpelements[i]);
  }
}

if (domain == "www.kleinezeitung.at") {                                                     // www.kleinezeitung.at forum
  tmpelements = document.getElementById("kommentaremain");
  if (tmpelements) {
    tmpelementsarray.push(tmpelements);
  }
  tmpelements = document.getElementById("comment_count");
  if (tmpelements) {
    tmpelementsarray.push(tmpelements);
  }
}

if (domain == "www.handelsblatt.com") {                                                     // handelsblatt.com forum
  tmpelements = document.getElementsByClassName("commentBox");
  for (i = 0; i < tmpelements.length; i++) {
    tmpelementsarray.push(tmpelements[i]);
  }
}

for(i=0; i < tmpelementsarray.length; i++) {                                    // hide cached objects
  tmpelementsarray[i].style.display = "none";
}