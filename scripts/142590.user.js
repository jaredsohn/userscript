// ==UserScript==
// @name Boursorama Forum Helper
// @namespace https://www.boursorama.com/
// @description Greatly improves the reading of the topics from the Boursorama forums by displaying on a same page the content of all messages
// @match	http://www.boursorama.com/forum*
// @match	https://www.boursorama.com/forum*
// @grant	none
// @version     1.1.3
// @copyright	2013+, Aldebaran Arthemys
// @downloadURL	https://userscripts.org/scripts/source/142590.user.js
// @updateURL	http://userscripts.org/scripts/source/142590.user.js
// ==/UserScript==

(function()
{
	var messageList = document.getElementById('liste_messages');
	if (!messageList)
		return;


	var tableNode = document.createElement('table');
	tableNode.setAttribute('border', '1');
	tableNode.setAttribute('cellspacing', '0');
//	tableNode.setAttribute('cellpadding', '10px'); //marche pas
	tableNode.setAttribute('style', 'border-collapse: collapse; font-family: Arial; font-size: 14;');

	var strTitle = "";
	var i = 0;
	var innerHTML = "";
	var messages = document.evaluate("//div[@id='liste_messages']/div", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	while(i < messages.snapshotLength)
	{
		var curNode = messages.snapshotItem(i);


		innerHTML = innerHTML + "<tr>";

		var curNodeChildren = document.evaluate(".//*", curNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (curNodeChildren.snapshotLength >= 9)
		{
			var nOffset = 0;
			if (curNodeChildren.snapshotItem(5).className == "icon comments-reco")
				nOffset = 2;

			innerHTML += "<td valign='top' width='125px' style='padding: 7px; font-family: Arial; font-size: 10pt; text-align: center;'><div onclick=\"" + curNode.getAttribute('onclick') + "\">" + curNodeChildren.snapshotItem(5+nOffset).textContent + "</div>";

			if (nOffset == 2)
				innerHTML += curNodeChildren.snapshotItem(4).outerHTML;

			var strLogin = curNodeChildren.snapshotItem(7+nOffset).textContent;
			innerHTML += "<br/><a rel='nofollow' class='forum_bleu' href='/monbourso/fiche.phtml?log=" + strLogin +"'>" + strLogin + "</a>";

			if (curNodeChildren.snapshotLength >= (10+nOffset) && curNodeChildren.snapshotItem(9+nOffset).className == "icon boursostar3")
				innerHTML += curNodeChildren.snapshotItem(8+nOffset).outerHTML;

			innerHTML += "</td><td valign='top' style='padding: 7px; font-family: Arial; font-size: 10pt;'>";

			var bMessageWithContent = curNodeChildren.snapshotItem(1).className == 'forum_g5';
			if (strTitle == "")
			{
				strTitle = curNodeChildren.snapshotItem(3).innerHTML;
				innerHTML += strTitle;
			}
			else if (strTitle.substring(0, 39) != curNodeChildren.snapshotItem(3).innerHTML) 
			{
				if (bMessageWithContent)
					innerHTML += "<em>";
				innerHTML += curNodeChildren.snapshotItem(3).innerHTML;
				if (bMessageWithContent)
					innerHTML += "</em><br/><br/>";
			}

			if (bMessageWithContent)
			{
				i++;
				curNode = messages.snapshotItem(i);

				curNodeChildren = document.evaluate("./p", curNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

				if (curNodeChildren.snapshotLength == 1)
				{
/*
					console.log("ici");
					var strText = curNodeChildren.snapshotItem(0).textContent;
					//alert(strText);
					var strMagnifiedText = "";
					var nIndexStart = 1;
					var nIndexLeft = strText.indexOf("http");
					if (nIndexLeft == -1)
						strMagnifiedText = strText;
					else
					{
						console.log(strText);
						while (nIndexLeft >= 0)
						{
							console.log("nIndexStart=" +nIndexStart);
							console.log("nIndexLeft=" +nIndexLeft);
							strMagnifiedText += strText.substring(nIndexStart, nIndexLeft);
							console.log("strMagnifiedText=" + strMagnifiedText);

							var nIndexRight = strText.indexOf(" ", nIndexLeft);
							console.log("nIndexRight=" +nIndexRight);
							if (nIndexRight == -1)
								nIndexRight = strText.length;
							else
							{
								if (nIndexRight - nIndexLeft == 71)
								{
									// Limite Bourso atteinte
									var nIndexRightTmp = strText.indexOf(" ", nIndexRight+1);
							console.log("nIndexRightTmp=" +nIndexRightTmp);
									if (nIndexRightTmp >= 0)
										nIndexRight = nIndexRightTmp;
								}
							}
							console.log("nIndexRight=" +nIndexRight);

							var strURL = strText.substring(nIndexLeft, nIndexRight);
							console.log("strURL=" + strURL);
							strMagnifiedText += "<a class='forum_bleu' href='" + strURL + "'>" + strURL + "</a>";
							console.log("strMagnifiedText=" + strMagnifiedText);

							nIndexStart = nIndexRight;
							console.log("nIndexStart=" +nIndexStart);
							nIndexLeft = strText.indexOf("http", nIndexStart);
							console.log("nIndexLeft=" +nIndexLeft);
						}
						console.log("end");
						if (nIndexStart < strText.length)
							strMagnifiedText += strText.substring(nIndexStart);
						console.log("nIndexStart=" +nIndexStart);
						console.log("strMagnifiedText=" + strMagnifiedText);
					}
*/
					var strMagnifiedText = curNodeChildren.snapshotItem(0).innerHTML;

					innerHTML += strMagnifiedText;
				}
			}

			innerHTML = innerHTML + "</td>";
		}

		innerHTML = innerHTML + "</tr>";
		i++;
	}

	tableNode.innerHTML = innerHTML;
	messageList.parentNode.insertBefore(tableNode, messageList.nextSibling);

	var pageSuivanteList = document.evaluate("./center[@class='txt02']", messageList, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var pageSuivante = pageSuivanteList.snapshotItem(0);
	messageList.parentNode.removeChild(messageList);

	tableNode.parentNode.insertBefore(pageSuivante, tableNode.previousSibling);
	tableNode.parentNode.insertBefore(pageSuivante.cloneNode(true), tableNode.nextSibling);
}
)(); 
