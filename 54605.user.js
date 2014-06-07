typeof(CheckForUpdate)!='undefined' && CheckForUpdate.init(<>
// ==UserScript==
// @name           Neopets : Training School : Time till course finishes
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Dynamically shows the time till course finishes
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2009, w35l3y (http://gm.wesley.eti.br/includes)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br/includes
// @version        1.0.0.2
// @language       en
// @include        http://www.neopets.com/pirates/academy.phtml?type=status
// @include        http://www.neopets.com/island/training.phtml?type=status
// @require        http://userscripts.org/scripts/source/38788.user.js
// @require        http://userscripts.org/scripts/source/54000.user.js
// @cfu:meta       http://userscripts.org/scripts/source/@cfu:id.meta.js
// @cfu:url        http://userscripts.org/scripts/source/@cfu:id.user.js
// @cfu:interval   3 days
// @cfu:id         uso:script
// @cfu:version    version
// @cfu:timestamp  uso:timestamp
// @uso:script     54605
// @uso:timestamp  13:22 28/07/2009
// ==/UserScript==
</>, typeof CourseTimeCheckForUpdateCallback == 'function' && CourseTimeCheckForUpdateCallback || undefined);

/**************************************************************************

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

**************************************************************************/

if (NeopetsDocument.Username)
(function()
{	// script scope
	var staticTimes = {};

	var times = document.evaluate("//td[@class='content']//td[not(form)][2]/b", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var at = times.snapshotLength;
	for ( var ai = 0 ; ai < at ; ++ai )
		staticTimes[ai] = times.snapshotItem(ai).textContent.match(/\d+/g);

	if (at)
	(function recursive()
	{
		var elapsed = Math.floor( ( NeopetsDocument.Time(true) - NeopetsDocument.Time(false) ) / 1000 );

		for ( var ai = 0 ; ai < at ; ++ai )
		{
			var time = times.snapshotItem(ai);
			var t = time.textContent.split(/\d+/);

			var s = 3600 * staticTimes[ai][0] + 60 * staticTimes[ai][1] + 1 * staticTimes[ai][2] - elapsed;	// 1 * X = parseInt(X, 10)

			time.textContent = ( s >= 0 ?
				Math.floor(s/3600) + t[1] + Math.floor(s%3600/60) + t[2] + (s%60) :	/*positive*/
				"- " + Math.abs(Math.ceil(s/3600)) + t[1] + Math.abs(Math.ceil(s%3600/60)) + t[2] + Math.abs(s%60)	/*negative*/
			) + t[3];
		}

		setTimeout(recursive, 1000);
	})();
})();