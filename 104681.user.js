// ==UserScript==
// @name           DelayPass
// @namespace      jgoogle.jeffscript
// @description    The specified sites will be blocked until a randomized sentence of characters is inputted.
// @include        *
// ==/UserScript==



//--------------------------------------------------------blacklist
var blockedAddresses = [];
blockedAddresses[0] = "consumerist.com";
blockedAddresses[1] = "facebook.com";
blockedAddresses[2] = "twitter.com";
blockedAddresses[3] = "reddit.com";
blockedAddresses[4] = "torrentfreak.com";
blockedAddresses[5] = "rockpapershotgun.com";
blockedAddresses[6] = "joystiq.com";
//--------------------------------------------end of blacklist--------















//store current time
var dateObj = new Date();
var currentTime = dateObj.getTime();

var address = document.location.href;
//if this address is blocked, store the entry from the blacklist in this variable for later
var currentBlockedAddress = "";
//amount of time site is unblocked ( in ms)
var accessTimeWindow = 30 * 60 * 1000;

var block = 0;

for (var i=0; i<blockedAddresses.length; i++) {
	//check that blocked address is both IN the current address and hasn't already been blocked recently
	if( address.indexOf(blockedAddresses[i]) != -1 && parseInt(GM_getValue(blockedAddresses[i], 0)) + accessTimeWindow < currentTime) 
	{
		block++;
		currentBlockedAddress = blockedAddresses[i];
		break;
	}
}


	
	

if(block>0)
{ 
	/*amount of time to wait before revealing page, this is used as
	a time limit for entering the pass phrase, ensuring that no delayed
	page takes longer than this to be shown(just in case there's some slow typers)*/	
	var timeToWait = 30;
	
	
	
	
	(function(){
	
			

		window.allowAccess = function()
		{
			document.getElementById('jDelayPassScreen').style.display = 'none';
		}

		
		//create html elements
		var overlay = document.createElement('div');
			overlay.id = 'jDelayPassScreen';
			overlay.style.backgroundColor = '#000';
			overlay.style.color = '#FFF';
			overlay.style.fontSize = '18px';
			overlay.style.fontFamily = 'Helvetica, Arial, Sans';
			overlay.style.fontWeight = 'bold';
			overlay.style.textDecoration = 'none';
			overlay.style.position = 'absolute';
			overlay.style.top = '0px';
			overlay.style.left = '0px';
			overlay.style.width = '100%';
			overlay.style.height = document.body.clientHeight + 'px'; //'100%'; 
			overlay.style.paddingTop = '10px';
			overlay.style.paddingLeft = '10px';
			overlay.style.textAlign = 'left';
			overlay.style.zIndex = '10000'; 

		//instruction pane
			var instructions = document.createElement('div');
				instructions.id = "jDelayPassInstructions";
		//input field
			var inputField = document.createElement('input');
				inputField.id = "jDelayPassInput";
				inputField.type = "text";
				inputField.style.height = "40px";
				inputField.style.fontSize = "36px";
				inputField.style.fontWeight = "bold";
				inputField.style.border = "4px solid red";
		
		//add elements to page
			document.getElementsByTagName('body')[0].appendChild(overlay);
			document.getElementById('jDelayPassScreen').appendChild(instructions);
			document.getElementById('jDelayPassScreen').appendChild(inputField);

		//create the pass phrase
			var thePass = generatePass();
		//modify input field to accomodate pass phrase length
			inputField.style.width = thePass.length * 0.52 + "em";
		
		window.checkPass = function()
		{
			//update the overlay
				//find number of matching characters in user input
					var numMatching = inputMatchesPass(thePass);
				//illuminate correct pass phrase characters in place				
					var matchingPass = thePass.substr(0,numMatching);
					var notMatchingPass = thePass.substring(numMatching, thePass.length);
					var finalPass = "<div style='color:#77ff77; font-size:36px'>" + matchingPass + "<span style='color:red'>" + notMatchingPass + "</span></div>";
				//format last date the site was blocked
					var blockedDate = new Date(parseInt(GM_getValue(currentBlockedAddress,0)) + accessTimeWindow);
				//update overlay message and update the time left					
					var delayInfo = "<div style='font-size:36px'> This page has been set to be delayed</div>";
					delayInfo += "<div style='margin-bottom:10px'>This site was last blocked on: " + blockedDate + "</div>";
					delayInfo += "Enter this phrase to gain access" + finalPass;
					delayInfo += "or wait " + timeToWait + ((timeToWait != 1)? " seconds" : " second") + ".";
					//delayInfo += "<br/>" + numMatching + ":" + thePass.length;
					document.getElementById('jDelayPassInstructions').innerHTML = delayInfo;
					timeToWait -= 0.1;
					timeToWait = Math.round(timeToWait * 10) / 10;
			
			//check if we repeat, or end the overlay
			if (timeToWait >= 0 && numMatching < thePass.length)
			{
				
				setTimeout(window.checkPass, 100);
			}
			else
			{
				//stores this page's address and access time, to compare it to future addresses 
				//so that you aren't stuck with the overlay on EACH page, only each SITE
				GM_setValue(currentBlockedAddress, currentTime.toString());
				
				//highlight input box only if phrase was entered correctly
				var passMsg = "";
				if(numMatching == thePass.length)
				{
					inputField.style.border = "4px solid #77ff77";
					passMsg = "Pass phrase accepted!  Transferring...";
				}
				else
				{
					passMsg = "Times up!  Transferring...";
				}
				passMsg = "<div style='color:#77ff77; font-size:36px'>" + passMsg + "</div>";
				document.getElementById('jDelayPassScreen').innerHTML += passMsg;
				setTimeout(window.allowAccess, 1000);
			}
		}

		
		window.onload = checkPass();
		
	})();
	
	
}

//check if the input field matches the pass phrase
//counts the number of characters that match, stopping at the first difference

	function inputMatchesPass(thePass)
	{
		var inputFieldText = document.getElementById('jDelayPassInput').value;
		for(var i = 0; i < thePass.length; ++i)
		{
			if(inputFieldText.charAt(i) != thePass.charAt(i))
			{
				break;
			}
		}
		//return inputFieldText == thePass;
		return i;
	}
//generate the random pass sentence
	function generatePass()
	{
		var thePass = "";
		var validChars = "abcdefghijklmnopqrstuvwxyz";
		var passLength = 40;
		var wordLength = Math.random() * 4 + 3;
		
		for(var i = 0; i < passLength; ++i)
		{
			var randomCharPos = Math.min(Math.floor(Math.random() * (validChars.length)), validChars.length - 1);
			thePass += validChars.charAt(randomCharPos);
			
			//check if we need to insert a space for a 'word'
			//also dont allow spaces on the end or near the end of the sentence to prevent confusion
			if(--wordLength <= 0 && i < passLength - 4)
			{
				thePass += " ";
				++i;
				//++passLength;
				wordLength = Math.random() * 4 + 3;
			}
		}
		
		return thePass;
	}