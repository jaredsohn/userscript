// ==UserScript==
// @name        Danbooru 2 Tweaks
// @description Various Danbooru 2 tweaks to add new features and make some existing features more accessible. Tweaks can be disabled individually.
// @version     2013.07.10
// @namespace   kittey
// @grant       none
// @include     https://danbooru.donmai.us/*
// @include     http://danbooru.donmai.us/*
// @include     http://hijiribe.donmai.us/*
// @include     http://sonohara.donmai.us/*
// @include     http://www.donmai.us/*
// @include     http://donmai.us/*
// ==/UserScript==


// =====================================
// Settings (kind of)
// =====================================

function tweaks() {
  // -----------------------------------
  // Misc changes
  // -----------------------------------

  // Add hotkey for note creation (Ctrl+[char])
  //addNewNoteHotkey('e');

  // Submit search forms by pressing enter in a drop-down selector
  //addSearchEnterSubmit();

  // Add tag chunk search mode
  addTagChunkSearch();

  // Add links to the tag list to remove and edit tags. Has one configuration parameter:
  // hidePM: true:  hides the + - links that modify the current search query
  //         false: doesn't hide those links
  addTagEditLinks(false);

  // Add little icon overlays to thumbnails to display status information. Has two configuration parameters:
  // useMouseover:    true:  only display overlay when pointing at the corresponding thumbnail tile
  //                  false: always display all overlays
  // removeRedundant: true:  removes the status icon for the status shown by the thumbnail's border
  //                  false: shows an icon for the same status as the thumbnail's border
  addThumbnailOverlays(true, true);

  // Change tab/window titles on post pages. First parameter sets mode. If the second parameter is greater than 0, it limits the tags per type.
  // Mode 0: #ID
  // Mode 1: All tags, ordered by type
  // Mode 2: All tags besides general tags, ordered by type
  // Mode 3: CHARACTERS from COPYRIGHTS drawn by ARTIST
  // Mode 4: CHARACTERS (COPYRIGHTS) drawn by ARTIST
  // Mode 5: copy:(COPYRIGHTS) char:(CHARACTERS) art:(ARTISTS)
  changePostTitle(0, 0);

  // Colorize uncommon gentags with a usage count below this number
  //colorizeGentags(6);

  // Focus search box on artist/tag/pool listings
  //focusSearchBox();

  // Ignore comments by certain users. Separate multiple users with |
  //ignoreUserComments("exampleuser");

  // Blank the image when clicking on the resize link so that the loading progress is visible
  resizeBlanking();
}

function commentTweaks() {
  // -----------------------------------
  // Comment-related tweaks, which will be reapplied after using the "Show all comments" link
  // -----------------------------------

  // Change dates from absolute ISO time to "?? ago", with the ISO time in a tooltip
  changeDates();

  // Show comment scores
  showCommentScores();
}


// =====================================
// End of settings; do not edit anything below here
// =====================================


// Debug mode shows alerts on various error conditions.
var dbgTweaks = false;

// Image container node, can be used to check whether we're actually viewing an image.
var imgContainer;

// Cache image node to speed things up because it's used several times.
var img;

// Post ID
var postId;


// -------------------------------------
// Misc helper functions
// -------------------------------------

