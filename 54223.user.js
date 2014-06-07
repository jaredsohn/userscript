// ==UserScript==
// @name           jaro
// @namespace      http://d.hatena.ne.jp/snaka72/
// @require        http://gist.github.com/raw/3242/9dc0cdee5e975d275c7ab71f581d272eb316674f/dollarX.js
// @include        http://www.google.com/*
// @include        http://www.google.co.jp/*
// @author         snaka.gml@gmail.com
// @license        MIT license (http://www.opensource.org/licenses/mit-license.php)
// ==/UserScript==
(function() {
  const DATABASE = 'http://wedata.net/databases/SPAM_Sites';
  const STORE_KEY = 'jaroCacheInofo';
  const CACHE_EXPIRE = 1000 * 60 * 60 * 24;
  var sites = [];
  var localSetting = [
    /* (example)
      '^http:\/\/\w+\.designlinkdatabase\.net',
      '^http:\/\/\w+\.thumbnailcloud\.net',      */
  ];
  // If you want to negate the filter, set the pattern of the site names here.
  var antiFilter = [
    /* (example)
      /^http:\/\/\w+\.designlinkdatabase\.net/ */
  ];

  //
  // main logic
  //
  if (sites = getCache()) {
    GM_log("USE CACHE");
    setOpacity(sites);
  } else {
    GM_log("REQUEST TO REMOTE");
    GM_xmlhttpRequest({
      method: 'GET',
      url: DATABASE + '/items.json',
      onload: function(res) {
        try {
          sites = [i.data.url_pattern for each(i in eval(res.responseText))];
          setOpacity(sites);
          storeCache(sites);
        } catch(e) { }
      }
    });
  }

  function getCache() {
    var cacheInfo = eval(GM_getValue(STORE_KEY));
    if (!cacheInfo || cacheInfo.expire < new Date) {
      return null;
    }
    return cacheInfo.sites;
  }

  function storeCache(sites) {
    var cacheInfo = {
      expire: new Date((new Date()).getTime() + CACHE_EXPIRE),
      sites: sites
    };
    GM_setValue(STORE_KEY, cacheInfo.toSource());
  }

  function setOpacity(sites, doc) {
    mergedSites = sites.concat(localSetting);
    $X('//a[@class="l"]', doc).forEach(function(ele) {
      var link = ele.href;
      if (isExcepts(link)) {
        return;
      }
      if (isTarget(link, mergedSites)) {
        ele.parentNode.parentNode.style.opacity = '0.3';
      }
    });
  }

  function isExcepts(url) {
    return antiFilter.some(function(i) { return url.match(i) });
  }

  function isTarget(url, sites) {
    return sites.some(function(i) { return url.match(i) });
  }

  //
  // Register menu command
  //
  GM_registerMenuCommand('jaro - clear cache', clearCache);

  function clearCache() {
    GM_setValue(STORE_KEY, 'null');
    alert("Cache cleared.");
  }

  GM_registerMenuCommand('jaro - go to Wedata', gotoWedata);

  function gotoWedata() {
    window.open(DATABASE + '/items');
  }

  //
  // Register page handler
  //
  if (window.AutoPagerize) {
    registerPageHandler();
  } else {
    window.addEventListener('GM_AutoPagerizeLoaded', registerPageHandler, false);
  }

  function registerPageHandler() {
    window.AutoPagerize.addFilter(function(pages) {
      pages.forEach(function(page) {
        setOpacity(sites, page);
      });
    });
  }

})();
