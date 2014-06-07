// ==UserScript==
// @name           Goalll Extended
// @namespace      Made by X_choice
// @description    Goalll Extended voegt allemaal handige en leuke dingen toe aan Goalll!
// @version        1.8.9
// @include        http://*goalll.nl*
// ==/UserScript==

//Get the parameters from the url
url =  "" + window.location + "";
spliturl = url.split("?");
if(spliturl[1])
{
	splitparam = spliturl[1].split("&");
	var param = new Array();
	for(var i in splitparam)
	{
		tmp = splitparam[i].split("=");
		param[tmp[0]] = tmp[1];
	}
}

// Add favicon
var head = document.getElementsByTagName('head')[0];
var icon = document.createElement('link');
icon.setAttribute('type', 'image/x-icon');
icon.setAttribute('rel', 'shortcut icon');
icon.setAttribute('href', 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAt9JREFUOE+Nk+tLk1Ecx+1VEFGvgl5YYP9BEEUodBGESnyr84I+3lDZlnNma87Lpo2YI0U3nbXtmbrN69z2bD7b1N1Sp5uk4i5KpkKJCiUFvkvs23xAQULx9+Yczvl9P7/z+55zEhLOiCpR2TWlxaHpNKjTzso5c72rtzu92RFaz7PGUGJeOlTYXHL2q8Lr54KKXmZeNtHWDNnYlK/YGkGRfRWZ5hiK42OOJYYqS/Cn2umWyDokSf+BBifcmUJ6cZ+gVkBQMeSMLKHCFoZq9itqTAFkDS2gwBLG0YnY9sih2OSePAUZW/5SmW+N4pn2E+62uVCgohCYmcXiwiIe3E8B2W9CRnwv9YMPTd5V8K3BP9IW8ftiLusKAzoCFFIRsNROFJJO1NY1YWN9Hbs729jZ3kZ4OYyxCQ+GXF7Y7Xa4vH7Mzc2BzamQnQBkrkXYbDYYjUYEpqehUHTg8dMnCARm4Pf7MTAwALfbDb1eD6fTCYFAAIGoup4BjNot76i4WCaTgcvlYmRwCFKpFA+TU+Aad6Gvrw8WiwVdXV2gaRoqlQr5RN5GMS/rakJNI/vWGG3fJwgCDQ0NUCqV0Gq1mJ+fh06nQywWg1AoRDgcBp/PRzQaBSubdSgU8x8x1duVrZIjUXd3NwwGA3w+H6xWK1ORJEkG1t/fD41GA7PZzMzZ3PLdk1vQG3t7xsfHEQwGMTo6Gu9dgampKYRCIXg8HqatQCAAsVjMeCGXy5GTx6JOAPy6slRdDwkej4dOshc1cXOGh4fR1tbG+KFWqxmghtRBQXnBqaqM1Ele3zwBNLeIkh0OB7JzWTu1avVHDh1DcO0bDg4OcBx7v36jc3YNRXrvJk9UnnjqEQnq+bcLiPytF+nPiXtpSZfeaA3tpVTk78jnNfzY20N0cwuN7lWU6Ce/18ub71zoY0m0JFFmCu1Xu1ZQaouC00PRtdLqGxcSHye9bW1MrDHQHWKtJvc84T9vAfGffyyQBAAAAABJRU5ErkJggg==');
head.appendChild(icon);

// Check if user is on the forum
var forumcheck = spliturl[0].split('/');
var forumcheck = forumcheck[3];

//Change the document title
if (forumcheck != 'forum' && forumcheck != 'wiki')
{
	var h2 = document.getElementsByTagName ('h2');
	var h2 = h2[0].innerHTML;
	var h2 = h2.replace(/&lt;/g, '<')
	var h2 = h2.replace(/&gt;/g, '>')
	var h2 = h2.replace(/&amp;/g, '&')

	var h3 = document.getElementsByTagName ('h3');
	if (h2 != 'Fout!')
	{
		document.title = h2 + ' > Goalll';
	}
	else
	{
		var parama = param['a'];
		var titelfirst = parama[0].toUpperCase();
		var titel = titelfirst;

		for (i=1; i < parama.length;i++)
		{
			var titel = titel + parama[i];
		}

		var titel = titel.replace(/-/g, ' ')

		document.title = titel + ' > Goalll';
	}
}

// Display avatar in the sidebar
if (forumcheck != 'forum')
{
	var div = document.getElementsByTagName ('div')
	var divcount = div.length
	for (i=0;i<divcount;i++)
	{
		if (div[i].id == 'side_bar')
		{
			a = i+1;
			break;
		}
	}
	var username = document.getElementById ('side_bar');
	var username = username.innerHTML;
	var username = username.split('index.php">');
	var username = username[1].split('</a>');
	var username = username[0];
	var cavatar = div[a].innerHTML;
	var cavatar = cavatar.split ('src="');
	var cavatar = cavatar[1].split('"');
	var cavatar = cavatar[0];
	if (cavatar[0] == '.')
	{
		var cavatar = cavatar.split('=');
		var cavatar = cavatar[1];
	}
	div[a].innerHTML = '<img width="90px" height="90px" src="http://goalll.jeffreywashere.nl/imgview.php?avatar='+username+'&cavatar='+cavatar+'" />';
}

// Sidebar edit (and check if there is a newer version)
if (forumcheck != 'forum')
{
	var sidebar = document.getElementById ('side_bar');
	sidebar.innerHTML = sidebar.innerHTML + '<div style="padding-top: 25px; padding-left: 7px;"><a href="../index.php?a=over-goalll-extended"><center><small>Goalll Extended<br />Versie 1.8.9</small></center><a>'
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://goalll.jeffreywashere.nl/version.html',
		headers:
		{
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/html',
		},
		onload: function(responseDetails)
		{
			var recentversion = responseDetails.responseText;
			var sidebar = document.getElementById ('side_bar');
			if (recentversion > 189)
			{
				sidebar.innerHTML = sidebar.innerHTML + '<div><a href="../forum/viewtopic.php?f=9&t=6000" style="color: red;" class="redlink"><small><b><center>Er is een nieuwe versie beschikbaar!</center></b></small></a></div>';
			}
		}
	});
}

//Nav edit
var nav = document.getElementsByTagName ('ul');
if (nav.length != 1)
{
	nav[2].innerHTML = nav[2].innerHTML + '<li><a class="a_menu" href="../index.php?a=verlanglijst">Verlanglijst</a></li>';
	nav[0].innerHTML = nav[0].innerHTML + '<li><a class="a_menu" href="../index.php?a=over-goalll-extended">Goalll Extended</a> <img src="http://www.goalll.nl/images/layout/arrow_down.gif"/><ul><li><a class="a_menu" href="../index.php?a=over-goalll-extended">Over Extended</a></li><li><a class="a_menu" href="../index.php?a=verlanglijst">Verlanglijst</a></li><li><a class="a_menu" href="../index.php?a=spellenlijst">Spellenlijst</a></li><li><a class="a_menu" href="../index.php?a=labels&d=view">Labels</a></li><li><a class="a_menu" href="../index.php?a=avatar">Avatar</a></li><li><a class="a_menu" href="../index.php?a=smileys&d=view">Smiley\'s</a></li></ul></li>';
}

// Display amount of new PB's in the toprightmenu if user is on the forum
if (forumcheck == 'forum')
{
GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://' + location.host + '/ajax.php?a=messages&f=ajax_inboxNewMessage_count',
	onload: function(responseDetails)
	{
		var paginabron = responseDetails.responseText;
		var pmcount = paginabron.split('<new_messages>');
		var pmcount = pmcount[1].split('</new_messages>');
		var pmcount = pmcount[0];
		var toprightmenu = document.getElementById ('topright_menu');
		if (pmcount > 0)
		{
			toprightmenu.innerHTML = toprightmenu.innerHTML + ' - <a href="../index.php?a=messages" style="color: red; font-size: 11px;" class="redlink">Privé Berichten: <b>' + pmcount + '</b></a>';
		}
		else
		{
			toprightmenu.innerHTML = toprightmenu.innerHTML + ' - <a href="../index.php?a=messages" style="font-size: 11px;">Privé Berichten: <b>' + pmcount + '</b></a>';
		}
	}
});
}

