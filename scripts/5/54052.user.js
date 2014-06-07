// ==UserScript==
// @name           MegaUpload AutoRetry
// @namespace      http://localhost
// @include        http://www.megaporn.com/?c=*
// @include        http://www.megaupload.com/?c=*
// ==/UserScript==
// Changelog:
//  - 20/07/09 : First Release
//  - 22/07/09 : Bug Fix - Full support for megaporn now.
// Todo:
//  - Anything until bug reports ( i hope no bug reports xD )
/////////////////////////////////////////////////////////
//             ______________                          //
// |           |             |        |    /         | //
// |           |             |        |   /          | //
// |           |             |        |  /           | //
// |           |             |        | /            | //
// |           |             |        |/             | //
// |           |             |        |\             | //
// |           |             |        | \            | //
// |           |             |        |  \           | //
// |           |             |        |   \          | //
// |_______    |_____________|        |    \         • //
//                                                     //
/////////////////////////////////////////////////////////

function wait() {
		document.title = 'Go back!';
		window.history.back();
	}
	wait();