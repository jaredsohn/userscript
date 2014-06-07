// ==UserScript==
// @name          Blogger comments editor / permalink adder
// @namespace     http://singpolyma-tech.blogspot.com/
// @description	Adds a link to the comments in the posts list and adds an edit link to edit each comment in the comments list and a permalink to the comment
// @include	http://www.blogger.com/posts.g?blogID=*
// @include	http://blogger.com/posts.g?blogID=*
// @include	http://www.blogger.com/publish-comment.do?blogID=*
// @include	http://blogger.com/publish-comment.do?blogID=*
// @include	http://www.blogger.com/posts-search.g
// @include	http://blogger.com/posts-search.g
// ==/UserScript==

/*

	Author: Jasper de Vries, jepsar@gmail.com
	Date:   2005-12-19
        
        Edited by: Stephen Paul Weber a.k.a. Singpolyma (http://singpolyma-tech.blogspot.com/)
        Date: 2006-03-10

*/

if (document.body.id == 'posting'){
	var comments, cells;
	var rows = document.getElementById('posts').getElementsByTagName('tr');
	rows[0].appendChild(document.createElement('td'));
	for (var i = 1; i < rows.length; i++) {
		cells = rows[i].getElementsByTagName('td');
		if (cells.length == 7) {
			comments = cells[cells.length - 1].cloneNode(true);
			comments.getElementsByTagName('a')[0].textContent = 'Comments';
			comments.getElementsByTagName('a')[0].href = comments.getElementsByTagName('a')[0].href.replace(/^.+\?/, 'http://www.blogger.com/publish-comment.do?');
			rows[i].appendChild(comments);
		}
	}
	// Force redraw (work around bug in Firefox)
	document.getElementById('posts').innerHTML += ' ';
}
else {
	var comments = document.getElementsByTagName('dd');
        var postlink = xget( '//h4[@class = "post-title"]/a[1]' );
	var link, pDelete, edit, id, permalinktag = null;
	for (var i = 0; i < comments.length; i++) {
		link = comments[i].getElementsByTagName('span')[0].getElementsByTagName('a')[0];
		link.removeAttribute('onclick');

                /* COMMENTED OUT BECAUSE IT JUST ADDS A DUPLICATE COMMENT DELETE ICON...
		pDelete = link.cloneNode(true);
		pDelete.getElementsByTagName('img')[0].src = 'data:image/gif;base64,R0lGODlhDQANALMPAP+Pj/84OP/Z2f/Jyf96ev/s7P+4uP9NTf9kZP8oKP8HB/8aGv9TU/9CQv8AAP///yH5BAEAAA8ALAAAAAANAA0AAARL8D0g6ytUmtCsQA4hLY7TSYRSCk9Tmg9BOoEhMa9bJkZRgS8HYmCRBB1ED+EYsBSAplxF5lAcBLhS8/Hi3V5EAM1WwQ0lAFYRwYoAADs=';
		pDelete.addEventListener('click', delComm, false);
		pDelete.setAttribute('onclick', 'return false');
		pDelete.title = 'Permanently delete comment';
		comments[i].getElementsByTagName('span')[0].appendChild(pDelete);
                */

		edit = link.cloneNode(true);
		edit.getElementsByTagName('img')[0].src = 'data:image/gif;base64,R0lGODlhDQANALMPALmIF0k1EjMmBlRTUCgVBv/BMRYWFvy2I+WjJeKjU9CPKRAJA6pqNNDHuwAAAP///yH5BAEAAA8ALAAAAAANAA0AAAQ88Mk5Hb2SLIulY8zWGYkCipSQNM15CUeRJAM3LciBmLYH6AqA4fIBAgIYRqPE6EkMLJbTE50+HQ5k5xEBADs=';
                edit.getElementsByTagName('img')[0].alt = 'Edit comment';
		edit.href = edit.href.replace(/^.+\?/, 'http://www.blogger.com/post-edit.g?') + '&quickEdit=true';
		edit.title = 'Edit comment';
		comments[i].getElementsByTagName('span')[0].appendChild(edit);

                comments[i].getElementsByTagName('span')[0].appendChild(document.createTextNode( ' - ' ));
                
                id = document.anchors[i+1].name;
                permalinktag = document.createElement( 'a' );
                permalinktag.href = postlink.href +'#'+ id;
                permalinktag.appendChild( document.createTextNode( 'permalink' ) );
                comments[i].getElementsByTagName('span')[0].appendChild(permalinktag);
	}
}

function xget( xpathSelector )
{
  var it = document.evaluate( xpathSelector, document, null,
			      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
  if( it.snapshotLength )
    return it.snapshotItem( 0 );
}

function delComm(e) {
	if (confirm('Permanently delete comment?')) {
		var URL = (e.target.nodeName == 'A' ? e.target.href : e.target.parentNode.href);
		var postID = URL.replace(/.*postID=/, '');
		var iframe = document.createElement('iframe');
		iframe.setAttribute('id', 'post'+ postID);
		iframe.setAttribute('style', 'position:absolute;left:-9999px;top:0');
		document.body.appendChild(iframe);
		iframe.addEventListener('load', function(){
			if (iframe.contentDocument.forms[0]) {
				iframe.contentDocument.forms[0].elements.namedItem('removeForeverCheckbox').click();
				iframe.contentDocument.getElementById('postbuttons').getElementsByTagName('button')[0].click();
			}
			else {
				var comm = document.getElementById('c'+ postID);
				comm.nextSibling.nextSibling.style.display = 'none';
				comm.style.display = 'none';
			}
		}, false);
		iframe.setAttribute('src', URL);
	}
}
