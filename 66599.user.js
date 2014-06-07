// ==UserScript==
// @name          Random Words of Wisdom
// @description   Randomly chooses options for Wise Old King
// @include       http://www.neopets.com/medieval/wiseking.phtml
// @version       1
// ==/UserScript==

var i=0;
var ele = document.getElementById('qp1');
i = 1 + Math.floor(ele.options.length * Math.random());
ele.options[i].selected=true;

ele = document.getElementById('qp2');
i = 1 + Math.floor(ele.options.length * Math.random());
ele.options[i].selected=true;

ele = document.getElementById('qp3');
i = 1 + Math.floor(ele.options.length * Math.random());
ele.options[i].selected=true;

ele = document.getElementById('qp4');
i = 1 + Math.floor(ele.options.length * Math.random());
ele.options[i].selected=true;

ele = document.getElementById('qp5');
i = 1 + Math.floor(ele.options.length * Math.random());
ele.options[i].selected=true;

ele = document.getElementById('qp6');
i = 1 + Math.floor(ele.options.length * Math.random());
ele.options[i].selected=true;

ele = document.getElementById('qp7');
i = 1 + Math.floor(ele.options.length * Math.random());
ele.options[i].selected=true;