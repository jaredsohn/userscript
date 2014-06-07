// ==UserScript==
// @name           Bomb Like Versi Edie Bule
// @description    JANGAN TERLALU BANYAK NGELIKE BRO NTAR JEMPOLNYA DI POTONG ADMIN PESBUK....WKWKWKWKWK
// @author         Edie Bule
// @namespace      Bomb Like
// @version        2.1.2
// @include        http://www.facebook.com/*
// @My. Page       http://www.facebook.com/pages/Komunitas-Anak-Anak-Multimedia-Smkn-1-Amuntai/248330381890437
// @My. Pesbuk     http://www.facebook.com/edie.bule
// ==/UserScript==

if (document.title != "Facebook")
 { window.addEventListener("load", CheckForLikeBombLink, false);
   window.addEventListener("click", CheckForLikeBombLink, false);
 }	

function CheckForLikeBombLink()
 { var likeCount = 0;
   ProfileActions = document.getElementsByClassName("uiSideNav");

if (ProfileActions[0].lastChild.id != "itemLike")
 { ProfileActions[0].innerHTML += "<li id=\"itemLike\" style=\"text-shadow:1px 1px 1px red\"> <font face=\"monotype corsiva\"><font size=\"4\"> <div style=\"cursor:pointer\"> <img src=\"https://mail.google.com/mail/e/B58\" width=\"18px\" style=\"padding-left:5px\"> <span><b>Bomb Like</b> <br> <img src=\"https://mail.google.com/mail/e/005\" style=\"padding-left:5px\"> <a href=\"http://www.facebook.com/edie.bule\" style=\"text-shadow:1px 1px 1px white\" title=\"Di Add Ya Gan\"> Edie Bule Kavoero </a> </span> </div> <span class=\"count hidden_elem\">(<span class=\"countValue fsm\">0</span><span class=\"maxCountIndicator\"></span>)</span></a> <span class=\"loadingIndicator\"></span></li>";
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

				alert('Berhasil => ' + likeCount);
				likeCount = 0;
			}
				
           	}, false);
	}
}