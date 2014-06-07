// Copyright (c) Nicolas Hoizey 2011-2014
// Released under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported licence (CC BY-NC-SA 3.0)
// http://creativecommons.org/licenses/by-nc-sa/3.0/
//
// Better500px
// UserScript to enhance 500px.com
// http://lab.gasteroprod.com/Better500px-UserScript/
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
// @name          Better500pxShowFavs
// @namespace     com.gasteroprod.lab.500px
// @description   Enhances 500px.com with fav indicators on thumbs
// @version       1.0.0
// @include       http://500px.com/*
// @exclude       http://500px.com/photo/*
// @exclude       http://500px.com/fresh*
// @exclude       http://500px.com/stories
// @exclude       http://500px.com/blog
// @exclude       http://500px.com/market*
// @exclude       http://500px.com/upgrade
// ==/UserScript==

(function(window) {
  var token = false;

  jQuery("head").append("\
    <style>\
    .photo.loading { opacity: .5; }\
    .photo .fav { position: absolute; top: 3px; right: 3px; width: 18px; height: 18px; font-size: 14px; line-height: 1.1; text-align: center; overflow: hidden; }\
    .photo .fav0 { background: #ccc; }\
    .photo .fav1 { background: #6c6; }\
    </style>\
    ");

  setInterval(function loadPhotoInfos() {
    // Check if the user is connected and known
    var profileLink = jQuery('body.logged_in [data-ga-action=Username]');
    if (profileLink.length > 0) {
      if (!token) {
        // Get the auth token
        token = encodeURIComponent(jQuery("meta[name=csrf-token]").attr('content'));
      }
      // Check if this is a page with a list of photos
      if (jQuery('body.logged_in .photos .photo').length > 0) {
        // Show for 3 of the remaining photos if it is already a favorite
        jQuery('.photo').not('.Better500pxShowFavs').not('.loading').slice(0, 3).each(function () {
          var that = jQuery(this),
              photoId = that.attr('data-photo-id'),
              jsonUrl = 'https://api.500px.com/v1/photos/' + photoId + '/voted_and_favorited_state?authenticity_token=' + token;
          that.addClass('loading');
          jQuery.ajax({
            dataType: "json",
            url: jsonUrl,
            context: that,
            success: function(data) {
                if (data.favorited) {
                  $(this).append('<div class="fav fav1">Y</div>');
                } else {
                  $(this).append('<div class="fav fav0">N</div>');
                }
              },
            error: function (jqxhr, textStatus, error) {
                console.log("Request Failed: " + textStatus + ", " + error);
                $(this).append('<div class="fav fav0">?</div>');
              },
            complete: function () {
                $(this).addClass('Better500pxShowFavs').removeClass('loading');
              }
          });
        });
      }
    }
  }, 500);
}(window));

