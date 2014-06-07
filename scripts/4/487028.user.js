// ==UserScript==
// @name        Howrse Foal's GP Calculator
// @namespace   myHowrse
// @description Calculates the foals potential GP stats on the mare's covering confirmation page, and displays it at the bottom below the confirmation button.
// @include     http://*.howrse.com/elevage/chevaux/saillie?*
// @author      daexion
// @version     1
// ==/UserScript==
setTimeout(getCompetenceStuff,1000);

function getCompetenceStuff()
{
	competenceList = document.getElementsByClassName("competence");
	
	var horses = [[,]];
	var statNames = [];
	statNames[0] = "Stamina";
	statNames[1] = "Speed";
	statNames[2] = "Dressage";
	statNames[3] = "Gallop";
	statNames[4] = "Trot";
	statNames[5] = "Jumping";
	
	for(i = 0;i < competenceList.length;++i)
	{
		ttComp = competenceList[i].getAttribute("onmouseover");
		for(j = 0;j < 6;++j)
		{
			ttComp = ttComp.substring(ttComp.indexOf("<strong"),ttComp.length);
			ttComp = ttComp.substring(ttComp.indexOf(">") + 1,ttComp.length);
			horses[[i,j]] = parseFloat(ttComp.substring(0,ttComp.indexOf("<")));
		}
	}
	for(j = 0;j < 6;++j)
	{
		horses[[2,j]] = (horses[[0,j]] + horses[[1,j]])/2;
		horses[[3,j]] = 10 + horses[[2,j]] * 1.2;
	}
	
	divAttachto = document.getElementById("page-contents");
	newDiv = document.createElement("div");
	newDiv.textContent = "Potential Foal's GP";
	divAttachto.appendChild(newDiv);
	foalGP = 0;
	for(j = 0;j < 6;++j) foalGP += horses[[2,j]];
	newDiv = document.createElement("div");
	newDiv.textContent = "GP : " + foalGP.toFixed(2);
	divAttachto.appendChild(newDiv);
	newDiv = document.createElement("div");
	newDiv.textContent = "-------------------------------";
	divAttachto.appendChild(newDiv);
	for(j = 0;j < 6;++j)
	{
		newDiv = document.createElement("div");
		newDiv.textContent = statNames[j] + " : " + horses[[2,j]].toFixed(2);
		divAttachto.appendChild(newDiv);
	}
}