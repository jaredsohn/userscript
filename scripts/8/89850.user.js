// ==UserScript==
// @name           Facebook - +++
// @namespace      Facebook - +++
// @include        http*://*.facebook.com/*
// @exclude        http*://*.facebook.com/plugins/*
// @exclude        http*://*.facebook.com/widgets/*
// @require        http://sizzlemctwizzle.com/updater.php?id=89850
// @version        3.1.
// ==/UserScript==
//GM_deleteValue("ON_OldList");
/*
setTimeout(addOptions,500);

function addOptions(){
	var fbNubButton = getElementsByClassName("fbNubButton","a",document);

	for(i=0; i<fbNubButton.length; i++){
		fbNubButton[i].addEventListener('click', function (event) {
			var panel_item = getElementsByClassName("panel_item","a",document);
			panel_item[1].addEventListener('click', function (event) {
				setTimeout(addopt,100);
			}, true);
		}, true);
	}
}

function addopt(){
	var options = getElementsByClassName("chat_setting","div",document);
	var newItem = document.createElement("div");
	newItem.className = "chat_setting clearfix";
	newItem.innerHTML = "<div class='input_box'><span class='show_loading'><img src='/images/loaders/indicator_blue_small.gif'></span><span class='hide_loading'><input name='chat_setting_checkbox_show_notifications' id='chat_setting_checkbox_show_notifications' type='checkbox'></span></div><label for='chat_setting_checkbox_show_notifications'>Snow notifications when friends sign in</label>";
	
	
	options[2].parentNode.appendChild(newItem);
}*/


/*
setTimeout(addHider,2000);
function addHider(){
	var fbNubButton = getElementsByClassName("fbNubButton","a",document);

	for(i=0; i<fbNubButton.length; i++){
		fbNubButton[i].addEventListener('click', function (event) {
			setTimeout(moveTooltip,200);
		}, true);
	}
}*/

if (getElementsByClassName("loggedout_menubar", "div", document).length > 0) {
    //if logged out
    return;
    //dont execute the script
}


document.getElementsByTagName("body")[0].addEventListener('click', function (event) {
    setTimeout(moveTooltip, 100);
}, true);

function moveTooltip() {
    if (document.getElementById("GM_Tooltip")) {
        if (unsafeWindow.buddyList.buddyListOpen == true) {
            moveDivHorizontalLeft(document.getElementById("GM_Tooltip"), document.getElementById("GM_Tooltip").style.right, 220);
        } else {
            moveDivHorizontalRight(document.getElementById("GM_Tooltip"), document.getElementById("GM_Tooltip").style.right, 15)
        }
    }
}
var moveTimeout;

function moveDivHorizontalLeft(div, start, finish) {
    var currentright = parseInt(div.style.right);

    var delay = function () {
        moveDivHorizontalLeft(div, start, finish);
    };

    if (currentright < finish) {
        div.style.right = (parseInt(div.style.right) + 5) + "px";
        clearTimeout(moveTimeout);
        moveTimeout = setTimeout(delay, 1);
    } else {

    }
    //basically fades out a div from 100 opacity to 0. Only works on FF i think. Scripted by me.
}

function moveDivHorizontalRight(div, start, finish) {
    var currentright = parseInt(div.style.right);

    var delay = function () {
        moveDivHorizontalRight(div, start, finish);
    };

    if (currentright > finish) {
        div.style.right = (parseInt(div.style.right) - 5) + "px";
        clearTimeout(moveTimeout);
        moveTimeout = setTimeout(delay, 1);
    } else {

    }
    //basically fades out a div from 100 opacity to 0. Only works on FF i think. Scripted by me.
}





