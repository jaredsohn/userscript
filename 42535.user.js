// ==UserScript==
// @name           Quick Travian Tractor
// @namespace      QTT
// @version        1.7.1
// @description    Adds a link to the battle reports page that will submit the report to www.traviantractor.com. (v1.7.0 September 16th, 2009)  
// @include        http://*.travian.*/a2b.php
// @include        http://*.travian.*/*.php* 
// @include        http://www.traviantractor.com/index.php/me*
// @include        http://travian-reports.net/*
// ==/UserScript==

// Notes: This script reuses some code from Travian Beyond. As such, I attempted to make it play nicely with Travian Beyond. However,
//        because Travian Beyond modifies the battle report table, QTT might not work properly with it. Too ensure proper functionality 
//        place QTT above Travian Beyond (or similar travian scripts) in the Greasemonkey list. I only make changes to berichte.php, 
//        adding a link to submit the BR to the tractor. If you are using Travian Beyond, you DO NOT have to select the 
//        "Show original report (for posting):" checkbox. 

// Main function executed when the whole page is loaded
function quickTravianTractorMain(e) {
	var boolIsT35 = false;
	var dTop5 = 'ltop5';										// used to determine if on T35
	var dmid1 = 'lmid1';
	var dmid2 = 'lmid2';
	var gBattleReportText = "test";

	var QTT = new Object();
	QTT.version = '1.7.1';
	QTT.usBaseLink = 'http://userscripts.org/scripts/';
	QTT.usScriptNo = '42535';
	QTT.url = QTT.usBaseLink + 'source/' + QTT.usScriptNo + '.user.js';
	
	/*** USER SETTABLE VARIABLES START HERE ***/
	var showTractorLink = true;                                 // set to false to remove this link from the page
	var showTravilogLink = true;                                // set to false to remove this link (and checkboxes) from the page
	var waitTime = 200;                                         // miliseconds to wait for each check. Decrease this value to slow down checks
	var timeOutValue = 48;      // [ALTER TO CHANGE TIMEOUT]    // Total time to wait = waitTime * timeOutValue.
	/*** USER SETTABLE VARIABLES END HERE ***/

	var timeOutCount = 0;                                       // when timeOutCount > timeOutValue, stop checking and report timeOut
	var timer;                                                  // timer for processing check
	
	var attacker;                                               // name of attacking player
	var defender;                                               // name of defending player
	var attVillage;                                             // village attacks came from
	var defVillage;                                             // village defending

	var XPFirst   = XPathResult.FIRST_ORDERED_NODE_TYPE;        // Constant that returns the first element by XPath
	var XPList    = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;   // Constant that returns a list of elements by XPath
	var XPIterate = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;   // Constant returns an iterator of elements by XPath
	
	var logLevel = 0;                                           // amount of logging information to send to console. 0 disables logging.
	var imgPrefixPNG = 'data:image/png;base64,';
	
	var checkBoxIMG=imgPrefixPNG +"iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALuUExURXnJARBnIf7%2B%2FgBSHW3AADqOFKe0rA9pF%2BPy0F2vCRduHgphI%2FX09TGGFyh%2BGXPGAPv7%2B%2Bf010yfDyB2HEOXEXfCFu3s7i%2BJBgpfL%2BXy1zGGFid9GMHQvgxeLCF6ElePbwBTHzqKIQNcHARcJHTAFu%2Fu8HTAF93b3WCmNma3B7q5uih9GTCKCHbHBcrbtQNZJp67nDOKC3rLALzCs%2FX19f39%2FXDCAHOuRzCGFuDf4QBVIXO9IZKsnnXKAOvm6nLDAs7PzhxzGABVIHSsU63KlP%2F%2B%2F9vZ3Ovs6nHGAPv1%2BcbgtDWMDvDv8KiwpLrHp%2FHs83LIAEmeCqaupG%2FCABttMgBYJm3CAHTBFqzIpApiIrnGvjyUB47IPyh%2BGiiCDb7Yr2qiWrDTgZq2f8%2FdycLHxLO6tgpkG57GZgRbJdDRzgBSHHrMAF6sGe%2Fu7nrLAR94EPDw8AJbIme8ANvqz3XDDefw4WKQdtPdxnjHBVWoDEWcBubh57rXkHHCBUKXEB92HAlhIgBZJVWnDJKwnjqPFBdvH2m8AmK2Au3o7lWnDWzAAPPy8wBUIBlyFleeNwVbKESXEgZfJ1muAFitAp%2B7noK%2BPbTLlu7w7njIAbO8twBUGhZnODGFF3fKAMjUuQBQG1esASRvRPz7%2FABSG8bRyzyTB0KBXP7%2B%2F8PRxxFqGIOghSl%2BGkSEUKbSZOLh4lGmBYqqmavVbC6EExttKrrJvCB2HQlfHzF9N0B9WWiqQQBXJJ27qGy9A%2F35%2F2q8Aerr6nrKAGO2A%2FPz8xt1F9za3XC8GQBaGQFZJnvEIb%2FIs5u5oefl6WOUePn0%2B8nPwunn6Lm4uQBYJcfGx261JEycHYjLJ%2B%2F26hBoIXfIAGyafzKGFxhuHwBOF2a2Bx91HIOokHrKAXDFACN7FFmXTkufDbjDpyh6Ja%2FLjLfIvOjj6AxlHkWdBMbFxxhuHvny9%2B7t7WKuHQNcJeTy14DOCwxlHR9rOVOpBnzFGv%2F%2F%2F%2F%2F%2F%2Fzz19p8AAAD6dFJOU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwDeYEUjAAABWUlEQVR42mL4CQRM%2B1%2FcP3Ozecl7JhCPAYgLDLanHZu1mLl%2FR1Q3RGh6Qn4vFyO38vFdzLIbckFCh5x1LGLr3zJGZlwMtdK38fnJsNzldR2rFN89oLpCZgWn2SmLGNwvrxcSaeHVFr79Zdtu%2BflZZecZ9No5OwOXevOudlx56p3nsjsLHRgSizQXfPDaKb7p0ZSXdiu%2B9kjMZFgb1mYt%2BeOahnhER%2FWWzUofG9kYNgYEnxD88aM0%2Fqy%2FzDP26w0T2RhqbBlYwjl%2B%2FHDdm6wot7X1VUgqQ3nFAYYuNaBY8RXDW3zC7GsuMYjFPDRiYFER%2FJRTNYF1jvThVeoMTPNK%2BPMYWESPTq4UEmGNe3zBhOEnz%2FNa%2FgczzPbd5Wx6Et0XtO4H0Nti0757zL1hv%2BfgpG%2Fmvm4C4MBRPZd%2B9XO2rujUJC1LU0h4%2FRQ4nXnS76nxmyM8P4A8gAADAI84pITkrAUnAAAAAElFTkSuQmCC";
	var blankIMG = imgPrefixPNG + "iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAGUExURf%2F%2F%2FwAAAFXC034AAAAQSURBVHjaYmAYBdQHAAEGAAFWAAH8aWaTAAAAAElFTkSuQmCC";
	var qMarkIMG = imgPrefixPNG + "iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI9UExURY2KAI2LAPz8%2FPf39%2Fr6%2BrGvAI%2BNAM3MAKCeAPn5%2BcbEAJORANbVAPz8ALq5ANfX15OQAI6LAOLi4vLy8uDg4MPCANTU1KimALq4AJmXAKCdAN%2FfAOnoAPDvANPT0%2F39ANvb25iYBKWkQ5WTEOvqnKKkKKuuOObo1dnZ1paUEqinAP39%2FamoXuPjKdHRuMLEFaqpQbi7guXldrSyGuzrQqakQe%2Fv3fPyD7S1qPf3AOfnANLWnevtBaOhKfLy3ZGPAM%2FNAPHx7pmXDc7PB%2BXlM7W2p%2Fr6q%2Bjoz5OTBKuqZMHAS8%2FUWLS4U77Dh9rduv7%2BAO%2FvANvetd7dhMHGnKmoANzcwLOwANvdRMzSRefpKcDFUuDgINXaPPLysNXV1fb3Afb2Bbm4AMLBIuPm0dvet56cDfb2Bs7Rrc7Sr5CNAqOiKbW5UOjo6MXFxfb29tnZ09bcKbzChMLGl6WjH8bGxrSzWuzr36WmGrG3XaywRKerNrK4cOTiAO7u7t%2FfXczLRvDvV%2BHhP66tQby7b6yvGMPJivr62pmWAK60dMXMZr28T%2FPzQZWWB5KRAPb2ANPSH8zRnMLBfZeWE52bKfT09P7%2B%2FtfXBNTUubSzNZ%2BdD%2Fv7%2B%2BbnQsbGlbW4G%2FX0VbG0bPHw3qKgK%2Fn559LSivDvKNbW1tnXAPT0CvDx7cbMOvz88fX19ZiWALvAYePjwsG%2FSaqoDcrKmMPDAvn5wcTDA%2Fn4ALCvT6%2B0ceLgAObpCvz89I6MAP%2F%2FAP%2F%2F%2F%2F%2F%2F%2F7PRne4AAAC%2FdFJOU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8ARW6EOQAAAUdJREFUeNos0FN3A1EUBeATJ02qVGnSNLVt27Zt27Zt27bu3PltnWm61zoP53vbG0gqzLLpTLfdWN9gTH9AXWlO6JeB3JsozKsSKClhXyVoI2xotiiR%2BB5n0WQ5liF5G8ifeD2oUCX8UtkkMGulNpwUTCfiUpVoasSQbHzHf8R4Lf0EYxdPhaJZC%2B7RvP4Mk733Yobxw%2FACkaUNIwwkLP9odx28wTunuUnv2ergjhBXqM%2BP%2BcHMzUWZj%2FxMF5w0EUIa2wHY1qGEJ5IZ2BtCHIMibkgkq25LTYcn6rs%2Bh6VA2qpHn5efOJRd9Irhqgcosj7CHa16HImKo9ct4Mo5ykw91vuP%2BXqc4ikjDCQ7Pgo0kUm03cqkNK2rnk3XZrWYc4GBGKDR%2BdnGUo4jsHLurln1tzgMN%2FofhySxlra6rmGBuOFvwl8BBgBQd4W2BO6PHAAAAABJRU5ErkJggg%3D%3D";

	var docDir = ['left', 'right'];
	var acss = "";
	acss += "table.tb3tb 	{width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:white; padding:2px; margin:1px;}";
	acss += "tr.cbgx td, td.cbgx {background-color:#FFFFC0; border:1px solid silver; text-align:center;}";
	acss += "table.tb3tb tr td {border:1px solid silver;}";
	acss += "table.tb3tbnb 	{border-collapse:collapse; border:0px none white; font-size:8pt; text-align:center; padding:2px; margin:1px;}";
	acss += "table.tb3tbnb tr td {border:0px none white;}";
	acss += "tr.tb3rh		{background-color:#ECECEC; text-align:center; border:1px solid silver;}";
	acss += "tr.tb3rhb		{background-color:#ECECEC; text-align:center; border:1px solid silver; font-weight:bold;}";
	acss += "tr.tb3rhnb		{background-color:#ECECEC; text-align:center;}";
	acss += "tr.tb3r 		{border-collapse:collapse; border:1px solid silver; text-align:center;}";
	acss += "tr.tb3rnb 		{border-collapse:collapse; border:0px none white; text-align:center; white-space:nowrap;}";
	acss += "td.tb3chbb 	{border:1px solid silver; background-color:#ECECEC; padding:2px; font-weight:bold; font-size:10pt;}";
	acss += "td.tb3chb		{border:1px solid silver; background-color:#ECECEC; padding:2px; font-weight:bold;}";
	acss += "td.tb3ch		{border:1px solid silver; background-color:#ECECEC; padding:2px;}";
	acss += "td.tb3chnb		{border:0px none white; background-color:#ECECEC; padding:2px; text-align:center;}";
	acss += "td.tb3c		{border:1px solid silver; background-color:white; padding:2px;}";
	acss += "td.tb3cnb		{border:0px none white; text-align:center; padding:2px;}";
	acss += "td.tb3cbt		{border-top:1px solid silver; font-size:8pt; color:#000000; text-align:center;}";

	
/**************************/
/***  Helper functions  ***/
/**************************/

	function find(xpath, xpres, startnode){
		if (!startnode) {startnode = document;}
		var ret = document.evaluate(xpath, startnode, null, xpres, null);
		return  xpres == XPFirst ? ret.singleNodeValue : ret;
	}
	
	/**
	 * Create a new element
	 * Params:	tag	Type of the element
	 *		content innerHTML (content)
	 * Returns:	a reference to the new created element
	 */
	function elem(tag, aContent){
		var ret = document.createElement(tag);
		if (aContent != undefined)
			ret.innerHTML = aContent;
		return ret;
	}

	function newImage(cAttribute) {
		var aImg = document.createElement("IMG");
		if (cAttribute != undefined) {
			for (var xi = 0; xi < cAttribute.length; xi++) {
				aImg.setAttribute(cAttribute[xi][0], cAttribute[xi][1]);
				if (cAttribute[xi][0].toUpperCase() == 'TITLE') {
					aImg.setAttribute('alt', cAttribute[xi][1]);
				}
			}
		}
		return aImg;
	}

	function newTable(cAttribute) {
		var aTable = document.createElement("TABLE");
		if (cAttribute != undefined) {
			for (var xi = 0; xi < cAttribute.length; xi++) {
				aTable.setAttribute(cAttribute[xi][0], cAttribute[xi][1]);
			}
		}
		return aTable;
	}
	
	function newRow(iHTML, cAttribute) {
		var aRow = document.createElement("TR");
		aRow.innerHTML = iHTML;
		if (cAttribute != undefined) {
			for (var xi = 0; xi < cAttribute.length; xi++) {
				aRow.setAttribute(cAttribute[xi][0], cAttribute[xi][1]);
				if (cAttribute[xi][0].toUpperCase() == 'TITLE') {
					aRow.setAttribute('alt', cAttribute[xi][1]);
				}
			}
		}
		return aRow;
	}
	
	function newCell(iHTML, cAttribute) {
		var aCell = document.createElement("TD");
		aCell.innerHTML = iHTML;
		if (cAttribute != undefined) {
			for (var xi = 0; xi < cAttribute.length; xi++) {
				aCell.setAttribute(cAttribute[xi][0], cAttribute[xi][1]);
				if (cAttribute[xi][0].toUpperCase() == 'TITLE') {
					aCell.setAttribute('alt', cAttribute[xi][1]);
				}
			}
		}
		return aCell;
	}

	function newLink(iHTML, cAttribute) {
		var aLink = document.createElement("A");
		aLink.innerHTML = iHTML;
		addAttributes(aLink, cAttribute);
		return aLink;
	}

	function addAttributes(aElem, cAttribute) {
		//proposed by Acr111
		if (cAttribute !== undefined) {
			for (var xi = 0; xi < cAttribute.length; xi++) {
				aElem.setAttribute(cAttribute[xi][0], cAttribute[xi][1]);
				if (cAttribute[xi][0].toUpperCase() == 'TITLE') aElem.setAttribute('alt', cAttribute[xi][1]);
			}
		}
	}

	function newDiv(iHTML, cAttribute) {
		var aDiv = document.createElement("DIV");
		aDiv.innerHTML = iHTML;
		addAttributes(aDiv, cAttribute);
		return aDiv;
	}

	function removeElement(elem) {
		if (elem) {if (elem.parentNode) elem.parentNode.removeChild(elem);}
	}

	/**
	 * Compute the identifier of the cell having the x,y coordinated
	 * Params:
	 *	x	Coordinate X
	 *	y	Coordinate Y
	 * Returns: the ID of the cell coresponding to the given x,y coordinates
	 */
	function xy2id(x, y){
		return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));
	}
		
	/**
	* Wrapper for the function getElementById
	* Params: aId = Text of the ID of the element to look for
	* Returns: Element of the document with the specified ID
	*/
	function get(aID) {
		if (aID != "") {
			return document.getElementById(aID);
		} else {
			return undefined;
		}
	}
	
	function log(level, text) {
		if (logLevel >= level)
			GM_log(text);
	}
	
