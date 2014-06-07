// ==UserScript==
// @name           Twitter/Identi.ca/Facebook pretty print
// @namespace      http://www.michevan.id.au/
// @description    Does various character substitutions as you type to make your social media messages prettier and use less characters.
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @include        http://identi.ca/*
// @include        https://identi.ca/*
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==
// 2012-02-13: Handles new look identi.ca, and also facebook.
// 2010-12-19: Handles new look twitter.
// 2010-06-01: Added https://twitter.com/ as an include for the script.
// Also added (h) as a short version of (heart), and (deg) for degree.
// 2010-04-15: Now works error-free with Google Chrome browser.
// 2010-01-01: Fix so the cursor stays in the same position inside the text
// area instead of jumping to the end when a substitution is made.
// Changed mdash to be created by " --- " instead of just " - ", and added
// ndash being created by " -- ".
// 2009-09-18: Update to work for identi.ca as well. Refined the single and
// double quote conversions to work on white space and non-white space instead
// of word boundaries. Use \uXXXX escapes instead of the character directly.
// Fixed issue with character count not updating.
//
var PrettyPrintInit = function() {
  this.Substitution = function( reg, str ) {
    this.reg = reg;
    this.str = str;
  }

  var jQuery = null;

  var regs = new Array(
    new Substitution(/\s"(?=\S)/g, ' \u201C') // ldquo
  , new Substitution(/^"(?=\S)/g, '\u201C') // ldquo
  , new Substitution(/(\S)"\s/g, '$1\u201D ') // rdquo
  , new Substitution(/(\S)"$/g, '$1\u201D') // rdquo
  , new Substitution(/^'(?=\S)/g, '\u2018') // lsquo
  , new Substitution(/^\u2019(?=\S)/g, '\u2018') // lsquo
  , new Substitution(/\s'(\S)/g, ' \u2018$1') // lsquo
  , new Substitution(/\s\u2019(\S)/g, ' \u2018$1') // lsquo
  , new Substitution(/'/g, '\u2019') // lsquo
  , new Substitution(/\.\.\./g, '\u2026') // hellip
  , new Substitution(/\s--\s/g, ' \u2013 ') // ndash
  , new Substitution(/\s---\s/g, ' \u2014 ') // mdash
  , new Substitution(/\s\u2013-\s/g, ' \u2014 ') // mdash
  , new Substitution(/\(C\)/g, '\u00A9') // copyright
  , new Substitution(/\(c\)/g, '\u00A2') // cent
  , new Substitution(/\(R\)/g, '\u00AE') // registered trademark
  , new Substitution(/\(TM\)/g, '\u2122') // trademark
  , new Substitution(/\(bull\)/g, '\u2022') // bullet
  , new Substitution(/<=/g, '\u2264') // le
  , new Substitution(/>=/g, '\u2265') // ge
  , new Substitution(/==/g, '\u2261') // equiv
  , new Substitution(/~=/g, '\u2245') // cong (approx)
  , new Substitution(/!=/g, '\u2260') // ne
  , new Substitution(/>>/g, '\u00BB') // raquo
  , new Substitution(/<</g, '\u00AB') // laquo
  , new Substitution(/\(\+\)/g, '\u2295') // oplus
  , new Substitution(/\(x\)/g, '\u2297') // otimes
  , new Substitution(/\+-/g, '\u00B1') // plusmn
  , new Substitution(/\b1\/2\b/g, '\u00BD') // frac12 (1/2)
  , new Substitution(/\b1\/4\b/g, '\u00BC') // frac14 (1/4)
  , new Substitution(/\b3\/4\b/g, '\u00BE') // frac34 (3/4)
  , new Substitution(/<-/g, '\u2190') // larr
  , new Substitution(/->/g, '\u2192') // rarr
  , new Substitution(/\u2190>/g, '\u2194') // harr
  , new Substitution(/\u2264=/g, '\u21D0') // lArr
  , new Substitution(/\u2264>/g, '\u21D4') // hArr
  , new Substitution(/=>/g, '\u21D2') // rArr
  , new Substitution(/\u21D0>/g, '\u21D4') // hArr
  , new Substitution(/\(deg\)/g, '\u00B0') // degree
  , new Substitution(/\(h\)/g, '\u2665') // hearts
  , new Substitution(/\(heart\)/g, '\u2665') // hearts
  , new Substitution(/\(spade\)/g, '\u2660') // spades
  , new Substitution(/\(club\)/g, '\u2663') // clubs
  , new Substitution(/\(diamond\)/g, '\u2666') // diamonds
  );

  this.pretty = function( el ) {
    var val = el.value;
    for ( xi in regs ) {
      var sub = regs[xi];
      val = val.replace(sub.reg, sub.str);
    }
    if ( val != el.value ) {
      var length_delta = el.value.length - val.length;
      var selstart = el.selectionStart - length_delta;
      var selend = el.selectionEnd - length_delta;

      el.value = val;
      el.setSelectionRange(selstart, selend);

      if ( length_delta != 0 ) {
	// Simulate a change and key-up to refresh the character count.
	var evt = document.createEvent('MutationEvent');
	evt.initEvent('change', true, true);
	el.dispatchEvent(evt);

	evt = document.createEvent('KeyboardEvent');
	if ( typeof(evt.initKeyboardEvent) != 'undefined' ) {
	  evt.initKeyboardEvent('keyup', true, true, null, false, false, false, false, 0, 0);
	} else {
	  evt.initKeyEvent('keyup', true, true, null, false, false, false, false, 0, 0);
	}
	el.dispatchEvent(evt);
      }

      el.focus();
    }
  }

  this.handler = function( ev ) {
    pretty(ev.target);
    return true;
  }

  this.binder = function( ev ) {
    var el = jQuery(ev.target);
    if ( ! el.attr('pretty-print-bound') ) {
      el.attr('pretty-print-bound', 'true');
      el.bind('keyup', handler);
      console.log('binding textarea');
    }
  }

  this.init = function() {
    if ( typeof window.jQuery == 'undefined' ) {
      var JQuery_Script = document.createElement('script');
      JQuery_Script.setAttribute('src', '//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js');
      JQuery_Script.setAttribute('type', 'text/javascript');
      document.body.appendChild(JQuery_Script);
      var checker = setInterval(function() {
	if ( typeof window.jQuery != 'undefined' ) {
	  clearInterval(checker);
	  jQuery = window.jQuery;
	  window.jQuery.noConflict(true);
	  jQuery('textarea').live('focus', binder);
	  console.log('bound');
	}
      }, 100);
    } else {
      jQuery = window.jQuery;
      jQuery('textarea').live('focus', binder);
    }
  }

  init();
}

function PrettyPrintLoad(func) {
  var oldonload = window.onload;
  if ( typeof window.onload != 'function' ) {
    window.onload = func;
  } else {
    window.onload = function() {
      if ( oldonload) {
	oldonload();
      }
      func();
    }
  }
}

if ( window.top == window ) {
var PrettyPrint_Script = document.createElement('script');
PrettyPrint_Script.textContent = PrettyPrintLoad.toString() + '\nPrettyPrintLoad(' + PrettyPrintInit.toString() + ');';
document.body.appendChild(PrettyPrint_Script);
}