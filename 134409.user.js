// ==UserScript==
// @name           9gag.com enhancements
// @namespace      http://userscripts.org/users/73184
// @description    various enhancements for 9gag.com (never see same gag twice, NSFW-no-login, big "hide this gag" button, pre-load all unseen "hot" gags, etc)
// @include        *9gag.com*
// @version 1.0.2
// version-format: major_change.minor_change.bugfix or something like that :p
// ==/UserScript==

/*
Removes all gags marked as old, permanently.
gives you a big button to mark a gag as old (aka "dont show me this gag again")
Safe-Mode button is now ubber-fast, and don't require login. (and NSFW images are preloaded)
automatically loads all gags on current page after the first few gags are loaded. (originally 9gag waits until you scroll down before it loads the rest of the images)


changelog:
1.0.2: an other small bugfix for scopes.. (moved hhb_9gag.whenLoginReady out of a conditional part of hhb_9gag.login...
1.0.1: small bugfix for chrome (firefox and chrome javascript engines don't  handle local variables/scopes the same way..)
1.0: 
implemented every advertised function :p
removes oldgags.
Ubber-fast safe-mode that requires no login.
pre all gags on current page. (including NSFW, but its hidden until you disable safe-mode)
optional online syncing.. (took more time to implement than i thought - and the hosters.. ,
id prefer an other hoster, any suggestions?)


(developer-note: ive found a way to run the script in same scope as the webpage... while unsafeWindow works as expected in greasemonkey/firefox, its buggy in chrome -.-, this is at the cost of not being able to reach GM_ functions though)

*/


