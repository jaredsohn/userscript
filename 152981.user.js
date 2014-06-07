// ==UserScript==
// @name                   Roundabout Angles
// @namespace              http://litux.org
// @description            Provides roundabout angles when a node is selected
// @include                https://*.waze.com/editor/*
// @include                https://*.waze.com/map-editor/*
// @include                https://descarte*.waze.com/beta/*
// @grant                  none
// @version                0.2-201301071100
// ==/UserScript==

// Waze: davipt
// email: bruno d ø t rodrigues @ t litux d ø t org

var raVersion = "v0.2-201301071100";
var raCtrl;

function raSelectionChanged() {
    if (!document.getElementById('node-edit-general')) return;
    if (!raCtrl) {
        raCtrl = document.createElement('section');
        raCtrl.id = 'roundaboutAngleCtrl';
        raCtrl.innerHTML = '';
        raCtrl.innerHTML += '<button id="raAngle" class="btn">Roundabout Angle</button>';
        raCtrl.innerHTML += '<button id="raJunction" class="btn">Roundabout Landmark</button>';
    }
    document.getElementById('node-edit-general').appendChild(raCtrl);
    document.getElementById('raJunction').onclick = raRoundaboutLandmark;
    document.getElementById('raAngle').onclick = raRoundaboutAngle;
}

function raRoundaboutLandmark() { raRoundabout(true); }
function raRoundaboutAngle() { raRoundabout(false); }

