// ==UserScript==
// @name           VS2010 Incremental Search
// @namespace      http://kishibe.dyndns.tv/
// @description    VS2010 Incremental Search
// @include        http://127.0.0.1:47873/help/*
// ==/UserScript==
(function() {
	var url = window.self.location.href;
	if (window.top == window.self) {
		// メインウィンドウ
		if (url.indexOf("method=page") != -1 || url.indexOf("method=f1") != -1) {
			// ページ
			processMainWindowPage();
		}
	} else {
		// フレーム内
		if (url.indexOf("method=search") != -1) {
			// 検索結果
			processFrameSearch();
		} else if (url.indexOf("method=page") != -1
				|| url.indexOf("method=f1") != -1) {
			// ページ
			processFramePage();
		}
	}

	function processMainWindowPage() {
		var leftNavElement = document.getElementById("LeftNav");
		var iframeElement = document.createElement("iframe");
		iframeElement.width = "100%";
		iframeElement.height = "100%";
		iframeElement.scrolling = "no";
		leftNavElement.appendChild(iframeElement);

		update();
		setInterval(update, 1000);

		var lastSearchQuery = null;
		function update() {
			var searchTextBox = document.getElementById("qu");
			var searchQuery = searchTextBox.value;
			if (lastSearchQuery != searchQuery && searchQuery != "") {
				iframeElement.src = "ms.help?method=search&query="
						+ searchQuery
						+ "&btnS=&PageSize=10&PageNumber=1&locale=ja-JP&ProductVersion=100&Product=VS";
			}

			var tocElement = document.getElementById("toc");
			if (searchQuery == "") {
				tocElement.style.display = "block";
				iframeElement.style.display = "none";
			} else {
				tocElement.style.display = "none";
				iframeElement.style.display = "block";
			}

			lastSearchQuery = searchQuery;
		}
	}

	function processFrameSearch() {
		// タイトルとテキストボックスを隠す
		var divElements = document.getElementsByTagName("div");
		for ( var divElementIndex = 0; divElementIndex < divElements.length; ++divElementIndex) {
			var divElement = divElements[divElementIndex];
			if (divElement.className == "OH_topic") {
				divElement.parentNode.removeChild(divElement);
			}
		}

		var formElements = document.getElementsByTagName("form");
		var formElement = formElements[0];
		formElement.parentNode.removeChild(formElement);

		var pElements = document.getElementsByTagName("p");
		var pElement = pElements[0];
		pElement.parentNode.removeChild(pElement);
	}

	function processFramePage() {
		// 親ウィンドウに表示させる
		window.top.location = window.self.location;
	}
})();
