// <![CDATA[
// ==UserScript==
// @name          YouTube Pagination
// @fullname      YouTube Pagination
// @author        Egon
// @version       0.6
// @namespace     http://userscripts.org/scripts/show/84992
// @description   Adds the pagination to the top of your favorites
// @include       http://userscripts.org/scripts/show/84992*
// @include       https://userscripts.org/scripts/show/84992*
// @include       http://*.youtube.*/*
// @include       http://youtube.*/*
// @unwrap
// ==/UserScript==

	const VERSION = '0.6';

	function $(id) {
		return document.getElementById(id);
	}

	function differPage() {
		const PATTERN_FAV    = '/(.*)my_favorites(.*)/';
		const PATTERN_LIST   = '/(.*)my_playlists(.*)/';
		const PATTERN_SEARCH = '/(.*)results(.*)/';

		var uri = document.location.href;

		if (uri.match(PATTERN_FAV))
			return 'fav';
		else if (uri.match(PATTERN_LIST))
			return 'list';
		else if (uri.match(PATTERN_SEARCH))
			return 'search';
		else
			return 'unknown';
	}

	function getConstants() {
		constants = new Array();

		switch (differPage()) {
			case 'fav':
				constants['source'] = 'vm-pagination';
				constants['target'] = 'vm-video-list-container';
				break;
			case 'list':
				constants['source'] = 'vm-pagination';
				constants['target'] = 'vm-video-list-container';
				break;
			case 'search':
				constants['source'] = 'search-footer-box';
				constants['target'] = 'video_grid';
				break;
		}

		return constants;
	}

	function getPagination() {
		return $(constants['source']).innerHTML;
	}

	function getPages() {
		pages = new Array();
		var buttons = $(constants['source']).getElementsByTagName('button');

		for (int i = 0; i < buttons.length; i++) {
			pages[i]['data-page'] = buttons.getAttribute('data-page');
			pages[i]['href']      = buttons.getAttribute('href');
		}

		return pages;
	}

	function createSelection() {
		var selection_start;
		var selection_points;
		var selection_end;
		var selection;
		var pages = getPages();

		selection_start = '<form method="post" action="'+document.location.href+'">';
		selection_start += '<select onchange="document.location.assign(\'this.value\')';

		for (var i = 0; i < pages.length; i++)
			selection_points += '<option value="'+pages[i]['href']+'">'+pages[i]['data-page'] + 1+'</option>';

		selection_end = '</select></form>';

		selection = selection_start+selection_points+selection_end;

		return selection;
	}

	function addPagination() {
		var pagination;
		var content;
		var selection;

		selection = createSelection();
		pagination = getPagination();
		content = $(constants['target']).innerHTML;

		$(constants['target']).innerHTML = pagination+selection+content;
	}

	constants = getConstants();
	addPagination();
// ]]>