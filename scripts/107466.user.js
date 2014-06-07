// ==UserScript==
// @name           reddit+
// @namespace      http://bensholds.com
// @description    a reddit redesign with a touch of Google+
// @version        1.0
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*
// ==/UserScript==

// via http://diveintogreasemonkey.org/patterns/add-css.html
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// finds an element with given class c, and change it to class name n
function changeElementClass(c, n) {
    var i,e;
    
    e = document.getElementsByTagName("*");
    
    for (i = 0; i < e.length; i++) {
        if (e[i].className == c) {
            e[i].setAttribute("class", n);
        }
    }
}

// returns the nth (0 index) element of given class c
// returns the last element with given class c (-1)
function getElementByClass(c, n) {
    var i,e;
    var eArr = new Array();
    
    e = document.getElementsByTagName("*");
    
    for (i = 0; i < e.length; i++) {
        if (e[i].className == c) {
            eArr.push(e[i]);
        }
    }
    
    switch (n) {
        case -1:
            return eArr[eArr - 1];
            break;
        default:
            if (eArr[n] == null)
                return null;
            else
                return eArr[n];
    }
    
    return null;
}

// get the subreddit name, and remove it from where it usually is
function getSubredditName() {
    var srSpan = getElementByClass("hover pagename redditname", 0);
    
    if (srSpan) {
        var hbl = document.getElementById("header-bottom-left");
        hbl.removeChild(srSpan);
        return srSpan.firstChild.innerHTML;
    } else {
        return "reddit";
    }
}

// takes in a unsorted list element and takes out some seperators
function cleanNonUserSubreddits(list) {
    var i;
    
    for (i = 0; i < list.childNodes.length; i++) {
        list.childNodes[i].removeChild(list.childNodes[i].childNodes[0]);
    }
    
    return list;
}

// moves the buttons from the top of the div to the bottomright
function moveButtons() {
    var i, e;
    
    e = document.getElementsByTagName("*");
    
    for (i = 0; i < e.length; i++) {
        if (e[i].className.indexOf("sidebox") != -1) {
            var buttonDiv = document.createElement("div");
            buttonDiv.setAttribute("style", "text-align: right;");
            buttonDiv.appendChild(e[i].firstChild);
            e[i].appendChild(buttonDiv);
        }
    }
}

function init() {
    initBody();
}

