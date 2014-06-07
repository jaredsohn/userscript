// ==UserScript==
// @name           Avatar replacement 2
// @namespace      GLB
// @include        http://goallineblitz.com/game/forum*
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
    if (test.innerHTML.indexOf('/game/user_pic.pl?user_id=27825', 0)>=0) return 1;
  return 0;
}

var els = getElementsByClassName('user_avatar', document);
for(var i=0,j=els.length; i<j; i++) {
	if (findName(els[i])){
		els[i].innerHTML = '<img height="75" width="75" src="http://www.iamvanilla.com/wp-content/uploads/2008/02/fail_fat_kid.jpg"/>'
	}
}