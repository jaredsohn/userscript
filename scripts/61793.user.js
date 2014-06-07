// ==UserScript==
// @name			Friendster Auto Add Signature
// @author			flint0131
// @include			http://www.friendster.com/comments.php?uid=*
// @include			http://www.friendster.com/comments.php*
// @namespace			http://www.stoopid-ppl.com
// @description		This script can auto add a Signature automatically everytime you drop a comment to someone. :D
// ==/UserScript==

/*
 * You can use double quote, as it is what coders usually use.
 * Example : <div style="some styles"></div>
 * DO NOT USE single quote ( ' ), if ( exist ) { remove }
 */
var signature = 'SIGNATURE HERE';
var getCommentBox = document.getElementById("commentTextArea");
getCommentBox.value = getCommentBox.value + '\n\n\n' +signature;

// Previewer
var prevDiv = document.getElementById("navdivider");
prevDiv.style.position = "fixed";
prevDiv.style.left = "10px";
prevDiv.style.top = "200px";
prevDiv.innerHTML = '<center><input type="button" value="Preview" onclick="window.open(\'http://lxix.co.cc/cmp.php?htm=\'+ document.getElementById(\'commentTextArea\').value, \'loadWin\', \'width=400,height=400,location=no,resizable=yes,scrollbars=no\');" /></center>" />';