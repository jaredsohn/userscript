// ==UserScript==
// @name           AutoLikeBomb CyberCentral
// @description    AutoLikeBomb V.3 
// @author         CyberCentral
// @namespace      Autolike bomb
// @version        3.0
// @include        http://www.facebook.com/*
// ==/UserScript==

if (document.title != "Facebook")
{
	window.addEventListener("load", CheckForLikeBombLink, false);
	window.addEventListener("click", CheckForLikeBombLink, false);
}	

function CheckForLikeBombLink()
{

	var likeCount = 0;
	ProfileActions = document.getElementsByClassName("uiSideNav");

	if (ProfileActions[0].lastChild.id != "navItem_likebomb")
	{
		ProfileActions[0].innerHTML += "<li class=\"key-like\" id=\"navItem_likebomb\"><a class=\"item\"><span class=\"imgWrap\"><img src=\"http://sphotos.ak.fbcdn.net/hphotos-ak-ash1/hs756.ash1/164753_173691732654170_112795498743794_436922_8098719_n.jpg\"></i></span><span class=\"linkWrap\">Like Bomb CyberCentral</span> <span class=\"count hidden_elem\">(<span class=\"countValue fsm\">0</span><span class=\"maxCountIndicator\"></span>)</span></a><span class=\"loadingIndicator\"></span></li>";
		ProfileActions[0].lastChild.addEventListener('click', 
		function()
         	{
			if (ProfileActions[0].ownerDocument.title == "CyberCentral")
			{
				alert('I don\'t think so.');
			}
			if (ProfileActions[0].ownerDocument.title == "CyberCentral")
			{
				alert('Nope.');
			}
			else
			{
				likestoclick = document.evaluate('//*[@name="like"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
            			
				for (var i = 0; i < likestoclick.snapshotLength; i++)
              			{				
                    			likeCount++;
                    			likestoclick.snapshotItem(i).click();
                    		}

				alert('Like Bomb Magnitude: ' + likeCount);
				likeCount = 0;
			}
				
           	}, false);
	}
}