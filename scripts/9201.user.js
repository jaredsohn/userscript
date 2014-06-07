// ==UserScript==
// @name           QLForumIgnoreList
// @namespace      http://www.qatarliving.com/user/9969,2007-05-12:juandering
// @description    Block or hide posts from certain users on qatarliving.com forums. Rev.2.
// @include        http://www.qatarliving.com/node/
// ==/UserScript==

//black button = blocked user; click -> allow user
const ALLPNG = "data:image/png;base64," +
"iVBORw0KGgoAAAANSUhEUgAAABgAAAAMCAYAAAB4MH11AAAABHNCSVQICAgIfAhkiAAAAAlwSFlz" +
"AAALEgAACxIB0t1%2B%2FAAAACF0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgMy4w" +
"72kx8AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNS8xMS8wN1ddE7EAAAE%2FSURBVHicrZOxTsJQFI" +
"a%2FW68xxMiobA68hLs%2BgouLL%2BPCGzA6OGjiA2gHRl%2BAqUmJCQmmpdSLRGxv4dLjAN10AP" +
"qNZ%2Fj%2Bc%2B45V4kISinl%2B%2F6FtfZ1NBo1p9Mpu2KMIc%2Fzx263eysiTm%2FqR71e7y6K" +
"omar1SJNU%2FI831runMMYQ5qmN%2B1221dKPVQBJ1EUXcZxzHA4xFpLlmVbycuypCgK5vM5xhiW" +
"y%2BU18KyVUqrT6Vz1%2B32yLGM8HjMYDLbu%2Fg%2FOgYYGdBzHjSAImEwmGGPqkAN4gNaA5%2F" +
"v%2BQZIkFEWx09v%2FgwKUBiQMww%2FnXF3iih9Yj7Fyzr0DnzUHvAHOE5EV8K21vq9RboEXwFZn" +
"OnPOPQFfwNme8hIIgBDI1eYne0ATOAWOWS9oV1bADEhEJFMiAlCFHAGHewaUwAJYiIj8AsbRpnu1" +
"wnTQAAAAAElFTkSuQmCC";

//white button = allowed user; click -> block user
const BLOPNG = "data:image/png;base64," +
"iVBORw0KGgoAAAANSUhEUgAAABgAAAAMCAYAAAB4MH11AAAABHNCSVQICAgIfAhkiAAAAAlwSFlz" +
"AAALEgAACxIB0t1%2B%2FAAAACF0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgMy4w" +
"72kx8AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNS8xMS8wN1ddE7EAAAFkSURBVHicrdM9jtpQFMXx" +
"%2F3s4glE%2BCiIlokpBkTWkToosIH02QJndUEQ0swCENBopBRRZAlaqFEhBNpJBD2z88LN9UmRG" +
"mhbCqa%2FO797iIgnAxHH8oa5rpyskz%2FNbIJIED0Avy7If1yiXpKqqNB6PvwLW8i8v%2B%2F3%" +
"2BR66UzWZD0zRfgJ41xpjZbPbpWuXOOdI0pSiKd8CNBaLdbnfzdKgoiouB4%2FFICAFJFogiwMZx" +
"3HHO0e12iaKIXq93MRBCAECSAYwFNJ1O%2F6zXa5IkwTlHp9O5GPDeE0KgLMsCIAKa5XL5e7VaZc" +
"Ph8PV%2BvydJEk6n01nFbdvivcdaS5ZlzOfzn0AdSWqMMYfJZPJ9NBp9OxwOpGlKVVVnb1%2FXNd" +
"vtljzP%2FWKxuAO8kYQx5gXwfjAYfJb01nt%2FdvmTS9qyLH%2BFEO6B1SNggVfAG%2BA5YC4WoA" +
"EcsJF0NA%2Bf%2FIh0gWf%2FCbRABVSS9BeDglC3Su5I7gAAAABJRU5ErkJggg%3D%3D";

