// ==UserScript==
// @name           AutoLikeBomb w/o Auto Wall Post
// @description    This is a script to Like Bomb one of your friends. That is, to "Like" everything on their profile page and flood them with notifications. A link will be displayed under their profile picture; if it does not, just click on any white space and it will appear. Now updated for the new Facebook page layout. This edited release disables the automatic wall post.
// @author         Mark ReCupido; edited by Vermiculus
// @namespace      AutoLikeBomb5000
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
		ProfileActions[0].innerHTML += "<li class=\"key-like\" id=\"navItem_likebomb\"><a class=\"item\"><span class=\"imgWrap\"><img src=\"http://sphotos.ak.fbcdn.net/hphotos-ak-ash1/hs756.ash1/164753_173691732654170_112795498743794_436922_8098719_n.jpg\"></i></span><span class=\"linkWrap\">Like Bomb</span> <span class=\"count hidden_elem\">(<span class=\"countValue fsm\">0</span><span class=\"maxCountIndicator\"></span>)</span></a><span class=\"loadingIndicator\"></span></li>";
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

				alert('Like Bomb Magnitude: ' + likeCount);
				likeCount = 0;
			}
				
           	}, false);
	}
}