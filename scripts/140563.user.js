// ==UserScript==

// @name           Farmbot

// @namespace      Kongolan

// @version        1.4

// @include        http://*.travian.*/build.php?*tt=99*

// @include        http://*.travian.*/login.php

// @include	   http://*.travian.*dorf3*

// @include        http://*.travian.*position_details.php* 

// @include        http://*.travian.*statistiken.php*

// @exclude 	   *.css

// @exclude 	   *.js
// ==/UserScript==

var Troops = {
	Name : [
			// Romans
			[ "Legionnaire", "Praetorian", "Imperian", "Equites Legati",
					"Equites Imperatoris", "Equites Caesaris", "Battering Ram",
					"Fire Catapult", "Senator", "Settler", "Hero" ],
			// Teutons
			[ "Clubswinger", "Spearman", "Axeman", "Scout", "Paladin",
					"Teutonic Knight", "Ram", "Catapult", "Chief", "Settler",
					"Hero" ],
			// Gauls
			[ "Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder",
					"Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain",
					"Settler", "Hero" ] ],

	Speed : [
	// Romans Speed
	[ 6, 5, 6, 16, 14, 10, 4, 3, 5, 4, 16 ],
	// Teutons Speed
	[ 7, 7, 6, 9, 10, 9, 4, 3, 4, 5, 10 ],
	// Gauls Speed
	[ 7, 6, 17, 19, 16, 13, 4, 3, 5, 5, 10 ] ]
};

var dict = {
	en : {
		today : "today",
		yesterday : "yesterday"
	},
	de : {
		today : "heute",
		yesterday : "gestern"
	}
};

var Config = {};

Config.DMin = 10;

Config.DMax = 15;

Config.Save = function() {
	GM_setValue(dataIndex + "_Lang_", Doc.Element("lang").value);
	GM_setValue(dataIndex + "_Time_", Doc.Element("time").value);

	aLists = GM_getValue(dataIndex + "_all", "");
	for ( var i = 0; i < aLists.split("$").length - 1; i++) {
		ListID = aLists.split("$")[i];

		GM_setValue(dataIndex + "_Pause_" + ListID,
				Doc.Element("p_" + ListID).checked);

		overfarm = Doc.Element("overf_" + ListID).checked;
		if (overfarm) {
			interv = Doc.Element("int_" + ListID).value;
			min_max = interv.split("-");
			min = min_max[0] * 3;
			max = min_max[1] * 3;
			GM_setValue(dataIndex + "_Interval_" + ListID, min + "-" + max);
		} else {
			GM_setValue(dataIndex + "_Interval_" + ListID, Doc.Element("int_"
					+ ListID).value);
			// GM_setValue(dataIndex + "_OverFarmed_" + ListIndex, false);
		}
		GM_setValue(dataIndex + "_WaitTime_" + ListID, Doc.Element("wait_"
				+ ListID).value);
		GM_setValue(dataIndex + "_RowDistance_" + ListID, Doc
				.Element("distance_" + ListID).value);
		GM_setValue(dataIndex + "_OverFarm_" + ListID, overfarm);
		GM_setValue(dataIndex + "_YellowFarm_" + ListID, Doc.Element('yelf_'
				+ ListID).checked);
	}
};

Config.Board = function() {
	aLists = GM_getValue(dataIndex + "_all", "");
	if (aLists.length > 0) {
		GM_setValue(dataIndex + "_GoldClub_", "1");

		ctnt = Doc.Element("content");

		// Language
		lang = GM_getValue(dataIndex + "_Lang_", "de");
		tdLang = Doc.New("td");
		tdLSel = Doc.New("select", [ [ 'id', 'lang' ] ]);
		tdLang.appendChild(tdLSel);
		tdLOp0 = Doc.New("option", [ [ 'value', 'de' ] ]);
		tdLOp0.innerHTML = 'de';
		tdLOp1 = Doc.New("option", [ [ 'value', 'en' ] ]);
		tdLOp1.innerHTML = 'en';
		if (lang == "de")
			tdLOp0.selected = true;
		else if (lang == "en")
			tdLOp1.selected = true;
		tdLSel.appendChild(tdLOp0);
		tdLSel.appendChild(tdLOp1);

		// Timecheck Off/On
		tdTime = Doc.New("td");
		tdTSel = Doc.New("select", [ [ 'id', 'time' ] ]);
		tdTime.appendChild(tdTSel);
		tdTOp0 = Doc.New("option", [ [ 'value', '0' ] ]);
		tdTOp0.innerHTML = 'on';
		tdTOp1 = Doc.New("option", [ [ 'value', '1' ] ]);
		tdTOp1.innerHTML = 'off';
		time = GM_getValue(dataIndex + "_Time_", "0");
		if (time == "0")
			tdTOp0.selected = true;
		else if (time == "1")
			tdTOp1.selected = true;
		tdTSel.appendChild(tdTOp0);
		tdTSel.appendChild(tdTOp1);

		// Save
		tdBut = Doc.New("td");
		saveImg = Doc.New("img", [ [ 'src', Images.Save ], [ 'width', '28px' ],
				[ 'height', '28px' ], [ 'alt', 'Save' ], [ 'title', 'Save' ] ]);
		saveImg.addEventListener("click", function() {
			Config.Save();
		}, false);
		tdBut.appendChild(saveImg);

		BTable = Doc.New("table", [ [ "cellpadding", 1 ], [ "cellspacing", 1 ],
				[ "style", "margin-top: 10px;" ], [ "class", "" ] ]);
		BTable.innerHTML = "<thead><tr><th>Name</th><th>LastSent</th><th>NextSent</th>"
				+ "<th><img src='"
				+ Images.Interval
				+ "' alt='interval' title='interval' width='16px' height='16px'></th>"
				+ "<th><img src='"
				+ Images.Pause
				+ "' alt='pause' title='pause' width='16px' height='16px'></th>"
				+ "<th><img src='"
				+ Images.Repeat
				+ "' alt='overfarm' title='overfarm' width='16px' height='16px'</th>"
				+ "<th><img "
				+ Images.YellowSword
				+ "alt ='yellowfarm' title='yellowfarm'></th>"
				+ "<th><img src='"
				+ Images.WaitTime
				+ "' alt='waittime' title='waittime' width='16px' height='16px'</th>"
				+ "<th>Dist</th></tr></thead>";
		BTableBody = Doc.New("tbody");
		BTable.appendChild(BTableBody);

		for ( var i = 0; i < aLists.split("$").length - 1; i++) {
			ListID = aLists.split("$")[i];

			tr = Doc.New("tr", [ [ 'class', 'hover' ] ]);

			// Name
			tdName = Doc.New("td", [ [ 'class', 'vil fc' ],
					[ 'style', 'font-size:9px;' ] ]);
			tdName.innerHTML = GM_getValue(dataIndex + "_Name_" + ListID, "");

			// Last send
			tdLast = Doc.New("td", [ [ 'style', 'font-size:9px;' ] ]);
			tdLast.innerHTML = GM_getValue(dataIndex + "_LastSent_" + ListID,
					"");

			// Next send
			tdNext = Doc.New("td", [ [ 'style', 'font-size:9px;' ] ]);
			tdNext.innerHTML = GM_getValue(dataIndex + "_NextSent_" + ListID,
					"");

			// Overfarm
			overfarm = GM_getValue(dataIndex + "_OverFarm_" + ListID, false);
			tdOverF = Doc.New("td");
			tdInpF = Doc.New("input", [ [ 'type', 'checkbox' ],
					[ 'id', 'overf_' + ListID ] ]);
			tdOverF.appendChild(tdInpF);
			if (overfarm)
				tdInpF.checked = true;
			else
				tdInpF.checked = false;

			// YelloFarm
			yellowfarm = GM_getValue(dataIndex + "_YellowFarm_" + ListID, false);
			tdYelF = Doc.New("td");
			tdInpYF = Doc.New("input", [ [ 'type', 'checkbox' ],
					[ 'id', 'yelf_' + ListID ] ]);
			tdYelF.appendChild(tdInpYF);
			if (yellowfarm)
				tdInpYF.checked = true;
			else
				tdInpYF.checked = false;

			// Interval
			iInterval = GM_getValue(dataIndex + "_Interval_" + ListID, "1-1");
			if (overfarm) {
				min_max = iInterval.split("-");
				min = min_max[0] / 3;
				max = min_max[1] / 3;
				iInterval = min + "-" + max;
			}
			tdInterval = Doc.New("td");
			tdInp = Doc.New("input", [ [ 'type', 'text' ], [ 'class', 'text' ],
					[ 'size', 1 ], [ 'id', 'int_' + ListID ],
					[ 'value', iInterval ] ]);
			tdInterval.appendChild(tdInp);

			// WaitTime
			waitTime = GM_getValue(dataIndex + "_WaitTime_" + ListID, "6");

			tdWaitTime = Doc.New("td");

			tdInpW = Doc.New("input", [ [ 'type', 'text' ],
					[ 'class', 'text' ], [ 'size', 1 ],
					[ 'id', 'wait_' + ListID ], [ 'value', waitTime ] ]);

			tdWaitTime.appendChild(tdInpW);

			// Distance
			rowDistance = GM_getValue(dataIndex + "_RowDistance_" + ListID,
					"280");
			tdRowDis = Doc.New("td");
			tdInpRD = Doc.New("input", [ [ 'type', 'text' ],
					[ 'class', 'text' ], [ 'size', 1 ],
					[ 'id', 'distance_' + ListID ], [ 'value', rowDistance ] ]);
			tdRowDis.appendChild(tdInpRD);

			// Pause
			paused = GM_getValue(dataIndex + "_Pause_" + ListID, false);
			tdPause = Doc.New("td");
			tdSel = Doc.New("input", [ [ 'type', 'checkbox' ],
					[ 'id', 'p_' + ListID ] ]);
			tdPause.appendChild(tdSel);
			if (paused)
				tdSel.checked = true;
			else
				tdSel.checked = false;

			tr.appendChild(tdName);
			tr.appendChild(tdLast);
			tr.appendChild(tdNext);
			tr.appendChild(tdInterval);
			tr.appendChild(tdPause);
			tr.appendChild(tdOverF);
			tr.appendChild(tdYelF);
			tr.appendChild(tdWaitTime);
			tr.appendChild(tdRowDis);

			BTableBody.appendChild(tr);
		}
	} else
		GM_setValue(dataIndex + "_GoldClub_", "0");

	ctnt.appendChild(BTable);
	ctnt.appendChild(tdBut);
	ctnt.appendChild(tdLang);
	ctnt.appendChild(tdTime);
};

