// ==UserScript==
// @name           DS Marktanforderung
// @author         Samrat
// @namespace      none
// @description    Filtert bei Markt/Anfordern nach Rohstoffen und verbessert Vorschlag
// @include        http:/*.die-staemme.de/game.php*screen=market*mode=call*
// ==/UserScript==


minRess = 100000;
storageLimit = 0.8;

resSend = new Array();
resSend = new Array();
res = new Array(0, 0, 0);
nix = resSend.push(res);


(function(){

	var aktiv = window.setInterval(function() {filterRows();}, 100);
	
	function filterRows()
	{	
		var woodStore = 1 * document.getElementById("wood").textContent;
		var stoneStore = 1 * document.getElementById("stone").textContent;
		var ironStore = 1 * document.getElementById("iron").textContent;
		var maxStorage = Math.floor(storageLimit * document.getElementById("storage").textContent);

		var woodBox = document.getElementById("checkbox_wood").checked;
		var stoneBox = document.getElementById("checkbox_stone").checked;
		var ironBox = document.getElementById("checkbox_iron").checked;

		res = [1*woodBox, 1*stoneBox, 1*ironBox];
		resSend[0] = res;
		
		var villageList = document.getElementById("village_list").rows;
		for (var i=1; i < villageList.length; i++)
		{	nix = resSend.push([i,i,i]);
		}
		
		for (var i=1; i < villageList.length; i++)
		{
		    var woodTD = villageList[i].getElementsByClassName("wood")[0];
			var stoneTD = villageList[i].getElementsByClassName("stone")[0];
			var ironTD = villageList[i].getElementsByClassName("iron")[0];
		    var wood = parseInt(woodTD.textContent.replace(/\./,"").match(/\d+/));
			var stone = parseInt(stoneTD.textContent.replace(/\./,"").match(/\d+/));
			var iron = parseInt(ironTD.textContent.replace(/\./,"").match(/\d+/));

			if (!(wood*woodBox >= (woodStore + minRess) || stone*stoneBox >= (stoneStore + minRess) || iron*ironBox >= (ironStore + minRess))) 
			{ 
				villageList[i].hidden = true;
			} else {
				
				var button = villageList[i].getElementsByClassName("call_button")[0];
				button.addEventListener("click",function() { changeInputs(this);}, false);
						
				var traders = parseInt(villageList[i].getElementsByClassName("traders")[0].textContent.match(/\d+/));
				var woodBest = woodBox * (Math.min(wood, maxStorage) - woodStore);
				var stoneBest = stoneBox * (Math.min(stone, maxStorage) - stoneStore);
				var ironBest = ironBox * (Math.min(iron, maxStorage) - ironStore);
				
				woodBest = woodBest<0? 0:woodBest;
				stoneBest = stoneBest<0? 0:stoneBest;
				ironBest = ironBest<0? 0:ironBest;
				sumBest = woodBest+stoneBest+ironBest;
				sumBest = sumBest>0? sumBest:1;
				
				resSend[i][0] = Math.min(Math.max(0, maxStorage - woodStore), Math.floor(woodBest/sumBest * traders * 1000));
				resSend[i][1] = Math.min(Math.max(0, maxStorage - stoneStore), Math.floor(stoneBest/sumBest * traders * 1000));
				resSend[i][2] = Math.min(Math.max(0, maxStorage - ironStore), traders * 1000 - resSend[i][0] - resSend[i][1]);
				woodTD.style.backgroundColor = "#" + toHex(0xFF*resSend[i][0]/traders/1000) + toHex(0xFF) + toHex(0);
				stoneTD.style.backgroundColor = "#" + toHex(0xFF*resSend[i][1]/traders/1000) + toHex(0xFF) + toHex(0);
				ironTD.style.backgroundColor = "#" + toHex(0xFF*resSend[i][2]/traders/1000) + toHex(0xFF) + toHex(0);
			}
		}
		window.clearInterval(aktiv);
	}
	
	function changeInputs(changedButton, wood)
	{
		tableRow = changedButton.parentNode.parentNode;
		inputs = tableRow.getElementsByTagName("input");
		inputs[0].value = resSend[tableRow.rowIndex][0];
		inputs[1].value = resSend[tableRow.rowIndex][1];
		inputs[2].value = resSend[tableRow.rowIndex][2];
	}
	
	function toHex(num)
	{	// code von Vidirat
		//In diesem Array sind alle Ziffern des Hexadezimalen Systems gespeichert (0-15)
		var hex     = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F');

		//Die beiden Ziffern
		var erste     = Math.floor(num / 16);        //16^1
		var zweite     = Math.floor(num - erste * 16);    //16^0

		//Liefert den String zurueck
		return hex[erste] + hex[zweite];
	}

})()