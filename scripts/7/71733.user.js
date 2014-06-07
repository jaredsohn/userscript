// ==UserScript==
// @name           Greasemungo Skill Levels As Numbers
// @description    Popmundo: Show the skill levels as numbers (2010-06-27)
// @namespace      kenmooda@gmail.com
// @include        http://*.popmundo.com/Common/CharacterDetails.asp?action=MySkills*
// @include        http://*.popmundo.com/Common/CharacterDetails.asp?action=Skills*
// @include        http://*.popmundo.com/Common/CharacterDetails.asp?action=SelectSkill*
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////////
//
//    Greasemungo Skill Levels As Numbers
//    Copyright (C) 2010  Tommi Rautava
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
////////////////////////////////////////////////////////////////////////////////

const SKILL_ROW_XPATH = "/html/body/table[3]/tbody/tr/td[1]/div[2]/form/div/table/tbody/tr";
const SIMPLE_SKILL_ROW_XPATH = "/html/body/table[3]/tbody/tr/td[1]/div[2]/table[1]/tbody/tr";

////////////////////////////////////////////////////////////////////////////////

function xpathNodes(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function processGroupedList() {
	var nodes = xpathNodes(SKILL_ROW_XPATH);
	
	if (nodes.snapshotLength == 0) {
		nodes = xpathNodes(SIMPLE_SKILL_ROW_XPATH);
	}
	
	for (var rowIdx = nodes.snapshotLength - 1; rowIdx >= 0; rowIdx--) {
		var node = nodes.snapshotItem(rowIdx);

		if (node.cells.length < 2) continue;
		
		var scoreCell = node.cells.item(1);
		
		var score = 0;
		var progress = 0;
		
		for (var imgIdx = scoreCell.childNodes.length - 1; imgIdx >= 0; imgIdx--) {
			var img = scoreCell.childNodes.item(imgIdx);
		
			if (img.tagName != "IMG") continue;

			if (img.alt == "*") {
				++score;
			}
			else {
				var res = img.alt.match(/(\d+)%/);
				
				if (res) {
					progress = parseInt(res[1]);
				}
			}

			//img.parentNode.removeChild(img);
		}
		
		if (progress > 0 && progress < 100) {
			score = score + progress / 100;
		}
		
		var skillNameCell = node.cells.item(0);
		var skillNameCellWidth = parseInt(skillNameCell.getAttribute("width"));
		skillNameCell.setAttribute("width", skillNameCellWidth - 20);
		
		var td = document.createElement("td");
		td.setAttribute("width", 20);
		td.setAttribute("style", "text-align:right;");
		td.appendChild(document.createTextNode(score.toFixed(2)));
		node.appendChild(td);
	}
}

function processSimpleList() {
	var nodes = xpathNodes(SIMPLE_SKILL_ROW_XPATH);
	
	for (var rowIdx = nodes.snapshotLength - 1; rowIdx >= 0; rowIdx--) {
		var node = nodes.snapshotItem(rowIdx);

		if (node.cells.length < 2) continue;
		
		var scoreCell = node.cells.item(1);
		
		var score = 0;
		
		for (var imgIdx = scoreCell.childNodes.length - 1; imgIdx >= 0; imgIdx--) {
			var img = scoreCell.childNodes.item(imgIdx);
		
			if (img.tagName != "IMG") continue;

			if (img.alt == "*") {
				++score;
			}

			//img.parentNode.removeChild(img);
		}
		
		var skillNameCell = node.cells.item(0);
		var skillNameCellWidth = parseInt(skillNameCell.getAttribute("width"));
		skillNameCell.setAttribute("width", skillNameCellWidth - 10);
		
		var td = document.createElement("td");
		td.setAttribute("width", 10);
		td.setAttribute("style", "text-align:right;");
		td.appendChild(document.createTextNode(score));
		node.appendChild(td);
	}
}

if (document.location.search.match(/=skills/i)) {
	processSimpleList();
}
else {
	processGroupedList();
}

// EOF