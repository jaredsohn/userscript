// ==UserScript==
// @name           Colorful Google Calendar
// @namespace      http://d.hatena.ne.jp/sheile/
// @description    Paint background color with weekend on Google Calendar.
// @include        http://www.google.com/calendar/render*
// @include        https://www.google.com/calendar/render*
// ==/UserScript==

(function ()
{
	//	------------ Setting Section ---------------
	//	text color
	var saturdayColor = "blue";
	var sundayColor = "red";
	var otherColor = "black";

	//	background color
	var saturdayBackgroundColor = "#CCCCFF";
	var sundayBackgroundColor = "#FFCCCC";

	var saturdaySelectedBackgroundColor = "#8888EE";
	var sundaySelectedBackgroundColor = "#EE8888";

	//	paint to mini calendar that left top on the page. (true / false)
	var isColorfulMiniCalendar = true;
	//	------------ Setting Section End ---------------

	var prevCol = {};

	function $$(selector)
	{
		return document.querySelectorAll(selector);
	}

	function $(id)
	{
		return (window.wrappedJSObject || window).document.getElementById(id);
	}

	document.addEventListener("DOMSubtreeModified", onSubTreeModified, false);

	//-----------------------------------------------------------
	//	DOM変化時にカレンダー着色ロジックを呼び出す
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
	//	カレンダーを着色する
	//-----------------------------------------------------------
	function addColor()
	{
		isRefresh = false;
		
		//	対象カラム取得
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
	//	着色対象のカラムを返す
	//-----------------------------------------------------------
	function getTargetColumns()
	{
		//	ミニカレンダーの着色列
		var targetColumns = {};
		matchResult = $("dp_0_cur").innerHTML.match(/([0-9]{4})年\s*([0-9]{1,2})月/);
		var miniBaseDate = new Date(matchResult[1], matchResult[2] - 1, 0);
		miniBaseDate.setDate($("dp_0_row_0").childNodes[0].innerHTML);

		targetColumns["MiniSaturday"] = 6 - miniBaseDate.getDay();
		targetColumns["MiniSunday"] = (7 - miniBaseDate.getDay()) % 7;

		//	メインカレンダーの着色列
		var xpath = "";
		xpath += "descendant::td[";
		xpath += "contains(@class,'dp-weekday-selected') or ";
		xpath += "contains(@class,'dp-weekend-selected')";
		xpath += "][1]";
		var selectedDate = document.evaluate(xpath, $("dp_0"), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if(selectedDate == null) return targetColumns;

		var baseDate = new Date(matchResult[1], matchResult[2] - 1, 1);
		if(selectedDate.className.indexOf("dp-offmonth") != -1) baseDate.setTime(baseDate.getTime() - 24 * 3600 * 1000);
		baseDate.setDate(parseInt(selectedDate.innerHTML));

		targetColumns["Saturday"] = 6 - baseDate.getDay();
		targetColumns["Sunday"] = (7 - baseDate.getDay()) % 7;

		return targetColumns;
	}


	//-----------------------------------------------------------
	//	左上のミニカレンダー着色
	//-----------------------------------------------------------
	function paintMiniCalendar(targetColumns)
	{
		var headers = document.getElementsByClassName("dp-cell dp-dayh");
		//	ミニカレンダー
		var rows = $("dp_0_tbl").getElementsByTagName("tr").length - 2;
		for(var i = 0; i < rows; i++) {
			var days = $("dp_0_row_" + i).childNodes;

			//	土曜日
			var satTarget = days[targetColumns["MiniSaturday"]];
			paintMiniCalendarBackground(satTarget, saturdayBackgroundColor, saturdaySelectedBackgroundColor);

			//	日曜日
			var sunTarget = days[targetColumns["MiniSunday"]];
			paintMiniCalendarBackground(sunTarget, sundayBackgroundColor, sundaySelectedBackgroundColor);
		}

		headers[targetColumns["MiniSaturday"]].style.color = saturdayColor;
		headers[targetColumns["MiniSunday"]].style.color = sundayColor;

		return false;
	}


	//-----------------------------------------------------------
	//	ミニカレンダーの背景色が正しく付けられているかを確認
	//-----------------------------------------------------------
	function paintMiniCalendarBackground(target, normalColor, selectedColor)
	{
		if(target.className.indexOf("dp-today-selected") != -1) return;
		
		var isSelected = (target.className.indexOf("dp-weekend-selected") != -1);
		target.style.backgroundColor = isSelected ? selectedColor : normalColor;
	}

	//-----------------------------------------------------------
	//	メインカレンダーに着色する必要があるか否かを返す
	//-----------------------------------------------------------
	function isNeedPaintMain(targetColumns)
	{
		//	予定リストは着色不要
		return document.querySelector("#topRightNavigation .goog-imageless-button:last-child[class~='goog-imageless-button-checked']") == null;
	}


	//-----------------------------------------------------------
	//	メインのカレンダーを着色
	//-----------------------------------------------------------
	function paintMainCalendar(targetColumns)
	{
		var saturdayCols = $$("td[class^=st-bg]:nth-child(" + (targetColumns["Saturday"] + 1) + ")");
		var sundayCols   = $$("td[class^=st-bg]:nth-child(" + (targetColumns["Sunday"] + 1) + ")");
		
		for(var i = 0; i < saturdayCols.length; i++) {
			saturdayCols[i].style.backgroundColor = saturdayBackgroundColor;
		}
		for(var i = 0; i < sundayCols.length; i++) {
			sundayCols[i].style.backgroundColor = sundayBackgroundColor;
		}
		
		var saturdayCol = $$("td[class^='tg-col']")[targetColumns["Saturday"]];
		var sundayCol = $$("td[class^='tg-col']")[targetColumns["Sunday"]];
		if(saturdayCol) saturdayCol.style.backgroundColor = saturdayBackgroundColor;
		if(sundayCol) sundayCol.style.backgroundColor = sundayBackgroundColor;
	}
})();
