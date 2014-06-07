// ==UserScript==
// @name           g.e-hentai.org: hide ads
// @namespace      rowaasr13@gmail.com
// @include        http://g.e-hentai.org/
// @include        http://g.e-hentai.org/*
// @run-at         document-start
// ==/UserScript==
(function(){for(var d=document,e=/^Adv/,h=/etc\.e\-hentai/i,i=/adbrite/i,j=/etology\.com/i,k=/jlist\.com/i,l=/xxxwebtraffic\.com/i,m=/ero_banner/i,n=/adserver\.juicyads/i,c=d.getElementsByTagName("div"),f=[],b=c.length;b--;){var a=c[b];if(a.className==="gpba"||a.id==="ebo"){var g=a.firstChild;if(g&&g.tagName==="SPAN"){g=g.firstChild;g.nodeType===Node.TEXT_NODE&&e.test(g.data)&&f.push(a)}}}c=d.getElementsByTagName("iframe");for(b=c.length;b--;){a=c[b];e=a.src;if(h.test(e)||j.test(e)||l.test(e)||m.test(a.id)||n.test(e))f.push(a)}c=d.getElementsByTagName("script");for(b=c.length;b--;){a=c[b];!a.src&&i.test(a.innerText)&&f.push(a.parentNode)}c=d.getElementsByTagName("a");for(b=c.length;b--;){a=c[b];if(a.href&&k.test(a.href)){d=a.parentNode;d.tagName==="DIV"&&f.push(a.parentNode)}}for(b=f.length;b--;){a=f[b];d=a.parentNode;a&&d&&d.removeChild(a)}})()