//red button = hidden post; click -> show post
const SHOPNG = "data:image/png;base64," +
"iVBORw0KGgoAAAANSUhEUgAAABgAAAAMCAYAAAB4MH11AAAABHNCSVQICAgIfAhkiAAAAAlwSFlz" +
"AAALEgAACxIB0t1%2B%2FAAAACF0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgMy4w" +
"72kx8AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNS8xMS8wN1ddE7EAAAF%2FSURBVHicpZM%2FbhNR" +
"EIe%2FWT9iLIyLIMVORWEJrkAPBQegoeEElNyAxjdwkSJCFBTpEBLZwhIUXMASkaVESIkCXq%2Ft" +
"tRyv94%2F9vEOxaymt11NO8X2%2FmTdPVBURkQvXffEsSc4rt7cNZjNKVxCwjOMv9W73napaU7Sr" +
"zV7vY2U4bNBqwWQCcbw73FoIAg4mk7cn7bYrIp%2B3gseHw%2BFLPA%2BuryFJIIp2g2cZpCmEIX" +
"4QsFmv3wBnRkTkW6fzin4%2Fh45GcHW1e%2Fqi5sAIWMJToGYAM%2FO8GoMBjMf5DoFHJQURsAYU" +
"HMAYwLlw3crc96mmKSaOeVg6fw4nFwggDqBfLy%2F%2F%2FptO8cKQeZZR2UOQFJIYlgAG2Py29s" +
"8NTNvw5A7wgHRHcFbAHWAK%2FIBfgDWquhGRxSdjTt9b%2B2FB%2FkirEuktEAAhJD%2FhO5BI8d" +
"HqwPNjeK3QTErA702SxTBYgwvcbAUO0ACOyA9I9nBsyK%2FVV9VIVBVgK6kCD%2FYUZOQbXqmq%2" +
"Fgf1mbKDdhh3gQAAAABJRU5ErkJggg%3D%3D";

//green button = shown post; click -> hide post
const HIDPNG = "data:image/png;base64," +
"iVBORw0KGgoAAAANSUhEUgAAABgAAAAMCAYAAAB4MH11AAAABHNCSVQICAgIfAhkiAAAAAlwSFlz" +
"AAALEgAACxIB0t1%2B%2FAAAACF0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgMy4w" +
"72kx8AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNS8xMS8wN1ddE7EAAAGBSURBVHicpdMxbhNREIDh" +
"79kLISK4AImEisISXIEeCg5AQ8MJUnIDmtwgBQVCFBR0CAlcRIKCC0QiipQIKVHAjmOvZWJ71%2F" +
"F6H4UdqO1MM9IU%2Fz8zb16IMQohhMZe41H%2BIP9yUj2p9fQsG6lUNszeb69tv4gxFsm8vrKzvv" +
"OqWW3WNmzo6MhkC8MLhVSqc73zvP663gghvLsU3Grebj5uaTlyJJcbGS0EL5XGxgYG0nZqMp08w4" +
"ckhBC2Pm092bVrZOTUqUOHC3f%2FL%2Fo4xdB9rCZIWr3W6r59Z86kUoa4uaRghAmiCpIElcZeo9" +
"rut41XxrIk48byA5jMcxQQKogHHw9%2BdX93DVoDZb%2BkegVBPpdkhpBgWvwofjrWVXfHH7QwXh" +
"BczuEVdPHVdxRJjHEaQjhP3iZvis3ipXOzR7pYovsCKQZy33xGHuYfbQ0P3fNUtC5fAv5%2FklJm" +
"30QDx5eCCmq4a3Y%2F4QqKqdmxtmOMoxBjhEvJCq5dUVCaLfgixhj%2FAvB%2BsoMs9pwsAAAAAE" +
"lFTkSuQmCC";

GM_registerMenuCommand("Edit Block List", editList);

var QLNodeType = document.evaluate("//div[@class='breadcrumb']/a[@href][2]",
    document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).text;

