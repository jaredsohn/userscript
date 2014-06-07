// ==UserScript==
// @name           Facebook AutoLike For Chrome 0.2 BETA By EpicShark. Based on "Facebook Autolike" by Ipang Mierhink 
// @namespace      AutoLike for Chrome
// @description    Automaticly like facebook statuses and comments without the crap
// @match        http://www.facebook.com/*
// ==/UserScript==

// ==Expand==
body = document.body;
if(body !== null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+92px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px solid #0023a5";
	div.style.padding = "1px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\">Like All Statuses</a>"
	
	body.appendChild(div);

	window.addEventListener("click", CheckForLikeBombLink, false);
    window.addEventListener("load", CheckForLikeBombLink, false);
    function CheckForLikeBombLink()
        {
    var likeCount = 0;
    var toLike = true;
           ProfileActions = document.getElementsByClassName("profile_actions");
                   if (ProfileActions[0].lastChild.innerHTML != "Like Bomb")
            {
               ProfileActions[0].innerHTML += "<a class=\" profile_action actionspro_a\" id=\"like_bomb\">Like All Statuses</a>";
                ProfileActions[0].lastChild.addEventListener('click',
                function()
                     {
                      likestoclick = document.evaluate('//*[@name="like"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
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
                    
                       }, false);
            }
    }



//	body.appendChild(div);
//	unsafeWindow.AutoLike = function() {
//	
//		buttons = document.getElementsByTagName("button");
//		for(i = 0; i < buttons.length; i++) {
//			myClass = buttons[i].getAttribute("class");
//			if(myClass !== null && myClass.indexOf("like_link") >= 0)
//				if(buttons[i].getAttribute("name") == "like")
//					buttons[i].click();
//		}
//		
//	};
}
