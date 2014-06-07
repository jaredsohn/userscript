// ==UserScript==
// @name           OGame Redesign: Efficiency Tool Rus
// @namespace      RiV-efficiency + Russian Translation
// @description    Provides some useful efficiency information
// @author         RIV- & programmer
// @version        1.31
// @include        http://*.ogame.*/game/index.php?page=station*
// @include        http://*.ogame.*/game/index.php?page=resources*
// ==/UserScript==

var ratioM = 2.5;
var ratioMC = 1.8;
var ratioC = 1.5;
var ratioD = 1;

// get an element via its class name | thx @ marshen for the code
function getElementsByClass (cName, domNode) 
{
	if (cName == undefined || cName.length == 0) return;
	if (domNode == undefined) domNode = document;

	if (domNode.getElementsByClassName)
		return domNode.getElementsByClassName(cName);

	// browser doesn't support getElementsByClassName
	cName = " " + cName + " "; // add spaces here so that we won't find class "a" in className == "abc"
	var elements = domNode.getElementsByTagName('*');
	var res = new Array();
	for (var i = 0; i < elements.length; i++) 
	{
		var className = " " + elements[i].className + " ";
		if (className.indexOf(cName) > -1) 
		{
		  res.push(elements[i]);
		}
	}

	return res;
}

function getBuildingLevel(id) 
{
	var res = getElementsByClass('station' + id)[0];
	res = getElementsByClass('level', res)[0].innerHTML;
	res = res.match(/\d+/);
	return parseInt(res);
}

function removeSeparator(str) 
{
	if (!str) return null;
	return parseInt(str.replace(/\./g, ''));
}

function getBuildingInfo() 
{
	var res = new Array();
	var costs = document.getElementById('costs');
	costs = getElementsByClass('metal', costs);

	for(var i = 0; i < costs.length; i++) 
	{		
		var domain = window.location.host;
		domain = domain.split('.')[2];
		
		var resValue = costs[i].title;
		resValue = resValue.substring(1, resValue.indexOf(' '));
		resValue = removeSeparator(resValue);
		resValue = (resValue > 0) ? resValue : 0;
		
		var resType = getElementsByClass('metal tipsStandard')[i].getAttribute('title');
		if(domain == 'ru')
		{
		    resType = resType.match(/Металл|Кристалл|Дейтерий/);
			
			if(resType == 'Металл') res[0] = resValue;
			if(resType == 'Кристалл') res[1] = resValue;
			if(resType == 'Дейтерий') res[2] = resValue;				
		}
		else
		{
			resType = resType.match(/metall|kristal|deuterium/);
			
			if(resType == 'metall') res[0] = resValue;
			if(resType == 'kristal') res[1] = resValue;
			if(resType == 'deuterium') res[2] = resValue;	
		}
	}
		
	for(var i = 0; i < 3; i++)
		res[i] = (res[i] > 0) ? res[i] : 0;		
		
	return res;
}

function oRound(value, dec) 
{
	var res = Math.round(value * Math.pow(10, dec)) / Math.pow(10, dec);
	return res;
}

function formatNumber(num) 
{
	var separator = '.';
	var res = '';
	num = ''+num;

	while(num.length > 3) 
	{
		res = separator + num.slice(-3) + res;
		num = num.substr(0, num.length - 3);
	}

	res = num + res;
	return res;
}

function getSupplyInformation()
{
	var production = document.getElementById('content');
	production = getElementsByClass('time', production)[2].innerHTML;
	
	return production;
}

function insertText(e) 
{
	if(e.target.id != 'content') return;
	
	var domain = window.location.host;
	domain = domain.split('.')[2];

	var RLevel = getBuildingLevel(14);
	var RWLevel = getBuildingLevel(21);
	var NLevel = getBuildingLevel(15);
	var RSLevel = getBuildingLevel(31);
	
	var buildingId = getElementsByClass('detail_screen')[0];
	buildingId = buildingId.getElementsByTagName('input')[1].value;
	
	var timeReduction = '';
	var productionSupply = '';
	
	if((buildingId >= 1) && (buildingId <= 3))		
		productionSupply = getSupplyInformation();
	
	if(buildingId == 14)
		timeReduction = (1 / (RLevel + 2)) / (1 / (RLevel + 1));
	
	if(buildingId == 15)
		timeReduction = 0.5;
		
	if(buildingId == 31)
		timeReduction = (1 / (RSLevel + 2)) / (1 / (RSLevel + 1));	

	if(buildingId == 21)
		timeReduction = (1 / (RWLevel + 2)) / (1 / (RWLevel + 1));
	
	if((timeReduction != '') && (buildingId > 4))
	{
		timeReduction = oRound((1 - timeReduction) * 100, 2);

		var buildingInfo = getBuildingInfo();
				var percentMSE = [buildingInfo[0]/timeReduction, buildingInfo[1]/timeReduction, buildingInfo[2]/timeReduction];
				percentMSE = percentMSE[0] + percentMSE[1] * ratioMC + percentMSE[2] * ratioM;
				percentMSE = formatNumber(Math.floor(percentMSE));

		var productionText = document.getElementById('action').getElementsByTagName('ul')[0];
		var buildTimeEff = document.createElement('li');
		if(domain == 'ru')
		{
			buildTimeEff.innerHTML = 'Сокращение времени: <span class="time">' + timeReduction + '%</span><br>1% &#8793; ' + percentMSE + ' <span title="Metal Standart Units">MSU</span>';
		}
		else
		{
			buildTimeEff.innerHTML = 'Reduction: <span class="time">' + timeReduction + '%</span><br>1% &#8793; ' + percentMSE + ' <span title="Metal Standart Units">MSU</span>';
		}
		productionText.appendChild(buildTimeEff);
	}
	if (productionSupply != '')
	{
		var payOffTime = new Number;
		var buildingInfo = getBuildingInfo();

		switch (buildingId)
		{
			case 1:
				payOffTime = Round((buildingInfo[0] + buildingInfo[1] * ratioMC) / productionSupply);
				break;
			case 2:
				payOffTime = Round((buildingInfo[0] / ratioMC + buildingInfo[1]) / productionSupply);
				break;
			case 3:
				payOffTime = Round(((buildingInfo[0] / ratioM) + (buildingInfo[1] / ratioC)) / productionSupply);
				break;
		}
		
		var productionText = document.getElementById('action').getElementsByTagName('ul')[0];
		var buildTimeEff = document.createElement('li');
		if(domain == 'ru')
		{
			buildTimeEff.innerHTML = 'Окупится через: <span class="time_to_pay_off">' + payOffTime.toString() + '</span>';
		}
		else
		{
			buildTimeEff.innerHTML = 'Pay off after: <span class="time_to_pay_off">' + payOffTime.toString() + '</span>';
		}
		productionText.appendChild(buildTimeEff);
	}
}

document.getElementById('planet').addEventListener('DOMNodeInserted', insertText, false);