// ==UserScript==
// @name           Good Old Google
// @include        *google*/search*
// @description    Removes the new annoying margins and replaces the new smaller logo with the original. 
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#res{margin:0;} #ssb{margin:0;} #sft{margin:0 !important;} #sff{padding-top:10px !important;} #logo{height:52px;margin:13px 0 7px;overflow:hidden;position:relative;width:150px;} #logo span{background:url(/images/nav_logo3.png);background-position:0 -26px;height:100%;left:0;position:absolute;top:0;width:100%;}');
document.getElementById('logo').innerHTML = '<span></span>';