// ==UserScript==
// @name           Popmundo Jam Helper
// @namespace      Scriptmundo
// @description    When you choose what to jam, only check not 100% jammed songs with just one click.
// @include        http://www*.popmundo.com/Common/artist.asp?action=ViewRepertoire&ArtistID=*
// @include http://www*.popmundo.com/Common/Artist.asp?action=SetRepertoirePractise
// ==/UserScript==


function xpathNode(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function xpathNodes(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xpathNodeBool(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.BOOLEAN_TYPE, null);
}

const SONGS_LEVELS_XPATH = "/html/body/table[3]/tbody/tr/td[1]/table[2]/tbody/tr/td/form/table/tbody/tr/td[1]/img[2]";
const BUTTON_TD_XPATH = "/html/body/table[3]/tbody/tr/td[1]/table[2]/tbody/tr/td/form/table/tbody/tr[last()]/td[last()]";
const BAND_BUS_XPATH = "boolean(count(/html/body/table/tbody/tr/td/div/table/tbody/tr/td/div/table/tbody/tr/td/a[contains(@href, 'ransport')]) >= 1)";

var isBandRepertoire = xpathNodeBool(BAND_BUS_XPATH).booleanValue;

if (isBandRepertoire) {

	var buttonTD = xpathNode(BUTTON_TD_XPATH);

	var toggleButton = document.createElement('input');
	toggleButton.setAttribute('type', 'button');
	toggleButton.setAttribute('value', 'Toggle not 100% Jammed');
	toggleButton.addEventListener('click', toggleNotFullyJamed, false);
	buttonTD.insertBefore(toggleButton, buttonTD.firstChild);
}

function toggleNotFullyJamed() {
	var songNodes = xpathNodes(SONGS_LEVELS_XPATH);
	
	for (var i = 0; i < songNodes.snapshotLength; i++) {	
		songRow = songNodes.snapshotItem(i);
		
		var percentJam = songRow.alt.match(/(\d{1,3})%/)[1];
		var j = i + 2;
		var checkBoxXPATH = "/html/body/table[3]/tbody/tr/td[1]/table[2]/tbody/tr/td/form/table/tbody/tr[" + j + "]/td[1]/input";
		var jamCheckBox = xpathNode(checkBoxXPATH);
		
		jamCheckBox.checked = (percentJam < 100) ? !jamCheckBox.checked : jamCheckBox.checked;
	}
	
}