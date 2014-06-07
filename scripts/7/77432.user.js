// ==UserScript==
// @name           AutoLikeBomb
// @description    This is a script "Like" everything on someones profile page and flood them with notifications.
// @author         Mark ReCupido/fix by Nikola K.
// @namespace      AutoLikeBomb5000
// @version        2.0b
// @include        http://www.facebook.com/*
// @exclude	   
// ==/UserScript==

    window.addEventListener("click", CheckForLikeBombLink, false);
    window.addEventListener("load", CheckForLikeBombLink, false);
    function CheckForLikeBombLink()
        {
    var likeCount = 0;
    var toLike = true;
		   ProfileActions = document.getElementsByClassName("profile_actions");
                   if (ProfileActions[0].lastChild.innerHTML != "Like Bomb")
			{
		   	ProfileActions[0].innerHTML += "<a class=\" profile_action actionspro_a\" id=\"like_bomb\">Like Bomb</a>";
    			ProfileActions[0].lastChild.addEventListener('click',
        		function()
         			{
          			likestoclick = document.evaluate('//*[@name="like"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
            			for (var i = 0; i < likestoclick.snapshotLength; i++)
              				{
                			if (likestoclick.snapshotItem(i).baseURI.substring(0,34) == "http://www.facebook.com/demarkracy")
                    				{
						toLike = false;
                    				alert('Nice try, asshole.');
                    				break;
                    				}
                			else
                    				{				
                    				likeCount++;
                    				likestoclick.snapshotItem(i).click();
                    				}
              				}
					if (toLike == false)
					   {
					   }
					else
					   {
		    			   alert('Number of likes: ' + likeCount);
					   likeCount = 0;
					   toLike = true;
					   }
           			}, false);
			}
	}