function loadTweaks() {
  try {

    // Get image container node into global variable
    imgContainer = document.getElementById('image-container');

    // Get image node into global variable
    img = document.getElementById('image');

    // Get post ID into global variable
    var postids = document.getElementsByName('post-id');
    if (postids.length == 0) {
      postId = -1;
    } else {
      postId = postids[0].content;
    }

    // Apply tweaks
    tweaks();
    commentTweaks();

    // install handler to reapply tweaks after previously hidden comments have been loaded
    if (imgContainer) { // "Show all comments" links only on post pages, I think
      var commentNotice = document.getElementById('threshold-comments-notice-for-'+postId);
      if (commentNotice) {

        function checkCommentNoticeHide(event) {
          try {
            if (event.relatedNode && (event.relatedNode.ownerElement == commentNotice)
                && (event.attrName == 'style') && (event.newValue == 'display: none;')) {
              commentNotice.removeEventListener('DOMAttrModified', checkCommentNoticeHide, true);
              commentTweaks();
            } else {
              if (dbgTweaks) {
                var str = 'Unexpected ' + type;
                str += '\nattrChange: '+e.attrChange;
                str += '\nattrName: '+e.attrName;
                str += '\nnewValue: '+e.newValue;
                str += '\nprevValue: '+e.prevValue;
                str += '\nrelatedNode: '+e.relatedNode;
                alert(str);
              }
            }
          } catch(err) {
            if (dbgTweaks) alert('Danbooru 2 Tweaks broke: ' + err.message);
            throw err;
          }
        }

        commentNotice.addEventListener('DOMAttrModified', checkCommentNoticeHide, true);
      }
    }
  } catch(err) {
    if (dbgTweaks) alert("Danbooru 2 Tweaks broke: " + err.message);
    throw err;
  }
}

function runScript() {
  // Check if we're on a JSON, XML or atom page, which we shouldn't mess with
  var path = location.pathname;
  if ((document.body === undefined) || (path.indexOf('.atom', path.length-5) >= 0)) return;

  // If this script is run at document load time, install an event handler to
  // apply the tweaks later. Otherwise, go ahead with applying the tweaks now.
  if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', loadTweaks, false);
  } else {
    loadTweaks();
  }
}

runScript();


function escRegExp(regExp) {
  return regExp.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}


function addGlobalStyle(css) {
  try {
    var elmHead, elmStyle;
    elmHead = document.getElementsByTagName('head')[0];
    elmStyle = document.createElement('style');
    elmStyle.type = 'text/css';
    elmHead.appendChild(elmStyle);
    elmStyle.innerHTML = css;
  } catch (e) {
    if (!document.styleSheets.length) {
      document.createStyleSheet();
    }
    document.styleSheets[0].cssText += css;
  }
}


// -------------------------------------
// Add hotkey for note creation
// -------------------------------------

function addNoteKeypress(event, keyChar) {
  if (!event.ctrlKey || String.fromCharCode(event.charCode) != keyChar) return;
  event.preventDefault();

  var noteEdgeLength = 102;

  var noteX = window.innerWidth/2 - noteEdgeLength/2 - img.offsetLeft + event.pageX;
  var noteY = window.innerHeight/4                   - img.offsetTop  + event.pageY;

  var xLimit = img.width  - noteEdgeLength;
  var yLimit = img.height - noteEdgeLength;

  if (noteX > xLimit) noteX = xLimit;
  if (noteX < 0     ) noteX = 0;
  if (noteY > yLimit) noteY = yLimit;
  if (noteY < 0     ) noteY = 0;

  var scriptString = "javascript:(" + function (nX, nY, length) {
    Danbooru.Note.create(nX, nY, length, length);
  } + ")(" +noteX+ "," +noteY+ "," +noteEdgeLength+ ");";

  location.replace(scriptString);
}

function addNewNoteHotkey(keyChar) {
  if (!img) return; // no image here

  window.addEventListener('keypress', function (ev) {addNoteKeypress(ev,keyChar);}, true);
}


// -------------------------------------
// Submit search forms by pressing enter in a drop-down selector
// -------------------------------------

function addSearchEnterSubmit() {
  if (location.pathname != "/tags") return;

  var searchSort = document.getElementById('search_category');
  if (!searchSort) {
    if (dbgTweaks) alert('search_category box not found');
    return;
  }

  searchSort.addEventListener('keypress', function(event) {
    if (event.keyCode == 13) {
      searchSort.form.submit();
      return false;
    } else {
      return true;
    }
  }, false);
}


// -------------------------------------
// Add tag chunk search mode
// -------------------------------------