var Images = {
	Pause : 'data:image/gif;base64,R0lGODlhFwAXAMZQAFVXU1ZYVFdZVVdZVlhaVllbV1lbWFtdWV9gXmJlYGNlY2VmYmVmY2VnZGdpZm1va8vLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2djb1Nra2tvb29zc3N3d3dve2d7e3t7g29/h3OHh4eHj3+Lk3+Lk4OTk5OPl4OPl4eTl4uXl5eTm4uXm4uXm4+Xn4+bn4+fn5+jo6Ofp5ujp5ujq5+rq6urr6Ovs6ezs7O7u7e7u7u/w7vj5+Pn5+Pr6+fr7+vv7+/v8+/z8+/z8/Pz9/P39/P39/f3+/f7+/v///v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ywAAAAAFwAXAAAH/oBQgoOEhYaHiImKi4yNUECQHhCTlB5AGpSUIIOQQBIIAKEABhBAEAOiAAkUnJATAkmDD6URBIQLFa1AFbApKkKzQBMETioqRgsWuha9vw8RQBTExkYMGLoYsCsrwBJAFsTb1Rm6GQRLNDNDDxVAF8Q0MUcMGroaBEw6OEQPFkDmTkh8SMKAgy4O+F6cKPLgApANxE6YINhBlwd8NVwYeZABSAcCT2S0UMLAgy4QBJr0yIHkgQYgF6HwwMGEwSZBQHwACVHASZAeSR5sAIISyo8eTBqE4AQDiIiesjrstDWowQhOIoCUUBCga4ADIZwW8BrAQQlOlliMEMFWxAgWKUDUtnULgxOKTnjz6uW0A1KIECX66s3byseOG4htKF5sA/GNHTodMQoEADs=',
	Resume : 'data:image/gif;base64,R0lGODlhFwAXAOeHAFlbVllbV1lcV1pcV1pcWFpdWFtdWFtdWlteW15gXV9gXmBgXmBhX2JjX2JlYWRlY2VnZGdpZWlpZ21ubG9wbnJzcXJ0cnN0cXN1cnR2cnZ2dXt8en+AfoSEg4SFhIqKiY2OjZCQjo6RjZCRj5SUk5mZmZubmpydm6SkpKurq6ysrK2trbCwr7CwsLCyrrCzsLe4t7y8vL2+u7+/v77AvsHBwcrKysvLy83Nzc7Ozs/Pz87QztDQ0NHR0dLS0tTU1NbW1tbX1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3uDg4OHh4eLi4uPj4+Pk4+Tl4+Xl5eXm4+bm5ufn5+jo6Ofp5Ofp5enp6ejq5unq5+rq6unr5+vr6+ns5+rs6Ovs6ezs7Ovt6uzt6uzt7O3t7ezu6uzu6+7u7u7v7O7w7e/w7e/w7u/x7vDx7vDx7/Hy7/Hy8PLz8vP08fP08vT08/T18/X19fX29PX29fb39ff39/f49vf49/j5+Pr6+vr7+vv8+/z8+/z8/Pz9/P39/P39/f7+/v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ywAAAAAFwAXAAAI/gDPHBpIsKDBg4fOKDwDpEeThRAjChwI8QaIFD+mSIxIsGKABBZiDNGyUWHHhTcE8HFxwIONI2Q2nlSY8tCfOCIWmMixROLMMzWxwBEUBYOEFj2gQPwZFMuWOoJ2NNAwAwiVkkAFHMKCJcuWMHv8vEDw4UYRLhtxEDgURkyZt2Xc/KEzwgEKHUok8libZg2bv2nKbFkD6EkGCjUk+ihwqIuXx1yxWKlShxANACwk/jBw6IsZNGr+qqlTyAmFCzWYSBTC982cO3n4DLITIsIKJGglElnbRg6ePoUKwVBQwsjViGAUFlmL5k0fQ0EedPChdGN1I7wDjdlQocaS5CWPQCjEfkjPCQgqklzBGpPI+AEyGJAoIgUrxJ5njEzgoOO7fYgk5WdEEgH+BxEYWlCh4BQMNjiFglRoAZ5JCFWIUEAAOw==',
	Map : 'data:image/gif;base64,R0lGODlhFwAXAOf/AM0AAGg5RjdHYjhIYzNJeqQ3PkVQZ684OZVBUVRVU1VWVFNXWlZXVXhOaVlbWHpUaH1Tbl5gXXpWb5hQWk9jhVpigKtRUU5njk9oj2VmZFlohVVpi1Nskz1yrlptkE9xl1FwnUd0q0F2sllymWlwhG9xbotodVpzmoxpdkV5tXN1cld5n6VobFl6oFp7olx6p1t8o0qAtmh7klx9pF58qXJ5jV1+pXZ7fmZ9mkyCuHp8eWt+lU+Eu1KGvX+Bfqh3d1qIuYKEgXeGmGiJsF+MvoWHhIOHloKJkW2NqH+LmG2OtmWSxIOPnKaKiWmWyXiUtqeLipCSj4yUm36Ws3uXuoqVonKZxoeWqZSWk32Zu36avX+bvnedyoCcv4GdwIadunmfzZGcqZidn5udmYmgvn2j0Yqhv4uiwJ6gnaKfo32mzYyjwZ+hno2kwo6lw6KkoZCnxbSho5mou4qr1KOoq6aopamnq4Wv1qKrs5Wty7mmqKmrqJqtxoiy2pevzZ+uwautqqiusKautqSwvqKxxZuy0K6wrZG22Ku0vLK0sZy4z5W526C31qu2xLG2uK63v6W40ba4tae607e5tqi71Ky7zqm81Z+/3LC8ypvA4rq8ua++0qy/2Li+wJ7D5bTAza3B2rHB1LnByb7BvabG47DE3cHDv7zEzLbG2cDFyKnJ5rTH4L7Gz7fH2rjI3MXHw6/L48bIxcDJ0cfJxq3N68jKx73M4MnLyMPM1MbMzsrMycHN28TN1bHR78bO1r/P4snO0MzOy7bS6cfP18rP0cTQ3svQ0rTU8c/RzsbS4MrS28jU4tDV183W3tXX1MzY5sDb88rZ7dLa4tXa3Nja1s/b6sLe9tLe7Nne4dDg9Mvj9d7g3c7i+9/h3tTj+ODi39fj8dvk7NXl+eHk4ODl6OXn5Nnp/ePo693p9+Tp7Ofp5tvr/+jq59/r+enr6Obs7t7u/+Lu/ePv/urv8u3v6+Tx//Dy7+7z9vHz8PP18vb49Pj69/r8+ff9//z/+/7//CwAAAAAFwAXAAAI/gDpCRxIsKBBgoEIKFxIYEeLhzuqEDsoMKFCCjbgtHp2bVmoNTaYUKSXcMOZas+Y8XMkjNSqX11wTDOY0AMfabtO4cIU7ZctbMaStcGhB6FCM+GU/Rsmr523Yqdk3bO3LIuJogKNEHjxrN+/TuDq1UOX7Zy+f/vIoZrBYmAFAm7u/XsUT57ddb4QVXr0Tl0zLxOwErgQKh0ib/ESxzOnNJ2sT+yYFUJgQSABDskuwbJmbl28ddX+if5HLhUeThIq0yMA4hkmVcegcfOmzdfof/kEdSrVAoBlF78IffK1qVcvWpy8iqaXS4glCL7pkcBA6Q62f/MUecq06MwXXPjG8xH74AdBdBIUyBwa3a9RnzlquMgp50yKkiwFogeqMaOVKH6iDVIGGFYsMYUztSQhCQwAHDCQETJkwQgw9NhzhRNLENEDErFM4sYTJgDww0CB2HHCGZtMEwYQPfAQQwohOPJHFg8AAABWAqVBxwhUcPJEDimI0EEIQ0DyRAM2xlEQNaPUoQENWfhxxClJ5JEFgzY24U5B7iCjyRs3GCDAAmIsMEAANqaJVTCJYBFECREwkMCc3XTzSgJp5gkFPdsEE8kedQCiySts+DDOLGxk4AMapiRShyGvOMPnLXtEoUMGDigw5yhjFDFnAgpEoAIWkegSEAA7',
	Save : 'data:image/png;base64,R0lGODlhFwAXAMZbAAAAAExCJlRUVGtXNnBbOY9ZAm1tbW5ubnR0dHV1dXd3d3l5eXt7e35+fpt+UYOEgp+BVJ+CVKCCVqKFVaKFVqOFVYiKhaSHV42OjJKSkpSUlJycnMSgAJ+fn6CgoKOjo8ifZMuhZaenp6mpqaqqqs6maKysrK2trc+qacKris2rb9Ksas+tcbGxsbKysre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMPDw8TExMXFxcnJycrKysvLy8zMzNHR0dPT09TU1PTVl9nZ2dvb29zc3N/f3+Hh4fTivO3lxOXl5e3mxebm5u7oxufn5+jo6O7qxunp6e/rx+rq6uvr6+zs7O3t7e7u7vPz8/39/f///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACwAAAAAFwAXAAAH/oBYglgchIaFiIaDi4RbHI6Qj5KOjIMcSRxDmZuanYVYV4sYCxwMpacHHKkGHAgWBQWLFkUjMyMyHjIjOLkfNSIKBVEssYIWWVJST1RSzMrKTzQFUysSxVgWWlbb3N1WQtMrF9fYW9s/6OnoL8IoDuTl3t1BwiUR8PFW6usFTiXjFipZMCePnhMVFAp4CMho4Ll07JiEmFBAiAuGsghyq1JACQgIFYV0wDjIob4fPhIQSFGhAAwbNTaQNKbRipQCAQYUOHHCRAwNM62YRKkDQAEBDW7cANIjgwUri5aYtFKFirMmyag0IWFhSShBRqbK29jCgpEqoLAQCeiirdu3PG8tEEErCMkDC3jz6t37AAlUQVSOBOGxY0eOw4hzFOYR5AgVRlaoQJn8pLLlJ5OhUPkraIvnz6BDi/YcCAA7',
	VillageFrom : 'data:image/gif;base64,R0lGODlhFwAXAOeCAKQAAJwICIQiIdwlJdwmJt4mJuAmJuInJ3tMSlVXU+U5OTRlpIhaWGVnY+xGRpldW/FMTEp2rvBRUXJ1enV1dW52gXV2dvJVVXF4gXV4e3V4fHd4enZ5fHZ5ffNbW511c/JeXn6Ae3+BfICCfV+Gt/NjY/NkZPRmZoSFgoSGgYqIZYWHgomIcIaIg4iJfoeJhPRsbIiKhY+QjfR1daONi3eYwnmZw8CKiqqRkZeZlJiZlpmalpmal5ubmq2YmJ6enq6bm5+gnqGgnqefnaGhoaKioqKjoaOjoqOjo6SkpMShoaqqqqysrK+vr7GztrOzs7i5uMm1tbq6ubq7vLi8wbm9wb29vb+/vsS+vsLCwcLCwsbBwc3Nzc7OztLS0tzQ0NPT09TU1NbW1tfX19jX19jY2Nra2tvb29vc29zc3N3d3d7e3d7e3uLe3uDg4OLi4uPj4+Tk5OXl5ebm5ufn5+np6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/j4+Pn5+f///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ywAAAAAFwAXAAAI/gD1CBxIsKBBQYIMEiQDAMAWhQgVCsQCYMYMAGQOJlRI0aJFjAUjGuyowOKBixkHiiTY0QEEkydBClw5saKECxcrGoiZkmZHDyAuImBQsQBPPSt9VDRh4uIDFD1uVCTAc2VFGCcufpABJYsUJRUHxBRJp2KJizSCXFmzRs2YKAFmDLgoUk3Fi0OOmLHDt04dOl/i0t1od4YAIUbKzKHDeE6cOHDaxAWwEggANAkyZ/67oQOFDhb+AMBBM4GeBCFEjBgxRw4HGxRqaPCT4E7pPAlS6F4R500GEhQiTOiTAM9KO8UTtGihgsUbNxgWUFhQgU8COSLvuKmd4MULFyLcawRyQmVKlSR7EoAhKyYB8hjwY7AJVASJfSRqEnghGyYBnwY56LADD38YBEgCaUTEhR1saObggw7aEZEbedQBxxldWLEEET8QQQQTTTyhRRdv3IFUQm7okUceeNhRhxyQwTHHYnTYkYdKggQEADs=',
	AttackMode : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAhpJREFUKFM1kd1Lk3EUxx/pQijqD/C+29qFBt7kosILQzFKijBKqSwpp6IVlClWhgjzLV2aMTOn5dRe1AUuc2K+ZeJcMVm2R1eTfC2VMt3z+31amh84FwfO93w55xui/Oezb1E39mVJv3NHqHFuOaBIQpRd27cpSyvr6bvDQrsj94SNbs0qvSPf9K0On1ppm8HUtcobt8ZLp0bR6zXyrXPU2HxqvW1cvyGY+PpD12CfVAtfzJHTJrnVruGZFTj9gqxWQUYzXKlborhFVe2DkzqltMltuFw9RZpVcvGZ5FKTpMQRoLBL43ywT26EpHpJQsk02Q9cBqWmw0tM8QIJZsHZRklKs6DHq2EbF5x5KklskJx8Iomv+kOO2Y2Sfn+UqNI1IsokR2ol51oCeOYFrhnJaavgeAPE10HsI8mx2yMoqSUfCDeusrcc9lXDqX+CBYFnUZDZKTgRvCH6seTgQ0Fc3hBKabObiHvfCa+SHAhaZ9g1Jn9KppYlhYOC5A7Yb5ZEli2TWRl0uGnqNxzOd6I3B4ixQn6/wL8imf0NtW5J2ls4ZBFE3XGTdNdhUN67/LobpkE1tnicxPZ1cgcEw9Man+Y1LB7Jtd4AR01eUo19amPHR91GFpZXY/rs8j41umA4+Bk/OY4VjMO/uGqbJc7o5ELROzWvomczuC26h7y6lAK74XrVAAm59mB1klXRx3PHBJY21+bmIH8BLUeFBNafPYwAAAAASUVORK5CYII=',
	Repeat : 'data:image/gif;base64,R0lGODlhEAAQAOMKACtVgCtVqiuAqlWAqlWA1ICAqoCqqoCq1Kqq1KrU1P///////////////////////yH5BAEKAA8ALAAAAAAQABAAAARW8MkHap14ghCGD4CmcV5xnFZIbVaHvMOhtuOBJMkMEEEGnIhZRgIYJG6q4SqlYyqJL8QgiZklUJnAYUo8ImRJwXQmfW2ZFwoIYDgUPpxkugIHVX0pTAQAOw==',
	Interval : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOkAAADLCAYAAACLU7TeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADsWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjEgNjQuMTQwOTQ5LCAyMDEwLzEyLzA3LTEwOjU3OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBSaWdodHM9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9yaWdodHMvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wUmlnaHRzOk1hcmtlZD0iRmFsc2UiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0idXVpZDo5MDVDNzQ2OUJDNkNFMDExQjk4RkRBMUMwREZFQUJCNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowQkY5QjdFODVDNjMxMUUxQTQwRkU3REVENDkyOEQwNSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowQkY5QjdFNzVDNjMxMUUxQTQwRkU3REVENDkyOEQwNSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmlu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',
	WaitTime : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlDQzIzRDk5NDMxNTExRTA4NDZBQzNFRjUyRDRBRDAyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlDQzIzRDlBNDMxNTExRTA4NDZBQzNFRjUyRDRBRDAyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUNDMjNEOTc0MzE1MTFFMDg0NkFDM0VGNTJENEFEMDIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUNDMjNEOTg0MzE1MTFFMDg0NkFDM0VGNTJENEFEMDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4McqqpAAAfEUlEQVR42uydCbxfw9nH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',
	YellowSword : "src='img/x.gif' class='iReport iReport2' ",
};

var Doc = {
	New : function(tt, attrs) {
		newElement = document.createElement(tt);
		if (attrs !== undefined)
			for ( var xi = 0; xi < attrs.length; xi++)
				newElement.setAttribute(attrs[xi][0], attrs[xi][1]);
		return newElement;
	},
	Element : function(eid) {
		return document.getElementById(eid);
	},
	xy2id : function(x, y) {
		return (((400 - parseInt(y)) * 801) + (parseInt(x) + 401));
	},
	id2xy : function(vid) {
		arrXY = [];
		var x = (vid % 801) - 401;
		var y = 400 - (vid - 401 - x) / 801;
		arrXY[0] = x;
		arrXY[1] = y;
		return arrXY;
	},
	// bis hier hin clean!!!
	Tab : function(url) {
		goldclub_active = GM_getValue(dataIndex + "_GoldClub_", "1");
		if (goldclub_active == "1") {
			form = this.New('form', [ [ 'action', url ],
					[ 'target', '_blank' ], [ 'method', 'get' ] ]);

			form.appendChild(this.New('input', [ [ 'type', 'submit' ],
					[ 'value', 'build' ] ]));

			document.body.appendChild(form);

			form.submit();
		} else if (goldclub_active == "0") {
			form = this.New('form', [ [ 'action', Host + '/' + url ],
					[ 'target', '_blank' ], [ 'method', 'get' ] ]);

			form.appendChild(this.New('input', [ [ 'type', 'submit' ],
					[ 'value', 'Dorf3' ] ]));

			document.body.appendChild(form);

			form.submit();
		}
	},

	Login : function() {

		LoginReq = document.getElementsByClassName("innerLoginBox");

		if (LoginReq && LoginReq.length > 0) {

			LoginForm = LoginReq[0].getElementsByTagName("form")[0];

			LoginData = "";

			LoginForm.setAttribute('target', '_blank');

			document.getElementsByName("password")[0].value = "password";

			LoginForm.submit();

			setInterval(function() {

				window.location = "/build.php?gid=16&tt=99";

			}, 10000);

		}

	},

	Safe : function() {

		safer = GM_getValue(dataIndex + "_safe", '');

		if (safer == '') {

			GM_setValue(dataIndex + "_safe", Time.getCurrTime());

			Doc.Tab("dorf3.php");

			setInterval(function() {

				window.location = "/build.php?gid=16&tt=99";

			}, 1000);

		} else {

			safe_sec = Time.toSec(safer);

			cur_sec = Time.toSec(Time.getCurrTime());

			if ((cur_sec - safe_sec) > 1800) {

				GM_setValue(dataIndex + "_safe", Time.getCurrTime());

				Doc.Tab("dorf3.php");

				setInterval(function() {

					window.location = "/build.php?gid=16&tt=99";

				}, 1000);

			}

		}

	}

};

