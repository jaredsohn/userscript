// ==UserScript==
// @name           Old Google navigation bar
// @version        2.0.1
// @author         Blinky
// @description    This simple script replaces Google grid navigation with old navigation bar.
// @include        http*://*.google.*/*
// @run-at         document-end
// ==/UserScript==

var gMenuContent =  document.getElementById("gbwa");
if(gMenuContent) {
    //Google bar styling
    var gBarStyle = document.createElement('style');
    gBarStyle.type = 'text/css';
    gBarStyle.innerHTML = '\
    #gba {height: auto;}\
    #gb {position: static;}\
    .gb_gbsh {top: -90px !important;} /*Google Profiles fix*/\
    #gb #gBar {background: #2D2D2D; height: 30px; min-width: 800px; position: relative; width: 100%; z-index: 990;} \
    #gBarList {list-style: none outside none; margin: 0 0 0 10px; padding: 0;}\
    #gBarList li {display: inline-block; padding: 0;}\
    #gBarList li a, .gMoreBtn {color: #BBBBBB; display: block; line-height: 30px; font-size: 13px; font-weight: bold; text-decoration: none;}\
    #gBarList li a .text, .gMoreBtn {padding: 0 8px;} \
    #gBarList li a.active .topline {height: 2px; display: block; background: #DD4B39 !important; position: relative; margin-bottom: -2px;}\
    #gBarList li a.active {color: #FFF;}\
    #gBarList > li > a:hover:not(.gMoreBtn) {color: #FFF; background: #4C4C4C;}\
    \
    #gDropListItem { display: none; list-style: none; position: absolute; z-index:999; padding: 10px 0; background: #FFF; box-shadow: 1px 3px 2px 1px rgba(0, 0, 0, 0.2);}\
    #gDropListItem li {display: block;}\
    #gDropListItem li a {line-height: 27px; display: block; padding: 0 12px; color: #3366CC;}\
    #gDropListItem li a:hover {background: #EEE;}\
    #gMore:hover .gMoreBtn {color: #3366CC;}\
    .gMoreBtn:after {font-size: 9px; content: " ▼";}\
    #gBarList #gMore:hover {background: #FFF}\
    #gBarList li:hover #gDropListItem {display: block;}\
    #gMoreSeperator {height:1px; background: #BEBEBE; margin: 10px 0;}\
    .EvenMoreBtn::after {content: " »"}\
    ';
    document.getElementsByTagName('head')[0].appendChild(gBarStyle);

    //Google bar content
    var gBarContainer = document.getElementById("gb");

    var gBar = document.createElement("div");
    gBar.id = "gBar";

    var gBarList = document.createElement("ul");
    gBarList.id = "gBarList";

    var gBarListLoc = gBarContainer.getElementsByTagName("div")[0];
    
    //Add "More" link at the end of the list
    var gMore = gMenuContent.getElementsByClassName("gb_r")[0];
    gMore.setAttribute("class","gMoreBtn");
    gMore.setAttribute("href","#");
    var gListItem = document.createElement("li");
    gListItem.id = "gMore";
    
    //Dropdown list
    var gDropList = document.createElement("ul");
    gDropList.id = "gDropListItem"
    
    //Dropdown list seperator
    var gListSep = document.createElement("li");
    gListSep.id = "gMoreSeperator";
    gDropList.appendChild(gListSep);
    
    //Add "Even more.." button to dropdown list
    var gEvenMore = gMenuContent.getElementsByClassName("evenMoreLink")[0];
    gEvenMore.setAttribute("class","EvenMoreBtn");
    var gEvenMoreLi = document.createElement("li");
    gDropList.appendChild(gEvenMoreLi).appendChild(gEvenMore);


    gBarList.appendChild(gListItem);
      gListItem.appendChild(gMore);
      gListItem.appendChild(gDropList);
    
    gBarContainer.insertBefore(gBar,gBarListLoc);
      gBar.appendChild(gBarList);

    //Place items inside gBar
    var gList = gMenuContent.getElementsByTagName("li");
    while (gList[0]) {
        //Remove class from item
        gList[0].removeAttribute("class");

        //Remove class from link
        var link = gList[0].getElementsByTagName("a")[0];
        link.removeAttribute("class");

        //Remove icon
        var ItemIcon = gList[0].getElementsByClassName("gb_d")[0];
        ItemIcon.setAttribute("class","topline");

        //Remove class from text label
        var ItemText = gList[0].getElementsByClassName("gb_e")[0];
        ItemText.setAttribute("class","text");
        
        var gStat = link.getAttribute("id");
        if (gStat == "gb1" || gStat == "gb8" ||  gStat == "gb5" ||  gStat == "gb78" || gStat == "gb36" || 
            gStat == "gb25" ||  gStat == "gb24" || gStat == "gb51" || gStat == "gb119" || gStat == "gb23") {
           //gBarList.appendChild(gList[0]);
           gBarList.insertBefore(gList[0],gListItem)
        } else {
           gDropList.insertBefore(gList[0],gListSep);
        }
    }

    //Hide Google Menu button
    gMenuContent.setAttribute("style","display: none;");
    
//Active states
    var gPath = window.location.pathname;
    var gHost = window.location.hostname;

    //If Search make it active    
    if(gPath.indexOf("webhp") >= 0 || gPath.indexOf("search") >= 0 || gHost.indexOf("www.google") >= 0 && gPath == "/") {
        document.getElementById("gb1").setAttribute("class","active");
    }
    
    //If Calendar make it active
    if(gPath.indexOf("calendar") >= 0) {
        document.getElementById("gb24").setAttribute("class","active");
    }
    
    //If GDrive make it active
    if(gHost.indexOf("drive.google") >= 0) {
        document.getElementById("gb25").setAttribute("class","active");
    }
    
    //If Gmail make it active
    if(gHost.indexOf("mail.google") >= 0) {
        document.getElementById("gb23").setAttribute("class","active");
    }

    //If Gmail make it active
    if(gHost.indexOf("maps.google") >= 0) {
        document.getElementById("gb8").setAttribute("class","active");
    }
}