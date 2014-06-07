// ==UserScript==
// @name hideinfofromhitta
// @include http://www.hitta.se/ViewDetail*
// @include http://www.hitta.se/SearchMixed*
// @include http://www.hitta.se/SearchPink*
// ==/UserScript==

/*
var a = document.getElementById('ContentWhite').innerHTML;
document.getElementById('Header').innerHTML = '<table><tr><td>'+a+'</td></tr></table>';

*/

function removeStrings(place, word)
{
	var infono = document.getElementById(place);

	if(infono.innerHTML.search(word) != -1){


		var runlength = infono.getElementsByTagName('div');

		for(var i = 0; i < runlength.length; i++){

			if(runlength[i].innerHTML.search(word) != -1){
				runlength[i].innerHTML = "";
			}
		}
	}
}
function removeType(place, word)
{
	alert('den körs');

	var doRemove = document.getElementsByTagName(word);
	var childNodesen = document.getElementsByClassName(place);

	for(var i = 0; i < childNodesen.length; i++)
	{
		var findWord = childNodesen[i];
		for(var i = 0; i < findWord.doRemove.length; i++)
		{
			alert(findWord.doRemove[i]);
			findWord.innerHTML = doRemove[i].replace(word, "");
		}
	}	
alert('den avslutas');
}
function removeAddresses(place, word)
{
var doReplace = document.getElementById(place).innerHTML;
document.getElementById(place).innerHTML = doReplace.replace(word, "");

}


if (document.getElementsByClassName('companydetailsright')[0]){
	var oldinfo;
	var newinfo;

	var left = document.getElementsByClassName('companydetailsright');
	var right = document.getElementsByClassName('companydetailsleft');
	right = right[0];
	left = left[0];

	oldinfo = left.innerHTML;
	newinfo = right.innerHTML;	

	right.innerHTML = oldinfo;
	left.innerHTML = newinfo;

	right.removeAttribute('style');
	right.style.cssFloat = 'left';
	left.style.cssFloat = 'left';

	left.style.width = '260px';
	right.style.width = '320px';

	left.style.minHeight = right.offsetHeight;
	left.style.paddingBottom = '30px';

	var header = document.getElementsByClassName('LeftHeader')[0];
	left.innerHTML = '<table><tr><td id="informationen" width="260">' + header.innerHTML + left.innerHTML + '</td></tr><tr><td id="emailno1"></td></tr></table>';
	header.innerHTML = '';

if(document.getElementById('UCDP_PanelURLEmail')){
 var email = document.getElementById('UCDP_PanelURLEmail').innerHTML;
document.getElementById('UCDP_PanelURLEmail').innerHTML = '';
document.getElementById('emailno1').innerHTML = email;
}

// ta bort FAX
removeStrings("informationen",/Telefax/);
removeStrings("informationen", /Butik p\å blocket\.se/);
removeType('companydetailsleft', 'a');

// ta bort ordet besoksadress
if(document.getElementById('informationen').innerHTML.search('Besöksadress') != -1){
removeAddresses("informationen",'<strong>Besöksadress</strong><br>');
}
if(document.getElementById('informationen').innerHTML.search('Utdelningsadress') != -1){
removeAddresses("informationen", '<br><strong>Utdelningsadress</strong><br>');
}else{
removeAddresses("informationen", '<strong>Adress</strong><br>');
if(document.getElementById('informationen').innerHTML.search(/Adress saknas/) != -1){
removeStrings('informationen', /Adress saknas/);
}
}


}



if(document.getElementsByClassName('HolderWhite')[0]){


	var header = document.getElementsByClassName('LeftHeader')[0];
	document.getElementById('ContentWhite').innerHTML = header.innerHTML + document.getElementById('ContentWhite').innerHTML;
	document.getElementById('Header').parentNode.removeChild(document.getElementById('Header'));

removeStrings("UCDW_panelWhiteInfo", /E\-post\:/);

if(document.getElementById('ContentWhite').innerHTML.search('Adress') != -1){
removeAddresses('ContentWhite', '<strong>Adress</strong><br>');
}
if(document.getElementById('ContentWhite').innerHTML.search(/Adress saknas/) != -1){
removeStrings('UCDW_panelWhiteInfo', /Adress saknas/);
}


if(document.getElementsByClassName('mappoint')[0]){
	document.getElementsByClassName('mappoint')[0].style.display = 'none';
}
	for(var i = 0; i < 2; i++)
	{
		var string = document.getElementById('ContentWhite').innerHTML;
		document.getElementById('ContentWhite').innerHTML = string.replace(/Visa\w{0,1} på karta/, '');
	}

	for(var i = 0; i < 2; i++)
	{
		var string = document.getElementById('ContentWhite').innerHTML;
		document.getElementById('ContentWhite').innerHTML = string.replace('hitta hit', '');
	}

	for(var i = 0; i < 10; i++)
	{
		var string = document.getElementById('ContentWhite').innerHTML;
		document.getElementById('ContentWhite').innerHTML = string.replace('vCard', '');
	}
	
	for(var i = 0; i < document.getElementsByClassName('bullet').length; i++)
	{
		document.getElementsByClassName('bullet')[i].innerHTML = '';
	}
}
if(document.getElementsByClassName('infoPrioImage')[0]){
	for(var i = 0; i < document.getElementsByClassName('infoPrioImage').length; i + 1){
		document.getElementsByClassName('infoPrioImage')[i].parentNode.removeChild(document.getElementsByClassName('infoPrioImage')[i]);
	}
}

for(var i = 0; i < document.getElementsByTagName('img').length; i++){
if(document.getElementsByTagName('img')[i].src == "http://www.hitta.se/images/posten_foretag_liten.png"){
document.getElementsByTagName('img')[i].alt = "";
}
}

if(document.getElementsByClassName('RightHeader noPrint')[0]){
document.getElementsByClassName('RightHeader noPrint')[0].style.display = 'none';
}