function addTagChunkSearch() {
  var paginator = document.getElementsByClassName('paginator');
  if (paginator.length == 0) return; // no paginator, nothing to mess with

  var tagSearch = document.getElementById('tags');
  if (!tagSearch) return; // not on a post search page

  paginator = paginator[paginator.length-1];
  if (paginator.tagName != 'DIV') return;

  tagSearch = tagSearch.value;

  var idIndex = tagSearch.indexOf('id:');
  if (idIndex < 0) return; // no ID search
  if ((idIndex > 0) && (tagSearch.charAt(idIndex-1) != ' ')) return; // 'id:' not start of word :-?

  var idStrEnd = tagSearch.indexOf(' ', idIndex+3);
  var idStr = idStrEnd < 0 ? tagSearch.substring(idIndex) : tagSearch.substring(idIndex, idStrEnd);

  var idDots = idStr.indexOf('..', 3);
  if (idDots < 0) return; // no ID range

  var prevRange = null;
  var nextRange = null;

  if ((idDots == 3) || (idDots+3 > idStr.length)) { // open ID range
    var thumbArticles = document.getElementsByClassName('post-preview');
    var thumbsLength = thumbArticles.length;
    if (thumbsLength == 0) return; // no posts, can't get IDs

    var minId = maxId = parseInt(thumbArticles[0].getAttribute('data-id'));
    var id;

    for (i=1; i<thumbsLength; i++) {
      id = parseInt(thumbArticles[i].getAttribute('data-id'));
      if (id < minId) minId = id;
      if (id > maxId) maxId = id;
    }

    if (minId > 1) {
      prevRange = 'id:..' + (minId-1);
    }
    nextRange = 'id:' + (maxId+1) + '..';
  } else { // closed ID range
    var idStart = parseInt(idStr.substring(3, idDots));
    var idEnd = parseInt(idStr.substring(idDots+2));
    var range = idEnd - idStart + 1;

    if (idStart > 1) {
      prevRange = 'id:' + (idStart-range) + '..' + (idStart-1);
    }
    nextRange = 'id:' + (idEnd+1) + '..' + (idEnd+range);
  }

  var menu = document.createElement('menu');
  var url = window.location.href.replace(/%3A/gi, ':').replace(/page=\d*/, 'page=1');

  var newLi;

  if (prevRange) {
    newLi = document.createElement('li');
    newLi.innerHTML = '<a href="' + url.replace(idStr, prevRange) + '">' + prevRange + '</a>';
    menu.appendChild(newLi);
  }

  newLi = document.createElement('li');
  newLi.innerHTML = '<span>' + idStr + '</span>';
  menu.appendChild(newLi);

  newLi = document.createElement('li');
  newLi.innerHTML = '<a href="' + url.replace(idStr, nextRange) + '">' + nextRange + '</a>';
  menu.appendChild(newLi);

  var newPag = document.createElement('div');
  newPag.className = 'paginator';
  newPag.style.paddingTop = '0';
  newPag.appendChild(menu);

  paginator.parentNode.insertBefore(newPag, paginator.nextSibling);
}


// -------------------------------------
// Add links to the tag list to remove and edit tags
// -------------------------------------

function removeTagFromEditbox(xLink) {
  var tagEditBox = document.getElementById('post_tag_string');
  if (!tagEditBox) {
    if (dbgTweaks) alert("Can't find tag edit textarea");
    return;
  }

  var tagEsc = escRegExp(xLink.getAttribute('danbooruTag'));
  tagEditBox.value = tagEditBox.value.replace(/^|$/gm, ' ').replace(new RegExp(' '+tagEsc+' ', 'gm'), ' ').replace(/^ *\r?\n|^ +| +$/gm, '') + ' ';

  xLink.parentNode.style.opacity = '0.2';
}

