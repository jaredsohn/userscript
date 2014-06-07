// ==UserScript==
// @name           PhpForum Clean
// @namespace      phpforum
// @description    Entfernt viele störende Werbefelder im Forum von http://PHPforum.de
// @include        http://phpforum.de/forum/*
// @include        http://www.phpforum.de/forum/*
// ==/UserScript==


function hasAttribute(element, attribute, sollWert){
    if (element == null){
        return false;
    }
    
    var attrib = element.getAttribute(attribute);
    if (attrib == null){
        return false;
    }
    
    if (attrib != sollWert){
        return false;
    }
    
    return true;
}

function deleteBlock(element){
    if(element != null){
        element.innerHTML = "";
        element.style.height = "0";
        element.style.minHeight = "0";
        element.style.visibility = "hidden";
    }
}

function isLesezeichen(element){
    if (!hasAttribute(element, "class", "tborder")){
        return false;
    }
    
    var tds = element.getElementsByTagName("td");
    if (tds.length != 2){
        return false;
    }
    
    if (!hasAttribute(tds[0], "class", "thead")){
        return false;
    }
    
    if (tds[0].innerHTML != "Lesezeichen"){
        return false;
    }
    
    return true;
}

function deleteSubBanner(element){
    if (element != null){
        var divs = element.getElementsByTagName("div");
        for(i=0; i<divs.length; i++){
            var divClass = divs[i].getAttribute("class");
            if (divClass != null){
                var pos = divClass.indexOf("banner", 0);
                if (pos != -1){
                    deleteBlock(divs[i]);
                    return true;
                }
            }
        }
    }
}


// Werbebanner entfernen:
deleteSubBanner(document.getElementById("TOP"));
deleteSubBanner(document.getElementById("GRUEN"));


// Navigation Links aufräumen:
var nav = document.getElementById("LEFT")
var navH = nav.getElementsByTagName("h6");
var navDiv = nav.getElementsByTagName("div");
var newNav = "<h6>Navigation</h6>";
for(c=0; c<navDiv.length; c++){
    if (hasAttribute(navDiv[c], "class", "subnavi")){
        var pos = navDiv[c].innerHTML.indexOf("Wiki",0);
        if (pos != -1){
            newNav += "<h6>PHP Links</h6>";
        }
        newNav += '<div class="subnavi">'+navDiv[c].innerHTML+'</div>';
    }
}
nav.innerHTML = newNav;


// Lesezeichen Unter Forum löschen:
var tbl = document.getElementsByTagName('table');
for(i=0; i<tbl.length; i++){
    if (isLesezeichen(tbl[i])){
        deleteBlock(tbl[i]);
    }
}