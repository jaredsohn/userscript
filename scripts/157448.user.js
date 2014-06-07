// ==UserScript==
// @name        Supporter Hilfe
// @namespace   PaveLow45
// @include     *rpg-city.de/*
// @version     1
// @grant
// ==/UserScript==

var name = document.getElementsByClassName("headlineContainer")[0].getElementsByTagName("a")[0].innerHTML;
var aname = document.getElementById("userNote").getElementsByTagName("a")[0].innerHTML;

document.getElementById("userNote").getElementsByTagName("a")[0].href.search(/(\d+)$/);
var userlink = RegExp.$1;
var link = "http://rpg-city.de/index.php?form=PMNew&userID="+userlink+"";

var threads = [
	["", ""],
	["Abgeschlossen", "Guten Tag,\nda das Thema '[b][url="+document.URL+"]"+name+"[/url][/b]' abgeschlossen ist, werde ich es nun schließen.\n\nFalls Sie Fragen zu diesem Thema haben, wenden Sie sich per [b][url="+link+"]Nachricht[/url][/b] an mich.\n\nViele Grüße,\n"+aname+"\n[i]Supporter[/i]"],
	["Bewerbungen ins CP", "Guten Tag,\nBewerbungen kommen ins [b][url=cp.rpg-city.de]Control Panel[/url][/b].\nBeachten Sie dort die Vorraussetzungen und bewerben Sie sich dann unter Fraktionen.\n\nFalls Sie Fragen zu diesem Thema haben, wenden Sie sich per [b][url="+link+"]Nachricht[/url][/b] an mich.\n\nViele Grüße,\n"+aname+"\n[i]Supporter[/i]"],
	["Vorschläge geschlossen", "Guten Tag,\ndas Vorschlagsforum ist derzeit geschlossen, aus diesem Grund können derzeit keine Vorschläge eingereicht werden.\n\nAus diesem Grund werde ich das Thema nun schließen.\nFalls Sie Fragen zu diesem Thema haben, wenden Sie sich per [b][url="+link+"]Nachricht[/url][/b] an mich.\n\nViele Grüße,\n"+aname+"\n[i]Supporter[/i]"],
	["Private Nachricht", "Guten Tag,\nda im Thema '[b][url="+document.URL+"]"+name+"[/url][/b]', in diesem Fall eine private Nachricht an den Benutzer gereicht hätte, werde ich das Thema nun schließen.\n\nFalls Sie Fragen zu diesem Thema haben, wenden Sie sich per [b][url="+link+"]Nachricht[/url][/b] an mich.\n\nViele Grüße,\n"+aname+"\n[i]Supporter[/i]"],
	["", "Guten Tag,\nda im Thema '[b][url="+document.URL+"]"+name+"[/url][/b]', zur Zeit nur noch gespamt wird oder nur noch das gleiche von den Benutzern kommt, werde ich das Thema nun schließen.\n\nFalls Sie Fragen zu diesem Thema haben, wenden Sie sich per [b][url="+link+"]Nachricht[/url][/b] an mich.\n\nViele Grüße,\n"+aname+"\n[i]Supporter[/i]"]
];

var bforum = [
	["", ""],
	["Abgeschlossen", "Guten Tag,\nda das Thema '[b][url="+document.URL+"]"+name+"[/url][/b]' abgeschlossen ist, werde ich es nun schließen.\n\nFalls Sie Fragen zu diesem Thema haben, wenden Sie sich per [b][url="+link+"]Nachricht[/url][/b] an mich.\n\nViele Grüße,\n"+aname+"\n[i]Supporter[/i]"],
	["Angenommen", "Guten Tag,\nich freue mich ihnen mitzuteilen, das ihr Entbannantrag angenommen wurde.\n\nDer Entbann folgt innerhalb von 96 Stunden, falls Sie fragen zu diesem Thema haben, wenden Sie sich bitte per [b][url="+link+"]Nachricht[/url][/b] an mich.\n\nViele Grüße,\n"+aname+"\n[i]Supporter[/i]"],
	["Abgelehnt", "Guten Tag,\nich muss ihnen mitteilen, das ihr Entbannantrag abgelehnt wird.\n\nSie dürfen sich allerdings, gerne einen neuen Account erstellen - wenn Sie sich diesesmal an das [b][url=http://rpg-city.de/index.php?page=Rules]Regelwerk[/url][/b] halten.\nFalls Sie Fragen zu diesem Thema haben, wenden Sie sich per [b][url="+link+"]Nachricht[/url][/b] an mich.\n\nViele Grüße,\n"+aname+"\n[i]Supporter[/i]"],
	["Hacker", "Guten Tag,\nHacker werden nicht entbannt. Aus diesem Grund werde ich ihren Antrag ablehnen.\n\nSie dürfen sich gerne einen neuen Account erstellen.\nFalls Sie Fragen zu diesem Thema haben, wenden Sie sich per [b][url="+link+"]Nachricht[/url][/b] an mich.\n\nViele Grüße,\n"+aname+"\n[i]Supporter[/i]"],
	["An die Vorlage halten", "Gutgen Tag,\nSie müssen sich bei einem Entbannantrag an die [b][url=http://rpg-city.de/index.php?page=Thread&threadID=8845]Vorlage[/url][/b] halten damit ihr Entbannantrag bearbeitet wird.\n\nFalls bei Ihnen nur steht 'You are banned from this Server', befolgen Sie diese [b][url=http://rpg-city.de/index.php?page=Thread&threadID=8857]Anleitung[/url].[/b]\nFalls Sie Fragen zu diesem Thema haben, wenden Sie sich per [b][url="+link+"]Nachricht[/url][/b] an mich.\n\nViele Grüße,\n"+aname+"\n[i]Supporter[/i]"]
];

if(document.URL.search(/page=Thread/) != -1)
{
	var forum = document.getElementById("main").getElementsByTagName("ul")[0].getElementsByTagName("span")[2].innerHTML;
	if(forum == "Bann Forum")
	{
		var select = document.createElement("select");
		var option;
		for(var i=0;i<bforum.length;i++)
		{
		  option = document.createElement("option"); 
		  option.innerHTML = bforum[i][0];
		  option.value = bforum[i][1];
		  select.appendChild(option);
		}
		select.setAttribute("style", "margin-right:15px;");
		select.setAttribute("onchange", "document.getElementsByName('text')[0].value = this.getElementsByTagName('option')[this.selectedIndex].value;");
		document.getElementsByClassName("formSubmit hidden")[0].appendChild(select);
	} 
	else
	{
		var select = document.createElement("select");
		var option;
		for(var i=0;i<threads.length;i++)
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