if (QLNodeType == "Groups") {
    var QLGroupName = document.evaluate("//div[@class='breadcrumb']/a[@href][3]",
        document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (QLGroupName.snapshotLength == 0) {
        QLGroupName = "";
    } else {
        QLGroupName = QLGroupName.snapshotItem(0).text;
    }
}

if (QLNodeType == "Forums") {
    var postings = document.evaluate(
        "//div[@class='node']/div[@class='content'] | " +
        "//div[@id='comments']/div/div[1]",
        document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var userIDs = document.evaluate(
        "//span[@class='submitted']/a",
        document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var anchors = document.evaluate(
        "//div[@id='main']/h1[@class='title'] | " +
        "//div[@id='comments']/a[not(@id='new')]",
        document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
} else if (QLNodeType == "Groups" && QLGroupName == "") {
    var postings = document.evaluate(
        "//div[@class='content']/div[2]/div/div[@class='node']",
        document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var userIDs = document.evaluate(
        "//div[@class='submitted']/a",
        document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var anchors = document.evaluate(
        "//div[@class='content']/div[2]/div/div[@class='node']/h2[@class='nodeTitle']",
        document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
} else if (QLNodeType == "Groups" && QLGroupName != "") {
    var postings = document.evaluate(
        "//div[@id='mainColumn']/div[@class='node'] | " +
        "//div[@id='comments']/div[@class='comment']",
        document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var userIDs = document.evaluate(
        "//div[@class='submitted']/a",
        document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var anchors = document.evaluate(
        "//div[@id='mainColumn']/h1[@class='pageTitle'] | " +
        "//div[@id='comments']/a[not(@id='new')]",
        document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
} else {
    return;
}

init();

function init() {
    var blocklist = getBlocklist();
    for (var i = 0; i < userIDs.snapshotLength; i++) {
        var panel = document.createElement("div");
        panel.id = "panel" + i;
        panel.setAttribute("style", "cursor: pointer;");
        shPanel = document.createElement("span");
        shPanel.id = "shpanel" + i;
        abPanel = document.createElement("span");
        abPanel.id = "abpanel" + i;
        if (checkList(blocklist, userIDs.snapshotItem(i).text) >= 0) {
            processPost(i, "none");
            shPanel.appendChild(createImg("show", i));
            abPanel.appendChild(createImg("allow", i));
        } else {
            shPanel.appendChild(createImg("hide", i));
            abPanel.appendChild(createImg("block", i));
        }
        panel.appendChild(shPanel);
        panel.appendChild(abPanel);
        anchors.snapshotItem(i).appendChild(panel);
    }
}

function processPost(userID, mode) {
    var postEls = postings.snapshotItem(userID).childNodes;
    for (var i = 0; i < postEls.length; i++) {
        if (postEls[i].nodeType == 1) {
            if (QLNodeType == "Forums") {
                if (
                    postEls[i].className != "forum-topic-navigation clear-block" &&
                    postEls[i].className != "submitted" &&
                    postEls[i].nodeName.toLowerCase() != "h3"
                   ) {
                    postEls[i].style.display = mode;
                }
            } else if (QLNodeType == "Groups") {
                if (
                    postEls[i].className != "nodeTitle" &&
                    postEls[i].className != "submitted" &&
                    postEls[i].className != "commentTitle"
                   ) {
                    postEls[i].style.display = mode;
                }
            }
        }
    }

    if (QLNodeType == "Forums") {
        var nextEl = postings.snapshotItem(userID).nextSibling;
        while (nextEl) {
            if (nextEl.nodeType == 1) {
                nextEl.style.display = mode;
            }
            nextEl = nextEl.nextSibling;
        }
    }
    return;
}

function createImg(type, ID) {
    var img =  document.createElement("img");
    switch (type) {
        case "block":
            img.src = BLOPNG;
            img.title = "Block User";
            img.id = "block" + ID;
            img.addEventListener('click',
                function(event) {
                    block(event);
                }, true
            );
            return img;
        case "allow":
            img.src = ALLPNG;
            img.title = "Allow User";
            img.id = "allow" + ID;
            img.addEventListener('click',
                function(event) {
                    allow(event);
                }, true
            );
            return img;
        case "show":
            img.src = SHOPNG;
            img.title = "Show Post";
            img.id = "show" + ID;
            img.addEventListener('click',
                function(event) {
                    show(event);
                }, true
            );
            return img;
        case "hide":
            img.src = HIDPNG;
            img.title = "Hide Post";
            img.id = "hide" + ID;
            img.addEventListener('click',
                function(event) {
                    hide(event);
                }, true
            );
            return img;
        default:
            return null;
    }
}

function show(event, type) {
    var ID = event.target.id.slice(4, event.target.id.length);
    var temp = document.getElementById("shpanel" + ID);
    processPost(ID, "");
    temp.replaceChild(createImg("hide", ID), temp.firstChild);
}

function hide(event, type) {
    var ID = event.target.id.slice(4, event.target.id.length);
    var temp = document.getElementById("shpanel" + ID);
    processPost(ID, "none");
    temp.replaceChild(createImg("show", ID), temp.firstChild);
}

function block(event) {
    var ID = event.target.id.slice(5, event.target.id.length);
    var userID = userIDs.snapshotItem(ID).text;
    var blocklist = getBlocklist();
    if (checkList(blocklist, userID) < 0) {
        blocklist.push(userID);
        setBlocklist(blocklist);
    }
    update(userID, "block");
}

function allow(event) {
    var ID = event.target.id.slice(5, event.target.id.length);
    var userID = userIDs.snapshotItem(ID).text;
    var blocklist = getBlocklist();
    var index = checkList(blocklist, userID)
    if (index >= 0) {
        var newBlocklist = new Array();
        for (var i = 0; i < blocklist.length; i++) {
            if (i != index) {
                newBlocklist.push(blocklist[i]);
            }
        }
        setBlocklist(newBlocklist);
    }
    update(userID, "allow");
}

function update(userID, status) {
    switch(status) {
        case "block":
            for (var i = 0; i < userIDs.snapshotLength; i++) {
                if (userIDs.snapshotItem(i).text == userID) {
                    processPost(i, "none");
                    var temp = document.getElementById("shpanel" + i);
                    temp.replaceChild(createImg("show", i), temp.firstChild);
                    temp = document.getElementById("abpanel" + i);
                    temp.replaceChild(createImg("allow", i), temp.firstChild);
                }
            }
            break;
        case "allow":
            for (var i = 0; i < userIDs.snapshotLength; i++) {
                if (userIDs.snapshotItem(i).text == userID) {
                    processPost(i, "");
                    var temp = document.getElementById("shpanel" + i);
                    temp.replaceChild(createImg("hide", i), temp.firstChild);
                    temp = document.getElementById("abpanel" + i);
                    temp.replaceChild(createImg("block", i), temp.firstChild);
                }
            }
            break;
        default:
            return;
    }
}

function editList() {
    var oldBlocklistString = GM_getValue("blocklist");
    var newBlocklistString = prompt("Edit your blocklist manually:",
        oldBlocklistString);
    if (newBlocklistString != null) {
        var newBlocklist = newBlocklistString.split("|");
        for (var i = newBlocklist.length - 1; i >= 0; i--) {
            if(newBlocklist[i].length == 0) {
                newBlocklist.splice(i, 1);
            }
        }
        setBlocklist(newBlocklist);
        var allowed = new Array();
        var blocked = new Array();
        var oldBlocklist = oldBlocklistString.split("|");
        for (var i = 0; i < oldBlocklist.length; i++) {
            if (checkList(newBlocklist, oldBlocklist[i] < 0)) {
                allowed.push(oldBlocklist[i]);
            }
        }
        for (var i = 0; i < newBlocklist.length; i++) {
            if (checkList(oldBlocklist, newBlocklist[i] < 0)) {
                blocked.push(newBlocklist[i]);
            }
        }
        for (var i = 0; i < allowed.length; i++) {
            update(allowed[i], "rem");
        }
        for (var i = 0; i < blocked.length; i++) {
            update(blocked[i], "add");
        }
    }
}

function getBlocklist() {
    var blocklistString = GM_getValue("blocklist");
    if (blocklistString != undefined && blocklistString.length > 0) {
        return blocklistString.split("|");
    } else {
        return new Array();
    }
}

function setBlocklist(list) {
    if (list != undefined && list.length > 0) {
        GM_setValue("blocklist", list.join("|"));
    } else {
        GM_setValue("blocklist", "");
    }
}

function checkList(list, ID) {
    for (var i = 0; i < list.length; i++) {
        if (list[i] == ID) {
            return i;
        }
    }
    return -1;
}
