// ==UserScript==
// @name           Google Dictionary
// @author         Taiwan ROC
// @description    "Google Dictionary" use Google Dictionary Engine to translate without leaving current page just by double clicking or selecting the word or sentence.(「Google字典」使用Google字典引擎翻譯，而不用離開原本頁面，只要雙擊或選取單字或文句即可。)
// @license        Public Domain 
// @include        *
// ==/UserScript==

// How to use?
// 如何使用?
// After installing the "Google Dictionary", please reload the webpage at the first time.
// 裝好「Google Dictionary」後，第一次請先重新載入頁面。
// Press Alt+q to enable/disable "Google Dictionary".
// 按下 Alt+q 以啟用/停用 "Google Dictionary"。

// How to change language?
// 如何更改語言?
// 1.Find the script file "google_dictionary.user.js" in
// 1.找到腳本檔「google_dictionary.user.js」在
//   C:/Documents and Settings/YourAccount/Application Data/­Mozilla/Firefox/Profiles/xxxxxx.Default/gm_scripts/google_dictionary/
//   or
//   或
//   D:/FirefoxPortable/Data/profile/gm_scripts/google_dictionary/
//   or
//   或
//   /home/user/.mozilla/firefox/xxxxxx.default/gm_scripts/google_dictionary/
// 2.Edit this file and delete the comment symbol "double slash" where the language you want.
// 2.編輯這個檔案，刪除你想要的語言處的註解符號「雙斜線」。
// 3.Reload webpage and press Alt+q to enable "Google Dictionary".
// 3.重新載入頁面，按下 Alt+q 啟用「Google Dictionary」。


var ON = true;
var OFF = false;
var STATE = OFF;

/**
 * translate the given sentences 
 * @param sentences given sentences
 */
function translate(sentences) {
     GM_xmlhttpRequest({
        method: 'GET',


// ==== English to Traditional Chinese ====
// ==== 英文 翻到 傳統中文 ====
url: "http://www.google.com/dictionary?langpair=en|zh-TW&q=" + encodeURI(sentences),

// ==== English to Simple Chinese ====
// ==== 英文 翻到  簡體中文 ====
//url: "http://www.google.com/dictionary?langpair=en|zh-CN&q=" + encodeURI(sentences),

// ==== German to English ====
// ==== 德文 翻到 英文 ====
//url: "http://www.google.com/dictionary?langpair=de|en&q=" + encodeURI(sentences),

// ==== Russian to English ====
// ==== 俄文 翻到 英文 ====
//url: "http://www.google.com/dictionary?langpair=ru|en&q=" + encodeURI(sentences),




        onload: function(responseDetails) {
            var result = document.getElementById('MyWordResult');
            result.innerHTML = responseDetails.responseText;
        },
    });
}



/**
 * Initailize word displayed area
 */
function initDisplayAreaForSelection(e) {
    var displayArea = getDisplayArea(e);
    // Do something if needed in the future
}



/**
 * Get common display area which can be used by selecting mode and inputing mode.
 */
function getDisplayArea(e) {
    var displayArea = document.getElementById('MyWordArea');
    if (displayArea) {
        displayArea.parentNode.removeChild(displayArea);
        displayArea = null;
    }

    displayArea = document.getElementsByTagName('body')[0].appendChild(document.createElement('div'));

    displayArea.setAttribute('id', 'MyWordArea');
    displayArea.setAttribute('style', 'position: absolute; top:' + (e.pageY+4) + 'px; left:' + (e.pageX/2) + 'px; border:2px solid black; color: black; background-color: rgba(255, 255, 255, 0.9); -moz-border-radius:5px; min-height:20%; min-width:40%; padding:10px; z-index:1000; text-align:left;');

    // Define button for closing
    var closeButton = displayArea.appendChild(document.createElement('span'));
    closeButton.setAttribute('id', 'MyWordClose');
    closeButton.setAttribute('style', 'float:right; margin-top:-7px; margin-right:-7px;');
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
    closeButton_img.setAttribute('alt', 'Ｘ');
    closeButton_img.setAttribute('title', 'close');
    closeButton_img.setAttribute('style', 'color:white; background-color:#e02020; border:1px solid black;');

    var result = displayArea.appendChild(document.createElement('span'));
    result.setAttribute('id', 'MyWordResult');

    GM_log('init finished');
    return displayArea; 
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
    initDisplayAreaForSelection(e);

    GM_log('Encode text: ' + encodeURI(selText));
    // Get translated result from Google Translate.
    // Currently, only supports English to Chinese
    translate(selText);
    // Remove the selected ranges.
    sel.removeAllRanges();
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
