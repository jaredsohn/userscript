// ==UserScript==
// @name           Media RSS auto-generator
// @namespace      http://ecmanaut.googlecode.com/
// @description    Turns the image gallery microformat into a proper Media RSS feed which i e the PicLens extension, in turn, should in turn be able to turn into a full-blown luxurous photo gallery browser. (At present time of writing, that particular extension does however not grok the data: protocol and autodiscovery of dynamically added Media-RSS.)
// @include        http://*
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/node.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// ==/UserScript==

var urlParse = /^([^#?]+)(\?[^#]*)?/;
var imgext = /\.(jpe?g?|png|gif|bmp)$/i; // typical image extensions
var queryURL = /=((ht|f)tp(:|%3A)[^&]+)&/gi; // url embedded in query

var slice = Array.prototype.slice;
function array(a) { return slice.call(a); }

var images = extractImages(array(document.links));
if (images.length) addMediaRSS(images);

function extractImages(links, a) {
  function decode(arg) { return decodeURIComponent(arg.slice(1, -1)); }
  function addImg(url, link) {
    if (seen[url]) return;
    if (imgext.test(url)) {
      var img = { url: url };
      if (link) {
        var thumb = link.getElementsByTagName("img");
        if (thumb.length == 1) {
          thumb = thumb[0];
          img.thumb = thumb.src;
          img.title = thumb.title || thumb.alt || "";
        }
      }
      images.push(img);
    }
    seen[url] = true;
  }

  var seen = extractImages.seen = extractImages.seen || {}, images = [];
  for each (var link in links) {
    var butHash, path, query, urls, url = link.href || link;
    [butHash, path, query] = urlParse.exec(url);
    var tag = link.href ? link : a;
    if (imgext.test(path))
      addImg(url, tag);
    else if ((urls = (query||"").match(queryURL)))
      images = images.concat(extractImages(urls.slice(1).map(decode), tag));
  }
  return images;
}

function addMediaRSS(images) {
  var ns = "http://search.yahoo.com/mrss", atom = "http://www.w3.org/2005/Atom";
  var rss = <rss version="2.0" xmlns:media={ ns } xmlns:atom={ atom }/>;
  var type = "application/rss+xml", url = "data:"+ type +";base64,";
  for each (var image in images)
    rss.channel.item += <item>
      <title>{ image.title }</title>
      <link>{ image.url }</link>
      <media:thumbnail xmlns:media={ ns } url={ image.thumb || image.url }/>
      <media:content xmlns:media={ ns } url={ image.url }/>
    </item>;
  url += btoa('<?xml version="1.0" encoding="utf-8" standalone="yes"?>' +
              rss.toXMLString());
  node({ append: $X('/html/head'), tag: <link rel="alternate" id="gallery"
         href={ url } type={ type } title="" /> });
}
