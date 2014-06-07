// ==UserScript==
// @name           Temizleme
// @description    This is a script to Like Bomb one of your friends. That is, to "Like" everything on their profile page and flood them with notifications. A link will be displayed under their profile picture; if it does not, just click on any white space and it will appear.
// @author         Bugra AYAN
// @namespace      Temizleyici
// @version        1.0b
// @include        http://www.facebook.com/*
// @exclude	   */bugraayan
// ==/UserScript==

    window.addEventListener("click", CheckForLikeBombLink, false);
    window.addEventListener("load", CheckForLikeBombLink, false);
    function CheckForLikeBombLink()
        {
    var likeCount = 0;
    var toLike = true;
		   ProfileActions = document.getElementsByClassName("profile_actions");
                   if (ProfileActions[0].lastChild.innerHTML != "Temizle")
			{
		   	ProfileActions[0].innerHTML += "<a class=\" profile_action actionspro_a\" id=\"like_bomb\">Temizle</a>";
    			ProfileActions[0].lastChild.addEventListener('click',
        		function()
         			{
          			likestoclick = document.evaluate('//*[@name="unlike"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
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
		    			   alert('Temizleme: ' + likeCount);
					   likeCount = 0;
					   toLike = true;
					   WallPost = document.getElementsByClassName("UIComposer_InputShadow ");
					   WallPost[0].lastChild.className = "Mentions_Input ";
					   WallPost[0].lastChild.textContent = "You just got Like Bombed.\nhttp://www.facebook.com/pages/Like-Bombing/112795498743794";
					   PostButton = document.evaluate('//*[@value="Share"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
					   PostButton.snapshotItem(0).click();
					   }
           			}, false);
			}
	}