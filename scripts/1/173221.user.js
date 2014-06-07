// ==UserScript==
// @name        Beschwerden für MyPod
// @namespace   PaveLow45
// @include     *rpg-city.de/index.php?page=Thread*
// @version     1
// ==/UserScript==

var threads = [
	["", ""],
	["Abgelehnt: Wanteds", "Guten Tag, \n \ndie Beschwerde wird [color=#ff0000]#Abgelehnt[/color], da die Wanteds berechtigt sind. \n \nMit freundlichen Grüßen, \nMyPod \nPolizeihauptkommissar \n \n@Matthew: "],
	["Abgelehnt: Punkte", "Guten Tag, \n \ndie Beschwerde wird [color=#ff0000]#Abgelehnt[/color], da die Punkte berechtigt sind. \n \nMit freundlichen Grüßen, \nMyPod \nPolizeihauptkommissar \n \n@Matthew: "],
	["Abgelehnt: Regelverstoß", "Guten Tag, \n \ndie Beschwerde wird [color=#ff0000]#Abgelehnt[/color], da kein Regelverstoß vorliegt. \n \nMit freundlichen Grüßen, \nMyPod \nPolizeihauptkommissar \n \n@Matthew: "],
	["Abgelehnt: Vorlage", "Guten Tag, \n \ndie Beschwerde wird [color=#ff0000]#Abgelehnt[/color], da die Vorlage nicht eingehalten wurde. \n \nMit freundlichen Grüßen, \nMyPod \nPolizeihauptkommissar \n \n@Matthew: "],
	["Abgelehnt: Beweise", "Guten Tag, \n \ndie Beschwerde wird [color=#ff0000]#Abgelehnt[/color], da die Beweise nicht ausreichend sind. \n \nMit freundlichen Grüßen, \nMyPod \nPolizeihauptkommissar \n \n@Matthew: "],
	["Angenommen: Mündliche Verwarnung", "Guten Tag, \n \ndie Beschwerde wird [color=#009900]#Angenommen[/color], der Beamte erhält eine mündliche Verwarnung. \n \nMit freundlichen Grüßen, \nMyPod \nPolizeihauptkommissar \n \n@Matthew: "],
	["Angenommen: Interne Verwarnung", "Guten Tag, \n \ndie Beschwerde wird [color=#009900]#Angenommen[/color], der Beamte erhält eine interne Verwarnung. \n \nMit freundlichen Grüßen, \nMyPod \nPolizeihauptkommissar \n \n@Matthew: "],
	["Angenommen: Kündigung", "Guten Tag, \n \ndie Beschwerde wird [color=#009900]#Angenommen[/color], der Beamte erhält eine fristlose Kündigung. \n \nMit freundlichen Grüßen, \nMyPod \nPolizeihauptkommissar \n \n@Matthew: "],
	["Angenommen: Suspendierung", "Guten Tag, \n \ndie Beschwerde wird [color=#009900]#Angenommen[/color], der Beamte wird [tage] suspendiert. \n \nMit freundlichen Grüßen, \nMyPod \nPolizeihauptkommissar \n \n@Matthew: "],
	["Sonstiges: Geklärt", "Guten Tag, \n \ndie Beschwerde wird geschlossen, da alles geklärt wurde. \n \nMit freundlichen Grüßen, \nMyPod \nPolizeihauptkommissar \n \n@Matthew: "]
];

var forum = document.getElementById("main").getElementsByTagName("ul")[0].getElementsByTagName("span")[document.getElementById("main").getElementsByTagName("ul")[0].getElementsByTagName("span").length-1].innerHTML;
if(forum == "Beschwerden")
{
	if(document.getElementById("main").getElementsByTagName("ul")[0].getElementsByTagName("span")[2].innerHTML == "San Andreas Police Department")
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