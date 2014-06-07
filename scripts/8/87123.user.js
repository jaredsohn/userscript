// ==UserScript== 
// @name        Facebook All-In-One
// @author      Multiple author 
// @namespace   Facebook
// @include     http*://*.facebook.* 
// ==/UserScript== 



//For change any option go in the relative part of the script

//For deactive function change yes in no

f1='yes';  //Facebook Smileys in Chatbar + Popout Chat
f2='yes';  //Facebook Online 
f4='yes';  //Facebook Replace "Profile" with Name
f5='yes';  //Facebook Notification Alert
f6='yes';  //Facebook Static/Fixed Header 
f7='yes';  //Facebook Remove Referring Info
f8='yes';  //Facebook Remove Ad's 
f9='yes';  //Facebook De-Junk 
f10='yes';  //Facebook Remove Sidebar 
f12='yes';  //Facebook Fitter 
f13='yes';  //Facebook Notification Noise 




//Facebook Smileys in Chatbar + Popout Chat 

function chatbar() {
    // List of emoticons
    // :) :( :D >:( -_- :/ o.O :p :'( >:O :v 3:) :o :3 ;) :* :|] 8) <3 :putnam: 8| ^_^ (^^^) O:)
    var emotsInfo = new Array();
    emotsInfo[0] = ':)';
    emotsInfo[1] = 590;
    emotsInfo[2] = ':(';
    emotsInfo[3] = 606;
    emotsInfo[4] = ':p';
    emotsInfo[5] = 622;
    emotsInfo[6] = ':D';
    emotsInfo[7] = 638;
    emotsInfo[8] = '>:(';
    emotsInfo[9] = 718;
    emotsInfo[10] = '-_-';
    emotsInfo[11] = 846;
    emotsInfo[12] = ':/';
    emotsInfo[13] = 734;
    emotsInfo[14] = 'o.O';
    emotsInfo[15] = 862;
    emotsInfo[16] = ":'(";
    emotsInfo[17] = 750;
    emotsInfo[18] = '>:O';
    emotsInfo[19] = 878;
    emotsInfo[20] = ':v';
    emotsInfo[21] = 894;
    emotsInfo[22] = '3:)';
    emotsInfo[23] = 766;
    emotsInfo[24] = ':o';
    emotsInfo[25] = 654;
    emotsInfo[26] = ':3';
    emotsInfo[27] = 910;
    emotsInfo[28] = ';)';
    emotsInfo[29] = 670;
    emotsInfo[30] = ':*';
    emotsInfo[31] = 798;
    emotsInfo[32] = '8)';
    emotsInfo[33] = 686;
    emotsInfo[34] = '<3';
    emotsInfo[35] = 814;
    emotsInfo[36] = '8|';
    emotsInfo[37] = 702;
    emotsInfo[38] = '^_^';
    emotsInfo[39] = 830;
    emotsInfo[40] = 'O:)';
    emotsInfo[41] = 782;
    emotsInfo[42] = ':|]';
    emotsInfo[43] = 924;
    emotsInfo[44] = '(^^^)';
    emotsInfo[45] = 940;
    emotsInfo[46] = ':putnam:';
    emotsInfo[47] = 572;
    emotsInfo[48] = '<(")';
    emotsInfo[49] = 518;
    emotsInfo[50] = '_msg_';
    emotsInfo[51] = 536;
    emotsInfo[52] = '*msg*';
    emotsInfo[53] = 554;
    emotsInfo[54] = 'popout';
    emotsInfo[55] = 500;

    var fEmotBarDom = false;

    function createDOMElement(popup) {
        if (!fEmotBarDom) {
            fEmotBarDom = document.createElement('div');
            fEmotBarDom.setAttribute('class', 'chat_tab_emot_bar');
            if (popup) {
                fEmotBarDom.setAttribute('style', 'line-height: 16px; background-color:#FFF;text-align:center;');
            } else {
                fEmotBarDom.setAttribute('style', 'padding-bottom: 2px; line-height: 16px; padding-left: 2px; background:#EEEEEE none repeat scroll 0 0; border-bottom-style: solid; border-bottom-width: 1px; border-color: #EEEEEE;');
            }
            for (i = 0; i < emotsInfo.length; i += 2) {
                if (i < 54 || !popup) {
                    var fEmotsDom = document.createElement('img');
                    fEmotsDom.setAttribute('alt', emotsInfo[i]);
                    fEmotsDom.setAttribute('style', 'cursor: pointer; background: transparent url(http://facebookchatbar.ucoz.com/images/themes/tmp_1.png) no-repeat scroll -' + emotsInfo[i + 1] + 'px -84px; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;');
                    fEmotsDom.setAttribute('src', 'http://static.ak.fbcdn.net/images/blank.gif');
                    fEmotsDom.setAttribute('class', 'emote_img');
                    fEmotBarDom.appendChild(fEmotsDom);
                }
            }
        }
    }

    document.addEventListener("DOMNodeInserted", fInsertedNodeHandler, false);

    var styleElement = document.createElement("style");
    styleElement.type = "text/css";
    if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText = ".fbNubFlyoutBody180 { height: 180px !important;}";
    } else {
        styleElement.appendChild(document.createTextNode(".fbNubFlyoutBody180 { height: 180px !important;}"));
    }
    document.getElementsByTagName("head")[0].appendChild(styleElement);

    function fInsertedNodeHandler(event) {
        if (event.target.getElementsByClassName && event.target.getElementsByClassName('fbNubFlyout')[0]) {
            createDOMElement(false);
            fInsertEmotBar(event.target);
        } else if (event.target.parentNode.getElementsByClassName && event.target.parentNode.getElementsByClassName('fbNubFlyoutBody')[0] && event.target.parentNode.getElementsByClassName('fbNubFlyoutBody')[0].className.indexOf('fbNubFlyoutBody180') == -1 && event.target.parentNode.className.indexOf('fbChatTab') > -1) {
            event.target.parentNode.getElementsByClassName('fbNubFlyoutBody')[0].className += ' fbNubFlyoutBody180';
        } else if (event.target.getElementsByClassName && event.target.getElementsByClassName('chat_input_div')[0]) {
            createDOMElement(true);
            fInsertEmotBarInPopup(event.target);
            if (event.target.getElementsByClassName('chat_conv')[0]) {

                var styleElement2 = document.createElement("style");
                styleElement2.type = "text/css";
                if (styleElement2.styleSheet) {
                    styleElement2.styleSheet.cssText = ".new_chat_conv { height: " + (parseFloat(document.getElementsByClassName('presence_popout')[0].scrollHeight) - 112) + "px !important;}";
                } else {
                    styleElement2.appendChild(document.createTextNode(".new_chat_conv { height: " + (parseFloat(document.getElementsByClassName('presence_popout')[0].scrollHeight) - 112) + "px !important;}"));
                }
                document.getElementsByTagName("head")[0].appendChild(styleElement2);


                for (var i = 0; i < event.target.getElementsByClassName('chat_conv').length; i++) {
                    event.target.getElementsByClassName('chat_conv')[i].className += ' new_chat_conv';
                }
            }
        }
    }

    function fInsertEmotBar(fChatWrapper) {
        fChatToolBox = fChatWrapper.getElementsByClassName('fbNubFlyout')[0].getElementsByClassName('fbNubFlyoutHeader')[0].getElementsByClassName('toolbox')[0];
        if (fChatToolBox && !fChatToolBox.getElementsByClassName('chat_tab_emot_bar')[0]) {
            fNewEmotBar = fEmotBarDom.cloneNode(true);
            for (i = 0; i < fNewEmotBar.getElementsByClassName('emote_img').length; i++) {
                fNewEmotBar.getElementsByClassName('emote_img')[i].removeEventListener('click', fEmotClickHandler, false);
                fNewEmotBar.getElementsByClassName('emote_img')[i].addEventListener('click', fEmotClickHandler, false);
            }
            if (fChatToolBox.childNodes) {
                fChatToolBox.insertBefore(fNewEmotBar, fChatToolBox.firstChild);
            } else {
                fChatToolBox.appendChild(fNewEmotBar);
            }
        } else if (fChatToolBox && fChatToolBox.getElementsByClassName('chat_tab_emot_bar')[0]) {
            //somehow we are losing the onClicks so unregister and re-register them
            fNewEmotBar = fChatToolBox.getElementsByClassName('chat_tab_emot_bar')[0];
            for (i = 0; i < fNewEmotBar.getElementsByClassName('emote_img').length; i++) {
                fNewEmotBar.getElementsByClassName('emote_img')[i].removeEventListener('click', fEmotClickHandler, false);
                fNewEmotBar.getElementsByClassName('emote_img')[i].addEventListener('click', fEmotClickHandler, false);
            }
        }
    }

    function fInsertEmotBarInPopup(fChatWrapper) {
        fChatInput = fChatWrapper.getElementsByClassName('chat_input_div')[0];
        if (fChatInput && !fChatInput.getElementsByClassName('chat_tab_emot_bar')[0]) {
            fNewEmotBar = fEmotBarDom.cloneNode(true);
            for (i = 0; i < fNewEmotBar.getElementsByClassName('emote_img').length; i++) {
                fNewEmotBar.getElementsByClassName('emote_img')[i].addEventListener('click', fEmotClickHandler, false);
            }
            if (fChatInput.childNodes) {
                fChatInput.insertBefore(fNewEmotBar, fChatInput.firstChild);
            } else {
                fChatInput.appendChild(fNewEmotBar);
            }

        } else if (fChatInput && !fChatInput.getElementsByClassName('chat_tab_emot_bar')[0]) {
            //somehow we are losing the onClicks so unregister and re-register them
            fNewEmotBar = fChatInput.getElementsByClassName('chat_tab_emot_bar')[0];
            for (i = 0; i < fNewEmotBar.getElementsByClassName('emote_img').length; i++) {
                fNewEmotBar.getElementsByClassName('emote_img')[i].removeEventListener('click', fEmotClickHandler, false);
                fNewEmotBar.getElementsByClassName('emote_img')[i].addEventListener('click', fEmotClickHandler, false);
            }
        }
    }

    function fEmotClickHandler(event) {
        var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('chat_input_div')[0].getElementsByClassName('chat_input')[0];
        if (event.target.getAttribute('alt') == 'popout') {
            window.open('http://www.facebook.com/presence/popout.php');
        } else {
            fChatInput.value += ' ' + event.target.getAttribute('alt') + ' ';
            fChatInput.focus();
        }
    }
}

