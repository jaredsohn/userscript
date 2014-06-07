// ==UserScript==
// @name          Microminimus Linkifier
// @namespace     http://userscripts.org/users/mustelascelesta
// @description   Makes links clickable in comments and message board posts on microminimus.com
// @include       http://microminimus.com/announcements/*
// @include       http://microminimus.com/archives/*
// @include       http://microminimus.com/galleries/*
// @include       http://microminimus.com/groups/*
// @include       http://microminimus.com/profiles/*
// @include       http://microminimus.com/stories/*
// @include       http://microminimus.com/topics/*
// @grant         none
// @version       0.2
// @updateURL     https://userscripts.org/scripts/source/173766.meta.js
// @downloadURL   https://userscripts.org/scripts/source/173766.user.js
// ==/UserScript==

/** 
 * The following linkify function contains code from the Google Closure Library used to create HTML links from plaintext.
 *
 * The Google Closure Library code is taken from two files:
 * - /closure/goog/string/string.js (http://code.google.com/p/closure-library/source/browse/closure/goog/string/string.js)
 * - /closure/goog/string/linkify.js (http://code.google.com/p/closure-library/source/browse/closure/goog/string/linkify.js)
 *
 * All Google Closure Library code used is at revision "95c19e7f0f5f":
 * http://code.google.com/p/closure-library/source/detail?r=95c19e7f0f5f66b005408c2de27db82a30fc4316
 *
 * The "goog.string.htmlEscape" function and associated regular expressions were used unmodified from string.js,
 * and linkify.js was used in its entirety, with the following modifications:
 *
 * - The "goog.string.linkify.linkifyPlainText" function has been changed to replace URLs in the text with unique tokens, 
 *   and to return an array of token to markup mappings. The "getToken" function was written for this script.
 *
 * - The HTML escaping in "goog.string.linkify.linkifyPlainText" is now only done for the link text, not the text surrounding each link.
 *   This was done to avoid double-escaping.
 *
 * - The patch given by thomasma...@gmail.com for issue 491 (http://code.google.com/p/closure-library/issues/detail?id=491) 
 *   has been applied so that characters such as '<' and '>' surrounding a URL in the text are not included in the link.
 *
 */
