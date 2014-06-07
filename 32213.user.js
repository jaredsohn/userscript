// ==UserScript==
// @name           NicoVideo Ranking Follow scroll Patch
// @namespace      http://endflow.net/
// @description    modifies behavior of ranking-categories selector like Safari.
// @include        http://*.nicovideo.jp/ranking/*
// ==/UserScript==
// @author         Yuki KODAMA (twitter:kuy, skype:netkuy)
// @version        0.1.0 [2008-08-21]
// @history        [2008-08-21] 0.1.0 first release

(function(){
var w = this.unsafeWindow || window;
var prevFlag;
var innerElem = w.$('ranking_categories');
var outerElem = w.$(innerElem.parentNode);

function floatOn(){
    innerElem.style.setProperty('position', 'fixed', null);
    innerElem.style.setProperty('top', '0px', null);
    innerElem.style.removeProperty('margin-top');
}

function floatOff(){
    innerElem.style.removeProperty('position');
    innerElem.style.removeProperty('top');
    innerElem.style.setProperty('margin-top', '0px', null);
}

function onScroll(){
    var vport = w.getViewportVerticalPositions();
    var outer = w.getElementVerticalPositions(outerElem);
    var isFixed = outer.top < vport.top;
    if(prevFlag != isFixed){
        isFixed ? floatOn() : floatOff();
        prevFlag = isFixed;
    }
}

function setup(flag){
    prevFlag = null;
    if(flag){
        w.Event.stopObserving(w, 'scroll', w.updatePositions);
        w.Event.observe(w, 'scroll', onScroll);
        onScroll();
    }else{
        w.Event.stopObserving(w, 'scroll', onScroll);
        floatOff();
    }
}

var chk = w.$('follow-scroll');
chk.onclick = '';
w.Event.observe(chk, 'click', function(){
    w.setFollowScroll(chk.checked);
    setup(chk.checked);
});
setup(w.Cookie.get('rfs', '1') == '1');

})();