//Facebook Online 

function online() {
    //config
    var onlineLar = "http://i49.tinypic.com/jgh6z9.png"; //(200x*)
    var onlineMed = "http://i50.tinypic.com/2800e2g.png"; //(50x50)
    var onlineSma = "http://i46.tinypic.com/o0bjer.png"; //(32x32) 
    var idleLar = "http://i48.tinypic.com/29aw5jr.png"; //(200x*)
    var idleMed = "http://i46.tinypic.com/zl7tyh.png"; //(50x50)
    var idleSma = "http://i50.tinypic.com/2czr5ti.png"; //(32x32) 
    //config
    setTimeout(checkForUpdate, 0);

    function getAvailableList() {
        var emptyList = new Array();
        var buddyList = unsafeWindow.buddyList.availableList;
        for (e in buddyList) {
            emptyList.push(e);
        }
        return emptyList;
    }

    function checkForUpdate() {
        if (!getAvailableList) {
            setTimeout(checkForUpdate, 500);
            return;
        }
        document.documentElement.removeEventListener('DOMNodeInserted', checkForUpdate, false);
        //unsafeWindow.ChatBuddyList.prototype._forceUpdate(false);
        setTimeout(updateIcons, 0);
        document.documentElement.addEventListener("DOMNodeInserted", checkForUpdate, false);
    }

    function cleanArray(actual) {
        var newArray = new Array();
        for (var i = 0; i < actual.length; i++) {
            if (actual[i]) {
                newArray.push(actual[i]);
            }
        }
        return newArray;
    }

    function sortNumber(a, b) {
        return b - a;
    }

    function isInArray(array, item) {
        if (array.indexOf(item) > -1) {
            return true;
        } else {
            return false;
        }
    }

    function onlineStatus(id) {
        var array = getAvailableList();
        if (array.indexOf(id) > -1) {
            return unsafeWindow.buddyList.availableList[id].i;
        } else {
            return -1;
        }
    }

    function replaceLargePic() {
        var largePic = document.getElementById("profile_pic");

        if (largePic && largePic.height > 20) {
            var part1 = largePic.src.split("/");
            var part2 = part1[part1.length - 1];
            var part3 = part2.replace(/[^0-9_]+/g, "");
            var part4 = part3.split("_");
            part4 = part4.sort(sortNumber);
            part4 = cleanArray(part4);
            var userID = part4[0];
            var userLink = largePic.parentNode.href;
            var userPic = largePic.src;

            if (onlineStatus(userID) > -1) {
                var overlayDiv = document.createElement("div");
                overlayDiv.className = "personIco";
                overlayDiv.style.height = largePic.height + "px";
                overlayDiv.style.backgroundImage = "url(" + userPic + ")";
                overlayDiv.style.position = "relative";
                var imgLink;
                if (onlineStatus(userID) == 1) {
                    imgLink = idleLar;
                } else {
                    imgLink = onlineLar;
                }
                overlayDiv.innerHTML = "<img class='onlineIco' style='position:absolute; left:0; bottom:0;' src='" + imgLink + "'>";
                largePic.parentNode.replaceChild(overlayDiv, largePic);
            }
        } else {
            setTimeout(replaceLargePic, 500);
        }
    }

    function updateIcons() {



        var medPics = getElementsByClassName("uiProfilePhoto profilePic uiProfilePhotoLarge img");
        var medPics2 = getElementsByClassName("UIProfileImage UIProfileImage_LARGE img");
        var medPics3 = getElementsByClassName("UIProfileImage UIProfileImage_LARGE");

        var profileChangePics = getElementsByClassName("uiFacepile uiFacepileLarge");
        var profileChangePics2 = new Array();
        for (i = 0; i < profileChangePics.length; i++) {
            var img = profileChangePics[i].getElementsByTagName("img");
            for (a = 0; a < img.length; a++) {
                profileChangePics2.push(img[a]);
            }
        }

        medPics = medPics.concat(medPics2);
        medPics = medPics.concat(medPics3);

        var smallPics = getElementsByClassName("UIProfileImage UIProfileImage_SMALL img");

        replaceLargePic();



        for (i = 0; i < profileChangePics2.length; i++) {
            var part1 = profileChangePics2[i].src.split("/");
            var part2 = part1[part1.length - 1];
            var part3 = part2.replace(/[^0-9_]+/g, "");
            var part4 = part3.split("_");
            part4 = part4.sort(sortNumber);

            part4 = cleanArray(part4);
            var userID = part4[0];

            var userLink = profileChangePics2[i].parentNode.href;
            var userPic = profileChangePics2[i].src;
            if (onlineStatus(userID) > -1) {
                var overlayDiv = document.createElement("div");
                overlayDiv.className = "personIco";
                overlayDiv.style.width = "50px";
                overlayDiv.style.height = "50px";
                overlayDiv.className = "uiProfilePhoto uiFacepileItem uiProfilePhotoLarge img";
                overlayDiv.style.backgroundColor = "red";
                overlayDiv.style.backgroundImage = "url(" + userPic + ")";
                var imgLink;
                if (onlineStatus(userID) == 1) {
                    imgLink = idleMed;
                } else {
                    imgLink = onlineMed;
                }
                overlayDiv.innerHTML = "<img class='onlineIco' src='" + imgLink + "'>";
                profileChangePics2[i].parentNode.replaceChild(overlayDiv, profileChangePics2[i]);
            }
        }

        for (i = 0; i < medPics.length; i++) {
            var part1 = medPics[i].src.split("/");
            var part2 = part1[part1.length - 1];
            var part3 = part2.replace(/[^0-9_]+/g, "");
            var part4 = part3.split("_");
            part4 = part4.sort(sortNumber);
            part4 = cleanArray(part4);
            var userID = part4[0];

            var userLink = medPics[i].parentNode.href;
            var userPic = medPics[i].src;
            if (onlineStatus(userID) > -1) {
                var overlayDiv = document.createElement("div");
                overlayDiv.className = "personIco";
                overlayDiv.style.width = "50px";
                overlayDiv.style.height = "50px";
                overlayDiv.style.backgroundColor = "red";
                overlayDiv.style.backgroundImage = "url(" + userPic + ")";
                var imgLink;
                if (onlineStatus(userID) == 1) {
                    imgLink = idleMed;
                } else {
                    imgLink = onlineMed;
                }
                overlayDiv.innerHTML = "<img class='onlineIco' src='" + imgLink + "'>";
                medPics[i].parentNode.replaceChild(overlayDiv, medPics[i]);
            }
        }

        for (i = 0; i < smallPics.length; i++) {
            var part1 = smallPics[i].src.split("/");
            var part2 = part1[part1.length - 1];
            var part3 = part2.replace(/[^0-9_]+/g, "");
            var part4 = part3.split("_");
            part4 = part4.sort(sortNumber);
            part4 = cleanArray(part4);
            var userID = part4[0];

            var userLink = smallPics[i].parentNode.href;
            var userPic = smallPics[i].src;
            if (onlineStatus(userID) > -1) {
                var overlayDiv = document.createElement("div");
                overlayDiv.className = "smallPersonIco";
                overlayDiv.style.width = "32px";
                overlayDiv.style.height = "32px";
                overlayDiv.style.margin = "0px";
                overlayDiv.style.padding = "0px";
                overlayDiv.style.backgroundImage = "url(" + userPic + ")";
                var imgLink;
                if (onlineStatus(userID) == 1) {
                    imgLink = idleSma;
                } else {
                    imgLink = onlineSma;
                }
                overlayDiv.innerHTML = "<img class='onlineIco' src='" + imgLink + "'>";
                smallPics[i].parentNode.replaceChild(overlayDiv, smallPics[i]);
            }
        }

        var personIco = getElementsByClassName("personIco");
        var smallPersonIco = getElementsByClassName("smallPersonIco");
        personIco = personIco.concat(smallPersonIco);

        for (i = 0; i < personIco.length; i++) {
            var bgSrc = personIco[i].style.backgroundImage;
            bgSrc = bgSrc.replace("url(\"", "");
            bgSrc = bgSrc.replace("\"", "");
            var part1 = bgSrc.split("/");
            var part2 = part1[part1.length - 1];
            var part3 = part2.replace(/[^0-9_]+/g, "");
            var part4 = part3.split("_");
            part4 = part4.sort(sortNumber);
            part4 = cleanArray(part4);
            var userID = part4[0];

/*a work im progress.. too buggy for now.
        var personWidth;
        personWidth = personIco[i].getElementsByTagName("img")[0].width;
        var imgLink;
        if(onlineStatus(userID) == 1 && personWidth == 32){ imgLink = idleSma; }else if(personWidth == 32){ imgLink = onlineSma; }
        if(onlineStatus(userID) == 1 && personWidth == 50){ imgLink = idleMed; }else if(personWidth == 50){ imgLink = onlineMed; }
        if(onlineStatus(userID) == 1 && personWidth == 200){ imgLink = idleLar; }else if(personWidth == 200){ imgLink = onlineLar; }
        */

            if (onlineStatus(userID) > -1) {
/*a work im progress.. too buggy for now.
          personIco[i].getElementsByTagName("img")[0].src = imgLink;
          */
                personIco[i].getElementsByTagName("img")[0].style.display = "block";
            } else {
/*a work im progress.. too buggy for now.
          personIco[i].getElementsByTagName("img")[0].src = imgLink;
          */
                personIco[i].getElementsByTagName("img")[0].style.display = "none";
            }
        }



    }

    addStyle(".smallPersonIco{ -moz-background-size:32px; }");

    function addStyle(style) {
        var head = document.getElementsByTagName("HEAD")[0];
        var ele = head.appendChild(window.document.createElement('style'));
        ele.innerHTML = style;
        return ele;
    }

    function getElementsByClassName(className, tag, elm) {
        if (document.getElementsByClassName) {
            getElementsByClassName = function (className, tag, elm) {
                elm = elm || document;
                var elements = elm.getElementsByClassName(className),
                    nodeName = (tag) ? new RegExp("\\b" + tag + "\\b", "i") : null,
                    returnElements = [],
                    current;
                for (var i = 0, il = elements.length; i < il; i += 1) {
                    current = elements[i];
                    if (!nodeName || nodeName.test(current.nodeName)) {
                        returnElements.push(current);
                    }
                }
                return returnElements;
            };
        } else if (document.evaluate) {
            getElementsByClassName = function (className, tag, elm) {
                tag = tag || "*";
                elm = elm || document;
                var classes = className.split(" "),
                    classesToCheck = "",
                    xhtmlNamespace = "http://www.w3.org/1999/xhtml",
                    namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace) ? xhtmlNamespace : null,
                    returnElements = [],
                    elements, node;
                for (var j = 0, jl = classes.length; j < jl; j += 1) {
                    classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
                }
                try {
                    elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
                }
                catch (e) {
                    elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
                }
                while ((node = elements.iterateNext())) {
                    returnElements.push(node);
                }
                return returnElements;
            };
        } else {
            getElementsByClassName = function (className, tag, elm) {
                tag = tag || "*";
                elm = elm || document;
                var classes = className.split(" "),
                    classesToCheck = [],
                    elements = (tag === "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag),
                    current, returnElements = [],
                    match;
                for (var k = 0, kl = classes.length; k < kl; k += 1) {
                    classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
                }
                for (var l = 0, ll = elements.length; l < ll; l += 1) {
                    current = elements[l];
                    match = false;
                    for (var m = 0, ml = classesToCheck.length; m < ml; m += 1) {
                        match = classesToCheck[m].test(current.className);
                        if (!match) {
                            break;
                        }
                    }
                    if (match) {
                        returnElements.push(current);
                    }
                }
                return returnElements;
            };
        }
        return getElementsByClassName(className, tag, elm);
    }
}



