// ==UserScript==
// @name          WGW Forum Easy-Reader
// @namespace     http://www.codeandeffect.co.uk/greasemonkey
// @include       http://wgw.topmum.co.uk/forum/*
// @description   Removes sidebar, widens text area on this forum
// @exclude       http://wgw.topmum.co.uk/forum/profile.php*

// ==/UserScript==
 
    var wgwForumSidebar = document.getElementById('sidebar');
    var wgwForumMain = document.getElementById('main');
    var wgwForumMasthead = document.getElementById('masthead');
        wgwForumSidebar.style['display'] = 'none';
        wgwForumMain.style['width'] = '44em';
        wgwForumMasthead.style['height'] = '50px;';
        wgwForumMasthead.style['overflow'] = 'hidden';

window.addEventListener(
    'load', 
    shift_right('poststuff'),true);
        
   

function shift_right(findClass) {
var aElm=document.body.getElementsByTagName('*');
    for(var i=0; i<aElm.length; i++) {
        if(aElm[i].className==findClass) {
            aElm[i].style.cssFloat='right';
        }
    }
}