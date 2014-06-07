// ==UserScript==
// @name           Contract Expiration Date II
// @namespace      KMHI - Greasemonkey(props to RandomBeast)
// @description    Contract Exp Date to homepage
// @include        http://goallineblitz.com/game/home.pl
// ==/UserScript==

var displayLocation = { RightOfName:false, RightOfEnergy:false, BelowEnergy:true };
var timeout = 1000;

window.setTimeout( function() {
   var playernames=getElementsByClassName('player_name',document)

   for (var i = 0; i < playernames.length; i++) {
      var playerInfo = playernames[i].innerHTML
      var re = /\d{1,7}/;
      var playerId = playerInfo.match(re);

      if(displayLocation.RightOfName){
         getExpDate(playerId, i);
      }
      if(displayLocation.RightOfEnergy){
         getExpDate2(playerId, i);
      }
      if(displayLocation.BelowEnergy){
         getExpDate3(playerId, i);
      }
   }
},timeout);

function getExpDate(playerId, i){
   GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://goallineblitz.com/game/player.pl?player_id=' + playerId,
      headers: {
           'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
           'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload: function(expdate) {
         var response1=expdate.responseText         
         var expdate=response1.split('/yr - Exp. ');
         var expdate1=expdate[1].split('</td>');
         
         var playerbox=getElementsByClassName('player_name',document)
         playerbox[i].innerHTML = playerbox[i].innerHTML + "&nbsp;<span class='player_xp'>" + expdate1[0] + "</span>";
      }
   });
};

function getExpDate2(playerId, i){
   GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://goallineblitz.com/game/player.pl?player_id=' + playerId,
      headers: {
         'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
         'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload: function(expdate) {
         var expdate=expdate.responseText.split('/yr - Exp. ');
         var expdate1=expdate[1].split('</td>');

         // add cash to the page
         var ratingbar=getElementsByClassName('rating_bar',document)
         var contract = document.createElement('div');
         contract.setAttribute("style","padding:5px;");
         contract.innerHTML = "<span class='player_xp' style='padding-left:20px;'>" + expdate1[0] + "</span>"
         ratingbar[i].parentNode.insertBefore(contract, ratingbar[i].nextSibling);
      }
   });
};

function getExpDate3(playerId, i){
   GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://goallineblitz.com/game/player.pl?player_id=' + playerId,
      headers: {
         'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
         'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload: function(expdate) {
         var expdate=expdate.responseText.split('/yr - Exp. ');
         var expdate1=expdate[1].split('</td>');

         // add cash to the page
         var playerbox=getElementsByClassName('player_vitals',document)
         playerbox[i].innerHTML = playerbox[i].innerHTML +
         "<tr><td class='player_vital_head'>Contract:</td><td>expires on " + expdate1[0] + "</td>" +
         "</tr>"
      }
   });
};

function getElementsByClassName(classname, par){
   var a=[];  
   var re = new RegExp('\\b' + classname + '\\b'); 
   var els = par.getElementsByTagName("*");
   for(var i=0,j=els.length; i<j; i++){      
      if(re.test(els[i].className)){
         a.push(els[i]);
      }
   }
   return a;
};