//config
var checkTimeout = 3; //time to check changes (seconds)
var fullTransparency = 1; //full transparency notifications fade to
var maxshown = 10; //max friends that can be shown
var showtime = 10; //time notifications are shown for
addCustomJS("var ctrldown = false; \n" + "function detectspecialkeys(e){ \n" + "var evtobj=window.event? event : e \n" + "if (evtobj.ctrlKey) \n" + "	ctrldown = true; \n" + "} \n" + "function detectspecialkeys2(e){ \n" + "	ctrldown = false; \n" + "} \n" + "document.onkeydown=detectspecialkeys \n" + "document.onkeyup=detectspecialkeys2 \n");
//config

function addCustomJS(script) {
    var head = document.getElementsByTagName("head")[0];
    var newscript = document.createElement("script");
    newscript.innerHTML = script;
    head.appendChild(newscript);
}


GM_addStyle("#GM_Tooltip{z-Index:999999; position:fixed; bottom:30px; right:15px; background:url(http://i35.tinypic.com/id97pt.png) left bottom no-repeat;display:block;padding:0 0 4px;}");
GM_addStyle("#GM_Tooltext{border: 1px solid #424242; background-color:#526ea6; !important;display:block;font-size:11px;line-height:14px;white-space:nowrap; width:200px;}");
GM_addStyle(".GM_onlineIco{width:22px; height:22px;}");
GM_addStyle("#GM_Tooltext hr{background-color:#758BB8;}");
GM_addStyle("#GM_Tooltext ul li{padding:5px;}");
//http://i33.tinypic.com/28tylxy.gif
GM_addStyle("#GM_Tooltext ul .header{background-repeat:no-repeat; background-position:5px center; cursor:default; padding-left:25px; background-color:#EDEFF4; color:#000;}"); //1c2a47


GM_addStyle("#GM_Tooltext ul .clickItem a{color:#fff;}");
GM_addStyle("#GM_Tooltext ul .clickItem{border-bottom: 1px solid #4A6395; color:#fff;}");
GM_addStyle("#GM_Tooltext ul .clickItem:hover{background-color:#758BB8; cursor:pointer;}");


GM_addStyle("#GM_Tooltext ul .clickItemOffline a{color:#555555;}");
GM_addStyle("#GM_Tooltext ul .clickItemOffline{border-bottom: 1px solid #B5B5B5; background-color:#D8D8D8;}");
GM_addStyle("#GM_Tooltext ul .clickItemOffline:hover{background-color:#C5C5C5; cursor:pointer;}");

var changesTimeout;
changesTimeout = setTimeout(forceUpdate, 1000);
changesTimeout = setTimeout(checkChanges, checkTimeout * 1000);

var visibNotif = false;
//LOG if(GM_getValue("ON_OldList")){
//LOG 	var oldChatIds = GM_getValue("ON_OldList").split(",");
//LOG }else{
var oldChatIds = new Array();
//LOG }
var runTime = 0;

function forceUpdate() {
    unsafeWindow.ChatBuddyList.prototype._forceUpdate(false);
}