function raRoundabout(doLandmark) {
    try{

        //console.log("RA Selected items=" + selectionManager.selectedItems.length);
        // ignore unless one and only one selection
        if (selectionManager.selectedItems.length != 1) return;

        var selection = selectionManager.selectedItems[0];
        // ignore unless selection is valid
        if (selection == null) return;

        //console.log("RA Selected type=" + selection.type);
        // ignore unless selection is a node
        if (selection.type != "node") return;

        var attributes = selection.attributes;
        //console.log("RA Node attributes=" + JSON.stringify(attributes).replace(/,/g, ", "));
        // ignore unless there's attributes (just in case)
        if (attributes == null) return;

        var segIDs = attributes.segIDs;
        // ignore unless node has three and only three selections
        //console.log("RA Node segments=" + JSON.stringify(segIDs).replace(/,/g, ", "));
        if (segIDs == null || segIDs.length != 3) return;

        // ignore unless two segments are roundabouts and the third is not
        var rbtID;
        var countRoundaboutSegments = 0, countRoadSegments = 0;
        for (var i = 0; i < segIDs.length; i++) {
            var segment = wazeModel.segments.get(segIDs[i]);
            //console.log("RA Segment " + (Math.floor(i)+1) + " type=" + isRA + "/" + (isRA?"roundabout":"road") + " attributes=" + JSON.stringify(segment.attributes).replace(/,/g, ", "));
            if(segment.attributes.junctionID==null)
                countRoadSegments++;
            else {
                countRoundaboutSegments++;
                rbtID = segment.attributes.junctionID;
            }
        }
        //console.log("RA Segments road=" + countRoadSegments + " roundabout=" + countRoundaboutSegments);
        if(countRoundaboutSegments != 2 || countRoadSegments != 1) return;

        console.log("RA Node id=" + rbtID + " attributes=" + JSON.stringify(attributes).replace(/,/g, ", "));

        var rbtSegments = new Array();
        var rbtNodes = new Array();

        var seenSegments = new Array();
        var curSegIDs = segIDs;
        console.log("Start node=" + selection.id);
        for(var max=0; max<10; max++) {
            var curSegment = null;
            for(var i = 0; i < curSegIDs.length; i++) {
                var segment = wazeModel.segments.get(curSegIDs[i]);
                // skip non roundabout segments
                if(segment.attributes.junctionID==null) continue;
                // skip already seen segments
                if(seenSegments.indexOf(segment.id) >= 0) continue;
                seenSegments.push(segment.id);
                curSegment = segment;
                break;
            }
            if(curSegment == null) break;
            nextNode = wazeModel.nodes.get(segment.attributes.toNodeID);
            console.log("Segment id=" + segment.id + " nextNode=" + nextNode.id);

            rbtSegments.push(segment);
            rbtNodes.push(nextNode);
            curSegIDs = nextNode.attributes.segIDs;
        }
        console.log("Segments=" + rbtSegments.length+" Nodes="+rbtNodes.length);
        //selectionManager.select(rbtSegments);

        var polyPoints = new Array();
        for (var i = 0; i < rbtSegments.length; i++) {
            var segment = rbtSegments[i];
            var vertices = segment.geometry.getVertices();
            for (var j=0; j<vertices.length; j++) {
                var vertice = vertices[j];
                //console.log("Vertices " + i + "/" + j + " pos=" + vertice.x + "x" + vertice.y);
                polyPoints.push(vertice);
            }
        }

        var polygon = new OpenLayers.Geometry.Polygon(new OpenLayers.Geometry.LinearRing(polyPoints));
        // http://osgeo-org.1560.n6.nabble.com/getCentroid-method-influenced-by-floating-point-math-td3914487.html
        //var center = polygon.getCentroid();
        var center = new OpenLayers.Geometry.Point(polygon.getBounds().getCenterLonLat().lon,polygon.getBounds().getCenterLonLat().lat); 
        //console.log("Center " + center.x + "x" + center.y);

        var junction = polygon;

        polyPoints = new Array();

        var v = selection.geometry.getVertices()[0];
        //polyPoints.push(v);
        //polyPoints.push(center);
        var dx = center.x-v.x, dy = center.y-v.y;

        var p = new OpenLayers.Geometry.Point(center.x + dx, center.y + dy);
        var p180 = p.clone(); p180.rotate(+000+00, center);
        var p210 = p.clone(); p210.rotate(+000+30, center);
        var p150 = p.clone(); p150.rotate(+000-30, center);
        var p090 = p.clone(); p090.rotate(+090+00, center);
        var p060 = p.clone(); p060.rotate(+090-30, center);
        var p120 = p.clone(); p120.rotate(+090+30, center);
        var p270 = p.clone(); p270.rotate(-090+00, center);
        var p240 = p.clone(); p240.rotate(-090-30, center);
        var p300 = p.clone(); p300.rotate(-090+30, center);
        
        polyPoints.push(v);
        polyPoints.push(center);
        polyPoints.push(p060);
        polyPoints.push(p090);
        polyPoints.push(p120);
        polyPoints.push(center);
        polyPoints.push(p150);
        polyPoints.push(p180);
        polyPoints.push(p210);
        polyPoints.push(center);
        polyPoints.push(p240);
        polyPoints.push(p270);
        polyPoints.push(p300);
        polyPoints.push(center);


        if(doLandmark) {
            var landmark = new Waze.Feature.Vector.Landmark(junction);
            landmark.attributes.mtfcc = "W0003";
            var what = wazeModel.actionManager.add(new Waze.Action.AddLandmark(landmark));
        } else {
            var polygon = new OpenLayers.Geometry.Polygon(new OpenLayers.Geometry.LinearRing(polyPoints));
            var landmark = new Waze.Feature.Vector.Landmark(polygon);
            landmark.attributes.mtfcc = "W0200";
            var what = wazeModel.actionManager.add(new Waze.Action.AddLandmark(landmark));
        }
    } catch (e) {
        console.log("RA ERROR " + e);
    }
}

function ra_bootstrap() {
    var bGreasemonkeyServiceDefined = false;
    try {
        if (typeof Components.interfaces.gmIGreasemonkeyService === "object")
            bGreasemonkeyServiceDefined = true;
    }
    catch (err) {
        //Ignore.
    }
    if ( typeof unsafeWindow === "undefined"  ||  ! bGreasemonkeyServiceDefined) {
        unsafeWindow    = ( function () {
            var dummyElem   = document.createElement('p');
            dummyElem.setAttribute ('onclick', 'return window;');
            return dummyElem.onclick ();
        } ) ();
    }
    // begin running the code!
    setTimeout(ra_init, 1000); // need to wait for the waze models to appear.
}

function ra_init() {
    Waze = unsafeWindow.Waze;
    wazeModel = unsafeWindow.wazeModel;
    OpenLayers = unsafeWindow.OpenLayers;
    selectionManager = unsafeWindow.selectionManager;
    selectionManager.events.register("selectionchanged", null, raSelectionChanged);
}

// then at the end of your script, call the bootstrap to get things started
ra_bootstrap();

