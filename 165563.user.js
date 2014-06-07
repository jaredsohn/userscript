// ==UserScript==
// @id             iitc-plugin-player-tracker@breunigs
// @name           IITC Plugin: Player tracker
// @version        0.9.2.20130424.020135
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      https://secure.jonatkins.com/iitc/release/plugins/player-tracker.meta.js
// @downloadURL    https://secure.jonatkins.com/iitc/release/plugins/player-tracker.user.js
// @description    [jonatkins-2013-04-24-020135] Draws trails for the path a user went onto the map. Only draws the last hour. Does not request chat data on its own, even if that would be useful.
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// ==/UserScript==

function wrapper() {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};


// PLUGIN START ////////////////////////////////////////////////////////
window.PLAYER_TRACKER_MAX_TIME = 3*60*60*1000; // in milliseconds
window.PLAYER_TRACKER_MIN_ZOOM = 9;

window.PLAYER_TRACKER_LINE_COLOUR = '#FF00FD';


// use own namespace for plugin
window.plugin.playerTracker = function() {};

window.plugin.playerTracker.setup = function() {
  try { console.log('Loading OverlappingMarkerSpiderfier JS now'); } catch(e) {}
  (function(){/*
 OverlappingMarkerSpiderfier
https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet
Copyright (c) 2011 - 2012 George MacKerron
Released under the MIT licence: http://opensource.org/licenses/mit-license
Note: The Leaflet maps API must be included *before* this code
*/
(function(){var n={}.hasOwnProperty,o=[].slice;null!=this.L&&(this.OverlappingMarkerSpiderfier=function(){function l(c,b){var a,e,g,f,d=this;this.map=c;null==b&&(b={});for(a in b)n.call(b,a)&&(e=b[a],this[a]=e);this.initMarkerArrays();this.listeners={};f=["click","zoomend"];e=0;for(g=f.length;e<g;e++)a=f[e],this.map.addEventListener(a,function(){return d.unspiderfy()})}var d,i;d=l.prototype;d.VERSION="0.2.5";i=2*Math.PI;d.keepSpiderfied=!1;d.nearbyDistance=20;d.circleSpiralSwitchover=9;d.circleFootSeparation=
25;d.circleStartAngle=i/12;d.spiralFootSeparation=28;d.spiralLengthStart=11;d.spiralLengthFactor=5;d.legWeight=1.5;d.legColors={usual:"#222",highlighted:"#f00"};d.initMarkerArrays=function(){this.markers=[];return this.markerListeners=[]};d.addMarker=function(c){var b,a=this;if(null!=c._oms)return this;c._oms=!0;b=function(){return a.spiderListener(c)};c.addEventListener("click",b);this.markerListeners.push(b);this.markers.push(c);return this};d.getMarkers=function(){return this.markers.slice(0)};
d.removeMarker=function(c){var b,a;null!=c._omsData&&this.unspiderfy();b=this.arrIndexOf(this.markers,c);if(0>b)return this;a=this.markerListeners.splice(b,1)[0];c.removeEventListener("click",a);delete c._oms;this.markers.splice(b,1);return this};d.clearMarkers=function(){var c,b,a,e,g;this.unspiderfy();g=this.markers;c=a=0;for(e=g.length;a<e;c=++a)b=g[c],c=this.markerListeners[c],b.removeEventListener("click",c),delete b._oms;this.initMarkerArrays();return this};d.addListener=function(c,b){var a,
e;(null!=(e=(a=this.listeners)[c])?e:a[c]=[]).push(b);return this};d.removeListener=function(c,b){var a;a=this.arrIndexOf(this.listeners[c],b);0>a||this.listeners[c].splice(a,1);return this};d.clearListeners=function(c){this.listeners[c]=[];return this};d.trigger=function(){var c,b,a,e,g,f;b=arguments[0];c=2<=arguments.length?o.call(arguments,1):[];b=null!=(a=this.listeners[b])?a:[];f=[];e=0;for(g=b.length;e<g;e++)a=b[e],f.push(a.apply(null,c));return f};d.generatePtsCircle=function(c,b){var a,e,
g,f,d;g=this.circleFootSeparation*(2+c)/i;e=i/c;d=[];for(a=f=0;0<=c?f<c:f>c;a=0<=c?++f:--f)a=this.circleStartAngle+a*e,d.push(new L.Point(b.x+g*Math.cos(a),b.y+g*Math.sin(a)));return d};d.generatePtsSpiral=function(c,b){var a,e,g,f,d;g=this.spiralLengthStart;a=0;d=[];for(e=f=0;0<=c?f<c:f>c;e=0<=c?++f:--f)a+=this.spiralFootSeparation/g+5.0E-4*e,e=new L.Point(b.x+g*Math.cos(a),b.y+g*Math.sin(a)),g+=i*this.spiralLengthFactor/a,d.push(e);return d};d.spiderListener=function(c){var b,a,e,g,f,d,h,i,j;b=
null!=c._omsData;(!b||!this.keepSpiderfied)&&this.unspiderfy();if(b)return this.trigger("click",c);g=[];f=[];d=this.nearbyDistance*this.nearbyDistance;e=this.map.latLngToLayerPoint(c.getLatLng());j=this.markers;h=0;for(i=j.length;h<i;h++)b=j[h],a=this.map.latLngToLayerPoint(b.getLatLng()),this.ptDistanceSq(a,e)<d?g.push({marker:b,markerPt:a}):f.push(b);return 1===g.length?this.trigger("click",c):this.spiderfy(g,f)};d.makeHighlightListeners=function(c){var b=this;return{highlight:function(){return c._omsData.leg.setStyle({color:b.legColors.highlighted})},
unhighlight:function(){return c._omsData.leg.setStyle({color:b.legColors.usual})}}};d.spiderfy=function(c,b){var a,e,g,d,m,h,i,j,l,k;this.spiderfying=!0;k=c.length;a=this.ptAverage(function(){var a,b,e;e=[];a=0;for(b=c.length;a<b;a++)i=c[a],e.push(i.markerPt);return e}());d=k>=this.circleSpiralSwitchover?this.generatePtsSpiral(k,a).reverse():this.generatePtsCircle(k,a);a=function(){var a,b,i,k=this;i=[];a=0;for(b=d.length;a<b;a++)g=d[a],e=this.map.layerPointToLatLng(g),l=this.minExtract(c,function(a){return k.ptDistanceSq(a.markerPt,
g)}),h=l.marker,m=new L.Polyline([h.getLatLng(),e],{color:this.legColors.usual,weight:this.legWeight,clickable:!1}),this.map.addLayer(m),h._omsData={usualPosition:h.getLatLng(),leg:m},this.legColors.highlighted!==this.legColors.usual&&(j=this.makeHighlightListeners(h),h._omsData.highlightListeners=j,h.addEventListener("mouseover",j.highlight),h.addEventListener("mouseout",j.unhighlight)),h.setLatLng(e),h.setZIndexOffset(1E6),i.push(h);return i}.call(this);delete this.spiderfying;this.spiderfied=!0;
return this.trigger("spiderfy",a,b)};d.unspiderfy=function(c){var b,a,e,d,f,i,h;null==c&&(c=null);if(null==this.spiderfied)return this;this.unspiderfying=!0;d=[];e=[];h=this.markers;f=0;for(i=h.length;f<i;f++)b=h[f],null!=b._omsData?(this.map.removeLayer(b._omsData.leg),b!==c&&b.setLatLng(b._omsData.usualPosition),b.setZIndexOffset(0),a=b._omsData.highlightListeners,null!=a&&(b.removeEventListener("mouseover",a.highlight),b.removeEventListener("mouseout",a.unhighlight)),delete b._omsData,d.push(b)):
e.push(b);delete this.unspiderfying;delete this.spiderfied;this.trigger("unspiderfy",d,e);return this};d.ptDistanceSq=function(c,b){var a,e;a=c.x-b.x;e=c.y-b.y;return a*a+e*e};d.ptAverage=function(c){var b,a,e,d,f;d=a=e=0;for(f=c.length;d<f;d++)b=c[d],a+=b.x,e+=b.y;c=c.length;return new L.Point(a/c,e/c)};d.minExtract=function(c,b){var a,d,g,f,i,h;g=i=0;for(h=c.length;i<h;g=++i)if(f=c[g],f=b(f),!("undefined"!==typeof a&&null!==a)||f<d)d=f,a=g;return c.splice(a,1)[0]};d.arrIndexOf=function(c,b){var a,
d,g,f;if(null!=c.indexOf)return c.indexOf(b);a=g=0;for(f=c.length;g<f;a=++g)if(d=c[a],d===b)return a;return-1};return l}())}).call(this);}).call(this);
/* Sun 6 May 2012 17:49:10 BST */

  try { console.log('done loading OverlappingMarkerSpiderfier JS'); } catch(e) {}

  var iconEnlImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAo1SURBVHjanJR5UJNnHscfp7ud7mxnt7u2M+3O9pruzPZ9k5CTHCQByRtCwpWDkIQr5BDU1a7Fiq0V3ogXiCBauVGQQ0AOkUMIoVLvWl1t3e1qW+tVtdt2tVKsMqXW7/4R1OqI2n1nPvPMvL/n9/vM87zzfckL8unkT8I/EPmcV4i1XkLMVSJiqhQRY6WAuJoY4ns3i8RV8mhztchirhFlm6qEBaYq4cKk+lBrepuab64SEUutmCRUCIh7WySxN8pJwgYBMZYJiaVWTCw1YkKmkpgqhcRRFybJbI0pSKjmf2jdFPq9vVF2I6VVAUeT/KekOuk1y0bxcVOlsMRcIw77fyQvGSuENZaNoh/S25WYO2zAwn0WLNpvxaIDiVi034qF+yyY924MPN0zYK2T3IjbELLZ1TnjL48kMVWKwhMqhKfT29V4fXcCcg5aMH9fLObs0iJrJBKZIzOQNRKJ2bsYzN8bg5yDFmTvMcLZoYapSnTeVCWKNpYL75Y8L5tOnuM/ReRzXiGJmyRmU6VwLHMHg5yDFszbrYd3OByegBplHy1B2UdL4A2EwxsIvvME1PAOh2PurmjkHLQga0ALY6XwekKZMOUuycvqZ8jzsulE/rdXpOZa0eiswSgsOJCAzOEIuAdV8PjV8PjV2HmuC+M/XkPpkYXwDqnhGVLfrrkHlZg5HIEF+xMwZygaxnLB98ZyocpSIyaWWjEh+kIe0Rfyfhe7NuS4uycC2Qfi4RlS3xEMBhk83QIAuImbaDm+Dp5B1e1aUKSCZ0iN7ANx8PTMQPw7gs/i1wt+H1vMJySuVEBi1/KXJNVLkb0/HjMDEXDtUME9oA6yI7jekpwePY4bN39E48fFcA/c2ecaUMG1QwXvUDhe3x8Pe4MM0QVc9iXVM4TElvCfiS0J+XqWX4s5I1o4e8KQ0auEq191F/5TbQCA7GEz6o4V4sOv9sHVr0RGvxIZfUpk9AZx9oRh9giD2QEtDEUh/w31vvwsiSkKSbNUSzBvrx6uPhWc25Vw9iiR0TPZ2KdCRp8KQ6e3AgAW7bQja0CL1/xxyNzBYNe5HuTstMPZEwZnT7DX1afCa3v1sNRKEFfKdxJ9AbcprV2J2e9pkdqlQNq2MKR3hwVlk0JnjxJdJ2oBAL2fNcDbGwnndiXKD7MAgAtjZ5DtT0R6dxjStoUhtUuB2SNapLWroC/kNRN9Ifegpy8cXn8EUtrlSO1UIK0rDOnbJukOg7dXg+whC3KG7WDf82DeQBzSu1W4MHYG/s+3ovmf63Bu9CRKDuQgtVOBlA45vP4IuPvCoS/kHSL61byz3sEIuPrVSOlQILUzSFqnAit3zcXhC7twZfwSrk1cxcWxMxg+1YW8EQ/SusLQe6IRR77cg/qjawAARy7umZQo4O5XwzsYAf1q3jmiX8276PVHIKNXCUeLDMltcszarseeswO49Vy69hXOXPkEX109j5s3fwIA7DrTB1fXDKzbvxinvj2BzUeLkdUdjeQ2ORytMmT0KuH1R0C/mneRRK/kHsroCX7cxQNO9J/YgtHxywCA/hNb8Ea/DeltKqS0KZC6NQx/7zOj9Vg5rk98j2+vf4OaQ6uQ2qpAcqscya0yOFpksDdLkdGngnO7CtEruYeJbhmnzdEih9uvRmZHNDYdKoL/03bk+t1IbpEjuy8Js7oMcLap4e7Q4C2/E2/7XZi33Yi6w2uwft8SOFrkcDQHhzu2yGBvksLtV8PRIoNuGaeTGFbz5hnLhPAEwuFolsLeFMTRLIOjWYbi3Yvw0cX3ce7KSZy6fBzvnuzGwr4UOLbIscTvwenLn6DjWA3SWlQ/65XCGwiHsUyImDUh80nUMi4VvYo34epXIbVdAVvjHZG9SQZHkwzuNg3e6E2Gu00LR5McjiY5FvTYcPnaN6h+fyUOnB3GgbMBeLYysDVKkdqhgKtfhehVvAndCi6HROVzpjEsHbA1SJHRr4J1cyiSJrE1SGFvkMHeIENasxqNh9dj/5kAGg6XImurHhe/O4eWI+X4x/m9qPugGEmbQ2GtD4VrhwpJm6VgWNqvW86dRnTLuITx0cmGIl6w2CCFtS70DvWhsNXJMLfdiIkbP2Dnpz3wtETBVi8DO5AVDOi/mmGtC0VinQS2Rincg2oYinjQsHQis5QmRJNHEU0e9aQmjzqV3CZHaocC5hoxLLV3SKyVYHZrPMbGr+DtXjestaFIrJUgZbMa/uMdcDUxsNSKYa4RI61LgeRWGTR51AmGpZ5gWIoQhqUJw9IkMpfKj1svQEafMji85m6yWmIxNj6KJb1eWGrE8DTrkFgbitR6dXBPtRiJmyTI6FMibi0fmjzqTW0+h2jzOYRE5XNu8SLD0peT2+RwtMhgqhLBXC2+TeaWoOTtHi/M1WJ0Ht2EWS3xt+umKhFSJnsZlvoP46OfZXw0YXw0Ibrl3NtE5lEFsWv5SO8Og7laBFOFCKbKIJlNMRgbH8Xibg9MlSIEjm/D+hE2WK8QwVIjhnN7GGJKQqBh6dxbp9Dmcwi5ZZvkOQ1Lf21vlsLeLEVCuRDGiiAzGw0YGx/Fm9tcMFYIcfKbf2PFwHwYK4RIKBfCPpkxhqXPa/M5Tz9IQiLzKDamOARpXQqYKoUwlgWZ2WDAd+NXsGBrMtYGluDL0S+QUhsMnKlShLROBQxrQqDJoxf+XHBfCeOjn2ZY6oKtUQpbYyhiS/iIKxXAvVGPS1e/RtsHNRgbH8W6gA9xpQLElvBhawzmSsNSpxkf/dS9M8m9Vm0+h2hYOsewJgQp7XLErxcgppgPZ3UUro5/BwA4+Pl7iC3hI6aYj/j1AqRslUO/mgfGR7+mW8Yl93K/kxDGRz+lYanT1k0SWOskMKwOQXqlFtcnrmHixg+YuzkJMWtCYCgKCYZwowSaPOpTTS71pCaXIvcylYRoWHquvpAHxxYp4kr5SK+Mwo2fbqDvaBsMRUFB3DoB7FukiC7gITKXyryfQJNLEaJbwZ2K3zIs9Ym5Oph6V2UMvrh0Cq4qA/SFPEQX8JBYK4a5SgwNS33M+KjfMD6K3A8yVYHxUUTDUt7oVVzYGkKRUhGJ5duybwtiSviwNYRCt4ILbT7HqSvgEd2q+0O0SzlTk895QpNHHTNOhk23iovoAh50q7iw1IhhLBciMo86qsmlHp/8B94XMtU9/owU3QourPUSGIpCoFvOQcyaEFjrJIhawQXjo23apTR5EORhG7RL6V8zLH04YYMQpgoRdMs5MFWIEP+OAIyPPhi/QfCrhDIBeRAkYYPggRjLBURfyDNH5XNgrhYjtoQPc7UYUcs5iHjrVWPEm38lD4NEr+Q9nBXcxzQsvTd2LR/WTRLElfIxY/Gru19SPv3Yn0P/SJ6XPphHuS6iXUoThqUMUcs4MJWLELWcg8hcSi9Me5HwU14ggodAGJZ6NHzUNMZHD0ct44Dx0QHGR0+LmjpjdzFl4qdAy7D0BOOjtb+k75dKHmd89MzJ9ZH7/jcAhElqPD31+5YAAAAASUVORK5CYII=';
  var iconEnlRetImage = 'data:image/png;base64,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';
  var iconResImage = 'data:image/png;base64,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';
  var iconResRetImage = 'data:image/png;base64,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';

  plugin.playerTracker.iconEnl = L.Icon.Default.extend({options: {
    iconUrl: iconEnlImage,
    iconRetinaUrl: iconEnlRetImage
  }});
  plugin.playerTracker.iconRes = L.Icon.Default.extend({options: {
    iconUrl: iconResImage,
    iconRetinaUrl: iconResRetImage
  }});

  plugin.playerTracker.drawnTraces = new L.LayerGroup();
  window.layerChooser.addOverlay(plugin.playerTracker.drawnTraces, 'Player Tracker');
  map.addLayer(plugin.playerTracker.drawnTraces);
  plugin.playerTracker.oms = new OverlappingMarkerSpiderfier(map);
  plugin.playerTracker.oms.legColors = {'usual': '#FFFF00', 'highlighted': '#FF0000'};
  plugin.playerTracker.oms.legWeight = 3.5;
  plugin.playerTracker.oms.addListener('click', function(player) {
    window.renderPortalDetails(player.options.referenceToPortal);
  });

  addHook('publicChatDataAvailable', window.plugin.playerTracker.handleData);

  window.map.on('zoomend', function() {
    window.plugin.playerTracker.zoomListener();
  });
  window.plugin.playerTracker.zoomListener();
  
  plugin.playerTracker.setupUserSearch();
}

