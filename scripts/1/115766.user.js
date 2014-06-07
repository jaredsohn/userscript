// ==UserScript==
// @name           The Doctrine and Covenants in Paragraphs
// @namespace      joeyhewitt
// @description    Re-organizes the text of The Doctrine and Covenants at lds.org into paragraphs based on the verse ranges given in the section heading.
// @match          http://lds.org/scriptures/dc-testament/dc/*
// @icon           http://lds.org/scriptures/bc/scriptures/teasers/home/images/classic-scriptures.png
// ==/UserScript==

// https://gist.github.com/437513

(function(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ldscdn.org/scripts/jquery/1.4.4/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
})(function() {





var $versePs = $('.verses>p');
$versePs.css('display', 'inline');
$versePs.find('.verse').css({'font-size': '10px', 'vertical-align': 'super', 'line-height': 1, 'visibility': 'hidden', 'position': 'absolute', 'margin-left': '-0.5em' });
$versePs.hover(function() {
	$(this).find('.verse').css('visibility', 'visible');
}, function() {
	$(this).find('.verse').css('visibility', 'hidden');
});

$('.summary a').each(function() {
	var $rangeLink = $(this);
	var url = $rangeLink.attr('href').split('?')[0];
    var pieces = url.split('/');
    if (pieces.length) {
        var verseRange = pieces[pieces.length-1].split('.');
        if (verseRange.length == 2) {
            verseRange = verseRange[1].split('-');
            if (verseRange.length == 2) {
                var endVerse = verseRange[1];
                $('a[name='+endVerse+']').parent().after('<p/>');
            }
        }
    }
});




});
