// ==UserScript==
// @name                OS OpenData FullHeight
// @namespace	         http://greasemonkey.chizzum.com
// @description	      Increases height of map window on OS OpenData site
// @include		         http://www.ordnancesurvey.co.uk/opendata/viewer/*
// @grant               none
// @version             0.9
// ==/UserScript==

var odfhEastings = 0;
var odfhNorthings = 0;
var odfhZoom = 0;

function odfhBootstrap()
{
   var bGreasemonkeyServiceDefined = false;
   try {
      bGreasemonkeyServiceDefined = (typeof Components.interfaces.gmIGreasemonkeyService === "object");
   }
   catch (err) { /* Ignore */ }
   if (typeof unsafeWindow === "undefined" || ! bGreasemonkeyServiceDefined) {
      unsafeWindow    = ( function () {
         var dummyElem = document.createElement('p');
         dummyElem.setAttribute('onclick', 'return window;');
         return dummyElem.onclick();
      }) ();
   }
   /* begin running the code! */
   odfhInitialise();
}

function odfhResizeMap()
{
  // resizes map viewport whenever browser window changes size
   elm = document.getElementById("map");
   elm.style.height = (window.innerHeight-10)+'px';
   elm.style.width = (window.innerWidth-10)+'px';
}

function odfhRecentreMap()
{
   // call the OS provided functions required to point the map at a
   // given grid ref and zoom level
   mymapCenter = new unsafeWindow.OpenSpace.MapPoint(odfhEastings, odfhNorthings);
   unsafeWindow.osMap.setCenter(mymapCenter, odfhZoom);
}

function odfhFakeOnload()
{
   // remove the OS logos from the top...
   elm = document.getElementById("logos");
   elm.parentNode.removeChild(elm);

   // hide the huge "about    help    keep in touch" bit from the bottom... hide rather than
   // remove, so that the OS code doesn't throw a wobbler when it tries modifying some of
   // the elements within sitefooter!
   elm = document.getElementById('sitefooter');
   elm.style.visibility = "hidden";
   elm.style.position = "absolute";
   elm.style.top = "0px";

   // reduce the width of the whitespace around the map viewport
   document.getElementById("wrapper").style.padding = '4px';

   // move the "boundary layers" menu selector into the map viewport
   elm = document.getElementById("mapmast");
   elm.style.height = '0px';
   elm.style.top = '64px';
   elm.style.right = '64px';
   elm.style.zIndex = '2';
   // adjust the "boundary layers" border and background colour so it shows up nicely
   elm = document.getElementById("mapoptions").getElementsByTagName("LI");
   elm[0].style.borderStyle = 'solid';
   elm[0].style.backgroundColor = '#FFFFFF';
   elm[0].style.borderWidth = '1px';

   // resize the map viewport...
   odfhResizeMap();
   // ...then force a redraw of the map object to fill out the extra space
   unsafeWindow.osMap.render('map');

   window.addEventListener('resize', odfhResizeMap, true);

   // extract the starting coords/zoom from the url...
   var userloc = document.location.href;
   epos = userloc.indexOf("?e=");
   npos = userloc.indexOf("&n=");
   zpos = userloc.indexOf("&z=");
   if((epos != -1)&&(npos != -1)&&(zpos != -1))
   {
      odfhEastings = userloc.substr(epos+3,npos-(epos+3));
      odfhNorthings = userloc.substr(npos+3,zpos-(npos+3));
      odfhZoom = userloc.substr(zpos+3,2);
      //...then recentre the map
      odfhRecentreMap();
   }
}

function odfhInitialise()
{
   if(document.getElementById('OpenSpaceControlPoweredBy_innerImage') == null) setTimeout(odfhInitialise,500);
   else odfhFakeOnload();
}


odfhBootstrap();