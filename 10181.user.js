// 4chan Comment Hider
// 2007-8-2
//
//
// ==UserScript==
// @name          4chan Comment Hider
// @version       1.1
// @description   Hides the text of all comments on 4chan.org, but leaves image replies visible.
// ==/UserScript==

/* 
Changelog

1.1: Added show-comment links

1.0: Initial release

*/

/* BEGIN LICENSE BLOCK
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


(function() {

    var comments, i, block;

    comments = document.getElementsByTagName("blockquote");
    for ( i = 0; i < comments.length; i++ ) {
        block = comments[i];
        //block.style.display = "none";
        if ( block.innerHTML != "" )
        {
        	block.style.display = "none";
        	block.id = 'comment' + i;
			button = document.createElement("div");
			button.style.color = "black";
			button.style.cursor = "pointer";
			button.style.textDecoration = "underline";
			button.style.fontSize = '14px';
			button.style.margin="10px";
			button.id = 'hider' + i;
			button.innerHTML = '(Show Hidden Comment)';
			block.parentNode.insertBefore(button, block);
			button.addEventListener('click', function() {
				var id = this.id.substr(5,this.id.length - 5);
				var comment = document.getElementById('comment' + id);
				comment.style.display = "block";
				var hider = document.getElementById('hider' + id);
				hider.style.display = "none";				
			}, true);
	    }
    }
})();



