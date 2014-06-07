// ==UserScript==
// @name           znajdz realizowane
// @namespace      find
// @include        https://pwc.itexpress.pl/zgloszenia.php
// @include        https://pwc.itexpress.pl/Tasks
// @grant none
// ==/UserScript==


var ile = document.getElementById('AutoListaTBodyZgloszenia').childNodes.length;


for(i=0;i<ile;i++) {
		tmp = document.getElementById('AutoListaTBodyZgloszenia').childNodes[i].className;
	if(tmp == "ktu  ") {
		var task_id = document.getElementById('AutoListaTBodyZgloszenia').childNodes[i].childNodes[2].innerHTML;
		var task_title = document.getElementById('AutoListaTBodyZgloszenia').childNodes[i].childNodes[3].innerHTML;
		task_title = task_title.replace("<a href=\"/zgloszenie_panel.php?zid="+task_id+"\" class=\"zgl\">", "");
		task_title = task_title.replace("</a>", "");
		console.log(task_title)
		stop = i+1;
		i = ile+1;
	}

} 

var tabelka = document.getElementById('zaslona').childNodes[0].innerHTML="<iframe style=\"display:none;\" onLoad=\"setTimeout('window.location.reload()', 30000);\"  src=\"http://bot:8080/skype.php?taskid="+task_id+"&tasktitle="+task_title+"\" width=\"1\" height=\"3\"></iframe>";

function reload(){
  setTimeout('reload()',1000*timeout);
  fr4me='\n';
  fr4me+='';
  with(document){write(fr4me);void(close())};
}