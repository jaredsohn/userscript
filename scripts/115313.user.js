// ==UserScript==
// @name          Grumpy Old King Selector
// @description   Chooses the question portion of Grumpy Old King as is needed for the avatar and randomizes the answer.
// @include       http://www.neopets.com/medieval/grumpyking.phtml
// @version       DZeratul
// ==/UserScript==

var ele = document.getElementById('qp1');
ele.options[3].selected=true;

ele = document.getElementById('qp2');
ele.options[8].selected=true;

ele = document.getElementById('qp3');
ele.options[6].selected=true;

ele = document.getElementById('qp4');
ele.options[1].selected=true;

ele = document.getElementById('qp5');
ele.options[39].selected=true;

ele = document.getElementById('qp6');
ele.options[118].selected=true;

ele = document.getElementById('qp7');
ele.options[1].selected=true;

ele = document.getElementById('qp8');
ele.options[32].selected=true;

ele = document.getElementById('qp9');
ele.options[1].selected=true;

ele = document.getElementById('qp10');
ele.options[143].selected=true;

var i=0;
var ele = document.getElementById('ap1');
i = 1 + Math.floor(ele.options.length * Math.random());
ele.options[i].selected=true;

ele = document.getElementById('ap2');
i = 1 + Math.floor(ele.options.length * Math.random());
ele.options[i].selected=true;

ele = document.getElementById('ap3');
i = 1 + Math.floor(ele.options.length * Math.random());
ele.options[i].selected=true;

ele = document.getElementById('ap4');
i = 1 + Math.floor(ele.options.length * Math.random());
ele.options[i].selected=true;

ele = document.getElementById('ap5');
i = 1 + Math.floor(ele.options.length * Math.random());
ele.options[i].selected=true;

ele = document.getElementById('ap6');
i = 1 + Math.floor(ele.options.length * Math.random());
ele.options[i].selected=true;

ele = document.getElementById('ap7');
i = 1 + Math.floor(ele.options.length * Math.random());
ele.options[i].selected=true;

ele = document.getElementById('ap8');
i = 1 + Math.floor(ele.options.length * Math.random());
ele.options[i].selected=true;