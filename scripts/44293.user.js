// ==UserScript==
// @name           Austin Titans League Leader Highlights
// @namespace      GLB
// @include        http://goallineblitz.com/game/stats.pl*
// ==/UserScript==

//
// Add names to the list, following the code already there
//

var list = ['Anthony Arnold', 'Number1 Stunna', 'Grumpy Dwarf', 'Demon Chi1d', 'MAD STORK', 'immovable bookend', 'Andrew Creason','Charles Manson', 'Slaughter House', 'Leo Nidas', 'D J', 'TooQuick Jones', 'JOHNNY SLAPAHO', 'stud stew', 'Antrell Rolle', 'Slick Back', 'Dom Mags', 'mr migz', 'Carson Lee', 'LE HeadHunter', 'Diego Delgado', 'Blazing Brave', 'Kenny Vaccaro', 'Coverage King', 'Michael Rosenbaum', 'scott sampson', 'Justin Strickler', 'Keith Urban', 'Fat Head', 'Bagger Vance', 'Center Centurion', 'Tiny McPhaterson', 'Andre El Gigante', 'Ric an', 'Hamani Stevens', 'Smush Wilson', 'The Silver Knight', 'Fatty McPhaterson', 'Joe Lambright', 'Lem Chuhalik', 'Gnat Budd', 'Downfield Blahker', 'catch everything', 'Duece Man', 'Slash McQuick', 'Lord Evil', ];
var color = 'green'

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