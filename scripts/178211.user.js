// ==UserScript==
// @name       freestockcharts ads
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  freestockcharts ads
// @match      http://www.freestockcharts.com/*
// @copyright  2013+, César
// ==/UserScript==

document.getElementById('adFrame').remove();
document.getElementById('controlFrame').remove();
document.getElementById('SilverlightControl1').style.width = '100%';
document.getElementById('SilverlightControl1').style.height = '100%';
document.getElementById('SilverlightControl1').id = 'chart';