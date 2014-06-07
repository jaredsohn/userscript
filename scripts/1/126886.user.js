// ==UserScript==
// @name newhideinfofromhitta
// @include http://www.hitta.se*
// ==/UserScript==

//byter ut specifika ord eller meningar
function replaceAddresses(place, word, newWord, where)
{
	var doReplace = document.getElementsByClassName(place)[where].innerHTML;
	document.getElementsByClassName(place)[where].innerHTML = doReplace.replace(word, newWord);

}

//tar bort specifika ord eller meningar
function removeAddresses(place, word)
{
	var doReplace = document.getElementsByClassName(place)[0].innerHTML;
	document.getElementsByClassName(place)[0].innerHTML = doReplace.replace(word, "");

}


function removeStrings(place, word)
{
	var infono = document.getElementsByClassName(place)[0];

	if(infono.innerHTML.search(word) != -1){


		var runlength = infono.getElementsByTagName('div');

		for(var i = 0; i < runlength.length; i++){

			if(runlength[i].innerHTML.search(word) != -1){
				runlength[i].parentNode.innerHTML = "";
			}
		}
	}
}


function removeSpaces(string)
{
	return string.replace(/\ /g,"");
}


if(document.getElementsByClassName("homepage")[0])
{
	removeAddresses("detail-content",'<h3>Hemsida</h3>');
}

if(document.getElementsByClassName("email")[0])
{
	var kiddie = document.getElementsByClassName("email")[0];
	kiddie.parentNode.removeChild(kiddie);
}

if(document.getElementsByClassName("info-list")[0])
{
	var namn = document.getElementsByClassName("details-header")[0].childNodes[1].innerHTML;
	var utbyter = document.getElementsByClassName("info-list")[0].innerHTML;
	document.getElementsByClassName("info-list")[0].innerHTML = namn + utbyter;
}


if(document.getElementsByClassName('detail-content')[0].innerHTML.search('Adress') != -1)
{
	for(var i = 0; i < document.getElementsByClassName('detail-content')[0].innerHTML.search('Adress'); i++)
	{
		removeAddresses("detail-content",'<h3>Adress</h3>');
	}
}else{
if(document.getElementsByClassName('detail-content')[0].innerHTML.search('Besöksadress') != -1)
{
	removeAddresses("detail-content",'<h3>Besöksadress</h3>');
}
}
if(document.getElementsByClassName('detail-content')[0].innerHTML.search('Postadress') != -1)
{
	removeAddresses("detail-content",'<h3>Postadress</h3>');
}

if(document.getElementsByClassName("link-container no-print")[0])
{
	document.getElementsByClassName("link-container no-print")[0].innerHTML = "";
}
if(document.getElementsByClassName("agentpartner")[0])
{
	document.getElementsByClassName("agentpartner")[0].innerHTML = "";
}
removeStrings('detail-content',/Ändra uppgifter/);
removeStrings('detail-content',/Telefax:/);


//gör nummer ringbara

if(document.getElementsByClassName("phone-container")[0])
{
	for(var i = 0; i < document.getElementsByClassName("phone-container").length; i++){
		var telefonNummer = document.getElementsByClassName("phone-container")[i].childNodes[3].innerHTML;
		telefonNummer = removeSpaces(telefonNummer);
		document.getElementsByClassName("phone-container")[i].childNodes[3].innerHTML = telefonNummer;
		replaceAddresses("phone-container",'<h2>','<a href="callto:' + telefonNummer + '">',i);
		replaceAddresses("phone-container",'</h2>','</a>',i);
	}
}
if(document.getElementsByClassName("phone")[0])
{
	for(var i = 0; i < document.getElementsByClassName("phone").length; i++){
		var telefonNummer = document.getElementsByClassName("phone")[i].childNodes[3].innerHTML;
		telefonNummer = removeSpaces(telefonNummer);
		document.getElementsByClassName("phone")[i].childNodes[3].innerHTML = telefonNummer;
		replaceAddresses("phone",'<h2>','<a href="callto:' + telefonNummer + '">',i);
		replaceAddresses("phone",'</h2>','</a>',i);
	}
}
if(document.getElementsByClassName("mixed-header")[0])
{
	if(document.getElementsByClassName("phone")[0])
	{
	alert(document.getElementsByClassName("phone").length);
		for(var i = 0; i < document.getElementsByClassName("phone").length; i++){
			var telefonNummer = document.getElementsByClassName("phone")[i].childNodes[1].innerHTML;
			telefonNummer = removeSpaces(telefonNummer);
			document.getElementsByClassName("phone")[i].childNodes[1].innerHTML = telefonNummer;
			replaceAddresses("phone",'<h2>','<a href="callto:' + telefonNummer + '">',i);
			replaceAddresses("phone",'</h2>','</a>',i);
		}
	}
}	