// ==UserScript==
// @id             AG_BGCC
// @name           BG Color Changer
// @version        1.1
// @namespace      BG Color Changer
// @author         Ahmed Gamal Ebahim Egypt
// @description    Change background color for any element in any wep page to custom color
// @include        *
// @run-at         window-load
// ==/UserScript==

clo ="#A2B4ED";
bg = /(background(-color)?:( )?((none|url\(([^\)])+\)) )?((no-)?repeat(-x|-y)? )?((scroll|fixed|inherit) )?(((-)?\d{1,5}(px|%)?|left|center|right|inherit) )?(((-)?\d{1,5}(px|%)?|top|center|buttom|inhrit) )?)(#f.f([^;]f.)?|(rgb|rgba)\(2(5|4)., 2(5|4)., 2(5|4).(, \d{1,3})?\)|(hsl|hsla)\(\d{1,3}, \d{1,3}%, 100%(, \d{1,3})?\)|white|seashell|oldlace|azure|floralwhite|ivory|mintcream|snow|whitesmoke|ghostwhite)/ig;
sIDlist = [];
sslist = [];
rNlist = [];
//console.log("wait to page load compelet");
document.addEventListener ('load', main(), false);
function main() {
	document.removeEventListener ('load', main, false);
	sheetsHerf = [];
	disshlist = [];
	sheets = document.styleSheets;
	sheetsN = sheets.length;
	if (!sheetsN) {return;}
	//console.log("found " + sheetsN + " style sheets");
	for (i = 0; i < sheetsN; i++) {
		sheet = sheets[i];
		
		//console.log("proccess sheet no " + i);
		//console.log(sheet);
		
		if (sheet.disabled == true) {
			//console.log("sheet is disabled");
			continue;
		}
		if (sheet.ownerNode && sheet.ownerNode.id) {
			if (sheet.ownerNode.id.match("BGcolorC")) {
				//if (Number (sheet.ownerNode.id.replace (/(BGcolorC)(\d{1,3})/ig, "$2")) == sheet.cssRules.length || Number (sheet.ownerNode.id.replace (/(BGcolorC)(\d{1,3})/ig, "$2")) == 0) {
				//console.log("sheet have been cheacked before id 'BGcolorC' with same rules");
				continue;
				//}
			}
			else if (sIDlist.length > 0) {
				rep = 0;
				for (sID in sIDlist) {
					if (sID == sheet.ownerNode.id) {
						if (sIDlist[sID] == sheet.cssRules.length) {
							rep = 1;
							//console.log("sheet have been cheacked before id : " + sheet.ownerNode.id + " and same ruels");
						}
						else {
							delete sIDlist[sID];
						}
						break;
					}
				}
				if (rep == 1) {continue;}
			}
		}
		if (sslist.length > 0) {
			rep = 0;
			for (ss = 0; ss < sslist.length; ss++) {
				if (sslist[ss] == sheet) {
					if (rNlist[ss] == sheet.cssRules.length) {
						rep = 1;
						//console.log("sheet have been cheacked before with same ruels");
					}
					else {
						delete sslist[ss];
						delete rNlist[ss];
					}
					break;
				}
			}
			if (rep == 1) {continue;}
		}
		try {
			rules = sheet.cssRules;
		}
		catch (e) {
			//console.log("Rules canot get because used of external server to store style sheet");
			sheetsHerf.push(sheet.ownerNode.href);
			disshlist.push(sheet);
			rules = 0;
		}
		if (!rules) {continue;}
		rulesN = sheet.cssRules.length;
		//console.log("found " + rulesN + " Rules in this sheet");
		for  (j = 0; j < rulesN; j++) {
			ruleF = rules[j];
			function checkR (rule, num) {
				if (rule.cssText.match(bg)) {
					rule.style.backgroundColor = clo;
//					//console.log("capture white style rule " + rule.cssText);
				}
				else if (rule.cssText.match("@import")) {
					//console.log("import  rule captured : rule no " + num);
					repltxt = /(@import (url)?\(")(([^"])+)("\)\;)/ig;
					herf = rule.cssText.replace (repltxt, "$3");
					if (!herf.match("http")) {
						onserv = /\/([^\/\.])+\.css/ig;
						if (sheet.ownerNode.href) {
							herf = sheet.ownerNode.href.replace (onserv, "/" + herf);
						}
						else {
							herf = window.location.host + "/" + herf;
						}
						//console.log("add server address to sheet name : " + herf);
					}
					//console.log("the import style sheet url : " + herf);
					sheetsHerf.push(herf);
					sheet.deleteRule (num);
					rulesN--;
					j--;
				}
			}
			if (ruleF.cssRules) {
				rulesS = ruleF.cssRules;
				rulesSN = rulesS.length;
				//console.log("found " + rulesSN + "  subrule in this Rule");
				for (k = 0; k < rulesSN; k++) {
					checkR(rulesS[k], k);
				}
				continue;
			}
			checkR(ruleF, j);
		}
	if (sheet.ownerNode && sheet.ownerNode.id) {
		sIDlist[sheet.ownerNode.id] = rulesN;
		//console.log("this style sheet was proccessd and id stored " + sheet.ownerNode.id);
	}
	else {
		sslist.push(sheet);
		rNlist.push(sheet.cssRules.length);
		//sheet.ownerNode.id = "BGcolorC" + rulesN;
		//sheet.ownerNode.setAttribute ("id", "BGcolorC" + rulesN);
		//console.log("sheet havnot ownernode id");
	}
	}
	if (sheetsHerf.length > 0) {
		//console.log("Num of sheets to get " + sheetsHerf.length);
		loadcount = 0;
		for (i = 0; i < sheetsHerf.length; i++) {
			sheetHerf = sheetsHerf[i];
			GM_xmlhttpRequest({
				method: "GET",
				url: sheetHerf,
				onload: function(response) {
					loadcount++;
					newSS = document.createElement("style");
					newSS.type = "text/css";
					newSS.id = "BGcolorC";
					newSS.innerHTML = response.responseText.replace (bg, "$1" + clo);
					document.getElementsByTagName ("head")[0].appendChild(newSS);
					//GM_addStyle(response.responseText.replace (bg, "$1" + clo));
					//document.documentElement.childNodes[0].appendChild(newSS);
					//console.log(newSS);
					if (loadcount == sheetsHerf.length) {
						for each (dissh in disshlist) {
							//console.log(dissh);
							dissh.disabled = true;
						}
						//console.log("internal and external sheets scaned");
						bgcolorscan();
						evnt = document.addEventListener ('DOMSubtreeModified', newEvent, true);				
					}
				},
			});
			//console.log(sheetHerf + " request");
		}
	}
	else {
		//console.log("finish");
		bgcolorscan();
		evnt = document.addEventListener ('DOMSubtreeModified', newEvent, true);
	}
}
function bgcolorscan() {
	//console.log("search for elements with inline style bgcolore");
	bgelms = document.evaluate ( "//*[@bgcolor]", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	bgelm = bgelms.iterateNext ();
	bglist = [];
	while (bgelm) {
		if (bgelm.style.backgroundColor == clo) {
			bgelm = bgelms.iterateNext ();
			continue;
		}
		bgc = /#f.f(.f.)?|(rgb|rgba)\(2(5|4)., 2(5|4)., 2(5|4).(, \d{1,3})?\)|(hsl|hsla)\(\d{1,3}, \d{1,3}%, 100%(, \d{1,3})?\)|white|seashell|oldlace|azure|floralwhite|ivory|mintcream|snow|whitesmoke|ghostwhite/ig;
		if (window.getComputedStyle (bgelm, "").backgroundColor.match(bgc)) {
			bglist.push(bgelm);
		}
		bgelm = bgelms.iterateNext ();
	}
	//console.log("search for elements with inline style background");
	bgelms = document.evaluate ( "//*[contains(@style, 'background')]", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	bgelm = bgelms.iterateNext ();
	while (bgelm) {
		if (bgelm.style.backgroundColor == clo) {
			bgelm = bgelms.iterateNext ();
			continue;
		}
		bgc = /#f.f(.f.)?|(rgb|rgba)\(2(5|4)., 2(5|4)., 2(5|4).(, \d{1,3})?\)|(hsl|hsla)\(\d{1,3}, \d{1,3}%, 100%(, \d{1,3})?\)|white|seashell|oldlace|azure|floralwhite|ivory|mintcream|snow|whitesmoke|ghostwhite/ig;
		if (bgelm.style.backgroundColor.match(bgc) || bgelm.style.background.match(bgc)) {
			bglist.push(bgelm);
		}
		bgelm = bgelms.iterateNext ();
	}
	if (bglist.length > 0) {
		for each (bgnode in bglist) {
			bgnode.style.backgroundColor = clo;
			//console.log("set element inline style background");
			//console.log(bgnode);
		}
	}
	//console.log("all searshing function finished and wait for any changes in the page");
}
function newEvent() {
	evnt = document.removeEventListener ('DOMSubtreeModified', newEvent, true);
	//console.log("event fiered");
	setTimeout (
		function () {
			//console.log("old sheets " + sheetsN + " and external " + sheetsHerf.length + " and bgcolor property " + bglist.length);
			main();
		}, 
	3000);
}

