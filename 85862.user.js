// ==UserScript==
// @name           Atraf Dating no tracks browsing
// @namespace      http://www.example.com/atraf1
// @description    Disables leaving tracks with Atraf Dating.
// @include        http://dating.atraf.co.il/*
// @include        http://my.atrafdating.co.il/*
// ==/UserScript==

var profileIdentifier = "zrzor4p1qr";

var links = document.evaluate(
    "//a[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < links.snapshotLength; i++)
{
	var a = links.snapshotItem(i);
	if (a.href.search(profileIdentifier) != -1)
	{
		a.href += "&disableTrack=True&pup=";
	}
}


// This works fine for chat clicks:
document.addEventListener('click', function(event)
{
	if ((event.target.href.search(profileIdentifier) != -1) && (event.target.href.search("disableTrack") == -1))
	{
		event.target.href += "&disableTrack=True&pup=";
	}
}, true);


// This handles popup windows (most of them, at least):
unsafeWindow.newMemberDetailsWindow = function(membercode)
{
	window.open("/members/memberDetails.aspx?"+ membercode + "&disableTrack=True&pup=True", "memberDetailsWindow","alwaysRaised,left=157,top=70,height=600,width=720,status=no,toolbar=no,menubar=no,location=no,scrollbars=yes");
	return false;
}; // unsafeWindow

var a;
var elements = document.getElementsByClassName("glist-header-name");
if ((elements != null) && (elements.length >0))
{
	for (var j=0; j<elements.length; j++)
	{
		a = elements[j];
		var b = a.childNodes[0];
		var newB = b.innerHTML.replace("memberDetailsWindow", "newMemberDetailsWindow");
		a.removeChild(b);
		a.innerHTML += newB;
	}
}
