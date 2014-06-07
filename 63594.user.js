// ==UserScript==
// @name           Delicious.com Private/Shared Bookmarks Only
// @namespace      http://blog.jacobodevera.com
// @description    Adds links to hide/show shared/public bookmarks in a user's page in delicious.com. This allows the user to see a list of their private bookmarks or a list of their shared bookmarks, a functionality that delicious.com does not provide yet.
// @author         Jacobo de Vera
// @include        http://delicious.com/*
// @require        http://code.jquery.com/jquery-1.3.min.js
// ==/UserScript==


// ***********************************************************************
// Some functions
// ***********************************************************************

function isUserPage()
{
	return $("body").hasClass("userposts");
}


function getAllBookmarks()
{
	return $("li.post");
}


function isPrivate(bookmark)
{
	return $(bookmark).hasClass("isPrivate");
}


function isPublic(bookmark)
{
	return !isPrivate(bookmark);
}


function hasDate(bookmark)
{
	return $("div.dateGroup", bookmark).size() != 0;
}


function setDate(bookmark, theDate)
{
	$("div.bookmark", bookmark).append(theDate);
}


function getDate(bookmark)
{
	return $(".dateGroup", bookmark);
}


/**
 * Adjust dates so that the correct date will be shown in the first bookmark
 * of the day when either all public or all private bookmarks are hidden.
 *
 * In Delicious, only the first bookmark saved in a specific day carries the
 * date. The following bookmarks are assumed to have been saved the same day,
 * until a new date is specified.
 *
 * This is a problem when the bookmark carrying the date is hidden, as any
 * visible bookmark saved in the same day will be grouped to whichever the
 * following date is.
 *
 * This function reads every date and assigns it to the first visible bookmark
 * saved in that particular day, marking it as a duplicate for future deletion
 * (if the hidden bookmarks are shown again).
 *
 */
function setDateToFirstVisibleBookmark(isVisible)
{
	var isLastDateVisible = false;
	var lastDate = 0;
	var lis = getAllBookmarks();

	for (var i = 0; i < lis.size(); i++) {
		item = lis[i];
		if (hasDate(item)) {
			lastDate = getDate(item); 
			isLastDateVisible = isVisible(item);
		}
		else {
			// Only set a date to an item if it is visible and there isn't a
			// previous visible bookmarks with the same date:
			if (isVisible(item) && !isLastDateVisible) {
				// Mark duplicate dates to remove them later
				setDate(item, lastDate.clone().addClass("dupDate"));
				isLastDateVisible = true;
			}
		}
	}
}


/**
 * This is a convenience wrapper to ensure the first private bookmark of a day
 * carries the date.
 */
function setDateToFirstPrivateBookmark()
{
	setDateToFirstVisibleBookmark(isPrivate);
}


/**
 * This is a convenience wrapper to ensure the first public bookmark of a day
 * carries the date.
 */
function setDateToFirstPublicBookmark()
{
	setDateToFirstVisibleBookmark(isPublic);
}


/**
 * Remove dates from private bookmarks that had one copied from the first
 * public bookmarks of the same day.
 *
 * This is used to undo the efects of setDateToFirstPrivateBookmark, brings
 * everything back to normal when both private and public bookmarks are
 * shown again.
 */
function removeDupDates()
{
	$(".dupDate").remove();
}

function showAllBookmarks()
{
	removeDupDates();
	getAllBookmarks().show();
}

function hidePublicBookmarks()
{
	showAllBookmarks();
	setDateToFirstPrivateBookmark();
	$('ul.bookmarks li.post:not(.isPrivate)').hide();
}

function hidePrivateBookmarks()
{
	showAllBookmarks();
	setDateToFirstPublicBookmark();
	$('ul.bookmarks li.post.isPrivate').hide();
}


// ***********************************************************************
// End of functions
// ***********************************************************************

// All those changes only make sense in a user's page
if (isUserPage()) {

	// Insert filter menu
	$("p#alt_message").after('<p id="filters" class="altMsg">Filters: </p>');
	var filters = $("p#filters");

	// Appy some style (copied from surrounding areas)
	filters.css({'border-top':'1px solid #DDDDDD', 'height' : '1.4em', 'padding': '2px 0 0'});

	// Add links
	filters.append('<a href="#" id="hidepublic">Show only private bookmarks</a>');
	$("a#hidepublic").click( function() { hidePublicBookmarks(); });

	filters.append('<em>|</em>'); // Separator

	filters.append('<a href="#" id="hideprivate">Show only public bookmarks</a>');
	$("a#hideprivate").click( function() { hidePrivateBookmarks(); });

	filters.append('<em>|</em>'); // Separator

	filters.append('<a href="#" id="showall">Show all bookmarks</a>');
	$("a#showall").click(  function() { showAllBookmarks(); });

}