//Facebook Replace "Profile" with Name 

function profile_name() {
    setTimeout(setName, 50);

    function setName() {
        if (document.getElementById("pageNav")) {
            PageNav = document.getElementById("pageNav");
            ProfileBtn = PageNav.getElementsByTagName("li")[1];
            ProfileBtnText = ProfileBtn.getElementsByTagName("a")[0];
            ProfileBtnText.innerHTML = document.getElementById("navAccountName").innerHTML;
        } else {
            setTimeout(setName, 50);
        }
    }
}

//Facebook Notification Alert 

function notification_alert() {
    setTimeout(setName, 50);

    function setName() {
        if (document.getElementById("pageNav")) {
            PageNav = document.getElementById("pageNav");
            ProfileBtn = PageNav.getElementsByTagName("li")[1];
            ProfileBtnText = ProfileBtn.getElementsByTagName("a")[0];
            ProfileBtnText.innerHTML = document.getElementById("navAccountName").innerHTML;
        } else {
            setTimeout(setName, 50);
        }
    }
}

//Facebook Static/Fixed Header 

function static() {
    // CSS to make Header Fixed.
    addStyle(

    '  #globalContainer { position : relative !important; margin : 0 auto !important; }  ' + '  #blueBar{ position : fixed !important; top : 0px !important; float : center !important; z-index: 13 !important}  ' + '  #pageHead{ position : relative !important; left : auto !important; width : 980px !important;  float : center !important; }  ' + '  #pageLogo, #jewelCase { position : fixed !important; top : 0 !important; left : auto !important; }  ' + '  #jewelCase { margin-left : 97px !important; top : -5px !important; height : 31px !important;}  ' + '  #headNavOut{ position : fixed !important; top : 10px !important; width : 783px !important; }  '

    );

    // Function to add style

    function addStyle(css) {

        if (typeof GM_addStyle !== 'undefined') {
            return GM_addStyle(css);
        }

        else if (heads = document.getElementsByTagName('head')) {
            var style = document.createElement('style');
            try {
                style.innerHTML = css;
            }
            catch (x) {
                style.innerText = css;
            }
            style.type = 'text/css';
            heads[0].appendChild(style);
        }
    }
}

