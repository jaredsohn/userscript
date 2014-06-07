// ==UserScript==
// @name          ASR Results Styling
// @description   Adjust ASR Results Styling
// @include       http://stalkor.nl/asrscript/cgi-bin/v3/matrix.cgi*
// ==/UserScript==

GM_addStyle('\
table.sample {\
  table-layout: fixed;\
  background-color: white;\
  border-collapse: collapse;\
  border-color: gray;\
  border-spacing: 0;\
  border-style: normal;\
  border-width: 1px;\
  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;\
  font-size: 12px;\
}\
table.sample td,\
table.sample th {\
  border-color: gray;\
  border-style: solid;\
  border-width: 1px;\
  padding: 0;\
  width: 16px;\
  height: 16px;\
}\
table.sample:not(:first-of-type) td,\
table.sample:not(:first-of-type) th:not(:first-child) {\
  background: transparent !important;\
}\
table.sample:not(:first-of-type) tr:nth-child(odd) {\
  background: #eee !important;\
}\
table.sample th {\
  padding: 0 2px;\
  width: 12px;\
}\
img {\
  display: block;\
  float: left;\
}\
table.sample th:nth-child(1),\
table.sample td:nth-child(1) {\
  white-space: nowrap;\
  width: 150px;\
}\
table.sample th:nth-child(2) {\
  width: 32px;\
}\
table.sample th:nth-child(3) {\
  width: 50px;\
}\
table.sample th:last-child {\
  width: auto;\
}\
a.win,\
a.lose {\
  display: block;\
  width: 50%;\
  height: 100%;\
  float: left;\
  background: #5ec94b;\
}\
a.win img,\
a.lose img {\
  display: none;\
}\
a.lose {\
  background: #c94b54;\
}\
img[src="../../cross.png"] {\
  display: none;\
}\
table.sample td.invalid {\
  background: #ddd !important;\
}\
img[src="../../graph.png"],\
img[src="../../pie_chart.png"] {\
  width: 50%;\
  height: 100%;\
}\
');

var imgs = document.getElementsByTagName('img');
for(var i=0; i<imgs.length;i++) {
  var src = imgs[i].getAttribute('src');
  if(src=="../../bullet_green2.png") {
    imgs[i].parentNode.className = "win";
  } else if(src=="../../bullet_red2.png") {
    imgs[i].parentNode.className = "lose";
  } else if(src=="../../cross.png") {
    imgs[i].parentNode.className = "invalid";
  }
}
