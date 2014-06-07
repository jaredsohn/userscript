// ==UserScript==
// @name           MyAnimeList.net - Forum Pagination Fix (kinda)
// @namespace      http://malakai.hu/
// @description    Tries to fix the pagination in the forum, where MAL misses to add the new page when it should.
// @include        http://myanimelist.net/forum/?topicid=*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// ==/UserScript==

var posts = $('.postnum');
if ( posts.length === 20 ) {
  // topicInfo should contain at least topicid, additionally could contain pages and show
  var topicInfo = (function() {
    var oRet = {'length':0},
        // get the search string as an array
        params = window.location.search.substr(1).split('&');

    // add the search parameters as properties to the return object
    for ( var i = 0, l = params.length; i < l; i++ ) {
      var param = params[i].split('=');
      if ( /^\d+$/.test(param[1]) ) {
        oRet[param[0]] = parseInt(param[1]);
      } else {
        oRet[param[0]] = param[1];
      }
      oRet.length++;
    }

    return oRet;
  })();

  // get show if it isn't in topicInfo
  if ( typeof topicInfo.show === 'undefined' )
    topicInfo.show = parseInt(posts.text(), 10) - 1;

  var paginationTop = $('#content > div.borderClass:first > div:last');
  topicInfo.lastOpen = false;

  // get pages if it isn't in topicInfo
  if ( typeof topicInfo.pages === 'undefined' ) {
    if ( paginationTop.is(':visible') ) {
      // pagination displayed, grab the number of pages from there
      topicInfo.pages = parseInt(paginationTop.text().match(/\((\d+)\)/)[1], 10);
    } else {
      // no pagination means it's the first page
      topicInfo.pages = 1;
    }
  }

  if ( topicInfo.pages > 1 && !( /»\s*$/.test(paginationTop.text()) ) ) {
    // is the open page the last from all?
    topicInfo.lastOpen = true;
  }

  // create the new link into the pagination element and init the appendable container
  var newLink = $('<a></a>'),
      appendData;
  // set the href for the new page
  console.log(typeof topicInfo.show);
  newLink.attr('href', function(i,a) {
    return '?topicid='+(topicInfo.topicid)+'&pages='+(topicInfo.pages+1)+'&show='+(topicInfo.pages*20);
  });

  // setup the data to append
  if ( topicInfo.pages === 1 ) {
    // first page, the whole pagination should be added
    newLink.text('2 »');
    paginationTop.text('Pages (2) [1] ')
                 .append(newLink);
  } else if ( topicInfo.lastOpen ) {
    // last page is opened, add the next page sign too
    newLink.text(topicInfo.pages+1+' »');
    paginationTop.append(newLink);
  } else if ( /^\s*Last\s*»\s*$/.test(paginationTop.children('a:last').text()) ) {
    // first page is opened from many, modify the "Last »" and put not the newLink but the original last there
    var href = newLink.attr('href');
    newLink.attr('href', paginationTop.children('a:last').attr('href')).text(topicInfo.pages);
    paginationTop.children('a:last').attr('href', href).prepend(' ').before(newLink);

  } else {
    // not the last or first is open, put the last page link before the next page link
    newLink.text(topicInfo.pages+1);
    paginationTop.children('a:last').prepend(' ').before(newLink);
  }

  $('#content > div:last').prev('div').children('div:last').html(paginationTop.html());
}
