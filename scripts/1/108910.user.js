// direct_download_links - Add direct download links
// version 0.4
// 2012-02-12
// Copyright (C) 2011,2012  Antonio Ospite <ospite@studenti.unina.it>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Direct Download Links", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Direct Download Links
// @namespace      http://git.ao2.it/GM_direct_download_links.git
// @description    Add direct download links
// @include        http://video.repubblica.it/*
// @include        http://tv.repubblica.it/*
// @include        http://trovacinema.repubblica.it/*
// @include        http://www.kataweb.it/tvzap/*
// @include        http://www.rai.tv/*
// @include        http://soundcloud.com/*
// ==/UserScript==
//

/*
 * TODO:
 *  - find a way to use the same string as in the @include lines to match the
 *    current window.location. Look for something like GM_testUrl() which builds
 *    the regexp starting from a glob line.
 *  - use jquery, like shown in http://a32.me/2009/11/greasemonkey/
 *  - Support the "download" attribute for anchors:
 *    http://www.whatwg.org/specs/web-apps/current-work/multipage/links.html#downloading-resources
 */

/* Fields supported by the "site" object.
 *
 * Manadatory fields:
 *   locationRegExp: the regexp describing the URL of the page we are modifying
 *   urlContainerXPath: the XPath of the element containing the URL to link
 *   urlRegexp: the regular expression for finding the URL, the first
 *              sub-pattern is taken as the URL
 *   linkDestXPath: the XPath of the element where to place the Direct Download link
 *
 *
 * Optional fields:
 *
 *   initCommand: a function called before the regExp is matched, this can
 *                be useful in cases when some action needs to be done in
 *                order to make the element containing the regExp be actually
 *                rendered. It must accept  a 'site' parameter.
 *
 *   onEvent: used to delay the urlRegexp matching to a certain event like
 *            'DOMNodeInserted' useful when the URL is added by some javascript
 *            library. It has two fields:
 *
 *              evt: the event we want to wait for (e.g. 'DOMNodeInserted')
 *
 *              targetElement: the element in the event handler we want the
 *                urlRegexp is performed on.
 *
 *  processURL: a function to process the URL before adding the Direct
 *              Downdload Link to the page, it must accept  a 'site' and a
 *              'URL' parameters and dispatch the UrlFetched to pass the
 *              modified URL to _add_link().
 *
 */
var supported_sites = [
  {
    locationRegexp: /^http:\/\/video\.repubblica\.it\/.*$/,
    urlContainerXPath: '//div[@id="contA"]',
    urlRegexp: /'pcUrl', '((http|mms):\/\/[^']*)'/,
    linkDestXPath: '//div[@id="contA"]',
  },
  {
    locationRegexp: /^http:\/\/tv\.repubblica\.it\/.*$/,
    urlContainerXPath: '//div[@id="boxPlayer"]',
    urlRegexp: /'pcUrl', '((http|mms):\/\/[^']*)'/,
    linkDest: 'box_embed',
    linkDestXPath: '//div[@id="box_embed"]',
  },
  {
    locationRegexp: /^http:\/\/trovacinema\.repubblica\.it\/.*$/,
    urlContainerXPath: '//div[@id="col-center"]',
    urlRegexp: /'flvUrl', '((http|mms):\/\/[^']*)'/,
    linkDestXPath: '//div[@id="col-center"]',
  },
  {
    locationRegexp: /^http:\/\/www\.kataweb\.it\/tvzap\/.*$/,
    urlContainerXPath: '//div[@id="tvzap_video"]',
    urlRegexp: /'pcUrl', '((http|mms):\/\/[^']*)'/,
    linkDestXPath: '//div[@id="playerCont"]',
  },
  {
    locationRegexp: /^http:\/\/www\.rai\.tv\/.*$/,
      initCommand: function(site) {
        unsafeWindow.Silverlight.isInstalled = function(version) {
          return true;
        };
    },
    urlContainerXPath: '//div[@id="silverlightControlHost" or @id="SilverlightPlayer"]',
    urlRegexp: /mediaUri=(http:\/\/[^,]*)/,
    onEvent: { evt: 'DOMNodeInserted', targetElement: 'object' },
    processURL: _rai_get_actual_url,
    linkDestXPath: '//div[@id="silverlightControlHost" or @id="SilverlightPlayer"]',
  },
  {
    locationRegexp: /^http:\/\/soundcloud.com\/.*$/,
    urlContainerXPath: '//div[@id="main-content-inner"]',
    urlRegexp: /"streamUrl":"([^"]*)"/,
    linkDestXPath: '//div[@id="main-content-inner"]',
  },
];

/* Apply different rules to different sites */
for (i = 0; i < supported_sites.length; i++) {
  var site = supported_sites[i];

  var result = window.location.href.match(site.locationRegexp);
  if (result) {
    if (site.initCommand) {
      site.initCommand(site);
    }
    direct_download_link_add(window.location.href, site);
  }
}

