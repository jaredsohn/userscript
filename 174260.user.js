// ==UserScript==
// @name         Series Dates for MAL
// @namespace    http://userscripts.org/users/92143
// @version      0.3
// @description  Displays sortable start/end dates of anime/manga for user lists on myanimelist.net. Will NOT work if MAL API returns outdated results, e.g. you just moved completed anime back to watching list. May NOT work with other MAL scripts or lists with custom layout. 
// @include      /^http\:\/\/myanimelist\.net\/animelist\/[^\/]+/
// @include      /^http\:\/\/myanimelist\.net\/mangalist\/[^\/]+/
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require      http://userscripts.org/scripts/source/164164.user.js
// @grant        GM_xmlhttpRequest
// @grant        GM_log
// ==/UserScript==

var XML_URL_PREFIX = 'http://myanimelist.net/malappinfo.php?'
var FIRST = 0
var BATCH_SIZE = 10
var NUM_ANIMETITLE_FREE_TABLES = 3
var NUM_SELF = 1
var titles = []
var pending
var categorySizes = []
var categoryBounds = []
var xmlUrl
var map = []
var originalUrlPath
var startDatePath
var endDatePath
var listType
var statusParam

function init() {
	titles = document.getElementsByClassName("animetitle")
	pending = titles.length
	map = new Array(titles.length)
	categorySizes = getCategorySizes()
	categoryBounds = toBounds(categorySizes)
	
	originalUrlPath = location.pathname
	
	//assuming "order" is the last parameter
	startDatePath = originalUrlPath.split('&order=')[0] + '&order=StartDate'
	endDatePath = originalUrlPath.split('&order=')[0] + '&order=EndDate'
	var groups = /&status=(\d+)/.exec($('td.status_selected > a').get(FIRST).getAttribute('href'))
	//do not set statusParam if all anime/manga is shown
	if(groups && '7' != groups[1]) {
		statusParam = groups[1]
	}

	groups = /^\/(\w+?)list\/(.+?)(&|$)/.exec(originalUrlPath)
	
	var userName
	if (groups && groups[1] && groups[2]) {
		listType = groups[1]
		userName = groups[2]
	}
	//very unlikely
	else {
		listType = 'anime'
		username = 'xinil'
	}
	xmlUrl = XML_URL_PREFIX + 'u=' + userName + '&status=all&type=' + listType

}

function fetchList(xmlUrl) {
	GM_xmlhttpRequest({
		method: "GET",
		url: xmlUrl,
		headers: {
			"User-Agent": "Mozilla/5.0", 
			//"Accept": "text/xml"
		},
		onload: function(response) {
			var responseXML
 			try {
				responseXML = $.parseXML(response.responseText)
 			}
 			catch(err) {
 				var errorMessage = '(Series Dates for MAL) MAL API is MAL-functioning. '
 				errorMessage += 'Please try again later.\n';
 				errorMessage += '(Series Dates for MAL) Error description: ' + err.message + '\n'
				GM_log(errorMessage)
				return
 			}
			insertDates(responseXML)
		}
	})
}

function insertDates(xml) {
	//initialize map to pairs of [series_id, title_index]
	$('.animetitle').each(function(index) {
		var groups = (new RegExp('\/' + listType + '\/(.+?)\/')).exec($(this).attr('href'))
		if(groups && groups[1]) {
			map[index] = [groups[1], index]
			pending--
		}
	})
	//very unlikely
	if(0 !== pending) {
		//handle error here
	}
	pending = titles.length

	map.sort(seriesIdComparator)

	//replace series_id with pairs of start/end dates
	$filteredXml = $(xml).find(listType).filter(function() {
		if(statusParam) {
			return $('my_status', this).text().trim() == statusParam
		}
		else {
			return true
		}
	})
	
	//possible in case there are more than 1500 entries
	if(0 === titles.length) {
		//exit
		return
	}
	
	//possible in case there is database inconsistency
	if($filteredXml.length !== titles.length) {
		//handle error here
		var errorMessage = '(Series Dates for MAL) MAL database is not up-to-date. \n'
		errorMessage += '(Series Dates for MAL) Error description: ' + 
			'Entries reported by MAL API: '+ $filteredXml.length + '; ' + 
			'Entries detected on list page: '+ titles.length + '\n'
		GM_log(errorMessage)
		return
	}
	
	if('anime' == listType) {
		$filteredXml.each(function(index) {
			if($(this).children('series_' + listType + 'db_id').first().text().trim() == map[index][0]) {
				map[index][0] = [$(this).children('series_start').first().text().trim(), 
															$(this).children('series_end').first().text().trim()]
															pending--
			}
		})
	}
	else if('manga' == listType) {
		var map2 = []
		$filteredXml.each(function(index) {
			map2[index] = [$(this).children('series_' + listType + 'db_id').first().text().trim(), 
											[$(this).children('series_start').first().text().trim(), 
											$(this).children('series_end').first().text().trim()]]
		})
		map2.sort(seriesIdComparator)
		
		for (var index = 0; index < map.length; index++) {
			if(map[index][0] == map2[index][0]) {
				map[index][0] = map2[index][1]
				pending--
			}
		}
	}
	//very unlikely
	if(0 !== pending) {
		//handle error here
	}
	pending = titles.length

	//restore initial order (by title_index)
	map.sort(titleIndexComparator)

	//process per category
	for (var i = 0; i < categorySizes.length; i++) {
		var subMap = map.splice(0, categorySizes[i])
		var replacement = sortCategory(subMap)
		refreshPage(replacement, categoryBounds[i])
	}

}

