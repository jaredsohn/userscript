// ==UserScript==
// @name           TehConnection :: Rate Releases
// @namespace      GLaDOSDan
// @include        http*://*tehconnection.eu/torrents.php?*
// ==/UserScript==
var siteArray = []; // << DO NOT EDIT THIS LINE
siteArray[0] = ["tehconnection", "0", "0", "action=download", "�", "Ratings ", " | "];

var matchtid = location.href.match(/[?&]id=(\d+)/);
var groupid = matchtid[1];


var userclass = document.getElementsByClassName('username');
var profileurl = userclass[0];
var matchuid = profileurl.href.match(/[?&]id=(\d+)/);
var userid = matchuid[1];

//Set webUI mode:
var webUIType = 2;
var webIP = 'null';

//Rest of script
var useCookie = "0";
var innerSep = "";
var isWhat = "";
var stripssl = "";
	var ifEventListener = false;

start();
function start()
{
	var links = getLinks();
	for (var i=0, link; link = links[i++]; )
	{
		if (match(link.href))
		{
			if (stripssl == "1")
			{
				link.href = link.href.replace(/http?s/, "http");
			}
			var uTorrentLink = makeUTorrentLink(link);
			link.parentNode.insertBefore(uTorrentLink, link.nextSibling);
			var separator = makeSep();
			link.parentNode.insertBefore(separator, link.nextSibling);
		}
	}
}

function makeUTorrentLink(link) {

	var uTorrentLink  = document.createElement('a');
	var uTorrentFrameSrc = makeWebUILink(webIP, link.href, groupid);
	var wTorrentTorrentURL = link.href;
	uTorrentLink.href = uTorrentFrameSrc;
    uTorrentLink.innerHTML = linkText;
    return uTorrentLink;
}
function makeWebUILink(webIPforLink, linkhref, groupidlink)
{
		var torrentid = linkhref.match(/[?&]id=(\d+)/);
		torrentid = torrentid[1];
		return "javascript:display_release_gd_"+torrentid+"();";
}

function makeSep() {
	var separatorText = document.createElement("text");
	separatorText.innerHTML = innerSep;
	return separatorText;
}



function getLinks()
{
   var doc_links = document.links;
   var links = [];
   for (var i=0, link; link = doc_links[i++];) {
       links.push(link);
   }
   return links;
}

function match(url) {
	for (var i=0;i<siteArray.length;i++)
	{
		if(url.match(siteArray[i][0]) && url.match(siteArray[i][3]) && !url.match(siteArray[i][4]))
		{
			if(siteArray[i][1] == "1" && webUIType != "2" && webUIType != "3") { stripssl = "1"; }
			if(siteArray[i][2] == "1") { useCookie = "1"; }
			if(siteArray[i][6] != "") { innerSep = siteArray[i][6]; }
			if(siteArray[i][5] != "") { linkText = siteArray[i][5]; }
			return 1;
		}
	}
}


//Code for sidebar status box


function insertbox(html, index) {
    var box = document.createElement('div');
    box.className = 'box';
    box.innerHTML = html;

    var sidebar = document.getElementById('poster').parentNode;
    if (sidebar.children.length > index) {
        sidebar.insertBefore(box, sidebar.children[index]);
    }
    else {
        sidebar.appendChild(box);
    }

    return box;
}


GM_xmlhttpRequest({
method: 'GET',
url: 'http://gladosdan.com/tc/vote_releases.php?group=' + groupid + '&userid=' + userid + '&version=1',
onload: function(response) {
if (response.responseText !== ""){ insertbox(response.responseText, 1); }
}
});