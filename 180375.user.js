// ==UserScript==
// @name       Ingress Keys Parser
// @version    0.2
// @description  Parse the raw ingress inveotory data for keys only. (Orignial Script "Ingress Inventory Parser" by Jon777)
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
  +'img.portal_list { max-width: 64px; max-height: 32px; }'
  +'img.portal_popup { max-width: 96px; max-height: 96px; }'
  +'img.portal_list, img.portal_popup { background-color: black; }'
  +'.rawdata { width: 95%; height: 240px; }';
  var style = document.createElement('style');
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);


  window.prettyPrintInventory = function(data,isCached) {
    var keys = {};
    var keyCount = 0;

    var totalItems = data.gameBasket.inventory.length;

    for (var index in data.gameBasket.inventory) {
      var ent = data.gameBasket.inventory[index];
      var guid = ent[0];
      var timestamp = ent[1];
      var details = ent[2];

      if (details.resource) {
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
          
        }
      // } else {
        //console.warn ('Unknown inventory entity type!\n'+ent);
      }
    }
    
    var result = '';
    var resultCSV = '';
    
    var invDate = new Date(parseInt(data.result));
    var invDateStr = invDate.toString();
    
    //result += '<p>Inventory loaded at '+invDateStr+'</p>';
    
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
    result += '<table class="data keys">';
    result += '<tr><th>Name</th><th>Count</th><th>Lat,Lng</th></tr>';

    resultCSV += '"Name","Count","Lat,Lng"\n';

    for (var i in nameOrderGuid) {
      var guid = nameOrderGuid[i];
      
      var latlng = keys[guid].latlng.lat+","+keys[guid].latlng.lng;
      var url = 'http://www.ingress.com/intel?ll='+latlng+'&z=17&pll='+latlng;
      var imageurl = keys[guid].image||'http://commondatastorage.googleapis.com/ingress.com/img/default-portal-image.png';

      result += '<tr>';
      result += '<td>'+keys[guid].title+'</td>';
      result += '<td class="num">'+keys[guid].count+'</td><td>'+latlng+'</td></tr>';
      resultCSV += '"'+keys[guid].title+'","'+keys[guid].count+'","'+latlng+'"\n';
    }
    //result += '</table>\n';

    //for debugging or similar
//    result += '<h4>Raw inventory data</h4>';
//    result += '<textarea class="rawdata" readonly>'+JSON.stringify(data,null,2)+'</textarea>';

    
    document.getElementById('res').innerHTML = result;
      
      var contentType = 'text/csv';
      
      var csvFile = new Blob([resultCSV], {type: contentType});
      
      var CSVLink = document.createElement('a');
      CSVLink.download = 'myKeys.csv';
      CSVLink.href = window.URL.createObjectURL(csvFile);
      CSVLink.textContent = 'Download CSV';
      
      CSVLink.dataset.downloadurl = [contentType, CSVLink.download, CSVLink.href].join(':');
      
//      document.body.innerHTML += result;
      //window.body.appendChild(CSVLink);
      document.getElementById('download_link').insertBefore(CSVLink);
      
      
  };
  
  window.boot = function() {  
    if (window.dopost) {
      // page loaded successfully - rewrite some of the page, and replace their stock 'dopost' function
  
      var old_dopost = window.dopost.toString();
      var xsrf = old_dopost.match(/xmlhttp.setRequestHeader.'X-XsrfToken', '(.*)'.;/)[1];
      
  
      //document.body.innerHTML = '<h2>Ingress Keys</h2>'
      //+ '<p id="res"></p>';
      document.body.innerHTML = '<p id="download_link"></p>';
      document.body.innerHTML += '<p id="res"></p>';
      
  
    } else {
      // no 'dopost' in the page - likely the error page as no url parameter was supplied
      // redirect with the required 'json' parameter
      if (window.location.toString().indexOf('?') == -1) {
        document.body.innerHTML='<h3>One moment please. Redirecting...</h3>';
        window.location = window.location+'?json=';
      }
    }
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', '/rpc/playerUndecorated/getInventory', true);
    xmlhttp.setRequestHeader('X-XsrfToken', xsrf);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            localStorage['inventory-data'] = xmlhttp.responseText;
            var data = JSON.parse (xmlhttp.responseText);
            prettyPrintInventory(data);
        }
    };
    xmlhttp.send('{"params":{"lastQueryTimestamp":0}}');
      
  }

  window.boot();

}

// inject the code into the webpage
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+wrapper+')();'));
(document.body || document.head || document.documentElement).appendChild(script);
