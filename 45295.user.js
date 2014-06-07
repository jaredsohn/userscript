// ==UserScript==
// @name           Cartel
// @namespace      GLB
// @include        http://goallineblitz.com/game/forum*
// ==/UserScript==

// You must update this value whenever you add or remove family members!
var FAMILY_SIZE = 6;      // FYI: rjssob is last entry
var family = new Array(FAMILY_SIZE*2);
var ctr = 0;

family[ctr++] = '164382';    // CoolChuck
family[ctr++] = 'Cartel Team Owner';
family[ctr++] = '89016';   // ChuckMo26
family[ctr++] = 'Cartel Team Owner';
family[ctr++] = '118328';   // dyzmal
family[ctr++] = 'Cartel Team Owner';
family[ctr++] = '153892';   // k2heel
family[ctr++] = 'Cartel Team Owner';
family[ctr++] = '164966';   // photojett
family[ctr++] = 'Cartel Team Owner';
family[ctr++] = '38792';    // vetsgt02
family[ctr++] = 'Cartel Team Owner';
family[ctr++] = '196726';    // Willydacoach
family[ctr++] = 'Cartel Team Owner';
family[ctr++] = '98479';    // yogidave
family[ctr++] = 'Cartel Farm Team Owner';


var NUM_HIT_LIST = 11;
var hit_list = new Array(NUM_HIT_LIST);
var hlctr = 0;

hit_list[hlctr++] = '70812';  // kgarlett
hit_list[hlctr++] = '63611';  // Veg
hit_list[hlctr++] = '82223';  // djmtott
hit_list[hlctr++] = '39519';  // Cruzi
hit_list[hlctr++] = '240281'; // Cryptotich
hit_list[hlctr++] = '19045';  // Himewad
hit_list[hlctr++] = '100886'; // mccaskeyfootball
hit_list[hlctr++] = '98671';  // jokerpac32
hit_list[hlctr++] = '5906';   // drrdutko
hit_list[hlctr++] = '14050';  // Mr. AdamZona
hit_list[hlctr++] = '181985'; // Mightyhalo

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

function findNameOfFamily(test)
{
   for( var i = 0; i < family.length; i += 2 )
   {
      if( test.innerHTML.indexOf('/game/home.pl?user_id=' + family[i], 0) >= 0 )
      {
         return i;
      }
   }

   return -1;
}

function findNameOfHitList(test)
{
   for( var i=0; i < hit_list.length; i++ )
   {
      if( test.innerHTML.indexOf('/game/home.pl?user_id=' + hit_list[i], 0) >= 0 )
      {
         return i;
      }
   }

   return -1;
}

var els = getElementsByClassName('user_name', document);

for( var i=0,j=els.length; i < j; i++ )
{
   var fam_index = findNameOfFamily(els[i]);
   if( fam_index != -1 )
   {
      var online = getElementsByClassName('online', els[i])
      var offline = getElementsByClassName('offline', els[i])
      if( online.length > 0 )
      {
         els[i].removeChild(online[0])
      }
      if( offline.length > 0 )
      {
         els[i].removeChild(offline[0])
      }

      els[i].innerHTML = els[i].innerHTML + '<b>' + family[fam_index+1] + '</b><br/>'

      if( online.length > 0 )
      {
         els[i].appendChild(online[0])
      }
      if( offline.length > 0 )
      {
         els[i].appendChild(offline[0])
      }
   }

   var hl_index = findNameOfHitList(els[i]);
   if( hl_index != -1 )
   {
      var online = getElementsByClassName('online', els[i])
      var offline = getElementsByClassName('offline', els[i])
      if( online.length > 0 )
      {
         els[i].removeChild(online[0])
      }
      if( offline.length > 0 )
      {
         els[i].removeChild(offline[0])
      }

      els[i].innerHTML = els[i].innerHTML + '<b>' + '---HIT LIST---' + '</b><br/>'

      if( online.length > 0 )
      {
         els[i].appendChild(online[0])
      }
      if( offline.length > 0 )
      {
         els[i].appendChild(offline[0])
      }
   }
}
