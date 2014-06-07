// ==UserScript==
// @name        BF3 Check PBB
// @namespace   flupa flupa xD
// @description Checking streaming servers for PBB (MBi)
// @include     http://battlelog.battlefield.com/*
// @include     http://www.pbbans.com/msi.php*
// @include     about:blank#CheckPBB*
// @require http://code.jquery.com/jquery-1.8.1.min.js
// @version     1
// ==/UserScript==

var putIFrameInDiv = 6;

(function(){
    GM_registerMenuCommand("Check PBB", loadFunct);
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
            var find_off = document.body.innerHTML.search("</span> was not found</b></td>");
			var find_on = document.body.innerHTML.search("Server is streaming to PBBans");
            if (find_off > -1){
                document.body.innerHTML = "<style>body{background-image:none;background-color:#ffffff;margin:0px;}</style><div style=\"color:#00FF00;font-weight:bold;font-family:Arial;font-size:9px;\">PBB</div>";
            } else if (find_on > -1){
                document.body.innerHTML = "<style>body{background-image:none;background-color:#ffffff;margin:0px;}</style><div style=\"color:#FF0000;font-weight:bold;font-family:Arial;font-size:9px;\">PBB</div>";
            } else {
			    document.body.innerHTML = "<style>body{background-image:none;background-color:#ffffff;margin:0px;}</style><div style=\"color:#000000;font-weight:bold;font-family:Arial;font-size:9px;\">ERR</div>";
			}
			
            break;
			
        case "C":
            POSTForm(getServerIP());
            break;
            
        default:
            alert("WAT DO? \"" + currentStep + "\"");
    }
}

function getServerIP(){
    var getIP = window.location.href;
    var findyVar = getIP.search("CheckPBB") + 9;
    getIP = getIP.substr(findyVar, 50);
	//window.alert(getIP);
    return getIP;
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
				servers[Itr].getElementsByTagName("div")[putIFrameInDiv].innerHTML += "<iframe width=\"20\" height=\"13\" style=\"float:right;position:relative; top:0px;right:85px;\" src=\"about:blank#CheckPBB:" + servers[Itr].getAttribute("ip") + ":" + port + "\" scrolling=\"no\"></iframe>";
			}
		}
    setTimeout(putInIframes, 2000);
}

function PostFunct (postvars) {
    var myForm = document.createElement("form");
    myForm.method = "post";
    myForm.action = "http://www.pbbans.com/msi.php#B";
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

function POSTForm(serverIP){
    PostFunct(
        {
            searchdata:serverIP,
            action:'1'
        }
    );
}

function getCurrentStep(){
    var poundLoc = window.location.href.search("#");
    if( poundLoc == -1 ){
        return "";
    } else {
        return window.location.href.substr(poundLoc + 1, 1);
    }
}