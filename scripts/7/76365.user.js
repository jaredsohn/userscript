// WTM Extras
// Copyright (c) 2009-2012, Franck Quélain
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "wtm_extras", and click Uninstall.
//
// --------------------------------------------------------------------
// CHANGELOG
//
// 2009-07-06 :
//  * Creation
// 2010-03-29 :
//  * Bugfix : Title found repeated
// 2010-04-05 :
//  * Now use the AJAX showsolution call to display solution.
//  * Use WhatTheMovie CSS class to keep the same look.
//  * Add links to usefull websites 
//         to found movies by car, brand, soup, Coca-cola or Zippo
//  * Add personal keywords to a shot
//  * Search shots by personal keyword
// 2010-04-06 :
//  * Replace cookies by localStorage to store keywords
//    because number of cookies by domain is limited to about 20
// 2010-05-09 :
//  * Zoom on the image using Ctrl key (*2) or Shift key (*3) and
//    moving the mouse over the image.
// 2010-10-10 :
//  * Image position determination for the zoom is no more calculated 
//    at the initialisation of the page to avoid a positionning bug if
//    the site is slow.
//  * The zoom and the keywords now work with Chromium (Google Chrome).
//  * Add link to WhatchesInMovies.info 
// 2011-07-04 :
//  * Add "Search on Google" because Google can now search using images.
//  * Use encodeURIComponent(text) to do things properly.
// 2012-03-11 :
//  * Fixed to work with the modification of the website.
// 2012-03-14 :
//  * Remove automatic search on Google Images and TinEye to respect 
//    new conditions of use of the website.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            wtm_extras
// @namespace       http://infernal-quack.net/
// @description     WhatTheMovie Extras! - version 2012.03.14.1
// @include         http://*whatthemovie.com/shot/*
// ==/UserScript==

