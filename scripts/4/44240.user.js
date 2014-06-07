// ==UserScript==
// @name           Legal Smexies League Leader Highlights
// @namespace      GLB
// @include        http://goallineblitz.com/game/stats.pl*
// ==/UserScript==

//
// Add names to the list, following the code already there
//

var list = ['Quebee One', 'Fozzy Whittaker', 'Fubar Grunt', 'Kellen Spann','Matthew Latrell', 'Tony Dillavechio', 'Clay Watts', 'Trent Killian', 'Sack Youtoo', 'Mister Steele', 'Chode McBlob', 'Tonna Bricks', 'Kung Fu Master', 'Luigi Dillavechio', 'Sack You', 'These Pretzels Are Making Me Thirsty', 'Johnnie Tsunami', 'Poisonous Darts', 'Tom Welling', 'Del Fisher', 'Scott Bernard', 'Barrett McCall', 'Mario Dillavechio', 'Fozzy Whittaker', 'Simon Kern', 'Fubar Grunt', 'K Nasty', 'Peter Pancake', 'Brock Bannon', 'Angelo Dillavechio', 'Bartolo Dillavechio', 'Alex Barron', 'Emilio Dillavechio', 'John Glover', 'Franco Dillavechio', 'Brad Paisley', 'Antwan Gates', 'E.J. Lundgren', 'Whats his Face', 'Jay One', 'Erica Durance', 'Long Footey', 'Pat Leadfoot', ];
var color = 'blue'

//
// Stuff you shouldn't really touch.
//

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

function findName(nameentry) {
  for (var i=0; i<list.length; i++)
    if (nameentry.innerHTML.indexOf('>' + list[i] + '<', 0)>=0) return 1;
  return 0;
}

var els = getElementsByClassName('stat_column_player', document);
for(var i=0,j=els.length; i<j; i++) {
  if (findName(els[i])){
   var link = els[i].getElementsByTagName('a')
   link[0].setAttribute('style', 'color:'+color+'; font-weight:bold')
  }
}
