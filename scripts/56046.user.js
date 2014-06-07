// ==UserScript==
// @name                YOCC Format Test
// @namespace	        Coolperson1414
// @description	        Crazy Cool CC Theme!
// @include             http://www.casualcollective.com/*
// ==/UserScript==

logInCheck = document.getElementById('sb-selectors');
if(logInCheck) 
{


	function runCCPlus_page() 
	{

		var upperlTabs = document.getElementById('sb-selectors')

		upperlTabs.childNodes[1].childNodes[1].innerHTML = 'Friends'
		upperlTabs.childNodes[3].childNodes[1].innerHTML = 'Guilds'
		upperlTabs.childNodes[5].childNodes[1].innerHTML = 'Alliance'
		upperlTabs.childNodes[7].childNodes[1].innerHTML = 'Scores'





		var onPage = window.location.hash.replace('#', '').split('?')[0].split('/')
		

		if (onPage[0] == 'clubs' && onPage[1] != '' && onPage[1] != undefined)
		{

			var groupMenuLeft = document.getElementById('pagecontent').firstChild.firstChild.firstChild
			var groupMenuRight = document.getElementById('pagecontent').firstChild.firstChild
			
			groupMenuLeft.firstChild.firstChild.innerHTML = "Guild Home"
			groupMenuLeft.childNodes[1].firstChild.innerHTML = "Communication"
			groupMenuLeft.childNodes[2].firstChild.innerHTML = "Brethren"
		

			if (groupMenuRight.childNodes[1].className == "but but-red g-rightlink")
			{
				groupMenuRight.childNodes[1].firstChild.firstChild.innerHTML = "Leaveth Guild"
				groupMenuRight.childNodes[2].firstChild.firstChild.innerHTML = "Sendeth Invite"
				groupMenuRight.childNodes[3].firstChild.firstChild.innerHTML = "Chat"
			}
			
			else
			{
				groupMenuRight.childNodes[1].firstChild.firstChild.innerHTML = "Join Guild"
			}
			

		}
	}







	var ajaxloadHide = unsafeWindow.ccHistory.hideLoad

	unsafeWindow.ccHistory.hideLoad = function()
	{
		window.setTimeout(function() {runCCPlus_page()}, 50) // Give enough time for page to update
		return ajaxloadHide.apply(unsafeWindow.ccHistory)
	}
}

