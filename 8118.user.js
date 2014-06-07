// ==UserScript==
// @name          Netflix Rating Granulizer
// @description   allows half star user ratings on Netflix
// @author        mabuse
// @include       http://*netflix.com/*
// ==/UserScript==

var unsafeWindow = this['unsafeWindow'] || window;
var document = unsafeWindow.document;


var ratingStrings = [];
ratingStrings[1.5] = "Craptastic";
ratingStrings[2.5] = "Mediocre";
ratingStrings[3.5] = "Pretty pretty good";
ratingStrings[4.5] = "The shit, for reals";

var ratingWidths = [];
ratingWidths[1.5] = 27;
ratingWidths[2.5] = 46;
ratingWidths[3.5] = 65;
ratingWidths[4.5] = 84;

var niOffset = 17;  /* rating width offset when not interested button is to the left */


/**
 * Patches anchor elements under the containing DIV of the given class name by adding child elements
 * with half-star rating widths among the existing elements.
 */
function patchAnchors(className, offset)
{
    var bars = document.getElementsByClassName(className);

    var hrefRegex = new RegExp('value=.');

    for (var i=bars.length-1; i >=0; i--)
    {
        var bar = bars[i];
        var anchors = bar.getElementsByTagName('a');
        if (anchors.length < 9)  /* only do once */
        {
            for (var j=4; j > 0; j--)
            {
                var rating = (5-j)+0.5;

                var oldAnchor = anchors[j];
                
                var newAnchor = document.createElement('a');
                newAnchor.href = oldAnchor.href.replace(hrefRegex, 'value='+rating);
                newAnchor.rel = 'nofollow';
                newAnchor.title = 'Click to rate the movie "'+ratingStrings[rating]+'"';
                newAnchor.innerHTML = 'Rate '+rating+' stars';
                newAnchor.setAttribute('style', 'width:'+(ratingWidths[rating]+offset)+'px');
                newAnchor.setAttribute('class', 'rv'+rating);   /* some netflix javascript parses this class name */

                bar.insertBefore(newAnchor, oldAnchor);
            }
        }
    }
}


var startTime = new Date();

patchAnchors('stbrIl', 0);
patchAnchors('strbrContainer', 0);

var endTime = new Date();

if (unsafeWindow.console)
    unsafeWindow.console.log('patch time = ' + (endTime-startTime) + 'ms');