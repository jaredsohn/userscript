// ==UserScript==
// @name        TWEET_EMBEDDER_ND
// @namespace   http://userscripts.org/users/107047
// @description Convert twiter link to embeded tweet in forum posts
// @include    	http://*noticierodigital.com/forum/viewtopic.php?*
// @include     http://*www.aporrealos.com/forum/viewtopic.php?*
// @require  	http://platform.twitter.com/widgets.js    
// @version     1.02
// ==/UserScript==
var d = document,
pb,
tn,
sp1,
t,
tv,
cnt = 0,
nod;
var regTw = /[@#][_0-9a-zA-Z\u00C0-\u017F]+/;
var regTw1 = new RegExp(regTw.source, 'g');
var regPic = /pic\.twitter\.com\/[_0-9a-zA-Z\u00C0-\u017F]+/;
var regPic1 = new RegExp(regPic.source, 'g');
function txt2Link(a) {
    return a.replace(regTw1, function (b) {
       return b.link('https://twitter.com/' + (b[a = 'search']('#') ? b : a + '?q=' + encodeURIComponent(b) + '&src=hash'))
    })
}
function txt2Link2(a) {
    return a.replace(regPic1, function (b) {
       return b.link('https://' + b)
    })
}
function textNodesUnder(el) {
    var n,
    a = [
    ],
    walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    while (n = walk.nextNode())
    a.push(n);
    return a;
}
pb = d.querySelectorAll('.postbody', 'tr td[class^="row"]:nth-child(2)[valign="top"]');
for (var k = 0; k < pb.length; k++) {
    tn = textNodesUnder(pb[k]);
    for (var i = 0; i < tn.length; i++) {
       t = tn[i];
       tv = t.nodeValue;
       if (regTw.test(tv) || regPic.test(tv)) {
           sp1 = d.createElement('span');
           sp1.innerHTML = txt2Link2(txt2Link(tv));
           t.parentNode.replaceChild(sp1, t);
       }
    }
}
var tl = document.querySelectorAll('a[href*="twitter"]');
var linkname = '';
var reTW = /http(s)?:\/\/(\w+\.)?twitter.com\/[^\/]+\/status(es)?\/\d+/i;
var reTW2=/http(s)?:\/\/(\w+\.)?twitter.com/i;
for (var i = 0; i < tl.length; i++) {
    linkname = tl[i].getAttribute('href');
    if (reTW.test(tl[i].innerHTML)) {
       if (reTW.test(linkname) && linkname.match(reTW) [0].indexOf(tl[i].innerHTML.match(reTW) [0]) !== - 1) {          
           linkname = linkname.match(reTW) [0];
          linkname=linkname.replace(reTW2,"http$1://twitter.com");
           cnt++;
           nod = tl[i];
          nod.setAttribute('href',linkname);
           bquot = d.createElement('blockquote');
           bquot.setAttribute('class', 'twitter-tweet');
           bquot.setAttribute('lang', 'es');
           bquot.innerHTML = nod.outerHTML;
           nod.outerHTML = bquot.outerHTML;
       }
    }
}
if (cnt)
void (!function (d, s, id) {
    var js,
    fjs = d.getElementsByTagName(s) [0],
    p = /^http:/.test(d.location) ? 'http' : 'https';
    if (!d.getElementById(id)) {
       js = d.createElement(s);
       js.id = id;
       js.src = p + '://platform.twitter.com/widgets.js';
       fjs.parentNode.insertBefore(js, fjs);
    }
}(document, 'script', 'twitter-wjs'));