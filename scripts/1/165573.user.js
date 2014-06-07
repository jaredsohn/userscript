// ==UserScript==
// @grant metadata
// @name Datacom Cavas Shutter Upper
// @description Allows for Notifications and the silencing of Canvas calls waiting
// @version 1.3
// @include http://canvas.datacom.com.au/home/vic
// @include http://canvas.datacom.com.au/home/vicaccc
// @include http://canvas.datacom.com.au/home/vicah
// @include http://canvasuat.datacom.com.au/home/vic
// @include http://canvasuat.datacom.com.au/home/vicaccc
// @include http://canvasuat.datacom.com.au/home/vicah
// ==/UserScript==
//Requires https://addons.mozilla.org/en-us/firefox/addon/tab-notifier/
/****************************************************************************************
TODO 
    - Set users name to ignore popups
    - Timeout on popup

BUGS-
	Sometimes, the first 'call waiting will be blank due to canvas not updating fast enough

****************************************************************************************/
var legend = document.getElementById("legenddiv");
var table = legend.getElementsByTagName("tr");
var newRowAudio = document.createElement('th');

var newRowNote = document.createElement('th');
var ths = legend.getElementsByTagName("th");
window.webkitNotifications.requestPermission();
//Reduce the width for new elements
for (var i = 0; i < ths.length; i++) {
    if (ths[i].className == "excludeoffline") {

        ths[i].style.width = "400px";
    }
}

//Create the No Sound button and label
var audioCheckbox = document.createElement('input');
audioCheckbox.type = "checkbox";

audioCheckbox.name = "audioShSutterUpper";
audioCheckbox.id = "audioShutterUpperId";
audioCheckbox.onclick = function () {
    if (audioCheckbox.checked) {
        setCookie("noSoundSet", "False", 365);
    } else {
        setCookie("noSoundSet", "True", 365);
    }


    function setCookie(c_name, value, exdays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays === null) ? "" : "; expires=" + exdate.toUTCString());

        document.cookie = c_name + "=" + c_value;
    }
}
var label = document.createElement('ass');
label.appendChild(document.createTextNode('No Sound'));


//Create the notifications button

var noteCheckbox = document.createElement('input');
noteCheckbox.type = "checkbox";
noteCheckbox.name = "notifications";
noteCheckbox.id = "notificationsId";
noteCheckbox.onclick = function () {

    if (noteCheckbox.checked) {
        showNotification = true;
        setCookie("notificationsSet", "True", 365);
		if (webkitNotifications.checkPermission() !== 0) {
			webkitNotifications.requestPermission();
		}
        
    } else {
        showNotification = false;
        setCookie("notificationsSet", "False", 365);

    }

    function setCookie(c_name, value, exdays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays === null) ? "" : "; expires=" + exdate.toUTCString());

        document.cookie = c_name + "=" + c_value;
    }
}
var noteLabel = document.createElement('ass');
noteLabel.appendChild(document.createTextNode('Notifications'));


//Add the stuff to the DOM so we can modify it further

table[0].appendChild(newRowAudio);
table[0].appendChild(newRowNote);
newRowAudio.appendChild(audioCheckbox);
newRowAudio.appendChild(label);
newRowNote.appendChild(noteCheckbox);
newRowNote.appendChild(noteLabel);


//Do the cookies thing
var newAudioCheckbox = document.getElementById("audioShutterUpperId");
var newNoteCheckbox = document.getElementById("notificationsId");

if (getCookie("noSoundSet") == "True") {
    newAudioCheckbox.checked = true;
}
if (getCookie("notificationsSet") == "True") {
    newNoteCheckbox.checked = true;
}


if (newAudioCheckbox.checked) {
    //myNetscape.value = oldIEFile.value = "";
} else {
    //myNetscape.value = oldNetscapeFile; 
    //myFileIe.value = oldIEFile;
}

embedFunction(PlayAudio);

