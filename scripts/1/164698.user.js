// ==UserScript==
// @name        Beschwerden
// @namespace   PaveLow45
// @description Beschwerdenbeantworter für John_Hunter
// @include     *rpg-city.de/index.php?page=Thread&threadID=*
// @version     1
// ==/UserScript==

var name = document.getElementById("userNote").getElementsByTagName("a")[0].innerHTML;

var threads = [
	["", ""],
	["Angenommen", "Sehr geehrte Damen und Herren, \n \nich muss Ihnen mitteilen, dass Ihre Beschwerde angenommen wird. \n \n[b][u]Erläuterung[/u][/b] \n \n \n[b][u]Sanktionen[/u][/b] \n \n \nMit freundlichen Grüßen, \n"+name+", Deputy Director"],
	["Abgewiesen", "Sehr geehrte Damen und Herren, \n \nich muss Ihnen mitteilen, dass Ihre Beschwerde abgewiesen wird. \n \n[b][u]Erläuterung[/u][/b] \n \n \nMit freundlichen Grüßen, \n"+name+", Deputy Director"],
];

if(document.URL.search(/page=Thread/) != -1)
{
	var forum1 = document.getElementById("main").getElementsByTagName("ul")[0].getElementsByTagName("span")[2].innerHTML;
	var forum2 = document.getElementById("main").getElementsByTagName("ul")[0].getElementsByTagName("span")[3].innerHTML;
	if(forum1 == "Federal Bureau of Investigation")
	{
		if(forum2 == "Beschwerden")
		{
			var select = document.createElement("select");
			var option;
			for(var i=0;i < threads.length;i++)
			{
			  option = document.createElement("option"); 
			  option.innerHTML = threads[i][0];
			  option.value = threads[i][1];
			  select.appendChild(option);
			}
			select.setAttribute("style", "margin-right:15px;");
			select.setAttribute("onchange", "document.getElementsByName('text')[0].value = this.getElementsByTagName('option')[this.selectedIndex].value;");
			document.getElementsByClassName("formSubmit hidden")[0].appendChild(select);
		}
	} 
}