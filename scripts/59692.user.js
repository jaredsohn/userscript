// ==UserScript==
// @name           deucus
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
    if (test.parentNode.parentNode.innerHTML.indexOf('href="/game/home.pl?user_id=342898"', 0)>=0) return 1;
  return 0;
}

var els = getElementsByClassName('post_content', document);
for(var i=0,j=els.length; i<j; i++) {
	if (findName(els[i])){
		els[i].innerHTML = 'HAHAHA DISREGARD THAT I SUCK COCKS.'
	}
}


// ==UserScript==
// @name           Faggot
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
    if (test.innerHTML.indexOf('/game/home.pl?user_id=342898', 0)>=0) return 1;
  return 0;
}

var els = getElementsByClassName('user_name', document);
for(var i=0,j=els.length; i<j; i++) {
	if (findName(els[i])){
		var online = getElementsByClassName('online', els[i])
		var offline = getElementsByClassName('offline', els[i])
		if (online.length > 0){els[i].removeChild(online[0])}
		if (offline.length > 0){els[i].removeChild(offline[0])}
		els[i].innerHTML = els[i].innerHTML + '<b>Faggot</b><br/>'
		if (online.length > 0){els[i].appendChild(online[0])}
		if (offline.length > 0){els[i].appendChild(offline[0])}
	}
}
