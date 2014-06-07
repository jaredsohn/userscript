// ==UserScript==
// @name           Tabelog Smoking Alert
// @description    食べログの禁煙・喫煙情報を目立たせる
// @author         mirka
// @include        http://tabelog.com/*
// @namespace      http://jaguchi.com
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @version        1.1
// ==/UserScript==

(function () {
	var smoking_str = getSmokingString();

	function getSmokingString() {
		return $("th:contains('禁煙・喫煙') ~ td > p > strong").html();
	}

	function insertSmokingData(str) {
		var target_div = $("#rdhead-name");
		var short_str;
		var alert_color;

		switch (str) {
		case "全面喫煙可":
			short_str = "喫煙";
			alert_color = "#e10a17";
			break;
		case "分煙":
			alert_color = "#fd9f28";
			break;
		case "完全禁煙":
			short_str = "禁煙";
			alert_color = "#93c526";
			break;
		}
		
		$(target_div).prepend("<a href='#title-rstdata'><div id='smoking-alert'>" + (short_str || str) + "</div></a>");

		$("#smoking-alert").css({
			position: "absolute",
			left: "-4em",
			color: "#ffffff",
			padding: "3px",
			backgroundColor: alert_color,
		});
		
	}

	if (smoking_str) {
		insertSmokingData(smoking_str);
	}
})();