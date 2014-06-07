// ==UserScript==
// @name          Jazz Tool Box
// @description   A Greasemonkey script that scrolls to top and bottom and clicks save button (someday).
// @include       *
// @version     0.0.5
// ==/UserScript==
if(!parent || parent.location!=location) return;

function scrollToTop() {
scroll(0, 100);
}

function scrollToBottom () {
var body = document.body,
    html = document.documentElement;
//common code too account different height elements.
var pageHeight = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
var myHeight = 	(pageHeight - 777)				   
  scroll(0, pageHeight);
}

function saveRecord () {
alert ("Someday this will save the record\nUntil then enjoy this popup\n" + Summary );
var elements = document.getElementsByClassName('Button');
}

var jazz = document.createElement('div');
var gotop = document.createElement('a');
var gobot = document.createElement('a');
var saveit = document.createElement('a');
var lb = document.createElement('br');
var lb2 = document.createElement('br');
var lb3 = document.createElement('br');
var menu = '';
var Summary = document.getElementsByClassName('intro')[0];

var css;
css = '{font:22px/1em Arial,Helvetica,sans-serif;margin:0;padding:0;position:fixed;display:none;right:0%;top:80%;text-align:center;z-index:999999; width:74px;height:50px;' +
                                    'cursor:pointer;opacity:0.5;padding:2px;}' 

//go to the top
gotop.href = "javascript:void(0);";
gotop.addEventListener("click", scrollToTop, false);
gotop.setAttribute("style", "color:#000; font:12px arial;");
gotop.textContent = 'T';


//go to the bottom
gobot.href = "javascript:void(0);";
gobot.addEventListener("click", scrollToBottom, false);
gobot.setAttribute("style", "color:#000; font:12px arial;");
gobot.textContent = 'B';

//save
saveit.href = "javascript:void(0);";
saveit.addEventListener("click", saveRecord, false);
saveit.setAttribute("style", "color:#000; font:11px arial;");
saveit.textContent = 'SAVE';

//creating the element to hold the above stuff

  
  jazz.style.position = 'fixed';
  jazz.style.fontFamily = 'arial';
  jazz.style.top = '75%';
  jazz.style.right = '-2px';
  jazz.style.padding = '1px 1px 1px 1px';
  jazz.style.border = '2px outset #404040';
  jazz.style.backgroundColor = '#4193C1';
  jazz.style.textAlign = 'center';
  jazz.appendChild(gotop);
  jazz.appendChild(lb);
  jazz.appendChild(gobot);
  jazz.appendChild(lb2);
  jazz.appendChild(saveit);
  document.body.appendChild(jazz);