// Quicknav in crumblepad on forum
if (forumcheck == 'forum' && param['f'])
{
	var p = document.getElementsByTagName ('p');
	
	if (param['f'] == 1) {
		p[0].innerHTML = '<a href="./index.php">Forumoverzicht</a> » <a href="./viewforum.php?f=1">Algemeen</a><select onchange="location.href=this.options[selectedIndex].value" style="border: medium none !important; background-color: rgb(230, 247, 255) !important; font-size: 15px !important; font-weight: bold !important; width: 22px !important;"><option style="font-weight: bold !important;" value="./viewforum.php?f=1">Algemeen</option><option style="font-weight: normal !important;" value="./viewforum.php?f=8">Discussie</option><option style="font-weight: normal !important;" value="./viewforum.php?f=41">Archief</option></select>';
	}
	else if (param['f'] == 8) {
		p[0].innerHTML = '<a href="./index.php">Forumoverzicht</a> » <a href="./viewforum.php?f=8">Discussie</a><select onchange="location.href=this.options[selectedIndex].value" style="border: medium none !important; background-color: rgb(230, 247, 255) !important; font-size: 15px !important; font-weight: bold !important; width: 22px !important;"><option style="font-weight: normal !important;" value="./viewforum.php?f=1">Algemeen</option><option style="font-weight: bold !important;" value="./viewforum.php?f=8">Discussie</option><option style="font-weight: normal !important;" value="./viewforum.php?f=41">Archief</option></select>';
	}
	else if (param['f'] == 41) {
		p[0].innerHTML = '<a href="./index.php">Forumoverzicht</a> » <a href="./viewforum.php?f=41">Archief</a><select onchange="location.href=this.options[selectedIndex].value" style="border: medium none !important; background-color: rgb(230, 247, 255) !important; font-size: 15px !important; font-weight: bold !important; width: 22px !important;"><option style="font-weight: normal !important;" value="./viewforum.php?f=1">Algemeen</option><option style="font-weight: normal !important;" value="./viewforum.php?f=8">Discussie</option><option style="font-weight: bold !important;" value="./viewforum.php?f=41">Archief</option></select>';
	}
	else if (param['f'] == 2 | param['f'] == 3 | param['f'] == 4 | param['f'] == 5 | param['f'] == 6 | param['f'] == 7) {
		p[0].innerHTML = '<a href="./index.php">Forumoverzicht</a> » <a href="./viewforum.php?f=1">Algemeen</a><select onchange="location.href=this.options[selectedIndex].value" style="border: medium none !important; background-color: rgb(230, 247, 255) !important; font-size: 15px !important; font-weight: bold !important; width: 22px !important;"><option style="display: none !important;" value="#">Algemeen</option><option style="font-weight: bold !important;" value="./viewforum.php?f=1">Algemeen</option><option style="font-weight: normal !important;" value="./viewforum.php?f=8">Discussie</option><option style="font-weight: normal !important;" value="./viewforum.php?f=41">Archief</option></select>';
	}
	else if (param['f'] == 100 | param['f'] == 9 | param['f'] == 74 | param['f'] == 10 | param['f'] == 11 | param['f'] == 12) {
		p[0].innerHTML = '<a href="./index.php">Forumoverzicht</a> » <a href="./viewforum.php?f=8">Discussie</a><select onchange="location.href=this.options[selectedIndex].value" style="border: medium none !important; background-color: rgb(230, 247, 255) !important; font-size: 15px !important; font-weight: bold !important; width: 22px !important;"><option style="display: none !important;" value="#">Discussie</option><option style="font-weight: normal !important;" value="./viewforum.php?f=1">Algemeen</option><option style="font-weight: bold !important;" value="./viewforum.php?f=8">Discussie</option><option style="font-weight: normal !important;" value="./viewforum.php?f=41">Archief</option></select>';
	}
	else if (param['f'] == 42 | param['f'] == 65) {
		p[0].innerHTML = '<a href="./index.php">Forumoverzicht</a> » <a href="./viewforum.php?f=41">Archief</a><select onchange="location.href=this.options[selectedIndex].value" style="border: medium none !important; background-color: rgb(230, 247, 255) !important; font-size: 15px !important; font-weight: bold !important; width: 22px !important;"><option style="font-weight: normal !important;" value="./viewforum.php?f=1">Algemeen</option><option style="font-weight: normal !important;" value="./viewforum.php?f=8">Discussie</option><option style="font-weight: bold !important;" value="./viewforum.php?f=41" selected="selected">Archief</option></select>';
	}

	if (param['f'] == 2) {
		p[0].innerHTML = p[0].innerHTML + ' » <a href="./viewforum.php?f=2">Algemene vragen</a><select onchange="location.href=this.options[selectedIndex].value" style="border: medium none !important; background-color: rgb(230, 247, 255) !important; font-size: 15px !important; font-weight: bold !important; width: 22px !important;"><option style="display: none !important;" value="#">Algemene vragen</option><option style="font-weight: bold !important;" value="./viewforum.php?f=2">Algemene vragen</option><option style="font-weight: normal !important;" value="./viewforum.php?f=3">Bugs en fouten</option><option style="font-weight: normal !important;" value="./viewforum.php?f=4">Moderating</option><option style="font-weight: normal !important;" value="./viewforum.php?f=5">Nieuws en updates</option><option style="font-weight: normal !important;" value="./viewforum.php?f=6">Suggesties en ideeën</option><option style="font-weight: normal !important;" value="./viewforum.php?f=7">Handelsforum</option></select>';
	}
	else if (param['f'] == 3) {
		p[0].innerHTML = p[0].innerHTML + ' » <a href="./viewforum.php?f=3">Bugs en Fouten</a><select onchange="location.href=this.options[selectedIndex].value" style="border: medium none !important; background-color: rgb(230, 247, 255) !important; font-size: 15px !important; font-weight: bold !important; width: 22px !important;"><option style="display: none !important;" value="#">Bugs en fouten</option><option style="font-weight: normal !important;" value="./viewforum.php?f=2">Algemene vragen</option><option style="font-weight: bold !important;" value="./viewforum.php?f=3">Bugs en fouten</option><option style="font-weight: normal !important;" value="./viewforum.php?f=4">Moderating</option><option style="font-weight: normal !important;" value="./viewforum.php?f=5">Nieuws en updates</option><option style="font-weight: normal !important;" value="./viewforum.php?f=6">Suggesties en ideeën</option><option style="font-weight: normal !important;" value="./viewforum.php?f=7">Handelsforum</option></select>';
	}
	else if (param['f'] == 4) {
		p[0].innerHTML = p[0].innerHTML + ' » <a href="./viewforum.php?f=4">Moderating</a><select onchange="location.href=this.options[selectedIndex].value" style="border: medium none !important; background-color: rgb(230, 247, 255) !important; font-size: 15px !important; font-weight: bold !important; width: 22px !important;"><option style="display: none !important;" value="#">Moderating</option><option style="font-weight: normal !important;" value="./viewforum.php?f=2">Algemene vragen</option><option style="font-weight: normal !important;" value="./viewforum.php?f=3">Bugs en fouten</option><option style="font-weight: bold !important;" value="./viewforum.php?f=4">Moderating</option><option style="font-weight: normal !important;" value="./viewforum.php?f=5">Nieuws en updates</option><option style="font-weight: normal !important;" value="./viewforum.php?f=6">Suggesties en ideeën</option><option style="font-weight: normal !important;" value="./viewforum.php?f=7">Handelsforum</option></select>';
	}
	else if (param['f'] == 5) {
		p[0].innerHTML = p[0].innerHTML + ' » <a href="./viewforum.php?f=5">Nieuws en Updates</a><select onchange="location.href=this.options[selectedIndex].value" style="border: medium none !important; background-color: rgb(230, 247, 255) !important; font-size: 15px !important; font-weight: bold !important; width: 22px !important;"><option style="display: none !important;" value="#">Nieuws en updates</option><option style="font-weight: normal !important;" value="./viewforum.php?f=2">Algemene vragen</option><option style="font-weight: normal !important;" value="./viewforum.php?f=3">Bugs en fouten</option><option style="font-weight: normal !important;" value="./viewforum.php?f=4">Moderating</option><option style="font-weight: bold !important;" value="./viewforum.php?f=5">Nieuws en updates</option><option style="font-weight: normal !important;" value="./viewforum.php?f=6">Suggesties en ideeën</option><option style="font-weight: normal !important;" value="./viewforum.php?f=7">Handelsforum</option></select>';
	}
	else if (param['f'] == 6) {
		p[0].innerHTML = p[0].innerHTML + ' » <a href="./viewforum.php?f=6">Suggesties en ideeën</a><select onchange="location.href=this.options[selectedIndex].value" style="border: medium none !important; background-color: rgb(230, 247, 255) !important; font-size: 15px !important; font-weight: bold !important; width: 22px !important;"><option style="display: none !important;" value="#">Suggesties en ideeën</option><option style="font-weight: normal !important;" value="./viewforum.php?f=2">Algemene vragen</option><option style="font-weight: normal !important;" value="./viewforum.php?f=3">Bugs en fouten</option><option style="font-weight: normal !important;" value="./viewforum.php?f=4">Moderating</option><option style="font-weight: normal !important;" value="./viewforum.php?f=5">Nieuws en updates</option><option style="font-weight: bold !important;" value="./viewforum.php?f=6">Suggesties en ideeën</option><option style="font-weight: normal !important;" value="./viewforum.php?f=7">Handelsforum</option></select>';
	}
	else if (param['f'] == 7) {
		p[0].innerHTML = p[0].innerHTML + ' » <a href="./viewforum.php?f=7">Handelsforum</a><select onchange="location.href=this.options[selectedIndex].value" style="border: medium none !important; background-color: rgb(230, 247, 255) !important; font-size: 15px !important; font-weight: bold !important; width: 22px !important;"><option style="display: none !important;" value="#">Handelsforum</option><option style="font-weight: normal !important;" value="./viewforum.php?f=2">Algemene vragen</option><option style="font-weight: normal !important;" value="./viewforum.php?f=3">Bugs en fouten</option><option style="font-weight: normal !important;" value="./viewforum.php?f=4">Moderating</option><option style="font-weight: normal !important;" value="./viewforum.php?f=5">Nieuws en updates</option><option style="font-weight: normal !important;" value="./viewforum.php?f=6">Suggesties en ideeën</option><option style="font-weight: bold !important;" value="./viewforum.php?f=7">Handelsforum</option></select>';
	}
	else if (param['f'] == 100) {
		p[0].innerHTML = p[0].innerHTML + ' » <a href="./viewforum.php?f=100">Introductie</a><select onchange="location.href=this.options[selectedIndex].value" style="border: medium none !important; background-color: rgb(230, 247, 255) !important; font-size: 15px !important; font-weight: bold !important; width: 22px !important;"><option style="display: none !important;" value="#">Introductie</option><option style="font-weight: bold !important;" value="./viewforum.php?f=100">Introductie</option><option style="font-weight: normal !important;" value="./viewforum.php?f=9">Goalll Café</option><option style="font-weight: normal !important;" value="./viewforum.php?f=74">Discussie</option><option style="font-weight: normal !important;" value="./viewforum.php?f=10">Multimedia</option><option style="font-weight: normal !important;" value="./viewforum.php?f=11">Spellen</option><option style="font-weight: normal !important;" value="./viewforum.php?f=12">Sport</option></select>';
	}
	else if (param['f'] == 9) {
		p[0].innerHTML = p[0].innerHTML + ' » <a href="./viewforum.php?f=9">Goalll Café</a><select onchange="location.href=this.options[selectedIndex].value" style="border: medium none !important; background-color: rgb(230, 247, 255) !important; font-size: 15px !important; font-weight: bold !important; width: 22px !important;"><option style="display: none !important;" value="#">Goalll Café</option><option style="font-weight: normal !important;" value="./viewforum.php?f=100">Introductie</option><option style="font-weight: bold !important;" value="./viewforum.php?f=9">Goalll Café</option><option style="font-weight: normal !important;" value="./viewforum.php?f=74">Discussie</option><option style="font-weight: normal !important;" value="./viewforum.php?f=10">Multimedia</option><option style="font-weight: normal !important;" value="./viewforum.php?f=11">Spellen</option><option style="font-weight: normal !important;" value="./viewforum.php?f=12">Sport</option></select>';
	}
	else if (param['f'] == 74) {
		p[0].innerHTML = p[0].innerHTML + ' » <a href="./viewforum.php?f=74">Discussie</a><select onchange="location.href=this.options[selectedIndex].value" style="border: medium none !important; background-color: rgb(230, 247, 255) !important; font-size: 15px !important; font-weight: bold !important; width: 22px !important;"><option style="display: none !important;" value="#">Discussie</option><option style="font-weight: normal !important;" value="./viewforum.php?f=100">Introductie</option><option style="font-weight: normal !important;" value="./viewforum.php?f=9">Goalll Café</option><option style="font-weight: bold !important;" value="./viewforum.php?f=74">Discussie</option><option style="font-weight: normal !important;" value="./viewforum.php?f=10">Multimedia</option><option style="font-weight: normal !important;" value="./viewforum.php?f=11">Spellen</option><option style="font-weight: normal !important;" value="./viewforum.php?f=12">Sport</option></select>';
	}
	else if (param['f'] == 10) {
		p[0].innerHTML = p[0].innerHTML + ' » <a href="./viewforum.php?f=10">Multimedia</a><select onchange="location.href=this.options[selectedIndex].value" style="border: medium none !important; background-color: rgb(230, 247, 255) !important; font-size: 15px !important; font-weight: bold !important; width: 22px !important;"><option style="display: none !important;" value="#">Multimedia</option><option style="font-weight: normal !important;" value="./viewforum.php?f=100">Introductie</option><option style="font-weight: normal !important;" value="./viewforum.php?f=9">Goalll Café</option><option style="font-weight: normal !important;" value="./viewforum.php?f=74">Discussie</option><option style="font-weight: bold !important;" value="./viewforum.php?f=10">Multimedia</option><option style="font-weight: normal !important;" value="./viewforum.php?f=11">Spellen</option><option style="font-weight: normal !important;" value="./viewforum.php?f=12">Sport</option></select>';
	}
	else if (param['f'] == 11) {
		p[0].innerHTML = p[0].innerHTML + ' » <a href="./viewforum.php?f=11">Spellen</a><select onchange="location.href=this.options[selectedIndex].value" style="border: medium none !important; background-color: rgb(230, 247, 255) !important; font-size: 15px !important; font-weight: bold !important; width: 22px !important;"><option style="display: none !important;" value="#">Spellen</option><option style="font-weight: normal !important;" value="./viewforum.php?f=100">Introductie</option><option style="font-weight: normal !important;" value="./viewforum.php?f=9">Goalll Café</option><option style="font-weight: normal !important;" value="./viewforum.php?f=74">Discussie</option><option style="font-weight: normal !important;" value="./viewforum.php?f=10">Multimedia</option><option style="font-weight: bold !important;" value="./viewforum.php?f=11">Spellen</option><option style="font-weight: normal !important;" value="./viewforum.php?f=12">Sport</option></select>';
	}
	else if (param['f'] == 12) {
		p[0].innerHTML = p[0].innerHTML + ' » <a href="./viewforum.php?f=12">Sport</a><select onchange="location.href=this.options[selectedIndex].value" style="border: medium none !important; background-color: rgb(230, 247, 255) !important; font-size: 15px !important; font-weight: bold !important; width: 22px !important;"><option style="display: none !important;" value="#">Sport</option><option style="font-weight: normal !important;" value="./viewforum.php?f=100">Introductie</option><option style="font-weight: normal !important;" value="./viewforum.php?f=9">Goalll Café</option><option style="font-weight: normal !important;" value="./viewforum.php?f=74">Discussie</option><option style="font-weight: normal !important;" value="./viewforum.php?f=10">Multimedia</option><option style="font-weight: normal !important;" value="./viewforum.php?f=11">Spellen</option><option style="font-weight: bold !important;" value="./viewforum.php?f=12">Sport</option></select>';
	}
	else if (param['f'] == 42) {
		p[0].innerHTML = p[0].innerHTML + ' » <a href="./viewforum.php?f=42">Archief</a><select onchange="location.href=this.options[selectedIndex].value" style="border: medium none !important; background-color: rgb(230, 247, 255) !important; font-size: 15px !important; font-weight: bold !important; width: 22px !important;"><option style="display: none !important;" value="#">Archief</option><option style="font-weight: bold !important;" value="./viewforum.php?f=42">Archief</option><option style="font-weight: normal !important;" value="./viewforum.php?f=63">Goalll Krant</option></select>';
	}
	else if (param['f'] == 65) {
		p[0].innerHTML = p[0].innerHTML + ' » <a href="./viewforum.php?f=65">Goalll Krant</a><select onchange="location.href=this.options[selectedIndex].value" style="border: medium none !important; background-color: rgb(230, 247, 255) !important; font-size: 15px !important; font-weight: n !important; width: 22px !important;"><option style="display: none !important;" value="#">Goalll Krant</option><option style="font-weight: normal !important;" value="./viewforum.php?f=42">Archief</option><option style="font-weight: bold !important;" value="./viewforum.php?f=65">Goalll Krant</option></select>';
	}
}

