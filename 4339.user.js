//
// ==UserScript==
// @name          PhotoBucketFix
// @description   Replace thumblink with directlink
// @include       http://*.photobucket.com/*
// @include       http://www.photobucket.com/*
// ==/UserScript==


//first things first, we need to remove all of the thumbnail's links
allThumbLinks = document.evaluate("//img[@class='thumbnail']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allThumbLinks.snapshotLength; i++)
{
	thisThumbLink = allThumbLinks.snapshotItem(i);
	thisThumbLink.parentNode.href= i;
}


td = document.getElementById("containerHeader");
if (td)
{

allLinks = document.evaluate(
    "//input[@name='myurl']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
	//GM_log(thisLink.value);
	//document.write ( "<a href=" + thisLink.value + "> " + i + "</a>\n");
	td.innerHTML += "<a href=" + thisLink.value + "> " + i + "</a>\n";
}




if (i <= 0)
{
	//build regexes 
	reggie = new RegExp(/\[IMG\]/g);
	reggie2= new RegExp(/\[\/IMG]/g);
	
	//grab all of the IMG encoded images
	allLinks = document.evaluate( "//input[@name='myimg']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	//rip them to bits one by one, output the content as a link
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		thisLink = allLinks.snapshotItem(i);
		//document.write(thisLink.value + "\n");
		output= thisLink.value.replace(reggie,"");
		output= output.replace(reggie2,"");
		td.innerHTML += "<a href='" + output + "'> " + i + "</a>\n";
	}
}

}