// ==UserScript==
// @name richard.kolisek
// @version 1.8
// @description utility
// @grant       none
// @require http://code.jquery.com/jquery-1.10.2.min.js
// @include http://www.meliorannis.com/*
// ==/UserScript==

var percentColors = [
    { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
    { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
    { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } } ];

var percentToColor = function(pct) {

	for (var i = 0; i < percentColors.length; i++)
	{
		if (pct <= percentColors[i].pct)
		{
			var lower = (i === 0) ?  percentColors[i] : percentColors[i - 1];
			var upper = (i === 0) ? percentColors[i + 1] : percentColors[i];
			var range = upper.pct - lower.pct;
			var rangePct = (pct - lower.pct) / range;
			var pctLower = 1 - rangePct;
			var pctUpper = rangePct;

			var color =
			{
				r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
				g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
				b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
			};

			return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
		}
	}
}

function renderChangesValue(id, power, area, powerPos, areaPos, row)
{

	var dbValues = localStorage[id];
	var powerDb =-1;
	var areaDb = -1;

	if(dbValues)
	{
		powerDb = dbValues.split(',')[0];
		areaDb = dbValues.split(',')[1];
	}

	var columns = $(row).children();

	var powerColumn = $(columns[powerPos]);
	powerColumn.append(renrerValue('power', power, powerDb==-1 ? power : powerDb));

	if(areaPos)
	{
		var areaColumn = $(columns[areaPos]);
		areaColumn.append(renrerValue('area', area, areaDb==-1 ? area : areaDb));
	}

}

function renrerValue(type, value, valueDb)
{

	var percent = Math.round(percent * 10) / 10;
	percent = (value / (valueDb / 100) - 100).toFixed(1);

	return '<font size="2">' +
			'(<span class="' + type +'">' +
				percent +
			'</span>)'
			' ' +
		'</font>';

}

function main()
{


	var tables = $('table:contains("Síla"):contains("ID")').not(':contains("Zlato")');

	$.each(
		tables,
		function (i, table)
		{

			var rows = $(table).find('tr');

			var headRow = rows.filter(
				function(index, row)
				{
				  return $(row).find('td:contains("ID")').length==1;
				}
			);

			var idPos;
			var powerPos;
			var areaPos;

			var headColumns = $(headRow).find('td');
			$.each(headColumns,
				function (index, value)
				{
					var text = $(value).text().trim();
					console.log('head text: -' + text + '-');
					if(text==='ID')
						idPos = index;
					if(text.indexOf("Síla")===0)
						powerPos = index;
					if(text==='Rozloha')
						areaPos = index;
				}
			);

			console.log('idPos: ' + idPos);
			console.log('powerPos: ' + powerPos);
			console.log('areaPos: ' + areaPos);

			$.each(rows,
				function (index, value)
				{
					var columns = $(value).children();
					var id = $(columns[idPos]).text().trim();
					var power = $(columns[powerPos]).text().split('*').join('').trim();
					var area;

					if(areaPos)
						area = $(columns[areaPos]).text().trim();


					if(!isNaN(parseFloat(id)))
					{
						renderChangesValue(id, power, area, powerPos, areaPos, value);
						if(!area && localStorage[id])
							area = localStorage[id].split(',')[1];
						localStorage[id] = [power, area];
					}
				}
			);
		}
	);

	colorPercentages('.power');
	colorPercentages('.area');
};

function renderIdSearch()
{
	var lastLink = $('center > table:nth-child(4) > tbody > tr > td:nth-child(3) a:last')
	lastLink.after(
		'<form action="setup.html" method="POST">' +
			'<input type="hidden" name="setup" value="spehovani">' +
			'<input type="hidden" name="nolinks" value="1">' +
			'<input type="hidden" name="code" value="' + getUrlVars()['code'] + '">' +
			'<input type="hidden" name="id" value="' + getUrlVars()['id'] + '">' +
			'<input type="hidden" name="ftc" value="' + getUrlVars()['ftc'] + '">' +
			'<input type="submit" value=" Vyslat špehy "><br/>' +
			'<input type="text" value="" size="4" maxlength="6" name="koho">' +
		'</form>'
	);

}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function colorPercentages(selector)
{
	var percentElements = $(selector);
	var percentValues = $.map(
		percentElements,
		function(value)
		{
			return $(value).text();
		}
	);
	var percentMax = Math.max.apply(Math, percentValues);
	var percentMin = Math.min.apply(Math, percentValues);

	percentMax = percentMax==0 ? 1 : percentMax;
	percentMin = percentMin==0 ? 1 : percentMin;

	$.each(
		percentElements,
		function(index, value)
		{

			var currentValue = $(value).text();
			var relativePercent = 0;

			if(currentValue >= 0)
			{
				relativePercent = 50 + (Math.abs(currentValue) / (Math.abs(percentMax) / 50));
			}
			else
			{
				relativePercent = 50 - (Math.abs(currentValue) / (Math.abs(percentMin) / 50));
			}

			$(value).css('color', percentToColor(relativePercent / 100));
		}
	);
}

main();
renderIdSearch();