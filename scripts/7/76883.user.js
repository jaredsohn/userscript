// ==UserScript==
// @name           Robbnva4Mod
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
    if (test.innerHTML.indexOf('/game/home.pl?user_id=8921', 0)>-1 || test.innerHTML.indexOf('/game/home.pl?user_id=143852', 0)>-1 || test.innerHTML.indexOf('/game/home.pl?user_id=4817', 0)>-1 ) 
return 1;
  return 0;
}

var els = getElementsByClassName('user_name', document);
for(var i=0,j=els.length; i<j; i++) {
	if (findName(els[i])){
		var online = getElementsByClassName('online', els[i])
		var offline = getElementsByClassName('offline', els[i])
		if (online.length > 0){els[i].removeChild(online[0])}
		if (offline.length > 0){els[i].removeChild(offline[0])}
		els[i].innerHTML = els[i].innerHTML + '<b>Poopierhead</b><br/>'
		if (online.length > 0){els[i].appendChild(online[0])}
		if (offline.length > 0){els[i].appendChild(offline[0])}
	}
}