var Time = {
	Sync : function(x, y, x1, y1, last_sent, farm_id, trps, interval) {
		dist = this.getDistance(x, y, x1, y1);
		slow = 20;
		for ( var i = 1; i <= 11; i++) {
			tid = "f" + farm_id + "_t" + i;
			if (parseInt(trps.split("|")[i - 1]) > 0)
				if (slow > Troops.Speed[Race][i - 1])
					slow = Troops.Speed[Race][i - 1];
		}
		mtime = this.getTTime(dist, slow);
		lsec = this.toSec(last_sent);
		crT = this.getCurrTime();
		nsec = this.toSec(crT);
		msec = this.toSec('0000-00-00 ' + mtime);
		msec = parseInt((msec * 2) / interval);
		mode = 'def1';
		dsec = nsec - lsec;
		tm = parseInt(lsec) + parseInt(msec) - parseInt(nsec);
		if (tm < 0)
			tm = 0;
		if (dsec > msec)
			dsec = msec;

		return [ mtime, this.toHour(tm + lsec), mode, tm, msec, dsec ];
	},
	getDistance : function(sx1, sy1, sx2, sy2) {
		var x1 = parseInt(sx1);
		var y1 = parseInt(sy1);
		var x2 = parseInt(sx2);
		var y2 = parseInt(sy2);

		var dX = Math.min(Math.abs(x2 - x1), Math.abs(801 - Math.abs(x2 - x1)));
		var dY = Math.min(Math.abs(y2 - y1), Math.abs(801 - Math.abs(y2 - y1)));
		var dist = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));

		return dist;
	},

	getTTime : function(qDist, theSlow) {
		var aTime = Math.round(qDist * 3600000 / theSlow);

		// aTime += 10;

		hh = Math.floor(aTime / 3600000);
		if (hh < 10)
			hh = "0" + hh;

		mm = Math.floor((aTime - hh * 3600000) / 60000);
		if (mm < 10)
			mm = "0" + mm;

		ss = Math.ceil((aTime - hh * 3600000 - mm * 60000) / 1000);

		if (ss < 10)
			ss = "0" + ss;

		return hh + ":" + mm + ":" + ss;
	},
	toSec : function(dt) {
		// 2009-07-23 12:00:00
		d = dt.split(" ");
		dds = d[1].split(":");
		hhs = d[0].split("-");

		s = parseInt(dds[2]) + parseInt((dds[1]) * 60)
				+ parseInt((dds[0]) * 3600);
		s1 = parseInt(hhs[2]) * 86400 + parseInt(hhs[1]) * 2592000;

		return parseInt(s) + parseInt(s1);
	},
	toSecG : function(dt) {
		// 23.07.2009 12:00:00
		d = dt.split(" ");
		dds = d[1].split(":");

		s = parseInt(dds[2]) + parseInt((dds[1]) * 60)
				+ parseInt((dds[0]) * 3600);

		return parseInt(s);
	},
	toHour : function(sc) {
		sc = parseInt(sc);

		m = Math.floor(sc / 2592000);
		sc = Math.floor(sc % 2592000);
		d = Math.floor(sc / 86400);
		sc = Math.floor(sc % 86400);
		h = Math.floor(sc / 3600);
		sc = Math.floor(sc % 3600);
		mm = Math.floor(sc / 60);
		sc = Math.floor(sc % 60);

		// GM_log("Tag: " + d + " Monat: " + m);

		if (d == 0) {
			// d = 8;
			d = 9;
			// m -= 1;
			// d = 30;
		}
		if (d == 1) {
			d = 9;
			m -= 1;
			d = 31;
		}
		if (m == 0) {
			// m = 08;
			// m = 09;
		}
		if (m == 1) {
			// m = 08;
			// m = 09;
		}

		if (m < 10)
			m = "0" + m;
		if (d < 10)
			d = "0" + d;
		if (h < 10)
			h = "0" + h;
		if (mm < 10)
			mm = "0" + mm;
		if (sc < 10)
			sc = "0" + sc;

		res = "2012-" + m + "-" + d + " " + h + ":" + mm + ":" + sc;

		return res;
	},
	getCurrTime : function() {
		crTime = new Date();
		year = crTime.getFullYear();
		month = parseInt(crTime.getMonth() + 1);
		day = crTime.getDate();
		hour = (crTime.getHours());
		minute = crTime.getMinutes();
		second = crTime.getSeconds();

		if (month < 10)
			month = "0" + month;
		if (day < 10)
			day = "0" + day;
		if (hour < 10)
			hour = "0" + hour;
		if (minute < 10)
			minute = "0" + minute;
		if (second < 10)
			second = "0" + second;

		res = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":"
				+ second;

		return res;
	},
};

var Farm = {};

Farm.Send = function(ListIndex) {
	raidList = Doc.Element(ListIndex);

	ListRows = raidList.getElementsByClassName("slotRow");

	overfarm = GM_getValue(dataIndex + "_OverFarm_" + ListIndex, false);
	overfarmed = GM_getValue(dataIndex + "_OverFarmed_" + ListIndex, false);
	if (overfarmed)
		overfarm = false;

	if (overfarm) {
		sorttd = raidList.getElementsByClassName("lastRaid sortable")[0];
		sortcommand = sorttd.getAttribute("onclick");
		var script = document.createElement('script');
		script.setAttribute("type", "application/javascript");
		script.textContent = sortcommand;
		sorttd.appendChild(script);
	}

	setTimeout(function() {
		Farm.check(ListIndex);
	}, 2000);
};

Farm.check = function(ListIndex) {

	raidList = Doc.Element(ListIndex);

	ListRows = raidList.getElementsByClassName("slotRow");

	lang = GM_getValue(dataIndex + "_Lang_", "de");
	overfarm = GM_getValue(dataIndex + "_OverFarm_" + ListIndex, false);
	overfarmed = GM_getValue(dataIndex + "_OverFarmed_" + ListIndex, false);
	// GM_log("List: " + ListIndex + " Overf: " + overfarmed);
	if (overfarmed)
		overfarm = false;

	AtLeastChecked = false;

	for ( var i = 0; i < ListRows.length; i++) {

		ListRow = ListRows[i];

		RowCheck = ListRow.getElementsByTagName("input")[0];

		RowDistance = parseInt(ListRow.getElementsByClassName("distance")[0].innerHTML);

		RowLastCont = ListRow.getElementsByClassName("lastRaid")[0];
		RowVil = ListRow.getElementsByClassName("village")[0];

		attIn = true;
		try {
			RowVil.getElementsByTagName("img")[0].className;
		} catch (e) {
			attIn = false;
		}
		if (!attIn || overfarm) {
			if (RowLastCont.getElementsByTagName("img")
					&& RowLastCont.getElementsByTagName("img").length > 0) {

				RowLast = RowLastCont.getElementsByTagName("img")[0].className;

				yellowfarm = GM_getValue(
						dataIndex + "_YellowFarm_" + ListIndex, false);
				verlust = 0;
				if (yellowfarm) {
					(RowLast.split(" ")[1] == "iReport2" && verlust < 0.05);
				}

				if (RowLast.split(" ")[1] == "iReport1" || yellowfarm) {
					lucr = false;

					RowBag = RowLastCont.getElementsByTagName("img")[1].alt;
					effi = RowBag.split(" ")[1] / RowBag.split(" ")[5];

					RowLastRaid = RowLastCont.getElementsByTagName("a")[0].innerHTML;

					WaitHour = parseInt(GM_getValue(dataIndex + "_WaitTime_"
							+ ListIndex, "6")) * 3600;

					RaidDay = RowLastRaid.split(" ")[0];
					RaidTime = RowLastRaid.split(" ")[1].split(":");
					RaidHour = parseInt(RaidTime[0]) * 3600;
					RaidMin = parseInt(RaidTime[1]) * 60;
					if (RaidDay == "gestern" || RaidDay == "yesterday")
						WaitTime = WaitHour - (86400 - (RaidHour + RaidMin));
					else
						WaitTime = RaidHour + RaidMin + WaitHour;

					if (effi > 0.30
							|| (RaidDay != "heute" && RaidDay != "gestern" || (RaidDay != "today" && RaidDay != "yesterday"))
							|| WaitTime < Time.toSecG(Time.getCurrTime()))
						lucr = true;
					distance = parseInt(GM_getValue(dataIndex + "_RowDistance_"
							+ ListIndex, "280"));
					if (RowDistance > distance)
						lucr = false;
					if (lucr || overfarm) {
						timeToSec = Time.toSecG(Time.getCurrTime());
						// GM_log("Send um " + Time.getCurrTime() + " LastRaid:"
						// + RaidDay + " " + RaidTime + " " + RowBag
						// + " Effi: " + effi + " Waittime: " + WaitTime
						// + " WaitHour: " + WaitTime / 3600
						// + " TimeToSec: " + timeToSec + " DiffZeit: "
						// + (timeToSec - WaitTime));
						RowCheck.checked = true;
						AtLeastChecked = true;
					}

				}

			} else {
				RowCheck.checked = true;
				AtLeastChecked = true;
			}
		}
	}

	if (AtLeastChecked) {
		if (overfarm && !overfarmed)
			GM_setValue(dataIndex + "_OverFarmed_" + ListIndex, true);

		currTime = Time.getCurrTime();

		GM_setValue(dataIndex + "_LastSent_" + ListIndex, currTime);

		CalcNextSent = GM_getValue(dataIndex + "_Interval_" + ListIndex, "1-2");

		dDif = parseInt(CalcNextSent.split("-")[1])
				- parseInt(CalcNextSent.split("-")[0]);

		dMin = parseInt(CalcNextSent.split("-")[0]);

		dDif *= 60;

		dMin *= 60;

		rNum = Math.ceil(dMin + (Math.random() * dDif));

		GM_setValue(dataIndex + "_NextSent_" + ListIndex, Time.toHour(rNum
				+ Time.toSec(currTime)));

		GM_setValue(dataIndex + "_safe", Time.getCurrTime());

		// GM_log("Sent: " + ListIndex + " Zeit: " + currTime);

		raidList.getElementsByTagName("form")[0].submit();

	} else {
		if (overfarmed)
			GM_setValue(dataIndex + "_OverFarmed_" + ListIndex, false);

		currTime = Time.getCurrTime();

		GM_setValue(dataIndex + "_LastSent_" + ListIndex, currTime);

		CalcNextSent = GM_getValue(dataIndex + "_Interval_" + ListIndex, "1-2");

		dDif = parseInt(CalcNextSent.split("-")[1])
				- parseInt(CalcNextSent.split("-")[0]);

		// dDif = Config.DMax - Config.DMin;

		dMin = parseInt(CalcNextSent.split("-")[0]);

		dDif *= 60;

		dMin *= 60;

		rNum = Math.ceil(dMin + (Math.random() * dDif));

		GM_setValue(dataIndex + "_safe", Time.getCurrTime());

		GM_setValue(dataIndex + "_NextSent_" + ListIndex, Time.toHour(rNum
				+ Time.toSec(currTime)));

		Log.Info("Nothing Found: " + ListIndex);

		window.location = "/build.php?gid=16&tt=99";
	}

};

Farm.Toggle = function(lid) {
	window.location.href = "javascript:void(Travian.Game.RaidList.toggleList("
			+ lid + "));";
};

Farm.IDS = [];

Farm.NextSents = [];

Farm.Timer = false;

Farm.Init = function() {
	FarmIDstr = "";

	ToMinID = -1;

	ToMinVal = 99999999;

	RL = Doc.Element("raidList");

	ListEntries = RL.getElementsByClassName("listEntry");

	if (ListEntries && ListEntries.length > 0) {

		for ( var i = 0; i < ListEntries.length; i++) {

			ShouldDelay = 0;

			ListEntry = ListEntries[i];

			ListIndex = ListEntry.id;

			NextSent = GM_getValue(dataIndex + "_NextSent_" + ListIndex, "");

			LastSent = GM_getValue(dataIndex + "_LastSent_" + ListIndex, "");

			if (NextSent == "") {
				NextSent = Time.getCurrTime();
			}
			if (NextSent == "2012-NaN-NaN NaN:NaN:NaN") {
				NextSent = Time.getCurrTime();
			}
			if (Time.toSec(NextSent) < ToMinVal) {
				HasPaused = GM_getValue(dataIndex + "_Pause_" + ListIndex,
						false);

				if (HasPaused) {
					ToMinID = i;
					ToMinVal = Time.toSec(NextSent);
				}
			}

			Farm.IDS[i] = ListIndex;

			Farm.NextSents[i] = NextSent;

			fName = ListEntry.getElementsByClassName("listTitleText")[0].innerHTML;

			GM_setValue(dataIndex + "_Name_" + ListIndex, fName);

			FarmIDstr += (ListIndex + "$");

			NameData = "<font color='red'>" + LastSent + "</font> / ";

			NameData += "<font color='green'>" + NextSent + "</font>";

			ListTitleText = ListEntry.getElementsByClassName("listTitleText")[0];

			ListTitleText.innerHTML += NameData;

		}

	}

	GM_setValue(dataIndex + "_all", FarmIDstr);

	if (ToMinID >= 0) {
		Farm.Timer = setInterval(function() {
			Farm.Observe(ToMinID);
		}, 2200); // 1000 startwert erhöht wegen laggs
	}
};

Farm.StateToggle = function(ListIndex) {
	HasPaused = GM_getValue(dataIndex + "_Pause_" + ListIndex, "1");

	if (HasPaused)
		GM_setValue(dataIndex + "_Pause_" + ListIndex, true);
	else
		GM_setValue(dataIndex + "_Pause_" + ListIndex, false);

	window.location = "/build.php?gid=16&tt=99";
};

Farm.Toggling = 0;

Farm.Observe = function(ListID) {
	ListIndex = Farm.IDS[ListID];
	// GM_log(ListID);
	NextSent = Time.toSec(Farm.NextSents[ListID]);

	CurrTime = Time.toSec(Time.getCurrTime());
	// GM_log("CurTime: " + Time.getCurrTime());
	// GM_log("NextSent: "+NextSent);

	// Farm.Send(ListIndex);
	// clearInterval(Farm.Timer);
	time = GM_getValue(dataIndex + "_Time_", "0");
	if (time == "1")
		NextSent = Time.toSec(Time.getCurrTime());

	if (CurrTime >= NextSent) {
		ListEntry = Doc.Element(ListIndex);

		InfoBox = ListEntry.getElementsByClassName("troopSelection");

		if (InfoBox && InfoBox.length > 0) {
			Farm.Send(ListIndex);
			clearInterval(Farm.Timer);

		} else {

			if (Farm.Toggling == 0) {

				Farm.Toggle(ListIndex.substr(4));

				Farm.Toggling = 1;
			}
		}
	}
};

cssStyle = "#content{width: auto;display: block;}";

cssStyle += "#bfarms{font-size: 11px;}";

cssStyle += "#bfarms select{font-size: 11px;height:16px;border:none;background:none;}";

cssStyle += "#bfarms input{font-size: 11px;text-align: center;height:12px;padding:0;border:none;background:none;}";

cssStyle += "#bfarms table,#side_info table {background:#bbb;border-collapse: separate;line-height: 16px; vertical-align: center; margin: 3px;}";

cssStyle += "#bfarms table tr td,#bfarms table tr th{ padding: 2px; text-align: center;}";

cssStyle += "#bfarms table thead tr td,#side_info table thead tr td {text-align: center;background-image: url(http://img.travian.com/gpack/live/travian_default_en/img/a/c2.gif); font-family: Arial, sans-serif;}";

cssStyle += "#bfarms table.wait {background: #F0E68C;}";

cssStyle += "#bfarms table.cur {background: #238E68;}";

cssStyle += "#bfarms tr.wait {color: #F0E68C;}";

cssStyle += "#bfarms tr.cur  {color: #238E68;}";

