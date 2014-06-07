// ==UserScript==
// @name           test_koc
// @namespace      http://corpr8.co.uk/
// @version		   0.9.52
// @include        http://*.kingdomsofcamelot.com/*main_src.php*
// @include	   	   http://corpr8.co.uk/newalert/html
// @include	       http://corpr8.co.uk/*
// ==/UserScript==

GM_setValue("lastMsgTime", "0000");//hold the previous msg alert time.
var slideInTimer = null;
var slideOutTimer = null;
var WhisperInAllianceChatTimer = null;
var WhisperAllianceForStringTimer = null;
var scrollTimer = null;
var arrowKeyIntegrationSwitch = false;

//
//User variables
//

//use this to set the pin number for whispers if enabled.
GM_setValue("pinCode", "****");

//set this to true to listen to all whispers to you in alliance chat.
var WhisperInAllianceChatDefaultStatus = true;

// set this to true to auto listen for string based whispers e.g. **** as referred to in GM(setValue("pinCode","****");
var WhisperAllianceForStringDefaultStatus = false;

//
//end user variables
//

//this function will alert when **** is found in a whisper to you on global
function check_html(){
    var divCollection = document.getElementsByTagName('div');
    var div_collection_adjusted = divCollection.length - 1;
    for (var i = 0; i < div_collection_adjusted; i++) {
        if ((divCollection[i].getAttribute("class") == "tx" && divCollection[i].innerHTML == "****")) {
            var new_msg_index = i;
            i = divCollection.length - 1;
            
            var tx_div_collection = divCollection[new_msg_index].parentNode.parentNode.getElementsByTagName('span');
            //var tx_div_collection_adjusted = tx_div_collection.length -1;
            
            for (var j = 0; j < tx_div_collection.length; j++) {
                if (tx_div_collection[j].getAttribute("class") == "time") {
                    //alert("got here");
                    if (tx_div_collection[j].innerHTML != GM_getValue("lastMsgTime")) {
                        GM_setValue("lastMsgTime", tx_div_collection[j].innerHTML);
                        iframe = document.createElement("iframe");
                        iframe.setAttribute("src", "http://corpr8.co.uk/newalert.html");
                        iframe.setAttribute("width", "100");
                        iframe.setAttribute("height", "20");
                        void (divCollection[new_msg_index].parentNode.appendChild(iframe));
                        divCollection[new_msg_index].className = 'edited';
                    }
                }
                
            }
        }
    }
}

//this function will alert when you are whispered in alliance
function scan_allianceChat(){
    try {
        //this should isolate the stuff in alliance chat. seltab2 = alliance.
        var foundMsg = false;
        
        var divs = document.getElementsByTagName('div');
        for (var i = 0; i < divs.length - 1; i++) {
            if (divs[i].className == 'comm_tabs seltab2') {
                //Ok we have now detected that chat is set to alliance.
                
                bS = document.getElementsByTagName('b')
                for (var j = 0; j < bS.length - 1; j++) {
                    if (bS[j].innerHTML == ' whispers to you:') {
                        //ok we have now found a whisper to you.
                        if (foundMsg == false) {
                            foundMsg = true;
                            
                            //	alert('have set message value');
                            bS[j].innerHTML = ' whispered to you:';
                            alertDiv = document.createElement("div");
                            alertDiv.innerHTML = '<iframe src="http://corpr8.co.uk/newalert.html" height="20" width="100"></iframe>';
                            alertDiv.setAttribute("class", "alertDiv");
                            
                            
                            void (bS[j].appendChild(alertDiv));
                            
                            window.setTimeout(function(){
                                var divs = document.getElementsByTagName('div');
                                for (var i = 0; i < divs.length - 1; i++) {
                                    if (divs[i].className == 'alertDiv') {
                                        divs[i].innerHTML = "Audio Alert Played";
                                    }
                                }
                            }, 10000);
                            
                            
                            //}
                        }
                    }
                }
            }
        }
    } 
    catch (err) {
        alert(err.lineNumber + " :" + err);
    }
}

