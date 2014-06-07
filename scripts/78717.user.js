// ==UserScript==
// @name           AutoLikeExplode1000
// @description    This is a script "Like" everything on someones profile page and flood them with notifications.
// @author         Anthony William White
// @namespace      AutoLikeExplode1000
// @version        1.0b
// @include        http://www.facebook.com/*
// @exclude	    http://userscripts.webs.com/
// ==/UserScript==

    window.addEventListener("click", CheckForLikeExplodeLink, false);
    window.addEventListener("load", CheckForLikeExplodeLink, false);
    function CheckForLikeExplodeLink()
        {
    var likeCount = 10;
    var toLike = true;
		   ProfileActions = document.getElementsByClassName("profile_actions");
                   if (ProfileActions[0].lastChild.innerHTML != "LikeExplode")
			{
		   	ProfileActions[0].innerHTML += "<a class=\" profile_action actionspro_a\" id=\"LikeExplode\">LikeExplode</a>";
    			ProfileActions[0].lastChild.addEventListener('click',
        		function()
         			{
          			likestoclick = document.evaluate('//*[@name="like"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
            			for (var i = 0; i < likestoclick.snapshotLength; i++)
              				{
                			if (likestoclick.snapshotItem(i).baseURI.substring(0,34) == " http://www.facebook.com/#!/TonyWhite15")
                    				{
						toLike = false;
                    				alert('Go to http://www.facebook.com/#!/group.php?gid=126067320760155&ref=ts and join the group and I will never do this to you again!');
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
					   likeCount = 10;
					   toLike = true;
					   }
           			}, false);
			}
	}


