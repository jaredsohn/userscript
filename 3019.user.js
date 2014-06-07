// ==UserScript==
// @name          Record Corrector
// @namespace     http://axlotl.net/greasemonkey
// @description   addresses adjectival omissions
// @include       *
// @exclude       can't think of any.
// ==/UserScript==
/*
      http://www.google.com/search?q=define%3A%20corrector

      May I suggest especially: http://www.whitehouse.gov/news/

      
      License: GPL: http://www.gnu.org/copyleft/gpl.html
      Idea: Stephan Wehner
      Code: Chris Feldmann, sciolist.
*/

/*
* put them into an array, and in binds your hands because you can't
* have conditionals in replacement functions (except sort of via $` and $').
* We've got these types:
*
*                format         example                     expected result
*---------------------------------------------------------------------------------------
*               title name      president bush              president and war criminal bush
*               name            bush                        dimwit
*               nickname        lewis('scooter') libby      lewis('asshole') libby
*               first lastname  paul wolfowitz              paul wolfowitz, war criminal,
*               lastname        bush                        noted torturer bush
*/

function correctify(node)
{

 if( node.nodeType == 3){
   txt = node.data;
   //GM_log(node.data);
   try{

      /*
      *   president bush
      */
      txt = txt.replace(new RegExp(/(president)\s(george\s)?(bush)/i), "$1 (and " + pick(phrases) + ") $3");
      /*
      *   Vice president cheney
      */
      txt = txt.replace(new RegExp(/((vice(-|\s)president)\s(dick\s)?(cheney))/gi), "$2 and " + pick(phrases) + "$4 $5");
      /*
      *   dick cheney
      */
      txt = txt.replace(new RegExp(/(dick)\s(cheney)/gi), " $1 (\'" + pick(epithets) + "\') $2");
      /*
      *   Lewis ('scooter') libby
      */
      txt = txt.replace(new RegExp(/[("'](scooter)['")]/gi), " \'" + pick(epithets) + "\' ");
      /*
      *   donald rumsfeld
      */
      txt = txt.replace(new RegExp(/(donald)?\s(rumsfeld)/gi), "$2, " + pick(phrases));
      /*
      *   alberto gonzales
      */
      txt = txt.replace(new RegExp(/(attorney\sgeneral)?\s(alberto)(\sr\.)?\s(gonzales)/gi), "$1 and " +pick(phrases) + "$2 R. $4");
      /*
      *   scott mcclellan
      */
      txt = txt.replace(new RegExp(/(scott)\s(mcclellan)/gi), "$1 (\'" + pick(epithets) + "\') $2");
      /*
      *   paul wolfowitz
      */
      txt = txt.replace(new RegExp(/(paul)?\s(wolfowitz)/gi), "$1 (\'" + pick(epithets) + "\') $2");
      /*
      *   The cuddly Karl Rove
      */
      txt = txt.replace(new RegExp(/(karl)\s(rove)/gi), "$1 (\'" + pick(epithets) + "\') $2");
      /*
      *   President
      */
      txt = txt.replace(/((?!vice)[\w\s-]{5}|the\s)(president[^iy])/gi,  "$1" + pick(adjectives) + " $2");
      /*
      *   commander in chief
      */
      txt = txt.replace(/commander\s(in\schief)/ig, pick(epithets) + " $1");
      /*
      *   george bush
      */
      txt = txt.replace(new RegExp(/(george\s)([^h]|[w\.\s]{0,4})(bush)/gi),  pick(phrases) + " $1 $3");
      //GM_log(txt);
      
      node.replaceData(0, node.length, txt);
   
   } catch (e){}
 } else {
   children = node.childNodes;
   for (k = 0; k < children.length; k++){
     correctify( children[k]);
   }
 }
}
var phrases = new Array( "war criminal ",
                        "wire-tapper ",
                        "admitted torturer ",
                        "noted dissembler ",
                        "despotic milquetoast ",
                        "ugsome yucky ",
                        "corporate tool ",
                        "crinite mouth-breather ",
                        "gormless neandertal ",
                        "incogitant belligerent ",
                        "fractious knuckle-dragger ",
                        "scrofulous cur ",
                        "malarky emitter ",
                        "known philodox ",
                        "running dog ",
                        "least common denominator ",
                        "missing link ",
                        "pinguid stinky ",
                        "supperating miscreant ",
                        "odious dullard ",
                        "irascible mooncalf ",
                        "malodorous punchinello ",
                        "microcephalic factotum ",
                        "farsical martinet ",
                        "shameful buffoon ",
                        "petulant lizzard ",
                        "unctuous nincompoop ",
                        "delusional Baptist ",
                        "snivelling lickspittle ",
                        "force for evil ",
                        "tyranical troglodyte ",
                        "irksome nettle ",
                        "craven boot-scraping ",
                        "loathsome scurrier ",
                        "flasehood repeater ",
                        "bad witch of the west ",
                        "vernicious knid ",
                        "moronic inferno ",
                        "power-mad lunatic ",
                        "insufferable deceiver ",
                        "bombastic lackey "
                        );
                        
var adjectives = new Array("god-damned ",
                          "so-called ",
                          "despised ",
                          "delusional ",
                          "messianic ",
                          "hebetudinous ",
                          "incult ",
                          "theocratic ",
                          "plutocratic ",
                          "execrable ",
                          "benighted ",
                          "reprobate ",
                          "ugsome ",
                          "monomaniacal ",
                          "jejune ",
                          "irksome ",
                          "ridiculous ",
                          "lying ",
                          "mendacious ",
                          "untruthful ",
                          "wince-inducing "
                          );
                          
var epithets = new Array( "fucker",
                         "dimwit",
                         "numbnuts",
                         "chickenhawk",
                         "cokehead",
                         "nudnik",
                         "scalawag",
                         "simpleton",
                         "moron",
                         "scourge",
                         "simpleton",
                         "stooge",
                         "nightmare",
                         "troglodyte",
                         "tyrant",
                         "fibber",
                         "liar",
                         "no-goodnik"
                         );
                         
var pick = function(arr){
 return arr[Math.round(Math.random() * (arr.length - 1))];
}

var parens = document.getElementsByTagName("p");

for( i=0; i< parens.length; i++){
 correctify(parens[i]);
}