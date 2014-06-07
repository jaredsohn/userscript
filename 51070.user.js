// ==UserScript==
// @name           blah
// @namespace      GLB
// @include        http://goallineblitz.com/game/forum_thread.pl?thread_id=*
// ==/UserScript==

var replacestr = "blah......blah......blah......";

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

function UpdatePosts(par) {

   var user_name = getElementsByClassName('user_name', par), found=0;
   var content = getElementsByClassName('post_content', par);

   if (user_name[0].innerHTML.indexOf("mikelj")>=0 || user_name[0].innerHTML.indexOf("SheVegas")>=0 || user_name[0].innerHTML.indexOf("Lord Thomas Drake")>=0)
     content[0].innerHTML = replacestr;

   if (content.length>0) {
     var quote = getElementsByClassName('quote', content[0]);
     for (var i=quote.length-1; i>=0; i--) {
       var ptr1 = quote[i].innerHTML.indexOf("Originally posted by <b>");
       var ptr2 = quote[i].innerHTML.indexOf("</b><br>", ptr1);
       var savestr = quote[i].innerHTML;
       var tmp = getElementsByClassName('quote', quote[i]);

       if (ptr1 >= 0 && ptr2 > ptr1) {
          var str = quote[i].innerHTML.substring(ptr1+24, ptr2);
          if (str == "mikelj" || str == "SheVegas" || str == "Lord Thomas Drake")
            if (tmp.length==0) quote[i].innerHTML = savestr.substring(0, ptr2+8) + "<br>" + replacestr;
            else {
              var ptr3 = quote[i].innerHTML.lastIndexOf("</span>");
              quote[i].innerHTML = savestr.substring(0, ptr3+7) + "<br><br>" + replacestr;
            }
       }
     }
   }
}

window.setTimeout( function() {

  var posts = getElementsByClassName('post content_container', document);
  for (var i=0; i<posts.length; i++) 
     UpdatePosts(posts[i]);

}, 100);

