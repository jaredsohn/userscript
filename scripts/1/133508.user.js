// ==UserScript==
// @name		3in1 BinnewZ NZBIndex SabNZB
// @namespace		Source Takinator
// @description		Ajout NZBIndex, suppression des posts non free pour binnewz et lien direct pour sabnzb
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @include			http://*binnews.in/_bin/liste.php*
// @include			http://*binnews.in/_bin/lastrefs.php*
// @include			http://*binnews.in/_bin/search.php*
// @include			http://*binnews.in/_bin/search2.php*
// @include			http://*binnews.me/_bin/liste.php*
// @include			http://*binnews.me/_bin/lastrefs.php*
// @include			http://*binnews.me/_bin/search.php*
// @include        http://www.nzbindex.nl/*
// @version			0.1
// ==/UserScript==
var sabLink="http://localhost:8085/sabnzbd/";
var sabApi="32l554554828b78dcd975738f6a6079b28f3";

//adding download links to every entry
$('div[class="info"] div:not([class]) a:contains(Download)').each(function(i,value){
	var nzbUrl = encodeURI($(this).attr('href'));
	var sabUrl = sabLink+"api?apikey="+sabApi+"&mode=addurl&name="+nzbUrl;

	$('<a id="sabLink" href="'+'#'+'">Télécharger ce fichier</a>')
		.click(function(){
			callSabnzbd(nzbUrl);
			$(this).after('<b id="done" >Fichier ajouté</b>');
			$(this).remove();
		})
		.insertBefore(this)
		.after(' - '); //insert after the sab link
});

//adding download button if there are checkboxes selected
$('<input>')
.attr('type','button')
.attr('value','Télécharger tout')
.click(function(){
	$('input[type="checkbox"]:checked)').each(function(){
		//loop checkboxes that are checked and download all of them
		callSabnzbd(nzbUrl);
	});
})
.insertBefore('td[class="nowrap"] input[type="submit"][value="Create NZB"]');

function callSabnzbd(nzbUrl){
	$.get(sabLink+"api", {apikey : sabApi, mode : 'addurl', name : nzbUrl}, function(data){
	}, 'html');
}


/*
	History:
	0.4: Encode filenames before appending them to query strings
	0.3: Added NZBIndex.nl search link
	0.2: Added binnews.me domain name
	0.1: Initial version
*/

/**
	Pictures data
*/
var binSearchImg = 
"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAA"+
"0klEQVQ4ja2SsY2EMBBF3542dAHkuAAKIKABMhIiaqAAIgogchcUQEYLU4DJp4DJ76JDC+g4VuyP"+
"rNGfL38/P4qi+OaGvu4sAzz3g2EY1nPbtu8HZFn21g0+X+FVTdNQVRXOOUSEEAIxxo3nsacwz/Of"+
"gapKXdeb2WmFEAJlWaKqACRJQp7n1wPGccTMmKZpnaVpej3gik4DfpG+ol2WZeM5pdD3PaqK9x4A"+
"M0NErgWICGa2PpqZ0XUdZrbxHTDu5b3HOUeM8bD8bwXg8HH2uk3hBx7SSTXHJRa4AAAAAElFTkSu"+
"QmCC";

var nzbIndexImg = 
"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ"+
"bWFnZVJlYWR5ccllPAAAAMdJREFUeNpi/P//PwMlgImBQkCxASwC1gXlQLoDiDuBeBYQ3wXiCiB2"+
"gWIYAMkpIYndA2JXZBekoRnuCsSMQJyOpAFGm0ANC0U2QBDNRhhwQXIBDJzFFQboBoAMDQXiPUD8"+
"HkncGOYadANCcRi4B0kM5PQzUANRDNiDxfmhWJx/Dxo2IFCOzwBYmJxFcz5yOBijG/AezfkgQ1bj"+
"SQbvkQ14j+YKmPOxGSAIDcg96IG4B0tIgxIWKMPsRgrEd1ALZzEO/cwEEGAAj+EuGiSzrJQAAAAA"+
"SUVORK5CYII=";

/**
	Remove newsgroups and posts not allowed to Free.fr NNTP users and remove odd/event row colors
	@param sRecord jQuery Search record element (Search results table row)
	@return false if Post has been removed, true otherwise.
*/
function RemoveNotFreeNewsgroups(sRecord) {
	var result;
	var newsgroupsCount = $("td a.c16[href^='liste.php']", sRecord).length;
	var $noFreeLinks = $("td a img[src$='notfree.gif']", sRecord);
	
	if (newsgroupsCount == $noFreeLinks.length) {
		// All newsgroups are locked
		sRecord.remove();
		result = false;
	}
	else {
		// Some newsgroups to remove
		$noFreeLinks.parent().prev().remove();
		$noFreeLinks.remove();
		sRecord.attr("style", "background-color: #e6f2ff; border-bottom: solid 1px #999");
		result = true;
	}
	return result;
}

/**
	Add BinSearch search link to search result row
	@param sRecord jQuery Search record element (Search results table row)
*/
function AddSearchLinks(sRecord) {
	var $flagTd = $("td img[src*='/flag_']", sRecord).parent();
	var $postTitle = $flagTd.prev();
	var postFileName = escape($flagTd.next().next().text());
	$postTitle.prepend(" <a href=\"http://www.nzbindex.nl/search/?q="
		+ postFileName
		+ "&age=30&max=100&sort=agedesc&minsize=1&maxsize=&dq=&poster=&nfo=&hidespam=0&hidespam=1&complete=1"
		+ "&more=0\"><img src=\"data:image/png;base64,"
		+ nzbIndexImg
		+ "\"/></a>");
}

/**
	Main entry point
	Iterates through search results and apply enhancements
*/
function Main() {
	var $searchRecords = $("#tabliste tr[class^='ligne']:has(td)");
	
	$searchRecords.each(function(i) {
		if (RemoveNotFreeNewsgroups($(this))) {
			AddSearchLinks($(this));
		}
	});
	CleanPage();
}

Main();