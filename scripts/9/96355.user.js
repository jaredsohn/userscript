// ==UserScript==
// @name           Fhu Forum Topiklista Fooldalra
// @namespace      http://freeforum.n4.hu/feliratok/
// @include        http://freeforum.n4.hu/feliratok*
// @description    A forum fooldalan kilistazza az osszes temat. A temak forumok szerint elrejthetoek/megjelenithetoek es pozicionalhatoak.
// @author         priv_sec
// @version        0.1.1B
// ==/UserScript==

//loader kep forrasa
var loaderimgsrc = '' +
'data:image/gif;base64,R0lGODlhGAAYAPQAAP%2F%2F%2FwAAAM7Ozvr6%2BuDg4LCwsOjo6I6OjsjIyJycnNjY2KioqMDAwP' +
'Ly8nZ2doaGhri4uGhoaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH%2BGkNyZWF0ZWQgd2l0aCBh' +
'amF4bG9hZC5pbmZvACH5BAAHAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAGAAYAAAFriAgjiQAQWVaDgr5POSgkoTDjFE0NoQ8' +
'iw8HQZQTDQjDn4jhSABhAAOhoTqSDg7qSUQwxEaEwwFhXHhHgzOA1xshxAnfTzotGRaHglJqkJcaVEqCgyoCBQkJBQKDDXQGDYaI' +
'ioyOgYSXA36XIgYMBWRzXZoKBQUMmil0lgalLSIClgBpO0g%2Bs26nUWddXyoEDIsACq5SsTMMDIECwUdJPw0Mzsu0qHYkw72bBm' +
'ozIQAh%2BQQABwABACwAAAAAGAAYAAAFsCAgjiTAMGVaDgR5HKQwqKNxIKPjjFCk0KNXC6ATKSI7oAhxWIhezwhENTCQEoeGCdWI' +
'PEgzESGxEIgGBWstEW4QCGGAIJEoxGmGt5ZkgCRQQHkGd2CESoeIIwoMBQUMP4cNeQQGDYuNj4iSb5WJnmeGng0CDGaBlIQEJziH' +
'k3sABidDAHBgagButSKvAAoyuHuUYHgCkAZqebw0AgLBQyyzNKO3byNuoSS8x8OfwIchACH5BAAHAAIALAAAAAAYABgAAAW4ICCO' +
'JIAgZVoOBJkkpDKoo5EI43GMjNPSokXCINKJCI4HcCRIQEQvqIOhGhBHhUTDhGo4diOZyFAoKEQDxra2mAEgjghOpCgz3LTBIxJ5' +
'kgwMBShACREHZ1V4Kg1rS44pBAgMDAg%2FSw0GBAQGDZGTlY%2BYmpyPpSQDiqYiDQoCliqZBqkGAgKIS5kEjQ21VwCyp76dBHiN' +
'vz%2BMR74AqSOdVwbQuo%2Babppo10ssjdkAnc0rf8vgl8YqIQAh%2BQQABwADACwAAAAAGAAYAAAFrCAgjiQgCGVaDgZZFCQxqK' +
'NRKGOSjMjR0qLXTyciHA7AkaLACMIAiwOC1iAxCrMToHHYjWQiA4NBEA0Q1RpWxHg4cMXxNDk4OBxNUkPAQAEXDgllKgMzQA1pSY' +
'opBgonCj9JEA8REQ8QjY%2BRQJOVl4ugoYssBJuMpYYjDQSliwasiQOwNakALKqsqbWvIohFm7V6rQAGP6%2BJQLlFg7KDQLKJrL' +
'jBKbvAor3IKiEAIfkEAAcABAAsAAAAABgAGAAABbUgII4koChlmhokw5DEoI4NQ4xFMQoJO4uuhignMiQWvxGBIQC%2BAJBEUyUc' +
'IRiyE6CR0CllW4HABxBURTUw4nC4FcWo5CDBRpQaCoF7VjgsyCUDYDMNZ0mHdwYEBAaGMwwHDg4HDA2KjI4qkJKUiJ6faJkiA4qA' +
'KQkRB3E0i6YpAw8RERAjA4tnBoMApCMQDhFTuySKoSKMJAq6rD4GzASiJYtgi6PUcs9Kew0xh7rNJMqIhYchACH5BAAHAAUALAAA' +
'AAAYABgAAAW0ICCOJEAQZZo2JIKQxqCOjWCMDDMqxT2LAgELkBMZCoXfyCBQiFwiRsGpku0EshNgUNAtrYPT0GQVNRBWwSKBMp98' +
'P24iISgNDAS4ipGA6JUpA2WAhDR4eWM%2FCAkHBwkIDYcGiTOLjY%2BFmZkNlCN3eUoLDmwlDW%2BAAwcODl5bYl8wCVYMDw5UWz' +
'BtnAANEQ8kBIM0oAAGPgcREIQnVloAChEOqARjzgAQEbczg8YkWJq8nSUhACH5BAAHAAYALAAAAAAYABgAAAWtICCOJGAYZZoOpK' +
'KQqDoORDMKwkgwtiwSBBYAJ2owGL5RgxBziQQMgkwoMkhNqAEDARPSaiMDFdDIiRSFQowMXE8Z6RdpYHWnEAWGPVkajPmARVZMPU' +
'kCBQkJBQINgwaFPoeJi4GVlQ2Qc3VJBQcLV0ptfAMJBwdcIl%2BFYjALQgimoGNWIhAQZA4HXSpLMQ8PIgkOSHxAQhERPw7ASTSF' +
'yCMMDqBTJL8tf3y2fCEAIfkEAAcABwAsAAAAABgAGAAABa8gII4k0DRlmg6kYZCoOg5EDBDEaAi2jLO3nEkgkMEIL4BLpBAkVy3h' +
'CTAQKGAznM0AFNFGBAbj2cA9jQixcGZAGgECBu%2F9HnTp%2BFGjjezJFAwFBQwKe2Z%2BKoCChHmNjVMqA21nKQwJEJRlbnUFCQ' +
'lFXlpeCWcGBUACCwlrdw8RKGImBwktdyMQEQciB7oACwcIeA4RVwAODiIGvHQKERAjxyMIB5QlVSTLYLZ0sW8hACH5BAAHAAgALA' +
'AAAAAYABgAAAW0ICCOJNA0ZZoOpGGQrDoOBCoSxNgQsQzgMZyIlvOJdi%2BAS2SoyXrK4umWPM5wNiV0UDUIBNkdoepTfMkA7thI' +
'ECiyRtUAGq8fm2O4jIBgMBA1eAZ6Knx%2BgHaJR4QwdCMKBxEJRggFDGgQEREPjjAMBQUKIwIRDhBDC2QNDDEKoEkDoiMHDigICG' +
'kJBS2dDA6TAAnAEAkCdQ8ORQcHTAkLcQQODLPMIgIJaCWxJMIkPIoAt3EhACH5BAAHAAkALAAAAAAYABgAAAWtICCOJNA0ZZoOpG' +
'GQrDoOBCoSxNgQsQzgMZyIlvOJdi%2BAS2SoyXrK4umWHM5wNiV0UN3xdLiqr%2BmENcWpM9TIbrsBkEck8oC0DQqBQGGIz%2Bt3' +
'eXtob0ZTPgNrIwQJDgtGAgwCWSIMDg4HiiUIDAxFAAoODwxDBWINCEGdSTQkCQcoegADBaQ6MggHjwAFBZUFCm0HB0kJCUy9bAYH' +
'CCPGIwqmRq0jySMGmj6yRiEAIfkEAAcACgAsAAAAABgAGAAABbIgII4k0DRlmg6kYZCsOg4EKhLE2BCxDOAxnIiW84l2L4BLZKip' +
'BopW8XRLDkeCiAMyMvQAA%2BuON4JEIo%2BvqukkKQ6RhLHplVGN%2BLyKcXA4Dgx5DWwGDXx%2BgIKENnqNdzIDaiMECwcFRgQC' +
'CowiCAcHCZIlCgICVgSfCEMMnA0CXaU2YSQFoQAKUQMMqjoyAglcAAyBAAIMRUYLCUkFlybDeAYJryLNk6xGNCTQXY0juHghACH5' +
'BAAHAAsALAAAAAAYABgAAAWzICCOJNA0ZVoOAmkY5KCSSgSNBDE2hDyLjohClBMNij8RJHIQvZwEVOpIekRQJyJs5AMoHA%2BGMb' +
'E1lnm9EcPhOHRnhpwUl3AsknHDm5RN%2Bv8qCAkHBwkIfw1xBAYNgoSGiIqMgJQifZUjBhAJYj95ewIJCQV7KYpzBAkLLQADCHOt' +
'OpY5PgNlAAykAEUsQ1wzCgWdCIdeArczBQVbDJ0NAqyeBb64nQAGArBTt8R8mLuyPyEAOwAAAAAAAAAAAA%3D%3D';