//Facebook Remove Referring Info 

function remove_info() {
    function removeref(loc) {
        if (loc.indexOf('?ref=') >= 0) {
            return loc.substring(0, loc.indexOf('?ref='));
        }
        else {
            return loc;
        }
    }

    var linksArr = document.links;
    for (var i = 0; i < linksArr.length; i++) {
        if (document.links[i].getAttribute("class") != "navMoreLess") {
            document.links[i].href = removeref(linksArr[i].href);
        }
        if (document.links[i].getAttribute("onclick") == null) {
            document.links[i].setAttribute("onclick", "removepound()");
        }
    }

    function removepound() {
        var loc = window.location.href;

        if (loc.indexOf('#!/') >= 0) {
            var pindex = loc.indexOf('#!/') + 3;
            var loc2 = loc.substring(pindex, loc.length);
            loc = loc.substring(0, loc.indexOf('.com/') + 5);
            loc = loc + loc2;
            window.location.href = loc;
        }
    }
}

//Facebook Remove Ad's 

function remove_ads() {
    function Remove_All_Facebook_Ads() {

        var sidebar_ads = document.getElementById('sidebar_ads');
        if (sidebar_ads && sidebar_ads.style.visibility != 'hidden') { //Prevents the visibility from being set multiple times unnecessarily
            //GM_log("Removing Facebook sidebar ads.");
            sidebar_ads.style.visibility = 'hidden';
        }

        var elements = document.evaluate("//div[contains(@class, 'ad_capsule')] | //div[contains(@class, 'social_ad')] | //div[contains(@class, 'sponsor')] | //div[contains(@id, 'sponsor')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        for (var i = 0; i < elements.snapshotLength; i++) {
            var thisElement = elements.snapshotItem(i);
            //GM_log("Removing Facebook ad element with class='" + thisElement.className + "' and id='" + thisElement.id + "'.");
            thisElement.parentNode.removeChild(thisElement);
        }

    }

    document.addEventListener("DOMNodeInserted", Remove_All_Facebook_Ads, true);
}

