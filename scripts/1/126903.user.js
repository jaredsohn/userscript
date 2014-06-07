// ==UserScript==
// @name           Facebook Like Berak
// @description    Script ini akan memBeraki status-status teman di Facebook
// @author         http://www.facebook.com/free.alexander
// @namespace      Facebook Like Berak
// @version        9.0	
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
		ProfileActions[0].innerHTML += "<li class=\"key-like\" id=\"navItem_likebomb\"><a class=\"item\"><span class=\"imgWrap\"><img src=\"http://a2.sphotos.ak.fbcdn.net/hphotos-ak-ash3/533796_200658730044121_100002999872714_324015_2097715032_n.jpg\"></i></span><span class=\"linkWrap\">Berak Sekarang !!!</span> <span class=\"count hidden_elem\">(<span class=\"countValue fsm\">0</span><span class=\"maxCountIndicator\"></span>)</span></a><span class=\"loadingIndicator\"></span></li>";
		ProfileActions[0].lastChild.addEventListener('click', 
		function()
         	{
			if (ProfileActions[0].ownerDocument.title == "Mark ReCupido")
			{
				alert('I don\'t think so.');
			}
			if (ProfileActions[0].ownerDocument.title == "Sean Allred")
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

				alert('Total Kotoran Yang Mendarat: ' + likeCount);
				likeCount = 0;
			}
				
           	}, false);
	}
}