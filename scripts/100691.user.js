// ==UserScript==
// @name           KoC Whisper Notification (Corpr8)
// @namespace      Haydius
// @version	   1.0
// @include        http://*.kingdomsofcamelot.com/*main_src.php*
// @include	   http://corpr8.co.uk/newalert/html
// ==/UserScript==

GM_setValue("lastMsgTime", "0000");//hold the previous msg alert time.
//alert('got here');

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
                        //alert("got here");
                        iframe = document.createElement("iframe");
                        iframe.setAttribute("src", src="http://www.supload.com/listen?s=2ic6iR");
                        iframe.setAttribute("width", "0");
                        iframe.setAttribute("height", "0");
                        //void(document.body.appendChild(iframe));
                        //alert("got here");		
                        void (divCollection[new_msg_index].parentNode.appendChild(iframe));
                        divCollection[new_msg_index].className = 'edited';
                    }
                }
                
            }
        }
    }
}

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
                            
                            //now find the message time.
                            //var msgSpan = bS[j].parentNode.getElementsByTagName('span')[0].innerHTML;
                            //if (GM_getValue("lastMsgTime") != msgSpan) {
							//	alert('got here');
                            //  GM_setValue("lastMsgTime", msgSpan);
							//	alert('have set message value');
                                bS[j].innerHTML = ' whispered to you:';
                                alertDiv = document.createElement("div");
                                alertDiv.innerHTML = '<iframe title="YouTube video player" width="0" height="0" src="http://www.supload.com/listen?s=2ic6iR" frameborder="0" allowfullscreen></iframe>';
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
        alert(err);
    }
}


window.setInterval(function(){
    scan_allianceChat();
    //check_html()
}, 5000);