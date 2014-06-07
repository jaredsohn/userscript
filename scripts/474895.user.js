// ==UserScript==
// @name Ilta-Saatana Ilta-Sanomille
// @description Saatana!
// @version 2.0.0
//
// @include http://www.iltasanomat.fi/*
// @include http://iltasanomat.fi/*
// @grant none
//
// @require http://code.jquery.com/jquery-2.1.0.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

/* Satanifies a text string. */
function satanify(text) {
	text = text.trim();
	var words = text.split(" ");
	var last = words[words.length - 1];
	var satan = "saatana";

	// uppercase
	if (last == last.toUpperCase() && !/^[0-9]*$/.test(last))
		satan = satan.toUpperCase();

	// ends with a quote, exclamation or question
	if (text.match(/.*[!?"']$/)) {
		return text.slice(0, text.length - 1) + " " + satan + text.slice(text.length - 1, text.length);
	}

	return text + " " + satan;
}

// Welcome to JavaScript
$(function() {
  $.fn.satanify = function(suffix) {
    var suffix = suffix || '';

    $(this).each(function() {
      $(this).contents().each(function() {
        if (this.nodeType == Node.TEXT_NODE && !this.hasChildNodes() && this.textContent.trim().length > 0) {
          this.textContent = satanify(this.textContent) + suffix;
          return false;
        }
      });
    });
  };
});

$(function() {
  // Main body titles
  $('a h2, a h3, h2 a, h3 a').satanify();

  // Sidebar most read
  $('h2.currentlyread').satanify();
  $('[id^=mostRead_] .numberbullet-list li a').satanify(' ');

  // Sidebar latest
  $('[id^=latestArticles-] h2:first').satanify();

  // Sidebar most commented
  $('.most-commented-text').satanify(' ');

  // Generic sidebar link lists
  $('[id^=configLinkList] li a, [id^=latestArticles] li a').satanify(' ');

  // Individual news page titles
  $('#content #main h1:first').satanify();
});