function getElementByXPath(query, root) {
  return document.evaluate(query, root || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}

/**
 * Add a Direct Download link on the page for the specified URL
 *
 * @param: a 'site' object described above.
 *
 * @return: null on error, true on success
 */
function direct_download_link_add(pageURL, site) {
  site.pageURL = pageURL
  var element = getElementByXPath(site.urlContainerXPath);
  if (!element) {
    DDL_log('DirectDL (' + site.pageURL  + '): Cannot find the element ' + site.urlContainerXPath + ' containing the URL.');
    return null;
  }

  document.addEventListener('UrlFetched', _add_link, true);

  // This is used for sites adding the URL to the DOM after DOMContentLoaded,
  // for example by some javascript library (like Silverlight.js on rai.tv).
  if (site.onEvent) {
    element.addEventListener(site.onEvent.evt, function(e) {
      if (site.onEvent.targetElement &&
          e.target.tagName.toLowerCase() != site.onEvent.targetElement) {
        DDL_log('DirectDL (' + site.pageURL  + '): skipping element ' + e.target.tagName);
        return;
      }
     _get_URL(site, element);
    }, false);
    return;
  }

  _get_URL(site, element);
}

function _get_URL(site, element) {
  var content = element.innerHTML;
  if (!content) {
    DDL_log('DirectDL (' + site.pageURL + '): content is null, cannot find URL.');
    return;
  }

  var matches = content.match(site.urlRegexp);
  if (!matches || matches.length < 2 || !matches[1]) {
      DDL_log('DirectDL (' + site.pageURL + '): URL not found, check the urlRegexp');
      return;
  }
  var URL = matches[1];
  if (!URL) {
    DDL_log('DirectDL (' + site.pageURL + '): cannot get the URL.');
    return;
  }

  if (site.processURL) {
    site.processURL(site, URL);
    return;
  }

  var evt = document.createEvent('Event');
  evt.initEvent('UrlFetched', true, true);
  evt.site = site;
  evt.URL = URL;
  document.dispatchEvent(evt);
}

function _add_link(e) {
  var site = e.site;
  var URL = e.URL;;

  var destination = getElementByXPath(site.linkDestXPath);
  if (!destination) {
    DDL_log('DirectDl (' + site.pageURL + '): Cannot add the direct download link.');
    return;
  }

  // Check if we added the link already, if so just update the href attribute.
  // This is useful when _get_URL() is called on async events.
  var download_link = document.getElementById('GM_direct_downaload_link');
  if (download_link) {
    download_link.setAttribute('href', URL);
  } else {
    download_link = document.createElement('a');
    download_link.textContent = 'Direct Link';
    download_link.setAttribute('id', 'GM_direct_downaload_link');
    download_link.setAttribute('href', URL);
    var style = 'background-color: white; color: blue;';
    style += ' border: 2px solid red;'
    style += ' float: right; font-size: large;';
    style += ' padding: .5em; margin: 1em;'
    style += ' position: relative; z-index: 1000;'
    download_link.setAttribute('style', style);

    destination.insertBefore(download_link, destination.firstChild);
  }
}

function DDL_log(message) {
  var debug = false;
  if (debug) {
    alert(message)
  } else {
    GM_log(message);
  }
}

function _rai_get_actual_url(site, URL) {

  // SmoothStreaming manifest files get added without processing, for now:
  if (URL.match(/.*\.csm$/)) {
    var evt = document.createEvent('Event');
    evt.initEvent('UrlFetched', true, true);
    evt.site = site;
    evt.URL = URL;
    document.dispatchEvent(evt);
    return;
  }

  // http://www.neaveru.com/wordpress/index.php/2008/05/09/greasemonkey-bug-domnodeinserted-event-doesnt-allow-gm_xmlhttprequest/
  setTimeout( function() {
    GM_xmlhttpRequest({
      method: "GET",
      // XXX A custom header. This is the "clever" trick Rai uses to ensure
      // the content is accessed by www.rai.tv only...
      headers: {'viaurl': 'www.rai.tv'},
      url: URL,
      onload: function(response) {
        text = response.responseText;
        text = text.replace(/&/g, '&amp;')
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(text, "text/xml");

        // MMS streams
        elems = xmlDoc.getElementsByTagName('REF');
        if (elems.length > 0) {
          href = elems[0].getAttribute('HREF');;

          var evt = document.createEvent('Event');
          evt.initEvent('UrlFetched', true, true);
          evt.site = site;
          evt.URL = href;
          document.dispatchEvent(evt);
        }
        // SmoothStreaming streams
        elems = xmlDoc.getElementsByTagName('playListItem');
        if (elems.length > 0) {
          href = elems[0].getAttribute('mediaSource');;

          var evt = document.createEvent('Event');
          evt.initEvent('UrlFetched', true, true);
          evt.site = site;
          evt.URL = href;
          document.dispatchEvent(evt);
        }
      }
    });
  }, 0);
}
