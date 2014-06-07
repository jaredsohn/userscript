// ==UserScript==
// @name            Kingpong
// @namespace       http://alling.se
// @version         1.0
// @match           http://*.chalmers.se/*
// @match           https://*.chalmers.se/*
// @description     Provides "Remember my username" option when logging in to the Chalmers Student Portal.
// @copyright       2014 Simon Alling
// ==/UserScript==

function byID(i) {
    return document.getElementById(i);
}

var kingpong = {
    settings: {},
    defaultSettings: {
        rememberMe:         true,
        savedUsername:      null
    },
    usernameTextbox: byID("ctl00_ContentPlaceHolder1_UsernameTextBox"),
    passwordTextbox: byID("ctl00_ContentPlaceHolder1_PasswordTextBox"),
    loginButton: byID("ctl00_ContentPlaceHolder1_SubmitButton"),
    loginForm: byID("aspnetForm"),
    CSS: ""
};

function isString(s) {
    return (typeof s === "string");
}

function createCheckbox(id, checked) {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    if (isString(id)) {
        checkbox.id = id;
    }
    if (checked === true) {
        checkbox.checked = true;
    }
    return checkbox;
}

HTMLInputElement.prototype.selectRange = function (start, end) {
    if (this.setSelectionRange) {
        this.focus();
        this.setSelectionRange(start, end);
    } else if (this.createTextRange) {
        var range = this.createTextRange();
        range.collapse(true);
        range.moveEnd('character', end);
        range.moveStart('character', start);
        range.select();
    }
};

HTMLInputElement.prototype.setFocus = function() {
    this.selectRange(this.value.length, this.value.length);
}

function saveSettings() {
    var JSONString = JSON.stringify(kingpong.settings);
    localStorage.setItem("kingpongSettings", JSONString);
}

function loadSettings() {
    var savedSettings = JSON.parse(localStorage.getItem("kingpongSettings"));
    var defaultSettings = kingpong.defaultSettings;
    if (!!savedSettings) {
        for (s in defaultSettings) {
            if (savedSettings.hasOwnProperty(s)) {
                kingpong.settings[s] = savedSettings[s];
            } else {
                kingpong.settings[s] = kingpong.defaultSettings[s];
            }
        }
    } else {
        kingpong.settings = defaultSettings;
    }
}

function settingIsTrue(s) {
    return !!kingpong.settings[s] && kingpong.settings[s] === true;
}

function isOnLoginPage() {
    var correctURL = !!document.location.href.match(/idp\.chalmers\.se\/adfs\/ls/i);
    var usernameTextbox = kingpong.usernameTextbox;
    var passwordTextbox = kingpong.passwordTextbox;
    return correctURL && !!usernameTextbox && !!passwordTextbox;
}

function insertKingpongCSS() {
    kingpong.CSS += '\
        #KingpongRememberMe { float: left; }\
        label[for=KingpongRememberMe] { float: left; }\
    ';
    var styleElement = document.createElement("style");
    styleElement.innerHTML = kingpong.CSS;
    document.head.appendChild(styleElement);
}

function insertRememberMeCheckbox() {
    var loginButton = kingpong.loginButton;
    var rememberMeCheckbox = createCheckbox("KingpongRememberMe", settingIsTrue("rememberMe"));
    var rememberMeLabel = document.createElement("label");
    rememberMeLabel.setAttribute("for", "KingpongRememberMe");
    rememberMeLabel.innerHTML = "Remember my username";
    if (!!loginButton) {
        loginButton.parentNode.insertBefore(rememberMeCheckbox, loginButton);
        loginButton.parentNode.insertBefore(rememberMeLabel, loginButton);
    }
}

function focusAppropriateTextfield() {
    var savedUsername = kingpong.settings.savedUsername;
    if (!!savedUsername) {
        kingpong.usernameTextbox.value = savedUsername;
        kingpong.passwordTextbox.setFocus();
    } else {
        kingpong.usernameTextbox.setFocus();
    }
}

function handleLoginSubmission() {
    var rememberMe = byID("KingpongRememberMe").checked;
    kingpong.settings.rememberMe = rememberMe;
    kingpong.settings.savedUsername = !!rememberMe ? kingpong.usernameTextbox.value : null;
    saveSettings();
}

function improveLoginForm() {
    insertRememberMeCheckbox();
    focusAppropriateTextfield();
    var form = kingpong.loginForm;
    if (!!form) {
        form.addEventListener("submit", handleLoginSubmission);
    }
}

// Beautiful code

loadSettings();

if (isOnLoginPage()) {
    improveLoginForm();
}

insertKingpongCSS();