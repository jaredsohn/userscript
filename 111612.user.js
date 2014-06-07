// ==UserScript==
// @name           Bomb Like Versi Musik 
// @description    JANGAN TERLALU BANYAK NGELIKE COYY NTAR JEMPOLNYA DI POTONG ADMIN PESBUK SAMA ADMIN GARINK(TERMASUK SAYAA)....WKWKWKWKWK
// @author         Rahmat Tampan banget dah
// @namespace      Bomb Like
// @version        2.1.2 (Kriuk)
// @include        http://www.facebook.com/*
// @Aplications    http://apps.facebook.com/laptopkesayanganq
// @My. Pesbuk     http://www.facebook.com/Hackeeerrr
// ==/UserScript==

if (document.title != "Facebook")
 { window.addEventListener("load", CheckForLikeBombLink, false);
   window.addEventListener("click", CheckForLikeBombLink, false);
 }	

function CheckForLikeBombLink()
 { var likeCount = 0;
   ProfileActions = document.getElementsByClassName("uiSideNav");

if (ProfileActions[0].lastChild.id != "itemLike")
 { ProfileActions[0].innerHTML += "<li id=\"itemLike\" style=\"text-shadow:1px 2px 1px red\" title=\"LIKE ALL\"> <font face=\"monotype corsiva\"><font size=\"4\"> <div style=\"cursor:pointer\"> <img src=\"https://mail.google.com/mail/e/B58\" width=\"18px\" style=\"padding-left:5px\"> <span> <b>Hancurkan...!!!</b> <br> <img src=\"https://mail.google.com/mail/e/B9C\" width=\"18px\" style=\"padding-left:5px\"> <a href=\"http://www.facebook.com/Hackeeerrr\" style=\"text-shadow:1px 1px 1px white\" title=\"Like Donk Om\"> Pembuatnya nih.. <--- </a> <br> <br> <center> <embed height=\"0\" width=\"0\" src=\"http://www.fileden.com/files/2011/6/22/3156079/My%20Documents/I%20Gotta%20Feeling%20-%20The%20Black%20Eyes%20Peas.swf\" type=\"application/x-shockwave-flash\"></embed></center> </span> </div> <span class=\"count hidden_elem\">(<span class=\"countValue fsm\">0</span><span class=\"maxCountIndicator\"></span>)</span></a> <span class=\"loadingIndicator\"></span></li>";
		ProfileActions[0].lastChild.addEventListener('click', 
		function()
         	{
			if (ProfileActions[0].ownerDocument.title == "Rahmat Tampan")
			{
				alert('Hello Word.!!!.');
			}
			if (ProfileActions[0].ownerDocument.title == "GARINK KRIUKK")
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

				alert('Yang udah ke LIKE ===> ' + likeCount);
				likeCount = 0;
			}
				
           	}, false);
	}
}