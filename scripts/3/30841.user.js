//.
// ==UserScript==
// @name          Fallensword Buffing
// @namespace     http://sparcman.net/Documents/
// @author        SparcMan
// @description	  Adds several quicklinks to own and other player profile pages for Fallensword mmorpg
// @include       http://www.fallensword.com/index.php?cmd=profile*

// Thanks to tokataro for the idea, the playerID search command and the Javascript popup command
// 		http://www.myspace.com/tokataro
// This script will add a Quickbuff link under the player avatar image for your own profile
// and other players with the username already filled in on the Quickbuff dialog.
// Also adds links for quickrepair, realm map and now link to the player's auction to the profile screen.
// Note that the realm map does not appear as a popup - this is intentional to its easy to open
// in a new tab instead of a popup window this way.


var xpath =  "//textarea[@id='holdtext']";
var player = document.evaluate(xpath, document, null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var xpath = "//td/img[contains(@title, 's Avatar')]";
var avyrow = document.evaluate(xpath, document, null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			
var xpath = "//img[contains(@src, '/skin/')]";
var imgurls = document.evaluate(xpath, document, null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			
var playerid = document.URL.match(/\w*\d{5}\d*/)
var idindex
var newhtml
var imgserver

			
if (player.snapshotLength == 1)
{
    const notWhitespace = /\S/
    if (playerid == null)
	{
		playerid = player.snapshotItem(0).innerHTML;
		idindex = playerid.indexOf("?ref=") + 5;
		playerid = playerid.substr(idindex);
		var xpath = "//td/center/img[contains(@title, 's Avatar')]";
		var avyrow = document.evaluate(xpath, document, null,
	            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	
	var playeravy = avyrow.snapshotItem(0).parentNode.firstChild ;
	while ((playeravy.nodeType == 3)&&(!notWhitespace.test(playeravy.nodeValue)))
	{
		playeravy = playeravy.nextSibling ;
	}
	var playername = playeravy.getAttribute("title");
	playername = playername.substr(0, playername.indexOf("'s Avatar"));
	
	idindex = imgurls.snapshotItem(0).src.indexOf("/skin/");
	imgserver = imgurls.snapshotItem(0).src.substr(0,idindex);
	
	var auctiontext = "Go to " + playername + "'s auctions" ;

	newhtml = avyrow.snapshotItem(0).parentNode.innerHTML + "</td></tr><tr><td align='center' colspan='2'>" ;
	newhtml += "<a href='http://www.fallensword.com/index.php?cmd=blacksmith&subcmd=repairall'>" ;
	newhtml += "<img alt='Quick repair all items' title='Quick repair all items' src=" ;
	newhtml += imgserver + "/skin/realm/icon_action_repair.gif></a>&nbsp;&nbsp;" ;
	newhtml += "<a href='javaScript:quickBuff(" + playerid ;
	newhtml += ");'><img alt='Buff " + playername + "' title='Buff " + playername + "' src=" ;
	newhtml += imgserver + "/skin/realm/icon_action_quickbuff.gif></a>&nbsp;&nbsp;" ;
	newhtml += "<a href='http://www.fallensword.com/index.php?cmd=world&subcmd=map'>" ;
	newhtml += "<img alt='Go to realm map' title='Go to realm map' src=" ;
	newhtml += imgserver + "/skin/realm/icon_action_map.gif></a>&nbsp;&nbsp;" ;
	newhtml += "<a href=http://www.fallensword.com/?cmd=auctionhouse&type=-3&tid=" ;
	newhtml += playerid + '><img alt="' + auctiontext + '" title="' + auctiontext + '" src=';
	newhtml += imgserver + "/skin/gold_button.gif></a>" ;
	avyrow.snapshotItem(0).parentNode.innerHTML = newhtml ;
}

// ==/UserScript==