switch(param['a'])
{
	case "verlanglijst":
		if (param['delete'])
		{
			var titel = document.getElementsByTagName ('h2');
			titel[0].innerHTML = 'Bezig...';
			var content = document.getElementsByClassName ('white_bg white_bg_content')
			content[0].innerHTML = 'Bezig met het verwerken, even geduld! Je wordt automatisch doorgestuurd.'
			GM_deleteValue('verlanglijst' + param['speler_id']);
			var forward = url.split('&speler_id');
			var forward = forward[0]
			window.location.href = forward; 
		}
		else
		{
			var content = document.getElementsByClassName ('white_bg white_bg_content')
			content[0].innerHTML = '<p class="uitleg">Op je verlanglijst kan je spelers zetten die je in de gaten wilt houden voor later. Handig als je bijvoorbeeld het geld er niet voor hebt of wil kijken of de speler nog beter wordt!<br />Een speler toevoegen doe je op zijn profiel, verwijderen kan daar maar hier ook.</p>';
			var titel = document.getElementsByTagName ('h2');
			titel[0].innerHTML = 'Verlanglijst';
			var list = GM_listValues();
			var c = 0;
			for (i=0;i<list.length;i++)
			{
				if (list[i][0] == 'v')
				{
					c++;
				}
			}
			if (c != 0)
			{
				content[0].innerHTML = content[0].innerHTML + '<table><thead style="vertical-align: middle;"><tr><td width="160px" style="padding: 2px; font-weight: bold;">Naam</td><td width="90px" style="padding: 2px; font-weight: bold;">Positie</td><td width="40px" style="padding: 2px; font-weight: bold;">Ver.</td><td width="40px" style="padding: 2px; font-weight: bold;">Aan.</td><td width="60px" style="padding: 2px; font-weight: bold;">Leeftijd</td><td width="100px" style="padding: 2px; font-weight: bold;">Waarde</td><td width="140px" style="padding: 2px; font-weight: bold;">Huidige status</td></tr></thead><tbody></tbody></table>';
				for (i=0;i<list.length;i++)
				{
					if (list[i][0] == 'v')
					{
						var speler = list[i].split('verlanglijst');
						var speler = speler[1];
						GM_xmlhttpRequest({
							method: 'GET',
							url: 'http://www.goalll.nl/index.php?a=teamoverzicht&f=spelerinformatie&speler_id='+ speler,
							headers: {
								'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
								'Accept': 'text/html',
							},
							onload: function(responseDetails) {
								var spelersinfo = responseDetails.responseText;
								var spelerid = spelersinfo.split('speler_id=');
								var spelerid = spelerid[1].split('"');
								var spelerid = spelerid[0];
								var naam = spelersinfo.split('<h2>');
								var naam = naam[1].split('</h2>');
								var naam = naam[0];
								var aanvallend = spelersinfo.split('<tr id="show_aanvallend">');
								var aanvallend = aanvallend[1].split('</tr>');
								var aanvallend = aanvallend[0].split('">');
								var aanvallend = aanvallend[4].split('<td');
								var aanvallend = aanvallend[0];
								var verdedigend = spelersinfo.split('<tr id="show_verdedigend">');
								var verdedigend = verdedigend[1].split('</tr>');
								var verdedigend = verdedigend[0].split('">');
								var verdedigend = verdedigend[3].split('<td');
								var verdedigend = verdedigend[0];
								var pensioen = spelersinfo.split('Pensioen');
								var pensioen = pensioen[1].split('<td>');
								var pensioen = pensioen[1].split('</td>');
								var pensioen = pensioen[0];
								var leeftijd = spelersinfo.split('Leeftijd');
								var leeftijd = leeftijd[1].split('<td>');
								var leeftijd = leeftijd[1].split('(');
								var leeftijd = leeftijd[0] + '<small>(p:' + pensioen + ')</small>';
								var positie = spelersinfo.split('Positie');
								var positie = positie[1].split('<td>');
								var positie = positie[1].split('</td>');
								var positie = positie[0]
								var waarde = spelersinfo.split('Waarde');
								var waarde = waarde[1].split('<td>');
								var waarde = waarde[1].split('</td>');
								var waarde = waarde[0];
								var contractduur = spelersinfo.split('Contract duur');
								var contractduur = contractduur[1].split('<td>');
								var contractduur = contractduur[1].split('<');
								var contractduur = contractduur[0].split('</td>');
								var contractduur = contractduur[0].split('	');
								var contractduur = contractduur[17].split(' w');
								var contractduur = contractduur[0] + ' w';
								var contractteam = spelersinfo.split('<td width="35%">Team</td>');
								var contractteam = contractteam[1].split('>');
								var contractteam = contractteam[5];
								
								if (contractduur == '0 w')
								{
									var status = 'Geen contract';
								}
								else
								{
									var status = 'Onder contract <small><small>('+contractduur +')</small></small>';
								}
								content[0].innerHTML = content[0].innerHTML + '<table><tbody><tr><td width="160px" style="padding: 2px;"><a href="http://www.goalll.nl/index.php?a=teamoverzicht&f=spelerinformatie&speler_id='+spelerid+'">' + naam + '</td><td width="90px" style="padding: 2px;">' + positie + '</td><td width="40px" style="padding: 2px;">' + verdedigend + '</td><td width="40px" style="padding: 2px;">' + aanvallend + '</td><td width="60px" style="padding: 2px;">' + leeftijd + '</td><td width="100px" style="padding: 2px;">' + waarde + '</td><td width="140px" style="padding: 2px;">' + status + '</td><td width="100px" style="padding: 2px;"><a href="'+url+'&speler_id='+spelerid+'&delete=true"><img src="images/icons/cross.png"/> Verwijderen</a></td></tr></thead></table>';
							}
						});
					}
				}
			}
			else
			{
				content[0].innerHTML = content[0].innerHTML + '<b>Je hebt geen spelers op je verlanglijst staan!</b> Voeg deze toe op het profiel van een speler!';
			}
		}
	break;
	case "addspeler":
		if (param['delete'])
		{
			var content = document.getElementsByClassName ('white_bg white_bg_content')
			var titel = document.getElementsByTagName ('h2');
			GM_deleteValue('verlanglijst' + param['speler_id']);
			content[0].innerHTML = 'Speler succesvol verwijderd van je verlanglijst!<br /><br />Je wordt vanzelf doorgestuurd.';
			titel[0].innerHTML = 'Verlanglijst';
			var forward = url.split('&a=addspeler');
			var forward = forward[0];
			window.location.href = forward;
		}
		else
		{
			var content = document.getElementsByClassName ('white_bg white_bg_content')
			var titel = document.getElementsByTagName ('h2');
			if(param['speler_id']) {
				GM_setValue('verlanglijst' + param['speler_id'], true);
				content[0].innerHTML = 'Speler succesvol toegevoegd aan je verlanglijst!<br /><br />Je wordt vanzelf doorgestuurd.';
				titel[0].innerHTML = 'Verlanglijst';
				var forward = url.split('&a=addspeler');
				var forward = forward[0];
				window.location.href = forward;
			}
			else
			{
				content[0].innerHTML = 'Speler id niet gevonden, er is wat mis gegaan! Probeer opnieuw.<br /><br /><a onclick="javascript:history.go(-1)" href="#">Ga terug</a>';
			}		
		}
	break;
	case "spellenlijst":	
		if (param['delete'])
		{
			var titel = document.getElementsByTagName ('h2');
			titel[0].innerHTML = 'Bezig...';
			var content = document.getElementsByClassName ('white_bg white_bg_content');
			content[0].innerHTML = 'Bezig met het verwerken, even geduld! Je wordt automatisch doorgestuurd.'
			GM_deleteValue('spellenlijst' + param['id']);
			var forward = url.split('&delete');
			var forward = forward[0]
			window.location.href = forward; 
		}
		var content = document.getElementsByClassName ('white_bg white_bg_content');
		content[0].innerHTML = '<p class="uitleg">Gebruikers van het forum die ook regelmatig spellen op het <a href="http://www.goalll.nl/forum/viewforum.php?f=11">spellenforum</a> spelen kennen het probleem wel. Na een tijdje weet je niet meer precies welke spellen je allemaal aan het spelen was. De spellenlijst is daarvoor de oplossing! Bovenaan elke openingspost zie je een linkje staan. Als je meedoet met dat spel, klik je op die link, en vervolgens komt dat spel hier te staan. Zo weet je precies welk spel je speelt.</p>';
		var titel = document.getElementsByTagName ('h2');
		titel[0].innerHTML = 'Spellenlijst';
		var list = GM_listValues();
		var c = 0;
		for (i=0;i<list.length;i++)
		{
			if (list[i][0] == 's' && list[i][1] == 'p')
			{
				c++;
			}
		}
		if (c != 0)
		{
			for (i=0;i<list.length;i++)
			{
				if (list[i][0] == 's' && list[i][1] == 'p')
				{
					var id = list[i];
					var id = id.split('lijst');
					var id = id[1];
					var name = GM_getValue('spellenlijst'+id)
					var name = name.replace(/%20/g, ' ')
					var name = name.replace(/%3C/g, '&lt;')
					var name = name.replace(/%3E/g, '&gt;')
					if (name == 'Weerwolven van Wakkerdam')
					{
						content[0].innerHTML = content[0].innerHTML + '<a href="'+url+'&delete=on&id='+id+'"><img src="http://www.goalll.nl/images/icons/cross.png" /></a> <a href="http://www.goalll.nl/forum/viewforum.php?f=15">' + name + '</a><br />';
					}
					else if (name == 'Wie is de Mol?')
					{
						content[0].innerHTML = content[0].innerHTML + '<a href="'+url+'&delete=on&id='+id+'"><img src="http://www.goalll.nl/images/icons/cross.png" /></a> <a href="http://www.goalll.nl/forum/viewforum.php?f=85">' + name + '</a><br />';
					}
					else
					{
						content[0].innerHTML = content[0].innerHTML + '<a href="'+url+'&delete=on&id='+id+'"><img src="http://www.goalll.nl/images/icons/cross.png" /></a> <a href="http://www.goalll.nl/forum/viewtopic.php?f=11&t='+id+'">' + name + '</a><br />';
					}
				}
			}
		}
		else
		{
			content[0].innerHTML = content[0].innerHTML + '<b>Je hebt geen spellen op je spellenlijst staan!</b> Voeg deze toe door de link bovenaan de eerste post van het topic van het spel!'
		}	
	break;
	case "messages":
		if (param['f'] != 'delsingle')
		{
			if (param['f'] == 'open' && param['ret'] != 'send')
			{
				var labellist = '';
				var list = GM_listValues();
				var c = 0;
				for (i=0;i<list.length;i++)
				{
					if (list[i][0] == 'l' && list[i][1] == 'a')
					{
						c++;
					}
				}
				if (c != 0)
				{
					for (i=0;i<list.length;i++)
					{
						if (list[i][0] == 'l' && list[i][1] == 'a')
						{
							var name = list[i];
							var name = name.split('label');
							var name = name[1];
							var name = name.replace('+', ' ');
							var labellist = labellist + '<option value="'+name+'">'+name+'</option>';
						}
					}
				}
				else
				{
					var labelcount = 'no-labels';
				}
				var postinhoud = document.getElementsByTagName ('tr');
				for (i=0;i<25;i++)
				{
					var curtr = postinhoud[i].innerHTML;
					var curtr = curtr.split('<')
					var curtr = curtr[2].split('>')
					var curtr = curtr[0];
					if (curtr == 'br')
					{
						if (a == 'ja')
						{
							var t = i;
							break;
						}
						else
						{
							var a = 'ja';
						}
					}
				}
				var td = document.getElementsByTagName ('td');
				td[6].colSpan = 3;
				td[7].colSpan = 3;
				var berichtlabel = GM_getValue('blabel' + param['id'], 'nolabel') 
				var name = berichtlabel.replace('+', ' ');
				if (labelcount != 'no-labels')
				{
					if (berichtlabel == 'nolabel')
					{
						postinhoud[t].innerHTML = postinhoud[t].innerHTML + '<td style="border-top: 1px solid rgb(86, 183, 228);" width="10"><form method="get" action="'+spliturl[0]+'"><input type="checkbox" style="display:none;" name="a" checked="checked" value="labels"/><input type="checkbox" style="display:none;" name="d" checked="checked" value="labelbericht"/><input type="checkbox" style="display:none;" name="s" checked="checked" value="add"/><input type="checkbox" style="display:none;" name="berichtid" checked="checked" value="'+param['id']+'"/><select name="label"><option value="nolabel">Selecteer een label</option>'+labellist+'</select> <input type="submit" value="Label bericht"></td>';
					}
					else
					{
						var labelcolor = GM_getValue('label' + berichtlabel);
						postinhoud[t].innerHTML = postinhoud[t].innerHTML + '<td style="border-top: 1px solid rgb(86, 183, 228); padding-top: 18px;" width="200"><a href="'+spliturl[0]+'?a=labels&d=labelbericht&s=delete&berichtid='+param['id']+'"><img src="http://www.goalll.nl/images/icons/cross.png" /></a> <img src="http://goalll.jeffreywashere.nl/tag_'+labelcolor+'.png" /><a href="'+spliturl[0]+'?a=labels&d=viewperlabel&n='+name+'">'+name+'<a></td>';
					
					
					}
				}
				else
				{
					postinhoud[t].innerHTML = postinhoud[t].innerHTML + '<td style="border-top: 1px solid rgb(86, 183, 228); padding-top: 18px;" width="118"><a href="'+spliturl[0]+'?a=labels&d=view">Label je berichten!</a></td>'
				}
			}
			else
			{
				var dellink = document.getElementById ('delete_inbox');
				dellink.href = spliturl[0] + '?a=delinboxcheck';
				
				var b = 1;
				var d = 20;
				var l = 16;
				var inbox = document.getElementById('msg_inbox');
				var url = url.split('?a');
				var url = url[0];
				inbox.innerHTML = '<form name="input" action="'+url+'?d=pmdel" method="get"><input type="checkbox" style="display:none;" name="a" checked="checked" value="delinbox"/>' + inbox.innerHTML + '<input type="checkbox" name="action" value="massadel"/>Geselecteerde berichten verwijderen&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<input type="checkbox" name="action" value="massaread"/>Geselecteerde berichten als gelezen markeren&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="submit" value="Voer actie uit" /></form>';
				for (i=15;i<100;i=i+6)
				{
					var berichten = document.getElementsByTagName('td');
					var berichtid = berichten[d].innerHTML.split('reply=');
					var berichtid = berichtid[1].split('&');
					var berichtid = berichtid[0];
					berichten[i].innerHTML = '<input type="checkbox" name="delete'+b+'" value="'+berichtid+'"/>';
					berichten[d].innerHTML = '<a href="index.php?a=messages&amp;f=new&amp;reply='+berichtid+'&amp;ret=inbox"><img title="beantwoorden" alt"beantwoorden" src="images/icons/email_go.png"/></a> <a href="index.php?a=messages&delete=on&id='+berichtid+'"><img title="Verwijderen" alt="Verwijderen" src="images/icons/email_delete.png"/></a>';
					
					var berichtlabel = GM_getValue('blabel' + berichtid, 'nolabel');
					var name = berichtlabel.replace('+', ' ');
					if (berichtlabel != 'nolabel')
					{
						var labelcolor = GM_getValue('label' + berichtlabel);
						berichten[l].innerHTML = berichten[l].innerHTML + '<img style="cursor: help;" title="'+name+'" src="http://goalll.jeffreywashere.nl/tag_'+labelcolor+'.png" />';
					}
					var b = b+1;
					var d = d+6;
					var l = l+6;
				}
				
				if (param['delete'])
				{
					var answer = confirm("Weet je zeker dat je het bericht wilt verwijderen?")
					if (answer)
					{
						window.location = spliturl[0] + '?a=messages&f=delsingle&id=' + param['id'] + '&ret=inbox';
					}
				}
				
			}
		}
		var textarea = document.getElementsByTagName ('td');
		if (param['f'] != 'open') {
			textarea[207].innerHTML =  '&nbsp;<a href="#" onclick="document.getElementsByTagName(\'textarea\')[0].value += \' :D \'; document.getElementsByTagName(\'textarea\')[0].focus();"><img src="./forum/images/smilies/icon_e_biggrin.gif"></a>&nbsp;<a href="#" onclick="document.getElementsByTagName(\'textarea\')[0].value += \' :) \'; document.getElementsByTagName(\'textarea\')[0].focus();"><img src="./forum/images/smilies/icon_e_smile.gif"></a>&nbsp;<a href="#" onclick="document.getElementsByTagName(\'textarea\')[0].value += \' ;) \'; document.getElementsByTagName(\'textarea\')[0].focus();"><img src="./forum/images/smilies/icon_e_wink.gif"></a>&nbsp;<a href="#" onclick="document.getElementsByTagName(\'textarea\')[0].value += \' :( \'; document.getElementsByTagName(\'textarea\')[0].focus();"><img src="./forum/images/smilies/icon_e_sad.gif"></a>&nbsp;<a href="#" onclick="document.getElementsByTagName(\'textarea\')[0].value += \' :o \'; document.getElementsByTagName(\'textarea\')[0].focus();"><img src="./forum/images/smilies/icon_e_surprised.gif"></a>&nbsp;<a href="#" onclick="document.getElementsByTagName(\'textarea\')[0].value += \' :shock: \'; document.getElementsByTagName(\'textarea\')[0].focus();"><img src="./forum/images/smilies/icon_eek.gif"></a>&nbsp;<a href="#" onclick="document.getElementsByTagName(\'textarea\')[0].value += \' :? \'; document.getElementsByTagName(\'textarea\')[0].focus();"><img src="./forum/images/smilies/icon_e_confused.gif"></a>&nbsp;<a href="#" onclick="document.getElementsByTagName(\'textarea\')[0].value += \' 8-) \'; document.getElementsByTagName(\'textarea\')[0].focus();"><img src="./forum/images/smilies/icon_cool.gif"></a>&nbsp;<a href="#" onclick="document.getElementsByTagName(\'textarea\')[0].value += \' :lol: \'; document.getElementsByTagName(\'textarea\')[0].focus();"><img src="./forum/images/smilies/icon_lol.gif"></a>&nbsp;<a href="#" onclick="document.getElementsByTagName(\'textarea\')[0].value += \' :x \'; document.getElementsByTagName(\'textarea\')[0].focus();"><img src="./forum/images/smilies/icon_mad.gif"></a>&nbsp;<a href="#" onclick="document.getElementsByTagName(\'textarea\')[0].value += \' :P \'; document.getElementsByTagName(\'textarea\')[0].focus();"><img src="./forum/images/smilies/icon_razz.gif"></a>&nbsp;<a href="#" onclick="document.getElementsByTagName(\'textarea\')[0].value += \' :cry: \'; document.getElementsByTagName(\'textarea\')[0].focus();"><img src="./forum/images/smilies/icon_cry.gif"></a>&nbsp;<a href="#" onclick="document.getElementsByTagName(\'textarea\')[0].value += \' :evil: \'; document.getElementsByTagName(\'textarea\')[0].focus();"><img src="./forum/images/smilies/icon_evil.gif"></a>&nbsp;<a href="#" onclick="document.getElementsByTagName(\'textarea\')[0].value += \' :twisted: \'; document.getElementsByTagName(\'textarea\')[0].focus();"><img src="./forum/images/smilies/icon_twisted.gif"></a>&nbsp;<a href="#" onclick="document.getElementsByTagName(\'textarea\')[0].value += \' :roll: \'; document.getElementsByTagName(\'textarea\')[0].focus();"><img src="./forum/images/smilies/icon_rolleyes.gif"></a>&nbsp;<a href="#" onclick="document.getElementsByTagName(\'textarea\')[0].value += \' :!: \'; document.getElementsByTagName(\'textarea\')[0].focus();"><img src="./forum/images/smilies/icon_exclaim.gif"></a>&nbsp;<a href="#" onclick="document.getElementsByTagName(\'textarea\')[0].value += \' :idea: \'; document.getElementsByTagName(\'textarea\')[0].focus();"><img src="./forum/images/smilies/icon_idea.gif"></a>&nbsp;<a href="#" onclick="document.getElementsByTagName(\'textarea\')[0].value += \' :arrow: \'; document.getElementsByTagName(\'textarea\')[0].focus();"><img src="./forum/images/smilies/icon_arrow.gif"></a>&nbsp;<a href="#" onclick="document.getElementsByTagName(\'textarea\')[0].value += \' :| \'; document.getElementsByTagName(\'textarea\')[0].focus();"><img src="./forum/images/smilies/icon_neutral.gif"></a>&nbsp;<a href="#" onclick="document.getElementsByTagName(\'textarea\')[0].value += \' :mrgreen: \'; document.getElementsByTagName(\'textarea\')[0].focus();"><img src="./forum/images/smilies/icon_mrgreen.gif"></a>&nbsp;<a href="#" onclick="document.getElementsByTagName(\'textarea\')[0].value += \' :geek: \'; document.getElementsByTagName(\'textarea\')[0].focus();"><img src="./forum/images/smilies/icon_e_geek.gif"></a>&nbsp;<a href="#" onclick="document.getElementsByTagName(\'textarea\')[0].value += \' :ugeek: \'; document.getElementsByTagName(\'textarea\')[0].focus();"><img src="./forum/images/smilies/icon_e_ugeek.gif"></a><br />' + textarea[207].innerHTML;
		}
		
		
	break;
	case "delinbox":
		var titel = document.getElementsByTagName ('h2');
		titel[0].innerHTML = 'Privé berichten';
		var content = document.getElementsByClassName ('white_bg white_bg_content');
		content[0].innerHTML = '';
		var deleterow = '';
		var c = 0;
		for (i=1;i<16;i++)
		{
			if (param['delete'+i] != undefined)
			{
				if (c == 0)
				{
				var firstdel = param['delete'+i];
				}
				var deleterow = deleterow + '&deleterow' + c + '=' + param['delete'+i];
				c++;
			}
		}
		c--;
		var deleterow = deleterow.split('&');
		var l = c+2;
		var aantal = c+1;
		var deleterow2 = '';
		for (y=2;y<l;y++)
		{
			var deleterow2 = deleterow2 + deleterow[y] + '&';
		}
		var deleterow2 = deleterow2 + 'max=' + c;
		
		if (param['action'] == 'massadel')
		{
			content[0].innerHTML = '<p class="uitleg">Als je zo op de onderstaande link drukt, zullen alle <b>' + aantal +'</b> geselecteerde berichten definitief verwijderd worden. Dit wordt gedaan door langs alle verwijder-url\'s te \'springen\'. Tijdens het verwijderen moet je niet van dit tabblad afgaan, en ook het tabblad niet afsluiten. Na het verwijderen zal je terugkeren naar je inbox. Je kan dan weer verder Goalllen.<br /><br />Weet je zeker dat je alle berichten wilt verwijderen?</p><a href="./index.php?a=messages&f=delsingle&id=' + firstdel + '&massadel=on&'+deleterow2+'">Ja, verwijderen</a> - <a onclick="javascript:history.go(-1)" href="#">Nee, ga terug</a>'
		}
		else if (param['action'] == 'massaread')
		{
			content[0].innerHTML = '<p class="uitleg">Als je zo op de onderstaande link drukt, zullen alle <b>' + aantal +'</b> geselecteerde berichten als gelezen gemarkeerd worden. Dit wordt gedaan door langs alle bericht-url\'s te \'springen\'. Tijdens het lezen moet je niet van dit tabblad afgaan, en ook het tabblad niet afsluiten. Na het lezen zal je een foutmelding zien, je kan dan weer verder Goalllen.<br /><br />Weet je zeker dat je alle berichten wilt als gelezen wilt markeren?</p><a href="./index.php?a=messages&f=open&id=' + firstdel + '&massaread=on&'+deleterow2+'">Ja, als gelezen markeren</a> - <a onclick="javascript:history.go(-1)" href="#">Nee, ga terug</a>'
		}
		
	break;
	case "delinboxcheck":
		var titel = document.getElementsByTagName ('h2');
		titel[0].innerHTML = 'Privé berichten';
		var content = document.getElementsByClassName ('white_bg white_bg_content');
		content[0].innerHTML = 'Weet je zeker dat je alle berichten wilt verwijderen? Als je dit doet kan je deze niet meer terughalen!<br /><br /><a href="'+spliturl[0]+'?a=messages&f=del_inbox">Ja, verwijderen - <a onclick="javascript:history.go(-1)" href="#">Nee, ga terug</a>';
		
	break;
	case "over-goalll-extended":
		var titel = document.getElementsByTagName ('h2');
		titel[0].innerHTML = 'Over Goalll Extended';
		var content = document.getElementsByClassName ('white_bg white_bg_content')
		content[0].innerHTML = '<img src="http://i29.tinypic.com/10ok70j.png" ondblclick="javascript:window.location.href = \''+spliturl[0]+'?a=goalll-extended\';" style="float:left;"><b>Over Goalll Extended</b><br />Goalll Extended is een project van <a href="http://www.goalll.nl/index.php?a=manager&user_id=476">X_choice</a> en voorheen <a href="http://www.goalll.nl/index.php?a=manager&user_id=17">ssmm987</a>. Goalll Extended voegt extra functies aan Goalll toe, die handig of leuk zijn. Ik bedank iedereen die aan dit project heeft meegeholpen d.m.v. ideeën, feedback, scripten of iets anders.<br /><br /><b>Bugs, tips, ideeën, vragen etc.?</b><br />Al het feedback kan in het topic op het <a href="./index.php?a=forum">Goalll forum</a> die <a href="./forum/viewtopic.php?f=9&t=4981">hier</a> te vinden is.<br /><br /><b>Uitbreidingen die momenteel in Goall Extended zitten</b><br />* Spelers die je later wilt kopen kan je op je verlanglijst zetten<br />* Je kan meerdere PM\'s in 1 keer verwijderen/als gelezen markeren<br />* Er wordt om bevestiging gevraagd bij het verwijderen van een bericht / het accepteren en weigeren van een oefenwedstrijd / het accepteren en weigeren van een bod<br />* Het forumprofiel kan bereikt worden via een link onder elke gebruikersnaam<br />* Je kan een in een keer een PM sturen door een link op het forum<br />* Er wordt een rekentabel voor het loon van je personeel weergegeven <small>(Momenteel alleen voor het hoofdteam)</small><br />* Spellenlijst<br />* Op elke pagina wordt een favicon weergegeven<br />* De paginatitel/topictitel wordt weergegeven in de titel van de pagina<br />* Op het forum wordt rechtsboven het aantal privé berichten weergegeven<br />* Je kan via een link op elke forumpagina direct naar het uitgebreid zoeken en de online leden gaan<br />* Met het scouten kan je nu als niet BA ook sorteren op waarde, moraal en fitheid<br />* Je kan een avatar instellen zonder BA<br />* Je kan aangepaste smileys toevoegen aan het forum<br />* Je kan je berichten labelen<br /><i>Ik werk altijd aan nieuwe uitbreidingen, toevoegingen etc.</i><br /><br /><b>Updaten</b><br />Als er een nieuwe update is van Goalll Extended, zie je dit in de zijbalk van elke Goalll pagina. Er zal aanvullende informatie worden geplaatst in het <a href="./forum/viewtopic.php?f=9&t=6000">discussietopic</a> op het <a href="./index.php?a=forum">Goalll forum</a>. Updaten kan helaas niet automatisch, dus je moet naar de <a href="http://userscripts.org/scripts/show/54594">installatiepagina</a> van Goalll Extended gaan, en daar het script opnieuw installeren door op de groene knop \'Install\' te klikken. Dan opent er een scherm met een lijstje met url\'s. Klik onderaan nog een keer op \'Install\', en Goalll Extended is geupdate! Er komt wel een melding, onderaan de sidebar als er een update beschikbaar is.<br /><br /><b>Uitschakelen of verwijderen</b><br />Hopelijk is het niet zo, maar als je Goalll Extended wilt verwijderen gaat dat heel eenvoudig. In de onderste balk van FireFox zie je een aapje staan. Klik hier met je rechtermuisknop op, en dan op \'Beheer User Scripts\'. Klik dan in de lijst links op \'Goalll Extended\', en dan onderin op de knop \'Verwijderen\'. Nu zal Goalll Extended van je computer verwijderd zijn. Maar in plaats van helemaal verwijderen kan je ook Goalll Extended uitschakelen. Dit betekent dat Goalll Extended niet werkt, maar nog wel op je computer staat. Dit doe je door met je rechtermuisknop op het aapje in de onderste balk van je browser. Dan klik je met je linkermuisknop op \'Goalll Extended\', helemaal bovenaan. Nu zal Goalll Extended niet meer laden.<br /><br /><b>Alle gegevens resetten</b><br />Als je alle gegevens wil resetten, zoals alle spelers op je verlanglijst of alle spellen op je spellenlijst, dan kan je dat doen door op de link hieronder te klikken. Pas wel op, want de gegevens worden definitief verwijderd, dus je kan ze niet meer terug halen!<br/><a href="' + spliturl[0] + '?a=verwijder-alles">Ik weet het zeker, verwijder al mijn gegevens!</a>';
	break;
	case "goalll-extended":
		var titel = document.getElementsByTagName ('h2');
		titel[0].innerHTML = 'Easter Egg';
		var content = document.getElementsByClassName ('white_bg white_bg_content')
		content[0].innerHTML = '<center><embed width="693px" height="504px" quality="high" name="flashobj_mc" id="flashobj_mc" style="" src="http://media.jaludo.com/1on1soccer/1on1soccer.swf" x-shockwave-flash="" application=""/></center>';
	break;
	case "verwijder-alles":
		var list = GM_listValues();
		for (i=0;i<list.length;i++)
		{
			GM_deleteValue(list[i]);
		}
		var titel = document.getElementsByTagName ('h2');
		titel[0].innerHTML = 'Alle gegevens verwijderen';
		var content = document.getElementsByClassName ('white_bg white_bg_content')
		content[0].innerHTML = 'Alle gegevens zijn verwijderd!.';
	break;
	case "personeel":
		var td = document.getElementsByTagName ('td');
		var p = document.getElementsByTagName ('p');
		var jeugdcheck = document.getElementsByTagName ('img')
		var advies = td[7].innerHTML;
		var advies = advies.split(' ');
		var advies = advies[3].split(',-');
		var advies = advies[0].split('.');
		var advies = advies[0] + advies[1];
		var a50 = advies * 0.5;
		var a50 = Math.round(a50);	
		var a75 = advies * 0.75;
		var a75 = Math.round(a75);	
		var a125 = advies * 1.25;
		var a125 = Math.round(a125);	
		var a150 = advies * 1.5;
		var a150 = Math.round(a150);	
		var a175 = advies * 1.75;
		var a175 = Math.round(a175);		
		var a200 = advies * 2;
		var a200 = Math.round(a200);
		if (jeugdcheck[5].src != 'http://www.goalll.nl/images/layout/arrow_right.gif')
		{
			p[0].innerHTML = p[0].innerHTML + '<br /><br />Hieronder een rekentabel voor het salaris van je personeel.<br /><br /><table><thead><td width = 100px><b>Adviesloon</b></td><td width = 100px><b>50%</b></td><td width = 100px><b>75%</b></td><td width = 100px><b>100%</b></td><td width = 100px><b>125%</b></td><td width = 100px><b>150%</b></td><td width = 100px><b>175%</b></td><td width = 100px><b>200%</b></td></thead><tbody><td width = 100px>&euro;' + advies + ',-</td><td width = 100px>&euro;' + a50 + ',-</td><td width = 100px>&euro;' + a75 + ',-</td><td width = 100px>&euro;' + advies + ',-</td><td width = 100px>&euro;' + a125 + ',-</td><td width = 100px>&euro;' + a150 + ',-</td><td width = 100px>&euro;' + a175 + ',-</td><td width = 100px>&euro;' + a200 + ',-</td></tbody></table>';
		}
	break;
	case "oefenwedstrijd":
		if (param['delete'])
		{
			var answer = confirm("Weet je zeker dat je het aanbod wilt weigeren?")
			if (answer)
			{
				window.location = spliturl[0] + '?a=oefenwedstrijd&f=decline&tab=2&challenge_id=' + param['challengeid'];
			}
		}
		if (param['accept'])
		{
			var answer = confirm("Weet je zeker dat je het aanbod wilt accepteren?")
			if (answer)
			{
				window.location = spliturl[0] + '?a=challenge&f=accept&tab=2&challenge_id=' + param['challengeid'];
			}
		}
		var td = document.getElementsByTagName ('td');
		var tdcount = td.length;
		for (i=0;i<tdcount;i++)
		{
			if (td[i].innerHTML == 'Uitdager')
			{
				var s = i + 5;
				var startontvangen = s;
			}
		}
		var c = s;
		for (i=0;i<tdcount;i++)
		{
			var check = td[c].innerHTML;
			var check = check[8] + check[9];
			if (check == '<a')
			{
				var challengeid = td[c].innerHTML;
				var challengeid = challengeid.split('challenge_id=');
				var challengeid = challengeid[1].split('&amp;')
				var challengeid = challengeid[0];
				
				td[c].innerHTML = '<a href="'+spliturl[0]+'?a=oefenwedstrijd&accept=on&challengeid='+challengeid+'"> <img src="images/icons/tick.png" class="accept pointer"/> </a><a href="'+spliturl[0]+'?a=oefenwedstrijd&delete=on&challengeid='+challengeid+'"> <img src="images/icons/cross.png" class="decline pointer"/> </a>'
				c = c+3
			}
		}
	break;
	case "scout":
		var select = document.getElementsByTagName ('select');
		for (i=0;i<select.length;i++)
		{
			if (select[i].name == 'sort_by')
			{
				select[i].innerHTML = select[i].innerHTML + '<option value="waarde">Waarde</option><option value="moraal">Moraal</option><option value="fitheid">Fitheid</option>'
			}
		}
	break;
	case "avatar":
		var username = document.getElementById ('side_bar');
		var username = username.innerHTML;
		var username = username.split('index.php">');
		var username = username[1].split('</a>');
		var username = username[0];
		var titel = document.getElementsByTagName ('h2');
		titel[0].innerHTML = 'Avatar';
		var content = document.getElementsByClassName ('white_bg white_bg_content');
		content[0].innerHTML = 'Upload hier je avatar voor Goalll. De avatar zal helaas alleen zichtbaar zijn voor mensen die ook Goalll Extended hebben.<br />Je avatar zal worden verkleint tot 90 bij 90 pixels, maar het zal handig zijn als jij dit al doet. De maximale grootte voor je avatar is 150 kB. Je kan gif, png en jpg. Misbruik wordt niet getolereerd.<br /><br /><form method="post" action="http://goalll.jeffreywashere.nl/upload.php" enctype="multipart/form-data"><input type="file" name="bestand"><br /><input type="text" style="display: none;" name="naam" value="'+username+'"><br /><input type="submit" name="upload" value="Uploaden"></form>';
	break;
	case "smileys":
		if (param['d'] == 'view')
		{
			var smileylist = '<table><tbody>';
			var list = GM_listValues();
			var c = 0;
			for (i=0;i<list.length;i++)
			{
				if (list[i][0] == 's' && list[i][1] == 'm')
				{
					c++;
				}
			}
			if (c != 0)
			{
				for (i=0;i<list.length;i++)
				{
					if (list[i][0] == 's' && list[i][1] == 'm')
					{
						var name = list[i];
						var name = name.split('ileys');
						var name = name[1];
						var smiley = GM_getValue('smileys'+name);
						var smileysplit = smiley.split('~');
						var surl = smileysplit[0];
						var height = smileysplit[1];

							var smileylist = smileylist + '<tr><td><a href="'+spliturl[0]+'?a=smileys&d=delete&afk='+name+'"><img src="http://www.goalll.nl/images/icons/cross.png" /></a>&nbsp;</td><td>'+name+'&nbsp;</td><td><img src="'+surl+'" height="'+height+'px"></td></td>';
					}
				}
			}
			else
			{
				var smileylist = '<br />Je hebt nog geen smileys toegevoegd. Doe dat via de link hieronder.';
			}
			
			var smileylist = smileylist + '</tbody></table>'
			
			var titel = document.getElementsByTagName ('h2');
			titel[0].innerHTML = 'Smileys';
			var content = document.getElementsByClassName ('white_bg white_bg_content');
			content[0].innerHTML = 'Hier kan je je eigen smileys toevoegen voor op het Goalll forum. Als je dat hebt gedaan, zie je je smileys voortaan links van het berichtveld staan als je een bericht maakt op het Forum.<br /><br /><b>Toegevoegde smiley\'s</b><br />'+smileylist+'<br /><a href="'+spliturl[0]+'?a=smileys&d=new">Een smiley toevoegen</a>';
				
		}
		if (param['d'] == 'new')
		{
			if (param['s'])
			{
				var titel = document.getElementsByTagName ('h2');
				titel[0].innerHTML = 'Smiley toevoegen';
				var content = document.getElementsByClassName ('white_bg white_bg_content')
				content[0].innerHTML = 'Smiley succesvol aangemaakt. Je wordt vanzelf teruggestuurd.'
				
				var surl = param['url'];
				var surl = surl.replace(/%3A/g, ':');
				var surl = surl.replace(/%2F/g, '/');
				var surl = surl.replace(/%3F/g, '?');
				
				var imgheightcheck = new Image();
				imgheightcheck.src = surl;
				
				if (imgheightcheck.height < 51)
				{
					var heightcheck = 'nietgroot';
				}
				else
				{
					var heightcheck = 'groot';
				}
				
				var name = param['name'];
				
				if (surl[4] == ':' && surl[5] == '/') { var surlcheck = 'ok' }
				else { var surlcheck = 'nok'; }
				
				if (surlcheck == 'ok')
				{
					if (heightcheck == 'nietgroot')
					{
					GM_setValue('smileys' + name, surl + '~' + imgheightcheck.height);
					document.location.href = spliturl[0] + '?a=smileys';
					}
					else
					{
						GM_setValue('smileys' + name, surl + '~' + 50);
						document.location.href = spliturl[0] + '?a=smileys';
					}
				}
				else
				{
					alert ('Je hebt geen goede URL ingevoerd! Je wordt vanzelf teruggestuurd.');
					document.location.href = spliturl[0] + '?a=smileys&add=new';
				}
				
				var forward = url.split('new');
				var forward = forward[0] + 'view';
				window.location.href = forward;
			}
			else
			{
				var titel = document.getElementsByTagName ('h2');
				titel[0].innerHTML = 'Smiley toevoegen';
				var content = document.getElementsByClassName ('white_bg white_bg_content')
				content[0].innerHTML = 'Je kan hier een zelfgehoste smiley toevoegen. Vul de naam, de URL en de hoogte van je smiley in, en je kan die vervolgens zo in je bericht plaatsen! Als de hoogte van je smiley meer is dan 50px, wordt de hoogte automatisch 50px. De lengte van je smiley wordt daarna automatisch aangepast. Een url mag niet verkleind zijn. Op zoek naar leuke smiley\'s? In <a href="http://www.goalll.nl/forum/viewtopic.php?f=9&t=9875">dit</a> topic posten Goalll Extended gebruikers de smiley\'s die ze zelf hebben toegevoegd. Misschien zitten er een paar leuke bij!<br /><br /><form method="get" action="'+spliturl[0]+'"><input type="checkbox" style="display:none;" name="a" checked="checked" value="smileys"/><input type="checkbox" style="display:none;" name="d" checked="checked" value="new"/><input type="checkbox" style="display:none;" name="s" checked="checked" value="on"/><table><tr><td width="120px">Naam</td><td><img src="http://goalll.jeffreywashere.nl/textfield_rename.png" /> <input type="text" name="name" size="20"></td></tr><tr><td>Url van de smiley</td><td><img src="http://goalll.jeffreywashere.nl/link.png" /> <input type="text" name="url" size="20"></td></tr></table><input type="submit" value="Verzenden">';
			}
		}
		if (param['d'] == 'delete')
		{
			var titel = document.getElementsByTagName ('h2');
			titel[0].innerHTML = 'Smiley verwijderen';
			var content = document.getElementsByClassName ('white_bg white_bg_content')
			GM_deleteValue('smileys' + param['afk']);
			content[0].innerHTML = 'Label succesvol verwijdert. Je wordt vanzelf teruggestuurd.'
			var forward = url.split('=delete');
			var forward = forward[0] + '=view';
			window.location.href = forward;
		}
	break;
	case "labels":
		if (param['d'] == 'view')
		{
			var labellist = '';
			var list = GM_listValues();
			var c = 0;
			for (i=0;i<list.length;i++)
			{
				if (list[i][0] == 'l' && list[i][1] == 'a')
				{
					c++;
				}
			}
			if (c != 0)
			{
				for (i=0;i<list.length;i++)
				{
					if (list[i][0] == 'l' && list[i][1] == 'a')
					{
						var name = list[i];
						var name = name.split('label');
						var name = name[1];
						var name = name.replace('+', ' ');
						var color = GM_getValue(list[i]);
						var labellist = labellist + '<br /><a href="'+spliturl[0]+'?a=labels&d=delete&n='+list[i]+'"><img src="http://www.goalll.nl/images/icons/cross.png" /></a>  <img src="http://goalll.jeffreywashere.nl/tag_'+color+'.png" /><a href="'+spliturl[0]+'?a=labels&d=viewperlabel&n='+name+'">'+name+'<a>';
					}
				}
			}
			else
			{
				var labellist = '<br />Je hebt nog geen labels toegevoegd!';
			}
			
				var titel = document.getElementsByTagName ('h2');
				titel[0].innerHTML = 'Labels';
				var content = document.getElementsByClassName ('white_bg white_bg_content')
				content[0].innerHTML = 'Een label is handig om je PM\'s te ordenen. Je kiest namelijke en naam en een kleur, voegt berchten toe aan een label, en de kleur wordt voor elk bericht weergegeven. Zo weet je precies wat welk bericht is en waar het bij hoort!<br /><br /><b>Jouw labels</b><br /><i>Let op! Als je een label verwijdert, verwijder dan eerst alle labels van de berichten van dat label!</i><br />'+labellist+'<br /><br /><a href="'+spliturl[0]+'?a=labels&d=new">Een nieuw label aanmaken</a>'
				
		}
		if (param['d'] == 'viewperlabel')
		{
			if (param['n'])
			{
				var labellist = '';
				var list = GM_listValues();
				var c = 0;
				for (i=0;i<list.length;i++)
				{
					if (list[i][0] == 'b' && list[i][1] == 'l')
					{
						if	(GM_getValue(list[i]) == param['n'])
						{
							c++;
						}
					}
				}
				if (c != 0)
				{
					for (i=0;i<list.length;i++)
					{
						if (list[i][0] == 'b' && list[i][1] == 'l')
						{
							if	(GM_getValue(list[i]) == param['n'])
							{
								var berichtid = list[i];
								var berichtid = berichtid.split('blabel');
								var berichtid = berichtid[1];
								var labellist = labellist + '<a href="'+spliturl[0]+'?a=messages&f=open&id=' + berichtid + '"><img src="http://i43.tinypic.com/2l8kysn.png" /></a>&nbsp;&nbsp;';
							}
						}
					}
				}
				else
				{
					var labellist = '<br />Geen berichten gevonden met dit label.';
				}
					var titel = document.getElementsByTagName ('h2');
					titel[0].innerHTML = 'Labels';
					var content = document.getElementsByClassName ('white_bg white_bg_content');
					content[0].innerHTML = 'Hieronder vind je alle berichten met het label '+param['n']+'. Helaas is het niet mogelijk de onderwerpen van deze berichten te zien.<br /><br />'+labellist;
			}
			else
			{
				var titel = document.getElementsByTagName ('h2');
				titel[0].innerHTML = 'Label niet gevonden';
				var content = document.getElementsByClassName ('white_bg white_bg_content')
				content[0].innerHTML = 'Er is geen label opgegeven.'
			}
		}
		if (param['d'] == 'new')
		{
			if (param['s'])
			{
				var titel = document.getElementsByTagName ('h2');
				titel[0].innerHTML = 'Label toevoegen';
				var content = document.getElementsByClassName ('white_bg white_bg_content')
				GM_setValue('label' + param['name'], param['color']);
				content[0].innerHTML = 'Label succesvol aangemaakt. Je wordt vanzelf teruggestuurd.'
				var forward = url.split('new');
				var forward = forward[0] + 'view';
				window.location.href = forward;
			}
			else
			{
				var titel = document.getElementsByTagName ('h2');
				titel[0].innerHTML = 'Label toevoegen';
				var content = document.getElementsByClassName ('white_bg white_bg_content')
				content[0].innerHTML = 'Geef je label eerst een naam, en kies daarna een labelkleur. Deze zal voor elk gelabeld bericht staan!<br /><br /><form method="get" action="'+spliturl[0]+'"><input type="checkbox" style="display:none;" name="a" checked="checked" value="labels"/><input type="checkbox" style="display:none;" name="d" checked="checked" value="new"/><input type="checkbox" style="display:none;" name="s" checked="checked" value="save"/><table><tr><td width="80px" height="25px">Naam</td><td><img src="http://goalll.jeffreywashere.nl/textfield_rename.png" /> <input type="text" name="name" size="20"></td></tr><tr><td height="25px">Kleur</td><td><img src="http://goalll.jeffreywashere.nl/color_swatch.png" /> <input type="radio" name="color" value="blue" /><img src="http://goalll.jeffreywashere.nl/tag_blue.png" />   <input type="radio" name="color" value="green" /><img src="http://goalll.jeffreywashere.nl/tag_green.png" />   <input type="radio" name="color" value="orange" /><img src="http://goalll.jeffreywashere.nl/tag_orange.png" />   <input type="radio" name="color" value="pink" /><img src="http://goalll.jeffreywashere.nl/tag_pink.png" />   <input type="radio" name="color" value="purple" /><img src="http://goalll.jeffreywashere.nl/tag_purple.png" />   <input type="radio" name="color" value="red" /><img src="http://goalll.jeffreywashere.nl/tag_red.png" />   <input type="radio" name="color" value="yellow" /><img src="http://goalll.jeffreywashere.nl/tag_yellow.png" /></td></tr></table><input type="submit" value="Aanmaken"></form>'
			}
		}
		if (param['d'] == 'labelbericht')
		{
			if (param['s'] == 'add')
			{
				if (param['label'] != 'nolabel')
				{
					var titel = document.getElementsByTagName ('h2');
					titel[0].innerHTML = 'Bericht labelen';
					var content = document.getElementsByClassName ('white_bg white_bg_content');
					GM_setValue('blabel' + param['berichtid'], param['label']);
					content[0].innerHTML = 'Label succesvol gelabeld. Je wordt vanzelf teruggestuurd.'
					var forward = spliturl[0] + '?a=messages&f=open&id=' + param['berichtid'];
					window.location.href = forward;
				}
				else
				{
					var titel = document.getElementsByTagName ('h2');
					titel[0].innerHTML = 'Bericht labelen';
					var content = document.getElementsByClassName ('white_bg white_bg_content');
					content[0].innerHTML = 'Selecteer wel een label! Je wordt vanzelf doorgestuurd.';
					var forward = spliturl[0] + '?a=messages&f=open&id=' + param['berichtid'];
					window.location.href = forward;
				}
			}
			if (param['s'] == 'delete')
			{
				var titel = document.getElementsByTagName ('h2');
				titel[0].innerHTML = 'Label verwijderen';
				var content = document.getElementsByClassName ('white_bg white_bg_content')
				GM_deleteValue('blabel' + param['berichtid']);
				content[0].innerHTML = 'Label succesvol verwijdert. Je wordt vanzelf teruggestuurd.'
				var forward = spliturl[0] + '?a=messages&f=open&id=' + param['berichtid'];
				window.location.href = forward;
			}
		}
		if (param['d'] == 'delete')
		{
			var titel = document.getElementsByTagName ('h2');
			titel[0].innerHTML = 'Label verwijderen';
			var content = document.getElementsByClassName ('white_bg white_bg_content')
			GM_deleteValue(param['n']);
			content[0].innerHTML = 'Label succesvol verwijdert. Je wordt vanzelf teruggestuurd.'
			var forward = url.split('=delete');
			var forward = forward[0] + '=view';
			window.location.href = forward;
		}
	break;
	default:
}