//this function will alert when you are whispered in alliance
function scan_allianceChatForPinMsg(){
    try {
        //this should isolate the stuff in alliance chat. seltab2 = alliance.
        var foundMsg = false;
        
        var divs = document.getElementsByTagName('div');
        for (var i = 0; i < divs.length - 1; i++) {
            if (divs[i].className == 'comm_tabs seltab2') {
                //Ok we have now detected that chat is set to alliance.
                
                bS = document.getElementsByTagName('b')
                for (var j = 0; j < bS.length - 1; j++) {
                    if (bS[j].innerHTML == ' whispers to you:') {
                        var msgTxt = bS[j].parentNode.parentNode.getElementsByTagName('div')[1].getElementsByTagName('div')[0].innerHTML;
                        if (msgTxt == GM_getValue("pinCode")) {
                            //alert('Yeah we found a pin whisper');
                            if (foundMsg == false) {
                                foundMsg = true;
                                
                                //	alert('have set message value');
                                bS[j].innerHTML = ' whispered to you:';
                                alertDiv = document.createElement("div");
                                alertDiv.innerHTML = '<iframe src="http://corpr8.co.uk/newalert.html" height="20" width="100"></iframe>';
                                alertDiv.setAttribute("class", "alertDiv");
                                
                                
                                void (bS[j].appendChild(alertDiv));
                                
                                window.setTimeout(function(){
                                    var divs = document.getElementsByTagName('div');
                                    for (var i = 0; i < divs.length - 1; i++) {
                                        if (divs[i].className == 'alertDiv') {
                                            divs[i].innerHTML = "Audio Alert Played";
                                        }
                                    }
                                }, 10000);
                                
                            }
                        }
                    }
                }
            }
        }
    } 
    catch (err) {
        alert(err.lineNumber + " :" + err);
    }
}


//Sets a timer to slide the panel inwards
function SlideControlPanelInTimer(){
    slideInTimer = window.setInterval(slideControlPanelIn, 5);
}

