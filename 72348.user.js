// ==UserScript==
// @name           LP_TranslationDiff
// @require        http://google-diff-match-patch.googlecode.com/svn/trunk/javascript/diff_match_patch.js
// @namespace      http://bananeweizen.de
// @description    Highlights the differences in translation strings on Launchpad.net, when hovering over new suggestions
// @include        http*://translations*launchpad.net*+translate*
// ==/UserScript==

/*
 * This user script for Greasemonkey makes it easier to review the differences between current translation and new suggestions
 * when translating applications on Launchpad.net. When hovering over a suggestion, the text will be replaced by a colored
 * diff representation.
 *
 * Please report any problems or suggestions to the author.
 *
 * Author: Michael Keppler
 * Mail: bananeweizen@gmx.de
 */

/**
 * global diff-match-patch, so we can avoid creating new objects
 */
var dmp;

/**
 * current translation/suggestion strings
 */
var translation, suggestion;

/**
 * remove HTML and the icons for space/return from the string we want to diff
 * @param htmlString
 * @return cleaned string
 */
function removeHTML(htmlString) {
	return htmlString.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/<img alt="" src="\/@@\/translation-newline"><br>/g,'').replace(/<samp> <\/samp>/g,' ');
}

/**
 * toggle visibility of elements (effectively showing the hideElement instead of the showElement)
 * @param showElement DOM element
 * @param hideElement DOM element
 * @return nothing
 */
function showHideFunction(showElement, hideElement){
	return function () {
		hideElement.style.display = 'none';
		showElement.style.display = 'block';
	};
}


/**
 * modified version of diff_prettyHtml (to avoid showing tooltips with character indexes)
 * @param diffs
 * @return nice HTML output
 */
function prettyHtml(diffs) {
  var html = [];
  var i = 0;
  for (var x = 0; x < diffs.length; x++) {
    var op = diffs[x][0];    // Operation (insert, delete, equal)
    var data = diffs[x][1];  // Text of change.
    var text = data.replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/\n/g, '&para;<BR>');
    switch (op) {
      case DIFF_INSERT:
        html[x] = '<INS STYLE="background:#D6FFD6;">' + text + '</INS>';
        break;
      case DIFF_DELETE:
        html[x] = '<DEL STYLE="background:#FFD6D6;">' + text + '</DEL>';
        break;
      case DIFF_EQUAL:
        html[x] = '<SPAN>' + text + '</SPAN>';
        break;
    }
    if (op !== DIFF_DELETE) {
      i += data.length;
    }
  }
  return html.join('');
};


// find all divs with a "lang" attribute
var allDivs = document.evaluate(
    "//div[@lang]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

// iterate over them and distinguish current translations and suggestions
for (var i = 0; i < allDivs.snapshotLength; i++) {
	var thisDiv = allDivs.snapshotItem(i);
	if (thisDiv.id.indexOf("translation") >= 0 ) {
		translation = removeHTML(thisDiv.innerHTML);
		messageId = thisDiv.id.substring(0, thisDiv.id.indexOf('_',8));
		suggestion = null;
	}
	else if (thisDiv.id.indexOf("suggestion") >= 0) {
		if (thisDiv.id.indexOf(messageId) >= 0) {
			// suggestion and matching translation
			suggestion = removeHTML(thisDiv.innerHTML);
		}
		else {
			// a suggestion, but no translation yet -> reset translation
			translation = null;
		}
	}
	// now calculate the suggestion difference
	if (translation != null && suggestion != null) {
		// lazy initialization of diff algorithm
		if (dmp == null) {
			dmp = new diff_match_patch();
		}

		// compute diff and make it more readable
		var diff = dmp.diff_main(translation, suggestion);
		dmp.diff_cleanupSemantic(diff);

		// append the diff after the suggestion on the browser page
		newElement = document.createElement('div');
		thisDiv.parentNode.insertBefore(newElement, thisDiv.nextSibling);

		newElement.innerHTML = prettyHtml(diff);

		// register mouse events to allow hover effect
		thisDiv.addEventListener('mouseover', showHideFunction(newElement, thisDiv), true);
		newElement.addEventListener('mouseout', showHideFunction(thisDiv, newElement), true);
		newElement.style.display = 'none';
	}
}