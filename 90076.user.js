// ==UserScript==
// @name 4chan bio - bulk image opener
// @match http://boards.4chan.org/*/res/*
// ==/UserScript==


function openSet(offset){
  for (var f=offset*25; f<offset*25+25 && f<links.length; f++) {
    window.open(links[f].href);
  }
};

function findImageLinks() {
  var imageLinks = new Array();
  var links=document.forms['delform'].getElementsByTagName('a');
  for(var x=0; x<links.length; x++) {
    if (links[x].target=='_blank' && links[x].getElementsByTagName('img').length==0) {
      imageLinks.push(links[x]);
    }
  }
  return imageLinks;
}

function createDiv() {
  var div = document.createElement('div');
  div.style.backgroundColor='white';
  div.style.borderTop='1px solid #ccc';
  div.style.borderLeft='1px solid #ccc';
  div.style.padding='5px';
  div.style.position='fixed';
  div.style.bottom='0px';
  div.style.right='0px';
  document.body.appendChild(div);
  return div;
}



var links = findImageLinks();
var div = createDiv();
var numLinks = Math.ceil(links.length/25);

for (var x=0; x< numLinks; x++) {
  var startNum = x*25+1;
  var endNum = (x + 1) * 25 > links.length ? links.length : (x + 1) * 25;
  var a = document.createElement('a');
  a.innerHTML = startNum + ' - ' + endNum;
  a.style.marginRight = '7px';
  a.href = '#';
  a.onclick = function(num) {
    return function() {
      openSet(num);
      e.stopPropagation();
    }
  }(x);
  div.appendChild(a);
}