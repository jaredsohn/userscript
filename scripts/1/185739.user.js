// ==UserScript==
// @name       background replacement
// @version    0.5
// @description  background replacement
// @include http://*/*
// ==/UserScript==

function init(){ 
    var e1 = document.getElementById('page-background-image').children[0];
    var e2 = document.getElementById('content');    
    if( e1 !=  null)
    {
        var img = document.createElement('img');
        img.src = "http://s25.postimg.org/61ub4q967/image.gif";
        img.setAttribute("style", "position:relative;left:-50px;height:200px;width:170px;top:-200px");   
        e1.insertBefore(img, e2);
    }
}
init();