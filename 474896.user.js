// ==UserScript==
// @name Ilta-Saatana Ilta-Lehdelle
// @description Saatana!
// @version 2.0.0
//
// @include http://www.iltalehti.fi/*
// @include http://iltalehti.fi/*
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
  // Body headings
  $('h1.juttuotsikko span.otsikko:last-of-type').satanify();

  // Left
  $('#container_vasen p a:not(.palstakuva)').satanify(' ');

  // Right
  $('#container_oikea [class$=link-list] p a:not(.palstakuva)').satanify(' ');
  $('#container_oikea .widget a .list-title').satanify();

  // Footer
  $('.footer_luetuimmat_container .list-title').satanify();
});

