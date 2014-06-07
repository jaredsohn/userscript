// cast upper
// version 0.7.2
// ג׳ בתמוז התשע״א
//  5/7/2011
// contact: http://hatul.info/contact
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           cast upper
// @namespace     http://amiad.blogli.co.il
// @description    Fix cast up video (23TV)
// @include       http://switch*.castup.net/customers/*clipurl*
// @exclude	  http://switch*.castup.net/*flv*
// @exclude	  http://switch*.castup.net/customers/KeshetMako*
// ==/UserScript==

var url=unescape(window.location.href);
url=url.toLowerCase();
var istart=url.indexOf("clipurl");
var iend=url.length;
istart+=8;
url=url.substring(istart, iend);
url=url.replace("gmpl.aspx","gmp2.asp");
url=url.replace("gmp2.asp","gm.asp");

//fix tv23.co.il
if(unescape(window.location.href).indexOf("Customers/TV23")!=-1){
  var showName=url.substring(url.indexOf("ar=")+3);
  url="http://switch3.castup.net/cunet/gm.asp?cucontentlinktype=1&ai=594&ar="+showName+"&ak=null";
}
window.location.href=url;