// everything that needs to be done in the body, mostly styling junk
function initBody() {
    // add some custom classes
    addGlobalStyle(
        ".buttonplus a, .tabsmenu a {" +
            "color: #8c8c8c;" +
            "text-decoration: none;" +
            "font-size: x-small;" +
            "font-weight: bold;" +
            "padding: 8px 10px;" +
            "display: block; }" +
            
        ".buttonplus, .tabsmenu li {" +
            "-moz-border-radius: 3px;" +
            "-webkit-border-radius: 3px;" +
            "border-radius: 3px;" +
            "background: #fdfdfd;" +
            "text-align: center;" +
            "display: inline-block;" +
            "border: 1px solid #e1e1e1; }" +
        
        ".buttonplus:hover, .tabsmenu li:hover {" +
            "background: -webkit-gradient(linear, left top, left bottom, from(#fdfdfd), to(#f8f8f8));" +
            "background: -moz-linear-gradient(top, #fdfdfd, #f8f8f8);" +
            "border-color: #d1d1d1; }" + 
        
        ".buttonplus:active, .tabsmenu li:active {" +
            "-moz-box-shadow: inset 1px 2px 2px 0 #f0f0f0;" +
            "-webkit-box-shadow: inset 1px 2px 2px 0 #f0f0f0;" +
            "box-shadow: inset 1px 2px 2px 0 #f0f0f0; }" +
        
        ".buttonplus.orange {" +
            "background: #ff453a;" +
            "border: 1px solid #bf332c; }" +
        
        ".buttonplus.orange:hover {" +
            "background: -webkit-gradient(linear, left top, left bottom, from(#ff453a), to(#f74239));" +
            "background: -moz-linear-gradient(top, #ff453a, #f74239);" +
            "border-color: #b02f28; }" +
        
        ".buttonplus.orange:active {" +
            "-moz-box-shadow: inset 1px 2px 2px 0 #f04037;" +
            "-webkit-box-shadow: inset 1px 2px 2px 0 #f04037;" +
            "box-shadow: inset 1px 2px 2px 0 #f04037; }" +
        
        ".buttonplus.orange a {" +
            "color: #fff; }" +
        
        ".tabsmenu {" +
            "list-style: none;" +
            "padding: 0;" +
            "margin-bottom: 7px; }" +
        
        ".tabsmenu li {" +
            "border-right: none;" +
            "-moz-border-radius: 0;" +
            "-webkit-border-radius: 0;" +
            "border-radius: 0; }" +
        
        ".tabsmenu li:first-child {" +
            "-moz-top-left-radius: 3px;" +
            "-moz-bottom-left-radius: 3px;" +
            "-webkit-top-left-radius: 3px;" +
            "-webkit-bottom-left-radius: 3px;" +
            "border-top-left-radius: 3px;" +
            "border-bottom-left-radius: 3px; }" +
        
        ".tabsmenu li:last-child {" +
            "border-right: 1px solid #e1e1e1;" +
            "-moz-top-right-radius: 3px;" +
            "-moz-bottom-right-radius: 3px;" +
            "-webkit-top-right-radius: 3px;" +
            "-webkit-bottom-right-radius: 3px;" +
            "border-top-right-radius: 3px;" +
            "border-bottom-right-radius: 3px; }" +
        
        ".tabsmenu li.selected {" +
            "border: 1px solid #b8312a;" +
            "background: #ff453a; }" +
        
        ".tabsmenu li.selected a {" +
            "color: #fff; }" +
        
        ".tabsmenu li.selected:hover {" +
            "background: -webkit-gradient(linear, left top, left bottom, from(#ff453a), to(#f74239));" +
            "background: -moz-linear-gradient(top, #ff453a, #f74239);" +
            "border-color: #b02f28; }" +
        
        ".tabsmenu li.selected:active {" +
            "-moz-box-shadow: inset 1px 2px 2px 0 #f04037;" +
            "-webkit-box-shadow: inset 1px 2px 2px 0 #f04037;" +
            "box-shadow: inset 1px 2px 2px 0 #f04037; }" +
            
        "input {" +
            "border-color: #e1e1e1 !important; }" +
            
        ".link.promotedlink.promoted {" +
            "background: #fafafa; }" +
        
        ".organic-listing {" +
            "border: 0; }" +
            
        ".login-form-side {" +
            "border: 0;" +
            "background: #fafafa;" +
            "padding-bottom: 2px; }" +
            
        ".sidecontentbox .content {" +
            "border: 0;" +
            "background: #fafafa; }" +
            
        "#srList {" +
            "display: none;" +
            "top: 25px !important;" +
            "width: auto !important;" +
            "border:1px solid #c2d9f0 !important;" +
            "position: absolute;" +
            "max-height: none !important;" +
            "height: auto; }" +
            
        "#srList.on {" +
            "display: block; }" +
            
        "#srList.on a {" +
            "display: block;" +
            "padding-bottom: 3px;}" +
            
        ".bevel {" +
            "border:1px solid #c2d9f0;" +
            "background: -webkit-gradient(linear, left top, left bottom, from(#f7fbff), to(#eff7ff));" +
            "padding: 4px;" +
            "-moz-border-radius: 3px !important;" +
            "-webkit-border-radius: 3px !important;" +
            "border-radius: 3px !important;" +
            "background: -moz-linear-gradient(top, #f7fbff, #eff7ff);" +
            "height:13px;"+
            "text-align:vertical; }" +
            
        "#header {" +
            "border-bottom: 1px solid #b8cbde; }" +
            
        "#full-side {" +
            "position: absolute;" +
            "top: 12px;" +
            "right: 0;" +
            "margin-right:5px; }" +
        
        "#sr-holder {" +
            "position: relative;" +
            "float: left;" +
            "margin-right: 7px;" +
            "font-weight: bold;" +
            "color: grey;" +
            "cursor: pointer !important;}"
    );
    
    initHeader();
}

