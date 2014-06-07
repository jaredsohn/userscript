// ==UserScript==
// @name        BF3 Check GGC
// @namespace   bigt and nade
// @description clubhouse.ws
// @include     http://battlelog.battlefield.com/*
// @include     http://www.ggc-stream.com/search/server/wwo*
// @include     about:blank#CheckGGC*
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
    switch( currentStep ){
        case "":
            //visiting battlelog normally
            if(
                window.location.href.search("bf3/servers") != -1 &&        //on server browser screen
                window.location.href.search("bf3/servers/show/") == -1    //and not looking at single server
            ){
                putInIframes();
            }
            break;
        case "B":
            var fnd = document.body.innerHTML.search("Serverdata not available");
            if( fnd > -1 ){
                document.body.innerHTML = "<style>body{background-image:none;background-color:#ffffff;margin:0px;}</style><div style=\"color:#00FF00;font-weight:bold;font-family:Arial;font-size:11px;\">GCC OFF</div>";
            } else {
                document.body.innerHTML = "<style>body{background-image:none;background-color:#ffffff;margin:0px;}</style><div style=\"color:#FF0000;font-weight:bold;font-family:Arial;font-size:11px;\">GCC ON</div>";
            }
            break;
        case "C":
            POSTFormForGGC(getServerIP());
            break;
           
        default:
            alert("WAT DO? \"" + currentStep + "\"");
    }
}

function getServerIP(){
    var getIP = window.location.href;
    var findyVar = getIP.search("CheckGGC") + 9;
    getIP = getIP.substr(findyVar, 50);
    return getIP;
}

function putInIframes(){
    var servers = document.getElementsByClassName("serverguide-bodycells");
    for(var serverItr in servers){
    //for(var serverItr = 0; serverItr < 1; serverItr++){
        if(servers[serverItr].getElementsByTagName("div")[putIFrameInDiv].getElementsByTagName("iframe").length < 1){
            servers[serverItr].getElementsByTagName("div")[putIFrameInDiv].innerHTML += "<iframe width=\"60\" height=\"18\" style=\"float:right;position:relative; top:1px;right:30px;\" src=\"about:blank#CheckGGC:" + servers[serverItr].getAttribute("ip") + "\" scrolling=\"no\"></iframe>";
        }
    }
    setTimeout(putInIframes, 2000);
}

function iJackedThisPostFunct (postvars) {
    var myForm = document.createElement("form");
    myForm.method = "post";
    myForm.action = "http://www.ggc-stream.com/search/server/wwo#B";
    for (var k in postvars) {
        var myInput = document.createElement("input");
        myInput.setAttribute("name", k);
        myInput.setAttribute("value", postvars[k]);
        myForm.appendChild(myInput);
    }
    document.body.appendChild(myForm);
    myForm.submit();
    document.body.removeChild(myForm);
}

function POSTFormForGGC(serverIP){
    iJackedThisPostFunct(
        {
            server_id:'',
            ip:serverIP,
            port:25200,
            date:stupidDateFormat(),
            time:'00:00',
            interval:'1',
            submit:'Send'
        }
    );
}

function stupidDateFormat(){
    var currentTime = new Date();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();
   
    month += "";
    day += "";
   
    if( month.length < 2 )    month = "0" + month;
    if( day.length < 2 )    day = "0" + day;
   
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