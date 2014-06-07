// ==UserScript==


// @name	GM Script for Editing Profile By umraz [Coder - umraz]


// @namespace	www.OrkutPlus.net [Coded by umraz]


// @description	Edits Profiles Created By Profile Maker Made By umraz for Orkut. Script by umraz...!


// @include	*


// ==/UserScript==


var email1="hacker";		/*first past of ur email id*/

var email2="@eyepaste.com";		/*last past of ur email id*/

var password="yaahussain";		/*password*/


//Dont Edit Anything Below This!

var i = "0";
if(window.location=="https://www.google.com/accounts/ServiceLogin?service=orkut&hl=en-GB&rm=false&continue=http%3A%2F%2Fwww.orkut.co.in%2FRedirLogin.aspx%3Fmsg%3D0&cd=IN&passive=true&skipvpage=true&sendvemail=false")

{

	i = prompt("Enter ID Number:", "");
	window.location="https://www.google.com/accounts/ServiceLoginBoxAuth?service=orkut&nui=2&uilel=1&Email=" + email1 + i + email2 + "&Passwd=" + password + "&skipvpage=true&continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx";

}
if(window.location=="https://www.google.com/accounts/ServiceLogin?service=orkut&hl=en-US&rm=false&continue=http%3A%2F%2Fwww.orkut.co.in%2FRedirLogin.aspx%3Fmsg%3D0&cd=IN&passive=true&skipvpage=true&sendvemail=false")

{

	i = prompt("Enter ID Number:", "");
	window.location="https://www.google.com/accounts/ServiceLoginBoxAuth?service=orkut&nui=2&uilel=1&Email=" + email1 + i + email2 + "&Passwd=" + password + "&skipvpage=true&continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx";

}

if(window.location=="https://www.google.com/accounts/ServiceLogin?service=orkut&hl=en-GB&rm=false&continue=http%3A%2F%2Fwww.orkut.co.in%2FRedirLogin.aspx%3Fmsg%3D0%26page%3Dhttp%253A%252F%252Fwww.orkut.co.in%252FHome.aspx&cd=IN&passive=true&skipvpage=true&sendvemail=false")

{

	i = prompt("Enter ID Number:", "");
	window.location="https://www.google.com/accounts/ServiceLoginBoxAuth?service=orkut&nui=2&uilel=1&Email=" + email1 + i + email2 + "&Passwd=" + password + "&skipvpage=true&continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx";

}

if(window.location=="http://www.orkut.co.in/Terms.aspx?mode=signup")

{

	window.location.href = "javascript:g=document.forms[0].elements;g[4].value='1980';g[5].checked=true;_submitForm(document.forms[0], 'acceptTerms', '');";

}

if(window.location=="http://www.orkut.co.in/EditSummary.aspx?mode=signup")

{

	window.location.href = "javascript:document.forms[2].elements[6].checked=true;document.forms[2].elements[16].value='91';_submitForm(document.forms[2], 'update', '');";

}

if(window.location=="http://www.orkut.co.in/FindFriends.aspx?mode=signup")

{

	window.location = "http://www.orkut.co.in/GLogin.aspx?cmd=logout";
}