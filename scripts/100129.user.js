// ==UserScript==
// @name           Strip hashtags + produce hashtag list
// @namespace      http://userscripts.org/users/72113
// @description    Strips the hashtags from the hash character in displayed posts; and produces a list of hashtags at the end of the posts
// @include        https://www.joindiaspora.com/*
// @include        https://joindiaspora.com/*
// ==/UserScript==
// 
// written by oli@joindiaspora.com
// IMPORTANT: Insert the name of your pod instead of joindiaspora.com :)

 posts=document.getElementsByClassName("stream_element")
 for (i_post=0;i_post<posts.length;i_post++) {
   mypost=posts[i_post].getElementsByTagName("p")[0];
   mypost.innerHTML=mypost.innerHTML + '<br><span class="taglist"></span>' ;
   mytaglist= mypost.getElementsByClassName('taglist')[0] ;
   mytags=mypost.getElementsByClassName("tag");
   for (i=0;i<mytags.length;i++) {
     var temp=mytags[i].innerHTML;
     tagname=temp.substring(1,temp.length) ;
     mytags[i].innerHTML=tagname ;
     mytags[i].style.fontWeight = 'normal';
     mytags[i].style.borderBottom = "none" ;
     mytags[i].stylebackgroundColor = "none" ;
     var s2 = '<a href="../tags/' + tagname +'">#' + tagname + '</a>' ;
     if (i>0) {s2 = ', ' + s2; }
     else {s2 = 'Tags: ' + s2; }
     mytaglist.innerHTML = mytaglist.innerHTML + s2 ;
     // mytaglist.style.borderBottom = " dotted #3f8fba 1px";
   }
   mytaglist.style.fontWeight = 'bold' ;
 }

