// ==UserScript==
// @name       Pick your group
// @namespace  http://www.hackforums.net/member.php?action=profile&uid=802790
// @version    0.1
// @description  Pick your user group on hack forums!
// @include http://hackforums.net/member.php*
// @include http://www.hackforums.net/member.php*
// @copyright  2012+, You
// ==/UserScript==

// USER, CHANGE THESE! Note: These settings are case sensitive.
var group = "guardians"; // Example: guardians, void, empire, complexity. Set to "none" to disable.
var hfName = "Xerif"; // Set this to your username on HF


if(document.getElementsByTagName("span")[4].innerText == hfName){

    if(group != "none"){
        if(group == "red lions") document.getElementsByTagName("span")[4].setAttribute("style", "text-shadow: 0px 2px 3px #000;");
        else document.getElementsByTagName("span")[4].setAttribute("style", "color:#cccccc;");
        
        var numImages = document.getElementsByTagName("img").length;
        
        for(var i = 0; i < numImages; i++){
            if(document.getElementsByTagName("img")[i].getAttribute("src") == "http://x.hackforums.net/images/blackreign/ub3rstar.gif"){
            	document.getElementsByTagName("img")[i].setAttribute("src", "http://x.hackforums.net/images/blackreign/star.gif");
            }
        }
    }
    
    if(group == "the alliance"){
        document.getElementsByTagName("img")[8].setAttribute("src", "http://x.hackforums.net/images/blackreign/groupimages/english/alliance.gif");
    }
    
    if(group == "graphics masters"){
        document.getElementsByTagName("img")[8].setAttribute("src", "http://x.hackforums.net/images/blackreign/groupimages/english/graphic-masters.gif");
    }
    
    if(group == "innovation"){
        document.getElementsByTagName("img")[8].setAttribute("src", "http://x.hackforums.net/images/blackreign/groupimages/english/innovation.gif");
    }
    
    if(group == "legion"){
        document.getElementsByTagName("img")[8].setAttribute("src", "http://x.hackforums.net/images/blackreign/groupimages/english/legion.gif");
    }
    
    if(group == "red lions"){
        document.getElementsByTagName("img")[8].setAttribute("src", "http://x.hackforums.net/images/blackreign/groupimages/english/red-lion.jpg");
    }
    
    if(group == "legacy"){
        document.getElementsByTagName("img")[8].setAttribute("src", "http://x.hackforums.net/images/blackreign/groupimages/english/legacy.png");
    }
    
    if(group == "complexity"){
        document.getElementsByTagName("img")[8].setAttribute("src", "http://x.hackforums.net/images/blackreign/groupimages/english/complexity.gif");
    }
    
    if(group == "infamous"){
        document.getElementsByTagName("img")[8].setAttribute("src", "http://x.hackforums.net/images/blackreign/groupimages/english/infamous.gif");
    }
    
    if(group == "illuminati"){
        document.getElementsByTagName("img")[8].setAttribute("src", "http://x.hackforums.net/images/blackreign/groupimages/english/illuminati.gif");
    }
    
    if(group == "terror"){
        document.getElementsByTagName("img")[8].setAttribute("src", "http://x.hackforums.net/images/blackreign/groupimages/english/terror.gif");
    }
    
    if(group == "guardians"){
        document.getElementsByTagName("img")[8].setAttribute("src", "http://x.hackforums.net/images/blackreign/groupimages/english/guardians.jpg");
    }
    
    if(group == "empire"){
        document.getElementsByTagName("img")[8].setAttribute("src", "http://x.hackforums.net/images/blackreign/groupimages/english/empirev3.gif");
    }
    
    if(group == "void"){
        document.getElementsByTagName("img")[8].setAttribute("src", "http://x.hackforums.net/images/blackreign/groupimages/english/void.jpg");
    }
    
    if(group == "143"){
        document.getElementsByTagName("img")[8].setAttribute("src", "http://x.hackforums.net/images/blackreign/groupimages/english/143_group.gif");
    }
}