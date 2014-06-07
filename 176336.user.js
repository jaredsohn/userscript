// ==UserScript==
// @name        Wykop.pl - glosuj wszystkie komentarze!
// @namespace   glosuj_wszystkie_komentarze@wykop.pl
// @description [pl] SHIFT + plus/minus - pozwala zagłosować na cały wątek (wpis z mirka lub komentarz znaleziska i wszystkie jego odpowiedzi); SHIFT + ALT + plus/minus - podobnie, ale gdzie już zagłosowałeś odwraca wybór (toggle)
// @icon        http://s3.amazonaws.com/uso_ss/icon/176336/large.png
// @updateURL   https://userscripts.org/scripts/source/176336.meta.js
// @include     http://www.wykop.pl/*
// @version     0.1
// ==/UserScript==
"use strict"

var $ = (typeof jQuery !== 'undefined')? jQuery : unsafeWindow.jQuery;

/**
 * Finds related elements
 * @param {jQuery} entry li[data-type="comment|entry|commentenry"]
 * @returns {jQuery}
 */
function getRelated(entry) {
	entry = entry.jquery? entry : $(entry);
    var targets, type = entry.attr('data-type');
    if (type === 'comment' && entry.attr('data-r')) {
        targets = $('[data-r="'+entry.attr('data-r')+'"]', entry.parent());
    } else if (type === 'entrycomment') {
        targets = entry.parents('li[data-type="entry"]').first().find('li[data-type="entrycomment"]').andSelf();
    } else if (type === 'entry') {
        targets = entry.find('li[data-type="entrycomment"]').andSelf();
    }
    return targets || $();
}

/**
 * Removes Your own comments and entries from set
 * @param {jQuery} entries jQuery set of matched li[data-type="comment|entry|commentenry"]
 * @returns {jQuery}
 */
function filterMyOwn(entries) {
	entries = entries.jquery? entries : $(entries);
	var href = $('#header-con .avatar .imgavatar').parent().attr('href'); //get "href" attr for own profile
	return entries.not(':has(blockquote:first header a.showProfileSummary[href="'+href+'"])');
}

function handler(e) {
	if (!e.shiftKey) return;

	var plus, minus, 
		trg     = $(e.target),
	    entry   = $(e.target).parents('li[data-id]').first(),
	    targets = filterMyOwn(getRelated(entry)).find('blockquote:first header a.plus'),
	    upvote  = trg.hasClass('minus')? false : (trg.next('a.minus')[0]? true : !trg.hasClass('selected')),
	    toggle  = e.altKey;

	var bb = function() {return false;};
	for (var i = 0, t = targets[i]; i < targets.length; t = targets[++i]) {
		plus  = $(targets[i]);
		minus = plus.parent().find('a.minus');

		if (minus[0] && (upvote||toggle) && !minus.hasClass('selected')  ||  !minus[0] && (toggle || upvote !== plus.hasClass('selected'))) {
			trg = plus;
		} else if (minus[0] && (!upvote||toggle) && !plus.hasClass('selected')) {
			trg = minus;
		} else continue;

		e.shiftKey                      = false;
		e.target                        = trg[0];
		e.currentTarget                 = trg[0];
		e.isDefaultPrevented            = bb;
		e.isPropagationStopped          = bb;
		e.isImmediatePropagationStopped = bb;
		$(e.delegateTarget).trigger(e);
	}
	e.preventDefault();
	e.stopImmediatePropagation();
}

function attachHandler(fn) {
	var el = $('#activities-stream,#comments-list-entry');
	el.on('click', 'li blockquote header a.plus, li blockquote header a.minus', fn);
	// push this handler first (EVIL CODE BELOW)
	var edata = $._data(el[0], 'events').click;
	edata.splice(0, 0, edata.splice(edata.length - 1, 1)[0]);
}

attachHandler(handler);