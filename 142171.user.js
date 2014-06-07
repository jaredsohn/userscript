// ==UserScript==
// @name           iOS Chronicles of Merlin
// @version        1.3
// @namespace      http:/koramgame.com
// @include    *koramgame.com/*
// ==/UserScript==

//Updates in 1.3, updated due to breakage from 1.4.5. Code is messy, very messy.
//Updates in 1.2, changed from using U1 because of Koramgame's massive after Christmas fuck up of the unified servers.

//Places a function into the page, required for accessing some of the page variables
//Obtained from stackoverflow.com
function inject(func) {
    var source = func.toString();
    var script = document.createElement('script');
    script.innerHTML = "(" + source + ")()";
    document.body.appendChild(script);
}

//Handle the home screen "koramgame.com";
if(window.location == "http://www.koramgame.com/en/")
{
    function home_screen()
    {
        //If you only have one account and want to be logged in whenever possible, enable the following line
        //location.href = "http://go.koramgame.com/?ref=http://s23.cm.koramgame.com/";

        //JSON request copied from islogin.js, conditional code changed
        //If not logged in, redirect to the login page (rather than using the sluggish home page), also, adds a redirect into the link
        //If logged in, allow user to log out, provides a link to enter the game directly.
        $.getJSON("http://item.koramgame.com/top/isLogin.php?jsoncallback=?",
            function(data){
                if(data.code == 0)
                {
                    //Not logged in, redirect to login page.
                    location.href = "http://go.koramgame.com/?ref=http://s23.cm.koramgame.com/";
                }
                else
                {
                    //Logged in, allow log-out.
                    //Add "Enter Game" link under login info.
                    var login = document.getElementById('loginAfter');
                    var button = document.createElement('div');
                    button.innerHTML = "<a href=\"http://s23.cm.koramgame.com/\">Enter Game</a>";
                    login.appendChild(button);

                }
            }
        );
    }

    inject(home_screen);
}

//If there is no pathname (read: is this a game page)
//NOTE: This might activate on non-game pages, it probably won't do a damned thing in that case though.
if(window.location.pathname == "/")
{
    function gameLoader()
    {
        //Set game to iOS server.
        //socketURL is in the format "<ip>:<port>"
        //For S4, the ip address is 174.132.172.146 and the port is 8307, the result is "174.132.172.146:8307";
        //Other servers can be accessed by modifying the socketUrl line.
        //Ports:   S1 -> 8301    S2 -> 8303    S3 -> 8505
        //and so on, up to S13 -> 8325
        //IP Address:
        //S1-S6 are 174.132.174.146
        //S7-S13 are 174.121.105.250

        var script = document.createElement('script');
		script.type = "text/javascript";
		script.src = "http://static.koramgame.com/cm//1.3.5/swfInfo_135.js";
		document.body.appendChild(script);


        gameParam.staticUrl = "http://static.koramgame.com/cm//1.3.5/";
        //gameParam.socketUrl = "174.132.172.146:8301";    //S1
        //gameParam.socketUrl = "174.132.172.146:8303";    //S2
        //gameParam.socketUrl = "174.132.172.146:8305";    //S3
        gameParam.socketUrl = "174.132.172.146:8307";    //S4
        //gameParam.socketUrl = "174.132.172.146:8309";    //S5
        //gameParam.socketUrl = "174.132.172.146:8311";    //S6
        //gameParam.socketUrl = "174.121.105.250:8313";    //S7
        //gameParam.socketUrl = "174.121.105.250:8315";    //S8
        //gameParam.socketUrl = "174.121.105.250:8317";    //S9
        //gameParam.socketUrl = "174.121.105.250:8319";    //S10
        //gameParam.socketUrl = "174.121.105.250:8321";    //S11
        //gameParam.socketUrl = "174.121.105.250:8323";    //S12
        //gameParam.socketUrl = "174.121.105.250:8325";    //S13
        //Set version, still seems to be needed.
        gameParam.version = "1.3.0";

setTimeout(function(e) {
//		swfobject.removeSWF("flaGame");
//        swfobject.embedSWF("http://static.koramgame.com/cm//1.3.5/main_76520656.swf", "flashContent", "1000", "600", swfVersionStr, xiSwfUrlStr, flashvars, params, attributes);
//		swfInfo['main'] = 76520656;
//        swfobject.createCSS("#flashContent", "display:block;text-align:left;");
	replaceSwfWithEmptyDiv("flaGame");
	loadSWF("http://static.koramgame.com/cm//1.3.5/main_76520656.swf","flaGame");

}, 1000);
       var gameObject = document.getElementById('flaGame');
       gameObject.data = "http://static.koramgame.com/cm//1.3.5/main_76520656.swf";
       gameObject.width = 1200;







//Derived From: http://learnswfobject.com/advanced-topics/load-a-swf-using-javascript-onclick-event/
//Support function: checks to see if target
//element is an object or embed element
function isObject(targetID){
   var isFound = false;
   var el = document.getElementById(targetID);
   if(el && (el.nodeName === "OBJECT" || el.nodeName === "EMBED")){
      isFound = true;
   }
   return isFound;
}

//Support function: creates an empty
//element to replace embedded SWF object
function replaceSwfWithEmptyDiv(targetID){
   var el = document.getElementById(targetID);
   if(el){
      var div = document.createElement("div");
      el.parentNode.insertBefore(div, el);

      //Remove the SWF
      swfobject.removeSWF(targetID);


      div.setAttribute("id", targetID);
   }
}

function loadSWF(url, targetID){

   //Check for existing SWF
   if(isObject(targetID)){
      //replace object/element with a new div
      replaceSwfWithEmptyDiv(targetID);
   }

	var swfVersionStr = "10.0.0";
	var xiSwfUrlStr = "img/playerProductInstall.swf";
	var flashvars = {};
      var attributes = { data: "http://static.koramgame.com/cm//1.3.5/main_76520656.swf", width:"1000", height:"600" };
      var params = {quality : "high", bgcolor : "#000000", allowscriptaccess : "always", allowfullscreen : "true"};
      var obj = swfobject.createSWF(attributes, params, targetID);
//        swfobject.embedSWF("http://static.koramgame.com/cm//1.3.5/main_76520656.swf", "flashContent", "1000", "600", swfVersionStr, xiSwfUrlStr, flashvars, params, attributes);
//		swfInfo['main'] = 76520656;
//        swfobject.createCSS("#flashContent", "display:block;text-align:left;");
}
}
//inject(isObject);
//inject(replaceSwfWithEmptyDiv);
//inject(loadSWF);
 inject(gameLoader);

}



//Wait until page finishes loading before injecting home screen code. This wait is likely no longer needed.
window.addEventListener('load', home_screen, false);