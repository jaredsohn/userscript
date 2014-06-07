// ==UserScript==
// @name          Footstar Transferlist Filter
// @namespace     http://www.apfelkuchen.biz/footstar
// @description   Filter the nationality of the players
// @include       http://www.footstar.org/lista_livres.asp*
// @updateURL     http://www.apfelkuchen.biz/footstar-transferlist-filter.js
// @grant         none
// @require       https://userscripts.org/scripts/source/145813.user.js
// @version       0.2
// ==/UserScript==

var maxPagesToCrawl = GM_getValue("maxPagesToCrawl", 5);

var countryImagePathToTableRows = new Object();
var countryImagePathToFilterImage = new Object();
var $contentTable = $("#super_table_white");
$contentTable.children().children(".list1, .list2").each(function() {
	var $this = $(this);
	if ($this.children().size() >= 4) {
		var countryImagePath = $this.find("img").attr("src");
		addTableRow(countryImagePath, $this);
 	}
});

$contentTable.parent().prepend("<button id='saveSettings'>save settings</button>");
$("#saveSettings").click(function() {
	$(this).parent().children("img").each(function() {
		$image = $(this);
		var src = $image.attr("src");
		GM_setValue(src, $image.data("selected"));
	});
	GM_setValue("maxPagesToCrawl", $("#maxPagesToCrawl").val());
});

$contentTable.parent().prepend("Pages to load: <input type='number' min='0' value='" + maxPagesToCrawl + "' name='maxPagesToCrawl' id='maxPagesToCrawl' size='4' /> Loaded: <span id='pagesCrawledCount'>0</span> ");
$("#maxPagesToCrawl").change(function() {
	var oldMaxPagesToCrawl = maxPagesToCrawl;
	maxPagesToCrawl = $(this).val() * 1;
	var valueRaised = maxPagesToCrawl > oldMaxPagesToCrawl;
	var valueHigherThanCrawled = maxPagesToCrawl > 1 * $("#pagesCrawledCount").text();
	if (valueRaised && valueHigherThanCrawled) {
		crawlNextPages(1 * oldMaxPagesToCrawl + 1);
	}
});

$contentTable.parent().prepend("<div id='filterMenu'></div>");
var $filterMenu = $("#filterMenu");
$.each(countryImagePathToTableRows, function(countryImagePath, $tableRowAr) {
	$filterMenu.append("<img src='" + countryImagePath + "' />&nbsp;");
	var $countryImage = $filterMenu.children(":last-child");
	countryImagePathToFilterImage[countryImagePath] = $countryImage;
	if (GM_getValue(countryImagePath, "false") == "true") {
		setCountryFilter($countryImage, true);
	} else {
		setCountryFilter($countryImage, false);
	}
	$countryImage.css("cursor", "pointer").click(function() {
		$this = $(this);
		setCountryFilter($this, !$this.data("selected"));
	});
});

var $pagingContainer = $contentTable.parent().children("table").last().find("tr").children(":last-child");
var currentPageIndexSurrounded = $pagingContainer.find("b").text();
var currentPageIndex = currentPageIndexSurrounded.substring(1, currentPageIndexSurrounded.length - 1);
var pageToCrawlNext = 1 * currentPageIndex + 1;

crawlNextPages(pageToCrawlNext);

function crawlNextPages(pageToCrawlNext) {
	var url = createPageRequestUrlFor(pageToCrawlNext);

	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: function(response) {
			var $contentTable = $(response.responseText).find("#super_table_white");
			var i = 0;
			$contentTable.children().children(".list1, .list2").each(function() {
				var $this = $(this);
				if ($this.children().size() >= 4) {
					var countryImagePath = $this.find("img").attr("src");
					addTableRowFromRequest(countryImagePath, $this);
			 	}
			});
			$("#pagesCrawledCount").text(pageToCrawlNext);
			if (pageToCrawlNext < maxPagesToCrawl) {	
				crawlNextPages(pageToCrawlNext + 1);
			}
		}
	});
}

function createPageRequestUrlFor(page) {
	var href = window.location.href;
	var search = window.location.search;
	if (search.contains("gid")) {
		var indexOfGid = href.lastIndexOf("gid");
		var textBeforeGid = href.substring(0, indexOfGid + "gid=".length);
		var textAfterGid = "";
		var indexOfAndAfterGid = href.indexOf("&", indexOfGid);
		if (indexOfAndAfterGid > 0) {
			textAfterGid = href.substring(indexOfAndAfterGid, href.length);
		}
		return textBeforeGid + page + textAfterGid;
	} else {
		if (search.length > 0) {
			return href + "&gid=" + page;
		} else {
			return href + "?gid=" + page;
		}
	}
}

function addTableRow(countryImagePath, $tableRow) {
	var listItem = countryImagePathToTableRows[countryImagePath];
	if (countryImagePathToTableRows[countryImagePath]) {
		countryImagePathToTableRows[countryImagePath] = listItem.concat($tableRow);
	} else {
		countryImagePathToTableRows[countryImagePath] = new Array($tableRow);
	}
}

function addTableRowFromRequest(countryImagePath, $tableRow) {
	var countryAlreadyExists = countryImagePathToTableRows[countryImagePath];
	addTableRow(countryImagePath, $tableRow);
	$contentTable.children("tbody").append($tableRow);
	if (!countryAlreadyExists) {
		$filterMenu.append("<img src='" + countryImagePath + "' />&nbsp;");
		var $countryImage = $filterMenu.children(":last-child");
		countryImagePathToFilterImage[countryImagePath] = $countryImage;
		if (GM_getValue(countryImagePath, "false") == "true") {
			setCountryFilter($countryImage, true);
		} else {
			setCountryFilter($countryImage, false);
		}
		$countryImage.css("cursor", "pointer").click(function() {
			$this = $(this);
			setCountryFilter($this, !$this.data("selected"));
		});
	}
	if (countryImagePathToFilterImage[countryImagePath].data("selected")) {
		$tableRow.show();
	} else {
		$tableRow.hide();
	}
}

function setCountryFilter($countryImage, state) {
	var countryImagePath = $countryImage.attr("src");
	var $tableRows = countryImagePathToTableRows[countryImagePath];
	if(state) {
		$countryImage.data("selected", true);
		$countryImage.css("border", "1px solid black");
		$.each($tableRows, function(index, $tableRow) {
			$tableRow.show();
		});
	} else {
		$countryImage.data("selected", false);
		$countryImage.css("border", "1px solid transparent");
		$.each($tableRows, function(index, $tableRow) {
			$tableRow.hide();
		});
	}
}