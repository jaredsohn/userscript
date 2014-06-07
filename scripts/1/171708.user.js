// ==UserScript==
// @name           TF2R plus
// @author         keywc
// @description    A script for tf2r.com
// @version        2.5
// @include        http://tf2r.com/*
// @grant          none
// ==/UserScript==

// Rep refresh
var xhr = new XMLHttpRequest();

// Not on home page
if(document.URL != 'http://tf2r.com/news.html')
{
	if(getBoolFromLocalStorage('k_tf2r_bannerHiding'))
	{
		delShit(document.getElementsByClassName('mSuc nbg'));
		delShit(document.getElementsByClassName('mNeut nbg'));
	}
	
	// If ads are NOT enabled
	if(!getBoolFromLocalStorage('k_tf2r_ads'))
	{
		delShit(document.getElementsByClassName('adverts'));
	}
}

function delShit(uselessShit)
{
	for(var i=0;i<uselessShit.length;i++)
	{
		uselessShit[i].style.display = 'none';
	}
}

// On chat page
if(document.URL == 'http://tf2r.com/chat.html')
{
	// Removes twitch links, a bot posts those anyway
	if(getBoolFromLocalStorage('k_tf2r_twitchLinks'))
	{
		tryToRemove('fuckyournicechat');
		tryToRemove('fuckyournicechat2');
		tryToRemove('nicechat');
		tryToRemove('nicechat2');
	}

	// Replaces links to imgur and puush to actual images
	if(getBoolFromLocalStorage('k_tf2r_chatImages')) // if the settings set it to true (default)
	{
		setInterval(function() {
			links = document.getElementsByTagName('a');
			for(var i=0;i<links.length;i++)
			{
				var linksHref = links[i].href;
				if(linksHref + linksHref != linksHref.replace('http://puu.sh/', 'k') + linksHref.replace('http://i.imgur.com/', 'k'))
					{
					message = links[i].parentNode.innerHTML.toLowerCase();
					if(message + message + message == message.replace('nsfw', 'k') + message.replace('nsfl', 'k') + message.replace('gore', 'k'))
					{
						if(links[i].title != 'Loaded')
						{
							var imgLink = document.createElement('img');
							imgLink.src = linksHref;
							imgLink.style.maxWidth = '550px';
							imgLink.style.maxHeight = '300px';
							links[i].title = 'Loaded';
							links[i].innerHTML = '';
							links[i].appendChild(imgLink);
						}
					}
				}
			}
		}, 1000);
	}
}

// On settings page
if(document.URL == 'http://tf2r.com/settings.html')
{
	// Fixes CSS
	document.getElementsByClassName('welcome_font')[0].innerHTML = 'TF2R Plus settings';
	
	var mainDiv = document.getElementsByClassName('raffle_infomation')[0];
	mainDiv.innerHTML = '';
	
	createSetting('Raffle information', 'When enabled, the number of items and type of raffle (A21/1:1) shows up in raffles.', 'k_tf2r_raffleinfo');
	createSetting('Chat images', 'When enabled, puush and imgur links will be replaced by images.', 'k_tf2r_chatImages');
	createSetting('Link coloration', 'When enabled, most unvisited links will be colored. This is useful to see unvisited raffles or hidden links in raffle descriptions.', 'k_tf2r_linkColoration');
	createSetting('Link banner hiding', 'When enabled, blue banners will be hidden everywhere but on the news page.', 'k_tf2r_bannerHiding');
	createSetting('Twitch link hiding', 'When enabled, twitch links that are in the chat will be hidden.', 'k_tf2r_twitchLinks');
	createSetting('Advertisments', 'When disabled, ads will be hidden everywhere but on the news page. Please don\'t.', 'k_tf2r_ads');
	
}

// On my raffles page
if(document.URL == 'http://tf2r.com/my-raffles.html')
{
    document.getElementsByClassName('welcome_font')[1].innerHTML = 'My ' + document.getElementsByTagName('tbody')[0].getElementsByTagName('tr').length + ' raffles :';
}

// On my entries page
if(document.URL == 'http://tf2r.com/my-entries.html')
{
    document.getElementsByClassName('welcome_font')[1].innerHTML = 'My ' + document.getElementsByTagName('tbody')[0].getElementsByTagName('tr').length + ' entries :';
}


