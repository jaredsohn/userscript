// ==UserScript==
// @name          Twitter Profiles
// @namespace     www.sammyshp.de
// @description   Profiles for Twitter. Simply change the currently logged in user.
// @author        Sven Karsten Greiner (SammysHP) <sven@sammyshp.de>
// @version       0.2
// @license       GPLv3
// @include       http://www.twitter.com/*
// @include       http://about.twitter.com/*
// @include       http://twitter.com/*
// @include       https://www.twitter.com/*
// @include       https://about.twitter.com/*
// @include       https://twitter.com/*
// ==/UserScript==

var KEY_ACTIVE_USER = "active_user";
var KEY_IS_ACTIVE = "is_active";
var KEY_USERS = "users"

function dispatch() {
    if (GM_getValue(KEY_IS_ACTIVE, false)) {
        showReloginSplash();
        if (document.getElementById("signin-email") == null) {
            window.location = "https://twitter.com";
            return;
        }
        var username = GM_getValue(KEY_ACTIVE_USER, "");
        var password = getPassword(username);
        dispatchLogin(username, password);
    }
    
    insertMenuEntries();
    insertProfileSelector();
}

function dispatchLogin(username, password) {
    document.getElementById("signin-email").value = username;
    document.getElementById("signin-password").value = password;
    document.getElementsByName("remember_me")[0].checked = true;
    document.getElementsByClassName("submit")[0].click();
    GM_setValue(KEY_IS_ACTIVE, false);
}

function dispatchLogout() {
    fireEvent(document.getElementById("signout-button"), "click");
}

function showReloginSplash() {
    var splash = document.createElement("div");
    splash.setAttribute("style", "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: black; opacity: 0.8; z-index: 1000; color: white; font-size: 4em; text-align: center; padding-top: 20%");
    splash.innerHTML = "S w i t c h i n g&nbsp;&nbsp;&nbsp;p r o f i l e . . .";
    document.getElementsByTagName("body")[0].appendChild(splash);
}

function insertProfileSelector() {
    var signinBox = document.getElementsByClassName("js-front-signin")[0];
    
    if (null == signinBox) {
        return;
    }
    
    var container = document.createElement("ul");
    container.setAttribute("class", "dropdown-menu");
    container.setAttribute("style", "position: absolute; top: 0em; right: -15em; display: block; z-index: 1000; width: 14em; overflow: hidden;");
    
    for each (var user in getUsers()) {
        var menuEntry = createMenyEntry(user[0]);
        menuEntry.addEventListener("click", function(event) {
                var username = event.target.innerHTML;
                var password = getPassword(username);
                dispatchLogin(username, password);
                return false;
            }, false);
        
        container.appendChild(menuEntry);
    }
    
    signinBox.insertBefore(container, signinBox.firstChild);
}

function insertMenuEntries() {
    var userMenu = document.getElementById("user-dropdown");
    
    if (null == userMenu) {
        return;
    }
    
    userMenu = userMenu.getElementsByClassName("dropdown-menu")[0];
    
    userMenu.appendChild(createMenuDivider());
    
    for each (var user in getUsers()) {
        var menuEntry = createMenyEntry(user[0]);
        menuEntry.addEventListener("click", function(event) {
                showReloginSplash();
                GM_setValue(KEY_ACTIVE_USER, event.target.innerHTML);
                GM_setValue(KEY_IS_ACTIVE, true);
                dispatchLogout();
                return false;
            }, false);
        
        userMenu.appendChild(menuEntry);
    }
    
    if (isUserStored(getCurrentUser())) {
        var menuEntry = createMenyEntry("» Remove current user");
        menuEntry.addEventListener("click", function(event) {
                removeUser(getCurrentUser());
                location.reload();
                return false;
            }, false);
        userMenu.appendChild(menuEntry);
    } else {
        var menuEntry = createMenyEntry("» Add current user");
        menuEntry.addEventListener("click", function(event) {
                var username = getCurrentUser();
                var passwd = prompt("Password for " + username);
                addUser(username, passwd);
                location.reload();
                return false;
            }, false);
        userMenu.appendChild(menuEntry);
    }
}

function createMenyEntry(text) {
    var entry = document.createElement("li");
    var content = document.createElement("a");
    content.setAttribute("href", "#");
    content.innerHTML = text;
    entry.appendChild(content);
    return entry;
}

function createMenuDivider() {
    var menuDivider = document.createElement("li");
    menuDivider.setAttribute("class", "dropdown-divider");
    return menuDivider;
}

function getCurrentUser() {
    return document.getElementsByClassName("account-group")[0].getAttribute("data-screen-name");
}

function isUserStored(username) {
    for each (var user in getUsers()) {
        if (user[0] == username) {
            return true;
        }
    }
    
    return false;
}

function getUsers() {
    return JSON.parse(GM_getValue(KEY_USERS, "[]"));
}

function addUser(user, pass) {
    var users = getUsers();
    users.push([user, pass]);
    GM_setValue(KEY_USERS, JSON.stringify(users));
}

function removeUser(username) {
    var users = getUsers();
    for (var i = 0; i < users.length; i++) {
        if (users[i][0] == username) {
            removeArrayItem(users, i);
            GM_setValue(KEY_USERS, JSON.stringify(users));
            break;
        }
    }
}

function getPassword(username) {
    for each (var user in getUsers()) {
        if (user[0] == username) {
            return user[1];
        }
    }
    
    return "";
}

function fireEvent(element,event){
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent(event, true, true ); // event type,bubbling,cancelable
    return !element.dispatchEvent(evt);
}

// Array Remove - By John Resig (MIT Licensed)
function removeArrayItem(array, from, to) {
    var rest = array.slice((to || from) + 1 || array.length);
    array.length = from < 0 ? array.length + from : from;
    return array.push.apply(array, rest);
};

window.addEventListener('load', dispatch, false);
