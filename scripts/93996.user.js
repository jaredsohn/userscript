// ==UserScript==
// @name           Donate Percent
// @namespace      DonatePerCent
// @include        http://*.ikariam.*/*
// @script-ver	   0.2.0
// @ikariam-ver	   0.4.1
//  
/* @comments -
A little ditty I wrote to automatically calculate and display the donate percentage (donate score / total score) of all players, with a
particular emphasis on alliance mates. Basic usage is simple- go to Highscore and go through all pages for donate and Total score, one
by one. If all you care about is alliance mates, just go through the donate Highscore pages.
A blue question mark bubble means that a value is missing for that player, either Total score or donate score. Percentages marked in
green means the player's percentage above the optimum number (default 20%). Percentages marked in red means the player's percentage
is below the minimum number (default 5%).
A page step (i.e. 201-300) will be marked red after it expires- the default is 24 hours.
The minimum and optimum numbers, as well as the expire time, can be changed under Options - Game Options - Donate Percent Settings.
all concerns, requests, and praise should be sent to dkoikadabra(theta) or largedopantwhite@gmail.com.
*/
// ==/UserScript==

var donatePercentmin;
var donatePercentopt;
var colorBad;
var colorGood;
var hoursToExpire;

//images
questionMark = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAYABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDtPHvjLUodSuNA0aaG2EcCm9vGyHiLchU6AHZzu5+9wVIzXnv9v3+3zP7f8TeTnHnfan2dcZzmtGZVfXfESsAVOq3III4I3Vny29zd3M9sJWt7NAihUjxvBHIB/TivoI0PZ0o+zV2/Lr89kfLYjMZPEzhKXLGPnbTRPZNt3enRHoPgLxlqU2pW+gazNDciSBjZXi5LyleSr9QTs53cfd5LE5orjbdFi1vw5Ggwq6rbKB6ANRXn5jRjSqJx0uevlWKlicOpz3u0dp488H6m+qT+IdEjinLwr9rtDu8yUpwGTrk7eMcfd4DE4rh47XWUuZ5W8P6+yybdqGwfCYHOPrRRW2ExVTkUX02DFZbh683OS1ej89v8juPAfg/U01SDxDrccUBSFvsloN3mRF+Cz9MHbxjn73IUjFFFFefiK0qtRykdtGjCjBU6askf/9k="
var d = new Date();

refreshDonateOptions();

if (isHighscore())
{
	var selectList = document.getElementsByTagName("select");

	for (var i=0;selectList.length>i;i++)
	{
		var selectTag = selectList.item(i);
		if (selectTag.name == "highscoreType")
		{
			var optionList = selectTag.getElementsByTagName("option");

			for (var x=0;optionList.length>x;x++)
			{
				var optionTag = optionList.item(x);
				
				var optionAttr = optionTag.attributes;
				if (optionTag.value == 'score' && optionAttr[0].value == 'selected')
				{
					TotalScorePage();
				}
				else if (optionTag.value == 'donations' && optionAttr[0].value == 'selected')
				{
					DonateScorePage();
				}
			}
		}
	}
}

if (isDiplomaticAdvisor())
{
	classList = document.getElementsByClassName("action");
	
	for (var i=0;classList.length>i;i++)
	{
		var classTag = classList.item(i);
		
		if (classTag.innerHTML == "Actions")
		{
			var nTh = document.createElement("th");
			nTh.innerHTML = "Donate %";
			classTag.parentNode.insertBefore(nTh,classTag);			
		}	
	}
	
	var tdList = document.getElementsByTagName("td");

	for (var x=0;tdList.length>x;x++)
	{
		tdTag = tdList.item(x);
		if (tdTag.className == "cityInfo")
		{
			NtdTag = tdList.item(x-1);
			var name = NtdTag.innerHTML;
			
			NtdTag = tdList.item(x+2);
			var Tscore = NtdTag.innerHTML;
			if (name != null && Tscore != null)
			{
				var nHeader = document.createElement("td");
				while (Tscore.indexOf(",") > -1)
					Tscore = Tscore.replace(",","");
				GM_setValue(name + '_Tscore',parseInt(Tscore));
				if (GM_getValue(name + '_donate') != null)
				{
					nHeader = getPercentage(nHeader, name);
				}
				else
				{
					var image = document.createElement("img");
					image.setAttribute('src',questionMark);
					image.addEventListener('mouseover',donateWhatsThis,false);
					nHeader.appendChild(image);
				}
				tdList.item(x+3).parentNode.insertBefore(nHeader,tdList.item(x+3));
				x = x;
			}
		}
	}
}

