// ==UserScript==
// @name        GeoGuessr Cheat
// @namespace   http://cheat.geo.gus.whatever
// @description GeoGuesser.com cheat button
// @include     http://www.geoguessr.com/
// @include     http://geoguessr.com/
// @version     1
// ==/UserScript==

// This script adds 2 buttons to the header of geoguessr.com
//   GE - opens a KML file of the current location in Google Earth
//   GM - Opens a tab of the current location in Google Maps
//
//  The GE function links to an external server that generates the KML file.
//  Server script is in comments at the end of this file.


document.cheat = function()
{
    var done = 0;
    p = document.body.getElementsByTagName('a');
    for (a = 0; a < p.length; a++) {
        z = p[a].href.indexOf("&cbll=");
        if (z > -1) {
            line = p[a].href.substr(z+6);
            z = line.indexOf('&');
            line = line.substr(0, z);
            if (line != "12,270,,-2,0") {
                line = line.split(',');
         //       if (null == document.getElementById("geocheatGE")) {
                if (done == 0) {
                    eld = document.createElement("div");
                    eld.setAttribute("style", "position:absolute;top:32px;left:442px;z-index:9999;display:block;visibility:visible;white-space:nowrap");
                    ela = document.createElement("a");
                    ela.appendChild(document.createTextNode("GE"));
                    ela.setAttribute("id", "geocheatGE");
                    ela.setAttribute("target", "_blank");
                    ela.setAttribute("style", "background:#543;color:#def;text-decoration:none;border-radius:6px;padding:1px 1em 1px 1em");
                    ela.setAttribute("href", "http://sillysot.com/dtv2/geocheat.kml?lat="+line[0]+"&lon="+line[1]);
                    eld.appendChild(ela);


                    eld.appendChild(document.createTextNode('\u00A0'));

                    ela = document.createElement("a");
                    ela.appendChild(document.createTextNode("GM"));
                    ela.setAttribute("id", "geocheatGM");
                    ela.setAttribute("target", "_blank");
                    ela.setAttribute("style", "background:#543;color:#def;text-decoration:none;border-radius:6px;padding:1px 1em 1px 1em");
                    ela.setAttribute("href", "http://maps.google.com/maps?vector=1&q="+line[0]+"%20"+line[1]+"&z=19&t=h");
                    eld.appendChild(ela);

                    document.body.appendChild(eld);
                    done=1;
                }
               // clearTimeout(document.zapper);
                break;
            }
        }
    }
}

document.zapper = setInterval("document.cheat()",2000);

// --- Server side KML generator is as follows.  It is PHP, obviously -----------------------

// <?php
// header("Content-Type: application/vnd.google-earth.kml+xml");
// echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?" . ">\n";
// ?>
// <kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">
// <Document>
//   <Placemark>
//       <name><?php echo $_GET['lon'] . ',' . $_GET['lat']; ?></name>
//         <open>1</open>
//         <LookAt>
//             <longitude><?php echo $_GET['lon']; ?></longitude> <latitude><?php echo $_GET['lat']; ?></latitude>
//             <altitude>20000</altitude>
//             <heading>0</heading>
//             <tilt>0</tilt>
//             <range>0</range>
//         <gx:altitudeMode>relativeToSeaFloor</gx:altitudeMode>
//         </LookAt>
//     <Point>
//       <coordinates><?php echo $_GET['lon'] . ',' . $_GET['lat']; ?>,0</coordinates>
//     </Point>
//   </Placemark>
// </Document>
// </kml>