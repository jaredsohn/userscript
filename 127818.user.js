// ==UserScript==
// @name          Remove all Facebook stuff from Dead Zone
// @namespace     Adam Sak
// @description   Stops the frames from appearing while playing The Last Stand: Dead Zone.
// @version       1.3
// @unwrap
// @include       *apps.facebook.com/laststand-deadzone/
// @include       *fb.deadzonegame.com/canvas/*
// ==/UserScript==

var zGbl_DOM_ChangeTimer                = '';
var bGbl_ChangeEventListenerInstalled   = false;

window.addEventListener ("load", MainAction, false);

function MainAction ()
{
    if (!bGbl_ChangeEventListenerInstalled)
    {
        bGbl_ChangeEventListenerInstalled   = true;
        document.addEventListener ("DOMSubtreeModified", HandleDOM_ChangeWithDelay, false);
    }
  //var iframe = document.getElementById('iframe_canvas');
  //var innerDoc = iframe.contentDocument || iframe.contentWindow.document;

  var fbHomeSidebar = document.getElementById('rightCol');
  if (fbHomeSidebar) {
    fbHomeSidebar.parentNode.removeChild(fbHomeSidebar);
    //innerDoc.getElementById('header').style.display='none';
    fbHomeSidebar = document.getElementById('blueBarHolder');
    fbHomeSidebar.parentNode.removeChild(fbHomeSidebar);
    fbHomeSidebar = document.getElementById('pagelet_dock');
    fbHomeSidebar.parentNode.removeChild(fbHomeSidebar);
    //fbHomeSidebar = document.getElementById('toolbarContainer');
    //fbHomeSidebar.parentNode.removeChild(fbHomeSidebar);
    document.getElementById('globalContainer').style.paddingRight="0px";
    document.getElementById('globalContainer').style.backgroundColor="#191C21";//3399FF
    //document.getElementById('mainContainer').style.width="101%";//3399FF
    document.getElementById('mainContainer').style.borderColor="#191C21";//3399FF
    document.getElementById('contentArea').style.borderColor="#191C21";//3399FF
    document.getElementById('contentCol').style.backgroundColor="#191C21";//3399FF
    //fbHomeSidebar = document.getElementById('facebook');
    document.getElementById('facebook').style.backgroundColor="#191C21";//3399FF
    document.getElementById('html').style.height="100%";
    document.getElementById('body').style.height="100%";
    fbHomeSidebar = document.getElementById('iframe_canvas');
    fbHomeSidebar.style.height="100%";//3399FF
  }

  
  

}

function HandleDOM_ChangeWithDelay (zEvent)
{
    if (typeof zGbl_DOM_ChangeTimer == "number")
    {
        clearTimeout (zGbl_DOM_ChangeTimer);
        zGbl_DOM_ChangeTimer = '';
    }
    zGbl_DOM_ChangeTimer     = setTimeout (function() { MainAction (); }, 1); //-- 1ms, adjust as necessary
}