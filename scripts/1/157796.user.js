// ==UserScript==
// @name           OkCupid question permalinker
// @version        1.0
// @namespace      https://github.com/johan/user.js
// @description    Makes all OkCupid questions permalinks to themselves.
// @include        http://www.okcupid.com/*
// @include        https://www.okcupid.com/*
// @require        https://raw.github.com/gist/3886769/2bda951e516c93bd9625ed2d1b168a0a7d98a078/on.js
// ==/UserScript==

on({ dom: { questions: [ 'css*  p.qtext[id^="qtext_"]'  // (+id) = question text
                       , 'xpath self::p[not(a[@href])]' // unless linked already
                       ]
          }
   , ready: permalink
   });

function permalink(dom) {
  dom.questions.forEach(function link(p) {
    var id = p.id.replace(/\D+/g, '')
      , a  = document.createElement('a')
      , x
      ;
    a.href = '/questions?rqid='+ id;
    while ((x = p.firstChild))
      a.appendChild(x);
    p.appendChild(a);
  });
}
