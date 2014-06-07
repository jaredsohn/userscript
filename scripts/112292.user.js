//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Add-Ons Manager/Manage User Scripts 
// (or click on arrow next to the Greasemonkey icon & select Manage User Scripts from the dropdown menu),
// select "GwScreenTitle", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          GwScreenTitle
// @version       20111028
// @description   Screen optimizer for facebook game Global Warfare
// @include        http://*.globalwarfaregame.com/*main_src.php*
// @include        http://apps.facebook.com/globalwarfaregame/*
// @include        https://apps.facebook.com/globalwarfaregame/*

// ==/UserScript==

var xUser = GM_getValue("xUser", "Loading...")
var xDelay = GM_getValue("xDelay", 5000)
var Seed = unsafeWindow.seed;

function getClientCoords(e){
  if (e==null)
    return {x:null, y:null, width:null, height:null};
  var x=0, y=0;
  ret = {x:0, y:0, width:e.clientWidth, height:e.clientHeight};
  while (e.offsetParent != null){
    ret.x += e.offsetLeft;
    ret.y += e.offsetTop;
    e = e.offsetParent;
  }
  return ret;
}

function xfTitle (){
  setTimeout(xfTitle, xDelay);
  if (unsafeWindow.xfLoaded) {
    try{  
      Seed = unsafeWindow.seed;
     	var e = document.getElementById('pt_outer');
    	if(e){
        e.style.left = '1110px'
		  }
     	var e = document.getElementById('koc_chatterbox');
  	  if(e){
  	   	 e.style.top = '-200px';
	       e.style.left = '760px';
	     	 e.style.background = 'black';	 
         e.style.height= '980px';  	
  		}
  		xUser=Seed.player.name;
  		GM_setValue("xUser", xUser);
  		GM_setValue("xDelay", xDelay);
//  		GM_log(xUser);
    } catch (e){
        alert( e.name +' : '+ e.message );
    }   
  return;
  }
//initstuff 
  document.title = xUser ;  
  var metc = getClientCoords(document.getElementById('main_engagement_tabs'));
  if (metc.width==null || metc.width==0){
      return;
    }
  unsafeWindow.xfLoaded = true;  
//  alert ("loaded");
}

xfTitle();

