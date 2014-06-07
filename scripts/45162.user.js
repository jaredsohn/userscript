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

function IgnoreQuote(par) {
   var els = par.getElementsByTagName("*");
   for(var i=0,j=els.length; i<j; i++)
      if (els[i].className == 'post_content_container') {
         els2 = els[i].getElementsByTagName("*");
         for (var m=0, n=els2.length; m<n; m++) 
              if (els2[m].className=='post_content' && findNameInQuote(els2[m])) {
                 var p1=els2[m].innerHTML.indexOf('<span class="quote">', 0), p2=els2[m].innerHTML.lastIndexOf('</span>'), len=els2[m].innerHTML.length;
                 els2[m].innerHTML=els2[m].innerHTML.substring(0, p1) + els2[m].innerHTML.substring(p2+7, len);
                 return 0;
             }
       }
}

function IgnoreThreads(par) {
   var els = par.getElementsByTagName("*");
   for(var i=0,j=els.length; i<j; i++)
      if (els[i].className == 'thread_title')  {
           if (findNameInThread(els[i])) 
              par.parentNode.removeChild(par);
       }
}

window.setTimeout( function() {

  var url=window.location.toString();
  if (url.indexOf("forum_thread.pl",0) >= 0) {

    var posts = getElementsByClassName('post content_container', document);
    for (var i=0; i<posts.length; i++) 
       IgnorePosts(posts[i]);
    posts = getElementsByClassName('post content_container', document);
    for (var i=0; i<posts.length; i++) 
       IgnoreQuote(posts[i]);
  }
  else if (url.indexOf("forum_thread_list.pl",0) >= 0) {
    var threads = getElementsByClassName('alternating_color2 thread thread_new_posts', document);
    for (var i=0; i<threads.length; i++) 
       IgnoreThreads(threads[i]);
    threads = getElementsByClassName('alternating_color2 thread', document);
    for (var i=0; i<threads.length; i++) 
       IgnoreThreads(threads[i]);

  }

}, 100);
