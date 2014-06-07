// ==UserScript==
// @name        P3/COBOL Translation Helper
// @namespace   http://www.turrettech.com/jrb
// @include     https://www.transifex.com/projects/p/p3cobol-documentation/translate/*
// @include     https://bitbucket.org/turrettech/docs.p3cobol.com/annotate/*
// @version     1
// @grant       unsafeWindow
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$(document).ready(function() {
    if (document.location.hash) {
        var line = $('a[name="' + document.location.hash.substring(1) + '"]');
        if (line.length) {
            var newSpan = $('<div style="background-color: #FFC"></div>');
            var nextSibling = line.get(0).nextSibling;
            while(nextSibling != undefined && !$(nextSibling).is('a')) {
                newSpan.append($(nextSibling).clone());
                var siblingToDelete = nextSibling;
                nextSibling = nextSibling.nextSibling;
                siblingToDelete.remove();
            }
            line.after(newSpan);

        }
    }

    var occurrence = $('span#js-details-occurrences'),
		createLink = function(self) {
            var occurrenceData = $(self).text().split(", "),
                newHtml = $('<div/>');
            if ($(self).find('div').length > 0) {
            	$(self).remove('div');
            }
            if (occurrenceData.length) {
                occurrenceData.forEach(function(d) {
                    if (d.length) {
                        var i = d.replace(/\.\.\//g, "").split(":");
                        unsafeWindow.console.log("Adding link: " + i[0] + ":" + i[1]);
                        newHtml.append('<a href="https://bitbucket.org/turrettech/docs.p3cobol.com/annotate/master/' + i[0] + '#cl-' + i[1] + '">' + i[0] + ':' + i[1] + '</a>');
                        newHtml.append('<br/>');
                    }
                });
                $(self).html(newHtml);
                // catch the text element here
            }
		};
    
    if (occurrence.length && occurrence.html().length) {
        createLink();
    } else {
        var isLinking = false;
        var bindFunction = function() {
      		occurrence.off("DOMSubtreeModified", bindFunction);
            createLink(this);
      		occurrence.on("DOMSubtreeModified", bindFunction);
        };
		occurrence.on("DOMSubtreeModified", bindFunction);
    }
});