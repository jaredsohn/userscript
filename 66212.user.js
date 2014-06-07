// FlickrCommentWhen
// version 0.2.5
// 2013-05-28
// Copyright (c) 2009, Ryan Gallagher <http://mailhide.recaptcha.net/d?k=01s3QDaQrXNmFOMTttoahPPg==&c=45a75vsPJHUAbaWaf7hEep0XEaP0u0DkmwFiSB8MBeM=>
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
// http://userscripts.org/scripts/show/66212
// 
// To uninstall, go to Tools/Manage User Scripts, select this script,
// and click Uninstall.
//
// --------------------------------------------------------------------
// What It Does:
//
// www.flickr.com (photo page & photoset comments page):
//
// This script augments the footer of each photo comment with a
// localized date/time string for the posted date.  It reflects the
// value of 'datecreate' as returned via the API for comments.
//
// This date will be GMT but displayed in your timezone depending
// on how your browser Javascript implementation handles
// 'Date.toLocaleString'.
//
// The new date text is wrapped with a hidden link that will take you
// to the commenting user's archive page for that day, nice for
// interacting with photos uploaded around the time the comment was
// left.  If they didn't upload anything that day you can always step
// back to the month level in the archives.
//
// --------------------------------------------------------------------
// Change Log:
//
// v0.1 2010-01-11
// * Initial Version
//
// v0.2 2010-01-13
// * Name changed to expand to include all comment types.
// * Added support for Set comments pages.
// * Added a linking to commenter's archive for that year/month/day 
//
// v0.2.1 2010-01-14
// * Bug fix archive link, was using a number for day of week.
//
// v0.2.2 2013-05-28
// * Major update.  Fixed to work on 2013 flickr redesign photo pages.
//   (could use a refactor, but at least it works)
//
// v0.2.3 2013-05-28
// * Modified link to direct to commenting users archive year/month,
//   instead of the year/month/day.  More likely to have photos this way.
//
// v0.2.4 2013-05-28
// * Updated header meta for TamperMonkey
//
// v0.2.5 2013-05-28
// * Fixed an oops in meta.
//
// --------------------------------------------------------------------
// To Do:
//
// * Update to include date/time string for gallery comments?
// * Update to include date/time string for group discussion posts?
//
// --------------------------------------------------------------------

// ==UserScript==
// @name           FlickrCommentWhen
// @namespace      http://www.ryangallagher.name
// @description    Add an actual date-time to flickr comments, instead of just the approx age.  They link to the archive month of the commenting user.
// @creator        Ryan Gallagher
// @date           01/11/2010
// @modified       June, 28, 2013
// @version        0.2.5
// @downloadURL	   https://userscripts.org/scripts/source/66212.user.js
// @updateURL      https://userscripts.org/scripts/source/66212.meta.js

// @run-at	   document-end
// @include        http://*.flickr.*/photos/*/*
// @exclude        http://*.flickr.*/photos/*/*/favorites*
// @exclude        http://*.flickr.*/photos/*/*/meta*
// @exclude        http://*.flickr.*/photos/*/*/stats*
// @exclude        http://*.flickr.*/photos/*/*/sizes*
// @exclude        http://*.flickr.*/photos/*/*/nearby*
// ==/UserScript==

window.addEventListener("load", function() { FlickrCommentWhen() }, false);

// wrapper function
var FlickrCommentWhen = function() { // {{{

  // specific key
  var apiKey = 'dd9ab53f739f011e7d2031ccd0eaef8e';
  var mode = '';

  // extra check, avoid extra work when includes/excludes are bad.
  if (!correctPage()) {
    return;
  }
  //alert('FlickrCommentsWhen running...');

  // otherwise do it.
  var photoId = getPhotoId();
  //alert(photoId);
  var setId = getSetId();
  //alert(setId);

  if (setId !== false && hasSetCommentNodes()) {
    //alert('doing a set: ' + setId);
    mode = 'set';
    processComments(apiKey, setId, 'flickr.photosets.comments.getList', mode);
  } else if (photoId !== false && hasCommentNodes()) {
    //alert('doing a photo: ' + photoId);
    mode = 'photo';
    processComments(apiKey, photoId, 'flickr.photos.comments.getList', mode);
  }

  return;
} // }}}

