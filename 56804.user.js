// ==UserScript==
// @author         David Yin
// @name           SimpleTranslator
// @description    SimpleTranslator, with double clicking or selecting the word, you can get the translated result from Google Translate, meanwhile, you don't have to leave the current page you're browsing.
// @include        *
// ==/UserScript==

// NOTE: The some of implementaion of initWordArea function references
// to the Dict.cc popup souce code.

// This code is free, you can copy, modify or whatever you want except the above part.

// Change 0003:
//    1. Set STATE to OFF as default
//    2. By pressing alt+i, user can translate words or sentences by their inputs.
//    3. Added a test to the selected words to see whether they are all non-word

// Change 0002:
//    1. Refactored code
//    2. Added a new feature to turn ON/OFF translater (by pressing alt+q)
//    3. Updated the css of display area

// Change 0001:
//    1. Fixed NS_ERROR_ILLEGAL_VALUE issue.
//    2. Updated getting window selection part code to make it easier.
//    3. Refactored display area code to make reusable.

var ON = true;
var OFF = false;
var STATE = OFF;

/**
 * Get common display area which can be used by selecting mode and inputing mode.
 */
function getDisplayArea() {
    var displayArea = document.getElementById('MyWordArea');
    if (displayArea) {
        displayArea.parentNode.removeChild(displayArea);
        displayArea = null;
    }

    displayArea = document.getElementsByTagName('body')[0].appendChild(document.createElement('div'));

    displayArea.setAttribute('id', 'MyWordArea');
    displayArea.setAttribute('style', 'position: absolute; top:' + (window.pageYOffset + 25) + 'px; left: 25px; border: 2px solid black; color: black;background-color: white; background-color: rgba(255, 255, 255, 0.9); -moz-border-radius: 5px; min-height: 50px; min-width: 100px; padding: 10px; z-index:1000;');

    // Define button for closing
    var closeButton = displayArea.appendChild(document.createElement('a'));
    closeButton.setAttribute('id', 'MyWordClose');
    closeButton.setAttribute('style', 'float: right; margin-left: 25px; margin-top: -7px; margin-right: -7px; cursor: pointer; border-width: 0px !important;');
    closeButton.addEventListener('click', function (e) {
            var elm = document.getElementById('MyWordArea');
            if (elm) { 
                elm.parentNode.removeChild(elm);
            }
        },
        false);

    // Define image for close button
    var closeButton_img = closeButton.appendChild(document.createElement('img'));
    closeButton_img.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACmAAAApgBNtNH3wAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALdSURBVDiNnZVLaxNRGIafM5dEWm2pVaSoWBWxUlAoBhUbAooIKqIBl9KVC8GiPyClFVPctkjBlUtRFyIiRRAUqysFLwU3KcU0scEGrVZrpElmXhdNQm4IOvByzjDnPPPd+D4jiSFjwhYMCqICm394DHgW3PfgxjXphYlBGHi+DYq94AYaL1RE3d4C8sA0FGbBASKOBYNboXga3CZ/b4CWZVWte8C9A4U5GLQE0d3gekDLyAgbl5exQiE8aCq/JNPXR8urV5iDB/GAveD6ELUEtlM6XFxYwLS20vn0KVZvbw2gLA+wQiHWTk1hh0KYnh58Vt0T2MRAL0HJkr6PjkqSvK9fNb9jh1KgNOgTaB705cAB+b9+SZJy169rEfQN9A4UAxEDTYFmq7Q0MSFJKmYySm3erCQoBVo4dEh+LidJWo7HlQV9AS2C3lYDn4ES1TJGP27fliQVPn7U3IYNyhw+LP/3b0nSj6tXlQF9hgr0TQnoUBWbSnYlMufPs6WtjdaTJ+l6/RqnqwsTDPJ9aIif8ThWXUX4VaWEmmXU8/gUjbIyPY3b3Y0JBlkcHuZbPN6QKFWBrWoL68sj2N9PoKencnhNJIJctwakOmgDsLxvOXaMbY8fYwIBsrEY+USCliNH2HT3LrKsGpDqgfXWrT1+nO2TkxjXJXPlCtnRUZLhMIVUitazZ9l461YN6K8urztxgp2PHmEch/SlS2THx/GBfDZLsr8fL5tl3cAA68fGmkJrgO2nTrHr4UOM45C8eJGFiYmaeOXTaebCYfylJdovX6Z9eLgCagrsHh/H2DazFy7w+ebNhhgJWEkkSEUiKJejY2QEd//+GpcdwMuD7QMfzp0j0NnJ0pMn2E1gZUtW3r9n/uhR2gYGKM7MYFhtYwY8MwT3OuDMPnDL7chitcuWV7vJe/23SSjMw4NKg+2AYlepwVr/oCIwA4V0qcGa8ggwpRHAf4wAA/f90gj4A4J5lJ+MD2rFAAAAAElFTkSuQmCC');
    closeButton_img.setAttribute('alt', 'close');
    closeButton_img.setAttribute('style', 'border-width: 0px !important;');

    var result = displayArea.appendChild(document.createElement('span'));
    result.setAttribute('id', 'MyWordResult');
    result.setAttribute('style', 'font-size: 9pt;text-align:left');

    GM_log('init finished');
    return displayArea; 
}

