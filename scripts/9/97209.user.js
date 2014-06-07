// ==UserScript==
// @name           lightsOut
// @namespace      //
// @include        http://*.deviantart.com/art/*
// ==/UserScript==

var pageParent = document.createElement("div");
  
  function lightsOut()
  {
  
    var fullSize =  window.innerHeight;
    
    var pageImg = document.getElementById("gmi-ResViewSizer_fullimg");
    pageParent = pageImg.parentNode;
    
    pageImg.className ="lightsOut";
    pageImg.setAttribute("id", "lightsOn");
    var imgStyle = pageImg.getAttribute("style");
    
    var imgSplit = imgStyle.split(";");

    var imgWidth = imgSplit[1].split("width: ");
      imgWidth = imgWidth[1].replace("; ", "");
      imgWidth = imgWidth.replace("px", "");
      
    var imgHeight = imgSplit[2].split("height: ");
    imgHeight = imgHeight[1].replace("; ", "");
    imgHeight = imgHeight.replace("px", "");
    
    var shrinkFactor = 1;
    if(imgHeight > fullSize)
    {
      shrinkFactor = fullSize/imgHeight;
      }
    
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(pageImg);
  
  
  var background = document.getElementById("deviantART-loves-you");
    var topOffset = ((fullSize - (parseInt(imgHeight)*shrinkFactor))/2);

  
  pageImg.addEventListener('click',lightsOn, false);
  background.addEventListener('click',lightsOn, false);
  
    
    GM_addStyle("#deviantART-loves-you{top:0!important; left:0!important; width:100%!important; height:100%!important; background: rgba(0,0,0,0.9)!important;z-index:900!important;position:fixed!important;display:inline-block!important;}"+
      ".lightsOut{position:fixed!important; z-index:999!important; top:"+topOffset+"px!important;margin-left:auto!important; margin-right:auto!important;height:"+(parseInt(imgHeight)*shrinkFactor)+"px!important; width:" +(imgWidth*shrinkFactor) +"px!important;  left:0!important; right:0!important;}"
  );
  
  
    }
    
    function lightsOn()
    {
      var img = document.getElementById("lightsOn");
      img.setAttribute("id", "gmi-ResViewSizer_fullimg");
      img.className = "smshadow"; 
      pageParent.appendChild(img);
      
      GM_addStyle("#deviantART-loves-you{width:0!important; height:0!important; top:200%!important;z-index:-1!important;display:none!important;}");
      }
    
    function init()
    {
      var button = document.getElementById("gmi-ResourceViewFaveButton").parentNode;
      var toggle = document.createElement("span");
      toggle.className = "lightButton";
      var innerButton = '<a href="#" class="smbutton smbutton-textonly"  id="lightSwitch"> <span id="lightButton"><i class="i19" id="lightsIcon"></i><b id="lightSwitch-button">Lights out</b></span></a>';
      toggle.innerHTML = innerButton;
    
  
    
      button.appendChild(toggle);
      toggle.addEventListener('click', lightsOut, false);
    }
    init();