window.plugin.playerTracker.stored = {};

window.plugin.playerTracker.zoomListener = function() {
  var ctrl = $('.leaflet-control-layers-selector + span:contains("Player Tracker")').parent();
  if(window.map.getZoom() < window.PLAYER_TRACKER_MIN_ZOOM) {
    window.plugin.playerTracker.drawnTraces.clearLayers();
    ctrl.addClass('disabled').attr('title', 'Zoom in to show those.');
  } else {
    ctrl.removeClass('disabled').attr('title', '');
  }
}

window.plugin.playerTracker.getLimit = function() {
 return new Date().getTime() - window.PLAYER_TRACKER_MAX_TIME;
}

window.plugin.playerTracker.discardOldData = function() {
  var limit = plugin.playerTracker.getLimit();
  $.each(plugin.playerTracker.stored, function(pguid, player) {
    var i;
    var ev = player.events;
    for(i = 0; i < ev.length; i++) {
      if(ev[i].time >= limit) break;
    }
    if(i === 0) return true;
    if(i === ev.length) return delete plugin.playerTracker.stored[pguid];
    plugin.playerTracker.stored[pguid].events.splice(0, i);
  });
}

window.plugin.playerTracker.eventHasLatLng = function(ev, lat, lng) {
  var hasLatLng = false;
  $.each(ev.latlngs, function(ind, ll) {
    if(ll[0] === lat && ll[1] === lng) {
      hasLatLng = true;
      return false;
    }
  });
  return hasLatLng;
}

