// ==UserScript==
// @name          Дорогой дневничок
// @namespace     http://leprosorium.ru/
// @description   Я не хочу это больше видеть
// @include       http://leprosorium.ru/
// @include       http://leprosorium.ru/#
// @include       http://leprosorium.ru/pages/*
// @include       http://leprosorium.ru/comments/*
// @version       4.0
// ==/UserScript==

var fuuu = localStorage.getItem('fuuu');

// hide posts
if(fuuu) {
   var fu_posts = fuuu.split(',');
   for(var i in fu_posts) {
       var fu_post = fu_posts[i];
       if( fu_post = document.getElementById('p' + fu_post) )
           fu_post.parentNode.removeChild(fu_post);
   }
}

// edit links
var links = document.getElementsByTagName('a');
for(var i in links) {
   var link = links[i];
   if(link.getAttribute && link.getAttribute('title') == 'я не хочу это больше видеть') {
      var actione = link.getAttribute('onclick');
      actione = "var fuuu = localStorage.getItem('fuuu'); if(fuuu) fuuu = fuuu.split(','); else fuuu = []; fuuu.push('" + parseInt(actione.substr(actione.indexOf("'")+1)) + "'); localStorage.setItem('fuuu', fuuu); "; 
      if(location.href.indexOf('comments') >= 0)
         link.setAttribute('onclick', actione + "location.assign('/'); return false;");
      else
         link.setAttribute('onclick', actione + "var div = this.parentNode.parentNode.parentNode.parentNode; div.parentNode.removeChild(div); return false;");
   }
}

var divs = document.getElementsByTagName('div');
for(var i in divs) {
   var div = divs[i];
   
   // more button
   if(div.className && div.className.match(new RegExp('(\\s|^)load_more_posts(\\s|$)'))) {
      div.setAttribute('onclick', "var num_divs = document.getElementsByTagName('div').length; function wait_new_posts(){ if(num_divs == document.getElementsByTagName('div').length) window.setTimeout(wait_new_posts, 100); else { var fuuu = localStorage.getItem('fuuu'); if(fuuu) { var fu_posts = fuuu.split(','); for(var i in fu_posts) { var fu_post = fu_posts[i]; if( fu_post = document.getElementById('p' + fu_post) ) fu_post.parentNode.removeChild(fu_post); } } var links = document.getElementsByTagName('a'); for(var i in links) { var link = links[i]; if(link.getAttribute && link.getAttribute('title') == 'я не хочу это больше видеть') { var actione = link.getAttribute('onclick'); actione = parseInt(actione.substr(actione.indexOf(\"'\")+1)); if(actione){ link.setAttribute('onclick', \"var fuuu = localStorage.getItem('fuuu'); if(fuuu) fuuu = fuuu.split(','); else fuuu = []; fuuu.push('\" + actione + \"'); localStorage.setItem('fuuu', fuuu); var div = this.parentNode.parentNode.parentNode.parentNode.parentNode; div.parentNode.removeChild(div); return false;\"); } } } } } wait_new_posts();" + divs[i].getAttribute('onclick'));
   }
   
   // add ununsee link
   if(div.id == 'filter') {
      var ununsee = document.createElement('div');
      ununsee.setAttribute('onclick', "localStorage.setItem('fuuu', ''); location.reload();");
      ununsee.setAttribute('style', 'margin: 12px 0pt 0pt 15px; font-size: 10px; color: #555; cursor: pointer;');
      ununsee.setAttribute('title', 'Дважды подумай');
      ununsee.innerHTML = 'Увидеть все развиденное';
      div.appendChild(ununsee);
   }

}
