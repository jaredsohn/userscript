// ==UserScript==
// @name           GLB Boosted Stats on Skill Points Page
// @namespace      KHMI - Greasemonkey
// @include        http://goallineblitz.com/game/skill_points.pl?player_id=*
// ==/UserScript==

var url = window.location.href;
var currentId = url.substring(url.indexOf('_id=')+4, url.length);

var timeout = 0;

window.setTimeout( function() {
   // get the player names from the homepage
   GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://goallineblitz.com/game/player.pl?player_id=' + currentId,
      headers: {
           'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
           'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload: function(playerpage) {
         addBoostedValues(playerpage.responseText);
      }
   });
},timeout); 

function addBoostedValues(responseText){
   var stats = [];
   var re = /<td class="(stat_value|stat_value_boosted)">(.+)<\/td>/g;
   var matches = responseText.match(re);
   for(var i=0;i<14;i++) {
      if(matches[i].replace(re, "$1") == "stat_value_boosted"){
         stats[i] = matches[i].replace(re, "$2")
      }else{
         stats[i] = "";
      }
   }
   
   // get the attributes
   var attribute_name = getElementsByClassName("attribute_name", document);
   var attribute_value = getElementsByClassName("attribute_value", document);
   //<td class="attribute_value" id="strength">39</td>
   for(var i = 0;i<attribute_value.length;i++){
      switch(attribute_name[i].innerHTML){
         case "Strength":
            if(stats[0] != ""){
               attribute_value[i].setAttribute("title",stats[0]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
         case "Blocking":
            if(stats[1] != ""){
               attribute_value[i].setAttribute("title",stats[1]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
         case "Speed":
            if(stats[2] != ""){
               attribute_value[i].setAttribute("title",stats[2]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
         case "Tackling":
            if(stats[3] != ""){
               attribute_value[i].setAttribute("title",stats[3]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
         case "Agility":
            if(stats[4] != ""){
               attribute_value[i].setAttribute("title",stats[4]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
         case "Throwing":
            if(stats[5] != ""){
               attribute_value[i].setAttribute("title",stats[5]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
         case "Jumping":
            if(stats[6] != ""){
               attribute_value[i].setAttribute("title",stats[6]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
         case "Catching":
            if(stats[7] != ""){
               attribute_value[i].setAttribute("title",stats[7]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
         case "Stamina":
            if(stats[8] != ""){
               attribute_value[i].setAttribute("title",stats[8]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
         case "Carrying":
            if(stats[9] != ""){
               attribute_value[i].setAttribute("title",stats[9]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
         case "Vision":
            if(stats[10] != ""){
               attribute_value[i].setAttribute("title",stats[10]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
         case "Kicking":
            if(stats[11] != ""){
               attribute_value[i].setAttribute("title",stats[11]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
         case "Confidence":
            if(stats[12] != ""){
               attribute_value[i].setAttribute("title",stats[12]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
         case "Punting":
            if(stats[13] != ""){
               attribute_value[i].setAttribute("title",stats[13]);
               attribute_value[i].setAttribute("style","color:blue;");
            }
         break;
      }      
   }
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