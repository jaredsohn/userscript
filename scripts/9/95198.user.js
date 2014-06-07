// ==UserScript==
// @name           Garmin Connect Google Maps
// @namespace      http://www.renderfast.com/
// @description    Replaces Bing Maps with Google Maps on Garmin Connect
// @include        http://connect.garmin.com/dashboard*
// @include        http://connect.garmin.com/activity/*
// @resource       mapiframe http://www.renderfast.com/garminconnect/mapiframe.html
// ==/UserScript==

/*
 *  Author:  Doug Letterman doug AT renderfast dot com
 *  Date:    23 Jan, 2011
 *  Version: 0.3
 *  NOTICE:  This script is not affiliated with, approved, or endorsed 
 *           by Garmin in any way.
 *
 *   This script is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 */

mapIframe = null;

function log(txt) {
    if (console.log != null)
        console.log(txt);
    else if (GM_log != null)
        GM_log(txt);
}

function doInject(txt)
{
    var scrnode = document.createElement("script");
    scrnode.text = txt;
    scrnode.type = 'text/javascript';
    document.body.appendChild(scrnode);
}

function injectScriptDashboard()
{
    var scr =
    "Garmin.map.MapsUtil.initializeMap=function(){};"+
    "Garmin.map.MapsUtil.addEncodedPolylineToMap=function( map, data ) {"+
    "  mapIframe = document.getElementById('mapIframe');"+
    "  if (mapIframe != null) {"+
    "    mapIframe.contentWindow.loadPolyline(data);"+
    "}};";
    doInject(scr);
}

function injectScriptActivityPage()
{
    var scr = 
    "Garmin.mapLoader.prototype.initializeMap=function(){};"+
    "if(typeof JSON != undefined && JSON != null && JSON.size() > 0){"+
    "  document.getElementById('lapToggle').show();"+
    "  document.getElementById('showLapMarkers').addEventListener('click',function(){"+
    "    mapIframe = document.getElementById('mapIframe');"+
    "    mapIframe.contentWindow.toggleLaps(this.checked);"+
    " },false);}";
    doInject(scr);
}

function replaceBingMapDashboard() {
    // Handle the map on the dashboard page
    bmap = document.getElementById('activityMap');
    if (bmap) {
        mapParent = bmap.parentNode;
        mapIframe = document.createElement("iframe");
        mapIframe.id = "mapIframe";
        mapIframe.style.width = '100%';
        mapIframe.style.height = '240px';
        mapIframe.style.border = 'solid 1px grey';
        var iframeUrl = GM_getResourceURL('mapiframe');
        mapIframe.src = iframeUrl;
        mapParent.insertBefore(mapIframe, bmap);
        // now hide the bing map
        // we can't replace it entirely because that breaks stuff
        var bmapHider = document.createElement('div');
        bmapHider.style.display = 'none';
        mapParent.appendChild(bmapHider)
        bmapHider.appendChild(bmap);
        bmap.style.display = 'none';
        // hide the loading mask:
        var loadingMaskCnt = document.getElementById('loadingMaskContainer');
        bmapHider.appendChild(loadingMaskCnt);
        
        // hide the custom map controls widget
        var ctls = document.getElementById('custom-map-controls');
        if (ctls) {
            ctls.style.display = 'none';
            bmapHider.appendChild(ctls);
        }
    }
}

function replaceBingMapActivityPage()
{
    // Handle the map on the /activity/#### page
    bmap = document.getElementById('activityMapContainer');
    if (bmap) {
        mapParent = bmap.parentNode;
        mapIframe = document.createElement("iframe");
        var iframeUrl = GM_getResourceURL('mapiframe');
        mapIframe.src = iframeUrl;
        mapIframe.id = 'mapIframe';
        mapIframe.style.width = '100%';
        mapIframe.style.height = '400px';
        mapIframe.className = 'mapArea';
        mapParent.replaceChild(mapIframe, bmap);
    }
}

function main() {
    
    if (window.location.href.match(/dashboard/)) {
        injectScriptDashboard();
        replaceBingMapDashboard();
    } else {
        activityMatch = window.location.href.match(/activity\/(\d+)/);
        if (activityMatch) {
            injectScriptActivityPage();
            replaceBingMapActivityPage();
        }
    }
}

main();