cssStyle += "div#map div#map_content div.tf1 {background-image:url( data:image/gif;base64,R0lGODlhSgBKAKUlADYJNlcaV2MjY3k2eX47foZDhodEh4hFiJlZmZ5fnqJkoqVopahsqKpuqq1zrbmEubuHu8aYxsibyMmcycugy9Ot09Sv1NWw1day1tm32du729y93N2+3eHG4eLH4uXN5ebP5ujS6OnU6eza7PLl8v///////////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEAAD8ALAAAAABKAEoAAAb+wJ9wSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/Dg6GPw4AAImCiIwPD46PfYiNIg8impyRew4iAJOcpZyNjniInA8hrq+vk5uIc5GNsCC5urmworRvoaKTrrkfxhsTyR+8rpSpbYwiIa0gFhsfHtkdFg0IDQ8WyyDNs5Zmtq0huR3JHe4c8BkSExkWHR7irqe/Y6vC6sawveOQoSAGDAUzwHNnbFwITY34fWEEgFUxD+8mPJhwEEMDCRVCdlR4L5+mTSLMbcFESh2IDx04JMvQoEDICg8UKChgYAD+hJ8QJHBguOxhqUoqq/hDCRAmwQYHEOh0MMFBhKtXCTgYoQEeBwpD8Y0r5SwlFoqmiDnN8OBAAAJYFRBQgHWA3QEeRHCAcIGkWKMnPSVtgm7TBmkAY2bwGCBAAawEFhRIoMBuggEBRFAY8UECwqFFAR+t9AQTq1ITpL3EuBjngQMOfg4QkIACBQgJAvjUDIHBiBEVPncoaooVJbNMKKIsrtophgoQPkyA7YCAAAGRvULgwCkoBAQkHgTPcG/cBgvWTKGUWGQVKeacOjxoACE4BA0jGhgoMMC6zgXwfdQbCSPUp5BYFsiSWnERqWQafMXdVIEEGdxHAgI99UdXXPD+lCIgAyR8UF8F5C3jATIW5FUcKaQt0sh7EHKijgcYTACdBhcyIIEEFGAVlwAFcELfTyF6J8FwY8VIVoOLoBWjBxbMtKMEFnaAwAVfETDXhtcFwB2VVH7AwIgYICkafJugYk4kgRW3AQPePIDQcwzgqJAIcl03gAHWXZcAPD9xFVRwoCUJ4XGfHKEcc9JZwIGjGUzIwAWcGIAAAntiet11BNTGgQYaQNDARxhwgI8+h7aoxIPFEcMaBljCMwIJGkhgQAD0dVnABL9R4AFIN5UZ2oooPeOEe8s1Z4FQGUxApQYfkEDCBA1olIAD+Enb2XYXjGcqceplwt6xL6YFwgS+9nBwEHT3QfvBrAR+AOpPO/L12V/MIWXFg5uo9c5izwHFwMADAzXhjiSGNWybg1GxyiiIrfYvwBJW3NFBCjvEirhesCTjRQMldPFBCS2Ez8K+jLtSRZoQ85JAMXkl81DunOzQNOWUUdgrL2OTDUYYpRgQMw8507AYTvKsS0BRTuAB0UWnzMZSMsISwgdRPrBBL5OoCo0kybr5wWmiGBuHk0oiqjIwwcAY7tq1LEq22aBE03VKR+eBideQ5K1FEAA7);}";

cssStyle += "div#map div#map_content div.tf2 {background-image:url(data:image/gif;base64,R0lGODlhSgBKAKUnAGMTY4osiY8xjpc5lqtPqqtRqq9hrrBkr7FvsLR6s7WBtLaCtbqMuryOu72PvL2RvcKYwsWbxMefx8qiyc2nzM6ozdOv0ta01de31+DE3+DG4OLK4uXN5ObQ5ujS5+nX6evZ6+za7O3d7e7e7vDi8PHl8fLm8v///////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEAAD8ALAAAAABKAEoAAAb+wJ9wSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/EBCGPxAAAImCiIwVFY6PfYiNJBUkmpyRexAkAJMjpaYjjY54iJwVp6+TrohzkY2mIbi5urillXChqKS7IR7FxbuUqm2Mpa66xh4hGhgY0NEhpLNotRW4GgsJC8TGGh4UD9TW1yGo2mOIvQ4ZHxkMF/cO1BEO/P0OERGqQcOVzN0XRgCaedAwT4CDCxYWWMDAj4JFCRQWKHiwYEG+Dgs5ZBhZyhIXTJNyGeOAwMLIiRg2yMTQgEEDAzapUbx3gQH+h2i9PmVhpWkELmgiQBCYkOEAgwn5NjwwwPMeAZkbKNi7d4xdMhImqSAkUeqoh2oiECwY4GDCgAEUMExYu7UnAQIGYhooYKFvBxHXRkzyFNYJt01liWVNmy/jgrsTLDZNkMBuAgdsMViQl8HBghLHNGgIwamRwSWYWnEaca1YtQ4RKMgs9vBegwtMIxpI4JCDiQ9rMyQYcAADaA0XNWiiBLYJwk2cVmMYt0FC2gizLUyoe+EAUxPzOPg2IeGDAwEWDrx1ANrb6OjQTxNhNTj6arPVSgSc/YBB3QMGEDBABiYUWCAHCkQgXDgLUOAASF2NYF9pvszHyIQTGqWYBCD+lBDVBiGYcEE4DiRwFwEHFGgeBxYUsEABPCXgwQYParBBYBLaN1iFz0GHYWIzcughNQrEZWAGFiQwQYECBhAAAfQUIABVPc24QAcYUHBMKRi2YloimADQJVkazviABx5GIMEDRn5woIEmBOgkARdkUAACbV0wgAEbXJnlljnqKIppFoZS32pGTYOBBAqAgAACMRUzgoj3mCCSCRbIiWcCGSCwz1sHHBBBCRKwBlSgXoIlnxDP2cfaAxut2WEBUYVYVQIwCbAnAU4ewIEBAYa6J0iR8oIqJasWkVp0ZWFQzgMcOspZPXUxwJYAAiAQIF5uZhDsXiBIIBAvy5VWmBL+9CGG358RSBQRqE69he2dAnQUgYom0BpCCSJEeupXyaLWiCtlzkhBBizuk4ABAkggwXBvASTxPn1OAKybi96IYyXnPoFJM7hg0K0DIHSAp7YGSGDAAAIU8ABWFLRrgAMFdLDZBx+MS0pzWsAzigb0tLWoBiV04GJH/vizjwMIdCiCw/IcA7AXKJEADQawdlgCCB5E8CgCBYQNttYioIMVgbhwHAYzgo2T5QMPgCB3CXTXXTcI/aIjkAfZdNzFYWZdBDesChQOrUU6GYMNoWkgpKFZV8cVVzpddVOhGvAI9vgzZ02HDLJ+n4ESwY+PoOg1BDMux1ivmOJBMwkJRQcaUYfqePkqraomSuh1pDaJmAHnEWbwfBCfRRAAOw==);}";

cssStyle += "div#map div#map_content div.tf3 {background-image:url(data:image/gif;base64,R0lGODlhSgBKAKUnAGMTY4osiY4wjZs9mqZIpahKpqxSq65Wra5era9frrBor7FvsLJ0srJ2srV/tLmLuL2PvL6SvsKYwsacxcymzM2nzM+rz9Sy1Na01dzA3N3B3d7C3uDE3+TM4+fR5ujS5+jU6Oza7O7g7vDi8PHj8fPn8/v3+////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEAAD8ALAAAAABKAEoAAAb+wJ9wSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIV/EhKGPxIAAImCiIwVFY6PfYiNIxUjmpyRexIjAJMgEQgRFiAijY54iCIiFbAiIRgbIKqTsohzkY2zIcHCw8GwlXASxpO0IRMJGBC40rjClK1tjCIYDBENGyEbAxEYHBMU5xQZGR+mG8u8aL4VIRAY9hAPDs8YEQcKExAgNEBgoGCED7RWwRvzatW8DQIaXLjgwFyBAwQKLFgAIkSpgiAfrPtgbeEXRgBoVQCB4cODCxo0kCDxYKOCAgIUPPi2wQL+AgIHEAAkB2KZCEtcME0KtmFDiQwEIGjgRuLChAcUFCyAEAGCggYOFCSAsEDBOAwUPnRUaNIKohGxmG3A8FSBAAYXBgyY+WECBoBn+R0oQACDBcIwIVAoEczaCKRUUMJlBsIpBQcODoAlcIEvian7+BEg0IACuIAxJzjIwDjEJE+QnciTRdlphgMJIkRo+tIDBwQWSAxg0EB0AwYDLnwgAeGABgfEH3xQi0uEqGOyGXECwQmWxw0iPijAHSHAAQwauPLj9xmzZgEHIHwwQUJBcvtgWRu2sEETpcdNoLTJCP3BFQwIFjx1gAMNNBDVBwyEFgEBFHxmDljKfYAACRP+EMBBcRCYU4IITYXASSePxTbEW6+dOJlHCJZAwQTNUPDABBoMN86EDew1048fXICAABB4II5uDKCF0DewuHhdW5g46aJ3CEZQwgMgTKAXAcQFKRAEQE3nQVV8mXPKBQLkFkAAmE3HpHUuvoadgANKSaUFBykQTgID8ElABwRilqEC5HRGQlYTFMAABIsyEAADbWoTgndSatIIL5gAUOmLpVj5AAYEJCAqaQec2EGOuj3DlwYP4ESAbhzc1IA5CFkw6VxObsIKUpH4xwk4tniEp4zjCSDAaBH9SMIHaZYXQJHyJVqAAhxwwMCkHYCwmD2TYsDdif99coSAI5RySir+pSiIWQPvkUCOB51dwKh5A6xJQJALAIQcAROQ+EEJ/E0KJyeUtDWudiPUcgsutvZ1wAYPhAihPRgkYOhnGK1Z2gcaTNBjbudJZ4G3Ard4TXb+eReCBQl+4AACIfyoG8V8yqfBBQoQwGZAHEMg6gBhllDipI4ZHGAjtAmbYAYKTPdBj33mtuWyBAyQ85oMLEeCBxTkxBp/a7Gl4hOYwDIPghZ4qcBlDcD3QNUDCDCjsQrkDFQHy850gX63GDX2FK+MAgJfIYb1QAjjUVA1fA7gpJEAmFGwAUAKKOeut9Yc5YVSMUv+VAZe+bOBQDt1gM455kyggGIZnCoTCSFU8jeMFtnEsnIJT00OQVgKOPDAjRMEHxDrrJXAEgTzGL25UhX0hPt06gQvPPEj4T5OUZeqgVIw/ODufQkmhG/C99bbMk8lJqzR0EOG2QKC92oZdpY7Bc9uBvOwNGUPnjObb8zJcUDJLAYIi7VQ4ijKc8NbfHUiONUPFOQiGCcACEFNTUJTCcxDpjLIBw5mIQgAOw==);}";

GM_addStyle(cssStyle);

var LOG = "";

var Race = 1;

var Host = "http://" + window.location.hostname;

var ViewList = false;

var crtPage = window.location.href;

function RemoveFarm(farm_id) {

	Farms.Remove(farm_id);

};

var Vill = {

	Race : function() {

		raceData = decodeURIComponent(GM_getValue(dataIndex + "_race", false));

		if (raceData != 'false' && raceData.length >= 1) {

			Race = raceData;

		} else {

			GM_xmlhttpRequest({

				method : 'GET',

				url : Host + "/spieler.php",

				headers : {
					'Accept' : 'application/atom+xml,application/xml,text/xml'
				},

				onload : function(responseDetails) {

					response = responseDetails.responseText;

					if (response.match(/<td>Teutons</)) {

						Race = 1;

					}

					else if (response.match(/<td>Romans</)) {

						Race = 0;

					}

					else if (response.match(/<td>Gauls</)) {

						Race = 2;

					}

					GM_setValue(dataIndex + "_race", encodeURIComponent(Race));

				}

			});

		}

	},

	List : [],

	Init : function() {

		dorfData = decodeURIComponent(GM_getValue(dataIndex + "_dorf", false));

		if (dorfData != 'false' && dorfData.length > 1) {

			ddd = dorfData.split("$$");

			for ( var i = 0; i < ddd.length; i++) {

				dd = ddd[i].split("$");

				this.List[i] = [ dd[0], dd[1], dd[2], dd[3] ];

			}

		} else {

			GM_setValue(dataIndex + "_dorf", '');

			vstr = "";

			GM_xmlhttpRequest({

				method : 'GET',

				url : Host + "/spieler.php",

				headers : {
					'Accept' : 'application/atom+xml,application/xml,text/xml'
				},

				onload : function(responseDetails) {

					vArea = Doc.Element("villageList");

					vArea = vArea.getElementsByClassName("list")[0];

					vLinks = vArea.getElementsByTagName("a");

					villaa = Doc.New("div", [ [ 'style', 'display:none' ], ]);

					villaa.innerHTML = responseDetails.responseText;

					Doc.Element("content").appendChild(villaa);

					pArea = Doc.Element("villages");

					pLinks1 = pArea.getElementsByClassName("name");

					for ( var j = 1; j < pLinks1.length; j++) {

						i = j - 1;

						pLinks = pLinks1[j].getElementsByTagName("a")[0];

						vXs = Doc.id2xy(pLinks.href.split("=")[1]);

						Vill.List[i] = [ pLinks.innerHTML,
								vLinks[i].href.split("?")[1], vXs[0], vXs[1] ];

						vstr += Vill.List[i][0] + "$" + Vill.List[i][1] + "$"
								+ Vill.List[i][2] + "$" + Vill.List[i][3];

						vstr += "$$";

					}

					alert(vstr);

					GM_setValue(dataIndex + "_dorf", decodeURIComponent(vstr
							.substr(2)));

					window.location = Host + "/dorf3.php";

				}

			});

		}

	},

	getUserId : function() {

		navi = Doc.Element("side_info");

		navi_p = navi.getElementsByClassName("sideInfoPlayer")[0];

		profile_link = navi_p.getElementsByTagName("a")[0];

		return profile_link.href.split("=")[1];

	},

};

