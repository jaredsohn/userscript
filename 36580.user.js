// ==UserScript==
// @name           SHScorePageEnhancer
// @namespace      DarylZero
// @description    Converts nav links to drop down boxes, allows tiers to be collapsed on the manage scores and other pages, hides songs with no scores
// @include        http://*scorehero.com/*
// ==/UserScript==

(function() {
window.addEventListener('load', function(event) {
	// Edit config options here

	var DO_NAV = true;


	// DON'T EDIT BELOW HERE!!!

	var domain = window.location.host;
	var isGHDomain = domain == 'www.scorehero.com';


	// convert game/instrument/diff links to combo boxes
	var gameChooserContainer = document.evaluate(
		isGHDomain
		? '/html/body/div[2]/table/tbody/tr[3]/td/table/tbody/tr/td/table/tbody/tr/td'
		: '/html/body/table/tbody/tr[3]/td/table/tbody/tr/td/table/tbody/tr/td',
		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	if (DO_NAV && !!gameChooserContainer) {

	var paras = gameChooserContainer.getElementsByTagName("P");
	var newPara = document.createElement("P");

	for (var i = paras.length - 1, para; i >= 0; i--) {
		var para = paras[i];

		var newIH = para.getElementsByTagName("B")[0].innerHTML;
		newIH += "<select onchange='var url = this.options[this.selectedIndex].value; if (url == \"\") return; window.location.href = this.options[this.selectedIndex].value;'>\n";

		var spans = para.getElementsByTagName("SPAN");

		for (var j = 0, span; span = spans[j]; j++) {
			if (span.getElementsByTagName("A").length != 0) continue;

			var title = span.getElementsByTagName("B")[0].innerHTML;
			newIH += "\t<option value='' selected='selected'>" + title + "</option>\n";
		}

		newIH += "\t<option value=''>-----</option>\n";

		var links = para.getElementsByTagName("A");

		for (var j = 0, node; node = links[j]; j++) {
			var title = node.innerHTML;
			var url = node.getAttribute("href");

			newIH += "\t<option value='" + url + "'>" + title + "</option>\n";
		}

		newIH += "</select>\n";

		newPara.innerHTML = newIH + " " + newPara.innerHTML;

		gameChooserContainer.removeChild(para);
	}

	gameChooserContainer.insertBefore(newPara, gameChooserContainer.getElementsByTagName("TABLE")[0]);
	} // end DO_NAV



	// now do the tier collapsing bit
	var scoreTable = document.evaluate(
		isGHDomain
		? '/html/body/div[2]/table/tbody/tr[3]/td/table/tbody/tr/td/table[2]/tbody'
		: '/html/body/table/tbody/tr[3]/td/table/tbody/tr/td/table[2]/tbody',
		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	if (window.location.href.indexOf('rankings.php') != -1)
		scoreTable = null;

	if (!!scoreTable) {

	var rows = scoreTable.getElementsByTagName("TR");

	for (var i = 0, row; row = rows[i]; i++) {
		var cols = row.getElementsByTagName("TD");

		if (0 == i) {
			// add toggle all tiers handler

			cols = row.getElementsByTagName("TH");

			var emptySongsLink = null;
			var toggleTiersLink = null;

			emptySongsLink = document.createElement("A");
			emptySongsLink.setAttribute("href", "javascript:void(0);");
			emptySongsLink.setAttribute("title", "Toggle Empty Songs");
			emptySongsLink.setAttribute("class", "headlink");
			emptySongsLink.innerHTML = "E" + (GM_getValue("HIDE_EMPTY_SONGS", true) ? "+" : "-");

			emptySongsLink.addEventListener('click', function (event) {
				var rows = this.parentNode.parentNode.parentNode.getElementsByTagName("TR");
				var showing = this.innerHTML == "E+";
				var isCurTierVisible = false;

				for (var i = 1, row; row = rows[i]; i++) {
					if (isTierRow(row)) {
						isCurTierVisible = row.getElementsByTagName("TD")[0].innerHTML == "-";
					} else if (isEmptySongRow(row)) {
						row.style.display = isCurTierVisible && showing ? '' : 'none';
					}
				}

				this.innerHTML = showing ? "E-" : "E+";
				this.setAttribute("title", (showing ? "Hide" : "Show") + " Empty Songs");
				GM_setValue("HIDE_EMPTY_SONGS", !showing);
			}, false);


			toggleTiersLink = document.createElement("A");
			toggleTiersLink.setAttribute("href", "javascript:void(0);");
			toggleTiersLink.setAttribute("title", "Toggle All Tiers");
			toggleTiersLink.setAttribute("class", "headlink");
			toggleTiersLink.innerHTML = "T" + (GM_getValue("COLLAPSE_TIERS", true) ? "+" : "-");

			toggleTiersLink.addEventListener('click', function (event) {
				var rows = this.parentNode.parentNode.parentNode.getElementsByTagName("TR");
				var expanding = this.innerHTML == "T+";

				for (var i = 1, row; row = rows[i]; i++) {
					if (isTierRow(row)) {
						var isExpanded = isTierExpanded(row);

						if ((expanding && !isExpanded) || (!expanding && isExpanded)) {
							tierToggleLinkOnClick(row.getElementsByTagName("TD")[0]);
						}
					}
				}

				this.innerHTML = expanding ? "T-" : "T+";
				this.setAttribute("title", (expanding ? "Hide" : "Show") + " All Tiers");
				GM_setValue("COLLAPSE_TIERS", !expanding);
			}, false);


			// insert the links if they've been created
			if (null != toggleTiersLink || null != emptySongsLink) {
				cols[0].innerHTML = "";
			}

			if (null != toggleTiersLink) {
				cols[0].appendChild(toggleTiersLink);
			}

			if (null != toggleTiersLink && null != emptySongsLink) {
				cols[0].appendChild(document.createTextNode(" "));
			}

			if (null != emptySongsLink) {
				cols[0].appendChild(emptySongsLink);
			}

			// create ajax insert form
//			var newRow = document.createElement("TR");
//			newRow.innerHTML = "<td></td> <td></td> <td></td>";
		} else if (isTierRow(row)) {
			// add toggle current tier handler

			var newCol = document.createElement("TD");
			newCol.setAttribute("class", "tier1");
			newCol.setAttribute("align", "center");
			newCol.setAttribute("title", "Toggle Tier");
			newCol.appendChild(document.createTextNode("-"));

			row.addEventListener('click', function () {
				tierToggleLinkOnClick(
					this.getElementsByTagName("TD")[0]
				);
			}, false);

			cols[0].setAttribute("colspan", "2");
			cols[0].parentNode.insertBefore(newCol, cols[0]);

			if (GM_getValue("COLLAPSE_TIERS", true))
				tierToggleLinkOnClick(newCol);
		} else {
			if (isEmptySongRow(row) && GM_getValue("HIDE_EMPTY_SONGS", true))
				row.style.display = 'none';

			// convert insert link

//			cols[0].getElementsByTagName("A")[0].href = "javascript:alert('hi');";
		}
	}
	} // end !!scoreTable

function isTierRow(row) {
	var cols = row.getElementsByTagName("TD");
//		!row.getAttribute("class") &&
//		cols[0].getAttribute("class") == "tier1" &&
	var ret =
		cols[0].getAttribute("colspan") == "3" ||
		(cols[1] &&
		cols[1].getAttribute("colspan") == "2");

	return ret;
}

function isEmptySongRow(row) {
	if (isTierRow(row)) return false;

	var col = document.evaluate('./td[4]',
		row, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	var ret =
		col && col.innerHTML.indexOf("N/A") >= 0;
//	alert(cols.innerHTML);
	return ret;
}

function isTierExpanded(row) {
	var cols = row.getElementsByTagName("TD");
	var ret =
		cols[0].innerHTML == "-";

	return ret;
}

function tierToggleLinkOnClick(elm) {
	elm.innerHTML = elm.innerHTML == "+" ? "-" : "+";
	elm.setAttribute("title", (elm.innerHTML == "-" ? "Hide" : "Show") + " Tier");
	toggleTier(elm.parentNode);
}

function toggleTier(tierRow) {
	var curNode = tierRow;

	while (null != curNode) {
		curNode = curNode.nextSibling;
		if (null == curNode || curNode.nodeType != 1) continue;
		if (isTierRow(curNode)) break;

		if (GM_getValue("HIDE_EMPTY_SONGS", true) && isEmptySongRow(curNode)) {
			curNode.style.display = "none";
		} else {
			curNode.style.display = curNode.style.display == "none" ? "" : "none";
		}
	}
}

}, 'false'); // end window load listener
})();