function editTag(arrLink) {
  var tagEditBox = document.getElementById('post_tag_string');
  if (!tagEditBox) {
    if (dbgTweaks) alert("Can't find tag edit textarea");
    return;
  }

  var tag = arrLink.getAttribute('danbooruTag');
  var paddedTagString = ' '+tagEditBox.value+' ';
  var tagPos = paddedTagString.search(new RegExp('[\n\r ]'+escRegExp(tag)+'[\n\r ]', 'gm'));

  var caretPos = ((tagPos < 0) ? tagEditBox.value.length : tagPos+tag.length);

  // Switch to edit mode if necessary
  if (tagEditBox.offsetTop == 0) {
    var editLink = document.getElementById('post-edit-link');
    if (!editLink) {
      alert('Edit link not found');
      return;
    }

    var evt = document.createEvent("HTMLEvents");
    evt.initEvent('click', false, false); // event type, not bubbling, not cancelable

    if (!editLink.dispatchEvent(evt)) {
      if (dbgTweaks) alert('edit click dispatch failed');
    }
  }

  tagEditBox.setSelectionRange(caretPos, caretPos);

  if (tagEditBox.offsetTop < window.pageYOffset) {
    tagEditBox.scrollIntoView(true); // scroll in from top
  }
  if ((tagEditBox.offsetTop + tagEditBox.offsetHeight) > (window.pageYOffset + window.innerHeight)) {
    tagEditBox.scrollIntoView(false); // scroll in from bottom
  }

  tagEditBox.focus();
}

function createTagEditLink(text, danbooruTag, func, title) {
    var newElem = document.createElement('a');
    newElem.innerHTML = text;
    newElem.title = title;
    newElem.style.marginRight = '0.3em';
    newElem.setAttribute('danbooruTag', danbooruTag);
    newElem.href = null;
    newElem.setAttribute('onclick', 'return false;');
    newElem.addEventListener('click', function() { func(this); }, true);
    return newElem;
}

function addTagEditLinks(hidePM) {
  if (!imgContainer) return; // not on a post page

  var tagList = document.getElementById('tag-list');
  if (!tagList) {
    if (dbgTweaks) alert('tag-list not found');
    return;
  }

  var tagLinks = tagList.getElementsByClassName('search-tag');
  var tagLink, siblings, danbooruTag, frag;
  for (i=0, l=tagLinks.length; i<l; i++) {
    tagLink = tagLinks[i];
    siblings = tagLink.parentNode.childNodes;

    danbooruTag = tagLink.innerHTML.replace(/\s+/g, '_');

    frag = document.createDocumentFragment();
    frag.appendChild(createTagEditLink('x'   , danbooruTag, removeTagFromEditbox, 'Remove from tag edit box'));
    frag.appendChild(createTagEditLink('&gt;', danbooruTag, editTag             , 'Jump to tag edit box'    ));

    // Get rid of the extra space right of the wiki link
    siblings[1].nodeValue = '';

    if (siblings.length > 7) {
      if (hidePM) {
        siblings[5].nodeValue = '';
        siblings[4].style.display = 'none';
        siblings[3].nodeValue = '';
        siblings[2].style.display = 'none';
      }
      tagLink.parentNode.insertBefore(frag, siblings[6]);
    } else {
      tagLink.parentNode.insertBefore(frag, siblings[2]);
    }
  }
}


// -------------------------------------
// Add little icon overlays to thumbnails to display status information
// -------------------------------------

