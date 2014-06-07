// Copyright (c) Nicolas Hoizey 2011-2012
// Released under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported licence (CC BY-NC-SA 3.0)
// http://creativecommons.org/licenses/by-nc-sa/3.0/
//
// Better500px
// UserScript to enhance 500px.com
// http://dev.gasteroprod.com/Better500px-UserScript/
//
// Author
// Nicolas Hoizey <nicolas@hoizey.com>
// http://gasteroprod.com/
//
// --------------------------------------------------------------------
// This is a UserScript.
//
// To install it on Firefox, you need the Greasemonkey addon:
//   http://greasemonkey.mozdev.org/
// Nothing is needed to install it on Chrome
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Better500px
// @namespace     com.gasteroprod.dev.500px
// @description   Enhances 500px.com
// @version       2.2.1
// @include       http://500px.com/*
// @include       http://*.500px.com/*
// ==/UserScript==

var better500px = function () {
  var isConnected = false,
      username = '',
      allLoaded = false,
      sortByDateHtml = '',
      sortByHighestHtml = '',
      sortByCurrentHtml = '',
      sortByVotesHtml = '',
      sortByFavsHtml = '',
      isUserGallery = new RegExp('^http://500px.com/[^/]+$'),
      isFreshPhotos = new RegExp('^http://500px.com/fresh.*$');

  jQuery("head").append("\
    <style>\
    .photo_thumb .fav { position: absolute; top: 3px; right: 3px; width: 18px; height: 18px; overflow: hidden; }\
    .photo_thumb .fav img { box-shadow: none; }\
    \
    .container .col { position: relative; }\
    .sortby { position: absolute; left: 500px; bottom: 0; }\
    .sortby ul { display: inline; }\
    .sortby li { display: inline; padding: .3em; }\
    .sortby li:after { content: ','; }\
    .sortby li:last-child:after { content: none; }\
    .sortby .active { font-weight: bold; }\
    .sortby a { cursor: pointer; }\
    .sortby .loading { padding-left: 20px; background: url('/unity/img/spinners/loader-small.gif') no-repeat left; }\
    </style>\
    ");

  if (!isFreshPhotos.exec(location.href)) {
    // check if the user is connected and get his username
    if (jQuery('#username').length != 0) {
      var isConnected = true;
      var username = jQuery('#username a').eq(0).attr('href').replace(/.*\//, '');

      // check if this is a page with a list of photos
      if (jQuery('.photo_thumb').length > 0) {

        setInterval(function loadPhotoInfos(){
          // show for each photo if it is already a favorite
          jQuery('.photo_thumb').not('.better500px').not('.loading').slice(0, 3).each(function () {
            var that = jQuery(this);
            that.addClass('loading');
            var url = that.find('a').eq(0).attr('href');
            jQuery.ajax({
              url: url,
              context: that
            }).done(function(html) {
              // show the red or grey heart on top right corner of the thumbnail
              var favStatus = jQuery('#vote_button_fav .button[style!="display:none;"] img', html);
              this.append('<div class="fav"></div>').find('.fav').append(favStatus);
              // store photo info as data attributes
              var current = jQuery('#photo_rating_score', html).text();
              var highest = jQuery('#photo_highest_rating', html).text();
              var views = jQuery('.stats .views strong', html).text();
              var votes = jQuery('#photo_rating_total_votes strong', html).text();
              var favs= jQuery('#photo_rating_favs strong', html).text();
              this.data('stats', { current: current, highest: highest, views: views, votes: votes, favs: favs });
              html = null;
              this.addClass('better500px').removeClass('loading');
            });
            that = null;
            url = null;
          });
        }, 300);

        // check if this is a user gallery page
        if (isUserGallery.exec(location.href)) {
          // add sorting links on top of the gallery
          jQuery('.tabs').after('<div class="sortby">Sort by<ul><li class="active"><a class="date">date</a></li><li><a class="highest">highest score</a></li><li><a class="current">current score</a></li><li><a class="favs">favorites</a></li><li><a class="votes">votes</a></li></ul></div>');
          jQuery('.sortby a').bind('click', function() {
            var that = jQuery(this);
            var type = that.attr('class');
            var previousType = jQuery('.sortby li.active a').attr('class');
            if (type != previousType) {
              jQuery('.sortby li').removeClass('active');
              that.parent().addClass('active');
              switch(type) {
                case 'date':
                  if (sortByDateHtml != '') {
                    jQuery('.photo_thumb').replaceWith(sortByDateHtml);
                  }
                  break;
                case 'highest':
                  if (sortByHighestHtml != '') {
                    jQuery('.photo_thumb').replaceWith(sortByHighestHtml);
                  } else {
                    jQuery('.sortby .highest').parent().addClass('loading');
                    loadAll(sortByHighest);
                  }
                  break;
                case 'current':
                  if (sortByCurrentHtml != '') {
                    jQuery('.photo_thumb').replaceWith(sortByCurrentHtml);
                  } else {
                    jQuery('.sortby .current').parent().addClass('loading');
                    loadAll(sortByCurrent);
                  }
                  break;
                case 'favs':
                  if (sortByFavsHtml != '') {
                    jQuery('.photo_thumb').replaceWith(sortByFavsHtml);
                  } else {
                    jQuery('.sortby .favs').parent().addClass('loading');
                    loadAll(sortByFavs);
                  }
                  break;
                case 'votes':
                  if (sortByVotesHtml != '') {
                    jQuery('.photo_thumb').replaceWith(sortByVotesHtml);
                  } else {
                    jQuery('.sortby .votes').parent().addClass('loading');
                    loadAll(sortByVotes);
                  }
                  break;
                default:
                  // what?
              }
            }
          });
          sortByDateHtml = jQuery('.rightside .photos').clone();
        }
      }
    }

    var loadAll = function loadAll(loadAllCallback) {
      var nextPage = jQuery(".next_page").attr("href");
      if (nextPage == null || nextPage == undefined) {
        jQuery('.pager').remove();
        if (sortByDateHtml === '') {
          sortByDateHtml = jQuery('.photo_thumb').clone();
        }
        loadAllCallback();
        return;
      } else {
        jQuery(".next_page").attr("href", null);
        jQuery.get(nextPage, function (data) {
          var jData = jQuery(data);
          jData.find(".photo_thumb").insertAfter(".photo_thumb:last");
          jQuery(".pager").replaceWith(jData.find(".pager"));
          loadAll(loadAllCallback);
        });
      }
    }

    var sortByHighest = function sortByHighest() {
      if (jQuery('.photo_thumb').not('.better500px').length > 0) {
        setTimeout(sortByHighest, 300);
      } else {
        jQuery('.sortby .loading').removeClass('loading');
        $('.photo_thumb').sortElements(function(a, b){
          var aValue = $(a).data('stats').highest;
          var bValue = $(b).data('stats').highest;
          aValue = (aValue == 'N/A') ? 0 : parseInt(aValue, 10);
          bValue = (bValue == 'N/A') ? 0 : parseInt(bValue, 10);
          return aValue > bValue ? -1 : 1;
        });
        sortByHighestHtml = jQuery('.photo_thumb').clone();
      }
    }

    var sortByCurrent = function sortByCurrent() {
      if (jQuery('.photo_thumb').not('.better500px').length > 0) {
        setTimeout(sortByCurrent, 300);
      } else {
        jQuery('.sortby .loading').removeClass('loading');
        $('.photo_thumb').sortElements(function(a, b){
          var aValue = $(a).data('stats').current;
          var bValue = $(b).data('stats').current;
          aValue = (aValue == 'N/A') ? 0 : parseInt(aValue, 10);
          bValue = (bValue == 'N/A') ? 0 : parseInt(bValue, 10);
          return aValue > bValue ? -1 : 1;
        });
        sortByCurrentHtml = jQuery('.photo_thumb').clone();
      }
    }

    var sortByFavs = function sortByFavs() {
      if (jQuery('.photo_thumb').not('.better500px').length > 0) {
        setTimeout(sortByFavs, 300);
      } else {
        jQuery('.sortby .loading').removeClass('loading');
        $('.photo_thumb').sortElements(function(a, b){
          var aValue = $(a).data('stats').favs;
          var bValue = $(b).data('stats').favs;
          aValue = (aValue == 'N/A') ? 0 : parseInt(aValue, 10);
          bValue = (bValue == 'N/A') ? 0 : parseInt(bValue, 10);
          return aValue > bValue ? -1 : 1;
        });
        sortByFavsHtml = jQuery('.photo_thumb').clone();
      }
    }

    var sortByVotes = function sortByVotes() {
      if (jQuery('.photo_thumb').not('.better500px').length > 0) {
        setTimeout(sortByVotes, 300);
      } else {
        jQuery('.sortby .loading').removeClass('loading');
        $('.photo_thumb').sortElements(function(a, b){
          var aValue = $(a).data('stats').votes;
          var bValue = $(b).data('stats').votes;
          aValue = (aValue == 'N/A') ? 0 : parseInt(aValue, 10);
          bValue = (bValue == 'N/A') ? 0 : parseInt(bValue, 10);
          return aValue > bValue ? -1 : 1;
        });
        sortByFavsHtml = jQuery('.photo_thumb').clone();
      }
    }
  }
}

var jQueryScript = document.createElement('script');
jQueryScript.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');
jQueryScript.addEventListener('load', function () {
  var sortElementsScript = document.createElement('script')
  sortElementsScript.setAttribute('src', 'https://raw.github.com/padolsey/jQuery-Plugins/master/sortElements/jquery.sortElements.js');
  sortElementsScript.addEventListener('load', function() {
    var better500pxScript = document.createElement('script');
    better500pxScript.textContent = '(' + better500px.toString() + ')();';
    document.body.appendChild(better500pxScript);
  }, false);
  document.body.appendChild(sortElementsScript);
}, false);
document.body.appendChild(jQueryScript);
