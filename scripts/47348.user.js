// ==UserScript==
// @name           ESPN Annoying Poster Remover
// @namespace      By EkiRenrut
// @description    Remove annoying ESPM message board posters
// @include        http://boards.espn.go.com/boards/*
// ==/UserScript==
//
//  EkiRenrut  20-Apr-2009
//
//  ESPN ANNOYING POSTER REMOVER Version 0.1
//  
//  This is my first attempt at any kind of Greasemonkey scripting.  This 
//  script is designed to remove the most notorious nincompoop trolls on the
//  ESPN sports message boards by eliminating the HTML of their posts on the
//  main pages and removing any/all trace of their comments in the post 
//  itself.  It has four default annoyers...
//
//  xJokerz
//  BostonGirl524
//  TrueNiners
//  irishfan711722
//
//  You can add whomever else you want by adding them to the 'annoyers' array
//  in the code.
//
//  I wrote this up in a few hours.  It probably could be more robust and
//  efficient, so if you have any suggestions for improvement, just let me
//  know.  I usually visit the ESPN MLB, Red Sox, Yankees, NFL and Patriots
//  message boards once a day.
//
//  If you need any help installing Greasemonkey or this script, I'll be glad
//  to help you with that, too.
//
//  This script is provided free of charge and with absolutely no warranty.
//  If you screw up your computer, it's your fault.
//
//  You are free to modify and distribute this script all you want.  I ask that
//  you retain this header and all these comments if you do so.  Give me a 
//  little credit, mmmmkay?
//
//  The nature of the World Wide Web is malleable.  That means that if ESPN 
//  makes changes to their board, this script might no longer work.  If that
//  happens I'll try to keep revising this script and releasing new versions.
//
//-----------------------------------------------------------------------------


var annoyers = ['xJokerz', 'BostonGirl524', 'accnodefense', 'irishfan711722', 'Brave.10','nflobserver', 'Brave.33', 'bayousaints09', 'jayteeinsf', 'GiantObamaDickLicker', 'Chiefs3252', 'GeorgiaGirlsBrotherC4', 'Liberal_Circle_Jerk', 'RealMan30', 'Liberal__Circle__Jerk', 'xJesterzx', 'accnodefense5', 'I_Suck_Obamas_Balls', 'jose canseco number1 fan', 'Beer____Can', 'donthetoad', 'accnodefense6', 'ObamaDickLicker', 'slimshadybaby111', 'Dvcks_Jets_Sucks', 'Dvcks_Jets', 'Beware_of_Dog', 'Brave.10Returns', '505HP', 'Chiefs3225', 'accnodefense7', 'accnodefense7', 'The HOMO NO NO', 'I Sleep Too Much', 'Happy_Badger', 'RamAttack2001', '_Barney__', 'Cookie-Monster_', 'varriocoachellarifa', 'RedWarlock', 'TomSelleckRunsPrograms', 'Brave.100', 'Robert_Holmes123', 'IWorshipObama', 'Dominant 7th', 'Chiefs3552', 'barupt', 'Dan_Of_War', 'Mickey Turden', 'mickey turdenFTW', 'KobeB2008 II', 'Legend_786', 'Dow Jones CEO', '_NFL_BOARD_EATS_CAMELTOES_', 'barupt1', 'Mich_NBA_Troll_Army_Is_Here', 'NBA_Troll_Army901', 'YOURMODERATORHERE', 'kickrj95', 'allenbgreen', 'billhohnumpire', 'To_Be_Fair', 'Metal Fire 2', 'bayousoniat_09', 'chanceFavorsThePreparedMind', 'saintsfanslovebayou', 'BAYOUORLEANS1_07', 'mikeisagodd2100', 'adfth', 'Skufner_NBA_Troll_Army', 'ghoward79', 'Chancie_NBA_Troll_Army', 'barupto', 'ThatsWhatSheSaid_PoopsOnFaces', '__Barney', 'SteelersAreSuperGreat7399243', 'PEYTON_MANNING_TO_SKUFNER_FTW', 'crackedacorn', 'GG_BANNED_ME', 'NinerGlory69', 'frank_luber', 'ProfessionalPoliticalAdvisor', 'packerbacker444', 'ObamaISaSocialist 1', 'billy_salvatore', 'SteelersAregreat7399243', 'EXIT_HERE', 'LiberalFascistSheep', 'born2run_likes_wang', 'thebiggerbang', 'Huskers70-71-94-95-97-10', 'BravesFTL', 'BravesPhan12', 'BravesPhan12', 'nigeltufnel5', 'BravesPhan2010', '2fartisartsmellit', 'mackdown67', 'aldavishofer30', 'HalladayisPerfect99', 'HalladayisPerfect99', 'aldavishofer40', 'FirstPlacePhils', 'HansonandHeywardareOverrated', 'HansonandHeywardareOverrated', 'JasonHeywardStrikesOutAgain', 'skippymcgee666', 'IAMTHEULTIMATEBEING', 'THEULTIMATEBEINGSFINALMESSAGE', 'THEMODSCANNOTHELPYOU', 'TerribleSS19', 'Hawksman1970', 'CyHalladay2010a', 'Phillies3X', 'bravesman77742', 'ATL_CHOKES_AGAIN', 'bravesman77742', 'CyHalladay2010a', 'seattlefan83', 'mclaughlin___79', 'PlayInfante1414', 'LakeTittyKucka', 'HalladayHamelsOswalt', 'Halladay0swaltHamels', 'ThePHinaticSpeaks', 'arodrule', '3rd_Party_Is_Only_Way', 'aldavishofer25', 'aldavishofer25', 'ghoward79', 'The Repeater 2', 'myspaceyourface', 'aldavishofer100', 'aldavishofer79', 'Twistmonkeylovesbananas', 'JOHN BAKEON', 'the_repeater_2', 'aldavishofer81', 'ThatsWhatSheSaid_Bro', 'SteelersFan7399243', 'aldavishofer85', 'aldavishof89', 'aldavishof90', 'Anderson Pooper', 'The King Daramus', 'aldavishof93', 'aldavishof2011', 'aldavishofer2011', 'Sigh the Great', 'Two Term Barry Sightoero', 'Sigh the Body Ventura'];

// get rid of annoying posters on main pages

var trs = document.getElementsByTagName('tr');
for (i=0; i<trs.length; i++)
{

  var name      = trs[i].firstChild.nextSibling.textContent;

   for (var counter=0; counter<annoyers.length; counter++)
   {
         if (name == annoyers[counter])
         {
                 trs[i].innerHTML = '';
         }
    }
}


// get rid of annoying posters on sub-pages
//
//  first mark the table rows to kill

var trs = document.getElementsByTagName('tr');
for (i=0; i<trs.length; i++)
{

  var content      = trs[i].textContent;
  var classname    = trs[i].firstChild.className;
  var author       = trs[i].firstChild.textContent;

  for (var counter=0; counter<annoyers.length; counter++)
  {
          if (author == annoyers[counter])
          {
                   trs[i].id = 'kill';
                   trs[i].nextSibling.id = 'kill';
          }
  }

}


// then kill the rows

var trs = document.getElementsByTagName('tr');
for (i=0; i<trs.length; i++)
{

  var id           = trs[i].id;

  if (id == 'kill')
  {
          trs[i].innerHTML = '';
  }

}