var Farms = {

	New : function(datas) {

		strFarms = decodeURIComponent(GM_getValue(dataIndex, false));

		aFarm = '';

		for ( var j = 0; j < datas.length; j++) {

			aFarm += ('$' + datas[j]);

		}

		if (strFarms != 'false' && strFarms.length > 1) {

			strFarms += ("$$" + aFarm.substr(1));

		} else {

			strFarms = aFarm.substr(1);

		}

		GM_setValue(dataIndex, encodeURIComponent(strFarms));

	},

	Delete : function() {

		GM_setValue(dataIndex, '');

	},

	Save : function() {

		if (crtPage.match(/karte.php/)) {

			alert("Sorry! You cannot edit this page");

		} else {

			farm_id = Doc.Element('save_id').value;

			farm_name = Doc.Element('fn_' + farm_id).value;

			if (farm_name == 'undefined' || farm_name.length < 0) {

				farm_name = 'unnamed';

			}

			farm_x = Doc.Element('fx_' + farm_id).value;

			farm_x = parseInt(farm_x);

			if (farm_x > 800 || farm_x < -800) {

				farm_x = 800;

			}

			farm_y = Doc.Element('fy_' + farm_id).value;

			farm_y = parseInt(farm_y);

			if (farm_y > 800 || farm_y < -800) {

				farm_y = 800;

			}

			farm_v = Doc.Element('fv_' + farm_id).value;

			farm_am = Doc.Element('fam_' + farm_id).value;

			troops = '';

			for ( var j = 1; j <= 11; j++) {

				tr = Doc.Element('f' + farm_id + '_t' + j).value;

				if (tr.length < 0) {

					tr = 0;

				}

				troops += "|" + tr;

			}

			last_time = Doc.Element("last_" + farm_id).value;

			interval = Doc.Element("interval_" + farm_id).value;

			Farms.Edit(farm_id,
					[ [ 0, farm_name ], [ 1, farm_x ], [ 2, farm_y ],
							[ 3, farm_am ], [ 4, farm_v ],
							[ 5, troops.substr(1) ], [ 6, last_time ],
							[ 7, interval ] ]);

		}

	},

	Edit : function(farm_id, datas) {

		if (crtPage.match(/karte.php/)) {

			alert("Sorry! You cannot edit at this page");

		} else {

			var strFarms = decodeURIComponent(GM_getValue(dataIndex, false));

			sFarms = strFarms.split("$$");

			aFarm = sFarms[farm_id].split("$");

			for ( var j = 0; j < datas.length; j++) {

				aFarm[datas[j][0]] = datas[j][1];

			}

			aFarm_s = '';

			for ( var j = 0; j < aFarm.length; j++) {

				aFarm_s += ('$' + aFarm[j]);

			}

			sFarms[farm_id] = aFarm_s.substr(1);

			newdata = "";

			for ( var j = 0; j < sFarms.length; j++) {

				newdata += "$$" + sFarms[j];

			}

			GM_setValue(dataIndex, encodeURIComponent(newdata.substr(2)));

			window.location = Host + "/dorf3.php";

		}

	},

	Remove : function(farm_id) {

		if (crtPage.match(/karte.php/)) {

			alert("Sorry! You cannot delete at this page");

		} else {

			if (!farm_id)
				farm_id = Doc.Element("del_id").value;

			var strFarms = decodeURIComponent(GM_getValue(dataIndex, false));

			sFarms = strFarms.split("$$");

			newdata = "";

			for ( var j = 0; j < sFarms.length; j++) {

				if (j != farm_id) {

					newdata += "$$" + sFarms[j];

				}

			}

			if (sFarms.length == 1) {

				GM_setValue(dataIndex, '');

			} else {

				GM_setValue(dataIndex, encodeURIComponent(newdata.substr(2)));

			}

			window.location = Host + "/dorf3.php";

		}

	},

	ListSmall : function() {

		Thread.Stop();

		Thread.List = [];

		rmLinks = [];

		tmpF = Doc.Element('bfarms');

		if (tmpF) {

			Doc.Element('content').removeChild(tmpF);

		}

		FarmDiv = Doc.New("DIV", [ [ 'id', 'bfarms' ] ]);

		var strFarms = decodeURIComponent(GM_getValue(dataIndex, false));

		if (strFarms != 'false' && strFarms.length > 1) {

			aFarms = new Array();

			sFarms = strFarms.split("$$");

			Total = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

			TotalIndex = 1;

			TotalIndexT = 1;

			fT = Doc.New("table", [ [ 'id', 'fTable' ],
					[ 'class', 'troop_details' ], [ 'cellspacing', 1 ],
					[ 'cellpadding', 1 ] ]);

			fTH = Doc.New('thead');

			fTHTR = Doc.New('tr');

			td = Doc.New('td');
			td.innerHTML = ' Name ';
			fTHTR.appendChild(td);

			td = Doc.New('td');
			td.innerHTML = ' X ';
			fTHTR.appendChild(td);

			td = Doc.New('td');
			td.innerHTML = ' Y ';
			fTHTR.appendChild(td);

			td = Doc.New('td', [ [ 'colspan', 5 ] ]);
			td.appendChild(Doc.New("IMG", [ [ 'title', 'Village From' ],
					[ 'src', Images.VillageFrom ] ]));
			fTHTR.appendChild(td);

			td = Doc.New('td', [ [ 'colspan', 3 ] ]);
			td.appendChild(Doc.New("IMG", [ [ 'title', 'Attack Mode' ],
					[ 'src', Images.AttackMode ] ]));
			fTHTR.appendChild(td);

			// Customize troops icon

			for ( var j = 1; j <= 11; j++) {

				jj = (Race * 10) + j;

				TTitle = Troops.Name[Race][j - 1];

				if (j == 11) {

					jj = 'hero';

				}

				trImg = Doc.New("IMG", [ [ 'class', 'unit u' + jj ],
						[ 'title', TTitle ], [ 'alt', TTitle ],
						[ 'src', 'img/x.gif' ] ]);

				td = Doc.New('td');
				td.appendChild(trImg);

				fTHTR.appendChild(td);

			}

			td = Doc.New('td');
			td.appendChild(Doc.New('IMG', [ [ 'class', 'clock' ],
					[ 'title', 'Interval' ], [ 'src', 'img/x.gif' ] ]));
			fTHTR.appendChild(td);

			td = Doc.New('td', [ [ 'colspan', 3 ] ]);
			td.appendChild(Doc.New("IMG", [ [ 'class', 'clock' ],
					[ 'title', 'Process Time' ], [ 'src', 'img/x.gif' ] ]));
			fTHTR.appendChild(td);

			td = Doc.New('td', [ [ 'colspan', 3 ] ]);
			td.appendChild(Doc.New("IMG", [ [ 'class', 'clock' ],
					[ 'title', 'Travel Time' ], [ 'src', 'img/x.gif' ] ]));
			fTHTR.appendChild(td);

			td = Doc.New('td', [ [ 'colspan', 8 ] ]);
			td.appendChild(Doc.New("IMG", [ [ 'class', 'clock' ],
					[ 'title', 'Last Sent' ], [ 'src', 'img/x.gif' ] ]));
			fTHTR.appendChild(td);

			td = Doc.New('td', [ [ 'colspan', 5 ] ]);
			td.innerHTML = ' Actions ';
			fTHTR.appendChild(td);

			fTH.appendChild(fTHTR);

			fT.appendChild(fTH);

			fTB = Doc.New('tbody');

			for ( var i = 0; i < sFarms.length; i++) {

				aFarms = sFarms[i].split("$");

				fTR = Doc.New('tr', [ [ 'id', 'fTR_' + i ] ]);

				// Name and cords

				fIn = Doc.New('input', [ [ 'id', 'fn_' + i ],
						[ 'type', 'text' ], [ 'size', 12 ],
						[ 'value', aFarms[0] ] ]);

				fX = Doc.New('input', [ [ 'id', 'fx_' + i ],
						[ 'type', 'text' ], [ 'size', 2 ],
						[ 'value', aFarms[1] ] ]);

				fY = Doc.New('input', [ [ 'id', 'fy_' + i ],
						[ 'type', 'text' ], [ 'size', 2 ],
						[ 'value', aFarms[2] ] ]);

				td = Doc.New('td');
				td.appendChild(fIn);
				fTR.appendChild(td);

				td = Doc.New('td');
				td.appendChild(fX);
				fTR.appendChild(td);

				td = Doc.New('td');
				td.appendChild(fY);
				fTR.appendChild(td);

				// From village

				fTRTD = Doc.New('td', [ [ 'colspan', '5' ] ]);

				fSEL = Doc.New('select', [ [ 'id', 'fv_' + i ] ]);

				for ( var j = 0; j < Vill.List.length; j++) {

					fOP = Doc.New("option", [ [ 'value', j ] ]);

					fOP.innerHTML = Vill.List[j][0];

					if (j == parseInt(aFarms[4])) {

						fOP.setAttribute("selected", 1);

					}

					fSEL.appendChild(fOP);

				}

				fTRTD.appendChild(fSEL);

				fTR.appendChild(fTRTD);

				// Attack mode

				fTRTD = Doc.New('td', [ [ 'colspan', 3 ] ]);

				fSEL = Doc.New('select', [ [ 'id', 'fam_' + i ] ]);

				fOP = Doc.New("option", [ [ 'value', '4' ] ]);

				fOP.innerHTML = "Raid";

				if (aFarms[3] == "4") {

					fOP.setAttribute("selected", 1);

				}

				fSEL.appendChild(fOP);

				fOP = Doc.New("option", [ [ 'value', '3' ], [ 'select' ] ]);

				fOP.innerHTML = "Normal";

				if (aFarms[3] == "3") {

					fOP.setAttribute("selected", 1);

				}

				fSEL.appendChild(fOP);

				fTRTD.appendChild(fSEL);

				fTR.appendChild(fTRTD);

				// Troop counts

				for ( var j = 1; j <= 11; j++) {

					trNum = Doc.New("input", [ [ 'size', '2' ],
							[ 'id', 'f' + i + '_t' + j ],
							[ 'value', aFarms[5].split("|")[j - 1] ] ]);

					Total[j] += parseInt(aFarms[5].split("|")[j - 1])
							* parseInt(aFarms[7]);

					td = Doc.New('td');
					td.appendChild(trNum);
					fTR.appendChild(td);

				}

				TotalIndex++;

				TotalIndexT += parseInt(aFarms[7]);

				res = Time.Sync(aFarms[1], aFarms[2], Vill.List[aFarms[4]][2],
						Vill.List[aFarms[4]][3], aFarms[6], i, aFarms[5],
						aFarms[7]);

				// Interval

				int_sel = Doc.New('select', [ [ 'id', 'interval_' + i ],
						[ 'title', 'Interval Number' ] ]);

				for (j = 1; j <= 30; j++) {

					op = Doc.New('option', [ [ 'value', j ] ]);

					op.innerHTML = j;

					if (j == aFarms[7]) {

						op.setAttribute('selected', 1);

					}

					int_sel.appendChild(op);

				}

				td = Doc.New('td');
				td.appendChild(int_sel);
				fTR.appendChild(td);

				// Times

				td = Doc.New('td', [ [ 'id', 'ft_' + i ], [ 'colspan', 3 ] ]);
				td.innerHTML = res[0];
				fTR.appendChild(td);

				td = Doc.New('td', [ [ 'id', 'ft2_' + i ], [ 'colspan', 3 ] ]);
				td.innerHTML = res[0];
				fTR.appendChild(td);

				// Last Sent

				last_inp = Doc.New('input', [ [ 'type', 'text' ],
						[ 'id', 'last_' + i ], [ 'value', aFarms[6] ] ]);

				td = Doc.New('td', [ [ 'colspan', 8 ] ]);
				td.appendChild(last_inp);
				fTR.appendChild(td);

				// Map Link

				fTRTD = Doc.New('td');

				mapURL = Host + "/karte.php?z="
						+ Doc.xy2id(aFarms[1], aFarms[2]);

				mapLink = Doc.New("a", [ [ 'href', mapURL ],
						[ 'target', '_blank' ] ]);

				mapImg = Doc.New("img", [ [ 'alt', 'Show on Map' ],
						[ 'title', 'Show on Map' ], [ 'src', Images.Map ] ]);

				mapLink.appendChild(mapImg);

				fTRTD.appendChild(mapLink);

				fTR.appendChild(fTRTD);

				// Pause & Resume

				isactive = false;

				if (aFarms[8] && parseInt(aFarms[8]) == 1) {

					isactive = true;

				}

				pauseLink = Doc.New('a', [ [ 'href', 'javascript:void(0);' ],
						[ 'id', 'fstatep_' + i ] ]);

				pauseLink.appendChild(Doc.New('IMG', [ [ 'title', 'Pause' ],
						[ 'src', Images.Pause ] ]));

				playLink = Doc.New('a', [ [ 'href', 'javascript:void(0);' ],
						[ 'id', 'fstater_' + i ] ]);

				playLink.appendChild(Doc.New('IMG', [ [ 'title', 'Resume' ],
						[ 'src', Images.Resume ] ]));

				if (isactive == true) {

					playLink.style.display = 'none';

				} else {

					pauseLink.style.display = 'none';

				}

				pauseLink.addEventListener('click', function() {
					Farms.Pause(this.id);
				}, false);

				playLink.addEventListener('click', function() {
					Farms.Resume(this.id);
				}, false);

				td = Doc.New('td');
				td.appendChild(pauseLink);
				td.appendChild(playLink);
				fTR.appendChild(td);

				// Save Link

				saveLink = Doc.New("a",
						[
								[ 'id', 'fsave_' + i ],
								[ 'href', 'javascript:void(0);' ],
								[
										'onmouseover',
										"document.getElementById('save_id').value="
												+ i ] ]);

				saveLink.addEventListener('click', function() {
					Farms.Save();
				}, false);

				saveImg = Doc.New("img", [ [ 'title', 'Save' ],
						[ 'alt', 'Save' ], [ 'src', Images.Save ] ]);

				saveLink.appendChild(saveImg);

				td = Doc.New('td');
				td.appendChild(saveLink);
				fTR.appendChild(td);

				// Remove Link

				rmLinks[i] = Doc.New('a',
						[
								[ 'href', "#" ],
								[
										'onmouseover',
										"document.getElementById('del_id').value="
												+ i ] ]);

				rmLinks[i].addEventListener('click', function() {
					Farms.Remove();
				}, false);

				rmImg = Doc.New('img', [ [ 'alt', 'Delete' ],
						[ 'title', 'Delete' ], [ 'class', 'del' ],
						[ 'src', 'img/x.gif' ] ]);

				rmLinks[i].appendChild(rmImg);

				td = Doc.New('td', [ [ 'id', 'frem_' + i ], [ 'colspan', 2 ] ]);
				td.appendChild(rmLinks[i]);
				fTR.appendChild(td);

				fTB.appendChild(fTR);

				// Calculate totals

				Thread.List[i] = [ isactive, res[4], res[4] - res[5], res[2] ];

			}

			TTR = Doc.New("tr");

			TTD = Doc.New("td", [ [ 'colspan', 8 ] ]);

			TTD.innerHTML = " <i><u><b>Total:</b></u></i> ";

			TTR.appendChild(TTD);

			TTD = Doc.New("td", [ [ 'colspan', 3 ] ]);

			TTD.innerHTML = "<b>" + (TotalIndex - 1) + " / "
					+ (TotalIndexT - 1) + "</b>";

			TTR.appendChild(TTD);

			for ( var j = 1; j <= 11; j++) {

				trTD = Doc.New('td');

				trTD.innerHTML = "<b>" + Total[j] + "</b>";

				TTR.appendChild(trTD);

			}

			// Skin Change

			trTD = Doc.New('td', [ [ 'colspan', 10 ] ]);

			skinSelecter = Doc.New('select');

			skinOption1 = Doc.New('option', [ [ 'value', 'box' ] ]);

			skinOption1.innerHTML = "Skin Box";

			skinOption2 = Doc.New('option', [ [ 'value', 'list' ],
					[ 'selected', true ] ]);

			skinOption2.innerHTML = "Skin List";

			skinSelecter.appendChild(skinOption1);

			skinSelecter.appendChild(skinOption2);

			skinSelecter.addEventListener('change', function() {

				GM_setValue(dataIndex + "_vt", 'box');

				window.location.href = Host + "/dorf3.php";

			}, false);

			trTD.appendChild(skinSelecter);

			TTR.appendChild(trTD);

			fTB.appendChild(TTR);

			fT.appendChild(fTB);

			FarmDiv.appendChild(fT);

			// Pause All

			trTD = Doc.New('td', [ [ 'colspan', 10 ] ]);

			pLink = Doc.New('a', [ [ 'href', 'javascript:void' ] ]);

			if (GM_getValue(dataIndex + '_pauseall', false) == '1') {

				pLink.appendChild(Doc.New('IMG',
						[ [ 'title', 'Farm all farms' ],
								[ 'src', Images.Resume ] ]));

				pLink.addEventListener('click', function() {

					GM_setValue(dataIndex + '_pauseall', '0');

					window.location.href = Host + "/dorf3.php";

				}, false);

			} else {

				pLink.appendChild(Doc.New('IMG',
						[ [ 'title', 'Pause all farms' ],
								[ 'src', Images.Pause ] ]));

				pLink.addEventListener('click', function() {

					GM_setValue(dataIndex + '_pauseall', '1');

					window.location.href = Host + "/dorf3.php";

				}, false);

				Thread.Init();

			}

			trTD.appendChild(pLink);

			TTR.appendChild(trTD);

		}

		newLink = Doc.New('a', [ [ 'id', 'new_link' ],
				[ 'href', 'javascript:void(0);' ] ]);

		newLink.addEventListener('click', Action.New, false);

		newLink.innerHTML = "New Farm";

		BackupLink = Doc.New('a', [ [ 'id', 'backup_link' ],
				[ 'href', 'javascript:void(0);' ] ]);

		BackupLink.addEventListener('click', Action.Backup, false);

		BackupLink.innerHTML = " Backup";

		RestoreLink = Doc.New('a', [ [ 'id', 'restore_link' ],
				[ 'href', 'javascript:void(0);' ] ]);

		RestoreLink.addEventListener('click', Action.Restore, false);

		RestoreLink.innerHTML = " Restore";

		FarmDiv.appendChild(newLink);

		FarmDiv.appendChild(BackupLink);

		FarmDiv.appendChild(RestoreLink);

		Doc.Element("content").appendChild(FarmDiv);

		FarmDiv.appendChild(Doc.New("input", [ [ 'type', 'hidden' ],
				[ 'id', 'del_id' ] ]));

		FarmDiv.appendChild(Doc.New("input", [ [ 'type', 'hidden' ],
				[ 'id', 'save_id' ] ]));

		FarmDiv.appendChild(Doc.New("DIV", [ [ 'id', 'resp' ],
				[ 'style', 'display: none;' ] ]));

	},

	List : function() {

		Thread.Stop();

		Thread.List = [];

		rmLinks = [];

		tmpF = Doc.Element('bfarms');

		if (tmpF) {

			Doc.Element('content').removeChild(tmpF);

		}

		FarmDiv = Doc.New("DIV", [ [ 'id', 'bfarms' ],
				[ 'style', 'margin-top: 20px;' ] ]);

		var strFarms = decodeURIComponent(GM_getValue(dataIndex, false));

		if (strFarms != 'false' && strFarms.length > 1) {

			aFarms = new Array();

			sFarms = strFarms.split("$$");

			Total = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

			TotalIndex = 1;

			TotalIndexT = 1;

			if (crtPage.match(/position_details.php/)) {

				sXY = [];

				sXY[0] = crtPage.split('&')[0].split('=')[1];

				sXY[1] = crtPage.split('&')[1].split('=')[1];

				tmpFarms = [];

				tmpFarmsIndex = 0;

				for ( var i = 0; i < sFarms.length; i++) {

					if (sFarms[i].split("$")[1] == sXY[0]
							&& sFarms[i].split("$")[2] == sXY[1]) {

						tmpFarms[tmpFarmsIndex] = sFarms[i];

						tmpFarmsIndex += 1;

					}

				}

				sFarms = tmpFarms;

			}

			for ( var i = 0; i < sFarms.length; i++) {

				aFarms = sFarms[i].split("$");

				fT = Doc.New("table", [ [ 'id', 'fTable_' + i ],
						[ 'class', 'troop_details' ], [ 'cellspacing', 1 ],
						[ 'cellpadding', 1 ] ]);

				fTH = Doc.New('thead');

				fTHTR = Doc.New('tr');

				fTHTRTD = Doc.New('td');

				fIn = Doc.New('input', [ [ 'id', 'fn_' + i ],
						[ 'type', 'text' ], [ 'size', 12 ],
						[ 'value', aFarms[0] ] ]);

				fTHTRTD1 = Doc.New('td');

				fX = Doc.New('input', [ [ 'id', 'fx_' + i ],
						[ 'type', 'text' ], [ 'size', 2 ],
						[ 'value', aFarms[1] ] ]);

				fTHTRTD1.appendChild(fX);

				fTHTRTD2 = Doc.New('td');

				fY = Doc.New('input', [ [ 'id', 'fy_' + i ],
						[ 'type', 'text' ], [ 'size', 2 ],
						[ 'value', aFarms[2] ] ]);

				fTHTRTD2.appendChild(fY);

				fTHTRTD.appendChild(fIn);

				fTHTR.appendChild(fTHTRTD);

				fTHTR.appendChild(fTHTRTD1);

				fTHTR.appendChild(fTHTRTD2);

				fTHTRTD = Doc.New('td', [ [ 'colspan', '5' ] ]);

				fSEL = Doc.New('select', [ [ 'id', 'fv_' + i ] ]);

				for ( var j = 0; j < Vill.List.length; j++) {

					fOP = Doc.New("option", [ [ 'value', j ] ]);

					fOP.innerHTML = Vill.List[j][0];

					if (j == parseInt(aFarms[4])) {

						fOP.setAttribute("selected", 1);

					}

					fSEL.appendChild(fOP);

				}

				fTHTRTD.appendChild(fSEL);

				fTHTR.appendChild(fTHTRTD);

				fTHTRTD = Doc.New('td', [ [ 'colspan', 3 ] ]);

				fSEL = Doc.New('select', [ [ 'id', 'fam_' + i ] ]);

				fOP = Doc.New("option", [ [ 'value', '4' ] ]);

				fOP.innerHTML = "Raid";

				if (aFarms[3] == "4") {

					fOP.setAttribute("selected", 1);

				}

				fSEL.appendChild(fOP);

				fOP = Doc.New("option", [ [ 'value', '3' ], [ 'select' ] ]);

				fOP.innerHTML = "Normal";

				if (aFarms[3] == "3") {

					fOP.setAttribute("selected", 1);

				}

				fSEL.appendChild(fOP);

				fTHTRTD.appendChild(fSEL);

				fTHTRTD4 = Doc.New('td');

				mapURL = Host + "/karte.php?z="
						+ Doc.xy2id(aFarms[1], aFarms[2]);

				mapLink = Doc.New("a", [ [ 'href', mapURL ],
						[ 'target', '_blank' ] ]);

				mapImg = Doc.New("img", [ [ 'alt', 'Show on Map' ],
						[ 'title', 'Show on Map' ], [ 'src', Images.Map ] ]);

				mapLink.appendChild(mapImg);

				fTHTRTD4.appendChild(mapLink);

				fTHTR.appendChild(fTHTRTD);

				fTHTR.appendChild(fTHTRTD4);

				fTH.appendChild(fTHTR);

				fTB = Doc.New('tbody', [ [ 'class', 'units' ] ]);

				fTBTR = Doc.New('tr');

				fTBTRTH = Doc.New('th');

				fTBTR.appendChild(fTBTRTH);

				fTBTR1 = Doc.New('tr');

				fTBTR1TH = Doc.New('th');

				fTBTR1TH.innerHTML = 'Troops';

				fTBTR1.appendChild(fTBTR1TH);

				for ( var j = 1; j <= 11; j++) {

					jj = (Race * 10) + j;

					trTD = Doc.New("td");

					TTitle = Troops.Name[Race][j - 1];

					if (j == 11) {

						jj = 'hero';

					}

					trImg = Doc.New("IMG", [ [ 'class', 'unit u' + jj ],
							[ 'title', TTitle ], [ 'alt', TTitle ],
							[ 'src', 'img/x.gif' ] ]);

					trTD.appendChild(trImg);

					fTBTR.appendChild(trTD);

					Total

					trTD1 = Doc.New("td");

					trNum = Doc.New("input", [ [ 'size', '2' ],
							[ 'id', 'f' + i + '_t' + j ],
							[ 'value', aFarms[5].split("|")[j - 1] ] ]);

					trTD1.appendChild(trNum);

					fTBTR1.appendChild(trTD1);

					Total[j] += parseInt(aFarms[5].split("|")[j - 1])
							* parseInt(aFarms[7]);

				}

				TotalIndex++;

				TotalIndexT += parseInt(aFarms[7]);

				fTB.appendChild(fTBTR);

				fTB.appendChild(fTBTR1);

				res = Time.Sync(aFarms[1], aFarms[2], Vill.List[aFarms[4]][2],
						Vill.List[aFarms[4]][3], aFarms[6], i, aFarms[5],
						aFarms[7]);

				fTB1 = Doc.New('tbody', [ [ 'class', 'infos' ] ]);

				fTB1TR = Doc.New('tr');

				fTB1TRTH = Doc.New('th');

				int_sel = Doc.New('select', [ [ 'id', 'interval_' + i ],
						[ 'title', 'Interval Number' ] ]);

				for (j = 1; j <= 30; j++) {

					op = Doc.New('option', [ [ 'value', j ] ]);

					op.innerHTML = j;

					if (j == aFarms[7]) {

						op.setAttribute('selected', 1);

					}

					int_sel.appendChild(op);

				}

				fTB1TRTH.appendChild(int_sel);

				fTB1TR.appendChild(fTB1TRTH);

				fTB1TRTD = Doc.New('td', [ [ 'id', 'ft_' + i ],
						[ 'colspan', 3 ] ]);

				fTB1TRTD.innerHTML = res[0];

				fTB1TR.appendChild(fTB1TRTD);

				fTB1TRTD = Doc.New('td', [ [ 'id', 'ft2_' + i ],
						[ 'colspan', 3 ] ]);

				fTB1TRTD.innerHTML = res[0];

				fTB1TR.appendChild(fTB1TRTD);

				fTB1TRTD1 = Doc.New('td', [ [ 'id', 'ft1_' + i ],
						[ 'colspan', 6 ] ]);

				fTB1TRTD1.innerHTML = res[1];

				fTB1TR.appendChild(fTB1TRTD1);

				fTB1.appendChild(fTB1TR);

				fTB2 = Doc.New('tbody', [ [ 'class', 'infos' ] ]);

				fTB2TR = Doc.New('tr');

				fTB2TRTH = Doc.New('th');

				fTB2TRTH.innerHTML = "Actions";

				fTB2TR.appendChild(fTB2TRTH);

				fTB2TRTD0 = Doc.New('td', [ [ 'colspan', 8 ] ]);

				last_inp = Doc.New('input', [ [ 'type', 'text' ],
						[ 'id', 'last_' + i ], [ 'value', aFarms[6] ] ]);

				last_label = Doc.New('label', [ [ 'id', 'last_label' + i ] ]);

				last_label.innerHTML = ' <i>Last Sent:</i> ';

				fTB2TRTD0.appendChild(last_label);

				fTB2TRTD0.appendChild(last_inp);

				fTB2TR.appendChild(fTB2TRTD0);

				// Pause & Resume

				isactive = false;

				if (aFarms[8] && parseInt(aFarms[8]) == 1) {

					isactive = true;

				}

				pauseLink = Doc.New('a', [ [ 'href', 'javascript:void(0);' ],
						[ 'id', 'fstatep_' + i ] ]);

				pauseLink.appendChild(Doc.New('IMG', [ [ 'title', 'Pause' ],
						[ 'src', Images.Pause ] ]));

				playLink = Doc.New('a', [ [ 'href', 'javascript:void(0);' ],
						[ 'id', 'fstater_' + i ] ]);

				playLink.appendChild(Doc.New('IMG', [ [ 'title', 'Resume' ],
						[ 'src', Images.Resume ] ]));

				if (isactive == true) {

					playLink.style.display = 'none';

				} else {

					pauseLink.style.display = 'none';

				}

				pauseLink.addEventListener('click', function() {
					Farms.Pause(this.id);
				}, false);

				playLink.addEventListener('click', function() {
					Farms.Resume(this.id);
				}, false);

				td = Doc.New('td');
				td.appendChild(pauseLink);
				td.appendChild(playLink);
				fTB2TR.appendChild(td);

				fTB2TRTD = Doc.New('td');

				saveLink = Doc.New("a",
						[
								[ 'id', 'fsave_' + i ],
								[ 'href', 'javascript:void(0);' ],
								[
										'onmouseover',
										"document.getElementById('save_id').value="
												+ i ] ]);

				saveLink.addEventListener('click', function() {
					Farms.Save();
				}, false);

				saveImg = Doc.New("img", [ [ 'title', 'Save' ],
						[ 'alt', 'Save' ], [ 'src', Images.Save ] ]);

				saveLink.appendChild(saveImg);

				fTB2TRTD.appendChild(saveLink);

				fTB2TR.appendChild(fTB2TRTD);

				fTB2TRTD1 = Doc.New('td', [ [ 'id', 'frem_' + i ],
						[ 'colspan', 2 ] ]);

				rmLinks[i] = Doc.New('a',
						[
								[ 'href', "#" ],
								[
										'onmouseover',
										"document.getElementById('del_id').value="
												+ i ] ]);

				rmLinks[i].addEventListener('click', function() {
					Farms.Remove();
				}, false);

				rmImg = Doc.New('img', [ [ 'alt', 'Delete' ],
						[ 'title', 'Delete' ], [ 'class', 'del' ],
						[ 'src', 'img/x.gif' ] ]);

				rmLinks[i].appendChild(rmImg);

				fTB2TRTD1.appendChild(rmLinks[i]);

				fTB2TR.appendChild(fTB2TRTD1);

				fTB2.appendChild(fTB2TR);

				fT.appendChild(fTH);

				fT.appendChild(fTB);

				fT.appendChild(fTB1);

				fT.appendChild(fTB2);

				FarmDiv.appendChild(fT);

				Thread.List[i] = [ isactive, res[4], res[4] - res[5], res[2] ];

			}

			Doc.New('a', [ [ 'href', 'javascript:void(0);' ],
					[ 'onClick', 'Action.New' ] ]);

			TT = Doc.New('table', [ [ 'id', 'TotalTable' ],
					[ 'class', 'troop_details' ], [ 'cellspacing', 1 ],
					[ 'cellpadding', 1 ] ]);

			TTTHEAD = Doc.New("thead");

			TTTHEADTR = Doc.New("tr");

			TTTHEADTRTD = Doc.New("td", [ [ 'style', 'width:100px;' ] ]);

			TTTHEADTRTD.innerHTML = " <i><u>Total:</u></i> ";

			TTTHEADTR.appendChild(TTTHEADTRTD);

			TBODY = Doc.New('tbody', [ [ 'class', 'infos' ] ]);

			TBODYTR = Doc.New("TR");

			TBODYTRTH = Doc.New("th");

			TBODYTRTH.innerHTML = (TotalIndex - 1) + " / " + (TotalIndexT - 1);

			TBODYTR.appendChild(TBODYTRTH);

			for ( var j = 1; j <= 11; j++) {

				jj = (Race * 10) + j;

				trTD = Doc.New("td");

				TTitle = Troops.Name[Race][j - 1];

				if (j == 11) {

					jj = 'hero';

				}

				trImg = Doc.New("IMG", [ [ 'class', 'unit u' + jj ],
						[ 'title', TTitle ], [ 'alt', TTitle ],
						[ 'src', 'img/x.gif' ] ]);

				trTD.appendChild(trImg);

				TTTHEADTR.appendChild(trTD);

				trTD1 = Doc.New("td");

				trTD1.innerHTML = Total[j];

				TBODYTR.appendChild(trTD1);

			}

			TTTHEAD.appendChild(TTTHEADTR);

			TBODY.appendChild(TBODYTR);

			bTR = Doc.New('tr');

			trTD = Doc.New('td', [ [ 'colspan', 6 ] ]);

			skinSelecter = Doc.New('select');

			skinOption1 = Doc.New('option', [ [ 'value', 'box' ],
					[ 'selected', true ] ]);

			skinOption1.innerHTML = "Skin Box";

			skinOption2 = Doc.New('option', [ [ 'value', 'list' ] ]);

			skinOption2.innerHTML = "Skin List";

			skinSelecter.appendChild(skinOption1);

			skinSelecter.appendChild(skinOption2);

			skinSelecter.addEventListener('change', function() {

				GM_setValue(dataIndex + "_vt", 'list');

				window.location.href = Host + "/dorf3.php";

			}, false);

			trTD.appendChild(skinSelecter);

			bTR.appendChild(trTD);

			TBODY.appendChild(bTR);

			// Pause All

			TT.appendChild(TTTHEAD);

			TT.appendChild(TBODY);

			FarmDiv.appendChild(TT);

			FarmDiv.appendChild(Doc.New("input", [ [ 'type', 'hidden' ],
					[ 'id', 'del_id' ] ]));

			FarmDiv.appendChild(Doc.New("input", [ [ 'type', 'hidden' ],
					[ 'id', 'save_id' ] ]));

			FarmDiv.appendChild(Doc.New("DIV", [ [ 'id', 'resp' ],
					[ 'style', 'display: none;' ] ]));

			trTD = Doc.New('td', [ [ 'colspan', 6 ] ]);

			pLink = Doc.New('a', [ [ 'href', 'javascript:void' ] ]);

			if (GM_getValue(dataIndex + '_pauseall', false) == '1') {

				pLink.appendChild(Doc.New('IMG',
						[ [ 'title', 'Farm all farms' ],
								[ 'src', Images.Resume ] ]));

				pLink.addEventListener('click', function() {

					GM_setValue(dataIndex + '_pauseall', '0');

					window.location.href = Host + "/dorf3.php";

				}, false);

			} else {

				pLink.appendChild(Doc.New('IMG',
						[ [ 'title', 'Pause all farms' ],
								[ 'src', Images.Pause ] ]));

				pLink.addEventListener('click', function() {

					GM_setValue(dataIndex + '_pauseall', '1');

					window.location.href = Host + "/dorf3.php";

				}, false);

				Thread.Init();

			}

			trTD.appendChild(pLink);

			bTR.appendChild(trTD);

		}

		newLink = Doc.New('a', [ [ 'id', 'new_link' ],
				[ 'href', 'javascript:void(0);' ] ]);

		newLink.addEventListener('click', Action.New, false);

		newLink.innerHTML = "New Farm";

		BackupLink = Doc.New('a', [ [ 'id', 'backup_link' ],
				[ 'href', 'javascript:void(0);' ] ]);

		BackupLink.addEventListener('click', Action.Backup, false);

		BackupLink.innerHTML = " Backup";

		RestoreLink = Doc.New('a', [ [ 'id', 'restore_link' ],
				[ 'href', 'javascript:void(0);' ] ]);

		RestoreLink.addEventListener('click', Action.Restore, false);

		RestoreLink.innerHTML = " Restore";

		FarmDiv.appendChild(newLink);

		FarmDiv.appendChild(BackupLink);

		FarmDiv.appendChild(RestoreLink);

		Doc.Element("content").appendChild(FarmDiv);

	},

	Pause : function(farm_id) {

		Doc.Element(farm_id).style.display = 'none';

		Doc.Element(farm_id.replace('p', 'r')).style.display = '';

		Farms.Edit(farm_id.split('_')[1], [ [ 8, 0 ] ]);

	},

	Resume : function(farm_id) {

		Doc.Element(farm_id).style.display = 'none';

		Doc.Element(farm_id.replace('r', 'p')).style.display = '';

		Farms.Edit(farm_id.split('_')[1], [ [ 8, 1 ] ]);

	},

};

