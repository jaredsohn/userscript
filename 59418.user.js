// ==UserScript==
// @name           Goalll Extended: Only Avatars
// @namespace      Made by X_choice
// @description    Goalll Extended: Only Avatars voegt alléén de avatars aan Goalll!
// @version        1.0.1
// @include        http://*goalll.nl*
// ==/UserScript==

//Get the parameters from the url.
//eg. ?a=manager -> param['a'] = manager
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
// Check if user is on the forum
var forumcheck = spliturl[0].split('/');
var forumcheck = forumcheck[3];
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
var hostimage = 'on';
}
if (hostimage == 'on')
{
div[a].innerHTML = '<a href="?a=avatar"><img width="90px" height="90px" src="http://goalllextended.host22.com/upload/imgview.php?avatar='+username+'&hostimage=on&cavatar='+cavatar+'" /></a>';
}
else
{
div[a].innerHTML = '<a href="?a=avatar"><img width="90px" height="90px" src="http://goalllextended.host22.com/upload/imgview.php?avatar='+username+'&hostimage=off&cavatar='+cavatar+'" /></a>';
}
}
// Sidebar edit (and check if there is a newer version)
if (forumcheck != 'forum')
{
var sidebar = document.getElementById ('side_bar');
sidebar.innerHTML = sidebar.innerHTML + '<div style="padding-top: 25px; padding-left: 7px;"><a href="../index.php?a=over-goalll-extended"><center><small>Goalll Extended: Only Avatars<br />Versie 1.0.1</small></center><a>'
GM_xmlhttpRequest({
method: 'GET',
url: 'http://goalllextended.host22.com/versionoa.html',
headers:
{
'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
'Accept': 'text/html',
},
onload: function(responseDetails)
{
var recentversion = responseDetails.responseText;
var recentversion = recentversion.split ('<!--');
var recentversion = recentversion[0];
var sidebar = document.getElementById ('side_bar');
if (recentversion > 101)
{
sidebar.innerHTML = sidebar.innerHTML + '<div><a href="../forum/viewtopic.php?f=9&t=6000" style="color: red;" class="redlink"><small><b><center>Er is een nieuwe versie beschikbaar!</center></b></small></a></div>';
}
}
});
}