//Facebook De-Junk 

function remove_junk() {
    removeContent('pagelet_netego');
    removeContent('pagelet_adbox');
    removeContent('pagelet_questionsbox');
    removeContent('pagelet_netego_lower');
    removeContent('navItem_questions');
    removeClass('UIStandardFrame_SidebarAds');
    removeClass('adcolumn');
    removeClass('PYMK_Reqs_Sidebar');
    removeClass('hp_connect_box');

    function removeContent(id) {
        var node = document.getElementById(id);
        if (node) {
            node.parentNode.removeChild(node);
            node = null;
        }
    }

    function removeClass(cls) {

        var cool = document.getElementsByClassName(cls);

        if (cool.length > 0) {
            for (var d = 0; d < cool.length; d++) {
                cool[d].parentNode.removeChild(cool[d]);
                cool[d] = null;
            }
        }
    }
    document.getElementsByClassName = function (clsName) {
        var retVal = new Array();
        var elements = document.getElementsByTagName("*");
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].className.indexOf(" ") >= 0) {
                var classes = elements[i].className.split(" ");
                for (var j = 0; j < classes.length; j++) {
                    if (classes[j] == clsName) retVal.push(elements[i]);
                }
            }
            else if (elements[i].className == clsName) retVal.push(elements[i]);
        }
        return retVal;
    }
}