var Action = {

	New : function() {

		Doc.Element("new_link").style.display = "none";

		NT = Doc.New('table', [ [ 'id', 'NewFarmTable' ],
				[ 'class', 'troop_details' ], [ 'cellspacing', 1 ],
				[ 'cellpadding', 1 ] ]);

		THEAD = Doc.New('thead');

		THEADTR = Doc.New('tr');

		THEADTRTD = Doc.New('td');

		name_inp = Doc.New('input', [ [ 'size', '12' ],
				[ 'id', 'NewFarmName' ], [ 'type', 'text' ],
				[ 'value', 'Name' ] ]);

		THEADTRTD.appendChild(name_inp);

		THEADTR.appendChild(THEADTRTD);

		THEADTRTD1 = Doc.New('td');

		x_inp = Doc.New('input', [ [ 'size', '2' ], [ 'id', 'NewFarmX' ],
				[ 'type', 'text' ], [ 'value', 'X' ] ]);

		THEADTRTD1.appendChild(x_inp);

		THEADTR.appendChild(THEADTRTD1);

		THEADTRTD2 = Doc.New('td');

		y_inp = Doc.New('input', [ [ 'size', '2' ], [ 'id', 'NewFarmY' ],
				[ 'type', 'text' ], [ 'value', 'Y' ] ]);

		THEADTRTD2.appendChild(y_inp);

		THEADTR.appendChild(THEADTRTD2);

		THEADTRTD3 = Doc.New('td', [ [ 'colspan', 5 ] ]);

		v_sel = Doc.New('select', [ [ 'id', 'NewFarmVillage' ] ]);

		for ( var j = 0; j < Vill.List.length; j++) {

			op = Doc.New('option', [ [ 'value', j ] ]);

			op.innerHTML = Vill.List[j][0];

			v_sel.appendChild(op);

		}

		THEADTRTD3.appendChild(v_sel);

		THEADTR.appendChild(THEADTRTD3);

		THEADTRTD4 = Doc.New('td', [ [ 'colspan', 3 ] ]);

		am_sel = Doc.New('select', [ [ 'id', 'NewFarmMode' ] ]);

		op = Doc.New('option', [ [ 'value', 3 ] ]);

		op.innerHTML = 'Normal';

		am_sel.appendChild(op);

		op = Doc.New('option', [ [ 'value', 4 ] ]);

		op.innerHTML = 'Raid';

		am_sel.appendChild(op);

		THEADTRTD4.appendChild(am_sel);

		THEADTR.appendChild(THEADTRTD4);

		THEADTRTD5 = Doc.New('td');

		int_sel = Doc.New('select', [ [ 'id', 'NewFarmInterval' ] ]);

		for (j = 1; j <= 30; j++) {

			op = Doc.New('option', [ [ 'value', j ] ]);

			op.innerHTML = j;

			int_sel.appendChild(op);

		}

		THEADTRTD5.appendChild(int_sel);

		THEADTR.appendChild(THEADTRTD5);

		THEAD.appendChild(THEADTR);

		NT.appendChild(THEAD);

		TBODY = Doc.New('tbody', [ [ 'class', 'infos' ] ]);

		TBTR = Doc.New('tr');

		TBTR1 = Doc.New('tr');

		TBTR1TH = Doc.New('th');

		TBTR1TH.innerHTML = "Troops";

		TBTRTH = Doc.New('th');

		TBTR.appendChild(TBTRTH);

		TBTR1.appendChild(TBTR1TH);

		for ( var j = 1; j <= 11; j++) {

			jj = (Race * 10) + j;

			trTD = Doc.New("td");

			TTitle = Troops.Name[Race][j - 1];

			if (j == 11) {

				jj = 'hero';

			}

			trImg = Doc.New("IMG", [ [ 'class', 'unit u' + jj ],
					[ 'title', TTitle ], [ 'alt', TTitle ],
					[ 'src', 'img/x.gif' ] ]);

			trTD.appendChild(trImg);

			TBTR.appendChild(trTD);

			trTD1 = Doc.New("td");

			trNum = Doc.New("input", [ [ 'size', '2' ],
					[ 'id', 'NewFarmTroops_t' + j ], [ 'value', 0 ] ]);

			trTD1.appendChild(trNum);

			TBTR1.appendChild(trTD1);

		}

		TBODY.appendChild(TBTR);

		TBODY.appendChild(TBTR1);

		TBODY1 = Doc.New("tbody", [ [ 'class', 'infos' ] ]);

		TBD1TR = Doc.New("tr");

		TBD1TRTH = Doc.New("th");

		TBD1TRTH.innerHTML = "Actions";

		TBD1TR.appendChild(TBD1TRTH);

		TBD1TRTD = Doc.New("td", [ [ 'colspan', 8 ] ]);

		TD1LAST = Doc.New("input", [ [ 'id', 'NewFarmLast' ],
				[ 'type', 'text' ], [ 'value', '00-00-00 00:00:00' ] ]);

		TD1LABEL = Doc.New("label");

		TD1LABEL.innerHTML = " <i>Last Sent: </i> ";

		TBD1TRTD.appendChild(TD1LABEL);

		TBD1TRTD.appendChild(TD1LAST);

		TBD1TR.appendChild(TBD1TRTD);

		TBD1TRTD1 = Doc.New("td", [ [ 'colspan', 2 ] ]);

		newSaveLink = Doc.New("a", [ [ 'href', 'javascript:void(0);' ] ]);

		newSaveLink.addEventListener("click", Action.Save, false);

		newSaveImg = Doc.New("img", [ [ 'title', 'Save' ], [ 'alt', 'Save' ],
				[ 'src', Images.Save ] ]);

		newSaveLink.appendChild(newSaveImg);

		TBD1TRTD1.appendChild(newSaveLink);

		TBD1TR.appendChild(TBD1TRTD1);

		TBD1TRTD2 = Doc.New("td", [ [ 'colspan', 2 ] ]);

		delLink = Doc.New("a", [ [ 'href', 'javascript:void(0);' ] ]);

		delLink.addEventListener("click", Action.Cancel, false);

		delImg = Doc.New("img", [ [ 'class', 'del' ], [ 'title', 'Cancel' ],
				[ 'alt', 'Cancel' ], [ 'src', 'img/x.gif' ] ]);

		delLink.appendChild(delImg);

		TBD1TRTD2.appendChild(delLink);

		TBD1TR.appendChild(TBD1TRTD2);

		TBODY1.appendChild(TBD1TR);

		NT.appendChild(TBODY);

		NT.appendChild(TBODY1);

		Doc.Element('bfarms').appendChild(NT);

		if (crtPage.match(/position_details.php/)) {

			nfX = crtPage.split('&')[0].split('=')[1];

			nfY = crtPage.split('&')[1].split('=')[1];

			Doc.Element("NewFarmX").value = nfX;

			Doc.Element("NewFarmY").value = nfY;

			h1 = document.getElementsByTagName("h1")[0];

			vName = h1.getElementsByClassName("coordText")[0].innerHTML;

			Doc.Element("NewFarmName").value = vName;

		}

	},

	Save : function() {

		FName = Doc.Element("NewFarmName").value;

		FX = Doc.Element("NewFarmX").value;

		FY = Doc.Element("NewFarmY").value;

		FMODE = Doc.Element("NewFarmMode").value;

		FVill = Doc.Element("NewFarmVillage").value;

		FInterval = Doc.Element("NewFarmInterval").value;

		FTroops = "";

		for ( var j = 1; j < 12; j++) {

			FTroops += ("|" + Doc.Element("NewFarmTroops_t" + j).value);

		}

		FLAST = Doc.Element("NewFarmLast").value;

		Farms.New([ FName, FX, FY, FMODE, FVill, FTroops.substr(1), FLAST,
				FInterval, 1 ]);

		GM_setValue(dataIndex + "_isNew", 'added');

		window.location = crtPage;

	},

	Cancel : function() {

		NT = Doc.Element("NewFarmTable");

		Doc.Element("bfarms").removeChild(NT);

	},

	Backup : function() {

		Doc.Element("backup_link").style.display = 'none';

		Doc.Element("restore_link").style.display = 'none';

		myData = GM_getValue(dataIndex, false);

		textArea = Doc.New("textarea", [ [ 'id', 'backup' ],
				[ 'style', 'width: 470px;height: 100px' ] ]);

		textArea.innerHTML = myData;

		Doc.Element("content").appendChild(textArea);

	},

	Restore : function() {

		Doc.Element("backup_link").style.display = 'none';

		Doc.Element("restore_link").style.display = 'none';

		textArea = Doc.New("textarea", [ [ 'id', 'restore' ],
				[ 'style', 'width: 470px;height: 100px' ], ]);

		Doc.Element("content").appendChild(textArea);

		acceptBtn = Doc.New("input", [ [ 'id', 'restoreA' ],
				[ 'type', 'button' ], [ 'value', 'Restore' ] ]);

		acceptBtn.addEventListener('click', Action.Import, false);

		Doc.Element("content").appendChild(acceptBtn);

	},

	Import : function() {

		importData = Doc.Element("restore").value;

		GM_setValue(dataIndex, importData);

		window.location = Host + "/dorf3.php";

	}

};

