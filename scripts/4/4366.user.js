// ==UserScript==
// @name           Flickr : Show all images by this user in this pool
// @namespace      http://steeev.f2o.org/flickr/
// @description    Show all images by this user in this group's pool
// @author         Stephen Fernandez aka Steeev http://steeev.freehostia.com/  +  http://flickr.com/photos/steeev
// @include        http://www.flickr.com/photos/*/in/pool-*
// @include        http://flickr.com/photos/*/in/pool-*
// @include        http://www.flickr.com/groups_manage.gne
// @include        http://flickr.com/groups_manage.gne
// @include        http://www.flickr.com/groups/*/admin/*
// @include        http://flickr.com/groups/*/admin/*
// ==/UserScript==


(function() {

if (location.href.match(/groups_manage\.gne/) || location.href.match(/flickr\.com\/groups\/[a-z|A-Z|0-9|\-|\_]+\/admin/)) {
 // show link next to member name
  if(!document.getElementsByTagName('body')[0].innerHTML.match('<input name="id" value="'))
    return;
  groupid=document.getElementsByTagName('body')[0].innerHTML.split('<input name="id" value="')[1].split('"')[0];
  if(document.getElementById('MemberList')) {
    tds=document.getElementById('MemberList').getElementsByTagName('td');
    for(i=0;i<tds.length;i++) {
      if (tds[i].innerHTML.match('<img src="http')) {
        if (!tds[i].innerHTML.match("buddyicon.jpg#"))
          userid=tds[i].innerHTML.split("/buddyicons/")[1].split('\.jpg')[0];
        else 
          userid=tds[i].innerHTML.split("buddyicon.jpg#")[1].split('"')[0];
        tds[i+1].innerHTML+=' <small><a class=Grey href=http://flickr.com/groups/' + groupid + '/pool/' + userid + '>Pics in Pool</a></small>';
        
      }
    }
  }

}
else {

unsafeWindow.getbuddyid=function() {
//alert('hello');
dvs=document.getElementsByTagName('div');
for (i=0;i<dvs.length;i++) {
 if (dvs[i].getAttribute('class')=='Widget') {
   if (!dvs[i].innerHTML.match("buddyicon.jpg#"))
     userid=dvs[i].innerHTML.split("/buddyicons/")[1].split('\.jpg')[0];
   else 
     userid=dvs[i].innerHTML.split("buddyicon.jpg#")[1].split('"')[0];
   //alert(userid);

   return userid;
 }
}

}

h3s=document.getElementsByTagName('h3');

for (i=0;i<h3s.length;i++) 
 if (h3s[i].innerHTML.match(/photostream/)) {
   h3s[i].innerHTML+="<br><A href='http://www.flickr.com/groups/" + document.location.href.split("in/pool-")[1].split('/')[0] + "/pool/" +  unsafeWindow.getbuddyid() + ">All photos by this user in this pool</a>";
   break;
 }

} // end if


})();