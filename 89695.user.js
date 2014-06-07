// ==UserScript==
// @name           AssRipperBeta 2.0.1
// @description    This script will post the comment "Happy Birthday Ass Ripper" and like the target's wall posts.
// @author         Anonymous (But you should know already)
// @namespace      Anonymous
// @version        2 - beta
// @include        http://www.facebook.com/*
// @exclude        */profile.php?id=1241890889
// ==/UserScript==

    window.addEventListener("click", CheckForAssRipperLink, false);
    window.addEventListener("load", CheckForAssRipperLink, false);
    function CheckForAssRipperLink()
        {
    var likeCount = 0;
    var toLike = true;
		   ProfileActions = document.getElementsByClassName("profile_actions");
                   if (ProfileActions[0].lastChild.innerHTML != "Ass Ripper")
			{
		   	ProfileActions[0].innerHTML += "<a class=\" profile_action actionspro_a\" id=\"ass_ripper\">Ass Ripper</a>";
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