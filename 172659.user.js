// ==UserScript==
// @name          Show only the negative comments in a thread
// @namespace     http://yankov.us
// @description   A Greasemonkey script that hides the positive comments
// @include       http://www.reddit.com*/comments/*
// @author        Hristo Yankov <hristo.yankov@gmail.com> http://yankov.us
// @version       1.2
// ==/UserScript==

/* SETTINGS */
var maxVote = -2;
var removeCommentsInsteadOfHide = true; // set this to FALSE in order to collaps the positive comments, instead of remove them.

function removePositiveComments() {
	$.each($("div.commentarea > div.sitetable > div.comment"), function(idx, comment) {
		vote = parseInt(
				$("> div.entry", comment).find("div.noncollapsed p.tagline span.unvoted").text()
				.replace(" points","")
				.replace(" point", "")
				);

		// It's a positive comment and we remove the positive comments
		if (vote > maxVote) {
			// We remove the comments
			if (removeCommentsInsteadOfHide) {
				$(comment).remove();
			}
			// We just collapse them
			else {
				var nonCollapsed = $("> div.entry", comment).find("div.noncollapsed");
				if (nonCollapsed.is(":visible")) {
					// Simulate click on the [-]
					nonCollapsed.find("a.expand:first").trigger("click");
				}
			}
		}
		// It's a negative comment - so extend it
		else {
			var collapsed = $("> div.entry", comment).find("div.collapsed");
			if (collapsed.is(":visible")) {
				// Simulate click on the [+]
				collapsed.find("a.expand:first").trigger("click");
			}
		}
	});

   $(".morecomments a:visible").trigger('click');
}

// Bind to the 'load more comments' link. We want to remove all the positivity loaded lol.
$(document).ajaxComplete(function(event, xhr, settings) {
    if ( settings.url === "/api/morechildren" ) {
        removePositiveComments();
    }
});

// Remove the initially loaded positive comments
removePositiveComments();