function PlayAudio(mode) {
    // Check for audio element support.
    var showNotification = false;
    var noteCheckbox = document.getElementById("notificationsId");
    var audioCheckbox = document.getElementById("audioShutterUpperId");
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
	var isChrome = !isSafari && testCSS('WebkitTransform');  // Chrome 1+
     
	if (window.HTMLAudioElement) {
        try {
           

            var oAudio = document.getElementById('ctlaudio');
            var browserName = navigator.appName;
            if (browserName == 'Netscape') {
                audioURL = document.getElementById('audiofilenetscape');
            } else {
                audioURL = document.getElementById('audiofileie');
            }

            //Skip loading if current file hasn't changed.
            if (audioURL.value !== currentFile) {
                oAudio.src = audioURL.value;
                currentFile = audioURL.value;
            }
            if (mode == 1) {
                var usefulNames;

                // Tests the paused attribute and set state. 
                if (oAudio.paused && !audioCheckbox.checked) {
                    oAudio.play();
                }
                if (!audioCheckbox.checked) {
                    oAudio.play();
                }

                if (noteCheckbox.checked) {
                    var storedNames = new Array();

                    if (webkitNotifications.checkPermission() === 0) {
                        //Find the clients that are waiting

                        var waitings = document.getElementsByTagName("td");

                        //Get the names firstly
                        for (var i = 0; i < waitings.length; i++) {

                            if (waitings[i].id.substring(0, 2) == "qn") {
                                var number = waitings[i].id.substring(4, 2);
                                storedNames[number] = waitings[i].innerHTML.substring(5);
                            }
                        }

                        //Now find what we are waiting for
                        for (var j = 0; j < waitings.length; j++) {
                            if (waitings[j].id.substring(0, 2) == "cw") {
                                if (waitings[j].innerHTML != 0) {
                                    usefulNames += storedNames[waitings[j].id.substring(2)];
                                }
                            }
                        }

                        if (usefulNames === undefined) {
                            usefulNames = "";
                        }
						else {
                            usefulNames = usefulNames.substring(10);
                        }
						
						
						
                        //If we are using chrome, we can use the webskit without window
                        if (isChrome) {
                            //Is Chrome
                            var notification = webkitNotifications.createNotification(
                                'http://i.stack.imgur.com/dmHl0.png',
                                'There is a call waiting!',
                                usefulNames);

                            notification.onclick = function () {
                                //window.open("http://stackoverflow.com/a/13328397/1269037");
                                notification.close();
                            }

                            notification.show();

                            setTimeout(function () {
                                notification.cancel();
                            }, '5000');

                        } 
						else {
                            //Isn't chrome
                            var notificationChrome = window.webkitNotifications.createNotification(
                                'http://i.stack.imgur.com/dmHl0.png',
                                'There is a call waiting!',
                                usefulNames);

                            notificationChrome.onclick = function () {
                                //window.open("http://stackoverflow.com/a/13328397/1269037");
                                notificationChrome.close();
                            }

                            notificationChrome.show();

                            setTimeout(function () {
                                notificationChrome.cancel();
                            }, '5000');
                        }
                    }
                }
            } 
			else {
                oAudio.pause();
            }
        } //End try
		catch (e) {
            // Fail silently but show in F12 developer tools console

            if (window.console && console.error("Error:" + e));
        } //End catch
    } //End if HTML element

    //Let's throw in some nested functions because JS is cool

    function getCookie(c_name) {
        var c_value = document.cookie;

        var c_start = c_value.indexOf(" " + c_name + "=");
        if (c_start == -1) {
            c_start = c_value.indexOf(c_name + "=");
        }
        if (c_start == -1) {
            c_value = null;

        } else {
            c_start = c_value.indexOf("=", c_start) + 1;
            var c_end = c_value.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = c_value.length;
            }
            c_value = unescape(c_value.substring(c_start, c_end));

        }
        return c_value;
    }

    function setCookie(c_name, value, exdays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays === null) ? "" : "; expires=" + exdate.toUTCString());

        document.cookie = c_name + "=" + c_value;
    }

    function checkCookie() {
        var noSoundSet = getCookie("noSoundSet");
        if (noSoundSet == "True") {
            noteCheckbox.checked = true;

        }

        var notificationsSet = getCookie("notificationsSet");
        if (notificationsSet == "True") {
            audioCheckbox.checked = true;
        }
    }
	
	//Used for checking if this browser is chrome
	function testCSS(prop) {
		return prop in document.documentElement.style;
	}
}

function embedFunction(s) {

    document.body.appendChild(document.createElement('script')).innerHTML = s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/, '$2');
}

function getCookie(c_name) {
    var c_value = document.cookie;

    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));

    }
    return c_value;
}
