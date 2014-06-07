// ==UserScript==
// @name           FP User Titles
// @namespace      http://userscripts.org/users/61228
// @description    Adds user titles to sertain people.
// @include        http://*facepunch*.com/group.php?do=discuss*
// @include        http://*facepunch*.com/showthread.php?*
// @include        http://*facepunch*.com/showpost.php?*
// ==/UserScript==

var userA = [
    ["Joscpe", "I shat on your wife's chest."],
    ["Teh_Cheese", "I wanted a script and all I got was this magnificent title."],
    ["Hogarth", "Iron Giant was a great movie!"],
    ["7DeadlySyns", "I need more arrows!"],
    ["Poo Monst3r", "Risked his life for a shiny pole"]
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
}