function checkChanges() {
    runTime++;
    forceUpdate();
    var changesChatUserInfos;
    var visibility = unsafeWindow.chatOptions.visibility;
    if (visibility == 0 || visibility == false) {
        //if(visibNotif == false){
        //showTooltip("Notifications are offline.<br>Enable facebook chat.", false);
        //changesTimeout = setTimeout(checkChanges, checkTimeout * 1000);
        //visibNotif = true;
        //}
        return;
    }
/*else{
		if(document.getElementById("GM_Tooltip")){
			document.getElementsByTagName("body")[0].removeChild(document.getElementById("GM_Tooltip"));
		}
	}*/
    visibNotif = false;


    //check online
    var chatIds = new Array();
    var bl = unsafeWindow.buddyList.availableList;
    for (e in bl) {
        chatIds.push(e);
    }


/*if(oldChatIds.length == 0){
			oldChatIds = chatIds;
			showTooltip("<li>Notifications are enabled.</li>");
			setTimeout(checkChanges,checkTimeout*1000);
			return;
		}*/

    changesChatUserInfos = chatIds.filter(function (x) {
        return oldChatIds.indexOf(x) < 0
    });
    var changesChatUserInfosOF;
    changesChatUserInfosOF = oldChatIds.filter(function (x) {
        return chatIds.indexOf(x) < 0
    });


    if (getElementsByClassName("GM_TooltipOnline", "div", document).length > 0 && changesChatUserInfosOF.length > 0) { //changesChatUserInfos.length > 0){
        chatIds = chatIds.concat(changesChatUserInfosOF);
        changesChatUserInfosOF = new Array();

    } else if (getElementsByClassName("GM_TooltipOffline", "div", document).length > 0 && changesChatUserInfos.length > 0) { //changesChatUserInfosOF.length > 0){
        chatIds = chatIds.concat(changesChatUserInfos);
        for (e = 0; e < changesChatUserInfos.length; e++) {
            removeItems(chatIds, changesChatUserInfos[e]);
        }
        changesChatUserInfos = new Array();
    } else if (changesChatUserInfos.length == 0 && changesChatUserInfosOF.length == 0) {
        changesTimeout = setTimeout(checkChanges, checkTimeout * 1000);
        return;
    }

/*if(changesChatUserInfos.length > 0){
		chatIds = chatIds.concat(changesChatUserInfosOF);
		changesChatUserInfosOF = new Array();
	}else if(changesChatUserInfosOF.length > 0){
		chatIds = chatIds.concat(changesChatUserInfos);
		changesChatUserInfos = new Array();
	}*/

    if (changesChatUserInfos.length > 0) {
        var onlineString = "";
        for (e = 0; e < maxshown; e++) {
            if (unsafeWindow.ChatUserInfos && unsafeWindow.ChatUserInfos[changesChatUserInfos[e]]) {

                //var firstName = unsafeWindow.ChatUserInfos[changesChatUserInfos[e]].firstName.replace(/['"]/g,'');
                var name = unsafeWindow.ChatUserInfos[changesChatUserInfos[e]].name.replace(/['"]/g, '');
                var thumbnail = unsafeWindow.ChatUserInfos[changesChatUserInfos[e]].thumbSrc;
                //onmouseout='this.getElementsByTagName(\"span\")[0].innerHTML=\""+firstName+"\"' onmouseover='this.getElementsByTagName(\"span\")[0].innerHTML=\""+name+"\"'
/*background-image:url("+ico+"); background-repeat:no-repeat; background-position:97% center;
				if(unsafeWindow.buddyList.availableList){
					if(unsafeWindow.buddyList.availableList[changesChatUserInfos[e]].i==1){
						var ico = "http://i33.tinypic.com/70i8sh.png";
					}else{			
						var ico = "http://i35.tinypic.com/2ceovv8.png";
					}
				}*/

                onlineString += "<li title='Click to start a chat, click+hold ctrl to visit profile.' class='clickItem' onmousedown=\"if(ctrldown==false){javascript:buddyList.itemOnClick(" + changesChatUserInfos[e] + ");}else{document.location = 'http://www.facebook.com/profile.php?id=" + changesChatUserInfos[e] + "';}\" style=' position:relative;'><a style='height:100%; width:100%; text-decoration:none;'><img class='GM_onlineIco' id='GM_onlineIco' src='" + thumbnail + "'><span style='left:5px; top:-6px; position:relative;'>" + name + "</span></a></li>";

            }
        }
        if (getElementsByClassName("GM_TooltipOffline", "div", document).length == 0) {
            showTooltip(onlineString, changesChatUserInfos.length, "online");
        }

    } else if (changesChatUserInfosOF.length > 0) {
        var offlineString = "";
        for (e = 0; e < maxshown; e++) {
            if (unsafeWindow.ChatUserInfos && unsafeWindow.ChatUserInfos[changesChatUserInfosOF[e]]) {

                //var firstName = unsafeWindow.ChatUserInfos[changesChatUserInfos[e]].firstName.replace(/['"]/g,'');
                var name = unsafeWindow.ChatUserInfos[changesChatUserInfosOF[e]].name.replace(/['"]/g, '');
                var thumbnail = unsafeWindow.ChatUserInfos[changesChatUserInfosOF[e]].thumbSrc;
                //onmouseout='this.getElementsByTagName(\"span\")[0].innerHTML=\""+firstName+"\"' onmouseover='this.getElementsByTagName(\"span\")[0].innerHTML=\""+name+"\"'
/*background-image:url("+ico+"); background-repeat:no-repeat; background-position:97% center;
				if(unsafeWindow.buddyList.availableList){
					if(unsafeWindow.buddyList.availableList[changesChatUserInfos[e]].i==1){
						var ico = "http://i33.tinypic.com/70i8sh.png";
					}else{			
						var ico = "http://i35.tinypic.com/2ceovv8.png";
					}
				}*/

                offlineString += "<li title='Click to start a chat, click+hold ctrl to visit profile.' class='clickItemOffline' onmousedown=\"if(ctrldown==false){javascript:buddyList.itemOnClick(" + changesChatUserInfosOF[e] + ");}else{document.location = 'http://www.facebook.com/profile.php?id=" + changesChatUserInfosOF[e] + "';}\" style=' position:relative;'><a style='height:100%; width:100%; text-decoration:none;'><img class='GM_onlineIco' id='GM_onlineIco' src='" + thumbnail + "'><span style='left:5px; top:-6px; position:relative;'>" + name + "</span></a></li>";

            }
        }
        if (getElementsByClassName("GM_TooltipOnline", "div", document).length == 0) {
            showTooltip(offlineString, changesChatUserInfosOF.length, "offline");
        }
    }




/*if (changesChatUserInfos.length > maxshown) {
        onlineString += "</ul><ul><li class='clickItem'  onmousedown='javascript:buddyList.openTab(true); document.getElementsByTagName(\"body\")[0].removeChild(document.getElementById(\"GM_Tooltip\"));'>";

        onlineString += "And <b>" + (changesChatUserInfos.length - maxshown) + "</b> other friends.";
        onlineString += "</li></ul>";
    }*/

    //LOG if(runTime == 1){
    //LOG 	showTooltip(onlineString,changesChatUserInfos.length,true);
    //LOG }else{
    //if(runTime > 1){
    //}
    //LOG }
    oldChatIds = chatIds;
    //LOG GM_setValue("ON_OldList",oldChatIds.toString());


    changesTimeout = setTimeout(checkChanges, checkTimeout * 1000);
}



function removeItems(array, item) {
    var i = 0;
    while (i < array.length) {
        if (array[i] == item) {
            array.splice(i, 1);
        } else {
            i++;
        }
    }
    return array;
}


var tempTimeout;

function showTooltip(text, numb, status) {
    var addon = "";
    if (status == "online") {
        setTimeout(moveTooltip, 100);
        var headerText = "Hanno effettuato l'accesso ";
        var iconURL = "http://i37.tinypic.com/10y2uj4.gif"
		var clickItemId = "clickItem";
    } else {
        var headerText = "Si sono disconnessi ";
        var iconURL = "http://i35.tinypic.com/256v1ww.gif"
		var clickItemId = "clickItemOffline";
    }

    if (numb && document.getElementById("GM_onlineCount")) {
        numb = parseInt(document.getElementById("GM_onlineCount").innerHTML) + numb;
    }
    if (numb) {
        addon = "<li class='header' style='background-image:url(\"" + iconURL + "\");'><label class='close uiCloseButton uiCloseButtonSmall' style='float:right;'><input title='Close' id='GM_Close' onclick='' type='button'></label><b>" + headerText + "<span style='color:#777790;'>(</span><span id='GM_onlineCount'>" + numb + "</span><span style='color:#777790;'>)</span>&nbsp;:</b></li>";
    }

    var addon2 = "";
    if (numb > maxshown) {
        addon2 += "<ul><li class='"+clickItemId+"' onmousedown='javascript:buddyList.openTab(true); document.getElementsByTagName(\"body\")[0].removeChild(document.getElementById(\"GM_Tooltip\"));'>";

        addon2 += "And <b id='GM_otherCount'>" + (numb - maxshown) + "</b> other friends.";
        addon2 += "</li></ul>";
    }



    if (document.getElementById("GM_Tooltip")) {
        var tooltip = document.getElementById("GM_Tooltext");
        tooltip.style.right = "15px";

        var toollist = document.getElementById("GM_Listbox");
        toollist.innerHTML += text;

        var listObjs = document.getElementById("GM_Listbox").getElementsByTagName("li");
        var timesToLoop = listObjs.length - maxshown;
        for (i = 0; i < timesToLoop; i++) {
            document.getElementById("GM_Listbox").removeChild(document.getElementById("GM_Listbox").getElementsByTagName("li")[0]);
        }


        if (document.getElementById("GM_onlineCount") && numb) {
            document.getElementById("GM_onlineCount").innerHTML = numb;
        }
        if (document.getElementById("GM_otherCount") && numb) {
            document.getElementById("GM_otherCount").innerHTML = (numb - maxshown);
        }


        clearTimeout(tempTimeout);
        tempTimeout = setTimeout(function () {
            fadeDivOut(document.getElementById("GM_Tooltip"));
        }, showtime * 1000);

    } else {

        var tooltip = document.createElement("div");
        tooltip.style.right = "15px";
        var body = document.getElementsByTagName("body")[0];
        //tooltip.className = "GM_Tooltip";
        tooltip.id = "GM_Tooltip";
        if (status == "offline") {
            tooltip.className = "GM_TooltipOffline";
        } else {
            tooltip.className = "GM_TooltipOnline";
        }
        tooltip.style.opacity = "0.0";
        tooltip.innerHTML = "<div id='GM_Tooltext'><ul>" + addon + "</ul><ul id='GM_Listbox'>" + text + "</ul>" + addon2 + "</div>"

        tooltip.addEventListener('mousemove', function (event) {
            clearTimeout(tempTimeout);
            tooltip.style.opacity = fullTransparency;
        }, true);

        tooltip.addEventListener('mouseout', function (event) {
            tempTimeout = setTimeout(function () {
                fadeDivOut(tooltip);
            }, showtime * 1000);
        }, true);



        body.appendChild(tooltip);

        document.getElementById("GM_Close").addEventListener('click', function (event) {
            clearTimeout(tempTimeout);
            document.getElementsByTagName("body")[0].removeChild(document.getElementById("GM_Tooltip"));
        }, true);

        fadeDivIn(tooltip);
    }
}


function fadeDivOut(div) {
    if (div) {
        opacity = div.style.opacity;
        div.style.opacity = parseFloat(opacity) - 0.05;
        var delay = function () {
            fadeDivOut(div);
        };
        if (opacity > 0) {
            tempTimeout = setTimeout(delay, 50);
        } else {
            //div.style.display = "none";
            document.getElementsByTagName("body")[0].removeChild(div);
        }
        //basically fades out a div from 100 opacity to 0. Only works on FF i think. Scripted by me.
    }
}

function fadeDivIn(div) {
    if (div) {
        var max = fullTransparency;
        opacity = div.style.opacity;
        div.style.opacity = parseFloat(opacity) + 0.05;

        var delay2 = function () {
            fadeDivIn(div);
        };
        if (opacity < max) {
            tempTimeout = setTimeout(delay2, 50);
        } else {
            setTimeout(function () {
                fadeDivOut(div);
            }, showtime * 1000);
        }
        //basically fades in a div from 0 opacity to 100. Only works on FF i think. Scripted by me.
    }
}

function getElementsByClassName(className, tag, elm) {
    var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
    var tag = tag || "*";
    var elm = elm || document;
    var elements = (tag == "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag);
    var returnElements = [];
    var current;
    var length = elements.length;
    for (var i = 0; i < length; i++) {
        current = elements[i];
        if (testClass.test(current.className)) {
            returnElements.push(current);
        }
    }
    return returnElements;
}