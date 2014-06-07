// ==UserScript==
// @name        pnukTeam
// @namespace   Clowst
// @description pnukTeam
// @include     *
// @require 	 http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// @version     1
// @grant 		 GM_xmlhttpRequest
// @run-at		 document-end
// ==/UserScript==

	var teamPnuk = ['Clowst', 'Nph', 'Quke', 'pnukLyx', 'Killuu', 'pnukKib', 'Fqck', 'pnukMox', 'niemeR'],
		sContainer = document.createElement('div'),
		sTable = document.createElement('table'),
		tFoot,
		pnukShowed= false;
		
	// Activation du menu avec la combinaison SHIT + P
	$(document).keypress(function(e) {
		if( e.shiftKey && (e.which == 80 || e.which == 112 ))
		{
			if(!pnukShowed)
			{
				pnukShowed = true;
				buildUi();
				for(var i=0, len= teamPnuk.length; i < len; i++)
					getInfos(teamPnuk[i]);			
			}
			else
			{
				$(sContainer).remove();
				$(sTable).empty();
				pnukShowed = false;
			}
		}	
	});
		
	// Format JSON en response : 
	// 	"summonerName": "Nph",
	//		"tierRank":		 "Gold 1 (71 LP)",
	//		"mmr":			 "1,651",
	// 	"class":			 "normal",
	//		"tip":			 "Reasonable MMR. You have qualified for belonging to this leagues."}
	
	function getInfos(_usrName)
	{
		GM_xmlhttpRequest({
				method: "POST",
				
				url: "http://op.gg/mmr/ajax/mmr.json/",
				data: "region=EUW&userName="+_usrName,
				timeout: 4000,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
			   },
				onload: function(response) {
					var recup = JSON.parse(response.responseText);
					(!recup.error) ? addRow(recup) : addErreur(_usrName);
				},
				ontimeout: function(response) {
					addErreur(_usrName);
				}
		});
	}
	
	function buildUi()
	{
		sContainer.id = 'sContainer';
		sContainer.style.position= 'fixed';
		sContainer.style.top= '0px';
		sContainer.style.right= '0px';
		sContainer.style.opacity = "0.5";
		sContainer.style.backgroundColor = 'rgba(242, 242, 242, 0.8)';
		sContainer.style.backgroundRepeat = 'no-repeat';
		sContainer.style.backgroundPosition = 'center center';
		sContainer.style.border= '1px solid grey';
		sContainer.style.padding= '5px';
		sContainer.style.zIndex= "1337";
		
		sTable.id = 'sTable';
		sTable.style.backgroundColor= 'rgba(42, 42, 42, 0.1)';
		sTable.style.margin= 'auto';
	
		document.body.appendChild(sContainer);
		sContainer.appendChild(sTable);
		var tHeader = sTable.createTHead(),
			row = tHeader.insertRow(0),
			cellColLbl = ['Pseudo','MMR','Division'],
			cell = new Array();
			
			// Construction du header
			for (var i=0, len= cellColLbl.length; i < len; i++)
			{
				cell.push(row.insertCell(0));
				cell[i].innerHTML = cellColLbl[(len-i)-1];
			}
			
		tFoot = sTable.createTFoot();
	}
	
	function addRow(_json)
	{	
		var rowF = tFoot.insertRow(0),
			 cell0 = rowF.insertCell(0),	
			 cell1 = rowF.insertCell(1),
			 cell2 = rowF.insertCell(2);	
			 
		cell0.innerHTML= _json.summonerName;
		cell1.innerHTML= _json.mmr;
		cell2.innerHTML= _json.tierRank;
	}
	
	function addErreur(_usrName)
	{
		var rowF = tFoot.insertRow(0),
			 sError = document.createElement('span'),
			 cell0 = rowF.insertCell(0);			 
			 
		sError.style.color = 'red';
		
		cell0.appendChild(sError)
	   sError.innerHTML= _usrName;
	}

	
	
	
	