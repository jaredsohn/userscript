// -----------------------------------------------------
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2, or (at your option)
// any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
//
// -----------------------------------------------------
// ==UserScript==
// @name            Vollscript "Dein-SVZ-kann-mehr.de.vu" BETA!!
// @description     ACHTUNG: WENN IHR DIE V. BETA INSTALLIERT, MUESST IHR DAS ALTE SCRIPT DRINGEND DEAKTIVIEREN!!
// @include         http://*schuelervz.net*
// @include          http://*studivz.net*
// @include          http://*meinvz.net*
//Werbung
(function(){
  GM_addStyle(".ad_container, #ad770x90, #ad160x600 {display:none;} #allIn{width:800px;}");
  if(document.getElementById("startLeft")){
    var divs=document.getElementById("startLeft").getElementsByTagName("div")
    for(var i=0;i<divs.length;i++)
      if(divs[i].innerHTML.indexOf("<span class=\"ad\">")>-1)
        divs[i].className+=" ad_container";
  }
})();



//Sidebar
addGlobalStyle = function (css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
}


getUsers = function() {

    if(firstTime)
        updateStatus(-1, 'Lade...');

    //update time +/- 20%
    var now = new Date();
    var time = parseInt(now.getTime()+(settings["update"]-settings["update"]*0.2+Math.random()*settings["update"]*0.4)*1000).toString();
    GM_setValue(siteName + '.time', time);
    timeOld = time;

//ajax magic :P
    var xmlReq = GM_xmlhttpRequest({
        method: 'GET',
        url: url + 'Friends/Search/' + profId + '/name//o/1',
        onload: function(originalRequest) {

            //get friends list
            var friends = document.createElement('div');
            friends.innerHTML = originalRequest.responseText;

            var tags = friends.getElementsByTagName('li');

            var nodes = [];
            for (var n = 0; n < tags.length; n++)
                if (tags[n].className == 'clearFix' && tags[n].parentNode.className == 'tcl')
                    nodes[nodes.length] = tags[n];

            var content = profId;

            for ( var i=0 ; i < nodes.length; i++ ) {
                var id = nodes[i].childNodes[1].childNodes[1].href;
                id = id.substring(id.lastIndexOf('/')+1, id.length);

                var name = nodes[i].childNodes[1].childNodes[1].childNodes[1].alt;

                var pic = nodes[i].childNodes[1].childNodes[1].childNodes[1].src;
                pic = pic.replace('nopic-m.jpg', 'nopic-w.jpg').replace('-m.jpg', '-s.jpg');

                var status = "";
                var text = nodes[i].childNodes[3].getElementsByTagName('div');
                if(text.length == 15 || text.length == 10)
                    status = text[text.length-3].innerHTML;

                content += "," + id + "," + encodeURIComponent(name) + "," + encodeURIComponent(status) + "," + encodeURIComponent(pic);
            }

            if(nodes.length == 0 && friends.innerHTML.indexOf('jsEnabled') != -1)
                content += ',off';

            GM_setValue(siteName + '.content', content);

            //add a bit in case someone took content during request
            var time = (parseInt(timeOld)+1).toString();
            GM_setValue(siteName + '.time', time);
            timeOld = time;

            updateSidebar();
        }
    });

    var xmlReq2 = GM_xmlhttpRequest({
        method: 'GET',
        url: url + 'Messages',
        onload: function(originalRequest) {
            count = originalRequest.responseText.match(/status_new/g);
            count = (count) ? count.length : 0;
            GM_setValue(siteName + '.messages', count);

            updateMessages();
        }
    });
}

updateSidebar = function () {
    var list = GM_getValue(siteName + '.content', '');

    list = list.split(',');
    for(var i = 0; i < list.length; i++)
        list[i] = decodeURIComponent(list[i]);

    if(list.length == 2 && list[1] == 'off') {
        updateStatus(-1, 'Du bist ausgeloggt!');
        list.pop()
    }
    else {
        idle = false;
        updateStatus(list.length, '');
    }

    for(var i = 1; i < local_list.length; i += 4) {
        var search = searchList(list, local_list[i]);
        if(search >= 0)
            updateItem(list.slice(search,search+4), local_list.slice(i,i+4));
        else
            deleteItem(local_list[i]);
    }

    for(var i = 1; i < list.length; i += 4) {
        var search = searchList(local_list, list[i]);
        if(search == -1)
            insertItem(list, i);
    }

    local_list = list;
    firstTime = false;
}


updateStatus = function (length, extra) {
    var status = document.getElementById('sb_status_text');

    var text = '';

    if(length >= 0) {
        length = (length-1)/4;
        if(length <= 0)
            text = 'Niemand ist online';
        else if(length == 1)
            text = 'Ein Freund ist online';
        else
            text = length + ' Freunde sind online!';
    }
    else
        text = extra;

    status.innerHTML = text;
}


updateItem = function (data, old) {
    if(data.join() != old.join()) {
        writeItem(data);
        if(settings['effects']) {
            var item = document.getElementById('sb_' + data[0]).firstChild;
            var origColor = getComputedStyle(item, '').backgroundColor;

            $(item).animate({ backgroundColor: color }, 500);
            $(item).animate({ backgroundColor: origColor }, 2000);
        }
    }
}

deleteItem = function (id) {
    var item = document.getElementById('sb_' + id);
    if(!firstTime && settings['effects']) {
        $(item).animate({height: "toggle", opacity: "toggle"}, {duration: 2500});
        $(item).queue(function () {item.parentNode.removeChild(item);  $(item).dequeue(); });
    }
    else
        item.parentNode.removeChild(item);
}

writeItem = function (data) {
    var text = '<div class="commentMetaData sb_cont"><div class="clearFix">'
    text += '<div class="sb_image">';

    var iconmode = '';
    if(!settings["pic"] && settings["icons"])
        iconmode = ' sb_img_mode2';

    if(settings["pic"])
        text += '<a href="'+url+'Profile/'+data[0]+'" title="Profil"><img src="'+data[3]+'" class="m"/></a><br/>';
    if(settings["icons"]) {
        text += '<a href="'+url+'Friends/All/'+data[0]+'" title="Friends"><div class="sb_img_a'+iconmode+'"></div></a> ';
        text += '<a href="'+url+'PhotoAlbums/Tags/'+data[0]+'" title="verlinkte Bilder"><div class="sb_img_b'+iconmode+'"></div></a> ';
        text += '<a href="'+url+'PhotoAlbums/User/'+data[0]+'" title="Fotoalben"><div class="sb_img_c'+iconmode+'"></div></a>';
    }

    var picmode = '';
    if (settings["pic"])
        picmode = 'sb_item';
    else if(!settings["pic"] && settings["icons"])
        picmode = 'sb_item_mode2';

    text += '<div class="clearFix"></div></div>';
    text += '<div class="'+picmode+'"><div class="sb_head">' + data[1] + '</div>';

    if(!settings["pic"])
        text += '<a href="'+url+'Profile/'+data[0]+'" title="Profil">&#8226; Profil besuchen</a><br/>';
    if(settings["message"])
        text += '<a href="'+url+'Messages/Write/'+data[0]+'">&#8226; Nachricht schreiben</a><br/>';
    if(settings["pinboard"])
        text += '<a href="'+url+'Pinboard/'+data[0]+'">&#8226; auf Pinnwand schreiben</a><br/>';
    if(settings["poke"])
        text += '<a href="'+url+'Gruscheln/DialogGruscheln/'+data[0]+'">&#8226; Gruscheln</a>';
    if(data[2] && settings["status"])
        text += '<div class="label">&raquo; ' + data[2] + ' &laquo;</div>';

    text += '</div></div>';

    var item = document.getElementById('sb_' + data[0]);
    item.innerHTML = text;
}

insertItem = function (list, i) {
    var box = document.getElementById('GM_sb');
    var item = document.createElement('div');

    data = list.slice(i,i+4);
    item.id = 'sb_' + data[0];

    if(i < 5)
        box.insertBefore(item, box.firstChild);
    else
        box.insertBefore(item, document.getElementById('sb_'+list[i-4]).nextSibling);

    writeItem(data);

    if(!firstTime && settings['effects']) {
        $(item).hide();
        $(item).opacity = '0';
        $(item).animate({height: "toggle", opacity: "toggle"}, {duration: 2500});
    }
}

searchList = function (array, key) {
    for(var i = 1; i < array.length; i+=4)
        if(array[i] == key)
            return i;
    return -1;
}


//reinit all width (for config changes)
initWidth = function (old) {
    var all = document.getElementById('allIn');
    var lA = document.getElementById('leftAds');
    var main = document.getElementById('masterRight');
    var top = document.getElementById('topHeader');
    var box = document.getElementById('GM_sb');
    var status = document.getElementById('sb_status');
    var messages = document.getElementById('sb_messages');
    var head = document.getElementById('sb_head_overlay');
    var navi = document.getElementById('topNavi');

    box.style.width = settings["width"] + 'px';
    status.style.width = settings["width"] + 'px';
    messages.style.width = settings["width"] + 'px';

    all.style.width = parseInt(getComputedStyle(all, '').width) + settings["width"] - old + 'px';
    lA.style.width = parseInt(getComputedStyle(lA, '').width) + settings["width"] - old + 'px';
    main.style.width = parseInt(getComputedStyle(main, '').width) + settings["width"] - old + 'px';
    top.style.width = parseInt(getComputedStyle(top, '').width) + settings["width"] - old + 'px';
    head.style.width = parseInt(getComputedStyle(top, '').width) - parseInt(getComputedStyle(navi, '').width) - 100 + 'px';
}