/**************************/
/*** Main functionality ***/
/**************************/

	//adds link and prepares data for Travian Tractor
	function addBRLink(){
		var battleReportText;
		var cleanedReport;
		
		var playerLinks = find("//a[starts-with(@href,'spieler.php')]",XPList);
		if (logLevel>0)
			for (var i=0;i < playerLinks.snapshotLength;i++)
				log(3, "playerLinks #" + i + " = " + playerLinks.snapshotItem(i).innerHTML);
		var villageLinks = find("//a[starts-with(@href,'karte.php?d=')]",XPList);
		if (logLevel>0)
			for (var i=0;i < villageLinks.snapshotLength;i++)
				log(3, i + " = " + villageLinks.snapshotItem(i).innerHTML);
		attVillage = villageLinks.snapshotItem(0).innerHTML;	// used below for battleReport as well
		defVillage = villageLinks.snapshotItem(1).innerHTML;
		if (boolIsT35 == false)
			var subj = find("//td[@class='s7']", XPList);
		else {
			var subj = find("//table[@class='std reports_read']//th", XPList);
			if (subj.snapshotLength == 0)
				subj = find("//table[@id='report_surround']//th", XPList);
			}
		if (logLevel>0)
			for (var i=0;i < subj.snapshotLength;i++)
				log(3, "subj " + i + " = " + subj.snapshotItem(i).innerHTML);
		if (subj.snapshotItem(1).innerHTML == (attVillage + " scouts " + defVillage) || // don't show link for scout reports
			playerLinks.snapshotItem(0).href != playerLinks.snapshotItem(1).href)		// check if BR came from your account, if not do nothing!
			showTractorLink = false; 
			
		attacker = playerLinks.snapshotItem(1).innerHTML;	// used below for battleReport as well
		defender = playerLinks.snapshotItem(2).innerHTML;
		
		if (playerLinks.snapshotItem(0).href == playerLinks.snapshotItem(1).href)
			var playerAttacker = 1;                 // account was the attacker
		else
			var playerAttacker = 2;                 // account was the defender or didn't come from this account!
		battleReportText = parseBattleReport(0, 0);                 // generate BR for pasting
		if (boolIsT35 == true)
			travilogReport = parseBattleReport (0, 0);
		else
			travilogReport = battleReportText;
		cleanedReport = parseBattleReport(playerAttacker, 1);       // generate BR for pasting without troop counts

		var divlmid2 = find("//div[@id='" + dmid2 + "']", XPFirst);
		var insertPoint = find("//div[@id='" + dmid2 + "']//p",XPList);
		if (insertPoint.snapshotLength == 0) {
			insertPoint = find("//div[@id='textmenu']", XPList);
			}
		
		if (showTractorLink == true) {
			var tractorLink = elem("a","Send Report to Travian Tractor");
			tractorLink.setAttribute("id", "tt_battlereport");
			tractorLink.setAttribute("href","javascript:void(0)");
						
			tractorLink.addEventListener("click", function() { postToTractor(battleReportText)}, 0);
			/* tractor link */
			//var ptable = newTable([["cellpadding","0"], ["cellspacing","0"], ["border-style","none"]]);
			//var aRow = newRow("");
			//var aCell = newCell("", [["valign","middle"]]);
			var ptable = newTable([['style', 'background-color:white; border:0px none white; margin:0px;']]);
			var aRow = newRow("", [['class', 'tb3rnb']]);
			var aCell = newCell("", [['class', 'tb3cnb'], ['style', 'text-align:'+ docDir[0] + ';']]);
			aCell.appendChild(tractorLink);
			aRow.appendChild(aCell);
			var bCell = newCell("", [["id","qtt_processingCell"],['class', 'tb3cnb'],['style', 'text-align:'+ docDir[0] + ';'],["valign","middle"]]);
			aRow.appendChild(bCell);
			var cCell = newCell("",[["id","qtt_checkboxCell"],['class', 'tb3cnb'],["height","28"], ["width","28"], ["valign","middle"],["align","center"]]);
			var image = elem("img");
			image.style.visibilty = 'hidden';
			image.setAttribute("src",blankIMG);
			image.setAttribute("id","qtt_checkbox");
			cCell.appendChild(image);			
			aRow.appendChild(cCell);
			if (boolIsT35 == true) {
				aCell.setAttribute("width","225");
				bCell.setAttribute("width","20");				
				var dCell = newCell("",[['class', 'tb3cnb']]);
				aRow.appendChild(dCell);
				}
			image.style.visibilty = 'visible';
			ptable.appendChild(aRow);
			insertPoint.snapshotItem(0).appendChild(ptable);
			}
		
		/* travilog link */
		if (showTravilogLink == true) {
			var ptable2 = newTable([['style', 'background-color:white;']]);
			var travilogLink = elem("a","Send to T-Reports.net");
			travilogLink.setAttribute("id", "qtt_travilog");
			travilogLink.setAttribute("href","javascript:void(0)");
			travilogLink.addEventListener("click", function() { postToTravilog(travilogReport, cleanedReport)}, 0);
			var anon = elem("input");
			anon.setAttribute("type","checkbox");
			anon.setAttribute("id","qtt_anonymous");
			var span = elem("span");
			span.innerHTML = 'anonymize';
			if (showTractorLink == true)
				var bRow = newRow("");
			else
				var bRow = newRow("",[["height","28"],["valign","middle"]]);
			var b1Cell = newCell("", [['style', 'text-align:'+ docDir[0] + ';'],["valign","middle"],['class', 'tb3cnb']]);
			b1Cell.appendChild(travilogLink);
			var b2Cell = newCell("&nbsp;",[['class', 'tb3cnb']]);
			b2Cell.appendChild(anon);
			var b3Cell = newCell("Anonymize",[["id","qtt_logCheckboxCell"],['class', 'tb3cnb'], ["valign","middle"],["align","center"]]);
			var b4Cell = newCell("",[['class', 'tb3cnb']]);
			var scrub = elem("input");
			scrub.setAttribute("type","checkbox");
			scrub.setAttribute("id","qtt_scrub");
			b4Cell.appendChild(scrub);
			var b5Cell = newCell("Remove Troop Counts",[['class', 'tb3cnb']]);
			
			bRow.appendChild(b1Cell);
			bRow.appendChild(b2Cell);
			bRow.appendChild(b3Cell);
			bRow.appendChild(b4Cell);
			bRow.appendChild(b5Cell);
			
			ptable2.appendChild(bRow);
			insertPoint.snapshotItem(0).appendChild(ptable2);
		}
	}
	
