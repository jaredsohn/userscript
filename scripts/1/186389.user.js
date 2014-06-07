// ==UserScript==  
// @name        deviantArt Auto-Zoom  
// @namespace   http://userscripts.org/users/203843
// @match       *://*.deviantart.com/*  
// @match       *://sta.sh/*  
// @version     1.0  
// @grant       none  
// ==/UserScript==  
// based on http://userscripts.org/scripts/show/179190


var devN = 'dev-content-normal';  
var devF = 'dev-content-full';  

// create an observer instance  
var observer = new MutationObserver(checkMutations);  

function resizeImage() {  
    img = document.getElementsByClassName(devN)[0];  
    img2 = document.getElementsByClassName(devF)[0];  
    if (img != undefined && img2 != undefined && img2.style.display != 'block') {  
        var click = document.createEvent("MouseEvents");  
        click.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);  
        img.dispatchEvent(click);  
    };  
};  

function checkMutations(mutations) {  
  mutations.forEach(function(mutation) {  
    var testNodes = mutation.addedNodes;  
    for (var i = 0; i < testNodes.length; ++i) {  
        if (testNodes[i].className == devN) {
            for (var j = 0; j < testNodes.length; ++j) {
                if (testNodes[j].className == devF) {resizeImage();}
            }
        }
    };  
  });  
};  

window.addEventListener ("load", function()   
{   
    resizeImage();  

    // select the target node  
    var target = document.body;  

    // configuration of the observer:  
    var config = { subtree: true, childList: true };  

    // pass in the target node, as well as the observer options  
    observer.observe(target, config);

}, false);