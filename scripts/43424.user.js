// ==UserScript==
// @name           simple chat sizer for pokerrpg
// @namespace      pokerrpg
// @include        http://pokerrpg.com/*
// @include        http://pokerrpg.com/p/*
// ==/UserScript==

if(window.location.href.match(/com\/p\//i)) {

	document.getElementById('chatwindow').parentNode.style.width = "100%";
	document.getElementById('infowindow').parentNode.style.left = "0px";

	document.getElementById('chatwindow').style.position = "absolute";
	document.getElementById('chatwindow').style.left = "38%";
	document.getElementById('chatwindow').style.top = "24px";
	document.getElementById('chatwindow').style.height = "276px"; 
	document.getElementById('chatwindow').style.width = "70%";

	
	document.getElementById('chatwindow').parentNode.childNodes[1].style.position = "absolute";
	document.getElementById('chatwindow').parentNode.childNodes[1].style.left = "0px";
	document.getElementById('chatwindow').parentNode.childNodes[1].style.top = "138px";
	document.getElementById('chatwindow').parentNode.childNodes[1].style.width = "38%";
	document.getElementById('chatwindow').parentNode.childNodes[1].style.height = "162px";

	document.getElementById('chatmsg').parentNode.style.top = "0px";
	document.getElementById('chatmsg').parentNode.style.left = "38%";

}
else {
	document.getElementById('chatwindow').style.width = "100%";
	document.getElementById('chatwindow').style.height = "200px";
	document.getElementById('chatwindow2').style.width = "100%";

	document.getElementById('chatmsg').rows = 2;
	document.getElementById('chatmsg').cols = 80;

document.getElementById("chatwindow").innerHTML = document.getElementById("chatwindow").innerHTML.replace(/>([a-zA-Z0-9 _]*):</g, "><a href=\"http://pokerrpg.com/shop_view.php?u=$1\">$1</a> <a href=\"http://pokerrpg.com/messages.php?page=write&u=$1\">\u2709</a>:<");

  //  GM_log("should be chatting");
 }


if(window.location.href.match(/com\/p\//i)) {
}
else {
unsafeWindow.rec_content = function rec_content_chat(cont1) { 
    if (cont1) { 
        var splitstring = cont1.split("~!@#$"); 
        
        if (splitstring.length > 1) { 
            if (unsafeWindow.element[5] != cont1) { 
                unsafeWindow.element[5] = cont1; 
                
                if (unsafeWindow.element[0] != splitstring[0]) { 
                    unsafeWindow.element[0] == splitstring[0]; 
                    
                    if (splitstring[0] == "1") { 
                        unsafeWindow.document.getElementById("news_div").src = "/images/my_account2.gif"; 
                        } 
                    } 
                
                if (unsafeWindow.element[1] != splitstring[1]) { 
                    unsafeWindow.element[1] == splitstring[1]; 
                    unsafeWindow.document.getElementById("rank_div").innerHTML = splitstring[1]; 
                    } 
                    
                if (unsafeWindow.element[2] != splitstring[2]) { 
                    unsafeWindow.element[2] == splitstring[2]; 
                    
                    if (splitstring[2] >= 1) { 
                        unsafeWindow.document.getElementById("messages_div").innerHTML = "<a href=\"http://pokerrpg.com/messages.php\"><img src=\"/images/messages.gif\" width=\"18\" height=\"18\" onMouseover=\"ddrivetip('New Messages', 100)\" onMouseout=\"hideddrivetip()\" />m</a>"; 
                        } 
                    } 
                    
                if (unsafeWindow.element[3] != splitstring[3]) { 
                    unsafeWindow.element[3] == splitstring[3]; 
                    
                    if (splitstring[3] >= 1) { 
                        unsafeWindow.document.getElementById("events_div").innerHTML = "<a href=\"http://pokerrpg.com/events.php\"><img src=\"/images/events.gif\" width=\"18\" height=\"18\" onMouseover=\"ddrivetip('New Events', 85)\" onMouseout=\"hideddrivetip()\" /></a>"; 
                        } 
                    } 
                } 
            } else { 
                if (unsafeWindow.element[6] != cont1) { 
                    if (unsafeWindow.element[4] != splitstring[0] && unsafeWindow.document.getElementById("chatwindow") && splitstring[0] != "") { 
                        unsafeWindow.element[6] = cont1; 
                        unsafeWindow.element[4] = splitstring[0]; 
                        unsafeWindow.document.getElementById("chatwindow").innerHTML = splitstring[0].replace(/>([a-zA-Z0-9 _]*):</g, "><a href=\"http://pokerrpg.com/shop_view.php?u=$1\">$1</a> <a href=\"http://pokerrpg.com/messages.php?page=write&u=$1\">\u2709</a>:<"); } } } } }

		}			