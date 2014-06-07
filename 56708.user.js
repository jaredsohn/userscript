// ==UserScript==
// @name           FetLife Automatic Jump to Comment Box from 'Discussions Following'
// @version        2009/08/30
// @namespace      http://userscripts.org/users/58147
// @description    Automatically jumps to the comment box on the last page of a thread when linking from the 'Discussions Following' section of Your Groups
// @include        http://fetlife.com/groups*
// ==/UserScript==

// thanks http://www.dustindiaz.com/getelementsbyclass/
function getElementsByClass(searchClass,node,tag) {
  var classElements = new Array();
  if ( node == null )
    node = document;
  if ( tag == null )
    tag = '*';
  var els = node.getElementsByTagName(tag);
  var elsLen = els.length;
  var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
  for (i = 0, j = 0; i < elsLen; i++) {
    if ( pattern.test(els[i].className) ) {
      classElements[j] = els[i];
      j++;
    }
  }
  return classElements;
}

// make 'Last Comment' a link to the auto-updating page
var discussions = getElementsByClass('posts_of_interest',document,'ul');
if(discussions.length) {
  var threads = discussions[0].children;
  for(var i=0; i<threads.length; i++) {
    threads[i].children[2].innerHTML = '<a href="' + threads[i].children[0].href + '?comment_autojump">Last comment</a>' + threads[i].children[2].innerHTML.substr(12);
  }
}

// reload to the last page of the thread if possible
var pages = getElementsByClass('pagination',document.getElementById('group_post_comments'),'div');
if(pages.length && location.href.match("comment_autojump")) {
  var last_page = pages[0].children[pages[0].children.length-2];
  if(last_page.tagName == 'A' && !location.href.match('page='))
    location.href=location.href+'&page='+last_page.innerHTML;
}
  
// automatically jump to the comment box
var posting_buttons = document.getElementsByName('commit');
if(posting_buttons.length && location.href.match("comment_autojump"))
  posting_buttons[0].scrollIntoView(0);
  