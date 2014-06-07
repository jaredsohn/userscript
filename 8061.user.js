// ==UserScript==
// @name           Quickbase blog entry title
// @namespace      http://onemorebug.com/greasemonkey/qblog-entry-title.user.js
// @description    On QBlog (an Intuit Quickbase blog), put the title of the post in the title of the page.  It's very annoying to me that QBlog only puts the entry number of a post in the page title.  When I go back and look at my URL history, I can't tell where I've been.  It's even more annoying when bookmarked!
// @include        https://www.quickbase.com/db/*r=*
// ==/UserScript==

(function () {
  var entryTitle = document.getElementById('tdf_0');
  var entryAuthor;
  if (entryTitle != null) {
    //I would like to also include the post's author.  
    for(var i=0;i<document.links.length;i++){
      if (document.links[i].parentNode.className == 'cminfo') {
	entryAuthor = '(' + document.links[i].innerHTML + ')';
	break;
      }
    }
    document.title = entryTitle.innerHTML + ' ' + entryAuthor + ' - ' + document.title;
  }
})();
