// ==UserScript==
// @id             www.dailymotion.com-42e0c072-f078-4276-8f84-952524d36896@http://foobar.com/baz
// @name           Dailymotion: BETA Included By Feature
// @version        0.9.4
// @namespace      http://foobar.com/baz
// @author         David Toso
// @description    ...
// @include        http://www.dailymotion.com/video/*
// @require        http://code.jquery.com/jquery-1.9.1.min.js
// @run-at         document-end
// ==/UserScript==

// TODO: 
//  1. reverse order of lookup+render of playlist review. Instead do render (placeholder), lookup, re-place (preview & details)

(function($){
  var doc = unsafeWindow.document;

  // Wait for element given by selector to become available
  var waitFor = function(selector, cb) {
    if ($(selector, doc).get(0)) return cb();
    else setTimeout(function(){ waitFor(selector, cb); }, 200);
  };

  // interate pair-wise through the given list
  var iter_pairwise = function(list, pair_cb) {
    var pair = [], i=0;
    while (i<list.length) {
      pair.push(list[i++]);
      if (i < list.length) pair.push(list[i++]);
      pair_cb(pair[0], pair[1]); pair = [];
    }
  };

  // Get useful details about the playlist
  var getPlaylistDetails = function(playlist_id, playlist_title, playlist_owner, cb) {
    GM_xmlhttpRequest({ 
      method: 'GET',
      url:    'http://www.dailymotion.com/playlist/'+playlist_id,
      onload:  function (res) {
        var video_id, video_title, video_image;

        // build DOM object for playlist page 
        var listPage = $(res.responseText);

        // extract relevant info from DOM
        var listOwner   = $('div.playlist_infos > a.name',listPage).html();
        var listVideos;   $('div.playlist_infos',listPage).each(function(){ $(this).html().replace(/(\d+) videos?/, function(_m, _nv) { listVideos = _nv; }); });
        var previewElem = $('a.preview_link > img.preview',listPage).eq(0);
        var video_image = previewElem.attr('data-src');
        var video_title = previewElem.attr('title');
        var video_id;     previewElem.attr('data-spr').replace(/\/([0-9]+):jpeg_preview_sprite.jpg/, function(_m, _vid) { video_id = _vid*1; });

        // emit playlist information
        cb({ playlist_id: playlist_id, title: playlist_title, owner: listOwner, size: listVideos }, /* returns: playlist:     { playlist_id, title, owner, size   } */
           { video_id: video_id, preview: video_image, title: video_title });                       /*          previewVideo: { video_id, title, previewImageURL  } */
      }
    });
  }; 

  // Get N'th page of playlists (10 per page).
  var getPlaylists = function(video_id, page_no, cb) {
    GM_xmlhttpRequest({
      method: "GET",
      url: "https://api.dailymotion.com/video/"+video_id+"/playlists?page="+page_no+"&limit=10",
      onload: function(res) {
        var obj = JSON.parse(res.responseText);
        cb(obj.list, (page_no > 1), obj.has_more); // returns: list, priorPages?, subsequentPages?
      }
    });
  };

  // determine your username if logged in
  var myUser; $('div.dm_login_info a.media-block',doc).each(function(){ $(this).attr('href').replace(/^\/(.*)/, function(_m, _usr) { myUser = _usr; }); });

  // fix tab styles (Dailymotion just plain broke this for all users)
  $('head',doc).append('<style type="text/css"> ul.mo_tabs > li > a { position: relative; z-index: 9999; } </style>');

  // Render a single playlist preview inside the given elem
  var display_playlist_preview = function(elem, playlist, preview) {
    var ownerStyle = (myUser === playlist.owner) ? 'color: white; background-color: #0079B8; ' : 'color: #42AEDC';
    elem.append(
      '<table style="width: 293px; height: 85px; border-collapse: collapse; border: 0px; margin: 0px; margin-left: 6px; display:none"><tr>'+
          '<td style="width:136px;"><a href="http://www.dailymotion.com/playlist/'+playlist.playlist_id+'" style="width: 136px;">'+
               '<img style="width: 136px; height: 80px;" src="'+preview.preview+'" alt="'+preview.title+'"></a></td>'+
          '<td align="left" valign="top" style="padding-left: 5px; width: 157px;">'+
              '<a style="font-size: 12px; font-weight: bold; color: #0079B8" href="http://www.dailymotion.com/playlist/'+playlist.playlist_id+'">'+playlist.title+'</a><br>'+
              '<span style="font-size: 11px; color: black;">by <a href="http://www.dailymotion.com/'+playlist.owner+'" style="'+ownerStyle+'">'+playlist.owner+'</a></span><br>'+
              (playlist.size ? playlist.size+' video'+(playlist.size > 1 ? 's' : '') : '')+'</td>'+
      '</tr></table>').children('table').fadeIn(1000);
  };

  // Add playlist preview to container
  var add_playlist_preview = function(container, pl_entry) {
    if (pl_entry == undefined) return;
    container.append('<div id="myPlaylists_pl_'+pl_entry.id+'" style="display: inline-block; width: 293px; margin: 0px; padding: 0px; "></div>');
    getPlaylistDetails(pl_entry.id, pl_entry.name, pl_entry.owner, function(playlist, preview){  
      display_playlist_preview($('#myPlaylists_pl_'+playlist.playlist_id, doc), playlist, preview); 
    }); 
  };

  // Add prev/next page navigation link
  var add_navigation = function(container, elem, video_id, label, pageNo, loadingElem, prevElem, nextElem) {
    elem.html('<a style="font-family: arial; font-size: 13px;" href="javascript:void(0)">'+label+'</a>').children('a').click(function(){
      render_playlists_page(container, video_id, parseInt(pageNo) + 1, loadingElem, prevElem, nextElem);
    });
  };

  // Render a page of playlists previews
  var render_playlists_page = function(container, video_id, pageNo, loadingElem) {
    
    // display loading indicator
    loadingElem.html('<p>Loading<span style="text-decoration: blink">...</span></p>');                

    // get pageNo of full lists of playlists which include this video
    getPlaylists(video_id, pageNo, function(list, canGoPrev, canGoNext){                              

      // panel layout
      container.find('.myPlaylists_loading').remove();
      container.find('.myPlaylists_listing').remove();
      container.append('<ul class="myPlaylists_listing" style="margin-top: 10px"></ul>');
      var listing = $('.myPlaylists_listing', doc); 
  
      // navigation interface
      $('.myPlaylists_navigation').remove();
      var navStyle = 'width: 595px; height: 15px; position: relative; top: 5px;';
      listing.before('<table class="myPlaylists_navigation" style="'+navStyle+'"><tr><td align="left" style="padding-left: 5px;" class="myPlaylists_goBack"></td><td align="right" class="myPlaylists_goForward"></td></tr></table>');
      listing.after('<table class="myPlaylists_navigation" style="'+navStyle+'"><tr><td align="left" style="padding-left: 5px;" class="myPlaylists_goBack"></td><td align="right" class="myPlaylists_goForward"></td></tr></table>');
      var prevElem = container.find('.myPlaylists_goBack'), nextElem = container.find('.myPlaylists_goForward');
      if (canGoPrev) add_navigation(container, prevElem, video_id, '<span class="pagination_arrow">◄</span> previous',   parseInt(pageNo) - 1, loadingElem, prevElem, nextElem);
      if (canGoNext) add_navigation(container, nextElem, video_id, 'next <span class="pagination_arrow">►</span>', parseInt(pageNo) + 1, loadingElem, prevElem, nextElem);

      // add playlist previews in two columns of 5 videos each
      iter_pairwise(list, function(left, right) { 
        var li = $('<li style="margin-left: 10px; padding: 5px;"></li>', doc); 
        listing.append(li); add_playlist_preview(li, left); add_playlist_preview(li, right);
      });
    });
  };

  // when the video tabs are availale...
  waitFor('.pl_video_tabs ul.mo_tabs', function(){

    // find tabs & corresponding panels
    var tabs = $('.pl_video_tabs ul.mo_tabs', doc);
    var panels = $('.pl_video_tabs', doc);

    // add new 'Included By' tab, and corresponding panel (myPanel)
    tabs.append('<li><a id="tab_myplaylists" href="">Included By</a></li>');
    panels.append('<div id="tab_myplaylists_content" class="pl_video_tabmyplaylists tab_content column span-8 last clearfix" style="display: none"></div>');
    var myPanel = $('#tab_myplaylists_content', doc);

    // add title to new panel & loading message
    myPanel.append('<h3 class="tab_title clearfix" style="clear:both; margin-left: 18px; font-weight: normal; font-size: 13px; color: #0079B8; font-family: arial;">All playlists which include this video</h3>');
    myPanel.append('<p class="myPlaylists_loading"></p>');

    // get the video id for the current page!
    var video_id; $('link[rel="canonical"]', doc).eq(0).attr('href').replace(/\/video\/([^_]+)/, function (_m, _vid) { video_id = _vid; });

    // render the first page of playlist previews
    render_playlists_page(myPanel, video_id, 1, $('.myPlaylists_loading'));


  }); // waitfor
})(jQuery);