switch(param['f'])
{
	case "delsingle":
		if (param['massadel'])
		{
			if (param['max'] < 0)
			{
				window.location.href = spliturl[0] + '?a=messages';
			}
			else
			{
				var content = document.getElementsByClassName ('white_bg')
				content[0].innerHTML = '';
				var totaal = param['max']-1;
				var max = param['max'];
				var counter = param['max'];
				var list = '';
				var i = 1;
				while (counter > 1)
				{
					var list = list + '&deleterow' + i + '=' + param['deleterow'+i];
					counter--;
					i++;
				}
				var list = list + '&max=' + totaal;
				var melding = document.getElementsByTagName('b');
				window.location.href = spliturl[0] + '?a=messages&f=delsingle&id=' + param['deleterow'+max] + '&ret=inbox&massadel=on' + list;
			}
		}
	break;
	case "open":
		if (param['massaread'])
		{
			if (param['max'] < 0)
			{
				window.location.href = spliturl[0] + '?a=messages';
			}
			else
			{
				var content = document.getElementsByClassName ('white_bg')
				content[0].innerHTML = '';
				var totaal = param['max']-1;
				var max = param['max'];
				var counter = param['max'];
				var list = '';
				var i = 1;
				while (counter > 1)
				{
					var list = list + '&deleterow' + i + '=' + param['deleterow'+i];
					counter--;
					i++;
				}
				var list = list + '&max=' + totaal;
				var melding = document.getElementsByTagName('b');
				window.location.href = spliturl[0] + '?a=messages&f=open&id=' + param['deleterow'+max] + '&ret=inbox&massaread=on' + list;
			}
		}
	break;
	case "spelerinformatie":
		var extratd = document.getElementsByTagName('tr'); 
		extratd[5].innerHTML = extratd[5].innerHTML + '<td width="0px"></td>'
		var teamnaam = document.getElementsByTagName('h1');
		var teamnaam = teamnaam[0].innerHTML.split('>');
		var teamnaam = teamnaam[1].split('	');
		var teamnaam = teamnaam[5];
		var contractteam = document.getElementsByTagName('td');
		var contractteam = contractteam[30].innerHTML;
		var contractteam = contractteam.split('>');
		var contractteam = contractteam[1].split('<');
		var contractteam = contractteam[0];
		if(contractteam == teamnaam)
		{
			var spelerp = document.getElementsByTagName ('tbody');
				spelerp[2].innerHTML = spelerp[2].innerHTML + '<tr> <td colspan="3">Je kan je eigen spelers niet op je verlanglijst zetten!</td> </tr>';
		}
		else
		{
			if(GM_getValue('verlanglijst'+ param['speler_id'], false) != true)
			{
				var spelerp = document.getElementsByTagName ('tbody');
				spelerp[2].innerHTML = spelerp[2].innerHTML + '<tr> <td colspan="3"><a href="'+url+'&a=addspeler">Voeg deze speler toe aan mijn verlanglijst!</a> </td> </tr>';
			}
			else
			{
				var spelerp = document.getElementsByTagName ('tbody');
				spelerp[2].innerHTML = spelerp[2].innerHTML + '<tr> <td colspan="3">Deze speler staat op je verlanglijst! <a href="'+url+'&a=addspeler&delete=true">Verwijderen</a></td> </tr>';
			}		
		}
	break;
	case "aanbiedingen":		
		if (param['delete'])
		{
			var answer = confirm("Weet je zeker dat je het bod wilt weigeren?")
			if (answer)
			{
				window.location = spliturl[0] + '?a=transfer&f=aanbiedingen&fa=decline&aanbieding_id=' + param['bodid'];
			}
		}
		if (param['accept'])
		{
			var answer = confirm("Weet je zeker dat je het bod wilt accepteren?")
			if (answer)
			{
				window.location = spliturl[0] + '?a=transfer&f=aanbiedingen&fa=accept&aanbieding_id=' + param['bodid'];
			}
		}
		
		var biedingen = document.getElementsByTagName ('tr');
		var trcount = biedingen.length;
		var td = document.getElementsByTagName ('td');
		var b = 5;
		var c = 0;
		var d = 0;
		
		for (i=0;i<trcount;i++)
		{
			var theadtest = biedingen[i].innerHTML;
			var theadtest = theadtest.split('<td>');
			var theadtest = theadtest[1].split('</td>');
			var theadtest = theadtest[0];
			
			if (theadtest != 'Naam')
			{
				var bodid = td[b].innerHTML;
				var bodid = bodid.split('name="');
				var bodid = bodid[1].split('">')
				var bodid = bodid[0];
			}
			
			if (theadtest == 'Naam')
			{
				d++;
			}
			
			if (theadtest != 'Naam' && d != 2)		
			{
				td[b].innerHTML = '<a href="'+spliturl[0]+'?a=transfer&f=aanbiedingen&accept=on&bodid='+bodid+'"> <img name="' + bodid + '" src="images/icons/tick.png" class="accept pointer"/> </a><a href="'+spliturl[0]+'?a=transfer&f=aanbiedingen&delete=on&bodid='+bodid+'"> <img name="' + bodid + '" src="images/icons/cross.png" class="decline pointer"/> </a>';
				
			}
			var b = b+6;
		}
		
	break;
	case "11":	
		if (param['t'] && param['mode'] == undefined || param['p'] && param['mode'] == undefined)
		{
			if (param['d'])
			{
				if (param['d'] == 'add')
				{
				GM_setValue('spellenlijst' + param['t'], param['n']);
				var forward = url.split('&d=add');
				var forward = forward[0];
				window.location.href = forward;
				}
				else if (param['d'] == 'del')
				{
				GM_deleteValue('spellenlijst' + param['t']);
				var forward = url.split('&d=del');
				var forward = forward[0];
				window.location.href = forward;
				}
			}
			else
			{
				var firstpost = document.getElementsByTagName ('div');
				var titel = document.getElementsByTagName ('div');
				var titel = titel[13].innerHTML;
				var titel = titel.split('</b> ');
				var titel = titel[1];
				var check = GM_getValue('spellenlijst'+ param['t'], 'undefined');
				if (titel != 'Anti-Ba Topics' && titel != 'Goalll.nl is op zoek naar versterking! (vacature)' && titel != 'Forumregels' && titel != 'Afwezigheid voor spellen')
				{
					if (check == 'undefined' && titel[0]+titel[1] != 'Re')
					{
						firstpost[15].innerHTML = '<a class="postlink" href="'+url+'&d=add&n='+titel+'"><b>Ik doe mee met dit spel, voeg het toe aan mijn spellenlijst</b></a><br /><br />' + firstpost[15].innerHTML;
					}
					else if (titel[0]+titel[1] != 'Re')
					{
						firstpost[15].innerHTML = '<a class="postlink" href="'+url+'&d=del"><b>Verwijder dit spel van mijn spellenlijst</b></a><br /><br />' + firstpost[15].innerHTML;
					}
				}
			}	
		}	
		else if (!param['mode'] && !param['mark'])
		{
			var td = document.getElementsByTagName ('td');
			td[4].innerHTML = '<a class="nav" href="../index.php?a=spellenlijst">Geef mijn spellenlijst weer</a>   ||   ' + td[4].innerHTML 
		}
	break;
	case "15":	
		if (!param['t'] && !param['p'] && !param['mode'] && !param['mark'])
		{
			var tr = document.getElementsByTagName ('tr');
			if (param['d'])
			{
				if (param['d'] == 'add')
				{
					GM_setValue('spellenlijst15', 'Weerwolven van Wakkerdam');
					var forward = url.split('&d=add');
					var forward = forward[0];
					window.location.href = forward;
				}
				else if (param['d'] == 'del')
				{
					GM_deleteValue('spellenlijst15');
					var forward = url.split('&d=del');
					var forward = forward[0];
					window.location.href = forward;
				}
			}
			else
			{
				var check = GM_getValue('spellenlijst15', 'undefined');
				if (check == 'undefined')
				{
					tr[4].innerHTML = '<a class="nav" href="'+url+'&d=add">Voeg dit spel toe aan mijn spellenlijst</a> || &nbsp;<a class="nav" href="../index.php?a=spellenlijst">Geef mijn spellenlijst weer</a> || &nbsp;' + tr[4].innerHTML 
				}
				else
				{
					tr[4].innerHTML = '<a class="nav" href="'+url+'&d=del">Verwijder dit spel van mijn spellenlijst</a> || &nbsp;<a class="nav" href="../index.php?a=spellenlijst">Geef mijn spellenlijst weer</a> || &nbsp;' + tr[4].innerHTML 
				}
			}
		}

	break;
	case "85":	
		if (!param['t'] && !param['p'] && !param['mode'] && !param['mark'])
		{
			var tr = document.getElementsByTagName ('tr');
			if (param['d'])
			{
				if (param['d'] == 'add')
				{
					GM_setValue('spellenlijst85', 'Wie is de Mol?');
					var forward = url.split('&d=add');
					var forward = forward[0];
					window.location.href = forward;
				}
				else if (param['d'] == 'del')
				{
					GM_deleteValue('spellenlijst85');
					var forward = url.split('&d=del');
					var forward = forward[0];
					window.location.href = forward;
				}
			}
			else
			{
				var check = GM_getValue('spellenlijst85', 'undefined');
				if (check == 'undefined')
				{
					tr[4].innerHTML = '<a class="nav" href="'+url+'&d=add">Voeg dit spel toe aan mijn spellenlijst</a> || &nbsp;<a class="nav" href="../index.php?a=spellenlijst">Geef mijn spellenlijst weer</a> || &nbsp;' + tr[4].innerHTML 
				}
				else
				{
					tr[4].innerHTML = '<a class="nav" href="'+url+'&d=del">Verwijder dit spel van mijn spellenlijst</a> || &nbsp;<a class="nav" href="../index.php?a=spellenlijst">Geef mijn spellenlijst weer</a> || &nbsp;' + tr[4].innerHTML 
				}
			}
		}
		break;
		case "88":	
		if (!param['t'] && !param['p'] && !param['mode'] && !param['mark'])
		{
			var tr = document.getElementsByTagName ('tr');
			if (param['d'])
			{
				if (param['d'] == 'add')
				{
					GM_setValue('spellenlijst88', 'Expeditie Robinson');
					var forward = url.split('&d=add');
					var forward = forward[0];
					window.location.href = forward;
				}
				else if (param['d'] == 'del')
				{
					GM_deleteValue('spellenlijst85');
					var forward = url.split('&d=del');
					var forward = forward[0];
					window.location.href = forward;
				}
			}
			else
			{
				var check = GM_getValue('spellenlijst88', 'undefined');
				if (check == 'undefined')
				{
					tr[4].innerHTML = '<a class="nav" href="'+url+'&d=add">Voeg dit spel toe aan mijn spellenlijst</a> || &nbsp;<a class="nav" href="../index.php?a=spellenlijst">Geef mijn spellenlijst weer</a> || &nbsp;' + tr[4].innerHTML 
				}
				else
				{
					tr[4].innerHTML = '<a class="nav" href="'+url+'&d=del">Verwijder dit spel van mijn spellenlijst</a> || &nbsp;<a class="nav" href="../index.php?a=spellenlijst">Geef mijn spellenlijst weer</a> || &nbsp;' + tr[4].innerHTML 
				}
			}
		}

	break;
	default:
}

