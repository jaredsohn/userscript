// ==UserScript==
// @name           DLGPad
// @namespace      http://www.crisi.ch/dlgpad
// @description    Notepad tool for DLG community
// @include        http://www.dotalicious-gaming.com/*
// @include        http://*.dotalicious-gaming.com/*
// ==/UserScript==




window.addEventListener("load", dlgpad);


function dlgpad() {


    var txt = {};
    txt.helloAnon = "I need your profile id, please click on <i>My Profile</i>";
    txt.helloPlayer = function(id) {
        return "Hi " + id;
    }
    txt.isThisYourId = function(id) {
        return "Is this you profile id? " + id;
    }
    txt.getLatestGm = "Download the latest Greasemonkey to use this script";
    txt.pleaseEnterNote = "Please enter a note:";
    txt.inTheSameGame = function(user) {
        var notes = user.notes;
        var string = user.name + " [ ";
        for (var i = 0; i < notes.length; i++) {
            string += notes[i].text + ". "
        }
        string += "]";

        return string;
    }
    txt.notedPlayerDetected = "There is a noted player ingame";


    if (GM_setValue && GM_getValue && GM_registerMenuCommand) {

        GM_registerMenuCommand("Export DLGPad", exportDlgpad);

        dlgPadBar();

        if (idExists()) {
            status(txt.helloPlayer(GM_getValue("id")));

            if (inMemberSearch())
                appendAddIconToMemberSearchResultEntries();

            if (inGameArea()) {
                var interval = setInterval(checkPadForNotedPlayers, 2000);
                //TODO cancel interval if game started
            }

        } else {
            status(txt.helloAnon);

            if (inProfilePage())
                saveIdOfLoggedInPlayer();
        }
    } else {
        alert(txt.getLatestGm);
    }


    function checkPadForNotedPlayers() {
        var existingUsers = getExistingUsers();
        var playersInGrid = getPlayersFromGrid();

        if (existingUsers.length > 0) {
            for (var i = 0; i < playersInGrid.length; i++) {
                var player = playersInGrid[i];
                for (var j = 0; j < existingUsers.length; j++) {
                    var user = existingUsers[j];

                    if (player.id == user.id && player.name == user.name) {
//                        status(txt.inTheSameGame(user));
                        status(txt.notedPlayerDetected);

                        var userLinks = document.getElementsByClassName("userlink");
                        for (var i = 0; i < userLinks.length; i++) {
                            userLinks[i].parentNode.removeAttribute("style");
                            if (userLinks[i].innerHTML == user.name) {
                                userLinks[i].parentNode.setAttribute("style", "border: 1px solid red; background-color: #FF7373;");
                            }
                        }
                    }
                }
            }
        }
    }

    function exportDlgpad() {
        var existingUsers = getExistingUsers();
        status(JSON.stringify(existingUsers));
    }

    function getExistingUsers() {
        var existingUsers = new Array();

        if (GM_getValue("list", "") != "") {
            var existingUsersString = GM_getValue("list");
            existingUsers = JSON.parse(existingUsersString);
        }

        return existingUsers;
    }

    function getPlayersFromGrid() {
        var playerTable = document.getElementById("playertable");
        var tableRows = playerTable.getElementsByTagName("tr");

        var usersInGrid = new Array();

        var counter = 0;
        for (var i = 2; i < 7; i++) {
            var tableCells = tableRows[i].getElementsByTagName("td");

            if (tableCells[1].getAttribute("class") == "lal" && tableCells[1].firstChild.innerHTML != "open slot") {
                var sentinelUserLink = tableCells[1].firstChild;
                var sentinelUser = {};
                sentinelUser.id = getIdFromUrl(sentinelUserLink.href);
                sentinelUser.name = sentinelUserLink.innerHTML;
                log("sentinel: " + counter + " " + sentinelUser.name);
                usersInGrid[counter] = sentinelUser;
                counter++;
            } else {
                log("cant get sentinel player...");
            }

            if (tableCells[12].getAttribute("class") == "lal" && tableCells[12].firstChild.innerHTML != "open slot") {
                var scourgeUserLink = tableCells[12].firstChild;
                var scourgeUser = {};
                scourgeUser.id = getIdFromUrl(scourgeUserLink.href);
                scourgeUser.name = scourgeUserLink.innerHTML;
                log("scourge: " + counter + " " + scourgeUser.name);
                usersInGrid[counter] = scourgeUser;
                counter++;
            } else {
                log("cant get scourge player...");
            }
        }

        return usersInGrid;
    }

    function dlgPadBar() {
        if (isNoIframe()) {
            var buttonStyle = "border-radius:2px; margin:0; padding:10px; border-right:1px solid lightgrey; height:100%; float:left; cursor: pointer; text-align:center;";

            var bar = document.createElement("div");
            bar.setAttribute("style", "position:fixed; z-index:9999; top:200px; left:5px; margin:0; padding:5px; box-shadow:0 0 5px #888; border:1px solid grey; background-color:#F3F3F3;");
            bar.setAttribute("id", "dlgpad");

            var status = document.createElement("p");
            status.setAttribute("style", "position:fixed; top:0; left:50%; width:200px; margin:0 0 0 -100px; text-align:center; background-color:white; padding: 20px; font-size: 10px; font-family:Verdana, sans-serif; box-shadow:0 0 5px #888; border-top:1px solid #D0DCEC;")
            status.setAttribute("id", "dlgpad_status");

/*            var resetListIcon = document.createElement("img");
            resetListIcon.setAttribute("src", "http://gm.crisi.ch/delete.png");
            resetListIcon.setAttribute("style", "cursor: pointer; display: block; margin-bottom: 5px;");
            resetListIcon.setAttribute("title", "Reset DLGPad");
            resetListIcon.addEventListener("click", function() {
                if(confirm("This will DELETE ALL ENTRIES in your DLGPad, are you sure?")) {
                    GM_setValue("list", "")
                }
            });
            resetListIcon.appendChild(document.createTextNode("DEL LIST"));*/

/*            var resetIdButton = document.createElement("p");
            displayListIcon.setAttribute("src", "http://gm.crisi.ch/delete.png");
            resetIdButton.setAttribute("style", "cursor: pointer;");
            resetIdButton.setAttribute("title", "Reset profile id");
            resetIdButton.addEventListener("click", function() {
                GM_setValue("id", "")
            });
            resetIdButton.appendChild(document.createTextNode("DEL ID"));*/

            var displayListIcon = document.createElement("img");
            displayListIcon.setAttribute("src", "http://gm.crisi.ch/show.png");
            displayListIcon.setAttribute("style", "cursor: pointer; display: block;");
            displayListIcon.setAttribute("title", "Show DLGPad");
            displayListIcon.addEventListener("click", function() {
                showNotedPlayers();
            });
            displayListIcon.appendChild(document.createTextNode("SHOW LIST"));



//            bar.appendChild(resetIdButton);
//            bar.appendChild(resetListIcon);
            bar.appendChild(displayListIcon);
            document.getElementsByTagName("body")[0].appendChild(status);

            document.getElementsByTagName("body")[0].appendChild(bar);
        }   
    }


    function isNoIframe() {
        var url = window.location.href;
        var iframe1 = "http://www.dotalicious-gaming.com/playad.php";
        var iframe2 = "http://www.dotalicious-gaming.com/gamead.php";
        
        return url != iframe1 && url != iframe2;
    }

    function showNotedPlayers() {
        closeNotedPlayers();
        
        var notedPlayersView = document.createElement("div");
        notedPlayersView.setAttribute("id", "dlgpad-notedplayers");
        notedPlayersView.setAttribute("style", "position:fixed; top: 0; left:50%; width:500px; z-index: 9999; background-color: white; margin: 0 0 0 -250px; padding: 20px; font-size: 10px; font-family:Verdana, sans-serif; box-shadow:0 0 5px #888; border-top:1px solid #D0DCEC;");

        var closeButton = document.createElement("img");
        closeButton.setAttribute("src", "http://gm.crisi.ch/close.png");
        closeButton.setAttribute("style", "position:absolute; top:5px; right:5px; cursor: pointer;");
        closeButton.addEventListener("click", closeNotedPlayers);
        notedPlayersView.appendChild(closeButton);

        var existingUsers = getExistingUsers();
        for (var i = 0; i < existingUsers.length; i++) {
            var u = existingUsers[i];

            var playerDiv = document.createElement("div");
            playerDiv.setAttribute("style", "overflow: auto;");

            var playerDataDiv = document.createElement("div");
            playerDataDiv.setAttribute("style", "float: left; width: 240px;");

            var playerP = document.createElement("p");
            var playerDate = new Date(u.timestamp).toDateString();
            playerP.innerHTML = "[" + playerDate.substr(4) + "] " + u.name;
            playerDataDiv.appendChild(playerP);

            var playerNotesDiv = document.createElement("div");
            playerNotesDiv.setAttribute("style", "float:right; width: 240px;");
            for (var j = 0; j < u.notes.length; j++) {
                var n = u.notes[j];

                var playerNoteP = document.createElement("p");
                var noteDate = new Date(n.timestamp).toDateString();
                playerNoteP.innerHTML = "[" + noteDate.substr(4) + "] " + n.text;
                playerNotesDiv.appendChild(playerNoteP);
            }

            playerDiv.appendChild(playerDataDiv);
            playerDiv.appendChild(playerNotesDiv);

            notedPlayersView.appendChild(playerDiv);
        }

        document.getElementsByTagName("body")[0].appendChild(notedPlayersView);

    }

    function closeNotedPlayers() {
        var notedPlayersView = document.getElementById("dlgpad-notedplayers");
        if(notedPlayersView != null)
            document.getElementsByTagName("body")[0].removeChild(notedPlayersView);
    }

    function status(msg) {
        var status = document.getElementById("dlgpad_status");
        status.innerHTML = msg;
    }

    function getIdFromCurrentUrl() {
        return getIdFromUrl(window.location.href);
    }

    function getIdFromUrl(url) {
        var id = 0;
        var arr = url.split("u=");
        if (arr.length > 1) {
            id = arr[1];
        }
        return id;
    }

    function appendAddIconToMemberSearchResultEntries() {
        var membersTr = document.getElementById("mlist").getElementsByTagName("tbody")[0].getElementsByTagName("tr");

        for (var i = 0; i < membersTr.length; i++) {
            var usernameTd = membersTr[i].getElementsByTagName("td")[1];

            var img = document.createElement("img");
            img.src = "http://gm.crisi.ch/add.png";

            var a = document.createElement("a");
            a.setAttribute("style", "cursor:pointer");
            a.setAttribute("title", "Add this user to your DLGPad");
            a.addEventListener("click", addUserEvent);

            a.appendChild(img);
            usernameTd.appendChild(a);
        }
    }

    function addUserEvent(e) {
        var node = getClickedTargetNode(e);
        var userNode = node.parentNode.previousSibling;

        var id = getIdFromUrl(userNode.href);
        var name = getLastWordFromString(userNode.title);
        var text = prompt(txt.pleaseEnterNote);
        if (text == null) text = "";

        var user = new User(id, name, new Array(new Note(text)));
        addUser(user);
    }

    function User(id, name, notes) {
        return {"timestamp": new Date().getTime(), "id": id, "name": name, "notes": notes}
    }

    function Note(text) {
        return {"timestamp": new Date().getTime(), "text": text};
    }

    function addUser(user) {
        var userString = JSON.stringify(new Array(user));

        if (GM_getValue("list", "") == "") {
            GM_setValue("list", userString);
            log(userString);
        } else {
            if (isDuplicateUser(user)) {
                log("dupl detected");
                GM_setValue("list", consolidateWithExistingUsers(user));
            }
            else {
                var existingUsers = getExistingUsers();
                existingUsers.push(user);
                GM_setValue("list", JSON.stringify(existingUsers));
            }

        }

        status(user.name + " noted");
    }

    function isDuplicateUser(user) {
        var isDuplicate = false;
        var existingUsers = getExistingUsers();

        for (var i = 0; i < existingUsers.length; i++) {
            if (existingUsers[i].id == user.id && existingUsers[i].name == user.name) {
                isDuplicate = true;
                break;
            }
        }

        return isDuplicate;
    }

    function consolidateWithExistingUsers(user) {
        var existingUsers = getExistingUsers();

        for (var i = 0; i < existingUsers.length; i++) {
            if (existingUsers[i].id == user.id && existingUsers[i].name == user.name) {
                var newNotes = existingUsers[i].notes;
                var userNote = user.notes[0];
                newNotes.push(userNote);
                existingUsers[i].notes = newNotes;
                break;
            }
        }

        return JSON.stringify(existingUsers);
    }

    function getLastWordFromString(string) {
        var arr = string.split(" ");
        var lastWord = arr[arr.length - 1];

        return lastWord;
    }

    function getClickedTargetNode(e) {
        var event = e || window.event;
        if (!event.target) event.target = event.srcElement;

        return event.target;
    }

    function log(msg) {
        GM_log(msg);
    }

    function idExists() {
        return GM_getValue("id", "") != "";
    }


    function saveIdOfLoggedInPlayer() {
        var id = getIdFromCurrentUrl();
        if (confirm(txt.isThisYourId(id))) {
            GM_setValue("id", id);
            status(txt.helloPlayer(id));
        }
    }

    function inMemberSearch() {
        return window.location.href.indexOf("dotalicious-gaming.com/index.php?action=mlist;sa=search") != -1;
    }

    function inGameArea() {
        return window.location.href.indexOf("dotalicious-gaming.com/index.php?action=dota;area=game&game=") != -1;
    }

    function inProfilePage() {
        return window.location.href.indexOf("dotalicious-gaming.com/index.php?action=profile;u=") != -1;
    }


}