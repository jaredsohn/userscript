// ==UserScript==
// @name			Better Galden
// @namespace			galdenson
// @version			1.2.3.4
// @description			lau ming, fast reply
// @match			https://hkgalden.com/*
// @match			http://hkgalden.com/*
// @match			https://m.hkgalden.com/*
// @match			http://m.hkgalden.com/*
// @updateURL			http://userscripts.org/scripts/source/171776.meta.js
// @downloadURL			https://userscripts.org/scripts/source/171776.user.js
// ==/UserScript==

/* autoupdate test again */

if ((location.href.indexOf("view") != -1) && (location.href.indexOf("m.hkgalden.com") == -1)) {
	// old version browsers not supported
	if (document.querySelectorAll) {
		function scrollIntoReply() {
			document.getElementById("fast_reply").scrollIntoView(false);
		}

		// fast reply
		var quoteBtn = document.querySelectorAll("button.quote");
		var numOfBtn = quoteBtn.length;
		for (var i = 0; i < numOfBtn; i++) {
			var btn = document.createElement("button");
			btn.innerHTML = "快速回覆";
			btn.addEventListener("click", scrollIntoReply, false);
			quoteBtn[i].parentNode.insertBefore(btn, quoteBtn[i]);
		}

		// limit img number
		var replies = document.querySelectorAll("table.sectab td");
		var length = replies.length;
		for (var i = 0; i < length; i++) {
			if (replies[i].querySelectorAll("img").length > 150) {
				var str = replies[i].innerHTML;
				var index = 0;
				for (var j = 0; j < 150; j++) {
					var temp = str.substring(1).indexOf("<img")+1;
					index += temp;
					str = str.substring(temp);
				}
				replies[i].innerHTML = replies[i].innerHTML.substring(0, index);
			}
		}
	}
}

// work only in reply and view
function getThreadNum() {
	var threadNum;
	if (location.href.indexOf("view") != -1) {
		threadNum = location.href.substring(location.href.indexOf("view"));
	} else {
		threadNum = location.href.substring(location.href.indexOf("reply"));
	}
	threadNum = threadNum.substring(threadNum.indexOf("/")+1);
	if (threadNum.indexOf("/") != -1) {
		threadNum = threadNum.substring(0, threadNum.indexOf("/"));
	}
	return threadNum;
}

// work only in view
function updateNumOfPage() {
	var paging = document.getElementsByClassName("hkga-pagin top");
	if ((paging.length) && (GM_getValue("t"+threadNum, false))) {
		var numOfPage = paging[0].getElementsByTagName("option").length;
		GM_setValue("t"+threadNum, title+"#:"+numOfPage);
	}
}

if ((location.href.indexOf("view") != -1) || (location.href.indexOf("reply") != -1)) {
	var threadNum = getThreadNum();
	var title = document.title;
	title = title.substring(0, title.lastIndexOf("-")-1);
	// #: is reserved
	while (title.indexOf("#:") != -1) {
		var index = title.indexOf("#:");
		// delete :
		title = title.substring(0, index+1) + title.substring(index+2);
	}

	if (location.href.indexOf("view") != -1) {
		updateNumOfPage();
	}

	function saveThread() {
		GM_deleteValue("t"+threadNum);
		GM_setValue("t"+threadNum, title);
		if (location.href.indexOf("view") != -1) {
			updateNumOfPage();
		}

		var span = document.createElement("span");
		span.innerHTML = "名已留";
		document.getElementById("main").insertBefore(span, document.getElementById("pagelm"));
	}

	var submit = document.getElementsByClassName("naseotn l")[0];
	submit.addEventListener("click", saveThread, false);

	// reply content is not ready on load, listen ctrl+enter
	function TACheck() {
		if (document.getElementById("cke_1_contents")) {
			var textArea = document.getElementById("cke_1_contents").getElementsByTagName("textArea")[0];
			textArea.addEventListener("focus", function(e){focus = true;}, false);
			textArea.addEventListener("blur", function(e){focus = false;}, false);
		} else {
			setTimeout(TACheck, 300);
		}
	}
	setTimeout(TACheck, 300);
	document.addEventListener("keydown", function(e){if((e.keyCode==13)&&(e.ctrlKey)&&(focus)){saveThread();}}, false);
}