/* 
// Example BR Generated
Subject: 	AttVillage attacks DefVillage
Sent: 	on 02/26/09 at 03:28:02 pm

Attacker 	ATTACKER from the village AttVillage
 	[Phalanx] 	[Swordsman] 	[Pathfinder] 	[Theutates Thunder] 	[Druidrider] 	[Haeduan] 	[Battering Ram] 	[Trebuchet] 	[Chief] 	[Settler]
Units	0	0	0	3	0	0	0	0	0	0
Casualties	0	0	0	0	0	0	0	0	0	0
Bounty 	66 67 92 0 

Defender 	DEFENDER from the village DefVillage
 	[Phalanx] 	[Swordsman] 	[Pathfinder] 	[Theutates Thunder] 	[Druidrider] 	[Haeduan] 	[Battering Ram] 	[Trebuchet] 	[Chief] 	[Settler]
Units	0	0	0	0	0	0	0	0	0	0
Casualties	0	0	0	0	0	0	0	0	0	0
*/

	/* prepares the BattleReport for posting in format Tractor needs */
	function parseBattleReport(dontShowTroops, forceBrackets)
	{
		var brTxt;
		var qBooty = new Array();

		if (boolIsT35 == false) {
			var t = find("//table[@class='tbg']//table[@class='tbg']", XPList);
		} else {
			//var t = find("//table[@class='std reports_read']//table[@class='std']", XPList);
			var t = find("//table[@id='report_surround']//table", XPList);
			if (t.snapshotLength == 0)
				var t = find("//td[@class='report_detail']//table", XPList);
		}
		/*for (var i=0; i < t.snapshotLength;i++) {
			var newId = "qtt_" + i;
			t.snapshotItem(i).id = newId;
		}*/

		if (boolIsT35 == false)
			var subj = find("//td[@class='s7']", XPList);
		else {
			var subj = find("//table[@class='std reports_read']//th", XPList);
			if (subj.snapshotLength == 0)
				subj = find("//table[@id='report_surround']//th", XPList);
			}
		
		if (logLevel>0)
			for (var i=0;i < subj.snapshotLength;i++)
				log(3, "Subj #" + i + " = " + subj.snapshotItem(i).innerHTML);
		brTxt = "Subject: \t" + subj.snapshotItem(1).innerHTML + "\n";
		if (boolIsT35 == false)
			var timeStr = subj.snapshotItem(2).innerHTML.replace("<span> "," ").replace("</span>","");
		else {
			var time = find("//table[@class='std reports_read']//td", XPList);
			if (time.snapshotLength == 0)
				time = find("//table[@id='report_surround']//td", XPList);
			var timeStr = time.snapshotItem(1).innerHTML.replace(/<span>/g,"").replace("</span>","").replace("</span>","");
			}
		brTxt+= "Sent: \t" + timeStr + "\n";
		brTxt+= "Attacker \t" + attacker + " from the village " + attVillage + "\n";

		for (var g=0; g < t.snapshotLength;g++) {	// iterate through tables in the report
			var tTable = t.snapshotItem(g);
			for (var i=0;i<tTable.rows.length;i++) {
				log (9, "g=" + g + " i=" + i + " - '" + tTable.rows[i].cells[0].innerHTML+"'");
				switch (tTable.rows[i].cells[0].innerHTML) {
					case "Units":
					case "Troops":
					case "Casualties":
					case "Prisoners":
					case "troops":
					case "casualties":
					case "prisoners":
						brTxt += tTable.rows[i].cells[0].innerHTML;	       // handle row label separately
						log (6, "G="+g+" dontShowTroops="+dontShowTroops + " Label = "+ tTable.rows[i].cells[0].innerHTML);
						for (var j=1;j<tTable.rows[i].cells.length;j++)
							if (dontShowTroops == 0 ||                     // dont scrub
								(g==0 && dontShowTroops==2) ||             // first table and scrub defender 
								(g!=0 && dontShowTroops==1))               // not first table and scrub attacker
								brTxt += "\t" + tTable.rows[i].cells[j].innerHTML;
							else
								brTxt += "\t0";
						brTxt += "\n";	
						break;
					case "Info":
					case "info":
						var infReg = new RegExp('">');						// find and remove image strings in the text
						for (var j=0;j<tTable.rows[i].cells.length;j++) {
							if (infReg.exec(tTable.rows[i].cells[j].innerHTML)) {
								brTxt += RegExp.rightContext;
								}
							else
								brTxt += tTable.rows[i].cells[j].innerHTML.replace("<b>","").replace("</b>","").replace("<div>","").replace("</div>","") + "\t";
							}
						brTxt += "\n";
						break;
					case "Bounty":
					case "bounty":
						brTxt += "Bounty \t";
						if (boolIsT35)
							brTxt += "\n";
						var tmpBounty = "";
						var regex = new RegExp(" ");
						if (boolIsT35 == false)
							var bVals = find("//tr[@class='cbg1']//td[@class='s7']", XPFirst);	// get the bounty values
						else
						  {
							var bVals = find("//tbody[@class='infos']//div[@class='goods']", XPFirst);
							if (bVals==null) {
							    bVals = find("//tbody[@class='goods']//div[@class='res']", XPFirst);
							    if (bVals==null) {
							    	// TBeyond is running
							    	bVals = find("//tbody[@class='goods']//td", XPFirst);
									}
							    }
							}
						if (!regex.exec(bVals.childNodes[7].nodeValue)) {	// last value doesn't have a space when not using TBeyond
							for (var j=1;j<bVals.childNodes.length;j+=2) {
								if (boolIsT35)
									switch (j) {
										case 1:
											tmpBounty+="Wood";
											break;
										case 3:
											tmpBounty+="Clay";
											break;
										case 5:
											tmpBounty+="Iron";
											break;
										case 7:
											tmpBounty+="Wheat";
											break;
										}
								tmpBounty += bVals.childNodes[j].nodeValue;
								//tmpBounty += bVals.childNodes[j].nodeValue.replace("|","");
								}
							brTxt += tmpBounty + " ";                       // needed so that both report sources exactly match
						} else {                                            // last value does have a space in TBeyond
							log (5, "TBeyond running");
							for (var j=1;j<bVals.childNodes.length;j+=2) {
								regex.test(bVals.childNodes[j].nodeValue);
								if (boolIsT35==true)
									switch (j) {
										case 1:
											brTxt+="Wood";
											break;
										case 3:
											brTxt+="Clay";
											break;
										case 5:
											brTxt+="Iron";
											break;
										case 7:
											brTxt+="Wheat";
											break;
										}
								brTxt += RegExp.leftContext + " ";
								if (j<7 && boolIsT35==true)
									brTxt += "| ";
								}
							}
						if (boolIsT35) {
							var carry = find("//tbody[@class='infos']//div[@class='carry']",XPFirst);
							if (carry != null)
								brTxt += "\ncarry" + carry.childNodes[1].nodeValue;
							else
								brTxt += "carry0/0";						// add dummy carry if we don't have one
							}
						brTxt += "\n"; 							
						break; 
					case "Defender":
					case "defender":
					case "<span class=\"c1 b\">Defender</span>":            // if no bounty Travian has different innerHTML for Defender 
					case "<span class=\"b\">Defender</span>":
						if (tTable.rows[i].cells[1].innerHTML == "Reinf.")
							brTxt += "\nDefender \tReinf.\n";
						else
							brTxt += "\nDefender \t" + defender + " from the village " + defVillage + "\n";
						break;
					case "Statistics":
						// Travian Beyond extended statistics table
						log (0,"Travian Beyond Table");
						i=tTable.rows.length;	// stop looping through this table
						break;
					default:
						var regex2 = new RegExp(/Defender/i);
						if (regex2.exec(tTable.rows[i].cells[0].innerHTML)) {
							if (tTable.rows[i].cells[1].innerHTML == "Reinf.")
								brTxt += "\nDefender \tReinf.\n";
							else
								brTxt += "\nDefender \t" + defender + " from the village " + defVillage + "\n";
							}
						else if (tTable.rows[i].className == "unit" || tTable.rows[i].cells[1].childNodes[0].className == "unit u1" ||
							tTable.rows[i].cells[1].childNodes[0].className == "unit u11" ||	// these are for T35
							tTable.rows[i].cells[1].childNodes[0].className == "unit u21" ||
							tTable.rows[i].cells[1].childNodes[0].className == "unit u31" ||
							tTable.rows[i].cells[1].childNodes[0].className == "unit u41") {
							if (boolIsT35 == false) {
								var unitImgs = find("//table[@id='qtt_" + g + "']//tr[@class='unit']//img", XPList);
								var regex = new RegExp('img\/un\/u\/');
								log (9,"Number of images in Unit Row = " + unitImgs.snapshotLength);
								var race=null;
								for (var j=0;j<unitImgs.snapshotLength && !race;j++)
									if (regex.exec(unitImgs.snapshotItem(j).src)) {
										race = findRace(RegExp.rightContext, forceBrackets);
									}
								}
							else {
								race = findRace(tTable.rows[i].cells[1].childNodes[0].className, forceBrackets);
								}
							if (race)
								brTxt += race + "\n";
							}
						break;
				}
			} 
		}
	log (1, brTxt);
	return brTxt;
	}

	function findRace(imageStr, forceBrackets)
	{
		var race = 0;
		log (5, "ImageStr = " + imageStr + " forceBrackets = " + forceBrackets);
		if (forceBrackets) {
			switch (imageStr) {
				case "unit u1":
				case "1.gif":	// romans
					race = " \t[Legionnaire]\t[Praetorian]\t[Imperian]\t[Equites Legati]\t[Equites Imperatoris]\t[Equites Caesaris]\t[Ram]\t[Fire Catapult]\t[Senator]\t[Settler]";
					break;
				case "unit u11":
				case "11.gif":	// teutons
					race = " \t[Maceman]\t[Spearman]\t[Axeman]\t[Scout]\t[Paladin]\t[Teutonic Knight]\t[Ram]\t[Catapult]\t[Chieftain]\t[Settler]";	
					break;
				case "unit u21":
				case "21.gif":	// gauls
					race = " \t[Phalanx]\t[Swordsman]\t[Pathfinder]\t[Theutates Thunder]\t[Druidrider]\t[Haeduan]\t[Battering Ram]\t[Trebuchet]\t[Chief]\t[Settler]";
					break;
				case "unit u31":
				case "31.gif":	// nature
					race = " \t[Rat]\t[Spider]\t[Snake]\t[Bat]\t[Wild Boar]\t[Wolf]\t[Bear]\t[Crocodile]\t[Tiger]\t[Elephant]";
					break;
				case "unit u41":
				case "41.gif":	// natars -- i'm guessing here because i haven't seen a natarian report
					race = " \t[Pikeman]\t[Thorned warrior]\t[Guardsman]\t[Birds of Prey]\t[Axerider]\t[Natarian Knight]\t[Warelephant]\t[Ballista]\t[Natarian Emperor]\t[Settler]";
					break;
				default:
					break;
				}
			}
		else {
			switch (imageStr) {
				case "unit u1":
					race = " \tLegionnaire\tPraetorian\tImperian\tEquites Legati\tEquites Imperatoris\tEquites Caesaris\tRam\tFire Catapult\tSenator\tSettler"
					break;
				case "1.gif":	// romans
					race = " \t[Legionnaire]\t[Praetorian]\t[Imperian]\t[Equites Legati]\t[Equites Imperatoris]\t[Equites Caesaris]\t[Ram]\t[Fire Catapult]\t[Senator]\t[Settler]";
					break;
				case "unit u11":
					race = " \tMaceman\tSpearman\tAxeman\tScout\tPaladin\tTeutonic Knight\tRam\tCatapult\tChieftain\tSettler";
					break;
				case "11.gif":	// teutons
					race = " \t[Maceman]\t[Spearman]\t[Axeman]\t[Scout]\t[Paladin]\t[Teutonic Knight]\t[Ram]\t[Catapult]\t[Chieftain]\t[Settler]";	
					break;
				case "unit u21":
					race = " \tPhalanx\tSwordsman\tPathfinder\tTheutates Thunder\tDruidrider\tHaeduan\tBattering Ram\tTrebuchet\tChief\tSettler";
					break;
				case "21.gif":	// gauls
					race = " \t[Phalanx]\t[Swordsman]\t[Pathfinder]\t[Theutates Thunder]\t[Druidrider]\t[Haeduan]\t[Battering Ram]\t[Trebuchet]\t[Chief]\t[Settler]";
					break;
				case "unit u31":
					race = " \tRat\tSpider\tSnake\tBat\tWild Boar\tWolf\tBear\tCrocodile\tTiger\tElephant";
					break;
				case "31.gif":	// nature
					race = " \t[Rat]\t[Spider]\t[Snake]\t[Bat]\t[Wild Boar]\t[Wolf]\t[Bear]\t[Crocodile]\t[Tiger]\t[Elephant]";
					break;
				case "unit u41":
				case "41.gif":	// natars -- i'm guessing here because i haven't seen a natarian report
					race = " \t[Pikeman]\t[Thorned warrior]\t[Guardsman]\t[Birds of Prey]\t[Axerider]\t[Natarian Knight]\t[Warelephant]\t[Ballista]\t[Natarian Emperor]\t[Settler]";
					break;
				default:
					break;
				}
			}
		return race;
	}

	function postToTractor(text)
	{
		log(1, 'Attempting to post:');
		var image = get("qtt_checkbox");
		image.setAttribute("src",blankIMG);
		var form = elem("form");
		form.setAttribute("method","post");
		form.setAttribute("action","http://www.traviantractor.com/index.php/me/enterReport");
		form.setAttribute("target","_QTTWindow");
		form.setAttribute("value", "");
		var hInput = elem("input");
		hInput.setAttribute("type", "hidden");
		hInput.setAttribute("id","report")
		hInput.setAttribute("name","report")
		hInput.setAttribute("value", text);
		form.appendChild(hInput);
		document.body.appendChild(form);
		form.submit();
		document.body.removeChild(form);
		log(1, "Posted: " + text);
		GM_setValue("qtt_waiting",1);
		timeOutCount = 0;
		timer = window.setTimeout(processingCheck,waitTime);
	}
	
	function postToTravilog(report, cleanReport)
	{
		log(1, 'Attempting to post:');
		var image = get("qtt_logCheckboxCell");
		image.setAttribute("src",blankIMG);

		var form = elem("form");
		form.setAttribute("method","post");
		//form.setAttribute("action","http://travilog.org.ua/");
		form.setAttribute("action","http://travian-reports.net/us/");
		form.setAttribute("target","qtt_TravilogWindow");
		form.setAttribute("id","qtt_travilogForm");
		//form.setAttribute("onsubmit", "ceckandsave();");

		var checkbox = get("qtt_anonymous");
		var scrub = get("qtt_scrub");
		if (scrub.checked) {
			GM_setValue("qtt_BR",cleanReport);
			log(1, "Posted (Clean): " + cleanReport);
			}
		else {
			GM_setValue("qtt_BR",report);
			log(1, "Posted: " + report);
			}
		GM_setValue("qtt_anon",checkbox.checked);
		document.body.appendChild(form);
		form.submit();
		document.body.removeChild(form);
		GM_setValue("qtt_waiting",1);
		timeOutCount = 0;
		//timer = window.setTimeout(processingCheck,waitTime);
	}
	
	function submitTravilog()
	{
		var report = GM_getValue("qtt_BR");
		log(0,"here");
		if (report) {
			if (location.href == "http://travilog.org.ua/") {
				var textarea = get('text');
				textarea.value = report;
				var checkbox = find("//input[@name='anonymous']",XPFirst);
				checkbox.checked = GM_getValue("qtt_anon");
				var submit = find("//input[@type='submit']",XPFirst);
				document.getElementById('form').submit();
			}
			else {
				log(0,report);
				var textarea = find("//textarea[@name='raport']",XPFirst);
				textarea.value = report;
				var checkbox = find("//input[@name='anonimowy']",XPFirst);
				checkbox.checked = GM_getValue("qtt_anon");
				var submit = find("//input[@type='submit']",XPFirst);
				var form = find("//form[@action='raport.php']",XPFirst);
				form.submit();
				//document.getElementById('form').submit();
			}
		}
		GM_setValue("qtt_BR","");
	}
	
	function processingCheck()
	{
		var waiting = GM_getValue("qtt_waiting",1);
		var procCell = get("qtt_processingCell");
		log (9, "timeOutCount = " + timeOutCount + " waiting? = " + waiting);
		if (waiting) {
			timeOutCount++;
			if (timeOutCount < timeOutValue) {
				timer = window.setTimeout(processingCheck,waitTime);
				}
			else { // we timed out!
				procCell.innerHTML = "";
				var image = get("qtt_checkbox");
				image.setAttribute("src",qMarkIMG);
				return;
			}
			switch (timeOutCount % 4) {
				case 0: 
					procCell.innerHTML = "";
					break;
				case 1: 
					procCell.innerHTML = "&nbsp;.";
					break; 
				case 2: 
					procCell.innerHTML = "&nbsp;..";
					break; 
				case 3: 
					procCell.innerHTML = "&nbsp;...";
					break; 
			}
		} else {
			procCell.innerHTML = "";
			var image = get("qtt_checkbox");
			image.setAttribute("src",checkBoxIMG);
			procCell.setAttribute("width","5");
		}
	}
	
	function clearProcessingFlag()
	{
		// clear flag so ... stops and checkmark appears
		GM_setValue("qtt_waiting",0);
		log (9, "Clearing Processing Flag");
	}

	function saveVillageInfo()
	{
		if (boolIsT35 == false) {
			var villageInfo = find("//div[@class='ddb']", XPList);
		
			if (logLevel > 0)
				for (var i=0;i<villageInfo.snapshotLength; i++)
					log (3, "DDB #"+ i + ": " + villageInfo.snapshotItem(i).innerHTML);
			
			GM_setValue("villageName",villageInfo.snapshotItem(0).innerHTML);
			var coordStr = villageInfo.snapshotItem(1).innerHTML.replace("&nbsp;","").replace("&nbsp;","");
			GM_setValue("villageCoords",coordStr);
			log (3, "villageCoords = " + coordStr);
			}
		else {
			var villageName = find("//div[@id='content']//h1//div",XPFirst);
			log (3, "VillageName = " + villageName.innerHTML);
			var coordInfo = find("//div[@id='map_details_info']//span[@class='b']",XPFirst);
			if (coordInfo == null) {
				var coordInfo = find("//div[@id='content']//h1", XPList);
				var coordStr = coordInfo.snapshotItem(0).innerHTML;
				coordStr = coordStr.replace("<div>","").replace(villageName.innerHTML,"").replace("</div>","").replace("&nbsp;","");		
				log (3,"Coords: " + coordStr);
				}
			
			/* Add BP Link for T35 */
			var SendTroops = find("//div[@id='map_details_actions']//td[@class='c']", XPFirst);
			if (SendTroops == null)
				SendTroops = find("//table[@id='options']//td[@class='none']", XPFirst);
			timeStr = SendTroops.getAttribute("title");
			var myRegEx = /Beginners protection till /i;
			var foundBP = timeStr.search(myRegEx);
			if (foundBP != -1) {
				timeStr = timeStr.replace("Beginners Protection till ","").replace(" "," at ").replace(" pm",":57 pm").replace(" am",":57 am");
				log (3, "BP Time = " + timeStr);
				var tractorLink = elem("a"," » Add BP Time to Travian Tractor");
				tractorLink.setAttribute("id", "tt_beginnerprotection");
				tractorLink.setAttribute("href","javascript:void(0)");
				if (boolIsT35)
					villageAndCoords = villageName.innerHTML + " " + coordStr;
				else
					villageAndCoords = villageName.innerHTML + " " + coordInfo.innerHTML;
				log (3, "Village + coords = " + villageAndCoords);
				tractorLink.addEventListener("click", function() { postBPToTractor(villageName.innerHTML, villageAndCoords, timeStr)}, 0);
				var aRow = newRow("");
				var a1Cell = newCell("");
				a1Cell.appendChild(tractorLink);
				var altTextStr = "For common village names. i.e. Sparta becomes Sparta (-100,-100)" 
				var a2Cell = newCell("Add Coords to name",[["id",""], ["valign","middle"],["align","center"],["title",altTextStr]]);
				var a3Cell = newCell("",[["title",altTextStr]]);
				var addCoords = elem("input");
				addCoords.setAttribute("type","checkbox");
				addCoords.setAttribute("id","qtt_addCoords");
				a3Cell.appendChild(addCoords);
			
				aRow.appendChild(a1Cell);
				aRow.appendChild(a2Cell);
				aRow.appendChild(a3Cell);
				var insertPoint = find("//div[@id='map_details_actions']//tbody",XPFirst);
				if (insertPoint == null)
					insertPoint = find("//table[@id='options']//tbody", XPFirst);
				insertPoint.appendChild(aRow);
				}
			}
	}
	
	/* This adds a link to add BP villages to the tractor. For this to work you MUST first go through the village page, then 
	   attempt to attack the village and receive the BP notice. I will not automate anything in Travian so this is the best
	   this script can do. I'm trying to keep QTT as legal as possible. */
	function addBPLink()
	{
		var BPTime = find("//div[@class='f10 e b']", XPFirst);
		if (boolIsT35 == true) {
			var xCoord = find("//span[@class='b f135']//input[@name='x']",XPFirst);
			var yCoord = find("//span[@class='b f135']//input[@name='y']",XPFirst);
			}
		else {
			var xCoord = find("//div[@class='b f135']//input[@name='x']",XPFirst);
			var yCoord = find("//div[@class='b f135']//input[@name='y']",XPFirst);
			}
		if (BPTime != null) {
			// this village is under BP
			log (3, "X = " + xCoord.value + " Y = " + yCoord.value);
			var coordStr = "(" + xCoord.value + "|" + yCoord.value + ")";
			var villageCoords = GM_getValue("villageCoords",null);
			var villageName = GM_getValue("villageName",null);	
			log (3, villageCoords);
			if (boolIsT35 == false && villageCoords != null && villageName != null && villageCoords == coordStr) {
				//coordBlock.snapshotItem(1).appendChild(villageLink);
			
				timeStr = BPTime.innerHTML.replace("Beginner's protection until ","").replace("<span> "," ").replace("</span>","");
				log (3, timeStr);
				
				var tractorLink = elem("a","Add " + villageName + "'s BP Time to Travian Tractor");
				tractorLink.setAttribute("id", "tt_beginnerprotection");
				tractorLink.setAttribute("href","javascript:void(0)");
				
				tractorLink.addEventListener("click", function() { postBPToTractor(villageName, "", timeStr)}, 0);
		
				var ptable = newTable([["cellpadding","0"], ["cellspacing","0"]]);
				var aRow = newRow("");
				var aCell = newCell("", [["valign","middle"]]);
				aCell.appendChild(tractorLink);
				aRow.appendChild(aCell);
				var bCell = newCell("", [["id","qtt_processingCell"],["valign","middle"]]);
				bCell.style.color = 'black';
				aRow.appendChild(bCell);
				var cCell = newCell("",[["id","qtt_checkboxCell"], ["height","28"], ["width","28"], ["valign","middle"],["align","center"]]);
				var image = elem("img");
				image.style.visibilty = 'hidden';
				image.setAttribute("src",blankIMG);
				image.setAttribute("id","qtt_checkbox");
				cCell.appendChild(image);			
				aRow.appendChild(cCell);
				ptable.appendChild(aRow);
				BPTime.appendChild(ptable);
				image.style.visibilty = 'visible';				
			}
			else {
				var id = xy2id(xCoord.value, yCoord.value);
				if (boolIsT35 == true) {
					var coordBlock = find("//span[@class='b f135']", XPList);
					var coordTable = find("//table[@class='coords']", XPFirst);
					var coordTDs = find("//table[@class='coords']//td", XPList);
					coordTDs.snapshotItem(0).setAttribute("width","150");
					coordTable.setAttribute("style","width: 100%");
					}
				else
					var coordBlock = find("//div[@class='b f135']", XPList);
				var villageLink = elem("a","&nbsp;" + coordStr);
				villageLink.setAttribute("id", "qtt_villageLink");
				villageLink.setAttribute("href","karte.php?z=" + id);
				villageLink.setAttribute("style","text-align: left; font-size: 8pt;");
				coordBlock.snapshotItem(1).appendChild(villageLink);
			}
		}
	}
	
	/* submits Beginner Protection data to the Tractor */
	function postBPToTractor(name, nameCoords, time)
	{
		log(1, 'Attempting to post:');
		var form = elem("form");
		form.setAttribute("method","post");
		form.setAttribute("action","http://www.traviantractor.com/index.php/me/beginners");
		form.setAttribute("target","_QTTWindow");
		form.setAttribute("value", "");
		var vInput = elem("input");
		vInput.setAttribute("type", "hidden");
		vInput.setAttribute("id","village")
		vInput.setAttribute("name","village")
		if (boolIsT35 == true) {
			var addCoords = get("qtt_addCoords");
			if (addCoords.checked) 
				vInput.setAttribute("value", nameCoords);
			else
				vInput.setAttribute("value", name);
			}
		var tInput = elem("input");
		tInput.setAttribute("type", "hidden");
		tInput.setAttribute("id","until")
		tInput.setAttribute("name","until")
		tInput.setAttribute("value", time);
		form.appendChild(vInput);
		form.appendChild(tInput);
		document.body.appendChild(form);
		form.submit();
		document.body.removeChild(form);
		log(1, "Posted: " + name + " " + time);
		GM_setValue("qtt_waiting",1);
		timeOutCount = 0;
		timer = window.setTimeout(processingCheck,waitTime);
	}

	if (get(dTop5) == null) {
		boolIsT35 = true;
		dmid2 = 'content';
		dTop5 = 'mtop';
		}

	/* load different page functions */
	if (location.href.indexOf("www.traviantractor.com") == -1 &&
      location.href.indexOf("travilog.org.ua") == -1 &&
	  location.href.indexOf("travian-reports.net") == -1)
		leftMenuLinks();

	if (location.href.indexOf("berichte.php?") != -1)
		addBRLink();
	else if (location.href.indexOf("karte.php?d=") != -1)
		saveVillageInfo();
	else if (location.href.indexOf("a2b.php") != -1)
		addBPLink();
	else if (location.href.indexOf("www.traviantractor.com/index.php/me/enterReport") != -1 ||
		location.href.indexOf("www.traviantractor.com/index.php/me/viewFarm/") != -1 ||
		location.href == "http://www.traviantractor.com/index.php/me/beginners")
		clearProcessingFlag();
	else if (location.href == "http://travilog.org.ua/" || location.href == "http://travian-reports.net/us/")
		submitTravilog();
	log (9,location.href);

	function leftMenuLinks() {
		var menu = find("//td[@class='menu']", XPFirst);
		if (menu == null) {
			menu = find("//div[@id='side_navi']/p", XPList);
			if (menu == null) {
				menu = find("//div[@id='sleft']/p", XPList);
				}
			if (menu.snapshotLength > 1) {
				var pFirst = menu.snapshotItem(0);
				for (xi = 1; xi < menu.snapshotLength; xi++) {
					pFirst.innerHTML += menu.snapshotItem(xi).innerHTML;
					removeElement(menu.snapshotItem(xi));
				}
				menu = pFirst;
			} else menu = menu.snapshotItem(0);
		}
  	var updL = newLink('Update QTTractor', [["href", 'javaScript:void(0)']]);
		updL.addEventListener('click', function() {updateScript()}, false);
		menu.appendChild(updL);
  }

	function updateScript() {
		var divUpdate = newDiv("<b><br>&nbsp;Checking for script update.  Please wait...&nbsp;<br>&nbsp;</b>", [["style", "position:absolute; top:200px; left:120px; display:block; padding:1px; z-index:50; clear:both; border:solid 2px #C0C0C0; background-color:black; color:yellow;"]]);
		var a = get(dmid1);
		if (a) a.appendChild(divUpdate);
		try {
			if (!GM_getValue) return;
			GM_xmlhttpRequest({
				method: 'GET',
				url: QTT.url + '?source', // don't increase the 'installed' count; just for checking
				onload: function(result) {
					removeElement(divUpdate);
					if (result.status != 200) return;
					if (!result.responseText.match(/@version\s+([\d.]+)/)) {return;}
					var theNewVersion = RegExp.$1;
					log (9, "New Version = " + theNewVersion + " - Old Version = " + QTT.version);
					if (theNewVersion == QTT.version) {
						alert('You have the latest version available (v ' + QTT.version + ') !');
						return;
					} else if (theNewVersion < QTT.version) {
						alert('You have a Beta Version of QTT (v ' + QTT.version + ') ?!');
						return;
					} else if (window.confirm('A new version of the script is available (v ' + theNewVersion + ')!\n\nUpdate script now ?\n')) window.location.href = QTT.url;
				}
			});
		} catch (ex) {}
	}

}

if (window.addEventListener) {
	window.addEventListener('load', quickTravianTractorMain, false);
} else {
	window.attachEvent('onload', quickTravianTractorMain);
}