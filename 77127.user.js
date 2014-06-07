// ==UserScript==
// @name           wzl hide
// @namespace      sdf
// @include        http://wzl.be/fun/index.asp?par=f_post*
// @include        http://www.wzl.be/fun/index.asp?par=f_post*
// @include        http://wijfzonderlijf.be/fun/index.asp?par=f_post*
// @include        http://www.wijfzonderlijf.be/fun/index.asp?par=f_post*
// ==/UserScript==


var tables = document.getElementsByClassName("commentsctn");

var commentstable = tables[0];

for( var k = 0; k < commentstable.rows.length; k++)
{
	if( (commentstable.rows[k].cells[0].innerHTML.indexOf("<a href=\"/users/shibby/\">shibby</a>") > 0) || 
	 (commentstable.rows[k].cells[0].innerHTML.indexOf("<a href=\"/users/ieamndanders/\">vulzelfin</a>") > 0)
	)
	{


var spamFaggery = commentstable.rows[k].cells[0].parentNode;
            spamFaggery.parentNode.removeChild(spamFaggery);

var spamFaggery = commentstable.rows[k].cells[0].parentNode;
spamFaggery.parentNode.removeChild(spamFaggery);

	} //endif
}//endfor

