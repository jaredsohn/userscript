// ==UserScript==
// @name           League Underground
// @namespace      GLB
// @include        http://goallineblitz.com/game/forum*
// ==/UserScript==

// You must update this value whenever you add or remove League members!
var FAMILY_SIZE = 19;      // FYI: SteelersFanatic is last entry
var family = new Array(FAMILY_SIZE*2);
var ctr = 0;

family[ctr++] = '141666';        // Loco Moco
family[ctr++] = 'League Underground President';

family[ctr++] = '149384';    // tjanderson321
family[ctr++] = 'League Underground Vice President';

family[ctr++] = '142184';   // da big P
family[ctr++] = 'League Underground Owner Association';
family[ctr++] = '54836';   // Diggersboy
family[ctr++] = 'League Underground Owner Association';
family[ctr++] = '3225924';    // OOGA BOOGA 
family[ctr++] = 'League Underground Owner Association';
family[ctr++] = '98808';   // MasonLow
family[ctr++] = 'League Underground Owner Association';
family[ctr++] = '186426';   // sgt_bman
family[ctr++] = 'League Underground Owner Association';
family[ctr++] = '149634';   // Kyyberi
family[ctr++] = 'League Underground Owner Association';
family[ctr++] = '108903';   // josh5
family[ctr++] = 'League Underground Owner Association';
family[ctr++] = '152510';   // hard2catch781
family[ctr++] = 'League Underground Owner Association';
family[ctr++] = '38645';   // JayHoov73
family[ctr++] = 'League Underground Owner Association';
family[ctr++] = '195271';   // Deadpool55
family[ctr++] = 'League Underground Owner Association'
family[ctr++] = '78081';   // Bruiser 1234
family[ctr++] = 'League Underground Owner Association'
family[ctr++] = '44567';   // rip_city
family[ctr++] = 'League Underground Owner Association'
family[ctr++] = '293038';   // Jimmy Hoffa
family[ctr++] = 'League Underground Owner Association'
family[ctr++] = '16239';   // Eko331
family[ctr++] = 'League Underground Owner Association'
family[ctr++] = '93299';   // MF3K
family[ctr++] = 'League Underground Owner Association'
family[ctr++] = '95869';   // cinncy tedlegs
family[ctr++] = 'League Underground Owner Association'
family[ctr++] = '4394';   // SteelersFanatic
family[ctr++] = 'League Underground Owner Association'



var NUM_HIT_LIST = 17;  // changing to 24
var hit_list = new Array(NUM_HIT_LIST);
var hlctr = 0;



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
   var ValidChars = "0123456789";
   var userString = '/game/home.pl?user_id=';

   for( var i = 0; i < family.length; i += 2 )
   {
      if( (test.innerHTML.indexOf(userString + family[i], 0) >= 0) &&
          (ValidChars.indexOf(
            test.innerHTML.charAt(
             parseInt(test.innerHTML.indexOf(userString + family[i], 0)) + userString.length + family[i].length)) == -1) )
      {
         return i;
      }
   }

   return -1;
}

function findNameOfHitList(test)
{
   var ValidChars = "0123456789";
   var userString = '/game/home.pl?user_id=';
   for( var i=0; i < hit_list.length; i++ )
   {
      if( (test.innerHTML.indexOf(userString + hit_list[i], 0) >= 0) &&
          (ValidChars.indexOf(
            test.innerHTML.charAt(
             parseInt(test.innerHTML.indexOf(userString + hit_list[i], 0)) + userString.length + hit_list[i].length)) == -1) )
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