//GM_setValue/GM_getValue-hoz
var mainPrefix = "fapados.";
var boardIndexPrefix = "boardindex.";
var displayPrefix = "display.";
var positionPrefix = "position.";

//icons table, ez ele szurodik be minden
var itb = document.getElementById('posting_icons'); // loader + main wrapper miatt itt

// main wrapper a topikoknak
var mainwdiv = document.createElement('div');
mainwdiv.setAttribute('id','main_topicWrapper');
mainwdiv.setAttribute('style','display:none');
itb.parentNode.insertBefore(mainwdiv,itb);

//id generalasahoz, ekezetekes betukkel gond volt
function toNum(inputStr) {
	var ret = "";
	for (i=0;i<inputStr.length;i++) {
		ret = ret + '' + inputStr.charCodeAt(i);
	}
	return ret
}

function setOrder() { // ha valtozik a topikok sorrendje, mentsd
	topicWrapperFull = document.getElementById('main_topicWrapper').childNodes;
	for (i=0;i<topicWrapperFull.length;i++) {
		if (i == 0)
		{
			var setlist = "";
			setlist = topicWrapperFull[i].getAttribute('id').match(/^topicWrapper:(.*)$/)[1];
		}
		else
			setlist = setlist + "|" + topicWrapperFull[i].getAttribute('id').match(/^topicWrapper:(.*)$/)[1];
	}
	GM_setValue(mainPrefix + boardIndexPrefix + positionPrefix + "topicWrappers",setlist)
}

