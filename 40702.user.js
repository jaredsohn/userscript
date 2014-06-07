// FlickrCommonsRecommendations
// version 0.2
// 2009-01-25
// Copyright (c) 2009, Ryan Gallagher <clickykbd@indicommons.org>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// IF YOU ARE UPGRADING FROM A PREVIOUS VERSION OF THIS SCRIPT, go to
// Tools/Manage User Scripts and manually uninstall the previous
// version before installing this one.  This script lacks an auto-update
// prompt.
//
// Go here for latest version:
// http://userscripts.org/scripts/show/40702
// 
// To uninstall, go to Tools/Manage User Scripts, select this script,
// and click Uninstall.
//
// --------------------------------------------------------------------
// What It Does:
//
// www.flickr.com (photo page):
// 
// On a flickr photo page.  It tests to see if the photo is a member
// of "The Commons" [http://www.flickr.com/commons/].  If so it
// displays a list of recommended photos based on what else the people
// who recently favorited this one also favorited.  Unlike the similar
// "Cross-Recommendations" script, this one is Commons specific and
// only shows other Commons photos.
//
// This script utilizes the Flickr API [http://www.flickr.com/services/api]
// and is not necessarily effecient because digging for "commons photos"
// within people's favorites takes some data processing and flickr exposes
// no methods to get to them quickly.
//
// Inspired and Adapted From:
// 
// The wonderful "Cross Recommendations" Script by Simon Whitker which
// I also recommend and does not conflict with this script.
// http://userscripts.org/scripts/show/35134
//
// --------------------------------------------------------------------
// ToDo:
//
//  * translate the heading phrase into flickr languages.
//  * watch the Key Stats, perhaps script is too API demanding?
//
// --------------------------------------------------------------------
// ChangeLog:
//
// 20090125 v0.2
//  * Now smarter, attempts to avoid re-showing you photos you have
//    recently favorited.  Should keep the new content coming.
//    This requires you to be logged into flickr, otherwise old method.
//  * New default display as a "sidebar" panel with 9 images.  Old method
//    still available if you edit the config variables.
//  * Changed method for scoping the flickr globals, now uses unsafeWindow
//  * New flickr globals depreciated old NSID & LANG detection methods.
//  * Abstracted CSS for easier user editing.
// 20090118 v0.1
//  * initial version.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name           FlickrCommonsRecommendations
// @namespace      http://www.indicommons.org
// @description    See more "The Commons" photos recently favorited by people who like the one you are viewing.
// @include        http://*.flickr.*/photos/*/*
// @include        http://flickr.*/photos/*/*
// ==/UserScript==

// --------------------------------------------------------------------
// Definitions.

var _COMMONS_REC_DISPLAY_SIDEBAR_  = 'sidebar'; // sidebar display method
var _COMMONS_REC_DISPLAY_MAIN_     = 'main'; // below photo display method

// --------------------------------------------------------------------
// User Configurable Preferences
//
// Note: PEOPLE_DEPTH and DRILL_DEPTH will impact performance if large.

// Uncomment desired method for displaying recommendations. Options:
var COMMONS_REC_DISPLAY = _COMMONS_REC_DISPLAY_SIDEBAR_;
//var COMMONS_REC_DISPLAY = _COMMONS_REC_DISPLAY_MAIN_;

// Flickr API Key: (use your own if you like)
var COMMONS_REC_API_KEY = 'c8d93e3f32223364d3e39b0de510f2ce';

// "shoot for" this many recommendations, 6 to 36 are good numbers, multiples
// of 6 allow for nice spacing and presentation.
var COMMONS_REC_MAX_IMAGES = 9; // default 6

// examine this many other "favoriters", changing this can be expensive but
// greatly improves chances of finding the max number of recommendations
var COMMONS_REC_PEOPLE_DEPTH = 20; // (50 max imposed by flickr)

// among the people, look this deep in recent favs.  Also can be expensive
// so be careful with large numbers.  Only adjust up if you are frequently
// seeing photos that do not hit your max recommendations amount.
var COMMONS_REC_DRILL_DEPTH = 50; // (500 max imposed by flickr)

