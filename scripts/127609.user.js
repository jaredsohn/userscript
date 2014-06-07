// ==UserScript==
// @name mixedSearch
// @include http://www.hitta.se*
// ==/UserScript==

//byter ut specifika ord eller meningar
function replaceAddresses(place, word, newWord, where)
{
	var doReplace = document.getElementsByClassName(place)[where].innerHTML;
	document.getElementsByClassName(place)[where].innerHTML = doReplace.replace(word, newWord);

}


function removeSpaces(string)
{
	return string.replace(/\ /g,"");
}

if(document.getElementsByClassName("mixed-header")[0])
{
	if(document.getElementsByClassName("phone")[0])
	{
		for(var i = 0; i < document.getElementsByClassName("phone").length; i++)
		{
			var telefonNummer = document.getElementsByClassName("phone")[i].innerHTML;
			telefonNummer = removeSpaces(telefonNummer);
			document.getElementsByClassName("phone")[i].innerHTML = '<a href="callto:' + telefonNummer + '">' + telefonNummer + '</a>';
		}
	}
	
	
	
	
	if(document.getElementsByClassName("mobile")[0])
	{
		for(var i = 0; i < document.getElementsByClassName("mobile").length; i++)
		{
			var telefonNummer1 = document.getElementsByClassName("mobile")[i].innerHTML;
			telefonNummer1 = removeSpaces(telefonNummer1);
			document.getElementsByClassName("mobile")[i].innerHTML = '<a href="callto:' + telefonNummer1 + '">' + telefonNummer1 + '</a>';
		}
	}
}	
if(document.getElementsByClassName("mixed-header")[0])
{
	if(document.getElementsByClassName("item")[0])
	{
		for(var i = 0; i < document.getElementsByClassName("item").length; i++){
		document.getElementsByClassName("item")[i].innerHTML = '<table><tr><td style="width:270px;">' + document.getElementsByClassName("item")[i].innerHTML + "</td></tr></table>";
		}
	}
}


if(document.getElementsByClassName("name-and-phone")[0])
{
	for(var i = 0; i < document.getElementsByClassName("name-and-phone").length; i++){
	document.getElementsByClassName("name-and-phone")[i].parentNode.innerHTML = '<table><tr><td>' + document.getElementsByClassName("name-and-phone")[i].parentNode.innerHTML + "</td></tr></table>";
	}
	if(document.getElementsByClassName("mobile")[0])
	{
		for(var i = 0; i < document.getElementsByClassName("mobile").length; i++)
		{
			var telefonNummer1 = document.getElementsByClassName("mobile")[i].innerHTML;
			telefonNummer1 = removeSpaces(telefonNummer1);
			document.getElementsByClassName("mobile")[i].innerHTML = '<a href="callto:' + telefonNummer1 + '">' + telefonNummer1 + '</a>';
		}
	}
	if(document.getElementsByClassName("alternate-company-result")[0] == undefined ){
		if(document.getElementsByClassName("phone")[0]||document.getElementsByClassName("mobile")[0])
		{
			for(var i = 0; i < document.getElementsByClassName("phone").length; i++)
			{
				var telefonNummer = document.getElementsByClassName("phone")[i].innerHTML;
				telefonNummer = removeSpaces(telefonNummer);
				document.getElementsByClassName("phone")[i].innerHTML = '<a href="callto:' + telefonNummer + '">' + telefonNummer + '</a>';
			}
		}
		
		else
		{
					
			for(var k = 0; k < document.getElementsByClassName("name-and-phone").length; k++)
			{
				var introHeader = document.getElementsByClassName("name-and-phone")[k];
				
			
				for(var j = 0; j < introHeader.getElementsByTagName("div").length; j++)
				{
					 var newNumber = introHeader.getElementsByTagName("div")[j].innerHTML;
					 newNumber = removeSpaces(newNumber);
					 introHeader.getElementsByTagName("div")[j].innerHTML = '<a href="callto:' + newNumber + '">' + newNumber + '</a>';
				}
			
			}
		}	
	}
}
	