// function test for correct page
var correctPage = function() { // {{{
  var host = location.hostname;
  var path = location.pathname;

  // quickly check host first, in case includes are foobar.
  if (!host.match('flickr')) {
    return false;
  }
  // photo page test.
  if (path.match('photos\/[^\/]+\/[0-9]+\/?')) {
    return true;
  }
  // set comments page test.
  if (path.match('photos\/[^\/]+\/sets\/[0-9]+\/comments\/?')) {
    return true;
  }
  // otherwise no good.
  return false;
} // }}}

// function for get photo-id
var getPhotoId = function() { // {{{
  if (location.pathname.match('photos\/[^\/]+\/[0-9]+\/?')) {
    return location.pathname.split('/')[3];
  } else {
    return false;
  }
} // }}}

// function get set-id
var getSetId = function() { // {{{
  if (location.pathname.match('photos\/[^\/]+\/sets\/[0-9]+\/comments\/?')) {
    return location.pathname.split('/')[4];
  } else {
    return false;
  }
} // }}}

// function test for comments.
var hasCommentNodes = function() { // {{{
  var test = false;
  var xp = 'count(//ol[@id="photo-activity"]/li[@data-comment-id])';
  var xpr = document.evaluate( xp, document, null, XPathResult.ANY_TYPE, null);
  if (xpr.numberValue >= 1) {
    test = true;
  }
  //alert('page has comments test: ' + xpr.numberValue);
  return test;
} // }}}

// function test for comments.
var hasSetCommentNodes = function() { // {{{
  var test = false;
  var xp = 'count(//td[@class="Comment"]|//div[@class="comment-block"])';
  var xpr = document.evaluate( xp, document, null, XPathResult.ANY_TYPE, null);
  if (xpr.numberValue >= 1) {
    test = true;
  }
  //alert('page has comments test: ' + xpr.numberValue);
  return test;
} // }}}

// do the work.
var processComments = function(key, id, method, mode) { // {{{

  // storage arrays for date/id lookup
  var ids = new Array();
  var meta = new Array();

  // api request onload function
  var getCommentsListResponse = function(response) {
    var data = eval('(' + response.responseText + ')');

    var comments = data.comments.comment;
    for (var i = 0; i < comments.length; i++) {
      // store the part of the id used for the permalink only.
      // store unix timestamp
      var com = comments[i];

      // hacky bit to get around different attrib names returned by flickr.
      var datecreate = false;
      if (com['datecreate']) datecreate = com['datecreate'];
      if (com['date_create']) datecreate = com['date_create'];

      // store the ids in lookup array.
      ids[ids.length] = com['id'].split('-')[2];

      // store comment meta bits.
      meta[meta.length] = new Array(datecreate, com['author']);
    }
    // proceed to modifying the page.
    if (comments.length >= 1) {
      if (mode == 'set') {
        upgradeSetComments(ids.slice(),meta.slice()); // pass by value
        return;
      }
      upgradeComments(ids.slice(),meta.slice()); // pass by value
      return;
    }
  }

  // api request
  GM_xmlhttpRequest({
    method: 'GET'
    , url: 'http://api.flickr.com/services/rest/'
      + '?method=' + method
      + '&format=json&nojsoncallback=1'
      + '&api_key=' + key
      + '&photo_id=' + id // only one will be valid.
      + '&photoset_id= ' + id // only one will be valid.
    , onload: getCommentsListResponse
  });

  return;
} // }}}

