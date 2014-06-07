// ==UserScript==
// @name		RYM enhancer rewrite
// @namespace	http://rateyourmusic.com/
// @description	Adds a lot of new features to RYM
// @include	http://rateyourmusic.com/*
// @include	http://www.rateyourmusic.com/*
// @version	1.0.0.1
// ==/UserScript==//

var url = document.URL;	
var gUrlSubstr = url.split("/"); /*Sets global array containing the URL, used in various functions*/

/*This sets Menu Commands for the user to choose which functions should be used*/
GM_registerMenuCommand("Set ratings in a 1-10 scale", sRatingsDuplicator);
GM_registerMenuCommand("Changes stars alternative text to 1-10", sStarRatingsDuplicator);
GM_registerMenuCommand("Calculate average ratings in artist pages", sAverageCalculator);
GM_registerMenuCommand("Give color to ratings", sColorizer);
GM_registerMenuCommand("Highlight records you own in charts", sChartsHighlighter);
GM_registerMenuCommand("Gives the amount of records you own from a chart", sRecordAmount);

/*This checks user preferences and calls each function depending on them*/
if(GM_getValue('averageCalculator', 1))		{averageCalculator();}
if(GM_getValue('colorizer', 1))				{colorizer();}
if(GM_getValue('ratingsDuplicator', 1))		{ratingsDuplicator();}
if(GM_getValue('starRatingsDuplicator', 1))	{starRatingsDuplicator();}
chartsHighlighter();

/*This functions are switches for the boolean parameters that control user options*/
function sRatingsDuplicator()
{
	if(!(GM_getValue('ratingsDuplicator', 0)))
		{GM_setValue('ratingsDuplicator',1);}
	else
		{GM_setValue('ratingsDuplicator',0);}
}
function sStarRatingsDuplicator()
{
	if(!(GM_getValue('starRatingsDuplicator', 0)))
		{GM_setValue('starRatingsDuplicator',1);}
	else
		{GM_setValue('starRatingsDuplicator',0);}
}
function sAverageCalculator()
{
	if(!(GM_getValue('averageCalculator', 0)))
		{GM_setValue('averageCalculator',1);}
	else
		{GM_setValue('averageCalculator',0);}
}
function sColorizer()
{
	if(!(GM_getValue('colorizer', 0)))
		{GM_setValue('colorizer',1);}
	else
		{GM_setValue('colorizer',0);}
}
function sChartsHighlighter()
{
	if(!(GM_getValue('chartsHighlighter', 0)))
		{GM_setValue('chartsHighlighter',1);}
	else
		{GM_setValue('chartsHighlighter',0);}
}
function sRecordAmount()
{
	if(!(GM_getValue('recordAmount', 0)))
		{GM_setValue('recordAmount',1);}
	else
		{GM_setValue('recordAmount',0);}
}
/*End of switch functions*/

