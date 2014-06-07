// ==UserScript==
// @name			HKGalden profile enhancement
// @namespace		galdenson
// @version			1.0.3
// @description		profile page enhancement
// @match			https://hkgalden.com/*
// @match			http://hkgalden.com/*
// @match			https://m.hkgalden.com/*
// @match			http://m.hkgalden.com/*
// @updateURL		https://userscripts.org/scripts/source/184534.meta.js
// @downloadURL		https://userscripts.org/scripts/source/184534.user.js
// ==/UserScript==

if (location.href.indexOf("member/profile") != -1) {
	var currentPage = "uninitialized";
	var nonemptyTable = false;

	function addLastPage() {
		var table;
		if (location.hash.indexOf("threads") != -1) {
			table = document.getElementById("userPosts");
		} else if (location.hash.indexOf("replies") != -1) {
			table = document.getElementById("userReply");
		}
		if ((table) && ((!nonemptyTable) || (table.getElementsByTagName("tr").length>0))) {
			nonemptyTable = false;
			var trs = table.getElementsByTagName("tr");
			for (var i = 1; i < trs.length; i++) {
				var tds = trs[i].getElementsByTagName("td");
				var lastPage;
				if (location.hash.indexOf("replies") != -1) {
					lastPage = Math.ceil(parseInt(tds[4].innerHTML)/25);
				} else {
					lastPage = Math.ceil(parseInt(tds[3].innerHTML)/25);
				}
				if (lastPage > 1) {
					var href = tds[0].childNodes[0].href;
					tds[0].innerHTML += ' [<a href="'+href+'/page/'+lastPage+'/">'+lastPage+'</a>]';
				}
			}
		} else {
			setTimeout(addLastPage, 300);
		}
	}

	function checkPrevNext(trackpg, pglist) {
		// show/hide prev/next page
		if (pglist.options.length > 0) {
			trackpg.querySelector("#prev").innerHTML = "上一頁";
			trackpg.querySelector("#next").innerHTML = "下一頁";
			if (pglist.selectedIndex == 0) {
				trackpg.querySelector("#prev").innerHTML = "";
			}
			if (pglist.selectedIndex == pglist.options.length - 1) {
				trackpg.querySelector("#next").innerHTML = "";
			}
		} else {
			trackpg.querySelector("#prev").innerHTML = "";
			trackpg.querySelector("#next").innerHTML = "";
		}
	}

	function changePage(prevNext) {
		var trackpg;
		var pglist;
		var valid = true;
		if (location.hash.indexOf("replies") != -1) {
			trackpg = document.getElementById("ui-tabs-2").querySelector("#trackpg");
			pglist = document.getElementById("ui-tabs-2").querySelector("#pglist");
		} else {
			trackpg = document.getElementById("ui-tabs-1").querySelector("#trackpg");
			pglist = document.getElementById("ui-tabs-1").querySelector("#pglist");
		}
		if (prevNext) {
			var temp = pglist.selectedIndex + prevNext;
			if ((temp >= 0) && (temp < pglist.options.length)) {
				pglist.selectedIndex = temp;
			} else {
				valid = false;
			}
		}
		if (valid) {
			trackpg.childNodes[pglist.selectedIndex].click();
			nonemptyTable = true;
			setTimeout(addLastPage, 300);

			checkPrevNext(trackpg, pglist);
		}
	}

	function addDropList() {
		// change page selector to dropdown list
		var trackpg;
		if (location.hash.indexOf("replies") != -1) {
			trackpg = document.getElementById("ui-tabs-2").querySelector("#trackpg");
		} else {
			trackpg = document.getElementById("ui-tabs-1").querySelector("#trackpg");
		}
		if (trackpg) {
			var pageNum = trackpg.childNodes.length;
			var table = document.createElement("table");
			table.setAttribute("style", "width: 100%;");
			var tr = document.createElement("tr");
			var td = document.createElement("td");
			td.addEventListener("click", function(evt){changePage(-1);},false);
			td.setAttribute("style", "text-align: right; width: 25%;");
			td.id = "prev";
			tr.appendChild(td);
			table.appendChild(tr);
			var td = document.createElement("td");
			td.setAttribute("style", "text-align: center; width: 50%;");
			var select = document.createElement("select");
			select.addEventListener("change", function(evt){changePage(0);},false);
			select.id = "pglist";
			select.setAttribute("style", "border: 1px solid #5c4337;");
			for (var i = 1; i < pageNum+1; i++) {
				var option = document.createElement("option");
				option.value = i-1;
				option.innerHTML = "第 " + i + " 頁";
				select.appendChild(option);

				trackpg.childNodes[i-1].setAttribute("style", "display: none;");
			}
			td.appendChild(select);
			tr.appendChild(td);
			table.appendChild(tr);
			var td = document.createElement("td");
			td.addEventListener("click", function(evt){changePage(1);},false);
			td.setAttribute("style", "text-align: left; width: 25%;");
			td.id = "next";
			tr.appendChild(td);
			table.appendChild(tr);
			trackpg.appendChild(table);
			checkPrevNext(trackpg, select);
		} else {
			setTimeout(addDropList, 300);
		}
	}

	function initialize() {
		// wait for table construction
		if (location.hash != currentPage) {
			var pglist;
			if (location.hash.indexOf("replies") != -1) {
				pglist = document.getElementById("ui-tabs-2").querySelector("#pglist");
			} else {
				pglist = document.getElementById("ui-tabs-1").querySelector("#pglist");
			}
			if (!pglist) {
				setTimeout(addDropList, 300);
				setTimeout(addLastPage, 300);
				currentPage = location.hash;
			} else {
				// existence of pglist means staying in old page
				setTimeout(initialize, 300);
			}
		}
	}

	function onready() {
		// check hash
		if (location.hash.indexOf("threads") != -1) {
			document.getElementById("ui-id-1").click();
		} else if (location.hash.indexOf("replies") != -1) {
			document.getElementById("ui-id-2").click();
		} else {
			// initialize
			location.hash = "threads";
			initialize();
		}
	}

	function tableCheck() {
		if (document.getElementById("ui-id-1")) {
			onready();
		} else {
			setTimeout(tableCheck, 300);
		}
	}

	// add hash
	document.getElementById("ui-id-1").addEventListener('click', function(evt){location.hash = "threads"; initialize();}, false);
	document.getElementById("ui-id-2").addEventListener('click', function(evt){location.hash = "replies"; initialize();}, false);

	if (document.readyState == "complete") {
		setTimeout(tableCheck, 500);
	}

	document.onreadystatechange = function() {
		if (document.readyState == "complete") {
			onready();
		}
	}
}