// ==UserScript==
// @name           TAHA PEN
// @namespace      GLB
// @include        http://goallineblitz.com/game/home.pl
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
    if (test.innerHTML.indexOf('<div class="medium_head">My Friends</div>', 0)>=0) return 1;
  return 0;
}

var els = getElementsByClassName('friends', document);
for(var i=0,j=els.length; i<j; i++) {
	if (findName(els[i])){
		els[i].innerHTML = els[i].innerHTML + '<font size=36><b>8=========D</b></font><br/>'
	}
}