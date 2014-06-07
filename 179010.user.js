// ==UserScript==
// @name       Ingress Inventory Parser
// @version    0.2.5
// @description  Parse the raw ingress inveotory data
// @match      https://m-dot-betaspike.appspot.com/rpc/playerUndecorated/getInventory*
// @match      https://betaspike.appspot.com/rpc/playerUndecorated/getInventory*
// ==/UserScript==



function wrapper() {
// from https://github.com/chriso/load.js
/* Copyright (c) 2010 Chris O'Hara <cohara87@gmail.com>. MIT Licensed */
function asyncLoadScript(a){return function(b,c){var d=document.createElement("script");d.type="text/javascript",d.src=a,d.onload=b,d.onerror=c,d.onreadystatechange=function(){var a=this.readyState;if(a==="loaded"||a==="complete")d.onreadystatechange=null,b()},head.insertBefore(d,head.firstChild)}}(function(a){a=a||{};var b={},c,d;c=function(a,d,e){var f=a.halt=!1;a.error=function(a){throw a},a.next=function(c){c&&(f=!1);if(!a.halt&&d&&d.length){var e=d.shift(),g=e.shift();f=!0;try{b[g].apply(a,[e,e.length,g])}catch(h){a.error(h)}}return a};for(var g in b){if(typeof a[g]=="function")continue;(function(e){a[e]=function(){var g=Array.prototype.slice.call(arguments);if(e==="onError"){if(d)return b.onError.apply(a,[g,g.length]),a;var h={};return b.onError.apply(h,[g,g.length]),c(h,null,"onError")}return g.unshift(e),d?(a.then=a[e],d.push(g),f?a:a.next()):c({},[g],e)}})(g)}return e&&(a.then=a[e]),a.call=function(b,c){c.unshift(b),d.unshift(c),a.next(!0)},a.next()},d=a.addMethod=function(d){var e=Array.prototype.slice.call(arguments),f=e.pop();for(var g=0,h=e.length;g<h;g++)typeof e[g]=="string"&&(b[e[g]]=f);--h||(b["then"+d.substr(0,1).toUpperCase()+d.substr(1)]=f),c(a)},d("chain",function(a){var b=this,c=function(){if(!b.halt){if(!a.length)return b.next(!0);try{null!=a.shift().call(b,c,b.error)&&c()}catch(d){b.error(d)}}};c()}),d("run",function(a,b){var c=this,d=function(){c.halt||--b||c.next(!0)},e=function(a){c.error(a)};for(var f=0,g=b;!c.halt&&f<g;f++)null!=a[f].call(c,d,e)&&d()}),d("defer",function(a){var b=this;setTimeout(function(){b.next(!0)},a.shift())}),d("onError",function(a,b){var c=this;this.error=function(d){c.halt=!0;for(var e=0;e<b;e++)a[e].call(c,d)}})})(this);var head=document.getElementsByTagName("head")[0]||document.documentElement;addMethod("load",function(a,b){for(var c=[],d=0;d<b;d++)(function(b){c.push(asyncLoadScript(a[b]))})(d);this.call("run",c)})

  var css = '* { font-family: sans-serif; }'
  +'table.data th { background: #ddd; padding: 0 5px 0 5px; }'
  +'table.data td { background: #eee; padding: 0 2px 0 2px; }'
  +'table.data .num { text-align: right; }'
  +'table.data th { text-align: left; }'
  +'table.data th.L1 { background: #fece5a; }'
  +'table.data th.L2 { background: #ffa630; }'
  +'table.data th.L3 { background: #ff7315; }'
  +'table.data th.L4 { background: #e40000; }'
  +'table.data th.L5 { background: #fd2992; }'
  +'table.data th.L6 { background: #eb26cd; }'
  +'table.data th.L7 { background: #c124e0; }'
  +'table.data th.L8 { background: #9627f4; }'
  +'table.data td.L1 { background: #feedc5; }'
  +'table.data td.L2 { background: #ffe8ca; }'
  +'table.data td.L3 { background: #ffdec8; }'
  +'table.data td.L4 { background: #f4d3d3; }'
  +'table.data td.L5 { background: #fdc6e1; }'
  +'table.data td.L6 { background: #ebb7e3; }'
  +'table.data td.L7 { background: #d8aee0; }'
  +'table.data td.L8 { background: #dbbef4; }'
  +'table.data th.COMMON { background: #84fbbd; }'
  +'table.data th.RARE { background: #ad8aff; }'
  +'table.data th.VERY_RARE { background: #f78af6; }'
  +'table.data td.COMMON { background: #c2fbdd; }'
  +'table.data td.RARE { background: #dacaff; }'
  +'table.data td.VERY_RARE { background: #f7c6f7; }'
  +'img.portal_list { max-width: 64px; max-height: 32px; }'
  +'img.portal_popup { max-width: 96px; max-height: 96px; }'
  +'img.portal_list, img.portal_popup { background-color: black; }'
  +'.rawdata { width: 95%; height: 240px; }';
  var style = document.createElement('style');
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);

  var leafletcss = document.createElement('link');
  leafletcss.setAttribute('rel','stylesheet');
  leafletcss.setAttribute('href','https://d591zijq8zntj.cloudfront.net/leaflet-0.6.4/leaflet.css');
  document.head.appendChild(leafletcss);

  
  
  window.prettyPrintInventory = function(data,isCached) {
    var resourceWithLevelsCounts = {};
    var resourceWithLevelsType = { 'EMITTER_A': undefined, 'EMP_BURSTER': undefined, 'POWER_CUBE': undefined, 'MEDIA': 'Media' }

    var modResourceCounts = {};
    var modResourceTypes = {'RES_SHIELD': undefined, 'LINK_AMPLIFIER': undefined, 'HEATSINK': undefined, 'MULTIHACK': undefined, 'FORCE_AMP': undefined, 'TURRET': undefined };
    
    var flipCounts = {};
    var flipTypes = {};
    
    var keys = {};
    var keyCount = 0;

    var totalItems = data.gameBasket.inventory.length;

    for (var index in data.gameBasket.inventory) {
      var ent = data.gameBasket.inventory[index];
      var guid = ent[0];
      var timestamp = ent[1];
      var details = ent[2];

      if (details.modResource) {
        var type = details.modResource.resourceType;
        var rarity = details.modResource.rarity;
        var displayName = details.displayName && details.displayName.displayName;

        if (modResourceCounts[type]===undefined) modResourceCounts[type] = {};
        if (modResourceCounts[type][rarity]===undefined) modResourceCounts[type][rarity] = 0;
        modResourceCounts[type][rarity] ++;

        if (displayName) modResourceTypes[type] = displayName;
          
      } else if (details.resourceWithLevels) {
        var type = details.resourceWithLevels.resourceType;
        var level = details.resourceWithLevels.level;
        var displayName = details.displayName && details.displayName.displayName;

        if (resourceWithLevelsCounts[type]===undefined) resourceWithLevelsCounts[type] = {};
        if (resourceWithLevelsCounts[type][level]===undefined) resourceWithLevelsCounts[type][level] = 0;
        resourceWithLevelsCounts[type][level] ++;
        
        if (displayName) resourceWithLevelsType[type] = displayName;
        
      } else if (details.resource) {
        var type = details.resource.resourceType;
        if (type == 'PORTAL_LINK_KEY') {
          var guid = details.portalCoupler.portalGuid;
          var title = details.portalCoupler.portalTitle;
          var loc = details.portalCoupler.portalLocation;
          var image = details.portalCoupler.portalImageUrl;
          var addr = details.portalCoupler.portalAddress;
          
          var locsplit = loc.split(',');
          var latE6 = parseInt(locsplit[0],16);
          var lngE6 = parseInt(locsplit[1],16);
          if (latE6 >= 2147483648) latE6 -= 4294967296;
          if (lngE6 >= 2147483648) lngE6 -= 4294967296;

          var latlng = { 'lat': latE6/1E6, 'lng': lngE6/1E6 }
          
          if (keys[guid]===undefined) keys[guid] = {count:0};

          keys[guid].title = title;
          keys[guid].latlng = latlng;
          keys[guid].image = image;
          keys[guid].addr = addr;
          keys[guid].count ++;
          
          keyCount++;
          
        } else if (type == 'FLIP_CARD') {
          var type = details.flipCard.flipCardType;
          var displayName = details.displayName && details.displayName.displayName;
          
          flipCounts[type] = (flipCounts[type]||0)+1;
          
          if (displayName) flipTypes[type] = displayName;
          
        } else {
          console.warn('Unknown inventory resource type '+type+'\n'+ent);
        }
      } else {
        console.warn ('Unknown inventory entity type!\n'+ent);
      }
    }
    
    var result = '';
    
    if (isCached) {
      result += '<div>Cached inventory in use - press "Refresh Inventory" above to update</div>';
    }

    var invDate = new Date(parseInt(data.result));
    var invDateStr = invDate.toString();
    
    result += '<p>Inventory loaded at '+invDateStr+'</p>';
    
    result += '<h3>Inventory: '+totalItems+' items</h3>';

    // -- resourceWithLevels - Resonators, Bursters, etc
    result += '<h4>Resource With Levels</h4>';
    result += '<table class="data resource-with-level">';
    result += '<tr><th>Type</th>';
    for (var l=1; l<=8; l++) {
      result += '<th class="L'+l+'">L'+l+'</th>';
    }
    result += '<th class="tot">Total</th></tr>';

    for (var t in resourceWithLevelsType) {
      if (resourceWithLevelsCounts[t] !== undefined) {
        result += '<tr class="'+t+'"><th>'+(resourceWithLevelsType[t]||t)+'</th>';
        var total = 0;
        for (var l=1; l<=8; l++) {
          var count = '-';
          if (resourceWithLevelsCounts[t][l] !== undefined) {
            count = resourceWithLevelsCounts[t][l];
            total += count;
          }
          result += '<td class="num L'+l+'">'+count+'</td>';
        }
        result += '<th class="num tot">'+total+'</th></tr>';
      }
    }
    result += '</table>\n';

    // -- mods
    result += '<h4>Mod Resource</h4>';
    result += '<table class="data mods">';
    result += '<tr><th>Type</th><th class="COMMON">Common</th><th class="RARE">Rare</th><th class="VERY_RARE">Very-Rare</th><th class="tot">Total</th></tr>';

    var totalMods = 0;
    for (var t in modResourceTypes) {
      if (modResourceCounts[t]) {
        result += '<tr><th>'+modResourceTypes[t]+'</th>';
        var tot = 0;
        for (var r in {'COMMON':0, 'RARE':0, 'VERY_RARE':0}) {
          var count = modResourceCounts[t][r] || '-';
          result += '<td class="num '+r+'">'+count+'</td>';
          if (count != "-") tot += count;
        }
        result += '<th class="num">'+tot+'</th></tr>';
        totalMods += tot;
      }
    }
    result += '<tr><th colspan="4">Total Mods</th><th class="num">'+totalMods+'</th></tr></table>\n';

    // -- flip card
    result += '<h4>Flip Card</h4>';
    result += '<table class="data flip">';
    result += '<tr><th>Type</th><th>Count</th></tr>';

    var tot = 0;    
    for (var type in flipTypes) {
      var count = flipCounts[type] || '-';
      result += '<tr class="'+type+'"><th>'+flipTypes[type]+'</th><td class="num">'+count+'</td></tr>';
      if (count != "-") tot += count;
    }
    result += '<tr><th>Total</th><th class="num">'+tot+'</th></tr>';
    result += '</table>\n';


    // -- keys
    var nameOrderGuid = Object.keys(keys);
    nameOrderGuid.sort ( function(a,b) {
      var nameA = keys[a].title;
      var nameB = keys[b].title;
      
      if (nameA > nameB) return 1;
      if (nameA < nameB) return -1;
      return 0;
    });

    result += '<h4>Portal Keys: '+keyCount+' keys total (for '+Object.keys(keys).length+' distinct portals)</h4>';
    result += '<p><div id="map"></div></p>';

    result += '<table class="data keys">';
    result += '<tr><th>Image</th><th>Name</th><th>Count</th><th>Lat,Lng</th></tr>';

    for (var i in nameOrderGuid) {
      var guid = nameOrderGuid[i];
      
      var latlng = keys[guid].latlng.lat+","+keys[guid].latlng.lng;
      var url = 'http://www.ingress.com/intel?ll='+latlng+'&z=17&pll='+latlng;
      var imageurl = keys[guid].image||'http://commondatastorage.googleapis.com/ingress.com/img/default-portal-image.png';

      result += '<tr>';
      result += '<td><img src="'+imageurl+'" class="portal_list"></td>';
      result += '<td><a href="'+url+'" target="_blank" title="'+(keys[guid].addr||'[unknown]')+'">'+keys[guid].title+'</a></td>';
      result += '<td class="num">'+keys[guid].count+'</td><td>'+latlng+'</td></tr>';
    }
    result += '</table>\n';

    //for debugging or similar
//    result += '<h4>Raw inventory data</h4>';
//    result += '<textarea class="rawdata" readonly>'+JSON.stringify(data,null,2)+'</textarea>';

    
    document.getElementById('res').innerHTML = result;

    // -- key map, using leafletjs

    var mapDiv = document.getElementById('map');
    mapDiv.style.width = (window.innerWidth-32)+'px';
    mapDiv.style.height = (window.innerHeight-32)+'px';
    
    window.map = L.map("map").setView([0,0],2);
    L.tileLayer('https://otile{s}-s.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg', {
      attribution: 'Map data © OpenStreetMap contributors, Tiles Courtesy of MapQuest',
      maxZoom: 18,
      subdomains: '1234'
    }).addTo(map);
    
    window.onresize = function() { 
      var mapDiv = document.getElementById('map');
      mapDiv.style.width = (window.innerWidth-32)+'px';
      mapDiv.style.height = (window.innerHeight-32)+'px';
      map.invalidateSize();
    };
    
    var viewBounds = undefined;
    
    for (var guid in keys) {
      var latlng = keys[guid].latlng.lat+","+keys[guid].latlng.lng;
      var url = 'http://www.ingress.com/intel?ll='+latlng+'&z=17&pll='+latlng;
      var imageurl = keys[guid].image||'http://commondatastorage.googleapis.com/ingress.com/img/default-portal-image.png';
      var title = keys[guid].title+'\n'+keys[guid].count+' key(s)';
      
      var marker = L.marker(keys[guid].latlng,{title:title}).addTo(map);
      var popup = '<b>'+keys[guid].title+'</b><br><img class="portal_popup" src="'+imageurl+'"> <b><i>'+keys[guid].count+' key(s)</i></b><br><a href="'+url+'" target="_blank">intel map</a>';
      marker.bindPopup(popup);
      
      if (viewBounds === undefined) viewBounds = L.latLngBounds([marker.getLatLng(), marker.getLatLng()]);
      else viewBounds.extend(marker.getLatLng());
    }
    if (viewBounds) map.fitBounds(viewBounds);
  };

  window.boot = function() {  
    if (window.dopost) {
      // page loaded successfully - rewrite some of the page, and replace their stock 'dopost' function
  
      var old_dopost = window.dopost.toString();
      var xsrf = old_dopost.match(/xmlhttp.setRequestHeader.'X-XsrfToken', '(.*)'.;/)[1];
      
      window.new_dopost = function()
      {
        document.getElementById('refresh_btn').disabled = true;
        document.getElementById('res').innerHTML = 'Loading - please wait...';
        
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', '/rpc/playerUndecorated/getInventory', true);
        xmlhttp.setRequestHeader('X-XsrfToken', xsrf);
        xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4) {
            try {
              localStorage['inventory-data'] = xmlhttp.responseText;
            } catch(e) {}
            var data = JSON.parse (xmlhttp.responseText);
            prettyPrintInventory(data);
          }
        };
        xmlhttp.send('{"params":{"lastQueryTimestamp":0}}');
      };
  
      document.body.innerHTML = '<h2>Ingress Inventory</h2>'
      + '<p><input id="refresh_btn" type="button" value="Refresh Inventory" onclick="new_dopost()"></p>'
      + '<p id="res"></p>';
      
  
    } else {
      // no 'dopost' in the page - likely the error page as no url parameter was supplied
      // redirect with the required 'json' parameter
      if (window.location.toString().indexOf('?') == -1) {
        document.body.innerHTML='<h3>One moment please. Redirecting...</h3>';
        window.location = window.location+'?json=';
      }
    }

    try {
      if (localStorage['inventory-data'] && document.getElementById('res')) {
        var data = JSON.parse (localStorage['inventory-data']);
        prettyPrintInventory(data,true);
      }
    } catch(e) {}
  }


  load('https://d591zijq8zntj.cloudfront.net/leaflet-0.6.4/leaflet.js').thenRun(window.boot);

}

// inject the code into the webpage
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+wrapper+')();'));
(document.body || document.head || document.documentElement).appendChild(script);
