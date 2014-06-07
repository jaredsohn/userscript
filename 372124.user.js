// ==UserScript==
// @id             nz.table.sort@MJ.nukezone
// @name           NZ Table Sort
// @namespace      NZ
// @author         MJ
// @description    Add sorting to most of the tables in NZ
// @include        http://www.nukezone.nu/*
// @include        http://www.nukezone.se/*
// @run-at         document-end
// ==/UserScript==

(function() {
	'use strict';

	/**
	 * Pages to run on
	 * @type {Array.<RegExp>}
	 */
	var PAGE_INCLUDES = [
		/^\/clan\.asp\?Action=ClanPoll&X=View/i,
		/^\/recruit\.asp\?Action=Clan(?!&X=Settings)/i,
		/^\/recruit\.asp\?Action=Province$/i,
		/^\/clan\.asp\?Action=InvitePlayer/i,
		/^\/clan\.asp\?Action=ForumManagement/i,
		/^\/market\.asp\?Action=Orders/i,
		/^\/bank\.asp/i,
		/^\/build\.asp\?Action=/i,
		/^\/satellites\.asp\?Action=Satellites/i,
		/^\/clan\.asp\?Action=SpyReports&Q=/i,
		/^\/events\.asp\?Action=(?!SearchEvents)/i,
		/^\/show\.asp\?Action=Players(?!&X=)/i,
		/^\/preferences\.asp\?Action=EnemyList/i,
		// /^\/show\.asp\?Action=Online/i, // works already
		// /^\/show\.asp\?Action=Clans/i, // works already
		/^\/toplist\.asp/i,
		/^\/search\.asp/i,
		/^\/shop\/default\.asp\?Action=(ViewCart|History)/i,
		/^\/message\.asp\?Action=Inbox$/i,
		/^\/outbox\.asp$/i,
	];

	var href = document.location.pathname + document.location.search;

	var run = PAGE_INCLUDES.some(function(re) {
		if (re.test(href))
			return true;
		return false;
	});

	if (!run)
		return;

	/**
	 * CSS text to be inserted into the page
	 * @type {string}
	 */
	var styleText =
		'.nz-sort-image { display: none; }' +
		'td[data-sorted="asc"] > .nz-sort-image-asc { display: inline-block; }' +
		'td[data-sorted="desc"] > .nz-sort-image-desc { display: inline-block; }';

	var style = document.createElement('style');
	style.textContent = styleText;
	document.body.appendChild(style);

	/**
	 * A map of sorter functions based on the
	 * column content type. Used in determineSorter().
	 * The selected function is then used in Array.prototype.sort
	 * @type {Object.<string, function(string, string): number>}
	 */
	var SORTERS = {
		no_op: function() {
			return 0;
		},
		// province name
		province: function(a, b) {
			var newA = a.replace(/^\[.+?\]/, '');
			var newB = b.replace(/^\[.+?\]/, '');
			return newA.localeCompare(newB);
		},
		// user type
		string: function(a, b) {
			return a.localeCompare(b);
		},
		number: function(a, b) {
			var numRegEx = /\d+/g;
			var numsA = a.match(numRegEx);
			var numsB = b.match(numRegEx);
			if (numsA === null && numsB !== null)
				return -1;
			if (numsA !== null && numsB === null)
				return 1;
			if (numsA === null && numsB === null)
				return 0;

			var arrA = toArray(numsA);
			var arrB = toArray(numsB);
			// make both arrays of max size
			var maxLength = Math.max(arrA.length, arrB.length);
			while (arrA.length < maxLength)
				arrA.unshift(0);
			while (arrB.length < maxLength)
				arrB.unshift(0);
			// compare element by element
			var result = 0;
			arrA.some(function(textA, i) {
				var numA = parseInt(textA, 10);
				var numB = parseInt(arrB[i], 10);
				if (numA === numB) {
					return false;
				}
				else {
					if (numA > numB)
						result = 1;
					else
						result = -1;
					return true;
				}
			});
			return result;
		},
	};

	/**
	 * Heuristics function to determine the sorter needed
	 * Loops over all rows and checks for province IDs,
	 * time strings and digits. Returns the appropriate
	 * function from the SORTERS object.
	 * @param  {Array.<HTMLTableRowElement>} rows
	 * @param  {number}                      i    column index
	 * @return {function(string, string): number} the determined sorter
	 */
	var determineSorter = function(rows, i) {
		var hashCt = 0; // how many rows have IDs in them
		var hashRE = /\(#\d+\)/;
		var timeCt = 0; // how many rows have time in them
		var timeRe = /^(((\d+d )?\d+h )?\d+min( ago)?)?$/;
		var digitCt = 0; // how many digits are there
		var digitRe = /\d/g;
		var totalLength = 0; // how many symbols are there
		var ct = rows.length;
		rows.forEach(function(row) {
			var cell = row.cells[i];
			// no cell here
			if (!cell) {
				ct--;
				return;
			}
			var content = cell.textContent.trim();
			if (hashRE.test(content))
				hashCt++;
			if (timeRe.test(content))
				timeCt++;
			var digits = content.match(digitRe);
			if (digits)
				digitCt += digits.length;
			totalLength += content.length;
		});
		if (totalLength === 0)
			return SORTERS.no_op;
		if (hashCt === ct)
			return SORTERS.province;
		if (timeCt === ct)
			return SORTERS.number;
		if (digitCt >= totalLength / 2)
			return SORTERS.number;
		return SORTERS.string;
	};

	/**
	 * Sort rows by i-th column in a table
	 * @param  {HTMLTableElement} table
	 * @param  {number}           i
	 * @param  {{asc: boolean}}   options
	 */
	var sortCells = function(table, i, options) {
		var rows = getRows(table);
		var headerClone = rows.shift().cloneNode(true);
		var footerClone = rows.pop().cloneNode(true);
		reactivateHeader(headerClone);
		var sorter = determineSorter(rows, i);
		rows.sort(function(a, b) {
			var cellA = a.cells[i];
			var cellB = b.cells[i];
			var contentA = '', contentB = '';
			if (cellA)
				contentA = cellA.textContent.trim();
			if (cellB)
				contentB = cellB.textContent.trim();
			// place empty cells always last
			// this means it has to be highest when asc
			// and lowest when desc
			if (!contentA.length && contentB.length)
				return options.asc ? 1 : -1;
			if (!contentB.length && contentA.length)
				return options.asc ? -1 : 1;
			if (!contentA.length && !contentB.length)
				return 0;
			return sorter(contentA, contentB);
		});
		if (!options.asc)
			rows.reverse();

		// create new tbody
		var tbody = document.createElement('tbody');
		tbody.appendChild(headerClone);
		rows.map(function(row) {
			tbody.appendChild(row.cloneNode(true));
		});
		tbody.appendChild(footerClone);

		var oldTBody = rows[0].parentNode;
		table.replaceChild(tbody, oldTBody);
	};

	/**
	 * Turn an array-like to an array.
	 * Especially useful for node lists.
	 * @param  {Array} arrayLike
	 * @return {Array}
	 */
	var toArray = function(arrayLike) {
		return Array.prototype.slice.call(arrayLike);
	};

	/**
	 * Get the content tables
	 * @return {Array.<HTMLTableElement>}
	 */
	var getTables = function() {
		return toArray(document.querySelectorAll('table.content'));
	};
	/**
	 * Get rows from a table as an array
	 * @param  {HTMLTableElement}            table
	 * @return {Array.<HTMLTableRowElement>}
	 */
	var getRows = function(table) {
		return toArray(table.rows);
	};

	var tables = getTables();
	if (!tables.length) {
		console.log('[NZ] No tables found. Exiting.');
		return;
	}

	var imgAsc = document.createElement('img');
	imgAsc.width = 14;
	imgAsc.height = 10;
	var imgDesc = imgAsc.cloneNode();
	imgAsc.src = 'http://img.nukezone.nu/IMG2/sorted_by.gif';
	imgAsc.className = 'nz-sort-image nz-sort-image-asc';
	imgDesc.src = 'http://img.nukezone.nu/IMG2/sorted_by2.gif';
	imgDesc.className = 'nz-sort-image nz-sort-image-desc';

	/**
	 * Add sort images to the table cell
	 * @param {HTMLTableCellElement} td
	 * @param {number}               i  cell index
	 */
	var addSortImages = function(td, i) {
		var asc = imgAsc.cloneNode();
		asc.id = 'nz-sort-image-asc-' + i;
		var desc = imgDesc.cloneNode();
		desc.id = 'nz-sort-image-desc-' + i;
		td.appendChild(asc);
		td.appendChild(desc);
	};
	/**
	 * Prepare a header cell for sorting.
	 * Remove images and onclick listeners
	 * @param  {HTMLTableCellElement}  cell
	 */
	var sanitizeHeaderCell = function(cell) {
		var imgs = toArray(cell.querySelectorAll('img'));
		imgs.forEach(function(img) {
			img.parentNode.removeChild(img);
		});
	};
	/**
	 * Create a click listener for an i-th header cell
	 * @param {number} i
	 */
	var makeClickHandler = function(i) {
		return function(ev) {
			var sorted = this.dataset.sorted;
			var asc = false;
			if (sorted === 'desc') {
				this.setAttribute('data-sorted', 'asc');
				asc = true;
			}
			else {
				this.setAttribute('data-sorted', 'desc');
			}
			var tds = toArray(this.parentNode.cells);
			tds.forEach(function(td, j) {
				if (j !== i)
					td.removeAttribute('data-sorted');
			});
			var table = this.parentNode.parentNode.parentNode;
			sortCells(table, i, { asc: asc });
		};
	};
	/**
	 * Re-adds click listeners to the cells of a header row
	 * Apparently they are not copied with cloneNode(true)
	 * @param {HTMLTableRowElement} header
	 */
	var reactivateHeader = function(header) {
		var headerCells = toArray(header.cells);
		headerCells.forEach(function(cell, i) {
			cell.addEventListener('click', makeClickHandler(i), false);
		});
	};
	tables.forEach(function(table) {
		var rows = getRows(table);
		var header = rows.shift();
		var headerCells = toArray(header.cells);

		headerCells.forEach(function(cell, i) {
			sanitizeHeaderCell(cell);
			addSortImages(cell, i);
			cell.addEventListener('click', makeClickHandler(i), false);
		});
	});

})();