function ratingsDuplicator() /*Duplicates each 0.5-5 rating on the site*/
{
	function parseXpath(xpathQuery) /*Duplicates each rating value for each xpath query*/
	{
		GM_log('1');
		for(var i=0; i<xpathQuery.snapshotLength; i++)
		{
			GM_log('2');
			var target = xpathQuery.snapshotItem(i);
			var rating = target.textContent;
			if(!isNaN(rating))
			{
				GM_log('3');
				rating*=2;
				if((rating-Math.floor(rating))==0)
					{target.textContent = rating.toFixed(0);}
				else
					{target.textContent = rating.toFixed(2);}
			}
		}
	}
	if(gUrlSubstr[3]=="artist")
	{
		parseXpath(xpath('//td/div[@class="medium"]'));									/*Album rating*/					
		parseXpath(xpath('//div[@class="medium"]/span'));								/*Grey album ratings*/
		parseXpath(xpath('//div[@class="small"]/a[@class="artist_rate"]'));				/*My rating*/
	}
	else if(gUrlSubstr[3]=="release")
	{
		parseXpath(xpath('//table[@class="album_info"]/tbody/tr/td/span'));			/*Friends' Rating*/
		parseXpath(xpath('//table[@class="album_info"]/tbody/tr/td/span/span'));		/*Average Rating*/
		parseXpath(xpath('//table[@class="album_info"]/tbody/tr/td/span/span/span'));		/*Maximum Rating*/

		/* These next four lines don't do anything in RYM 2.5 */
		parseXpath(xpath('//a[@class="ratingbutton"]')); 							/*Rating buttons*/
		parseXpath(xpath('//a[@class="ratingbuttonhc"]')); 							/*Used rating button*/
		parseXpath(xpath('//tbody/tr/td[@style="width: 3em;"]')); 					/*Rating distributions*/
		parseXpath(xpath('//span[@id="ratingtext"]')); 								/*Rating text near stars*/
	}
	else if(gUrlSubstr[3]=="charts"||(gUrlSubstr[3].slice(0,11))=="customchart")
		{parseXpath(xpath('//a/b[1]'));}												/*Small ratings at charts*/
	else if(gUrlSubstr[3].slice(0,1)=="~")
		{parseXpath(xpath('//a[@class="medium"]'));}									/*Rating distribution at user sites*/
}

function starRatingsDuplicator() /*Changes stars's alternative text to 1-10 ratings*/
{
	starPathQuery = xpath('//img[@width="90"]'); /*Star images*/
	for(var i=0; i<starPathQuery.snapshotLength; i++)
	{
		var target = starPathQuery.snapshotItem(i);
		var starSrc = target.src;
		var rating = target.title.substring(0,4);
		if(!isNaN(rating))
		{
			rating*=2;
			if((rating-Math.floor(rating))==0)
				{target.title = rating.toFixed(0) + " stars";}
			else
				{target.title = rating.toFixed(2) + " stars";}
		}
	}
}

function averageCalculator() /*Calculates average ratings for an artist and individual categories*/
{
	if(gUrlSubstr[3]=="artist")
	{
		function categoryAverage(category)
		{
			if(category)
			{
				var tBody = category.getElementsByTagName("tbody")[0];
				var rows = tBody.getElementsByTagName("tr");
				var average=0, i=2, errors=0;
				for(var row=null; row=rows[i]; i++)
				{
					var cell = row.getElementsByTagName("td")[6];
					var rating = cell.textContent;
					if(!isNaN(parseFloat(rating))) {average+=parseFloat(rating);}
					if(isNaN(parseFloat(rating))) {++errors;}
				}
				globalAverage+=average;
				globalRecordNumber+=(i-2-errors);
				average/=(i-2-errors);
				var row = document.createElement("tr");
				for(var e=0; e<8; e++)
				{
					cells = document.createElement("td");
					cells.style.background = 'rgb(255,255,204)';
					if(e==1)
					{
						cellText = document.createTextNode("Average rating: ");
						cells.appendChild(cellText);
						cells.style.fontWeight = 'bold';
					}
					else if(e==6)
					{
						var div = document.createElement('div');
						div.className = 'medium';
						divText = document.createTextNode(average.toFixed(2));
						div.appendChild(divText);
						cells.appendChild(div);
					}
					row.appendChild(cells);
				}
				category.appendChild(row);
			}
		}
		var globalAverage=0, globalRecordNumber=0;
		categoryAverage(document.getElementById("album_disc_s"));
		categoryAverage(document.getElementById("album_disc_e"));
		categoryAverage(document.getElementById("album_disc_c"));
		categoryAverage(document.getElementById("album_disc_i"));
		categoryAverage(document.getElementById("album_disc_b"));
		categoryAverage(document.getElementById("album_disc_d"));
		globalAverage /= globalRecordNumber;
		var row = document.createElement("tr");
		var td = document.createElement("td");
		var tdText = document.createTextNode("Rating");
		td.appendChild(tdText);
		row.appendChild(td);
		td = document.createElement("td");
		if(GM_getValue('ratingsDuplicator', 1))
			{tdText = document.createTextNode((globalAverage*2).toFixed(2));}
		else
			{tdText = document.createTextNode(globalAverage.toFixed(2));}
		td.appendChild(tdText);
		row.appendChild(td);
		var table = document.getElementsByTagName("table")[0];
		if(table.getElementsByTagName("table")[1])
			{secondTable=table.getElementsByTagName("table")[1];}
		else
			{secondTable=table.getElementsByTagName("table")[0];}
		secondTable.appendChild(row);
	}
}

