// FlickrMorePhotosByModel
// version 0.2.2
// 2009-07-11
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
// http://userscripts.org/scripts/show/53489 
// 
// To uninstall, go to Tools/Manage User Scripts, select this script,
// and click Uninstall.
//
// --------------------------------------------------------------------
// What It Does:
//
// www.flickr.com (photo page):
//
// This script adds a bit of text and a link under the "Additional Info"
// section when the camera data is exposed (a flickr user preference).
// The link takes you to "more photos by the same user with the same
// camera", a little known URL hack of the main search interface.
//
// Default sorting (recent, interesting, relevent) and display mode
// (thumbnails vs details) can be configured at the top of the script.
//
// --------------------------------------------------------------------
// Change Log:
//
// v0.2.2 2007-07-11
//    * Added first translations (French + Spanish) Thanks!
//    * moved away from innerHTML, hopefull to remove safari bugs.
// v0.2.1 2007-07-11
//    * Resorted to z=t display default, z=e only valid for people
//      seeing the beta/testing search result UI.// 
// v0.2 2007-07-11
//    * Changed check for unsafeWindow, Avoid error in Safari GreaseKit?
//      Tested with user-scripts in Opera 9 (PC).
//    * Modified include/exclude to *flickr.*/ from *flickr.com/
//    * Added top level check for flickr + photo page
//      (since include/exclude sucks)
//    * Added additional display choice for medium photos
//      (flickr updated results interface to allow this), made it new default.
//    * Added Change Log + Todo
// v0.1 2007-07-08
//    * Initial Version
//
// --------------------------------------------------------------------
// To Do:
//
//  * Confirm working in Safari Greasekit?
//  * Populate remaining translations
//  * Test in Chromium build with greasemonkey
//  * Add check for updated version (would love with all my scripts)
//  * Handle bug with known make unknown model (Polaroid Example)
//    http://www.flickr.com/photos/flickrwegian/2437536744
//  * Add make/model restriction search option to the search dropdown?
//  * Add toggle transform tag links to make make/model specific?
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          FlickrMorePhotosByModel
// @namespace     http://www.ryangallagher.name
// @description   Insert a link to more photos by a camera model for that user when EXIF model data is present and visible.
// @include       http://*flickr.*/photos/*/*
//
// @exclude       http://*flickr.*/photos/organize/*
// @exclude       http://*flickr.*/photos/friends/*
// @exclude       http://*flickr.*/photos/tags/*
//
// @exclude       http://*flickr.*/photos/*/sets*
// @exclude       http://*flickr.*/photos/*/friends*
// @exclude       http://*flickr.*/photos/*/archives*
// @exclude       http://*flickr.*/photos/*/tags*
// @exclude       http://*flickr.*/photos/*/alltags*
// @exclude       http://*flickr.*/photos/*/multitags*
// @exclude       http://*flickr.*/photos/*/map*
// @exclude       http://*flickr.*/photos/*/favorites*
// @exclude       http://*flickr.*/photos/*/popular*
// @exclude       http://*flickr.*/photos/*/with*
// @exclude       http://*flickr.*/photos/*/stats*
// @exclude       http://*flickr.*/photos/*/page*
//
// @exclude       http://*flickr.*/photos/*/*/sizes/*
// @exclude       http://*flickr.*/photos/*/*/stats*
// ==/UserScript==

// --------------------------------------------------------------------
// User Configurable Preferences

// set the sorting method:
//  'int'=interesting
//  'rec'=recent
//  'rel'=relevance (NOTE: useless method, not tag/text searching)
var SORTING = 'int';

// set the display method:
//  'e' = medium photos (new flickr search UI only, currently in testing)
//  't' = thumbnails (default)
//  'm' = details
//  's' = slideshow (NOTE: FAILS, same is true of the URL flickr builds)
var DISPLAY = 't';

// --------------------------------------------------------------------
// Definitions.

// container for imported globals from page/window.
var FLICKR_GLOBALS = new Array();
var CSS_DEFAULT = '';

// --------------------------------------------------------------------
// Script Proper.

window.addEventListener("load", function() { FlickrMorePhotosByModel() }, false);

