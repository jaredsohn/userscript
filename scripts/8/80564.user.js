// ==UserScript==
// @name           Move Furious Blitzplosion to Top
// @namespace      GLB
// @include        http://goallineblitz.com/game/forum_main.pl
// ==/UserScript==

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

function findName(test) {
    if (test.innerHTML.indexOf('/game/forum_thread_list.pl?forum_id=4569', 0)>=0) return 1;
  return 0;
}

var els = getElementsByClassName('alternating_color2 forum', document);
for(var i=0,j=els.length; i<j; i++) {
	if (findName(els[i])){
                 els[i].parentNode.removeChild(els[i]);
	   els[0].parentNode.appendChild(els[i])
	}
}