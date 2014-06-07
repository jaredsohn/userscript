// ==UserScript==
// @name          noDelete
// @description   removes special delete function
// @include       design123.webs.com/apps/guestbook/
// ==/UserScript==

function getElementsByClass(searchClass) { 
	domNode = document;
	tagName = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagName);
	var tcl = " "+searchClass+" ";
	for(i=0,j=0; i<tags.length; i++) { 
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1) 
			el[j++] = tags[i];
	} 
	return el;
} 

function noDelete() {
    var foo = new Array();
    foo = getElementsByClass("commentUtility");
    var bar;
    var html;
    var segs;
    var segs2;
    var segs3;
    var commentID;
    var newHtml;
    var poster;
    for (int i=0;i<foo.length;++i) {
        
        bar = foo[i];
        html = bar.innerHTML;
        
        //extracting the ID and poster of the comment
        segs = html.split('onclick="replyToComment(\'');
        segs2 = segs.split("', '");
        commentID = segs2[0];
        segs3 = segs2.split("')\" title");
        poster = segs3[0];
        
        //reconstructing the commentUtility area, but this time with a nullified delete function
        newHtml = '<a class="fw-button fw-button-small fw-button"   href="#comments" onclick="replyToComment(\''+commentID+'\', \''+poster+'\')" title="Reply"><span>Reply</span></a>
        
        <a class="fw-button fw-button-small fw-button"   href="#" onclick="return toggleEditComment(\''+commentID'\')" title="edit (up to one hour after comment is posted)"><span>Edit</span></a>
        
        <a class="fw-button fw-button-small fw-button"   href="#" title="Delete"><span>Delete</span></a>';
        bar.innerHTML = newHtml;
        
    }
}




