// ==UserScript==
// @name           Bedre Dagbladet (dagbladet.no)
// @namespace      http://anderse.wordpress.com/
// @version        0.7.5
// @description    Lei av Justin Bieber eller andre nyheter om kjendiser og sladder? Denne utvidelsen fjerner alle disse artiklene fra forsiden og andre plagsomme bokser.
// @downloadURL    http://userscripts.org/scripts/source/165123.user.js
// @source         http://userscripts.org/scripts/show/165123
// @include        http://*.dagbladet.no/*
// @match          http://*.dagbladet.no/*
// @require        http://code.jquery.com/jquery-latest.js
// @copyright      2013 Anders Evenrud <andersevenrud@gmail.com>
// ==/UserScript==

(function($, undefined) {

  function cleanupDivs(divs, deep) {
    var parents = [];
    divs.each(function() {
      var el = $(this);
      parents.push(el.parent());
      el.remove();
    });

    $(parents).each(function() {
      if ( $(this).empty() ) {
        if ( deep ) {
          $(this).parent().remove();
        } else {
          $(this).remove();
        }
      }
    });
  }

  //
  // Main
  //
  $(document).ready(function() {

    // Remove mist ad containers
    cleanupDivs($('.adDiv'));
    $('.centerAd').remove();
    $('.adadad').remove();

    // Remove header (makes whitespace)
    $('#header').remove();

    // Article
    if ( $('.published.print').length ) {
      // Remove comments... always such insightfull commentary *sigh*
      $('#kommentarer').remove();

      // Remove "related articles" container
      $('#dzBottom').remove();
      return;
    }

    // Remove comment icons
    $('a.comments, a.poll, a.slideshow, a.kjendis, a.bullet-w, a.bullet-g, a.bullet-r, li.bullet-w, li.bullet-g, li.bullet-r, li.phone').css({'background': 'transparent'});

    // Remove gossip
    cleanupDivs($('.ref.pink'), true);

    // SOL.no ads and links
    $('#solBox').remove();
    $('#startquizteaser').remove();

    // Dagbladet TV box
    $('.dbtv').parents('div[class^=grid].colDropZone.locked').remove();

    // Treasury searches (Skatte søk)
    $('.skattesok').parents('div[class^=grid].first').parent().remove();

    // Start.no box
    $('#solquizteaser').remove();

    // Remove those ugly separators
    $('.ref').css('border-top', '0 none');

    // Remove bottom summary listings
    $('#doc .grid-g.summary').remove();

    // Remove TV-guide header
    /*
    $('#tvguide .xtop').remove();
    $('#tvguide div > .head').remove();
    $('#tvguide li.finished').css({'color': '#000', 'text-decoration': 'line-through'});
    */

    // Remove TV-Guide and add links to header instead
    $('#tvguide').remove();
    var root = $('#menuwrapper .nav.lower');
    root.append($('<a href="javascript:void(0)"> | </a>'));
    root.append($('<a style="font-weight:bold;" href="http://www.se.no/tv">TV-Guide</a>'));
    root.append($('<a style="font-weight:bold;" href="http://www.se.no/">Se.no</a>'));
  });

})($);