// On profile page
if(document.URL.split('/')[3] == 'user')
{
    // Fixes the rank progression because the tf2r staff will never do it
    currentRep = document.getElementsByClassName('participant_font upvb')[0].innerHTML.match(/\d+/g);
    var progression = 1;
    if(currentRep < 1000)
    {
        progression = currentRep / 1000;
    } else if(currentRep < 2500)
    {
        progression = (currentRep - 1000) / 1500;
    } else if(currentRep < 5000)
    {
        progression = (currentRep - 2500) / 2500;
    } else
    {
        progression = currentRep / 5000;
    }
    progression *= 100;
    
    // CSS that breaks every week
    var rankText = document.getElementsByTagName('td')[6].getElementsByTagName('div')[0].getElementsByTagName('div')[1];
    rankText.style.textAlign = 'center';
    rankText.style.color = '#EBE2CA';
    rankText.style.position = 'relative';
    rankText.style.top = '-18px';
    rankText.innerHTML = Math.round(progression) + '%';
    
    var rankBar = document.getElementsByTagName('td')[6].getElementsByTagName('div')[0].getElementsByTagName('div')[0];
    rankBar.innerHTML = 'I'; // spaces are ignored for some reason now
    if(progression > 100)
    {
        progression = 100;
    }
    rankBar.style.color = '#007300';
    rankBar.style.width = Math.round(progression) + '%';
	
	// Rep refreshing
	setInterval(refreshRep, 500);
}

// Fixes profile info (all pages)
var profileInfo = document.getElementsByClassName('profile_info');
if(profileInfo.length != 0)
{
	profileList = profileInfo[0].getElementsByTagName('a');
	// Fixes add friend link
	profileList[0].href = profileList[0].href.replace('http://steamcommunity.com/actions/AddFriend', 'steam://friends/add');
	// Fixes tf2b link (again)
	profileList[3].href = profileList[3].href.replace('http://tf2b.com/id/', 'http://tf2b.com/tf2/');
	// Removes old tf2rep link
	profileInfo[0].removeChild(profileList[2]);
}

// Colors unvisited raffle links in dark orange
if(getBoolFromLocalStorage('k_tf2r_linkColoration'))
{
	// Try "modern" javascript
	try {
		var customCss;
		customCss = document.createElement('style');
		customCss.type = 'text/css';
		document.getElementsByTagName('head')[0].appendChild(customCss);
		// Public raffles links
		customCss.innerHTML += '.pubrhead-text-right a:visited { color: #837768; } .pubrhead-text-right a:link { color: #FF6407; }';
		// Chat links
		customCss.innerHTML += '.ufmes a:visited { color: #837768; } .ufmes a:link { color: #FF6407; }';
	} catch (e) {
		if(!document.styleSheets.length)
		{
			document.createStyleSheet();
		}
		// Public raffles links
		document.styleSheets[0].cssText += '.pubrhead-text-right a:visited { color: #837768; } .pubrhead-text-right a:link { color: #FF6407; }';
		// Chat links
		document.styleSheets[0].cssText += '.ufmes a:visited { color: #837768; } .ufmes a:link { color: #FF6407; }';
	}
}

// On raffle page
if(document.getElementById('winc') != null)
{
	// MP3 Detection
	try
	{
		var flashThings = document.getElementsByTagName('object');
		
		for(var i=0;i<flashThings.length;i++)
		{
			if(flashThings[i].data == "http://tf2r.com/mp3player.swf")
			{
				// Get MP3 box
				var mp3box = flashThings[i].parentNode;
				
				// Get MP3 link
				var mp3raw = mp3box.getElementsByTagName('param')[1].value;
				var mp3url = mp3raw.split('=')[1].split('&')[0];
				
				// Add button
				var mp3button = document.createElement('input');
				mp3button.type = 'button';
				mp3button.value = 'Download';
				mp3button.onclick = function() { location.href = mp3url; };
				mp3box.appendChild(mp3button);
			}
		}
	} catch(e) {}
	
	var genuineItems = document.getElementsByClassName('item q1');
	var vintageItems = document.getElementsByClassName('item q3');
	var unusualItems = document.getElementsByClassName('item q5');
	var uniqueItems = document.getElementsByClassName('item q6');
	var strangeItems = document.getElementsByClassName('item q11');
	var hauntedItems = document.getElementsByClassName('item q13');
	var allItems = genuineItems.length + vintageItems.length + unusualItems.length + uniqueItems.length + strangeItems.length + hauntedItems.length;
	var winningChance = parseFloat(document.getElementById('winc').innerHTML.split('%')[0]);
	var entries = parseInt(document.getElementById("entry").innerHTML.split("/")[0]);
	if(entries > 1)
	{
		//var winners = Math.round(winningChance*entries/100);
		
		// Show 1:1 or A21
		// modifies raffle page. should not touch enter button.
		if(getBoolFromLocalStorage('k_tf2r_raffleinfo'))
		{
			raffleTitle = document.getElementsByClassName('hfont');
			var raffleType = document.createElement('div');
			raffleType.className = 'hfont';
			
			// Sometimes, it doesn't load automatically. In that case 10% is A21 and 100% is 1:1.
			if(winningChance == 10)
			{
				raffleType.innerHTML = 'All items to one person';
			}
			else if(winningChance == 100)
			{
				raffleType.innerHTML = 'Single item per person';
			}
			else if(Math.round(winningChance*entries/100) == 1)
			{
				raffleType.innerHTML = 'All items to one person';
			}
			else
			{
				raffleType.innerHTML = 'Single item per person';
			}
			
            raffleType.style = 'float: right; padding-right: 15px';
            raffleTitle[0].style = 'float: left';
			raffleTitle[0].parentNode.appendChild(raffleType);
	
			// Changes "items" to the actual number of items
			// Added security check since welcome_font can be enter button.
			raffleTexts = document.getElementsByClassName('welcome_font');
			for(var i=0;i<raffleTexts.length;i++)
			{
				if(raffleTexts[i].innerHTML == 'Items:')
				{
					raffleTexts[i].innerHTML = allItems + ' items :';
				}
			}
		}
	}
	
	// Rep refreshing
	setInterval(refreshRep, 500);
}

