// ==UserScript==
// @name           The Family
// @namespace      GLB
// @include        http://goallineblitz.com/game/forum*
// ==/UserScript==

// You must update this value whenever you add or remove family members!
var FAMILY_SIZE = 112;      // FYI: pjkuchta is last entry
var family = new Array(FAMILY_SIZE*2);
var ctr = 0;

family[ctr++] = '96785';    // trentw
family[ctr++] = 'The Don';

family[ctr++] = '106877';   // a49erfan77
family[ctr++] = 'UnderDon';
family[ctr++] = '106109';   // Ben Sanderson
family[ctr++] = 'UnderDon';
family[ctr++] = '15678';    // Brutus Buckeye
family[ctr++] = 'UnderDon';
family[ctr++] = '119434';   // Cutbait
family[ctr++] = 'UnderDon';
family[ctr++] = '143852';   // GmanV2
family[ctr++] = 'UnderDon';
family[ctr++] = '39385';    // grandavenue
family[ctr++] = 'UnderDon';
family[ctr++] = '147831';   // Stonewall
family[ctr++] = 'UnderDon';
family[ctr++] = '79654';    // Ubasstards
family[ctr++] = 'UnderDon';
family[ctr++] = '113328';   // valakar
family[ctr++] = 'UnderDon';

family[ctr++] = '164382';   // CoolChuck
family[ctr++] = 'Boss';
family[ctr++] = '89016';    // ChuckMo26
family[ctr++] = 'Boss';
family[ctr++] = '26951';    // IAMNH
family[ctr++] = 'Boss';
family[ctr++] = '164503';   // jonnyGoBlue
family[ctr++] = 'Boss';
family[ctr++] = '94190';    // klite_98
family[ctr++] = 'Boss';
family[ctr++] = '47254';    // Mat McBriar
family[ctr++] = 'Boss';
family[ctr++] = '28621';    // NSab
family[ctr++] = 'Boss';
family[ctr++] = '27617';    // superpunk
family[ctr++] = 'Boss';
family[ctr++] = '28103';    // turkishkamel
family[ctr++] = 'Boss';
family[ctr++] = '72220';    // VietCampo
family[ctr++] = 'Boss';

family[ctr++] = '72719';    // Blitz_Inc.
family[ctr++] = 'UnderBoss';
family[ctr++] = '17770';    // Bone Saw
family[ctr++] = 'UnderBoss';
family[ctr++] = '138364';   // Drewsky
family[ctr++] = 'UnderBoss';
family[ctr++] = '34305';    // FondestMemory
family[ctr++] = 'UnderBoss';
family[ctr++] = '160751';   // fordfan98
family[ctr++] = 'UnderBoss';
family[ctr++] = '127498';   // havefun
family[ctr++] = 'UnderBoss';
family[ctr++] = '99309';    // James128
family[ctr++] = 'UnderBoss';
family[ctr++] = '56875';    // joecabezuela
family[ctr++] = 'UnderBoss';
family[ctr++] = '7286';     // Kevin71
family[ctr++] = 'UnderBoss';
family[ctr++] = '179774';   // mad beaver
family[ctr++] = 'UnderBoss';
family[ctr++] = '172509';   // Maddencoach
family[ctr++] = 'UnderBoss';
family[ctr++] = '26502';    // Milanese
family[ctr++] = 'UnderBoss';
family[ctr++] = '375';      // rjssob
family[ctr++] = 'UnderBoss';
family[ctr++] = '8921';     // robbnva
family[ctr++] = 'UnderBoss';
family[ctr++] = '64915';    // Shalubis
family[ctr++] = 'UnderBoss';
family[ctr++] = '81931';    // SyedAshrafulla
family[ctr++] = 'UnderBoss';
family[ctr++] = '138266';   // Tackleb0x
family[ctr++] = 'UnderBoss';
family[ctr++] = '73834';    // Talon
family[ctr++] = 'UnderBoss';
family[ctr++] = '73112';    // TuNice
family[ctr++] = 'UnderBoss';
family[ctr++] = '120963';   // USCGuardsmen
family[ctr++] = 'UnderBoss';

family[ctr++] = '86149';    // BadgerPhil
family[ctr++] = 'Capo';
family[ctr++] = '70612';    // Batman540
family[ctr++] = 'Capo';
family[ctr++] = '7934';     // The_Burning_Bush
family[ctr++] = 'Capo';
family[ctr++] = '206676';   // drake262
family[ctr++] = 'Capo';
family[ctr++] = '105725';   // fixxxer101
family[ctr++] = 'Capo';
family[ctr++] = '160435';   // The Garbone
family[ctr++] = 'Capo';
family[ctr++] = '144427';   // geturembedder
family[ctr++] = 'Capo';
family[ctr++] = '66005';    // Guppy, Inc
family[ctr++] = 'Poopdeck Mopper';
family[ctr++] = '62549';    // Hobo
family[ctr++] = 'Capo';
family[ctr++] = '60761';    // lemdog
family[ctr++] = 'Capo';
family[ctr++] = '175513';   // Mr Yakov
family[ctr++] = 'Capo';
family[ctr++] = '36086';    // Whipsnard
family[ctr++] = 'Capo';

