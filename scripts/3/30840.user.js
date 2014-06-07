// ==UserScript==
// @name           GLB Forum Thread/Post Count
// @namespace      KHMI - Greasemonkey
// @include        http://goallineblitz.com/game/forum_thread_list.pl*
// @include        http://goallineblitz.com/game/forum_main.pl
// ==/UserScript==

var timeout = 0;
 
window.setTimeout( function() {
   var url = window.location.href;
   
   if(url == "http://goallineblitz.com/game/forum_main.pl"){
      var threadCount = getElementsByClassName('thread_count',document);
      
      var goalLineBlitzCount = parseInt(threadCount[0].innerHTML) + parseInt(threadCount[1].innerHTML) + parseInt(threadCount[2].innerHTML) + parseInt(threadCount[3].innerHTML) + parseInt(threadCount[4].innerHTML) + parseInt(threadCount[5].innerHTML);
      var recruitingCount = parseInt(threadCount[6].innerHTML) + parseInt(threadCount[7].innerHTML) + parseInt(threadCount[8].innerHTML) + parseInt(threadCount[9].innerHTML);
      var generalCount = parseInt(threadCount[10].innerHTML) + parseInt(threadCount[11].innerHTML) + parseInt(threadCount[12].innerHTML);
      var regionalCount = parseInt(threadCount[13].innerHTML) + parseInt(threadCount[14].innerHTML) + parseInt(threadCount[15].innerHTML) + parseInt(threadCount[16].innerHTML) + parseInt(threadCount[17].innerHTML) + parseInt(threadCount[18].innerHTML) + parseInt(threadCount[19].innerHTML) + parseInt(threadCount[20].innerHTML);
      var privateCount;
      privateCount = 0;
      for(var i=21;i<threadCount.length;i++){
         privateCount = privateCount + parseInt(threadCount[i].innerHTML)
      }
      var forums = getElementsByClassName('forums',document);
      
      var span = document.createElement('span');
      span.setAttribute("style","float:right;margin-top:-20px;padding-right:25px;");
      span.innerHTML = "thread count = " + goalLineBlitzCount;      
      forums[0].parentNode.insertBefore(span, forums[0].nextSibling);
      
      span = document.createElement('span');
      span.setAttribute("style","float:right;margin-top:-20px;padding-right:25px;");
      span.innerHTML = "thread count = " + recruitingCount;
      forums[1].parentNode.insertBefore(span, forums[1].nextSibling);
      
      span = document.createElement('span');
      span.setAttribute("style","float:right;margin-top:-20px;padding-right:25px;");
      span.innerHTML = "thread count = " + generalCount;
      forums[2].parentNode.insertBefore(span, forums[2].nextSibling);
      
      span = document.createElement('span');
      span.setAttribute("style","float:right;margin-top:-20px;padding-right:25px;");
      span.innerHTML = "thread count = " + regionalCount;
      forums[3].parentNode.insertBefore(span, forums[3].nextSibling);
      
      span = document.createElement('span');
      span.setAttribute("style","float:right;margin-top:-20px;padding-right:25px;");
      span.innerHTML = "thread count = " + privateCount;
      forums[4].parentNode.insertBefore(span, forums[4].nextSibling);      
      
   }else{
      // check for subforums
      var threadCount = getElementsByClassName('thread_count',document);
      if(threadCount.length > 0){
         var tCount;
         tCount = 0;
         for(var i=0;i<threadCount.length;i++){
            tCount = tCount + parseInt(threadCount[i].innerHTML)
         }
         var forums = getElementsByClassName('forums',document);
         
         var span = document.createElement('span');
         span.setAttribute("style","float:right;margin-top:-20px;padding-right:15px;");
         span.innerHTML = "thread count = " + tCount;      
         forums[0].parentNode.insertBefore(span, forums[0].nextSibling);
      }
      
      var postCount = getElementsByClassName('post_count',document);
      var pCount;
      pCount = 0;
      for(var i=0;i<postCount.length;i++){
         pCount = pCount + parseInt(postCount[i].innerHTML)
      }
      
      var threads = document.getElementById("threads");
      
      // add a clear to allow page div to align correctly
      var div = document.createElement('div');
      div.setAttribute("class","clear");
      div.innerHTML = "&nbsp;";
      threads.parentNode.insertBefore(div, threads.nextSibling);
      
      var span = document.createElement('span');
      span.setAttribute("style","float:right;padding-right:15px;");
      span.innerHTML = "thread count = " + pCount;      
      threads.parentNode.insertBefore(span, threads.nextSibling);      
   }
   
   var subhead = getElementsByClassName('subhead_link_bar',document);
},timeout);

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