//Display avatars on every post on the forum
if (param['t'] && !param['mode'] || param['p'] && !param['mode'])
{
	var td = document.getElementsByTagName ('td');
	for (i=0;i<td.length;i++)
	{
		var align = td[i].align;
		var pollcheck = td[i].innerHTML;
		var p = 0;
		if (align == 'center' && pollcheck[14] == 'p' || pollcheck[14] == 'u')
		{
			var username = td[i].innerHTML;
			var username = username.split('postauthor"');
			var username = username[1].split('>');
			var username = username[1].split('</b')
			var username = username[0];
			var n = i+5;
			var p = p+4+i;
			var b = i+2;
			var bicontest = td[b].innerHTML;
			var bicontest = bicontest.split(' ');
			var bicontest = bicontest[0];
			if (bicontest == '<img')
			{
				var p = p+1;
				var n = n+1;
			}
			var tdavatar = td[n].innerHTML;
			var tdavatar = tdavatar.split (' ');
			var tdavatar = tdavatar[0];
			if (tdavatar == '<img')
			{
				var cavatar = td[n].innerHTML;
				var cavatar = cavatar.split('src="');
				var cavatar = cavatar[1].split('"');
				var cavatar = cavatar[0];
				if (cavatar[0] == '.')
				{
					var cavatar = cavatar.split('=');
					var cavatar = cavatar[1];
				}
				td[n].innerHTML = '';
			}
			else
			{
				var cavatar = 'noavatar';
			}
			
			td[p].innerHTML = td[p].innerHTML + '<br /><img width="90px" height="90px" src="http://goalll.jeffreywashere.nl/imgview.php?avatar='+username+'&cavatar='+cavatar+'" />';
		}
	}
}

