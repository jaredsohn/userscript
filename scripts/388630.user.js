// ==UserScript==
// @name       Kissmanga show thumbs
// @namespace  http://nerdyweekly.com
// @version    0.1
// @description  It's obvious
// @match    http://kissmanga.com/MangaList*
// @match    http://kissmanga.com/Genre*
// @copyright  public domain
// ==/UserScript==

// They've already included jQuery so I thought, why not use it?

// <a> tags of manga titles
var aTags = $('.listing tbody tr td:first-child a');

// Activate hover states so the tooltip divs are built
aTags.each(function() {
    $(this).trigger('mouseenter');
    $(this).trigger('mouseleave');
});

// Get images from the generated tooltips
var imgs = $('.tooltip img');

// Go wild!
aTags.each(function(index, element) {
    $(this).append(imgs[index]);
});