window.plugin.playerTracker.processNewData = function(data) {
  var limit = plugin.playerTracker.getLimit();
  $.each(data.raw.result, function(ind, json) {
    // skip old data
    if(json[1] < limit) return true;

    // find player and portal information
    var pguid, lat, lng, guid, name, address;
    var skipThisMessage = false;
    $.each(json[2].plext.markup, function(ind, markup) {
      switch(markup[0]) {
      case 'TEXT':
        // Destroy link and field messages depend on where the link or
        // field was originally created. Therefore it’s not clear which
        // portal the player is at, so ignore it.
        if(markup[1].plain.indexOf('destroyed the Link') !== -1
          || markup[1].plain.indexOf('destroyed a Control Field') !== -1
          || markup[1].plain.indexOf('Your Link') !== -1) {
          skipThisMessage = true;
          return false;
        }
        break;
      case 'PLAYER':
        pguid = markup[1].guid;
        break;
      case 'PORTAL':
        // link messages are “player linked X to Y” and the player is at
        // X.
        lat = lat ? lat : markup[1].latE6/1E6;
        lng = lng ? lng : markup[1].lngE6/1E6;
        guid = guid ? guid : markup[1].guid;
        name = name ? name : markup[1].name;
        address = address ? address : markup[1].address;
        break;
      }
    });

    // skip unusable events
    if(!pguid || !lat || !lng || !guid || skipThisMessage) return true;

    var newEvent = {
      latlngs: [[lat, lng]],
      guids: [guid],
      time: json[1],
      name: name,
      address: address
    };

    var playerData = window.plugin.playerTracker.stored[pguid];

    // short-path if this is a new player
    if(!playerData || playerData.events.length === 0) {
      plugin.playerTracker.stored[pguid] = {
         // this always resolves, as the chat delivers this data
        nick: window.getPlayerName(pguid),
        team: json[2].plext.team,
        events: [newEvent]
      };
      return true;
    }

    var evts = playerData.events;
    // there’s some data already. Need to find correct place to insert.
    var i;
    for(i = 0; i < evts.length; i++) {
      if(evts[i].time > json[1]) break;
    }

    var cmp = Math.max(i-1, 0);

    // so we have an event that happened at the same time. Most likely
    // this is multiple resos destroyed at the same time.
    if(evts[cmp].time === json[1]) {
      evts[cmp].latlngs.push([lat, lng]);
      evts[cmp].guids.push(guid);
      plugin.playerTracker.stored[pguid].events = evts;
      return true;
    }

    // the time changed. Is the player still at the same location?

    // assume this is an older event at the same location. Then we need
    // to look at the next item in the event list. If this event is the
    // newest one, there may not be a newer event so check for that. If
    // it really is an older event at the same location, then skip it.
    if(evts[cmp+1] && plugin.playerTracker.eventHasLatLng(evts[cmp+1], lat, lng))
      return true;

    // if this event is newer, need to look at the previous one
    var sameLocation = plugin.playerTracker.eventHasLatLng(evts[cmp], lat, lng);

    // if it’s the same location, just update the timestamp. Otherwise
    // push as new event.
    if(sameLocation) {
      evts[cmp].time = json[1];
    } else {
      evts.splice(i, 0,  newEvent);
    }

    // update player data
    plugin.playerTracker.stored[pguid].events = evts;
  });
}

