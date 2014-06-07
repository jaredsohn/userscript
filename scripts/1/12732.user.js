// --------------------------------------------------------------------
//
// ==UserScript==
// @author    VGK http://www.askedweb.com/
// @name          Stop All Site Timers
// @description   With this Script you can stop all timers on any web-site.
// @include       *
// ==/UserScript==

(function() {
window.addEventListener('load', StopTimer, false);

function StopTimer(){
	location.href = 'javascript:(' + encodeURI(uneval(function() {
  /*
   * Each Site can contains several Timers.
   * We want to know last number, so let make our own timer to
   * see number.
  */
  T = window.setTimeout('alert("Timer #" + T + " ON")', 100000);
  
  /* Our Timer ID =T is last timer number.
   *  At Now we know about IDs of all timers.
   * The loop below made clear all timers from number 0 to T
   *  
   */
  for(var i=0; i<=T; i++){ window.clearTimeout(i); }
  })) + ')();';
  
  /** Yeah! No more any timers on this page !  **/
}

})();