function colorizer() /*Gives color to ratings*/
{
	function applyColor(xpathQuery)
	{
		for(var i=0; i<xpathQuery.snapshotLength; ++i)
		{
			var div = xpathQuery.snapshotItem(i);
			var value = div.textContent;
			if(!isNaN(value))
			{
				if(value<2) 		{div.style.color="#ff3333";}
				else if(value<3.5)	{div.style.color="#ffcc33";}
				else 				{div.style.color="#339900";}
			}
		}
	}
	
	if(gUrlSubstr[3]=="artist")
	{
		applyColor(xpath('//td/div[@class="medium"]'));									/*Album rating*/
		applyColor(xpath('//div[@class="medium"]/span'));								/*Grey album ratings*/
	}
	else if(gUrlSubstr[3]=="release")
	{
		applyColor(xpath('//span[@class="avg_rating"]'));	/*Rating*/
	}
	else if(gUrlSubstr[3]=="charts"||(gUrlSubstr[3].slice(0,11))=="customchart")
		{applyColor(xpath('//a/b[1]'));}												/*Small ratings at charts*/
	else if(gUrlSubstr[3].slice(0,1)=="~")
		{applyColor(xpath('//a[@class="medium"]'));}									/*Rating distribution at user sites*/
}

function chartsHighlighter() /*Highlights owned records from a chart page*/
{
	if(gUrlSubstr[3]=="charts"||(gUrlSubstr[3].slice(0,11))=="customchart")
	{
		var div = document.getElementsByTagName('div');
		var navtop = div[1].getElementsByTagName('div');
		var ul = navtop[1].getElementsByTagName('ul');
		var li = ul[0].getElementsByTagName('li');
		var username = li[6].firstChild.textContent;
		if(username!='log in / sign up')
		{
			var urlRequest = 'http://rateyourmusic.com/collection_p/'+username+'/d.a,a,l,o,r0.0-5.0,n9999,oo/';
			var req = new XMLHttpRequest;
			var records=0; recordsIOwn=0;
			req.open('GET', urlRequest, false);
			req.send(null);
			var response = req.responseText;
			var aux;
			var xpathQuery = xpath('//table/tbody/tr/td/div/span[@style="font-size:x-large;"]');
			for(var i=0; i<xpathQuery.snapshotLength; i++)
			{
				var target = xpathQuery.snapshotItem(i);
				var path = target.lastChild.pathname;
				var href = 'href=\"' + path;
				aux = response.indexOf(href);
				if(aux!=-1)
				{
					recordsIOwn++;
					if(GM_getValue('chartsHighlighter', 1))
						{target.parentNode.parentNode.style.background="rgb(255,255,204)";}
				}
				records++;
			}
			if(GM_getValue('recordAmount', 1))
			{
				var row = document.createElement('tr');
				for(var i=0; i<3; i++)
				{
					var cell = document.createElement('td');
					if(i==0) 		{cell.appendChild(document.createTextNode('You own'));}
					else if(i==1)	{cell.appendChild(document.createTextNode(recordsIOwn+'/'+records));}
					else 			{cell.appendChild(document.createTextNode('of these records'));}
					cell.style.fontSize = '20px !important';
					cell.style.fontWeight = 'bold';
					cell.style.color = '#777777';
					cell.style.textAlign = (i!=2) ? 'center' : 'left';
					row.appendChild(cell);
				}
				target.parentNode.parentNode.parentNode.parentNode.appendChild(row);
			}
		}
	}
}
function xpath(query) /*Parses xPath queries*/
{
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
