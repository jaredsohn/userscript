// ==UserScript==
// @name        Google Maps km
// @namespace   http://userscripts.org/users/492002
// @description Changes google maps to km always. Google maps supports km natively so it should be seemless, this extensions just avoids the need to click "Show Options -> km " all the time
// @include     https://maps.google.com*
// @version     0.1
// @grant       none
// ==/UserScript==

var kmEl;

function hasClass(element, cls) {
    var r = new RegExp('\\b' + cls + '\\b');
    return r.test(element.className);
}

function clickEl(el){
    //var evt = document.createEvent("MouseEvents");
    //evt.initEvent("click", true, true);
    //el.dispatchEvent(evt);
    el.click();
}

function getkmEl(){
    if(kmEl == null){
        kmEl = document.getElementById('dopt_mikm_k');
        if(kmEl != null){
            attachButtonListeners();
        }
    }
    return kmEl;
}
function metricate(){
    var el = getkmEl();
    if(el != null){
        if(!hasClass(el, 'anchor-selected')){
            clickEl(el);
        }
    }else{
        //Try again soon
        searchkmEl();
        setTimeout(metricate, 200);
    }
};

function searchkmEl(){
    var el = getkmEl();
    if(el == null){
        setTimeout(searchkmEl, 50);
    }
}

/**
 * Basic idea here is that anytime a user does something,
 * we want to make sure we select the km option
 */
function attachButtonListeners(){
    var buttons = document.getElementsByTagName("button");
    //console.log(buttons);
    for(var b=0; b < buttons.length; b ++){
        //console.log('binding ' + b);
        //console.log(buttons.item(b));
        buttons.item(b).onclick = metricate
    }
}

function initialize(){
    //console.log('initializing');
    //console.log(document);
    metricate();
    attachButtonListeners();

}

initialize();