window.plugin.playerTracker.getLatLngFromEvent = function(ev) {
  var lats = 0;
  var lngs = 0;
  $.each(ev.latlngs, function() {
    lats += this[0];
    lngs += this[1];
  });

  return L.latLng(lats / ev.latlngs.length, lngs / ev.latlngs.length);
}

window.plugin.playerTracker.ago = function(time, now) {
  var s = (now-time) / 1000;
  var h = Math.floor(s / 3600);
  var m = Math.floor((s % 3600) / 60);
  var returnVal = m + 'm';
  if(h > 0) {
    returnVal = h + 'h' + returnVal;
  }
  return returnVal;
}

window.plugin.playerTracker.drawData = function() {
  var gllfe = plugin.playerTracker.getLatLngFromEvent;
  var layer = plugin.playerTracker.drawnTraces;

  var polyLineByAge = [[], [], [], []];
  var split = PLAYER_TRACKER_MAX_TIME / 4;
  var now = new Date().getTime();
  $.each(plugin.playerTracker.stored, function(pguid, playerData) {
    if(!playerData || playerData.events.length === 0) {
      console.warn('broken player data for pguid=' + pguid);
      return true;
    }

    // gather line data and put them in buckets so we can color them by
    // their age
    var playerLine = [];
    for(var i = 1; i < playerData.events.length; i++) {
      var p = playerData.events[i];
      var ageBucket = Math.min(parseInt((now - p.time) / split), 4-1);
      var line = [gllfe(p), gllfe(playerData.events[i-1])];
      polyLineByAge[ageBucket].push(line);
    }

    // tooltip for marker
    var evtsLength = playerData.events.length;
    var last = playerData.events[evtsLength-1];
    var ago = plugin.playerTracker.ago;
    var cssClass = playerData.team === 'ALIENS' ? 'enl' : 'res';
    var title = '<span class="nickname '+ cssClass+'" style="font-weight:bold;">' + playerData.nick + '</span>';
    
    if(window.plugin.guessPlayerLevels !== undefined &&
       window.plugin.guessPlayerLevels.fetchLevelByPlayer !== undefined) {
      var playerLevel = window.plugin.guessPlayerLevels.fetchLevelByPlayer(pguid);
      if(playerLevel !== undefined) {
        title += '<span style="font-weight:bold;margin-left:10px;">Level '
          + playerLevel
          + (playerLevel < (window.MAX_XM_PER_LEVEL.length - 1) ? ' (guessed)' : '')
          + '</span>';
      } else {
        title += '<span style="font-weight:bold;margin-left:10px;">Level unknown</span>'
      }
    }
    
    title += '\n'
        + ago(last.time, now) + ' ago\n'
        + window.chat.getChatPortalName(last);
    // show previous data in tooltip
    var minsAgo = '\t<span style="white-space: nowrap;"> ago</span>\t';
    if(evtsLength >= 2)
      title += '\n&nbsp;\nprevious locations:\n';
    for(var i = evtsLength - 2; i >= 0 && i >= evtsLength - 10; i--) {
      var ev = playerData.events[i];
      title += ago(ev.time, now) + minsAgo + window.chat.getChatPortalName(ev) + '\n';
    }

    // calculate the closest portal to the player
    var eventPortal = []
    var closestPortal;
    var mostPortals = 0;
    $.each(last.guids, function() {
      if(eventPortal[this]) {
        eventPortal[this]++;
      } else {
        eventPortal[this] = 1;
      }
      if(eventPortal[this] > mostPortals) {
        mostPortals = eventPortal[this];
        closestPortal = this;
      }
    });

    // marker itself
    var icon = playerData.team === 'ALIENS' ?  new plugin.playerTracker.iconEnl() :  new plugin.playerTracker.iconRes();
    var m = L.marker(gllfe(last), {title: title, icon: icon, referenceToPortal: closestPortal});
    // ensure tooltips are closed, sometimes they linger
    m.on('mouseout', function() { $(this._icon).tooltip('close'); });
    m.addTo(layer);
    plugin.playerTracker.oms.addMarker(m);
    // jQueryUI doesn’t automatically notice the new markers
    window.setupTooltips($(m._icon));
  });

  // draw the poly lines to the map
  $.each(polyLineByAge, function(i, polyLine) {
    if(polyLine.length === 0) return true;

    var opts = {
      weight: 2-0.25*i,
      color: PLAYER_TRACKER_LINE_COLOUR,
      clickable: false,
      opacity: 1-0.2*i,
      dashArray: "5,8"
    };

    L.multiPolyline(polyLine, opts).addTo(layer);
  });
}

