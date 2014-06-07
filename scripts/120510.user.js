// ==UserScript==
// @name        RedditMediaFilter
// @namespace   http://www.userscripts.org
// @description filter reddit posts with images or videos
// @version     0.3
// @date        2013-06-03
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @include     *reddit.com*
// ==/UserScript==

var entriesFiltered = 0;

var domainsToFilter = [
  "imgur.com",
  "i.imgur.com",
  "i.minus.com",
  "media.wtf.nl",
  "dorkly.com",
  "quickmeme.com",
  "m.quickmeme.com",
  "qkme.me",
  "livememe.com",
  "memegenerator.com",
  "memegen.com",
  "mememaker.net",
  "flickr.com",
  "vine.co"
];

$.each($("#siteTable div.thing"), function(ignoreIndex, item){
  var isJPG = $(item).find(".entry .title a.title[href$='.jpg']");
  var isJPEG = $(item).find(".entry .title a.title[href$='.jpeg']");
  var isPNG = $(item).find(".entry .title a.title[href$='.png']");
  var isGIF = $(item).find(".entry .title a.title[href$='.gif']");
  var videoButton = $(item).find('div.expando-button.video');
  var domain = $(item).find("span.domain a").text();
  if (isJPG.length > 0 ||
      isPNG.length > 0 ||
      isGIF.length > 0 ||
      isJPEG.length > 0 ||
      videoButton.length > 0 ||
      jQuery.inArray(domain, domainsToFilter) > -1) {
    $(item).remove();
    entriesFiltered += 1;
  }
});

$('.menuarea .dropdown.lightdrop').append("<span>Hiding " + entriesFiltered + " Entries</span>");

