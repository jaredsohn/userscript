// ==UserScript==
// @name           MCWiki Sidebar Remover
// @namespace      http://trueblueagent.tumblr.com/
// @description    YAY! I wuv you!~
// @include        http*://*.minecraftwiki.net/wiki/*
// @version        1.0.0
// @credit         BlueAgent
// @notify         true
// ==/UserScript==
if(window.top != window.self) return;
//Utility method for matching elements
function $(identifier, altParent, returnAll)
{
    var obj = null, objs = null;
    doc = altParent ? altParent : document;
    if(identifier.indexOf(".") == 0)
    {
        identifier = identifier.replace(".","");
        objs = doc.getElementsByClassName(identifier);
    }
    else if(identifier.indexOf("<") == 0)
    {
        identifier = identifier.replace("<","").replace(">","");
        objs = doc.getElementsByTagName(identifier);
    }
    else
    {
        obj = doc.getElementById(identifier);
        if(!obj)
            objs = doc.getElementsByName(identifier);
    }
    if(objs && objs.length > 0)
    {
        if(returnAll)
            return objs;
        else
            return objs[0];
    }   
    else
        return obj;
}
//Not used
//function remove(node) {
//    node.parentNode.removeChild(node);
//}
editThatCSSYay(); //Run that function on script load : )
function editThatCSSYay(){
    var bodyContent = $('bodyContent2');
    //Remove the right margin to make the content fit the whole page
    bodyContent.style.marginRight = "0px";
    var btflb = $('.btflb');
    //Why do these ads take up so much width when they don't use it...
    btflb.style.width = "0px";
    var cursePanel = $('curse-panel');
    //remove(cursePanel); //Don't remove, less intrusive
    //Hide that curse panel sidebar thingy
    cursePanel.style.visibility = "hidden";
    cursePanel.style.width = "0px";
    var siteNav = $('.site-navigation'); //inside div id='ft'
    //Make the footer's width a little nicer
    siteNav.style.width = "auto";
}