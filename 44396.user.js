// ==UserScript==
// @name           Slashdot - Article images
// @namespace      http://khopis.com/scripts
// @description    Nabs a thumbnail from Google Images for each story
// @include        http://slashdot.tld/*
// @include        http://*.slashdot.tld/*
// @exclude        http://idle.slashdot.tld/*
// @author         Adam Katz <scriptsATkhopiscom>
// @copyright      2009 by Adam Katz
// @license        AGPL v3+
// @version        0.11
// @lastupdated    2009-10-09
// ==/UserScript==
/*
 * This takes the *FIRST* hit on Google Images and uses the Google-provided
 * thumbnail.  This can result in ... the Slashdot category image, nothing at
 * all, a humorous unrelated image, or sometimes something offensive and/or
 * unsuitable for work (NSW).  DO NOT USE THIS AT WORK if that's a problem.
 *
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License at <http://www.gnu.org/licenses>.
 */

GM_addStyle("" + <style><![CDATA[

.catIcons		{ float:right; position:relative; z-index:50; }
.catIcons > div[class]	{ float:right; }

]]></style>);

function gcSize(elem, dimension) {
  return getComputedStyle(elem,null).getPropertyValue(dimension)
         .replace(/[.p].*/,'');
}

function set_story_thumb(story, thumb, href) {
  var uri = "http://www.google.com/m/search?output=xhtml&site=images&sa=X"
          + "&oi=image&start=0&q=" + encodeURI(story);
  if (href == '') { // google-images search instead of self-ref on article pages
    href = "http://images.google.com/images?gbv=1&q=" + encodeURI(story);
    story = "Google image search for: " + story;
  } else {
    story = story + " (image from Google)";
  }
  window.setTimeout(function() { GM_xmlhttpRequest({
    method: 'GET',
    url: uri,
    onload: function(response) {
      var gi = response.responseText.match
        (/<img [^>]*\bsrc="http:..[^/"]*\.gstatic\.com\/images.q=[^>"]*/g);
      var h = gcSize(thumb.parentNode,"height");
      h *= 0.8;
      for (var t=0; gi && t<gi.length; t++) {
        // skip slashdot topic images (this is the whole reason for the loop).
        if ( gi[t].match(/\bimages\.slashdot\.org%2Ftopics\b/) ) { continue; }
        var newthumb = document.createElement("a");
        newthumb.href = href;
        newthumb.title = story;
        var newimg = document.createElement("img");
        newimg.src = gi[t].replace(/.*\bsrc="/,'');
        newthumb.appendChild(newimg);
        thumb.appendChild(newthumb);
        var oldh = gcSize(newimg,"height");
        newimg.style.height = h + "px";
        if (h > oldh * 2) { h = oldh*1.5; newimg.style.height = h + "px"; }
        if ( gcSize(newimg,"width") > h*1.3 ) {
          newimg.style.height = "inherit";
          newimg.style.width = (h*1.3) + "px";
        }
        break;
      }
    }
  }); } ); // end xmlhttpRequest and setTimeout
}

function parseThumbedArticle(story, thumb) {
  var cat = story.getElementsByTagName("span");
  if (!cat || cat.length < 1) return thumb;
  cat = cat[0].getElementsByTagName("a");
  if (!cat || cat.length < 1 || !cat[0].href) return thumb;
  cat = cat[0];
  var catIMG = cat.href.match(/.*\/\/([^.]+)\.slashdot/);
  if (!catIMG || catIMG.length < 2 ) return thumb;
  var catSRC="http://images.slashdot.org/topics/topic"+catIMG[1]+".gif";
  thumb.innerHTML = '<a class="mainCatIMG catIMG" href="'
    + cat.href + '" title="' + cat.innerHTML
    + '"><img src="' + catSRC + '" alt="' + cat.innerHTML
    + '"></a>' + thumb.innerHTML;
}


function parseArticle(article) {

  // Get story title
  var story = article.getElementsByClassName("datitle");
  if (story.length != 1) {
    GM_log("failed to get story name");
    return false;
  }
  story = story[0];
  story = story.innerHTML
            .replace(/\s*<[^>]+>\s*/g,' ').replace(/\s+/g,' ')
            .replace(/&[^;]{1,4};/g,".").replace(/[^\/;,$\w\s-]/g,'.')
            .replace(/^[\s.]+|[\s+.]$/g,'')
            .replace(/^update[sd]?\b|\bnow\b|\bdemos?\b/gi,'');

  // Get story URL
  var href = '';
  var hrefsearch = article.getElementsByClassName("more");
  if (hrefsearch.length>0 && hrefsearch[0].href) { href = hrefsearch[0].href; }

  // Get thumb container
  var media = article.getElementsByClassName("media");
  if (media.length != 1) {
    GM_log("Found "+media.length+" media classes inside an article.  "
           + "I was expecting only one...");
    return false;
  }
  media = media[0];

  // Create new place for category icons (top left of article, by story title)
  var catIcons = document.createElement("div");
  catIcons.className = "catIcons";
  article.insertBefore(catIcons, article.firstChild);

  // populate category icon area
  if ( media.innerHTML.match(/="(?:[^"]*\s)?thumbnail/) ) {
    parseThumbedArticle(story, catIcons);
  } else {
    catIcons.innerHTML = media.innerHTML;
  }

  media.innerHTML = ''; // Wipe thumb container

  set_story_thumb(story, media, href);
}

var articles = document.getElementsByClassName("article");
for (var a=0; a<articles.length; a++) {
  parseArticle(articles[a]);
}

function onNodeInsert(event) {
  if (event && event.target && event.target.className
  && event.target.className.match(/(^|\s)article(\s|$)/)) {
    parseArticle(event.target);
  }
}

var scope = document.getElementsByClassName("fhroot");
if (scope.length == 1) { scope = scope[0]; } else { scope = document; }
scope.addEventListener('DOMNodeInserted', onNodeInsert, false);
