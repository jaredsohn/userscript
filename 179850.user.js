// ==UserScript==
// @name       Ingress Badges Parser 
// @version    0.2.4
// @description  Parse the raw ingress inveotory data
// @match      https://m-dot-betaspike.appspot.com/rpc/playerUndecorated/getPlayerProfile*
// @match      https://betaspike.appspot.com/rpc/playerUndecorated/getPlayerProfile*
// @match      http://m-dot-betaspike.appspot.com/rpc/playerUndecorated/getPlayerProfile*
// @match      http://betaspike.appspot.com/rpc/playerUndecorated/getPlayerProfile*
// @downloadURL https://userscripts.org/scripts/source/179850.user.js
// @updateURL https://userscripts.org/scripts/source/179850.meta.js
// ==/UserScript==
function wrapper() {
// from https://github.com/chriso/load.js
/* Copyright (c) 2010 Chris O'Hara <cohara87@gmail.com>. MIT Licensed */
function asyncLoadScript(a){return function(b,c){var d=document.createElement("script");d.type="text/javascript",d.src=a,d.onload=b,d.onerror=c,d.onreadystatechange=function(){var a=this.readyState;if(a==="loaded"||a==="complete")d.onreadystatechange=null,b()},head.insertBefore(d,head.firstChild)}}(function(a){a=a||{};var b={},c,d;c=function(a,d,e){var f=a.halt=!1;a.error=function(a){throw a},a.next=function(c){c&&(f=!1);if(!a.halt&&d&&d.length){var e=d.shift(),g=e.shift();f=!0;try{b[g].apply(a,[e,e.length,g])}catch(h){a.error(h)}}return a};for(var g in b){if(typeof a[g]=="function")continue;(function(e){a[e]=function(){var g=Array.prototype.slice.call(arguments);if(e==="onError"){if(d)return b.onError.apply(a,[g,g.length]),a;var h={};return b.onError.apply(h,[g,g.length]),c(h,null,"onError")}return g.unshift(e),d?(a.then=a[e],d.push(g),f?a:a.next()):c({},[g],e)}})(g)}return e&&(a.then=a[e]),a.call=function(b,c){c.unshift(b),d.unshift(c),a.next(!0)},a.next()},d=a.addMethod=function(d){var e=Array.prototype.slice.call(arguments),f=e.pop();for(var g=0,h=e.length;g<h;g++)typeof e[g]=="string"&&(b[e[g]]=f);--h||(b["then"+d.substr(0,1).toUpperCase()+d.substr(1)]=f),c(a)},d("chain",function(a){var b=this,c=function(){if(!b.halt){if(!a.length)return b.next(!0);try{null!=a.shift().call(b,c,b.error)&&c()}catch(d){b.error(d)}}};c()}),d("run",function(a,b){var c=this,d=function(){c.halt||--b||c.next(!0)},e=function(a){c.error(a)};for(var f=0,g=b;!c.halt&&f<g;f++)null!=a[f].call(c,d,e)&&d()}),d("defer",function(a){var b=this;setTimeout(function(){b.next(!0)},a.shift())}),d("onError",function(a,b){var c=this;this.error=function(d){c.halt=!0;for(var e=0;e<b;e++)a[e].call(c,d)}})})(this);var head=document.getElementsByTagName("head")[0]||document.documentElement;addMethod("load",function(a,b){for(var c=[],d=0;d<b;d++)(function(b){c.push(asyncLoadScript(a[b]))})(d);this.call("run",c)})
      var nickname; 
      var result;
  window.ppBadges = function(data,isCached) {
    var row=1;
    var col=1;
    var archives=["Not yet unlocked", "Bronze", "Silber", "Gold", "Platinum", "Black"]
    for (var index in data["result"]["highlightedAchievements"]) {
    if (col==1)
        result+="<tr>";
    result+="<td width=33%>";
    var level=0;
    var value=0;
    var badgeImageUrl="http://img1.picload.org/image/ocrlcgp/locked.png";
    var width=124
    var height=145
    for (var tier in data["result"]["highlightedAchievements"][index]["tiers"]){
        if (data["result"]["highlightedAchievements"][index]["tiers"][tier]["locked"]==false) {
            badgeImageUrl=data["result"]["highlightedAchievements"][index]["tiers"][tier]["badgeImageUrl"];
                width=128

                height=128
            level=level+1;
            value=data["result"]["highlightedAchievements"][index]["tiers"][tier]["value"]
        }
    }
    result+="<center><img width='" + width + "' height='" + height + "' src=" + badgeImageUrl + "></img></center>";
	result+="<center><font size='+2'>" + data["result"]["highlightedAchievements"][index]["title"].toString() + "</font></center>";
    result+="<br><center>" + data["result"]["highlightedAchievements"][index]["description"] + "</center>"
    result+="<center>" + archives[level] + "(" + value + ")</center>"
    result+="</td>";
    col+=1;
    if (col==3){
        if (row==1){
            var result_now="";
            result+="<td rowspan=5 valign='top'><center><h2>Statistics</h2></center>"
            for (var index2 in data["result"]["metrics"]) {
		        if ("formattedValue7Days" in data["result"]["metrics"][index2]){
                    result+="<b>" + data["result"]["metrics"][index2]["metricName"] + "</b><br>"
                    result+="Last 7 days: " + data["result"]["metrics"][index2]["formattedValue7Days"] + "<br>"
                    result+="Last 30 days: " + data["result"]["metrics"][index2]["formattedValue30Days"] + "<br>"
                    result+="All time: " + data["result"]["metrics"][index2]["formattedValueAllTime"] + "<br>"
                    result+="<p>"
                } else if ("formattedValueNow" in data["result"]["metrics"][index2]) {
                    result_now+="<b>" + data["result"]["metrics"][index2]["metricName"] + "</b><br>"
                    result_now+="Now: " + data["result"]["metrics"][index2]["formattedValueNow"] + "<br>"
                    result_now+="<p>"
                }
            }
            result+=result_now
            result+="</td>"
        }
        result+="</tr>";
        col=1;
        row+=1;
    }

}
    document.getElementById('res').innerHTML += result;
  };

  window.boot = function() {  
    console.log("Hi")
    if (window.dopost) {
      // page loaded successfully - rewrite some of the page, and replace their stock 'dopost' function
      console.log("Starting")
      var old_dopost = window.dopost.toString();
      var xsrf = old_dopost.match(/xmlhttp.setRequestHeader.'X-XsrfToken', '(.*)'.;/)[1];
      console.log("XSRF")
      window.new_dopost = function()
      {
        document.getElementById('refresh_btn').disabled = true;
        document.getElementById('res').innerHTML = 'Loading - please wait...';
        var handxmlhttp = new XMLHttpRequest();
	    var handjson='{"nemesisSoftwareVersion":"22013-11-05T00:10:10Z c0bfd67a2024 opt","deviceSoftwareVersion":"4.1.1"}'
        handxmlhttp.open('GET', '/handshake?json=' + handjson, true);
        handxmlhttp.onreadystatechange = function() {
          if (handxmlhttp.readyState == 4) {
            var data = JSON.parse(handxmlhttp.responseText.split(";")[1]);
            nickname = data["result"]["nickname"].toString();
            nickname = prompt("User to request:",nickname);
            document.getElementById('res').innerHTML = "";
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', '/rpc/playerUndecorated/getPlayerProfile', true);
            xmlhttp.setRequestHeader('X-XsrfToken', xsrf);
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4) {
                    localStorage['badge-data'] = xmlhttp.responseText;
                    var data = JSON.parse (xmlhttp.responseText);
                    var ap = data["result"]["ap"].toString();
                    var clientlevel=data["result"]["level"].toString();
                    var level=Math.floor(clientlevel/5)+1;

                    var faction=(data["result"]["team"].toString()=="ALIENS") ? "Enlightened": "Resistance";
                    result = "<table border=1><tr><td colspan=2 width=66%><center><h2>" + nickname + "(" + level + ") AP: " + ap + "</h2></center></td><td><center><img src=http://timjones.id.au/ingress/" + faction +"128.png></img><br>" + faction +"</center></td></tr>"
                    var requestData={};
                    console.log("setting badge")
                    requestData["json"]=xmlhttp.responseText;
                    console.log("setting player")
                    requestData["player"]=nickname;
                    console.log("sending")
                    $.ajax({
                        url: 'http://ingress.bplaced.net/sendBadge.php',
                        type: 'POST',
                        data: requestData,
                        settings: {crossDomain: true},
                        success: function(res) {
                            console.log("Badges wurden gesendet");
                        }
                });
                    ppBadges(data);
                }
            };
            xmlhttp.send('{"params":[' + nickname +']}');
          }
        };
        handxmlhttp.send();
        document.getElementById('refresh_btn').disabled = false;

      };
  
      document.body.innerHTML = '<h2>Ingress Badges</h2>'
      + '<p><input id="refresh_btn" type="button" value="Load Badges" onclick="new_dopost()"></p>'
      + '<p id="res"></p>';
      
  
    } else {
      // no 'dopost' in the page - likely the error page as no url parameter was supplied
      // redirect with the required 'json' parameter
      if (window.location.toString().indexOf('?') == -1) {
        document.body.innerHTML='<h3>One moment please. Redirecting...</h3>';
        window.location = window.location+'?json=';
      }
    }
    
  }


  //note: no protocol - so uses http or https as used on the current page
var JQUERY = '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js';
var JQUERYUI = '//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js';

// after all scripts have loaded, boot the actual app
load(JQUERY).then(JQUERYUI).thenRun(window.boot())

}

// inject the code into the webpage
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+wrapper+')();'));
(document.body || document.head || document.documentElement).appendChild(script);
