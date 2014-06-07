// ==UserScript==
// @name       Change Auto Sort OkCupid Match
// @namespace  http://chen.asraf.me
// @version    1.0
// @description  Changes the default sorting on the match page in OkCupid.
// @match      http://www.okcupid.com/match*
// @copyright  2013 Chen Asraf
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
if (document.location.href.indexOf('matchOrderBy=SPECIAL_BLEND') !== -1)
    eventFire(document.getElementById('match_match'), 'click');
})()
