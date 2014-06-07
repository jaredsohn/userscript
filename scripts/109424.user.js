// ==UserScript==
// @name           NzbIndex: SabNzbd Download Link
// @require	   https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.js
// @namespace      nzbindexsabnzbd
// @description    Adds the possibility, to add the nzb directly to Sabnzbd without downloading the file.
// @include        http://www.nzbindex.nl/*
// ==/UserScript==
var sabLink="http://localhost:8080/sabnzbd/";
var sabApi="048f7159054e0da69b8bbe5eb94f1639";

//adding download links to every entry
$('div[class="info"] div:not([class]) a:contains(Download)').each(function(i,value){
	var nzbUrl = encodeURI($(this).attr('href'));
	var sabUrl = sabLink+"api?apikey="+sabApi+"&mode=addurl&name="+nzbUrl;

	$('<a id="sabLink" href="'+'#'+'">Sabnzbd</a>')
		.click(function(){
			callSabnzbd(nzbUrl);
			$(this).after('<b id="done" >Done</b>');
			$(this).remove();
		})
		.insertBefore(this)
		.after(' - '); //insert after the sab link
});

//adding download button if there are checkboxes selected
$('<input>')
.attr('type','button')
.attr('value','Send all to Sabnzbd')
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