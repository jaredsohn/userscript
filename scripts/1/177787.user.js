// ==UserScript==
// @name                CanariesMapTracker
// @namespace	         http://greasemonkey.chizzum.com
// @description	      Enables tracking of WME location on the Canaries government mapping site
// @include		         http://visor.grafcan.es/visorweb/*
// @grant               none
// @version             0.1
// ==/UserScript==

function cmtAddLog(logtext)
{
   console.log('CMT: '+logtext);
}

function cmtBootstrap()
{
   cmtAddLog('bootstrap');
   var bGreasemonkeyServiceDefined = false;

   // the usual try...catch construct doesn't work on the grafcan.es site for some reason, so
   // we explicitly test for the presence of the Components object before trying to access it
   if(typeof Components != "undefined")
   {
      bGreasemonkeyServiceDefined = (typeof Components.interfaces.gmIGreasemonkeyService === "object");
   }

   if (typeof unsafeWindow === "undefined" || ! bGreasemonkeyServiceDefined) {
      unsafeWindow    = ( function () {
         var dummyElem = document.createElement('p');
         dummyElem.setAttribute('onclick', 'return window;');
         return dummyElem.onclick();
      }) ();
   }
   cmtInitialise();
}

function cmtInitialise()
{
   cmtAddLog('waiting for map object');
   map = unsafeWindow.map;
   if(map == null)
   {
      setTimeout(cmtInitialise,500);
      return;
   }
   cmtAddLog('map object accessed');

   // extract the coords/zoom from the url...
   var userloc = document.location.href;
   latpos = userloc.indexOf("?lat=");
   lonpos = userloc.indexOf("&lon=");
   zpos = userloc.indexOf("&z=");
   if((latpos != -1)&&(lonpos != -1)&&(zpos != -1))
   {
      var cmtLat = parseFloat(userloc.substr(latpos+5,lonpos-(latpos+5)));
      var cmtLon = parseFloat(userloc.substr(lonpos+5,zpos-(lonpos+5)));
      var cmtZoom = parseInt(userloc.substr(zpos+3,2))+12;
      var cmtPos = map.getCenter();
      cmtPos.jb = cmtLat;
      cmtPos.kb = cmtLon;
      map.setCenter(cmtPos);
      map.setZoom(cmtZoom);
      cmtAddLog('map repositioned');
   }
}

cmtBootstrap();