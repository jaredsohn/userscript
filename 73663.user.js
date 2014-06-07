// ==UserScript==
// @name           Ultimate Neopets Auto Bidder
// @description    Autobids at the auction ID. Edit the settings inside.
// @include        *neopets.com/auctions.phtml*
// ==/UserScript==

var maxBid    = 500000; //max you are willing to bid
var minRef    = 400; //min refresh time (ms)
var maxRef    = 600; //max refresh time (ms)

function GetBetween(zStr, zStart, zEnd, zPos) {
    var z1 = zStr.indexOf(zStart, (zPos === undefined ? 0 : zPos)); var z2 = zStr.indexOf(zEnd, z1);
    return z2 > z1 && z1 > -1 ? zStr.substring(z1 + zStart.length, z2) : '';
}

function random(min, max) {		
	return Math.floor(Math.random() * (max-min)) + min; 
}

if(document.body.innerHTML.indexOf("Time Left in Auction") > -1) {
	var lastbidder = GetBetween(document.body.innerHTML, "randomfriend.phtml?user=", "\">", document.body.innerHTML.indexOf("Welcome, <a href=") + 50);
	var currentuser = GetBetween(document.body.innerHTML, "/userlookup.phtml?user=", "\">");
	var newbid = GetBetween(document.body.innerHTML, "<input name=\"amount\" value=\"", "\">");
	newbid = newbid.substr(0, newbid.indexOf("\""));
	if((document.body.innerHTML.indexOf("No bids have been placed") > -1 || lastbidder != currentuser) && (newbid <= maxBid)) {
		document.forms[1].submit();
	} else {
		window.setTimeout("window.location.reload()", random(minRef, maxRef));
	}
} else if(document.body.innerHTML.indexOf("to view the updated list of bids") > -1) {
	var url = "http://www.neopets.com/auctions.phtml?type=bids&auction_id=156252388" + document.body.innerHTML.match(/auction_id=(\d+)/)[1];
	window.setTimeout("location.href = \"" + url + "\"", random(minRef, maxRef));
} else if(document.body.innerHTML.indexOf("you are not allowed to bid on an auction") > -1) {
	history.go(-1);
} else if(document.body.innerHTML.indexOf("ERROR :") > -1) {
	location.href = "http://www.neopets.com/auctions.phtml";
}