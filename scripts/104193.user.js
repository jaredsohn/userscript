// ==UserScript==
// @name           afuhalkh
// @include        http://*
// ==/UserScript==

function init(){
  var nodes = Array.prototype.slice.apply(document.querySelectorAll('iframe[src*="https://plusone.google.com"]'));

  if(nodes.length > 0){
    document.body.addEventListener('mousemove', mouseMove(nodes), false);
  }
}

function mouseMove(nodes){
  nodes.forEach(function(node){
    node.top = '0px';
    node.left = '0px';
  });

  return function(event){
    var x = event.clientX;
    var y = event.clientY;
    var top = undefined;
    var left = undefined;
    var r = undefined;
    var dx = undefined;
    var dy = undefined;

    nodes.forEach(function(node){
      var r = node.getBoundingClientRect();
      if((x + 5 > r.left && x - 5 < r.left + r.width) &&
         (y + 5 > r.top && y - 5 < r.top + r.height)){
        if(x + 5 - r.left > r.left + r.width - (x - 5)){
          dx = -(x - r.left);
        }else{
          dx = r.left + r.width - (x - 5);
        }

        if((y + 5) - r.top > r.top + r.height - (y - 5)){
          dy = -(y - r.top);
        }else{
          dy = r.top + r.height - (y + 5);
        }
        node.style.position = 'relative';
        node.style.zIndex = '10000';
        node.style.left = '' + (parseInt(node.style.left) + dx) + 'px';
        node.style.top = '' + (parseInt(node.style.top) + dy) + 'px';
      }
    });
  }
}

init();