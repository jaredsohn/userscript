// ==UserScript==
// @name                WME Roundabout Angles
// @namespace           http://userscripts.org/scripts/show/440831
// @description         Draws angles for typical roundabout and overlays helper line to adjust geometry of roundabout.
// @include             https://www.waze.com/editor/*
// @include             https://www.waze.com/*/editor/*
// @include             https://editor-beta.waze.com/*
// @version             1.04
// @grant               none
// @updateURL           http://userscripts.org/scripts/source/440831.meta.js
// @copyright           2014 wlodek76
// ==/UserScript==

var wmech_version = "1.04"

//---------------------------------------------------------------------------------------
function bootstrapRoundaboutAngles()
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
    setInterval(DrawRoundaboutAngles, 500);
}
//---------------------------------------------------------------------------------------
function DrawRoundaboutAngles()
{
    drc_wazeMap = unsafeWindow.Waze.map;
    drc_wazeModel = unsafeWindow.Waze.model;
    drc_OpenLayers = unsafeWindow.OpenLayers;
    
    if (drc_wazeMap == null) return;
    if (drc_wazeModel == null) return;
    if (drc_OpenLayers == null) return;

    var layers = drc_wazeMap.getLayersBy("uniqueName","__DrawRoundaboutAngles");
    if(layers.length > 0) {
    	var drc_layer = layers[0];
        
        if (drc_layer.visibility == false) {
            drc_layer.removeAllFeatures();
            return;
        }

        if (Waze.map.zoom < 6) {
            drc_layer.removeAllFeatures();
            return;
        }
    }
    

    drc_features = [];
    
    var rids = [];
    
    for (var iseg in Waze.model.segments.objects) {
        var isegment = Waze.model.segments.get(iseg);
        var iattributes = isegment.attributes;
		var iline = isegment.geometry.id;

        var irid = iattributes.junctionID;
        
        var p = rids.indexOf(irid);
        
        if (iline !== null && irid !== null && p==-1) {
            rids.push(irid);
            
            var nodes = new Array();
            var nodes_x = new Array();
            var nodes_y = new Array();

            for (var jseg in Waze.model.segments.objects) {
                var jsegment = Waze.model.segments.get(jseg);
                var jattributes = jsegment.attributes;
                var jrid = jattributes.junctionID;

                if (jrid == irid) {
                    nodes.push(jattributes.fromNodeID);
                    nodes.push(jattributes.toNodeID);
                }
            }
            
            for (var inode in Waze.model.nodes.objects) {
                var node = Waze.model.nodes.get(inode);
                var p = nodes.indexOf(node.fid);
                if (p >= 0) {
                    nodes_x.push(node.geometry.x);
                    nodes_y.push(node.geometry.y);
            	}
            }
                    
            var sr_x   = 0;
            var sr_y   = 0;
            var radius = 0;
            var numNodes = nodes_x.length;
                              
            
            if (nodes_x.length >= 3) {
                
                //-----------throw short segments
                while (nodes_x.length > 4) {
                    var id = 0;
                    var dmin = 99999999;
                    for(var i=0; i<nodes_x.length; i++) {
                        for(var j=0; j<nodes_x.length; j++) {
                            if (i == j) continue;
                            
                            var x1 = nodes_x[i];
                            var y1 = nodes_y[i];
                            var x2 = nodes_x[j];
                            var y2 = nodes_y[j];
    
                            var dx = x1 - x2;
                            var dy = y1 - y2;
                            var d = dx*dx + dy*dy;
                            if (d < dmin) { dmin = d; id = i; }
                        }
                    }
                    
                    nodes_x.splice(id, 1);
                    nodes_y.splice(id, 1);
                }
                          
                //-----------simple approximation of centre point calculated from three first points
                var ax = nodes_x[0];
                var ay = nodes_y[0];
                var bx = nodes_x[1];
                var by = nodes_y[1];
                var cx = nodes_x[2];
                var cy = nodes_y[2];
                
                var x1 = (bx + ax) * 0.5;
                var y11 = (by + ay) * 0.5;
                var dy1 = bx - ax;
                var dx1 = -(by - ay);
                var x2 = (cx + bx) * 0.5;
                var y2 = (cy + by) * 0.5;
                var dy2 = cx - bx;
                var dx2 = -(cy - by);
                sr_x = (y11 * dx1 * dx2 + x2 * dx1 * dy2 - x1 * dy1 * dx2 - y2 * dx1 * dx2)/ (dx1 * dy2 - dy1 * dx2);
                sr_y = (sr_x - x1) * dy1 / dx1 + y11;
                
                var dx = ax - sr_x;
                var dy = ay - sr_y;
                radius = Math.sqrt(dx*dx + dy*dy); 
                
                var angles = [];

                for(var i=0; i<nodes_x.length; i++) {
                    
                    var dx = nodes_x[i] - sr_x;
                    var dy = nodes_y[i] - sr_y;
                    
                    var angle = Math.atan2(dy, dx);
                    angle = (360.0 + (angle * 180.0 / Math.PI));
                    if (angle < 0.0) angle += 360.0;
                    if (angle > 360.0) angle -= 360.0;
                    angles.push(angle);
                }
            
            
                //---------sorting angles for calulating angle difference between two segments
                angles = angles.sort(function(a,b) { return a - b; });
                angles.push( angles[0] + 360.0);
                angles = angles.sort(function(a,b) { return a - b; });
                //console.log(angles);
            

                
                var drc_point = new drc_OpenLayers.Geometry.Point(sr_x, sr_y );
                var drc_circle = new drc_OpenLayers.Geometry.Polygon.createRegularPolygon( drc_point, radius, 256 );
                var drc_feature = new drc_OpenLayers.Feature.Vector(drc_circle, {labelText: "", labelColor: "#000000" }  );
                drc_features.push(drc_feature);

                if (numNodes == 3 || numNodes == 4) {
                   for(var i=0; i<nodes_x.length; i++) {
                        var ix = nodes_x[i];
                        var iy = nodes_y[i];
                        var startPt   = new drc_OpenLayers.Geometry.Point( sr_x, sr_y );
                        var endPt     = new drc_OpenLayers.Geometry.Point( ix, iy );
                        var line      = new drc_OpenLayers.Geometry.LineString([startPt, endPt]);
                        var style     = {strokeColor:"#0040FF", strokeWidth:2};
                        var fea       = new drc_OpenLayers.Feature.Vector(line, {}, style);
                        drc_features.push(fea);
                   }
                    
                   var angles_int = [];
                   var angles_float = [];
                   var angles_sum = 0;
                    
                   for(var i=0; i<angles.length - 1; i++) {
                       
                       var ang = angles[i+1] - angles[i+0];
                       if (ang < 0) ang += 360.0;
                       if (ang < 0) ang += 360.0;
                       
                       if (ang < 135.0) {
                          ang = ang - 90.0;
                       }
                       else {
                          ang = ang - 180.0;
                       }
                    
                       angles_sum += parseInt(ang);
                       
                       angles_float.push( ang );
                       angles_int.push( parseInt(ang) );
                   }
            
                   if (angles_sum > 45) angles_sum -= 90;
                   if (angles_sum > 45) angles_sum -= 90;
                   if (angles_sum > 45) angles_sum -= 90;
                   if (angles_sum > 45) angles_sum -= 90;
                   if (angles_sum < -45) angles_sum += 90;
                   if (angles_sum < -45) angles_sum += 90;
                   if (angles_sum < -45) angles_sum += 90;
                   if (angles_sum < -45) angles_sum += 90;
            
                   if (angles_sum != 0) {
                       for(var i=0; i<angles_int.length; i++) {
                           var a = angles_int[i];
                           var af = angles_float[i] - angles_int[i];
                           if ( (a < 10 || a > 20) && (af < -0.5 || af > 0.5) )  {
                               angles_int[i] += -angles_sum;
                               break;
                           }
                       }
                   }

        
                   for(var i=0; i<angles.length - 1; i++) {
                       
                       var arad = (angles[i+0] + angles[i+1]) * 0.5 * Math.PI / 180.0;
                       var ex = sr_x + Math.cos (arad) * radius * 0.5;
                       var ey = sr_y + Math.sin (arad) * radius * 0.5;
                       
                       var angint = angles_int[i];
                       
                       var kolor = "#004000";
                       if (angint <= -15 || angint >= 15) kolor = "#FF0000";
                       
                       var pt = new OpenLayers.Geometry.Point(ex, ey);
                       drc_features.push(new OpenLayers.Feature.Vector( pt, {labelText: (angint + "°"), labelColor: kolor } ));
                   }
                }
                else {
                   for(var i=0; i<3; i++) {
                        var ix = nodes_x[i];
                        var iy = nodes_y[i];
                        var startPt   = new drc_OpenLayers.Geometry.Point( sr_x, sr_y );
                        var endPt     = new drc_OpenLayers.Geometry.Point( ix, iy );
                        var line      = new drc_OpenLayers.Geometry.LineString([startPt, endPt]);
                        var style     = {strokeColor:"#0040FF", strokeWidth:2};
                        var fea       = new drc_OpenLayers.Feature.Vector(line, {}, style);
                        drc_features.push(fea);
                   }               
                }
            
                var p1   = new drc_OpenLayers.Geometry.Point( nodes_x[0], nodes_y[0] );
                var p2   = new drc_OpenLayers.Geometry.Point( sr_x, sr_y );
                var line = new OpenLayers.Geometry.LineString([p1, p2]);
                var geo_radius = line.getGeodesicLength(new OpenLayers.Projection("EPSG:900913"));
            
                var diam = geo_radius * 2.0;
                var pt = new OpenLayers.Geometry.Point(sr_x, sr_y);
                drc_features.push(new OpenLayers.Feature.Vector( pt, {labelText: (diam.toFixed(0) + "m"), labelColor: "#000000" } ));
                
            }
        }

    }
        
    var layers = drc_wazeMap.getLayersBy("uniqueName","__DrawRoundaboutAngles");
    
    if(layers.length > 0) {
        var drc_layer = layers[0];
        drc_layer.removeAllFeatures();
       	drc_layer.addFeatures(drc_features);
    } else {

         var drc_style = new drc_OpenLayers.Style({
             	fillOpacity: 0.0,
             	strokeOpacity: 1.0,
                fillColor: "#FF40C0",
                strokeColor: "#0040FF",
                strokeWidth: 10,
                fontWeight: "bold",
                pointRadius: 0,
                label : "${labelText}",
                fontFamily: "Tahoma, Courier New",
                labelOutlineColor: "#FFFFFF",
                labelOutlineWidth: 4,
                fontColor: "${labelColor}",
                fontSize: "10px"
        });

        var drc_mapLayer = new drc_OpenLayers.Layer.Vector("Roundabout Angles", {
            displayInLayerSwitcher: true,
            uniqueName: "__DrawRoundaboutAngles",
            styleMap: new drc_OpenLayers.StyleMap(drc_style)
        });
        
        I18n.translations.en.layers.name["__DrawRoundaboutAngles"] = "Roundabout Angles";
        drc_wazeMap.addLayer(drc_mapLayer);
        drc_mapLayer.setVisibility(false);
    }
}
//---------------------------------------------------------------------------------------
bootstrapRoundaboutAngles();
