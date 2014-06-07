// ==UserScript==
// @name           Resizable Form Fields
// @version        0.2.4
// @description    Resizes HTML form fields, including textareas, select boxes, text fields, and iframes.
// @author         Justin Watt
// @namespace      http://justinsomnia.org/
// @compatibility  Firefox 2.0 3.0
// @include        *
// @Note           The original extention: http://justinsomnia.org/2006/10/resizeable-form-fields-for-firefox/
// ==/UserScript==

/* -----------------------------------------------
 * Released under the Creative Commons Attribution 2.5 License.
 * http://creativecommons.org/licenses/by/2.5/
 * 
 * 
 * == Original Copyright =========================
 *
 * Resizable Form Fields
 * Justin Watt
 * justincwatt@gmail.com
 * http://justinsomnia.org/
 * 
 * based on:
 * 
 * Resize Textarea 0.1
 * Original coding by Raik Juergens
 * Contact: borstel33@web.de
/* -------------------------------------------- */

(function(){
  var resizeTa = {
    TAlength: 0,
    TA: new Array(),
    
    collectionToArray: function(col){
      a = new Array();
      for(i = 0, l = col.length; i < l; i++)
        a[a.length] = col[i];
      return a;
    },
    
    load: function(){
      
      resizeTa.TA = resizeTa.collectionToArray(document.getElementsByTagName("textarea"));
      resizeTa.TA = resizeTa.TA.concat(resizeTa.collectionToArray(document.getElementsByTagName("select")));
      resizeTa.TA = resizeTa.TA.concat(resizeTa.collectionToArray(document.getElementsByTagName("iframe")));
      
      var inputs;
      inputs = document.getElementsByTagName("input");
      for(var i = 0, l = inputs.length; i < l; i++){
        if(
          !inputs[i].hasAttribute("type") ||
          inputs[i].getAttribute("type") == "text" ||
          inputs[i].getAttribute("type") == "password"
        ){
          resizeTa.TA.push(inputs[i]);
        }
      }
    },
    
    init: function(aEvent){
      resizeTa.load();
      
      resizeTa.TAlength = resizeTa.TA.length;
      if(resizeTa.TAlength == 0){
        return;
      }
      else{
        resizeTa.rootElem = document.getElementsByTagName("html")[0];
        var i = resizeTa.TAlength;
        while(i--){
          if(
            resizeTa.TA[i].tagName.toLowerCase() == "textarea" ||
            resizeTa.TA[i].tagName.toLowerCase() == "iframe"
          ){
            resizeTa.newdiv("4", "1", "gripH_", i, "w");
            resizeTa.newdiv("1", "4", "gripV_", i, "n");
            resizeTa.newdiv("10", "10", "gripX_", i, "se");
          }
          else if(resizeTa.TA[i].tagName.toLowerCase() == "select"){
            resizeTa.newdiv("1", "4", "gripV_", i, "n");        
          }
          else if(resizeTa.TA[i].tagName.toLowerCase() == "input"){
            resizeTa.newdiv("4", "1", "gripH_", i, "w");
          }
        }
        resizeTa.newdiv("0", "0", "showCursor", "", "w");
        CursorDiv = document.getElementById("showCursor");
        CursorDiv.removeEventListener("mousedown", resizeTa.activate, true);
        CursorDiv.style.left = "0px";
        CursorDiv.style.top  = "0px";
        resizeTa.posdivs();
        window.addEventListener("resize", resizeTa.posdivs, true);
      }
    },
    
    newdiv: function(w, h, id, nr, cu){
      var grip = document.createElement("div");
      grip.setAttribute("id", id + nr);
      grip.setAttribute(
        "style",
        "position: absolute; z-index: 9999; width: "+w+"px; height: "+h+"px; cursor: "+cu+"-resize;"
      );
      grip.addEventListener("mousedown", resizeTa.activate, true);
      resizeTa.rootElem.appendChild(grip);
    },
    
    getposition: function(i){
      var curElem = resizeTa.TA[i];
      var curX = curElem.offsetLeft;
      while(curElem.offsetParent){
        curX += curElem.offsetParent.offsetLeft;
        curElem = curElem.offsetParent;
      }
      curElem = resizeTa.TA[i];
      var curY = curElem.offsetTop;
      while(curElem.offsetParent){
        curY += curElem.offsetParent.offsetTop;
        curElem = curElem.offsetParent;
      }
      return [curX,curY];
    },
    
    posdivs: function(){
      var k = resizeTa.TAlength;
      while(k--){
        curPos = resizeTa.getposition(k);
        
        // only add horizontal grip to input boxes
        // note: height is different due to absense of corner grip
        if(resizeTa.TA[k].tagName.toLowerCase() == "input"){
          document.getElementById('gripH_'+k).style.left   = curPos[0]+resizeTa.TA[k].offsetWidth -2 + "px";
          document.getElementById('gripH_'+k).style.top    = curPos[1]                               + "px";
          document.getElementById('gripH_'+k).style.height =           resizeTa.TA[k].offsetHeight   + "px";
        }
        
        // only add vertical grip to select box
        if(resizeTa.TA[k].tagName.toLowerCase() == "select"){
          document.getElementById('gripV_'+k).style.left   = curPos[0]                                + "px";
          document.getElementById('gripV_'+k).style.top    = curPos[1]+resizeTa.TA[k].offsetHeight-2  + "px";
          document.getElementById('gripV_'+k).style.width  =           resizeTa.TA[k].offsetWidth -18 + "px";        
        }
        
        // add horizontal, vertical, and corner grippies to textarea and select
        if(
          resizeTa.TA[k].tagName.toLowerCase() == "textarea" ||
          resizeTa.TA[k].tagName.toLowerCase() == "iframe"
        ){
          document.getElementById('gripH_'+k).style.left   = curPos[0]+resizeTa.TA[k].offsetWidth -2 + "px";
          document.getElementById('gripH_'+k).style.top    = curPos[1]                               + "px";
          document.getElementById('gripH_'+k).style.height =           resizeTa.TA[k].offsetHeight-8 + "px";      
          
          document.getElementById('gripV_'+k).style.left   = curPos[0]                               + "px";
          document.getElementById('gripV_'+k).style.top    = curPos[1]+resizeTa.TA[k].offsetHeight-2 + "px";
          document.getElementById('gripV_'+k).style.width  =           resizeTa.TA[k].offsetWidth -8 + "px";
          
          document.getElementById('gripX_'+k).style.left   = curPos[0]+resizeTa.TA[k].offsetWidth -8 + "px";
          document.getElementById('gripX_'+k).style.top    = curPos[1]+resizeTa.TA[k].offsetHeight-8 + "px";
        }
      }
    },
    
    activate: function(e){
      resizeTa.load();
      CursorDiv       = document.getElementById("showCursor");
      var curTargetId = e.target.getAttribute("id").split("_");
      curTarget       = curTargetId[0];
      curTA_Nr        = parseInt(curTargetId[1]);
      document.addEventListener("mouseup", resizeTa.deactivate, true);
      switch(curTarget){
        case "gripH": document.addEventListener("mousemove", resizeTa.resizeta_h, true); break;
        case "gripV": document.addEventListener("mousemove", resizeTa.resizeta_v, true); break;
        case "gripX": document.addEventListener("mousemove", resizeTa.resizeta_x, true); break;
      }
      CursorDiv.style.width  = resizeTa.rootElem.offsetWidth + "px";
      CursorDiv.style.height = resizeTa.rootElem.offsetHeight + "px";
      CursorDiv.style.cursor = e.target.style.cursor;
    },
    
    deactivate: function(){
      document.removeEventListener("mouseup", resizeTa.deactivate, true);
      switch(curTarget){
        case "gripH": document.removeEventListener("mousemove", resizeTa.resizeta_h, true); break;
        case "gripV": document.removeEventListener("mousemove", resizeTa.resizeta_v, true); break;
        case "gripX": document.removeEventListener("mousemove", resizeTa.resizeta_x, true); break;
      }
      CursorDiv.style.width  = "0px";
      CursorDiv.style.height = "0px";
      resizeTa.posdivs();
    },
    
    resizeta_h: function(e){
      curPos = resizeTa.getposition(curTA_Nr);
      if(e.pageX - curPos[0] > 20){
        resizeTa.TA[curTA_Nr].style.width = e.pageX - curPos[0] + "px";
      }
    },
    
    resizeta_v: function(e){
      curPos = resizeTa.getposition(curTA_Nr);
      if(e.pageY - curPos[1] > 20){
        resizeTa.TA[curTA_Nr].style.height = e.pageY - curPos[1] + "px";
      }
      if(resizeTa.TA[curTA_Nr].tagName.toLowerCase() == "select"){
        if(e.pageY - curPos[1] < 25){
          resizeTa.TA[curTA_Nr].setAttribute("size", 1);
        }
        else{
          resizeTa.TA[curTA_Nr].setAttribute("size", 2);
        }
      }
    },
    
    resizeta_x: function(e){
      curPos = resizeTa.getposition(curTA_Nr);
      
      if(e.pageX - curPos[0] > 20 && e.pageY - curPos[1] > 20){
        resizeTa.TA[curTA_Nr].style.width  = e.pageX - curPos[0] + 2 + "px";
        resizeTa.TA[curTA_Nr].style.height = e.pageY - curPos[1] + 2 + "px";
      }
      if(resizeTa.TA[curTA_Nr].tagName.toLowerCase() == "select"){
        resizeTa.TA[curTA_Nr].setAttribute("size", 2);
      }
    }
  }
  
  if(document.body) resizeTa.init();
  
})();