function createSetting(text, description, settingsKey)
{
	var mainDiv = document.getElementsByClassName('raffle_infomation')[0];
	
	var wrapperDiv = document.createElement('div');
	wrapperDiv.className = 'pentry';
	wrapperDiv.style.height = '90px';
	
	var boxp = document.createElement('p');
	boxp.style.textAlign = 'center';
	
	var textDiv = document.createElement('div');
	textDiv.className = 'hfont';
	textDiv.style.padding = '5px';
	textDiv.innerHTML = text;
	
	var descriptionDiv = document.createElement('div');
	descriptionDiv.fontFamily = '"Segoe UI", Tahoma, Sans-serif';
	descriptionDiv.innerHTML = description;
	
	var radioButtons = document.createElement('div');
	radioButtons.innerHTML = '<input type="radio" name="' + settingsKey +
			'" onclick="localStorage.setItem(\'' + settingsKey + "', 'true');\"" +
			'> Enabled <input type="radio" name="' + settingsKey + 
			'" onclick="localStorage.setItem(\'' + settingsKey + "', 'false');\"> Disabled";
	
	if(getBoolFromLocalStorage(settingsKey))
	{
		radioButtons.getElementsByTagName('input')[0].checked = 'true';
	}
	else
	{
		radioButtons.getElementsByTagName('input')[1].checked = 'true';
	}
	
	boxp.appendChild(textDiv);
	boxp.appendChild(descriptionDiv);
	boxp.appendChild(radioButtons);
	
	wrapperDiv.appendChild(boxp);
	mainDiv.appendChild(wrapperDiv);
}

function getBoolFromLocalStorage(varName)
{
	var foo = localStorage.getItem(varName);
	if(foo == null)
	{
		return true;
	}
	
	return ((foo == 'false') ? false : true);
}

function tryToRemove(id)
{
	try {
		document.getElementById(id).style.display = 'none';
	} catch(e) {}
}

function refreshRep()
{
	var profileURL = new String();
	
	if(document.URL.split('/')[3] == 'user')
	{
		profileURL = document.URL;
	}
	else
	{
		// not raffle_information...
		// first raffle_infomation is title, second is avatar
		profileURL = document.getElementsByClassName('raffle_infomation')[1].getElementsByTagName('a')[0].href;
	}
	
	xhr.onreadystatechange = function()
	{
		if(xhr.readyState == 4)
		{
			var xhrContent = document.createElement('div');
			xhrContent.innerHTML = xhr.responseText;
			
			var posBar = document.getElementsByClassName('participant_font upvb')[0];
			var negBar = document.getElementsByClassName('participant_font downvb')[0];
			
			var pos = xhrContent.getElementsByClassName('participant_font upvb')[0].innerHTML;
			var neg = xhrContent.getElementsByClassName('participant_font downvb')[0].innerHTML;
			
			if(document.getElementsByClassName('vbtn').length == 0) // if already voted or on profile page
			{
				if(pos != null)
				{
					posBar.innerHTML = pos;
				}
				
				if(neg != null)
				{
					negBar.innerHTML = neg;
				}
			}
		}
	};
	
	xhr.open("GET", profileURL);
	xhr.send();
}