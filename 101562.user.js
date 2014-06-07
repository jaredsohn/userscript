// ==UserScript==
// @name           Dinosaur Comics: Show hidden text
// @namespace      http://userscripts.org/users/121156
// @description    Pull out all the easter eggs hidden in each Qwantz comic so you don’t have to hunt for them.
// @include        http://*qwantz.com/index.php*
// @require        http://code.jquery.com/jquery-1.5.2.min.js
// @require        https://github.com/jaz303/jquery-grab-bag/raw/master/javascripts/jquery.dom-builder.js
// ==/UserScript==

const CSS = '.rss-title { font-size: 1.4em; } .rss-title span { font-size: 0.6em; } .easter-eggs { text-align: left; } .easter-eggs .title { font-weight: bold; font-size: 1.1em; text-align: center; } .easter-eggs span { font-weight: bold; }';
const CLASS = 'easter-eggs';
const COMIC_IMAGE_XPATH = "//img[@class='comic']";
const RSS_TITLE_XPATH = "//comment()[contains(., 'rss-title')]";
const EMAIL_HREF_XPATH = "//div[@id='header']//a[starts-with(@href, 'mailto:')]/@href";

function $X (expression, context) {
  if (typeof context == 'undefined')
    context = document;

  return document.evaluate(expression, context, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}

function empty (string) { return (string.search(/\S/) == -1); }

jQuery(function ($) {
         var container = $$('div', { className: CLASS });
         container.append($$('p', 'Easter eggs', { className: 'title' }));

         function add (label, text) { if (empty(text)) return; container.append($$('p', $$('span', label, ': '), text)); }

         var comicTitle = $($X(COMIC_IMAGE_XPATH)).attr('title');
         if (!comicTitle)
           return;

         var emailHref = $X(EMAIL_HREF_XPATH).nodeValue;
         var emailSubject = emailHref.match(/subject=(.+)$/)[1];

         var rssTitle = $X(RSS_TITLE_XPATH).nodeValue.match(/>(.+)</)[1];

         add('Tooltip', comicTitle);
         $($X(COMIC_IMAGE_XPATH)).removeAttr('title');
         add('E-mail subject', emailSubject);

         $('head').append($$('style', CSS, { type: 'text/css' }));

         if (container.children().length > 1)
           $('img.comic').after(container);

         if (!empty(rssTitle))
           $('img.comic').after($$('p', $$('span', 'RSS: '), rssTitle, { className: 'rss-title' }));
       });