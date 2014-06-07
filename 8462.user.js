// ==UserScript==

// @name           Flickr Group Discussion: Easy Delete

// @author         Stephen Fernandez aka steeev http://flickr.com/photos/steeev
// @namespace      http://steeev.f2o.org/flickr

// @description    Makes it easier to delete posts from Flickr group discussions

// @include        http://www.flickr.com/groups/*/discuss/*

// @include        http://flickr.com/groups/*/discuss/*

// ==/UserScript==


( function () {

target=document.getElementById('GoodStuff');
if(!target)
  return;

unsafeWindow.propadelete=function(link) {
  if( !confirm('Are you sure you want to delete it?'))
    return false;

  data='magic_cookie=' + unsafeWindow.global_auth_hash+ '&done=1';
  delink=link.getAttribute('href');
  hostname=location.href.split('/')[2];
  apiurl="http://" + hostname + delink ;

  p = new XMLHttpRequest();
  p.open("POST", apiurl, false);
  p.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  p.setRequestHeader('referer',apiurl);
  p.send(data);

  if (p.responseText) {
    //alert(p.responseText) 
    if(p.responseText.match('The reply has been deleted')) {
      link.parentNode.innerHTML='<font color=red>----- This post has been DELETED! -----</font>';
    }
    else 
      if  (p.responseText.match('The topic has been deleted')) {
        alert('The topic has been deleted');
        location.href='http://' + hostname+'/groups/' + document.location.href.split('/')[4] + /discuss/;
      }
    else
      alert('Error deleting item');
  }
   return false;
}

// add delete function to onclick property of all delete links
var allDivs, thisDiv;
allDivs = document.evaluate("//small/a", target, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
  thisDiv = allDivs.snapshotItem(i);
  if((thisDiv.innerHTML=='delete')||(thisDiv.innerHTML=='delete topic'))
    thisDiv.setAttribute('onClick',"propadelete(this);return false;");
}


}) ();
