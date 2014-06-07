// ==UserScript==
// @name           FBAutoLike
// @description    This is a script to auto like.
// @author         arifhazwan
// @namespace      Auto Like
// @version        1.0a
// @include        http://www.facebook.com/*
// @exclude	   */amakak3ru
// ==/UserScript==

    window.addEventListener("click", checkForLike, false);
    window.addEventListener("load", checkForLike, false);
    function checkForLike()
        {
    var likeCount = 0;
    var toLike = true;
		   ProfileActions = document.getElementsByClassName("profile_actions");
                   if (ProfileActions[0].lastChild.innerHTML != "Auto Like")
			{
		   	ProfileActions[0].innerHTML += "<a class=\" profile_action actionspro_a\" id=\"auto_like\">Auto Like</a>";
    			ProfileActions[0].lastChild.addEventListener('click',
        		function()
         			{
          			likestoclick = document.evaluate('//*[@name="like"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
            			for (var i = 0; i < likestoclick.snapshotLength; i++)
              				{
                			if (likestoclick.snapshotItem(i).baseURI.substring(0,34) == "http://www.facebook.com/amakak3ru")
                    				{
						toLike = false;
                    				alert('Nice try.');
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
		    			   alert('Like Magnitude: ' + likeCount);
					   likeCount = 0;
					   toLike = true;
					   }
           			}, false);
			}
	}