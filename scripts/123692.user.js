// ==UserScript==
// @name           Hide EasyRoommate results
// @namespace      http://userscripts.org/users/89939
// @description    Allows to hide uninterresting results on EasyRoommate.com and associated websites, and remember it in your Firefox preferences.
// @include        http://*.appartager.*/content/common/results.aspx*
// @include        http://*.easykot.*/content/common/results.aspx*
// @include        http://*.easyroommate.*/content/common/results.aspx*
// @include        http://*.easyroomrenting.*/content/common/results.aspx*
// @include        http://*.easyroomrent.*/content/common/results.aspx*
// @include        http://*.easykamer.*/content/common/results.aspx*
// @include        http://*.easywg.*/content/common/results.aspx*
// @include        http://*.compartodepto.*/content/common/results.aspx*
// @include        http://*.compartoapto.*/content/common/results.aspx*
// @include        http://*.easyquarto.*/content/common/results.aspx*
// @include        http://*.easypiso.*/content/common/results.aspx*
// @include        http://*.easystanza.*/content/common/results.aspx*
// @include        http://*.compartodepa.*/content/common/results.aspx*
// @include        http://*.wspollokator.*/content/common/results.aspx*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version        1.0
// ==/UserScript==

/**
 * Checks wether the given ad id is marked as hidden
 * @param adId the id of the ad to check
 * @return true if the status of the ad is hidden.
 */
function isHidden(adId) {
	return 'hide' == GM_getValue('ad:' + adId);
}

/**
 * Sets the given ad as hidden or visible and calls setVisibility().
 * @param adId the id of the ad to modify
 * @param previeDiv the jQuery object holding the preview div of the ad
 * @param hideButton the jQuery object holding the Show/Hide button
 * @param newStatusHidden the new status of the ad (true for hidden)
 */
function setHidden(adId, previewDiv, hideButton, newStatusHidden) {
	if (newStatusHidden) {
		GM_setValue('ad:' + adId, 'hide');
	} else {
		GM_deleteValue('ad:' + adId);
	}
	setVisibility(previewDiv, hideButton, !newStatusHidden);
}

/**
 * Sets the visibility of the HTML elements of an ad's preview
 * @param previeDiv the jQuery object holding the preview div of the ad
 * @param hideButton the jQuery object holding the Show/Hide button
 * @param newVisibility true for visible, false for hidden
 */
function setVisibility(previewDiv, hideLink, newVisibility) {
	previewDiv.children(':not(.listingheader, .listingheaderUrgent)').toggle(newVisibility);
	var hideText = hideLink.children('span');
	hideText.text(newVisibility ? 'Hide' : 'Show');
	hideText.attr('style', 'background-position: 5px -' + (newVisibility ? 189 : 168) + 'px');
}

// for each ad preview, create the Show/Hide button and mark it as visible or hidden
$('.listingpreview').each(function() {
	// the current ad preview
	var previewDiv = $(this);
	// the list of buttons at the top right of the preview header
	var previewButtons = previewDiv.find('.previewbuttons');

	// compute the id of the ad
	var messageLink = previewButtons.find('a.messagelink').attr('href');
	var adId = messageLink.substr(messageLink.indexOf('to=')+3);

	// create the Show/Hide button
	var hideLi = $(document.createElement('li'));
	hideLi.addClass('inlineblock');
	previewButtons.append(hideLi);
	var hideLink = $(document.createElement('a'));
	hideLink.attr('href', '#');
	hideLi.append(hideLink);
	var hideText = $(document.createElement('span'));
	hideText.addClass('results');
	hideText.text('Hide');
	hideLink.append(hideText);
	hideLink.click(function() {
		setHidden(adId, previewDiv, hideLink, hideText.text() == 'Hide');
		return false;
	});

	// mark the ad as visible as appropriate
	setVisibility(previewDiv, hideLink, !isHidden(adId));
});
