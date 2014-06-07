// ==UserScript==
// @name           MeetMe - Auto Voter
// @description    This script will automatically vote for who the Vote Request was sent for when going to the VR page. If the "stringMatch" is present in the name it will vote for that person only (no matter who the request is for). If both  match, it doesn't vote so you can decide who to vote for. This will auto-run for the first 15 votes it encounters. Much more than that, it lags Firefox pretty bad so I recommend leaving the loops at 15.
// @copyright      2009,  Scott Royalty -- 2012, ninjaboy1989
// @license        GPL version 3 or later; http://www.gnu.org/copyleft/gpl.html
// @include        http://www.meetme.com/?mysession=
// @namespace      http://userscripts.org
// @version        1.0
// ==/UserScript==

// Change this to a string to check for in battler's names. If this partial name is present, and the vote request
// is against them it does not vote and allows you to decide yourself who to vote for.
var stringMatch = "300";

// battleItem class is each voting block.
var battleItems = document.evaluate("//div[@class='battleItem']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
// loops through the found battle items if any existed.
for (var i = 0; i < 15 /*battleItems.snapshotLength*/; i++)
{
	var theBattleItem = battleItems.snapshotItem(i);
	var voteForGreen = 0;
	var voteForBlue = 0;
	if ( (theBattleItem.innerHTML.indexOf("leftColor") != -1) )
	{
		var battleDivs = theBattleItem.getElementsByTagName("div");
		for (var h = 0; h < battleDivs.length; h++) 
		{
			var thisDiv = battleDivs[h];
			// First make sure the OTHER person is NOT a member of <String to Match>. If they are, we need to switch the vote unless
			// both are <String to Match>, then we do not submit auto. That way we can decide which member of <String to Match> to vote for :D
			if ( thisDiv.className.indexOf("rightBattler") != -1 )
			{
				// First, let's check for if they are a member of <String to Match> by finding the username div and scanning it.
				var userNames = thisDiv.getElementsByTagName("div");
				for (var j = 0; j < userNames.length; j++) 
				{
					var userName = userNames[j];
					if ( userName.className.indexOf("userName") != -1 )
					{
						if ( userName.innerHTML.indexOf(stringMatch) != -1 )
						{
							voteForBlue = 1;
						}
					}
				}

				if ( voteForBlue == 1 )
				{
					var rightVoteImages = thisDiv.getElementsByTagName("img");
					var voteWithThisOne = rightVoteImages[1];
					var voteOnClick = voteWithThisOne.getAttribute("onclick");
				
					var holder = document.createElement('div');
					holder.innerHTML = '<input onclick="' + voteOnClick + '" name="voteNowBlue" type="button" value="voteNow">';
					thisDiv.appendChild(holder);
				}
			}

			if ( thisDiv.className.indexOf("leftBattler") != -1 )
			{
				// First, let's check for if they are a member of <String to Match> by finding the username div and scanning it.
				var userNames = thisDiv.getElementsByTagName("div");
				for (var j = 0; j < userNames.length; j++) 
				{
					var userName = userNames[j];
					if ( userName.className.indexOf("userName") != -1 )
					{
						if ( userName.innerHTML.indexOf(stringMatch) != -1 )
						{
							voteForGreen = 1;
						}
					}
				}
				var rightVoteImages = thisDiv.getElementsByTagName("img");
				var voteWithThisOne = rightVoteImages[1];
				var voteOnClick = voteWithThisOne.getAttribute("onclick");
				
				var holder = document.createElement('div');
				holder.innerHTML = '<input onclick="' + voteOnClick + '" name="voteNowGreen" type="button" value="voteNow">';
				thisDiv.appendChild(holder);
				var myButton = thisDiv.getElementsByTagName("input");
				
				if ( voteForBlue == 0 )
				{
					myButton[0].click();
				}
			}
		}
	}
	else if ( (theBattleItem.innerHTML.indexOf("rightColor") != -1) )
	{
		var battleDivs = theBattleItem.getElementsByTagName("div");
		for (var h = 0; h < battleDivs.length; h++) 
		{
			var thisDiv = battleDivs[h];
			// First make sure the OTHER person is NOT a member of <String to Match>. If they are, we need to switch the vote unless
			// both are <String to Match>, then we do not submit auto. That way we can decide which member of <String to Match> to vote for :D
			if ( thisDiv.className.indexOf("leftBattler") != -1 )
			{
				// First, let's check for if they are a member of <String to Match> by finding the username div and scanning it.
				var userNames = thisDiv.getElementsByTagName("div");
				for (var j = 0; j < userNames.length; j++) 
				{
					var userName = userNames[j];
					if ( userName.className.indexOf("userName") != -1 )
					{
						if ( userName.innerHTML.indexOf(stringMatch) != -1 )
						{
							voteForGreen = 1;
						}
					}
				}

				if ( voteForGreen == 1 )
				{
					var leftVoteImages = thisDiv.getElementsByTagName("img");
					var voteWithThisOne = leftVoteImages[1];
					var voteOnClick = voteWithThisOne.getAttribute("onclick");
				
					var holder = document.createElement('div');
					holder.innerHTML = '<input onclick="' + voteOnClick + '" name="voteNowGreen" type="button" value="voteNow">';
					thisDiv.appendChild(holder);
				}
			}
			
			if ( thisDiv.className.indexOf("rightBattler") != -1 && voteForGreen == 0 )
			{
				// First, let's check for if they are a member of <String to Match> by finding the username div and scanning it.
				var userNames = thisDiv.getElementsByTagName("div");
				for (var j = 0; j < userNames.length; j++) 
				{
					var userName = userNames[j];
					if ( userName.className.indexOf("userName") != -1 )
					{
						if ( userName.innerHTML.indexOf(stringMatch) != -1 )
						{
							voteForBlue = 1;
						}
					}
				}

				var rightVoteImages = thisDiv.getElementsByTagName("img");
				var voteWithThisOne = rightVoteImages[1];
				var voteOnClick = voteWithThisOne.getAttribute("onclick");
				
				var holder = document.createElement('div');
				holder.innerHTML = '<input onclick="' + voteOnClick + '" name="voteNowBlue" type="button" value="voteNow">';
				thisDiv.appendChild(holder);
				var myButton = thisDiv.getElementsByTagName("input");

				if ( voteForGreen == 0 )
				{
					myButton[0].click();
				}				
			}
		}
	}
}