function loadOrder() { //betolteskor rendezd a topikokat, mentsd az elrendezest
	// topicWrapperSet, topicWrapper beallitasa
	topicWrapperSet = GM_getValue(mainPrefix + boardIndexPrefix + positionPrefix + "topicWrappers", "" +
	" | | | | " +
	" | ").split("|");
	topicWrapperFull = document.getElementById('main_topicWrapper').childNodes;
	var topicWrapper = new Array();
	for (i=0;i<topicWrapperFull.length;i++) {
		topicWrapper[i] = topicWrapperFull[i].getAttribute('id').match(/^topicWrapper:(.*)$/)[1];
	}
	var _topicNr = 0;
	var topicOrder = new Array();
	var _output = "";
	for (i = 0; i < topicWrapperSet.length; i++) { //pl: [a b c d]
		for (k = 0; k < topicWrapper.length; k++) {
			if (topicWrapperSet[i] == topicWrapper[k]) { //pl: [c d a f]
				//_output = _output + topicWrapper[k] + "\r\n";
				topicOrder[_topicNr] = topicWrapperFull[k];
				_topicNr++;
				topicWrapper[k] = "ures";
			}
		}
	}
	for (i=0;i<topicWrapper.length;i++) {
		if (topicWrapper[i] != "ures") {
		//_output = _output + topicWrapper[i]  + "\r\n";
		topicOrder[_topicNr] = topicWrapperFull[i];
		_topicNr++;
		}
	}
	var _cnr;
	var mtw = document.getElementById('main_topicWrapper');
	for (i=0;i<topicOrder.length;i++) {
		_cnr = (i-(topicOrder.length-1))*(-1); //forditott sorrendben
		mtw.childNodes[0].parentNode.insertBefore(topicOrder[_cnr],mtw.childNodes[0]);
	}
	setOrder();
}


