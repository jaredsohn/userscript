// ==UserScript==
// @name           Lux Self Spy
// @description   Epitrepi tin kataskopia stis poleis mas, gia na elexoume to risko anakalipsis pou exoume stin kathe mia apo autes kai to epipedo antikataskopias mas
// @version        1
//@author          E m p e r o r - Nulli Secundus
// @include        http://s*.ikariam.*/*
// @exclude       http://board.ikariam.*
// ==/UserScript==

var selfSpy = true;

//************************ END CONFIGURATION **************************//

var linkifyMapTimer;
var loadingImg = 'data:image/gif;base64,'+
    'R0lGODlhEAAQAPMAAP/vwP/vwP/vwP7uv/7uv/7uv/7uv/7uv/7uv/7uv/7uv/7uvwAAAAAAAAAA'+
    'AAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJ'+
    'CgAAACwAAAAAEAAQAAAEKxDISau9OE/Bu//cQBTGgWDhWJ5XSpqoIL6s5a7xjLeyCvOgIEdDLBqP'+
    'lAgAIfkECQoAAAAsAAAAABAAEAAABCsQyEmrvThPwbv/XJEMxIFg4VieV0qaqCC+rOWu8Yy3sgrz'+
    'oCBHQywaj5QIACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7/9xhFMlAYOFYnldKmqggvqzl'+
    'rvGMt7IK86AgR0MsGo+UCAAh+QQJCgAAACwAAAAAEAAQAAAEMRDISau9OE/Bu/+cghxGkQyEFY7l'+
    'mVYraaKqIMpufbc0bLOzFyXGE25AyI5myWw6KREAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThP'+
    'wbv/nKQgh1EkA0GFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkECQoAAAAs'+
    'AAAAABAAEAAABDYQyEmrvThPwbv/HKUgh1EkAyGF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYD'+
    'OYuaqHRKjQAAIfkECQoAAAAsAAAAABAAEAAABDEQyEmrvThPwbv/nKUgh1EkAxFWY3mmK9WaqCqI'+
    'JA3fbP7aOFctNpn9QEiPZslsOikRACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7/xymIIex'+
    'EOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo/ICAAh+QQJCgAAACwAAAAAEAAQAAAEJhDISau9OE/B'+
    'u/+cthBDEmZjeWKpKYikC6svGq9XC+6e5v/AICUCACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704'+
    'T8G7/xy2EENSGOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo/ICAAh+QQJCgAAACwAAAAAEAAQAAAE'+
    'MRDISau9OE/Bu/+ctRBDUhgHElZjeaYr1ZqoKogkDd9s/to4Vy02mf1ASI9myWw6KREAIfkECQoA'+
    'AAAsAAAAABAAEAAABDYQyEmrvThPwbv/HLUQQ1IYByKF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa'+
    '6yYDOYuaqHRKjQAAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv/nLQQQ1IYB0KFwFie6SqI'+
    'pImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkECQoAAAAsAAAAABAAEAAABDEQyEmrvThP'+
    'wbv/3EIMSWEciBWO5ZlWK2miqiDKbn23NGyzsxclxhNuQMiOZslsOikRADsAAAAAAAAAAAA=';

function debug(aMsg) { setTimeout(function() { throw new Error("[debug] " + aMsg); }, 0);}

$ = document.getElementById;

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while (next = got.iterateNext())
        result.push( next );
      return result;
  }
}
function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}
function node(type, className, styles, content) {
  var n = document.createElement(type||"div");
  if (className) n.className = className;
  if (styles)
    for (var prop in styles)
      n.style[prop] = styles[prop];
  if (content)
    n.innerHTML = "string" == typeof content ? content : content.toXMLString();
  return n;
}
function remove(node){
  return node.parentNode.removeChild(node);
}

switch (document.body.id) {
  case 'island' :
    if (selfSpy) {
      var toCloneNode = $X('//li[@class="espionage"]');
      var spyNode = toCloneNode.cloneNode(true);
      var cloneID = $X('./a',toCloneNode.parentNode.parentNode).id.replace(/\D+/g,'');
      var selfID = $X('//select[@id="citySelect"]/option[@selected="selected"]').value;
      spyNode.innerHTML = spyNode.innerHTML.replace(cloneID,selfID);
      var root = $('city_'+selfID);
      if (root) $X('.//ul[@class="cityactions"]',root.parentNode).appendChild(spyNode);
    }
  break;
}