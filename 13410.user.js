// ==UserScript==
// @name           Aftonbladet TV
// @namespace      http://mablung.net
// @include        http://*.aftonbladet.se/atv2/*
// ==/UserScript==

// 992, 698

window.resizeTo(805, 620);


var webbtvurl = 'http://wwwc.aftonbladet.se/special/webbtv/';


function gup(name) {
 var regexS = '[\\?&]'+name+'=([^&#]*)';
 var regex = new RegExp(regexS);
 var tmpURL = window.location.href;
 var results = regex.exec(tmpURL);
 if (results == null) {
  return '';
 } else {
  return results[1];
 }
}

if (window.location.href.match('init')) {
 var p = 'qt';
 //var p = 'wmp';

 var atvurl = window.location.href;
 atvurl = atvurl.replace(/init/, 'popup_' + p);

 window.location.replace(atvurl);
}

if (window.location.href.match('popup')) {
 var atvid = gup('id');
 var atvxml = webbtvurl + 'xml2/' + atvid + '.xml';

GM_xmlhttpRequest({
  method:'GET',
  url:atvxml,
  headers:{
    'User-Agent':'Mozilla/4.0 (compatible) Greasemonkey',
    'Accept':'text/xml',
    },
  onload:function(details) {
    var xml = details.responseText;

    var parser = new DOMParser();
    var dom = parser.parseFromString(xml, 'application/xml');

    var root = dom.getElementsByTagName('root')[0];
    var date = root.attributes[0].nodeValue;

    var content = root.getElementsByTagName('content')[0];
    var img = webbtvurl + 'bilder2/' + content.attributes[6].nodeValue;
    var cid = content.attributes[0].nodeValue;
    var wmv = content.attributes[12].nodeValue;
    var mp4 = content.attributes[13].nodeValue;
    var flv = content.attributes[14].nodeValue;

    var cs = document.getElementById('container_skyscraper');
    cs.innerHTML += '<a accesskey="x" href="' + atvxml + '">XML</a>';
    cs.innerHTML += '<a accesskey="i" href="' + img + '">IMG</a>';
    if (wmv != 'empty') {
     cs.innerHTML += '<a accesskey="w" href="' + wmv + '">WMV</a>' +
     '<a accesskey="m" href="javascript:prompt(\'mplayer\',\'mplayer ' + wmv +
     ' -dumpstream -dumpfile atv' + cid + '.wmv\')">mplayer</a>';
    }
    if (mp4 != 'empty') {
     cs.innerHTML += '<a accesskey="q" href="' + mp4 + '">MP4</a>';
    }
    if (flv != 'empty') {
     cs.innerHTML += '<a accesskey="f" href="' + flv + '">FLV</a>';
    }
  }
});
}

if (window.location.href.match('qt.html')) {
 var embed = document.getElementsByTagName('embed')[0];
 if (embed) {
  embed.setAttribute('href', embed.getAttribute('qtsrc'));
 }
}