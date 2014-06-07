CheckForUpdate.init(<>
// ==UserScript==
// @name           Orkut : PHP Code Highlight
// @namespace      http://gm.wesley.eti.br/orkut
// @description    Highlights php codes
// @include        http://www.orkut.tld/CommMsgs.aspx?cmm=*
// @resource       highlight http://shjs.sourceforge.net/sh_style.css?v1
// @require        http://shjs.sourceforge.net/sh_main.min.js?v1
// @require        http://shjs.sourceforge.net/lang/sh_php.min.js?v1
// @require        http://userscripts.org/scripts/source/38788.user.js
// @cfu:meta       http://userscripts.org/scripts/source/@cfu:id.meta.js
// @cfu:url        http://userscripts.org/scripts/source/@cfu:id.user.js
// @cfu:id         uso:script
// @cfu:version    version
// @cfu:timestamp  modified
// @cfu:interval   1 day
// @version        1.0.2.7
// @modified       23:39 12/20/2008
// @uso:script     38981
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      w35l3y 2008
// @license        GNU GPL
// @homepage       http://www.wesley.eti.br
// ==/UserScript==
</>);

/**************************************************************************

    Author's NOTE

    Special thanks to a friend of mine, Philipe Maia.
    He has been contributed to solve some CSS issues.

***************************************************************************

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

GM_addStyle(GM_getResourceText('highlight'));

(function()
{	// script scope

	var replies = document.evaluate("id('mboxfull')/table/tbody/tr[2]/td[1]/div/div[2]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for ( var reply , i = replies.snapshotLength ; reply = replies.snapshotItem(--i) ; )
	{
		reply.innerHTML = reply.innerHTML
				.replace(/(?:(?=(?:<br(?:\s+\/)?>)+)?|\.{4})\.{4}/gm,'&nbsp;&nbsp;&nbsp;&nbsp;')
				.replace(/(?!\[{2})\[code\](?:(?:<br(?:\s+\/)?>)+)?(|[^]+?)((?:<br(?:\s+\/)?>)+)?\[\/code\]/gi,'<fieldset style="border:1px #000000 solid;"><legend>[&nbsp;Code&nbsp;]</legend>$1</fieldset>')
				.replace(/(?:&lt;|<)\?((?:php|=|(?!(?:xml|>|&gt;)))(?:[^]*?<br>)?)((?:|[^]+?))(<br>)?\?(?:&gt;|>)/gi,'<pre class="sh_php" style="display:inline; white-space:pre-wrap;">&lt;?$1<span style="background-color:inherit; display:inline-block;">$2</span>$3?&gt;</pre>')
				.replace(/(?:<br(?:\s+\/)?>){3,}/gi,'<br /><br />')
				//.replace(/</g,'&lt;') // debug
	}
})();

sh_highlightDocument();