// Display extra icons, eg. new Private Message to postmaker 
if (param['t'] && !param['mode'] || param['p'] && !param['mode'])
{
	var td = document.getElementsByTagName ('td');
	for (i=0;i<td.length;i++)
	{
		var align = td[i].align;
		
		var pollcheck = td[i].innerHTML;

		if (align == 'center' && pollcheck[14] == 'p' || pollcheck[14] == 'u')
		{
			var fid = td[i].innerHTML;
			var fid = fid.split('fid=');
			var fid = fid[1].split('">');
			var fid = fid[0];
			
			var username = td[i].innerHTML;
			var username = username.split('postauthor"');
			var username = username[1].split('>');
			var username = username[1].split('</b')
			var username = username[0];
			
			td[i].innerHTML = td[i].innerHTML +'<br /><a href="../index.php?a=members&amp;f=details&amp;fid=' + fid + '"><img src="http://i32.tinypic.com/z5myt.png"></a><a href="http://www.goalll.nl/forum/memberlist.php?mode=viewprofile&u=' + fid + '"><img src="http://i29.tinypic.com/w1fr6t.png"></a> <a href="http://www.goalll.nl/index.php?a=messages&f=new&to=' + username + '"><img src="http://i26.tinypic.com/2wfsd1k.png"></a>';
			
		}
		
	}
}

