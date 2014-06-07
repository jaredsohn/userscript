// ==UserScript==
// @name           Forum Hide
// @namespace      GLB
// @include        http://goallineblitz.com/game/forum_main.pl
// ==/UserScript==

var forums = ['5', '21',]

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
   for(var i=0,j=els.length; i<j; i++) {
      if (test.innerHTML.indexOf('/game/forum_thread_list.pl?forum_id=' + forums[i], 0)>=0) return 1;
   }
  return 0;
}

var els = getElementsByClassName('alternating_color2 forum', document);
for(var i=0,j=els.length; i<j; i++) {
	if (findName(els[i])){
                 els[i].parentNode.removeChild(els[i]);
	}
}