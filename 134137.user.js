// ==UserScript==
// @name       GoEar Remove Ads 2012
// @version    0.1
// @description  enter something useful
// @copyright  2012+, You
// @author laurenceHR
// @match *goear.com/*
// @description  Remove Ads From Goear 05/2012
// ==/UserScript==

// console.log('########################## GoEar Remove Ads ###############################');
// Script by @laurenceHR

/////////// REMOVE SIDEBAR ADS ////////////
var sidebar = document.getElementById('sidebar');
var childrens = sidebar.children;
for(var i = 0;i < childrens.length ; i++){
    var child = childrens[i];
    //console.log('id:'+child.id);
    if(child.id == 'med_rectangle_ads'){sidebar.removeChild(sidebar.children[i]);break;}
    if(child.tagName == 'IFRAME'){sidebar.removeChild(sidebar.children[i]);break;}
}


////////////// REMOVE TOP AND BOTTOM ADS ///////
var body = document.getElementsByTagName('body')[0];
var childrens = body.children;
for(var i = 0;i < childrens.length ; i++){
    var child = childrens[i];
    // console.log('id:'+child.id);
    if(child.id == 'top_ads'){body.removeChild(body.children[i]);}
    if(child.id == 'bottom_ads'){body.removeChild(body.children[i]);}
}

///////// REMOVE LEFT ADS ///////
var search = document.getElementById('search_filter');
var childrens = search.children;
for(var i = 0;i < childrens.length ; i++){
    var child = childrens[i];
    //console.log('id:'+child.id);
    if(child.tagName == 'IFRAME'){search.removeChild(search.children[i]);}
}
