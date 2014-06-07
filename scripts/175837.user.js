// ==UserScript==
// @name GoEar HotLink 2013 
// @author laurenceHR
// @include *goear.com/listen/*/*
// @version 1.2
// @description Goear HotLink for download
// ==/UserScript==

// Script by laurenceHR - www.daxes.net
// console.log('################## HOT LINK GOEAR 2014 ######################');

////// Get Song ID
var url = document.URL;
var urls = url.split('/');
var id = urls[4];
/////// Get HotLink
var hotlink = "http://www.goear.com/action/sound/get/" + id; 
////// Add HotLink
addHotLink(hotlink);
//////

/******  Function For Add Link *****/
function addHotLink(link){
    var style = document.createElement('style');
    var css = ".new_player #actions #hotlink {background-position: 3px -97px;}" + "\n";
        style.textContent= css;
    var head = document.getElementsByTagName('head')[0];
        head.appendChild(style);
    var a = document.createElement('a');
    	a.href = link;
    	a.target = "_blank";
    	a.innerHTML = 'HotLink'
    	a.className = 'radius_3';
        a.id = 'hotlink';
    var li = document.createElement('li');
    	li.appendChild(a);
    var ul_actions = document.getElementById('actions');
    	ul_actions.appendChild(li);  
}