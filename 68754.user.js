// ==UserScript==
// @name           Resizeable Searchable Fields
// @namespace      http://nazo.yi.org/
// @include        *
// ==/UserScript==

(function(){
  var XPATH = "//*[self::input[@type='' or @type='text' or @type='password'] or self::select or self::textarea or self::iframe]";
  function setResizer(doc){
    var exp = doc.createExpression(XPATH, null);
    var rootElem = doc.getElementsByTagName("html")[0];
    if( each(setGrips) == 0) return;
    doc.addEventListener("resize", reposAllGrips, true);
    //-------------------------------------------- init
    function addEvent(type,listener){
      doc.addEventListener(type,listener,true);
      doc.addEventListener("unload",listener,true);
    }
    function removeEvent(type,listener){
      doc.removeEventListener(type,listener,true);
      doc.removeEventListener("unload",listener,true);
    }
    function getElementPos(e){
      var curX = e.offsetLeft;
      var curY = e.offsetTop;
      while(e.offsetParent){
        curX += e.offsetParent.offsetLeft;
        curY += e.offsetParent.offsetTop;
        e = e.offsetParent;
      }
      return {X:curX,Y:curY};
    }
    function each(func){
      var nodes = exp.evaluate( doc, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      var l = nodes.snapshotLength;
      for( var i=0; i<l;i++){
        func(nodes.snapshotItem(i));
      }
      return l;
    }
    function reposAllGrips(){
      each(function(el){
        if(el && el.ResizeFormFieldGrips)
          el.ResizeFormFieldGrips.setpos();
      });
    }
    function setGrips(el){
      if(el.ResizeFormFieldGrips)return;
      function activate(event){
        var curTarget = event.target.style.cursor;
        var resizer={
          "w-resize":function (event){
            var curPos = getElementPos(el);
            if(event.pageX - curPos.X > 20){
              el.style.width = event.pageX - curPos.X + "px";
            }
          },
          "n-resize":function(event){
            var curPos = getElementPos(el);
            if(event.pageY - curPos.Y > 20){
              el.style.height = event.pageY - curPos.Y + "px";
            }
            if(el.tagName.toLowerCase() == "select"){
              if(event.pageY - curPos.Y < 25){
                el.setAttribute("size", 1);
              }else{
                el.setAttribute("size", 2);
              }
            }
          },
          "se-resize":function(event){
            var curPos = getElementPos(el);
            if(event.pageX - curPos.X > 20 && event.pageY - curPos.Y > 20){
              el.style.width  = event.pageX - curPos.X + 2 + "px";
              el.style.height = event.pageY - curPos.Y + 2 + "px";
            }
            if(el.tagName.toLowerCase() == "select"){
              el.setAttribute("size", 2);
            }
          }
        }[curTarget];
        var cursorDiv = doc.createElement("div");
        cursorDiv.setAttribute(
          "style",
          "position: absolute; z-index: 9999; width:0px; height:0px;"+
          "width:"+rootElem.offsetWidth + "px;"+
          "height:" + rootElem.offsetHeight + "px;"+
          "cursor:"+curTarget );
        rootElem.appendChild(cursorDiv);
        function deactivate(){
          removeEvent("mouseup", deactivate);
          removeEvent("mousemove", resizer);
          rootElem.removeChild(cursorDiv);
          reposAllGrips();
        }
        addEvent("mousemove", resizer);
        addEvent("mouseup", deactivate);
      }
      function newGrip(cu){
        var grip = doc.createElement("div");
        var w = cu=="n" ? 1 : 4;
        var h = cu=="w" ? 1 : 4;
        grip.setAttribute("style","position: absolute; z-index: 9999; width: "+w+"px; height:"+h+"px; cursor: "+cu+"-resize;");
        grip.addEventListener("mousedown", activate, true);
        rootElem.appendChild(grip);
        return grip;
      }
      switch(el.tagName.toLowerCase()){
      case "select":
        function toSearchable(){
          el.removeEventListener('dblclick',toSearchable,false );
          var div = doc.createElement('div');
          var a = doc.createElement('input');
          div.appendChild(a);
          el.parentNode.insertBefore(div, el.nextSibling);
          a.addEventListener('keyup',function(){
            for(var i=el.options.length-1;0<=i;i--){
              el.options[i].style.display= (-1!=(el.options[i].text).toLowerCase().indexOf(this.value)) ? "" : "none";
            }
          },false);
        }
        el.addEventListener('dblclick',toSearchable,false );
        var n= newGrip("n");
        el.ResizeFormFieldGrips = {
        setpos:function(){
          var curPos = getElementPos(el);
          var v=n.style;
          v.left   = curPos.X + "px";
          v.top    = curPos.Y+el.offsetHeight-2  + "px";
          v.width  = el.offsetWidth -18 + "px";
        }
        };
        break;
      case "input":
        var w = newGrip( "w");
        el.ResizeFormFieldGrips = {
        setpos:function(){
          var curPos = getElementPos(el);
          var g=w.style;
          g.left   = curPos.X+el.offsetWidth -2 + "px";
          g.top    = curPos.Y + "px";
          g.height = el.offsetHeight   + "px";
        }
        };
        break;
      default:
        var w= newGrip("w");
        var n= newGrip("n");
        var se= newGrip("se");
        el.ResizeFormFieldGrips={
        setpos:function(){
          var curPos = getElementPos(el);
          var h=w.style;
          h.left   = curPos.X+el.offsetWidth -2 + "px";
          h.top    = curPos.Y+ "px";
          h.height = el.offsetHeight-8 + "px";

          var v=n.style;
          v.left   = curPos.X+ "px";
          v.top    = curPos.Y+el.offsetHeight-2 + "px";
          v.width  = el.offsetWidth -8 + "px";

          var x=se.style;
          x.left   = curPos.X+el.offsetWidth -8 + "px";
          x.top    = curPos.Y+el.offsetHeight-8 + "px";
        }
        };
      }
      el.ResizeFormFieldGrips.setpos();
    }
  }
  window.addEventListener("load", function pageload(event){
    if(event.originalTarget.body){
      setResizer(event.originalTarget);
    }
  }, true);
})();