function addThumbnailOverlays(useMouseover, removeRedundant) {
  var overlayStyleAdded = false;
  function addOverlay(article, overlay) {
    if (!overlayStyleAdded) {
      var overlayStyle = ' \
        .post-preview { \
          position:relative; \
        } \
        \
        .post-preview span.status-icon-overlay { \
          position:absolute; \
          width:150px; \
          left:2px; \
          top:2px; \
      ';
      if (useMouseover) overlayStyle += ' \
          visibility:hidden; \
        } \
        \
        .post-preview:hover span.status-icon-overlay { \
          visibility:visible; \
      ';
      overlayStyle += ' \
        } \
        \
        .post-preview span.status-icon-overlay table { \
          margin: 1px 1px 1px 0px !important; \
          width:16px; \
          height:16px; \
          float:right; \
        } \
        \
        table.overlay-pending { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAu0lEQVR42rWSMQqDQBBFxSKHsrSRdF7Da9h4BktLyQXEIpWFgUQQYhKCFiIWCYJFWFK9GKZLGVcs/k7xhzfM7DcMY5oWSR5gr6P1AEqRlSVVmtJkGfdxJJ8FsG3U756bDZ/jkevfgDCkryrOfc/J93lKj+OgtG5QFFykx3V5zQZ0HYVl8TbNmSuIdjta8bZbVF1Tzv7GKKITL0lotHIwDBxkslQtQBDwEM/zGLUAEqQ4ps1zboujvD5gib6viy5iUwbIcgAAAABJRU5ErkJggg==); } \
        table.overlay-flagged { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAaElEQVR42uWSsQqAMAxE87P9uP6EuIhLB4fsxalrhk6Fo5JMOqhgFsXhIAnkQe5Cnah7ZAAAwxO9ERCCoLVxfyNiXFFKAjNrfwmwutbpzLC/ANRENcxmIvNhOeflFuCJ0Q/QvD/6yh5t67kDnkVl2y8AAAAASUVORK5CYII=); } \
        table.overlay-deleted { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAARklEQVR42p2QsQ0AIAgE2X8oWyqncAEWMG+hsRCFvLl8d/AEESQIennDCaZzqelF8N18hZv3QsPKt1CxkwvskaeSvpoVYgaJ7m3ECv0pRgAAAABJRU5ErkJggg==); }  \
        table.overlay-banned  { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAZElEQVR42qWQwQ3AIAwD2aAL8ePZVZmEpaj8qCwwJEFEzgc42yL1dCRseAzghcJA/dNrBChj42ICtH8ghggg9hiGCCDtmcAQBfL+7/MC4LV5ghV7VpIQAt3VBDTvdZsAfy6AQ32M9YIPRdwD1gAAAABJRU5ErkJggg==); } \
      ';

      addGlobalStyle(overlayStyle);
      overlayStyleAdded = true;
    }
    article.appendChild(overlay);
  }

  function createNewOverlay(title, className) {
    var newElem = document.createElement('table');
    newElem.title = title;
    newElem.className = className;
    return newElem;
  }

  var articles = document.getElementsByClassName('post-preview');
  var article, flagsdata, newSpan;
  for (i=0, l=articles.length; i<l; i++) {
    article = articles[i];
    flagsdata = article.getAttribute('data-flags');

    newSpan = document.createElement('span');
    newSpan.className = 'status-icon-overlay';

    if (flagsdata.indexOf('pending') >= 0) {
      newSpan.appendChild(createNewOverlay('This post is pending approval.', 'overlay-pending'));
    }
    if (flagsdata.indexOf('flagged') >= 0) {
      newSpan.appendChild(createNewOverlay('This post has been flagged for deletion.', 'overlay-flagged'));
    }
    if (flagsdata.indexOf('deleted') >= 0) {
      newSpan.appendChild(createNewOverlay('This post was deleted.', 'overlay-deleted'));
    }

    if (removeRedundant && (newSpan.childNodes.length > 0)) {
      newSpan.removeChild(newSpan.firstChild);
    }

    // Add banned after the redundancy check because it's never shown via borders
    if (flagsdata.indexOf('banned') >= 0) {
      newSpan.appendChild(createNewOverlay('Banned artist', 'overlay-banned'));
    }

    if (newSpan.childNodes.length > 0) {
      addOverlay(article, newSpan);
    }
  }
}


// -------------------------------------
// Change dates from absolute ISO time to "?? ago" with the ISO time in a tooltip
// -------------------------------------