family[ctr++] = '214935';   // atomicrooster
family[ctr++] = 'Captain';
family[ctr++] = '82459';    // Beeerad37
family[ctr++] = 'Captain';
family[ctr++] = '28791';    // blazzinken
family[ctr++] = 'Captain';
family[ctr++] = '215822';   // bovnok
family[ctr++] = 'Captain';
family[ctr++] = '129130';   // Buer
family[ctr++] = 'Captain';
family[ctr++] = '55471';    // thechief58831
family[ctr++] = 'Captain';
family[ctr++] = '39876';    // Daydreamer
family[ctr++] = 'Captain';
family[ctr++] = '169008';   // DL24
family[ctr++] = 'Captain';
family[ctr++] = '122735';   // Hate Sighed
family[ctr++] = 'Captain';
family[ctr++] = '92757';    // jmorgalis
family[ctr++] = 'Captain';
family[ctr++] = '14800';    // jrry32
family[ctr++] = 'Captain';
family[ctr++] = '220482';   // liteup1
family[ctr++] = 'Captain';
family[ctr++] = '114340';   // Mickyt1985
family[ctr++] = 'Captain';
family[ctr++] = '140069';   // mingo23
family[ctr++] = 'Captain';
family[ctr++] = '130052';   // outsiderrule
family[ctr++] = 'Captain';
family[ctr++] = '70176';    // PackMan97
family[ctr++] = 'Captain';
family[ctr++] = '221391';   // patbruegg
family[ctr++] = 'Captain';
family[ctr++] = '81337';    // Pnocida
family[ctr++] = 'Captain';
family[ctr++] = '83070';    // RandomBeast
family[ctr++] = 'Captain';
family[ctr++] = '70959';    // Ruleslawyer
family[ctr++] = 'Captain';
family[ctr++] = '112707';   // Tareton
family[ctr++] = 'Captain';
family[ctr++] = '116880';   // Speedcat622
family[ctr++] = 'Captain';
family[ctr++] = '226593';   // Sweet Jesus
family[ctr++] = 'Captain';
family[ctr++] = '9299';     // Virgin Goldstandard
family[ctr++] = 'Captain';
family[ctr++] = '47749';    // Darren Sanders
family[ctr++] = 'Captain';
family[ctr++] = '41240';    // youngJP90
family[ctr++] = 'Captain';

family[ctr++] = '16849';    // |40niners1
family[ctr++] = 'Soldier';
family[ctr++] = '146504';   // Adam Allison
family[ctr++] = 'Soldier';
family[ctr++] = '145677';   // asknoquarter21
family[ctr++] = 'Soldier';
family[ctr++] = '124969';   // BarroomHeroes
family[ctr++] = 'Soldier';
family[ctr++] = '120125';   // Chivas
family[ctr++] = 'Soldier';
family[ctr++] = '8959';     // jimmyhoffa
family[ctr++] = 'Soldier';
family[ctr++] = '182188';   // mcnastasty
family[ctr++] = 'Soldier';
family[ctr++] = '21619';    // Skarie1523
family[ctr++] = 'Soldier';
family[ctr++] = '71429';    // DavidD458
family[ctr++] = 'Soldier';
family[ctr++] = '10871';    // Herman Moore
family[ctr++] = 'Soldier';
family[ctr++] = '11977';    // NSchmidt10
family[ctr++] = 'Soldier';
family[ctr++] = '62586';    // rimfalk
family[ctr++] = 'Soldier';
family[ctr++] = '76813';    // nightstar289
family[ctr++] = 'Soldier';
family[ctr++] = '20595';    // epictetus
family[ctr++] = 'Soldier';
family[ctr++] = '85721';    // theodore327
family[ctr++] = 'Soldier';
family[ctr++] = '16099';    // imnotthatstupid
family[ctr++] = 'Soldier';
family[ctr++] = '32652';    // Outlaw Dogs
family[ctr++] = 'Soldier';
family[ctr++] = '77180';    // Zoblefu
family[ctr++] = 'Soldier';
family[ctr++] = '97025';    // FREZ
family[ctr++] = 'Soldier';
family[ctr++] = '143099';   // Browner389
family[ctr++] = 'Soldier';
family[ctr++] = '211004';   // Randolf
family[ctr++] = 'Soldier';
family[ctr++] = '91676';    // QueenBee
family[ctr++] = 'Soldier';
family[ctr++] = '240281';   // Cryptotich
family[ctr++] = 'Soldier';
family[ctr++] = '83528';    // skeetersmif
family[ctr++] = 'Soldier';
family[ctr++] = '64270';    // fbfan18
family[ctr++] = 'Soldier';
family[ctr++] = '93220';    // heavyd
family[ctr++] = 'Soldier';
family[ctr++] = '315517';   // bree29
family[ctr++] = 'Soldier';
family[ctr++] = '78077';    // Slipknaught
family[ctr++] = 'Soldier';
family[ctr++] = '121279';   // WalterManning
family[ctr++] = 'Soldier';
family[ctr++] = '76408';    // Ahoda
family[ctr++] = 'Soldier';
family[ctr++] = '108261';   // Dr. Showtime
family[ctr++] = 'Soldier';
family[ctr++] = '180646';   // walker1
family[ctr++] = 'Soldier';
family[ctr++] = '68372';    // atom871
family[ctr++] = 'Soldier';
family[ctr++] = '195997';   // coachingubigr
family[ctr++] = 'Soldier';
family[ctr++] = '70474';    // pjkuchta
family[ctr++] = 'Soldier';


var NUM_HIT_LIST = 17;
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
hit_list[hlctr++] = '87775';  // H0wie Dewum

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