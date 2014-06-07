// ==UserScript==
// @name           gmap2gpx
// @namespace      http://userscripts.org/users/200603
// @description    Inserts a reference to the GMapToGPX script (http://www.elsewhere.org/journal/gmaptogpx/)
// @include        http://maps.google.*/*
// ==/UserScript==

var gmap2gpx = document.createElement("a");
//gmap2gpx.innerHTML="GMapToGPX";
//gmap2gpx.setAttribute("class","link-text");
gmap2gpx.id="view_GMapToGPX_link"
gmap2gpx.innerHTML='<img class="bar-icon view-as-kml" src="http://maps.gstatic.com/intl/en_uk/mapfiles/transparent.png"/>&nbsp;<span class="link-text">GMapToGPX</span>';gmap2gpx.setAttribute("href","javascript:void(0)");
gmap2gpx.setAttribute("onclick","javascript:\
    (function(){var script=document.createElement('script');\
        script.src='http://www.elsewhere.org/GMapToGPX/gmaptogpx.js';\
        document.getElementsByTagName('head')[0].appendChild(script);})()");

var spacer = document.createElement("nobr");
spacer.innerHTML=' <img src=http://maps.gstatic.com/intl/en_ALL/mapfiles/transparent.png class="bar-icon-divider bar-divider" /> ';

var gmap2gpx_span=document.createElement("span");
gmap2gpx_span.id="view_GMapToGPX";
gmap2gpx_span.appendChild(gmap2gpx);
gmap2gpx_span.appendChild(spacer);

function nl2kml() {
    var kml_ref = this.firstElementChild;
    if (kml_ref.href.indexOf("output=nl") != -1) {
        kml_ref.href=kml_ref.href.replace("output=nl","output=kml");
        kml_ref.innerHTML=kml_ref.innerHTML.replace("View in Google Earth","KML");
    }
    var view_rss = document.getElementById("view_rss");
    // if RSS is available then KML is also available but GMapToGPX is not
    if ((view_rss.style.cssText == "") && (this.style.cssText != "")) {
        this.style.cssText = "";
        document.getElementById("view_GMapToGPX").style.cssText="display: none";
    }
}

var view_kml = document.getElementById("view_kml");
if (view_kml) {
    view_kml.parentNode.insertBefore(gmap2gpx_span,view_kml.nextSibling);
    view_kml.addEventListener('DOMAttrModified',nl2kml,false);
}

