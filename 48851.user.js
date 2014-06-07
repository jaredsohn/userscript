// ==UserScript==
// @name           Ignore Sweet Jesus
// @namespace      Forum
// @include        http://goallineblitz.com/game/forum_thread.pl?*
// @include        http://goallineblitz.com/game/forum_thread_list.pl?*
// ==/UserScript==

var list = ['Sweet Jesus'];

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

function findNameInQuote(nameentry) {
  for (var i=0; i<list.length; i++)
    if (nameentry.innerHTML.indexOf('Originally posted by <b>' + list[i] + '</b>', 0)>=0) return 1;
  return 0;
}

function findNameInThread(nameentry) {
  for (var i=0; i<list.length; i++)
    if (nameentry.innerHTML.indexOf('Started by: ' + list[i] + '</', 0)>=0) return 1;
  return 0;
}

function IgnorePosts(par) {
   var els = par.getElementsByTagName("*");
   for(var i=0,j=els.length; i<j; i++)
      if (els[i].className == 'post_user') {
         els2 = els[i].getElementsByTagName("*");
         for (var m=0, n=els2.length; m<n; m++) 
              if (els2[m].className=='user_name' && findName(els2[m])) {
                 par.parentNode.removeChild(par);
             }
       }
}