(function(){

  var shotId = document.getElementsByClassName("number")[0].firstChild.textContent.trim();

  // ==== Utilities ===========================================================
  
  function getElementPosition(theElement){
    var posX = 0;
    var posY = 0;
    while(theElement != null){
      posX += theElement.offsetLeft;
      posY += theElement.offsetTop;
      theElement = theElement.offsetParent;
    }
    return {x:posX,y: posY};
  }
  
  // ==== Show solutions for already solved movie by double clicking ==========
  
  function showMovieTitle() {
    if(unsafeWindow.amazonMovieName) {
      // AJAX request is run only if the movie has been found
      // RMQ : Doesn't work in Chrome because it can't access javascript var in unsafeWindow
      new unsafeWindow.Ajax.Request(
        '/shot/' + shotId + '/showsolution', 
        {asynchronous:true, evalScripts:true}
      ); 
      return false;
    }
  }
  document.getElementById(
    "image_container").addEventListener("dblclick", showMovieTitle, false);
  
  // =============== Extras toolbar ===========================================
  
  var backgroundImageUrl = window.getComputedStyle(document.getElementById("still_shot")).getPropertyValue("background-image");
  backgroundImageUrl = new RegExp("url\\(\\\"?([^\\\"]*)\\\"?\\)","i").exec(backgroundImageUrl)[1];

  var extras = document.createElement("div");
  extras.setAttribute("id","extras");
  extras.appendChild(document.createTextNode("★ Extras ★"));
  var extraLinks = document.createElement("ul");
  extraLinks.setAttribute("class", "nav_shots");
  extras.appendChild(extraLinks);
  document.getElementById("image_container")
    .insertBefore(extras,document.getElementById("image_container")
    .firstChild);
    
  // ===== Links ================================
  
  // IMDB.org
  var extraLink0 = document.createElement("li");
  extraLinks.appendChild(extraLink0);
  var goIMCDB = document.createElement("a");
  goIMCDB.setAttribute("href","http://www.imdb.com/");
  goIMCDB.appendChild(document.createTextNode("✩ Internet Movie DB"));
  extraLink0.appendChild(goIMCDB);

  // IMCDB.org
  var extraLink01 = document.createElement("li");
  extraLinks.appendChild(extraLink01);
  var goIMCDB = document.createElement("a");
  goIMCDB.setAttribute("href","http://imcdb.org/");
  goIMCDB.appendChild(document.createTextNode("✏ ... by car"));
  extraLink01.appendChild(goIMCDB);

  // WatchesInMovies.info
  var extraLink2 = document.createElement("li");
  extraLinks.appendChild(extraLink2);
  var goWhatchesInMovies = document.createElement("a");
  goWhatchesInMovies.setAttribute("href","http://watchesinmovies.info/");
  goWhatchesInMovies.appendChild(document.createTextNode("✏ ... by watch"));
  extraLink2.appendChild(goWhatchesInMovies);

  // Brandchannel.com
  var extraLink3 = document.createElement("li");
  extraLinks.appendChild(extraLink3);
  var goBrand = document.createElement("a");
  goBrand.setAttribute("href",
    "http://www.brandchannel.com/brandcameo_brands.asp?all_year=all_year");
  goBrand.appendChild(document.createTextNode("≣ ... by brand"));
  extraLink3.appendChild(goBrand);
  
  // Soupsong.com
  var extraLink4 = document.createElement("li");
  extraLinks.appendChild(extraLink4);
  var goSoup = document.createElement("a");
  goSoup.setAttribute("href","http://www.soupsong.com/imovies.html");
  goSoup.appendChild(document.createTextNode("≣ ... by soup"));
  extraLink4.appendChild(goSoup);

  // CokeAndMovies
  var extraLink5 = document.createElement("li");
  extraLinks.appendChild(extraLink5);
  var goCoca = document.createElement("a");
  goCoca.setAttribute("href",
    "http://cokeandmovies.canalblog.com/archives/2006/11/27/");
  goCoca.appendChild(document.createTextNode("≣ ... by Coca-Cola"));
  extraLink5.appendChild(goCoca);
  
  // Zippo.com
  var extraLink6 = document.createElement("li");
  extraLinks.appendChild(extraLink6);
  var goZippo = document.createElement("a");
  goZippo.setAttribute("href",
    "http://www.zippo.com/Article.aspx?contentGuid={83DB3D01-1D48-4C18-B325-B1DF10D4334A}&bhcp=1");
  goZippo.appendChild(document.createTextNode("≣ ... by Zippo"));
  extraLink6.appendChild(goZippo);

  // ===== Personal keywords ====================
  
  function getKeywordsForShot(id) {
    var keywords=unsafeWindow.localStorage.getItem("extras_keywords_"+id);
    if(keywords == null) {
      keywords = "";
    }
    return keywords;
  }
  function setKeywordsForShot(id, keywords) {
    if(keywords.trim().length == 0) {
      unsafeWindow.localStorage.removeItem("extras_keywords_"+id);
    }
    else {
      unsafeWindow.localStorage.setItem("extras_keywords_"+id, keywords);
    }
  }
  extras.appendChild(document.createTextNode("Personal keywords :"));
  var keywords=document.createElement("textarea");
  keywords.setAttribute("name","extras_keywords");
  keywords.setAttribute("spellcheck","false");
  keywords.appendChild(document.createTextNode(
    getKeywordsForShot(shotId)));
  extras.appendChild(keywords);
  function keywordsChanged() {
    setKeywordsForShot(shotId, this.value);
  }
  keywords.addEventListener("keyup", keywordsChanged, false);
  
  // ===== Personal keywords search =============
  
  extras.appendChild(document.createTextNode("Keywords search :"));
  var keywordsSearch=document.createElement("input");
  keywordsSearch.setAttribute("name","extras_keywordsSearch");
  keywordsSearch.setAttribute("id","extras_keywordsSearch");
  keywordsSearch.setAttribute("type","text");
  extras.appendChild(keywordsSearch);
  var keywordsSearchButton=document.createElement("a");
  keywordsSearchButton.setAttribute("class","shiny_button_black");
  var keywordsSearchSpan=document.createElement("span");
  keywordsSearchSpan.appendChild(document.createTextNode("≣"));
  keywordsSearchButton.appendChild(keywordsSearchSpan);
  extras.appendChild(keywordsSearchButton);
  var resultBox=document.createElement("ul");
  resultBox.setAttribute("style", "position:absolute;padding-left:5px");
  extras.appendChild(resultBox);
    
  function searchMoviesByKeywords() {
    var keyword = document.getElementById("extras_keywordsSearch").value;
    while(resultBox.hasChildNodes()) {
      resultBox.removeChild(resultBox.lastChild);
    }
    var storageLength=unsafeWindow.localStorage.length;
    var i;
    for(i=0;i<storageLength;i++) {
      var key=unsafeWindow.localStorage.key(i);
      if(key.indexOf("extras_keywords_")!=0) {
        continue;
      }
      var value=unsafeWindow.localStorage.getItem(key);
      if(value.toLowerCase().indexOf(keyword.toLowerCase())==-1) {
        continue;
      }
      var movieId=key.substring("extras_keywords_".length);
      var resultLi=document.createElement("li");
      resultBox.appendChild(resultLi);
      var resultLink=document.createElement("a");
      resultLink.setAttribute("href","/shot/"+movieId);
      resultLi.appendChild(resultLink);
      resultLink.appendChild(document.createTextNode(movieId));
    }
  }
  keywordsSearchButton.addEventListener("click", searchMoviesByKeywords, false);
  
  
  // ==== CSS for added elements ==============================================
  
  var styleObj=document.createElement("style");
  styleObj.setAttribute("type","text/css");
  document.getElementsByTagName("head")[0].appendChild(styleObj);
  styleObj.appendChild(document.createTextNode("\
    #extras {                   \n\
      width:120px;              \n\
      position:absolute;        \n\
      right:-120px;             \n\
      top:0;                    \n\
      z-index:10;               \n\
    }                           \n\
    #extras li a {              \n\
      float:none;               \n\
      width:120px;              \n\
      text-align:left;          \n\
    }                           \n\
    #extras ul {                \n\
      position:static;          \n\
    }                           \n\
    #extras textarea {          \n\
      width:125px;              \n\
      height:100px;             \n\
      background: #1b1b1b;      \n\
      border: 1px solid #696969;\n\
      padding: 3px;             \n\
      color: white;             \n\
    }                           \n\
    #extras_keywordsSearch {    \n\
      width:80px;               \n\
    }                           \n\
    #extras > a {               \n\
      float:right;              \n\
      width:25px;               \n\
    }                           \n\
    "
  ));  
  
  // ==== Zoom on image =======================================================
  var zoomFactor=2;
  var isZoomActivated=false;
  
  // Keep this after CSS because they change image position
  var img = document.getElementById("still_shot");
  // img.parentNode.setAttribute("title","To zoom, keep Ctrl or Shift key pressed and move the mouse.");
  
  var imgPos;
  var backgroundImage;
  var mouseX;
  var mouseY;
  
  function changeZoomFactor(event) {
    if(event.keyCode == 17) { // ctrl
      zoomFactor=2;
      isZoomActivated=true;
      zoomImg();
    }
    if(event.keyCode == 16) { // shift
      zoomFactor=3;
      isZoomActivated=true;
      zoomImg();
    }
  }
  function hideZoom(event) {
    if(event.keyCode == 17 || event.keyCode==16) { // ctrl or shift
      img.style.backgroundPosition="center center";
      if(typeof img.style.backgroundSize != "undefined") {
        img.style.backgroundSize="";
      }
      else if(typeof img.parentNode.style.MozBackgroundSize != "undefined") {
        img.style.MozBackgroundSize="";
      }
      else if (typeof img.parentNode.style.WebkitBackgroundSize != "undefined") {
        img.style.WebkitBackgroundSize="";
      }
      isZoomActivated=false;
    }
  }

  function onMouseMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    if(event.ctrlKey || event.shiftKey) {
       zoomImg();
    }
  }

  function zoomImg() {
    if(typeof imgPos == "undefined") {
      imgPos = getElementPosition(img);
      backgroundImage = document.createElement("img");
      backgroundImage.setAttribute("src", backgroundImageUrl);
    }

    var backgroundSize=backgroundImage.width * zoomFactor + "px " + backgroundImage.height * zoomFactor + "px";
    if(typeof img.style.backgroundSize != "undefined") {
      img.style.backgroundSize=backgroundSize;
    }
    else if(typeof img.parentNode.style.MozBackgroundSize != "undefined") {
      img.style.MozBackgroundSize=backgroundSize;
    }
    else if (typeof img.parentNode.style.WebkitBackgroundSize != "undefined") {
      img.style.WebkitBackgroundSize=backgroundSize;
    }
 
    var mouseOnImgX = mouseX + document.documentElement.scrollLeft - (img.width - backgroundImage.width) / 2;
    var mouseOnImgY = mouseY + document.documentElement.scrollTop - (img.height - backgroundImage.height) / 2 ;
      
    var posX=(mouseOnImgX-imgPos.x)*(1-zoomFactor) + (img.width - backgroundImage.width) / 2;;
    var posY=(mouseOnImgY-imgPos.y)*(1-zoomFactor) + (img.height - backgroundImage.height) / 2;
      
    img.style.backgroundPosition=posX + "px " + posY + "px";
  }

  document.addEventListener("keydown", changeZoomFactor, false);
  document.addEventListener("keyup", hideZoom, false);
  img.parentNode.addEventListener("mousemove", onMouseMove, false);
}
)();
