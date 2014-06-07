// ==UserScript==
// @name           EZTV File Sizes
// @namespace      http://code-poet.net/
// @description    Adds file sizes to EZTV
// @include        http://eztv.it/*
// @author         Vaughan Chandler
// @date           2011-01-12
// @version        1.0
// ==/UserScript==

/*
Copyright 2011 Vaughan Chandler. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are
permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice, this list of
      conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright notice, this list
      of conditions and the following disclaimer in the documentation and/or other materials
      provided with the distribution.

THIS SOFTWARE IS PROVIDED BY Vaughan Chandler ``AS IS'' AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Vaughan Chandler OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

The views and conclusions contained in the software and documentation are those of the
authors and should not be interpreted as representing official policies, either expressed
or implied, of Vaughan Chandler.
*/

(function() {
	
// Set this variable to determine where the size will show. 1 = first column, 2 = second, etc
var position = 3;

function $(q, root, single) {
	if (root && typeof root == 'string') {
		root = $(root, null, true);
		if (!root) { return null; }
	}
	root = root || document;
	if (q[0]=='#') { return root.getElementById(q.substr(1)); }
	else if (q[0]=='/' || (q[0]=='.' && q[1]=='/')) {
		if (single) { return document.evaluate(q, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }
		return document.evaluate(q, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	else if (q[0]=='.') { return root.getElementsByClassName(q.substr(1)); }
	return root.getElementsByTagName(q);
}

// Show sizes in new cells
var links = $('//a[@class="epinfo"]');
for (var i=0; i<links.snapshotLength; i++) {
	if (m = links.snapshotItem(i).title.match(/\(([^\(]*)\)$/)) {
		var td = document.createElement('td');
		td.innerHTML = m[1];
		td.className = 'forum_thread_post';
		links.snapshotItem(i).parentNode.parentNode.insertBefore(td, links.snapshotItem(i).parentNode.parentNode.cells[position-1]);
	}
}

// Show 'Size' heading
var headings = $('//a[@class="epinfo"]//ancestor::table//td[@class="forum_thread_header"]');
var td = document.createElement('td');
td.innerHTML = 'Size';
td.className = 'forum_thread_header';
headings.snapshotItem(position-1).parentNode.insertBefore(td, headings.snapshotItem(position-1));

// Adjust width of multi-column cells
var widecols = $('//a[@class="epinfo"]//ancestor::table//tr[@class="forum_space_border"]/td');
for (var i=0; i<widecols.snapshotLength; i++) {
	widecols.snapshotItem(i).colSpan = widecols.snapshotItem(i).colSpan + 1;
}

}) ();
