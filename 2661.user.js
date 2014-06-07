// ==UserScript==
// @name		gsmls.com Usability 3
// @namespace	http://gsmlsusability.loc
// @description	Fixes javascript only links on gsmls.com so you can easily IM or email them
//				Adds a new link to the full MLS report for a listing. Useful to see original
//				list price and other data hidden from standard listing page
// @include		http://publicstage.gsmls.marketlinx.com/Scripts/search_results.asp*
// @include		http://new.gsmls.com/public/propertysearch.do*
// @date          2006-01-13
// @version       0.1.0
// @GM_version    0.6.4
// ==/UserScript==

function insertAfter(parent, node, referenceNode) {
	parent.insertBefore(node, referenceNode.nextSibling);
}

function getURLParameters( sURL ) 
{
	if (sURL.indexOf("?") > 0)
	{
		var arrParams = sURL.split("?");
		var arrURLParams = arrParams[1].split("&");
		var arrParams = new Object();

		var i = 0;
		for (i=0;i<arrURLParams.length;i++)
		{
			var sParam =  arrURLParams[i].split("=");
			arrParams[sParam[0]] = unescape(sParam[1]);
		}
	}
	return arrParams;
}

(function() {
	var form1 = document.forms.namedItem("discard");
	var form1Elements = form1.elements;

	form1.method = "get";
	form1.action = "http://new.gsmls.com/public/detailLst.do";

	if (document.getElementsByTagName)
	{
		var links = document.getElementsByTagName("a");
		for (var i=0; i < links.length; i++ )
		{			
			if (links[i].href.match("javascript:goDetail*"))
			{
				startPos = 21;
				endPos = links[i].href.length - 2;
				key = links[i].href.substring(startPos, endPos);
				
				// Get the MLS number, not the same thing as key
				//var mediaLink = linkCell.getElementsByTagName("A").item(0).href;
				//var mlsNum = getURLParameters( mediaLink )["MlsNum"];
				// Get the parent node of the link <TD>
				// Get the img tag under the <TD>
				linkCell = links[i].parentNode;
				var mlsNum = linkCell.getElementsByTagName("IMG").item(0).name;

				links[i].href = form1.action  
								+ "?mlsNum=" + mlsNum
								+ "&DetailKey="
								+ "&pagetype=" + form1Elements.namedItem("pagetype").value
								+ "&returnfields=" + form1Elements.namedItem("returnfields").value
								+ "&sort=" + "null"
								+ "&orderby=" + form1Elements.namedItem("orderby").value
								+ "&KeyList=" + form1Elements.namedItem("KeyList").value
								+ "&notDiscarded=" + form1Elements.namedItem("notDiscarded").value
								+ "&SelectedMLSNums=" + form1Elements.namedItem("SelectedMLSNums").value;




				// Link to the full Mls report
				//http://listings.gsmls.com/SearchDetail/Scripts/PrtBuyFul/PrtBuyFul.asp?prp=Mls&MlsNumList=2027675
				var breakNode = document.createElement("BR");
				var fullReport = document.createElement("A");
				fullReport.href = "http://listings.gsmls.com/SearchDetail/Scripts/PrtBuyFul/PrtBuyFul.asp" + 
								  "?prp=Mls" + 
								  "&MlsNumList=" + mlsNum;
				fullReport.innerHTML = "Full Mls Report";
				insertAfter(links[i].parentNode, breakNode, links[i]);
				insertAfter(links[i].parentNode, fullReport, breakNode);
			}
		}
	}
}) ();

