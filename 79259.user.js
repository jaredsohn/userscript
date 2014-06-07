// ==UserScript==
// @name           Rohstoffbilanz
// @namespace      Travian
// @include        http://*.travian.*/spieler.php?uid=*
// ==/UserScript==
window.addEventListener('load', main, false);

function main()
{	
	var player_id = parseInt(location.search.split('uid=')[1]);
	var url = 'http://'+location.host+'/manual.php?s='+player_id+'&typ=7';
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		onload: function(responseDetails){
		source = responseDetails.responseText;
		var t1 = source.split('</h1>')[1].split('<p>')[0];
		var content = document.getElementById('content');
		content.innerHTML+=t1;}});
}