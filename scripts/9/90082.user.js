// -----------------------------------------------------------------------------
//
// ==UserScript==
// @name          oase User and Postings Ignore List
// @namespace     waiting4wind
// @description   oase.surfforum.com - Ignore function for users and postings.
// @include       http://surfforum.oase.com/showthread.php?*
// ==/UserScript==
//
// -----------------------------------------------------------------------------

GM_registerMenuCommand("Edit Ignore User List", editUserList);
GM_registerMenuCommand("Edit Ignore Post List", editPostList);
GM_addStyle("span{font-weight:bold;} a.panelrow:link{color: #FFFFFF;text-decoration: none;}  a.panelrow:visited{color: #FFFFFF;	text-decoration: none;} a.panelrow:hover, a.panelrow:active{	color: #FFFFFF;	text-decoration: underline;}");

var userNamen, postIDs, postTable, tablePanel;
userNamen = document.evaluate("//a[@class = 'bigusername']/text()", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
postIDs = document.evaluate("//a[contains(@id, 'postcount')]", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
tablePanel = document.evaluate("//a[contains(@id, 'postcount')]/ancestor::td", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
postTable = document.evaluate("//a[contains(@id, 'postcount')]/ancestor::tbody", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

init();

function init() {
    userblacklist = getIgnoreList("userblacklist");
    postblacklist = getIgnoreList("postblacklist");

    for (var i = 0; i < userNamen.snapshotLength; i++) {
    		toggle = false;
        var panel = document.createElement("span");
        panel.id = "panel" + i;
        userNamePanel = document.createElement("span");
        userNamePanel.id = "usernamepanel" + i;
        userNamePanel.setAttribute("style", "padding-right: 32px;");

        userIgnorePanel = document.createElement("span");
        userIgnorePanel.id = "userignorepanel" + i;
        userIgnorePanel.setAttribute("style", "padding-right: 16px;");

        postIgnorePanel = document.createElement("span");
        postIgnorePanel.id = "postignorepanel" + i;
        postIgnorePanel.setAttribute("style", "padding-right: 16px;");

        hideShowPanel = document.createElement("span");
        hideShowPanel.id = "hideshowpanel" + i;
        hideShowPanel.setAttribute("style", "padding-right: 16px;");

				userName = userNamen.snapshotItem(i).data;
				postID = postIDs.snapshotItem(i).id.slice(9, postIDs.snapshotItem(i).id.length);
				checkUserName = checkList(userblacklist, userName);
				checkPostID = checkList(postblacklist, postID);

				
        if (checkUserName >= 0 || checkPostID >= 0) {
						toggle = true;
						userIgnorePanel.appendChild(createAnchor("rem", i));
						postIgnorePanel.appendChild(createAnchor("rep", i));
            hideShowPanel.appendChild(createAnchor("show", i));
	 	          if (checkUserName >= 0) postIgnorePanel.setAttribute("style", "display:none");
 		          if (checkPostID >= 0) userIgnorePanel.setAttribute("style", "display:none");
        } else {
            hideShowPanel.appendChild(createAnchor("hide", i));
            userIgnorePanel.appendChild(createAnchor("add", i));
            postIgnorePanel.appendChild(createAnchor("adp", i));
        }

        panel.appendChild(userNamePanel);
        panel.appendChild(userIgnorePanel);
        panel.appendChild(postIgnorePanel);
        panel.appendChild(hideShowPanel);
				tablePanel.snapshotItem(i).insertBefore(panel, tablePanel.snapshotItem(i).firstChild);
				if(toggle) togglePost(i,1);

    }
}

// --- event functions start -------------------------------------
function show(event) {	
    var uid = event.target.id.slice(3, event.target.id.length);								//	get id
		togglePost(uid,0);
    var temp = document.getElementById("hideshowpanel" + uid);								
    temp.replaceChild(createAnchor("hide", uid), temp.firstChild);						//	toggle link
}

function hide(event) {
		var uid = event.target.id.slice(3, event.target.id.length);
		togglePost(uid,1);
    var temp = document.getElementById("hideshowpanel" + uid);
    temp.replaceChild(createAnchor("show", uid), temp.firstChild);
}

function addPost(event) {
    var uid = event.target.id.slice(3, event.target.id.length);
    var postID = postIDs.snapshotItem(uid).id.slice(9, postIDs.snapshotItem(uid).id.length);
    var postblacklist = getIgnoreList("postblacklist");
    if (checkList(postblacklist, postID) < 0) {
        postblacklist.push(postID);
        setIgnoreList(postblacklist,"postblacklist");
        update(postID, "addPost");
    }
}

function removePost(event) {
    var uid = event.target.id.slice(3, event.target.id.length);
    var postID = postIDs.snapshotItem(uid).id.slice(9, postIDs.snapshotItem(uid).id.length);
    var postblacklist = getIgnoreList("postblacklist");
    var index = checkList(postblacklist, postID)
    if (index >= 0) {
        var newPostIgnoreList = new Array();
        for (var i = 0; i < postblacklist.length; i++) {
            if (i != index) {
                newPostIgnoreList.push(postblacklist[i]);
            }
        }
        setIgnoreList(newPostIgnoreList,"postblacklist");
        update(postID, "remPost");
    }
}

function addUser(event) {
    var uid = event.target.id.slice(3, event.target.id.length);
    var userName = userNamen.snapshotItem(uid).data;
    var userblacklist = getIgnoreList("userblacklist");

    if (checkList(userblacklist, userName) < 0) {
        userblacklist.push(userName);
        setIgnoreList(userblacklist,"userblacklist");
// if posts from this user are blacklisted then delete them first
		    postblacklist = getIgnoreList("postblacklist");
				userPosts = document.evaluate("//a/text()[starts-with(.,'" + userName + "')]/ancestor::div[contains(@id, 'postmenu_')]",document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
     		for(i=0;i<userPosts.snapshotLength;i++){
					pid = userPosts.snapshotItem(i).getAttribute("id");
		    	index = checkList(postblacklist, pid.slice(9,pid.length))

				    if (index >= 0) {
				        var newPostIgnoreList = new Array();
				        for (var i = 0; i < postblacklist.length; i++) {
				            if (i != index) {
				                newPostIgnoreList.push(postblacklist[i]);
				            }
				        }
				        setIgnoreList(newPostIgnoreList,"postblacklist");
				        update(pid.slice(9,pid.length), "remPost");
				    }
					
   			}
        update(userName, "addUser");
    }
}

function removeUser(event) {
    var uid = event.target.id.slice(3, event.target.id.length);
    var userName = userNamen.snapshotItem(uid).data;
    var userblacklist = getIgnoreList("userblacklist");
    var index = checkList(userblacklist, userName)
    if (index >= 0) {
        var newUserIgnoreList = new Array();
        for (var i = 0; i < userblacklist.length; i++) {
            if (i != index) {
                newUserIgnoreList.push(userblacklist[i]);
            }
        }
        setIgnoreList(newUserIgnoreList,"userblacklist");
        update(userName, "remUser");
    }
}

function togglePost(uid, status){

			userT = (status == 0)? "" :  "Member: " + userNamen.snapshotItem(uid).data;
//			colorT = (status == 0)? "bbccdd" : "F6F6F6";
			displayT = (status == 0)? "" : "none";
//			postTable.snapshotItem(uid).childNodes[0].childNodes[1].setAttribute("style", "background-color:#" + colorT);
//			postTable.snapshotItem(uid).childNodes[0].childNodes[3].setAttribute("style", "background-color:#" + colorT);
			postTable.snapshotItem(uid).childNodes[2].style.display = displayT;
			postTable.snapshotItem(uid).childNodes[4].style.display = displayT;
	  	document.getElementById("usernamepanel" + uid).innerHTML = userT;
}

function update(eventID, status) {
    var tempID;
    switch(status) {
        case "addUser":
            for (var i = 0; i < userNamen.snapshotLength; i++) {
                    tempID = userNamen.snapshotItem(i).data;
                if (tempID == eventID) {
										togglePost(i,1);
                    var temp = document.getElementById("hideshowpanel" + i);
                    temp.replaceChild(createAnchor("show", i), temp.firstChild);
                    temp = document.getElementById("userignorepanel" + i);
                    temp.replaceChild(createAnchor("rem", i), temp.firstChild);
                    document.getElementById("postignorepanel" + i).style.display = "none";    
                }
            }
            break;
        case "remUser":
            for (var i = 0; i < userNamen.snapshotLength; i++) {
                    tempID = userNamen.snapshotItem(i).data;
                if (tempID == eventID) {
										togglePost(i,0);
                    var temp = document.getElementById("hideshowpanel" + i);
                    temp.replaceChild(createAnchor("hide", i), temp.firstChild);
                    temp = document.getElementById("userignorepanel" + i);
                    temp.replaceChild(createAnchor("add", i), temp.firstChild);
                    temp = document.getElementById("postignorepanel" + i);
                    temp.setAttribute("style", "padding-right: 16px;");    
                    temp.replaceChild(createAnchor("adp", i), temp.firstChild);
                }
            }
            break;
        case "addPost":
            for (var i = 0; i < postIDs.snapshotLength; i++) {
                    tempID = postIDs.snapshotItem(i).id.slice(9, postIDs.snapshotItem(i).id.length);
                if (tempID == eventID) {
										togglePost(i,1);
                    var temp = document.getElementById("hideshowpanel" + i);
                    temp.replaceChild(createAnchor("show", i), temp.firstChild);
                    temp = document.getElementById("postignorepanel" + i);
                    temp.replaceChild(createAnchor("rep", i), temp.firstChild);    
                    document.getElementById("userignorepanel" + i).style.display = "none";    
               }
            }
            break;
        case "remPost":
            for (var i = 0; i < postIDs.snapshotLength; i++) {
                    tempID = postIDs.snapshotItem(i).id.slice(9, postIDs.snapshotItem(i).id.length);
                if (tempID == eventID) {
										togglePost(i,0);
                    var temp = document.getElementById("hideshowpanel" + i);
                    temp.replaceChild(createAnchor("hide", i), temp.firstChild);
                    temp = document.getElementById("postignorepanel" + i);
                    temp.replaceChild(createAnchor("adp", i), temp.firstChild);
                    temp = document.getElementById("userignorepanel" + i);
                    temp.setAttribute("style", "padding-right: 16px;");    
                    temp.replaceChild(createAnchor("add", i), temp.firstChild);
                }
            }
            break;
        default:
            return;
    }
}

function editPostList() {
	editList("postblacklist")
}
function editUserList() {
	editList("userblacklist")
}
function editList(blacklist) {
    var oldUserIgnoreListString = GM_getValue(blacklist);
    if (oldUserIgnoreListString == null) {
        oldUserIgnoreListString = "";
    }
    var newUserIgnoreListString = prompt("Blacklist:", oldUserIgnoreListString);
    if (newUserIgnoreListString != null) {
        var newUserIgnoreList = newUserIgnoreListString.split("|");
        for (var i = newUserIgnoreList.length - 1; i >= 0; i--) {
            if(newUserIgnoreList[i].length == 0) {
                newUserIgnoreList.splice(i, 1);
            }
        }
        setIgnoreList(newUserIgnoreList,blacklist);
        var removed = new Array();
        var added = new Array();
        var oldUserIgnoreList = oldUserIgnoreListString.split("|");
        for (var i = 0; i < oldUserIgnoreList.length; i++) {
            if (checkList(newUserIgnoreList, oldUserIgnoreList[i]) < 0) {
                removed.push(oldUserIgnoreList[i]);
            }
        }
        for (var i = 0; i < newUserIgnoreList.length; i++) {
            if (checkList(oldUserIgnoreList, newUserIgnoreList[i]) < 0) {
                added.push(newUserIgnoreList[i]);
            }
        }
        for (var i = 0; i < removed.length; i++) {
            update(removed[i], "rem");
        }
        for (var i = 0; i < added.length; i++) {
            update(added[i], "add");
        }
    }
}

function getIgnoreList(listName) {
    var blacklistString = GM_getValue(listName);
    if (blacklistString != undefined && blacklistString.length > 0) {
        return blacklistString.split("|");
    } else {
        return new Array();
    }
}

function setIgnoreList(list, listName) {
    if (list != undefined && list.length > 0) {
        GM_setValue(listName, list.join("|"));
    } else {
        GM_setValue(listName, "");
    }
}

function checkList(list, uid) {
    for (var i = 0; i < list.length; i++) {
        if (list[i] == uid) {
            return i;
        }
    }
    return -1;
}

function createAnchor(type, uid) {
    var a =  document.createElement("a");
    switch (type) {
        case "adp":
            a.title = "Diesen Beitrag auf die schwarze Liste setzen und nicht mehr angezeigen.";
            a.id = "adp" + uid;
            a.href = "javascript:void(0);"
            a.innerHTML = "Beitrag ignorieren";
						a.setAttribute("class", "panelrow");
            a.addEventListener('click',
                function(event) {
                    addPost(event);
                }, true
            );
            return a;
        case "rep":
            a.title = "Diesen Beitrag von der schwarzen Liste streichen und in Zukunft wieder angezeigen.";
            a.id = "rep" + uid;
            a.href = "javascript:void(0);"
            a.innerHTML = "Beitrag verfolgen";
						a.setAttribute("class", "panelrow");
            a.addEventListener('click',
                function(event) {
                    removePost(event);
                }, true
            );
            return a;
        case "add":
            a.title = "Den Benutzer '" + userNamen.snapshotItem(uid).data + "' auf die schwarze Liste setzen und keinen seiner Beitraege mehr anzeigen.";
            a.id = "add" + uid;
            a.href = "javascript:void(0);"
            a.innerHTML = "Benutzer ignorieren";
						a.setAttribute("class", "panelrow");
            a.addEventListener('click',
                function(event) {
                    addUser(event);
                }, true
            );
            return a;
        case "rem":
            a.title = "Den Benutzer '" + userNamen.snapshotItem(uid).data + "' von der schwarzen Liste streichen und alle seine Beitraege wieder anzeigen";
            a.id = "rem" + uid;
            a.href = "javascript:void(0);"
            a.innerHTML = "Benutzer verfolgen";
						a.setAttribute("class", "panelrow");
            a.addEventListener('click',
                function(event) {
                    removeUser(event);
                }, true
            );
            return a;
        case "show":
            a.title = "Beitrag ausklappen";
            a.id = "sho" + uid;
            a.href = "javascript:void(0);"
            a.innerHTML = "Beitrag ausklappen";
						a.setAttribute("class", "panelrow");
            a.addEventListener('click',
                function(event) {
                    show(event);
                }, true
            );
            return a;
        case "hide":
            a.title = "Beitrag einklappen";
            a.id = "hid" + uid;
            a.href = "javascript:void(0);"
            a.innerHTML = "Beitrag einklappen";
						a.setAttribute("class", "panelrow");
            a.addEventListener('click',
                function(event) {
                    hide(event);
                }, true
            );
            return a;
        default:
            return null;
    }
}
