// ==UserScript==
// @name           War Riders Extended
// @namespace      forcetree
// @include        http://*war-riders.de/*/*/details/player/*
// @include        http://*war-riders.de/*/*/search/player/*
// @include        http://*war-riders.de/*&type=player&*name=*
// @include        http://*ogame.gamestats.org/*/*/details/player/*
// @include        http://*ogame.gamestats.org/*/*/search/player/*
// @include        http://*ogame.gamestats.org/*&type=player&*name=*
// ==/UserScript==
readTable();

function draw_chart(chartData)
{
    var size = "400x100";
    var labels = "Economy without Defence|Research|Armada|Defence";
    var url = "http://chart.apis.google.com/chart?"
    + "cht=p3&"
    + "chl=" + labels + "&"
    + "chf=bg,s,efefef00&"
    + "chs="+ size +"&"
    + "chld=&"
    + "chco=556B2F&"
    + "chtt=&"
    + "&chd=t:" + chartData;

    var img = document.createElement("img");
    img.src = url;
    return img;
}

function readTable()
{
    var fullTable = document.getElementById("startcontent2").getElementsByTagName("table")[0];

    try{
        var totalPoints = fullTable.getElementsByTagName("tr")[3].lastChild.textContent;
        var ecoPoints = fullTable.getElementsByTagName("tr")[6].lastChild.textContent;
        var researchPoints = fullTable.getElementsByTagName("tr")[9].lastChild.textContent;
        var militaryPoints = fullTable.getElementsByTagName("tr")[12].lastChild.textContent;
    } catch(err)
    {
        GM_log('No Table found.');
        return;
    }
    calculate(fullTable, totalPoints, ecoPoints, researchPoints, militaryPoints);
}

function calculate(fullTable, totalPoints, ecoPoints, researchPoints, militaryPoints)
{
    totalPoints = removeDots(totalPoints);ecoPoints = removeDots(ecoPoints);researchPoints = removeDots(researchPoints);militaryPoints = removeDots(militaryPoints);
    defencePoints = parseInt(ecoPoints) + parseInt(researchPoints) + parseInt(militaryPoints) - parseInt(totalPoints);
    armadaPoints = parseInt(militaryPoints) - parseInt(defencePoints);
    if ((defencePoints < 0) || (armadaPoints < 0))
	{
	GM_log("Invalid value.")
	fullTable.parentNode.insertBefore(document.createTextNode("Invalid value."), fullTable);
	return
	}
    chartData = (ecoPoints-defencePoints) / totalPoints + "," + researchPoints / totalPoints + "," + armadaPoints / totalPoints + "," + defencePoints / totalPoints;
    
    indestPoints = parseInt(ecoPoints) + parseInt(researchPoints) - defencePoints;

    var newDiv = document.createElement("div");
    newDiv.appendChild(draw_chart(chartData));
    newDiv.appendChild(br());
    newDiv.appendChild(br());
    newDiv.appendChild(drawTable((insertDots(defencePoints) + " ("+ (defencePoints / totalPoints * 100).toFixed(1) +"%)"), (insertDots(armadaPoints) + " ("+ (armadaPoints / totalPoints * 100).toFixed(1) +"%)"), (insertDots(indestPoints)+ " ("+ (indestPoints / totalPoints * 100).toFixed(1) +"%)")));
    newDiv.appendChild(br());
    fullTable.parentNode.insertBefore(newDiv, fullTable);
}

function drawTable(def, armada, indest)
{
	var newTable = document.createElement("table");
	newTable.className = "border";
    	newTable.title = "Armada incl. 50% civil Ships, 50% Jumpgate, 50% Phalanx indestructible Points alike plus other lunarbased buildings";
	var trOne = document.createElement("tr");
	newTable.appendChild(trOne);
	trOne.appendChild( getTd("cl","Defence") );
	trOne.appendChild( getTd("cl","Armada") );
	trOne.appendChild( getTd("cl","indestructible Points") );
	var trTwo = document.createElement("tr");
	newTable.appendChild(trTwo);
	trTwo.appendChild( getTd("s",def) );
	trTwo.appendChild( getTd("s",armada) );
	trTwo.appendChild( getTd("s",indest) );
	return newTable;
}

function getTd(className, text)
{
var newTd = document.createElement("td");
newTd.appendChild(document.createTextNode(text));
newTd.className = className;
return newTd;
}


function removeDots(s)
{
    return s.replace(/\./g, "");
}

function br()
{
    return document.createElement("br");
}

function insertDots(n)
{
n= "" + n;
if (n.length > 3)
{
    var mod = n.length % 3;
    var output = (mod > 0 ? (n.substring(0,mod)) : "");
    for (i=0 ; i < Math.floor(n.length / 3); i++)
    {
        if ((mod == 0) && (i == 0))
            output += n.substring(mod+ 3 * i, mod + 3 * i + 3);
        else
            output+= "." + n.substring(mod + 3 * i, mod + 3 * i + 3);
    }
    return (output);
}
else return n;
}