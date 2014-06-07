// ==UserScript==
// @name          Bypass Surveys
// @description   Annoyed by the surveys you have to fill out?
// @include       *
// ==/UserScript==


var has_cleaned = false;

function auto_gateway(){
  if(has_cleaned) return;
  
  function getStyle(x,styleProp){
	  return (x.currentStyle)
	          ? 
	          x.currentStyle[styleProp.replace(/-(.)/,function(all, group){return group.toUpperCase()})]
	          :
	          document.defaultView.getComputedStyle(x, null).getPropertyValue(styleProp);
  }


  //well it shoudl be stored as a string but whatevea
  var remove_cpa = (function(){
(function(){
  /*START MAGICAL SUPER SCRIPT*/

  var maxw = window.innerWidth, maxh = window.innerHeight;

  for(var e = document.body.getElementsByTagName("*"), l = e.length, el, zi, w, h; l--;){
    el = document.defaultView.getComputedStyle(e[l]);
    zi = el.getPropertyValue("z-index");
    w = parseInt(el.getPropertyValue("width"));
    h = parseInt(el.getPropertyValue("height"));  
    if(w/maxw > 0.92 && h/maxh > 0.92 && zi && !isNaN(parseInt(zi))){
      e[l].style.display = "none";
      
    }
  }

  for(var i = 0; i < 10000; i++){
    clearInterval(i);
    clearTimeout(i);
  }

  for(var i in window){
    if(i!="location") delete window[i];
  }

  for(var t=document.getElementsByTagName("*"), l=t.length; l--;)
    t[l].style.visibility = "";
    
    
  /*In case it does some ridiculous scroll down text*/
  for(var tag, t = document.getElementsByTagName("*"), l=t.length; l--;){
  tag = t[l].tagName.toLowerCase();
  if(tag != "style" && tag != "script"){
    for(var i = t[l].childNodes, remd = false, r = i.length; r--;){
      if(i[r].nodeType == 3){
        if(i[r].nodeValue.toLowerCase().indexOf("scroll") != -1){
          t[l].removeChild(i[r]);
          r++;
          remd = true;
        }
      }else if(i[r].tagName.toLowerCase() == "br" && remd){
        t[l].removeChild(i[r]);
        r++;
        remd = false;
      }
    }
  }
  }
})()

/*END INSERTED SCRIPT*/
  });

  for(var all = document.body.getElementsByTagName("*"), 
          len = all.length,
          zindex = null,
          docEl = document.documentElement,
          mask_height = docEl.clientHeight * 0.92,
          mask_width = docEl.clientWidth * 0.92,
          evil = false
          ; len--;){
    if(parseInt(getStyle(all[len],"z-index").replace(/[^0-9]/g,'')) > 1337 && all[len].offsetWidth > mask_width && all[len].offsetHeight > mask_height)
      evil = true;
  }
  if(evil){
    if(document.referrer.indexOf("facebook.com/pages") != -1){
      var notice = document.createElement("div");
      notice.setAttribute("style","background-color:orange;color:black;padding:3px;position:fixed;top:0;left:0");
      notice.innerHTML = "Gateway Blocked";
      notice.title = "The referrer has been detected to be facebook so the system feels there is enough certainty to do it automatically."
      document.body.appendChild(notice);
      
      var remover = document.createElement("script");
      remover.type = "text/javascript"
      remover.innerHTML = "/*INJECTED JS*/("+remove_cpa.toString()+")()";
      document.body.appendChild(remover);
      
    }else{
      var notice = document.createElement("div");
      notice.setAttribute("style","color:black;background-color:orange;padding:3px;position:fixed;top:0;left:0;z-index:999999999999999999999999999999999999999");
      notice.innerHTML = "Click to Remove Gateway";
      notice.addEventListener("click", function(){
        var remover = document.createElement("script");
        remover.type = "text/javascript"
        remover.innerHTML = "/*INJECTED JS*/("+remove_cpa.toString()+")()";
        document.body.appendChild(remover);
        notice.innerHTML = "Gateway Blocked";
      }, true);
      document.body.appendChild(notice);
    }
    has_cleaned = true;
  }
};

setTimeout(auto_gateway, 0);
setTimeout(auto_gateway, 1000);