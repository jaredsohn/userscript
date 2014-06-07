// ==UserScript==
// @name       NSU Empty Rooms
// @namespace  http://sekrasoft.nm.ru
// @version    0.2
// @description  Sorts room information by emptiness
// @match      http://nsu-schedule.ru/now/
// @include	   http://nsu-schedule.ru/now/
// @copyright  2013+, SekraSoft
// @updateURL	http://userscripts.org/scripts/source/178067.meta.js
// @downloadURL http://userscripts.org/scripts/source/178067.user.js
// ==/UserScript==

if(!Function.prototype.bind) Function.prototype.bind = function(){
  var args = arguments, that = this;
  return function(){ Function.prototype.call.apply(that, args); }
};

function sort(by){ return function(x){ return x.sort(by); } }
function map(f, arr){ return Array.prototype.map.call(arr, f); }
function map1(f){ return map.bind(this, f); }
function arr(a){ return map(function(x){ return x; }, a); }

function getRoomsInBlock(block){ return arr(block.querySelectorAll("div.span2")); }
function getRoomBlocks(doc){ return arr(doc.querySelectorAll("div.board>.row-fluid")); }

function getHash(roomObj){
  var numM = roomObj.querySelector('h4 a').innerHTML.match(/\d+/);
  var num = numM ? +numM[0] : Infinity;
  var percent = +roomObj.querySelector('span.room').innerHTML.match(/\((\d+)%\)/)[1];
  
  var s = roomObj.querySelector('span.sockets');
  var sockets = s ? +s.innerHTML : 0;
  var sd = roomObj.querySelector('span.sockdist');
  var sock_dist = sd ? +sd.innerHTML : Infinity;
  var o = roomObj.querySelector('span.opened');
  var opened = o && o.innerHTML == 'да' ? 1 : 0;
  return { num: num, percent: percent, obj: roomObj, sockets: sockets, sock_dist: sock_dist, opened: opened };
}

function byEmptinessAndSocketness(room1, room2){
  if(room1.percent === room2.percent){
    if(room1.opened === room2.opened){
      if(room1.sock_dist === room2.sock_dist)
        return room1.num - room2.num;
      return room1.sock_dist - room2.sock_dist;
    }
    return room2.opened - room1.opened;
  }
  return room1.percent - room2.percent;
}

function updateBlock(hashesList){
  if(!hashesList.length) return;
  var parentBlock = hashesList[0].obj.parentNode;
  
  while(parentBlock.childNodes.length)
    parentBlock.removeChild(parentBlock.childNodes[0]);
  
  var p = document.createElement('p');
  parentBlock.appendChild(p);
  
  hashesList.forEach(function(room){
    parentBlock.appendChild(room.obj);
  });
}

function sortAll(by){
  getRoomBlocks(document).map(getRoomsInBlock).map(map1(getHash)).map(sort(by)).forEach(updateBlock);
}

sortAll(byEmptinessAndSocketness);