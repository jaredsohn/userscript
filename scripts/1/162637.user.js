// ==UserScript==
// @name       Filter Ads
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==

var count = 0;
clearAds();

function clearAds(){
    var d = document.getElementsByTagName("*"); 
    for(var i=0; i<d.length; i++){
        if(d[i].style.zIndex >= 1){
            d[i].parentNode.removeChild(d[i]);
        }
    }
    count++;
    if(count < 10){
        setTimeout(clearAds,1000);   
    }
}