window.plugin.playerTracker.handleData = function(data) {
  if(window.map.getZoom() < window.PLAYER_TRACKER_MIN_ZOOM) return;

  plugin.playerTracker.discardOldData();
  plugin.playerTracker.processNewData(data);
  // remove old popups
  plugin.playerTracker.drawnTraces.eachLayer(function(layer) {
    if(layer._icon) $(layer._icon).tooltip('destroy');
  });
  plugin.playerTracker.oms.clearMarkers();
  plugin.playerTracker.drawnTraces.clearLayers();
  plugin.playerTracker.drawData();
}

window.plugin.playerTracker.findUserPosition = function(nick) {
  nick = nick.toLowerCase();
  var foundPlayerData = undefined;
  $.each(plugin.playerTracker.stored, function(pguid, playerData) {
    if (playerData.nick.toLowerCase() === nick) {
      foundPlayerData = playerData;
      return false;
    }
  });
  
  if (!foundPlayerData) {
    return false;
  }
  
  var evtsLength = foundPlayerData.events.length;
  var last = foundPlayerData.events[evtsLength-1];
  return plugin.playerTracker.getLatLngFromEvent(last);
}

window.plugin.playerTracker.centerMapOnUser = function(nick) {
  var position = plugin.playerTracker.findUserPosition(nick);
  
  if (position === false) {
    return false;
  }
  
  map.setView(position, map.getZoom());
}

window.plugin.playerTracker.onNicknameClicked = function(info) {
  if (info.event.ctrlKey) {
    plugin.playerTracker.centerMapOnUser(info.nickname);
    return false;
  }
}

window.plugin.playerTracker.onGeoSearch = function(search) {
  if (/^@/.test(search)) {
    plugin.playerTracker.centerMapOnUser(search.replace(/^@/, ''));
    return false;
  }
}

window.plugin.playerTracker.setupUserSearch = function() {
  addHook('nicknameClicked', window.plugin.playerTracker.onNicknameClicked);
  addHook('geoSearch', window.plugin.playerTracker.onGeoSearch);
  
  var geoSearch = $('#geosearch');
  var beforeEllipsis = /(.*)…/.exec(geoSearch.attr('placeholder'))[1];
  geoSearch.attr('placeholder', beforeEllipsis + ' or @player…');
}


var setup = plugin.playerTracker.setup;

// PLUGIN END //////////////////////////////////////////////////////////

if(window.iitcLoaded && typeof setup === 'function') {
  setup();
} else {
  if(window.bootPlugins)
    window.bootPlugins.push(setup);
  else
    window.bootPlugins = [setup];
}
} // wrapper end
// inject code into site context
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ wrapper +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