(function () {
    var loc = window.location.href.toString();
    if (loc.indexOf("https://plusone.google.com/_/+1/fastbutton") != -1 || loc.indexOf('facebook.com/connect') != -1 || loc.indexOf('http://www.facebook.com/plugins/') != -1 || loc.indexOf('9gag.com') == -1) {
        return; /*some 9gag.com scripts activate this script several times... geezaz*/
    }
    //	alert(loc);
    delete loc;
    var hhb_9gag_toString_function = function () {
            var debug = 1;
            if (!debug) {
                var hhb_9gag = new Object(); //local... this will actually crash the UI now ...
                hhb_9gag.debugging = false;
            } else {
                hhb_9gag = new Object(); //global
                window.hhb_9gag = hhb_9gag;
            }
            hhb_9gag.UI = new Object();
            hhb_9gag.version = "1.0";
            hhb_9gag.debugging = debug;
            hhb_9gag.init_id = 0;
            hhb_9gag.inited = false;
            hhb_9gag.d = null;
            hhb_9gag.d2 = null;
            hhb_9gag.oldGagsList = new Array();
            hhb_9gag.username = '';//'debug';
            hhb_9gag.password = '';//'debug';
            //bool hhb_9gag.isLoggedIn()
            hhb_9gag.__loggedIn = false;
            hhb_9gag.jsstore_url = "http://jsstore.webege.com/projects/jsstore/";
            //hhb_9gag.jsstore_url="http://127.0.0.1/projects/jsstore/";
            hhb_9gag.init = function () {
                try {
                    hhb_9gag._init();
                } catch (e) {
                    alert("Sorry! 9gag.com enhancements crashed :( during init(), exception info: " + e);
                    try {
                        console.log(e);
                    } catch (eee) {}
                }
            }

            hhb_9gag._init = function () {
                if (document.getElementById('headbar-wrap') === null /* || document.getElementById('social-block')===null*/ ) { /*hhb_9gag.debug("not ready1");*/
                    setTimeout(hhb_9gag.init, 1000);
                    return; /*not ready yet*/
                }
                if (typeof (GAG) === 'undefined' || typeof (GAG.Ajax) === 'undefined' || typeof (GAG.Ajax.LoadPage) === 'undefined' || typeof (GAG.Ajax.LoadPage.getLoadCountMax) === 'undefined') {
                    /*hhb_9gag.debug("not ready2");*/
                    setTimeout(hhb_9gag.init, 1000);
                    return; /*not ready yet*/
                }

                if (hhb_9gag.inited) {
                    hhb_9gag.debug("already inited");
                    return; /*already inited*/
                }
                hhb_9gag.inited = true;
                //clearInterval(hhb_9gag.init_id);
                hhb_9gag.d = document.createElement('li');
                hhb_9gag.d.style.zIndex = "9";
                hhb_9gag.d.style.color = "green";
                hhb_9gag.d.innerHTML = '9gag.com Enhanchments<br/>'; //not (movable)...';
                hhb_9gag.d2 = document.createElement('span');
                hhb_9gag.d2.innerHTML = '<small><button onclick="hhb_9gag.UI.configWindow.style.visibility=\'visible\'" id="hhb_hidegag_button" type="button" style="cursor:default;" ><small>oldgags: <span id="hidegag_number">0</span> <small><span style="color:blue;">(press for settings)</span>.</small></small></button></small>'; // Y U NO SMALL BUTTON? :'(
                hhb_9gag.d.appendChild(hhb_9gag.d2);
                //document.getElementsByTagName('body')[0].appendChild(hhb_9gag.d);
                //document.getElementById('headbar-wrap').appendChild(hhb_9gag.d);
                //document.getElementById('profile-menu').parentNode.insertBefore(hhb_9gag.d,document.getElementById('profile-menu'));
                document.getElementsByClassName('main-menu')[0].appendChild(hhb_9gag.d);


                hhb_9gag.UI.configWindow = document.createElement('div');
                hhb_9gag.UI.configWindow.innerHTML = '9gag.com Enhanchments configuration (press escape to close)<br/><br/>';
                hhb_9gag.UI.configWindow.innerHTML += 'oldgags online syncing: <button onclick="hhb_9gag.loginWizard();" style="color:red">disabled</button><strong style="cursor:pointer;" onclick="Javascript:(function(){var str=\'Why save online? in case you clear cookies/switch computer/run ccleaner/etc, you won\\\'t lose your oldgags list, NEVER! :p,\\n\\n\';if(hhb_9gag.isLoggedIn()){str+=\'currently logged in\\nUsername: \'+hhb_9gag.username.toString()+\'\\nPassword: \'+hhb_9gag.password.toString();}else{str+=\'current status: not logged in.\';}alert(str);})();">(info/status)</strong><br/>' + '<button onclick="Javascript:hhb_9gag.registerWizard();">Register new account</button><br/>' + '<button onclick="Javascript:hhb_9gag.about();">About</button><br/><button onclick="Javascript:hhb_9gag.hideUI()">close window</button>';
                hhb_9gag.UI.configWindow.setAttribute('style', 'z-index:88; position:fixed; top:' + ((window.innerHeight / 2) / 2) + 'px; left:' + ((window.innerWidth / 2) / 2) + 'px; -moz-border-radius:6px; ' + (box_style ? box_style : ''));
                hhb_9gag.UI.configWindow.addEventListener('mousedown', function (e) {
                    dragStart(e);
                }, false);
                window.addEventListener('keydown', function (e) {
                    if (e.keyCode === 27 /*escape*/ ) {
                        hhb_9gag.hideUI();
                    }
                }, false);
                	hhb_9gag.UI.configWindow.style.visibility="hidden";
                //	document.body.insertBefore(hhb_9gag.UI.configWindow, document.body.firstChild);
                hhb_9gag.d.appendChild(hhb_9gag.UI.configWindow);
                hhb_9gag.UI.loginButton = hhb_9gag.UI.configWindow.childNodes[4]; //i have my reasons for doing it this way...
                hhb_9gag.preloadAll();
                hhb_9gag.improveSafeMode();
                if (localStorage.getItem('hhb_9gag.oldgags') != null) {
                    hhb_9gag.oldGagsList = JSON.parse(localStorage.getItem('hhb_9gag.oldgags'));
                }
                if (localStorage.getItem('hhb_9gag.username') != null && localStorage.getItem('hhb_9gag.password') != null) {
                    hhb_9gag.username = localStorage.getItem('hhb_9gag.username');
                    hhb_9gag.password = localStorage.getItem('hhb_9gag.password');
                    setTimeout(function () {
                        hhb_9gag.login(true);
                    }, 1000);
                }
                hhb_9gag.removeOldGags(); //setTimeout(hhb_9gag.removeOldGags,1000);
                setTimeout(hhb_9gag.createHideButtons, 1100);
                var sha512s = document.createElement('script');
                sha512s.src = 'http://crypto-js.googlecode.com/svn/tags/3.0.2/build/rollups/sha512.js';
                document.getElementsByTagName('head')[0].appendChild(sha512s);
                var sha256s = document.createElement('script');
                sha256s.src = 'http://crypto-js.googlecode.com/svn/tags/3.0.2/build/rollups/sha256.js';
                document.getElementsByTagName('head')[0].appendChild(sha256s);
            } //<end of hhb_9gag._init
            hhb_9gag.isLoggedIn = function () {
                try {
                    if (hhb_9gag.username !== '' && hhb_9gag.password !== '' && hhb_9gag.__loggedIn != false) return true;
                    else return false;
                } catch (e) {
                    hhb_9gag.debug('hhb_9gag.isLoggedIn exception!', e);
                    return false;
                }
            }

            hhb_9gag.registerWizard = function () {
                hhb_9gag.xhttp = new XMLHttpRequest();
                try {
                    if (typeof (CryptoJS) === 'undefined') {
                        alert("sorry, could not load cryptographic functions, cannot register :(");
                    }
                    var rUsername = prompt('REGISTER: Username');
                    if (rUsername == null || rUsername == '') {
                        alert("a username is required! you supplied no username...");
                        return;
                    }
                    var rPassword = CryptoJS.SHA512(prompt('REGISTER: Password')).toString();
                    document.body.style.cursor = 'wait';
                    var url = hhb_9gag.jsstore_url + 'register.php'; //'http://jsstore.webege.com/projects/jsstore/register.php';
                    hhb_9gag.xhttp.open('POST', url, false);
                    var f = new FormData();
                    f.append('hhb_9gag.version', hhb_9gag.version);
                    f.append('username', rUsername);
                    f.append('sha512password', rPassword);
                    hhb_9gag.xhttp.send(f);
                    var response = JSON.parse(hhb_9gag.xhttp.responseText);
                    //hhb_9gag.debug('hhb_9gag.registerWizard got error_number' + response['error_number'].toString() + ', message from server:' + response['message'].toString());
                    var msg = '';
                    if (response['error_number'] != 0) {
                        msg += 'sorry, could not register!\n\n';
                    } else {
                        msg += 'registerd successfully!\n\n';
                    }
                    msg += 'Message from server:\n' + response['message'].toString() + '\n\n\nerror_number from server:\n' + response['error_number'].toString();
                    document.body.style.cursor = 'default';
                    alert(msg);
                    if (response['error_number'] == 0 && confirm('do you want to login with your new account?')) {
                        hhb_9gag.username = rUsername;
                        hhb_9gag.password = rPassword;
                        hhb_9gag.login(false);
                    }

                    //alert('registered successfully!');	
                } catch (e) {
                    document.body.style.cursor = 'default';
                    hhb_9gag.debug('hhb_9gag.registerWizard exception!', e, hhb_9gag.xhttp, hhb_9gag.xhttp.responseText);
                    alert('9gag enhanchments crashed while trying to register, sorry :( i really got no idea wehter you registered successfully or not (although i doubt it)  crash-geek-info:exception: ' + e.toString() + ' hhb_9gag.xhttp.readyState:' + hhb_9gag.xhttp.readyState.toString() + ' hhb_9gag.xhttp.responseText:' + hhb_9gag.xhttp.responseText.toString());
                }
            } //<end of hhb_9gag.registerWizard
            hhb_9gag.loginWizard = function () {
                try {
                    if (typeof (CryptoJS) === 'undefined') {
                        alert("sorry, could not load cryptographic functions, cannot login :(");
                    }
                    var tmp = prompt("Please enter your username", "");
                    if (!tmp) {
                        return;
                    }
                    hhb_9gag.username = tmp;
                    tmp = prompt("Please enter your password", "");
                    if (tmp === null) {
                        return;
                    }
                    if (tmp != '') {
                        hhb_9gag.password = CryptoJS.SHA512(tmp).toString(); //<<warning: CryptoJS.SHA512 does NOT return a string!
                    } else {
                        hhb_9gag.password = tmp;
                    }
                    hhb_9gag.login(false);
                } catch (e) {
                    hhb_9gag.debug('hhb_9gag.loginWizard exception!', e);
                }
            }
            hhb_9gag.login = function (silentLogin /*=false*/ ) {
                silentLogin = (typeof (silentLogin) === 'undefined' ? false : silentLogin);
                hhb_9gag.Loginhttp = new XMLHttpRequest();
                try {
                    if (!silentLogin) {
                        document.body.style.cursor = 'wait';
                    }
                    var url = hhb_9gag.jsstore_url + 'login.php'; //'http://jsstore.webege.com/projects/jsstore/login.php';
                    hhb_9gag.Loginhttp.open('POST', url, silentLogin);
                    var f = new FormData();
                    f.append('wantGagsList', /*silentLogin*/ true);
                    f.append('hhb_9gag.version', hhb_9gag.version);
                    f.append('username', hhb_9gag.username);
                    f.append('sha512password', hhb_9gag.password);
                    //hhb_9gag.debug('hhb_9gag.login got error_number'+response['error_number'].toString()+', message from server:'+response['message'].toString());
                    hhb_9gag.Loginhttp.send(f);
                    if (silentLogin) {
                        if (hhb_9gag.Loginhttp.readyState == 4) {
                            hhb_9gag.whenLoginReady(true); //this is theoretically possible with really really high bandwidth i suppose ;p
                            //ahm no, not really, not with today's single-threaded javascript engines. (OBJECTION! Chrome V8 is paritally multi-threaded!)
                        } else {
                            hhb_9gag.Loginhttp.onreadystatechange = function () {
                                if (hhb_9gag.Loginhttp.readyState == 4) {
                                    hhb_9gag.whenLoginReady(true);
                                }
                            }
                        }

                    } else {
                        hhb_9gag.whenLoginReady(false);
                    }

                } catch (e) {
                    //					if(!silentLogin){
                    document.body.style.cursor = 'default';
                    alert('9gag enhanchments crashed while trying to login, sorry :( i really got no idea whether or not you logged in (although i doubt it)  crash-geek-info:exception: ' + e.toString() + ' hhb_9gag.http.readyState:' + hhb_9gag.http.readyState + ' hhb_9gag.Loginhttp.responseText:' + hhb_9gag.Loginhttp.responseText);

                    hhb_9gag.debug('hhb_9gag.login exception!', e, hhb_9gag.Loginhttp, hhb_9gag.Loginhttp.responseText);
                    //				}
                }
            } //<end of hhb_9gag.login()

                    hhb_9gag.whenLoginReady = function (silentLogin) {
                        try {
                            var response = JSON.parse(hhb_9gag.Loginhttp.responseText);
                            var msg = '';
                            if (response['error_number'] != 0) {
                                hhb_9gag.__loggedIn = false;
                                msg += 'sorry, could not log in!\n\n';
                                hhb_9gag.UI.loginButton.innerHTML = 'disabled';
                                hhb_9gag.UI.loginButton.style.color = 'red';
                            } else {
                                hhb_9gag.UI.loginButton.innerHTML = 'enabled';
                                hhb_9gag.UI.loginButton.style.color = 'green';
                                hhb_9gag.__loggedIn = true;
                                localStorage.setItem('hhb_9gag.username', hhb_9gag.username);
                                localStorage.setItem('hhb_9gag.password', hhb_9gag.password);
                                if ( /*silentLogin!=false && */ Array.isArray(response['oldgags_from_server'])) {
                                    response['oldgags_from_server'].forEach(function (gagFromServer) {
                                        if (hhb_9gag.oldGagsList.indexOf(gagFromServer) == -1) {
                                            hhb_9gag.oldGagsList.push(gagFromServer);
                                        }
                                    });
                                }
                                if (!silentLogin) {
                                    setTimeout(hhb_9gag.syncPutGagsToServer, 1000);
                                }
                                msg += 'logged in!\n\n';
                            }
                            msg += 'Message from server:\n' + response['message'].toString() + '\n\n\nerror_number from server:\n' + response['error_number'].toString();
                            if (!silentLogin) {
                                document.body.style.cursor = 'default';
                                alert(msg);
                            }

                        } catch (e) {
                            hhb_9gag.debug('hhb_9gag.whenLoginReady exception!', e, hhb_9gag.Loginhttp, hhb_9gag.Loginhttp.responseText);
                        }
                    } //<<end of hhb_9gag.whenLoginReady

            hhb_9gag.syncPutGagsToServer = function (singleGag) {
                singleGag = (typeof (singleGag) === 'undefined' ? false : singleGag);
                try {
                    if (!hhb_9gag.isLoggedIn()) {
                        return false;
                    }
                    hhb_9gag.PutGagshttp = new XMLHttpRequest();
                    var url = hhb_9gag.jsstore_url + 'put_urls.php'; //'http://jsstore.webege.com/projects/jsstore/put_urls.php';
                    hhb_9gag.PutGagshttp.open('POST', url, true);
                    var f = new FormData();
                    f.append('hhb_9gag.version', hhb_9gag.version);
                    f.append('username', hhb_9gag.username);
                    f.append('sha512password', hhb_9gag.password);
                    if (singleGag == false) {
                        f.append('gaglist', JSON.stringify(hhb_9gag.oldGagsList));
                    } else {
                        var tmpArr = Array();
                        tmpArr.push(singleGag); //server expects a JSON of an array.
                        f.append('gaglist', JSON.stringify(tmpArr));
                    }
                    hhb_9gag.PutGagshttp.send(f);
                    return true; //dont know if error, but tried. 
                } catch (e) {
                    hhb_9gag.debug('hhb_9gag.syncPutGagsToServer exception!', e);
                }
            }

            hhb_9gag.syncGetGagsFromServer = function () {
                if (!hhb_9gag.isLoggedIn()) {
                    return false;
                }
                try {
                    hhb_9gag.getHttp = new XMLHttpRequest();
                    var url = hhb_9gag.jsstore_url + 'get_urls.php'; //'http://jsstore.webege.com/projects/jsstore/get_urls.php';		
                } catch (e) {
                    hhb_9gag.debug('hhb_9gag.syncGetGagsFromServer exception!', e, hhb_9gag.getHttp);
                }
            }
            hhb_9gag.about = function () {
                var str = '9gag.com Enhanchments\nVersion: ' + hhb_9gag.version.toString() + '\n\nDeveloped by Hans Henrik Bergan ( divinity76gmail.com )\n\n' + 'got any suggestions, comments, issues, or feedback? feel free to contact me!\n\n' + 'oh, and last\nany donations would be awesome! (no job atm.. i am registered at paypal)\ntl;dr? :p';
                alert(str);
            }

            hhb_9gag.hideUI = function () {
                try {
                    if (hhb_9gag.UI.configWindow.style.visibility !== 'hidden') {
                        hhb_9gag.UI.configWindow.style.visibility = 'hidden';
                    } else /*if(hhb_9gag.UI.aboutWindow.style.visibility!=='hidden')*/
                    {}
                } catch (e) {
                    hhb_9gag.debug('hhb_9gag.hideUI exception!', e);
                }

            }
            hhb_9gag.debug = function (a, b, c) {
                if (hhb_9gag.debugging && typeof (console) !== 'undefined' && typeof (console.log) !== 'undefined') {
                    if (typeof (a) !== 'undefined') console.log(a);
                    if (typeof (b) !== 'undefined') console.log(b);
                    if (typeof (c) !== 'undefined') console.log(c);
                }
            }


            hhb_9gag.improveSafeMode = function () {
                try {
                    hhb_9gag._improveSafeMode();
                } catch (e) {
                    hhb_9gag.debug('hhb_9gag._improveSafeMode exception!', e);
                }
            }


            hhb_9gag._improveSafeMode = function () {
                if (document.getElementsByClassName('safe-mode-toggle').length < 1 || document.getElementById('content') == null) {
                    setTimeout(hhb_9gag.improveSafeMode, 100);
                    return;
                }
                var element = document.getElementById('content');
                if (element.getAttribute('class') === 'nsfw') {
                    //document.getElementById('content').setAttribute('class','safe-mode-toggle')
                    return;
                }
                element = document.getElementsByClassName('safe-mode-toggle')[0];
                if (element.href == 'Javascript:void(0);') {
                    return;
                }
                element.href = 'Javascript:void(0);';
                element.addEventListener('click', hhb_9gag.SafeModeSwitch);
            }
            hhb_9gag.SafeModeSwitch = function () {
                try {
                    hhb_9gag._SafeModeSwitch();
                } catch (e) {
                    hhb_9gag.debug('hhb_9gag._SafeModeSwitch exception!', e);
                }
            }

            hhb_9gag._SafeModeSwitch = function () {
                var SafeModeEnabled = !document.getElementsByClassName('safe-mode-toggle off').length; //TODO: how does 9gag's scripts know if its on or off???
                var images = document.getElementsByTagName('img');
                if (SafeModeEnabled) {
                    document.getElementsByClassName('safe-mode-toggle')[0].setAttribute('class', 'safe-mode-toggle off'); //turns it off, visually.
                    for (i in images) {
                        if (images[i].alt === 'NSFW') {
                            var gagid = images[i].parentNode.parentNode.parentNode.getAttribute('gagid')
                            images[i].style.originalmaxWidth = images[i].style.maxWidth; //i guess this is isnt really neded..
                            images[i].style.maxWidth = "460px";
                            images[i].src = 'http://d24w6bsrhbeh9d.cloudfront.net/photo/' + gagid + '_700b.jpg'; //_460s.jpg
                        }
                    }
                } else {
                    document.getElementsByClassName('safe-mode-toggle')[0].setAttribute('class', 'safe-mode-toggle'); //turns it on, visually.
                    for (i in images) {
                        if (images[i].alt === 'NSFW') {
                            images[i].src = 'http://d24w6bsrhbeh9d.cloudfront.net/img/nsfw-mask_v2.jpg';
                            images[i].style.maxWidth = images[i].style.originalmaxWidth;
                        }
                    }
                }
                return;

            }


            hhb_9gag.__fTimesCrashed = 0;
            hhb_9gag.preloadAll = function () {
                try {
                    hhb_9gag._preloadAll();
                } catch (e) {
                    hhb_9gag.debug('hhb_9gag._preloadAll exception!', e);
                }
            }

            hhb_9gag._preloadAll = function () {
                function f() {
                    try {
                        if (document.getElementById('post-gag-stay') != null || GAG.Ajax.LoadPage._loadCount >= GAG.Ajax.LoadPage.getLoadCountMax()) {
                            return; /*nothing to do here...*/
                        }
                        //alert(hhb_9gag.__fTimesCrashed)
                        if (document.getElementById('content') !== null && document.getElementById('content').getAttribute('class') == 'nsfw' || hhb_9gag.__fTimesCrashed >= 2) {
                            /*this happens when not logged in, disabled safe mode, and try to open a NSFW gag.*/
                            /*calling GAG.Ajax.LoadPage.loadPage(); will cause exceptions and make the code unsable*/
                            /*so im just faking that we've loaded everything*/
                            /*this is a bug in 9gag.com/js/gag.min-v3.1.6.js code*/
                            /*...workaround code below.*/
                            GAG.Ajax.LoadPage._loadCount = GAG.Ajax.LoadPage.getLoadCountMax();
                            GAG.Ajax.LoadPage._isLoading = false;
                            return;
                        }
                        if (GAG.Ajax.LoadPage._isLoading != false) { /*should wait abit more..*/
                            setTimeout(f, 500);
                            return;
                        }
                        try { //this is for Expected exception :p
                            GAG.Ajax.LoadPage.loadPage();
                        } catch (ee) {
                            hhb_9gag.__fTimesCrashed++;
                            setTimeout(f, 500);
                        }
                    } catch (e) { //this is for Unexpected exception. 
                        hhb_9gag.debug('hhb_9gag._preloadAll.f exception!', e);
                    }
                    return; //f
                }

                function preloadUnsafes() {
                    try {
                        if ((GAG.Ajax.LoadPage.getLoadCountMax() < GAG.Ajax.LoadPage._loadCount || GAG.Ajax.LoadPage._isLoading != false) && document.getElementById('post-gag-stay') == null) {
                            /*should wait abit more*/
                            setTimeout(preloadUnsafes, 500);
                            return;
                        }
                        var images = document.getElementsByTagName('img');
                        for (i in images) {
                            if (images[i].alt == 'NSFW') {
                                var gagid = images[i].parentNode.parentNode.parentNode.getAttribute('gagid');
                                var tmpImage = document.createElement('img');
                                tmpImage.style.width = "1px;";
                                tmpImage.style.height = "1px;"
                                tmpImage.setAttribute('onload', 'Javascript:this.parentNode.removeChild(this);');
                                tmpImage.src = 'http://d24w6bsrhbeh9d.cloudfront.net/photo/' + gagid + '_700b.jpg'; //_460s.jpg
                                document.body.appendChild(tmpImage);
                            }
                        }
                    } catch (e) {
                        hhb_9gag.debug('hhb_9gag._preloadAll.preloadUnsafes exception!', e);
                    }
                    return; //preloadUnsafes
                }
                var CountMax = GAG.Ajax.LoadPage.getLoadCountMax();
                var count = 0;
                for (count = 0; count < CountMax; ++count) {
                    setTimeout(f, ((1 + count) * 300));
                }
                setTimeout(preloadUnsafes, ((1 + CountMax) * 350));
            } //_preloadAll
            hhb_9gag.removeOldGags = function () {
                try {
                    hhb_9gag._removeOldGags();
                } catch (e) {
                    hhb_9gag.debug('hhb_9gag._removeOldGags exception!', e);
                }
            }

            hhb_9gag._removeOldGags = function (singleGag /*=false*/ ) {
                singleGag = (typeof (singleGag) === 'undefined' ? false : singleGag);

                if (!singleGag && (GAG.Ajax.LoadPage.getLoadCountMax() != GAG.Ajax.LoadPage._loadCount || GAG.Ajax.LoadPage._isLoading != false) && document.getElementById('post-gag-stay') == null) {
                    //should wait for hhb_9gag.preloadAll() to finish..
                    setTimeout(hhb_9gag.removeOldGags, 500);
                    return;
                }
                hhb_9gag.gagsHidden = hhb_9gag.oldGagsList.length;
                document.getElementById('hidegag_number').innerHTML = hhb_9gag.gagsHidden;
                if (document.getElementById('post-gag-stay') !== null || document.getElementById('content') == null) {
                    return; /*nothing to do here...*/
                }
                if (singleGag !== false) {
                    var ele = document.getElementById(gag);
                    if (ele != null && typeof (ele.parentNode) !== 'undefined' && typeof (ele.parentNode.removeChild) !== 'undefined') {
                        ele.parentNode.removeChild(ele);
                    }
                } else {
                    hhb_9gag.oldGagsList.forEach(function (gag) {
                        var ele = document.getElementById(gag);
                        if (ele != null && typeof (ele.parentNode) !== 'undefined' && typeof (ele.parentNode.removeChild) !== 'undefined') {
                            ele.parentNode.removeChild(ele);
                        }
                    });
                }
                if (document.getElementsByClassName('entry-item').length == 0) {
                    document.getElementById('content').style.minHeight = "1px";
                }
            }
            hhb_9gag.addNewOldGag = function (newOldGag) {
                try {
                    hhb_9gag._addNewOldGag(newOldGag);
                } catch (e) {
                    hhb_9gag.debug('hhb_9gag._addNewOldGag exception!', e);
                }
            }

            hhb_9gag._addNewOldGag = function (newOldGag) {
                if (hhb_9gag.oldGagsList.indexOf(newOldGag) == -1) {
                    hhb_9gag.oldGagsList.push(newOldGag);
                    hhb_9gag.syncPutGagsToServer(newOldGag);
                    localStorage.setItem('hhb_9gag.oldgags', JSON.stringify(hhb_9gag.oldGagsList));
                }
                //hhb_9gag.oldGagsList=hhb_9gag.removeDuplicatesInArray(hhb_9gag.oldGagsList);
                hhb_9gag.removeOldGags(newOldGag);
                //TODO: save in cookies/server
            }
            hhb_9gag.createHideButtons = function () {
                try {
                    hhb_9gag._createHideButtons();

                } catch (e) {
                    hhb_9gag.debug('hhb_9gag._createHideButtons exception!', e);
                }
            }
            hhb_9gag._createHideButtons = function () {
                if ((GAG.Ajax.LoadPage.getLoadCountMax() > GAG.Ajax.LoadPage._loadCount || GAG.Ajax.LoadPage._isLoading != false)) {
                    //should wait for hhb_9gag.preloadAll() to finish..
                    setTimeout(hhb_9gag.createHideButtons, 500);
                    return;
                }

                var elements = document.getElementsByClassName('sharing-box');
                for (i in elements) {
                    if (typeof (elements[i].parentNode) === 'undefined') {
                        continue; /*no idea why this happens, but it happens sometimes...*/
                    }
                    //bugged firefox 12 js engine is bugged, it seems. get value here, and it bugs in FF12. var gagIdName=elements[i].parentNode.parentNode.parentNode.parentNode.id;
                    //correct ID with alert, but always same ID in anon event function. alert("gagIdName is now:"+gagIdName.toString());
                    var button = document.createElement('img');
                    button.src = "http://img546.imageshack.us/img546/6202/95033049.jpg"; //credits: "http://superflat.typepad.com/.a/6a00d8341c1ad253ef015434958238970c-800wi"; //"http://img14.imageshack.us/img14/2530/insanitywolfmemetoooldv.jpg";
                    button.setAttribute('style', 'width:100%;height:100%;');
                    button.addEventListener('click', function (e) {
                        var gagIdName = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
                        //alert("im supposed to remove this meme now.. code not 100% complete yet... gagIdname: "+gagIdName.toString());
                        hhb_9gag.addNewOldGag(gagIdName);
                        //hhb_9gag.debug(gagIdName);
                    });
                    if (typeof (elements[i].appendChild) === 'function') elements[i].appendChild(button);
                }
                return;
            }

            hhb_9gag.removeDuplicatesInArray = function (arr) {
                /*just a small warning:
				this is just a quick code systemfault@irc.freenode.net/##javascript came up with, 
				its not benchmarked, may or may not be optimal.
				*/
                if (!Array.isArray(arr)) {
                    return arr;
                }
                return Object.keys(arr.reduce(function (p, n) {
                    p[n] = true;
                    return p;
                }, {}));
            }

            ////////////////////////////////////DRAGGABLE BOX////////////////////////////////////////////
            //Draggable box for greasemonkey, Ty http://userscripts.org/scripts/show/47608
            // OPTIONS ///////////////////////////////////////////////////////////////
            var box_style = 'border:4px ridge #0099FF; background:#BFE6FF;  cursor:move;' //'border:4px ridge #0099FF; background:#BFE6FF; color:#000; padding:16px; width:100px; height:14px; text-align:center; cursor:move;';
            //////////////////////////////////////////////////////////////////////////
            function dragStart(e) {
                dragObj.elNode = e.target;
                if (dragObj.elNode.nodeType == 3) dragObj.elNode = dragObj.elNode.parentNode;
                dragObj.cursorStartX = e.clientX + window.scrollX;
                dragObj.cursorStartY = e.clientY + window.scrollY;
                dragObj.elStartLeft = parseInt(dragObj.elNode.style.left, 10);
                dragObj.elStartTop = parseInt(dragObj.elNode.style.top, 10);
                dragObj.elNode.style.zIndex = ++dragObj.zIndex;
                document.addEventListener("mousemove", dragGo, true);
                document.addEventListener("mouseup", dragStop, true);
                e.preventDefault();
            }

            function dragGo(e) {
                e.preventDefault();
                var x = e.clientX + window.scrollX,
                    y = e.clientY + window.scrollY;
                dragObj.elNode.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
                dragObj.elNode.style.top = (dragObj.elStartTop + y - dragObj.cursorStartY) + "px";
            }

            function dragStop(e) {
                document.removeEventListener("mousemove", dragGo, true);
                document.removeEventListener("mouseup", dragStop, true);
            }

            var dragObj = new Object(),
                x, y;
            dragObj.zIndex = 0;
            (function () {
                return; /*just for highlighting in IDE... example usage*/
                var div = document.createElement('div');
                div.textContent = 'Draggable Box';
                div.setAttribute('id', 'draggable_box');
                div.setAttribute('style', 'z-index:99; position:fixed; top:' + ((window.innerHeight / 2) - 50) + 'px; left:' + ((window.innerWidth / 2) - 50) + 'px; -moz-border-radius:6px; ' + (box_style ? box_style : ''));
                div.addEventListener('mousedown', function (e) {
                    dragStart(e);
                }, false);
                document.body.insertBefore(div, document.body.firstChild);
            })();
            /////////////////////////////END OF DRAGGABLE BOX////////////////////////////////////////////
            hhb_9gag.init_id = setTimeout(hhb_9gag.init, 800);
        } //<end of hhb_9gag_toString_function
        /////START OF F**K YOU CHROME UNSAFEWINDOW/////
    var script = document.createElement('script');
    //	alert(hhb_9gag_toString_function.toString());
    script.innerHTML = 'try{(' + hhb_9gag_toString_function.toString() + ')();}catch(e){try{alert("Sorry! 9gag.com enhancements crashed, init000 :( exception info: "+e);console.log("e!!:");console.log(e);}catch(eee){alert("dafuq");}}';
    delete hhb_9gag_toString_function;
    document.getElementsByTagName('head')[0].appendChild(script);
    /////END OF F**K YOU CHROME UNSAFEWINDOW
    ////Finally, after Allot of fighting chrome and unsafeWindow, with this code, i found a way to avoid the unsafeWindow madness alltogether
    ///(at the cost of not being able to use GM_ functions in firefox..)
})();