// topikok elrejtese/megjelenitese - rendezese kattintaskor
document.addEventListener('click', function(event) {
	var displayValue;
	var q = /^reOrder:(.*)$/;
	var str = event.target.getAttribute('id');
	var uod = event.target.getAttribute('name');
	if (/reOrder:/.test(str) == true) { //dunno if this actually improves speed, I might benchmark it sometime
		var ab = document.getElementById('topicWrapper:' + str.match(q)[1]); // a jelenlegi topicWrapper
		if (ab != null) { // ha letezik topicWrapper ilyen id-vel
			var currentNode = ab;
			var exitw = false;
			while (exitw == false) {
				if (uod == "up" && currentNode.previousSibling != null) {
					currentNode = currentNode.previousSibling;
				} else if (uod = "down" && currentNode.nextSibling != null) {
					currentNode = currentNode.nextSibling; // mert az elozo elotti ele kell beszurni (elozo moge)
				}
				if (currentNode.nodeType != 3) //
					exitw = true;
			}
			if (currentNode == null || /topicWrapper:/.test(currentNode.getAttribute('id')) == false || currentNode == ab)
				reserved_for_later_use = ""; //elso a listaban, nem kell csinalni semmit
			else {
				if (uod == "up") {
					ab.parentNode.removeChild(ab); //torold a jelenlegi helyerol
					currentNode.parentNode.insertBefore(ab,currentNode); //szurd be az elotte levo ele
				} else if (uod = "down") {
					currentNode.parentNode.removeChild(currentNode); //torold a jelenlegi helyerol
					ab.parentNode.insertBefore(currentNode,ab); 
					//mert az elozo elotti ele kell beszurni (vagyis az elozot kell ez ele)
				}
				setOrder(); //sorrend mentese
			}
		}
	} else if (document.getElementById(event.target.getAttribute("name")) != null) {			
		if (document.getElementById(event.target.getAttribute("name")).style.display == "none") {
			displayValue = "inline";
		} else { 
			displayValue = "none";
		}
		document.getElementById(event.target.getAttribute("name")).style.display = displayValue;
		GM_setValue(mainPrefix + boardIndexPrefix + displayPrefix + event.target.getAttribute("name"),displayValue)
	}
}, true);

