// ==UserScript==
// @name           Spy Battle & Star Pirates Collapse Effects
// @description    Toggle between showing and hiding the Current Effects
// @include        *.spybattle.com/*
// @include        *.starpirates.net/*
// ==/UserScript==

//<td class="contenthead">
//innerHTML.search("Current Effects")
var headers = document.evaluate( "//td[@class='contenthead']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i = headers.snapshotLength-1; i >= 0 ; --i)
{
	if(headers.snapshotItem(i).innerHTML.search("Current Effects") != -1 )
	{
		var header = headers.snapshotItem(i);
		header.innerHTML = "<a name=\"foo\" onclick='var options; if(this.name == \"foo\") { options = \"\"; this.name=\"bar\"; } else {options = \"none\"; this.name=\"foo\" } this.parentNode.parentNode.nextSibling.childNodes[0].style.display = options;' >"+header.innerHTML+"</a>";

		//default state becomes collapsed
		header.parentNode.nextSibling.childNodes[0].style.display = "none";

		break;
	}
}
