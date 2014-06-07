// ==UserScript==
// @name           EDN Killboard mail list linkifier
// @namespace      http://userscripts.org/users/82736
// @description    Turns onclicks into real links for better usability
// @include        *illboard/?a=*
// @include        *killboard*/?a=*
// @include        *.eve-kill.net/?a=*
// ==/UserScript==

function edn_killboard_linkify_row(row) {
	if(row.className != 'kb-table-header' && row.tagName == 'TR') { 
		if(row.cells[0].tagName == 'TD') {
			img_container = row.cells[0];
			if(img_container.childNodes[0].tagName == 'IMG') {
				img_tag = img_container.childNodes[0];
				dest = row.attributes[0].childNodes[0].data.substring(22).split("'")[0];
				
				if(dest) {
					// console.log(dest);
					link = document.createElement('a');
					link.setAttribute('href', dest);
					img_container.removeChild(img_tag);
					link.appendChild(img_tag);

					img_container.appendChild(link);
				} else {
					// console.log('Skipping as no dest found!');
				}
			} else {
				// console.log('Skipping a non-IMG!');
			}
		} else {
			// console.log('Skipping a non-TD!');
		}
	} else {
		// console.log('Skipping non-TR!');
	}
	return true;
}

function edn_killboard_linkify_rows(rows) {
	var i = 0;
	// console.log(rows.length);
	while(i < rows.length) {
		// console.log(i);
		// console.log(rows[i]);
		row = rows[i];
		edn_killboard_linkify_row(row);
		i++;
	}
	return true;
}

function edn_killboard_linkify() {
	// lol no ids in elements
	// console.log('Evens!');
	var evens = document.getElementsByClassName('kb-table-row-even');
	edn_killboard_linkify_rows(evens);

	// console.log('Odds!');
        var odds = document.getElementsByClassName('kb-table-row-odd');
	edn_killboard_linkify_rows(odds);

	// console.log('Hovers!');
	var hovers = document.getElementsByClassName('kb-table-row-hover');
	edn_killboard_linkify_rows(hovers);

	return true;
}

edn_killboard_linkify();
