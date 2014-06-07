// ==UserScript==
// @name           text_viewer
// @namespace      gomaxfire.dnsdojo.com
// @include        *
// @version 0.145
// ==/UserScript==

var TEXT_NODE = 3;
var ELEMENT_NODE = 1;
var FONT_SIZE = 30;
var DT = 30;
function isJapanese(text){
  return !!text.match(/[。、．，てにをはがもこそ]/);
}

function splitNodes(element){
  var body = document.body;
  // 適当に画面サイズから画面に入りきるぐらいの文字数を決める
  var LENGTH = Math.floor(window.innerWidth * window.innerHeight / 6000);
  LENGTH = LENGTH < 50 ? 50 : LENGTH;
  var slides = document.createElement("div");
  var curLength = 0;

  split(element);
  var last = getLastChild(element);
  setSlide(last);
  return slides;

  function getLastChild(node){
    if(node.nodeType == ELEMENT_NODE){
      var children = node.childNodes;
      if(!children.length){
        return node;
      } else {
        var last = children[children.length - 1];
        return getLastChild(last);
      }
    } else {
      return node;
    }
  }

  function makeNewSlide(){
    var div = document.createElement("div");
    div.className = "__slide__";
    with(div.style){
      border = "1px dashed blue";
      margin = "5px";
      padding = "5px";
    }
    return div;
  }

  function normalize(node){
    var style = {
      fontSize :FONT_SIZE + "pt",
      fontFamily : "\"Hiragino Kaku Gothic Pro\"",
      lineHeight : "150%",
      width : "auto",
      margin : "1px",
      padding : "1px",
      position : "relative",
      top : "0",
      left : "0",
      minWidth : "95%",
      minHeight : "95%"};
    var options = [
                   {
                     cond:/(OL|UL)/i,
                     style:{listStylePosition : "inside" }
                   },
                   {
                     cond:/pre/i,
                     descendent:true,
                     style:{fontFamily:"\"courier new\""}
                   }];

    setStyle(node, style, options);
  }

  function split(node){
    if(node.nodeType == TEXT_NODE){
      var newLength = curLength + trim(node.textContent).length;
      if(newLength > LENGTH){
        // 長過ぎる場合は分割する
        // でも文章ができるだけちぎれないように分割点を移動させる
        var regs = getRegs(node);
        var text = trim(node.textContent);
        var nodeLength = text.length;
        var delta = newLength - LENGTH;
        var position = nodeLength - delta;
        var nodeText = text.substring(0, position);
        var nextText = text.substring(position);
        var tmp = nodeText.match(regs[0]);
        var ps = null;
        if(tmp){
          ps = tmp[1];
        } else if(nodeText.length < LENGTH){
          ps = nodeText;
        }
        tmp = nextText.match(regs[1]);
        var ns = tmp ? tmp[0] : nextText;
        if(ps && ns){
          var p = ps.length;
          if(p > 0){
            nodeText = nodeText.substring(0, nodeText.length - p);
            nextText = ps + nextText;
          }
        }
        node.textContent = nodeText;
        if(trim(nextText).length){
          var next = document.createTextNode(nextText);
          node.parentNode.insertBefore(next, node.nextSibling);
        }
        return true;
      } else {
        curLength = newLength;
      }
    } else if(node.nodeType == ELEMENT_NODE){
      var child = node.firstChild;
      while(child){
        if(child.nodeType == ELEMENT_NODE && child.tagName.match(/h\d/i)){
          if(child.previousSibling){
            setSlide(child.previousSibling);
            curLength = 0;
          }
        }
        var toSlide = split(child);
        var nextChild = child.nextSibling;
        if(toSlide){
          setSlide(child);
          curLength = 0;
        }
        child = nextChild;
      }
    }


    function getRegs(node){
      var text = trim(node.textContent);
      var preRegs = [/\n(.+$)/, /^.+\n/];
      var jaRegs = [/[。．、，]\s*?([^。．、，]*)$/, /^[^。．、，]*?[。．、，]/];
      var enRegs = [/\s(\S*)$/, /^\S*?\s/];
      return isDescendent(/pre/i, node) ? preRegs
        :isJapanese(text) ? jaRegs
        : enRegs;
    }

  }

  function trim(t){
    return t.replace(/^\s+/, "").replace(/\s+$/, "");
  }

  function setSlide(node){
    var slide = walk(node);
    normalize(slide);
    slides.appendChild(slide);
  }

  function walk(node, children){
    var stop = false;
    var parent = node.parentNode;
    var cloneParent = parent.cloneNode(false);
    if(parent.tagName == "BODY"){
      cloneParent = makeNewSlide();
      stop = true;
    }
    var target = null;
    while((target = parent.firstChild) && target != node){
      if(target.nodeType == TEXT_NODE && trim(target.textContent).length == 0){
        target.parentNode.removeChild(target);
      } else {
        cloneParent.appendChild(target);
      }
    }
    if(children){
      if(!node.firstChild){
        node.parentNode.removeChild(node);
      }
      cloneParent.appendChild(children);
    } else {
      cloneParent.appendChild(node);
    }
    return stop ? cloneParent : walk(parent, cloneParent);
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

function init(){
  keybind.add("S-s", start);
  function start(){
    var cloneBody = document.body.cloneNode(true);
    var scripts = document.body.getElementsByTagName("script");
    var noscripts = document.body.getElementsByTagName("noscript");
    var removes = [];
    Array.prototype.forEach.call(scripts, function(script){
      removes.push(script);
    });
    Array.prototype.forEach.call(noscripts, function(noscript){
      removes.push(noscript);
    });
    removes.forEach(function(n){
      n.parentNode.removeChild(n);
    });
    var before = splitNodes(document.body);
    var after = document.createElement("div");
    var size = before.childNodes.length;
    var curPage = 0;
    document.body.innerHTML = "";
    next();
    keybind.add(["j","right"], next);
    keybind.add(["k","left"], previous);
    keybind.add("up", enlargeFontSize);
    keybind.add("down", ensmallFontSize);
    keybind.add("escape", reset);
    keybind.add("S-a", doKaraoke);
    keybind.add("f", enFast);
    keybind.add("s", enSlow);

    function enFast(){
      if(DT > 0){
        DT-=5;
      }
    }
    function enSlow(){
      DT+=5;
    }

    function doKaraoke(){
      karaoke(document.body, DT);
    }

    function next(){
      if(!before.firstChild){
        return false;
      }
      curPage++;
      if(document.body.firstChild){
        after.appendChild(document.body.firstChild);
        // for other body attaching scripts
        document.body.innerHTML = "";
      }
      document.body.appendChild(before.firstChild);
      setFontSize(before.firstChild);
      showPage();
      window.scrollTo(0,0);
      return true;
    }
    function previous(){
      if(!after.lastChild){
        return false;
      }
      curPage--;
      if(document.body.firstChild){
        before.insertBefore(document.body.firstChild, before.firstChild);
        // for other body attaching scripts
        document.body.innerHTML = "";
      }
      document.body.appendChild(after.lastChild);
      setFontSize(after.lastChild);
      showPage();
      window.scrollTo(0,0);
      return true;
    }

    function reset(){
      document.body.innerHTML = cloneBody.innerHTML;
      keybind.clear();
      init();
      inited = false;
      pause = true;
    }
    function enlargeFontSize(){
      FONT_SIZE++;
      setFontSize(document.body.childNodes[0]);
    }
    function ensmallFontSize(){
      if(FONT_SIZE < 11){
        return;
      }
      FONT_SIZE--;
      setFontSize(document.body.childNodes[0]);
    }
    function setFontSize(node){
      setStyle(node, {fontSize:FONT_SIZE + "pt"});
    }

    function showPage(){
      var progress = getOrCreateProgress();
      progress.textContent = curPage + "/" + size;
      document.body.appendChild(progress);
    }

    function getOrCreateProgress(){
      var progress = document.getElementById("__progress__");
      if(!progress){
        progress= document.createElement("div");
        progress.id = "__progress__";
        with(progress.style){
          position = "fixed";
          right = "0";
          bottom = "0";
          borderTop = "2px solid #EEEEEE";
          borderLeft = "2px solid #EEEEEE";
          borderBottom = "2px solid #333333";
          borderRight = "2px solid #333333";
          backgroundColor = "#999999";
          color = "white";
          padding = "4px";
          fontFamily = "Verdana,sans-serif";
          fontSize = "20pt";
        }
      }
      return progress;
    }

    var pause = true;
    var inited = false;
    function karaoke(node){
      pause = !pause;
      if(!inited){
        var queue = [];
        walk(node);
        animation();
        inited = true;
      }

      function walk(node){
        if(!node){
    // nothing to do.
          return;
        } else if(node.nodeType == ELEMENT_NODE){
          if(node.tagName.match(/script/i) ||node.tagName.match(/embed/i)||node.tagName.match(/object/i) ||node.tagName.match(/iframe/i)||node.style.display == "none" ||node.style.visibility == "hidden" || node.id == "__progress__"){
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
            setTimeout(anim, DT);
          } else {
            if(next()){
              inited = false;
              pause = !pause;
              doKaraoke();
            }
          }
        }

        function animAux(){
          if(!curNode){
            curNode = queue.shift();
            if(!curNode){
          // finish.
              return false;
            } else if(trim(curNode.textContent).length > 0){
              curSpan = document.createElement("span");
              curNode.parentNode.insertBefore(curSpan, curNode);
              curSpan.style.color = "blue";
            }
          }
          if(curNode){
            var curText = curNode.textContent;
            if(trim(curText).length > 0 /* && curText.length > 0 */){
              curSpan.textContent += curText.substr(0, 1);
              curNode.textContent = curText.substring(1);
              window.scrollTo(0, getY(curSpan) - 10);
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
  }
}

function setStyle(node, styles, options){
  if(!node || node.nodeType != ELEMENT_NODE){
    return;
  }
  var queue = [node];
  Array.prototype.forEach.call(node.getElementsByTagName("*"),function(child){
    queue.push(child);
  });
  var target = null;
  while(target = queue.shift()){
    if(target.nodeType == ELEMENT_NODE && target.tagName.match(/(img|object|embed|input)/i)){
      continue;
    }
    for(name in styles){
      target.style[name] = styles[name];
    }
    if(options){
      options.forEach(function(option){
        if(option.descendent && isDescendent(option.cond, target) ||
           !option.descendent && target.tagName.match(option.cond) ){
          for(name in option.style){
            target.style[name] = option.style[name];
          }
        }
      });
    }
  }
}
function isDescendent(parentReg,node){
  var p = node;
  var result = false;
  while(p && p.tagName && !p.tagName.match(/body/i) ){
    if(p.tagName.match(parentReg)){
      result = true;
      break;
    }
    p = p.parentNode;
  }
  return result;
}

init();