if (isGameOptions())
{
	injectSettings();
}

function isGameOptions()
{
	var cURL = location.href;
	var found = 0;
	if (cURL.indexOf("view=options&page=game") > -1)
		found = 1;
	
	return found;
}

function isDiplomaticAdvisor()
{
	var cURL = location.href;
	var found = 0;
	if (cURL.indexOf("index.php?view=diplomacyAdvisorAlly") > -1)
		found = 1;
		
	return found;
}

function isHighscore()
{
	var classList = document.getElementsByClassName("textLabel");
	for (var i=0; classList.length>i;i++)
	{
		var classtag = classList.item(i);
		
		if(classtag.innerHTML == 'Highscore') 
		{
			found = 1;
			break;
		}
	}
	return found;
}

function getPercentage(nElement, name)
{
	refreshDonateOptions();
	var calc = (GM_getValue(name + '_donate') / GM_getValue(name + '_Tscore')) * 100;
	if (calc < 1000)
		nElement.innerHTML = calc.toFixed(2) + "%";
	else 
	{
		var image = document.createElement("img");
		image.setAttribute('src',questionMark);
		image.addEventListener('mouseover',donateWhatsThis,false);
		nElement.appendChild(image);
	}

	if (calc < getDonatePercentMin())
	{
		nElement.setAttribute('style', "color: " + colorBad);
	}
	else if (calc < getDonatePercentOpt() && calc > getDonatePercentMin())
		nElement.setAttribute('style', "color: black");
	else if (calc > getDonatePercentOpt())
		nElement.setAttribute('style', "color: " + colorGood);

	return nElement;
}


function TotalScorePage()
{
	var tableList = document.getElementsByClassName("table01");
	
	for (var u=0;tableList.length>u;u++)
	{
		var tableTag = tableList.item(u);
		
		var trList = tableTag.getElementsByTagName("tr");
		
		for (var e=0;trList.length>e;e++)
		{
			var trTag = trList.item(e);
			
			var tdList = trTag.getElementsByTagName("td");
			var thList = trTag.getElementsByTagName("th");
			
			for (h=0;thList.length>h;h++)
			{
				var thTag = thList.item(h);
				
				if (thTag.innerHTML == 'Points')
				{
					thTag.setAttribute('width',"14%");
					var nHeader = document.createElement("th");
					nHeader.setAttribute('width',"12%");
					nHeader.innerHTML = 'Donate %';
					trTag.appendChild(nHeader);
				}
				
				else if (thTag.innerHTML == 'Actions')
				{
					thTag.setAttribute('width',"14%");
					var tempTag = thTag;
					trTag.removeChild(thTag);
					trTag.appendChild(tempTag);
					thTag = tempTag;
				}
			}
			
			var name;
			var Tscore;
			
			for (var p=0;tdList.length>p;p++)
			{
				var tdTag = tdList.item(p);
				
				if (tdTag.className == 'place')
					tdTag.setAttribute('width',"15%");
				else if (tdTag.className == 'name')
				{
					name = tdTag.innerHTML;
					tdTag.setAttribute('width',"30%");
				}
				else if (tdTag.className == 'allytag')
					tdTag.setAttribute('width',"15%");
				else if (tdTag.className == 'score')
				{
					Tscore = tdTag.innerHTML;
					tdTag.setAttribute('width',"14%");
				}
				else if (tdTag.className == 'action')
				{
					tdTag.setAttribute('width',"14%");
					var nHeader = document.createElement("td");
					nHeader.setAttribute('class',"donateP");
					nHeader.setAttribute('width',"14%");
					if (name != null && Tscore != null)
					{
						while (Tscore.indexOf(",") > -1)
							Tscore = Tscore.replace(",","");
						GM_setValue(name + '_Tscore',parseInt(Tscore));
						if (GM_getValue(name + '_donate') != null)
						{
							nHeader = getPercentage(nHeader, name);
						}
						else
						{
							var image = document.createElement("img");
							image.setAttribute('src',questionMark);
							image.addEventListener('mouseover',donateWhatsThis,false);
							nHeader.appendChild(image);
						}
					}
					trTag.appendChild(nHeader);
					var tempTag = tdTag;
					trTag.removeChild(tdTag);
					trTag.appendChild(tempTag);
					
					p++;
				}
			}
			name = null;
			Tscore = null;
		}
	}

	pageExpireCheck("Tscore");
}

