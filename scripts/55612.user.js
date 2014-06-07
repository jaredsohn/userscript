// ==UserScript==
// @name           hup.hu - sidebar hider
// @include        http://hup.hu/*
// ==/UserScript==


if (typeof(GM_getValue("hidebars")) == 'undefined') {
        GM_setValue("hidebars", false);
}       

var isHide = GM_getValue("hidebars");

var hidebutton = document.createElement('a');
hidebutton.style.cursor = 'pointer';
hidebutton.style.position = 'absolute';
hidebutton.style.right = '30px';
hidebutton.innerHTML = isHide ? '[Show Sidebars]' : '[Hide Sidebars]';

hidebutton.addEventListener('click',
    function() {
        if (isHide) {
            document.getElementById('sidebar-left').removeAttribute('style');
            document.getElementById('sidebar-right').removeAttribute('style');
            hidebutton.innerHTML = '[Hide Sidebars]';
            GM_setValue("hidebars", false);
            isHide = false;
        } else {
            document.getElementById('sidebar-left').style.display = 'none';
            document.getElementById('sidebar-right').style.display = 'none';
            hidebutton.innerHTML = '[Show Sidebars]';
            GM_setValue("hidebars", true);
            isHide = true;
        }   
    },false);
    
if (isHide) {
        document.getElementById('sidebar-left').style.display = 'none';
        document.getElementById('sidebar-right').style.display = 'none';
}       

document.getElementById('top-nav').appendChild(hidebutton);
