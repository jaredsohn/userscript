// ==UserScript==
// @name           F1 BBC News censoring
// @namespace      http://regionaltraffic.co.uk/
// @description    Censoring of F1 related news on BBC website during event weekends
// @include        http://www.bbc.co.uk/news/*
// ==/UserScript==

/*jshint trailing:true */
/*global XPathResult */

(function () {
	"use strict";

	var JS_DAY_MONDAY = 1,
		JS_DAY_FRIDAY = 5,
		MILLISECONDS_PER_DAY = 86400000,
		dtToday = new Date(),
		iDay = dtToday.getDay(),
		oaElement,
		iElement,
		oElement,
		saDates,
		iDate,
		sDate,
		iDayNum,
		iMonth,
		iYear,
		dtDate,
		iRaceDay,
		bInvalid,
		bCensor,
		iSlashPos,
		reCensor,
		sCSS,
		oaHead,
		bHide;

	// Removes elements by XPath selector
	function removeElement(sXpath) {
		oaElement = document.evaluate(sXpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (iElement = 0; iElement < oaElement.snapshotLength; iElement++) {
			oElement = oaElement.snapshotItem(iElement);
			oElement.parentNode.removeChild(oElement);
		}
	}

	// Only consider race events between Friday and Monday (to allow for catch-up viewing)
	if ((iDay >= JS_DAY_FRIDAY) || (iDay <= JS_DAY_MONDAY)) {

		// Determine if race period is active
		dtToday = new Date(dtToday.getFullYear(), dtToday.getMonth(), dtToday.getDate());
		saDates = ["16/3", "30/3", "6/4", "20/4", "11/5", "25/5", "8/6", "22/6", "6/7", "20/7", "27/7", "24/8", "7/9", "21/9", "5/10", "12/10", "2/11", "9/11", "23/11"];
		for (iDate = 0; iDate < saDates.length; iDate++) {
			sDate = saDates[iDate];
			bInvalid = true;
			iSlashPos = sDate.indexOf("/");
			if (iSlashPos !== -1) {
				iYear = dtToday.getFullYear();
				iDayNum = parseInt(sDate.substr(0, iSlashPos), 10);
				iMonth = parseInt(sDate.substr(iSlashPos + 1), 10);
				// If valid date
				if (!isNaN(iDayNum) && !isNaN(iMonth) && (iDayNum >= 1) && (iDayNum <= 31) && (iMonth >= 1) && (iMonth <= 12)) {
					dtDate = new Date(iYear, iMonth - 1, iDayNum);
					// Determine current day of race event (relative to the Sunday)
					iRaceDay = Math.floor((dtToday.getTime() - dtDate.getTime()) / MILLISECONDS_PER_DAY);
					if ((iRaceDay >= -2) && (iRaceDay <= 1)) {
						bCensor = true;
						break;
					}
					bInvalid = false;
				}
			}
			if (bInvalid) {
				window.alert("Invalid date '" + sDate + "' " + iDayNum + "," + iMonth);
			}
		}

		if (bCensor) {
			// Hide ticker holder
			sCSS = "@namespace url(http://www.w3.org/1999/xhtml); #tickerHolder { display:none !important; }";
			if (typeof window.GM_addStyle !== "undefined") {
				window.GM_addStyle(sCSS);
			} else if (typeof window.addStyle !== "undefined") {
				window.addStyle(sCSS);
			} else {
				oaHead = document.getElementsByTagName("head");
				if (oaHead.length) {
					oElement = document.createElement("style");
					oElement.type = "text/css";
					oElement.appendChild(document.createTextNode(sCSS));
					oaHead[0].appendChild(oElement);
				}
			}

			// Censor trigger keywords
			reCensor = /F1|GP(?![sS])|Grand Prix|Formula (1|One)|Vettel|Ricciardo|Rosberg|Hamilton|R[äa]ikk[öo]nen|Alonso|Grosjean|Maldonado|Magnussen|Button|P[ée]rez|H[üu]lkenberg|Gutierrez|Sutil|Vergne|Kvyat|Massa\b|Bottas|Bianchi|Chilton|Kobayashi|Ericsson|Red Bull|McLaren|Ferrari|Mercedes|Lotus|Force India|Sauber|Toro Rosso|Williams|Caterham|Marussia/;

			// Censor hyperlinks, image alt/title attributes and textual paragraphs/spans
			oaElement = document.evaluate("//a|//img|//p|//span", document.documentElement, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (iElement = 0; iElement < oaElement.snapshotLength; iElement++) {
				oElement = oaElement.snapshotItem(iElement);
				if (oElement.nodeName === "IMG") {
					bHide = (oElement.alt && reCensor.test(oElement.alt)) || (oElement.title && reCensor.test(oElement.title));
				} else {
					bHide = reCensor.test(oElement.textContent);
				}
				if (bHide) {
					oElement.style.visibility = "hidden";
				}
			}

			// Reduce CPU usage
			removeElement("//div[@id = 'tickerHolder']");
			removeElement("//div[@class = 'wideav']");
			removeElement("//script[contains(@src, 'ticker')]");
		}
	}

}());