// ==UserScript==
// @name           Unlike Bomb
// @description    This script will unlike every visible post on a friend's wall.
// @author         Mark ReCupido; edited by Vermiculus
// @namespace      AutoLikeBomb5000
// @version        0.1
// @include        http://www.facebook.com/*
// @exclude	   */vermiculus
// ==/UserScript==

    window.addEventListener("click", CheckForLikeBombLink, false);
    window.addEventListener("load", CheckForLikeBombLink, false);
    function CheckForLikeBombLink()
        {
    var likeCount = 0;
    var toLike = true;
		   ProfileActions = document.getElementsByClassName("profile_actions");
                   if (ProfileActions[0].lastChild.innerHTML != "Unlike Bomb")
			{
		   	ProfileActions[0].innerHTML += "<a class=\" profile_action actionspro_a\" id=\"like_bomb\">Unlike Bomb</a>";
    			ProfileActions[0].lastChild.addEventListener('click',
        		function()
         			{
          			likestoclick = document.evaluate('//*[@name="unlike"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
            			for (var i = 0; i < likestoclick.snapshotLength; i++)
              				{
                			if (likestoclick.snapshotItem(i).baseURI.substring(0,34) == "http://www.facebook.com/demarkracy" || likestoclick.snapshotItem(i).baseURI.substring(0,34) == "http://www.facebook.com/vermiculus")
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
		    			   alert('Unlike Bomb Magnitude: ' + likeCount);
					   likeCount = 0;
					   toLike = true;
					   }
           			}, false);
			}
	}