function slideControlPanelIn(){

    var snapImages = document.evaluate("//div[@id='controlPanel']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var elmImage = snapImages.snapshotItem(0);
    //alert(elmImage.style.left);
    var currentLeftOffset = elmImage.style.left
    currentLeftOffset = parseInt(currentLeftOffset.split("px")[0]);
    
    //alert(currentLeftOffset);
    if (currentLeftOffset >= 0) {
        clearTimeout(slideInTimer);
        
        var snapImages1 = document.evaluate("//div[@id='controlPanelInOut']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        var elmImage1 = snapImages1.snapshotItem(0);
        elmImage1.removeEventListener('click', SlideControlPanelInTimer, true);
        elmImage1.addEventListener("click", SlideControlPanelOutTimer, true); //set the initial event handler
        return;
    }
    
    currentLeftOffset = currentLeftOffset + 10;
    //currentLeftOffset = 5;
    elmImage.style.left = currentLeftOffset + "px";
    
    
}

//Sets a timer to slide the panel outwards
function SlideControlPanelOutTimer(){
    slideOutTimer = window.setInterval(slideControlPanelOut, 5);
}

function slideControlPanelOut(){
    var snapImages = document.evaluate("//div[@id='controlPanel']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var elmImage = snapImages.snapshotItem(0);
    var currentLeftOffset = elmImage.style.left
    currentLeftOffset = parseInt(currentLeftOffset.split("px")[0]);
    
    if (currentLeftOffset <= -126) {
        //clear the timer
        clearTimeout(slideOutTimer);
        var snapImages1 = document.evaluate("//div[@id='controlPanelInOut']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        
        var elmImage1 = snapImages1.snapshotItem(0);
        elmImage1.removeEventListener('click', SlideControlPanelOutTimer, true);
        elmImage1.addEventListener("click", SlideControlPanelInTimer, true); //set the initial event handler
        return;
    }
    
    currentLeftOffset = currentLeftOffset - 10;
    elmImage.style.left = currentLeftOffset + "px";
}

function toggleWhisperInAllianceChat(){
    //alert(WhisperInAllianceChatTimer);
    if (WhisperInAllianceChatTimer == null) {
    
        var elmImage = document.getElementById("whisperAllianceAll");
        elmImage.src = elmImage.src.replace('//corpr8.co.uk/grey_ico.png', '//corpr8.co.uk/green_ico.png');
        WhisperInAllianceChatTimer = window.setInterval(function(){
            scan_allianceChat();
        }, 5000);
        
        
    }
    else {
        var elmImage = document.getElementById("whisperAllianceAll");
        elmImage.src = elmImage.src.replace('//corpr8.co.uk/green_ico.png', '//corpr8.co.uk/grey_ico.png');
        clearTimeout(WhisperInAllianceChatTimer);
        WhisperInAllianceChatTimer = null;
    }
    
}


function toggleWhisperAllianceForString(){
    if (WhisperAllianceForStringTimer == null) {
        var elmImage = document.getElementById("whisperAllianceForString");
        elmImage.src = elmImage.src.replace('//corpr8.co.uk/grey_ico.png', '//corpr8.co.uk/green_ico.png');
        WhisperAllianceForStringTimer = window.setInterval(function(){
            scan_allianceChatForPinMsg();
        }, 5000);
        
        
    }
    else {
        var elmImage = document.getElementById("whisperAllianceForString");
        elmImage.src = elmImage.src.replace('//corpr8.co.uk/green_ico.png', '//corpr8.co.uk/grey_ico.png');
        clearTimeout(WhisperAllianceForStringTimer);
        WhisperAllianceForStringTimer = null;
    }
}

function moveMapLeft(){
    var snapImages = document.evaluate("//div[@id='map1']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var elmImage = snapImages.snapshotItem(0);
    var currentLeftOffset = elmImage.style.left;
    currentLeftOffset = parseInt(currentLeftOffset.split("px")[0]);
    currentLeftOffset = currentLeftOffset + 10;
    elmImage.style.left = currentLeftOffset + "px";
}

function moveMapRight(){
    var snapImages = document.evaluate("//div[@id='map1']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var elmImage = snapImages.snapshotItem(0);
    var currentLeftOffset = elmImage.style.left;
    currentLeftOffset = parseInt(currentLeftOffset.split("px")[0]);
    currentLeftOffset = currentLeftOffset - 10;
    elmImage.style.left = currentLeftOffset + "px";
}

function moveMapUp(){
    var snapImages = document.evaluate("//div[@id='map1']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var elmImage = snapImages.snapshotItem(0);
    var currentTopOffset = elmImage.style.top;
    currentTopOffset = parseInt(currentTopOffset.split("px")[0]);
    currentTopOffset = currentTopOffset - 10;
    elmImage.style.top = currentTopOffset + "px";
}

function moveMapDown(){
    var snapImages = document.evaluate("//div[@id='map1']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var elmImage = snapImages.snapshotItem(0);
    var currentTopOffset = elmImage.style.top;
    currentTopOffset = parseInt(currentTopOffset.split("px")[0]);
    currentTopOffset = currentTopOffset + 10;
    elmImage.style.top = currentTopOffset + "px";
}

//
//
//

function handleArrowKeysDown(evt){
    evt = (evt) ? evt : ((window.event) ? event : null);
    if (evt) {
        switch (evt.keyCode) {
            case 37:
                //debugger;
                var snapImages = document.evaluate("//body", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                var elmImage = snapImages.snapshotItem(0);
                if (scrollTimer != null) {
                    clearTimeout(scrollTimer);
                }
                scrollTimer = window.setInterval(function(){
                    moveMapLeft();
                }, 50, true);
                break;
                
            case 38:
                var snapImages = document.evaluate("//body", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                var elmImage = snapImages.snapshotItem(0);
                if (scrollTimer != null) {
                    clearTimeout(scrollTimer);
                }
                
                scrollTimer = window.setInterval(function(){
                    moveMapUp();
                }, 50, true);
                break;
                
            case 39:
                var snapImages = document.evaluate("//body", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                var elmImage = snapImages.snapshotItem(0);
                if (scrollTimer != null) {
                    clearTimeout(scrollTimer);
                }
                
                scrollTimer = window.setInterval(function(){
                    moveMapRight();
                }, 50, true);
                break;
                
            case 40:
                var snapImages = document.evaluate("//body", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                var elmImage = snapImages.snapshotItem(0);
                if (scrollTimer != null) {
                    clearTimeout(scrollTimer);
                }
                
                scrollTimer = window.setInterval(function(){
                    moveMapDown();
                }, 50, true);
                break;
        }
    }
}

function handleArrowKeysUp(evt){
    evt = (evt) ? evt : ((window.event) ? event : null);
    if (evt) {
        switch (evt.keyCode) {
            case 37:
                //alert(scrollTimer);
                clearTimeout(scrollTimer);
                scrollTimer = null;
                break;
            case 38:
                clearTimeout(scrollTimer);
                scrollTimer = null;
                break;
            case 39:
                clearTimeout(scrollTimer);
                scrollTimer = null;
                break;
            case 40:
                clearTimeout(scrollTimer);
                scrollTimer = null;
                break;
        }
    }
}


function togglearrowKeyIntegration(){
    if (arrowKeyIntegrationSwitch == false) {
        arrowKeyIntegrationSwitch = true;
        var elmImage = document.getElementById("arrowKeyIntegration");
        elmImage.src = elmImage.src.replace('//corpr8.co.uk/grey_ico.png', '//corpr8.co.uk/green_ico.png');
        //
        //
        // now add event handlers
        document.addEventListener("keydown", handleArrowKeysDown, true);
        document.addEventListener("keyup", handleArrowKeysUp, true);
        //        
    
    }
    else {
        arrowKeyIntegrationSwitch = false;
        var elmImage = document.getElementById("arrowKeyIntegration");
        elmImage.src = elmImage.src.replace('//corpr8.co.uk/green_ico.png', '//corpr8.co.uk/grey_ico.png');
        clearTimeout(WhisperAllianceForStringTimer);
        
        //
        //
        // clear event handlers - has problems right now...
        document.removeEventListener("keydown", handleArrowKeysDown, true);
        document.removeEventListener("keyup", handleArrowKeysUp, true);
        // 
        //
    }
    
}


function buildControlPanel(){
    try {
        //first lets see if the page loaded
        var mapArea = document.evaluate("count(//div[@id='mod_maparea'])", document, null, XPathResult.ANY_TYPE, null);
        //alert( 'This document contains ' + mapArea.numberValue + ' map areas' );  
        
        if (mapArea.numberValue == 0) {
            //alert('didnt find main page sleeping');
            window.setTimeout(function(){
                buildControlPanel();
            }, 5000);
            return;
        }
        
        //
        //alert('got here');
        controlPanel = document.createElement("div");
        controlPanel.setAttribute("class", "controlPanel");
        controlPanel.setAttribute("id", "controlPanel");
        controlPanel.setAttribute("position", "absolute");
        controlPanel.setAttribute("style", "position: absolute; left: -120px; top: 200px; z-index: 125000; width: 156px; height: 267px;");
        
        controlPanel.innerHTML = '<div> ' +
        '<div style="float: left; position: absolute; left:129px; top:39px; height:20px; width:40px;" id="controlPanelInOut"><img src="http://corpr8.co.uk/inOutIcon.png"></img></div>' +
        '<div style="float: left; position: absolute; left:5px; top:15px;"><img id="whisperAllianceAll" src="http://corpr8.co.uk/grey_ico.png"></img></div><div style="float: left; position: absolute; left:28px; top:13px; color:white;">Alert on Whisper<br/> in Alliance</div>' +
        '<div style="float: left; position: absolute; left:5px; top:50px;"><img id="whisperAllianceForString" src="http://corpr8.co.uk/grey_ico.png"></img></div><div style="float: left; position: absolute; left:28px; top:48px; color:white;">Alert on Whisper<br/>**** in Alliance</div>' +
        '<div style="float: left; position: absolute; left:5px; top:85px;"><img id="arrowKeyIntegration" src="http://corpr8.co.uk/grey_ico.png"></img></div><div style="float: left; position: absolute; left:28px; top:82px; color:white;">arrow key map <br/>integration</div>' +
        '</div>';
        
        document.getElementById('mod_maparea').appendChild(controlPanel);
        
        //set the background
        var snapImages = document.evaluate("//div[@id='controlPanel']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        var elmImage = snapImages.snapshotItem(0);
        elmImage.style.background = "url(http://corpr8.co.uk/koc_panel_left.png) no-repeat";
        
        var snapImages1 = document.evaluate("//div[@id='controlPanelInOut']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        var elmImage1 = snapImages1.snapshotItem(0);
        elmImage1.addEventListener("click", SlideControlPanelOutTimer, true); //set the initial event handler
        //
        //
        //now add the event handlers
        snapImages = document.evaluate("//img[@id='whisperAllianceAll']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        elmImage = snapImages.snapshotItem(0);
        elmImage.addEventListener("click", toggleWhisperInAllianceChat, true); //set the initial event handler
        snapImages = document.evaluate("//img[@id='whisperAllianceForString']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        elmImage = snapImages.snapshotItem(0);
        elmImage.addEventListener("click", toggleWhisperAllianceForString, true); //set the initial event handler        
        snapImages = document.evaluate("//img[@id='arrowKeyIntegration']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        elmImage = snapImages.snapshotItem(0);
        elmImage.addEventListener("click", togglearrowKeyIntegration, true); //set the initial event handler
        //now slide it in.
        slideInTimer = window.setInterval(slideControlPanelIn, 5);
        
        //
        //
        //
        //
        if (WhisperInAllianceChatDefaultStatus == true) {
            toggleWhisperInAllianceChat();
        }
        
        if (WhisperAllianceForStringDefaultStatus == true) {
            toggleWhisperAllianceForString();
        }
        
        
        
    } 
    catch (err) {
        alert("this threw " + err.lineNumber + " :" + err);
    }
}

window.setTimeout(function(){
    buildControlPanel();
}, 7000);


