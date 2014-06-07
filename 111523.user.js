// ==UserScript==
// @name          Yet Another Armagetron Advanced Map Previewer
// @author        wrtlprnft
// @namespace     http://userscripts.org/users/119783
// @description	  Turns an armagetron advanced map into an SVG for viewing
// ==/UserScript==
window.addEventListener('load', function(){
if(!document.documentElement || document.documentElement.tagName != 'Resource' || !(!document.documentElement.getAttribute('type') || document.documentElement.getAttribute('type') == 'aamap')) {
	return;
}

// This code was written by Tyler Akins and has been placed in the
// public domain.  It would be nice if you left this header intact.
// Base64 code from Tyler Akins -- http://rumkin.com

var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function encode64(input) {
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   do {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
         enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
         enc4 = 64;
      }

      output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + 
         keyStr.charAt(enc3) + keyStr.charAt(enc4);
   } while (i < input.length);
   
   return output;
}

// end of code by Tyler Akins

var margin = 5;
var stroke = 2;
var arrow = 'M -5,0 -5,20 -15,20 0,40 15,20 5,20 5,0 Z';

var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
//var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
//circle.setAttribute('r', '50');
//circle.setAttribute('cx', '50');
//circle.setAttribute('cy', '50');
//circle.setAttribute('stroke', 'red');
//circle.setAttribute('stroke-width', '1');
//svg.appendChild(circle);

var minx = 10000;
var maxx = -10000;
var miny = 10000;
var maxy = -10000;

var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
var marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
marker.setAttribute('id', 'spawn');
marker.setAttribute('markerWidth', '30');
marker.setAttribute('markerHeight', '40');
marker.setAttribute('refX', '2');
marker.setAttribute('refY', '15');
marker.setAttribute('orient', 'auto');
marker.setAttribute('viewBox', '0 0 40 30');
var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
path.setAttribute('d', arrow);
path.setAttribute('fill', 'red');
path.setAttribute('transform', 'translate(0,15) rotate(-90)');
marker.appendChild(path);
defs.appendChild(marker);
svg.appendChild(defs);

var walls = document.getElementsByTagName('Wall');
for(var i = walls.length - 1; i >= 0; --i) {
	var str = '';
	var points = walls[i].getElementsByTagName('Point');
	for(var j = points.length - 1; j >= 0; --j) {
		var x = parseFloat(points[j].getAttribute('x'));
		var y = -parseFloat(points[j].getAttribute('y'));
		str += x + ',' + y + ' ';
		if(minx > x) minx = x;
		if(maxx < x) maxx = x;
		if(miny > y) miny = y;
		if(maxy < y) maxy = y;
	}
	var polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
	polyline.setAttribute('points', str);
	polyline.setAttribute('stroke', 'black');
	polyline.setAttribute('stroke-width', stroke);
	polyline.setAttribute('fill', 'none');
	svg.appendChild(polyline);
}

var zones = document.getElementsByTagName('Zone');
for(var i = zones.length - 1; i >= 0; --i) {
	var zone = zones[i];
	var color = '#ffa500';
	var alpha = 1;
	var effect = zone.getAttribute('effect');
	if(effect && effect == 'win') {
		color = 'lime'
	} else if(effect && effect == 'death') {
		color = 'red'
	} else if(effect && effect == 'flag') {
		color = '#008'
	} else if(effect && effect == 'ball') {
		color = 'brown'
	}

	var shape = zone.getElementsByTagName('ShapeCircle')[0];
	if(!shape) shape = zone.getElementsByTagName('ShapePolygon')[0];
	if(!shape) continue;
	var point = shape.getElementsByTagName('Point')[0];
	if(!point) continue;

	var colorEl = shape.getElementsByTagName('Color')[0];
	if(colorEl) {
		if(colorEl.getAttribute('hexCode')) {
			color = "#" + colorEl.getAttribute('hexCode').substr(2);
		} else {
			color = 'rgb(' + parseFloat(colorEl.getAttribute('red'))*100 + '%, ' + parseFloat(colorEl.getAttribute('green'))*100 + '%, ' + parseFloat(colorEl.getAttribute('blue'))*100 + '%)';
		}
		if(colorEl.hasAttribute('alpha')) {
			alpha = colorEl.getAttribute('alpha');
		}
	}

	if(shape.tagName == 'ShapePolygon') {
		var points = shape.getElementsByTagName('Point');
		if(points.length <= 2) continue;
		var basex = parseFloat(points[0].getAttribute('x'));
		var basey = -parseFloat(points[0].getAttribute('y'));
		var scale = parseFloat(shape.getAttribute('scale'));
		if(!scale) scale = 1;
		var str = '';
		for(var j = points.length - 1; j > 0; --j) {
			var x = parseFloat(points[j].getAttribute('x'));
			var y = -parseFloat(points[j].getAttribute('y'));
			str += (x*scale+basex)+ ',' + (y*scale+basey) + ' ';
		}
		var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
		polygon.setAttribute('points', str);
		polygon.setAttribute('stroke', color);
		polygon.setAttribute('opacity', alpha);
		polygon.setAttribute('stroke-width', stroke);
		polygon.setAttribute('fill', 'none');
		svg.appendChild(polygon);
	} else {
		var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
		var radius = shape.getAttribute('radius');
		if(!radius) radius = shape.getAttribute('scale');
		circle.setAttribute('r', radius);
		circle.setAttribute('cx', parseFloat(point.getAttribute('x')));
		circle.setAttribute('cy', -parseFloat(point.getAttribute('y')));
		circle.setAttribute('stroke', color);
		circle.setAttribute('opacity', alpha);
		circle.setAttribute('stroke-width', stroke);
		circle.setAttribute('fill', 'none');
		svg.appendChild(circle);
	}
}

var spawns = document.getElementsByTagName('Spawn');
for(var i = spawns.length - 1; i >= 0; --i) {
	var spawn = spawns[i];
	var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	path.setAttribute('marker-end', 'url(#spawn)');
	path.setAttribute('stroke-width', '.5');
	path.setAttribute('stroke', 'red');
	path.setAttribute('d', 'M 0 0 0 1');

	var transform = 'translate(' + spawn.getAttribute('x') + ',' + -parseFloat(spawn.getAttribute('y')) + ')';
	transform += ' scale(1 -1) rotate(-90)';
	if(spawn.getAttribute('angle')) {
		transform += ' rotate(' + spawn.getAttribute('angle') + ')';
	} else {
		var xdir = parseFloat(spawn.getAttribute('xdir'));
		var ydir = parseFloat(spawn.getAttribute('ydir'));

		var l = Math.sqrt(xdir*xdir + ydir*ydir);
		transform += ' matrix(' + (xdir/l) + ',' + (ydir/l) + ',' + (-ydir/l) + ',' + (xdir/l) + ',0,0)';
	}
	path.setAttribute('transform', transform);
	svg.appendChild(path);
}

svg.setAttribute('viewBox', (minx - margin) + ',' + (miny-margin) + ',' + (maxx-minx+2*margin) + ',' + (maxy-miny+2*margin));
svg.setAttribute('width', window.innerWidth + 'px');
svg.setAttribute('height', window.innerHeight - 5 + 'px');

var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
rect.setAttribute('x', minx-margin);
rect.setAttribute('y', miny-margin);
rect.setAttribute('width', maxx - minx + 2*margin);
rect.setAttribute('height', maxy - miny + 2*margin);
rect.setAttribute('fill', 'white');
svg.insertBefore(rect, svg.getElementsByTagName('defs')[0].nextSibling);

document.documentElement.replaceChild(svg, document.getElementsByTagName('Map')[0]);

window.addEventListener('resize', function(){
	svg.setAttribute('width', window.innerWidth + 'px');
	svg.setAttribute('height', window.innerHeight - 5 + 'px');
}, false);

svg.addEventListener('click', function(){
	if(!confirm("Really convert this SVG to a data: URL for saving (may take some time)")) {
		return false;
	}
	var serializer = new XMLSerializer();
	var str = serializer.serializeToString(this);
	window.location.href = 'data:image/svg+xml;base64,' + encode64('<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11-basic.dtd">' + str);
}, false);
}, false);
