// ==UserScript==
// @name           WAYT titles
// @namespace      http://www.facepunch.com/showthread.php?*
// @description    Adds user titles to WAYT regulars.
// @include        http://www.facepunch.com/group.php?do=discuss*
// @include        http://www.facepunch.com/showthread.php?*
// @include        http://www.facepunch.com/showpost.php?*
// ==/UserScript==

var userA = [
    ["MC3craze", "Designated master of the Gentlemen."],
    ["HARDCORERAPE", "Former Titty Kitty"],
    ["Joxalot", "Battle Droid!"],
    ["Hezzy", "Stand back or I'll ban you."],
    ["Sgt Doom", "A few gunmen short of a grassy knoll"],
    ["Bryanrocks01","I made Cartoon Network music videos"],
    ["Suttles", "Everybody hates me."],
    ["Zorlok", "I cann speel"],
    ["dcalde78", "I'm a meanie"],
    ["azure 505", "Physchonauts owns."],
    ["Nintendo-Guy", "gimme like 10 min and ill thino of something"],
    ["PrusseLusken", "I'm a girl; apparently"]
];

allUsers=document.getElementsByClassName("username");
for(var i=0; i < allUsers.length; i++){
	curUser = allUsers[i];
	if(curUser.nodeName == "DIV"){
			curUserURLs = curUser.parentNode.getElementsByTagName("a");
			curUserURL = curUserURLs[curUserURLs.length - 2];
            while(curUserURL.nodeType != 3){
                curUserURL = curUserURL.childNodes[0];
            }
		for(var u=0; u < userA.length; u++){
			var user = userA[u][0], msg = userA[u][1];
			if(curUserURL.nodeType == 3){
				if(curUserURL.nodeValue == user){
					var usrInfo = curUser.parentNode;
					
					usrMsgText = "<marquee><b>"+msg+"</b></marquee><br>"; //Comment to use FP's default usertitle style.
					usrMsg = document.createElement("div");
					//usrMsg.setAttribute("class", "usertitle"); //Un-comment to use FP's default usertitle style.
					usrMsg.setAttribute("id", "usertitle"); //Comment to use FP's default usertitle style.
					usrMsg.innerHTML = msg;                                           
					usrMsg.innerHTML = usrMsgText; //Comment to use FP's default usertitle style.
					
					usrInfo.insertBefore(usrMsg, curUser.nextSibling);
				}
			}
		}
	}
