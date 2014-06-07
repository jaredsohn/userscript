// ==UserScript==
// @name        Life Wasted Counter
// @namespace   http://userscripts.org/scripts/show/160934
// @description Counts the time (day,hour,minute,second) you've spent on sites.
// @include     *
// @version     1
// ==/UserScript==

window.docCookies = { // set cookie function from Mozilla
  getItem: function (sKey) {
    if (!sKey || !this.hasItem(sKey)) { return null; }
    return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Tue, 19 Jan 2038 03:14:07 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toGMTString();
          break;
      }
    }
    document.cookie = escape(sKey) + "=" + escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
  },
  removeItem: function (sKey, sPath) {
    if (!sKey || !this.hasItem(sKey)) { return; }
    document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sPath ? "; path=" + sPath : "");
  },
  hasItem: function (sKey) {
    return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  }
};
if(window.docCookies.getItem('lifeWastedCounterSec')==null)
	window.docCookies.setItem('lifeWastedCounterSec', 0, Infinity, '/', (document.location+'').match(/\/\/([^\/]+)/)[1]+''); // new visit
var iT = parseInt(docCookies.getItem('lifeWastedCounterSec')); //get last visited time
window.invisbleTimeWastedMem = Math.floor(iT/(60*60*24))+':'+
							   Math.floor((iT/(60*60))%24)+':'+
							   Math.floor((iT/60)%60)+':'+
							   Math.floor(iT%60);;		   
var countr = document.createElement('span'); // create the clock thingey
countr.style.backgroundColor = '#363';
countr.style.color = '#9c9';
countr.style.fontWeight = 'bold';
countr.style.zIndex = '2147483647';
countr.style.position = 'fixed';
countr.style.right = '0px';
countr.style.bottom = '0px';
countr.style.padding = '5px 20px';
countr.style.opacity = '0';
countr.setAttribute('title', 'TIME WASTED on '+(document.location+'').match(/\/\/([^\/]+)/)[1]+"\r\n"+' (DAYS:HOURS:MINUTES:SECONDS)'+"\r\n"+'Click to remove.');
countr.onclick = function(){
	document.body.removeChild(document.getElementById('lifeWastedCounterSec'));
}
countr.onmouseover = function(){
	document.getElementById('lifeWastedCounterSec').style.opacity = '80';
}
countr.onmouseout = function(){
	document.getElementById('lifeWastedCounterSec').style.opacity = '0';
}
countr.setAttribute('id', 'lifeWastedCounterSec');
window.processCountr = function(){
	var tw = window.invisbleTimeWastedMem;
	var th = tw.split(':');
	return parseInt(th[0])*24*60*60 + parseInt(th[1])*60*60 + parseInt(th[2])*60 + parseInt(th[3]); 
}
countr.innerHTML = window.invisbleTimeWastedMem;
document.body.appendChild(countr);
window.theCountingContinues = setInterval(function(){
	var iT = window.processCountr()+1;
	window.invisbleTimeWastedMem = Math.floor(iT/(60*60*24))+':'+
								   Math.floor((iT/(60*60))%24)+':'+
								   Math.floor((iT/60)%60)+':'+
								   Math.floor(iT%60);
	if(document.getElementById('lifeWastedCounterSec')!=null){
		document.getElementById('lifeWastedCounterSec').innerHTML = window.invisbleTimeWastedMem;
	}	
}, 1000); // another second closer to heart attack sitting on fat butt online
window.onbeforeunload = function(){
	window.docCookies.setItem('lifeWastedCounterSec', window.processCountr(), Infinity, '/', (document.location+'').match(/\/\/([^\/]+)/)[1]+'');
}