// ==UserScript==
// @name           Facebook.Farmville.Windex
// @namespaces     oliveJar
// @include        http://apps.facebook.com/onthefarm/
// @include        http://apps.facebook.com/onthefarm/index.php*
// @version        0.691
// ==/UserScript==

function sCleaner(sTag,sVal) {
    var scripts = document.getElementsByTagName(sTag);
    var a;
    for(b = scripts.length; b--;) {
        a = scripts[b];
        if (a.src.indexOf(sVal) != -1) {
            a.parentNode.removeChild(a);
        };
    }
}

function dCleaner(sVal,sAttrib) {
    switch(sAttrib) {
    case 'id':
        var sDiv = document.getElementById(sVal);
        sDiv.parentNode.removeChild(sDiv);  
        break;
    case 'class':
        var aDivs = document.getElementsByClassName(sVal);
        var a;
        for(b = aDivs.length; b--;) {
            a = aDivs[b];
            a.parentNode.removeChild(a);
        } 
        break;
    default:
      
    }    
}

function likeCleaner() {
    var likeFrame = document.getElementById('likeIframe');
    var pa = likeFrame.parentNode;
    var pb = pa.parentNode;
    pb.parentNode.removeChild(pb);  
      }

function move_Game() {
    var oDiv = document.getElementById('app_content_102452128776');
    oDiv.style.position = 'absolute';
    oDiv.style.top = '50px';
    oDiv.style.left = '10px'; 
    oDiv.style.width = '99%';
    var aIframe = document.getElementsByName('flashAppIframe');
    var a;
    for(b = aIframe.length; b--;) {
        a = aIframe[b];
        a.style.width = '99%';
    } 
}

function fWindex() {
        sCleaner('iframe','zbar.zynga.com');
        sCleaner('iframe','fb-3.farmville.com/promo');
        dCleaner('sidebar_ads','id');
        dCleaner('pageFooter','id');
        dCleaner('app102452128776_progress_bar_wrapper','id');
        dCleaner('noticebox','class');
        dCleaner('center','class');
        move_Game();
}

window.addEventListener("load", fWindex, false);