function changeDates() {
  // Change dates only on post and forum pages; leave histories alone
  if (!imgContainer
   && !document.getElementById('c-forum-topics')
   && !document.getElementById('c-comments')
   ) return;

  var timeNowMs = new Date().getTime();

  var timeElems = document.getElementsByTagName('time');
  var timeElem, absTime, msAgo;
  for (i=0, l=timeElems.length; i<l; i++) {
    timeElem = timeElems[i];

    absTime = timeElem.getAttribute('datetime');
    if (!absTime) {
      if (dbgTweaks) alert('no datetime attribute');
      return;
    }

    msAgo = timeNowMs - Date.parse(absTime);

    if        (msAgo <           0) {
      timeElem.innerHTML = "from the future (check your PC's clock)";
    } else if (msAgo <        60000) {
      timeElem.innerHTML = Number(msAgo/       1000).toFixed(0) + ' seconds ago';
    } else if (msAgo <       597000) { //    600000
      timeElem.innerHTML = Number(msAgo/      60000).toFixed(1) + ' minutes ago';
    } else if (msAgo <      3600000) {
      timeElem.innerHTML = Number(msAgo/      60000).toFixed(0) + ' minutes ago';
    } else if (msAgo <     35820000) { //  36000000
      timeElem.innerHTML = Number(msAgo/    3600000).toFixed(1) +   ' hours ago';
    } else if (msAgo <     86400000) {
      timeElem.innerHTML = Number(msAgo/    3600000).toFixed(0) +   ' hours ago';
    } else if (msAgo <    859680000) { // 864000000
      timeElem.innerHTML = Number(msAgo/   86400000).toFixed(1) +    ' days ago';
    } else if (msAgo <   2629800000) {
      timeElem.innerHTML = Number(msAgo/   86400000).toFixed(0) +    ' days ago';
    } else if (msAgo <  26166510000) { //26298000000
      timeElem.innerHTML = Number(msAgo/ 2629800000).toFixed(1) +  ' months ago';
    } else if (msAgo <  31536000000) {
      timeElem.innerHTML = Number(msAgo/ 2629800000).toFixed(0) +  ' months ago';
    } else if (msAgo < 313783200000) { //315360000000
      timeElem.innerHTML = Number(msAgo/31536000000).toFixed(1) +   ' years ago';
    } else {
      timeElem.innerHTML = Number(msAgo/31536000000).toFixed(0) +   ' years ago';
    }
  }
}


// -------------------------------------
// Change tab/window titles on post pages. First parameter sets mode. If the second parameter is greater than 0, it limits the tags per type.
// Mode 0: #ID
// Mode 1: All tags, ordered by type
// Mode 2: All tags besides general tags, ordered by type
// Mode 3: CHARACTERS from COPYRIGHTS drawn by ARTIST
// Mode 4: CHARACTERS (COPYRIGHTS) drawn by ARTIST
// Mode 5: copy:(COPYRIGHTS) char:(CHARACTERS) art:(ARTISTS)
// -------------------------------------

// Categories: gen:0 art:1 copy:3 char:4
function tagStringCategory(tagList, category, limit, glue) {
  var tagLis = tagList.getElementsByClassName('category-'+category);
  if (tagLis.length == 0) return '';

  if ((limit <= 0) || (limit > tagLis.length)) limit = tagLis.length;
  var tagString = '';
  var tagTags;

  for (i=0; i<limit; i++) {
    tagTags = tagLis[i].getElementsByClassName('search-tag');
    if (tagTags.length == 0) {
      if (dbgTweaks) alert('search-tag not found');
      break;
    }

    tagString += tagTags[0].innerHTML + glue;
  }

  return tagString.substring(0, tagString.length - glue.length);
}

function changePostTitle(mode, limit) {
  if (!imgContainer) return; // not viewing an image

  var tagList = document.getElementById('tag-list');
  if (!tagList) {
    if (dbgTweaks) alert('tag-list not found');
    return;
  }

  var str = '';

  switch(mode) {
  case 0:
    if (postId > 0) str = '#' + postId;
    break;
  case 1:
  case 2:
    var str = '';
    var copys = tagStringCategory(tagList, 3, limit, ' ');
    var chars = tagStringCategory(tagList, 4, limit, ' ');
    var arts  = tagStringCategory(tagList, 1, limit, ' ');

    if (copys.length > 0) str += ((str.length > 0) ? ' '+copys : copys);
    if (chars.length > 0) str += ((str.length > 0) ? ' '+chars : chars);
    if (arts.length  > 0) str += ((str.length > 0) ? ' '+arts  : arts );

    if (mode == 1) {
      var gens = tagStringCategory(tagList, 0, limit, ' ');
      if (gens.length  > 0) str += ((str.length > 0) ? ' '+gens  : gens );

      if (str.length == 0) str = 'Untagged Post';
    }
    break;
  case 3:
  case 4:
    var copys = tagStringCategory(tagList, 3, limit, ', ');
    var chars = tagStringCategory(tagList, 4, limit, ', ');
    var arts  = tagStringCategory(tagList, 1, limit, ', ');

    if (chars.length > 0) {
      if (copys.length > 0) {
        if (mode == 3) {
          str = chars + ' from ' + copys;
        } else {
          str = chars + ' (' + copys + ')';
        }
      } else {
        str = chars;
      }
    } else {
      if (copys.length > 0) {
        str = copys;
      }
    }

    if (arts.length > 0) {
      if (str.length == 0) str = 'drawn by ' + arts;
      else str += ', drawn by '+arts;
    }
    break;
  case 5:
    var copys = tagStringCategory(tagList, 3, limit, ', ');
    var chars = tagStringCategory(tagList, 4, limit, ', ');
    var arts  = tagStringCategory(tagList, 1, limit, ', ');

    if (copys.length > 0) str += ((str.length > 0) ? ' copy:(' : 'copy:(') + copys + ')';
    if (chars.length > 0) str += ((str.length > 0) ? ' char:(' : 'char:(') + chars + ')';
    if (arts.length  > 0) str += ((str.length > 0) ? ' art:('  : 'art:(' ) + arts  + ')';
    break;
  default:
    str = 'Post'
  }

  if (str.length == 0) str = 'Post';

  document.title = str + ' - Danbooru';
}


