// ==UserScript==
// @name           The Alliance
// @namespace      GLB
// @include        http://goallineblitz.com/game/forum*
// ==/UserScript==

//Thanks to Viet Campo for allowing me to use his script
// You must update this value whenever you add or remove alliance members!
var FAMILY_SIZE = 9;      // FYI: blazzinken is last entry
var family = new Array(FAMILY_SIZE*2);
var ctr = 0;

family[ctr++] = '28791';    // blazzinken
family[ctr++] = 'Austin Owner';
family[ctr++] = '62014';    // fortna29
family[ctr++] = 'Lancaster Owner';
family[ctr++] = '16473';    // hugo Johnson
family[ctr++] = 'XomDom Owner';
family[ctr++] = '131871';    // Gazpar
family[ctr++] = 'Niagra Falls Owner';
family[ctr++] = '112600';    // tpr
family[ctr++] = 'XX Scouting Director';
family[ctr++] = '139001';    // Nif
family[ctr++] = 'XX Special Teams';
family[ctr++] = '168985';    // Tuttle
family[ctr++] = 'XX VP of Website';
family[ctr++] = '157855';    // Raderzord
family[ctr++] = 'XX Broadcast Director';
family[ctr++] = '33153'; // Masterfung
family[ctr++] = 'Lancasters DC';

var NUM_HIT_LIST = 0;
var hit_list = new Array(NUM_HIT_LIST);
var hlctr = 0;

hit_list[hlctr++] = '70812';  // kgarlett
hit_list[hlctr++] = '63611';  // Veg
hit_list[hlctr++] = '82223';  // djmtott
hit_list[hlctr++] = '39519';  // Cruzi
hit_list[hlctr++] = '19045';  // Himewad
hit_list[hlctr++] = '100886'; // mccaskeyfootball
hit_list[hlctr++] = '98671';  // jokerpac32
hit_list[hlctr++] = '5906';   // drrdutko
hit_list[hlctr++] = '14050';  // Mr. AdamZona
hit_list[hlctr++] = '181985'; // Mightyhalo
hit_list[hlctr++] = '105214'; // jlrock
hit_list[hlctr++] = '126930'; // getmoreho
hit_list[hlctr++] = '2027';   // The Strategy Expert
hit_list[hlctr++] = '77609';  // quzur
hit_list[hlctr++] = '11608';  // Iruleall15
hit_list[hlctr++] = '90958';  // AZCowboysFan

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