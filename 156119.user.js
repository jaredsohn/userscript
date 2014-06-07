// ==UserScript==
// @name          FliudUI roboto fix
// @namespace     userstyles.org
// @author        Zbigniew Szymanski
// @homepage      geteit.com
// @include       http://www.fluidui.com/editor/*
// @include       https://www.fluidui.com/editor/*
// @include       http://*.fluidui.com/editor/*
// @include       https://*.fluidui.com/editor/*
// @run-at        document-start
// ==/UserScript==
(function() {
    
    GM_addStyle("@font-face {\
  font-family: 'Roboto';\
  font-style: italic;\
  font-weight: 400;\
  src: url('https://themes.googleusercontent.com/font?kit=biUEjW7P-lfzIZFXrcy-wQ') format('woff');\
}\
@font-face {\
  font-family: 'Roboto';\
  font-style: normal;\
  font-weight: 500;\
  src: url('https://themes.googleusercontent.com/font?kit=7KXg6nyyqN8gyMoNwQ7aOQ') format('woff');\
}\
@font-face {\
  font-family: 'Roboto';\
  font-style: italic;\
  font-weight: 500;\
  src: url('https://themes.googleusercontent.com/font?kit=daIfzbEw-lbjMyv4rMUUTj8E0i7KZn-EPnyo3HZu7kw') format('woff');\
}\
@font-face {\
  font-family: 'Roboto';\
  font-style: italic;\
  font-weight: 300;\
  src: url('https://themes.googleusercontent.com/font?kit=iE8HhaRzdhPxC93dOdA05z8E0i7KZn-EPnyo3HZu7kw') format('woff');\
}\
@font-face {\
  font-family: 'Roboto Light';\
  font-style: italic;\
  font-weight: 400;\
  src: url('https://themes.googleusercontent.com/font?kit=iE8HhaRzdhPxC93dOdA05z8E0i7KZn-EPnyo3HZu7kw') format('woff');\
}\
@font-face {\
  font-family: 'Roboto';\
  font-style: italic;\
  font-weight: 100;\
  src: url('https://themes.googleusercontent.com/font?kit=jB4HYzUnEmLtjz-UHQe60fesZW2xOQ-xsNqO47m55DA') format('woff');\
}\
@font-face {\
  font-family: 'Roboto Thin';\
  font-style: italic;\
  font-weight: 400;\
  src: url('https://themes.googleusercontent.com/font?kit=jB4HYzUnEmLtjz-UHQe60fesZW2xOQ-xsNqO47m55DA') format('woff');\
}\
@font-face {\
  font-family: 'Roboto';\
  font-style: normal;\
  font-weight: 700;\
  src: url('https://themes.googleusercontent.com/font?kit=vxNK-E6B13CyehuDCmvQvw') format('woff');\
}\
@font-face {\
  font-family: 'Roboto';\
  font-style: normal;\
  font-weight: 900;\
  src: url('https://themes.googleusercontent.com/font?kit=1_sFLBJZ_MiiGcnkjN_Mgg') format('woff');\
}\
@font-face {\
  font-family: 'Roboto';\
  font-style: normal;\
  font-weight: 100;\
  src: url('https://themes.googleusercontent.com/font?kit=MMDEOSa6i6T9gBocjYCJkQ') format('woff');\
}\
@font-face {\
  font-family: 'Roboto Thin';\
  font-style: normal;\
  font-weight: 400;\
  src: url('https://themes.googleusercontent.com/font?kit=MMDEOSa6i6T9gBocjYCJkQ') format('woff');\
}\
@font-face {\
  font-family: 'Roboto';\
  font-style: italic;\
  font-weight: 700;\
  src: url('https://themes.googleusercontent.com/font?kit=owYYXKukxFDFjr0ZO8NXhz8E0i7KZn-EPnyo3HZu7kw') format('woff');\
}\
@font-face {\
  font-family: 'Roboto';\
  font-style: italic;\
  font-weight: 900;\
  src: url('https://themes.googleusercontent.com/font?kit=b9PWBSMHrT2zM5FgUdtu0T8E0i7KZn-EPnyo3HZu7kw') format('woff');\
}\
@font-face {\
  font-family: 'Roboto';\
  font-style: normal;\
  font-weight: 300;\
  src: url('https://themes.googleusercontent.com/font?kit=d-QWLnp4didxos_6urzFtg') format('woff');\
}\
@font-face {\
  font-family: 'Roboto Light';\
  font-style: normal;\
  font-weight: 400;\
  src: url('https://themes.googleusercontent.com/font?kit=d-QWLnp4didxos_6urzFtg') format('woff');\
}\
@font-face {\
  font-family: 'Roboto';\
  font-style: normal;\
  font-weight: 400;\
  src: url('https://themes.googleusercontent.com/font?kit=grlryt2bdKIyfMSOhzd1eA') format('woff');\
}");
    
    
    var addOptions = function (select) {
        console.log('adding options');
        
        select.options[select.options.length]=new Option("Roboto");
        select.options[select.options.length]=new Option("Roboto Light");
        select.options[select.options.length]=new Option("Roboto Thin");
    };
    
    var select = document.getElementById("textFont");
    if (select) {
        addOptions(select);
    } else {
        
        var callback = function(e) {
            console.log('modified');
            var select = document.getElementById("textFont");
            if (select) {
                document.removeEventListener('DOMSubtreeModified', callback, false);
                addOptions(select);
            }
        }
            
        document.addEventListener('DOMSubtreeModified', callback, false);
    }
})();
