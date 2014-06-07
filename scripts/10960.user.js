
// RDFkillsmile
// version 0.5
// 2007-02-22
//
// --------------------------------------------------------------------
//
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          RDFKillSmile
// @namespace     http://wmute.livejournal.com
// @description   kill the smiley box on RDF's post form
// @include       http://www.richarddawkins.net/forum/posting.php*
// @exclude       http://www.richarddawkins.net/forum/posting.php?mode=smilies*
// ==/UserScript==
//
// --------------------------------------------------------------------
//

/* BEGIN LICENSE BLOCK
Copyright (C) 2007 Ross Thompson

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://diveintomark.org/projects/greasemonkey/COPYING
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK */

var smiley_box = document.getElementById("smiley-box");
if (smiley_box == null)
{
	all_smiles = document.evaluate("//a[@href='#']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
else
{
	all_smiles = document.evaluate("./a[@href='#']", smiley_box, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
for (var i = 0; i < all_smiles.snapshotLength; i++)
{
	smile = all_smiles.snapshotItem(i);
	smile.style.display="none";
}