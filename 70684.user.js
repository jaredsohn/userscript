// ==UserScript==
// @name           Hushmail - Clickable links
// @namespace      http://NxtGn.org
// @include        https://mailserver*.hushmail.com/hushmail/showHelpFile.php?PHPSESSID=*&file=popupHyperlinkHelp.html#*
// ==/UserScript==
var URL = new String(document.location);
var NewURL = URL.slice(131 - URL.length);
if (NewURL.slice(0,4 - NewURL.length) == "http")
{
document.location=NewURL;
}
else if (NewURL.slice(0,5 - NewURL.length) == "https")
{
document.location=NewURL;
}
else if (NewURL.slice(0,3 - NewURL.length) == "ftp")
{
document.location=NewURL;
}
else if (NewURL.slice(0,3 - NewURL.length) == "irc")
{
document.location=NewURL;
}
else if (NewURL.slice(0,4 - NewURL.length) == "news")
{
document.location=NewURL;
}
else
{
alert("Possible XXS attack!\n" + NewURL);
}