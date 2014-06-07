// ==UserScript==
// @name           hamletScript
// @namespace      http://taguri.org/
// @include        http://www.hamlet.ro/musor.php?szinhaz=4*
// @include        http://www.hamlet.ro/musor.php?szinhaz=11*
// @resource darabok http://pandageci.freewebsitehosting.com/darabok.txt
// ==/UserScript==
var monthHU = new Array("", "Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December");
var darabokStr = GM_getResourceText("darabok");
ParseString(darabokStr);
var allAnchorTags=document.getElementsByTagName("a");
for (i=0; i<allAnchorTags.length; i++){
	if(Contains(allAnchorTags[i].innerHTML))
	{
		allAnchorTags[i].parentNode.parentNode.style.backgroundColor = 'lime';
	}
	else if(CheckCurrent(window.location.href))
	{
		if(allAnchorTags[i].href.indexOf("eloadas.php?id=") != -1)
		{
			var all = allAnchorTags[i].parentNode.parentNode.innerHTML;
			var day = all.split(".")[0];
			day = day.split(" ")[1];
			if(day < new Date().getDate())
			{
				allAnchorTags[i].parentNode.parentNode.style.backgroundColor = '#AAAAAA';
			}
			else
			{
				allAnchorTags[i].parentNode.parentNode.style.backgroundColor = '#FFFF00';
			}
		}
	}
	else
	{
		if(allAnchorTags[i].href.indexOf("eloadas.php?id=") != -1)
		{
			allAnchorTags[i].parentNode.parentNode.style.backgroundColor = '#AAAAAA';
		}
	}
}
function GetYear(link){
	var year = link.split("ev=")[1];
	return year;
}
function GetMonth(link){
	var month = link.split("ho=")[1];
	return month.split("&")[0];
}
function CheckCurrent(link){
	//alert(GetYear(link) == new Date().getFullYear())
	return ((GetYear(link) == new Date().getFullYear()) && (monthHU[GetMonth(link)] == monthHU[new Date().getMonth() + 1]));
}
function Contains(cime){
	var i = Darabok.length;
    while (i--)
	{
        if (Darabok[i] == cime)
		{
            return true;
        }
    }
    return false;
}
function ParseString(parseString){
	var darab = parseString.split("\n");
	for(i=0;i<darab.length;i++)
	{
		Darabok[i] = darab[i];
	}
}