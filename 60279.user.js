// ==UserScript==
// @name           New nettby
// @namespace      legger "logg", "varsler", "status" og "venner pålogget" tilbake under logg/dashboard
// @include        http://www.nettby.no*
// @exclude        http://www.nettby.no/user/dashboard_*
// ==/UserScript==
var d=document;
var images=d.getElementsByTagName('img');
var links=d.getElementsByTagName('a');

for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Varsler") {
  links[i].innerHTML=" ";
  links[i].style.color="#00FF00"; {
   if(links[i].href='/user/action_private_log.php');
   break;
  }
 }
}


for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/icons/14/status.png")
{images[i].src="";}}


for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Status") {
  links[i].innerHTML=" ";
  links[i].style.color="#00FF00"; {
   if(links[i].href='/user/friends_status.php');
   break;
  }
 }
}

for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Status") {
  links[i].innerHTML=" ";
  links[i].style.color="#00FF00"; {
   if(links[i].href='/user/friends_status.php');
   break;
  }
 }
}

for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/icons/14/notifications.png")
{images[i].src="";}}

