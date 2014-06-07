// ==UserScript==
// @name                WME GPS Track View
// @namespace           http://userscripts.org/scripts/show/461960
// @description         Draws and visualizes custom GPS tracks in Waze Map Editor
// @include             https://www.waze.com/editor/*
// @include             https://www.waze.com/*/editor/*
// @include             https://editor-beta.waze.com/*
// @version             1.2.2
// @grant               none
// @updateURL           http://userscripts.org/scripts/source/461960.meta.js
// @copyright           2014 wlodek76
// ==/UserScript==

var wmech_version = "1.2.2"

//---------------------------------------------------------------------------------------
function bootstrap_WME_GPS_Track()
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
    setInterval(Draw_WME_GPS_Track, 1000);
}
//---------------------------------------------------------------------------------------
function min_to_deg(v)
{
    var fmin = parseFloat(v) * 0.01;
    var fdeg = parseInt(fmin);
    fmin -= fdeg;
    return (fdeg + fmin * 1.66666666666666666);
}
//---------------------------------------------------------------------------------------
function calc_azym(pt1, pt2, kierWidth)
{
    var dx = pt2.x - pt1.x;
    var dy = pt2.y - pt1.y;
    var azym = (Math.atan2(dx, dy) * 180.0 / Math.PI);
    if (azym > 360) azym -= 360;
    if (azym < 0)   azym += 360;
    return azym;
}
//---------------------------------------------------------------------------------------
function gps_parse()
{
    var gps_wazeMap = unsafeWindow.Waze.map;
    var gps_wazeModel = unsafeWindow.Waze.model;
    var gps_OpenLayers = unsafeWindow.OpenLayers;
    
    var obj1 = document.getElementById('wme_gps_layer_content');
    var obj2 = document.getElementById('wme_gps_layer_summary');
    var obj3 = document.getElementById('wme_gps_layer_speed');
    if (obj1 == null) return;
    if (obj2 == null) return;
    if (obj3 == null) return;

    var str = obj1.value;
    var speedmode = obj3.checked;
    
    points = [];
    lineFeatures = [];
    pointFeatures = [];
              
    var proj1 = new OpenLayers.Projection('EPSG:4326');
    var proj2 = gps_wazeMap.getProjectionObject();
    
    var time1 = 0;
    var time2 = 0;
                     
    var pt1 = null;
    var pt2 = null;
                     
    var kier1 = 0;
    var kier2 = 0;
    var kiercolor  = new Array();
    var speedcolor = new Array();

    kiercolor.push('#ff0000');
    kiercolor.push('#00ff40');
    kiercolor.push('#00ff40');
    kiercolor.push('#0000ff');
    kiercolor.push('#0000ff');
    kiercolor.push('#fff000');
    kiercolor.push('#fff000');
    kiercolor.push('#ff0000');

    speedcolor[0]  = '#000000';
    speedcolor[1]  = '#505060';
    speedcolor[2]  = '#b0b0c0';
    speedcolor[3]  = '#FFFF00';
    speedcolor[4]  = '#68fdda';
    speedcolor[5]  = '#00d508';
    speedcolor[6]  = '#f68400';
    speedcolor[7]  = '#8e3f04';
    speedcolor[8]  = '#ff525a';
    speedcolor[9]  = '#e00000';
    speedcolor[10] = '#2594fb';
    speedcolor[11] = '#0500c9';
    speedcolor[12] = '#fa00e4';
    speedcolor[13] = '#68008d';
    speedcolor[14] = '#370143';
    speedcolor[15] = '#370143';
    speedcolor[16] = '#370143';
    speedcolor[17] = '#370143';
    speedcolor[18] = '#370143';
    speedcolor[19] = '#370143';
    speedcolor[20] = '#370143';
    
    var kierWidth = 360 / kiercolor.length;
    kiercolor.push(kiercolor[0]);
    
    var nmea_format = str.indexOf("$GPGGA");
    var gpx_format  = str.indexOf("<trkpt");
    var kml_format1 = str.indexOf("<gx:coord>");
    var kml_format2 = str.indexOf("<LineString>");

    var numPoints = 0;
    var sumDist = 0;
    
    if (nmea_format >= 0) {
        
        pt1 = null;
        pt2 = null;
        kier1 = 0;
        kier2 = 0;
        points.length = 0;
       
        var p = -1;
        for(;;) {
            p = str.indexOf("$GPGGA", p+1);
			if (p < 0) break;
            
            var s = str.substr(p, 80);
            var d = s.split(",");
            
            var lat = min_to_deg(d[2]);
            var lon = min_to_deg(d[4]);
            if (d[3] == 'S') lat = -lat;
            if (d[5] == 'W') lon = -lon;
            
            var pt2 = new gps_OpenLayers.Geometry.Point(lon, lat).transform(proj1, proj2);
            numPoints++;
            
            time1 = time2;
            time2 = parseInt(d[1]);
            var s = time2 % 100;
            time2 = (time2 - s) / 100;
            var m = time2 % 100;
            time2 = (time2 - m) / 100;
            var g = time2 % 100;
            time2 = (g*3600) + (m*60) + s;
            
            var angle = 0;
            var stop = 0;
            var dist = 0;
            var speed = 0;
            var dt = 0;
               
            if (pt1 != null && pt2 != null) {
                angle = calc_azym(pt1, pt2, kierWidth);
                dist = pt1.distanceTo(pt2);
                dt = Math.abs(time2 - time1);
                
                kier2 = parseInt(angle / kierWidth);
                
                if (speedmode) {
                    var line = new OpenLayers.Geometry.LineString( [pt1, pt2] );
                    var geodist = line.getGeodesicLength(new OpenLayers.Projection("EPSG:900913"));
                    
                    var kmh = (geodist / dt) * 3.6;
                    speed = parseInt(kmh / 10);
                    if (speed < 0)  speed = 0;
                    if (speed > 20) speed = 20;
                    kier2 = speed;
	                if (dist < 5 && kier1<=2 && kier2<=2) continue;
                }
                else {
	                if (dist < 5) continue;
                }
                
                if (dist > 10000)	stop |= 1;
                if (dt > 60) 		stop |= 1;
                if (kier2 != kier1) stop |= 2;

            }
              
            //var ptFeature = new OpenLayers.Feature.Vector(pt1, {strokeColor: '#000000', labelText: '', lineWidth: 1 } );
            //pointFeatures.push(ptFeature);
           
            if (stop) {
                if (points.length >= 2) {
                    var k = kiercolor[kier1];
                    var szer = 3;
                    
                    if (speedmode) {
                        k = speedcolor[kier1];
                        szer = 6;
                    }
                    
                    var line = new gps_OpenLayers.Geometry.LineString(points);
                    sumDist += line.getGeodesicLength(new OpenLayers.Projection("EPSG:900913"));
                    var lineFeature = new gps_OpenLayers.Feature.Vector(line, {strokeColor: k, labelText: '', lineWidth: szer } );
                    lineFeatures.push(lineFeature);
                }
                points.length = 0;
                
                if (stop == 2) points.push(pt1);
            }

            points.push(pt2);
            pt1 = pt2;
            kier1 = kier2;
        }
    }
    

    
    
    
    if (gpx_format >= 0) {
        
        pt1 = null;
        pt2 = null;
        kier1 = 0;
        kier2 = 0;
        points.length = 0;
       
        var p = -1;
		var pend = str.indexOf("</trkseg");
        for (;;) {
        	p = str.indexOf("<trkpt", p+1);
            if (p < 0) break;
            
            if (p > pend) {
                if (points.length >= 2) {
                    var k = kiercolor[kier1];
                    var szer = 3;
                    
                    if (speedmode) {
                        k = speedcolor[kier1];
                        szer = 6;
                    }
                    
                    var line = new gps_OpenLayers.Geometry.LineString(points);
                    sumDist += line.getGeodesicLength(new OpenLayers.Projection("EPSG:900913"));
                    var lineFeature = new gps_OpenLayers.Feature.Vector(line, {strokeColor: k, labelText: '', lineWidth: szer } );
                    lineFeatures.push(lineFeature);
                }

                pt1 = null;
                pt2 = null;
                kier1 = 0;
                kier2 = 0;
                points.length = 0;

                pend = str.indexOf("</trkseg", p+1);
            }

            var s = str.substr(p, 60);
            
            var lat = 0;
            var lon = 0;
            var plat = s.indexOf('lat="');
            var plon = s.indexOf('lon="');
            if (plat>=0 && plon>=0) {
                lat = parseFloat( s.substr(plat + 5, 10) );
                lon = parseFloat( s.substr(plon + 5, 10) );
            }

            var pt2 = new gps_OpenLayers.Geometry.Point(lon, lat).transform(proj1, proj2); 
            numPoints++;
            
            var angle = 0;
            var stop = 0;
            var dist = 0;
            var speed = 0;
            var dt = 0;
               
            if (speedmode) {
                var p_speed  = str.indexOf("<speed>", p);
                var p_time   = str.indexOf("<time>",  p);
                var p_trkend = str.indexOf("</trkpt", p);
                
                if (p_time > p && p_time < p_trkend) {
                    var s   	= str.substr(p_time+6, 20);
                    var rok 	= parseInt( s.substr(0, 4) );
                    var mies 	= parseInt( s.substr(5, 2) );
                    var dzien 	= parseInt( s.substr(8, 2) );
                    var godz 	= parseInt( s.substr(11, 2) );
                    var minut 	= parseInt( s.substr(14, 2) );
                    var sek 	= parseInt( s.substr(17, 2) );
                    
                    time1 = time2;
                    time2 = (dzien*24*3600) + (godz*3600) + (minut*60) + sek;
                    dt = Math.abs(time2 - time1);
                    
                    var line = new OpenLayers.Geometry.LineString( [pt1, pt2] );
                    var geodist = line.getGeodesicLength(new OpenLayers.Projection("EPSG:900913"));
                    
                    var kmh = (geodist / dt) * 3.6;
                    speed = parseInt(kmh / 10);
                    if (speed < 0)  speed = 0;
                    if (speed > 20) speed = 20;
                }
                else {
                    if (p_speed > p && p_speed < p_trkend) {
                        var s   = str.substr(p_speed+7, 8);
                        var kmh = parseFloat(s) * 3.6;
                        speed = parseInt(kmh / 10);
                        if (speed < 0)  speed = 0;
                        if (speed > 20) speed = 20;
                    }
                }
			}
            
            if (pt1 != null && pt2 != null) {
                angle = calc_azym(pt1, pt2, kierWidth);
                dist = pt1.distanceTo(pt2);
                
                kier2 = parseInt(angle / kierWidth);
                
                if (speedmode) {
                    kier2 = speed;
                    if (dist < 5 && kier1<=2 && kier2<=2) continue;
                }
                else {
	                if (dist < 5) continue;
                }
                
                if (dist > 10000)	stop |= 1;
                if (kier2 != kier1) stop |= 2;

            }
              
            //var ptFeature = new OpenLayers.Feature.Vector(pt1, {strokeColor: '#000000', labelText: '', lineWidth: 1 } );
            //pointFeatures.push(ptFeature);
            
            if (stop) {
                if (points.length >= 2) {
                    var k = kiercolor[kier1];
                    var szer = 3;
                    
                    if (speedmode) {
                        k = speedcolor[kier1];
                        szer = 6;
                    }
                    
                    var line = new gps_OpenLayers.Geometry.LineString(points);
                    sumDist += line.getGeodesicLength(new OpenLayers.Projection("EPSG:900913"));
                    var lineFeature = new gps_OpenLayers.Feature.Vector(line, {strokeColor: k, labelText: '', lineWidth: szer } );
                    lineFeatures.push(lineFeature);
                }
                points.length = 0;
                
                if (stop == 2) points.push(pt1);
            }

            points.push(pt2);
            pt1 = pt2;
            kier1 = kier2;
        }
    }
    
    
    if (kml_format1 >= 0) {
        
        pt1 = null;
        pt2 = null;
        kier1 = 0;
        kier2 = 0;
        points.length = 0;

        var p = -1;
        var pend = str.indexOf("</gx:Track>");
        
        for(;;) {
            p = str.indexOf("<gx:coord>", p+1);
            if (p < 0) break;
            
            if (p > pend) {
                if (points.length >= 2) {
                    var k = kiercolor[kier1];
                    var szer = 3;
                    
                    if (speedmode) {
                        k = speedcolor[kier1];
                        szer = 6;
                    }
                    
                    var line = new gps_OpenLayers.Geometry.LineString(points);
                    sumDist += line.getGeodesicLength(new OpenLayers.Projection("EPSG:900913"));
                    var lineFeature = new gps_OpenLayers.Feature.Vector(line, {strokeColor: k, labelText: '', lineWidth: szer } );
                    lineFeatures.push(lineFeature);
                }
                pt1 = null;
                pt2 = null;
                kier1 = 0;
                kier2 = 0;
                points.length = 0;

                pend = str.indexOf("</gx:Track>", pend + 1);
            }
            
            var s = str.substr(p + 10, 30);
            var coord = s.split(" ");
            
            var lon = parseFloat( coord[0] );
            var lat = parseFloat( coord[1] );
            
            var pt2 = new gps_OpenLayers.Geometry.Point(lon, lat).transform(proj1, proj2);
            numPoints++;
            
            var angle = 0;
            var stop = 0;
            var dist = 0;
            var speed = 0;
            var dt = 0;
               
            if (pt1 != null && pt2 != null) {
                angle = calc_azym(pt1, pt2, kierWidth);
                dist = pt1.distanceTo(pt2);
                dt = 0;
                
                kier2 = parseInt(angle / kierWidth);
                
                if (speedmode) {
                    kier2 = 0;
                }
                else {
	                if (dist < 5) continue;
                }
                
                if (dist > 10000)	stop |= 1;
                if (dt > 60) 		stop |= 1;
                if (kier2 != kier1) stop |= 2;

            }
            
            
            if (stop) {
                if (points.length >= 2) {
                    var k = kiercolor[kier1];
                    var szer = 3;
                    if (speedmode) {
                        k = speedcolor[kier1];
                    	szer = 6;
                    }
                    
                    var line = new gps_OpenLayers.Geometry.LineString(points);
                    sumDist += line.getGeodesicLength(new OpenLayers.Projection("EPSG:900913"));
                    var lineFeature = new gps_OpenLayers.Feature.Vector(line, {strokeColor: k, labelText: '', lineWidth: szer } );
                    lineFeatures.push(lineFeature);
                }
                points.length = 0;
                
                if (stop == 2) points.push(pt1);
            }
            
            points.push(pt2);
            pt1 = pt2;
            kier1 = kier2;
        }
    }
    
    else if (kml_format2 >= 0) {
        
        pt1 = null;
        pt2 = null;
        kier1 = 0;
        kier2 = 0;
        points.length = 0;

        var p = -1;
        
        for(;;) {
            p = str.indexOf("<LineString>", p + 1);
            if (p < 0) break;
            
            var block_start = str.indexOf("<coordinates>", p);
            var block_end   = str.indexOf("</coordinates>", p);
            
            if (block_start>=0 && block_end>=0) {
                block_start += 13;
                var s = str.substr(block_start, block_end - block_start);
                var coords = s.split(" ");
                
                pt1 = null;
                pt2 = null;
                kier1 = 0;
                kier2 = 0;
                points.length = 0;
                
                for(var i=0; i<coords.length; i++) {
                    
                    var xyz = coords[i].split(",");
                    if (xyz[0]=='' || xyz[1]=='') continue;
                    var lon = parseFloat(xyz[0]);
                    var lat = parseFloat(xyz[1]);
                    
                    var pt2 = new gps_OpenLayers.Geometry.Point(lon, lat).transform(proj1, proj2);
                    numPoints++;
                    
                    var angle = 0;
                    var stop = 0;
                    var dist = 0;
                    var speed = 0;
                    var dt = 0;
                    
                    if (pt1 != null && pt2 != null) {
                        angle = calc_azym(pt1, pt2, kierWidth);
                        dist = pt1.distanceTo(pt2);
                        dt = Math.abs(time2 - time1);
                        
                        kier2 = parseInt(angle / kierWidth);
                        
                        if (speedmode) {
                            kier2 = 0;
                        }
                        else {
                            if (dist < 5) continue;
                        }
                        
                        if (dist > 10000)	stop |= 1;
                        if (dt > 60) 		stop |= 1;
                        if (kier2 != kier1) stop |= 2;
                        
                    }
                    
                    
                    if (stop) {
                        if (points.length >= 2) {
                            var k = kiercolor[kier1];
                            var szer = 3;
                            
                            if (speedmode) {
                                k = speedcolor[kier1];
                                szer = 6;
                            }
                            
                            var line = new gps_OpenLayers.Geometry.LineString(points);
                            sumDist += line.getGeodesicLength(new OpenLayers.Projection("EPSG:900913"));
                            var lineFeature = new gps_OpenLayers.Feature.Vector(line, {strokeColor: k, labelText: '', lineWidth: szer } );
                            lineFeatures.push(lineFeature);
                        }
                        points.length = 0;
                        
                        if (stop == 2) points.push(pt1);
                    }
                    
                    points.push(pt2);
                    pt1 = pt2;
                    kier1 = kier2;
                    
                }
                
                if (points.length >= 2) {
                    var k = kiercolor[kier1];
                    var szer = 3;
                    
                    if (speedmode) {
                        k = speedcolor[kier1];
                        szer = 6;
                    }
                    
                    var line = new gps_OpenLayers.Geometry.LineString(points);
                    sumDist += line.getGeodesicLength(new OpenLayers.Projection("EPSG:900913"));
                    var lineFeature = new gps_OpenLayers.Feature.Vector(line, {strokeColor: k, labelText: '', lineWidth: szer } );
                    lineFeatures.push(lineFeature);
                }
                
                
            }
        }
    }
    
        if (points.length >= 2) {
            var k = kiercolor[kier1];
            var szer = 3;
            
            if (speedmode) {
                k = speedcolor[kier1];
                szer = 6;
            }
            
            var line = new gps_OpenLayers.Geometry.LineString(points);
            sumDist += line.getGeodesicLength(new OpenLayers.Projection("EPSG:900913"));
            var lineFeature = new gps_OpenLayers.Feature.Vector(line, {strokeColor: k, labelText: '', lineWidth: szer } );
            lineFeatures.push(lineFeature);
            points.length = 0;
        }
    
    
    if (lineFeatures.length == 0) {
        
        pt1 = null;
        pt2 = null;
        kier1 = 0;
        kier2 = 0;
        points.length = 0;
        
        var lines = str.split("\n");
        
        if (lines.length >= 5) {
            var l0 = lines[0].split(',');
            var l1 = lines[1].split(',');
            var l2 = lines[2].split(',');
            var l3 = lines[3].split(',');
            var l4 = lines[4].split(',');
            var s0 = '';
            var s1 = '';
            var s2 = '';
            var s3 = '';
            var s4 = '';
            if (l0.length >= 2) s0 = l0[1].trim().toUpperCase();
            if (l1.length >= 2) s1 = l1[1].trim().toUpperCase();
            if (l2.length >= 2) s2 = l2[1].trim().toUpperCase();
            if (l3.length >= 2) s3 = l3[1].trim().toUpperCase();
            if (l4.length >= 2) s4 = l4[1].trim().toUpperCase();
            var len = s0.length + s1.length + s2.length + s3.length + s4.length;
            var c0 = s0.charCodeAt(0);
            var c1 = s1.charCodeAt(0);
            var c2 = s2.charCodeAt(0);
            var c3 = s3.charCodeAt(0);
            var c4 = s4.charCodeAt(0);
            
            if ( len==5 && s0=="S" && c1>=65 && c1<=90 && c2>=65 && c2<=90 && c3>=65 && c3<=90 && c4>=65 && c4<=90 ) {
                
                for(var i=1; i<lines.length; i++) {
                    
                    var line = lines[i].split(',');
                    if (line.length < 5) continue;
                    
                    var mode = line[1].trim();
                    
                    if (mode != 'A') { numPoints++; continue; }
                    
                    var lon = parseInt(line[2].trim()) / 1000000.0;
                    var lat = parseInt(line[3].trim()) / 1000000.0;
                    
                    var pt2 = new gps_OpenLayers.Geometry.Point(lon, lat).transform(proj1, proj2);
                    numPoints++;
                    
                    time1 = time2;
                    time2 = parseInt(line[0]);
                    
                    var angle = 0;
                    var stop = 0;
                    var dist = 0;
                    var speed = 0;
                    var dt = 0;
                    
                    if (pt1 != null && pt2 != null) {
                        angle = calc_azym(pt1, pt2, kierWidth);
                        dist = pt1.distanceTo(pt2);
                        dt = Math.abs(time2 - time1);
                        
                        kier2 = parseInt(angle / kierWidth);
                        
                        if (speedmode) {
                            var line = new OpenLayers.Geometry.LineString( [pt1, pt2] );
                            var geodist = line.getGeodesicLength(new OpenLayers.Projection("EPSG:900913"));
                            
                            var kmh = (geodist / dt) * 3.6;
                            speed = parseInt(kmh / 10);
                            if (speed < 0)  speed = 0;
                            if (speed > 20) speed = 20;
                            kier2 = speed;
                            if (dist < 5 && kier1<=2 && kier2<=2) continue;
                        }
                        else {
                            if (dist < 5) continue;
                        }
                        
                        if (dist > 10000)	stop |= 1;
                        if (dt > 60) 		stop |= 1;
                        if (kier2 != kier1) stop |= 2;
                    }
                    
                    
                    if (stop) {
                        if (points.length >= 2) {
                            var k = kiercolor[kier1];
                            var szer = 3;
                            
                            if (speedmode) {
                                k = speedcolor[kier1];
                                szer = 6;
                            }
                            
                            var line = new gps_OpenLayers.Geometry.LineString(points);
                            sumDist += line.getGeodesicLength(new OpenLayers.Projection("EPSG:900913"));
                            var lineFeature = new gps_OpenLayers.Feature.Vector(line, {strokeColor: k, labelText: '', lineWidth: szer } );
                            lineFeatures.push(lineFeature);
                        }
                        points.length = 0; //points = []; //points.splice(0, 99999999);
                        
                        if (stop == 2) points.push(pt1);
                    }
                    
                    points.push(pt2);
                    pt1 = pt2;
                    kier1 = kier2;                
                }
            }
            
        }
    }
    
    
    
    var layers = gps_wazeMap.getLayersBy("uniqueName","__WME_GPS_Track");
    if(layers.length != 0) {
        
        var gps_layer = layers[0];
        if (lineFeatures.length > 0)  gps_layer.addFeatures(lineFeatures);
        if (pointFeatures.length > 0) gps_layer.addFeatures(pointFeatures);
    }
    
    if (lineFeatures.length > 0) {
        obj1.value = '';
    }
    obj2.innerHTML = 'Processed:  ' + '\n';
    obj2.innerHTML += numPoints + ' points,  ';
    obj2.innerHTML += parseInt(sumDist/10) / 100 + ' km.';
}
//---------------------------------------------------------------------------------------
function Draw_WME_GPS_Track()
{
    if(document.getElementById('wme_gps_layer') == null) {
    
        var cnt = '';
        cnt += '<br><div id="wme_gps_layer" style="color:#000000; ">';
        cnt += '<b>GPS Track View:</b>';
        cnt += '<textarea id="wme_gps_layer_content" style="font-family: Tahoma; font-size:9px; min-width:270px; max-width:270px; width:270px; min-height:100px; height: 100px; " ';
        cnt += 'placeholder="Paste a gps track (nmea, gpx, kml, gps.csv) here..." ></textarea>';
        cnt += '<br>';
        cnt += '</div>';

        var btn = $('<button id="wme_gps_layer_button" title="" >Add track</button>');
        btn.click(gps_parse);
        
        var spd = '&nbsp;&nbsp;&nbsp;<input id="wme_gps_layer_speed" type="checkbox" title="Colour GPS tracks by speed" ><span style="font-family: Tahoma; font-size:9px; position:relative; top:-3px;"> Speed</span>';

        var info = '<p style="font-family: Tahoma; font-size:9px; color:#808080; " id="wme_gps_layer_summary" ></p>';

        $("#sidepanel-drives").append(cnt);
        $("#sidepanel-drives").append(btn);
        $("#sidepanel-drives").append(spd);
        $("#sidepanel-drives").append(info);

        return;
    }

    var gps_wazeMap = unsafeWindow.Waze.map;
    var gps_wazeModel = unsafeWindow.Waze.model;
    var gps_OpenLayers = unsafeWindow.OpenLayers;

    if (gps_wazeMap == null) return;
    if (gps_wazeModel == null) return;
    if (gps_OpenLayers == null) return;

    var layers = gps_wazeMap.getLayersBy("uniqueName","__WME_GPS_Track");
    if(layers.length == 0) {
         var gps_style = new gps_OpenLayers.Style({
                strokeDashstyle: 'solid',
                strokeColor : "${strokeColor}",
                strokeOpacity: 1.0,
                strokeWidth: "${lineWidth}",
             	//strokeLinecap: 'square',
                fillColor: '#000000',
                fillOpacity: 1.0,
                pointRadius: 2,
                fontWeight: "normal",
                label : "${labelText}",
                fontFamily: "Tahoma, Courier New",
                labelOutlineColor: "#FFFFFF",
                labelOutlineWidth: 2,
                fontColor: '#000000',
                fontSize: "10px"
        });

        var gps_mapLayer = new gps_OpenLayers.Layer.Vector("GPS Track View", {
            displayInLayerSwitcher: true,
            uniqueName: "__WME_GPS_Track",
            styleMap: new gps_OpenLayers.StyleMap(gps_style)
        });
        
        I18n.translations.en.layers.name["__WME_GPS_Track"] = "GPS Track View";
        gps_wazeMap.addLayer(gps_mapLayer);
        gps_mapLayer.setVisibility(true);
        
        return;
    }
    
}
//---------------------------------------------------------------------------------------
bootstrap_WME_GPS_Track(); 