// ==UserScript==
// @name XSS This Page
// @namespace http://yehg.org
// @author d0ubl3_h3lix <http://yehg.org>
// @description Fill every input+textarea field with XSS payload to check XSS-vulnerable But it doesn't auto submit to void user annoyances
// @include *
// ==/UserScript==

function fill_xss()
{
var frm = document.getElementsByTagName("form");
if(frm.length>=1)
{
var input = document.getElementsByTagName("input");
if (input.length >= 1)
{
for(var i=0;i<=input.length-1;i++)
{
if ((document.getElementsByTagName("input").type != 'button') && if
(document.getElementsByTagName("input").type != 'submit') )

{
//alert(document.getElementsByTagName("input").name);
document.getElementsByTagName("input").value ='<yehgxsstest>';
}
}
}
var textarea = document.getElementsByTagName("textarea");
if (textarea.length >= 1)
{
for(var i=0;i<=textarea.length-1;i++)
{
document.getElementsByTagName("textarea").value ='<yehgxsstest>';

}
}
}
}
function check_xss()
{
var body = document.body.innerHTML;
if (body.indexOf('&lt;yehgxsstest&gt;')>0)
{
var newbody = '<fieldset style="width:40%"><legend style="font-size:1.3em;color:red">Vulnerable to XSS!</legend><i>Detected by<br\/>Yehg.org\'s XssThisPage Greasemonkey Script</i></fieldset><br />'+ body;
document.body.innerHTML = newbody;
return true;
}
else
{
return false;
}
}

function xss_this_page()
{
if (check_xss()==false){fill_xss();}
}
window.addEventListener('load',xss_this_page,true);