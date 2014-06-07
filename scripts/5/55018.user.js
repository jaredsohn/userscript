// ==UserScript==
// @name           CoH Forum Mod
// @namespace      tag:fleetingwhisper@cohtitan.com,2009-08-03:CoH
// @description    Modifies the forum display of a CoH forum; "Forum Tools" dropdown replaced by "Mark Read", Thread titles link to newest post.
// @include        http://boards.cityofheroes.com/forumdisplay.php?f=*
// @include        http://boards.cityofheroes.com/search.php?searchid=*
// @include        http://boards.cityofheroes.com/usercp.php
// ==/UserScript==


// Forum Tools becomes Mark Forum Read
var forumTools, markRead, markReadLink, url;

url = window.location.href;
if(url.indexOf('?') < 0)
  url += '?';
else
  url += '&';
url += 'do=markread';
url = url.substring(url.lastIndexOf('/') + 1);
forumTools = document.getElementById('forumtools');
if(forumTools)
{
  markRead = document.createElement('td');
  markRead.setAttribute('style', 'cursor: pointer');
  markRead.setAttribute('class', 'vbmenu_control');
  markRead.setAttribute('id', 'forumtools');
  markRead.setAttribute('nowrap', 'nowrap');
  
  markReadLink = document.createElement('a');
  markReadLink.setAttribute('href', url);
  markReadLink.setAttribute('rel', 'nofollow');
  forumNumber = url.substring(url.indexOf('f=') + 2);
  forumNumber = parseInt(forumNumber);
  markReadLink.setAttribute('onClick', 'return mark_forum_read(' + forumNumber + ');');
  markReadLink.appendChild(document.createTextNode('Mark Forum Read'));
  markRead.appendChild(markReadLink);
  
  forumTools.parentNode.replaceChild(markRead, forumTools);
}


//==============================================================================


// Thread link becomes Go to Unread
var links = document.getElementsByTagName('a');
var lastNewpost;
for(i = 0; i < links.length; i++)
{
  var id = links[i].id;
  if(id.indexOf('thread_title_') == 0) // Thread title link
  {
    if(id.substring(id.lastIndexOf('_') + 1) == lastNewpost)
    {
      links[i].href += '&goto=newpost';
    }
    else
    {
      lastNewpost = '';
    }
  }
  else if(id.indexOf('thread_gotonew_') == 0) // Go to new post link
  {
    lastNewpost = id.substring(id.lastIndexOf('_') + 1);
  }
}
