// ==UserScript==
// @name           Like Bomb
// @description    Versi lain dari like mania yang kemarin saya buat.. hehe.. iseng iseng lagi dah..
// @author         Bindutz.
// @namespace      Like_Bom
// @version        1.0
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
		ProfileActions[0].innerHTML += "<li class=\"key-like\" id=\"navItem_likebomb\"><a class=\"item\"><span class=\"imgWrap\"><img src=\"http://www.webhostingtalk.com/images/smilies/bomb.gif\"></i></span><span class=\"linkWrap\">Like Bom :)</span> <span class=\"count hidden_elem\">(<span class=\"countValue fsm\">0</span><span class=\"maxCountIndicator\"></span>)</span></a><span class=\"loadingIndicator\"></span></li>";
		ProfileActions[0].lastChild.addEventListener('click', 
		function()
         	{
			if (ProfileActions[0].ownerDocument.title == "Bindutz Atmaja")
			{
				alert('I don\'t think so.');
			}
			if (ProfileActions[0].ownerDocument.title == "Like_Bom")
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