var linkify = (function () {
   // dummy object to satisfy Closure namespacing
   var goog = {
      string: {
         linkify: {}
      }
   };

   // The index passed to this function simply guards against the
   // indcredibly unlikely event that we get the same token for two
   // or more different URLs in the same comment paragraph.
   function getToken(index) {
      var min = 100000000000000;
      var max = 999999999999999;
      var rnd = Math.floor(Math.random() * (max - min + 1)) + min;
      return '$' + index + rnd + '$';
   }

   // Copyright 2008 The Closure Library Authors. All Rights Reserved.
   //
   // Licensed under the Apache License, Version 2.0 (the "License");
   // you may not use this file except in compliance with the License.
   // You may obtain a copy of the License at
   //
   //      http://www.apache.org/licenses/LICENSE-2.0
   //
   // Unless required by applicable law or agreed to in writing, software
   // distributed under the License is distributed on an "AS-IS" BASIS,
   // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   // See the License for the specific language governing permissions and
   // limitations under the License.

   /**
    * @fileoverview Utility function for linkifying text.
    * @author bolinfest@google.com (Michael Bolin)
    */

   /**
    * Takes a string of plain text and linkifies URLs and email addresses. For a
    * URL (unless opt_attributes is specified), the target of the link will be
    * _blank and it will have a rel=nofollow attribute applied to it so that links
    * created by linkify will not be of interest to search engines.
    * @param {string} text Plain text.
    * @param {Object.<string, string>=} opt_attributes Attributes to add to all
    *      links created. Default are rel=nofollow and target=blank. To clear those
    *      default attributes set rel='' and target='_blank'.
    * @return {string} HTML Linkified HTML text.
    */
   goog.string.linkify.linkifyPlainText = function (text, opt_attributes) {
      var attributesMap = opt_attributes || {};
      // Set default options.
      if (!('rel' in attributesMap)) {
         attributesMap['rel'] = 'nofollow';
      }
      if (!('target' in attributesMap)) {
         attributesMap['target'] = '_blank';
      }
      // Creates attributes string from options.
      var attributesArray = [];
      for (var key in attributesMap) {
         if (attributesMap.hasOwnProperty(key) && attributesMap[key]) {
            attributesArray.push(
               goog.string.htmlEscape(key), '="',
               goog.string.htmlEscape(attributesMap[key]), '" ');
         }
      }
      var attributes = attributesArray.join('');
      var links = [];

      var output = text.replace(
         goog.string.linkify.FIND_LINKS_RE_,
         function (part, before, original, email, protocol) {
            var linkText, afterLink;
            var link = [];

            if (!original) {
               return before;
            }

            link.push('<a ', attributes, 'href="');
            if (email) {
               link.push('mailto:');
               linkText = email;
               afterLink = '';
            } else {
               // This is a full url link.
               if (!protocol) {
                  link.push('http://');
               }
               var splitEndingPunctuation =
                  original.match(goog.string.linkify.ENDS_WITH_PUNCTUATION_RE_);
               if (splitEndingPunctuation) {
                  linkText = splitEndingPunctuation[1];
                  afterLink = splitEndingPunctuation[2];
               } else {
                  linkText = original;
                  afterLink = '';
               }
            }
            linkText = goog.string.htmlEscape(linkText);
            link.push(linkText, '">', linkText, '</a>');

            var token = getToken(links.length);
            links.push({
               token: token,
               link: link.join('')
            });

            return before + token + afterLink;
         });

      return {
         text: output,
         links: links
      };
   };

   /**
    * Gets the first URI in text.
    * @param {string} text Plain text.
    * @return {string} The first URL, or an empty string if not found.
    */
   goog.string.linkify.findFirstUrl = function (text) {
      var link = text.match(goog.string.linkify.URL_);
      return link != null ? link[0] : '';
   };

   /**
    * Gets the first email address in text.
    * @param {string} text Plain text.
    * @return {string} The first email address, or an empty string if not found.
    */
   goog.string.linkify.findFirstEmail = function (text) {
      var email = text.match(goog.string.linkify.EMAIL_);
      return email != null ? email[0] : '';
   };

   /**
    * @type {string}
    * @const
    * @private
    */
   goog.string.linkify.ENDING_PUNCTUATION_CHARS_ = ':;,\\.?\\[\\]';

   /**
    * @type {!RegExp}
    * @const
    * @private
    */
   goog.string.linkify.ENDS_WITH_PUNCTUATION_RE_ =
      new RegExp(
         '^(.*)([' + goog.string.linkify.ENDING_PUNCTUATION_CHARS_ + '])$');

   /**
    * @type {string}
    * @const
    * @private
    */
   goog.string.linkify.ACCEPTABLE_URL_CHARS_ =
      goog.string.linkify.ENDING_PUNCTUATION_CHARS_ + '\\w/~%&=+#\\-@!';
   // I've applied the patch given be thomasma...@gmail.com for issue 491
   // See http://code.google.com/p/closure-library/issues/detail?id=491

   /**
    * List of all protocols patterns recognized in urls (mailto is handled in email
    * matching).
    * @type {!Array.<string>}
    * @const
    * @private
    */
   goog.string.linkify.RECOGNIZED_PROTOCOLS_ = ['https?', 'ftp'];

   /**
    * Regular expression pattern that matches the beginning of an url.
    * Contains a catching group to capture the scheme.
    * @type {string}
    * @const
    * @private
    */
   goog.string.linkify.PROTOCOL_START_ =
      '(' + goog.string.linkify.RECOGNIZED_PROTOCOLS_.join('|') + ')://+';

   /**
    * Regular expression pattern that matches the beginning of a typical
    * http url without the http:// scheme.
    * @type {string}
    * @const
    * @private
    */
   goog.string.linkify.WWW_START_ = 'www\\.';

   /**
    * Regular expression pattern that matches an url.
    * @type {string}
    * @const
    * @private
    */
   goog.string.linkify.URL_ =
      '(?:' + goog.string.linkify.PROTOCOL_START_ + '|' +
      goog.string.linkify.WWW_START_ + ')\\w[' +
      goog.string.linkify.ACCEPTABLE_URL_CHARS_ + ']*';

   /**
    * Regular expression pattern that matches a top level domain.
    * @type {string}
    * @const
    * @private
    */
   goog.string.linkify.TOP_LEVEL_DOMAIN_ =
      '(?:com|org|net|edu|gov' +
   // from http://www.iana.org/gtld/gtld.htm
   '|aero|biz|cat|coop|info|int|jobs|mobi|museum|name|pro|travel' +
      '|arpa|asia|xxx' +
   // a two letter country code
   '|[a-z][a-z])\\b';

   /**
    * Regular expression pattern that matches an email.
    * Contains a catching group to capture the email without the optional "mailto:"
    * prefix.
    * @type {string}
    * @const
    * @private
    */
   goog.string.linkify.EMAIL_ =
      '(?:mailto:)?([\\w.+-]+@[A-Za-z0-9.-]+\\.' +
      goog.string.linkify.TOP_LEVEL_DOMAIN_ + ')';

   /**
    * Regular expression to match all the links (url or email) in a string.
    * First match is text before first link, might be empty string.
    * Second match is the original text that should be replaced by a link.
    * Third match is the email address in the case of an email.
    * Fourth match is the scheme of the url if specified.
    * @type {!RegExp}
    * @const
    * @private
    */
   goog.string.linkify.FIND_LINKS_RE_ = new RegExp(
      // Match everything including newlines.
      '([\\S\\s]*?)(' +
      // Match email after a word break.
      '\\b' + goog.string.linkify.EMAIL_ + '|' +
      // Match url after a workd break.
      '\\b' + goog.string.linkify.URL_ + '|$)',
      'g');

   /**
    * Escape double quote '"' characters in addition to '&', '<', and '>' so that a
    * string can be included in an HTML tag attribute value within double quotes.
    *
    * It should be noted that > doesn't need to be escaped for the HTML or XML to
    * be valid, but it has been decided to escape it for consistency with other
    * implementations.
    *
    * NOTE(user):
    * HtmlEscape is often called during the generation of large blocks of HTML.
    * Using statics for the regular expressions and strings is an optimization
    * that can more than half the amount of time IE spends in this function for
    * large apps, since strings and regexes both contribute to GC allocations.
    *
    * Testing for the presence of a character before escaping increases the number
    * of function calls, but actually provides a speed increase for the average
    * case -- since the average case often doesn't require the escaping of all 4
    * characters and indexOf() is much cheaper than replace().
    * The worst case does suffer slightly from the additional calls, therefore the
    * opt_isLikelyToContainHtmlChars option has been included for situations
    * where all 4 HTML entities are very likely to be present and need escaping.
    *
    * Some benchmarks (times tended to fluctuate +-0.05ms):
    *                                     FireFox                     IE6
    * (no chars / average (mix of cases) / all 4 chars)
    * no checks                     0.13 / 0.22 / 0.22         0.23 / 0.53 / 0.80
    * indexOf                       0.08 / 0.17 / 0.26         0.22 / 0.54 / 0.84
    * indexOf + re test             0.07 / 0.17 / 0.28         0.19 / 0.50 / 0.85
    *
    * An additional advantage of checking if replace actually needs to be called
    * is a reduction in the number of object allocations, so as the size of the
    * application grows the difference between the various methods would increase.
    *
    * @param {string} str string to be escaped.
    * @param {boolean=} opt_isLikelyToContainHtmlChars Don't perform a check to see
    *     if the character needs replacing - use this option if you expect each of
    *     the characters to appear often. Leave false if you expect few html
    *     characters to occur in your strings, such as if you are escaping HTML.
    * @return {string} An escaped copy of {@code str}.
    */
   goog.string.htmlEscape = function (str, opt_isLikelyToContainHtmlChars) {

      if (opt_isLikelyToContainHtmlChars) {
         return str.replace(goog.string.amperRe_, '&amp;')
            .replace(goog.string.ltRe_, '&lt;')
            .replace(goog.string.gtRe_, '&gt;')
            .replace(goog.string.quotRe_, '&quot;');

      } else {
         // quick test helps in the case when there are no chars to replace, in
         // worst case this makes barely a difference to the time taken
         if (!goog.string.allRe_.test(str)) return str;

         // str.indexOf is faster than regex.test in this case
         if (str.indexOf('&') != -1) {
            str = str.replace(goog.string.amperRe_, '&amp;');
         }
         if (str.indexOf('<') != -1) {
            str = str.replace(goog.string.ltRe_, '&lt;');
         }
         if (str.indexOf('>') != -1) {
            str = str.replace(goog.string.gtRe_, '&gt;');
         }
         if (str.indexOf('"') != -1) {
            str = str.replace(goog.string.quotRe_, '&quot;');
         }
         return str;
      }
   };

   /**
    * Regular expression that matches an ampersand, for use in escaping.
    * @type {RegExp}
    * @private
    */
   goog.string.amperRe_ = /&/g;

   /**
    * Regular expression that matches a less than sign, for use in escaping.
    * @type {RegExp}
    * @private
    */
   goog.string.ltRe_ = /</g;

   /**
    * Regular expression that matches a greater than sign, for use in escaping.
    * @type {RegExp}
    * @private
    */
   goog.string.gtRe_ = />/g;

   /**
    * Regular expression that matches a double quote, for use in escaping.
    * @type {RegExp}
    * @private
    */
   goog.string.quotRe_ = /\"/g;

   /**
    * Regular expression that matches any character that needs to be escaped.
    * @type {RegExp}
    * @private
    */
   goog.string.allRe_ = /[&<>\"]/;

   return goog.string.linkify.linkifyPlainText;
})();


/* The remaining code was written solely for this user script */

(function checkDependencies() {   
   if (typeof MM === 'undefined' || 
         !('Emoticons' in MM) || 
         typeof MM.Emoticons.render !== 'function' || 
         typeof $ !== 'function' || 
         typeof $.livequery !== 'function' || 
         !('fn' in $) ||
         typeof $.fn.emoticonize !== 'function') {
      alert('Either the "Microminimus Linkifier" script is running on a page it was not intended to work with ' +
         'or the script needs updating. Either way it probably won\'t work as expected.');
   }
})();

MM.Emoticons.render = function(){
   return $(".emoticons p").livequery(function () {
      var output = linkify($(this).html());
      $(this).html(output.text);
      $(this).emoticonize();
      $(this).html(replaceTokens($(this).html(), output.links));
   });
};

function replaceTokens(text, tokenArray) {
   for (var i = 0; i < tokenArray.length; i++) {
      text = text.replace(tokenArray[i].token, tokenArray[i].link);
   }
   return text;
}