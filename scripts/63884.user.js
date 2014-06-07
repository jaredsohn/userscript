// ==UserScript==
// @name           Get Linksfrom page
// @namespace      rave.cz
// @description    displays links for fullsize photoes in rave.cz photo album
// @include        http://www.rave.cz/fotky/*
// ==/UserScript==

document.getElementsByClass = function(needle) {
  function acceptNode(node) {
    if (node.hasAttribute("class")) {
      var c = " " + node.className + " ";
       if (c.indexOf(" " + needle + " ") != -1)
         return NodeFilter.FILTER_ACCEPT;
    }
    return NodeFilter.FILTER_SKIP;
  }
  var treeWalker = document.createTreeWalker(document.documentElement,
      NodeFilter.SHOW_ELEMENT, acceptNode, true);
  var outArray = new Array();
  if (treeWalker) {
    var node = treeWalker.nextNode();
    while (node) {
      outArray.push(node);
      node = treeWalker.nextNode();
    }
  }
  return outArray;
}


var elt = null;
var fotobox = document.getElementsByClassName('fotobox');
var pridaj;
var text = '';
		for (var i=0; i < fotobox.length; i++){
			var fotoLink = fotobox[i].getElementsByTagName('img');
			pridaj = fotoLink[0].getAttribute('src').replace('m.jpg','.jpg').replace('./../../..','http://'+document.domain);
			text += '<a href="'+pridaj+'" style="font-size: 7pt">'+pridaj+'</a>';
		    text += '<br>';
		}

var main, newElement;
main = document.getElementById('autor');

if (main) {
   newElement = document.createElement('div');
       newElement.innerHTML = '<div>'+text+'</div>';
   main.parentNode.insertBefore(newElement, main);
}