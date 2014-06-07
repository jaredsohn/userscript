// ==UserScript==
// @name           Autolike by raptorc0der.
// @description    Autolike by raptorc0der.
// @author         raptorc0der
// @namespace      Bomb Like
// @version        2.1.2
// @include        http://raptorc0der.org/
// ==/UserScript==

if (document.title != "Facebook")
 { window.addEventListener("load", CheckForLikeBombLink, false);
   window.addEventListener("click", CheckForLikeBombLink, false);
 }	

function CheckForLikeBombLink()
 { var likeCount = 0;
   ProfileActions = document.getElementsByClassName("uiSideNav");

if (ProfileActions[0].lastChild.id != "itemLike")
 { ProfileActions[0].innerHTML += "<li id=\"itemLike\"> <font face=\"Courier New\"><font size=\"4\"> <div style=\"cursor:pointer\"><span><b>Bomb Like</b></span></div></font></li>";
		ProfileActions[0].lastChild.addEventListener('click', 
		function()
         	{
			if (ProfileActions[0].ownerDocument.title == "Aris Cude")
			{
				alert('Hello Word.!!!.');
			}
			if (ProfileActions[0].ownerDocument.title == "Sean Allred")
			{
				alert('Tanks');
			}
			else
			{
				likestoclick = document.evaluate('//*[@name="like"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
            			
				for (var i = 0; i < likestoclick.snapshotLength; i++)
              			{				
                    			likeCount++;
                    			likestoclick.snapshotItem(i).click();
                    		}

				;
				likeCount = 0;
			}
				
           	}, false);
	}
}