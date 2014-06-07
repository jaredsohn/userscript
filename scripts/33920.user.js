// ==UserScript==
// @name           Training & Cash To Homepage v1.1
// @namespace      GLB Training and Cash to Homepage - mw54finest
// @description    Modified version of ddcunderground's Cash to HomePage II http://userscripts.org/scripts/show/29461
// @include        http://goallineblitz.com/game/home.pl
// ==/UserScript==
 
var displayLocation = { BelowEnergy:false, RightOfEnergy:true, BelowXP:true};
var timeout = 2000;
var displayTraining = false;
 
window.setTimeout( function() {
   var playernames=getElementsByClassName('player_name',document)
   var playertrain=getElementsByClassName('player_vitals',document)
 
   for (var i = 0; i < playernames.length; i++) {
      var playerInfo = playernames[i].innerHTML
      var playertrainInfo = playertrain[i].innerHTML
      var playerinfotrainItems = playertrainInfo.split('<td>');  
 
      var re = /\d{1,7}/;
      var playerId = playerInfo.match(re);
      if(displayLocation.BelowEnergy) {
      getCash(playerId, i, playerinfotrainItems[2]);
      }
      if(displayLocation.RightOfEnergy) {
      getCash2(playerId, i, playerinfotrainItems[2]);
      }
      if(displayLocation.BelowXP){
      getCash3(playerId, i, playerinfotrainItems[2]);
      }
   }
},timeout);
 
function getCash(playerId, i, playertrainid){
   GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://goallineblitz.com/game/player.pl?player_id=' + playerId,
      headers: {
         'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
         'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload: function(cash) {
         var response1=cash.responseText
         var cash=response1.split('<td class="stat_head">');
         var cash1=cash[20].split('<td class="stat_value">');
         var cash2=cash1[1].split('</td>');
 
         // add cash to the page
         var playerbox=getElementsByClassName('player_vitals',document)
         playerbox[i].innerHTML = playerbox[i].innerHTML +
         "<tr><td class='player_vital_head'>Cash:</td><td>" + cash2[0] + "</td>" +
         "</tr>"
 
         // display training stat
         if(displayTraining){
            addTraining(playertrainid, cash, i);
         }
      }
   });
};
 
function getCash2(playerId, i, playertrainid){
   GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://goallineblitz.com/game/player.pl?player_id=' + playerId,
      headers: {
         'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
         'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload: function(cash) {
         var response1=cash.responseText
         var cash=response1.split('<td class="stat_head">');
         var cash1=cash[19].split('<td class="stat_value">');
         var cash2=cash1[1].split('</td>');
 
         // add Bonus Token to the page
         var ratingbar=getElementsByClassName('rating_bar',document)
         var theCash = document.createElement('div');
         theCash.setAttribute("style","padding:5px;");
         theCash.innerHTML = "<span style='font-weight:700; padding-left:10px;'>Bonus Tokens:</span><span style='padding-left:10px;'>" + cash2[0] + "</span>"
         ratingbar[i].parentNode.insertBefore(theCash, ratingbar[i].nextSibling);      
 
         // display training stat
         if(displayTraining){
            addTraining(playertrainid, cash, i);
         };
      }
   });
};
 
function getCash3(playerId, i, playertrainid){
   GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://goallineblitz.com/game/player.pl?player_id=' + playerId,
      headers: {
         'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
         'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload: function(cash) {
         var response1=cash.responseText
         var cash=response1.split('<td class="stat_head">');
         var cash1=cash[20].split('<td class="stat_value">');
         var cash2=cash1[1].split('</td>');
 
         // add cash to the page
         var playerbox=getElementsByClassName('player_left_side',document)
         playerbox[i].innerHTML = playerbox[i].innerHTML + "<div style='font-weight:700;text-align:center'>" + cash2[0] +"</div>";
 
         // display training stat
         if(displayTraining){
            addTraining(playertrainid, cash, i);
         }
      }
   });
}
 
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