//Facebook Remove Sidebar 

function sidebar() {
    function blub() {
        if (document.getElementById("contentCol").className != "noRightCol") {
            document.getElementById("rightCol").innerHTML = "";
            document.getElementById("contentCol").className = "noRightCol";
        }
    }
    document.addEventListener("DOMNodeInserted", blub, true);
}


//Facebook Fitter 

function fitter() {
    function addCSS(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) {
            return;
        }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    // Throwing in a div with text just to remind users they are using this script
    var logo = document.createElement("div");
    logo.innerHTML = '<div class="notice">Fitter Facebook 1.0 (beta)</div>';
    document.body.insertBefore(logo, document.body.firstChild);

    // Hiding the adverts
    addCSS('body {margin-top:-13px !important;}' + '#pagelet_adbox {display:none !important;}' + '#sidebar_ads {visibility:hidden !important;}' + '.ego_column {visibility:hidden !important;}' +
    // OK so I would have prefered to just use display:none on the last 2 divs, but doing so thew the rest of the design into disarray.

    // Making things pretty, and slightly more usable (debatable)
    'img {border:solid 2px #fff !important; -moz-border-radius:6px !important; -webkit-border-radius:6px !important; -moz-box-shadow: 2px 2px 7px #ccc !important; -webkit-box-shadow: 2px 2px 7px #ccc !important;}' + '.UIMediaItem_Wrapper {border:none !important; padding:10px !important;}' + '.UIMediaItem_Wrapper img {-moz-box-shadow:3px 3px 7px #ccc !important; -webkit-box-shadow:3px 3px 7px #ccc !important;}' + '.uiPhotoThumb {border:none !important; padding:10px !important;}' + '.UIStoryAttachment_BlockQuote {border-left:solid 2px #ffcc33 !important; position:relative !important; left:15px !important;}' + '.UIIntentionalStory {padding:13px 0 10px 65px !important; margin-bottom:0 !important;}' + '.UIIntentionalStory:hover, .UIRecentActivity_Stream:hover {background:#f3f3f3 !important; -moz-border-radius:8px !important; -webkit-border-radius:8px !important}' + '.UIIntentionalStory:hover .uiUfi {background:#fff !important;}' + '.UIIntentionalStory:hover .ufiItem {background:#fff !important;}' + '.pvm:hover {background:#f3f3f3 !important; -moz-border-radius:8px !important; -webkit-border-radius:8px !important}' + '.pvm:hover .uiUfi {background:#fff !important;}' + '.pvm:hover .ufiItem {background:#fff !important;}' + '.textBox {-moz-border-radius:5px !important; -webkit-border-radius:5px !important; -moz-box-shadow:inset 3px 3px 4px #dcdcdc !important; -webkit-box-shadow:inset 3px 3px 4px #dcdcdc !important;}' + '.UIComposer_InputArea {-moz-border-radius:5px !important; -webkit-border-radius:5px !important; -moz-box-shadow:inset 3px 3px 4px #d1d1d1 !important; -webkit-box-shadow:inset 3px 3px 4px #d1d1d1 !important; background:#f7f7f7 !important;}' + '.UIComposer_InputShadow {border:none !important; background:none !important;}' + '.Mentions_Input {background:none !important;}' + '.UIComposer_TextArea {background:none !important;}' +

    // Styling for the div that contains the 'Better Facebook 1.0 (beta)' notice
    '.notice {z-index:99999 !important; color:#fff !important; margin:0 auto !important; width:140px !important; position:relative !important; top:33px !important; left:100px !important; margin:0 auto !important; font-size:11px !important;}');
}

