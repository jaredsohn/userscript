// ==UserScript==
// @name           Colorful Google Calendar
// @namespace      http://d.hatena.ne.jp/sheile/
// @description    Google Calendar??????????
// @include        http://www.google.com/calendar/render*
// @include        https://www.google.com/calendar/render*
// ==/UserScript==

(function ()
{
	//	???????
	var saturdayColor = "blue";
	var sundayColor = "red";
	var otherColor = "black";

	//	???????
	var saturdayBackgroundColor = "#CCCCFF";
	var sundayBackgroundColor = "#FFCCCC";

	var saturdaySelectedBackgroundColor = "#8888EE";
	var sundaySelectedBackgroundColor = "#EE8888";

	//	??????????????????(true / false)
	var isColorfulMiniCalendar = true;

	var prevCol = {};

	function $(id)
	{
		return (window.wrappedJSObject || window).document.getElementById(id);
	}

	document.addEventListener("DOMSubtreeModified", onSubTreeModified, false);

	//-----------------------------------------------------------
	//	DOM????????????????????
	//-----------------------------------------------------------
	var isRefresh = false;
	function onSubTreeModified()
	{
		if(isRefresh == false) {
			setTimeout(addColor, 10);
			isRefresh = true;
		}
	}

	//-----------------------------------------------------------
	//	??????????
	//-----------------------------------------------------------
	function addColor()
	{
		isRefresh = false;
		
		//	???????
		var targetColumns = getTargetColumns();

		if(isColorfulMiniCalendar) {
			paintMiniCalendar(targetColumns);
		}

		if(targetColumns["Saturday"] == undefined || targetColumns["Sunday"] == undefined) return;
		if(isNeedPaintMain(targetColumns)) {
			paintMainCalendar(targetColumns);
		}
	}


	//-----------------------------------------------------------
	//	???????????
	//-----------------------------------------------------------
	function getTargetColumns()
	{
		//	???????????
		var targetColumns = {};
		matchResult = $("dp_0_cur").innerHTML.match(/([0-9]{4})?\s*([0-9]{1,2})?/);
		var miniBaseDate = new Date(matchResult[1], matchResult[2] - 1, 0);
		miniBaseDate.setDate($("dp_0_row_0").childNodes[0].innerHTML);

		targetColumns["MiniSaturday"] = 6 - miniBaseDate.getDay();
		targetColumns["MiniSunday"] = (7 - miniBaseDate.getDay()) % 7;

		//	????????????
		var xpath = "";
		xpath += "descendant::td[";
		xpath += "contains(@class,'dp-weekday-selected') or ";
		xpath += "contains(@class,'dp-weekend-selected')";
		xpath += "][1]";
		var selectedDate = document.evaluate(xpath, $("dp_0"), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if(selectedDate == null) return targetColumns;

		var baseDate = new Date(matchResult[1], matchResult[2] - 1, 1);
		if(selectedDate.className.indexOf("DP_offmonth") != -1) baseDate.setTime(baseDate.getTime() - 24 * 3600 * 1000);
		baseDate.setDate(parseInt(selectedDate.innerHTML));

		targetColumns["Saturday"] = 6 - baseDate.getDay();
		targetColumns["Sunday"] = (7 - baseDate.getDay()) % 7;

		return targetColumns;
	}


	//-----------------------------------------------------------
	//	????????????
	//-----------------------------------------------------------
	function paintMiniCalendar(targetColumns)
	{
		var headers = document.getElementsByClassName("dp-cell dp-dayh");
		//	???????
		for(var i = 0; i < 7; i++) {
			var days = $("dp_0_row_" + i).childNodes;

			//	???
			var satTarget = days[targetColumns["MiniSaturday"]];
			paintMiniCalendarBackground(satTarget, saturdayBackgroundColor, saturdaySelectedBackgroundColor);

			//	???
			var sunTarget = days[targetColumns["MiniSunday"]];
			paintMiniCalendarBackground(sunTarget, sundayBackgroundColor, sundaySelectedBackgroundColor);
		}

		headers[targetColumns["MiniSaturday"]].style.color = saturdayColor;
		headers[targetColumns["MiniSunday"]].style.color = sundayColor;

		return false;
	}


	//-----------------------------------------------------------
	//	??????????????????????????
	//-----------------------------------------------------------
	function paintMiniCalendarBackground(target, normalColor, selectedColor)
	{
		if(target.className.indexOf("dp-today-selected") != -1) return;
		
		var isSelected = (target.className.indexOf("dp-weekend-selected") != -1);
		target.style.backgroundColor = isSelected ? selectedColor : normalColor;
	}

	//-----------------------------------------------------------
	//	????????????????????????
	//-----------------------------------------------------------
	function isNeedPaintMain(targetColumns)
	{
		//	??????????
		return $("mode-list").parentNode.className != "modelinkOn";
	}


	//-----------------------------------------------------------
	//	????????????
	//-----------------------------------------------------------
	function paintMainCalendar(targetColumns)
	{
		if($("mode-month").parentNode.className != "modelinkOn") {
			var colMax = document.getElementsByClassName("tg-daywrapper").length;
			//	???
			addBackgroundColor("Saturday", targetColumns["Saturday"], saturdayBackgroundColor, colMax);
			addBackgroundColor("Sunday", targetColumns["Sunday"], sundayBackgroundColor, colMax);
		} else {
			var cells = document.getElementsByClassName("st-bg");
			for(var i = 0; i < cells.length; i++) {
				if(cells[i].className.indexOf("st-bg-today") == -1) {
					if(i % 7 == targetColumns["Saturday"]) cells[i].style.backgroundColor = saturdayBackgroundColor;
					if(i % 7 == targetColumns["Sunday"])   cells[i].style.backgroundColor = sundayBackgroundColor;
				}
			}
		}
	}


	//-----------------------------------------------------------
	//	??????????
	//-----------------------------------------------------------
	function addBackgroundColor(id, col, color, colMax)
	{
		var bgElement = $("__addBackgroundColor" + id);
		if(col < 0 || col >= colMax) {
			if(bgElement != null) {
				bgElement.parentNode.removeChild(bgElement);
			}
			prevCol[id] = col;
			return;
		}

		//	??????????????????????
		if(bgElement != undefined) {
			if(col == prevCol[id]) return;
			bgElement.parentNode.removeChild(bgElement);
		}

		var div = document.createElement("DIV");
		div.id = "__addBackgroundColor" + id;
		div.style.height = "1008px";
		div.style.marginBottom = "-1008px";
		div.style.backgroundColor = color;

		var targetNode = document.getElementsByClassName("tg-daywrapper")[col];
		targetNode.parentNode.insertBefore(div, $("tgDay" + col));

		prevCol[id] = col;
	}


})();