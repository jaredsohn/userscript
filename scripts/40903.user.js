// ==UserScript==
// @name           Remove New tag from forum
// @namespace      avatar
// @include        http://goallineblitz.com/game/forum_thread_list.pl?*
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

window.setTimeout( function() {

  var url=window.location.toString(), threads, status;
  if (url.indexOf("forum_main.pl",0) >= 0) {
    threads = getElementsByClassName('alternating_color2 forum', document);
    for (var i=0; i<threads.length; i++) {
       status = getElementsByClassName('status', threads[i]); 
       for (var j=0; j<status.length; j++)
         status[j].innerHTML='<img src="/images/game/forum/no_new_posts.gif">';
       status = getElementsByClassName('thread_status', threads[i]); 
       for (var j=0; j<status.length; j++)
         status[j].innerHTML='<img src="/images/game/forum/no_new_posts.gif">';
    }
  }
  else if (url.indexOf("forum_thread_list.pl",0) >= 0) {
    threads = getElementsByClassName('sticky_thread thread thread_new_posts', document);
    for (var i=0; i<threads.length; i++) {
       status = getElementsByClassName('thread_status', threads[i]); 
       for (var j=0; j<status.length; j++)
         status[j].innerHTML='<img src="/images/game/forum/no_new_posts.gif">';
    }

    threads = getElementsByClassName('alternating_color2 thread thread_new_posts', document);
    for (var i=0; i<threads.length; i++) {
       status = getElementsByClassName('thread_status', threads[i]); 
       for (var j=0; j<status.length; j++)
         status[j].innerHTML='<img src="/images/game/forum/no_new_posts.gif">';
    }

  }

}, 100);

