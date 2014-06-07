// ==UserScript==
// @name          Quote a digg comment
// @namespace     http://diveintogreasemonkey.org/download/
// @description   v1.0.3
// @include       http://digg.com/*
// @include       http://www.digg.com/*
// ==/UserScript==

var articlecomments = new Array(500);
thebodyhtml = document.body.innerHTML;
marker = 1;
newcommentpos = thebodyhtml.indexOf("wholecomment", marker);
while (newcommentpos > -1)
{
	newcommentendpos = thebodyhtml.indexOf('"', newcommentpos + 1);
	wholecommentid = thebodyhtml.substr(newcommentpos, newcommentendpos - newcommentpos)
	commentid = wholecommentid.substr(12,100)
	
	usersstart = thebodyhtml.indexOf('/users/', newcommentpos);
	usersend = thebodyhtml.indexOf('"', usersstart );
	usersname = thebodyhtml.substr(usersstart + 7, usersend - usersstart - 7);

	marker = newcommentendpos 

	contentsuser = document.getElementById(wholecommentid);
	if (contentsuser) {
		newElement = document.createElement('a');
		newElement.setAttribute('id', 'quote' + commentid);
		newElement.setAttribute('href', 'javascript://' + commentid + '-' + usersname);
		newElement.className='news-submitted';
		var linkText=document.createTextNode('quote comment');
		newElement.appendChild(linkText);
		contentsuser.parentNode.insertBefore(newElement, contentsuser.nextSibling);
		var elmLink = document.getElementById('quote' + commentid);
		elmLink.addEventListener("click", quotecomment, true);
	}
	newcommentpos = thebodyhtml.indexOf("wholecomment", marker);
}

function quotecomment()
{
	thehref = this.getAttribute('href');
	secondslash = thehref.indexOf("/") + 2;
	firstdash = thehref.indexOf("-");
	commentid = thehref.substr(secondslash, firstdash - secondslash);
	theuserid = thehref.substr(firstdash + 1, 100);
	
	commentelement = document.getElementById("wholecomment" + commentid)
	thecomment = commentelement.innerHTML
	
    document.getElementById("comment").value = theuserid + ' said "' + thecomment + '"\n\r\n\r';
	document.getElementById("comment").focus();
}