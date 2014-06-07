// ==UserScript==
// @name           dAmn Colors
// @namespace      net.Nol888.dA
// @description    Colorizes dAmn, replacement for shadowdAx
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==

function load_dAmn_colors() {
    try {
        var username = unsafeWindow.deviantART.deviant.username;
        uniqid = GM_getValue('uniqid', 'noid').toString();
        GM_setValue('authing', 'no');
        var script;
        GM_setValue('got_script', 'no');

        function getUID() {
            // THIS BLOCK OF CODE WAS PULLED DIRECTLY FROM THE USERSCRIPT ON NOL888.COM
            GM_setValue('authing', 'yes');
            result = prompt("Please enter your password to identify yourself.", "");
            if(result) { // User entered password.
                GM_xmlhttpRequest({
                    method: 'POST',
                    url: 'http://damncolors.nol888.com/login.php',
                    headers: {
                        'User-Agent': [navigator.userAgent, ' Greasemonkey (dAmnColors)'].join(''),
                        'Content-Type': 'application/x-www-form-urlencoded',
                },
                    onload: function(responseagain) {
                        if (responseagain.status == 200) { // Identified.
                            window.setTimeout(function() {
                                hideStatus();
                            },1500);
                            GM_setValue('uniqid', responseagain.responseText);
                            window.dAmnColorsUniqid = responseagain.responseText;
                            alert("You have logged in correctly. WARNING: If you change your colors without refreshing, and leave some fields blank, it will reset to black.");
                    } else { // Not successful.
                            window.setTimeout(function() {
                                hideStatus();
                            },1500);
                            loginJs = document.createElement('script');
                            loginJs.appendChild(document.createTextNode(responseagain.responseText));
                            document.getElementsByTagName('head')[0].appendChild(loginJs);
                        }
                        GM_setValue('authing', 'no');
                    },
                    data: "username="+username+"&password="+encodeURI(result)
                });
            } else { // User didn't enter password
                alert("You didn't enter a password.");
            }
        }

        if(uniqid == 'noid') {
            result = confirm("Welcome to dAmnColors!\nIf you are a returning user, press OK.");
            if(result) {
                getUID();
            }
        }

        uniqid = GM_getValue('uniqid', 'noid').toString();
        var intervalID;

        function loadScript() {
            if(GM_getValue('authing', 'no').toString() == 'yes') {
                return;
            }
            fetch_script();
            clearInterval(intervalID);
        }

        function fetch_script() {
            uniqid = GM_getValue('uniqid', 'noid').toString();
            GM_xmlhttpRequest({
                method: "GET",
                url: "http://damncolors.nol888.com/script.php?username="+username+"&uniqid="+uniqid+"&gmscriptversion=6.2&"+new Date().getDate(),
                onload: function(response) {
                    script = response.responseText;
                    eval(script);
                    GM_setValue('got_script', 'yes');
                }
            });
        }

        intervalID = setInterval(loadScript, 10);

        function unsetUID() {
            GM_setValue('uniqid', 'noid');
            alert('Deleted your dAmnColors token!');
        }

        // We hook the command like this because doing it any other way overrides
        // commands set by the usercript.
        try {
            GM_registerMenuCommand('dAmnColors: Get Token', function(e) { getUID() ; });
            GM_registerMenuCommand('dAmnColors: Unset Token', function(e) { GM_setValue('uniqid', 'noid') ; });
        } catch(e) {}

    } catch(e) {
        GM_log(e);
        alert("Error while loading dAmnColors: "+e);
    }
}

var check_interval;

function check_for_dAmn() {
    if(typeof unsafeWindow.dAmnChatTab_active == "undefined" || unsafeWindow.dAmnChatTab_active == null) {
        return;
    }
    load_dAmn_colors();
    clearInterval(check_interval);
}

check_interval = setInterval(check_for_dAmn, 10);
