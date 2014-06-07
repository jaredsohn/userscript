// ==UserScript==
// @name           Youtube Scaler
// @description   Schales youtube if you change the window size 
// @namespace      torrie
// @include        http*://*.youtube.com*
// @downloadURL https://userscripts.org/scripts/source/73679.user.js
// @updateURL https://userscripts.org/scripts/source/73679.meta.js
// @version 1.3.5
// ==/UserScript==

//version 1.11: Fixed for Firefox 6
//version 1.12: Fixed for new beta skin of youtube
//version 1.14: Subscribe button right of title, to add more vertical space
//version 1.14: If height does not fit, scale down.

//version 1.2: Fix for new youtube december 2012
//version 1.2.3. Fix for minor update march 2013


document.getElementsByClassName = function(cl) {
var retnode = [];
var myclass = new RegExp('\\b'+cl+'\\b');
var elem = this.getElementsByTagName('*');
for (var i = 0; i < elem.length; i++) {
var classes = elem[i].className;
if (myclass.test(classes)) retnode.push(elem[i]);
}
return retnode;
}; 

function addGlobalStyle(css) {
    var oldStyle = document.getElementById('ytscaler');	
	
	var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
	
	if(oldStyle)
	{
		head.removeChild(oldStyle);
	}
	
    style = document.createElement('style');
    style.id = "ytscaler"; 
	style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function addCss(element, atribute )
{
  return element  + "{" + atribute + " !important;} ";
}

function addCss(element, atribute , value)
{
  return element  + "{" + atribute + ":" + value + "px !important;} ";
}

function resize_2013() {
  
  
  clientWidth = document.documentElement.clientWidth;
  clientHeight = document.documentElement.clientHeight;
  
  css = "";
  
  defaultVideoWidth = 640;
  defaultVideoWidthM = 854;
 
  
  if(clientWidth > 1152)
  {
      
	  
	  rightWidth = 410;
	  leftWidth  = 10;
	  leftWidthCollapsed= 192;
      controlHeight = 27;
      
      if(  document.getElementsByTagName("video").length > 0)
      {
           controlHeight = 30;
      }
	  
	  
	  
	  videoWidth = (clientWidth - rightWidth) -  leftWidth;
	  videoHight = Math.round(videoWidth/16*9) + controlHeight;
	  heightNeeded = videoHight + controlHeight;
	  
	  
	  //on width screens
	  videoWidthM = clientWidth - leftWidth;
	  videoHightM = Math.round(videoWidthM/16*9) + controlHeight;
	  
	  maxVideoHight = clientHeight - 75;
	  
	  
	 
	  
	  
	  
	  

	  
	  
	 
	  
	  if(videoHight > maxVideoHight)
	  {
		  videoHight = maxVideoHight;
		  videoWidth  = Math.round((videoHight - controlHeight) / 9 * 16);
	  }
	  
	   if(videoHightM > maxVideoHight)
	  {
		  videoHightM = maxVideoHight;
		  videoWidthM  = Math.round((videoHightM - controlHeight) / 9 * 16);
	  }
	  
	  
	  
	  
	 
	  css +=   addCss(".player-height", "height", videoHight );
	  css +=   addCss(".player-width", "width", videoWidth );
	
	  
	  
	  
	  css +=   addCss("#watch7-main", "width", videoWidth + rightWidth );
	  css +=   addCss("#watch7-content", "width", videoWidth );
	  
	
	  
		 css +=  "  #watch7-sidebar { position: absolute  !important;}";
		 css +=   addCss("#watch7-sidebar", "margin-top", -videoHight );
		 css +=   addCss("#watch7-sidebar", "margin-left", videoWidth );
        css +=   addCss(".playlist-videos-container", "height", videoHight - 100 );
        css +=   addCss(".playlist-videos-list", "max-height", videoHight - 100 );
	  
	 
	  css +=   addCss("#yt-hitchhiker-feedback", "bottom", -40);
	  css +=   addCss("#guide-container", "left", 0);
	  //css +=   addCss(".watch7-playlist, #watch7-video-container, #watch7-main-container", "padding-left", leftWidth);
	  css +=  "  #watch7-video-container { background: none  !important;}";
	  css +=  "  #watch7-branded-banner { display: none  !important;}";
	   css +=  " body { overflow-x: hidden  !important;}";
      css += " .site-center-aligned .watch #content.content-alignment, .site-center-aligned #player.watch-small {max-width: 98%  !important;}";
       css += " .site-center-aligned #player.watch-medium {width: 100%  !important;}";
      css += " .html5-video-content, video { width: 100% !important; height: 100% !important;  }";
      css += " .html5-video-content .video-annotations { display: none !important;  }";
     
      
	   
	   css += addCss("#player-legacy, .site-left-aligned.guide-enabled .watch7-playlist, .site-left-aligned.guide-enabled #player, .site-left-aligned.guide-enabled #watch7-main-container", "padding-left", 180);
	   css += addCss("#yt-masthead #logo-container", "margin-right", 54);
      
	  
 }
  addGlobalStyle(css); 
}




 

function noVEVO_reSize() 
{
	resize_2013();
}
		 

function findPos(obj) {
	var curtop = 0;
	if (obj.offsetParent) {
		do {
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	return [curtop];
	}
}


/* resize embed when window is resized */
	window.addEventListener("resize", noVEVO_reSize, false);

   noVEVO_reSize();
   
   
      
 
 //force hd   
var links = document.getElementsByTagName("a");
for(var i = 0; i<links.length; i++) {
	if(links[i].href.match(/youtube.com\/watch/))
	{	
		links[i].href = links[i].href + "&hd=1"; 
	}
} 
