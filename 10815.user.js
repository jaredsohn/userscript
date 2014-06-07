// ==UserScript==
// @name           Time Since Load
// @namespace      http://userscripts.org/scripts/show/10815
// @description    Press ALT-U to see how long since a page has been refreshed (ex: 01h 15m 32s).  If you want to see just minutes and seconds, press SHIFT-ALT-U (ex: 75m 32s).  This can be particularly helpful for sites that have a timeout period before downloads, etc.
// @include        *
// ==/UserScript==
(function(){

     var uptime = new Date();
     document.addEventListener('keydown', function(e) {
         if (e.keyCode) code = e.keyCode;
         else if (e.which) code = e.which;
         if(e.altKey && code == 85) { //85 = u

var nowtime,fdiff,hdiff,mdiff,sdiff;
nowtime=new Date();
fdiff=nowtime.getTime()-uptime.getTime();
if(e.shiftKey){hdiff=0}
  else hdiff=Math.floor(fdiff/60/60/1000);
mdiff=Math.floor(fdiff/60/1000)-hdiff*60;
sdiff=Math.floor(fdiff/1000)-mdiff*60-hdiff*60*60;
if (hdiff<10) hdiff = '0' + hdiff;
if (mdiff<10) mdiff = '0' + mdiff;
if (sdiff<10) sdiff = '0' + sdiff;
saydiff=hdiff + 'h ' + mdiff + 'm ' + sdiff + 's since document was loaded';
if(e.shiftKey)saydiff=mdiff + 'm ' + sdiff + 's since document was loaded';
alert(saydiff);

				e.stopPropagation();
                                e.preventDefault();
}}, false);
})();