var Log = {
	Info : function(msg) {
		var strLog = decodeURIComponent(GM_getValue(dataIndex + "_log", false));

		if (strLog != 'false' && strLog.length > 1 && strLog.length < 20000)
			strLog += ("\n[" + Time.getCurrTime() + "] - [" + msg + " ] ");
		else
			strLog = ("\n[" + Time.getCurrTime() + "] - [" + msg + " ] ");

		GM_setValue(dataIndex + "_log", encodeURIComponent(strLog));
	},
	// bis hier hin clean!!!
	Show : function() {
		goldclub_active = GM_getValue(dataIndex + "_GoldClub_", "1");
		if (goldclub_active == "1") {

			logTable = Doc.New('ul');

			var strLog = decodeURIComponent(GM_getValue(dataIndex + "_log",
					false));

			aLogs = strLog.split("\n");

			for ( var j = 0; j < aLogs.length; j++) {

				td = Doc.New("li");

				td.innerHTML = "<p>" + aLogs[j] + "</p>";

				logTable.appendChild(td);

			}

			td = Doc.New("li");

			clearButton = Doc.New("button");

			clearButton.addEventListener('click', function() {
				Log.Clear();
			}, false);

			clearButton.innerHTML = "Clear Log";

			td.appendChild(clearButton);

			logTable.appendChild(td);

			side_info = Doc.Element("villageList").getElementsByClassName(
					"list")[0];

			side_info.appendChild(logTable);
		} else if (goldclub_active == "0") {
			logTable = Doc.New('table', [ [ 'cellspacing', 1 ],
					[ 'cellpadding', 1 ], [ 'style', 'background: #c0c0c0' ] ]);

			THEAD = Doc.New('thead');

			THEADTR = Doc.New('tr');

			THEADTRTD = Doc.New('td');

			THEADTRTD.innerHTML = "<b style='color:#00BC00; '>Raiding LOG </b> ";

			THEADTR.appendChild(THEADTRTD);

			THEAD.appendChild(THEADTR);

			logTable.appendChild(THEAD);

			TBODY = Doc.New('tbody');

			var strLog = decodeURIComponent(GM_getValue(dataIndex + "_log",
					false));

			aLogs = strLog.split("\n");

			for ( var j = 0; j < aLogs.length; j++) {

				tr = Doc.New("tr");

				td = Doc.New("td");

				td.innerHTML = "<p style='text-align: left; margin: 0; padding: 0 5px;'> "
						+ aLogs[j] + " </p>";

				tr.appendChild(td);

				TBODY.appendChild(tr);

			}

			// Insert Clear Button

			tr = Doc.New("tr");

			td = Doc.New("td");

			clearButton = Doc.New("button");

			clearButton.addEventListener('click', function() {
				Log.Clear();
			}, false);

			clearButton.innerHTML = "Clear Log";

			td.appendChild(clearButton);

			tr.appendChild(td);

			TBODY.appendChild(tr);

			logTable.appendChild(TBODY);

			side_info = Doc.Element("side_info");

			side_info
					.setAttribute('style',
							"position: absolute; top: 97px; left: 682px; width: 680px;");

			side_info.appendChild(logTable);
		}

	},

	Clear : function() {

		GM_setValue(dataIndex + "_log", '');

		goldclub_active = GM_getValue(dataIndex + "_GoldClub_", "1");

		if (goldclub_active == "0")
			window.location = Host + "/dorf3.php";
	}
};