// -------------------------------------
// Colorize uncommon gentags
// -------------------------------------

function colorizeGentags(limit) {
  if (!imgContainer) return; // not on a post page

  var tagList = document.getElementById('tag-list');
  if (!tagList) {
    if (dbgTweaks) alert('tag-list not found');
    return;
  }

  var gentagLis = tagList.getElementsByClassName('category-0');
  var countSpan, postCount;
  for (i=0, l=gentagLis.length; i<l; i++) {
    countSpan = gentagLis[i].getElementsByClassName('post-count');
    if (countSpan.length == 0) continue;

    countSpan = countSpan[0];
    postCount = countSpan.innerHTML;

    if ((postCount.charAt(postCount.length-1) == 'k') || (postCount >= limit)) continue;

    countSpan.style.color = '#FF0000';
    countSpan.title = "This is an uncommon tag. Quite often this is caused by mistyped or invented \"creative\" tags. Sometimes it's just a valid but rare tag, though.";
  }
}


// -------------------------------------
// Focus search box on artist/tag/pool listings
// -------------------------------------

function focusSearchBox() {
  if ((location.pathname == "/tags") || (location.pathname == "/pools")) {
    var searchBox = document.getElementById('search_name_matches');
    if (!searchBox) {
      if (dbgTweaks) alert('tags/pools search box not found');
      return;
    }

    searchBox.focus();
  } else if (location.pathname == "/artists") {
    var searchBox = document.getElementById('search_name');
    if (!searchBox) {
      if (dbgTweaks) alert('artists search box not found');
      return;
    }

    searchBox.focus();
  }
}


// -------------------------------------
// Ignore comments by certain users. Separate multiple users with |
// -------------------------------------
function ignoreUserComments(userRegExp) {
  if (!imgContainer) return; // only hide comments on post pages

  var regExp;
  try {
    regExp = new RegExp('^' + escRegExp(userRegExp) + '$');
  } catch(err) {
    alert('The user list for the ignoreUserComments tweak is malformed: ' + err.message);
    return;
  }

  var comments = document.getElementsByClassName('comment');
  var as, comment;
  var hidSomething = false;

  for (i=0, l=comments.length; i<l; i++) {
    comment = comments[i];

    as = comment.getElementsByTagName('a');
    if (as.length < 1) {
      if (dbgTweaks) alert('Not enough links in comment');
      return;
    }

    if (regExp.test(as[0].innerHTML)) {
      comment.style.display = 'none';
      hidSomething = true;
    }
  }

  if (hidSomething) {
    var commentNotice = document.getElementById('threshold-comments-notice-for-'+postId);
    if (!commentNotice) { // Need to insert unhide link
      var linkContainer = document.getElementsByClassName('row notices');
      if (linkContainer.length == 0) {
        if (dbgTweaks) alert("Can't find row notices container for comment unhide link");
        return;
      }

      var newLink = document.createElement('a');
      newLink.href = null;
      newLink.setAttribute('onclick', 'return false;');
      newLink.innerHTML = 'Show ignored comments';

      var newSpan = document.createElement('span');
      newSpan.className = 'info';
      newSpan.appendChild(newLink);

      newLink.addEventListener('click', function() {
        newSpan.style.display = 'none';

        for (i=0, l=comments.length; i<l; i++) {
          comment = comments[i];

          if (comment.style.display == 'none') {
            comment.style.display = null;
          }
        }
      }, false);

      linkContainer[0].appendChild(newSpan);
    }
  }
}