// if you are logged in.  Do not show images that are already your favorites
// by looking back in your favorites history this many entries.  This will
// help you keep seeing new things as you browse, but allow ones you've
// long forgotten about to be shown (reminded) to you again.
var COMMONS_REC_USER_FAVORITES_DEPTH = 200; // (500 max imposed by flickr)

// Default CSS for output, feel free to customize.
var CSS_DISPLAY = new Array();
var CSS_DEFAULT = '\
div.CommonsRecommendations{\
}\
div.CommonsRecommendations div.CommonsRecommendationsPhoto{\
}\
div.CommonsRecommendationsPhoto img{\
}\
div.CommonsRecommendationsPhoto a{\
  margin-right: 3px !important;\
  margin-bottom: 3px !important;\
}\
';
// CSS (per display method)
CSS_DISPLAY[_COMMONS_REC_DISPLAY_MAIN_] = '\
.CommonsRecommendationsHeader{}\
';
CSS_DISPLAY[_COMMONS_REC_DISPLAY_SIDEBAR_] = '\
div.CommonsRecommendations {\
}\
div.CommonsRecommendations p {\
}\
.CommonsRecommendationsHeader {\
  display: block !important;\
  color: #666666 !important;\
  font-size: 14px !important;\
  margin-bottom: 8px !important;\
}\
';

// --------------------------------------------------------------------
// Script Proper.

// container for imported globals from page/window.
var FLICKR_GLOBALS = new Array();

window.addEventListener("load", function() { FlickrCommonsRecommendations_add_panel() }, false);

