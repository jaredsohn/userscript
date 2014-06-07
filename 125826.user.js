// ==UserScript==
// @name          Google Search with direct Cached and Similar links
// @namespace     http://sunamo.cz
// @description   Userscript, which hides Google's preview of page and display links Cached and Similar next to URI of page.
// @include       http://www.google.com/search?*
// @include       https://www.google.com/search?*
// ==/UserScript==
var imgs = document.getElementsByClassName('vshid');
for (i = 0; i < imgs.length; i++) {
    imgs[i].innerHTML = " - " + imgs[i].innerHTML;
    imgs[i].style.visibility = 'visible';
    imgs[i].style.display = 'inline';
}
var imgs2 = document.getElementsByClassName('vspib');
for (i = 0; i < imgs2.length; i++) {
    imgs2[i].style.visibility = 'hidden';
    imgs2[i].style.display = 'none';
}
var imgs3 = document.getElementsByClassName('std');
for (i = 0; i < imgs3.length; i++) {
    imgs3[i].style.visibility = 'hidden';
    imgs3[i].style.display = 'none';
}
function getElementsByClassName(classname, node) {
    if (!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for (var i = 0, j = els.length; i < j; i++)
        if (re.test(els[i].className)) a.push(els[i]);
    return a;
    //alert(els.length);
    //return els;
}
