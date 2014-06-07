// ==UserScript==
// @name          Highlight good digg comment
// @namespace     http://diveintogreasemonkey.org/download/
// @description   v1.0
// @include       http://digg.com/*
// @include       http://www.digg.com/*
// ==/UserScript==

thebodyhtml = document.body.innerHTML;
marker = 1;
newcommentpos = thebodyhtml.indexOf('id="wholecomment', marker);
while (newcommentpos > -1)
{
	newcommentendpos = thebodyhtml.indexOf('"', newcommentpos + 5);
	wholecommentid = thebodyhtml.substr(newcommentpos, newcommentendpos - newcommentpos)

	commentid = wholecommentid.substr(16,100)

	commentscore = document.getElementById("scorediv" + commentid).innerHTML

	if (commentscore != "00" && commentscore > 0)
	{
		commentelement = ""
		commentelement = document.getElementById("wholecomment" + commentid)
		commentelement.innerHTML = "<B>" + commentelement.innerHTML + "</B>"
	}
	
	marker = newcommentendpos + 50

	newcommentpos = thebodyhtml.indexOf('id="wholecomment', marker);
}
