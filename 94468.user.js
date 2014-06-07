// ==UserScript==
// @name           FlickrDiscussionPagr
// @namespace      vispillo
// @require        http://userscripts.org/scripts/source/78952.user.js
// @include        http://www.flickr.com/groups/*/discuss/*/*
// ==/UserScript==

var unscrolled=false;
var curloc = '';

function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = elem.offset().top;
  var elemBottom = elemTop + elem.height();

  return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function getCurElement() {
  var cur = $('table.TopicReply tr:eq(0)');
  var haveVis = false;
  $('table.TopicReply tr[valign="top"]').each(function() {
    var item = $(this);
    if (haveVis) {
      curloc = item;
      return;
    }
    else {
      if (isScrolledIntoView(item.find('h4'))) {
        haveVis = true;
        cur = item;
      }
    }
  });
  return (cur);
}

function page (target) {
    $(window).scrollTop(target.position().top);
    curloc = target;  
    unscrolled = true;
}

$(document).scroll(function () { unscrolled = false; } );

$(document).keyup(function(event) {
  if ((event.target.type != 'textarea') && (event.target.id != 'header_search_q')) {
    if (event.which == 75) {
      if (unscrolled && curloc.prev().length != 0) {
        page(curloc.prev())
      }
      else {
        page(getCurElement().prev());
      }
    } else if (event.which == 74) {
      if (unscrolled && curloc.next().attr('valign')) {
        page(curloc.next())
      }
      else {
        c = getCurElement().next();
        if (c.attr('valign')) {
          page(c);
        }
      }    
    }
  }
});

