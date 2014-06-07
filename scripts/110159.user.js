// ==UserScript==
// @name           EasyOmegler
// @description    Auto-Connect, Opening Message, New Conversation Shortcut.
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://*.omegle.com/
// @include        http://promenade.omegle.com/*


// ==/UserScript==
var openingMessage = GM_getValue("openingMessage", "sup bro"); //default opening message
var lag = 2500; //time delay before sending the message after it's been typed
var haveDone = false;
if (document.title) { //checking if we're on the main page. 

function pausecomp(ms) {
ms += new Date().getTime();
while (new Date() < ms){}
} 

    function newChat(daButton) {
	//alert('lol');
        daButton.click();
    }

    function checkForStatus() {

        if (thisScriptEnabled()) { //if autoconnect has been enabled
            var btnNewButton = document.getElementsByTagName("input");

            for (var i = 0; i < btnNewButton.length; i++) {
                if (btnNewButton[i].value == "Start a new conversation") { //checking for the new conversation button.
			pausecomp(50);
                    btnNewButton[i].click();
			break;
                    //setTimeout(newChat(btnNewButton[i]), 3000);
                }
            }
        }

        if (document.getElementsByClassName("logitem").length == 1) { //only go past this if there exists only one message, usually the 'now chatting' message		
            if (openingMessageEnabled()) { //if opening message has been enabled
                if ($(".logitem").text() == "You're now chatting with a random stranger. Say hi!") {
                    //new conversation has started so now we need to send opening message
                    document.getElementsByClassName("chatmsg")[0].value = openingMessage; // adding the message to chat box
                    var t = setTimeout(function () { //making enter be clicked with a timer, with the default 'lag'
                        document.getElementsByClassName("sendbtn")[0].click();
                    }, lag);
                }
            }
        }
    }

    function monitorLogBox() {
        document.body.addEventListener("DOMNodeInserted", checkForStatus, false);
    }

    monitorLogBox();

    function addMenu() {

        var divReconnect = document.createElement("div");
        divReconnect.id = "newStranger";

        divReconnect.style.position = "fixed";
        divReconnect.style.opacity = "0.8";
        divReconnect.style.background = "#303030";
        divReconnect.style.top = "0px";
        divReconnect.style.right = "550px";
        divReconnect.style.color = "white";
        divReconnect.style.cursor = "pointer";
        divReconnect.style.padding = "3px 5px 0px 5px";
        divReconnect.style.borderRadius = "0px 0px 6px 6px";
        divReconnect.style.zIndex = "6";
        divReconnect.style.fontFamily = "Calibri";

        divReconnect.innerHTML = "New Chat (or F2)";
        document.body.appendChild(divReconnect);

        var divAutoConnect = document.createElement("div");
        divAutoConnect.style.position = "fixed";
        divAutoConnect.style.opacity = "0.8";
        divAutoConnect.style.background = "#303030";
        divAutoConnect.style.top = "0px";
        divAutoConnect.style.right = "250px";
        divAutoConnect.style.color = "white";
        divAutoConnect.style.cursor = "pointer";
        divAutoConnect.style.padding = "3px 5px 0px 5px";
        divAutoConnect.style.borderRadius = "0px 0px 6px 6px";
        divAutoConnect.style.zIndex = "6";
        divAutoConnect.style.fontFamily = "Calibri";
        divAutoConnect.innerHTML = "<input id=oac-autoconnect type=checkbox checked><label for=oac-autoconnect>Auto-Connect (Toggle with F4)</label>";
        document.body.appendChild(divAutoConnect);

        var divOpeningMessage = document.createElement("div");
        divOpeningMessage.style.position = "fixed";
        divOpeningMessage.style.opacity = "0.8";
        divOpeningMessage.style.background = "#303030";
        divOpeningMessage.style.top = "0px";
        divOpeningMessage.style.right = "0px";
        divOpeningMessage.style.color = "white";
        divOpeningMessage.style.cursor = "pointer";
        divOpeningMessage.style.padding = "3px 5px 0px 5px";
        divOpeningMessage.style.borderRadius = "0px 0px 6px 6px";
        divOpeningMessage.style.zIndex = "6";
        divOpeningMessage.style.fontFamily = "Calibri";
        divOpeningMessage.innerHTML = '<input style="float:left;" id=oac-openingmessage type=checkbox checked><label for=oac-openingmessage style="float:left;" >Open with Message </label>  &nbsp; <div style="float: right; " class="edit"> [Edit] </div>'; //there are floats in here to make sure the divs don't use two lines. and also mandatory line spaces (&nbsp;)
        document.body.appendChild(divOpeningMessage);
    }

    function thisScriptEnabled() {
        return document.getElementById('oac-autoconnect').checked;
    }

    function openingMessageEnabled() {
        return document.getElementById('oac-openingmessage').checked;
    }


    $(document).keypress(function (e) {
        if (e.keyCode == '113') { // auto-connect
            if (document.getElementsByClassName("disconnectbtn")[0]) {
                document.getElementsByClassName("disconnectbtn")[0].click();
                document.getElementsByClassName("disconnectbtn")[0].click();

            }
        }
        if (e.keyCode == '115') { //enabling auto mode
            document.getElementById('oac-autoconnect').click();
        }
        if (e.keyCode == '117') { //just for fun
            haveDone = false;


        }
    });

    addMenu();

    $(".edit").click(function () { //the edit text next to "Opening Message"
        if (!document.getElementById("txtarea")) { //when trying to see the opening message settings box, do this if it does not already exists
            var btns = '<form style="color:white" > <input style="float: left; " class="saveButton" type="button" value="Save" /><div class="editmessage" style="float:left;"></div><input style="float: right; " class="closeButton" type="button" value="Close" /> </form>'
            var divOMEdit = document.createElement("div");
            divOMEdit.id = "txtarea";
            divOMEdit.style.color = "white";
            divOMEdit.setAttribute("style", "background-color:#303030;");
            divOMEdit.style.display = "none";
            divOMEdit.style.borderRadius = "0px 0px 6px 6px";
            divOMEdit.style.position = "absolute";
            divOMEdit.style.top = "25px";
            divOMEdit.style.right = "10px";
            divOMEdit.style.zIndex = "6";
            divOMEdit.innerHTML = '<textarea rows="4" cols="50">' + openingMessage + '</textarea> ' + btns;
            document.body.appendChild(divOMEdit);

            enableDisableEditBox();
            $("#txtarea").fadeIn('fast');
            $(".saveButton").click(function () { //for save button action: take text from txtarea and put give and alert and fade everything out
                openingMessage = $('#txtarea textarea').val();
                GM_setValue("openingMessage", openingMessage);
                $("#txtarea").fadeOut('fast');
            });
            $(".closeButton").click(function () { //for close button: fade out everything, 
                $("#txtarea").fadeOut('fast');
            });
        } else if ($('#txtarea').css('display') == 'block') { //if already showing, we just need to hide it.
            $("#txtarea").fadeOut('fast');
        } else { //if not showing, let's show it!
            $('#txtarea textarea').val(openingMessage);
            enableDisableEditBox();

            $("#txtarea").fadeIn('fast');
        }
    });


    $('#newStranger').click(function () { // new/end chat button.
        if (document.getElementsByClassName("disconnectbtn").length > 0) {
            document.getElementsByClassName("disconnectbtn")[0].click();
            document.getElementsByClassName("disconnectbtn")[0].click();
        }
    });
    $('#oac-autoconnect').click(function () { //if autoconnect is enabled, F2 because a key for a new chat. if not, F2 just exits a chat
        if (this.checked) {
            $('#newStranger').html("New Chat (or F2)"); //with autoconnect
        } else {
            $('#newStranger').text("End Chat (or F2)"); //without autoconnect
        }
    });

    function enableDisableEditBox() {
        //for enabling the opening message textarea. (if no chatmsg exists) or (chatmsg does exist and is disabled) so then txtarea should be enabled
        if (document.getElementsByClassName('chatmsg').length == 0 || (document.getElementsByClassName('chatmsg').length == 1 && document.getElementsByClassName('chatmsg')[0].disabled)) {
            $('#txtarea textarea').removeAttr('disabled'); //enable edit box
        } else {
            $('#txtarea textarea').attr('disabled', 'true');
            $('.editmessage').html(' &nbsp; Can\'t change while in a chat!');
        }
    }
}