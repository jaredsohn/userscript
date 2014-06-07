// ==UserScript==
// @name                 SFDC ResourceInMultiUserCalendar
// @namespace            http://twitter.com/mino0123
// @description          マルチユーザカレンダーで、リソースカレンダーを表示します。
// @include              https://*.salesforce.com/00U/c*
// ==/UserScript==



(function(){
	if (! document.getElementById("evt4")) {
		return;
	}
	
	var bodyDiv = document.getElementById("bodyCell"),
	    calTable = document.createElement("table"),
        form = document.getElementById("ids"),
        bodyTable = document.getElementById("bodyTable"),
        resourceArray, resource, i;
	calTable.style.width = "100%";
	calTable.insertRow(0);
	bodyDiv.appendChild(calTable);
	
	// [{name,id}]
	resourceArray = loadCalendarResources();
	typeof sortResource === "function" && (resourceArray = resourceArray.sort(sortResource));
	for (i = resourceArray.length -1; i >= 0; i--) {
		var resource = resourceArray[i];
		loadResourceCalendar(
			"/00U/c?cType=1&cal_lkid=" + resource.id + "&cal_lspf=1&" + getMdParameter(),
			calTable.rows[0].insertCell(0),
			resource.id,
			resource.name
		);
	}
	
	// 入力フォームをtableとtrの間からtableの親へ変更。
	bodyTable.parentNode.appendChild(form);
	form.appendChild(bodyTable);
})();


/**
 * ルックアップページからリソース情報を読み込みます。
 */
function loadCalendarResources() {
	var resources = [],
		url = "/_ui/common/data/LookupResultsFrame?lktp=023&cltp=resource",
		req = new XMLHttpRequest();
	
	req.open("GET", url, false);
	req.send(null);
	
	var res = req.responseText;
	res = res.replace(/(\r\n)|\r|\n/g, '').replace(/^.*?(<table)/, "$1").replace(/(<\/table.*?>).*?$/, "$1");
	
	var parser = new DOMParser();
	var doc = parser.parseFromString(res, "text/xml");
	var listTable = doc.documentElement;
	var rows = Array.prototype.slice.call(listTable.getElementsByTagName("tr"));
	rows.shift();
	for (var i = 0, len = rows.length; i < len; i++) {
		var row = rows[i];
		var link = row.getElementsByTagName("a")[0];
		var name = link.textContent;
		var onclick = link.getAttribute("onclick");
		var id = onclick.match(/023[\d\w]{12}/)[0];
		resources.push({
			"name": name,
			"id": id
		});
	}
	return resources;
}


/**
 * リソースのソート用関数
 * @param resource1
 * @param resource2
 */
function sortResource(resource1, resource2) {
	return resource1.name > resource2.name;
}


/**
 * リソースのカレンダーを読み込んで画面に設置する。
 * @param url    リソースカレンダーのurl
 * @param target 読み込んだカレンダーの設置先要素
 * @param id     リソースのID
 * @param title  リソース名
 */
function loadResourceCalendar(url, target, id, title) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET" , url , true);
	xhr.onload = function() {
		var htmlDoc = document.cloneNode(false);
		
		if (htmlDoc) {
			htmlDoc.appendChild(htmlDoc.importNode(document.documentElement, false));
			var range = document.createRange();
			range.setStartAfter(document.body);
			var fragment = range.createContextualFragment(xhr.responseText);
			htmlDoc.documentElement.appendChild(fragment);
		} else {
			// Chrome
			htmlDoc = document.createElement("div");
			htmlDoc.innerHTML = xhr.responseText.replace(/.*?<body.*?>/, "").replace(/<\/body>.*/, "");
		}
		
		var calendar;
		var calendarBody = htmlDoc.getElementsByClassName("apexp")[0];
		if (!! calendarBody) {
			calendar = calendarBody.parentNode;
		} else { //Month Calendar
			calendar = htmlDoc.getElementsByClassName("bCalendar")[0];
		}
		
		if (calendar.tagName.toUpperCase() === "FORM") { // フォームがあると移動後に2重になるため削除
			calendar.parentNode.removeChild(calendar);
			var newCalendar = document.createElement("div");
			moveChildren(calendar, newCalendar);
			calendar = newCalendar;
		}
		
		var calendarWrapper = calendar.getElementsByClassName("bPageBlock apexDefaultPageBlock secondaryPalette")[0];
		if (! calendarWrapper) {
			calendarWrapper = calendar;
		}
		
		var invtee = document.createElement("input");
		invtee.type = "checkbox";
		invtee.name = "invtee";
		invtee.value = id;
		invtee.className = "cbCol";
		calendarWrapper.insertBefore(invtee, calendarWrapper.firstChild);
		
		var titleLink = document.createElement("a");
		titleLink.href = url;
		calendarWrapper.insertBefore(titleLink, calendarWrapper.firstChild);
		var titleElm = document.createElement("h3");
		titleElm.textContent = title;
		titleLink.appendChild(titleElm);
		
		var bCalendar = wrapClass(calendar, [/*"calendarBlock", */"calendarLayout", "bCalendar"]);
		
		target.appendChild(bCalendar);
	};
	xhr.send();
}


/**
 * カレンダーURLの md0 と md1|md2|md3 パラメータを文字列で取得
 */
function getMdParameter() {
	var ThisYear = new Date().getFullYear();
	var OneDay = 1000 * 60 * 60 * 24;
	var firstInYear = new Date(ThisYear, 0, 1);
	var timeInYear = new Date(document.getElementById("evt4").value) - firstInYear;
	var daysInYear = (timeInYear - (timeInYear % OneDay)) / OneDay + 1; //1/1からの日付
	var weeksInYear = Math.round(daysInYear / 7) + 1;
    
	var isDay = document.getElementsByClassName("dayView").length > 0;
	var isWeek = !! document.getElementById("shWkendsCheckbox");
	var isMonth = ! isDay && ! isWeek;

	if (isDay) return "md0=" + ThisYear + "&md3=" + daysInYear;
	if (isWeek) return "md0=" + ThisYear + "&md2=" + weeksInYear;
	if (isMonth) return "md0=" + ThisYear + "&md1=" + new Date(document.getElementById("evt4").value).getMonth();
}


/**
 * 指定されたクラスのDIVで要素を包みます。
 * @param elm
 * @param classNames
 */
function wrapClass(elm, classNames) {
	var targetElm = elm;
	classNames.forEach(function(cName) {
		var div = document.createElement("div");
		div.className = cName;
		div.appendChild(targetElm);
		targetElm = div;
	});
	return targetElm;
}

/**
 * 渡された要素の子要素を指定された要素へ移動します。
 * @param from
 * @param to
 */
function moveChildren(from, to) {
	Array.prototype.forEach.call(from.childNodes, function(node){
		if (node.nodeType == 1) {
			to.appendChild(node.cloneNode(true));
		}
	});
}