var allDivs, thisDiv, x;
allDivs = document.evaluate(
	"//a[@class='subject']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i= 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	var itnum = i;
	var maxkornum = allDivs.snapshotLength; //hogy meg lehessen allapitani, hany forum topik lesz
	//loader
	if (itnum == 1) { //elso kor
		//loaderimg.setAttribute('src') = "http://ajaxload.info/images/exemples/5.gif"; //kulso kep forrasa
		loader = document.createElement('div');
		loader.innerHTML = '<center><img src="' + loaderimgsrc +'" style="margin-bottom:50px;margin-top:30px"></center>';
		itb.parentNode.insertBefore(loader,itb);
		// alapertelmezett tablazat elrejt?se
		document.getElementById('boardindex_table').setAttribute('style','display:none'); 
		itb.setAttribute('style','display:none;'); // ikonok tablazat elrejtese
	}
	// loader vege
	////////////////////////////////////
	GM_xmlhttpRequest({
		method: 'GET',
		url: thisDiv.href,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/html,application/xhtml+xml,application/xml;',
		},
		onload: function(responseDetails) {
			//turning the text into a dom object
			var doc = document.createElement('div');
			doc.innerHTML = responseDetails.responseText;
			forumTitle = toNum(doc.getElementsByTagName('title')[0].innerHTML);
			forumTitlePlainText = doc.getElementsByTagName('title')[0].innerHTML;
			allDivs = document.evaluate(
				"//table[@class='table_grid']",
				doc,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
			// http valasz tbody eleme
			for (var i= 0; i < allDivs.snapshotLength; i++) {
				thisDiv = allDivs.snapshotItem(i);
				x = thisDiv.getElementsByTagName('tbody')[0];
				var wt = document.createElement("table"); //wrapper table
				var wtr = document.createElement("tr"); //wrapper tr
				var wtd = document.createElement("td");
				wtd.appendChild(wt);
				wtr.appendChild(wtd);

				var itb = document.getElementById('posting_icons');
				wt.setAttribute('style','width:100%;');
				
				// temak cime fejlec
				var	us = document.createElement('span');
				us.setAttribute('class','clear upperframe');
				us.appendChild(document.createElement('span'));
				var	rf = document.createElement('div');
				rf.setAttribute('class','roundframe');
				var	ls = document.createElement('span');
				ls.setAttribute('class','lowerframe');
				ls.appendChild(document.createElement('span'));
				var	idiv = document.createElement('div');
				idiv.setAttribute('style','cursor:pointer');
				idiv.setAttribute('class','cat_bar');
				idiv.setAttribute('name',forumTitle);
				idiv.innerHTML = '<h3 class="catbg" name="' + forumTitle + '" style="font-size:1.4em"><strong name="' + 
				forumTitle + '">' + forumTitlePlainText + '</strong> ' +
				'<span style="font-size:0.6em;margin-right:10px" name="' + forumTitle + '">(elrejt&eacute;s / megjelen&iacute;t&eacute;s)</span>' +
				'<span style="font-size:0.7em" name="up" id="reOrder:' + forumTitle + '">[Fel]</span>' +
				' / ' +
				'<span style="font-size:0.7em" name="down" id="reOrder:' + forumTitle + '">[Le]</span>' +
				'</h3>';
				rf.appendChild(idiv);
				
				var	wdiv = document.createElement('div');
				wdiv.appendChild(us);
				wdiv.appendChild(rf);
				wdiv.appendChild(ls);
				
				thisDiv.setAttribute('style','margin-bottom:20px;width:100%'); //thisDiv=topikok			
				tableWrapper = document.createElement('div');
				tableWrapper.setAttribute('id',forumTitle);
				tableWrapper.appendChild(thisDiv);
				tableWrapper.setAttribute('style','display:' + 
				GM_getValue(mainPrefix + boardIndexPrefix + displayPrefix + forumTitle,"inline"));
				
				var topicwdiv = document.createElement('div');
				topicwdiv.setAttribute('id','topicWrapper:' + forumTitle);
				topicwdiv.appendChild(wdiv);
				topicwdiv.appendChild(tableWrapper);
				
				mainwdiv.appendChild(topicwdiv); // main_topicWrapper, ebbe toltodik be az egesz
				
				if (mainwdiv.childNodes.length == maxkornum) { 
				// csak az utolso kornel tolti be ezeket, vagyis akkor, ha annyi divet szurt be, 
				// amennyi a-nak a hrefjebol betoltotte az cimet!
				// ha nem sikerult annyi divet beszurni, mint ahany href van, nem fog betoltodni!
					loadOrder();
					loader.parentNode.removeChild(loader);
					//itb.parentNode.insertBefore(mainwdiv,itb); //mar beszurva az elejen
					mainwdiv.setAttribute('style','display:inline');
				}
			} // Enf of for (table)
		} // End of onload
	}); // End of GM_xmlhttpRequest
} // End of IT ALL