switch(param['a'])
{
	case "over-goalll-extended":
		var titel = document.getElementsByTagName ('h2');
		titel[0].innerHTML = 'Over Goalll Extended: Only Avatars';
		var content = document.getElementsByClassName ('white_bg white_bg_content')
		content[0].innerHTML = '<img src="http://i29.tinypic.com/10ok70j.png" ondblclick="javascript:window.location.href = \''+spliturl[0]+'?a=goalll-extended\';" style="float:left;"><b>Over Goalll Extended</b><br />Goalll Extended is een project van <a href="http://www.goalll.nl/index.php?a=manager&user_id=476">X_choice</a> en voorheen <a href="http://www.goalll.nl/index.php?a=manager&user_id=17">ssmm987</a>. Goalll Extended: Only avatars voegt avatars zonder BA toe aan Goalll. Ik bedank iedereen die aan dit project heeft meegeholpen d.m.v. ideeën, feedback, scripten of iets anders.<br /><br /><b>Bugs, tips, ideeën, vragen etc.?</b><br />Al het feedback kan in het topic op het <a href="./index.php?a=forum">Goalll forum</a> die <a href="./forum/viewtopic.php?f=9&t=4981">hier</a> te vinden is.<br /><br /><b>Uitbreidingen die momenteel in Goall Extended zitten</b><br /><s>* Spelers die je later wilt kopen kan je op je verlanglijst zetten</s><br /><s>* Je kan meerdere PM\'s in 1 keer verwijderen</s><br /><s>* Er wordt om bevestiging gevraagd bij het verwijderen van een bericht / het accepteren en weigeren van een oefenwedstrijd / het accepteren en weigeren van een bod</s><br /><s>* Het forumprofiel kan bereikt worden via een link onder elke gebruikersnaam</s><br /><s>* Je kan een in een keer een PM sturen door een link op het forum</s><br /><s>* Er wordt een rekentabel voor het loon van je personeel weergegeven <small>(Momenteel alleen voor het hoofdteam)</small></s><br /><s>* Spellenlijst</s><br /><s>* Op elke pagina wordt een favicon weergegeven</s><br /><s>* De paginatitel/topictitel wordt weergegeven in de titel van de pagina</s><br /><s>* Op het forum wordt rechtsboven het aantal privé berichten weergegeven</s><br /><s>* Je kan via een link op elke forumpagina direct naar het uitgebreid zoeken en de online leden gaan</s><br /><s>* Met het scouten kan je nu als niet BA ook sorteren op waarde, moraal en fitheid, en je kan gebleseerde spelers filteren</s><br />* Je kan nu ook een avatar instellen zonder BA<br /><i><s>Ik werk altijd aan nieuwe uitbreidingen, toevoegingen etc.</s></i><br /><br /><b>Updaten</b><br />Als er een nieuwe update is van Goalll Extended: Only Avatars, zie je dit in de zijbalk van elke Goalll pagina. Er zal aanvullende informatie worden geplaatst in het <a href="./forum/viewtopic.php?f=9&t=4981">discussietopic</a> op het <a href="./index.php?a=forum">Goalll forum</a>. Updaten kan helaas niet automatisch, dus je moet naar de <a href="http://userscripts.org/scripts/show/59418">installatiepagina</a> van Goalll Extended: Only Avatars gaan, en daar het script opnieuw installeren door op de groene knop \'Install\' te klikken. Dan opent er een scherm met een lijstje met url\'s. Klik onderaan nog een keer op \'Install\', en Goalll Extended: Only Avatars is geupdate!';
	break;
	case "avatar":
		var username = document.getElementById ('side_bar');
		var username = username.innerHTML;
		var username = username.split('index.php">');
		var username = username[1].split('</a>');
		var username = username[0];
		var titel = document.getElementsByTagName ('h2');
		titel[0].innerHTML = 'Avatar';
		var content = document.getElementsByClassName ('white_bg white_bg_content')
		content[0].innerHTML = 'Upload hier je avatar voor Goalll. De avatar zal helaas alleen zichtbaar zijn voor mensen die ook Goalll Extended hebben.<br />Je avatar zal worden verkleint tot 90 bij 90 pixels, maar het zal handig zijn als jij dit al doet. De maximale grootte voor je avatar is 150 kB. Je kan gif, png en jpg. Misbruik wordt niet getolereerd.<br /><br /><form method="post" action="http://goalllextended.host22.com/upload/upload.php" enctype="multipart/form-data"><input type="file" name="bestand"><br><input type="text" style="display: none;" name="naam" value="'+username+'"><br><input type="submit" name="upload" value="Uploaden"></form>';
	break;
	default:
}

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
			var modcheck = td[i].innerHTML;
			var modcheck = modcheck.split('postauthor"');
			var modcheck = modcheck[1].split('</b>');
			var modcheck = modcheck[0];
			if (modcheck[18] == '(')
			{
				var n = i+5;
				var p = p+4+i;
				var mod = 'yes';
			}
			else
			{
				var n = i+4;
				var p = p+3+i;
				var mod = 'no';
			}
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
			
			if (mod == 'yes')
			{
				td[p].innerHTML = td[p].innerHTML + '<br /><img width="90px" height="90px" src="http://goalllextended.host22.com/upload/imgview.php?avatar='+username+'&hostimage=on&cavatar='+cavatar+'" />';
			}
			else
			{
				td[p].innerHTML = '<img width="90px" height="90px" src="http://goalllextended.host22.com/upload/imgview.php?avatar='+username+'&hostimage=off&cavatar='+cavatar+'" />' + td[p].innerHTML;
			}
		}
	}
}