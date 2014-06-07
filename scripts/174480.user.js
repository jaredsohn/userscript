// ==UserScript==
// @name       Auto 5-star on OkCupid
// @namespace  http://chen.asraf.me/
// @version    1.0
// @description  Title says it all
// @match      http://www.okcupid.com/profile/*
// @copyright  2013, Chen Asraf
// ==/UserScript==
(function() {

function eventFire(el, etype){
  if (el.fireEvent) {
    (el.fireEvent('on' + etype));
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}
    var rating = document.getElementById('personality-rating');
    for (var i = 0; i < rating.childNodes.length; i++) {
        if (rating.childNodes[i].childNodes.length > 0
            && typeof rating.childNodes[i].childNodes[0].className != 'undefined'
            && rating.childNodes[i].childNodes[0].className.indexOf('five-star') !== -1)
            eventFire(rating.childNodes[i].childNodes[0], 'click');
    }

})()