function getCategorySizes() {
	
	var categorySizes = []
	var categorySize = 0
	var statusLink = $('.status_selected > a').first().attr('href')
	//all categories
	if(statusLink && statusLink.contains('&status=7')) {
		
		var categorySeparators = []
		$('table[class^="header_"]').each(function() {
			categorySeparators.push('.' + $(this).attr('class'))
		})
		categorySeparators.push('#inlineContent')
		
		for (var i = 0; i < categorySeparators.length - 1; i++) {
			categorySize = ($(categorySeparators[i + 1]).index() - $(categorySeparators[i]).index() - 
				NUM_SELF - NUM_ANIMETITLE_FREE_TABLES) / 2
			categorySizes.push(categorySize)
		}
	}
	//single category
	else {
		categorySize = $('.animetitle').length
		categorySizes.push(categorySize)
	}
	
	return categorySizes
	
}

function toBounds(sizes) {
	var bounds = [0]
	for (var i = 0; i < sizes.length; i++) {
		bounds.push(sizes[i] + bounds[i])
	}
	bounds.pop()
	return bounds
}

function startDateComparator(a, b) {
	var aString = String(a[0][0])
	var bString = String(b[0][0])
	if(aString < bString) {
		return -1
	}
	else if(aString > bString)
	{
		return 1
	}
	
	return 0
}

function endDateComparator(a, b) {
	var aString = String(a[0][1])
	var bString = String(b[0][1])
	if(aString < bString) {
		return -1
	}
	else if(aString > bString) {
		return 1
	}
	
	return 0
}

//alphabetical id allowed
function seriesIdComparator(a, b) {
	var aInt = parseInt(a[0])
	var bInt = parseInt(b[0])
	if(aInt && bInt) {
		if(aInt < bInt) {
			return -1
		}
		if(aInt > bInt) {
			return 1
		}
		return 0
	}
	else if(aInt && !bInt) {
		return -1
	}
	else if(bInt && !aInt) {
		return 1
	}
	var aString = String(a).toLowerCase()
	var bString = String(b).toLowerCase()
	if(aString < bString) {
		return -1
	}
	if (aString > bString) {
		return 1
	}
	
	return 0
}

function titleIndexComparator(a, b) {
	if (a[1] < b[1])
	{
		return -1
	}
	else if (a[1] >  b[1])
	{
		return 1
	}
	
	return 0
}

function sortCategory(subMap) {
	var replacement = []

	$(titles[subMap[FIRST][1]]).closest('table').prev('table').
	find('tr:last > td:last').
	after('<td class="table_header" width="85" align="center" nowrap><strong><a href="' + 
	endDatePath + '" class="table_headerLink">EndDate</a></strong></td>').
	after('<td class="table_header" width="85" align="center" nowrap><strong><a href="' + 
	startDatePath + '" class="table_headerLink">StartDate</a></strong></td>')
	
	if(originalUrlPath.endsWith("&order=StartDate")) {
		subMap.sort(startDateComparator)
	}
	else if(originalUrlPath.endsWith("&order=EndDate")) {
		subMap.sort(endDateComparator)
	}

	for (var i = 0; i < subMap.length; i++) {
		$baseTable = $(titles[subMap[i][1]]).closest('table')
		var tableNode = $baseTable.clone(true, true).get(FIRST)
		$(tableNode).find('tr:last > td:last').
		after('<td width="85" align="center">' + subMap[i][0][1] + '</td>').
		after('<td width="85" align="center">' + subMap[i][0][0] + '</td>')
		
		replacement.push([tableNode, $baseTable.next('div').clone(true, true).get(FIRST)])
	}

	return replacement
}

function refreshPage(replacement, baseIndex) {
	
	var i = 0
	
	function batchProcess() {
		var count = BATCH_SIZE
		while (count-- && i < replacement.length) {
			$(replacement[i][0]).find('td[width="30"]').first().text((i + 1).toString())
			$(replacement[i][0]).find('td').attr('class', 'td' + ((i % 2) + 1))

			$(titles[baseIndex + i]).closest('table').replaceWith(replacement[i][0])
			$(titles[baseIndex + i]).closest('table').next('div').replaceWith(replacement[i][1])
			
			i++
		}
		if (i < replacement.length) {
			setTimeout(batchProcess, 10)
		}
	}
	
	batchProcess()

}

function modifyStatusLinks() {
	if(originalUrlPath.contains('&order=StartDate')) {
		$('td.status_selected > a, td.status_not_selected > a').each(function(){
			var link = $(this).attr('href')
			$(this).attr('href', link.replace(/&order=\d+/, '&order=StartDate'))
		})
	}
	else if(originalUrlPath.contains('&order=EndDate')) {
		$('td.status_selected > a, td.status_not_selected > a').each(function(){
			var link = $(this).attr('href')
			$(this).attr('href', link.replace(/&order=\d+/, '&order=EndDate'))
		})
	}
}

init()

modifyStatusLinks()

fetchList(xmlUrl)