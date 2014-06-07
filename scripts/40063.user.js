// ==UserScript==
// @name           Hide RT avatar
// @namespace      avatar
// @include        http://goallineblitz.com/game/forum_thread.pl?*
// @include        http://goallineblitz.com/game/home.pl?user_id=10142
// ==/UserScript==

var image='/game/team_pic.pl?team_id=5172';

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

function replaceImage(par){
   var els = par.getElementsByTagName("*"), saved;

   for(var i=0,j=els.length; i<j; i++){
      if (els[i].className == 'user_avatar') saved = els[i];
      if (els[i].className == 'user_name' && els[i].innerHTML.indexOf('RTJakarta')>=0) {
         var p1 = saved.innerHTML.indexOf("src=\"", 0), p2 = saved.innerHTML.indexOf("\"", p1+6), len=saved.innerHTML.length;
         saved.innerHTML=saved.innerHTML.substring(0, p1+5) + image + saved.innerHTML.substring(p2, len);
      }
   }
};


window.setTimeout( function() {

  var url=window.location.toString();
  if (url.indexOf("forum_thread.pl",0) >= 0) {
    var posts = getElementsByClassName('post_user', document);
    for (var i=0; i<posts.length; i++) 
      replaceImage(posts[i]);
  }
  else if (url.indexOf("home.pl?user_id=10142",0) >= 0) {
    var avatar = document.getElementById('user_avatar');
    var p1 = avatar.innerHTML.indexOf("src=\"", 0), p2 = avatar.innerHTML.indexOf("\"", p1+6);
    var len=avatar.innerHTML.length;
    avatar.innerHTML=avatar.innerHTML.substring(0, p1+5) + image + avatar.innerHTML.substring(p2, len);    
  }

}, 100);