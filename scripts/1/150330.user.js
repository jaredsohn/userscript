// ==UserScript==
// @name        Kadokado Magic Data Extractor
// @namespace   http://www.kadokado.com
// @description Extract players data from a particular Kadokado clan (players scores, records, stars and levels for all games) to an Excel compliant file format (CSV) to make statistics.
// @match     	http://www.kadokado.com/clan/*
// @match     	http://www.kadokado.com/tid/*
// @grant	GM_xmlhttpRequest
// @version     1.1.0
// @copyright	2012-2014+, Aldebaran Arthemys
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant    GM_addStyle
// @downloadURL	https://userscripts.org/scripts/source/150330.user.js
// @updateURL	http://userscripts.org/scripts/source/150330.user.js
// ==/UserScript==

var LOADING_IFRAME_ID = "KMDE_loadingFrame";

window.addEventListener ("load", mainContent, false);


function mainContent()
{
	var strPathName = window.location.pathname;

	if (window.top == window.self)
	{
		// Main behaviour : add the Extract button

		// Only applicable to "/clan/" pages
		if (strPathName.substring(0, 6) != "/clan/")
		{
			// Should be processed indirectly and only with the Advanced behaviour
			return true;
		}

		// Extracting basic data
		var strClanURL = RetrieveClanURL();
		if (strClanURL == "")
		{
			//LogInfo("You must be a member of a clan to be allowed to extract its data!");
			return false;
		}
	
		// Filter access
		var strLocation = document.location.href;
		if (strLocation.indexOf(strClanURL) == -1)
			return false;
	
		// Get the actions available on this clan through the buttons
		var ulActions = document.evaluate("//ul[@class='action']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (!ulActions)
		{
			LogInfo("Error 'mainContent' while retrieving the left menu");
			return false;
		}
	
		// Add the Extract Data button
		CreateExtractAllButton(ulActions, "KMDE_Extract", "Extract all data", PrepareAdvancedExtraction);

		// Add the Extract History button only from the History page
		if (strPathName.slice(-8) == "/history")
			CreateExtractAllButton(ulActions, "KMDE_Extract_History", "Extract history data", ExtractHistory);
	}
	else
	{
		// Advanded behaviour: extracting data from the iframe

		// Ours only... in case of more than one in the pages
		if (window.name != LOADING_IFRAME_ID)
		{
			LogInfo("Warning : not expected iframe ; do nothing on this one.");
			return false;
		}

		// Check url for forum only
		if (strPathName.substring(0, 10) != "/tid/forum")
		{
			LogInfo("Abnormal behaviour: our iframe should be extracting forum data only");
			return false;
		}

		// Wait for all AJAX calls before processing
		waitForKeyElements ("div[class*='tid_announce']", ExtractData, true, document);
	}

	return true;
}


// Returns Clan URL
function RetrieveClanURL()
{
	// Find Clan URL
	var buttonMyClan = document.evaluate("//div[@class='actions']/ul/li/a[starts-with(@href, '/clan/')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (!buttonMyClan)
		return "";

	return "http://www.kadokado.com" + buttonMyClan.getAttribute("href");
}


// Create the Extract button
function CreateExtractAllButton(buttonsArea, strIdButton, strButtonText, pFunction)
{
	if (!buttonsArea)
		return null;
	
	var aNode = document.evaluate("./li[@id='" + strIdButton + "']/a", buttonsArea, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (!aNode)
	{
		var liNode = document.createElement("li");
		liNode.setAttribute("id", strIdButton);
		buttonsArea.appendChild(liNode);
		
		aNode = document.createElement("a");
		aNode.setAttribute("href","#");
		//aNode.setAttribute("name","RunExtract");
		aNode.onclick = pFunction;
		liNode.appendChild(aNode);
	
		var textNode = document.createTextNode(strButtonText);
		aNode.appendChild(textNode);
	}

	return aNode;
}



var m_strResult = "";
var m_nCount = 0;
var m_strClanName = "";

// Extracting Data
function PrepareAdvancedExtraction()
{
	var strClanURL = RetrieveClanURL();
	if (strClanURL == "")
	{
		LogInfo("You must be member of the clan to be allowed to extract its data!");
		return false;
	}


	var titleNode = document.evaluate("//div[@class='clanBody']/h1/span[@class='txt2img']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (!titleNode)
	{
		LogInfo("Error 'PrepareAdvancedExtraction' while extracting the markup of the clan name");
		return false;
	}
	var strClan = ExtractTextFromImages(titleNode);
	if (strClan == "")
	{
		LogInfo("Error 'PrepareAdvancedExtraction' while extracting the clan name");
		return false;
	}
	//m_strClanName = strClan;


	if (!confirm("Ceci va lancer l'extraction des données du clan '" + strClan + "'\net proposera de télécharger le fichier de résultat.\n\nVoulez-vous continuer ?"))
		return false;



	// Prepare the iframe for the Advanced Behaviour
	var loadingIframe = document.createElement("iframe");
	loadingIframe.hidden = true;
	loadingIframe.setAttribute("id", LOADING_IFRAME_ID);
	loadingIframe.setAttribute("name", LOADING_IFRAME_ID);
	document.body.appendChild(loadingIframe);
	// Looking for the forum thread "Records"
	loadingIframe.setAttribute("src", "http://www.kadokado.com/tid/forum#!view/32923|thread/12334041");

	// The loading of this iframe causes the script to be reloaded with this page (second part of mainContent())
	// and then to run the data extraction below
}


// French only for the moment
function GetMonth(strMonth)
{
	strMonth = strMonth.toLowerCase();
	switch(strMonth)
	{
		case "janvier": return 1;
		case "février": return 2;
		case "mars": return 3;
		case "avril": return 4;
		case "mai": return 5;
		case "juin": return 6;
		case "juillet": return 7;
		case "août": return 8;
		case "septembre": return 9;
		case "octobre": return 10;
		case "novembre": return 11;
		case "décembre": return 12;
	};

	return -1;
}

// french
function GetDay(strDay)
{
	strDay = strDay.toLowerCase();
	switch(strDay)
	{
		case "dimanche": return 0;
		case "lundi": return 1;
		case "mardi": return 2;
		case "mercredi": return 3;
		case "jeudi": return 4;
		case "vendredi": return 5;
		case "samedi": return 6;
	};

	return -1;	
}

// french
function GetDayName(nDay)
{
	switch(nDay)
	{
		case 0: return "dimanche";
		case 1: return "lundi";
		case 2: return "mardi";
		case 3: return "mercredi";
		case 4: return "jeudi";
		case 5: return "vendredi";
		case 6: return "samedi";
	};

	return -1;	
}

// french
function GetFrDay(strDay)
{
	strDay = strDay.toLowerCase();
	var today = new Date();
	var nDay = today.getDate();
	if (strDay == "hier")
		return nDay-1;
	if (strDay == "aujourd'hui")
		return nDay;

	var nDayOfWeek = today.getDay();
	var strDayOfToday = GetDayName(nDayOfWeek);

	var nOffsetDay = (GetDay(strDayOfToday) - GetDay(strDay) + 7) % 7;
	return nDay-nOffsetDay;
}

// French only for the moment
function GetAbsoluteTime(strTimeStamp)
{
	var strDateTime = "";

	// Look for absolute dates/times
	var nTimeType = 0;
	var strPattern = "";
	if (strTimeStamp.indexOf(":") == -1)
	{
		if (strTimeStamp.substring(0, 3) != "Il ")
		{
			nTimeType = 1; // absolute date
			strPattern = "Le ([0-3]?[0-9]) ([^0-9 ]*)( (20[0-9][0-9]))?";
		}
		else
		{
			nTimeType = 3; // relative date
			strPattern = "Il y a( ([0-2]?[0-9]) h)?( ([0-5]?[0-9]) min)?";
		}
	}
	else
	{
		nTimeType = 2; // absolute date with days
		strPattern = "([^0-9 ]*)( ([0-3]?[0-9]))? à ([0-2]?[0-9]):([0-5]?[0-9])";
	}

	var regEx = new RegExp(strPattern, "i");
	
	var date = 0;

	var today = new Date();
	var nYear = today.getFullYear();
	var nMonth = today.getMonth();
	var nDay = today.getDate();
	var nHour = 0;
	var nMinute = 0;

	var arrMatches = regEx.exec(strTimeStamp);
	switch(nTimeType)
	{
		case 1:
			if (arrMatches[4] != undefined)
				nYear = parseInt(arrMatches[4]);
			nDay = parseInt(arrMatches[1]);
			nMonth = GetMonth(arrMatches[2])-1;
			date = new Date(nYear, nMonth, nDay);
		break;

		case 2:
			if (arrMatches[3] != undefined)
				nDay = parseInt(arrMatches[3]); // absolute with date
			else
				nDay = GetFrDay(arrMatches[1]); //  absolute with day of week;
			nHour = parseInt(arrMatches[4]);
			nMinute = parseInt(arrMatches[5]);
			date = new Date(nYear, nMonth, nDay, nHour, nMinute);
		break;

		case 3:
		{
			if (arrMatches[2] != undefined)
				nHour = parseInt(arrMatches[2]); // absolute with hour
			if (arrMatches[4] != undefined)
				nMinute = parseInt(arrMatches[4]); // absolute with minute

			var offsetTime = (nHour*60 + nMinute) * 60000;
			date = new Date(today - offsetTime);
		}	
		break;
	};

	return date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
}

var m_arrRecords = new Array();
var m_strRecordsLastUpdate = "";

// Extract all data
function ExtractData(jNode)
{

	console.log("Enter ExtractData");

	// First extract records from the forum through this iframe
	var annonceNode = $(jNode)[0];
	var aNodes = document.evaluate(".//a", annonceNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i=0; i<aNodes.snapshotLength; i++)
	{
		var aNode = aNodes.snapshotItem(i);
		
		var strHref = aNode.getAttribute("tid_href");
		var nIndex = strHref.lastIndexOf("/");
		if (nIndex < 0)
			continue;
		var strID = "tid_forumPost_" + strHref.substring(nIndex+1);

		if (i == 0)
		{
			var strTimeStamp = aNode.innerHTML;
			nIndex = strTimeStamp.indexOf("]");
			if (nIndex != -1)
			{
				strTimeStamp = strTimeStamp.substring(1, nIndex);
	
				// Calculer ici la date absolue :(
				m_strRecordsLastUpdate = GetAbsoluteTime(strTimeStamp);
			}
		}

		var pNodes = document.evaluate("//div[@id='" + strID + "']//div[@class='tid_editorContent']/p[position()>1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for(var j=0; j<pNodes.snapshotLength; j++)
		{
			var pNode = pNodes.snapshotItem(j);

			// bouh! Faut parser le bordel :(
			var nState = 0; // init

			var strGameName = "";
			var strRecord = "";
			var strRecordman = "";
			for(var k=0; k<pNode.childNodes.length; k++)
			{
				var childNode = pNode.childNodes[k];

				switch(nState)
				{
					case 0: // Name
					if (childNode.nodeName == "#text" && $.trim(childNode.nodeValue) != "")
					{
						strGameName = $.trim(childNode.nodeValue.replace(/\./g, " "));
						nState ++;
					}
					break;

					case 1: // Record: passer l'étoile ouvrante et le texte d'alignement
					if (childNode.nodeName == "STRONG")
					{
						strRecord = $.trim(childNode.innerHTML.replace(/\./g, "")); // Virer les points pour le format numérique
						nState ++;
					}
					break;

					case 2: // Passer l'étoile fermante
					if (childNode.nodeName == "IMG")
						nState ++;
					break;

					case 3: // Recordman
					strRecordman = $.trim(childNode.nodeValue.replace(/\./g, " "));
					break;
				}

				if (strRecordman != "")
				{
					var strSimplifiedGameName = ComputeGameSimplifiedName(strGameName);
					m_arrRecords[strSimplifiedGameName] = strRecord + "|" + strRecordman;

					// reset
					nState = 0;
					strGameName = "";
					strRecord = "";
					strRecordman = "";
				}


			}
		}
	}

	// Then continue extracting all clan data from the MAIN PARENT FRAME!
	ExtractMembersData(window.top.document);

	console.log("Exit ExtractData");

	return false; // stop the search!
}


// Extract all data from the clan
function ExtractMembersData(document)
{

	console.log("Enter ExtractMembersData");

	var strClanURL = RetrieveClanURL();
	if (strClanURL == "")
	{
		LogInfo("You must be a member of a clan to be allowed to extract its data!");
		return false;
	}


	var titleNode = document.evaluate("//div[@class='clanBody']/h1/span[@class='txt2img']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (!titleNode)
	{
		LogInfo("Error 'ExtractMembersData' while extracting the markup of the clan name");
		return false;
	}
	var strClan = ExtractTextFromImages(titleNode);
	if (strClan == "")
	{
		LogInfo("Error 'ExtractMembersData' while extracting the clan name");
		return false;
	}
	m_strClanName = strClan;



	m_strResult = "\"Joueurs\";\"Jeux\";\"Données\";\"Valeurs\";\"Equipes\";\"Clans\"\r\n";


	// Extract clan members
	GM_xmlhttpRequest({
		method:"GET",
		url:strClanURL + "/members?sort=names",
		onload:function(response) {
			console.log("Enter Extract Clans Members");

	
			// Create document that you can query.
			var doc = parseHTML(response.responseText);
			if (!doc)
			{
				LogInfo("Error: doc parsing!");
				return;
			
			}
		
			var listMembers = doc.evaluate("//tr", doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (listMembers.snapshotLength == 0)
			{
				LogInfo("Pas de membre trouvé");
				return;
			}
			m_nCount = listMembers.snapshotLength-1;

			var arrMembers = new Array();
			var strPlayerData = "\"\";\"\";\"Meta|Champs|Joueurs\";\"Nom|Url|Equipe|Total Points|Total Missions|Total Attaques|Total Defenses|Clan|NbTotalTrophées|NbTotalTrophéesNiveau-1|NbTotalTrophéesNiveau0|NbTotalTrophéesNiveau1|NbTotalTrophéesNiveau2|NbTotalTrophéesNiveau3|NbTotalTrophéesNiveau4|NbTotalTrophéesNiveau5|NbTotalTrophéesNiveau6|NbTotalTrophéesNiveau7|NbTotalTrophéesNiveau8\"\r\n";
			strPlayerData += "\"\";\"\";\"Meta|Champs|Valeurs\";\"Niveau|Record|Etoile R|Etoile|Evolution=0|Rang=0|Score\"\r\n";
			strPlayerData += "\"\";\"\";\"Meta|Champs|Jeux\";\"Nom|Url|Id|Record|Recordmen\"\r\n";
			strPlayerData += "\"\";\"\";\"Meta|Champs|Clans\";\"Nom|Url|Chef|PositionAttaques|PositionMissions|Date|Base|Nb joueurs|NbTotalTrophées|NbTotalTrophéesNiveau-1|NbTotalTrophéesNiveau0|NbTotalTrophéesNiveau1|NbTotalTrophéesNiveau2|NbTotalTrophéesNiveau3|NbTotalTrophéesNiveau4|NbTotalTrophéesNiveau5|NbTotalTrophéesNiveau6|NbTotalTrophéesNiveau7|NbTotalTrophéesNiveau8\"\r\n";
			strPlayerData += "\"\";\"\";\"Meta|Champs|Global\";\"Nb jeux|Période|JourPériode|DateMiseAJourRecordsSite\"\r\n";
			// should be move elsewhere, with Période, JourPériode and Nb jeux, which are not clan dependend
			strPlayerData += "\"\";\"\";\"DateMiseAJourRecordsSite\";\"" + m_strRecordsLastUpdate + "\";\"\";\"\"\r\n";

			var arrPeriodParameters = new Array(-1, -1);
			if (ExtractPeriode(doc, arrPeriodParameters))
			{
				strPlayerData += "\"\";\"\";\"Période\";\"" + arrPeriodParameters[0] + "\";\"\";\"\"\r\n";
				strPlayerData += "\"\";\"\";\"JourPériode\";\"" + arrPeriodParameters[1] + "\";\"\";\"\"\r\n";
			}
			strPlayerData += "\"\";\"\";\"Nom\";\"" + m_strClanName + "\";\"\";\"" + m_strClanName + "\"\r\n";
			strPlayerData += "\"\";\"\";\"Url\";\"" + strClanURL + "\";\"\";\"" + m_strClanName + "\"\r\n";
			var arrPositionParameters = new Array(-1, -1);
			if (ExtractClanPositions(doc, arrPositionParameters))
			{
				strPlayerData += "\"\";\"\";\"PositionAttaques\";\"" + arrPositionParameters[0] + "\";\"\";\"" + m_strClanName + "\"\r\n";
				strPlayerData += "\"\";\"\";\"PositionMissions\";\"" + arrPositionParameters[1] + "\";\"\";\"" + m_strClanName + "\"\r\n";
			}
			var curTime = new Date();
			strPlayerData += "\"\";\"\";\"Date\";\"" + curTime.getFullYear() + "/" + (curTime.getMonth()+1) + "/" + curTime.getDate() + " " + curTime.getHours() + ":" + curTime.getMinutes() + ":" + curTime.getSeconds() + "\";\"\";\"" + m_strClanName + "\"\r\n";
			strPlayerData += "\"\";\"\";\"Nb joueurs\";\"" + m_nCount + "\";\"\";\"" + m_strClanName + "\"\r\n";
			var arrGameLevels = {}
			for(var i=1; i<listMembers.snapshotLength; i++)
			{
				var trNode = listMembers.snapshotItem(i);
						
				aNode = doc.evaluate("./td[1]/a", trNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if (!aNode)
					continue;

				var chefNode = doc.evaluate("./td[1]/img", trNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if (chefNode)
					strPlayerData += "\"\";\"\";\"Chef\";\"" + aNode.childNodes[0].nodeValue + "\";\"\";\"" + m_strClanName + "\"\r\n";
				strPlayerData += "\"" + aNode.childNodes[0].nodeValue + "\";\"\";\"Nom\";\"" + aNode.childNodes[0].nodeValue + "\";\"\";\"" + m_strClanName + "\"\r\n";
				strPlayerData += "\"" + aNode.childNodes[0].nodeValue + "\";\"\";\"Url\";\"http://www.kadokado.com" + aNode.href + "\";\"\";\"" + m_strClanName + "\"\r\n";
				strPlayerData += "\"" + aNode.childNodes[0].nodeValue + "\";\"\";\"Clan\";\"" + m_strClanName + "\";\"\";\"" + m_strClanName + "\"\r\n";

				var spanNodes = doc.evaluate("./td/span[@class='num2img']", trNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var arrScores = new Array();
				arrScores.push("Total Points");
				arrScores.push("Total Missions");
				arrScores.push("Total Attaques");
				arrScores.push("Total Defenses");

				var score = "";
				for(var j=0; j<spanNodes.snapshotLength; j++)
				{
					var spanNode = spanNodes.snapshotItem(j);

					var imgNodes = doc.evaluate("./img", spanNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					var score = "";
					for(var k=0; k<imgNodes.snapshotLength; k++)
					{
						var imgNode = imgNodes.snapshotItem(k);
						if (imgNode.alt != ".")
							score += imgNode.alt;
					}
					strPlayerData += "\"" + aNode.childNodes[0].nodeValue + "\";\"\";\"" + arrScores[j] + "\";\"" + score + "\";\"\";\"" + m_strClanName + "\"\r\n";
				}

				m_strResult += strPlayerData;
				strPlayerData = "";


				ExtractScores("http://www.kadokado.com" + aNode.href, aNode.childNodes[0].nodeValue, i, arrGameLevels);
						
			}



			console.log("Exit Extract Clans Members");
		},
		onerror: function(response) {
		      alert(
		          [
		            response.status,
		            response.statusText,
		          ].join("\n"));
		}
	});


	console.log("Exit ExtractMembersData");



/*
	var tdNode = document.evaluate("//td[@class='tid_filler'][1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (tdNode)
	{

		var divNode = document.createElement("div");
		divNode.setAttribute("class","prog");
		divNode.setAttribute("style","width: 160px;");
		
		var imgNode = document.createElement("img");
		imgNode.setAttribute("src","http://dat.kadokado.com/gfx/icons/maxiuser_bar_bg_enable.gif");
		imgNode.setAttribute("alt","Progress: ");
		imgNode.setAttribute("width","345px;");
		divNode.appendChild(imgNode);
	
		tdNode.appendChild(divNode);
	}

*/



	return;
}


function ExtractScores(url, playerName, id, arrGameLevels)
{
	console.log("Enter ExtractScores");

	GM_xmlhttpRequest({
	method:"GET",
		url:url + "?sort=game",
		onload:function(response) {
			console.log("Enter Extract Member Data " + url);
			
			// Create document that you can query.
			var doc = parseHTML(response.responseText);
			if (!doc)
			{
				LogInfo("Error: doc parsing!");
				return;
			
			}
					
			var listGames = doc.evaluate("//div[@class='content']//tr", doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (listGames.snapshotLength == 0)
			{
				//alert("Pas de jeu trouvé"); // semble pas possible: toujours une ligne au moins, même en début de période
				return;
			}


			var myString = "";
			for(var i=1; i<listGames.snapshotLength; i++)
			{
				var trGame = listGames.snapshotItem(i);
				//console.log(trGame);


				// Niveau
				/*var imgNode = doc.evaluate("./td[1]/a/span/img", trGame, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if (!imgNode)
				{
					//alert("Période: Pas de Niveau trouvé" + playerName); // possible en début de période
					continue;
				}*/
									

				// Etoile
				var etoileNode = doc.evaluate("./td[3]/img", trGame, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if (!etoileNode)
				{
					//alert("Période: Pas de Etoile trouvée" + playerName); // possible en début de période
					continue;
				}

				// Jeu
				var aNode = doc.evaluate("./td[3]/a", trGame, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if (!aNode)
				{
					LogInfo("Période: Pas de Jeu trouvé" + playerName);
					continue;
				}
				var strGame = aNode.childNodes[0].nodeValue;

				//myString += "\"" + playerName + "\";\"" + strGame + "\";\"Niveau\";\"" + ConvertLevelNameToLevelValue(imgNode.alt) + "\";\"\";\"" + m_strClanName + "\"\r\n";
				myString += "\"" + playerName + "\";\"" + strGame + "\";\"Etoile\";\"" + ConvertStarNameToStarValue(etoileNode.alt) + "\";\"\";\"" + m_strClanName + "\"\r\n";

				// Score
				listCols = doc.evaluate("./td[4]/a/span[@class='num2img']/img", trGame, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if (listCols.snapshotLength == 0)
				{
					LogInfo("Pas de Score trouvé" + playerName);
					continue;
				}
				var score = "";
				for(var j=0; j<listCols.snapshotLength; j++)
				{
					var imgNode = listCols.snapshotItem(j);
					if (imgNode.alt != ".")
						score += imgNode.alt;
				}
				myString += "\"" + playerName + "\";\"" + strGame + "\";\"Score\";\"" + score + "\";\"\";\"" + m_strClanName + "\"\r\n";

			}
			m_strResult += myString;
			
			console.log("Exit Extract Member Data " + url);


			ExtractRecords(url + "/starCompletion", playerName, id, arrGameLevels);
		}
	});
	console.log("Exit ExtractScores");
}



function ExtractHistory()
{
	console.log("Enter ExtractHistory");

	var strClanURL = RetrieveClanURL();
	if (strClanURL == "")
	{
		LogInfo("You must be member of the clan to be allowed to extract its data!");
		return false;
	}


	var titleNode = document.evaluate("//div[@class='clanBody']/h1/span[@class='txt2img']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (!titleNode)
	{
		LogInfo("Error 'ExtractHistory' while extracting the markup of the clan name");
		return false;
	}
	var strClan = ExtractTextFromImages(titleNode);
	if (strClan == "")
	{
		LogInfo("Error 'ExtractHistory' while extracting the clan name");
		return false;
	}
	//m_strClanName = strClan;


	if (!confirm("Ceci va lancer l'extraction de l'historique du clan '" + strClan + "'\net proposera de télécharger le fichier de résultat.\n\nVoulez-vous continuer ?"))
		return false;


	InitDates();


	// Extract the number of pages
	var aNode = document.evaluate("//div[@class='actions']/ul/li[3]/a", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (!aNode)
	{
		LogInfo("Error 'ExtractHistory' while extracting the user page");
		return false;
	}
	var strUserPage = aNode.getAttribute("href") + "/starCompletion";



	var arrPeriodParameters = new Array(-1, -1);
	ExtractPeriode(document, arrPeriodParameters);

	m_strResult += "\"" + arrPeriodParameters[0] + "\";\"Date\";\"Type\";\"Joueur\";\"Clan\";\"Jeu\";\"Score\";\"Statut\";\"Points\";\"Defenseur\";\"Joueur URL\";\"Clan URL\";\"Defenseur URL\";\"Alertes\"\r\n";



	var strDate = m_currentDay.toString() + "/" + m_currentMonth.toString() + "/" + m_currentYear.toString() + " " + m_currentDate.getHours() + ":" + m_currentDate.getMinutes();

	GM_xmlhttpRequest({
	method:"GET",
		url:strUserPage,
		onload:function(response) {
			console.log("Enter Extract Games " + strUserPage);
			
			// Create document that you can query.
			var doc = parseHTML(response.responseText);
			if (!doc)
			{
				LogInfo("Error: doc parsing!");
				return;
			
			}
					
			var listGames = doc.evaluate("//table/tbody/tr/td[2]/a", doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (listGames.snapshotLength == 0)
			{
				alert("Pas de jeu trouvé");
				return;
			}


			for(var i=1; i<listGames.snapshotLength; i++)
			{
				var aGame = listGames.snapshotItem(i);

				var strGame = aGame.childNodes[0].nodeValue;
				var strGameURL = aGame.getAttribute("href");

				m_strResult += "\"\";\"" + strDate + "\";\"0\";\"\";\"\";\"" + strGame + "\";\"0\";\"-1\";\"0\";\"\";\"\";\"\";\"http://www.kadokado.com" + strGameURL + "\"\r\n";
			}
			


			// Extract clan members
			GM_xmlhttpRequest({
				method:"GET",
				url:strClanURL + "/members?sort=names",
				onload:function(response) {
					console.log("Enter Extract Clans Members");

	
					// Create document that you can query.
					var doc = parseHTML(response.responseText);
					if (!doc)
					{
						LogInfo("Error: doc parsing!");
						return;
					
					}
				
					var listMembers = doc.evaluate("//tr", doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					if (listMembers.snapshotLength == 0)
					{
						LogInfo("Pas de membre trouvé");
						return;
					}
					for(var i=1; i<listMembers.snapshotLength; i++)
					{
						var trNode = listMembers.snapshotItem(i);
								
						aNode = doc.evaluate("./td[1]/a", trNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
						if (!aNode)
							continue;
		
						m_strResult += "\"\";\"" + strDate + "\";\"0\";\"" + aNode.childNodes[0].nodeValue + "\";\"\";\"\";\"0\";\"-1\";\"0\";\"http://www.kadokado.com" + aNode.href + "\";\"\";\"\";\"\"\r\n";
					}
		
				
		
					ExtractHistoryPage(document.location.href);
		
		
		
		
					console.log("Exit Extract Clans Members");
				},
				onerror: function(response) {
				      alert(
				          [
				            response.status,
				            response.statusText,
				          ].join("\n"));
				}
			});



			console.log("Exit Extract Games  " + strUserPage);
		}
	});



	console.log("Exit ExtractHistory");

	return true;

}


var m_currentDate;
var m_currentYear = 0;
var m_currentMonth = 0;
var m_currentDay = 0;
function InitDates()
{
	m_currentDate = new Date();
	m_currentYear = m_currentDate.getFullYear();
	m_currentMonth = m_currentDate.getMonth()+1;
	m_currentDay = m_currentDate.getDate();
}

function ExtractHistoryPage(url)
{
	console.log("Enter ExtractHistoryPage");

	GM_xmlhttpRequest({
	method:"GET",
		url:url,
		onload:function(response) {
			console.log("Enter Extract History Page " + url);
			
			// Create document that you can query.
			var doc = parseHTML(response.responseText);
			if (!doc)
			{
				LogInfo("Error: doc parsing!");
				return;
			
			}
			

			var trNodes = doc.evaluate("//table/tbody/tr", doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (trNodes.snapshotLength == 0)
			{
				//LogInfo("Pas d'historique trouvé");
				//continue;
			}
			for(var i=0; i<trNodes.snapshotLength; i++)
			{
				var trNode = trNodes.snapshotItem(i);
				//console.log(trNode);


				var strDate = "";
				var lType = 0;
				var strPlayerName = "";
				var strPlayerURL = "";
				var strClanName = "";
				var strClanURL = "";
				var strGameName = "";
				var lScore = 0;
				var strDefenderName = "";
				var strDefenderURL = "";
				var lPoints = 0;
				var bStatus = false;


				// Data
				var tdNodes = doc.evaluate("./td", trNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if (tdNodes.snapshotLength == 0)
				{
					LogInfo("Pas de colonne trouvée " + i);
					continue;
				}
				for(var j=0; j<tdNodes.snapshotLength; j++)
				{
					var tdNode = tdNodes.snapshotItem(j);

					// columns
					switch(j)
					{
						case 0: // Date
						var strDate = tdNode.childNodes[0].nodeValue;
						var lPos = strDate.indexOf(" ");
						if (lPos != -1)
						{
							var nDay = parseInt(strDate.substr(lPos-2, 2));
							var strHour = strDate.substr(lPos+1);

							var nMonth = m_currentMonth;
							var nYear = m_currentYear;
							if (nDay > m_currentDay)
							{
								nMonth = (nMonth-1) % 12;
								if (nMonth <= 0)
								{
									nMonth += 12
									nYear -= 1;
								}

								// Update current values to avoid useless computations
								m_currentDay = nDay;
								m_currentMonth = nMonth;
								m_currentYear = nYear;
							}

							strDate = nDay.toString() + "/" + nMonth.toString() + "/" + nYear.toString() + " " + strHour;
						}
						break;
	
						case 1: // Type
						var imgNode = doc.evaluate("./img", tdNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
						if (imgNode)
						{
							lType = 2;
							var strIcon = imgNode.getAttribute("src");
							if (strIcon.slice(-13) == "/atksmall.gif")
								lType = 3;
							else if (strIcon.slice(-10) == "/sgame.gif")
								lType = 1;
						}
						break;

						case 2: // Player
						var aNode = doc.evaluate("./a", tdNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
						if (aNode)
						{
							strPlayerName = aNode.childNodes[0].nodeValue;
							strPlayerURL = "http://www.kadokado.com" + aNode.getAttribute("href");
						}
						else
						{
							lType = 4;
						}
						break;

						case 3: // Clan / Mission
						var childNode = doc.evaluate("*[1]", tdNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
						if (childNode)
						{
							if (childNode.nodeName == "STRONG")
							{
								// Mission
								strClanName = childNode.childNodes[0].nodeValue;
							}
							else
							{
								// A / D
								var aNode = doc.evaluate("./a", childNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
								if (aNode)
								{
									strClanName = aNode.childNodes[0].nodeValue;
									strClanURL = "http://www.kadokado.com" + aNode.getAttribute("href");
								}
							}
						}
						break;

						case 4: // Game
						var gameNode = doc.evaluate("./span", tdNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
						if (gameNode)
						{
							strGameName = gameNode.childNodes[0].nodeValue;
						}
						break;

						case 5: // Score
						var scoreNode = doc.evaluate("./span", tdNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
						if (scoreNode)
						{
							lScore = parseInt(scoreNode.childNodes[0].nodeValue);
						}
						break;

						case 6: // Status
						if (tdNode.childNodes.length > 1)
						{
							var aNode = doc.evaluate("./a", tdNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
							if (aNode)
							{
								strDefenderName = aNode.childNodes[0].nodeValue;
								strDefenderURL = "http://www.kadokado.com" + aNode.getAttribute("href");
							}
						}
						break;

						case 7: // Points
						if (tdNode.hasChildNodes)
						{
							var imgNode = doc.evaluate("./img", tdNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
							if (imgNode)
							{
								var strIcon = imgNode.getAttribute("src");
								var bNegative = strIcon.indexOf("/moins.gif") != -1;

								var spanNodes = doc.evaluate("./span[@class='num2img']/img", tdNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
								if (spanNodes.snapshotLength == 0)
								{
									LogInfo("Pas de Points trouvé ");
									continue;
								}
								var strPoints = "";
								for(var k=0; k<spanNodes.snapshotLength; k++)
								{
									var imgNode = spanNodes.snapshotItem(k);
									if (imgNode.alt != ".")
										strPoints += imgNode.alt;
								}
								lPoints = parseInt(strPoints);
								if (bNegative)
									lPoints = -lPoints;
							}
						}

						bStatus = !((lType <= 2 && lPoints < 0) || (lType > 2 && lPoints <= 0));


						// Check alliances too

						break;
					}

				}

				m_strResult += "\"\";\"" + strDate + "\";\"" + lType.toString() + "\";\"" + strPlayerName + "\";\"" + strClanName + "\";\"" + strGameName + "\";\"" + lScore.toString() + "\";\"" + (bStatus?1:0) + "\";\"" + lPoints.toString() + "\";\"" + strDefenderName + "\";\"" + strPlayerURL + "\";\"" + strClanURL + "\";\"" + strDefenderURL + "\";\"Alertes\"\r\n";

			}


			var nextNode = doc.evaluate("(//li[@class='next'])[1]/a", doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			if (nextNode)
			{
				//alert(nextNode);
				
				var strNextPage = nextNode.getAttribute("href");
				ExtractHistoryPage(strNextPage);
			}
			else
			{
				//LogInfo("Error 'ExtractHistory' while extracting the next page or end of process");
			
				//return true;

				window.open(dataURI(m_strResult));

			}


			console.log("Exit Extract History Page " + url);

		}
	});

	console.log("Exit ExtractHistoryPage");
}


function dataURI(s)
{
	return 'data:text/csv,' + escape(s);
}


var m_arrGames = new Array();

function ExtractRecords(url, playerName, id, arrGameLevels)
{
	console.log("Enter ExtractRecords");
	GM_xmlhttpRequest({
		method:"GET",
		url:url + "?sort=name",
		onload:function(response) {
			console.log("Enter Extract Member Record Data " + url);
				
			// Create document that you can query.
			var doc = parseHTML(response.responseText);
			if (!doc)
			{
				LogInfo("Error: doc parsing!");
				return;
								
			}

					
			var listGames = doc.evaluate("//tr", doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (listGames.snapshotLength == 0)
			{
				LogInfo("Pas de jeu trouvé");
				return;
			}


			var myString = "";
			var arrPlayerLevels = {}
			for(var i=-1; i<9; i++)
				arrPlayerLevels[i] = 0;
			var nCount = 0;
			for(var j in arrGameLevels)
				nCount++;
			for(var i=1; i<listGames.snapshotLength; i++)
			{
				var trGame = listGames.snapshotItem(i);
				//console.log(trGame);


				// Jeu
				var aNode = doc.evaluate("./td[2]/a", trGame, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if (!aNode)
				{
					LogInfo("Pas de Jeu trouvé " + playerName); // gros problème
					continue;
				}
									
				var strGame = aNode.childNodes[0].nodeValue;
				if (arrGameLevels[strGame] == undefined)
				{
					arrGameLevels[strGame] = {};
					for(var j=-1; j<9; j++)
						arrGameLevels[strGame][j.toString()] = 0;
					nCount = 1;
				}


				if (id == 1)
				{
					if (i == 1)
						myString += "\"\";\"\";\"Nb jeux\";\"" + (listGames.snapshotLength-1) + "\";\"\";\"\"\r\n";
					myString += "\"\";\"" + strGame + "\";\"Nom\";\"" + strGame + "\";\"\";\"\"\r\n";
					myString += "\"\";\"" + strGame + "\";\"Url\";\"http://www.kadokado.com" + aNode.href + "\";\"\";\"\"\r\n";
					myString += "\"\";\"" + strGame + "\";\"Id\";\"" + "0" + "\";\"\";\"\"\r\n";

					// Records absolus et recordmen :)
					var strRecordData = m_arrRecords[ComputeGameSimplifiedName(strGame)];
					if (strRecordData != undefined)
					{
						var nIndex = strRecordData.indexOf("|");
						if (nIndex != -1)
						{
							myString += "\"\";\"" + strGame + "\";\"Record\";\"" + strRecordData.substring(0, nIndex) + "\";\"\";\"\"\r\n";
							myString += "\"\";\"" + strGame + "\";\"Recordmen\";\"" + strRecordData.substring(nIndex+1) + "\";\"\";\"\"\r\n";
						}
					}
					else
						console.log("Warning: game not found after simplification for record extraction");

					// Simplify game name
					//m_arrGames[ComputeGameSimplifiedName(strGame)] = strGame;
				}

				// Niveau
				var imgNode = doc.evaluate("./td[1]/span[1]/img", trGame, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				var nValueNiveau = 0;
				if (imgNode)
				{
					var nLevel = ConvertLevelNameToLevelValue(imgNode.alt);
					nValueNiveau = nLevel;

					// cumuls
					arrPlayerLevels[nLevel.toString()] ++;
					arrGameLevels[strGame][nLevel.toString()] ++;
				}
				else
				{
					console.log("Pas de Niveau trouvé " + playerName + " " + strGame);
					//continue;
										
					arrPlayerLevels["-1"] ++;
				}

				// Etoile R
				var etoileNode = doc.evaluate("./td[3]/img", trGame, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				var nValueEtoileR = 0;
				if (etoileNode)
				{
					nValueEtoileR = ConvertStarNameToStarValue(etoileNode.alt);
				}
				else
				{
					console.log("Pas de Etoile R trouvée " + playerName + " " + strGame);
					//continue;
				}
									
				// Record
				var listCols = doc.evaluate("./td[3]/span[@class='num2img']/img", trGame, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if (listCols.snapshotLength == 0)
				{
					console.log("Pas de Record trouvé " + playerName + " " + strGame);
					//continue;
				}
				var record = "";
				for(var j=0; j<listCols.snapshotLength; j++)
				{
					var imgNode = listCols.snapshotItem(j);
					if (imgNode.alt != ".")
						record += imgNode.alt;
				}
				if (record == "")
				{
					// jeu jamais joué : corriger le record, le niveau et l'étoile R
					record = "0";
					nValueNiveau = -1;
					nValueEtoileR = -1;
				}
				myString += "\"" + playerName + "\";\"" + strGame + "\";\"Niveau\";\"" + nValueNiveau + "\";\"\";\"" + m_strClanName + "\"\r\n";
				myString += "\"" + playerName + "\";\"" + strGame + "\";\"Etoile R\";\"" + nValueEtoileR + "\";\"\";\"" + m_strClanName + "\"\r\n";
				myString += "\"" + playerName + "\";\"" + strGame + "\";\"Record\";\"" + record + "\";\"\";\"" + m_strClanName + "\"\r\n";

			}

								
			var nCount = 0;
			for(var i=-1; i<9; i++)
			{
				myString += "\"" + playerName + "\";\"\";\"NbTotalTrophéesNiveau" + i + "\";\"" + arrPlayerLevels[i] + "\";\"\";\"" + m_strClanName + "\"\r\n";
									
				if (i != -1)
					nCount += arrPlayerLevels[i];
			}
			myString += "\"" + playerName + "\";\"\";\"NbTotalTrophées\";\"" + nCount + "\";\"\";\"" + m_strClanName + "\"\r\n";
			m_strResult += myString;

			console.log("Exit Extract Member Record Data " + url);


			m_nCount--;
			console.log(m_nCount);
			if (m_nCount == 0)
			{
				// cumuls du clan
				myString = ""
				for(var i in arrGameLevels)
				{
					nCount = 0;
					var subArray = arrGameLevels[i];
					for(var j=-1; j<9; j++)
					{
						myString += "\"\";\"" + i + "\";\"NbTotalTrophéesNiveau" + j + "\";\"" + subArray[j.toString()] + "\";\"\";\"" + m_strClanName + "\"\r\n";
											
						if (j != -1)
							nCount += subArray[j];
					}
					myString += "\"\";\"" + i + "\";\"NbTotalTrophées\";\"" + nCount + "\";\"\";\"" + m_strClanName + "\"\r\n";
				}
				m_strResult += myString;



				//document.write('<a href="' + dataURI(m_strResult) + '">open</a>');
				window.open(dataURI(m_strResult));
			}
		}
	});
	console.log("Exit ExtractRecords");
}


function LogInfo(myString)
{
	alert(myString);
}


// Creates a document that can be queried with DOM methods.
// Made by sizzlemctwizzle (http://userscripts.org/users/27715)
//////////////////////////////////////////////////////////////////
function parseHTML(text) {
	var dt = document.implementation.createDocumentType('html', '-//W3C//DTD HTML 4.01 Transitional//EN', 'http://www.w3.org/TR/html4/loose.dtd'),
		doc = document.implementation.createDocument('', '', dt),
		html = doc.createElement('html'),
		head = doc.createElement('head'),
		body = doc.createElement('body');

	if (!doc || !html || !body)
		return null;

	doc.appendChild(html);
	html.appendChild(head);
	body.innerHTML = text;
	html.appendChild(body);

	return doc;
}
//////////////////////////////////////////////////////////////////


function ExtractTextFromImages(parentNode)
{
	if (!parentNode || parentNode.getAttribute("class").indexOf("2img") == -1)
		return "";

	var strText = "";
	for(var i=0; i<parentNode.childNodes.length; i++)
	{
		var imgNode = parentNode.childNodes[i];

		var strAttr = imgNode.getAttribute("alt");
		if (strAttr != ".")
			strText += strAttr;
	}

	return strText;
}


function ConvertStarNameToStarValue(strStarName)
{
	var nStar = -1;

	var strFirstLetter = strStarName.substring(0,1).toLowerCase();
	switch(strFirstLetter)
	{
        	case "r":
			nStar = 3;
			break;

	        case "o":
			nStar = 2;
			break;

		case "g":
			nStar = 1;
			break;

		case "n":
			nStar = 0;
			break;
	};

	return nStar;
}

function ConvertLevelNameToLevelValue(strLevelName)
{
	var nLevel = -1;

	var nPos = strLevelName.indexOf(" ");
	if (nPos > 0)
		nLevel = parseInt(strLevelName.substring(nPos+1), 10);

	if (nLevel >= 0)
		nLevel = 8 - nLevel;

	return nLevel;		
}

function ExtractPeriode(doc, arrPeriodParameters)
{
	arrPeriodParameters[0] = -1;
	arrPeriodParameters[1] = -1;
	var divNode = doc.evaluate("//div[@class='kalendar']/div", doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (!divNode)
		return false;

	var regex = new RegExp("[^0-9]*([0-9]*)[^0-9]*([0-9]*)");
	var arrResults = regex.exec(divNode.childNodes[0].nodeValue);
	if (arrResults.length != 3)
		return false;
	arrPeriodParameters[0] = arrResults[1];
	arrPeriodParameters[1] = arrResults[2];
	return true;
}

function ExtractClanPositions(doc, arrPositionParameters)
{
	arrPositionParameters[0] = -1;
	arrPositionParameters[1] = -1;
	var listLiNodes = doc.evaluate("//ul[@class='statClan']/li[@class='rank']", doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (listLiNodes.snapshotLength != 2)
		return false;

	for(var i=0; i<listLiNodes.snapshotLength; i++)
	{
		var liNode = listLiNodes.snapshotItem(i);

		// Rank
		var listCols = doc.evaluate("./span[@class='num2img']/img", liNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (listCols.snapshotLength == 0)
		{
			console.log("Pas de Rank trouvé ");
			//continue;
		}
		var rank = "";
		for(var j=0; j<listCols.snapshotLength; j++)
		{
			var imgNode = listCols.snapshotItem(j);
			if (imgNode.alt != ".")
				rank += imgNode.alt;
		}
		arrPositionParameters[i] = rank;
	}

	return true;
}

function ComputeGameSimplifiedName(strGameName)
{
	strGameName = strGameName.toLowerCase();

	var strSimplifiedName = ""
	for(var i=0; i<strGameName.length; i++)
	{
		var c = strGameName[i];
		switch(c)
		{
			case 'é':
			strSimplifiedName += 'e';
			break;

			case 'ï':
			strSimplifiedName += 'i';
			break;
			
			case ' ':
			case '!':
			case '-':
			case '\'':
			case '/':
			break;

			default:
			strSimplifiedName += c;
		}
	}

	return strSimplifiedName.substring(0, 7);
}
