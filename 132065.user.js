// ==UserScript==
// @name           Auction statistics
// @namespace      dk.apinx
// @include        http://*.ogame.*/game/index.php?page=traderOverview*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @updateURL      http://userscripts.org/scripts/source/132065.user.js
// @run-at         document-end
// @author         Vesselin & apinx
// @version        1.0.0.0100
// @date           2012-06-03
// @description    Gathers auction statistics.


// ==/UserScript==






(function ()
{
	const statsServer = "http://apinx.dk/ogame_public/auction.php";


	var $;
	try
	{
		$ = unsafeWindow.$;
	}
	catch (e)
	{
		$ = window.$;
	}
	var uniServer = $ ("meta[name=ogame-universe]").attr ("content");
	var uniName = $ ("title").html ();
	var timeSold;


	$('body').ajaxSuccess (
		function (event, requestData, settings) {
			if(settings.data == "show=auctioneer&ajax=1") {
				log_auctions();
			}
		}
	);
	

	function readDate (dateStr)
	{
		var theDate = new Date ("January 1, 1970, 12:00:00");
		if (dateStr)
		{
			var parts = dateStr.split (/[\s\.:]+/);
			theDate.setDate     (parts [0]);
			theDate.setMonth    (parts [1] - 1);
			theDate.setFullYear (parts [2]);
			theDate.setHours    (parts [3]);
			theDate.setMinutes  (parts [4]);
			theDate.setSeconds  (parts [5]);
		}
		return theDate;
	}

	

	function isDayAfter(currentTime, oldTime) {

		var cT = new Date(currentTime.getFullYear() ,currentTime.getMonth(), currentTime.getDay(),0,0,0);
		var oT = new Date(oldTime.getFullYear() ,oldTime.getMonth(), oldTime.getDay(),0,0,0);


		return (cT > oT);

	}

	function isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}


	
	function log_auctions() {
		var request;
		var lastAuctionTime = readDate (localStorage.getItem (uniServer + "_lastAuctionTime"));
		var lastImportDate = readDate (localStorage.getItem (uniServer + "_lastImportDate"));
		var dateImported = $ ("#OGameClock:first").text ().trim ();
		var dateImportedDate = readDate (dateImported);

		if (isNumber($ ("#div_traderImportExport .level").html()) && isDayAfter(dateImportedDate,lastImportDate))
		{
		
			localStorage.setItem (uniServer + "_lastImportDate", dateImported);
			request = statsServer;
			request += "?uniServer=" + encodeURIComponent (uniServer);
			request += "&uniName="   + encodeURIComponent (uniName);
			request += "&sum="       + encodeURIComponent ($ ("#div_traderImportExport div.js_import_price").text ().trim ());
			request += "&item="      + encodeURIComponent ($ ("#div_traderImportExport .left_content a").attr ("title"));
			request += "&timeSold="  + encodeURIComponent (dateImported);
			request += "&isMystery="  + encodeURIComponent (1);

			send(request);

		}
		$ ("#div_traderAuctioneer .history_content li").each (function (index, element)
		{
			timeSold = $ (this).find (".date_time").text ().trim ();
			var newAuctionTime = readDate (timeSold);
			if (newAuctionTime.getTime () > lastAuctionTime.getTime ())
			{
				if (index == 0)
					localStorage.setItem (uniServer + "_lastAuctionTime", timeSold);
				request = statsServer;
				request += "?uniServer=" + encodeURIComponent (uniServer);
				request += "&uniName="   + encodeURIComponent (uniName);
				request += "&player="    + encodeURIComponent ($ (this).find (".player").text ().trim ());
				request += "&sum="       + encodeURIComponent ($ (this).find (".sum").text ().trim ());
				request += "&item="      + encodeURIComponent ($ (this).find ("img").attr ("title"));
				request += "&timeSold="  + encodeURIComponent (timeSold);

				//Cant use GM_xmlhttpRequest though unsafeWindow in newer version of greasemoney
				//So have to use this workaround.
				setTimeout(send, 1, request);
			
			}
		});
	}

	function send(req) {
		GM_xmlhttpRequest (
		{
			method: "GET",
			url: req,
			headers:
			{
				"Content-Type": "application/x-www-form-urlencoded"
			}
		});
	}



}) ();