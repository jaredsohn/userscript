// ==UserScript==
// @name           Audible Browser Download Link
// @namespace      muckl.com
// @description    Adds direct download links to .aax files in your library for downloading with your browser.
// @include        http*://www.audible.com/lib?*
// @include        http*://www.audible.de/adde/site/library/library.jsp?*
// @copyright      2011, Muckl (http://userscripts.org/users/Muckl)
// @license        GPL (http://www.gnu.org/copyleft/gpl.html)
// @version        0.0.3
// ==/UserScript==

/////////////////////////////////////////////////////////////////////////////////////
//                                                                                 //
//                            IMPORTANT NOTES                                      //
//                                                                                 //
//  - This script doesn't enable you to steal audio books, you still have to buy   //
//    them. You can, however, download them without the Audible Download Manager.  //
//  - This script neither removes and/or disables the DRM protection nor somehow   //
//    converts the files into another format/container, like e.g. MP3. You still   //
//    need a proper, authorized player in order to play them.                      //
//                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////

/**

   ChangeLog       [REL] v0.0.3 [2011-07-11]
                   [CHG] Renamed user script.
                   [CHG] Minor code improvements.
                   [REL] v0.0.2 [2011-07-04]
                   [FIX] Some fixes and code improvements.
                   [REL] v0.0.1 (initial release) [2011-07-04]

   DevLog          [ADD] Check for available codecs/formats.
                   [ADD] Error management.
                   [TST] Test script with more audiobooks and different browsers.

**/

/////////////////////////////////////////////////////////////////////////////////////
//                    CONFIG BLOCK WITH USER PARAMETERS                            //
/////////////////////////////////////////////////////////////////////////////////////

var text = 'Browser Download'; // [string]
var icon = true; // [true OR false]

/////////////////////////////////////////////////////////////////////////////////////
//                   END OF CONFIG BLOCK, SCRIPT STARTS                            //
/////////////////////////////////////////////////////////////////////////////////////

// add css
if (icon === true) {
	GM_addStyle('a.gm_adbl_bdl { padding-left: 20px; background: transparent url(data:image/gif;base64,R0lGODlhEAAQAIcAMcDAwMzMzN3d3erq6vHx8f%2F%2F%2F8DcwMz%2FzJnMmWbMZpnMZufn1gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAEAAQAAcIgwABBBAwYAABAgUSKlQokKBBhAQEGJg48UDDggclItjIEcHFggY2JhhJMsHHkCVTXjyAYKQCAwsNmByocSSCAiERCCjgcSDKlDZxNvwJ9KaBhi1TGngodGBSmwdbGkVackEBklOdliwgAGtTiVsJ2BxQwCLNkjALFERwoMBFmVhF2gwIADs%3D) no-repeat left center; }');
}

// template nodes
var ddl_tpl = document.createElement('A');
ddl_tpl.innerHTML = text;
ddl_tpl.className = 'gm_adbl_bdl';
ddl_tpl.target = 'adbl_ddl';
var br = document.createElement('BR');

// process audible.com
if (document.location.host.indexOf('audible.com') > -1) {
	ddl_tpl.className += ' adbl-link';
	var format = 'LC_64_22050_stereo';
	var rows = document.getElementsByClassName('adbl-lib-content')[0].getElementsByTagName('TBODY')[0].getElementsByTagName('TR');
	for (var i = 1; i < rows.length; i += 1) {
		var ddl = ddl_tpl.cloneNode(true);
		ddl.href = data('downloadSvcPath') + '/cgi-bin/aw_assemble_title_dynamic.aa/' + data('productId', i) + format + '.aa?asin=' + data('asin', i) + '&user_id=' + data('user_name') + '&order_number=' + data('ordNumber', i) + '&codec=' + format + '&awtype=AAX&source=audible_adm';
		var cell = rows[i].lastChild.previousSibling;
		cell.appendChild(br.cloneNode(true));
		cell.appendChild(br.cloneNode(true));
		cell.appendChild(ddl);
	}
} else if (document.location.host.indexOf('audible.de') > -1) {
// process audible.de
	var script = document.getElementById('content').getElementsByTagName('SCRIPT')[1].innerHTML;
	var server = script.match(new RegExp('var useAAXServer = \'([^\']+?)\'', 'i'));
	if (server !== null) {
		var format = 'LC_128_44100_stereo';
        var user = document.getElementById('loginAndAccountStatus').getElementsByTagName('STRONG')[0].innerHTML;
		var cells = document.getElementsByClassName('downloadborder');
		for (var j = 0; j < cells.length; j += 1) {
			var pid = document.getElementById('checkbox_title_input_' + j).value;
			var title = document.getElementById('hiddenTitle' + pid).value.replace(/\x20|\x21|\x22|\x23|\x24|\x25|\x26|\x27|\x28|\x29|\x2A|\x2B|\x2C|\x2D|\x2E|\x2F|\x3A|\x3B|\x3C|\x3D|\x3E|\x3F|\x40/g, '');
			var ddl = ddl_tpl.cloneNode(true);
			ddl.href = 'http://' + server[1] + '/cgi-bin/aw_assemble_title_dynamic.aa/' + title + format + '_.aa?product_id=' + pid + '&user_id=' + user + '&codec=' + format + '&awtype=AAX&source=audible_adm';
			var div = cells[j].lastChild.previousSibling;
			cells[j].insertBefore(br.cloneNode(true), div);
			cells[j].insertBefore(ddl, div);
		}
	}
}

// helper functions
function data(name, nr) {
	if (nr === undefined || nr < 1) nr = 1;
	return document.getElementsByName(name)[nr - 1].value;
}