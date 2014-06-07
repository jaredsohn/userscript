// ==UserScript==
// @name           shenanigans Mod PM's
// @namespace      GLB
// @include        http://goallineblitz.com/game/inbox.pl
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

//51709

function findName(test) {
    if (test.innerHTML.indexOf('/game/home.pl?user_id=51709', 0)>=0) return 1;
  return 0;
}

var els = getElementsByClassName('alternating_color1 message_read', document);
for(var i=0,j=els.length; i<j; i++) {
	if (findName(els[i])){
		var link = els[i].getElementsByTagName('a')
		link[0].setAttribute('style', 'color: darkgreen;')
		link[1].setAttribute('style', 'color: darkgreen;')
	}
}

var els = getElementsByClassName('alternating_color1 message_unread', document);
for(var i=0,j=els.length; i<j; i++) {
	if (findName(els[i])){
		var link = els[i].getElementsByTagName('a')
		link[0].setAttribute('style', 'color: darkgreen;')
		link[1].setAttribute('style', 'color: darkgreen;')
	}
}
var els = getElementsByClassName('alternating_color2 message_read', document);
for(var i=0,j=els.length; i<j; i++) {
	if (findName(els[i])){
		var link = els[i].getElementsByTagName('a')
		link[0].setAttribute('style', 'color: darkgreen;')
		link[1].setAttribute('style', 'color: darkgreen;')
	}
}
var els = getElementsByClassName('alternating_color2 message_unread', document);
for(var i=0,j=els.length; i<j; i++) {
	if (findName(els[i])){
		var link = els[i].getElementsByTagName('a')
		link[0].setAttribute('style', 'color: darkgreen;')
		link[1].setAttribute('style', 'color: darkgreen;')
	}
}