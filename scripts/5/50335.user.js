// ==UserScript==
// @name           Image Hoster Skip Page
// @namespace      boardraider@camp-firefox.de
// @description    http://userscripts.org/scripts/show/50335
// @version        0.1.10
// @date           2010-02-25
// @copyright      2009-2010, boardraider
// @license        GPL 2 or later
// @include        http://*.imageshack.us/my.php?image=*
// @include        http://*.imageshack.us/i/*
// @include        http://*.imagebanana.com/view/*
// @include        http://*.directupload.net/file/*
// @include        http://*.hotlinkimage.com/img.php?*
// @include        http://*.picfoco.com/img.php?*
// @include        http://www.abload.de/image.php?img=*
// @include        http://www.bilder-upload.eu/show.php?file=*
// @include        http://www.imgimg.de/bild_*
// @include        http://pixpack.net/show/*
// @include        http://uppix.net/*
// @include        http://*.imagevenue.com/img.php?*
// @include        http://www.myimg.de/?img=*
// @include        http://www.bilder-space.de/show.php?*
// @include        http://www.img-teufel.de/img_*
// @include        http://www.postimage.org/image.php?*
// @include        http://*.imagehost.org/view/*
// @include        http://www.pic-upload.de/*
// @include        http://www.fotos-hochladen.net/view/*
// @include        http://sharenxs.com/view/*

// ==/UserScript==
//
// -----------------------------------------------------------------------------
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// -----------------------------------------------------------------------------

(function () {

var domain = window.location.host.match(/[^\.]+\.[^\.]+$/);
if (domain) {
  domain = domain[0];
  switch (domain) {
    case "imageshack.us": 
      var link = document.evaluate("//img[@alt = 'Direct' or @alt = 'Direkt']" +
        "/ancestor::a", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      if (link) {
        window.location = link.href;
      }
      break;
    case "imagebanana.com":
      window.location = window.location.href.replace(/\/view\//i, "/img/");
      break;
    case "directupload.net": 
      var img = document.evaluate("//img[@id = 'Bild']", document, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (img) {
        window.location = img.src;
      }
      break;
    case "hotlinkimage.com":
    case "picfoco.com":  
      var link = document.evaluate("//noscript/a[contains(@href," +
        "'hotlinkimage') or contains(@href, 'picfoco')]", document, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (link) {
        window.location = link.href;    
      }
      var img = document.evaluate("//img[@id = 'img']", document, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (img) {
        window.location = img.src;    
      }
    case "abload.de":
      var input = document.evaluate("//input[starts-with(@value, " +
        "'http://www.abload.de/img/')]", document, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (input) {
        window.location = input.value;
      }
      var a = document.evaluate("//a[starts-with(@href, " +
        "'/img/')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      if (a) {
        window.location = a.href;
      }
      break;
    case "bilder-upload.eu":
      var input = document.evaluate("//input[@type = 'image']", document, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (input) {
        window.location = input.src;
      }
      break;
    case "imgimg.de": 
      var input = document.evaluate("//input[@type = 'text']" +
        "[contains(@value, 'imgimg.de/uploads/')]", document, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (input) {
        window.location = input.value;
      }
      break;
    case "pixpack.net":
      var img = document.evaluate("//div[@class = 'show']//" +
        "img[@alt = 'PixPack']", document, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (img) {
        window.location = img.src;
      }
      break;
    case "uppix.net":
      var input = document.evaluate("//input[@name = 'directlink']", document,
        null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (input) {
        window.location = input.value;
      }
      break;
    case "imagevenue.com":
      var img = document.evaluate("//img[@id = 'thepic']", document, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (img) {
        window.location = img.src;
      }
      break;
    case "myimg.de":
      var img = document.evaluate("//img[@id = 'theimg']", document, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (img) {
        window.location = img.src;
      }
      break;
    case "bilder-space.de":
      var input = document.evaluate("//input[@type = 'image']", document, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (input) {
        window.location = input.src;
      }
      break; 
    case "img-teufel.de":
      var img = document.evaluate("//img[contains(@src, '/uploads/')]",
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      if (img) {
        window.location = img.src;
      }
      break;
    case "postimage.org":
      var img = document.evaluate("//center/img", document, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (img) {
        window.location = img.src;
      }
      break;
    case "imagehost.org":
      var input = document.evaluate("//table[@class = 'links']//" +
        "input[@class = 'wide'][not(contains(@value, 'view'))]", document, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (input) {
        window.location = input.value;
      }
      break;
    case "pic-upload.de":
      var img = document.evaluate("//img[@id = 'thepic']", document, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (img) {
        window.location = img.src;
      }
      break;
    case "fotos-hochladen.net": 
      window.location = window.location.href.replace("/view", "");
      break;
    case "sharenxs.com":
      var img = document.evaluate("//img[contains(@src, '/thumbnails/')]",
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      if (img) {
        window.location = img.src.replace(/sharenxs.com/,
          "images.sharenxs.com").replace(/thumbnails\//, "").replace(/tn-/,
          "").replace(/mid/, "wz");
      }
      break;
    default:
      break;
  }
}

})();