var FlickrMorePhotosByModel = function() {

  // Quick, double check we are on an appropriate flickr page
  if (!(location.hostname.match(/\.*flickr\.[a-zA-Z]+$/))) return;
  if (!(location.href.match(/\/photos\/[^\/]+\/[0-9]+/))) return;


  // default strings
  var paraText = 'More ';
  var linkText = 'by ${author_name} with this camera';
  var toolText = 'See more photos by ${author_name} taken with the ${camera_name}';

  // French (I think it's close) Thanks to a friend Liz W.
  // Plus de photo par [user] avec cette camera
  // Voir plus de photo par [user] prises avec la [camera]

  // Spanish Thanks Curtis! http://userscripts.org/topics/30619
  // 'Más por ${author_name} con esta cámara'
  // 'Ver más fotos por ${author_name} sacadas con la ${camera_name}'

  var strings = new Array();

  // fixme, add remaining language strings.
  strings[paraText] = new Array();
  strings[paraText]['en-us'] = 'More ';
  strings[paraText]['zh-hk'] = paraText;
  strings[paraText]['de-de'] = paraText;
  strings[paraText]['es-us'] = 'Más ';
  strings[paraText]['fr-fr'] = 'Plus ';
  strings[paraText]['ko-kr'] = paraText;
  strings[paraText]['pt-br'] = paraText;
  strings[linkText] = new Array();
  strings[linkText]['en-us'] = 'by ${author_name} with this camera';
  strings[linkText]['zh-hk'] = linkText;
  strings[linkText]['de-de'] = linkText;
  strings[linkText]['es-us'] = 'por ${author_name} con esta cámara';
  strings[linkText]['fr-fr'] = 'de photo par ${author_name} avec cette camera';
  strings[linkText]['ko-kr'] = linkText;
  strings[linkText]['pt-br'] = linkText;
  strings[toolText] = new Array();
  strings[toolText]['en-us'] = 'See more photos by ${author_name} taken with the ${camera_name}';
  strings[toolText]['zh-hk'] = toolText;
  strings[toolText]['de-de'] = toolText;
  strings[toolText]['es-us'] = 'Ver más fotos por ${author_name} sacadas con la ${camera_name}';
  strings[toolText]['fr-fr'] = 'Voir plus de photo para ${author_name} prises avec la ${camera_name}';
  strings[toolText]['ko-kr'] = toolText;
  strings[toolText]['pt-br'] = toolText;

  // script globals
  var defaultLang = 'en-us'; // a fall-back
  var lang = 'en-us';
  var author = new Array();
  var camera = false;
  var modelUrl, makeUrl = 'http://' + location.hostname + '/search/';

  // function inserts newNode after referenceNode
  var insertAfter = function (referenceNode, newNode) {
    referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
  }

  // function for appending a style block containing css definitions
  var appendStyles = function (css) {
    var myStyle = document.createElement('style');
    myStyle.setAttribute('type', 'text/css');

    //multi-line string
    myStyle.appendChild(document.createTextNode('<!-- ' + css + ' -->'));

    head = document.getElementsByTagName('HEAD')[0];
    head.appendChild(myStyle);
    return;
  }

  // function for getting useful globals set by flickr
  var getFlickrGlobals = function() {

    // find the unsafeWindow, differs depending on browser, hope this doesn't
    // throw errors on most browsers.
    if (!(typeof unsafeWindow == "undefined")) var w = unsafeWindow;
      else var w = window;

    // Included all flickr uses, uncommented are ones this script uses.
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
      //r['nsid'] = w.global_nsid;
      //r['ispro'] = w.global_ispro;
      //r['dbid'] = w.global_dbid;
      r['name'] = w.global_name;
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

  // function translation lookup, takes string index, source array.
  var _strings = function(idx, lang_id, src) {
    if (src[idx][lang_id]) return src[idx][lang];
    else return idx;
  }

  // function locate camera link & extract cm make, cm model, & display name.
  var getCamera = function() {
    var camera = new Array();
    var xp = '//li[@class="Stats"]/descendant::a[starts-with(@href, "/cameras/")]';
    var xpr = document.evaluate(xp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (xpr.snapshotLength != 1) return false;

    var re = new RegExp('^\/cameras\/([^\/]+)\/([^\/]+)\/$');
    var match = re.exec(xpr.snapshotItem(0).getAttribute('href'));
    if (match[1]) camera['make'] = match[1];
    if (match[2]) camera['model'] = match[2];
    camera['name'] = xpr.snapshotItem(0).firstChild.nodeValue;

    return camera;
  }

  // function to get author NSID & display name.
  var getAuthor = function() {
    var author = new Array();

    // dig the author nsid out of the user-icon next to the foaf:name
    // Note: was gonna use dc:creator here, but is only exposed on CC content.
    var xp = '//div[@class="Widget"]/descendant::b[contains(@property, "foaf:name")]/ancestor::a[contains(@href, "/photos/")]/preceding-sibling::a/img[contains(@src, "buddyicons")]';
    // document DIV "Widget" contains B with attrib property=foaf:name has parent A with attrib href containing "/photos/" has a preceeding sibling A with child IMG with attrib src containing "buddyicons"
    var xpr = document.evaluate(xp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (xpr.snapshotLength != 1) return false; // whoops, ummm?
    var re = new RegExp('buddyicons\/([0-9]+@N[0-9]+)\.jpg');
    var match = re.exec(xpr.snapshotItem(0).getAttribute('src'));
    if (match[1]) author['nsid'] = match[1];

    // dig the author name from foaf:name in the same area
    var xp = '//div[@class="Widget"]/descendant::b[contains(@property, "foaf:name")]';
    // document DIV "Widget" contains B with attrib property=foaf:name
    var xpr = document.evaluate(xp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    author['name'] = xpr.snapshotItem(0).textContent;

    return author;
  }

  // if we don't have an author, quit.
  author = getAuthor();
  if (!author['nsid']) return;

  // if we don't have a camera, quit.
  camera = getCamera();
  if (false === camera) return;

  // set the lang if discovered from flickr's global variables.
  FLICKR_GLOBALS = getFlickrGlobals();
  if (FLICKR_GLOBALS['intl_lang']) lang = FLICKR_GLOBALS['intl_lang'];

  // get the other bits needed for the url building.
  var photoId = location.pathname.split('/')[3];
  author['urlName'] = location.pathname.split('/')[2];

  // append any script styles.
  appendStyles(CSS_DEFAULT); 

  // build the urls to the search results.
  // Note: only the full "make/model" cm seems to work, despite having valid
  // pages for make & make/model in the camera finder.
  var slideshowOption = '';
  if (DISPLAY === 's') slideshowOption = 'show/';
  makeUrl += slideshowOption
    + '?w=' + author['nsid']
    + '&z=' + DISPLAY
    + '&s=' + SORTING
    + '&cm=' + camera['make']
  ;
  modelUrl = makeUrl + '/' + camera['model'];

  // replace variable strings in the strings array
  // Note: We only need one but this seemed easier because they were already in an array here. fixme?
  for (var l in strings) {
    for (var t in strings[l]) {
      strings[l][t] = strings[l][t].replace(/\$\{author_name\}/, author['name']);
      strings[l][t] = strings[l][t].replace(/\$\{camera_name\}/, camera['name']);
    }
  }

  // build the non-linked text bits.
  var para = document.createElement('span');
  para.appendChild(document.createTextNode(_strings(paraText, lang, strings)));

  // build the link elements.
  var modelLink = document.createElement('a');
  modelLink.setAttribute('href', modelUrl);
  modelLink.setAttribute('class', 'Plain');
  modelLink.setAttribute('title', _strings(toolText, lang, strings));
  modelLink.appendChild(document.createTextNode(_strings(linkText, lang, strings)));

  // locate insert point.
  var xp = '//li[@class="Stats"]/descendant::a[starts-with(@href, "/cameras/")]/following-sibling::br';
  // LI "Stats" contains A (with href ^/cameras/) followed by BR
  var xpr = document.evaluate(xp, document, null, XPathResult.ANY_TYPE, null);
  var node = xpr.iterateNext();

  // insert.
  if (!node.parentNode) return;
  node.parentNode.appendChild(document.createElement('br'));
  node.parentNode.appendChild(para);
  node.parentNode.appendChild(modelLink);
}
