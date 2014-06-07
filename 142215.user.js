// ==UserScript==
// @name        Grease Login
// @namespace   http://userscripts.org/users/6989/grease-login
// @description Change every input of type "password" to an input of type "text"; if the document contains an input of type "password", focus on the first input with a name like "user" or "email".
// @include     http://*
// @include     https://*
// @version     1
// @grant       none
// ==/UserScript==

// return true if the element is displayable

function displayable(element) {
    if(getComputedStyle(element).getPropertyValue("display") == "none") {
        return false;
    } else {
        if(element.parentNode != document) {
            return displayable(element.parentNode);
        } else {
            return true;
        }
    }
}

// return true if the element is visible

function visible(element) {
    if(getComputedStyle(element).getPropertyValue("visibility") == "hidden") {
        return false;
    } else {
        if(element.parentNode != document) {
            return visible(element.parentNode);
        } else {
            return true;
        }
    }
}

// change every input of type "password" to an input of type "text"

var passwordArray = document.querySelectorAll('input[type="password"]');
var passwordArrayIndex;

for(passwordArrayIndex = 0; passwordArrayIndex < passwordArray.length; passwordArrayIndex++) {
    passwordArray[passwordArrayIndex].type = 'text';
}

// if the document contains an input of type "password", focus on the first input with a name like "user" or "email"

if(passwordArray.length > 0) {
    var usernameArray = document.querySelectorAll('input[name*="user"][type="text"], input[name*="email"][type="text"]');
    var usernameArrayIndex;

    for(usernameArrayIndex = 0; usernameArrayIndex < usernameArray.length; usernameArrayIndex++) {
        if(displayable(usernameArray[usernameArrayIndex]) && visible(usernameArray[usernameArrayIndex])) {
            usernameArray[usernameArrayIndex].focus();
            break;
        }
    }
}