//Facebook Notification Noise 

function noise() {
    //Config
    var remindMe = true; //whether or not to continue beeping until the notification has been read
    var remindTime = 60; //time to remind (in seconds)
    var checkTime = 1; //time to check (in seconds)
    var notifSound = "http://www.pacdv.com/sounds/interface_sound_effects/sound95.wav"; //link to notification sound 
    var remindSound = "http://www.pacdv.com/sounds/interface_sound_effects/sound99.wav"; //link to reminder sound
    //Config



    //Leave these be.
    addDummy(); //add the dummy div
    setTimeout(checkNew, 200); //start checking 20ms after the page loads
    var oldArray = new Array(0, 0, 0); //an array to contain the previous notificiation counts
    var isFirst = true;
    var reminder = false;
    var remindTimeout;
    //Leave these be.

    function addDummy() {
        //A dummy div to hold the sound player
        var body = document.getElementsByTagName("body")[0];
        var dummyPlayer = document.createElement("div");
        dummyPlayer.id = "dummyPlayer";
        //create the div
/*
    var soundPlayer = document.createElement("embed");
    soundPlayer.src = notifSound;
    soundPlayer.width = 0;
    soundPlayer.height = 0;
    soundPlayer.setAttribute("autostart", "false");
    soundPlayer.setAttribute("enablejavascript", "true");
    dummyPlayer.appendChild(soundPlayer);
    var soundPlayer = document.createElement("embed");
    soundPlayer.src = remindSound;
    soundPlayer.width = 0;
    soundPlayer.height = 0;
    soundPlayer.setAttribute("autostart", "false");
    soundPlayer.setAttribute("enablejavascript", "true");
    dummyPlayer.appendChild(soundPlayer);
    //preload sounds, ready for play
    */
        body.appendChild(dummyPlayer);
        //load the sounds into the dummy div
    }




    function checkNew() {
        var jewelCount = getElementsByClassName("jewelCount");
        //the friend,message, and notification counters
        var friendCount = jewelCount[0].getElementsByTagName("span")[0].innerHTML;
        //the # of friend requests
        var messageCount = jewelCount[1].getElementsByTagName("span")[0].innerHTML;
        //the # of messages
        var notificationCount = jewelCount[2].getElementsByTagName("span")[0].innerHTML;
        //the # of notifications
        var jewelTotal = friendCount + messageCount + notificationCount;
        //count up the total number of friend requests, messages, etc
        var jewelArray = new Array(friendCount, messageCount, notificationCount);
        //put the notifications into an array
        if (joinArray(oldArray) != joinArray(jewelArray) && jewelTotal != 0 && isFirst == true) {
            //if the notifications have changed, and the total is not 0, and this is the first time
            newNotifications();
            //launch new notifications
            if (remindMe == true) {
                //if you have chosen to play a persistant beep until the notifications have been read
                clearTimeout(remindTimeout);
                //stop the reminder
                isFirst = false;
                //it's no longer the first time
            }
        } else if (joinArray(oldArray) == joinArray(jewelArray) && jewelTotal != 0 && isFirst == false && reminder == false && remindMe == true) {
            //if the notifications have not changed, and we have already been notified once, and if we choose to play a persistant sound
            remindNotifications();
            //launch remind notifications
        } else if (joinArray(oldArray) != joinArray(jewelArray) && jewelTotal != 0) {
            //if the notifications have changed and the total isnt 0
            newNotifications();
            //launch new notifications
            if (remindMe == true) {
                //if you have chosen to play a persistant beep until the notifications have been read
                remindNotifications();
                //launch remind notifications
                clearTimeout(remindTimeout);
                //stop the reminder
                isFirst = false;
                //it's no longer the first time
            }
        }

        if (jewelTotal == 0) {
            if (remindMe == true) {
                //if you have chosen to play a persistant beep until the notifications have been read
                reminder = false;
                //we are no longer being reminded
                clearTimeout(remindTimeout);
                //stop the reminder
                isFirst = true;
                //it's now the first time
                //clearDummy();
                //clear the dummy (we might as well)
            }
        }

        oldArray = jewelArray;
        //save the new array into an old array, for comparing
        setTimeout(checkNew, checkTime * 1000);
        //launch this function again in x seconds
    }

    function newNotifications() {
        playSound();
        //play the notification sound
    }

    function remindNotifications() {
        remindTimeout = setTimeout(playRemindSound, (remindTime * 1000) - (checkTime * 1000));
        //play the reminder noise in x seconds
        reminder = true;
        //a reminder is in progress
    }

    function clearDummy() {
        var dummyPlayer = document.getElementById("dummyPlayer");
        dummyPlayer.innerHTML = "";
        //clear the dummy
    }

    function playRemindSound() {
        var dummyPlayer = document.getElementById("dummyPlayer");
        dummyPlayer.innerHTML = "<embed hidden=\"true\" autoplay=\"true\" enablejavascript=\"true\" loop=\"false\" autostart=\"true\" src=\"" + remindSound + "\" height=\"0\" width=\"0\">";
        reminder = false;
        //play the reminder sound
    }

    function playSound() {
        var dummyPlayer = document.getElementById("dummyPlayer");
        dummyPlayer.innerHTML = "<embed hidden=\"true\" autoplay=\"true\" enablejavascript=\"true\" loop=\"false\" autostart=\"true\" src=\"" + notifSound + "\" height=\"0\" width=\"0\">";
        //play the notification sound
    }



    function joinArray(array) {
        //turn an array into a string (for comparison)
        var a, b;
        a = array;
        b = a.join("");
        return (b);
    }

/*
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/

*/

    function getElementsByClassName(className, tag, elm) {
        if (document.getElementsByClassName) {
            getElementsByClassName = function (className, tag, elm) {
                elm = elm || document;
                var elements = elm.getElementsByClassName(className),
                    nodeName = (tag) ? new RegExp("\\b" + tag + "\\b", "i") : null,
                    returnElements = [],
                    current;
                for (var i = 0, il = elements.length; i < il; i += 1) {
                    current = elements[i];
                    if (!nodeName || nodeName.test(current.nodeName)) {
                        returnElements.push(current);
                    }
                }
                return returnElements;
            };
        } else if (document.evaluate) {
            getElementsByClassName = function (className, tag, elm) {
                tag = tag || "*";
                elm = elm || document;
                var classes = className.split(" "),
                    classesToCheck = "",
                    xhtmlNamespace = "http://www.w3.org/1999/xhtml",
                    namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace) ? xhtmlNamespace : null,
                    returnElements = [],
                    elements, node;
                for (var j = 0, jl = classes.length; j < jl; j += 1) {
                    classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
                }
                try {
                    elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
                }
                catch (e) {
                    elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
                }
                while ((node = elements.iterateNext())) {
                    returnElements.push(node);
                }
                return returnElements;
            };
        } else {
            getElementsByClassName = function (className, tag, elm) {
                tag = tag || "*";
                elm = elm || document;
                var classes = className.split(" "),
                    classesToCheck = [],
                    elements = (tag === "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag),
                    current, returnElements = [],
                    match;
                for (var k = 0, kl = classes.length; k < kl; k += 1) {
                    classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
                }
                for (var l = 0, ll = elements.length; l < ll; l += 1) {
                    current = elements[l];
                    match = false;
                    for (var m = 0, ml = classesToCheck.length; m < ml; m += 1) {
                        match = classesToCheck[m].test(current.className);
                        if (!match) {
                            break;
                        }
                    }
                    if (match) {
                        returnElements.push(current);
                    }
                }
                return returnElements;
            };
        }
        return getElementsByClassName(className, tag, elm);
    }
}

if(f1 == 'yes'){
	chatbar()
}
if(f2 == 'yes'){
	online()
}
if(f4 == 'yes'){
	profile_name()
}
if(f5 == 'yes'){
	notification_alert()
}
if(f6 == 'yes'){
	static()
}
if(f7 == 'yes'){
	remove_info()
}
if(f8 == 'yes'){
	remove_ads()
}
if(f9 == 'yes'){
	remove_junk()
}
if(f10 == 'yes'){
	sidebar()
}
if(f12 == 'yes'){
	fitter()
}
if(f13 == 'yes'){
	noise()
}
