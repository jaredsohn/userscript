// ==UserScript==
// @name           Cash To HomePage Part II
// @namespace      KMHI - Greasemonkey(props to Branden Guess)
// @description    modification of http://userscripts.org/scripts/show/27967, Adds player's cash to the home page dynamically
// @include        http://goallineblitz.com/game/home.pl
// ==/UserScript==
 
var displayLocation = { BelowEnergy:false, RightOfEnergy:false, BelowXP:true};
var timeout = 3000;
var displayTraining = true;
 
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
         var cash1=cash[18].split('<td class="stat_value">');
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
         var cash1=cash[18].split('<td class="stat_value">');
         var cash2=cash1[1].split('</td>');
 
         // add cash to the page
         var ratingbar=getElementsByClassName('rating_bar',document)
         var theCash = document.createElement('div');
         theCash.setAttribute("style","padding:5px;");
         theCash.innerHTML = "<span style='font-weight:700; padding-left:10px;'>Cash:</span><span style='padding-left:10px;'>" + cash2[0] + "</span>"
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
         var cash1=cash[18].split('<td class="stat_value">');
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
 
function addTraining(playertrainid, cash, i){
   var skillname = playertrainid.substring(0,playertrainid.indexOf(" "));   
   // determine the skill to display
   switch (skillname) {
      case "agility":
      var skill1=cash[5].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      case "blocking":
      var skill1=cash[2].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      case "carrying":
      var skill1=cash[10].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      case "catching":
      var skill1=cash[8].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      case "confidence":
      var skill1=cash[13].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      case "jumping":
      var skill1=cash[7].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      case "kicking":
      var skill1=cash[12].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      case "punting":
      var skill1=cash[14].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      case "speed":
      var skill1=cash[3].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      case "stamina":
      var skill1=cash[9].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      case "strength":
      var skill1=cash[1].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      case "tackling":
      var skill1=cash[4].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      case "throwing":
      var skill1=cash[6].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      case "vision":
      var skill1=cash[11].split('">');
      var skill2=skill1[1].split('</td>');
      break;
      default:
      var skill1=cash[1].split('">');
      var skill2=skill1[1].split('</td>');
      break;
   }
   var skillratingbar=getElementsByClassName('player_vital_head',document)
   skillratingbar[1+(i*5)].parentNode.innerHTML = skillratingbar[1+(i*5)].parentNode.innerHTML.replace(skillname, skillname + " - " + skill2[0])
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


Because it's your web. A tremendous project with the help from our friends.
