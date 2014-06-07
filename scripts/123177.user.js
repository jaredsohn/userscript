// ==UserScript==
// @name           Score Phorum OVERHAUL
// @author         Noximo
// @namespace      score
// @description    Změna vzhledu Score Phora
// @version    	   1.1
// @run-at         document-end
// @updateURL      http://userscripts.org/scripts/source/123177.user.js
// @include        http://www.score.cz/phorum.php*
// @include        http://score.cz/phorum.php*
//
// ==/UserScript==

//
//25-03-2011 - 1.0 - Obarveni neprectenych a nenavstevovanych, presun/skryti nenavstevovanych
//26-03-2011 - 1.1 - Vice moznosti zobrazeni počtu neprectenych, hover barva odkazu
//24-05-2011 - 1.2 - Zobrazení počtu nepřečtených v titulku okna
//14-07-2011 - 1.3 - Zobrazení favicony
//11-01-2011 - 0.9 - Jedeme nanovo
//30-01-2012 - 1.0 - Release!
//04-02-2012 - 1.1 - Přidáno tlačítko pro skok k poslednímu příspěvku, upraveno CSS editování, bugy...
//

var countNewPosts = 0;
var favoritesTimeout = null;
var usersTimeout = null;
var debug = 0;
var splitCSS = 0;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Vytvoření nové sttruktury webu

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function postStruct(){
    text = "",
    link = "",
    linkDelete = ""
    icon = "",
    level = "",
    from = "",
    fromMe = "",
    to = "",
    toMe = "",
    date = "",
    newPost = false,
    root = false,
    hasNew = false;
    hasNext = false;
    hasPrev = false;
}
function isItMe(name){
    if( name.substr(0, 7).toLowerCase() == "<a href" || name.substr(0, 10).toLowerCase() == "<a onclick"){
        return true;
    }
    else return false;
}
function loadPosts(){
    if(debug) console.log("Načítám posty");
    var currentPost;
    var posts = getElementsByClass("prispevek", "td");

    var postText, postFrom, postTo, postTime, postIcon, postLevel, postNew, postLink, postRoot;

    var newPosts = new Array();
    var rootPost;
    for (i = 0; i < posts.length; i++) {
        post = new postStruct();
        currentPost = posts[i];

        post.text = currentPost.innerHTML;
        post.link = currentPost.previousElementSibling.firstElementChild.href;

        post.icon = currentPost.previousElementSibling.firstElementChild.firstElementChild.src;
        post.level = currentPost.previousElementSibling.firstElementChild.children[2].src;

        post.from = currentPost.parentNode.previousElementSibling.children[1].firstElementChild.firstElementChild.firstElementChild.firstElementChild.children[2].innerHTML;
        post.fromMe = isItMe(post.from);
        if (post.fromMe){
            post.from = currentPost.parentNode.previousElementSibling.children[1].firstElementChild.firstElementChild.firstElementChild.firstElementChild.children[2].firstElementChild.innerHTML;
        }

        linkDelete = currentPost.parentNode.previousElementSibling.children[1].firstElementChild.firstElementChild.firstElementChild.firstElementChild.children[2].nextElementSibling;
        if (linkDelete && linkDelete.innerHTML.toLowerCase() == "sma\u017e"){
            post.linkDelete = currentPost.parentNode.previousElementSibling.children[1].firstElementChild.firstElementChild.firstElementChild.firstElementChild.children[2].nextElementSibling.href;
        }


        post.to = currentPost.parentNode.previousElementSibling.children[1].firstElementChild.firstElementChild.firstElementChild.children[1].children[1].innerHTML;
        post.toMe = isItMe(post.to);
        if (post.toMe){
            post.to = currentPost.parentNode.previousElementSibling.children[1].firstElementChild.firstElementChild.firstElementChild.children[1].children[1].firstElementChild.innerHTML;
        }
        post.date = currentPost.parentNode.previousElementSibling.children[1].firstElementChild.firstElementChild.firstElementChild.children[2].innerHTML;

        post.root = (currentPost.previousElementSibling.width != "85");
        post.newPost = (currentPost.parentNode.previousElementSibling.firstElementChild.firstElementChild.nodeName.toLowerCase() == "img");


        if (post.newPost && !post.root && rootPost != null && !rootPost.hasNew){
            rootPost.hasNew = true;
        }
        if (post.root){
            if (rootPost != null){
                rootPost.hasNext = true;
                rootPost = post;
                rootPost.hasPrev = true;
            } else {
                rootPost = post;
            }
        }
        newPosts[newPosts.length] = post;
    }

    return newPosts;
}
function rebuildPosts(){
    if(debug) console.log("Start tvorby struktury");
    var posts = loadPosts();

    var rootDiv = document.createElement("div");
    rootDiv.id = "root";

    var containerDiv = document.createElement("div");
    containerDiv.id = "container";

    var roomPassword = document.evaluate("/html/body/table/tbody/tr/td[2]/table[3]/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[2]/td/form", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if ( roomPassword ){
        roomPassword.style.textAlign = "center";
        roomPassword.innerHTML = "<div>Místnost je zaheslovaná. Zadej heslo:</div>" + roomPassword.innerHTML;
        containerDiv.appendChild(roomPassword);
    } else {
        var messageField = document.getElementById("messageField");
        messageField.firstElementChild.name = "";

        var messageArea = document.getElementById("messageArea");
        var pitrisDiv = document.createElement("div");
        pitrisDiv.id = "pitrisDiv";

        var spacer = document.createElement("div");
        spacer.id = "spacer";

        var myMessage = document.createElement("div");
        myMessage.id = "message";

        var messageForm = document.createElement("form");

        var firstLine = document.createElement("div");
        var secondLine = document.createElement("div");
        var thirdLine = document.createElement("div");

        var submit = document.createElement("input");
        submit.type = "submit";
        submit.value = "Odeslat";

        messageArea.removeAttribute("rows");
        messageArea.removeAttribute("cols");
        messageArea.removeAttribute("style");

        messageForm.action = "phorum/add_message.php";
        messageForm.method = "POST";
        messageForm.name = "napis";
        messageForm.setAttribute("onSubmit", "processMessage();");

        var messageWarning = document.createElement("div");
        messageWarning.id = "messageWarning";
        messageWarning.innerHTML = "Znak\u016f: 0";

        var messageClose = document.createElement("div");
        messageClose.id = "messageClose";
        messageClose.innerHTML = "X";
        messageClose.setAttribute("onClick", "hideMessageField();");

        messageForm.appendChild(document.getElementsByName("id")[0]);
        messageForm.appendChild(document.getElementsByName("msgHash")[0]);
        messageForm.appendChild(document.getElementsByName("room")[0]);
        messageForm.appendChild(document.getElementsByName("pre")[0]);
        messageForm.appendChild(document.getElementsByName("what")[0]);

        firstLine.appendChild(document.getElementsByName("reader")[0]);
        firstLine.appendChild(document.getElementsByName("private")[0]);
        firstLine.appendChild(messageWarning);
        firstLine.appendChild(messageClose);

        secondLine.appendChild(messageArea);

        thirdLine.appendChild(pitrisDiv);
        thirdLine.appendChild(submit);

        messageForm.appendChild(firstLine);
        messageForm.appendChild(secondLine);
        messageForm.appendChild(thirdLine);

        myMessage.appendChild(messageForm);

        spacer.appendChild(myMessage);
        containerDiv.appendChild(spacer);
    }


    var newCounter = 0, rootCounter = 0, lastCounter = 0;
    var postList, identity, iconPicture, levelPicture, infoLine, infoLineFrom, infoLineTo, infoLineDate, postText, newButton, prevButton, nextButton, showButton, infoLineNew, infoLineNext, infoLinePrev;


    for (i = 0; i < posts.length; i++) {
        var post = posts[i];
        var hide = false;
        function isOk(element, index, array){
            return post.from.toLowerCase() != element.toLowerCase();
        }

        var blockedUsers = getBlockedUsers();
        if ( !blockedUsers.every(isOk) || detectSpam(post) ){
            hide = true;
        }

        postList = document.createElement("div");
        postList.className = "post";
        postList.id = "post"+i;
        if (!post.root){
            postList.className += " reply";
        }
        if (hide){
            postList.className += " hide_post";
        }
        {
            identity = document.createElement("div");
            identity.className = "identity";
            {
                iconPicture = document.createElement("img");
                iconPicture.className = "icon_picture";
                iconPicture.src = post.icon;
                post.link = "user('" + post.from + post.link.substr(post.link.indexOf("',"));
                iconPicture.setAttribute("onClick", "my"+post.link + "; showMessageField();");
                iconPicture.setAttribute("alt", post.from);

                levelPicture = document.createElement("img");
                levelPicture.className = "level_picture";
                levelPicture.src = post.level;
                levelPicture.setAttribute("alt", "Na kredyti se nehraje!");

                identity.appendChild(iconPicture);
                identity.appendChild(levelPicture);

                if (post.root && post.hasNew){
                    newButton = document.createElement("div");
                    newButton.className = "new_button info_line";
                    newButton.setAttribute("onClick", 'window.location.hash = "#newPost'+ newCounter +'";document.getElementById("newPost'+ newCounter +'").scrollIntoView(); window.scrollBy(0, -30); return false;');
                    newButton.innerHTML = "V";
                    identity.appendChild(newButton)
                } else if (post.root && posts[i+1] && !posts[i+1].root ){
                    newButton = document.createElement("div");
                    newButton.className = "last_button info_line";
                    newButton.setAttribute("onClick", 'window.location.hash = "#lastPost'+ lastCounter +'";document.getElementById("lastPost'+ lastCounter +'").scrollIntoView(); window.scrollBy(0, -30); return false;');
                    newButton.innerHTML = "V";
                    identity.appendChild(newButton);
                }
            }

            if (hide){
                showButton = document.createElement("div");
                showButton.className = "show_button info_line";
                showButton.innerHTML = "Zobraz";
                showButton.setAttribute("onClick", "this.parentNode.className = this.parentNode.className.substring(0, this.parentNode.className.indexOf('hide_post'));");


                postList.appendChild(showButton);
            }

            infoLine = document.createElement("div");
            infoLine.className = "info_line";
            {

                infoLineFrom = document.createElement("div");
                infoLineFrom.className = "info_line_from";
                infoLineFrom.innerHTML = "od: <strong>" + post.from + "</strong>";
                if (post.fromMe){
                    infoLineFrom.innerHTML = 'od: <strong class="me_post">' + post.from + '</strong>';
                }

                if ( !post.linkDelete == "" ){
                    infoLineFrom.innerHTML += '- <a class="info_line_delete" href="'+post.linkDelete+'">smazat</a>';
                }
                infoLine.appendChild(infoLineFrom);



                infoLineTo = document.createElement("div");
                infoLineTo.className = "info_line_to";
                infoLineTo.innerHTML = "pro: <strong>" + post.to + "</strong>";
                if (post.toMe){
                    infoLineTo.innerHTML = 'pro: <strong class="me_post">' + post.to + '</strong>';
                }
                infoLine.appendChild(infoLineTo);

                infoLineDate = document.createElement("div");
                infoLineDate.className = "info_line_date";

                dateValue = document.createElement("span");
                dateValue.className = "info_line_date_value"
                dateValue.innerHTML = post.date;
                infoLineDate.appendChild(dateValue);


                if (post.root && post.hasNext){
                    nextButton = document.createElement("small");
                    nextButton.className = "next_button";
                    nextButton.setAttribute("onClick", 'window.location.hash = "#rootPost'+ (rootCounter + 1) +'";document.getElementById("rootPost'+ (rootCounter + 1) +'").scrollIntoView(); window.scrollBy(0, -30); return false;');
                    nextButton.innerHTML = ">>>";
                    infoLineDate.appendChild(nextButton);
                }

                if (!post.root){
                    var rootButton = document.createElement("small");
                    rootButton.className = "root_button";
                    rootButton.setAttribute("onClick", 'window.location.hash = "#rootPost'+ (rootCounter - 1) +'";  document.getElementById("rootPost'+ (rootCounter - 1) +'").scrollIntoView(); window.scrollBy(0, -30); return false;');
                    rootButton.innerHTML = "^^^";
                    infoLineDate.appendChild(rootButton);
                }

                if (post.root && post.hasPrev){
                    prevButton = document.createElement("small");
                    prevButton.className = "prev_button";
                    prevButton.setAttribute("onClick", 'window.location.hash = "#rootPost' + (rootCounter - 1) +'"; document.getElementById("rootPost'+ (rootCounter - 1) +'").scrollIntoView(); window.scrollBy(0, -30); return false;');
                    prevButton.innerHTML="<<<";
                    infoLineDate.appendChild(prevButton);
                }
                infoLine.appendChild(infoLineDate);


                if (posts[i+1] && posts[i+1].root ){
                    infoLine.id = "lastPost" + lastCounter;
                    lastCounter++;
                }

                if (post.newPost){
                    infoLine.className += " new_post";
                    infoLine.id = "newPost" + newCounter;
                    newCounter++;
                }
                if (post.root){
                    infoLine.id = "rootPost" + rootCounter;
                    rootCounter++;
                }
            }

            postText = document.createElement("div");
            postText.className = "post_text"; //Zpětná kompatibilita
            postText.innerHTML = post.text;

            var pictures = postText.getElementsByTagName("img");
            if (pictures.length > 0)
            {
                for (p = 0; p < pictures.length; p++)
                {
                    pictures[p].setAttribute("onClick", "changePicture(this);");
                }
            }
        }

        postList.appendChild(identity);
        postList.appendChild(infoLine);
        postList.appendChild(postText);

        containerDiv.appendChild(postList);
    }

    var pagination = document.createElement("div");
    var phmenu = getElementsByClass("phmenu", "td");

    for (i = 0; i < phmenu.length; i++) {
        if (phmenu[i].innerHTML.indexOf("moje zpr") == -1){
            pagination.innerHTML = phmenu[i].innerHTML;
            pagination.innerHTML = pagination.innerHTML.substr(1, pagination.innerHTML.length-2);
            pagination.className = "pagination";

            containerDiv.appendChild(pagination);
        }
    }


    var roomTable = document.evaluate("/html/body/table/tbody/tr/td[2]/table[3]/tbody/tr/td[2]/table/tbody/tr/td", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.lastElementChild.firstElementChild.lastElementChild.firstElementChild.firstElementChild;
    if (roomTable){
        roomTable.setAttribute("style", "width:100%; margin-top:20px; font-size:10px;");
        containerDiv.appendChild(roomTable);
    }

    document.body.children[1].style.display = "none";
    rootDiv.appendChild(containerDiv);
    document.body.appendChild(rootDiv);
    if(debug) console.log("Struktura hotova");
}
function detectSpam(post){
    if (post.icon.substr(-11) == "default.gif" && post.to == "all" && ((post.text.indexOf("http://", post.text.indexOf("http://")+1) > -1) || (post.text.indexOf("href", post.text.indexOf("href")+1) > -1) || (post.text.indexOf("diet") > -1 || post.text.indexOf("pill") > -1 || post.text.indexOf("penis") > -1 || post.text.indexOf("visit") > -1 || post.text.indexOf("buy") > -1 || post.text.indexOf("virus") > -1 ||post.text.indexOf("watch") > -1))){
        return true;
    }else{
        return false;
    }
}
function loadRooms(){
    if (debug)console.log("Načtení všech místností");
    var roomList = document.createElement("div");
    roomList.id = "roomList";

    var roomTable;
    if (document.getElementById("appendedRooms")){
        roomTable = document.evaluate('//*[@id="appendedRooms"]/table/tbody/tr/td[2]/table[3]/tbody/tr/td[2]/table/tbody/tr/td/table/tbody', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.children;
    } else {
        roomTable = document.evaluate("/html/body/table/tbody/tr/td[2]/table[3]/tbody/tr/td[2]/table/tbody/tr/td/table/tbody", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.children;
    }

    if (roomTable[0].firstElementChild.nodeName.toLowerCase() == "form" ){
        roomList.appendChild(roomTable[0]);
    }

    var hidden = false, countHidden = 0;
    var roomDiv, roomName, roomInfo, roomHidden = document.createElement("div");
    for (i = 2; i < roomTable.length; i++) {
        hidden = false;
        roomDiv = document.createElement("div");
        roomDiv.className = "room";


        if (i == 2 || i == roomTable.length-1 ){
            roomDiv.appendChild(document.createElement("hr"));
        } else {
            if (roomTable[i].firstElementChild.children[1].firstElementChild && roomTable[i].firstElementChild.children[1].firstElementChild.nodeName.toLowerCase() == "a"){
                roomName = roomTable[i].firstElementChild.children[1].firstElementChild;
                roomName.className = "room_name";

                roomInfo = document.createElement("div");
                roomInfo.className = "room_info";

                if (roomTable[i].children[1].childNodes[0].nodeName.toLowerCase() == "b" && roomTable[i].children[1].childNodes[0].innerHTML.indexOf('/') == -1){ //Nenavštěvované místnosti
                    roomInfo.innerHTML = roomTable[i].children[1].childNodes[0].textContent;
                    //roomInfo.innerHTML += roomTable[i].children[1].childNodes[1].textContent;

                    roomDiv.className += " hidden_room";
                    hidden = true;
                    countHidden++;
                } else { //Navštěvované
                    if (roomTable[i].children[1].childNodes[0].nodeName.toLowerCase() == "b")
                        roomInfo.innerHTML = roomTable[i].children[1].childNodes[0].textContent;
                    else
                        roomInfo.innerHTML = roomTable[i].children[1].childNodes[0].textContent.substring(0, roomTable[i].children[1].childNodes[0].textContent.indexOf("|"));
                }

                if (roomInfo.innerHTML.indexOf('/') > -1 && roomInfo.innerHTML.substring(0, roomInfo.innerHTML.indexOf('/')) != "0")
                {
                    roomName.innerHTML = "(" +  roomInfo.innerHTML.substring(0, roomInfo.innerHTML.indexOf('/')) + ") " + roomName.innerHTML;
                    roomDiv.className += " new_posts";
                    countNewPosts++;
                }

                roomDiv.appendChild(roomName);
                roomDiv.appendChild(roomInfo);
            } else {
                if (roomTable[i].firstElementChild.lastElementChild.nodeName.toLowerCase() == "hr")
                    roomDiv.appendChild(document.createElement("hr"));
            }
        }

        roomList.appendChild(roomDiv);
        if (hidden){
            var roomClone = roomDiv.cloneNode(true);
            roomClone.className = "room";
            roomHidden.appendChild(roomClone);
        }
    }
    if (roomHidden.childNodes.length > 0){
        roomHidden.style.display = "none";
        var showLink = document.createElement("div");
        showLink.innerHTML = "Zobrazit skryté místnosti (" + countHidden + ")";
        showLink.setAttribute("onClick", "this.nextElementSibling.style.display=''");
        showLink.setAttribute("style", "cursor:pointer; text-align: right;");

        roomList.appendChild(showLink);
        roomList.appendChild(roomHidden);
    }

    return roomList;
}
function roomHighlight(){
    //Je na hlavni strance
    var rootDiv = document.createElement("div");
    rootDiv.id = "root";

    var container = document.createElement("div");
    container.id = "container";

    var roomList = loadRooms(document);

    container.appendChild(roomList);

    document.title = "(" + countNewPosts + ") " + document.title;


    rootDiv.appendChild(container);
    document.body.appendChild(rootDiv);
}
function createMessageArea(){
    var originalField = document.getElementById("messageField");

    var form = document.getElementsByName("napis")[0];
    return form;
}
function parseRooms(action){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.timeout = 2000;

    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            var doc = document.getElementById("appendedRooms");
            if (!doc){
                doc = document.createElement("div");

                doc.id = "appendedRooms";
                doc.style.display = "none";

                document.body.appendChild(doc);
            }
            if (xmlhttp.responseText.indexOf('<form action="pripoj.php"') > -1){
                window.location = "http://score.cz/pripoj.php?from=expire&to=" + window.location;
                document.getElementById("roomListQuick").children[1].innerHTML = '<form style="text-align:center;" action="pripoj.php" method="post" name="login">jméno: <input type="Text" name="uzivatel" size="10" maxlength="15"> heslo: <input type="Password" name="heslo" size="10" maxlength="10"><br /><input type="Submit" value="vstoupit"><input type="Hidden" name="from" value="expire"> <input type="Hidden" name="to" value="'+window.location+'"></form>'
            } else {
                doc.innerHTML = xmlhttp.responseText.substr(xmlhttp.responseText.indexOf("<table"));

                if (action == "processFavorite"){
                    processFavorite();
                }
            }
        }

    }
    xmlhttp.open("GET","phorum.php?id=" + decodeURI(readCookie('uid')),true);
    xmlhttp.overrideMimeType("text/html; charset=windows-1250");
    xmlhttp.send();


}
function loadFavorites(){

    favoritesTimeout = clearInterval(favoritesTimeout);
    favoritesTimeout = setInterval(function(){
        loadFavorites();
        return true;
    }, 60000);

    var roomListQuick = document.getElementById("roomListQuick");
    if (!roomListQuick){
        roomListQuick = document.createElement("div");
        roomListQuick.id = "roomListQuick";
        document.getElementById("root").appendChild(roomListQuick);

        var reload = document.createElement("a");
        reload.setAttribute("onClick","loadFavorites();");
        reload.style.cursor="pointer";
        reload.innerHTML = "Obnovit";
        reload.style.cssFloat = "left";

        var link = document.createElement("a");
        link.href="/phorum.php?id=" + decodeURI(readCookie('uid'));
        link.innerHTML = "Hlavní stránka";
        link.style.cssFloat = "right";

        var helpDiv = document.createElement("div");
        helpDiv.style.height = "20px";
        helpDiv.id = "helpDiv";
        helpDiv.appendChild(reload);
        helpDiv.appendChild(link);

        roomListQuick.appendChild(helpDiv);
        roomListQuick.appendChild(document.createElement("div"));
    }
    roomListQuick.children[0].children[0].innerHTML = 'Na\u010dítám místnosti...';
    parseRooms("processFavorite");
}
function processFavorite()
{
    if (debug) console.log("Načtení oblíbených místností");
    var roomList = loadRooms();

    var roomId = getUrlParameter("kr");
    var roomName = document.getElementById("roomName");
    for (i = 0; i < roomList.children.length; i++) {
        if (roomList.children[i].className.indexOf("new_posts") > -1
            && roomList.children[i].firstChild.href.indexOf("kr="+roomId) > -1
            && roomList.children[i].firstChild.href.length == roomList.children[i].firstChild.href.indexOf("kr="+roomId) + ("kr="+roomId).length){
            var newPosts = roomList.children[i].firstChild.innerHTML.substr(1, roomList.children[i].firstChild.innerHTML.indexOf(")")-1);
            var postCount = roomName.firstElementChild;
            stripToIndex = (postCount.innerHTML.indexOf(" + ") == -1)?postCount.innerHTML.length:postCount.innerHTML.indexOf(" + ");
            postCount.innerHTML = postCount.innerHTML.substring( 0, stripToIndex ) + " + " + newPosts;
            postCount.className = "red_color";

            var properLink;
            if(window.location.toString().indexOf("#") > -1){
                properLink = window.location.toString().substr(0, window.location.toString().indexOf("#"));
            } else {
                properLink = window.location.toString();
            }

            roomName.setAttribute('onClick', 'window.location.href = "'+ properLink + '#newPost0"; window.location.reload(true);');
            roomName.removeAttribute('href');

            break;
        }
    }

    var reset = document.createElement("a");
    reset.href = "/phorum/reset.php?id=" + decodeURI(readCookie('uid')) + "&r=" + roomId;
    reset.innerHTML = "Skrýt místnost";

    document.getElementById("roomListQuick").children[1].innerHTML = roomList.innerHTML;
    document.getElementById("roomListQuick").children[1].lastElementChild.appendChild(document.createElement("br"));
    document.getElementById("roomListQuick").children[1].lastElementChild.appendChild(reset);

    document.getElementById("logoLink").lastElementChild.innerHTML = countNewPosts;
    document.getElementById("logoLink").lastElementChild.style.display = "inline";
    document.title = "(" + countNewPosts + ") SCORE PHORUM - " + roomName.textContent;
    countNewPosts = 0;

    var roomListQuick = document.getElementById("roomListQuick");
    roomListQuick.children[0].children[0].innerHTML = 'Obnovit';
}
function loadUsers(){
    usersTimeout = clearInterval(usersTimeout);
    usersTimeout = setInterval(function(){
        loadUsers();
        return true;
    }, 300000);

    var userListQuick = document.getElementById("userListQuick");
    if (!userListQuick){
        userListQuick = document.createElement("div");
        userListQuick.id = "userListQuick";
        document.getElementById("root").appendChild(userListQuick);
    }
    userListQuick.innerHTML = '<div style="text-align:center">Na\u010dítám uživatele...</div>' + userListQuick.innerHTML;

    parseUsers();
}
function processUsers(){
    var userTable = document.evaluate('//*[@id="appendedUsers"]/table/tbody/tr/td[2]/table[3]/tbody/tr/td[2]/table/tbody/tr/td/center/table/tbody/tr[5]/td/table', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var userListQuick = document.getElementById("userListQuick");
    userListQuick.innerHTML = "";
    userListQuick.appendChild(userTable.firstChild);

    var td = userListQuick.getElementsByTagName("td");
    for (i = 0; i < td.length; i++) {
        td[i].removeAttribute('width');
        td[i].removeAttribute('align');
        td[i].setAttribute('style', "padding: 0 5px;");

    }
    for (i = 0; i <  userListQuick.firstChild.children.length; i = i+2) {
        userListQuick.firstChild.children[i].style.backgroundColor = "#B1C6C2";
    }
    count = userListQuick.firstChild.children.length;
    var date = new Date();

    var users = document.getElementById("usersLink");
    if (date.getHours()> 2 && date.getHours() < 6){
        users.textContent = "Nespavci";
    } else {
        users.textContent = "U\u017eivatelé";
    }

    if (count == 0){
        users.textContent = "Jsi tu sám";
    } else if (count > 40){
        users.textContent = "N\u011bjak t\u011bsno";
    }

    users.textContent += "(" + count + ")";
}
function parseUsers(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.timeout = 4000;
    xmlhttp.onreadystatechange=function()
    {
        if ((xmlhttp.readyState==4) && xmlhttp.status==200)
        {
            var doc = document.getElementById("appendedUsers");
            if (!doc){
                doc = document.createElement("div");

                doc.id = "appendedUsers";
                doc.style.display = "none";

                document.body.appendChild(doc);
            }

            doc.innerHTML = xmlhttp.responseText.substr(xmlhttp.responseText.indexOf("<table"));

            processUsers();
        }
    }
    xmlhttp.open("GET","phorum.php?id=" + decodeURI(readCookie('uid')) + "&w=5",true);
    xmlhttp.overrideMimeType("text/html; charset=windows-1250");
    xmlhttp.send();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//Lišta a nastavení
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function customInput(func, name){
    var input, custom, helpDiv;

    input = document.createElement("input");
    input.type = "text";
    input.value = window.localStorage.getItem(name);

    custom = document.createElement("input");
    custom.setAttribute('onClick', func + '(this.previousElementSibling.value)');
    custom.setAttribute('type',"submit");
    custom.value = 'Zadat';

    helpDiv = document.createElement("div");
    helpDiv.className = "custom_input";
    helpDiv.appendChild(input);
    helpDiv.appendChild(custom);

    return helpDiv;
}
function settings(){
    var settingMenu = document.createElement("div");
    settingMenu.id = "settingMenu";
    settingMenu.style.backgroundImage= 'url('+fryBackground+')';

    var barStyleMenu, barStyleMenuHeader, barStyleWhite, barStyleBlack, barStyleClassic, barStyleTransparent;
    {
        barStyleMenu = document.createElement('div');
        barStyleMenu.setAttribute("class", "submenu");

        barStyleMenuHeader = document.createElement('h2');
        barStyleMenuHeader.setAttribute("class", "submenu");
        barStyleMenuHeader.innerHTML = "Styl li\u0161ty";

        barStyleWhite = document.createElement("div");
        barStyleWhite.setAttribute('onClick', 'setBarStyle("white")');
        barStyleWhite.setAttribute('class',"option_square");
        barStyleWhite.setAttribute('style', 'background-color: white;');
        barStyleWhite.innerHTML = "White";

        barStyleBlack = document.createElement("div");
        barStyleBlack.setAttribute('onClick', 'setBarStyle("black")');
        barStyleBlack.setAttribute('class',"option_square");
        barStyleBlack.setAttribute('style', 'color: white; background-color: black;');
        barStyleBlack.innerHTML = "Black";

        barStyleClassic = document.createElement("div");
        barStyleClassic.setAttribute('onClick', 'setBarStyle("classic")');
        barStyleClassic.setAttribute('class',"option_square");
        barStyleClassic.setAttribute('style', 'background-color: #C8C4A0;');
        barStyleClassic.innerHTML = "Classic";

        barStyleTransparent = document.createElement("div");
        barStyleTransparent.setAttribute('onClick', 'setBarStyle("transparent")');
        barStyleTransparent.setAttribute('class',"option_square");
        barStyleTransparent.setAttribute('style', 'background-color: #98ACA8; background-image: url('+gridBackground+')');
        barStyleTransparent.innerHTML = "Glass";

        barStyleMenu.appendChild(barStyleWhite);
        barStyleMenu.appendChild(barStyleBlack);
        barStyleMenu.appendChild(barStyleClassic);
        barStyleMenu.appendChild(barStyleTransparent);
    }

    var textSizeMenuHeader, textSizeMenu, textSizeSmall, textSizeMedium, textSizeLarge, textSizePlus, textSizeMinus;
    {
        textSizeMenu = document.createElement('div');
        textSizeMenu.setAttribute("class", "submenu");

        textSizeMenuHeader = document.createElement('h2');
        textSizeMenuHeader.setAttribute("class", "submenu");
        textSizeMenuHeader.innerHTML = "Velikost textu";

        textSizeSmall = document.createElement("span");
        textSizeSmall.setAttribute('onClick', 'setTextSize(11)');
        textSizeSmall.setAttribute('class',"option_square");
        textSizeSmall.setAttribute('style', 'font-size: 10pt;');
        textSizeSmall.innerHTML = 'a';

        textSizeMedium = document.createElement("span");
        textSizeMedium.setAttribute('onClick', 'setTextSize(14)');
        textSizeMedium.setAttribute('class',"option_square");
        textSizeMedium.setAttribute('style', 'font-size: 13pt;');
        textSizeMedium.innerHTML = 'a';

        textSizeLarge = document.createElement("span");
        textSizeLarge.setAttribute('onClick', 'setTextSize(16)');
        textSizeLarge.setAttribute('class',"option_square");
        textSizeLarge.setAttribute('style', 'font-size: 17pt;')
        textSizeLarge.innerHTML = 'a';

        textSizeMinus = document.createElement("span");
        textSizeMinus.setAttribute('onClick', 'setTextSize("-")');
        textSizeMinus.setAttribute('class',"option_square");
        textSizeMinus.setAttribute('style', 'display: inline-block;font-size: 10px;height: 10px;left: -17px;line-height: 10px;position: relative;text-align: center;top: 14px; width: 10px');
        textSizeMinus.innerHTML = '-';

        textSizePlus = document.createElement("span");
        textSizePlus.setAttribute('onClick', 'setTextSize("+")');
        textSizePlus.setAttribute('class',"option_square");
        textSizePlus.setAttribute('style', 'display: inline-block;font-size: 10px;height: 10px;line-height: 10px;width: 10px;')
        textSizePlus.innerHTML = '+';

        textSizeMenu.appendChild(textSizeSmall);
        textSizeMenu.appendChild(textSizeMedium);
        textSizeMenu.appendChild(textSizeLarge);
        textSizeMenu.appendChild(textSizePlus);
        textSizeMenu.appendChild(textSizeMinus);
        textSizeMenu.appendChild(customInput("setTextSize", "score_phorum_text_size"));




    }
    var textFontMenuHeader, textFontMenu, textFontVerdana, textFontTahoma, textFontTimes, textFontHelvetica, textFontMonospace;
    {
        textFontMenu = document.createElement('div');
        textFontMenu.setAttribute("class", "submenu");

        textFontMenuHeader = document.createElement('h2');
        textFontMenuHeader.setAttribute("class", "submenu");
        textFontMenuHeader.innerHTML = "Font textu";

        textFontVerdana = document.createElement("span");
        textFontVerdana.setAttribute('onClick', 'setTextFont("Verdana")');
        textFontVerdana.setAttribute('class',"option_square");
        textFontVerdana.setAttribute('style', 'font-family: Verdana;');
        textFontVerdana.innerHTML = 'Verdana';

        textFontTahoma = document.createElement("span");
        textFontTahoma.setAttribute('onClick', 'setTextFont("Tahoma")');
        textFontTahoma.setAttribute('class',"option_square");
        textFontTahoma.setAttribute('style', 'font-family: Tahoma;');
        textFontTahoma.innerHTML = 'Tahoma';

        textFontTimes = document.createElement("span");
        textFontTimes.setAttribute('onClick', 'setTextFont("Times New Roman")');
        textFontTimes.setAttribute('class',"option_square");
        textFontTimes.setAttribute('style', 'font-family: Times New Roman;')
        textFontTimes.innerHTML = 'Times';

        textFontHelvetica = document.createElement("span");
        textFontHelvetica.setAttribute('onClick', 'setTextFont("Helvetica")');
        textFontHelvetica.setAttribute('class',"option_square");
        textFontHelvetica.setAttribute('style', 'font-family: Helvetica ;')
        textFontHelvetica.innerHTML = 'Helvetica';

        textFontMonospace = document.createElement("span");
        textFontMonospace.setAttribute('onClick', 'setTextFont("Monospace")');
        textFontMonospace.setAttribute('class',"option_square");
        textFontMonospace.setAttribute('style', 'font-family: Monospace;')
        textFontMonospace.innerHTML = 'Monospace';

        textFontMenu.appendChild(textFontVerdana);
        textFontMenu.appendChild(textFontTahoma);
        textFontMenu.appendChild(textFontTimes);
        textFontMenu.appendChild(textFontHelvetica);
        textFontMenu.appendChild(textFontMonospace);

        textFontMenu.appendChild(customInput("setTextFont", "score_phorum_text_font"));

    }

    var textColorMenu, textColorMenuHeader, textBlack, textStandard, textWhite, textChoose;
    {
        textColorMenu = document.createElement("div");
        textColorMenu.setAttribute("class", "submenu");

        textColorMenuHeader = document.createElement('h2');
        textColorMenuHeader.setAttribute("class", "submenu");
        textColorMenuHeader.innerHTML = "Barva textu";

        textBlack = document.createElement("div");
        textBlack.setAttribute('onClick', 'setTextColor("black")');
        textBlack.setAttribute('class',"option_square");
        textBlack.setAttribute('style', 'color: white; background-color: black');
        textBlack.innerHTML = "\u010cerná";

        textWhite = document.createElement("div");
        textWhite.setAttribute('onClick', 'setTextColor("white")');
        textWhite.setAttribute('class',"option_square");
        textWhite.setAttribute('style', 'color: black; background-color: White');
        textWhite.innerHTML = "Bílá";

        textStandard = document.createElement("div");
        textStandard.setAttribute('onClick', 'setTextColor("#333333")');
        textStandard.setAttribute('class',"option_square");
        textStandard.setAttribute('style', 'color: white; background-color: black');
        textStandard.innerHTML = 'B\u011b\u017ená';

        textColorMenu.appendChild(textBlack);
        textColorMenu.appendChild(textStandard);
        textColorMenu.appendChild(textWhite);

        textColorMenu.appendChild(customInput("setTextColor", "score_phorum_text_color"));
    }

    var backgroundColorMenu, backgroundColorMenuHeader, backgroundBlack, backgroundStandard, backgroundWhite, backgroundGray, backgroundLightBlue;
    {
        backgroundColorMenu = document.createElement("div");
        backgroundColorMenu.setAttribute("class", "submenu");

        backgroundColorMenuHeader = document.createElement('h2');
        backgroundColorMenuHeader.setAttribute("class", "submenu");
        backgroundColorMenuHeader.innerHTML = "Barva pozadí";

        backgroundBlack = document.createElement("div");
        backgroundBlack.setAttribute('onClick', 'setBackgroundColor("black")');
        backgroundBlack.setAttribute('class',"option_square");
        backgroundBlack.setAttribute('style', 'color: white; background-color: black');
        backgroundBlack.innerHTML = "\u010cerná";

        backgroundWhite = document.createElement("div");
        backgroundWhite.setAttribute('onClick', 'setBackgroundColor("white")');
        backgroundWhite.setAttribute('class',"option_square");
        backgroundWhite.setAttribute('style', 'color: black; background-color: White');
        backgroundWhite.innerHTML = "Bílá";

        backgroundStandard = document.createElement("div");
        backgroundStandard.setAttribute('onClick', 'setBackgroundColor("#98ACA8")');
        backgroundStandard.setAttribute('class',"option_square");
        backgroundStandard.setAttribute('style', 'color: white; background-color: #98ACA8');
        backgroundStandard.innerHTML = 'B\u011b\u017ená';

        backgroundGray = document.createElement("div");
        backgroundGray.setAttribute('onClick', 'setBackgroundColor("gray")');
        backgroundGray.setAttribute('class',"option_square");
        backgroundGray.setAttribute('style', 'color: black; background-color: gray');
        backgroundGray.innerHTML = '\u0160edá';

        backgroundLightBlue = document.createElement("div");
        backgroundLightBlue.setAttribute('onClick', 'setBackgroundColor("lightBlue")');
        backgroundLightBlue.setAttribute('class',"option_square");
        backgroundLightBlue.setAttribute('style', 'color: black; background-color: LightBlue');
        backgroundLightBlue.innerHTML = 'Modrá';

        backgroundColorMenu.appendChild(backgroundBlack);
        backgroundColorMenu.appendChild(backgroundStandard);
        backgroundColorMenu.appendChild(backgroundWhite);
        backgroundColorMenu.appendChild(backgroundGray);
        backgroundColorMenu.appendChild(backgroundLightBlue);

        backgroundColorMenu.appendChild(customInput("setBackgroundColor", "score_phorum_background_color"));
    }


    var gridMenu, gridMenuHeader, gridYes, gridNo;
    {
        gridMenu = document.createElement("div");
        gridMenu.setAttribute("class", "submenu");

        gridMenuHeader = document.createElement("h2");
        gridMenuHeader.setAttribute("class", "submenu");
        gridMenuHeader.innerHTML = "M\u0159í\u017eka"


        gridYes = document.createElement("div");
        gridYes.setAttribute('onClick', 'setGrid(1)');
        gridYes.setAttribute('class',"option_square");
        gridYes.setAttribute('style', 'background-color: #98ACA8; background-image: url('+gridBackground+')');
        gridYes.innerHTML = "Ano";

        gridNo = document.createElement("div");
        gridNo.setAttribute('onClick', 'setGrid(0)');
        gridNo.setAttribute('class',"option_square");
        gridNo.setAttribute('style', 'background-color: #98ACA8');
        gridNo.innerHTML = "Ne";

        gridMenu.appendChild(gridYes);
        gridMenu.appendChild(gridNo);
    }

    var roundedMenu, roundedMenuHeader, roundedYes, roundedNo;
    {
        roundedMenu = document.createElement("div");
        roundedMenu.setAttribute("class", "submenu");

        roundedMenuHeader = document.createElement("h2");
        roundedMenuHeader.setAttribute("class", "submenu");
        roundedMenuHeader.innerHTML = "Zakulacení"


        roundedYes = document.createElement("div");
        roundedYes.setAttribute('onClick', 'setRounded("yes")');
        roundedYes.setAttribute('class',"option_square");
        roundedYes.setAttribute('style', 'background-color: #98ACA8; border-radius: 5px;');
        roundedYes.innerHTML = "Ano";

        roundedNo = document.createElement("div");
        roundedNo.setAttribute('onClick', 'setRounded("none")');
        roundedNo.setAttribute('class',"option_square");
        roundedNo.setAttribute('style', 'background-color: #98ACA8');
        roundedNo.innerHTML = "Ne";

        roundedMenu.appendChild(roundedYes);
        roundedMenu.appendChild(roundedNo);
    }

    var barPositionMenu, barPositionMenuHeader, barPositionTop, barPositionBottom;
    {
        barPositionMenu = document.createElement("div");
        barPositionMenu.setAttribute("class", "submenu");

        barPositionMenuHeader = document.createElement("h2");
        barPositionMenuHeader.setAttribute("class", "submenu");
        barPositionMenuHeader.innerHTML = "Pozice li\u0161ty"


        barPositionTop = document.createElement("div");
        barPositionTop.setAttribute('onClick', 'setBarPosition("top")');
        barPositionTop.setAttribute('class',"option_square");
        barPositionTop.setAttribute('style', 'border-top: 4px solid blue');
        barPositionTop.innerHTML = "Naho\u0159e";

        barPositionBottom = document.createElement("div");
        barPositionBottom.setAttribute('onClick', 'setBarPosition("bottom")');
        barPositionBottom.setAttribute('class',"option_square");
        barPositionBottom.setAttribute('style', 'border-bottom: 4px solid blue');
        barPositionBottom.innerHTML = "Dole";

        barPositionMenu.appendChild(barPositionTop);
        barPositionMenu.appendChild(barPositionBottom);
    }

    var pageWidthMenu, pageWidthMenuHeader, pageWidth100, pageWidth75, pageWidth50,  pageWidthPlus, pageWidthMinus;
    {
        pageWidthMenu = document.createElement("div");
        pageWidthMenu.setAttribute("class", "submenu");

        pageWidthMenuHeader = document.createElement("h2");
        pageWidthMenuHeader.setAttribute("class", "submenu");
        pageWidthMenuHeader.innerHTML = "\u0160í\u0159ka stránky"

        pageWidth100 = document.createElement("div");
        pageWidth100.setAttribute('onClick', 'setPageWidth("100%")');
        pageWidth100.setAttribute('class',"option_square");

        pageWidth100.innerHTML = "100%";

        pageWidth75 = document.createElement("div");
        pageWidth75.setAttribute('onClick', 'setPageWidth("75%")');
        pageWidth75.setAttribute('class',"option_square");
        pageWidth75.setAttribute('style', 'width: 30px; border-left: 10px solid blue; border-right: 10px solid blue');
        pageWidth75.innerHTML = "75%";

        pageWidth50 = document.createElement("div");
        pageWidth50.setAttribute('onClick', 'setPageWidth("50%")');
        pageWidth50.setAttribute('class',"option_square");
        pageWidth50.setAttribute('style', 'width: 15px; border-left: 17px solid blue; border-right: 17px solid blue');
        pageWidth50.innerHTML = "50%";

        pageWidthMinus = document.createElement("span");
        pageWidthMinus.setAttribute('onClick', 'setPageWidth("-")');
        pageWidthMinus.setAttribute('class',"option_square");
        pageWidthMinus.setAttribute('style', 'display: inline-block;font-size: 10px;height: 10px;left: -17px;line-height: 10px;position: relative;text-align: center;top: 14px; width: 10px');
        pageWidthMinus.innerHTML = '-';

        pageWidthPlus = document.createElement("span");
        pageWidthPlus.setAttribute('onClick', 'setPageWidth("+")');
        pageWidthPlus.setAttribute('class',"option_square");
        pageWidthPlus.setAttribute('style', 'display: inline-block;font-size: 10px;height: 10px;line-height: 10px;width: 10px;')
        pageWidthPlus.innerHTML = '+';

        pageWidthMenu.appendChild(pageWidth100);
        pageWidthMenu.appendChild(pageWidth75);
        pageWidthMenu.appendChild(pageWidth50);
        pageWidthMenu.appendChild(pageWidth50);
        pageWidthMenu.appendChild(pageWidthPlus);
        pageWidthMenu.appendChild(pageWidthMinus);
        pageWidthMenu.appendChild(customInput("setPageWidth", "score_phorum_page_width"));

    }

    var blockedUsers, blockedUsersHeader;
    {
        blockedUsersHeader = document.createElement("h2");
        blockedUsersHeader.setAttribute("class", "submenu");
        blockedUsersHeader.innerHTML = "Blokovaní u\u017eivatelé <small>(vyžaduje reload)</small>"

        blockedUsers = document.createElement("div");
        blockedUsers.setAttribute("class", "submenu");
        blockedUsers.id = "blockedUsersList";
        blockedUsers.appendChild(getBlockedUsersList());

        blockedUsers.appendChild(customInput("blockUser",""));
    }

    var cssStyles, cssStylesHeader;
    {
        cssStylesHeader = document.createElement("h2");
        cssStylesHeader.setAttribute("class", "submenu");
        cssStylesHeader.innerHTML = "CSS styly <small>(vy\u017eaduje reload)</small>"

        cssStyles = document.createElement("div");
        cssStyles.setAttribute("class", "submenu");
        cssStyles.id = "cssStylesList";
        cssStyles.appendChild(getCSSList());

        var openNew = document.createElement("div");
        openNew.setAttribute("onClick", 'document.getElementById("cssNew").style.visibility="visible"; document.getElementById("cssStyle").value=""; document.getElementById("cssName").value=""');
        openNew.innerHTML = "P\u0159idat CSS styl";
        openNew.setAttribute("style", "cursor:pointer; margin: 5px 0;")
        cssStyles.appendChild(openNew);

        var cssNew = document.createElement("div");
        {
            var inputText = document.createElement("h2");
            inputText.innerHTML = "Název CSS:";

            var textAreaText = document.createElement("h2");
            textAreaText.innerHTML = "CSS Styl: <br /><small style='font-size: 10px;'>(Styl bude připojen na konec výchozího. Přidání /*CLEAR*/ do stylu smaže výchozí styl a použije jen tento)</small><br /><small style='font-size: 10px;'>(Pokud bude styl začínat http, bude se s ním pracovat jako s adresou k externímu stylu)</small>";

            var input =  document.createElement("input");
            input.id = "cssName";

            var textArea =  document.createElement("textarea");
            textArea.id = "cssStyle";

            var submit =  document.createElement("input");
            submit.value = "Vlo\u017eit";
            submit.type = "submit";
            submit.setAttribute("onClick", 'insertCSS(document.getElementById("cssName").value, document.getElementById("cssStyle").value);')

            var close =  document.createElement("input");
            close.value = "Zav\u0159ít";
            close.type = "submit";
            close.setAttribute("onClick", 'document.getElementById("cssNew").style.visibility="hidden"');


            cssNew.appendChild(inputText);
            cssNew.appendChild(input);
            cssNew.appendChild(textAreaText);
            cssNew.appendChild(textArea);
            cssNew.appendChild(submit);
            cssNew.appendChild(close);

            cssNew.id = "cssNew";
        }
        cssStyles.appendChild(cssNew);
    }

    settingMenu.appendChild(textSizeMenuHeader);
    settingMenu.appendChild(textSizeMenu);

    settingMenu.appendChild(textFontMenuHeader);
    settingMenu.appendChild(textFontMenu);

    settingMenu.appendChild(textColorMenuHeader);
    settingMenu.appendChild(textColorMenu);

    settingMenu.appendChild(backgroundColorMenuHeader);
    settingMenu.appendChild(backgroundColorMenu);

    settingMenu.appendChild(gridMenuHeader);
    settingMenu.appendChild(gridMenu);

    settingMenu.appendChild(roundedMenuHeader);
    settingMenu.appendChild(roundedMenu);

    settingMenu.appendChild(barPositionMenuHeader);
    settingMenu.appendChild(barPositionMenu);

    settingMenu.appendChild(barStyleMenuHeader);
    settingMenu.appendChild(barStyleMenu);

    settingMenu.appendChild(pageWidthMenuHeader);
    settingMenu.appendChild(pageWidthMenu);

    settingMenu.appendChild(blockedUsersHeader);
    settingMenu.appendChild(blockedUsers)

    settingMenu.appendChild(cssStylesHeader);
    settingMenu.appendChild(cssStyles)

    document.body.appendChild(settingMenu);
}
function bar()
{
    if(debug) console.log("Vytvářím lištu");
    var divBar = document.createElement("div");
    divBar.id = "scoreBar";

    //Lišta
    var logoImg = document.createElement("img");
    logoImg.setAttribute("id", "logoImage");
    logoImg.setAttribute("alt", "SCORE Phorum");
    logoImg.setAttribute("style", "vertical-align: top;");

    var settingImg = document.createElement("img");
    settingImg.setAttribute("id", "settingImage");
    settingImg.setAttribute("alt", "SCORE Phorum");
    settingImg.setAttribute("onClick", "showSettings()");

    var logoLink = document.createElement("a");
    logoLink.setAttribute("id", "logoLink");
    logoLink.appendChild(logoImg);
    logoLink.appendChild(document.createElement("span"));
    logoLink.lastChild.style.marginLeft="5px";
    logoLink.lastChild.style.paddingRight="10px";
    logoLink.lastChild.style.display="none";

    //Stuff
    var top = topLine.children[0];
    var myMessages = document.createElement('a');
    myMessages.href = top.children[0].href;

    if(top.children[1].nodeName.toLowerCase() == 'a' && top.children[1].firstElementChild && top.children[1].firstElementChild.nodeName.toLowerCase() == "b"){
        myMessages.innerHTML = '<span style="background-color:red; padding:0 5px;">Osobka ('+ top.children[1].firstElementChild.textContent + ")</span>";
    } else {
        myMessages.textContent = "Osobka";
    }

    myMessages.className ="bar_link";

    var users = document.createElement("a");
    users.id = "usersLink";
    users.className = "bar_link";
    users.setAttribute("onClick", "showUserList();");
    users.innerHTML = "U\u017eivatelé";

    var profile = document.createElement("a");
    profile.href = "/phorum.php?id=" + readCookie('uid') + "&w=4&mode=1";
    profile.innerHTML = "Profil";
    profile.className = "bar_link";
    //Stuff

    var menuDiv = document.createElement("div");
    menuDiv.id = "menuDiv";
    menuDiv.appendChild(myMessages);
    menuDiv.appendChild(users);
    menuDiv.appendChild(profile);


    divBar.appendChild(logoLink);
    menuDiv.appendChild(settingImg);
    divBar.appendChild(menuDiv);

    return divBar;
}
function barRoom(){
    if(debug) console.log("Vytvářím lištu v místnosti");
    var divBar = bar();

    var roomName = document.createElement("a");
    roomName.id = "roomName";
    if (document.getElementById("messageField").children[3]){
        roomName.innerHTML = document.getElementById("messageField").children[3].children[4].innerHTML.substring(10, 1000);
    } else {
        roomName.innerHTML = "Zaheslovaná místnost";
    }
    roomName.setAttribute('class', "bar_link");
    roomName.setAttribute("href", "javascript:window.location.reload()");

    var count = document.evaluate("/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr/td", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
    count = count.substring(count.indexOf("nových zpráv: ")+14, count.indexOf("| u")-1);

    roomName.innerHTML += " (<span>" + count + "</span>)";

    var newMessage = document.createElement('div');
    newMessage.setAttribute("class", "bar_link");
    newMessage.setAttribute("onClick", "showMessageField()");
    newMessage.innerHTML = "Nové vlákno";

    divBar.insertBefore(roomName, divBar.children[1]);
    divBar.firstChild.setAttribute("onClick", "showRoomList();");
    divBar.children[2].insertBefore(newMessage, divBar.children[2].firstElementChild);

    document.body.appendChild(divBar);

}
function barList(){
    var divBar = bar();

    var roomCount = document.createElement('div');
    roomCount.setAttribute("class", "bar_link");
    roomCount.innerHTML = "Nep\u0159e\u010dtených místností: " + countNewPosts;
    roomCount.setAttribute("onClick", "javascript:window.location.reload()");

    divBar.firstChild.href = "javascript:window.location.reload()";
    divBar.appendChild(roomCount);

    document.body.appendChild(divBar);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//Skrytí starých věcí, Oidčkování
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function deleteJunk(){
    if(debug) console.log("Buduji si struktur webu a skrývám zbytečnosti");

    for (i = 0; i < document.body.children.length; i++) {
        document.body.children[i].style.display = "none";
    }
    for (i = 0; i < document.head.children.length; i++) {
        if (document.head.children[i].nodeName.toLowerCase() == "script")
            document.head.children[i].removeAttribute("src");
    }

    var messageField = document.evaluate("/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    messageField.id = "messageField";

    topLine = document.evaluate("/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    topLine.id = "topLine";

}
function deleteJunkMainPage(){
    document.evaluate("/html/body/table/tbody/tr/td[2]/table[3]/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[3]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.style.display="none";
    list = document.evaluate("/html/body/table/tbody/tr/td[2]/table[3]/tbody/tr/td[2]/table/tbody/tr/td/table/tbody", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    var splitter = document.evaluate("/html/body/table/tbody/tr/td[2]/table[3]/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[22]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if (splitter.children[1] == null){ //Ma jen jedno dite
        splitter.children[0].children[0].style.display = "none";
        splitter.children[0].children[1].style.display = "none";
        splitter.nextElementSibling.style.display = "none";
    } else {
        if(debug) console.error("Splitter není tam kde má být!");
    }

    var spacer = document.createElement("div");
    spacer.setAttribute("style", "display: block; height: 30px;");

    list.appendChild(splitter.cloneNode(true));
    list.appendChild(spacer);
}
function hideMessageArea(){
    //Nalezení okna se zprávou a skrytí
    var messageField = document.evaluate("/html/body/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    messageField.id = "messageField";
    messageField.setAttribute('style', '');
    messageField.lastElementChild.children[1].value = "";

    var messageArea = document.getElementsByName("zprava").item(0);
    if (messageArea){
        messageArea.id="messageArea";
        messageArea.setAttribute("onkeyup", "myRecount()");
        messageArea.setAttribute("onBlur", "myRecount()");
        messageArea.setAttribute("onMouseMove", "");
    }
}
function favicon(){
    var link = document.createElement("link");
    link.setAttribute("href", "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMpaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MCA2MS4xMzQ3NzcsIDIwMTAvMDIvMTItMTc6MzI6MDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgV2luZG93cyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2NDM4NjQ5OEFFM0UxMUUwQTE1RkRCRTY0QTgxRUMyOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2NDM4NjQ5OUFFM0UxMUUwQTE1RkRCRTY0QTgxRUMyOSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjY0Mzg2NDk2QUUzRTExRTBBMTVGREJFNjRBODFFQzI5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY0Mzg2NDk3QUUzRTExRTBBMTVGREJFNjRBODFFQzI5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAgICAgICAgICAwMDAwMDAwMDAwEBAQEBAQECAQECAgIBAgIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/8AAEQgAEAAQAwERAAIRAQMRAf/EAGcAAQEBAAAAAAAAAAAAAAAAAAcICgEBAQEAAAAAAAAAAAAAAAAACAcJEAACAgMBAQEBAAAAAAAAAAAEBQMGAgcIAQkTFBEAAgIBBAIDAQEAAAAAAAAAAgMBBAYSEwUHESEAIggWI//aAAwDAQACEQMRAD8A0sttitehuqlelx3bWtJ2YhdltGYp7IUzytVoFgQHWxS0jIWSPyVn+Ak2AZQ2eHkhpUU+BWUOWWef9rz/AHD3txeJpvurcBuMtmsGM9VKZS2UQKxBcHcKFJYe8ZDXlzNtRkiS0Qp4BxfT359u9nsqItc5OiqgjADgbNmQCXkLBL0pZNcrUJjJ7C5WS5dPyQeh+vfo1xR11Sl17Qa8f8az7gpSKJbrJEm8hk1Bt29NaNWJWcjWqq31f2BW5TMSJYcH8kBDFbHFl7MIVKXnXeXzzsTBu5qeO8/dB+JXkjsITSUitAzuR/m+WNszZWKjIlGco8FBSQQag+Rnj8J6/wA66kuZRxKYr5bUYUOa++x9s2iMsM2IiACK7ZNa1NCt41FIk6GLKDB9z7funy47Upe09/Ln4mrLM9c1RdsYKqyWdDb6a4HLT+txIVJooSyzrPPIWxyP+4ZlH7hn4PBMPJF6UfMZ62zDpX9LHlvJ0xbhr2OELYDMCVWwBDBHMmxp2UTA7wHJFILmFQCDr7aLy7tbFO7/AM5owbHj2ckQlbrNYygTG1XknFojTGtLQXKlv+4hur3duVs1vu0dZd2/R/buigiKpzwg4qx2Br7bF26d0J0gm3hWtm1/VbkJqHr/AFwGwp1KtteYxWtcfETiWmaBwu/c88jcIhcxi1lew/I8yyyjzXLMqWODSUmDqxDC4EZmB2tZNZJn71R40D5YMH5Lz8KP9Xh2G4c/geFjkgyJu6Lk2kwuYk/G3MmtkgwNMCZeRCfqqAgvbJ//2Q==");
    link.setAttribute("rel", "shortcut icon");
    link.setAttribute("type", "image/x-icon");
    document.getElementsByTagName('head')[0].appendChild(link);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//Programová změna stylů
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setStyles(){
    if(debug) console.log("Nastavuji styly");
    if(debug) console.groupCollapsed("Nastavování stylů");

    var textSize = localStorage.getItem('score_phorum_text_size');
    setTextSize(textSize);

    var textFont = localStorage.getItem('score_phorum_text_font');
    setTextFont(textFont);

    var textColor = localStorage.getItem('score_phorum_text_color');
    setTextColor(textColor);

    var backgroundColor = localStorage.getItem('score_phorum_background_color');
    setBackgroundColor(backgroundColor);

    var grid = localStorage.getItem('score_phorum_grid');
    setGrid(grid);

    var rounded = localStorage.getItem('score_phorum_rounded');
    setRounded(rounded);

    var barStyle = localStorage.getItem('score_phorum_bar_style');
    setBarStyle(barStyle);

    var barPosition = localStorage.getItem('score_phorum_bar_position');
    setBarPosition(barPosition);

    var pageWidth = localStorage.getItem('score_phorum_page_width');
    setPageWidth(pageWidth);
    if(debug) console.groupEnd();
}
function dePitrisation(){
    document.body.onload = function(){
        var messageArea = document.getElementById('messageArea');

        if (messageArea){
            var pitrisButtons = messageArea.previousElementSibling;
            var pitrisDiv = document.getElementById('pitrisDiv');

            pitrisButtons.setAttribute("style", "display: inline");

            for (i = 0; i < pitrisButtons.children.length; i++) {
                pitrisButtons.children[i].className = "pitrisButton";
                pitrisButtons.children[i].removeAttribute("style");
                pitrisButtons.children[i].setAttribute("onClick", pitrisButtons.children[i].getAttribute("onClick") + "; return false;");

            }
            pitrisDiv.insertBefore(pitrisButtons, pitrisDiv.firstChild);
        }

        if (document.getElementById("fmenu")){
            document.getElementById("fmenu").style.display = "none";
            if(document.getElementById("fmenu").previousElementSibling && document.getElementById("fmenu").previousElementSibling.nodeName == "a"){
                document.getElementById("fmenu").previousElementSibling.style.display = "none";
            }
        }
    }
}
function fixImages(){
    document.body.onload = function(){
        var images = document.getElementsByTagName("img");
        for (i = 0; i < images.length; i++) {
            images[i].setAttribute("width", "");
        }
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Skripty které přijdou i do stránky

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function innerScripts()
{
    //CSS
    if(debug) console.log('Zpracovávám CSS');
    document.getElementsByTagName("link")[0].parentNode.removeChild(document.getElementsByTagName("link")[0]);

    window.localStorage.setItem("score_phorum_default_style", defaultCSS);

    var createCSS = defaultCSS;
    if (window.localStorage.getItem("score_phorum_selected_style")){
        customCSS = getCSS(window.localStorage.getItem("score_phorum_selected_style"));
        if (customCSS[1].indexOf("/*CLEAR*/") > -1 || customCSS[1].indexOf("http") == 0){
            createCSS = customCSS[1];
        } else {
            createCSS = defaultCSS + "\n/* CUSTOM CSS */ \n" + customCSS[1];
        }
    }

    if(debug) console.log("Vytvá\u0159ím CSS dokument");


    if (debug) console.time("css zpracování. Split:" + splitCSS);
    if (createCSS.indexOf("http") == 0){
        document.head.appendChild(document.createElement("link"));
        document.head.lastChild.setAttribute("href", createCSS);
        document.head.lastChild.setAttribute("tyoe", "text/css");
        document.head.lastChild.setAttribute("rel", "stylesheet");
    } else {
        document.head.appendChild(document.createElement("style"));

        if (splitCSS){
            css = createCSS.split("}");

            if(debug) console.groupCollapsed()
            for (i = 0; i < css.length-1; i++) {
                if(debug) console.log(i + ": "+css[i] + "}" );
                document.head.lastChild.innerHTML += css[i] + "}\n";
            }
            if(debug) console.groupEnd();
        } else {
            document.head.lastChild.innerHTML = createCSS;
        }
    }


    if (debug) console.timeEnd("css zpracování. Split:" + splitCSS);

    if(debug) console.log('Zpracovávám Skripty');
    var script = document.createElement('script');
    script.type = 'text/javascript';
    var innerScripts  = "//SCORE PHORUM OVERHAUL SCRIPTS";
    innerScripts += "\n var debug = " + debug + ";";
    innerScripts += "\n var countNewPosts = " + countNewPosts + ";";
    innerScripts += "\n var favoritesTimeout = " + favoritesTimeout + ";";

    innerScripts += "\n " + showMessageField.toString();
    innerScripts += "\n " + hideMessageField.toString();
    innerScripts += "\n " + getUrlParameter.toString();
    innerScripts += "\n " + myRecount.toString();
    innerScripts += "\n " + saveCookie.toString();
    innerScripts += "\n " + findCSSRule.toString();
    innerScripts += "\n " + editCSSRule.toString();
    innerScripts += "\n " + setTextSize.toString();
    innerScripts += "\n " + setTextFont.toString();
    innerScripts += "\n " + setBarPosition.toString();
    innerScripts += "\n " + setBarStyle.toString();
    innerScripts += "\n " + setTextColor.toString();
    innerScripts += "\n " + setGrid.toString();
    innerScripts += "\n " + setBackgroundColor.toString();
    innerScripts += "\n " + setRounded.toString();
    innerScripts += "\n " + setPageWidth.toString();
    innerScripts += "\n " + showSettings.toString();
    innerScripts += "\n " + showRoomList.toString();
    innerScripts += "\n " + hideSettings.toString();
    innerScripts += "\n " + loadFavorites.toString();
    innerScripts += "\n " + processFavorite.toString();
    innerScripts += "\n " + parseRooms.toString();
    innerScripts += "\n " + readCookie.toString();
    innerScripts += "\n " + loadRooms.toString();
    innerScripts += "\n " + showUserList.toString();
    innerScripts += "\n " + loadUsers.toString();
    innerScripts += "\n " + processUsers.toString();
    innerScripts += "\n " + parseUsers.toString();
    innerScripts += "\n " + showCloser.toString();
    innerScripts += "\n " + changePicture.toString();
    innerScripts += "\n " + myuser.toString();
    innerScripts += "\n " + processMessage.toString();
    innerScripts += "\n " + retrieveMessage.toString();
    innerScripts += "\n " + getBlockedUsersList.toString();
    innerScripts += "\n " + unblockUser.toString();
    innerScripts += "\n " + blockUser.toString();
    innerScripts += "\n " + getCSS.toString();
    innerScripts += "\n " + getCSSList.toString();
    innerScripts += "\n " + useCSS.toString();
    innerScripts += "\n " + deleteCSS.toString();
    innerScripts += "\n " + insertCSS.toString();
    innerScripts += "\n " + showCSS.toString();
    innerScripts += '\n eggImage1="' + eggImage1 + '"';
    innerScripts += '\n eggImage2="' + eggImage2 + '"';
    innerScripts += '\n gridBackground="' + gridBackground + '"';
    innerScripts += '\n blackLogo="' + blackLogo + '"';
    innerScripts += '\n blackSettingIcon="' + blackSettingIcon + '"';
    innerScripts += '\n classicLogo="' + classicLogo + '"';
    innerScripts += '\n classicSettingIcon="' + classicSettingIcon + '"';
    innerScripts += '\n tranparentLogo="' + tranparentLogo + '"';
    innerScripts += '\n transparentSettingIcon="' + transparentSettingIcon + '"';
    innerScripts += '\n whiteLogo="' + whiteLogo + '"';
    innerScripts += '\n whiteSettingIcon="' + whiteSettingIcon + '"';
    innerScripts += '\n fryBackground="' + fryBackground + '"';

    script.innerHTML = innerScripts;
    document.body.appendChild(script);
}

function showMessageField()
{
    var messageField = document.getElementById("message");
    messageField.style.visibility="visible";

    var spacer = document.getElementById("spacer");
    if (spacer.style.display != "block")
        window.scrollBy(0, 190);
    spacer.style.display="block";

if (debug) console.log("Načítám divy");
    var messageArea = document.getElementById("messageArea");
    var pitrisDiv = document.getElementById("pitrisDiv");
    var barLine;

if (debug) console.log("Hledám pitrisDiv");
    if (messageArea.previousElementSibling && messageArea.previousElementSibling.nodeName.toLowerCase() == "div"){
        barLine = messageArea.previousElementSibling;
    } else {
        barLine = document.createElement("div");
    }


    var retrieve = document.createElement("div");
    retrieve.setAttribute("onClick", "retrieveMessage();");
    retrieve.innerHTML = "Obnovit zprávu";
    retrieve.href = "#";

    barLine.appendChild(retrieve);

if (debug) console.log("Přepisuju styly");
    for (i = 0; i < barLine.children.length; i++) {
        barLine.children[i].className = "pitrisButton";
        barLine.children[i].removeAttribute("style");
        barLine.children[i].setAttribute("onClick", barLine.children[i].getAttribute("onClick") + "; return false;");
    }


    pitrisDiv.appendChild(barLine);
    messageArea.removeAttribute("style");
    messageArea.focus();
}
function hideMessageField()
{
    var messageField = document.getElementById("message");
    messageField.style.visibility="hidden";

    var spacer = document.getElementById("spacer");

    window.scrollBy(0, -190);
    spacer.style.display="none";
}
function changePicture(picture){
    if (picture.style.minWidth == '100%'){
        picture.style.maxWidth = '100%';
        picture.style.minWidth = '1%';
    } else {
        picture.style.maxWidth = '10000%';
        picture.style.minWidth = '100%';
    }
}
function getUrlParameter(par) {
    var reg = new RegExp('&'+par+'=([^&]*)','i');

    var parameters = window.location.search;
    parameters = parameters.replace(/^\?/,'&').match(reg);
    if(parameters==null) return false;
    return parameters=parameters[1];
}
function myRecount(){
    var messageArea = document.getElementById("messageArea");
    var messageWarning = document.getElementById("messageWarning");
    messageWarning.style.color = "black";
    messageWarning.innerHTML = "Znaků: " + messageArea.value.length;
    if (messageArea.value.length == 666){
        messageWarning.style.color = "red";
        messageWarning.style.textShadow = "2px -2px 2px orange, -1px -2px 3px yellow";
        messageWarning.innerHTML = "SATAN";
    }
    if (messageArea.value.length == 1337){
        messageWarning.innerHTML = "-==leet==-";
    }

    if (messageArea.value.length>2500){
        messageWarning.style.color = "blue";
        messageWarning.innerHTML = "Zpráva p\u0159esáhla 2500 znak\u016f a foru se to nelíbí. Znak\u016f: " + messageArea.value.length;
    }
}
function saveCookie(name, data, expire)
{
    if(expire == null) expire = 1000;
    var date = new Date();
    date.setTime(date.getTime() + expire * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + data + "; expires=" + date.toGMTString() + "; path=/";
}
function findCSSRule(name)
{
    var desiredRule = null;
    var cssRules=document.styleSheets[0].cssRules? document.styleSheets[0].cssRules: document.styleSheets[0].rules;
    for ( i=0; i < cssRules.length; i++ )
    {
        if(cssRules[i].selectorText.toLowerCase() == name.toLowerCase() )
        {
            desiredRule = cssRules[i];
            break;
        }
    }
    return desiredRule;
}
function editCSSRule(name)
{
    if (findCSSRule(name) == null )
    {
        var stylesheet=document.styleSheets[0]
        stylesheet.insertRule(name + "{}", 0);
    }
    return findCSSRule(name);
}
function setTextSize(textSize)
{
    if(debug) console.log('Měním velikost písma');
    var textCSS = editCSSRule(".post_text").style.fontSize;
    switch (textSize) {
        case "+":
            textSize = parseInt(textCSS.substr(0, textCSS.length-2)) + 1;
            break;
        case "-":

            textSize = parseInt(textCSS.substr(0, textCSS.length-2)) - 1;
            break;
    }

    editCSSRule(".post_text").style.fontSize = textSize + "px";
    localStorage.setItem("score_phorum_text_size", textSize)
}
function setTextFont(textFont)
{
    if(debug) console.log('Měním font písma');
    editCSSRule(".post_text").style.fontFamily = textFont;
    localStorage.setItem("score_phorum_text_font", textFont)
}
function setBarPosition(position)
{
    if(debug) console.log('Měním pozici lišty');
    if (position == "bottom"){
        document.getElementById('scoreBar').style.top = "";
        document.getElementById('scoreBar').style.bottom = "0px";
        if (document.getElementById('roomListQuick')){
            document.getElementById('roomListQuick').style.top = "";
            document.getElementById('roomListQuick').style.bottom = "25px";
        }
        if(document.getElementById('userListQuick')){
            document.getElementById('userListQuick').style.top = "";
            document.getElementById('userListQuick').style.bottom = "25px";
        }
    } else {
        document.getElementById('scoreBar').style.top = "0px";
        document.getElementById('scoreBar').style.bottom = "";
        if (document.getElementById('roomListQuick')){
            document.getElementById('roomListQuick').style.top = "25px";
            document.getElementById('roomListQuick').style.bottom = "";
        }
        if(document.getElementById('userListQuick')){
            document.getElementById('userListQuick').style.top = "25px";
            document.getElementById('userListQuick').style.bottom = "";
        }
    }
    localStorage.setItem("score_phorum_bar_position", position)
}
function setBarStyle(barStyle)
{
    if(debug) console.log('Měním styl lišty');
    logoLink = document.getElementById("logoLink");
    logoImg = document.getElementById("logoImage");
    settingImg = document.getElementById("settingImage");
    divBar = document.getElementById("scoreBar");
    roomName = editCSSRule(".bar_link");


    switch (barStyle) {
        case "black":
            logoImg.setAttribute("src", blackLogo);
            settingImg.setAttribute("src", blackSettingIcon);
            divBar.style.backgroundColor = "black";
            divBar.style.color = "white";
            roomName.style.opacity = "1";
            roomName.style.color = "white";
            logoLink.style.color = "black";
            logoLink.style.backgroundColor = "white";
            break;
        case "classic":
            logoImg.setAttribute("src", classicLogo);
            settingImg.setAttribute("src", classicSettingIcon);
            divBar.style.backgroundColor = "#CAC29F";
            divBar.style.color = "#79775E";
            roomName.style.opacity = "1";
            roomName.style.color = "#79775E";
            logoLink.style.color = "darkOrange";
            logoLink.style.backgroundColor = "#8AA39D";
            break;
        case "transparent":
            logoImg.setAttribute("src",  tranparentLogo);
            settingImg.setAttribute("src", transparentSettingIcon );
            divBar.style.backgroundColor = "";
            divBar.style.color = "white";
            roomName.style.opacity = "0.4";
            roomName.style.color = "white";
            logoLink.style.color = "lightGray";
            logoLink.style.backgroundColor = "transparent";
            break;
        default:
            logoImg.setAttribute("src", whiteLogo);
            settingImg.setAttribute("src", whiteSettingIcon)
            divBar.style.backgroundColor = "white";
            divBar.style.color = "Black";
            roomName.style.color = "Black";
            roomName.style.opacity = "1";
            logoLink.style.color = "white";
            logoLink.style.backgroundColor = "black";
            break;
    }
    localStorage.setItem("score_phorum_bar_style", barStyle)
}
function setTextColor(textColor)
{
    if(debug) console.log('Měním barvu písma');
    editCSSRule(".post_text").style.color = textColor;
    localStorage.setItem("score_phorum_text_color", textColor)
}
function setGrid( grid)
{
    if(debug) console.log('Měním nastavení mřížky');
    if ( grid == "1" )
        editCSSRule("#root").style.backgroundImage = "url(" + gridBackground + ")";
    else {
        editCSSRule("#root").style.backgroundImage = "";
    }
    localStorage.setItem("score_phorum_grid", grid)
}
function setBackgroundColor(color)
{
    if(debug) console.log('Měním nastavení mřížky');
    editCSSRule("#root").style.backgroundColor = color;
    localStorage.setItem("score_phorum_background_color", color)
}
function setRounded(rounded)
{
    if(debug) console.log('Měním nastavení zakulacení:' + rounded);
    if (rounded != "yes"){
        editCSSRule(".icon_picture").style.borderRadius = "0";
        editCSSRule(".level_picture").style.borderRadius = "0";
        editCSSRule(".info_line").style.borderRadius = "0";

        editCSSRule(".icon_picture").style.WebkitBorderRadius = "0";
        editCSSRule(".level_picture").style.WebkitBorderRadius = "0";
        editCSSRule(".info_line").style.WebkitBorderRadius = "0";

        editCSSRule(".icon_picture").style.MozBorderRadius = "0";
        editCSSRule(".level_picture").style.MozBorderRadius = "0";
        editCSSRule(".info_line").style.MozBorderRadius = "0";
    }else{
        editCSSRule(".icon_picture").style.borderRadius = "5px 5px 0px 0px";
        editCSSRule(".level_picture").style.borderRadius = "0px 0px 5px 5px";
        editCSSRule(".info_line").style.borderRadius = "5px";

        editCSSRule(".icon_picture").style.WebkitBorderRadius = "5px 5px 0 0";
        editCSSRule(".level_picture").style.WebkitBorderRadius = "0px 0px 5px 5px";
        editCSSRule(".info_line").style.WebkitBorderRadius = "5px";

        editCSSRule(".icon_picture").style.MozBorderRadius = "5px 5px 0px 0px";
        editCSSRule(".level_picture").style.MozBorderRadius = "0px 0px 5px 5px";
        editCSSRule(".info_line").style.MozBorderRadius = "5px";
    }
    localStorage.setItem("score_phorum_rounded", rounded);
}
function setPageWidth(pageWidth){
    if(debug) console.log('Měním šířku stránky');
    if (document.getElementById("egg")){
        document.getElementById("egg").parentNode.removeChild(document.getElementById("egg"));
    }
    var kParam = getUrlParameter("kr");
    if (kParam == "906" && pageWidth == "50" && document.getElementById("container").style.width == "100%"){

        img = document.createElement("img");
        if (Math.random() > 0.5){
            img.src = eggImage1;
        } else {
            img.src = eggImage2;
        }
        if (Math.random() > 0.5){
            img.style.left = "30px";
        } else {
            img.style.right = "30px";
        }

        img.style.bottom = "0px";
        img.style.position = "fixed";
        img.id ="egg";

        document.getElementById("root").appendChild(img);
    }

    var textCSS = document.getElementById("container").style.width;
    switch (pageWidth) {
        case "+":
            if (textCSS.indexOf("%") > -1){
                pageWidth = parseInt(textCSS.substr(0, textCSS.length-1)) + 5;
                pageWidth += "%";
            } else {
                pageWidth = parseInt(textCSS) + 5;
            }
            break;
        case "-":
            if (textCSS.indexOf("%") > -1){
                pageWidth = parseInt(textCSS.substr(0, textCSS.length-1)) - 5;
                pageWidth += "%";
            } else {
                pageWidth = parseInt(textCSS) - 5;
            }
            break;
    }

    document.getElementById("container").style.width = pageWidth;
    localStorage.setItem("score_phorum_page_width", pageWidth)
}
function showSettings(){
    if(debug) console.log('Zobrazuji nastavení');
    if (document.getElementById('settingMenu').style.visibility == "visible"){
        document.getElementById('settingMenu').style.visibility = "hidden";
        showCloser();
    } else {
        document.getElementById('settingMenu').style.visibility = "visible";
        showCloser();
    }
}
function showRoomList(){
    if(debug) console.log('Zobrazuji seznam místností');
    if (document.getElementById('roomListQuick').style.visibility == "visible"){
        document.getElementById('roomListQuick').style.visibility = "hidden";
    } else {
        loadFavorites();
        document.getElementById('roomListQuick').style.visibility = "visible";
        showCloser();
    }
}
function showUserList(){
    if(debug) console.log('Zobrazuji seznam místností');
    if (document.getElementById('userListQuick').style.visibility == "visible"){
        document.getElementById('userListQuick').style.visibility = "hidden";
    } else {
        document.getElementById('userListQuick').style.visibility = "visible";
        showCloser();
    }
}
function hideSettings(){
    if(debug) console.log('Skrývám nastavení');
    document.getElementById('settingMenu').style.visibility = "hidden";
}
function showCloser(){
    var closer = document.getElementById("closer");
    if (!closer){
        closer = document.createElement("div");
        closer.setAttribute("onClick", 'showCloser();');
        closer.id = "closer";
        document.body.appendChild(closer);
    }


    if (closer.style.visibility == "visible"){
        if (document.getElementById('settingMenu'))
            document.getElementById('settingMenu').style.visibility = "hidden";
        if(document.getElementById('roomListQuick'))
            document.getElementById('roomListQuick').style.visibility = "hidden";
        if(document.getElementById('userListQuick'))
            document.getElementById('userListQuick').style.visibility = "hidden";
        closer.style.visibility = "hidden";
    } else {
        closer.style.visibility = "visible";
    }
}
function myuser(user, kr, rc){
    document.napis.room.value=kr;
    document.napis.pre.value=rc;
    document.napis.reader.value=user;
    if(rc!=0)
    {
        document.napis.what.value="react";
        document.react.src=obr1.src
    }
    else
    {
        document.napis.what.value="new";
        document.react.src=obr0.src
    }
}
function processMessage(){
    var messageArea = document.getElementById("messageArea");
    messageArea.value = messageArea.value.replace('<span style="{color:#94ada5;}">', '<span style="color:goldenRod;background-color:goldenRod;">');
    window.localStorage.setItem("score_last_message", messageArea.value);

    return true;
}
function retrieveMessage(){
    var messageArea = document.getElementById("messageArea");
    var messageWarning = document.getElementById("messageWarning");
    if (window.localStorage.getItem("score_last_message")){
        if (messageArea.value.length > 0 ){
            messageWarning.style.color = "blue";
            messageWarning.innerHTML = "Text zprávy musí být prázdný pro obnovení p\u0159ede\u0161lé zprávy";
        } else {
            messageArea.value = window.localStorage.getItem("score_last_message");
            myRecount();
        }
    } else {
        messageWarning.style.color = "blue";
        messageWarning.innerHTML = "P\u0159ísp\u011bvek nenalezen";
    }
}
function getBlockedUsersList(){
    var blockedUsers = [];
    if (window.localStorage.getItem("blockedUsers"))
        blockedUsers = JSON.parse(window.localStorage.getItem("blockedUsers"));

    var blockedUsersList = document.createElement("div");
    var user;

    for (i = 0; i < blockedUsers.length; i++) {
        user = document.createElement("div");
        user.innerHTML = "<strong>" + blockedUsers[i] + "</strong> - <a onClick='unblockUser(\"" + blockedUsers[i] + "\"); return false;' href='#'>odblokuj</a>";
        blockedUsersList.appendChild(user);
    }

    return blockedUsersList;
}
function blockUser(name){
    var blockedUsers = [];
    if (window.localStorage.getItem("blockedUsers"))
        blockedUsers = JSON.parse(window.localStorage.getItem("blockedUsers"));

    blockedUsers.push(name);
    blockedUsers.sort();

    window.localStorage.setItem("blockedUsers", JSON.stringify(blockedUsers));

    document.getElementById("blockedUsersList").replaceChild(getBlockedUsersList(), document.getElementById("blockedUsersList").firstChild);
}
function unblockUser(name){

    var blockedUsers = [];
    if (window.localStorage.getItem("blockedUsers"))
        blockedUsers = JSON.parse(window.localStorage.getItem("blockedUsers"));

    for (i = 0; i < blockedUsers.length; i++) {
        if (blockedUsers[i] == name){
            blockedUsers.splice(i, 1);
        }
    }
    blockedUsers.sort();

    window.localStorage.setItem("blockedUsers", JSON.stringify(blockedUsers));

    document.getElementById("blockedUsersList").replaceChild(getBlockedUsersList(), document.getElementById("blockedUsersList").firstChild);
}
function getBlockedUsers(){
    var blockedUsers = [];
    if (window.localStorage.getItem("blockedUsers"))
        blockedUsers = JSON.parse(window.localStorage.getItem("blockedUsers"));

    return blockedUsers;
}
function getCSSList(){
    var cssStyles = [];
    var selectedStyle = "default";

    if (window.localStorage.getItem("score_phorum_css_styles"))
        cssStyles = JSON.parse(window.localStorage.getItem("score_phorum_css_styles"));
    if (window.localStorage.getItem("score_phorum_selected_style"))
        selectedStyle = window.localStorage.getItem("score_phorum_selected_style");

    var style = new Array();
    style[0] = "default";
    style[1] = window.localStorage.getItem("score_phorum_default_style");
    cssStyles.unshift(style);
    cssStyles.sort();

    var cssStylesList = document.createElement("div");
    var css;

    for (i = 0; i < cssStyles.length; i++) {
        css = document.createElement("div");
        css.innerHTML = "<strong><a onClick='useCSS(\"" + cssStyles[i][0] + "\"); return false;' href='#'>" + cssStyles[i][0] + "</a></strong> - <a onClick='showCSS(\"" + cssStyles[i][0] + "\"); return false;' href='#'>Zobraz</a> - <a onClick='if(confirm(\"Smazat styl?\")) deleteCSS(\"" + cssStyles[i][0] + "\"); return false;' href='#'>smaž</a>";
        if (cssStyles[i][0] == selectedStyle){
            css.innerHTML = "(aktivní) " + css.innerHTML;
        }
        cssStylesList.appendChild(css);
    }

    return cssStylesList;
}
function showCSS(name){
    var css = getCSS(name);
    cssStyle = css[1];

    if (cssStyle.indexOf("\n") == -1)
    {
        cssStyle = cssStyle.replace(/{/g, "\n{\n\t")
        cssStyle = cssStyle.replace(/}/g, "\n}\n\n");
        cssStyle = cssStyle.replace(/;/g, ";\n\t");
    }

    document.getElementById("cssStyle").value = cssStyle;
    document.getElementById("cssName").value = css[0];
    document.getElementById("cssNew").style.visibility = "visible";
}
function useCSS(name){
    window.localStorage.setItem("score_phorum_selected_style", name);
    document.getElementById("cssStylesList").replaceChild(getCSSList(), document.getElementById("cssStylesList").firstChild);
}
function deleteCSS(name){
    var cssStyles = [];
    if (window.localStorage.getItem("score_phorum_css_styles"))
        cssStyles = JSON.parse(window.localStorage.getItem("score_phorum_css_styles"));

    if (window.localStorage.getItem("score_phorum_selected_style") && window.localStorage.getItem("score_phorum_selected_style").toLowerCase() == name.toLowerCase())
        selectedStyle = window.localStorage.removeItem("score_phorum_selected_style");

    for (i = cssStyles.length-1; i >= 0 ; i--) {
        if (cssStyles[i][0].toLowerCase() == name.toLowerCase()){
            cssStyles.splice(i, 1);
        }
    }
    cssStyles.sort();

    window.localStorage.setItem("score_phorum_css_styles", JSON.stringify(cssStyles));

    document.getElementById("cssStylesList").replaceChild(getCSSList(), document.getElementById("cssStylesList").firstChild);
}
function insertCSS(name, styleContext){
    if (name != "default"){
        var cssStyles = [];
        deleteCSS(name);

        styleContext = styleContext.replace("\n", "", "gm");
        styleContext = styleContext.replace("\t", "", "gm");

        if (window.localStorage.getItem("score_phorum_css_styles"))
            cssStyles = JSON.parse(window.localStorage.getItem("score_phorum_css_styles"));

        var style = new Array();
        style.push(name);
        style.push(styleContext);

        cssStyles.unshift(style);
        cssStyles.sort();

        window.localStorage.setItem("score_phorum_css_styles", JSON.stringify(cssStyles));

        document.getElementById("cssStylesList").replaceChild(getCSSList(), document.getElementById("cssStylesList").firstChild);
    }
}
function getCSS(name){
    var cssStyles = [];

    var cssStyle = new Array();
    cssStyle.push("default");
    cssStyle.push(window.localStorage.getItem("score_phorum_default_style"));

    if (window.localStorage.getItem("score_phorum_css_styles"))
        cssStyles = JSON.parse(window.localStorage.getItem("score_phorum_css_styles"));

    for (i = 0; i < cssStyles.length; i++) {
        if (cssStyles[i][0].toLowerCase() == name.toLowerCase()){
            cssStyle = cssStyles[i];
        }
    }

    return cssStyle;
}
//Nakradeno z pitriscriptu
function readCookie(name) {
    if(debug) console.log('Čtu cookie ' + name);
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
//nalezeni class - prevzato z http://www.dustindiaz.com/getelementsbyclass/
function getElementsByClass(searchClass,tag,node) {
    var classElements = new Array();
    if ( node == null )
        node = document;
    if ( tag == null )
        tag = '*';
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
    for (i = 0, j = 0; i < elsLen; i++) {
        if ( pattern.test(els[i].className) ) {
            classElements[j] = els[i];
            j++;
        }
    }
    return classElements;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Obrázky
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var gridBackground = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAYAAACPZlfNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkIwNERCOUJEM0MwOTExRTFBMkY2OENENjk2NUFFQjVEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkIwNERCOUJFM0MwOTExRTFBMkY2OENENjk2NUFFQjVEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjA0REI5QkIzQzA5MTFFMUEyRjY4Q0Q2OTY1QUVCNUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjA0REI5QkMzQzA5MTFFMUEyRjY4Q0Q2OTY1QUVCNUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5Ky8w9AAABEElEQVR42uzWsQmAQBAF0dVErd0SLrRINVoxOBBsYA/egIEfs0F2IjOjP/vR8vtur7fPgaEgbDCm93frL/d5xbKtv4/shXa3wQ2DGwbCCINKtKtElQg3DIQRBpVoV4kqEW4YCCMMKtGuElUi3DAQRhhUol0lqkS4YSCMMKhEu0q0q0Q3DISBMJVoV4l2leiGgTAQphLtKtGuEt0wEAbCVKJdJdpVohsGwkCYSlRlKtGuEt0wEAbCoBJVol0lwg0jDIRBJapEu0qEG0YYCINKVIl2lQg3jDAQBpWoEu0qEW4YYSAMKlElqi+VCDcMhBEGlWhXiSoRbhgIIwwq0a4SVSLcMBBGGFSiXSWqRBTiEWAAhtitbGcyg/MAAAAASUVORK5CYII=";
var blackLogo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAAUCAMAAAAHtrtKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJCNjI2RjM0MjA1NjExRTE4MjMyRjVEMkVFNzlDODVBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJCNjI2RjM1MjA1NjExRTE4MjMyRjVEMkVFNzlDODVBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkI2MjZGMzIyMDU2MTFFMTgyMzJGNUQyRUU3OUM4NUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkI2MjZGMzMyMDU2MTFFMTgyMzJGNUQyRUU3OUM4NUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6Occ+tAAAAGFBMVEUoKCi4uLjg4OCKiopcXFz+/v4AAAD///9HPA3mAAABaElEQVR42syUR5ZDMQgERWjp/jc2NCj4zdaL0cYi1SfJY/3kjF9iVOJg61LSBRwBV/8qym8tJAZLfYw5p2kZLaXhihLm0MZLOlm6eoCUtxFRxCxJkcdCoUcSQD1CgMpu6TzHr98QFgW/Vn0ogUkhsvKSHswAbtCUxDDQmazr6pCoUxYsyXlP5ca4eRRiVRAtRkyXox4UbfqCVH2OXaiU0dkprdzZj9TsorKlESFNuS2ttjPVjPUakjFnn9sjWqzdnKQ6y3gwxUyXQUxhEzPU9liYDXTPSr4xtjEAy3tSJYbZRglojDaoLWcNj5Bmfyuuqw2ae29olBrRbrHGorAjuzWhvd9At1jTr3vjNfAC8Mc99roGHivcA9cvjHPgEcXt25jeKsWf9Qsdd0Sw3oqvH9/KaHIr8Cx1P4YAxBvMvjcGp1372/XCVTwP321wxFIyDgxhqpHmFnpuKFpUuqUVP/6/+S+YjwADAJ5WHZ5gz+zAAAAAAElFTkSuQmCC";
var blackSettingIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAEFBQXJycqysrMDAwNTU1Pf39////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPanYIIAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAGtJREFUKFOVUAkOwCAI45L+/8dDiCZzLNlINNjQFkv0uwSQG0niqYASza5KHMYDGGzwhQYTHievPWoTqbKtyzGizCHrvCQ19MIkzYYWP2k5wdm+g9LRg/Y0IupWapdvv5kxnIFUKmd0n8K/AOQKA4VDJTGvAAAAAElFTkSuQmC";
var classicLogo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAAUCAMAAAAHtrtKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFDNTQzMUYyM0JGRTExRTE5Njc1QTBDRDBCMkQyNUU2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFDNTQzMUYzM0JGRTExRTE5Njc1QTBDRDBCMkQyNUU2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUM1NDMxRjAzQkZFMTFFMTk2NzVBMENEMEIyRDI1RTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUM1NDMxRjEzQkZFMTFFMTk2NzVBMENEMEIyRDI1RTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5AlUFYAAADAFBMVEX8gizfdSutoYj5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";
var classicSettingIcon ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdEQkU5QTRBM0JGRTExRTFBNkU0RDE2MjhENEI3NzJFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdEQkU5QTRCM0JGRTExRTFBNkU0RDE2MjhENEI3NzJFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0RCRTlBNDgzQkZFMTFFMUE2RTREMTYyOEQ0Qjc3MkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0RCRTlBNDkzQkZFMTFFMUE2RTREMTYyOEQ0Qjc3MkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4TnMWyAAAAGFBMVEWwtp2utZ6psp17jYSvtpyRno/IxKB+mpM2DGqoAAAAYklEQVR42oyQUQrAMAhD1VR7/xtPtDgG2Zhf7cMYjWxS8gl9LX9Az69FWL8aZpNCIgTa7Q1jauDWG+rMRHYYYKnAgW5SJmUm5gVrIo4iNe+QyqkRX4kuT8+kgfDofiV/CTAAi20JMUPCtvYAAAAASUVORK5CYII=";
var tranparentLogo ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAAAUCAYAAADbX/B7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU0REIyRjVEM0JGQTExRTE5NjJERjQ2NEZDQzA5QzlCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU0REIyRjVFM0JGQTExRTE5NjJERjQ2NEZDQzA5QzlCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTREQjJGNUIzQkZBMTFFMTk2MkRGNDY0RkNDMDlDOUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTREQjJGNUMzQkZBMTFFMTk2MkRGNDY0RkNDMDlDOUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6rnkGUAAALj0lEQVR42sSY2W8UVxbGby1d7bbd3sA2ttkxGGNDAgwhmzSRsiqKAsofkLc8RBryL2Xe8hIp0kxIIiWCyYQlySRhIDBgYzDe960Xu/ea33e7y7EdonmcQldt7nLuOd/5zlLlfP311yYMQ7Nnzx6TSqVMPp83Bw4cMJ2dnaaxsdHo0fwPP/xg6uvrzb1790y5XDbJZNI899xz9u/vvvvO7Nq1y7zyyiv2Nzrz4MEDk81mTalUMvfv3zc9PT3m9ddft/Pff/+9OX36tNm9e7e5evWq8TzPnpO85uZmc/HiRbO2tmY+//xzU6lUjOM4plgsmr1799q1Tz75xGxsbNjzjx8/Nv39/ebll182N2/etP/XnefOnTNPnjwxmUzGvPrqq+ann34yY2Nj5qWXXjJ1dXXmn99+a/5y6ZLZ+vz9+tXAN//nRwbLABmtsfWRswSSfrUW7d36aD0a/+vZutfKQ+5THsfdqSDDQQnNy3V+bXia1/ofXaY1zm2e0d/MuU87ExmLgU5XV5e3b9++9iAI6n3ft2vRHnmzra3NJBIJy1KY2378+PE6ydd5MWf//v0ebOk8duxYTHcynOh8ZFMNBLevr6+OiOg4ePCgXygUnKcBqXPbmEJI+ND4OMrVS4hQs9A5TgilZxsaGiYQtk2SDCEsEjrHCJiyQLuuG8bj8TKGjabT6VWUK3NhKEUwTmC0xmKxwxgcvPDCC+uEysP5+XlLcbFB+wTGu+++a3K5XHRdZ2tr61HJQVdNhhgYx9gYMsuEbMh9otIquowAtNKCh/7HGMlTp075J0+elH6l2dnZckdHx9SdO3dmmd/0XKlUDOVRiyaK++SSQZRt2Ull5Y/z58/vn5yclFITTE0DUOSNphdffHGA+ThAbHpIZ5599lnJ6b927doCRj4GpAJAuKztefvttwWIT37JrK6uDmPEBl73AaaVvLGBQXnAKUqOwKk9YmIg3d5555249aq/6Ve/qanJPPPMM8p787WcGMCiAXJIc7SvZpevfYDZizMSo6OjY4cOHbJxGcTrHO+DDz6QYIdxgk1tUcKTd5TIoiTHvMOlscOHD4eM+eXlZUlPAuJge3u7BYR9BSidwZg8/6/wG+NcCQCnMTbFeQfGdeO9IwIEMDIodZ+xzl3dgHISZTv47eBsFzqlGUUxomb4HkaixkQ7VBgURmIXLK4sLS1No/so9/gAM9jd3d0sm7TOHUXAztb0cnCQA+jJjVyu668ff1zE8ZnhyTHfIla9w01GgAiMr776Kovhq4pVKBrDkNaVlZUCXlgUtREeJ877BUhN4TxjHDlTKGdu377dwPqRo0ePzlKR5pFjFhcX21DoIIZ6qgjc80hK1nJJaXp6OgVYjSgb1NgxyLiF4euw7Hfxv76+Hv7888+LrIdO9VnHxlEcJWf2o3NzjRnlubm5tS+//HKGaFihUp2HjVE+ddezWfG7sEm5WryGAiQqwbUMnzp79uwjkK9QVr2HDx8eR+llvDJLGJnBwcEAQ+tryhn2zQLClOJYoAFglv/f0frMzIxAFF2DlpaWmOZUGimdJd0LCGLZvAZ7u/DuAXRRQo0NDw973OdQbkPJiB4ALd+6dWsG/Ue2AkWOMJz333zzzaSYJHMY8wpR6UmaOMWdfpRUJyYmcujx6KOPPlquxhegSIgSF56YO3PmzD4lQcXme++914lhuwBoAWXGqPf35D31H3jZB4SjMkYPYGUuX768KKVVJdQTaE1DgMA624eQR2zc64E1SyiT1xmAsv2GlOSMDG0kYfaIQRjRh9dvY1ARGdZ52vfjjz/mWBuR4WKRftHJshxW9HImpjl+s+SM4evXr8dw4om33nqrNQIEwDeuXLky/OGHH65sVuBS2bi1HiBE2GMy/ziCQ9FftCJ5BjRA3cTnOYzpJeYCSqK87qJ0YyQIKi5D2XRUmrnMKqlYv3HjhmUO8ptQ9kB0BqYpWRe0X/sEuIZYCmChcoUtN52d9eQYqycywiiR4wjLNg2BobGwsGDBZySiylkLMTmrHUBaIkBg/sY333yzDRBLq2IxdBVz2qQuEuRHP/vss4dQap71FSkr4XgxBjh78dwxeorgxIkTIf3DQiQI5tgcIVnyeFRO9TdlL+oVJCwbncEIT+BHRtb6Fgum2FOjvgVMIa6eBRa7tRxR4XcuqiYRINGZCJBay+AMDAyobVgghKzDBQjsHZaNO/NULAgcP2pwiHe13fUAsyhHjI+Pq1nrJckKdSGsRmwX9D7U29s7BHPGmeuoeaOTtRRjLuo+I4XVUiuMSNobKDaL4bY8wpojrKcBb0PlXcoKAIz3YWisllhDqtYcBpfRY2tp1v/nSaqqmqHOiTlRt4oOc7ClQSUcOR7VMj40NJQn0T6hJ2qAITMk4VW9Mjzt8d5//33rLZRNsOkMNNsN4qt6h6CHWOTSDNWjy60+KmM5jFgAvIAz3fIgLFPv0YYnCqzlAcfH2z7zgYwDxIpYI0A4v0tM4E6fvfMwLl9LoD53xxgHyTGdzFlk2fMf7i3IAECMSrI7MjLSBJCzEfiRMxQ+VLw0wO4VIHI+QCWRs3r37t0lwm0RxhXfeOONhJiFbdta7uGJJ9WORsaSQPslQIP//wllSxinXkM0dyMvcYEzNTVlPv3003UunyJ52oTI3x6XHSP0SlIO4xwAczFuUmUajxdIrGuUwzVAapaRyGygR0lTXUJA3kP+OELlcASSmMOao5DC01tDw+JAR+rBPpt4xXS90KoUiynkI4fKNEVTeVC9CHq04LRzMLUoVtFG6I4Y9y/iyEc4Ib+tS9/S82tDIxtkiIvAYCetyBt59q2owghhvP8E2gYA2K5yjlIuY+e5A+pMUWiSMMhg7CPO9HK2CWX7yBcVlFv49ddf1wjfOe6Wd0OSbZnKsI7xeb39Pv/8878hUg1PN+q8NVaWV0yyMWlczxUwIfeNA04c0LoFKEB4Fy5c8Ha81nSgk5La/a3vf1WmGEcJaBx0Qzx+CKoJGNst6sJaN7iOAWOAMaeQCPyYaW5qKuL9ITyax/sJlXCBE73my9sKRYzOKq/0dHWbYrmUgsZDVJ8ewFR+6QdsUViJ+8FWw8WCgHPSBVZsfWnTO9Rk9OZs53zXbLgVk3A925lgsBq6h0SA+qxuHPlHNi0D2G8vt6VS6BcC1/glvRm6ZnZmZoI8Ujje11ff3tHhEiYVoayyRuJdPnv6TIpYpRNaNn5Lo8kVCxJSqpQrI19c/sKFaT2nTp2MeWR8PFDBkEo2k5m5eOFCIUbu2aiUTEUVLdRnluzwyMORJPI6ka8k4/3yyy9lwsd4vrdpbCN9jarLItUFl06rqUSnYqIuMZ1aWzN1jQ2msb3N+AkSczwwuVClxzHZfM60x2LhzRs3Rx4MPUgPDgzU725v32nT0qVLl9K/qz4l3zFlj1FxTCGsqFLMuWr3Yah+JQAj7VjZyJi7E49NKps18ZakmUgt4UnPpHLrzKUr8br4hBG1dRbDYkHMFCtlMzI9aVZzWZNhX31QZ9y4b5bTa4CaT+OLtM7wzmByePof//6X9WReZbhrt6lHhwIC/WLFeJVQXF8gBZq6JCFct9fUtzVv7jcVIQJ7At8Mz46btTyddmrVoNecs9Mm9TP+0z8nOX+7dqVKP/4V8kUT86oguI4bfSOxoeAxbyQ4VGKuffApl4SsnQvLlSoe/C0fVxNg9QMRB9QUWWV8wkF3hRjgyQA6SH3scaySHswrb/YnCjnda9dNVXYRdnqErnKHsVWnYmVF+6N2IPpmowF1rexNm9QwEj7S8cKfX3vql7fANjuh/eQUemRrW6LD6OtUdTWaN1s+jkHT0Knqa5mhGSkdKhYcTJZXogTmulZS9QtQLVkqtivlkLOObd9RVoBXs6iF2t4ZXanPR5rUcavL9i9n4damzeYk8ksFxLyYv90mJ7LJdwAhOoCDSqaM6v8VYAC50wYd5lAviQAAAABJRU5ErkJggg==";
var transparentSettingIcon ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk1OUJBN0REM0JGRTExRTFBNzkxQjcxNzRDNjVFMTRBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk1OUJBN0RFM0JGRTExRTFBNzkxQjcxNzRDNjVFMTRBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTU5QkE3REIzQkZFMTFFMUE3OTFCNzE3NEM2NUUxNEEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTU5QkE3REMzQkZFMTFFMUE3OTFCNzE3NEM2NUUxNEEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4gaUvVAAAAc0lEQVR42sxUWwrAMAirZQfL0XMz97OvMW1k0k0olKDxkVZz99FpczSbSojrtBAiuD/asSCgkISVCiFie0VhgFHxtds7hBCU+swiWYRhywz5QmVGM4yCuMBHRohil/x0Oagqp3+Z1TarLbOSzH6/sU8BBgDqMCMZFWVGXAAAAABJRU5ErkJggg==";
var whiteLogo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAAUCAMAAAAHtrtKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM0NzQ3RjQ0MjA1NjExRTE4NDZEREI3NUM4NDYxRDMyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM0NzQ3RjQ1MjA1NjExRTE4NDZEREI3NUM4NDYxRDMyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzQ3NDdGNDIyMDU2MTFFMTg0NkREQjc1Qzg0NjFEMzIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzQ3NDdGNDMyMDU2MTFFMTg0NkREQjc1Qzg0NjFEMzIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7GY//sAAAAGFBMVEXr6+vLy8uhoaFwcHA5OTkBAQH///8AAABIhbzCAAABbElEQVR42sxUQbbEIAhDJPX+N54QqLbv/WUX38W0KRgxgbH1ybIvaSIX7m9ItIAOzTuCyc+LOE4o8nvSYIUPu67Lo5MHwSiUYETTB7PmNLvMJ3dV3oyiWZEwlzH4QkjgfOSp3HjtNU+eTmE1fqJMVtQEAD4HmMAC4kkzsFnESZrQhabXwd4EbqEDLN+15aZxLixXvUV2aHgdDEYTmGTjT1bmeh+qVDQueaNqlzyOcylzHos1i7wl3SBv54jNorzAvKqCkrjEsfSmwk0jUDQjpZRTO2RxWJIGZbH2+J80EM2jOtGoOtrZfYNAC9+R9eyT/eaiiecJ0xTuvpHRJRpkQEksv10sR2I/spl6Ke5h8DLc6gCp5OzrQBm+Xoa35CjD2dPV403TjQvgtFWUJGXImE+aumZv6i7ebTyyyo2ynDSRPBrV3QB48wz0aIItzHvIOqIQrLkm0ShLc9yYdE9+jua9Cx//3/wXmp8AAwBwCx5vyfmGLgAAAABJRU5ErkJggg=="
var whiteSettingIcon =  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAAgICCsrKz8/P1NTU42Njb6+vv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO80WnQAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAG5JREFUKFN9kNsOwCAIQ6vc/v+PV7v5MtlINHhCAYtqAr8wgNgFqgw+HfA7q1owBiwnMNMwFhUEMHh0bVi2yB225ZUs8Uy2HfnAcPbjEA2bTj17SqaKVPoNWzll56BqV2qXb7/ZGiLHDuveRrfOXxiWB20RU9kDAAAAAElFTkSuQmCC";
var fryBackground = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAa0AAAFeCAYAAAA2UECAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA0QjE1MENCM0NDMDExRTFCRDg2RDMxNjMzOUJCNEI1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA0QjE1MENDM0NDMDExRTFCRDg2RDMxNjMzOUJCNEI1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDRCMTUwQzkzQ0MwMTFFMUJEODZEMzE2MzM5QkI0QjUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDRCMTUwQ0EzQ0MwMTFFMUJEODZEMzE2MzM5QkI0QjUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz54bKT9AABinElEQVR42uy9y49zW5rm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";
var eggImage1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAD6CAMAAAC29cgwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU4QTIyN0YxM0Q5ODExRTFCREZFRUM1NzVCMUQyN0YzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU4QTIyN0YyM0Q5ODExRTFCREZFRUM1NzVCMUQyN0YzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NThBMjI3RUYzRDk4MTFFMUJERkVFQzU3NUIxRDI3RjMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NThBMjI3RjAzRDk4MTFFMUJERkVFQzU3NUIxRDI3RjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6ltkIlAAADAFBMVEV9op3rpHz3qX7///+rmpFWUElbHGaHXE2av7aDc5PqrYn5+flfImhzdHDFwJWJd3w1KClzh5rxqYDm5NXX0MzSycOsvKrma4vEurlwl5F0m5VxTz3v7eri3tthI2v19PRslI3u7Ouzy8O4vaqcbFPk7erq6ebHw8La1dPWwrb8/PyGq6RzU3hTKU7JknT0so21q6X/s4i6t7R8YYSXgnjXuqr+sYbz8vHEqpy3WW9hWlXKnIJLF1WDlqj/vJD7sIXloHr5roS7o5XFimiomKvJ3NjwrIXq5OH0q4HLtqrR4d3jtpV2iaHk4uCYrKPrxbDusr/CvZPovabq8vCTt63xuprLxqDb5uOofGOsqKahw7rNsqPXpYfx7+6alpOcwbjSu7HWmHP/t4piOU/V09HcmnSxinS4s4vYtphsOXT19PLGsaXWZ3h9k6bdm3izwa3Kw7re3Nz1rIL5+PeEaVve2dXX29j1r4fLztG3xLujhnSnoJzy9fTyroi2gGLW0rf8rYFjR2br8O2TjIjF0sr39vXUlHCrxbvSnHzAr6T5soq5k3/4rILSkm29uJHCoIuchpiIg3/1+PZ5lpw4EEDe1cmhgGyMsalzO322qry8hWXtqHr9///6/P1lJG/gooD3+vqivrn08/Khwbe+im2at7LAgmB5kor6+/tykJe5rcE/NzN4iqH3rYPinXauwK2ldFhKRT/8r4SicVateVzLjmuyfF6pdlqrwbB5npnEu6TlsI58j6POuZ//tYXal3GEhZxqYl+0r4cUCRGTZk9lMGvpn3f2sIN7SUdljYj7+/puiZX9sIPcfXTjonX8/Pv+/v51Q3mPpZ79/f36sYP9tILgkHW5TlB3i4SpcVJ8mZKFnZffoKb1ztPm5efk6Ob/wor5sX/77vD6toaGkY73uobQzK2XuLGWdmLwq4N/XEjWrZXUs4/Xmaf39/fbpLHlhJL4r4f9/v7dgXh0hp/k2+alkoLz8PTw9PLUytbO2NT9tIv4q4GOcF/zqoH///9QSBNCAAABAHRSTlP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AU/cHJQAAHEtJREFUeNrEnAlcE3e+wEloJiCgMHIoCIoERA41pg4eg0NMi2MFum5dq1ZFg9SDS4e1tStm0a7UY2OrprUbWujarcLDSUIOQE5RsDSiRqM9trvdu5/6Dt7Wx+v2vb4m7z+TQCZhghyT7u+DRzUfvvO7f//ff6yf/Z8gKfus1C9+PzzZEv6qYFvsP4Vt7m4QCARnYn9wdkr8vG0NjQJADzH/sOy9815tFAi6u7sBvDH8h2Sb551pFCzv7l4OpLGhcVvGD8feuw2Ql9Nk4O+GxsZtPwi7PCk3PvdMo0NliiwAejc+4Wv2owPWrYtfbWxsbGhoaKS1FgjAF/ivQ7N9yrYmHVzcvbwhNBSENo2nsI7fNTbE+jLW/HMPUdpSHCBOS1PkUOqPzlh8yE4OAQg6rgUOi4NIA7Zevu/RK+BvQi74sLaELwf+Dbn02+jo314KAXjK4ADeGAH+Ln7nAbMPa6p1eYMg5Eqqn0Ou0PRGEGqCra7P+Ip9sEHwKSBfiY520rsBXADsP8/n7KAzgkt+V/z8oufMmenUPYQq48sFh6y+Zicv/200QPvNnDMHKB5NaZ8aQsf58p0+Zlt2XnIaeyb45cqcj+ZQD9INyrhAcMDH7JdSZ865cmUOTaTYzt9ROdad5Ft2UiTws1/0Rx9FAy7lb2B/yg4hAkHoYn+fspPmngd+ptQFNqfMTaHnfBSdSrGTfRrnltc2n4922XsmzQU/ZvpdAWU13qfsbwM2rx9mU0IbP3om+INugSDXl+yziQH5AcDeQFVApFLMb6jAUDke7kP2ncSAgIDNqXNo8QPZFe0obvRTfOpTtuVoAMWmjP4R7eqZznijnoSy+X7fsd/LTzya6FScKiupqZ9/Hv0RFfDUUwgafdlLLGaLfSDf4XEAS/1U0H3P78oVEGfg65JAsCnFt73k23yn1WcC9PJLqZTV6Wj7VHCGEea+YAdR0RaQvx5kVbejm12hkhtEe0jjPLtP2WYaTWmeCmajT6miBpI7OnrmHL/uEItP2SlO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";
var eggImage2 ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGsAAAD6CAMAAACRW0nYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU1NzRDRDRGM0Q5ODExRTFCMjUxQUI5RjI5RUVDQ0E2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU1NzRDRDUwM0Q5ODExRTFCMjUxQUI5RjI5RUVDQ0E2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTU3NENENEQzRDk4MTFFMUIyNTFBQjlGMjlFRUNDQTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTU3NENENEUzRDk4MTFFMUIyNTFBQjlGMjlFRUNDQTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4nMiTyAAADAFBMVEWmpn58opyLmHvUpm2rlod3d3HFklKqVQn6u5HGvqdWT0nVvKKcwLetfV3Wxrv+wpXJycbsq4ClxLv5soW3ysLt7OqUubLl3df6+fj+/v7bnXT/uoqqpn2Tt6/juZj9tYbGwb1iW1TI2tXb0Mjz6uVsZl/Xy8HxrH25pJfGl3e1xbnk4+DrtI52nJbXbAyRp5PHvLSNfG+nuKf5t4nLkmzVdBvy7+zj4N3jo3m0wq3/vo7HqpbKoonVmXG1rKXWpITn1cr7xqOZvrX1sYP8/PzabQ3Y4dzTeynS1NTI0su3z8mIq6K2poW/ubP80rTtqXvQlm7hbgb19fTztYrq6Oapp6GojHr4sIHq5uLe3NrFjWm6s621lH2YUBCqspT6tIaJppmog2veoXjd2dWVVyT9toeqyMCWko3cspf8uY3zupS2jnSoeFlLRj/d5eKTaUnR2dP+soKtn5bVrZP/uIi0gmHqxKmcinzjvqXS3tnl7Orr8O7x8e+jrIyemJPzroD08vGkb0n7/PxxUDiLiILMYgSLsajw9fftzbibdFn/uIp4i4P49vS8i2v82MDr8fKbYjXj6OTTnXn/uoipvrX2+fqctaryvpvxyq+Xpov4+Pe9nIY4NC/fcAtrk4y5hWLa1NDgj0b08/Lj5ujopnq+iGX8///7uotBPTf5uY9xQRv/uYf/toSes6HGahe/1c+cvrj7+vqefmi8Wwf7vY78t4mzeVH+todvl5Gvwa/Hr13/u4ugc1XaagakqYSYbVG5o1HbZgGlp4Ckdlj9uYmRt7D7soS3oXXLgTiym0u1gV6YoH2srIlmj4jVaAWrqYTkqYD+/v2AWkGIZEj+tIZ/az2+mmfrpXba3uCLoYyKdkGur6+plUmGmYf8/PuUsaSumGqhjUj2uI2Vd0iCm5OfoJ+Ugz/SZAL+/f75+/uheVSrdU6Ocl/9/f3Ar6T9uoukj1jQwLW3aySVtK2fuK2drpz/s4PesILBxK3awbB+aVn8tIb39/awhmr6s4X///+9i3XoAAABAHRSTlP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AU/cHJQAAG9RJREFUeNrsnAlYE9e+wMHKIhBDGEhJBhmoAspWl4AxGhcioiAlLApGcTQS3EIVHK7VQuNWWlFfrdUuKsaLxGqp14s87oATQHYERVDrXtvaTW8ven1efa+NTd6ZbEBIIFvv973ve38wBJPMb/7n/NdzZnBQ/fvE4f9Z/ydYjN7efxcr7O47iwJK/y0sz8AcN7dAJ58/nFWx6secozk5OW45q/9o1ra7QW6BQHJOubll/KGsXp+7ToGBQYDldionx/MPZDEOL5npRILUrFOnAv4YFgN8VyxJfEeLcnMjWRPtzmIwGC9XzQ8Lm7/ICYweYLmRKLejp3LG2pfFSJl6fH7AaqegXbucwLgdzVErBczw1NFTgWl2ZfUuWa02upxTp3JIZcDIgQeSl5Nz1L42P3fVrsBTpCuRsKOn3NS2HvhjWJjn0tVBTtH2ZPl67gIG7kSKWhESFuR2twIM7aGCE3vtGKMYaYucgvZEODomODo6RuwJygEDGBgUtGsJw+5xnnHcyWmPI4khHwDQyU0NW+Rj/5yS5rRHTam+fMxRQ9tDwv4I1v3QHyKqScQxNSuC5JIwN/uPIWPrs+pjar0iqsGPiGOXATjBCcxZ0N2XdmalxEdUVzuS/9SiZTmS5uiUZl/Wo3ktxwDn2OXLOsWqyXFUT5lbmF1ZO7bGJ5Cs6mMAcZmcMICrPgZ+BrnluBXYk8V4+6yXmqUWEkhyqi9fBooF5gT62pP13mteHmpWwooVGh5pjOrJiwh0C7IrS+Xp5dECLOPrIKcEx2pyuhyrNR7tCDzaaa49Wau8Yjw8fnAKPOq2h1SpWute1aSjOQW902s3VkWYt4eHR+iqpUePBlaT9gFYEceAr0VcJi1lT1CAvViH084CpUI3gqdBQX0jF7HH6UdHEpjg5DTVLjGqomBefLZHjMfB+WRtezBCEzlI4A9BgbsS1APp9M5cO7AKpsZnewGSh8fBmlCv0INeRcdITYCpO/7wW85RJ7WCq53m2947lG4kp4kkaQU8TQCw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";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//Default CSS
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var defaultCSS = '/*CLEAR*/*{padding:0;margin:0}body{background-image:none;font-family:verdana;font-size:10px;padding:0}a{color:black;text-decoration:none}a:hover{color:white}input{padding:0 5px;} .bar_link{color:black;cursor:pointer;display:inline-block;font-family:Helvetica;font-size:11px;font-weight:bold;height:20px;line-height:20px;opacity:1;padding:0 5px;text-decoration:none;vertical-align:top}.post_text img{max-width:100%}.post_text img:hover{box-shadow:0 0 10px white;-webkit-box-shadow:0 0 10px white;}.submenu{border-bottom: 3px solid #C8C4A0;margin:0 10px 5px}h2.submenu{border-bottom: 0px }.option_square:hover{box-shadow:0 0 15px black;-webkit-box-shadow:0 0 15px 0 black}.option_square{background-color:white;border:1px solid darkGoldenRod;cursor:pointer;display:inline-block;font-family:Verdana;font-size:10px;height:25px;line-height:25px;margin:0 5px 0 0;overflow:hidden;text-align:center;vertical-align:top;width:50px}#container{margin:0 auto;padding:30px 0}#root{padding:0 10px}.info_line_date_value{min-width:70px;max-width:80px}.root_button,.next_button,.prev_button,.info_line_date_value{float:right;margin:0 5px}.show_button{display:none}.me{background-color:darkorange;padding:0 3px 1px}.reply{margin-left:50px}.post{margin-bottom:10px;min-height:50px;position:relative;}.post_text{color:black;font-family:Verdana;font-size:11px;margin-left:47px;margin-top:3px;padding:0 2px;text-align:justify}.post_text a{color:#10236d}.post_text a:hover{color:white}.reply .info_line_from{margin-right:-30px}.info_line_to{float:left;text-align:left;width:25%}.info_line_date{float:right;text-align:right;width:28%}.next_button:hover,.root_button:hover,.prev_button:hover{cursor:pointer;text-shadow:1px 1px 1px #98aca8}.root_button,.next_button,.prev_button{cursor:pointer;font-family:Verdana;text-shadow:1px 1px 1px #98aca8}.info_line_delete{color:gray;left:5px}.info_line_from{float:left;margin-left:5px;width:45%}.me_post{color:#464646}.info_line strong{font-size:12px;line-height:15px}#messageField{margin:0 auto}.info_line{background-color:#c8c4a0;border-radius:5px 5px 5px 5px;box-shadow:0 0 3px #333;-webkit-box-shadow:0 0 3px #333;color:gray;font-family:Helvetica;font-size:10px;height:14px;line-height:14px;margin-left:45px;position:relative}.new_post{background-color:#e8e28d}.new_button{visibility:visible;background-color: #E8E28D;color: black;cursor: pointer;margin: 5px 0 0;text-align: center;}.last_button{visibility:visible;color: black;cursor: pointer;margin: 5px 0 0;text-align: center;}.level_picture{display:block;height:5px;width:40px}.identity_picture{display:block;height:50px;width:40px}.identity{float:left;height:50px;padding:0;text-align:right;width:40px}.bar_link:hover{color:red}.icon_picture{cursor:pointer;width:40px;height:50px;display:block;border-radius:5px 5px 0 0}hr{color:#c8c4a0;background-color:#c8c4a0;border:0;height:2px}.room_info{display:inline-block;position:absolute;right:5px;}.room_name{display:inline-block}.room.new_posts{font-weight:bold}.room.hidden_room{display:none}.hide_post{max-height:10px;min-height:10px}.hide_post .identity{position: absolute;top: -40px;visibility: hidden;}.hide_post .show_button{cursor:pointer;display:inline-block;float:left;margin-left:0;padding:0 4px;width:32px;font-size:8px;text-align:center;}.hide_post .post_text{display:none}.pagination{border-top:2px solid #c8c4a0;font-size:15px;margin-top:20px;text-align:center}.pagination a{color:#10236d}.pagination a:hover{color:white}#roomList{position:relative;}#roomListQuick{visibility:hidden;background-color:#98aca8;border:3px solid #c8c4a0;z-index:1000;color:black;height:90%;overflow:auto;padding:5px;position:fixed;width:390px}#roomListQuick a{color:black}#roomListQuick a:hover{color:white;}.room a:hover{color:white;}#logoLink{cursor:pointer;background-color:black;color:white;display:inline-block;font-family:helvetica;font-weight:bold;font-size:14px}#userListQuick{z-index:1000;right:90px;position:fixed;background-color:#98aca8;border:3px solid #c8c4a0;border-radius:5px 5px 5px 5px;-webkit-border-radius:5px 5px 5px 5px;box-shadow:0 0 10px;padding:5px;visibility:hidden}#messageArea{margin:10px 0;width:100%;height:100px}#message{background-color:#98aca8;border:3px solid #c8c4a0;min-height:160px;margin:5px;padding:5px;position:fixed;visibility:hidden;min-width:580px;z-index:1000}#message input{margin-right:5px}#spacer{margin:0 auto;width:600px;height:190px;display:none}#closer{visibility:hidden;width:100%;height:100%;z-index:100;background-color:black;opacity:.6;position:fixed;top:0}.pitrisButton{cursor: pointer;background:none repeat scroll 0 0 #85948f;border:1px solid black;color:black;display:inline-block;font-weight:bold;height:auto;margin:2px 6px 2px 0;text-align:center;padding:0 5px;min-width:35px}#messageClose{position: absolute; top: -1px; right: 2px; cursor: pointer;}#messageWarning{display: inline-block;margin-left:5px;font-size:12px}#settingMenu{z-index:1000;visibility:hidden;position:fixed;display:block;width:400px;max-height:95%;right:10px;top:10px;border:3px solid #C8C4A0;box-shadow:0 0 5px 1px;-webkit-box-shadow:0 0 5px 1px black;background-color:#98aca8;overflow:auto;background-position:center;background-repeat:no-repeat}#pitrisDiv{float:right}.custom_input{margin:5px 0}#scoreBar{z-index:100;box-shadow:0 0 10px 0;-webkit-box-shadow:0 0 10px 0 black;line-height:20px;display:block;height:20px;position:fixed;width:100%}#menuDiv{display:inline;position:absolute;right:0px;}#settingImage{cursor:pointer;} .red_color{color: red;}#cssNew{visibility:hidden;background-color: #98ACA8;border: 3px solid #C8C4A0;box-shadow: 0 0 10px black;-webkit-box-shadow: 0 0 10px black;display: block;height: 95%;left: 20px;position: fixed;top: 10px;padding:0px 10px;width: 790px;}#cssName{width:100%;}#cssStyle{font-family:monospace;width:100%;height:82%;}';



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function startup(){
    var wParam = getUrlParameter("w");
    var kParam = getUrlParameter("kr");

    //DOM-Fu

    //favicon();

    if(wParam == false || wParam == 1) {
        if(debug) console.log("Script je v seznamu místností");
        //co se spusti v seznamu mistnosti
        innerScripts();
        deleteJunk();
        deleteJunkMainPage();
        roomHighlight();
        loadUsers();
        barList();
    }else if (wParam==2){
        if(debug) console.log("Script je v v místnosti");
        innerScripts();
        deleteJunk();
        hideMessageArea();
        barRoom();
        rebuildPosts();
        loadUsers();
        fixImages();
        loadFavorites();
    }

    //CSS-Fu
    settings();
    dePitrisation();
    //setStylesRebuild();
    setStyles();

}
//---------------------------------
try{
    if(debug) console.time("timer");
    if(debug) console.log('Start scriptu');

    startup();

    if(debug) console.log('Konec scriptu');
    if(debug) console.timeEnd("timer");
}
catch(err){
    console.error(err +" --- "+ err.toSource());
    console.log("Chyba!");
}
