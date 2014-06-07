// ==UserScript==
// @name           Anti-SamsengFB
// @namespace      Suhz
// @description    Remove facebook like popup on website
// @include        http://* 
// @include        https://* 
// @exclude        http://*.facebook.com/*
// @exclude        https://*.facebook.com/*
// @version		   1.2.4
// @grant  		   unsafeWindow
// ==/UserScript==

function removesamseng() {
    
    var removeIDs = ['fblikebg','fblikepop','samsengfb','sfbbg','sfbpop','simplemodal-overlay','simplemodal-container','facebook','facebox','exestylepopupdiv','stp-bg','stp-main','fblikebg','wpliketounlock'];
    for (var i = 0; i < removeIDs.length; i++) {
        var fbDiv = document.getElementById(removeIDs[i]);
        if (fbDiv) {
            fbDiv.parentNode.removeChild(fbDiv);
        }
    }
}

//if(unsafeWindow.top == unsafeWindow.self) {
    setTimeout(removesamseng,250);
    setTimeout(removesamseng,2000);
//}