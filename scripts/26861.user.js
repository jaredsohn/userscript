// ==UserScript==
// @name           Idos.cz
// @namespace      http://www.1188.cz/ 
// @description    Add hCalendar to Idos.cz
// @include        http://jizdnirady.idnes.cz/*
// @include        http://vlak.cz/* 
// ==/UserScript==


function xpath(thepath, context)
{
	return document.evaluate(thepath,context,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
}

function addClass(thepath, theclass)
{
	var allDivs, thisDiv;
	allDivs = xpath(thepath, document);
	for (var i = 0; i < allDivs.snapshotLength; i++)
	{
		thisDiv = allDivs.snapshotItem(i);
		thisDiv.className = thisDiv.className +' '+ theclass;
	}
}

function replaceText(thepath, searchText, replaceText)
{
	var allDivs, thisDiv, re;
	re = new RegExp(searchText,'g');
	allDivs = xpath(thepath, document);
	for (var i = 0; i < allDivs.snapshotLength; i++)
	{
		thisDiv = allDivs.snapshotItem(i);
		thisDiv.innerHTML = thisDiv.innerHTML.replace(re, replaceText);
	}
}


// run XPath expression in the found pathnodes and add result via the template (e.g. "<div>%XPATH%</div>" where %XPAH% is replaced by XPath result)
function addTextXPath(thepath, addTextXPath, addTextTemplate)
{
	var allDivs, thisDiv, re;
	re = new RegExp("%XPATH%",'g');

	allDivs = xpath(thepath, document);
	for (var i = 0; i < allDivs.snapshotLength; i++)
	{
		thisDiv = allDivs.snapshotItem(i);
		thisDiv.innerHTML += addTextTemplate.replace(re, xpath(addTextXPath, thisDiv).snapshotItem(0).innerHTML);
	}
}

// return date in 'YYYY-MM-DD' format
function findCorrectDate()
{
	var today, datum, allTds, year, month, day, item, results;
	datum = "";

	allTds = xpath("//table[contains(@class,'TDForm') and tbody/tr[2]/td[1]/font[@class='ConnDesc']]/tbody/tr[2]/td[2][@align='right']", document);

	// find correct date on page
	if (allTds.snapshotLength == 1)
	{
		item = allTds.snapshotItem(0);
		results =  item.innerHTML.match(/^([0-9]{1,2})\.([0-9]{1,2})\.([0-9]{4})/); // e.g. ^(19.5.2008)

		if (results && results.length && results.length == 4)
		{
			day   = results[1];
			month = results[2];
			year  = results[3];

			datum = year + "-"
				+ ((month.length < 2) ? "0" + month : month) + "-"
				+ ((day.length < 2) ? "0" + day: day);
		}
	}
	
	if (datum == "")
	{
		// fallback - use today's date
		today = new Date();
		datum = today.getFullYear() + "-"
			+ (today.getMonth() < 9 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1) + "-"
			+ (today.getDate() < 10 ? "0" + today.getDate() : today.getDate());
	}
	return datum;
}

// find all abbr with incorrect date in title and put correct date there
function correctDate()
{
	var allAbbrs, thisAbbr, datum, time, results;

	datum = findCorrectDate();

	allAbbrs = xpath("//abbr[(contains(@class,'dtstart') or contains(@class,'dtend')) and starts-with(@title,'2000-01-01T')]", document);

	for (var i = 0; i < allAbbrs.snapshotLength; i++)
	{
		thisAbbr = allAbbrs.snapshotItem(i); 
		results = thisAbbr.getAttribute("title").match(/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}T([0-9]{1,2})(.*)$/); // e.g. "2008-05-15T17:36:00+02:00"

		if (results && results.length && results.length == 3)
		{
			time = (results[1].length < 2 ? "0" + results[1]: results[1]) + results[2]; // make sure hour has 2 digits
			thisAbbr.setAttribute("title", datum + "T" + time);
		}
	}
}

addClass("//table[contains(@class,'TDForm')]//tr[count(td)>6 and not(td[4]/b) and not(td[1]/input) and not(td[2]/form)]", "vevent"); // choose correct table carefully (no semantics in code 8-( )

addClass("//tr[contains(@class,'vevent')]/td[4]", "summary");
replaceText("//tr[contains(@class,'vevent')]/td[8]", "^([0-9]{1,2}):([0-9]{2})", "<abbr class=\"dtstart\" title=\"2000-01-01T\$1:\$2:00+02:00\">\$1:\$2</abbr>");
replaceText("//tr[contains(@class,'vevent')]/td[6]", "([0-9]{1,2}):([0-9]{2})$", "<abbr class=\"dtend\" title=\"2000-01-01T\$1:\$2:00+02:00\">\$1:\$2</abbr>");
replaceText("//td[contains(@class,'summary')]", "<br>", "<span style=\"display:none\">,&nbsp;</span><br>");

addTextXPath("//td[contains(@class,'summary')]", "..//*[@class='dtstart']", "<span style=\"display:none\"> - %XPATH%</span>");

correctDate();
