// ==UserScript==
// @name       iGoogle improved menu
// @namespace  http://www.google.com/ig*
// @match      http://www.google.com/ig*
// @version    0.1
// @description  Scripts generates igoogle menu
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @run-at document-body
// @copyright  2012+, Marko Mrkus
// ==/UserScript==

var keyBuffer = "";

function getIGoogleSettings(onTabsFetched) {
    $.ajax({
        url:"http://www.google.com/ig/restorep?action=download", 
        data:{}, 
        success:function(data) {
           var tabs = $(data).find('GadgetTabML Tab');
           onTabsFetched(tabs);
        },
        dataType:"xml"
    })
}

function startBuildingMenu(tabs) {
    var htmlTemplate = "<a style=\"width:70px;\" class=\"kdButton left tabMnuBtn\" href=\":href:\" tabindex=\"0\" id=\"tab_menu\"><span style=\"width:70px; font-size:9px;\" class=\"kdTabName\">:tabName:</span></a>";
    
    var baseHref = document.baseURI.substring(0, document.baseURI.indexOf("#"));
    
    var buttonBars = document.getElementsByClassName("kdSidebar");
    $(".kdTabMenu").css("display", "none");
    
    if (buttonBars[0] != null && typeof(buttonBars[0]) != "undefined") {
        var buttonBarLeft = buttonBars[0];
        buttonBarLeft.style.display = "block";
        buttonBarLeft.style.width = "60px";
        $(".kdSidebarButton").css("display", "none");
    
        var j = 0;
        for (i = 0; i < tabs.length; i++) {
            if (tabs[i].getAttribute("isMobile") != "true") {
                var html = htmlTemplate.replace(":href:", baseHref + "#t_" + i).replace(":tabName:", tabs[i].getAttribute("title"));
                var div = document.createElement("div");
                div.setAttribute("class", "kdButtonBar");
                div.innerHTML = html;
                div.firstChild.id = "tab_menu_" + i;
                div.firstChild.style.margin = "5px -25px";
                buttonBarLeft.appendChild(div);
                j++;
            }
        }
        
        $(document).keydown(function(eventObject) {
            var keycode = eventObject.keyCode;
            
            if (keycode > 95 && keycode < 106) {
                var numPressed = keycode - 96;
                keyBuffer += numPressed;
                highlightTab();
            }
            
            if (keycode == 8) {
                keyBuffer = keyBuffer.substring(0, keyBuffer.length - 1);
                highlightTab();
            }
            
            if (keycode == 13) {
                var intKeyBuffer = parseInt(keyBuffer);
                if (typeof(intKeyBuffer) == "number") {
                    if (intKeyBuffer <= j) {
                        keyBuffer = "";
                        resetHighlightedTabs();
                        window.location.href = baseHref + "#t_" + intKeyBuffer;
                    } else {
                        keyBuffer = "";
                        resetHighlightedTabs();
                        alert("Wrong tab number entered: " + intKeyBuffer + "! Buffer is now reset!");
                    }
                }
            }
        });
    }
}

function getCurrentTabId() {
    tabString = document.baseURI.match(/t#_[0-9]+/);
    if (tabString == null) { return -1; }
    return tabString[0].substring(3, tabString.length);
}

function highlightTab() {
    var tabFromBuffer = $("#tab_menu_" + keyBuffer);
    if (tabFromBuffer.length != 0) {
        tabFromBuffer.css("color", "red");
    } else {
        resetHighlightedTabs();
    }
}

function resetHighlightedTabs() {
    //Reset the colors
    $(".tabMnuBtn").css("color", "#444444");
}
        
getIGoogleSettings(startBuildingMenu);
$("#q").blur();