// Display topic title in window title
if (param['t'] && !param['mode'] || param['p'] && !param['mode'])
{
	if (forumcheck == 'forum')
	{
		var titel = document.getElementsByTagName ('div');
		var titel = titel[13].innerHTML;
		var titel = titel.split('</b> ');
		var titel = titel[1];
		var titel = titel.replace(/&lt;/g, '<')
		var titel = titel.replace(/&gt;/g, '>')
		var titel = titel.replace(/&amp;/g, '&')
		if (titel[0] + titel[1] + titel[2] == 'Re:')
		{
			var titel = titel.split('Re: ');
			var titel = titel[1];
		}
		document.title = titel + ' > Goalll Forum';
	}
}

// Remove Facebook like/dislike buttons
if (param['t'] && !param['mode'] || param['p'] && !param['mode'])
{
	if (document.getElementsByTagName('iframe')[0].src[13] == 'c' && document.getElementsByTagName('iframe')[0].src[14] == 'e')
	{
		document.getElementsByTagName('iframe')[0].style.height = '0px';
	}
}

// Display extra smileys
if (param['mode'] == 'reply' || param['mode'] == 'edit' || param['mode'] == 'quote' || param['mode'] == 'post')
{
	var td = document.getElementsByTagName ('td');

	var tdlength = td.length - 100;

	for (i=6;i<tdlength;i++)
	{
		if (td[i].innerHTML == '<b>Smilies</b>')
		{
			var std = i+1;
			break;
		}
	}

	td[std].innerHTML = td[std].innerHTML + '<br /><a style="line-height: 20px;" onclick="insert_text(\':angel:\', true); return false;" href="#"><img width="15" vspace="2" hspace="2" height="17" src="http://img188.imageshack.us/img188/1760/iconangelc.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\':clap:\', true); return false;" href="#"><img width="18" vspace="2" hspace="2" height="17" src="http://img509.imageshack.us/img509/4575/iconclap.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\':confused:\', true); return false;" href="#"><img width="15" vspace="2" hspace="2" height="17" src="http://img192.imageshack.us/img192/2935/iconconfusedj.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\':crazy:\', true); return false;" href="#"><img width="15" vspace="2" hspace="2" height="17" src="NOIMAGEHERE"/></a>   <a style="line-height: 20px;" onclick="insert_text(\':hu:\', true); return false;" href="#"><img width="15" vspace="2" hspace="2" height="17" src="http://img192.imageshack.us/img192/5599/iconeh.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\':lolno:\', true); return false;" href="#"><img width="15" vspace="2" hspace="2" height="17" src="http://img694.imageshack.us/img694/7327/iconlolno.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\':-.-:\', true); return false;" href="#"><img width="15" vspace="2" hspace="2" height="17" src="http://img196.imageshack.us/img196/9127/iconproblem.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\':ssst:\', true); return false;" href="#"><img width="15" vspace="2" hspace="2" height="17" src="http://img199.imageshack.us/img199/5817/iconshh.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\':shifty:\', true); return false;" href="#"><img width="15" vspace="2" hspace="2" height="17" src="http://img188.imageshack.us/img188/1631/iconshifty.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\':sick:\', true); return false;" href="#"><img width="15" vspace="2" hspace="2" height="17" src="http://img199.imageshack.us/img199/8459/iconsick.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\':silent:\', true); return false;" href="#"><img width="15" vspace="2" hspace="2" height="17" src="http://img509.imageshack.us/img509/6984/iconsilent.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\':think:\', true); return false;" href="#"><img width="15" vspace="2" hspace="2" height="17" src="http://img696.imageshack.us/img696/6706/iconthink.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\':thumbup:\', true); return false;" href="#"><img width="20" vspace="2" hspace="2" height="17" src="http://img694.imageshack.us/img694/670/iconthumbup.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\':thumbdown:\', true); return false;" href="#"><img width="20" vspace="2" hspace="2" height="17" src="http://img192.imageshack.us/img192/9202/iconthumbdown.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\':wave:\', true); return false;" href="#"><img width="23" vspace="2" hspace="2" height="17" src="http://img196.imageshack.us/img196/723/iconwave.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\':wtf:\', true); return false;" href="#"><img width="15" vspace="2" hspace="2" height="17" src="http://img694.imageshack.us/img694/6393/iconwtf.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\':sleepy:\', true); return false;" href="#"><img width="15" vspace="2" hspace="2" height="17" src="http://img509.imageshack.us/img509/3307/iconyawn.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\':eyebleed:\', true); return false;" href="#"><img width="15" vspace="2" hspace="2" height="17" src="http://img192.imageshack.us/img192/6470/iconeyebleed.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\':lecture:\', true); return false;" href="#"><img width="18" vspace="2" hspace="2" height="17" src="http://img188.imageshack.us/img188/5931/iconlecture.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\':ninja:\', true); return false;" href="#"><img width="15" vspace="2" hspace="2" height="17" src="http://img196.imageshack.us/img196/4949/iconninja.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\':yes:\', true); return false;" href="#"><img width="15" vspace="2" hspace="2" height="17" src="http://img188.imageshack.us/img188/4269/iconyesi.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\':no:\', true); return false;" href="#"><img width="15" vspace="2" hspace="2" height="17" src="http://img696.imageshack.us/img696/1885/iconno.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\':shake:\', true); return false;" href="#"><img width="15" vspace="2" hspace="2" height="17" src="http://img694.imageshack.us/img694/9205/iconshake.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\':alien:\', true); return false;" href="#"><img width="15" vspace="2" hspace="2" height="17" src="http://img64.imageshack.us/img64/3865/iconalien.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\'xD\', true); return false;" href="#"><img width="15" vspace="2" hspace="2" height="17" src="http://img64.imageshack.us/img64/8797/iconxd.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\':thefinger:\', true); return false;" href="#"><img width="20" vspace="2" hspace="2" height="17" src="http://img197.imageshack.us/img197/3280/iconthefinger.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\':clown:\', true); return false;" href="#"><img width="15" vspace="2" hspace="2" height="17" src="http://img696.imageshack.us/img696/2760/iconclown.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\'_o-\', true); return false;" href="#"><img width="29" vspace="2" hspace="2" height="17" src="http://img199.imageshack.us/img199/1603/iconhaha.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\'_o_\', true); return false;" href="#"><img width="29" vspace="2" hspace="2" height="17" src="http://img509.imageshack.us/img509/7176/iconworshippy.gif"/></a>   <a style="line-height: 20px;" onclick="insert_text(\':suprised:\', true); return false;" href="#"><img width="15" vspace="2" hspace="2" height="19" src="http://img188.imageshack.us/img188/3143/iconsurprisedd.gif"/></a><br /><br />';

	var list = GM_listValues();
	for (i=0;i<list.length;i++)
	{
		if (list[i][0] == 's' && list[i][1] == 'm')
		{
			var afk = list[i];
			var afk = afk.split('ileys');
			var afk = afk[1];
			var smiley = GM_getValue('smileys'+afk);
			var smileysplit = smiley.split('~');
			var surl = smileysplit[0];
			var height = smileysplit[1];
			var width = smileysplit[2];
				td[std].innerHTML = td[std].innerHTML + '<a style="line-height: 20px;" onclick="insert_text(\'[img-r='+height+']'+surl+'[/img-r]\', true); return false;" href="#"><img style="max-width: 185px;" vspace="2" hspace="2" height="'+height+'px" src="'+surl+'"/></a>   ';
		}
	}

	td[std].innerHTML = td[std].innerHTML + '<br /><a class="postlink" href="../index.php?a=smileys&d=view">Voeg je eigen smiley\'s toe!</a>';

	var send = document.getElementsByClassName ('btnmain');
	var voorbeeld = document.getElementsByClassName ('btnlite');

	send[0].addEventListener("click", function() { var postcontent = document.getElementsByTagName ('textarea'); postcontent[0].value = postcontent[0].value.replace(/:angel:/g, '[img]http://img188.imageshack.us/img188/1760/iconangelc.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:clap:/g, '[img]http://img509.imageshack.us/img509/4575/iconclap.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:confused:/g, '[img]http://img192.imageshack.us/img192/2935/iconconfusedj.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:crazy:/g, '[img]NOIMAGEHERE[/img]');   postcontent[0].value = postcontent[0].value.replace(/:hu:/g, '[img]http://img192.imageshack.us/img192/5599/iconeh.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:lolno:/g, '[img]http://img694.imageshack.us/img694/7327/iconlolno.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:-.-:/g, '[img]http://img196.imageshack.us/img196/9127/iconproblem.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:ssst:/g, '[img]http://img199.imageshack.us/img199/5817/iconshh.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:shifty:/g, '[img]http://img188.imageshack.us/img188/1631/iconshifty.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:sick:/g, '[img]http://img199.imageshack.us/img199/8459/iconsick.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:silent:/g, '[img]http://img509.imageshack.us/img509/6984/iconsilent.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:think:/g, '[img]http://img696.imageshack.us/img696/6706/iconthink.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:thumbup:/g, '[img]http://img694.imageshack.us/img694/670/iconthumbup.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:thumbdown:/g, '[img]http://img192.imageshack.us/img192/9202/iconthumbdown.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:wave:/g, '[img]http://img196.imageshack.us/img196/723/iconwave.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:wtf:/g, '[img]http://img694.imageshack.us/img694/6393/iconwtf.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:sleepy:/g, '[img]http://img509.imageshack.us/img509/3307/iconyawn.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:eyebleed:/g, '[img]http://img192.imageshack.us/img192/6470/iconeyebleed.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:lecture:/g, '[img]http://img188.imageshack.us/img188/5931/iconlecture.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:ninja:/g, '[img]http://img196.imageshack.us/img196/4949/iconninja.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:yes:/g, '[img]http://img188.imageshack.us/img188/4269/iconyesi.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:no:/g, '[img]http://img696.imageshack.us/img696/1885/iconno.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:shake:/g, '[img]http://img694.imageshack.us/img694/9205/iconshake.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:alien:/g, '[img]http://img64.imageshack.us/img64/3865/iconalien.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/xD/g, '[img]http://img64.imageshack.us/img64/8797/iconxd.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:thefinger:/g, '[img]http://img197.imageshack.us/img197/3280/iconthefinger.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:clown:/g, '[img]http://img696.imageshack.us/img696/2760/iconclown.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/_o-/g, '[img]http://img199.imageshack.us/img199/1603/iconhaha.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/_o_/g, '[img]http://img509.imageshack.us/img509/7176/iconworshippy.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:suprised:/g, '[img]http://img188.imageshack.us/img188/3143/iconsurprisedd.gif[/img]');}, false);

	voorbeeld[1].addEventListener("click", function() { var postcontent = document.getElementsByTagName ('textarea'); postcontent[0].value = postcontent[0].value.replace(/:angel:/g, '[img]http://img188.imageshack.us/img188/1760/iconangelc.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:clap:/g, '[img]http://img509.imageshack.us/img509/4575/iconclap.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:confused:/g, '[img]http://img192.imageshack.us/img192/2935/iconconfusedj.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:crazy:/g, '[img]NOIMAGEHERE[/img]');   postcontent[0].value = postcontent[0].value.replace(/:hu:/g, '[img]http://img192.imageshack.us/img192/5599/iconeh.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:lolno:/g, '[img]http://img694.imageshack.us/img694/7327/iconlolno.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:-.-:/g, '[img]http://img196.imageshack.us/img196/9127/iconproblem.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:ssst:/g, '[img]http://img199.imageshack.us/img199/5817/iconshh.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:shifty:/g, '[img]http://img188.imageshack.us/img188/1631/iconshifty.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:sick:/g, '[img]http://img199.imageshack.us/img199/8459/iconsick.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:silent:/g, '[img]http://img509.imageshack.us/img509/6984/iconsilent.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:think:/g, '[img]http://img696.imageshack.us/img696/6706/iconthink.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:thumbup:/g, '[img]http://img694.imageshack.us/img694/670/iconthumbup.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:thumbdown:/g, '[img]http://img192.imageshack.us/img192/9202/iconthumbdown.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:wave:/g, '[img]http://img196.imageshack.us/img196/723/iconwave.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:wtf:/g, '[img]http://img694.imageshack.us/img694/6393/iconwtf.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:sleepy:/g, '[img]http://img509.imageshack.us/img509/3307/iconyawn.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:eyebleed:/g, '[img]http://img192.imageshack.us/img192/6470/iconeyebleed.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:lecture:/g, '[img]http://img188.imageshack.us/img188/5931/iconlecture.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:ninja:/g, '[img]http://img196.imageshack.us/img196/4949/iconninja.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:yes:/g, '[img]http://img188.imageshack.us/img188/4269/iconyesi.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:no:/g, '[img]http://img696.imageshack.us/img696/1885/iconno.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:shake:/g, '[img]http://img694.imageshack.us/img694/9205/iconshake.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:alien:/g, '[img]http://img64.imageshack.us/img64/3865/iconalien.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/xD/g, '[img]http://img64.imageshack.us/img64/8797/iconxd.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:thefinger:/g, '[img]http://img197.imageshack.us/img197/3280/iconthefinger.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:clown:/g, '[img]http://img696.imageshack.us/img696/2760/iconclown.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/_o-/g, '[img]http://img199.imageshack.us/img199/1603/iconhaha.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/_o_/g, '[img]http://img509.imageshack.us/img509/7176/iconworshippy.gif[/img]');   postcontent[0].value = postcontent[0].value.replace(/:suprised:/g, '[img]http://img188.imageshack.us/img188/3143/iconsurprisedd.gif[/img]');}, false);

}