// ==UserScript==
// @name torrentz trailer search link
// @match http://torrentz.com/*
// @match http://www.torrentz.com/*
// ==/UserScript==

var id = function(n) { return document.getElementById(n) };
var cls = function(n) { return document.getElementsByClassName(n) };

var results = document.getElementsByClassName('results')[0];
results = results.getElementsByTagName('dt');
for (var i=0; i<results.length; i++) {
  var dt = results[i];
  var a = dt.childNodes[0];
  
  var insertText = document.createTextNode('search trailer');
  var insert = document.createElement('a');
  insert.setAttribute('href','#');
  insert.appendChild(insertText);
	insert.addEventListener("click", handleClick, true);
	
  var insertText = document.createTextNode(' ');
  dt.appendChild(insertText);
  dt.appendChild(insert);
}

function handleClick() {
  var el = this;
  el = el.parentNode.childNodes[0];
  var reply = prompt("Correct video search query:       ", el.innerText);
  if (reply !== null)
    window.open('http://www.google.com/search?q='+reply+' (trailer OR teaser)&tbo=p&tbs=vid:1&source=vgc&hl=en&aq=f',
        'sercz trajler','');
}

