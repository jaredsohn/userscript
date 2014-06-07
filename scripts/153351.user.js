// ==UserScript==
// @name        	CBC Music Cleanup & Comment Link
// @description		Hides header and footer elements, adds a scrollbar for the blog comments, adds [Reply] shortcut to each comment and automatically links comment references in the format #xxx.
// @id 			cbc-cleanup-commentlink
// @version		1.5
// @author      	Wes Reimer 
// @contributor 	Geoff Appleby
// @namespace		http://reimer-reason.ca
// @screenshot		http://reimer-reason.ca/cbc/cbc_comments.png
// @include		http://music.cbc.ca/*
// @run-at		document-idle
// ==/UserScript==


(function(doc) {

var i = 0,
    rx = /#(\d+)/,
    
    getEl = function(id) {
    	return doc.getElementById(id);
    },
    
	hide = function(id) {
    	var div = getEl(id);
    	if (div) div.style.display = 'none';
	},
    
    replyFn = function() { 
    	var range, sel, iDoc,
    		iframe = getEl('LeftColumn_ctlPostComment_ctlEditor_ctlTextEditor_ifr');
    	
    	if (iframe) {
    		iDoc = iframe.contentDocument;
    		iDoc.body.innerHTML = this.data;
    		iframe.focus();
    		range = iDoc.createRange();//Create a range (a range is a like the selection but invisible)
        	range.selectNodeContents(iDoc.body);//Select the entire contents of the element with the range
        	range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        	sel = getSelection();//get the selection object (allows you to change selection)
        	sel.removeAllRanges();//remove any selections already made
        	sel.addRange(range);//make the range you have just created the visible selection
    	}
    }, 
    
    linkComments = function() {
    
        var a, id, name, div, match, commentP, comment, html, text,
        	container = doc.querySelectorAll('.commentContainer');
            
        for (; i<container.length; i++) {
        
        	// find comment references 
            text = container[i].querySelector('.blogCommentText');
            html = text.innerHTML;
            match = html.match(rx);
            if (match) { 
                commentP = doc.querySelectorAll('#comment-' + match[1] + ' .blogCommentText p');
                if (commentP.length) {  
                	comment = commentP[0].textContent;
                	if (commentP.length > 1) {
                		comment += ('\n\n' + commentP[1].textContent);
                		if (commentP.length > 2) {
                			comment += ' [...]';
                		}
                	}
                    comment = comment.replace(/"/g, '&quot;');
                    text.innerHTML = html.replace(rx, '<a href="#comment-$1" title="' + comment
                    	 + '" onclick="doc.getElementById(\'comment-$1\').style.backgroundColor=\'#FFA\'">#$1</a>');
                }
            }
          
          	// add Reply link
            div = container[i].querySelector('.blogCommentImage div');
            id = div.textContent.match(rx);
            if (!id) return;
            name = div.querySelector('a').textContent.trim();
            a = doc.createElement('a');
            a.data = '@' + name + ' ' + id[0] + ',&nbsp;';
            a.href='#commentForm';
            a.onclick = replyFn;
            a.innerHTML='[Reply]';
            a.style.cssFloat='right';
            text.appendChild(a);
        }
    };

// check for new comments every 9 seconds
setInterval(linkComments,9000); 


// Hide stuff
hide('leaderboardAd');
hide('footer');
hide('cbcFooter');

// Scroll blog / comment box
var s, 
    div = getEl('contentblock');
if (div) {
    s = div.parentNode.style;
    s.zIndex = 100;
    s.overflowX = 'hidden';
    s.overflowY = 'auto';
    s.width = (div.offsetWidth + 17) + 'px';
    s.height = (doc.documentElement.clientHeight - 160) + 'px';
}


})(document);