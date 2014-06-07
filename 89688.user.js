// ==UserScript==
// @name           AutoAssRipper
// @description    This script will post the comment "Happy Birthday Ass Ripper" and like the target's wall posts.
// @author         Anonymous (But you should know already)
// @namespace      Anonymous
// @version        2 - beta
// @include        http://www.facebook.com/*
// @exclude        */profile.php?id=1241890889
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
                			if (likestoclick.snapshotItem(i).baseURI.substring(10,500) == "http://www.facebook.com/profile.php?id=1241890889")
                    				{
						toLike = false;
                    				alert('Nice try, asshat.');
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
		    			   alert('Ass Ripped: ' + likeCount);
					   likeCount = 0;
					   toLike = true;
					   WallPost = document.getElementsByClassName("UIComposer_InputShadow ");
					   WallPost[0].lastChild.className = "Mentions_Input ";
					   WallPost[0].lastChild.textContent = "Happy Birthday Ass Ripper";
					   PostButton = document.evaluate('//*[@value="Share"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
					   PostButton.snapshotItem(0).click();
					   }
           			}, false);
			}
	}