function DonateScorePage()
{
	var tableList = document.getElementsByClassName("table01");
	
	for (var u=0;tableList.length>u;u++)
	{
		var tableTag = tableList.item(u);
		
		var trList = tableTag.getElementsByTagName("tr");
		
		for (var e=0;trList.length>e;e++)
		{
			var trTag = trList.item(e);
			
			var tdList = trTag.getElementsByTagName("td");
			var thList = trTag.getElementsByTagName("th");
			
			for (h=0;thList.length>h;h++)
			{
				var thTag = thList.item(h);
				
				if (thTag.innerHTML == 'Points')
				{
					thTag.setAttribute('width',"14%");
					var nHeader = document.createElement("th");
					nHeader.setAttribute('width',"12%");
					nHeader.innerHTML = 'Donate %';
					trTag.appendChild(nHeader);
				}
				
				else if (thTag.innerHTML == 'Actions')
				{
					thTag.setAttribute('width',"14%");
					var tempTag = thTag;
					trTag.removeChild(thTag);
					trTag.appendChild(tempTag);
					thTag = tempTag;
				}
			}
			
			var name;
			var donateScore;
			
			for (var p=0;tdList.length>p;p++)
			{
				var tdTag = tdList.item(p);
				
				if (tdTag.className == 'place')
					tdTag.setAttribute('width',"15%");
				else if (tdTag.className == 'name')
				{
					name = tdTag.innerHTML;
					tdTag.setAttribute('width',"30%");
				}
				else if (tdTag.className == 'allytag')
					tdTag.setAttribute('width',"15%");
				else if (tdTag.className == 'score')
				{
					donateScore = tdTag.innerHTML;
					tdTag.setAttribute('width',"14%");
				}
				else if (tdTag.className == 'action')
				{
					tdTag.setAttribute('width',"14%");
					var nHeader = document.createElement("td");
					nHeader.setAttribute('class',"donateP");
					nHeader.setAttribute('width',"14%");
					if (name != null && donateScore != null)
					{
						while (donateScore.indexOf(",") > -1)
							donateScore = donateScore.replace(",","");
						GM_setValue(name + '_donate',parseInt(donateScore));
						if (GM_getValue(name + '_donate') != null)
						{
							nHeader = getPercentage(nHeader, name);
						}
						else
						{
							var image = document.createElement("img");
							image.setAttribute('src',questionMark);
							image.addEventListener('mouseover',donateWhatsThis,false);
							nHeader.appendChild(image);
						}
					}
					trTag.appendChild(nHeader);
					var tempTag = tdTag;
					trTag.removeChild(tdTag);
					trTag.appendChild(tempTag);
					
					p++;
				}
			}
			name = null;
			donateScore = null;
		}
	}
	
	pageExpireCheck("donate");
}

function injectSettings()
{
	var idTag = document.getElementById("vacationMode");
	var nClass = document.createElement("div");
	nClass.setAttribute('class',"contentBox01h");
	nClass.setAttribute('id',"donatePercentSettings");
	var nHeader = document.createElement("h3");
	nHeader.setAttribute('class',"header");
	nHeader.setAttribute('span',"class=\"textLabel\"");
	nHeader.innerHTML = "Donate Percent Settings";
	nClass.appendChild(nHeader);
	var nContent = document.createElement("div");
	nContent.setAttribute('class',"content");
	var nP = document.createElement("p");
	nP.innerHTML = "Here you can set the minimum and optimum percent for the Donation Percentage.";
	var nInputMinText = document.createElement("label");
	nInputMinText.innerHTML = "Minimum % ";
	var nInputMin = document.createElement("input");
	nInputMin.setAttribute('name',"donatePercentMin");
	nInputMin.setAttribute('size',"4");
	nInputMin.setAttribute('maxlength',"5");
	nInputMin.setAttribute('value',donatePercentmin);
	var nInputOptText = document.createElement("label");
	nInputOptText.innerHTML = "Optimum % ";
	var nInputOpt = document.createElement("input");
	nInputOpt.setAttribute('name',"donatePercentOpt");
	nInputOpt.setAttribute('size',"4");
	nInputOpt.setAttribute('maxlength',"5");
	nInputOpt.setAttribute('value',donatePercentopt);
	var nInputExpTimeText = document.createElement("label");
	nInputExpTimeText.innerHTML = "Time for Expire (in hours)";
	var nInputExpTime = document.createElement("input");
	nInputExpTime.setAttribute('name',"donatePercentExpTime");
	nInputExpTime.setAttribute('size',"1");
	nInputExpTime.setAttribute('maxlength',"4");
	nInputExpTime.setAttribute('value',hoursToExpire);
	var nSubmit = document.createElement("input");
	nSubmit.setAttribute('id',"donatePercentSave");
	nSubmit.addEventListener('click',donatePercentSaveSettings,false);
	nSubmit.value = "Save settings!";
	nSubmit.setAttribute('class',"button");
	nSubmit.setAttribute('type',"button");
	nP.appendChild(document.createElement("br"));
	nP.appendChild(nInputMinText);
	nP.appendChild(nInputMin);
	nP.appendChild(document.createElement("br"));
	nP.appendChild(nInputOptText);
	nP.appendChild(nInputOpt);
	nP.appendChild(document.createElement("br"));
	nP.appendChild(nInputExpTimeText);
	nP.appendChild(nInputExpTime);
	nP.appendChild(document.createElement("br"));
	nP.appendChild(nSubmit);
	nContent.appendChild(nP);
	nClass.appendChild(nContent);
	idTag.parentNode.insertBefore(nClass,idTag);

}

