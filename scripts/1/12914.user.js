// ==UserScript==
// @name           karaoke
// @namespace      gomaxfire.dnsdojo.com
// @description    karaoke like text animation
// @version        0.112
// ==/UserScript==


var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var pause = true;
var inited = false;
var colors = null;
var id = null;
var DT = 5;
var preScrollY = 0;
function karaoke(node){
  pause = !pause;
  if(!inited){
    var queue = [];
    colors = [];
    walk(node);
    animation();
    inited = true;
  }

  function walk(node){
    if(!node){
    // nothing to do.
      return;
    } else if(node.nodeType == ELEMENT_NODE){
      if(node.tagName.match(/script/i) ||node.tagName.match(/embed/i)||node.tagName.match(/object/i) ||node.tagName.match(/iframe/i)||node.style.display == "none" ||node.style.visibility == "hidden"){
      // nothing to do
      } else {

        var children = [];
        Array.prototype.forEach.call(node.childNodes,
                                     function(child){
                                       children.push(child);
                                     });
        children.forEach(function(child){
          walk(child);
        });
      }
    } else if(node.nodeType == TEXT_NODE){
      queue.push(node);
    }
  }

  function animation(){
    var curNode = null;
    var curSpan = null;
    anim();

    function anim(){
      if(pause || animAux()){
        id =  setTimeout(anim, DT);
      }
    }

    function animAux(){
      if(!curNode){
        curNode = queue.shift();
        if(!curNode){
          // finish.
          return false;
        } else {
          if(trim(curNode.textContent).length > 0){
            curSpan = document.createElement("span");
            colors.push(curSpan);
            curNode.parentNode.insertBefore(curSpan, curNode);
            curSpan.style.color = "blue";
          }
        }
      }
      if(curNode){
        var curText = curNode.textContent;
        if(trim(curText).length > 0){
          curSpan.textContent += curText.substr(0, 1);
          curNode.textContent = curText.substring(1);
          var newScrollY = getY(curSpan) - 500;
          if(Math.abs(preScrollY - newScrollY) > 100 && newScrollY > 0){
            window.scrollTo(0, newScrollY);
            preScrollY = newScrollY;
          }
        } else {
          curNode = null;
        }
        return true;
      }

      function trim(s){
        return s.replace(/^\s+/, "").replace(/\s+$/, "");
      }
      function getY(node){
        if(!node || node.tagName && node.tagName.match(/body/i)){
          return 0;
        } else {
          return node.offsetTop + getY(node.offsetParent);
        }
      }
    }

  }
}

function reset(){
  colors.forEach(function(color){
    var text = color.nextSibling;
    text.textContent = color.textContent + text.textContent;
    color.parentNode.removeChild(color);
  });
  inited = false;
  colors = [];
  if(id){
    clearTimeout(id);
  }
}

var keybind = (function(){
  var funcs = [];
  function add(phrase, func){
    if(phrase instanceof Array){
      phrase.forEach(function(p){
        add(p, func);
      });
    } else {
      var callback = function(event){
        var tagName = event.target.tagName;
        if(phrase == code(event) &&
           !tagName.match(/(INPUT|TEXTAREA)/i)){
             func();
           }
      };
      funcs.push(callback);
      document.addEventListener("keydown", callback, true);
    }
  }
  function clear(){
    funcs.forEach(function(callback){
      document.removeEventListener("keydown", callback, true);
    });
  }
  function code(event){
    var code = [];
    if(event.shiftKey){
      code.push("S");
    } else if(event.ctrlKey){
      code.push("C");
    } else if(event.altKey || event.metaKey){
      code.push("M");
    }
    code.push(kc2char(event.keyCode));
    return code.join("-");

    function kc2char(kc){
      var _32_40 = "space pageup pagedown end home left up right down".split(" ");
      var kt = {
        8: "backspace",
        9  : "tab"  ,
        13 : "enter",
        16 : "shift",
        17 : "control",
        27 : "escape",
        46 : "delete"
      };
      return (between(65,90)  ? String.fromCharCode(kc+32) : // a-z
              between(48,57)  ? String.fromCharCode(kc) :    // 0-9
              between(96,105) ? String.fromCharCode(kc-48) : // num 0-9
              between(32,40)  ? _32_40[kc-32] :
              kt.hasOwnProperty(kc) ? kt[kc] :
              kc);
      function between(a,b){
        return a <= kc && kc <= b;
      }
    }
  }
  return {add:add, clear:clear};
})();

function enFast(){
  if(DT > 0){
    DT-=5;
  }
}
function enSlow(){
  DT+=5;
}


keybind.add("S-k", function(){karaoke(document.body, 1);});
keybind.add("escape", reset);
keybind.add("f", enFast);
keybind.add("s", enSlow);
