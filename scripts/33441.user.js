// ==UserScript==
// @name           Shareprotect skip
// @namespace      http://google.com
// @description    Avoid shareprotect
// @include        http://shareprotect.t-w.at/?id=*
// ==/UserScript==

function getURL(url, func) {
  GM_xmlhttpRequest({
    method:"GET",
    url:url,
    headers:{
      "User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
    },
    onload:func
   });
}

function h2d(h) {return parseInt(h,16);} 
function unMux(s) {
  var o = [];
  s = s.split(";")
  s.pop();
  for(i=0; i<s.length; i++) {
    s[i]=s[i].toString().substring(2)
    if(s[i][0]=="x") {
      o.push(String.fromCharCode(h2d(s[i].toString().substring(1))))
    }
    else o.push(String.fromCharCode(s[i]*1))
  }
  return o.join("");
}


function dealWith(response) {
  unEsc = unescape(response.responseText.split("unescape('")[1].split("')")[0])
  urlb = unEsc.split('action="')[1].split('"')[0].split("files/")
  muxed = urlb[1].split("/")[0]
  window.location=urlb[0]+"files/" + unMux(muxed)+"/"+urlb[1].split("/")[1]
}

turl = window.location.toString().split("?")
getURL(turl.join("rapidshare.php?"), dealWith)
