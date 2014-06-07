// ==UserScript==
// @name           IBList xISBN
// @version      1.4
// @namespace      http://www.iblist.com/
// @description    On any "bookxxx.htm" page, find xisbn's from "labs.oclc.org". Display search site options form. Link matched isbns to site searched.
// @include        http://www.iblist.com/book*
// ==/UserScript==

/*  CHANGELOG
*
* 20080506 - Update V1.4
*   bugfix - restoreFromCache sometimes muddled the search result icon placement - fixed.
*   bugfix - running getMetaData more than once would duplicate exisiting entries - fixed.
*
*   NEW - Added Amazon quick search icon - Title+Author
*   Update - Adjusted Worldcat search to search on Title+AUTHOR
*
*   NEW - Amazon page scrape function added - this overwrites any existing search results.
*     Select one of the amazon sites to search - looks for matches on Title+Author
*     Function will search out every [English - Hardcover|Paperback|mmPaperback|School&Library binding] edition
*       Note: these default preferences can currently only be changed in the "scrapeAmazonPage" function.
*     Some false positives do sneak through, such as those titles with "title AND blah blah" or "title:blah" or "blah:title"
*
* 20080415 - Update V1.3
*   when a site/meta search has been performed and the user navigates away from the page (i.e. to add a manifestation)
*     the current isbn search status results are saved before leaving the page
*     clicking the disk icon (next to the search form icon) retrieves and updates the current isbn list from the saved cache
*
* 20080407 - Internal V1.2
*   convert any IBL(wem or backup) isbn-10 to isbn-13 before displaying in list
*   always test for and include backuped isbn's
*     i.e. previously would only test for backup isbn #'s if NO manifestations existed
*
* 20080321 - Update V1.1
*   added filter to extract isbns from section 'backuped data' - if no editions for work (or no M isbns found)
*   check xisbn list has all IBL isbns - worldcat can have muddled work titles for identical work
*     e.g. IBList has 'someTitle' == 'someTitle: extended title' - WorldCat has seperate isbn records for each
*   added extra meta info - book form data (book, audio, e-book) hover over form type to see wcat code
*      - amended 'Language' radio option to 'get Meta-data'
*
* 20080317 - Update V1.0
*   First FULL release
*   site search links, get language meta-data
*   link to WorldCat for title search
*   site-search selection form
*   site glyph - alongside isbn - indicates a site-search match
*   click'ed isbn goes to searched site, unMatched goes to WorldCat for isbn search
*
* 20080308 - PreRelease V0.5
*   Very basic functionallity - proof of concept
*
*/

/**
  How it works - Intended script audience "IBList Data Editors"
    
    Background:
      IBList book data is held as WEM (Work-Expression-Manifestation)
      Normally an IBList.com /bookxxxx or /book*?id=xxxx page contains Manifestations of the work xxxx.
      These Manifestations are branded with an ISBN number and are href links to Amazon.
      If no manifestation exists for the work, plain text backuped isbns's may exist at the bottom of the page.
      
    1.  Build work isbn arrays - note: isbn-10's are converted to isbn-13 before storage/display
      1.a.  Any manifestation isbns - yes? add to arrays (wemIsbn & currentIsbns), repeat.
      1.b.  Any backuped isbns - yes? add to arrays (backupIsbns & currentIsbns), repeat.
    
    2.  Get Xisbns
      2.a.  Using a seed isbn from currentIsbns, query OCLC for related isbns - add them to an wcatIsbns array.
      2.b.  Are all isbns from currentIsbns now in wcatIsbns array - no? select a unique currentIsbn and repeat step 2. till done.
    
    3.  Search Form - note: no need to wait for (a) or (b) to finish before starting the other process
      3.a.  Select a site to search - attempts to match product(book) to each isbn
      3.b.  Choose to get meta-data(book type, edition language) from worldcat
    
    4.  Restore from cache
      4.a.  On entering a bookxxxx page, select and execute any site/meta searches
      4.b.  When you leave that page - i.e. to enter a manifestation - the isbns and search results are saved for you
      4.c.  At any future time you may select the cache button(disk-icon) to restore your search results for that page
*/