function getUserId() {

	navi = Doc.Element("side_info");

	navi_p = navi.getElementsByClassName("sideInfoPlayer")[0];

	profile_link = navi_p.getElementsByTagName("a")[0];

	return profile_link.href.split("=")[1];

};

var Check = {

	Count : 0,

	isRedirect : false,

	DeletedOrBanned : function(farm_id) {

		ErrorMsg = document.getElementsByClassName("error");

		if (ErrorMsg && ErrorMsg.length > 0) {

			fIn = Doc.Element("fn_" + farm_id).value;

			fX = Doc.Element("fx_" + farm_id).value;

			fY = Doc.Element("fy_" + farm_id).value;

			if (ErrorMsg[0].innerHTML.match(/slots are used/)
					|| ErrorMsg[0].innerHTML.match(/No troops/)) {

				crT = Time.getCurrTime();

				Log.Info("DELAYED Name:" + fIn + " , x = " + fX + " , y = "
						+ fY + " R = " + ErrorMsg[0].innerHTML);

				Farms.Edit(farm_id, [ [ 6, crT ] ]);

			} else {

				Log.Info("DELETED Name:" + fIn + " , x = " + fX + " , y = "
						+ fY + " R = " + ErrorMsg[0].innerHTML);

				Farms.Remove(farm_id);

			}

		}

	},

	Login : function(farm_id) {

		LoginReq = Doc.Element("login_form");

		if (LoginReq && LoginReq.innerHTML.length > 0) {

			LoginForm = document.getElementsByName("snd")[0];

			LoginData = "";

			LoginForm.setAttribute('target', '_blank');

			LoginForm.submit();

			isRedirect = false;

			setInterval(function() {

				if (Check.isRedirect) {

					Log.Info("Logged IN");

					window.location = Host + "/dorf3.php";

				}

				Check.isRedirect = true;

			}, 4000);

		} else {

			Attack.Fill(farm_id);

		}

	},

	Refresh : function() {

		hasNew = GM_getValue(dataIndex + "_isNew", false);

		if (hasNew == 'added') {

			window.location = Host + "/dorf3.php";

		} else {

			if (Check.Count > 300) {

				Check.Count = 0;

				GM_xmlhttpRequest({

					method : 'GET',

					url : Host + "/dorf3.php",

					headers : {
						'Accept' : 'application/atom+xml,application/xml,text/xml'
					},

					onload : function(responseDetails) {

						window.location = Host + "/dorf3.php";

					}

				});

			}

			else {

				Check.Count += 1;

			}

		}

	},

	Safety : function() {

		LastWorked = GM_getValue(dataIndex + "_last", false);

		currTime = Time.getCurrTime();

		if ((Time.toSec(currTime) - Time.toSec(LastWorked)) > 1200) {

			Doc.Tab('dorf3.php');

		}

	},

};

var Thread = {

	Sending : false,

	Interval : false,

	Curr : -1,

	List : [],

	Wait : [],

	Init : function() {

		this.Stop();

		this.Interval = setInterval(Thread.Process, 1000);

	},

	Process : function() {

		for ( var i = 0; i < Thread.List.length; i++) {

			if (Thread.List[i][0] == true) {

				Thread.List[i][2]--;

				if (Thread.List[i][2] < 0
						|| Thread.List[i][2] >= Thread.List[i][1]) {

					if (Thread.List[i][3] == 'def1') {

						Thread.List[i][3] = 'clock';

						if (Thread.Curr < 0) {

							Thread.Wait[i] = Math.ceil(Math.random() * 10);

							if (crtPage.match(/karte.php/)) {

								Thread.Wait[i] += 10;

							}

							Thread.Curr = i;

							if (ListView == false) {

								Doc.Element('fTable_' + i).setAttribute(
										'class', 'cur');

							} else {

								Doc.Element('fTR_' + i).setAttribute('class',
										'hl');

							}

						}

					} else if (Thread.List[i][3] == 'clock') {

						if (Thread.Curr == i) {

							Thread.Wait[i]--;

							Doc.Element('ft_' + i).innerHTML = Time.toHour(
									Thread.Wait[i]).split(' ')[1];

							if (Thread.Wait[i] <= 0) {

								Thread.List[i][0] = false;

								Thread.Curr = -1;

								Thread.Stop();

								Thread.Send(i);

							}

						} else {

							Doc.Element('ft_' + i).innerHTML = "Waiting...";

							if (ListView == false) {

								Doc.Element('fTable_' + i).setAttribute(
										'class', 'wait');

							} else {

								Doc.Element('fTR_' + i).setAttribute('class',
										'wait');

							}

						}

					} else {

						Thread.Reinf(i);

					}

				} else {

					Doc.Element('ft_' + i).innerHTML = Time.toHour(
							Thread.List[i][2]).split(' ')[1];

				}

			}

		}

	},

	Stop : function() {

		clearInterval(this.Interval);

	},

	Send : function(farm_id) {

		if (crtPage.match(/karte.php/)) {

			window.location = crtPage;

		} else {

			Attack.Pre(farm_id);

		}

	},

	Reinf : function(farm_id) {

		Thread.List[farm_id][4] = 'def1';

		Thread.List[farm_id][2] = Thread.List[farm_id][1];

		Thread.List[farm_id][0] = true;

	}

};

var Attack = {

	Pre : function(farm_id) {

		tX = Doc.Element("fx_" + farm_id).value;

		tY = Doc.Element("fy_" + farm_id).value;

		z = "z=" + Doc.xy2id(tX, tY);

		url = Host + "/build.php?id=39&tt=2&" + z;

		GM_xmlhttpRequest({

			method : 'GET',

			url : url,

			headers : {
				'Accept' : 'application/atom+xml,application/xml,text/xml'
			},

			onload : function(responseDetails) {

				resp = Doc.Element("resp");

				resp.innerHTML = responseDetails.responseText;

				FormTag = resp.getElementsByTagName('form')[0];

				resp.appendChild(FormTag);

				Doc.Element('content').appendChild(resp);

				Check.Login(farm_id);

			}

		});

	},

	Fill : function(farm_id) {

		timestamp = document.getElementsByName("timestamp")[0].value;

		timestamp_sum = document.getElementsByName("timestamp_checksum")[0].value;

		b = document.getElementsByName("b")[0].value;

		c = Doc.Element("fam_" + farm_id).value;

		troo = [];

		for ( var j = 0; j < 11; j++) {

			jj = j + 1;

			troo[j] = Doc.Element("f" + farm_id + "_t" + jj).value;

		}

		tX = Doc.Element("fx_" + farm_id).value;

		tY = Doc.Element("fy_" + farm_id).value;

		z = "z=" + Doc.xy2id(tX, tY);

		reqData = "timestamp=" + timestamp + "&timestamp_checksum="
				+ timestamp_sum + "&b=" + b + "&c=" + c

				+ "&t1=" + troo[0] + "&t2=" + troo[1] + "&t3=" + troo[2]
				+ "&t4=" + troo[3] + "&t5=" + troo[4] + "&t6=" + troo[5]

				+ "&t7=" + troo[6] + "&t8=" + troo[7] + "&t9=" + troo[8]
				+ "&t10=" + troo[9] + "&t11=" + troo[10]

				+ "&dname=&x=" + tX + "&y=" + tY + "&s1=ok&attacks=&cords=";

		url = Host + "/build.php?id=39&tt=2";

		url += ("&" + z + "&" + Vill.List[Doc.Element("fv_" + farm_id).value][1]);

		GM_xmlhttpRequest({

			method : 'POST',

			url : url,

			headers : {
				'Content-type' : 'application/x-www-form-urlencoded'
			},

			data : encodeURI(reqData),

			onload : function(responseDetails) {

				Attack.Accept(responseDetails.responseText, farm_id);

			}

		});

	},

	Accept : function(a2b_doc, farm_id) {

		url = Host + "/build.php?id=39&tt=2";

		url += ("&" + Vill.List[Doc.Element("fv_" + farm_id).value][1]);

		resp = Doc.Element("resp");

		resp.innerHTML = a2b_doc;

		Check.DeletedOrBanned(farm_id);

		FormTag = resp.getElementsByTagName('form')[0].innerHTML;

		resp.innerHTML = FormTag;

		Doc.Element('content').appendChild(resp);

		form_datas = [ 'timestamp', 'timestamp_checksum', 'id', 'a', 'c',
				'kid', 's1',

				't1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10',
				't11' ];

		reqData = '';

		val = '';

		isOne = 0;

		for ( var j = 0; j < form_datas.length; j++) {

			val = document.getElementsByName(form_datas[j])[0].value;

			if (isOne == 0 && j > 6 && j < 17 && parseInt(val) > 1) {

				isOne = 1;

			}

			reqData += ("&" + form_datas[j] + "=" + val);

		}

		if (isOne == 0 && parseInt(val) < 1) {

			fIn = Doc.Element("fn_" + farm_id).value;

			fX = Doc.Element("fx_" + farm_id).value;

			fY = Doc.Element("fy_" + farm_id).value;

			crT = Time.getCurrTime();

			Log.Info("DELAYED Name:" + fIn + " , x = " + fX + " , y = " + fY
					+ " R = " + "Be Carefull! Only 1 troop will not go.");

			Farms.Edit(farm_id, [ [ 6, crT ] ]);

		} else {

			reqData = reqData.substr(1);

			GM_xmlhttpRequest({

				method : 'POST',

				url : url,

				headers : {
					'Content-type' : 'application/x-www-form-urlencoded'
				},

				data : encodeURI(reqData),

				onload : function(responseDetails) {

					crT = Time.getCurrTime();

					Farms.Edit(farm_id, [ [ 6, crT ] ]);

				}

			});

		}

	}

};

var Map = {

	X : 800,

	Y : 800,

	Thread : function() {

		newx = parseInt(Doc.Element("mcx").value);

		newy = parseInt(Doc.Element("mcy").value);

		if (newx != Map.X || newy != Map.Y) {

			Map.X = newx;

			Map.Y = newy;

			Map.Draw();

		}

	},

	Init : function() {

		setInterval(Map.Draw, 2000);

	},

	Draw : function() {

		/*
		 * newCenter = "d="+Doc.xy2id(Map.X,Map.Y);
		 * 
		 * currCenter = Doc.Element('a_3_3').href.split('?')[1].split('&')[0];
		 * 
		 * if( currCenter == newCenter){
		 */

		var strFarms = decodeURIComponent(GM_getValue(dataIndex, false));

		if (strFarms != 'false' && strFarms.length > 1) {

			baseStr = '';

			aFarms = strFarms.split('$$');

			sFs = [];

			for ( var i = 0; i < aFarms.length; i++) {

				aFarm = aFarms[i].split('$');

				fX = aFarm[1];

				fY = aFarm[2];

				sFs[i] = 'd=' + Doc.xy2id(fX, fY);

			}

			var maxCount = 7;

			if (Doc.Element('a_8_8')) {

				maxCount = 13;

			}

			for ( var i = 0; i < maxCount; i++) {

				for ( var j = 0; j < maxCount; j++) {

					aM = Doc.Element('a_' + i + '_' + j);

					cStr = aM.href.split('?')[1].split('&')[0];

					for ( var t = 0; t < sFs.length; t++) {

						if (cStr == sFs[t]) {

							iM = Doc.Element('i_' + i + '_' + j);

							cM = iM.getAttribute('class');

							nCt = parseInt(cM.split('')[1]);

							if (nCt == 0)
								nCt++;

							nC = "tf" + nCt;

							if (cM.split('')[0] == 'b')
								iM.setAttribute('class', nC);

						}

					}

				}

			}

		}

		/*
		 * }else {
		 * 
		 * //alert(currCenter + "--" + newCenter);
		 * 
		 * Map.X = 800; }
		 */

	},

};

// Main Code
goldclub_active = GM_getValue(dataIndex + "_GoldClub_", "1");
//goldclub_active = "0";
if (goldclub_active == "1") {
	var crtPage = window.location.href;
	Doc.Login();
} else if (goldclub_active == "0") {
	var user_id = Vill.getUserId();
	var dataIndex = window.location.hostname.split(".")[0] + "_" + user_id
			+ "_farms";
}

if (crtPage.match(/login.php/)) {
	Doc.Login();
} else if (crtPage.match(/dorf3.php/)) {
	if (goldclub_active == "1") {
		var user_id = getUserId();
		var dataIndex = window.location.hostname.split(".")[0] + "_" + user_id
				+ "_farms";

		setInterval(function() {
			Doc.Safe();
		}, 60000);

		Config.Board();
	} else if (goldclub_active == "0") {
		setInterval(function() {
			Check.Refresh();
		}, 1000);
		GM_setValue(dataIndex + "_last", Time.getCurrTime());
		Vill.Race();
		Vill.Init();
		var view_type = GM_getValue(dataIndex + "_vt", false);
		if (view_type == false || view_type == 'false') {
			GM_setValue(dataIndex + "_vt", 'box');
			ListView = false;
			Farms.List();
		} else if (view_type == 'list') {
			Farms.ListSmall();
			ListView = true;
		} else {
			ListView = false;
			Farms.List();
		}
		GM_setValue(dataIndex + "_isNew", '');
	}
} else if (crtPage.match(/build.php?gid=16&tt=99/)) {
	var user_id = getUserId();
	var dataIndex = window.location.hostname.split(".")[0] + "_" + user_id
			+ "_farms";

	Farm.Init();
} else if (crtPage.match(/position_details.php/)) {
	if (goldclub_active == "0") {
		dataURL = crtPage.split("?")[1];
		Vill.Race();
		Vill.Init();
		Farms.List();
	}
} else if (crtPage.match(/statistiken.php/)) {
	if (goldclub_active == "0") {
		setInterval(function() {
			Check.Safety();
		}, 300000);
	}
}