/* Create the sidebar */
initSidebar = function () {

    //write to pinboard
    var loc = window.location.href;
    if(loc.indexOf('Pinboard/') != -1 && loc.slice(loc.length-4, loc.length-1) != '/p/') {
        var messageBox = document.evaluate('//div[@class="pinboard_Write clearFix"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        messageBox.style.display = 'block';

        //messageBox.scrollIntoView(true)
        //window.scrollBy(0, -10);
        window.setTimeout("document.getElementById('Pinboard_entry').focus()", 0);
    }

    //position header to the right and create overlay
    var top = document.getElementById('topHeader');
    top.style.backgroundPosition = 'right';

    var navi = document.getElementById('topNavi');
    var head = document.createElement('div');
    head.style.height = getComputedStyle(top, '').height;
    head.style.backgroundImage = getComputedStyle(top, '').backgroundImage;
    head.style.position = 'absolute';
    head.id = 'sb_head_overlay';

    top.insertBefore(head,top.firstChild);

    var all = document.getElementById('allIn');
    all.style.width = parseInt(getComputedStyle(all, '').width) - 170 + 'px';

    //fix left menu
    //var left = document.getElementById('masterLeft');
    //left.style.position = 'fixed';

    //put wrapper arround content and add sidebar
    var ph = document.getElementById('pageHeader');
    var wrapper = document.createElement('div');
    wrapper.style.width = parseInt(getComputedStyle(ph, '').width) + parseInt(getComputedStyle(ph, '').paddingRight) +
                            parseInt(getComputedStyle(ph, '').paddingLeft) + parseInt(getComputedStyle(ph, '').borderRightWidth) +
                            parseInt(getComputedStyle(ph, '').borderLeftWidth) + 'px';
    wrapper.style.cssFloat = 'left';

    var main = document.getElementById('masterRight');
    for(var i = 0; main.childNodes.length > i;) {
        wrapper.appendChild(main.childNodes[i]);
        if(main.childNodes[i].id == 'topHeader' || !main.childNodes[i].innerHTML)
            i++;
    }
    main.appendChild(wrapper);

    //create box
   var box = document.createElement('div');
   box.style.cssFloat = 'right';
   box.id = 'GM_sb';

    main.appendChild(box);

    //create status
    var status = document.createElement('div');
    status.id = 'sb_status';
    status.style.cssFloat = 'right';
    main.insertBefore(status, box);
    status.innerHTML = '<div class="commentMetaData sb_cont sb_status2"><a href="javascript:;" id="sb_img_conf"></a><h3 id ="sb_status_text" class="label sb_status"></h3></div>';
    document.getElementById('sb_img_conf').addEventListener('click', openConfig, true);

    //create messages
    var messages = document.createElement('div');
    messages.id = 'sb_messages';
    messages.style.cssFloat = 'right';
    messages.style.display = 'none';
    messages.innerHTML = '<div class="commentMetaData sb_cont sb_status2"><a href="'+url+'Messages" id="sb_img_msg"></a><h3 id="sb_messages_text" class="label sb_status"></h3></div>';
    main.insertBefore(messages, box);

    //set widths
    initWidth(0);

    //box-styles
    addGlobalStyle('.sb_head {font-weight: bold; font-size: 1.1em; padding-bottom: 3px;}\
    .sb_cont {border-top: none !important; padding:7px; border-right: 1px solid '+color+';}\
    .sb_cont .label { width: auto;margin-top: 2px; float:none;}\
    .sb_image {float:left;}\
    .sb_status2 {padding:3px;}\
    .sb_status {font-size: 1.1em; font-weight: bold; text-align:center;}\
    .sb_item {margin-left: 63px;}\
    .sb_item_mode2 {margin-left: 25px;}');

//Images (by Jakub Steiner jimmac.musichall.cz)
    addGlobalStyle('#sb_img_conf, #sb_img_msg {height:18px; width: 18px; position:absolute;}');
    addGlobalStyle('.sb_img_a, .sb_img_b, .sb_img_c {float:left; height: 22px; width: 18px;}');
    addGlobalStyle('#sb_img_conf, #sb_img_msg, .sb_img_a, .sb_img_b, .sb_img_c {opacity:0.7; -moz-opacity: 0.7; background-repeat: no-repeat;background-position: center center;}');
    addGlobalStyle('#sb_img_msg:hover, #sb_img_conf:hover, .sb_img_a:hover, .sb_img_b:hover, .sb_img_c:hover {-moz-opacity: 1; opacity: 1;}');
    addGlobalStyle('.sb_img_mode2 {height:18px; float: none}');

    addGlobalStyle('#sb_img_msg {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH2AIRCTomWKk3cwAAAONJREFUKM+F0T1KAwEQhuFnk6xL/O/Uyi5WwoogWCiolV1ygZzBo+QMXsDKwsLKxkJYQRQbQdDCKoVCcFeNFlnXjfFnqhnej5lvZoKmv6PyD1f7StuxpChW9s8HSdAs4VbBDwpJLhjgez2ZJ8+2CkmljG+lxs1ZcKFF0o4/PSSbEg9ik8ZEuHZqx3EiyE1OS22LcgePpoTq5S1CDWeWkcpk7qwJh9ecseTEPGq61gWjd6ibEINDVS+jl7y0Afp2Xcm+C26sevXuDX2LusMjehqoFt0is3olQedo78dPdUq/+C0+AGBnOYGgSbfUAAAAAElFTkSuQmCC);}');
    addGlobalStyle('#sb_img_conf {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2AILFQYDSsZ3JAAAAR5JREFUKM99kb1KA0EUhb8ZCRFBLKxiIRYWahMF30BiEGdgKwuLeQzLLO6bOFY2NrNYBG2sDaKEVIqLRbQRIjZauGMx2Z803ubCPd89w5wrIv4vGZpRxhs1o0wnUwC3B66GKOP2f3ElYMUNXXCFblyX/pzVII0yHoyCZrluFPSxmhQk7tCfeJxiQovzUzAKhz4TpADiUuEOfC5y73kWL6BxaJsWbiIKGwDs8MoHJDauPiPqOfR8xhoZaHtFXgPaLcYAW6yyzDdPVI/IIEdE7DLiLRmyxHrIRALI9jbjYzIyFgEbowessAnOxMHhPmJEToOvEFmKvmWBDeiVt5A0+eEOOgUy4L061ifzNHiEzsM1hUsyGZIAiPiIC6Amz9YfjR5hrCzMwhkAAAAASUVORK5CYII=);}');
    addGlobalStyle('.sb_img_a {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2AILETML4SWVfAAAADV0RVh0Q29tbWVudAAoYykgMjAwNCBKYWt1YiBTdGVpbmVyCgpDcmVhdGVkIHdpdGggVGhlIEdJTVCQ2YtvAAABaUlEQVQoz03RQWpTYQDE8V/eS1KbWqEGWm2hiqBN1UpRsQuX7a6bHiDuPYOu1Dt4AD2DoLhyIQgiVFCsZFNBzNO2SYxNmuQl33ORSp3t/BmYmdwW2Kw2H+YrIS28L7188cR/iivYrBbvL99cNBefWUguXHtbq58AuS2sv17d6Bs60tPP0lyuk72yPU6KK1h4NqsnMtB1OXfDfHFm6WfpynatTgSZgVRfx1Wzutqmo8VbnnIMpLtDQ4eCsoEpkX3lgjvHwFo1vVgTyQt62poO0a9pQn6t6vk5PYmWSS3T9hUVsmZ58A3ijY/nMee0od9ayk4p6OR2in/mz2a/3uRhiERi3Qc7MiN9WXzJp0crE9F4jj2JDZ+VrGpYdlskcZ0HEQykIokgCKp+6MiMNP7VnDEhIAjeaRj5IowtkXt13x0g4Ejw1Z6RnuzkCxRWBktoKUlBz6TY7vgLhPJU8+6Bjpa2trautpbs8V9oqJBkz0OD4gAAAABJRU5ErkJggg==);}');
    addGlobalStyle('.sb_img_b {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2AILETMAdvdM9AAAASZJREFUKM+F0b9LlWEYxvHP8/jyopSFEiFiiloiWuTm1CbOjU5Bf4ODm9QiODc5CQ0RuLmJ7oI/FmkpOKDYMVRCtCN5zpHzNJxeFQS9p2v48r3gvsJbd192lcK7D2b/50+fP/otSLQMwyNtxl8vTug34KUf45XSyb7zwhAH570xysOmChYGz0pfIUyvmmDYK7uqkiRpeGG5WbYWptOUBg5EHRIoS7pFLMuo21bT7qkVZVGPMce2DIiITVNdt0174KcdTyQNCiB5oK4sM+e93JEgurgGghxRVLIkl0lO1Qsg4Y+gR/AFk7pUVW8aEirG9ArYMeSbC0ml+aiGXO5Ars8Iyjb89UxLscWhTjWtas79klxq81yrxxIyM+vztzf8XoTFcN/c/wB62lcoePv2RQAAAABJRU5ErkJggg==);}');
    addGlobalStyle('.sb_img_c {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH2AILETMWgiP5pQAAAP1JREFUKM91kb0uBGEUhp/3zJj9acVGbaPSaSUbjUKncgEa96BQbKHSuhGNgrASroFKokQlM0aM/b6jmF12Y+e85fuXc472aJr1WwZO2ki/bPS6lFiTQL02z3wvEqx53/sOo2FBSrrlwkgwjISckpzsBDrj5eOCJ1K407bfaMcvtev32nTj4Mj5YsyIgE699tcZOSUlhzyyygpvPGBGDSEMARmBD4xABaQRECCciANLJBiRjAwWJUAgYlRUgIEm5FTYnVvakon7D8xXTN36FULwmQpxJXEh41ziWsJDphafvNIBdOY2c8l3CrK4b3lsq6VIjv6/exCoPCWRAH4AMyJQTYAOn6QAAAAASUVORK5CYII=);}');
}

updateIdle = function () {
    GM_setValue(siteName + '.idle', new Date().getTime().toString());
}

//reset the whole sidebar (for config changes)
resetDisplay = function () {
    updateIdle();
    var box = document.getElementById('GM_sb');
    box.innerHTML = '';
    local_list = new Array();
    firstTime = true;
    var oldWidth = settings['width'];
    initConfig();
    initWidth(oldWidth);
    updateSidebar();
}

blinkMessage = function () {
        var box = document.getElementById('sb_messages').firstChild;
        var origColor = getComputedStyle(box, '').backgroundColor;

        $(box).animate({ backgroundColor: color }, 400);
        $(box).animate({ backgroundColor: origColor }, 800);
        $(box).queue(function () {if(messagesOld != 0) blinkMessage(); $(box).dequeue(); });
}

updateMessages = function () {
    var now = GM_getValue(siteName + '.messages', 0);

    if(messagesOld != now) {
        var messages = document.getElementById('sb_messages_text');

        var text = '';
        if(now <= 0)
            text = 'ERROR Keine neuen Nachrichten';
        else if(now == 1)
            text = 'Du hast 1 neue Nachricht!';
        else if(now < 20)
            text = now + ' neue Nachrichten!';
        else
            text = '20+ neue Nachrichten';

        if(now <= 0)
            document.title = origTitle;
        else
            document.title = text + ' | ' + origTitle;

        messages.innerHTML = text;

        var box = document.getElementById('sb_messages');

        if(messagesOld == 0 && now > 0) {
            if(settings['effects'] && !firstTimeMsg) {
                $(box).opacity = '0';
                $(box).animate({height: "toggle", opacity: "toggle"}, {duration: 750});
            }
            else
                box.style.display = 'block'

            if(settings['effects'])
                blinkMessage();
        }
        else if(messagesOld > 0 && now == 0) {
            if(settings['effects'] && !firstTimeMsg)
                $(box).animate({height: "toggle", opacity: "toggle"}, {duration: 750});
            else
                box.style.display = 'none';
        }

        messagesOld = now;
    }

    firstTimeMsg = false
}
    

//check interval
checkUpdate = function () {

    var now = new Date();
    var timeNow = now.getTime();
    var time = GM_getValue(siteName + '.time', '0');

    //autologout when no new pageloads over a given time and no keypresses
    if(settings['idle'] > 0) {
        if(keyPress) {
            updateIdle();
            keyPress = false;
        }
        else {
            if(idle == false && parseInt(time) > (parseInt(GM_getValue(siteName + '.idle', '0'))+settings['idle']*60000)) {
                idle = true;
                GM_xmlhttpRequest({method: 'GET', url: url + 'Logout'});
            }
        }
    }

    //update if time reached or other site made an update
    if(now.getTime() > parseInt(time))
        getUsers();
    else if(time != timeOld) {
        updateSidebar();
        timeOld = time;
    }

    //reset sidebar @ config change
    if(confOld != GM_getValue(siteName + '.config', '')) {
        confOld = GM_getValue(siteName + '.config', '');
        resetDisplay();
    }

    updateMessages();
}

/* workaround for the studivz blue script */
workaround = function() {
    var top = document.getElementById('topHeader');
    top.firstChild.style.backgroundImage = getComputedStyle(top, '').backgroundImage;
    color = getComputedStyle(document.getElementById('pageFooter'), '').backgroundColor;
    addGlobalStyle('.sb_cont {border-right: 1px solid '+color+' !important;}');
}

/* CONFIG */

checkConfig = function(val, defminmax) {
    if(isNaN(val))
        return defminmax[0];
    else if(val < defminmax[1])
        return defminmax[1];
    else if(val > defminmax[2])
        return defminmax[2];
    else
        return val;
}

getConfig = function() {
    var get_set = GM_getValue(siteName + '.config', '');
    get_set = get_set.split(',');

    if(get_set.length != settings_list.length)
        get_set = new Array(settings_list.length);

    for(var i = 0; i < get_set.length; i++) {
        get_set[i] = parseInt(get_set[i]);
        get_set[i] = checkConfig(get_set[i], settings_list[i].slice(1,4));
    }

    return get_set;
}

initConfig = function() {

    //name, default, min, max, desc
    settings_list = [   ['effects', 1, 0, 1, 'Animationen aktivieren'],
                        ['pic', 1, 0, 1, 'Bild anzeigen'],
                        ['message', 1, 0, 1, '"Nachricht schreiben" anzeigen'],
                        ['pinboard', 1, 0, 1, '"auf Pinnwand schreiben" anzeigen'],
                        ['poke', 1, 0, 1, '"Gruscheln" anzeigen'],
                        ['status', 1, 0, 1, 'Status (Microblog) anzeigen'],
                        ['icons', 1, 0, 1, '"Freunde/verlinkte Bilder/Fotoalben" Icons anzeigen'],
                        ['width', 210, 150, 400, 'Breite der Sidebar in Pixel'],
                        ['update', 20, 10, 120, 'Aktualisierungszeit in Sekunden'],
                        ['idle', 0, 0, 60, 'Zeit (in Minuten), nach der bei Inaktivit√É∆í√Ç¬§t automatisch ausgeloggt wird (0 = nie)']
                    ];

    var get_set = getConfig();
    settings = new Object();

    for(var i = 0; i < settings_list.length; i++)
        settings[settings_list[i][0]] = get_set[i];

    if(disableEffects)
        settings['effects'] = 0;
}

saveConfig = function () {

    var save = new Array(8);

    for(var i = 0; i < settings_list.length; i++) {
        if((settings_list[i][3] - settings_list[i][2]) > 1)
            save[i] = parseInt(document.getElementById('sb_conf_'+settings_list[i][0]).value)
        else
            save[i] = (document.getElementById('sb_conf_'+settings_list[i][0]).checked) ? 1 : 0;

        save[i] = checkConfig(save[i], settings_list[i].slice(1,4));
    }

    GM_setValue(siteName + '.config', save.join(','));

    resetDisplay();
}

openConfig = function() {

    var text = '<table>';
    for(var i = 0; i < settings_list.length; i++) {
        text += '<tr>';
        if((settings_list[i][3] - settings_list[i][2]) > 1)
            text += '<td style="text-align:center"><input type="text" id="sb_conf_'+settings_list[i][0]+'" maxlength="3" style="width:30px" /></td><td>'+settings_list[i][4]+' ('+settings_list[i][2]+' - '+settings_list[i][3]+')</td>';
        else
            text += '<td style="text-align:center"><input type="checkbox" id="sb_conf_'+settings_list[i][0]+'"></td><td>'+settings_list[i][4]+'</td>';
        text += '</tr>';
    }
    text += '</table>';

    dialog = unsafeWindow.Phx.UI.Dialog.ButtonDialog(
                        'SVZ Sidebar - by Dein-SVZ-kann-mehr.de.vu | Einstellungen',
                        {
                            'message' : text + '<br/><a id="sb_conf_submit" href="javascript:;" style="float:left;font-weight:bold;">[Angaben speichern!]</a><a id="sb_conf_cancel" href="javascript:;" style="float:right;font-weight:bold;">[Abbrechen]</a>',
                            'buttons' : [ ]
                        });
    dialog.show();

    var get_set = getConfig();

    for(var i = 0; i < settings_list.length; i++) {
        if((settings_list[i][3] - settings_list[i][2]) > 1)
            document.getElementById('sb_conf_'+settings_list[i][0]).value = get_set[i];
        else
            document.getElementById('sb_conf_'+settings_list[i][0]).checked = get_set[i];
    }

    document.getElementById('sb_conf_submit').addEventListener('click',function (e) {saveConfig(); dialog.close();},false);
    document.getElementById('sb_conf_cancel').addEventListener('click',function (e) {dialog.close();},false);
}

/* start here */
if( !document.getElementById('jsEnabled') ) {

    //JQuery
    disableEffects = false;
    try {
        (function(){if(window.jQuery){var _jQuery=window.jQuery}var jQuery=window.jQuery=function(selector,context){return new jQuery.prototype.init(selector,context)};if(window.$){var _$=window.$}window.$=jQuery;var quickExpr=/^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/;var isSimple=/^.[^:#\[\.]*$/;jQuery.fn=jQuery.prototype={init:function(selector,context){selector=selector||document;if(selector.nodeType){this[0]=selector;this.length=1;return this}else{if(typeof selector=="string"){var match=quickExpr.exec(selector);if(match&&(match[1]||!context)){if(match[1]){selector=jQuery.clean([match[1]],context)}else{var elem=document.getElementById(match[3]);if(elem){if(elem.id!=match[3]){return jQuery().find(selector)}else{this[0]=elem;this.length=1;return this}}else{selector=[]}}}else{return new jQuery(context).find(selector)}}else{if(jQuery.isFunction(selector)){return new jQuery(document)[jQuery.fn.ready?"ready":"load"](selector)}}}return this.setArray(selector.constructor==Array&&selector||(selector.jquery||selector.length&&selector!=window&&!selector.nodeType&&selector[0]!=undefined&&selector[0].nodeType)&&jQuery.makeArray(selector)||[selector])},jquery:"1.2.3",size:function(){return this.length},length:0,get:function(num){return num==undefined?jQuery.makeArray(this):this[num]},pushStack:function(elems){var ret=jQuery(elems);ret.prevObject=this;return ret},setArray:function(elems){this.length=0;Array.prototype.push.apply(this,elems);return this},each:function(callback,args){return jQuery.each(this,callback,args)},index:function(elem){var ret=-1;this.each(function(i){if(this==elem){ret=i}});return ret},attr:function(name,value,type){var options=name;if(name.constructor==String){if(value==undefined){return this.length&&jQuery[type||"attr"](this[0],name)||undefined}else{options={};options[name]=value}}return this.each(function(i){for(name in options){jQuery.attr(type?this.style:this,name,jQuery.prop(this,options[name],type,i,name))}})},css:function(key,value){if((key=="width"||key=="height")&&parseFloat(value)<0){value=undefined}return this.attr(key,value,"curCSS")},text:function(text){if(typeof text!="object"&&text!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(text))}var ret="";jQuery.each(text||this,function(){jQuery.each(this.childNodes,function(){if(this.nodeType!=8){ret+=this.nodeType!=1?this.nodeValue:jQuery.fn.text([this])}})});return ret},wrapAll:function(html){if(this[0]){jQuery(html,this[0].ownerDocument).clone().insertBefore(this[0]).map(function(){var elem=this;while(elem.firstChild){elem=elem.firstChild}return elem}).append(this)}return this},wrapInner:function(html){return this.each(function(){jQuery(this).contents().wrapAll(html)})},wrap:function(html){return this.each(function(){jQuery(this).wrapAll(html)})},append:function(){return this.domManip(arguments,true,false,function(elem){if(this.nodeType==1){this.appendChild(elem)}})},prepend:function(){return this.domManip(arguments,true,true,function(elem){if(this.nodeType==1){this.insertBefore(elem,this.firstChild)}})},before:function(){return this.domManip(arguments,false,false,function(elem){this.parentNode.insertBefore(elem,this)})},after:function(){return this.domManip(arguments,false,true,function(elem){this.parentNode.insertBefore(elem,this.nextSibling)})},end:function(){return this.prevObject||jQuery([])},find:function(selector){var elems=jQuery.map(this,function(elem){return jQuery.find(selector,elem)});return this.pushStack(/[^+>] [^+>]/.test(selector)||selector.indexOf("..")>-1?jQuery.unique(elems):elems)},clone:function(events){var ret=this.map(function(){if(jQuery.browser.msie&&!jQuery.isXMLDoc(this)){var clone=this.cloneNode(true),container=document.createElement("div");container.appendChild(clone);return jQuery.clean([container.innerHTML])[0]}else{return this.cloneNode(true)}});var clone=ret.find("*").andSelf().each(function(){if(this[expando]!=undefined){this[expando]=null}});if(events===true){this.find("*").andSelf().each(function(i){if(this.nodeType==3){return }var events=jQuery.data(this,"events");for(var type in events){for(var handler in events[type]){jQuery.event.add(clone[i],type,events[type][handler],events[type][handler].data)}}})}return ret},filter:function(selector){return this.pushStack(jQuery.isFunction(selector)&&jQuery.grep(this,function(elem,i){return selector.call(elem,i)})||jQuery.multiFilter(selector,this))},not:function(selector){if(selector.constructor==String){if(isSimple.test(selector)){return this.pushStack(jQuery.multiFilter(selector,this,true))}else{selector=jQuery.multiFilter(selector,this)}}var isArrayLike=selector.length&&selector[selector.length-1]!==undefined&&!selector.nodeType;return this.filter(function(){return isArrayLike?jQuery.inArray(this,selector)<0:this!=selector})},add:function(selector){return !selector?this:this.pushStack(jQuery.merge(this.get(),selector.constructor==String?jQuery(selector).get():selector.length!=undefined&&(!selector.nodeName||jQuery.nodeName(selector,"form"))?selector:[selector]))},is:function(selector){return selector?jQuery.multiFilter(selector,this).length>0:false},hasClass:function(selector){return this.is("."+selector)},val:function(value){if(value==undefined){if(this.length){var elem=this[0];if(jQuery.nodeName(elem,"select")){var index=elem.selectedIndex,values=[],options=elem.options,one=elem.type=="select-one";if(index<0){return null}for(var i=one?index:0,max=one?index+1:options.length;i<max;i++){var option=options[i];if(option.selected){value=jQuery.browser.msie&&!option.attributes.value.specified?option.text:option.value;if(one){return value}values.push(value)}}return values}else{return(this[0].value||"").replace(/\r/g,"")}}return undefined}return this.each(function(){if(this.nodeType!=1){return }if(value.constructor==Array&&/radio|checkbox/.test(this.type)){this.checked=(jQuery.inArray(this.value,value)>=0||jQuery.inArray(this.name,value)>=0)}else{if(jQuery.nodeName(this,"select")){var values=value.constructor==Array?value:[value];jQuery("option",this).each(function(){this.selected=(jQuery.inArray(this.value,values)>=0||jQuery.inArray(this.text,values)>=0)});if(!values.length){this.selectedIndex=-1}}else{this.value=value}}})},html:function(value){return value==undefined?(this.length?this[0].innerHTML:null):this.empty().append(value)},replaceWith:function(value){return this.after(value).remove()},eq:function(i){return this.slice(i,i+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments))},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem)}))},andSelf:function(){return this.add(this.prevObject)},data:function(key,value){var parts=key.split(".");parts[1]=parts[1]?"."+parts[1]:"";if(value==null){var data=this.triggerHandler("getData"+parts[1]+"!",[parts[0]]);if(data==undefined&&this.length){data=jQuery.data(this[0],key)}return data==null&&parts[1]?this.data(parts[0]):data}else{return this.trigger("setData"+parts[1]+"!",[parts[0],value]).each(function(){jQuery.data(this,key,value)})}},removeData:function(key){return this.each(function(){jQuery.removeData(this,key)})},domManip:function(args,table,reverse,callback){var clone=this.length>1,elems;return this.each(function(){if(!elems){elems=jQuery.clean(args,this.ownerDocument);if(reverse){elems.reverse()}}var obj=this;if(table&&jQuery.nodeName(this,"table")&&jQuery.nodeName(elems[0],"tr")){obj=this.getElementsByTagName("tbody")[0]||this.appendChild(this.ownerDocument.createElement("tbody"))}var scripts=jQuery([]);jQuery.each(elems,function(){var elem=clone?jQuery(this).clone(true)[0]:this;if(jQuery.nodeName(elem,"script")){scripts=scripts.add(elem)}else{if(elem.nodeType==1){scripts=scripts.add(jQuery("script",elem).remove())}callback.call(obj,elem)}});scripts.each(evalScript)})}};jQuery.prototype.init.prototype=jQuery.prototype;function evalScript(i,elem){if(elem.src){jQuery.ajax({url:elem.src,async:false,dataType:"script"})}else{jQuery.globalEval(elem.text||elem.textContent||elem.innerHTML||"")}if(elem.parentNode){elem.parentNode.removeChild(elem)}}jQuery.extend=jQuery.fn.extend=function(){var target=arguments[0]||{},i=1,length=arguments.length,deep=false,options;if(target.constructor==Boolean){deep=target;target=arguments[1]||{};i=2}if(typeof target!="object"&&typeof target!="function"){target={}}if(length==1){target=this;i=0}for(;i<length;i++){if((options=arguments[i])!=null){for(var name in options){if(target===options[name]){continue}if(deep&&options[name]&&typeof options[name]=="object"&&target[name]&&!options[name].nodeType){target[name]=jQuery.extend(target[name],options[name])}else{if(options[name]!=undefined){target[name]=options[name]}}}}}return target};var expando="jQuery"+(new Date()).getTime(),uuid=0,windowData={};var exclude=/z-?index|font-?weight|opacity|zoom|line-?height/i;jQuery.extend({noConflict:function(deep){window.$=_$;if(deep){window.jQuery=_jQuery}return jQuery},isFunction:function(fn){return !!fn&&typeof fn!="string"&&!fn.nodeName&&fn.constructor!=Array&&/function/i.test(fn+"")},isXMLDoc:function(elem){return elem.documentElement&&!elem.body||elem.tagName&&elem.ownerDocument&&!elem.ownerDocument.body},globalEval:function(data){data=jQuery.trim(data);if(data){var head=document.getElementsByTagName("head")[0]||document.documentElement,script=document.createElement("script");script.type="text/javascript";if(jQuery.browser.msie){script.text=data}else{script.appendChild(document.createTextNode(data))}head.appendChild(script);head.removeChild(script)}},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toUpperCase()==name.toUpperCase()},cache:{},data:function(elem,name,data){elem=elem==window?windowData:elem;var id=elem[expando];if(!id){id=elem[expando]=++uuid}if(name&&!jQuery.cache[id]){jQuery.cache[id]={}}if(data!=undefined){jQuery.cache[id][name]=data}return name?jQuery.cache[id][name]:id},removeData:function(elem,name){elem=elem==window?windowData:elem;var id=elem[expando];if(name){if(jQuery.cache[id]){delete jQuery.cache[id][name];name="";for(name in jQuery.cache[id]){break}if(!name){jQuery.removeData(elem)}}}else{try{delete elem[expando]}catch(e){if(elem.removeAttribute){elem.removeAttribute(expando)}}delete jQuery.cache[id]}},each:function(object,callback,args){if(args){if(object.length==undefined){for(var name in object){if(callback.apply(object[name],args)===false){break}}}else{for(var i=0,length=object.length;i<length;i++){if(callback.apply(object[i],args)===false){break}}}}else{if(object.length==undefined){for(var name in object){if(callback.call(object[name],name,object[name])===false){break}}}else{for(var i=0,length=object.length,value=object[0];i<length&&callback.call(value,i,value)!==false;value=object[++i]){}}}return object},prop:function(elem,value,type,i,name){if(jQuery.isFunction(value)){value=value.call(elem,i)}return value&&value.constructor==Number&&type=="curCSS"&&!exclude.test(name)?value+"px":value},className:{add:function(elem,classNames){jQuery.each((classNames||"").split(/\s+/),function(i,className){if(elem.nodeType==1&&!jQuery.className.has(elem.className,className)){elem.className+=(elem.className?" ":"")+className}})},remove:function(elem,classNames){if(elem.nodeType==1){elem.className=classNames!=undefined?jQuery.grep(elem.className.split(/\s+/),function(className){return !jQuery.className.has(classNames,className)}).join(" "):""}},has:function(elem,className){return jQuery.inArray(className,(elem.className||elem).toString().split(/\s+/))>-1}},swap:function(elem,options,callback){var old={};for(var name in options){old[name]=elem.style[name];elem.style[name]=options[name]}callback.call(elem);for(var name in options){elem.style[name]=old[name]}},css:function(elem,name,force){if(name=="width"||name=="height"){var val,props={position:"absolute",visibility:"hidden",display:"block"},which=name=="width"?["Left","Right"]:["Top","Bottom"];function getWH(){val=name=="width"?elem.offsetWidth:elem.offsetHeight;var padding=0,border=0;jQuery.each(which,function(){padding+=parseFloat(jQuery.curCSS(elem,"padding"+this,true))||0;border+=parseFloat(jQuery.curCSS(elem,"border"+this+"Width",true))||0});val-=Math.round(padding+border)}if(jQuery(elem).is(":visible")){getWH()}else{jQuery.swap(elem,props,getWH)}return Math.max(0,val)}return jQuery.curCSS(elem,name,force)},curCSS:function(elem,name,force){var ret;function color(elem){if(!jQuery.browser.safari){return false}var ret=document.defaultView.getComputedStyle(elem,null);return !ret||ret.getPropertyValue("color")==""}if(name=="opacity"&&jQuery.browser.msie){ret=jQuery.attr(elem.style,"opacity");return ret==""?"1":ret}if(jQuery.browser.opera&&name=="display"){var save=elem.style.outline;elem.style.outline="0 solid black";elem.style.outline=save}if(name.match(/float/i)){name=styleFloat}if(!force&&elem.style&&elem.style[name]){ret=elem.style[name]}else{if(document.defaultView&&document.defaultView.getComputedStyle){if(name.match(/float/i)){name="float"}name=name.replace(/([A-Z])/g,"-$1").toLowerCase();var getComputedStyle=document.defaultView.getComputedStyle(elem,null);if(getComputedStyle&&!color(elem)){ret=getComputedStyle.getPropertyValue(name)}else{var swap=[],stack=[];for(var a=elem;a&&color(a);a=a.parentNode){stack.unshift(a)}for(var i=0;i<stack.length;i++){if(color(stack[i])){swap[i]=stack[i].style.display;stack[i].style.display="block"}}ret=name=="display"&&swap[stack.length-1]!=null?"none":(getComputedStyle&&getComputedStyle.getPropertyValue(name))||"";for(var i=0;i<swap.length;i++){if(swap[i]!=null){stack[i].style.display=swap[i]}}}if(name=="opacity"&&ret==""){ret="1"}}else{if(elem.currentStyle){var camelCase=name.replace(/\-(\w)/g,function(all,letter){return letter.toUpperCase()});ret=elem.currentStyle[name]||elem.currentStyle[camelCase];if(!/^\d+(px)?$/i.test(ret)&&/^\d/.test(ret)){var style=elem.style.left,runtimeStyle=elem.runtimeStyle.left;elem.runtimeStyle.left=elem.currentStyle.left;elem.style.left=ret||0;ret=elem.style.pixelLeft+"px";elem.style.left=style;elem.runtimeStyle.left=runtimeStyle}}}}return ret},clean:function(elems,context){var ret=[];context=context||document;if(typeof context.createElement=="undefined"){context=context.ownerDocument||context[0]&&context[0].ownerDocument||document}jQuery.each(elems,function(i,elem){if(!elem){return }if(elem.constructor==Number){elem=elem.toString()}if(typeof elem=="string"){elem=elem.replace(/(<(\w+)[^>]*?)\/>/g,function(all,front,tag){return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?all:front+"></"+tag+">"});var tags=jQuery.trim(elem).toLowerCase(),div=context.createElement("div");var wrap=!tags.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!tags.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||tags.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!tags.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!tags.indexOf("<td")||!tags.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!tags.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||jQuery.browser.msie&&[1,"div<div>","</div>"]||[0,"",""];div.innerHTML=wrap[1]+elem+wrap[2];while(wrap[0]--){div=div.lastChild}if(jQuery.browser.msie){var tbody=!tags.indexOf("<table")&&tags.indexOf("<tbody")<0?div.firstChild&&div.firstChild.childNodes:wrap[1]=="<table>"&&tags.indexOf("<tbody")<0?div.childNodes:[];for(var j=tbody.length-1;j>=0;--j){if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length){tbody[j].parentNode.removeChild(tbody[j])}}if(/^\s/.test(elem)){div.insertBefore(context.createTextNode(elem.match(/^\s*/)[0]),div.firstChild)}}elem=jQuery.makeArray(div.childNodes)}if(elem.length===0&&(!jQuery.nodeName(elem,"form")&&!jQuery.nodeName(elem,"select"))){return }if(elem[0]==undefined||jQuery.nodeName(elem,"form")||elem.options){ret.push(elem)}else{ret=jQuery.merge(ret,elem)}});return ret},attr:function(elem,name,value){if(!elem||elem.nodeType==3||elem.nodeType==8){return undefined}var fix=jQuery.isXMLDoc(elem)?{}:jQuery.props;if(name=="selected"&&jQuery.browser.safari){elem.parentNode.selectedIndex}if(fix[name]){if(value!=undefined){elem[fix[name]]=value}return elem[fix[name]]}else{if(jQuery.browser.msie&&name=="style"){return jQuery.attr(elem.style,"cssText",value)}else{if(value==undefined&&jQuery.browser.msie&&jQuery.nodeName(elem,"form")&&(name=="action"||name=="method")){return elem.getAttributeNode(name).nodeValue}else{if(elem.tagName){if(value!=undefined){if(name=="type"&&jQuery.nodeName(elem,"input")&&elem.parentNode){throw"type property can't be changed"}elem.setAttribute(name,""+value)}if(jQuery.browser.msie&&/href|src/.test(name)&&!jQuery.isXMLDoc(elem)){return elem.getAttribute(name,2)}return elem.getAttribute(name)}else{if(name=="opacity"&&jQuery.browser.msie){if(value!=undefined){elem.zoom=1;elem.filter=(elem.filter||"").replace(/alpha\([^)]*\)/,"")+(parseFloat(value).toString()=="NaN"?"":"alpha(opacity="+value*100+")")}return elem.filter&&elem.filter.indexOf("opacity=")>=0?(parseFloat(elem.filter.match(/opacity=([^)]*)/)[1])/100).toString():""}name=name.replace(/-([a-z])/ig,function(all,letter){return letter.toUpperCase()});if(value!=undefined){elem[name]=value}return elem[name]}}}}},trim:function(text){return(text||"").replace(/^\s+|\s+$/g,"")},makeArray:function(array){var ret=[];if(typeof array!="array"){for(var i=0,length=array.length;i<length;i++){ret.push(array[i])}}else{ret=array.slice(0)}return ret},inArray:function(elem,array){for(var i=0,length=array.length;i<length;i++){if(array[i]==elem){return i}}return -1},merge:function(first,second){if(jQuery.browser.msie){for(var i=0;second[i];i++){if(second[i].nodeType!=8){first.push(second[i])}}}else{for(var i=0;second[i];i++){first.push(second[i])}}return first},unique:function(array){var ret=[],done={};try{for(var i=0,length=array.length;i<length;i++){var id=jQuery.data(array[i]);if(!done[id]){done[id]=true;ret.push(array[i])}}}catch(e){ret=array}return ret},grep:function(elems,callback,inv){var ret=[];for(var i=0,length=elems.length;i<length;i++){if(!inv&&callback(elems[i],i)||inv&&!callback(elems[i],i)){ret.push(elems[i])}}return ret},map:function(elems,callback){var ret=[];for(var i=0,length=elems.length;i<length;i++){var value=callback(elems[i],i);if(value!==null&&value!=undefined){if(value.constructor!=Array){value=[value]}ret=ret.concat(value)}}return ret}});var userAgent=navigator.userAgent.toLowerCase();jQuery.browser={version:(userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(userAgent),opera:/opera/.test(userAgent),msie:/msie/.test(userAgent)&&!/opera/.test(userAgent),mozilla:/mozilla/.test(userAgent)&&!/(compatible|webkit)/.test(userAgent)};var styleFloat=jQuery.browser.msie?"styleFloat":"cssFloat";jQuery.extend({boxModel:!jQuery.browser.msie||document.compatMode=="CSS1Compat",props:{"for":"htmlFor","class":"className","float":styleFloat,cssFloat:styleFloat,styleFloat:styleFloat,innerHTML:"innerHTML",className:"className",value:"value",disabled:"disabled",checked:"checked",readonly:"readOnly",selected:"selected",maxlength:"maxLength",selectedIndex:"selectedIndex",defaultValue:"defaultValue",tagName:"tagName",nodeName:"nodeName"}});jQuery.each({parent:function(elem){return elem.parentNode},parents:function(elem){return jQuery.dir(elem,"parentNode")},next:function(elem){return jQuery.nth(elem,2,"nextSibling")},prev:function(elem){return jQuery.nth(elem,2,"previousSibling")},nextAll:function(elem){return jQuery.dir(elem,"nextSibling")},prevAll:function(elem){return jQuery.dir(elem,"previousSibling")},siblings:function(elem){return jQuery.sibling(elem.parentNode.firstChild,elem)},children:function(elem){return jQuery.sibling(elem.firstChild)},contents:function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes)}},function(name,fn){jQuery.fn[name]=function(selector){var ret=jQuery.map(this,fn);if(selector&&typeof selector=="string"){ret=jQuery.multiFilter(selector,ret)}return this.pushStack(jQuery.unique(ret))}});jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(){var args=arguments;return this.each(function(){for(var i=0,length=args.length;i<length;i++){jQuery(args[i])[original](this)}})}});jQuery.each({removeAttr:function(name){jQuery.attr(this,name,"");if(this.nodeType==1){this.removeAttribute(name)}},addClass:function(classNames){jQuery.className.add(this,classNames)},removeClass:function(classNames){jQuery.className.remove(this,classNames)},toggleClass:function(classNames){jQuery.className[jQuery.className.has(this,classNames)?"remove":"add"](this,classNames)},remove:function(selector){if(!selector||jQuery.filter(selector,[this]).r.length){jQuery("*",this).add(this).each(function(){jQuery.event.remove(this);jQuery.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){jQuery(">*",this).remove();while(this.firstChild){this.removeChild(this.firstChild)}}},function(name,fn){jQuery.fn[name]=function(){return this.each(fn,arguments)}});jQuery.each(["Height","Width"],function(i,name){var type=name.toLowerCase();jQuery.fn[type]=function(size){return this[0]==window?jQuery.browser.opera&&document.body["client"+name]||jQuery.browser.safari&&window["inner"+name]||document.compatMode=="CSS1Compat"&&document.documentElement["client"+name]||document.body["client"+name]:this[0]==document?Math.max(Math.max(document.body["scroll"+name],document.documentElement["scroll"+name]),Math.max(document.body["offset"+name],document.documentElement["offset"+name])):size==undefined?(this.length?jQuery.css(this[0],type):null):this.css(type,size.constructor==String?size:size+"px")}});var chars=jQuery.browser.safari&&parseInt(jQuery.browser.version)<417?"(?:[\\w*_-]|\\\\.)":"(?:[\\w\u0128-\uFFFF*_-]|\\\\.)",quickChild=new RegExp("^>\\s*("+chars+"+)"),quickID=new RegExp("^("+chars+"+)(#)("+chars+"+)"),quickClass=new RegExp("^([#.]?)("+chars+"*)");jQuery.extend({expr:{"":function(a,i,m){return m[2]=="*"||jQuery.nodeName(a,m[2])},"#":function(a,i,m){return a.getAttribute("id")==m[2]},":":{lt:function(a,i,m){return i<m[3]-0},gt:function(a,i,m){return i>m[3]-0},nth:function(a,i,m){return m[3]-0==i},eq:function(a,i,m){return m[3]-0==i},first:function(a,i){return i==0},last:function(a,i,m,r){return i==r.length-1},even:function(a,i){return i%2==0},odd:function(a,i){return i%2},"first-child":function(a){return a.parentNode.getElementsByTagName("*")[0]==a},"last-child":function(a){return jQuery.nth(a.parentNode.lastChild,1,"previousSibling")==a},"only-child":function(a){return !jQuery.nth(a.parentNode.lastChild,2,"previousSibling")},parent:function(a){return a.firstChild},empty:function(a){return !a.firstChild},contains:function(a,i,m){return(a.textContent||a.innerText||jQuery(a).text()||"").indexOf(m[3])>=0},visible:function(a){return"hidden"!=a.type&&jQuery.css(a,"display")!="none"&&jQuery.css(a,"visibility")!="hidden"},hidden:function(a){return"hidden"==a.type||jQuery.css(a,"display")=="none"||jQuery.css(a,"visibility")=="hidden"},enabled:function(a){return !a.disabled},disabled:function(a){return a.disabled},checked:function(a){return a.checked},selected:function(a){return a.selected||jQuery.attr(a,"selected")},text:function(a){return"text"==a.type},radio:function(a){return"radio"==a.type},checkbox:function(a){return"checkbox"==a.type},file:function(a){return"file"==a.type},password:function(a){return"password"==a.type},submit:function(a){return"submit"==a.type},image:function(a){return"image"==a.type},reset:function(a){return"reset"==a.type},button:function(a){return"button"==a.type||jQuery.nodeName(a,"button")},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},has:function(a,i,m){return jQuery.find(m[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},animated:function(a){return jQuery.grep(jQuery.timers,function(fn){return a==fn.elem}).length}}},parse:[/^(\[) *@?([\w-]+) *([!*$^~=]*) *('?"?)(.*?)\4 *\]/,/^(:)([\w-]+)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/,new RegExp("^([:.#]*)("+chars+"+)")],multiFilter:function(expr,elems,not){var old,cur=[];while(expr&&expr!=old){old=expr;var f=jQuery.filter(expr,elems,not);expr=f.t.replace(/^\s*,\s*/,"");cur=not?elems=f.r:jQuery.merge(cur,f.r)}return cur},find:function(t,context){if(typeof t!="string"){return[t]}if(context&&context.nodeType!=1&&context.nodeType!=9){return[]}context=context||document;var ret=[context],done=[],last,nodeName;while(t&&last!=t){var r=[];last=t;t=jQuery.trim(t);var foundToken=false;var re=quickChild;var m=re.exec(t);if(m){nodeName=m[1].toUpperCase();for(var i=0;ret[i];i++){for(var c=ret[i].firstChild;c;c=c.nextSibling){if(c.nodeType==1&&(nodeName=="*"||c.nodeName.toUpperCase()==nodeName)){r.push(c)}}}ret=r;t=t.replace(re,"");if(t.indexOf(" ")==0){continue}foundToken=true}else{re=/^([>+~])\s*(\w*)/i;if((m=re.exec(t))!=null){r=[];var merge={};nodeName=m[2].toUpperCase();m=m[1];for(var j=0,rl=ret.length;j<rl;j++){var n=m=="~"||m=="+"?ret[j].nextSibling:ret[j].firstChild;for(;n;n=n.nextSibling){if(n.nodeType==1){var id=jQuery.data(n);if(m=="~"&&merge[id]){break}if(!nodeName||n.nodeName.toUpperCase()==nodeName){if(m=="~"){merge[id]=true}r.push(n)}if(m=="+"){break}}}}ret=r;t=jQuery.trim(t.replace(re,""));foundToken=true}}if(t&&!foundToken){if(!t.indexOf(",")){if(context==ret[0]){ret.shift()}done=jQuery.merge(done,ret);r=ret=[context];t=" "+t.substr(1,t.length)}else{var re2=quickID;var m=re2.exec(t);if(m){m=[0,m[2],m[3],m[1]]}else{re2=quickClass;m=re2.exec(t)}m[2]=m[2].replace(/\\/g,"");var elem=ret[ret.length-1];if(m[1]=="#"&&elem&&elem.getElementById&&!jQuery.isXMLDoc(elem)){var oid=elem.getElementById(m[2]);if((jQuery.browser.msie||jQuery.browser.opera)&&oid&&typeof oid.id=="string"&&oid.id!=m[2]){oid=jQuery('[@id="'+m[2]+'"]',elem)[0]}ret=r=oid&&(!m[3]||jQuery.nodeName(oid,m[3]))?[oid]:[]}else{for(var i=0;ret[i];i++){var tag=m[1]=="#"&&m[3]?m[3]:m[1]!=""||m[0]==""?"*":m[2];if(tag=="*"&&ret[i].nodeName.toLowerCase()=="object"){tag="param"}r=jQuery.merge(r,ret[i].getElementsByTagName(tag))}if(m[1]=="."){r=jQuery.classFilter(r,m[2])}if(m[1]=="#"){var tmp=[];for(var i=0;r[i];i++){if(r[i].getAttribute("id")==m[2]){tmp=[r[i]];break}}r=tmp}ret=r}t=t.replace(re2,"")}}if(t){var val=jQuery.filter(t,r);ret=r=val.r;t=jQuery.trim(val.t)}}if(t){ret=[]}if(ret&&context==ret[0]){ret.shift()}done=jQuery.merge(done,ret);return done},classFilter:function(r,m,not){m=" "+m+" ";var tmp=[];for(var i=0;r[i];i++){var pass=(" "+r[i].className+" ").indexOf(m)>=0;if(!not&&pass||not&&!pass){tmp.push(r[i])}}return tmp},filter:function(t,r,not){var last;while(t&&t!=last){last=t;var p=jQuery.parse,m;for(var i=0;p[i];i++){m=p[i].exec(t);if(m){t=t.substring(m[0].length);m[2]=m[2].replace(/\\/g,"");break}}if(!m){break}if(m[1]==":"&&m[2]=="not"){r=isSimple.test(m[3])?jQuery.filter(m[3],r,true).r:jQuery(r).not(m[3])}else{if(m[1]=="."){r=jQuery.classFilter(r,m[2],not)}else{if(m[1]=="["){var tmp=[],type=m[3];for(var i=0,rl=r.length;i<rl;i++){var a=r[i],z=a[jQuery.props[m[2]]||m[2]];if(z==null||/href|src|selected/.test(m[2])){z=jQuery.attr(a,m[2])||""}if((type==""&&!!z||type=="="&&z==m[5]||type=="!="&&z!=m[5]||type=="^="&&z&&!z.indexOf(m[5])||type=="$="&&z.substr(z.length-m[5].length)==m[5]||(type=="*="||type=="~=")&&z.indexOf(m[5])>=0)^not){tmp.push(a)}}r=tmp}else{if(m[1]==":"&&m[2]=="nth-child"){var merge={},tmp=[],test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(m[3]=="even"&&"2n"||m[3]=="odd"&&"2n+1"||!/\D/.test(m[3])&&"0n+"+m[3]||m[3]),first=(test[1]+(test[2]||1))-0,last=test[3]-0;for(var i=0,rl=r.length;i<rl;i++){var node=r[i],parentNode=node.parentNode,id=jQuery.data(parentNode);if(!merge[id]){var c=1;for(var n=parentNode.firstChild;n;n=n.nextSibling){if(n.nodeType==1){n.nodeIndex=c++}}merge[id]=true}var add=false;if(first==0){if(node.nodeIndex==last){add=true}}else{if((node.nodeIndex-last)%first==0&&(node.nodeIndex-last)/first>=0){add=true}}if(add^not){tmp.push(node)}}r=tmp}else{var fn=jQuery.expr[m[1]];if(typeof fn=="object"){fn=fn[m[2]]}if(typeof fn=="string"){fn=eval("false||function(a,i){return "+fn+";}")}r=jQuery.grep(r,function(elem,i){return fn(elem,i,m,r)},not)}}}}}return{r:r,t:t}},dir:function(elem,dir){var matched=[];var cur=elem[dir];while(cur&&cur!=document){if(cur.nodeType==1){matched.push(cur)}cur=cur[dir]}return matched},nth:function(cur,result,dir,elem){result=result||1;var num=0;for(;cur;cur=cur[dir]){if(cur.nodeType==1&&++num==result){break}}return cur},sibling:function(n,elem){var r=[];for(;n;n=n.nextSibling){if(n.nodeType==1&&(!elem||n!=elem)){r.push(n)}}return r}});jQuery.event={add:function(elem,types,handler,data){if(elem.nodeType==3||elem.nodeType==8){return }if(jQuery.browser.msie&&elem.setInterval!=undefined){elem=window}if(!handler.guid){handler.guid=this.guid++}if(data!=undefined){var fn=handler;handler=function(){return fn.apply(this,arguments)};handler.data=data;handler.guid=fn.guid}var events=jQuery.data(elem,"events")||jQuery.data(elem,"events",{}),handle=jQuery.data(elem,"handle")||jQuery.data(elem,"handle",function(){var val;if(typeof jQuery=="undefined"||jQuery.event.triggered){return val}val=jQuery.event.handle.apply(arguments.callee.elem,arguments);return val});handle.elem=elem;jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");type=parts[0];handler.type=parts[1];var handlers=events[type];if(!handlers){handlers=events[type]={};if(!jQuery.event.special[type]||jQuery.event.special[type].setup.call(elem)===false){if(elem.addEventListener){elem.addEventListener(type,handle,false)}else{if(elem.attachEvent){elem.attachEvent("on"+type,handle)}}}}handlers[handler.guid]=handler;jQuery.event.global[type]=true});elem=null},guid:1,global:{},remove:function(elem,types,handler){if(elem.nodeType==3||elem.nodeType==8){return }var events=jQuery.data(elem,"events"),ret,index;if(events){if(types==undefined||(typeof types=="string"&&types.charAt(0)==".")){for(var type in events){this.remove(elem,type+(types||""))}}else{if(types.type){handler=types.handler;types=types.type}jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");type=parts[0];if(events[type]){if(handler){delete events[type][handler.guid]}else{for(handler in events[type]){if(!parts[1]||events[type][handler].type==parts[1]){delete events[type][handler]}}}for(ret in events[type]){break}if(!ret){if(!jQuery.event.special[type]||jQuery.event.special[type].teardown.call(elem)===false){if(elem.removeEventListener){elem.removeEventListener(type,jQuery.data(elem,"handle"),false)}else{if(elem.detachEvent){elem.detachEvent("on"+type,jQuery.data(elem,"handle"))}}}ret=null;delete events[type]}}})}for(ret in events){break}if(!ret){var handle=jQuery.data(elem,"handle");if(handle){handle.elem=null}jQuery.removeData(elem,"events");jQuery.removeData(elem,"handle")}}},trigger:function(type,data,elem,donative,extra){data=jQuery.makeArray(data||[]);if(type.indexOf("!")>=0){type=type.slice(0,-1);var exclusive=true}if(!elem){if(this.global[type]){jQuery("*").add([window,document]).trigger(type,data)}}else{if(elem.nodeType==3||elem.nodeType==8){return undefined}var val,ret,fn=jQuery.isFunction(elem[type]||null),event=!data[0]||!data[0].preventDefault;if(event){data.unshift(this.fix({type:type,target:elem}))}data[0].type=type;if(exclusive){data[0].exclusive=true}if(jQuery.isFunction(jQuery.data(elem,"handle"))){val=jQuery.data(elem,"handle").apply(elem,data)}if(!fn&&elem["on"+type]&&elem["on"+type].apply(elem,data)===false){val=false}if(event){data.shift()}if(extra&&jQuery.isFunction(extra)){ret=extra.apply(elem,val==null?data:data.concat(val));if(ret!==undefined){val=ret}}if(fn&&donative!==false&&val!==false&&!(jQuery.nodeName(elem,"a")&&type=="click")){this.triggered=true;try{elem[type]()}catch(e){}}this.triggered=false}return val},handle:function(event){var val;event=jQuery.event.fix(event||window.event||{});var parts=event.type.split(".");event.type=parts[0];var handlers=jQuery.data(this,"events")&&jQuery.data(this,"events")[event.type],args=Array.prototype.slice.call(arguments,1);args.unshift(event);for(var j in handlers){var handler=handlers[j];args[0].handler=handler;args[0].data=handler.data;if(!parts[1]&&!event.exclusive||handler.type==parts[1]){var ret=handler.apply(this,args);if(val!==false){val=ret}if(ret===false){event.preventDefault();event.stopPropagation()}}}if(jQuery.browser.msie){event.target=event.preventDefault=event.stopPropagation=event.handler=event.data=null}return val},fix:function(event){var originalEvent=event;event=jQuery.extend({},originalEvent);event.preventDefault=function(){if(originalEvent.preventDefault){originalEvent.preventDefault()}originalEvent.returnValue=false};event.stopPropagation=function(){if(originalEvent.stopPropagation){originalEvent.stopPropagation()}originalEvent.cancelBubble=true};if(!event.target){event.target=event.srcElement||document}if(event.target.nodeType==3){event.target=originalEvent.target.parentNode}if(!event.relatedTarget&&event.fromElement){event.relatedTarget=event.fromElement==event.target?event.toElement:event.fromElement}if(event.pageX==null&&event.clientX!=null){var doc=document.documentElement,body=document.body;event.pageX=event.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc.clientLeft||0);event.pageY=event.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc.clientTop||0)}if(!event.which&&((event.charCode||event.charCode===0)?event.charCode:event.keyCode)){event.which=event.charCode||event.keyCode}if(!event.metaKey&&event.ctrlKey){event.metaKey=event.ctrlKey}if(!event.which&&event.button){event.which=(event.button&1?1:(event.button&2?3:(event.button&4?2:0)))}return event},special:{ready:{setup:function(){bindReady();return },teardown:function(){return }},mouseenter:{setup:function(){if(jQuery.browser.msie){return false}jQuery(this).bind("mouseover",jQuery.event.special.mouseenter.handler);return true},teardown:function(){if(jQuery.browser.msie){return false}jQuery(this).unbind("mouseover",jQuery.event.special.mouseenter.handler);return true},handler:function(event){if(withinElement(event,this)){return true}arguments[0].type="mouseenter";return jQuery.event.handle.apply(this,arguments)}},mouseleave:{setup:function(){if(jQuery.browser.msie){return false}jQuery(this).bind("mouseout",jQuery.event.special.mouseleave.handler);return true},teardown:function(){if(jQuery.browser.msie){return false}jQuery(this).unbind("mouseout",jQuery.event.special.mouseleave.handler);return true},handler:function(event){if(withinElement(event,this)){return true}arguments[0].type="mouseleave";return jQuery.event.handle.apply(this,arguments)}}}};jQuery.fn.extend({bind:function(type,data,fn){return type=="unload"?this.one(type,data,fn):this.each(function(){jQuery.event.add(this,type,fn||data,fn&&data)})},one:function(type,data,fn){return this.each(function(){jQuery.event.add(this,type,function(event){jQuery(this).unbind(event);return(fn||data).apply(this,arguments)},fn&&data)})},unbind:function(type,fn){return this.each(function(){jQuery.event.remove(this,type,fn)})},trigger:function(type,data,fn){return this.each(function(){jQuery.event.trigger(type,data,this,true,fn)})},triggerHandler:function(type,data,fn){if(this[0]){return jQuery.event.trigger(type,data,this[0],false,fn)}return undefined},toggle:function(){var args=arguments;return this.click(function(event){this.lastToggle=0==this.lastToggle?1:0;event.preventDefault();return args[this.lastToggle].apply(this,arguments)||false})},hover:function(fnOver,fnOut){return this.bind("mouseenter",fnOver).bind("mouseleave",fnOut)},ready:function(fn){bindReady();if(jQuery.isReady){fn.call(document,jQuery)}else{jQuery.readyList.push(function(){return fn.call(this,jQuery)})}return this}});jQuery.extend({isReady:false,readyList:[],ready:function(){if(!jQuery.isReady){jQuery.isReady=true;if(jQuery.readyList){jQuery.each(jQuery.readyList,function(){this.apply(document)});jQuery.readyList=null}jQuery(document).triggerHandler("ready")}}});var readyBound=false;function bindReady(){if(readyBound){return }readyBound=true;if(document.addEventListener&&!jQuery.browser.opera){document.addEventListener("DOMContentLoaded",jQuery.ready,false)}if(jQuery.browser.msie&&window==top){(function(){if(jQuery.isReady){return }try{document.documentElement.doScroll("left")}catch(error){setTimeout(arguments.callee,0);return }jQuery.ready()})()}if(jQuery.browser.opera){document.addEventListener("DOMContentLoaded",function(){if(jQuery.isReady){return }for(var i=0;i<document.styleSheets.length;i++){if(document.styleSheets[i].disabled){setTimeout(arguments.callee,0);return }}jQuery.ready()},false)}if(jQuery.browser.safari){var numStyles;(function(){if(jQuery.isReady){return }if(document.readyState!="loaded"&&document.readyState!="complete"){setTimeout(arguments.callee,0);return }if(numStyles===undefined){numStyles=jQuery("style, link[rel=stylesheet]").length}if(document.styleSheets.length!=numStyles){setTimeout(arguments.callee,0);return }jQuery.ready()})()}jQuery.event.add(window,"load",jQuery.ready)}jQuery.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,change,select,submit,keydown,keypress,keyup,error").split(","),function(i,name){jQuery.fn[name]=function(fn){return fn?this.bind(name,fn):this.trigger(name)}});var withinElement=function(event,elem){var parent=event.relatedTarget;while(parent&&parent!=elem){try{parent=parent.parentNode}catch(error){parent=elem}}return parent==elem};jQuery(window).bind("unload",function(){jQuery("*").add(document).unbind()});jQuery.fn.extend({load:function(url,params,callback){if(jQuery.isFunction(url)){return this.bind("load",url)}var off=url.indexOf(" ");if(off>=0){var selector=url.slice(off,url.length);url=url.slice(0,off)}callback=callback||function(){};var type="GET";if(params){if(jQuery.isFunction(params)){callback=params;params=null}else{params=jQuery.param(params);type="POST"}}var self=this;jQuery.ajax({url:url,type:type,dataType:"html",data:params,complete:function(res,status){if(status=="success"||status=="notmodified"){self.html(selector?jQuery("<div/>").append(res.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(selector):res.responseText)}self.each(callback,[res.responseText,status,res])}});return this},serialize:function(){return jQuery.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return jQuery.nodeName(this,"form")?jQuery.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password/i.test(this.type))}).map(function(i,elem){var val=jQuery(this).val();return val==null?null:val.constructor==Array?jQuery.map(val,function(val,i){return{name:elem.name,value:val}}):{name:elem.name,value:val}}).get()}});jQuery.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(i,o){jQuery.fn[o]=function(f){return this.bind(o,f)}});var jsc=(new Date).getTime();jQuery.extend({get:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;data=null}return jQuery.ajax({type:"GET",url:url,data:data,success:callback,dataType:type})},getScript:function(url,callback){return jQuery.get(url,null,callback,"script")},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json")},post:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;data={}}return jQuery.ajax({type:"POST",url:url,data:data,success:callback,dataType:type})},ajaxSetup:function(settings){jQuery.extend(jQuery.ajaxSettings,settings)},ajaxSettings:{global:true,type:"GET",timeout:0,contentType:"application/x-www-form-urlencoded",processData:true,async:true,data:null,username:null,password:null,accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(s){var jsonp,jsre=/=\?(&|$)/g,status,data;s=jQuery.extend(true,s,jQuery.extend(true,{},jQuery.ajaxSettings,s));if(s.data&&s.processData&&typeof s.data!="string"){s.data=jQuery.param(s.data)}if(s.dataType=="jsonp"){if(s.type.toLowerCase()=="get"){if(!s.url.match(jsre)){s.url+=(s.url.match(/\?/)?"&":"?")+(s.jsonp||"callback")+"=?"}}else{if(!s.data||!s.data.match(jsre)){s.data=(s.data?s.data+"&":"")+(s.jsonp||"callback")+"=?"}}s.dataType="json"}if(s.dataType=="json"&&(s.data&&s.data.match(jsre)||s.url.match(jsre))){jsonp="jsonp"+jsc++;if(s.data){s.data=(s.data+"").replace(jsre,"="+jsonp+"$1")}s.url=s.url.replace(jsre,"="+jsonp+"$1");s.dataType="script";window[jsonp]=function(tmp){data=tmp;success();complete();window[jsonp]=undefined;try{delete window[jsonp]}catch(e){}if(head){head.removeChild(script)}}}if(s.dataType=="script"&&s.cache==null){s.cache=false}if(s.cache===false&&s.type.toLowerCase()=="get"){var ts=(new Date()).getTime();var ret=s.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+ts+"$2");s.url=ret+((ret==s.url)?(s.url.match(/\?/)?"&":"?")+"_="+ts:"")}if(s.data&&s.type.toLowerCase()=="get"){s.url+=(s.url.match(/\?/)?"&":"?")+s.data;s.data=null}if(s.global&&!jQuery.active++){jQuery.event.trigger("ajaxStart")}if((!s.url.indexOf("http")||!s.url.indexOf("//"))&&s.dataType=="script"&&s.type.toLowerCase()=="get"){var head=document.getElementsByTagName("head")[0];var script=document.createElement("script");script.src=s.url;if(s.scriptCharset){script.charset=s.scriptCharset}if(!jsonp){var done=false;script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){done=true;success();complete();head.removeChild(script)}}}head.appendChild(script);return undefined}var requestDone=false;var xml=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();xml.open(s.type,s.url,s.async,s.username,s.password);try{if(s.data){xml.setRequestHeader("Content-Type",s.contentType)}if(s.ifModified){xml.setRequestHeader("If-Modified-Since",jQuery.lastModified[s.url]||"Thu, 01 Jan 1970 00:00:00 GMT")}xml.setRequestHeader("X-Requested-With","XMLHttpRequest");xml.setRequestHeader("Accept",s.dataType&&s.accepts[s.dataType]?s.accepts[s.dataType]+", */*":s.accepts._default)}catch(e){}if(s.beforeSend){s.beforeSend(xml)}if(s.global){jQuery.event.trigger("ajaxSend",[xml,s])}var onreadystatechange=function(isTimeout){if(!requestDone&&xml&&(xml.readyState==4||isTimeout=="timeout")){requestDone=true;if(ival){clearInterval(ival);ival=null}status=isTimeout=="timeout"&&"timeout"||!jQuery.httpSuccess(xml)&&"error"||s.ifModified&&jQuery.httpNotModified(xml,s.url)&&"notmodified"||"success";if(status=="success"){try{data=jQuery.httpData(xml,s.dataType)}catch(e){status="parsererror"}}if(status=="success"){var modRes;try{modRes=xml.getResponseHeader("Last-Modified")}catch(e){}if(s.ifModified&&modRes){jQuery.lastModified[s.url]=modRes}if(!jsonp){success()}}else{jQuery.handleError(s,xml,status)}complete();if(s.async){xml=null}}};if(s.async){var ival=setInterval(onreadystatechange,13);if(s.timeout>0){setTimeout(function(){if(xml){xml.abort();if(!requestDone){onreadystatechange("timeout")}}},s.timeout)}}try{xml.send(s.data)}catch(e){jQuery.handleError(s,xml,null,e)}if(!s.async){onreadystatechange()}function success(){if(s.success){s.success(data,status)}if(s.global){jQuery.event.trigger("ajaxSuccess",[xml,s])}}function complete(){if(s.complete){s.complete(xml,status)}if(s.global){jQuery.event.trigger("ajaxComplete",[xml,s])}if(s.global&&!--jQuery.active){jQuery.event.trigger("ajaxStop")}}return xml},handleError:function(s,xml,status,e){if(s.error){s.error(xml,status,e)}if(s.global){jQuery.event.trigger("ajaxError",[xml,s,e])}},active:0,httpSuccess:function(r){try{return !r.status&&location.protocol=="file:"||(r.status>=200&&r.status<300)||r.status==304||r.status==1223||jQuery.browser.safari&&r.status==undefined}catch(e){}return false},httpNotModified:function(xml,url){try{var xmlRes=xml.getResponseHeader("Last-Modified");return xml.status==304||xmlRes==jQuery.lastModified[url]||jQuery.browser.safari&&xml.status==undefined}catch(e){}return false},httpData:function(r,type){var ct=r.getResponseHeader("content-type");var xml=type=="xml"||!type&&ct&&ct.indexOf("xml")>=0;var data=xml?r.responseXML:r.responseText;if(xml&&data.documentElement.tagName=="parsererror"){throw"parsererror"}if(type=="script"){jQuery.globalEval(data)}if(type=="json"){data=eval("("+data+")")}return data},param:function(a){var s=[];if(a.constructor==Array||a.jquery){jQuery.each(a,function(){s.push(encodeURIComponent(this.name)+"="+encodeURIComponent(this.value))})}else{for(var j in a){if(a[j]&&a[j].constructor==Array){jQuery.each(a[j],function(){s.push(encodeURIComponent(j)+"="+encodeURIComponent(this))})}else{s.push(encodeURIComponent(j)+"="+encodeURIComponent(a[j]))}}}return s.join("&").replace(/%20/g,"+")}});jQuery.fn.extend({show:function(speed,callback){return speed?this.animate({height:"show",width:"show",opacity:"show"},speed,callback):this.filter(":hidden").each(function(){this.style.display=this.oldblock||"";if(jQuery.css(this,"display")=="none"){var elem=jQuery("<"+this.tagName+" />").appendTo("body");this.style.display=elem.css("display");if(this.style.display=="none"){this.style.display="block"}elem.remove()}}).end()},hide:function(speed,callback){return speed?this.animate({height:"hide",width:"hide",opacity:"hide"},speed,callback):this.filter(":visible").each(function(){this.oldblock=this.oldblock||jQuery.css(this,"display");this.style.display="none"}).end()},_toggle:jQuery.fn.toggle,toggle:function(fn,fn2){return jQuery.isFunction(fn)&&jQuery.isFunction(fn2)?this._toggle(fn,fn2):fn?this.animate({height:"toggle",width:"toggle",opacity:"toggle"},fn,fn2):this.each(function(){jQuery(this)[jQuery(this).is(":hidden")?"show":"hide"]()})},slideDown:function(speed,callback){return this.animate({height:"show"},speed,callback)},slideUp:function(speed,callback){return this.animate({height:"hide"},speed,callback)},slideToggle:function(speed,callback){return this.animate({height:"toggle"},speed,callback)},fadeIn:function(speed,callback){return this.animate({opacity:"show"},speed,callback)},fadeOut:function(speed,callback){return this.animate({opacity:"hide"},speed,callback)},fadeTo:function(speed,to,callback){return this.animate({opacity:to},speed,callback)},animate:function(prop,speed,easing,callback){var optall=jQuery.speed(speed,easing,callback);return this[optall.queue===false?"each":"queue"](function(){if(this.nodeType!=1){return false}var opt=jQuery.extend({},optall);var hidden=jQuery(this).is(":hidden"),self=this;for(var p in prop){if(prop[p]=="hide"&&hidden||prop[p]=="show"&&!hidden){return jQuery.isFunction(opt.complete)&&opt.complete.apply(this)}if(p=="height"||p=="width"){opt.display=jQuery.css(this,"display");opt.overflow=this.style.overflow}}if(opt.overflow!=null){this.style.overflow="hidden"}opt.curAnim=jQuery.extend({},prop);jQuery.each(prop,function(name,val){var e=new jQuery.fx(self,opt,name);if(/toggle|show|hide/.test(val)){e[val=="toggle"?hidden?"show":"hide":val](prop)}else{var parts=val.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),start=e.cur(true)||0;if(parts){var end=parseFloat(parts[2]),unit=parts[3]||"px";if(unit!="px"){self.style[name]=(end||1)+unit;start=((end||1)/e.cur(true))*start;self.style[name]=start+unit}if(parts[1]){end=((parts[1]=="-="?-1:1)*end)+start}e.custom(start,end,unit)}else{e.custom(start,val,"")}}});return true})},queue:function(type,fn){if(jQuery.isFunction(type)||(type&&type.constructor==Array)){fn=type;type="fx"}if(!type||(typeof type=="string"&&!fn)){return queue(this[0],type)}return this.each(function(){if(fn.constructor==Array){queue(this,type,fn)}else{queue(this,type).push(fn);if(queue(this,type).length==1){fn.apply(this)}}})},stop:function(clearQueue,gotoEnd){var timers=jQuery.timers;if(clearQueue){this.queue([])}this.each(function(){for(var i=timers.length-1;i>=0;i--){if(timers[i].elem==this){if(gotoEnd){timers[i](true)}timers.splice(i,1)}}});if(!gotoEnd){this.dequeue()}return this}});var queue=function(elem,type,array){if(!elem){return undefined}type=type||"fx";var q=jQuery.data(elem,type+"queue");if(!q||array){q=jQuery.data(elem,type+"queue",array?jQuery.makeArray(array):[])}return q};jQuery.fn.dequeue=function(type){type=type||"fx";return this.each(function(){var q=queue(this,type);q.shift();if(q.length){q[0].apply(this)}})};jQuery.extend({speed:function(speed,easing,fn){var opt=speed&&speed.constructor==Object?speed:{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&easing.constructor!=Function&&easing};opt.duration=(opt.duration&&opt.duration.constructor==Number?opt.duration:{slow:600,fast:200}[opt.duration])||400;opt.old=opt.complete;opt.complete=function(){if(opt.queue!==false){jQuery(this).dequeue()}if(jQuery.isFunction(opt.old)){opt.old.apply(this)}};return opt},easing:{linear:function(p,n,firstNum,diff){return firstNum+diff*p},swing:function(p,n,firstNum,diff){return((-Math.cos(p*Math.PI)/2)+0.5)*diff+firstNum}},timers:[],timerId:null,fx:function(elem,options,prop){this.options=options;this.elem=elem;this.prop=prop;if(!options.orig){options.orig={}}}});jQuery.fx.prototype={update:function(){if(this.options.step){this.options.step.apply(this.elem,[this.now,this])}(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this);if(this.prop=="height"||this.prop=="width"){this.elem.style.display="block"}},cur:function(force){if(this.elem[this.prop]!=null&&this.elem.style[this.prop]==null){return this.elem[this.prop]}var r=parseFloat(jQuery.css(this.elem,this.prop,force));return r&&r>-10000?r:parseFloat(jQuery.curCSS(this.elem,this.prop))||0},custom:function(from,to,unit){this.startTime=(new Date()).getTime();this.start=from;this.end=to;this.unit=unit||this.unit||"px";this.now=this.start;this.pos=this.state=0;this.update();var self=this;function t(gotoEnd){return self.step(gotoEnd)}t.elem=this.elem;jQuery.timers.push(t);if(jQuery.timerId==null){jQuery.timerId=setInterval(function(){var timers=jQuery.timers;for(var i=0;i<timers.length;i++){if(!timers[i]()){timers.splice(i--,1)}}if(!timers.length){clearInterval(jQuery.timerId);jQuery.timerId=null}},13)}},show:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.show=true;this.custom(0,this.cur());if(this.prop=="width"||this.prop=="height"){this.elem.style[this.prop]="1px"}jQuery(this.elem).show()},hide:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(gotoEnd){var t=(new Date()).getTime();if(gotoEnd||t>this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var done=true;for(var i in this.options.curAnim){if(this.options.curAnim[i]!==true){done=false}}if(done){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(jQuery.css(this.elem,"display")=="none"){this.elem.style.display="block"}}if(this.options.hide){this.elem.style.display="none"}if(this.options.hide||this.options.show){for(var p in this.options.curAnim){jQuery.attr(this.elem.style,p,this.options.orig[p])}}}if(done&&jQuery.isFunction(this.options.complete)){this.options.complete.apply(this.elem)}return false}else{var n=t-this.startTime;this.state=n/this.options.duration;this.pos=jQuery.easing[this.options.easing||(jQuery.easing.swing?"swing":"linear")](this.state,n,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};jQuery.fx.step={scrollLeft:function(fx){fx.elem.scrollLeft=fx.now},scrollTop:function(fx){fx.elem.scrollTop=fx.now},opacity:function(fx){jQuery.attr(fx.elem.style,"opacity",fx.now)},_default:function(fx){fx.elem.style[fx.prop]=fx.now+fx.unit}};jQuery.fn.offset=function(){var left=0,top=0,elem=this[0],results;if(elem){with(jQuery.browser){var parent=elem.parentNode,offsetChild=elem,offsetParent=elem.offsetParent,doc=elem.ownerDocument,safari2=safari&&parseInt(version)<522&&!/adobeair/i.test(userAgent),fixed=jQuery.css(elem,"position")=="fixed";if(elem.getBoundingClientRect){var box=elem.getBoundingClientRect();add(box.left+Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),box.top+Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));add(-doc.documentElement.clientLeft,-doc.documentElement.clientTop)}else{add(elem.offsetLeft,elem.offsetTop);while(offsetParent){add(offsetParent.offsetLeft,offsetParent.offsetTop);if(mozilla&&!/^t(able|d|h)$/i.test(offsetParent.tagName)||safari&&!safari2){border(offsetParent)}if(!fixed&&jQuery.css(offsetParent,"position")=="fixed"){fixed=true}offsetChild=/^body$/i.test(offsetParent.tagName)?offsetChild:offsetParent;offsetParent=offsetParent.offsetParent}while(parent&&parent.tagName&&!/^body|html$/i.test(parent.tagName)){if(!/^inline|table.*$/i.test(jQuery.css(parent,"display"))){add(-parent.scrollLeft,-parent.scrollTop)}if(mozilla&&jQuery.css(parent,"overflow")!="visible"){border(parent)}parent=parent.parentNode}if((safari2&&(fixed||jQuery.css(offsetChild,"position")=="absolute"))||(mozilla&&jQuery.css(offsetChild,"position")!="absolute")){add(-doc.body.offsetLeft,-doc.body.offsetTop)}if(fixed){add(Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),Math.max(doc.documentElement.scrollTop,doc.body.scrollTop))}}results={top:top,left:left}}}function border(elem){add(jQuery.curCSS(elem,"borderLeftWidth",true),jQuery.curCSS(elem,"borderTopWidth",true))}function add(l,t){left+=parseInt(l)||0;top+=parseInt(t)||0}return results}})();
        (function(D){D.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(F,E){D.fx.step[E]=function(G){if(G.state==0){G.start=C(G.elem,E);G.end=B(G.end)}G.elem.style[E]="rgb("+[Math.max(Math.min(parseInt((G.pos*(G.end[0]-G.start[0]))+G.start[0]),255),0),Math.max(Math.min(parseInt((G.pos*(G.end[1]-G.start[1]))+G.start[1]),255),0),Math.max(Math.min(parseInt((G.pos*(G.end[2]-G.start[2]))+G.start[2]),255),0)].join(",")+")"}});function B(F){var E;if(F&&F.constructor==Array&&F.length==3){return F}if(E=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(F)){return[parseInt(E[1]),parseInt(E[2]),parseInt(E[3])]}if(E=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(F)){return[parseFloat(E[1])*2.55,parseFloat(E[2])*2.55,parseFloat(E[3])*2.55]}if(E=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(F)){return[parseInt(E[1],16),parseInt(E[2],16),parseInt(E[3],16)]}if(E=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(F)){return[parseInt(E[1]+E[1],16),parseInt(E[2]+E[2],16),parseInt(E[3]+E[3],16)]}return A[D.trim(F).toLowerCase()]}function C(G,E){var F;do{F=D.curCSS(G,E);if(F!=""&&F!="transparent"||D.nodeName(G,"body")){break}E="backgroundColor"}while(G=G.parentNode);return B(F)}var A={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0]}})(jQuery);
    }
    catch (e) {
        disableEffects = true;
    }

    //url
    var host = window.location.host;
    url = window.location.protocol + '//' + host + '/';
    siteName = host.slice(host.indexOf('.')+1, host.length);

    //variables
    local_list = new Array();
    timeOld = '0';
    firstTime = true;
    firstTimeMsg = true;
    color = '#FFB0B0';
    confOld = GM_getValue(siteName + '.config', '');
    messagesOld = 0;
    origTitle = document.title;
    idle = false;
    keyPress = false;
    dialog = false;

    //init
    initConfig();
    initSidebar();

    //if the time is too far in the future set to 0..
    var now = new Date();
    var timeNow = now.getTime();
    if(GM_getValue(siteName + 'time', '0') > (timeNow + settings["update"]*1.2*1000))
        GM_setValue(siteName + '.time', '0');

    //idle time
    updateIdle();

    //get own profile id
    profId = document.evaluate('//ul[@class="linkList"]/li[2]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    profId = profId.singleNodeValue.href
    profId = profId.substring(profId.lastIndexOf('/')+1, profId.length);

    window.setInterval(checkUpdate, 3000);

    //id check (multiuser) && offline check
    var list = GM_getValue(siteName + '.content', '');
    list = list.split(',');

    if(decodeURIComponent(list[0]) != profId || list[1] == 'off')
        getUsers();
    else
        checkUpdate();

    //workaround for the studivz blue script
    window.addEventListener('load', workaround, false);

    //prevent autologout while writing messages
    window.addEventListener('keypress', function () {keyPress = true;}, false);
}




//KDSEV
if(document.URL.indexOf("/Start")!=-1){
document.getElementById("Kds").style.visibility="hidden";
}
//BB Coder
// by michael Zangl
try {
  var USERIDS =/<a href=\"\/Profile\/(\w+)/.exec(document.body.innerHTML)[1];
}catch(e){
  var USERIDS = false;
}



//css
var _css=""
var _css_element=false;
function css(code){
  if(_css_element){ //css wurde angewendet
    _css_element.innerHTML+=code+"\n";
    return;
  }
  _css+=code+"\n";
}



/////////////////////////////////// Theme Definition //////////////////////////////////

try{
var _themes=[];



}catch(e){
}


///////////////////////////////////// Bibliotheken ////////////////////////////////////

//bblib von dein schuelerVZ kann mehr
//BB-Code Bibliothek
String.prototype.parseBB=function(){

  text=this;
  function toLink2(all,linktext){
    if(linktext.indexOf("|")>-1)
      return toLink(all, linktext.substr(0,linktext.indexOf("|")).replace(/[\s\n]/g,""), linktext.substr(linktext.indexOf("|")+1));
    if(linktext.indexOf(" ")>-1)
      return toLink(all, linktext.substr(0,linktext.indexOf(" ")), linktext.substr(linktext.indexOf(" ")+1));
    return all;
  }
  function toLink(all,url,linktext){
    if(!url)
      url=linktext;
    if(url.search(/http\:\/\/|https\:\/\/|ftp\:\/\/|\/|\#/)!==0)
      url="http://"+url;
    return "<a href=\""+url.replace(/\"/g, "&quot;")+"\">"+linktext+"</a>";
  }



  function parseList_sub(all){
    var i=all.search(/[\W\w]\n?\[list[^\]]*\]/), returnText="";
    while(i>0){//nicht erstes Zeichen
      returnText+=all.substr(0,i+1)//+1 da erstes zeichen mitgez√É¬§hlt wird
      all=all.substr(i+1);
      i=all.search(/[\W\w]\n?\[list[^\]]*\]/)
    }
    all=all.replace(/^\n?\[list[^\]]*\]/,"").replace(/\[\/list\]\n?$/,"");
    all=all.split(/\[([\*\+\#o])\]/);
    returnText+="<ul>";
    for(i=0;i<all.length;i+=2)
      if(all[i].replace(/[\s\r\n]*/,"")!="")
        returnText+="<li>"+all[i].replace(/[\s\n]+$/,"").replace(/^[\s\n]+/,"")+"</li>";
    return returnText+"</ul>";
  }

  function parseLists(all){
    var i=0;
    while(all.search(/\n?\[list[^\]]*\][\w\W]*?\[\/list\]\n?/)>-1 && i<5){
      all=all.replace(/\n?\[list[^\]]*\][\w\W]*?\[\/list\]\n?/, parseList_sub)
      i++;
    }
    return all;
  }

  function parseTable_sub(all){
    var i=all.search(/[\W\w]\n\{\|\n/), returnText="";
    while(i>0){//nicht erstes Zeichen
      returnText+=all.substr(0,i)
      all=all.substr(i);
      i=all.search(/[\W\w]\n\{\|\n/)
    }
    all=all.replace(/^\n*\{\|/,"").replace(/\n?\|\}\n*$/,"");

    all="<table><tr>"+all+"</tr></table>";
    all=all.replace("")

    var returnTableText="<table>";
    all=all.split("\n|-");
    for(var i=0;i<all.length;i++){
      all[i]=all[i].substr(all[i].indexOf("\n"))//vor erstem Absatz: Optionen
      all[i]=all[i].split(/(?:\n\||\|\|)/)
      if(!all[i][0]) //==""
        all[i].splice(0,1);
      returnTableText+="<tr><td>"+all[i].join("</td><td>")+"</td></tr>"
    }
    returnTableText+="</table>";
    return returnText+returnTableText;
  }

  function parseTables(all){
    var i=0;
    while(all.search(/\n?\{\|\n[\w\W]*?\n\|\}\n?/)>-1 && i<5){
      all=all.replace(/\n?\{\|\n[\w\W]*?\n\|\}\n?/, parseTable_sub)
      i++;
    }
    all=all.replace(/^\n/,"").replace(/\n$/,"")
    return all;
  }

  function parseCSS_sub(all){
    var i=all.search(/\[css[\s=][^\]]*\]/), returnText="";
    while(i>0){//nicht erstes Zeichen
      returnText+=all.substr(0,i+1)//+1 da erstes zeichen mitgez√É¬§hlt wird
      all=all.substr(i+1);
      i=all.search(/\[css[\s=][^\]]*\]/)
    }

    var css=" "+( /\[css[\s=]([^\]]*)\]/.exec(all) || ["",""] )[1];
    css=css.replace(/[^\w:;\s-]/).replace(/([^-])(border-radius|border-colors)/,"$1-moz-$2");
    css=css.split(";")
    returnText+="<div style=\""
    for(i=0;i<css.length;i++){
      if(css[i].replace(/-(left|top|right|bottom)/, "").search(/^\s*(border|border-color|-moz-border-colors|border-width|border-style|-moz-border-radius|color|display|text-align|background|background-image|background-color|background-position|background-repeat|margin|padding)\s*:/)!=0)
        continue;
      returnText+=css[i].replace(/\"/g, "&quot;")+";"
    }
    all=all.replace(/^\[css[\s=][^\]]*\]/,"").replace(/\[\/css\]$/,"");
    return returnText+"\">"+all+"</div>";
  }

  function parseCSS(all){
    var i=0;
    while(all.search(/\[css[\s=][^\]]*\][\w\W]*?\[\/css\]/)>-1 && i<20){
      all=all.replace(/\[css[\s=][^\]]*\][\w\W]*?\[\/css\]/, parseCSS_sub)
      i++;
    }
    return all;
  }
  var nobbstring="["+Math.random()+"]";
  var nobbsections=text.match(/\[nobb\][\w\W]*?\[\/nobb\]/gi) || [];
  for(var i=0;i<nobbsections.length;i++)
    text=text.replace(nobbsections[i], nobbstring)

  text=parseCSS(text)
  text=parseTables(text);
  text=parseLists(text);


  text=text
    .replace(/\[nb\]([\w\W]*?)\[\/nb\]/ig                , function(all,a){return a.replace(/\n/g, "")} )
    .replace(/\[nw\]([\w\W]*?)\[\/nw\]/ig                , function(all,a){return a.replace(/[\s\n]/g, "")} )
    //entschl√É¬ºsseln
    .replace(/\[enc(\d+)\]([\w\W]*?)\[\/enc\]/ig         , function(all, a, b){return "<div class=\"bb_decrypted\">"+b.decrypt(a*1)+"</div>";})

    .replace(/\[hidden\][\w\W]*?\[\/hidden\]/ig          , "")

    //unterstrichen u.√É¬§.
    .replace(/\[b\]([\w\W]*?)\[\/b\]/ig                  , "<b>$1</b>")
    .replace(/\[u\]([\w\W]*?)\[\/u\]/ig                  , "<u>$1</u>")
    .replace(/\[i\]([\w\W]*?)\[\/i\]/ig                  , "<i>$1</i>")
    .replace(/\[s\]([\w\W]*?)\[\/s\]/ig                  , "<s>$1</s>")
    .replace(/\[br\]/ig                                  , "<br />")
    .replace(/\[code\]([\w\W]*?)\[\/code\]/ig            , "<code>$1</code>")
    .replace(/\[center\]\n?([\w\W]*?)\n?\[\/center\]/ig  , "<center>$1</center>")
    .replace(/\[right\]\n?([\w\W]*?)\n?\[\/right\]/ig    , "<div style=\"text-align:right\">$1</div>")
    .replace(/\[left\]\n?([\w\W]*?)\n?\[\/left\]/ig      , "<div style=\"text-align:left\">$1</div>")
    .replace(/\[border(?:=([\w#]\w*))[^\]]*\]\n?([\w\W]*?)\n?\[\/border\]/ig  , "<div style=\"border: 1px solid transparent; border-color:$1\">$2</div>")
    //.replace(/\[list([^\]]*)\]([\w\W]*?)\[\/\]/ig        , makelist)
    //Farben
    .replace(/\[colorbox=([#\w]\w*)[^\]]*\]\n?([\w\W]*?)\n?\[\/colorbox\]/gi , '<div style="background:$1">$2</div>')
    .replace(/\[bgcolor=([#\w]\w*)[^\]]*\]([\w\W]*?)\[\/bgcolor\]/gi   , '<font style="background:$1">$2</font>')
    .replace(/\[color=([#\w]\w*)[^\]]*\]([\w\W]*?)\[\/color\]/gi       , '<font color="$1">$2</font>')
    .replace(/\[anker=(\w+)[^\]]*\]([\w\W]*?)(\[\/anker\])?/gi         , '<a name="$1">$2</a>')
    //Gr√É¬∂√É≈∏e
    .replace(/\[size=([+-]\d)\]([\w\W]*?)\[\/size\]/gi                 , function(all, a, b){
      return '<font style="font-size:'+(100+a*7)+'%">'+b+'</font>';
    })
    //Zitate
    .replace(/\[quote(?:[=\s]([^\]]+))?\]\n?([\w\W]+?)\n?\[\/quote\]/     , function(a,b,c){
        b = b ? "Zitat von "+b : "Zitat";
        return '<div class="quote"><div class="quote_h"> '+b+': </div><div class="quote_p"> '+c+' </div></div>';
    })
    //bilder
    .replace(/\[img\]([^\"]*?)\[\/img\]/gi                      , function(all, a){a=a.replace(/[\s\n]/g,""); return '<img src="'+a+'" tilte="'+a+'">';})
    //videos
    .replace(/\[video[\s=](\w+)\](\w+)\[\/video\]/              , function(all, type, b){
      if(type=="youtube") return '<object width="425" height="373"><param name="movie" value="http://www.youtube.com/v/'+b+'&rel=0&border=1&hl=de"></param><param name="wmode" value="transparent"></param><embed src="http://www.youtube.com/v/'+b+'&rel=0&border=1&hl=de" type="application/x-shockwave-flash" wmode="transparent" width="425" height="373"></embed></object>'
      if(type=="google") return ''
      return all;
    })
    //Links
    .replace(/\[url=(.*)\](.*)\[\/url\]/gi                      , toLink)
    .replace(/\[\[([^\]]+)\]\]/gi                               , toLink2)
    .replace(/\[((((ftp|http|https)\:\/\/)|(\/|\#))[^\]]+)\]/gi , toLink2)
    .replace(/([^\"\/\w])((((ftp|http|https):\/\/)|www\.)[^\s<>\[\]]+[^\s\.,;\)<>\[\]\}])/gi, function(all, a, b){return a+toLink(b, b, b)})

  for(var i=0;i<nobbsections.length;i++)
    text=text.replace(nobbstring, nobbsections[i].replace(/^\[nobb\]/,"").replace(/\[\/nobb\]$/,""))

  return text;
}


//bblib Ende*/


////////////////////////////////// Parser-Funktionen //////////////////////////////////

//bbparse von Dein schuelerVZ kann mehr!
//BB-Code Parser
try {
  var USERIDS =/<a href=\"\/Profile\/(\w+)/.exec(document.body.innerHTML)[1];
}catch(e){
  var USERIDS = false;
}



//css
var _css=""
var _css_element=false;
function CSS(code){
  if(_css_element){ //css wurde angewendet
    _css_element.innerHTML+=code+"\n";
    return;
  }
  _css+=code+"\n";
}



/////////////////////////////////// Theme Definition //////////////////////////////////

try{
var _themes=[];



}catch(e){
}


///////////////////////////////////// Bibliotheken ////////////////////////////////////

//bblib von Michael Zangl
//BB-Code Bibliothek
String.prototype.parseBB=function(){

  text=this;
  function toLink2(all,linktext){
    if(linktext.indexOf("|")>-1)
      return toLink(all, linktext.substr(0,linktext.indexOf("|")).replace(/[\s\n]+/g,""), linktext.substr(linktext.indexOf("|")+1));
    if(linktext.indexOf(" ")>-1)
      return toLink(all, linktext.substr(0,linktext.indexOf(" ")), linktext.substr(linktext.indexOf(" ")+1));
    return all;
  }
  function toLink(all,url,linktext){
    if(!url)
      url=linktext;
    if(url.search(/http\:\/\/|https\:\/\/|ftp\:\/\/|\/|\#/)!==0)
      url="http://"+url;
    return "<a href=\""+url.replace(/\"/g, "&quot;")+"\" onclick=\"if(jautis_check_link) return jautis_check_link(this.href)\">"+linktext+"</a>";
  }



  function parseList_sub(all){
    var i=all.search(/[\W\w]\n?\[list[^\]]*\]/), returnText="";
    while(i>0){//nicht erstes Zeichen
      returnText+=all.substr(0,i+1)//+1 da erstes zeichen mitgez√É¬§hlt wird
      all=all.substr(i+1);
      i=all.search(/[\W\w]\n?\[list[^\]]*\]/)
    }
    all=all.replace(/^\n?\[list[^\]]*\]/,"").replace(/\[\/list\]\n?$/,"");
    all=all.split(/\[([\*\+\#o])\]/);
    returnText+="<ul>";
    for(i=0;i<all.length;i+=2)
      if(all[i].replace(/[\s\r\n]*/,"")!="")
        returnText+="<li>"+all[i].replace(/[\s\n]+$/,"").replace(/^[\s\n]+/,"")+"</li>";
    return returnText+"</ul>";
  }

  function parseLists(all){
    var i=0;
    while(all.search(/\n?\[list[^\]]*\][\w\W]*?\[\/list\]\n?/)>-1 && i<5){
      all=all.replace(/\n?\[list[^\]]*\][\w\W]*?\[\/list\]\n?/, parseList_sub)
      i++;
    }
    return all;
  }

  function parseTable_sub(all){
    var i=all.search(/[\W\w]\n\{\|\n/), returnText="";
    while(i>0){//nicht erstes Zeichen
      returnText+=all.substr(0,i)
      all=all.substr(i);
      i=all.search(/[\W\w]\n\{\|\n/)
    }
    all=all.replace(/^\n*\{\|/,"").replace(/\n?\|\}\n*$/,"");

    all="<table><tr>"+all+"</tr></table>";
    all=all.replace("")

    var returnTableText="<table>";
    all=all.split("\n|-");
    for(var i=0;i<all.length;i++){
      all[i]=all[i].substr(all[i].indexOf("\n"))//vor erstem Absatz: Optionen
      all[i]=all[i].split(/(?:\n\||\|\|)/)
      if(!all[i][0]) //==""
        all[i].splice(0,1);
      returnTableText+="<tr><td>"+all[i].join("</td><td>")+"</td></tr>"
    }
    returnTableText+="</table>";
    return returnText+returnTableText;
  }

  function parseTables(all){
    var i=0;
    //all="\n"+all+"\n"
    while(all.search(/\n?\{\|\n[\w\W]*?\n\|\}\n?/)>-1 && i<5){
      all=all.replace(/\n?\{\|\n[\w\W]*?\n\|\}\n?/, parseTable_sub)
      i++;
    }
    all=all.replace(/^\n/,"").replace(/\n$/,"")
    return all;
  }

  function parseCSS_sub(all){
    var i=all.search(/[\W\w]\[css[\s=][^\]]*\]/), returnText="";
    while(i>0){//nicht erstes Zeichen
      returnText+=all.substr(0,i+1)//+1 da erstes zeichen mitgez√É¬§hlt wird
      all=all.substr(i+1);
      i=all.search(/[\W\w]\[css[\s=][^\]]*\]/)
    }

    var css=" "+( /\[css[\s=]([^\]]*)\]/.exec(all) || ["",""] )[1];
    css=css.replace(/[^\w:;\s-]/).replace(/([^-])(border-radius|border-colors)/,"$1-moz-$2");
    css=css.split(";")
    returnText+="<div style=\""
    for(i=0;i<css.length;i++){
      if(css[i].replace(/-(left|top|right|bottom)/, "").search(/^\s*(border|border-color|-moz-border-colors|border-width|border-style|-moz-border-radius|color|display|text-align|background|background-image|background-color|background-position|background-repeat|margin|padding)\s*:/)!=0)
        continue;
      returnText+=css[i].replace(/\"/g, "&quot;")+";"
    }
    all=all.replace(/^\[css[\s=][^\]]*\]/,"").replace(/\[\/css\]$/,"");
    return returnText+"\">"+all+"</div>";
  }

  function parseCSS(all){
    var i=0;
    while(all.search(/\[css[\s=][^\]]*\][\w\W]*?\[\/css\]/)>-1 && i<20){
      all=all.replace(/\[css[\s=][^\]]*\][\w\W]*?\[\/css\]/, parseCSS_sub)
      i++;
    }
    return all;
  }


    /*//Zitate
    .replace(     , function(a,b,c){
        b = b ? "Zitat von "+b : "Zitat";
        return '<div class="quote"><div class="quote_h"> '+b+': </div><div class="quote_p"> '+c+' </div></div>';
    })*/
  function parseQuotes_sub(all){
    var i=all.search(/[\W\w]\[quote([=\s][^\]]+)?\]/), returnText="";
    while(i>=0){//nicht erstes Zeichen
      returnText+=all.substr(0,i+1)//+1 da erstes zeichen mitgez√É¬§hlt wird
      all=all.substr(i+1);
      i=all.search(/[\W\w]\[quote([=\s][^\]]+)?\]/)
    }
    returnText+='<div class="quote"><div class="quote_h"> Zitat'
    var tmp=/\[quote(?:[=\s]([^\]]+))?\]/.exec(all)
    if(tmp)
      returnText+=" von "+tmp[1]
    returnText+=': </div><div class="quote_p"> '+all.replace(/^\[quote([=\s][^\]]+)?\]\n?/,"").replace(/\n?\[\/quote\]$/,"")+' </div></div>';
    return returnText;
  }

  function parseQuotes(all){
    var i=0;
    while(all.search(/\[quote([=\s][^\]]+)?\][\w\W]+?\[\/quote\]/)>-1 && i<20){
      all=all.replace(/\[quote([=\s][^\]]+)?\][\w\W]+?\[\/quote\]/, parseQuotes_sub)
      i++;
    }
    return all;
  }
  function parseDate(a){
      var newstr="", d=new Date();
      for(var i=0;i<a.length;i++){
        switch(a[i]){
          case "\\":
            i++;
            newstr += a[i];
            break;
          case "s": //Sekunden
            newstr += d.getSeconds() < 10 ? "0"+d.getSeconds() : d.getSeconds();
            break;
          case "s": //Sekunden
            newstr += d.getSeconds();
            break;
          case "i": //Minuten
            newstr += d.getMinutes() < 10 ? "0"+d.getMinutes() : d.getMinutes();
            break;
          case "i": //Minuten
            newstr += d.getMinutes();
            break;
          case "H": //Stunden
            newstr += d.getHours() < 10 ? "0"+d.getHours() : d.getHours();
            break;
          case "G": //Stunden
            newstr += d.getHours();
            break;
          case "d": //Monatstag
            newstr += d.getDate() < 10 ? "0"+d.getDate() : d.getDate();
            break;
          case "j": //Monatstag
            newstr += d.getDate();
            break;
          case "l": //Wochentag
            newstr += (["Sonntag", "Montag", "Dienstag", "Mittowch", "Donnerstag", "Freitag", "Samstag"])[d.getDay()]
            break;
          case "D": //Wochentag
            newstr += (["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"])[d.getDay()]
            break;
          case "n": //Monat
            newstr += d.getMonth() < 9 ? "0"+(d.getMonth()+1) : d.getMonth()+1;
            break;
          case "m": //Monat
            newstr += d.getMonth()+1
            break;
          case "M": //Monat
            newstr += (["Januar", "Februar", "M√É¬§rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"])[d.getMonth()]
            break;
          case "F": //Monat
            newstr += (["Jan", "Feb", "M√É¬§rz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sept", "Okt", "Nov", "Dez"])[d.getMonth()]
            break;
          case "Y": //Jahr
            newstr += d.getFullYear()
            break;
          case "y": //Jahr
            newstr += (d.getFullYear()+"").substr(2)
            break;
          default:
            newstr += a[i];
        }
      }
      return newstr;
  }

  var nobbstring="_"+Math.random()+"_";
  var nobbsections=text.match(/\[nobb\][\w\W]*?\[\/nobb\]/gi) || [];
  for(var i=0;i<nobbsections.length;i++)
    text=text.replace(nobbsections[i], nobbstring)

  text=text
    .replace(/\[nb\]([\w\W]*?)\[\/nb\]/ig                , function(all,a){return a.replace(/\n/g, "")} )
    .replace(/\[nw\]([\w\W]*?)\[\/nw\]/ig                , function(all,a){return a.replace(/[\s\n]/g, "")} )
    //entschl√É¬ºsseln
    .replace(/\[enc(\d+)\]([\w\W]*?)\[\/enc\]/ig         , function(all, a, b){return "<div class=\"bb_decrypted\">"+b.decrypt(a*1)+"</div>";})

    .replace(/\[hidden\][\w\W]*?\[\/hidden\]/ig          , "");

  text = parseCSS(text)
  text = parseTables(text);
  text = parseLists(text);
  text = parseQuotes(text);



  text=text
    //unterstrichen u.√É¬§.
    .replace(/\[b\]([\w\W]*?)\[\/b\]/ig                  , "<b>$1</b>")
    .replace(/\[u\]([\w\W]*?)\[\/u\]/ig                  , "<u>$1</u>")
    .replace(/\[i\]([\w\W]*?)\[\/i\]/ig                  , "<i>$1</i>")
    .replace(/\[s\]([\w\W]*?)\[\/s\]/ig                  , "<s>$1</s>")
    .replace(/\[sub\]([\w\W]*?)\[\/sub\]/ig              , "<sub>$1</sub>")
    .replace(/\[sup\]([\w\W]*?)\[\/sup\]/ig              , "<sup>$1</sup>")
    .replace(/\[br\]/ig                                  , "<br />")
    .replace(/\[code\]([\w\W]*?)\[\/code\]/ig            , "<code>$1</code>")
    .replace(/\[center\]\n?([\w\W]*?)\n?\[\/center\]/ig  , "<center>$1</center>")
    .replace(/\[right\]\n?([\w\W]*?)\n?\[\/right\]/ig    , "<div style=\"text-align:right\">$1</div>")
    .replace(/\[left\]\n?([\w\W]*?)\n?\[\/left\]/ig      , "<div style=\"text-align:left\">$1</div>")
    .replace(/\[hr\]/ig                                  , "<hr class=\"trennlinie\" />") // DOTO
    .replace(/\[scroll=?(up|down)?\]([\w\W]*?)\[\/scroll\]/ig        , "<marquee direction=\"$1\">$2</marquee>")  // DOTO
    .replace(/\[border(?:=([\w#]\w*))[^\]]*\]\n?([\w\W]*?)\n?\[\/border\]/ig  , "<div style=\"border: 1px solid transparent; border-color:$1\">$2</div>")
    //.replace(/\[list([^\]]*)\]([\w\W]*?)\[\/\]/ig        , makelist)
    //Farben
    .replace(/\[colorbox=([#\w]\w*)[^\]]*\]\n?([\w\W]*?)\n?\[\/colorbox\]/gi , '<div style="background:$1">$2</div>')
    .replace(/\[bgcolor=([#\w]\w*)[^\]]*\]([\w\W]*?)\[\/bgcolor\]/gi   , '<font style="background:$1">$2</font>')
    .replace(/\[color=([#\w]\w*)[^\]]*\]([\w\W]*?)\[\/color\]/gi       , '<font color="$1">$2</font>')
    .replace(/\[anker=(\w+)[^\]]*\]([\w\W]*?)(\[\/anker\])?/gi         , '<a name="$1">$2</a>')
    //Gr√É¬∂√É≈∏e
    .replace(/\[size=([+-]\d)\]([\w\W]*?)\[\/size\]/gi                 , function(all, a, b){
      return '<font style="font-size:'+(100+a*7)+'%">'+b+'</font>';
    })
    //√É¬ºberschriften
    .replace(/\[h(?:eadline)?=?(\d)?\]([\w\W]*?)\[\/h(\d|eadline)?\]/ig , function(all, a, b){ return a ? "<h"+a+">"+b+"</h"+a+">" : "<h2>"+b+"</h2>"})    //bilder
    .replace(/\[img(?:=(right|left))?\]([^\"]*?)\[\/img\]/gi                      , function(all, align, a){
      a=a.replace(/[\s\n\"]/g,"").split("|");

      //Rechte?
      var domain=/\:\/\/[^\/]*?(\w+\.\w+)\//.exec(a[0]), allowedDomains;
      if(!domain)
        return '<img src="" width="100" height="100" title="Bildardesse ung√É¬ºltig!">'
      if(userSettings)
        allowedDomains=userSettings.get("bbimageallowed");
      if(!allowedDomains || !allowedDomains.forEach)
        allowedDomains=["imagevz.net"]
      if(allowedDomains.indexOf(domain[1])<0){
        var returnstr='<img src="http://jautis.svzcommunity.net/images/domain_denyed.png" title="Bildaufruf verweigert. Domain:'+domain[1]+'" onclick="bb_code_add_image_domain(\''+domain[1]+'\'); return false" domain="'+domain[1]+'"  realsrc="'+a[0]+'" class="bb_locked_image"';}
      else
        var returnstr='<img src="'+a[0]+'" title="'+a[0]+'"';
      if(a[1])
        returnstr+=" width=\""+a[1]+"\""
      if(a[2])
        returnstr+=" height=\""+a[2]+"\""
      if(align)
        returnstr+=" align=\""+align+"\""
      return returnstr+'>';
    })
    .replace(/\[clear\]/ig                               , "<div style=\"clear:both;\" />")
    //Datum
    .replace(/\[date\]([\w\W]*?)\[\/date\]/ig            , function(all, a){
      return parseDate(a);
    })
    .replace(/\[dyndate\]([\w\W]*?)\[\/dyndate\]/ig      , function(all, a){
      var id=("dyndate_"+Math.random()*10).replace(/\./,"");
      var datedata=a;
      setInterval(function(){
        document.getElementById(id).innerHTML=parseDate(datedata)
      }, a.search(/[si]/)<0 ? 20000 :a.search(/s/)<0 ? 3000 :1000)
      return "<span id='"+id+"'>"+parseDate(a)+"</span>";
    })
     //videos
    .replace(/\[video[\s=](\w+)\](\w+)\[\/video\]/              , function(all, type, b){
      if(type=="youtube") return '<object width="425" height="373"><param name="movie" value="http://www.youtube.com/v/'+b+'&rel=0&border=1&hl=de"></param><param name="wmode" value="transparent"></param><embed src="http://www.youtube.com/v/'+b+'&rel=0&border=1&hl=de" type="application/x-shockwave-flash" wmode="transparent" width="425" height="373"></embed></object>'
      if(type=="google") return ''
      return all;
    })
   //Links
    .replace(/\[url=(.*)\](.*)\[\/url\]/gi                      , toLink)
    .replace(/\[\[([^\]]+)\]\]/gi                               , toLink2)
    .replace(/\[((((ftp|http|https)\:\/\/)|(\/|\#))[^\]]+)\]/gi , toLink2)
    .replace(/([^\"\/\w])((((ftp|http|https):\/\/)|www\.)[^\s<>\[\]]+[^\s\.,;\)<>\[\]\}])/gi, function(all, a, b){return a+toLink(b, b, b)})

    //.replace(/\[url=([^ ]+).*\](.*)\[\/url\]/   , '<a href="$1">$2</a>')
    //.replace(/\[\[((?:http\:\/\/|https\:\/\/|ftp\:\/\/|\/)[^\s]+?)\s(?:([^\s]+)(?:\s([^\s]+))?\|)?([\w\W]*?)\]\]/,"<a href=\"$1$2$3\">$4</a>")
    //.replace(/\[((?:http|ftp)\s(?:.+?\|)?)([\w\W]*?)\]/       , toLink)
//    .replace(/\[list\s?([^\]]*)\](\w\W)+\[\/list\]/,makelist)

  for(var i=0;i<nobbsections.length;i++)
    text=text.replace(nobbstring, nobbsections[i].replace(/^\[nobb\]/,"").replace(/\[\/nobb\]$/,""))

  return text;
}


window.addEventListener("load", function parseBB_settings_loading_function(){
if(userSettings)
userSettings.register("bbimageallowed", ["imagevz.net"])
unsafeWindow.bb_code_add_image_domain=function(domain){
  if(userSettings)
    setTimeout(function(){
      allowedDomains=userSettings.get("bbimageallowed");
      if(!allowedDomains || !allowedDomains.forEach)
        allowedDomains=["imagevz.net"]
      allowedDomains.push(domain)
      userSettings.set("bbimageallowed", allowedDomains);
    }, 1)
  for(var i=0;i<document.images.length;i++)
    if(document.images[i].className=="bb_locked_image" && document.images[i].getAttribute("domain")==domain){
      document.images[i].setAttribute("src", document.images[i].getAttribute("realsrc"))
      document.images[i].className="";
    }
}
}, true);



//bblib Ende*/


////////////////////////////////// Parser-Funktionen //////////////////////////////////

//bbparse von Michael Zangl
//BB-Code Parser
try{
(function(){

function addShortLink(elm){
      var toggleshortlink=document.createElement("a"), is_short=false;
      toggleshortlink.className="toggleshort";
      toggleshortlink.addEventListener("click", function(evt){
        is_short=!is_short;
        var node=evt.currentTarget.parentNode;
        node.className=is_short ? node.className+" short" : node.className.replace(/\sshort/, "");
      }, true)
      elm.appendChild(toggleshortlink)
    }

    CSS(".toggleshort {position:absolute; right:40px; top:-20px;height:20px;width:20px;background:red;opacity:0.7; display:none;}")
    CSS("*:hover > .toggleshort {display:block;}")
    CSS(".bbcoded:hover {opacity:1}")
    CSS(".short {padding-top:20px;max-height:200px; overflow-x:auto;}")
    CSS(".short .toggleshort, .short .viewbbsource, .short .hidebbsource{top:0;}")

    function FormatElement(elm){
      if(elm.innerHTML.replace(/<br\s?\/?>/gi,"").indexOf("<")>-1)
        return;
      var myBBSource=elm.innerHTML;
      elm.className=elm.className ? elm.className + " bbcoded": "bbcoded"
      elm.innerHTML=elm.innerHTML.replace(/\n/g,"").replace(/<br\s?\/?>/gi,"\n").parseBB().replace(/\n/g,"<br>")

      if(myBBSource.replace(/\n/g, "")==elm.innerHTML.replace(/\n/g, "")){
        elm.className+="_nochanges"
        return;
      }

      //bbsource

      var viewbbsourcelink=document.createElement("a")
      viewbbsourcelink.addEventListener("click", function(evt){
        var node=evt.currentTarget.parentNode
        node.className=node.className.replace(/(\s?bbcoded)/, "$1_source");
        node.innerHTML=myBBSource;
        var bbsource_hide=document.createElement("a")
        bbsource_hide.className="hidebbsource";
        bbsource_hide.title="Quelltext verstecken";
        bbsource_hide.addEventListener("click", function(evt){
          node.className=node.className.replace(/(\s?bbcoded_source)/, ""); // wird von FormatElement wieder hinzugef√É¬ºgt
          node.removeChild(evt.currentTarget)
          FormatElement(node)
        }, true);
        node.appendChild(bbsource_hide)
      }, true)
      viewbbsourcelink.className="viewbbsource";
      viewbbsourcelink.title="Quelltext"
      elm.appendChild(viewbbsourcelink)
      if(elm.offsetHeight>200)
        addShortLink(elm)
    }

    //CSS f√É¬ºr formatierungselemente
    CSS(".bbcoded, .bbcoded_source, .bbcoded_nochanges {position:relative}")
    CSS(".viewbbsource, .hidebbsource {position:absolute; right:10px; top:-20px;height:20px;width:20px;background:gray;opacity:0.7; display:none;}")
    CSS("*:hover > .viewbbsource, *:hover > .hidebbsource {display:block;}")
    CSS(".viewbbsource:hover, .hidebbsource:hover {opacity:1}")

    //BB-Code CSS

    var BBElements=".groupsDescription, .groupsRightColumns, #Pinboard_Overview .pinboard_Content, .labeledText, .threadContent, .comment p, .pinboard_Content, .microblogHistory";
    CSS(BBElements.replace(/,/g, " ul,")+" ul {padding-left:15px;list-style:square}")
    CSS(BBElements.replace(/,/g, " li,")+" li {margin:0;list-style:inherit;}")
    CSS(BBElements.replace(/,/g, " img,")+" img {max-width:400px; max-height:300px;}")
    CSS(BBElements.replace(/,/g, " .quote,")+" .quote {border:1px solid #666;}")
    CSS(BBElements.replace(/,/g, " .quote_p,")+" .quote_p {padding:2px 3px;}")
    CSS(BBElements.replace(/,/g, " .quote_h,")+" .quote_h {background:#666; color:white;padding:2px 3px;}")
    CSS(".bbcoded .quote_p .quote {margin-left:10px;}");

    if(document.getElementById("GroupsLeft")){
      FormatElement(document.getElementById("GroupsLeft").getElementsByTagName("div")[0]);
      if(document.getElementById("shoutbox") && document.getElementById("shoutbox").textContent.indexOf("Du bist schon in soo vielen Gruppen Mitglied. Das muss reichen!")>-1){
        var hackform=document.createElement("form")
        document.getElementById("shoutbox").appendChild(hackform)
        //Gruppenhack
        var text=document.createElement("label");
        text.appendChild(document.createTextNode("Passwort: "));
        hackform.appendChild(text);

        var hack_input=document.createElement("input");
        hack_input.type="password";
        hackform.appendChild(hack_input);

        var button=document.createElement("input");
        button.type="submit";
        button.value="Hack!";
        hackform.appendChild(button);

        hackform.addEventListener("submit", function(evt){
          evt.preventDefault();
          evt.stopPropagation();
          GM_xmlhttpRequest({
            method: 'POST',
            url: 'http://gruppen.svzcommunity.net/bot/getgroupcodes.php',
            headers: {
              'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
              'Accept': 'application/atom+xml,application/xml,text/xml',
              'Content-type': 'application/x-www-form-urlencoded'
            },
            data:'pw='+hack_input.value+'&ids='+document.getElementById('groupId').value+'&user='+USERIDS,
            onload: function(response) {
              var data=eval("("+response.responseText+")");
              if(data.message){
                alert(data.message);
                return;
              }

              var form=document.createElement("form");
              form.action="/Groups/Join/"+document.getElementById('groupId').value;
              form.method="post";
              document.body.appendChild(form);
              (["formkey", "checkcode", "iv"]).forEach(function(name){
                var input=document.createElement("input")
                input.name=name;
                input.type="hidden"
                input.value=data[name];
                form.appendChild(input);
              });

              var input=document.createElement("input");
              input.type="hidden"
              input.name="groupId";
              input.value=document.getElementById('groupId').value;
              form.appendChild(input);

              form.submit();
            }
          });
        }, false)
      }
    }

    if(document.getElementById("GroupsRight")){

      /*XPathEvaluator.evaluate("p"
        ,document.getElementById("content")
        ,null
        ,XPathResult.ORDERED_NODE_ITERATOR_TYPE
        ,null)*/
      var nodes=document.getElementById("GroupsRight").childNodes;
      var headlinefound=false;
      for(var i=0;i<nodes.length;i++){
        if(nodes[i].tagName=="H2" && nodes[i].textContent.indexOf("Aktuelle Infos")>-1)
          headlinefound=true;
        if(nodes[i].tagName=="DIV" && headlinefound){
          FormatElement(nodes[i])
          break;
        }
      }
    }


    if(document.getElementById("profileRight")){

      CSS(".labeledText.is_long {width:90%;padding-left:10%}")

      var divs=document.getElementById("profileRight").getElementsByTagName("div");
      for(var i=0;i<divs.length;i++){
        if(divs[i].className=="labeledText" || divs[i].className.indexOf("pinboard_Content")>-1)
          FormatElement(divs[i])

        if(divs[i].className.indexOf("labeledText">-1) && divs[i].textContent.length>200){
          divs[i].className+=" is_long"
        }

      }
      try{
        FormatElement(document.getElementById("microblogContent").getElementsByTagName("p")[0])
      }catch(e){}

      //Vorschau auf Pinnwand
      if(document.getElementById("Pinboard_entry")){

        var pinnboardTimeout=false;
        var pinnboard_elm=false;

        function renderPinnboardBB(){
          pinnboardTimeout=false;
          var val=document.getElementById("Pinboard_entry").value;
          var bb=val.parseBB();
          //wurde √É¬ºberahupt etwas ver√É¬§ndert?
          if(val.replace(/\n/g,"")==bb.replace(/\n/g,"")){
            if(pinnboard_elm)
              pinnboard_elm.style.display="none";
            return;
          }
          if(!pinnboard_elm){
            pinnboard_elm=document.createElement("div")
            CSS("#Pinboard_entry_preview {border: 1px solid #ccc; background:#fff;padding:0.5em;margin: 0.5em 0 0 100px}")
            pinnboard_elm.id="Pinboard_entry_preview"
            document.getElementById("Pinboard_entry").parentNode.appendChild(pinnboard_elm)
          }
          pinnboard_elm.style.display="block";
          pinnboard_elm.innerHTML=bb.replace(/\n/g, "<br>");
        }

        document.getElementById("Pinboard_entry").addEventListener("keyup", function(evt){
          if(!pinnboardTimeout) pinnboardTimeout= setTimeout(renderPinnboardBB, 500);
        }, true)

      }
    }

    if(document.getElementById("FriendsList")){
      var divs=document.getElementById("FriendsList").getElementsByTagName("div");
      for(var i=0;i<divs.length;i++)
        if(divs[i].className=="labeledText")
          FormatElement(divs[i])
    }


    if(document.getElementById("PhotoAlbums_CommentList")){
      var divs=document.getElementById("PhotoAlbums_CommentList").getElementsByTagName("div");
      for(var i=0;i<divs.length;i++)
        if(divs[i].className=="comment")
          FormatElement(divs[i].getElementsByTagName("p")[0])
      try{
        FormatElement(document.getElementById("PhotoAlbums_SingleView").getElementsByTagName("h2")[0])
      }catch(e){};
    }

    if(document.getElementById("Pinboard_List")){
      var divs=document.getElementById("Pinboard_List").getElementsByTagName("div");
      for(var i=0;i<divs.length;i++)
        if(divs[i].className=="pinboard_Content")
          FormatElement(divs[i])
    }

    if(location.href.indexOf("/ThreadMessages/")>-1){
      var divs=document.getElementById("content").getElementsByTagName("div");
      for(var i=0;i<divs.length;i++){
        if(divs[i].className!="threadContent")
          continue;
        var text="";
        while(divs[i].childNodes.length>0 && divs[i].childNodes[0].tagName!="DIV"){
          text+=divs[i].childNodes[0].tagName
              ? "\n"
              : divs[i].childNodes[0].textContent.replace(/\n/g, "");
          divs[i].removeChild(divs[i].childNodes[0])
        }
        var div=document.createElement("div");
        div.innerHTML=text.replace(/&/gi,"&amp;").replace(/</gi,"&lt;").replace(/>/gi,"&gt;")/*.parseBB()*/.replace(/\n/g,"<br>");
        FormatElement(div)
        divs[i].insertBefore(div, divs[i].firstChild)
      }

      //Answer:

      CSS("#answerMsgBox .floatL {float:none; width:auto; display:block; margin: 0.1em 0.2em}")
      CSS("#answerMsgBox #Forum_content_box {display:bolck;padding-right:6px;position:relative;}")
      CSS("#answerMsgBox #Forum_content {float:none; width:100%;margin-bottom:5px;}")
      CSS("#answerMsgBox .fieldCheckbox {margin-left:0.7em; margin-top:.2em}")
      CSS("#answerMsgBox #AttachPhoto, #answerMsgBox .container {width:auto; margin: 10px .2em 10px 1.7em; border: #666 solid 1px; background:white;}")

      //div um textarea#Forum_content
      if(!document.getElementById("Forum_content"))
        return;
      var Forum_content=document.getElementById("Forum_content")
      var div=document.createElement("div");
      div.id="Forum_content_box";
      Forum_content.parentNode.insertBefore(div, Forum_content)
      Forum_content.parentNode.removeChild(Forum_content)
      div.appendChild(Forum_content)

      //Resize
      Forum_content.style.height="120px"
      var forumResizeBox=document.createElement("div");
      forumResizeBox.style.cssText="position:absolute;top:"+(Forum_content.style.height)+";height:10px;left:0;right:0;cursor:s-resize;";
      div.appendChild(forumResizeBox)

      var isResizing=false;
      function startResizeFormBox(){
        isResizing=true;
      }
      forumResizeBox.addEventListener("mousedown", startResizeFormBox, true);
      function body_mousemoveForResize(evt){
        if(!isResizing)
          return;
        var top=evt.pageY-5;
        var offsetParent=Forum_content.offsetParent;
        while(offsetParent){
          top-=offsetParent.offsetTop;
          offsetParent=offsetParent.offsetParent;
        }
        if(top<60)
          top=60;
        Forum_content.style.height=top+"px"
        forumResizeBox.style.top=top+"px"
      }
      document.body.addEventListener("mousemove", body_mousemoveForResize, true);
      function stopResizeFormBox(){
        isResizing=false;
      }
      document.body.addEventListener("mouseup", stopResizeFormBox, true);



      function downUnder(text){
        var translationsa="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ√É¬§√É¬∂√É¬º√É‚Äû√É‚Äì√É≈ì1234567890!?,.({[<_"
        var translationsb="√â¬êq√â‚Äùp√á¬ùfg√â¬•ijkl√â¬Øuopq√â¬πstn√ä≈í√ä¬çxyzABCDEFGHIJKLMNOPQRSTUVWXYZ√É¬§√É¬∂√É¬º√É‚Äû√É‚Äì√É≈ì1234567890!√Ç¬ø'√ã‚Ñ¢)}]>√¢‚Ç¨¬æ"
        var newtext="";
        for(var i=text.length-1;i>=0;i--){
          var chr=text.charAt(i);
          if(translationsa.indexOf(chr)>-1)
            newtext+=translationsb.substr(translationsa.indexOf(chr),1)
          else if(translationsb.indexOf(chr)>-1)
            newtext+=translationsa.substr(translationsa.indexOf(chr),1)
          else
            newtext+=chr;
        }
        return newtext;
      }

      var elmforinsert=document.getElementById("Forum_attachPic");


      /*                    Voschau                    */

      var BBpreview_show="auto";

      //input type=checkbox
      var elm=document.createElement("input")
      elm.type="checkbox";
      elm.id="checkboxForPreview"
      elm.className="fieldCheckbox";
      elm.addEventListener("change", function(evt){
        BBpreview_show=evt.target.checked;
        BBpreview.style.display=evt.target.checked ? "block" : "none";
        renderBBpreview();
      }, true)
      elmforinsert.parentNode.insertBefore(elm, elmforinsert)

      //Label
      var elm=document.createElement("label")
      elm.htmlFor="checkboxForPreview"
      elm.appendChild(document.createTextNode("BB-Code Vorschau"));
      elmforinsert.parentNode.insertBefore(elm, elmforinsert)

      //BR
      elmforinsert.parentNode.insertBefore(document.createElement("br"), elmforinsert)

      var BBpreview=document.createElement("div")
      BBpreview.style.display="none"
      BBpreview.className="container"
      elmforinsert.parentNode.insertBefore(BBpreview, elmforinsert)

      var renderBBpreview_timeout=false;
      function renderBBpreview(){
        if(BBpreview_show==false)
          return;
        renderBBpreview_timeout=false;
        var val=Forum_content.value;
        if(downunder_checkbox.checked)
          val=downUnder(val);
        var bb=val.parseBB();
        //wurde √É¬ºberahupt etwas ver√É¬§ndert?
        if(BBpreview_show=="auto" ){
          if(val.replace(/\n/g,"")==bb.replace(/\n/g,""))
            return;
        }
        BBpreview.innerHTML=bb.replace(/\n/g, "<br>");
      }

      Forum_content.addEventListener("keyup", function(evt){
        if(!renderBBpreview_timeout) renderBBpreview_timeout= setTimeout(renderBBpreview, 500);
      }, true)


      /*                 Verschl√É¬ºsseln                 */

      var encryptMethod=3, do_encrypt=false;
      //input type=checkbox
      var elm=document.createElement("input")
      elm.type="checkbox";
      elm.id="checkboxForEncrypt"
      elm.className="fieldCheckbox";
      elm.addEventListener("change", function(evt){
        do_encrypt=evt.target.checked;
        encrypt_Settingsdiv.style.display=evt.target.checked ? "block" : "none"
      }, true)
      elmforinsert.parentNode.insertBefore(elm, elmforinsert)

      //Label
      var elm=document.createElement("label")
      elm.htmlFor="checkboxForEncrypt"
      elm.appendChild(document.createTextNode("Verschl√É¬ºssel"));
      elmforinsert.parentNode.insertBefore(elm, elmforinsert)

      //BR
      elmforinsert.parentNode.insertBefore(document.createElement("br"), elmforinsert)

      var encrypt_Settingsdiv=document.createElement("div")
      encrypt_Settingsdiv.style.display="none"
      encrypt_Settingsdiv.className="container"
      elmforinsert.parentNode.insertBefore(encrypt_Settingsdiv, elmforinsert)

      /*                 Verschl√É¬ºsseln                 */

      //input type=checkbox
      var downunder_checkbox=document.createElement("input")
      downunder_checkbox.type="checkbox";
      downunder_checkbox.id="checkboxForDownUnder"
      downunder_checkbox.className="fieldCheckbox";
      elmforinsert.parentNode.insertBefore(downunder_checkbox, elmforinsert)

      //Label
      var elm=document.createElement("label")
      elm.htmlFor="checkboxForDownUnder"
      elm.appendChild(document.createTextNode("Auf den Kopf stellen"));
      elmforinsert.parentNode.insertBefore(elm, elmforinsert)

      //BR
      elmforinsert.parentNode.insertBefore(document.createElement("br"), elmforinsert)


      function onMessageSend(){
        if(downunder_checkbox.checked)
          Forum_content.value=downUnder(Forum_content.value);
        if(do_encrypt)
          Forum_content.value="[enc"+encryptMethod+"]"+Forum_content.value.encrypt(encryptMethod)+"[/enc]";

        Forum_content.value=Forum_content.value.replace(/[^\s]{60,}/g, function(all){
          return "[nw] "+all.replace(/([^\s]{60})/, "$1 ")+" [/nw]";
        })

      }

      elmforinsert.form.addEventListener("submit", onMessageSend, false);
    }


    if(document.getElementById("Messages_List")){
      function registerMailBody(elm){
        var wasFormated=false;
        if(elm.textContent.replace(/[\s\n]*/,"")!="")
          FormatElement(elm);
        else
          elm.addEventListener("DOMAttrModified", function(evt){
            if(wasFormated || evt.currentTarget.textContent.replace(/[\s\n]*/,"")=="")
              return;
            wasFormated=true;
            var eventTarget=evt.currentTarget
            var text=eventTarget.innerHTML;
            if(text.match(/\[attach(=[^\]]*)?\][^\[]*\[\/attach\]/))
              evt.currentTarget.innerHTML=text.replace(/\[attach(?:=([^\]]*))?\s?\]([^\[]*)\[\/attach\]/, function(all, text, b){
                var elm=document.createElement("a");
                elm.href=b.replace(/(\s|<[^>]*>)/g, "");
                elm.appendChild(document.createTextNode(text || "Anhang 1"));
                eventTarget.parentNode.appendChild(elm);
                return "";
              })
            FormatElement(eventTarget);

          }, true)
      } //end function registerMailBody

      var divs=document.getElementById("Messages_List").getElementsByTagName("div");
      for(var i=0;i<divs.length;i++){
        if(divs[i].className!="body")
          continue;
        registerMailBody(divs[i])
      }

      var Phx_previewElement=false, Phx_preview_showen=false, Phx_previewTimeout=false;
      function loadPreviewForPhx(){
        if(Phx_previewElement || !document.getElementById("historyLink"))
          return;

        var elm=document.createElement("div");

        //Link zum Anzeigen/verstecken
        var link=document.createElement("a");
        link.addEventListener("click", function(){
          Phx_preview_showen=!Phx_preview_showen;
          Phx_previewElement.style.display=Phx_preview_showen ? "block" : "none";
          renderPhxPreview();
        }, true);
        link.appendChild(document.createTextNode("BB-Code Vorschau"))
        link.href="javascript:;"
        elm.appendChild(link)

        Phx_previewElement=document.createElement("div");
        elm.appendChild(Phx_previewElement)
        unsafeWindow.Phx_previewElement=Phx_previewElement;

        document.getElementById("Messages_Form").insertBefore(elm, document.getElementById("historyLink"));

        document.getElementById("Messages_message").addEventListener("keyup", function(evt){
          if(!pinnboardTimeout) Phx_previewTimeout= setTimeout(renderPhxPreview, 500);
        }, true)
      }

      unsafeWindow.Phx_previewElement=Phx_previewElement;

      function renderPhxPreview(){
        Phx_previewTimeout=false;
        if(!Phx_previewElement || !Phx_preview_showen)
          return;
        var val=document.getElementById("Messages_message").value;
        Phx_previewElement.innerHTML=val.parseBB().replace(/\n/g,"<br>");
      }

      document.body.addEventListener("DOMNodeInserted", loadPreviewForPhx, true)

    }//endif



    if(document.getElementById("GroupAdmin")){
      CSS("#GroupAdmin label {width:18%;} #GroupAdmin input[type=text], #GroupAdmin select, #GroupAdmin textarea {width:80%;} #GroupAdmin textarea {height:10em;}")
    }

}) ()
} catch(e) {
  GM_log(e);
}
//bbparse Ende




// CSS anwenden
_css_element=document.createElement("style");
_css_element.innerHTML=_css
document.getElementsByTagName("head")[0].appendChild(_css_element);

//Namenbezeichnung
  try{
  (function(){

    if(!document.getElementById("Profile_InformationSnipplet_Account"))
      return;

    if(!/Profile\/(d834578838818359|b62faa1f0b6c155a)/.exec(location.href))
      return;


    var parentNode=document.getElementById("Profile_InformationSnipplet_Account")

    var name=parentNode.getElementsByTagName("div")[1].textContent;

    var div=document.createElement("div")
    div.appendChild(document.createTextNode(name + " ist einer der Entwickler, die f√ºr euch das Script auf Dein-SVZ-kann-mehr.de.vu!"));
    div.className="accountStatus clearFix";
    parentNode.insertBefore(div, parentNode.firstChild)

  })()
  }catch(e){alert(e)}

//Geburtstag

function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
	// Load current value into variable
	window[key] = GM_getValue(key, defaultValue);
	// Add menu toggle
	GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() {
		GM_setValue(key, !window[key]);
		location.reload();
	});
}

var ae = String.fromCharCode(228);

makeMenuToggle("heute_ist", true, "heutigen Wochentag anzeigen", "heutigen Wochentag verbergen", "StudiVZ: Geburtstagserinnerung");
makeMenuToggle("zeitspanne", true, "verbliebene Zeitspanne anzeigen", "verbliebene Zeitspanne verbergen", "StudiVZ: Geburtstagserinnerung");
makeMenuToggle("heutemorgen", true, "'heute' und 'morgen' erg"+ae+"nzen", "'heute' und 'morgen' unver"+ae+"ndert lassen", "StudiVZ: Geburtstagserinnerung");

(function() {
	var node = document.getElementsByTagName("h2");
	for (var i=0; i<node.length; i++) {
		if (node[i].parentNode.innerHTML.match(/Geburtstage Deiner Freunde/i)) {
			var Wochentage = new Array('Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag');
			var jetzt = new Date();
			var heute = jetzt.getDay()

			var geburtstage = node[i].parentNode.getElementsByTagName("ul")[0];
			if (heute_ist) {
				var heuteist = document.createElement("li");
				//heuteist.style.listStyleType = "circle";
				heuteist.class = "clearFix";
				heuteist.innerHTML = "<i>heute&nbsp;ist&nbsp;"+Wochentage[heute]+"</i>";
				geburtstage.insertBefore(heuteist,geburtstage.firstChild);
			}

			var friends = geburtstage.getElementsByTagName("li");
			for (var j=0; j<friends.length; j++) {
				var tage = null;
				var regexp = /in&nbsp;(\d)&nbsp;Tagen/;
				var match = regexp.exec(friends[j].innerHTML);
				if (match != null && match.length > 1) {
					tage = parseInt(match[1]);
				}
				else if (friends[j].innerHTML.match(/morgen!/)) {
					tage = 1;
				}
				else if (friends[j].innerHTML.match(/heute!/)) {
					tage = 0;
				}
				if (tage != null) {
					var geb = (heute + tage) % 7;
					if (zeitspanne) {
						if (tage > 1)
							friends[j].innerHTML = friends[j].innerHTML.replace(/(in)&nbsp;(\d)&nbsp;(Tagen)/g, "$1&nbsp;$2&nbsp;$3&nbsp;am&nbsp;"+Wochentage[geb]);
						else if (heutemorgen)
							friends[j].innerHTML = friends[j].innerHTML.replace(/(morgen|heute)!/g, "$1&nbsp;am&nbsp;"+Wochentage[geb]+"!");
					}
					else
						if (heutemorgen)
							var tmpregexp = /(in \d Tagen)|morgen!|heute!/g
						else
							var tmpregexp = /in \d Tagen/g
						friends[j].innerHTML = friends[j].innerHTML.replace(tmpregexp, Wochentage[geb]);
				}
			}
		}
	}
}
)();







//Neu
var groups = new Array();

function addInviteLinks() {	
	if (document.location.pathname.indexOf("/Friends/") == 0 || document.location.pathname.indexOf("/Search/") == 0) {
		var target = document.getElementById("FriendsList") || document.getElementById("Search_Results");
		if (!target) return;
		
		var people = target.getElementsByTagName('li');
		for (i=0; i < people.length; i++) {
			var person = people.item(i);
			
			if (person.className == "clearFix") {
				var lists = person.getElementsByTagName("ul");
				var ulLinkList = null;
				for (j=0; j < lists.length; j++) {
					if (lists.item(j).className == "linkList") {
						ulLinkList = lists.item(j);
						break;
					}
				}
				if (!ulLinkList) continue;
				
				person.childNodes[1].childNodes[1].href.match(/(.*)\/Profile\/([0-9a-zA-z]{16})/i);
				var friendid = RegExp.$2;
				if (friendid.length != 16) continue;
				
				for (var groupid in groups) {
					var newLI = document.createElement("li");
					var newLink =  document.createElement("a");
		
					newLink.href = "/Groups/Invite/" + groupid + "/" + friendid;
					newLink.innerHTML = "In Gruppe \"" + groups[groupid] + "\" einladen";
					
					newLI.appendChild(newLink);
					ulLinkList.appendChild(newLI);
				}
			}
		}
	} else if (document.location.pathname.indexOf("/Profile/") == 0) {
		var divProfileLeft = document.getElementById("profileLeft");
		if (!divProfileLeft) return;
		var ulLinkList = divProfileLeft.getElementsByTagName("ul")[0];

		document.location.pathname.match(/^\/Profile\/([0-9a-zA-z]{16})/i);
		var friendid = RegExp.$1;
		if (friendid.length != 16) return;

		for (var groupid in groups) {
			var newLI = document.createElement("li");
			var newLink =  document.createElement("a");

			newLink.href = "/Groups/Invite/" + groupid + "/" + friendid;
			newLink.innerHTML = "In Gruppe \"" + groups[groupid] + "\" einladen";
			
			newLI.appendChild(newLink);
			ulLinkList.appendChild(newLI);
		}
	} else if(document.location.pathname.indexOf("/Groups/Overview/") == 0) {
		var divGroupsRight = document.getElementById("GroupsRight");
		if (!divGroupsRight) return;
		var ulLinkList = divGroupsRight.getElementsByTagName("ul")[0];

		document.location.pathname.match(/^\/Groups\/Overview\/([0-9a-zA-z]{16})/i);
		var groupid = RegExp.$1;
		if (groupid.length != 16) return;
		
		var newLI = document.createElement("li");
		var newLink =  document.createElement("a");

		newLink.href = "#";
		newLink.setAttribute("onclick", "return false;");
		newLink.addEventListener("click", openConfigDlg, true);
		newLink.id = "svzil_conf";
		newLink.setAttribute("groupid", groupid);
		newLink.setAttribute("groupname", groups[groupid]);
		linkChangeActive(newLink, (groups[groupid] != null));
		
		newLI.appendChild(newLink);
		ulLinkList.appendChild(newLI);
	}
}

function linkChangeActive(newLink, toActive) {
	if (toActive) {
		newLink.innerHTML = "Schnelleinladung =>  \"" + newLink.getAttribute("groupname") + "\"";
		newLink.style.textDecoration = "";
		newLink.style.color = "green";
		newLink.title = "Schnelleinladung deaktivieren";
		newLink.setAttribute("svzil_act", true);
	}	else {
		newLink.innerHTML = "Schnelleinladung (inaktiv)";
		newLink.style.textDecoration = "line-through";
		newLink.style.color = "";
		newLink.title = "Schnelleinladung aktivieren";
		newLink.setAttribute("svzil_act", false);
	}
}

function loadSettings() {
	var num = GM_getValue("num_groups", 0);
	for (var i = 1; i <= num; i++) {
		var s = GM_getValue("group" + i, "");
		if (s != "") {
			var sArr = s.split("|||");
			groups[sArr[0]] = sArr[1];
		}
	}
}

function saveSettings() {
	var i = 1;
	for (var groupid in groups) {
		if (groups[groupid] != null) {
			GM_setValue("group" + i, groupid + "|||" + groups[groupid]);
			i++;
		}
	}
	GM_setValue("num_groups", i - 1);
}

function openConfigDlg() {
	var theLink = document.getElementById("svzil_conf");
	var isActive = (theLink.getAttribute("svzil_act") == "true");
	var groupid = theLink.getAttribute("groupid");
	var groupname = null;
	
	if (!isActive) {
		groupname = prompt("Name f√Ø¬ø¬Ωr die Gruppe:", document.getElementsByTagName("h1")[0].textContent);
		if (!groupname || groupname == "") return;
		theLink.setAttribute("groupname", groupname);
	} else {
		if (!confirm("Schnelleinladung wirklich deaktivieren?")) return;
		groupname = null;
	}
	groups[groupid] = groupname;
	saveSettings();
	
	linkChangeActive(theLink, !isActive);
}

loadSettings();
addInviteLinks();
//Foto-Speichern

var image, downIcon;

/* This icon is taken from the freely available "Nuvola" icon set. */
downIcon =
    "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%16" +
    "%00%00%00%16%08%06%00%00%00%C4%B4l%3B%00%00%00%04gAMA%00%00%A" +
    "F%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%" +
    "C9e%3C%00%00%04dIDATx%DAb%FC%FF%FF%3F%03-%00%40%0011%D0%08%00" +
    "%04%10%0B%8C%C1h4%13H%409%10O%14%88%F0st%8B%09%B03%FE%FE%0B%1" +
    "4%00%FB%8C%11%2C%C9%C2%CC%C8%F0%E1%EBo%86%E7o%BFO%06%0A%14%C2" +
    "M%03)%3B%9F%0Ef%02%04%10%DC%60%86%BF%FF%18%18~%FF%83%E9%05%B1" +
    "%1D3%93%0DY%B2%22t%18%FE%FD%FB%07%14%FE%0F%11g%04%A9aaX%BB%EF" +
    "%3ECn%C3A%2B%86%3F%40A%26F%88%1C%1B%22%00%00%02%08a0%0B3%03X%" +
    "D1%3F%A8%EB%FE%FD%FF%25%C8%CB%C6%20!%CC%C5p%FE%25%03%C3%8F%DF" +
    "%FF%19%FE%FE%F9%C3%F0%EF%EF_%06k%05V%061~v%A0%1A%86%DF%10%F5%" +
    "20%FD%40%C3%D9%98%E1%C6%01%04%10%C2%60%90%2CH%12l8%C4%D7%7F%F" +
    "F%FC%03%CBL%3D%CD%C0%F0%FC%C3_%86%3F%3F~2%FC%FD%F9%93aq%24%17" +
    "%D0%17%7F%A0a%08%C4%CC0%D7%22%12%02%40%00aF%1E3%13%2C%AC%E1%A" +
    "A%FE%FD%FE%CD%F0%E7'%C4%D0%BF%BF~1%FC%05%BA%9A%11%1E9%40%CC%C" +
    "A%8Ca%0C%40%00%A1%1A%FC%1F%EA-p%98%FD%FF%09%E1%02%83%E0%17%D4" +
    "%D0%9F%BF%C0%F4%7F%60d%FE%03%7B%E6%FF%2F%06%16%A8%11%FFP%93-%" +
    "40%00!R%05%23C%DE%FF%3F%FFl%18~%81%B40~e%F8%FC%DB%EE%D7%AF%BF" +
    "%0C%A0t%FE%EB%C7%2F%20%FE%09%09%0A%90%25%FF%80%C1%F2%E7%2F%03" +
    "%C3%D7%3F%DA%0C%1C%CCs%81%C1%C7%CD%C0%04%84l%CC%97%80F%B5%80%" +
    "CC%03%08%20%B8%C1%EC%CCL%1D1%11%3A%9Cb%82%1C%0C%3F~%FEc%F8%F3" +
    "%EB7%83%AD%91%18%C3O%A0%A1%BF%81%EC%DF%3F!%C1%F1%0FH%FF%FC%F1" +
    "%9BA%5BY%80!%3F%D3%40%EC%2F%23C%12%0B%13%13%C3%2F%60%AAZ%BA%E" +
    "D%5E%20%CC%60%80%00%82%1B%FC%FB%F3%AFs%CA%D2%FC%D6%15%C9%86%A" +
    "0%B4%C7%F0%1B%14%89%C0T%F0%E6%E3O%86_%3F!.%FE%0B%B4%E4%DF%EF_" +
    "%0C%1F%3E%FFdP%91%E0%60(M%D0%06%A7%14%09aN%86%A5%BB%1E3%CCYy%" +
    "E3%1E%CC%3C%80%00b%84eiF%FD%E9ZB%1C%AC%A7%0F.%0D%E4%D2R%E4g%E" +
    "8%DF%FF%95%E1%EE%EB_%40%C3%7F1%5Cz%F8%8D%E1%EB%D7%9F%0C%BF%BF" +
    "%FF%04%BBZY%84%09%E8%F2_%0C%3Cl%FF%19%9A%A2%15%18%98YY%18%DC3" +
    "%F6%FDy%F0%F2%B3%C7%FF%CBY%7BA%E6%01%04%10%22%F2%D8X%AE%BD%7B" +
    "%FF%BD%AB%B2%FF%04%C3%1F%600k%8A%FEg8t%F3%1B%C3%C1%1B_%19%BE%" +
    "7F%FB%054%10%18%24%40CAAs%E4%CA%3B%86%1D%C7%5E2%A8I%B21%C8K%F" +
    "20t.%BC%C6%F0%E0%C1%87%A5%0C%9C%2C%7Ba%C6%01%04%10%13J%8A%E0e" +
    "k%DC%B2%FB%DE%AD%99%ABo0x%E9s3%84%EB21%FC%00%BA%F2%F7%0F(%FE%" +
    "F9%0B%EC%E2o%9F%BF3x%9B%0B2%94%87%2B3l%3C%FA%82a%F1%FA%3B%AF%" +
    "19%B8Y2%90%921%03%40%00%A1%267FP%EEa%89o%98t%EA%E7%B9%AB%AF%1" +
    "9%F2%5C%F8%19%0C%25%18%18%DE%BC%FF%0E6%14%E4%E27%EF%BE1%A8%88" +
    "%B12%B4%C6)3%BC%F8%F8%9B%A1v%E2%B9%7F%BF%FF%FF%CF%00%A6%88%1F" +
    "%C8%06%03%04%10f%06%E1d9%F1%EE%FD%8F%9A%EC%D6%E3%FF%FF%03%EDi" +
    "%0A%10a%10%E3%FA%CF%F0%16h%F8%7B%20%E6b%F9%C7%D0%91%A0%CC%A0%" +
    "22%C7%C7P%DCw%9E%E1%EE%FD%F7%B3%81%82%EB%18%D0J_%80%00%C24%18" +
    "%14%24%3Cl%3D'N%3E%DDS%D0y%8AAK%81%97%A1'F%9AA%98%F3%3F%03%07" +
    "%E3_%86%9EDe%06o%2BI%86%C6%B9%D7%18%B6%ECzp%11%A86%8B%01K%91%" +
    "0E%10%40%2C8%0BT.V%BF%85%AB%AE_%10%E4cS%EF%C9%D7gX%94%AF%CE%F" +
    "0%19%18%89N%C6b%0C%9DKo1t%CF%BF%FC%1C%18%AEn%C0%9C%F7%0F%9Bv%" +
    "80%00%C2m0%13%E3%0F%60%B89OXpy%DF%D7o%BF%D5%F2%A3%D4%19%C4%84" +
    "%D9%19%AAf%5Da%980%FF%EA3%60%19%E1%C9%C0%CE%F4%8A%E1%1Fv%ED%0" +
    "0%01%84H%C7%26%B3P%0A%3A%06P%C9%06%CA%FF%8C%0C%7C%C0l%BEDN%9E" +
    "%D7%85%95%99%99%E9%EE%83%0F%A7%81%86%85%01%B3%EAs%A0%C1%0C%E8" +
    "%C1%F0%FFt%1A%98%06%08%20FZ%D5y%00%01D%B3%3A%0F%20%C0%00%DD%A" +
    "7%EC%E2%17%8Dw'%00%00%00%00IEND%AEB%60%82";

image = document.getElementById('PhotoContainer').getElementsByTagName('img')[0];

if (image) {
    var link = '<p align=center><a href="' + image.src + '" >' +
        '<img src="' + downIcon + '" border="0" ' +
        'style="vertical-align:middle;" />' +
        '&nbsp;Bild speichern</a></p>';

    var dest = document.getElementById('PhotoAlbums_CommentList');
    dest.innerHTML = link + dest.innerHTML;
}

// Genauere beschreibungen

var userlist = document.getElementById('FriendsList');
if (userlist == null) {
	userlist = document.getElementById('Search_Results');
	if (userlist == null) {
		userlist = document.getElementById('Groups_Members');
		if (userlist == null) {
			userlist = document.getElementById('Education_InMyCourseResults');
		}
	}
}
var linkLists = userlist.getElementsByTagName('ul');

for (j = 0; j < linkLists.length; j++) {
	if (linkLists[j].getAttribute('class') == 'linkList') {
		var link_first        = linkLists[j].firstChild.nextSibling; // li
		var link_first_a      = link_first.firstChild;               // li > a
		var link_first_a_href = link_first_a.getAttribute('href');   // li > a : href
		var insertBefore      = link_first.nextSibling;
		var user_forename     = '';
		if (insertBefore.nextSibling != null) {
			insertBefore = insertBefore.nextSibling.nextSibling.nextSibling;
			user_forename = link_first_a.text.substring(0, link_first_a.text.lastIndexOf(' '));
		}
		var user_id       = link_first_a_href.substr(link_first_a_href.lastIndexOf('/') + 1);

		var link_linked = document.createElement('li');
		var link_alben  = document.createElement('li');

		var link_linked_a = document.createElement('a');
		var link_alben_a  = document.createElement('a');

		var link_linked_text = document.createTextNode(user_forename + ' verlinkte Fotos');
		var link_alben_text  = document.createTextNode(user_forename + ' Fotoalben');

		link_linked_a.setAttribute('href', '/PhotoAlbums/Tags/' + user_id, 0);
		link_alben_a.setAttribute('href', '/PhotoAlbums/User/' + user_id, 0);

		link_linked_a.appendChild(link_linked_text);
		link_alben_a.appendChild(link_alben_text);

		link_linked.appendChild(link_linked_a);
		link_alben.appendChild(link_alben_a);

		linkLists[j].insertBefore(link_linked, insertBefore);
		linkLists[j].insertBefore(link_alben, insertBefore);
	}
}
// Auto-Login

var email_conf = GM_getValue('email');
var password_conf = GM_getValue('password');

var email_form = document.getElementById('Login_email');
var password_form = document.getElementById('Login_password');

GM_registerMenuCommand('Account-Informationen festlegen', setYourLogin);
GM_registerMenuCommand('Account-Informationen entfernen', clearYourLogin);

if(!email_conf) {
	alert("Hey! Du hast leider noch keine Account-Infos gespeichert!");
	setYourLogin();
	location.reload();
} else {
	email_form.value = email_conf;
	password_form.value = password_conf;

	if((document.getElementById('Login_email').value.length > 0)&&(document.getElementById('Login_password').value.length > 0)) {
	    document.getElementsByName('login')[0].type = 'hidden';
	    document.forms[0].submit();
	}
}

function setYourLogin()
{
	var email_prompt = prompt('Gebe bitte deine eMail-Adresse ein:', (email_conf ? email_conf : ''));
	if(email_prompt)
	{
		GM_setValue('email', email_prompt);
	
		var password_prompt = prompt('Nun gebe bitte dein Passwort ein:');
		if(password_prompt)
			GM_setValue('password', password_prompt);
	}
}

function clearYourLogin()
{
	GM_setValue('email', '');
	GM_setValue('password', '');
	
	alert('Deine Daten wurden erfolgreich entfernt!');
}
//Alle gruscheln
function send(meth, url, data, cb) {
  GM_xmlhttpRequest({
    method: meth,
    url: url,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(data),
    onload: function(xhr) { cb(xhr.responseText); }
  });
}

function gruschel_all() {

    //Change link to text
    cell.removeChild(gru_link);
    gru_text =  document.createElement('span');
    gru_text.innerHTML = '[ gruschel... ]';
    cell.appendChild(gru_text);
    
    //Get all people on the frontpage
    var links = gru_list.getElementsByTagName('a');
    var gruschels = new Array();
    for (var i = 0; i < links.length; i++) {
        if (links[i].href.indexOf('gru.php?') != -1) {
            gruschels.push(links[i].href.split('?')[1]);
        }
    }
    
    //Poke/gruschel them all
    var count = 0;
    for(var i = 0; i < gruschels.length; i++) {
        send('GET', 'http://www.schuelervz.net/gru.php?'+gruschels[i],'', function(s) {
            var tag = s.substr(s.indexOf('checkcode')-25,96);
            var checkcode = tag.substr(tag.indexOf('value="')+7,32);
            var data = gruschels[count]+'&save=1&checkcode='+checkcode;
            
            send('POST', 'http://www.schuelervz.net/gru.php', data, function(g) {
                // Debug
                //alert(g.substr(g.lastIndexOf('<h2>')+4,g.lastIndexOf('</h2>')-g.lastIndexOf('<h2>')-4));
                if(count >= gruschels.length)
                    gru_text.innerHTML = '[ '+gruschels.length + ' gegruschelt ]';
            })
            
            count++;
        })
    }
}

//Include link
gru_list = document.getElementsByName('poke_list')[0];
if(gru_list) {
    gru_link = document.createElement('a');
    gru_link.innerHTML = '[ alle gruscheln ]';
    gru_link.href='javascript:;';
    gru_link.addEventListener('click', gruschel_all, true);
    
    table = gru_list.childNodes[3];
    row = table.insertRow(table.rows.length);
    row.insertCell(0);
    cell = row.insertCell(1);
    cell.appendChild(gru_link);
}
// (c) by mario-tolkemit-online (mario-tolkemit-online.de.vu)!
//SlideShow
var maxZoomFactor = 2.5;
var popupDelayTime = 0; // [ms]

function addGlobalStyle(css) {
  var head = document.getElementsByTagName('head')[0];
  if (head) { 
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
  }
}

function mouseMove(event) {
	var divObj = document.getElementById(this.getAttribute("largeDivId"));
	var imgObj = divObj.firstChild;
	var x = 0, y = 0, maxWidth = 0, maxHeight = 0, zoomFaktor = 0; 
	// check which side of the cursor has more space left
	if(event.pageX < (window.innerWidth / 2)) {
	  x = event.pageX + 10;
	  maxWidth = window.innerWidth - (event.pageX + 50);
	} else {
	  x = event.pageX - (5 + divObj.offsetWidth); // show large image left from cursor
	  maxWidth = event.pageX - 20;
	}
	// zoom image to max size, so it still fits in the window
  maxHeight = window.innerHeight - 20;
  zoomFaktor = Math.min(maxZoomFactor, maxHeight / imgObj.naturalHeight, maxWidth / imgObj.naturalWidth);
  imgObj.width = imgObj.naturalWidth * zoomFaktor;
  imgObj.height = imgObj.naturalHeight * zoomFaktor;
  // if the zoomed image still fits on the left side of the cursor, put it there
	if(event.pageX - (5 + divObj.offsetWidth) >= 0) {
	  x = event.pageX - (5 + divObj.offsetWidth); // show large image left from cursor
	}
	y = event.pageY - (divObj.offsetHeight / 2); // show large image centered beside the cursor
	// don't let it slide out the top or bottom of the window
	y = Math.min(y, window.pageYOffset + window.innerHeight - divObj.offsetHeight - 5);
	y = Math.max(y, window.pageYOffset + 5);

  divObj.className = "divPopup";
	divObj.style.left = x + "px";
	divObj.style.top = y + "px";
//	divObj.style.visibility = "visible";
}

var delayedPopupObj;
var delayedPopupTimeout;

function showDelayedPopup() {
  delayedPopupObj.style.visibility = "visible";
}

function mouseOver(event) {
  delayedPopupObj = document.getElementById(this.getAttribute("largeDivId"));
	delayedPopupTimeout = window.setTimeout(showDelayedPopup, popupDelayTime);
}

function mouseOut(event) {
	var divObj = document.getElementById(this.getAttribute("largeDivId"));
	window.clearTimeout(delayedPopupTimeout);
  divObj.style.visibility = "hidden";
}

function addImage(smallImgObj) {
	var smallSrc = smallImgObj.src;
	// do not re-add images that already have a 'largeDivId' attribute
	if(smallSrc[smallSrc.length - 6] == "-" && !smallImgObj.hasAttribute("largeDivId")) 
	{
	  // cut the '-m', '-w' or '-s' part out of the source name
	  var largeImgObj = document.createElement("img");
	  largeImgObj.src = smallSrc.substring(0, smallSrc.length - 6) + smallSrc.substring(smallSrc.length - 4, smallSrc.length);
	  largeImgObj.className = "m";

	  var largeDivObj = document.createElement("div");
	  largeDivObj.appendChild(largeImgObj);
	  largeDivObj.setAttribute("name", "largeDiv");
	  largeDivObj.id = "largeDiv:" + largeImgObj.src;
	  largeDivObj.className = "divPopup";
	  document.body.appendChild(largeDivObj);

	  smallImgObj.setAttribute("largeDivId", largeDivObj.id);
	  smallImgObj.addEventListener('mouseover',	mouseOver, true);
	  smallImgObj.addEventListener('mousemove',	mouseMove, true);
	  smallImgObj.addEventListener('mouseout', mouseOut, true);
	}
}

function addAllImages() {
  for (var i = 0; i < document.images.length; i++) {
    addImage(document.images[i]);
  }
}

function DOMAttrModified(event) {
  //console.log('DOMAttrModified: event: ' + event.target.id);
  if (event.target.id != '' && event.target.id.substring(0, 9) != "largeDiv:") { // don't reload on empty or self generated events
    addAllImages(); 
  }
}

function setupImageZoom() {
  addGlobalStyle('.divPopup {visibility: hidden; position: absolute; z-index: 100; padding: 3px; background-color: white;}');

  // check for new images after document has been changed by AJAX scripts
  document.addEventListener("DOMAttrModified", DOMAttrModified, false);

  // add a larger image for all images 
  addAllImages(); 
}







//window.addEventListener("load", init, true); // this is delayed by half a second or so
init(); // this works without any delay