// function for processing the comments with new dates.
var upgradeComments = function(ids,meta) { // {{{
  var nodes = getNodes();

  // for each node found.
  for (i = 0; i < nodes.length; i++) {
    var id = null;

    // locate the comment permalink (in order to get id)
    xp = 'descendant::a[contains(@href, "/comment") or contains(@href, "/#comment")]';
    xpr = document.evaluate(xp, nodes[i], null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (xpr.snapshotLength != 1) return false; // whoops?

    // dig out the comment id (or the part used for permalinks).
    var re = new RegExp('\/#?comment([0-9]+)\/?');
    var match = re.exec(xpr.snapshotItem(0).getAttribute('href'));
    if (match[1]) id = match[1];
    //alert(id);

    // definitely a better way to do the date lookup, just tired.
    var index = null;
    for (j = 0; j < ids.length; j++) {
      if (ids[j] == id) {
        index = j;
      }
    }

    var dateObj = new Date(meta[index][0] * 1000);

    var archiveUrl = '/photos/' + meta[index][1]
      + '/archives/date-posted/'
      + dateObj.getFullYear() + '/'
      + pad(dateObj.getMonth() + 1, 2) + '/';
    // + pad(dateObj.getDate(), 2) + '/';
    //alert(archiveUrl);

    var txt = document.createElement('span');
    txt.setAttribute('class', 'commentWhen');

    var link = document.createElement('a');
    link.setAttribute('href', archiveUrl);
    link.setAttribute('class', 'comment-date');
    link.setAttribute('style', 'float:right; text-decoration:none; color:inherit; background-color:inherit;');

    link.appendChild(document.createTextNode(dateFormat(dateObj)));
    txt.appendChild(link);
    
    //xpr.snapshotItem(0).insertBefore(txt, xpr.snapshotItem(0).firstChild);
    xpr.snapshotItem(0).parentNode.appendChild(txt);
  }
  return;
} // }}}

// function for processing the set comments with new dates.
var upgradeSetComments = function(ids,meta) { // {{{
  var nodes = getSetNodes();
  //alert(nodes.length);

  // for each node found.
  for (i = 0; i < nodes.length; i++) {
    var id = null;

    // locate the comment permalink (in order to get id)
    xp = 'a[contains(@href, "/comment") or contains(@href, "/#comment")]';
    xpr = document.evaluate(xp, nodes[i], null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (xpr.snapshotLength != 1) return false; // whoops?

    // dig out the comment id (or the part used for permalinks).
    var re = new RegExp('\/#?comment([0-9]+)\/?');
    var match = re.exec(xpr.snapshotItem(0).getAttribute('href'));
    if (match[1]) id = match[1];

    // definitely a better way to do the date lookup, just tired.
    var index = null;
    for (j = 0; j < ids.length; j++) {
      if (ids[j] == id) {
        index = j;
      }
    }

    var dateObj = new Date(meta[index][0] * 1000);

    var archiveUrl = '/photos/' + meta[index][1]
      + '/archives/date-posted/'
      + dateObj.getFullYear() + '/'
      + pad(dateObj.getMonth() + 1, 2) + '/';
    //+ pad(dateObj.getDate(), 2) + '/';
    //alert(archiveUrl);

    var txt = document.createElement('span');
    txt.setAttribute('class', 'commentWhen');

    var link = document.createElement('a');
    link.setAttribute('href', archiveUrl);
    link.setAttribute('style', 'text-decoration:none; color:inherit; background-color:inherit;');

    link.appendChild(document.createTextNode(dateFormat(dateObj)));
    txt.appendChild(link);
    nodes[i].appendChild(document.createElement('br'));
    nodes[i].appendChild(txt);
  }
  return;
} // }}}

// function for formatting the date
var dateFormat = function(dateObj) { // {{{
  return dateObj.toLocaleString();
} // }}}

// function for getting the comment nodes script will act upon
var getNodes = function() { // {{{
  var nodes = new Array();

  // note: photosets use table layout, very flexible XPATH, might break.
  // note: group invites have different html layout.
  var xp = '//ol[@id="photo-activity"]/li[@data-comment-id]';
  var xpr = document.evaluate( xp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; i < xpr.snapshotLength; i++) {
    nodes[i] = xpr.snapshotItem(i);
  }
  //alert('found comment nodes: ' + nodes.length);
  return nodes;
} // }}}

// function for getting the comment nodes script will act upon
var getSetNodes = function() { // {{{
  var nodes = new Array();

  // note: photosets use table layout, very flexible XPATH, might break.
  // note: group invites have different html layout.
  var xp = '//td[@class="Comment"]//small|//div[@class="comment-block"]//small';
  var xpr = document.evaluate( xp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; i < xpr.snapshotLength; i++) {
    nodes[i] = xpr.snapshotItem(i);
  }
  //alert('found comment nodes: ' + nodes.length);
  return nodes;
} // }}}

// number padding function
var pad = function(number, length) { // {{{
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
} // }}}