// ==UserScript==
// @name           Reddit Message Check
// @description    checks for that little red envelope
// @author         hypocrites
// @include        http://www.reddit.com/*
// @include        http://reddit.com/*
// ==/UserScript==

var req = new XMLHttpRequest();  
var regex = /static\/mail\.png/i;

function init() {
  sendReq();
}

function sendReq() {
  req.open('GET', 'http://www.reddit.com/', false);   
  req.send(null);  
  if(req.status == 200) {
    handleResponse();
  }
}

function handleResponse() {
     var response = req.responseText;
     if(regex.exec(response)) {  
       alert("You have new mail.");
     } else {
       setTimeout(sendReq, 180000);
     }
}

window.addEventListener('load', init, false);