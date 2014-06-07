// ==UserScript==
// @name           Experimetrix
// @namespace      fvds.frih.net
// @description    Om die goede mensen te helpen die zich volledig belangeloos inzetten voor de wetenschap
// @include        https://experimetrix2.com/Subjectpool/BrowseExpsq.asp
// ==/UserScript==

function filterExperiments(){
	var tables = document.getElementsByTagName('table');
	var table;

	for(i = 0; i < tables.length; i++){
		if(tables[i].textContent.indexOf("Supervisor") != -1)
			table = tables[i];
	}

	var trs = table.getElementsByTagName('tr');

	for(i = 0; i < trs.length; i++){
		if(trs[i].textContent.indexOf("Supervisor") != -1)
			continue;
		
		if(trs[i].textContent.indexOf("Psychologische Functieleer") == -1)
			trs[i].style.display = "none";
		else {
			var expNum = trs[i].getElementsByTagName('input')[0].getAttribute("onClick").match(/\d+/);
			
			var req = new XMLHttpRequest();
			req.open('GET', 'https://experimetrix2.com/SubjectPool/ScheduleWindowq.asp?EID=' + expNum, false); 
			req.send(null);
			
			var newTD = document.createElement("td");
			
			if(req.responseText.indexOf("This experiment has no open Appointments.") != -1){
				newTD.style.background = "red";
				newTD.appendChild(document.createTextNode("No open appointments"));
			} else {
				newTD.style.background = "green";
				
				var myRe = /<TD ALIGN="CENTER">(\w+, \d+\/\d+\/\d+)<\/TD><TD ALIGN="CENTER">((?:\d|A|P|M| |:|-)+)<\/TD>/gi;
				var myArray;
				while ((myArray = myRe.exec(req.responseText)) != null) {
					newTD.appendChild(document.createTextNode(myArray[1] + " " + myArray[2]));
					newTD.appendChild(document.createElement("br"));
				}
				
				var myRe2 = /Page 1 of (\d+)/;
				var res = myRe2.exec(req.responseText);
				
				if(res.length != 2){
					newTD.appendChild(document.createTextNode("ERROR!!"));
					newTD.appendChild(document.createElement("br"));
				} else if(res[1] != "1"){
					var strong = document.createElement("strong");
					strong.appendChild(document.createTextNode("And " + (res[1] - 1) + " more page(s)."));
					newTD.appendChild(strong);
					newTD.appendChild(document.createElement("br"));
				}
			}
			
			trs[i].appendChild(newTD);
		}
	}
}
 
function addButton(){
  var buttonElems = document.getElementsByTagName('body');
  buttonElems[0].innerHTML = '<input id="greasemonkeyButton" type="button" value="Zoek!" />' + buttonElems[0].innerHTML
  addButtonListener();
}
 
function addButtonListener(){
  var button = document.getElementById("greasemonkeyButton");
  button.addEventListener('click',filterExperiments,true);
}

window.addEventListener("load", function(e) {
  addButton();
}, false);
