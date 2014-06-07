// ==UserScript==
// @name           Cat and Girl Comment Hider
// @namespace      http://userscripts.org/users/351005
// @description    Selectively hide users who comment at Cat and Girl based on the name they post with.
// @include        http://catandgirl.com/*
// @include        http://www.catandgirl.com/*
// ==/UserScript==

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

GM_log("Beginning comment screening for Cat and Girl.");

var ignored = [ 's. t.', 'Justin' ];
var cites = document.getElementsByTagName('cite');

var holderList = undefined;

for (i = 0; i < cites.length; i++)
{
  var thisCommentIgnored = false;

  comment = cites[i].parentNode;

  if (String.toLowerCase(comment.nodeName) != 'li')
    continue;

  commenter = cites[i].textContent;

  GM_log("- Evaluating comment by " + commenter);

  for (j = 0; j < ignored.length; j++)
  {
    if (commenter == ignored[j]) {
       GM_log("-- Hiding comment " + i);
       holderList = hideComment(comment, holderList);
       thisCommentIgnored = 1;
       break;
    }

  }

  if (!thisCommentIgnored)
    holderList = undefined;

}

function setCommentText(holderList)
{
  var hiddenCount = holderList.children.length - 1;
  var holdNote = holderList.children[0].children[0];
  var hidden =
    (holderList.children[1].style.display == 'none') ?
     "hidden" : "shown";

  if (hiddenCount != 1) {
     holdNote.innerHTML = hiddenCount + " " + hidden + " comments.";
  } else {
     holdNote.innerHTML = hidden.capitalize() + " comment.";
  }
}

function hideComment(hideMe, holderList)
{
  var isNewList = false;

  if (!holderList) {

    holderList = document.createElement('ol');
    holderList.setAttribute('class', 'commentlist');
    var holdNote = document.createElement('li');
    holdNote.style.listStyle = 'disc';
    holdNote.innerHTML = "<span>Hidden comment</span>";
    var holdNoteSpan = holdNote.children[0];
    holdNoteSpan.style.borderBottom = '1px dotted';
    holdNoteSpan.style.cursor = 'pointer';
    holdNote.addEventListener('click', hiddenNoteClicked, true);
    holderList.appendChild(holdNote);

    var commentList = hideMe.parentNode;
    commentList.insertBefore(holderList, hideMe);

    isNewList = true;

  }

  hideMe.parentNode.removeChild(hideMe);
  holderList.appendChild(hideMe)
  hideMe.style.display = 'none';
  hideMe.style.paddingLeft = '2em';

  if (!isNewList)
    setCommentText(holderList);

  return holderList;

}

function hiddenNoteClicked()
{
   GM_log("Click event registered with a this of " + this);

   var parentList = this.parentNode;
   var hidden = (parentList.children[1].style.display == 'none');

   if (hidden) {
     showList(parentList);
   } else {
     rehideList(parentList);
   }

   setCommentText(parentList);
}

function rehideList(theList)
{
   // Start index at 1 so the explanatory/clicky item is still visible
   for (i = 1; i < theList.children.length; i++)
   {
      var shownComment = theList.children[i];
      shownComment.style.display = 'none';
   }
}

function showList(theList)
{
   for (i = 0; i < theList.children.length; i++)
   {
      var shownComment = theList.children[i];
      shownComment.style.display = 'list-item';
   }
}

