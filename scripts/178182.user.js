// ==UserScript==
// @name       FullScreenPathSlides
// @namespace  https://plus.google.com/107332279152288777803/
// @version    0.3
// @description  Maximizes the pathology slide area for full screen view
// @match      http://tlinux.swmed.edu/svgs/browserecord.php*
// @match	   https://myutsouthwestern.swmed.edu/svgs/,DanaInfo=tlinux.swmed.edu+browserecord.php*
// @copyright  2014+, Mark Kittisopikul
// ==/UserScript==

function addCss(cssString) { 
    var head = document.getElementsByTagName('head')[0];
    if(!head) {
        return;

    }
    var newCss = document.createElement('style'); 
    newCss.type = "text/css"; 
    newCss.innerHTML = cssString; 
    head.appendChild(newCss); 
}
function findPos(obj) {
    var curleft = 0;
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
            curleft += obj.offsetLeft;
        } while (obj = obj.offsetParent);
    return [curleft,curtop];
    }
}
addCss ( 
'.smallmap { width: ' + window.innerWidth + 'px;  height: ' + window.innerHeight +'px; ! important; }' 
);
var e = document.getElementById('map');
var pos = findPos(e);
window.scroll(pos[0],pos[1]);