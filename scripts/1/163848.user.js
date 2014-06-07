// ==UserScript==
// @name           ddtss Japanese
// @namespace      http://userscripts.org/scripts/show/163848
// @description    translate "translated" date
// @include        http://ddtp.debian.net/ddtss/index.cgi/*
// @require        http://userscripts.org/scripts/source/49700.user.js
// @version        0.0.1
// ==/UserScript==
(function(){

//setting start
var we = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
var wj = ["月","火","水","木","金","土","日"];	// translations of Mon,Tue,...
//array starts from 0 so adding a dummy here
var me = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var ns = "0";	// supplement this when [mon]|[date] <10
//setting end

var $x = function(xp, dc) {function c(f) {var g = ''; if (typeof f === 'string') {g = f;} var h = function(a) {var b = document.implementation.createHTMLDocument(''); var c = b.createRange(); c.selectNodeContents(b.documentElement); c.deleteContents(); b.documentElement.appendChild(c.createContextualFragment(a)); return b;}; if (0 <= navigator.userAgent.toLowerCase().indexOf('firefox')) {h = function(a) {var b = document.implementation.createDocumentType('html', '-//W3C//DTD HTML 4.01//EN', 'http://www.w3.org/TR/html4/strict.dtd'); var c = document.implementation.createDocument(null, 'html', b); var d = document.createRange(); d.selectNodeContents(document.documentElement); var e = c.adoptNode(d.createContextualFragment(a)); c.documentElement.appendChild(e); return c;};} return h(g);} var m = [], r = null, n = null; var o = dc || document.documentElement; var p = o.ownerDocument; if (typeof dc === 'object' && typeof dc.nodeType === 'number') {if (dc.nodeType === 1 && dc.nodeName.toUpperCase() === 'HTML') {o = c(dc.innerHTML); p = o;} else if (dc.nodeType === 9) {o = dc.documentElement; p = dc;}} else if (typeof dc === 'string') {o = c(dc); p = o;} try {r = p.evaluate(xp, o, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); for (var i = 0, l = r.snapshotLength; i < l; i++) m.push(r.snapshotItem(i));} catch (e) {try {var q = p.evaluate(xp, o, null, XPathResult.ANY_TYPE, null); while (n = q.iterateNext()) m.push(n);} catch (e) {throw new Error(e.message);}} return m;};

if(location.host == 'ddtp.debian.net'){ddtss();}

function ddtss(){
  var t = $x('//div[@class="translated"]//li');
  for (var i = 0; i < t.length; ++i) {	//look into all packages
    var f = t[i].innerHTML;
    var s = f.match(/\(ok\)\s+(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d+)\s+([\d\:]+)\s+(\d+)/);
    if(s && s[1] && s[2] && s[3] && s[4] && s[5]){
      var ts = s[5]+"/"+d2(s[2])+"/"+d3(s[3])+"("+d1(s[1])+")"+s[4];}else{continue;}
    t[i].innerHTML = f.replace(s[0],ts);
  }
  function d1(n){for (var i = 0; i < 7; ++i) {if(n == we[i]){return wj[i];}}}
  function d2(n){for (var i = 1; i < 13; ++i) {if(n == me[i]){var p=""; if(i<10){p=ns;} return p+i;}}}
  function d3(n){var p=""; if(n<10){p=ns;} return p+n;}
}

})();