(function() {

  if ( !/iblist.*book[\d+\.htm|\.php\?id=]/.test(document.location) )
    return;

  // SCRIPT UPDATE CHECKER by 'Jarett' http://userscripts.org/scripts/show/20145
  var version_scriptNum = 23672; // Change this to the number given to the script by userscripts.org (check the address bar)
  var version_timestamp = 1210038590093; // (new Date()).getTime() Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
  function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand("++ " + GM_getValue("targetScriptName", "IBList xISBN") + " - Manual Update Check ++", function() {updateCheck(true);}); updateCheck(false);
  // ENDS UPDATE CHECKER
  
  var xisbnQuery  = 'http://labs.oclc.org/xisbn/';
  var isbnRE = /(\d{9,12}[\d|X])/ig;
  
  // search terms
  var amazonUS = {
    domain    : 'www.amazon.com',
    searchURL : 'http://www.amazon.com/s/?url=search-alias%3Dstripbooks&field-keywords=',
    failStr   : /Your search <span class=\"noResultsTitleKeyword\">\&quot\;(.*)\&quot\;<\/span> did not match any product/i,
    siteName  : 'Amazon US',
    cssClass  : 'amazonus',
    icon      : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABKklEQVR42mOcPWvW/zmzZzOAgJGxMcPtW7cYPn/+zIALMJqbmv5XU1NjqK2rY1AF0iCwdcsWhuamJtwaJk+dymBqago2HabJwswMtwZeXl6G8IgIhggg5gGyCWpYvGQJ2OSVK1aANeLVEBsd/X8RUANM0YlTpwjbsH7jRgZJSUmwwPPnz8FskAY3bWYGK2UmBisVJrDc3df/IRpACrx9fMCKQSEE8sujM6sYgoyYwQq//GBg0JNlYuBhh9rAgAeI8zEyfP35n6HBn5VBT4YJVQPIan2gIMg0ZVFGsNixO/8YFh//wzA9lo2hZ+cfBsbD3Vb/QaaAMDK49ASk8C/Dxcf/GDIdWMCGZC7+xcD4cbkNipNefvoPNnX6gT9wsUCgX3Zf/cvw5ScDAwBKcnVhZJ1xBgAAAABJRU5ErkJggg=='
  };
  var amazonUK = {
    domain    : 'www.amazon.co.uk',
    searchURL : 'http://www.amazon.co.uk/s/?url=search-alias%3Dstripbooks&field-keywords=',
    failStr   : /Your search <span class=\"noResultsTitleKeyword\">\&quot\;(.*)\&quot\;<\/span> did not match any product/i,
    siteName  : 'Amazon UK',
    cssClass  : 'amazonuk',
    icon      : 'data:image/gif;base64,R0lGODlhEAAMAMQAAG8AA6UACM3NzcwKKMYBDZaz0MwkVa6SkuPBwboACf3X17q6uv7+/ocAB9ZFgZdzc8qwsAEkcRFZpebm5pgACPPMzE2Xxa4BCdvb2/r6+qysrMsDF5aWlswUPvPz8wAAACH5BAAAAAAALAAAAAAQAAwAAAWFoOIoTGExRpdJlldtCCMqWZF1avsiWMFUhkrmNvC4YBiLxVbpVDyDjYvAs0iGxuxmM5lgMIKwIdWJbgiEROJyCQQouPI2vW5T7pRu9ytoLxYagYEsGBAXEAt3GgcNBxoSERaFh4ANDRwcDwAPHBECho4SHA0AnZmbHBABoREcAKURrZoPIQA7'
  };
  var amazonCA = {
    domain    : 'www.amazon.ca',
    searchURL : 'http://www.amazon.ca/s/?url=search-alias%3Dstripbooks&field-keywords=',
    failStr   : /Your search <span class=\"noResultsTitleKeyword\">\&quot\;(.*)\&quot\;<\/span> did not match any product/i,
    siteName  : 'Amazon Canada',
    cssClass  : 'amazonca',
    icon      : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAACXBIWXMAAAsSAAALEgHS3X78AAABvElEQVQokS3JzUtUYRTA4d857/3SxvGrTEMEo6WZizaCYAZBUBsrCYKIsJXtCoTy/3Bfu7YtgjJaFVRUOyEIxSgLw2JmnLnXe+fe97SoZ/vI5tkZLxpufxl8sFreX8u/7sTDI3FVtl+9OLK4dLizbWMn5N37zu1bZb1GGAaDje+hFY3WQWAygtjYuBXZ4fNn2fp6//TU8OiExEnW02tdH+1vSRxpO6l3gqQKUPOARGH6cmP3znL69vXe8rLvlgCVz8UfRL1p3KNxNxWBCi8KFB8/2ORJN3WaLsHsedv/Wf34RpKo4axS8wGimMejcVz9/rV780YwP1s73teu1yj+7F1fjBYu9K/cQ9S8GShmBmKIU99q5c128ehxsbUp433l0yfNT5+tkVKWpoohoAYIOKp2J5w8NXT1CklP0UpdmhedPBk/OnBt0ec53S4qBiogZijiK2Dg4RpzC5Y5K4Py0A2t3I0uXvLNJgICRgDKP6qAq9WO3Vt1B43szcbQ5aXY6f9SBRC0FEpxgIkAGoT1c/Px9BnpFH1z8+HUDCDOYWYoSJCUWSBV5QhcAuAcgOFGJwCiCMBJbBrlmUT+L5xmw7Z5MLinAAAAAElFTkSuQmCC'
  };
  var bAndN = {
    domain    : 'search.barnesandnoble.com',
    searchURL : 'http://search.barnesandnoble.com/booksearch/isbninquiry.asp?ean=',
    failStr   : /We did not find any results with the search terms you provided/,
    siteName  : 'Barnes & Noble',
    cssClass  : 'bn',
    icon      : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAACXBIWXMAAAsSAAALEgHS3X78AAABt0lEQVQYlQXBPWgTYRwH4N//fd+z+bh83JlUS0o/aGob60eFRLRCVRBExamDLi5Ct4IQh4J0bYcK7oJLEStO6lLIJAZ0CIVIVQgYNdokaig9c7lezOXuPZ+HHhHRxERSDfNI1HI9zek26d9Ri2/XayM9q6kgYYPZYKqmqwu3bheLZ+7ne4nB+KQ+u7y4+Hrr4Nj4YYYYiOkhWd0p7RY3AbR3Pn4rFCrP3716sjk6l7u69MCw4ceY6Eoalj4PpAEQF0JAjSuu0egY1tjJ476E6RJrMzQJnvwDQEopXezv9U+czQZV+XJlOT4EzfVEEugTQn4YHaTmz2Wu39EuzcxevlFYuGu8Lf0dSPDenjB9CA8mhRGBVyoXt57ObAd2v5ZvPttgG+ti9eGhATBBYAwcHgC366jAdwu1xy/kz9qV/FpkKoc2GAGMgzwfffwSMggkdMUhOG0ryLiejkmASd+3+zhgTSgYlPQbsOud9IW52Pls9UO58uazBPhFD5nc9Pipa/rIUP1LVRuLRE9nprLzlfefyvl7jtkgQbQC6KnhQDjktFrdaHQ0mTKYHfrRqLb2lSMyaJLw/P+nFLIa/9zmvgAAAABJRU5ErkJggg=='
  };
  var bAndNbatch = {
    domain    : 'search.barnesandnoble.com',
    searchURL : 'http://search.barnesandnoble.com/booksearch/batchresults.asp?ISBSRC=Y&txtISBNList=',
    failStr   : /We did not find any results with the search terms you provided/,
    siteName  : 'Barnes & Noble - batch',
    cssClass  : 'bn',
    icon      : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAACXBIWXMAAAsSAAALEgHS3X78AAABt0lEQVQYlQXBPWgTYRwH4N//fd+z+bh83JlUS0o/aGob60eFRLRCVRBExamDLi5Ct4IQh4J0bYcK7oJLEStO6lLIJAZ0CIVIVQgYNdokaig9c7lezOXuPZ+HHhHRxERSDfNI1HI9zek26d9Ri2/XayM9q6kgYYPZYKqmqwu3bheLZ+7ne4nB+KQ+u7y4+Hrr4Nj4YYYYiOkhWd0p7RY3AbR3Pn4rFCrP3716sjk6l7u69MCw4ceY6Eoalj4PpAEQF0JAjSuu0egY1tjJ476E6RJrMzQJnvwDQEopXezv9U+czQZV+XJlOT4EzfVEEugTQn4YHaTmz2Wu39EuzcxevlFYuGu8Lf0dSPDenjB9CA8mhRGBVyoXt57ObAd2v5ZvPttgG+ti9eGhATBBYAwcHgC366jAdwu1xy/kz9qV/FpkKoc2GAGMgzwfffwSMggkdMUhOG0ryLiejkmASd+3+zhgTSgYlPQbsOud9IW52Pls9UO58uazBPhFD5nc9Pipa/rIUP1LVRuLRE9nprLzlfefyvl7jtkgQbQC6KnhQDjktFrdaHQ0mTKYHfrRqLb2lSMyaJLw/P+nFLIa/9zmvgAAAABJRU5ErkJggg=='
  };
  var powells = {
    domain    : 'www.powells.com',
    searchURL : 'http://www.powells.com/biblio?isbn=',
    failStr   : /nothing to see here\.\.\.|<dl class=\"bibliographic\">\s+<\/dl>\s+<\/div>/,
    siteName  : 'Powells',
    cssClass  : 'powells',
    icon      : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABhklEQVR42nXRTSjDcRwG8Od/mUlraVtWKBP6x9IsL9O8JTVvjR22w4rGZSHH2cqUlzDKS3JQDjRRmpzkookI5a2wzWYXFrPFwXuttp/b+LftOT71qW/fh8K/BL0e4rJakSYrBt3YSiFOGOW1bY3YNTpktSiQp9aAxeUip1lJJQSHY6PEMTsPtoCH0PsbIqEwMupq0LS6RsUA16aNHBn7Ef74Qm6fHik0jYfZRQROzlG9MA+xVktFQdDtIGeTk3hzevDz9Iz0YSOK2jrgtUzgcnwKErMBcqP5D/hvrkjg0Q3n4DTC398oWVoALS2nttQa4tvdQ+HMCOTteopxkt/rJNsKJVgcDvL1HQieXsC3sYUkmRg5A0bIKxuY4P7ogOxodQAhCH9+gc1PBVUgAl+thLROBaFAyATOjXWyp+9FlqoeybUy+F9eIZJVoby0Ov5bz+ZmyMWwBZk9nZCYTGCFIuBxU2PGixb27i5yu7yC7CETGgzmuCszwN3xPvF7XODQYhSVVSQEv1tTjA0puXXNAAAAAElFTkSuQmCC'
  };
  var abebooks = {
    domain    : 'www.abebooks.com',
    searchURL : 'http://www.abebooks.com/servlet/SearchResults?isbn=',
    failStr   : /We\'re sorry\, no results were found for the search terms/,
    siteName  : 'AbeBooks',
    cssClass  : 'abe',
    icon      : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABqUlEQVR42oWSPUxTYRSGn6/YC7bE29aQSBFsg0KIbCoMJoqYwEQhJMZBQyBCXYQBhAUSnHTBBeOkY6MLMY0DA4nGIAF0IrEiDf4QfpIWaO3lp5f09vbzwuBisM9wlvO+w3nfI7DQJmckDgW1oU6QB7EyOCZPXvChL/3AE7jBqTwmEWnulvuL3/E/fsjeh0+4O1pwXz/eJJba+2XizQSFlVWUPehCZDM46mrZW4jiabtJ0blScRDblEYsSXZnB/Et0Cu1t+/IYaBUlOO6Vs9mKIxy1o13dAChp6HgBHaXipHSEMt3h+RWaAKbopIzdYRpksXG+fFRHLV+kuFpclkTc3UNipyI3fmIjLbeJxOPW6ZijEwa15XLePtus9w1QoGqktESKIoN34unHB2XmovIlVt9pDfiSGlw8dU4689CJOdmsR9KChWqXj/ndHuj+JvG16agTEyFKesM4rx6idWeYVDsVhg+vCP3KLkTONKK3cVfci34iN8z73H6a6j+GEKP/rQ2Ak9j/T/xitTnLzK3rRF78pLSgU7cbQ3/L+5wSAt9PY6j/Eze1/gDBhKckVG1bpQAAAAASUVORK5CYII='
  };
  
  // various worldcat urls - web and xml - for xml requests see http://xisbn.worldcat.org/xisbnadmin/doc/api.htm
  var worldcat = {
    // web page url for finding a work by title and/or author or isbn
    wwwSrch_pA : 'http://worldcat.org/search?q=', // ti:title [+au:author] || au%3Aauthor || &q=isbn:'xxxxxxx
    wwwSrch_pB : '&qt=advanced',
    // xml - returns comprehensive meta-data using the submitted isbn
    fullMetaURL_pA : 'http://xisbn.worldcat.org/webservices/xid/isbn/', // +1234567890+ (the isbn)
    fullMetaURL_pB : '?method=getMetadata&format=xml&fl=*',
    fullMetaRE     : /oclcnum="(\d+)"\s+form="([A-Z]{2}\s*[A-Z]{0,2})"\s+year="(\d{4})"\s+lang="([a-z]{3})"\s+title="(.*)"\s+author="(.*)"\s+publisher="(.*)"\s+city="(.*)"/im,
    // xml - return a shorter meta-data - cc[\scc]  form type and 3 char language code using the submitted isbn
    sMetaURL_pA : 'http://xisbn.worldcat.org/webservices/xid/isbn/', // +1234567890+ (the isbn)
    sMetaURL_pB : '?method=getMetadata&format=xml&fl=form,lang',
    sMetaRE     : /form="([A-Z]{2}\s*[A-Z]{0,2})"\s+lang="([a-z]{3})"\s*>(\d{9,12}[\d|X])/im,
    mFormRE     : /form="([A-Z]{2}\s*[A-Z]{0,2})"/im,
    mLangRE     : /lang="([a-z]{3})"/im,
    // size= 12 x 11
    icon       : 'data:image/gif;base64,R0lGODlhDAALAOZlALpbj+3q7O7r7BZ7uBh6uOLo7HJfol1Kl/2CHPegTKsvcEGcQ+vY06gtc0aeQqzPsPWLMfuZSuHo4feCH93S3cXazY660rdUi+7u7om007NNiviyfOTIzWq2fO3Vx1OmVJuQvGpYnrHF2uvMq1ebx9vm39Ph1Ovl6Bd5u2pQmrGfwtSkvdy7zOjg5oVrqMK0zht8ueTezkyiSt/Az9zk6rpbjW5dodzd5q7PttDfzcFvmuvb1lmnX9He5/DYxNDR3+/t6vWdUrupx5KFt/HSuOns7qHG3NfU4f2GGpK41PufTsZ9o1ytauDg075hlOjn682RsMDYwXmu0oS00kaVxWRQmvWON8PW47dShufYwz6dQ9XP3rLSsBd3wol5sNTh3O/dznm2fcRznL7V4s7e3O/v7wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGUALAAAAAAMAAsAAAd3gGVXRmVbXlUHNk9ljCRUNykGKkIvGIwFMEkgIRRiNTozjD0DIi5DLU5LFwosZTQEGT9HjB47AFgnZVIoU0WMSgkcDStcXxZdYyU5I0gMGlA8MjhkFR8dWQhgAgESYQsOWkxNQVZAjIwmD1ExERNE5/BlGxA+8IEAOw=='
  };
  
  // possible stat field values from worldcat meta query - to quote...
  // If the request is invalid or the usage has reached limits, the response will return header only, with appropriate status code.
  var wcatStat = {
    "ok"           : "correct request and response",
    "unknownField" : "the request field is not supported",
    "unknownFormat": "the request format is not supported",
    "unknownId"    : "the request identifier is a valid ISBN number and unknown to xISBN service",
    "unknownMethod": "the request method is not supported",
    "invalidId"    : "the request identifier is not a valid ISBN number",
    "overlimit"    : "the request is throttled, only header is returned"};

  // this next is unused as yet - complmentary/alternative/extra xisbn source?
  var libraryThing = {
    xmlSearch : 'http://www.librarything.com/api/thingISBN/' // + isbn
  };
  
  // form and list icons
  var icon = {
    form        : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADBklEQVR42qWTX0jTURTHz37atM3ln2lTh0pu4vRhCRlb21ILGysn9uRDE3tJH4R8ChrIGIwlWZFCMzBIbZNwTWiyYkI0My3zT47JBqmkFbE2oSHVnNPf77fu/TlCorcufPn97jn3fM4953JY8J+L9dc/FpH8JpDo5Bf+4WP8BwFEV1fXh/T0dCoUCm319/erkW0XaQ8729vbVzgczh7ypc7Nzak2NjZ+YB/rAP3QyMhIXKfTQU9Pzy+9Xq9FNh/SDj7gdrtjGo0GTCYTGI3Gc8jkRYoygLa2tjKUeTU3NxcyMzMhPz8fZmdnqWAwOEQQBMTjcXZ5eXmrWCyGmZkZCIfDMDExUYRCfzJ1t7S0lIlEohWZTAYCgQCys7NhbGwMKisroaCgAPx+P1RXVwMqAQKBANhstoTdbteh2JcMoLm5uQJlCGAADsjJyWEAEokEiouLYWlpCeRyOXC5XPD5fGC1WhMOh+MyirUxnW1qapJIpdKAQqFgALiU0dFR5gYlJSWwsLAASqUSMjIywOv1wuDgII0SXEGxwxiQ0tDQ4EBBAnRAgetH/YBYLAabm5sUj8fDNRNCoZDpVyQSgbW1NYhGo6H19XU5NqY2Nja+6uvrU5aWlv55U7PZDAaDoQM/JcreOT4+LuXz+YwP3wg9M7hcrlYMYGu1Wk9v712lWFz2NwBf821tTc2A0+k8nYWai9ciAtyzWADZOhiA5vyFSaP5jkJ6vII5sEsC3O42Q7fJ0Iq20ypV7dCAzVEnLMyD3R0K3s+/g+GHD+D5s6dXMSBNeqLes1zUrQC+YD/90SIo/GiB4JNO/FTTUln9o2XNizMQ3Qb49hU1IgwlETt8Xny8D1DWqCcrLt48lXdMxMST3CPgd94C9/3rlzBApjxrq7rmqss6nAbU1ncIra7ApzdWmJ9ydDIlqNVqB4fDFlAkyU5QFEFRFCtOkoTH8/oG8k/VqlQWIjVFRtNkCk0lCIqmgaJJwufz65kZQOIgnUTiJfes5BBt454lJ68KqRAnTE4ltn35DanIJj5fBPkQAAAAAElFTkSuQmCC',
    iblist      : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABzElEQVR42kVRIYgbQRR9U44yItARJ7ZwYiknRlTscYVGVJyMaGBFxIoTERURJ1aEEkrEUrWUioiKFaEMJZSjVCykYmUohduWiBUVSzgREcJSQlkRjhEH2z8T0VmG/fz57///3mOb7a4BNMzRe418maMsS9T7GvyIQ0oPQc+3b+Zjm+2mMQ84AuI4RtuTkKcuRIujqmsCF/QX6F8Gtinb/aEJVKymCv2gA96iPrsK+v4wlRNQzVKaKBCGI7Db1W2TJBOEV33aqaSrbZG+h43BD3Gel3j0+DnY7POsga4QvGxDXV/Dky6K32uIYwHpOlgs1/A7HmE13iW/wMZvho1JyBOBi16IeNzHKFJEGBi88hF/SLH4GqEmQLYoCPD6qgl6HhzBMRgmFhCOFWoiHA0DTFSKURjAdQTSLAcbEsB/4UA+lfB7EeLITEhIQI5w0EEyzeBQsckrlYFNP04bXeWk9QWpsUD7maS9CzjEwZMS2Y8c7olLV+BTugLb/903SiUolhlGtIL15GCjEdVyMdHbyXd0u10yjnygNOL3ERHXViUhhDXSVK53Nb58W+FO31lj/ztN5+bnDebzOR5ie3C6qvGg9cR2Pjs/I0s4/gGdW86Lb/nyngAAAABJRU5ErkJggg==',
    iblbackup   : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsSAAALEgHS3X78AAABqElEQVQokW2Qv8tScRjFz/N8+yG9ZS5+39HB4kIYNFwHTe6igtAkOTRINboKDiLY0j/QH9BYhIuIwytBQ2DgIK+DcblEQyolyr1XSEheRXla1Bw66/N8DuccAgAiUsy8i8ViD4PB4OPVanVzMBi8FZE/AAiA4CAiAgAGgFQq9bzVaonjOFIoFD4ACO7v/6SU4kgk8kgpFQCARCLxqt/vS7fblXA4/GJveqQ4EAjcKZVKHy3Leg0A8/n8BxFhMplsXNddA1Aicox0TWudTCaT2rKscrPZTESj0ftaawyHw+sArohot4d2B+hWNpt9Z9u2LBaL3XQ6ldFotB2Px1KpVL4y873DMKelz9Lp9PtisXgZj8c/dTqdre/7W9/3pVqt2kRkENEROnQ6I6IogLumab6xbVs8z7taLpdSq9W+A3hwOhYRETEzKaUA4EY+n79wXVd8319vNhup1+vfmNlUp5CIQESYmbeO43xWSj3J5XLnjUZjnclkzj3PM06BgwSAAvC71+tdaq2fGoZxezabod1u//rP/zGjAoBQKPSsXC7/NE3zC4CXfwFElqj60Bv/vQAAAABJRU5ErkJggg==',
    unMatched   : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABj0lEQVR42m2SMUgjQRiFv208YyFmLYwaxGKtJDYq2BzKgRFsLAIpLdMcd0ltYZHOMohFLA/SBFJeMDk49jCiIQQxco3ZInjJiggxIpqoxfrvrhcj+lcD8755b96MoheLFnUD798S13NBllZXFXpGz2YtCnmYngdNQ9EzKWtsP81wp0a94+M6HBEo5EB6JmPxYxet9pvG5Czt8DeUk3jM8pt7qMtLNH8dYgjUDkfd45MJAq2Ss2yf31JZ+yoOYulNJ/H311CnJ2keVDDaI9CRBDenqJ+g0XrE8H2BaBTXOpuxPGmx7pyh+gZpHv+Dh4dX8ZCIv0vUUEhRei/nScbRWgKN9sPFjSv2zMLmZreMt0Ai3o1hT7N6x+nEwnvgfxuBy0I3hufqCVX2GiYYKysQeYnk9Gy30SN2YsgEykeoT1CVtWlD9qX1jZil/dxhfKjvTRvOJBKM5XJM4UJGLCZAKiUNbeOtlDFnRLzuWndfeUugPznMRTvWugD21zDq3Jf2GQh+/DXu83kG5j/Lw/h5BqGPwUGCh24pAAAAAElFTkSuQmCC',
    xhrRequest  : 'data:image/gif;base64,R0lGODlhEAAMAPMAAP///2hoaOjo6JSUlN7e3s7Ozry8vKioqHJycoKCggAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgAAACwAAAAAEAAMAAMEIhDISau9OE/Fu/9cghxGQWDhWJ5XSpqoIr6s5a4xqHNa30cAIfkECQoAAAAsAAADABAABwADBB1QyUmrPCOhQoD/3pVtHfiJGmeeCpaWK0quoWVPEQAh+QQJCgAAACwAAAMAEAAHAAMEHVDJSass5oyEgP/elW0d+IkaZ54KlpYrSq6hZU8RACH5BAkKAAAALAAAAwAQAAcAAwQgUMlJqxSkmDMSAmB4ZVv3heCocR6aKthquoBatq6lUxEAIfkECQoAAAAsAAADABAABwADBCJQyUmrBECQYs5ICIZd2dZ9oUhqnAeKwGq66ahg7PmqVj9FACH5BAkKAAAALAAAAwAQAAcAAwQjUMlJqwQYCFLMGQmCXdnWfeGoZBrngSJAYuabymvporHlUxEAIfkECQoAAAAsAAADABAABwADBCFQyUmrBDgLUswZCXJl2NZ94UiaHigqZMm1KRyz6GvtUgQAIfkECQoAAAAsAAADABAABwADBB5QyUmrBDhjQYoJyKVlnAeKI1B+oZJuHYuO62ndUwQAIfkECQoAAAAsAAADABAABwADBBpQyUmrBDjrgNK4Wsh5YJiNn2JuXbqerSVTEQAh+QQJCgAAACwAAAMAEAAHAAMEHlDJSasEOOOA0jjGpWWcB4ojUH6hkm4di47rad1TBAAh+QQJCgAAACwAAAMAEAAHAAMEIVDJSasEOAeUxjEFcWXY1n3hSJoeKCpkybUpHLPoa+1SBAAh+QQJCgAAACwAAAMAEAAHAAMEI1DJSasEGASUxjEFgV3Z1n3hqGQa54EiQGLmm8pr6aKx5VMRACH5BAkKAAAALAAAAwAQAAcAAwQiUMlJqwQgoDSOKQSGXdnWfaFIapwHisBquumoYOz5qlY/RQAh+QQBCgAAACwAAAMAEAAHAAMEIFDJSasMKI1jCgFgeGVb94XgqHEemirYarqAWraupVMRACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvADs=',
    disk        : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsSAAALEgHS3X78AAABjUlEQVQokU2OvWpUURhF13fumTtxhiQEwcrKF7AQC2srOxErC3tF7HwAwSLga2isbaKNWKiVioXYaMQwMJEkk9HM7/0559sWQ8BdbVhs9jIAQrcDZUQuACRgVUFgGLQtyskA1u68eHrxyo3bLP6Ms1N4m5E7ngWp8db6vdNvrz9Vr+4/hM7G2oXt8ddnP6RZ6/lwKY2W0vFSOphJlbs/eS+de3RUF931mxHPtJPTlOot+iZ3QQwrmRSga1KRrVA1lSn34krTTAKXhdYtOGBA8hV1BykEQBEgJ6cTIETYCP89rAbEAlISAYhIlCTe7sH3QaZxQ4AL3GG9FB9/RzomGhcROaUSn49AW4E6GcGgDODAcOJ8GEDHoBJEgKbN6hfw+Lrr1k6hu5fh3lUYTmBeo3cDbFS3DiKirJzdK4OTZbCfU7P9OQwXsD+FIgQagzb0AhQWoa3/vnywPdrcef7mvMNhTgd7st3GGC/EfFFpNtgsfW/3F3l+Ypwl9q4hu2R4DoblfAZcmEWUjlH68g+s2vEgeDkJxQAAAABJRU5ErkJggg==',
    found       : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABLklEQVR42mNkIBEwEquwvb39v5eXF2ENL168+F9ZWclw/N5php2LtuLX8Pnz5//JyckMq1gPMmg9FmXYtWwHfg3l5eX/O+8vZWBQf8IgdEGZYWXeDNwatm/f/j98RhbDJ8X7DCwPFRhq9BMYcnNzIRrevn37v7+/n0FGRoYhIyMDLAb04P9tSjsZ+B7LMSxOmsDg7+8PFmdct27d/0mTJjEckLzJYPtEhWHTpk0M27ZtY4heX8Fg+lCCob6+nsHHxwfuEsZbt279b2lpYVj85RDDf/bfDK06WQx79+5l2C9wj2Gebz1DYmIiirPhnPnz5/9P2tzI8J//MwPDF06GSpVYUNhj+BFFYOHChf8TNgKd8FuXYeXKlQxcXFz4NYDA3Llz/+vq6jKYmZlhDUEADY1uwnp4zT8AAAAASUVORK5CYII=',
    //load        : 'data:image/gif;base64,R0lGODlhDAAMAPUAAAMDA6WlpcjIyLm5uXR0dEZGRgAAAExMTJSUlJGRkeLi4s/Pzzw8PIyMjEdHRxMTE6GhocfHxy0tLQsLC6SkpLi4uEhISN7e3sHBwdTU1D09PdXV1RoaGsXFxZOTkwMDA1JSUnNzc5ycnOPj4wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAAACwAAAAADAAMAEUGJkCAEDAShUSjoXLJHHqazs8TutFsoNjhCPQBJZsdTic7zmayaGgQACH5BAkKAAAALAYAAQAGAAcARQYbQIAQI9w0IBehkDKRRDbK6MVSEUIejiRjEQ0CACH5BAkKAAAALAYAAQAGAAcABQYlwA9ohAEAPp6LpQLgdCgTScQDeTguik0DckmAGBHEwWDYGBXeIAAh+QQJCgAAACwGAAEABgALAAUGMsAPaIQBAD6ei6UC4HQoE0nEA3k4LopNA3JJgBgbxMFg0HK9gGrhYrwUDIUiQMk0AuRBACH5BAkKAAAALAQAAQAIAAsARQY9QADgAxphhIDRYVQwFI6ATQNySYCEnA5lIokIO9NqEUQEQIUfz8VSQXogD8dFIWRsEAeDQfh+FC58aWttQQAh+QQJCgAAACwBAAEACwALAAUGUECAcAT6gEYYoRLg+XgulsoS0OF0KBNJZOqBPBwXxXTTgFwSoOWGsUEcDAYlpJEpn9MXygPSfRQuABgFE38HIwUGBUkVEhdNT1FKEURGgUJBACH5BAkKAAAALAAAAQAMAAsABQZZQIAQMAJ9QCPMcOn5eC6WylLY4XQoE0lkNGJCHo6LQgRKRISZBuSSABEMBo5Zk0Ec4GQzpJFet4kXFA8QHl8FF0IYBROHByMFBgVKABUSF01PUUtbRiAAk0EAIfkEAQoAAAAsAAABAAwACwAFBmJAgDAyAn1AI4xQOJBcPB/PxVIRCiQGSIfToUwkxNEl8IB4IA/HRSECJSKQxqIBuSRABIOBk1gwMggHem1vcRl0diAAYhRlZw8FF0IYBRORByMFBgVKABVOUFJUSwBERoqdQQAh/i1NYWRlIGJ5IEtyYXNpbWlyYSBOZWpjaGV2YSAod3d3LmxvYWRpbmZvLm5ldCkAOw=='
    load        : 'data:image/gif;base64,R0lGODlhEAAQAPUAAAMDAxoaGjw8PD09PUxMTFJSUnNzc5OTk5ycnMXFxdTU1NXV1ePj4+bm5gAAAAsLCxMTEy0tLUdHR0hISIyMjKGhoaSkpLi4uMHBwcfHx8/Pz9DQ0N7e3nR0dJGRkZSUlOLi4iwsLEZGRqWlpbm5ucPDw8jIyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/i1NYWRlIGJ5IEtyYXNpbWlyYSBOZWpjaGV2YSAod3d3LmxvYWRpbmZvLm5ldCkAIfkEAQoADQAsAAAAABAAEAAABDOwScmQMYjNPVkBQKFx3AEeJJkEQZJyDEGM73Sg9Za4ubQMg0WvsRAEhw2FAslsOp/QXAQAIfkEAQoAAAAsAAAAABAAEAAABTQgII5kaZpYdprcFF0raT1OpMac5DwSFgMViMTCiS02lErRKBBofqJFcwGNbqrYrHbL3YYAACH5BAEKAAAALAAAAAAQABAAAAYzQIBwSCwaj8ikcslsDkGg42IxzHgKCONCIMh8CAGHo6PlJjxgMVmrEIKsWCcgKq/b780gACH5BAEKAAAALAAAAAAQABAAAAY2QIBwSCwaj8ikcslsMheL5kIgiC6nAo1UQalwmhWIaPRVckSOhwizHD0cocySMwldmhi5kxgEACH5BAEKAAMALAAAAAAQABAAAAQucMhJq7046807X0u3CEK4KaS5JYl3HB1DEAyXBEG7HQAAa4xCr7BhIAwGRI0SAQAh+QQBCgAAACwAAAAAEAAQAAAGN0CAcEgsGo/IpHLJbDIXi+ZCIIguNVQrklOhKLRGjkUEqSgxoodDxFFmIo6HhXmJTNrMDMbZDAIAIfkEAQoAAAAsAAAAABAAEAAABS4gII5kaZ5oqq6syDAtgBReNirK2TlOQNSDQa606/0ywSFpVoMBcChnbEqtWlkhACH5BAEKAAAALAAAAAAQABAAAAY3QIBwSCwSMyWjkhSRcJREU8TxqECHpcnD4bwKOSMJxOr9VigaRVmoEQjUZYUbHqev7/i8fn8PAgA7'
  };
  
  // list of search sites [declared above] - appears in the form - as radio buttons - in this order
  var siteSearchList = ['amazonUS', 'amazonUK', 'amazonCA', 'bAndN', 'powells', 'abebooks'];
  var siteSearchPref = siteSearchList[0]; // the default checked item in search form
  
  var workTitle, workAuthor, altWorkTitle;
  
  var lnks = document.links; // the IBList isbns are in here somewhere
  
  var wcatIsbns = new Array; // stack for xhr isbns
  
  var currentIsbns = new Array; // master stack for the following two sub-arrays
  var wemIsbns = new Array; // stack for manifested isbns
  var backupIsbns = new Array; // stack for backuped isbns
  
  var isbnFormInfo = false; // has the form been used to retrieve isbn info?
  
  /* ++++++++++++++++++++++++++++++++++++++++++++++ */
  /*                 My function library                           */
  /* ++++++++++++++++++++++++++++++++++++++++++++++ */
  // macro functions - saves repetetive typing(and typos!)
  function $(objid) {return document.getElementById(objid);}
  function $ce(tag) {return document.createElement(tag);}
  function $ct(txt) {return document.createTextNode(txt);}
  function $gt(obj,tag) {return obj.getElementsByTagName(tag);}
  // trim leading & trailing whitespace
  if (!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^\s*|\s*$/g, '');}}
  /* ------------------------------------------------------- */
  /*    more functions that happen to be x-browser      */
  /* ------------------------------------------------------- */
  /* get next/previous Element node - ignores whitespace text nodes */
  function nextElement(node){if(!node){return null;}do{node=node.nextSibling;}while(node && node.nodeType !=1);return node;}
  function prevElement(node){if(!node){return null;}do{node=node.previousSibling;}while(node && node.nodeType !=1);return node;}
  /* x-browser event register */
  function addEvent(elm,evType,fn,useCapture){if(elm.addEventListener){elm.addEventListener(evType,fn,useCapture);return true;}else if(elm.attachEvent){var r=elm.attachEvent('on'+evType,fn);return r;}else{elm['on' + evType]=fn;}}
  /* x-browser detection of event target */
  function eventTarget(e){var targ;if(!e){var e=window.event;}if(e.target){targ=e.target;}else if(e.srcElement){targ=e.srcElement;}if(targ.nodeType==3){targ=targ.parentNode;}return targ;}
  /* FF/IE openInTab (IE=in background) || Opera? - newWindow */
  function openTab(url){if(typeof GM_openInTab !='undefined'){GM_openInTab(url);}else if(typeof PRO_openInTab !='undefined'){PRO_openInTab(url,2);}else{window.open(url);}}
  // FF/IE set/get/remValue || Opera? set/get/rem cookie
  var namespace="gollum.greg.";var setValue,getValue,remValue;if((typeof GM_setValue!="undefined")&&(typeof GM_getValue!="undefined")){setValue=function(A,B){GM_setValue(namespace+A,B);};getValue=function(A,C){var B=GM_getValue(namespace+A,C);return(B)?B:C;};remValue=function(A){GM_setValue(namespace+A,"");};}else if((typeof PRO_setValue!="undefined")&&(typeof PRO_getValue!="undefined")){setValue=function(A,B){PRO_setValue(namespace+A,B);};getValue=function(A,C){var B=PRO_getValue(namespace+A);return(B)?B:C;};remValue=function(A){PRO_setValue(namespace+A,"");};}else{setCookie=function(A,C,B){if(!A){return;}document.cookie=escape(namespace+A)+"="+escape(C)+";expires="+(new Date((new Date()).getTime()+(1000*B))).toGMTString()+";path=/";};setValue=function(A,B){setCookie(A,B,31536000);};getValue=function(A,B){A=(new RegExp(namespace+A+"=([^;]*)")).exec(document.cookie+";");if(!A){return B;};if(A[1]!="undefined"){return A[1];}else{return B;}};remValue=function(A){setCookie(A,"",-10);};}
  // quick & dirty check for IE
  var isIE = (window.attachEvent && !window.opera) ? true : false;
  /* ++++++++++++++++++++++++++++++++++++++++++++++ */
  /*            ENDS - My function library                    */
  /* ++++++++++++++++++++++++++++++++++++++++++++++ */
  
  var DEBUG = false;
  
  var isbnLookup = {
  
    /* ------------------------------------------------------- */
    /* MAIN function                                                 */
    /*      create an isbn list container + header             */
    /*      if isbn exists on works page                          */
    /*       - use as seed query to worldcat xisbn lab       */
    /*      if NO isbn on works page                             */
    /*       - just create search link to www.worldCat     */
    /* ------------------------------------------------------- */
    init: function() {
      if ( $('xisbnDiv') )
        return;

      workTitle = this.findWorkTitle(); // Original title
//alert(workTitle.match(/^(?:The|A[n])\s(.*)/)[1]);
      altWorkTitle = workTitle.match(/^(The|A[n]*)\s/i) ? workTitle.match(/^(?:The|A[n]*)\s(.*)/i)[1] : workTitle;
      workAuthor = this.findWorkAuthor();
      
      var div = $('content').insertBefore($ce('div'), $('main'));
      div.setAttribute('id', 'xisbnDiv');
      
      var spn = div.appendChild($ce('span'));
      spn.setAttribute('class', "hdr");
      var hdr = spn.appendChild($ce('h5'));
      hdr.innerHTML = "xISBN's";
      
      var list = div.appendChild($ce('ul'));
      list.setAttribute('id', 'xisbnList');
      list.addEventListener('DOMNodeInserted', isbnLookup.addIsbn, false); // as each is added, check for IBL duplicates
      
      var tot = $ce('span');
      tot.setAttribute('id', "xhrTotal");
      tot.appendChild($ct('0'));
      div.appendChild(tot);
      
      this.setStyles();
      this.addWorldcatLink();
      this.addAmazonLink();

      if ( currentIsbns.length > 0 ) {
        this.getXisbns(currentIsbns[0]);
        // create site selector form - select a site to seacrh for product info
        this.hiddenForm(div.offsetLeft+div.offsetWidth, div.offsetTop);
        this.addFormLink();
        
        this.addCacheGetLink();
        
        unsafeWindow.onbeforeunload = function() {if ( isbnFormInfo ) {isbnLookup.setCache();}};
      }
    },
  
    /* ------------------------------------------------------- */
    /* Event Handler - DOMNodeInserted                     */
    /* - settup by the init() function                             */
    /* - triggered by XHR getXisbns() adding to list       */
    /* ------------------------------------------------------- */
    // if inserted isbn matches an isbn on the work page
    // brand it with an indentifier - create an image container
    addIsbn: function(e) {
      var targ = e.target;
      var found = false;
      for ( var i=0; i < currentIsbns.length; i++ ) {
        if ( targ.textContent == currentIsbns[i] ) {
          found = true;
          break;
        }
      }
      if ( found ) {
        var s = $ce('span');
        var wem = false;
        for ( var i=0; i < wemIsbns.length; i++ ) {
          if ( targ.textContent == wemIsbns[i] ) {
            s.setAttribute('class', "iblist");
            wem = true;
            break;
          }
        }
        if ( !wem ) {
          s.setAttribute('class', "backup");
        }
        targ.insertBefore(s, targ.lastChild);
      }
    },
    
    /* ------------------------------------------------------- */
    /* XHR - Get list of isbns using seed isbn code         */
    /*      returns a list ordered by the most commonly    */
    /*      held editions in WorldCat affiliated libraries  */
    /* ------------------------------------------------------- */
    // request xml data - gets isbns from worldcat oclc lab
    getXisbns: function(isbn) {
      GM_xmlhttpRequest( {
        method:  'GET',
        url:     xisbnQuery + isbn,
        onload:  function(response) {
          if ( response.status != 200 ) {
            alert("The xISBN request failed. Error=: " + response.statusText);
            return;
          }
          var page = response.responseText;
          var isbns = page.match(isbnRE);
          //GM_log("Found xISBNs: " +isbns.length + " >> " +isbns);
          
          // add the array of returned xisbns to our displayed list
          isbnLookup.populateList(isbns);
          
          // did the array of returned xhr xisbns contain all the isbns in our 'currentIsbns' ?
          // if not then look for a non-match and call recursively until we have them all
          var found;
          for ( var i=0; i < currentIsbns.length; i++ ) {
            found = false;
            for ( var j=0; j < wcatIsbns.length; j++ ) {
              if ( currentIsbns[i] == wcatIsbns[j] ) {
                found = true;
                break;
              }
            }
            if ( !found ) {
              isbnLookup.getXisbns(currentIsbns[i]);
            }
          }
        }
      });
    },

    // add an isbn to our display list
    populateList: function(xisbns) {
      var list = $('xisbnList');
      if ( typeof xisbns == 'string' ) {
        if ( this.saveXisbn(xisbns) ) {
          list.appendChild(this.wrapXisbn(xisbns));
        }
        return;
      }
      if ( xisbns.length > 1) {
        //isbns.sort();
        for ( var i=0; i < xisbns.length; i++ ) {
          if ( this.saveXisbn(xisbns[i]) ) {
            list.appendChild(this.wrapXisbn(xisbns[i]));
          }
        }
      } else {
        if ( this.saveXisbn(xisbns[0]) ) {
          list.appendChild(this.wrapXisbn(xisbns[0]));
        }
      }
    },
    
    // because we may call getXisbns() many times until we have all the IBL isbns, 
    //   keep a seperate list of returned xisbns and only store those that are unique
    saveXisbn: function(isbn) {
      for ( var i=0; i < wcatIsbns.length; i++ ) {
        if ( isbn == wcatIsbns[i] ) {
          return false;
        }
      }
      wcatIsbns.push(isbn);
      // increment xisbns counter display
      //this.updateCounter();
      $('xhrTotal').textContent = wcatIsbns.length;
      return true;
    },
    
    // helper for populateIsbns - create link wrapper for isbn code
    wrapXisbn: function(xisbn) {
      var s = $ce('li');
      s.setAttribute('class', "notFound");
      var a = $ce('a');
      a.setAttribute('href', worldcat.wwwSrch_pA + "isbn:" + xisbn + worldcat.wwwSrch_pB);
      a.setAttribute('title', "Search WorldCat for this ISBN");
      a.appendChild($ct(xisbn));
      s.appendChild(a);
      return s;
    },
    
    // add link to worldcat website - search for title of this this work
    addWorldcatLink: function() {
      /* var wt = workTitle;
      if ( !wt ) {
        return; // something seriously wrong with findTitle or the IBL page for this work
      }
      var wa = workAuthor;
      if ( !wa ) {
        return; // something seriously wrong with findAuthor or the IBL page for this work
      } */
      var h = $gt($('xisbnDiv'), 'span')[0];
      var a = $ce('a');
      a.setAttribute('id', "worldcat");
      a.setAttribute('title', "Search WorldCat for: " + workTitle + " " + workAuthor);
      a.setAttribute('href', worldcat.wwwSrch_pA + "ti%3A" + encodeURIComponent(workTitle) + " au%3A" + encodeURIComponent(workAuthor) + worldcat.wwwSrch_pB);
      var img = a.appendChild($ce('img'));
      img.setAttribute('src', worldcat.icon);
      h.insertBefore(a, h.firstChild);
    },
    
    // add link to search Amazon for isbns
    addAmazonLink: function() {
      var h = $gt($('xisbnDiv'), 'span')[0];
      var a = $ce('a');
      a.setAttribute('id', "amazon");
      a.setAttribute('title', "Search Amazon.com for: " + workTitle + " " + workAuthor);
      a.setAttribute('href', amazonUS.searchURL + encodeURIComponent(workTitle) + " " + encodeURIComponent(workAuthor));
/*       a.addEventListener("click", function(e) {
        e.preventDefault();
        isbnLookup.getAmazonWork(amazonUS);
        isbnLookup.getAmazonWork(amazonUK);
        isbnLookup.getAmazonWork(amazonCA);
        }, false
      ); */
      var img = a.appendChild($ce('img'));
      img.setAttribute('src', amazonUS.icon);
      h.insertBefore(a, h.firstChild.nextSibling);
    },
    
    // helper for addWorldcatLink - find the works title on the IBL page
    findWorkTitle: function() {
      //t = document.getElementsByTagName('h2');
      var n = document.getElementsByTagName('i');
      for ( var i=0, v; i < n.length; i++ ) {
        //var title = t[i].innerHTML.match( /^Book Information:\s*(.*)/);
        if ( n[i].textContent.match( /^Original title:/) ) {
          v = n[i].nextSibling.textContent.trim().replace(/\s\s+/g,/\s/);
          if ( /:/.test(v) ) {
            v = v.match(/^(.*?):.*/)[1];
          }
          return v;
        }
      }
      return false; // got to be an error - a work page with no title!!
    },
    
    // helper for addWorldcatLink - find the works title on the IBL page
    findWorkAuthor: function() {
      for ( var i=0, v; i < lnks.length; i++ ) {
        if ( lnks[i].href.match(/author\d*\.htm$/) ) {
          v = lnks[i].textContent.trim().replace(/\s\s+/g,/\s/);
          return v;
        }
      }
      return false; // got to be an error - a work page with no author!!
    },
    
    // add toggle for search form to the isbn list header
    addFormLink: function() {
      var h = $gt($('xisbnDiv'), 'span')[0];
      var a = $ce('a');
      a.setAttribute('id', "searchForm");
      a.setAttribute('title', "Toggle display of ISBN search form - site selection.");
      a.setAttribute('href', "#");
      a.addEventListener("click", 
        function(e) {
          e.preventDefault();
          $('xisbnForm').style.display = ($('xisbnForm').style.display == "none" ? "block" : "none");
        }
      , false);
      var img = a.appendChild($ce('img'));
      img.setAttribute('src', icon.form);
      h.insertBefore(a, h.firstChild);
    },
    
    getWorldcatWork: function() {
      isbnLookup.getWorldcatPage(worldcat.wwwSrch_pA + "ti%3A" + encodeURI(workTitle) + " au%3A" + encodeURI(workAuthor) + worldcat.wwwSrch_pB, false)
    },
    
    getWorldcatPage: function(wcURL, gettingEditionPage) {
      $('worldcat').firstChild.setAttribute("src", icon.load);
      GM_xmlhttpRequest( {
        method:  'GET',
        url:     wcURL,
        onload:  function(results) {
          $('worldcat').firstChild.setAttribute("src", worldcat.icon);
          if (DEBUG) {GM_log(eval(site).searchURL + workTitle + " " + workAuthor);}
          //GM_log(results.status+"\n"+results.responseText.replace(/^\s*/g, ""));
          isbnLookup.scrapeWorldcat(results.responseText, gettingEditionPage);
        }
      });
    },

    scrapeWorldcat: function(rText, isEditionPage) {
     // normalise - eliminate line-feeds and spaces between elements
      var nText = rText.replace(/\n/g, "").replace(/>\s*</g, "><");
      if (DEBUG) {GM_log(isEditionPage);}
     
     // grab all book entries
      var g;
      if ( isEditionPage ) {
        g = rText.match(/<tr valign="top">.*?<td class="record">.*?<\/tr>/g);
      } else {
        g = nText.match(/<td class="num">.*?<td class="result">.*?<\/td>/g);
      }
      if (DEBUG) {GM_log(g);}
     
     // construct an [non-capturing (?:.....)] exact match for the workTitle
      re = new RegExp('(?:^|\\s)' + workTitle + '(?:$|\\s.*|\\:|\\.)', "i");
      
      for ( var i=0; i < g.length; i++ ) {
       // filter out any foreign-language editions
        if ( /Language/.test(g[i]) ) {
          if ( !g[i].match(/Language:\s*English/) ) {
            continue;
          }
        }
       // filter out any non-book editions
        if ( /Type:/.test(g[i]) ) {
          if ( !g[i].match(/Type:.*?Book/) ) {
            continue;
          }
        }
        if (DEBUG) {GM_log(g[i]);}
       
       // pick out the booktitle text and apply the regex - is it a match?
        if (DEBUG) {GM_log(g[i].match(/.*>(.*?)<\/$/)[1].match(re));}
        if ( g[i].match(/.*>(.*?)<\/$/)[1].match(re) ) {
         
         // grab the oclc link reference
          oclc = g[i].match(/\/oclc\/(\d*)/)[1];
          
          if ( isEditionPage ) {
           // first try for the isbn the easy way - is there an amazon "buy" link?
            var isbn = g[i].match(/td class="buy"><a href=".*?ASIN\/(\d{9,12}[\d|X])/i);
            if ( isbn ) {
              isbn = this.isbn13(isbn[1]);
              if (DEBUG) {GM_log(isbn);}
              this.populateList(isbn);
              this.foundProduct(isbn, "amazonUS", true);
            } else {
              alert("No Amazon 'buy' link found");
              this.getWorldcatPage("http://worldcat.org/oclc/" + oclc, null);
            }
          } else {
            if (DEBUG) {GM_log(oclc);}
           // get the edition page
            this.getWorldCatPage("http://worldcat.org/oclc/" + oclc + "?tab=editions", true);
          }
        }
      }
       
      /* if ( /pagnNextLink/.test(rText) ) {
        var nextPage = eval(site).searchURL.match(/(.*?amazon.*?)\//)[1];
        nextPage += rText.match(/href="(.*?)".*?pagnNextLink/)[1];
        this.amazonNextPage(site, nextPage);
      } */
    },
    
    getWorldCatOclc: function(oclcnum) {
      $('worldcat').firstChild.setAttribute("src", icon.load);
      GM_xmlhttpRequest( {
        method:  'GET',
        url:     "http://worldcat.org/oclc/" + oclcnum,
        onload:  function(results) {
          $('worldcat').firstChild.setAttribute("src", worldcat.icon);
          if (DEBUG) {GM_log(eval(site).searchURL + workTitle + " " + workAuthor);}
          //GM_log(results.status+"\n"+results.responseText.replace(/^\s*/g, ""));
          isbnLookup.scrapeWorldcat(results.responseText, true);
        }
      });
    },

    getAmazonWork: function(site) {
      this.getAmazonPage(eval(site).searchURL + workTitle + " " + workAuthor, site);
    },
    
    getAmazonPage: function(searchURL, site) {
      $('searchForm').firstChild.setAttribute("src", icon.load);
      GM_xmlhttpRequest( {
        method:  'GET',
        url:     searchURL,
        onload:  function(results) {
          $('searchForm').firstChild.setAttribute("src", icon.form);
          if (DEBUG) {GM_log(searchURL);}
          //GM_log(results.status+"\n"+results.responseText.replace(/^\s*/g, ""));
          isbnLookup.scrapeAmazonPage(results.responseText, site);
        }
      });
    },

    scrapeAmazonPage: function(rText, site) {
     // normalise - eliminate line-feeds and spaces between elements
      var rText = rText.replace(/\n/g, "").replace(/>\s*</g, "><");
      //if (DEBUG) {GM_log(rText);}

     // all bindings or just books?
      var restrict_bindings = true;
     // reject any binding type not included here
      var bindings = '(Hardcover|Paperback|Mass Market Paperback|School & Library Binding)';
     
     // the current edition
      var currEditionBinding_re = new RegExp('<span class="binding">' + bindings + '<\/span>');
     // the "other editions" edition
      var oeEditionBinding_re = new RegExp('<a href="(.*?)">' + bindings + '<\/a>');
     
     // create a filter to extract the title from the surrounding edition record
      var title_re = new RegExp('<span class="srTitle">(.*?' + altWorkTitle + '.*?)<\/span>', "i");
     // create a more exacting title filter - rejects "loose" matches
      var title_exact_re = new RegExp('(?:^|\\s)(' + workTitle + '|' + altWorkTitle + ')(?:$|\\s.*|\\:|\\.|\\;)', "i");
//alert(title_exact_re);

     // we may be looking for more "other editions" on a books product page
      var productPage = false;
      if ( rText.match(/<body class="dp">/i) ) {
        productPage = true;
       // get the list of links referring to other editions
        var g = rText.match(/<table.*?class="otherEditions".*?>(.*?)<\/table>/)[1].match(/<a href=.*?<\/a>/g);
      } else {
        var g = rText.match(/<td class="dataColumn">(.*?)<\/td><\/tr><\/table><\/td><\/tr><\/table>/gi);
      }
      if (DEBUG) {GM_log(g.length/*  + "\n" + g */);}

      // was at least one workTitle found? - or other editions if on a book product page
      if ( g ) {
        // scan the list of book records
        for ( var i=0, h, isbn; i < g.length; i++) {
          if (DEBUG) {GM_log(g[i]);}
          
         // extract booktitle and test for an exact match on workTitle - not needed if on a book page
          if (DEBUG && !productPage) {GM_log(g[i].match(title_re));}
         // is it an exact match?
          if ( productPage || (g[i].match(title_re) && g[i].match(title_re)[1].match(title_exact_re)) ) {
            if (DEBUG && !productPage) {GM_log(g[i].match(title_re)[1].match(title_exact_re));}

           // grab the link reference
            if ( productPage ) {
              h = g[i].match(/<a href="(.*?)">/)[1];
            } else {
              h = g[i].match(/<a href="(.*?)"><span class="srTitle">/)[1];
            }
            isbn = false;

           // are all bindings allowed?
            if ( restrict_bindings ) {
             // is this edition an accepted binding?
              if ( (productPage && g[i].match(oeEditionBinding_re)) || g[i].match(currEditionBinding_re) ) {
               // test for a valid isbn
                isbn = h.match(/dp\/(\d{9,12}[\d|X])/i);
              }
            } else {
             // test for a valid isbn
              isbn = h.match(/dp\/(\d{9,12}[\d|X])/i);
            }
            if ( isbn ) {
              isbn = this.isbn13(isbn[1]);
              if (DEBUG) {GM_log(isbn);}
              this.populateList(isbn);
              this.foundProduct(isbn, site, true);
            }
           
           // no further processing needed if on a book product page
            if ( productPage ) {
              continue;
            }

           // are there links to other editions -  or a link to "see all editions"
            if ( g[i].match(/<td class="otherEditions">/) ) {
             
             // is there a "See all" editions link?
              var oe = g[i].match(/<td class="otherEditions">.*<a href="(.*?)">See all \d[\d]*<\/a>/);
              if ( oe ) {
               // yes - go to "see all editions" page
                
                if (DEBUG) {GM_log("link to 'See all Editions' page:"+oe[1]);}
                this.getAmazonPage("http://" + eval(site).domain + oe[1], site);
              
              } else {
               // must be just a few editions - extract isbns from the links and add them
               
               // regex extracts all the "Other Editions:" links
                var g_oe = g[i].match(/<td class="otherEditions">Other Editions:\s(.*?)<\/td>/i)[1].match(/<a href=".*?">.*?<\/a>[\,\s]*/g);
                if (DEBUG) {GM_log("Editions:"+g_oe);}
               
               // go thru the list of other editions - check binding and isbn
                for ( var j=0; j < g_oe.length; j++) {
                 
                 // check this other edition binding
                  h = g_oe[j].match(oeEditionBinding_re);
                  if ( h ) {
                    if (DEBUG) {GM_log("Edition href:"+h[1]);}
                   
                   // binding ok - check isbn, valid?
                    isbn = h[1].match(/dp\/(\d{9,12}[\d|X])/i);
                    if ( isbn ) {
                      isbn = this.isbn13(isbn[1]);
                      if (DEBUG) {GM_log(isbn);}
                      this.populateList(isbn);
                      this.foundProduct(isbn, site, true);
                    }
                  }
                }
              }
            } else if ( isbn ) {
             // maybe there ARE other editions - perhaps they're on the books "dp" page under table class="otherEditions" ??
              if (DEBUG) {GM_log("goto Product:"+h);}
              this.getAmazonPage(h, site);
            }
          }
        }
      }
      if ( rText.match(/pagnNextLink/) ) {
        var nextPage = "http://" + eval(site).domain;
        nextPage += rText.match(/<span class="pagnNext"><a href="(.*?)"/)[1];
        //if (DEBUG) {GM_log(nextPage);}
        this.getAmazonPage(nextPage, site);
      }
    },
    
    /* -------------------------------------------------------- */
    /* Process our ISBN list - all or partial (un-matched)*/
    /*    send ISBN and site reference to XHR routine    */
    /*    use timer delay to avoid being rejected as DOS  */
    /* -------------------------------------------------------- */
    findUnmatchedIsbns: function(site, unMatchedOnly) {
      var list = $('xisbnList');
      var c = $gt(list, 'li');
      
      var i = 0;
      function inner() {
        if ( i > c.length - 1 ) {
          clearInterval(timer);
        } else {
          if ( !unMatchedOnly || (unMatchedOnly && c[i].className.match(/notFound/)) ) {
            c[i].setAttribute('class', "xhr");
            isbnLookup.getProduct($gt(c[i], 'a')[0].textContent, site);
          }
        }
        i++;
      }
      var timer = setInterval(inner, 500);
    },
  
    /* -------------------------------------------------------------- */
    /* XHR - Get html data from search site about this ISBN */
    /* ------------------------------------------------------------- */
    // apply regex filter - does it match the sites "search failed" string?
    getProduct: function(isbn, site) {
      //GM_log(eval(site)[searchURL] + isbn);
      GM_xmlhttpRequest( {
        method:  'GET',
        url:     eval(site).searchURL + isbn,
        onload:  function(results) {
          //GM_log(results.status+" : "+results.statusText);
          //GM_log(results.responseText);
          var found = !results.responseText.match(eval(site).failStr);
          isbnLookup.foundProduct(isbn, site, found);
        }
      });
    },
    
    // brand the item found/unfound
    // if found, amend link to refer to site searched + class the LI container with site cssName
    // otherwise link ref to worldcat websearch page and class the LI container as 'unFound'
    foundProduct: function(isbn, site, found) {
      // returns the a container of the found isbn link
      var obj = this.findListNode(isbn);
      if ( !obj ) {alert("Error finding " + isbn + " in the list"); return;}
      if ( found ) {
        obj.parentNode.setAttribute('class', eval(site).cssClass);
        obj.setAttribute('href', eval(site).searchURL + isbn);
        obj.setAttribute('title', "Open " + eval(site).siteName + " with isbn " +isbn);
      } else {
        obj.parentNode.setAttribute('class', "notFound");
        obj.setAttribute('href', worldcat.wwwSrch_pA + "isbn:" + isbn + worldcat.wwwSrch_pB);
        obj.setAttribute('title', "Search WorldCat for this ISBN");
      }
    },
    
    // list helper - find + return the link containing this isbn
    findListNode: function(isbn) {
      var ac = $gt($('xisbnList'), 'a');
      for ( var i=0; i < ac.length; i++ ) {
        if ( ac[i].textContent == isbn ) {
          return ac[i];
        }
      }
      return false; // really! - the only way this could happen is if we don't feed it text (or a text node)
    },
    
    /* -------------------------------------------------------- */
    /* XHR - Get Language MetaData for each isbn         */
    /* -------------------------------------------------------- */
    // request xml data - gets lang + isbn from worldcat
    getMetaData: function() {
      //GM_log(worldcat.sMetaURL_pA + isbn worldcat.sMetaURL_pB);
      var items = $gt($('xisbnList'), 'a');
      var i = 0;

      function inner() {
        if ( i > items.length - 1 ) {
          clearInterval(timer);
        } else {
          GM_xmlhttpRequest( {
            method:  'GET',
            url:     worldcat.sMetaURL_pA + items[i].textContent + worldcat.sMetaURL_pB,
            onload:  function(response) {
              if ( response.status != 200 ) {
                alert("The xISBN request failed. Error=: " + response.statusText);
                return;
              }
              var page = response.responseText;
              /*GM_log([
                response.status,
                response.statusText,
                response.readyState,
                response.responseHeaders,
                response.responseText,
                response.finalUrl,
                this.url
              ].join("\n"));*/
              var mdata = page.match(worldcat.sMetaRE);
              //if ( !mdata ) GM_log(page + " >> " + items[i-1].textContent);

              var status = "ok"
              if ( !mdata ) {
                status = page.match(/stat="(.*)"/);
                //GM_log(status[1]);
              }
              var retIsbn = mdata ? mdata[3] : this.url.match(isbnRE); //items[i-1].textContent;
              var retLang = mdata ? mdata[2] : "";
              var retForm = mdata ? mdata[1] : "";

              var obj = isbnLookup.findListNode(retIsbn);
              if ( !obj ) {alert("Error finding " + retIsbn + " in the list"); return;}

             // check if exists already in this entry
              var s = obj.parentNode.getElementsByTagName("span");
              for (var i=0; i < s.length; i++) {
                if ( /(form|lang|unknown)/.test(s[i].className) ) {
                  return;
                }
              }

              s = $ce('span');
              if ( retForm ) {
                s.setAttribute('class', "form");
                s.setAttribute('title', retForm);
                var icon;
                switch ( retForm ) {
                  case "BA DA" :
                    icon = 'data:image/gif;base64,R0lGODlhCgALAIAAAP///9OSvSH5BAAAAAAALAAAAAAKAAsAAAISRI5nyQj/2GphNmgV1Rtn+ikFADs=';
                    break;
                  case "AA"    :
                    icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAA7UlEQVR42pWRy6pFcBTG1z+XgctA3sF7SMlEYaBIXk1JyIBkwsjLmBqYuZR1Drut095nd5xVq9bq6/e1LgT+GeST4Ps+pmlKbgG6rqMsy5Bl2d+A67q4LAtQFAVlWZ66YRjYti25ANM0kWVZ2Pf9TIZhYNs2qOv6MrRtG6uqIuQ5L/ku13WFw10URTj6JEkuIAxDjOP4AViWdQKHK8/zMAwDKIoCURRdgKqq2Pf9AwiCAOd5BpqmYZomkCQJxnGEruvIz92KoiBvSzuOg4IgnOPleX7qnufh82K/nlXTNOQ4DpqmufeHV9dbwKf4Ah/QZA3XXvNZAAAAAElFTkSuQmCC';
                    break;
                  case "BC"    :
                    s.setAttribute('title', retForm + " (Paperback)");
                  default      :
                    icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAALCAYAAACksgdhAAABeklEQVR42m2RsctBURjGnyNJMhhuJrPBYJBJtzvIIINkkGS4fwWL0R9hNBh0k0wGkwwyyCSDJINBiiTJIPc7z3v7LN/31unU2/s7z/M+R0FXo9FwY7EYXq8X/H4/0uk0LMtSs9nMnUwm0n+/39hutxiPx0pVq1U3m82iXq/jcDgINJ/PMZ1Owb5pmng8HojH42i32xiNRlDlctnN5XIolUpYLpcIhUJyOJjJZLDZbEQhlUqh1+thMBh4EF/UN1arFQKBAHa7HZ7PJyqVCo7HI/b7vVjudrvo9/tQWsHV/mHbNtbrtUC8b7ebQPf7XaBEIoFOp+Mp5fN5sVcsFmWXcDiM0+kkw7Va7WuPu1HFcRwoDQjUbDZxuVzw+XywWCxwPp9Ficq0yHRbrZZnT+8jcXMnWiLEBJPJpChcr1eJPBgMYjgcirIEYRjGF2DxTxgEVXw+n/R5IpGIBxUKBTcajUqTwywCtMchKrD/CzJZhX+KH05r/FC9w5+ZHy605L2I4IKQAAAAAElFTkSuQmCC';
                }
                var img = $ce('img');
                img.setAttribute('src', icon);
                s.appendChild(img);
              } else {
                s.setAttribute('class', "unknown");
                s.setAttribute('title', wcatStat[status[1]]);
              }
              obj.parentNode.appendChild(s);

              s = $ce('span');
              if ( retLang ) {
                s.setAttribute('class', "lang");
                s.appendChild($ct(retLang));
              } else {
                s.setAttribute('class', "unknown");
                s.setAttribute('title', wcatStat[status[1]]);
              }
              obj.parentNode.appendChild(s);
            }
          });
        }
        i++;
      }
      var timer = setInterval(inner, 500);
    },
    
    /* -------------------------------------------------------- */
    /* Search settings form - build and process functions */
    /* -------------------------------------------------------- */
    // construct the form & make display = hidden
    // the various try/catch are for IE "input type" creation
    hiddenForm: function(x, y) {
      var f, r, b, grp, div;
      
      var x = x + 5;
      f = $ce('form');
      f.setAttribute('style', "display: none; position: absolute; left:"+x+"px; top:"+y+"px;");
      f.setAttribute('name', "xisbnForm");
      f.setAttribute('id', "xisbnForm");
      grp = this.createGroup(f, "xISBN methods:");
      grp.setAttribute('id', "radios");
      grp.addEventListener("click", 
        function() {
          var missing = $("missingOnly");
          if ( $('worldcatMeta').checked ) {
            missing.nextSibling.style.color = '#aaa';
            missing.setAttribute('disabled', true);
          } else {
            missing.nextSibling.style.color = 'inherit';
            missing.removeAttribute('disabled');
          }
        }
      , false);
      for ( var i=0; i < siteSearchList.length; i++ ) {
        div = $ce('div');
        r = $ce('input');
        r.setAttribute('type','radio');
        r.setAttribute('name','site');
        r.setAttribute('id', siteSearchList[i]);
        //r.setAttribute('value', siteSearchList[i]);
        if ( i == 0 ) {
          r.checked = true;
        }
        div.appendChild(r);
        this.createLabel(div, eval(siteSearchList[i]).siteName, siteSearchList[i], "");
        grp.appendChild(div);
      }
      
      div = $ce('div');
      r = $ce('input');
      r.setAttribute('type','radio');
      r.setAttribute('name','site');
      r.setAttribute('id', 'worldcatMeta');
      r.setAttribute('title', "Appends the language code and form type (if known) to ALL isbns");
      div.appendChild(r);
      this.createLabel(div, "get Metadata", 'worldcatMeta', "Appends the language code and form type (if known) to ALL isbns");
      grp.appendChild(div);
      
      f.appendChild(grp);
      
      /* -------------- Scrape Amazon Group ----------------*/
      grp = this.createGroup(f, "Scrape Amazon:");
      grp.setAttribute("id", "scrape");
      div = $ce('div');

      r = $ce('input');
      r.setAttribute('type','radio');
      r.setAttribute('name','site');
      r.setAttribute('id', 'scrape_amazonUS');
      r.setAttribute('title', "Search Amazon US and SCRAPE the results for isbn data");
      r.addEventListener("click", 
        function() {
          var missing = $("missingOnly");
          if ( this.checked ) {
            missing.nextSibling.style.color = '#aaa';
            missing.setAttribute('disabled', true);
          }
        }
      , false);
      div.appendChild(r);
      this.createLabel(div, "US", 'scrape_amazonUS', "Search Amazon US and SCRAPE the results for isbn data");

      r = $ce('input');
      r.setAttribute('type','radio');
      r.setAttribute('name','site');
      r.setAttribute('id', 'scrape_amazonUK');
      r.setAttribute('title', "Search Amazon UK and SCRAPE the results for isbn data");
      r.addEventListener("click", 
        function() {
          var missing = $("missingOnly");
          if ( this.checked ) {
            missing.nextSibling.style.color = '#aaa';
            missing.setAttribute('disabled', true);
          }
        }
      , false);
      div.appendChild(r);
      this.createLabel(div, "UK", 'scrape_amazonUK', "Search Amazon UK and SCRAPE the results for isbn data");

      r = $ce('input');
      r.setAttribute('type','radio');
      r.setAttribute('name','site');
      r.setAttribute('id', 'scrape_amazonCA');
      r.setAttribute('title', "Search AmazonUS and SCRAPE the results for isbn data");
      r.addEventListener("click", 
        function() {
          var missing = $("missingOnly");
          if ( this.checked ) {
            missing.nextSibling.style.color = '#aaa';
            missing.setAttribute('disabled', true);
          }
        }
      , false);
      div.appendChild(r);
      this.createLabel(div, "CA", 'scrape_amazonCA', "Search Amazon CA and SCRAPE the results for isbn data");

      grp.appendChild(div);

      /* div = $ce('div');
      r = $ce('input');
      r.setAttribute('type','radio');
      r.setAttribute('name','site');
      r.setAttribute('id', 'scrape_worldcat');
      r.setAttribute('title', "Search Worldcat and SCRAPE the results for isbn data");
      div.appendChild(r);
      this.createLabel(div, "Worldcat", 'scrape_worldcat', "Search Worldcat and SCRAPE the results for isbn data");
      grp.appendChild(div); */
      
      f.appendChild(grp);
      
      grp = this.createGroup(f, "");
      b = $ce('input');
      b.setAttribute('type', "checkbox");
      b.setAttribute('name', "missingOnly");
      b.setAttribute('id', "missingOnly");
      b.checked = true;
      grp.appendChild(b);
      this.createLabel(grp, "un-matched only", 'missingOnly', "deselect to process the complete list of isbns");
      
      b = $ce('input');
      b.setAttribute('type', "button");
      b.setAttribute('name', "go_btn");
      b.setAttribute('id', "go_btn");
      b.setAttribute('value', "Go!");
      b.addEventListener('click', isbnLookup.processForm, false);
      f.appendChild(b);
      
      b = $ce('input');
      b.setAttribute('type', "button");
      b.setAttribute('name', "cancel_btn");
      b.setAttribute('id', "cancel_btn");
      b.setAttribute('value', "Cancel");
      b.addEventListener('click', function() {$('xisbnForm').style.display = "none";}, false);
      f.appendChild(b);
      
      document.body.appendChild(f);
    },
    
    // form build helper
    createGroup: function(pe, txt) {
      var g;
      g = pe.appendChild(document.createElement('fieldset')); // maxLinksGroup
      g.className = 'grp';
      if ( txt ) {
        var lg;
        lg = g.appendChild(document.createElement('legend'));
        lg.textContent = txt;
      }
      return g;
    },
  
    // form build helper
    createLabel: function(pe, label_text, for_attr, title_text) {
      var l;
      l = pe.appendChild(document.createElement('label')); // maxLinksLabel
      l.appendChild(document.createTextNode(label_text));
      l.setAttribute('for', for_attr);
      l.title = title_text;
      l.className = 'lbl';
      return l;
    },
    
    // Get the checked radio + checkbox items and either
    // - dispatch to search-site list handler
    // - or if checked, just get the language meta data for all list items
    processForm: function(e) {
      $('xisbnForm').style.display = "none";
      var fr = document.getElementsByName('site');
      for ( var i=0; i < fr.length; i++ ) {
        if ( fr[i].checked ) {
          
          isbnFormInfo = true; // set this trigger so cache save will happen
          
          //var chosen = i; //fr[i].value;
          //break;
          if ( fr[i].id == 'worldcatMeta' ) {
            isbnLookup.getMetaData();
          } else if ( fr[i].id.match(/^scrape_/) ) {
            if (DEBUG) {GM_log("processForm:" + fr[i].id.match(/scrape_(.*)/)[1])}
            isbnLookup.getAmazonWork(fr[i].id.match(/scrape_(.*)/)[1]);
            //isbnLookup.getAmazonWork(amazonUK);
            //isbnLookup.getAmazonWork(amazonCA);
          } else if ( fr[i].id == 'scrape_worldcat' ) {
            isbnLookup.getWorldactWork();
          } else {
            isbnLookup.findUnmatchedIsbns(eval(siteSearchList[i]), $('missingOnly').checked);
          }
          return;
        }
      }
    },
    
    /* -------------------------------------------------------- */
    /*                xisbnList Cache functions                    */
    /* -------------------------------------------------------- */
    addCacheGetLink: function() {
      var h = $gt($('xisbnDiv'), 'span')[0];
      var a = $ce('a');
      a.setAttribute('id', "cacheGet");
      a.setAttribute('title', "Retrieve searched results from cache");
      a.setAttribute('href', "#");
      a.addEventListener("click", 
        function(e) {
          e.preventDefault();
          isbnLookup.getCache();
        }
      , false);
      var img = a.appendChild($ce('img'));
      img.setAttribute('src', icon.disk);
      h.insertBefore(a, h.childNodes[1]);
    },
    
    setCache: function() {
//alert("save cache");
      setValue("xisbn_cache", location.pathname.match(/(\d*)\.htm/)[1] + /*encodeURIComponent(*/$("xisbnList").innerHTML)/*)*/;
    },
    
    getCache: function() {
      var cache = getValue("xisbn_cache", null);
      if ( cache ) {
        var m = cache.match(/^(\d*)(.*)/);
        //GM_log(m);
        var re = new RegExp(m[1]);
        if ( re.test(document.location) ) {
          this.restoreCachedItems(decodeURIComponent(m[2]));
        } else {
          alert("Cache has not been created for this work");
        }
      } else {
        alert("No cache found");
      }
    },
    
    restoreCachedItems: function(cache) {
      $('xisbnList').removeEventListener('DOMNodeInserted', this.addIsbn, false);
      var m = cache.match(/<li.*?>.*?<\/li>/g)
      var ac = $gt($('xisbnList'), 'a');
      for ( var i=j=0, found=false; i < m.length; i++, found=false, j=0 ) {
        for ( ; j < ac.length; j++ ) {
          if ( ac[j].textContent == m[i].match(/\d{13}/) ) {
            found = true; // list item was cached
            break;
          }
        }
        var innerCache = m[i].match(/<li.*?>(.*?)<\/li>/)[1];
        //GM_log(innerCache);
        var itemClass = m[i].match(/<li.*?class=\"(.*?)\">/)[1];
        if ( found ) {
          // is the list item preceded by <span class="iblist"/>, and was it cached that way? 
          // - may have been cached as <span class"backup"/>, or be a newly inserted manifestation since last cache save
          if ( ac[j].previousSibling && /iblist/.test(ac[j].previousSibling.className) && !/iblist/.test(innerCache) ) {
            if ( /backup/.test(innerCache) ) {
              innerCache = innerCache.replace("backup", "iblist");
            } else {
              //GM_log(ac[j].parentNode.innerHTML);
              // insert IBL span
              innerCache = "<span class='iblist'></span>" + innerCache;
            }
          }
          var pnode = ac[j].parentNode;
          pnode.className = itemClass;
          pnode.style.backgroundColor = "plum";
          //GM_log(pnode.innerHTML);
          pnode.innerHTML = innerCache;
          //GM_log(pnode.innerHTML);
        } else {
          // item in cache not found in our currently displayed xisbn list
          $("xisbnList").innerHTML += "<li class='" + itemClass + "' style='background-color:plum;'>" + innerCache + "</li>";
        }
      }
    },
    
    /* ---------------------------------------------- */
    /*      xisbn Conversion   10  to  13               */
    /* ---------------------------------------------- */
    // from http://refactormycode.com/codes/33-isbn10-to-isbn13
    // expects a valid isbn - if already 13 return it otherwise convert 10 to 13
    isbn13: function(isbn) {
      var isbn10 = isbn.match(/^(\d{9})[\dxX]$/);
      if ( !isbn10 ) {
        return isbn;
      }
      var sum_of_digits = 38 + 3 * (isbn[0]*1 + isbn[2]*1 + isbn[4]*1 + isbn[6]*1 + isbn[8]*1) + 
                                    isbn[1]*1 + isbn[3]*1 + isbn[5]*1 + isbn[7]*1;
      var check_digit = (10 - (sum_of_digits % 10)) % 10;
      return "978" + isbn10[1] + check_digit;
    },
    
    isbn10: function(isbn) {
      if ( !isbn.match(/\d{13}/) ) {
        return isbn;
      }
      var isbn = isbn.match(/^978(\d{9})\d$/)[1];
      var sum_of_digits = isbn[0]*10 + isbn[1]*9 + isbn[2]*8 + isbn[3]*7 + isbn[4]*6 + 
                          isbn[5]*5 + isbn[6]*4 + isbn[7]*3 + isbn[8]*2;
      var check_digit = (11 - (sum_of_digits % 11)) % 11;
      return isbn + (check_digit == 10 ? 'X' : check_digit);
    },
    
    /* -------------------------------------------------------- */
    /* All style settings                                               */
    /* -------------------------------------------------------- */
    //
    setStyles: function() {
      var css = [
        'div#main {margin-left: 185px !important;}',
        '/* container and heading */',
        '#xisbnDiv {width: 186px; clear: left; float: left; margin-top: 20px; margin-left: 2px; border: 2px solid green;}',
        '#xisbnDiv span.hdr {display: block; background-color: #F5E2AE; border-bottom: 1px solid black;}',
        '#xisbnDiv span h5 {width: 4.5em; margin: 0 auto; padding: 5px 0;}',
        '#xisbnDiv a#worldcat {float: left; padding: 6px;}',
        '#xisbnDiv a#amazon {float: left; padding: 6px 6px 5px; margin-left: 1px;}',
        '#xisbnDiv a#searchForm {float: right; padding: 3px 6px 4px;}',
        '#xisbnDiv a#cacheGet {float: right; padding: 5px 6px 6px; margin-right: 1px;}',
        '#xisbnDiv a#worldcat, a#searchForm, a#cacheGet, a#amazon {background-color: #F5FFFA;}',
        '#xisbnDiv a#worldcat:hover, a#searchForm:hover, a#cacheGet:hover, a#amazon:hover {background-color: #FDF5E6;}',
        '#xisbnDiv #xhrTotal {clear: both; float: right; background-color: #F5E2AE; padding: 5px; font-size: 120%;}',
        '/* isbns */',
        '#xisbnList, #xisbnList li {margin: 0; padding: 0; list-style: none;}',
        '#xisbnList {padding: 0 2px; line-height: 1.2em;}',
        '#xisbnList li {padding: 1px 0px; margin-left: 15px;}',
        '#xisbnList li a:link, #xisbnList li a:visited {float: left; color: black; margin-left: 2px;}',
        '#xisbnList li a:hover {color: red; background-color: white;}',
        '/* isbn checked highlighter */',
        '#xisbnList li span.iblist, span.backup {width: 0px; float: left; margin-right: -0px;}',
        '#xisbnList li span.iblist:after {margin-left: -15px; content: url('+icon.iblist+');}',
        '#xisbnList li span.backup:after {margin-left: -15px; content: url('+icon.iblbackup+');}',
        '#xisbnList li.xhr:after {margin-left: 5px; content: url('+icon.xhrRequest+');}',
        '#xisbnList li.notFound:after {margin-left: 5px; content: url('+icon.unMatched+');}',
        '#xisbnDiv  li.found:after {margin-left: 5px; content: url('+icon.found+');}',
        '#xisbnList li.amazonus:after {margin-left: 5px; content: url('+amazonUS.icon+');}',
        '#xisbnList li.amazonuk:after {margin-left: 5px; content: url('+amazonUK.icon+');}',
        '#xisbnList li.amazonca:after {margin-left: 5px; content: url('+amazonCA.icon+');}',
        '#xisbnList li.bn:after {margin-left: 5px; content: url('+bAndN.icon+');}',
        '#xisbnList li.powells:after {margin-left: 5px; content: url('+powells.icon+');}',
        '#xisbnList li.abe:after {margin-left: 5px; content: url('+abebooks.icon+');}',
        ' /* meta */',
        '#xisbnList .lang {width: 2em; font-size: 0.7em; float: right;}',
        '#xisbnList .form, #xisbnList .unknown {padding-left: 3px; width: 15px; float: right}',
        '#xisbnList .form img {float: right; position: relative; bottom: -2px;}',
        '#xisbnList .unknown:after {margin-right: 3px; content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAApElEQVR42mNkIBEw0kfD9WvX/r95+xanIhFhYQZpaWkGPn5+RkaQ4uvXrxM2mZGRwdnZmYHx4IED/98CTbe2scGp+OnTpwwP7t9nMDQ0ZGBct3btf5BgUHAwTv9cuXz5/61btxi0tbURNoiJieG04evXr2BsZ2/PwPjx48f/J0+cYPjy5QteP4iLi4OczQh3xsuXL//jUszNzc3Aw8PDSH48kAIAUO0/xY4PvP4AAAAASUVORK5CYII=)}',
        ' /* hidden form */',
        '#xisbnForm {width: 200px; border: 1px solid #666; -moz-border-radius: 4px; background-color: #FFE4C4;}',
        '#xisbnForm #go_btn, #cancel_btn {margin-bottom: 5px;}',
        '#xisbnForm #go_btn {float: left; margin-left: 30px;}',
        '#xisbnForm #cancel_btn {float: right; margin-right: 30px;}',
        '#xisbnForm .grp {border: 1px solid #ccc; border-right-color: #fff; border-bottom-color: #fff; margin: 10px; padding: 2px; background-color: #F5F5DC;}',
        '#xisbnForm legend {font-weight: bold; margin-top: -3px;}',
        '#xisbnForm #radios {line-height: 1.5em;}',
        '#xisbnForm #scrape * {float: left;}',
        '#xisbnForm #scrape input {margin-left: 15px;}',
        /*'#xisbnForm #radios div {border: 1px dotted #F5F5DC;}',*/
        /*'#xisbnForm #radios div:hover {border-color: black;}',*/
        '#xisbnForm .lbl {margin-left: 2px; vertical-align: top;}',
        ''
      ].join('');

      if ( typeof GM_addStyle != 'undefined' ) {
        GM_addStyle(css);
      } else if ( typeof PRO_addStyle != 'undefined' ) {
        PRO_addStyle(css);
      } else { // assume?? Opera
        var heads = $gt(document, 'head');
        if ( heads.length > 0 ) {
          var node = $ce('style');
          node.type = 'text/css';
          node.innerHTML = css;
          heads[0].appendChild(node);
        }
      }
    }
  }



  /* --------------------------------------------- */
  /*                    Begin                               */
  /* --------------------------------------------- */
   // filter the page links - looking for an isbn
  for ( var i=0, isbn; i < lnks.length; i++ ) {
    if ( /amazon/.test(lnks[i]) && lnks[i].textContent.match(isbnRE) ) {
      isbn = isbnLookup.isbn13(lnks[i].textContent);
      currentIsbns.push(isbn); // store it
      wemIsbns.push(isbn);
    }
  }

  // check for any backup isbns recorded at the foot of the page
  var h = $gt($('main'), 'h2');
  if ( h[h.length-1].textContent.match(/Backuped data from the old database/) ) {

    // well something has been backed-up - test for isbn numbers
    var node = nextElement(h[h.length-1]);
    var m = node.textContent.match(isbnRE);

    if ( m ) {  // yes - got backuped isbns
      var found, isbn;
      // test the list of backuped isbns for any that may already be assigned to a manifestation
      for ( var i=0; i < m.length; i++ ) {
        isbn = isbnLookup.isbn13(m[i]);
        // loop through the list of assigned isbns
        found = false;
        for ( var j=0; j < wemIsbns.length; j++ ) {
          if ( isbn == wemIsbns[j] ) {
            found = true;
            break;
          }
        }

        if ( !found ) { // not found in our list of assigned wem isbns
          currentIsbns.push(isbn); // store it
          backupIsbns.push(isbn);
        }
      }
    }
  }

  isbnLookup.init();

})();

/*
x = document.body.innerHTML;
x.match(/<a href=\"(.*?)\"><span.*?srTitle\">.*?Spirits of Flux and Anchor.*?</gi);
f = x.match(/<a href=\"(.*?)\"><span.*?srTitle\">.*?Spirits of Flux and Anchor.*?</gi)[0];
i = f.match(/<a href=\"(.*?)\"/)[1];
i.match(/(\d{9,12}[\d|X])/i)[1];

*/