// everything that needs to be done in the header
function initHeader() {
    // parent header
    var header = document.getElementById("header");
    // subreddits, remove them - we'll need them later
    var subreddits = document.getElementById("sr-header-area");
    // this is the default subreddits shown
    var subredditsG = document.getElementById("sr-bar");
    header.removeChild(subreddits);
    
    // header-bottom-left (tab menu)
    var hbl = document.getElementById("header-bottom-left");
    var tabmenu = hbl.lastChild;
    // remove tab menu, we'll need these later too
    hbl.removeChild(tabmenu);
    
    // header-bottom-right (user info)
    var hbr = document.getElementById("header-bottom-right");
    
    // remove and prep mail and spacers
    var mail = document.getElementById("mail");
    
    // if mail exists (logged in)
    if (mail) {
        mail.setAttribute("style", "padding:3px 0 0 5px;position: relative; height: 15px;float: left;");
        
        if (mail.className == "nohavemail") {
            mail.firstChild.src = "http://bensholds.com/redditplus/nohavemail.png"; // use a custom nomail image
            mail.setAttribute("style", "padding:1px 0 0 5px;position: relative; height: 15px;float: left;");
        }
        
        hbr.removeChild(mail.previousSibling); // remove spacer to the left of the element
    
        hbr.removeChild(mail);
    }
    
    header.removeChild(hbr);
    
    // holds everything on the top right
    var fullSide = document.createElement("div");
    fullSide.setAttribute("id", "full-side");
    fullSide.setAttribute("style", "");
    
    // our subreddit guy
    var srBevel = document.createElement("div");
    srBevel.setAttribute("id", "sr-holder");
    // add the bevel class
    srBevel.setAttribute("class", "bevel");
    srBevel.innerHTML = "/r/" + getSubredditName();
    // create the down arrow icon and place in in the div
    var imgDown = document.createElement("img");
    imgDown.src = "http://bensholds.com/redditplus/arr_d.png";
    imgDown.setAttribute("style", "vertical-align: top;padding-left: 10px;");
    srBevel.appendChild(imgDown);
    // create the drop down div
    var srList = document.createElement("div");
    srList.setAttribute("id", "srList");
    srList.setAttribute("class", "bevel");
    var srLinks = null;
    
    // if theres only a seperator in the sr list, then the user isn't logged in
    if (subreddits.childNodes[1].childNodes.length == 1) {
        // so we show the default subreddits with a cleaned up list
        srLinks = cleanNonUserSubreddits(subredditsG);
    } else { // otherwise get the users own subreddits
        srLinks = subreddits.childNodes[1];
    }
    
    srLinks.removeAttribute("class");
    srList.appendChild(srLinks);
    // add it into fullSide
    fullSide.insertBefore(srList, fullSide.firstChild);
    srBevel.addEventListener("click", srHover, false);
    fullSide.appendChild(srBevel);
    
    // user info
    hbr.setAttribute("style", "position:relative;float:left;top:0"); // needs to be inline
    hbr.setAttribute("class", "bevel");
    fullSide.appendChild(hbr);
    
    // add mail
    if (mail) fullSide.appendChild(mail);
 
    header.insertBefore(fullSide, header.lastChild);
    
    // give this function the old tabmenu
    initContent(tabmenu);
}

// everything that needs to be done in the content, we send the tab menu
// to this function so we can add it in.
function initContent(tabmenu) {
    // content is defined by a class name, but an anchor with the name of
    // "content" is consistently its previous sibling, so we use that to
    // make sure we get the correct "content" div
    var aContent = document.getElementsByName("content");
    var siteTable = aContent[0].nextSibling;
    
    tabmenu.setAttribute("class", "tabsmenu");
    
    // the the custom tab menu as the first child in the content div
    siteTable.insertBefore(tabmenu, siteTable.firstChild);
    
    // change all elements with class "btn" to custom "buttonplus" class
    changeElementClass("btn", "buttonplus");
    
    // replace the the buttons with custom ones by change the class
    changeElementClass("morelink", "buttonplus orange");
    
    moveButtons();
}

// function called when we click on the subreddit menu
function srHover() {
    // get the subreddit list
    var srList = document.getElementById("srList");
    
    if (srList.className == "bevel on") {
        srList.setAttribute("class", "bevel");
    } else {
        srList.setAttribute("class", "bevel on");
    }
}

init(); // main entry