if (location.href.indexOf("my/dashboard") != -1) {
	// GM_getValue is only called once, all the stuff are saved and done in threadList
	var thisPage = 1;
	var threadList = [];
	var tmpList = GM_listValues();
	var tmpLength = tmpList.length;
	for (var val = tmpLength-1; val >= 0; val--) {
		var threadKey = tmpList[val];
		var title = GM_getValue(threadKey);
		var numOfPage = 1;
		if (title.indexOf("#:") != -1){
			numOfPage = parseInt(title.substring(title.indexOf("#:")+2));
			title = title.substring(0, title.indexOf("#:"));
		}
		threadList.push([threadKey, title, numOfPage]);
	}

	function deleteGMVs() {
		// delete GMValues and update threadList
		var startNum = (thisPage-1) * 15;
		var endNum = Math.min(threadList.length, startNum+15);
		for (var i = endNum-1; i >= startNum; i--) {
			if (document.getElementById(threadList[i][0]).checked) {
				GM_deleteValue(threadList[i][0]);
				threadList.splice(i, 1);
			}
		}
		constructTable();
	}

	function constructTable() {
		var table = document.getElementById("Lau_Ming");
		table.innerHTML = "";

		var tr = document.createElement("tr");
		tr.innerHTML = '<th></th><th class="tnm">題目</th><th class="trc">刪除</th><th class="trc"></th>';
		table.appendChild(tr);

		var startNum = (thisPage-1) * 15;
		var endNum = Math.min(threadList.length, startNum+15);
		for (var i = startNum; i < endNum; i++) {
			var tr = document.createElement("tr");
			var trHtml = '<td class="tic">'+(i+1)+'</td><td class="tnm"><a href="/view/'+threadList[i][0].substring(1)+'/type/BW" title="'+threadList[i][1]+'">'+threadList[i][1]+'</a>';
			if (threadList[i][2] > 1) {
				trHtml += ' [<a href="/view/'+threadList[i][0].substring(1)+'/page/'+threadList[i][2]+'/type/BW" title="'+threadList[i][1]+'">'+threadList[i][2]+'</a>]';
			}
			trHtml += '</td><td class="trc"><input type="checkbox" id="'+threadList[i][0]+'"></td><td class="trc">('+(i+1)+')</td>';
			tr.innerHTML = trHtml;
			table.appendChild(tr);
		}

		var tr = document.createElement("tr");
		tr.innerHTML = '<td class="tic"></td><td class="tnm"></td>';
		var td = document.createElement("td");
		td.className = "trc";
		var btn = document.createElement("button");
		btn.textContent = "刪除";
		btn.addEventListener("click", deleteGMVs, false);
		td.appendChild(btn);
		tr.appendChild(td);
		var td = document.createElement("td");
		td.className = "trc";
		tr.appendChild(td);

		table.appendChild(tr);
		constructDiv();
	}

	function constructDiv() {
		var div = document.getElementById("LM_pages");
		div.innerHTML = "";

		var NumOfPage = Math.ceil(threadList.length/15);
		for (var i = 1; i < NumOfPage+1; i++) {
			var a = document.createElement("a");
			a.href = "javascript:void(0)";
			a.addEventListener("click", function(){thisPage = parseInt(this.textContent); constructTable(); document.getElementById("Lau_Ming").scrollIntoView(true);}, false);
			if (i == thisPage) {
				a.style.color = "black";
			}
			a.innerHTML = i;
			div.appendChild(a);
		}
	}

	function constructInlineDiv() {
		var div = document.createElement("div");
		div.id = "inline";
		div.style.display = "none";
		document.body.appendChild(div);
	}

	function exportList() {
		var threadList = [];
		var tmpList = GM_listValues();
		var length = tmpList.length;
		for (var val = length-1; val >= 0; val--) {
			var threadKey = tmpList[val];
			threadList.push([threadKey, GM_getValue(threadKey)]);
		}
		var div = document.getElementById("inline");
		div.setAttribute("style", "height: 100%;");
		div.innerHTML = JSON.stringify(threadList);
	}

	function importList(txtArea) {
		if (txtArea.value.length > 0) {
			var gmValues = JSON.parse(txtArea.value);
			var length = gmValues.length;
			for (var i = length-1; i > -1; i--) {
				var threadKey = gmValues[i][0];
				// if no entry, call GM_set value and update threadList
				if (!GM_getValue(threadKey, false)) {
					var title = gmValues[i][1];
					GM_setValue(threadKey, title);
					var numOfPage = 1;
					if (title.indexOf("#:") != -1){
						numOfPage = parseInt(title.substring(title.indexOf("#:")+2));
						title = title.substring(0, title.indexOf("#:"));
					}
					threadList.unshift([threadKey, title, numOfPage]);
				}
			}
			document.getElementsByClassName("fancybox-close")[0].click();
			constructTable();
		}
	}

	function constructImportDiv() {
		var div = document.getElementById("inline");
		div.setAttribute("style", "height: 90%;");
		div.innerHTML = "";
		var textarea = document.createElement("textarea");
		textarea.setAttribute("style", "width: 90%; height: 100%;");
		div.appendChild(textarea);
		var div2 = document.createElement("div");
		var btn = document.createElement("button");
		btn.textContent = "匯入";
		btn.addEventListener("click", function(evt){importList(textarea);}, false);
		div2.appendChild(btn);
		div.appendChild(div2);
	}

	// Lau Ming List
	var frame;
	if (document.getElementsByClassName("w100 frame").length) {
		frame = document.getElementsByClassName("w100 frame")[0];
	} else {
		frame = document.body;
	}
	var table = document.createElement("table");
	table.id = "Lau_Ming";
	frame.appendChild(table);
	var div = document.createElement("div");
	div.id = "LM_pages";
	frame.appendChild(div);

	constructTable();

	// load fancy box
	function loadFancybox() {
		var head = document.getElementsByTagName("head")[0];
		// fancybox stuff
		var link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "/js/fancybox/source/jquery.fancybox.css?v=2.1.4");
		link.setAttribute("type", "text/css");
		link.setAttribute("media", "screen");
		head.appendChild(link);
		var script = document.createElement("script");
		script.setAttribute("type", "text/javascript");
		script.setAttribute("src", "/js/fancybox/source/jquery.fancybox.pack.js?v=2.1.4");
		head.appendChild(script);
		script.onload = function() {
			// show import and export option once fancybox is ready
			var script = document.createElement("script");
			script.setAttribute("type", "text/javascript");
			script.innerHTML = "$('#scriptPrepare').hide(); $('#import_export').show(); $('.scriptFancybox').fancybox({fitToView: false, width: '70%', height: '70%', autoSize: false});";
			head.appendChild(script);
		}
	}

	// Import and export
	constructInlineDiv();
	var div = document.createElement("div");
	div.id = "scriptPrepare";
	var btn = document.createElement("button");
	btn.textContent = "準備匯入/匯出";
	btn.addEventListener("click", loadFancybox, false);
	div.appendChild(btn);
	frame.appendChild(div);

	var div = document.createElement("div");
	div.id = "import_export";
	div.style.display = "none";
	var btn = document.createElement("button");
	btn.setAttribute("data-fancybox-href", "#inline");
	btn.setAttribute("class", "scriptFancybox");
	btn.textContent = "匯入";
	btn.addEventListener("click", constructImportDiv, false);
	div.appendChild(btn);
	var btn = document.createElement("button");
	btn.setAttribute("data-fancybox-href", "#inline");
	btn.setAttribute("class", "scriptFancybox");
	btn.textContent = "匯出";
	btn.addEventListener("click", exportList, false);
	div.appendChild(btn);
	frame.appendChild(div);
}