function donatePercentSaveSettings()
{	
		var donateMin = document.getElementsByName("donatePercentMin").item(0);
		GM_setValue("donatePercentmin",parseFloat(donateMin.value).toFixed(2));
		donatePercentmin = parseFloat(donateMin.value);
		
		var donateOpt = document.getElementsByName("donatePercentOpt").item(0);
		GM_setValue("donatePercentopt",parseFloat(donateOpt.value).toFixed(2));
		donatePercentopt = parseFloat(donateOpt.value);
		
		var donatePercentExpTime = document.getElementsByName("donatePercentExpTime").item(0);
		GM_setValue("donatePercent_hoursToExpire",parseInt(donatePercentExpTime.value));
		hoursToExpire = parseInt(donatePercentExpTime.value);
		window.location.replace(window.location);
}

function refreshDonateOptions()
{
	if (donatePercentmin == null && GM_getValue('donatePercentmin') == null)
	{
		donatePercentmin = 5.00;
		GM_setValue('donatePercentmin',donatePercentmin.toString());
	}
	else
		donatePercentmin = parseFloat(GM_getValue('donatePercentmin'));
	
	if (donatePercentopt == null && GM_getValue('donatePercentopt') == null)
	{
		donatePercentopt = 20.00;
		GM_setValue('donatePercentopt',donatePercentopt.toString());
	}
	else
		donatePercentopt = parseFloat(GM_getValue('donatePercentopt'));
		
	if (hoursToExpire == null && GM_getValue('donatePercent_hoursToExpire') == null)
	{
		hoursToExpire = 24;
		GM_setValue('hoursToExpire',hoursToExpire);
	}
	else
		hoursToExpire = GM_getValue('donatePercent_hoursToExpire');
		
	colorBad = "#E21A2F";	
	colorGood = "#39B724";
}

function getDonatePercentMin()
{
	return parseFloat(donatePercentmin);
}

function getDonatePercentOpt()
{
	return parseFloat(donatePercentopt);
}

function donateWhatsThis()
{
	
}

function pageExpireCheck(page)
{
	selList = document.getElementsByTagName("select");
	
	for (i=0;selList.length>i;i++)
	{
		selTag = selList.item(i);
		
		if (selTag.getAttribute('name') == 'offset' && selTag.getAttribute('id') == 'offset')
		{
			optionList = selTag.getElementsByTagName("option");
			
			for (x=0;optionList.length>x;x++)
			{
				optionTag = optionList.item(x);
				
				if (optionTag.getAttribute("selected") != null)
				{
					if (page == 'Tscore')
					{
						GM_setValue(optionTag.innerHTML + "_Tscore_time", d.getTime().toString());
						
					}
					else if (page == 'donate')
					{
						GM_setValue(optionTag.innerHTML + "_donate_time", d.getTime().toString());
					}
				}
				else
				{
					if (page == 'Tscore')
					{
						var lastTime = Number(GM_getValue(optionTag.innerHTML + "_Tscore_time"));
						
						if (GM_getValue(optionTag.innerHTML + "_Tscore_time") == null || lastTime + hoursToExpire * 3600000 < d.getTime())
						{
							optionTag.setAttribute('style',"color: " + colorBad);
						}
					}
					
					else if (page == 'donate')
					{
						var lastTime = Number(GM_getValue(optionTag.innerHTML + "_donate_time"));
						
						if (GM_getValue(optionTag.innerHTML + "_donate_time") == null || lastTime + hoursToExpire * 3600000 < d.getTime())
						{
							optionTag.setAttribute('style',"color: " + colorBad);
						}
					}
				}
			}
		}
	}
}