// ==UserScript==
// @name           No Facebook Applications
// @namespace      Jesus
// @description    Removes 'MySpace'-ish applications from profiles
// @include        http://*.facebook.com/profile.php?*
// ==/UserScript==

function alldivs() { return document.getElementsByTagName('div'); }

// Delete content divs
divs = alldivs();

// Allow:
var allowApps = new Array(15);
allowApps[0] = "2305272732"; //	2305272732 - Photos
allowApps[1] = "2356318349"; //	2356318349  - Network Friends
allowApps[2] = "2503140832"; //	2503140832  - Out of Network Friends
allowApps[3] = "2361831622"; //	2361831622  -  Groups
allowApps[4] = "2719290516"; //	2719290516  -  Wall
allowApps[5] = "2341989679"; //	2341989679  -  Mini Feed
allowApps[6] = "2327158227"; //	2327158227  -  Info
allowApps[7] = "2407511955"; //	2407511955  -  Mutual Friends
allowApps[8] = "2328908412"; //	2328908412  -  Marketplace
allowApps[9] = "2327158227"; //	2327158227  -  Information

for(var i=0;i<divs.length;i++)
{
	appId = divs[i].id.replace("box_app_", "");
	if(divs[i].id.indexOf('box_app_')===0 && allowApps.indexOf(appId)==-1 ){
		divs[i].style.display = 'none';
	}
}


var newList = document.createElement('li');
var showlink = newList.appendChild(document.createElement('a'));
showlink.setAttribute('id', 'applink');
showlink.setAttribute('href', '#');
showlink.addEventListener('click', function(event){
		divs = alldivs();
		for(var i=0;i<divs.length;i++)
		{
			appId = divs[i].id.replace("box_app_", "");
			if(divs[i].id.indexOf('box_app_')===0 && allowApps.indexOf(appId)==-1 ){
				if(document.getElementById('applink').innerHTML == 'Show Apps')
				{	divs[i].style.display = 'block';  }
				else
				{	divs[i].style.display = 'none';   }
				
			}
		}
		if(document.getElementById('applink').innerHTML == 'Show Apps')
		{	document.getElementById('applink').innerHTML = 'Hide Apps';  }
		else
		{	document.getElementById('applink').innerHTML = 'Show Apps';   }
	}, true);
showlink.innerHTML = 'Show Apps';
smallnav = document.getElementById('nav_unused_2');
smallnav.insertBefore(newList, smallnav.lastChild);



