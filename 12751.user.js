// ==UserScript==
// @name            SG Text
// @namespace       PR22
// @include         http://www.totse.com/community/forumdisplay.php?f=151
// @include         https://www.totse.com/community/forumdisplay.php?f=151
// ==/UserScript==

window.setTimeout('showtime()', 1000)

function start() {
html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[2]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/TABLE[1]/TBODY[1]/TR[4]/TD[2]/DIV[1]/DIV[1]/DIV[1]/FORM[1]/TABLE[2]/TBODY[1]/TR[1]/TD[1]/SPAN[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue);
};

window.addEventListener("load", function() { start() }, false);

function insertAfter(newNode, target) {
    var parent = target.parentNode;
    var refChild = target.nextSibling;
    if(refChild != null)
	parent.insertBefore(newNode, refChild);
    else
	parent.appendChild(newNode);
};

function html_insert_it(doc, element, new_html) {

var counter;
counter = showtime();

  var new_html;
  new_html = ' ' + counter;

  var new_element;
  new_element = doc.createElement ("SPAN");

  new_element.innerHTML = new_html;

  insertAfter(new_element, element);

};

function showtime() {

var time = new Date();
var gmtMS = time.getTime() + (time.getTimezoneOffset() * 60000)
var now =  new Date(gmtMS)

var CurDate = now.getDate();
var CurHour = now.getHours();
var CurMin = now.getMinutes();
var CurSec = now.getSeconds();
var Dateleft = 31 - CurDate;
var Hourleft = 24 - CurHour - 1;
var Minleft = 60 - CurMin - 1;
var Secleft = 60 - CurSec

return ('| Meta Count Down | ' + Dateleft + ' Days, ' + Hourleft + ' Hours, ' + Minleft + ' Minutes')

};