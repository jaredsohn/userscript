// ==UserScript==
// @name           League Leader Highlights
// @namespace      GLB
// @include        http://goallineblitz.com/game/stats.pl?league_id=*
// ==/UserScript==

//
// Add names to the list, following the code already there
//

var list = ['Quebee One', 'Another name', 'Another name', 'etc...'];
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