/**
 * Initailize word displayed area
 */
function initDisplayAreaForSelection() {
    var displayArea = getDisplayArea();
    // Do something if needed in the future
}

/**
 * Register event handler for the given event type.
 *
 * @param eventType     given event type
 * @param eventHandler  event handler correspanding to the event type
 */
function registerEventListener(eventType, eventHandler) {
    document.addEventListener(eventType, eventHandler, false);
}

/**
 * Looing up the word by user selecting.
 *
 * @param e event
 */
function lookupWordBySelecton(e) {
    // 0 : No button is pressed
    // 1 : left button is pressed
    // 2 : right button is pressed
    // 3 : Left and right buttons are both pressed
    // more information can be detailed from 'http://hi.baidu.com/iiswuren/blog/item/a757abad65a8fc0f4b36d696.html'
    if (e.button == 2) return;

    var sel = window.getSelection();
    var selText = sel + "";

    if (selText == '' || (selText.match(/[^\x00-\xff]/ig)) || !(selText.match(/[a-zA-z]/ig))) return;

    GM_log("Selected word is " + selText);

    // Initialize word dispalyed area.
    initDisplayAreaForSelection();

    GM_log('Encode text: ' + encodeURI(selText));
    // Get translated result from Google Translate.
    // Currently, only supports English to Chinese
    translate(selText);
    // Remove the selected ranges.
    sel.removeAllRanges();
}

/**
 * translate the given sentences 
 * @param sentences given sentences
 */
function translate(sentences) {
     GM_xmlhttpRequest({
        method: 'GET',
        url: "http://translate.google.com/translate_a/t?client=t&sl=auto&tl=zh-CN&text=" + encodeURI(sentences),
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) GreaseMonkey',
            'Accept': 'application/atom+xml, application/xml, text/xml',
        },
        onload: function(responseDetails) {
            var result = document.getElementById('MyWordResult');
            var meanings = responseDetails.responseText;
            var prefix = sentences + '<p>';

            // Fill in the queried result from Google.
            result.innerHTML = prefix + parseResult(meanings);
        },
    });

}

/**
 * This function is used to format the result got from Google
 *
 * @param result translated result from Google
 * @return uniform string
 */
function parseResult(result) {
    GM_log(result);
    var rg_trans = /"trans":"([^"]*)"/g
    var rg_pos = /"pos":"[^"]*"/g
    var rg_terms = /"terms":\[([^\]]*)\]/g

    var buffer;

    var terms;
    var trans;

    result.match(rg_trans);
    trans = RegExp.$1;

    result.match(rg_terms);
    terms = RegExp.$1.split(',');

    buffer = trans;

    buffer += '<p><b>Dictionary:</b></p>';
    buffer += result;
    // for (var i = 0; i < terms.length; i++) {
    //    buffer += (i + 1) + '. ';
    //    buffer += terms[i];
    //    buffer += '<br>';
    // }
    // GM_log(buffer);
    // GM_log(terms);
    // GM_log(trans);
    return buffer;
}

/**
 * Initialize the display area of user input mode.
 */
function initDisplayAreaForUserInput() {
    // TODO: initializing something.
    var displayArea = getDisplayArea();
    var result = document.getElementById("MyWordResult");
    if (result) {
        // Initialize input box
        var inputBox = result.parentNode.insertBefore(document.createElement('input'), result);
        inputBox.setAttribute('type', 'text');
        inputBox.setAttribute('id', 'MyInputWord');
        inputBox.addEventListener('keydown', function(e) {
            if (e.keyCode == 13) {
                translate(inputBox.value);
            }
        }, false);
        window.setTimeout(function () {inputBox.focus();}, 1);

        // Initialize lookup button
        var btnGo = inputBox.parentNode.insertBefore(document.createElement('input'), inputBox.nextSibling);
        btnGo.setAttribute('type', 'button');
        btnGo.setAttribute('value', 'Go');
        btnGo.addEventListener('click', function(e) {
           translate(inputBox.value); 
        }, false);
        result.parentNode.insertBefore(document.createElement('p'), result);
    }
}

/**
 * key press event handler
 *
 * @param e event
 */
function keypressHandler(e) {
    // By pressing alt+q to control the state of translator.
    // If this setting bothers you, you can change the charCode to others, see http://www.asciitable.com/.
    if (e.charCode == 113 && e.altKey) {
        // Turn ON/OFF translator
        if (STATE) {
            STATE = OFF;
            document.removeEventListener('mouseup', lookupWordBySelecton, false);
            // If you need this notification, please comment out this line to enable it.
            // alert("Translator is OFF!");
        } else {
            STATE = ON;
            registerEventListener('mouseup', lookupWordBySelecton);
            // If you need this notification, please comment out this line to enable it.
            // alert('Translator is ON!');
        }
    } else if (e.charCode == 105 && e.altKey) { // By pressing alt+i to control whether to input word.
        initDisplayAreaForUserInput();
    }
}

// Add keypress event handler
registerEventListener('keypress', keypressHandler);

if (STATE) {
    // Register event handlers for 'mouseup' and 'keypress'
    registerEventListener('mouseup', lookupWordBySelecton);
}