// -------------------------------------
// Show comment scores
// -------------------------------------

function commentToScoreString(comment) {
  var score = comment.getAttribute('data-score');
  if      (score > 0) return 'Score: <font color="#00A000">+'+score+'</font>';
  else if (score < 0) return 'Score: <font color="#FF0000">' +score+'</font>';
  else                return 'Score: &plusmn;'               +score          ;
}

function showCommentScores() {
  var comments = document.getElementsByClassName('comment');
  if (comments.length > 0) {

    var comment, menuElem, voteLis, scoreElem, commentInfo, firstVoteUpLink;
    for(i=0, l=comments.length; i<l; i++) {
      comment = comments[i];

      menuElem = comment.getElementsByTagName('menu');
      if (menuElem.length == 0) {
        if (dbgTweaks) alert('no menuElem');
        break;
      }

      menuElem = menuElem[0];
      voteLis = menuElem.getElementsByTagName('li');

      if (voteLis.length == 0) { // No comment menu entries here; probably on the comment search page
        commentInfo = comment.getElementsByTagName('time');
        if (commentInfo.length == 0) {
          if (dbgTweaks) alert('comment time not found');
        } else {
          scoreElem = document.createElement('span');
          scoreElem.innerHTML = commentToScoreString(comment);
          commentInfo = commentInfo[0].parentNode;
          commentInfo.appendChild(document.createElement('br'));
          commentInfo.appendChild(scoreElem);
        }
      } else { // Comment menu entries found
        scoreElem = document.createElement('li');
        scoreElem.innerHTML = commentToScoreString(comment);

        firstVoteUpLink = document.evaluate('./li/a[@data-method and contains(@href,"votes?score=up")]', menuElem, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        if (!firstVoteUpLink) {
          if (dbgTweaks) alert("Can't find vote up link");
        } else {
          menuElem.insertBefore(scoreElem, firstVoteUpLink.singleNodeValue.parentNode);
        }
      }
    }
  } else { // no comments
    var commentlist = document.getElementsByClassName('list-of-comments');
    if (commentlist.length == 1) {
      var ps = commentlist[0].getElementsByTagName('p');
      if (ps.length == 1) {
        var commentNotice = document.getElementById('threshold-comments-notice-for-'+postId);
        if (!commentNotice) {
          ps[0].style.color = '#B3B3B3'; // dim "no comments" text
        } else {
          ps[0].innerHTML = 'There are only comments below threshold.';
        }
      }
    }
  }
}


// -------------------------------------
// Blank the image when clicking on the resize link so that the loading progress is visible
// -------------------------------------

function resizeBlanking() {
  var lnk = document.getElementById('image-resize-link');
  if (!lnk || !img) return;

  lnk.addEventListener('click', function (event) {
    setTimeout(function () { img.style.opacity = 1; }, 0);

    var notice = document.getElementById('image-resize-notice');
    if (notice) notice.style.display = 'none';

    img.setAttribute('alt', 'Loading...');
    img.removeAttribute('src');
  }, true);

  //lnk.addEventListener('click', function (event) {
  //  setTimeout(function () {
  //    src = img.getAttribute('src');
  //    img.setAttribute('src', 'data:image/gif;base64,R0lGODlhAQABAJAAAP///////ywAAAAAAQABAAACAkQBADs='); // one white pixel
  //    setTimeout(function () {
  //      img.setAttribute('alt', 'Loading...');
  //      img.removeAttribute('src');
  //      img.setAttribute('src', src);
  //    }, 0);
  //  }, 0);
  //}, true);
}
