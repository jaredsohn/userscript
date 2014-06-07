// ==UserScript==
// @name        BF3 Check GGC
// @namespace   flupa flupa xD
// @description Checking streaming servers for GGC
// @include     http://battlelog.battlefield.com/*
// @include     http://www.ggc-stream.com/search/server/wwo*
// @include     about:blank#CheckGGC*
// @require     http://code.jquery.com/jquery-1.8.1.min.js
// @version     1
// ==/UserScript==

var putIFrameInDiv = 6;

(function(){
    GM_registerMenuCommand("Check GGC", loadFunct);
    unsafeWindow.onload = function(){
        setTimeout(loadFunct, 100);
    }
})();

function loadFunct(){

    var currentStep = getCurrentStep();
	
    switch (currentStep) {
              
        case "":
            if (
                window.location.href.search("bf3/servers") != -1 &&
                window.location.href.search("bf3/servers/show/") == -1
            ) 
			{ putInIframes(); }			

            break;
			
        case "B":
            var find_off = document.body.innerHTML.search("Serverdata not available");
			var find_on = document.body.innerHTML.search("Server View");
            if (find_off > -1){
                document.body.innerHTML = "<style>body{background-image:none;background-color:#ffffff;margin:0px;}</style><div style=\"color:#00FF00;font-weight:bold;font-family:Arial;font-size:9px;\">GGC</div>";
            } else if (find_on > -1){
                document.body.innerHTML = "<style>body{background-image:none;background-color:#ffffff;margin:0px;}</style><div style=\"color:#FF0000;font-weight:bold;font-family:Arial;font-size:9px;\">GGC</div>";
            } else {
			    document.body.innerHTML = "<style>body{background-image:none;background-color:#ffffff;margin:0px;}</style><div style=\"color:#000000;font-weight:bold;font-family:Arial;font-size:9px;\">ERR</div>";
			}
			
            break;
			
        case "C":
            POSTForm(getServerIP(), getPort());
            break;
            
        default:
            alert("WAT DO? \"" + currentStep + "\"");
    }
}

function getServerIP(){
    var getIP = window.location.href;
    var findyVar = getIP.search("CheckGGC") + 14;
    getIP = getIP.substr(findyVar, 50);
	window.alert(getIP);
    return getIP;
}

function getPort(){
    var p = window.location.href;
    var findyVar = p.search("CheckGGC") + 9;
    p = p.substr(findyVar, 5);
	window.alert(p);
    return p;
}

function putInIframes(){
    var servers = document.getElementsByClassName("serverguide-bodycells");
	var forms = document.getElementsByClassName("serverguide-join-server base-no-ajax");
    
	for (var Itr in servers){
			if (servers[Itr].getElementsByTagName("div")[putIFrameInDiv].getElementsByTagName("iframe").length < 1){
				url = forms[Itr].getAttribute("action");
                var port;				
                $.ajax({
				        async: false,
						url: "http://battlelog.battlefield.com" + url,
						success: function(data) {						
						port = $(data).find('input[name="gameport"]').val();
						}
						});  										
				servers[Itr].getElementsByTagName("div")[putIFrameInDiv].innerHTML += "<iframe width=\"20\" height=\"13\" style=\"float:right;position:relative; top:0px;right:85px;\" src=\"about:blank#CheckGGC:" + port + servers[Itr].getAttribute("ip") + "\" scrolling=\"no\"></iframe>";
			}
		}
    setTimeout(putInIframes, 2000);
}

function PostFunct (postvars) {
    var myForm = document.createElement("form");
    myForm.method = "post";
    myForm.action = "http://www.ggc-stream.com/search/server/wwo#B";
    for (var j in postvars) {
        var myInput = document.createElement("input");
        myInput.setAttribute("name", j);
        myInput.setAttribute("value", postvars[j]);
        myForm.appendChild(myInput);
    }
    document.body.appendChild(myForm);
    myForm.submit();
    document.body.removeChild(myForm);
}

function POSTForm(serverIP, port){
    PostFunct(
        {
            server_id:'',
            ip:serverIP,
            port:port,
            date:dateFormat(),
            time:'00:00',
            interval:'1'
        }
    );
}

function dateFormat(){
    var currentTime = new Date();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();
   
    month += "";
    day += "";
   
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
   
    return year + "-" + month + "-" + day;
}

function getCurrentStep(){
    var poundLoc = window.location.href.search("#");
    if( poundLoc == -1 ){
        return "";
    } else {
        return window.location.href.substr(poundLoc + 1, 1);
    }
}