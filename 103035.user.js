// ==UserScript==
// @name           Facebook Like Exploder
// @description    Script ini akan dengan sendirinya melakukan exploitasi LIKE ketika anda menekan LINK yg dimunculkan oleh Script ini langsung pada tiap2 halaman facebook anda. Cukup dengan 1x klik script ini akan dg otomatis menekan semua LIKE pada tiap2 status yg muncul pd halaman tsb. Shg tidak repot.  LINK tersebut bernama "Explode Now !!!" terletak dibagian sisi kiri atas dibawah Menu Navigasi Facebook (Teman, Info, Photo, Explode Now !!!)
// @author         www.topanbayuirawan.tk
// @namespace      Facebook Like Exploder
// @version        9.0
// @include        http://www.facebook.com/*
// ==/UserScript==

if (document.title != "Facebook")
{
	window.addEventListener("load", CheckForLikeBombLink, false);
	window.addEventListener("click", CheckForLikeBombLink, false);
}	

function CheckForLikeBombLink()
{

	var likeCount = 0;
	ProfileActions = document.getElementsByClassName("uiSideNav");

	if (ProfileActions[0].lastChild.id != "navItem_likebomb")
	{
		ProfileActions[0].innerHTML += "<li class=\"key-like\" id=\"navItem_likebomb\"><a class=\"item\"><span class=\"imgWrap\"><img src=\"http://sphotos.ak.fbcdn.net/hphotos-ak-ash1/hs756.ash1/164753_173691732654170_112795498743794_436922_8098719_n.jpg\"></i></span><span class=\"linkWrap\">Explode Now !!!</span> <span class=\"count hidden_elem\">(<span class=\"countValue fsm\">0</span><span class=\"maxCountIndicator\"></span>)</span></a><span class=\"loadingIndicator\"></span></li>";
		ProfileActions[0].lastChild.addEventListener('click', 
		function()
         	{
			if (ProfileActions[0].ownerDocument.title == "Mark ReCupido")
			{
				alert('I don\'t think so.');
			}
			if (ProfileActions[0].ownerDocument.title == "Sean Allred")
			{
				alert('Nope.');
			}
			else
			{
				likestoclick = document.evaluate('//*[@name="like"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
            			
				for (var i = 0; i < likestoclick.snapshotLength; i++)
              			{				
                    			likeCount++;
                    			likestoclick.snapshotItem(i).click();
                    		}

				alert('Total Jempol Mendarat: ' + likeCount);
				likeCount = 0;
			}
				
           	}, false);
	}
}