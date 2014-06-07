// ==UserScript==
// @name        Wikipedia Image Hider
// @namespace   http://userscripts.org/scripts/show/61977
// @description Hides all images on Wikipedia and shows them on a single click
// @include     *.wikipedia.org/wiki/*
// @include     *.wikimedia.org/*
// @grant       GM_getValue
// @grant       GM_setValue
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     20130905
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

// Where to insert image hider elements
var addTarget = $('#firstHeading');

var b_enabled = GM_getValue('WPImgHid_enabled', true); // enable this script?
var b_hideSvg = GM_getValue('WPImgHid_hideSvg', false); // hide svg images?

// Clickable - Show All Images
var showAllElem = $('<a>No hidden images</a>')
.attr('type', 'button')
.attr('href', '')
.attr('title', "There are no hidden images on this page")
.click(function (ev) {
  $(this).text("No hidden images");
  $('.image:hidden').each(function (index) {
    $(this).show()
    $(this).parent().find('a:last').remove();
  });
  ev.preventDefault();
});

// Checkbox - Enable image hiding
var toggleElem = $('<input>')
.attr('id', 'WPImgHid_GM_enabled')
.attr('type', 'checkbox')
.attr('title', 'Toggle image hiding on or off')
.change(function () {
  GM_setValue('WPImgHid_enabled', b_enabled ? false : true);
});

if (b_enabled)
  toggleElem.attr('checked', 'checked');

var toggleLabelElem = $('<label>Enable image hiding</label>')
.attr('for', toggleElem.attr('id'));

// Checkbox - Hide vector graphics
var vectorElem = $('<input>')
.attr('id', 'WPImgHid_GM_hideSvg')
.attr('type', 'checkbox')
.attr('title', "Include or exclude SVG images from being hidden")
.change(function () {
  GM_setValue('WPImgHid_hideSvg', b_hideSvg ? false : true);
});

if (b_hideSvg)
  vectorElem.attr('checked', 'checked');

var vectorLabelElem = $('<label>Hide vector graphics</label>')
.attr('for', vectorElem.attr('id') );

// Add links to page
$('<span>')
.css('font-size', 'small')
.append( showAllElem )
.append( document.createTextNode(" | ") )
.append( toggleElem ).append( toggleLabelElem )
.append( document.createTextNode(" | ") )
.append( vectorElem ).append( vectorLabelElem )
.insertBefore( addTarget );

// Search for images and hide them if plugin is enabled
var count = 0;

if (b_enabled) {
  $('.image').each(function (index) {
    var imgAlt = $(this).parent().find('img').attr('alt');
    var imgSrc = $(this).parent().find('img').attr('src');

    // Don't hide .svg
    var extRegExp = /.+\.svg/i;
    var isSvg = extRegExp.test( imgSrc );

    if (!isSvg || GM_getValue('WPImgHid_hideSvg', false)) {
      var imageDesc = (imgAlt != "" ? imgAlt : " this image");
      var showAnchor = $('<a>\u25CF Click to show ' + imageDesc + '</a>')
      .attr('href', '')
      .attr('title', imgSrc.split('/').pop())
      .click(function (ev) {
        $(this).parent().find('a').show();
        $(this).parent().find('a:last').remove();
        ev.preventDefault();
      });
      
      $(this).parent().append( showAnchor );
      $(this).hide();
      count++;
    }
  });
}

if (count > 0)
  showAllElem.text("Show all " + count + " images")
  .attr('title', "Click to show all hidden images on this page");
