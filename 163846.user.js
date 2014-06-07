// ==UserScript==
// @name           packages.debian.org support tool
// @namespace      http://userscripts.org/scripts/show/163846
// @description    support tool for packages.debian.org includes packages.qa.debian.org|archive.debian.net|ddtp.debian.net/ddtss/
// @include        http://ddtp.debian.net/ddtss/index.cgi/*
// @include        http://packages.debian.org/*
// @include        http://packages.qa.debian.org/*
// @include        http://archive.debian.net/*
// @require        http://userscripts.org/scripts/source/49700.user.js
// @version        0.0.1
// ==/UserScript==

(function(){
var $x = function(xp, dc) {function c(f) {var g = ''; if (typeof f === 'string') {g = f;} var h = function(a) {var b = document.implementation.createHTMLDocument(''); var c = b.createRange(); c.selectNodeContents(b.documentElement); c.deleteContents(); b.documentElement.appendChild(c.createContextualFragment(a)); return b;}; if (0 <= navigator.userAgent.toLowerCase().indexOf('firefox')) {h = function(a) {var b = document.implementation.createDocumentType('html', '-//W3C//DTD HTML 4.01//EN', 'http://www.w3.org/TR/html4/strict.dtd'); var c = document.implementation.createDocument(null, 'html', b); var d = document.createRange(); d.selectNodeContents(document.documentElement); var e = c.adoptNode(d.createContextualFragment(a)); c.documentElement.appendChild(e); return c;};} return h(g);} var m = [], r = null, n = null; var o = dc || document.documentElement; var p = o.ownerDocument; if (typeof dc === 'object' && typeof dc.nodeType === 'number') {if (dc.nodeType === 1 && dc.nodeName.toUpperCase() === 'HTML') {o = c(dc.innerHTML); p = o;} else if (dc.nodeType === 9) {o = dc.documentElement; p = dc;}} else if (typeof dc === 'string') {o = c(dc); p = o;} try {r = p.evaluate(xp, o, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); for (var i = 0, l = r.snapshotLength; i < l; i++) m.push(r.snapshotItem(i));} catch (e) {try {var q = p.evaluate(xp, o, null, XPathResult.ANY_TYPE, null); while (n = q.iterateNext()) m.push(n);} catch (e) {throw new Error(e.message);}} return m;};
//setting start
// hosts: create links point to these hosts; [host]/[link string] pair
var hosts = ["packages.debian.org", "pdo", "packages.qa.debian.org", "qa", "archive.debian.net", "archive"];
var pt    = 'package site links';	// title for the links; 
var lid   = "pdolinks";	// id for the element to be create that contain links
// id=lid is mandatory as this is used in pdo() function
var pd    = [' <span id="'+ lid + '">', '</span>'];
var ls    = [" | ",": ["," | ","] "];	// separator: [0]pt[1]link1[2]links...[3]

var ddc = '//div[@class="untranslated" or @class="forreview"'
	+ ' or @class="reviewed" or @class="translated"]//li';
var navi = document.getElementById("pnavbar");	// links will be added here

//setting for packages.qa.debian.org here
// qa: packages.qa.debian.org flag; using vars as this check is also used in pdo() function
var qa=0;
var qam = 10.5;	// margin for dl used on packages.qa.debian.org
var qapd = '<div id="'+ lid + '" class="block links"><h2>p.d.o links</h2></div>';
var qals = ['<dl><dt style="width: ' + qam + 'em;">',
		'</dt><dd style="margin-left: ' + (qam+0.5) + 'em;">',
		'</dd><dd style="margin-left: ' + (qam+0.5) + 'em;">',
		"</dd></dl>"];
var qanavi = $x('//div[contains(@class,"left") and contains(@class,"maincol")]');
if(location.host == "packages.qa.debian.org"){ qa = 1; ls = qals; navi = qanavi;}
//setting end

if(location.host == 'ddtp.debian.net'){ddtss();}else{pdo();}

function ddtss(){
  var col = $x('//col'); col[0].width="45%";  col[1].width="55%";
  var pkgs = $x(ddc);	//collect all packages
  for (var i = 0; i < pkgs.length; ++i) {	//look into all packages
    var f = pkgs[i].innerHTML;
    var s = f.match(/<a href=.+?>([^<]+)<\/a>/);
    if(s && s[1]){s = s[1];}else{continue;}
    pkgs[i].innerHTML = f.replace(/(<a href=.+?>[^<]+<\/a>)/,function(){return p("",s,RegExp.$1)});
  }
}

function pdo(){
  var n;  var pkg;
  if(qa){	// for packages.qa.debian.org
    if(navi && navi[0]){
      navi = navi[0];  var ni = navi.innerHTML;
      if(navi && ni){ navi.innerHTML = qapd + ni;
	navi = document.getElementById(lid);}else{return;}
      pkg = $x('//h1');
    }
  }
  if(navi && navi.innerHTML){n = navi.innerHTML;}else{return;}
  if(n){n = n.replace(/\s+\n/g,"\n").replace(/\n+/,"\n");}else{return;}
  if(pkg && pkg[0] && pkg[0].innerHTML && pkg[0].innerHTML.length){
    pkg = pkg[0].innerHTML.replace(/<.+/,""); }
  if(!(pkg && pkg.length)){	// find keywords=[***]
    pkg = location.search; if(pkg && pkg.length){ pkg = rps(pkg); }}
  if(!(pkg && pkg.length)){	// find /(distribution/)?[package]
    pkg = location.href; if(pkg && pkg.length){ pkg = rpl(pkg); }else return;}
  pkg = pkg.replace(/[^0-9a-zA-Z%\+\-\.]/g,"").replace(/[+]/g," ");
  navi.innerHTML = n + ls[0] + pt + ls[1] + p(pd[0],pkg,pd[1]) + ls[3];
  function rps(r){return r.replace(/.+keywords=/,"").replace(/[&].+/,"");}
  function rpl(r){return r.replace(/.+:\/\/[^\/]+\//,"").replace(/\?.+/,"").replace(/(stable|testing|unstable|sid|experimental|bo|hamm|slink|potato|woody|sarge|etch|lenny|squeeze|wheezy|jessie)(-updates|-backports|-volatile)?\//g,"");}  
}

// receive package name (s) and previous(r)/next(t) item
// return r+links+t
function p(r,s,t){
  var l = "";
  for(var i=0; i<hosts.length; i+=2){
    if(location.host == hosts[i]){continue;}
    if(! hosts[i+1]){continue;}
    if(l.length){l += ls[2];}
    l += '<a href="http://' + hosts[i] + "/" + s + '">' + hosts[i+1] + "</a>";
  }
  return r+l+t;
}

})();