// container function for whole script.
var FlickrCommonsRecommendations_add_panel = function() {

  var defaultLang       = 'en-us'; // a fall-back
  var lang              = '';
  var user_nsid         = null;
  var photos_to_ignore  = new Array();

  var txtHeading        = 'Commons, recent viewer favorites:';

  var strings = new Array();
  // fixme, add other language strings.
  strings[txtHeading] = new Array();
  strings[txtHeading]['zh-hk'] = txtHeading;
  strings[txtHeading]['de-de'] = txtHeading;
  strings[txtHeading]['en-us'] = txtHeading;
  strings[txtHeading]['es-us'] = txtHeading;
  strings[txtHeading]['fr-fr'] = txtHeading;
  strings[txtHeading]['ko-kr'] = txtHeading;
  strings[txtHeading]['pt-br'] = txtHeading;

  var appendStyles = function (css) {
    // function for appending a style block containing css definitions
    var myStyle = document.createElement('style');
    myStyle.setAttribute('type', 'text/css');

    //multi-line string
    myStyle.innerHTML = '<!-- ' + css + ' -->';

    head = document.getElementsByTagName('HEAD')[0];
    head.appendChild(myStyle);
    return;
  }

  var getFlickrGlobals = function() {
    // get global values from window object, a script block from flickr
    // declares all this stuff, Dump it into a local array.
    // Included all flickr uses, uncommented are ones this script uses.
    if (unsafeWindow) var w = unsafeWindow;
      else var w = window;

    var r = new Array();
    if (w.global_magisterLudi) {
      //r['magisterLudi'] = w.global_magisterLudi;
      //r['auth_hash'] = w.global_auth_hash;
      //r['auth_token'] = w.global_auth_token;
      //r['flickr_secret'] = w.global_flickr_secret;
      //r['slideShowVersion'] = w.global_slideShowVersion;
      //r['slideShowCodeVersion'] = w.global_slideShowCodeVersion;
      //r['slideShowVersionV2'] = w.global_slideShowVersionV2;
      //r['slideShowCodeVersionV2'] = w.global_slideShowCodeVersionV2;
      //r['slideShowTextVersion'] = w.global_slideShowTextVersion;
      //r['slideShowVersionV3'] = w.global_slideShowVersionV3;
      //r['slideShowVersionV4'] = w.global_slideShowVersionV4;
      //r['disable_slideshow4'] = w.global_disable_slideshow4;
      r['nsid'] = w.global_nsid;
      //r['ispro'] = w.global_ispro;
      //r['dbid'] = w.global_dbid;
      //r['name'] = w.global_name;
      //r['expire'] = w.global_expire;
      //r['icon_url'] = w.global_icon_url;
      //r['tag_limit'] = w.global_tag_limit;
      //r['collection_depth_limit'] = w.global_collection_depth_limit;
      //r['stewartVersion'] = w.global_stewartVersion;
      //r['contact_limit'] = w.global_contact_limit;
      //r['eighteen'] = w.global_eighteen;
      //r['group_limit'] = w.global_group_limit;
      //r['photos_ids_limit'] = w.global_photos_ids_limit;
      //r['one_photo_show_belongs'] = w.one_photo_show_belongs;
      //r['prefs_isset_viewgeo'] = w.prefs_isset_viewgeo;
      //r['photos_url'] = w.photos_url;
      //r['disable_stewart'] = w.disable_stewart;
      //r['disable_geo'] = w.disable_geo;
      //r['rper'] = w.global_rper;
      //r['widget_carets'] = w.global_widget_carets;
      //r['explore_search'] = w.global_explore_search;
      r['intl_lang'] = w.global_intl_lang;
      //r['_photo_root'] = w._photo_root;
      //r['_site_root'] = w._site_root;
      //r['_images_root'] = w._images_root;
      //r['_intl_images_root'] = w._intl_images_root;
      //r['do_bbml'] = w.do_bbml;
    }
    return r;
  }

  var _strings = function(idx, lang_id, src) {
    // function translation lookup, takes string index, source array.
    if (src[idx][lang_id]) return src[idx][lang];
    else return idx;
  }
 
  // get the basics.
  var current_photo_id  = location.pathname.split('/')[3];
  var nodePhoto         = document.getElementById('photoImgDiv' + current_photo_id);

  // if no photo node, must not be photo page?
  if (!nodePhoto)
    return;

  // if no commons license graphic, not a commons photo page?
  var xp = 'count(//img[contains(@class, "fs-icon_no_known_restrictions")])';
  var xpr = document.evaluate( xp, document, null, XPathResult.ANY_TYPE, null);
  if (!xpr.numberValue >= 1)
    return; // no commons photo page, die.

  // set the flickr globals.
  FLICKR_GLOBALS = getFlickrGlobals();

  // get flickr globals (and user nsid)
  if (FLICKR_GLOBALS['nsid']) user_nsid = FLICKR_GLOBALS['nsid'];

  // set language for UI translations.
  if (FLICKR_GLOBALS['intl_lang']) lang = FLICKR_GLOBALS['intl_lang'];
    else lang = defaultLang;

  // add CSS
  appendStyles(CSS_DEFAULT);
  appendStyles(CSS_DISPLAY[COMMONS_REC_DISPLAY]);

  // build UI element containers based on display preferences.
  var nodeCommons = document.createElement('div');
  nodeCommons.setAttribute('class', 'CommonsRecommendations');
  var nodePhotos = document.createElement('div');
  nodePhotos.setAttribute('class', 'CommonsRecommendationsPhoto');

  // hide it for now, show it if we find stuff later.
  nodeCommons.style.display = 'none';

  // display specific 'main' method.
  if (_COMMONS_REC_DISPLAY_MAIN_ == COMMONS_REC_DISPLAY) {
    var nodeComments = document.getElementById('DiscussPhoto');
    var nodeHeader = document.createElement('h3');
    nodeHeader.setAttribute('class', 'CommonsRecommendationsHeader');

    nodeHeader.innerHTML = _strings(txtHeading, lang, strings);
    nodeCommons.appendChild(nodeHeader);
    nodeCommons.appendChild(nodePhotos);
    nodeComments.parentNode.insertBefore(nodeCommons, nodeComments);
  }

  // display specific 'sidebar' method.
  if (_COMMONS_REC_DISPLAY_SIDEBAR_ == COMMONS_REC_DISPLAY) {
    var nodeOtherContexts = document.getElementById('otherContexts_div');
    var nodeHeader = document.createElement('p');
    nodeHeader.setAttribute('class', 'CommonsRecommendationsHeader');

    nodeHeader.innerHTML = _strings(txtHeading, lang, strings);
    nodeCommons.appendChild(nodeHeader);
    nodeCommons.appendChild(nodePhotos);
    nodeOtherContexts.parentNode.insertBefore(nodeCommons, nodeOtherContexts);
  }

  // be smarter and ignore photos logged in user has recently favorited.
  // note: due to cache update speeds there is some delay before the
  // absolute latest favorited photos stop appearing.
  if (user_nsid) {
    GM_xmlhttpRequest({
      method: 'GET',

      // flickr.favorites.getPublicList
      url:    'http://api.flickr.com/services/rest/'
             +'?method=flickr.favorites.getPublicList'
             +'&api_key=' + COMMONS_REC_API_KEY
             +'&format=json&nojsoncallback=1'
             +'&user_id=' + user_nsid
             +'&page=1&per_page=' + COMMONS_REC_USER_FAVORITES_DEPTH
             +'&extras=license',

      onload: function(getUserListResponse) {
        var data = eval('(' + getUserListResponse.responseText + ')');
        var photos = data.photos.photo;
        for (var i = 0; i < photos.length; i++) {
          var photo = photos[i];
          if (photos_to_ignore[photo.id] || photo.license != 7) {
            continue;
          } else {
            photos_to_ignore[photo.id] = 1;
          }
        }
      } // end onload
    }); // end xmlhttpRequest
  } // endif

  // hit the api for 10 recent favoriters
  GM_xmlhttpRequest({
    method: 'GET',

    // flickr.photos.getFavorites
    url:    'http://api.flickr.com/services/rest/'
           +'?method=flickr.photos.getFavorites'
           +'&api_key=' + COMMONS_REC_API_KEY
           +'&format=json&nojsoncallback=1'
           +'&photo_id=' + current_photo_id
           +'&page=1&per_page=' + COMMONS_REC_PEOPLE_DEPTH,

    onload: function(responseDetails) {
      var data = eval('(' + responseDetails.responseText + ')');
      var people = data.photo.person;
      var photo_count = 0;

      if (!(people && people.length > 0))
        return; // no other favoriters.

      var max_photos_per_person = Math.ceil(COMMONS_REC_MAX_IMAGES / people.length);

      // an array of photos to ignore, including current photo
      // append new photos as we discover them before moving on to
      // the next person.
      photos_to_ignore[current_photo_id] = 1;

      // for each person, look for other favorites (in the comons)
      for (var i = 0; i < people.length; i++) {

        GM_xmlhttpRequest({
          method: 'GET',

          // flickr.favorites.getPublicList
          url:    'http://api.flickr.com/services/rest/'
                 +'?method=flickr.favorites.getPublicList'
                 +'&api_key=' + COMMONS_REC_API_KEY
                 +'&format=json&nojsoncallback=1'
                 +'&user_id=' + people[i].nsid
                 +'&page=1&per_page=' + COMMONS_REC_DRILL_DEPTH
                 +'&extras=license',

          onload: function(getPublicListResponse) {
            var data = eval('(' + getPublicListResponse.responseText + ')');
            var photos = data.photos.photo;
            var photo_count_this_user = 0;

            for (var i = 0; i < photos.length; i++) {
              var photo = photos[i];

              if (photos_to_ignore[photo.id] || photo.license != 7) {
                continue; // keep looking
              } else if (
                ++photo_count_this_user > max_photos_per_person
                ||
                ++photo_count > COMMONS_REC_MAX_IMAGES
                ) { 
                return; // we have enough photos.
              }

              // append this to the ignore list.
              photos_to_ignore[photo.id] = 1;

              // build square thumbnail url.
              var photo_url = 'http://farm' + photo.farm
                            + '.static.flickr.com/'
                            + photo.server + '/'
                            + photo.id + '_' + photo.secret + '_s.jpg';

              // build photo-page url.
              var page_url = '/photos/' + photo.owner + '/' + photo.id + '/';

              // build img element.
              var img = document.createElement('img');
              img.setAttribute('src', photo_url);
              img.setAttribute('border', 0);
              img.setAttribute('width', 75);
              img.setAttribute('height', 75);
              img.setAttribute('alt', photo.title);

              // build link element.
              var a = document.createElement('a');
              a.setAttribute('href', page_url);
              a.setAttribute('title', photo.title);
              a.setAttribute('class', 'contextThumbLink');

              // attach img to link.
              a.appendChild(img);

              // attach link photos container.
              nodePhotos.appendChild(a);
              
              // we have something to display, unhide.
              nodeCommons.style.display = 'block';
            }
          }
        }); // end xmlhttpRequest
      }
    }
  }); // end xmlhttpRequest
}
