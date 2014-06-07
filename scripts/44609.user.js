// ==UserScript==
// @name           BAMF.gif
// @namespace      GLB
// @include        http://goallineblitz.com/game/forum_thread_list.pl?forum_id=*
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
    if (test.innerHTML.indexOf(' ', 0)>=0) return 1;
  return 0;
}

var els = getElementsByClassName('thread_title', document);
for(var i=0,j=els.length; i<j; i++) {
	if (findName(els[i])){
		els[i].innerHTML = '<img src="http://img22.imageshack.us/img22/4819/bamfyss.gif"><img src="http://img22.imageshack.us/img22/4819/bamfyss.gif"><img src="http://img22.imageshack.us/img22/4819/bamfyss.gif"><img src="http://img22.imageshack.us/img22/4819/bamfyss.gif"><img src="http://img22.imageshack.us/img22/4819/bamfyss.gif"><img src="http://img22.imageshack.us/img22/4819/bamfyss.gif"><img src="http://img22.imageshack.us/img22/4819/bamfyss.gif"><img src="http://img22.imageshack.us/img22/4819/bamfyss.gif"><img src="http://img22.imageshack.us/img22/4819/bamfyss.gif">'	     
	}
}